var AdsModer = {};

AdsModer.init = function() {
  AdsModer.initDelayedImages();
  AdsModer.initMultipleRequests();
}

AdsModer.initDelayedImages = function() {
  var imagesIndex;
  var indexStep = 500;
  var lastImage;
  var lastImageY;

  buildIndex();
  if (isEmpty(imagesIndex)) {
    return;
  }

  var scrolledNode = (browser.msie6 ? pageNode : window);
  var handler = checkImages.pbind(false);
  function deinit() {
    removeEvent(scrolledNode, 'scroll', handler);
  }
  cur.destroy.push(deinit);
  addEvent(scrolledNode, 'scroll', handler);
  handler();

  function buildIndex() {
    if (lastImage && lastImage.hasAttribute('src_') && lastImageY == getXY(lastImage)[1]) {
      return;
    }

    var imagesAll = geByTag('img');
    var image;
    var indexKey;

    imagesIndex = {};

    if (!imagesAll.length) {
      return;
    }

    for (var i = 0, image; image = imagesAll[i]; i++) {
      if (!image.hasAttribute('src_')) {
        continue;
      }
      indexKey = intval(getXY(image)[1] / indexStep);
      if (!(indexKey in imagesIndex)) {
        imagesIndex[indexKey] = [];
      }
      imagesIndex[indexKey].push(image);
      lastImage = image;
    }

    lastImageY = getXY(lastImage)[1];
  }

  function checkIndex() {
    buildIndex();
    if (isEmpty(imagesIndex)) {
      deinit();
    }
  }

  function checkImages(delayed) {
    var yTop        = scrollGetY()
    var yBottom     = yTop + lastWindowHeight;
    var indexTop    = intval(yTop / indexStep);
    var indexBottom = intval(yBottom / indexStep);
    var image;
    for (var i = indexTop; i <= indexBottom; i++) {
      if (!(i in imagesIndex)) {
        continue;
      }
      for (var j = 0, len = imagesIndex[i].length; j < len; j++) {
        image = imagesIndex[i][j];
        image.src = image.getAttribute('src_');
        image.removeAttribute('src_')
      }
      delete imagesIndex[i];
    }
    checkIndex();
    setTimeout(checkIndex, 1000);
  }
}

AdsModer.showDescendantsDelayedImages = function(elem) {
  var imagesAll = geByTag('img', elem);
  for (var i = 0, image; image = imagesAll[i]; i++) {
    if (!image.hasAttribute('src__')) {
      continue;
    }
    image.src = image.getAttribute('src__');
    image.removeAttribute('src__');
  }
}

AdsModer.showObjectInfo = function(objectType, objectId, objectData) {
  var ajaxParams = {};
  ajaxParams.object_type = objectType;
  ajaxParams.object_id   = objectId;
  ajaxParams.object_data = objectData;

  var showOptions = {params: {}};

  showBox('/adsmoder?act=object_info', ajaxParams, showOptions);
}

AdsModer.openFeaturesEditBox = function(unionId, hash, featuresInfo, featuresEditHtml) {
  var editBox = showFastBox({title: 'Возможности', width: 550}, featuresEditHtml);
  var saveFeaturesHandler = AdsModer.saveFeatures.pbind(unionId, hash, featuresInfo, editBox);
  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton('Изменить', saveFeaturesHandler, 'yes');

  var checkboxes = {};
  for (var i in featuresInfo) {
    var featureInfo = featuresInfo[i];
    checkboxes[featureInfo.key] = new Checkbox(ge('ads_moder_feature_' + featureInfo.key), {
      label: featureInfo.name,
      checked: intval(featureInfo.value),
      width: 500,
      onChange: (function(featureInfo, value) {
        if (!value || !featureInfo.unset_keys) {
          return;
        }
        for (var j in featureInfo.unset_keys) {
          var unsetKey = featureInfo.unset_keys[j];
          if (!checkboxes[unsetKey]) {
            continue;
          }
          checkboxes[unsetKey].checked(0);
        }
      }).pbind(featureInfo)
    });
  }
}

AdsModer.saveFeatures = function(unionId, hash, featuresInfo, editBox) {
  if (!Ads.lock('saveFeatures', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams.union_id = unionId;
  ajaxParams.hash = hash;
  ajaxParams.features = [];
  for (var i in featuresInfo) {
    var featureInfo = featuresInfo[i];
    ajaxParams.features.push(featureInfo.key + ':' + intval(ge('ads_moder_feature_' + featureInfo.key).value));
  }
  ajaxParams.features = ajaxParams.features.join(',');

  ajax.post('/adsmoder?act=a_edit_features', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveFeatures');
    if (response && response.ok) {
      nav.reload();
    } else {
      showFastBox('Ошибка', 'Ошибка');
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hide();
  }
}

AdsModer.openDomainCommentEditBox = function(domain, reload, buttons) {
  function onBoxHide() {
    delete cur.domainCommentEditBox;
  }

  var linked_note_id = undefined;
  var add_button = ge('ads_moder_domain_add_button');
  if (cur.linked_domain_notes) {
    linked_note_id = cur.linked_domain_notes[domain];
  }
  ajax.post('/adsmoder?act=a_get_domain_note', {
    domain: domain,
    note_id: linked_note_id
  }, {
    onDone: function (data) {
      var domainCommentTextParams = '';
      var info_string = '';
      if (data.exists) {
        info_string = '<div class="ads_premoderation_domain_info">Домен <b>' + domain + '</b> в последний раз редактировался ' + data.user + ' <b><nobr>' + data.update_time + '</nobr></b></div>';
      } else {
        info_string = '<div class="ads_premoderation_domain_info">Домен <b>' + domain + '</b> ранее не модерировался</b></div>';
      }
      var comment_box;
      var box_title;
      if (data.allow_edit) {
        comment_box = ' <textarea id="ads_domain_comment_edit" ' + domainCommentTextParams + '>' + (data.comment ? data.comment : '') + '</textarea>';
        box_title = 'Редактирование заметки к домену ' + domain;
      } else {
        comment_box = data.comment ? data.comment : '';
        box_title = 'Просмотр заметки к домену ' + domain;
      }
      var boxHtml =
        '<div class="ads_note_edit_wrap">' +
          '<div>' +
            comment_box +
          '</div>' +
        '</div>' +
        info_string
        ;

      cur.domainCommentEditBox = showFastBox({title: box_title, width: 400, onHide: onBoxHide}, boxHtml);
      cur.domainCommentEditBox.removeButtons();

      cur.domainCommentEditBox.addButton(getLang('box_cancel'), false, 'no');
      if (data.allow_edit) {
        if (!buttons) {
          if (data.exists) {
            buttons = [[undefined, 'Сохранить']];
          } else {
            buttons = [['declined', 'Отклонить'], ['approved', 'Одобрить']];
          }
        }
        for (var i in buttons) {
          cur.domainCommentEditBox.addButton(buttons[i][1], AdsModer.saveDomainComment.pbind(buttons[i][0], reload), 'yes');
        }
      }

      cur.domainCommentEditBox.domain = domain;
      ge('ads_domain_comment_edit').focus();
    },
    onFail: function () {
      showFastBox('Ошибка', 'Ошибка');
      return true;
    },
    showProgress: function () {
      if (add_button) {
        lockButton(add_button);
      }
    },
    hideProgress: function () {
      if (add_button) {
        unlockButton(add_button);
      }
    }
  });
}

AdsModer.openTemplateEditBox = function(template_id, buttons) {
  function onBoxHide() {
    delete cur.templateEditBox;
  }

  ajax.post('/adsmoder?act=a_get_template', {
    template_id: template_id
  }, {
    onDone: function (data) {
      var info_string = '';
      if (data.exists) {
        info_string = '<div class="ads_premoderation_domain_info">Шаблон в последний раз редактировался ' + data.user + ' <b><nobr>' + data.update_time + '</nobr></b></div>';
      }
      var full_text_box;
      var short_title_box;
      var box_title;

      short_title_box = ' <input id="ads_template_title_edit" type="text" placeholder="Короткий заголовок шаблона" class="text" value="' + (data.template ? data.template.short_title : '') + '">';
      full_text_box   = ' <textarea id="ads_template_text_edit" placeholder="Полный текст шаблона">' + (data.template ? data.template.full_text : '') + '</textarea>';
      box_title       = 'Редактирование шаблона ' + (data.template ? data.template.short_title : '');

      var boxHtml =
          '<div class="ads_note_edit_wrap">' +
            '<div class="ads_premoderation_template_title">' +
              short_title_box +
            '</div><div>' +
              full_text_box +
            '</div>' +
            '</div>' +
            info_string
        ;

      cur.templateEditBox = showFastBox({title: box_title, width: 400, onHide: onBoxHide}, boxHtml);
      cur.templateEditBox.removeButtons();

      cur.templateEditBox.addButton(getLang('box_cancel'), false, 'no');
      if (!buttons) {
        buttons = [[undefined, 'Сохранить']];
      }
      for (var i in buttons) {
        cur.templateEditBox.addButton(buttons[i][1], AdsModer.saveTemplate.pbind(buttons[i][0], template_id), 'yes');
      }

      ge('ads_template_title_edit').focus();
    },
    onFail: function () {
      showFastBox('Ошибка', 'Ошибка');
      return true;
    }
  });
}

AdsModer.saveTemplate = function (action, template_id) {
  if (!Ads.lock('save_template', onLock, onUnlock)) {
    return;
  }

  var ajax_params = {
    template_id: template_id,
    hash: cur.change_template_hash
  };
  if (action == 'disable') {
    ajax_params.status = 1;
  } else if (action == 'enable') {
    ajax_params.status = 0;
  } else {
    ajax_params.short_title = ge('ads_template_title_edit').value;
    ajax_params.full_text = ge('ads_template_text_edit').value;
  }

  ajax.post('/adsmoder?act=a_save_template', ajax_params, {
    onDone: function (data) {
      Ads.unlock('save_template');
      nav.reload();
    },
    onFail: function () {
      showFastBox('Ошибка', 'Ошибка');
      Ads.unlock('save_domain_comment');
      return true;
    }
  });

  function onLock() {
    if (cur.templateEditBox) {
      cur.templateEditBox.showProgress();
    }
  }
  function onUnlock() {
    if (cur.templateEditBox) {
      cur.templateEditBox.hide();
    }
  }
}

AdsModer.addCurrentDomain = function () {
  var domain = ge('ads_moder_domain_search').value;
  if (domain.length) {
    AdsModer.openDomainCommentEditBox(domain, true);
  }
}

AdsModer.onSearchDomainsKeyUp = function (event) {
  if (event.keyCode == 13) {
    AdsModer.searchCurrentDomain();
  }
}

AdsModer.searchCurrentDomain = function() {
  var domain = ge('ads_moder_domain_search').value;
  if (!domain.length) {
    domain = false;
  }
  nav.change({domain: domain, offset: false});
}

AdsModer.saveDomainComment = function (new_status, reload) {
  if (!Ads.lock('save_domain_comment', onLock, onUnlock)) {
    return;
  }

  var ajax_params = {
    domain: cur.domainCommentEditBox.domain,
    comment: ge('ads_domain_comment_edit').value,
    hash: cur.change_domain_comment_hash
  };
  if (new_status) {
    ajax_params.status = new_status;
  }
  ajax.post('/adsmoder?act=a_save_domain_comment', ajax_params, {
    onDone: function (data) {
      Ads.unlock('save_domain_comment');
      if (ajax_params.status) {
        if (reload) {
          nav.reload();
        } else {
          AdsModer.onChangedDomainStatus(ajax_params.domain, ajax_params.status);
        }
      }
    },
    onFail: function () {
      Ads.unlock('save_domain_comment');
      showFastBox('Ошибка', 'Ошибка');
      return true;
    }
  });

  function onLock() {
    cur.domainCommentEditBox.showProgress();
  }
  function onUnlock() {
    cur.domainCommentEditBox.hide();
  }
}

AdsModer.openNoteEditBox = function(ajaxParams, noteText, noteTextParams, boxTitle, editActionText, isEdit, isOtherUser) {

  var boxHtml = '<div class="ads_note_edit_wrap"><div><textarea id="ads_note_edit" ' + noteTextParams + '>' + noteText + '</textarea></div></div>';

  var noteEditBox = showFastBox({title: boxTitle, width: 400}, boxHtml);
  noteEditBox.removeButtons();
  if (isOtherUser) {
    noteEditBox.addButton(getLang('box_cancel'), false, 'yes');
  } else {
    noteEditBox.addButton(getLang('box_cancel'), false, 'no');
    noteEditBox.addButton(editActionText, AdsModer.saveNote.pbind(noteEditBox, ajaxParams, false), 'yes');
  }
  if (isEdit) {
    noteEditBox.setControlsText('<a href="#" id="ads_note_edit_delete_link">Удалить</a>');
    addEvent(ge('ads_note_edit_delete_link'), 'click', AdsModer.saveNote.rpbind(false, noteEditBox, ajaxParams, true));
  }
}

AdsModer.saveNote = function(noteEditBox, ajaxParams, isDelete) {
  if (!Ads.lock('save_note', onLock, onUnlock)) {
    return;
  }

  var isOk = false;

  ajaxParams.note_text = (isDelete ? '' : val('ads_note_edit'));
  ajax.post('/adsmoder?act=a_edit_notes', ajaxParams, {onDone: onComplete, onFail: onComplete.rpbind(true)});

  function onComplete(response) {
    isOk = (response && response.ok);
    Ads.unlock('save_note');
    if (isOk) {
      nav.reload();
    } else {
      showFastBox(getLang('ads_error_box_title'), getLang('ads_error_text'));
    }
  }
  function onLock() {
    noteEditBox.showProgress();
  }
  function onUnlock() {
    if (!isOk) {
      noteEditBox.hideProgress();
    }
  }
}

AdsModer.openCategoriesEditBox = function(requestKey, linkElem) {
  var editBox = showFastBox({title: 'Изменение тематики объявления', width: 440}, cur.categoriesEditBoxHtml);
  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton('Изменить', applyChanges, 'yes');

  var requestParams = cur.requestsParams[requestKey];

  var category1_id    = requestParams.ui_category1_id;
  var category2_id    = requestParams.ui_category2_id;
  var subcategory1_id = requestParams.ui_subcategory1_id;
  var subcategory2_id = requestParams.ui_subcategory2_id;

  var uiCategory1 = new Dropdown(ge('ads_moder_category1'), cur.categoriesData, {
    selectedItems: category1_id,
    width:         250,
    height:        400,
    onChange:      onChangeCategory1
  });
  var uiCategory2 = new Dropdown(ge('ads_moder_category2'), cur.categoriesData, {
    selectedItems: category2_id,
    width:         250,
    height:        400,
    onChange:      onChangeCategory2
  });
  var uiSubcategory1 = new Dropdown(ge('ads_moder_subcategory1'), [], {
    width:    250,
    height:   400,
    onChange: function(value) {
      subcategory1_id = intval(value);
    }
  });
  var uiSubcategory2 = new Dropdown(ge('ads_moder_subcategory2'), [], {
    width:    250,
    height:   400,
    onChange: function(value) {
      subcategory2_id = intval(value);
    }
  });

  onChangeCategory1(category1_id);
  onChangeCategory2(category2_id);

  var boxOptions = {};
  boxOptions.onClean = function() {
    uiCategory1.destroy();
    uiCategory2.destroy();
    uiSubcategory1.destroy();
    uiSubcategory2.destroy();
  };
  editBox.setOptions(boxOptions);

  function onChangeCategory1(value) {
    value = intval(value);
    if (value != category1_id) {
      subcategory1_id = 0;
    }
    category1_id = value;
    var data = cur.subcategoriesData[value] || [];
    var disabledText = (value ? getLang('ads_no_subcategories') : getLang('ads_first_select_category1'));
    uiSubcategory1.setOptions({disabledText: disabledText});
    uiSubcategory1.setData(data);
    if (subcategory1_id) {
      uiSubcategory1.val(subcategory1_id);
    } else {
      uiSubcategory1.clear();
    }
    uiSubcategory1.disable(data.length == 0);
  }
  function onChangeCategory2(value) {
    value = intval(value);
    if (value != category2_id) {
      subcategory2_id = 0;
    }
    category2_id = value;
    var data = cur.subcategoriesData[value] || [];
    var disabledText = (value ? getLang('ads_no_subcategories') : getLang('ads_first_select_category2'));
    uiSubcategory2.setOptions({disabledText: disabledText});
    uiSubcategory2.setData(data);
    if (subcategory2_id) {
      uiSubcategory2.val(subcategory2_id);
    } else {
      uiSubcategory2.clear();
    }
    uiSubcategory2.disable(data.length == 0);
  }
  function applyChanges() {
    if (!category1_id && !category2_id) {
      showFastBox('Ошибка', 'Не задана тематика.');
      return;
    }

    cur.requestsParams[requestKey].category1_id       = (subcategory1_id || category1_id);
    cur.requestsParams[requestKey].category2_id       = (subcategory2_id || category2_id);
    cur.requestsParams[requestKey].ui_category1_id    = category1_id;
    cur.requestsParams[requestKey].ui_category2_id    = category2_id;
    cur.requestsParams[requestKey].ui_subcategory1_id = subcategory1_id;
    cur.requestsParams[requestKey].ui_subcategory2_id = subcategory2_id;
    cur.requestsParams[requestKey].categories_changed = true;

    var category1Elem       = geByClass1('ads_category1', linkElem);
    var category1ParentElem = geByClass1('ads_category1_parent', linkElem);
    if (subcategory1_id) {
      replaceClass(category1Elem, 'ads_category', 'ads_subcategory');
      category1Elem.innerHTML = uiSubcategory1.val_full()[1];
      category1ParentElem.innerHTML = ' (' + uiCategory1.val_full()[1] + ')';
    } else {
      replaceClass(category1Elem, 'ads_subcategory', 'ads_category');
      category1Elem.innerHTML = (category1_id ? uiCategory1.val_full()[1] : '');
      category1ParentElem.innerHTML = '';
    }

    var category2Elem       = geByClass1('ads_category2', linkElem);
    var category2ParentElem = geByClass1('ads_category2_parent', linkElem);
    if (subcategory2_id) {
      replaceClass(category2Elem, 'ads_category', 'ads_subcategory');
      category2Elem.innerHTML = uiSubcategory2.val_full()[1];
      category2ParentElem.innerHTML = ' (' + uiCategory2.val_full()[1] + ')';
    } else {
      replaceClass(category2Elem, 'ads_subcategory', 'ads_category');
      category2Elem.innerHTML = (category2_id ? uiCategory2.val_full()[1] : '');
      category2ParentElem.innerHTML = '';
    }

    editBox.hide();
  }
}

AdsModer.premoderationProcessRequest = function(action, requestKey, requestKeyModer, onCompleteExternal) {

  var requestParams      = cur.requestsParams[requestKey];
  var requestParamsModer = cur.requestsParams[requestKeyModer];

  if (!requestKey || !requestKeyModer || !requestParams || !requestParamsModer) {
    return;
  }

  var moderComment = ge('moder_comment_' + requestKeyModer);

  if (action !== 'disapprove'
      || (action === 'disapprove' && (moderComment.getValue().trim().length || cur.uiReasonsControls[requestKeyModer].getSelectedItems().length))) {
    var result = AdsModer.premoderationProcessRequestsMassCheck(action, requestKey);
    if (result) {
      return;
    }
  }

  var resultArea   = ge('request_result_area_' + requestKey);

  var ajaxParams = {};
  ajaxParams.action       = action;
  ajaxParams.request_id   = requestParams.request_id;
  ajaxParams.ad_id        = requestParams.ad_id;
  ajaxParams.hash         = requestParams.hash;
  ajaxParams.checksum     = requestParams.checksum_all;

  if (action === 'approve') {
    if (requestParamsModer.categories_changed) {
      ajaxParams.category1_id = requestParamsModer.category1_id;
      ajaxParams.category2_id = requestParamsModer.category2_id;
    } else {
      ajaxParams.category1_id = requestParams.category1_id;
      ajaxParams.category2_id = requestParams.category2_id;
    }
  }

  ajaxParams.moder_comment = moderComment.getValue();
  if (action === 'disapprove') {
    ajaxParams.moder_rules = cur.uiReasonsControls[requestKeyModer].getSelectedItems().join(',');
  }

  resultArea.innerHTML = '<img src="/images/upload.gif" />';

  ajax.post('/adsmoder?act=a_premoderation_process', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    var responseText = ((response && response.text) ? response.text : 'Ошибка!');
    resultArea.innerHTML = responseText;
    if (isFunction(onCompleteExternal)) {
      onCompleteExternal(response, requestKey, responseText);
    }
    return true;
  };
}

AdsModer.premoderationProcessRequestsMassCheck = function(action, requestKey) {

  var requestsKeys = [], allRequestsKeys;
  if (cur.multipleRequestsIds.length) {
    requestsKeys = cur.multipleRequestsIds;
    if(cur.multipleRequestsIds.indexOf(requestKey) == -1) {
      requestsKeys = requestsKeys.concat(requestKey);
    }
  } else {
    requestsKeys = requestsKeys.concat(requestKey);
  }

  allRequestsKeys = requestsKeys.slice();

  each(requestsKeys, function(i, requestKey) {
    var requestParams = cur.requestsParams[requestKey];
    if (action === 'approve') {
      if (requestParams.categories_changed) {
        if (cur.requestsChecksumsApproveWithoutCategories[requestParams.checksum_approve_without_categories].length > 1) {
          allRequestsKeys = allRequestsKeys.concat(cur.requestsChecksumsApproveWithoutCategories[requestParams.checksum_approve_without_categories]);
        }
      } else {
        if (cur.requestsChecksumsApproveWithCategories[requestParams.checksum_approve_with_categories].length > 1) {
          allRequestsKeys = allRequestsKeys.concat(cur.requestsChecksumsApproveWithCategories[requestParams.checksum_approve_with_categories]);
        }
      }
    } else if (action === 'disapprove') {
      if (cur.requestsChecksumsDisapprove[requestParams.checksum_disapprove].length > 1) {
        allRequestsKeys = allRequestsKeys.concat(cur.requestsChecksumsDisapprove[requestParams.checksum_disapprove]);
      }
    }
  });

  if (allRequestsKeys.length == 1) {
    return false;
  }

  allRequestsKeys = allRequestsKeys.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });

  var confirmTitle   = ((action === 'approve') ? 'Массовое одобрение' : 'Массовое отклонение');
  var confirmText    = 'Похожих объявлений на текущей странице: '+allRequestsKeys.length;
  var processAllText = ((action === 'approve') ? 'Одобрить все' : 'Отклонить все');
  var processOneText = ((action === 'approve') ? 'Одобрить одно' : 'Отклонить одно');

  //var box = showFastBox(confirmTitle, cur.massBoxHtml, processAllText, processAll, processOneText, processOne);
  //geByClass1('ads_premoderation_mass_confirm_text', box.bodyNode).innerHTML = confirmText;

  var box = showFastBox({title: confirmTitle, hideButtons: true}, cur.massBoxHtml);
  processAll();
  return true;

  function processAll() {
    cleanMultipleChoices();
    cleanChecksums();
    AdsModer.premoderationProcessRequestsMass(action, requestKey, allRequestsKeys, box);
  }
  function processOne() {
    cleanChecksums();
    box.hide();
    AdsModer.premoderationProcessRequest(action, requestKey, requestKey);
  }
  function cleanChecksums() {
    each(allRequestsKeys, function(i, requestKey) {
      var requestParams = cur.requestsParams[requestKey];
      cur.requestsChecksumsApproveWithCategories[requestParams.checksum_approve_with_categories] = [];
      cur.requestsChecksumsApproveWithoutCategories[requestParams.checksum_approve_without_categories] = [];
      cur.requestsChecksumsDisapprove[requestParams.checksum_disapprove] = [];
    });
  }
  function cleanMultipleChoices() {
    for(var idx = cur.multipleRequestsIds.length - 1; idx >= 0; idx--) {
      AdsModer.multipleRequestsRemoveRequest(cur.multipleRequestsIds[idx]);
    }
  }
}

AdsModer.premoderationProcessRequestsMass = function(action, requestKeyModer, requestsKeys, box) {
  var requestParams = cur.requestsParams[requestKeyModer];

  var totalCount       = requestsKeys.length;
  var completeCount    = 0;
  var approvedCount    = 0;
  var disapprovedCount = 0;
  var errorCount       = 0;
  var responseInfos    = [];

  //box.removeButtons();
  //box.addButton(getLang('box_close'), false, 'yes');

  var progressWrapElem = geByClass1('ads_premoderation_mass_progress_wrap2', box.bodyNode);
  var progressElem     = geByClass1('ads_gradient_progress', box.bodyNode);
  var resultElem       = geByClass1('ads_premoderation_mass_result', box.bodyNode);
  var resultTextElem   = geByClass1('ads_premoderation_mass_result_text', box.bodyNode);
  var resultMoreElem   = geByClass1('ads_premoderation_mass_result_more', box.bodyNode);
  drawProgress();
  show(progressWrapElem);

  for (var i = 0; requestKey = requestsKeys[i]; i++) {
    setTimeout(AdsModer.premoderationProcessRequest.pbind(action, requestKey, requestKeyModer, onComplete), 200 * i);
  }

  function onComplete(response, responseRequestKey, responseText) {
    var responseAdId = cur.requestsParams[responseRequestKey].ad_id;
    responseInfos.push('<a href="/ads?act=office&union_id='+responseAdId+'" target="_blank">'+responseAdId+' - '+responseText+'</a>');

    if (response && (response.approved || response.disapproved)) {
      if (response.approved) {
        approvedCount++;
      }
      if (response.disapproved) {
        disapprovedCount++;
      }
    } else {
      errorCount++;
      removeClass(ge('req'+responseRequestKey), 'unshown');
    }
    completeCount++;

    drawProgress();
    if (completeCount == totalCount) {
      setTimeout(drawResults, 1000);
    }
  }
  function drawProgress() {
    var percent = intval(completeCount / totalCount * 100);
    setStyle(progressElem, {width: percent + '%'});
  }
  function drawResults() {
    hide(progressWrapElem);

    box.setOptions({'hideButtons' : false});

    var resultText = '';
    if (approvedCount) {
      resultText += 'Одобрено: '+approvedCount+'<br>';
    }
    if (disapprovedCount) {
      resultText += 'Отклонено: '+disapprovedCount+'<br>';
    }
    resultText += 'Ошибок: '+errorCount+'<br>';

    resultTextElem.innerHTML = resultText;
    resultMoreElem.innerHTML = responseInfos.join('<br>');
    show(resultElem);
  }
}

AdsModer.premoderationTakeUnion = function(unionId, hash) {
  var ajaxParams = {};
  ajaxParams.hash     = hash;
  ajaxParams.union_id = unionId;
  ajaxParams.action   = 'take_union';
  ajax.post('/adsmoder?act=a_premoderation_manage_work', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    if (response && response.ok) {
      if (response.redirect) {
        nav.go(response.redirect);
      }
    } else {
      var message = ((response && response.error) ? response.error : 'Ошибка');
      showFastBox({title: 'Ошибка', onHide: function() { nav.reload(); }}, message);
    }
    return true;
  }
}

AdsModer.premoderationTakeBackUnion = function(unionId, hash) {
  var ajaxParams = {};
  ajaxParams.hash     = hash;
  ajaxParams.union_id = unionId;
  ajaxParams.action   = 'take_back_union';
  ajax.post('/adsmoder?act=a_premoderation_manage_work', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    if (response && response.ok) {
      nav.reload();
    } else {
      var message = ((response && response.error) ? response.error : 'Ошибка');
      showFastBox({title: 'Ошибка', onHide: function() { nav.reload(); }}, message);
    }
    return true;
  }
}

AdsModer.premoderationStopWork = function(hash) {
  var ajaxParams = {};
  ajaxParams.hash   = hash;
  ajaxParams.action = 'stop_work';
  ajax.post('/adsmoder?act=a_premoderation_manage_work', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    if (response && response.ok) {
      nav.reload();
    } else {
      var message = ((response && response.error) ? response.error : 'Ошибка');
      showFastBox({title: 'Ошибка', onHide: function() { nav.reload(); }}, message);
    }
    return true;
  }
}

AdsModer.premoderationFixRequest = function(wrapElemId, requestId, action, hash) {
  if (!Ads.lock(wrapElemId, onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {}
  ajaxParams.request_id = requestId;
  ajaxParams.action     = action;
  ajaxParams.hash       = hash;

  ajax.post('/adsmoder?act=premoderation_fix_request', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock(wrapElemId);
    if (response && response.text_new) {
      var wrapElem = ge(wrapElemId);
      if (wrapElem) {
        wrapElem.parentNode.replaceChild(se(response.text_new), wrapElem);
      }
    }
    return true;
  }
  function onLock() {
    show(geByTag1('img', ge(wrapElemId)));
  }
  function onUnlock() {
    var wrapElem = ge(wrapElemId);
    if (wrapElem) {
      hide(geByTag1('img', wrapElem));
    }
  }
}

AdsModer.switchOfficeBlock = function(actionLocation, confirmTitle, confirmText, actionText) {
  function switchBlocked() {
    Ads.simpleAjax(actionLocation);
  }
  showFastBox(confirmTitle, confirmText, actionText, switchBlocked, getLang('box_cancel'));
}

AdsModer.toggleWithArrow = function(elems, thisElem) {
  var visibleNew = intval(!isVisible(elems[0]));
  each(elems, function(i,v) {
    toggle(v, visibleNew);
  });
  var arrows = ['&darr;', '&uarr;'];
  if (thisElem) {
    var arrowFrom = replaceEntities(arrows[(visibleNew + 1) % 2]);
    var arrowTo   = replaceEntities(arrows[visibleNew]);
    thisElem.innerHTML = thisElem.innerHTML.replace(arrowFrom, arrowTo);
  }
  return false;
}

AdsModer.openCancelClicksBox = function(ajaxParams) {
  var showOptions = {params: {}};
  showBox('/adsweb?act=log_cancel_box', ajaxParams, showOptions);
}

AdsModer.initCancelClicksBox = function(box, ajaxParams) {
  var handler = AdsModer.cancelClicks.pbind(box, ajaxParams);
  box.removeButtons();
  box.addButton(getLang('box_cancel'), false, 'no');
  box.addButton('Отменить клики', handler, 'yes');
}

AdsModer.cancelClicks = function(box, ajaxParams) {
  if (!Ads.lock('cancelClicks', onLock, onUnlock)) {
    return;
  }

  ajax.post('/adsweb?act=log_cancel', ajaxParams, {onDone: onComplete, onFail: onComplete});

  var isNoHide = false
  function onComplete(response) {
    var isError = true;
    if (response && response.ok) {
      if (response.part) {
        isNoHide = true;
        setTimeout(AdsModer.cancelClicks.pbind(box, ajaxParams), 1);
      } else {
        nav.reload();
      }
      isError = false;
    }
    Ads.unlock('cancelClicks');
    if (isError) {
      showFastBox('Ошибка', (response && typeof response === 'string') ? response : 'Ошибка');
    }
    return true;
  }
  function onLock() {
    box.showProgress();
  }
  function onUnlock() {
    if (!isNoHide) {
      box.hide();
    }
  }
}

AdsModer.openClickfraudersPrepareBanBox = function(usersIds, day) {
  var ajaxParams = {};
  ajaxParams.users_ids = usersIds;
  ajaxParams.day       = day;

  var showOptions = {params: {}};
  showOptions.params.width = 650;

  showBox('/adsweb?act=clickfrauders_prepare_ban_box', ajaxParams, showOptions);
}

AdsModer.initClickfraudersPrepareBanBox = function(box, hash, usersIds, day) {
  var prepareBanHandler = AdsModer.clickfraudersPrepareBan.pbind(box, hash, usersIds, day);
  box.removeButtons();
  box.addButton(getLang('box_cancel'), false, 'no');
  box.addButton('Добавить', prepareBanHandler, 'yes');
}

AdsModer.clickfraudersPrepareBan = function(box, hash, usersIds, day) {
  if (!Ads.lock('clickfraudersPrepareBan', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams.hash      = hash;
  ajaxParams.users_ids = usersIds;
  ajaxParams.day       = day;

  ajax.post('/adsweb?act=clickfrauders_prepare_ban', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('clickfraudersPrepareBan');
    if (response && response.message) {
      showFastBox('Ок', response.message);
    } else {
      showFastBox('Ошибка', 'Ошибка');
    }
    return true;
  }
  function onLock() {
    box.showProgress();
  }
  function onUnlock() {
    box.hide();
  }
}

AdsModer.historyGet = function(elem, notNavigationParam) {
  while (elem && elem.nodeName.toLowerCase() !== 'form') {
    elem = elem.parentNode;
  }
  if (!elem) {
    return;
  }
  var values = serializeForm(elem);
  var params = values.other_params;
  delete values.other_params;
  for (var i in values) {
    if (values[i]) {
      params = '&' + i + '=' + values[i] + params;
    }
  }
  nav.go('/adsmoder?act=history' + params);
}

AdsModer.historyToggleFilters = function() {
  var filtersContainerElem = ge('ads_moder_history');
  var filtersElems = geByClass('ads_navigation_link', filtersContainerElem);
  for (var i = 0; elem = filtersElems[i]; i++) {
      if (hasClass(elem, 'current')) {
          continue
      }
      elem = elem.parentNode;
      if (elem.nodeName.toLowerCase() !== 'span') {
          continue
      }
      toggleClass(elem, 'unshown');
  }
}

AdsModer.statSummaryInit = function(periodType, fromYear, fromMonth, fromDay, toYear, toMonth, toDay) {
  var datePickerOptionsFrom = {
    mode: (periodType === 'month') ? 'm' : 'd',
    year:  fromYear,
    month: fromMonth,
    day:   fromDay,
    width: 130,
    pastActive: true,
    onUpdate: function(date, mode) {
      fromYear  = date.y;
      fromMonth = date.m;
      fromDay   = date.d;
      updateLink();
    }
  };
  var datePickerOptionsTo = {
    mode: (periodType === 'month') ? 'm' : 'd',
    year:  toYear,
    month: toMonth,
    day:   toDay,
    width: 130,
    pastActive: true,
    onUpdate: function(date, mode) {
      toYear  = date.y;
      toMonth = date.m;
      toDay   = date.d;
      updateLink();
    }
  };
  new Datepicker(ge('ads_moder_stat_summary_from'), datePickerOptionsFrom);
  new Datepicker(ge('ads_moder_stat_summary_to'), datePickerOptionsTo);

  function updateLink() {
    var fromPeriod = fromYear * 100 + fromMonth;
    var toPeriod   = toYear   * 100 + toMonth;
    if (periodType !== 'month') {
      fromPeriod = fromPeriod * 100 + fromDay;
      toPeriod   = toPeriod   * 100 + toDay;
    }
    var linkElem = ge('ads_moder_stat_summary_range_link');
    linkElem.href = linkElem.href.replace(/&period=\d+-\d+/, '&period=' + fromPeriod + '-' + toPeriod);
    linkElem.style.opacity = 1;
  }
}

AdsModer.statSummaryShowAllProperties = function() {
  var propertiesElem = ge('ads_moder_stat_summary_filter_properties');
  var elems = geByClass('ads_moder_stat_summary_filter_property', propertiesElem);
  var shower = ge('ads_moder_stat_summary_filter_properties_shower');
  var isShow = null;

  for (var i = 0, elem; elem = elems[i]; i++) {
    if (hasClass(elem, 'toggle')) {
      if (isShow === null) {
        isShow = !!hasClass(elem, 'unshown')
      }
      toggleClass(elem, 'unshown');
    }
  }

  shower.innerHTML = shower.getAttribute(isShow ? 'text_hider' : 'text_shower');
}

AdsModer.statSummaryShowAllPropertyItems = function(hiderElem) {
  if (!hasClass('ads_round_tab_hider')) {
    hiderElem = geByClass1('ads_round_tab_hider', hiderElem);
  }
  if (!hiderElem) {
    return;
  }

  var propertyElem = hiderElem;
  while (propertyElem && !hasClass(propertyElem, 'ads_moder_stat_summary_filter_property')) {
    propertyElem = propertyElem.parentNode;
  }
  if (!propertyElem) {
    return;
  }

  var elems = geByClass('ads_round_tab_wrap', propertyElem);

  for (var i = 0, elem; elem = elems[i]; i++) {
    if (hasClass(elem, 'toggle')) {
      toggleClass(elem, 'unshown');
    }
  }

  toggleClass(hiderElem, 'hide');
}

AdsModer.statSummaryDistrShowCountLabel = function(id, i, val) {
  var contXy = getXY(ge(id+'_stats_graph_wrap'));
  var colXy  = getXY(ge(id+'_distr_col_'+i));

  setStyle(ge(id+'_max_label'), {
    left: colXy[0] - contXy[0] + 14,
    top:  colXy[1] - contXy[1] - 11
  });
  ge(id+'_max_label').innerHTML = val;
  show(id+'_max_label');
  setStyle(ge(id+'_max_label_out'), {
    width:  ge(id+'_max_label').offsetWidth + 2,
    height: ge(id+'_max_label').offsetHeight + 2,
    left:   colXy[0] - contXy[0] + 13,
    top:    colXy[1] - contXy[1] - 12
  });
  show(id+'_max_label_out');
  setStyle(ge(id+'_max_label_out2'), {
    width:  ge(id+'_max_label').offsetWidth + 4,
    height: ge(id+'_max_label').offsetHeight + 4,
    left:   colXy[0] - contXy[0] + 12,
    top:    colXy[1] - contXy[1] - 13
  });
  show(id+'_max_label_out2');
}

AdsModer.statSummaryDistrHideCountLabel = function(id) {
  hide(id+'_max_label');
  hide(id+'_max_label_out');
  hide(id+'_max_label_out2');
}

AdsModer.statSummaryShowVotesBox = function(periodType, period) {
  var ajaxParams = {};
  ajaxParams.period_type = periodType;
  ajaxParams.period      = period;

  var showOptions = {params: {}};

  showBox('/adsmoder?act=stat_summary_votes', ajaxParams, showOptions);
}

AdsModer.increaseBudget = function() {
  if (!Ads.lock('increaseBudget', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams.union_id     = val('ads_increase_budget_union_id');
  ajaxParams.money_amount = val('ads_increase_budget_amount');
  ajaxParams.hash         = val('ads_increase_budget_hash');

  ajax.post('/adsmoder?act=increase_budget', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('increaseBudget');
    if (response && response.redirect) {
      nav.go(response.redirect);
    } else {
      var msg = ((response && response.error) ? response.error : 'Ошибка');
      showFastBox('Ошибка', msg);
    }
    return true;
  }
  function onLock() {
    lockButton('ads_increase_budget_button');
  }
  function onUnlock() {
    unlockButton('ads_increase_budget_button');
  }
}

AdsModer.openDisableOfficeBox = function(ajaxParams, isCompany) {
  cur.lang.ads_disable_office_box_title               = 'Закрытие рекламного кабинета';
  cur.lang.ads_disable_office_box_button              = 'Закрыть кабинет';
  cur.lang.ads_disable_office_confirm_message         = 'Вы уверены что хотите закрыть рекламный кабинет?<br><br>После закрытия кабинета останется доступ к статистике, но любые активные действия будут невозможны.';
  cur.lang.ads_disable_office_company_confirm_message = 'Только после закрытия текущего кабинета компания сможет выставлять счета в новом кабинете.';
  cur.lang.ads_disable_office_reason_label            = 'Укажите причину закрытия кабинета:';

  var boxHtml = '';
  boxHtml += getLang('ads_disable_office_confirm_message')
  if (isCompany) {
    boxHtml += '<br><br>' + getLang('ads_disable_office_company_confirm_message');
  }
  boxHtml += '<br><br>' + getLang('ads_disable_office_reason_label');
  boxHtml += '<div class="ads_note_edit_wrap"><div><textarea id="ads_note_edit"></textarea></div></div>';

  var box = showFastBox(getLang('ads_disable_office_box_title'), boxHtml, getLang('ads_disable_office_box_button'), function() { AdsModer.disableOffice(box, ajaxParams); }, getLang('box_cancel'));
}

AdsModer.disableOffice = function(box, ajaxParams) {
  if (!Ads.lock('disableOffice', onLock, onUnlock)) {
    return;
  }

  var isOk = false;

  ajaxParams.text = val('ads_note_edit');

  ajax.post('/adsmoder?act=a_disable_office', ajaxParams, {onDone: onComplete, onFail: onComplete.rpbind(true)});

  function onComplete(response) {
    isOk = (response && response.ok);
    Ads.unlock('disableOffice');
    if (isOk) {
      nav.reload();
    } else {
      showFastBox(getLang('ads_error_box_title'), response && response.error ? response.error : getLang('ads_error_text'));
    }
  }
  function onLock() {
    box.showProgress();
  }
  function onUnlock() {
    if (!isOk) {
      box.hideProgress();
    }
  }
}

AdsModer.initCreateOffice = function(params) {
  cur.do_params = params.do_params;
  placeholderSetup('ads_moder_create_office_user');
  new Radiobuttons(ge('ads_moder_create_ads_type_'), params.ads_types, {});
  new Radiobuttons(ge('ads_moder_create_office_type_'), params.offices_types, {});
}

AdsModer.doCreateOffice = function(buttonElem) {
  if (!Ads.lock('doCreateOffice', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, cur.do_params);
  ajaxParams.owner_id = val('ads_moder_create_office_user');
  ajaxParams.ads_type = val('ads_moder_create_ads_type_');
  ajaxParams.office_type = val('ads_moder_create_office_type_');

  ajax.post('/adsmoder?act=do_create_office', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('doCreateOffice');
    if (response && response.redirect) {
      nav.go(response.redirect);
    } else {
      showFastBox(getLang('ads_error_box_title'), (response && response.error) ? response.error : getLang('ads_error_text'));
    }
    return true;
  }
  function onLock() {
    document.activeElement && document.activeElement.blur();
    lockButton(buttonElem);
  }
  function onUnlock() {
    unlockButton(buttonElem);
  }
}

AdsModer.submitExportStatsForm = function (button) {
  if (!Ads.lock('offers_overall_stat_export', function () {
    lockButton(button);
  }, function () {
    unlockButton(button);
  })) {
    return false;
  }

  var downloadWatcherCookieName = 'dwcookie';
  var downloadWatcherCookieValue = Math.random();
  var postFormParams = {
    method: 'post',
    action: '/offers?act=get_overall_export_stats'
  };
  var postIframe = ce((browser.msie && browser.version < 9.0) ? '<iframe name="secret_iframe">' : 'iframe', {
    name: 'secret_iframe',
    id: 'secret_iframe'
  });
  postIframe.style.display = 'none';
  document.body.appendChild(postIframe);
  postFormParams.target = 'secret_iframe';

  var postForm = ce('form', postFormParams);

  postForm.appendChild(ce('input', {
    type: 'hidden',
    name: 'start_time',
    value: cur.exportParamsData.start_time.year + ('0'+cur.exportParamsData.start_time.month).slice(-2) + ('0'+cur.exportParamsData.start_time.day).slice(-2)
  }));
  postForm.appendChild(ce('input', {
    type: 'hidden',
    name: 'dwcookie',
    value: downloadWatcherCookieValue
  }));
  document.body.appendChild(postForm);
  postForm.submit();

  var downloadWatcherCheckInterval = setInterval(function () {
    if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue + '-error') != -1) {
      clearInterval(downloadWatcherCheckInterval);
      Ads.unlock('offers_overall_stat_export');
      showFastBox({title: getLang('global_error'), width: 350}, getLang('global_error'));
    }
    if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue + '-empty') != -1) {
      clearInterval(downloadWatcherCheckInterval);
      Ads.unlock('offers_overall_stat_export');
      showFastBox({title: 'Информация', width: 350}, 'Нет данных за выбранный месяц');
    }
    if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue) != -1) {
      clearInterval(downloadWatcherCheckInterval);
      Ads.unlock('offers_overall_stat_export');
    }
  }, 500);
}

AdsModer.onChangedDomainStatus = function (domain, new_status) {
  each(geByClass('ads_premoderation_request_link_domain_'+domain), function (i, v) {
    removeClass(v, cur.domain_statuses[domain]);
    addClass(v, new_status);
    v.setAttribute('data-value', new_status);
  });
  cur.domain_statuses[domain] = new_status;
}

AdsModer.changeDomainStatus = function (domain, new_status, old_status, action_text) {
  var status_parts = new_status.split(':', 2);
  var edit_comment = false;
  if (status_parts.length > 1) {
    new_status = status_parts[0];
    if (new_status == '') {
      new_status = undefined;
    }
    if (status_parts[1] == 'comment') {
      edit_comment = true;
    }
  }
  if (edit_comment) {
    AdsModer.openDomainCommentEditBox(domain, false, [[new_status, action_text]]);
  } else {
    ajax.post('/adsmoder?act=a_change_domain_status', {
      domain: domain,
      new_status: new_status,
      hash: cur.change_domain_status_hash
    }, {
      onDone: function (response) {
        AdsModer.onChangedDomainStatus(domain, new_status);
      },
      onFail: function (msg) {
        showFastBox('Ошибка', msg);
      }
    });
  }
}

AdsModer.initDomainStatuses = function () {
  cur.domain_statuses = {};
  cur.linked_domain_notes = {};
  each(geByClass('ads_premoderation_request_link_domain'), function (i, v) {
    var domain = v.getAttribute('data-domain');
    cur.domain_statuses[domain] = v.getAttribute('data-value');
    cur.linked_domain_notes[domain] = v.getAttribute('data-linked-note');
    new InlineDropdown(v, {
      keepTitle: true,
      keepSelected: true,
      withArrow: hasClass(v, 'show_arrow'),
      onSelect: function (id, item) {
        AdsModer.changeDomainStatus(domain, id, cur.domain_statuses[domain], item[1]);
      },
      width: 200
    });
  });
}

AdsModer.initTemplates = function () {
  var items = [];
  for (var i in cur.premoderation_templates_order) {
    var id = cur.premoderation_templates_order[i];
    items.push([id, cur.premoderation_templates[id].short_title]);
  }
  each(geByClass('ads_moder_templates'), function (i, v) {
    var key = v.getAttribute('data-key');
    new InlineDropdown(v, {
      keepTitle: true,
      keepSelected: false,
      withArrow: true,
      items: items,
      onSelect: function (id, item) {
        val('moder_comment_'+key, cur.premoderation_templates[id].full_text);
      },
      width: 200
    });
  });
}

AdsModer.initTemplateActions = function () {
  var items = [
    ['edit', 'Изменить']
  ];
  var this_items;
  each(geByClass('ads_moder_template_actions'), function (i, v) {
    var template_id = v.getAttribute('data-template-id');
    this_items = clone(items);
    if (hasClass(v, 'ads_moder_template_inactive')) {
      this_items.push(['enable', 'Включить']);
    }
    if (hasClass(v, 'ads_moder_template_active')) {
      this_items.push(['disable', 'Выключить']);
    }
    new InlineDropdown(v, {
      keepTitle: true,
      keepSelected: false,
      withArrow: true,
      items: this_items,
      onSelect: function (id, item) {
        if (id == 'edit') {
          AdsModer.openTemplateEditBox(template_id);
        }
        if (id == 'disable') {
          AdsModer.saveTemplate('disable', template_id);
        }
        if (id == 'enable') {
          AdsModer.saveTemplate('enable', template_id);
        }
      },
      width: 200
    });
  });
}

AdsModer.initMultipleRequests = function() {
  var checkBoxElements = geByClass('multiple_requests_cb');

  for (var i in checkBoxElements) {
    var requestCb = checkBoxElements[i];
    var requestId = requestCb.getAttribute('data-request-id');
    var clientUnionId = requestCb.getAttribute('data-client-union-id');
    cur.uiMultipleRequestsCbs[requestId] = new Checkbox(requestCb, {
      label: "",
      width: "20px",
      onChange: (function(clientUnionId, requestId, value) {
        if (value) {
          AdsModer.multipleRequestsAddRequest(clientUnionId, requestId);
        } else {
          AdsModer.multipleRequestsRemoveRequest(requestId);
        }
      }).pbind(clientUnionId, requestId)
    });
  }
}

AdsModer.multipleRequestsAddRequest = function(clientUnionId, requestId, cb) {
  if(cur.multipleRequestsClientUnionId && cur.multipleRequestsClientUnionId != clientUnionId) {
    var requests = cur.multipleRequestsIds;
    for(var idx = cur.multipleRequestsIds.length - 1; idx >= 0; idx--) {
      this.multipleRequestsRemoveRequest(cur.multipleRequestsIds[idx]);
    }
    cur.multipleRequestsIds = [];
  } else if (!cur.multipleRequestsClientUnionId) {
    cur.multipleRequestsIds = [];
  }

  cur.multipleRequestsClientUnionId = clientUnionId;
  cur.multipleRequestsIds.push(requestId);

  var requestElem = ge("req"+requestId);
  addClass(requestElem, 'ads_premoderation_request_ad_choosen');
  //requestElem.style.setProperty("background-color", "#E3E9EE");
}

AdsModer.multipleRequestsRemoveRequest = function(requestId) {
  var requestElem = ge("req"+requestId);
  var index = cur.multipleRequestsIds.indexOf(requestId);
  if (index > -1) {
    cur.multipleRequestsIds.splice(index, 1);
    removeClass(requestElem, 'ads_premoderation_request_ad_choosen');
    //requestElem.style.setProperty("background-color", "white");
    cur.uiMultipleRequestsCbs[requestId].checked(0);
  }
}

try{stManager.done('ads_moder.js');}catch(e){}
