var PhotosAdd = {
    PROGRESS_OPACITY_SPEED: 100,
    checkChanges: function(o) {
        if (!cur.leaving) {
            if (cur.album && cur.uploadStarted) {
                var e = getLang("photos_uploading_warning");
                if (1 === o) {
                    var t = showFastBox({
                        title: getLang("global_warning"),
                        dark: 1
                    }, e, getLang("photos_stop_uploading"), function() {
                        cur.leaving = !0, t.hide(), cur.onContinueCb && cur.onContinueCb()
                    }, getLang("global_cancel"));
                    return !0
                }
                return winToUtf(e)
            }
            return o ? !1 : void 0
        }
    },
    go: function(o, e) {
        return PhotosAdd.checkChanges(1) ? (cur.onContinueCb = nav.go.pbind(o, e), !0) : nav.go(o, e)
    },
    initBeforeUnload: function() {
        cur.unloadInited || (cur.unloadInited = !0, cur.nav.push(function(o, e, t, r) {
            return PhotosAdd.checkChanges(1) ? (cur.onContinueCb = nav.go.pbind(t), !1) : cur.album == vk.id + "_-7" && cur.savedPhotos && cur.savedPhotos.length && !cur.savingPhotos ? (cur.savingPhotos = !0, ajax.post("/al_photos.php", {
                act: "publish_photos",
                hash: cur.post_hash,
                photos: cur.savedPhotos.join(",")
            }, {
                onDone: nav.go.pbind(t)
            }), !1) : void 0
        }), addEvent(window, "mousewheel", PhotosAdd.wheelHandler), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = PhotosAdd.checkChanges, cur.destroy.push(function() {
            window.onbeforeunload = cur.prevBefUnload, removeEvent(window, "mousewheel", PhotosAdd.wheelHandler)
        }))
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
            onchange: PhotosAdd.fileSelected
        })
    },
    addFile: function() {
        var o = cur.files.length,
            e = PhotosAdd.genFile(o, "PhotosAdd.fileCancel(" + o + ")", getLang("global_cancel"));
        extend(e, {
            className: "photo_upload_file",
            id: "photo_upload_row" + o
        }), ge("photo_upload_files").appendChild(e), PhotosAdd.initFile(o), cur.files.push({})
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
            var r = extend(cur.fields, {
                act: "do_add",
                al: 1,
                from_host: locHost,
                ondone: "PhotosAdd.filesDone",
                onfail: "PhotosAdd.filesFail"
            });
            for (e in r) form.appendChild(ce("input", {
                name: e,
                value: r[e]
            }));
            for (o = 0, e = 0; o < cur.files.length; ++o) {
                var a = ge("photo_file" + o);
                a.value && (a.name = "file" + e, form.appendChild(a), ++e)
            }
            form.submit()
        }
    },
    fileSelected: function() {
        var o = intval(this.id.replace("photo_file", ""));
        if (cur.files[o].deleting || !cur.files[o].cont && !cur.files[o].id) {
            cur["fileDone" + o] = PhotosAdd.fileDone.pbind(o), cur["fileFail" + o] = PhotosAdd.fileFail.pbind(o), cur.files[o].cont = utilsNode.appendChild(ce("div", {
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
            var r = ge("photo_file_button" + o);
            lockButton(r), setTimeout(function() {
                r.innerHTML = r.innerHTML
            }, 0), show("photo_cancel" + o), ge("photo_cancel" + o).innerHTML = getLang("global_cancel"), o == cur.files.length - 1 && PhotosAdd.addFile()
        }
    },
    fileDone: function(i, res) {
        hide("photo_cancel" + i);
        for (var before = "", j = i + 1; j < cur.files.length; ++j)
            if (cur.files[j].id && !cur.files[j].deleting) {
                before = cur.files[j].id;
                break
            }
        var obj;
        try {
            obj = eval("(" + res + ")")
        } catch (e) {
            obj = q2ajx(res)
        }
        PhotosAdd.fetchGeo(obj), setTimeout(ajax.post.pbind("al_photos.php", extend({
            act: "done_add",
            before: before,
            context: 1,
            geo: 1
        }, obj), {
            onDone: function(o, e) {
                return o ? (cur.files[i].cont.innerHTML = "", utilsNode.removeChild(cur.files[i].cont), extend(cur.files[i], {
                    id: o,
                    deleting: !1,
                    cont: !1
                }), ge("photo_upload_row" + i).innerHTML = e, autosizeSetup("photo_caption" + o, {
                    minHeight: 30
                }), show("photo_delete" + o), void(window._tbLink && _tbLink.loc && (cur.__phinputs = cur.__phinputs || [], globalHistoryDestroy(_tbLink.loc)))) : PhotosAdd.fileFail(i, 0)
            },
            onFail: function(o) {
                return o ? (setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1
                }, o).hide, 3e3), PhotosAdd.fileCancel(i), !0) : void 0
            }
        }), 0)
    },
    fileCancel: function(o, e) {
        if (cur.files[o].cont && (cur.files[o].cont.innerHTML = "", utilsNode.removeChild(cur.files[o].cont)), !e) {
            var t = ge("photo_file_button" + o);
            unlockButton(t), t.innerHTML = getLang("photos_choose_file"), cur.files[o] = {}, PhotosAdd.initFile(o), hide("photo_cancel" + o)
        }
    },
    fileFail: function(o, e) {
        PhotosAdd.fileCancel(o)
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
            var r = ge("photo_edit_row" + o);
            r.parentNode.insertBefore(PhotosAdd.genFile(t, "PhotosAdd.fileRestore('" + o + "', '" + e + "')", getLang("global_restore")), r), hide(r), PhotosAdd.initFile(t), show("photo_cancel" + t)
        }
    },
    fileRestore: function(o, e) {
        for (var t = 0, r = ""; t < cur.files.length && cur.files[t].id != o;) ++t;
        if (t != cur.files.length && cur.files[t].deleting && -1 !== cur.files[t].deleting) {
            if (cur.files[t].cont) return PhotosAdd.fileCancel(t);
            for (var a = t + 1; a < cur.files.length; ++a)
                if (cur.files[a].id && !cur.files[a].deleting) {
                    r = cur.files[a].id;
                    break
                }
            cur.files[t].deleting = -1, ajax.post("al_photos.php", {
                act: "restore_photo",
                photo: o,
                hash: e,
                before: r,
                edit: 2
            }, {
                onDone: function() {
                    cur.files[t].deleting = !1
                }
            });
            var d = ge("photo_edit_row" + o);
            show(d), re(d.previousSibling)
        }
    },
    filesDone: function(o) {
        var e = q2ajx(o);
        PhotosAdd.fetchGeo(e), setTimeout(ajax.post.pbind("al_photos.php", extend({
            act: "done_add",
            context: 2,
            geo: 1
        }, e)), 0)
    },
    filesFail: function() {
        for (var o = 0; o < cur.files.length; ++o) PhotosAdd.fileCancel(o);
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
        }) : (show("photo_flash_upload"), void hide("photo_default_upload"))
    },
    chooseDefault: function() {
        show("photo_default_upload"), hide("photo_flash_upload")
    },
    flashWidth: function() {
        return -1 == _ua.indexOf("Mac") || -1 == _ua.indexOf("Opera") && -1 == _ua.indexOf("Firefox") ? "600" : "601"
    },
    backupDesc: function(o) {
        cur.descs || (cur.descs = {}), cur.descs[o] = trim(ge("photo_caption" + o).value)
    },
    saveDesc: function(o, e) {
        var t = ge("photo_caption" + o).value,
            r = (cur.descs || {})[o];
        delete(cur.descs || {})[o], trim(t) != r && ajax.post("al_photos.php", {
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
    multiSel: function(o) {
        alert(o.target.files.length)
    },
    activeTab: function(o) {
        for (var e = domPN(domPN(o)), t = domFC(e); t; t = domNS(t)) removeClass(t, "active_link");
        addClass(domPN(o), "active_link");
        var r = domFC(ge("photo_add_tab"));
        r !== o && re("photo_add_tab")
    },
    initHtml5: function() {
        var o = browser.msie6 ? pageNode : window;
        addEvent(o, "scroll", PhotosAdd.scrollHandler), cur.destroy.push(function() {
            removeEvent(o, "scroll", PhotosAdd.scrollHandler)
        }), cur.noSortPhotos || browser.mobile || sorter.init("photos_add_list", {
            onReorder: PhotosAdd.reorderPhoto,
            dh: 0
        }), cur.photoAddUpdate = function(o) {
            cur.noSortPhotos || browser.mobile || setTimeout(sorter.update.pbind(o), 0)
        }, cur.deleteAllToggle = function(o) {
            cur.photoAddUpdate(o.parentNode)
        }
    },
    reorderPhoto: function(o, e, t) {
        for (var r = ge("photos_add_list"), a = r.firstChild; a && !hasClass(a, "photos_add_upl_row");) a = a.nextSibling;
        if (!hasClass(a, "photos_add_first_child")) {
            var d = geByClass("photos_add_first_child", r)[0];
            removeClass(d, "photos_add_first_child"), addClass(a, "photos_add_first_child")
        }
        ajax.post("al_photos.php", {
            act: "reorder_photos",
            photo: o.id.substr(14),
            before: e ? e.id.substr(14) : "",
            after: t ? t.id.substr(14) : "",
            hash: cur.reorderHash || ""
        })
    },
    wheelHandler: function(o) {
        cur.album && (cur.scrollFixed = scrollNode.scrollTop + window.innerHeight != scrollNode.offsetHeight)
    },
    scrollHandler: function(o) {
        if (cur.uplSelected) {
            if (ge("photos_add_bar")) {
                var e = scrollGetY();
                cur.scrollBarFixedY || (cur.scrollBarFixedY = getXY(ge("photos_add_bar").parentNode)[1]);
                var t = ge("photos_add_bar");
                e > cur.scrollBarFixedY && !cur.scrollBarFixed && (t.className = "photos_add_bar1", cur.scrollBarFixed = !0, cur.introTooltipHide && cur.introTooltipHide()), e < cur.scrollBarFixedY && cur.scrollBarFixed && (t.className = "photos_add_bar0", cur.scrollBarFixed = !1, cur.introTooltipShow && cur.introTooltipShow())
            }
            if (isVisible("photos_go_to_album")) {
                var r = window,
                    a = document.documentElement,
                    d = ge("photos_go_to_album");
                if (!r.pageNode) return;
                var i = getXY(d.parentNode),
                    s = getSize(d),
                    n = Math.max(intval(r.innerHeight), intval(a.clientHeight));
                e < i[1] + s[1] - n && !cur.scrollFooterFixed && (addClass(d, "fixed"), cur.scrollFooterFixed = !0), e > i[1] + s[1] - n && cur.scrollFooterFixed && (removeClass(d, "fixed"), cur.scrollFooterFixed = !1)
            }
        }
    },
    setThumb: function(o, e) {
        var t = geByClass1("photos_add_img", o),
            r = getSize(t);
        e.mtop = 0, Math.abs(t.rotate) % 180 == 90 && this.transformAvailable() && (r.reverse(), r[1] < r[0] && (e.mtop = Math.floor((r[1] - r[0]) / 2))), browser.opera && (e.mtop = e.mtop - 2), setStyle(e, {
            width: r[0],
            marginLeft: Math.floor((132 - r[0]) / 2)
        })
    },
    thumbOver: function(o, e) {
        var t = geByClass("photos_add_controls", o)[0];
        t || (t = ce("div", {
            id: "photos_add_controls" + e,
            className: "photos_add_controls",
            innerHTML: '<div class="photos_add_c_bar"><a class="photos_add_rl" onclick="PhotosAdd.rotateAngle(\'' + e + '\', 90);"></a><a class="photos_add_rr" onclick="PhotosAdd.rotateAngle(\'' + e + "', -90);\"></a></div>"
        }), o.appendChild(t)), PhotosAdd.setThumb(o, t), show(t), animate(t, {
            height: 24,
            marginTop: t.mtop - 24
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        })
    },
    thumbOut: function(o) {
        var e = geByClass("photos_add_controls", o)[0];
        e && animate(e, {
            height: 0,
            marginTop: e.mtop
        }, 200, function() {})
    },
    transformAvailable: function() {
        return !1
    },
    rotateAngle: function(o, e, t, r) {
        var a = gpeByClass("photos_photo_edit_row", t);
        o = attr(a, "data-id");
        photos._showProgressPanel(a);
        window.tooltips && tooltips.hideAll(), cancelEvent(r);
        var d = cur.photoData[o];
        form = ge("photo_rotate_form" + o), form.innerHTML = "", form.action = d.rotate[0];
        var i = extend({
            act: "do_rotate",
            to: 90 == e ? 1 : -1,
            fid: o
        }, d.rotate);
        "rotate_photo" == i.act && (i.angle = (i.angle + i.to + 4) % 4);
        var s = (i.to + 4) % 4;
        if (i["rot" + s]) return i.act = "done_rotate", i.complete = 1, ajax.post("/al_photos.php", i, {
            onDone: PhotosAdd.rotateDone,
            onFail: PhotosAdd.rotateDone
        }), !1;
        for (var n in i) 0 != n && form.appendChild(ce("input", {
            type: "hidden",
            name: n,
            value: i[n]
        }));
        return form.submit(), ajaxCache = {}, delete cur.pvList, delete cur.pvData, !1
    },
    rotateDone: function(o) {
        if (o) {
            var e = o.photo_raw,
                t = ge("photo_edit_row_" + e),
                r = geByClass1("photos_photo_edit_row_thumb", t);
            photos._hideProgressPanel(t), setStyle(r, {
                "background-image": "url('" + (o.p_src || o.q_src) + "')"
            }), delete o.m_, delete o.o_;
            var a = cur.photoData[e];
            extend(a.rotate, {
                photo: o.photo,
                hash: o.hash,
                rhash: o.rhash,
                angle: o.angle,
                rot1: o.rot1,
                rot3: o.rot3
            }), ajaxCache = {}, delete cur.pvList, delete cur.pvData
        }
    },
    rotateFailed: function(o) {
        PhotosAdd.transformAvailable() || re("rotating_image" + o);
        var e = ge("photos_add_controls" + o);
        delete e.blocked
    },
    deleteAddPhoto: function(o) {
        var e = qsorter.remove(cur.uplBox, ge("photos_add_item" + o));
        cur.uploadPhotoCount -= 1, e && PhotosAdd.thumbOver(e.id.substr(19), geByClass("photos_add_img", e)[0]), PhotosAdd.updateCount()
    },
    correctThumb: function(o, e, t) {
        if (Math.abs(e) % 180 == 90) {
            var r = Math.min(t.firstChild.width, 98);
            setStyle(t, {
                width: r,
                marginLeft: Math.ceil((130 - r) / 2)
            })
        } else {
            var r = t.firstChild.width;
            setStyle(t, {
                width: r,
                marginLeft: Math.ceil((130 - r) / 2)
            })
        }
        var a = ge("photos_add_controls" + o);
        hide(a), setStyle(a, {
            height: 0,
            marginTop: "0px"
        }), setTimeout(function() {
            var e = Upload.fileList[cur.uplId][o];
            e.animating = !1, PhotosAdd.thumbOver(o, t)
        }, 600)
    },
    updateCount: function() {
        var o = ge("photos_add_save");
        o.innerHTML = langNumeric(cur.qsrt.count, cur.uploaderLang.photos_save_X_photos), 0 == cur.qsrt.count && (show("photos_add_empty"), hide("photos_add_box"), hide(ge("photos_add_bar").parentNode), Upload.fileList[cur.uplId] = !1)
    },
    saveHtml5: function() {
        Upload.uploadPhotos(cur.uplId)
    },
    scrollToBottom: function(o) {
        if (!cur.scrollFixed) {
            var e = window,
                t = document.documentElement;
            if (o || (o = cur.lastPhotoRow), e.pageNode && o) {
                var r = getXY(o),
                    a = getSize(o),
                    d = Math.max(intval(e.innerHeight), intval(t.clientHeight));
                r[1] <= 0 && (r = getXY(o.parentNode));
                var i = r[1] + a[1] - d + 200;
                i > 0 && i > scrollNode.scrollTop && scrollToY(i, 400)
            }
        }
    },
    _onScroll: function() {
        if (null !== cur.pageBlockHeader && (cur.pageBlockHeader = cur.pageBlockHeader || geByClass1("page_block_header", ge("photos_add_block")), cur.pageBlockHeader)) {
            var o = getSize(ge("page_header_cont"))[1];
            cur.photoAddHeaderElOffset = cur.photoAddHeaderElOffset || getXY(cur.pageBlockHeader)[1] - o;
            var e = (geByClass1("photos_container_edit_grid", domPN(cur.pageBlockHeader)), ge("photos_add_block"));
            scrollGetY() >= cur.photoAddHeaderElOffset ? (addClass(cur.pageBlockHeader, "photos_header_fixed"), setStyle(cur.pageBlockHeader, {
                width: getSize(ge("page_body"))[0],
                top: getSize("page_header")[1]
            }), setStyle(e, {
                "padding-top": getSize(cur.pageBlockHeader)[1] + "px"
            })) : (removeClass(cur.pageBlockHeader, "photos_header_fixed"), setStyle(cur.pageBlockHeader, {
                width: ""
            }), setStyle(e, {
                "padding-top": ""
            })), PhotosAdd.updateBottomFixedPanel()
        }
    },
    updateBottomFixedPanel: function() {
        if (null !== cur.fixedBottomPanel && (cur.fixedBottomPanel = cur.fixedBottomPanel || ge("photos_go_to_album"), cur.fixedBottomPanel)) {
            var o = ge("photos_add_block");
            if (o) {
                var e = getXY(o)[1],
                    t = getSize(o)[1];
                clientHeight() + scrollGetY() < e + t ? (addClass(cur.fixedBottomPanel, "photos_bottom_fixed"), setStyle(cur.fixedBottomPanel, {
                    width: getSize(ge("page_body"))[0]
                }), setStyle(domPS(cur.fixedBottomPanel), {
                    "padding-bottom": 10 + getSize(cur.fixedBottomPanel)[1] + "px"
                })) : (removeClass(cur.fixedBottomPanel, "photos_bottom_fixed"), setStyle(cur.fixedBottomPanel, {
                    width: ""
                }), setStyle(domPS(cur.fixedBottomPanel), {
                    "padding-bottom": ""
                }))
            }
        }
    },
    initFixedHeader: function() {
        function o() {
            removeEvent(window, "scroll", PhotosAdd._onScroll)
        }
        o(), addEvent(window, "scroll", PhotosAdd._onScroll), cur.destroy.push(o)
    },
    onUploadStart: function(o, e) {
        if (PhotosAdd.initBeforeUnload(), cur.onPhotoAddStart && cur.onPhotoAddStart(), cur.flash_lite && void 0 === o.num && (o = e), 0 == o.num && (cur.errorCount = 0, !ge("photos_add_wrap"))) {
            cur.count = 0, show("photos_add_block"), removeClass(ge("photos_add_block"), "unshown"), hide("photos_tagged_block"), hide("photos_all_block");
            var t = ge("photos_albums_block");
            setStyle(t, {
                visibility: "hidden",
                height: 0,
                padding: 0,
                margin: 0,
                overflow: "hidden"
            }), each(geByClass("photos_period_delimiter_fixed"), hide), cur.prevDocTitle = document.title, cur.uploadStarted = !0, hide("photos_go_to_album"), PhotosAdd.initFixedHeader()
        }
        var r = "";
        cur.photosAddFirst || (cur.photosAddFirst = !0, r = " photos_add_first_child"), o.prepareCont = se(rs(cur.uploadRowTpl, {
            photo_raw: "",
            thumb: "",
            description: "",
            hash: ""
        })), re(geByClass1("photos_photo_edit_row_selector", o.prepareCont)), setStyle(o.prepareCont, {
            display: "none"
        }), photos._showProgressPanel(o.prepareCont), cur.flash_lite && (cur.flashPrepareCont = cur.flashPrepareCont || {}, cur.flashPrepareCont[o.num] = cur.flashPrepareCont[o.num] || {}, cur.flashPrepareCont[o.num][o.filename] = o.prepareCont);
        var a = ge("photos_add_list");
        a.appendChild(o.prepareCont), cur.lastPhotoRow = o.prepareCont, PhotosAdd.makeTask(function() {
            return show(o.prepareCont), show(geByClass1("photos_photo_edit_row_progress", o.prepareCont)), PhotosAdd.scrollToBottom(), !0
        }), cur.uplSelected = !0, ajax.post("al_photos.php", {
            act: "start_add",
            hash: cur.statsPhotoAddHash
        })
    },
    updateProgressBar: function(o, e, t) {
        var r = ge("photos_uploaded_progress"),
            a = ge("photos_total_progress");
        if (o === !1) {
            var d = ge("photos_upload_btn");
            addClass(r, "photos_progress_hidden"), setTimeout(function() {
                hide(r), show(d), setTimeout(removeClass.pbind(d, "photos_progress_hidden"))
            }, PhotosAdd.PROGRESS_OPACITY_SPEED), o = 1
        } else if (hasClass(r, "photos_progress_hidden")) {
            var d = ge("photos_upload_btn");
            addClass(d, "photos_progress_hidden"), setTimeout(function() {
                hide(d), show(r), setTimeout(removeClass.pbind(r, "photos_progress_hidden"))
            }, PhotosAdd.PROGRESS_OPACITY_SPEED), o = 0
        }
        var i = geByClass1("ui_progress_bar", a);
        if (setStyle(i, "width", o * getSize(a)[0]), e || t) {
            e = e || 0, t = t || 0;
            var s = langNumeric(e, cur.uploaderLang.photos_upload_progress).replace("{count}", e).replace("{total}", t);
            val(ge("photos_total_progress_text"), s)
        }
    },
    hideUploadProgress: function() {
        PhotosAdd.updateProgressBar(!1)
    },
    onUploadProgress: function(o, e, t) {
        var r = o.totalCount || 1,
            a = o.num || 0,
            d = 1 / r,
            i = a * d;
        PhotosAdd.updateProgressBar(i + d * e / t, a, r)
    },
    onUploadComplete: function(info, res) {
        cur.flash_lite && (info.prepareCont = cur.flashPrepareCont[info.num][info.filename]);
        var obj;
        try {
            obj = eval("(" + res + ")")
        } catch (e) {
            obj = q2ajx(res)
        }
        if (!obj.photos) return cur.errorCount++, re(info.prepareCont), info.prepareCont && info.prepareCont.helper && re(info.prepareCont.helper), ge("photos_upload_error_msg").innerHTML = cur.uploaderLang.photos_add_error, show("photos_upload_error"), scrollToTop(200), void PhotosAdd.makeTask();
        if (obj.code) return void Upload.onUploadError(cur.UplId, obj.code);
        PhotosAdd.fetchGeo(obj);
        var params = extend({
            act: "done_add",
            from: "html5",
            context: 1,
            geo: 1
        }, obj);
        cur.lastPhotoRow = info.prepareCont, cur.photoSaveQ = cur.photoSaveQ || [], cur.photoSaveQ.push(function() {
            ajax.post("al_photos.php", params, {
                onDone: function(html, js, photoRaw, thumb, editHash, qParams) {
                    hide("photos_upload_error"), cur.count++, info.prepareCont = domReplaceEl(info.prepareCont, html), re(geByClass1("photos_photo_edit_row_selector", info.prepareCont)), eval(js), cur.savedPhotos = cur.savedPhotos || [], cur.savedPhotos.push(photoRaw), cur.savedThumbs = cur.savedThumbs || {}, cur.savedThumbs[photoRaw] = thumb;
                    var thumbEl = geByClass1("photos_photo_edit_row_thumb", info.prepareCont),
                        thumbImage = vkImage();
                    thumbImage.onload = function() {
                        removeClass(thumbEl, "no_thumb"), setStyle(thumbEl, "background-image", "url('" + thumb + "')"), hide(geByClass1("photos_photo_edit_row_progress", info.prepareCont))
                    }, thumbImage.src = thumb, PhotosAdd.makeTask(), cur.photoSaveQ.shift(), cur.photoSaveQ[0] && cur.photoSaveQ[0](), cur.onPhotoFirstUploaded && cur.onPhotoFirstUploaded();
                    var uploadDocumentTitle = cur.uploaderLang.photos_upload_progress_title.replace("{count}", cur.count).replace("{total}", info.totalCount);
                    setDocumentTitle(replaceEntities(uploadDocumentTitle)), qParams && PhotosAdd.queueCheckUpdates(qParams)
                },
                onFail: function(o) {
                    if (o && (ge("photos_upload_error_msg").innerHTML = o, show("photos_upload_error"), scrollToTop(200)), cur.errorUpload = !0, hasClass(info.prepareCont, "photos_add_first_child")) {
                        for (var e = info.prepareCont.nextSibling; e;) {
                            if (hasClass(e, "photos_add_upl_row")) {
                                addClass(e, "photos_add_first_child");
                                break
                            }
                            e = e.nextSibling
                        }
                        e || (cur.photosAddFirst = !1)
                    }
                    return re(info.prepareCont), cur.photoSaveQ.shift(), cur.photoSaveQ[0] && cur.photoSaveQ[0](), PhotosAdd.makeTask(), !0
                }
            })
        }), 1 == cur.photoSaveQ.length && cur.photoSaveQ[0]()
    },
    queueCheckUpdates: function(o) {
        window.Notifier && Notifier.addKey(o, PhotosAdd.queueReceiveUpdates)
    },
    queueReceiveUpdates: function(o, e) {
        e.events && e.events.forEach(function(o) {
            var e = o.split("<!>"),
                t = e[1],
                r = e[2],
                a = JSON.parse(r);
            if (a && Object.keys(a).length) {
                var d = "photo_edit_row_" + t;
                addClass(ge(d), "has_faces animated")
            }
        })
    },
    updateSorterRow: function(o) {
        cur.noSortPhotos || setTimeout(function() {
            sorter.update(ge("photo_edit_row" + o))
        }, 0)
    },
    onUploadCompleteAll: function(o, e) {
        cur.uploadStartProgress = 0, delete cur.uploadStarted, window.onbeforeunload = cur.prevBefUnload, delete cur.unloadInited, PhotosAdd.hideUploadProgress(), PhotosAdd.makeTask(function() {
            if (cur.flash_lite) {
                re("lite_photo_uploader");
                var o = ge("photos_upload_area"),
                    e = ce("div", {
                        innerHTML: '<div id="lite_photo_uploader" style="position: absolute; height: 100%; width: 100%; z-index: 9999; cursor: pointer;"></div>'
                    }).firstChild;
                o.parentNode.insertBefore(e, o), cur.initFlashLite()
            }
            setDocumentTitle(cur.prevDocTitle), show("photos_go_to_album"), cur.lastPhotoRow = ge("photos_go_to_album"), PhotosAdd.updateBottomFixedPanel(), re("photos_albums_block")
        })
    },
    makeTask: function(o) {
        if (cur.photoAddQ = cur.photoAddQ || [], o ? cur.photoAddQ.push(o) : cur.photoAddSt = !1, !cur.photoAddSt) {
            var e = cur.photoAddQ.shift();
            e && (cur.photoAddSt = e())
        }
    },
    fetchGeo: function(o) {
        if (!o.photos) return !1;
        var e = parseJSON(o.photos);
        if (!e) return !1;
        var t = {},
            r = 0;
        for (var a in e) {
            var d = e[a].latitude,
                i = e[a].longitude;
            d && i && (t[d + "," + i] = 1, r += 1)
        }
        return r ? void stManager.add(["maps.js"], function() {
            cur.placeMap = new vkMaps.VKMap(!1, "google"), cur.placeMap.isLoaded("google") ? PhotosAdd.setGeo(t) : cur.placeMap.load.addHandler(PhotosAdd.setGeo.pbind(t))
        }) : !1
    },
    setGeo: function(o) {
        var e = cur.uploaderLang.geolang || "en";
        for (var t in o) {
            t = t.split(",");
            var r = t[0],
                a = t[1];
            new vkMaps.Geocoder("google", function(o) {
                ajax.post("al_photos.php", {
                    act: "a_set_geo",
                    lat: t[0],
                    "long": t[1],
                    geo_country: o.country,
                    geo_locality: o.locality,
                    geo_region: o.region,
                    geo_street: o.street,
                    geo_place: o.place,
                    geo_lang: e,
                    geo_code: o.countryCode
                })
            }).geocode({
                location: new google.maps.LatLng(r, a),
                language: e
            })
        }
    }
};
try {
    stManager.done("photos_add.js")
} catch (e) {}