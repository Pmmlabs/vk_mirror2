function MediaSelector(e, a, t, o) {
    function i(e, a, t) {
        if (e = ge(e), !e) return !1;
        t = t || {}, window.__addMediaIndex || (__addMediaIndex = 0);
        var o = ++__addMediaIndex,
            i = '<div class="media_selector clear_fix"></div>';
        e.innerHTML = i;
        var s, r = domByClass(e, "media_selector"),
            d = [],
            n = (t.reverseMargin || 25, {
                id: o,
                menuNode: r,
                types: a,
                lastTypes: a,
                activate: function(e) {
                    n.touched = e === !0, t.onActivate && t.onActivate()
                },
                show: function() {
                    if (s && (clearTimeout(s), s = 0), n.moreWrap && !hasClass(n.moreWrap, "shown")) {
                        t.forceToUp || replaceClass(n.moreWrap, "to_up", "to_down");
                        var e = domByClass(n.moreWrap, "_more_items"),
                            a = getClientRectOffsetY(e);
                        (a > 0 || t.forceToUp) && replaceClass(n.moreWrap, "to_down", "to_up"), setTimeout(addClass.pbind(n.moreWrap, "shown"), 0)
                    }
                },
                hide: function(e) {
                    if (!s) {
                        var a = function() {
                            s = 0, n.moreWrap && removeClass(n.moreWrap, "shown")
                        };
                        if (e) {
                            var t = domByClass(n.moreWrap, "_more_items");
                            hide(t), a(), setTimeout(show.pbind(t), 0)
                        } else s = setTimeout(a, 300)
                    }
                },
                setOptions: function(e) {
                    extend(t, e)
                },
                setItems: function(e) {
                    for (window.tooltips && tooltips.destroyAll(r); r.firstChild;) re(r.firstChild);
                    var a = void 0 !== t.hideAfterCount ? t.hideAfterCount : 4,
                        o = void 0 !== t.maxShown ? t.maxShown : 3,
                        i = !1,
                        s = t.hideItem,
                        l = (s || e.length > a) && !browser.mobile,
                        c = s && t.hideLabel || getLang("global_media_selector_more");
                    n.moreWrap = !1, n.lastTypes = e, each(e, function(e, a) {
                        var _, h = a[0],
                            p = a[1],
                            u = a[2];
                        if (l && (s ? h == s : e == o)) {
                            var m = r.appendChild(ce("div", {
                                    className: "ms_items_more_wrap"
                                })),
                                g = function(e) {
                                    n.fromKeyboard = checkKeyboardEvent(e), ("mouseover" != e.type || !n.touched && !n.fromKeyboard) && (n.fromKeyboard && hasClass(n.moreWrap, "shown") ? n.hide() : n.show())
                                },
                                v = function() {
                                    n.fromKeyboard || n.hide()
                                };
                            addEvent(m, "mouseover click", g), addEvent(m, "mouseout", v), d.push(function() {
                                removeEvent(m, "mouseover click", g), removeEvent(m, "mouseout", v)
                            }), t.vectorIcon && (c = '<span class="blind_label">' + c + "</span>", addClass(m, "ms_items_more_wrap_vector")), _ = m.appendChild(ce("a", {
                                className: "ms_item_more",
                                innerHTML: '<span class="ms_item_more_label">' + c + "</span>"
                            })), _.setAttribute("tabindex", 0), _.setAttribute("role", "button");
                            var w = ce("div", {
                                className: "ms_items_more_helper"
                            });
                            i = ce("div", {
                                className: "ms_items_more _more_items"
                            }), w.appendChild(i), _ = m.appendChild(w), n.moreWrap = m
                        }
                        if (_ = (i ? i : r).appendChild(ce("a", {
                                innerHTML: i ? p : '<span class="blind_label">' + p + "</span>",
                                className: "ms_item ms_item_" + h + " _type_" + h
                            })), _.setAttribute("tabindex", 0), !i) {
                            _.setAttribute("data-title", p), _.setAttribute("aria-label", p), _.setAttribute("role", "link");
                            var b = function() {
                                showTitle(this, !1, !1, {
                                    noZIndex: !0
                                })
                            };
                            addEvent(_, "mouseover", b), d.push(function() {
                                removeEvent(_, "mouseover", b)
                            })
                        }
                        if (u && !cur.viewAsBox) {
                            var f = function() {
                                return n.activate(), n.hide(!0), t.onItemClick && !t.onItemClick(h) ? !1 : (u(), !1)
                            };
                            addEvent(_, "click", f), d.push(function() {
                                removeEvent(_, "click", f)
                            })
                        }
                    })
                }
            });
        return a && n.setItems(a), browser.msie && (removeEvent(e, "MSPointerDown"), addEvent(e, "MSPointerDown", n.activate.pbind(!0))), removeEvent(e, "mouseover"), addEvent(e, "mouseover click", n.activate), t.global || cur.destroy.push(function() {
            removeEvent(e, "mouseover click", n.activate)
        }), t.forceToUp && addClass(geByClass1("ms_items_more_wrap", r), "to_up"), n.handlersToClean = d, n
    }
    var s, r = [];
    o = o || {};
    var d = o.mediaHandlers || {};
    each(t || [], function(e, a) {
        var t = a[0],
            i = a[1],
            n = a[2];
        if (i) {
            var l = !1,
                c = o.toId || cur.postTo,
                _ = {
                    to_id: c,
                    blockPersonal: o.blockPersonal
                };
            switch (_.mail_add = o.mail ? 1 : "", t) {
                case "graffiti":
                    l = showBox.pbind("al_wall.php", {
                        act: "canvas_draw_box",
                        to_id: c,
                        flash: browser.flash
                    }, {
                        cache: 1,
                        dark: 1
                    });
                    break;
                case "photos_list":
                    l = showBox.pbind("al_photos.php", extend(_, {
                        act: "choose_photo"
                    }), {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                    break;
                case "photo":
                    l = d.photo ? d.photo.pbind(o) : showBox.pbind("al_photos.php", extend(_, {
                        act: "choose_photo",
                        max_files: o.limit || 10
                    }), {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                    break;
                case "video":
                    l = showBox.pbind("al_video.php", extend(_, {
                        act: "a_choose_video_box"
                    }), {
                        cache: 1,
                        dark: 1
                    });
                    break;
                case "audio":
                    l = showBox.pbind("audio", extend(_, {
                        act: "a_choose_audio_box"
                    }), {
                        cache: 1,
                        dark: 1
                    });
                    break;
                case "poll":
                    l = function() {
                        s.chooseMedia("poll", "", n)
                    };
                    break;
                case "doc":
                    var h = o.docParams || {};
                    h = extend(h, {
                        act: "a_choose_doc_box"
                    }), l = d.doc ? d.doc.pbind(o) : showBox.pbind("docs.php", extend(_, h), {
                        stat: ["docs.css"]
                    });
                    break;
                case "map":
                    l = showBox.pbind("al_places.php", extend(_, {
                        act: "a_choose_place_box"
                    }), {
                        stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js", "boxes.css"],
                        width: 640,
                        bodyStyle: "padding: 0px;",
                        dark: 1
                    });
                    break;
                case "note":
                    l = showWiki.pbind({
                        note: "new"
                    }, !0, !1, {
                        queue: 1
                    });
                    break;
                case "postpone":
                    l = function() {
                        s.chooseMedia("postpone", i, n)
                    };
                    break;
                case "mark_as_ads":
                    l = function() {
                        s.chooseMedia("mark_as_ads", i, n)
                    };
                    break;
                case "share":
                    l = function() {
                        window.onShareChooseUrlBoxInit = function() {
                            var e = geByClass1("share_url_input", curBox().bodyNode);
                            addEvent(e, "keydown", function(e) {
                                return e.which == KEY.ENTER ? (a(geByClass1("flat_button", curBox().bodyNode), e), !1) : void 0
                            })
                        };
                        var e = showBox("share.php", {
                                act: "choose_url_box"
                            }, {
                                dark: 1
                            }),
                            a = function(a, t) {
                                var o = geByClass1("share_url_input", e.bodyNode),
                                    r = val(o);
                                lockButton(a), disable(o, !0), hide("share_url_error"), s.chooseMedia("share", i, extend(n, {
                                    url: r,
                                    draft: !0,
                                    onSuccess: function() {
                                        disable(o, !1), unlockButton(a), e.hide()
                                    },
                                    onError: function(e) {
                                        var t = "";
                                        e && e !== getLang("global_unknown_error") && (t = e + " "), disable(o, !1), unlockButton(a), ge("share_url_error").innerHTML = t + getLang("global_share_link_failed"), show("share_url_error")
                                    }
                                }))
                            };
                        e.removeButtons(), e.addButton(getLang("global_continue"), a)
                    };
                    break;
                case "gift":
                    l = function() {
                        var e = o.peer < 2e9 ? o.peer : 0,
                            e = e || cur.peer;
                        o.giftBoxPrepare && o.giftBoxPrepare(e), showBox("al_gifts.php", {
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
                    l = function() {
                        var e = cur.peer;
                        c > -2e9 && 0 > c && (_.owner_id = c), showBox("al_payments.php", extend(_, {
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
                    c == vk.id ? (l = showBox.pbind("al_market.php", extend(_, {
                        act: "a_choose_user_product_box"
                    }), {
                        cache: 1
                    }), n.tt_words && (cur.checkMessageHandler = function(e) {
                        if (!cur.marketIntroShown && (e = " " + e + " ", e.match(new RegExp("\\s(" + n.tt_words.join("|") + ")\\s", "i")))) {
                            var a = getSize(s.menu.moreWrap);
                            showTooltip(s.menu.moreWrap, {
                                text: n.tt_text,
                                dir: "left",
                                slideX: 15,
                                width: 230,
                                shift: [-a[0] - 5, -a[1] / 2],
                                hasover: 1
                            }), cur.marketIntroShown = !0
                        }
                    })) : l = showBox.pbind("al_market.php", extend(_, {
                        act: "a_choose_product_box"
                    }), {
                        cache: 1
                    })
            }
            r.push([t, i, l])
        }
    });
    var n = o.limit || 10,
        l = n > 1,
        c = o.editable && (!browser.msie || parseInt(browser.version) > 8),
        _ = o.sortable && (!browser.msie || parseInt(browser.version) > 8),
        h = i(e, r, {
            onActivate: function() {
                cur.chooseMedia = s.chooseMedia, cur.showMediaProgress = s.showMediaProgress, cur.attachCount = s.attachCount, cur.lastAddMedia = s, cur.onMediaUploadStarted = o.onMediaUploadStarted
            },
            onItemClick: function(e) {
                return l && s.attachCount() >= n && "postpone" !== e && "mark_as_ads" !== e ? (vk.widget ? showBox("blank.php", {
                    code: 1900,
                    limit: n
                }) : showFastBox(getLang("global_error"), getLang("attachments_limit", n)), !1) : !0
            },
            hideAfterCount: o.hideAfterCount,
            topOffset: o.topOffset,
            forceUp: o.forceUp,
            global: o.global,
            maxShown: o.maxShown,
            forceToUp: o.forceToUp,
            vectorIcon: o.vectorIcon
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
            chooseMedia: function(a, t, i, r, d, p) {
                if (s.onChange && s.onChange(a, t, i, r) === !1) return void 0 !== i.upload_ind && re("upload" + i.upload_ind + "_progress_wrap"), !1;
                if ("note" == a && (cur.pbNoteAdded = !1), inArray(a, o.disabledTypes || [])) return !1;
                if (s.attachCount() >= n && void 0 === i.upload_ind && "postpone" !== a && "mark_as_ads" !== a || geByClass1("medadd_c_market", w) || geByClass1("medadd_c_story", w)) {
                    if (l) return !1;
                    s.unchooseMedia()
                }
                var y = !1,
                    x = {};
                if (l && (each(s.chosenMedias, function() {
                        return this[0] == a && this[1] == t ? (y = !0, !1) : void(x[this[0]] = x[this[0]] ? x[this[0]] + 1 : 1)
                    }), y)) return !1;
                var S, P = "",
                    M = "",
                    T = "",
                    I = !1,
                    B = w,
                    A = "";
                switch (a) {
                    case "graffiti":
                        isObject(i) || (i = {
                            thumb: i || ""
                        }), P = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + i.thumb + '" /></div>', B = I = k;
                        break;
                    case "photos_list":
                        hide(this._addMediaLink), vkImage().src = i[1];
                        var N = i[3].replace(/^{|}$/g, "");
                        N && (N += ","), N += '"queue":1', S = o.nocl ? "" : " onclick=\"return showPhoto('" + i[4] + "', '" + i[2] + "', " + N.replace(/"/g, "&quot;") + ');"', P = "<div" + S + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + i[1] + '" /></div>', B = I = g;
                        break;
                    case "photo":
                        isObject(i) || (i = {
                            thumb_m: i[0] || "",
                            thumb_s: i[1] || "",
                            list: i[2] || "",
                            view_opts: i[3] || "",
                            upload_ind: i.upload_ind || void 0
                        }), vkImage().src = i.thumb_m;
                        var N = i.view_opts.replace(/^{|}$/g, "");
                        if (N && (N += ","), N += '"queue":1', s.phLists[t] = i.list, c) {
                            if (!i.editable) return !1;
                            o.nocl || (i.editable.click = s.showPhoto.pbind(t, i.list, parseJSON("{" + N + "}")))
                        }
                        S = o.nocl ? "" : ' onclick="return cur.addMedia[' + s.lnkId + "].showPhoto('" + t + "', '" + i.list + "', {" + N.replace(/"/g, "&quot;") + '});"', P = "<div " + S + ' class="fl_l page_preview_photo' + (p ? " page_preview_ph_graff" : "") + '"><img class="page_preview_photo" src="' + i.thumb_m + '" /></div>', I = 1, B = g;
                        break;
                    case "video":
                        if (isObject(i) || (i = {
                                thumb: i || ""
                            }), c) {
                            if (!i.editable) return !1;
                            o.nocl || (i.editable.click = showVideo.pbind(t, !1, {
                                queue: 1
                            }))
                        }
                        S = o.nocl ? "" : " onclick=\"return showVideo('" + t + "', false, {queue:1});\"", P = "<div" + S + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + i.thumb + '" /></div>', I = 1, B = g;
                        break;
                    case "audio":
                        if (!isArray(i)) {
                            if (!i.info) return !1;
                            var L = geByClass1("_audio_row_" + t);
                            L && (i = AudioUtils.getAudioFromEl(L))
                        }
                        P = Page.addAudioPreview(t, i), A = ' id="pam' + u + "_audio" + t + '"';
                        break;
                    case "doc":
                        if (!i.lang) return !1;
                        i.thumb && i.thumb_s ? (P = "gif" == i.ext ? '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + i.href + '" class="pam_dpic"><div class="page_preview_doc_photo"><img src="' + i.thumb + '" align="center" /></div><div class="page_preview_doc_photo_hint doc_gif">' + i.title + "</div>" : '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + i.href + '" class="pam_dpic"><div class="page_preview_doc_photo"><img src="' + i.thumb + '" align="center" /></div><div class="page_preview_doc_photo_hint">' + i.title + "</div>", M = '</a><div class="pam_bg"></div>', B = I = v, A = ' id="pam' + u + "_doc" + t + '"') : (P = "", M = '<div class="page_doc_row"><a target="_blank" href="' + i.href + '" class="page_doc_icon page_doc_icon' + intval(i.type) + '"></a><a target="_blank" href="' + i.href + '" class="page_doc_title">' + i.title + '</a><div class="page_doc_description_row"><div class="page_doc_size">' + i.size_str + "</div></div></div>", A = ' id="pam' + u + "_doc" + t + '"');
                        break;
                    case "story":
                        P = '<div class="medadd_c_story"><a target="_blank" ' + i.attr + '"><div class="medadd_c_story_thumb fl_l" style="background-image:url(' + i.thumb + ')"></div></a><div class="medadd_c_story_info fl_l"><a class="medadd_c_story_title" target="_blank" ' + i.attr + '">' + i.title + '</a><div class="medadd_c_story_desc">' + i.date_string + "</div></div>", hide(e);
                        break;
                    case "share":
                        if (x.share || x.page || !i.lang) return !1;
                        if (isArray(i) && (i = {
                                domain: i[0],
                                url: i[1],
                                initialPattern: i[2],
                                title: i[3],
                                description: i[4],
                                images: [i[5]],
                                user_id: i[6],
                                photo_id: i[7]
                            }), i.draft) {
                            var D = {
                                onSuccess: i.onSuccess,
                                onError: i.onError
                            };
                            return s.checkURL(i.url, void 0, D), !1
                        }
                        if (!i.title && !(cur.options.share || {}).allow_preview_empty_links) return (i.onError || function() {})(), !1;
                        i.title = unclean((i.title || "").replace(/<br>/g, "\n")), i.description = unclean((i.description || "").replace(/<br>/g, "\n")), i.description_short = unclean((i.description_short || "").replace(/<br>/g, "\n")), i.description_narrow = unclean((i.description_narrow || "").replace(/<br>/g, "\n")), cur.options.share && cur.options.share.max_title_len && (i.title = (i.title || "").substr(0, cur.options.share.max_title_len)), cur.options.share && cur.options.share.max_desc_len && (i.description = (i.description || "").substr(0, cur.options.share.max_desc_len), i.description_short = (i.description_short || "").substr(0, cur.options.share.max_desc_len), i.description_narrow = (i.description_narrow || "").substr(0, cur.options.share.max_desc_len)), i.media = i.media || t, i.lang && (cur.lang = extend(cur.lang || {}, i.lang)), P = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(i.url) + '" class="medadd_h medadd_h_link inl_bl">' + i.lang.profile_choose_link + "</a>", s.shareData = extend(s.shareData || {}, i, {
                            imagesStyles: [""]
                        }), B = f, (i.onSuccess || function() {})(), (cur.options.share || {}).button_exclusive && i.shareButtons && hide(domByClass(e, "media_selector")), hide(domByClass(h.menuNode, "_type_share"));
                        break;
                    case "poll":
                        if (!i.lang) return !1;
                        P = '<div class="medadd_h medadd_h_poll inl_bl">' + i.lang.q + "</div>", hide(domByClass(h.menuNode, "_type_poll")), B = b;
                        break;
                    case "map":
                        var U = 340,
                            E = 127;
                        P = "<div class=\"fl_l\"><a onclick=\"return showBox('al_places.php', {act: 'geo_box', lat: " + i[0] + ", long: " + i[1] + ", provider: " + intval(i[3]) + '}, {dark: 1});"><div class="page_media_map_point"></div><img class="page_preview_map" width="' + U + '" height="' + E + '" src="/maps?lat=' + i[0] + "&lng=" + i[1] + "&z=11&" + (window.devicePixelRatio >= 2, "w=" + 2 * U + "&h=" + 2 * E) + '" /></a></div>', B = I = k, hide(domByClass(h.menuNode, "_type_map"));
                        break;
                    case "page":
                        if (x.share || x.page || !i.lang) return !1;
                        var z = i.media.split("_");
                        P = '<a href="/page' + i.media + '" onclick="return showWiki({oid: ' + z[0] + ", id: " + z[1] + '}, false, event, {queue: 1})" class="medadd_h medadd_h_page inl_bl">' + i.lang.profile_choose_page + "</a>", B = f;
                        break;
                    case "album":
                        if (i.thumb.match(/^\/images\//) && (i.thumb = ""), c) {
                            if (!i.editable) return !1;
                            extend(i.editable, {
                                title: i.title,
                                size: i.count,
                                click: o.nocl ? !1 : nav.change.pbind({
                                    z: "album" + t
                                })
                            })
                        }
                        var F = i.thumb;
                        vkImage().src = F, S = o.nocl ? "" : ' href="/album' + t + '" onclick="return nav.change({z: \'album' + t + "'}, event)\"";
                        var q = "fl_l page_album_link" + (F ? "" : " page_album_nocover");
                        P = '<a class="' + q + '" ' + S + ">" + (F ? '<div class="page_album_thumb_wrap"><img class="page_album_thumb" src="' + F + '"/></div>' : "") + '  <div class="page_album_title">    <div class="page_album_size">' + i.count + '</div>    <div class="page_album_title_text">' + i.title + "</div>  </div></a>", I = 1, B = g;
                        break;
                    case "note":
                        if (!i.lang) return !1;
                        P = "<a onclick=\"showWiki({w: 'note" + i.raw + '\', edit: 1}, true, event, {queue: 1})" class="medadd_h medadd_h_note inl_bl">' + i.lang.profile_choose_note + "</a>", M = '<div class="medadd_c medadd_c_note"><a onclick="showWiki({w: \'note' + i.raw + '\', edit: 1}, true, event, {queue: 1})" id="share_note_title' + i.raw + '">' + i.title + "</a></div>", B = f;
                        break;
                    case "market":
                        P = '<div class="medadd_c_market"><a target="_blank" href="' + i.href + '"><img class="medadd_c_market_thumb fl_l" src="' + i.thumb + '" /></a><div class="medadd_c_market_info fl_l"><a class="medadd_c_market_title" target="_blank" href="' + i.href + '">' + i.title + '</a><div class="medadd_c_market_price">' + i.price + "</div></div>", hide(e);
                        break;
                    case "market_album":
                        if (c) {
                            if (!i.editable) return !1;
                            extend(i.editable, {
                                title: i.title,
                                msize: langNumeric(i.count, i.lang.profile_X_market_items),
                                click: !1
                            })
                        }
                        var z = t.split("_");
                        vkImage().src = i.thumb, S = o.nocl ? "" : ' href="/market' + z[0] + "?section=album_" + z[1] + '"';
                        var q = "fl_l page_preview_album wall_album_cover_wrap wall_market_album_cover" + (i.thumb ? "" : " page_album_nocover");
                        P = '<a class="' + q + '" ' + S + ">" + (i.thumb ? '<img class="wall_album_cover" src="' + i.thumb + '"/>' : "") + '  <div class="wall_album_caption">    <div class="wall_album_title_wrap clear_fix">      <div class="wall_album_count fl_r">' + i.count + '</div>      <div class="wall_album_title">' + i.title + "</div>    </div>  </div></a>", I = 1, B = g;
                        break;
                    case "postpone":
                        if (P = '<div class="medadd_h medadd_h_timer inl_bl">' + i.lang.profile_choose_timer + '<span id="postpone_preview' + u + '"></span></div>', cur.editingPost && !l) t = intval(t), t ? i.date = t : i.date = intval(cur.editingPost[7]), ge("wpe_save").innerHTML = getLang("global_save");
                        else if (cur.editingPost && "wpe_media_preview" == domPN(C).id) {
                            t = intval(t), t ? i.date = t : i.date = intval(cur.editingPost[7]);
                            var H = geByClass1("medadd_c_timersett", C);
                            if (H) {
                                var R = domPN(H);
                                H = R.innerHTML, re(R)
                            } else H = "";
                            ge("wpe_save").innerHTML = getLang("global_save")
                        } else {
                            i.draft ? i.date = intval(t) : cur.postponedLastDate && (i.date = intval(cur.postponedLastDate) + 3600);
                            var j = ge("official"),
                                W = gpeByClass("_submit_post_box", j);
                            if (j && W) {
                                hasClass(W, "as_group") || (checkbox(j), addClass(W, "as_group")), addClass(j, "disabled"), addClass("signed", "shown");
                                var O = window.data(j, "tt");
                                if (O && O.rdBtns) {
                                    var $ = O.rdBtns[1],
                                        K = O.rdBtnsGroup,
                                        V = domData($, "as");
                                    radiobtn($, V, K)
                                }
                            }
                            var $ = ge("send_post");
                            $ && ($.innerHTML = i.lang.profile_wall_postpone_btn)
                        }
                        var X = Math.round((new Date).getTime() / 1e3);
                        intval(i.date) < X && (i.date = X + 3600), hide(domByClass(h.menuNode, "_type_postpone")), B = C;
                        break;
                    case "mark_as_ads":
                        P = '<div class="medadd_h medadd_h_mark_as_ads inl_bl">' + i.lang.global_ads_wall_post_mark_as_ads_action + "</div>", hide(domByClass(h.menuNode, "_type_mark_as_ads")), B = C
                }
                if (l) {
                    var Y = s.chosenMedias,
                        J = Y.length,
                        Z = "";
                    Z = c && 1 === I ? !1 : "photos_list" == a ? se('<div class="page_preview_' + a + "_wrap" + T + '" style="position: relative">' + P + '<div class="page_photos_count">' + t.split(",").length + "</div></div>") : se('<div class="page_preview_' + a + "_wrap" + T + '"' + (o.nocl ? ' style="cursor: default"' : "") + A + ">" + P + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" aria-label="' + getLang("dont_attach") + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + J + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + M + "</div>"), addClass(Z, I ? "fl_l" : "clear_fix"), void 0 !== i.upload_ind && re("upload" + i.upload_ind + "_progress_wrap"), o.toggleLnk && toggle(e, s.attachCount() + 1 < n), c && 1 === I ? (addClass(B, "editable_thumbs_wrap"), B = domLC(B) && hasClass(domLC(B), "editable_thumbs") ? domLC(B) : B.appendChild(ce("div", {
                        id: "thumbs_edit" + u,
                        className: "editable_thumbs"
                    })), stManager.add(["thumbs_edit.css", "thumbs_edit.js"], function() {
                        o.toggleLnk && toggle(e, s.attachCount() + 1 < n), i.editable.remove = s.unchooseMedia.pbind(J), show(domPN(B));
                        var r = ThumbsEdit.convert(a, t, i.editable);
                        domFC(B) ? ThumbsEdit.addMedia(B, r, i) : o.teWidth && o.teHeight ? ThumbsEdit.init(B, [r], {
                            width: o.teWidth,
                            height: o.teHeight,
                            force: !0,
                            onMove: o.onAddMediaChange,
                            onUpdate: o.onChangedSize
                        }) : ThumbsEdit.init(B, [r], {
                            onMove: o.onAddMediaChange,
                            force: !0,
                            onUpdate: o.onChangedSize
                        }), toggleClass(m, "media_preview_has_medias", s.hasVisibleRows()), o.onChangedSize && o.onChangedSize()
                    }, !0)) : (show(B), B.appendChild(Z), _ && (B == w ? stManager.add(["sorter.js"], function() {
                        var e = getXY(w),
                            a = getSize(w),
                            t = function() {
                                w.sorter ? sorter.added(w) : B.childNodes.length > 1 && sorter.init(w, {
                                    onReorder: o.onAddMediaChange
                                })
                            };
                        e[0] || e[1] || a[0] || a[1] ? t() : cur.sorterClbk = t, o.onChangedSize && o.onChangedSize()
                    }, !0) : B == v && stManager.add(["qsorter.js"], function() {
                        v.qsorter ? qsorter.added(v) : B.childNodes.length > 1 && qsorter.init(v, s.qsorterOpts()), o.onChangedSize && o.onChangedSize()
                    }, !0)), o.onChangedSize && o.onChangedSize()), Y.push([a, t, Z, r])
                } else {
                    var J = 0;
                    "postpone" === a ? J = 1 : "mark_as_ads" === a && (J = 2);
                    var Z = se('<div class="' + (I === !1 ? "page_docs_preview" : "page_pics_preview") + (J ? "" : " post_thumbed_media") + '"><div class="page_preview_' + a + '_wrap"' + (o.nocl ? ' style="cursor: default"' : "") + A + ">" + P + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" aria-label="' + getLang("dont_attach") + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + J + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + M + "</div></div>");
                    addClass(Z, I ? "fl_l" : "clear_fix"), void 0 !== i.upload_ind && re("upload" + i.upload_ind + "_progress_wrap"), "postpone" !== a && "mark_as_ads" !== a && (s.chosenMedia = [a, t], s.chosenMediaData = i), s.singleAdded(Z, a)
                }
                "share" == a ? !i.title || r || i.url ? s.showExternalPreview() : (cur.shareShowImg = 0, s.showPreview(!0), s.shareData.images = !1) : "page" == a ? i.nopreview || (cur.shareShowImg = 0, s.shareData = extend(s.shareData || {}, i, {
                    images: !1
                }), s.showPreview()) : "poll" == a ? s.createPoll(i) : "postpone" == a ? s.setupPostpone(i, H) : "mark_as_ads" == a && (s.markAsAds = 1), toggleClass(m, "media_preview_has_medias", s.hasVisibleRows()), o.onChangedSize && o.onChangedSize();
                var G = window.event;
                return G && "click" == G.type && (G.ctrlKey || G.metaKey || G.shiftKey) && s.attachCount() + 1 <= n && (d = !0), cur.fileApiUploadStarted && void 0 !== i.upload_ind || cur.preventBoxHide || d === !0 || inArray(a, ["poll", "share", "page", "postpone", "mark_as_ads"]) || boxQueue.hideLast(), cur.lastPostMsg = !1, o.onMediaAdd && o.onMediaAdd(), cur.onMediaChanged && cur.onMediaChanged(s.chosenMedias), void 0 !== i.upload_ind && delete i.upload_ind, !1
            },
            unchooseMedia: function(a) {
                if (s.onChange && s.onChange(!1, a) === !1) return !1;
                if (l) {
                    if (void 0 === a) {
                        if (window.ThumbsEdit && ThumbsEdit.removeAll("thumbs_edit" + u), each(s.chosenMedias, function(e, a) {
                                a && void 0 !== e && s.unchooseMedia(e)
                            }), s.urlsCancelled = [], o.onChangedSize) {
                            o.onChangedSize();
                            var t = setInterval(o.onChangedSize, 50);
                            setTimeout(clearTimeout.bind(null, t), 500)
                        }
                        return
                    }
                    var i, r = s.chosenMedias;
                    if (r[a]) {
                        switch (r[a][2] ? ((i = geByClass1("page_media_x_wrap", r[a][2], "div")) && i.tt && i.tt.el && i.tt.destroy(), domPN(r[a][2]) == w && w.sorter ? (each(w.sorter.elems, function() {
                            setStyle(this, {
                                top: "auto",
                                left: "auto",
                                cursor: "auto"
                            })
                        }), w.sorter.destroy(), re(r[a][2]), w.childNodes.length > 1 && sorter.init(w, {
                            onReorder: o.onAddMediaChange
                        })) : domPN(r[a][2]) == v && v.qsorter ? (each(v.qsorter.elems, function() {
                            setStyle(domFC(this), {
                                top: "auto",
                                left: "auto"
                            }), setStyle(this, {
                                cursor: "auto"
                            })
                        }), v.qsorter.destroy(), re(r[a][2]), v.childNodes.length > 1 && qsorter.init(v, s.qsorterOpts())) : re(r[a][2])) : ("photo" == r[a][0] || "video" == r[a][0] || "album" == r[a][0]) && window.ThumbsEdit && ThumbsEdit.removeById("thumbs_edit" + u, r[a][0] + r[a][1]), r[a][0]) {
                            case "page":
                            case "share":
                                s.shareData = {}, re(s.sharePreview), hide("medadd_c_linkimg_loader"), clearTimeout(cur.showLoaderTimeout), clearInterval(cur.shareImgInterval), clearTimeout(cur.shareImgInterval2), clearTimeout(cur.imgLoadTimeout), delete s.sharePreview, show(domByClass(h.menuNode, "_type_share")), show(domByClass(e, "media_selector"));
                                break;
                            case "poll":
                                re(s.pollPreview), s.pollPreview = !1, show(domByClass(h.menuNode, "_type_poll"));
                                break;
                            case "map":
                                show(domByClass(h.menuNode, "_type_map"));
                                break;
                            case "market":
                                show(e);
                                break;
                            case "story":
                                show(e);
                                break;
                            case "postpone":
                                var d = geByClass1("medadd_c_timersett", s.postponePreview);
                                cur.editingPost && d ? re(domFC(s.postponePreview)) : re(s.postponePreview), s.postponePreview = !1, removeClass("official", "disabled"), cur.editingPost ? ge("wpe_save").innerHTML = getLang("wall_publish_now") : ge("send_post").innerHTML = getLang("wall_send"), show(domByClass(h.menuNode, "_type_postpone"));
                                break;
                            case "mark_as_ads":
                                show(domByClass(h.menuNode, "_type_mark_as_ads")), s.markAsAds = !1
                        }
                        r[a] = !1
                    }
                    o.toggleLnk && toggle(e, s.attachCount() < n), toggle(g, !!(c ? geByClass1("thumb_wrap", g) : domFC(g))), toggle(v, !!domFC(v)), toggle(w, !!domFC(w)), toggle(b, !!domFC(b)), toggle(f, !!domFC(f)), toggle(k, !!domFC(k)), toggle(C, !!domFC(C)), toggle(p, !!domFC(p))
                } else {
                    var _, i;
                    if (void 0 == a && (a = 0), (i = geByClass("page_media_x_wrap", m, "div")[a]) && i.tt && i.tt.el && i.tt.destroy(), 1 == a && s.postponePreview) {
                        show(geByClass1("add_media_type_" + u + "_postpone", h.menuNode, "a"));
                        var y = domPN(s.postponePreview);
                        window.tooltips && tooltips.destroyAll(y), re(y), s.postponePreview = !1;
                        var x = h.lastTypes;
                        each(h.types, function(e, a) {
                            "postpone" === a[0] && x.push(a)
                        }), h.setItems(x)
                    } else if (2 == a && s.markAsAds) {
                        s.markAsAds = !1;
                        var S = geByClass1("page_preview_mark_as_ads_wrap", m);
                        window.tooltips && S && tooltips.destroyAll(S), re(S);
                        var x = h.lastTypes;
                        each(h.types, function(e, a) {
                            "mark_as_ads" === a[0] && x.push(a)
                        }), h.setItems(x)
                    } else {
                        if (s.postponePreview || s.markAsAds) {
                            for (var y = s.postponePreview && domPN(s.postponePreview), S = s.markAsAds && domPN(geByClass1("page_preview_mark_as_ads_wrap", m)), P = [], M = 0; M < m.childNodes.length; M++) {
                                var T = m.childNodes[M];
                                "DIV" == T.nodeName && T != y && T != S && P.push(T)
                            }
                            each(P, function(e, a) {
                                re(a)
                            });
                            var x = [];
                            each(h.types, function(e, a) {
                                "postpone" === a[0] && s.postponePreview || "mark_as_ads" === a[0] && s.markAsAds || x.push(a)
                            }), h.setItems(x)
                        } else val(m, ""), addClass(m, "med_no_attach"), h.setItems(h.types);
                        s.chosenMedia && (s.chosenMedia = !1, s.chosenMediaData = !1), (_ = s.shareData) && (_.url && s.urlsCancelled.push(_.url), _.initialPattern && s.urlsCancelled.push(_.initialPattern), s.shareData = {}), each([s.sharePreview, s.pollPreview], function() {
                            re(this)
                        }), s.sharePreview = s.pollPreview = !1
                    }
                    o.toggleLnk && show(e)
                }
                if (toggleClass(m, "media_preview_has_medias", s.hasVisibleRows()), cur.onMediaChanged && cur.onMediaChanged(r), cur.lastPostMsg = !1, s.onChange && s.onChange(!1), o.onChangedSize) {
                    o.onChangedSize();
                    var t = setInterval(o.onChangedSize, 50);
                    setTimeout(clearTimeout.bind(null, t), 500)
                }
            },
            singleAdded: function(a, t) {
                "postpone" === t ? m.appendChild(a) : "mark_as_ads" === t ? s.postponePreview ? m.insertBefore(a, domLC(m)) : m.appendChild(a) : domFC(m) ? m.insertBefore(a, domFC(m)) : m.appendChild(a), removeClass(m, "med_no_attach");
                var i = [];
                each(h.lastTypes, function(e, a) {
                    ("postpone" !== a[0] || !s.postponePreview && "postpone" !== t) && ("mark_as_ads" !== a[0] || !s.markAsAds && "mark_as_ads" !== t) && (inArray(t, ["postpone", "mark_as_ads"]) || inArray(a[0], ["postpone", "mark_as_ads"])) && i.push(a)
                }), h.setItems(i), o.toggleLnk && !i.length && hide(e)
            },
            getMedias: function() {
                if (l) {
                    var e = window.ThumbsEdit ? ThumbsEdit.getMedias("thumbs_edit" + u) : [],
                        a = {},
                        t = s.chosenMedias || [],
                        o = [],
                        i = function(e, t, i) {
                            return i[0] + i[1] == e ? (o.push(i), a[e] = !0, !1) : void 0
                        };
                    return each(e, function(e, a) {
                        each(t, i.pbind(a[0] + a[1]))
                    }), each(v.childNodes, function(e, a) {
                        var o = (a.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                        o && each(t, i.pbind(o[1] + o[2]))
                    }), each(w.childNodes, function(e, a) {
                        var o = (a.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                        o && each(t, i.pbind(o[1] + o[2]))
                    }), each(t, function(e, t) {
                        t && isArray(t) && t.length && !a[t[0] + t[1]] && o.push(t)
                    }), o
                }
                var t = s.chosenMedia;
                return t ? [t[0] + t[1]] : []
            },
            showPhoto: function(e, a, t, o) {
                !cur.pvData || cur.pvShown && cur.pvListId == a || delete cur.pvData[a];
                for (var i in ajaxCache) i.toString().match(/^\/al_photos\.php\#act=show&draft_photos/) && delete ajaxCache[i];
                var r = s.getMedias(),
                    d = [];
                return each(r, function(e, a) {
                    a && "photo" == a[0] && d.push(a[1] + "/" + (s.phLists[a[1]] || ""))
                }), t.additional = {}, t.additional.open_pe = intval(cur.openEditor), cur.openEditor || (t.additional.draft_photos = d.join(";")), delete cur.openEditor, showPhoto(e, a, extend(t, {
                    queue: 1
                }), o)
            },
            showMediaProgress: function(a, t, i) {
                if (s.onProgress && s.onProgress(a, t, i) === !1) return !1;
                var r = i.loaded / i.total,
                    d = intval(100 * r),
                    c = (i.fileName || i.name || "").replace(/[&<>"']/g, ""),
                    _ = c ? t + "_" + c : t,
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
                        w = '          <div class="fl_l">             <div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">               <div id="upload' + _ + '_progress" class="page_attach_progress ui_progress">                 <div class="ui_progress_back"></div>                 <div class="ui_progress_bar"></div>               </div>             </div>           </div>' + v + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [16, 8, 8], black: 1})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + t + ", '" + (c || t) + "', this);\"></div>";
                    if (l) p.appendChild(ce("div", {
                        id: "upload" + _ + "_progress_wrap",
                        innerHTML: w,
                        className: "clear_fix upload_" + t + "_progress"
                    }, {
                        marginTop: "6px"
                    })), show(p), o.toggleLnk && toggle(e, s.attachCount() < n);
                    else {
                        var b = ce("div", {
                            id: "upload" + _ + "_progress_wrap",
                            innerHTML: w,
                            className: "clear_fix upload_" + t + "_progress"
                        });
                        s.chosenMedia = "progress", s.singleAdded(b, "progress")
                    }
                    o.onChangedSize && o.onChangedSize(), m = ge("upload" + _ + "_progress");
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
                var a, t = e.question ? "" : "1px",
                    o = [];
                e[22] ? "disabled" : "", e[8] ? "" : "disabled";
                s.pollPreview = b.appendChild(ce("div", {
                    className: "medadd_c medadd_c_poll",
                    innerHTML: '<input onkeydown="cur.addMedia[' + u + '].keyPoll(this, event)" class="text dark medadd_c_pollq" id="create_poll_question' + u + '" value="' + (e.question || "") + '" /><div class="medadd_c_pollh">' + e.lang.a + '</div><div class="medadd_c_pollans" id="create_poll_answers' + u + '"></div><div class="medadd_c_polladd_wr" id="create_poll_add' + u + '">  <div class="medadd_c_polladd fakeinput dark" onclick="cur.addMedia[' + u + '].incPoll()">' + e.lang.i + "</div></div>" + (e.edit ? "" : '<div class="checkbox medadd_c_pollcb' + (e.anon ? " on" : "") + '" id="create_poll_anonymous' + u + '" onclick="checkbox(this);cur.addMedia[' + u + '].changedPoll();">' + e.lang.c + "</div>") + (e.pollSettings || "")
                })), e.answers || (e.answers = [
                    [0, ""],
                    [0, ""]
                ]), cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text dark medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem" data-title="' + e.lang.d + '" aria-label="' + e.lang.d + '" role="button" onmouseover="showTitle(this)" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
                for (var i = 0, r = e.answers.length; r > i; ++i) a = e.answers[i], o.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
                    attrs: (a[0] ? 'id="create_poll_ans' + a[0] + '" ' : "") + (a[1] ? '" value="' + a[1] + '" ' : ""),
                    lnkid: u
                }) + "</div>"), 9 == i && hide("create_poll_add" + u);
                return val("create_poll_answers" + u, o.join("")), e.question ? void elfocus("create_poll_question" + u) : (s.pollPreview.style.height = t, void animate(s.pollPreview, {
                    height: 166
                }, 200, function() {
                    s.pollPreview.style.height = "auto", elfocus("create_poll_question" + u)
                }))
            },
            incPoll: function() {
                var e = ge("create_poll_answers" + u),
                    a = e.childNodes.length,
                    t = o.pollLimit || 10;
                t > a && elfocus(geByTag1("input", e.appendChild(ce("div", {
                    className: "medadd_c_polla_wr",
                    innerHTML: rs(cur.pollAnswerTemplate, {
                        attrs: "",
                        lnkid: u
                    })
                })))), toggle("create_poll_add" + u, t - 1 > a)
            },
            decPoll: function(e) {
                e.tt && e.tt.el && e.tt.destroy(), re(domPN(e)), show("create_poll_add" + u)
            },
            keyPoll: function(e, a) {
                if (a = a || window.event, a && (10 == a.keyCode || 13 == a.keyCode || 9 == a.keyCode)) {
                    var t = hasClass(e, "medadd_c_pollq"),
                        o = a.shiftKey;
                    if (o && t) return;
                    var i = t ? domFC(domNS(domNS(e))) : (o ? domPS : domNS)(domPN(e));
                    return i ? elfocus(geByTag1("input", i)) : o ? elfocus(geByClass1("medadd_c_pollq", domPN(domPN(domPN(e))))) : this.incPoll(), cancelEvent(a)
                }
                s.changedPoll()
            },
            changedPoll: function() {
                o.onMediaChange && o.onMediaChange()
            },
            pollData: function(e) {
                for (var a, t = ge("create_poll_answers" + u), o = trim(val("create_poll_question" + u)), i = {
                        media: o,
                        anonymous: isChecked("create_poll_anonymous" + u)
                    }, s = 0, r = !1, d = domFC(t); d; d = domNS(d))
                    if (a = trim(val(domFC(d)))) {
                        var n = -intval((domFC(d).id.match(/^create_poll_ans(\d+)$/) || [0, -s++])[1]);
                        i["answers[" + n + "]"] = a, r = !0
                    }
                return o ? r ? i : (domFC(t) || cur.addMedia[u].incPoll(),
                    e !== !0 && notaBene(domFC(domFC(t))), !1) : (e !== !0 && notaBene("create_poll_question" + u), !1)
            },
            urlsCancelled: [],
            shareData: {},
            checkMessageURLs: function(e, a, t) {
                if (!(cur.noCheckMessageURLs || s.chosenMedia || s.urlAttachmentLoading && s.urlAttachmentLoading[0] > vkNow() - 1e4 || s.attachCount() >= n)) {
                    if (cur.checkMessageHandler && isFunction(cur.checkMessageHandler) && cur.checkMessageHandler(e), cur.reply_to && cur.reply_to[0]) {
                        var o = Wall.getReplyName(cur.reply_to[0]);
                        if (o && isArray(o) && o[1] && (o = o[1]), o) {
                            var i = extractUrls(o, a);
                            for (var r in i) {
                                var d = i[r].url;
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
                            if (h.match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/i) && (u = _.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video)|w=(page|product))(-?\d+_)?\d+|app\d+_-\d+|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|\?w\=story(\d+)_(\d+)$|stor(y|ies)(\d+)_(\d+)$|^(\/dev)?\/blog\/.+$|^\/jobs\?w=job\d+$|^\/landings\/.+$|\?w\=vk10\_years(\d+)$|^\/messenger$|^\/bestgames2016$|^\/ads(\/([a-zA-Z0-9\_]+))?$|^http:\/\/instagram\.com\/p\/.+/) ? !0 : !1), u) return void s.checkURL(p, t)
                        }
                    }
                }
            },
            clearCheckURL: function() {
                clearTimeout(cur.checkURLTO), re(s.urlAttachmentLoading[2]), l ? toggle(p, p.childNodes > 0) : toggleClass(m, "med_no_attach", !m.childNodes), s.urlAttachmentLoading = !1, setStyle(bodyNode, {
                    cursor: "default"
                })
            },
            onCheckURLDone: function(e, a, t) {
                var i = "";
                a = a || {}, s.urlAttachmentLoading && (i = s.urlAttachmentLoading[1], s.clearCheckURL()), e ? s.chooseMedia(t[0], t[1], extend({}, t[2], a), i, !0) : ((o.onCheckURLDone || function() {})(e, t), (a.onError || function() {})(t))
            },
            checkURL: function(e, a, t) {
                if (t = t || {}, !e) return void(t.onError || function() {})();
                s.urlsCancelled.push(e), s.urlAttachmentLoading = [vkNow(), e], re(s.checkURLForm), s.checkURLForm = ce("div", {
                    innerHTML: '<iframe name="share_parse_iframe' + u + '"></iframe>'
                }), utilsNode.appendChild(s.checkURLForm);
                var i = s.checkURLForm.appendChild(ce("form", {
                    action: "share.php?act=url_attachment",
                    method: "post",
                    target: "share_parse_iframe" + u
                }));
                each({
                    hash: cur.share_timehash || ((cur.options || {}).share || {}).timehash || "",
                    allowed_share_buttons: ((cur.options || {}).share || {}).allowed_buttons || "",
                    index: u,
                    url: e,
                    to_mail: o.mail ? 1 : ""
                }, function(e, a) {
                    i.appendChild(ce("input", {
                        type: "hidden",
                        name: e,
                        value: a
                    }))
                }), setStyle(bodyNode, {
                    cursor: "wait"
                }), window.onUploadDone = s.onCheckURLDone.pbind(!0, t), window.onUploadFail = s.onCheckURLDone.pbind(!1, t), a && (cur.checkURLTO = setTimeout(function() {
                    s.urlAttachmentLoading.length > 0 && s.clearCheckURL()
                }, a)), i.submit()
            },
            addPreview: function(e) {
                return s.sharePreview = f.appendChild(ce("div", {
                    className: "medadd_c medadd_c_link",
                    innerHTML: '<div class="medadd_c_linkcon"><div></div>' + (e ? '<div class="medadd_c_linkprg">' + getProgressHtml("", "medadd_c_linkprg_inner") + "</div>" : "") + "</div>"
                }))
            },
            shareImgUrl: function(e) {
                var a = s.shareData;
                if (a.images_proxy && a.images_proxy[e]) return a.images_proxy_url + a.images_proxy[e];
                if (a.images) {
                    var t = a.images[e];
                    return isArray(t) && (t = t[0] ? t[0] : ""), t
                }
                return ""
            },
            showPreview: function(e) {
                function t(e) {
                    if (!e || e.inlineEdit) return !1;
                    var a = getSize(e),
                        t = gpeByClass("medadd_inline_editable", e);
                    e.inlineEdit = !0, addClass(t, "medadd_inline_editing");
                    var o = ce("textarea", {
                            className: "medadd_inline_edit"
                        }, {
                            width: a[0],
                            height: a[1]
                        }),
                        i = parseInt(e.getAttribute("data-max-length"));
                    i && o.setAttribute("maxlength", i);
                    var r = e.getAttribute("data-field");
                    val(o, s.shareData[r]), val(e, ""), e.appendChild(o);
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
                    t.appendChild(d);
                    var n = a[1];
                    elfocus(o), o.onblur = function() {
                        re(d), s.shareData[r] = val(o), val(e, clean(val(o)).replace(/\n/g, "<br>") || C[r].placeholder), removeClass(t, "medadd_inline_editing"), e.inlineEdit = !1
                    };
                    var l = function() {
                        var e = clean(val(o) + " M").replace(/\n/g, "<br>");
                        if (val(d, e), !(e.length >= i)) {
                            var a = getSize(d);
                            n != a[1] && (n = a[1], animate(o, {
                                height: a[1]
                            }, 200))
                        }
                    };
                    addEvent(o, "click keyup change", l), setTimeout(l, 0)
                }
                var i, r, d = s.shareData,
                    n = s.sharePreview || s.addPreview();
                if (d.images && (i = d.images[cur.shareShowImg], r = !(!s.bigLink && !d.big_link)), d.failed) var l = getLang("page_not_loaded");
                else {
                    var c = "",
                        _ = clean(s.shareImgUrl(cur.shareShowImg));
                    if (d.images && d.images[cur.shareShowImg] && _) {
                        var h = d.images[cur.shareShowImg];
                        if (d.images.length > 0) {
                            var p = !(!cur.options.share || !cur.options.share.allow_custom_photo),
                                u = p && !(cur.options.share && cur.options.share.require_image),
                                m = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_choose_own_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                g = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_remove_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                v = isArray(h) && 1 == h.length,
                                w = d.media && "_" != d.media && p ? '<div class="medadd_c_linkimg_controls">  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_l">' + (d.images.length > 1 ? '    <div class="medadd_c_linkimg_controls_btn_arrows_group">      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_left" onclick="cur.shareShowNext(true);"></div>      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_right" onclick="cur.shareShowNext();"></div>    </div>' : "") + '    <div class="medadd_c_linkimg_controls_btn ' + (d.images.length > 1 ? "medadd_c_btn_side_padd" : "") + '" id="medadd_ctrl_upload" ' + m + " onclick=\"Page.ownerPhoto('" + d.media + "');\"></div>  </div>" + (u ? '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_r">    <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_remove" ' + g + ' onclick="tooltips.hide(this);cur.removeLinkImage(this)"></div>  </div>' : "") + "</div>" : "",
                                b = (i ? "" : "display: none") + ";background-image:url(" + _ + ")";
                            c = '<div class="medadd_c_linkimg_container ' + (f && f.offsetWidth > 550 ? "medadd_c_linkimg_container_wide" : "") + '" style="' + b + '">' + c + (v ? '<div class="medadd_c_linkimg_button"><button class="flat_button secondary_dark" onclick="Page.ownerPhoto(\'' + d.media + "');\">" + getLang("global_link_choose_own_photo") + "</button></div>" : "") + w + '<div id="medadd_c_linkimg_loader" class="medadd_c_linkimg_loader">' + getProgressHtml("", "inv medadd_c_linkimg_loader_inner") + "</div></div>"
                        }
                    }
                    var k = "";
                    d.microdata && d.microdata_preview_html && (k = d.microdata_preview_html);
                    var C = (d.description_short || d.description, {
                            title: {
                                placeholder: '<span class="medadd_inline_placeholder">' + getLang("global_link_edit_title") + "</span>",
                                editable: cur.options.share && cur.options.share.allow_edit_title
                            },
                            description: {
                                placeholder: '<span class="medadd_inline_placeholder">' + getLang("global_link_edit_desc") + "</span>",
                                editable: cur.options.share && cur.options.share.allow_edit_desc
                            }
                        }),
                        y = d.shareButtons,
                        x = d.button_text || y && y.length && y[0][1],
                        S = d.button_text_lang || y && y.length && y[0][2],
                        P = d.button_action || y && y.length && y[0][0];
                    if (y && y.length && S === x)
                        for (var M = 0; M < y.length; ++M)
                            if (y[M][0] === P && y[M][2] === x) {
                                x = y[M][1];
                                break
                            }
                    var T = !!y && y.length,
                        I = !(!cur.options.share || !cur.options.share.allow_remove_button),
                        l = c + '<div class="medadd_c_linkwrap ' + (c ? "" : "no_photo") + '"><div class="medadd_c_linkwrap_block">' + (d.title || C.title.editable ? '<div class="medadd_c_linkhead ' + (C.title.editable ? "medadd_inline_editable" : "") + '">' + (C.title.editable ? '<div class="medadd_inline_editable_icon"></div>' : "") + '<span class="medadd_inline_edit_target" data-max-length="' + (cur.options.share && cur.options.share.max_title_len ? cur.options.share.max_title_len : 0) + '" data-field="title">' + (clean(d.title).replace(/\n/g, "<br>") || C.title.placeholder) + "</span></div>" : "") + (k ? '<div class="medadd_c_linkmicrodata">' + k + "</div>" : "") + (d.domain ? '<div class="page_media_link_url medadd_c_linkaddr">' + d.domain + "</div>" : "") + "</div>" + (S && T ? '<div class="medadd_c_linkwrap_block medadd_c_linkwrap_block_button">' + (I ? '<div class="hide_icon medadd_c_linkbtn_remove" onclick="cur.shareRemoveButton();" onmouseover="showTooltip(this, {text: \'' + getLang("global_share_button_remove_tooltip") + "', black: 1, shift: [15, 10, 0]})\"></div>" : "") + '<div class="wall_postlink_preview_btn medadd_c_linkbtn"><a onclick="cur.toggleShareButton(this);return false;" onmouseout="Page.actionsDropdownHide(domNS(this), 0, cur.setActiveShareButton.pbind(false))" onmouseover="Page.actionsDropdownUnhide()" class="flat_button"><span onmouseover="Page.actionsDropdownUnhide()" class="' + (y.length > 1 ? "page_actions_dd_label" : "") + ' wall_postlink_preview_btn_label" data-field="button_text">' + S + "</span></a></div></div>" : "") + '</div><div class="clear_fix"></div>'
                }
                if (r ? addClass(domFC(n), "medadd_c_linkimg_big") : removeClass(domFC(n), "medadd_c_linkimg_big"), e) cur.preventShareAnim && (cur.preventShareAnim.stop(), clearInterval(cur.animateUpdateInterval), o.onChangedSize && o.onChangedSize()), val(domFC(n), l), domFC(n).style.height = "auto", shortCurrency();
                else {
                    !isVisible(f);
                    show(f);
                    var B = ge(a).appendChild(ce("div", {
                            innerHTML: '<div class="medadd_c_linkcon ' + (r ? "medadd_c_linkimg_big" : "") + '">' + l + "</div>"
                        }, {
                            position: "absolute",
                            width: getSize(n)[0] - 10,
                            visibility: "hidden"
                        })),
                        A = getSize(B)[1];
                    re(B), setStyle(domFC(n), {
                        height: "0"
                    }), setStyle(n, {
                        overflow: "hidden"
                    }), val(domFC(n), l), shortCurrency(), cur.animateUpdateInterval = setInterval(function() {
                        o.onChangedSize && o.onChangedSize()
                    }, 100), cur.preventShareAnim = animate(domFC(n), {
                        height: A
                    }, 200, function() {
                        setStyle(domFC(n), {
                            height: "auto",
                            display: ""
                        }), setStyle(n, {
                            overflow: ""
                        }), clearInterval(cur.animateUpdateInterval), o.onChangedSize && o.onChangedSize()
                    }), re(geByClass1("medadd_c_linkprg", f))
                }
                if (C.title.editable) {
                    var N = geByClass1("medadd_c_linkhead", domFC(n)),
                        L = geByClass1("medadd_inline_edit_target", N);
                    N && L && (N.onclick = t.bind(this, L))
                }
                if (C.description.editable) {
                    var D = geByClass1("medadd_inline_edit_target", geByClass1("medadd_c_linkdsc", domFC(n)));
                    D && (D.onclick = t.bind(this, D))
                }
                if (T && (s.shareData.button_text = x, s.shareData.button_text_lang = S, s.shareData.button_action = P, y.length > 1)) {
                    var U = domPN(geByClass1("wall_postlink_preview_btn_label", domFC(n))),
                        E = [],
                        z = 0,
                        F = 0,
                        q = [];
                    for (var M in y) {
                        var H = y[M];
                        H[0] == P && H[1] == x && (z = F), E.push([F++, H[1]]), q.push('<a class="page_actions_item" tabindex="0" role="link" onclick="cur.updateShareButton(this);Page.actionsDropdownHide(domPN(domPN(this)), 1, cur.setActiveShareButton.pbind(false));return false;" data-button-text="' + H[1] + '" data-button-text-lang="' + H[2] + '" data-button-action="' + H[0] + '">' + H[2] + "</a>")
                    }
                    U.setAttribute("data-items", JSON.stringify(E)), U.setAttribute("data-value", z);
                    var R = ['<div class="page_actions_wrap medadd_c_linkbtn_actions_wrap unshown" onmouseout="Page.actionsDropdownHide(this, 0, cur.setActiveShareButton.pbind(false))" onmouseover="Page.actionsDropdownUnhide()" onmouseup="setTimeout(function () { Page.actionsDropdownUnhide(); }, 5)">', '<div class="page_actions_inner">', q.join(""), "</div>", "</div>"].join("");
                    domPN(U).appendChild(se(R)), ls.get("share_button_text_tooltip_shown") || cur.buttonTextTooltip || setTimeout(function() {
                        cur.closeButtonTextTooltip = function() {
                            cur.buttonTextTooltip.hide(), ls.set("share_button_text_tooltip_shown", 1)
                        };
                        var e = geByClass1("wall_postlink_preview_btn_label", domFC(n)),
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
            showExternalPreview: function() {
                var a = s.shareData;
                a.images || (a.images = []);
                var t = [],
                    i = [],
                    r = {};
                each(a.images, function(e, o) {
                    r[o] || (r[o] = !0, t.push(o), a.images_proxy && i.push(a.images_proxy[e]))
                }), a.uniqueImagesCount = t.length, a.images = t, a.images_proxy = i;
                var d;
                if (d = f && f.offsetWidth > 550 ? isRetina() ? "/images/post_snippet_image_placeholder_w_2x.png" : "/images/post_snippet_image_placeholder_w.png" : isRetina() ? "/images/post_snippet_image_placeholder_2x.png" : "/images/post_snippet_image_placeholder.png", a.placeholder_inserted || (a.images.push([(cur.options.share || {}).allow_custom_photo ? d : ""]), a.placeholder_inserted = !0), !a.images || !a.images.length) return cur.shareShowImg = 0, void s.showPreview();
                cur.shareShowImg = 0, cur.shareShowImg--, s.addPreview(!0), a.imagesStyles = {};
                var n = !1;
                cur.shareSetOwnPhoto = function(e) {
                    curBox() && curBox().hide(), s.bigLink = !0, a.images[a.images.length - 1] = [e.photo_url, e.user_id, e.photo_id], cur.shareShowNext(0, 1)
                }, cur.shareClearOwnPhoto = function() {
                    a.images[a.images.length - 1] = [], cur.shareShowNext(0, 0, 1)
                }, cur.removeLinkImage = function(e) {
                    var a = gpeByClass("medadd_c_linkcon", e);
                    addClass(a, "no_photo"), removeClass(a, "medadd_c_linkimg_big"), re(gpeByClass("medadd_c_linkimg_container", e)), setStyle(a, "height", ""), s.shareData.noPhoto = !0
                }, cur.shareRemoveButton = function() {
                    var a = s.sharePreview;
                    window.tooltips && tooltips.destroyAll(a), re(geByClass1("medadd_c_linkwrap_block_button", a)), s.shareData.button_text = "", s.shareData.button_text_lang = "", s.shareData.button_action = "", show(domByClass(e, "media_selector"))
                }, cur.updateShareButton = function(e) {
                    var a = e.getAttribute("data-button-text"),
                        t = e.getAttribute("data-button-text-lang"),
                        o = e.getAttribute("data-button-action");
                    s.shareData.button_text = a, s.shareData.button_text_lang = t, s.shareData.button_action = o;
                    var i = s.sharePreview;
                    return val(geByClass1("page_actions_header_inner", i), t), val(geByClass1("wall_postlink_preview_btn_label", i), t), !1
                }, cur.setActiveShareButton = function(e) {
                    var a = s.sharePreview,
                        t = e ? addClass : removeClass;
                    t(domPN(geByClass1("wall_postlink_preview_btn_label", a)), "active")
                }, cur.toggleShareButton = function(e) {
                    hasClass(e, "active") ? (Page.actionsDropdownHide(domNS(e), 1), cur.setActiveShareButton(!1)) : (Page.actionsDropdown(domNS(e)), cur.setActiveShareButton(!0))
                }, cur.shareShowNext = function(e, t, i) {
                    var r = vkImage();
                    cur.prevShareShowDir = e, i || (t ? cur.shareShowImg = a.images.length - 1 : e ? cur.shareShowImg -= 1 : cur.shareShowImg += 1);
                    var l = isArray(a.images[a.images.length - 1]) && !!a.images[a.images.length - 1][0];
                    if (!l && cur.shareShowImg > a.images.length - 2) cur.shareShowImg = 0;
                    else if (cur.shareShowImg > a.images.length - 1) cur.shareShowImg = 0;
                    else if (!l && cur.shareShowImg < 0) cur.shareShowImg = a.images.length - 2;
                    else if (cur.shareShowImg < 0) cur.shareShowImg = a.images.length - 1;
                    else if (0 == cur.shareShowImg)
                        for (var c = 1; c < a.images.length - 1; c++) {
                            var _ = vkImage();
                            _.src = s.shareImgUrl(c)
                        }
                    if (!a.images.length || isEmpty(a.images) || void 0 === a.images[cur.shareShowImg]) return s.showPreview(n), void(n = !0);
                    var h = s.shareImgUrl(cur.shareShowImg);
                    h && (r.src = h), isArray(a.images[cur.shareShowImg]) && a.images[cur.shareShowImg][1] && a.images[cur.shareShowImg][2] ? (a.user_id = a.images[cur.shareShowImg][1], a.photo_id = a.images[cur.shareShowImg][2], a.share_own_image = !0) : (a.user_id = void 0, a.photo_id = void 0, a.share_own_image = !1);
                    var p = null;
                    h && (cur.imgLoadTimeout = p = setTimeout(function() {
                        cur.shareImgInterval !== !0 && (isArray(a.images[cur.shareShowImg]) || (a.images.splice(cur.shareShowImg, 1), a.images_proxy && a.images_proxy.length > cur.shareShowImg && a.images_proxy.splice(cur.shareShowImg, 1), cur.shareShowNext()))
                    }, 5e3));
                    var u = setTimeout(function() {
                        show("medadd_c_linkimg_loader"), u = null, o.onChangedSize && o.onChangedSize()
                    }, 100);
                    cur.showLoaderTimeout = u;
                    var m = function() {
                        if (r.width || r.height || !h) {
                            var e = r.width,
                                t = r.height,
                                i = "",
                                l = "";
                            if (p && (clearTimeout(p), p = null), u && (clearTimeout(u), u = null), hide("medadd_c_linkimg_loader"), clearInterval(cur.shareImgInterval), !isArray(a.images[cur.shareShowImg]) && (150 > e || 67 > t)) {
                                if (a.images.splice(cur.shareShowImg, 1), a.images_proxy && a.images_proxy.length > cur.shareShowImg && a.images_proxy.splice(cur.shareShowImg, 1), a.images.length) return setTimeout(cur.shareShowNext.pbind(0, 0, 1), 0)
                            } else {
                                var c = 5,
                                    _ = e >= 537 - c && t >= 240 - c,
                                    m = _ || !!a.big_link;
                                if (cur.options.share && cur.options.share.force_big_link && !_) {
                                    a.images.splice(cur.shareShowImg, 1), a.images_proxy.splice(cur.shareShowImg, 1);
                                    var g = (cur.options.share || {}).allow_custom_photo || (cur.options.share || {}).require_image;
                                    return 0 == a.images.length && g && a.images.push([g ? d : ""]), cur.prevShareShowDir || cur.shareShowImg--, void cur.shareShowNext(cur.prevShareShowDir)
                                }
                                s.bigLink = m, m ? i = "width: 100%;" : (e > 150 && (t = 150 * t / e, e = 150), i = "width: " + e + "px; height: " + t + "px;")
                            }
                            a.images.length > 1 && (l = ""), a.imagesStyles[cur.shareShowImg] = 'style="' + i + '"' + l, s.showPreview(n), n = !0, o.onAddMediaChange && o.onAddMediaChange("share", a.media, a)
                        }
                    };
                    clearInterval(cur.shareImgInterval), cur.shareImgInterval = setInterval(m, 300), cur.shareImgInterval2 = setTimeout(m, 0)
                }, cur.shareShowNext()
            },
            uploadShare: function(e) {
                var a = s.shareData,
                    t = s.sharePreview,
                    o = t.appendChild(ce("div", {
                        innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + u + '"></iframe>'
                    })),
                    i = o.appendChild(ce("form", {
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
                    i.appendChild(ce("input", {
                        type: "hidden",
                        name: e,
                        value: a
                    }))
                }), window.onUploadDone = function(a, i) {
                    window.onUploadFail = window.onUploadDone = function() {}, t.removeChild(o), s.shareData = extend(s.shareData, {
                        user_id: i.user_id,
                        photo_id: i.photo_id,
                        photo_url: r
                    }), setTimeout(e, 0)
                }, window.onUploadFail = function(a, i) {
                    window.onUploadFail = window.onUploadDone = function() {}, t.removeChild(o), s.shareData.share_upload_failed = 1, setTimeout(e, 0)
                }, cur.shareLastParseSubmitted = vkNow(), i.submit()
            },
            setupPostpone: function(e, a) {
                var t;
                t = l || C ? C : domPN(geByClass1("page_preview_postpone_wrap", m));
                var i = cur.editingPost && "wpe_media_preview" == domPN(t).id,
                    r = i || !l ? "" : "1px",
                    d = !1,
                    n = '<div class="clear_fix"><div class="fl_l"><input type="hidden" id="postpone_date' + u + '" value="' + (e.date || "") + '" /></div><div class="fl_l medadd_c_timerat">' + e.lang.profile_wall_postpone_at + '</div><div class="fl_l"><input type="hidden" id="postpone_time' + u + '"/></div></div>';
                cur.editingPost && void 0 != e.friends_only ? (n += '<div class="medadd_c_timersett">', void 0 != e.status_export && (n += '<div class="checkbox_status_export' + (e.status_export ? " on" : "") + ' fl_l" id="status_export' + u + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_twitter + "', black: 1, shift: [12,4,0]});\"></div>"), void 0 != e.facebook_export && (n += '<div class="checkbox_facebook_export' + (e.facebook_export ? " on" : "") + ' fl_l" id="facebook_export' + u + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_facebook + "', black: 1, shift: [12,4,0]});\"></div>"), n += '<div class="checkbox' + (e.friends_only ? " on" : "") + ' fl_l" id="friends_only' + u + '" onclick="checkbox(this);checkbox(\'status_export' + u + "',!isChecked(this));checkbox('facebook_export" + u + "',!isChecked(this));\">" + e.lang.friends_only + "</div></div>", d = !0) : cur.editingPost && a && (n += a, d = !0), s.postponePreview = t.appendChild(ce("div", {
                    className: "medadd_c medadd_c_timer clear_fix" + (d ? " medadd_c_nofixed" : ""),
                    innerHTML: n
                })), s.postponePreview.style.height = r, stManager.add(["ui_controls.css", "ui_controls.js", "datepicker.css", "datepicker.js"], function() {
                    new Datepicker("postpone_date" + u, {
                        time: "postpone_time" + u,
                        width: 155,
                        noPast: !0,
                        minStep: 1,
                        onUpdate: o.onMediaChange
                    }), !i && l && animate(s.postponePreview, {
                        height: 33
                    }, 200, function() {
                        s.postponePreview.style.height = ""
                    })
                })
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
                    onReorder: o.onAddMediaChange,
                    clsUp: "pam_dpic_up"
                }
            },
            resized: function() {
                window.ThumbsEdit && ThumbsEdit.setWide("thumbs_edit" + cur.wallEditComposer.addMedia.lnkId), v.qsorter && (v.qsorter.destroy(), qsorter.init(v, s.qsorterOpts()))
            }
        }, cur.addMedia || (cur.addMedia = {}), cur.addMedia[u] = s, o.onAddMediaChange && (s.onChange = o.onAddMediaChange), s
    }
}
try {
    stManager.done("ui_media_selector.js")
} catch (e) {}