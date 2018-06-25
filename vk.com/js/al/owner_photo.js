var OwnerPhoto = {
    canRotate: function() {
        var o = browser,
            e = intval(o.version);
        return o.msie && !o.mobile && e > 8 || o.opera && !o.mobile && e > 10 || o.mozilla && !o.mobile && e > 3 || o.chrome && e > 17 || o.safari && e > 3 || o.android && !o.mozilla && e > 2
    },
    init: function(o, e, r) {
        cur.ownerPhotoOptions = r || {}, cur.pvShown && (hide(layerWrap), cur._inLayer = !0), o.setOptions({
            grey: !0,
            hideButtons: !0,
            width: 654,
            bodyStyle: "padding: 0; position: relative;",
            onHide: function() {
                delete cur.ownerPhotoOptions, cur.pvShown && (show(layerWrap), cur._inLayer = !1)
            },
            onShow: function() {
                cur.pvShown && (hide(layerWrap), cur._inLayer = !0)
            },
            onClean: function() {
                cur.ownerPhotoEditTagger && (cur.ownerPhotoEditTagger.destroy(), cur.ownerPhotoEditTagger = !1), cur.ownerPhotoCropTagger && (cur.ownerPhotoCropTagger.destroy(), cur.ownerPhotoCropTagger = !1), cur.ownerPhotoUploadId && (Upload.deinit(cur.ownerPhotoUploadId), cur.ownerPhotoUploadId = !1), clearTimeout(cur.ownerPhotoCropTimer)
            }
        }), cur.ownerPhotoBoxRefresh = o.setOptions.pbind({}), cur.ownerPhotoTitles = e, cur.ownerPhotoBox = o, stManager.add(["tagger.css", "tagger.js"])
    },
    showError: function(o, e, r) {
        e.match(/^ERR_[A-Z0-9_]+(\:|$)/) || (e = 'ERR_CLIENT_BAD_ERROR: error "' + clean(e.toString()) + '"');
        var t, i = e.match(/^(ERR_[A-Z0-9_]+)(\:\s*|$)([\S\s]*)\s*$/),
            a = i[1],
            n = ge("owner_photo_error");
        switch (a) {
            case "ERR_UPLOAD_FILE_NOT_SUPPORTED":
                t = getLang("profile_oph_err_format");
                break;
            case "ERR_UPLOAD_FILE_NOT_UPLOADED":
                t = getLang("profile_oph_err_upload").replace("{link}", '<a href="/support?act=new&from=ph">').replace("{/link}", "</a>");
                break;
            case "ERR_UPLOAD_BAD_IMAGE_SIZE":
                if ("wide" == r) {
                    t = getLang("profile_custom_snippet_photo_error_size").replace("{width}", "537").replace("{height}", "240");
                    break
                }
                if ("cover" == r) {
                    t = getLang("groups_cover_photo_error_size").replace("{width}", "795").replace("{height}", "200");
                    break
                }
                t = getLang("profile_oph_err_size").replace("{min}", "200").replace("{max}", '7<span class="num_delim"> </span>000');
                break;
            case "ERR_UPLOAD_BIG_IMAGE_SIZE":
                t = getLang("groups_cover_big_error_size").replace("{size}", "14000");
                break;
            case "ERR_STORAGE_ENGINE_NOT_CONNECTED":
            case "ERR_STORAGE_ENGINE_SAVE_FAILED":
                if (!isVisible("owner_photo_upload_return")) {
                    t = getLang("profile_oph_error_server");
                    break
                }
            default:
                t = getLang("profile_oph_err_unknown").replace("{link}", '<a href="/support?act=new&from=ph">').replace("{/link}", "</a>")
        }
        t = t.replace("{sorry}", "<b>" + getLang("global_sorry_error") + "</b>") + '<br><a onclick="OwnerPhoto.detailsError(this);">' + getLang("global_error_details") + '</a><div class="unshown">Error: ' + a + (i[3] ? ". Details: " + i[3] : ".") + "</div>", val(domFC(n), t), isVisible(n) || slideDown(n, 150), 1 == o && Upload.embed(cur.ownerPhotoUploadId)
    },
    detailsError: function(o) {
        var e = isVisible(domNS(o));
        (e ? slideUp : slideDown)(domNS(o), 150), val(o, getLang(e ? "global_error_details" : "global_error_hide_details"))
    },
    showContent: function(o) {
        var e = cur.ownerPhotoBox,
            r = cur.ownerPhotoTitles;
        e && r && (each(["upload", "edit", "camera", "crop", "error"], function() {
            hide("owner_photo_" + this)
        }), show("owner_photo_" + o), e.setOptions({
            title: r[o] || r.upload || ""
        }))
    },
    cameraInit: function() {
        var o = {
            s_noCamera: getLang("profile_no_camera"),
            s_noAccess: getLang("profile_no_camera_access"),
            s_setAccess: getLang("profile_set_camera_access"),
            s_capture: getLang("profile_capture_image"),
            s_videoMode: getLang("profile_to_video_mode"),
            upload_url: (Upload.uploadUrls || [])[cur.ownerPhotoUploadId] || "",
            saveClbk: "OwnerPhoto.cameraPhotoDone",
            hideClbk: "OwnerPhoto.uploadReturn",
            overClbk: "OwnerPhoto.cameraBtnOver",
            outClbk: "OwnerPhoto.cameraBtnOut",
            downClbk: "OwnerPhoto.cameraBtnDown",
            upClbk: "OwnerPhoto.cameraBtnUp",
            showSaveClbk: "OwnerPhoto.showCameraSaveBtn",
            hideSaveClbk: "OwnerPhoto.hideCameraSaveBtn",
            hideCaptureClbk: "OwnerPhoto.hideCameraCaptureBtn",
            progressClbk: "OwnerPhoto.cameraSaveProgress",
            getBtnsPos: "OwnerPhoto.updateCameraButtonsPos",
            jpgQuality: "95"
        };
        for (var e in o) o[e] = winToUtf(o[e]);
        var r = {
                url: "/swf/CaptureImg.swf",
                id: "flash_camera",
                width: 604,
                height: 480,
                preventhide: 1,
                style: "visibility: visible",
                version: 9
            },
            t = {
                allownetworking: "true",
                wmode: "transparent"
            };
        return setStyle(ge("owner_photo_cam_ctrls"), {
            visibility: "hidden"
        }), OwnerPhoto.showContent("camera"), removeClass(ge("camera_button_no"), "hover"), renderFlash("owner_photo_webcam", r, t, o), this.hideCameraSaveBtn(!0), cur.ownerPhotoBoxRefresh(), !1
    },
    cameraPhotoDone: function(o) {
        unlockButton(ge("camera_button_yes")), cur.cameraShotLoaded = !0;
        var e = ge("owner_photo_webcam");
        e && (e.innerHTML = ""), Upload.onUploadComplete(cur.ownerPhotoUploadId, o)
    },
    updateCameraButtonsPos: function() {
        var o = ge("owner_photo_cam_ctrls"),
            e = [],
            r = getXY(o);
        getSize(o);
        setStyle(ge("owner_photo_cam_ctrls"), {
            visibility: "visible"
        });
        var t = function(o, t) {
            if (isVisible(t)) {
                var i = getXY(t),
                    a = getSize(t);
                e.push([i[0] - r[0], i[1] - r[1], a[0] + 2, a[1] + 2])
            }
        };
        each(geByTag("button", o), t), each(geByClass("button", o), t), ge("flash_camera").setButtonsPos && ge("flash_camera").setButtonsPos(e)
    },
    showCameraSaveBtn: function() {
        ge("camera_button_yes").innerHTML = getLang("profile_oph_camera_save"), ge("camera_button_no").innerHTML = getLang("profile_to_video_mode"), this.updateCameraButtonsPos()
    },
    hideCameraSaveBtn: function(o) {
        ge("camera_button_yes").innerHTML = getLang("profile_capture_image"), ge("camera_button_no").innerHTML = getLang("profile_oph_camera_back"), o || this.updateCameraButtonsPos()
    },
    hideCameraCaptureBtn: function() {
        hide("camera_button_no"), ge("camera_button_yes").innerHTML = getLang("profile_no_camera_back"), this.updateCameraButtonsPos()
    },
    cameraSaveProgress: function(o) {
        var e = ge("camera_button_yes");
        e && (o ? lockButton(e) : unlockButton(e))
    },
    cameraBtnOver: function(o) {
        var e = geByClass1(o, ge("owner_photo_cam_ctrls"));
        e && addClass(e, "hover")
    },
    cameraBtnOut: function(o) {
        var e = geByClass1(o, ge("owner_photo_cam_ctrls"));
        e && (removeClass(e, "hover"), removeClass(e, "active"))
    },
    cameraBtnDown: function(o) {
        var e = geByClass1(o, ge("owner_photo_cam_ctrls"));
        e && addClass(e, "active")
    },
    cameraBtnUp: function(o) {
        var e = geByClass1(o, ge("owner_photo_cam_ctrls"));
        e && removeClass(e, "active")
    },
    uploadInit: function(o) {
        cur.ownerPhotoUploadId = Upload.init("owner_photo_input", o.url, {}, {
            file_name: "photo",
            file_size_limit: 26214400,
            file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
            file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
            lang: o.lang,
            onUploadStart: function(o, e) {
                curBox().changed = !0
            },
            onUploadComplete: function(e, r, t) {
                var i = parseJSON(r) || {};
                if (i.error) {
                    var a = o.wide ? "wide" : o.cover ? "cover" : "photo";
                    OwnerPhoto.showError(1, i.error + (t || ""), a)
                } else if (o.is_voting ? i.color && i.photo && i.photo.sizes : i.x_src && i.x_size && i.size)
                    if (o.is_voting) ajax.post("al_voting.php", {
                        act: "save_photo",
                        hash: o.hash,
                        photo: r
                    }, {
                        onDone: function() {
                            if (vk.widget) try {
                                var e = ["proxy", "addMedia", o.lnk_id, "pollBackgroundUploaded"].concat([].slice.call(arguments));
                                Rpc.callMethod.apply(Rpc, e)
                            } catch (r) {
                                OwnerPhoto.showError(1, "")
                            } else cur.addMedia && cur.addMedia[o.lnk_id] && isFunction(cur.addMedia[o.lnk_id].pollBackgroundUploaded) && cur.addMedia[o.lnk_id].pollBackgroundUploaded.apply(null, [].slice.call(arguments));
                            curBox() && curBox().hide()
                        },
                        onFail: function(o) {
                            return OwnerPhoto.showError(1, o), !0
                        }
                    });
                    else {
                        var n = Upload.options[cur.ownerPhotoUploadId].base_url + "upload.php?act=" + (o.cover ? "owner_cover_crop" : "owner_photo_edit") + "&_query=" + encodeURIComponent(r) + "&_origin=" + encodeURIComponent(locProtocol + "//" + locHost);
                        o.is_voting && (i.x_src = "v" + i.photo.sizes[0][1] + "/" + i.photo.sizes[0][2] + "/" + i.photo.sizes[0][3] + ".jpg", i.x_size = [i.photo.sizes[0][4], i.photo.sizes[0][5]], i.size = [i.photo.sizes[0][4], i.photo.sizes[0][5]]);
                        var h = i.x_src;
                        i.x_src.startsWith("http") || (h = Upload.options[cur.ownerPhotoUploadId].static_url + h), removeClass("owner_photo_upload_return", "unshown"), OwnerPhoto.edit({
                            thumb: h,
                            thumbSize: i.x_size,
                            size: i.size,
                            uploadUrl: n,
                            square: o.square,
                            no_crop: o.no_crop,
                            wide: o.wide,
                            cover: o.cover
                        })
                    }
                else {
                    var c = r === !1 ? "[FALSE]" : null === r ? "[NULL]" : void 0 === r ? "[UNDEFINED]" : "&laquo;" + clean(r.toString().substr(0, 1024)) + "&raquo;";
                    OwnerPhoto.showError(1, "ERR_CLIENT_BAD_RESPONSE: bad upload owner photo response, recv " + c)
                }
            },
            onUploadProgress: function(o, e, r) {
                if (!ge("form" + o + "_progress")) {
                    for (var t = Upload.obj[o], i = getSize(t)[1], a = i / 2 + 10, n = t.firstChild; n;) 1 == n.nodeType && (n.id == "uploader" + o && browser.msie ? setStyle(n, {
                        position: "relative",
                        left: "-5000px"
                    }) : setStyle(n, {
                        visibility: "hidden"
                    })), n = n.nextSibling;
                    t.appendChild(ce("div", {
                        innerHTML: '<div class="upload_progress_wrap">            <div id="form' + o + '_progress" class="upload_progress" style="width: 0%;"></div>          </div></div>'
                    }, {
                        height: a + "px",
                        marginTop: -a + "px"
                    }))
                }
                var h = intval(e / r * 100);
                setStyle(ge("form" + o + "_progress"), {
                    width: h + "%"
                })
            },
            clear: 1,
            type: "photo",
            noFlash: 1,
            max_attempts: 3,
            signed: 1,
            file_input: curBox().inp,
            static_url: o.static_url,
            check_url: o.check_url,
            base_url: o.base_url,
            dropbox: "owner_dropbox"
        })
    },
    uploadReturn: function() {
        return cur.ownerPhotoEditTagger && (cur.ownerPhotoEditTagger.destroy(), cur.ownerPhotoEditTagger = !1), hide("owner_photo_error"), cur.cameraShotLoaded ? (cur.cameraShotLoaded = !1, void this.cameraInit()) : (OwnerPhoto.showContent("upload"), curBox().setOptions({
            width: 654
        }), val("owner_photo_thumb", ""), Upload.embed(cur.ownerPhotoUploadId), void cur.ownerPhotoBoxRefresh())
    },
    edit: function(o) {
        o || curBox().hide();
        var e = ge("owner_photo_thumb"),
            r = o.thumbSize,
            t = r ? "width: " + r[0] + "px; height: " + r[1] + "px;" : "";
        o.size ? cur.ownerPhotoEditTimer = -1 : (clearTimeout(cur.ownerPhotoEditTimer), cur.ownerPhotoEditTimer = setTimeout(OwnerPhoto.editInit, 100), (cur.ownerPhotoOrigin = vkImage()).src = o.url), OwnerPhoto.showContent("edit"), o.cover && curBox().setOptions({
            width: 845
        }), OwnerPhoto.canRotate() && o.rotation && addClass(e, "hidden");
        var i = o && o.size && (o.size[0] < 795 || o.size[1] < 795),
            a = domByClass(ge("owner_photo_edit"), "_owner_photo_rotate_desc");
        setStyle(e, {
            width: "",
            height: ""
        }), toggleClass(e, "no_rotate", i), toggle(a, !i), val(e, '<div id="owner_photo_rotate"><div style="' + t + 'margin: 0px auto;"><img class="owner_photo_img" id="owner_photo_img" src="' + o.thumb + '" style="' + t + '" onload="OwnerPhoto.editInit();" /></div></div>'), cur.ownerPhotoThumb = ge("owner_photo_img"), cur.ownerPhotoEditOpts = o, cur.ownerPhotoRotation = 0, cur.ownerPhotoBoxRefresh(), setTimeout(cur.ownerPhotoBoxRefresh, 0)
    },
    editInit: function() {
        if (cur.ownerPhotoEditTimer) {
            var o = cur.ownerPhotoEditOpts,
                e = o.size,
                r = o.thumbSize;
            if (!r && cur.ownerPhotoThumb.width && cur.ownerPhotoThumb.height && (r = o.thumbSize = [cur.ownerPhotoThumb.width, cur.ownerPhotoThumb.height], cur.ownerPhotoBoxRefresh()), !e && cur.ownerPhotoOrigin.width && cur.ownerPhotoOrigin.height && (e = o.size = [cur.ownerPhotoOrigin.width, cur.ownerPhotoOrigin.height]), clearTimeout(cur.ownerPhotoEditTimer), !e || !r) return cur.ownerPhotoEditTimer = setTimeout(OwnerPhoto.editInit, 100);
            cur.ownerPhotoEditTimer = !1, stManager.add(["tagger.css", "tagger.js"], OwnerPhoto.editTagger)
        }
    },
    rotate: function(o) {
        cur.ownerPhotoEditTagger.rotate(o);
        var e = intval(cur.ownerPhotoRotation),
            r = ge("owner_photo_rotate"),
            t = ge("owner_photo_thumb");
        cur.ownerPhotoRotation = o = (e + o) % 4, e && removeClass(r, "owner_photo_rotate" + e), o && addClass(r, "owner_photo_rotate" + o);
        var i = cur.ownerPhotoEditOpts.thumbSize,
            a = o % 2 * Math.floor((i[0] - i[1]) / 2);
        t.style.margin = a + 20 + "px auto", setStyle(domLC(t), extend(vk.rtl ? {
            left: a
        } : {
            right: a
        }, {
            bottom: -a
        }))
    },
    editTagger: function() {
        var o, e = cur.ownerPhotoEditOpts,
            r = e.size,
            t = e.thumbSize,
            i = cur.oid && cur.oid < 0 ? .4 : .667,
            a = e.square ? 1 : 1.5,
            n = e.square ? 1 : 1.5,
            h = e.square ? 1 : i,
            c = h,
            s = 1,
            l = [Math.max(100, Math.ceil(200 * t[0] / r[0])), Math.max(100, Math.ceil(200 * t[1] / r[1]))];
        if (e.wide ? (c = 2.2375, s = 2.2375, l = [Math.max(100, Math.ceil(537 * t[0] / r[0])), Math.max(45, Math.ceil(240 * t[1] / r[1]))]) : e.cover && (c = 3.975, s = 3.975, l = [Math.max(200, Math.ceil(795 * t[0] / r[0])), Math.max(50, Math.ceil(200 * t[1] / r[1]))]), (t[0] < l[0] || t[1] < l[1]) && nav.reload(), e.rect ? e.strict ? o = {
                left: Math.floor(e.rect[0] * t[0] / r[0]),
                top: Math.floor(e.rect[1] * t[1] / r[1]),
                width: Math.ceil(e.rect[2] * t[0] / r[0]),
                height: Math.ceil(e.rect[3] * t[1] / r[1])
            } : (o = {
                left: Math.floor(e.rect[0] * t[0] / 100),
                top: Math.floor(e.rect[1] * t[1] / 100),
                width: Math.ceil(e.rect[2] * t[0] / 100),
                height: Math.ceil(e.rect[3] * t[1] / 100)
            }, o.width < l[0] && (o.left = Math.max(0, o.left - Math.floor((l[0] - o.width) / 2)), o.width = l[0]), o.width * a > o.height && (o.width * a > t[1] ? o = t[1] / a < l[0] ? {
                left: o.left + Math.floor((o.width - l[0]) / 2),
                top: 0,
                width: l[0],
                height: t[1]
            } : {
                left: o.left + Math.floor((o.width - t[1] / a) / 2),
                top: 0,
                width: Math.floor(t[1] / a),
                height: t[1]
            } : (o.top = Math.max(0, o.top - Math.floor((o.width * a - o.height) / 4)), o.height = Math.ceil(o.width * a), o.top + o.height > t[1] && (o.top = t[1] - o.height))), o.height > o.width * n && (o.height > t[0] * n ? o = {
                left: 0,
                top: o.top + Math.floor((o.height - t[0] * n) / 2),
                width: t[0],
                height: Math.floor(t[0] * n)
            } : (o.left = Math.max(0, o.left - Math.floor((o.height / n - o.width) / 2)), o.width = Math.ceil(o.height / n), o.left + o.width > t[0] && (o.left = t[0] - o.width)))) : (e.wide ? t[1] >= t[0] / s ? (o = {
                width: t[0] - 40
            }, o.height = Math.ceil(o.width / s)) : (o = {
                height: t[1] - 40
            }, o.width = Math.ceil(o.height * s)) : e.cover ? t[1] >= t[0] / s ? (o = {
                width: t[0]
            }, o.height = Math.ceil(o.width / s)) : (o = {
                height: t[1]
            }, o.width = Math.ceil(o.height * s)) : o = {
                width: Math.max(l[0], t[0] - 40),
                height: Math.max(l[1], t[1] - 40)
            }, !e.wide && !e.cover && o.width > o.height && (o.width = o.height), o.height > o.width * n && (o.height = Math.floor(o.width * n)), o.left = Math.floor((t[0] - o.width) / 2), o.top = Math.floor((t[1] - o.height) / 2)), cur.ownerPhotoEditTagger && cur.ownerPhotoEditTagger.destroy(), cur.ownerPhotoEditTagger = photoTagger("owner_photo_img", {
                minw: l[0],
                minh: l[1],
                mina: c,
                maxa: s,
                rect: o,
                zstart: 1e3
            }), OwnerPhoto.canRotate()) {
            re("owner_photo_rotate_wrap");
            var p = ge("owner_photo_thumb");
            setStyle(p, {
                width: t[0],
                height: t[1]
            }), setStyle(domFC(p), {
                width: t[0],
                height: t[1]
            }), p.appendChild(se('<div id="owner_photo_rotate_wrap" class="owner_photo_rotate_wrap"><div class="owner_photo_rotate_left" onclick="OwnerPhoto.rotate(3)"></div><div class="owner_photo_rotate_right" onclick="OwnerPhoto.rotate(1)"></div></div>')), e.rotation && OwnerPhoto.rotate(e.rotation), removeClass(p, "hidden")
        }
    },
    editDone: function() {
        var o = cur.ownerPhotoEditTagger.result(),
            e = cur.ownerPhotoEditOpts,
            r = e.size[0] / e.thumbSize[0],
            t = e.size[1] / e.thumbSize[1],
            i = [Math.floor(o[0] * r), Math.floor(o[1] * t), Math.ceil(o[2] * r), Math.ceil(o[3] * t)],
            a = cur.ownerPhotoEditOpts.uploadUrl + "&_full=" + encodeURIComponent(i.join(",")) + "&_rot=" + intval(cur.ownerPhotoRotation);
        e.square || e.no_crop ? (lockButton("owner_photo_done_edit"), clearTimeout(cur.ownerPhotoCropTimer), cur.ownerPhotoCropTimer = setTimeout(OwnerPhoto.cropSuccess.pbind(!0, '{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on owner_photo_crop iframe request"}'), 1e4), stManager.add(["upload.js"], function() {
            var o = [0, 0, i[2]],
                e = jsonpManager.reg(OwnerPhoto.cropSuccess.pbind(!0));
            utilsNode.appendChild(ce("iframe", {
                src: a + "&_crop=" + o.join(",") + "&_jsonp=" + e + "&_origin=" + encodeURIComponent(locProtocol + "//" + locHost)
            }))
        })) : (removeClass("owner_photo_edit_return", "unshown"), OwnerPhoto.crop({
            uploadUrl: a,
            thumb: a + "&_proxy=1",
            thumbSize: [200, intval(200 * i[3] / i[2])],
            size: [i[2], i[3]]
        }))
    },
    editReturn: function() {
        cur.ownerPhotoCropTagger && (cur.ownerPhotoCropTagger.destroy(), cur.ownerPhotoCropTagger = !1), OwnerPhoto.showContent("edit"), val("owner_photo_crop_thumb", ""), cur.ownerPhotoBoxRefresh()
    },
    thumbError: function() {
        isVisible("owner_photo_edit_return") && -1 != cur.ownerPhotoCropOpts.thumb.indexOf("_proxy=1") && (OwnerPhoto.editReturn(), stManager.add(["upload.js"], function() {
            utilsNode.appendChild(ce("iframe", {
                src: cur.ownerPhotoCropOpts.thumb.replace("_proxy=1", "_proxy=2") + "&_jsonp=" + jsonpManager.reg(OwnerPhoto.thumbErrorShow) + "&_origin=" + encodeURIComponent(locProtocol + "//" + locHost)
            }))
        }))
    },
    thumbErrorShow: function(o) {
        var e = parseJSON(o) || {};
        e.error && OwnerPhoto.showError(2, e.error + Upload.getErrorAdditional(e))
    },
    crop: function(o) {
        var e = ge("owner_photo_crop_thumb"),
            r = o.thumbSize;
        cur.ownerPhotoCropOpts = o, OwnerPhoto.showContent("crop"), val(e, '<div class="owner_photo_crop_wrap clear_fix">  <div class="fl_l"><img class="owner_photo_crop_img" id="owner_photo_crop_img" src="' + o.thumb + '" style="width: ' + r[0] + "px; height: " + r[1] + 'px;" onload="stManager.add([\'tagger.css\', \'tagger.js\'], OwnerPhoto.cropInit)" onerror="OwnerPhoto.thumbError()" /></div>  <div class="fl_l"><div class="owner_photo_preview100" id="owner_photo_preview100"></div></div>  <div class="fl_l"><div class="owner_photo_preview50" id="owner_photo_preview50"></div></div></div>'), lockButton("owner_photo_done"), cur.ownerPhotoBoxRefresh(), setTimeout(cur.ownerPhotoBoxRefresh, 0)
    },
    cropInit: function() {
        var o, e = cur.ownerPhotoCropOpts,
            r = e.size,
            t = e.thumbSize,
            i = [Math.max(75, Math.ceil(200 * t[0] / r[0])), Math.max(75, Math.ceil(200 * t[1] / r[1]))];
        e.rect ? o = {
            left: Math.floor(e.rect[0] * t[0] / r[0]),
            top: Math.floor(e.rect[1] * t[1] / r[1]),
            width: Math.ceil(e.rect[2] * t[0] / r[0]),
            height: Math.ceil(e.rect[2] * t[1] / r[1])
        } : (o = {
            width: Math.max(i[0], t[0] - 40),
            height: Math.max(i[1], t[1] - 40)
        }, o.width > o.height ? o.width = o.height : o.height > o.width && (o.height = o.width), o.left = Math.floor((t[0] - o.width) / 2), o.top = Math.min(Math.floor((t[1] - o.height) / 2), 20)), cur.ownerPhotoCropTagger && cur.ownerPhotoCropTagger.destroy(), cur.ownerPhotoCropTagger = photoTagger("owner_photo_crop_img", {
            minw: i[0],
            minh: i[1],
            preview50: "owner_photo_preview50",
            preview100: "owner_photo_preview100",
            square: 1,
            rect: o,
            zstart: 1e3
        }), unlockButton("owner_photo_done")
    },
    cropDone: function() {
        lockButton("owner_photo_done"), clearTimeout(cur.ownerPhotoCropTimer), cur.ownerPhotoCropTimer = setTimeout(OwnerPhoto.cropSuccess.pbind('{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on owner_photo_crop iframe request"}'), 1e4), stManager.add(["upload.js"], function() {
            var o = cur.ownerPhotoCropTagger.result(),
                e = cur.ownerPhotoCropOpts,
                r = e.size[0] / e.thumbSize[0],
                t = e.size[1] / e.thumbSize[1],
                i = [Math.floor(o[0] * r), Math.floor(o[1] * t), Math.ceil(o[2] * r)],
                a = jsonpManager.reg(OwnerPhoto.cropSuccess);
            utilsNode.appendChild(ce("iframe", {
                src: e.uploadUrl + "&_crop=" + i.join(",") + "&_jsonp=" + a + "&_origin=" + encodeURIComponent(locProtocol + "//" + locHost)
            }))
        })
    },
    cropSuccess: function(o, e) {
        o !== !0 && (e = o, o = !1), clearTimeout(cur.ownerPhotoCropTimer);
        var r = parseJSON(e) || {},
            t = o ? "owner_photo_done_edit" : "owner_photo_done";
        if (r.error) unlockButton(t), OwnerPhoto.showError(o ? 2 : 3, r.error + Upload.getErrorAdditional(r));
        else {
            if (cur.photoTooltipHide && cur.photoTooltipHide(!0), cur.recieveCropResult) return void cur.recieveCropResult(e);
            var i = o && window.IMBRIDGE ? IMBRIDGE.chatPhotoSaved : function(o) {
                if (r.oid == vk.id && o) {
                    var e = geByTag1("img", ge("top_profile_link"));
                    e && (e.src = o)
                }
                nav.reload()
            };
            cur && cur.shareSetOwnPhoto && (i = cur.shareSetOwnPhoto), ajax.post("al_page.php", {
                act: "owner_photo_save",
                _query: e,
                from: cur.module,
                gid: cur.ownerPhotoOptions && cur.ownerPhotoOptions.gid
            }, {
                onDone: i,
                onFail: function(e) {
                    return OwnerPhoto.showError(o ? 2 : 3, e), !0
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }
    },
    remove: function(o, e) {
        ajax.post("al_page.php", {
            act: "owner_photo_remove",
            oid: o,
            hash: e,
            gid: cur.ownerPhotoOptions && cur.ownerPhotoOptions.gid
        }, {
            onDone: window.IMBRIDGE ? IMBRIDGE.chatPhotoSaved : nav.reload,
            showProgress: lockButton.pbind("owner_photo_remove_btn"),
            hideProgress: unlockButton.pbind("owner_photo_remove_btn")
        })
    }
};
try {
    stManager.done("owner_photo.js")
} catch (e) {}