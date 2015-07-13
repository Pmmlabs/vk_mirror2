var PhotosAdd = {
  checkChanges: function(showBox) {
    if (cur.leaving) return;
    if (cur.album && cur.uploadStarted) {
      var msg = getLang('photos_uploading_warning');
      if (showBox === 1) {
        var box = showFastBox({title: getLang('global_warning'), dark: 1}, msg, getLang('photos_stop_uploading'), function () {
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
  initBeforeUnload: function () {
    if (cur.unloadInited) return;
    cur.unloadInited = true;
    cur.nav.push(function (changed, old, n, opts) {
      if (PhotosAdd.checkChanges(1)) {
        cur.onContinueCb = nav.go.pbind(n);
        return false;
      } else if (cur.album == vk.id + '_-7' && cur.savedPhotos && cur.savedPhotos.length && !cur.savingPhotos) {
        cur.savingPhotos = true;
        ajax.post('/al_photos.php', {act: 'publish_photos', hash: cur.post_hash, photos: cur.savedPhotos.join(',')}, {
          onDone: nav.go.pbind(n)
        });
        return false;
      }
    });
    addEvent(window, 'DOMMouseScroll mousewheel', PhotosAdd.wheelHandler);
    addEvent(document, 'DOMMouseScroll', PhotosAdd.wheelHandler);
    cur.prevBefUnload = window.onbeforeunload;
    window.onbeforeunload = PhotosAdd.checkChanges;
    cur.destroy.push(function () {
      window.onbeforeunload = cur.prevBefUnload;
      removeEvent(window, 'DOMMouseScroll mousewheel', PhotosAdd.wheelHandler);
      removeEvent(document, 'DOMMouseScroll', PhotosAdd.wheelHandler);
    });
  },
  genFile: function(i, oncancel, cancel) {
    return ce('div', {innerHTML: '\
<a class="photo_file_cancel" id="photo_cancel' + i + '" onclick="' + oncancel + '">' + cancel + '</a>\
<div class="photo_file_button">\
  <div class="file_button_gray">\
    <div class="file_button" id="photo_file_button' + i + '">' + getLang('photos_choose_file') + '</div>\
  </div>\
</div>\
    '});
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
    var i = cur.files.length, el = PhotosAdd.genFile(i, 'PhotosAdd.fileCancel(' + i + ')', getLang('global_cancel'));
    extend(el, {className: 'photo_upload_file', id: 'photo_upload_row' + i});
    ge('photo_upload_files').appendChild(el);
    PhotosAdd.initFile(i);
    cur.files.push({});
  },
  filesLoad: function() { // for opera mini
    var i = 0, j = 0;
    for (; i < cur.files.length; ++i) {
      var val = ge('photo_file' + i).value;
      if (val) break;
    }
    if (i == cur.files.length) return;

    cur.allcont = utilsNode.appendChild(ce('div', {innerHTML: '\
<iframe name="photo_frame_all"></iframe>\
<form target="photo_frame_all" id="photo_form_all" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '})), form = ge('photo_form_all');
    var fields = extend(cur.fields, {
      act: 'do_add',
      al: 1,
      from_host: locHost,
      ondone: 'PhotosAdd.filesDone',
      onfail: 'PhotosAdd.filesFail'
    });
    for (j in fields) {
      form.appendChild(ce('input', {name: j, value: fields[j]}));
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

    cur.files[i].cont = utilsNode.appendChild(ce('div', {innerHTML: '\
<iframe name="photo_frame' + i + '"></iframe>\
<form target="photo_frame' + i + '" id="photo_form' + i + '" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '})), form = ge('photo_form' + i);
    var fields = extend(cur.fields, {
      act: 'do_add',
      al: 1,
      from_host: locHost,
      ondone: 'cur.fileDone' + i,
      onfail: 'cur.fileFail' + i
    });
    for (var j in fields) {
      form.appendChild(ce('input', {name: j, value: fields[j]}));
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
    } catch(e) {
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
        autosizeSetup('photo_caption' + id, {minHeight: 30});
        show('photo_delete' + id);
        if (window._tbLink && _tbLink.loc) {
          cur.__phinputs = cur.__phinputs || [];
          globalHistoryDestroy(_tbLink.loc);
        }
      },
      onFail: function(text) {
        if (text) {
          setTimeout(showFastBox({title: getLang('global_error'), dark: 1}, text).hide, 3000);
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
    ajax.post('al_photos.php', {act: 'delete_photo', photo: id, hash: hash, edit: 2}, {onFail: function() {
      cur.files[i].deleting = false;
    }});
    var er = ge('photo_edit_row' + id);
    er.parentNode.insertBefore(PhotosAdd.genFile(i, 'PhotosAdd.fileRestore(\'' + id + '\', \'' + hash + '\')', getLang('global_restore')), er);
    hide(er);
    PhotosAdd.initFile(i);
    show('photo_cancel' + i);
  },
  fileRestore: function(id, hash) {
    var i = 0, before = '';
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
    ajax.post('al_photos.php', {act: 'restore_photo', photo: id, hash: hash, before: before, edit: 2}, {onDone: function() {
      cur.files[i].deleting = false;
    }});
    var er = ge('photo_edit_row' + id);
    show(er);
    re(er.previousSibling);
  },
  filesDone: function(res) {
    var obj = q2ajx(res);
    PhotosAdd.fetchGeo(obj);
    setTimeout(ajax.post.pbind('al_photos.php', extend({act: 'done_add', context: 2, geo: 1}, obj)), 0);
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
      return animate(ge('photo_flash_needed'), {backgroundColor: '#FFEFE8', borderBottomColor: '#E89B88', borderLeftColor: '#E89B88', borderRightColor: '#E89B88', borderTopColor: '#E89B88'}, 100, function() {
        animate(ge('photo_flash_needed'), {backgroundColor: '#FFFFFF', borderBottomColor: '#CCCCCC', borderLeftColor: '#CCCCCC', borderRightColor: '#CCCCCC', borderTopColor: '#CCCCCC'}, 500);
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
    var dsc = ge('photo_caption' + photo).value, old = (cur.descs || {})[photo];
    delete (cur.descs || {})[photo];
    if (trim(dsc) == old) return;

    ajax.post('al_photos.php', {act: 'save_desc', photo: photo, hash: hash, text: dsc, edit: 1}, {onDone: function(text) {
      ge('photo_save_result' + photo).innerHTML = text;
    }, onFail: function(text) {
      ge('photo_save_result' + photo).innerHTML = '<div class="photo_save_error">' + text + '</div>';
      return true;
    }, showProgress: function() {
      ge('photo_save_result' + photo).innerHTML = getLang('photos_privacy_description');
      show('photo_save_progress' + photo);
    }, hideProgress: function() {
      hide('photo_save_progress' + photo);
    }});
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
      sorter.init('photos_add_list', {onReorder: PhotosAdd.reorderPhoto, dh: 0});
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
    while(first && !hasClass(first, 'photos_add_upl_row')) {
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
    if (cur.album && !cur.scrollFixed) cur.scrollFixed = true;
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
        var w = window, de = document.documentElement, ft = ge('photos_go_to_album');
        if (!w.pageNode) return;
        var xy = getXY(ft.parentNode), sz = getSize(ft),
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
        id: 'photos_add_controls'+photo,
        className: 'photos_add_controls',
        innerHTML: '<div class="photos_add_c_bar"><a class="photos_add_rl" onclick="PhotosAdd.rotateAngle(\''+photo+'\', 90);"></a><a class="photos_add_rr" onclick="PhotosAdd.rotateAngle(\''+photo+'\', -90);"></a></div>'
      });
      obj.appendChild(control);
    }

    PhotosAdd.setThumb(obj, control);
    show(control);

    animate(control, {height: 24, marginTop: control.mtop-24}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
  },

  thumbOut: function(obj) {
    var control = geByClass('photos_add_controls', obj)[0];
    if (!control) {
      return;
    }
    animate(control, {height: 0, marginTop: control.mtop}, 200, function() {
      //hide(control);
    });
  },

  transformAvailable: function() {
    return false;
    if (cur.transformAvailable !== undefined) return cur.transformAvailable;
    var prefixes = 'Webkit Moz ms'.split(' '),
    prefix,
    div = ce('div'),i=0,
    prop = 'transform',
    support = div.style[prop] != undefined;

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    while( !support && (prefix=prefixes[i++]) ){
      support = div.style[prefix+prop] != undefined;
    }
    cur.transformAvailable = support;
    return support;
  },

  rotateAngle: function(photo, angle) {
    var obj = ge('photos_add_img'+photo);
    var control = ge('photos_add_controls'+photo);
    if (control.blocked) return;

    var rotate = obj.rotate || 0;
    rotate += angle;
    obj.rotate = rotate;

    var imgSize = getSize(obj);

    var row = ge('photo_edit_row'+photo);
    var onUpdate = function() {
      if (!cur.noSortPhotos) sorter.update(row);
      clearInterval(updInt);
      if (Math.abs(rotate) % 180 != 90 && (imgSize[0] - imgSize[1] > 15)) {
        PhotosAdd.thumbOut(ge('photos_add_thumb'+photo));
      }
    };

    if (imgSize[0] > imgSize[1] && this.transformAvailable()) {
      if (!cur.noSortPhotos) {
        var updInt = setInterval(sorter.update.pbind(row), 10);
      }
      if (Math.abs(rotate) % 180 == 90) {
        animate(obj.parentNode, {
          marginTop: ((imgSize[0] - imgSize[1]) / 2),
          marginBottom: ((imgSize[0] - imgSize[1]) / 2)
        }, 200, onUpdate);
      } else {
        animate(obj.parentNode, {
          marginTop: 0,
          marginBottom: 0
        }, 200, onUpdate);
      }
    }
    if (!cur.noSortPhotos) {
      sorter.update(row);
    }
    if (this.transformAvailable()) {
      obj.style.webkitTransform = 'rotate('+rotate+'deg)';
      obj.style.MozTransform = 'rotate('+rotate+'deg)';
      obj.style.msTransform = 'rotate('+rotate+'deg)';
      PhotosAdd.setThumb(ge('photos_add_thumb'+photo), control);
      animate(control, {marginTop: control.mtop - 24}, 200);
    } else {
      var imgDiv = obj.parentNode.parentNode, xy = getXY(imgDiv), sz = getSize(imgDiv), w = 46, h = 16, l = Math.floor((sz[0] - w) / 2), t = Math.floor((sz[1] - h) / 2);
      setStyle(imgDiv, {position: 'relative'});
      var el = ce('div', {innerHTML: '<div id="rotating_image'+photo+'" class="progress_inv_img" style="display: block; position: absolute; width: '+w+'px; height: '+h+'px; left: '+l+'px; top: '+t+'px;">'}).firstChild;
      obj.parentNode.insertBefore(el, obj);
    }
    control.blocked = true;
    cur.rotateTimers = cur.rotateTimers || {};
    cur.rotateTimers[photo] = setTimeout(PhotosAdd.rotateFailed.pbind(photo), 5000);

    var ph = cur.photoData[photo];
    form = ge('photo_rotate_form'+photo);
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
    if (data['rot'+to]) {
      data.act = 'done_rotate';
      data.complete = 1;
      ajax.post('/al_photos.php', data, {
        onDone: PhotosAdd.rotateDone,
        onFail: function() {
          PhotosAdd.rotateDone();
        }
      });
      return;
    }
    for (var i in data) {
      if (i != 0) {
        form.appendChild(ce('input', {type: 'hidden', name: i, value: data[i]}));
      }
    }
    form.submit();

    obj.parentNode.onclick = function() {
      cur.photoData[photo].onRotateShow = true;
      return false;
    }

    ajaxCache = {};
    delete cur.pvList;
    delete cur.pvData;
  },

  rotateDone: function(data) {
    if (!data) {
      return;
    }
    var photo = data['photo_raw'];
    var obj = ge('photos_add_img'+photo);
    var control = ge('photos_add_controls'+photo);
    delete control.blocked;
    if (!PhotosAdd.transformAvailable()) {
      re('rotating_image'+photo);
      obj.src = data.o_src  || data.m_src;
      obj.onload = function() {
        PhotosAdd.setThumb(ge('photos_add_thumb'+photo), control);
        if (!cur.noSortPhotos) {
          sorter.update(ge('photo_edit_row'+photo));
        }
      };
      cur.rotateTimers = cur.rotateTimers || {};
      clearTimeout(cur.rotateTimers[photo]);
    }
    delete data.m_;
    delete data.o_;

    var ph = cur.photoData[photo];

    extend(ph.rotate, {photo: data.photo, hash: data.hash, rhash: data.rhash, angle: data.angle, rot1: data.rot1, rot3: data.rot3});

    ajaxCache = {};
    delete cur.pvList;
    delete cur.pvData;

    obj.parentNode.onclick = function(ev) {
      return showPhoto(photo, 'album' + ph['album'], {temp: {base: data['base'], x_: data['x_'], y_: data['y_'], z_: data['z_']}, dark: 1}, ev);
    }

    if (cur.photoData[photo].onRotateShow) {
      obj.parentNode.onclick();
    }
    cur.photoData[photo].onRotateShow = false;
  },

  rotateFailed: function(photo) {
    if (!PhotosAdd.transformAvailable()) {
      re('rotating_image'+photo);
    }
    var control = ge('photos_add_controls'+photo);
    delete control.blocked;
  },

  deleteAddPhoto: function(i) {
    var obj = qsorter.remove(cur.uplBox, ge('photos_add_item'+i));
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

    var control = ge('photos_add_controls'+i);
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
    var w = window, de = document.documentElement;
    if (!el) el = cur.lastPhotoRow;
    if (!w.pageNode || !el) return;
    var xy = getXY(el), sz = getSize(el),
        dheight = Math.max(intval(w.innerHeight), intval(de.clientHeight));
    if (xy[1] <= 0) xy = getXY(el.parentNode);
    var scrollY = xy[1] + sz[1] - dheight;
    if (scrollY > 0) scrollToY(scrollY, 400);
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
        var pc = ge('photos_container') || ge('photos_albums_container'), pa = ge('photos_upload_area'), tab = ge('photo_add_tab');
        pc.parentNode.insertBefore(ce('div', {innerHTML: cur.photosAddWrap}).firstChild, pc);
        pa.parentNode.insertBefore(ce('div', {innerHTML: cur.photosAddBar}).firstChild, pa);
        setStyle(ge('lite_photo_uploader'), {width: '1px', height: '1px'});
        hide(pc, pa, 'add_album_link');
        re(pa);
        re('photos_container');
        re('photos_albums_container');
        re('albums_load_more');
        re('photos_load_more');
        re(geByClass1('summary_wrap', ge('photos_upload_area_wrap').parentNode));
        re(geByClass1('photos_summary', ge('photos_upload_area_wrap').parentNode));
        show(tab);
        var w = 180;
        while (tab.previousSibling && getXY(tab)[1] > getXY(tab.previousSibling)[1] && w > 100) {
          w -= 10;
          var tabW = geByClass1('tab_word', tab.previousSibling);
          if (!tabW) break;
          setStyle(tabW, {maxWidth: w});
        }
        PhotosAdd.activeTab(tab.firstChild);
        PhotosAdd.initHtml5();
        if (cur.albums) {
          cur.movedd = new Dropdown(ge('photos_move_dd'), cur.albums, {
            width: 200,
            multiselect: false,
            autocomplete: (cur.albums.length > 7),
            onChange: photos.movePhoto
          });
          cur.moveddc = ge('photos_movedd_container').firstChild;
        }
      }
      hide('photos_add_empty', 'photos_go_to_album');
      show('photos_add_box');
      addClass(ge('photos_add_wrap'), 'photos_add_selected');
      show(ge('photos_add_bar').parentNode);
      if (browser.msie) {
        setStyle(ge('photos_add_bar_form'), {position: 'absolute', top: '-5000px'});
      } else {
        setStyle(ge('photos_add_bar_form'), {visibility: 'hidden'});
      }
      if (browser.mozilla && ge('lite_photo_uploader')) {
        setStyle(ge('lite_photo_uploader'), {visibility: 'hidden'});
      }
      show('photos_add_bar_progress');
      if (info.totalCount > 1) {
        var txt = (cur.uploaderLang['photos_add_uploading_X'] || '').replace('%s', info.totalCount);
      } else {
        var txt = cur.uploaderLang['photos_add_uploading'];
      }
      ge('photos_add_p_text').innerHTML = txt;
      cur.scrollBarFixedY = false;
      cur.uploadStarted = true;
      setStyle(ge('photos_add_p_inner'), {width: '0px'});
      hide('photos_add_error');
    } else {
      var lng = langNumeric(info.num, cur.uploaderLang['photos_add_uploaded_X'])
      ge('photos_add_p_text').innerHTML = lng.replace('{count}', info.totalCount);
    }
    var classAdd = '';

    if (!cur.photosAddFirst) {
      cur.photosAddFirst = true;
      classAdd = ' photos_add_first_child';
    }
    info.prepareCont = ce('div', {
      className: 'photos_add_upl_row'+classAdd,
      innerHTML: '<div class="photos_add_s_loading"></div>'
    });
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
      PhotosAdd.scrollToBottom();
      return true; // need to flush
    });
    cur.uplSelected = true;

    setStyle(ge('photos_add_p_inner'), {width: (info.loadedSize / info.totalSize  * 175)+'px'});
    ajax.post('al_photos.php', {act: 'start_add', hash: cur.statsPhotoAddHash});
  },

  onUploadProgress: function(info, start, all) {
    if (cur.flash_lite) {
      info = {loadedSize: start, totalSize: all};
      start = 0;
    }

    var allProgress = (info.loadedSize + start) / info.totalSize;
    var newWidth = allProgress * 175;
    var oldWidth = intval(ge('photos_add_p_inner').style.width);
    if (newWidth > oldWidth) {
      animate(ge('photos_add_p_inner'), {width: newWidth}, 200);
    }
  },

  onUploadComplete: function(info, res) {
    if (cur.flash_lite) {
      info.prepareCont = cur.flashPrepareCont[info.num][info.filename];
    }
    var obj;
    try {
      obj = eval('(' + res + ')');
    } catch(e) {
      obj = q2ajx(res);
    }
    if (!obj.photos) {
      cur.errorCount++;
      re(info.prepareCont);
      if (info.prepareCont && info.prepareCont.helper) re(info.prepareCont.helper);
      ge('photos_add_error').innerHTML = cur.uploaderLang['photos_add_error'];
      show('photos_add_error');
      scrollToTop(200);
      PhotosAdd.makeTask();
      return;
    }
    if (obj.code) {
      Upload.onUploadError(cur.UplId, obj.code);
      return;
    }
    PhotosAdd.fetchGeo(obj);
    var params = extend({act: 'done_add', from: 'html5', context: 1, geo: 1}, obj);
    cur.lastPhotoRow = info.prepareCont;
    cur.photoSaveQ = cur.photoSaveQ || [];
    cur.photoSaveQ.push(function() {
      ajax.post('al_photos.php', params, {
        onDone: function(html, js, photoRaw) {
          hide('photos_add_error');
          cur.count++;
          info.prepareCont.innerHTML = html;
          eval(js);
          cur.savedPhotos = cur.savedPhotos || [];
          cur.savedPhotos.push(photoRaw);
          if (!cur.movedd) hide('photos_move_link'+photoRaw);
          show(info.prepareCont);
          info.prepareCont.id = 'photo_edit_row'+photoRaw;
          PhotosAdd.makeTask();
          setTimeout(function() {
            if (!cur.noSortPhotos) {
              sorter.added(info.prepareCont.parentNode);
            }
            setTimeout(PhotosAdd.scrollToBottom, 100);
          }, 0);
          cur.photoSaveQ.shift();
          if (cur.photoSaveQ[0]) cur.photoSaveQ[0]();
          if (cur.onPhotoFirstUploaded) cur.onPhotoFirstUploaded();
          if (window._tbLink && _tbLink.loc) {
            cur.__phinputs = cur.__phinputs || [];
            globalHistoryDestroy(_tbLink.loc);
          }
        },
        onFail: function(text) {
          if (text) {
            ge('photos_add_error').innerHTML = text;
            show('photos_add_error');
            scrollToTop(200);
          }
          cur.errorUpload = true;
          if (hasClass(info.prepareCont, 'photos_add_first_child')) {
            var next = info.prepareCont.nextSibling;
            while(next) {
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

  updateSorterRow: function(photo) {
    if (!cur.noSortPhotos) {
      setTimeout(function() {
        sorter.update(ge('photo_edit_row'+photo));
      }, 0)
    }
  },

  onUploadCompleteAll: function(info, res) {
    cur.uploadStartProgress = 0;
    delete cur.uploadStarted;
    window.onbeforeunload = cur.prevBefUnload;
    delete cur.unloadInited;
    this.onUploadProgress({loadedSize: 100, totalSize: 100}, cur.flash_lite ? 100 : 0, 100);
    PhotosAdd.makeTask(function() {
      var infoCont = ge('photo_upload_area_label'), infoText = infoCont.innerHTML;
      hide('photos_add_more_info');
      if (!cur.errorUpload) {
        infoCont.innerHTML = langNumeric((info.totalCount || res.totalCount) - (cur.errorCount || 0), cur.uploaderLang['photos_successfully_added']);
      } else {
        infoCont.innerHTML = cur.uploaderLang['photos_add_error'];
        cur.errorUpload = false;
      }
      toggleClass(infoCont, "photos_upload_area_img", false);
      fadeIn(infoCont, 500, function() {
        setTimeout(function() {
          fadeOut(infoCont,300, function() {
            if ((cur.savedPhotos || []).length >= (cur.maxFiles || 200)) {
              slideUp('photos_upload_area_wrap', 200, function() {re('photos_upload_area_wrap')});
            } else {
              if (cur.flash_lite) {
                re('lite_photo_uploader');
                var par = ge('photos_upload_area'),
                    el = ce('div', {innerHTML: '<div id="lite_photo_uploader" style="position: absolute; height: 100%; width: 100%; z-index: 9999; cursor: pointer;"></div>'}).firstChild;
                par.parentNode.insertBefore(el, par);
                cur.initFlashLite();
              } else if (cur.html5AddLink){
                var par = ge('photos_upload_area'), el = ce('div', {innerHTML: cur.html5AddLink}).firstChild;
                par.id = 'remove_in_process';
                par.parentNode.insertBefore(el, par);
                re(par);
                infoCont = ge('photo_upload_area_label');
              }
              toggleClass(infoCont, "photos_upload_area_img", true);
              infoCont.innerHTML = infoText;
              fadeIn(infoCont, 300);
            }
          })
        }, 2000);
      })
      show('photos_go_to_album');
      cur.lastPhotoRow = ge('photos_go_to_album');
      PhotosAdd.scrollToBottom();
      if (cur.flash_lite) {
        re('lite_photo_uploader');
      }
      fadeOut('photos_add_bar_progress', 500);
      if (browser.msie) {
        setStyle(ge('photos_add_bar_form'), {position: 'relative', top: '0px', display: 'none'});
      } else {
        setStyle(ge('photos_add_bar_form'), {visibility: 'visible', display: 'none'});
      }
      fadeIn('photos_add_bar_form', 500);
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
        coords[lat+','+long] = 1;
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
      }).geocode({location: new google.maps.LatLng(lat, long), language: lngcode})
    }
  }

}

try{stManager.done('photos_add.js');}catch(e){}
