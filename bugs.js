Bugs = {

init: function() {
  cur.module = 'bugs';
  cur.nav.push((function(changed, old, n) {
    if (changed[0] === undefined && changed['act']) {
      if (n['act'] != 'show' && old['act'] != 'show') {
        this.switchSection(n['act']);
      } else {
        this.loadBugsPage(n);
      }
      return false;
    }
  }).bind(this));
},

loadBugsPage: function(objLoc) {
  var query = extend({part: 1}, objLoc);
  delete query[0];
  ajax.post('/bugs', query, {
    onDone: function(content, script) {
      if (ge('bugs_content')) {
        ge('bugs_content').innerHTML = content;
      }
      if (script) eval(script);
      window.Dev && Dev.checkBlockHeight();
      if (window.tooltips) tooltips.hideAll();
      scrollToTop();
      nav.setLoc(objLoc);
    }
  })
},

switchSection: function(name) {
  cur.params = {act: name, load: 1};
  val('bugs_search_input', '');
  removeClass(ge('bugs_search_reset'), 'shown');
  this.searchAll();
},

getPage: function(offset) {
  show('bugs_pages_top');
  show('bugs_pages_bottom');
  var _n = nav.objLoc, act = nav.objLoc.act || cur.section, query = {act: act, offset: offset, load: 1};
  for (var v in _n) {
    if (v != '0' && v != 'act' && v != 'offset') query[v] = _n[v];
  }
  ajax.post('bugs', query, {
    cache: 1,
    onDone: function(content, script, filters) {
      ge('bugs_table').innerHTML = content;
      if (ge('bugs_filters')) {
        ge('bugs_filters').innerHTML = filters;
      }
      if (script) eval(script);
      window.Dev && Dev.checkBlockHeight();
      if (window.tooltips) tooltips.hideAll();
      scrollToTop();
      if (offset) {
        extend(nav.objLoc, {offset: offset});
      } else {
        delete nav.objLoc.offset;
      }
      nav.setLoc(nav.objLoc);
    },
    hideProgress: function() {
      hide('bugs_pages_top');
      hide('bugs_pages_bottom');
    }
  });
  return false;
},

subscribeBug: function(btn, subscribe) {
  ajax.post('bugs', {act: 'subscribe', id: cur.bug_id, subscribe: subscribe, hash: cur.hashes.subscribe_hash}, {
    onDone: function(html) {
      if (html) ge('bugs_view_subscribe').innerHTML = se(html).innerHTML;
    },
    showProgress: lockButton.pbind(btn),
    hideProgress: unlockButton.pbind(btn)
  })
},


getSearchParams: function(obj) {
  var params = {q: trim(val(obj)), load: 1, cache: 1};
  var status = 0;
  if (cur.bugsDD) {
    status = intval(cur.bugsDD.val());
  }
  if (!status) {
    status = (isChecked('bugs_chk_opened') ? 1 : 0) + (isChecked('bugs_chk_closed') ? 2 : 0) + (isChecked('bugs_chk_declined') ? 4 : 0);
  }
  if (cur.tags) {
    var tags = [];
    for (var i in cur.tags) {
      tags.push(i);
    }
    if (tags.length) params.tags = tags.join(',');
  }
  var defaultStatus = cur.type == 'subscriptions' ? 7 : 1;
  if (status != defaultStatus) params.status = '' + status;
  if ((params.q || params.tags) && nav.objLoc != 'all' && nav.objLoc.act != 'trending') {
    nav.objLoc.act = 'all';
  }
  if (nav.objLoc.act) params.act = nav.objLoc.act;
  return params;
},
sameParams: function(params) {
  if (!cur.params) return false;
  for (var i in params) {
    if (params[i] != cur.params[i]) return false;
  }
  for (var i in cur.params) {
    if (params[i] != cur.params[i]) return false;
  }
  return true;
},

updateAllSearch: function(obj, e, delay) {
  if (e && e.keyCode == KEY.ESC) {
    Bugs.clearAllSearch();
  }
  delay = delay || 10;
  clearTimeout(cur.searchTimeout);
  cur.searchTimeout = setTimeout((function() {
    var params = Bugs.getSearchParams(obj);
    toggleClass(ge('bugs_search_reset'), 'shown', !!params.q);
    if ((!Bugs.sameParams(params) || cur.ignoreEqual)) {
      delete cur.ignoreEqual;
      cur.params = params;
      Bugs.searchAll();
    }
    scrollToTop();
  }).bind(this), delay);
},

searchAll: function() {
  var query = cur.params || Bugs.getSearchParams(ge('bugs_search_input'));
  if (query.q || query.tags) {
    window.AppsEdit && AppsEdit.animSubTab(ge('tab_' + query.act));
  }
  ajax.post('bugs', query, {
    cache: 1,
    onDone: function(cont, script, filters) {
      ge('bugs_table').innerHTML = cont;
      if (ge('bugs_filters')) {
        ge('bugs_filters').innerHTML = filters;
      }
      if (script) eval(script);
      window.Dev && Dev.checkBlockHeight();
      delete nav.objLoc.offset;
      each(['q', 'status', 'tags', 'act'], function(i, v) {
        if (query[v]) {
          nav.objLoc[v] = query[v];
        } else {
          delete nav.objLoc[v];
        }
      });
      nav.setLoc(nav.objLoc);
    },
    showProgress: addClass.pbind(ge('bugs_search'), 'loading'),
    hideProgress: removeClass.pbind(ge('bugs_search'), 'loading')
  });
},

clearAllSearch: function() {
  var field = ge('bugs_search_input');
  field.value = '';
  field.focus();
  this.updateAllSearch(field, false);
},

showNewBox: function() {
  return !showBox('bugs', {act: 'new_box'}, {
    stat: ['wide_dd.js', 'wide_dd.css', 'page.css', 'page.js', 'upload.js'],
    cache: 1,
    dark: 1,
    params: {
      width: 500,
      hideButtons: true,
      bodyStyle: 'border: 0px; padding: 0px'
    }
  });
},

checkTextLength: function(el, maxLen, warn) {
  var v = trim(el.value).replace(/\n\n\n+/g, '\n\n');
  if (el.lastLen === v.length) return;

  var realLen = el.lastLen = v.length;
  var brCount = realLen - v.replace(/\n/g, '').length;

  warn = ge(warn);
  if (realLen > maxLen - 100 || brCount > 10) {
    show(warn);
    if (realLen > maxLen) {
      warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
    } else if (brCount > 10) {
      warn.innerHTML = getLang('global_recommended_lines', brCount - 10);
    } else {
      warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
    }
  } else {
    hide(warn);
  }
},

checkNewFields: function(bug_id) {
  if (!trim(val('bugs_new_title'))) {
    notaBene(ge('bugs_new_title'));
    return false;
  }
  if (!bug_id && !curBox().changed) {
    notaBene('bugs_new_text');
    return false;
  }
  if (cur.wdd && cur.wdd.wdd_new_tags) {
    var tags = [];
    for (var i in cur.wdd.wdd_new_tags.selected) {
      tags.push(cur.wdd.wdd_new_tags.selected[i][0]);
    }
    if (!tags.length) {
      notaBene(ge('wdd_new_tags'));
      notaBene(ge('bugs_new_tags'));
      return false;
    }
  }

  return true;
},

saveBug: function(bug_id) {
  if (!this.checkNewFields(bug_id)) return false;

  var query = {act: 'save', hash: cur.hashes.save_hash, title: trim(val('bugs_new_title')), text: val('bugs_new_text')};
  if (bug_id) {
    query.id = bug_id;
  }
  if (cur.wdd && cur.wdd.wdd_new_tags) {
    var tags = [];
    for (var i in cur.wdd.wdd_new_tags.selected) {
      tags.push(cur.wdd.wdd_new_tags.selected[i][0]);
    }
    if (tags.length) {
      query.tags = tags;
    }
  }
  var attachs = [], chosen = cur.bugsNewMedia.chosenMedias;
  if (attachs) {
    for (var i in chosen) {
      var att = chosen[i], type = att[0], value = att[1];
      if (type == 'photo' || type == 'doc') {
        attachs.push(type+','+value);
      }
    }
  }
  if (attachs.length) query.attachs = attachs;
  ajax.post('bugs', query, {
    showProgress: lockButton.pbind('bugs_submit_button'),
    hideProgress: function() {
      if (curBox()) curBox().hide();
    },
    onDone: function(description, data, msg) {
      if (description) ge('bugs_view_description').innerHTML = description;
      if (data) ge('bugs_view_data').innerHTML = data;
      if (msg) Bugs.showMsg(msg);
    },
    onFail: function(msg) {
      return Bugs.showError(msg);
    }
  });
  return false;
},
addBug: function() {
  return Bugs.saveBug();
},
editBug: function() {
  return Bugs.saveBug(cur.bug_id);
},

addScreen: function(onShow) {
  var opts = {title: getLang('bugs_adding_screen'), width: 440, bodyStyle: 'padding: 0px'};
  if (onShow) {
    opts.onShow = onShow;
  }
  return showFastBox(opts, cur.screenBox);
},
addDoc: function(onShow) {
  var opts = {title: getLang('bugs_adding_doc'), width: 440, bodyStyle: 'padding: 0px'};
  if (onShow) {
    opts.onShow = onShow;
  }
  return showFastBox(opts, cur.docBox);
},
choosePhotoUploaded: function(info, params) {
  var i = info.ind !== undefined ? info.ind : info,
      fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
      ind = info.fileName ? i + '_' + info.fileName : info,
      prg = ge('upload' + ind + '_progress_wrap');

  prg && hide(geByClass1('progress_x', prg));
  ajax.post('al_photos.php', extend({act: 'choose_uploaded_support'}, params), {
    onDone: function(media, data) {
      cur.bugsNewMedia.chooseMedia('photo', media, extend(data, {upload_ind: i + '_' + fileName}));
    },
    onFail: Bugs.chooseFail.pbind(info)
  });
},
chooseDocUploaded: function(info, params) {
  var i = info.ind !== undefined ? info.ind : info,
      fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
      ind = info.fileName ? i + '_' + info.fileName : info,
      prg = ge('upload' + ind + '_progress_wrap');

  prg && hide(geByClass1('progress_x', prg));
  ajax.post('docs.php', extend({act: 'a_save_doc', from: 'choose'}, params), {
    onDone: function(oid, id, data) {
      re('upload'+ind+'_progress_wrap');
      cur.bugsNewMedia.chooseMedia('doc', oid+'_'+id, data);
    },
    onFail: Bugs.chooseFail.pbind(info)
  });
},
chooseFail: function(info, code) {
  var i = info.ind !== undefined ? info.ind : info,
      fileName = (info.fileName || info).replace(/[&<>"']/g, '');
  if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
    var lnkId, ind = info.fileName ? i+'_'+info.fileName : info;
    if (cur.imMedia) {
      re('upload'+ind+'_progress_wrap');
      lnkId = cur.imMedia.lnkId;
      cur.addMedia[lnkId].unchooseMedia();
    } else if (cur.addMedia) {
      re('upload'+ind+'_progress_wrap');
      lnkId = (cur.attachMediaIndexes || {})[fileName];
      if (lnkId) cur.addMedia[lnkId].unchooseMedia();
    }
  }
  topError('Upload failed', {dt: -1, type: 102, url: (ge('file_uploader_form' + i) || {}).action});
  Upload.embed(i);
},

initPhotoUpload: function(el, params) {
  el = ge(el);
  if (!el) return;

  if (!cur.screens) cur.screens = {};
  var uploadData = cur.uploadPhotoData, opts = uploadData.options;
  return Upload.init(el, uploadData.url, uploadData.vars, {
    file_name: 'photo',

    file_size_limit: 1024*1024*5, // 5Mb
    file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
    file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
    accept: 'image/jpeg,image/png,image/gif',
    file_match: '\.(gif|jpg|jpeg|png)$',
    lang: opts.lang,

    onUploadStart: function(info, res) {
      var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
      if (Upload.types[i] == 'form') {
        geByClass1('file', el).disabled = true;
      }
      if (Upload.types[i] == 'fileApi') {
        if (cur.notStarted) {
          if (params && params.hideOnStart) boxQueue.hideLast();
          delete cur.notStarted;
        }
        if (options.multi_progress) this.onUploadProgress(info, 0, 0);
      }
      curBox().changed = true;
    },
    onUploadComplete: function(info, res) {
      var fileName = (info.fileName || info).replace(/[&<>"']/g, ''), params;
      try {
        params = eval('(' + res + ')');
      } catch(e) {
        params = q2ajx(res);
      }
      if (!params.photos) {
        Upload.onUploadError(info);
        return;
      }
      Bugs.choosePhotoUploaded(info, params);
    },
    onUploadProgress: function(info, bytesLoaded, bytesTotal) {
      var i = info.ind !== undefined ? info.ind : info;
      if (Upload.types[i] == 'fileApi') {
        var lnkId = (cur.attachMediaIndexes || {})[i];
        if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
          var data = {loaded: bytesLoaded, total: bytesTotal};
          if (info.fileName) {
            data.fileName = info.fileName.replace(/[&<>"']/g, '');
          }
          cur.bugsNewMedia.showMediaProgress('photo', i, data);
        }
      } else if (Upload.types[i] == 'flash') {
        if (!ge('form'+i+'_progress')) {
          var obj = Upload.obj[i], objHeight = getSize(obj)[1], tm = objHeight / 2 + 10;
          var node = obj.firstChild;
          while (node) {
            if (node.nodeType == 1) {
              if (node.id == 'uploader'+i && browser.msie) {
                setStyle(node, {position: 'relative', left: '-5000px'});
              } else {
                setStyle(node, {visibility: 'hidden'});
              }
            }
            node = node.nextSibling;
          }
          obj.appendChild(ce('div', {innerHTML: '<div class="bugs_progress_wrap">\
            <div id="form' + i + '_progress" class="bugs_progress" style="width: 0%;"></div>\
          </div></div>'}, {height: tm + 'px', marginTop: -tm + 'px'}));
        }
        var percent = intval(bytesLoaded / bytesTotal * 100);
        setStyle(ge('form' + i + '_progress'), {width: percent + '%'});
      }
    },
    onUploadError: Bugs.chooseFail,
    onUploadCompleteAll: function (info) {
      var i = info.ind !== undefined ? info.ind : info;
      if (Upload.types[i] !== 'fileApi') {
        if (params.hideOnStart) {
          boxQueue.hideLast();
        } else {
          Upload.embed(i);
        }
      }
    },

    multiple: 1,
    multi_progress: 1,
    max_files: params && params.max_files || 5,
    max_files_hide_last: 1,
    clear: 1,
    type: 'photo',
    max_attempts: 3,
    file_input: curBox().inp,
    server: opts.server,
    error: opts.default_error,
    error_hash: opts.error_hash,
    dropbox: 'bas_dropbox'
  });
},

initDocUpload: function(el, params) {
  el = ge(el);
  if (!el) return;

  var uploadData = cur.uploadDocData, opts = uploadData.options;
  return Upload.init(el, uploadData.url, uploadData.vars, {
    file_name: 'file',

    file_size_limit: 1024*1024*200, // 200Mb
    file_types_description: 'Documents',
    file_types: '*.*;',
    lang: opts.lang,

    onUploadStart: function(info, res) {
      var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
      if (Upload.types[i] == 'form') {
        geByClass1('file', el).disabled = true;
      }
      if (Upload.types[i] == 'fileApi') {
        if (cur.notStarted) {
          if (params && params.hideOnStart) boxQueue.hideLast();
          delete cur.notStarted;
        }
        if (options.multi_progress) this.onUploadProgress(info, 0, 0);
      }
      curBox().changed = true;
    },
    onUploadComplete: function(info, res) {
      var fileName = (info.fileName || info).replace(/[&<>"']/g, ''), params;
      try {
        params = eval('(' + res + ')');
      } catch(e) {
        params = q2ajx(res);
      }
      if (!params.file) {
        Upload.onUploadError(info);
        return;
      }
      Bugs.chooseDocUploaded(info, params);
    },
    onUploadProgress: function(info, bytesLoaded, bytesTotal) {
      var i = info.ind !== undefined ? info.ind : info;
      if (Upload.types[i] == 'fileApi') {
        var lnkId = (cur.attachMediaIndexes || {})[i];
        if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
          var data = {loaded: bytesLoaded, total: bytesTotal};
          if (info.fileName) {
            data.fileName = info.fileName.replace(/[&<>"']/g, '');
          }
          cur.bugsNewMedia.showMediaProgress('doc', i, data);
        }
      } else if (Upload.types[i] == 'flash') {
        if (!ge('form'+i+'_progress')) {
          var obj = Upload.obj[i], objHeight = getSize(obj)[1], tm = objHeight / 2 + 10;
          var node = obj.firstChild;
          while (node) {
            if (node.nodeType == 1) {
              if (node.id == 'uploader'+i && browser.msie) {
                setStyle(node, {position: 'relative', left: '-5000px'});
              } else {
                setStyle(node, {visibility: 'hidden'});
              }
            }
            node = node.nextSibling;
          }
          obj.appendChild(ce('div', {innerHTML: '<div class="bugs_progress_wrap">\
            <div id="form' + i + '_progress" class="bugs_progress" style="width: 0%;"></div>\
          </div></div>'}, {height: tm + 'px', marginTop: -tm + 'px'}));
        }
        var percent = intval(bytesLoaded / bytesTotal * 100);
        setStyle(ge('form' + i + '_progress'), {width: percent + '%'});
      }
    },
    onCheckComplete: params && params.onCheckComplete || false,
    onUploadError: Bugs.chooseFail,
    onUploadCompleteAll: function (info) {
      var i = info.ind !== undefined ? info.ind : info;
      if (Upload.types[i] !== 'fileApi') {
        if (params.hideOnStart) {
          boxQueue.hideLast();
        } else {
          Upload.embed(i);
        }
      }
    },

    multiple: 1,
    multi_progress: 1,
    max_files: params && params.max_files || 5,
    max_files_hide_last: 1,
    clear: 1,
    type: 'photo',
    max_attempts: 3,
    file_input: curBox().inp,
    server: opts.server,
    error: opts.default_error,
    error_hash: opts.error_hash,
    dropbox: 'bas_dropbox'
  });
},

initAddMedia: function(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {photo: 3, doc: -64}, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false;
    switch (v[0]) {
      case 'photo':
        handler = function() {
          if (opts.oneClick) {
            var inp = ge('bug_photo_input'), par = ge('bugs_view_comments') || curBox() && geByClass1('bugs_new_cont', curBox().bodyNode);
            if (!inp) inp = par.appendChild(ce('input', {
              type: 'file',
              multiple: 'true',
              id: 'bug_photo_input',
              onchange: function() {
                data(this, 'changed', true);
                curBox().inp = this;
                Bugs.initPhotoUpload('bas_upload');
              }
            }));
            inp.click();
          } else {
            Bugs.addScreen(Bugs.initPhotoUpload.pbind('bas_add_data', {hideOnStart: true}));
          }
        }
        break;
      case 'doc':
        handler = function() {
          if (opts.oneClick) {
            var inp = ge('bug_doc_input'), par = ge('bugs_view_comments') || curBox() && geByClass1('bugs_new_cont', curBox().bodyNode);
            if (!inp) inp = par.appendChild(ce('input', {
              type: 'file',
              multiple: 'true',
              id: 'bug_doc_input',
              onchange: function() {
                data(this, 'changed', true);
                curBox().inp = this;
                Bugs.initDocUpload('bas_upload');
              }
            }));
            inp.click();
          } else {
            Bugs.addDoc(Bugs.initDocUpload.pbind('bas_add_data', {hideOnStart: true}));
          }
        }
        break;
    }
    var icon = false, bgpos = ('3px ' + bgposes[v[0]] + 'px'), url = false, name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var limit = opts.limit || 10;

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
      cur.showMediaProgress = addMedia.showMediaProgress;
      cur.attachCount = addMedia.attachCount;
    },
    onItemClick: function(type) {
      if (addMedia.attachCount() >= limit) {
        showFastBox(getLang('global_error'), getLang('attachments_limit', limit));
        return false;
      }
      return true;
    }
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      previewEl = ge(previewId),
      progressEl, picsEl, docsEl;

  val(previewEl, '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>');
  var picsEl = previewEl.childNodes[0],
      docsEl = previewEl.childNodes[1],
      progressEl = previewEl.childNodes[2];
  removeClass(previewEl, 'media_preview');
  addClass(previewEl, 'multi_media_preview');

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    menu: menu,
    handlers: {},
    chosenMedias: [],
    _showAddMedia: function() {
      menu.show();
    },
    _hideAddMedia: function(noTimeout) {
      menu.hide(noTimeout);
    },
    chooseMedia: function(type, media, data, url, noboxhide) {
      if (addMedia.onChange && addMedia.onChange(type, media, data) === false) {
        return false;
      }
      if (addMedia.attachCount() >= limit && data.upload_ind === undefined) {
        return false;
      }
      var preview = '', postview = '', toPics = false, oncl;
      switch (type) {
        case 'photo':
          if (!isObject(data)) {
            data = {
              thumb_m: data[0] || '',
              thumb_s: data[1] || '',
              list: data[2] || '',
              view_opts: data[3] || '',
              upload_ind: data.upload_ind || undefined
            };
          }
          vkImage().src = data.thumb_s;
          oncl = opts.nocl ? '' : ' onclick="return Bugs.showPhoto(\'' + media + '\', \'' + data.list + '\', ' + data.view_opts.replace(/"/g, '&quot;') + ');"';
          preview = '<div ' + oncl + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + data.thumb_s + '" /></div>';
          toPics = true;
          break;
        case 'doc':
          if (!data.lang) return false;
          if (data.thumb && data.thumb_s) {
            preview = '<a target="_blank" href="' + data.href + '" class="fl_l"><div class="page_preview_doc_photo"><img src="' + data.thumb_s + '" align="center"></div><div class="page_preview_doc_photo_hint">' + data.title + '</div></a>';
            toPics = true;
          } else {
            preview = '<a target="_blank" href="' + data.href + '" class="medadd_h medadd_h_doc inl_bl">' + data.lang.profile_choose_doc + '</a>';
            postview = '<div class="medadd_c medadd_c_doc"><a target="_blank" href="' + data.href + '">' + data.title + '</a></div>';
          }
          break;
      }
      var medias = addMedia.chosenMedias,
          ind = medias.length,
          mediaEl = (type == 'photos_list') ?
            se('<div class="page_preview_' + type + '_wrap" style="position: relative">' + preview + '<div class="page_photos_count">' + media.split(',').length + '</div></div>') :
            se('<div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + '>' + preview + '<div class="page_media_x_wrap inl_bl" '+ (browser.msie ? 'title' : 'tootltip') + '="'+getLang('bugs_dont_attach')+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [13, 3, 3], black: 1})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + ')"><div class="page_media_x"></div></div>' + postview + '</div>');
      addClass(mediaEl, toPics ? 'fl_l' : 'clear_fix');
      if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
      (toPics ? picsEl : docsEl).appendChild(mediaEl);
      medias.push([type, media, mediaEl, url]);

      toggle(picsEl, picsEl.childNodes.length > 0);
      toggle(docsEl, docsEl.childNodes.length > 0);
      toggle(progressEl, progressEl.childNodes.length > 0);

      if (!cur.fileApiUploadStarted && noboxhide !== true) {
        boxQueue.hideLast();
      }

      cur.lastPostMsg = false;
      if (opts.onMediaAdd) {
        opts.onMediaAdd();
      }

      if (data.upload_ind !== undefined) {
        delete data.upload_ind;
      }
      return false;
    },
    unchooseMedia: function(ind) {
      if (addMedia.onChange && addMedia.onChange(false, ind) === false) {
        return false;
      }
      if (ind === undefined) {
        each (addMedia.chosenMedias, function (k, v) {
          if (v && k !== undefined) addMedia.unchooseMedia(k);
        });
        return;
      }
      var medias = addMedia.chosenMedias, x;
      if (medias[ind]) {
        if ((x = geByClass1('page_media_x_wrap', medias[ind][2], 'div')) && x.tt && x.tt.el) {
          x.tt.destroy();
        }
        re(medias[ind][2]);
        medias[ind] = false;
      }
      toggle(picsEl, picsEl.childNodes.length > 0);
      toggle(docsEl, docsEl.childNodes.length > 0);
      toggle(progressEl, progressEl.childNodes.length > 0);

      cur.lastPostMsg = false;

      if (addMedia.onChange) addMedia.onChange(false);
    },
    showMediaProgress: function(type, i, info) {
      if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
        return false;
      }
      var frac = info.loaded / info.total, percent = intval(frac * 100),
          fileName = (info.fileName || info.name || '').replace(/[&<>"']/g, ''),
          ind = fileName ? i + '_' + fileName : i,
          label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

      var prg = ge('upload' + ind + '_progress');
      if (!prg) {
        if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
        cur.attachMediaIndexes[ind] = lnkId;

        var progress = '\
<div class="fl_l"><div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">\
  <div id="upload' + ind + '_progress" class="page_attach_progress"></div>\
</div></div></div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('bugs_dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\');"></div>';

        progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'}, {marginTop: '6px'}));
        show(progressEl);
        prg = ge('upload' + ind + '_progress');
        prg.full = false;

        if (percent) {
          setStyle(prg, {width: prg.full ? (intval(prg.full * frac) + 'px') : percent + '%'})
        } else {
          setStyle(prg, {width: '1px'});
          hide(prg);
        }
      } else {
        show(prg);
        if (prg.full) {
          var tw = data(prg, 'tween'), w = intval(prg.full * frac);
          if (tw && tw.isTweening) {
            tw.to.width = w;
          } else {
            animate(prg, {width: w + 'px'}, 500);
          }
        } else {
          setStyle(prg, {width: percent + '%'});
        }
      }
    },

    attachCount: function() {
      if (addMedia.attachedCount) {
        return addMedia.attachedCount();
      }
      if (!previewEl) {
        return 0;
      }
      var num = picsEl.childNodes.length + docsEl.childNodes.length + progressEl.childNodes.length;
      return num;
    },
  }

  if (!cur.addMedia) {
    cur.addMedia = {};
  }

  cur.addMedia[lnkId] = addMedia;
  return addMedia;
},

showMsg: function(text) {
  var msg = ge('bugs_msg');
  if (!msg) {
    var parent;
    switch (cur.section) {
      case 'show':
        parent = ge('bugs_content');
        break;
      case 'list':
        parent = ge('bugs_list');
        break;
    }
    msg = parent.insertBefore(ce('div', {id: 'bugs_msg', className: 'msg'}), parent.firstChild);
  }
  re('bugs_error');
  msg.innerHTML = text;
  msg.style.backgroundColor = '#F4EBBD';
  animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
  return true;
},

showError: function(error) {
  var err = ge('bugs_error');
  if (!err) {
    var parent;
    switch (cur.section) {
      case 'show':
        parent = ge('bugs_content');
        break;
      case 'list':
        parent = ge('bugs_list');
        break;
    }
    err = parent.insertBefore(ce('div', {id: 'bugs_error', className: 'error'}), parent.firstChild);
  }
  re('bugs_msg');
  hide('bugs_progress');
  err.innerHTML = error;
  err.style.backgroundColor = '#FACEBB';
  animate(err, {backgroundColor: '#FFEFE8'}, 2000);
  scrollToTop(200);
  return true;
},

showDeleteBox: function() {
  return !showFastBox({title: getLang('bugs_delete_bug_title'), dark: 1, bodyStyle: 'border: 0px; padding: 0px;', width: 460, hideButtons: true}, getLang('bugs_sure_delete_bug'));
},

showEditBox: function() {
  return !showBox('bugs', {act: 'edit_box', id: cur.bug_id}, {
    stat: ['wide_dd.js', 'wide_dd.css', 'page.css', 'page.js', 'upload.js'],
    dark: 1,
    params: {
      width: 500,
      hideButtons: true,
      bodyStyle: 'border: 0px; padding: 0px'
    }
  });
},

showStatusBox: function() {
  return !showBox('bugs', {act: 'status_box', id: cur.bug_id}, {
    stat: ['ui_controls.js', 'ui_controls.css'],
    dark: 1,
    params: {
      width: 500,
      hideButtons: true,
      bodyStyle: 'border: 0px; padding: 0px'
    }
  });
},

saveStatus: function() {
  var query = {act: 'status', hash: cur.hashes.save_hash, status: cur.statusSelect.val(), id: cur.bug_id, text: val('bugs_new_text')};
  ajax.post('bugs', query, {
    showProgress: lockButton.pbind('bugs_submit_button'),
    hideProgress: function() {
      if (curBox()) curBox().hide();
    },
    onDone: function(description, data, msg) {
      if (description) ge('bugs_view_description').innerHTML = description;
      if (data) ge('bugs_view_data').innerHTML = data;
      if (msg) Bugs.showMsg(msg);
    },
    onFail: function(msg) {
      return Bugs.showError(msg);
    }
  });
  return false;
},

declineToSupport: function(hash, msg) {
  if (cur.declineStarted || !hash || !msg) return false;
  cur.declineStarted = true;
  var query = {act: 'status', hash: hash, status: 4, id: cur.bug_id, text: msg};
  ajax.post('bugs', query, {
    hideProgress: function() {
      cur.declineStarted = false;
    },
    onDone: function(description, data, msg) {
      if (description) ge('bugs_view_description').innerHTML = description;
      if (data) ge('bugs_view_data').innerHTML = data;
      if (msg) Bugs.showMsg(msg);
    },
    onFail: function(msg) {
      return Bugs.showError(msg);
    }
  });
  return false;
},

deleteBug: function(btn) {
  ajax.post('bugs', {act: 'delete', id: cur.bug_id, hash: cur.hashes.delete_hash}, {
    showProgress: lockButton.pbind(btn),
    hideProgress: function() {
      if (curBox()) curBox().hide();
    }
  });
},

deleteReply: function(replyId, hash) {
  var el = ge('bug_update'+replyId);
  if (!el) return;
  ajax.post('bugs', {act: 'delete_reply', id: replyId, hash: hash}, {
    onDone: function(msg) {
      cur.deletedReplies = cur.deletedReplies || {};
      cur.deletedReplies[replyId] = el.innerHTML;
      el.innerHTML = msg;
    },
    onFail: function(msg) {
      return Bugs.showError(msg);
    }
  });
  return false;
},

restoreReply: function(replyId, hash) {
  var el = ge('bug_update'+replyId);
  if (!el) return;
  ajax.post('bugs', {act: 'restore_reply', id: replyId, hash: hash}, {
    onDone: function() {
      el.innerHTML = (cur.deletedReplies || {})[replyId];
    },
    onFail: function(msg) {
      return Bugs.showError(msg);
    }
  });
  return false;
},

editReply: function(replyId, hash) {
  if (cur.editStarted) return false;
  if (cur.editing) {
    this.cancelEditReply(cur.editing);
  }
  var cont = geByClass1('bugs_update_text', ge('bug_update'+replyId));
  var mrg = '1px 0 0 -3px', wdt = '385px', btn_mrg = '8px';
  if (browser.mozilla) {
    mrg = '1px 0 0 -4px';
  } else if (browser.opera) {
    mrg = '2px 0 0 -3px';
  } else if (browser.msie) {
    btn_mrg = '10px';
  }

  cur.editStarted = true;
  ajax.post('bugs', {act: 'get_reply', id: replyId, hash: hash}, {
    onDone: function(t) {
      delete cur.editStarted;
      cont.parentNode.insertBefore(ce('div', {id: 'bug_update_edit'+replyId, innerHTML: '\
<textarea class="bug_edit_update" id="bug_update'+replyId+'edit" onkeydown="Bugs.saveReply(event, \''+replyId+'\', \''+hash+'\')" style="width: '+wdt+'; margin: '+mrg+';">' + t + '</textarea>\
<div style="margin: '+btn_mrg+' 0 8px -3px; height: 23px">\
  <div class="fl_l button_blue">\
    <button id="save_butn'+replyId+'" onclick="Bugs.doSaveReply(\''+replyId+'\', \''+hash+'\')">'+getLang('global_save')+'</button>\
  </div>\
  <div class="fl_l button_gray" style="margin-left: 10px;">\
    <button id="cancel_butn'+replyId+'" onclick="Bugs.cancelEditReply(\''+replyId+'\')">'+getLang('global_cancel')+'</button>\
  </div>\
  <div id="edit_progress'+replyId+'" style="margin: 5px 0px 0px 10px; vertical-align: 0px; float: left; display: none"><img src="/images/upload.gif"/></div>\
</div>'}, {display: 'none'}), cont);
      autosizeSetup(ge('bug_update'+replyId+'edit'), {minHeight: 17});

      setTimeout(function() {
        show(cont.previousSibling);
        hide(geByClass1('bugs_update_text', ge('bug_update'+replyId)));
        hide(geByClass1('bugs_update_info', ge('bug_update'+replyId)));
        elfocus('bug_update'+replyId+'edit');
        cur.editing = replyId;
      }, 0);
    },
    onFail: function(error) {
      delete cur.editStarted;
      return Bugs.showError(error);
    }
  });
  return false;
},

saveReply: function(event, replyId, hash) {
  if (event && event.keyCode == 27) {
    this.cancelEditReply(cur.editing);
    return;
  }
  if (event && event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
    this.doSaveReply(replyId, hash);
  }
},

cancelEditReply: function(replyId) {
  show(geByClass1('bugs_update_text', ge('bug_update'+replyId)));
  show(geByClass1('bugs_update_info', ge('bug_update'+replyId)));
  re('bug_update_edit'+replyId);
  delete cur.editing;
},

doSaveReply: function(replyId, hash) {
  var v = trim(val('bug_update'+replyId+'edit'));
  ajax.post('bugs', {act: 'edit_reply', id: replyId, text: v, hash: hash}, {
    onDone: function(text) {
      var cont = geByClass1('bugs_update_text', ge('bug_update'+replyId)), acts = geByClass1('bugs_update_info', ge('bug_update'+replyId));
      cont.innerHTML = text;
      show(cont, acts);
      re('bug_update_edit'+replyId);
      delete cur.editing;
    },
    onFail: function(error) {
      return Bugs.showError(error);
    },
    showProgress: lockButton.pbind(ge('save_butn'+replyId)),
    hideProgress: unlockButton.pbind(ge('save_butn'+replyId))
  });
},

showPhoto: function(photoRaw, listId, opts) {
  var cbox = curBox();
  cur.boxBackup = document.createDocumentFragment();
  var boxBody = cbox.bodyNode;
  cur.scrollTopBack = boxLayerWrap.scrollTop;
  opts.onShow = function() {
    while(boxBody.firstChild) {
      cur.boxBackup.appendChild(boxBody.firstChild);
    }
  }
  opts.onHide = function() {
    box = showFastBox('', '');
    box.setOptions({
      hideButtons: true,
      title: false,
      width: 500,
      bodyStyle: 'border: 0px; padding: 0px;'
    });
    box.bodyNode.appendChild(cur.boxBackup);
    box.setOptions({}); // clear box coords
    boxLayerWrap.scrollTop = cur.scrollTopBack;
  }
  return showPhoto(photoRaw, listId, opts);
},

selectTag: function(tag, e) {
  if (checkEvent(e) || cur.type == 'subscriptions') return false;
  cur.tags = cur.tags || {};
  cur.tags[tag] = 1;
  addClass(ge('filter_tag'+tag), 'summary_tab_sel');
  removeClass(ge('filter_tag'+tag), 'summary_tab');
  ge('bugs_selected_tags').appendChild(ge('filter_tag'+tag));
  toggle('selected_tags_wrap', geByClass('bugs_filter_tag', ge('bugs_selected_tags')).length);
  toggle('tags_wrap', geByClass('bugs_filter_tag', ge('bugs_tags')).length);
  Bugs.updateAllSearch(ge('bugs_search_input'), e);
},
deselectTag: function(tag, e) {
  if (checkEvent(e) || cur.type == 'subscriptions') return false;
  delete cur.tags[tag];
  removeClass(ge('filter_tag'+tag), 'summary_tab_sel');
  addClass(ge('filter_tag'+tag), 'summary_tab');
  ge('bugs_tags').appendChild(ge('filter_tag'+tag));
  toggle('selected_tags_wrap', geByClass('bugs_filter_tag', ge('bugs_selected_tags')).length);
  toggle('tags_wrap', geByClass('bugs_filter_tag', ge('bugs_tags')).length);
  Bugs.updateAllSearch(ge('bugs_search_input'), e);
},

showSubscribed: function(bug_id) {
  return !showBox('bugs', {act: 'subscribers_box', id: bug_id || cur.bug_id}, {
    dark: 1,
    params: {
      width: 500,
      bodyStyle: 'padding: 0px'
    }
  });
},

registerDragZone: function(opts) {
  addEvent(document, "dragenter dragover", function(ev) {
    if (Bugs.checkHtml5Uploader()) {
      setTimeout(function() {
        clearTimeout(cur.dragTimer);
        delete cur.dragTimer;
      }, 0);
      opts.on(ev);
      return cancelEvent(ev);
    }
  });
  addEvent(document, "dragleave", function(ev) {
    if (cur.dragTimer) {
      clearTimeout(cur.dragTimer);
      delete cur.dragTimer;
    }
    cur.dragTimer = setTimeout(function() {
      opts.un(ev);
    }, 100);
    cancelEvent(ev);
  });
  addEvent(document, "drop", function(ev) {
    opts.un(ev, true);
    opts.drop(ev.dataTransfer.files, ev);
    return cancelEvent(ev);
  });
  cur.destroy.push(function() {
    removeEvent(document, "dragenter dragover");
    removeEvent(document, "dragleave");
    removeEvent(document, "drop");
  });
},

toggleBugDescription: function(el) {
  animate(el, {marginBottom: 0, height: 0}, 200, re.pbind(el));
  slideDown(ge('bugs_new_text_wrap'), 200);
  elfocus('bugs_new_text');
  return false;
},

checkHtml5Uploader: function() {
  return (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
},

_eof: 1};try{stManager.done('bugs.js');}catch(e){}
