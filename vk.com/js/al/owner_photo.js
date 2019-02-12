var OwnerPhoto = {
    canRotate: function() {
        var b = browser,
            v = intval(b.version);
        return (
            b.msie && !b.mobile && v > 8 ||
            b.opera && !b.mobile && v > 10 ||
            b.mozilla && !b.mobile && v > 3 ||
            b.chrome && v > 17 ||
            b.safari && v > 3 ||
            b.android && !b.mozilla && v > 2
        );
    },
    init: function(b, titles, opts) {
        cur.ownerPhotoOptions = opts || {};
        if (cur.pvShown) {
            hide(layerWrap);
            cur._inLayer = true;
        }
        b.setOptions({
            grey: true,
            hideButtons: true,
            width: 654,
            bodyStyle: 'padding: 0; position: relative;',
            onHide: function() {
                delete cur.ownerPhotoOptions;
                if (cur.pvShown) {
                    show(layerWrap);
                    cur._inLayer = false;
                }
            },
            onShow: function() {
                if (cur.pvShown) {
                    hide(layerWrap);
                    cur._inLayer = true;
                }
            },
            onClean: function() {
                if (cur.ownerPhotoEditTagger) {
                    cur.ownerPhotoEditTagger.destroy();
                    cur.ownerPhotoEditTagger = false;
                }
                if (cur.ownerPhotoCropTagger) {
                    cur.ownerPhotoCropTagger.destroy();
                    cur.ownerPhotoCropTagger = false;
                }
                if (cur.ownerPhotoUploadId) {
                    Upload.deinit(cur.ownerPhotoUploadId);
                    cur.ownerPhotoUploadId = false;
                }
                clearTimeout(cur.ownerPhotoCropTimer);
            }
        });
        cur.ownerPhotoBoxRefresh = b.setOptions.pbind({});
        cur.ownerPhotoTitles = titles;
        cur.ownerPhotoBox = b;
        stManager.add(['tagger.css', 'tagger.js']);
    },
    showError: function(step, err, from) {
        if (!err.match(/^ERR_[A-Z0-9_]+(\:|$)/)) err = 'ERR_CLIENT_BAD_ERROR: error "' + clean(err.toString()) + '"';
        var e = err.match(/^(ERR_[A-Z0-9_]+)(\:\s*|$)([\S\s]*)\s*$/),
            code = e[1],
            el = ge('owner_photo_error'),
            msg;
        switch (code) {
            case 'ERR_UPLOAD_FILE_NOT_SUPPORTED':
                msg = getLang('profile_oph_err_format');
                break;
            case 'ERR_UPLOAD_FILE_NOT_UPLOADED':
                msg = getLang('profile_oph_err_upload').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                break;
            case 'ERR_UPLOAD_BAD_IMAGE_SIZE':
                if (from == 'wide') {
                    msg = getLang('profile_custom_snippet_photo_error_size').replace('{width}', '537').replace('{height}', '240');
                    break;
                } else if (from == 'cover') {
                    msg = getLang('groups_cover_photo_error_size').replace('{width}', '795').replace('{height}', '200');
                    break;
                } else {
                    msg = getLang('profile_oph_err_size').replace('{min}', '200').replace('{max}', '7<span class="num_delim"> </span>000');
                    break;
                }
            case 'ERR_UPLOAD_BIG_IMAGE_SIZE':
                msg = getLang('groups_cover_big_error_size').replace('{size}', '14000');
                break;

            case 'ERR_STORAGE_ENGINE_NOT_CONNECTED':
            case 'ERR_STORAGE_ENGINE_SAVE_FAILED':
                if (!isVisible('owner_photo_upload_return')) {
                    msg = getLang('profile_oph_error_server');
                    break;
                }
            default:
                msg = getLang('profile_oph_err_unknown').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                break;
        }
        msg = msg.replace('{sorry}', '<b>' + getLang('global_sorry_error') + '</b>') + '<br><a onclick="OwnerPhoto.detailsError(this);">' + getLang('global_error_details') + '</a><div class="unshown">Error: ' + code + (e[3] ? ('. Details: ' + e[3]) : '.') + '</div>';
        val(domFC(el), msg);
        if (!isVisible(el)) {
            slideDown(el, 150);
        }
        if (step == 1) {
            Upload.embed(cur.ownerPhotoUploadId);
        }
    },
    detailsError: function(el) {
        var vis = isVisible(domNS(el));
        (vis ? slideUp : slideDown)(domNS(el), 150);
        val(el, getLang(vis ? 'global_error_details' : 'global_error_hide_details'));
    },
    showContent: function(type) {
        var box = cur.ownerPhotoBox,
            titles = cur.ownerPhotoTitles;
        if (!box || !titles) return;

        each(['upload', 'edit', 'camera', 'crop', 'error'], function() {
            hide('owner_photo_' + this);
        });
        show('owner_photo_' + type);
        box.setOptions({
            title: titles[type] || titles.upload || ''
        });
    },

    cameraInit: function() {
        var vars = {
            's_noCamera': getLang('profile_no_camera'),
            's_noAccess': getLang('profile_no_camera_access'),
            's_setAccess': getLang('profile_set_camera_access'),
            's_capture': getLang('profile_capture_image'),
            's_videoMode': getLang('profile_to_video_mode'),
            'upload_url': (Upload.uploadUrls || [])[cur.ownerPhotoUploadId] || '',
            'saveClbk': 'OwnerPhoto.cameraPhotoDone',
            'hideClbk': 'OwnerPhoto.uploadReturn',
            'overClbk': 'OwnerPhoto.cameraBtnOver',
            'outClbk': 'OwnerPhoto.cameraBtnOut',
            'downClbk': 'OwnerPhoto.cameraBtnDown',
            'upClbk': 'OwnerPhoto.cameraBtnUp',
            'showSaveClbk': 'OwnerPhoto.showCameraSaveBtn',
            'hideSaveClbk': 'OwnerPhoto.hideCameraSaveBtn',
            'hideCaptureClbk': 'OwnerPhoto.hideCameraCaptureBtn',
            'progressClbk': 'OwnerPhoto.cameraSaveProgress',
            'getBtnsPos': 'OwnerPhoto.updateCameraButtonsPos',
            'jpgQuality': '95'
        }
        for (var i in vars) {
            vars[i] = winToUtf(vars[i]);
        }
        var opts = {
            url: '/swf/CaptureImg.swf',
            id: 'flash_camera',
            width: 604,
            height: 480,
            preventhide: 1,
            style: 'visibility: visible',
            version: 9
        }
        var params = {
            allownetworking: 'true',
            wmode: 'transparent'
        }

        setStyle(ge('owner_photo_cam_ctrls'), {
            visibility: 'hidden'
        });
        OwnerPhoto.showContent('camera');
        removeClass(ge('camera_button_no'), 'hover');
        renderFlash('owner_photo_webcam', opts, params, vars);
        this.hideCameraSaveBtn(true);
        cur.ownerPhotoBoxRefresh();
        return false;
    },
    cameraPhotoDone: function(res) {
        unlockButton(ge('camera_button_yes'));
        cur.cameraShotLoaded = true;
        var wc = ge('owner_photo_webcam');
        if (wc) wc.innerHTML = '';
        Upload.onUploadComplete(cur.ownerPhotoUploadId, res);
    },
    updateCameraButtonsPos: function() {
        var butnsWrap = ge('owner_photo_cam_ctrls'),
            pos = [];
        var wrapXY = getXY(butnsWrap),
            wrapSize = getSize(butnsWrap);
        setStyle(ge('owner_photo_cam_ctrls'), {
            visibility: 'visible'
        });
        var detectPos = function(i, el) {
            if (!isVisible(el)) return;
            var buttonXY = getXY(el),
                buttonSize = getSize(el);
            pos.push([buttonXY[0] - wrapXY[0], buttonXY[1] - wrapXY[1], buttonSize[0] + 2, buttonSize[1] + 2]);
        }
        each(geByTag('button', butnsWrap), detectPos);
        each(geByClass('button', butnsWrap), detectPos);
        if (ge('flash_camera').setButtonsPos) ge('flash_camera').setButtonsPos(pos);
    },
    showCameraSaveBtn: function() {
        ge('camera_button_yes').innerHTML = getLang('profile_oph_camera_save');
        ge('camera_button_no').innerHTML = getLang('profile_to_video_mode');
        this.updateCameraButtonsPos();
    },
    hideCameraSaveBtn: function(noUpdate) {
        ge('camera_button_yes').innerHTML = getLang('profile_capture_image');
        ge('camera_button_no').innerHTML = getLang('profile_oph_camera_back');
        if (!noUpdate) this.updateCameraButtonsPos();
    },
    hideCameraCaptureBtn: function() {
        hide('camera_button_no');
        ge('camera_button_yes').innerHTML = getLang('profile_no_camera_back');
        this.updateCameraButtonsPos();
    },
    cameraSaveProgress: function(val) {
        var button = ge('camera_button_yes');
        if (!button) return;
        if (val) {
            lockButton(button);
        } else {
            unlockButton(button);
        }
    },
    cameraBtnOver: function(btn_class) {
        var button = geByClass1(btn_class, ge('owner_photo_cam_ctrls'));
        if (button) addClass(button, 'hover');
    },
    cameraBtnOut: function(btn_class) {
        var button = geByClass1(btn_class, ge('owner_photo_cam_ctrls'));
        if (button) {
            removeClass(button, 'hover');
            removeClass(button, 'active');
        }
    },
    cameraBtnDown: function(btn_class) {
        var button = geByClass1(btn_class, ge('owner_photo_cam_ctrls'));
        if (button) addClass(button, 'active');
    },
    cameraBtnUp: function(btn_class) {
        var button = geByClass1(btn_class, ge('owner_photo_cam_ctrls'));
        if (button) removeClass(button, 'active');
    },

    uploadInit: function(opts) {
        cur.ownerPhotoUploadId = Upload.init('owner_photo_input', opts.url, {}, {
            file_name: 'photo',

            file_size_limit: 1024 * 1024 * 25, // 25Mb
            file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
            file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',

            lang: opts.lang,

            onUploadStart: function(i, res) {
                curBox().changed = true;
            },

            onUploadComplete: function(i, res, errorAdd) {
                var obj = parseJSON(res) || {};

                if (obj.error) {
                    var from = opts.wide ? 'wide' : (opts.cover ? 'cover' : 'photo');
                    OwnerPhoto.showError(1, obj.error + (errorAdd || ''), from);
                } else if (opts.is_voting ? (!obj.color || !obj.photo || !obj.photo.sizes) : (!obj.x_src || !obj.x_size || !obj.size)) {
                    var txt = (res === false) ? '[FALSE]' : ((res === null) ? '[NULL]' : ((res === undefined) ? '[UNDEFINED]' : ('&laquo;' + clean(res.toString().substr(0, 1024)) + '&raquo;')));
                    OwnerPhoto.showError(1, 'ERR_CLIENT_BAD_RESPONSE: bad upload owner photo response, recv ' + txt);
                } else if (opts.is_voting) {
                    ajax.post('al_voting.php', {
                        act: 'save_photo',
                        hash: opts.hash,
                        photo: res,
                    }, {
                        onDone: function() {
                            if (vk.widget) {
                                try {
                                    var args = ['proxy', 'addMedia', opts.lnk_id, 'pollBackgroundUploaded'].concat([].slice.call(arguments));
                                    Rpc.callMethod.apply(Rpc, args);
                                } catch (e) {
                                    OwnerPhoto.showError(1, '');
                                }
                            } else if (cur.addMedia && cur.addMedia[opts.lnk_id] && isFunction(cur.addMedia[opts.lnk_id].pollBackgroundUploaded)) {
                                cur.addMedia[opts.lnk_id].pollBackgroundUploaded.apply(null, [].slice.call(arguments));
                            }
                            if (curBox()) {
                                curBox().hide();
                            }
                        },
                        onFail: function(text) {
                            OwnerPhoto.showError(1, text);
                            return true;
                        }
                    });
                } else {
                    var url = Upload.options[cur.ownerPhotoUploadId].base_url + 'upload.php?act=' + (opts.cover ? 'owner_cover_crop' : 'owner_photo_edit') + '&_query=' + encodeURIComponent(res) + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost);

                    if (opts.is_voting) {
                        obj.x_src = 'v' + obj.photo.sizes[0][1] + '/' + obj.photo.sizes[0][2] + '/' + obj.photo.sizes[0][3] + '.jpg';
                        obj.x_size = [obj.photo.sizes[0][4], obj.photo.sizes[0][5]];
                        obj.size = [obj.photo.sizes[0][4], obj.photo.sizes[0][5]];
                    }

                    var thumb = obj.x_src;
                    if (!obj.x_src.startsWith('http')) {
                        thumb = Upload.options[cur.ownerPhotoUploadId].static_url + thumb;
                    }

                    removeClass('owner_photo_upload_return', 'unshown');
                    OwnerPhoto.edit({
                        thumb: thumb,
                        thumbSize: obj.x_size,
                        size: obj.size,
                        uploadUrl: url,
                        square: opts.square,
                        no_crop: opts.no_crop,
                        wide: opts.wide,
                        cover: opts.cover
                    });
                }
            },

            onUploadProgress: function(i, bytesLoaded, bytesTotal) {
                if (!ge('form' + i + '_progress')) {
                    var obj = Upload.obj[i],
                        objHeight = getSize(obj)[1],
                        tm = objHeight / 2 + 10;
                    var node = obj.firstChild;
                    while (node) {
                        if (node.nodeType == 1) {
                            if (node.id == 'uploader' + i && browser.msie) {
                                setStyle(node, {
                                    position: 'relative',
                                    left: '-5000px'
                                });
                            } else {
                                setStyle(node, {
                                    visibility: 'hidden'
                                });
                            }
                        }
                        node = node.nextSibling;
                    }
                    obj.appendChild(ce('div', {
                        innerHTML: '<div class="upload_progress_wrap">\
            <div id="form' + i + '_progress" class="upload_progress" style="width: 0%;"></div>\
          </div></div>'
                    }, {
                        height: tm + 'px',
                        marginTop: -tm + 'px'
                    }));
                }
                var percent = intval(bytesLoaded / bytesTotal * 100);
                setStyle(ge('form' + i + '_progress'), {
                    width: percent + '%'
                });
            },

            clear: 1,
            type: 'photo',
            noFlash: 1,
            max_attempts: 3,
            signed: 1,
            file_input: curBox().inp,
            static_url: opts.static_url,
            check_url: opts.check_url,
            base_url: opts.base_url,
            dropbox: 'owner_dropbox'
        });
    },
    uploadReturn: function() {
        if (cur.ownerPhotoEditTagger) {
            cur.ownerPhotoEditTagger.destroy();
            cur.ownerPhotoEditTagger = false;
        }
        hide('owner_photo_error');
        if (cur.cameraShotLoaded) {
            cur.cameraShotLoaded = false;
            this.cameraInit();
            return;
        }
        OwnerPhoto.showContent('upload');
        curBox().setOptions({
            width: 654
        });
        val('owner_photo_thumb', '');
        Upload.embed(cur.ownerPhotoUploadId);
        cur.ownerPhotoBoxRefresh();
    },

    edit: function(opts) {
        if (!opts) curBox().hide();
        var wrap = ge('owner_photo_thumb'),
            s = opts.thumbSize,
            st = s ? 'width: ' + s[0] + 'px; height: ' + s[1] + 'px;' : '';
        if (!opts.size) {
            clearTimeout(cur.ownerPhotoEditTimer);
            cur.ownerPhotoEditTimer = setTimeout(OwnerPhoto.editInit, 100);
            (cur.ownerPhotoOrigin = vkImage()).src = opts.url;
        } else {
            cur.ownerPhotoEditTimer = -1;
        }
        OwnerPhoto.showContent('edit');
        if (opts.cover) {
            curBox().setOptions({
                width: 845
            });
        }
        if (OwnerPhoto.canRotate() && opts.rotation) {
            addClass(wrap, 'hidden');
        }
        var noRotate = opts && opts.size && (opts.size[0] < 795 || opts.size[1] < 795),
            rotateDesc = domByClass(ge('owner_photo_edit'), '_owner_photo_rotate_desc');
        setStyle(wrap, {
            width: '',
            height: ''
        });
        toggleClass(wrap, 'no_rotate', noRotate)
        toggle(rotateDesc, !noRotate);
        val(wrap, '<div id="owner_photo_rotate"><div style="' + st + 'margin: 0px auto;"><img class="owner_photo_img" id="owner_photo_img" src="' + opts.thumb + '" style="' + st + '" onload="OwnerPhoto.editInit();" /></div></div>');
        cur.ownerPhotoThumb = ge('owner_photo_img');
        cur.ownerPhotoEditOpts = opts;
        cur.ownerPhotoRotation = 0;

        cur.ownerPhotoBoxRefresh();
        setTimeout(cur.ownerPhotoBoxRefresh, 0);
    },
    editInit: function() {
        if (!cur.ownerPhotoEditTimer) return;
        var opts = cur.ownerPhotoEditOpts,
            size = opts.size,
            tsize = opts.thumbSize;
        if (!tsize && cur.ownerPhotoThumb.width && cur.ownerPhotoThumb.height) {
            tsize = opts.thumbSize = [cur.ownerPhotoThumb.width, cur.ownerPhotoThumb.height];
            cur.ownerPhotoBoxRefresh();
        }
        if (!size && cur.ownerPhotoOrigin.width && cur.ownerPhotoOrigin.height) {
            size = opts.size = [cur.ownerPhotoOrigin.width, cur.ownerPhotoOrigin.height];
        }
        clearTimeout(cur.ownerPhotoEditTimer);
        if (!size || !tsize) {
            return cur.ownerPhotoEditTimer = setTimeout(OwnerPhoto.editInit, 100);
        }
        cur.ownerPhotoEditTimer = false;

        stManager.add(['tagger.css', 'tagger.js'], OwnerPhoto.editTagger);
    },
    rotate: function(c) {
        cur.ownerPhotoEditTagger.rotate(c);
        var was = intval(cur.ownerPhotoRotation),
            el = ge('owner_photo_rotate'),
            wrap = ge('owner_photo_thumb');
        cur.ownerPhotoRotation = (c = (was + c) % 4);
        if (was) removeClass(el, 'owner_photo_rotate' + was);
        if (c) addClass(el, 'owner_photo_rotate' + c);
        var tsize = cur.ownerPhotoEditOpts.thumbSize,
            d = (c % 2) * Math.floor((tsize[0] - tsize[1]) / 2);
        wrap.style.margin = (d + 20) + 'px auto';
        setStyle(domLC(wrap), extend(vk.rtl ? {
            left: d
        } : {
            right: d
        }, {
            bottom: -d
        }));
    },
    editTagger: function() {
        var opts = cur.ownerPhotoEditOpts;
        var size = opts.size,
            tsize = opts.thumbSize;
        var profileAvatarMinAspectRatio = (cur.oid && cur.oid < 0) ? 0.4 : 0.667;
        var rect, mul1 = opts.square ? 1 : 1.5,
            mul2 = opts.square ? 1 : 1.5,
            div1 = opts.square ? 1 : profileAvatarMinAspectRatio;
        var mina = div1,
            maxa = 1;
        var minSize = [
            Math.max(100, Math.ceil(200 * tsize[0] / size[0])),
            Math.max(100, Math.ceil(200 * tsize[1] / size[1]))
        ];
        if (opts.wide) {
            mina = 2.2375; // 537x240 aspect ratio
            maxa = 2.2375;
            minSize = [
                Math.max(100, Math.ceil(537 * tsize[0] / size[0])),
                Math.max(45, Math.ceil(240 * tsize[1] / size[1]))
            ];
        } else if (opts.cover) {
            mina = 3.975; // 795x200 aspect ratio
            maxa = 3.975;
            minSize = [
                Math.max(200, Math.ceil(795 * tsize[0] / size[0])),
                Math.max(50, Math.ceil(200 * tsize[1] / size[1]))
            ];
        }

        if (tsize[0] < minSize[0] || tsize[1] < minSize[1]) {
            nav.reload();
        }
        if (opts.rect) {
            if (opts.strict) {
                rect = {
                    left: Math.floor(opts.rect[0] * tsize[0] / size[0]),
                    top: Math.floor(opts.rect[1] * tsize[1] / size[1]),
                    width: Math.ceil(opts.rect[2] * tsize[0] / size[0]),
                    height: Math.ceil(opts.rect[3] * tsize[1] / size[1])
                }
            } else {
                rect = {
                    left: Math.floor(opts.rect[0] * tsize[0] / 100.0),
                    top: Math.floor(opts.rect[1] * tsize[1] / 100.0),
                    width: Math.ceil(opts.rect[2] * tsize[0] / 100.0),
                    height: Math.ceil(opts.rect[3] * tsize[1] / 100.0)
                }
                if (rect.width < minSize[0]) {
                    rect.left = Math.max(0, rect.left - Math.floor((minSize[0] - rect.width) / 2));
                    rect.width = minSize[0];
                }
                if (rect.width * mul1 > rect.height) {
                    if (rect.width * mul1 > tsize[1]) {
                        if (tsize[1] / mul1 < minSize[0]) {
                            rect = {
                                left: rect.left + Math.floor((rect.width - minSize[0]) / 2),
                                top: 0,
                                width: minSize[0],
                                height: tsize[1]
                            };
                        } else {
                            rect = {
                                left: rect.left + Math.floor((rect.width - tsize[1] / mul1) / 2),
                                top: 0,
                                width: Math.floor(tsize[1] / mul1),
                                height: tsize[1]
                            };
                        }
                    } else {
                        rect.top = Math.max(0, rect.top - Math.floor((rect.width * mul1 - rect.height) / 4));
                        rect.height = Math.ceil(rect.width * mul1);
                        if (rect.top + rect.height > tsize[1]) {
                            rect.top = tsize[1] - rect.height;
                        }
                    }
                }
                if (rect.height > rect.width * mul2) {
                    if (rect.height > tsize[0] * mul2) {
                        rect = {
                            left: 0,
                            top: rect.top + Math.floor((rect.height - tsize[0] * mul2) / 2),
                            width: tsize[0],
                            height: Math.floor(tsize[0] * mul2)
                        };
                    } else {
                        rect.left = Math.max(0, rect.left - Math.floor((rect.height / mul2 - rect.width) / 2));
                        rect.width = Math.ceil(rect.height / mul2);
                        if (rect.left + rect.width > tsize[0]) {
                            rect.left = tsize[0] - rect.width;
                        }
                    }
                }
            }
        } else {
            if (opts.wide) {
                if (tsize[1] >= (tsize[0] / maxa)) {
                    rect = {
                        width: tsize[0] - 40
                    };
                    rect.height = Math.ceil(rect.width / maxa);
                } else {
                    rect = {
                        height: tsize[1] - 40
                    };
                    rect.width = Math.ceil(rect.height * maxa);
                }
            } else if (opts.cover) {
                if (tsize[1] >= (tsize[0] / maxa)) {
                    rect = {
                        width: tsize[0]
                    };
                    rect.height = Math.ceil(rect.width / maxa);
                } else {
                    rect = {
                        height: tsize[1]
                    };
                    rect.width = Math.ceil(rect.height * maxa);
                }
            } else {
                rect = {
                    width: Math.max(minSize[0], tsize[0] - 40),
                    height: Math.max(minSize[1], tsize[1] - 40)
                };
            }
            if (!opts.wide && !opts.cover && (rect.width > rect.height)) {
                rect.width = rect.height;
            }
            if (rect.height > rect.width * mul2) {
                rect.height = Math.floor(rect.width * mul2);
            }
            rect.left = Math.floor((tsize[0] - rect.width) / 2);
            rect.top = Math.floor((tsize[1] - rect.height) / 2);
        }
        if (cur.ownerPhotoEditTagger) {
            cur.ownerPhotoEditTagger.destroy();
        }
        cur.ownerPhotoEditTagger = photoTagger('owner_photo_img', {
            minw: minSize[0],
            minh: minSize[1],
            mina: mina,
            maxa: maxa,
            rect: rect,
            zstart: 1000
        });

        if (OwnerPhoto.canRotate()) {
            re('owner_photo_rotate_wrap');
            var wrap = ge('owner_photo_thumb');
            setStyle(wrap, {
                width: tsize[0],
                height: tsize[1]
            });
            setStyle(domFC(wrap), {
                width: tsize[0],
                height: tsize[1]
            });
            wrap.appendChild(se('<div id="owner_photo_rotate_wrap" class="owner_photo_rotate_wrap"><div class="owner_photo_rotate_left" onclick="OwnerPhoto.rotate(3)"></div><div class="owner_photo_rotate_right" onclick="OwnerPhoto.rotate(1)"></div></div>'));
            if (opts.rotation) {
                OwnerPhoto.rotate(opts.rotation);
            }
            removeClass(wrap, 'hidden');
        }
    },
    editDone: function() {
        var rect = cur.ownerPhotoEditTagger.result(),
            opts = cur.ownerPhotoEditOpts;
        var cx = opts.size[0] / opts.thumbSize[0],
            cy = opts.size[1] / opts.thumbSize[1],
            crop = [
                Math.floor(rect[0] * cx),
                Math.floor(rect[1] * cy),
                Math.ceil(rect[2] * cx),
                Math.ceil(rect[3] * cy)
            ],
            url = cur.ownerPhotoEditOpts.uploadUrl + '&_full=' + encodeURIComponent(crop.join(',')) + '&_rot=' + intval(cur.ownerPhotoRotation);
        if (opts.square || opts.no_crop) {
            lockButton('owner_photo_done_edit');
            clearTimeout(cur.ownerPhotoCropTimer);
            cur.ownerPhotoCropTimer = setTimeout(OwnerPhoto.cropSuccess.pbind(true, '{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on owner_photo_crop iframe request"}'), 10000);
            stManager.add(['upload.js'], function() {
                var lastcrop = [
                        0,
                        0,
                        crop[2] // or crop[3], must be almost equal
                    ],
                    jsonp = jsonpManager.reg(OwnerPhoto.cropSuccess.pbind(true));
                utilsNode.appendChild(ce('iframe', {
                    src: url + '&_crop=' + lastcrop.join(',') + '&_jsonp=' + jsonp + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost)
                }));
            });
        } else {
            removeClass('owner_photo_edit_return', 'unshown');
            OwnerPhoto.crop({
                uploadUrl: url,
                thumb: url + '&_proxy=1',
                thumbSize: [200, intval(200 * crop[3] / crop[2])],
                size: [crop[2], crop[3]]
            });
        }
    },
    editReturn: function() {
        if (cur.ownerPhotoCropTagger) {
            cur.ownerPhotoCropTagger.destroy();
            cur.ownerPhotoCropTagger = false;
        }
        OwnerPhoto.showContent('edit');
        val('owner_photo_crop_thumb', '');
        cur.ownerPhotoBoxRefresh();
    },

    thumbError: function() {
        if (!isVisible('owner_photo_edit_return') || cur.ownerPhotoCropOpts.thumb.indexOf('_proxy=1') == -1) {
            return;
        }

        OwnerPhoto.editReturn();
        stManager.add(['upload.js'], function() {
            utilsNode.appendChild(ce('iframe', {
                src: cur.ownerPhotoCropOpts.thumb.replace('_proxy=1', '_proxy=2') + '&_jsonp=' + jsonpManager.reg(OwnerPhoto.thumbErrorShow) + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost)
            }));
        });
    },
    thumbErrorShow: function(res) {
        var obj = parseJSON(res) || {};
        if (!obj.error) return;

        OwnerPhoto.showError(2, obj.error + Upload.getErrorAdditional(obj));
    },

    crop: function(opts) {
        var wrap = ge('owner_photo_crop_thumb'),
            s = opts.thumbSize;
        cur.ownerPhotoCropOpts = opts;

        OwnerPhoto.showContent('crop');
        val(wrap, '\
<div class="owner_photo_crop_wrap clear_fix">\
  <div class="fl_l"><img class="owner_photo_crop_img" id="owner_photo_crop_img" src="' + opts.thumb + '" style="width: ' + s[0] + 'px; height: ' + s[1] + 'px;" onload="stManager.add([\'tagger.css\', \'tagger.js\'], OwnerPhoto.cropInit)" onerror="OwnerPhoto.thumbError()" /></div>\
  <div class="fl_l"><div class="owner_photo_preview100" id="owner_photo_preview100"></div></div>\
  <div class="fl_l"><div class="owner_photo_preview50" id="owner_photo_preview50"></div></div>\
</div>');
        lockButton('owner_photo_done');

        cur.ownerPhotoBoxRefresh();
        setTimeout(cur.ownerPhotoBoxRefresh, 0);
    },
    cropInit: function() {
        var opts = cur.ownerPhotoCropOpts,
            size = opts.size,
            tsize = opts.thumbSize,
            minSize = [
                Math.max(75, Math.ceil(200 * tsize[0] / size[0])),
                Math.max(75, Math.ceil(200 * tsize[1] / size[1]))
            ],
            rect;
        if (opts.rect) {
            rect = {
                left: Math.floor(opts.rect[0] * tsize[0] / size[0]),
                top: Math.floor(opts.rect[1] * tsize[1] / size[1]),
                width: Math.ceil(opts.rect[2] * tsize[0] / size[0]),
                height: Math.ceil(opts.rect[2] * tsize[1] / size[1])
            }
        } else {
            rect = {
                width: Math.max(minSize[0], tsize[0] - 40),
                height: Math.max(minSize[1], tsize[1] - 40)
            };
            if (rect.width > rect.height) {
                rect.width = rect.height;
            } else if (rect.height > rect.width) {
                rect.height = rect.width;
            }
            rect.left = Math.floor((tsize[0] - rect.width) / 2);
            rect.top = Math.min(Math.floor((tsize[1] - rect.height) / 2), 20);
        }
        if (cur.ownerPhotoCropTagger) {
            cur.ownerPhotoCropTagger.destroy();
        }
        cur.ownerPhotoCropTagger = photoTagger('owner_photo_crop_img', {
            minw: minSize[0],
            minh: minSize[1],
            preview50: 'owner_photo_preview50',
            preview100: 'owner_photo_preview100',
            square: 1,
            rect: rect,
            zstart: 1000
        });
        unlockButton('owner_photo_done');
    },
    cropDone: function() {
        lockButton('owner_photo_done');
        clearTimeout(cur.ownerPhotoCropTimer);
        cur.ownerPhotoCropTimer = setTimeout(OwnerPhoto.cropSuccess.pbind('{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on owner_photo_crop iframe request"}'), 10000);
        stManager.add(['upload.js'], function() {
            var rect = cur.ownerPhotoCropTagger.result(),
                opts = cur.ownerPhotoCropOpts;
            var cx = opts.size[0] / opts.thumbSize[0],
                cy = opts.size[1] / opts.thumbSize[1],
                crop = [
                    Math.floor(rect[0] * cx),
                    Math.floor(rect[1] * cy),
                    Math.ceil(rect[2] * cx) // or Math.ceil(rect[3] * cy), must be almost equal
                ],
                jsonp = jsonpManager.reg(OwnerPhoto.cropSuccess);
            utilsNode.appendChild(ce('iframe', {
                src: opts.uploadUrl + '&_crop=' + crop.join(',') + '&_jsonp=' + jsonp + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost)
            }));
        });
    },
    cropSuccess: function(squareEdit, res) {
        if (squareEdit !== true) {
            res = squareEdit;
            squareEdit = false;
        }
        clearTimeout(cur.ownerPhotoCropTimer);
        var obj = parseJSON(res) || {},
            btn = squareEdit ? 'owner_photo_done_edit' : 'owner_photo_done';
        if (obj.error) {
            unlockButton(btn);
            OwnerPhoto.showError(squareEdit ? 2 : 3, obj.error + Upload.getErrorAdditional(obj));
        } else {
            if (cur.photoTooltipHide) {
                cur.photoTooltipHide(true);
            }

            if (cur.recieveCropResult) {
                cur.recieveCropResult(res);
                return;
            }

            var onDone = squareEdit && window.IMBRIDGE ? IMBRIDGE.chatPhotoSaved : function(newPhoto) {
                if (obj.oid == vk.id && newPhoto) {
                    var imgEl = geByTag1('img', ge('top_profile_link'));
                    imgEl && (imgEl.src = newPhoto);
                }
                nav.reload();
            }
            if (cur && cur.shareSetOwnPhoto) {
                onDone = cur.shareSetOwnPhoto;
            }
            ajax.post('al_page.php', {
                act: 'owner_photo_save',
                _query: res,
                from: cur.module,
                gid: cur.ownerPhotoOptions && cur.ownerPhotoOptions.gid
            }, {
                onDone: onDone,
                onFail: function(text) {
                    OwnerPhoto.showError(squareEdit ? 2 : 3, text);
                    return true;
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        }
    },

    remove: function(oid, hash) {
        ajax.post('al_page.php', {
            act: 'owner_photo_remove',
            oid: oid,
            hash: hash,
            gid: cur.ownerPhotoOptions && cur.ownerPhotoOptions.gid
        }, {
            onDone: window.IMBRIDGE ? IMBRIDGE.chatPhotoSaved : nav.reload,
            showProgress: lockButton.pbind('owner_photo_remove_btn'),
            hideProgress: unlockButton.pbind('owner_photo_remove_btn')
        });
    }
}

try {
    stManager.done('owner_photo.js');
} catch (e) {}