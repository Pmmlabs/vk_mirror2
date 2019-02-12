var PhotosAdd = {

    PROGRESS_OPACITY_SPEED: 100, // keep in sync with @photos-upload-progress-btns-opacity-speed

    checkChanges: function(showBox) {
        if (cur.leaving) return;
        if (cur.album && cur.uploadStarted) {
            var msg = getLang('photos_uploading_warning');
            if (showBox === 1) {
                var box = showFastBox({
                    title: getLang('global_warning'),
                    dark: 1
                }, msg, getLang('photos_stop_uploading'), function() {
                    cur.leaving = true;
                    box.hide();
                    if (cur.onContinueCb) {
                        cur.onContinueCb();
                    }
                }, getLang('global_cancel'));
                return true;
            } else {
                return winToUtf(msg);
            }
        } else {
            if (showBox) return false;
        }
    },
    go: function(el, ev) {
        if (PhotosAdd.checkChanges(1)) {
            cur.onContinueCb = nav.go.pbind(el, ev);
            return true;
        }
        return nav.go(el, ev);
    },
    initBeforeUnload: function() {
        if (cur.unloadInited) return;
        cur.unloadInited = true;
        cur.nav.push(function(changed, old, n, opts) {
            if (PhotosAdd.checkChanges(1)) {
                cur.onContinueCb = nav.go.pbind(n);
                return false;
            } else if (cur.album == vk.id + '_-7' && cur.savedPhotos && cur.savedPhotos.length && !cur.savingPhotos) {
                cur.savingPhotos = true;
                ajax.post('/al_photos.php', {
                    act: 'publish_photos',
                    hash: cur.post_hash,
                    photos: cur.savedPhotos.join(',')
                }, {
                    onDone: nav.go.pbind(n)
                });
                return false;
            }
        });
        addEvent(window, 'mousewheel', PhotosAdd.wheelHandler);
        cur.prevBefUnload = window.onbeforeunload;
        window.onbeforeunload = PhotosAdd.checkChanges;
        cur.destroy.push(function() {
            window.onbeforeunload = cur.prevBefUnload;
            removeEvent(window, 'mousewheel', PhotosAdd.wheelHandler);
        });
    },
    genFile: function(i, oncancel, cancel) {
        return ce('div', {
            innerHTML: '\
<a class="photo_file_cancel" id="photo_cancel' + i + '" onclick="' + oncancel + '">' + cancel + '</a>\
<div class="photo_file_button">\
  <div class="file_button_gray">\
    <div class="file_button" id="photo_file_button' + i + '">' + getLang('photos_choose_file') + '</div>\
  </div>\
</div>\
    '
        });
    },
    initFile: function(i) {
        FileButton.init('photo_file_button' + i, {
            name: 'photo',
            id: 'photo_file' + i,
            accept: 'image/jpeg,image/png,image/gif',
            onchange: PhotosAdd.fileSelected
        });
    },
    addFile: function() {
        var i = cur.files.length,
            el = PhotosAdd.genFile(i, 'PhotosAdd.fileCancel(' + i + ')', getLang('global_cancel'));
        extend(el, {
            className: 'photo_upload_file',
            id: 'photo_upload_row' + i
        });
        ge('photo_upload_files').appendChild(el);
        PhotosAdd.initFile(i);
        cur.files.push({});
    },
    filesLoad: function() { // for opera mini
        var i = 0,
            j = 0;
        for (; i < cur.files.length; ++i) {
            var val = ge('photo_file' + i).value;
            if (val) break;
        }
        if (i == cur.files.length) return;

        cur.allcont = utilsNode.appendChild(ce('div', {
            innerHTML: '\
<iframe name="photo_frame_all"></iframe>\
<form target="photo_frame_all" id="photo_form_all" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '
        })), form = ge('photo_form_all');
        var fields = extend(cur.fields, {
            act: 'do_add',
            al: 1,
            from_host: locHost,
            ondone: 'PhotosAdd.filesDone',
            onfail: 'PhotosAdd.filesFail'
        });
        for (j in fields) {
            form.appendChild(ce('input', {
                name: j,
                value: fields[j]
            }));
        }
        for (i = 0, j = 0; i < cur.files.length; ++i) {
            var f = ge('photo_file' + i);
            if (f.value) {
                f.name = 'file' + j;
                form.appendChild(f);
                ++j;
            }
        }
        form.submit();
    },
    fileSelected: function() {
        var i = intval(this.id.replace('photo_file', ''));
        if (!cur.files[i].deleting && (cur.files[i].cont || cur.files[i].id)) return;

        cur['fileDone' + i] = PhotosAdd.fileDone.pbind(i);
        cur['fileFail' + i] = PhotosAdd.fileFail.pbind(i);

        cur.files[i].cont = utilsNode.appendChild(ce('div', {
            innerHTML: '\
<iframe name="photo_frame' + i + '"></iframe>\
<form target="photo_frame' + i + '" id="photo_form' + i + '" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '
        })), form = ge('photo_form' + i);
        var fields = extend(cur.fields, {
            act: 'do_add',
            al: 1,
            from_host: locHost,
            ondone: 'cur.fileDone' + i,
            onfail: 'cur.fileFail' + i
        });
        for (var j in fields) {
            form.appendChild(ce('input', {
                name: j,
                value: fields[j]
            }));
        }
        form.appendChild(this);
        form.submit();

        var btn = ge('photo_file_button' + i);
        lockButton(btn);
        setTimeout(function() {
            btn.innerHTML = btn.innerHTML; // opera hack for redraw
        }, 0);
        show('photo_cancel' + i);
        ge('photo_cancel' + i).innerHTML = getLang('global_cancel');
        if (i == cur.files.length - 1) PhotosAdd.addFile();
    },
    fileDone: function(i, res) {
        hide('photo_cancel' + i);
        var before = '';
        for (var j = i + 1; j < cur.files.length; ++j) {
            if (cur.files[j].id && !cur.files[j].deleting) {
                before = cur.files[j].id;
                break;
            }
        }
        var obj;
        try {
            obj = eval('(' + res + ')');
        } catch (e) {
            obj = q2ajx(res);
        }
        PhotosAdd.fetchGeo(obj);
        setTimeout(ajax.post.pbind('al_photos.php', extend({
            act: 'done_add',
            before: before,
            context: 1,
            geo: 1
        }, obj), {
            onDone: function(id, html) {
                if (!id) return PhotosAdd.fileFail(i, 0);

                cur.files[i].cont.innerHTML = '';
                utilsNode.removeChild(cur.files[i].cont);
                extend(cur.files[i], {
                    id: id,
                    deleting: false,
                    cont: false
                });

                ge('photo_upload_row' + i).innerHTML = html;
                autosizeSetup('photo_caption' + id, {
                    minHeight: 30
                });
                show('photo_delete' + id);
                if (window._tbLink && _tbLink.loc) {
                    cur.__phinputs = cur.__phinputs || [];
                    globalHistoryDestroy(_tbLink.loc);
                }
            },
            onFail: function(text) {
                if (text) {
                    setTimeout(showFastBox({
                        title: getLang('global_error'),
                        dark: 1
                    }, text).hide, 3000);
                    PhotosAdd.fileCancel(i);
                    return true;
                }
            }
        }), 0);
    },
    fileCancel: function(i, cleaning) {
        if (cur.files[i].cont) {
            cur.files[i].cont.innerHTML = '';
            utilsNode.removeChild(cur.files[i].cont);
        }
        if (cleaning) return;

        var btn = ge('photo_file_button' + i);
        unlockButton(btn);
        btn.innerHTML = getLang('photos_choose_file');
        cur.files[i] = {};
        PhotosAdd.initFile(i);
        hide('photo_cancel' + i);
    },
    fileFail: function(i, code) {
        PhotosAdd.fileCancel(i);
    },
    fileDelete: function(id, hash) {
        var i = 0;
        for (; i < cur.files.length && cur.files[i].id != id;) {
            ++i;
        }
        if (i == cur.files.length || cur.files[i].deleting) return;
        cur.files[i].deleting = true;
        ajax.post('al_photos.php', {
            act: 'delete_photo',
            photo: id,
            hash: hash,
            edit: 2
        }, {
            onFail: function() {
                cur.files[i].deleting = false;
            }
        });
        var er = ge('photo_edit_row' + id);
        er.parentNode.insertBefore(PhotosAdd.genFile(i, 'PhotosAdd.fileRestore(\'' + id + '\', \'' + hash + '\')', getLang('global_restore')), er);
        hide(er);
        PhotosAdd.initFile(i);
        show('photo_cancel' + i);
    },
    fileRestore: function(id, hash) {
        var i = 0,
            before = '';
        for (; i < cur.files.length && cur.files[i].id != id;) {
            ++i;
        }
        if (i == cur.files.length || !cur.files[i].deleting || cur.files[i].deleting === -1) return;
        if (cur.files[i].cont) {
            return PhotosAdd.fileCancel(i);
        }
        for (var j = i + 1; j < cur.files.length; ++j) {
            if (cur.files[j].id && !cur.files[j].deleting) {
                before = cur.files[j].id;
                break;
            }
        }
        cur.files[i].deleting = -1;
        ajax.post('al_photos.php', {
            act: 'restore_photo',
            photo: id,
            hash: hash,
            before: before,
            edit: 2
        }, {
            onDone: function() {
                cur.files[i].deleting = false;
            }
        });
        var er = ge('photo_edit_row' + id);
        show(er);
        re(er.previousSibling);
    },
    filesDone: function(res) {
        var obj = q2ajx(res);
        PhotosAdd.fetchGeo(obj);
        setTimeout(ajax.post.pbind('al_photos.php', extend({
            act: 'done_add',
            context: 2,
            geo: 1
        }, obj)), 0);
    },
    filesFail: function() {
        for (var i = 0; i < cur.files.length; ++i) {
            PhotosAdd.fileCancel(i);
        }
        cur.allcont.innerHTML = '';
        utilsNode.removeChild(cur.allcont);
        cur.allcont = false;
    },

    chooseFlash: function() {
        if (browser.flash < 10) {
            return animate(ge('photo_flash_needed'), {
                backgroundColor: '#FFEFE8',
                borderBottomColor: '#E89B88',
                borderLeftColor: '#E89B88',
                borderRightColor: '#E89B88',
                borderTopColor: '#E89B88'
            }, 100, function() {
                animate(ge('photo_flash_needed'), {
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#CCCCCC',
                    borderLeftColor: '#CCCCCC',
                    borderRightColor: '#CCCCCC',
                    borderTopColor: '#CCCCCC'
                }, 500);
            });
        }
        show('photo_flash_upload');
        hide('photo_default_upload');
    },
    chooseDefault: function() {
        show('photo_default_upload');
        hide('photo_flash_upload');
    },
    flashWidth: function() {
        if (_ua.indexOf('Mac') != -1 && (_ua.indexOf('Opera') != -1 || _ua.indexOf('Firefox') != -1)) return '601';
        return '600';
    },

    backupDesc: function(photo) {
        if (!cur.descs) cur.descs = {};
        cur.descs[photo] = trim(ge('photo_caption' + photo).value);
    },
    saveDesc: function(photo, hash) {
        var dsc = ge('photo_caption' + photo).value,
            old = (cur.descs || {})[photo];
        delete(cur.descs || {})[photo];
        if (trim(dsc) == old) return;

        ajax.post('al_photos.php', {
            act: 'save_desc',
            photo: photo,
            hash: hash,
            text: dsc,
            edit: 1
        }, {
            onDone: function(text) {
                ge('photo_save_result' + photo).innerHTML = text;
            },
            onFail: function(text) {
                ge('photo_save_result' + photo).innerHTML = '<div class="photo_save_error">' + text + '</div>';
                return true;
            },
            showProgress: function() {
                ge('photo_save_result' + photo).innerHTML = getLang('photos_privacy_description');
                show('photo_save_progress' + photo);
            },
            hideProgress: function() {
                hide('photo_save_progress' + photo);
            }
        });
    },

    multiSel: function(ev) {
        alert(ev.target.files.length);
    },

    activeTab: function(el) {
        var p = domPN(domPN(el));
        for (var i = domFC(p); i; i = domNS(i)) {
            removeClass(i, 'active_link');
        }
        addClass(domPN(el), 'active_link');
        var addTab = domFC(ge('photo_add_tab'));
        if (addTab !== el) re('photo_add_tab');
    },

    initHtml5: function() {
        var scrollNode = browser.msie6 ? pageNode : window;
        addEvent(scrollNode, 'scroll', PhotosAdd.scrollHandler);
        cur.destroy.push(function() {
            removeEvent(scrollNode, 'scroll', PhotosAdd.scrollHandler);
        });

        if (!cur.noSortPhotos && !browser.mobile) {
            sorter.init('photos_add_list', {
                onReorder: PhotosAdd.reorderPhoto,
                dh: 0
            });
        }

        cur.photoAddUpdate = function(el) {
            if (!cur.noSortPhotos && !browser.mobile) {
                setTimeout(sorter.update.pbind(el), 0);
            }
        }
        cur.deleteAllToggle = function(obj) {
            cur.photoAddUpdate(obj.parentNode);
        }
    },

    reorderPhoto: function(el, before, after) {
        var list = ge('photos_add_list');
        var first = list.firstChild;
        while (first && !hasClass(first, 'photos_add_upl_row')) {
            first = first.nextSibling;
        }
        if (!hasClass(first, 'photos_add_first_child')) {
            var last = geByClass('photos_add_first_child', list)[0];
            removeClass(last, 'photos_add_first_child');
            addClass(first, 'photos_add_first_child');
        }

        ajax.post('al_photos.php', {
            act: 'reorder_photos',
            photo: el.id.substr(14),
            before: (before) ? before.id.substr(14) : '',
            after: (after) ? after.id.substr(14) : '',
            hash: cur.reorderHash || ''
        });
    },

    wheelHandler: function(ev) {
        if (cur.album) cur.scrollFixed = (scrollNode.scrollTop + window.innerHeight) != scrollNode.offsetHeight;
    },

    scrollHandler: function(ev) {
        if (cur.uplSelected) {
            if (ge('photos_add_bar')) {
                var y = scrollGetY();
                if (!cur.scrollBarFixedY) {
                    cur.scrollBarFixedY = getXY(ge('photos_add_bar').parentNode)[1];
                }
                var bar = ge('photos_add_bar');
                if (y > cur.scrollBarFixedY && !cur.scrollBarFixed) {
                    bar.className = 'photos_add_bar1';
                    cur.scrollBarFixed = true;
                    if (cur.introTooltipHide) {
                        cur.introTooltipHide();
                    }
                }
                if (y < cur.scrollBarFixedY && cur.scrollBarFixed) {
                    bar.className = 'photos_add_bar0';
                    cur.scrollBarFixed = false;
                    if (cur.introTooltipShow) {
                        cur.introTooltipShow();
                    }
                }
            }
            if (isVisible('photos_go_to_album')) {
                var w = window,
                    de = document.documentElement,
                    ft = ge('photos_go_to_album');
                if (!w.pageNode) return;
                var xy = getXY(ft.parentNode),
                    sz = getSize(ft),
                    dheight = Math.max(intval(w.innerHeight), intval(de.clientHeight));
                if (y < xy[1] + sz[1] - dheight && !cur.scrollFooterFixed) {
                    addClass(ft, 'fixed');
                    cur.scrollFooterFixed = true;
                }
                if (y > xy[1] + sz[1] - dheight && cur.scrollFooterFixed) {
                    removeClass(ft, 'fixed');
                    cur.scrollFooterFixed = false;
                }
            }
        }
    },

    setThumb: function(obj, control) {
        var img = geByClass1('photos_add_img', obj);
        var imgSize = getSize(img);
        control.mtop = 0;
        if (Math.abs(img.rotate) % 180 == 90 && this.transformAvailable()) {
            imgSize.reverse();
            if (imgSize[1] < imgSize[0]) {
                control.mtop = Math.floor((imgSize[1] - imgSize[0]) / 2);
            }
        }
        if (browser.opera) control.mtop = control.mtop - 2;
        setStyle(control, {
            width: imgSize[0],
            marginLeft: Math.floor((132 - imgSize[0]) / 2)
        });
    },

    thumbOver: function(obj, photo) {
        var control = geByClass('photos_add_controls', obj)[0];
        if (!control) { // create controls
            control = ce('div', {
                id: 'photos_add_controls' + photo,
                className: 'photos_add_controls',
                innerHTML: '<div class="photos_add_c_bar"><a class="photos_add_rl" onclick="PhotosAdd.rotateAngle(\'' + photo + '\', 90);"></a><a class="photos_add_rr" onclick="PhotosAdd.rotateAngle(\'' + photo + '\', -90);"></a></div>'
            });
            obj.appendChild(control);
        }

        PhotosAdd.setThumb(obj, control);
        show(control);

        animate(control, {
            height: 24,
            marginTop: control.mtop - 24
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        });
    },

    thumbOut: function(obj) {
        var control = geByClass('photos_add_controls', obj)[0];
        if (!control) {
            return;
        }
        animate(control, {
            height: 0,
            marginTop: control.mtop
        }, 200, function() {
            //hide(control);
        });
    },

    transformAvailable: function() {
        return false;
        if (cur.transformAvailable !== undefined) return cur.transformAvailable;
        var prefixes = 'Webkit Moz ms'.split(' '),
            prefix,
            div = ce('div'),
            i = 0,
            prop = 'transform',
            support = div.style[prop] != undefined;

        prop = prop.charAt(0).toUpperCase() + prop.slice(1)
        while (!support && (prefix = prefixes[i++])) {
            support = div.style[prefix + prop] != undefined;
        }
        cur.transformAvailable = support;
        return support;
    },

    rotateAngle: function(photo, angle, ref, event) {
        var row = gpeByClass('photos_photo_edit_row', ref);
        photo = attr(row, 'data-id');

        var progressEl = photos._showProgressPanel(row);

        window.tooltips && tooltips.hideAll();

        cancelEvent(event);

        var ph = cur.photoData[photo];
        form = ge('photo_rotate_form' + photo);
        form.innerHTML = '';
        form.action = ph.rotate[0];
        var data = extend({
            act: 'do_rotate',
            to: (angle == 90) ? 1 : -1,
            fid: photo
        }, ph.rotate);
        if (data.act == 'rotate_photo') {
            data.angle = (data.angle + data.to + 4) % 4;
        }
        var to = (data.to + 4) % 4;
        if (data['rot' + to]) {
            data.act = 'done_rotate';
            data.complete = 1;
            ajax.post('/al_photos.php', data, {
                onDone: PhotosAdd.rotateDone,
                onFail: PhotosAdd.rotateDone
            });

            return false;
        }
        for (var i in data) {
            if (i != 0) {
                form.appendChild(ce('input', {
                    type: 'hidden',
                    name: i,
                    value: data[i]
                }));
            }
        }
        form.submit();

        ajaxCache = {};
        delete cur.pvList;
        delete cur.pvData;

        return false;
    },

    rotateDone: function(data) {
        if (!data) {
            return;
        }

        var photo = data.photo_raw;
        var row = ge('photo_edit_row_' + photo);
        var imgEl = geByClass1('photos_photo_edit_row_thumb', row);

        photos._hideProgressPanel(row);

        setStyle(imgEl, {
            'background-image': 'url(\'' + (data.p_src || data.q_src) + '\')'
        });

        delete data.m_;
        delete data.o_;

        var ph = cur.photoData[photo];

        extend(ph.rotate, {
            photo: data.photo,
            hash: data.hash,
            rhash: data.rhash,
            angle: data.angle,
            rot1: data.rot1,
            rot3: data.rot3
        });

        ajaxCache = {};
        delete cur.pvList;
        delete cur.pvData;

        //obj.parentNode.onclick = function(ev) {
        //  return showPhoto(photo, 'album' + ph['album'], {temp: {base: data['base'], x_: data['x_'], y_: data['y_'], z_: data['z_']}, dark: 1}, ev);
        //}
    },

    rotateFailed: function(photo) {
        if (!PhotosAdd.transformAvailable()) {
            re('rotating_image' + photo);
        }
        var control = ge('photos_add_controls' + photo);
        delete control.blocked;
    },

    deleteAddPhoto: function(i) {
        var obj = qsorter.remove(cur.uplBox, ge('photos_add_item' + i));
        cur.uploadPhotoCount -= 1;
        if (obj) {
            PhotosAdd.thumbOver(obj.id.substr(19), geByClass('photos_add_img', obj)[0]);
        }
        PhotosAdd.updateCount();
    },

    correctThumb: function(i, rotate, obj) {
        if (Math.abs(rotate) % 180 == 90) {
            var w = Math.min(obj.firstChild.width, 98);
            setStyle(obj, {
                width: w,
                marginLeft: Math.ceil((130 - w) / 2)
            })
        } else {
            var w = obj.firstChild.width;
            setStyle(obj, {
                width: w,
                marginLeft: Math.ceil((130 - w) / 2)
            })
        }

        var control = ge('photos_add_controls' + i);
        hide(control);
        setStyle(control, {
            height: 0,
            marginTop: '0px'
        });
        setTimeout(function() {
            var fileItem = Upload.fileList[cur.uplId][i];
            fileItem.animating = false;
            PhotosAdd.thumbOver(i, obj);
        }, 600);
    },

    updateCount: function() {
        var save = ge('photos_add_save');
        save.innerHTML = langNumeric(cur.qsrt.count, cur.uploaderLang['photos_save_X_photos']);
        if (cur.qsrt.count == 0) {
            show('photos_add_empty');
            hide('photos_add_box');
            hide(ge('photos_add_bar').parentNode);
            Upload.fileList[cur.uplId] = false;
        }
    },

    saveHtml5: function() {
        Upload.uploadPhotos(cur.uplId);
    },

    scrollToBottom: function(el) {
        if (cur.scrollFixed) return;
        var w = window,
            de = document.documentElement;
        if (!el) el = cur.lastPhotoRow;
        if (!w.pageNode || !el) return;
        var xy = getXY(el),
            sz = getSize(el),
            dheight = Math.max(intval(w.innerHeight), intval(de.clientHeight));
        if (xy[1] <= 0) xy = getXY(el.parentNode);
        var scrollY = xy[1] + sz[1] - dheight + 200;
        if (scrollY > 0 && scrollY > scrollNode.scrollTop) scrollToY(scrollY, 400);
    },

    _onScroll: function() {
        if (cur.pageBlockHeader === null) return;
        cur.pageBlockHeader = cur.pageBlockHeader || geByClass1('page_block_header', ge('photos_add_block'));

        if (!cur.pageBlockHeader) return;

        var headerHeight = getSize(ge('page_header_cont'))[1];
        cur.photoAddHeaderElOffset = cur.photoAddHeaderElOffset || (getXY(cur.pageBlockHeader)[1] - headerHeight);

        var gridEl = geByClass1('photos_container_edit_grid', domPN(cur.pageBlockHeader));
        var contEl = ge('photos_add_block');

        if (scrollGetY() >= cur.photoAddHeaderElOffset) {
            addClass(cur.pageBlockHeader, 'photos_header_fixed');
            setStyle(cur.pageBlockHeader, {
                width: getSize(ge('page_body'))[0],
                top: getSize('page_header')[1]
            });
            setStyle(contEl, {
                'padding-top': getSize(cur.pageBlockHeader)[1] + 'px',
            });
        } else {
            removeClass(cur.pageBlockHeader, 'photos_header_fixed');
            setStyle(cur.pageBlockHeader, {
                width: ''
            });
            setStyle(contEl, {
                'padding-top': ''
            });
        }

        PhotosAdd.updateBottomFixedPanel();
    },

    updateBottomFixedPanel: function() {
        if (cur.fixedBottomPanel === null) return;
        cur.fixedBottomPanel = cur.fixedBottomPanel || ge('photos_go_to_album');

        if (!cur.fixedBottomPanel) return;

        var photoBlockEl = ge('photos_add_block');
        if (!photoBlockEl) return;

        var blockTop = getXY(photoBlockEl)[1];
        var blockHeight = getSize(photoBlockEl)[1];

        if (clientHeight() + scrollGetY() < blockTop + blockHeight) {
            addClass(cur.fixedBottomPanel, 'photos_bottom_fixed');
            setStyle(cur.fixedBottomPanel, {
                width: getSize(ge('page_body'))[0]
            });
            setStyle(domPS(cur.fixedBottomPanel), {
                'padding-bottom': 10 + getSize(cur.fixedBottomPanel)[1] + 'px',
            });
        } else {
            removeClass(cur.fixedBottomPanel, 'photos_bottom_fixed');
            setStyle(cur.fixedBottomPanel, {
                width: ''
            });
            setStyle(domPS(cur.fixedBottomPanel), {
                'padding-bottom': '',
            });
        }
    },

    initFixedHeader: function() {
        function removeEventListener() {
            removeEvent(window, 'scroll', PhotosAdd._onScroll);
        }
        removeEventListener();

        addEvent(window, 'scroll', PhotosAdd._onScroll);
        cur.destroy.push(removeEventListener);
    },

    onUploadStart: function(info, res) {
        PhotosAdd.initBeforeUnload();
        if (cur.onPhotoAddStart) {
            cur.onPhotoAddStart();
        }
        if (cur.flash_lite && info.num === undefined) {
            info = res;
        }

        if (info.num == 0) {
            cur.errorCount = 0;
            if (!ge('photos_add_wrap')) {
                cur.count = 0;

                show('photos_add_block');
                removeClass(ge('photos_add_block'), 'unshown');
                hide('photos_tagged_block');

                hide('photos_all_block');

                var alAlbumsBlock = ge('photos_albums_block');
                setStyle(alAlbumsBlock, {
                    visibility: 'hidden',
                    height: 0,
                    padding: 0,
                    margin: 0,
                    overflow: 'hidden'
                });

                each(geByClass('photos_period_delimiter_fixed'), hide);

                cur.prevDocTitle = document.title;
                cur.uploadStarted = true;

                hide('photos_go_to_album');

                PhotosAdd.initFixedHeader();
            }
        }

        var classAdd = '';

        if (!cur.photosAddFirst) {
            cur.photosAddFirst = true;
            classAdd = ' photos_add_first_child';
        }

        info.prepareCont = se(rs(cur.uploadRowTpl, {
            photo_raw: '',
            thumb: '',
            description: '',
            hash: ''
        }));

        re(geByClass1('photos_photo_edit_row_selector', info.prepareCont));

        setStyle(info.prepareCont, {
            'display': 'none'
        });

        photos._showProgressPanel(info.prepareCont);

        if (cur.flash_lite) {
            cur.flashPrepareCont = cur.flashPrepareCont || {};
            cur.flashPrepareCont[info.num] = cur.flashPrepareCont[info.num] || {};
            cur.flashPrepareCont[info.num][info.filename] = info.prepareCont;
        }
        var addList = ge('photos_add_list');
        addList.appendChild(info.prepareCont);
        cur.lastPhotoRow = info.prepareCont;
        PhotosAdd.makeTask(function() {
            show(info.prepareCont);
            show(geByClass1('photos_photo_edit_row_progress', info.prepareCont));
            PhotosAdd.scrollToBottom();
            return true; // need to flush
        });
        cur.uplSelected = true;

        //setStyle(ge('photos_add_p_inner'), {width: (info.loadedSize / info.totalSize  * 175)+'px'});

        ajax.post('al_photos.php', {
            act: 'start_add',
            hash: cur.statsPhotoAddHash
        });
    },

    updateProgressBar: function(progress, currentIndex, totalCount) {
        var progressBlock = ge('photos_uploaded_progress');
        var progressEl = ge('photos_total_progress');

        if (progress === false) { // need hide progress and show btns
            var btnsEl = ge('photos_upload_btn');

            addClass(progressBlock, 'photos_progress_hidden');
            setTimeout(function() {
                hide(progressBlock);
                show(btnsEl);
                setTimeout(removeClass.pbind(btnsEl, 'photos_progress_hidden'));
            }, PhotosAdd.PROGRESS_OPACITY_SPEED);

            progress = 1;

        } else if (hasClass(progressBlock, 'photos_progress_hidden')) { // need hide btns and show progress
            var btnsEl = ge('photos_upload_btn');

            addClass(btnsEl, 'photos_progress_hidden');
            setTimeout(function() {
                hide(btnsEl);
                show(progressBlock);
                setTimeout(removeClass.pbind(progressBlock, 'photos_progress_hidden'));
            }, PhotosAdd.PROGRESS_OPACITY_SPEED);

            progress = 0;
        }

        var barEl = geByClass1('ui_progress_bar', progressEl);
        setStyle(barEl, 'width', progress * getSize(progressEl)[0]);

        if (currentIndex || totalCount) {
            currentIndex = currentIndex || 0;
            totalCount = totalCount || 0;

            var text = langNumeric(currentIndex, cur.uploaderLang.photos_upload_progress).replace('{count}', currentIndex).replace('{total}', totalCount);
            val(ge('photos_total_progress_text'), text);
        }
    },

    hideUploadProgress: function() {
        PhotosAdd.updateProgressBar(false);
    },

    onUploadProgress: function(info, loaded, total) {
        var totalCount = info.totalCount || 1;
        var currentIndex = info.num || 0;

        var onePhotoAmount = 1 / totalCount;
        var baseAmount = currentIndex * onePhotoAmount;

        PhotosAdd.updateProgressBar(baseAmount + (onePhotoAmount * loaded / total), currentIndex, totalCount);
    },

    onUploadComplete: function(info, res) {
        if (cur.flash_lite) {
            info.prepareCont = cur.flashPrepareCont[info.num][info.filename];
        }

        var obj;
        try {
            obj = eval('(' + res + ')');
        } catch (e) {
            obj = q2ajx(res);
        }

        if (!obj.photos) {
            cur.errorCount++;
            re(info.prepareCont);
            if (info.prepareCont && info.prepareCont.helper) re(info.prepareCont.helper);
            ge('photos_upload_error_msg').innerHTML = cur.uploaderLang['photos_add_error'];
            show('photos_upload_error');
            scrollToTop(200);
            PhotosAdd.makeTask();
            return;
        }

        if (obj.code) {
            Upload.onUploadError(cur.UplId, obj.code);
            return;
        }

        PhotosAdd.fetchGeo(obj);
        var params = extend({
            act: 'done_add',
            from: 'html5',
            context: 1,
            geo: 1
        }, obj);
        cur.lastPhotoRow = info.prepareCont;
        cur.photoSaveQ = cur.photoSaveQ || [];
        cur.photoSaveQ.push(function() {
            ajax.post('al_photos.php', params, {
                onDone: function(html, js, photoRaw, thumb, editHash, qParams) {
                    hide('photos_upload_error');
                    cur.count++;

                    info.prepareCont = domReplaceEl(info.prepareCont, html);
                    re(geByClass1('photos_photo_edit_row_selector', info.prepareCont));

                    eval(js);
                    cur.savedPhotos = cur.savedPhotos || [];
                    cur.savedPhotos.push(photoRaw);

                    cur.savedThumbs = cur.savedThumbs || {};
                    cur.savedThumbs[photoRaw] = thumb;

                    var thumbEl = geByClass1('photos_photo_edit_row_thumb', info.prepareCont);

                    var thumbImage = vkImage();
                    thumbImage.onload = function() {
                        removeClass(thumbEl, 'no_thumb');
                        setStyle(thumbEl, 'background-image', 'url(\'' + thumb + '\')');
                        hide(geByClass1('photos_photo_edit_row_progress', info.prepareCont));
                    };
                    thumbImage.src = thumb;

                    PhotosAdd.makeTask();
                    cur.photoSaveQ.shift();
                    if (cur.photoSaveQ[0]) cur.photoSaveQ[0]();
                    if (cur.onPhotoFirstUploaded) cur.onPhotoFirstUploaded();

                    var uploadDocumentTitle = cur.uploaderLang.photos_upload_progress_title.replace('{count}', cur.count).replace('{total}', info.totalCount);
                    setDocumentTitle(replaceEntities(uploadDocumentTitle));
                    qParams && PhotosAdd.queueCheckUpdates(qParams);
                },
                onFail: function(text) {
                    if (text) {
                        ge('photos_upload_error_msg').innerHTML = text;
                        show('photos_upload_error');
                        scrollToTop(200);
                    }
                    cur.errorUpload = true;
                    if (hasClass(info.prepareCont, 'photos_add_first_child')) {
                        var next = info.prepareCont.nextSibling;
                        while (next) {
                            if (hasClass(next, 'photos_add_upl_row')) {
                                addClass(next, 'photos_add_first_child');
                                break;
                            }
                            next = next.nextSibling;
                        }
                        if (!next) {
                            cur.photosAddFirst = false;
                        }
                    }
                    re(info.prepareCont);
                    cur.photoSaveQ.shift();
                    if (cur.photoSaveQ[0]) cur.photoSaveQ[0]();
                    PhotosAdd.makeTask();
                    return true;
                }
            });
        });
        if (cur.photoSaveQ.length == 1) {
            cur.photoSaveQ[0]();
        }
    },

    queueCheckUpdates: function(params) {
        window.Notifier && Notifier.addKey(params, PhotosAdd.queueReceiveUpdates);
    },

    queueReceiveUpdates: function(key, data) {
        data.events && data.events.forEach(function(event) {
            var eventData = event.split('<!>');
            var photoId = eventData[1];
            var suggestedTagsJSON = eventData[2];
            var suggestedTags = JSON.parse(suggestedTagsJSON);

            if (suggestedTags && Object.keys(suggestedTags).length) {
                var eleId = 'photo_edit_row_' + photoId;
                addClass(ge(eleId), 'has_faces animated');
            }
        });
    },

    updateSorterRow: function(photo) {
        if (!cur.noSortPhotos) {
            setTimeout(function() {
                sorter.update(ge('photo_edit_row' + photo));
            }, 0)
        }
    },

    onUploadCompleteAll: function(info, res) {
        cur.uploadStartProgress = 0;
        delete cur.uploadStarted;
        window.onbeforeunload = cur.prevBefUnload;
        delete cur.unloadInited;

        PhotosAdd.hideUploadProgress();

        PhotosAdd.makeTask(function() {
            if (cur.flash_lite) {
                re('lite_photo_uploader');
                var par = ge('photos_upload_area'),
                    el = ce('div', {
                        innerHTML: '<div id="lite_photo_uploader" style="position: absolute; height: 100%; width: 100%; z-index: 9999; cursor: pointer;"></div>'
                    }).firstChild;
                par.parentNode.insertBefore(el, par);
                cur.initFlashLite();
            }

            setDocumentTitle(cur.prevDocTitle);

            show('photos_go_to_album');
            cur.lastPhotoRow = ge('photos_go_to_album');
            PhotosAdd.updateBottomFixedPanel();

            re('photos_albums_block');
        });
    },

    makeTask: function(task) {
        cur.photoAddQ = cur.photoAddQ || [];
        if (task) {
            cur.photoAddQ.push(task);
        } else {
            cur.photoAddSt = false;
        }
        if (!cur.photoAddSt) {
            var newTask = cur.photoAddQ.shift();
            if (newTask) {
                cur.photoAddSt = newTask();
            }
        }
    },

    fetchGeo: function(obj) {
        if (!obj.photos) {
            return false;
        }
        var photos = parseJSON(obj.photos);

        if (!photos) {
            return false;
        }
        var coords = {};
        var len = 0;
        for (var i in photos) {
            var lat = photos[i].latitude;
            var long = photos[i].longitude;
            if (lat && long) {
                coords[lat + ',' + long] = 1;
                len += 1;
            }
        }
        if (!len) {
            return false;
        }
        stManager.add(['maps.js'], function() {
            cur.placeMap = new vkMaps.VKMap(false, 'google');
            if (cur.placeMap.isLoaded('google')) {
                PhotosAdd.setGeo(coords);
            } else {
                cur.placeMap.load.addHandler(PhotosAdd.setGeo.pbind(coords));
            }
        });
    },

    setGeo: function(coords) {
        var lngcode = cur.uploaderLang.geolang || 'en';
        for (var coord in coords) {
            coord = coord.split(',');
            var lat = coord[0];
            var long = coord[1];
            new vkMaps.Geocoder('google', function(place) {
                ajax.post('al_photos.php', {
                    act: 'a_set_geo',
                    lat: coord[0],
                    long: coord[1],
                    geo_country: place.country,
                    geo_locality: place.locality,
                    geo_region: place.region,
                    geo_street: place.street,
                    geo_place: place.place,
                    geo_lang: lngcode,
                    geo_code: place.countryCode
                });
            }).geocode({
                location: new google.maps.LatLng(lat, long),
                language: lngcode
            })
        }
    }

}

try {
    stManager.done('photos_add.js');
} catch (e) {}