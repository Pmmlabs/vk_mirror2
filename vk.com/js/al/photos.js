var photos = {
    LOAD_TYPE_PHOTOS: "photos",
    LOAD_TYPE_ALBUMS: "albums",
    LOAD_TYPE_TAGGED: "tagged",
    changeAlbumPhoto: function(o) {
        showBox("al_photos.php", {
            act: "change_thumb_box",
            album: o
        })
    },
    onMouseOverEditRow: function(o) {
        var e = geByClass1("photos_photo_edit_row_desc_placeholder", o),
            t = geByClass1("photos_photo_edit_row_desc_input", o);
        setTitle(e, !1, val(t))
    },
    editInitSorter: function() {
        var o = ge("photos_container_photos");
        cur.photosEditSorter = new GridSorter(o, "photos_photo_edit_row_thumb", {
            onReorder: photos.reorderPhotos
        })
    },
    updateEditHeaderPos: function() {
        void 0 === cur.photosEditHeaderEl && (cur.photosEditHeaderEl = geByClass1("photos_edit_selection_header")), cur.photosEditHeaderEl && (cur.photosEditHeaderElOffset = cur.photosEditHeaderElOffset || getXY(cur.photosEditHeaderEl)[1] - getSize(ge("page_header_cont"))[1], scrollGetY() >= cur.photosEditHeaderElOffset ? hasClass(cur.photosEditHeaderEl, "photos_header_fixed") || (addClass(cur.photosEditHeaderEl, "photos_header_fixed"), setStyle(cur.photosEditHeaderEl, {
            width: getSize(ge("page_body"))[0]
        }), setStyle(domNS(cur.photosEditHeaderEl), {
            "margin-top": getSize(cur.photosEditHeaderEl)[1] + "px"
        })) : (removeClass(cur.photosEditHeaderEl, "photos_header_fixed"), setStyle(cur.photosEditHeaderEl, {
            width: ""
        }), setStyle(domNS(cur.photosEditHeaderEl), {
            "margin-top": 0
        })))
    },
    _editGetSelectedCount: function() {
        var o = geByClass("photos_edit_selected").length;
        if (cur.photoEditSelectedAll) {
            var e = geByClass("photos_photo_edit_row").length;
            o = e > o ? cur.count - e + o : cur.count
        }
        return o
    },
    editSelectAll: function(o) {
        cur.photoEditSelectedAll = !o, each(geByClass("photos_photo_edit_row"), function() {
            toggleClass(this, "photos_edit_selected", cur.photoEditSelectedAll)
        }), photos._editUpdateSelectedCounter()
    },
    _editUpdateSelectedCounter: function() {
        var o, e = photos._editGetSelectedCount();
        o = e ? getLang("photos_edit_selected_count").replace("{total}", cur.count).replace("{count}", e) : langNumeric(cur.count, cur.lang.photos_edit_selected_count_initial, !0), val(ge("photos_edit_selected_label"), o);
        var t = ge("photos_edit_selected_actions");
        toggleClass(t, "photos_selected", !!e), geByClass("photos_edit_selected_action", t).forEach(function(o) {
            toggleClass(o, "link_lock", !e)
        });
        var a = ge("photos_select_all_toggle");
        cur.photosEditSelectedHalf = e >= cur.count / 2, cur.photosEditSelectedHalf ? val(a, getLang("photos_edit_deselect_all")) : val(a, getLang("photos_edit_select_all"))
    },
    selectEditPhoto: function(o, e) {
        var t = gpeByClass("photos_photo_edit_row", e),
            a = toggleClass(t, "photos_edit_selected");
        if (o.shiftKey && cur.photoEditPrevSelectedRowEl && cur.photoEditPrevSelectedRowEl != t)
            for (var r = gpeByClass("photos_edit_photos_container", e), i = domFC(r), s = 0; 2 > s && i;)(i == cur.photoEditPrevSelectedRowEl || i == t) && s++, s && toggleClass(i, "photos_edit_selected", a), i = domNS(i);
        return cur.photoEditPrevSelectedRowEl = t, photos._editUpdateSelectedCounter(), cancelEvent(o), !1
    },
    MAX_DESC_INPUT_HEIGHT: 600,
    startEditPhotoDescription: function(o, e) {
        function t(o, e, t, a) {
            var r = clean(val(t)).split("\n").join("</br>") + "&nbsp;",
                i = ce("div", {
                    innerHTML: r,
                    className: "photos_photo_edit_row_desc_input"
                }, {
                    width: getSize(e)[0],
                    display: "block",
                    visibility: "hidden"
                });
            o.appendChild(i);
            var s = getSize(i)[1] + (browser.msie ? 10 : 0);
            setStyle(t, {
                height: Math.min(photos.MAX_DESC_INPUT_HEIGHT, Math.round(s))
            }), re(i)
        }
        photos.stopEditPhotoDescription();
        var a = gpeByClass("photos_edit_photos_container", e),
            r = hasClass(e, "photos_photo_edit_row") ? e : gpeByClass("photos_photo_edit_row", e),
            i = geByClass1("photos_photo_edit_row_desc_cont", r),
            s = geByClass1("photos_photo_edit_row_desc_placeholder", r),
            n = geByClass1("photos_photo_edit_row_desc_input", r);
        val(n, n.getAttribute("data-orig-desc")), t(i, s, n), show(n), addEvent(document, "click", photos.stopEditPhotoDescription), removeEvent(n, "input"), addEvent(n, "input", t.pbind(i, s, n)), n.select(), addClass(a, "photos_desc_editing"), addClass(r, "photos_row_desc_editing"), o && cancelEvent(o)
    },
    onEditPhotoDescriptionKeyPress: function(o) {
        switch (o.keyCode) {
            case 27:
                photos.stopEditPhotoDescription(null, !0);
                break;
            case 9:
                photos.stopEditPhotoDescription(null, !1);
                var e = gpeByClass("photos_photo_edit_row", o.currentTarget);
                e = domNS(e), e && photos.startEditPhotoDescription(null, e), cancelEvent(o)
        }
    },
    stopEditPhotoDescription: function(o, e) {
        if (!o || !hasClass(o.target, "photos_photo_edit_row_desc_input")) {
            removeEvent(document, "click", photos.stopEditPhotoDescription);
            var t;
            each(geByClass("photos_row_desc_editing"), function() {
                t = this, removeClass(t, "photos_row_desc_editing");
                var o = geByClass1("photos_photo_edit_row_desc_placeholder", t),
                    a = geByClass1("photos_photo_edit_row_desc_input", t),
                    r = t.getAttribute("data-id"),
                    i = t.getAttribute("data-edit-hash"),
                    s = "";
                if (e) s = a.getAttribute("data-orig-desc");
                else {
                    s = trim(val(a));
                    var n = a.getAttribute("data-orig-desc");
                    s != n && ajax.post("al_photos.php", {
                        act: "save_desc",
                        photo: r,
                        hash: i,
                        text: s,
                        edit: 1
                    }, {}), a.setAttribute("data-orig-desc", s), o.titleSet = !1
                }
                val(o, clean(s) || getLang("photos_add_description_placeholder")), toggleClass(o, "photos_edit_has_desc", !!s), hide(a)
            }), removeClass(gpeByClass("photos_edit_photos_container", t), "photos_desc_editing")
        }
    },
    updatePeriods: function() {
        cur.periods = geByClass("photos_period_delimiter", ge("photos_all_block"))
    },
    destroyPeriod: function() {
        cur.fixedPeriod && (re(cur.fixedPeriod), cur.fixedPeriod = !1, cur.fixedPeriodEl = !1)
    },
    fixPeriod: function() {
        if (ge("photos_albums_block") && (photos.headerHeight = photos.headerHeight || getSize(ge("page_header_cont"))[1], cur.periods && cur.periods.length)) {
            var o = vk.staticheader ? Math.max(scrollGetY(), photos.headerHeight) : scrollGetY() + photos.headerHeight,
                e = !1,
                t = !1,
                a = getSize(cur.periods[0])[1];
            for (var r in cur.periods) {
                var i = getXY(cur.periods[r])[1];
                if (i >= o) break;
                e = cur.periods[r];
                var s = intval(r) + 1;
                t = cur.periods[s] ? getXY(cur.periods[s])[1] - o : !1
            }
            if (e && !cur.fileApiUploadStarted) {
                if (e == cur.fixedPeriodEl) setTimeout(function() {
                    setStyle(cur.fixedPeriod, {
                        left: getXY(e)[0] + "px"
                    })
                });
                else {
                    if (cur.fixedPeriod) cur.fixedPeriod.innerHTML = e.innerHTML;
                    else {
                        var n = cur.fixedPeriod = ce("div", {
                            innerHTML: e.innerHTML,
                            className: "photos_period_delimiter_fixed"
                        }, {
                            left: getXY(e)[0] + "px"
                        });
                        ge("page_body").appendChild(cur.fixedPeriod), (cur._back ? cur._back.hide : cur.destroy).push(function() {
                            re(n)
                        })
                    }
                    cur.fixedPeriodEl = e
                }
                var d = t !== !1 ? t - a : 0;
                d >= 0 && (d = 0), cur.fixedPeriodTop !== d && (setStyle(cur.fixedPeriod, {
                    top: d + "px"
                }), cur.fixedPeriodTop = d)
            } else !e && cur.fixedPeriod && (re(cur.fixedPeriod), cur.fixedPeriod = !1, cur.fixedPeriodEl = !1)
        }
    },
    scrollResize: function() {
        if (!browser.mobile && !cur.pvShown) {
            var o = document.documentElement,
                e = window.innerHeight || o.clientHeight || bodyNode.clientHeight,
                t = scrollGetY(),
                a = ge("ui_photos_load_more"),
                r = ge("ui_albums_load_more"),
                i = ge("ui_tagged_load_more"),
                s = .8 * e;
            isVisible(a) && a.offsetTop - (t + e) < s && photos.load(), isVisible(r) && cur.showAllAlbums && r.offsetTop - (t + e) < s && photos.load(photos.LOAD_TYPE_ALBUMS), isVisible(i) && cur.showAllTagged && i.offsetTop - (t + e) < s && photos.load(photos.LOAD_TYPE_TAGGED), cur.fixPeriods && photos.fixPeriod(), photos.updateEditHeaderPos()
        }
    },
    initScroll: function() {
        cur.module = "photos", photos.scrollnode = browser.msie6 ? pageNode : window, addEvent(photos.scrollnode, "scroll", photos.scrollResize), addEvent(window, "resize", photos.scrollResize), removeEvent(window, "load", photos.initScroll), cur.destroy.push(function() {
            removeEvent(photos.scrollnode, "scroll", photos.scrollResize), removeEvent(window, "resize", photos.scrollResize)
        })
    },
    recache: function(o, e) {
        if (cur.loading) return cur.loading = 1, void setTimeout(photos.recache.pbind(o, e), 100);
        for (var t = cur.offset; ajaxCache["/" + nav.objLoc[0] + "#act=" + nav.objLoc.act + "&offset=" + t + "&part=1"]; t += 20) {
            var a = ajaxCache["/" + nav.objLoc[0] + "#act=" + nav.objLoc.act + "&offset=" + t + "&part=1"];
            a[0] += e, ajaxCache["/" + nav.objLoc[0] + "#act=" + nav.objLoc.act + "&offset=" + (t + e) + "&part=1"] = a, delete ajaxCache["/" + nav.objLoc[0] + "#act=" + nav.objLoc.act + "&offset=" + t + "&part=1"]
        }
        cur.offset += e
    },
    loaded: function(o, e, t, a) {
        a || (cur.loading = 0);
        var r, i, s, n, d, l;
        switch (a = a || photos.LOAD_TYPE_PHOTOS) {
            case photos.LOAD_TYPE_TAGGED:
                cur.taggedOffset = o, s = cur.moreFromTagged, d = cur.moreTaggedOpts, n = cur.taggedOffset;
                break;
            case photos.LOAD_TYPE_ALBUMS:
                cur.albumsOffset = o, s = cur.moreFromAlbums, d = cur.moreAlbumsOpts, n = cur.albumsOffset, l = cur.albumsCount;
                break;
            default:
                cur.offset = o, s = cur.moreFrom, d = cur.moreOpts, n = cur.offset, l = cur.count
        }
        r = ge("photos_container_" + a), i = ge("ui_" + a + "_load_more");
        for (var c = ce("div", {
                innerHTML: trim(e)
            }); c.firstChild;) {
            if (hasClass(c.firstChild, "photos_period_delimiter")) {
                var h = c.firstChild.getAttribute("data-year");
                if (geByClass1("photos_period_delimiter_" + h)) {
                    re(c.firstChild);
                    continue
                }
            }
            cur.photoEditSelectedAll && addClass(c.firstChild, "photos_edit_selected"), r.appendChild(c.firstChild)
        }
        return t && extend(cur.privacy, t), a == photos.LOAD_TYPE_PHOTOS && photos.updatePeriods(), o >= l || !e ? void hide(i) : void(a != photos.LOAD_TYPE_PHOTOS && (cur.loading = 1, ajax.post(s, extend({
            offset: n,
            part: 1
        }, d || {}), {
            cache: 1,
            onDone: function() {
                2 == cur.loading ? photos.loaded.apply(window, arguments) : cur.loading = !1
            },
            onFail: function() {
                return cur.loading = 0, !0
            }
        })))
    },
    load: function(o) {
        var e, t, a, r;
        switch (o = o || photos.LOAD_TYPE_PHOTOS) {
            case photos.LOAD_TYPE_PHOTOS:
                e = ge("ui_photos_load_more"), t = cur.moreFrom, a = cur.moreOpts, r = cur.offset;
                break;
            case photos.LOAD_TYPE_TAGGED:
                e = ge("ui_tagged_load_more"), t = cur.moreFromTagged, a = cur.moreTaggedOpts, r = cur.taggedOffset;
                break;
            case photos.LOAD_TYPE_ALBUMS:
                e = ge("ui_albums_load_more"), t = cur.moreFromAlbums, a = cur.moreAlbumsOpts, r = cur.albumsOffset
        }
        if (t && isVisible(e) && !isButtonLocked(e)) {
            if (cur.loading) return void(cur.loading = 2);
            o == photos.LOAD_TYPE_PHOTOS && a && (cur.loading = 1), ajax.post(t, extend({
                offset: r,
                part: 1
            }, a || {}), {
                onDone: photos.loaded,
                onFail: function() {
                    return cur.loading = 0, !0
                },
                showProgress: function() {
                    lockButton(e)
                },
                hideProgress: function() {
                    unlockButton(e)
                },
                cache: 1
            })
        }
    },
    loadMoreButtonClick: function(o) {
        switch (o) {
            case photos.LOAD_TYPE_ALBUMS:
                cur.showAllAlbums = !0;
                break;
            case photos.LOAD_TYPE_TAGGED:
                cur.showAllTagged = !0
        }
        this.load(o)
    },
    reorderAlbums: function(o, e, t) {
        var a = o.id.replace("album", ""),
            r = (e && e.id || "").replace("album", ""),
            i = (t && t.id || "").replace("album", "");
        ajax.post("al_photos.php", {
            act: "reorder_albums",
            album: a,
            before: r,
            after: i,
            hash: cur.reorderHash
        })
    },
    reorderPhotos: function(o, e, t) {
        var a = "edit" == nav.objLoc.act ? "photo_edit_row_" : "photo_row_",
            r = o.id.replace(a, ""),
            i = (e && e.id || "").replace(a, ""),
            s = (t && t.id || "").replace(a, ""),
            n = domData(ge("photos_container_photos"), "rev");
        n = n ? "1" === n ? 1 : "" : nav.objLoc.rev, ajax.post("al_photos.php", {
            act: "reorder_photos",
            photo: r,
            before: i,
            after: s,
            rev: n,
            hash: cur.reorderHash
        })
    },
    privacy: function(o) {
        if ("photos_move" == o) {
            var e = Privacy.getValue(o);
            return e = e.split("_"), e = e[2], e != cur.album.split("_")[1] && photos.movePhoto(e), !0
        }
        var t = o.match(/^album(\d+)/);
        if (t) {
            var a = ge("album" + vk.id + "_" + t[1]);
            if (a) {
                if (a.helper) {
                    var r = getSize(a);
                    if (r[0] != a.w || r[1] != a.h) {
                        setStyle(a.helper, {
                            width: r[0],
                            height: r[1] - ge("photos_container").sorter.dh
                        }), extend(a, {
                            x: a.x - a.w / 2 + r[0] / 2,
                            w: r[0],
                            y: a.y - a.h / 2 + r[1] / 2,
                            h: r[1]
                        });
                        for (var i = a.nextSibling; i && i.nextSibling; i = i.nextSibling.nextSibling) setStyle(i.nextSibling, {
                            left: i.offsetLeft,
                            top: i.offsetTop
                        })
                    }
                }
                clearTimeout(cur["privacy_timer_" + o]), cur["privacy_timer_" + o] = setTimeout(ajax.post.pbind("al_friends.php", {
                    act: "save_privacy",
                    key: o,
                    val: Privacy.getValue(o),
                    hash: cur.privacyHash
                }), 500)
            }
        }
    },
    deleteAlbum: function(o, e) {
        showFastBox({
            title: getLang("photos_deleting_album"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("photos_sure_del_album"), getLang("global_delete"), function(t) {
            ajax.post("al_photos.php", {
                act: "delete_album",
                album: o,
                hash: e
            }, {
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }, getLang("global_cancel"))
    },
    showSaved: function(o, e) {
        var t = ge(o),
            a = function() {
                setTimeout(animate.pbind(t, {
                    backgroundColor: e,
                    borderLeftColor: "#D8DFEA",
                    borderRightColor: "#D8DFEA",
                    borderTopColor: "#D8DFEA",
                    borderBottomColor: "#D8DFEA"
                }, 1e3), 1e3)
            };
        isVisible(t) ? animate(t, {
            backgroundColor: "#E7F1F9",
            borderLeftColor: "#4C96D4",
            borderRightColor: "#4C96D4",
            borderTopColor: "#4C96D4",
            borderBottomColor: "#4C96D4"
        }, 200, a) : (show(t), a())
    },
    saveAlbum: function(o) {
        var e = {
            act: "save_album",
            album: cur.album,
            hash: cur.albumhash,
            title: ge("album_title").value,
            desc: ge("album_description").value
        };
        if (!e.title) return notaBene("album_title");
        var t = cur.album.replace(vk.id + "_", "");
        cur.privacy["album" + t] ? extend(e, {
            view: Privacy.getValue("album" + t),
            comm: Privacy.getValue("albumcomm" + t)
        }) : ge("album_only_check") && extend(e, {
            main: isChecked("album_main_check"),
            only: isChecked("album_only_check"),
            comm: isChecked("album_comments_check")
        }), ajax.post("al_photos.php", e, {
            onDone: function() {
                var o = ge("album_main_check");
                o && isChecked(o) && (addClass(o, "on"), addClass(o, "disabled"), hide("album_delete_action"));
                var e = ge("photos_changes_saved");
                setStyle(e, {
                    opacity: 1
                }), setTimeout(function() {
                    setStyle(e, {
                        opacity: 0
                    })
                }, 1500)
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        })
    },
    savePhotos: function() {
        for (var o = {
                act: "save_photos",
                album: cur.album,
                hash: cur.albumhash
            }, e = ge("photos_container"), t = 0, a = e.firstChild; a; a = a.nextSibling)
            if (a.firstChild && isVisible(a.firstChild)) {
                var r = a.id.replace("photo_edit_row", "");
                o["photo_id" + t] = r, o["photo_desc" + t] = ge("photo_caption" + r).value, ++t
            }
        ajax.post("al_photos.php", o, {
            onDone: function() {
                for (var o = e.firstChild; o; o = o.nextSibling)
                    if (o.firstChild && isVisible(o.firstChild)) {
                        var t = o.id.replace("photo_edit_row", "");
                        ge("photo_save_result" + t).innerHTML = getLang("photos_privacy_description")
                    }
                cur.descs = !1, scrollToTop(200), photos.showSaved("photos_saved_msg", "#F3F8FC"), ge("photos_container").sorter && sorter.update(ge("photos_container").sorter.elems[0])
            },
            progress: "photos_save_progress"
        })
    },
    deleteSelectedPhotos: function(o) {
        var e = [];
        each(geByClass("photos_edit_selected"), function() {
            e.push(this.getAttribute("data-id"))
        });
        var t = intval(photos._editGetSelectedCount() > e.length),
            a = cur.album.split("_");
        showBox("/al_photos.php", {
            act: "delete_selected_box",
            Photo_ids: t ? "" : e.join(","),
            owner_id: a[0],
            album_id: a[1],
            all: t
        }, {
            onDone: function() {
                var e = curBox();
                e.removeButtons(), e.addButton(getLang("photos_del_selected_box_yes"), function(e) {
                    show("photos_del_box_progress"), hide("photos_del_box_text"), re(e);
                    var t = ge("photos_del_box_progress_text");
                    photos.doEditBatchProcess({
                        act: "delete_photos",
                        hash: o,
                        owner_id: a[0],
                        album_id: a[1]
                    }, cur.editDeletePhotosArray, ge("photos_del_box_progress_wrap"), "photos_del_selected_title_progress", function(o, e, a, r, i) {
                        val(t, getLang("photos_del_selected_box_text_progress").replace("{count}", r).replace("{total}", i)), cur.count = Math.max(cur.count - o, 0), each(a, function(o, e) {
                            re("photo_edit_row_" + e), cur.count = Math.max(cur.count, 0)
                        }), photos._editUpdateSelectedCounter()
                    }, function() {
                        var o = curBox();
                        if (o && o.hide(), 0 == cur.count) nav.reload();
                        else {
                            var e = geByClass("photos_photo_edit_row").length;
                            40 > e && photos.load()
                        }
                    })
                }), e.addButton(getLang("box_cancel"), function() {
                    e.hide(), cur.editDeletePhotosArray = !1
                }, "no")
            }
        })
    },
    doEditBatchProcess: function(o, e, t, a, r, i) {
        function s(e) {
            if (!_.isVisible()) return i(u), void setDocumentTitle(p);
            var t = n.slice(e * l, (e + 1) * l);
            ajax.post("/al_photos.php", extend({
                photos: t.join(",")
            }, o), {
                onDone: function(o, n, l) {
                    u += o, e++, setStyle(h, {
                        width: 100 * e / c + "%"
                    });
                    var _ = getLang(a).replace("{count}", u).replace("{total}", d);
                    setDocumentTitle(_), r(o, n, t, u, d, l), c > e ? s(e) : setTimeout(function() {
                        setDocumentTitle(p), i(u, n)
                    }, 200)
                }
            })
        }
        var n = e.split(","),
            d = n.length,
            l = cur.editPhotosMaxChunkSize || 50,
            c = Math.ceil(d / l),
            h = geByClass1("photos_progress_bar", ge(t)) || geByClass1("ui_progress_bar", ge(t)),
            u = 0,
            p = document.title,
            _ = curBox();
        r(0, !1, [], 0, d), s(0)
    },
    _showProgressPanel: function(o) {
        var e = se('<div class="photo_mask_progress _photo_mask_progress"><div class="round_spinner"></div></div>');
        return o.appendChild(e), e
    },
    _hideProgressPanel: function(o) {
        re(geByClass1("_photo_mask_progress", o))
    },
    deletePhoto: function(o, e, t, a) {
        var r;
        if ("" === o && t && (r = gpeByClass("photos_photo_edit_row", t), o = attr(r, "data-id"), e = attr(r, "data-edit-hash")), r = r || ge("photo_edit_row_" + o)) {
            var i = photos._showProgressPanel(r);
            return addClass(r, "photos_deleted"), ajax.post("al_photos.php", {
                act: "delete_photo",
                photo: o,
                hash: e,
                edit: 1
            }, {
                onDone: function(o) {
                    re(i), r.appendChild(se(o)), photos.recache(cur.offset, -1), cur.count -= 1, photos._editUpdateSelectedCounter(), cur.count < 2 && hide("album_thumb_action"), ge("photos_go_to_album_cont") && !cur.count && hide("photos_go_to_album_cont"), cur.photoAddUpdate && cur.photoAddUpdate(r), cur.introTooltipHide && cur.introTooltipHide(!0)
                }
            }), cancelEvent(a)
        }
    },
    restorePhoto: function(o, e, t) {
        var a = ge("photo_edit_row_" + e);
        if (a && hasClass(a, "photos_deleted")) {
            var r = photos._showProgressPanel(a);
            re(geByClass1("photos_restore", a)), ajax.post("al_photos.php", {
                act: "restore_photo",
                photo: e,
                hash: t,
                edit: 1
            }, {
                onDone: function() {
                    re(r), removeClass(a, "photos_deleted"), photos.recache(cur.offset, 1), cur.count += 1, photos._editUpdateSelectedCounter(), cur.count > 1 && show("album_thumb_action"), ge("photos_go_to_album_cont") && cur.count && show("photos_go_to_album_cont"), cur.photoAddUpdate && cur.photoAddUpdate(a)
                },
                progress: "photo_restore_progress" + e
            })
        }
    },
    toggleMoveToAlbumMode: function(o, e) {
        var t = ge("photos_move_box_search"),
            a = ge("pv_move_to_album_cont"),
            r = ge("photos_box_edit_data"),
            i = curBox(),
            s = geByClass1("box_title", i.titleWrap);
        if (o) {
            hide(t), hide(a), show(r), i.setOptions({
                width: 500
            });
            var n = getLang("photos_move_to_new_album_title");
            cur.noAlbums || (n += '<span class="divider">|</span><a onclick="return photos.toggleMoveToAlbumMode(false, event)" href="" class="toggle">' + getLang("photos_move_to_another_album_toggle") + "</a>"), val(s, n), i.removeButtons().addButton(getLang("photos_create_album_and_move"), cur.saveNewAlbum).addButton(getLang("global_cancel"), i.hide, "no"), cur.onNewAlbumDone = function(o) {
                curBox().hide(), photos.movePhotosBox(cur.editPhotosArray.split(","), !1, function() {
                    setTimeout(function() {
                        var e = ge("album" + o);
                        photos.doMovePhotos(!1, e)
                    })
                })
            }
        } else show(t), show(a), hide(r), i.setOptions({
            width: 795
        }), val(s, getLang("photos_move_box_title") + '<span class="divider">|</span><a onclick="return photos.toggleMoveToAlbumMode(true, event)" href="" class="toggle">' + getLang("photos_move_to_new_album") + "</a>"), i.removeButtons().addButton(getLang("global_cancel"), i.hide);
        return cancelEvent(e)
    },
    showMove: function(o, e, t) {
        var a = cur.moveddc,
            r = ge("photos_move_link" + o);
        cur.privacyPhotoMove ? Privacy.show(r, t, "photos_move") : (cur.zIndexUpdated && (photos.hideMove(), cur.noZIndexUpdate = !0), ge("photo_edit_row" + o) && (cur.zIndexUpdated = o, setStyle(ge("photo_edit_row" + o), {
            zIndex: 150
        })), photos.hideMove()), extend(cur, {
            movelnk: r,
            moveph: o,
            movehash: e
        }), cur.privacyPhotoMove || (r.parentNode.replaceChild(a, r), cur.movedd.focus(), cur.movedd.showDefaultList(), addEvent(document, "click", photos.hideMove))
    },
    hideMove: function() {
        if (cur.noZIndexUpdate) return void delete cur.noZIndexUpdate;
        if (!cur.privacyPhotoMove) {
            if (cur.movelnk) try {
                cur.moveddc.parentNode.replaceChild(cur.movelnk, cur.moveddc), cur.movelnk = !1, cur.movedd.clear(), cur.zIndexUpdated && ge("photo_edit_row" + cur.zIndexUpdated) && (setStyle(ge("photo_edit_row" + cur.zIndexUpdated), {
                    zIndex: 100
                }), delete cur.zIndexUpdated)
            } catch (o) {}
            removeEvent(document, "click", photos.hideMove)
        }
    },
    movePhoto: function(o, e, t) {
        o = intval(o);
        var a = show.pbind("photo_return_progress" + e),
            r = hide.pbind("photo_return_progress" + e);
        if (!e) {
            if (!o || o == cur.album.split("_")[1]) return photos.hideMove();
            e = cur.moveph, t = cur.movehash, a = function() {
                hide("photo_delete_link" + e), show("photo_edit_progress" + e)
            }, r = function() {
                hide("photo_edit_progress" + e), show("photo_delete_link" + e)
            }
        }
        ajax.post("al_photos.php", {
            act: "move_photo",
            album: o,
            photo: e,
            hash: t
        }, {
            onDone: function(t) {
                var a = ge("photo_edit_row" + e);
                if (a && a.firstChild) {
                    if (o == cur.album.split("_")[1]) {
                        if (isVisible(a.firstChild)) return;
                        a.removeChild(a.firstChild.nextSibling), show(a.firstChild), photos.recache(cur.offset, 1), ++cur.count, cur.count > 1 && show("album_thumb_action")
                    } else {
                        if (!isVisible(a.firstChild)) return;
                        photos.hideMove(), hide(a.firstChild), a.appendChild(ce("div", {
                            innerHTML: t
                        })), photos.recache(cur.offset, -1), --cur.count, cur.count < 2 && hide("album_thumb_action")
                    }
                    cur.photoAddUpdate && cur.photoAddUpdate(a), cur.introTooltipHide && cur.introTooltipHide(!0), ge("photos_go_to_album_cont") && toggle("photos_go_to_album_cont", !!cur.count)
                }
            },
            onFail: function(o) {
                return photos.hideMove(), o ? (setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1,
                    bodyStyle: "padding: 20px;"
                }, o).hide, 2e3), !0) : void 0
            },
            showProgress: a,
            hideProgress: r
        })
    },
    updateThumbs: function(o, e) {
        var t = ge("photos_add_img" + cur.peEditPhoto);
        t && (t.src = o)
    },
    editPhoto: function(o, e, t) {
        cur.peEditPhoto = o, showBox("al_photos.php", {
            act: "edit_photo",
            photo: o,
            webgl: 1,
            stat: ["ui_controls.css", "ui_controls.js"]
        }, {
            dark: 1
        })
    },
    backupDesc: function(o) {
        cur.descs || (cur.descs = {}), cur.descs[o] = trim(ge("photo_caption" + o).value)
    },
    saveDesc: function(o, e) {
        var t = ge("photo_caption" + o).value,
            a = cur.descs[o];
        delete cur.descs[o], trim(t) != a && ajax.post("al_photos.php", {
            act: "save_desc",
            photo: o,
            hash: e,
            text: t,
            edit: 1
        }, {
            onDone: function(e) {
                ge("photo_save_result" + o).innerHTML = e
            },
            onFail: function(e) {
                return ge("photo_save_result" + o).innerHTML = '<div class="photo_save_error">' + e + "</div>", !0
            },
            showProgress: function() {
                ge("photo_save_result" + o).innerHTML = getLang("photos_privacy_description"), show("photo_save_progress" + o)
            },
            hideProgress: function() {
                hide("photo_save_progress" + o)
            }
        })
    },
    genFile: function(o, e, t) {
        return ce("div", {
            innerHTML: '<a class="photo_file_cancel" id="photo_cancel' + o + '" onclick="' + e + '">' + t + '</a><div class="photo_file_button">  <div class="file_button_gray">    <div class="file_button" id="photo_file_button' + o + '">' + getLang("photos_choose_file") + "</div>  </div></div>    "
        })
    },
    initFile: function(o) {
        FileButton.init("photo_file_button" + o, {
            name: "photo",
            id: "photo_file" + o,
            accept: "image/jpeg,image/png,image/gif",
            onchange: photos.fileSelected
        })
    },
    addFile: function() {
        var o = cur.files.length,
            e = photos.genFile(o, "photos.fileCancel(" + o + ")", getLang("global_cancel"));
        extend(e, {
            className: "photo_upload_file",
            id: "photo_upload_row" + o
        }), ge("photo_upload_files").appendChild(e), photos.initFile(o), cur.files.push({})
    },
    filesLoad: function() {
        for (var o = 0, e = 0; o < cur.files.length; ++o) {
            var t = ge("photo_file" + o).value;
            if (t) break
        }
        if (o != cur.files.length) {
            cur.allcont = utilsNode.appendChild(ce("div", {
                innerHTML: '<iframe name="photo_frame_all"></iframe><form target="photo_frame_all" id="photo_form_all" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>    '
            })), form = ge("photo_form_all");
            var a = extend(cur.fields, {
                act: "do_add",
                al: 1,
                from_host: locHost,
                ondone: "photos.filesDone",
                onfail: "photos.filesFail"
            });
            for (e in a) form.appendChild(ce("input", {
                name: e,
                value: a[e]
            }));
            for (o = 0, e = 0; o < cur.files.length; ++o) {
                var r = ge("photo_file" + o);
                r.value && (r.name = "file" + e, form.appendChild(r), ++e)
            }
            form.submit()
        }
    },
    fileSelected: function() {
        var o = intval(this.id.replace("photo_file", ""));
        if (cur.files[o].deleting || !cur.files[o].cont && !cur.files[o].id) {
            cur["fileDone" + o] = photos.fileDone.pbind(o), cur["fileFail" + o] = photos.fileFail.pbind(o), cur.files[o].cont = utilsNode.appendChild(ce("div", {
                innerHTML: '<iframe name="photo_frame' + o + '"></iframe><form target="photo_frame' + o + '" id="photo_form' + o + '" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>    '
            })), form = ge("photo_form" + o);
            var e = extend(cur.fields, {
                act: "do_add",
                al: 1,
                from_host: locHost,
                ondone: "cur.fileDone" + o,
                onfail: "cur.fileFail" + o
            });
            for (var t in e) form.appendChild(ce("input", {
                name: t,
                value: e[t]
            }));
            form.appendChild(this), form.submit();
            var a = ge("photo_file_button" + o);
            lockButton(a), setTimeout(function() {
                a.innerHTML = a.innerHTML
            }, 0), show("photo_cancel" + o), ge("photo_cancel" + o).innerHTML = getLang("global_cancel"), o == cur.files.length - 1 && photos.addFile()
        }
    },
    fileDone: function(o, e) {
        hide("photo_cancel" + o);
        for (var t = "", a = o + 1; a < cur.files.length; ++a)
            if (cur.files[a].id && !cur.files[a].deleting) {
                t = cur.files[a].id;
                break
            }
        setTimeout(ajax.post.pbind("al_photos.php", extend({
            act: "done_add",
            before: t,
            context: 1
        }, q2ajx(e)), {
            onDone: function(e, t) {
                return e ? (cur.files[o].cont.innerHTML = "", utilsNode.removeChild(cur.files[o].cont), extend(cur.files[o], {
                    id: e,
                    deleting: !1,
                    cont: !1
                }), ge("photo_upload_row" + o).innerHTML = t, autosizeSetup("photo_caption" + e, {
                    minHeight: 30
                }), void show("photo_delete" + e)) : photos.fileFail(o, 0)
            },
            onFail: function(e) {
                return e ? (setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1,
                    bodyStyle: "padding: 20px;"
                }, e).hide, 3e3), photos.fileCancel(o), !0) : void 0
            }
        }), 0)
    },
    fileCancel: function(o, e) {
        if (cur.files[o].cont && (cur.files[o].cont.innerHTML = "", utilsNode.removeChild(cur.files[o].cont)), !e) {
            var t = ge("photo_file_button" + o);
            unlockButton(t), t.innerHTML = getLang("photos_choose_file"), cur.files[o] = {}, photos.initFile(o), hide("photo_cancel" + o)
        }
    },
    fileFail: function(o, e) {
        photos.fileCancel(o)
    },
    fileDelete: function(o, e) {
        for (var t = 0; t < cur.files.length && cur.files[t].id != o;) ++t;
        if (t != cur.files.length && !cur.files[t].deleting) {
            cur.files[t].deleting = !0, ajax.post("al_photos.php", {
                act: "delete_photo",
                photo: o,
                hash: e,
                edit: 2
            }, {
                onFail: function() {
                    cur.files[t].deleting = !1
                }
            });
            var a = ge("photo_edit_row" + o);
            a.parentNode.insertBefore(photos.genFile(t, "photos.fileRestore('" + o + "', '" + e + "')", getLang("global_restore")), a), hide(a), photos.initFile(t), show("photo_cancel" + t)
        }
    },
    fileRestore: function(o, e) {
        for (var t = 0, a = ""; t < cur.files.length && cur.files[t].id != o;) ++t;
        if (t != cur.files.length && cur.files[t].deleting && -1 !== cur.files[t].deleting) {
            if (cur.files[t].cont) return photos.fileCancel(t);
            for (var r = t + 1; r < cur.files.length; ++r)
                if (cur.files[r].id && !cur.files[r].deleting) {
                    a = cur.files[r].id;
                    break
                }
            cur.files[t].deleting = -1, ajax.post("al_photos.php", {
                act: "restore_photo",
                photo: o,
                hash: e,
                before: a,
                edit: 2
            }, {
                onDone: function() {
                    cur.files[t].deleting = !1
                }
            });
            var i = ge("photo_edit_row" + o);
            show(i), re(i.previousSibling)
        }
    },
    filesDone: function(o) {
        setTimeout(ajax.post.pbind("al_photos.php", extend({
            act: "done_add",
            context: 2
        }, q2ajx(o))), 0)
    },
    filesFail: function() {
        for (var o = 0; o < cur.files.length; ++o) photos.fileCancel(o);
        cur.allcont.innerHTML = "", utilsNode.removeChild(cur.allcont), cur.allcont = !1
    },
    chooseFlash: function() {
        return browser.flash < 10 ? animate(ge("photo_flash_needed"), {
            backgroundColor: "#FFEFE8",
            borderBottomColor: "#E89B88",
            borderLeftColor: "#E89B88",
            borderRightColor: "#E89B88",
            borderTopColor: "#E89B88"
        }, 100, function() {
            animate(ge("photo_flash_needed"), {
                backgroundColor: "#FFFFFF",
                borderBottomColor: "#CCCCCC",
                borderLeftColor: "#CCCCCC",
                borderRightColor: "#CCCCCC",
                borderTopColor: "#CCCCCC"
            }, 500)
        }) : (cur.photoCheckFails = 0, show("photo_flash_upload"), hide("photo_default_upload"), void hide("photo_upload_unavailable"))
    },
    chooseDefault: function() {
        cur.photoCheckFails = 0, show("photo_default_upload"), hide("photo_flash_upload"), cur.serverChecked ? (show("photo_upload_files"), hide("photo_default_check")) : (hide("photo_upload_files"), show("photo_default_check"), cur.checkUpload())
    },
    flashWidth: function() {
        return -1 == _ua.indexOf("Mac") || -1 == _ua.indexOf("Opera") && -1 == _ua.indexOf("Firefox") ? "600" : "601"
    },
    activeTab: function(o) {
        for (var e = domPN(domPN(o)), t = domFC(e); t; t = domNS(t)) removeClass(t, "active_link");
        addClass(domPN(o), "active_link")
    },
    checkHtml5Uploader: function() {
        return (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)))
    },
    upload: function(o, e) {
        return e && (2 == e.button || e.ctrlKey) ? (photos.checkHtml5Uploader() && (o.href += "&html5=1"), !0) : void 0 !== cur.uplId && window.Upload && Upload.checked && Upload.checked[cur.uplId] && photos.checkHtml5Uploader() ? (ge("photos_upload_input").click(), !1) : !0
    },
    uploadLink: function(o, e) {
        return photos.checkHtml5Uploader() && (o.href += "&html5=1"), nav.go(o, e)
    },
    onUploadSelect: function(o) {
        if (ge("photos_upload_area")) {
            window.filesToUpload = o;
            var e = ge("photos_upload_area").innerHTML;
            ge("photos_upload_area").innerHTML = '<img src="/images/upload.gif">', nav.go(ge("photos_upload_area").href + "&html5=1", !1, {
                onFail: function(o) {
                    return ge("photos_upload_area").innerHTML = e, setTimeout(showFastBox({
                        title: getLang("global_error"),
                        dark: 1,
                        bodyStyle: "padding: 20px;"
                    }, o).hide, 3e3), !0
                }
            })
        }
    },
    thumbOver: function(o, e, t) {
        cur.hideTO && cur.hideTO[e] && clearTimeout(cur.hideTO[e]);
        var a = geByClass1("description", o),
            r = geByClass1("photo_album_title", o),
            i = getSize(a)[1];
        animate(r, {
            marginTop: 163 - (i ? i + 7 : 0)
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        });
        var s = geByClass1("photo_album_info_back", o),
            n = geByClass1("photo_album_info_cont", o);
        if (s && n) {
            if (s.over && !t) return void(s.over = 0);
            var d = t ? .6 : .5,
                l = t ? 1 : .8;
            t && (s.over = 1), animate(s, {
                opacity: d
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            }), animate(n, {
                opacity: l
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            })
        }
    },
    thumbOut: function(o, e, t) {
        var a = geByClass1("photo_album_info_back", o),
            r = geByClass1("photo_album_info_cont", o),
            i = function() {
                if (t) {
                    var e = (geByClass1("description", o), geByClass1("photo_album_title", o));
                    animate(e, {
                        marginTop: 163
                    }, 200)
                }
                if (a && r) {
                    var i = t ? 0 : .5,
                        s = t ? 0 : .8;
                    animate(a, {
                        opacity: i
                    }, 200), animate(r, {
                        opacity: s
                    }, 200)
                }
            };
        t ? (cur.hideTO = cur.hideTO || {}, cur.hideTO[e] = setTimeout(i, 150)) : i()
    },
    openEditor: function(o, e) {
        return stManager.add(["photoview.js", "photoview.css"], function() {
            var e = gpeByClass("photos_photo_edit_row", o);
            cur.onPESave = function(o) {
                curBox().hide(), setStyle(geByClass1("photos_photo_edit_row_thumb", e), "background-image", "url('" + o + "')"), cur.onPESave = !1, bodyNode.style.overflow = "auto"
            };
            var t = e.getAttribute("data-id");
            Photoview.openEditor(t, cur.savedThumbs ? cur.savedThumbs[t] : e.getAttribute("data-thumb"))
        }), cancelEvent(e)
    },
    addToAlbum: function() {
        cur.isPhotoUpload = !0, photos.movePhotosBox(cur.savedPhotos || [], !1)
    },
    movePhotosBox: function(o, e, t, a) {
        var r = [],
            i = !1;
        isArray(o) ? r = o : ("" === o && e && (o = gpeByClass("photos_photo_edit_row", e).getAttribute("data-id")), o ? r.push(o) : each(geByClass("photos_edit_selected"), function() {
            r.push(this.getAttribute("data-id"))
        }), i = intval(photos._editGetSelectedCount() > r.length));
        var s = cur.album ? cur.album.split("_") : [vk.id];
        return showBox("/al_photos.php", {
            act: "a_move_to_album_box",
            photo_ids: i ? "" : r.join(","),
            owner_id: s[0],
            from_album_id: s[1],
            all: i
        }, {
            onDone: t
        }), cancelEvent(a)
    },
    cancelMove: function(o, e, t, a, r, i, s) {
        var n = gpeByClass("photos_photo_edit_row", e);
        re(geByClass1("photos_cancel_move", n)), photos._showProgressPanel(n), ajax.post("al_photos.php", {
            act: "move_photos",
            photos: t,
            to_album_id: a,
            from_album_id: r,
            hash: s,
            owner_id: i
        }, {
            onDone: function() {
                photos._hideProgressPanel(n), cur.count++, photos._editUpdateSelectedCounter()
            }
        }), cancelEvent(o)
    },
    doMovePhotos: function(o, e, t) {
        var a = domClosest("_photos_album", e),
            r = domData(a, "aid"),
            i = domData(a, "from-aid"),
            s = domData(a, "owner-id"),
            n = domData(a, "move-hash"),
            d = domData(a, "from"),
            l = geByClass1("photos_album_counter", e),
            c = geByClass1("photos_album_thumb", e),
            h = ge("pv_move_to_album_progress");
        c.insertBefore(h, c.children[0]), show(h), addClass(e, "photos_in_progress"), addClass(gpeByClass("photos_container_albums", e), "photos_inactive"), photos.doEditBatchProcess({
            act: "move_photos",
            to_album_id: r,
            from_album_id: i,
            owner_id: s,
            hash: n,
            from: d
        }, cur.editPhotosArray, ge("pv_move_to_album_progress"), "photos_move_in_progress_title", function(o, e, a, n, d, c) {
            cur.count = Math.max(cur.count - o, 0), val(l, +val(l) + o), each(a, function(o, e) {
                var a = ge("photo_edit_row_" + e);
                if (!cur.isPhotoUpload)
                    if (a && !t) {
                        var n = "return photos.cancelMove(event, this, '" + e + "', " + i + ", " + r + ", " + s + ", '" + c + "')",
                            d = se('<div class="photos_cancel_move"><a href="" onclick="' + n + '">' + getLang("global_cancel") + "</a></div>");
                        a.appendChild(d)
                    } else re(a);
                cur.count = Math.max(cur.count, 0)
            }), photos._editUpdateSelectedCounter()
        }, function(o, e) {
            var a = curBox();
            a && a.hide();
            var r = langNumeric(o, cur.lang.photos_x_photos_moved_no_cancel);
            if (r = r.replace("{album}", e), showDoneBox(r), cur.pvShown && cur.pvCurPhoto && (cur.pvCurPhoto.album = e, geByClass1("pv_album_name").innerHTML = e), t || cur.isPhotoUpload)
                if (0 == cur.count) nav.reload();
                else {
                    var i = geByClass("photos_photo_edit_row").length;
                    40 > i && photos.load()
                }
        }), o && cancelEvent(o)
    },
    publishPhotos: function(o) {
        if (cur.savedPhotos) {
            cur.savingPhotos = !0;
            var e = {
                act: "post",
                type: "photos_upload",
                to_id: vk.id,
                attach1_type: "photos_list",
                attach1: (cur.savedPhotos || []).join(","),
                hash: cur.post_hash
            };
            ajax.post("/al_wall.php", e, {
                showProgress: lockButton.pbind(o),
                onDone: function() {
                    delete cur._back, nav.go("/al_profile.php"), showBackLink()
                }
            })
        }
        return !1
    },
    registerDragZone: function(o) {
        addEvent(document, "dragenter dragover", function(e) {
            return photos.checkHtml5Uploader() ? (setTimeout(function() {
                clearTimeout(cur.dragTimer), delete cur.dragTimer
            }, 0), o.on(e), cancelEvent(e)) : void 0
        }), addEvent(document, "dragleave", function(e) {
            cur.dragTimer && (clearTimeout(cur.dragTimer),
                delete cur.dragTimer), cur.dragTimer = setTimeout(function() {
                o.un(e)
            }, 100), cancelEvent(e)
        }), addEvent(document, "drop", function(e) {
            return o.un(e, !0), o.drop(e.dataTransfer.files), cancelEvent(e)
        }), cur.destroy.push(function() {
            removeEvent(document, "dragenter dragover"), removeEvent(document, "dragleave"), removeEvent(document, "drop")
        })
    },
    openWebcamPhoto: function() {
        var o = showBox("al_photos.php", {
            act: "webcam_photo",
            oid: cur.oid
        }, {
            params: {
                dark: 1
            }
        });
        o.setOptions({
            width: 644
        })
    },
    initWebcam: function(o, e) {
        cur.lang = extend(cur.lang || {}, e), o.setOptions({
            hideButtons: !0,
            width: 644,
            bodyStyle: "padding:0px;border:0px;"
        }), photos.cameraInit()
    },
    cameraInit: function() {
        var o = ["ajx=1"];
        for (var e in Upload.vars[cur.uplId]) o.push(e + "=" + Upload.vars[cur.uplId][e]);
        var t = Upload.uploadUrls[cur.uplId] + (Upload.uploadUrls[cur.uplId].match(/\?/) ? "&" : "?") + o.join("&"),
            a = {
                s_noCamera: getLang("profile_no_camera"),
                s_noAccess: getLang("profile_no_camera_access"),
                s_setAccess: getLang("profile_set_camera_access"),
                s_capture: getLang("profile_capture_image"),
                s_videoMode: getLang("profile_to_video_mode"),
                upload_url: t,
                saveClbk: "photos.cameraPhotoDone",
                hideClbk: "photos.uploadReturn",
                overClbk: "photos.cameraBtnOver",
                outClbk: "photos.cameraBtnOut",
                downClbk: "photos.cameraBtnDown",
                upClbk: "photos.cameraBtnUp",
                showSaveClbk: "photos.showCameraSaveBtn",
                hideSaveClbk: "photos.hideCameraSaveBtn",
                hideCaptureClbk: "photos.hideCameraCaptureBtn",
                progressClbk: "photos.cameraSaveProgress",
                getBtnsPos: "photos.updateCameraButtonsPos",
                jpgQuality: "95"
            };
        for (var r in a) a[r] = winToUtf(a[r]);
        var i = {
                url: "/swf/CaptureImg.swf",
                id: "flash_camera",
                width: 604,
                height: 480,
                preventhide: 1,
                style: "visibility: visible",
                version: 9
            },
            o = {
                allownetworking: "true",
                wmode: "transparent"
            };
        return this.addWebcamPhotoControls = geByClass1("add_webcam_photo_controls"), hide("camera_button_no"), renderFlash("webcam_photo", i, o, a), !1
    },
    cameraPhotoDone: function(o) {
        delete this.addWebcamPhotoControls, o = JSON.parse(o.replace(/\\"/g, '"')), ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, o), {
            onDone: function(o, e) {
                photos.showEditView(o, e)
            }
        })
    },
    updateCameraButtonsPos: function() {
        var o = this.addWebcamPhotoControls,
            e = [],
            t = getXY(o);
        getSize(o);
        setStyle(this.addWebcamPhotoControls, {
            visibility: "visible"
        });
        var a = function(o, a) {
            if (isVisible(a.parentNode)) {
                var r = getXY(a),
                    i = getSize(a);
                e.push([r[0] - t[0], r[1] - t[1], i[0] + 2, i[1] + 2])
            }
        };
        each(geByTag("button", o), a), each(geByClass("button", o), a), 1 == e.length && e.push([999, 999, 1, 1]), ge("flash_camera").setButtonsPos && ge("flash_camera").setButtonsPos(e)
    },
    showCameraSaveBtn: function() {
        show("camera_button_no"), ge("camera_button_yes").innerHTML = getLang("profile_oph_camera_save"), ge("camera_button_no").innerHTML = getLang("profile_to_video_mode"), this.updateCameraButtonsPos()
    },
    hideCameraSaveBtn: function(o) {
        hide("camera_button_no");
        var e = ge("camera_button_no");
        ge("camera_button_yes").innerHTML = getLang("profile_capture_image"), e && (e.innerHTML = getLang("profile_oph_camera_back")), o || this.updateCameraButtonsPos()
    },
    hideCameraCaptureBtn: function() {
        hide(ge("camera_button_no").parentNode), ge("camera_button_yes").innerHTML = getLang("profile_no_camera_back"), this.updateCameraButtonsPos()
    },
    cameraSaveProgress: function(o) {
        var e = ge("camera_button_yes");
        e && (o ? lockButton(e) : unlockButton(e))
    },
    cameraBtnOver: function(o) {
        var e = geByClass1(o, this.addWebcamPhotoControls);
        e && addClass(e, "hover")
    },
    cameraBtnOut: function(o) {
        var e = geByClass1(o, this.addWebcamPhotoControls);
        e && (removeClass(e, "hover"), removeClass(e, "active"))
    },
    cameraBtnDown: function(o) {
        var e = geByClass1(o, this.addWebcamPhotoControls);
        e && addClass(e, "active")
    },
    cameraBtnUp: function(o) {
        var e = geByClass1(o, this.addWebcamPhotoControls);
        e && removeClass(e, "active")
    },
    uploadReturn: function() {
        curBox().hide(), delete this.addWebcamPhotoControls
    },
    showEditView: function(o, e) {
        cur.webcamPhotoMedia = o, cur.pvPhoto = null, cur.uploadPhotoData = e, stManager.add(["photoview.js"], function() {
            cur.fromWebcam = !0, Photoview.openEditor(o, e.editable.sizes.x[0])
        })
    },
    onFiltersSave: function() {
        cur.imMedia ? cur.imMedia.chooseMedia("photo", cur.webcamPhotoMedia, extend(cur.uploadPhotoData, {
            upload_ind: cur.imUploadInd + "_selfie"
        })) : cur.chooseMedia("photo", cur.webcamPhotoMedia, extend(cur.uploadPhotoData, {
            upload_ind: cur.uplId + "_selfie"
        })), delete cur.webcamPhotoMedia, delete cur.uploadPhotoData
    },
    returnToWebcam: function() {
        curBox().hide(), this.openWebcamPhoto()
    }
};
try {
    stManager.done("photos.js")
} catch (e) {}