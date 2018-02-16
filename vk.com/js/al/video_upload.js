var VideoUpload = {
    SUPPORTED_EXTENSIONS: "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf",
    FILE_TYPES: "",
    UPLOAD_ACCEPT: "",
    showBox: function(e) {
        return re("video_upload_box_placeholder"), cur.uploadBanned ? (setTimeout(showFastBox({
            title: getLang("video_no_upload_title"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("video_claims_no_upload")).hide, 5e3), !1) : ge("video_upload_tab") || 4 != vk.al ? (e = e || {}, e = extend(e, {
            act: "upload_box",
            oid: cur.oid || vk.id,
            ocl: cur.ocl ? 1 : 0
        }), cur.uploadVideoBox = showBox("al_video.php", e, {
            stat: ["video_edit.css", "privacy.css", "privacy.js"],
            params: {
                bodyStyle: "position: relative;",
                dark: 1,
                hideButtons: 1,
                onHide: VideoUpload.onHideUploadPanel,
                onDestroy: VideoUpload.onDestroyUploadBox,
                onShow: VideoUpload.onShowUploadPanel,
                width: 452
            }
        }), !1) : nav.go("videos" + cur.oid + "?z=upload_video")
    },
    init: function() {
        VideoUpload.buildExtMasks(), VideoUpload.startEvents()
    },
    buildExtMasks: function() {
        var e = VideoUpload.SUPPORTED_EXTENSIONS.split(" ");
        VideoUpload.UPLOAD_ACCEPT = "." + e.join(",.");
        for (var o = e.length, a = 0; o > a; ++a) e.push(e[a].toUpperCase());
        VideoUpload.FILE_TYPES = "*." + e.join(";*.")
    },
    startEvents: function() {
        addEvent(boxLayerWrap, "scroll", VideoUpload.checkResize), addEvent(window, "resize", VideoUpload.checkResize)
    },
    stopEvents: function() {
        removeEvent(boxLayerWrap, "scroll", VideoUpload.checkResize), removeEvent(window, "resize", VideoUpload.checkResize)
    },
    onHideUploadPanel: function() {
        addClass(ge("video_upload_box_wrapper"), "video_upload_hide")
    },
    onDestroyUploadBox: function() {
        VideoUpload.stopEvents(), delete cur.uploadVideoResizeTimeout, delete window.cur.uploadVideoBox
    },
    onShowUploadPanel: function() {
        ge("video_upload_box_placeholder") && removeClass(ge("video_upload_box_wrapper"), "video_upload_hide"), VideoUpload.doResize()
    },
    checkResize: function() {
        VideoUpload.doResize(), cur.uploadVideoResizeTimeout && clearTimeout(cur.uploadVideoResizeTimeout), cur.uploadVideoResizeTimeout = setTimeout(VideoUpload.doResize, 1)
    },
    destroyTab: function() {
        var e = ge("video_upload_tab");
        if (e) {
            var o = geByClass("video_upload_item_panel", e);
            for (var a in o) {
                var d = o[a];
                cleanElems(d)
            }
        }
    },
    doResize: function() {
        if (isVisible("video_upload_box_wrapper")) {
            var e = ge("video_upload_box_wrapper"),
                o = ge("video_upload_box_placeholder");
            if (e && o) {
                var a = getXY(o);
                setStyle(e, "left", a[0]), setStyle(e, "top", a[1])
            }
        }
    },
    onPrivacyChanged: function(e) {
        var o = cur.tag2ElMap[e.substr(5)],
            a = geByClass1("video_upload_status_export", o);
        Privacy.getValue(e) > 0 ? (removeClass(a, "on"), addClass(a, "disabled")) : removeClass(a, "disabled")
    },
    initUpload: function(url, vars, uploadLang, uploadOpts, uiLang, itemTemplate) {
        cur.lang = extend(cur.lang || {}, uiLang);
        var hashs = {};
        if (hashs[vars.tag] = uploadOpts.update_db_hash, cur.videoHashs = extend(cur.videoHashs || {}, hashs), !ge("video_dropbox")) {
            var p = ge("video_upload_box_tab").parentNode.parentNode.parentNode,
                d = se('<div id="video_dropbox" class="dropbox choose">          <div class="dropbox_wrap">            <div class="dropbox_area">              <div class="dropbox_label">' + uploadLang.drop_files_here + "</div>            </div>          </div>        </div>");
            p.appendChild(d)
        }
        var el;
        (el = ge("video_upload_box_wrapper")) ? VideoUpload.onShowUploadPanel(): (el = ce("div", {
            id: "video_upload_box_wrapper"
        }), bodyNode.appendChild(el), cur.destroy.push(function() {
            re("video_upload_box_wrapper")
        }));
        var children = geByClass("noselect", el, "div");
        for (var index in children) addClass(children[index], "video_upload_hide");
        var uploadItem = se('<div id="video_upload_box' + vars.tag + '" class="noselect"></div>');
        el.appendChild(uploadItem);
        var placeholder = ge("video_upload_box_placeholder"),
            initButton = function() {
                var uploadErrorInfo = ge("video_upload_fail_info");
                uploadErrorInfo && (hide(uploadErrorInfo), setTimeout(function() {
                    var e = getSize(placeholder);
                    setStyle(el, "width", e[0]), setStyle(el, "height", e[1]), setStyle(placeholder, "width", e[0]), setStyle(placeholder, "height", e[1]), VideoUpload.doResize(), re(domFC(placeholder))
                }), Upload.init("video_upload_box" + vars.tag, url, vars, {
                    file_name: "video_file",
                    file_size_limit: 1024 * (uploadOpts.file_size_limit_in_GB || 5) * 1024 * 1024,
                    file_types_description: "Video files",
                    file_types: VideoUpload.FILE_TYPES,
                    lang: uploadLang,
                    flat_button: 1,
                    filesize_hide_last: 1,
                    chunked: 1,
                    chunkSize: 4194304,
                    onUploadStart: function(e, o) {
                        var a = void 0 !== e.ind ? e.ind : e;
                        cur._uploadStart = vkNow(), delete VideoUpload.videoUploadCallback;
                        var d = function() {
                            cur.ocl || (nav.objLoc.section = "upload", nav.setLoc(nav.objLoc));
                            var o = se(rs(itemTemplate, {
                                id: a
                            }));
                            VideoUpload.initBeforeUnload();
                            var d = ge("video_upload_tab"),
                                i = geByClass1("video_upload_item_panel", d);
                            if (i ? (addClass(o, "video_upload_with_divider"), d.insertBefore(o, domNS(ge("video_upload_no_video")))) : (d.appendChild(o), i = geByClass1("video_upload_item_panel", d)), hide("video_upload_no_video"), cur.ocl && cur.oid > 0) {
                                each(geByClass("video_upload_privacy"), hide), hide("video_edit_repeat"), hide(geByClass1("video_upload_status_export")), hide(geByClass1("video_upload_publish_later"));
                                var t = geByClass1("video_upload_ready_button");
                                t.parentNode.insertBefore(se('<div><div class="video_ocl_warn">' + getLang("video_ocl_privacy") + "</div></div>"), t)
                            }
                            if (vars.oid > 0 && (cur.privacy["video" + vars.tag] || (cur.privacy["video" + vars.tag] = cur.privacy.video, cur.privacy["videocomm" + vars.tag] = cur.privacy.video), Privacy.update("video" + vars.tag), Privacy.update("videocomm" + vars.tag), cur.tag2ElMap = cur.tag2ElMap || {}, cur.tag2ElMap[vars.tag] = o, cur.onPrivacyChanged = VideoUpload.onPrivacyChanged), curBox() && curBox().hide(), hide("video_main_block"), hide("videocat_other_blocks"), show("video_upload_block"), cur.videoReupload && (VideoUpload.deleteItem(cur.videoReupload, !1), delete cur.videoReupload), show(d), show(o), e.fileName) {
                                var r, l = e.fileName,
                                    s = VideoUpload.FILE_TYPES.split(";");
                                each(s, function(e, o) {
                                    return r = l.indexOf(o.substr(1)), r == l.length - o.length + 1 ? (l = l.substr(0, r), !1) : void 0
                                });
                                var n = geByClass1("video_upload_item_name", d);
                                val(n, l), n.select()
                            }
                            VideoUpload.videoUploadCallback && (VideoUpload.videoUploadCallback(), delete VideoUpload.videoUploadCallback), cur.videoThumbUploadOpts && isObject(cur.videoThumbUploadOpts) && VideoUpload.initThumbUpload(cur.videoThumbUploadOpts, o), VideoUpload._uploadAlbumChooser = VideoUpload._uploadAlbumChooser || {}, cur.videoPlaylists && cur.videoPlaylists.length ? VideoUpload._uploadAlbumChooser[a] = new Dropdown(geByClass1("video_upload_album_chooser_input", o), [
                                [0, getLang("video_upload_choose_album_placeholder")]
                            ].concat(cur.videoPlaylists), {
                                autocomplete: !0,
                                width: 270,
                                selectedItems: [uploadOpts.aid || 0],
                                big: !0
                            }) : re(geByClass1("video_upload_album_chooser_wrap", o))
                        };
                        if (ge("video_upload_tab")) d();
                        else {
                            var i = cur.privacy,
                                t = cur.videoHashs,
                                r = cur.videoThumbUploadOpts,
                                l = cur.videoUploadThumbBtnTpl,
                                s = cur.videoPlaylists;
                            curBox().hide(), nav.go("videos" + vars.oid, !1, {
                                nocur: !0,
                                onDone: function() {
                                    setTimeout(function() {
                                        cur.lang = extend(cur.lang || {}, uiLang), cur.privacy = extend(cur.privacy || {}, i), cur.videoHashs = extend(cur.videoHashs || {}, t), cur.videoThumbUploadOpts = r, cur.videoUploadThumbBtnTpl = l, cur.videoPlaylists = s, d()
                                    })
                                },
                                params: {
                                    ocl: cur.ocl ? 1 : null
                                }
                            })
                        }
                    },
                    onUploadComplete: function(i, res) {
                        var obj, ind = void 0 !== i.ind ? i.ind : i;
                        if (res) {
                            try {
                                obj = eval("(" + res + ")")
                            } catch (e) {
                                obj = q2ajx(res)
                            }
                            if (obj.code || obj.error) return void Upload.onUploadError(i, obj);
                            var video_id = obj.video_id,
                                video_hash = obj.video_hash,
                                item = ge("video_upload_item_" + ind),
                                callback = function() {
                                    var e = ge("video_upload_item_" + ind);
                                    domData(e, "video_id", video_id), domData(e, "uploaded", 1), VideoUpload.setUploadStatus(getLang("video_upload_link_text"), e);
                                    var o = geByClass1("video_upload_link", e, "a");
                                    if (o) {
                                        o.innerHTML = rs(o.innerHTML, {
                                            video_id: video_id
                                        }), o.href = "//" + rs(o.getAttribute("data-href-tpl"), {
                                            video_id: video_id
                                        }), show(o);
                                        var a = geByClass1("video_upload_ready_name", e);
                                        if (a) {
                                            var d = ce("a", {
                                                innerHTML: a.innerHTML,
                                                className: a.className,
                                                href: o.href
                                            });
                                            domPN(a).insertBefore(d, a), re(a)
                                        }
                                    }
                                    VideoUpload.setStatusHeader(getLang("video_upload_encode_waiting"), e), VideoUpload.setProgressValue(100, getLang("video_upload_waiting"), e), VideoUpload.runVideoProgressUpdate(e, vars.oid, video_id, video_hash, 1, -1, 0)
                                };
                            item ? callback() : VideoUpload.videoUploadCallback = callback
                        }
                    },
                    onUploadProgress: function(e, o, a) {
                        var d = void 0 !== e.ind ? e.ind : e,
                            i = intval(o / a * 100),
                            t = o / a * 100,
                            r = ge("video_upload_item_" + d);
                        if (r) {
                            data(r, "progress") > i && data(r, "max_size_error", !0), data(r, "progress", i);
                            var l = getLang("video_upload_uploaded_percent").replace("{percent}", i);
                            VideoUpload.setProgressValue(t, l, r)
                        }
                    },
                    onUploadError: function(i, err) {
                        var debug;
                        if (err && (err.code || err.error)) {
                            try {
                                debug = eval("(" + err.debug + ")")
                            } catch (e) {
                                debug = q2ajx(debug)
                            }
                            err = err.code ? err.code : err.error
                        } else debug = !1;
                        var logErrorData = {
                            oid: vars.oid,
                            mid: vars.mid,
                            tag: vars.tag,
                            srv: uploadOpts.server,
                            extra: err
                        };
                        VideoUpload._logUploadStatus("fail", logErrorData), cur.videoLastError = !0;
                        var ind = void 0 !== i.ind ? i.ind : i,
                            item = ge("video_upload_item_" + ind),
                            callback = function() {
                                var e = ge("video_upload_item_" + ind);
                                if (e) {
                                    var o; - 3 == err ? o = getLang("video_upload_error_file") : -4 == err ? o = getLang("video_upload_error_audio").replace("{link}", '<a href="/audio">').replace("{/link}", "</a>") : -5 == err ? (o = getLang("video_claimed_not_uploaded"), debug && debug.claim_id && (o += " [" + debug.claim_id + "]")) : o = data(e, "max_size_error") ? getLang("video_upload_big_file_error") : getLang("video_upload_error_common"), VideoUpload.showError(e, o)
                                }
                            };
                        item ? callback() : VideoUpload.videoUploadCallback = callback, debugLog(err)
                    },
                    onConnectionLost: function(e) {
                        var o = void 0 !== e.ind ? e.ind : e,
                            a = ge("video_upload_item_" + o);
                        data(a, "upload_index", o);
                        var d = getLang("video_upload_connection_lost"),
                            i = !0;
                        VideoUpload.showError(a, d, i)
                    },
                    onDragEnter: function() {
                        hide("video_upload_box_wrapper")
                    },
                    onDragOut: function() {
                        show("video_upload_box_wrapper")
                    },
                    onDrop: function() {
                        show("video_upload_box_wrapper")
                    },
                    clear: 1,
                    type: "video",
                    max_attempts: 3,
                    server: uploadOpts.server,
                    error: uploadOpts.default_error,
                    error_hash: uploadOpts.error_hash,
                    dropbox: "video_dropbox",
                    custom_hash: uploadOpts.custom_hash,
                    check_hash: uploadOpts.check_hash,
                    check_rhash: uploadOpts.check_rhash,
                    check_url: uploadOpts.check_url,
                    accept: browser.safari ? "" : "video/*," + VideoUpload.UPLOAD_ACCEPT
                }))
            },
            errorEl, current, lang, text, intervalId;
        initButton()
    },
    _logUploadStatus: function(e, o) {
        try {
            o.act = "upload_stats", o.stage = e, ajax.post("al_video.php", o)
        } catch (a) {}
    },
    removeUploadedThumb: function(e, o) {
        cancelEvent(o);
        var a = domPN(e);
        setStyle(a, {
            backgroundImage: ""
        }), hide(a);
        var d = gpeByClass("video_tc_uploader", e),
            i = d.getAttribute("data-thumb-id"),
            t = gpeByClass("video_upload_item_panel", e),
            r = VideoUpload.getPlaceholderEl(e),
            l = r ? r.getAttribute("data-thumb-id") : 0,
            s = "";
        if (d.setAttribute("data-thumb-id", ""), d.setAttribute("data-thumb-url", ""), !r || l == i) {
            var n = geByClass("video_tc_item", t);
            if (n.length > 1) return VideoUpload.selectThumb(n[1 + (n.length - 2) / 2]), !1;
            l = "", s = r && r.getAttribute("data-main-thumb"), r && (r.setAttribute("data-thumb-id", l), setStyle(r, {
                backgroundImage: s ? "url(" + s + ")" : ""
            }))
        }
        return !1
    },
    initThumbUpload: function(e, o) {
        if (e && isObject(e)) {
            var a = {
                    file_name: "photo",
                    file_size_limit: 1024 * (e.file_size_limit_in_MB || 50) * 1024,
                    file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                    file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                    onUploadStart: function(e, o) {
                        show(i), setStyle(t, "width", "0%")
                    },
                    onUploadComplete: function(e, o) {
                        if (hide(i), setStyle(t, "width", "0%"), !o) return void topError("Thumb load error");
                        o = parseJSON(o);
                        var a = geByClass1("video_tc_upload_image", d);
                        show(a), setStyle(a, {
                            backgroundImage: "url(" + o.thumb.l + ")"
                        }), d.setAttribute("data-thumb-url", o.thumb.l), d.setAttribute("data-thumb-id", o.photo_id + "_" + o.photo_owner_id), d.setAttribute("data-thumb-hash", o.photo_hash), VideoUpload.selectThumb(d)
                    },
                    onUploadProgress: function(e, o, a) {
                        var d = intval(o / a * 100);
                        d = Math.min(d, 100), setStyle(t, "width", d + "%")
                    },
                    onUploadError: function(e, o) {
                        hide(i), setStyle(t, "width", "0%"), topError("Thumb load error")
                    },
                    clear: 1,
                    type: "photo",
                    max_attempts: 3,
                    server: e.server,
                    error: e.default_error,
                    error_hash: e.error_hash,
                    noCheck: !0,
                    chooseBox: !0,
                    label: e.specialLabel || cur.videoUploadThumbBtnTpl,
                    uploadButton: !0,
                    buttonClass: "video_tc_upload_btn",
                    accept: ".jpg,.jpeg,.png",
                    filesize_hide_last: !0,
                    lang: {
                        filesize_error: getLang("video_upload_thumb_size_error")
                    }
                },
                d = geByClass1("video_tc_uploader", o);
            Upload.init(d, e.url, e.vars, a);
            var i = geByClass1("video_tc_upload_progress_wrap", o),
                t = geByClass1("video_tc_upload_progress_bar", o)
        }
    },
    selectThumb: function(e, o) {
        var a = e.getAttribute("data-thumb-url"),
            d = e.getAttribute("data-thumb-id"),
            i = e.getAttribute("data-thumb-hash");
        if (d) {
            var t = domPN(e);
            each(geByClass("video_tc_item", t), function() {
                toggleClass(this, "video_tc_item_selected", this == e)
            });
            var r = VideoUpload.getPlaceholderEl(e);
            r && (r.setAttribute("data-thumb-id", d), r.setAttribute("data-thumb-hash", i || ""), setStyle(r, {
                backgroundImage: "url(" + a + ")"
            }))
        }
    },
    getPlaceholderEl: function(e) {
        var o = hasClass(e, "video_upload_item_panel") ? e : gpeByClass("video_upload_item_panel", e);
        return geByClass1("video_upload_thumb_placeholder", o)
    },
    initTC: function(e, o, a) {
        var d = geByClass1("video_upload_tc_info", a);
        if (o) return void(d.innerHTML = o);
        re(d), e = se(e);
        var i = geByClass1("video_upload_tc_wrap", a);
        i.appendChild(e);
        var t = geByClass1("video_tc_uploader", a);
        if (t) {
            var r = geByClass1("video_tc_slider_cont", a);
            r.insertBefore(t, r.children[0])
        }
        var l = VideoUpload.getPlaceholderEl(e),
            s = geByClass("video_tc_item", e);
        if (l && !l.getAttribute("data-thumb-id") && s.length > 1) {
            var n = geByClass1("video_tc_uploader", e) ? 1 : 0;
            VideoUpload.selectThumb(s[n + (s.length - 1 - n) / 2])
        }
    },
    runVideoProgressUpdate: function(e, o, a, d, i, t, r, l) {
        ajax.post("al_video.php", {
            act: "encode_progress",
            oid: o,
            vid: a,
            hash: d,
            need_thumb: i,
            need_tc: t
        }, {
            onDone: function(s) {
                if (domPN(e) && isVisible("video_upload_tab")) {
                    var n = !0,
                        _ = -1;
                    if (s) {
                        if (s.error) return void VideoUpload.showError(e, getLang("video_upload_encode_error"));
                        if (i && s.thumb) {
                            var u = VideoUpload.getPlaceholderEl(e);
                            u.setAttribute("data-main-thumb", s.thumb), u.getAttribute("data-thumb-id") || setStyle(u, {
                                backgroundImage: "url('" + s.thumb + "')"
                            }), i = ""
                        }
                        t && (s.tc || s.tc_msg) && (VideoUpload.initTC(s.tc, s.tc_msg, e), t = 0);
                        var p = s.duration;
                        if (_ = s.percents, "undefined" != typeof p) {
                            if (_ >= 100) {
                                if (100 > r) {
                                    if (s.published) VideoUpload.setPublished(e);
                                    else {
                                        var v = geByClass1("video_upload_progress ", e),
                                            c = geByClass1("video_upload_ready_message", e);
                                        setStyle(v, "opacity", 0), setStyle(c, "opacity", 1), VideoUpload.setStatusHeader(getLang("video_upload_completed_title"), e)
                                    }
                                    if (i || t) {
                                        var g = i ? 2 : 0;
                                        g += t ? 1 : 0, VideoUpload._logUploadStatus("no_thumb", {
                                            status: g,
                                            vid: o + "_" + a
                                        })
                                    }
                                }
                            } else {
                                VideoUpload.setStatusHeader(getLang("video_upload_encoding"), e);
                                var h = intval(_),
                                    m = getLang("video_upload_encode_percent").replace("{percent}", h);
                                VideoUpload.setProgressValue(_, m, e, !0)
                            }
                            _ >= 100 && !i && !t && (n = !1)
                        } else _ = -1
                    }
                    n && setTimeout(VideoUpload.runVideoProgressUpdate.pbind(e, o, a, d, i, t, _, l), 1e3)
                }
            },
            onFail: function() {
                l || (l = 1), setTimeout(VideoUpload.runVideoProgressUpdate.pbind(e, o, a, d, i, t, r, l + 1), 2e3 * l)
            }
        })
    },
    showError: function(e, o, a) {
        var d = geByClass1("upload_video_error_panel", e),
            i = geByClass1("upload_video_info_panel", e),
            t = geByClass1("upload_video_error_label", e),
            r = geByClass1("upload_video_try_again_button", e),
            l = geByClass1("upload_video_resume_button", e);
        t && val(t, o), toggle(r, !a), toggle(l, !!a), hide(i), show(d), disableButton(geByClass1("video_upload_ready_button", e), !0), disableButton(geByClass1("video_upload_back_edit", e), !0), domData(e, "error", 1)
    },
    setPublished: function(e) {
        domData(e, "published", 1), VideoUpload.setStatusHeader(getLang("video_upload_published_title"), e), VideoUpload.setUploadStatus(getLang("video_upload_ready_link_text"), e);
        var o = geByClass1("video_upload_progress_wrap", e);
        isVisible(o) && slideUp(o, {
            duration: 150,
            transition: Fx.Transitions.swiftOut
        });
        var a = geByClass1("video_upload_ready_message", e);
        isVisible(a) && slideUp(a, {
            duration: 150,
            transition: Fx.Transitions.swiftOut
        });
        var d = geByClass1("video_upload_status_export", e);
        disable(d);
        var i = geByClass1("video_upload_publish_later", e);
        disable(i)
    },
    setProgressValue: function(e, o, a, d) {
        if (a) {
            var i = geByClass1("video_upload_progress_bar", a),
                t = geByClass1("video_upload_progress_text", a);
            toggleClass(geByClass1("video_upload_progress", a), "video_upload_progress_processing", !!d), setStyle(i, {
                width: e + "%"
            }), val(t, o)
        }
    },
    saveParams: function(e) {
        disableButton(e, !0);
        var o = VideoUpload.getUploadItem(e),
            a = o.id.substr("video_upload_item_".length),
            d = Upload.vars[a],
            i = VideoUpload.getParams(o);
        i.vid = domData(o, "video_id"), i.oid = d.oid, i.tag = d.tag, i.hash = cur.videoHashs[d.tag], cur.ocl && (i.ocl = cur.ocl), ajax.post("al_video.php?act=save_video_params", i, {
            onDone: function(a, d, t) {
                disableButton(e, !1), domData(o, "saved", 1), "published" == a && VideoUpload.setPublished(o);
                var r = geByClass1("js_video_upload_inputs", o),
                    l = geByClass1("js_video_upload_ready", o),
                    s = geByClass1("video_upload_ready_name", l);
                val(s, d || getLang("video_upload_no_name"));
                var n = geByClass1("video_upload_ready_description", l);
                val(n, t || "");
                var _ = geByClass1("video_upload_item_name", o);
                val(_, (i.title || getLang("video_upload_no_name")).substr(0, cur.videoTitleLength));
                var u = geByClass1("video_upload_description", o);
                val(u, (i.desc || "").substr(0, cur.videoDescriptionLength)), slideUp(r, {
                    duration: 150,
                    transition: Fx.Transitions.swiftOut
                }), slideDown(l, {
                    duration: 150,
                    transition: Fx.Transitions.swiftOut
                })
            }
        })
    },
    deleteParams: function(e) {
        var o = VideoUpload.getUploadItem(e),
            a = function() {
                var e = geByClass1("js_video_upload_inputs", o),
                    a = geByClass1("js_video_upload_ready", o);
                slideUp(a, {
                    duration: 150,
                    transition: Fx.Transitions.swiftOut
                }), slideDown(e, {
                    duration: 150,
                    transition: Fx.Transitions.swiftOut
                }), domData(o, "saved", null)
            };
        if (domData(o, "published")) a();
        else {
            disableButton(e, !0);
            var d = o.id.substr("video_upload_item_".length),
                i = Upload.vars[d],
                t = VideoUpload.getParams(o);
            t.vid = domData(o, "video_id"), t.oid = i.oid, t.tag = i.tag, ajax.post("al_video.php?act=delete_video_params", t, {
                onDone: function(o) {
                    disableButton(e, !1), a()
                },
                onError: function() {
                    disableButton(e, !1)
                }
            })
        }
    },
    getParams: function(e) {
        var o = e.id.substr("video_upload_item_".length),
            a = Upload.vars[o],
            d = a.tag,
            i = geByClass1("video_upload_status_export", e),
            t = geByClass1("video_upload_publish_later", e),
            r = geByClass1("video_upload_no_comments", e),
            l = geByClass1("video_upload_monetized", e),
            s = geByClass1("video_upload_item_name", e),
            n = geByClass1("video_upload_description", e),
            _ = geByClass1("video_edit_repeat", e),
            u = 0;
        VideoUpload._uploadAlbumChooser[o] && (u = VideoUpload._uploadAlbumChooser[o].selectedItems()[0]);
        var p = VideoUpload.getPlaceholderEl(e),
            v = p.getAttribute("data-thumb-id"),
            c = p.getAttribute("data-thumb-hash"),
            g = {
                status_export: isChecked(i),
                publish_later: isChecked(t),
                no_comments: isChecked(r),
                monetized: isChecked(l),
                title: val(s),
                desc: val(n),
                repeat: isChecked(_),
                album_id: u ? u[0] : "",
                thumb_id: v,
                thumb_hash: c
            };
        return a.oid > 0 ? (g.privacy_video = Privacy.getValue("video" + d), g.privacy_videocomm = Privacy.getValue("videocomm" + d)) : g.privacy_video = isChecked("video_upload_group_privacy"), g
    },
    setStatusHeader: function(e, o) {
        if (o) {
            var a = geByClass1("video_upload_item_header", o);
            val(a, e)
        }
    },
    setUploadStatus: function(e, o) {
        var a = geByClass1("video_upload_link_header", o);
        val(a, e)
    },
    showReupload: function(e) {
        var o = VideoUpload.getUploadItem(e),
            a = VideoUpload.getParams(o);
        a.reupload = 1, VideoUpload.showBox(a), cur.videoReupload = o
    },
    resumeUpload: function(e) {
        var o = VideoUpload.getUploadItem(e);
        hide(geByClass1("upload_video_error_panel", o)), show(geByClass1("upload_video_info_panel", o)), disableButton(geByClass1("video_upload_ready_button", o), !1), disableButton(geByClass1("video_upload_back_edit", o), !1), domData(o, "error", null);
        var a = data(o, "upload_index");
        Upload.resumeUpload(a)
    },
    getUploadItem: function(e) {
        return gpeByClass("video_upload_item_panel", e)
    },
    noPublish: function(e) {
        var o = VideoUpload.getUploadItem(e),
            a = geByClass1("video_upload_status_export", o);
        isChecked(e) ? (checkbox(a, 0), disable(a, 1)) : disable(a, 0)
    },
    stopUpload: function(e) {
        var o = showFastBox({
            width: 430,
            title: getLang("video_upload_stop_title"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("video_upload_stop_text"), getLang("video_upload_stop_button"), function() {
            o.hide(), Upload.terminateUpload(e);
            var a = ge("video_upload_item_" + e),
                d = domData(a, "video_id");
            if (d) {
                var i = Upload.vars[e];
                ajax.post("al_video.php", {
                    act: "delete_video",
                    vid: d,
                    oid: i.oid,
                    sure: 1
                })
            }
            VideoUpload.deleteItem(ge("video_upload_item_" + e), !0)
        })
    },
    deleteItem: function(e, o) {
        var a = domPS(e),
            d = domNS(e);
        !a || !hasClass(a, "video_upload_item_panel") || d && hasClass(d, "video_upload_item_panel") || removeClass(a, "video_upload_with_divider"), o ? slideUp(e, {
            duration: 150,
            transition: Fx.Transitions.swiftOut,
            onComplete: function() {
                re(e)
            }
        }) : re(e), a && hasClass(a, "video_upload_item_panel") || d && hasClass(d, "video_upload_item_panel") || (o ? slideDown("video_upload_no_video", {
            duration: 150,
            transition: Fx.Transitions.swiftOut
        }) : show("video_upload_no_video")), cleanElems(e)
    },
    initBeforeUnload: function() {
        cur.nav.push(function(e, o, a, d) {
            return VideoUpload.checkChanges(1) === !1 ? (cur.onContinueCb = nav.go.pbind(a), !1) : void 0
        }), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = VideoUpload.checkChanges, cur.destroy.push(function() {
            window.onbeforeunload = cur.prevBefUnload, VideoUpload.destroyTab()
        })
    },
    checkChanges: function(e) {
        if (!cur.leaving) {
            var o = ge("video_upload_tab");
            if (!o) return !1;
            for (var a = "", d = "", i = geByClass("video_upload_item_panel", o), t = i.length, r = 0, l = 0, s = 0; s < i.length; s++) {
                var n = i[s];
                domData(n, "error") ? t-- : (domData(n, "uploaded") && r++, domData(n, "saved") && l++)
            }
            if (r !== t) a = getLang("video_upload_changed");
            else if (l !== t) {
                var _ = t - l;
                d = getLang("video_upload_leaving_without_saving", _)
            }
            if (1 === e) {
                if (!a && !d) return !0;
                if (a) var u = showFastBox({
                    title: getLang("global_warning"),
                    dark: !0
                }, a, getLang("global_continue"), function() {
                    cur.leaving = !0, u.hide(), cur.onContinueCb && cur.onContinueCb()
                }, getLang("global_cancel"), function() {
                    u.hide(), nav.objLoc.section = "upload", nav.setLoc(nav.objLoc)
                });
                else if (d) var u = showFastBox({
                    title: getLang("global_warning"),
                    dark: !0
                }, d, getLang("global_save"), function() {
                    u.hide(), nav.objLoc.section = "upload", nav.setLoc(nav.objLoc);
                    for (var e = geByClass("video_upload_ready_button"), o = 0; o < e.length; o++) {
                        var a = e[o];
                        VideoUpload.saveParams(a)
                    }
                }, getLang("video_upload_publish_later"), function() {
                    cur.leaving = !0, u.hide(), cur.onContinueCb && cur.onContinueCb()
                });
                return !1
            }
            var p = a || d;
            return p ? winToUtf(p.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "\n")) : void 0
        }
    },
    toUploadVideo: function() {
        var e = cur.uploadVideoBox;
        VideoUpload.checkResize(), VideoUpload.onShowUploadPanel(), show("video_upload_box_tab"), hide("video_add_from_youtube_tab"), e.removeButtons(), e.setOptions({
            hideButtons: 1,
            title: getLang("video_header_new")
        }), e.addButton(getLang("global_cancel"), e.hide, "no")
    },
    toExternalAdd: function() {
        var e = cur.uploadVideoBox;
        e.setOptions({
            title: '<div class="back" onclick="VideoUpload.toUploadVideo();">' + getLang("video_upload_back") + "</div>",
            bodyStyle: "padding: 0px 25px 10px"
        }), VideoUpload.onHideUploadPanel(), hide("video_upload_box_tab"), show("video_add_from_youtube_tab"), e.removeButtons(), isVisible("video_extra_settings") || isVisible("video_share_not_allowed") || isVisible("video_share_error") ? (e.setOptions({
            hideButtons: 0
        }), e.addButton(getLang("global_save"), cur.saveExternalVideo)) : e.setOptions({
            hideButtons: 1
        }), e.addButton(getLang("global_cancel"), e.hide, "no"), ge("video_external_link").focus()
    },
    toGroupVideoSelect: function(e) {
        var o = curBox();
        showBox("al_video.php", {
            act: "a_choose_video_box"
        }, {
            dark: 1,
            onDone: function(e) {
                var o = '<div class="back" onclick="curBox().hide();">' + getLang("video_upload_back") + "</div>";
                e.setOptions({
                    title: o,
                    defaultTitle: o
                })
            }
        }), cur.chooseVideoAdd = function(a, d) {
            for (var i = new callHub(function() {
                    "video" != cur.module ? nav.go("/videos-" + e, !1, {
                        onDone: function() {
                            cur.__phinputs = cur.__phinputs || [], globalHistoryDestroy(nav.objLoc[0])
                        }
                    }) : (nav.reload(), boxQueue.hideAll(), o.destroy())
                }, a.length), t = 0, r = a.length; r > t; t++) {
                videoId = a[t];
                var l = ge("video_item_" + videoId),
                    d = attr(l, "data-add-hash");
                videoId = videoId.split("_");
                var s = window.Video && Video.isInAlbum() ? Video._getSectionAlbumId() : -2;
                ajax.post("al_video.php", {
                    act: "a_add_to_playlist",
                    oid: videoId[0],
                    vid: videoId[1],
                    hash: d,
                    gid: e,
                    add: 1,
                    playlist_id: s,
                    list_owner_id: cur.getOwnerId()
                }, {
                    onDone: function() {
                        i.done()
                    },
                    onFail: function() {
                        i.done()
                    }
                })
            }
            return !1
        }
    },
    lockSaveButton: function() {
        lockButton(curBox().btns.ok[0])
    },
    unlockSaveButton: function() {
        unlockButton(curBox().btns.ok[0])
    },
    initShare: function(e, o) {
        function a(e) {
            t && clearTimeout(t), e.keyCode == KEY.ENTER ? s() : t = setTimeout(s, 1e3)
        }
        var d = cur.uploadVideoBox,
            i = ge("video_external_link");
        placeholderSetup(i, {
            back: !0
        });
        var t, r, l, s = function() {
            var e = trim(i.value);
            e && r != e && (d.showProgress(), r = e, ge("video_share_form").submit())
        };
        window.onParseDone = function(e) {
            if (hide("video_share_server_error"), hide("video_share_error"), e.images_proxy) {
                var o = ge("video_share_form").action.replace(/\/[^\/]*$/, "") + "/upload.php?act=proxy_img&";
                each(e.images_proxy, function(a, d) {
                    e.images_proxy[a] = o + d
                })
            } else e.images_proxy = e.images;
            if (e.extra > 0 && e.extraData && e.images[0]) {
                if (hide("video_share_descr"), hide("video_share_error"), hide("video_share_not_allowed"), hide("video_share_error"), d.hideProgress(), ge("video_share_photo_url").value = e.url, ge("video_share_photo_image").value = e.images[0], ge("video_share_photo_extra").value = e.extra, cur.changeExternalImage = function(o) {
                        cur.externalVideoImage++;
                        var a = e.images[cur.externalVideoImage];
                        a ? o.src = e.images_proxy[cur.externalVideoImage] : (cur.externalVideoImage = 0, o.src = e.images_proxy[0])
                    }, e.images[0]) {
                    cur.externalVideoImage = 0;
                    var a = ge("video_external_image");
                    if (setStyle(a, {
                            backgroundImage: "url('" + e.images_proxy[0] + "')"
                        }), a.setAttribute("onclick", "cur.changeExternalImage(this)"), e.images.length > 1) {
                        var i = vkImage();
                        i.src = e.images_proxy[0], i.onload = function() {
                            i.width < 130 && cur.changeExternalImage(ge("video_external_img"))
                        }
                    }! function() {
                        var o = vkImage();
                        o.onerror = function() {
                            var o = !1;
                            each(e.images_proxy, function(e, d) {
                                if (0 != e) {
                                    var i = vkImage();
                                    i.onload = function() {
                                        o || (o = !0, ge("video_share_photo_image").value = d, cur.externalVideoImage = e, setStyle(a, {
                                            backgroundImage: "url('" + d + "')"
                                        }))
                                    }, i.src = d
                                }
                            })
                        }, o.src = e.images_proxy[0]
                    }()
                }
                ge("video_external_title").value = replaceEntities(e.title), ge("video_external_description").value = replaceEntities(e.description), cur.videoPlaylists.length ? cur._addExternalAlbumDD = new Dropdown(geByClass1("video_external_upload_album_chooser_input", curBox().bodyNode), [
                    [0, getLang("video_upload_choose_album_placeholder")]
                ].concat(cur.videoPlaylists), {
                    autocomplete: !0,
                    width: 270,
                    selectedItems: [0],
                    big: !0
                }) : re(geByClass1("video_upload_album_chooser_wrap")), show("video_extra_settings"), l = e, d.removeButtons(), d.addButton(getLang("global_cancel"), d.hide, "no"), cur.saveExternalVideo = function() {
                    e && e.images && (VideoUpload.lockSaveButton(), cur.shareExternalImageSave = e.images[cur.externalVideoImage], ge("video_share_photo_image").value = cur.shareExternalImageSave, ge("video_share_photo_form").submit())
                }, d.setOptions({
                    hideButtons: 0
                }), d.addButton(getLang("global_save"), cur.saveExternalVideo)
            } else -1 == e.extra ? (show("video_share_not_allowed"), VideoUpload.unlockSaveButton()) : (show("video_share_error"), notaBene("video_external_link"), VideoUpload.unlockSaveButton())
        }, window.onParseFail = function() {
            hide("video_share_server_error"), VideoUpload.unlockSaveButton(), show("video_share_error"), notaBene("video_external_link")
        }, window.onUploadDone = function(a, i) {
            if (i.photo_id && i.user_id && l) {
                var t = l.title;
                l.title = ge("video_external_title").value;
                var r = ge("video_external_description").value,
                    s = 0;
                if (cur.vSection) {
                    var n = cur.vSection.split("_");
                    "album" == n[0] && (s = n[1])
                }
                var _ = extend(l, {
                    oid: e,
                    folder_id: s,
                    act: "save_external",
                    hash: o,
                    share_title: t || ge("video_external_title").value,
                    share_text: r,
                    image_url: cur.shareExternalImageSave,
                    photo_owner_id: i.user_id,
                    photo_id: i.photo_id,
                    extra: l.extra,
                    extra_data: l.extraData,
                    to_video: 1,
                    album_id: cur._addExternalAlbumDD ? cur._addExternalAlbumDD.selectedItems()[0][0] : ""
                });
                _.openGraph && delete _.openGraph, delete l.extraData, _.oid > 0 ? (_.privacy_video = Privacy.getValue("video_external"), _.privacy_videocomm = Privacy.getValue("videocomm_external")) : _.gid = -_.oid, isChecked("video_external_status_export") && (_.to_status = 1), isChecked("video_external_no_comments") && (_.no_comments = 1), delete _.images, delete _.images_proxy, setTimeout(function() {
                    ajax.post("/al_video.php", _, {
                        onDone: function(e) {
                            hide("share_error"), e.owner_id && e.video_id ? (d.hide(), nav.reload()) : show("share_server_error")
                        },
                        onFail: function(e) {
                            return VideoUpload.unlockSaveButton(), hide("video_share_error"), ge("video_share_server_error").innerHTML = e, show("video_share_server_error"), !0
                        }
                    })
                }, 0)
            } else d.showProgress(), show("video_share_error")
        }, window.onUploadFail = function() {
            d.hideProgress(), hide("video_share_error"), show("video_share_server_error")
        }, addEvent(i, "paste blur", s), addEvent(i, "keydown input", a), cur.destroy.push(function() {
            removeEvent(i, "paste blur", s), removeEvent(i, "keydown input", a)
        })
    },
    createLiveStream: function() {
        showBox("al_video.php", {
            act: "a_add_new_live_trans_form",
            owner_id: cur.oid
        }, {
            stat: ["video_edit.css", "privacy.css", "privacy.js", "upload.js"],
            onDone: function(e) {
                if (e.removeButtons(), e.addButton(getLang("video_save_but"), VideoUpload.saveLiveStream), e.addButton(getLang("video_cancel_but"), e.hide, "no"), ls.get("video_live_create_form_shown")) {
                    var o = domByClass(e.bodyNode, "video_upload_live_launch_steps_wrap");
                    hide(o);
                    var a = domByClass(e.bodyNode, "video_upload_live_launch_subheader");
                    removeClass(a, "_open")
                } else ls.set("video_live_create_form_shown", 1)
            },
            onFail: function(e) {
                return e ? (curBox().hide(), showFastBox(getLang("global_error"), e), !0) : void 0
            }
        })
    },
    initLiveStreamCategoryDropdown: function(e, o) {
        var a = ge("video_upload_live_category"),
            d = ge("video_upload_live_game_category"),
            i = domPN(a).offsetWidth;
        toggle("video_upload_live_game_category_wrap", 3 == val(a));
        var t = new Dropdown(a, e, {
                multiselect: !1,
                zeroPlaceholder: !0,
                big: !0,
                width: i,
                onChange: function(e) {
                    toggle("video_upload_live_game_category_wrap", 3 == e)
                }
            }),
            r = new Dropdown(d, o, {
                multiselect: !1,
                zeroPlaceholder: !0,
                big: !0,
                width: i,
                onChange: function() {}
            });
        cur.destroy.push(function() {
            t.destroy(), r.destroy()
        })
    },
    getLiveStreamCategoryVal: function() {
        var e = ge("video_upload_live_category"),
            o = ge("video_upload_live_game_category");
        if (!e) return 0;
        var a = +val(e);
        if (3 == a) {
            var d = +val(o);
            a = d > 0 ? d : a
        }
        return a
    },
    toggleLiveLaunchSteps: function(e) {
        toggleClass(e, "_open");
        var o = domByClass(curBox().bodyNode, "video_upload_live_launch_steps_wrap");
        slideToggle(o, 200)
    },
    updateLiveTransSettings: function(e, o, a, d) {
        ajax.post("al_video.php", {
            act: "generate_live_trans_keys",
            rhash: d,
            hash: a,
            owner_id: cur.oid,
            need_new: e ? 1 : 0
        }, {
            onDone: function(e) {
                val("video_live_trans_settings_url", e.url), val("video_live_trans_settings_key", e.key), o && o()
            }
        })
    },
    updatedLiveKeyMsg: function() {
        showFastBox(getLang("video_live_trans_key_updated"), getLang("video_live_trans_key_updated_msg"))
    },
    saveLiveStream: function() {
        var e = curBox(),
            o = geByClass1("video_tc_item_selected", e.bodyNode),
            a = null;
        o && (a = o.getAttribute("data-thumb-id"));
        var d = trim(val("video_new_live_trans_title")),
            i = trim(val("video_new_live_trans_description")),
            t = VideoUpload.getLiveStreamCategoryVal(),
            r = {
                owner_id: cur.oid,
                thumb_id: a,
                title: d,
                description: i,
                category: t,
                publish: isChecked("video_create_live_publish_on_wall"),
                preparation_check: isChecked("video_create_live_preparation_check"),
                notify_followers: isChecked("video_create_live_notify_followers"),
                enable_donations: isChecked("video_create_enable_donations"),
                rhash: cur.liveTransHash
            };
        return cur.oid < 0 ? r.no_comments = isChecked("video_create_live_no_comments") : (r.privacy_view = Privacy.getValue("video_live_view"), r.privacy_comment = Privacy.getValue("video_live_comment")), !r.title || r.title.length > cur.videoTitleLength ? notaBene("video_new_live_trans_title") : r.description.length > cur.videoDescriptionLength ? notaBene("video_new_live_trans_description") : r.category ? (VideoUpload.lockSaveButton(), void ajax.post("al_video.php?act=a_add_new_live_trans", r, {
            onFail: function(e) {
                return VideoUpload.unlockSaveButton(), showFastBox(getLang("video_create_live_error"), e || getLang("video_create_live_error_try_later")), !0
            }
        })) : notaBene(domClosest("dropdown_container", "video_upload_live_category"))
    }
};
try {
    stManager.done("video_upload.js")
} catch (e) {}