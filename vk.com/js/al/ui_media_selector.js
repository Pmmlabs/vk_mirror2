function MediaSelector(e, a, i, t) {
    function o(e, a, i) {
        if (e = ge(e), !e) return !1;
        i = i || {}, window.__addMediaIndex || (__addMediaIndex = 0);
        var t = ++__addMediaIndex,
            o = '<div class="media_selector clear_fix"></div>';
        e.innerHTML = o;
        var s, r = domByClass(e, "media_selector"),
            d = [],
            n = (i.reverseMargin || 25, {
                id: t,
                menuNode: r,
                types: a,
                lastTypes: a,
                activate: function(e) {
                    n.touched = e === !0, i.onActivate && i.onActivate()
                },
                show: function() {
                    if (s && (clearTimeout(s), s = 0), n.moreWrap && !hasClass(n.moreWrap, "shown")) {
                        i.forceToUp || replaceClass(n.moreWrap, "to_up", "to_down");
                        var e = domByClass(n.moreWrap, "_more_items"),
                            a = getClientRectOffsetY(e);
                        (a > 0 || i.forceToUp) && replaceClass(n.moreWrap, "to_down", "to_up"), setTimeout(addClass.pbind(n.moreWrap, "shown"), 0)
                    }
                },
                hide: function(e) {
                    if (!s) {
                        var a = function() {
                            s = 0, n.moreWrap && removeClass(n.moreWrap, "shown")
                        };
                        if (e) {
                            var i = domByClass(n.moreWrap, "_more_items");
                            hide(i), a(), setTimeout(show.pbind(i), 0)
                        } else s = setTimeout(a, 300)
                    }
                },
                setOptions: function(e) {
                    extend(i, e)
                },
                setItems: function(e) {
                    function a(e, a, t, o, s, r) {
                        var l = ce("a", {
                            innerHTML: o ? a : '<span class="blind_label">' + a + "</span>",
                            className: "ms_item ms_item_" + e + " _type_" + e
                        });
                        if (!o && n.moreWrap ? domInsertBefore(l, n.moreWrap) : (o ? o : s).appendChild(l), l.setAttribute("tabindex", 0), !o) {
                            l.setAttribute("data-title", a), l.setAttribute("aria-label", a), l.setAttribute("role", "link");
                            var c = function() {
                                hasClass(this, "ms_item_article_highlight") || (hasClass(this, "_type_article") && (r = hasClass(domClosest("_submit_post_box", this), "shown") ? [5, 7] : [-6, 8]), showTitle(this, !1, r || !1, {
                                    noZIndex: !0
                                }))
                            };
                            addEvent(l, "mouseover", c), d.push(function() {
                                removeEvent(l, "mouseover", c)
                            })
                        }
                        if (t && !cur.viewAsBox) {
                            var _ = function() {
                                return n.activate(), n.hide(!0), i.onItemClick && !i.onItemClick(e) ? !1 : (t(), !1)
                            };
                            addEvent(l, "click", _), d.push(function() {
                                removeEvent(l, "click", _)
                            })
                        }
                    }
                    for (window.tooltips && tooltips.destroyAll(r); r.firstChild;) re(r.firstChild);
                    var t = void 0 !== i.hideAfterCount ? i.hideAfterCount : 4,
                        o = void 0 !== i.maxShown ? i.maxShown : 3,
                        s = !1,
                        l = i.hideItem,
                        c = (l || e.length > t) && (!browser.mobile || i.ignoreMobile),
                        _ = l && i.hideLabel || getLang("global_media_selector_more");
                    n.moreWrap = !1, n.lastTypes = e, each(e, function(e, t) {
                        var h = t[0],
                            p = t[1],
                            u = t[2];
                        if ("article" == h) return void(isArticleEditorAvailable() && a(h, p, u, !1, r, [-6, 7]));
                        var m;
                        if (c && (l ? h == l : e == o)) {
                            var g = r.appendChild(ce("div", {
                                    className: "ms_items_more_wrap"
                                })),
                                v = function(e) {
                                    n.fromKeyboard = checkKeyboardEvent(e), ("mouseover" != e.type || !n.touched && !n.fromKeyboard) && (n.fromKeyboard && hasClass(n.moreWrap, "shown") ? n.hide() : n.show())
                                },
                                w = function() {
                                    n.fromKeyboard || n.hide()
                                };
                            addEvent(g, "mouseover click", v), addEvent(g, "mouseout", w), d.push(function() {
                                removeEvent(g, "mouseover click", v), removeEvent(g, "mouseout", w)
                            }), i.vectorIcon && (_ = '<span class="blind_label">' + _ + "</span>", addClass(g, "ms_items_more_wrap_vector")), m = g.appendChild(ce("a", {
                                className: "ms_item_more",
                                innerHTML: '<span class="ms_item_more_label">' + _ + "</span>"
                            })), m.setAttribute("tabindex", 0), m.setAttribute("role", "button");
                            var b = ce("div", {
                                className: "ms_items_more_helper"
                            });
                            s = ce("div", {
                                className: "ms_items_more _more_items"
                            }), b.appendChild(s), m = g.appendChild(b), n.moreWrap = g
                        }
                        a(h, p, u, s, r)
                    })
                }
            });
        return a && n.setItems(a), browser.msie && (removeEvent(e, "MSPointerDown"), addEvent(e, "MSPointerDown", n.activate.pbind(!0))), removeEvent(e, "mouseover"), addEvent(e, "mouseover click", n.activate), i.global || cur.destroy.push(function() {
            removeEvent(e, "mouseover click", n.activate)
        }), i.forceToUp && addClass(geByClass1("ms_items_more_wrap", r), "to_up"), n.handlersToClean = d, n
    }
    var s, r = [];
    t = t || {};
    var d = t.mediaHandlers || {};
    each(i || [], function(a, i) {
        var o = i[0],
            n = i[1],
            l = i[2];
        if (n) {
            var c = !1,
                _ = t.toId || cur.postTo,
                h = {
                    to_id: _,
                    blockPersonal: t.blockPersonal
                };
            switch (h.mail_add = t.mail ? 1 : "", o) {
                case "graffiti":
                    c = showBox.pbind("al_wall.php", {
                        act: "canvas_draw_box",
                        to_id: _,
                        flash: browser.flash
                    }, {
                        cache: 1,
                        dark: 1
                    });
                    break;
                case "photos_list":
                    c = showBox.pbind("al_photos.php", extend(h, {
                        act: "choose_photo"
                    }), {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                    break;
                case "photo":
                    c = d.photo ? d.photo.pbind(t) : showBox.pbind("al_photos.php", extend(h, {
                        act: "choose_photo",
                        max_files: t.limit || 10
                    }), {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                    break;
                case "video":
                    var p = extend(h, {
                        act: "a_choose_video_box",
                        max_files: t.limit || 10
                    });
                    c = function() {
                        var a = domClosest("_submit_post_box", e),
                            i = hasClass(a, "anon_field_on");
                        i || showBox("al_video.php", p, {
                            cache: 1,
                            dark: 1
                        })
                    };
                    break;
                case "audio":
                    c = function() {
                        var a = domClosest("_submit_post_box", e),
                            i = hasClass(a, "anon_field_on");
                        i || stManager.add(["audio.js", "indexer.js", "auto_list.js", "grid_sorter.js", "audio.css"], function() {
                            var a = !1;
                            each(s.chosenMedias || [], function() {
                                "audio_playlist" == this[0] && (a = !0)
                            }), cur.audioAttachOriginalOwnerId = !1, cur.audioAttachSwitchOwnerId = !1;
                            var i = vk.id,
                                t = parseInt(("" + h.to_id || "").replace(/^board/, "-")),
                                o = domClosest("_submit_post_box", e),
                                r = domData(o, "from-oid") < 0;
                            r ? (i = t, cur.audioAttachOriginalOwnerId = t, cur.audioAttachSwitchOwnerId = vk.id) : cur.hasGroupAudioAccess && (cur.audioAttachOriginalOwnerId = vk.id, cur.audioAttachSwitchOwnerId = t), AudioPage.showAttachBox(i, {
                                canPlaylistAttach: !a && !cur.editor,
                                onAudioChoose: AudioUtils.onAudioChoose,
                                onPlaylistChoose: AudioUtils.onPlaylistChoose
                            })
                        })
                    };
                    break;
                case "poll":
                    c = function() {
                        s.chooseMedia("poll", "", l)
                    };
                    break;
                case "doc":
                    var u = t.docParams || {};
                    u = extend(u, {
                        act: "a_choose_doc_box"
                    }), c = d.doc ? d.doc.pbind(t) : showBox.pbind("docs.php", extend(h, u), {
                        stat: ["docs.css"]
                    });
                    break;
                case "map":
                    c = showBox.pbind("al_places.php", extend(h, {
                        act: "a_choose_place_box"
                    }), {
                        stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js", "boxes.css"],
                        width: 640,
                        bodyStyle: "padding: 0px;",
                        dark: 1
                    });
                    break;
                case "note":
                    c = showWiki.pbind({
                        note: "new"
                    }, !0, !1, {
                        queue: 1
                    });
                    break;
                case "postpone":
                    c = function() {
                        s.chooseMedia("postpone", n, l)
                    };
                    break;
                case "mark_as_ads":
                    c = function() {
                        s.chooseMedia("mark_as_ads", n, l)
                    };
                    break;
                case "share":
                    c = function() {
                        window.onShareChooseUrlBoxInit = function() {
                            var e = geByClass1("share_url_input", curBox().bodyNode);
                            addEvent(e, "keydown", function(e) {
                                return e.which == KEY.ENTER ? (a(curBox().btns.ok[0], e), !1) : void 0
                            })
                        };
                        var e = showBox("share.php", {
                                act: "choose_url_box"
                            }, {
                                dark: 1
                            }),
                            a = function(a, i) {
                                var t = geByClass1("share_url_input", e.bodyNode),
                                    o = val(t);
                                lockButton(a), disable(t, !0), hide("share_url_error"), s.chooseMedia("share", n, extend(l, {
                                    url: o,
                                    draft: !0,
                                    onSuccess: function() {
                                        disable(t, !1), unlockButton(a), e.hide()
                                    },
                                    onError: function(e) {
                                        var i = "";
                                        e && e !== getLang("global_unknown_error") && (i = e + " "), disable(t, !1), unlockButton(a), ge("share_url_error").innerHTML = i + getLang("global_share_link_failed"), show("share_url_error")
                                    }
                                }))
                            };
                        e.removeButtons(), e.addButton(getLang("global_continue"), a)
                    };
                    break;
                case "pretty_cards":
                    c = function(e) {
                        e && e.replace_owner_id && (l.editor.owner_id = e.replace_owner_id), s.chooseMedia("pretty_cards", n, l)
                    };
                    break;
                case "gift":
                    c = function() {
                        var e = t.peer < 2e9 ? t.peer : 0,
                            e = e || cur.peer;
                        t.giftBoxPrepare && t.giftBoxPrepare(e), showBox("al_gifts.php", {
                            act: "get_gift_box",
                            mid: e,
                            fr: e == vk.id ? 1 : 0
                        }, {
                            stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                            dark: 1
                        })
                    };
                    break;
                case "money":
                    c = function() {
                        var e = cur.peer;
                        _ > -2e9 && 0 > _ && (h.owner_id = _), showBox("al_payments.php", extend(h, {
                            act: "money_transfer_box",
                            to_id: e
                        }), {
                            onFail: function(e) {
                                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                            }
                        })
                    };
                    break;
                case "market":
                    _ == vk.id ? (c = showBox.pbind("al_market.php", extend(h, {
                        act: "a_choose_user_product_box"
                    }), {
                        cache: 1
                    }), l.tt_words && (cur.checkMessageHandler = function(e) {
                        if (!cur.marketIntroShown && (e = " " + e + " ", e.match(new RegExp("\\s(" + l.tt_words.join("|") + ")\\s", "i")))) {
                            var a = getSize(s.menu.moreWrap);
                            showTooltip(s.menu.moreWrap, {
                                text: l.tt_text,
                                dir: "left",
                                slideX: 15,
                                width: 230,
                                shift: [-a[0] - 5, -a[1] / 2],
                                hasover: 1
                            }), cur.marketIntroShown = !0
                        }
                    })) : c = showBox.pbind("al_market.php", extend(h, {
                        act: "a_choose_product_box"
                    }), {
                        cache: 1
                    });
                    break;
                case "article":
                    c = function() {
                        openArticleEditor(_)
                    }
            }
            r.push([o, n, c])
        }
    });
    var n = t.limit || 10,
        l = n > 1,
        c = t.editable && (!browser.msie || parseInt(browser.version) > 8),
        _ = t.sortable && (!browser.msie || parseInt(browser.version) > 8),
        h = o(e, r, {
            onActivate: function() {
                cur.attachCount = s.attachCount, cur.chooseMedia = s.chooseMedia, cur.hasChosenMedia = s.hasChosenMedia, cur.lastAddMedia = s, cur.onMediaUploadStarted = t.onMediaUploadStarted, cur.showMediaProgress = s.showMediaProgress, cur.unchooseMedia = s.unchooseMedia, cur.updateChosenMedia = s.updateChosenMedia
            },
            onItemClick: function(e) {
                return l && s.attachCount() >= n && "postpone" !== e && "mark_as_ads" !== e ? (vk.widget ? showBox("blank.php", {
                    code: 1900,
                    limit: n
                }) : showFastBox(getLang("global_error"), getLang("attachments_limit", n)), !1) : !0
            },
            hideAfterCount: t.hideAfterCount,
            topOffset: t.topOffset,
            forceUp: t.forceUp,
            global: t.global,
            maxShown: t.maxShown,
            forceToUp: t.forceToUp,
            vectorIcon: t.vectorIcon,
            ignoreMobile: t.ignoreMobile
        });
    if (h) {
        a = a || "media_preview";
        var p, u = h.id,
            m = ge(a);
        if (l) {
            m.innerHTML = '<div id="page_pics_preview' + u + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + u + '" class="page_pics_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + u + '" class="page_docs_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + u + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + u + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + u + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + u + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + u + '" class="page_progress_preview media_preview clear_fix"></div>';
            var g = domFC(m),
                v = domNS(g),
                w = domNS(v),
                b = domNS(w),
                f = domNS(b),
                k = domNS(f),
                C = domNS(k),
                p = domNS(C);
            removeClass(m, "media_preview"), addClass(m, "multi_media_preview")
        } else addClass(m, "med_no_attach"), show(m);
        return s = {
            _addMediaLink: e,
            lnkId: u,
            menu: h,
            types: r,
            phLists: {},
            handlers: {},
            chosenMedias: [],
            _showAddMedia: function() {
                h.show()
            },
            _hideAddMedia: function(e) {
                h.hide(e)
            },
            hasRestrictingAttach: function() {
                return geByClass1("medadd_c_market", w) || geByClass1("medadd_c_story", w)
            },
            updateChosenMedia: function(e, a, i) {
                s.chooseMedia(e, a, i, null, null, null, !0)
            },
            hasChosenMedia: function(e, a) {
                var i = !1;
                return each(s.chosenMedias, function() {
                    return this[0] === e && this[1] === a ? (i = !0, !1) : void 0
                }), i
            },
            chooseMedia: function(a, i, o, r, d, p, y) {
                if (!cur.articleEditorLayer || "article" == a) {
                    if (s.onChange && s.onChange(a, i, o, r) === !1) return void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), !1;
                    if ("note" == a && (cur.pbNoteAdded = !1), inArray(a, t.disabledTypes || [])) return !1;
                    if (s.attachCount() >= n && void 0 === o.upload_ind && "postpone" !== a && "mark_as_ads" !== a || s.hasRestrictingAttach()) {
                        if (l) return !1;
                        s.unchooseMedia()
                    }
                    var x = !1,
                        S = {},
                        P = null;
                    if (l && (each(s.chosenMedias, function(e) {
                            return P = e, this[0] == a && this[1] == i ? (x = !0, !1) : void(S[this[0]] = S[this[0]] ? S[this[0]] + 1 : 1)
                        }), x && !y || y && !x)) return !1;
                    var M, T, A = "",
                        I = "",
                        L = "",
                        N = !1,
                        B = w,
                        D = "";
                    switch (a) {
                        case "graffiti":
                            isObject(o) || (o = {
                                thumb: o || ""
                            }), A = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + o.thumb + '" /></div>', B = N = k;
                            break;
                        case "photos_list":
                            hide(this._addMediaLink), vkImage().src = o[1];
                            var U = o[3].replace(/^{|}$/g, "");
                            U && (U += ","), U += '"queue":1', M = t.nocl ? "" : " onclick=\"return showPhoto('" + o[4] + "', '" + o[2] + "', " + U.replace(/"/g, "&quot;") + ');"', A = "<div" + M + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + o[1] + '" /></div>', B = N = g;
                            break;
                        case "photo":
                            if (S.pretty_cards) return !1;
                            isObject(o) || (o = {
                                thumb_m: o[0] || "",
                                thumb_s: o[1] || "",
                                list: o[2] || "",
                                view_opts: o[3] || "",
                                upload_ind: o.upload_ind || void 0
                            }), vkImage().src = o.thumb_m;
                            var U = o.view_opts.replace(/^{|}$/g, "");
                            if (U && (U += ","), U += '"queue":1', s.phLists[i] = o.list, c) {
                                if (!o.editable) return !1;
                                t.nocl || (o.editable.click = s.showPhoto.pbind(i, o.list, parseJSON("{" + U + "}")))
                            }
                            M = t.nocl ? "" : ' onclick="return cur.addMedia[' + s.lnkId + "].showPhoto('" + i + "', '" + o.list + "', {" + U.replace(/"/g, "&quot;") + '});"', A = "<div " + M + ' class="fl_l page_preview_photo' + (p ? " page_preview_ph_graff" : "") + '"><img class="page_preview_photo" src="' + o.thumb_m + '" /></div>', N = 1, B = g;
                            break;
                        case "video":
                            if (S.pretty_cards) return !1;
                            if (isObject(o) || (o = {
                                    thumb: o || ""
                                }), c) {
                                if (!o.editable) return !1;
                                t.nocl || (o.editable.click = showVideo.pbind(i, o.list_id, {
                                    queue: 1,
                                    autoplay: 1
                                }))
                            }
                            M = t.nocl ? "" : " onclick=\"return showVideo('" + i + "', '" + o.list_id + "', {queue:1,autoplay:1});\"", A = "<div" + M + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + o.thumb + '" /></div>', N = 1, B = g, T = o.list_id;
                            break;
                        case "article":
                            if (S.article || S.share || S.page || S.pretty_cards || !o) return !1;
                            A = '<div class="medadd_h medadd_h_pretty_cards inl_bl">' + getLang("global_article") + "</div>", I = o.snippet_html, i = o.url, B = f;
                            break;
                        case "audio":
                            A = Page.addAudioPreview(i, o), D = ' id="pam' + u + "_audio" + i + '"';
                            break;
                        case "audio_playlist":
                            if (S.audio_playlist) return !1;
                            var E = o.coverUrl ? "background-image:url('" + o.coverUrl + "'); background-size: cover;" : "",
                                z = "";
                            z = o.authorHref ? '<a href="' + o.authorHref + '" onclick="return nav.go(this)">' + o.authorName + "</a>" : o.authorName;
                            var R = "'" + (o.accessHash || "") + "'";
                            I = '<div class="audio_pl_snippet_small audio_pl_snippet_no_list audio_pl_snippet _audio_pl _audio_pl_' + o.id + ' audio_pl_attach_preview clear_fix"><div class="audio_pl_attach_preview__play audio_pl_snippet_play_small" onclick="return getAudioPlayer().playPlaylist(' + o.ownerId + ", " + o.id + ", " + R + ')"></div><div class="audio_pl_snippet__cover" style="' + E + '">' + (o.gridCovers || "") + '</div><div class="audio_pl_snippet__info_title audio_pl__title">' + o.title + '</div><div class="audio_pl_snippet__info_author_line">' + z + "</div></div>", A = '<span class="medadd_h">' + getLang("global_audio_playlist") + "</span>", B = f;
                            break;
                        case "doc":
                            if (!o.lang) return !1;
                            o.thumb && o.thumb_s ? (A = "gif" == o.ext ? '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + o.href + '" class="pam_dpic"><div class="page_preview_doc_photo"><img src="' + o.thumb + '" align="center" /></div><div class="page_preview_doc_photo_hint doc_gif">' + o.title + "</div>" : '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + o.href + '" class="pam_dpic"><div class="page_preview_doc_photo"><img src="' + o.thumb + '" align="center" /></div><div class="page_preview_doc_photo_hint">' + o.title + "</div>", I = '</a><div class="pam_bg"></div>', B = N = v, D = ' id="pam' + u + "_doc" + i + '"') : (A = "", I = '<div class="page_doc_row"><a target="_blank" href="' + o.href + '" class="page_doc_icon page_doc_icon' + intval(o.type) + '"></a><a target="_blank" href="' + o.href + '" class="page_doc_title">' + o.title + '</a><div class="page_doc_description_row"><div class="page_doc_size">' + o.size_str + "</div></div></div>", D = ' id="pam' + u + "_doc" + i + '"');
                            break;
                        case "story":
                            A = '<div class="medadd_c_story"><a target="_blank" ' + o.attr + '"><div class="medadd_c_story_thumb fl_l" style="background-image:url(' + o.thumb + ')"></div></a><div class="medadd_c_story_info fl_l"><a class="medadd_c_story_title" target="_blank" ' + o.attr + '">' + o.title + '</a><div class="medadd_c_story_desc">' + o.date_string + "</div></div>", hide(e);
                            break;
                        case "mask":
                            A = '<div class="medadd_c_mask"><div class="medadd_c_story_thumb fl_l" style="background-image:url(/images/landings/vkmasks/masksSnippet_2x.png)"></div></a><div class="medadd_c_story_info fl_l"><div class="medadd_c_story_title">' + o.share.title + '</div><div class="medadd_c_story_desc">' + o.share.desc + "</div></div>";
                            break;
                        case "share":
                            if (S.share || S.page || S.pretty_cards || !o.lang) return !1;
                            if (isArray(o) && (o = {
                                    domain: o[0],
                                    url: o[1],
                                    initialPattern: o[2],
                                    title: o[3],
                                    description: o[4],
                                    images: [o[5]],
                                    user_id: o[6],
                                    photo_id: o[7]
                                }), o.draft) {
                                var F = {
                                    onSuccess: o.onSuccess,
                                    onError: o.onError
                                };
                                return s.checkURL(o.url, void 0, F), !1
                            }
                            if (!o.title && !(cur.options.share || {}).allow_preview_empty_links) return (o.onError || function() {})(), !1;
                            o.title = unclean((o.title || "").replace(/<br>/g, "\n")), o.description = unclean((o.description || "").replace(/<br>/g, "\n")), o.description_short = unclean((o.description_short || "").replace(/<br>/g, "\n")), o.description_narrow = unclean((o.description_narrow || "").replace(/<br>/g, "\n")), cur.options = cur.options || {}, cur.options.share && cur.options.share.max_title_len && (o.title = (o.title || "").substr(0, cur.options.share.max_title_len)), cur.options.share && cur.options.share.max_desc_len && (o.description = (o.description || "").substr(0, cur.options.share.max_desc_len), o.description_short = (o.description_short || "").substr(0, cur.options.share.max_desc_len), o.description_narrow = (o.description_narrow || "").substr(0, cur.options.share.max_desc_len)), o.media = o.media || i, o.lang && (cur.lang = extend(cur.lang || {}, o.lang)), A = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(o.url) + '" class="medadd_h medadd_h_link inl_bl">' + o.lang.profile_choose_link + "</a>", s.shareData = extend(s.shareData || {}, o, {
                                imagesStyles: [""]
                            }), B = f, (o.onSuccess || function() {})(), (cur.options.share || {}).button_exclusive && o.shareButtons && (hide(e), hide(geByClass1("signed_wrap", domPN(m)))), hide(domByClass(h.menuNode, "_type_share"));
                            break;
                        case "pretty_cards":
                            if (S.share || S.pretty_cards) return !1;
                            A = '<div class="medadd_h medadd_h_pretty_cards inl_bl">' + o.lang.global_wall_pretty_cards + "</div>", hide(geByClass1("signed_wrap", domPN(m))), hide(domByClass(h.menuNode, "_type_pretty_cards")), hide(e), B = f;
                            break;
                        case "poll":
                            if (!o.lang) return !1;
                            A = '<div class="medadd_h medadd_h_poll inl_bl">' + o.lang.q + "</div>", hide(domByClass(h.menuNode, "_type_poll")), B = b;
                            break;
                        case "map":
                            var q = 340,
                                H = 127;
                            A = "<div class=\"fl_l\"><a onclick=\"return showBox('al_places.php', {act: 'geo_box', lat: " + o[0] + ", long: " + o[1] + ", provider: " + intval(o[3]) + '}, {dark: 1});"><div class="page_media_map_point"></div><img class="page_preview_map" width="' + q + '" height="' + H + '" src="/maps?lat=' + o[0] + "&lng=" + o[1] + "&z=11&" + (window.devicePixelRatio >= 2, "w=" + 2 * q + "&h=" + 2 * H) + '" /></a></div>', B = N = k, hide(domByClass(h.menuNode, "_type_map"));
                            break;
                        case "page":
                            if (S.share || S.page || !o.lang) return !1;
                            var j = o.media.split("_");
                            A = '<a href="/page' + o.media + '" onclick="return showWiki({oid: ' + j[0] + ", id: " + j[1] + '}, false, event, {queue: 1})" class="medadd_h medadd_h_page inl_bl">' + o.lang.profile_choose_page + "</a>", B = f;
                            break;
                        case "album":
                            if (o.thumb.match(/^\/images\//) && (o.thumb = ""), c) {
                                if (!o.editable) return !1;
                                extend(o.editable, {
                                    title: o.title,
                                    size: o.count,
                                    click: t.nocl ? !1 : nav.change.pbind({
                                        z: "album" + i
                                    })
                                })
                            }
                            var O = o.thumb;
                            vkImage().src = O, M = t.nocl ? "" : ' href="/album' + i + '" onclick="return nav.change({z: \'album' + i + "'}, event)\"";
                            var W = "fl_l page_album_link" + (O ? "" : " page_album_nocover");
                            A = '<a class="' + W + '" ' + M + ">" + (O ? '<div class="page_album_thumb_wrap"><img class="page_album_thumb" src="' + O + '"/></div>' : "") + '  <div class="page_album_title">    <div class="page_album_size">' + o.count + '</div>    <div class="page_album_title_text">' + o.title + "</div>  </div></a>", N = 1, B = g;
                            break;
                        case "note":
                            if (!o.lang) return !1;
                            A = "<a onclick=\"showWiki({w: 'note" + o.raw + '\', edit: 1}, true, event, {queue: 1})" class="medadd_h medadd_h_note inl_bl">' + o.lang.profile_choose_note + "</a>", I = '<div class="medadd_c medadd_c_note"><a onclick="showWiki({w: \'note' + o.raw + '\', edit: 1}, true, event, {queue: 1})" id="share_note_title' + o.raw + '">' + o.title + "</a></div>", B = f;
                            break;
                        case "market":
                            A = '<div class="medadd_c_market"><a target="_blank" href="' + o.href + '"><img class="medadd_c_market_thumb fl_l" src="' + o.thumb + '" /></a><div class="medadd_c_market_info fl_l"><a class="medadd_c_market_title" target="_blank" href="' + o.href + '">' + o.title + '</a><div class="medadd_c_market_price">' + o.price + "</div></div>", hide(e);
                            break;
                        case "market_album":
                            if (c) {
                                if (!o.editable) return !1;
                                extend(o.editable, {
                                    title: o.title,
                                    msize: langNumeric(o.count, o.lang.profile_X_market_items),
                                    click: !1
                                })
                            }
                            var j = i.split("_");
                            vkImage().src = o.thumb, M = t.nocl ? "" : ' href="/market' + j[0] + "?section=album_" + j[1] + '"';
                            var W = "fl_l page_preview_album wall_album_cover_wrap wall_market_album_cover" + (o.thumb ? "" : " page_album_nocover");
                            A = '<a class="' + W + '" ' + M + ">" + (o.thumb ? '<img class="wall_album_cover" src="' + o.thumb + '"/>' : "") + '  <div class="wall_album_caption">    <div class="wall_album_title_wrap clear_fix">      <div class="wall_album_count fl_r">' + o.count + '</div>      <div class="wall_album_title">' + o.title + "</div>    </div>  </div></a>", N = 1, B = g;
                            break;
                        case "postpone":
                            if (A = '<div class="medadd_h medadd_h_timer inl_bl">' + o.lang.profile_choose_timer + '<span id="postpone_preview' + u + '"></span></div>', cur.editingPost && !l) i = intval(i), i ? o.date = i : o.date = intval(cur.editingPost[7]), ge("wpe_save").innerHTML = getLang("global_save");
                            else if (cur.editingPost && "wpe_media_preview" == domPN(C).id) {
                                i = intval(i), i ? o.date = i : o.date = intval(cur.editingPost[7]);
                                var V = geByClass1("medadd_c_timersett", C);
                                if (V) {
                                    var $ = domPN(V);
                                    V = $.innerHTML, re($)
                                } else V = "";
                                ge("wpe_save").innerHTML = getLang("global_save")
                            } else {
                                o.draft ? o.date = intval(i) : cur.postponedLastDate && (o.date = intval(cur.postponedLastDate) + 3600);
                                var K = ge("official"),
                                    G = gpeByClass("_submit_post_box", K);
                                if (K && G) {
                                    var Z = domData(G, "from-oid"),
                                        X = domData(G, "oid");
                                    Z == vk.id && X && wall.setReplyAsGroup(K, {
                                        from: X
                                    }), addClass(K, "disabled"), addClass("signed", "shown");
                                    var Y = window.data(K, "tt");
                                    if (Y && Y.rdBtns) {
                                        var J = Y.rdBtns[1],
                                            Q = Y.rdBtnsGroup,
                                            ee = domData(J, "as");
                                        radiobtn(J, ee, Q)
                                    }
                                }
                                var J = ge("send_post");
                                J && (J.innerHTML = o.lang.profile_wall_postpone_btn)
                            }
                            var ae = Math.round((new Date).getTime() / 1e3);
                            intval(o.date) < ae && (o.date = ae + 3600), hide(domByClass(h.menuNode, "_type_postpone")), B = C;
                            break;
                        case "mark_as_ads":
                            A = '<div class="medadd_h medadd_h_mark_as_ads inl_bl">' + o.lang.global_ads_wall_post_mark_as_ads_action + "</div>", hide(domByClass(h.menuNode, "_type_mark_as_ads")), B = C;
                            break;
                        case "wall":
                            A = '<div class="medadd_c_wall"><a target="_blank" href="' + o.href + '"><img class="medadd_c_wall_thumb fl_l" src="' + o.thumb + '" /></a><div class="medadd_c_wall_info fl_l"><a class="medadd_c_wall_author" target="_blank" href="' + o.href + '">' + o.author + '</a><div class="medadd_c_wall_type">' + o.lang.title + "</div></div>", D = ' id="pam' + u + "_wall" + i + '"', hide(e);
                            break;
                        case "wall_reply":
                            A = '<div class="medadd_c_wall"><a target="_blank" href="' + o.href + '"><img class="medadd_c_wall_thumb fl_l" src="' + o.thumb + '" /></a><div class="medadd_c_wall_info fl_l"><a class="medadd_c_wall_author" target="_blank" href="' + o.href + '">' + o.author + '</a><div class="medadd_c_wall_type">' + o.lang.title + "</div></div>", D = ' id="pam' + u + "_wall_reply" + i + '"', hide(e)
                    }
                    if (l) {
                        var ie = s.chosenMedias,
                            te = x ? P : ie.length,
                            oe = "";
                        oe = c && 1 === N ? !1 : "photos_list" == a ? se('<div class="page_preview_' + a + "_wrap" + L + '" style="position: relative">' + A + '<div class="page_photos_count">' + i.split(",").length + "</div></div>") : se('<div class="page_preview_' + a + "_wrap" + L + '"' + (t.nocl ? ' style="cursor: default"' : "") + D + ">" + A + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" aria-label="' + getLang("dont_attach") + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + te + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + I + "</div>"), addClass(oe, N ? "fl_l" : "clear_fix"), void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), t.toggleLnk && !x && toggle(e, s.attachCount() + 1 < n), c && 1 === N ? (addClass(B, "editable_thumbs_wrap"), B = domLC(B) && hasClass(domLC(B), "editable_thumbs") ? domLC(B) : B.appendChild(ce("div", {
                            id: "thumbs_edit" + u,
                            className: "editable_thumbs"
                        })), stManager.add(["thumbs_edit.css", "thumbs_edit.js"], function() {
                            if (ie[te] && (ie[te].type === a || ie[te].media !== i)) {
                                t.toggleLnk && !x && toggle(e, s.attachCount() + 1 < n), o.editable.remove = s.unchooseMedia.pbind(te), show(domPN(B));
                                var r = ThumbsEdit.convert(a, i, o.editable);
                                domFC(B) ? x ? ThumbsEdit.updateMedia(B, a, i, o) : ThumbsEdit.addMedia(B, r) : t.teWidth && t.teHeight ? ThumbsEdit.init(B, [r], {
                                    width: t.teWidth,
                                    height: t.teHeight,
                                    force: !0,
                                    onMove: t.onAddMediaChange,
                                    onUpdate: t.onChangedSize
                                }) : ThumbsEdit.init(B, [r], {
                                    onMove: t.onAddMediaChange,
                                    force: !0,
                                    onUpdate: t.onChangedSize
                                }), toggleClass(m, "media_preview_has_medias", s.hasVisibleRows() && (isVisible(e) || isVisible(geByClass1("signed_wrap", domPN(m))))), t.onChangedSize && t.onChangedSize()
                            }
                        }, !0)) : (show(B), x ? B.replaceChild(oe, ie[P][2]) : B.appendChild(oe), _ && (B == w ? stManager.add(["sorter.js"], function() {
                            var e = getXY(w),
                                a = getSize(w),
                                i = function() {
                                    w.sorter ? sorter.added(w) : B.childNodes.length > 1 && sorter.init(w, {
                                        onReorder: t.onAddMediaChange
                                    })
                                };
                            e[0] || e[1] || a[0] || a[1] ? i() : cur.sorterClbk = i, t.onChangedSize && t.onChangedSize()
                        }, !0) : B == v && stManager.add(["qsorter.js"], function() {
                            v.qsorter ? qsorter.added(v) : B.childNodes.length > 1 && qsorter.init(v, s.qsorterOpts()), t.onChangedSize && t.onChangedSize()
                        }, !0)), t.onChangedSize && t.onChangedSize()), x ? ie[P] = [a, i, oe, r, T] : ie.push([a, i, oe, r, T])
                    } else {
                        var te = 0;
                        "postpone" === a ? te = 1 : "mark_as_ads" === a && (te = 2);
                        var oe = se('<div class="' + (N === !1 ? "page_docs_preview" : "page_pics_preview") + (te ? "" : " post_thumbed_media") + '"><div class="page_preview_' + a + '_wrap"' + (t.nocl ? ' style="cursor: default"' : "") + D + ">" + A + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" aria-label="' + getLang("dont_attach") + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + te + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + I + "</div></div>");
                        addClass(oe, N ? "fl_l" : "clear_fix"), void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), "postpone" !== a && "mark_as_ads" !== a && (s.chosenMedia = [a, i], s.chosenMediaData = o), s.singleAdded(oe, a)
                    }
                    "share" == a ? !o.title || r || o.url ? o.video ? s.showVideoSnippetPreview() : s.showExternalPreview() : (cur.shareShowImg = 0, s.showPreview(!0), s.shareData.images = !1) : "page" == a ? o.nopreview || (cur.shareShowImg = 0, s.shareData = extend(s.shareData || {}, o, {
                        images: !1
                    }), s.showPreview()) : "poll" == a ? s.createPoll(o) : "postpone" == a ? s.setupPostpone(o, V) : "mark_as_ads" == a ? s.markAsAds = 1 : "pretty_cards" == a && s.createPrettyCards(o), toggleClass(m, "media_preview_has_medias", s.hasVisibleRows() && (isVisible(e) || isVisible(geByClass1("signed_wrap", domPN(m))))), t.onChangedSize && t.onChangedSize();
                    var de = window.event;
                    return de && "click" == de.type && (de.ctrlKey || de.metaKey || de.shiftKey) && s.attachCount() + 1 <= n && (d = !0), cur.fileApiUploadStarted && void 0 !== o.upload_ind || cur.preventBoxHide || d === !0 || inArray(a, ["poll", "share", "page", "postpone", "mark_as_ads", "pretty_cards"]) || boxQueue.hideLast(), cur.lastPostMsg = !1, t.onMediaAdd && t.onMediaAdd(), getAudioPlayer().updateCurrentPlaying(), cur.onMediaChanged && cur.onMediaChanged(s.chosenMedias), void 0 !== o.upload_ind && delete o.upload_ind, !1
                }
            },
            unchooseMedia: function(a, i) {
                if (s.onChange && s.onChange(!1, a) === !1) return !1;
                if (l) {
                    if (cur.checkURLDomainRequest && cur.checkURLDomainRequest.abort(), clearTimeout(cur.showLoaderTimeout), clearInterval(cur.shareImgInterval), clearTimeout(cur.shareImgInterval2), clearTimeout(cur.imgLoadTimeout), clearTimeout(cur.checkURLDomainTO), void 0 === a) {
                        if (window.ThumbsEdit && ThumbsEdit.removeAll("thumbs_edit" + u), each(s.chosenMedias, function(e, a) {
                                a && void 0 !== e && (i ? inArray(a[0], i) : !0) && s.unchooseMedia(e)
                            }), s.urlsCancelled = [], t.onChangedSize) {
                            t.onChangedSize();
                            var o = setInterval(t.onChangedSize, 50);
                            setTimeout(clearTimeout.bind(null, o), 500)
                        }
                        return
                    }
                    var r, d = s.chosenMedias;
                    if (d[a]) {
                        switch (d[a][2] ? ((r = geByClass1("page_media_x_wrap", d[a][2], "div")) && r.tt && r.tt.el && r.tt.destroy(), domPN(d[a][2]) == w && w.sorter ? (each(w.sorter.elems, function() {
                            setStyle(this, {
                                top: "auto",
                                left: "auto",
                                cursor: "auto"
                            })
                        }), w.sorter.destroy(), re(d[a][2]), w.childNodes.length > 1 && sorter.init(w, {
                            onReorder: t.onAddMediaChange
                        })) : domPN(d[a][2]) == v && v.qsorter ? (each(v.qsorter.elems, function() {
                            setStyle(domFC(this), {
                                top: "auto",
                                left: "auto"
                            }), setStyle(this, {
                                cursor: "auto"
                            })
                        }), v.qsorter.destroy(), re(d[a][2]), v.childNodes.length > 1 && qsorter.init(v, s.qsorterOpts())) : re(d[a][2])) : ("photo" == d[a][0] || "video" == d[a][0] || "album" == d[a][0]) && window.ThumbsEdit && ThumbsEdit.removeById("thumbs_edit" + u, d[a][0] + d[a][1]), d[a][0]) {
                            case "page":
                            case "share":
                                s.shareData = {}, re(s.sharePreview), hide("medadd_c_linkimg_loader"), delete s.sharePreview, show(domByClass(h.menuNode, "_type_share")), show(e), show(geByClass1("signed_wrap", domPN(m)));
                                break;
                            case "pretty_cards":
                                re(s.prettyCardGallery.el), delete s.prettyCardGallery, show(geByClass1("signed_wrap", domPN(m))), show(domByClass(h.menuNode, "_type_pretty_cards")), show(e);
                                break;
                            case "poll":
                                re(s.pollPreview), s.pollPreview = !1, show(domByClass(h.menuNode, "_type_poll"));
                                break;
                            case "map":
                                show(domByClass(h.menuNode, "_type_map"));
                                break;
                            case "market":
                            case "wall":
                            case "wall_reply":
                                show(e);
                                break;
                            case "story":
                                show(e);
                                break;
                            case "postpone":
                                var _ = geByClass1("medadd_c_timersett", s.postponePreview);
                                cur.editingPost && _ ? re(domFC(s.postponePreview)) : re(s.postponePreview), s.postponePreview = !1, removeClass("official", "disabled"), cur.editingPost ? ge("wpe_save").innerHTML = getLang("wall_publish_now") : ge("send_post").innerHTML = getLang("wall_send"), show(domByClass(h.menuNode, "_type_postpone"));
                                break;
                            case "mark_as_ads":
                                show(domByClass(h.menuNode, "_type_mark_as_ads")), s.markAsAds = !1
                        }
                        d[a] = !1
                    }
                    t.toggleLnk && toggle(e, s.attachCount() < n), toggle(g, !!(c ? geByClass1("thumb_wrap", g) : domFC(g))), toggle(v, !!domFC(v)), toggle(w, !!domFC(w)), toggle(b, !!domFC(b)), toggle(f, !!domFC(f)), toggle(k, !!domFC(k)), toggle(C, !!domFC(C)), toggle(p, !!domFC(p))
                } else {
                    var y, r;
                    if (void 0 == a && (a = 0), (r = geByClass("page_media_x_wrap", m, "div")[a]) && r.tt && r.tt.el && r.tt.destroy(), 1 == a && s.postponePreview) {
                        show(geByClass1("add_media_type_" + u + "_postpone", h.menuNode, "a"));
                        var x = domPN(s.postponePreview);
                        window.tooltips && tooltips.destroyAll(x), re(x), s.postponePreview = !1;
                        var S = h.lastTypes;
                        each(h.types, function(e, a) {
                            "postpone" === a[0] && S.push(a)
                        }), h.setItems(S)
                    } else if (2 == a && s.markAsAds) {
                        s.markAsAds = !1;
                        var P = geByClass1("page_preview_mark_as_ads_wrap", m);
                        window.tooltips && P && tooltips.destroyAll(P), re(P);
                        var S = h.lastTypes;
                        each(h.types, function(e, a) {
                            "mark_as_ads" === a[0] && S.push(a)
                        }), h.setItems(S)
                    } else {
                        if (s.postponePreview || s.markAsAds) {
                            for (var x = s.postponePreview && domPN(s.postponePreview), P = s.markAsAds && domPN(geByClass1("page_preview_mark_as_ads_wrap", m)), M = [], T = 0; T < m.childNodes.length; T++) {
                                var A = m.childNodes[T];
                                "DIV" == A.nodeName && A != x && A != P && M.push(A)
                            }
                            each(M, function(e, a) {
                                re(a)
                            });
                            var S = [];
                            each(h.types, function(e, a) {
                                "postpone" === a[0] && s.postponePreview || "mark_as_ads" === a[0] && s.markAsAds || S.push(a)
                            }), h.setItems(S)
                        } else val(m, ""), addClass(m, "med_no_attach"), h.setItems(h.types);
                        s.chosenMedia && (s.chosenMedia = !1, s.chosenMediaData = !1), (y = s.shareData) && (y.url && s.urlsCancelled.push(y.url), y.initialPattern && s.urlsCancelled.push(y.initialPattern), s.shareData = {}), each([s.sharePreview, s.pollPreview], function() {
                            re(this)
                        }), s.sharePreview = s.pollPreview = !1
                    }
                    t.toggleLnk && show(e)
                }
                if (toggleClass(m, "media_preview_has_medias", s.hasVisibleRows() && (isVisible(e) || isVisible(geByClass1("signed_wrap", domPN(m))))), cur.onMediaChanged && cur.onMediaChanged(d), cur.lastPostMsg = !1, s.onChange && s.onChange(!1), t.onChangedSize) {
                    t.onChangedSize();
                    var o = setInterval(t.onChangedSize, 50);
                    setTimeout(clearTimeout.bind(null, o), 500)
                }
            },
            singleAdded: function(a, i) {
                "postpone" === i ? m.appendChild(a) : "mark_as_ads" === i ? s.postponePreview ? m.insertBefore(a, domLC(m)) : m.appendChild(a) : domFC(m) ? m.insertBefore(a, domFC(m)) : m.appendChild(a), removeClass(m, "med_no_attach");
                var o = [];
                each(h.lastTypes, function(e, a) {
                    ("postpone" !== a[0] || !s.postponePreview && "postpone" !== i) && ("mark_as_ads" !== a[0] || !s.markAsAds && "mark_as_ads" !== i) && (inArray(i, ["postpone", "mark_as_ads"]) || inArray(a[0], ["postpone", "mark_as_ads"])) && o.push(a)
                }), h.setItems(o), t.toggleLnk && !o.length && hide(e)
            },
            getMedias: function() {
                if (l) {
                    var e = window.ThumbsEdit ? ThumbsEdit.getMedias("thumbs_edit" + u) : [],
                        a = {},
                        i = s.chosenMedias || [],
                        t = [],
                        o = function(e, i, o) {
                            return o[0] + o[1] == e ? (t.push(o), a[e] = !0, !1) : void 0
                        };
                    return each(e, function(e, a) {
                        each(i, o.pbind(a[0] + a[1]))
                    }), each(v.childNodes, function(e, a) {
                        var t = (a.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                        t && each(i, o.pbind(t[1] + t[2]))
                    }), each(w.childNodes, function(e, a) {
                        var t = (a.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                        t && each(i, o.pbind(t[1] + t[2]))
                    }), each(i, function(e, i) {
                        i && isArray(i) && i.length && !a[i[0] + i[1]] && t.push(i)
                    }), t
                }
                var i = s.chosenMedia;
                return i ? [i[0] + i[1]] : []
            },
            showPhoto: function(e, a, i, t) {
                !cur.pvData || cur.pvShown && cur.pvListId == a || delete cur.pvData[a];
                for (var o in ajaxCache) o.toString().match(/^\/al_photos\.php\#act=show&draft_photos/) && delete ajaxCache[o];
                var r = s.getMedias(),
                    d = [];
                return each(r, function(e, a) {
                        a && "photo" == a[0] && d.push(a[1] + "/" + (s.phLists[a[1]] || ""))
                    }), i.additional = {}, i.additional.open_pe = intval(cur.openEditor), cur.openEditor || (i.additional.draft_photos = d.join(";")),
                    delete cur.openEditor, showPhoto(e, a, extend(i, {
                        queue: 1
                    }), t)
            },
            showMediaProgress: function(a, i, o) {
                if (s.onProgress && s.onProgress(a, i, o) === !1) return !1;
                var r = o.loaded / o.total,
                    d = intval(100 * r),
                    c = (o.fileName || o.name || "").replace(/[&<>"']/g, ""),
                    _ = c ? i + "_" + c : i,
                    h = c ? c.length > 33 ? c.substr(0, 30) + "..." : c : "",
                    m = ge("upload" + _ + "_progress");
                if (m) {
                    show(m);
                    var g = geByClass1("ui_progress_bar", m);
                    setStyle(g, {
                        width: d + "%"
                    })
                } else {
                    cur.attachMediaIndexes || (cur.attachMediaIndexes = {}), cur.attachMediaIndexes[_] = u;
                    var v = h ? '<div class="attach_label fl_l">' + h + "</div>" : "",
                        w = '          <div class="fl_l">             <div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">               <div id="upload' + _ + '_progress" class="page_attach_progress ui_progress">                 <div class="ui_progress_back"></div>                 <div class="ui_progress_bar"></div>               </div>             </div>           </div>' + v + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [16, 8, 8], black: 1})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ", '" + (c || i) + "', this);\"></div>";
                    if (l) p.appendChild(ce("div", {
                        id: "upload" + _ + "_progress_wrap",
                        innerHTML: w,
                        className: "clear_fix upload_" + i + "_progress"
                    }, {
                        marginTop: "6px"
                    })), show(p), t.toggleLnk && toggle(e, s.attachCount() < n);
                    else {
                        var b = ce("div", {
                            id: "upload" + _ + "_progress_wrap",
                            innerHTML: w,
                            className: "clear_fix upload_" + i + "_progress"
                        });
                        s.chosenMedia = "progress", s.singleAdded(b, "progress")
                    }
                    t.onChangedSize && t.onChangedSize(), m = ge("upload" + _ + "_progress");
                    var g = geByClass1("ui_progress_bar", m);
                    d ? setStyle(g, {
                        width: d + "%"
                    }) : (setStyle(g, {
                        width: "1px"
                    }), hide(m))
                }
            },
            hasVisibleRows: function() {
                var e = !1;
                return each(geByClass("media_preview", m), function() {
                    return isVisible(this) ? (e = !0, !1) : void 0
                }), e
            },
            attachCount: function() {
                if (s.attachedCount) return s.attachedCount();
                if (!m) return 0;
                if (!l) return m.childNodes.length - (s.postponePreview ? 1 : 0) - (s.markAsAds ? 1 : 0);
                var e = (c && window.ThumbsEdit ? (ThumbsEdit.cache()["thumbs_edit" + u] || {}).previews || [] : g.childNodes).length + v.childNodes.length + k.childNodes.length + w.childNodes.length / (w.sorter ? 2 : 1) + p.childNodes.length;
                return s.sharePreview && ++e, s.pollPreview && ++e, e
            },
            createPoll: function(e) {
                var a, i = e.question ? "" : "1px",
                    o = [];
                e[22] ? "disabled" : "", e[8] ? "" : "disabled";
                s.pollPreview = b.appendChild(ce("div", {
                    className: "medadd_c medadd_c_poll",
                    innerHTML: '<input onkeydown="cur.addMedia[' + u + '].keyPoll(this, event)" class="text dark medadd_c_pollq" id="create_poll_question' + u + '" value="' + (e.question || "") + '" /><div class="medadd_c_pollh">' + e.lang.a + '</div><div class="medadd_c_pollans" id="create_poll_answers' + u + '"></div><div class="medadd_c_polladd_wr" id="create_poll_add' + u + '">  <div class="medadd_c_polladd fakeinput dark" onclick="cur.addMedia[' + u + '].incPoll()">' + e.lang.i + "</div></div>" + (e.edit ? "" : '<div class="checkbox medadd_c_pollcb' + (e.anon ? " on" : "") + '" id="create_poll_anonymous' + u + '" onclick="checkbox(this);cur.addMedia[' + u + '].changedPoll();">' + e.lang.c + "</div>") + (e.pollSettings || "")
                })), e.answers || (e.answers = [
                    [0, ""],
                    [0, ""]
                ]), cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text dark medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem" data-title="' + e.lang.d + '" aria-label="' + e.lang.d + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
                for (var r = 0, d = e.answers.length; d > r; ++r) a = e.answers[r], o.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
                    attrs: (a[0] ? 'id="create_poll_ans' + a[0] + '" ' : "") + (a[1] ? '" value="' + a[1] + '" ' : ""),
                    lnkid: u
                }) + "</div>"), r == (t.pollLimit || 10) - 1 && hide("create_poll_add" + u);
                return val("create_poll_answers" + u, o.join("")), e.question ? void elfocus("create_poll_question" + u) : (s.pollPreview.style.height = i, void animate(s.pollPreview, {
                    height: 166
                }, 200, function() {
                    s.pollPreview.style.height = "auto", elfocus("create_poll_question" + u)
                }))
            },
            incPoll: function() {
                var e = ge("create_poll_answers" + u),
                    a = e.childNodes.length,
                    i = t.pollLimit || 10;
                i > a && elfocus(geByTag1("input", e.appendChild(ce("div", {
                    className: "medadd_c_polla_wr",
                    innerHTML: rs(cur.pollAnswerTemplate, {
                        attrs: "",
                        lnkid: u
                    })
                })))), toggle("create_poll_add" + u, i - 1 > a)
            },
            decPoll: function(e) {
                e.tt && e.tt.el && e.tt.destroy(), re(domPN(e)), show("create_poll_add" + u)
            },
            keyPoll: function(e, a) {
                if (a = a || window.event, a && (10 == a.keyCode || 13 == a.keyCode || 9 == a.keyCode)) {
                    var i = hasClass(e, "medadd_c_pollq"),
                        t = a.shiftKey;
                    if (t && i) return;
                    var o = i ? domFC(domNS(domNS(e))) : (t ? domPS : domNS)(domPN(e));
                    return o ? elfocus(geByTag1("input", o)) : t ? elfocus(geByClass1("medadd_c_pollq", domPN(domPN(domPN(e))))) : this.incPoll(), cancelEvent(a)
                }
                s.changedPoll()
            },
            changedPoll: function() {
                t.onMediaChange && t.onMediaChange()
            },
            pollData: function(e) {
                for (var a, i = ge("create_poll_answers" + u), t = trim(val("create_poll_question" + u)), o = {
                        media: t,
                        anonymous: isChecked("create_poll_anonymous" + u)
                    }, s = 0, r = !1, d = domFC(i); d; d = domNS(d))
                    if (a = trim(val(domFC(d)))) {
                        var n = -intval((domFC(d).id.match(/^create_poll_ans(\d+)$/) || [0, -s++])[1]);
                        o["answers[" + n + "]"] = a, r = !0
                    }
                return t ? r ? o : (domFC(i) || cur.addMedia[u].incPoll(), e !== !0 && notaBene(domFC(domFC(i))), !1) : (e !== !0 && notaBene("create_poll_question" + u), !1)
            },
            urlsCancelled: [],
            shareData: {},
            checkMessageURLs: function(e, a, i) {
                if (!(cur.noCheckMessageURLs || s.chosenMedia || s.urlAttachmentLoading && s.urlAttachmentLoading[0] > vkNow() - 1e4 || s.attachCount() >= n)) {
                    if (cur.checkMessageHandler && isFunction(cur.checkMessageHandler) && cur.checkMessageHandler(e), cur.reply_to && cur.reply_to[0]) {
                        var t = Wall.getReplyName(cur.reply_to[0]);
                        if (t && isArray(t) && t[1] && (t = t[1]), t) {
                            var o = extractUrls(t, a);
                            for (var r in o) {
                                var d = o[r].url;
                                d.match(/^https?:\/\//) || (d = "http://" + d), inArray(d, s.urlsCancelled) || s.urlsCancelled.push(d)
                            }
                        }
                    }
                    var l = extractUrls(e, a);
                    for (var r in l) {
                        var c = l[r],
                            d = c.url,
                            _ = c.query,
                            h = c.domain,
                            p = d;
                        if (d.match(/^https?:\/\//) || (d = "http://" + d), !inArray(d, s.urlsCancelled) && !inArray(p, s.urlsCancelled)) {
                            var u = !0;
                            if (h.match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/i) && (u = _.match(/(#photo|^\/(photo|video|album|page|audio|doc|mask)|z=(album|photo|video|audio_playlist)|w=(page|product))(-?\d+_)?\d+|app\d+(?:_-\d+)?|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|\?w\=story(\d+)_(\d+)$|stor(y|ies)(\d+)_(\d+)$|^(\/dev)?\/blog\/.+$|^\/jobs\?w=job\d+$|^\/landings\/.+$|\?w\=vk10\_years(\d+)$|^\/messenger$|^\/bestgames2016$|^\/bestgames2017$|^\/ads(\/([a-zA-Z0-9\_]+))?$|^http:\/\/instagram\.com\/p\/.+/) ? !0 : !1, u = u || _.match(/^\/@[._a-zA-Z0-9-]+$/), !u && _.match(/[a-zA-Z0-9_\.-]{2,32}/))) return void s.checkURLDomain(_, p, i);
                            if (u) return void s.checkURL(p, i)
                        }
                    }
                }
            },
            checkURLDomain: function(e, a, i) {
                cur.checkURLDomainTO && clearTimeout(cur.checkURLDomainTO), cur.checkURLDomainTO = setTimeout(function(e, a, i) {
                    cur.checkURLDomainRequest = ajax.post("apps", {
                        act: "a_aid_by_link",
                        url: e
                    }, {
                        onDone: function(e, t) {
                            e && !t && s.checkURL(a, i)
                        },
                        onFail: function() {
                            return !0
                        }
                    })
                }.pbind(e, a, i), 100)
            },
            clearCheckURL: function() {
                clearTimeout(cur.checkURLTO), re(s.urlAttachmentLoading[2]), l ? toggle(p, p.childNodes > 0) : toggleClass(m, "med_no_attach", !m.childNodes), s.urlAttachmentLoading = !1, setStyle(bodyNode, {
                    cursor: "default"
                })
            },
            onCheckURLDone: function(e, a, i) {
                var o = "";
                a = a || {}, s.urlAttachmentLoading && (o = s.urlAttachmentLoading[1], s.clearCheckURL()), e ? s.chooseMedia(i[0], i[1], extend({}, i[2], a), o, !0) : ((t.onCheckURLDone || function() {})(e, i), (a.onError || function() {})(i))
            },
            cancelCheckUrl: function() {
                re(s.checkURLForm)
            },
            checkURL: function(e, a, i) {
                if (i = i || {}, !e) return void(i.onError || function() {})();
                s.urlsCancelled.push(e), s.urlAttachmentLoading = [vkNow(), e], re(s.checkURLForm), s.checkURLForm = ce("div", {
                    innerHTML: '<iframe name="share_parse_iframe' + u + '"></iframe>'
                }), utilsNode.appendChild(s.checkURLForm);
                var o = s.checkURLForm.appendChild(ce("form", {
                    action: "share.php?act=url_attachment",
                    method: "post",
                    target: "share_parse_iframe" + u
                }));
                each({
                    hash: cur.share_timehash || ((cur.options || {}).share || {}).timehash || "",
                    allowed_share_buttons: ((cur.options || {}).share || {}).allowed_buttons || "",
                    index: u,
                    url: e,
                    to_mail: t.mail ? 1 : ""
                }, function(e, a) {
                    o.appendChild(ce("input", {
                        type: "hidden",
                        name: e,
                        value: a
                    }))
                }), setStyle(bodyNode, {
                    cursor: "wait"
                }), window.onUploadDone = s.onCheckURLDone.pbind(!0, i), window.onUploadFail = s.onCheckURLDone.pbind(!1, i), a && (cur.checkURLTO = setTimeout(function() {
                    s.urlAttachmentLoading.length > 0 && s.clearCheckURL()
                }, a)), o.submit()
            },
            addPreview: function(e) {
                return s.sharePreview = f.appendChild(ce("div", {
                    className: "medadd_c medadd_c_link",
                    innerHTML: '<div class="medadd_c_linkcon"><div></div>' + (e ? '<div class="medadd_c_linkprg">' + getProgressHtml("", "medadd_c_linkprg_inner") + "</div>" : "") + "</div>"
                }))
            },
            shareImgUrl: function(e) {
                var a = s.shareData;
                if (isArray(a.preview_images) && a.preview_images[e]) return a.preview_images[e];
                if (a.images_proxy && a.images_proxy[e]) return a.images_proxy_url + a.images_proxy[e];
                if (a.images) {
                    var i = a.images[e];
                    return isArray(i) && (i = i[0] ? i[0] : ""), i
                }
                return ""
            },
            showPreview: function(e) {
                function i() {
                    var e = l.video,
                        a = l.video_owner_id + "_" + l.video_id,
                        i = ThumbsEdit.convert("video", a, e.editable),
                        o = {
                            wide: !!t.wide
                        },
                        s = t.teWidth,
                        r = t.teHeight;
                    s && r ? o.force = !0 : (s = c.offsetWidth, r = .666 * s);
                    var d = ThumbsEdit.processThumbs(s, r, [i], t),
                        n = d.thumbs[0];
                    return n.vid = l.video_id, n
                }

                function o() {
                    var e = (l.video, l.video_owner_id + "_" + l.video_id),
                        a = l.list_id,
                        t = i(),
                        o = {
                            width: intval(t.width),
                            height: intval(t.height)
                        },
                        s = extend({
                            margin: "0 auto"
                        }, o),
                        r = ce("div", {
                            className: "thumb_wrap" + (t.lastColumn ? " last_column" : "") + (t.lastRow ? " last_row" : "") + (t.msize ? " thumb_market_album_wrap" : "") + " thumb_video_wrap"
                        }, s),
                        d = ce("img", {
                            className: "preview"
                        }),
                        n = ce("div", {
                            className: "overlay"
                        }),
                        c = (ce("div", {
                            className: "ui_thumb_x_button",
                            innerHTML: '<div class="ui_thumb_x"></div>'
                        }), ce("div", {
                            className: "draggable_thumb clear_fix"
                        }, o));
                    t.name && r.setAttribute("aria-label", t.name);
                    var _ = showVideo.pbind(e, a, {
                        queue: 1,
                        autoplay: 1
                    });
                    addEvent(c, "click", function(e) {
                        _()
                    });
                    var h = t.old_image ? t.old_image : t.image,
                        p = ThumbsEdit.crop(t, t.width, t.height);
                    extend(d, {
                        width: p.width,
                        height: p.height
                    }), setStyle(d, {
                        marginLeft: p.marginLeft,
                        marginTop: p.marginTop
                    }), d.src = h.src, t.old_image && ThumbsEdit.loadAndDisplayImage(d, t), c.appendChild(d), c.appendChild(n), r.appendChild(c);
                    var u = t.orig.duration,
                        m = intval(t.width) >= 250 ? t.orig.platform || "" : "",
                        g = t.orig.play_icon,
                        v = "";
                    if (t.orig.active_live ? (u = '<span class="video_thumb_label_live_icon"></span>', v += " _live") : (g && (intval(t.width) >= 250 ? c.appendChild(ce("div", {
                            className: "page_post_video_play_inline"
                        })) : v += " _has_play_icon"), u || (v += " _no_duration")), u || m || g) {
                        var w = ce("div", {
                            className: "video_thumb_label " + v,
                            innerHTML: '<span class="video_thumb_label_item">' + m + '</span><span class="video_thumb_label_item">' + u + "</span></div>"
                        });
                        c.appendChild(w)
                    }
                    return r
                }

                function r(e) {
                    if (!e || e.inlineEdit) return !1;
                    var a = getSize(e),
                        i = gpeByClass("medadd_inline_editable", e);
                    e.inlineEdit = !0, addClass(i, "medadd_inline_editing");
                    var t = ce("textarea", {
                            className: "medadd_inline_edit"
                        }, {
                            width: a[0],
                            height: a[1]
                        }),
                        o = parseInt(e.getAttribute("data-max-length"));
                    o && t.setAttribute("maxlength", o);
                    var r = e.getAttribute("data-field");
                    val(t, s.shareData[r]), val(e, ""), e.appendChild(t);
                    var d = ce("span", {
                        className: "medadd_inline_edit_target"
                    }, {
                        opacity: 0,
                        zIndex: -1,
                        width: a[0],
                        height: "auto",
                        wordWrap: "break-all",
                        position: "absolute"
                    });
                    i.appendChild(d);
                    var n = a[1];
                    elfocus(t), t.onblur = function() {
                        re(d), s.shareData[r] = val(t), val(e, clean(val(t)).replace(/\n/g, "<br>") || M[r].placeholder), removeClass(i, "medadd_inline_editing"), e.inlineEdit = !1
                    };
                    var l = function() {
                        var e = clean(val(t) + " M").replace(/\n/g, "<br>");
                        if (val(d, e), !(e.length >= o)) {
                            var a = getSize(d);
                            n != a[1] && (n = a[1], animate(t, {
                                height: a[1]
                            }, 200))
                        }
                    };
                    addEvent(t, "click keyup change", l), setTimeout(l, 0)
                }
                var d, n, l = s.shareData,
                    c = s.sharePreview || s.addPreview();
                l.images && (d = l.images[cur.shareShowImg], n = !(!s.bigLink && !l.big_link));
                var _ = !(!cur.options.share || !cur.options.share.allow_snippet_video),
                    h = l.video && _;
                if (l.failed) var p = getLang("page_not_loaded");
                else {
                    var u = "",
                        m = clean(s.shareImgUrl(cur.shareShowImg));
                    _ && (cur.selectSnippetVideo = function() {
                        var e = {
                            to_id: t.toId || cur.postTo,
                            act: "a_choose_video_box",
                            snippet_video: 1
                        };
                        showBox("al_video.php", e, {
                            cache: 1,
                            dark: 1
                        })
                    }, cur.chooseSnippetVideo = function(e, a) {
                        var i = s.shareData,
                            t = e.split("_");
                        i.video_owner_id = t[0], i.video_id = t[1], i.video = a, s.showVideoSnippetPreview()
                    });
                    var g;
                    if (h) g = o(), u = '<div id="snippet_video_preview_wrap" style="position: relative; overflow: hidden; background: #000;"></div>', n = !0;
                    else if (l.images && l.images[cur.shareShowImg] && m) {
                        var v = l.images[cur.shareShowImg];
                        if (l.images.length > 0) {
                            var w = !(!cur.options.share || !cur.options.share.allow_custom_photo),
                                b = w && !(cur.options.share && cur.options.share.require_image),
                                k = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_choose_own_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                C = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_remove_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                y = isArray(v) && 1 == v.length,
                                x = l.media && "_" != l.media && w ? '<div class="medadd_c_linkimg_controls">  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_l">' + (l.images.length > 1 ? '    <div class="medadd_c_linkimg_controls_btn_arrows_group">      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_left" onclick="cur.shareShowNext(true);"></div>      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_right" onclick="cur.shareShowNext();"></div>    </div>' : "") + '    <div class="medadd_c_linkimg_controls_btn ' + (l.images.length > 1 ? "medadd_c_btn_side_padd" : "") + '" id="medadd_ctrl_upload" ' + k + " onclick=\"Page.ownerPhoto('" + l.media + "');\"></div>  </div>" + (b ? '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_r">    <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_remove" ' + C + ' onclick="tooltips.hide(this);cur.removeLinkImage(this)"></div>  </div>' : "") + "</div>" : "",
                                S = (d ? "" : "display: none") + ";background-image:url(" + m + ")";
                            l.image_ratio > 0 && (S += ";height: 0px; padding-top: " + 100 * l.image_ratio + "%;min-height: 0px;"), u = '<div class="medadd_c_linkimg_container ' + (f && f.offsetWidth > 550 ? "medadd_c_linkimg_container_wide" : "") + '" style="' + S + '">' + u + (_ ? '<div class="medadd_c_linkvideo_button"><button class="flat_button secondary_dark" onclick="cur.selectSnippetVideo();">Choose video</button></div>' : "") + (y ? '<div class="medadd_c_linkimg_button"><button class="flat_button secondary_dark" onclick="Page.ownerPhoto(\'' + l.media + "');\">" + getLang("global_link_choose_own_photo") + "</button></div>" : "") + x + '<div id="medadd_c_linkimg_loader" class="medadd_c_linkimg_loader">' + getProgressHtml("", "inv medadd_c_linkimg_loader_inner") + "</div></div>"
                        }
                    }
                    var P = "";
                    l.microdata && l.microdata_preview_html && (P = l.microdata_preview_html);
                    var M = (l.description_short || l.description, {
                            title: {
                                placeholder: '<span class="medadd_inline_placeholder">' + getLang("global_link_edit_title") + "</span>",
                                editable: cur.options.share && cur.options.share.allow_edit_title
                            },
                            description: {
                                placeholder: '<span class="medadd_inline_placeholder">' + getLang("global_link_edit_desc") + "</span>",
                                editable: cur.options.share && cur.options.share.allow_edit_desc
                            }
                        }),
                        T = l.shareButtons,
                        A = T && T.length && T[0],
                        I = l.button_text || A && A[1],
                        L = l.button_text_lang || A && A[2],
                        N = l.button_action || A && A[0];
                    if (T && T.length && L === I)
                        for (var B = 0; B < T.length; ++B)
                            if (T[B][0] === N && T[B][2] === I) {
                                I = T[B][1];
                                break
                            }
                    var D = !1;
                    T && T.length && (D = T.length > 1 || L === I || A[0] !== N || A[1] !== I);
                    var U = !!T && T.length,
                        E = cur.options.share && cur.options.share.allow_remove_button && !h,
                        p = u + '<div class="medadd_c_linkwrap ' + (u ? "" : "no_photo") + '"><div class="medadd_c_linkwrap_block">' + (l.title || M.title.editable ? '<div class="medadd_c_linkhead ' + (M.title.editable ? "medadd_inline_editable" : "") + '">' + (M.title.editable ? '<div class="medadd_inline_editable_icon"></div>' : "") + '<span class="medadd_inline_edit_target" data-max-length="' + (cur.options.share && cur.options.share.max_title_len ? cur.options.share.max_title_len : 0) + '" data-field="title">' + (clean(l.title).replace(/\n/g, "<br>") || M.title.placeholder) + "</span></div>" : "") + (P ? '<div class="medadd_c_linkmicrodata">' + P + "</div>" : "") + (l.domain ? '<div class="page_media_link_url medadd_c_linkaddr">' + l.domain + "</div>" : "") + "</div>" + (L && U ? '<div class="medadd_c_linkwrap_block medadd_c_linkwrap_block_button">' + (E ? '<div class="hide_icon medadd_c_linkbtn_remove" onclick="cur.shareRemoveButton();" onmouseover="showTooltip(this, {text: \'' + getLang("global_share_button_remove_tooltip") + "', black: 1, shift: [15, 10, 0]})\"></div>" : "") + '<div class="wall_postlink_preview_btn medadd_c_linkbtn"><a onclick="cur.toggleShareButton(this);return false;" onmouseout="Page.actionsDropdownHide(domNS(this), 0, cur.setActiveShareButton.pbind(false))" onmouseover="Page.actionsDropdownUnhide()" class="flat_button"><span onmouseover="Page.actionsDropdownUnhide()" class="' + (D ? "page_actions_dd_label" : "") + ' wall_postlink_preview_btn_label" data-field="button_text">' + L + "</span></a></div></div>" : "") + '</div><div class="clear_fix"></div>'
                }
                if (n ? addClass(domFC(c), "medadd_c_linkimg_big") : removeClass(domFC(c), "medadd_c_linkimg_big"), e) cur.preventShareAnim && (cur.preventShareAnim.stop(), clearInterval(cur.animateUpdateInterval), t.onChangedSize && t.onChangedSize()), val(domFC(c), p), domFC(c).style.height = "auto", g && ge("snippet_video_preview_wrap").appendChild(g), shortCurrency();
                else {
                    !isVisible(f);
                    show(f);
                    var z = ge(a).appendChild(ce("div", {
                            innerHTML: '<div class="medadd_c_linkcon ' + (n ? "medadd_c_linkimg_big" : "") + '">' + p + "</div>"
                        }, {
                            position: "absolute",
                            width: getSize(c)[0] - 10,
                            visibility: "hidden"
                        })),
                        R = getSize(z)[1];
                    re(z), setStyle(domFC(c), {
                        height: "0"
                    }), setStyle(c, {
                        overflow: "hidden"
                    }), val(domFC(c), p), g && ge("snippet_video_preview_wrap").appendChild(g), shortCurrency(), cur.animateUpdateInterval = setInterval(function() {
                        t.onChangedSize && t.onChangedSize()
                    }, 100), cur.preventShareAnim = animate(domFC(c), {
                        height: R
                    }, 200, function() {
                        setStyle(domFC(c), {
                            height: "auto",
                            display: ""
                        }), setStyle(c, {
                            overflow: ""
                        }), clearInterval(cur.animateUpdateInterval), t.onChangedSize && t.onChangedSize()
                    }), re(geByClass1("medadd_c_linkprg", f))
                }
                if (M.title.editable) {
                    var F = geByClass1("medadd_c_linkhead", domFC(c)),
                        q = geByClass1("medadd_inline_edit_target", F);
                    F && q && (F.onclick = r.bind(this, q))
                }
                if (M.description.editable) {
                    var H = geByClass1("medadd_inline_edit_target", geByClass1("medadd_c_linkdsc", domFC(c)));
                    H && (H.onclick = r.bind(this, H))
                }
                if (U && (s.shareData.button_text = I, s.shareData.button_text_lang = L, s.shareData.button_action = N, D)) {
                    var j = domPN(geByClass1("wall_postlink_preview_btn_label", domFC(c))),
                        O = [],
                        W = 0,
                        V = 0,
                        $ = [];
                    for (var B in T) {
                        var K = T[B];
                        K[0] == N && K[1] == I && (W = V), O.push([V++, K[1]]), $.push('<a class="page_actions_item" tabindex="0" role="link" onclick="cur.updateShareButton(this);Page.actionsDropdownHide(domPN(domPN(this)), 1, cur.setActiveShareButton.pbind(false));return false;" data-button-text="' + K[1] + '" data-button-text-lang="' + K[2] + '" data-button-action="' + K[0] + '">' + K[2] + "</a>")
                    }
                    j.setAttribute("data-items", JSON.stringify(O)), j.setAttribute("data-value", W);
                    var G = ['<div class="page_actions_wrap medadd_c_linkbtn_actions_wrap unshown" onmouseout="Page.actionsDropdownHide(this, 0, cur.setActiveShareButton.pbind(false))" onmouseover="Page.actionsDropdownUnhide()" onmouseup="setTimeout(function () { Page.actionsDropdownUnhide(); }, 5)">', '<div class="page_actions_inner">', $.join(""), "</div>", "</div>"].join("");
                    domPN(j).appendChild(se(G)), ls.get("share_button_text_tooltip_shown") || cur.buttonTextTooltip || setTimeout(function() {
                        cur.closeButtonTextTooltip = function() {
                            cur.buttonTextTooltip.hide(), ls.set("share_button_text_tooltip_shown", 1)
                        };
                        var e = geByClass1("wall_postlink_preview_btn_label", domFC(c)),
                            a = domCA(e, ".box_layout");
                        cur.buttonTextTooltip = new ElementTooltip(e, {
                            autoShow: !1,
                            appendTo: a ? a : geByTag1("body"),
                            content: '<div class="feature_intro_tt_hide" onclick="cur.closeButtonTextTooltip();"></div>' + getLang("global_share_button_text_tooltip"),
                            forceSide: "left",
                            cls: "feature_intro_tt",
                            offset: [-10, 0, 0],
                            onHide: function() {
                                cur.buttonTextTooltip.destroy()
                            }
                        }), cur.buttonTextTooltip.show(), addEvent(e, "mouseover", function() {
                            cur.buttonTextTooltip && cur.buttonTextTooltip.hide()
                        })
                    }, 1e3)
                }
            },
            showVideoSnippetPreview: function() {
                var e = !(!cur.options.share || !cur.options.share.allow_snippet_video);
                if (e) {
                    var a = s.shareData,
                        i = a.video,
                        t = a.video_owner_id,
                        o = a.video_id;
                    i && isObject(i) && t && o && i.editable && (delete a.photo_id, delete a.images, delete a.images_proxy, s.initSnippetButtonFunctions(), s.showPreview())
                }
            },
            initSnippetButtonFunctions: function() {
                cur.shareRemoveButton = function() {
                    var a = s.sharePreview;
                    window.tooltips && tooltips.destroyAll(a), re(geByClass1("medadd_c_linkwrap_block_button", a)), s.shareData.button_text = "", s.shareData.button_text_lang = "", s.shareData.button_action = "", show(domByClass(e, "media_selector"))
                }, cur.updateShareButton = function(e) {
                    var a = e.getAttribute("data-button-text"),
                        i = e.getAttribute("data-button-text-lang"),
                        t = e.getAttribute("data-button-action");
                    s.shareData.button_text = a, s.shareData.button_text_lang = i, s.shareData.button_action = t;
                    var o = s.sharePreview;
                    return val(geByClass1("page_actions_header_inner", o), i), val(geByClass1("wall_postlink_preview_btn_label", o), i), !1
                }, cur.setActiveShareButton = function(e) {
                    var a = s.sharePreview,
                        i = e ? addClass : removeClass;
                    i(domPN(geByClass1("wall_postlink_preview_btn_label", a)), "active")
                }, cur.toggleShareButton = function(e) {
                    hasClass(e, "active") ? (Page.actionsDropdownHide(domNS(e), 1), cur.setActiveShareButton(!1)) : (Page.actionsDropdown(domNS(e)), cur.setActiveShareButton(!0))
                }
            },
            showExternalPreview: function() {
                var e = s.shareData;
                e.images || (e.images = []);
                var a = [],
                    i = [],
                    o = {};
                each(e.images, function(t, s) {
                    o[s] || (o[s] = !0, a.push(s), e.images_proxy && i.push(e.images_proxy[t]))
                }), e.uniqueImagesCount = a.length, e.images = a, e.images_proxy = i;
                var r;
                if (r = f && f.offsetWidth > 550 ? isRetina() ? "/images/post_snippet_image_placeholder_w_2x.png" : "/images/post_snippet_image_placeholder_w.png" : isRetina() ? "/images/post_snippet_image_placeholder_2x.png" : "/images/post_snippet_image_placeholder.png", e.placeholder_inserted || (e.images.push([(cur.options.share || {}).allow_custom_photo ? r : ""]), e.placeholder_inserted = !0), !e.images || !e.images.length) return cur.shareShowImg = 0, void s.showPreview();
                cur.shareShowImg = 0, cur.shareShowImg--, s.addPreview(!0), e.imagesStyles = {};
                var d = !1;
                cur.shareSetOwnPhoto = function(a) {
                    curBox() && curBox().hide(), s.bigLink = !0, e.images[e.images.length - 1] = [a.photo_url, a.user_id, a.photo_id], cur.shareShowNext(0, 1)
                }, cur.shareClearOwnPhoto = function() {
                    e.images[e.images.length - 1] = [], cur.shareShowNext(0, 0, 1)
                }, cur.removeLinkImage = function(e) {
                    var a = gpeByClass("medadd_c_linkcon", e);
                    addClass(a, "no_photo"), removeClass(a, "medadd_c_linkimg_big"), re(gpeByClass("medadd_c_linkimg_container", e)), setStyle(a, "height", ""), s.shareData.noPhoto = !0
                }, s.initSnippetButtonFunctions(), cur.shareShowNext = function(a, i, o) {
                    var n = vkImage();
                    cur.prevShareShowDir = a, o || (i ? cur.shareShowImg = e.images.length - 1 : a ? cur.shareShowImg -= 1 : cur.shareShowImg += 1);
                    var l = isArray(e.images[e.images.length - 1]) && !!e.images[e.images.length - 1][0];
                    if (!l && cur.shareShowImg > e.images.length - 2) cur.shareShowImg = 0;
                    else if (cur.shareShowImg > e.images.length - 1) cur.shareShowImg = 0;
                    else if (!l && cur.shareShowImg < 0) cur.shareShowImg = e.images.length - 2;
                    else if (cur.shareShowImg < 0) cur.shareShowImg = e.images.length - 1;
                    else if (0 == cur.shareShowImg)
                        for (var c = 1; c < e.images.length - 1; c++) {
                            var _ = vkImage();
                            _.src = s.shareImgUrl(c)
                        }
                    if (!e.images.length || isEmpty(e.images) || void 0 === e.images[cur.shareShowImg]) return s.showPreview(d), void(d = !0);
                    var h = s.shareImgUrl(cur.shareShowImg);
                    h && (n.src = h), isArray(e.images[cur.shareShowImg]) && e.images[cur.shareShowImg][1] && e.images[cur.shareShowImg][2] ? (e.user_id = e.images[cur.shareShowImg][1], e.photo_id = e.images[cur.shareShowImg][2], e.share_own_image = !0) : (e.user_id = void 0, e.photo_id = void 0, e.share_own_image = !1);
                    var p = null;
                    h && (cur.imgLoadTimeout = p = setTimeout(function() {
                        cur.shareImgInterval !== !0 && (isArray(e.images[cur.shareShowImg]) || (e.images.splice(cur.shareShowImg, 1), e.images_proxy && e.images_proxy.length > cur.shareShowImg && e.images_proxy.splice(cur.shareShowImg, 1), cur.shareShowNext()))
                    }, 5e3));
                    var u = setTimeout(function() {
                        show("medadd_c_linkimg_loader"), u = null, t.onChangedSize && t.onChangedSize()
                    }, 100);
                    cur.showLoaderTimeout = u;
                    var m = function() {
                        if (n.width || n.height || !h) {
                            var a = n.width,
                                i = n.height,
                                o = "",
                                l = "";
                            if (p && (clearTimeout(p), p = null), u && (clearTimeout(u), u = null), hide("medadd_c_linkimg_loader"), clearInterval(cur.shareImgInterval), !isArray(e.images[cur.shareShowImg]) && (150 > a || 67 > i)) {
                                if (e.images.splice(cur.shareShowImg, 1), e.images_proxy && e.images_proxy.length > cur.shareShowImg && e.images_proxy.splice(cur.shareShowImg, 1), e.images.length) return setTimeout(cur.shareShowNext.pbind(0, 0, 1), 0)
                            } else {
                                var c = 5,
                                    _ = a >= 537 - c && i >= 240 - c,
                                    m = _ || !!e.big_link;
                                if (cur.options.share && cur.options.share.force_big_link && !_) {
                                    e.images.splice(cur.shareShowImg, 1), e.images_proxy.splice(cur.shareShowImg, 1);
                                    var g = (cur.options.share || {}).allow_custom_photo || (cur.options.share || {}).require_image;
                                    return 0 == e.images.length && g && e.images.push([g ? r : ""]), cur.prevShareShowDir || cur.shareShowImg--, void cur.shareShowNext(cur.prevShareShowDir)
                                }
                                s.bigLink = m, m ? o = "width: 100%;" : (a > 150 && (i = 150 * i / a, a = 150), o = "width: " + a + "px; height: " + i + "px;")
                            }
                            e.images.length > 1 && (l = ""), e.imagesStyles[cur.shareShowImg] = 'style="' + o + '"' + l, s.showPreview(d), d = !0, t.onAddMediaChange && t.onAddMediaChange("share", e.media, e)
                        }
                    };
                    clearInterval(cur.shareImgInterval), cur.shareImgInterval = setInterval(m, 300), cur.shareImgInterval2 = setTimeout(m, 0)
                }, cur.shareShowNext()
            },
            uploadShare: function(e) {
                var a = s.shareData,
                    i = s.sharePreview,
                    t = i.appendChild(ce("div", {
                        innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + u + '"></iframe>'
                    })),
                    o = t.appendChild(ce("form", {
                        action: "/share.php",
                        method: "post",
                        target: "share_upload_iframe" + u
                    })),
                    r = a.images[cur.shareShowImg];
                each({
                    act: "a_photo",
                    url: a.url,
                    index: u,
                    image: r,
                    extra: a.extra || 0,
                    hash: vk.ip_h
                }, function(e, a) {
                    o.appendChild(ce("input", {
                        type: "hidden",
                        name: e,
                        value: a
                    }))
                }), window.onUploadDone = function(a, o) {
                    window.onUploadFail = window.onUploadDone = function() {}, i.removeChild(t), s.shareData = extend(s.shareData, {
                        user_id: o.user_id,
                        photo_id: o.photo_id,
                        photo_url: r
                    }), setTimeout(e, 0)
                }, window.onUploadFail = function(a, o) {
                    window.onUploadFail = window.onUploadDone = function() {}, i.removeChild(t), s.shareData.share_upload_failed = 1, setTimeout(e, 0)
                }, cur.shareLastParseSubmitted = vkNow(), o.submit()
            },
            setupPostpone: function(e, a) {
                var i;
                i = l || C ? C : domPN(geByClass1("page_preview_postpone_wrap", m));
                var o = cur.editingPost && "wpe_media_preview" == domPN(i).id,
                    r = o || !l ? "" : "1px",
                    d = !1,
                    n = '<div class="clear_fix"><div class="fl_l"><input type="hidden" id="postpone_date' + u + '" value="' + (e.date || "") + '" /></div><div class="fl_l medadd_c_timerat">' + e.lang.profile_wall_postpone_at + '</div><div class="fl_l"><input type="hidden" id="postpone_time' + u + '"/></div></div>';
                cur.editingPost && void 0 != e.friends_only ? (n += '<div class="medadd_c_timersett">', void 0 != e.status_export && (n += '<div class="checkbox_status_export' + (e.status_export ? " on" : "") + ' fl_l" id="status_export' + u + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_twitter + "', black: 1, shift: [12,4,0]});\"></div>"), void 0 != e.facebook_export && (n += '<div class="checkbox_facebook_export' + (e.facebook_export ? " on" : "") + ' fl_l" id="facebook_export' + u + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_facebook + "', black: 1, shift: [12,4,0]});\"></div>"), n += '<div class="checkbox' + (e.friends_only ? " on" : "") + ' fl_l" id="friends_only' + u + '" onclick="checkbox(this);checkbox(\'status_export' + u + "',!isChecked(this));checkbox('facebook_export" + u + "',!isChecked(this));\">" + e.lang.friends_only + "</div></div>", d = !0) : cur.editingPost && a && (n += a, d = !0), s.postponePreview = i.appendChild(ce("div", {
                    className: "medadd_c medadd_c_timer clear_fix" + (d ? " medadd_c_nofixed" : ""),
                    innerHTML: n
                })), s.postponePreview.style.height = r, stManager.add(["ui_controls.css", "ui_controls.js", "datepicker.css", "datepicker.js"], function() {
                    new Datepicker("postpone_date" + u, {
                        time: "postpone_time" + u,
                        width: 155,
                        noPast: !0,
                        minStep: 1,
                        onUpdate: t.onMediaChange
                    }), !o && l && animate(s.postponePreview, {
                        height: 33
                    }, 200, function() {
                        s.postponePreview.style.height = ""
                    })
                })
            },
            createPrettyCards: function(e) {
                cur.lang = extend(cur.lang || {}, e.lang || {});
                var a = se(e.editor.container_html);
                f.appendChild(a), s.prettyCardGallery = new PrettyCardGallery(a, e.editor, e.pretty_cards)
            },
            destroy: function() {
                (w || {}).sorter && w.sorter.destroy();
                for (var e = 0; e < h.handlersToClean.length; e++) h.handlersToClean[e]();
                (v || {}).qsorter && v.qsorter.destroy()
            },
            qsorterOpts: function() {
                return {
                    xsize: Math.floor(v.offsetWidth / 135),
                    width: 135,
                    height: 102,
                    onReorder: t.onAddMediaChange,
                    clsUp: "pam_dpic_up"
                }
            },
            resized: function() {
                window.ThumbsEdit && ThumbsEdit.setWide("thumbs_edit" + cur.wallEditComposer.addMedia.lnkId), v.qsorter && (v.qsorter.destroy(), qsorter.init(v, s.qsorterOpts()))
            }
        }, cur.addMedia || (cur.addMedia = {}), cur.addMedia[u] = s, t.onAddMediaChange && (s.onChange = t.onAddMediaChange), s
    }
}
try {
    stManager.done("ui_media_selector.js")
} catch (e) {}