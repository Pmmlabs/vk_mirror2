﻿! function(t) {
    function i(o) {
        if (e[o]) return e[o].exports;
        var a = e[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return t[o].call(a.exports, a, a.exports, i), a.loaded = !0, a.exports
    }
    var e = {};
    return i.m = t, i.c = e, i.p = "", i(0)
}({
    0: function(t, i, e) {
        t.exports = e(159)
    },
    129: function(t, i) {
        "use strict";

        function e(t) {
            if (~t.indexOf("audio_api_unavailable")) {
                var i = t.split("?extra=")[1].split("#"),
                    e = o(i[1]);
                if (i = o(i[0]), !e || !i) return t;
                e = e.split(String.fromCharCode(9));
                for (var a, r, l = e.length; l--;) {
                    if (r = e[l].split(String.fromCharCode(11)), a = r.splice(0, 1, i)[0], !s[a]) return t;
                    i = s[a].apply(null, r)
                }
                if (i && "http" === i.substr(0, 4)) return i
            }
            return t
        }

        function o(t) {
            if (!t || t.length % 4 == 1) return !1;
            for (var i, e, o = 0, s = 0, r = ""; e = t.charAt(s++);) e = a.indexOf(e), ~e && (i = o % 4 ? 64 * i + e : e, o++ % 4) && (r += String.fromCharCode(255 & i >> (-2 * o & 6)));
            return r
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.audioUnmaskSource = e;
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
            s = {
                v: function(t) {
                    return t.split("").reverse().join("")
                },
                r: function(t, i) {
                    t = t.split("");
                    for (var e, o = a + a, s = t.length; s--;) e = o.indexOf(t[s]), ~e && (t[s] = o.substr(e - i, 1));
                    return t.join("")
                },
                x: function(t, i) {
                    var e = [];
                    return i = i.charCodeAt(0), each(t.split(""), function(t, o) {
                        e.push(String.fromCharCode(o.charCodeAt(0) ^ i))
                    }), e.join("")
                }
            }
    },
    159: function(module, exports, __webpack_require__) {
        "use strict";
        var _audio_unmask_source = __webpack_require__(129);
        window.AudioUtils = {
            AUDIO_ITEM_INDEX_ID: 0,
            AUDIO_ITEM_INDEX_OWNER_ID: 1,
            AUDIO_ITEM_INDEX_URL: 2,
            AUDIO_ITEM_INDEX_TITLE: 3,
            AUDIO_ITEM_INDEX_PERFORMER: 4,
            AUDIO_ITEM_INDEX_DURATION: 5,
            AUDIO_ITEM_INDEX_ALBUM_ID: 6,
            AUDIO_ITEM_INDEX_AUTHOR_LINK: 8,
            AUDIO_ITEM_INDEX_LYRICS: 9,
            AUDIO_ITEM_INDEX_FLAGS: 10,
            AUDIO_ITEM_INDEX_CONTEXT: 11,
            AUDIO_ITEM_INDEX_EXTRA: 12,
            AUDIO_ITEM_INDEX_HASHES: 13,
            AUDIO_ITEM_INLINED_BIT: 1,
            AUDIO_ITEM_CLAIMED_BIT: 16,
            AUDIO_ITEM_RECOMS_BIT: 64,
            AUDIO_ITEM_TOP_BIT: 1024,
            AUDIO_ITEM_LONG_PERFORMER_BIT: 16384,
            AUDIO_ITEM_LONG_TITLE_BIT: 32768,
            AUDIO_ENOUGH_LOCAL_SEARCH_RESULTS: 500,
            AUDIO_PLAYING_CLS: "audio_row_playing",
            AUDIO_CURRENT_CLS: "audio_row_current",
            AUDIO_LAYER_HEIGHT: 550,
            AUDIO_LAYER_MIN_WIDTH: 400,
            AUDIO_LAYER_MAX_WIDTH: 1e3,
            AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
            updateQueueReceivedPost: function(t) {
                t && each(geByClass("_audio_row", t), function() {
                    domData(this, "new-post", "groups" == cur.module ? "wall" : "feed")
                })
            },
            toggleAudioHQBodyClass: function() {
                var t = getAudioPlayer().showHQLabel();
                toggleClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS, t)
            },
            hasAudioHQBodyClass: function() {
                return hasClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS)
            },
            showNeedFlashBox: function() {
                var t = getLang("global_audio_flash_required").replace("{link}", '<a target=_blank href="https://get.adobe.com/flashplayer">').replace("{/link}", "</a>");
                new MessageBox({
                    title: getLang("audio_need_flash_title")
                }).content(t).setButtons("Ok", function() {
                    curBox().hide()
                }).show()
            },
            getAddRestoreInfo: function() {
                return cur._audioAddRestoreInfo = cur._audioAddRestoreInfo || {}, cur._audioAddRestoreInfo
            },
            addAudio: function(t) {
                function i() {
                    return intval(domData(o, "in-progress"))
                }

                function e(t) {
                    return domData(o, "in-progress", intval(t))
                }
                var o = gpeByClass("_audio_row", t);
                if (!i()) {
                    e(!0);
                    var a = window.AudioPage && AudioPage(o),
                        s = a && a.options.oid < 0 && a.options.canAudioAddToGroup,
                        r = s ? -a.options.oid : 0,
                        l = AudioUtils.getAudioFromEl(o, !0),
                        n = AudioUtils.getAddRestoreInfo(),
                        d = n[l.fullId],
                        u = ge("audio_" + l.fullId);
                    u = u == o ? !1 : u;
                    var _ = a && a.getCurrentPlaylist(),
                        A = {
                            act: "add",
                            gid: r,
                            oid: l.ownerId,
                            aid: l.id,
                            hash: l.addHash
                        };
                    if (_) {
                        var h = _.getAlbumId();
                        switch (A.from = _.getType(), _.getType()) {
                            case AudioPlaylist.TYPE_RECOM:
                                isString(h) && (0 == h.indexOf("album") && (A.recommendation_type = "album"), 0 == h.indexOf("audio") && (A.recommendation_type = "query"));
                                break;
                            case AudioPlaylist.TYPE_POPULAR:
                                A.top_genre = h;
                                break;
                            case AudioPlaylist.TYPE_FEED:
                        }
                    }
                    if (d) "recom_hidden" == d.state ? a && (a.restoreRecommendation(o), e(!1)) : "deleted" == d.state ? (ajax.post("al_audio.php", {
                        act: "restore_audio",
                        oid: l.ownerId,
                        aid: l.id,
                        hash: l.editHash
                    }, {
                        onDone: function() {
                            e(!1)
                        }
                    }), removeClass(o, "audio_deleted"), removeClass(o, "canadd"), addClass(o, "canedit"), delete cur._audioAddRestoreInfo[l.fullId]) : "added" == d.state && (ajax.post("al_audio.php", {
                        act: "delete_audio",
                        oid: d.audio.ownerId,
                        aid: d.audio.id,
                        hash: d.audio.editHash
                    }, {
                        onDone: function() {
                            if (a) {
                                var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_ALBUM, r ? -r : vk.id, AudioPlaylist.ALBUM_ALL);
                                t.removeAudio(d.addedFullId)
                            }
                            e(!1)
                        }
                    }), removeClass(o, "added"), addClass(o, "canadd"), u && (removeClass(u, "added"), addClass(u, "canadd")), delete cur._audioAddRestoreInfo[l.fullId], getAudioPlayer().notify(AudioPlayer.EVENT_REMOVED, l.fullId, d.addedFullId));
                    else {
                        var y = gpeByClass("_post", t);
                        y && (A.post_id = domData(y, "post-id")), ajax.post("al_audio.php", A, {
                            onDone: function(t) {
                                if (t) {
                                    var i = t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID];
                                    if (n[l.fullId] = {
                                            state: "added",
                                            addedFullId: i,
                                            audio: AudioUtils.asObject(t)
                                        }, a) {
                                        var o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_ALBUM, r ? -r : vk.id, AudioPlaylist.ALBUM_ALL);
                                        o.addAudio(t, 0)
                                    }
                                }
                                e(!1)
                            },
                            onFail: function(t) {
                                return t && new MessageBox({
                                    title: getLang("global_error")
                                }).content(t).setButtons("Ok", function() {
                                    curBox().hide()
                                }).show(), removeClass(o, "added"), addClass(o, "canadd"), e(!1), !0
                            }
                        }), removeClass(o, "canadd"), addClass(o, "added"), u && (removeClass(u, "canadd"), addClass(u, "added")), getAudioPlayer().notify(AudioPlayer.EVENT_ADDED, l.fullId), _ && _.audioPageRef && _.audioPageRef.onUserAction(l, _)
                    }
                }
            },
            addAudioFromChooseBox: function(t, i, e, o, a, s, r) {
                var l = i.ctrlKey;
                t.innerHTML = "", showProgress(t), ajax.post("al_audio.php", {
                    act: "add",
                    gid: a,
                    oid: e,
                    aid: o,
                    hash: s
                }, {
                    onDone: function(i) {
                        var e = a ? -a : vk.id;
                        if (i) {
                            var o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_ALBUM, e, AudioPlaylist.ALBUM_ALL);
                            o.addAudio(i, 0), cur.audioPage && cur.audioPage.switchToSection(o)
                        }
                        if (l) hideProgress(t), domReplaceEl(t, '<span class="choose_link audio_choose_added_label">' + r + "</span>");
                        else
                            for (; __bq.count();) __bq.hideLast();
                        nav.go("audios" + e)
                    }
                })
            },
            chooseAudioBox: function(t, i, e) {
                if (window.event = window.event || e, void 0 !== t.selected) cur.lastAddMedia.unchooseMedia(t.selected), t.selected = void 0, removeClass(domPN(t), "audio_selected"), t.innerHTML = i.labels.add;
                else {
                    var o = cur.attachCount && cur.attachCount() || 0;
                    cur.chooseMedia("audio", i.owner_id + "_" + i.id, i.info), (!cur.attachCount || cur.attachCount() > o) && cur.lastAddMedia && (t.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(t), "audio_selected"), t.innerHTML = i.labels.cancel)
                }
                window.event = void 0
            },
            drawAudio: function(t, i) {
                for (var e = JSON.parse(getTemplate("audio_bits_to_cls")), o = t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS], a = [], s = 0; 32 > s; s++) {
                    var r = 1 << s;
                    o & r && a.push(e[r])
                }
                i && a.push(i);
                var l = formatTime(t[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
                    n = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, ""),
                    d = clean(JSON.stringify(t)).split("$").join("$$"),
                    u = getTemplate("audio_row", t);
                return u = u.replace(/%cls%/, a.join(" ")), u = u.replace(/%duration%/, l), u = u.replace(/%serialized%/, d), u = u.replace(/%search_href%/, "/search?c[q]=" + encodeURIComponent(n) + "&c[section]=audio&c[performer]=1")
            },
            isRecomAudio: function(t) {
                return t = AudioUtils.asObject(t), t.flags & AudioUtils.AUDIO_ITEM_RECOMS_BIT
            },
            isClaimedAudio: function(t) {
                return t = AudioUtils.asObject(t), t.flags & AudioUtils.AUDIO_ITEM_CLAIMED_BIT
            },
            getAudioExtra: function(t) {
                return t = AudioUtils.asObject(t), JSON.parse(t.extra || "{}")
            },
            getAudioFromEl: function(t, i) {
                t = domClosest("_audio_row", t);
                var e = data(t, "audio");
                return e || (e = JSON.parse(domData(t, "audio"))), i ? AudioUtils.asObject(e) : e
            },
            showAudioLayer: function showAudioLayer(btn) {
                function initLayer(html, playlist, options, firstSong, script) {
                    var telContent = ap.layer.getContent();
                    addClass(telContent, "no_transition"), removeClass(telContent, "top_audio_loading"), telContent.innerHTML = html, eval(script);
                    var layerScrollNode = geByClass1("audio_layer_rows_wrap", telContent);
                    setStyle(layerScrollNode, "height", AudioUtils.AUDIO_LAYER_HEIGHT), options.layer = ap.layer, options.layer.sb = new Scrollbar(layerScrollNode, {
                        nomargin: !0,
                        right: vk.rtl ? "auto" : 0,
                        left: vk.rtl ? 0 : "auto",
                        global: !0,
                        nokeys: !0,
                        scrollElements: [geByClass1("audio_layer_menu_wrap", telContent)]
                    }), data(layerScrollNode, "sb", options.layerScrollbar);
                    var audioPage = new AudioPage(geByClass1("_audio_layout", telContent), playlist, options, firstSong);
                    data(ap.layer, "audio-page", audioPage), setTimeout(function() {
                        removeClass(telContent, "no_transition")
                    })
                }
                var ap = getAudioPlayer(),
                    currentPlaylist = ap.getCurrentPlaylist();
                if (ap.layer)
                    if (ap.layer.isShown()) ap.layer.hide(), cancelStackFilter("top_audio", !0);
                    else {
                        ap.layer.show();
                        var initFunc = data(ap.layer, "init-func");
                        if (initFunc) data(ap.layer, "init-func", null), initFunc();
                        else {
                            var audioPage = data(ap.layer, "audio-page");
                            audioPage && audioPage.onShow()
                        }
                        addClass(btn, "active"), cancelStackPush("top_audio", function() {
                            ap.layer.hide()
                        }, !0)
                    }
                else {
                    var BORDER_COMPENSATION, attachTo;
                    ! function() {
                        var t = function() {
                                return geByClass1("_im-page-wrap") || ge("page_body")
                            },
                            i = function() {
                                return Math.max(AudioUtils.AUDIO_LAYER_MIN_WIDTH, Math.min(AudioUtils.AUDIO_LAYER_MAX_WIDTH, getSize(t())[0] - BORDER_COMPENSATION))
                            };
                        BORDER_COMPENSATION = 2, attachTo = ge("top_audio_layer_place"), ap.layer = new ElementTooltip(attachTo, {
                            delay: 0,
                            content: rs(vk.pr_tpl, {
                                id: "",
                                cls: "pr_big"
                            }),
                            cls: "top_audio_loading top_audio_layer",
                            autoShow: !1,
                            forceSide: "bottom",
                            onHide: function(t, i) {
                                audioPage = data(ap.layer, "audio-page"), audioPage && audioPage.onHide(), removeClass(btn, "active"), i && cancelStackFilter("top_audio", !0)
                            },
                            width: i,
                            setPos: function() {
                                var t, i, e;
                                isVisible(btn) ? (i = t = btn, e = 2) : (t = attachTo, i = geByClass1("top_audio_player_play"), e = 3);
                                var o = getXY(t),
                                    a = getXY(i),
                                    s = getSize(i),
                                    r = getXY("page_body"),
                                    l = o[0] - r[0];
                                if (l = Math.min(l, 400), s[0]) {
                                    var n = l + (a[0] - o[0]) + s[0] / 2 - e;
                                    setPseudoStyle(this.getContent(), "after", {
                                        left: n + "px"
                                    })
                                }
                                return {
                                    marginLeft: -l
                                }
                            }
                        }), ap.layer.show(), addClass(btn, "active"), ajax.post("al_audio.php", {
                            act: "show_layer",
                            my: currentPlaylist ? 0 : 1
                        }, {
                            onDone: function(t, i, e, o, a) {
                                var s = i;
                                ap.layer.isShown() ? initLayer(t, s, e, o, a) : data(ap.layer, "init-func", initLayer.pbind(t, s, e, o, a))
                            }
                        }), cancelStackPush("top_audio", function() {
                            ap.layer.hide()
                        }, !0)
                    }()
                }
            },
            asObject: function(t) {
                if (!t) return null;
                if (isObject(t)) return t;
                if ("string" == typeof t) return {
                    id: t
                };
                var i = (t[AudioUtils.AUDIO_ITEM_INDEX_HASHES] || "").split("/");
                return {
                    id: intval(t[AudioUtils.AUDIO_ITEM_INDEX_ID]),
                    owner_id: intval(t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID]),
                    ownerId: t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID],
                    fullId: t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID],
                    title: t[AudioUtils.AUDIO_ITEM_INDEX_TITLE],
                    performer: t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER],
                    duration: intval(t[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
                    lyrics: intval(t[AudioUtils.AUDIO_ITEM_INDEX_LYRICS]),
                    url: t[AudioUtils.AUDIO_ITEM_INDEX_URL],
                    flags: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS],
                    context: t[AudioUtils.AUDIO_ITEM_INDEX_CONTEXT],
                    extra: t[AudioUtils.AUDIO_ITEM_INDEX_EXTRA],
                    isTop: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_TOP_BIT,
                    addHash: i[0] || "",
                    editHash: i[1] || "",
                    actionHash: i[2] || "",
                    isLongPerformer: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_LONG_PERFORMER_BIT,
                    isLongTitle: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_LONG_TITLE_BIT
                }
            },
            initDomPlaylist: function(t, i) {
                var e = [];
                return each(i, function(t, i) {
                    i && each(geByClass("_audio_row", i), function(t) {
                        e.push(AudioUtils.getAudioFromEl(this))
                    })
                }), t.addAudio(e), t
            },
            getContextPlaylist: function(t) {
                function i(t) {
                    return [].slice.call(t)
                }
                var e, o = getAudioPlayer(),
                    a = AudioUtils.getAudioFromEl(t, !0),
                    s = null,
                    r = [],
                    l = domData(t, "new-post"),
                    n = null,
                    d = AudioPlaylist.TYPE_TEMP,
                    u = vk.id,
                    _ = {},
                    A = [],
                    h = t,
                    y = gpeByClass("_audio_playlist", t);
                if (y) {
                    for (n = data(y, "playlist"); h = domPN(h);) A.push((h.id ? "#" + h.id : "") + (h.className ? "." + h.className : ""));
                    A = A.slice(0, 30), A = A.filter(function(t) {
                        return !!trim(t)
                    }), A = A.reverse().join(" / "), A = document.location.href + " : " + A
                } else if (0 === a.context.indexOf("module")) {
                    var c = a.context.replace("module", "");
                    n = o.getPlaylist(AudioPlaylist.TYPE_ALBUM, c || cur.oid || vk.id, AudioPlaylist.ALBUM_ALL), r = [s]
                } else if (0 === a.context.indexOf("im")) s = gpeByClass("_im_peer_history", t), s = s || gpeByClass("_fc_tab_log_msgs", t), e = "im" + (cur.peer || "");
                else if (0 === a.context.indexOf("board")) e = a.context, r = i(geByClass("_wall_audio_rows", s));
                else if (0 === a.context.indexOf("widget")) e = a.context;
                else if (0 === a.context.indexOf("wiki")) e = "wiki";
                else if (0 === a.context.indexOf("post")) {
                    d = AudioPlaylist.TYPE_WALL, e = a.context;
                    var p = a.context.replace("post", "").split("_");
                    u = p[0], _ = {
                        postId: p[1]
                    }
                } else if (0 === a.context.indexOf("choose")) e = a.context;
                else if ("feed" == l || 0 === a.context.indexOf("feed") || 0 === a.context.indexOf("feedsearch")) e = "feed", r = i(geByClass("wall_text", s));
                else if (0 === a.context.indexOf("wall") || 0 === a.context.indexOf("reply") || "wall" == l) {
                    d = AudioPlaylist.TYPE_WALL, u = cur.oid;
                    var p = "";
                    if (l) {
                        var f = gpeByClass("_post", t);
                        f && (p = domData(f, "post-id"))
                    } else p = a.context.replace(/wall|reply/, "");
                    p = p ? p.split("_")[1] : "";
                    var P = cur.wallQuery || "",
                        E = ge("wall_search"),
                        g = inArray(cur.wallType, ["own", "full_own"]) ? "own" : "all";
                    e = hashCode(g + "_" + P), "wall" == cur.module && val(E) && (P = val(E)), p && (_ = {
                        postId: p,
                        wallQuery: P,
                        wallType: g
                    });
                    var m = 0 === a.context.indexOf("reply");
                    m && (r = i([gpeByClass("_replies_list", t)]), e = "reply" + e), r = r.concat(i([s]))
                } else {
                    for (; h = domPN(h);) A.push((h.id ? "#" + h.id : "") + (h.className ? "." + h.className : ""));
                    A = A.slice(0, 30), A = A.filter(function(t) {
                        return !!trim(t)
                    }), A = A.reverse().join(" / "), A = document.location.href + " : " + A
                }
                return s || (s = domPN(t)), r = r.filter(function(t) {
                    return !!t
                }), r && 0 != r.length || (r = [s]), n = n ? n : o.getPlaylist(d, u, e), n = n.getAudiosCount() ? n : AudioUtils.initDomPlaylist(n, r), n.mergeWith(_ || {}), A && (n._path = A), -1 == n.indexOfAudio(a) && (n = AudioUtils.initDomPlaylist(n, [domPN(t)])), n.load(), n
            },
            LOG_LS_KEY: "audiolog",
            debugLog: function() {},
            renderAudioDiag: function() {
                var t = ge("audio_diag_log"),
                    i = ls.get(AudioUtils.LOG_LS_KEY) || [];
                t && each(i, function(i, e) {
                    var o = new Date(e.shift()).toUTCString();
                    e = e.join(", "), t.appendChild(se('<div class="audio_diag_log_row"><span class="audio_diag_log_time">' + o + "</span>" + e + "</div>"))
                })
            },
            claim: function(t) {
                var i = AudioUtils.getAudioFromEl(t, !0),
                    e = AudioUtils.getAudioExtra(i);
                ajax.post("al_claims.php", {
                    act: "a_claim",
                    claim_id: e.moder_claim.claim,
                    type: "audio",
                    id: i.id,
                    owner_id: i.owner_id
                }, {
                    onDone: function(i) {
                        var e = gpeByClass("audio_row", t);
                        addClass(e, "claimed claim_hidden")
                    }
                })
            },
            unclaim: function(t) {
                var i = AudioUtils.getAudioFromEl(t, !0),
                    e = AudioUtils.getAudioExtra(i);
                ajax.post("al_claims.php", {
                    act: "a_unclaim",
                    claim_id: e.moder_claim.claim,
                    type: "audio",
                    id: i.id,
                    owner_id: i.owner_id,
                    hash: i.actionHash
                }, {
                    onDone: function() {
                        var i = gpeByClass("audio_row", t);
                        removeClass(i, "claimed"), removeClass(i, "claim_hidden")
                    }
                })
            },
            getUMAInfo: function(t) {
                var i = AudioUtils.getAudioFromEl(t, !0);
                showBox("al_claims.php", {
                    act: "getUMARestrictions",
                    id: i.id,
                    owner_id: i.owner_id,
                    hash: i.actionHash
                })
            }
        }, window.TopAudioPlayer = function(t, i) {
            this.ap = getAudioPlayer(), this._el = t, this._playIconBtn = ge("top_audio"), this.init()
        }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED = 190, TopAudioPlayer.init = function() {
            var t = ge("top_audio_player"),
                i = data(t, "object");
            i || (i = new TopAudioPlayer(t), data(t, "object", i))
        }, TopAudioPlayer.prototype.init = function() {
            function t(t) {
                return hasClass(this, "top_audio_player_play") ? (i.ap.isPlaying() ? i.ap.pause() : i.ap.play(), !1) : hasClass(this, "top_audio_player_prev") ? (i.ap.playPrev(), !1) : hasClass(this, "top_audio_player_next") ? (i.ap.playNext(), !1) : void 0
            }
            var i = this;
            this.ap.on(this, AudioPlayer.EVENT_UPDATE, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PLAY, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PAUSE, this.onPause.bind(this)), this.ap.top = this, each(["prev", "play", "next"], function(e, o) {
                addEvent(geByClass1("top_audio_player_" + o, i._el), "click", t)
            }), addEvent(this._el, "mousedown", function(t) {
                return cancelEvent(t), hasClass(domPN(t.target), "top_audio_player_btn") ? void 0 : 1 != t.which || hasClass(t.target, "top_audio_player_btn") || hasClass(t.target, "top_audio_player_act_icon") ? void 0 : showAudioLayer(t, ge("top_audio"))
            }), this.onPlay(this.ap.getCurrentAudio())
        }, TopAudioPlayer.prototype.onPlay = function(t, i, e) {
            function o() {
                var i = getAudioPlayer();
                setTimeout(function() {
                    i.layer && i.layer.isShown() && i.layer.updatePosition()
                }, 1), addClass(r._el, a), toggleClass(r._el, "top_audio_player_playing", i.isPlaying());
                var o = geByClass1("_top_audio_player_play_blind_label");
                o && (o.innerHTML = i.isPlaying() ? getLang("global_audio_pause") : getLang("global_audio_play")), t = AudioUtils.asObject(t), clearTimeout(r._currTitleReTO);
                var s = geByClass1("top_audio_player_title_out", r._el);
                re(s);
                var l = geByClass1("top_audio_player_title", r._el);
                if (0 != e) {
                    var n = 0 > e ? -10 : 10,
                        d = l.offsetLeft,
                        u = se('<div class="top_audio_player_title top_audio_player_title_next" style="opacity: 0; top:' + n + "px; left: " + d + 'px">' + t.performer + " &ndash; " + t.title + "</div>");
                    u.setAttribute("onmouseover", "setTitle(this)"), e > 0 ? domInsertAfter(u, l) : domInsertBefore(u, l), addClass(l, "top_audio_player_title_out"), setStyle(l, {
                        top: -n,
                        opacity: 0
                    }), setTimeout(function() {
                        setStyle(u, {
                            top: 0,
                            opacity: 1
                        })
                    }, 10), clearTimeout(r._currTitleReTO), r._currTitleReTO = setTimeout(function() {
                        re(l), removeClass(u, "top_audio_player_title_next")
                    }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED)
                } else l.innerHTML = t.performer + " &ndash; " + t.title, l.titleSet = 0, l.setAttribute("onmouseover", "setTitle(this)")
            }
            var a = "top_audio_player_enabled";
            if (!t) {
                removeClass(this._playIconBtn, a), removeClass(this._el, a), removeClass(this._el, "top_audio_player_playing"), show(this._playIconBtn);
                var s = getAudioPlayer();
                return void(s.layer && s.layer.isShown() && s.layer.updatePosition())
            }
            var r = this;
            e = intval(e), hasClass(this._playIconBtn, a) ? o() : (addClass(this._playIconBtn, a), setTimeout(function() {
                hide(r._playIconBtn), o()
            }, 150))
        }, TopAudioPlayer.prototype.onPause = function() {
            removeClass(this._el, "top_audio_player_playing");
            var t = geByClass1("_top_audio_player_play_blind_label");
            t && (t.innerHTML = getLang("global_audio_play"))
        }, TopAudioPlayer.prototype.onNext = function() {}, window.AudioPlaylist = function t(i, e, o) {
            if (this.constructor != t) throw new Error("AudioPlaylist was called without 'new' operator");
            getAudioPlayer().addPlaylist(this);
            var a = {};
            return i && isFunction(i.getId) ? (this._ref = i, void getAudioPlayer().addPlaylist(this)) : (isObject(i) ? a = i : (a.ownerId = e, a.type = i, a.albumId = o || ++t.plIndex), this._type = a.type, this._ownerId = a.ownerId || vk.id, this._albumId = a.albumId || 0, this._list = [], this._playbackParams = a.playbackParams, this.mergeWith(a), this)
        }, AudioPlaylist.plIndex = 0, AudioPlaylist.TYPE_CURRENT = "current", AudioPlaylist.TYPE_ALBUM = "album", AudioPlaylist.TYPE_TEMP = "temp", AudioPlaylist.TYPE_RECOM = "recoms", AudioPlaylist.TYPE_POPULAR = "popular", AudioPlaylist.TYPE_SEARCH = "search", AudioPlaylist.TYPE_FEED = "feed", AudioPlaylist.TYPE_LIVE = "live", AudioPlaylist.TYPE_WALL = "wall", AudioPlaylist.TYPE_RECENT = "recent", AudioPlaylist.ALBUM_ALL = -2, AudioPlaylist.prototype.serialize = function() {
            var t = {},
                i = getAudioPlayer().getCurrentAudio(),
                e = Math.max(0, this.indexOfAudio(i));
            return t.list = clone(this.getAudiosList().slice(Math.max(0, e - 300), e + 300), !0), each(t.list, function(t, i) {
                i[AudioUtils.AUDIO_ITEM_INDEX_URL] = ""
            }), t.type = AudioPlaylist.TYPE_TEMP, t.ownerId = vk.id, t.albumId = irand(1, 999), t.hasMore = !1, t.title = this.getTitle(), t.playbackParams = this.getPlaybackParams(), JSON.stringify(t)
        }, AudioPlaylist.prototype.getId = function() {
            return this.getType() + "_" + this.getOwnerId() + "_" + this.getAlbumId()
        }, AudioPlaylist.prototype.isReference = function() {
            return !!this._ref
        }, AudioPlaylist.prototype.getSelf = function() {
            return this._ref && isObject(this._ref) ? this._ref : this
        }, AudioPlaylist.prototype._unref = function() {
            var t = this._ref;
            if (isObject(t)) {
                for (var i in t)
                    if (t.hasOwnProperty(i) && !isFunction(t[i]) && 0 == i.indexOf("_")) {
                        var e = t[i];
                        params[i.substr(1)] = isObject(e) ? clone(e) : e
                    }
                delete params.ownerId, delete params.hasMore, delete this._ref, this._type = AudioPlaylist.TYPE_TEMP, this._ownerId = params.ownerId || vk.id, this._albumId = AudioPlaylist.plIndex++, this._hasMore = !1, this._list = [], this.mergeWith(params)
            }
        }, AudioPlaylist.prototype.isAdsAllowed = function() {
            return this._ref && isObject(this._ref) ? this._ref : this
        }, AudioPlaylist.prototype.getType = function() {
            return this.getSelf()._type
        }, AudioPlaylist.prototype.getOwnerId = function() {
            return this.getSelf()._ownerId
        }, AudioPlaylist.prototype.getAlbumId = function() {
            return this.getSelf()._albumId
        }, AudioPlaylist.prototype.getTitle = function() {
            return this.getSelf()._title || ""
        }, AudioPlaylist.prototype.getBlocks = function() {
            return this.getSelf()._blocks || {}
        }, AudioPlaylist.prototype.isPopBand = function() {
            return !!this.getSelf()._band
        }, AudioPlaylist.prototype.getPlaybackParams = function() {
            return this.getSelf()._playbackParams
        }, AudioPlaylist.prototype.setPlaybackParams = function(t) {
            var i = this.getSelf();
            i._playbackParams = t
        }, AudioPlaylist.prototype.hasMore = function() {
            return !!this.getSelf()._hasMore
        }, AudioPlaylist.prototype.getFeedFrom = function() {
            return this.getSelf()._feedFrom
        }, AudioPlaylist.prototype.getFeedOffset = function() {
            return this.getSelf()._feedOffset
        }, AudioPlaylist.prototype._needSilentLoading = function() {
            return this.getType() == AudioPlaylist.TYPE_ALBUM
        }, AudioPlaylist.prototype.getSearchParams = function() {
            return this.getSelf()._searchParams || null
        }, AudioPlaylist.prototype.getLocalFoundCount = function() {
            return this.getSelf()._localFoundTotal
        }, AudioPlaylist.prototype.setLocalFoundCount = function(t) {
            var i = this.getSelf();
            i._localFoundTotal = t
        }, AudioPlaylist.prototype.getTotalCount = function() {
            return this.getSelf()._totalCount
        }, AudioPlaylist.prototype.getTotalCountHash = function() {
            return this.getSelf()._totalCountHash
        }, AudioPlaylist.prototype.isShuffled = function() {
            return !!this.getShuffle()
        }, AudioPlaylist.prototype.getShuffle = function() {
            return this.getSelf()._shuffle
        }, AudioPlaylist.prototype.getFriendId = function() {
            return this.getSelf()._friend
        }, AudioPlaylist.prototype.setAdsAllowed = function(t) {
            return this.getSelf()._isAdsAllowed = t
        }, AudioPlaylist.prototype.isAdsAllowed = function() {
            return !!this.getSelf()._isAdsAllowed
        }, AudioPlaylist.prototype._moveCurrentAudioAtFirstPosition = function() {
            this._unref();
            var t = getAudioPlayer().getCurrentAudio(),
                i = this.indexOfAudio(t); - 1 != i && (this._list.splice(i, 1), this._list.unshift(t))
        }, AudioPlaylist.prototype.clean = function() {
            this._unref(), this._hasMore = !0, this._list = [], this._items = [], this._feedOffset = this._feedFrom = 0, this._nextOffset = 0
        }, AudioPlaylist.prototype.shuffle = function(t) {
            if (this._unref(), this._shuffle = t, this._shuffle)
                if (this._needSilentLoading()) this.hasMore() || (this._originalList = [].concat(this._list), shuffle(this._list), this._moveCurrentAudioAtFirstPosition());
                else if (this.getType() == AudioPlaylist.TYPE_SEARCH) {
                if (this.getLocalFoundCount() > 1) {
                    var i = this._list.splice(0, this.getLocalFoundCount());
                    this._originalList = [].concat(i), shuffle(i), this._list = i.concat(this._list)
                }
            } else if (this.hasMore()) {
                var e = getAudioPlayer().getCurrentAudio();
                this.indexOfAudio(e) >= 0 && (this._audioToFirstPos = e), this.clean()
            } else this._originalList = [].concat(this._list), shuffle(this._list), this._moveCurrentAudioAtFirstPosition();
            else this._needSilentLoading() ? this._originalList && (this._list = this._originalList) : this.getType() == AudioPlaylist.TYPE_SEARCH ? this.getLocalFoundCount() > 1 && (this._list.splice(0, this.getLocalFoundCount()), this._list = (this._originalList || []).concat(this._list)) : this.hasMore() ? this.clean() : this._list = this._originalList, delete this._shuffle, delete this._originalList, delete this._audioToFirstPos;
            return !0
        }, AudioPlaylist.prototype.getPlaybackSection = function() {
            var t = this.getPlaybackParams() || {},
                i = "other";
            return t.list_owner_id == vk.id ? i = t.album_id == AudioPlaylist.ALBUM_ALL ? "my" : "my_album" : t.is_widget ? i = "widget" : t.is_audio_feed ? i = "audio_feed" : t.is_wiki ? i = "wiki" : t.is_attach ? i = "attaches" : t.is_board ? i = "board" : t.is_friend ? i = "friend" : t.rec ? "all" == t.rec ? i = "recs" : "album" == t.rec ? i = "recs_album" : "audio" == t.rec && (i = "recs_audio") : t.pop_genre ? i = -1 == t.pop_genre ? "pop" : "pop_genre" : t.is_band ? i = "pop_band" : t.is_recent ? i = "recent" : t.is_search ? i = "search" : t.is_global_search ? i = "global_search" : t.is_replies ? i = "replies" : t.is_im ? i = "im" : t.is_feed ? i = "feed" : t.wall ? i = t.wall < 0 ? "group_wall" : "user_wall" : t.status ? i = t.status < 0 ? "group_status" : "user_status" : t.list_owner_id > 0 ? i = "user_list" : t.list_owner_id < 0 && (i = "group_list"), i
        }, AudioPlaylist.prototype.isComplete = function() {
            return this.getSelf().getType() == AudioPlaylist.TYPE_ALBUM ? this.getSelf()._isComplete : !0
        }, AudioPlaylist.prototype.getNextOffset = function() {
            return this.getSelf()._nextOffset || 0
        }, AudioPlaylist.prototype.getAudiosList = function() {
            return this.getSelf()._list || []
        }, AudioPlaylist.prototype.getItemsList = function() {
            return this.getSelf()._items || []
        }, AudioPlaylist.prototype.getPostId = function() {
            return this.getSelf()._postId
        }, AudioPlaylist.prototype.getWallQuery = function() {
            return this.getSelf()._wallQuery
        }, AudioPlaylist.prototype.getWallType = function() {
            return this.getSelf()._wallType
        }, AudioPlaylist.prototype.getNextAudio = function(t) {
            var i = this.indexOfAudio(t);
            this.load(i + 1);
            var e = this.getSelf(); - 1 == i && isNumeric(e._nextAfterRemovedIndex) && (i = Math.max(0, e._nextAfterRemovedIndex - 1), delete e._nextAfterRemovedIndex);
            var o = 1;
            return i >= 0 && i + o < this.getAudiosCount() ? this.getAudioAt(i + o) : !1
        }, AudioPlaylist.prototype.load = function(t, i, e) {
            e = e || void 0 === t;
            var o = this;
            if (t = intval(t), this.getType() == AudioPlaylist.TYPE_SEARCH && void 0 === this.getLocalFoundCount()) {
                var a = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_ALBUM, this.getOwnerId(), AudioPlaylist.ALBUM_ALL);
                return void a.loadSilent(function() {
                    var e = o.getSearchParams();
                    a.search(e, function(e) {
                        o.setLocalFoundCount(e.length), o.addAudio(e), o.load(t, i, !0)
                    })
                })
            }
            var s = this.getType() == AudioPlaylist.TYPE_FEED ? this.getItemsCount() : this.getAudiosCount();
            if (!e && this.hasMore() && 0 == t && s > 0) return i && i(this);
            if (!this.hasMore()) return i && i(this);
            if (this.getType() == AudioPlaylist.TYPE_ALBUM) return this.loadSilent(i);
            if (s - 20 > t) return i && i(this);
            var r = this.getSearchParams();
            return this.getType() != AudioPlaylist.TYPE_SEARCH || r.globalQuery ? (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(i), this._loading || (this._loading = !0, ajax.post("al_audio.php", {
                act: "a_load_section",
                type: this.getType(),
                owner_id: this.getOwnerId(),
                album_id: this.getAlbumId(),
                offset: this.getNextOffset(),
                search_q: r ? r.globalQuery : null,
                search_performer: r ? r.performer : null,
                search_lyrics: r ? r.lyrics : null,
                search_sort: r ? r.sort : null,
                search_history: r ? intval(r.fromHistory) : null,
                feed_from: this.getFeedFrom(),
                feed_offset: this.getFeedOffset(),
                shuffle: this.getShuffle(),
                post_id: this.getPostId(),
                wall_query: this.getWallQuery(),
                wall_type: this.getWallType(),
                claim: intval(nav.objLoc.claim)
            }, {
                onDone: function(t) {
                    getAudioPlayer().mergePlaylistData(o, t), o._audioToFirstPos && (o.addAudio(o._audioToFirstPos, 0), delete o._audioToFirstPos), delete o._loading;
                    var i = o._onDoneLoading;
                    delete o._onDoneLoading, each(i || [], function(t, i) {
                        i && i(o)
                    }), getAudioPlayer().saveStateCurrentPlaylist()
                }
            })), void 0) : i && i(this)
        }, AudioPlaylist.prototype.getLiveInfo = function() {
            var t = this.getSelf()._live;
            return t ? (t = t.split(","), {
                hostId: t[0],
                audioId: t[1],
                hash: t[2]
            }) : !1
        }, AudioPlaylist.prototype.isLive = function() {
            return !!this.getLiveInfo()
        }, AudioPlaylist.prototype.getAudioAt = function(t) {
            return this.getSelf()._list.length > t ? this.getSelf()._list[t] : null
        }, AudioPlaylist.prototype.getAudiosCount = function() {
            return this.getSelf()._list.length
        }, AudioPlaylist.prototype.getItemsCount = function() {
            var t = this.getSelf();
            return t._items = t._items || [], t._items.length
        }, AudioPlaylist.prototype.removeAudio = function(t) {
            var i = this.indexOfAudio(t);
            if (i >= 0) {
                this._unref();
                var e = this._list.splice(i, 1);
                return this._index && this._index.remove(e[0]), i
            }
            return -1
        }, AudioPlaylist.prototype.addAudio = function(t, i) {
            function e(t) {
                var e = o.indexOfAudio(t);
                if (e >= 0) {
                    if (a) return;
                    o._list.splice(e, 1)
                }
                t = clone(t), t[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = clean(replaceEntities(t[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/(<em>|<\/em>)/g, "")), t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = clean(replaceEntities(t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER]).replace(/(<em>|<\/em>)/g, "")), t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] &= ~AudioUtils.AUDIO_ITEM_INLINED_BIT, a ? o._list.push(t) : o._list.splice(i, 0, t), o._index && o._index.remove(t)
            }
            this._unref();
            var o = this,
                a = void 0 === i;
            if (isArray(t) && isArray(t[0]))
                for (var s = 0, r = t.length; r > s; s++) e(t[s]);
            else t.length && e(t)
        }, AudioPlaylist.prototype.mergeWith = function(t) {
            if (!isObject(this._ref)) {
                var i = t.list;
                if (i) {
                    var e = getAudioPlayer().getCurrentAudio();
                    if (e && this.indexOfAudio(e) >= 0) {
                        for (var o = -1, a = 0, s = i.length; s > a; a++)
                            if (e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] == i[a][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && e[AudioUtils.AUDIO_ITEM_INDEX_ID] == i[a][AudioUtils.AUDIO_ITEM_INDEX_ID]) {
                                o = a;
                                break
                            }
                        o >= 0 && this.clean()
                    }
                    this.addAudio(t.list)
                }
                if (t.items) {
                    this._items = this._items || [];
                    for (var a = 0, s = t.items.length; s > a; a++) this._items.push(t.items[a])
                }
                var r = this;
                each("blocks nextOffset hasMore isComplete title feedFrom feedOffset live searchParams totalCount totalCountHash band postId wallQuery wallType originalList shuffle isAdsAllowed".split(" "), function(i, e) {
                    void 0 !== t[e] && (r["_" + e] = t[e])
                })
            }
        }, AudioPlaylist.prototype.moveAudio = function(t, i) {
            this._unref();
            var e = this._list.splice(t, 1);
            i > t && (i -= 1), this._list.splice(i, 0, e[0])
        }, AudioPlaylist.prototype.indexOfAudio = function(t) {
            if (!t) return -1;
            var i;
            isString(t) ? i = t : isObject(t) ? i = t.fullId : isArray(t) && (i = t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID]), i = i.split("_");
            for (var e = this.getSelf(), o = 0, a = e._list.length; a > o; o++)
                if (i[0] == e._list[o][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && i[1] == e._list[o][AudioUtils.AUDIO_ITEM_INDEX_ID]) return o;
            return -1
        }, AudioPlaylist.prototype.getAudio = function(t) {
            isString(t) ? t : AudioUtils.asObject(t).fullId;
            t = t.split("_");
            for (var i = this.getSelf(), e = 0, o = i._list.length; o > e; e++)
                if (t[0] == i._list[e][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && t[1] == i._list[e][AudioUtils.AUDIO_ITEM_INDEX_ID]) return i._list[e];
            return null
        }, AudioPlaylist.prototype._ensureIndex = function(t) {
            var i = this.getSelf();
            if (this.getType() == AudioPlaylist.TYPE_ALBUM) {
                var e = function(t, i) {
                    var e = intval(i);
                    return e >= 33 && 48 > e ? String.fromCharCode(e) : t
                };
                i._index = new vkIndexer(i._list, function(t) {
                    return (t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " " + t[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/\&\#(\d+);?/gi, e)
                }, t)
            } else t && t()
        }, AudioPlaylist.prototype.search = function(t, i) {
            var e = this.getSelf();
            isObject(t) || (t = {
                q: t
            }), this._ensureIndex(function() {
                var o = e._index ? e._index.search(t.q) : [];
                return o = o.filter(function(i) {
                    return t.lyrics ? !!intval(i[AudioUtils.AUDIO_ITEM_INDEX_LYRICS]) : !0
                }), i(o)
            }.bind(this))
        }, AudioPlaylist.prototype.toString = function() {
            return this.getId()
        }, AudioPlaylist.prototype.fetchNextLiveAudio = function(t) {
            var i = this.getLiveInfo(),
                e = this;
            ajax.post("al_audio.php", {
                act: "a_get_audio_status",
                host_id: i.hostId
            }, {
                onDone: function(i) {
                    if (i) {
                        var o = e.indexOfAudio(i);
                        o >= 0 ? e.moveAudio(o, e.getAudiosCount() - 1) : e.addAudio(i)
                    }
                    t && t(i)
                }
            })
        }, AudioPlaylist.prototype.loadSilent = function(t, i) {
            var e = this;
            if (this.hasMore() && this.getType() == AudioPlaylist.TYPE_ALBUM) {
                if (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(t), this._silentLoading) return;
                this._silentLoading = !0, ajax.post("al_audio.php", {
                    act: "load_silent",
                    owner_id: this.getOwnerId(),
                    album_id: this.getAlbumId(),
                    claim: nav.objLoc.claim,
                    band: this.isPopBand() ? this.getOwnerId() : !1
                }, {
                    showProgress: i ? i.showProgress : !1,
                    hideProgress: i ? i.hideProgress : !1,
                    onDone: function(t) {
                        getAudioPlayer().mergePlaylistData(e, t), delete e._silentLoading;
                        var i = e._onDoneLoading;
                        delete e._onDoneLoading, each(i || [], function(t, i) {
                            i && i(e)
                        })
                    },
                    onFail: function() {
                        delete e._silentLoading;
                        var t = e._onDoneLoading;
                        delete e._onDoneLoading, each(t || [], function(t, i) {
                            i && i(e)
                        })
                    }
                })
            } else t && t(this)
        }, window.AudioPlayer || (window.AudioPlayer = function() {
            if (this._currentAudio = !1, this._isPlaying = !1, this._prevPlaylist = null, this._currentPlaylist = null, this._playlists = [], this.subscribers = [], this._tasks = [], this._playbackSent = !1, this._listened = {}, this._statusExport = {}, this._currentPlayingRows = [], this._allowPrefetchNext = !1, !vk.isBanned) {
                AudioUtils.debugLog("Player creation"), this._initImpl(), this._initEvents(), this._restoreVolumeState();
                var t = this;
                setTimeout(function() {
                    t._restoreState(), AudioUtils.toggleAudioHQBodyClass(), t.updateCurrentPlaying()
                })
            }
        }), AudioPlayer.prototype.getVersion = function() {
            return 15
        }, AudioPlayer.prototype._initImpl = function(t) {
            this._impl && this._impl.destroy();
            var i = 0,
                e = function(t) {
                    if (-1 != i) {
                        if (t && (i++,
                                this._implSetDelay(200), i > 3)) {
                            i = -1;
                            var e = new MessageBox({
                                title: getLang("global_error")
                            }).content(getLang("audio_error_loading")).setButtons("Ok", function() {
                                i = 0, curBox().hide()
                            });
                            return e.show(), setWorkerTimeout(function() {
                                i = 0, e.hide()
                            }, 3e3), this.notify(AudioPlayer.EVENT_ENDED), void this.notify(AudioPlayer.EVENT_FAILED)
                        }
                        this._playbackSent = !1, this._repeatCurrent ? (this._implSeekImmediate(0), this._implPlay()) : (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.playNext(!0))
                    }
                }.bind(this),
                o = 0,
                a = {
                    onBufferUpdate: function(t) {
                        this.notify(AudioPlayer.EVENT_BUFFERED, t)
                    }.bind(this),
                    onEnd: function() {
                        o = 0, e()
                    },
                    onFail: function() {
                        o = 0, e(!0)
                    },
                    onCanPlay: function() {
                        this.notify(AudioPlayer.EVENT_CAN_PLAY)
                    }.bind(this),
                    onProgressUpdate: function(t, i) {
                        var e = this.getCurrentAudio();
                        !this._muteProgressEvents && e && this.notify(AudioPlayer.EVENT_PROGRESS, t, e[AudioUtils.AUDIO_ITEM_INDEX_DURATION], i)
                    }.bind(this)
                };
            AudioUtils.debugLog("Implementation init"), AudioUtils.debugLog("param browser.flash", browser.flash), AudioUtils.debugLog("param force HTML5", !!t), AudioPlayerHTML5.isSupported() || t ? (AudioUtils.debugLog("Initializing HTML5 impl"), this._impl = new AudioPlayerHTML5(a)) : browser.flash && (AudioUtils.debugLog("Initializing Flash impl"), this._impl = new AudioPlayerFlash(a)), this._implSetVolume(0)
        }, AudioPlayer.EVENT_CURRENT_CHANGED = "curr", AudioPlayer.EVENT_PLAY = "start", AudioPlayer.EVENT_PAUSE = "pause", AudioPlayer.EVENT_STOP = "stop", AudioPlayer.EVENT_UPDATE = "update", AudioPlayer.EVENT_LOADED = "loaded", AudioPlayer.EVENT_ENDED = "ended", AudioPlayer.EVENT_FAILED = "failed", AudioPlayer.EVENT_BUFFERED = "buffered", AudioPlayer.EVENT_PROGRESS = "progress", AudioPlayer.EVENT_VOLUME = "volume", AudioPlayer.EVENT_PLAYLIST_CHANGED = "plchange", AudioPlayer.EVENT_ADDED = "added", AudioPlayer.EVENT_REMOVED = "removed", AudioPlayer.EVENT_AD_READY = "ad_ready", AudioPlayer.EVENT_AD_DEINITED = "ad_deinit", AudioPlayer.EVENT_AD_STARTED = "ad_started", AudioPlayer.EVENT_AD_COMPLETED = "ad_completed", AudioPlayer.EVENT_START_LOADING = "start_load", AudioPlayer.EVENT_CAN_PLAY = "actual_start", AudioPlayer.LS_VER = "v20", AudioPlayer.LS_KEY_PREFIX = "audio", AudioPlayer.LS_PREFIX = AudioPlayer.LS_KEY_PREFIX + "_" + AudioPlayer.LS_VER + "_", AudioPlayer.LS_VOLUME = "vol", AudioPlayer.LS_PL = "pl", AudioPlayer.LS_TRACK = "track", AudioPlayer.LS_SAVED = "saved", AudioPlayer.LS_PROGRESS = "progress", AudioPlayer.LS_DURATION_TYPE = "dur_type", AudioPlayer.LS_ADS_CURRENT_DELAY = "ads_current_delay_v4", AudioPlayer.PLAYBACK_EVENT_TIME = 10, AudioPlayer.LISTENED_EVENT_TIME_COEFF = .6, AudioPlayer.DEFAULT_VOLUME = .8, AudioPlayer.AD_TYPE = "preroll", window.audioIconSuffix = window.devicePixelRatio >= 2 ? "_2x" : "", AudioPlayer.tabIcons = {
            def: "/images/icons/favicons/fav_logo" + audioIconSuffix + ".ico",
            play: "/images/icons/favicons/fav_play" + audioIconSuffix + ".ico",
            pause: "/images/icons/favicons/fav_pause" + audioIconSuffix + ".ico"
        }, AudioPlayer.getLang = function(t) {
            var i = getAudioPlayer();
            return i && i.langs ? i.langs[t] : t
        }, AudioPlayer.clearDeprecatedCacheKeys = function() {
            AudioPlayer._iterateCacheKeys(function(t) {
                return t == AudioPlayer.LS_VER
            })
        }, AudioPlayer.clearOutdatedCacheKeys = function() {
            var t = ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_SAVED) || 0,
                i = 72e5;
            t < vkNow() - i && AudioPlayer._iterateCacheKeys(function(t, i) {
                return !inArray(i, [AudioPlayer.LS_PL, AudioPlayer.LS_TRACK, AudioPlayer.LS_PROGRESS])
            })
        }, AudioPlayer.clearAllCacheKeys = function() {
            AudioPlayer._iterateCacheKeys(function() {
                return !1
            }), setCookie("remixcurr_audio", "", -1)
        }, AudioPlayer._iterateCacheKeys = function(t) {
            for (var i in window.localStorage)
                if (0 === i.indexOf(AudioPlayer.LS_KEY_PREFIX + "_")) {
                    var e = i.split("_");
                    t(e[1], e[2]) || localStorage.removeItem(i)
                }
        }, AudioPlayer.prototype.onMediaKeyPressedEvent = function(t) {
            var i = this.getCurrentAudio();
            this.getCurrentPlaylist();
            if (i) switch (t.keyCode) {
                case 179:
                    this.isPlaying() ? this.pause() : this.play();
                    break;
                case 178:
                    this.seek(0), this.pause();
                    break;
                case 177:
                    this.playPrev();
                    break;
                case 176:
                    this.playNext()
            }
        }, AudioPlayer.prototype.deletePlaylist = function(t) {
            for (var i = 0; i < this._playlists.length; i++) this._playlists[i] == t && this._playlists.splice(i, 1)
        }, AudioPlayer.prototype.mergePlaylistData = function(t, i) {
            return t.hasMore() ? void each(this._playlists, function(e, o) {
                o.getId() == t.getId() && o.mergeWith(i)
            }) : t
        }, AudioPlayer.prototype.deleteCurrentPlaylist = function() {
            this.stop(), delete this._currentAudio, delete this._currentPlaylist, this.notify(AudioPlayer.EVENT_UPDATE), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)
        }, AudioPlayer.prototype.updateCurrentPlaying = function(t) {
            t = !!t;
            var i = AudioUtils.asObject(this.getCurrentAudio()),
                e = [];
            if (i) {
                var o = geByClass("_audio_row_" + i.fullId);
                e = e.concat([].slice.call(o))
            }
            for (var a = 0, s = this._currentPlayingRows.length; s > a; a++) {
                var r = this._currentPlayingRows[a];
                r && !inArray(r, e) && this.toggleCurrentAudioRow(r, !1, t)
            }
            if (i)
                for (var a = 0, s = e.length; s > a; a++) {
                    var r = e[a];
                    r && this.toggleCurrentAudioRow(r, !0, t)
                }
            this._currentPlayingRows = e
        }, AudioPlayer.prototype.toggleCurrentAudioRow = function(t, i, e) {
            function o() {
                n && (i ? d._addRowPlayer(t, e) : d._removeRowPlayer(t)), i ? (d.on(t, AudioPlayer.EVENT_PLAY, function(i) {
                    AudioUtils.asObject(i).fullId == AudioUtils.getAudioFromEl(t, !0).fullId && (addClass(t, AudioUtils.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_pause")), r && attr(r, "role", "heading"))
                }), d.on(t, AudioPlayer.EVENT_PROGRESS, function(i, e, o) {
                    if (!n && d.isAdPlaying()) return void(l && (l.innerHTML = formatTime(AudioUtils.getAudioFromEl(t, !0).duration)));
                    o = intval(o);
                    var a;
                    a = d.getDurationType() ? "-" + formatTime(Math.round(o - e * o)) : formatTime(Math.round(e * o)), geByClass1("audio_duration", t).innerHTML = a
                }), d.on(t, [AudioPlayer.EVENT_PAUSE, AudioPlayer.EVENT_ENDED], function(i) {
                    removeClass(t, AudioUtils.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_play")), r && attr(r, "role", "")
                }), toggleClass(t, AudioUtils.AUDIO_PLAYING_CLS, d.isPlaying())) : (d.off(t), removeClass(t, AudioUtils.AUDIO_PLAYING_CLS), l && (l.innerHTML = formatTime(AudioUtils.getAudioFromEl(t, !0).duration)), s && attr(s, "aria-label", getLang("global_audio_play")), r && attr(r, "role", "")), e ? setTimeout(function() {
                    var i = intval(domData(t, "is-current"));
                    toggleClass(t, AudioUtils.AUDIO_CURRENT_CLS, !!i)
                }) : toggleClass(t, AudioUtils.AUDIO_CURRENT_CLS, i)
            }
            var a = !!intval(domData(t, "is-current"));
            if (a != i) {
                domData(t, "is-current", intval(i));
                var s = geByClass1("_audio_play", t),
                    r = geByClass1("_audio_title", t),
                    l = geByClass1("audio_duration", t),
                    n = hasClass(t, "inlined");
                n && toggleClass(t, "audio_with_transition", e), e = n ? e : !1;
                var d = this;
                e ? setTimeout(o) : o()
            }
        }, AudioPlayer.prototype._removeRowPlayer = function(t) {
            removeClass(t, AudioUtils.AUDIO_CURRENT_CLS);
            var i = data(t, "player_inited");
            if (i) {
                setTimeout(function() {
                    re(geByClass1("_audio_inline_player", t))
                }, 200);
                var e = geByClass1("_audio_duration", t);
                e && (e.innerHTML = formatTime(AudioUtils.getAudioFromEl(t, !0).duration)), this.off(t), each(i.sliders, function() {
                    this.destroy()
                }), data(t, "player_inited", !1)
            }
        }, AudioPlayer.prototype._addRowPlayer = function(t, i) {
            if (!geByClass1("_audio_inline_player", t)) {
                var e = this,
                    o = se(vk.audioInlinePlayerTpl || getTemplate("audio_inline_player")),
                    a = geByClass1("_audio_player_wrap", t);
                a.appendChild(o);
                var s = new Slider(geByClass1("audio_inline_player_volume", o), {
                        value: e.getVolume(),
                        backValue: 0,
                        size: 1,
                        hintClass: "audio_player_hint",
                        withBackLine: !0,
                        log: !0,
                        formatHint: function(t) {
                            return Math.round(100 * t) + "%"
                        },
                        onChange: function(t) {
                            e.setVolume(t)
                        }
                    }),
                    r = new Slider(geByClass1("audio_inline_player_progress", o), {
                        value: 0,
                        backValue: 0,
                        size: 1,
                        hintClass: "audio_player_hint",
                        withBackLine: !0,
                        formatHint: function(t) {
                            var i = AudioUtils.asObject(e.getCurrentAudio());
                            return formatTime(Math.round(t * i.duration))
                        },
                        onEndDragging: function(t) {
                            e.seek(t)
                        }
                    });
                e.isAdPlaying() && r.toggleAdState(!0), e.on(t, AudioPlayer.EVENT_AD_DEINITED, function() {}), e.on(t, AudioPlayer.EVENT_AD_READY, function() {}), e.on(t, AudioPlayer.EVENT_AD_STARTED, function() {
                    r.toggleAdState(!0), r.setBackValue(0)
                }), e.on(t, AudioPlayer.EVENT_AD_COMPLETED, function() {
                    r.toggleAdState(!1)
                }), e.on(t, AudioPlayer.EVENT_START_LOADING, function() {
                    r.toggleLoading(!0)
                }), e.on(t, AudioPlayer.EVENT_CAN_PLAY, function() {
                    r.toggleLoading(!1)
                }), e.on(t, AudioPlayer.EVENT_BUFFERED, function(t, i) {
                    r.setBackValue(i)
                }), e.on(t, AudioPlayer.EVENT_PROGRESS, function(t, i) {
                    r.setValue(i)
                }), e.on(t, AudioPlayer.EVENT_VOLUME, function(t, i) {
                    s.setValue(i)
                }), data(t, "player_inited", {
                    sliders: [s, r]
                })
            }
        }, AudioPlayer.prototype.shareMusic = function() {
            var t = this.getCurrentAudio();
            if (t) return t = AudioUtils.asObject(t), !showBox("like.php", {
                act: "publish_box",
                object: "audio" + t.fullId,
                list: "s" + vk.id,
                to: "mail"
            }, {
                stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"],
                onFail: function(t) {
                    return showDoneBox(t), !0
                }
            })
        }, AudioPlayer.prototype.hasStatusExport = function() {
            for (var t in this._statusExport)
                if (this._statusExport[t]) return !0;
            return !1
        }, AudioPlayer.prototype.getStatusExportInfo = function() {
            return this._statusExport
        }, AudioPlayer.prototype.setStatusExportInfo = function(t) {
            this._statusExport = t
        }, AudioPlayer.prototype.deleteAudioFromAllPlaylists = function(t) {
            t = isObject(t) || isArray(t) ? AudioUtils.asObject(t).fullId : t, each(this._playlists, function(i, e) {
                e.removeAudio(t)
            })
        }, AudioPlayer.prototype.updateAudio = function(t, i) {
            var e = "";
            if (isString(t) ? e = t : isArray(t) && (e = AudioUtils.asObject(t).fullId), i || (i = t), each(this._playlists, function(t, o) {
                    for (var a = o.getAudiosList(), s = 0, r = a.length; r > s; s++)
                        if (a[s][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[s][AudioUtils.AUDIO_ITEM_INDEX_ID] == e) return isObject(i) && each(i, function(t, i) {
                            a[s][t] = i
                        }), void(isArray(i) && (a[s] = i))
                }), this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_ID] == e) {
                if (isObject(i)) {
                    var o = this;
                    each(i, function(t, i) {
                        o._currentAudio[t] = i
                    })
                }
                isArray(i) && (this._currentAudio = i)
            }
            return this.notify(AudioPlayer.EVENT_UPDATE), t
        }, AudioPlayer.prototype._triggerTNSPixel = function() {
            var t = this._lsGet("tns_triggered_time") || 0;
            this._lsSet("tns_triggered_time", vkNow());
            var i = 18e6;
            vkNow() - t > i || (vkImage().src = "//www.tns-counter.ru/V13a****digitalaudio_ru/ru/UTF-8/tmsec=digitalaudio_total/" + irand(1, 1e9))
        }, AudioPlayer.prototype._sendLCNotification = function() {
            var t = window.Notifier;
            t && t.lcSend("audio_start");
            try {
                window.Videoview && Videoview.togglePlay(!1)
            } catch (i) {}
        }, AudioPlayer.prototype.showHQLabel = function(t) {
            var i = "_audio_show_hq_label";
            return void 0 === t ? !!ls.get(i) : (t = !!t, ls.set(i, t), AudioUtils.toggleAudioHQBodyClass(), t)
        }, AudioPlayer.prototype._restoreVolumeState = function() {
            AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys();
            var t = this._lsGet(AudioPlayer.LS_VOLUME);
            this._userVolume = void 0 == t || t === !1 ? AudioPlayer.DEFAULT_VOLUME : t
        }, AudioPlayer.prototype._restoreState = function() {
            if (!vk.widget) {
                AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys(), this._currentAudio = this._lsGet(AudioPlayer.LS_TRACK);
                var t = this._lsGet(AudioPlayer.LS_PL);
                t && (t = JSON.parse(t), this._currentPlaylist = new AudioPlaylist(t)), this._currentPlaylist && this._currentAudio ? this.notify(AudioPlayer.EVENT_UPDATE) : this._currentPlaylist = this._currentAudio = !1;
                var i = this._lsGet(AudioPlayer.LS_PROGRESS) || 0;
                this._currentAudio && i && this._impl && "html5" == this._impl.type && (this._implSetUrl(this._currentAudio, !0), 1 > i && this._implSeek(i), this._implSetVolume(0))
            }
        }, AudioPlayer.prototype._ensureImplReady = function(t) {
            var i = this;
            this._impl && this._impl.onReady(function(e) {
                return e ? t() : void("flash" == i._impl.type && (AudioUtils.debugLog("Flash not initialized, lets try HTML5 as desperate way"), i._initImpl(!0)))
            })
        }, AudioPlayer.prototype._implNewTask = function(t, i) {
            this._taskIDCounter = this._taskIDCounter || 1, this._tasks = this._tasks || [], this._tasks.push({
                name: t,
                cb: i,
                id: t + "_" + this._taskIDCounter++
            }), this._implDoTasks()
        }, AudioPlayer.prototype._implDoTasks = function() {
            if (this._tasks = this._tasks || [], !this._taskInProgress) {
                var t = this._tasks.shift();
                if (t) {
                    var i = this;
                    t = clone(t), this._taskInProgress = t.id, this._ensureImplReady(function() {
                        t.cb.call(i, function() {
                            return i._taskAbort == t.id ? void(i._taskAbort = !1) : (i._taskInProgress = !1, void i._implDoTasks())
                        })
                    })
                }
            }
        }, AudioPlayer.prototype._implClearAllTasks = function() {
            this._taskAbort = this._taskInProgress, this._taskInProgress = !1, this._tasks = []
        }, AudioPlayer.prototype._implClearTask = function(t) {
            this._tasks = this._tasks || [], this._tasks = this._tasks.filter(function(i) {
                return i.name != t
            })
        }, AudioPlayer.prototype._implSetDelay = function(t) {
            this._implNewTask("delay", function i(t) {
                setWorkerTimeout(t, i)
            })
        }, AudioPlayer.prototype._implPlay = function() {
            var t = this;
            this._implNewTask("play", function(i) {
                var e = AudioUtils.asObject(t.getCurrentAudio());
                t._impl.play(e.url), t._muteProgressEvents = !1, t._allowPrefetchNext = !0, i()
            })
        }, AudioPlayer.prototype._implSeekImmediate = function(t) {
            this._impl && this._impl.seek(t)
        }, AudioPlayer.prototype._implSeek = function(t) {
            var i = this;
            this._implClearTask("seek"), this._implNewTask("seek", function(e) {
                i._impl.seek(t), e()
            })
        }, AudioPlayer.prototype._implPause = function() {
            var t = this;
            this._implNewTask("pause", function(i) {
                t._impl.pause(), i()
            })
        }, AudioPlayer.prototype._implSetVolume = function(t, i) {
            if (this._impl) {
                var e = this;
                if (i) {
                    var o = 0 == t ? "vol_down" : "vol_up";
                    this._implNewTask(o, function(i) {
                        e._impl.fadeVolume(t, function() {
                            i()
                        })
                    })
                } else this._implNewTask("vol_set", function(i) {
                    e._impl.setVolume(t), i()
                })
            }
        }, AudioPlayer.prototype._implSetUrl = function(t, i) {
            var e = this;
            this._implClearTask("url"), this._implNewTask("url", function(o) {
                i || e.notify(AudioPlayer.EVENT_START_LOADING);
                var a = e._taskInProgress;
                e._ensureHasURL(t, function(t) {
                    a == e._taskInProgress && (t = AudioUtils.asObject(t), e._impl.setUrl(t.url, function(t) {
                        t || (e._implClearAllTasks(), e._onFailedUrl()), o()
                    }))
                })
            })
        }, AudioPlayer.prototype.toggleDurationType = function() {
            var t = intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE));
            t = !t, ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE, t), this.notify(AudioPlayer.EVENT_UPDATE, this.getCurrentProgress())
        }, AudioPlayer.prototype.getDurationType = function() {
            return intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE))
        }, AudioPlayer.prototype.getCurrentProgress = function() {
            return this._impl ? this._impl.getCurrentProgress() : 0
        }, AudioPlayer.prototype.getCurrentBuffered = function() {
            return this._impl ? this._impl.getCurrentBuffered() : 0
        }, AudioPlayer.prototype._initEvents = function() {
            var t = window.Notifier,
                i = this;
            t && (t.addRecvClbk("audio_start", "audio", function(t) {
                i.isPlaying() && i.pause(!1, !i._fadeVolumeWorker), delete i.pausedByVideo
            }), t.addRecvClbk("video_start", "audio", function(t) {
                i.isPlaying() && (i.pause(), i.pausedByVideo = vkNow())
            }), t.addRecvClbk("video_hide", "audio", function(t) {
                !i.isPlaying() && i.pausedByVideo && (vkNow() - i.pausedByVideo < 18e4 && i.play(), delete i.pausedByVideo)
            }), t.addRecvClbk("logged_off", "audio", function() {
                cur.loggingOff = !0, AudioPlayer.clearAllCacheKeys(), i.stop()
            }))
        }, AudioPlayer.prototype.addPlaylist = function(t) {
            this.hasPlaylist(t.getId()) || this._playlists.push(t)
        }, AudioPlayer.prototype._cleanUpPlaylists = function() {
            for (var t = 0, i = -1, e = this._playlists.length - 1; e >= 0; e--) {
                var o = this._playlists[e];
                if (!o.isReference() && (t += o.getAudiosCount(), t > 4e3)) {
                    i = e;
                    break
                }
            }
            if (-1 != i) {
                i += 1;
                for (var a = this._playlists.slice(0, i), s = this.getCurrentPlaylist(), r = [], e = 0; e < a.length; e++) {
                    var l = a[e];
                    if (s == l && (l = !1), l && !l.isReference())
                        for (var n = i; n < this._playlists.length; n++) {
                            var o = this._playlists[n];
                            o.isReference() && o.getSelf() == l && (l = !1)
                        }
                    l && r.push(e)
                }
                for (var e = 0; e < r.length; e++) {
                    var i = r[e];
                    this._playlists.splice(i, 1)
                }
                r.length && debugLog("AudioPlayer - " + r.length + " playlists removed")
            }
        }, AudioPlayer.prototype.hasPlaylist = function(t, i, e) {
            var o;
            o = void 0 !== i && void 0 !== e ? t + "_" + i + "_" + e : t;
            for (var a = 0; a < this._playlists.length; a++) {
                var s = this._playlists[a];
                if (!s.isReference() && s.getId() == o) return s
            }
            return !1
        }, AudioPlayer.prototype.getPlaylist = function(t, i, e) {
            if (t && !i && !e) {
                var o = t.split("_");
                t = o[0], i = o[1], e = o[2]
            }
            e = e || AudioPlaylist.ALBUM_ALL;
            var a = this.hasPlaylist(t, i, e);
            if (a) return a;
            if (t == AudioPlaylist.TYPE_ALBUM && e != AudioPlaylist.ALBUM_ALL) {
                var s = this.getPlaylist(AudioPlaylist.TYPE_ALBUM, i, AudioPlaylist.ALBUM_ALL);
                if (!s.hasMore() && s.isComplete()) {
                    var r = new AudioPlaylist(AudioPlaylist.TYPE_ALBUM, i, e);
                    return each(s.getAudiosList(), function(t, i) {
                        i[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID] == e && r.addAudio(i)
                    }), r
                }
            }
            return new AudioPlaylist({
                type: t,
                ownerId: i,
                albumId: e,
                hasMore: t != AudioPlaylist.TYPE_TEMP
            })
        }, AudioPlayer.prototype.toggleRepeatCurrentAudio = function() {
            this._repeatCurrent = !this._repeatCurrent
        }, AudioPlayer.prototype.isRepeatCurrentAudio = function() {
            return !!this._repeatCurrent
        }, AudioPlayer.prototype.setNext = function(t, i) {
            var e = domClosest("_audio_row", t),
                o = AudioUtils.getAudioFromEl(e),
                a = AudioUtils.asObject(o);
            if (!hasClass(e, "audio_added_next")) {
                addClass(e, "audio_added_next");
                var s = this.getCurrentPlaylist();
                if (s) {
                    var r = AudioUtils.asObject(this.getCurrentAudio());
                    if (r && a.fullId == r.fullId) return;
                    var l = s.indexOfAudio(r);
                    if (-1 == l) return;
                    var n = s.indexOfAudio(a); - 1 != n ? s.moveAudio(n, l + 1) : s.addAudio(o, l + 1)
                } else s = AudioUtils.getContextPlaylist(e), this.play(o, s);
                var d = window.AudioPage && AudioPage(e),
                    u = d && d.getCurrentPlaylist();
                u && u.audioPageRef && u.audioPageRef.onUserAction(a, u)
            }
            return cancelEvent(i)
        }, AudioPlayer.prototype._setTabIcon = function(t) {
            setFavIcon(AudioPlayer.tabIcons[t])
        }, AudioPlayer.prototype.on = function(t, i, e) {
            isArray(i) || (i = [i]), each(i, function(i, o) {
                this.subscribers.push({
                    context: t,
                    et: o,
                    cb: e
                })
            }.bind(this))
        }, AudioPlayer.prototype.off = function(t) {
            this.subscribers = this.subscribers.filter(function(i) {
                return i.context != t
            })
        }, AudioPlayer.prototype.notify = function(t, i, e, o) {
            var a = this.getCurrentAudio();
            if (this._impl && (this.isAdPlaying() || !this._muteProgressEvents || !inArray(t, [AudioPlayer.EVENT_BUFFERED, AudioPlayer.EVENT_PROGRESS]))) switch (inArray(t, [AudioPlayer.EVENT_PLAY, AudioPlayer.EVENT_PAUSE]) && (this.subscribers = this.subscribers.filter(function(t) {
                return t.context instanceof Element ? bodyNode.contains(t.context) : !0
            }), this.updateCurrentPlaying(!0)), each(this.subscribers || [], function(o, s) {
                s.et == t && s.cb(a, i, e)
            }), t) {
                case AudioPlayer.EVENT_VOLUME:
                    this._lsSet(AudioPlayer.LS_VOLUME, this._userVolume);
                    break;
                case AudioPlayer.EVENT_PLAY:
                    this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio(), this._setTabIcon("play"), this._sendStatusExport();
                    break;
                case AudioPlayer.EVENT_PLAYLIST_CHANGED:
                    this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio();
                    break;
                case AudioPlayer.EVENT_PROGRESS:
                    if (!vk.widget && !this._adsIsAdPlaying()) {
                        var s = this.getCurrentPlaylist(),
                            r = this._impl.getCurrentProgress();
                        this._lsSet(AudioPlayer.LS_PROGRESS, r);
                        var l = o;
                        if (l) {
                            var n = a[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[AudioUtils.AUDIO_ITEM_INDEX_ID];
                            !this._playbackSent && l >= AudioPlayer.PLAYBACK_EVENT_TIME && (this._sendPlayback(), this._playbackSent = !0)
                        }
                        if (this._allowPrefetchNext && r >= .8) {
                            var d = s.getNextAudio(a);
                            d && this._impl.isFullyLoaded() && (this._allowPrefetchNext = !1, this._prefetchAudio(d))
                        }!this._listened[n] && (l / a[AudioUtils.AUDIO_ITEM_INDEX_DURATION] >= AudioPlayer.LISTENED_EVENT_TIME_COEFF || l > 180) && (this._sendListenedEvent(a, s.getType() == AudioPlaylist.TYPE_RECENT), this._listened[n] = !0)
                    }
                    break;
                case AudioPlayer.EVENT_PAUSE:
                    this._setTabIcon("pause");
                    break;
                case AudioPlayer.EVENT_ENDED:
                    this._lastTrackEnded = !0
            }
        }, AudioPlayer.prototype._sendListenedEvent = function(t, i) {
            var e = AudioUtils.asObject(t);
            ajax.post("al_audio.php", {
                act: "listened",
                audio_owner_id: e.ownerId,
                audio_id: e.id,
                listened: intval(i),
                hash: e.actionHash
            }), i || (i = this.getPlaylist(AudioPlaylist.TYPE_RECENT, vk.id), t = clone(t), t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] &= ~AudioUtils.AUDIO_ITEM_RECOMS_BIT, i.addAudio(t, 0))
        }, AudioPlayer.prototype._initPlaybackParams = function(t) {
            if (void 0 === t.getPlaybackParams()) {
                var i = t.getAlbumId(),
                    e = {};
                if (t.getType() == AudioPlaylist.TYPE_ALBUM && (e.list_owner_id = t.getOwnerId(), e.album_id = t.getAlbumId(), t.getFriendId() && (e.is_friend = 1), t.isPopBand() && (e.is_band = 1)), t.getType() == AudioPlaylist.TYPE_FEED && (e.is_audio_feed = 1), t.getType() == AudioPlaylist.TYPE_RECENT && (e.is_recent = 1), t.getType() == AudioPlaylist.TYPE_SEARCH && (e.is_search = 1), t.getType() == AudioPlaylist.TYPE_RECOM) {
                    var o = t.getAlbumId();
                    o == AudioPlaylist.ALBUM_ALL ? e.rec = "all" : 0 == o.indexOf("album") ? e.rec = "album" : e.rec = "audio"
                }
                t.getType() == AudioPlaylist.TYPE_POPULAR && (e.pop_genre = (t.getAlbumId() || "").replace("foreign", ""), e.pop_genre = 0 == e.pop_genre ? -1 : e.pop_genre), t.getType() == AudioPlaylist.TYPE_TEMP && ("search" == cur.module && (e.is_global_search = 1), isString(i) && (0 === i.indexOf("im") ? e.is_im = 1 : 0 === i.indexOf("feed") ? e.is_feed = 1 : 0 === i.indexOf("board") ? e.is_board = 1 : 0 === i.indexOf("wiki") ? e.is_wiki = 1 : 0 === i.indexOf("choose") ? e.is_attach = 1 : 0 === i.indexOf("widget") && (e.is_widget = 1))), t.getType() == AudioPlaylist.TYPE_WALL && (isString(i) && 0 === i.indexOf("reply") ? e.is_replies = 1 : isString(i) && 0 === i.indexOf("post") ? e.wall = t.getOwnerId() : e.wall = t.getOwnerId());
                var a = t.getLiveInfo();
                a && (e.status = a.hostId), isEmpty(e) && (e.pl_id = t.getId(), e._v = this.getVersion(), e.nav = document.location.href, e._path = t.getSelf()._path, e._path = e._path ? e._path : "no"), t.setPlaybackParams(e)
            }
        }, AudioPlayer.prototype.playLive = function(t, i) {
            var e = this.getPlaylist(AudioPlaylist.TYPE_LIVE, vk.id, data[0]);
            e.mergeWith({
                live: t,
                hasMore: !1
            }), t = e.getLiveInfo();
            var o = this;
            ajax.post("al_audio.php", {
                act: "a_play_audio_status",
                audio_id: t.audioId,
                host_id: t.hostId,
                hash: t.hash
            }, extend(i, {
                onDone: function(t, i) {
                    e.mergeWith({
                        title: i.title,
                        list: [t]
                    }), o.play(t, e)
                }
            }))
        }, AudioPlayer.prototype._sendStatusExport = function() {
            var t = this.getCurrentAudio();
            if (t) {
                t = AudioUtils.asObject(t);
                var i = this.statusSent ? this.statusSent.split(",") : [!1, 0],
                    e = vkNow() - intval(i[1]);
                if (this.hasStatusExport() && (t.id != i[0] || e > 3e5)) {
                    var o = this.getCurrentPlaylist(),
                        a = o ? o.playbackParams : null;
                    setTimeout(ajax.post.pbind("al_audio.php", {
                        act: "audio_status",
                        full_id: t.fullId,
                        hash: vk.statusExportHash,
                        top: intval(a && (a.top_audio || a.top))
                    }), 0), this.statusSent = t.id + "," + vkNow()
                }
            }
        }, AudioPlayer.prototype._sendPlayback = function() {
            var t = this.getCurrentPlaylist(),
                i = AudioUtils.asObject(this.getCurrentAudio()),
                e = extend({
                    act: "playback",
                    audio_id: i.id,
                    audio_owner_id: i.ownerId,
                    hash: i.actionHash,
                    impl: this._impl.type,
                    v: this.getVersion()
                }, t.getPlaybackParams() || {
                    other: 1
                });
            e.section = t.getPlaybackSection(), cur.audioLoadTimings && (e.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), this._lastTrackEnded && (e.last_ended = 1, delete this._lastTrackEnded), ajax.post("al_audio.php", e, {
                onDone: function(t) {
                    this._adsConfig = t
                }.bind(this)
            }), stManager.add("audioplayer.js")
        }, AudioPlayer.prototype.saveStateCurrentPlaylist = function() {
            if (!vk.widget) {
                var t = this.getCurrentPlaylist();
                if (t) {
                    var i = t.serialize();
                    this._lsSet(AudioPlayer.LS_PL, i)
                } else this._lsSet(AudioPlayer.LS_PL, null);
                this._lsSet(AudioPlayer.LS_SAVED, vkNow())
            }
        }, AudioPlayer.prototype._saveStateCurrentAudio = function() {
            if (!vk.widget) {
                var t = this.getCurrentAudio();
                if (t) {
                    var i = clone(t);
                    i[AudioUtils.AUDIO_ITEM_INDEX_URL] = "", this._lsSet(AudioPlayer.LS_TRACK, i), setCookie("remixcurr_audio", t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID], 1)
                } else this._lsSet(AudioPlayer.LS_TRACK, null), setCookie("remixcurr_audio", null, 1)
            }
        }, AudioPlayer.prototype.seekCurrentAudio = function(t) {
            if (this._adsIsAdPlaying()) return !1;
            var i = AudioUtils.asObject(this.getCurrentAudio()),
                e = 10 / i.duration,
                o = this.getCurrentProgress() + (t ? e : -e);
            o = Math.max(0, Math.min(1, o)), this.seek(o)
        }, AudioPlayer.prototype._lsGet = function(t) {
            return ls.get(AudioPlayer.LS_PREFIX + t)
        }, AudioPlayer.prototype._lsSet = function(t, i) {
            ls.set(AudioPlayer.LS_PREFIX + t, i)
        }, AudioPlayer.prototype.setVolume = function(t) {
            t = Math.min(1, Math.max(0, t)), this._userVolume = t, this._implSetVolume(t), this._adsUpdateVolume(), this.notify(AudioPlayer.EVENT_VOLUME, t)
        }, AudioPlayer.prototype.getVolume = function() {
            return void 0 === this._userVolume ? .8 : this._userVolume
        }, AudioPlayer.prototype.seek = function(t) {
            this._implSeekImmediate(t)
        }, AudioPlayer.prototype._ensureHasURL = function(t, i) {
            var e = [];
            this._currentUrlEnsure = this._currentUrlEnsure || {};
            var o = AudioUtils.asObject(t);
            if (o.url) return i && i(t);
            var a = this.getCurrentPlaylist(),
                s = a.indexOfAudio(t);
            if (s >= 0)
                for (var r = s; s + 5 > r; r++) {
                    var l = AudioUtils.asObject(a.getAudioAt(r));
                    !l || l.url || this._currentUrlEnsure[l.fullId] || (e.push(l.fullId), this._currentUrlEnsure[l.fullId] = !0)
                }
            if (e.push(o.fullId), e.length) {
                var n = this;
                ajax.post("al_audio.php", {
                    act: "reload_audio",
                    ids: e.join(",")
                }, {
                    onDone: function(e, a) {
                        getAudioPlayer().setStatusExportInfo(a), each(e, function(i, e) {
                            e = AudioUtils.asObject(e);
                            var a = {};
                            a[AudioUtils.AUDIO_ITEM_INDEX_URL] = e.url, n.updateAudio(e.fullId, a), o.fullId == e.fullId && (t[AudioUtils.AUDIO_ITEM_INDEX_URL] = e.url), n.currentAudio && AudtioUtils.asObject(n.currentAudio).fullId == e.fullId && (n.currentAudio[AudioUtils.AUDIO_ITEM_INDEX_URL] = e.url), delete n._currentUrlEnsure[e.fullId]
                        }), i && i(t)
                    }
                })
            }
        }, AudioPlayer.prototype.toggleAudio = function(t, i) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
            var e = domClosest("_audio_row", t),
                o = cur.cancelClick || i && (hasClass(i.target, "audio_lyrics") || domClosest("_audio_duration_wrap", i.target) || domClosest("_audio_inline_player", i.target) || domClosest("audio_performer", i.target));
            if (cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl == geByClass1("audio_inline_player_progress", e) && (o = !0), delete cur.cancelClick, delete cur._sliderMouseUpNowEl, o) return !0;
            var a = AudioUtils.getAudioFromEl(e, !0);
            if (AudioUtils.isClaimedAudio(a)) {
                var s = AudioUtils.getAudioExtra(a),
                    r = s.claim;
                if (r) return void showAudioClaimWarning(a.ownerId, a.id, r.id, a.title, r.reason)
            }
            var l = hasClass(e, AudioUtils.AUDIO_PLAYING_CLS);
            if (l) this.pause();
            else {
                var n = AudioUtils.getContextPlaylist(e);
                this.play(a.fullId, n), n.audioPageRef && n.audioPageRef.onUserAction(a, n)
            }
        }, AudioPlayer.prototype._onFailedUrl = function(t) {
            this.notify(AudioPlayer.EVENT_FAILED), this.isPlaying() && (this.pause(), this.playNext(!0, !0))
        }, AudioPlayer.prototype._startAdsPlay = function(t, i, e, o) {
            function a() {
                var e = i.getPlaybackSection();
                switch (t = AudioUtils.asObject(t), this._adsIsAllowed(t, i)) {
                    case AudioPlayer.ADS_ALLOW_ALLOWED:
                        this._adsFetchAd(t, e, !1, function() {
                            o && o()
                        }.bind(this));
                        break;
                    case AudioPlayer.ADS_ALLOW_DISABLED:
                        o && o();
                        break;
                    case AudioPlayer.ADS_ALLOW_REJECT:
                        this._adsFetchAd(t, e, !0), o && o()
                }
            }
            this._startAdsTO && clearWorkerTimeout(this._startAdsTO), e ? this._startAdsTO = setWorkerTimeout(a.bind(this), 200) : a.call(this)
        }, AudioPlayer.prototype.play = function(t, i, e, o) {
            if (!cur.loggingOff) {
                if (!this._impl) return void AudioUtils.showNeedFlashBox();
                this._cleanUpPlaylists(), (isObject(t) || isArray(t)) && (t = AudioUtils.asObject(t), t && (t = t.fullId));
                var a = AudioUtils.asObject(this._currentAudio),
                    s = this.getCurrentPlaylist();
                !t && a && (t = a.fullId);
                var r = !1,
                    l = t && a && t == a.fullId;
                i ? s && (r = i == s.getSelf() || i == s) : (i = s, r = !0);
                var n = i.getAudio(t);
                this._initPlaybackParams(i), l || (this._playbackSent = !1), l || this._adsIsAdPlaying() || this._adsDeinit(), l && r ? this._adsIsAdPlaying() ? this._adsResumeAd() : this.isPlaying() || (this._isPlaying = !0, this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY), l || this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implClearAllTasks(), this._implSetVolume(0), this._implSetUrl(n), this._implPlay(), this._implSetVolume(this.getVolume(), !0)) : t && n && (this._currentAudio = n, r || (this._currentPlaylist && (this._prevPlaylist = this._currentPlaylist, this._prevAudio = this._currentAudio), this._currentPlaylist = new AudioPlaylist(i), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)), this._isPlaying = !0, this.updateCurrentPlaying(!0), this._adsIsAdPlaying() ? (this.notify(AudioPlayer.EVENT_PLAY, !0), this._adsResumeAd()) : (this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY, !0, intval(e), o), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._muteProgressEvents = !0, this._implClearAllTasks(), o ? this._startAdsPlay(n, i, !1, function() {
                    n = this.getCurrentAudio(), n && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(n), this._implPlay(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)) : (this._implSetVolume(0, !0), this._implPause(), this._startAdsPlay(n, i, !0, function() {
                    n = this.getCurrentAudio(), n && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(n), this._implPlay(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)))))
            }
        }, AudioPlayer.prototype._prefetchAudio = function(t) {
            "html5" == this._impl.type && (t = AudioUtils.asObject(t), t && t.url && this._impl.prefetch(t.url))
        }, AudioPlayer.prototype.getCurrentPlaylist = function() {
            return this._currentPlaylist
        }, AudioPlayer.prototype.getPlaylists = function() {
            return clone(this._playlists)
        }, AudioPlayer.prototype.pause = function() {
            this._adsIsAdPlaying() && this._adsPauseAd(), this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this._implSetVolume(0, !0), this._implPause()
        }, AudioPlayer.prototype.stop = function() {
            this._isPlaying = !1, this._impl.stop(), this.notify(AudioPlayer.EVENT_STOP)
        }, AudioPlayer.prototype.isPlaying = function() {
            return this._isPlaying
        }, AudioPlayer.prototype.getCurrentAudio = function() {
            return this._currentAudio
        }, AudioPlayer.prototype.playNext = function(t, i) {
            this._playNext(1, t)
        }, AudioPlayer.prototype.playPrev = function() {
            this._playNext(-1)
        }, AudioPlayer.prototype._playNext = function(t, i) {
            if (!this._adsIsAdPlaying()) {
                var e = 10,
                    o = this.getCurrentAudio(),
                    a = this.getCurrentPlaylist();
                if (o && a)
                    if (t > 0) {
                        for (var s = a.getNextAudio(o); e && s && AudioUtils.isClaimedAudio(s);) s = a.getNextAudio(s), e--;
                        s ? this.play(s, a, 1, i) : a.isLive() ? (this._muteProgressEvents = !0, a.fetchNextLiveAudio(function(t) {
                            this.play(t, a, 1, i)
                        }.bind(this))) : (s = a.getAudioAt(0), this.play(s, a, 1, i))
                    } else {
                        var r = a.indexOfAudio(this._currentAudio) - 1;
                        if (0 > r) this.seek(0);
                        else {
                            for (var l = a.getAudioAt(r); e && l && AudioUtils.isClaimedAudio(l);) l = a.getAudioAt(--r), e--;
                            this.play(l, a, -1, i)
                        }
                    }
            }
        }, AudioPlayer.prototype._adsPlayAd = function(t, i) {
            var e = !1;
            this._adman.onCompleted(function() {
                this._adsDeinit(!0), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_COMPLETED), delete this._adsPlaying, delete this._adsCurrentProgress, e || this._adsSendAdEvent("error", t), this._adsSendAdEvent("completed", t), document.title = this._adsPrevTitle, i && i()
            }.bind(this)), this._adman.onStarted(function() {
                e = !0, this._isPlaying = !0, this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_STARTED), this._adsUpdateVolume(), this._adsSendAdEvent("started", t)
            }.bind(this));
            var o = [.25, .5, .75];
            this._adman.onTimeRemained(function(i) {
                this._adsCurrentProgress = i.percent / 100, this.notify(AudioPlayer.EVENT_PROGRESS, i.percent / 100, i.duration), each(o, function(i, e) {
                    return this._adsCurrentProgress >= e ? (o.shift(), this._adsSendAdEvent("progress_" + intval(100 * e), t), !1) : void 0
                }.bind(this))
            }.bind(this)), this._adman.start(AudioPlayer.AD_TYPE), this._adsPlaying = !0, this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._adsPrevTitle = document.title, document.title = getLang("global_audio_ad")
        }, AudioPlayer.prototype._adsUpdateVolume = function() {
            this._adman && this._adman.setVolume(.7 * this.getVolume())
        }, AudioPlayer.prototype._adsSendAdEvent = function(t, i) {
            this._adEvents = this._adEvents || [], this._adEvents.push(t + "/" + i), clearTimeout(this._adEventDelay), this._adEventDelay = setTimeout(function() {
                ajax.post("al_audio.php", {
                    act: "ad_event",
                    events: this._adEvents.join(","),
                    v: this.getVersion(),
                    abp: window.abp
                }), this._adEvents = []
            }.bind(this), 500)
        }, AudioPlayer.prototype.adsGetCurrentProgress = function() {
            return this._adsCurrentProgress || 0
        }, AudioPlayer.prototype._adsPauseAd = function() {
            this._adman && (this._isPlaying = !1, this._adman.pause(), this.notify(AudioPlayer.EVENT_PAUSE))
        }, AudioPlayer.prototype._adsResumeAd = function() {
            this._adman && (this._isPlaying = !0, this._adman.resume(), this.notify(AudioPlayer.EVENT_PLAY))
        }, AudioPlayer.prototype._adsIsAdPlaying = function() {
            return this._adsPlaying
        }, AudioPlayer.prototype.isAdPlaying = function() {
            return this._adsIsAdPlaying()
        }, AudioPlayer.prototype._adsDeinit = function(t) {
            this._adman = null, !t && this.notify(AudioPlayer.EVENT_AD_DEINITED)
        }, AudioPlayer.ADS_ALLOW_DISABLED = 1, AudioPlayer.ADS_ALLOW_ALLOWED = 2, AudioPlayer.ADS_ALLOW_REJECT = 3, AudioPlayer.prototype._adsIsAllowed = function(t, i) {
            if (vk.widget) return AudioPlayer.ADS_ALLOW_DISABLED;
            if (cur.adsPreview) return AudioPlayer.ADS_ALLOW_ALLOWED;
            var e = this._adsConfig || vk.audioAdsConfig;
            return e ? e.enabled ? (!inArray(i.getPlaybackSection(), e.sections), e.day_limit_reached, AudioPlayer.ADS_ALLOW_ALLOWED) : AudioPlayer.ADS_ALLOW_DISABLED : AudioPlayer.ADS_ALLOW_REJECT
        }, AudioPlayer.prototype._adsFetchAd = function(t, i, e, o) {
            this._loadAdman(function() {
                function a(t, i) {
                    for (var e = (t >>> 0).toString(16), o = i.toString(16); o.length < 8;) o = "0" + o;
                    return e + o
                }
                if (!window.AdmanHTML) return this._adsSendAdEvent("no_adman", i), o && o();
                var s = {
                    my: 101,
                    my_album: 101,
                    audio_feed: 109,
                    recent: 113,
                    user_wall: 104,
                    group_wall: 104,
                    friend: 112,
                    user_list: 102,
                    group_list: 103,
                    feed: 105,
                    search: 110,
                    global_search: 110,
                    replies: 104,
                    im: 106,
                    group_status: 104,
                    user_status: 104,
                    recs: 107,
                    recs_audio: 107,
                    recs_album: 107,
                    pop: 108,
                    pop_genre: 108,
                    pop_band: 111,
                    other: 114
                };
                this._adman = new AdmanHTML;
                var r = {
                    _SITEID: 276,
                    ver: 251116,
                    vk_id: vk.id,
                    duration: t.duration,
                    content_id: a(t.ownerId, t.id),
                    vk_catid: s[i] || s.other
                };
                nav.objLoc.preview && (r.preview = intval(nav.objLoc.preview)), cur.adsPreview && (r.preview = 1), this._adman.setDebug(!!r.preview), this._adman.onReady(function() {
                    if (this._adman) {
                        var t = this._adman.getBannersForSection(AudioPlayer.AD_TYPE);
                        t && t.length ? (this._adsSendAdEvent("received", i), e ? (this._adsSendAdEvent("rejected", i), this._adsDeinit(), o && o()) : (this._adsSendAdEvent("ready", i), this.notify(AudioPlayer.EVENT_AD_READY), this._adsPlayAd(i, o))) : (e || this._adsSendAdEvent("not_received", i), o && o())
                    }
                }.bind(this)), this._adman.init({
                    slot: 3514,
                    wrapper: se("<div></div>"),
                    params: r,
                    browser: {
                        adBlock: !!window.abp,
                        mobile: !1
                    }
                }), this._adsSendAdEvent("requested", i)
            }.bind(this))
        }, AudioPlayer.prototype._loadAdman = function(t) {
            return this._admadLoaded ? t && t() : void loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
                onLoad: function() {
                    this._admadLoaded = !0, t && t()
                }.bind(this),
                onError: function() {
                    this._admadLoaded = !0, t && t()
                }.bind(this)
            })
        }, window.AudioPlayerFlash = function(t) {
            this.opts = t || {}, window._flashAudioInstance = this
        }, AudioPlayerFlash.onAudioFinishCallback = function() {
            var t = window._flashAudioInstance;
            t.opts.onEnd && t.opts.onEnd()
        }, AudioPlayerFlash.onAudioProgressCallback = function(t, i) {
            var e = window._flashAudioInstance;
            i && (e._total = i, e._currProgress = t / i, e.opts.onProgressUpdate && e.opts.onProgressUpdate(e._currProgress, t))
        }, AudioPlayerFlash.onAudioLoadProgressCallback = function(t, i) {
            var e = window._flashAudioInstance;
            e._currBuffered = t / i, e.opts.onBufferUpdate && e.opts.onBufferUpdate(e._currBuffered)
        }, AudioPlayerFlash.prototype.fadeVolume = function(t, i) {
            return this.setVolume(t), i()
        }, AudioPlayerFlash.prototype.type = "flash", AudioPlayerFlash.PLAYER_EL_ID = "flash_audio", AudioPlayerFlash.prototype.destroy = function() {
            re(AudioPlayerFlash.PLAYER_EL_ID)
        }, AudioPlayerFlash.prototype.onReady = function(t) {
            if (this._player) return t(!0);
            if (this._player === !1) return t(!1);
            this._onReady = t;
            var i = {
                    url: "/swf/audio_lite.swf",
                    id: "player",
                    height: 2
                },
                e = {
                    swliveconnect: "true",
                    allowscriptaccess: "always",
                    wmode: "opaque"
                },
                o = {
                    onPlayFinish: "AudioPlayerFlash.onAudioFinishCallback",
                    onLoadProgress: "AudioPlayerFlash.onAudioLoadProgressCallback",
                    onPlayProgress: "AudioPlayerFlash.onAudioProgressCallback"
                };
            ge(AudioPlayerFlash.PLAYER_EL_ID) || document.body.appendChild(ce("div", {
                id: AudioPlayerFlash.PLAYER_EL_ID,
                className: "fixed"
            }));
            var a = this;
            renderFlash(AudioPlayerFlash.PLAYER_EL_ID, i, e, o) && setTimeout(function() {
                a._checkFlashLoaded()
            }, 50)
        }, AudioPlayerFlash.prototype.setUrl = function(t, i) {
            var e = (0, _audio_unmask_source.audioUnmaskSource)(t);
            return this._url == e ? void(i && i(!0)) : (this._url = e, this._player && this._player.loadAudio(e), void(i && i(!0)))
        }, AudioPlayerFlash.prototype.setVolume = function(t) {
            this._player && this._player.setVolume && this._player.setVolume(t)
        }, AudioPlayerFlash.prototype.play = function() {
            this._player && this._player.playAudio()
        }, AudioPlayerFlash.prototype.seek = function(t) {
            var i = (this._total || 0) * t;
            this._player && this._player.playAudio(i)
        }, AudioPlayerFlash.prototype.pause = function() {
            this._player && this._player.pauseAudio()
        }, AudioPlayerFlash.prototype.isFullyLoaded = function() {
            return !1
        }, AudioPlayerFlash.prototype.getPlayedTime = function() {
            return 0
        }, AudioPlayerFlash.prototype.getCurrentProgress = function() {
            return this._currProgress || 0
        }, AudioPlayerFlash.prototype.getCurrentBuffered = function() {
            return this._currBuffered || 0
        }, AudioPlayerFlash.prototype.stop = function() {
            this._player && this._player.stopAudio()
        }, AudioPlayerFlash.prototype._checkFlashLoaded = function() {
            var t = ge("player");
            if (this._checks = this._checks || 0, this._checks++, AudioUtils.debugLog("Flash element check", this._checks), this._checks > 10) return AudioUtils.debugLog("No Flash element found after some amount of checks"), this._player = !1, this._onReady && this._onReady(!1);
            if (t && t.paused) AudioUtils.debugLog("Flash element found"), this._player = t, this._onReady && this._onReady(!0), this._onReady = null;
            else {
                var i = this;
                setTimeout(function() {
                    i._checkFlashLoaded()
                }, 100)
            }
        }, window.AudioPlayerHTML5 = function(t) {
            this.opts = t || {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
        }, AudioPlayerHTML5.AUDIO_EL_ID = "ap_audio", AudioPlayerHTML5.STATE_HAVE_NOTHING = 0, AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA = 3, AudioPlayerHTML5.HAVE_ENOUGH_DATA = 4, AudioPlayerHTML5.SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", AudioPlayerHTML5.isSupported = function() {
            var t = "undefined" != typeof navigator ? navigator.userAgent : "";
            if (/(Windows NT 5.1|Windows XP)/.test(t) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1;
            if (/(Windows 7|Windows NT 6.1)/.test(t) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1;
            var i = document.createElement("audio");
            if (i.canPlayType) {
                var e = i.canPlayType('audio/mpeg; codecs="mp3"'),
                    o = !!e.replace(/no/, "");
                return AudioUtils.debugLog("HTML5 browser support " + (o ? "yes" : "no"), e, t), o
            }
            return AudioUtils.debugLog("audio.canPlayType is not available", t), !1
        }, AudioPlayerHTML5.prototype.type = "html5", AudioPlayerHTML5.prototype.destroy = function() {}, AudioPlayerHTML5.prototype.getPlayedTime = function() {
            for (var t = this._currentAudioEl.played, i = 0, e = 0; e < t.length; e++) i += t.end(e) - t.start(e);
            return i
        }, AudioPlayerHTML5.prototype._setAudioNodeUrl = function(t, i) {
            var e = (0, _audio_unmask_source.audioUnmaskSource)(i);
            data(t, "setUrlTime", e == AudioPlayerHTML5.SILENCE ? 0 : vkNow()), t.src = e
        }, AudioPlayerHTML5.prototype._createAudioNode = function(t) {
            var i = new Audio,
                e = this;
            return this.opts.onBufferUpdate && addEvent(i, "progress", function() {
                e._currentAudioEl == i && e.opts.onBufferUpdate(e.getCurrentBuffered());
                var t = i.buffered;
                1 == t.length && 0 == t.start(0) && t.end(0) == i.duration && (i._fullyLoaded = !0)
            }), this.opts.onProgressUpdate && addEvent(i, "timeupdate", function() {
                this._currentAudioEl == i && this.opts.onProgressUpdate(this.getCurrentProgress(), this.getPlayedTime())
            }.bind(this)), this.opts.onEnd && addEvent(i, "ended", function() {
                e._currentAudioEl == i && e.opts.onEnd()
            }), this.opts.onSeeked && addEvent(i, "seeked", function() {
                e._currentAudioEl == i && e.opts.onSeeked()
            }), this.opts.onSeek && addEvent(i, "seeking", function() {
                e._currentAudioEl == i && e.opts.onSeek()
            }), addEvent(i, "error", function() {
                AudioUtils.debugLog("HTML5 error track loding"), e._prefetchAudioEl == i ? e._prefetchAudioEl = e._createAudioNode() : e._currentAudioEl == i && i.src != AudioPlayerHTML5.SILENCE && e.opts.onFail && e.opts.onFail()
            }), addEvent(i, "canplay", function() {
                var t = data(i, "setUrlTime");
                t && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - t), data(i, "setUrlTime", 0)), e._prefetchAudioEl == i, e._currentAudioEl == i && (e.opts.onCanPlay && e.opts.onCanPlay(), e._seekOnReady && (e.seek(e._seekOnReady), e._seekOnReady = !1))
            }), t && (this._setAudioNodeUrl(i, t), i.preload = "auto", i.volume = this._volume || 1, i.load()), this._audioNodes.push(i), i
        }, AudioPlayerHTML5.prototype.onReady = function(t) {
            t(!0)
        }, AudioPlayerHTML5.prototype.prefetch = function(t) {
            this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE), this._prefetchAudioEl = this._createAudioNode(t)
        }, AudioPlayerHTML5.prototype.seek = function(t) {
            var i = this._currentAudioEl;
            isNaN(i.duration) ? this._seekOnReady = t : i.currentTime = i.duration * t
        }, AudioPlayerHTML5.prototype.setVolume = function(t) {
            void 0 === t && (t = this._currentAudioEl.volume), this._currentAudioEl.volume = t, this._prefetchAudioEl && (this._prefetchAudioEl.volume = t), this._volume = t
        }, AudioPlayerHTML5.prototype.getCurrentProgress = function() {
            var t = this._currentAudioEl;
            return isNaN(t.duration) ? 0 : Math.max(0, Math.min(1, t.currentTime / t.duration))
        }, AudioPlayerHTML5.prototype.getCurrentBuffered = function() {
            var t = this._currentAudioEl;
            return t && t.buffered.length ? Math.min(1, t.buffered.end(0) / t.duration) : 0
        }, AudioPlayerHTML5.prototype.isFullyLoaded = function() {
            return this._currentAudioEl._fullyLoaded
        }, AudioPlayerHTML5.prototype.setUrl = function(t, i) {
            var e = this._currentAudioEl,
                o = (0, _audio_unmask_source.audioUnmaskSource)(t);
            if (this._seekOnReady = !1, e.src == o) return this.opts.onCanPlay && this.opts.onCanPlay(), i && i(!0);
            if (this._prefetchAudioEl && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING)
                if (this._prefetchAudioEl.src == o) {
                    this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE);
                    var a = this;
                    this._prefetchAudioEl.readyState >= AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA && setTimeout(function() {
                        a.opts.onCanPlay && a.opts.onCanPlay()
                    }), e = this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = !1
                } else this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE);
            return e.src != o && (this._setAudioNodeUrl(e, o), e.load()), i && i(!0)
        }, AudioPlayerHTML5.prototype.play = function(t) {
            this._prefetchAudioEl.src == (0, _audio_unmask_source.audioUnmaskSource)(t) && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING && (this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
            var i = this._currentAudioEl;
            if (i.src) {
                var e = i.play();
                void 0 !== e && e["catch"](function(t) {
                    t.code != t.ABORT_ERR ? setWorkerTimeout(function() {
                        triggerEvent(i, "error", !1, !0)
                    }, 10) : debugLog("HTML5 audio play error: " + t)
                })
            }
        }, AudioPlayerHTML5.prototype.pause = function() {
            var t = this._currentAudioEl;
            if (t.src) {
                var i = t.pause();
                void 0 != i && i["catch"](function() {})
            }
        }, AudioPlayerHTML5.prototype.stop = function() {
            this._currentAudioEl.pause(), this._currentAudioEl = this._createAudioNode(AudioPlayerHTML5.SILENCE)
        }, AudioPlayerHTML5.prototype._setFadeVolumeInterval = function(t) {
            if (t) {
                if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                    var i = new Blob(["           var interval;           onmessage = function(e) {             clearInterval(interval);             if (e.data == 'start') {               interval = setInterval(function() { postMessage({}); }, 20);             }           }         "]);
                    try {
                        this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(i))
                    } catch (e) {
                        this._fadeVolumeWorker = !1
                    }
                }
                this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = t, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(t, 60)
            } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
        }, AudioPlayerHTML5.prototype.fadeVolume = function(t, i) {
            t = Math.max(0, Math.min(1, t));
            var e = this._currentAudioEl,
                o = 0;
            if (o = t < e.volume ? -.06 : .001, Math.abs(t - e.volume) <= .001) return this._setFadeVolumeInterval(), i && i();
            var a = e.volume;
            this._setFadeVolumeInterval(function() {
                o > 0 && (o *= 1.35), a += o;
                var e = !1;
                return (e = 0 > o ? t >= a : a >= t) ? (this.setVolume(t), this._setFadeVolumeInterval(), i && i()) : void this.setVolume(a)
            }.bind(this))
        }, window.loadScript = function(t, i) {
            function e(t) {
                n.readyState && "loaded" != n.readyState && "complete" != n.readyState || (a(), r && r())
            }

            function o(t) {
                a(), l && l()
            }

            function a() {
                clearTimeout(d), n.removeEventListener("load", e), n.removeEventListener("readystatechange", e), n.removeEventListener("error", o)
            }
            var s = i.timeout,
                r = i.onLoad,
                l = i.onError,
                n = document.createElement("script");
            if (n.addEventListener("load", e), n.addEventListener("readystatechange", e), n.addEventListener("error", o), n.src = t, document.head.appendChild(n), s) var d = setTimeout(o, s);
            return {
                destroy: function() {
                    a()
                }
            }
        };
        try {
            stManager.done("audioplayer.js")
        } catch (e) {}
    }
});