var AdsEdit = {};

AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE          = 1;
AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE           = 2;
AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE           = 3;
AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY = 4;
AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS         = 5;
AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE              = 6;
AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY           = 7;
AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY         = 8;
AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST       = 9;
AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP             = 10;

AdsEdit.ADS_AD_LINK_TYPE_GROUP              = 1;
AdsEdit.ADS_AD_LINK_TYPE_EVENT              = 2;
AdsEdit.ADS_AD_LINK_TYPE_MARKET             = 3;
AdsEdit.ADS_AD_LINK_TYPE_APP                = 4;
AdsEdit.ADS_AD_LINK_TYPE_URL                = 5;
AdsEdit.ADS_AD_LINK_TYPE_PUBLIC             = 6;
AdsEdit.ADS_AD_LINK_TYPE_VIDEO              = 7;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID = 8;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE  = 9;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE  = 10;
AdsEdit.ADS_AD_LINK_TYPE_POST               = 11;
AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP         = [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC];
AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP    = [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE];

AdsEdit.ADS_AD_COST_TYPE_CLICK = 0;
AdsEdit.ADS_AD_COST_TYPE_VIEWS = 1;

AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD              = 0;
AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW           = 1;
AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET = 2;

AdsEdit.init = function() {
  cur.toClean = {};
  cur.destroy.push(function() { AdsEdit.destroy(); } );

  cur.editor = new AdsEditor();
  cur.viewEditor = new AdsViewEditor();
  cur.targetingEditor = new AdsTargetingEditor();

  cur.viewEditor.init({}, cur.editor, cur.targetingEditor, cur.adParams, cur.adParamsData, cur.adParamsParams);
  cur.destroy.push(function() { cur.viewEditor.destroy(); } );

  cur.targetingEditor.init({}, cur.editor, cur.viewEditor, cur.targetingCriteria, cur.targetingCriteriaData, cur.targetingCriteriaRanges, cur.targetingCriteriaParams, cur.targetingGroups);
  cur.destroy.push(function() { cur.targetingEditor.destroy(); } );

  cur.editor.init(cur.viewEditor, cur.targetingEditor);
  cur.destroy.push(function() { cur.editor.destroy(); } );

  // To prevent empty fields after go to another page (no ajax) and then go back by browser Back navigation button
  // See: http://code.google.com/p/chromium/issues/detail?id=76739
  if (browser.chrome) {
    var titleElem = ge('ads_param_title');
    titleElem.value = AdsEdit.unescapeValueInit(titleElem.innerHTML);
    var descriptionElem = ge('ads_param_description');
    descriptionElem.value = AdsEdit.unescapeValueInit(descriptionElem.innerHTML);
    var tagsElem = ge('ads_targeting_criterion_tags');
    tagsElem.value = AdsEdit.unescapeValueInit(tagsElem.innerHTML);
  }

  Ads.initFixed('ads_edit_audience_wrap');
}

AdsEdit.destroy = function() {
  for (var i in cur.toClean) {
    cleanElems(i);
  }
}

AdsEdit.escapeValue = function(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

AdsEdit.unescapeValueInit = function(value) {
  return replaceEntities(value);
}

AdsEdit.unescapeValue = function(value) {
  return replaceEntities(value.replace(/&/g, '&amp;'));
}

AdsEdit.getTextWidth = function(text) {
  var elem = ce('span', {innerHTML: text});
  document.body.appendChild(elem);
  var size = getSize(elem);
  re(elem)
  return size[0];
}

AdsEdit.showError = function(message, section) {
  var sections = ['ad', 'view', 'targeting', 'behavior'];
  if (!inArray(section, sections)) {
    section = 'ad';
  }

  for (var i in sections) {
    if (sections[i] !== section) {
      addClass('ads_edit_error_' + sections[i], 'unshown');
    }
  }

  cur.lastErrorMessage = message;

  var errorElem = ge('ads_edit_error_' + section);

  errorElem.innerHTML = message;
  removeClass(errorElem, 'unshown');

  Ads.scrollToError(errorElem);
}

AdsEdit.hideErrors = function(noSectionAd) {
  var sections = ['ad', 'view', 'targeting', 'behavior'];
  for (var i in sections) {
    if (noSectionAd && sections[i] === 'ad') {
      continue;
    }
    var elem = ge('ads_edit_error_' + sections[i]);
    addClass(elem, 'unshown');
    elem.innerHTML = '';
  }
}

AdsEdit.getLastError = function() {
  return cur.lastErrorMessage;
}

AdsEdit.showTargetingCriterionHelp = function(event, helpKey) {
  var helpValue = cur.targetingCriteriaHelp[helpKey];

  var boxOptions = {};
  boxOptions.title = getLang('ads_tip');
  boxOptions.width = 350;
  boxOptions.dark = true;
  showFastBox(boxOptions, helpValue);

  cancelEvent(event);
  return false;
}

AdsEdit.initHelpTooltipTarget = function(targetElem, handler, curLocal) {
  addEvent(targetElem, 'mouseover mouseout', handler);
  curLocal.destroy.push(function(){ removeEvent(targetElem, 'mouseover mouseout', handler); });
  setTimeout(function() {
    var elemsArr = [];
    elemsArr[0] = geByTag('input', targetElem);
    elemsArr[1] = geByTag('textarea', targetElem);
    for (var j = 0, elems; elems = elemsArr[j]; j++) {
      for (var i = 0, elem; elem = elems[i]; i++) {
        var nodeName = elem.nodeName.toLowerCase();
        if (!elem.readOnly && (nodeName === 'input' && elem.type.toLowerCase() === 'text' || nodeName === 'textarea')) {
          addEvent(elem, 'focus blur', handler);
          curLocal.destroy.push(function(elem){ removeEvent(elem, 'focus blur', handler); }.pbind(elem));
        }
      }
    }
  }, 500);
}

AdsEdit.initHelpTooltip = function(targetElem, handler, ttContainer, curLocal) {
  var tt = ttContainer.tt = targetElem.tt;
  curLocal.destroy.push(function() { tt.destroy(targetElem); });

  var tootltipTextElem = geByClass1('ads_edit_tt_text', tt.container);
  addEvent(tootltipTextElem, 'mouseover mouseout', handler);
  curLocal.destroy.push(function(){ removeEvent(tootltipTextElem, 'mouseover mouseout', handler); });
}

AdsEdit.showHelpCriterionTooltip = function(helpTooltipName, targetElem, ttHandler, ttContainer, helpText, shiftLeft, shiftTop, curLocal, forceTooltip) {
  if (isFunction(helpText)) {
    helpText = helpText();
  }
  if (!helpText) {
    return;
  }

  if (cur.lastHelpTooltipName && ((cur.lastHelpTooltipName != helpTooltipName))) {
    var lastTooltip = cur.getLastTooltip();
    if (lastTooltip) {
      lastTooltip.hide();
      if (inArray(helpTooltipName,  ['description', 'title', 'platform'])) {
        forceTooltip = true;
      }
    }
  }

  if ((cur.getLastTooltipText && (helpText != cur.getLastTooltipText())) && (cur.lastHelpTooltipName == helpTooltipName) && !forceTooltip) {
    var lastTooltip = cur.getLastTooltip();
    if (lastTooltip) {
      lastTooltip.hide();
      setTimeout((function () {
        this.showHelpCriterionTooltip(helpTooltipName, targetElem, ttHandler, ttContainer, helpText, shiftLeft, shiftTop, curLocal, true);
      }).bind(this), 500);
      return;
    }
  }
  cur.getLastTooltip = function(){ return targetElem.tt; };
  cur.getLastTooltipText = function(){ return helpText; };
  cur.lastHelpTooltipName = helpTooltipName;

  if (shiftLeft === undefined || shiftLeft === false || shiftLeft === null) {
    shiftLeft = -350;
  }
  if (shiftTop === undefined || shiftTop === false || shiftTop === null) {
    shiftTop = -58;
  }

  showTooltip(targetElem, {
    text: '<div class="ads_edit_tt_pointer ads_edit_tt_pointer_' + helpTooltipName + '"></div><div class="ads_edit_tt_text">' + helpText + '</div>',
    className: 'ads_edit_tt',
    slideX: 15,
    shift: [shiftLeft, 0, shiftTop],
    nohide: true,
    forcetodown: true,
    force: !!forceTooltip,
    onCreate: function() { AdsEdit.initHelpTooltip(targetElem, ttHandler, ttContainer, curLocal); }
  });
}

AdsEdit.hideHelpTooltip = function(tt) {
  if (tt) {
    tt.hide();
  }
}

AdsEdit.onHelpTooltipEvent = function(event, helpTooltipName, context, showTooltip, hideTooltip) {
  switch (event.type) {
    case 'manual_show':
      context.focus = true; // prevent tooltip from hiding on mouseout
      showHelp(true);
      break;
    case 'manual_hide':
      context.focus = false;
      hideHelp(true);
      break;
    case 'focus':
      cur.focusedHelpTooltipName = helpTooltipName;
      context.focus = true;
      if (context.overTimeout) {
        clearTimeout(context.overTimeout)
        delete context.overTimeout;
      }
      //showHelp(); // Do not show tooltip on focus
      break;
    case 'blur':
      if (cur.focusedHelpTooltipName == helpTooltipName) {
        delete cur.focusedHelpTooltipName;
      }
      context.focus = false;
      hideHelp();
      break;
    case 'mouseover':
      context.over = 1;
      context.out = 0;
      if (context.overTimeout) {
        clearTimeout(context.overTimeout)
        delete context.overTimeout;
      }
      if (context.outTimeout) {
        clearTimeout(context.outTimeout)
        delete context.outTimeout;
      }
      setTimeout(function(){
        if (context.over == 1) {
          context.over = 2;
          context.overTimeout = setTimeout(function(){
            showHelp();
            delete context.overTimeout;
          }, 100);
        }
      }, 100);
      break;
    case 'mouseout':
      context.over = 0;
      context.out  = 1;
      if (context.overTimeout) {
        clearTimeout(context.overTimeout)
        delete context.overTimeout;
      }
      if (context.outTimeout) {
        clearTimeout(context.outTimeout)
        delete context.outTimeout;
      }
      setTimeout(function(){
        if (context.out == 1) {
          context.out = 2;
          context.outTimeout = setTimeout(function(){
            hideHelp();
            delete context.outTimeout;
          }, 500);
        }
      }, 100);
      break;
  }

  function showHelp(force) {
    if (context.focus || context.over == 2 && !cur.focusedHelpTooltipName || !!force) {
      showTooltip();
    }
  }
  function hideHelp(force) {
    if ((!context.focus && context.out == 2) || !!force) {
      hideTooltip();
    }
  }
}

AdsEdit.toggleTargetingGroup = function(groupId, groupElemId) {
  var prefValue;
  var hiderTitleElem = ge(groupElemId + '_hider_title');

  cur.toClean[groupElemId] = true;

  if (hasClass(hiderTitleElem, 'on')) {
    prefValue = 0;
  } else {
    prefValue = 1;
  }

  if (prefValue) {
    cur.targetingEditor.showGroup(groupId);
  }

  if (prefValue == 0) {
    removeClass(hiderTitleElem, 'on');
    addClass(hiderTitleElem, 'off');
    slideUp(groupElemId, 200);
  } else {
    removeClass(hiderTitleElem, 'off');
    addClass(hiderTitleElem, 'on');
    slideDown(groupElemId, 200, function(){ cur.targetingEditor.showGroupEnd(groupId); });
  }

  if (!cur.targetingPrefs) {
    cur.targetingPrefs = {};
  }
  cur.targetingPrefs[groupId] = prefValue;

  AdsEdit.saveTargetingPrefs();
}

AdsEdit.updateTargetingGroups = function() {
  var hiderInfoElem = ge('ads_edit_targeting_group_additional_hider_info');
  hiderInfoElem.innerHTML = (cur.targetingEditor.isUserDevicesHidden() ? getLang('ads_criteria_section_additional_info_retargeting') : getLang('ads_criteria_section_additional_info'));
}

AdsEdit.saveTargetingPrefs = function(delayed) {

  if (!delayed) {
    if (cur.saveTargetingPrefsTimeout === undefined) {
      cur.destroy.push(function() { clearTimeout(cur.saveTargetingPrefsTimeout); });
    } else {
      clearTimeout(cur.saveTargetingPrefsTimeout);
    }
    cur.saveTargetingPrefsTimeout = setTimeout(function() { AdsEdit.saveTargetingPrefs(true); }, 2000);
    return;
  }

  var prefsStr = '';
  for (var i in cur.targetingPrefs) {
    if (prefsStr) {
      prefsStr += ',';
    }
    prefsStr += i + '=' + cur.targetingPrefs[i];
  }
  cur.targetingPrefs = {};

  var ajaxParams = {};
  ajaxParams.hash = cur.targetingPrefsHash;
  ajaxParams.targeting_prefs = prefsStr;

  ajax.post('/adsedit?act=save_targeting_prefs', ajaxParams, {onFail: function() { return true; }});
}

AdsEdit.saveAd = function() {
  if (!Ads.lock('save_ad', onLock, onUnlock)) {
    return;
  }

  var errorTag = 'ads_edit_erorr_tag_' + rand(0, 2000000000);
  function hideDomainError() {
    if (ge(errorTag)) {
      AdsEdit.hideErrors();
    }
  }
  var domainResult = cur.viewEditor.updateLinkDomain(hideDomainError);
  if (!domainResult) {
    var errorTagHtml = '<div id="' + errorTag + '" style="display: none;"></div>';
    AdsEdit.showError(getLang('ads_error_url_not_checked') + errorTagHtml);
    Ads.unlock('save_ad');
    return;
  }

  var viewParams = cur.viewEditor.getParams();
  var targetingCriteria = cur.targetingEditor.getCriteria();

  var ajaxParams = {};
  ajaxParams.hash = cur.saveAdHash;
  ajaxParams = extend({}, ajaxParams, viewParams);
  ajaxParams = extend({}, ajaxParams, targetingCriteria);

  ajax.post('/adsedit?act=save_ad', ajaxParams, {onDone: onDone, onFail: onFail});

  function onDone(result) {
    Ads.unlock('save_ad');

    if (result && result.link_domain_continue) {
      var confirmBox = showFastBox(
        {title: getLang('ads_error_url_unreachable_title'), dark: true},
        getLang('ads_save_ad_confirm_unreachable_url'),
        getLang('ads_save'),
        function() {
          cur.viewEditor.confirmLinkDomain();
          confirmBox.hide();
          AdsEdit.saveAd();
        },
        getLang('box_cancel'),
        function() {
          confirmBox.hide();
        }
      );
      return
    }
    if (result && result.promoted_post_confirmed) {
      var confirmBox = showFastBox(
          {title: getLang('ads_save_ad_promoted_post_confirmation_box_title'), dark: true},
          result.promoted_post_confirmation_body,
          getLang('ads_save'),
          function() {
            cur.viewEditor.confirmPromotedPost();
            confirmBox.hide();
            AdsEdit.saveAd();
          },
          getLang('box_cancel'),
          function() {
            confirmBox.hide();
          }
      );
      return
    }
    if (result && 'error_msg' in result) {
      AdsEdit.showError(result.error_msg, result.error_section);
      return;
    }
    if (result.ad_id) {
      nav.go('/ads?act=office&union_id=' + result.ad_id);
      return;
    }

    onFail();
  }
  function onFail() {
    Ads.unlock('save_ad');
    AdsEdit.showError(getLang('ads_error_unexpected_error_try_later'))
    return true;
  }
  function onLock() {
    lockButton('ads_edit_button_save_ad');
  }
  function onUnlock() {
    unlockButton('ads_edit_button_save_ad');
  }
}

AdsEdit.cancelAd = function(cancelLink, event) {
  nav.go(cancelLink, event);
}

AdsEdit.showLastAdsBox = function(parentId) {

  var ajaxParams = {};
  ajaxParams.parent_id = parentId;

  var showOptions = {params: {}};
  showOptions.cache = 1;
  showOptions.stat = ['indexer.js'];
  showOptions.dark = true;
  showOptions.params.width = 600;
  showOptions.params.bodyStyle = 'padding: 0;';

  showBox('/adsedit?act=last_ads_box', ajaxParams, showOptions);
}

AdsEdit.initLastAdsBox = function(lastAdsBox, lastAds, lastAdsKeyMap) {
  if (!cur.lastAds) {
    cur.lastAds       = lastAds;
    cur.lastAdsKeyMap = lastAdsKeyMap;

    cur.lastAdsIndex = new vkIndexer(lastAds, function(obj) {
        return se(obj[lastAdsKeyMap.indexer_text]).nodeValue;
      }
    );
  }

  var boxOptions = {}
  boxOptions.onClean = function() {
    cleanElems(ge('ads_edit_last_ads_search'), geByClass1('input_back_wrap', lastAdsBox.bodyNode), geByClass1('input_back_content', lastAdsBox.bodyNode));
  };
  lastAdsBox.setOptions(boxOptions);

  cur.lastAdsBox = lastAdsBox;

  placeholderSetup('ads_edit_last_ads_search', {back: true});

  ge('ads_edit_last_ads_content').scrollTop = 0;
  AdsEdit.searchLastAds(true);
}

AdsEdit.searchLastAds = function(initial) {
  var searchStr = ge('ads_edit_last_ads_search').getValue();
  if (!initial && searchStr === cur.lastSearchStr) {
    return;
  }

  var lastAdsIds = {};
  var results = [];
  var isShowAll = false;
  cur.lastSearchStr = searchStr;
  if (searchStr) {
    results = cur.lastAdsIndex.search(searchStr);
    for (var i in results) {
      lastAdsIds[results[i][cur.lastAdsKeyMap.ad_id]] = true;
    }
  } else {
    isShowAll = true;
  }

  var lastAdsElemsAll = geByClass('ads_edit_last_ads_ad_wrap');
  var lastAdsElemsShowed = [];
  var elem;
  var adId;
  var row = 0;
  for (var i = 0, len = lastAdsElemsAll.length; i < len; i++) {
    elem = lastAdsElemsAll[i];
    adId = elem.id.replace('ads_edit_last_ads_ad_', '');
    if (isShowAll || lastAdsIds[adId]) {
      show(elem);
      if (!lastAdsElemsShowed[row]) {
        lastAdsElemsShowed[row] = [];
      }
      lastAdsElemsShowed[row].push(elem);
      if (lastAdsElemsShowed[row].length == 4) {
        row++;
      }
    } else {
      hide(elem);
    }
  }

  for (var row in lastAdsElemsShowed) {
    var maxHeight = 0;
    for (var i in lastAdsElemsShowed[row]) {
      elem = lastAdsElemsShowed[row][i];
      var adHeight = getSize(geByClass1('ads_ad_box', elem))[1];
      maxHeight = Math.max(maxHeight, adHeight);
    }
    for (var i in lastAdsElemsShowed[row]) {
      elem = lastAdsElemsShowed[row][i];
      setStyle(elem, 'minHeight', (maxHeight + 20) + 'px');
    }
  }

  if (isShowAll || results.length != 0) {
    hide('ads_edit_last_ads_no_result');
    show('ads_edit_last_ads_result');
  } else {
    hide('ads_edit_last_ads_result');
    var noResultElem = ge('ads_edit_last_ads_no_result');
    noResultElem.innerHTML = getLang('ads_edit_ad_choose_view_not_found').replace('{query}', Ads.escapeValue(searchStr));
    show(noResultElem);
  }
}

AdsEdit.applyLastAd = function(newAd) {
  cur.viewEditor.setFormatType(newAd[cur.lastAdsKeyMap.format_type]);
  cur.viewEditor.setLinkType(newAd[cur.lastAdsKeyMap.link_type]);
  if (intval(newAd[cur.lastAdsKeyMap.link_type]) == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
    cur.viewEditor.setVideoData(newAd[cur.lastAdsKeyMap.link_id], newAd[cur.lastAdsKeyMap.link_owner_id], newAd[cur.lastAdsKeyMap.video_hash], newAd[cur.lastAdsKeyMap.video_preview_hash]);
  }
  cur.viewEditor.setTitle(AdsEdit.unescapeValueInit(newAd[cur.lastAdsKeyMap.title]));
  cur.viewEditor.setDescription(AdsEdit.unescapeValueInit(newAd[cur.lastAdsKeyMap.description]));
  if (newAd[cur.lastAdsKeyMap.photo_size]) {
    cur.viewEditor.setPhotoData(newAd[cur.lastAdsKeyMap.photo_size], newAd[cur.lastAdsKeyMap.photo]);
  }
  if (newAd[cur.lastAdsKeyMap.format_type] == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
    cur.viewEditor.setLinkId(newAd[cur.lastAdsKeyMap.link_id]);
  }

  cur.lastAdsBox.hide();
}

AdsEdit.drawUploadGradientProgress = function(uploadBox, loadedCount, totalCount) {
  var uploaderElem     = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
  var progressElem     = geByClass1('ads_gradient_progress', uploadBox.bodyNode);
  var progressWrapElem = geByClass1('ads_edit_upload_progress_wrap2', uploadBox.bodyNode);

  if (!uploaderElem || !progressElem || !progressWrapElem) {
    debugLog('drawUploadGradientProgress: invalid box');
  }

  if (!isVisible(progressWrapElem)) {
    if (browser.msie) {
      setStyle(uploaderElem, {position: 'relative', left: '-5000px'});
    } else {
      setStyle(uploaderElem, {visibility: 'hidden'});
    }

    var uploaderHeight = getSize(uploaderElem)[1];
    var progressHeight = getSize(progressWrapElem)[1];
    var progressMargin = -intval((uploaderHeight + progressHeight) / 2);
    setStyle(progressWrapElem, {height: progressMargin, marginTop: progressMargin + 'px'});
    show(progressWrapElem);
  }

  var percent = intval(loadedCount / totalCount * 100);
  setStyle(progressElem, {width: percent + '%'});
}

AdsEdit.hideUploadGradientProgress = function(uploadBox) {
  var uploaderElem     = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
  var progressWrapElem = geByClass1('ads_edit_upload_progress_wrap2', uploadBox.bodyNode);
  hide(progressWrapElem);
  if (browser.msie) {
    setStyle(uploaderElem, {position: '', left: ''});
  } else {
    setStyle(uploaderElem, {visibility: ''});
  }
}

AdsEdit.showUploadPhotoBox = function() {

  var ajaxParams = {};
  ajaxParams.photo_size = cur.viewEditor.getPhotoSize();

  var showOptions = {params: {}};
  showOptions.stat = ['upload.js'];
  showOptions.dark = true;
  showOptions.params.width = 470;

  showBox('/adsedit?act=upload_photo_box', ajaxParams, showOptions);
}

AdsEdit.initUploadPhotoBox = function(uploadBox, uploadUrl, uploadVars, uploadOptions) {
  uploadBox.removeButtons();
  uploadBox.addButton(getLang('box_cancel'));

  var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
  uploadOptions = extend({}, uploadOptions, {
    clear:            true, // Destroy on cur.destroy
    onUploadStart:    AdsEdit.onUploadPhotoStart.pbind(uploadBox),
    onUploadError:    AdsEdit.onUploadPhotoError.pbind(uploadBox),
    onUploadComplete: AdsEdit.onUploadPhotoComplete.pbind(uploadBox),
    onUploadProgress: function(i, bytesLoaded, bytesTotal) { AdsEdit.drawUploadGradientProgress(uploadBox, bytesLoaded, bytesTotal); }
  });
  Upload.init(uploaderElem, uploadUrl, uploadVars, uploadOptions);

  if (!cur.photoUploadDestroy) {
    cur.photoUploadDestroy = function() {
      if ('photoUploadIndex' in cur) {
        Upload.terminateUpload(cur.photoUploadIndex);
        delete cur.photoUploadIndex;
      }
    }
    cur.destroy.push(function() { cur.photoUploadDestroy(); });
  }

  var boxOptions = {};
  boxOptions.onShow = function() {
    uploadBox.hide(); // Fix upload.js fast box
  }
  boxOptions.onClean = function() {
    cur.photoUploadDestroy();
  }
  uploadBox.setOptions(boxOptions);
}

AdsEdit.onUploadPhotoStart = function(uploadBox, i, result) {

  cur.photoUploadIndex = i;

  if (Upload.types[i] === 'form') {
    uploadBox.showProgress();
  } else {
    AdsEdit.drawUploadGradientProgress(uploadBox, 0, 100);
  }
  hide('ads_edit_upload_photo_error');
}

AdsEdit.onUploadPhotoError = function(uploadBox, i, msg) {

  var errorElem = ge('ads_edit_upload_photo_error');
  if (errorElem) {
    if (msg) {
      errorElem.innerHTML = msg;
    } else {
      errorElem.innerHTML = getLang('ads_image_upload_error');
    }
    show(errorElem);
  }

  uploadBox.hideProgress();
  AdsEdit.hideUploadGradientProgress(uploadBox);

  Upload.embed(i);
}

AdsEdit.onUploadPhotoComplete = function(uploadBox, i, result) {

  if (Upload.types[i] !== 'form') {
    AdsEdit.drawUploadGradientProgress(uploadBox, 100, 100);
  }

  var photoData;
  try {
    photoData = eval('(' + result + ')');
  } catch (e) {
    photoData = q2ajx(result);
  }

  if (!photoData || !photoData.photo || photoData.code) {
    var message;
    message = getLang('ads_photo_notloaded');
    switch (intval(photoData.code)) {
      case 1: message += '<br>' + getLang('ads_photo_upload_error_1'); break;
      case 2: message += '<br>' + getLang('ads_photo_upload_error_2'); break;
      case 3: message += '<br>' + getLang('ads_photo_upload_error_3'); break;
      case 4: message += '<br>' + getLang('ads_photo_upload_error_4'); break;
      case 5: message += '<br>' + getLang('ads_photo_upload_error_3'); break;
      default:
        if (photoData.code !== undefined) {
          message += '<br>' + getLang('ads_err_code').replace('{code}', photoData.code);
        }
        break;
    }
    Upload.onUploadError(i, message);
    return;
  }

  delete cur.photoUploadIndex;
  uploadBox.hide();
  AdsEdit.showCropPhotoBox(photoData);
}

AdsEdit.showCropPhotoBox = function(photoData) {

  var successCrop = {success: false};

  var ajaxParams = {};
  ajaxParams.photo = photoData.photo;

  var viewParams = cur.viewEditor.getParams();
  ajaxParams.photo_icon             = viewParams.photo_icon;
  ajaxParams.format_type            = viewParams.format_type;
  ajaxParams.title                  = viewParams.title;
  ajaxParams.description            = viewParams.description;
  ajaxParams.link_type              = viewParams.link_type;
  ajaxParams.link_id                = viewParams.link_id;
  ajaxParams.link_owner_id          = viewParams.link_owner_id;
  ajaxParams.link_domain            = viewParams.link_domain;
  ajaxParams.disclaimer_medical     = viewParams.disclaimer_medical;
  ajaxParams.disclaimer_specialist  = viewParams.disclaimer_specialist;
  ajaxParams.disclaimer_supplements = viewParams.disclaimer_supplements;
  ajaxParams.age_restriction        = viewParams.age_restriction;

  var showOptions = {params: {}};
  showOptions.stat = ['tagger.css', 'ads_tagger.js'];
  showOptions.dark = true;

  var boxPadding = 15 * 2;

  var photoWidth = intval(photoData.photo.match(/width:(\d+)/)[1]);
  if (photoWidth && photoWidth <= 700 && viewParams.format_type != AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) {
    var adWidth = 118;
    switch (viewParams.format_type) {
      case AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE:
      case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE:
        if (viewParams.link_type != AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
          adWidth = 306; // Redesign ad preview
        }
        break;
      case AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS: adWidth = 175; break;
      case AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY:   adWidth = 128; break;
      case AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY: adWidth = 128; break;
      case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP:     adWidth = 448; break;
    }
    showOptions.params.width = Math.max(photoWidth + boxPadding + 15 + adWidth, 490);
  } else if (photoWidth && photoWidth <= 860) {
    showOptions.params.width = photoWidth + boxPadding;
  } else {
    showOptions.params.width = 900 + boxPadding;
  }

  showBox('/adsedit?act=crop_photo_box', ajaxParams, showOptions);
}

AdsEdit.initCropPhotoBox = function(cropBox, resultPhotoWidth, resultPhotoHeight, resultPhotoWidthSmall, resultPhotoHeightSmall, cropOptions, newSizeWidth, newSizeHeight) {
  cropBox.removeButtons();
  cropBox.addButton(getLang('box_cancel'), false, 'no');
  cropBox.addButton(getLang('box_save'), AdsEdit.saveCropPhoto.pbind(cropBox), 'yes');

  var destroyHintTt = Ads.initRedesignHintTooltip();
  cur.destroy.push(destroyHintTt);

  var icons = [{width: resultPhotoWidthSmall, height: resultPhotoHeightSmall, box: 'ads_edit_crop_photo_small'}];
  var safeZones = {};
  if (newSizeWidth && newSizeHeight) {
    var ratio = newSizeWidth / newSizeHeight,
        boxw = Math.min(resultPhotoWidth,  intval(resultPhotoHeight * ratio)),
        boxh = Math.min(resultPhotoHeight, intval(boxw / ratio));
    if (boxw != resultPhotoWidth) {
      safeZones.left  = Math.floor((resultPhotoWidth - boxw) / 2);
      safeZones.right = Math.ceil((resultPhotoWidth - boxw) / 2);
    }
    if (boxh != resultPhotoHeight) {
      safeZones.top    = Math.floor((resultPhotoHeight - boxh) / 2);
      safeZones.bottom = Math.ceil((resultPhotoHeight - boxh) / 2);
    }
    icons.push({width:  newSizeWidth,
                height: newSizeHeight,
                box:   'ads_edit_crop_photo_redesign'});
  }

  cur.photoTagger = adsPhotoTagger('ads_edit_crop_photo_big', {
    minw: resultPhotoWidth,
    minh: resultPhotoHeight,
    maxw: 10000,
    maxh: 10000,
    maxr: resultPhotoWidth / resultPhotoHeight,
    minr: resultPhotoWidth / resultPhotoHeight,
    defw: resultPhotoWidth,
    defh: resultPhotoHeight,
    icons: icons,
    zstart: 1000,
    crop: cropOptions,
    safeZones: safeZones,
    onInit: initPlayImage
  });

  if (!cur.photoTaggerDestroy) {
    cur.photoTaggerDestroy = function() {
      if (cur.photoTagger) {
        cur.photoTagger.destroy();
        delete cur.photoTagger;
      }
    }
    cur.destroy.push(function() { cur.photoTaggerDestroy(); });
  }

  function initPlayImage() {
    var wrapElem = ge('ads_edit_crop_photo_wrap');
    var playElem =  geByClass1('ads_ad_play', wrapElem);
    if (!isVisible(playElem)) {
      return;
    }
    var photoSmallElem    = ge('ads_edit_crop_photo_small')
    var photoSmallDivElem = ge('ads_edit_crop_photo_small')
    var photoSmallImgElem = geByTag1('img', photoSmallDivElem);
    addEvent(playElem, 'mousedown', function(event){
      var newEvent = {};
      newEvent.pageX = event.pageX;
      newEvent.pageY = event.pageY;
      triggerEvent(photoSmallImgElem, event.type, newEvent, true);
      return cancelEvent(event);
    });
  }

  var boxOptions = {};
  boxOptions.onClean = function() {
    destroyHintTt();
    cur.photoTaggerDestroy();
    Ads.unlock('saveCropPhoto');
    delete cur.cropBox;
  };
  cropBox.setOptions(boxOptions);
}

AdsEdit.saveCropPhoto = function(cropBox) {
  if (!Ads.lock('saveCropPhoto')) return;
  cropBox.showProgress();
  ge('ads_edit_crop_photo_crop').value = cur.photoTagger.result().join(',');

  cur.cropBox = cropBox;
  addEvent('ads_edit_crop_photo_frame', 'load', function() {
    Ads.unlock('saveCropPhoto');
    cropBox.hideProgress();
  });

  ge('ad_edit_crop_photo_form').submit();
}

AdsEdit.onSaveCropPhotoComplete = function(result) {

  var photoData = '';
  try {
    photoData = eval('(' + result + ')');
  } catch (e) {
  }

  if (!photoData || !photoData.photo) {
    var message = getLang('ads_photo_notloaded');
    message += ((photoData.errcode !== undefined) ? ('<br>' + getLang('ads_err_code').replace('{code}', photoData.errcode)) : '');
    var errorElem = ge('ads_edit_crop_photo_error');
    errorElem.innerHTML = message;
    show(errorElem);
    return;
  }

  var photoSize = ge('ads_edit_crop_photo_size').value;

  cur.viewEditor.setPhotoData(photoSize, photoData.photo);

  cur.cropBox.hide();
}

AdsEdit.showUploadVideoBox = function(buttonElem, hash) {
  if (hasClass(buttonElem.parentNode, 'button_disabled')) {
    return;
  }

  var ajaxParams = {};
  ajaxParams.hash = hash;

  var showOptions = {params: {}};
  showOptions.stat = ['upload.js'];
  showOptions.dark = true;

  var uploadVideoBox = showTabbedBox('/adsedit?act=upload_video_box', ajaxParams, showOptions);
}

AdsEdit.initUploadVideoBox = function(uploadVideoBox, uploadUrl, uploadVars, uploadOptions, updateAfterUploadHash) {

  uploadVideoBox.removeButtons();
  uploadVideoBox.addButton(getLang('box_cancel'));

  var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadVideoBox.bodyNode);
  uploadOptions = extend({}, uploadOptions, {
    clear:            true, // Destroy on cur.destroy
    onUploadStart:    AdsEdit.onUploadVideoStart.pbind(uploadVideoBox),
    onUploadError:    AdsEdit.onUploadVideoError.pbind(uploadVideoBox, uploadVars, uploadOptions),
    onUploadComplete: AdsEdit.onUploadVideoComplete.pbind(uploadVideoBox, uploadVars, uploadOptions, updateAfterUploadHash),
    onUploadProgress: function(i, bytesLoaded, bytesTotal) { AdsEdit.drawUploadGradientProgress(uploadVideoBox, bytesLoaded, bytesTotal); }
  });
  Upload.init(uploaderElem, uploadUrl, uploadVars, uploadOptions);

  if (!cur.videoUploadDestroy) {
    cur.videoUploadDestroy = function() {
      if ('videoUploadIndex' in cur) {
        Upload.terminateUpload(cur.videoUploadIndex);
        delete cur.videoUploadIndex;
      }
    }
    cur.destroy.push(function() { cur.videoUploadDestroy(); });
  }

  window.onParseDone = AdsEdit.onParseVideoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash);
  window.onParseFail = AdsEdit.onParseVideoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash);

  var externalVideoLinkElem    = ge('ads_edit_upload_video_external_link');
  var interestingEvents        = 'keydown keyup keypress change paste cut drop input blur';
  var externalVideoLinkHandler = function() { AdsEdit.parseVideoExternal(); };
  addEvent(externalVideoLinkElem, interestingEvents, externalVideoLinkHandler);
  cur.destroy.push(function() { removeEvent(externalVideoLinkElem, interestingEvents, externalVideoLinkHandler); });

  var boxOptions = {};
  boxOptions.onShow = function() {
    uploadVideoBox.hide(); // Fix upload.js fast box
  }
  boxOptions.onClean = function() {
    cur.videoUploadDestroy();
  }
  uploadVideoBox.setOptions(boxOptions);

  cur.uploadVideoBox = uploadVideoBox;

  delete cur.lastExternalVideoLink;
}

AdsEdit.switchUploadVideoBox = function(isExternal) {
  var boxElem       = ge('ads_edit_upload_video_box');
  var uploadElems   = geByClass('ads_edit_upload_video_only_upload', boxElem);
  var externalElems = geByClass('ads_edit_upload_video_only_external', boxElem);

  if (isExternal) {
    each(externalElems, function(k, v) { show(v); });
    each(uploadElems,   function(k, v) { hide(v); });
  } else {
    each(uploadElems,   function(k, v) { show(v); });
    each(externalElems, function(k, v) { hide(v); });
  }
}

AdsEdit.onUploadVideoStart = function(uploadVideoBox, i, result) {

  cur.videoUploadIndex = i;

  if (Upload.types[i] === 'form') {
    uploadVideoBox.showProgress();
  } else {
    AdsEdit.drawUploadGradientProgress(uploadVideoBox, 0, 100);
  }
  hide('ads_edit_upload_video_error');
  show('ads_edit_upload_video_info');
}

AdsEdit.logVideoUploadStatus = function(stage, idx, extra, vars, uploadOpts) {
  try {
    ajax.post('al_video.php', {
      act: 'upload_stats',
      stage: stage,
      oid: vars.oid,
      mid: vars.mid,
      tag: vars.tag,
      srv: uploadOpts.server,
      extra: (extra || null)
    });
  } catch (ignore) {}
}

AdsEdit.onUploadVideoError = function(uploadVideoBox, uploadVars, uploadOptions, i, msg) {

  var errorElem = ge('ads_edit_upload_video_error');
  if (errorElem) {
    if (msg) {
      errorElem.innerHTML = msg;
    } else {
      errorElem.innerHTML = getLang('video_external_server_error');
    }
    show(errorElem);
  }

  hide('ads_edit_upload_video_info');
  uploadVideoBox.hideProgress();
  AdsEdit.hideUploadGradientProgress(uploadVideoBox);

  Upload.embed(i);
  AdsEdit.logVideoUploadStatus('fail', i, msg, uploadVars, uploadOptions);
}

AdsEdit.onUploadVideoComplete = function(uploadVideoBox, uploadVars, uploadOptions, updateAfterUploadHash, i, result) {

  if (Upload.types[i] !== 'form') {
    AdsEdit.drawUploadGradientProgress(uploadVideoBox, 100, 100);
  }

  // To prevent click upload during ajax request
  if (Upload.types[i] === 'form' || Upload.types[i] === 'fileApi') {
    var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadVideoBox.bodyNode)
    var fileElem = geByClass1('file', uploaderElem);
    fileElem.disabled = true;
  }

  var videoData;
  try {
    videoData = eval('(' + result + ')');
  } catch (e) {
    videoData = q2ajx(result);
  }

  if (!videoData || videoData.code || videoData.error) {
    var message = videoData && (videoData.code ? videoData.code : videoData.error);
    Upload.onUploadError(i, message);
    return;
  }

  delete cur.videoUploadIndex;

  AdsEdit.updateUploadedVideo(uploadVideoBox, updateAfterUploadHash, uploadVars.oid, uploadVars.vid, uploadOptions.server);
}

AdsEdit.parseVideoExternal = function(delayed) {
  if (!delayed) {
    clearTimeout(cur.parseVideoExternalTimeout);
    cur.parseVideoExternalTimeout = setTimeout(AdsEdit.parseVideoExternal.pbind(true), 300);
    return;
  }

  var externalVideoLinkElem = ge('ads_edit_upload_video_external_link');
  if (!externalVideoLinkElem) {
    return;
  }
  var externalVideoLink = trim(externalVideoLinkElem.value);
  if (!externalVideoLink.match(/^(http:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i)) {
    show('ads_edit_upload_video_external_error');
    return;
  }
  if (externalVideoLink == cur.lastExternalVideoLink) {
    return;
  }
  hide('ads_edit_upload_video_external_error');
  if (!externalVideoLink) {
    return;
  }
  cur.lastExternalVideoLink = externalVideoLink;

  cur.uploadVideoBox.showProgress();
  ge('ads_edit_upload_video_external_form').submit();
}

AdsEdit.onParseVideoComplete = function(uploadVideoBox, uploadVars, updateAfterUploadHash, result) {

  var isNormalResult = (isObject(result) && result.url && result.extra && result.extraData && result.images && result.images.length);

  if (!isNormalResult) {
    uploadVideoBox.hideProgress();
    show('ads_edit_upload_video_external_error');
    return;
  }

  var imagesContext = {}
  imagesContext.images = result.images;
  imagesContext.imageIndex = -1;

  window.onUploadDone = AdsEdit.onUploadVideoPhotoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash, result.extra, result.extraData, imagesContext);
  window.onUploadFail = AdsEdit.onUploadVideoPhotoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash, result.extra, result.extraData, imagesContext);

  ge('ads_edit_upload_video_external_photo_url').value   = result.url;
  ge('ads_edit_upload_video_external_photo_extra').value = result.extra;

  AdsEdit.uploadVideoPhotoImages(imagesContext);
}

AdsEdit.uploadVideoPhotoImages = function(imagesContext) {

  imagesContext.imageIndex++;

  if (imagesContext.imageIndex >= imagesContext.images.length) {
    uploadVideoBox.hideProgress();
    show('ads_edit_upload_video_external_error');
    return;
  }

  ge('ads_edit_upload_video_external_photo_image').value = imagesContext.images[imagesContext.imageIndex];
  ge('ads_edit_upload_video_external_photo_form').submit();
}

AdsEdit.onUploadVideoPhotoComplete = function(uploadVideoBox, uploadVars, updateAfterUploadHash, extra, extraData, imagesContext, nothing, result) {

  var isNormalResult = (isObject(result) && result.user_id && result.photo_id);

  if (!isNormalResult) {
    AdsEdit.uploadVideoPhotoImages(imagesContext);
    return;
  }

  AdsEdit.updateUploadedVideo(uploadVideoBox, updateAfterUploadHash, uploadVars.oid, uploadVars.vid, 0, extra, extraData, result.user_id, result.photo_id);
}

AdsEdit.updateUploadedVideo = function(uploadVideoBox, updateAfterUploadHash, videoOwnerId, videoId, videoServer, videoExtra, videoExtraData, videoPhotoOwnerId, videoPhotoId) {

  uploadVideoBox.showProgress();

  var ajaxParams            = {};
  ajaxParams.owner_id       = videoOwnerId;
  ajaxParams.video_id       = videoId;
  ajaxParams.server         = videoServer;
  ajaxParams.extra          = videoExtra;
  ajaxParams.extra_data     = videoExtraData;
  ajaxParams.photo_owner_id = videoPhotoOwnerId;
  ajaxParams.photo_id       = videoPhotoId
  ajaxParams.hash           = updateAfterUploadHash;
  ajax.post('/adsedit?act=upload_video_update', ajaxParams, {onDone: onDone, onFail: onFail});

  function onDone(ajaxResult, videoHash, videoPreviewHash) {
    if (ajaxResult === 'ok' && videoHash && videoPreviewHash) {
      uploadVideoBox.hide();
      showFastBox({title: getLang('ads_edit_ad_upload_done_title'), dark: true}, getLang('ads_video_upload_done'));
      cur.viewEditor.setVideoData(videoId, videoOwnerId, videoHash, videoPreviewHash);
    } else {
      onFail();
    }
  }
  function onFail() {
    uploadVideoBox.hide();
    showFastBox({title: getLang('global_error'), dark: true}, getLang('ads_error_unexpected_error_try_later'));
    return true;
  }
}

//
// AdsEditor
//

function AdsEditor() {}
AdsEditor.prototype.init = function(viewEditor, targetingEditor) {

  this.updateDataTimeout = null;
  this.updateDataCounter = 0;

  this.lastViewData      = {};
  this.lastTargetingData = {};

  this.viewEditor = viewEditor;
  this.viewEditor.setUpdateDataHandler(this.getUpdatedDataView.bind(this));

  this.targetingEditor = targetingEditor;
  this.targetingEditor.setUpdateDataHandler(this.getUpdatedDataTargeting.bind(this));
}

AdsEditor.prototype.destroy = function() {
  clearTimeout(this.updateDataTimer);
}

AdsEditor.prototype.getUpdatedData = function(force, delayed) {

  if (isEmpty(this.lastViewData)) {
    this.viewEditor.needDataUpdate();
  }
  if (isEmpty(this.lastTargetingData)) {
    this.targetingEditor.needDataUpdate();
  }

  if (!delayed) {
    clearTimeout(this.updateDataTimer);
    var timeout = ((force == 2) ? 100 : (force ? 10 : 500));
    this.updateDataTimeout = ((this.updateDataTimeout === null) ? timeout : Math.min(timeout, this.updateDataTimeout));
    this.updateDataTimer = setTimeout(function() {
      this.updateDataTimer = null;
      this.getUpdatedData(false, true);
    }.bind(this), this.updateDataTimeout);
    return;
  }
  this.updateDataTimeout = null;

  this.updateDataCounter++ || show('ads_edit_audience_progress');

  var lastData = {};
  lastData = extend({}, lastData, this.lastViewData);
  lastData = extend({}, lastData, this.lastTargetingData);

  this.lastViewData      = {};
  this.lastTargetingData = {};

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, lastData);

  ajax.post('/adsedit?act=get_target_params', ajaxParams, {onDone: onDone.bind(this), onFail: onFail.bind(this)});

  function onDone(result) {
    --this.updateDataCounter || hide('ads_edit_audience_progress');
    this.viewEditor.setUpdateData(lastData, result);
    this.targetingEditor.setUpdateData(lastData, result);
    if (result['error']) {
      AdsEdit.showError(result['error']);
    } else {
      AdsEdit.hideErrors();
    }
  }
  function onFail() {
    --this.updateDataCounter || hide('ads_edit_audience_progress');
    var failResult = true;
    var setResult;
    setResult = this.viewEditor.setUpdateData(lastData, false);
    failResult = (failResult && setResult);
    setResult = this.targetingEditor.setUpdateData(lastData, false);
    failResult = (failResult && setResult);
    return failResult;
  }
}

AdsEditor.prototype.getUpdatedDataView = function(data, force) {
  this.lastViewData = extend({}, this.lastViewData, data);
  this.getUpdatedData(force ? 1 : 0);
}

AdsEditor.prototype.getUpdatedDataTargeting = function(data, force) {
  this.lastTargetingData = extend({}, this.lastTargetingData, data);
  this.getUpdatedData(force ? 2 : 0);
}

AdsEditor.prototype.isUpdatingData = function() {
  return !!(this.updateDataTimer || this.updateDataCounter);
}

//
// AdsViewEditor
//

function AdsViewEditor() {}
AdsViewEditor.prototype.init = function(options, editor, targetingEditor, params, paramsData, paramsParams) {

  this.editor = editor;
  this.targetingEditor = targetingEditor;

  this.options = {
    targetIdPrefix: 'ads_param_',
    uiWidth: 320 + 8
  };

  this.options = extend({}, this.options, options);

  this.params = {
    ad_id:                  {value: 0},
    format_type:            {value: 0, unreachable: false},
    cost_type:              {value: AdsEdit.ADS_AD_COST_TYPE_CLICK, cpm_only: false},
    link_type:              {value: 0, complete: false, allow_edit_all: false, allow_edit_link: false, editing: false, cancelling: false},
    link_id:                {value: '', data: [], video_value: '', app_rates_k: '', mobile_app_bottom_d: '', promoted_post_text: '', app_game_links_ids: {}, app_admin_links_ids: {}, app_in_news_links_ids: {}, app_trusted_links_ids: {}},
    link_owner_id:          {value: '',           video_value: ''},
    link_url:               {value: '', video_value: '', video_preview_hash: '', is_ok: false, event_final_time: 1},
    link_url_vk:            {value: 0,  link_type_value: 0, link_id_value: 0},
    link_domain:            {value: '', value_escaped: '', value_p: '', value_a: '', value_k: '', value_d: '', link_url: '', delayed_error: '', needed: false, is_ok: false},
    link_domain_confirm:    {value: 0},
    title:                  {value: '', value_escaped: '', value_default: '', max_length: 0, max_new_lines: 0, value_p: '', value_a: '', value_k: '', value_d: '', value_e: '', value_max: '', update_value_max: true},
    description:            {value: '', value_escaped: '', value_default: '', max_length: 0, max_new_lines: 0, max_length_normal: 0, max_length_mobile: 0},
    category1_id:           {value: 0, data: []},
    subcategory1_id:        {value: 0, data: []},
    category2_id:           {value: 0, data: []},
    subcategory2_id:        {value: 0, data: []},
    stats_url:              {value: ''},
    disclaimer_medical:     {value: 0, may_be_any: false},
    disclaimer_specialist:  {value: 0},
    disclaimer_supplements: {value: 0},
    age_restriction:        {value: 0, data: []},
    photo:                  {value: '', value_s: '', value_m: '', value_b: '', value_p: '', value_a: '', value_k: '', value_d: '', value_i: '', value_e: ''},
    photo_link:             {value: '', value_s: '', value_m: '', value_b: '', value_p: '', value_a: '', value_k: '', value_d: '', value_i: '', value_e: '', value_default_s: '', value_default_m: '', value_empty_m: '', value_default_b: '', value_empty_b: '', value_default_p: '', value_default_p_app: '', value_default_a: '', value_default_k: '', value_default_k_group: '', value_default_d: '', value_default_i: '', value_default_e: ''},
    video_hash:             {value: '', value_old: ''},
    cost_per_click:         {value: '', edited: false, last_value: ''},
    platform:               {value: 0, data: [], data_all: [], values_normal: 0, values_disabled: 0},
    views_limit_flag:       {value: 0},
    views_limit_exact:      {value: 0, data: [], default_values: [], data_ranges: []},
    client_id:              {value: 0},
    campaign_type:          {value: AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD, allow_special_app: false},
    campaign_id:            {value: 0, data: [], value_normal: 0, value_app: 0},
    campaign_name:          {value: '',          value_normal: ''},
    promoted_post_need_confirmation:  {value: 0}
  }

  this.updateNeeded = {};

  this.preview = {};

  this.ignoreSpellingMessageHashes = {};

  this.help = {};

  if (params) for (var i in params) {
    if (params[i] && (i in this.params)) {
      var newParamValue = params[i];
      if (typeof(this.params[i].value) === 'number') {
        newParamValue = intval(newParamValue);
      }
      if ('value_escaped' in this.params[i]) {
        newParamValue = AdsEdit.unescapeValueInit(newParamValue);
        this.params[i].value_escaped = AdsEdit.escapeValue(newParamValue);
      }
      if ('value_normal' in this.params[i]) {
        this.params[i].value_normal = newParamValue;
      }
      this.params[i].value = newParamValue;
    }
  }

  if (paramsData) for (var i in paramsData) {
    if (paramsData[i] && (i in this.params) && ('data' in this.params[i])) {
      this.params[i].data = paramsData[i];
    }
  }

  if (paramsParams) for (var i in paramsParams) {
    if (paramsParams[i] && (i in this.params)) {
      this.params[i] = extend({}, this.params[i], paramsParams[i]);
    }
  }

  this.interestingEvents = 'keydown keyup keypress change paste cut drop input blur';

  this.cur = {destroy: []};

  this.initPreview();
  this.initHelp();
  this.initUi();
}

AdsViewEditor.prototype.destroy = function() {
  if (this.updateLinkDomainContext) {
    clearTimeout(this.updateLinkDomainContext.timeout);
    this.updateLinkDomainContext.stop = true;
  }

  var targetElem = geByClass1('wall_module', this.preview.promoted_post);
  cleanElems(targetElem);

  processDestroy(this.cur);
}

AdsViewEditor.prototype.initPreview = function(paramName) {
  this.preview.layout                 = geByClass1('ads_edit_panel_preview');
  this.preview.link                   = geByClass1('ads_ad_box2', this.preview.layout);
  this.preview.title                  = geByClass1('ads_ad_title', this.preview.layout);
  this.preview.title_box              = geByClass1('ads_ad_title_box', this.preview.layout);
  this.preview.title_regular          = geByClass1('ads_ad_title_regular', this.preview.layout);
  this.preview.title_big_app          = geByClass1('ads_ad_title_big_app', this.preview.layout);
  this.preview.description            = geByClass1('ads_ad_description', this.preview.layout);
  this.preview.description_up         = geByClass1('ads_ad_description_up', this.preview.layout);
  this.preview.description_down       = geByClass1('ads_ad_description_down', this.preview.layout);
  this.preview.description_big_app    = geByClass1('ads_ad_description_big_app', this.preview.layout);
  this.preview.community_join         = geByClass1('ads_ad_community_join', this.preview.layout);
  this.preview.app_rating             = geByClass1('ads_ad_app_rating', this.preview.layout);
  this.preview.mobile_app_bottom      = geByClass1('ads_ad_mobile_app_bottom', this.preview.layout);
  this.preview.disclaimer_medical     = geByClass1('ads_ad_disclaimer_medical', this.preview.layout);
  this.preview.disclaimer_specialist  = geByClass1('ads_ad_disclaimer_specialist', this.preview.layout);
  this.preview.disclaimer_supplements = geByClass1('ads_ad_disclaimer_supplements', this.preview.layout);
  this.preview.disclaimers_photo      = geByClass1('ads_ad_disclaimers_photo', this.preview.layout);
  this.preview.disclaimers_bottom     = geByClass1('ads_ad_disclaimers_bottom', this.preview.layout);
  this.preview.disclaimers            = geByClass1('ads_ad_disclaimers', this.preview.layout);
  this.preview.age_restriction        = geByClass1('ads_ad_age_restriction', this.preview.layout);
  this.preview.domain                 = geByClass1('ads_ad_domain', this.preview.layout);
  this.preview.domain_ver             = geByClass1('ads_ad_domain_ver', this.preview.layout);
  this.preview.domain_out             = geByClass1('ads_ad_domain_out', this.preview.layout);
  this.preview.photo_box              = geByClass1('ads_ad_photo_box', this.preview.layout);
  this.preview.photo_box_hor          = geByClass1('ads_ad_photo_box_hor', this.preview.layout);
  this.preview.photo_box_ver          = geByClass1('ads_ad_photo_box_ver', this.preview.layout);
  this.preview.photo                  = geByClass1('ads_ad_photo', this.preview.layout);
  this.preview.photo_icon             = geByClass1('ads_ad_photo_icon', this.preview.layout);
  this.preview.play                   = geByClass1('ads_ad_play', this.preview.layout);
  this.preview.promoted_post          = geByClass1('ads_ad_promoted_post', this.preview.layout);
  this.preview.big_app_info_box       = geByClass1('ads_ad_big_app_info_box', this.preview.layout);

  var targetElem = geByClass1('wall_module', this.preview.promoted_post);
  AdsLight.overrideClickEvents(targetElem, true);
}

AdsViewEditor.prototype.initHelp = function() {
  if (!cur.adParamsHelp) {
    return;
  }
  for (var paramNameHelp in cur.adParamsHelp) {
    this.initHelpParam(paramNameHelp);
  }
}

AdsViewEditor.prototype.initHelpParam = function(paramNameHelp) {
  if (!cur.adParamsHelp) {
    return;
  }
  var helpText = cur.adParamsHelp[paramNameHelp];

  var targetElem;
  var handler;
  var context = {focus: false, over: 0, out: 2};
  var shiftLeft;
  var shiftTop;

  if (!this.help[paramNameHelp]) {
     this.help[paramNameHelp] = {};
  }

  switch (paramNameHelp) {
    case 'format_type_exclusive':   shiftTop = -55; shiftLeft = -215; break;
    case 'format_type_apps_only':   shiftTop = -55; shiftLeft = -215; break;
    case 'format_type_groups_only': shiftTop = -55; shiftLeft = -215; break;
    case 'description':             shiftTop = -81; break;
    case 'category1_id':            shiftTop = -44; break;
    case 'views_limit_flag':        shiftTop = -32; break;
  }

  switch (paramNameHelp) {
    case 'format_type_exclusive':
      targetElem = ge('ads_param_format_type_exclusive_wrap');
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'format_type_groups_only':
      targetElem = ge('ads_param_format_type_groups_only_wrap');
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'format_type_apps_only':
      targetElem = ge('ads_param_format_type_apps_only_wrap');
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'category1_id':
      targetElem = ge(this.options.targetIdPrefix + 'category1_id').parentNode;
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'description':
      targetElem = ge('ads_param_description');
      helpText = function() { return cur.adParamsHelp['description']; };
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      this.descriptionTooltipHandler = handler;
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'title':
      targetElem = ge('ads_param_title');
      helpText = function() { return cur.adParamsHelp['title']; };
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      this.titleTooltipHandler = handler;
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'platform':
      targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
      helpText = function() { return (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) ? cur.adParamsHelp['platform_post'] : cur.adParamsHelp['platform']; }.bind(this);
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
    case 'views_limit_flag':
      targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
  }
}

AdsViewEditor.prototype.initUi = function() {
  for (var paramName in this.params) {
    this.initUiParam(paramName);
  }
}

AdsViewEditor.prototype.initUiParam = function(paramName) {

  //debugLog('View: Try init UI ' + paramName);

 if (this.params[paramName].uiInited || this.params[paramName].uiInited === false) {
    return;
  }

  if (this.params[paramName].hidden) {
    return;
  }

  var targetElem;

  this.params[paramName].uiInited = false;

  switch (paramName) {
    case 'format_type':
      targetElem = ge(this.options.targetIdPrefix + 'format_type_text_image');
      this.params[paramName].ui_text_image = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_text_and_image'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_text_image.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_big_image');
      this.params[paramName].ui_big_image = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_big_image'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_big_image.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_exclusive');
      this.params[paramName].ui_exclusive = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_exclusive'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_exclusive.destroy(); }.bind(this));

      var label = (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) ? getLang('ads_edit_ad_format_type_promotion_community') : getLang('ads_edit_ad_format_type_square_image'));
      label = '<span id="' + this.options.targetIdPrefix + 'format_type_promotion_community_label">' + label + '</span>';
      targetElem = ge(this.options.targetIdPrefix + 'format_type_promotion_community');
      this.params[paramName].ui_promotion_community = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    label,
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_promotion_community.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_app_in_news');
      this.params[paramName].ui_app_in_news = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_news'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_app_in_news.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_apps_only');
      this.params[paramName].ui_apps_only = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_apps_only'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_apps_only.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_groups_only');
      this.params[paramName].ui_group = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_groups_only'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_group.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_big_app');
      this.params[paramName].ui_big_app = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_big_app') + ' <span class="ads_edit_ad_format_type_new">new</span>',
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_big_app.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_mobile');
      this.params[paramName].ui_mobile = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_mobile'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_mobile.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'format_type_promoted_post');
      this.params[paramName].ui_mobile = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_format_type_promoted_post'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_mobile.destroy(); }.bind(this));

      Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
      break;
    case 'cost_type':
      targetElem = ge(this.options.targetIdPrefix + 'cost_type_clicks');
      this.params[paramName].ui_clicks = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_cost_type_per_click'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_clicks.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'cost_type_views');
      this.params[paramName].ui_views = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_cost_type_per_views'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_views.destroy(); }.bind(this));

      Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
      break;
    case 'link_type':
      targetElem = ge(this.options.targetIdPrefix + 'link_type_community');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_type_post');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_type_app_vk');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_type_video');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_type_app_mobile');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_type_link');
      addEvent(targetElem, 'click', function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'link_id':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Autocomplete(targetElem, this.getUiParamData(paramName), {
        selectedItems: this.params[paramName].value,
        defaultItems:  this.getUiParamDefaultData(paramName),

        introText:     this.getUiParamPlaceholderText(paramName),
        placeholder:   this.getUiParamPlaceholderText(paramName),
        noResult:      this.getUiParamNoResultText(paramName),

        dropdown:      true,
        multiselect:   false,
        big:           true,
        withIcons:     true,
        width:         this.options.uiWidth,

        onChange:      function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.params[paramName].ui.disable(!this.params.link_type.editing || !this.params.link_type.allow_edit_all);
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'link_url':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      placeholderSetup(targetElem, {back: true, big: true});
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'link_domain':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      placeholderSetup(targetElem, {back: true, big: true});
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'title':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'description':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'category1_id':
    case 'category2_id':
    case 'subcategory1_id':
    case 'subcategory2_id':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
        selectedItem: this.params[paramName].value,
        disabledText: this.getUiParamDisabledText(paramName),
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.params[paramName].ui.disable(this.getUiParamEnabled(paramName) === false);
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'stats_url':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      placeholderSetup(targetElem, {back: true, big: true});
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'disclaimer_medical':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      this.params[paramName].ui = new Checkbox(targetElem, {
        label:    this.params[paramName].label_checkbox,
        checked:  this.params[paramName].value,
        width:    this.options.uiWidth,
        onChange: function(state) { this.onUiChange(paramName, state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'disclaimer_specialist':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      this.params[paramName].ui = new Checkbox(targetElem, {
        label:    this.params[paramName].label_checkbox,
        checked:  this.params[paramName].value,
        width:    this.options.uiWidth,
        onChange: function(state) { this.onUiChange(paramName, state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'disclaimer_supplements':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      this.params[paramName].ui = new Checkbox(targetElem, {
        label:    this.params[paramName].label_checkbox,
        checked:  this.params[paramName].value,
        width:    this.options.uiWidth,
        onChange: function(state) { this.onUiChange(paramName, state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'age_restriction':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
        selectedItem: this.params[paramName].value,
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'cost_per_click':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'platform':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
        selectedItem: this.params[paramName].value,
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.params[paramName].ui.disable(this.params[paramName].disabled);
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'views_limit_flag':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      this.params[paramName].ui = new Checkbox(targetElem, {
        label:    this.params[paramName].label_checkbox,
        checked:  this.params[paramName].value,
        width:    this.options.uiWidth,
        onChange: function(state) { this.onUiChange(paramName, state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'views_limit_exact':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
        selectedItem: this.params[paramName].value,
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'campaign_type':
      targetElem = ge(this.options.targetIdPrefix + 'campaign_type_select');
      this.params[paramName].ui_select = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_campaign_type_select'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_select.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'campaign_type_input');
      this.params[paramName].ui_input = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_campaign_type_new'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_input.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'campaign_type_app');
      this.params[paramName].ui_app = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_edit_ad_campaign_type_app_discount'),
        onSelect: function(value) { this.onUiSelect(paramName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui_app.destroy(); }.bind(this));

      Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
      break;
    case 'campaign_id':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      targetElem.removeAttribute('autocomplete');
      this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
        selectedItem: this.params[paramName].value,
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(paramName, value); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.params[paramName].ui.destroy(); }.bind(this));
      break;
    case 'campaign_name':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      placeholderSetup(targetElem, {back: true, big: true});
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(paramName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
  }

  switch (paramName) {
    case 'link_type':
      targetElem = ge(this.options.targetIdPrefix + 'link_object_complete');
      addEvent(targetElem, 'click', function(event) { this.completeLink(); return false; }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_object_edit');
      addEvent(targetElem, 'click', function(event) { this.editLink(); return false; }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));

      targetElem = ge(this.options.targetIdPrefix + 'link_object_cancel');
      addEvent(targetElem, 'click', function(event) { this.cancelLink(); return false; }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'title':
      targetElem = ge(this.options.targetIdPrefix + 'title_reduce');
      addEvent(targetElem, 'click keypress', function(event) { return this.onUiEvent('title_reduce', event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
    case 'category1_id':
      targetElem = ge('ads_param_category_more');
      addEvent(targetElem, 'click', function() { this.showMoreCategories(); return false; }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
  }

  this.params[paramName].uiInited = true;
  //debugLog('view: ' + paramName + ' UI inited');
}

AdsViewEditor.prototype.updateUiParam = function(paramName) {
  var targetElem;

  switch (paramName) {
    case 'link_type':
      var paramValue = this.params.link_type.value;
      if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
        paramValue = AdsEdit.ADS_AD_LINK_TYPE_GROUP;
      }
      if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)) {
        paramValue = AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID;
      }
      var elems = geByClass('ads_edit_link_type_item', 'ads_param_link_type_wrap');
      for (var i = 0, elem; elem = elems[i]; i++) {
        toggleClass(elem, 'selected', !!(intval(elem.getAttribute('value')) == paramValue));
        toggleClass(elem, 'disabled', !!(this.params.link_type.disabled || !this.params.link_type.editing || !this.params.link_type.allow_edit_all));
      }
      break;
    case 'link_id':
      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        this.params[paramName].ui.disable(); // Fix selectItem
        this.params[paramName].ui.selectItem(this.params[paramName].value);
        this.params[paramName].ui.disable(!this.params.link_type.editing || !this.params.link_type.allow_edit_all);
      }
      break;
    case 'link_url':
      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        targetElem = ge(this.options.targetIdPrefix + paramName);
        targetElem.setValue(this.params[paramName].value);
        if (!this.params.link_type.editing) {
          addClass(targetElem, 'disabled');
          targetElem.disabled = true;
          targetElem.readOnly = true;
        } else {
          removeClass(targetElem, 'disabled');
          targetElem.disabled = false;
          targetElem.readOnly = false;
        }
      }
      break;
    case 'link_domain':
      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        targetElem = ge(this.options.targetIdPrefix + paramName);
        targetElem.setValue(this.params[paramName].value);
        if (this.params[paramName].disabled || !this.params.link_type.editing) {
          addClass(targetElem, 'disabled');
          targetElem.disabled = true;
          targetElem.readOnly = true;
        } else {
          removeClass(targetElem, 'disabled');
          targetElem.disabled = false;
          targetElem.readOnly = false;
        }
      }
      break;
    case '_link_type':
      var linkUrlOk = (this.params.link_url.is_ok && (!this.params.link_domain.needed || this.params.link_domain.is_ok));
      this.params.link_type.complete = !!(false
        || inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.value
        || inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE]) && linkUrlOk
        || this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO && this.params.link_id.value && this.params.link_owner_id.value && (linkUrlOk || !this.params.link_url.value)
        || this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST && this.params.link_id.value && this.params.link_owner_id.value
      );
      toggleClass('ads_param_link_object_complete', 'button_disabled', !(this.params.link_type.complete));
      break;
    case '_link_id':
      var linkResult = this.getLink();
      targetElem = geByClass1('ads_edit_link_go', this.options.targetIdPrefix + 'link_id_go_wrap');
      this.updateLink(targetElem, linkResult.link_url, '', '', '_blank');
      break;
    case '_link_url':
      var linkResult = this.getLink();
      targetElem = geByClass1('ads_edit_link_go', this.options.targetIdPrefix + 'link_url_go_wrap');
      this.updateLink(targetElem, linkResult.link_url, '', '', '_blank');
      break;
    case '_link_video':
      var linkResult = this.getLink();
      targetElem = geByClass1('ads_edit_link_go', this.options.targetIdPrefix + 'link_video_go_wrap');
      this.updateLink(targetElem, linkResult.link, linkResult.link_packed, linkResult.onclick, '_self');
      break;
    case 'title':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      if (this.params[paramName].disabled) {
        addClass(targetElem, 'disabled');
        targetElem.readOnly = true;
      } else {
        removeClass(targetElem, 'disabled');
        targetElem.readOnly = false;
      }
      if (this.params['title_spelling']) {
        if (this.params['title_spelling'] == 'ok') {
          delete cur.adParamsHelp[paramName];
          this.titleTooltipHandler({type: 'manual_hide'});
        } else {
          cur.adParamsHelp[paramName] = this.params['title_spelling'];
          this.params['title_spelling'] = false;
          this.titleTooltipHandler({type: 'manual_show'});
        }
      }
      break;
    case 'description':
      targetElem = ge(this.options.targetIdPrefix + paramName);
      var maxLengthNew = this.params[paramName].max_length;
      if (browser.chrome) { // Bug: Chrome counts new lines as 2 chars
        maxLengthNew += this.params[paramName].value.split("\n").length - 1;
      }
      var isChanged = (targetElem.getAttribute('maxlength') != maxLengthNew);
      targetElem.setAttribute('maxlength', maxLengthNew);
      if (isChanged) {
        this.setDescription(this.params[paramName].value);
      }
      if (this.params['description_spelling']) {
        if (this.params['description_spelling'] == 'ok') {
          delete cur.adParamsHelp[paramName];
          this.descriptionTooltipHandler({type: 'manual_hide'});
        } else {
          cur.adParamsHelp[paramName] = this.params['description_spelling'];
          this.params['description_spelling'] = false;
          this.descriptionTooltipHandler({type: 'manual_show'});
        }
      }
      break;
    case '_title':
    case '_description':
      var paramNameOriginal = paramName.substr(1);
      var remainElem = ge(this.options.targetIdPrefix + paramNameOriginal + '_remain_length');
      var remainLength = this.params[paramNameOriginal].max_length - this.params[paramNameOriginal].value.length;
      remainElem.innerHTML = remainLength;
      break;
    case 'category1_id':
      var value    = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]) ? 125 : 0);
      var disabled = (value == 125);
      this.onParamUpdate(paramName, value, false, true);
      if (this.params[paramName].uiInited) {
        this.params[paramName].ui.selectItem(value);
        this.params[paramName].ui.disable(disabled);
      }
      break;
    case 'category2_id':
      var value = 0;
      this.onParamUpdate(paramName, value, false, true);
      if (this.params[paramName].uiInited) {
        this.params[paramName].ui.selectItem(value);
      }
      break;
    case 'disclaimer_medical':
    case 'disclaimer_specialist':
    case 'disclaimer_supplements':
      var disclaimers = ['disclaimer_medical', 'disclaimer_specialist', 'disclaimer_supplements'];
      if (this.params[paramName].value) {
        for (var i in disclaimers) {
          var disclaimer = disclaimers[i];
          if (disclaimer === paramName) {
            continue;
          }
          if (!this.params[disclaimer].value) {
            continue;
          }
          if (!this.params[paramName].uiInited) {
            continue;
          }
          this.params[disclaimer].ui.checked(false);
        }
      }
      break;
    case 'cost_per_click':
      var labelElem = geByClass1('ads_edit_label_cost_per_click', ge('ads_edit_ad_row_' + paramName));
      if (this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK) {
        labelElem.innerHTML = getLang('ads_edit_ad_cost_per_click_label');
      } else {
        labelElem.innerHTML = getLang('ads_edit_ad_cost_per_views_label');
      }

      var isAppCampaign = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || (this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app));
      var isAppAdminLink = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_admin_links_ids[this.params.link_id.value]);
      var isApp = (isAppCampaign && isAppAdminLink && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);

      var suffixesAll = '';
      suffixesAll    += ((this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK)         ? '_click'     : '_views');
      suffixesAll    += ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE) ? '_exclusive' : '');
      suffixesAll    += (isApp                                                                   ? '_app'       : '');

      var costPerClickValue            = 'value' + suffixesAll;
      var costPerClickRecommendedShort = 'recommended' + suffixesAll + '_short';
      var costPerClickRecommendedLong  = 'recommended' + suffixesAll + '_long';

      if (!this.params[paramName].edited || costPerClickValue !== this.params[paramName].last_value) {
        this.params[paramName].last_value = costPerClickValue;
        this.params[paramName].value      = this.params[paramName][costPerClickValue];
        var targetElem                    = ge(this.options.targetIdPrefix + paramName);
        targetElem.value                  = this.params[paramName].value;
      }

      var currencyElem = ge(this.options.targetIdPrefix + paramName + '_currency');
      currencyElem.innerHTML = getLang('global_money_amount_rub_text', this.params[paramName].value);

      var recommendedShortElem = ge('ads_edit_recommended_cost_text');
      var recommendedLongElem  = ge('ads_param_cost_per_click_recommended');
      recommendedShortElem.innerHTML = this.params[paramName][costPerClickRecommendedShort];
      recommendedLongElem.innerHTML  = this.params[paramName][costPerClickRecommendedLong];
      break;
    case 'platform':
      var isDisclaimers                    = (this.params.disclaimer_medical.value || this.params.disclaimer_specialist.value || this.params.disclaimer_supplements.value);
      this.params[paramName].disabled_web  = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD && this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE || this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_CLICK || isDisclaimers);
      this.params[paramName].disabled      = (this.params.link_type.value != AdsEdit.ADS_AD_LINK_TYPE_POST && this.params[paramName].disabled_web);

      if (this.params.platform.disabled) {
        this.params[paramName].value = (this.params.platform.values_disabled[this.params.link_type.value] ? this.params.platform.values_disabled[this.params.link_type.value] : this.params.platform.values_disabled[0]);
      } else {
        this.params[paramName].value = (this.params.platform.values_normal[this.params.link_type.value] ? this.params.platform.values_normal[this.params.link_type.value] : this.params.platform.values_normal[0]);
      }

      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        this.params[paramName].ui.selectItem(this.params[paramName].value);
        this.params[paramName].ui.disable(this.params[paramName].disabled);
      }
      break;
    case 'views_limit_flag':
    case 'views_limit_exact':
      var rowElem = ge('ads_edit_ad_row_views_limit');
      targetElem = geByClass1('ads_edit_label_input_ui', rowElem) || geByClass1('ads_edit_label_checkbox', rowElem);
      removeClass(targetElem, 'ads_edit_label_input_ui');
      removeClass(targetElem, 'ads_edit_label_checkbox');
      if (this.params.views_limit_exact.hidden) {
        addClass(targetElem, 'ads_edit_label_checkbox');
      } else {
        addClass(targetElem, 'ads_edit_label_input_ui');
      }
      if (paramName === 'views_limit_exact') {
        this.initUiParam(paramName);
        if (this.params[paramName].uiInited) {
          this.params[paramName].ui.selectItem(this.params[paramName].value);
        }
      }
      break;
    case 'campaign_id':
      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        this.params[paramName].ui.selectItem(this.params[paramName].value);
        this.params[paramName].ui.disable(this.params[paramName].disabled);
      }
      break;
    case 'campaign_name':
      this.initUiParam(paramName);
      if (this.params[paramName].uiInited) {
        targetElem = ge(this.options.targetIdPrefix + paramName);
        targetElem.setValue(this.params[paramName].value);
        if (this.params[paramName].disabled) {
          addClass(targetElem, 'disabled');
          targetElem.readOnly = true;
        } else {
          removeClass(targetElem, 'disabled');
          targetElem.readOnly = false;
        }
      }
      break;
  }
}

AdsViewEditor.prototype.getUiParamData = function(paramName) {
  switch (paramName) {
    case 'link_id':
      if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
        return '/adsedit?act=search_user_objects&section=groups&events_future=1';
      } else if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP) {
        return '/adsedit?act=search_user_objects&section=apps';
      } else {
        return this.params[paramName].data || [];
      }
    case 'category1_id':
    case 'category2_id':
      return this.params.category1_id.data;
    case 'subcategory1_id':
      return this.params.category1_id.data_subcategories[this.params.category1_id.value] || [];
    case 'subcategory2_id':
      return this.params.category1_id.data_subcategories[this.params.category2_id.value] || [];
    case 'platform':
      return this.params[paramName].data_all[this.params.link_type.value] || this.params[paramName].data_all[0] || [];
    case 'views_limit_exact':
      return this.params[paramName].data_ranges[this.params.format_type.value] || [];
    default:
      return this.params[paramName].data || [];
  }
}

AdsViewEditor.prototype.updateUiParamData = function(paramName) {
  if (!('data' in this.params[paramName])) {
    try { console.error("Can't update data"); } catch (e) {}
    return;
  }

  if (!this.params[paramName].ui) {
    return;
  }

  var data = this.getUiParamData(paramName);

  if (typeof(data) === 'string') {
    this.params[paramName].ui.setURL(data);
  } else {
    if (!data.length) {
      this.params[paramName].ui.clear();
    }
    this.params[paramName].ui.setData(data);
  }

  this.updateUiParamDefaultData(paramName)

  if (data.length && this.params[paramName].value) {
    this.params[paramName].ui.selectItem(this.params[paramName].value);
  }
}

AdsViewEditor.prototype.getUiParamDefaultData = function(paramName) {
  switch (paramName) {
    case 'views_limit_exact':
      this.params[paramName].value = this.params[paramName].default_values[this.params.format_type.value] || 0;
    default:
      var data = this.getUiParamData(paramName);
      if (typeof(data) === 'string') {
        data = false;
      }
      return data || this.params[paramName].data || [];
  }
}

AdsViewEditor.prototype.updateUiParamDefaultData = function(paramName) {
  if (!('data' in this.params[paramName])) {
    try { console.error("Can't update default data"); } catch (e) {}
    return;
  }

  if (!this.params[paramName].ui) {
    return;
  }

  var defaultData = this.getUiParamDefaultData(paramName);
  this.params[paramName].ui.setOptions({defaultItems: defaultData});
}

AdsViewEditor.prototype.getUiParamEnabled = function(paramName) {
  switch (paramName) {
    case 'category1_id':
      return !!(this.params[paramName].value != 125 || this.params.link_type.value != AdsEdit.ADS_AD_LINK_TYPE_APP || !this.params.link_id.app_game_links_ids[this.params.link_id.value]);
    case 'subcategory1_id':
      var data = this.getUiParamData(paramName);
      return !!(data.length || this.params[paramName].value);
    case 'subcategory2_id':
      var data = this.getUiParamData(paramName);
      return !!(data.length || this.params[paramName].value);
    default:
      return null;
  }
}

AdsViewEditor.prototype.updateUiParamEnabled = function(paramName) {
  if (!('data' in this.params[paramName])) {
    try { console.error("Can't update enabled state"); } catch (e) {}
    return;
  }

  this.updateUiParamVisibility(paramName); // Should be before any ui.disable()

  if (this.params[paramName].ui) {
    var enabled = this.getUiParamEnabled(paramName);
    if (enabled !== null) {
      if (!this.params[paramName].value) {
        this.params[paramName].ui.disable(enabled); // Fix disabling introText
        this.params[paramName].ui.disable(!enabled);
        this.params[paramName].ui.clear(); // Fix placeholder
      }
    }
  }
}

AdsViewEditor.prototype.updateUiParamVisibility = function(paramName) {
  switch (paramName) {
    case 'format_type':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);

      var linkTypeValue = this.params.link_type.value;
      var elemsHidden   = {};

      toggleClass(this.options.targetIdPrefix + paramName + '_text_image_wrap',          'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE]          = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL])));
      toggleClass(this.options.targetIdPrefix + paramName + '_big_image_wrap',           'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE]           = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO])));
      toggleClass(this.options.targetIdPrefix + paramName + '_exclusive_wrap',           'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE]           = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]) && this.params.format_type.allow_exclusive));
      toggleClass(this.options.targetIdPrefix + paramName + '_promotion_community_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])));
      toggleClass(this.options.targetIdPrefix + paramName + '_app_in_news_wrap',         'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS]         = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_in_news_links_ids[this.params.link_id.value] && this.params.format_type.allow_app_in_news));
      toggleClass(this.options.targetIdPrefix + paramName + '_apps_only_wrap',           'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY]           = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_trusted_links_ids[this.params.link_id.value]));
      toggleClass(this.options.targetIdPrefix + paramName + '_groups_only_wrap',         'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY]         = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC]) && this.params.format_type.allow_groups_only));
      toggleClass(this.options.targetIdPrefix + paramName + '_big_app_wrap',             'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP]             = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_trusted_links_ids[this.params.link_id.value] && this.params.format_type.allow_big_app));
      toggleClass(this.options.targetIdPrefix + paramName + '_mobile_wrap',              'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE]              = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE])));
      toggleClass(this.options.targetIdPrefix + paramName + '_promoted_post_wrap',       'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST]       = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_POST])));

      this.params.format_type.unreachable = false;
      for (var i in elemsHidden) {
        if (i == this.params.format_type.value) {
          this.params.format_type.unreachable = elemsHidden[i];
        }
      }

      if (!this.params[paramName].hidden) {
        var label = (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) ? getLang('ads_edit_ad_format_type_promotion_community') : getLang('ads_edit_ad_format_type_square_image'));
        ge(this.options.targetIdPrefix + 'format_type_promotion_community_label').innerHTML = label;
      }

      setStyle('ads_param_format_type_wrap', {height: ''});
      break;
    case '_format_type':
      var headerTitle = ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST) ? getLang('ads_edit_ad_header_setting_link_params') : getLang('ads_edit_ad_header_setting_view'));
      ge('ads_edit_value_header_view').innerHTML = headerTitle
      toggleClass('ads_edit_ad_row_upload_photo', 'unshown', !!(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST));
      break;
    case 'cost_type':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case '_link_type':
      toggleClass(this.options.targetIdPrefix + 'upload_video_wrap', 'unshown', !(this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO));
      break;
    case 'link_id':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case 'link_url':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case '_link_id':
      var linkResult = this.getLink();
      var elemVisible = !!(linkResult.link_url && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]));
      toggleClass(this.options.targetIdPrefix + 'link_id_go_wrap', 'unshown', !elemVisible);
      break;
    case '_link_url':
      var linkResult = this.getLink();
      var elemVisible = !!(linkResult.link_url && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE])
        || this.params.link_id.value && this.params.link_owner_id.value && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST
      );
      toggleClass(this.options.targetIdPrefix + 'link_url_go_wrap', 'unshown', !elemVisible);
      break;
    case '_link_video':
      var linkResult = this.getLink();
      var elemVisible = !!(linkResult.onclick && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO);
      toggleClass(this.options.targetIdPrefix + 'link_video_go_wrap', 'unshown', !elemVisible);
      break;
    case 'link_domain':
      var wrapElem = ge('ads_edit_ad_row_' + paramName);
      if (this.params[paramName].hidden) {
        addClass(wrapElem, 'unshown');
      } else {
        this.initUiParam(paramName);
        removeClass(wrapElem, 'unshown');
        if (this.params[paramName].delayed_error) {
          AdsEdit.showError(this.params[paramName].delayed_error);
          this.params[paramName].delayed_error = '';
        }
      }
      break;
    case 'title':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case '_title':
      toggleClass(this.options.targetIdPrefix + 'title_reduce', 'unshown', !(inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS, AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE]) && this.params.title.value_max.match(/[^\s:,][\s:,]+[^\s:,]/)));
      break;
    case 'description':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case '_additional':
      toggleClass('ads_edit_ad_row_additional', 'unshown', !!(this.params.disclaimer_medical.hidden && this.params.disclaimer_specialist.hidden && this.params.disclaimer_supplements.hidden));
      break;
    case 'disclaimer_medical':
    case 'disclaimer_specialist':
    case 'disclaimer_supplements':
      this.initUiParam(paramName);
      toggleClass(this.options.targetIdPrefix + paramName + '_wrap', 'unshown', !!this.params.disclaimer_medical.hidden);
      break;
    case 'category1_id':
    case 'category2_id':
    case 'subcategory1_id':
    case 'subcategory2_id':
      this.params[paramName].hidden = (this.params[paramName].hidden_normal || this.params.category1_id.value == 125 && !this.params.category2_id.value && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]);
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case 'stats_url':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case 'platform':
      this.initUiParam(paramName);
      toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
      break;
    case 'views_limit_flag':
    case 'views_limit_exact':
      toggleClass('ads_edit_ad_row_views_limit', 'unshown', !!(this.params.views_limit_flag.hidden && this.params.views_limit_exact.hidden));
      this.initUiParam(paramName);
      toggleClass(this.options.targetIdPrefix + paramName + '_wrap', 'unshown', !!this.params[paramName].hidden);
      break;
    case 'campaign_id':
      this.initUiParam(paramName);
      toggleClass(this.options.targetIdPrefix + paramName + '_wrap', 'unshown', !!this.params[paramName].hidden);
      break;
    case 'campaign_name':
      this.initUiParam(paramName);
      toggleClass(this.options.targetIdPrefix + paramName + '_wrap', 'unshown', !!this.params[paramName].hidden);
      break;
  }
}

AdsViewEditor.prototype.getUiParamPlaceholderText = function(paramName) {
  switch (paramName) {
    case 'link_id':
      switch (this.params.link_type.value) {
        case AdsEdit.ADS_AD_LINK_TYPE_GROUP:
        case AdsEdit.ADS_AD_LINK_TYPE_EVENT:
        case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC: return getLang('ads_type_community');
        case AdsEdit.ADS_AD_LINK_TYPE_APP:    return getLang('ads_type_app');
      }
      break;
    default:
      return '';
  }
}

AdsViewEditor.prototype.updateUiParamPlaceholderText = function(paramName) {
  if (!('data' in this.params[paramName])) {
    try { console.error("Can't update placeholder text"); } catch (e) {}
    return;
  }

  if (!this.params[paramName].ui) {
    return;
  }

  var placeholderText = this.getUiParamPlaceholderText(paramName);
  this.params[paramName].ui.setOptions({introText: placeholderText, placeholder: placeholderText});
  this.updateUiParamData(paramName); // Workaround to set introText and placeholder
}

AdsViewEditor.prototype.getUiParamNoResultText = function(paramName) {
  switch (paramName) {
    case 'link_id': return getLang('ads_notfound_link_object');
    default:        return '';
  }
}

AdsViewEditor.prototype.getUiParamDisabledText = function(paramName) {
  switch (paramName) {
    case 'subcategory1_id':
      if (this.params.category1_id.value) {
        return getLang('ads_no_subcategories');
      } else {
        return getLang('ads_first_select_category1');
      }
    case 'subcategory2_id':
      if (this.params.category2_id.value) {
        return getLang('ads_no_subcategories');
      } else {
        return getLang('ads_first_select_category2');
      }
    default:
      return '';
  }
}

AdsViewEditor.prototype.updateUiParamDisabledText = function(paramName) {
  if (!('data' in this.params[paramName])) {
    try { console.error("Can't update disabled text"); } catch (e) {}
    return;
  }

  if (!this.params[paramName].ui) {
    return;
  }

  var disabledText = this.getUiParamDisabledText(paramName);
  this.params[paramName].ui.setOptions({disabledText: disabledText});
}

AdsViewEditor.prototype.onParamUpdate = function(paramName, paramValue, forceDataUpdate, delayed) {
  var paramValueOld = this.params[paramName].value;

  // postpone function execution
  if (!delayed) {
    var delayMs = 1;

    switch (paramName) {
      case 'format_type': // animate layout when switching from/to big_app format
        if (((paramValue == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) || (paramValueOld == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP)) && (paramValueOld != paramValue)) {
          animate(this.preview.layout, {height: 0}, 200, function () {
            setTimeout(function () {
              animate(this.preview.layout, {height: 291}, 200);
            }.bind(this), 400);
          }.bind(this));
          delayMs = 200;
        }
        break;
    }

    setTimeout(function() {
      this.onParamUpdate(paramName, paramValue, forceDataUpdate, true);
    }.bind(this), delayMs);
    return;
  }

  // main function logic
  var isUpdateNeeded = false;
  do {
    if (typeof(this.params[paramName].value) === 'number' && intval(this.params[paramName].value) == this.params[paramName].value) {
      paramValue = intval(paramValue);
    }

    if ('value_escaped' in this.params[paramName]) {
      paramValue = AdsEdit.unescapeValue(paramValue);
    }

    if (this.params[paramName].value === paramValue) {
      break;
    }

    if ('value_escaped' in this.params[paramName]) {
      this.params[paramName].value_escaped = AdsEdit.escapeValue(paramValue);
    }
    this.params[paramName].value = paramValue;

    //debugLog(paramName + ' updated: ' + paramValueOld + ' => ' + this.params[paramName].value);

    switch (paramName) {
      case 'format_type':
        var photoSize = this.getPhotoSize();
        this.params.cost_type.cpm_only            = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST]);
        this.params.cost_type.hidden              = this.params.cost_type.cpm_only;

        if (this.params.cost_type.cpm_only) {
          this.setCostType(AdsEdit.ADS_AD_COST_TYPE_VIEWS);
        }

        this.params.title.hidden                  = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST);
        this.params.title.disabled                = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS, AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE]);
        this.params.description.hidden            = !inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP]);
        this.params.description.max_length        = ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) ? this.params.description.max_length_mobile : this.params.description.max_length_normal);
        this.params.disclaimer_medical.may_be_any = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY]);
        this.params.disclaimer_medical.hidden     = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_medical.allow);
        this.params.disclaimer_specialist.hidden  = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_specialist.allow);
        this.params.disclaimer_supplements.hidden = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_supplements.allow);
        this.params.stats_url.hidden              = !(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE && this.params.stats_url.allow_exclusive || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && this.params.stats_url.allow_promoted_post);
        this.params.views_limit_flag.hidden       = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE && this.params.views_limit_exact.allow || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST);
        this.params.views_limit_exact.hidden      = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS
          || ((this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE || !this.params.views_limit_exact.allow)
              &&  this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST));

        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
          this.setTitle(this.params.title.value_p);
          if ((!this.params.title.value_p) || (!this.params.photo_link.value_p)) {
            this.updateNeeded.need_format_promotion_community = true;
          }
        }
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS) {
          this.setTitle(this.params.title.value_a);
          if (!this.params.title.value_a) {
            this.updateNeeded.need_format_app_in_news = true;
          }
        }
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY) {
          this.setTitle(this.params.title.value_k);
          if (!this.params.title.value_k) {
            this.updateNeeded.need_format_apps_only = true;
          }
        }
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY) {
          this.setTitle(this.params.title.value_p);
          if (!this.params.photo.value_k) {
            this.updateNeeded.need_format_promotion_community = true;
          }
        }
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) {
          this.setTitle(this.params.title.value_e);
          if (!this.params.title.value_e) {
            this.updateNeeded.need_format_big_app = true;
          }
        }
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) {
          this.setTitle(this.params.title.value_d);
          if (!this.params.title.value_d) {
            this.updateNeeded.need_format_mobile = true;
          }
        }

        if (inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST])) {
          this.setViewsLimitExact(this.params.views_limit_exact.default_values[this.params.format_type.value]);
        }

        this.updateUiParam('title');
        this.updateUiParam('description');
        this.updateUiParam('_description');
        this.updateUiParam('cost_per_click');
        this.updateUiParam('platform');
        this.updateUiParam('views_limit_flag');
        this.updateUiParamData('views_limit_exact');
        this.updateUiParam('views_limit_exact');
        this.updateUiParamVisibility('_format_type');
        this.updateUiParamVisibility('cost_type');
        this.updateUiParamVisibility('title');
        this.updateUiParamVisibility('_title');
        this.updateUiParamVisibility('description');
        this.updateUiParamVisibility('_additional');
        this.updateUiParamVisibility('disclaimer_medical');
        this.updateUiParamVisibility('disclaimer_specialist');
        this.updateUiParamVisibility('disclaimer_supplements');
        this.updateUiParamVisibility('age_restriction');
        this.updateUiParamVisibility('stats_url');
        this.updateUiParamVisibility('views_limit_flag');
        this.updateUiParamVisibility('views_limit_exact');
        this.updatePreview('layout');
        this.updatePreview('play');
        this.updatePreview('description');
        this.updatePreview('domain');
        this.updatePreview('community_join');
        this.updatePreview('app_rating');
        this.updatePreview('mobile_app_bottom');
        this.updatePreview('age_restriction');
        this.updatePreview('big_app_info_box');
        this.updatePreview('disclaimers');
        this.updatePhotoData();
        this.updatePhotoData('i');

        this.updateTips();

        isUpdateNeeded = true;
        break;
      case 'cost_type':
        this.params.views_limit_flag.hidden  = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE && this.params.views_limit_exact.allow || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST);
        this.params.views_limit_exact.hidden = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST || !this.params.views_limit_exact.allow);

        this.updateUiParam('cost_per_click');
        this.updateUiParam('platform');
        this.updateUiParam('views_limit_flag');
        this.updateUiParamVisibility('views_limit_flag');
        this.updateUiParamVisibility('views_limit_exact');

        isUpdateNeeded = true;
        break;
      case 'link_type':
        this.params.link_id.value = '';
        this.params.link_owner_id.value = '';
        this.params.link_id.data = [];
        this.params.link_id.hidden     = !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]);
        this.params.link_url.hidden    = !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE, AdsEdit.ADS_AD_LINK_TYPE_POST]);
        this.params.link_domain.hidden = !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]);
        if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
          this.params.link_id.value       = this.params.link_id.video_value;
          this.params.link_owner_id.value = this.params.link_owner_id.video_value;
        }
        if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) || inArray(paramValueOld, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)) {
          var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
          this.params.link_domain.value           = '';
          this.params.link_domain.link_url        = '';
          this.params.link_domain.delayed_error   = '';
          this.params.link_domain.needed          = (linkUrlInfo && (!linkUrlInfo.domain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/) || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)));
          this.params.link_domain.disabled        = (!this.params.link_type.cancelling || !this.params.link_domain.needed);
          this.params.link_domain.is_ok           = false;
          this.params.link_domain_confirm.value   = 0;
        }
        this.params.platform.hidden = !!(this.params.link_type.value != AdsEdit.ADS_AD_LINK_TYPE_POST && (!this.params.platform.allow_web || !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL])));

        this.updateUiParam('link_id');
        this.updateUiParam('link_url');
        this.updateUiParam('link_domain');
        this.updateUiParam('_link_type');
        this.updateUiParam('_link_id');
        this.updateUiParam('_link_url');
        this.updateUiParam('_link_video');
        this.updateUiParamPlaceholderText('link_id');
        this.updateUiParamData('link_id');
        this.updateUiParamVisibility('_link_type');
        this.updateUiParamVisibility('_link_id');
        this.updateUiParamVisibility('_link_url');
        this.updateUiParamVisibility('_link_video');
        this.updateUiParamVisibility('link_id');
        this.updateUiParamVisibility('link_url');
        this.updateUiParamVisibility('link_domain');
        if (!this.params.link_type.cancelling && (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) || inArray(paramValueOld, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP))) {
          this.updateLinkDomain();
        }

        this.updateTips();
        if (paramValueOld == 0) {
          this.showLinkObjectPanel();
        }

        if (!this.params.link_type.cancelling && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP])) {
          this.updateNeeded.need_links = true;
          isUpdateNeeded = true;
        }
        if (!this.params.link_type.cancelling && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) {
          this.updateNeeded.need_link_post = true;
          isUpdateNeeded = true;
        }
        break;
      case 'link_id':
        if (inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])) {
          var items    = this.params.link_id.ui.selectedItems();
          var itemId   = intval(items && items[0] && items[0][0] || 0);
          var itemData = (items && items[0] && items[0][2] || '');
          if (itemId) {
            if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP) {
              if (itemData.indexOf('ads_data__app_game') >= 0) {
                this.params.link_id.app_game_links_ids[itemId] = true;
              }
              if (itemData.indexOf('ads_data__app_admin') >= 0) {
                this.params.link_id.app_admin_links_ids[itemId] = true;
              }
              if (itemData.indexOf('ads_data__app_trusted') >= 0) {
                this.params.link_id.app_trusted_links_ids[itemId] = true;
              }
              if (itemData.indexOf('ads_data__app_in_news') >= 0) {
                this.params.link_id.app_in_news_links_ids[itemId] = true;
              }
            } else if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) && itemId == this.params.link_id.value) {
              if (itemData.indexOf('ads_data__group_event') >= 0) {
                this.params.link_type.value = AdsEdit.ADS_AD_LINK_TYPE_EVENT;
              } else if (itemData.indexOf('ads_data__group_public') >= 0) {
                this.params.link_type.value = AdsEdit.ADS_AD_LINK_TYPE_PUBLIC;
              } else {
                this.params.link_type.value = AdsEdit.ADS_AD_LINK_TYPE_GROUP;
              }
            }
          }
        }
        this.updateUiParam('link_domain');
        this.updateUiParam('_link_type');
        this.updateUiParam('_link_id');
        this.updateUiParamVisibility('_link_id');
        this.updateTips();
        break;
      case 'link_url':
        var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
        this.params.link_url.is_ok = !!linkUrlInfo;
        // <???>
        this.params.link_url_vk.value           = 0;
        this.params.link_url_vk.link_type_value = 0;
        this.params.link_url_vk.link_id_value   = 0;
        // </???>
        if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) {
          this.params.link_id.value             = 0;
          this.params.link_owner_id.value       = 0;
        }
        this.params.link_domain.value           = '';
        this.params.link_domain.link_url        = '';
        this.params.link_domain.delayed_error   = '';
        this.params.link_domain.needed          = (linkUrlInfo && (!linkUrlInfo.domain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/) || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)));
        this.params.link_domain.disabled        = (!this.params.link_type.cancelling || !this.params.link_domain.needed);
        this.params.link_domain.is_ok           = false;
        this.params.link_domain_confirm.value   = 0;
        this.params.promoted_post_need_confirmation.value = 0;
        this.updateUiParam('link_domain');
        this.updateUiParam('_link_type');
        this.updateUiParam('_link_url');
        this.updateUiParam('_link_video');
        this.updateUiParamVisibility('_link_url');
        if (!this.params.link_type.cancelling) {
          this.updateLinkDomain();
        }
        if (!this.params.link_type.cancelling && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) {
          this.updateNeeded.need_link_post = true;
          isUpdateNeeded = true;
        }
        break;
      case 'link_domain':
        var linkDomainInfo = this.getLinkInfo(this.params.link_domain.value);
        this.params.link_domain.is_ok = !!(linkDomainInfo && this.params.link_domain.value == linkDomainInfo.domain || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) && this.params.link_domain.value === '1');
        this.updateUiParam('_link_type');
        this.updateUiParam('_link_video');
        break;
      case 'title':
        if (this.params[paramName].update_value_max || !inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS, AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE])) {
          this.params[paramName].value_max = this.params[paramName].value;
        }
        this.updateUiParam(paramName);
        this.updateUiParam('_title');
        this.updateUiParamVisibility('_title');
        this.updatePreview(paramName);
        break;
      case 'description':
        this.updateUiParam(paramName);
        this.updateUiParam('_description');
        this.updatePreview(paramName);
        break;
      case 'category1_id':
        this.params.subcategory1_id.value = 0;

        this.updateUiParamData('subcategory1_id');
        this.updateUiParamDisabledText('subcategory1_id');
        this.updateUiParamEnabled('subcategory1_id');
        break;
      case 'category2_id':
        this.params.subcategory2_id.value = 0;

        this.updateUiParamData('subcategory2_id');
        this.updateUiParamDisabledText('subcategory2_id');
        this.updateUiParamEnabled('subcategory2_id');
        break;
      case 'disclaimer_medical':
        this.updateUiParam('disclaimer_medical');
        this.updateUiParam('platform');
        this.updatePreview('disclaimer_medical');
        this.updatePreview('disclaimers');
        break;
      case 'disclaimer_specialist':
        this.updateUiParam('disclaimer_specialist');
        this.updateUiParam('platform');
        this.updatePreview('disclaimer_specialist');
        this.updatePreview('disclaimers');
        break;
      case 'disclaimer_supplements':
        this.updateUiParam('disclaimer_supplements');
        this.updateUiParam('platform');
        this.updatePreview('disclaimer_supplements');
        this.updatePreview('disclaimers');
        break;
      case 'age_restriction':
        this.updateUiParam('age_restriction');
        this.updatePreview('age_restriction');
        this.updatePreview('domain');
        break;
      case 'cost_per_click':
        this.params.cost_per_click.edited = true;

        var isAppCampaign = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || (this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app));
        var isAppAdminLink = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_admin_links_ids[this.params.link_id.value]);
        var isApp = (isAppCampaign && isAppAdminLink && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);

        var auctionName = 'site';
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY) {
          auctionName = 'apps_only';
        } else if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY) {
          auctionName = 'groups_only';
        } else if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) {
          auctionName = 'big_app';
        } else if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID) {
          auctionName = 'android';
        } else if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE) {
          auctionName = 'iphone';
        } else if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE) {
          auctionName = 'wphone';
        } else if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST) {
          auctionName = 'promoted_posts';
        }

        var suffixesAll = '';
        suffixesAll    += ((this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK)         ? '_click'     : '_views');
        suffixesAll    += ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE) ? '_exclusive' : '');
        suffixesAll    += (isApp                                                                   ? '_app'       : '');

        var multClick     = this.params.cost_per_click.coeffs[auctionName];
        var multExclusive = 2;
        var multApp       = 1 / 2;

        var costPerClickValue = 'value' + suffixesAll;

        var suffixes = [
          {from: '_views',               to: '_click',               mult: 1 * multClick},
          {from: '_click',               to: '_click_exclusive',     mult: 1 * multExclusive},
          {from: '_click_exclusive',     to: '_click_app',           mult: 1 / multExclusive * multApp},
          {from: '_click_app',           to: '_click_exclusive_app', mult: 1 * multExclusive},
          {from: '_click_exclusive_app', to: '_views_exclusive_app', mult: 1 / multClick},
          {from: '_views_exclusive_app', to: '_views_app',           mult: 1 / multExclusive},
          {from: '_views_app',           to: '_views_exclusive',     mult: 1 * multExclusive / multApp},
          {from: '_views_exclusive',     to: '_views',               mult: 1 / multExclusive}
        ];

        var values = {};

        values[costPerClickValue] = Number(this.params.cost_per_click.value);

        do {
          var valuesCountComplete = 0;
          var valuesCountTotal = 0;

          for (var iSuffix in suffixes) {
            var suffixInfo    = suffixes[iSuffix];
            var valueNameTo   = 'value' + suffixInfo.to;
            var valueNameFrom = 'value' + suffixInfo.from;
            if (!(valueNameTo in values) && (valueNameFrom in values)) {
              values[valueNameTo] = values[valueNameFrom] * suffixInfo.mult;
            }

            valuesCountComplete += (valueNameTo in values);
            valuesCountTotal++;
          }
        } while (valuesCountComplete != valuesCountTotal);

        for (var valueName in values) {
          this.params.cost_per_click[valueName] = Number(values[valueName]).toFixed(2).replace('.00', '');
        }

        this.updateUiParam('cost_per_click');
        break;
      case 'platform':
        var linkTypeNormal = (this.params.platform.values_normal[this.params.link_type.value] ? this.params.link_type.value : 0);
        this.params.platform.values_normal[linkTypeNormal] = this.params.platform.value;

        isUpdateNeeded = true;
        break;
      case 'campaign_type':
        this.params.campaign_id.hidden     = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW || this.params.campaign_id.data.length == 0 || (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET && !this.params.campaign_id.value_app));
        this.params.campaign_name.hidden   = !this.params.campaign_id.hidden;
        this.params.campaign_id.disabled   = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET);
        this.params.campaign_name.disabled = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET);
        if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET) {
          this.params.campaign_id.value   = this.params.campaign_id.value_app;
          this.params.campaign_name.value = getLang('ads_default_first_app_campaign_name');
        } else if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD) {
          this.params.campaign_id.value   = this.params.campaign_id.value_normal;
          this.params.campaign_name.value = '';
        } else if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW) {
          this.params.campaign_id.value   = 0;
          this.params.campaign_name.value = this.params.campaign_name.value_normal;
        }

        this.updateUiParam('cost_per_click');
        this.updateUiParam('platform');
        this.updateUiParamVisibility('campaign_id');
        this.updateUiParamVisibility('campaign_name');
        this.updateUiParam('campaign_id');
        this.updateUiParam('campaign_name');
        this.updatePreview('link');
        this.updateTips();

        isUpdateNeeded = true;
        break;
      case 'campaign_id':
        this.params.campaign_id.value_normal = this.params.campaign_id.value;
        this.updateUiParam('cost_per_click');
        this.updateUiParam('platform');
        this.updatePreview('link');
        this.updateTips();

        isUpdateNeeded = true;
        break;
      case 'campaign_name':
        this.params.campaign_name.value_normal = this.params.campaign_name.value;
        break;
    }

  } while (false);

  if (isUpdateNeeded || forceDataUpdate) {
    this.needDataUpdate();
  }
}

AdsViewEditor.prototype.onUiSelect = function(paramName, paramValue) {
  this.onParamUpdate(paramName, paramValue);
}

AdsViewEditor.prototype.onUiChange = function(paramName, paramValue) {
  this.onParamUpdate(paramName, paramValue);
}

AdsViewEditor.prototype.onUiEvent = function(paramName, event) {

  switch (paramName) {
    case 'link_type':
      var curElem = event.currentTarget;
      if (hasClass(curElem, 'disabled')) {
        break;
      }

      var elems = geByClass('ads_edit_link_type_item', 'ads_param_link_type_wrap');
      for (var i = 0, elem; elem = elems[i]; i++) {
        removeClass(elem, 'selected');
      }
      addClass(curElem, 'selected');

      var paramValue = curElem.getAttribute('value');
      this.onParamUpdate(paramName, paramValue);
      break;
    case 'link_url':
      var eventType = event.type;
      if (inArray(eventType, ['blur', 'paste', 'drop']) || eventType === 'keyup' && event.keyCode == KEY.RETURN) {
        this.params[paramName].event_final_time = vkNow();
      } else if (vkNow() - this.params[paramName].event_final_time > 200) {
        this.params[paramName].event_final_time = false;
      }

      // setTimeout at least for IE
      setTimeout(function() {
        var targetElem = ge(this.options.targetIdPrefix + paramName);
        if (!targetElem) {
          return;
        }
        var paramValue = targetElem.value;
        this.onParamUpdate(paramName, paramValue);
        if (this.params[paramName].event_final_time) {
          this.updateLinkDomain();
        }
      }.bind(this), 100);
      break;
    case 'link_domain':
    case 'stats_url':
      // setTimeout at least for IE
      setTimeout(function() {
        var targetElem = ge(this.options.targetIdPrefix + paramName);
        if (!targetElem) {
          return;
        }
        var paramValue = targetElem.value;
        this.onParamUpdate(paramName, paramValue);
      }.bind(this), 100);
      break;
    case 'title':
    case 'description':
      function correctValue(delayed, event) {
        var targetElem = ge(this.options.targetIdPrefix + paramName);
        if (!targetElem) {
          return;
        }
        var paramValueOriginal = targetElem.value;
        var paramValue = this.correctInvalidValue(paramName, paramValueOriginal);
        if (paramValue !== paramValueOriginal) {
          targetElem.value = paramValue;
        }
        //console.log('onUiEvent, paramName = ' + paramName + ', event.type = ' + event.type + ', paramValue = ' + paramValue + ', delayed = ', delayed);
        if (browser.msie && event.type === 'paste') {
          targetElem.blur();
          targetElem.focus();
        }
        if (browser.chrome) { // Bug: Chrome counts new lines as 2 chars
          var maxLengthNew = this.params[paramName].max_length + paramValue.split("\n").length - 1;
          targetElem.setAttribute('maxlength', maxLengthNew);
        }
        if (delayed) {
          this.onParamUpdate(paramName, paramValue);
        }
      }
      function checkSpelling(param) {
        this.updateNeeded['need_' + param + '_spelling'] = true;
        this.needDataUpdate();
      }

      correctValue.bind(this)(false, event);

      // setTimeout at least for IE
      setTimeout(correctValue.bind(this, true, event), 100);

      if (this.descriptionAndTitleSpellingTimer) {
        clearTimeout(this.descriptionAndTitleSpellingTimer);
      }
      this.descriptionAndTitleSpellingTimer = setTimeout(checkSpelling.bind(this, paramName), 1500);
      break;
    case 'title_reduce':
      if (event.type === 'click' || event.type === 'keypress' && event.keyCode == KEY.RETURN) {
        this.reduceTitle();
        return false;
      }
      break;
    case 'cost_per_click':
      // setTimeout at least for IE
      setTimeout(function() {
        var targetElem = ge(this.options.targetIdPrefix + paramName);
        if (!targetElem) {
          return;
        }
        var paramValue = targetElem.value;
        paramValue = paramValue.replace(',', '.');
        paramValue = floatval(paramValue).toFixed(2).replace('.00', '');
        this.onParamUpdate(paramName, paramValue);
      }.bind(this), 100);
      break;
    case 'campaign_name':
      // setTimeout at least for IE
      setTimeout(function() {
        var targetElem = ge(this.options.targetIdPrefix + paramName);
        if (!targetElem) {
          return;
        }
        var paramValue = targetElem.value;
        this.onParamUpdate(paramName, paramValue);
      }.bind(this), 100);
      break;
  }

  return true;
}

AdsViewEditor.prototype.needDataUpdate = function() {
  if (!this.getUpdatedData) {
    return;
  }
  var params = this.getParams();
  var data = extend({}, params, this.updateNeeded);
  var force = !isEmpty(this.updateNeeded);
  this.updateNeeded = {};
  this.getUpdatedData(data, force);
}

AdsViewEditor.prototype.setUpdateDataHandler = function(getUpdatedData) {
  this.getUpdatedData = getUpdatedData;
}

AdsViewEditor.prototype.setUpdateData = function(data, result) {
  var setResult = true;

  if (data['need_links']) {
    if (isObject(result) && 'link_id_data' in result) {
      if (data.link_type == this.params.link_type.value) {
        this.params.link_id.data = result.link_id_data;
        if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP) {
          if ('app_admin_links_ids' in result) {
            for (var link_id in result.app_admin_links_ids) {
              this.params.link_id.app_admin_links_ids[link_id] = result.app_admin_links_ids[link_id];
            }
          } else {
            setResult = false;
          }
          if ('app_trusted_links_ids' in result) {
            for (var link_id in result.app_trusted_links_ids) {
              this.params.link_id.app_trusted_links_ids[link_id] = result.app_trusted_links_ids[link_id];
            }
          } else {
            setResult = false;
          }
          if ('app_game_links_ids' in result) {
            for (var link_id in result.app_game_links_ids)
            this.params.link_id.app_game_links_ids[link_id] = result.app_game_links_ids[link_id];
          } else {
            setResult = false;
          }
          if ('app_in_news_links_ids' in result) {
            for (var link_id in result.app_in_news_links_ids)
            this.params.link_id.app_in_news_links_ids[link_id] = result.app_in_news_links_ids[link_id];
          } else {
            setResult = false;
          }
        }
        this.updateUiParamData('link_id');
      }
    } else {
      setResult = false;
    }
  }

  if (isObject(result) && 'cost_per_click' in result) {
    if (!this.params.cost_per_click.edited) {
      for (var key in result.cost_per_click) {
        if (key.indexOf('value_') === 0 && key in this.params.cost_per_click) {
          this.params.cost_per_click[key] = result.cost_per_click[key];
        }
      }
    }
    for (var key in result.cost_per_click) {
      if (key.indexOf('recommended_') === 0 && key in this.params.cost_per_click) {
        this.params.cost_per_click[key] = result.cost_per_click[key];
      }
    }

    this.updateUiParam('cost_per_click');
  }

  if (isObject(result) && 'audience_count_text' in result) {
    var targetElem = ge('ads_edit_audience_text');
    targetElem.innerHTML = result.audience_count_text;
  }

  // Temporary disabled
  if (false && isObject(result) && 'link_url_vk_link_type' in result && data.link_url === this.params.link_url.value) {
    this.params.link_url_vk.value           = 1;
    this.params.link_url_vk.link_type_value = result.link_url_vk_link_type;
    this.params.link_url_vk.link_id_value   = result.link_url_vk_link_id;
  }

  if (isObject(result) && 'post_link_id' in result) {
    if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST && data.link_type == this.params.link_type.value && data.link_url == this.params.link_url.value) {
      this.params.link_id.value              = result['post_link_id'];
      this.params.link_owner_id.value        = result['post_link_owner_id'];
      this.params.link_id.promoted_post_text = result['post_text'];

      this.updateUiParam('_link_type');
      this.updateUiParam('_link_url');
      this.updateUiParamVisibility('_link_url');
    }
  }

  if (isObject(result) && 'p_title' in result) {
    var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
    if (inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY]) && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && inArray(vkLinkType, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])) {
      var titleUnescaped = AdsEdit.unescapeValueInit(result['p_title']);
      if (result['p_photo'] && (this.params.format_type.value === AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY)) {
        this.setPhotoData('p', result['p_photo']);
      } else if (result['k_photo'] && (this.params.format_type.value === AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY)) {
        this.setPhotoData('k', result['k_photo']);
      }
      this.setTitle(titleUnescaped, false, {value_p: titleUnescaped});
      this.params.link_domain.value_p = result['p_link_domain'];
      this.updateUiParam('link_domain');
      this.updatePreview('domain');
    }
  }

  if (isObject(result) && 'a_title' in result) {
    var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
    if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
      var titleUnescaped = AdsEdit.unescapeValueInit(result['a_title']);
      this.setPhotoData('a', result['a_photo']);
      this.setTitle(titleUnescaped, false, {value_a: titleUnescaped});
      this.params.link_domain.value_a = result['a_link_domain'];
      this.updateUiParam('link_domain');
      this.updatePreview('domain');
    }
  }

  if (isObject(result) && 'k_title' in result) {
    var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
    if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
      var titleUnescaped = AdsEdit.unescapeValueInit(result['k_title']);
      this.setPhotoData('k', result['k_photo']);
      this.setTitle(titleUnescaped, false, {value_k: titleUnescaped});
      this.params.link_domain.value_k = result['k_link_domain'];
      this.params.link_id.app_rates_k = result['k_app_rates'];
      this.updateUiParam('link_domain');
      this.updatePreview('domain');
      this.updatePreview('app_rating');
    }
  }

  if (isObject(result) && 'e_title' in result) {
    var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
    if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
      var titleUnescaped = AdsEdit.unescapeValueInit(result['e_title']);
      var descriptionUnescaped = AdsEdit.unescapeValueInit(result['e_description']);
      this.setPhotoData('e', result['e_photo']);
      this.setTitle(titleUnescaped, false, {value_e: titleUnescaped});
      this.setDescription(descriptionUnescaped);
    }
  }

  if (isObject(result) && 'd_title' in result) {
    if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) && data.link_type == this.params.link_type.value && data.link_url == this.params.link_url.value) {
      var titleUnescaped = AdsEdit.unescapeValueInit(result['d_title']);
      this.params.link_type.value = result['mobile_app_link_type'];
      this.params.link_owner_id.value = result['mobile_app_link_owner_id'];
      this.setPhotoData('i', result['i_photo']);
      this.setTitle(titleUnescaped, false, {value_d: titleUnescaped});
      this.params.link_domain.value_d = result['d_link_domain'];
      this.params.link_id.mobile_app_bottom_d = result['d_mobile_app_bottom'];
      this.updateUiParam('link_domain');
      this.updatePreview('layout');
      this.updatePreview('domain');
      this.updatePreview('mobile_app_bottom');
    }
  }

  if (isObject(result) && 'description_spelling' in result) {
    var suggestionsHash = result['description_spelling_hash'];
    if (!suggestionsHash || !inArray(suggestionsHash, this.ignoreSpellingMessageHashes['description'])) {
      this.params.description_spelling = result['description_spelling'];
      this.updateUiParam('description');
    } else {
      this.params.description_spelling = 'ok';
      this.updateUiParam('description');
    }
  } else {
    this.params.description_spelling = 'ok';
    this.updateUiParam('description');
  }

  if (isObject(result) && 'title_spelling' in result) {
    var suggestionsHash = result['title_spelling_hash'];
    if (!suggestionsHash || !inArray(suggestionsHash, this.ignoreSpellingMessageHashes['title'])) {
      this.params.title_spelling = result['title_spelling'];
      this.updateUiParam('title');
    } else {
      this.params.title_spelling = 'ok';
      this.updateUiParam('title');
    }
  } else {
    this.params.title_spelling = 'ok';
    this.updateUiParam('title');
  }

  return setResult;
}

AdsViewEditor.prototype.replaceValueNewLines = function(value, maxNewLines) {
  for (var i = 0, j = 0; i >= 0; j++) {
    if (j >= maxNewLines) {
      value = value.substr(0, i) + value.substr(i).replace(/\n/g, " ");
      break;
    }
    i = value.indexOf("\n", i);
    i += (i >= 0);
  }
  return value;
}

AdsViewEditor.prototype.correctInvalidValue = function(paramName, paramValue) {
  paramValue = paramValue.substr(0, this.params[paramName].max_length);
  paramValue = this.replaceValueNewLines(paramValue, this.params[paramName].max_new_lines);
  return paramValue;
}

AdsViewEditor.prototype.getLinkInfo = function(link) {
  var matches = link.match(/^(https?:\/\/)?((?:[^:\/]+\.)+[^:\/]+)(\/.*)?$/i);
  if (!matches) {
    return false;
  }
  var linkInfo = {};
  linkInfo.protocol = matches[1];
  linkInfo.domain   = matches[2];
  linkInfo.path     = matches[3];
  linkInfo.domain   = linkInfo.domain.toLowerCase();
  if (linkInfo.domain.length > 7) {
    linkInfo.domain = linkInfo.domain.replace(/^www\./, '');
  }
  return linkInfo;
}

AdsViewEditor.prototype.getParams = function() {
  var params = {};
  for (var paramName in this.params) {
    params[paramName] = this.params[paramName].value;
  }
  params.photo_icon = this.params.photo.value_i;
  return params;
}

AdsViewEditor.prototype.getPhotoSize = function() {
  switch (this.params.format_type.value) {
    case AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE:          return 's';
    case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE:           return 'm';
    case AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE:           return 'b';
    case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY: return 'p';
    case AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS:         return 'a';
    case AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY:           return 'k';
    case AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY:         return 'k';
    case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP:             return 'e';
    case AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE:              return 'd';
    case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST:       return ''; // No photo needed for promoted post
    default:                                             return '';
  }
}

AdsViewEditor.prototype.setPhotoData = function(photoSize, photo) {
  var valueBySize = 'value_' + photoSize;

  this.params.photo[valueBySize]      = photo || '';
  this.params.photo_link[valueBySize] = '';

  this.updatePhotoData(photoSize);
}

AdsViewEditor.prototype.updatePhotoData = function(photoSize) {
  var photoSizeCur = this.getPhotoSize();
  photoSize = photoSize || photoSizeCur;
  var valueBySize = 'value_' + photoSize;

  if (photoSize === photoSizeCur && photoSize !== 'i') {
    this.params.photo.value      = this.params.photo[valueBySize];
    this.params.photo_link.value = this.params.photo_link[valueBySize];
  }

  this.updatePhotoLink(photoSize);
}

AdsViewEditor.prototype.updatePhotoLink = function(photoSize) {
  var valueBySize = 'value_' + photoSize;

  if (this.params.photo_link[valueBySize] || this.params.photo_link[valueBySize] === null || !this.params.photo[valueBySize]) {
    this.updatePreview((photoSize === 'i') ? 'photo_icon' : 'photo');
    return;
  }
  var lockHash = 'update_photo_link_' + photoSize + '_' + this.params.photo[valueBySize];
  if (!Ads.lock(lockHash)) {
    return;
  }

  var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);

  var ajaxParams = {};
  ajaxParams.photo       = this.params.photo[valueBySize];
  ajaxParams.format_type = this.params.format_type.value;
  ajaxParams.link_type   = vkLinkType;

  ajax.post('/adsedit?act=get_photo_link', ajaxParams, {onDone: onDone.bind(this), onFail: onFail.bind(this)})

  function onDone(photoLink) {
    Ads.unlock(lockHash);
    if (this.params.photo[valueBySize] == ajaxParams.photo) {
      this.params.photo_link[valueBySize] = (photoLink || null);
      this.updatePhotoData(photoSize);
    }
  }
  function onFail() {
    Ads.unlock(lockHash);
  }
}

AdsViewEditor.prototype.setVideoData = function(linkId, linkOwnerId, videoHash, videoPreviewHash) {
  this.params.video_hash.value            = videoHash;
  this.params.link_id.video_value         = linkId;
  this.params.link_owner_id.video_value   = linkOwnerId;
  this.params.link_url.video_preview_hash = videoPreviewHash;
  if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
    this.params.link_id.value       = linkId;
    this.params.link_owner_id.value = linkOwnerId;
  }
  this.updateUiParam('_link_type');
  this.updateUiParam('_link_video');
  this.updateUiParamVisibility('_link_video');
  this.updatePreview('link');
  this.updatePreview('play');
}

AdsViewEditor.prototype.setFormatType = function(formatType) {
  this.onParamUpdate('format_type', formatType, false, true);
  Radiobutton.select(this.options.targetIdPrefix + 'format_type', this.params.format_type.value);
}

AdsViewEditor.prototype.setCostType = function(costType) {
  this.onParamUpdate('cost_type', costType, false, true);
  if (this.params.cost_type.uiInited) {
    Radiobutton.select(this.options.targetIdPrefix + 'cost_type', this.params.cost_type.value);
  }
}

AdsViewEditor.prototype.setViewsLimitExact = function(viewsLimitExact) {
  this.onParamUpdate('views_limit_exact', viewsLimitExact, false, true);
  if (this.params.views_limit_exact.uiInited) {
    this.params.views_limit_exact.ui.selectedItems(this.params.views_limit_exact.value);
  }
}

AdsViewEditor.prototype.setLinkType = function(linkType) {
  this.onParamUpdate('link_type', linkType, false, true);
  this.updateUiParam('link_type');
}

AdsViewEditor.prototype.setLinkId = function(linkId, data) {
  if (data) {
    this.params.link_id.data = data;
    this.updateUiParamData('link_id');
  } else {
    this.updateNeeded.need_links = true;
  }
  this.onParamUpdate('link_id', linkId, false, true);
  this.updateUiParam('link_id');
}

AdsViewEditor.prototype.setTitle = function(title, noUpdateValueMax, titleValues) {
  this.params.title.update_value_max = !noUpdateValueMax;
  var targetElem = ge(this.options.targetIdPrefix + 'title');
  targetElem.value = title;
  var clearTitleValues = (titleValues === '');
  if (clearTitleValues || isObject(titleValues)) {
    var valuesKeys = ['value_p', 'value_a', 'value_k', 'value_d', 'value_e'];
    for (var i in valuesKeys) {
      var valueKey = valuesKeys[i];
      if (clearTitleValues || valueKey in titleValues) {
        this.params.title[valueKey] = (clearTitleValues ? '' : titleValues[valueKey]);
      }
    }
  }
  triggerEvent(targetElem, 'blur', {}, true);
}

AdsViewEditor.prototype.reduceTitle = function() {
  var title = this.params.title.value;
  title = title.replace(/([\s:,]|[\-–—\|]\s)[^\s:,]+$/, '');
  title = title.replace(/[\s:,\-–—\|]+$/, '');
  if (title == this.params.title.value) {
    title = this.params.title.value_max;
  }
  this.setTitle(title, true);
}

AdsViewEditor.prototype.setDescription = function(description) {
  var targetElem = ge(this.options.targetIdPrefix + 'description');
  targetElem.value = description;
  triggerEvent(targetElem, 'blur', {}, true);
}

AdsViewEditor.prototype.updateLinkDomain = function(onCompleteNoError) {

  if (!inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE])) {
    return true;
  }

  var link = this.params.link_url.value;

  if (link && link == this.params.link_domain.link_url) {
    return true;
  }

  if (this.updateLinkDomainContext) {
    var isLinkEqual = this.isLinkDomainLinkEqual(this.params.link_type.value, this.updateLinkDomainContext.linkType, link, this.updateLinkDomainContext.linkUrl);
    if (isLinkEqual && (!onCompleteNoError || this.updateLinkDomainContext.onCompleteNoError) && (!this.updateLinkDomainContext.first || !this.params.link_url.event_final_time)) {
      return false;
    }
    clearTimeout(this.updateLinkDomainContext.timeout);
    this.updateLinkDomainContext.stop = true;
    unlockButton('ads_param_link_object_complete');
    removeClass('ads_param_link_object_cancel', 'button_disabled');
  }
  this.updateLinkDomainContext = {};

  var linkInfo = this.getLinkInfo(link);
  if (!linkInfo || !linkInfo.domain) {
    return true;
  }

  if (linkInfo.domain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/)) {
    return true;
  }

  this.updateLinkDomainContext.linkType          = this.params.link_type.value;
  this.updateLinkDomainContext.linkUrl           = link;
  this.updateLinkDomainContext.adId              = this.params.ad_id.value;
  this.updateLinkDomainContext.campaignId        = this.params.campaign_id.value;
  this.updateLinkDomainContext.triesLeft         = 30;
  this.updateLinkDomainContext.first             = true;
  this.updateLinkDomainContext.onCompleteNoError = onCompleteNoError;

  var waitTimeout = (this.params.link_url.event_final_time ? 1 : 5000);

  this.updateLinkDomainContext.timeout = setTimeout(this.updateLinkDomainTry.bind(this, this.updateLinkDomainContext), waitTimeout);

  return false;
}

AdsViewEditor.prototype.updateLinkDomainTry = function(updateContext) {
  if (updateContext.stop) {
    return;
  }

  if (updateContext.first) {
    updateContext.first = false;
    lockButton('ads_param_link_object_complete');
    addClass('ads_param_link_object_cancel', 'button_disabled');
  }

  if (updateContext.triesLeft > 0) {
    var isWait = false;

    var ajaxParams = {};
    ajaxParams.link_type   = updateContext.linkType;
    ajaxParams.link_url    = updateContext.linkUrl;
    ajaxParams.ad_id       = updateContext.adId;
    ajaxParams.campaign_id = updateContext.campaignId;
    ajax.post('/adsedit?act=get_link_domain', ajaxParams, {onDone: onAjaxComplete.bind(this), onFail: onAjaxComplete.bind(this)});
  } else {
    onError.bind(this)(inArray(updateContext.linkType, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) ? getLang('ads_error_mobile_app_unreachable') : getLang('ads_error_url_unreachable'))
  }

  function onAjaxComplete(response) {
    if (updateContext.stop) {
      fullStop.bind(this)();
      return true;
    }
    if (response && response.error) {
      onError.bind(this)(response.error);
      return true;
    }
    if (isObject(response) && !response.wait && 'link_domain' in response) {
      var isLinkEqual = this.isLinkDomainLinkEqual(updateContext.linkType, this.params.link_type.value, updateContext.linkUrl, this.params.link_url.value);
      if (isLinkEqual) {
        this.params.link_domain.disabled = false;
        this.params.link_domain.link_url = updateContext.linkUrl;
        if (response.link_domain) {
          this.params.link_domain.value = response.link_domain;
          this.params.link_domain.is_ok = true;
        }
        this.updateUiParam('link_domain');
        this.updateUiParam('_link_type');
        this.updateUiParam('_link_video');
        this.onParamUpdate('link_domain', this.params.link_domain.value);
        unlockButton('ads_param_link_object_complete');
        removeClass('ads_param_link_object_cancel', 'button_disabled');
        if (isFunction(updateContext.onCompleteNoError)) {
          updateContext.onCompleteNoError();
        }
        if (this.params.link_domain.last_error_message === AdsEdit.getLastError()) {
          AdsEdit.hideErrors();
        }
      }
      fullStop.bind(this)();
      return true;
    }

    updateContext.triesLeft--;
    this.updateLinkDomainContext.timeout = setTimeout(this.updateLinkDomainTry.bind(this, updateContext), 1000);
    return true;
  }

  function onError(message) {
    var isLinkEqual = this.isLinkDomainLinkEqual(updateContext.linkType, this.params.link_type.value, updateContext.linkUrl, this.params.link_url.value);
    if (isLinkEqual) {
      this.params.link_domain.disabled = false;
      this.params.link_domain.link_url = updateContext.linkUrl;
      if (inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE])) {
        this.params.link_domain.last_error_message = message;
        AdsEdit.showError(message);
      } else {
        this.params.link_domain.delayed_error = message;
      }
      this.updateUiParam('link_domain');
      unlockButton('ads_param_link_object_complete');
      removeClass('ads_param_link_object_cancel', 'button_disabled');
    }
    fullStop.bind(this)();
  }

  function fullStop() {
    var isLinkEqual1 = this.isLinkDomainLinkEqual(updateContext.linkType, this.params.link_type.value, updateContext.linkUrl, this.params.link_url.value);
    var isLinkEqual2 = this.isLinkDomainLinkEqual(this.updateLinkDomainContext.linkType, this.params.link_type.value, this.updateLinkDomainContext.linkUrl, this.params.link_url.value);
    if (isLinkEqual1 && isLinkEqual2) {
      this.updateLinkDomainContext = {};
    }
  }
}

AdsViewEditor.prototype.isLinkDomainLinkEqual = function(linkType1, linkType2, linkUrl1, linkUrl2) {
  if (linkUrl1 !== linkUrl2) {
    return false;
  }
  var isLinkType1Normal = !!inArray(linkType1, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]);
  var isLinkType2Normal = !!inArray(linkType2, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]);
  var isLinkType1Mobile = !!inArray(linkType1, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP);
  var isLinkType2Mobile = !!inArray(linkType2, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP);
  if (isLinkType1Normal !== isLinkType2Normal && isLinkType1Mobile !== isLinkType2Mobile) {
    return false;
  }
  return true;
}

AdsViewEditor.prototype.confirmLinkDomain = function() {
  this.params.link_domain_confirm.value = 1;
}

AdsViewEditor.prototype.confirmPromotedPost = function() {
  this.params.promoted_post_need_confirmation.value = 0;
}

AdsViewEditor.prototype.completeLink = function() {
  if (this.editor.isUpdatingData()) {
    return;
  }
  if (!this.params.link_type.complete) {
    return;
  }
  if (this.updateLinkDomainContext && this.updateLinkDomainContext.linkUrl) {
    return;
  }

  addClass(this.options.targetIdPrefix + 'link_object_complete', 'unshown');
  removeClass(this.options.targetIdPrefix + 'link_object_edit', 'unshown');
  //hide(this.options.targetIdPrefix + 'link_object_cancel');
  addClass(this.options.targetIdPrefix + 'link_object_cancel_link', 'unshown');
  addClass(this.options.targetIdPrefix + 'upload_video', 'button_disabled');
  removeClass('ads_edit_panels_not_link', 'unshown');

  var isChangedLinkType = (!this.params_old
    || !(this.params.link_type.value == this.params_old.link_type.value
      || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)      && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)
      || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)
    )
  );
  var isChangedAny = (!this.params_old
    || this.params.link_type.value     != this.params_old.link_type.value // No isChangedLinkType here
    || this.params.link_id.value       != this.params_old.link_id.value
    || this.params.link_owner_id.value != this.params_old.link_owner_id.value
    || this.params.link_url.value      != this.params_old.link_url.value
    || this.params.link_domain.value   != this.params_old.link_domain.value
  );
  var isChangedImportant = (!this.params_old
    || isChangedLinkType
    || this.params.link_id.value       != this.params_old.link_id.value && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP])
    || this.params.link_url.value      != this.params_old.link_url.value && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)
    || (this.params.link_id.value      != this.params_old.link_id.value || this.params.link_owner_id.value != this.params_old.link_owner_id.value) && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST
  );

  this.params.link_type.editing = false;

  if (this.params.link_type.allow_edit_all) {
    this.updateUiParam('link_type');
    this.updateUiParam('link_id');
  }
  this.updateUiParam('link_url');
  this.updateUiParam('link_domain');

  if (isChangedImportant) {
    this.params.link_id.app_rates_k = '';
    this.params.link_id.mobile_app_bottom_d = '';
    this.params.link_domain.value_p = '';
    this.params.link_domain.value_a = '';
    this.params.link_domain.value_k = '';
    this.params.link_domain.value_d = '';
    this.setTitle(this.params.title.value, false, '');

    this.setPhotoData('p');
    this.setPhotoData('a');
    this.setPhotoData('k');
    this.setPhotoData('i');

    this.params.format_type.hidden = !!(inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE, AdsEdit.ADS_AD_LINK_TYPE_POST]));
    this.updateUiParamVisibility('format_type');
    if (this.params.format_type.unreachable) {
      var formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE;
      switch (this.params.link_type.value) {
        case AdsEdit.ADS_AD_LINK_TYPE_VIDEO:
          formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE; break;
        case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID:
        case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE:
        case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE:
          formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE; break;
        case AdsEdit.ADS_AD_LINK_TYPE_POST:
          formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST; break;
      }
      this.setFormatType(formatTypeDefault);
    } else {
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
        this.setTitle(this.params.title.value_p);
        this.updateNeeded.need_format_promotion_community = true;
      }
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY) {
        this.setTitle(this.params.title.value_p);
        this.updateNeeded.need_format_promotion_community = true;
      }
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS) {
        this.setTitle(this.params.title.value_a);
        this.updateNeeded.need_format_app_in_news = true;
      }
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY) {
        this.setTitle(this.params.title.value_k);
        this.updateNeeded.need_format_apps_only = true;
      }
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) {
        this.setTitle(this.params.title.value_e);
        this.updateNeeded.need_format_big_app = true;
      }
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) {
        this.setTitle(this.params.title.value_d);
        this.updateNeeded.need_format_mobile = true;
      }
    }

    var oldGroupId = false;
    if (this.params_old && inArray(this.params_old.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC])) {
      oldGroupId = this.params_old.link_id.value;
    } else if (this.params_old && this.params_old.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) {
      oldGroupId = -this.params_old.link_owner_id.value;
    }
    if (!this.targetingEditor.criteria.groups_not.value || oldGroupId == this.targetingEditor.criteria.groups_not.value) {
      var selectedValue = false;
      if (inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC])) {
        selectedValue = this.params.link_id.value;
      } else if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST) {
        selectedValue = -this.params.link_owner_id.value;
      }

      this.targetingEditor.setAutoGroupsNotValue(selectedValue);
    }

    this.updateUiParam('platform');
    this.updateUiParam('cost_per_click');
    this.updateUiParamData('platform');
    this.updateUiParamVisibility('format_type');
    this.updateUiParamVisibility('description');
    this.updateUiParamVisibility('platform');
  }

  if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]
    || this.params_old && this.params_old.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params_old.link_id.value]
  ) {
    this.updateUiParam('category1_id');
    this.updateUiParam('category2_id');
    this.updateUiParamVisibility('category1_id');
    this.updateUiParamVisibility('category2_id');
    this.updateUiParamVisibility('subcategory1_id');
    this.updateUiParamVisibility('subcategory2_id');
  }

  if (this.params_old && this.params.link_type.value != this.params_old.link_type.value || !this.params_old) { // !this.params_old - because of there are may be predefined criteria
    this.targetingEditor.correctCriterion('user_devices');
    this.targetingEditor.correctCriterion('user_operating_systems');
    this.targetingEditor.correctCriterion('user_browsers');
    this.targetingEditor.correctCriterion('pays_money');
    this.targetingEditor.updateUiCriterionVisibility('user_devices');
    this.targetingEditor.updateUiCriterionVisibility('user_operating_systems');
    this.targetingEditor.updateUiCriterionVisibility('user_browsers');
    this.targetingEditor.updateUiCriterionVisibility('pays_money');
    this.targetingEditor.updateUiCriterionSelectedDataAll();
    AdsEdit.updateTargetingGroups();
  }

  if (isChangedAny) {
    this.updatePreview('layout');
    this.updatePreview('link');
    this.updatePreview('domain');
    this.updatePreview('play');
    this.updatePreview('description');
    this.updatePreview('community_join');
    this.updatePreview('app_rating');
    this.updatePreview('mobile_app_bottom');
    this.updatePreview('promoted_post');
    this.updatePreview('big_app_info_box');

    this.updateNeeded.need_link_object = true;
    this.needDataUpdate();
  }

  delete this.params_old;

  var ajaxParams = {};
  ajaxParams.hash = cur.collectClickStatHash;
  ajaxParams.action = 'select_ad_object';
  ajaxParams.format_type = this.params.format_type.value;
  ajax.post('/adsedit?act=collect_click_stat', ajaxParams);

  Ads.initFixed('ads_edit_audience_wrap');

  var scrollElem = ge('ads_param_link_type_wrap');
  var scrollY = getXY(scrollElem)[1] + getSize(scrollElem)[1];
  scrollToY(scrollY);
}

AdsViewEditor.prototype.editLink = function() {
  if (this.editor.isUpdatingData()) {
    return;
  }
  if (!this.params.link_type.allow_edit_all && !this.params.link_type.allow_edit_link) {
    return;
  }

  removeClass(this.options.targetIdPrefix + 'link_object_complete', 'unshown');
  addClass(this.options.targetIdPrefix + 'link_object_edit', 'unshown');
  //removeClass(this.options.targetIdPrefix + 'link_object_cancel', 'unshown');
  removeClass(this.options.targetIdPrefix + 'upload_video', 'button_disabled');
  addClass('ads_edit_panels_not_link', 'unshown');
  AdsEdit.hideErrors(true);

  this.params_old = {};
  this.params_old.link_type     = clone(this.params.link_type, true);
  this.params_old.link_id       = clone(this.params.link_id, true);
  this.params_old.link_owner_id = clone(this.params.link_owner_id, true);
  this.params_old.link_url      = clone(this.params.link_url, true);
  this.params_old.link_domain   = clone(this.params.link_domain, true);
  this.params_old.video_hash    = clone(this.params.video_hash, true);

  this.params.link_type.editing = true;

  if (this.params.link_type.allow_edit_all) {
    this.updateUiParam('link_type');
    this.updateUiParam('link_id');
  }
  this.updateUiParam('link_url');
  this.updateUiParam('link_domain');
}

AdsViewEditor.prototype.cancelLink = function() {
  if (this.editor.isUpdatingData()) {
    return;
  }
  if (this.updateLinkDomainContext && this.updateLinkDomainContext.linkUrl) {
    return;
  }

  addClass(this.options.targetIdPrefix + 'link_object_complete', 'unshown');
  removeClass(this.options.targetIdPrefix + 'link_object_edit', 'unshown');
  //hide(this.options.targetIdPrefix + 'link_object_cancel');
  addClass(this.options.targetIdPrefix + 'upload_video', 'button_disabled');
  removeClass('ads_edit_panels_not_link', 'unshown');

  this.params.link_type.editing = false;
  this.params.link_type.cancelling = true;

  if (this.params.link_type.allow_edit_all) {
    this.setLinkType(this.params_old.link_type.value);
    this.setLinkId(this.params_old.link_id.value, this.params_old.link_id.data)
  }
  this.setVideoData(this.params_old.link_id.video_value, this.params_old.link_owner_id.video_value, this.params_old.video_hash.value, this.params_old.link_url.video_preview_hash);
  this.onParamUpdate('link_url', this.params_old.link_url.value, false, true);
  this.updateUiParam('link_url');
  this.params.link_domain.link_url = this.params_old.link_domain.link_url;
  this.onParamUpdate('link_domain', this.params_old.link_domain.value, false, true);
  this.updateUiParam('link_domain');

  this.params.link_type.cancelling = false;
}

AdsViewEditor.prototype.getLink = function() {
  var link       = '';
  var linkUrl    = '';
  var linkPacked = '';
  var onclick    = '';
  var target     = '_blank'

  if (this.params.link_id.value) {
    switch (this.params.link_type.value) {
      case AdsEdit.ADS_AD_LINK_TYPE_GROUP:  linkUrl = '/club' + this.params.link_id.value + '?ad_id={ad_id}'; break;
      case AdsEdit.ADS_AD_LINK_TYPE_EVENT:  linkUrl = '/event' + this.params.link_id.value + '?ad_id={ad_id}'; break;
      case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC: linkUrl = '/public' + this.params.link_id.value + '?ad_id={ad_id}'; break;
      case AdsEdit.ADS_AD_LINK_TYPE_MARKET: linkUrl = '/market.php?act=view&id=' + this.params.link_id.value; break;
      case AdsEdit.ADS_AD_LINK_TYPE_APP:    linkUrl = '/app' + this.params.link_id.value + '?ad_id={ad_id}'; break;
      case AdsEdit.ADS_AD_LINK_TYPE_POST:   linkUrl = '/wall' + this.params.link_owner_id.value + '_' + this.params.link_id.value; break;
    }
  }
  if (inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE]) && this.getLinkInfo(this.params.link_url.value)) {
    linkUrl = this.params.link_url.value;
    if (linkUrl && !linkUrl.match(/^https?:\/\//)) {
      linkUrl = 'http://' + linkUrl;
    }
  }
  linkUrl = linkUrl.replace('{ad_id}', this.params.ad_id.value);
  linkUrl = linkUrl.replace('{campaign_id}', this.params.campaign_id.value);
  if (this.params.link_type.value != AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
    link = linkUrl;
  }
  if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO && this.params.link_id.value && this.params.link_owner_id.value && this.params.link_url.video_preview_hash) {
    var videoId = this.params.link_owner_id.value + '_' + this.params.link_id.value;
    var linkPacked = '';
    linkPacked += 'video=' + videoId;
    linkPacked += '&hash=' + encodeURIComponent(this.params.link_url.video_preview_hash);
    if (linkUrl) {
      linkPacked += '&link_url=' + encodeURIComponent(linkUrl);
    }
    if (this.params.link_domain.value) {
      linkPacked += '&link_domain=' + encodeURIComponent(this.params.link_domain.value);
    }
    linkPacked = encodeURIComponent(linkPacked);

    link = this.params.link_url.video_value;
    link += '?ad_video=' + encodeURIComponent(linkPacked);

    target = '_self';

    onclick = "var href_packed=this.getAttribute('href_packed'); return showVideo('', '', {autoplay: 1, ad_video: href_packed}, event);"
  }

  var result = {};
  result.link        = link;
  result.link_url    = linkUrl;
  result.link_packed = linkPacked;
  result.onclick     = onclick;
  result.target      = target;

  return result;
}

AdsViewEditor.prototype.updateLink = function(linkElem, link, link_packed, onclick, target) {
  if (link) {
    linkElem.setAttribute('href', link);
  } else {
    linkElem.removeAttribute('href');
  }
  if (link_packed) {
    linkElem.setAttribute('href_packed', link_packed);
  } else {
    linkElem.removeAttribute('href_packed');
  }
  if (onclick) {
    linkElem.setAttribute('onclick', onclick);
  } else {
    linkElem.removeAttribute('onclick');
  }
  linkElem.setAttribute('target', target);
}

AdsViewEditor.prototype.getPreviewDomain = function() {
  switch (this.params.format_type.value) {
    case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY: return this.params.link_domain.value_p;
    case AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY:         return this.params.link_domain.value_p;
    case AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS:         return this.params.link_domain.value_a;
    case AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY:           return this.params.link_domain.value_k;
    case AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE:              return this.params.link_domain.value_d;
  }

  switch (this.params.link_type.value) {
    case AdsEdit.ADS_AD_LINK_TYPE_GROUP:  return getLang('global_ad_link_type_group');
    case AdsEdit.ADS_AD_LINK_TYPE_EVENT:  return getLang('global_ad_link_type_event');
    case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC: return getLang('global_ad_link_type_public');
    case AdsEdit.ADS_AD_LINK_TYPE_MARKET: return getLang('global_ad_link_type_market');
    case AdsEdit.ADS_AD_LINK_TYPE_APP:    return getLang('global_ad_link_type_app');
    case AdsEdit.ADS_AD_LINK_TYPE_VIDEO:  return getLang('global_ad_link_type_video');
    case AdsEdit.ADS_AD_LINK_TYPE_URL:
      var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
      if (!linkUrlInfo) {
        return '';
      }
      var linkDomain = linkUrlInfo.domain;
      if (!linkDomain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/)) {
        var linkDomainInfo = this.getLinkInfo(this.params.link_domain.value_escaped);
        if (!linkDomainInfo) {
          return '';
        }
        linkDomain = linkDomainInfo.domain;
      }
      if (!linkDomain) {
        return '';
      }
      if (linkDomain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/)) {
        return getLang('global_ad_link_type_local');
      }
      return linkDomain;
    default: return '';
  }
}

AdsViewEditor.prototype.updatePreview = function(previewParamName) {
  switch (previewParamName) {
    case 'layout':
      var isAppInNews    = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS);
      var isAppsOnly     = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY);
      var isGroupsOnly   = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY);
      var isBigApp       = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);
      var isMobile       = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
      var isAndroid      = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID);
      var isIphone       = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE);
      var isWphone       = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE);
      var isPromotedPost = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST);
      var elems = geByClass('format_edit', this.preview[previewParamName]);
      elems.push(this.preview[previewParamName]);
      for (var i in elems) {
        toggleClass(elems[i], 'app_in_news',   !!isAppInNews);
        toggleClass(elems[i], 'apps_only',     !!isAppsOnly);
        toggleClass(elems[i], 'groups_only',   !!isGroupsOnly);
        toggleClass(elems[i], 'big_app',       !!isBigApp);
        toggleClass(elems[i], 'mobile',        !!isMobile);
        toggleClass(elems[i], 'android',       !!isAndroid);
        toggleClass(elems[i], 'iphone',        !!(isIphone || isWphone)); // isWphone - temporary
        toggleClass(elems[i], 'promoted_post', !!isPromotedPost);
      }
      var titlePlaceElem       = (isBigApp ? this.preview.title_big_app : this.preview.title_regular);
      var descriptionPlaceElem = ((isMobile) ? this.preview.description_up : (isBigApp ? this.preview.description_big_app : this.preview.description_down));
      var photoBoxPlaceElem    = ((isAppInNews || isAppsOnly || isGroupsOnly) ? this.preview.photo_box_hor : this.preview.photo_box_ver);
      var domainPlaceElem      = ((isAppInNews || isAppsOnly || isGroupsOnly) ? this.preview.domain_out    : this.preview.domain_ver);
      var disclaimersPlaceElem = (isGroupsOnly ? this.preview.disclaimers_photo : this.preview.disclaimers_bottom);
      titlePlaceElem.parentNode.insertBefore(this.preview.title_box, titlePlaceElem);
      descriptionPlaceElem.parentNode.insertBefore(this.preview.description, descriptionPlaceElem);
      photoBoxPlaceElem.parentNode.insertBefore(this.preview.photo_box, photoBoxPlaceElem);
      domainPlaceElem.parentNode.insertBefore(this.preview.domain, domainPlaceElem);
      disclaimersPlaceElem.parentNode.insertBefore(this.preview.disclaimers, disclaimersPlaceElem);
      break;
    case 'link':
      var linkResult = this.getLink();
      this.updateLink(this.preview[previewParamName], linkResult.link, linkResult.link_packed, linkResult.onclick, linkResult.target);
      break;
    case 'title':
      this.preview[previewParamName].innerHTML = (this.params.title.value_escaped || this.params.title.value_default);
      break;
    case 'description':
      this.preview[previewParamName].innerHTML = (this.params.description.value_escaped || this.params.description.value_default);
      toggle(this.preview[previewParamName], !!inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP]));
      break;
    case 'community_join':
      var isAppGame = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]);
      if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY && this.params.link_type.value != 0) {
        switch (this.params.link_type.value) {
           case AdsEdit.ADS_AD_LINK_TYPE_GROUP:  this.preview[previewParamName].innerHTML = getLang('global_group_join'); break;
           case AdsEdit.ADS_AD_LINK_TYPE_EVENT:  this.preview[previewParamName].innerHTML = getLang('global_event_join'); break;
           case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC: this.preview[previewParamName].innerHTML = getLang('global_public_join'); break;
           case AdsEdit.ADS_AD_LINK_TYPE_APP:    this.preview[previewParamName].innerHTML = (isAppGame ? getLang('global_app_game_join') : getLang('global_app_join')); break;
           default: this.preview[previewParamName].innerHTML = ''; break;
        }
        show(this.preview[previewParamName]);
      } else {
        hide(this.preview[previewParamName]);
      }
      break;
    case 'app_rating':
      this.preview[previewParamName].innerHTML = this.params.link_id.app_rates_k;
      break;
    case 'mobile_app_bottom':
      this.preview[previewParamName].innerHTML = this.params.link_id.mobile_app_bottom_d;
      break;
    case 'disclaimer_medical':
      toggle(this.preview[previewParamName], !!(this.params.disclaimer_medical.value));
      break;
    case 'disclaimer_specialist':
      toggle(this.preview[previewParamName], !!(this.params.disclaimer_specialist.value));
      break;
    case 'disclaimer_supplements':
      toggle(this.preview[previewParamName], !!(this.params.disclaimer_supplements.value));
      break;
    case 'age_restriction':
      var isMobile    = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
      if (isMobile) {
        hide(this.preview[previewParamName]);
      } else {
        this.preview[previewParamName].innerHTML = this.getAgeRestrictionText(this.params.age_restriction.value);
        toggle(this.preview[previewParamName], !!(this.params.age_restriction.value));
      }
      break;
    case 'disclaimers':
      var isDisclaimersAllowed = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY]);
      toggle(this.preview.disclaimers, isDisclaimersAllowed && (!!(this.params.disclaimer_medical.value) || !!(this.params.disclaimer_specialist.value) || !!(this.params.disclaimer_supplements.value)));
      break;
    case 'domain':
      var domainValue = this.getPreviewDomain();
      var isMobile    = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
      var isBigApp    = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);
      if (isMobile && this.params.age_restriction.value) {
        domainValue += ' ' + this.getAgeRestrictionText(this.params.age_restriction.value);
      }
      this.preview[previewParamName].innerHTML = domainValue;
      toggle(this.preview[previewParamName], !!(domainValue && !isBigApp));
      break;
    case 'photo':
      if (this.params.photo.value && this.params.photo_link.value) {
        this.preview[previewParamName].src = this.params.photo_link.value;
      } else {
        var photoSize = this.getPhotoSize();
        var photoLinkSuffix = '';
        if (photoSize === 'p' && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP) {
          photoLinkSuffix = '_app';
        } else if (photoSize === 'k' && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
          photoLinkSuffix = '_group';
        }
        var specialValue = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) ? 'value_empty_' : 'value_default_') + photoSize + photoLinkSuffix;
        this.preview[previewParamName].src = this.params.photo_link[specialValue] || '';
      }
      toggleClass(this.preview.photo_box, 'promotion', !!(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY));
      break;
    case 'photo_icon':
      this.preview[previewParamName].src = (this.params.photo.value_i ? this.params.photo_link.value_i : this.params.photo_link.value_default_i);
      break;
    case 'play':
      toggleClass(this.preview[previewParamName], 'unshown', !(this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO));
      toggleClass(this.preview[previewParamName], 'empty', !!(!this.params.link_id.value || !this.params.link_owner_id.value));
      toggleClass(this.preview[previewParamName], 'big', !!(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE));
      break;
    case 'promoted_post':
      if (this.params.link_id.promoted_post_text) {
        var targetElem;
        targetElem = geByClass1('wall_module', this.preview[previewParamName]);
        cleanElems(targetElem);

        this.preview[previewParamName].innerHTML = this.params.link_id.promoted_post_text;
        this.params.link_id.promoted_post_text = '';

        targetElem = geByClass1('wall_module', this.preview[previewParamName]);
        AdsLight.overrideClickEvents(targetElem, true);
      }
      break;
    case 'big_app_info_box':
      var isBigApp = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);
      toggle(this.preview.big_app_info_box, !!isBigApp);
      break;
  }
}

AdsViewEditor.prototype.updateTips = function() {
  if (this.params.campaign_type.allow_special_app) {
    var isAppCampaign  = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || (this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app));
    var isAppAdminLink = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_admin_links_ids[this.params.link_id.value]);
    toggle('ads_param_campaign_tip_app_only', !!(isAppCampaign));
    toggle('ads_param_campaign_tip_no_app_bonus', !!(isAppAdminLink && !isAppCampaign && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS));
    //toggle('ads_param_link_apps_tip', !!(isAppAdminLink && isAppCampaign));
  }
}

AdsViewEditor.prototype.showMoreCategories = function() {
  hide('ads_param_category_more');
  this.params.category2_id.hidden_normal    = false;
  this.params.subcategory2_id.hidden_normal = false;
  this.updateUiParamVisibility('category2_id');
  this.updateUiParamVisibility('subcategory2_id');
}

AdsViewEditor.prototype.showLinkObjectPanel = function(delayed) {
  if (!delayed) {
    setTimeout(this.showLinkObjectPanel.bind(this, true), 1);
    return;
  }
  var panelElem = ge('ads_edit_panel_link_object')
  if (!isVisible(panelElem)) {
    slideDown(panelElem, 200);
  }
}

AdsViewEditor.prototype.ignoreSpellingMessage = function(section, hash) {
  if (!this.ignoreSpellingMessageHashes[section]) {
    this.ignoreSpellingMessageHashes[section] = [];
  }
  this.ignoreSpellingMessageHashes[section].push(hash);
  if (section == 'title') {
    this.params.title_spelling = 'ok';
    this.updateUiParam('title');
    ge('ads_param_title').focus();
  } else if (section == 'description') {
    this.params.description_spelling = 'ok';
    this.updateUiParam('description');
    ge('ads_param_description').focus();
  }
}

AdsViewEditor.prototype.getAgeRestrictionText = function(ageRestriction) {
  var ageRestrictionData = this.params.age_restriction.data;
  for (var i in ageRestrictionData) {
    if (ageRestrictionData[i][0] == ageRestriction) {
      return ageRestrictionData[i][1];
    }
  }
  return '';
}

//
// AdsTargetingEditor
//

function AdsTargetingEditor() {}
AdsTargetingEditor.prototype.init = function(options, editor, viewEditor, criteria, criteriaData, criteriaRanges, criteriaParams, targetingGroups) {

  this.editor = editor;
  this.viewEditor = viewEditor;

  this.options = {
    targetIdPrefix: 'ads_targeting_criterion_',
    uiWidth: 320 + 8,
    uiHeight: 250,
    uiWidthRange: 151 + 8,
    uiHeightRange: 190,
    uiMaxSelected: 25
  };

  this.options = extend({}, this.options, options);

  // defaultData exists if data may be not equal defaultData
  this.criteria = {
    country:                {value: 0,  data: []},
    cities:                 {value: '', data: [], defaultData: [], selectedData: []},
    cities_not:             {value: '', data: [],                  selectedData: []},

    sex:                    {value: 0,  data: []},
    age_from:               {value: 0,  data: []},
    age_to:                 {value: 0,  data: []},
    birthday:               {value: 0},
    statuses:               {value: '', data: []},

    interests:              {value: '', data: [], defaultData: []},
    interest_categories:    {value: '', data: []},
    group_types:            {value: '', data: []},
    groups:                 {value: '', data: [], defaultData: [], selectedData: [], defaultDataOriginal: [], link_object_id: 0, link_object_item: null, link_object_processed: true},
    groups_not:             {value: '', data: [],                  selectedData: [] },
    apps:                   {value: '', data: [], defaultData: [], selectedData: [], defaultDataOriginal: [], link_object_id: 0, link_object_item: null, link_object_processed: true},
    apps_not:               {value: '', data: [],                  selectedData: []},
    religions:              {value: '', data: []},
    travellers:             {value: 0},

    districts:              {value: '', data: [],                  selectedData: [], dataInited: true}, // No default data to allow autocomplete by data
    stations:               {value: '', data: [],                  selectedData: [], dataInited: true}, // No default data to allow autocomplete by data
    streets:                {value: '', data: [],                  selectedData: []}, // No default data at all

    schools_type:           {value: 0},
    schools:                {value: '', data: [],                  selectedData: []}, // No default data at all
    school_from:            {value: 0,  data: []},
    school_to:              {value: 0,  data: []},
    uni_from:               {value: 0,  data: []},
    uni_to:                 {value: 0,  data: []},
    positions:              {value: '', data: [], defaultData: [], selectedData: []},

    operators:              {value: '', data: [], defaultData: [], selectedData: []},
    browsers:               {value: '', data: []},
    user_devices:           {value: '', data: []},
    user_operating_systems: {value: '', data: []},
    user_browsers:          {value: '', data: []},
    pays_money:             {value: 0,  data: []},
    retargeting_groups:     {value: '', data: []},
    retargeting_groups_not: {value: '', data: []},
    tags:                   {value: ''}
  };

  this.updateNeeded = {};

  if (criteria) for (var i in criteria) {
    if (criteria[i] && (i in this.criteria)) {
      var newCriterionValue = criteria[i];
      if (typeof(this.criteria[i].value) === 'number') {
        newCriterionValue = intval(newCriterionValue);
      }
      if (i === 'tags') {
        newCriterionValue = AdsEdit.unescapeValueInit(newCriterionValue);
      }
      this.criteria[i].value = newCriterionValue;
    }
  }

  if (criteriaData) {
    if (criteriaData.data) for (var i in criteriaData.data) {
      if (criteriaData.data[i] && (i in this.criteria) && ('data' in this.criteria[i])) {
        this.criteria[i].data = criteriaData.data[i];
      }
    }
    if (criteriaData.defaultData) for (var i in criteriaData.defaultData) {
      if (criteriaData.defaultData[i] && (i in this.criteria) && ('defaultData' in this.criteria[i])) {
        this.criteria[i].defaultData = criteriaData.defaultData[i];
      }
    }
    if (criteriaData.selectedData) for (var i in criteriaData.selectedData) {
      if (criteriaData.selectedData[i] && (i in this.criteria) && ('selectedData' in this.criteria[i])) {
        this.criteria[i].selectedData = criteriaData.selectedData[i];
      }
    }
  }

  if (criteriaParams) for (var i in criteriaParams) {
    if (criteriaParams[i] && (i in this.criteria)) {
      this.criteria[i] = extend({}, this.criteria[i], criteriaParams[i]);
    }
  }

  {
    this.criteria.groups.defaultDataOriginal = this.criteria.groups.defaultData;
    this.criteria.apps.defaultDataOriginal   = this.criteria.apps.defaultData;
  }

  this.criteriaRanges = criteriaRanges;
  this.targetingGroups = targetingGroups;

  this.interestingEvents = 'keydown keyup keypress change paste cut drop input blur';

  this.cur = {destroy: []};

  this.initHelp();
  this.initUi();
}

AdsTargetingEditor.prototype.destroy = function() {
  processDestroy(this.cur);
}

AdsTargetingEditor.prototype.initHelp = function() {
  for (var criterionName in this.criteria) {
    this.initHelpCriterion(criterionName);
  }
}

AdsTargetingEditor.prototype.initHelpCriterion = function(criterionName) {
  if (!cur.targetingCriteriaHelp) {
    return;
  }
  var helpText = cur.targetingCriteriaHelp[criterionName];
  if (!helpText) {
    return;
  }

  var targetElem;
  var handler;
  var context = {focus: false, over: 0, out: 2};
  var shiftTop;

  switch (criterionName) {
    case 'travellers': shiftTop = -52; break;
    case 'positions':  shiftTop = -44; break;
    case 'pays_money': shiftTop = -44; break;
    case 'tags':       shiftTop = -96; break;
  }

  switch (criterionName) {
    case 'cities':
    case 'interest_categories':
    case 'interests':
    case 'group_types':
    case 'travellers':
    case 'schools':
    case 'positions':
    case 'browsers':
    case 'pays_money':
    case 'retargeting_groups':
    case 'tags':
      targetElem = ge(this.options.targetIdPrefix + criterionName).parentNode;
      var showTooltip = function() { AdsEdit.showHelpCriterionTooltip(criterionName, targetElem, handler, this.criteria[criterionName], helpText, false, shiftTop, this.cur); }.bind(this);
      var hideTooltip = function() { AdsEdit.hideHelpTooltip(this.criteria[criterionName].tt); }.bind(this);
      handler = function(event){ AdsEdit.onHelpTooltipEvent(event, criterionName, context, showTooltip, hideTooltip); }.bind(this);
      AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
      break;
  }
}

AdsTargetingEditor.prototype.initUi = function() {
  for (var groupName in this.targetingGroups) {
    var group = this.targetingGroups[groupName];
    if (group.hidden) {
      continue;
    }
    this.showGroup(groupName);
  }
}

AdsTargetingEditor.prototype.initUiGroup = function(groupName) {

  if (!this.targetingGroups[groupName] || this.targetingGroups[groupName].uiInited) {
    return;
  }

  var targetElem;

  switch (groupName) {
    case 'geography':
    case 'interests':
      if (this.targetingGroups[groupName].criteria_more) {
        targetElem = ge('ads_edit_targeting_group_' + groupName + '_more_link');
        addEvent(targetElem, 'click keypress', function(event) { return this.onUiEvent('group_' + groupName + '_more', event); }.bind(this));
        this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      }
      if (this.targetingGroups[groupName].criteria_less) {
        targetElem = ge('ads_edit_targeting_group_' + groupName + '_less_link');
        addEvent(targetElem, 'click keypress', function(event) { return this.onUiEvent('group_' + groupName + '_less', event); }.bind(this));
        this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      }
      break;
  }

  this.targetingGroups[groupName].uiInited = true;
}

AdsTargetingEditor.prototype.initUiCriterion = function(criterionName) {

  //debugLog('Targeting: Try init UI ' + criterionName);

  if (!this.criteria[criterionName] || this.criteria[criterionName].uiInited || this.criteria[criterionName].uiInited === false) {
    return;
  }

  if (this.criteria[criterionName].hidden) {
    return;
  }

  var targetElem;

  // Hide not allowed criteria
  var visible = this.getUiCriterionVisibility(criterionName, true);
  if (visible === false) {
    return;
  }

  this.criteria[criterionName].uiInited = false;

  // Init UI controls which do not change criteria
  switch (criterionName) {
  }

  // Init UI control
  switch (criterionName) {
    // Dropdowns
    case 'country':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      targetElem.removeAttribute('autocomplete');
      this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
        selectedItem: this.getUiCriterionSelectedData(criterionName),
        defaultItems: this.getUiCriterionDefaultData(criterionName),
        big:          true,
        autocomplete: true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(criterionName, value); }.bind(this)
      });
      this.updateUiCriterionEnabled(criterionName);
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui.destroy(); }.bind(this));
      break;
    case 'pays_money':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      targetElem.removeAttribute('autocomplete');
      this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
        selectedItem: this.getUiCriterionSelectedData(criterionName),
        big:          true,
        width:        this.options.uiWidth,
        onChange:     function(value) { this.onUiChange(criterionName, value); }.bind(this)
      });
      this.updateUiCriterionEnabled(criterionName);
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui.destroy(); }.bind(this));
      break;
    case 'age_from':
    case 'age_to':
    case 'school_from':
    case 'school_to':
    case 'uni_from':
    case 'uni_to':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      targetElem.removeAttribute('autocomplete');
      this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
        selectedItem: this.getUiCriterionSelectedData(criterionName),
        big:             true,
        zeroPlaceholder: true,
        width:           this.options.uiWidthRange,
        height:          this.options.uiHeightRange,
        onChange:        function(value) { this.onUiChange(criterionName, value); }.bind(this)
      });
      this.updateUiCriterionEnabled(criterionName);
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui.destroy(); }.bind(this));
      break;
    case 'cities':
    case 'cities_not':
    case 'statuses':
    case 'interests':
    case 'interest_categories':
    case 'group_types':
    case 'groups':
    case 'groups_not':
    case 'apps':
    case 'apps_not':
    case 'religions':
    case 'districts':
    case 'stations':
    case 'streets':
    case 'schools':
    case 'positions':
    case 'operators':
    case 'browsers':
    case 'user_devices':
    case 'user_operating_systems':
    case 'user_browsers':
    case 'retargeting_groups':
    case 'retargeting_groups_not':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      targetElem.removeAttribute('autocomplete');
      this.criteria[criterionName].ui = new Autocomplete(targetElem, this.getUiCriterionData(criterionName), {
        defaultItems:  this.getUiCriterionDefaultData(criterionName),
        selectedItems: this.getUiCriterionSelectedData(criterionName),

        introText:     this.getUiCriterionIntroText(criterionName),
        placeholder:   this.getUiCriterionPlaceholderText(criterionName),
        noResult:      this.getUiCriterionNoResultText(criterionName),
        disabledText:  this.getUiCriterionDisabledText(criterionName),

        dropdown:      true,
        big:           true,
        withIcons:     inArray(criterionName, ['groups', 'groups_not', 'apps', 'apps_not']),
        maxItems:      this.options.uiMaxSelected,
        width:         this.options.uiWidth,
        height:        this.options.uiHeight,

        onTagAdd:      function(tag, value) { this.onUiTagAdd(criterionName, value, tag); }.bind(this),
        onTagRemove:   function(tag, value) { this.onUiTagRemove(criterionName, value, tag); }.bind(this)
      });
      this.updateUiCriterionEnabled(criterionName);
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui.destroy(); }.bind(this));
      break;
    // Radiobuttons
    case 'sex':
      targetElem = ge(this.options.targetIdPrefix + criterionName + '_any');
      this.criteria[criterionName].ui_any = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('search_adv_any_sex'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_any.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + criterionName + '_male');
      this.criteria[criterionName].ui_male = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('Sex_m'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_male.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + criterionName + '_female');
      this.criteria[criterionName].ui_female = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('Sex_fm'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_female.destroy(); }.bind(this));

      Radiobutton.select(this.options.targetIdPrefix + criterionName, this.criteria[criterionName].value);
      break;
    case 'schools_type':
      targetElem = ge(this.options.targetIdPrefix + criterionName + '_any');
      this.criteria[criterionName].ui_any = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_schools_type_any'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_any.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + criterionName + '_school');
      this.criteria[criterionName].ui_school = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_schools_type_school'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_school.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + criterionName + '_uni');
      this.criteria[criterionName].ui_uni = new Radiobutton(targetElem, {
        width:    this.options.uiWidth,
        label:    getLang('ads_schools_type_university'),
        onSelect: function(value) { this.onUiSelect(criterionName, value) }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_uni.destroy(); }.bind(this));

      Radiobutton.select(this.options.targetIdPrefix + criterionName, this.criteria[criterionName].value);
      break;
    // Checkboxes
    case 'birthday':
      var labelToday    = this.criteria.birthday.label_checkbox_today;
      var labelTomorrow = this.criteria.birthday.label_checkbox_tomorrow;
      var labelWeek     = this.criteria.birthday.label_checkbox_week;
      var widthToday    = AdsEdit.getTextWidth(labelToday);
      var widthTomorrow = AdsEdit.getTextWidth(labelTomorrow);
      var widthWeek     = AdsEdit.getTextWidth(labelWeek);
      var widthMore     = Math.floor((this.options.uiWidth - (widthToday + widthTomorrow + widthWeek)) / 3);
      widthToday       += widthMore;
      widthTomorrow    += widthMore;
      widthWeek        += widthMore;

      var isCheckedToday   = !!(this.criteria.birthday.value & (1 << 0));
      var isCheckedTmorrow = !!(this.criteria.birthday.value & (1 << 1));
      var isCheckedWeek    = !!(this.criteria.birthday.value & (1 << 2));

      targetElem = ge(this.options.targetIdPrefix + 'birthday_today');
      this.criteria.birthday.ui_today = new Checkbox(targetElem, {
        label:    labelToday,
        checked:  isCheckedToday,
        width:    widthToday,
        onChange: function(state) { this.onUiChange('birthday_today', state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_today.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'birthday_tomorrow');
      this.criteria.birthday.ui_tomorrow = new Checkbox(targetElem, {
        label:    labelTomorrow,
        checked:  isCheckedTmorrow,
        width:    widthTomorrow,
        onChange: function(state) { this.onUiChange('birthday_tomorrow', state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_tomorrow.destroy(); }.bind(this));

      targetElem = ge(this.options.targetIdPrefix + 'birthday_week');
      this.criteria.birthday.ui_week = new Checkbox(targetElem, {
        label:    labelWeek,
        checked:  isCheckedWeek,
        width:    widthWeek,
        onChange: function(state) { this.onUiChange('birthday_week', state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui_week.destroy(); }.bind(this));

      if (isCheckedWeek) {
        this.criteria[criterionName].ui_today.disable(true);
        this.criteria[criterionName].ui_tomorrow.disable(true);
      }
      break;
    case 'travellers':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      this.criteria[criterionName].ui = new Checkbox(targetElem, {
        label:    this.criteria.travellers.label_checkbox,
        checked:  this.criteria.travellers.value,
        width:    this.options.uiWidth,
        onChange: function(state) { this.onUiChange(criterionName, state); }.bind(this)
      });
      this.cur.destroy.push(function(){ this.criteria[criterionName].ui.destroy(); }.bind(this));
      break;
    // Inputs
    case 'tags':
      targetElem = ge(this.options.targetIdPrefix + criterionName);
      addEvent(targetElem, this.interestingEvents, function(event) { return this.onUiEvent(criterionName, event); }.bind(this));
      this.cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
      break;
  }

  this.criteria[criterionName].uiInited = true;
  //debugLog('Targeting: ' + criterionName + ' UI inited');
}

AdsTargetingEditor.prototype.getUiCriterionData = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not':
      if (this.criteria.country.value) {
        return '/select.php?act=acity&autocomplete=1&show_regions=1&country=' + this.criteria.country.value;
      } else {
        return [];
      }
    case 'interests':
      return '/select.php?act=ainterests';
    case 'groups':
    case 'groups_not':
      return '/adsedit?act=search_user_objects&section=groups';
    case 'apps':
    case 'apps_not':
      return '/adsedit?act=search_user_objects&section=apps&apps_sites=1&apps_sdk=1';
    case 'streets':
      var citiesOnlyIds = this.getCitiesOnly();
      if (citiesOnlyIds) {
        return '/select.php?act=astreets&cities=' + escape(citiesOnlyIds);
      } else {
        return [];
      }
    case 'schools':
      var citiesOnlyIds = this.getCitiesOnly();
      if (citiesOnlyIds) {
        return '/select.php?act=aschools&cities=' + escape(citiesOnlyIds) + '&schools_type=' + this.criteria.schools_type.value;
      } else {
        return [];
      }
    case 'positions':
      return '/select.php?act=apositions';
    case 'age_from':
      var ageFromMax = (this.criteria.age_to.value || this.criteriaRanges.age_max);
      return this.getUiCriterionDataRange(this.criteriaRanges.age_min, ageFromMax, 1, getLang('ads_age_from'), getLang('ads_age_any'));
    case 'age_to':
      var ageToMin = (this.criteria.age_from.value || this.criteriaRanges.age_min);
      return this.getUiCriterionDataRange(ageToMin, this.criteriaRanges.age_max, 1, getLang('ads_age_to'), getLang('ads_age_any'));
    case 'school_from':
      var schoolFromMax = (this.criteria.school_to.value || this.criteriaRanges.school_max);
      return this.getUiCriterionDataRange(this.criteriaRanges.school_min, schoolFromMax, -1, getLang('ads_school_from'), getLang('ads_school_from_placeholder'));
    case 'school_to':
      var schoolToMin = (this.criteria.school_from.value || this.criteriaRanges.school_min);
      return this.getUiCriterionDataRange(schoolToMin, this.criteriaRanges.school_max, -1, getLang('ads_school_to'), getLang('ads_school_to_placeholder'));
    case 'uni_from':
      var uniFromMax = (this.criteria.uni_to.value || this.criteriaRanges.uni_max);
      return this.getUiCriterionDataRange(this.criteriaRanges.uni_min, uniFromMax, -1, getLang('ads_uni_from'), getLang('ads_uni_from_placeholder'));
    case 'uni_to':
      var uniToMin = (this.criteria.uni_from.value || this.criteriaRanges.uni_min);
      return this.getUiCriterionDataRange(uniToMin, this.criteriaRanges.uni_max, -1, getLang('ads_uni_to'), getLang('ads_uni_to_placeholder'));
    case 'statuses':
      return ((this.criteria.sex.value == 1) ? this.criteria.statuses.data.female : this.criteria.statuses.data.male);
    default:
      return this.criteria[criterionName].data || [];
  }
}

AdsTargetingEditor.prototype.updateUiCriterionData = function(criterionName) {
  if (!('data' in this.criteria[criterionName])) {
    try { console.error("Can't update data"); } catch (e) {}
    return;
  }

  if (!this.criteria[criterionName].ui) {
    return;
  }

  var data = this.getUiCriterionData(criterionName);
  if (typeof(data) === 'string') {
    this.criteria[criterionName].ui.setURL(data);
  } else {
    this.criteria[criterionName].ui.setData(data);
  }
}

AdsTargetingEditor.prototype.getUiCriterionDataRange = function(min, max, step, langValue, langValueAny) {
  if (min > max) return [];
  var data = [[0, langValueAny]];
  if (step < 0) {
    for (var i = max; i >= min; i += step)
    data.push([i, langNumeric(i, langValue)]);
  } else if (step > 0) {
    for (var i = min; i <= max; i += step)
    data.push([i, langNumeric(i, langValue)]);
  }
  return data;
}

AdsTargetingEditor.prototype.getUiCriterionDefaultData = function(criterionName) {
  switch (criterionName) {
    case 'groups':
    case 'apps':
      if (!this.criteria[criterionName].link_object_processed) {
        var defaultDataNew = [];
        if (this.criteria[criterionName].link_object_id) {
          var defaultDataCount = this.criteria[criterionName].defaultDataOriginal.length;
          var i = 0;
          var found = false;
          for ( ; i < defaultDataCount; i++) {
            var item = this.criteria[criterionName].defaultDataOriginal[i];
            if (item[0] == this.criteria[criterionName].link_object_id) {
              found = true;
              break;
            }
          }
          if (found) {
            if (i > 0) {
              defaultDataNew = defaultDataNew.concat(this.criteria[criterionName].defaultDataOriginal.slice(0, i));
            }
            if (i < defaultDataCount) {
              defaultDataNew = defaultDataNew.concat(this.criteria[criterionName].defaultDataOriginal.slice(i + 1, defaultDataCount));
            }
          } else {
            defaultDataNew = this.criteria[criterionName].defaultDataOriginal.slice();
          }
          defaultDataNew.unshift(this.criteria[criterionName].link_object_item);
        } else {
          defaultDataNew = this.criteria[criterionName].defaultDataOriginal.slice();
        }
        this.criteria[criterionName].link_object_processed = true;
        this.criteria[criterionName].defaultData = defaultDataNew;
      }
      break;
  }

  switch (criterionName) {
    case 'cities_not':
      return this.criteria['cities'].defaultData || [];
    case 'groups_not':
      return this.criteria['groups'].defaultData || [];
    case 'apps_not':
      return this.criteria['apps'].defaultData || [];
    case 'retargeting_groups_not':
      return this.criteria['retargeting_groups'].data || [];
    case 'country':
    case 'statuses':
    case 'interest_categories':
    case 'group_types':
    case 'religions':
    case 'districts':
    case 'stations':
    case 'streets':
    case 'schools':
    case 'operators':
    case 'browsers':
    case 'user_devices':
    case 'user_operating_systems':
    case 'user_browsers':
    case 'pays_money':
    case 'retargeting_groups':
      return this.criteria[criterionName].data || [];
    default:
      return this.criteria[criterionName].defaultData || [];
  }
}

AdsTargetingEditor.prototype.updateUiCriterionDefaultData = function(criterionName) {
  if (!('data' in this.criteria[criterionName])) { // No 'defaultData' here
    try { console.error("Can't update default data"); } catch (e) {}
    return;
  }

  if (!this.criteria[criterionName].ui) {
    return;
  }

  var defaultData = this.getUiCriterionDefaultData(criterionName);
  this.criteria[criterionName].ui.setOptions({defaultItems: defaultData});
}

AdsTargetingEditor.prototype.getUiCriterionSelectedData = function(criterionName) {
  switch (criterionName) {
    case 'country':
      return this.criteria[criterionName].value || 0;
    case 'statuses':
      return this.criteria[criterionName].value + '';
    default:
      if ('selectedData' in this.criteria[criterionName]) {
        return this.criteria[criterionName].selectedData || [];
      } else {
        return this.criteria[criterionName].value;
      }
  }
}

AdsTargetingEditor.prototype.updateUiCriterionSelectedData = function(criterionName, noError) {
  if (!('data' in this.criteria[criterionName])) {
    if (!noError) {
      try { console.error("Can't update selected data"); } catch (e) {}
    }
    return;
  }

  if (!this.criteria[criterionName].ui) {
    return;
  }

  var value = this.criteria[criterionName].value;
  if (!value) {
    return;
  }

  var selectedItems;
  if ('selectedData' in this.criteria[criterionName]) {
    selectedItems = this.criteria[criterionName].selectedData;
  } else {
    selectedItems = value.toString().split(',');
  }

  this.criteria[criterionName].ui.clear();
  each(selectedItems, function(key, value) {
    this.criteria[criterionName].ui.selectItem(value);
  }.bind(this));
}

AdsTargetingEditor.prototype.updateUiCriterionSelectedDataAll = function() {
  for (var criterionName in this.criteria) {
    this.updateUiCriterionSelectedData(criterionName, true);
  }
}

AdsTargetingEditor.prototype.getUiCriterionEnabled = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not':
      return !!(this.criteria.country.value || this.criteria[criterionName].value);
    case 'districts':
    case 'stations':
      var citiesOnlyIds = this.getCitiesOnly();
      return !!(citiesOnlyIds && this.criteria[criterionName].data.length || this.criteria[criterionName].value);
    case 'streets':
    case 'schools':
      var citiesOnlyIds = this.getCitiesOnly();
      return !!(citiesOnlyIds || this.criteria[criterionName].value);
    default:
      return null;
  }
}

AdsTargetingEditor.prototype.updateUiCriterionEnabled = function(criterionName) {
  if (!('data' in this.criteria[criterionName])) {
    try { console.error("Can't update enabled state"); } catch (e) {}
    return;
  }

  this.updateUiCriterionVisibility(criterionName); // Should be before any ui.disable()

  if (this.criteria[criterionName].ui) {
    var enabled = this.getUiCriterionEnabled(criterionName);
    if (enabled !== null) {
      if (!this.criteria[criterionName].value) {
        this.criteria[criterionName].ui.disable(enabled); // Fix disabling introText
        this.criteria[criterionName].ui.disable(!enabled);
        this.criteria[criterionName].ui.clear(); // Fix placeholder
      }
    }
  }
}

AdsTargetingEditor.prototype.getUiCriterionVisibility = function(criterionName, checkCriterionValue) {

  checkCriterionValue = !!checkCriterionValue;

  var visible = null;
  if (visible !== false && 'allowed' in this.criteria[criterionName]) {
    visible = !!(this.criteria[criterionName].allowed);
  }
  if (visible !== false && 'hidden_more' in this.criteria[criterionName]) {
    visible = !!(!this.criteria[criterionName].hidden_more);
  }

  if (visible !== false) {
    switch (criterionName) {
      case 'districts':
      case 'stations':
        var citiesOnlyIds = this.getCitiesOnly();
        visible = !!(!citiesOnlyIds || this.criteria[criterionName].data.length);
        break;
      case 'schools':
        visible = !!(this.criteria.schools_type.value);
        break;
      case 'school_from':
      case 'school_to':
        visible = !!(this.criteria.schools_type.value == 1);
        break;
      case 'uni_from':
      case 'uni_to':
        visible = !!(this.criteria.schools_type.value == 2);
        break;
      case 'user_devices':
      case 'user_operating_systems':
      case 'user_browsers':
        var viewParams = this.viewEditor.getParams();
        visible = !(inArray(viewParams.link_type, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP));
        break;
      case 'pays_money':
        var viewParams = this.viewEditor.getParams();
        visible = !!(this.criteria[criterionName].allowed_any || viewParams.link_type == AdsEdit.ADS_AD_LINK_TYPE_APP);
        break;
    }
  }

  if (visible === false && checkCriterionValue) {
    visible = !!(this.criteria[criterionName].value);
  }

  return visible;
}

AdsTargetingEditor.prototype.updateUiCriterionVisibility = function(criterionName) {

  var visible = this.getUiCriterionVisibility(criterionName, true);
  if (visible === null) {
    return;
  }

  this.criteria[criterionName].hidden = !visible;

  var rowName = (this.criteria[criterionName].row_name ? this.criteria[criterionName].row_name : criterionName);

  if (visible) {
    this.initUiCriterion(criterionName);
    removeClass('ads_edit_criterion_row_' + rowName, 'unshown');
  } else if (!('dataInited' in this.criteria[criterionName]) || this.criteria[criterionName].dataInited) {
    addClass('ads_edit_criterion_row_' + rowName, 'unshown');
  }
}

AdsTargetingEditor.prototype.getUiCriterionIntroText = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not':          return getLang('ads_starttypingname_city_region');
    case 'statuses':            return getLang('ads_select_marital');
    case 'interests':           return getLang('ads_starttypingname_interest');
    case 'interest_categories': return getLang('ads_select_interest_category');
    case 'group_types':         return getLang('ads_starttypingname_group');
    case 'groups':              return getLang('ads_type_group_public');
    case 'groups_not':          return getLang('ads_type_group_public');
    case 'apps':                return getLang('ads_type_app_site');
    case 'apps_not':            return getLang('ads_type_app_site');
    case 'religions':           return getLang('ads_select_religion');
    case 'districts':
      var citiesOnlyIds = this.getCitiesOnly();
      if (!citiesOnlyIds) {
        return getLang('ads_first_select_city');
      } else if (this.criteria.districts.data.length) {
        return getLang('ads_starttypingname_district');
      } else {
        return getLang('ads_noinfo_districts');
      }
    case 'stations':
      var citiesOnlyIds = this.getCitiesOnly();
      if (!citiesOnlyIds) {
        return getLang('ads_first_select_city');
      } else if (this.criteria.stations.data.length) {
        return getLang('ads_starttypingname_station');
      } else {
        return getLang('ads_noinfo_stations');
      }
    case 'streets':
      var citiesOnlyIds = this.getCitiesOnly();
      if (citiesOnlyIds) {
        return getLang('ads_starttypingname_street');
      } else {
        return getLang('ads_first_select_city');
      }
    case 'schools':
      var citiesOnlyIds = this.getCitiesOnly();
      if (citiesOnlyIds) {
        return getLang('ads_starttypingname_school');
      } else {
        return getLang('ads_first_select_city');
      }
    case 'positions':              return getLang('ads_starttypingname_position');
    case 'operators':              return getLang('ads_select_mobile_operator');
    case 'browsers':               return getLang('ads_select_internet_browser');
    case 'user_devices':           return getLang('ads_select_user_device');
    case 'user_operating_systems': return getLang('ads_select_user_operating_system');
    case 'user_browsers':          return getLang('ads_select_user_browser');
    case 'retargeting_groups':     return getLang('ads_select_retargeting_group');
    case 'retargeting_groups_not': return getLang('ads_select_retargeting_group');
    default:                       return '';
  }
}

AdsTargetingEditor.prototype.updateUiCriterionIntroText = function(criterionName) {
  if (!('data' in this.criteria[criterionName])) {
    try { console.error("Can't update intro text"); } catch (e) {}
    return;
  }

  if (!this.criteria[criterionName].ui) {
    return;
  }

  var introText = this.getUiCriterionIntroText(criterionName);
  this.criteria[criterionName].ui.setOptions({introText: introText});
  this.updateUiCriterionDefaultData(criterionName); // Workaround to set introText
}

AdsTargetingEditor.prototype.getUiCriterionPlaceholderText = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not':             return getLang('ads_starttypingname_city_region');
    case 'statuses':               return getLang('ads_select_marital');
    case 'interests':              return getLang('ads_starttypingname_interest');
    case 'interest_categories':    return getLang('ads_select_interest_category');
    case 'group_types':            return getLang('ads_starttypingname_group');
    case 'groups':                 return getLang('ads_type_community');
    case 'groups_not':             return getLang('ads_type_community');
    case 'apps':                   return getLang('ads_type_app_site');
    case 'apps_not':               return getLang('ads_type_app_site');
    case 'religions':              return getLang('ads_select_religion');
    case 'districts':              return getLang('ads_starttypingname_district');
    case 'stations':               return getLang('ads_starttypingname_station');
    case 'streets':                return getLang('ads_starttypingname_street');
    case 'schools':                return getLang('ads_starttypingname_school');
    case 'positions':              return getLang('ads_starttypingname_position');
    case 'operators':              return getLang('ads_select_mobile_operator');
    case 'browsers':               return getLang('ads_select_internet_browser');
    case 'user_devices':           return getLang('ads_select_user_device');
    case 'user_operating_systems': return getLang('ads_select_user_operating_system');
    case 'user_browsers':          return getLang('ads_select_user_browser');
    case 'retargeting_groups':     return getLang('ads_select_retargeting_group');
    case 'retargeting_groups_not': return getLang('ads_select_retargeting_group');
    default:                       return '';
  }
}

AdsTargetingEditor.prototype.getUiCriterionNoResultText = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not':             return getLang('ads_notfound_city');
    case 'statuses':               return getLang('ads_notfound_marital');
    case 'interests':              return getLang('ads_notfound_interest');
    case 'interest_categories':    return getLang('ads_notfound_interest_category');
    case 'group_types':
    case 'groups':                 return getLang('ads_notfound_group');
    case 'groups_not':             return getLang('ads_notfound_group');
    case 'apps':                   return getLang('ads_notfound_app');
    case 'apps_not':               return getLang('ads_notfound_app');
    case 'religions':              return getLang('ads_notfound_religion');
    case 'districts':              return getLang('ads_notfound_district');
    case 'stations':               return getLang('ads_notfound_station');
    case 'streets':                return getLang('ads_notfound_street');
    case 'schools':                return getLang('ads_notfound_school');
    case 'positions':              return getLang('ads_notfound_position');
    case 'operators':              return getLang('ads_notfound_mobile_operator');
    case 'browsers':               return getLang('ads_notfound_internet_browser');
    case 'user_devices':           return getLang('ads_notfound_user_device');
    case 'user_operating_systems': return getLang('ads_notfound_user_operating_system');
    case 'user_browsers':          return getLang('ads_notfound_user_browser');
    case 'retargeting_groups':     return getLang('ads_notfound_retargeting_groups');
    case 'retargeting_groups_not': return getLang('ads_notfound_retargeting_groups');
    default:                       return '';
  }
}

AdsTargetingEditor.prototype.getUiCriterionDisabledText = function(criterionName) {
  switch (criterionName) {
    case 'cities':
    case 'cities_not': return getLang('ads_first_select_country');
    case 'districts':
    case 'stations':
    case 'streets':    return getLang('ads_first_select_city');
    case 'schools':
      if (this.criteria.schools_type.value == 1) {
        return getLang('ads_first_select_city_for_school');
      } else {
        return getLang('ads_first_select_city_for_university');
      }
    default: return '';
  }
}

AdsTargetingEditor.prototype.updateUiCriterionDisabledText = function(criterionName) {
  if (!('data' in this.criteria[criterionName])) {
    try { console.error("Can't update disabled text"); } catch (e) {}
    return;
  }

  if (!this.criteria[criterionName].ui) {
    return;
  }

  var disabledText = this.getUiCriterionDisabledText(criterionName);
  this.criteria[criterionName].ui.setOptions({disabledText: disabledText});
}

AdsTargetingEditor.prototype.setAutoGroupsNotValue = function(selectedValue) {
  if (selectedValue === false) return;

  this.showGroupMore('interests');
  this.initUiCriterion('groups_not');

  if (this.criteria.groups_not.uiInited) {
    this.criteria.groups_not.ui.clear();
    this.criteria.groups_not.ui.selectItem(selectedValue);
  }
}

AdsTargetingEditor.prototype.correctCriterion = function(criterionName) {

  if (!this.criteria[criterionName].uiInited) {
    return;
  }

  var visible = this.getUiCriterionVisibility(criterionName, false);
  if (visible !== false) {
    return;
  }

  switch (criterionName) {
    case 'schools':
    case 'school_from':
    case 'school_to':
    case 'uni_from':
    case 'uni_to':
    case 'user_devices':
    case 'user_operating_systems':
    case 'user_browsers':
      if (this.criteria[criterionName].value != '') {
        this.onCriterionUpdate(criterionName, '', false, true);
        if (this.criteria[criterionName].value == '') {
          this.criteria[criterionName].ui.clear();
        }
      }
      break;
    case 'pays_money':
      if (this.criteria[criterionName].value != 0) {
        this.onCriterionUpdate(criterionName, 0, false, true);
        this.criteria[criterionName].ui.selectItem(this.criteria[criterionName].value);
      }
      break;
  }
}

AdsTargetingEditor.prototype.onCriterionUpdate = function(criterionName, criterionValue, forceDataUpdate, delayed) {

  if (!delayed) {
    setTimeout(function() {
      this.onCriterionUpdate(criterionName, criterionValue, forceDataUpdate, true);
    }.bind(this), 1);
    return;
  }

  var isUpdateNeeded = null;
  do {
    var criterionValueOld = this.criteria[criterionName].value;

    if (typeof(this.criteria[criterionName].value) === 'number' && intval(this.criteria[criterionName].value) == this.criteria[criterionName].value) {
      criterionValue = intval(criterionValue);
    }

    if (criterionName === 'tags') {
      criterionValue = AdsEdit.unescapeValue(criterionValue);
    }

    if (this.criteria[criterionName].value === criterionValue) {
      break;
    }

    this.criteria[criterionName].value = criterionValue;

    //debugLog(criterionName + ' updated: ' + criterionValueOld + ' => ' + this.criteria[criterionName].value);

    switch (criterionName) {
      case 'country':
        this.criteria.cities.defaultData = [];
        this.criteria.cities_not.defaultData = [];
        this.updateUiCriterionData('cities');
        this.updateUiCriterionData('cities_not');
        this.updateUiCriterionDefaultData('cities');
        this.updateUiCriterionDefaultData('cities_not');
        this.updateUiCriterionEnabled('cities');
        this.updateUiCriterionEnabled('cities_not');
        if (this.criteria.country.value) {
          this.updateNeeded.need_cities_data = true;
        }
        break;
      case 'cities':
        var citiesOnlyIds = this.getCitiesOnly();
        if (citiesOnlyIds) {
          this.criteria.districts.dataInited = false;
          this.criteria.stations.dataInited = false;
        } else {
          this.criteria.districts.data = [];
          this.criteria.stations.data = [];
          this.updateUiCriterionData('districts');
          this.updateUiCriterionData('stations');
        }
        this.updateUiCriterionData('streets'); // Update URL
        this.updateUiCriterionData('schools'); // Update URL
        this.updateUiCriterionIntroText('districts');
        this.updateUiCriterionIntroText('stations');
        this.updateUiCriterionIntroText('streets');
        this.updateUiCriterionIntroText('schools');
        this.updateUiCriterionEnabled('cities');
        this.updateUiCriterionEnabled('districts');
        this.updateUiCriterionEnabled('stations');
        this.updateUiCriterionEnabled('streets');
        this.updateUiCriterionEnabled('schools');
        if (citiesOnlyIds) {
          this.updateNeeded.need_districts_data = true;
          this.updateNeeded.need_stations_data = true;
        }
        break;
      case 'cities_not':
        this.updateUiCriterionEnabled(criterionName);
        break;
      case 'sex':
        this.updateUiCriterionData('statuses');
        this.updateUiCriterionSelectedData('statuses');
        break;
      case 'districts':
      case 'stations':
      case 'streets':
      case 'schools':
        this.updateUiCriterionEnabled(criterionName);
        break;
      case 'schools_type':
        this.updateUiCriterionDisabledText('schools');
        this.updateUiCriterionData('schools');
        this.correctCriterion('schools');
        this.correctCriterion('school_from');
        this.correctCriterion('school_to');
        this.correctCriterion('uni_from');
        this.correctCriterion('uni_to');
        this.updateUiCriterionVisibility('schools');
        this.updateUiCriterionVisibility('school_from');
        this.updateUiCriterionVisibility('school_to');
        this.updateUiCriterionVisibility('uni_from');
        this.updateUiCriterionVisibility('uni_to');
        break;
      case 'age_from':
        this.updateUiCriterionData('age_to');
        break;
      case 'age_to':
        this.updateUiCriterionData('age_from');
        break;
      case 'school_from':
        this.updateUiCriterionData('school_to');
        break;
      case 'school_to':
        this.updateUiCriterionData('school_from');
        break;
      case 'uni_from':
        this.updateUiCriterionData('uni_to');
        break;
      case 'uni_to':
        this.updateUiCriterionData('uni_from');
        break;
      case 'tags':
        var remainElem = ge(this.options.targetIdPrefix + criterionName + '_remain_length');
        var remainLength = this.criteria[criterionName].max_length - this.criteria[criterionName].value.length;
        if (remainLength < this.criteria[criterionName].max_length * 0.3) {
          removeClass(this.options.targetIdPrefix + criterionName + '_remain', 'unshown');
        }
        remainElem.innerHTML = remainLength;
      isUpdateNeeded = false;
        break;
    }

    if (isUpdateNeeded === null) {
      isUpdateNeeded = true;
    }
  } while (false);

  if (isUpdateNeeded || forceDataUpdate) {
    this.needDataUpdate();
  }
}

AdsTargetingEditor.prototype.onUiSelect = function(criterionName, criterionValue) {
  this.onCriterionUpdate(criterionName, criterionValue);
}

AdsTargetingEditor.prototype.onUiChange = function(criterionName, criterionValue) {
  switch (criterionName) {
    case 'country':
      var criterionValueInt = intval(criterionValue);
      if (criterionValueInt == -1) {
        this.criteria.country.ui.val(0);
        this.updateNeeded.need_country_data = true;
        this.onCriterionUpdate('country', 0, true);
        return;
      } else if (criterionValueInt == 0) {
        this.criteria.country.ui.val(0);
      }
      break;
    case 'birthday_today':
      var newValue = this.criteria.birthday.value;
      newValue &= (-1 ^ (1 << 0));
      newValue |= (intval(criterionValue) && (1 << 0));
      this.onCriterionUpdate('birthday', newValue);
      return;
    case 'birthday_tomorrow':
      var newValue = this.criteria.birthday.value;
      newValue &= (-1 ^ (1 << 1));
      newValue |= (intval(criterionValue) && (1 << 1));
      this.onCriterionUpdate('birthday', newValue);
      return;
    case 'birthday_week':
      var newValue = this.criteria.birthday.value;
      newValue &= (-1 ^ (1 << 2));
      newValue |= (intval(criterionValue) && (1 << 2));
      this.onCriterionUpdate('birthday', newValue);
      setTimeout(updateBirhday.bind(this, newValue), 1);
      return;
  }

  this.onCriterionUpdate(criterionName, criterionValue);

  function updateBirhday(newValue) {
    var isCheckedToday    = !!(newValue & (1 << 0));
    var isCheckedTomorrow = !!(newValue & (1 << 1));
    var isCheckedWeek     = !!(newValue & (1 << 2));
    if (isCheckedWeek && !isCheckedToday) {
      this.criteria.birthday.ui_today.checked(true);
    }
    if (isCheckedWeek && !isCheckedTomorrow) {
      this.criteria.birthday.ui_tomorrow.checked(true);
    }
    this.criteria.birthday.ui_today.disable(isCheckedWeek);
    this.criteria.birthday.ui_tomorrow.disable(isCheckedWeek);
  }
}

AdsTargetingEditor.prototype.onUiTagAdd = function(criterionName, criterionValue, criterionTag) {
  switch (criterionName) {
    case 'cities':
      setTimeout(function(){
        this.criteria.cities_not.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'cities_not':
      setTimeout(function(){
        this.criteria.cities.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'groups':
      setTimeout(function(){
        this.criteria.groups_not.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'groups_not':
      setTimeout(function(){
        this.criteria.groups.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'apps':
      setTimeout(function(){
        this.criteria.apps_not.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'apps_not':
      setTimeout(function(){
        this.criteria.apps.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'retargeting_groups':
      setTimeout(function(){
        this.criteria.retargeting_groups_not.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
    case 'retargeting_groups_not':
      setTimeout(function(){
        this.criteria.retargeting_groups.ui.removeTagData(criterionTag[0]);
      }.bind(this), 1);
      break;
  }

  this.onCriterionUpdate(criterionName, criterionValue);
}

AdsTargetingEditor.prototype.onUiTagRemove = function(criterionName, criterionValue, criterionTag) {
  this.onCriterionUpdate(criterionName, criterionValue);
}

AdsTargetingEditor.prototype.onUiEvent = function(criterionName, event) {
  switch (criterionName) {
    case 'group_geography_more':
      this.showGroupMore('geography');
      return false;
      break;
    case 'group_geography_less':
      this.hideGroupMore('geography');
      return false;
      break;
    case 'group_interests_more':
      this.showGroupMore('interests');
      return false;
      break;
    case 'group_interests_less':
      this.hideGroupMore('interests');
      return false;
      break;
    case 'tags':
      var targetElem = ge(this.options.targetIdPrefix + criterionName);
      var criterionValueOriginal = targetElem.value;
      var criterionValue = this.correctInvalidValue(criterionName, criterionValueOriginal);
      if (criterionValue !== criterionValueOriginal) {
        targetElem.value = criterionValue;
      }
      if (browser.msie && event.type === 'paste') {
        targetElem.blur();
        targetElem.focus();
      }

      // setTimeout at least for IE
      setTimeout(function() {
        var targetElem = ge(this.options.targetIdPrefix + criterionName);
        if (targetElem) {
          var criterionValue = this.correctInvalidValue(criterionName, targetElem.value);
          this.onCriterionUpdate(criterionName, criterionValue);
        }
      }.bind(this), 100);
      break;
  }

  return true;
}

AdsTargetingEditor.prototype.needDataUpdate = function() {
  if (!this.getUpdatedData) {
    return;
  }
  var criteria = this.getCriteria();
  var data = extend({}, criteria, this.updateNeeded);
  var force = !isEmpty(this.updateNeeded);
  this.updateNeeded = {};
  this.getUpdatedData(data, force);
}

AdsTargetingEditor.prototype.setUpdateDataHandler = function(getUpdatedData) {
  this.getUpdatedData = getUpdatedData;
}

AdsTargetingEditor.prototype.setUpdateData = function(data, result) {
  var setResult = true;

  if (data['need_country_data']) {
    if (result['country_data']) {
      this.criteria.country.data = result['country_data'];
      this.updateUiCriterionData('country');
      this.updateUiCriterionDefaultData('country');
    } else {
      setResult = false;
    }
  }

  if (data['need_cities_data']) {
    if (isObject(result) && 'cities_data' in result) {
      if (data.country == this.criteria.country.value) {
        this.criteria.cities.defaultData = result['cities_data'];
        this.criteria.cities_not.defaultData = result['cities_data'];
        this.updateUiCriterionDefaultData('cities');
        this.updateUiCriterionDefaultData('cities_not');
      }
    } else {
      setResult = false;
    }
  }

  if (data['need_districts_data']) {
    if (isObject(result) && 'districts_data' in result) {
      if (data.cities == this.criteria.cities.value) {
        this.criteria.districts.data = result['districts_data'];
        this.criteria.districts.dataInited = true;
        this.updateUiCriterionData('districts');
        this.updateUiCriterionIntroText('districts');
        this.updateUiCriterionEnabled('districts');
      }
    } else {
      setResult = false;
    }
  }

  if (data['need_stations_data']) {
    if (isObject(result) && 'stations_data' in result) {
      if (data.cities == this.criteria.cities.value) {
        this.criteria.stations.data = result['stations_data'];
        this.criteria.stations.dataInited = true;
        this.updateUiCriterionData('stations');
        this.updateUiCriterionIntroText('stations');
        this.updateUiCriterionEnabled('stations');
      }
    } else {
      setResult = false;
    }
  }

  if (data['need_link_object']) {
    if (isObject(result) && 'groups_link_object_id' in result && 'groups_link_object_item' in result && result.groups_link_object_id != 0) {
      if (result.groups_link_object_id != this.criteria.groups.link_object_id) {
        this.criteria.groups.link_object_id        = result.groups_link_object_id;
        this.criteria.groups.link_object_item      = result.groups_link_object_item;
        this.criteria.groups.link_object_processed = false;
        this.updateUiCriterionDefaultData('groups');
        this.updateUiCriterionDefaultData('groups_not');
      }
    } else if (isObject(result) && 'post_group_object_id' in result && 'post_group_object_item' in result && result.post_group_object_id != 0) {
      if (result.groups_link_object_id != this.criteria.groups.link_object_id) {
        this.criteria.groups.link_object_id        = result.post_group_object_id;
        this.criteria.groups.link_object_item      = result.post_group_object_item;
        this.criteria.groups.link_object_processed = false;
        this.updateUiCriterionDefaultData('groups');
        this.updateUiCriterionDefaultData('groups_not');
      }
    } else {
      this.criteria.groups.link_object_id        = 0;
      this.criteria.groups.link_object_item      = null;
      this.criteria.groups.link_object_processed = false;
      this.updateUiCriterionDefaultData('groups');
      this.updateUiCriterionDefaultData('groups_not');
    }
    if (isObject(result) && 'apps_link_object_id' in result && 'apps_link_object_item' in result && result.apps_link_object_id != 0) {
      if (result.apps_link_object_id != this.criteria.apps.link_object_id) {
        this.criteria.apps.link_object_id        = result.apps_link_object_id;
        this.criteria.apps.link_object_item      = result.apps_link_object_item;
        this.criteria.apps.link_object_processed = false;
        this.updateUiCriterionDefaultData('apps');
        this.updateUiCriterionDefaultData('apps_not');
      }
    } else {
      this.criteria.apps.link_object_id        = 0;
      this.criteria.apps.link_object_item      = null;
      this.criteria.apps.link_object_processed = false;
      this.updateUiCriterionDefaultData('apps');
      this.updateUiCriterionDefaultData('apps_not');
    }
  }

  return setResult;
}

AdsTargetingEditor.prototype.isUserDevicesHidden = function() {
  return this.criteria.user_devices.hidden;
}

AdsTargetingEditor.prototype.correctInvalidValue = function(criterionName, criterionValue) {
  criterionValue = criterionValue.substr(0, this.criteria[criterionName].max_length);
  return criterionValue;
}

AdsTargetingEditor.prototype.getCitiesOnly = function(groupName) {
  var citiesIdsStr = '';
  if (this.criteria.cities.value) {
    var citiesIdsAll = this.criteria.cities.value.split(',');
    var citiesIds = [];
    for (var i in citiesIdsAll) {
      if (citiesIdsAll[i] > 0) {
        citiesIds.push(citiesIdsAll[i]);
      }
    }
    citiesIdsStr = citiesIds.join(',');
  }
  return citiesIdsStr;
}

AdsTargetingEditor.prototype.getCriteria = function() {
  var criteria = {};
  for (var criterionName in this.criteria) {
    criteria[criterionName] = this.criteria[criterionName].value;
  }
  return criteria;
}

AdsTargetingEditor.prototype.showGroup = function(groupName) {
  var group = this.targetingGroups[groupName];
  if (!group) {
    return;
  }
  for (var criterionNameIndex in group['criteria']) {
    var criterionName = group['criteria'][criterionNameIndex];
    this.initUiCriterion(criterionName);
  }
  this.initUiGroup(groupName);
}

AdsTargetingEditor.prototype.showGroupEnd = function(groupName) {
  var group = this.targetingGroups[groupName];
  if (!group) {
    return;
  }
  for (var criterionNameIndex in group['criteria']) {
    var criterionName = group['criteria'][criterionNameIndex];
    if (this.criteria[criterionName] && ('data' in this.criteria[criterionName])) {
      this.updateUiCriterionEnabled(criterionName); // Fix disabling introText
    }
  }
}

AdsTargetingEditor.prototype.showGroupMore = function(groupName) {
  var group = this.targetingGroups[groupName];
  if (!group) {
    return;
  }
  addClass('ads_edit_targeting_group_' + groupName + '_more_row', 'unshown');
  removeClass('ads_edit_targeting_group_' + groupName + '_less_row', 'unshown');
  for (var criterionNameIndex in group['criteria_more']) {
    var criterionName = group['criteria_more'][criterionNameIndex];
    this.criteria[criterionName].hidden_more = false;
  }
  for (var criterionNameIndex in group['criteria_more']) {
    var criterionName = group['criteria_more'][criterionNameIndex];
    this.updateUiCriterionVisibility(criterionName);
  }
  for (var criterionNameIndex in group['criteria_more']) {
    var criterionName = group['criteria_more'][criterionNameIndex];
    this.initUiCriterion(criterionName);
  }
}

AdsTargetingEditor.prototype.hideGroupMore = function(groupName) {
  var group = this.targetingGroups[groupName];
  if (!group) {
    return;
  }
  removeClass('ads_edit_targeting_group_' + groupName + '_more_row', 'unshown');
  addClass('ads_edit_targeting_group_' + groupName + '_less_row', 'unshown');
  for (var criterionNameIndex in group['criteria_more']) {
    var criterionName = group['criteria_more'][criterionNameIndex];
    this.criteria[criterionName].hidden_more = true;
  }
  for (var criterionNameIndex in group['criteria_more']) {
    var criterionName = group['criteria_more'][criterionNameIndex];
    this.updateUiCriterionVisibility(criterionName);
  }
}

try{stManager.done('ads_edit.js');}catch(e){}
