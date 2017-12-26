var Photoview = {
        MIN_WIDTH: 600,
        MIN_HEIGHT: 450,
        PE_MIN_WIDTH: 750,
        PE_MIN_HEIGHT: 500,
        PE_MIN_WIDTH_1APRIL: 400,
        PE_MIN_HEIGHT_1APRIL: 550,
        SIDE_COLUMN_WIDTH: 310,
        SIDE_MIN_GAP: 40,
        VERTICAL_MIN_GAP: 15,
        BOTTOM_BAR_HEIGHT: 52,
        SIDE_NAV_PANELS_MAX_WIDTH: 120,
        SIDE_NAV_PANELS_MIN_WIDTH: 25,
        LEFT_RIGHT_NAV_RATIO: .25,
        blank: "/images/blank.gif",
        blankf: function() {},
        cacheSize: 3,
        allSizes: ["x", "y", "z", "w"],
        photoSize1April: ["a"],
        PE_V1: 1,
        PE_V2: 2,
        PE_V3: 4,
        changeThumbs: function(o, e, t) {
            if (o) {
                var r = [ge("photo_row" + cur.filterPhoto), ge("photos_add_thumb" + cur.filterPhoto)],
                    a = geByClass("page_post_thumb_wrap");
                a.push.apply(a, geByClass("page_preview_photo")), a.push.apply(a, geByClass("im_preview_photo")), a.push.apply(a, geByClass("photo")), a.push.apply(a, geByClass("page_square_photo")), a.push.apply(a, geByClass("photos_row"));
                for (var i in a) {
                    var p = a[i].getAttribute("onclick");
                    if (!p) {
                        var s = domFC(a[i]);
                        p = s ? s.getAttribute("onclick") : !1
                    }
                    p && -1 != p.indexOf("'" + cur.filterPhoto + "'") && r.push(a[i])
                }
                for (var i in r)
                    if (r[i]) {
                        if (hasClass(r[i], "page_square_photo") || r[i].style.backgroundImage) {
                            setStyle(r[i], {
                                backgroundImage: "url(" + o + ")"
                            });
                            continue
                        }
                        var v = geByTag1("img", r[i]);
                        v && (v.src = o, setStyle(v, {
                            height: "auto"
                        }))
                    }
                if (cur.pvNoTemp || (cur.pvNoTemp = {}), cur.pvNoTemp[cur.filterPhoto] = !0, window.ThumbsEdit && e) {
                    var s = ThumbsEdit.cache();
                    for (var i in s) {
                        var n = s[i].previews || [],
                            c = !1;
                        for (var u in n) "photo" == n[u].type && n[u].photo.id == "photo" + t && (n[u].photo.sizes = e, c = !0);
                        c && ThumbsEdit.refresh(i)
                    }
                }
            }
        },
        openStickersEditor: function(o) {
            cur.pvEditorMode || (o || (o = cur.pvCurPhoto), Photoview.toggleNavControls(), hide(cur.pvLikeFSWrap), Photoview.hideTag(!0), cur.pvEditorMode = !0, cur.pvEditorSaved = !1, Photoview.updatePhotoDimensions(), stManager.add(["spe.js"], function() {
                SPE.init(o, function(e, t, r, a) {
                    var i = e.id != o.id;
                    if (cur.pvEditorSaved = !0, o.closeOnPEEdit) {
                        if (e && t && window.ThumbsEdit && r) {
                            var p = ThumbsEdit.cache();
                            for (var s in p) {
                                var v = s.replace("thumbs_edit", ""),
                                    n = cur.addMedia[v],
                                    c = p[s].previews || [],
                                    u = !1,
                                    l = 0;
                                for (var d in c) {
                                    if ("photo" == c[d].type && c[d].photo.id == "photo" + o.id) {
                                        var h = c[d].photo;
                                        if (i) {
                                            h.id = e.id, h.pid = e.id.split("_")[1];
                                            var g = ({
                                                editable: {
                                                    sizes: r
                                                },
                                                thumb_m: r.m,
                                                thumb_s: r.s,
                                                view_opts: a
                                            }, n.getMedias());
                                            each(g, function() {
                                                return "photo" == this[0] && this[1] == o.id ? (this[1] = e.id, !1) : void 0
                                            })
                                        }
                                        c[d].click = n.showPhoto.pbind(e.id, e.list, parseJSON(a)), h.sizes = r, u = !0
                                    }
                                    l++
                                }
                                u && (ThumbsEdit.refresh(s), n.onChange && n.onChange())
                            }
                        }
                        return Photoview.changeThumbs(t, r, e.id), Photoview.hide(0)
                    }
                    if (cur.pvListId) {
                        var _ = cur.pvListId,
                            m = cur.pvIndex,
                            w = cur.pvData[_];
                        if (!w) return nav.reload();
                        var h = w[m];
                        if (i) {
                            var f = extend({}, e);
                            m = ++cur.pvIndex, w.splice(m, 0, f), h = f, cur.pvCommsLikes[h.id] = [h.comments, 0, vkNow(), !1], delete h.comments, delete h.likes
                        }
                        var P = cur.pvShown && _ == cur.pvListId && m == cur.pvIndex;
                        e && t && !i && (Photoview.changeThumbs(t, r, o.id), delete h.x_, delete h.x_src, delete h.y_, delete h.y_src, delete h.z_, delete h.z_src, extend(h, e)), h.pe_type = Photoview.PE_V3, P && (cur.pvCurData = Photoview.genData(h, Photoview.getPhotoSize()), domFC(cur.pvPhoto).src = Photoview.blank, setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0))
                    }
                }, function() {
                    return delete cur.pvEditorMode, delete cur.pvEditorModeDimensionsUpdated, o.closeOnPEEdit ? Photoview.hide(0) : (show(cur.pvLikeFSWrap), Photoview.toggleNavControls(["left", "right", "close"]), void setTimeout(Photoview.updatePhotoDimensions, 1))
                })
            }))
        },
        genUrl: function(o, e) {
            return e.match(/\.[a-z]{3}$/i) || (e += ".jpg"), e.match(/https?:\/\//i) ? e : (o || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + e
        },
        genData: function(o, e) {
            for (var t, r, a = "x" == e ? 3 : "y" == e ? 2 : "z" == e ? 1 : 0, i = (cur.shownAs1AprilEditor ? Photoview.photoSize1April : ["w", "z", "y", "x"]).slice(a), p = 0; 4 - a > p; ++p) {
                var s = i[p];
                if (t = o[s + "_"]) break;
                if (r = o[s + "_src"]) break
            }
            return t || (t = [r]), {
                src: Photoview.genUrl(o.base, t[0]),
                width: t[2] && t[1],
                height: t[1] && t[2]
            }
        },
        actionInfo: function() {
            return ge("pv_action_info") || domPN(cur.pvTags).insertBefore(ce("div", {
                id: "pv_action_info",
                className: "pv_right_block"
            }), cur.pvTags)
        },
        locNav: function(o, e, t, r) {
            if (cur.pvListId == "newtag" + vk.id + (t.rev ? "/rev" : "") && t[0] == "albums" + vk.id && "added" == t.act) return Photoview.hide(r.hist), !1;
            if (t = nav.toStr(t), t.replace("?rev=1", "/rev") == cur.pvListId && cur.pvShown) return Photoview.hide(r.hist), !1;
            var a = t.match(/^photo(-?\d+_\d+)\??((all=1|newtag=\d+)(&rev=1)?|(rev=1&)?tag=\d+|rev=1)?$/);
            if (a) {
                var i = cur.pvListId;
                i && cur.pvShown || (i = "added" == nav.objLoc.act ? "newtag" + vk.id + (nav.objLoc.rev ? "/rev" : "") : nav.strLoc.replace("?rev=1", "/rev"));
                var p = cur.pvData[i];
                if (p)
                    for (var s = 0, v = p.length; v > s; ++s)
                        if (p[s] && p[s].id == a[1]) return Photoview.show(i, s, !1, cur.pvRoot), !1
            }
        },
        updateLocNav: function() {
            if (cur.pvRoot) {
                for (var o = 0, e = cur.nav.length; e > o; ++o)
                    if (cur.nav[o] == Photoview.locNav) return;
                cur.nav.push(Photoview.locNav)
            } else
                for (var o = 0, e = cur.nav.length; e > o; ++o) cur.nav[o] == Photoview.locNav && (cur.nav.splice(o, 1), --o, --e)
        },
        toggleOnPhotoControls: function(o) {
            o = !!o, toggle(cur.pvHHWrap, o), toggle(cur.pvFSWrap, o)
        },
        checkLayerVisibility: function() {
            return cur.pvShown ? !0 : (debugLog("layerqueue.hide from photoview"), layerQueue.hide(), addEvent(window, "resize", Photoview.onResize), addEvent(document, "keydown", Photoview.onKeyDown), addEvent(layerWrap, "click", Photoview.onLayerClick), boxQueue.hideAll(), setStyle(layerBG, {
                opacity: ""
            }), layers.show(), void(layers.fullhide = Photoview.hide))
        },
        emojiShowTT: function(o, e) {
            return void 0 === cur.pvEmoji ? !1 : Emoji.ttShow(cur.pvEmoji, o, e)
        },
        emojiHideTT: function(o, e) {
            return void 0 === cur.pvEmoji ? !1 : Emoji.ttHide(cur.pvEmoji, o, e)
        },
        onImageWrapMouseDown: function(o) {
            if (2 != o.button && !cur.pvEditorMode) {
                var e = getSize(cur.pvHH),
                    t = getXY(cur.pvHH);
                if (o.pageX > t[0] && o.pageY > t[1] && o.pageX < t[0] + e[0] && o.pageY < t[1] + e[1]) Photoview.onHHLikeClick(o);
                else if (!cur.pvTagger && checkEvent(o) === !1) {
                    var r = cur.pvIndex;
                    return Photoview.updateNavBtnsLeftThreshold(), o.pageX < cur.pvLeftBtnAmount ? r -= 1 : r += 1, cur.pvPointerPosition = [o.pageX, o.pageY], Photoview.show(!1, r, o)
                }
            }
        },
        onImageWrapMouseLeave: function(o) {
            removeClass(cur.pvNavBtnLeft, "pv_nav_btn_show"), removeClass(cur.pvNavBtnRight, "pv_nav_btn_show"), removeClass(cur.pvImageAreaWrap, "pv_init_hover"), Photoview.updateHHVisibility(o, !0), Photoview.updateNavBtnsLeftThreshold(!0)
        },
        onImageWrapMouseMove: function(o) {
            Photoview.updateNavBtnsLeftThreshold(), toggleClass(cur.pvNavBtnLeft, "pv_nav_btn_show", o.pageX < cur.pvLeftBtnAmount), toggleClass(cur.pvNavBtnRight, "pv_nav_btn_show", o.pageX > cur.pvLeftBtnAmount), Photoview.updateHHVisibility(o)
        },
        onHHLikeClick: function(o) {
            var e = geByClass1("pv_hh_like");
            return toggleClass(e, "pv_liked"), 2 != o.button ? (Photoview.like(), cancelEvent(o)) : void 0
        },
        updateHHVisibility: function(o, e) {
            var t = getSize(cur.pvHH),
                r = getXY(cur.pvHH);
            r[0] += t[0] / 2, r[1] += t[1] / 2;
            var a = Math.sqrt((r[0] - o.pageX) * (r[0] - o.pageX) + (r[1] - o.pageY) * (r[1] - o.pageY)),
                i = 150,
                p = 0;
            i > a && !e && (p = .3 + (1 - a / i)), p = Math.min(1, Math.max(0, p)).toFixed(1), setStyle(cur.pvHH, "opacity", p)
        },
        toggleLightModeClass: function(o) {
            o = o ? cur.pvIsLightMode : !1, toggleClass(cur.pvBox, "pv_light_mode", !!o), o = o ? cur.pvShowBottomActions : !1, toggleClass(cur.pvBox, "pv_show_bottom_actions", !!o)
        },
        isPhotosList: function() {
            return !!(cur.pvVideoTagsShown || cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown)
        },
        createLayer: function() {
            cur.pvLayerCreated = !0, delete cur.pvLeftBtnAmount, addClass(layerWrap, "pv_layer_wrap"), addClass(layerBG, "pv_layer");
            var o = Photoview.isPhotosList(),
                e = nav.objLoc[0].match(/^faq(\d)+$/);
            cur.pvIsLightMode = 0 == nav.objLoc[0].indexOf("blog/") || e || inArray(nav.objLoc[0], ["blog", "about", "support", "helpdesk", "market", "bugtracker"]), cur.pvShowBottomActions = !cur.pvIsLightMode || e || inArray(nav.objLoc[0], ["helpdesk", "support"]);
            var t = "display: none",
                r = Photoview.hhCheck() ? "" : t,
                a = (Photoview.canFullscreen() ? "" : t, cur.pvAlbumsShown ? cur.pvAlbumsData[cur.pvAlbumsShown].html : ""),
                i = cur.pvAlbumShown ? cur.pvAlbumData[cur.pvAlbumShown].html : "",
                p = cur.pvVideoTagsShown ? cur.pvVideoTagsData.html : "",
                s = o ? t : "",
                v = o ? "" : t,
                n = cur.pvAlbumsShown ? "" : t,
                c = cur.pvAlbumShown ? "" : t,
                u = cur.pvVideoTagsShown ? "" : t;
            cur.pvPhotoTagShown && (i = cur.pvPhotoTagData[cur.pvPhotoTagShown].html, c = ""), ge("pv_comments") && (cur.pvBackupComments = ge("pv_comments"), domPN(ge("pv_comments")).removeChild(ge("pv_comments")));
            var l = '<div style="' + v + '" class="box_title_wrap box_grey"><div class="box_x_button" onclick="Photoview.hide(0)"></div><div class="box_title_controls"></div><div class="box_title"></div></div>',
                d = '       <div class="pv_nav_btn" id="pv_nav_btn_left" onmousedown="cur.pvClicked = true; Photoview.show(false, cur.pvIndex - 1, event);">         <div class="pv_nav_btn_icon"></div>       </div>       <div class="pv_nav_btn" id="pv_nav_btn_right" onmousedown="cur.pvClicked = true; Photoview.show(false, cur.pvIndex + 1, event);"><div class="pv_nav_btn_icon"></div></div>     ',
                h = cur.pvIsLightMode ? "" : '      <div class="pv_hh_like" style="' + r + '">         <div class="pv_hh_like_base"></div>         <div class="pv_hh_like_liked"></div>       </div>     ',
                g = cur.pvIsLightMode ? "" : '      <div class="pv_fs_wrap">         <div class="pv_fs_btn" onmousedown="return Photoview.fullscreen(event);"><div></div></div>       </div>     ',
                _ = '      <div class="pv_bottom_info clear_fix">         <div>           <div class="pv_bottom_info_left"><span class="pv_album_name" onmouseover="setTitle(this)"></span><span class="pv_counter"></span></div>           ' + (cur.pvShowBottomActions ? '<div class="pv_bottom_actions"></div>' : "") + "         </div>       </div>",
                m = cur.pvIsLightMode ? "" : '      <div class="pv_narrow_column_wrap">        <div class="pv_narrow_column_cont wall_module">          <div class="narrow_column" id="pv_narrow"></div>        </div>      </div>',
                w = getProgressHtml("pv_image_progress"),
                f = "pv_mouse_out_layer";
            layer.innerHTML = '    <div class="pv_cont">      <div id="pv_box" class="_scroll_node pv_box" tabindex="0" onclick="cur.pvClicked = true;" onmouseenter="removeClass(layerWrap, \'' + f + "')\" onmouseleave=\"addClass(layerWrap, '" + f + "')\">         " + l + '        <div class="clear_fix pv_photo_wrap" style="' + s + '">           <div class="pv_close_btn" onclick="Photoview.hide(0)"></div>           <div class="no_select pv_left_wrap">                      <div class="no_select pv_image_wrap">              <div id="pv_tag_info" class="clear_fix">                 <div class="pv_tag_info_buttons_wrap"></div>                 <div class="pv_tag_info_text" onmouseover="setTitle(this)"></div>               </div>              <div id="pv_tag_frame"></div>              <div id="pv_tag_faded"></div>              <div id="pv_tag_person" onmouseout="Photoview.hideTag()"></div>              <div class="pv_photo_tags" id="pv_photo_tags"></div>              <div class="pv_img_area_wrap pv_init_hover" onmouseleave="return Photoview.onImageWrapMouseLeave(event)" onmousedown="return Photoview.onImageWrapMouseDown(event)" onmousemove="Photoview.onImageWrapMouseMove(event)">                 <div class="pv_img_progress_wrap">' + w + '</div>                 <a onselectstart="return cancelEvent(event);" onclick="return checkEvent(event)" href="" id="pv_photo"></a>                 ' + d + '                 <div class="pv_like_fs_wrap">                 ' + h + g + "                </div>               </div>             </div>             " + _ + "          </div>" + m + '        </div>        <div id="pv_albums_wrap" class="pv_white_bg photos_container_albums" style="' + n + '">' + a + '</div>        <div id="pv_album_wrap" class="pv_white_bg" style="' + c + '">' + i + '</div>        <div id="pv_vtagged_wrap" class="pv_white_bg" style="' + u + '">' + p + "</div>      </div>        </div>", cur.pvYourComment && domPN(ge("pv_your_comment")).replaceChild(cur.pvYourComment, ge("pv_your_comment")), extend(cur, {
                pvCont: domFC(layer),
                pvBox: ge("pv_box"),
                pvImageAreaWrap: geByClass1("pv_img_area_wrap"),
                pvLeftWrap: geByClass1("pv_left_wrap"),
                pvTitle: geByClass1("box_title_wrap"),
                pvTitleText: geByClass1("box_title"),
                pvImageWrap: geByClass1("pv_image_wrap"),
                pvNavBtnLeft: ge("pv_nav_btn_left"),
                pvNavBtnRight: ge("pv_nav_btn_right"),
                pvNavBtnClose: geByClass1("pv_close_btn"),
                pvNarrowColumnWrap: geByClass1("pv_narrow_column_wrap"),
                pvNarrowColumn: geByClass1("pv_narrow_column_cont"),
                pvPhotoWrap: geByClass1("pv_photo_wrap"),
                pvAlbumWrap: ge("pv_album_wrap"),
                pvAlbumsWrap: ge("pv_albums_wrap"),
                pvVTagsWrap: ge("pv_vtagged_wrap"),
                pvPhotoTagsContainer: ge("pv_photo_tags"),
                pvTagInfo: ge("pv_tag_info"),
                pvTagFrame: ge("pv_tag_frame"),
                pvTagFaded: ge("pv_tag_faded"),
                pvTagPerson: ge("pv_tag_person"),
                pvPhoto: ge("pv_photo"),
                pvTagInfoText: geByClass1("pv_tag_info_text"),
                pvTagInfoButtons: geByClass1("pv_tag_info_buttons_wrap"),
                pvBottomInfo: geByClass1("pv_bottom_info"),
                pvAlbumName: geByClass1("pv_album_name"),
                pvCounter: geByClass1("pv_counter"),
                pvBottomActions: geByClass1("pv_bottom_actions"),
                pvBottomLeft: geByClass1("pv_bottom_info_left"),
                pvNarrow: ge("pv_narrow"),
                pvWide: ge("pv_wide"),
                pvHH: geByClass1("pv_hh_like"),
                pvImgProgress: ge("pv_image_progress"),
                pvLikeFSWrap: geByClass1("pv_like_fs_wrap"),
                pvFSWrap: geByClass1("pv_fs_wrap"),
                pvFS: ge("pv_fs"),
                pvFSFg: ge("pv_fs_fg"),
                pvActions: ge("pvs_actions"),
                pvYourComment: ge("pv_your_comment"),
                pvAddMedia: domFC(ge("pv_add_media")),
                pvMediaPreview: ge("pv_media_preview"),
                pvCommentSend: ge("pv_comment_send"),
                pvComment: ge("pv_comment")
            }), addEvent(layerWrap, "scroll", Photoview.scrollResize), addEvent(layerWrap, "mousemove", Photoview.onLayerMouseMove), Photoview.updateSize(), o && uiScrollBox.init(!1, {
                parent: layerWrap
            });
            var P = layerWrap.scrollTop;
            elfocus(geByClass1("_scroll_node", cur.pvCont)), layerWrap.scrollTop = P
        },
        doShowAlbums: function(o, e) {
            if (o = intval(o), !e || 2 != e.button && 3 != e.which) {
                if (clearTimeout(window.__pvhideTimer), __afterFocus) return e ? cancelEvent(e) : !1;
                if (cur.pvTagger && (Phototag.stopTag(), e !== !1)) return e ? cancelEvent(e) : !1;
                var t = (cur.pvAlbumsData || {})[o];
                if (t) {
                    Photoview.checkLayerVisibility(), cur.pvRoot = !1, Photoview.updateLocNav(), Photoview.toggleLightModeClass(!1), e && e.pageX && e.pageY && extend(cur, {
                        pvOldX: e.pageX,
                        pvOldY: e.pageY,
                        pvOldT: vkNow()
                    }), cur.pvShown = !0, cur.pvAlbumsShown = o, val("pva_owner") != o && extend(cur, {
                        pvaOffset: t.opts.offset,
                        pvaCount: t.opts.count,
                        pvaPhotosOffset: t.opts.photos_offset,
                        pvaPhotosCount: t.opts.photos_count,
                        pvShowAllAlbums: !1
                    }), cur.pvLayerCreated ? (val("pva_owner") != o && val(cur.pvAlbumsWrap, t.html), isVisible(cur.pvAlbumsWrap) || (hide(cur.pvPhotoWrap, cur.pvAlbumWrap, cur.pvVTagsWrap), show(cur.pvAlbumsWrap), Photoview.updateSize(), layerWrap.scrollTop = val("pva_scroll"))) : Photoview.createLayer(!0), uiScrollBox.show(), show(cur.pvTitle), show(cur.pvAlbumsWrap), cur.pvTitleText.innerHTML = t.opts.summary, cur.pvListId && "temp" != cur.pvListId ? extend(cur, {
                        pvOldListId: cur.pvListId,
                        pvOldIndex: cur.pvIndex
                    }) : (!browser.msie || browser.version > 8) && (cur.pvClicked = !1), Photoview.toggleNavControls(), cur.pvListId = !1;
                    var r = extend(nav.objLoc, {
                        z: "albums" + cur.pvAlbumsShown
                    });
                    return nav.strLoc != nav.toStr(r) && (cur.pvNoHistory || ++cur.pvHistoryLength, nav.setLoc(r)), Photoview.updatePeriods(), e ? cancelEvent(e) : !1
                }
            }
        },
        jumpToAlbums: function(o) {
            return "temp" == cur.pvListId && (cur.pvCancelLoad(), cur.pvJumpTo.z == "albums" + val("pva_owner") && cur.pvJumpTo.z == nav.objLoc.z) ? void showAlbums(val("pva_owner"), {
                noHistory: !0
            }) : (o && (cur.pvListId = !1), extend(cur, {
                pvJumpFrom: !1,
                pvJumpSteps: 0
            }), void nav.change(cur.pvJumpTo))
        },
        jumpToAlbum: function(o) {
            return "temp" == cur.pvListId && (cur.pvCancelLoad(), cur.pvJumpTo.z == "album" + val("pvsa_album") && cur.pvJumpTo.z == nav.objLoc.z) ? void showAlbum(val("pvsa_album"), {
                noHistory: !0
            }) : (o && (cur.pvListId = !1), extend(cur, {
                pvJumpFrom: !1,
                pvJumpSteps: 0
            }), void nav.change(cur.pvJumpTo))
        },
        jumpToTagged: function(o) {
            return "temp" == cur.pvListId && (cur.pvCancelLoad(), cur.pvJumpTo.z == "tag" + val("pvsa_tag") && cur.pvJumpTo.z == nav.objLoc.z) ? void showTagged(val("pvsa_tag"), {
                noHistory: !0
            }) : (cur.pvJumpTo.z == "tag" + val("pvsa_tag") && (cur.pvJumpTo.z = "photo_" + cur.pvJumpTo.z), o && (cur.pvListId = !1), extend(cur, {
                pvJumpFrom: !1,
                pvJumpSteps: 0
            }), void nav.change(cur.pvJumpTo))
        },
        doShowAlbum: function(o, e) {
            if (!e || 2 != e.button && 3 != e.which) {
                if (clearTimeout(window.__pvhideTimer), __afterFocus) return e ? cancelEvent(e) : !1;
                if (cur.pvTagger && (Phototag.stopTag(), e !== !1)) return e ? cancelEvent(e) : !1;
                var t = (cur.pvAlbumData || {})[o];
                if (t) {
                    Photoview.checkLayerVisibility(), cur.pvRoot = !1, Photoview.updateLocNav(), Photoview.toggleLightModeClass(!1), e && e.pageX && e.pageY && extend(cur, {
                        pvOldX: e.pageX,
                        pvOldY: e.pageY,
                        pvOldT: vkNow()
                    }), cur.pvShown || cur.pvAlbumShown || cur.pvAlbumsShown || layerQueue.push(), uiScrollBox.show(), cur.pvShown = !0, cur.pvAlbumShown = o, cur.pvLayerCreated && val("pvsa_album") == o || extend(cur, {
                        pvsaOffset: t.opts.offset,
                        pvsaCount: t.opts.count
                    }), cur.pvLayerCreated ? (val("pvsa_album") != o && val(cur.pvAlbumWrap, t.html), isVisible(cur.pvAlbumWrap) || (hide(cur.pvPhotoWrap, cur.pvAlbumsWrap, cur.pvVTagsWrap), show(cur.pvAlbumWrap), Photoview.updateSize(), layerWrap.scrollTop = val("pvsa_scroll"))) : Photoview.createLayer(), show(cur.pvTitle), show(cur.pvAlbumWrap);
                    var r = t.opts.author || "";
                    if (cur.pvTitleText.innerHTML = (r ? r + '<span class="divider"></span> ' : "") + t.opts.summary, cur.pvListId && "temp" != cur.pvListId) {
                        extend(cur, {
                            pvOldListId: cur.pvListId,
                            pvOldIndex: cur.pvIndex
                        });
                        var a = (cur.pvListId || "").split("/");
                        a[0] && Photoview.showRepeat(ge(a[0]))
                    } else(!browser.msie || browser.version > 8) && (cur.pvClicked = !1);
                    Photoview.toggleNavControls(), cur.pvListId = !1;
                    var i = extend(nav.objLoc, {
                        z: "album" + cur.pvAlbumShown
                    });
                    return nav.strLoc != nav.toStr(i) && (cur.pvNoHistory || ++cur.pvHistoryLength, nav.setLoc(i)), e ? cancelEvent(e) : !1
                }
            }
        },
        doShowTagged: function(o, e) {
            if (o = intval(o), !e || 2 != e.button && 3 != e.which) {
                if (clearTimeout(window.__pvhideTimer), __afterFocus) return e ? cancelEvent(e) : !1;
                if (cur.pvTagger && (Phototag.stopTag(), e !== !1)) return e ? cancelEvent(e) : !1;
                var t = (cur.pvPhotoTagData || {})[o];
                if (t) {
                    if (Photoview.checkLayerVisibility(), cur.pvRoot = !1, Photoview.updateLocNav(), Photoview.toggleLightModeClass(!1), e && e.pageX && e.pageY && extend(cur, {
                            pvOldX: e.pageX,
                            pvOldY: e.pageY,
                            pvOldT: vkNow()
                        }), cur.pvShown = !0, cur.pvPhotoTagShown = o, cur.pvLayerCreated && val("pvsa_tag") == o || extend(cur, {
                            pvsaOffset: t.opts.offset,
                            pvsaCount: t.opts.count
                        }), cur.pvLayerCreated ? (val("pvsa_tag") != o && val(cur.pvAlbumWrap, t.html), isVisible(cur.pvAlbumWrap) || (hide(cur.pvPhotoWrap, cur.pvAlbumsWrap, cur.pvVTagsWrap), show(cur.pvAlbumWrap), Photoview.updateSize(), layerWrap.scrollTop = val("pvsa_scroll"))) : Photoview.createLayer(), show(cur.pvTitle), show(cur.pvAlbumWrap), cur.pvTitleText.innerHTML = t.opts.summary, cur.pvListId && "temp" != cur.pvListId) {
                        extend(cur, {
                            pvOldListId: cur.pvListId,
                            pvOldIndex: cur.pvIndex
                        });
                        var r = (cur.pvListId || "").split("/");
                        r[0] && Photoview.showRepeat(ge(r[0]))
                    } else(!browser.msie || browser.version > 8) && (cur.pvClicked = !1);
                    Photoview.toggleNavControls(), cur.pvListId = !1;
                    var a = extend(nav.objLoc, {
                        z: "photo_tag" + cur.pvPhotoTagShown
                    });
                    return nav.strLoc != nav.toStr(a) && (cur.pvNoHistory || ++cur.pvHistoryLength, nav.setLoc(a)), e ? cancelEvent(e) : !1
                }
            }
        },
        toggleNavControls: function(o) {
            each([cur.pvNavBtnRight, cur.pvNavBtnLeft, cur.pvNavBtnClose], function() {
                hide(this)
            }), isString(o) && (o = o.split(" ")), each(o || [], function(o, e) {
                switch (e) {
                    case "close":
                        show(cur.pvNavBtnClose);
                        break;
                    case "left":
                        show(cur.pvNavBtnLeft);
                        break;
                    case "right":
                        show(cur.pvNavBtnRight)
                }
            })
        },
        getPhotoSize: function() {
            if (cur.shownAs1AprilEditor) return "a";
            var o;
            switch (cur.pvVeryBig) {
                case 3:
                    o = "w";
                    break;
                case 2:
                case 1:
                    o = "z";
                    break;
                default:
                    o = "y"
            }
            return o
        },
        show: function(o, e, t, r) {
            if (!cur.pvEditorMode && (!t || 2 != t.button && 3 != t.which)) {
                if (cur.cancelClick) return void delete cur.cancelClick;
                if (Photoview.destroyPeriod(), clearTimeout(window.__pvhideTimer), "temp" == o && cur.pvShown) {
                    if (cur.pvListId && "temp" != cur.pvListId) return;
                    cur.pvWasShown = !0
                } else cur.pvWasShown = !1;
                if (__afterFocus) return t ? cancelEvent(t) : !1;
                if (cur.pvTagger && (Phototag.stopTag(), t !== !1)) return t ? cancelEvent(t) : !1;
                if (o === !1) {
                    if (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown) {
                        if (cur.pvOldListId) return extend(cur, {
                            pvJumpTo: cur.pvOldJumpTo,
                            pvJumpFrom: cur.pvOldJumpFrom,
                            pvJumpSteps: cur.pvOldJumpSteps
                        }), e == cur.pvOldIndex + 1 && ++cur.pvOldIndex, Photoview.show(cur.pvOldListId, cur.pvOldIndex, t, r);
                        Photoview.toggleNavControls()
                    }
                    o = cur.pvListId
                }
                var a = ((cur.pvData || {})[o] || {}).length,
                    i = o != cur.pvListId;
                if (a) {
                    t && t.pageX && t.pageY && extend(cur, {
                        pvOldX: t.pageX,
                        pvOldY: t.pageY,
                        pvOldT: vkNow()
                    }), (cur.pvOptions || {}).queue && (debugLog("pushing in photoview.show"), layerQueue.push(), cur.pvOptions.queue = !1, cur.pvHistoryLength = 0), Photoview.checkLayerVisibility() || (i = !0);
                    var p = e + (0 > e ? a : e >= a ? -a : 0),
                        s = i ? 1 : cur.pvIndex > e ? -1 : 1;
                    if (!i && !cur.pvCanvas) {
                        if (cur.pvJumpTo) {
                            cur.pvJumpSteps += e - cur.pvIndex;
                            var v = p === cur.pvJumpFrom && cur.pvJumpSteps >= a;
                            if (v) return extend(cur, {
                                pvOldJumpFrom: cur.pvJumpFrom,
                                pvOldJumpSteps: cur.pvJumpSteps - (e - cur.pvIndex),
                                pvOldJumpTo: cur.pvJumpTo
                            }), Photoview.jumpToAlbums(cur.pvJumpSteps < 0);
                            if (s > 0 && (p < cur.pvJumpFrom && p + 4 > cur.pvJumpFrom || p < cur.pvJumpFrom + a && p + 4 > cur.pvJumpFrom + a)) {
                                vkImage().src = stManager._srcPrefix(".css") + "/images/icons/post_hh" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".png?3";
                                var n = cur.pvJumpTo.z.match(/^albums(-?\d+)$/);
                                n && (cur.pvAlbumsData || (cur.pvAlbumsData = {}), cur.pvAlbumsData[n[1]] || (cur.pvAlbumsData[n[1]] = "loading", ajax.post("al_photos.php", {
                                    act: "show_albums",
                                    owner: n[1],
                                    other: 1
                                }, {
                                    onDone: Photoview.loadedAlbums
                                })))
                            }
                            cur.pvJumpSteps <= -a && (cur.pvJumpSteps += a)
                        }
                        if (1 == a && e != cur.pvIndex && ("temp" != o || cur.pvOptions.temp_final)) return Photoview.hide(), t ? cancelEvent(t) : !1
                    }
                    i && "temp" != o && (cur.pvJumpFrom === !1 && (cur.pvJumpFrom = p), cur.pvRoot = r, Photoview.updateLocNav()), e = p;
                    var c = cur.pvData[o][e];
                    if (c && (c.x_ || c.x_src)) {
                        cur.pvIndex = e, cur.pvShown = !0, cur.pvAlbumsShowing = cur.pvAlbumsShown = !1, cur.pvAlbumShowing = cur.pvAlbumShown = !1, cur.pvPhotoTagShowing = cur.pvPhotoTagShown = !1, cur.pvVideoTagShowing = cur.pvVideoTagsShown = !1, cur.pvListId = o, Photoview.calculateVeryBig();
                        var u = Photoview.getPhotoSize();
                        return cur.pvCurData = Photoview.genData(c, u), cur.pvLayerCreated || Photoview.createLayer(), cur.pvCurrent && (cur.pvCurrent.onload = Photoview.blankf, cur.pvCurrent.src = Photoview.blank), delete cur.pvCurrent, cur.pvCurrent = vkImage(), cur.pvCurrent.onload = Photoview.preload.pbind(e, s), cur.pvCurrent.src = cur.pvCurData.src, i && Photoview.toggleNavControls(a > 1 ? "left right close" : "close"), hideProgress(cur.pvCounter), "temp" != o || cur.pvOptions.temp_final ? "temp" == o && cur.pvOptions.temp_final && cur.pvOptions.temp_summary || (cur.pvCounter.innerHTML = a > 1 ? getLang("photos_photo_counter_num_of_N").replace("%s", cur.pvIndex + 1).replace(/%s|{count}/, a) : "") : showProgress(cur.pvCounter, "", "pr_baw"), cur.pvCurPhoto = c, cur.pvCurData.width && cur.pvCurData.height ? Photoview.doShow() : (cur.pvCurData = cur.pvCurrent, cur.pvTimerPassed = 0, clearTimeout(cur.pvTimer), cur.pvTimer = setTimeout(Photoview.doShow, 0)), cur.pvBox && toggleClass(cur.pvBox, "photos_is_albums_view", !!cur.pvAlbumsShown), t ? cancelEvent(t) : !1
                    }
                }
            }
        },
        _checkWebGL: function() {
            function o() {
                try {
                    var o = document.createElement("canvas");
                    o.width = o.height = 100;
                    var e = {
                        preserveDrawingBuffer: !0,
                        premultipliedAlpha: !1
                    };
                    return !!window.WebGLRenderingContext && (o.getContext("webgl", e) || o.getContext("experimental-webgl", e))
                } catch (t) {
                    return !1
                }
            }
            return navigator.userAgent.indexOf("Windows NT 5.1") >= 0 ? -1 : o() ? 1 : browser.safari ? (debugLog("photo editor: webgl enable needed"), -2) : (debugLog("photo editor: webgl not suported"), -1)
        },
        openEditor: function(o, e) {
            function t(t) {
                return t || debugLog("photo editor: CORS not available (" + e + ")"), showBox("al_photos.php", {
                    act: "edit_photo",
                    photo: o ? o : cur.pvData[cur.pvListId][cur.pvIndex].id,
                    webgl: Photoview._checkWebGL(),
                    cors: t
                }, {
                    dark: 1,
                    stat: ["ui_controls.css", "ui_controls.js"]
                })
            }
            e = e ? e : cur.pvCurData.src;
            var r = vkImage();
            r.onerror = function() {
                t(0)
            }, r.onload = function() {
                t(1)
            }, r.crossOrigin = "", r.src = e
        },
        showSpamActions: function() {
            show(geByClass1("pv_more_acts_hidden")), cur.pvMoreActionsTooltip.updatePosition()
        },
        doShow: function() {
            function o(o) {
                cur.pvPhoto.innerHTML = '<img src="' + o + '" />'
            }
            show(cur.pvImgProgress);
            var e = cur.pvCurData;
            if ((!e.width || !e.height) && cur.pvTimerPassed < 5e3) return clearTimeout(cur.pvTimer), cur.pvTimerPassed += 100, void(cur.pvTimer = setTimeout(Photoview.doShow, 100));
            if (cur.pvShown) {
                if (cur.pvCanvas) return void Photoview.pvCanvasSet();
                Photoview.toggleLightModeClass(!0), isVisible(cur.pvAlbumsWrap) && (val("pva_scroll", layerWrap.scrollTop), hide(cur.pvAlbumsWrap), show(cur.pvPhotoWrap), Photoview.updateSize()), isVisible(cur.pvAlbumWrap) && (val("pvsa_scroll", layerWrap.scrollTop), hide(cur.pvAlbumWrap), show(cur.pvPhotoWrap), Photoview.updateSize()), uiScrollBox.hide(), hide(cur.pvTitle);
                var t = cur.pvPhoto && domFC(cur.pvPhoto);
                if (t && t.src) {
                    var r = /https?:\/\/[a-z0-9\.\-]+/,
                        a = t.src.replace(r, ""),
                        i = e.src.replace(r, "");
                    a != i && o(e.src)
                } else o(e.src);
                if (addEvent(domFC(cur.pvPhoto), "load", function() {
                        hide(cur.pvImgProgress)
                    }), Photoview.updatePhotoDimensions(), window.tooltips && tooltips.destroyAll(cur.pvBox), "temp" == cur.pvListId) return hide(cur.pvCommentsData), Photoview.toggleOnPhotoControls(!1), void Photoview.updateVerticalPosition();
                Photoview.toggleOnPhotoControls(!0);
                var p = cur.pvCurPhoto;
                if (p.pe_html) return p.closeOnPEEdit = !0, void Photoview.openStickersEditor(p);
                var s = p.commshown >= 0 ? !1 : -p.commshown;
                !p.taginfo && p.actions.tag && p.tags[0] < cur.pvMaxTags ? "" : ' style="display: none"';
                addClass(cur.pvHH, "no_transition"), toggleClass(cur.pvHH, "pv_liked", !!p.liked), setTimeout(removeClass.pbind(cur.pvHH, "no_transition"), 2), cur.pvTagger && Phototag.stopTag(), Photoview.hideTag(!0), (e.width < 200 || e.height < 200) && (p.actions.prof = !1, p.actions.dialog = !1);
                var v = "";
                ("NA" != p.album && 2 != s || p.graffiti) && (v = p.album);
                var n = !p.album || !p.author;
                if (!cur.pvIsLightMode && !n) {
                    var c = "";
                    c += '<div class="pv_author_block clear_fix">';
                    var u = "";
                    "NA" != p.author && (u = p.author), u && (p.author_href && (c += '<a class="pv_author_img fl_l" href="' + p.author_href + '">'), c += '<div class="ow_ava ow_ava_comm" style="background-image: url(\'' + p.author_photo + "');\"></div>", p.author_href && (c += "</a>")), c += '        <div class="pv_author_info">           <div id="pv_author_name">' + u + '</div>           <div class="pv_date_info_wrap">             <span id="pv_date_info">' + p.date + "</span>           </div>         </div>       </div>", c += getProgressHtml("pv_progress");
                    var l = p.liked ? "pv_liked" : "",
                        d = cur.pvCommsLikes[p.id],
                        h = d[0],
                        g = d[1];
                    c += '<div id="pv_like" class="pv_like _like_wrap ' + l + '" onmouseover="Photoview.likeOver(this)" onclick="Photoview.like();">         <i class="pv_like_icon _icon"></i>         <span class="pv_like_link _link">' + getLang("photos_i_like") + '</span>         <span class="pv_like_count _count">' + (g || "") + '</span>         <span class="blind_label" tabindex="0" role="link" onclick="Photoview.likesShowList(this)">' + getLang("photos_show_likes_list") + "</span>       </div>";
                    var _ = 1 & p.actions.edit || p.desc;
                    if (_) var m = (p.desc, "<div" + (1 & p.actions.edit ? ' class="pv_can_edit pv_desc_cont" onclick="Photoview.editInline(event)"' + (p.desc ? ' onmouseover=""' : "") : ' class="pv_cant_edit pv_desc_cont"') + ">" + (p.desc || '<span class="pv_desc_edit">' + getLang("photos_edit_desc") + "</span>") + "</div>");
                    c += '<div id="pv_desc" class="pv_right_block" style="' + (_ ? "" : "display: none") + '">' + m + "</div>", c += '<div id="pv_microdata">' + (p.microdata_html ? p.microdata_html : "") + (p.microdata_preview_button ? p.microdata_preview_button : "") + "</div>", p.microdata_html && shortCurrency();
                    var w = p.tagshtml ? "" : ' style="display: none"';
                    c += '<div id="pv_tags"' + w + ' class="pv_right_block">' + getLang("photos_onthisphoto") + ": " + p.tagshtml + "</div>";
                    var f = p.place ? '<span class="pv_place_label"></span> <a class="pv_place_a" id="pv_place_a" onclick="Photoview.showPlace()">' + p.place + "</a>" : "";
                    c += '<div id="pv_place" class="pv_right_block">' + f + "</div>", c += h.tagName ? '<div id="pv_comments_place"></div>' : trim(h), cur.pvReplyForm && re(cur.pvReplyForm), cur.pvReplyForm = null, c += '<div id="pv_rotate"><form method="POST" target="pv_rotate_frame" name="pv_rotate_form" id="pv_rotate_form"></form></div></div>', cur.pvNarrow.innerHTML = "", Photoview.updateRightBlock(), cur.pvNarrow.innerHTML = c;
                    var P = geByClass1("pv_closed_commments_placeholder");
                    if (s || !p.actions.comm ? removeClass(P, "unshown") : p.reply_form && (addClass(P, "unshown"), p.replyFormEl = cur.pvReplyForm = p.replyFormEl || se(p.reply_form), cur.pvNarrowColumn.appendChild(cur.pvReplyForm), cur.onReplyFormSizeUpdate = cur.onMediaChanged = function(o) {
                            cur.pvShown && Photoview.updateRightBlock()
                        }, cur.onReplyFormFocus = function() {
                            Photoview.updateRightBlock(!0), cur.pvNarrowScrollbar.scrollBottom(0, !0)
                        }), h.tagName) {
                        each(geByClass("page_gif_loading", h), function() {
                            Page.hideGif(this, !1)
                        });
                        var b = ge("pv_comments_place");
                        domPN(b).replaceChild(h, b)
                    }
                    if (cur.pvNarrowScrollbar = new uiScroll(cur.pvNarrow, {
                            global: !0
                        }), p.reply_form) {
                        var T = geByClass1("reply_field", cur.pvNarrowColumn);
                        data(T, "send", Photoview.sendComment), placeholderInit(T, {
                            editable: 1
                        })
                    }
                    cur.editing = !1, Photoview.updateRightBlock()
                }
                v = v || "", cur.pvAlbumName.innerHTML = v, toggle(cur.pvBottomInfo, !cur.pvIsLightMode || cur.pvShowBottomActions || v);
                var C = [];
                if (vk.id && C.push('<a id="pv_share" onclick="Photoview.sendPhoto()">' + getLang("photos_share_from_view") + "</a>"), !p.taginfo && p.actions.tag && p.tags[0] < cur.pvMaxTags && C.push("<a id=\"pv_tag_link\" onclick=\"stManager.add(['photo_tagger_mode.js', 'tagger.css', 'tagger.js'], function() { Phototag.startTag(); })\">" + getLang("photos_tagperson") + "</a>"), p.actions.del && C.push('<a id="pv_delete" onclick="Photoview.deletePhoto()">' + getLang("photos_pv_act_delete") + "</a>"), p.actions.save && C.push('<a id="pv_save_to_me" onclick="Photoview.savePhoto()">' + getLang("photos_pv_act_save") + "</a>"), cur.pvShowBottomActions && !n) {
                    var L = [],
                        y = [];
                    if (p.actions.spam && (L.push(["spam", getLang("photos_report"), "", "Photoview.showSpamActions()"]), L.push("sep"), y = cur.pvReasons), p.actions.edit && (p.pe_type & Photoview.PE_V1 || p.pe_type & Photoview.PE_V2) && L.push(["pe", getLang("photos_pv_act_photoeditor"), "Photoview.openEditor()"]), vk.id && p.pe_type & Photoview.PE_V3 && isPhotoeditor3Available() && !inArray(nav.objLoc[0], ["support", "helpdesk"]) && L.push(["spe", getLang("global_pe_edit"), "Photoview.openStickersEditor()"]), p.actions.rot && (L.push(["rotate_ccw", getLang("photos_pv_act_rotate_ccw"), "Photoview.rotatePhoto(-1)"]), L.push(["rotate_cw", getLang("photos_pv_act_rotate_cw"), "Photoview.rotatePhoto(1)"]), L.push("sep")), p.actions.place && L.push(["place", getLang("photos_edit_add_place"), "Photoview.editPlace()"]), p.actions.prof && L.push(["to_profile", getLang("photos_pv_act_to_avatar"), "showBox('al_page.php', {act: 'owner_photo_edit', photo: '" + p.id + "'}, {stat: ['owner_photo.css', 'owner_photo.js', 'tagger.css', 'tagger.js']})"]), p.actions.dialog && L.push(["to_dialog", getLang("photos_load_to_dialog"), "showBox('al_page.php', {act: 'owner_photo_edit', photo: '" + p.id + "', oid: " + p.actions.dialog + ", list: '" + cur.pvListId + "'}, {stat: ['owner_photo.css', 'owner_photo.js', 'tagger.css', 'tagger.js']});"]), p.actions.move) {
                        var S = p.id.split("_")[0];
                        L.push(["move_to", getLang("photos_pv_act_move_to_album"), "showBox('al_photos.php', {act: 'a_move_to_album_box', photo_id: '" + p.id + "', owner_id: " + S + "}, {stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css']})"]), p.actions.cover && L.push(["as_title", getLang("photos_album_to_cover"), "ajax.post('al_photos.php', {act: 'a_set_as_album_title', photo: '" + p.id + "', hash: '" + p.hash + "'}, {onDone: showDoneBox})"])
                    }
                    var x = "";
                    each(y, function(o, e) {
                        var t = "Photoview.report('" + p.hash + "', '" + e[0] + "')";
                        x += '<div onclick="' + t + '" class="pv_more_act_item pv_more_spam_act_item" id="pv_more_spam_act_' + e[0] + '">' + e[1] + "</div>"
                    }), x = x ? '<div class="pv_more_acts_hidden">' + x + "</div>" : "";
                    var I = "";
                    each(L, function(o, e) {
                        I += "sep" == e ? '<div class="pv_more_act_item_sep"></div>' : '<div class="pv_more_act_item" onmouseover="' + (e[3] || "") + '" onclick="' + (e[2] || "") + '" id="pv_more_act_' + e[0] + '">' + e[1] + "</div>"
                    }), I += '<a class="pv_more_act_item" id="pv_more_act_download" target="_blank" href="' + Photoview.genData(p, "w").src + '">' + getLang("photos_pv_act_open_original") + "</a>", I = '<div class="pv_more_acts">' + I + "</div>", L.length ? (L = JSON.stringify(L), L = L.replace(/\"/g, "&quot;"), C.push('<a class="pv_actions_more" data-items="' + L + '">' + getLang("photos_actions_more") + "</a>")) : inArray(nav.objLoc[0], ["support", "helpdesk"]) && C.push('<a id="pv_more_act_download" target="_blank" href="' + Photoview.genData(p, "w").src + '">' + getLang("photos_pv_act_open_original") + "</a>"), C = C.join('<span class="divider"></span>'), cur.pvIsLightMode && (C += '<div id="pv_rotate" style="display:none;"><form method="POST" target="pv_rotate_frame" name="pv_rotate_form" id="pv_rotate_form"></form></div></div>'), cur.pvBottomActions.innerHTML = C;
                    var k = geByClass1("pv_actions_more");
                    k && (cur.pvMoreActionsTooltip = new ElementTooltip(k, {
                        id: "pv_more_acts_tt",
                        forceSide: "top",
                        elClassWhenShown: "pv_more_shown",
                        content: x + I,
                        offset: [0, -5],
                        autoShow: !0,
                        noHideOnClick: !0
                    }))
                }
                Photoview.updatePhotoDimensions(), extend(cur, {
                    pvTagLink: ge("pv_tag_link"),
                    pvLikeIcon: geByClass1("pv_like_icon"),
                    pvLikeLink: geByClass1("pv_like_link"),
                    pvDesc: ge("pv_desc"),
                    pvTags: ge("pv_tags"),
                    pvEditing: !1,
                    pvProgress: ge("pv_progress")
                }), p.deleted || !p.author ? (cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), isArray(p.deleted) && Photoview.toggleTopInfoPanel(p.deleted[0], p.deleted[1]), hide(cur.pvHHWrap), n || Photoview.toggleDeletedState(!0)) : p.taginfo ? (cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(p.taginfo, '        <button class="flat_button" id="pv_confirm_tag" onclick="Photoview.confirmTag(' + p.tagid + ', this)">' + getLang("photos_confirm_tag") + '</button>         <button class="flat_button secondary black" id="pv_delete_tag" onclick="Photoview.deleteTag(' + p.tagid + ', this)">' + getLang("photos_delete_tag") + "</button>       </div>"), show(cur.pvCommentsData), Photoview.hhCheck() && show(cur.pvHHWrap)) : (Photoview.toggleTopInfoPanel(!1), Photoview.toggleDeletedState(!1), Photoview.hhCheck() && show(cur.pvHHWrap)), (cur.pvOptions || {}).scroll && cur.pvNarrowScrollbar && cur.pvNarrowScrollbar.scrollTop(cur.pvOptions.scroll), cur.pvBodyScrollTop = bodyNode.scrollTop, setTimeout(function() {
                    void 0 !== cur.pvBodyScrollTop && (bodyNode.scrollTop = cur.pvBodyScrollTop, delete cur.pvBodyScrollTop)
                }, 0), Photoview.updateVerticalPosition();
                var D = domFC(cur.pvPhoto);
                cur.pvPhotoTags ? cur.pvPhotoTags.reload(D) : cur.pvPhotoTags = new PhotoTags(D, cur.pvPhotoTagsContainer, cur.pvPhWidth, cur.pvPhHeight), setTimeout(Photoview.afterShow, 2)
            }
        },
        toggleTopInfoPanel: function(o, e) {
            var t = isString(o) ? !0 : !!o;
            void 0 !== o && (cur.pvTagInfoText.innerHTML = o), void 0 !== e && (cur.pvTagInfoButtons.innerHTML = e), toggle(cur.pvTagInfo, t), Photoview.updatePhotoTagsContainerDimensions(), Photoview.updatePhotoDimensions()
        },
        toggleDeletedState: function(o) {
            o = !!o, toggleClass(cur.pvCont, "pv_deleted_state", o), Photoview.updateRightBlock()
        },
        updatePhotoTagsContainerDimensions: function(o) {
            var e = domFC(cur.pvPhoto);
            if (e) {
                o || (o = e.offsetWidth);
                var t = e.offsetLeft,
                    r = e.offsetTop;
                setStyle(cur.pvPhotoTagsContainer, {
                    top: r + "px",
                    left: t + "px",
                    width: o + "px"
                })
            }
        },
        updateTagFrameDimensions: function(o, e, t) {
            var r = domFC(cur.pvPhoto);
            if (r) {
                var a = r.offsetLeft,
                    i = r.offsetTop;
                setStyle(cur.pvTagFaded, {
                    width: cur.pvPhWidth + "px",
                    height: cur.pvPhHeight + "px",
                    left: a + "px",
                    top: i + "px"
                }), setStyle(cur.pvTagFrame, {
                    left: a + "px",
                    top: i + "px"
                }), setStyle(cur.pvTagPerson, {
                    left: a + "px",
                    top: i + "px"
                }), o && e && setStyle(domFC(cur.pvTagFrame), {
                    width: o,
                    height: e,
                    marginTop: intval(t)
                })
            }
        },
        afterShow: function() {
            cur.pvPhoto.href = "/photo" + cur.pvCurPhoto.id, cur.pvPhoto.focus(), 4 & cur.pvCurPhoto.actions.edit && 1 & cur.pvCurPhoto.actions.edit && !cur.pvCurPhoto.desc && Photoview.editInline(), cur.pvTagFrame.innerHTML = '<img src="' + cur.pvCurData.src + '" />', Photoview.updateTagFrameDimensions(), (cur.pvOptions || {}).scroll && (layerWrap.scrollTop = cur.pvOptions.scroll, cur.pvOptions.scroll = 0);
            var o = document.URL;
            Photoview.updateLoc(), cur.pvCandidate && (o == document.URL && (o = ""), setTimeout(window.comScoreUDM && comScoreUDM.pbind(locProtocol + "//" + location.host + "/al_photos.php?comscorekw=pageview_candidate", o), 10), delete cur.pvCandidate), Photoview.updatePhotoDimensions()
        },
        pvCanvasUpdate: function(o) {
            var e = cur.pvCurData;
            if (cur.pvCanvas && e && e.width && e.height) {
                cur.pvScrWidth = cur.pvCanvas.offsetWidth, cur.pvScrHeight = cur.pvCanvas.offsetHeight;
                var t = 1,
                    r = 0,
                    a = e.width || 604,
                    i = e.height || 453,
                    p = ge("pv_fs_img_fade") || ge("pv_fs_img_wrap"),
                    s = p && domFC(p);
                t = cur.pvScrWidth / a, i * t > cur.pvScrHeight && (t = cur.pvScrHeight / i), t > 1.25 && (t = 1.25), a = Math.floor(a * t), i = Math.floor(i * t), r = Math.floor((cur.pvScrHeight - i) / 2), (cur.pvFSWidth != a || cur.pvFSHeight != i || cur.pvFSTop != r || o) && (cur.pvFSWidth = a, cur.pvFSHeight = i, cur.pvFSTop = r, s && setStyle(s, {
                    marginTop: r,
                    width: a,
                    height: i
                }))
            }
        },
        pvCanvasSet: function() {
            var o = cur.pvCurData;
            if (cur.pvCanvas && o) {
                var e, t = vkImage(),
                    r = function() {
                        ge("pv_fs_img_fade") && (re("pv_fs_img_wrap"), ge("pv_fs_img_fade").id = "pv_fs_img_wrap")
                    };
                r(), domFC(ge("pv_fs_img_wrap")) && cur.pvSlideNeedAnimation ? (cur.pvSlideNeedAnimation = !1, cur.pvCanvas.insertBefore(se('<div id="pv_fs_img_fade"><img src="' + o.src + '" /></div>'), ge("pv_fs_img_wrap")), e = function() {
                    cssAnim(ge("pv_fs_img_wrap"), {
                        opacity: 0
                    }, {
                        duration: 1e3
                    }, function() {
                        r(), Photoview.fullscreenOnLoad()
                    }), cssAnim(ge("pv_fs_img_fade"), {
                        opacity: 1
                    }, {
                        duration: 1e3
                    })
                }) : (val(ge("pv_fs_img_wrap"), '<img src="' + o.src + '" />'), e = Photoview.fullscreenOnLoad), Photoview.pvCanvasUpdate(!0), t.onload = e, t.src = o.src, window.FullscreenPV && FullscreenPV.updateInfo()
            }
        },
        updateLoc: function() {
            var o, e = cur.pvListId;
            cur.pvRoot ? (o = {
                0: "photo" + cur.pvCurPhoto.id
            }, "photos" == e.substr(0, 6) ? o.all = 1 : "tag" == e.substr(0, 3) ? o.tag = intval(e.substr(3)) : "newtag" == e.substr(0, 6) && (o.newtag = intval(e.substr(6))), -1 != e.indexOf("/rev") && (o.rev = 1)) : o = extend(nav.objLoc, {
                z: "photo" + cur.pvCurPhoto.id + "/" + (cur.pvCurPhoto.list_override || e)
            }), nav.strLoc != nav.toStr(o) && (cur.pvNoHistory || ++cur.pvHistoryLength, nav.setLoc(o), (cur.pvOptions || {}).fromQueue && (cur.pvNoHistory = !0, cur.pvHistoryLength = 0)), cur.pvOptions && (cur.pvOptions.fromQueue = !1)
        },
        canFullscreen: function() {
            var o = browser,
                e = floatval(browser.version);
            return !o.mobile && (document.fullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || o.safari && e > 5)
        },
        fullscreenOnLoad: function() {
            window.FullscreenPV && FullscreenPV.slide()
        },
        fullscreenEnd: function(o) {
            var e = cur.pvCanvas;
            e && (cleanElems(e), re(e), clearTimeout(cur.pvFSTimer), clearTimeout(cur.pvFSControlsTimer), cur.pvCanvas = cur.pvFSControls = cur.pvFSTimer = cur.pvFSControlsTimer = !1, removeEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange webkitfullscreenerror mozfullscreenerror fullscreenerror"), show(pageNode), cur.pvCanvasUpdateTO && clearInterval(cur.pvCanvasUpdateTO), void 0 !== cur.pvScrWasY && (scrollToY(cur.pvScrWasY, 0), delete cur.pvScrWasY), o !== !0 && (Photoview.updateSize(), Photoview.show(cur.pvListId, cur.pvIndex)))
        },
        fullscreen: function(o) {
            if (!cur.pvCanvas && !cur.pe) {
                var e = cur.pvCanvas = bodyNode.appendChild(ce("div", {
                        className: "fixed",
                        id: "pv_fullscreen",
                        innerHTML: '<div id="pv_fs_img_wrap"></div>'
                    })),
                    t = e.requestFullscreen || e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
                cur.pvFinishing = !1, stManager.add(["fullscreen_pv.css", "fullscreen_pv.js"], function() {
                    FullscreenPV.init()
                }), addEvent(document, "webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenchange", Photoview.onFullscreen), addEvent(document, "webkitfullscreenerror mozfullscreenerror MSFullscreenError fullscreenerror", Photoview.fullscreenEnd.pbind(!0));
                try {
                    t.call(e)
                } catch (r) {
                    cur.pvPartScreen = !0, Photoview.onFullscreen()
                }
                return cancelEvent(o)
            }
        },
        fullscreenStop: function(o) {
            cur.pvFinishing = o === !0, cur.pvPartScreen = !1;
            var e = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
            try {
                e.call(document)
            } catch (t) {
                Photoview.onFullscreen()
            }
            setTimeout(Photoview.fullscreenEnd, 30)
        },
        onFullscreen: function() {
            isFullScreen() ? (cur.pvTagger && Phototag.stopTag(), cur.pvScrWidth = cur.pvCanvas.offsetWidth, cur.pvScrHeight = cur.pvCanvas.offsetHeight, cur.pvScrWasY = scrollGetY(), hide(pageNode), cur.pvCanvasUpdateTO = setInterval(Photoview.pvCanvasUpdate.pbind(!1), 100), cur.pvFinishing || (Photoview.updateSize(), Photoview.show(cur.pvListId, cur.pvIndex))) : Photoview.fullscreenEnd(cur.pvFinishing)
        },
        showDD: function(o, e) {
            if (!hasClass(o, "pv_report_blocked") && e && (clearTimeout(cur.hideShareTimer), o.blur(), !hasClass(e, "pv_dd_hiding"))) {
                if (isVisible(e)) return fadeIn(e, 0);
                cur.ddShown && Photoview.hideDD(0), cur.ddShown = e, setTimeout(addEvent.pbind(document, "click", Photoview.hideDD), 1), show(e)
            }
        },
        hideDD: function(o) {
            if (o > 0) return void(cur.hideShareTimer = setTimeout(Photoview.hideDD.pbind(0), o));
            var e = cur.ddShown;
            e && (-1 == o ? hide(e) : (addClass(e, "pv_dd_hiding"), fadeOut(e, 200, function() {
                removeClass(e, "pv_dd_hiding")
            })), removeEvent(document, "click", Photoview.hideDD), cur.ddShown = !1)
        },
        createDD: function(o, e) {
            return '<div onmouseover="Photoview.showDD(this.previousSibling, this);" onmouseout="Photoview.hideDD(500)" onclick="Photoview.hideDD(-1)" class="pvs_dd fixed"><table cellspacing="0" cellpadding="0"><tr>    <td class="pvs_side_sh"><div class="pvs_side_sh_el"></div></td>    <td>      <div class="pvs_header_wrap"><div class="pvs_header"><span class="pvs_header_text">' + e + '</span></div></div>      <div class="pvs_acts">' + o + '</div>      <div class="pvs_sh1"></div><div class="pvs_sh2"></div>    </td>    <td class="pvs_side_sh"><div class="pvs_side_sh_el"></div></td>  </tr></table></div>'
        },
        report: function(o, e) {
            var t = cur.pvCurPhoto.id.split("_");
            ajax.post("reports.php", {
                act: "new_report",
                type: "photo",
                reason: e,
                hash: o,
                oid: t[0],
                item_id: t[1]
            });
            var r = ge("pv_more_act_spam");
            val(r, getLang("global_report_sent")), re(geByClass1("pv_more_acts_hidden")), cur.pvMoreActionsTooltip.updatePosition(), cur.pvMoreActionsTooltip.show()
        },
        showShare: function() {
            clearTimeout(cur.hideShareTimer);
            var o = ge("pvs_dd");
            return ge("pv_share").blur(), isVisible(o) ? fadeIn(o, 0) : (setTimeout(addEvent.pbind(document, "click", Photoview.hideShare), 1), void show(o))
        },
        hideShare: function(o) {
            if (o > 0) return void(cur.hideShareTimer = setTimeout(Photoview.hideShare.pbind(0), o));
            var e = ge("pvs_dd");
            e && (-1 == o ? hide(e) : fadeOut(e, 200), removeEvent(document, "click", Photoview.hideShare))
        },
        savePhoto: function() {
            var o = cur.pvListId,
                e = cur.pvIndex,
                t = cur.pvData[o][e];
            ajax.post("al_photos.php", {
                act: "save_me",
                photo: t.id,
                list: o,
                hash: t.hash
            });
            var r = ge("pv_save_to_me");
            domPN(r).replaceChild(ce("div", {
                className: "pv_save_to_me_saved",
                innerHTML: getLang("photos_pv_act_save_saved")
            }), r)
        },
        sendPhoto: function() {
            var o = cur.pvListId,
                e = cur.pvIndex,
                t = cur.pvData[o][e];
            showBox("like.php", {
                act: "publish_box",
                object: "photo" + t.id,
                list: o,
                to: "mail"
            }, {
                stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"]
            })
        },
        moveToAlbumBox: function(o, e, t) {
            return !showBox("al_photos.php", {
                act: "a_move_to_album_box",
                photo_id: o + "_" + e,
                owner_id: o,
                from: t
            }, {
                stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css"]
            })
        },
        moveToAlbum: function(o, e, t) {
            ajax.post("al_photos.php", {
                act: "a_move_photo",
                photo: o,
                album_id: e,
                hash: t
            }, {
                onDone: function(o, e) {
                    curBox().hide();
                    var t = ge("pv_album_name");
                    t && (t.innerHTML = o), cur.pvCurPhoto.album = o, showDoneBox('<div class="pv_done_box">' + getLang("photos_move_to_album_success").replace("{album}", o) + "</div>")
                }
            })
        },
        setTags: function(o) {
            return Photoview.hideTag(), o ? (show(cur.pvTags), window.tooltips && each(geByClass("delete", cur.pvTags), function() {
                tooltips.destroy(this)
            }), void(cur.pvTags.innerHTML = getLang("photos_onthisphoto") + ": " + o)) : void hide(cur.pvTags)
        },
        preload: function(o, e) {
            window.updateWndVScroll && updateWndVScroll();
            var t = cur.pvListId,
                r = ((cur.pvData || {})[t] || {}).length;
            if (r) {
                var a = cur.pvVeryBig > 2 ? "w" : cur.pvVeryBig ? "z" : "y",
                    i = cur.pvVeryBig > 1 ? "z" : cur.pvVeryBig ? "z" : "y",
                    p = cur.pvVeryBig > 1 ? "z" : cur.pvVeryBig ? "y" : "x",
                    s = cur.pvVeryBig > 1 ? "y" : cur.pvVeryBig ? "x" : 0;
                cur.pvLastFrom = o, cur.pvLastDirection = e;
                for (var v = cur.shownAs1AprilEditor ? Photoview.photoSize1April : Photoview.allSizes, n = 0; n < Math.min(Photoview.cacheSize, r - Photoview.cacheSize); ++n) {
                    for (var c = o + (n + 1) * -e; c >= r;) c -= r;
                    for (; 0 > c;) c += r;
                    var u = cur.pvData[t][c];
                    if (u)
                        for (var l = 0, d = v.length; d > l; ++l) {
                            var h = v[l];
                            u[h] && u[h].src && (u[h].src = Photoview.blank, delete u[h])
                        }
                }
                for (var n = 0; n < Photoview.cacheSize; ++n) {
                    for (var c = o + (n + 1) * e; c >= r;) c -= r;
                    for (; 0 > c;) c += r;
                    var u = cur.pvData[t][c];
                    if (!u || !u.id) {
                        (!u || vkNow() - u > 3e3) && (cur.pvData[t][c] = vkNow(), setTimeout(function() {
                            ajax.post("al_photos.php", {
                                act: "show",
                                list: t,
                                offset: Photoview.realOffset(t, c, -1),
                                direction: e
                            }, {
                                onDone: Photoview.loaded
                            })
                        }, 10));
                        break
                    }
                    u[a] || (u[a + "_src"] ? (u[a] = vkImage(), u[a].src = u[a + "_src"]) : (u[a] = 1, u[i] || (u[i + "_src"] ? (u[i] = vkImage(), u[i].src = u[i + "_src"]) : (u[i] = 1, u[p] || (u[p + "_src"] ? (u[p] = vkImage(), u[p].src = u[p + "_src"]) : (u[p] = 1, u[s] || (u[s + "_src"] ? (u[s] = vkImage(), u[s].src = u[s + "_src"]) : (u[s] = 1, u.x || (u.x = vkImage(), u.x.src = u.x_src)))))))))
                }
            }
        },
        hide: function(o, e) {
            if (cur.pvShown && (!__afterFocus || e === !0)) {
                if (cur.pvCanvas && Photoview.fullscreenStop(!0), cur.prevPhotoWidth = cur.prevPhotoHeight = 0, (cur.pvJumpTo || {}).z == "albums" + val("pva_owner") && !cur.pvAlbumsShown && 0 === o) return Photoview.jumpToAlbums(!0);
                if ((cur.pvJumpTo || {}).z == "album" + val("pvsa_album") && !cur.pvAlbumShown && 0 === o) return Photoview.jumpToAlbum(!0);
                if ((cur.pvJumpTo || {}).z == "tag" + val("pvsa_tag") && !cur.pvPhotoTagShown && 0 === o) return Photoview.jumpToTagged(!0);
                if ("temp" == cur.pvListId) cur.pvCancelLoad();
                else if (!cur.pvNoHistory && !o && cur.pvHistoryLength > 0 && cur.pvHistoryLength < 10) return cur.pvNoHistory = !0, __adsUpdate("very_lazy"), cur.pvBodyScrollTop = bodyNode.scrollTop, history.go(-cur.pvHistoryLength);
                if (o !== !0 && !layerQueue.count()) {
                    var t;
                    cur.pvRoot ? ("newtag" == cur.pvListId.substr(0, 6) ? (t = "albums" + vk.id + "?act=added", -1 != cur.pvListId.indexOf("/rev") && (t += "&rev=1")) : t = cur.pvListId.replace(/^photos/, "albums").replace("/rev", "?rev=1"), nav.setLoc(t)) : (t = clone(nav.objLoc), delete t.z), nav.strLoc != nav.toStr(t) && nav.setLoc(t), __adsUpdate("very_lazy")
                }
                window.__pvhideTimer = setTimeout(Photoview.doHide.pbind(cur), 0), __adsUpdate(), cur.pvAlbumsShowing = cur.pvAlbumsShown = !1, cur.pvAlbumShowing = cur.pvAlbumShown = !1, cur.pvPhotoTagShowing = cur.pvPhotoTagShown = !1, cur.pvVideoTagShowing = cur.pvVideoTagsShown = !1
            }
        },
        doHide: function(o) {
            void 0 !== cur.pvBodyScrollTop && (bodyNode.scrollTop = cur.pvBodyScrollTop, delete cur.pvBodyScrollTop), cur.pvPhotoTooltip && (cur.pvPhotoTooltip.unMount(), delete cur.pvPhotoTooltip), o.pvHistoryLength = 0, cur.pvTagger && Phototag.stopTag(), cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), o.pvFriends && (cleanElems("pv_add_tag", "pv_cancel_tag", o.pvFriends.firstChild.firstChild, o.pvFriends), re(o.pvFriends), o.pvFriends = o.pvFriendName = !1), Wall.cancelEdit(!0);
            var e = cur.shownAs1AprilEditor ? Photoview.photoSize1April : Photoview.allSizes,
                t = o.pvListId,
                r = ((o.pvData || {})[t] || {}).length;
            if (o.pvLastDirection && r) {
                for (var a = 0; a < Photoview.cacheSize; ++a) {
                    for (var i = o.pvLastFrom + (a + 1) * o.pvLastDirection; i >= r;) i -= r;
                    for (; 0 > i;) i += r;
                    var p = o.pvData[t][i];
                    if (p)
                        for (var s = 0, v = e.length; v > s; ++s) {
                            var n = e[s];
                            p[n] && p[n].src && (p[n].src = Photoview.blank, delete p[n])
                        }
                }
                o.pvLastDirection = o.pvLastFrom = !1
            }
            cur.pvYourComment = re(cur.pvYourComment), layers.hide(), layers.fullhide = !1, Photoview.hideTag(!0), delete cur.pvLayerCreated, window.tooltips && tooltips.destroyAll(cur.pvBox), removeClass(layerWrap, "pv_layer_wrap"), removeClass(layerBG, "pv_layer"), layerBG.style.opacity = "", o.pvShown = o.pvListId = o.pvClicked = !1, removeEvent(window, "resize", Photoview.onResize), removeEvent(document, "keydown", Photoview.onKeyDown), removeEvent(layerWrap, "click", Photoview.onLayerClick), removeEvent(layerWrap, "scroll", Photoview.scrollResize), removeEvent(layerWrap, "mousemove", Photoview.onLayerMouseMove);
            var c = cur.pvOptions && cur.pvOptions.onHide;
            if (cur.pvOptions) {
                var c = cur.pvOptions.onHide;
                cur.pvOptions.onHide = !1, c && c()
            }
            if (layerQueue.pop(), Photoview.destroyPeriod(), o.pvPreloaded && o === cur) {
                for (var u = geByClass1("photos_container"), l = ce("div", {
                        innerHTML: o.pvPreloaded
                    }); l.firstChild;) u.appendChild(l.firstChild);
                u.qsorter && setTimeout(qsorter.added.pbind(u), 0), o.pvPreloaded = !1
            }
            uiScrollBox.hide(), Photoview.toggleFastChats(!0), delete cur.pvEditorMode, delete cur.pvEditorModeDimensionsUpdated, cur.shownAs1AprilEditor && (delete cur.shownAs1AprilEditor, delete cur.pvData), cur.pvPhotoTags && (cur.pvPhotoTags.unMount(), delete cur.pvPhotoTags)
        },
        editPhoto: function() {},
        descTT: function(o) {
            return showTooltip(o, {
                text: getLang("photos_edit_desc"),
                black: 1,
                shift: [-160, 13, 0],
                showdt: 0,
                appendParentCls: "narrow_column"
            })
        },
        editInline: function(o, e) {
            if ("A" != ((o || window.event || {}).target || {}).tagName && !cur.pvEditing) {
                window.tooltips && window.tooltips.hideAll();
                var t = cur.pvListId,
                    r = cur.pvIndex,
                    a = cur.pvData[t][r],
                    e = !a.desc,
                    i = function(o) {
                        if (cur.pvShown && cur.pvListId == t && cur.pvIndex == r && !cur.pvEditing) {
                            cur.pvEditing = [t, r];
                            var e = cur.pvDesc.appendChild(ce("div", {
                                    innerHTML: '          <textarea class="dark" id="pv_edit_text" onkeydown="onCtrlEnter(event, Photoview.saveInline)" onkeyup="checkTextLength(cur.pvCaptionLimit, this, ge(\'pv_caption_warn\'));" placeholder="' + getLang("photos_edit_desc_intro") + '">' + o + '</textarea>         <div id="pv_caption_warn"><div>'
                                }, {
                                    display: "none"
                                })),
                                a = ge("pv_edit_text");
                            autosizeSetup(a, {
                                minHeight: 21,
                                maxHeight: 350
                            }), setTimeout(function() {
                                show(e), elfocus(a), addEvent(a, "blur", Photoview.saveInline), hide(cur.pvDesc.firstChild), cur.pvNarrowScrollbar.scrollTop(0)
                            }, 1)
                        }
                    };
                e ? i("") : ajax.post("al_photos.php", {
                    act: "edit_desc",
                    photo: a.id
                }, {
                    onDone: i,
                    progress: cur.pvProgress
                })
            }
        },
        cancelInline: function() {
            cur.pvEditing = !1, removeEvent(ge("pv_edit_text"), "blur"), show(cur.pvDesc.firstChild), re(cur.pvDesc.firstChild.nextSibling)
        },
        saveInline: function() {
            if (cur.pvEditing) {
                removeEvent(ge("pv_edit_text"), "blur");
                var o = cur.pvEditing[0],
                    e = cur.pvEditing[1],
                    t = cur.pvData[o][e],
                    r = trim(val("pv_edit_text"));
                return geByClass1("pv_desc_edit", cur.pvDesc) && !r ? Photoview.cancelInline() : void ajax.post("al_photos.php", {
                    act: "save_desc",
                    photo: t.id,
                    hash: t.hash,
                    text: r
                }, {
                    onDone: function(r) {
                        t.desc = r;
                        var a = cur.pvShown && o == cur.pvListId && e == cur.pvIndex;
                        if (a) {
                            cur.pvEditing = !1;
                            var i = domFC(cur.pvDesc);
                            val(i, r || '<span class="pv_desc_edit">' + getLang("photos_edit_desc") + "</span>"), i.onmouseover = r ? Photoview.descTT.pbind(i) : function() {}, show(i), re(domNS(i))
                        }
                    },
                    progress: cur.pvProgress
                })
            }
        },
        cmp: function(o, e) {
            var t = o.length,
                r = e.length;
            return r > t ? -1 : t > r ? 1 : e > o ? -1 : o > e ? 1 : 0
        },
        receiveComms: function(o, e, t, r, a, i) {
            if (o == cur.pvListId && e == cur.pvIndex) {
                for (var p = ce("div", {
                        innerHTML: t
                    }), s = ge("pv_comments_list"), v = current = domLC(s), n = getXY(current, !0)[1], c = cur.pvData[o][e], u = domLC(p); u; u = domLC(p)) {
                    for (c.actions.comm && addClass(u, "reply_replieable"); current && Photoview.cmp(current.id, u.id) > 0;) current = domPS(current);
                    current && !Photoview.cmp(current.id, u.id) ? (s.replaceChild(u, current), current = u) : (current && domNS(current) ? s.insertBefore(u, domNS(current)) : !current && domFC(s) ? a === !0 ? (--c.commshown, p.removeChild(u)) : s.insertBefore(u, domFC(s)) : s.appendChild(u), ++c.commshown)
                }
                i && v && (layerWrap.scrollTop += getXY(v, !0)[1] - n), cur.pvCommsLikes[c.id][0] = ge("pv_comments"), extend(cur.pvReplyNames, r), Photoview.updateComms()
            }
        },
        commSaved: function(o) {
            if (cur.pvShown) {
                var e = ge("pv_comments"),
                    t = e ? cur.pvData[cur.pvListId][cur.pvIndex] : !1,
                    r = o.match(/^(-?\d+)photo(_\d+)/);
                t && r && ge("pv_comment" + r[1] + r[2]) && (cur.pvCommsLikes[t.id][0] = e)
            }
        },
        comments: function(o) {
            if (o) {
                var e = domFC(ge("pv_comments")).id || "";
                if (!isVisible("pv_comments_header") || Photoview.cmp(e, "pv_comment" + o) < 0) return
            }
            var t = cur.pvListId,
                r = cur.pvIndex,
                a = cur.pvData[t][r],
                i = ge("pv_comments_header");
            ajax.post("al_photos.php", {
                act: "photo_comments",
                offset: a.commshown,
                photo: a.id,
                list_id: cur.pvListId
            }, {
                onDone: function(e, a) {
                    Photoview.receiveComms(t, r, e, a, !1, o), o && ge("pv_comment" + o) && Photoview.showComment(o)
                },
                showProgress: function() {
                    i.innerHTML = "", showProgress(i)
                },
                hideProgress: function() {
                    hideProgress(i)
                }
            })
        },
        updateComms: function(o) {
            var e = cur.pvData[cur.pvListId][cur.pvIndex],
                t = "",
                r = ge("pv_comments_header");
            e.commcount > e.commshown && (t = getLang("photos_show_prev_comments", e.commcount - e.commshown)), toggleClass(ge("pv_comments_list"), "unshown", !o && 0 == e.commcount), toggle(r, t), toggle(geByClass1("pv_no_commments_placeholder"), 0 == e.commcount && !geByClass1("_post_content", cur.pvBox)), r.innerHTML = t
        },
        commentChanged: function() {
            checkTextLength(cur.pvCommLimit, cur.pvComment), cur.pvCommenting = cur.pvData[cur.pvListId][cur.pvIndex].id
        },
        updateRightBlock: function(o) {
            function e() {
                var o = getSize(cur.pvLeftWrap)[1],
                    e = o - (cur.pvReplyForm ? getSize(cur.pvReplyForm)[1] : 0);
                setStyle(cur.pvNarrow, "height", e);
                var t = geByClass1("pv_no_commments_placeholder_wrap");
                if (t && (isVisible(t.children[0]) || isVisible(t.children[1]))) {
                    var r = getSize(t)[1],
                        a = getSize("pv_comments_list")[1],
                        i = ge("pv_comments"),
                        p = e - i.offsetTop - a;
                    setStyle(t, "margin-top", Math.max(0, p / 2 - r / 2))
                }
            }
            e(), clearTimeout(cur.pvRightBlockUpdateTO), cur.pvRightBlockUpdateTO = setTimeout(e)
        },
        getReplyAsGroupEl: function() {
            return ge("pv_reply_as_group")
        },
        sendComment: function(o, e, t) {
            var r = cur.pvListId,
                a = cur.pvIndex,
                i = cur.pvData[r][a],
                p = ge("reply_field" + o),
                s = p && data(p, "composer"),
                v = (cur.pvReplyNames[(cur.reply_to || {})[0]] || [])[1],
                n = geByClass1("addpost_button", cur.pvReplyForm),
                c = t ? t.stickerId : !1;
            if (c) var u = {
                message: "",
                attach1_type: "sticker",
                attach1: c
            };
            else {
                var u = s ? Composer.getSendParams(s, Photoview.sendComment.pbind(o)) : {
                    message: trim(Emoji.editableVal(p))
                };
                if (u.delayed) return;
                if (!u.attach1_type && (!u.message || v && !v.indexOf(u.message))) return void Emoji.editableFocus(p, !1, !0)
            }
            hide("reply_warn" + o);
            var l = Photoview.getReplyAsGroupEl();
            ajax.post("al_photos.php", Wall.fixPostParams(extend(u, {
                act: "post_comment",
                photo: i.id,
                hash: i.hash,
                fromview: 1,
                from_group: l && domData(domClosest("_submit_post_box", ge(l)), "from-oid") < 0 ? 1 : "",
                reply_to: (cur.reply_to || {})[1]
            })), {
                onDone: function(t, v) {
                    ++i.commcount, Photoview.receiveComms(r, a, t, v, !0), c || (s ? Composer.reset(s) : Emoji.val(p, "")), p.autosize && p.autosize.update(), browser.mobile ? Wall.hideEditReply(o) : (Emoji.editableFocus(p, !1, !0), Wall.cancelReplyTo(o, e)), re("reply_link" + o), Wall.hideEditPostReply(null, !0), cur.pvNarrowScrollbar && cur.pvNarrowScrollbar.scrollBottom(), Photoview.updateRightBlock()
                },
                showProgress: function() {
                    lockButton(n)
                },
                hideProgress: function() {
                    unlockButton(n)
                }
            })
        },
        highlightComment: function(o) {
            if (o = ge(o)) {
                var e = animate.pbind(o, {
                        backgroundColor: "#ECEFF3"
                    }, 200, function() {
                        setTimeout(function() {
                            animate(o, {
                                backgroundColor: "#FFF"
                            }, 200, function() {
                                setStyle(o, {
                                    backgroundColor: ""
                                })
                            })
                        }, 1e3)
                    }),
                    t = getXY(o, !0)[1];
                0 > t || t > lastWindowHeight - 200 ? animate(layerWrap, {
                    scrollTop: layerWrap.scrollTop + t - 50
                }, 300, e) : e()
            }
        },
        showComment: function(o) {
            var e = ge("pv_comment" + o);
            return e ? Photoview.highlightComment(e) : Photoview.comments(o), !1
        },
        commDone: function(node, text, del, script) {
            if (node) {
                var fc = domFC(node),
                    msg = domNS(fc),
                    ph = void 0 == cur.pvListId || void 0 == cur.pvIndex ? !1 : cur.pvData[cur.pvListId][cur.pvIndex];
                if (!text) return show(fc), hide(msg), void(ph ? (++ph.commcount, ++ph.commshown, Photoview.updateComms()) : window.photos && cur.offset && photos.recache(cur.offset, 1));
                msg ? (msg.innerHTML = text, show(msg)) : node.appendChild(ce("div", {
                    innerHTML: text
                })), hide(fc), del && (ph ? (--ph.commshown, --ph.commcount, Photoview.updateComms(del)) : window.photos && cur.offset && photos.recache(cur.offset, -1)), ph && (cur.pvCommsLikes[ph.id][0] = ge("pv_comments")), script && eval(script)
            }
        },
        commProgress: function(o, e) {
            var t = ge("pv_actions" + o);
            if (t) {
                var r = t.firstChild.nextSibling;
                if (e !== !0) return hide(r), void show(t.firstChild);
                hide(t.firstChild), r || (r = t.appendChild(ce("div", {
                    className: "progress"
                }))), show(r)
            }
        },
        commParams: function(o, e) {
            return {
                onDone: Photoview.commDone.pbind(o, e),
                progress: "pv_progress" + o + e,
                stat: ["privacy.js", "privacy.css"]
            }
        },
        commAction: function(o, e, t, r) {
            var a = gpeByClass("reply", e),
                i = gpeByClass("post_actions", e),
                p = "post_actions_progress";
            hasClass(a, p) || ajax.post("al_photos.php", {
                act: o + "_comment",
                comment: t,
                hash: r
            }, {
                onDone: Photoview.commDone.pbind(a),
                showProgress: addClass.pbind(i, p),
                hideProgress: removeClass.pbind(i, p)
            })
        },
        _isOverLayer: function(o) {
            return o.target == layer || o.target == cur.pvCont
        },
        _isOverLayerLeft: function(o) {
            if (Photoview._isOverLayer(o)) {
                var e = getXY(cur.pvBox),
                    t = getSize(cur.pvBox),
                    r = o.pageX < e[0] && o.pageY > e[1] && o.pageY < e[1] + t[1];
                return r
            }
        },
        onLayerMouseMove: function(o) {
            if (Photoview._isOverLayer(o)) {
                var e = Photoview._isOverLayerLeft(o);
                toggleClass(layerWrap, "pv_left_panel_over", e), toggleClass(cur.pvNavBtnLeft, "pv_nav_btn_show", e)
            } else removeClass(layerWrap, "pv_left_panel_over")
        },
        onLayerClick: function(o, e) {
            return cur.pvEditorMode ? void((o.target == layerWrap || o.target == layer) && SPE.attemptHide(function() {
                Photoview.hide(0)
            })) : Photoview._isOverLayer(o) && Photoview._isOverLayerLeft(o) ? Photoview.show(!1, cur.pvIndex - 1, o) : void Photoview._doLayerClick(o, e)
        },
        _doLayerClick: function(o, e) {
            if (cur.pvClicked && !e || __afterFocus || o && cur.__mdEvent && o.target != cur.__mdEvent.target) return void(cur.pvClicked = !1);
            if (!o || 2 != o.button && 3 != o.which && !o.pvHandle) {
                o && (o.pvHandle = !0);
                var t = o.pageX,
                    r = o.pageY;
                if (null == t && null != o.clientX) {
                    var a = document.documentElement,
                        i = bodyNode;
                    t = event.clientX + (a && a.scrollLeft || i && i.scrollLeft || 0) - (a.clientLeft || 0), r = event.clientY + (a && a.scrollTop || i && i.scrollTop || 0) - (a.clientTop || 0)
                }
                var p = Math.abs(t - intval(cur.pvOldX)),
                    s = Math.abs(r - intval(cur.pvOldY));
                (p > 3 || s > 3) && vkNow() - intval(cur.pvOldT) > 300 && (cur.pvTagger ? Phototag.stopTag() : Photoview.hide(0))
            }
        },
        onKeyDown: function(o) {
            if (o.returnValue === !1) return !1;
            if (window.SPE && cur.pvEditorMode) return SPE.onKeyPress(o);
            if (inArray(o.keyCode, [KEY.DOWN, KEY.UP]) && cur.pvNarrowScrollbar && !hasClass(o.target, "reply_field")) return cur.pvNarrowScrollbar.scrollBy(o.keyCode == KEY.DOWN ? 70 : -70), cancelEvent(o);
            if (o.keyCode == KEY.ESC && cur.pvEditing) return Photoview.cancelInline(), cancelEvent(o);
            o.altKey && o.keyCode == KEY.RETURN && Photoview.canFullscreen() && (cur.pvCanvas ? Photoview.fullscreenStop() : Photoview.fullscreen()), o.keyCode == KEY.SPACE && cur.pvCanvas && window.FullscreenPV && (FullscreenPV.startSlide(), FullscreenPV.showControls(!0));
            var e = o.target.contentEditable;
            return window.Emoji && Emoji.shown || o.target && ("INPUT" == o.target.tagName || "TEXTAREA" == o.target.tagName || "DIV" == o.target.tagName && e && "inherit" != e) ? !0 : o.keyCode == KEY.ESC ? (cur.pvCanvas ? Photoview.fullscreenStop() : cur.pvTagger ? Phototag.stopTag() : o.vkCanceled || curBox() || Photoview.hide(0), cancelEvent(o)) : (cur.pvTagger || boxQueue.count() || cur.pvComment && cur.pvComment.focused || o.ctrlKey || (o.keyCode == KEY.RIGHT ? Photoview.show(cur.pvListId, cur.pvIndex + 1) : o.keyCode == KEY.LEFT && Photoview.show(cur.pvListId, cur.pvIndex - 1)), cur.pvCanvas && window.FullscreenPV ? !1 : void 0)
        },
        updateVerticalPosition: function(o) {
            if (cur.pvCont) {
                var e = getSize(cur.pvCont),
                    t = clientHeight(),
                    r = t / 2 - e[1] / 2 - intval(o);
                setStyle(layer, "margin-top", Math.round(r))
            }
        },
        calculateVeryBig: function() {
            var o = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            o > 1800 ? cur.pvVeryBig = 3 : o > 1200 ? cur.pvVeryBig = 2 : o > 800 ? cur.pvVeryBig = 1 : cur.pvVeryBig = !1, window.devicePixelRatio > 1 && (cur.pvVeryBig += 1, cur.pvVeryBig = Math.min(3, cur.pvVeryBig))
        },
        updateNavBtnsLeftThreshold: function(o) {
            var e = getSize(cur.pvImageWrap)[0],
                t = getXY(cur.pvImageWrap)[0];
            (!cur.pvLeftBtnAmount || o) && (cur.pvLeftBtnAmount = t + Photoview.LEFT_RIGHT_NAV_RATIO * e)
        },
        updatePhotoDimensions: function(o) {
            if (!Photoview.isPhotosList() && !cur.pvEditorModeDimensionsUpdated) {
                var e = Photoview.MIN_WIDTH,
                    t = Photoview.MIN_HEIGHT;
                cur.pvEditorMode && (e = Photoview.PE_MIN_WIDTH, t = Photoview.PE_MIN_HEIGHT, cur.pvEditorModeDimensionsUpdated = !0), cur.shownAs1AprilEditor && (e = 400, t = Math.min(649, Math.max(cur.pvCurData.height, 449)) + 49), removeClass(cur.pvBottomInfo, "pv_with_line_break");
                var r = isVisible(cur.pvTagInfo),
                    a = r ? getSize(cur.pvTagInfo)[1] : 0,
                    i = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                    p = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    s = getSize(cur.pvBottomInfo)[1],
                    v = Math.max(e, i - Photoview.SIDE_COLUMN_WIDTH - 2 * Photoview.SIDE_MIN_GAP),
                    n = Math.max(t, p - s - 2 * Photoview.VERTICAL_MIN_GAP - a);
                Photoview.calculateVeryBig();
                var c = clone(cur.pvCurData || {
                    width: e,
                    height: t
                });
                c.width = c.width || e, c.height = c.height || t;
                var u = c.width / c.height,
                    l = Math.min(v, c.width),
                    d = l / u;
                d = Math.min(n, d), l = Math.ceil(d * u);
                var h = getXY(cur.pvBottomLeft)[0] + getSize(cur.pvBottomLeft)[0] > getXY(cur.pvBottomActions)[0] - 20;
                toggleClass(cur.pvBottomInfo, "pv_with_line_break", h), o && (cur.prevPhotoWidth = cur.prevPhotoHeight = 0);
                var g = cur.prevPhotoWidth = Math.max(l, e, cur.prevPhotoWidth || 0),
                    _ = cur.prevPhotoHeight = Math.max(d, t, (cur.prevPhotoHeight || 0) - a),
                    m = Math.max(0, _ / 2 - d / 2);
                if (m > 0 && !r) {
                    var w = getSize(cur.pvPhoto)[1] + s,
                        f = w / 2 - d / 2;
                    f > s && (m = f)
                }
                setStyle(cur.pvPhoto, {
                    width: g,
                    height: _
                }), setStyle(domFC(cur.pvPhoto), {
                    width: l,
                    height: d,
                    marginTop: m
                }), setStyle(cur.pvTagInfo, {
                    width: g
                }), cur.pvTagFrame && Photoview.updateTagFrameDimensions(l, d, m), cur.pvPhotoTagsContainer && Photoview.updatePhotoTagsContainerDimensions(l), setStyle(cur.pvImgProgress, "marginTop", m + d / 2);
                var P = (cur.pvIsLightMode ? 0 : Photoview.SIDE_COLUMN_WIDTH) + g;
                setStyle(cur.pvCont, {
                    width: P,
                    paddingLeft: sbWidth()
                }), Photoview.updateRightBlock(), Photoview.updateVerticalPosition(), cur.pvPhWidth = l, cur.pvPhHeight = d, Photoview.updateNavBtnsLeftThreshold();
                var b = getXY(cur.pvCont),
                    T = getSize(cur.pvCont),
                    C = b[1] + T[1],
                    L = b[0] + T[0],
                    y = 60,
                    S = 85,
                    x = S > i - L || y > p - C;
                Photoview.toggleFastChats(!x)
            }
        },
        toggleFastChats: function(o) {
            toggleClass("chat_onl_wrap", "hidden", !o), each(geByClass("rb_box_wrap"), function() {
                toggleClass(this, "hidden", !o)
            })
        },
        onResize: function() {
            lastWindowWidth,
            lastWindowHeight,
            sbWidth();
            if (cur.pvCanvas) {
                var o = !1,
                    e = cur.pvVeryBig,
                    t = cur.pvCanvas.offsetWidth,
                    r = cur.pvCanvas.offsetHeight;
                return cur.pvVeryBig = t > 1280 || r > 1280 ? 2 : t > 807 || r > 807 ? 1 : !1, void((o = e != cur.pvVeryBig) && setTimeout(Photoview.preload.pbind(cur.pvIndex, cur.pvLastDirection || 1), 10))
            }
            if (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown ? setStyle(cur.pvCont, "width", 800) : Photoview.updatePhotoDimensions(!0), cur.pvPhoto) {
                if (browser.mozilla && cur.pvPhoto.firstChild) {
                    var a = cur.pvPhoto.firstChild.offsetLeft,
                        i = (lastWindowWidth - cur.pvActualWidth) % 2 && (cur.pvActualWidth - cur.pvPhWidth) % 2 ? 4 : 3;
                    setStyle(cur.pvTagFrame, {
                        left: a - i + "px"
                    })
                }
                Photoview.scrollResize()
            }
        },
        updateSize: function() {
            cur.pvBox && toggleClass(cur.pvBox, "photos_is_albums_view", !!cur.pvAlbumsShown || !!cur.pvAlbumShown), onBodyResize(), Photoview.onResize()
        },
        activate: function(o) {
            o && o.timeout ? (clearTimeout(o.timeout), removeAttr(o, "timeout")) : isVisible(o) && fadeTo(o, 200, vk.pvdark ? 1 : .7)
        },
        deactivate: function(o) {
            o && isVisible(o) && !o.timeout && (o.timeout = setTimeout(function() {
                removeAttr(o, "timeout"), fadeTo(o, 200, .4)
            }, 1))
        },
        deletePhoto: function(o) {
            var e = cur.pvListId,
                t = cur.pvIndex,
                r = cur.pvData[e][t],
                a = curBox();
            if (cur.deletionProgress = cur.deletionProgress || {}, !cur.deletionProgress[r.id]) {
                if (cur.deletionProgress[r.id] = !0, cur.pvTagger && ev !== !1) return void Phototag.stopTag();
                cur.pvPhotoTags && cur.pvPhotoTags.hideAreas(), ajax.post("al_photos.php", {
                    act: "delete_photo",
                    photo: r.id,
                    hash: r.hash,
                    set_prev: isChecked("pvb_prev_check"),
                    sure: intval(o)
                }, {
                    onDone: function(o, i) {
                        return cur.deletionProgress[r.id] = !1, a ? (a.hide(), nav.go("/id0", !1, {
                            nocur: !0
                        })) : void(e == cur.pvListId && t == cur.pvIndex && (cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(i || getLang("photo_deleted"), o), r.deleted = [cur.pvTagInfoText.innerHTML, cur.pvTagInfoButtons.innerHTML], Photoview.toggleDeletedState(!0), Photoview.updatePhotoDimensions()))
                    }
                })
            }
        },
        restorePhoto: function(o) {
            var e = cur.pvListId,
                t = cur.pvIndex,
                r = cur.pvData[e][t];
            isButtonLocked(o) || ajax.post("al_photos.php", {
                act: "restore_photo",
                photo: r.id,
                hash: r.hash
            }, {
                onDone: function(o) {
                    r.deleted = !1, e == cur.pvListId && t == cur.pvIndex && (cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(!1), Photoview.toggleDeletedState(!1), Photoview.updatePhotoDimensions()), cur.pvPhotoTags && cur.pvPhotoTags.showAreas()
                },
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o)
            })
        },
        spamPhoto: function(o, e) {
            var t = cur.pvListId,
                r = cur.pvIndex,
                a = cur.pvData[t][r];
            if (!isButtonLocked(e)) return cur.pvTagger && ev !== !1 ? void Phototag.stopTag() : void ajax.post("al_photos.php", {
                act: "spam_photo",
                photo: a.id,
                hash: a.hash,
                spam_hash: o,
                pv: 1
            }, {
                onDone: function(o, e) {
                    e && (a.deleted = o), t == cur.pvListId && r == cur.pvIndex && (cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(getLang("photo_marked_as_spam_restore"), o), e && hide(cur.pvCommentsData))
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        },
        rotatePhoto: function(o) {
            var e = ge("pv_rotate_progress");
            if (!isVisible(e)) {
                show(e), ge("pv_rotate").appendChild(ce("div", {
                    id: "pv_rotate_frame",
                    className: "upload_frame",
                    innerHTML: '<iframe name="pv_rotate_frame"></iframe>'
                }));
                var t = cur.pvListId,
                    r = cur.pvIndex,
                    a = cur.pvData[t][r],
                    i = ge("pv_rotate_form");
                i.innerHTML = "", i.action = a.rotate[0];
                var p = extend({
                    act: "do_rotate",
                    to: o,
                    list_id: t,
                    index: r,
                    fid: a.id
                }, a.rotate);
                if (o = (o + 4) % 4, "rotate_photo" == p.act && (p.angle = (p.angle + o) % 4), p["rot" + o]) return p.act = "done_rotate", p.complete = 1, void ajax.post("/al_photos.php", p, {
                    onDone: Photoview.rotateDone,
                    onFail: function() {
                        Photoview.rotateDone()
                    }
                });
                for (var s in p) 0 != s && i.appendChild(ce("input", {
                    type: "hidden",
                    name: s,
                    value: p[s]
                }));
                i.submit()
            }
        },
        rotateDone: function(o) {
            hide("pv_rotate_progress");
            var e = ge("pv_rotate_frame");
            if (e && (re(e), o)) {
                var t = o.list_id,
                    r = o.index,
                    a = cur.pvData[t][r];
                extend(a, {
                    x_src: o.x_src,
                    y_src: o.y_src,
                    z_src: o.z_src,
                    w_src: o.w_src,
                    base: o.base,
                    x_: o.x_,
                    y_: o.y_,
                    z_: o.z_,
                    w_: o.w_,
                    x: 0,
                    y: 0,
                    z: 0,
                    w: 0,
                    tags: o.tags,
                    tagged: o.tagged,
                    suggested_tags: o.suggested_tags,
                    tagshtml: o.html
                }), extend(a.rotate, {
                    photo: o.photo,
                    hash: o.hash,
                    rhash: o.rhash,
                    angle: o.angle,
                    rot1: o.rot1,
                    rot3: o.rot3
                }), t == cur.pvListId && r == cur.pvIndex && Photoview.show(t, r), cur.pvPhotoTags && cur.pvPhot
            }
        },
        likeUpdate: function(o, e, t) {
            e = intval(e);
            var r = cur.pvListId,
                a = cur.pvIndex,
                i = (cur.pvData[r][a], ge("pv_like")),
                p = (domByClass(i, "_icon"), domByClass(i, "_count"));
            if (p) {
                var s = i.tt || {},
                    v = clone(s.opts || {}),
                    n = domByClass(s.container, "_value"),
                    c = domByClass(s.container, "_content"),
                    u = domByClass(s.container, "_title");
                t && u && val(u, t), s && (s.likeInvalidated = !0), n && (n.value = e), animateCount(p, e), toggleClass(i, "pv_liked", o), toggleClass(i, "no_likes", !e), toggleClass(c, "me_hidden", !o), e ? !s.el || isVisible(s.container) || t || tooltips.show(s.el, extend(v, {
                    showdt: 0
                })) : s.el && s.hide(), toggleClass(cur.pvHH, "pv_liked", !!o)
            }
        },
        like: function() {
            if (vk.id) {
                var o = cur.pvListId,
                    e = cur.pvIndex,
                    t = cur.pvData[o][e];
                if (cur.pvLikeInProgress = cur.pvLikeInProgress || {}, !cur.pvLikeInProgress[t.id]) {
                    cur.pvLikeInProgress[t.id] = !0;
                    var r = t.liked = !t.liked;
                    cur.pvCommsLikes[t.id][1] += r ? 1 : -1, ajax.post("like.php", {
                        act: "a_do_" + (r ? "" : "un") + "like",
                        object: "photo" + t.id,
                        hash: t.hash,
                        from: "photo_viewer"
                    }, {
                        onDone: function(a, i) {
                            return cur.pvLikeInProgress[t.id] -= 1, cur.pvListId == o && cur.pvIndex == e ? Photoview.likeUpdate(r, a, i) : (cur.pvCommsLikes[t.id][1] = a, void(t.liked = r))
                        }
                    }), Photoview.likeUpdate(r, cur.pvCommsLikes[t.id][1])
                }
            }
        },
        likeShare: function(o) {
            if (vk.id) {
                var e = cur.pvListId,
                    t = cur.pvIndex,
                    r = cur.pvData[e][t],
                    a = ge("like_share_photo" + r.id),
                    i = isChecked(a);
                checkbox(a), ajax.post("like.php", {
                    act: "a_do_" + (i ? "un" : "") + "publish",
                    object: "photo" + r.id,
                    list: e,
                    hash: o,
                    from: "photo_viewer"
                }, {
                    onDone: function(o, a) {
                        return cur.pvListId == e && cur.pvIndex == t ? Photoview.likeUpdate(!0, o, a) : (cur.pvCommsLikes[r.id][1] = o, void(r.liked = !0))
                    }
                }), Photoview.likeUpdate(!0, cur.pvCommsLikes[r.id][1] + (r.liked ? 0 : 1))
            }
        },
        likeOver: function(o) {
            var e = cur.pvListId,
                t = cur.pvIndex,
                r = cur.pvData[e][t],
                a = domByClass(o, "_icon");
            if (a && !cur.viewAsBox) {
                var i = 41,
                    p = getXY(o)[0],
                    s = getXY(a)[0],
                    v = getSize(a, !0)[0],
                    n = s + v / 2 - p - i;
                showTooltip(o, {
                    url: "like.php",
                    params: {
                        act: "a_get_stats",
                        object: "photo" + r.id,
                        list: e
                    },
                    slide: 15,
                    shift: [-n, 6],
                    ajaxdt: 100,
                    showdt: 400,
                    hidedt: 200,
                    typeClass: "like_tt",
                    className: "pv_like_tt",
                    dir: "auto"
                })
            }
        },
        likeOut: function() {
            var o = cur.pvListId,
                e = cur.pvIndex,
                t = cur.pvData[o][e];
            t.liked || setTimeout(animate.pbind(cur.pvLikeIcon, {
                opacity: .4
            }, 200, !1), 1)
        },
        likesShowList: function(o) {
            var e = domPN(o),
                t = domByClass(e, "_icon"),
                r = cur.pvCurPhoto;
            if (t && !cur.viewAsBox && r) {
                var a = "photo" + r.id;
                showWiki({
                    w: "likes/" + clean(a)
                }, !1, !1, {
                    queue: 1
                })
            }
        },
        tagOver: function(o) {
            animate(o, {
                backgroundColor: "#6B8DB1"
            }, 200), showTooltip(o, {
                text: getLang("photos_delete_tag"),
                shift: [0, -2, 0]
            })
        },
        tagOut: function(o) {
            o.parentNode && o.parentNode.parentNode && animate(o, {
                backgroundColor: "#C4D2E1"
            }, 200)
        },
        deleteTag: function(o, e) {
            var t = cur.pvListId,
                r = cur.pvIndex,
                a = cur.pvData[t][r];
            if (a.tagid) {
                if (isVisible("pv_tag_handling")) return
            } else if (ge("pv_action_progress")) return;
            var i = e ? 1 : 0;
            ajax.post("al_photos.php", {
                act: "delete_tag",
                photo: a.id,
                tag: o,
                hash: a.hash,
                top_panel: i
            }, {
                onDone: function(e, i, p, s) {
                    a.tagid ? (a.taginfo = a.tagid = !1, cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(getLang("photos_tag_deleted"), e), addClass(cur.pvTagInfoButtons, "no_events"), setTimeout(function() {
                        removeClass(cur.pvTagInfoButtons, "no_events")
                    }, 1e3)) : Photoview.actionInfo().innerHTML = e, void 0 !== i && (a.tags = i, a.tagged = p, a.tagshtml = s, cur.pvListId == t && cur.pvIndex == r && (Photoview.setTags(s), (!a.taginfo && a.actions.tag && i[0] < cur.pvMaxTags ? show : hide)(cur.pvTagLink))), cur.pvPhotoTags && cur.pvPhotoTags.deleteTag(o)
                },
                onFail: function(o) {
                    return o ? (Photoview.actionInfo().innerHTML = o, !0) : void 0
                },
                showProgress: function() {
                    if (lockButton(e), a.tagid);
                    else {
                        var o = Photoview.actionInfo();
                        o.innerHTML = "", showProgress(o)
                    }
                },
                hideProgress: function() {
                    unlockButton(e), a.tagid || re(Photoview.actionInfo())
                }
            })
        },
        restoreTag: function(o) {
            if (!ge("pv_action_progress")) {
                var e = cur.pvListId,
                    t = cur.pvIndex,
                    r = cur.pvData[e][t];
                ajax.post("al_photos.php", {
                    act: "restore_tag",
                    photo: r.id,
                    tag: o,
                    hash: r.hash
                }, {
                    onDone: function(o, a, i, p) {
                        void 0 !== a && (r.tags = a, r.tagged = i, r.tagshtml = p, cur.pvListId == e && cur.pvIndex == t && (Photoview.setTags(p), (!r.taginfo && r.actions.tag && a[0] < cur.pvMaxTags ? show : hide)(cur.pvTagLink)), cur.pvPhotoTags && cur.pvPhotoTags.renderTagAreas()), Photoview.actionInfo().innerHTML = o
                    },
                    onFail: function(o) {
                        return o ? (Photoview.actionInfo().innerHTML = o, !0) : void 0
                    },
                    showProgress: function() {
                        var o = Photoview.actionInfo();
                        o.innerHTML = "", showProgress(o)
                    },
                    hideProgress: function() {
                        re(Photoview.actionInfo())
                    }
                })
            }
        },
        confirmTag: function(o, e) {
            var t = cur.pvListId,
                r = cur.pvIndex,
                a = cur.pvData[t][r];
            isVisible("pv_tag_handling") || ajax.post("al_photos.php", {
                act: "confirm_tag",
                tag: o,
                photo: a.id,
                hash: a.hash
            }, {
                onDone: function(o, e, i) {
                    a.tags = o, a.tagged = e, a.tagshtml = i, a.taginfo = a.tagid = !1, t == cur.pvListId && r == cur.pvIndex && (Photoview.setTags(i), (!a.taginfo && a.actions.tag && o[0] < cur.pvMaxTags ? show : hide)(cur.pvTagLink), cleanElems("pv_confirm_tag", "pv_delete_tag", "pv_prof_cancel", "pv_prof_done"), Photoview.toggleTopInfoPanel(!1))
                },
                showProgress: function() {
                    lockButton(e)
                },
                hideProgress: function() {
                    unlockButton(e)
                }
            })
        },
        toProfileTag: function() {
            var o = cur.pvData[cur.pvListId][cur.pvIndex].tagged[vk.id];
            o && !cur.pvTagger && Photoview.showTag(o)
        },
        showTag: function(o) {
            cur.pvPhotoTags && cur.pvPhotoTags.showTagArea(o)
        },
        showDynTag: function(o) {
            if (clearTimeout(cur.pvHidingTag), cur.pvShowingTag != o) {
                var e = clone(cur.pvData[cur.pvListId][cur.pvIndex].tags[o]),
                    t = ge("pv_tag" + o);
                if (t) {
                    each(e, function(o, t) {
                        e[o] = positive(t * cur[o % 2 ? "pvPhHeight" : "pvPhWidth"] / 100)
                    });
                    var r = 0;
                    isVisible(cur.pvTagInfo) && (r = getSize(cur.pvTagInfo)[1]), setStyle(cur.pvTagPerson, {
                        marginLeft: e[0] + "px",
                        marginTop: r + e[3] + "px",
                        minWidth: e[2] - e[0] + "px"
                    }), cur.pvTagPerson.innerHTML = t.firstChild.innerHTML;
                    var a = getSize(cur.pvTagPerson);
                    e[3] + a[1] > cur.pvPhHeight && setStyle(cur.pvTagPerson, {
                        marginTop: cur.pvPhHeight - a[1] + "px"
                    }), cur.pvTagPerson.onmouseover = Photoview.showDynTag.pbind(o), cur.pvShowingTag = o, browser.msie ? show(cur.pvTagPerson) : fadeIn(cur.pvTagPerson, 200)
                }
            }
        },
        hideTag: function(o) {
            cur.pvPhotoTags && cur.pvPhotoTags.hideTagArea()
        },
        realOffset: function(o, e, t) {
            var r = e;
            if (!cur.pvData || !cur.pvData[o]) return r;
            for (var a = 0; e > a; a++) cur.pvData[o][a] && (cur.pvData[o][a].deleted || cur.pvData[o][a].moved) && (r += t);
            return r
        },
        realCount: function(o, e) {
            var t = e;
            if (!cur.pvData || !cur.pvData[o]) return t;
            for (var r = 0; r < cur.pvData[o].length; r++) cur.pvData[o][r] && (cur.pvData[o][r].deleted || cur.pvData[o][r].moved) && t++;
            return t
        },
        list: function(o, e, t) {
            "deleted" != t && (cur.pvList || (cur.pvList = {}), cur.pvList[o + "_" + e] = t)
        },
        loaded: function(o, e, t, r, a) {
            if ("deleted" != o) {
                if (a && (extend(cur, {
                        lang: extend(cur.lang || {}, a.lang),
                        pvHash: a.hash,
                        pvCommLimit: a.commlimit,
                        pvCaptionLimit: a.captionlimit,
                        pvMaxTags: a.maxtags,
                        pvReasons: a.reasons,
                        pvReplyNames: extend(cur.pvReplyNames || {}, a.names || {}),
                        pvAskForAutoTag: a.ask_for_autotag,
                        pvTagsQueueParams: a.qparams
                    }), window.pvcur = extend(window.pvcur || {}, {
                        wallTpl: a.wallTpl,
                        rmedia_types: a.rmedia_types
                    }), cur.wallTpl = cur.wallTpl || a.wallTpl, cur.options || (cur.options = {}), cur.options.share || (cur.options.share = a.share), val(domFC(ge("pv_add_media")), getLang("global_add_media"))), e = Photoview.realCount(o, e), t = Photoview.realOffset(o, t, 1), cur.pvData || (cur.pvData = {}), cur.pvCommsLikes || (cur.pvCommsLikes = {}), cur.pvData[o])
                    if (cur.pvData[o].length < e)
                        for (var i = cur.pvData[o].length; e > i; ++i) cur.pvData[o].push(void 0);
                    else cur.pvData[o].length > e && (cur.pvData[o] = cur.pvData[o].slice(0, e));
                else cur.pvData[o] = new Array(e);
                for (var i = (vkNow(), 0), p = r.length; p > i; ++i) {
                    for (var s = t + i, v = clone(r[i]); s >= e;) s -= e;
                    cur.pvCommsLikes[v.id] = [v.comments, v.likes, vkNow(), !1], delete v.comments, delete v.likes, cur.pvData[o][s] = v
                }
                cur.pvCandidate = 1
            }
        },
        showDeleted: function(o, e, t) {
            cur.pvShown && "temp" == cur.pvListId && (e += "<br><br>" + t), showFastBox({
                title: getLang("global_error"),
                onHide: function() {
                    cur.pvShown && "temp" == cur.pvListId && Photoview.hide(!0)
                }
            }, e)
        },
        spamDeleted: function(o, e, t) {
            isVisible(curBox().progress) || ajax.post("al_photos.php", {
                act: "spam_photo",
                photo: e,
                hash: t,
                from: "deleted"
            }, {
                onDone: function(e) {
                    domPN(o).replaceChild(ce("span", {
                        innerHTML: e
                    }), o)
                },
                showProgress: curBox().showProgress,
                hideProgress: curBox().hideProgress
            })
        },
        showPhoto: function(o, e, t, r) {
            if ((!cur.pvShown || "temp" == cur.pvListId && !cur.pvWasShown || void 0 !== t.noHistory) && (debugLog("in showPhoto noHistory: " + t.noHistory), cur.pvNoHistory = t.noHistory, cur.pvHistoryLength = t.noHistory ? 0 : t.histLen || 0), extend(cur, {
                    pvJumpTo: t.jumpTo || !1,
                    pvJumpFrom: !1,
                    pvJumpSteps: 0
                }), e = cur.pvList && cur.pvList[o + "_" + e] || e, cur.pvData && cur.pvData[e]) {
                var a = cur.pvData[e],
                    i = !0,
                    p = cur.pvOptions && cur.pvOptions.onHide;
                cur.pvOptions = t, cur.pvOptions.onHide || (cur.pvOptions.onHide = p);
                for (var s = 0, v = a.length; v > s; ++s)
                    if (a[s]) {
                        if (a[s].id === o) return Photoview.show(e, s, !1, t.root), t.onShow && t.onShow(), !1
                    } else i = !1;
                return i && r ? (t.onEmpty && t.onEmpty(), !1) : void 0
            }
        },
        loadedAlbums: function(o, e, t, r) {
            cur.pvAlbumsData && (ajax.preload("al_photos.php", extend({
                offset: r.offset,
                part: 1,
                owner: o
            }, {
                act: "show_albums"
            }), t), cur.curYear = r.cur_year, cur.pvAlbumsData[o] = {
                html: e,
                opts: r
            }, cur.pvAlbumsShowing == o && (Photoview.doShowAlbums(o, !1), boxRefreshCoords(layer)))
        },
        showAlbums: function(o, e) {
            o = intval(o), cur.pvAlbumsData || (cur.pvAlbumsData = {}), "temp" == cur.pvListId && cur.pvCancelLoad(), cur.pvNoHistory = e.noHistory, cur.pvHistoryLength = 0, cur.pvAlbumsShowing = o;
            var t = e.onFail;
            cur.pvAlbumsData[o] ? "loading" != cur.pvAlbumsData[o] && (Photoview.doShowAlbums(o, !1), boxRefreshCoords(layer)) : (cur.pvAlbumsData[o] = "loading", ajax.post("al_photos.php", {
                act: "show_albums",
                owner: o
            }, extend(e, {
                onDone: Photoview.loadedAlbums,
                onFail: function(e) {
                    return t && t(e), delete cur.pvAlbumsData[o], cur.pvAlbumsData[o], layers.fullhide && layers.fullhide(!0), !0
                }
            })))
        },
        loadedAlbum: function(o, e, t, r) {
            cur.pvAlbumData && (t && ajax.preload("al_photos.php", extend({
                offset: r.offset,
                part: 1,
                album: o
            }, {
                act: "show_album"
            }), t), cur.pvAlbumData[o] = {
                html: e,
                opts: r
            }, cur.pvAlbumShowing == o && (Photoview.doShowAlbum(o, !1), boxRefreshCoords(layer)))
        },
        showAlbum: function(o, e) {
            cur.pvAlbumData || (cur.pvAlbumData = {}), "temp" == cur.pvListId && cur.pvCancelLoad(), cur.pvNoHistory = e.noHistory, cur.pvHistoryLength = 0, cur.pvAlbumShowing = o;
            var t = e.onFail;
            cur.pvAlbumData[o] ? "loading" != cur.pvAlbumData[o] && (Photoview.doShowAlbum(o, !1), boxRefreshCoords(layer)) : (cur.pvAlbumData[o] = "loading", ajax.post("al_photos.php", {
                act: "show_album",
                album: o
            }, extend(e, {
                onDone: Photoview.loadedAlbum,
                onFail: function(e) {
                    return t && t(e), delete cur.pvAlbumData[o], cur.pvAlbumData[o], layers.fullhide(!0), !0
                }
            })))
        },
        loadedTagged: function(o, e, t) {
            cur.pvPhotoTagData && (cur.pvPhotoTagData[o] = {
                html: e,
                opts: t
            }, cur.pvPhotoTagShowing == o && (Photoview.doShowTagged(o, !1), boxRefreshCoords(layer)))
        },
        showTagged: function(o, e) {
            o = intval(o), cur.pvPhotoTagData || (cur.pvPhotoTagData = {}), "temp" == cur.pvListId && cur.pvCancelLoad(), cur.pvNoHistory = e.noHistory, cur.pvHistoryLength = 0, cur.pvPhotoTagShowing = o;
            var t = e.onFail;
            cur.pvPhotoTagData[o] ? "loading" != cur.pvPhotoTagData[o] && (Photoview.doShowTagged(o, !1), boxRefreshCoords(layer)) : (cur.pvPhotoTagData[o] = "loading", ajax.post("al_photos.php", {
                act: "show_tag",
                mid: o
            }, extend(e, {
                onDone: Photoview.loadedTagged,
                onFail: function(e) {
                    return t && t(e), delete cur.pvPhotoTagData[o], cur.pvPhotoTagData[o], layers.fullhide(!0), !0
                }
            })))
        },
        updatePeriods: function() {
            Photoview.periods = geByClass("photos_period_delimiter")
        },
        destroyPeriod: function() {
            Photoview.fixedPeriod && (re(Photoview.fixedPeriod), Photoview.fixedPeriod = !1, Photoview.fixedPeriodEl = !1)
        },
        fixPeriod: function() {
            if (Photoview.periods && Photoview.periods.length) {
                var o = scrollGetY(),
                    e = !1,
                    t = !1,
                    r = getSize(Photoview.periods[0])[1];
                for (var a in Photoview.periods) {
                    var i = getXY(Photoview.periods[a])[1];
                    if (i >= o) break;
                    e = Photoview.periods[a];
                    var p = intval(a) + 1;
                    t = Photoview.periods[p] ? getXY(Photoview.periods[p])[1] - o : !1
                }
                if (e) {
                    e == Photoview.fixedPeriodEl || (Photoview.fixedPeriod ? Photoview.fixedPeriod.innerHTML = e.innerHTML : (Photoview.fixedPeriod = ce("div", {
                        innerHTML: e.innerHTML,
                        className: "pva_period_fixed"
                    }, {
                        left: getXY(e)[0] + "px"
                    }), utils.appendChild(Photoview.fixedPeriod)), Photoview.fixedPeriodEl = e);
                    var s = t !== !1 ? t - r : 0;
                    s >= 0 && (s = 0), Photoview.fixedPeriodTop !== s && (setStyle(Photoview.fixedPeriod, {
                        top: s + "px"
                    }), Photoview.fixedPeriodTop = s)
                } else !e && Photoview.fixedPeriod && (re(Photoview.fixedPeriod), Photoview.fixedPeriod = !1, Photoview.fixedPeriodEl = !1)
            }
        },
        scrollResize: function() {
            if (!browser.mobile && cur.pvShown && (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown || cur.pvVideoTagsShown)) {
                var o = ge("ui_pv_photos_load_more"),
                    e = ge("ui_pva_more_load_more"),
                    t = 3 * lastWindowHeight;
                isVisible(o) && t > getXY(o)[1] - (browser.msie6 ? 0 : scrollGetY()) && (cur.pvVideoTagsShown ? Photoview.loadVideoTags() : cur.pvPhotoTagShown ? Photoview.loadTaggedPhotos() : cur.pvAlbumsShown ? Photoview.loadAlbumsPhotos() : Photoview.loadAlbumPhotos()), cur.pvAlbumsShowing && Photoview.fixPeriod(), cur.pvAlbumsShown && cur.pvShowAllAlbums && isVisible(e) && t > getXY(e)[1] - (browser.msie6 ? 0 : scrollGetY()) && Photoview.loadAlbums()
            }
        },
        loadAlbums: function() {
            cur.pvShowAllAlbums = !0, Photoview.loadAlbumsPhotos(!0)
        },
        loadedAlbumsPhotos: function(o, e, t, r) {
            if (cur.pvaLoading = 0, cur.pvAlbumsShown) {
                t ? cur.pvaOffset = o : cur.pvaPhotosOffset = o, r && (cur.curYear = r);
                var a = t ? ge("pva_content") : ge("pva_content_photos"),
                    i = t ? ge("ui_pva_more_load_more") : ge("ui_pv_photos_load_more"),
                    p = t ? {
                        act: "show_albums"
                    } : {
                        act: "show_albums",
                        only_photos: 1,
                        cur_year: cur.curYear
                    },
                    s = t ? cur.pvaOffset : cur.pvaPhotosOffset,
                    v = t ? cur.pvaCount : cur.pvaPhotosCount;
                if (a) {
                    for (var n = ce("div", {
                            innerHTML: e
                        }); n.firstChild;) {
                        if (hasClass(n.firstChild, "photos_period_delimiter")) {
                            var c = domData(n.firstChild, "year");
                            if (geByClass1("photos_period_delimiter_" + c)) {
                                re(n.firstChild);
                                continue
                            }
                        }
                        a.appendChild(n.firstChild)
                    }
                    return Photoview.onResize(), Photoview.updatePeriods(), o >= v || !e ? void hide(i) : void(t && (cur.pvaLoading = 1, ajax.post("al_photos.php", extend({
                        offset: s,
                        part: 1,
                        owner: cur.pvAlbumsShown
                    }, p || {}), {
                        onDone: function() {
                            debugLog("preload done: " + cur.pvaLoading), 2 == cur.pvaLoading ? Photoview.loadedAlbumsPhotos.apply(window, arguments) : cur.pvaLoading = !1
                        },
                        onFail: function() {
                            return cur.pvaLoading = 0, !0
                        }
                    })))
                }
            }
        },
        loadAlbumsPhotos: function(o) {
            var e = o ? ge("ui_pva_more_load_more") : ge("ui_pv_photos_load_more"),
                t = o ? {
                    act: "show_albums"
                } : {
                    act: "show_albums",
                    only_photos: 1
                },
                r = o ? cur.pvaOffset : cur.pvaPhotosOffset;
            return cur.pvAlbumsShown && e && isVisible(e) && !isButtonLocked(e) ? cur.pvaLoading ? void(cur.pvaLoading = 2) : void ajax.post("al_photos.php", extend({
                offset: r,
                part: 1,
                owner: cur.pvAlbumsShown
            }, t || {}), {
                cache: t.only_photos ? 0 : 1,
                onDone: Photoview.loadedAlbumsPhotos,
                onFail: function() {
                    return cur.pvaLoading = 0, !0
                },
                showProgress: function() {
                    lockButton(e)
                },
                hideProgress: function() {
                    unlockButton(e)
                }
            }) : void 0
        },
        loadedAlbumPhotos: function(o, e) {
            if (cur.pvaLoading = 0, cur.pvAlbumShown) {
                cur.pvsaOffset = o;
                var t = ge("pvsa_content_photos"),
                    r = ge("ui_pv_photos_load_more");
                if (t) {
                    if (t.appendChild(cf(e)), o >= cur.pvsaCount) return hide(r), void Photoview.onResize();
                    setTimeout(function() {
                        Photoview.onResize()
                    }, 10), cur.pvsaLoading = 1, ajax.post("al_photos.php", {
                        offset: cur.pvsaOffset,
                        part: 1,
                        album: cur.pvAlbumShown,
                        act: "show_album"
                    }, {
                        onDone: function() {
                            2 == cur.pvsaLoading ? Photoview.loadedAlbumPhotos.apply(window, arguments) : (cur.pvsaLoading = !1, ajax.preload("al_photos.php", {
                                offset: cur.pvsaOffset,
                                part: 1,
                                album: cur.pvAlbumShown,
                                act: "show_album"
                            }, arguments))
                        },
                        onFail: function() {
                            return cur.pvsaLoading = 0, !0
                        }
                    })
                }
            }
        },
        loadAlbumPhotos: function() {
            var o = ge("ui_pv_photos_load_more"),
                e = cur.pvsaOffset;
            return cur.pvAlbumShown && o && isVisible(o) && !isButtonLocked(o) ? cur.pvsaLoading ? void(cur.pvsaLoading = 2) : void ajax.post("al_photos.php", {
                act: "show_album",
                album: cur.pvAlbumShown,
                offset: e,
                part: 1
            }, {
                onDone: Photoview.loadedAlbumPhotos,
                onFail: function() {
                    return cur.pvsaLoading = 0, !0
                },
                showProgress: function() {
                    lockButton(o)
                },
                hideProgress: function() {
                    unlockButton(o)
                },
                cache: !0
            }) : void 0
        },
        loadedTaggedPhotos: function(o, e) {
            if (cur.pvaLoading = 0, cur.pvPhotoTagShown) {
                cur.pvsaOffset = o;
                var t = ge("pvsa_content_photos"),
                    r = ge("ui_pv_photos_load_more");
                if (t) {
                    if (t.appendChild(cf(e)), Photoview.onResize(), o >= cur.pvsaCount || !e) return void hide(r);
                    cur.pvsaLoading = 1, ajax.post("al_photos.php", extend({
                        offset: cur.pvsaOffset,
                        part: 1,
                        mid: cur.pvPhotoTagShown
                    }, {
                        act: "show_tag"
                    }), {
                        onDone: function() {
                            debugLog("preload done: ", cur.pvsaLoading), 2 == cur.pvsaLoading ? Photoview.loadedTaggedPhotos.apply(window, arguments) : cur.pvsaLoading = !1
                        },
                        onFail: function() {
                            return cur.pvsaLoading = 0, !0
                        }
                    })
                }
            }
        },
        loadTaggedPhotos: function(o) {
            var e = ge("ui_pv_photos_load_more"),
                t = cur.pvsaOffset;
            return cur.pvPhotoTagShown && e && isVisible(e) && !isButtonLocked(e) ? cur.pvsaLoading ? void(cur.pvsaLoading = 2) : void ajax.post("al_photos.php", {
                act: "show_tag",
                mid: cur.pvPhotoTagShown,
                offset: t,
                part: 1
            }, {
                onDone: Photoview.loadedTaggedPhotos,
                onFail: function() {
                    return cur.pvsaLoading = 0, !0
                },
                showProgress: function() {
                    lockButton(e)
                },
                hideProgress: function() {
                    unlockButton(e)
                },
                cache: 1
            }) : void 0
        },
        thumbOver: function(o, e) {
            clearTimeout((cur.pvHideTO || {})[e]);
            var t = geByClass1("pva_title", o),
                r = t.previousSibling,
                a = getSize(geByClass1("pva_desc", o))[1];
            5 > a || (animate(t, {
                marginTop: 146 - (a + 7)
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            }), "pva_repeat" == r.className && animate(r, {
                marginTop: 43 - Math.floor((a + 7) / 2)
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            }))
        },
        thumbOut: function(o, e) {
            cur.pvHideTO || (cur.pvHideTO = {}), cur.pvHideTO[e] = setTimeout(function() {
                var e = geByClass1("pva_title", o),
                    t = e.previousSibling;
                animate(e, {
                    marginTop: 146
                }, 200), "pva_repeat" == t.className && animate(t, {
                    marginTop: 43
                }, 200)
            }, 150)
        },
        photoAct: function(o) {
            if (!(cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown) && cur.pvCurPhoto.author) {
                var e = getXY(cur.pvHH, !0);
                e[0] ? cur.hhPos = e : e = cur.hhPos || [0, 0];
                var t = cur.pvHH,
                    r = Math.abs(o.clientX - e[0] - 36),
                    a = o.clientY - e[1];
                if (120 > r && 130 > a && a > -45) {
                    if (cur.pvHHShowing) return;
                    cur.pvHHShowing = !0, show(t), animate(t.firstChild, {
                        opacity: 1
                    }, 400), cur.rvPreloadBig || (vkImage().src = "/images/icons/post_big_hh.png", cur.rvPreloadBig = !0)
                } else {
                    if (!cur.pvHHShowing) return;
                    cur.pvHHShowing = !1, animate(t.firstChild, {
                        opacity: 0
                    }, 400)
                }
            }
        },
        fsMove: function(o) {
            if (!(cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown) && cur.pvCurPhoto.author) {
                var e = getXY(cur.pvActions),
                    t = getSize(cur.pvActions),
                    r = Math.max(100, .2 * cur.pvPhWidth);
                o.pageX > e[0] - r && o.pageX < e[0] + t[0] + r && o.pageY > e[1] - r && o.pageY < e[1] + t[1] + r ? addClass(cur.pvActions, "visible") : removeClass(cur.pvActions, "visible")
            }
        },
        hhCheck: function() {
            return (!browser.msie || intval(browser.version) > 9) && !cur.pvNoLikes
        },
        showRepeat: function(o) {
            o && !geByClass1("pva_repeat", o) && geByClass1("pva_link", o).insertBefore(ce("div", {
                className: "pva_repeat",
                innerHTML: '<div class="pva_repeat_blob">  <div class="pva_repeat_cont"><img class="pva_repeat_img png" src="' + stManager._srcPrefix(".css") + "/images/icons/post_hh" + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.png?3" /><span class="pva_repeat_text">' + getLang("photos_repeat_album") + "</span></div></div>"
            }), geByClass1("pva_title", o))
        },
        showPlace: function() {
            var o = cur.pvCurPhoto.geohash;
            showBox("al_places.php", {
                act: "show_photo_place",
                geohash: o,
                photo: cur.pvCurPhoto.id
            }, {
                cache: 1
            })
        },
        editPlace: function() {
            var o = cur.pvCurPhoto.geohash;
            showBox("al_places.php", {
                act: "show_photo_place",
                edit: 1,
                geohash: o || "",
                photo: cur.pvCurPhoto.id
            })
        },
        updatePlace: function(o, e) {
            var t = ge("pv_edit_place");
            e ? (t && (t.innerHTML = e ? e + "." : ""), ge("pv_place").innerHTML = e ? '<span class="pv_place_label"></span> <a class="pv_place_a" id="pv_place_a" onclick="Photoview.showPlace()">' + e + "</a>" : "", hide("pv_add_place")) : setTimeout(function() {
                ajax.post("al_photos.php", {
                    act: "get_photo_place",
                    photo: o
                }, {
                    onDone: function(e, t) {
                        Photoview.updatePlace(o, e)
                    }
                })
            }, 1e3)
        },
        reportComment: function(o, e, t) {
            stManager.add(["privacy.js", "privacy.css"], function() {
                return Privacy.show(o, e, "report_" + t)
            })
        }
    },
    photoview = Photoview;
try {
    stManager.done("photoview.js")
} catch (e) {}