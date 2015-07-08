var AdsWeb = {};

AdsWeb.init = function() {
}

AdsWeb.showAds = function() {

  ge('ads_web_widget_result').innerHTML = '';
  ge('ads_web_widget_resize').innerHTML = '';

  var adsCount = intval(ge('ads_web_site_code_ads_ads_count').value);
  if (!AdsWeb.updateSiteCodeAdsParams('ads_ads_count', adsCount, false, true)) {
    return;
  }

  var adsParamsFix = {};
  for (var key in cur.adsParams) {
    var keyFix = key.substr(4);
    adsParamsFix[keyFix] = cur.adsParams[key];
  }
  if (adsParamsFix['handler'] && adsParamsFix['handler'].substr(0, 8) === 'function') {
    eval("adsParamsFix['handler'] = " + adsParamsFix['handler']);
  }

  var paramsExtra = extend({}, adsParamsFix, cur.adsParamsExtra);

  window.vkAsyncInit = function() {
    ge('ads_web_widget_container').innerHTML = '';
    VK.Widgets.Ads('ads_web_widget_container', {base_domain: location.protocol+'//'+location.host, onAdsReady: AdsWeb.onAdsReady, onResizeWidget: AdsWeb.onAdsResizeWidget}, paramsExtra);
  }

  if (window.VK && VK.init && VK.Widgets && VK.Widgets.Ads) {
    window.vkAsyncInit();
  } else {
    if (!window.openapiAppend) {
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: '/js/api/openapi.js?'+cur.openapiVersion
      }));
    }
    window.openapiAppend = true;
  }
}

AdsWeb.onAdsReady = function(errorCode) {
  ge('ads_web_widget_result').innerHTML = "onAdsReady(): errorCode = " + errorCode;
}

AdsWeb.onAdsResizeWidget = function() {
  var widgetElem   = ge('ads_web_widget_container');
  var widgetWidth  = getStyle(widgetElem, 'width');
  var widgetHeight = getStyle(widgetElem, 'height');
  ge('ads_web_widget_resize').innerHTML = 'Widget: ' + widgetWidth + ' x ' + widgetHeight;
}

AdsWeb.siteStatSelectGraph = function(itemElem, graphIndex) {
  removeClass(geByClass1('selected', ge('ads_web_graph_filters')), 'selected');
  addClass(itemElem, 'selected');
  cur.pageGraphs.ads_web_graph.loadGraph(graphIndex);
}

AdsWeb.initSiteCode = function(widgetHtml, adsParams, adsParamsExtra, openapiVersion) {
  cur.widgetHtml     = widgetHtml;
  cur.adsParams      = adsParams;
  cur.adsParamsExtra = adsParamsExtra;
  cur.openapiVersion = openapiVersion;

  window.radioBtns['ads_demo']         = {els: Array.prototype.slice.apply(geByClass('radiobtn', ge('ads_web_site_code_ads_demo_wrap')))};
  window.radioBtns['ads_ad_type']      = {els: Array.prototype.slice.apply(geByClass('radiobtn', ge('ads_web_site_code_ads_ad_type_wrap')))};
  window.radioBtns['ads_ad_unit_type'] = {els: Array.prototype.slice.apply(geByClass('radiobtn', ge('ads_web_site_code_ads_ad_unit_type_wrap')))};
  window.radioBtns['ads_font_size']    = {els: Array.prototype.slice.apply(geByClass('radiobtn', ge('ads_web_site_code_ads_font_size_wrap')))};
}

AdsWeb.updateSiteCodeAdsParams = function(paramName, paramValue, paramElem, showError) {
  if (paramElem && hasClass(paramElem, 'radiobtn')) {
    paramValue = paramElem.getAttribute('param_value');
    radiobtn(paramElem, paramValue, paramName);
  }
  if (paramElem && hasClass(paramElem, 'checkbox')) {
    checkbox(paramElem);
    paramValue = (isChecked(paramElem) ? '1' : '');
  }
  if (paramName === 'ads_ads_count') {
    paramValue = intval(paramValue);
    if (paramValue < 1 || paramValue > 4) {
      if (showError) {
        showFastBox(getLang('global_error'), 'Неверное количество объявлений.');
      }
      return false;
    }
    // Ok
  }

  cur.adsParams[paramName] = paramValue;

  var allowEmptyParams = [
    'ads_demo',
    'ads_ad_unit_width',
    'ads_ad_unit_height',
    'ads_background_color',
    'ads_separator_color',
    'ads_title_color',
    'ads_description_color',
    'ads_domain_color',
    'ads_vk_link_color',
    'ads_border_color',
    'ads_border_radius',
    'ads_handler',
    'ads_handler_empty_html'
  ];

  if (paramValue === '' && inArray(paramName, allowEmptyParams)) {
    delete cur.adsParams[paramName];
  }

  try {
    var adsParamsFix = [];
    for (var key in cur.adsParams) {
      var keyFix = key.substr(4);
      var value;
      if (key === 'ads_handler' && cur.adsParams[key].substr(0, 8) === 'function') {
        value = '"' + keyFix + '":' + cur.adsParams[key];
      } else {
        value = '"' + keyFix + '":' + JSON.stringify(cur.adsParams[key]);
      }
      adsParamsFix.push(value);
    }
    var adsParamsStr = '{' + adsParamsFix.join(',') + '}';
    var widgetHtml   = cur.widgetHtml.replace('{ads_params}', adsParamsStr);
    ge('ads_web_site_code_widget_html').value = widgetHtml;
  } catch(e) {
    debugLog(e);
  }
  return true;
}

AdsWeb.showSiteEditBox = function(siteNew, siteId, mainTagId) {
  var ajaxParams = {};
  ajaxParams.site_id     = siteId;
  ajaxParams.main_tag_id = mainTagId;

  var showOptions = {params: {}};
  showOptions.cache = 1;

  showBox('/adsweb?act=site_edit', ajaxParams, showOptions);
}

AdsWeb.initSiteEdit = function(editBox, actionParams) {
  var saveHandler = AdsWeb.saveSite.pbind(editBox, actionParams);
  window.ads_web_site_edit_box_add = 'Добавить';

  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton(getLang('ads_web_site_edit_box_add'), saveHandler, 'yes');
}

AdsWeb.saveSite = function(editBox, actionParams) {
  if (!Ads.lock('saveSite', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);
  ajaxParams.domain_name = ge('ads_web_site_edit_domain_name').value;

  ajax.post('/adsweb?act=site_save', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveSite');
    if (response && response.ok) {
      if (ajaxParams.site_id) {
        nav.reload();
      } else {
        nav.go('/adsweb?act=sites_list&tag_id=' + ajaxParams.main_tag_id + '&list_all=1');
      }
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hideProgress();
  }
}

AdsWeb.deleteSite = function(actionParams) {
  if (!Ads.lock('deleteSite', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=site_delete', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('deleteSite');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.changeSiteParams = function(actionParams) {
  if (!Ads.lock('changeSiteParams', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=site_change_params', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('changeSiteParams');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.changeDomainNameParams = function(actionParams) {
  if (!Ads.lock('changeDomainNameParams', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=domain_name_change_params', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('changeDomainNameParams');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.removeDomainName = function(actionParams) {
  if (!Ads.lock('changeDomainNameParams', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=domain_name_remove', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('changeDomainNameParams');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.showSiteTagsEditBox = function(siteId) {
  var ajaxParams = {};
  ajaxParams.site_id = siteId;

  var showOptions = {params: {}};

  showBox('/adsweb?act=site_tags_edit', ajaxParams, showOptions);
}

AdsWeb.initSiteTagsEdit = function(editBox, actionParams, webTagsData, webTagsSelected) {
  var targetElem = ge('ads_web_site_tags_edit_tags');
  targetElem.removeAttribute('autocomplete');
  var uiTags = new Autocomplete(targetElem, webTagsData, {
    selectedItems: webTagsSelected,
    dropdown:      true,
    maxItems:      50,
    width:         250,
    height:        250,
  });

  var saveHandler = AdsWeb.saveSiteTags.pbind(editBox, actionParams, uiTags);
  window.ads_web_site_tags_edit_box_save = 'Сохранить';

  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton(getLang('ads_web_site_tags_edit_box_save'), saveHandler, 'yes');
}

AdsWeb.saveSiteTags = function(editBox, actionParams, uiTags) {
  if (!Ads.lock('saveSiteTags', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);
  ajaxParams.site_tags = uiTags.val();

  ajax.post('/adsweb?act=site_tags_save', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveSiteTags');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hideProgress();
  }
}

AdsWeb.changeUnitParams = function(actionParams) {
  if (!Ads.lock('changeUnitParams', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=unit_change_params', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('changeUnitParams');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.showTagEditBox = function(newTagType, tagId, parentTagId) {
  var ajaxParams = {};
  ajaxParams.new_tag_type  = newTagType;
  ajaxParams.tag_id        = tagId;
  ajaxParams.parent_tag_id = parentTagId;

  var showOptions = {params: {}};
  showOptions.cache = 1;

  showBox('/adsweb?act=tag_edit', ajaxParams, showOptions);
}

AdsWeb.initTagEdit = function(editBox, actionParams) {
  var saveHandler = AdsWeb.saveTag.pbind(editBox, actionParams);
  window.ads_web_tag_edit_box_add = 'Добавить';

  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton(getLang('ads_web_tag_edit_box_add'), saveHandler, 'yes');
}

AdsWeb.saveTag = function(editBox, actionParams) {
  if (!Ads.lock('saveTag', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);
  ajaxParams.tag_name = ge('ads_web_tag_edit_tag_name').value;

  ajax.post('/adsweb?act=tag_save', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveTag');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hideProgress();
  }
}

AdsWeb.removeTag = function(actionParams) {
  if (!Ads.lock('removeTag', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=tag_remove', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('removeTag');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.showAdminEditBox = function(tagId) {
  var ajaxParams = {};
  ajaxParams.tag_id = tagId;

  var showOptions = {params: {}};
  showOptions.cache = 1;

  showBox('/adsweb?act=admin_edit', ajaxParams, showOptions);
}

AdsWeb.initAdminEdit = function(editBox, actionParams) {
  var saveHandler = AdsWeb.saveAdmin.pbind(editBox, actionParams);
  window.ads_web_admin_edit_box_add = 'Добавить';

  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton(getLang('ads_web_admin_edit_box_add'), saveHandler, 'yes');
}

AdsWeb.saveAdmin = function(editBox, actionParams) {
  if (!Ads.lock('saveAdmin', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);
  ajaxParams.admin_link = ge('ads_web_admin_edit_admin_link').value;

  ajax.post('/adsweb?act=admin_save', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveAdmin');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hideProgress();
  }
}

AdsWeb.removeAdmin = function(actionParams) {
  if (!Ads.lock('removeAdmin', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);

  ajax.post('/adsweb?act=admin_remove', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('removeAdmin');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
  }
  function onUnlock() {
  }
}

AdsWeb.showDomainSpecialEditBox = function(domainSpecialId) {
  var ajaxParams = {};
  ajaxParams.domain_special_id = domainSpecialId;

  var showOptions = {params: {}};

  showBox('/adsweb?act=domain_special_edit', ajaxParams, showOptions);
}

AdsWeb.initDomainSpecialEdit = function(editBox, actionParams, domainSpecialType) {
  var saveHandlerApprove    = AdsWeb.saveDomainSpecial.pbind(editBox, actionParams, 2);
  var saveHandlerDisapprove = AdsWeb.saveDomainSpecial.pbind(editBox, actionParams, 3);
  window.ads_web_domain_special_edit_box_approve    = 'Разрешить';
  window.ads_web_domain_special_edit_box_disapprove = 'Запретить';

  editBox.removeButtons();
  editBox.addButton(getLang('box_cancel'), false, 'no');
  editBox.addButton(getLang('ads_web_domain_special_edit_box_disapprove'), saveHandlerDisapprove, 'yes');
  editBox.addButton(getLang('ads_web_domain_special_edit_box_approve'), saveHandlerApprove, 'yes');

  window.radioBtns['ads_domain_special_type'] = {val: domainSpecialType, els: Array.prototype.slice.apply(geByClass('radiobtn', ge('ads_web_domain_special_wrap')))};

  var boxOptions = {};
  boxOptions.onClean = function() {
    delete window.radioBtns['ads_domain_special_type'];
  }
  editBox.setOptions(boxOptions);
}

AdsWeb.saveDomainSpecial = function(editBox, actionParams, domainSpecialStatus) {

  var domainSpecialType = radioval('ads_domain_special_type');
  if (!domainSpecialType) {
    showFastBox(getLang('global_error'), 'Укажите тип.');
    return;
  }

  if (!Ads.lock('saveDomainSpecial', onLock, onUnlock)) {
    return;
  }

  var ajaxParams = {};
  ajaxParams = extend({}, ajaxParams, actionParams);
  ajaxParams.domain_special_type   = domainSpecialType;
  ajaxParams.domain_special_status = domainSpecialStatus;

  ajax.post('/adsweb?act=domain_special_save', ajaxParams, {onDone: onComplete, onFail: onComplete});

  function onComplete(response) {
    Ads.unlock('saveDomainSpecial');
    if (response && response.ok) {
      nav.reload();
    } else {
      var msg = ((response && response.msg) ? response.msg : getLang('ads_error_unexpected_error_try_later'));
      showFastBox(getLang('global_error'), msg);
    }
    return true;
  }
  function onLock() {
    editBox.showProgress();
  }
  function onUnlock() {
    editBox.hideProgress();
  }
}

try{stManager.done('ads_web.js');}catch(e){}
