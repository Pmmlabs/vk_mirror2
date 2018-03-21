﻿! function(t) {
    function e(o) {
        if (i[o]) return i[o].exports;
        var a = i[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return t[o].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}({
    0: function(t, e, i) {
        t.exports = i(142)
    },
    68: function(module, exports) {
        "use strict";

        function _classCallCheck(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var AudioLayer = function() {
            function AudioLayer() {
                _classCallCheck(this, AudioLayer), this._els = {
                    layerPlace: ge("top_audio_layer_place"),
                    topPlayBtn: geByClass1("_top_audio_player_play"),
                    topNotaBtn: geByClass1("_top_nav_audio_btn"),
                    topNotaBtnGroup: ge("top_audio_btn_group")
                }
            }
            return AudioLayer.prepare = function(t) {
                stManager.add(["audio.js", "audioplayer.js", "audio.css", "suggester.js", "auto_list.js", "indexer.js"], function() {
                    t && t()
                })
            }, AudioLayer.prototype.toggle = function(t, e) {
                var i = this;
                this._initTooltip();
                var o = this._els.tt,
                    a = void 0 !== t ? t : !o.isShown();
                a ? (o.show(), cancelStackPush("top_audio", function() {
                    i.toggle(!1, !0)
                }, !0)) : (e || cancelStackPop(), o.hide()), toggleClass(this._els.topNotaBtn, "active", a)
            }, AudioLayer.prototype.hide = function() {
                this._els.tt.hide()
            }, AudioLayer.prototype.isShown = function() {
                return this._els.tt && this._els.tt.isShown()
            }, AudioLayer.prototype.updatePosition = function() {
                return this._els.tt && this._els.tt.updatePosition()
            }, AudioLayer.prototype._layerPosition = function() {
                var t = getXY(this._els.layerPlace),
                    e = getXY("page_body"),
                    i = e[0] - t[0] - 1,
                    o = 0;
                if (isVisible(this._els.topNotaBtnGroup)) {
                    var a = getXY(this._els.topNotaBtn);
                    o = -i + (a[0] - t[0]) + 15
                } else {
                    var s = getXY(this._els.topPlayBtn);
                    o = -i + (s[0] - t[0]) + 3
                }
                return {
                    left: i,
                    top: 0,
                    arrowPosition: o
                }
            }, AudioLayer.prototype.getPageInstance = function() {
                return this._page
            }, AudioLayer.prototype._initTooltip = function _initTooltip() {
                var _this2 = this;
                this._els.tt || (this._els.container = se('<div class="audio_layer_container"><div class="top_audio_loading">' + rs(vk.pr_tpl, {
                    id: "",
                    cls: "pr_big"
                }) + "</div></div>"), this._els.tt = new ElementTooltip(this._els.layerPlace, {
                    id: "audio_layer_tt",
                    content: this._els.container,
                    width: 660,
                    offset: [22, 5],
                    autoShow: !1,
                    customShow: !0,
                    setPos: this._layerPosition.bind(this),
                    forceSide: "bottom",
                    onHide: function() {
                        _this2._page && _this2._page.onLayerHide()
                    },
                    onShow: function() {
                        _this2._page && _this2._page.onLayerShow(_this2._initSection)
                    }
                }), ajax.post("al_audio.php", {
                    act: "layer",
                    is_layer: 1,
                    is_current_playlist: ap.getCurrentPlaylist() ? 1 : 0
                }, {
                    onDone: function onDone(html, data, templatesScript) {
                        eval(templatesScript), _this2._els.container.innerHTML = html, _this2._page = new AudioPage(geByClass1("_audio_page_layout", _this2._els.container), data), _this2._initSection = "recoms" == data.initSection ? data.initSection : void 0, _this2._page.onLayerShow(_this2._initSection)
                    }
                }))
            }, AudioLayer
        }();
        exports["default"] = AudioLayer
    },
    99: function(t, e) {
        "use strict";

        function i() {
            return window.wbopen && ~(window.open + "").indexOf("wbopen")
        }

        function o(t) {
            if (!i() && ~t.indexOf("audio_api_unavailable")) {
                var e = t.split("?extra=")[1].split("#"),
                    o = "" === e[1] ? "" : a(e[1]);
                if (e = a(e[0]), "string" != typeof o || !e) return t;
                o = o ? o.split(String.fromCharCode(9)) : [];
                for (var s, r, n = o.length; n--;) {
                    if (r = o[n].split(String.fromCharCode(11)), s = r.splice(0, 1, e)[0], !l[s]) return t;
                    e = l[s].apply(null, r)
                }
                if (e && "http" === e.substr(0, 4)) return e
            }
            return t
        }

        function a(t) {
            if (!t || t.length % 4 == 1) return !1;
            for (var e, i, o = 0, a = 0, s = ""; i = t.charAt(a++);) i = r.indexOf(i), ~i && (e = o % 4 ? 64 * e + i : i, o++ % 4) && (s += String.fromCharCode(255 & e >> (-2 * o & 6)));
            return s
        }

        function s(t, e) {
            var i = t.length,
                o = [];
            if (i) {
                var a = i;
                for (e = Math.abs(e); a--;) e = (i * (a + 1) ^ e + a) % i, o[a] = e
            }
            return o
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.audioUnmaskSource = o;
        var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
            l = {
                v: function(t) {
                    return t.split("").reverse().join("")
                },
                r: function(t, e) {
                    t = t.split("");
                    for (var i, o = r + r, a = t.length; a--;) i = o.indexOf(t[a]), ~i && (t[a] = o.substr(i - e, 1));
                    return t.join("")
                },
                s: function(t, e) {
                    var i = t.length;
                    if (i) {
                        var o = s(t, e),
                            a = 0;
                        for (t = t.split(""); ++a < i;) t[a] = t.splice(o[i - 1 - a], 1, t[a])[0];
                        t = t.join("")
                    }
                    return t
                },
                i: function(t, e) {
                    return l.s(t, e ^ vk.id)
                },
                x: function(t, e) {
                    var i = [];
                    return e = e.charCodeAt(0), each(t.split(""), function(t, o) {
                        i.push(String.fromCharCode(o.charCodeAt(0) ^ e))
                    }), i.join("")
                }
            }
    },
    142: function(module, exports, __webpack_require__) {
        "use strict";

        function _interopRequireDefault(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function _loadAllPlaylistAudios(playlist, onDone) {
            if (!playlist.hasMore() || !playlist.isFullyLoadable()) return onDone && onDone();
            var onAllLoaded = function() {
                    if (isDeleted) return onDone && onDone(null, isDeleted);
                    var t = [];
                    each(chunks, function(e, i) {
                        i && (t = t.concat(i))
                    }), each(getAudioPlayer().getPlaylists(), function(e, i) {
                        i.getId() == playlist.getId() && (i._list = t)
                    }), getAudioPlayer().mergePlaylistData(playlist, {
                        hasMore: !1
                    }), onDone && onDone(playlist)
                },
                _loadChunk = function _loadChunk(chunkIndex, _cb) {
                    ajax.post("al_audio.php", {
                        act: "load_section",
                        type: playlist.getType(),
                        owner_id: playlist.getOwnerId(),
                        playlist_id: playlist.getPlaylistId(),
                        access_hash: playlist.getAccessHash(),
                        offset: chunkIndex * AUDIO_LOAD_CHUNK_SIZE,
                        is_loading_all: 1,
                        claim: intval(nav.objLoc.claim)
                    }, {
                        onDone: function onDone(data, tpl, langs, templatesScript) {
                            if (0 == chunkIndex) {
                                if (addTemplates({
                                        audio_playlist_snippet: tpl
                                    }), extend(cur.lang, langs), templatesScript && eval(templatesScript), !data) return isDeleted = !0, _cb();
                                totalCount = data.totalCount, getAudioPlayer().mergePlaylistData(playlist, data)
                            }
                            chunks[chunkIndex] = data.list, _cb()
                        }
                    })
                },
                _loadAllChunks = function(t, e) {
                    e = e || 0;
                    var i = Math.max(0, Math.ceil(totalCount / AUDIO_LOAD_CHUNK_SIZE));
                    if (0 >= i - e) t();
                    else
                        for (var o = new callHub(t, i - e), a = e; i > a; a++) _loadChunk(a, function() {
                            o.done()
                        })
                },
                chunks = [],
                totalCount = playlist.getTotalCount(),
                isDeleted = !1;
            void 0 === totalCount ? _loadChunk(0, function() {
                isDeleted ? onAllLoaded() : _loadAllChunks(onAllLoaded, 1)
            }) : _loadAllChunks(onAllLoaded, 0)
        }

        function _updateAudioSoundBars(t, e, i) {
            var o = t.getContext("2d");
            o.clearRect(0, 0, t.width, t.height), o.fillStyle = i ? "#3D6899" : "#ffffff";
            for (var a = 12, s = 0; 4 > s; s++) {
                var r = 2 + e[s] * a;
                o.fillRect(13 + 4 * s, a - r + 14, 2, r)
            }
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            _slicedToArray = function() {
                function t(t, e) {
                    var i = [],
                        o = !0,
                        a = !1,
                        s = void 0;
                    try {
                        for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                    } catch (n) {
                        a = !0, s = n
                    } finally {
                        try {
                            !o && l["return"] && l["return"]()
                        } finally {
                            if (a) throw s
                        }
                    }
                    return i
                }
                return function(e, i) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            _audio_unmask_source = __webpack_require__(99),
            _audio_layer = __webpack_require__(68),
            _audio_layer2 = _interopRequireDefault(_audio_layer);
        window.AudioLayer = _audio_layer2["default"], window.AudioUtils = {
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
            AUDIO_ITEM_INDEX_COVER_URL: 14,
            AUDIO_ITEM_INDEX_TRACK_GENRE: 15,
            AUDIO_ITEM_CAN_ADD_BIT: 2,
            AUDIO_ITEM_CLAIMED_BIT: 4,
            AUDIO_ITEM_LONG_PERFORMER_BIT: 32,
            AUDIO_ITEM_UMA_BIT: 128,
            AUDIO_ITEM_REPLACEABLE: 512,
            AUDIO_ENOUGH_LOCAL_SEARCH_RESULTS: 500,
            AUDIO_RECOMS_TYPE_LISTENED: "recoms6",
            AUDIO_PLAYING_CLS: "audio_row__playing",
            AUDIO_CURRENT_CLS: "audio_row__current",
            AUDIO_LAYER_HEIGHT: 550,
            AUDIO_LAYER_MIN_WIDTH: 400,
            AUDIO_LAYER_MAX_WIDTH: 1e3,
            AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
            AUDIO_MAX_AUDIOS_IN_SNIPPET: 5,
            AUDIO_ROW_COVER_SIZE: 40,
            AUDIO_ROW_PLAY_SIZE: 24,
            AUDIO_ROW_ACTION_ROW_ITEM: '<div role="button" class="audio_row__more_action audio_row__more_action_%0% _audio_row__more_action_%0% %3%">%2%</div>',
            audioSearchPerformer: function(t, e, i) {
                var o = window.AudioPage ? currentAudioPage(t) : !1,
                    a = window.AudioPage && currentAudioPage(t) || cur.audioPage;
                layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                    a ? (e = unclean(e).replace(/<em>|<\/em>/g, ""), nav.change({
                        q: e,
                        performer: 1
                    }, i, {
                        searchPerformer: !0,
                        nav: !0,
                        isLayer: o.isLayer()
                    })) : nav.go(t, i)
                }, 50)
            },
            toggleAudioLyrics: function(t, e) {
                var i = geByClass1("_audio_row__lyrics", t);
                if (i) {
                    var o = toggle(i);
                    if (o) {
                        var a = getSize(t)[1],
                            s = getSize(i)[1];
                        setStyle(t, "height", a + s), data(t, "prevHeight", a)
                    } else {
                        var r = data(t, "prevHeight");
                        setStyle(t, "height", r)
                    }
                } else addClass(t, "audio_loading"), ajax.post("al_audio.php", {
                    act: "get_lyrics",
                    aid: e.fullId,
                    lid: e.lyrics
                }, {
                    onDone: function(o) {
                        removeClass(t, "audio_loading"), i = se('<div class="_audio_row__lyrics audio_row__lyrics" data-nodrag="1" style="display:none;"><div class="audio_row__lyrics_inner">' + o + "</div></div>"), geByClass1("_audio_row_content", t).appendChild(i), AudioUtils.toggleAudioLyrics(t, e)
                    }
                })
            },
            getRowActionName: function(t, e, i) {
                var o = void 0,
                    a = AudioUtils.getAddRestoreInfo();
                switch (t) {
                    case "current_delete":
                        o = getLang("audio_delete_from_current");
                        break;
                    case "recoms_delete":
                        o = getLang("audio_dont_show");
                        break;
                    case "listened_delete":
                        o = getLang("audio_remove_from_list");
                        break;
                    case "delete":
                        if (window.AudioPage && AudioPage.isInRecentPlayed(i)) o = getLang("audio_remove_from_list");
                        else {
                            var s = a[e.fullId];
                            o = s && s.deleteAll ? s.deleteAll.text : getLang("global_delete_audio")
                        }
                        break;
                    case "restore_recoms":
                        o = getLang("audio_restore_audio");
                        break;
                    case "add":
                        var r = a[e.fullId];
                        if (r && "deleted" == r.state) o = getLang("audio_restore_audio");
                        else if (r && "added" == r.state) o = getLang("global_delete_audio");
                        else {
                            var l = window.AudioPage ? currentAudioPage(i) : !1;
                            o = l && l.getOwnerId() < 0 && l.canAddToGroup() ? getLang("audio_add_to_group") : getLang("audio_add_to_audio")
                        }
                        break;
                    case "edit":
                        o = getLang("audio_edit_audio");
                        break;
                    case "next":
                        o = cur.lang && cur.lang.global_audio_set_next_audio || getLang("audio_set_next_audio");
                        break;
                    case "recoms":
                        o = getLang("audio_show_recommendations");
                        break;
                    default:
                        o = ""
                }
                return o
            },
            onRowOver: function onRowOver(audioEl, event, forceRedraw) {
                var _this2 = this;
                data(audioEl, "leaved", !1), (!data(audioEl, "actions") || forceRedraw) && (hasClass(audioEl, "no_extra") || (clearTimeout(window.audioRowHoverTO), window.audioRowHoverTO = setTimeout(function() {
                    var audio = AudioUtils.getAudioFromEl(audioEl),
                        audioObject = AudioUtils.getAudioFromEl(audioEl, !0),
                        actions = [],
                        moreActions = [],
                        context = AudioUtils.getContextPlaylist(audioEl, !0),
                        _AudioUtils$contextSp = AudioUtils.contextSplit(context),
                        _AudioUtils$contextSp2 = _slicedToArray(_AudioUtils$contextSp, 2),
                        contextSection = _AudioUtils$contextSp2[0],
                        contextObjectId = _AudioUtils$contextSp2[1],
                        extra = AudioUtils.getAudioExtra(audioObject);
                    if (audioObject.isDeleted)
                        if ("recoms_recoms" == contextSection) actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                        else {
                            var deleteRestoreInfo = AudioUtils.getAddRestoreInfo();
                            deleteRestoreInfo[audioObject.fullId] && deleteRestoreInfo[audioObject.fullId].deleteAll && actions.push(["delete", AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']), actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"'])
                        }
                    else {
                        var actionsList = ["next", "add", "share", "add_to_playlist"];
                        if (extra.claim && nav.objLoc.claim || audioObject.isReplaceable) actionsList = [];
                        else if (audioObject.isFromCurrentPlaylist) actionsList = ["recoms", "add", audioObject.isCurrent ? !1 : "current_delete", "share", "add_to_playlist"];
                        else if (audioObject.isInSnippet) actionsList = ["recoms", "next", "edit", "add", "share", "add_to_playlist"];
                        else if (audioObject.isInEditBox) actionsList = [];
                        else if (audioObject.isInFastChat) actionsList = ["add"];
                        else if (vk.widget) actionsList = vk.id ? ["add"] : [];
                        else if (contextSection) switch (contextSection) {
                            case "my":
                            case "user_list":
                            case "group_list":
                                actionsList = ["recoms", "edit", "next", "add", "delete", "share", "add_to_playlist"];
                                break;
                            case "edit_playlist":
                                actionsList = ["add", "next", "edit"];
                                break;
                            case "recoms_recoms":
                                actionsList = ["recoms", "next", "add", "recoms_delete", "share", "add_to_playlist"];
                                break;
                            case "recoms_recent_audios":
                                actionsList = ["recoms", "edit", "next", "add", "listened_delete", "share", "add_to_playlist"];
                                break;
                            case "module":
                                actionsList = [];
                                break;
                            case "attach":
                            case "attach_preview":
                                actionsList = [];
                                break;
                            default:
                                audioObject.isCurrent && audioObject.withInlinePlayer && (actionsList = ["recoms", "add", "share", "add_to_playlist"])
                        }
                        actionsList.push("uma"), audioObject.isReplaceable && actionsList.push("replace"), extra.moder_actions && each(extra.moder_actions, function(i, act) {
                            moreActions.push(["moder_" + i, function(audioEl, audio) {
                                eval(act[1])
                            }, act[2]])
                        });
                        var ap = getAudioPlayer();
                        each(actionsList, function(t, e) {
                            switch (e) {
                                case "next":
                                    audioObject.isCurrent || audioObject.isClaimed || actions.push(["next", ap.setNext.bind(ap), "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "restore_recoms":
                                    actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "add":
                                    var i = vk.id;
                                    cur.audioPage && cur.audioPage.canAddToGroup() && (i = cur.audioPage.getOwnerId()), !audioObject.isClaimed && audioObject.canAdd && audioObject.ownerId != i && actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "recoms":
                                    cur.audioPage && actions.push(["recoms", AudioUtils.showRecoms, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "uma":
                                    audioObject.isUMA && actions.push(["uma", AudioUtils.getUMAInfo, "UMA"]);
                                    break;
                                case "replace":
                                    audioObject.isReplaceable && actions.push(["replace", function() {
                                        showAudioClaimWarning(audioObject, extra.claim, AudioUtils.replaceWithOriginal.bind(AudioUtils, audioEl, audioObject))
                                    }, getLang("global_audio_replace")]);
                                    break;
                                case "edit":
                                    audioObject.canEdit && !vk.widget && inArray(contextSection, ["my", "group_list"]) && actions.push(["edit", AudioUtils.editAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "delete":
                                    !audioObject.canDelete || audioObject.isInRecomsBlock || vk.widget || actions.push(["delete", AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "current_delete":
                                    actions.push(["current_delete", AudioUtils.deleteCurrentAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "recoms_delete":
                                    audioObject.isInRecomsBlock || actions.push(["recoms_delete", AudioUtils.deleteRecomsAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "listened_delete":
                                    audioObject.isInRecomsBlock || actions.push(["listened_delete", AudioUtils.deleteListenedAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                    break;
                                case "share":
                                    audioObject.isClaimed || moreActions.push(["share", AudioUtils.shareAudio, getLang("audio_share_audio")]);
                                    break;
                                case "add_to_playlist":
                                    audioObject.isClaimed || moreActions.push(["add_to_playlist", "", getLang("audio_add_to_playlist")])
                            }
                        }), extra.claim && nav.objLoc.claim && (audioObject.isSetClaimed ? actions.push(["claim_btn", AudioUtils.unclaim.bind(_this2, audio, audioEl, extra.claim), "Unclaim"]) : actions.push(["claim_btn", AudioUtils.claim.bind(_this2, audio, audioEl, extra.claim), "Claim"]))
                    }
                    if (moreActions.length && actions.push(["more"]), actions.length) {
                        var actionsEl = se('<div class="_audio_row__actions audio_row__actions"></div>');
                        each(actions, function(t, e) {
                            var i = AudioUtils.getRowActionName(e[0], audioObject, audioEl),
                                o = se('<button aria-label="' + i + '" data-action="' + e[0] + '" class="audio_row__action audio_row__action_' + e[0] + " _audio_row__action_" + e[0] + '" ' + (e[3] || "") + ">" + (e[2] || "") + "</button>");
                            o.addEventListener("click", function(t) {
                                return e[1] && e[1].call(window, audioEl, audioObject, audio), cancelEvent(t)
                            }), actionsEl.appendChild(o)
                        });
                        var rowInfoEl = geByClass1("_audio_row__info", audioEl),
                            rowDurationEl = geByClass1("_audio_row__duration", audioEl),
                            rowAlreadyActionsEl = geByClass1("_audio_row__actions", audioEl);
                        re(rowAlreadyActionsEl), setStyle(rowDurationEl, "visibility", "hidden"), rowInfoEl.appendChild(actionsEl);
                        var moreActionsBtnEl = geByClass1("_audio_row__action_more", actionsEl);
                        if (moreActions.length && moreActionsBtnEl) {
                            var moreActionsContentEls = se('<div class="_audio_row__more_actions audio_row__more_actions"></div>');
                            each(moreActions, function(t, e) {
                                var i = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, e));
                                if ("add_to_playlist" == e[0]) {
                                    var o = void 0,
                                        a = void 0;
                                    i.addEventListener("mouseenter", o = function() {
                                        clearTimeout(a), a = setTimeout(function() {
                                            i.removeEventListener("mouseenter", o), AudioUtils.initRowPlaylistsChooser(audio, i, moreTooltip)
                                        }, 150)
                                    }), i.addEventListener("mouseleave", function() {
                                        clearTimeout(a)
                                    })
                                } else i.addEventListener("click", function(t) {
                                    return e[1].call(window, audioEl, audioObject), cancelEvent(t)
                                });
                                moreActionsContentEls.appendChild(i)
                            });
                            var layerTooltip = gpeByClass("_eltt_content", audioEl),
                                tooltipAppendOption = layerTooltip ? {
                                    appendTo: layerTooltip
                                } : {
                                    appendToParent: !0
                                },
                                moreTooltip = new ElementTooltip(moreActionsBtnEl, extend({
                                    cls: "_audio_row__tt",
                                    defaultSide: "bottom",
                                    rightShift: 20,
                                    content: moreActionsContentEls,
                                    bottomGap: 150,
                                    preventSideChange: !0,
                                    autoShow: !0,
                                    onFirstTimeShow: function(t, e) {
                                        domData(e, "nodrag", 1), setTimeout(function() {
                                            this.getOptions().bottomGap = 0
                                        }.bind(this))
                                    },
                                    onHide: function() {
                                        data(audioEl, "leaved") && AudioUtils.onRowLeave(audioEl)
                                    }
                                }, {
                                    appendToParent: !0
                                }));
                            data(audioEl, "tt", moreTooltip)
                        }
                        data(audioEl, "actions", 1)
                    }
                }, forceRedraw ? 0 : 10)))
            },
            _showPlaylistsChooser: function(t, e, i, o, a, s) {
                var r = i.playlists,
                    l = i.newPlaylistHash,
                    n = i.morePlaylists;
                AudioUtils.copiedToPlaylistAudios = AudioUtils.copiedToPlaylistAudios || {}, AudioUtils.copiedToPlaylistAudiosHashes = AudioUtils.copiedToPlaylistAudiosHashes || {};
                var d = e,
                    u = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_new", 0, getLang("audio_add_to_new_pl"), "audio_row__action_playlist"]));
                if (domInsertAfter(u, d), d = u, u.addEventListener("click", function() {
                        AudioUtils.editPlaylist(o, !1, "edit", {
                            addAudio: s,
                            newPlaylistHash: l
                        })
                    }), each(r, function(t, e) {
                        var i = !0,
                            o = e[0] + "_" + e[1] + "_" + a.fullId,
                            s = AudioUtils.copiedToPlaylistAudios[o],
                            r = "audio_row__action_playlist";
                        (e[3] || s) && (i = !1, r += " audio_row__more_playlist_added");
                        var l = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_" + e[0] + "_" + e[1], 0, e[2], r]));
                        domInsertAfter(l, d), d = l;
                        var n = !1;
                        l.addEventListener("click", function() {
                            if (!n) {
                                n = !0;
                                var t = a.ownerId,
                                    s = a.id,
                                    r = AudioUtils.copiedToPlaylistAudios[o];
                                r && (r = r.split("_"), t = r[0], s = r[1]), i && (AudioUtils.copiedToPlaylistAudiosHashes[o] = e[4]), ajax.post("al_audio.php", {
                                    act: "add_audio_to_playlist",
                                    hash: e[4],
                                    playlist_id: e[1],
                                    playlist_owner_id: e[0],
                                    audio_owner_id: t,
                                    audio_id: s,
                                    do_add: intval(i)
                                }, {
                                    onDone: function(t, a, s) {
                                        AudioUtils.copiedToPlaylistAudios[o] = i ? s : !1, e[4] = i ? t : AudioUtils.copiedToPlaylistAudiosHashes[o], i = !i, n = !1
                                    }
                                }), toggleClass(l, "audio_row__more_playlist_added", i)
                            }
                        })
                    }), n) {
                    var _ = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_more", 0, getLang("audio_row_show_all_playlists"), "audio_row__action_playlist"]));
                    _.addEventListener("click", function() {
                        showBox("al_audio.php?act=more_playlists_add", {
                            owner_id: o,
                            audio_owner_id: a.ownerId,
                            audio_id: a.id
                        }, {
                            params: {
                                bodyStyle: "padding: 0px",
                                width: 560
                            }
                        })
                    }), domInsertAfter(_, d), d = _
                }
                t.updatePosition()
            },
            initRowPlaylistsChooser: function(t, e, i) {
                var o = AudioUtils.asObject(t),
                    a = void 0;
                a = cur.audioPage && cur.audioPage.getOwnerId() < 0 && cur.audioPage.canEditGroup() ? cur.audioPage.getOwnerId() : vk.id, AudioUtils.playlistsByAudioDataCache = AudioUtils.playlistsByAudioDataCache || {};
                var s = AudioUtils.playlistsByAudioDataCache,
                    r = a + "_" + o.ownerId + "_" + o.id;
                s[r] ? AudioUtils._showPlaylistsChooser(i, e, s[r], a, o, t) : ajax.post("al_audio.php", {
                    act: "playlists_by_audio",
                    owner_id: a,
                    audio_owner_id: o.ownerId,
                    audio_id: o.id
                }, {
                    onDone: function(l, n, d) {
                        var u = s[r] = {
                            playlists: l,
                            morePlaylists: n,
                            newPlaylistHash: d
                        };
                        AudioUtils._showPlaylistsChooser(i, e, u, a, o, t)
                    }
                })
            },
            onAudioAddedToPlaylist: function(t, e, i, o) {
                var a = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, e);
                a.addAudio(o, 0), each(geByClass("_audio_pl_" + t + "_" + e), function(t, e) {
                    domReplaceEl(e, se(i))
                })
            },
            onRowLeave: function(t) {
                data(t, "leaved", !0);
                var e = data(t, "tt");
                if ((!e || !e.isShown()) && (clearTimeout(window.audioRowHoverTO), data(t, "actions"))) {
                    var i = geByClass1("_audio_row__actions", t),
                        o = geByClass1("_audio_row__duration", t);
                    re(i), setStyle(o, "visibility", "visible"), data(t, "actions", 0)
                }
            },
            addToPlaylistsBoxInit: function(t, e, i, o, a) {
                function s() {
                    p && p.destroy(), n.innerHTML = "";
                    var t = [];
                    t = c ? o.filter(function(t) {
                        return t[2].toLowerCase().indexOf(c) >= 0
                    }) : o, toggle(n, 0 != t.length), toggle(u, 0 == t.length), p = new AutoList(n, {
                        onNeedRows: function(e, i) {
                            for (var o = [], a = i, s = Math.min(t.length, i + 30), r = a; s > r; r++) {
                                var l = t[r];
                                if (l) {
                                    var n = l[4] ? "ape_selected" : "",
                                        d = '<div class="ape_check"><div class="ape_check_icon"></div></div>',
                                        u = '<div class="ape_pl_item _ape_pl_item ' + n + '" data-id="' + l[1] + '">' + d + '<div class="ape_pl_item_inner"><span class="ape_pl_title">' + l[2] + '</span> <span class="ape_pl_size">' + l[3] + "</span></div></div>";
                                    o.push(u)
                                }
                            }
                            e(o)
                        }
                    })
                }
                var r = curBox(),
                    l = geByClass1("_audio_atp_content", r.bodyNode),
                    n = geByClass1("_audio_atp_list", r.bodyNode),
                    d = ge("audio_atp_search"),
                    u = geByClass1("_audio_atp_empty"),
                    _ = getSize(l)[1];
                setStyle(n, {
                    height: _ - getSize(d)[1]
                });
                var c = "",
                    p = void 0;
                s(), cur.addToPlaylistSearch = debounce(function(t) {
                    c = trim(t).toLowerCase(), s()
                }, 200);
                var h = {},
                    y = {};
                addEvent(n, "click", function(t) {
                    var e = domClosest("_ape_pl_item", t.target),
                        i = domData(e, "id"),
                        o = toggleClass(e, "ape_selected");
                    o ? (y[i] = !0, delete h[i]) : (h[i] = !0, delete y[i])
                }), r.removeButtons(), r.addButton(getLang("global_save"), function(o) {
                    var s = Object.keys(y),
                        l = Object.keys(h);
                    ajax.post("al_audio.php", {
                        act: "save_audio_in_playlists",
                        add_pl_ids: s.join(","),
                        remove_pl_ids: l.join(","),
                        owner_id: t,
                        audio_owner_id: e,
                        audio_id: i,
                        hash: a
                    }, {
                        showProgress: lockButton.pbind(o),
                        hideProgress: unlockButton.pbind(o),
                        onDone: function() {
                            r.hide()
                        }
                    })
                }, "ok", !0), r.addButton(getLang("global_cancel"), r.hide.bind(this), "no", !0)
            },
            showRecoms: function(t, e) {
                cur.audioPage && cur.audioPage.showRecoms(!1, e.fullId)
            },
            shareAudio: function(t, e) {
                return (e = e || getAudioPlayer().getCurrentAudio()) ? (e = AudioUtils.asObject(e), !showBox("like.php", {
                    act: "publish_box",
                    object: "audio" + e.fullId,
                    list: "s" + vk.id,
                    to: "mail"
                }, {
                    stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"],
                    onFail: function(t) {
                        return showDoneBox(t), !0
                    }
                })) : void 0
            },
            replaceWithOriginal: function(t, e, i) {
                e = e || getAudioPlayer().getCurrentAudio(), e && (e = AudioUtils.asObject(e), ajax.post("al_audio.php", {
                    act: "replace_with_original",
                    hash: e.replaceHash,
                    audio_id: e.fullId
                }, {
                    onDone: function(o) {
                        var a = JSON.parse(e.extra).claim.original;
                        a[AudioUtils.AUDIO_ITEM_INDEX_ID] = o, a[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] = e.ownerId;
                        var s = se(AudioUtils.drawAudio(a));
                        t.parentElement.insertBefore(s, t), t.parentElement.removeChild(t), i && i()
                    },
                    onFail: i
                }))
            },
            editAudio: function(t, e, i) {
                showBox("al_audio.php", {
                    act: "edit_audio_box",
                    aid: e.fullId,
                    force_edit_hash: i
                }, {
                    params: {
                        width: "456px",
                        bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                        hideButtons: 1
                    },
                    dark: 1
                })
            },
            deleteCurrentAudio: function(t, e) {
                var i = getAudioPlayer().getCurrentPlaylist();
                i && i.removeAudio(e.fullId), re(t)
            },
            deleteRecomsAudio: function(t, e) {
                AudioUtils.deleteAudio(t, e, !1, !0)
            },
            deleteListenedAudio: function(t, e) {
                AudioUtils.deleteAudio(t, e, !1, !1, !0)
            },
            deleteAudio: function(t, e, i, o, a) {
                function s() {
                    return intval(domData(t, "in-progress"))
                }

                function r(e) {
                    return domData(t, "in-progress", intval(e))
                }
                if (window.tooltips && tooltips.hideAll(), !s()) {
                    r(!0);
                    var l = !1;
                    e.isClaimed && (l = !0);
                    var n = AudioUtils.getAddRestoreInfo(),
                        d = n[e.fullId];
                    if (d && d.deleteAll) showFastBox({
                        title: getLang("audio_delete_all_title"),
                        dark: 1
                    }, d.deleteConfirmMsg || "", getLang("global_delete"), function(t) {
                        var e = extend({
                            act: "delete_all"
                        }, d.deleteAll);
                        ajax.post("al_audio.php", e, {
                            showProgress: lockButton.pbind(t),
                            onDone: function() {
                                var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, d.deleteAll.from_id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                                getAudioPlayer().deletePlaylist(t), nav.reload()
                            }
                        })
                    }, getLang("global_cancel"));
                    else {
                        if (l ? re(t) : addClass(t, "audio_row__deleted"), a) {
                            ajax.post("al_audio.php", {
                                act: "remove_listened",
                                audio_id: e.id,
                                audio_owner_id: e.ownerId,
                                hash: e.actionHash
                            }), re(t);
                            var u = getAudioPlayer().getCurrentPlaylist();
                            u.getType() == AudioPlaylist.TYPE_RECOM && u.getAlbumId() == AudioUtils.AUDIO_RECOMS_TYPE_LISTENED && u.removeAudio(e.fullId)
                        } else if (o) {
                            var _ = AudioUtils.getAudioExtra(e).recom,
                                c = {
                                    act: "hide_recommendation",
                                    hash: _.hash,
                                    audio_id: e.fullId
                                };
                            nav.objLoc.audio_id && (c.recommendation_type = "query"), ajax.post("al_audio.php", c, {
                                onDone: function() {
                                    r(!1)
                                }
                            }), n[e.fullId] = {
                                state: "recom_hidden"
                            };
                            var p = getAudioPlayer().getCurrentPlaylist();
                            p && p.getType() == AudioPlaylist.TYPE_RECOM && (n[e.fullId].removedCurrentPos = p.removeAudio(e))
                        } else ajax.post("al_audio.php", {
                            act: "delete_audio",
                            oid: e.ownerId,
                            aid: e.id,
                            hash: e.deleteHash,
                            restore: 1
                        }, {
                            onDone: function(i, o) {
                                l || r(!1), n[e.fullId] = {
                                    state: "deleted",
                                    deleteAll: i,
                                    deleteConfirmMsg: o
                                }, l && AudioUtils.deleteDeletedAudios(), AudioUtils.onRowOver(t, !1, !0)
                            }
                        });
                        AudioUtils.onRowOver(t, !1, !0)
                    }
                }
            },
            deleteDeletedAudios: function() {
                each(AudioUtils._audioAddRestoreInfo || {}, function(t, e) {
                    ("deleted" == e.state || "recom_hidden" == e.state) && getAudioPlayer().deleteAudioFromAllPlaylists(t)
                })
            },
            contextSplit: function(t) {
                return isObject(t) && (t = t.context), (t || "").split(":")
            },
            showAudioPlaylist: function(t, e, i, o, a, s) {
                return cur.apLayer ? cancelEvent(a) : vk.widget ? !0 : (boxRefreshCoords(boxLoader), show(boxLoader), show(boxLayerWrap), stManager.add(["auto_list.js", "audio.css"], function() {
                    function a(t) {
                        boxQueue.hideAll(), cur.apLayerAutoList && (cur.apLayerAutoList.destroy(), cur.apLayerAutoList = null), layers.wraphide(window.audioPlaylistLayerWrap), layers.fullhide = !1, n && removeEvent(window.audioPlaylistLayerWrap, "click", n), d && removeEvent(bodyNode, "keydown", d), delete cur.apLayer, delete cur.apLayerPlaylistId, removeClass(layerBG, "ap_layer_bg_dark"), nav.change({
                            z: !1
                        }), layerQueue.pop()
                    }

                    function r(r, l) {
                        if (hide(boxLoader), hide(boxLayerWrap), l) {
                            var u = getLang("audio_error_deleted_playlist_box").split("/");
                            return new MessageBox({
                                title: u[0]
                            }).content(u[1]).setButtons(getLang("global_close"), function() {
                                curBox().hide()
                            }).show(), void nav.setLoc(extend(nav.objLoc, {
                                z: null
                            }))
                        }
                        var _ = extend(nav.objLoc, {
                            z: "audio_playlist" + t + "_" + e + (i ? "/" + i : "")
                        });
                        nav.setLoc(_), window.audioPlaylistLayerWrap || (window.audioPlaylistLayerWrap = se('<div class="ap_layer_wrap"></div>'), bodyNode.appendChild(window.audioPlaylistLayerWrap)), window.audioPlaylistLayerWrap.innerHTML = "";
                        var c = r.getAudiosList().length,
                            p = getTemplate("audio_playlist_snippet", {
                                title: r.getTitle(),
                                description: r.getDescription(),
                                coverStyle: r.getCoverUrl() ? "background-image:url('" + r.getCoverUrl() + "'); background-size: cover;" : "",
                                authorLine: r.getAuthorLine(),
                                infoLine1: r.getInfoLine1(),
                                infoLine2: r.getInfoLine2(),
                                id: r.getPlaylistId(),
                                ownerId: r.getOwnerId(),
                                href: "/audio?z=audio_playlist_" + r.getOwnerId() + "_" + r.getPlaylistId() + "/" + r.getAccessHash(),
                                addCls: r.getAddClasses(),
                                followHash: r.getFollowHash(),
                                accessHash: r.getAccessHash(),
                                editHash: r.getEditHash(),
                                deleteHash: r.getDeleteHash(),
                                replaceHash: r.getReplaceHash(),
                                gridCovers: r.getGridCovers(),
                                context: o,
                                followButtonText: r.isFollowed() ? getLang("audio_playlist_btn_followed") : getLang("audio_playlist_btn_follow")
                            });
                        cur.apLayer = se('<div class="ap_layer"><div class="ap_layer__content">' + p + '</div><div class="ap_layer__close _ap_layer__close"></div></div>'), window.audioPlaylistLayerWrap.appendChild(cur.apLayer), addEvent(window.audioPlaylistLayerWrap, "click", n = function(t) {
                            (t.target == window.audioPlaylistLayerWrap || t.target == geByClass1("_ap_layer__close", cur.apLayer)) && layers.fullhide()
                        }), addEvent(bodyNode, "keydown", d = function(t) {
                            return 27 == t.keyCode ? (layers.fullhide(), cancelEvent(t)) : void 0
                        }), layerQueue.push(), layerQueue.hide(), boxQueue.hideAll(), layers.wrapshow(window.audioPlaylistLayerWrap, .7), addClass(layerBG, "ap_layer_bg_dark");
                        var h = geByClass1("_audio_pl_snippet__list", cur.apLayer);
                        c && (cur.apLayerAutoList = new AutoList(h, {
                            scrollNode: window.audioPlaylistLayerWrap,
                            onNeedRows: function(t, e) {
                                for (var i = [], o = r.getUnshuffledAudiosList(), a = e; e + 30 > a && o[a]; a++) i.push(AudioUtils.drawAudio(o[a]));
                                t(i)
                            }
                        })), setStyle(h, {}), boxRefreshCoords(cur.apLayer), getAudioPlayer().updateCurrentPlaying(), layers.fullhide = a, cur.apLayerPlaylistId = [t, e], s && s()
                    }
                    var l = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, e, i);
                    l.loadAll(r);
                    var n, d
                }), !1)
            },
            onAudioChoose: function(t, e, i, o) {
                if (isUndefined(e.selected)) {
                    var a = cur.attachCount && cur.attachCount() || 0;
                    if (cur.chooseMedia("audio", i.fullId, o), (!cur.attachCount || cur.attachCount() > a) && cur.lastAddMedia) {
                        e.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(e), "audio_selected");
                        var s = getSize(e)[0];
                        setStyle(e, "width", s), e.innerHTML = getLang("global_cancel")
                    }
                } else cur.lastAddMedia.unchooseMedia(e.selected), e.selected = void 0, removeClass(domPN(e), "audio_selected"), e.innerHTML = getLang("global_add_media");
                return cancelEvent(t)
            },
            onPlaylistChoose: function(t, e) {
                var i = e.getAccessHash();
                cur.chooseMedia("audio_playlist", e.getOwnerId() + "_" + e.getPlaylistId() + (i ? ":" + i : ""), {
                    id: e.getPlaylistId(),
                    ownerId: e.getOwnerId(),
                    coverUrl: e.getCoverUrl(),
                    gridCovers: e.getGridCovers(),
                    title: e.getTitle(),
                    authorName: e.getAuthorName(),
                    authorHref: e.getAuthorHref(),
                    accessHash: e.getAccessHash()
                })
            },
            editPlaylist: function(t, e, i, o) {
                stManager.add(["audio.js", "audio.css", "auto_list.js"], function() {
                    ajax.post("al_audio.php", {
                        act: "playlists_edit_data",
                        owner_id: t
                    }, {
                        onDone: function(a) {
                            a.audio_playlist_cover_upload_options && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[t] = a.audio_playlist_cover_upload_options), AudioPage.editPlaylist(t, e, i, o)
                        }
                    })
                })
            },
            followPlaylist: function(t, e, i, o) {
                function a(o) {
                    var a = domData(t, "text-followed"),
                        s = domData(t, "text-follow");
                    domData(t, "tooltip-text", o ? a : s), l.setFollowed(o);
                    var r = l.getAddClasses() || "";
                    r = r.replace("audio_pl__followed", ""), o && (r += " audio_pl__followed"), l.mergeWith({
                        addClasses: r
                    }), each(geByClass("_audio_pl_" + e + "_" + i), function(t, e) {
                        toggleClass(e, "audio_pl__followed", o)
                    })
                }
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
                var s = gpeByClass("_audio_pl", t),
                    r = toggleClass(s, "audio_pl__followed"),
                    l = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, i);
                a(r), ajax.post("al_audio.php", {
                    act: "follow_playlist",
                    playlist_owner_id: e,
                    playlist_id: i,
                    hash: o
                }, {
                    onFail: function(t) {
                        var e = new MessageBox({
                            title: getLang("global_error")
                        });
                        return e.content(t).setButtons("Ok", function() {
                            curBox().hide()
                        }).show(), a(!1), !0
                    }
                })
            },
            getLayer: function() {
                var t = window.audioLayer;
                return t || (window.audioLayer = t = new _audio_layer2["default"]), t
            },
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
                return AudioUtils._audioAddRestoreInfo = AudioUtils._audioAddRestoreInfo || {}, AudioUtils._audioAddRestoreInfo
            },
            addAudio: function(t, e) {
                function i() {
                    return intval(domData(t, "in-progress"))
                }

                function o(e) {
                    return domData(t, "in-progress", intval(e))
                }
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
                if (!i()) {
                    o(!0), e || (e = AudioUtils.getAudioFromEl(t, !0));
                    var a = window.AudioPage && currentAudioPage(t),
                        s = a && a.getOwnerId() < 0 && a.canAddToGroup(),
                        r = s ? -a.getOwnerId() : 0,
                        l = AudioUtils.getAddRestoreInfo(),
                        n = l[e.fullId],
                        d = geByClass1("_audio_row_" + e.fullId);
                    d = d == t ? !1 : d;
                    var u, _ = a && a.getPageCurrentPlaylist(),
                        c = AudioUtils.getContextPlaylist(t, !0);
                    c && (c = AudioUtils.contextSplit(c), u = c[0]), ("search" == u && _ && _.getSearchQid() || "search" == cur.module && cur.qid) && (u = "search:external");
                    var p = {
                        act: "add",
                        group_id: r,
                        audio_owner_id: e.ownerId,
                        audio_id: e.id,
                        hash: e.addHash,
                        from: u || ""
                    };
                    n ? "recom_hidden" == n.state ? (a && (a.restoreRecommendation(t), o(!1)), AudioUtils.onRowOver(t, !1, !0)) : "deleted" == n.state ? (ajax.post("al_audio.php", {
                        act: "restore_audio",
                        oid: e.ownerId,
                        aid: e.id,
                        hash: e.editHash
                    }, {
                        onDone: function() {
                            o(!1)
                        }
                    }), removeClass(t, "audio_row__deleted"), delete l[e.fullId], AudioUtils.onRowOver(t, !1, !0)) : "added" == n.state && (ajax.post("al_audio.php", {
                        act: "delete_audio",
                        oid: n.audio.ownerId,
                        aid: n.audio.id,
                        hash: n.audio.deleteHash
                    }, {
                        onDone: function() {
                            if (a) {
                                var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, r ? -r : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                                t.removeAudio(n.addedFullId)
                            }
                            o(!1)
                        }
                    }), removeClass(t, "audio_row__added"), d && removeClass(d, "audio_row__added"), delete l[e.fullId], getAudioPlayer().notify(AudioPlayer.EVENT_REMOVED, e.fullId, n.addedFullId)) : (ajax.post("al_audio.php", p, {
                        onDone: function(t) {
                            if (t) {
                                var i = t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID];
                                l[e.fullId] = {
                                    state: "added",
                                    addedFullId: i,
                                    audio: AudioUtils.asObject(t)
                                };
                                var a = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, r ? -r : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                                a.addAudio(t, 0), _ && _.getType() == AudioPlaylist.TYPE_SEARCH && _.sendSearchStats("search_add")
                            }
                            o(!1)
                        },
                        onFail: function(e) {
                            return e && new MessageBox({
                                title: getLang("global_error")
                            }).content(e).setButtons("Ok", function() {
                                curBox().hide()
                            }).show(), removeClass(t, "audio_row__added"), o(!1), !0
                        }
                    }), addClass(t, "audio_row__added"), d && addClass(d, "audio_row__added"), getAudioPlayer().notify(AudioPlayer.EVENT_ADDED, e.fullId), a && a.onUserAction(e, _))
                }
            },
            addAudioToOwner: function(t, e) {
                return window.onAudioPageLoaded = function() {
                    return this.uploadAudio({})
                }, nav.go("audios" + t), cancelEvent(e)
            },
            chooseAudioBox: function(t, e, i) {
                if (void 0 !== t.selected) cur.lastAddMedia.unchooseMedia(t.selected), t.selected = void 0, removeClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.add;
                else {
                    var o = cur.attachCount && cur.attachCount() || 0;
                    cur.chooseMedia("audio", e.owner_id + "_" + e.id, e.info), (!cur.attachCount || cur.attachCount() > o) && cur.lastAddMedia && (t.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.cancel)
                }
                return cancelEvent(i)
            },
            drawAudio: function(t, e) {
                for (var i = JSON.parse(getTemplate("audio_bits_to_cls")), o = t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS], a = [], s = 0; 32 > s; s++) {
                    var r = 1 << s;
                    o & r && a.push(i[r])
                }
                e && a.push(e);
                var l = "";
                if (t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL]) {
                    var n = t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL].split(",");
                    l = "background-image: url(" + n[0] + ")"
                }
                var d = formatTime(t[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
                    u = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, ""),
                    _ = clean(JSON.stringify(t)).split("$").join("$$"),
                    c = getTemplate("audio_row", t);
                return c = c.replace(/%cls%/, a.join(" ")), c = c.replace(/%duration%/, d), c = c.replace(/%serialized%/, _), c = c.replace(/%cover_style%/, l), c = c.replace(/%search_href%/, "/search?c[q]=" + encodeURIComponent(u) + "&c[section]=audio&c[performer]=1")
            },
            isClaimedAudio: function(t) {
                return t = AudioUtils.asObject(t), t.flags & AudioUtils.AUDIO_ITEM_CLAIMED_BIT
            },
            getAudioExtra: function(t) {
                return t = AudioUtils.asObject(t), "object" === _typeof(t.extra) ? t.extra : JSON.parse(t.extra || "{}")
            },
            getAudioFromEl: function(t, e) {
                t = domClosest("_audio_row", t);
                var i = data(t, "audio");
                return i || (i = JSON.parse(domData(t, "audio"))), e && (i = AudioUtils.asObject(i), i.isDeleted = hasClass(t, "audio_row__deleted"), i.isCurrent = hasClass(t, AudioUtils.AUDIO_CURRENT_CLS), i.isPlaying = hasClass(t, AudioUtils.AUDIO_PLAYING_CLS), i.isFromCurrentPlaylist = !!gpeByClass("_audio_section__current", t), i.isNumeric = !!gpeByClass("audio_numeric", t), i.isWithCovers = !!gpeByClass("audio_w_covers", t), i.withInlinePlayer = !i.isWithCovers && !gpeByClass("audio_no_inline_player", t), i.isInSnippet = !!gpeByClass("_audio_pl_snippet__list", t), i.isInEditBox = !!gpeByClass("_audio_pl_edit_box", t), i.isInRecomsBlock = !!gpeByClass("_audio_recoms_blocks", t), i.isInFastChat = !!gpeByClass("fc_tab", t), i.isInAttach = !!gpeByClass("media_preview", t), i.isSetClaimed = hasClass(t, "audio_moder_claimed")), i
            },
            asObject: function(t) {
                if (!t) return null;
                if (isObject(t)) return t;
                if ("string" == typeof t) return {
                    id: t
                };
                var e = (t[AudioUtils.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
                    i = (t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL] || "").split(",");
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
                    addHash: e[0] || "",
                    editHash: e[1] || "",
                    actionHash: e[2] || "",
                    deleteHash: e[3] || "",
                    replaceHash: e[4] || "",
                    canEdit: !!e[1],
                    canDelete: !!e[3],
                    isLongPerformer: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_LONG_PERFORMER_BIT,
                    canAdd: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CAN_ADD_BIT),
                    coverUrl_s: i[0],
                    coverUrl_p: i[1],
                    isClaimed: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CLAIMED_BIT),
                    isUMA: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_UMA_BIT),
                    isReplaceable: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_REPLACEABLE),
                    trackGenre: t[AudioUtils.AUDIO_ITEM_INDEX_TRACK_GENRE]
                }
            },
            initDomPlaylist: function(t, e) {
                var i = [];
                return each(e, function(t, e) {
                    e && each(geByClass("_audio_row", e), function(t) {
                        i.push(AudioUtils.getAudioFromEl(this))
                    })
                }), t.addAudio(i), t
            },
            getContextPlaylist: function(t, e) {
                function i(t) {
                    return [].slice.call(t)
                }
                var o, a = getAudioPlayer(),
                    s = AudioUtils.getAudioFromEl(t, !0),
                    r = null,
                    l = [],
                    n = domData(t, "new-post"),
                    d = !1,
                    u = null,
                    _ = AudioPlaylist.TYPE_TEMP,
                    c = vk.id,
                    p = {},
                    h = [],
                    y = t,
                    A = window.AudioPage && currentAudioPage(t),
                    f = window.traverseParent || function(t, e) {
                        for (t = ge(t); t && !e(t) && (t = domPN(t), t != document););
                        return null
                    };
                if (f(t, function(t) {
                        return d = domData(t, "audio-context")
                    }), d = s.context || d, d = d || ("audio" == cur.module ? cur.submodule : cur.module), e) return {
                    context: d
                };
                var g = AudioUtils.contextSplit(d),
                    P = _slicedToArray(g, 2),
                    E = P[0],
                    v = P[1],
                    m = gpeByClass("_audio_pl", t);
                if (m) {
                    var I = (domData(m, "playlist-id") || "").split("_");
                    u = a.getPlaylist.apply(a, I);
                    var T = domData(m, "title") || "";
                    T && u.mergeWith({
                        title: T
                    });
                    var L = domData(m, "access-hash") || "";
                    for (L && u.mergeWith({
                            accessHash: L
                        }), A && A.getPageCurrentPlaylist() == u && A.getSortedList() ? u.initSortedList(A.getSortedList()) : s.isFromCurrentPlaylist || (u.removeSortedList(), u.shuffle(0)); y = domPN(y);) h.push((y.id ? "#" + y.id : "") + (y.className ? "." + y.className : ""));
                    h = h.slice(0, 30), h = h.filter(function(t) {
                        return !!trim(t)
                    }), h = h.reverse().join(" / "), h = document.location.href + " : " + h
                } else if (A && A.getPageCurrentPlaylist()) u = A.getPageCurrentPlaylist();
                else if ("module" == E) {
                    var w = v;
                    u = a.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, w || cur.oid || vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID), l = [r]
                } else if (0 === s.context.indexOf("im")) r = gpeByClass("_im_peer_history", t), r = r || gpeByClass("_fc_tab_log_msgs", t), o = "im" + (cur.peer || "");
                else if (0 === s.context.indexOf("board")) o = s.context, l = i(geByClass("_wall_audio_rows", r));
                else if (0 === s.context.indexOf("widget")) o = s.context;
                else if (0 === s.context.indexOf("wiki")) o = "wiki";
                else if (0 === s.context.indexOf("post")) {
                    _ = AudioPlaylist.TYPE_WALL, o = s.context;
                    var C = s.context.replace("post", "").split("_");
                    c = C[0], p = {
                        postId: C[1]
                    }
                } else if (0 === s.context.indexOf("choose")) o = s.context;
                else if ("feed" == n || 0 === s.context.indexOf("feed") || 0 === s.context.indexOf("feedsearch")) o = "feed", l = i(geByClass("wall_text", r));
                else if ("group_wall" == E || "user_wall" == E || 0 === s.context.indexOf("reply") || "wall" == n) {
                    _ = AudioPlaylist.TYPE_WALL, c = cur.oid;
                    var C = (v || "").split("_")[1],
                        S = cur.wallQuery || "",
                        U = ge("wall_search"),
                        D = inArray(cur.wallType, ["own", "full_own"]) ? "own" : "all";
                    o = hashCode(D + "_" + S), "wall" == cur.module && val(U) && (S = val(U)), C && (p = {
                        postId: C,
                        wallQuery: S,
                        wallType: D
                    });
                    var O = 0 === s.context.indexOf("reply");
                    O && (l = i([gpeByClass("_replies_list", t)]), o = "reply" + o), l = l.concat(i([r]))
                } else {
                    for (; y = domPN(y);) h.push((y.id ? "#" + y.id : "") + (y.className ? "." + y.className : ""));
                    h = h.slice(0, 30), h = h.filter(function(t) {
                        return !!trim(t)
                    }), h = h.reverse().join(" / "), h = document.location.href + " : " + h
                }
                return r || (r = domPN(t)), l = l.filter(function(t) {
                    return !!t
                }), l && 0 != l.length || (l = [r]), u = u ? u : a.getPlaylist(_, c, o), u = u.getAudiosCount() ? u : AudioUtils.initDomPlaylist(u, l), u.mergeWith(p || {}), -1 == u.indexOfAudio(s) && (u = AudioUtils.initDomPlaylist(u, [domPN(t)])), {
                    playlist: u,
                    context: d
                }
            },
            LOG_LS_KEY: "audiolog",
            debugLog: function() {},
            renderAudioDiag: function() {
                var t = ge("audio_diag_log"),
                    e = ls.get(AudioUtils.LOG_LS_KEY) || [];
                t && each(e, function(e, i) {
                    var o = new Date(i.shift()).toUTCString();
                    i = i.join(", "), t.appendChild(se('<div class="audio_diag_log_row"><span class="audio_diag_log_time">' + o + "</span>" + i + "</div>"))
                })
            },
            claim: function(t, e, i) {
                addClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
                    act: "a_claim",
                    claim_id: i,
                    type: "audio",
                    id: t.id,
                    owner_id: t.ownerId
                })
            },
            unclaim: function(t, e, i) {
                removeClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
                    act: "a_unclaim",
                    claim_id: i,
                    type: "audio",
                    id: t.id,
                    owner_id: t.ownerId,
                    hash: t.actionHash
                })
            },
            getUMAInfo: function(t, e) {
                e.isInEditBox || showBox("al_audio.php", {
                    act: "get_uma_restrictions",
                    id: e.id,
                    owner_id: e.owner_id,
                    hash: e.actionHash
                }, {
                    params: {
                        width: 750
                    }
                })
            },
            cancelReplacement: function(t, e, i) {
                ajax.post("al_audio.php", {
                    act: "cancel_replacement",
                    hash: e,
                    audio_id: t
                }), re(i)
            }
        }, window.TopAudioPlayer = function(t, e) {
            this.ap = getAudioPlayer(), this._el = t, this._playIconBtn = ge("top_audio"), this._audioBtnGroup = ge("top_audio_btn_group"), this.init()
        }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED = 190, TopAudioPlayer.init = function() {
            var t = ge("top_audio_player"),
                e = data(t, "object");
            e || (e = new TopAudioPlayer(t), data(t, "object", e))
        }, TopAudioPlayer.prototype.init = function() {
            function t(t) {
                return hasClass(this, "top_audio_player_play") ? (e.ap.isPlaying() ? e.ap.pause() : e.ap.play(), !1) : hasClass(this, "top_audio_player_prev") ? (e.ap.playPrev(), !1) : hasClass(this, "top_audio_player_next") ? (e.ap.playNext(), !1) : void 0
            }
            var e = this;
            this.ap.on(this, AudioPlayer.EVENT_UPDATE, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PLAY, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PAUSE, this.onPause.bind(this)), this.ap.top = this, each(["prev", "play", "next"], function(i, o) {
                addEvent(geByClass1("top_audio_player_" + o, e._el), "click", t)
            }), addEvent(this._el, "mousedown", function(t) {
                return hasClass(domPN(t.target), "top_audio_player_btn") ? void 0 : (1 != t.which || hasClass(t.target, "top_audio_player_btn") || hasClass(t.target, "top_audio_player_act_icon") || AudioUtils.getLayer().toggle(), cancelEvent(t))
            }), addEvent(ge("top_audio"), "mousedown", function(t) {
                return checkEvent(t) === !0 ? !1 : (AudioUtils.getLayer().toggle(), cancelEvent(t))
            }), browser.safari || addEvent(document, "keydown keyup", function(t) {
                toggleClass(ge("top_audio_play"), "shuffle", t.shiftKey)
            }), this.onPlay(this.ap.getCurrentAudio())
        }, TopAudioPlayer.prototype.onPlay = function(t, e, i) {
            function o() {
                var e = getAudioPlayer();
                setTimeout(function() {
                    var t = AudioUtils.getLayer();
                    t && t.isShown() && t.updatePosition()
                }, 1), addClass(l._el, a), toggleClass(l._el, "top_audio_player_playing", e.isPlaying());
                var o = geByClass1("_top_audio_player_play_blind_label");
                o && (o.innerHTML = e.isPlaying() ? getLang("global_audio_pause") : getLang("global_audio_play")), t = AudioUtils.asObject(t), clearTimeout(l._currTitleReTO);
                var s = geByClass1("top_audio_player_title_out", l._el);
                re(s);
                var r = geByClass1("top_audio_player_title", l._el);
                if (0 != i) {
                    var n = 0 > i ? -10 : 10,
                        d = r.offsetLeft,
                        u = se('<div class="top_audio_player_title top_audio_player_title_next" style="opacity: 0; top:' + n + "px; left: " + d + 'px">' + t.performer + " &ndash; " + t.title + "</div>");
                    u.setAttribute("onmouseover", "setTitle(this)"), i > 0 ? domInsertAfter(u, r) : domInsertBefore(u, r), addClass(r, "top_audio_player_title_out"), setStyle(r, {
                        top: -n,
                        opacity: 0
                    }), setTimeout(function() {
                        setStyle(u, {
                            top: 0,
                            opacity: 1
                        })
                    }, 10), clearTimeout(l._currTitleReTO), l._currTitleReTO = setTimeout(function() {
                        re(r), removeClass(u, "top_audio_player_title_next")
                    }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED)
                } else r.innerHTML = t.performer + " &ndash; " + t.title, r.titleSet = 0, r.setAttribute("onmouseover", "setTitle(this)")
            }
            var a = "top_audio_player_enabled";
            if (!t) {
                removeClass(this._playIconBtn, a), removeClass(this._el, a), removeClass(this._el, "top_audio_player_playing"), show(this._audioBtnGroup);
                var s = geByClass1("top_audio_play__button", this._audioBtnGroup);
                s && removeClass(s, "loading");
                var r = AudioUtils.getLayer();
                return void(r && r.isShown() && r.updatePosition())
            }
            var l = this;
            i = intval(i), hasClass(this._playIconBtn, a) ? o() : (addClass(this._playIconBtn, a), setTimeout(function() {
                hide(l._audioBtnGroup), o()
            }, 150))
        }, TopAudioPlayer.prototype.onPause = function() {
            removeClass(this._el, "top_audio_player_playing");
            var t = geByClass1("_top_audio_player_play_blind_label");
            t && (t.innerHTML = getLang("global_audio_play"))
        }, TopAudioPlayer.prototype.onNext = function() {}, window.AudioPlaylist = function t(e, i, o) {
            if (this.constructor != t) throw new Error("AudioPlaylist was called without 'new' operator");
            getAudioPlayer().addPlaylist(this);
            var a = {};
            return e && isFunction(e.getId) ? (this._ref = e, void getAudioPlayer().addPlaylist(this)) : (isObject(e) ? a = e : (a.ownerId = i, a.type = e, a.albumId = o || ++t.plIndex), this._type = a.type, this._ownerId = a.ownerId || vk.id, this._albumId = a.albumId || 0, this._list = [], this.mergeWith(a), this)
        }, AudioPlaylist.plIndex = 0, AudioPlaylist.TYPE_CURRENT = "current", AudioPlaylist.TYPE_PLAYLIST = "playlist", AudioPlaylist.TYPE_ALBUM = "album", AudioPlaylist.TYPE_TEMP = "temp", AudioPlaylist.TYPE_RECOM = "recoms", AudioPlaylist.TYPE_SEARCH = "search", AudioPlaylist.TYPE_FEED = "feed", AudioPlaylist.TYPE_LIVE = "live", AudioPlaylist.TYPE_WALL = "wall", AudioPlaylist.TYPE_RECENT = "recent", AudioPlaylist.DEFAULT_PLAYLIST_ID = -1, AudioPlaylist.prototype.serialize = function() {
            var t = {},
                e = getAudioPlayer().getCurrentAudio(),
                i = Math.max(0, this.indexOfAudio(e));
            return t.list = clone(this.getAudiosList().slice(Math.max(0, i - 100), i + 300), !0), each(t.list, function(t, e) {
                e[AudioUtils.AUDIO_ITEM_INDEX_URL] = ""
            }), t.type = AudioPlaylist.TYPE_TEMP, t.ownerId = vk.id, t.albumId = irand(1, 999), t.hasMore = !1, t.title = this.getTitle(), t.context = getAudioPlayer()._getPlayingContext(), t.originalPlaylistRawId = this.getOriginalPlaylistRawId(), this.getType() == AudioPlaylist.TYPE_PLAYLIST && this.getAlbumId() > 0 && (t.originalPlaylistRawId = this.getOwnerId() + "_" + this.getAlbumId() + "_" + this.getAccessHash()), JSON.stringify(t)
        }, AudioPlaylist.prototype.getId = function() {
            return this.getType() + "_" + this.getOwnerId() + "_" + this.getAlbumId()
        }, AudioPlaylist.prototype.isReference = function() {
            return !!this._ref
        }, AudioPlaylist.prototype.getSelf = function() {
            return this._ref && isObject(this._ref) ? this._ref : this
        }, AudioPlaylist.prototype._unref = function() {
            var t = this._ref;
            if (isObject(t)) {
                var e = {};
                for (var i in t)
                    if (t.hasOwnProperty(i) && !isFunction(t[i]) && 0 == i.indexOf("_")) {
                        var o = t[i];
                        e[i.substr(1)] = isObject(o) ? clone(o) : o
                    }
                e.hasMore = !1, delete e.ownerId, delete this._ref, this._type = AudioPlaylist.TYPE_TEMP, this._ownerId = e.ownerId || vk.id, this._albumId = AudioPlaylist.plIndex++, this._list = [], this.mergeWith(e)
            }
        }, AudioPlaylist.prototype.isAdsAllowed = function() {
            return this._ref && isObject(this._ref) ? this._ref : this
        }, AudioPlaylist.prototype.getType = function() {
            return this.getSelf()._type
        }, AudioPlaylist.prototype.getOwnerId = function() {
            return this.getSelf()._ownerId
        }, AudioPlaylist.prototype.getAlbumId = function() {
            return this.getSelf()._albumId
        }, AudioPlaylist.prototype.getPlaylistId = function() {
            return this.getSelf()._albumId
        }, AudioPlaylist.prototype.getOriginalPlaylistRawId = function() {
            return this.getSelf()._originalPlaylistRawId
        }, AudioPlaylist.prototype.isFollowed = function() {
            return this.getSelf()._isFollowed
        }, AudioPlaylist.prototype.setFollowed = function(t) {
            var e = this.getAddClasses() || "";
            return e = e.replace("audio_playlist__followed", ""), t && (e += " audio_playlist__followed"), this.getSelf()._addClasses = e, this.getSelf()._isFollowed = t
        }, AudioPlaylist.prototype.getFollowHash = function() {
            return this.getSelf()._followHash
        }, AudioPlaylist.prototype.getRawId = function() {
            return this.getSelf()._rawId
        }, AudioPlaylist.prototype.getGridCovers = function() {
            return this.getSelf()._gridCovers || ""
        }, AudioPlaylist.prototype.getTitle = function() {
            return this.getSelf()._title || ""
        }, AudioPlaylist.prototype.getDescription = function() {
            return this.getSelf()._description || ""
        }, AudioPlaylist.prototype.getRawDescription = function() {
            return this.getSelf()._rawDescription || ""
        }, AudioPlaylist.prototype.getAccessHash = function() {
            return this.getSelf()._accessHash || ""
        }, AudioPlaylist.prototype.getAuthorLine = function() {
            return this.getSelf()._authorLine || ""
        }, AudioPlaylist.prototype.getAuthorHref = function() {
            return this.getSelf()._authorHref || ""
        }, AudioPlaylist.prototype.getAuthorName = function() {
            return this.getSelf()._authorName || ""
        }, AudioPlaylist.prototype.getInfoLine1 = function() {
            return this.getSelf()._infoLine1 || ""
        }, AudioPlaylist.prototype.getInfoLine2 = function() {
            return this.getSelf()._infoLine2 || ""
        }, AudioPlaylist.prototype.getListens = function() {
            return this.getSelf()._listens || 0
        }, AudioPlaylist.prototype.getAddClasses = function() {
            return this.getSelf()._addClasses || ""
        }, AudioPlaylist.prototype.isOfficial = function() {
            return !!this.getSelf()._isOfficial
        }, AudioPlaylist.prototype.getLastUpdated = function() {
            return this.getSelf()._lastUpdated || ""
        }, AudioPlaylist.prototype.getEditHash = function() {
            return this.getSelf()._editHash || ""
        }, AudioPlaylist.prototype.getDeleteHash = function() {
            return this.getSelf()._deleteHash || ""
        }, AudioPlaylist.prototype.getReplaceHash = function() {
            return this.getSelf()._replaceHash || ""
        }, AudioPlaylist.prototype.getCoverUrl = function() {
            return this.getSelf()._coverUrl || ""
        }, AudioPlaylist.prototype.getBlocks = function() {
            return this.getSelf()._blocks || {}
        }, AudioPlaylist.prototype.hasMore = function() {
            return !!this.getSelf()._hasMore
        }, AudioPlaylist.prototype.getFeedFrom = function() {
            return this.getSelf()._feedFrom
        }, AudioPlaylist.prototype.getFeedOffset = function() {
            return this.getSelf()._feedOffset
        }, AudioPlaylist.prototype.getSearchParams = function() {
            return this.getSelf()._searchParams || null
        }, AudioPlaylist.prototype.getSearchQid = function() {
            return this.getSelf()._searchQid || null
        }, AudioPlaylist.prototype.getLocalFoundCount = function() {
            return this.getSelf()._localFoundTotal || 0
        }, AudioPlaylist.prototype.setLocalFoundCount = function(t) {
            var e = this.getSelf();
            e._localFoundTotal = t
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
        }, AudioPlaylist.prototype.equals = function(t) {
            return this.getSelf() == t.getSelf()
        }, AudioPlaylist.prototype._moveCurrentAudioAtFirstPosition = function() {
            var t = getAudioPlayer().getCurrentAudio(),
                e = this.getSelf(),
                i = this.indexOfAudio(t); - 1 != i && (e._list.splice(i, 1), e._list.unshift(t), e._movedAudioToFirstPos = i)
        }, AudioPlaylist.prototype._resetMovedAudioToInitialPosition = function() {
            var t = this.getSelf();
            if (t._movedAudioToFirstPos) {
                var e = t._list.splice(0, 1);
                t._list.splice(t._movedAudioToFirstPos, 0, e[0]), delete t._movedAudioToFirstPos
            }
        }, AudioPlaylist.prototype.clean = function(t) {
            t || this._unref();
            var e = this.getSelf();
            e._hasMore = !0, e._list = [], e._items = [], e._feedOffset = e._feedFrom = 0, e._nextOffset = 0
        }, AudioPlaylist.prototype.isInitedSortedList = function() {
            return !!this.getSelf()._sorted
        }, AudioPlaylist.prototype.initSortedList = function(t) {
            var e = this.getSelf();
            e._originalList || (e._originalList = [].concat(e._list)), e._sorted = !0, e._list = t
        }, AudioPlaylist.prototype.removeSortedList = function(t) {
            var e = this.getSelf();
            e._originalList && (e._list = [].concat(e._originalList)), e._sorted = !1
        }, AudioPlaylist.prototype.shuffle = function(t, e) {
            if (!(this.isShuffled() && t || !this.isShuffled() && !t)) {
                var i = this.getSelf();
                if (delete i._sorted, t) {
                    var o = !1;
                    if (this.hasMore())
                        if (this.getType() == AudioPlaylist.TYPE_SEARCH) i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), o = !0;
                        else if (inArray(this.getType(), [AudioPlaylist.TYPE_RECOM])) {
                        var a = getAudioPlayer().getCurrentAudio(),
                            s = this.indexOfAudio(a);
                        this.clean(!0), s >= 0 && i.addAudio(a, 0), o = !0
                    } else this._unref(), i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), o = !0;
                    else i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), o = !0;
                    o && (i._shuffle = t)
                } else i._originalList ? i._list = i._originalList : this.clean(!0), delete i._shuffle, delete i._originalList;
                return !0
            }
        }, AudioPlaylist.prototype.getNextOffset = function() {
            return this.getSelf()._nextOffset || this.getAudiosCount()
        }, AudioPlaylist.prototype.getAudiosList = function() {
            return this.getSelf()._list || []
        }, AudioPlaylist.prototype.getSortedAudiosList = function() {
            return this.getSelf()._sortedList || this.getAudiosList() || []
        }, AudioPlaylist.prototype.getUnshuffledAudiosList = function() {
            var t = this.getSelf(),
                e = void 0;
            return e = t._originalList ? t._originalList : t._list
        }, AudioPlaylist.prototype.getItemsList = function() {
            return this.getSelf()._items || []
        }, AudioPlaylist.prototype.getPostId = function() {
            return this.getSelf()._postId
        }, AudioPlaylist.prototype.getWallQuery = function() {
            return this.getSelf()._wallQuery
        }, AudioPlaylist.prototype.getWallType = function() {
            return this.getSelf()._wallType
        }, AudioPlaylist.prototype.getCommunititesBlock = function() {
            return this.getSelf()._communitiesBlock
        }, AudioPlaylist.prototype.getPlaylistsBlock = function() {
            return this.getSelf()._playlistsBlock
        }, AudioPlaylist.prototype.getNextAudio = function(t, e) {
            if (!t) return t = this.getAudioAt(0), e && AudioUtils.asObject(t).isClaimed ? this.getNextAudio(t, !0) : t;
            var i = this.indexOfAudio(t);
            if (0 > i) return !1;
            if (i + 1 < this.getAudiosCount()) {
                var o = this.getAudioAt(i + 1);
                return e && AudioUtils.asObject(o).isClaimed ? this.getNextAudio(o, !0) : o
            }
            return !1
        };
        var AUDIO_LOAD_CHUNK_SIZE = 2e3;
        AudioPlaylist.prototype.isFullyLoadable = function() {
                return this.getType() == AudioPlaylist.TYPE_PLAYLIST
            }, AudioPlaylist.prototype.loadAll = function(t) {
                return this.isFullyLoadable() ? void this.load(0, t, !0) : t && t()
            }, AudioPlaylist.prototype.load = function(offset, onDone, needAll) {
                function callOnDones(t, e) {
                    var i = this._onDoneLoading;
                    delete this._onDoneLoading, delete this._loadingAll, each(i || [], function(t, i) {
                        i && i(this, e)
                    }.bind(this))
                }
                isFunction(offset) && (onDone = offset, offset = 0), offset = intval(offset);
                var countAvailable = this.getType() == AudioPlaylist.TYPE_FEED ? this.getItemsCount() : this.getAudiosCount(),
                    isGoingToLoadAll = this.isFullyLoadable() && needAll && this.hasMore();
                if (countAvailable > offset && !isGoingToLoadAll) return onDone && onDone(this);
                if (!this.hasMore()) return onDone && onDone(this);
                var searchParams = this.getSearchParams();
                if (this.getType() == AudioPlaylist.TYPE_SEARCH && !searchParams.globalQuery) return onDone && onDone(this);
                if (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(onDone), !this._loadingAll) {
                    if (needAll) return this._loadingAll = !0, void _loadAllPlaylistAudios(this, callOnDones.bind(this));
                    var offset = this.getNextOffset();
                    offset == this.getLocalFoundCount() && (offset -= this.getLocalFoundCount()), offset || clearTimeout(this._sendSearchStatsTimeout), ajax.post("al_audio.php", {
                        act: "load_section",
                        type: this.getType(),
                        owner_id: cur.audioPage && "search" === this.getType() ? cur.audioPage.getOwnerId() : this.getOwnerId(),
                        playlist_id: this.getPlaylistId(),
                        offset: offset,
                        access_hash: this.getAccessHash(),
                        search_q: searchParams ? searchParams.globalQuery : null,
                        search_performer: searchParams ? searchParams.performer : null,
                        search_lyrics: searchParams ? searchParams.lyrics : null,
                        search_sort: searchParams ? searchParams.sort : null,
                        search_history: searchParams ? intval(searchParams.fromHistory) : null,
                        search_qid: this.getSearchQid(),
                        feed_from: this.getFeedFrom(),
                        feed_offset: this.getFeedOffset(),
                        shuffle: this.getShuffle(),
                        post_id: this.getPostId(),
                        wall_query: this.getWallQuery(),
                        wall_type: this.getWallType(),
                        claim: intval(nav.objLoc.claim)
                    }, {
                        onDone: function(loadedPlaylist, tpl, langs, templatesScript) {
                            addTemplates({
                                audio_playlist_snippet: tpl
                            }), extend(cur.lang, langs), templatesScript && eval(templatesScript), (!this._loadingAll || needAll) && (getAudioPlayer().mergePlaylistData(this, loadedPlaylist), callOnDones.call(this), getAudioPlayer().saveStateCurrentPlaylist(), offset || (clearTimeout(this._sendSearchStatsTimeout), this._sendSearchStatsTimeout = setTimeout(this.sendSearchStats.bind(this, "search_view"), 3e3), this._searchPlayStatsSent = !1))
                        }.bind(this)
                    })
                }
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
            }, AudioPlaylist.prototype.getTotalDuration = function() {
                var t = this.getAudiosList(),
                    e = 0;
                return each(t, function(t, i) {
                    e += i[AudioUtils.AUDIO_ITEM_INDEX_DURATION]
                }), e
            }, AudioPlaylist.prototype.getItemsCount = function() {
                var t = this.getSelf();
                return t._items = t._items || [], t._items.length
            }, AudioPlaylist.prototype.removeAudio = function(t) {
                var e = this.indexOfAudio(t);
                if (e >= 0) {
                    this._unref();
                    var i = this._list.splice(e, 1);
                    return this._index && this._index.remove(i[0]), e
                }
                return -1
            }, AudioPlaylist.prototype.addAudio = function(t, e) {
                function i(t) {
                    var i = o.getUnshuffledAudiosList(),
                        s = o.indexOfAudio(t);
                    if (s >= 0) {
                        if (a) return;
                        i.splice(s, 1)
                    }
                    t = clone(t), t[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = clean(replaceEntities(t[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/(<em>|<\/em>)/g, "")), t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = clean(replaceEntities(t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER]).replace(/(<em>|<\/em>)/g, "")), a ? i.push(t) : i.splice(e, 0, t), o._index && o._index.add(t)
                }
                this._unref();
                var o = this,
                    a = void 0 === e;
                if (isArray(t) && isArray(t[0]))
                    for (var s = 0, r = t.length; r > s; s++) i(t[s]);
                else t.length && i(t)
            }, AudioPlaylist.prototype.mergeWith = function(t) {
                if (!isObject(this._ref)) {
                    var e = t.list;
                    if (e) {
                        var i = getAudioPlayer().getCurrentAudio();
                        if (i && this.indexOfAudio(i) >= 0) {
                            for (var o = -1, a = 0, s = e.length; s > a; a++)
                                if (i[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] == e[a][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && i[AudioUtils.AUDIO_ITEM_INDEX_ID] == e[a][AudioUtils.AUDIO_ITEM_INDEX_ID]) {
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
                    each("gridCovers communitiesBlock playlistsBlock addClasses nextOffset hasMore followHash accessHash isFollowed rawId title authorLine authorHref authorName infoLine1 infoLine2 isOfficial rawDescription description lastUpdated listens feedFrom feedOffset live searchParams totalCount totalCountHash postId wallQuery wallType originalList shuffle isAdsAllowed editHash coverUrl searchQid".split(" "), function(e, i) {
                        void 0 !== t[i] && (r["_" + i] = t[i])
                    })
                }
            }, AudioPlaylist.prototype.moveAudio = function(t, e) {
                this._unref();
                var i = this._list.splice(t, 1);
                e > t && (e -= 1), this._list.splice(e, 0, i[0])
            }, AudioPlaylist.prototype.indexOfAudio = function(t) {
                if (!t) return -1;
                var e;
                isString(t) ? e = t.split("_") : isObject(t) ? e = [t.ownerId, t.id] : isArray(t) && (e = [t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID], t[AudioUtils.AUDIO_ITEM_INDEX_ID]]);
                for (var i = this.getSelf(), o = i._list, a = 0, s = o.length; s > a; a++)
                    if (e[0] == o[a][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && e[1] == o[a][AudioUtils.AUDIO_ITEM_INDEX_ID]) return a;
                return -1
            }, AudioPlaylist.prototype.getAudio = function(t) {
                isString(t) ? t : AudioUtils.asObject(t).fullId, t = t.split("_");
                for (var e = this.getSelf(), i = 0, o = e._list.length; o > i; i++)
                    if (t[0] == e._list[i][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && t[1] == e._list[i][AudioUtils.AUDIO_ITEM_INDEX_ID]) return e._list[i];
                return null
            }, AudioPlaylist.prototype._ensureIndex = function(t) {
                var e = this.getSelf();
                if (e._index) t && t();
                else {
                    var i = function(t, e) {
                        var i = intval(e);
                        return i >= 33 && 48 > i ? String.fromCharCode(i) : t
                    };
                    e._index = new vkIndexer(e._list, function(t) {
                        return (t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " " + t[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/\&\#(\d+);?/gi, i)
                    }, t)
                }
            }, AudioPlaylist.prototype.search = function(t, e) {
                var i = this.getSelf();
                isObject(t) || (t = {
                    q: t
                }), this._ensureIndex(function() {
                    var o = i._index ? i._index.search(t.q) : [];
                    return o = o.filter(function(e) {
                        return t.lyrics ? !!intval(e[AudioUtils.AUDIO_ITEM_INDEX_LYRICS]) : !0
                    }), e(o)
                }.bind(this))
            }, AudioPlaylist.prototype.sendSearchStats = function(t) {
                if ("search_play" == t) {
                    if (this._searchPlayStatsSent) return;
                    this._searchPlayStatsSent = !0
                }
                ajax.post("al_audio.php?act=search_stats", {
                    event_type: t,
                    search_type: this.getSearchQid() ? "external" : "internal",
                    search_params: JSON.stringify(this.getSearchParams()),
                    results_count: this.getTotalCount()
                })
            }, AudioPlaylist.prototype.toString = function() {
                return this.getId()
            }, AudioPlaylist.prototype.fetchNextLiveAudio = function(t) {
                var e = this.getLiveInfo(),
                    i = this;
                ajax.post("al_audio.php", {
                    act: "a_get_audio_status",
                    host_id: e.hostId,
                    hash: e.hash
                }, {
                    onDone: function(e) {
                        if (e) {
                            var o = i.indexOfAudio(e);
                            o >= 0 ? i.moveAudio(o, i.getAudiosCount() - 1) : i.addAudio(e)
                        }
                        t && t(e)
                    }
                })
            }, window.AudioPlayer || (window.AudioPlayer = function() {
                if (this._currentAudio = !1, this._isPlaying = !1, this._prevPlaylist = null, this._currentPlaylist = null, this._playlists = [], this.subscribers = [], this._tasks = [], this._statusExport = {}, this._currentPlayingRows = [], this._allowPrefetchNext = !1, !vk.isBanned) {
                    AudioUtils.debugLog("Player creation"), this._initImpl(), this._initEvents(), this._restoreVolumeState();
                    var t = this;
                    setTimeout(function() {
                        t.restoreState(), AudioUtils.toggleAudioHQBodyClass(), t.updateCurrentPlaying()
                    })
                }
            }), AudioPlayer.prototype.getVersion = function() {
                return 15
            }, AudioPlayer.prototype._initImpl = function(t) {
                var e = this;
                this._impl && this._impl.destroy();
                var i = 0,
                    o = function(t) {
                        if (-1 != i) {
                            if (t && (i++, this._implSetDelay(200), i > 3)) {
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
                            this._repeatCurrent ? (this._implSeekImmediate(0), this._implPlay()) : (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.playNext(!0)), this._sendListenedData()
                        }
                    }.bind(this),
                    a = 0,
                    s = {
                        onBufferUpdate: function(t) {
                            this.notify(AudioPlayer.EVENT_BUFFERED, t)
                        }.bind(this),
                        onEnd: function() {
                            a = 0, o()
                        },
                        onFail: function() {
                            a = 0, o(!0)
                        },
                        onCanPlay: function() {
                            this.notify(AudioPlayer.EVENT_CAN_PLAY)
                        }.bind(this),
                        onProgressUpdate: function(t, e) {
                            var i = this.getCurrentAudio();
                            !this._muteProgressEvents && i && this.notify(AudioPlayer.EVENT_PROGRESS, t, i[AudioUtils.AUDIO_ITEM_INDEX_DURATION], e)
                        }.bind(this),
                        onFrequency: function(t) {
                            e.notify(AudioPlayer.EVENT_FREQ_UPDATE, t)
                        }
                    };
                AudioUtils.debugLog("Implementation init"), AudioUtils.debugLog("param browser.flash", browser.flash), AudioUtils.debugLog("param force HTML5", !!t), browser.safari && parseInt(browser.version) >= 11 ? this._impl = new AudioPlayerHTML5Simple(s) : t ? this._impl = new AudioPlayerHTML5(s) : AudioPlayerHTML5WebAudio.isSupported() ? (this._impl = new AudioPlayerHTML5WebAudio(s), this._impl.failed && (this._impl = new AudioPlayerHTML5(s))) : AudioPlayerHTML5.isSupported() ? this._impl = new AudioPlayerHTML5(s) : browser.flash && (this._impl = new AudioPlayerFlash(s)), this._implSetVolume(0)
            }, AudioPlayer.EVENT_CURRENT_CHANGED = "curr", AudioPlayer.EVENT_PLAY = "start", AudioPlayer.EVENT_PAUSE = "pause", AudioPlayer.EVENT_STOP = "stop", AudioPlayer.EVENT_UPDATE = "update", AudioPlayer.EVENT_LOADED = "loaded", AudioPlayer.EVENT_ENDED = "ended", AudioPlayer.EVENT_FAILED = "failed", AudioPlayer.EVENT_BUFFERED = "buffered", AudioPlayer.EVENT_PROGRESS = "progress", AudioPlayer.EVENT_VOLUME = "volume", AudioPlayer.EVENT_PLAYLIST_CHANGED = "plchange", AudioPlayer.EVENT_ADDED = "added", AudioPlayer.EVENT_REMOVED = "removed", AudioPlayer.EVENT_FREQ_UPDATE = "freq", AudioPlayer.EVENT_AD_READY = "ad_ready", AudioPlayer.EVENT_AD_DEINITED = "ad_deinit", AudioPlayer.EVENT_AD_STARTED = "ad_started", AudioPlayer.EVENT_AD_COMPLETED = "ad_completed", AudioPlayer.EVENT_START_LOADING = "start_load", AudioPlayer.EVENT_CAN_PLAY = "actual_start", AudioPlayer.LS_VER = "v20",
            AudioPlayer.LS_KEY_PREFIX = "audio", AudioPlayer.LS_PREFIX = AudioPlayer.LS_KEY_PREFIX + "_" + AudioPlayer.LS_VER + "_", AudioPlayer.LS_VOLUME = "vol", AudioPlayer.LS_PL = "pl", AudioPlayer.LS_TRACK = "track", AudioPlayer.LS_SAVED = "saved", AudioPlayer.LS_PROGRESS = "progress", AudioPlayer.LS_DURATION_TYPE = "dur_type", AudioPlayer.LS_ADS_CURRENT_DELAY = "ads_current_delay_v4", AudioPlayer.DEFAULT_VOLUME = .8, AudioPlayer.AD_TYPE = "preroll", window.audioIconSuffix = window.devicePixelRatio >= 2 ? "_2x" : "", AudioPlayer.tabIcons = {
                def: "/images/icons/favicons/fav_logo" + audioIconSuffix + ".ico",
                play: "/images/icons/favicons/fav_play" + audioIconSuffix + ".ico",
                pause: "/images/icons/favicons/fav_pause" + audioIconSuffix + ".ico"
            }, AudioPlayer.getLang = function(t) {
                var e = getAudioPlayer();
                return e && e.langs ? e.langs[t] : t
            }, AudioPlayer.clearDeprecatedCacheKeys = function() {
                AudioPlayer._iterateCacheKeys(function(t) {
                    return t == AudioPlayer.LS_VER
                })
            }, AudioPlayer.clearOutdatedCacheKeys = function() {
                var t = ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_SAVED) || 0,
                    e = 72e5;
                t < vkNow() - e && AudioPlayer._iterateCacheKeys(function(t, e) {
                    return !inArray(e, [AudioPlayer.LS_PL, AudioPlayer.LS_TRACK, AudioPlayer.LS_PROGRESS])
                })
            }, AudioPlayer.clearAllCacheKeys = function() {
                AudioPlayer._iterateCacheKeys(function() {
                    return !1
                }), setCookie("remixcurr_audio", "", -1)
            }, AudioPlayer._iterateCacheKeys = function(t) {
                for (var e in window.localStorage)
                    if (0 === e.indexOf(AudioPlayer.LS_KEY_PREFIX + "_")) {
                        var i = e.split("_");
                        t(i[1], i[2]) || localStorage.removeItem(e)
                    }
            }, AudioPlayer.prototype.onMediaKeyPressedEvent = function(t) {
                var e = this.getCurrentAudio();
                if (this.getCurrentPlaylist(), e) switch (t.keyCode) {
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
                for (var e = 0; e < this._playlists.length; e++) this._playlists[e] == t && this._playlists.splice(e, 1)
            }, AudioPlayer.prototype.mergePlaylistData = function(t, e) {
                return t.hasMore() ? void each(this._playlists, function(i, o) {
                    o.getId() == t.getId() && o.mergeWith(e)
                }) : t
            }, AudioPlayer.prototype.deleteCurrentPlaylist = function() {
                this.stop(), delete this._currentAudio, delete this._currentPlaylist, this.notify(AudioPlayer.EVENT_UPDATE), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), this.updateCurrentPlaying()
            }, AudioPlayer.prototype.updateCurrentPlaying = function(t) {
                t = !!t;
                var e = AudioUtils.asObject(this.getCurrentAudio()),
                    i = [];
                if (e) {
                    var o = geByClass("_audio_row_" + e.fullId);
                    i = i.concat([].slice.call(o))
                }
                for (var a = 0, s = this._currentPlayingRows.length; s > a; a++) {
                    var r = this._currentPlayingRows[a];
                    r && !inArray(r, i) && this.toggleCurrentAudioRow(r, !1, t)
                }
                if (e)
                    for (var a = 0, s = i.length; s > a; a++) {
                        var r = i[a];
                        r && this.toggleCurrentAudioRow(r, !0, t)
                    }
                this._currentPlayingRows = i, each(geByClass("_audio_pl"), function() {
                    removeClass(this, "audio_pl__playing")
                });
                var l = this.isPlaying(),
                    n = this.getCurrentPlaylist();
                if (l && n) {
                    var d;
                    n.getType() == AudioPlaylist.TYPE_PLAYLIST ? d = geByClass("_audio_pl_" + n.getOwnerId() + "_" + n.getPlaylistId()) : "recoms1" == n.getAlbumId() && (d = geByClass("_recoms_special_recoms")), d && each(d, function() {
                        addClass(this, "audio_pl__playing")
                    })
                }
            }, AudioPlayer.prototype.toggleCurrentAudioRow = function(t, e, i) {
                function o() {
                    var o = this;
                    if (a.withInlinePlayer && (e ? this._addRowPlayer(t, i) : this._removeRowPlayer(t)), e) {
                        this.on(t, AudioPlayer.EVENT_PLAY, function(e) {
                            AudioUtils.asObject(e).fullId == a.fullId && (addClass(t, AudioUtils.AUDIO_PLAYING_CLS), l && attr(l, "aria-label", getLang("global_audio_pause")), s && attr(s, "role", "heading"))
                        }), this.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e, i) {
                            if (!a.withInlinePlayer && o.isAdPlaying()) return void(r && (r.innerHTML = formatTime(a.duration)));
                            i = intval(i);
                            var s = 0;
                            s = o.getDurationType() ? "-" + formatTime(Math.round(i - e * i)) : formatTime(Math.round(e * i)), r && (r.innerHTML = s)
                        }), this.on(t, [AudioPlayer.EVENT_PAUSE, AudioPlayer.EVENT_ENDED], function() {
                            removeClass(t, AudioUtils.AUDIO_PLAYING_CLS), l && attr(l, "aria-label", getLang("global_audio_play")), s && attr(s, "role", "")
                        });
                        var n = data(t, "bars");
                        if (!n && (a.isWithCovers || a.isNumeric)) {
                            if (n = se('<canvas class="audio_row__sound_bars"></canvas>'), t.appendChild(n), n.width = AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), n.height = AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), n.style.width = AudioUtils.AUDIO_ROW_COVER_SIZE, n.style.height = AudioUtils.AUDIO_ROW_COVER_SIZE, isRetina()) {
                                var d = n.getContext("2d");
                                d.scale(2, 2)
                            }
                            var u = a.isNumeric;
                            this.on(t, AudioPlayer.EVENT_FREQ_UPDATE, function(t, e) {
                                _updateAudioSoundBars(n, e, u)
                            }), _updateAudioSoundBars(n, [0, 0, 0, 0], u), data(t, "bars", n)
                        }
                        toggleClass(t, AudioUtils.AUDIO_PLAYING_CLS, this.isPlaying())
                    } else {
                        this.off(t), removeClass(t, AudioUtils.AUDIO_PLAYING_CLS), removeClass(t, AudioUtils.AUDIO_CURRENT_CLS), r && (r.innerHTML = formatTime(a.duration)), l && attr(l, "aria-label", getLang("global_audio_play")), s && attr(s, "role", "");
                        var _ = data(t, "bars");
                        _ && (re(_), data(t, "bars", null))
                    }
                    i ? setTimeout(function() {
                        var e = AudioUtils.getAudioFromEl(t, !0);
                        toggleClass(t, AudioUtils.AUDIO_CURRENT_CLS, !!e.isCurrent)
                    }, 0) : toggleClass(t, AudioUtils.AUDIO_CURRENT_CLS, e)
                }
                var a = AudioUtils.getAudioFromEl(t, !0);
                if (a.isCurrent != e) {
                    addClass(t, AudioUtils.AUDIO_CURRENT_CLS);
                    var s = geByClass1("_audio_row__title", t),
                        r = geByClass1("_audio_row__duration", t),
                        l = geByClass1("_audio_row__play_btn", t);
                    a.withInlinePlayer && toggleClass(t, "audio_row__player_transition", i), i = a.withInlinePlayer ? i : !1, i ? setTimeout(o.bind(this), 0) : o.call(this)
                }
            }, AudioPlayer.prototype._removeRowPlayer = function(t) {
                removeClass(t, AudioUtils.AUDIO_CURRENT_CLS);
                var e = data(t, "player_inited");
                if (e) {
                    setTimeout(function() {
                        re(geByClass1("_audio_inline_player", t))
                    }, 200);
                    var i = geByClass1("_audio_duration", t);
                    i && (i.innerHTML = formatTime(AudioUtils.getAudioFromEl(t, !0).duration)), this.off(t), each(e.sliders, function() {
                        this.destroy()
                    }), data(t, "player_inited", !1)
                }
            }, AudioPlayer.prototype._addRowPlayer = function(t, e) {
                if (!geByClass1("_audio_inline_player", t)) {
                    var i = this,
                        o = se(vk.audioInlinePlayerTpl || getTemplate("audio_inline_player")),
                        a = geByClass1("_audio_player__place", t);
                    a.appendChild(o);
                    var s = new Slider(geByClass1("audio_inline_player_volume", o), {
                            value: i.getVolume(),
                            backValue: 0,
                            size: 1,
                            hintClass: "audio_player_hint",
                            withBackLine: !0,
                            log: !0,
                            formatHint: function(t) {
                                return Math.round(100 * t) + "%"
                            },
                            onChange: function(t) {
                                i.setVolume(t)
                            }
                        }),
                        r = new Slider(geByClass1("audio_inline_player_progress", o), {
                            value: 0,
                            backValue: 0,
                            size: 1,
                            hintClass: "audio_player_hint",
                            withBackLine: !0,
                            formatHint: function(t) {
                                var e = AudioUtils.asObject(i.getCurrentAudio());
                                return formatTime(Math.round(t * e.duration))
                            },
                            onEndDragging: function(t) {
                                i.seek(t)
                            }
                        });
                    i.isAdPlaying() && r.toggleAdState(!0), i.on(t, AudioPlayer.EVENT_AD_DEINITED, function() {}), i.on(t, AudioPlayer.EVENT_AD_READY, function() {}), i.on(t, AudioPlayer.EVENT_AD_STARTED, function() {
                        r.toggleAdState(!0), r.setBackValue(0)
                    }), i.on(t, AudioPlayer.EVENT_AD_COMPLETED, function() {
                        r.toggleAdState(!1)
                    }), i.on(t, AudioPlayer.EVENT_START_LOADING, function() {
                        r.toggleLoading(!0)
                    }), i.on(t, AudioPlayer.EVENT_CAN_PLAY, function() {
                        r.toggleLoading(!1)
                    }), i.on(t, AudioPlayer.EVENT_BUFFERED, function(t, e) {
                        r.setBackValue(e)
                    }), i.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e) {
                        r.toggleLoading(!1), r.setValue(e)
                    }), i.on(t, AudioPlayer.EVENT_VOLUME, function(t, e) {
                        s.setValue(e)
                    }), data(t, "player_inited", {
                        sliders: [s, r]
                    })
                }
            }, AudioPlayer.prototype.hasStatusExport = function() {
                for (var t in this._statusExport)
                    if (this._statusExport[t]) return !0;
                return !1
            }, AudioPlayer.prototype.getStatusExportInfo = function() {
                return this._statusExport
            }, AudioPlayer.prototype.setStatusExportInfo = function(t) {
                this._statusExport = t
            }, AudioPlayer.prototype.deleteAudioFromAllPlaylists = function(t) {
                t = isObject(t) || isArray(t) ? AudioUtils.asObject(t).fullId : t, each(this._playlists, function(e, i) {
                    i.removeAudio(t)
                })
            }, AudioPlayer.prototype.updateAudio = function(t, e) {
                var i = "";
                if (isString(t) ? i = t : isArray(t) && (i = AudioUtils.asObject(t).fullId), e || (e = t), each(this._playlists, function(t, o) {
                        for (var a = o.getAudiosList(), s = 0, r = a.length; r > s; s++)
                            if (a[s][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[s][AudioUtils.AUDIO_ITEM_INDEX_ID] == i) return isObject(e) && each(e, function(t, e) {
                                a[s][t] = e
                            }), void(isArray(e) && (a[s] = e))
                    }), this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_ID] == i) {
                    if (isObject(e)) {
                        var o = this;
                        each(e, function(t, e) {
                            o._currentAudio[t] = e
                        })
                    }
                    isArray(e) && (this._currentAudio = e)
                }
                return this.notify(AudioPlayer.EVENT_UPDATE), t
            }, AudioPlayer.prototype._triggerTNSPixel = function() {
                var t = this._lsGet("tns_triggered_time_v3") || 0,
                    e = 864e5;
                vkNow() - t < e || (this._lsSet("tns_triggered_time_v3", vkNow()), vkImage().src = "https://www.tns-counter.ru/V13a****mail_ru/ru/CP1251/tmsec=mail_audiostart/" + irand(1, 1e9))
            }, AudioPlayer.prototype._sendLCNotification = function() {
                var t = window.Notifier;
                t && t.lcSend("audio_start");
                try {
                    window.Videoview && Videoview.togglePlay(!1)
                } catch (e) {}
            }, AudioPlayer.prototype.showHQLabel = function(t) {
                var e = "_audio_show_hq_label";
                return void 0 === t ? !!ls.get(e) : (t = !!t, ls.set(e, t), AudioUtils.toggleAudioHQBodyClass(), t)
            }, AudioPlayer.prototype._restoreVolumeState = function() {
                AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys();
                var t = this._lsGet(AudioPlayer.LS_VOLUME);
                this._userVolume = void 0 == t || t === !1 ? AudioPlayer.DEFAULT_VOLUME : t
            }, AudioPlayer.prototype.restoreState = function() {
                if (!vk.widget) {
                    AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys(), this._currentAudio = this._lsGet(AudioPlayer.LS_TRACK);
                    var t = this._lsGet(AudioPlayer.LS_PL);
                    t && (t = JSON.parse(t), this._currentPlaylist = new AudioPlaylist(t), this._initPlayingContext(t.context), t.originalPlaylistRawId && (this._currentPlaylist._originalPlaylistRawId = t.originalPlaylistRawId)), this._currentPlaylist && this._currentAudio ? this.notify(AudioPlayer.EVENT_UPDATE) : this._currentPlaylist = this._currentAudio = !1;
                    var e = this._lsGet(AudioPlayer.LS_PROGRESS) || 0;
                    this._currentAudio && e && this._impl && 0 === this._impl.type.indexOf("html5") && (this._implSetUrl(this._currentAudio, !0), 1 > e && this._implSeek(e), this._implSetVolume(0))
                }
            }, AudioPlayer.prototype._ensureImplReady = function(t) {
                var e = this;
                this._impl && this._impl.onReady(function(i) {
                    return i ? t() : void("flash" == e._impl.type && (AudioUtils.debugLog("Flash not initialized, lets try HTML5 as desperate way"), e._initImpl(!0)))
                })
            }, AudioPlayer.prototype._implNewTask = function(t, e) {
                this._taskIDCounter = this._taskIDCounter || 1, this._tasks = this._tasks || [], this._tasks.push({
                    name: t,
                    cb: e,
                    id: t + "_" + this._taskIDCounter++
                }), this._implDoTasks()
            }, AudioPlayer.prototype._implDoTasks = function() {
                if (this._tasks = this._tasks || [], !this._taskInProgress) {
                    var t = this._tasks.shift();
                    if (t) {
                        var e = this;
                        t = clone(t), this._taskInProgress = t.id, this._ensureImplReady(function() {
                            t.cb.call(e, function() {
                                return e._taskAbort == t.id ? void(e._taskAbort = !1) : (e._taskInProgress = !1, void e._implDoTasks())
                            })
                        })
                    }
                }
            }, AudioPlayer.prototype._implClearAllTasks = function() {
                this._taskAbort = this._taskInProgress, this._taskInProgress = !1, this._tasks = []
            }, AudioPlayer.prototype._implClearTask = function(t) {
                this._tasks = this._tasks || [], this._tasks = this._tasks.filter(function(e) {
                    return e.name != t
                })
            }, AudioPlayer.prototype._implSetDelay = function(t) {
                this._implNewTask("delay", function e(t) {
                    setWorkerTimeout(t, e)
                })
            }, AudioPlayer.prototype._implPlay = function() {
                var t = this;
                this._implNewTask("play", function(e) {
                    var i = AudioUtils.asObject(t.getCurrentAudio());
                    t._impl.play(i.url), t._muteProgressEvents = !1, t._allowPrefetchNext = !0, e()
                })
            }, AudioPlayer.prototype._implSeekImmediate = function(t) {
                this._impl && this._impl.seek(t)
            }, AudioPlayer.prototype._implSeek = function(t) {
                var e = this;
                this._implClearTask("seek"), this._implNewTask("seek", function(i) {
                    e._impl.seek(t), i()
                })
            }, AudioPlayer.prototype._implPause = function() {
                var t = this;
                this._implNewTask("pause", function(e) {
                    t._impl.pause(), e()
                })
            }, AudioPlayer.prototype._implSetVolume = function(t, e) {
                if (this._impl) {
                    var i = this;
                    if (e) {
                        var o = 0 == t ? "vol_down" : "vol_up";
                        this._implNewTask(o, function(e) {
                            i._impl.fadeVolume(t, function() {
                                e()
                            })
                        })
                    } else this._implNewTask("vol_set", function(e) {
                        i._impl.setVolume(t), e()
                    })
                }
            }, AudioPlayer.prototype._implSetUrl = function(t, e) {
                var i = this;
                this._implClearTask("url"), this._implNewTask("url", function(o) {
                    e || i.notify(AudioPlayer.EVENT_START_LOADING);
                    var a = i._taskInProgress;
                    i._ensureHasURL(t, function(t) {
                        a == i._taskInProgress && (t = AudioUtils.asObject(t), i._impl.setUrl(t.url, function(t) {
                            t || (i._implClearAllTasks(), i._onFailedUrl()), o()
                        }))
                    })
                })
            }, AudioPlayer.prototype.showSubscriptionPopup = function() {
                showBox("/al_audio.php", {
                    act: "subscription_box"
                }, {
                    params: {
                        containerClass: "audio_subscription_popup",
                        grey: !0,
                        width: 520
                    }
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
                    e = this;
                t && (t.addRecvClbk("audio_start", "audio", function(t) {
                    e.isPlaying() && e.pause(!1, !e._fadeVolumeWorker), delete e.pausedByVideo
                }), t.addRecvClbk("video_start", "audio", function(t) {
                    e.isPlaying() && (e.pause(), e.pausedByVideo = vkNow())
                }), t.addRecvClbk("video_hide", "audio", function(t) {
                    !e.isPlaying() && e.pausedByVideo && (vkNow() - e.pausedByVideo < 18e4 && e.play(), delete e.pausedByVideo)
                }), t.addRecvClbk("logged_off", "audio", function() {
                    cur.loggingOff = !0, AudioPlayer.clearAllCacheKeys(), e.stop()
                }), t.addRecvClbk("stories_video_start", "audio", function() {
                    e.isPlaying() && (e.pause(), e.pausedByStories = vkNow())
                }), t.addRecvClbk("stories_video_end", "audio", function() {
                    !e.isPlaying() && e.pausedByStories && (vkNow() - e.pausedByStories < 18e4 && e.play(), delete e.pausedByStories)
                }))
            }, AudioPlayer.prototype.addPlaylist = function(t) {
                this.hasPlaylist(t.getId()) || this._playlists.push(t)
            }, AudioPlayer.prototype._cleanUpPlaylists = function() {
                for (var t = 0, e = -1, i = this._playlists.length - 1; i >= 0; i--) {
                    var o = this._playlists[i];
                    if (!o.isReference() && (t += o.getAudiosCount(), t > 4e3)) {
                        e = i;
                        break
                    }
                }
                if (-1 != e) {
                    e += 1;
                    for (var a = this._playlists.slice(0, e), s = this.getCurrentPlaylist(), r = [], i = 0; i < a.length; i++) {
                        var l = a[i];
                        if (s == l && (l = !1), l && !l.isReference())
                            for (var n = e; n < this._playlists.length; n++) {
                                var o = this._playlists[n];
                                o.isReference() && o.getSelf() == l && (l = !1)
                            }
                        l && r.push(i)
                    }
                    for (var i = 0; i < r.length; i++) {
                        var e = r[i];
                        this._playlists.splice(e, 1)
                    }
                    r.length && debugLog("AudioPlayer - " + r.length + " playlists removed")
                }
            }, AudioPlayer.prototype.hasPlaylist = function(t, e, i) {
                var o;
                o = void 0 !== e && void 0 !== i ? t + "_" + e + "_" + i : t;
                for (var a = 0; a < this._playlists.length; a++) {
                    var s = this._playlists[a];
                    if (!s.isReference() && s.getId() == o) return s
                }
                return !1
            }, AudioPlayer.prototype.getPlaylist = function(t, e, i, o) {
                if (t && !e && !i) {
                    var a = t.split("_");
                    t = a[0], e = a[1], i = a[2]
                }
                var s = this.hasPlaylist(t, e, i);
                return s ? (s.mergeWith({
                    accessHash: o
                }), s) : new AudioPlaylist({
                    type: t,
                    ownerId: e,
                    albumId: i,
                    hasMore: t != AudioPlaylist.TYPE_TEMP,
                    accessHash: o
                })
            }, AudioPlayer.prototype.toggleRepeatCurrentAudio = function() {
                this._repeatCurrent = !this._repeatCurrent
            }, AudioPlayer.prototype.isRepeatCurrentAudio = function() {
                return !!this._repeatCurrent
            }, AudioPlayer.prototype.setNext = function(t, e, i) {
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
                if (!hasClass(t, "audio_row__added_next")) {
                    addClass(t, "audio_row__added_next");
                    var o = this.getCurrentPlaylist();
                    if (o) {
                        var a = AudioUtils.asObject(this.getCurrentAudio());
                        if (a && e.fullId == a.fullId) return;
                        var s = o.indexOfAudio(a);
                        if (-1 == s) return;
                        var r = o.indexOfAudio(e); - 1 != r ? o.moveAudio(r, s + 1) : o.addAudio(i, s + 1)
                    } else {
                        var l = AudioUtils.getContextPlaylist(t);
                        this.play(i, l.playlist, l.context)
                    }
                    var n = window.AudioPage && currentAudioPage(t);
                    if (n) {
                        var d = n.getPageCurrentPlaylist();
                        n.onUserAction(e, d)
                    }
                }
            }, AudioPlayer.prototype._setTabIcon = function(t) {
                setFavIcon(AudioPlayer.tabIcons[t])
            }, AudioPlayer.prototype.on = function(t, e, i) {
                isArray(e) || (e = [e]), each(e, function(e, o) {
                    this.subscribers.push({
                        context: t,
                        et: o,
                        cb: i
                    })
                }.bind(this))
            }, AudioPlayer.prototype.off = function(t) {
                this.subscribers = this.subscribers.filter(function(e) {
                    return e.context != t
                })
            }, AudioPlayer.prototype.notify = function(t, e, i, o) {
                var a = this.getCurrentAudio(),
                    s = AudioUtils.asObject(a);
                if (this._impl && (this.isAdPlaying() || !this._muteProgressEvents || !inArray(t, [AudioPlayer.EVENT_BUFFERED, AudioPlayer.EVENT_PROGRESS]))) switch (inArray(t, [AudioPlayer.EVENT_PLAY, AudioPlayer.EVENT_PAUSE]) && (this.subscribers = this.subscribers.filter(function(t) {
                    return t.context instanceof Element ? bodyNode.contains(t.context) : !0
                }), this.updateCurrentPlaying(!0)), each(this.subscribers || [], function(o, s) {
                    s.et == t && s.cb(a, e, i)
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
                            var r = this.getCurrentPlaylist(),
                                l = this._impl.getCurrentProgress();
                            if (this._lsSet(AudioPlayer.LS_PROGRESS, l), this._trackListenedData(s, r, o, this._getPlayingContext()), this._allowPrefetchNext && l >= .8) {
                                var n = r.getNextAudio(a);
                                n && this._impl.isFullyLoaded() && (this._allowPrefetchNext = !1, this._prefetchAudio(n))
                            }
                        }
                        break;
                    case AudioPlayer.EVENT_PAUSE:
                        this._setTabIcon("pause")
                }
            }, AudioPlayer.prototype._trackListenedData = function(t, e, i, o) {
                var a = this;
                if (i = Math.round(i) || 0) {
                    var s = {
                        audio_id: AudioUtils.asObject(t).fullId,
                        listened: i,
                        context: o
                    };
                    "search" == o && e && (s.search_params = JSON.stringify(e.getSearchParams())), e && e.getType() == AudioPlaylist.TYPE_PLAYLIST && (s.playlist_id = e.getOwnerId() + "_" + e.getAlbumId() + (e.getAccessHash() ? "_" + e.getAccessHash() : "")), this._currentAudioListenData = s, clearTimeout(this._sendListenedTO), this._sendListenedTO = setTimeout(function() {
                        a._sendListenedData()
                    }, 1e4)
                }
            }, AudioPlayer.prototype._sendListenedData = function() {
                var t = this;
                clearTimeout(this._sendListenedTO);
                var e = this._currentAudioListenData;
                if (this._currentAudioListenData = !1, e && e.listened && this._listenedHash) {
                    var i = extend({
                        act: "listened_data",
                        impl: this._impl.type,
                        hash: this._listenedHash,
                        v: 5,
                        loc: nav.strLoc
                    }, e);
                    isArray(cur.audioLoadTimings) && (i.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), ajax.post("al_audio.php", i, {
                        onDone: function(e) {
                            t._adsConfig = e
                        }
                    })
                }
            }, AudioPlayer.prototype.playLive = function(t, e) {
                var i = this.getPlaylist(AudioPlaylist.TYPE_LIVE, vk.id, data[0]);
                i.mergeWith({
                    live: t,
                    hasMore: !1
                }), t = i.getLiveInfo();
                var o = this;
                ajax.post("al_audio.php", {
                    act: "a_play_audio_status",
                    audio_id: t.audioId,
                    host_id: t.hostId,
                    hash: t.hash
                }, extend(e, {
                    onDone: function(t, e, a) {
                        i.mergeWith({
                            title: e.title,
                            list: [t]
                        }), o.play(t, i, a)
                    }
                }))
            }, AudioPlayer.prototype._sendStatusExport = function() {
                var t = this.getCurrentAudio();
                if (t) {
                    t = AudioUtils.asObject(t);
                    var e = this.statusSent ? this.statusSent.split(",") : [!1, 0],
                        i = vkNow() - intval(e[1]);
                    if (this.hasStatusExport() && (t.id != e[0] || i > 3e5)) {
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
            }, AudioPlayer.prototype.saveStateCurrentPlaylist = function() {
                if (!vk.widget) {
                    var t = this.getCurrentPlaylist();
                    if (t) {
                        var e = t.serialize();
                        this._lsSet(AudioPlayer.LS_PL, e)
                    } else this._lsSet(AudioPlayer.LS_PL, null);
                    this._lsSet(AudioPlayer.LS_SAVED, vkNow())
                }
            }, AudioPlayer.prototype._saveStateCurrentAudio = function() {
                if (!vk.widget) {
                    var t = this.getCurrentAudio();
                    if (t) {
                        var e = clone(t);
                        e[AudioUtils.AUDIO_ITEM_INDEX_URL] = "", this._lsSet(AudioPlayer.LS_TRACK, e), setCookie("remixcurr_audio", t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID], 1)
                    } else this._lsSet(AudioPlayer.LS_TRACK, null), setCookie("remixcurr_audio", null, 1)
                }
            }, AudioPlayer.prototype.seekCurrentAudio = function(t) {
                if (this._adsIsAdPlaying()) return !1;
                var e = AudioUtils.asObject(this.getCurrentAudio()),
                    i = 10 / e.duration,
                    o = this.getCurrentProgress() + (t ? i : -i);
                o = Math.max(0, Math.min(1, o)), this.seek(o)
            }, AudioPlayer.prototype._lsGet = function(t) {
                return ls.get(AudioPlayer.LS_PREFIX + t)
            }, AudioPlayer.prototype._lsSet = function(t, e) {
                ls.set(AudioPlayer.LS_PREFIX + t, e)
            }, AudioPlayer.prototype.setVolume = function(t) {
                t = Math.min(1, Math.max(0, t)), this._userVolume = t, this._implSetVolume(t), this._adsUpdateVolume(), this.notify(AudioPlayer.EVENT_VOLUME, t)
            }, AudioPlayer.prototype.getVolume = function() {
                return void 0 === this._userVolume ? .8 : this._userVolume
            }, AudioPlayer.prototype.seek = function(t) {
                this._implSeekImmediate(t)
            }, AudioPlayer.prototype._ensureHasURL = function(t, e) {
                var i = [];
                this._currentUrlEnsure = this._currentUrlEnsure || {};
                var o = AudioUtils.asObject(t);
                if (o.url) return e && e(t);
                var a = this.getCurrentPlaylist(),
                    s = a.indexOfAudio(t);
                if (s >= 0)
                    for (var r = s; s + 5 > r; r++) {
                        var l = AudioUtils.asObject(a.getAudioAt(r));
                        !l || l.url || this._currentUrlEnsure[l.fullId] || (i.push(l.fullId), this._currentUrlEnsure[l.fullId] = !0)
                    }
                if (i.push(o.fullId), i.length) {
                    var n = this;
                    ajax.post("al_audio.php", {
                        act: "reload_audio",
                        ids: i.join(",")
                    }, {
                        onDone: function(i, a, s) {
                            getAudioPlayer().setStatusExportInfo(a), n._listenedHash = s, each(i, function(e, i) {
                                i = AudioUtils.asObject(i);
                                var a = {};
                                a[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, a[AudioUtils.AUDIO_ITEM_INDEX_TRACK_GENRE] = i.trackGenre, n.updateAudio(i.fullId, a), o.fullId == i.fullId && (t[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, t[AudioUtils.AUDIO_ITEM_INDEX_TRACK_GENRE] = i.trackGenre), n.currentAudio && AudtioUtils.asObject(n.currentAudio).fullId == i.fullId && (n.currentAudio[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, n.currentAudio[AudioUtils.AUDIO_ITEM_INDEX_TRACK_GENRE] = i.trackGenre), delete n._currentUrlEnsure[i.fullId]
                            }), e && e(t)
                        }
                    })
                }
            }, AudioPlayer.prototype.toggleAudio = function(t, e) {
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
                if (domClosest("_audio_row__tt", e.target)) return cancelEvent(e);
                var i = domClosest("_audio_row", t),
                    o = AudioUtils.getAudioFromEl(i, !0);
                if (window.getSelection && window.getSelection().rangeCount) {
                    var a = window.getSelection().getRangeAt(0);
                    if (a && a.startOffset != a.endOffset) return !1
                }
                if (e && hasClass(e.target, "mem_link")) return nav.go(attr(e.target, "href"), e, {
                    navigateToUploader: !0
                }), cancelEvent(e);
                if (hasClass(e.target, "_audio_row__title_inner") && o.lyrics && !o.isInAttach) return AudioUtils.toggleAudioLyrics(i, o), cancelEvent(e);
                if (hasClass(e.target, "audio_row__performer")) return checkEvent(e) || vk.widget ? !0 : (AudioUtils.audioSearchPerformer(e.target, o.performer, e), cancelEvent(e));
                var s = cur.cancelClick || e && (hasClass(e.target, "audio_lyrics") || domClosest("_audio_duration_wrap", e.target) || domClosest("_audio_inline_player", e.target) || domClosest("audio_performer", e.target));
                if (cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl == geByClass1("audio_inline_player_progress", i) && (s = !0), delete cur.cancelClick, delete cur._sliderMouseUpNowEl, s) return !0;
                if (AudioUtils.isClaimedAudio(o) || o.isReplaceable) {
                    var r = AudioUtils.getAudioExtra(o),
                        l = r.claim;
                    if (l) return void(hasClass(i, "no_actions") || o.isInEditBox || showAudioClaimWarning(o, l, AudioUtils.replaceWithOriginal.bind(AudioUtils, i, o)))
                }
                if (o.isPlaying) this.pause();
                else {
                    var n = AudioUtils.getContextPlaylist(i);
                    this.play(o.fullId, n.playlist, o.context || n.context), cur.audioPage && cur.audioPage.onUserAction(o, n.playlist)
                }
                AudioUtils.onRowOver(i, !1, !0)
            }, AudioPlayer.prototype._onFailedUrl = function(t) {
                this.notify(AudioPlayer.EVENT_FAILED), this.isPlaying() && (this.pause(), this.playNext(!0, !0))
            }, AudioPlayer.prototype._startAdsPlay = function(t, e, i, o) {
                function a() {
                    var i = this._getPlayingContextSection();
                    switch (t = AudioUtils.asObject(t), this._adsIsAllowed(t, e)) {
                        case AudioPlayer.ADS_ALLOW_ALLOWED:
                            this._adsFetchAd(t, i, !1, function() {
                                o && o()
                            }.bind(this));
                            break;
                        case AudioPlayer.ADS_ALLOW_DISABLED:
                            o && o();
                            break;
                        case AudioPlayer.ADS_ALLOW_REJECT:
                            this._adsFetchAd(t, i, !0), o && o()
                    }
                }
                this._startAdsTO && clearWorkerTimeout(this._startAdsTO), i ? this._startAdsTO = setWorkerTimeout(a.bind(this), 200) : a.call(this)
            }, AudioPlayer.prototype.playPlaylist = function(t, e, i, o, a) {
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
                var s = this.getCurrentPlaylist(),
                    r = this.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, e, i);
                if (s && s.getId() == r.getId() && this.isPlaying() && !a) this.pause();
                else {
                    var l = function() {
                        var t = r.getNextAudio(!1, !0);
                        t && this.play(t, r, o)
                    };
                    r.loadAll(function() {
                        a && (r.isShuffled() && r.shuffle(0), r.shuffle(irand(1, 999999), !0)), l.call(this)
                    }.bind(this)), r.getAudiosCount() && !a && l.call(this)
                }
            }, AudioPlayer.prototype._initPlayingContext = function(t) {
                this._playingContext = t
            }, AudioPlayer.prototype._getPlayingContext = function() {
                return this._playingContext || ""
            }, AudioPlayer.prototype._getPlayingContextSection = function() {
                return this._getPlayingContext().split(":")[0]
            }, AudioPlayer.prototype.play = function(t, e, i, o, a) {
                if (!cur.loggingOff) {
                    if (!this._impl) return void AudioUtils.showNeedFlashBox();
                    this._cleanUpPlaylists(), (isObject(t) || isArray(t)) && (t = AudioUtils.asObject(t), t && (t = t.fullId));
                    var s = AudioUtils.asObject(this._currentAudio),
                        r = this.getCurrentPlaylist();
                    !t && s && (t = s.fullId);
                    var l = !1,
                        n = t && s && t == s.fullId;
                    e ? r && (l = e == r.getSelf() || e == r) : (e = r, l = !0), l || i || debugLog("New playlist play init without context"), i && this._initPlayingContext(i);
                    var d = e.getAudio(t);
                    d && e.load(e.indexOfAudio(d) + 3), n || (this._sendListenedData(), e.getType() == AudioPlaylist.TYPE_SEARCH && e.indexOfAudio(d) >= e.getLocalFoundCount() && e.sendSearchStats("search_play")), n || this._adsIsAdPlaying() || this._adsDeinit(), n && l ? this._adsIsAdPlaying() ? this._adsResumeAd() : this.isPlaying() || (this._isPlaying = !0, this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY), n || this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implClearAllTasks(), this._implSetVolume(0), this._implSetUrl(d), this._implPlay(), this._implSetVolume(this.getVolume(), !0)) : t && d && (this._currentAudio = d, l || (this._currentPlaylist && (this._prevPlaylist = this._currentPlaylist, this._prevAudio = this._currentAudio), this._currentPlaylist = new AudioPlaylist(e), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)), this._isPlaying = !0, this.updateCurrentPlaying(!0), this._adsIsAdPlaying() ? (this.notify(AudioPlayer.EVENT_PLAY, !0), this._adsResumeAd()) : (this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY, !0, intval(o), a), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._muteProgressEvents = !0, this._implClearAllTasks(), this._impl.preparePlay && this._impl.preparePlay(), a ? this._startAdsPlay(d, e, !1, function() {
                        d = this.getCurrentAudio(), d && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(d), this._implPlay(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                    }.bind(this)) : (this._implSetVolume(0, !0), this._implPause(), this._startAdsPlay(d, e, !0, function() {
                        d = this.getCurrentAudio(), d && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(d), this._implPlay(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                    }.bind(this)))))
                }
            }, AudioPlayer.prototype.preloadDefaultPlaylist = function(t) {
                if (browser.safari && !this._lsGet(AudioPlayer.LS_TRACK)) {
                    var e = this.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID, t);
                    e.load()
                }
            }, AudioPlayer.prototype.instantPlay = function(t, e, i) {
                var o = !browser.safari && e && e.shiftKey;
                this.playPlaylist(vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID, i, "header", o), statlogsValueEvent("client_header_play_button", o ? "shuffle" : "play"), setTimeout(function() {
                    addClass(t, "loading")
                }, 400)
            }, AudioPlayer.prototype._prefetchAudio = function(t) {
                t = AudioUtils.asObject(t), t && t.url && this._impl.prefetch && this._impl.prefetch(t.url)
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
            }, AudioPlayer.prototype.playNext = function(t, e) {
                this._playNext(1, t)
            }, AudioPlayer.prototype.playPrev = function() {
                this._playNext(-1)
            }, AudioPlayer.prototype._playNext = function(t, e) {
                if (!this._adsIsAdPlaying()) {
                    var i = 10,
                        o = this.getCurrentAudio(),
                        a = this.getCurrentPlaylist();
                    if (o && a)
                        if (t > 0) {
                            for (var s = a.getNextAudio(o); i && s && AudioUtils.isClaimedAudio(s);) s = a.getNextAudio(s), i--;
                            s ? this.play(s, a, !1, 1, e) : a.isLive() ? (this._muteProgressEvents = !0, a.fetchNextLiveAudio(function(t) {
                                this.play(t, a, !1, 1, e)
                            }.bind(this))) : (s = a.getAudioAt(0), this.play(s, a, !1, 1, e))
                        } else {
                            var r = a.indexOfAudio(this._currentAudio) - 1;
                            if (0 > r) this.seek(0);
                            else {
                                for (var l = a.getAudioAt(r); i && l && AudioUtils.isClaimedAudio(l);) l = a.getAudioAt(--r), i--;
                                this.play(l, a, !1, -1, e)
                            }
                        }
                }
            }, AudioPlayer.prototype._adsPlayAd = function(t, e, i) {
                this._adman.onCompleted(function() {
                    return this._adsDeinit(!0), t ? void this._adsSendAdEvent("statistics", e) : (this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_COMPLETED), delete this._adsPlaying, delete this._adsCurrentProgress, this._adsSendAdEvent("completed", e), setDocumentTitle(this._adsPrevTitle), void(i && i()))
                }.bind(this)), this._adman.onStarted(function() {
                    t || (this._isPlaying = !0, this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_STARTED), this._adsUpdateVolume(), this._adsSendAdEvent("started", e))
                }.bind(this));
                var o = [.25, .5, .75];
                return this._adman.onTimeRemained(function(t) {
                    this._adsCurrentProgress = t.percent / 100, this.notify(AudioPlayer.EVENT_PROGRESS, t.percent / 100, t.duration), each(o, function(t, i) {
                        return this._adsCurrentProgress >= i ? (o.shift(), this._adsSendAdEvent("progress_" + intval(100 * i), e), !1) : void 0
                    }.bind(this))
                }.bind(this)), this._adman.start(AudioPlayer.AD_TYPE), t ? i && i() : (this._adsPlaying = !0, this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._adsPrevTitle = document.title, void setDocumentTitle(getLang("global_audio_ad")))
            }, AudioPlayer.prototype._adsUpdateVolume = function() {
                this._adman && this._adman.setVolume(.7 * this.getVolume())
            }, AudioPlayer.prototype._adsSendAdEvent = function(t, e) {
                this._adEvents = this._adEvents || [], this._adEvents.push(t + "/" + e), clearTimeout(this._adEventDelay), this._adEventDelay = setTimeout(function() {
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
            }, AudioPlayer.ADS_ALLOW_DISABLED = 1, AudioPlayer.ADS_ALLOW_ALLOWED = 2, AudioPlayer.ADS_ALLOW_REJECT = 3, AudioPlayer.prototype._adsIsAllowed = function(t, e) {
                if (vk.widget) return AudioPlayer.ADS_ALLOW_DISABLED;
                if (cur.adsPreview) return AudioPlayer.ADS_ALLOW_ALLOWED;
                if (window.browser && window.browser.safari) return AudioPlayer.ADS_ALLOW_DISABLED;
                var i = this._adsConfig || vk.audioAdsConfig;
                return i ? i.enabled ? inArray(this._getPlayingContextSection(), i.sections) ? i.day_limit_reached ? AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_ALLOWED : AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_DISABLED : AudioPlayer.ADS_ALLOW_REJECT
            }, AudioPlayer.prototype._adsFetchAd = function(t, e, i, o) {
                this._loadAdman(function() {
                    function a(t, e) {
                        for (var i = (t >>> 0).toString(16), o = e.toString(16); o.length < 8;) o = "0" + o;
                        return i + o
                    }
                    if (!window.AdmanHTML) return this._adsSendAdEvent("no_adman", e), o && o();
                    var s = {
                        my: 101,
                        my_playlists: 101,
                        audio_feed: 109,
                        recent: 113,
                        user_wall: 104,
                        group_wall: 104,
                        user_list: 102,
                        group_list: 103,
                        user_playlists: 102,
                        group_playlists: 103,
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
                        other: 114
                    };
                    this._adman = new AdmanHTML;
                    var r = {
                        _SITEID: 276,
                        ver: 251116,
                        vk_id: vk.id,
                        duration: t.duration,
                        content_id: a(t.ownerId, t.id),
                        vk_catid: s[e] || s.other,
                        puid22: t.trackGenre
                    };
                    nav.objLoc.preview && (r.preview = intval(nav.objLoc.preview)), cur.adsPreview && (r.preview = 1), this._adman.setDebug(!!r.preview), this._adman.onError(function() {
                        o && o()
                    }), this._adman.onReady(function() {
                        if (this._adman) {
                            var t = this._adman.getBannersForSection(AudioPlayer.AD_TYPE);
                            t && t.length ? "statistics" == t[0].type ? (this._adsPlayAd(!0, e), o && o()) : (this._adsSendAdEvent("received", e), i ? (this._adsSendAdEvent("rejected", e), this._adsDeinit(), o && o()) : (this._adsSendAdEvent("ready", e), this.notify(AudioPlayer.EVENT_AD_READY), this._adsPlayAd(!1, e, o))) : (i || this._adsSendAdEvent("not_received", e), o && o())
                        }
                    }.bind(this)), this._adman.init({
                        slot: 3514,
                        wrapper: se("<div></div>"),
                        params: r,
                        browser: {
                            adBlock: !!window.abp,
                            mobile: !1
                        }
                    }), this._adsSendAdEvent("requested", e)
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
            }, AudioPlayerFlash.onAudioProgressCallback = function(t, e) {
                var i = window._flashAudioInstance;
                e && (i._total = e, i._currProgress = t / e, i.opts.onProgressUpdate && i.opts.onProgressUpdate(i._currProgress, t))
            }, AudioPlayerFlash.onAudioLoadProgressCallback = function(t, e) {
                var i = window._flashAudioInstance;
                i._currBuffered = t / e, i.opts.onBufferUpdate && i.opts.onBufferUpdate(i._currBuffered)
            }, AudioPlayerFlash.prototype.fadeVolume = function(t, e) {
                return this.setVolume(t), e()
            }, AudioPlayerFlash.prototype._stopFrequencyAnalise = function() {
                this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
            }, AudioPlayerFlash.prototype._startFrequencyAnalise = function() {
                function t(t, e, i, o) {
                    var a = i - e;
                    return a * t / o + e
                }

                function e(t, e) {
                    return Math.random() * (e - t) + t
                }
                var i = this;
                this._stopFrequencyAnalise();
                var o = 999,
                    a = 3,
                    s = null,
                    r = null;
                this._freqUpdateInterval = setInterval(function() {
                    var l = void 0;
                    o++, o > a && (o = 0, s = r, r = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)], s || (s = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)])), l = [t(o, s[0], r[0], a), t(o, s[1], r[1], a), t(o, s[2], r[2], a), t(o, s[3], r[3], a)], i.opts.onFrequency(l)
                }, 50)
            }, AudioPlayerFlash.prototype.type = "flash", AudioPlayerFlash.PLAYER_EL_ID = "flash_audio", AudioPlayerFlash.prototype.destroy = function() {
                re(AudioPlayerFlash.PLAYER_EL_ID)
            }, AudioPlayerFlash.prototype.onReady = function(t) {
                if (this._player) return t(!0);
                if (this._player === !1) return t(!1);
                this._onReady = t;
                var e = {
                        url: "/swf/audio_lite.swf",
                        id: "player",
                        height: 2
                    },
                    i = {
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
                renderFlash(AudioPlayerFlash.PLAYER_EL_ID, e, i, o) && setTimeout(function() {
                    a._checkFlashLoaded()
                }, 50)
            }, AudioPlayerFlash.prototype.setUrl = function(t, e) {
                var i = (0, _audio_unmask_source.audioUnmaskSource)(t);
                return this._url == i ? void(e && e(!0)) : (this._url = i, this._player && this._player.loadAudio(i), void(e && e(!0)))
            }, AudioPlayerFlash.prototype.setVolume = function(t) {
                this._player && this._player.setVolume && this._player.setVolume(t)
            }, AudioPlayerFlash.prototype.play = function() {
                this._player && this._player.playAudio(), this._startFrequencyAnalise()
            }, AudioPlayerFlash.prototype.seek = function(t) {
                var e = (this._total || 0) * t;
                this._player && this._player.playAudio(e)
            }, AudioPlayerFlash.prototype.pause = function() {
                this._player && this._player.pauseAudio(), this._stopFrequencyAnalise()
            }, AudioPlayerFlash.prototype.isFullyLoaded = function() {
                return !1
            }, AudioPlayerFlash.prototype.getPlayedTime = function() {
                return 0
            }, AudioPlayerFlash.prototype.getCurrentProgress = function() {
                return this._currProgress || 0
            }, AudioPlayerFlash.prototype.getCurrentBuffered = function() {
                return this._currBuffered || 0
            }, AudioPlayerFlash.prototype.stop = function() {
                this._player && this._player.stopAudio(), this._stopFrequencyAnalise()
            }, AudioPlayerFlash.prototype._checkFlashLoaded = function() {
                var t = ge("player");
                if (this._checks = this._checks || 0, this._checks++, AudioUtils.debugLog("Flash element check", this._checks), this._checks > 10) return AudioUtils.debugLog("No Flash element found after some amount of checks"), this._player = !1, this._onReady && this._onReady(!1);
                if (t && t.paused) AudioUtils.debugLog("Flash element found"), this._player = t, this._onReady && this._onReady(!0), this._onReady = null;
                else {
                    var e = this;
                    setTimeout(function() {
                        e._checkFlashLoaded()
                    }, 100)
                }
            }, window.AudioPlayerHTML5WebAudio = function(t) {
                this._opts = t, window.console && console.log("init audio context", window._audioContextData);
                var e = [];
                try {
                    var i = window._audioContextData;
                    i ? (e.push(1), this._context = i.context, this._audio = i.audio, this._analyser = i.analyzer, this._gainNode = i.gainNode, e.push(2), this._context.suspend(), e.push(3), this._toggleContext(!1)) : (window._audioContextData = !0, e.push(4), this._audio = new Audio, this._audio.crossOrigin = "anonymous", "AudioContext" in window ? this._context = new AudioContext : "webkitAudioContext" in window && (this._context = new webkitAudioContext), e.push(5), this._context.suspend(), e.push(6), this._toggleContext(!1), e.push(7), this._analyser = this._context.createAnalyser(), this._gainNode = this._context.createGain(), e.push(8), this._analyser.connect(this._gainNode), this._gainNode.connect(this._context.destination), e.push(9), window._audioContextData = {
                        context: this._context,
                        audio: this._audio,
                        analyzer: this._analyser,
                        gainNode: this._gainNode
                    })
                } catch (o) {
                    this.failed = !0, e = e.join(",");
                    var a = "undefined" != typeof navigator ? navigator.userAgent : "";
                    ajax.post("al_audio.php", {
                        act: "webaudio_log",
                        log: e,
                        e: o.toString(),
                        ua: a,
                        v: 2,
                        nav: nav.strLoc
                    })
                }
                cur._audioVer = 1, this.type = "html5webapi"
            }, AudioPlayerHTML5WebAudio.isSupported = function() {
                return !1
            }, AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION = 300, AudioPlayerHTML5WebAudio.prototype._toggleContext = function(t) {
                var e = this;
                clearWorkerTimeout(this._toggleContextTO), t && "running" == this._context.state || (t || "suspended" != this._context.state) && (t ? this._context.resume() : this._toggleContextTO = setWorkerTimeout(function() {
                    e._context.suspend()
                }, 1e3))
            }, AudioPlayerHTML5WebAudio.prototype.setUrl = function(t, e) {
                var i = this;
                this._createAudioNode(t, function() {
                    var t = i._seekOnReady;
                    delete i._seekOnReady, t && i.seek(t)
                }), e && e(!0)
            }, AudioPlayerHTML5WebAudio.prototype.getCurrentProgress = function() {
                var t = this._audio;
                return isNaN(t.duration) ? 0 : Math.max(0, Math.min(1, t.currentTime / t.duration))
            }, AudioPlayerHTML5WebAudio.prototype.getPlayedTime = function() {
                for (var t = this._audio.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                return e
            }, AudioPlayerHTML5WebAudio.prototype.getCurrentBuffered = function() {
                return this._audio.buffered.length ? Math.min(1, this._audio.buffered.end(0) / this._audio.duration) : 0
            }, AudioPlayerHTML5WebAudio.prototype.onReady = function(t) {
                return t && t(!0)
            }, AudioPlayerHTML5WebAudio.prototype.setVolume = function(t) {
                this._gainNode.gain.linearRampToValueAtTime(t, this._context.currentTime + .01)
            }, AudioPlayerHTML5WebAudio.prototype.fadeVolume = function(t, e) {
                this._toggleContext(!0), this._gainNode.gain.linearRampToValueAtTime(t, this._context.currentTime + AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION / 1e3), clearWorkerTimeout(this._fadeTO), this._fadeTO = setWorkerTimeout(function() {
                    e(!0)
                }, AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION + 50)
            }, AudioPlayerHTML5WebAudio.prototype.isFullyLoaded = function() {
                return !!this._audio._fullyLoaded
            }, AudioPlayerHTML5WebAudio.prototype.seek = function(t) {
                var e = this._audio;
                isNaN(e.duration) ? this._seekOnReady = t : e.currentTime = e.duration * t
            }, AudioPlayerHTML5WebAudio.prototype.pause = function() {
                this._audio.pause(), this._toggleContext(!1)
            }, AudioPlayerHTML5WebAudio.prototype.stop = function() {
                this.pause()
            }, AudioPlayerHTML5WebAudio.prototype.play = function(t) {
                function e(t) {
                    isUndefined(t) || t["catch"](function(t) {
                        t.code != t.ABORT_ERR && setWorkerTimeout(function() {
                            triggerEvent(o, "error", !1, !0)
                        }, 500)
                    })
                }
                var i = this;
                this._toggleContext(!0);
                var o = this._audio;
                this._audio.src != t ? this._createAudioNode(t, function() {
                    e(o.play()), i._startFreqAnalyse()
                }) : this._audio._canPlay ? (e(o.play()), this._startFreqAnalyse()) : (this._audio.onCanPlays = this._audio.onCanPlays || [], this._audio.onCanPlays.push(function() {
                    e(o.play()), i._startFreqAnalyse()
                }))
            }, AudioPlayerHTML5WebAudio.prototype._createAudioNode = function(t, e) {
                var i = this;
                return this._audio && this._audio.src == t ? this._audio._canPlay ? e && e() : (this._audio.onCanPlays = this._audio.onCanPlays || [], void this._audio.onCanPlays.push(e)) : (this._source && this._source.disconnect(), this._audio = new Audio, this._audio.crossOrigin = "anonymous", this._audio.onCanPlays = [e], this._source = this._context.createMediaElementSource(this._audio), this._source.connect(this._analyser), this._audio.src = t, this._audio.addEventListener("canplay", function() {
                    if (!i._audio._canPlay) {
                        i._audio._canPlay = !0, i._opts.onCanPlay && i._opts.onCanPlay();
                        var t = i._audio.onCanPlays;
                        each(t, function(t, e) {
                            e && e()
                        })
                    }
                }), this._audio.addEventListener("timeupdate", function() {
                    i._opts.onProgressUpdate && i._opts.onProgressUpdate(i.getCurrentProgress(), i.getPlayedTime())
                }), this._audio.addEventListener("progress", function() {
                    i._opts.onBufferUpdate && i._opts.onBufferUpdate(i.getCurrentBuffered());
                    var t = i._audio.buffered;
                    1 == t.length && 0 == t.start(0) && t.end(0) == i._audio.duration && (i._audio._fullyLoaded = !0)
                }), this._audio.addEventListener("ended", function() {
                    i._opts.onEnd && i._opts.onEnd()
                }), this._audio.addEventListener("seeked", function() {
                    i._opts.onSeeked && i._opts.onSeeked()
                }), this._audio.addEventListener("seeking", function() {
                    i._opts.onSeek && i._opts.onSeek()
                }), void this._audio.addEventListener("error", function() {
                    i._opts.onFail && i._opts.onFail()
                }))
            }, AudioPlayerHTML5WebAudio.prototype._startFreqAnalyse = function() {
                var t = this;
                this._stopFreqAnalyse();
                var e = new Uint8Array(this._analyser.frequencyBinCount);
                this._freqUpdateInterval = setInterval(function() {
                    t._analyser.getByteFrequencyData(e);
                    var i = 255,
                        o = e.length,
                        a = [Math.min(255, 1.2 * e[Math.round(.05 * o)]) / i, Math.min(255, 1.2 * e[Math.round(.15 * o)]) / i, Math.min(255, 1.3 * e[Math.round(.3 * o)]) / i, Math.min(255, 1.4 * e[Math.round(.55 * o)]) / i];
                    t._opts.onFrequency && t._opts.onFrequency(a)
                }, 50)
            }, AudioPlayerHTML5WebAudio.prototype._stopFreqAnalyse = function() {
                clearInterval(this._freqUpdateInterval)
            }, AudioPlayerHTML5WebAudio.prototype.destroy = function() {
                this._stopFreqAnalyse()
            }, AudioPlayerHTML5WebAudio.prototype.prefetch = function(t) {
                var e = new Audio;
                e.src = t
            }, window.AudioPlayerHTML5Simple = function(t) {
                this.opts = t || {}, this._audioEl = this._createAudioNode(), this.type = "html5simple"
            }, AudioPlayerHTML5Simple.prototype.setUrl = function(t, e) {
                return e && e(!0)
            }, AudioPlayerHTML5Simple.prototype.onReady = function(t) {
                return t(!0)
            }, AudioPlayerHTML5Simple.prototype.seek = function(t) {
                var e = this._audioEl;
                isNaN(e.duration) || (e.currentTime = e.duration * t)
            }, AudioPlayerHTML5Simple.prototype.isFullyLoaded = function() {
                return !1
            }, AudioPlayerHTML5Simple.prototype.getPlayedTime = function() {
                for (var t = this._audioEl.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                return e
            }, AudioPlayerHTML5Simple.prototype.setVolume = function(t) {
                void 0 === t && (t = this._audioEl.volume), this._audioEl.volume = t, this._volume = t
            }, AudioPlayerHTML5Simple.prototype.fadeVolume = function(t, e) {
                this.setVolume(t), e && e()
            }, AudioPlayerHTML5Simple.prototype.getCurrentProgress = function() {
                var t = this._audioEl;
                return isNaN(t.duration) ? 0 : Math.max(0, Math.min(1, t.currentTime / t.duration))
            }, AudioPlayerHTML5Simple.prototype._stopFrequencyAnalise = function() {
                clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
            }, AudioPlayerHTML5Simple.prototype._startFrequencyAnalise = function() {
                function t(t, e, i, o) {
                    var a = i - e;
                    return a * t / o + e
                }

                function e(t, e) {
                    return Math.random() * (e - t) + t
                }
                var i = this;
                this._stopFrequencyAnalise();
                var o = 999,
                    a = 3,
                    s = null,
                    r = null;
                this._freqUpdateInterval = setInterval(function() {
                    var l = void 0;
                    i._audioEl.paused || !data(i._audioEl, "canplay") ? l = [0, 0, 0, 0] : (o++, o > a && (o = 0, s = r, r = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)], s || (s = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)])), l = [t(o, s[0], r[0], a), t(o, s[1], r[1], a), t(o, s[2], r[2], a), t(o, s[3], r[3], a)]), i.opts.onFrequency(l)
                }, 50)
            }, AudioPlayerHTML5Simple.prototype.getCurrentBuffered = function() {
                var t = this._audioEl;
                return t && t.buffered.length ? Math.min(1, t.buffered.end(0) / t.duration) : 0
            }, AudioPlayerHTML5Simple.prototype.play = function(t) {
                var e = (0, _audio_unmask_source.audioUnmaskSource)(t);
                this._audioEl.src != e && (this._audioEl.src = e), this._audioEl.play(), this._startFrequencyAnalise()
            }, AudioPlayerHTML5Simple.prototype.preparePlay = function() {
                this._audioEl.play()
            }, AudioPlayerHTML5Simple.prototype.pause = function() {
                this._audioEl.pause()
            }, AudioPlayerHTML5Simple.prototype.stop = function() {
                this._audioEl.pause(), this._audioEl.src = ""
            }, AudioPlayerHTML5Simple.prototype._createAudioNode = function() {
                var t = new Audio,
                    e = this;
                return this.opts.onBufferUpdate && addEvent(t, "progress", function() {
                    e.opts.onBufferUpdate(e.getCurrentBuffered());
                    var i = t.buffered;
                    1 == i.length && 0 == i.start(0) && i.end(0) == t.duration && (t._fullyLoaded = !0)
                }), this.opts.onProgressUpdate && addEvent(t, "timeupdate", function() {
                    this.opts.onProgressUpdate(this.getCurrentProgress(), this.getPlayedTime())
                }.bind(this)), this.opts.onEnd && addEvent(t, "ended", function() {
                    e.opts.onEnd()
                }), this.opts.onSeeked && addEvent(t, "seeked", function() {
                    e.opts.onSeeked()
                }), this.opts.onSeek && addEvent(t, "seeking", function() {
                    e.opts.onSeek()
                }), t.addEventListener("error", function(t) {
                    AudioUtils.debugLog("HTML5 error track loading"), e.opts.onFail && e.opts.onFail()
                }), t.addEventListener("canplay", function() {
                    e.opts.onCanPlay && e.opts.onCanPlay(), data(t, "canplay", !0), e._seekOnReady && (e.seek(e._seekOnReady), e._seekOnReady = !1)
                }), t.crossOrigin = "anonymous", t
            }, window.AudioPlayerHTML5 = function(t) {
                this.opts = t || {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
            }, AudioPlayerHTML5.AUDIO_EL_ID = "ap_audio", AudioPlayerHTML5.STATE_HAVE_NOTHING = 0, AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA = 3, AudioPlayerHTML5.HAVE_ENOUGH_DATA = 4, AudioPlayerHTML5.SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", AudioPlayerHTML5.isSupported = function() {
                var t = "undefined" != typeof navigator ? navigator.userAgent : "";
                if (/(Windows NT 5.1|Windows XP)/.test(t) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1;
                if (/(Windows 7|Windows NT 6.1)/.test(t) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1;
                var e = document.createElement("audio");
                if (e.canPlayType) {
                    var i = e.canPlayType('audio/mpeg; codecs="mp3"'),
                        o = !!i.replace(/no/, "");
                    return AudioUtils.debugLog("HTML5 browser support " + (o ? "yes" : "no"), i, t), o
                }
                return AudioUtils.debugLog("audio.canPlayType is not available", t), !1
            }, AudioPlayerHTML5.prototype.type = "html5", AudioPlayerHTML5.prototype.destroy = function() {}, AudioPlayerHTML5.prototype.getPlayedTime = function() {
                for (var t = this._currentAudioEl.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                return e
            }, AudioPlayerHTML5.prototype._setAudioNodeUrl = function(t, e) {
                var i = (0, _audio_unmask_source.audioUnmaskSource)(e);
                data(t, "setUrlTime", i == AudioPlayerHTML5.SILENCE ? 0 : vkNow()), t.src = i
            }, AudioPlayerHTML5.prototype._createAudioNode = function(t) {
                var e = new Audio,
                    i = this;
                return this.opts.onBufferUpdate && addEvent(e, "progress", function() {
                    i._currentAudioEl == e && i.opts.onBufferUpdate(i.getCurrentBuffered());
                    var t = e.buffered;
                    1 == t.length && 0 == t.start(0) && t.end(0) == e.duration && (e._fullyLoaded = !0)
                }), this.opts.onProgressUpdate && addEvent(e, "timeupdate", function() {
                    this._currentAudioEl == e && this.opts.onProgressUpdate(this.getCurrentProgress(), this.getPlayedTime())
                }.bind(this)), this.opts.onEnd && addEvent(e, "ended", function() {
                    i._currentAudioEl == e && i.opts.onEnd()
                }), this.opts.onSeeked && addEvent(e, "seeked", function() {
                    i._currentAudioEl == e && i.opts.onSeeked()
                }), this.opts.onSeek && addEvent(e, "seeking", function() {
                    i._currentAudioEl == e && i.opts.onSeek()
                }), addEvent(e, "error", function() {
                    AudioUtils.debugLog("HTML5 error track loading"), i._prefetchAudioEl == e ? i._prefetchAudioEl = i._createAudioNode() : i._currentAudioEl == e && e.src != AudioPlayerHTML5.SILENCE && i.opts.onFail && i.opts.onFail()
                }), addEvent(e, "canplay", function() {
                    var t = data(e, "setUrlTime");
                    t && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - t), data(e, "setUrlTime", 0)), i._prefetchAudioEl == e, i._currentAudioEl == e && (i.opts.onCanPlay && i.opts.onCanPlay(), data(e, "canplay", !0), i._seekOnReady && (i.seek(i._seekOnReady), i._seekOnReady = !1))
                }), e.crossOrigin = "anonymous", t && (this._setAudioNodeUrl(e, t), e.preload = "auto", e.volume = this._volume || 1, e.load()), this._audioNodes.push(e), this._audioNodes.length > 10 && this._audioNodes.splice(0, 5), e
            }, AudioPlayerHTML5.prototype.onReady = function(t) {
                t(!0)
            }, AudioPlayerHTML5.prototype.prefetch = function(t) {
                this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE), this._prefetchAudioEl = this._createAudioNode(t)
            }, AudioPlayerHTML5.prototype.seek = function(t) {
                var e = this._currentAudioEl;
                isNaN(e.duration) ? this._seekOnReady = t : e.currentTime = e.duration * t
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
            }, AudioPlayerHTML5.prototype.setUrl = function(t, e) {
                var i = this._currentAudioEl,
                    o = (0, _audio_unmask_source.audioUnmaskSource)(t);
                if (this._seekOnReady = !1, i.src == o) return this.opts.onCanPlay && this.opts.onCanPlay(), e && e(!0);
                if (this._prefetchAudioEl && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING)
                    if (this._prefetchAudioEl.src == o) {
                        this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE);
                        var a = this;
                        this._prefetchAudioEl.readyState >= AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA && setTimeout(function() {
                            a.opts.onCanPlay && a.opts.onCanPlay()
                        }), i = this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = !1
                    } else this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE);
                return i.src != o && (this._setAudioNodeUrl(i, o), i.load(), data(this._currentAudioEl, "canplay", null), this._stopFrequencyAnalise()), e && e(!0)
            }, AudioPlayerHTML5.prototype.play = function(t) {
                this._stopFrequencyAnalise(), this._prefetchAudioEl.src == (0, _audio_unmask_source.audioUnmaskSource)(t) && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING && (this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
                var e = this._currentAudioEl;
                if (e.src) {
                    var i = e.play();
                    isUndefined(i) || i["catch"](function(t) {
                        t.code != t.ABORT_ERR ? setWorkerTimeout(function() {
                            triggerEvent(e, "error", !1, !0)
                        }, 10) : debugLog("HTML5 audio play error: " + t)
                    }), this._startFrequencyAnalise()
                }
            }, AudioPlayerHTML5.prototype._stopFrequencyAnalise = function() {
                this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
            }, AudioPlayerHTML5.prototype._startFrequencyAnalise = function() {
                function t(t, e, i, o) {
                    var a = i - e;
                    return a * t / o + e
                }

                function e(t, e) {
                    return Math.random() * (e - t) + t
                }
                var i = this;
                this._stopFrequencyAnalise();
                var o = 999,
                    a = 3,
                    s = null,
                    r = null;
                this._freqUpdateInterval = setInterval(function() {
                    var l = void 0;
                    i._currentAudioEl.paused || !data(i._currentAudioEl, "canplay") ? l = [0, 0, 0, 0] : (o++, o > a && (o = 0, s = r, r = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)], s || (s = [e(.7, 1), e(.55, .8), e(.3, .55), e(.03, .45)])), l = [t(o, s[0], r[0], a), t(o, s[1], r[1], a), t(o, s[2], r[2], a), t(o, s[3], r[3], a)]), i.opts.onFrequency(l)
                }, 50)
            }, AudioPlayerHTML5.prototype.pause = function() {
                var t = this._currentAudioEl;
                if (t.src) {
                    var e = t.pause();
                    void 0 != e && e["catch"](function() {})
                }
                this._stopFrequencyAnalise()
            }, AudioPlayerHTML5.prototype.stop = function() {
                this._currentAudioEl.pause(), this._currentAudioEl = this._createAudioNode(AudioPlayerHTML5.SILENCE), this._stopFrequencyAnalise()
            }, AudioPlayerHTML5.prototype._setFadeVolumeInterval = function(t) {
                if (t) {
                    if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                        var e = new Blob(["           var interval;           onmessage = function(e) {             clearInterval(interval);             if (e.data == 'start') {               interval = setInterval(function() { postMessage({}); }, 20);             }           }         "]);
                        try {
                            this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(e))
                        } catch (i) {
                            this._fadeVolumeWorker = !1
                        }
                    }
                    this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = t, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(t, 60)
                } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
            }, AudioPlayerHTML5.prototype.fadeVolume = function(t, e) {
                t = Math.max(0, Math.min(1, t));
                var i = this._currentAudioEl,
                    o = 0;
                if (o = t < i.volume ? -.06 : .001, Math.abs(t - i.volume) <= .001) return this._setFadeVolumeInterval(), e && e();
                var a = i.volume;
                this._setFadeVolumeInterval(function() {
                    o > 0 && (o *= 1.35), a += o;
                    var i = !1;
                    return (i = 0 > o ? t >= a : a >= t) ? (this.setVolume(t), this._setFadeVolumeInterval(), e && e()) : void this.setVolume(a)
                }.bind(this))
            }, window.loadScript = function(t, e) {
                function i(t) {
                    n.readyState && "loaded" != n.readyState && "complete" != n.readyState || (a(), r && r())
                }

                function o(t) {
                    a(), l && l()
                }

                function a() {
                    clearTimeout(d), n.removeEventListener("load", i), n.removeEventListener("readystatechange", i), n.removeEventListener("error", o)
                }
                var s = e.timeout,
                    r = e.onLoad,
                    l = e.onError,
                    n = document.createElement("script");
                if (n.addEventListener("load", i), n.addEventListener("readystatechange", i), n.addEventListener("error", o), n.src = t, document.head.appendChild(n), s) var d = setTimeout(o, s);
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