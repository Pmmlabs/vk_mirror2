FAQ = {

switchTab: function(name, evt) {
  if (evt.button) return true;
  var oldTab = false;
  each(geByClass('active_link', ge('faq_tabs')), function(i, v) {
    if (hasClass(v, 'active_link')) {
      oldTab = v;
      removeClass(v, 'active_link');
    }
  });
  addClass(ge(name + '_tab'), 'active_link');
  evt.cancelBubble = true;
  if (name == 'new') {
    hide('extra_tab', 'show_tab', 'edit_tab', 'new_link');
    show('new_tab');
    var newLoc = extend(nav.objLoc, {act: 'new'});
    if (cur.langsDD) {
      extend(newLoc, {lang: cur.langsDD.val()});
    }
    extend(newLoc, FAQ.getSectionExtend());

    return nav.go(newLoc, evt, {onFail: function(text) {
      hide('new_tab');
      show('new_link');
      removeClass(ge(name + '_tab'), 'active_link');
      if (oldTab) {
        addClass(oldTab, 'active_link');
      }
      setTimeout(showFastBox(getLang('global_error'), text).hide, 2000);
      return true;
    }});
  } else if (name == 'edit') {
    show('edit_tab', 'new_link');
    hide('new_tab', 'show_tab', 'extra_tab');
  } else if (name == 'extra') {
    show('extra_tab', 'new_link');
    hide('new_tab', 'show_tab', 'edit_tab');
  } else {
    hide('extra_tab', 'new_tab', 'edit_tab');
    show('new_link');
    var newLoc = extend({0: nav.objLoc[0], lang: nav.objLoc.lang}, {act: name});
    extend(newLoc, FAQ.getSectionExtend());

    if (cur.section == 'edit' && name == 'all' && cur.langsDD) {
      extend(newLoc, {lang: cur.langsDD.val()});
    }
    return nav.go(newLoc, evt);
  }
},

getSectionExtend: function() {
  if (nav.objLoc.hasOwnProperty('section')) {
    return { section: nav.objLoc.section };
  } else {
    var s = ge('current_section');
    if (s) {
      return { section: val(s) };
    }
  }
  return {};
},

switchSubTab: function(el, link, evt) {
  if (checkEvent(evt) || hasClass(el, 'active')) return false;
  each(geByClass('faq_subtab1', ge('faq_subtabs')), function(i, v) {
    removeClass(v, 'active');
  });
  addClass(el, 'active');
  show('faq_subtabs_progress');
  return nav.go(link, evt);
},

showMsg: function(text) {
  var msg = ge('faq_msg');
  if (!msg) {
    var parent;
    switch (cur.section) {
      case 'all':
        parent = cur.tlmd ? ge('tickets_faq_list') : ge('faq_list');
        break;
      case 'new':
        parent = ge('faq_msg_p');
        show('faq_msg_p');
        break;
      case 'tiles':
        parent = ge('faq_tiles_editor');
        break;
      case 'sort':
        parent = ge('faq_sort_editor');
        break;
    }
    msg = parent.insertBefore(ce('div', {id: 'faq_msg', className: 'msg'}), parent.firstChild);
  }
  re('faq_error');
  msg.innerHTML = text;
  msg.style.backgroundColor = '#F4EBBD';
  animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
  return true;
},

showError: function(error) {
  var err = ge('faq_error');
  if (!err) {
    var parent;
    switch (cur.section) {
      case 'all':
        parent = ge('faq_list');
        break;
      case 'new':
      case 'edit':
        parent = ge('faq_msg_p');
        show('faq_msg_p');
        break;
    }
    err = parent.insertBefore(ce('div', {id: 'faq_error', className: 'error'}), parent.firstChild);
  }
  re('faq_msg');
  hide('faq_progress');
  err.innerHTML = error;
  err.style.backgroundColor = '#FACEBB';
  animate(err, {backgroundColor: '#FFEFE8'}, 2000);
  scrollToTop(200);
  return true;
},

handleTagsPos: function() {
  if (!ge('faq_tags_td')) return false;
  var st = scrollGetY(), wh = window.lastWindowHeight || 0, pos = 0,
      filt = ge('faq_tags_td'), filtPos = getXY(filt)[1], filtY = getSize(filt)[1],
      sf = ge('faq_tags'), sfPos = getXY(sf)[1], sfY = getSize(sf)[1],
      bottomPad = Math.max(0, st + wh - filtY - filtPos),
      tooBig = (filtY - sfY < 20),
      lastPos = cur.filterLastPos || 0, lastSt = cur.lastSt || 0;
  if  (st > filtPos && !tooBig) {
    addClass(sf, 'fixed');
    pos = (wh > sfY) ? Math.min(0, wh - sfY - bottomPad) : Math.max(Math.min(0, lastPos + lastSt - st), wh - sfY - bottomPad);
  } else {
    removeClass(sf, 'fixed');
    pos = 0;
  }
  cur.filterLastPos = pos;
  cur.lastSt = st;
  setStyle(sf, {top: pos + 'px'});
},

selectTag: function(tag, event) {
  cur.tagsDD.addTag('#' + tag);
  scrollToTop();
},

toggleAllRows: function(el) {
  cur.faqRowsOpened = !cur.faqRowsOpened;
  each(geByClass('faq_row', ge('tickets_faq_list')), setTimeout.pbind(function(i, el) {
    var id = el.id.substr(7);
    if (id) {
      toggleClass(geByClass1('faq_inner_row', el), 'detailed', cur.faqRowsOpened);
    }
  }, 0));
  toggleClass(el, 'shown');
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
appendExtraField: function(btn) {
  var list = ge('faq_optional_extra_fields_list'), origin = ge('faq_optional_extra_field_example');
  if (!list) {
    return;
  }
  var block = origin.cloneNode(true), ind = 0, idPrefix = 'faq_optional_extra_field_';
  while (ge('faq_optional_extra_field_'+ind)) {
    ind++;
  }
  block.id = 'faq_optional_extra_field_'+ind;
  list.appendChild(block);

  var typeInp = geByClass1('faq_optional_extra_field_type__inp', block);
  typeInp.id = block.id+'_type';

  var titleInp = geByClass1('faq_optional_extra_field__title', block);
  titleInp.id = block.id+'_title';
  placeholderSetup(titleInp, {back:true});

  var noteInp = geByClass1('faq_optional_extra_field__note', block);
  noteInp.id = block.id+'_note';
  placeholderSetup(noteInp, {back:true});

  var requiredInp = geByClass1('faq_optional_extra_field_required__inp', block);
  requiredInp.id = block.id+'_required';

  if (list.children.length >= 10) {
    hide(btn);
  }

  FAQ.prepareExtraField(block, typeInp, requiredInp, titleInp, noteInp);
},
prepareExtraField: function(block, typeInp, requiredInp, titleInp, noteInp) {
  var typeSelector = new Dropdown(typeInp, cur.selData['extra_field_types'], {
    width: 188,
    introText: '',
    noResult: '',
    multiselect: false,
    autocomplete: false,
    big: 1
  });
  data(block, 'typeSelector', typeSelector);
  placeholderSetup(titleInp, {back:true});
  placeholderSetup(noteInp, {back:true});

  var requiredSelector = new Dropdown(requiredInp, cur.selData['extra_field_required_types'], {
    width: 188,
    introText: '',
    noResult: '',
    multiselect: false,
    autocomplete: false,
    big: 1
  });
  /*var chb = new Checkbox(requiredInp, {label: requiredInp.title, width: 120});*/
  data(block, 'requiredSelector', requiredSelector);

  var removeBtn = geByClass1('faq_optional_extra_field__close', block);
  addEvent(removeBtn, 'click', function() {
    FAQ.removeExtraField(block);
  });
},
removeExtraField: function(block) {
  var ts = data(block, 'typeSelector');
  ts.destroy.bind(ts)();
  re(block);
  show('faq_optional_extra_field_add');
},
destroyExtraFields: function() {
  for (var i = 0; i < 10; i++) {
    var eBlock = ge('faq_optional_extra_field_' + i);
    if (eBlock) {
      var ts = data(eBlock, 'typeSelector'), rs = data(eBlock, 'requiredSelector');
      ts.destroy.bind(ts)();
      rs.destroy.bind(rs)();
    }
  }
},
saveFAQ: function(hash) {
  var title = trim(val('faq_title')),
      text = trim(val('faq_text')),
      keywords = trim(val('faq_keywords')),
      description = trim(val('faq_description'));
  if (!title) {
    return notaBene('faq_title');
  }
  var imgs = [];
  if (cur.screens) {
    for (var i in cur.screens) {
      imgs.push(cur.screens[i][0]);
    }
  }
  if (!text && !imgs.length) {
    return notaBene('faq_text');
  }
  var language = cur.langsDD && cur.langsDD.val() || 0,
      query = {act: 'save', title: title, text: text, keywords: keywords, description: description, hash: hash, imgs: imgs, faq_id: cur.id, fixed: cur.fixFAQ.val(), urgent: cur.urgentFAQ.val(), server: trim(val('faq_server')), id_mask: trim(val('faq_id_mask')), cdn: trim(val('faq_cdn')), language: language, parent_id: (language ? cur.parentId : 0), about_phone: cur.aboutPhoneFAQ.val(), about_profile: cur.aboutProfileFAQ.val(), about_group: cur.aboutGroupFAQ.val(), about_email: cur.aboutEmailFAQ.val(), hidden: cur.hiddenFAQ.val() };

  if (cur.sectionSelector) {
    query.section = intval(cur.sectionSelector.val());
    if (query.section == 0 || query.section == 39) {
      var categories = cur.desktopCategorySelector.val();
      query.categories = categories;
      query.spec_section = cur.specSectionSelector.val();
    } else if (query.section == 31) {
      var platforms = cur.platformSelector.val();
      if (!platforms) {
        elfocus(cur.platformSelector.input);
        return notaBene(cur.platformSelector.selector);
      }
      query.platforms = platforms;

      var categories = cur.categorySelector.val();
      if (!categories) {
        elfocus(cur.categorySelector.input);
        return notaBene(cur.categorySelector.selector);
      }
      query.categories = categories;
    }
  } else if (ge('default_section')) {
    query.section = val('default_section');
  }
  if (cur.actionButtonSelector) {
    query.action_id = intval(cur.actionButtonSelector.val());
    if (query.action_id != 0) {
      query.action_label = ge('faq_action_btn_label').value.trim();
    }
    if (query.action_id == 7) {
      if (!query.action_label) {
        elfocus('faq_action_btn_label');
        return notaBene('faq_action_btn_label');
      }
      query.action_url = ge('faq_action_btn_url').value.trim();
      if (!query.action_url) {
        elfocus('faq_action_btn_url');
        return notaBene('faq_action_btn_url');
      }
    }
  }
  if (ge('faq_optional_extra_field_add') && (!cur.sectionSelector || cur.sectionSelector.val() == 0 || cur.sectionSelector.val() == 39)) {
    var d = {}, blocks = ge('faq_optional_extra_fields_list').children;
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      d['ef_'+i+'_type'] = data(b, 'typeSelector').val();
      d['ef_'+i+'_title'] = geByClass1('faq_optional_extra_field__title', b).value;
      d['ef_'+i+'_note'] = geByClass1('faq_optional_extra_field__note', b).value;
      d['ef_'+i+'_required'] = data(b, 'requiredSelector').val();
    }
    query = extend(query, d);
  }
  if (cur.descriptionNotNeeded) {
    query.descr_not_needed = cur.descriptionNotNeeded.val();
  }
  if (ge('description_placeholder_key')) {
    query.description_placeholder_key = val('description_placeholder_key');
  }
  if (ge('description_tooltip_key')) {
    query.description_tooltip_key = val('description_tooltip_key');
  }
  if (cur.faqFromAllCheckbox && cur.faqFromCheckboxes) {
    var from_list = [], all_val = cur.faqFromAllCheckbox.val();
    if (all_val) {
      from_list.push(all_val);
    } else {
      each(cur.faqFromCheckboxes, function(i, chb) {
        var v = chb.val();
        if (v) {
          from_list.push(v);
        }
      });
    }
    query.from_list = from_list.join(",");
  }
  ajax.post(nav.objLoc[0], query, {
    onFail: FAQ.showError,
    showProgress: lockButton.pbind(ge('faq_send')),
    hideProgress: unlockButton.pbind(ge('faq_send'))
  });
},

// screenshot attachment

addScreen: function(forEdit) {
  showFastBox({title: getLang('support_adding_screen'), width: 440, bodyStyle: 'padding: 0px'}, '\
<div class="fis_box">\
  <div class="info_msg fis_about">' + getLang('support_screen_you_can') + '</div>\
  <div id="fis_add_data"></div>\
  <div class="fis_warn_text">' + getLang('support_screen_warn') + '</div>\
  <div id="fis_dropbox" class="dropbox">\
    <div class="dropbox_wrap">\
      <div class="dropbox_area">' + getLang('drop_files_here') + '</div>\
    </div>\
  </div>\
</div>\
  ');
  stManager.add('upload.js', FAQ.initUpload.pbind(forEdit));
},
attachCount: function(forEdit) {
  var previewEl = ge('fis_preview' + (forEdit ? '_edit' : '')),
      progressNode = ge('fis_prg_preview' + (forEdit ? '_edit' : ''));
  return (previewEl.childNodes.length + progressNode.childNodes.length);
},
unchoose: function(ind, forEdit) {
  re('fis_preview' + ind);
  if (forEdit) {
    delete(cur.screensEdit[ind]);
  } else {
    delete(cur.screens[ind]);
  }
  toggle('fis_add_lnk' + (forEdit ? '_edit' : ''), FAQ.attachCount(forEdit) < 5);
},
choose: function(ind, forEdit, media, data) {
  var preview = '',
      previewEl = ge('fis_preview' + (forEdit ? '_edit' : '')),
      prgNode = ge('fis_prg_preview' + (forEdit ? '_edit' : ''));

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
  preview = '<div onclick="return showPhoto(\'' + media + '\', \'' + data.list + '\', ' + data.view_opts.replace(/"/g, '&quot;') + ');" class="fl_l fis_preview"><img class="fis_photo" src="' + data.thumb_s + '" /></div>';
  var mediaEl = ce('div', {innerHTML: '<div id="fis_preview' + ind + '" class="fis_preview_wrap">' + preview + '<div class="fis_x fl_l" ' + (browser.msie ? 'title' : 'tooltip') + '="' + getLang('dont_attach') + '" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tooltip\'), shift: [6, 3, 3]})" onclick="FAQ.unchoose(\'' + ind + '\'' + (forEdit ? ', 1' : '') + ')"></div></div>'}).firstChild;

  addClass(mediaEl, 'fl_l');
  re('upload' + ind + '_progress_wrap');
  previewEl.appendChild(mediaEl);

  if (forEdit) {
    cur.screensEdit[ind] = [media, mediaEl];
  } else {
    cur.screens[ind] = [media, mediaEl];
  }
  if (!cur.fileApiUploadStarted) {
    boxQueue.hideLast();
  }
  toggle('fis_add_lnk' + (forEdit ? '_edit' : ''), FAQ.attachCount(forEdit) < 5);
},
chooseUploaded: function(info, params) {
  var i = info.ind !== undefined ? info.ind : info,
      fileName = info.fileName ? info.fileName : info,
      ind = info.fileName ? i + '_' + info.fileName : info;
  if (ge('upload' + ind + '_progress_wrap')) {
    var x = geByClass1('fis_prg_x', ge('upload' + ind + '_progress_wrap'));
    if (x) hide(x);
  }
  ajax.post('al_photos.php', extend({act: 'choose_uploaded_support'}, params), {
    onDone: FAQ.choose.pbind(ind, Upload.options[i].forEdit),
    onFail: FAQ.chooseFail.pbind(info),
    progress: (Upload.types[i] == 'form' && curBox()) ? curBox().progress : null
  });
},
chooseFail: function(info, code) {
  var i = info.ind !== undefined ? info.ind : info, fileName = info.fileName ? info.fileName : info;
  var forEdit = Upload.options[i].forEdit;
  if (Upload.types[i] == 'fileApi') {
    var ind = info.fileName ? i + '_' + info.fileName : info;
    re('upload' + ind + '_progress_wrap');
    FAQ.unchoose(ind, forEdit);
  }
  if (curBox()) hide(curBox().progress);
  topError('Upload failed', {dt: -1, type: 102, url: (ge('file_uploader_form' + i) || {}).action});
  Upload.embed(i);
  toggle('fis_add_lnk' + (forEdit ? '_edit' : ''), FAQ.attachCount(forEdit) < 5);
},
showScreenProgress: function(i, data) {
  var forEdit = Upload.options[i].forEdit,
      prgNode = ge('fis_prg_preview' + (forEdit ? '_edit' : '')),
      percent = intval(data.loaded / data.total * 100),
      fileName = data.fileName || data.name || '',
      ind = fileName ? i + '_' + fileName : i,
      label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

  if (!prgNode) return;

  if (!ge('upload' + ind + '_progress_wrap')) {
    var progress = '\
<div class="fis_progress_wrap">\
  <div id="upload' + ind + '_progress" class="fis_progress" style="width: ' + percent + '%;"></div>\
</div></div>';
    var progressEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: '<div class="fl_l">' + progress + '</div>' + (label ? '<div class="fis_label fl_l">' + label + '</div>' : '') + '<div class="fis_prg_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\');"></div>', className: 'clear_fix'}, {marginTop: '6px'});
    prgNode.appendChild(progressEl);
    show(prgNode);
    toggle('fis_add_lnk' + (forEdit ? '_edit' : ''), FAQ.attachCount(forEdit) < 5);
    if (!percent) {
      hide('upload' + ind + '_progress');
    }
  } else {
    setStyle(ge('upload' + ind + '_progress'), {width: percent + '%'});
    show('upload' + ind + '_progress');
  }
  return false;
},

initUpload: function(forEdit) {
  if (!ge('fis_add_data')) return;

  if (!cur.screens) cur.screens = {};
  var opts = cur.uploadData.options;
  Upload.init('fis_add_data', cur.uploadData.url, cur.uploadData.vars, {
    file_name: 'photo',

    file_size_limit: 1024*1024*5, // 5Mb
    file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
    file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
    accept: 'image/jpeg,image/png,image/gif',
    file_match: '\.(gif|jpg|png)$',
    lang: opts.lang,

    onUploadStart: function(info, res) {
      var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
      if (Upload.types[i] == 'form') {
        if (curBox()) show(curBox().progress);
        geByClass1('file', ge('fis_add_data')).disabled = true;
      }
      if (Upload.types[i] == 'fileApi') {
        if (cur.notStarted) {
          curBox().hide();
          delete cur.notStarted;
        }
        if (options.multi_progress) this.onUploadProgress(info, 0, 0);
      }
    },
    onUploadComplete: function(info, res) {
      var params, i = info.ind !== undefined ? info.ind : info, fileName = info.fileName ? info.fileName : info;
      try {
        params = eval('(' + res + ')');
      } catch(e) {
        params = q2ajx(res);
      }
      if (!params.photos) {
        Upload.onUploadError(info);
        return;
      }
      var options = Upload.options[i];
      FAQ.chooseUploaded(info, params);
    },
    onUploadProgress: function(info, bytesLoaded, bytesTotal) {
      var i = info.ind !== undefined ? info.ind : info;
      if (Upload.types[i] == 'fileApi') {
        var data = {loaded: bytesLoaded, total: bytesTotal};
        if (info.fileName) data.fileName = info.fileName;
        FAQ.showScreenProgress(i, data);
      }
    },
    onUploadError: FAQ.chooseFail,

    noFlash: 1,
    multiple: 1,
    multi_progress: 1,
    max_files: 5 - FAQ.attachCount(forEdit),
    clear: 1,
    type: 'photo',
    max_attempts: 3,
    server: opts.server,
    error: opts.default_error,
    error_hash: opts.error_hash,
    dropbox: 'fis_dropbox',
    forEdit: forEdit
  });
},

deleteFAQ: function(faq_id, hash) {
  var box = showFastBox({title: cur.lang['delete_title'], width: 430}, cur.lang['delete_confirm'], cur.lang['delete'], function() {
    ajax.post(nav.objLoc[0], {act: 'delete', faq_id: faq_id, hash: hash}, {
      progress: box.progress,
      onFail: function(text) {
        box.hide();
        FAQ.showError(text);
        return true;
      }
    });
  }, getLang('global_cancel'));
  return false;
},

toggleRow: function(id, el, evt) {
  if (!evt.target) {
    evt.target = evt.srcElement || document;
  }
  if (evt.target.tagName.toLowerCase() == 'a') return true;
  toggle('faq_short_text'+id, !isVisible('faq_short_text'+id));
  toggle('faq_full_text'+id, !isVisible('faq_full_text'+id));
  if (isVisible('faq_full_text'+id)) {
    addClass(el, 'detailed');
    if (cur.tlmd) {
      ajax.post(nav.objLoc[0], {act: 'faq_clicked', faq_id: id, hash: cur.faq_hash}, {cache: 1});
    }
  } else {
    removeClass(el, 'detailed');
  }
  return false;
},

updateSearchString: function(event, inp) {
  cur.prevSearch = cur.prevSearch || '';

  var val = inp.value.trim();

  if (cur.prevSearch.trim() == val && val) {
    return;
  }

  clearTimeout(cur.searchTimeout);
  cur.searchTimeout = setTimeout(function() {
    cur.prevSearch = val;
    FAQ.updateSearch(val);
  }, 350);
},
updateSearchCheckbox: function() {
  FAQ.updateSearch(ge('faq_content_search__text').value.trim());
},
updateSearch: function(val) {
  var loc = nav.objLoc;
  if (val) {
    loc['q'] = val;
  } else {
    delete loc['q'];
  }
  if (cur.searchDisabled.val()) {
    loc['disabled'] = 1;
  } else {
    delete loc['disabled'];
  }
  if (cur.searchExpired.val()) {
    loc['expired'] = 1;
  } else {
    delete loc['expired'];
  }
  if (cur.searchWithAction.val()) {
    loc['with_action'] = 1;
  } else {
    delete loc['with_action'];
  }
  if (cur.searchWithExtraFields.val()) {
    loc['with_ef'] = 1;
  } else {
    delete loc['with_ef'];
  }
  nav.setLoc(loc);
  var query = extend({}, loc);
  query['act'] = 'load_list';
  delete query[0];

  ajax.post(nav.objLoc[0], query, {
    onDone: function(content) {
      var c = se(content), old = ge('faq_list');
      old.parentNode.replaceChild(c, old);
    }
  });
},

saveTilesTop: function(button, language, hash) {
  var query = { act: 'save_tiles', lang: language, hash: hash };
  each(geByClass('faq_tiles_editor_tile__questions', ge('faq_tiles_editor__tiles')), function(i, questions) {

    var v = [];

    each(questions.children, function(j, q) {
      v.push(q.id.replace('faq_tiles_editor_tile_question', ''));
    });

    var categoryId = questions.id.replace('faq_tiles_editor_tile__questions', '');
    query['faq' + categoryId] = v.join(',');
  });

  ajax.post(nav.objLoc[0], query, {
    showProgress: function() { addClass(button, 'flat_btn_lock'); },
    hideProgress: function() { removeClass(button, 'flat_btn_lock'); }
  });
},

tilesShowSearch: function(evt, categoryId) {
  hide(evt.target);
  var searchInput = ge('faq_tiles_editor_tile_search__input'+categoryId);
  show(searchInput);
  geByClass1('selector_input', searchInput).focus();
  return false;
},

tilesQuestionRemove: function(questionId, event) {
  var question = ge('faq_tiles_editor_tile_question'+questionId), questions = question.parentNode, categoryId = questions.id.replace('faq_tiles_editor_tile__questions', '');

  FAQ.tilesSorterDestroy(questions);
  re(question);
  sorter.init(questions, {});

  if (!questions.hasChildNodes()) {
    hide(questions);
  }
  if (geByClass('faq_tiles_editor_tile_question', questions).length < cur.perCategoryLimit) {
    show('faq_tiles_editor_tile_search'+categoryId);
  }

  if (event) {
    event.stopPropagation();
  }
},

tilesQuestionAdd: function(categoryId, questionId, questionTitle) {
  if (!questionId) {
    return;
  }

  var question = ge('faq_tiles_editor_tile_question'+questionId);
  if (question) {
    FAQ.tilesQuestionRemove(questionId);
  }

  var question = ce('div', {
    className: 'faq_tiles_editor_tile_question',
    id: 'faq_tiles_editor_tile_question'+questionId
  });

  question.innerHTML =
  '<span class="faq_tiles_editor_tile_question__title">'+questionTitle+'</span>\
    <span class="faq_tiles_editor_tile_question__remove" onclick="FAQ.tilesQuestionRemove('+questionId+', event);"></span>';

  var questions = ge('faq_tiles_editor_tile__questions'+categoryId);
  show(questions);

  FAQ.tilesSorterDestroy(questions);
  questions.appendChild(question);
  sorter.init(questions, {});
  if (geByClass('faq_tiles_editor_tile_question', questions).length >= cur.perCategoryLimit) {
    hide('faq_tiles_editor_tile_search'+categoryId);
  }
},

tilesSorterDestroy: function(questions) {
  questions.sorter.destroy();
  each(geByClass('faq_tiles_editor_tile_question', questions), function(i, question) {
    question.removeAttribute('style');
  });
},

saveQuestionsSort: function(btn, language, category, hash, byRate) {
  var query = { act: 'save_sort', lang: language, category: category, hash: hash}, ids = [];
  if (!byRate) {
    each(geByClass('faq_sort_editor_question', ge('faq_sort_editor__questions')), function (i, q) {
      ids.push(q.id.replace('faq', ''));
    });
  }

  query['ids'] = ids.join(',');

  ajax.post(nav.objLoc[0], query, {
    showProgress: function() { addClass(btn, 'flat_btn_lock'); },
    hideProgress: function() { removeClass(btn, 'flat_btn_lock'); }
  });
},
sortQuestionsReorder: function(q) {
  var pos = q.getAttribute("position"), prevPos = FAQ.sortQuestionsGetPosition(q);
  if (pos != prevPos) {
    addClass(q, 'faq_sort_editor_question_moved');
  } else {
    removeClass(q, 'faq_sort_editor_question_moved');
  }

  each(geByClass('faq_sort_editor_question_moved', ge('faq_sort_editor_question')), function(i, q) {
    var pos = q.getAttribute("position"), prevPos = FAQ.sortQuestionsGetPosition(q);
    if (pos == prevPos) {
      removeClass(q, 'faq_sort_editor_question_moved');
    }
  });
},
sortQuestionsGetPosition: function(q) {
  var i = 0, c = q;
  while (c) {
    i++;
    c = c.previousSibling;
  }
  return Math.floor(i / 2) - 1;
},
saveDictionary: function(btn, lang, hash) {
  hide('faq_dictionary__submit_note');
  ajax.post(nav.objLoc[0], {
    act: 'dictionary_save',
    lang: lang,
    hash: hash,
    beginning_words: val('faq_dictionary__beginning_words'),
    middle_words: val('faq_dictionary__middle_words')
  }, {
    onDone: function(beginningWords, middleWords) {
      val('faq_dictionary__beginning_words', beginningWords);
      val('faq_dictionary__middle_words', middleWords);
      show('faq_dictionary__submit_note');
      setTimeout(function() {
        fadeOut('faq_dictionary__submit_note', 500);
      }, 3000);
    },
    showProgress: function() { addClass(btn, 'processing'); },
    hideProgress: function() { removeClass(btn, 'processing'); }
  });
},
showHistory: function(id, faq_id, hash) {
  return !showBox(nav.objLoc[0], {act: 'show_history', id: id, faq_id: faq_id, hash: hash}, {params: {bodyStyle: 'padding: 0px', width: 590}});
},
updateFAQ: function(e, obj) {
  clearTimeout(cur.faqTimeout);
  cur.faqTimeout = setTimeout((function() {
    var origStr = obj.value,
        str = trim(origStr),
        words = str.split(' '),
        textInput = ge('tickets_text');

    if (origStr.length >= 70 && textInput && !textInput.value && !cur.flood) {
      if (!isVisible('tickets_detailed_form')) FAQ.toggleDetailedForm();
      obj.value = '';
      textInput.focus();
      textInput.value = origStr;
    }
    if (isVisible('tickets_detailed_form')) return;
    if (str == cur.searchStr && (words.length < 4 || words.length == 4 && origStr[origStr.length - 1] != ' ')) {
      return;
    }
    if (str) {
      addClass(ge('tickets_search_reset'), 'shown');
    } else {
      removeClass(ge('tickets_search_reset'), 'shown');
    }
    cur.searchStr = str;
    clearTimeout(cur.searchFAQTimeout);
    cur.searchFAQTimeout = setTimeout((function() {
      FAQ.searchFAQ(cur.searchStr);
    }).bind(this), 300);

    if (!browser.mobile) scrollToTop();
  }).bind(this), 10);
},

searchFAQ: function(val) {
  if (val[val.length - 1] == ' ') {
    val[val.length - 1] = '_';
  }
  addClass(ge('tickets_search'), 'loading');
  setStyle(ge('tickets_search_reset'), {opacity: .6});
  var query = {act: 'get_faq', q: val, from: nav.objLoc.act};
  if (nav.objLoc.gid) query.gid = nav.objLoc.gid;
  if (nav.objLoc.app_id) query.app_id = nav.objLoc.app_id;
  if (nav.objLoc.union_id) query.union_id = nav.objLoc.union_id;
  if (cur.tlmd && cur.showAll) {
    delete cur.showAll;
    query.show_all = 1;
    if (cur.from_ads) {
      query.from = 'ads';
    }
  }
  ajax.post('tlmd', query, {
    cache: 1,
    hideProgress: removeClass.pbind('tickets_search', 'loading'),
    onDone: function(cont, button) {
      var origStr = ge('tickets_title').value,
          words = trim(origStr).split(' '),
          needToggle = (words.length > 4 || words.length == 4 && origStr[origStr.length - 1] == ' ');
      if (cont) {
        ge('tickets_faq_list').innerHTML = ce('div', {innerHTML: cont}).firstChild.innerHTML;
      } else {
        if (button) ge('tickets_faq_button').innerHTML = button;
        if (needToggle) {
          cur.toggled = true;
          FAQ.toggleDetailedForm();
        }
      }
      if (cur.tlmd) {
        if (val) {
          extend(nav.objLoc, {q: val});
        } else {
          delete nav.objLoc.q;
        }
        if (nav.objLoc.act == 'faq') {
          var title = val ? val : getLang('support_page_title');
          if (!vk.id) {
            title += ' | ' + getLang('global_vkontakte');
          }
          document.title = title;
        }
        if (cont) {
          cur.faqRowsOpened = false;
          removeClass(ge('faq_toggle_all'), 'shown');
        }
        nav.setLoc(nav.objLoc);
      }
    }
  });
},
toggleDetailedForm: function(force) {
  var title = ge('tickets_title');
  toggleClass(ge('tickets_content'), 'detailed');
  if (isVisible('tickets_detailed_form')) {
    title.setAttribute('placeholder', cur.lang.placeholder_title);
    removeClass(ge('tickets_search_reset'), 'shown');
    if (force) ge('tickets_text').focus();
  } else {
    title.setAttribute('placeholder', cur.lang.placeholder_default);
    var str = trim(ge('tickets_title').value);
    if (str) {
      addClass(ge('tickets_search_reset'), 'shown');
    }
    cur.toggleCanceled = true;
    delete cur.toggled;
    FAQ.searchFAQ(str);
    title.focus();
  }
  placeholderSetup(ge('tickets_title'), {back: true, reload: true});
},
clearSearch: function(el, event) {
  var field = ge('tickets_title');
  setStyle(el, {opacity: .6});
  field.value = '';
  ge('tickets_title').focus();
  FAQ.updateFAQ(event, field);
},
_eof: 1};try{stManager.done('faq.js');}catch(e){}
