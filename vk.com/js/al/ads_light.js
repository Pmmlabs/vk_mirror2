(function() {

var AdsLight = {};

var isVkDomain = (document.domain === 'vk.com');

var uaLight = navigator.userAgent.toLowerCase();
var browserLight = {
  msie6: (/msie 6/i.test(uaLight) && !/opera/i.test(uaLight)),
  msie7: (/msie 7/i.test(uaLight) && !/opera/i.test(uaLight)),
  msie8: (/msie 8/i.test(uaLight) && !/opera/i.test(uaLight))
};

if (isVkDomain) {
  if (!('__adsLoaded' in window)) window.__adsLoaded = vkNow();
  window.AdsLight = AdsLight;
}

AdsLight.init = function() {
  if (window.vk__adsLight) {
    return;
  }

  window.vk__adsLight = {};

  AdsLight.initUserHandlers();

  vk__adsLight.widgetsIds       = {};
  vk__adsLight.observersInited  = false;
  vk__adsLight.publishTimers    = {};

  vk__adsLight.windowId         = Math.round(Math.random() * 1000000000 + 1);
  vk__adsLight.activeTab        = 0;
  vk__adsLight.userEventTime    = 0;
  vk__adsLight.wrapVisible      = false;
  vk__adsLight.imagesTimer      = false;
  vk__adsLight.reloadTimer      = false;
  vk__adsLight.updateBlockTimer = false;

  vk__adsLight.adsCanShow       = 1;
  vk__adsLight.adsSection       = false;
  vk__adsLight.adsShowed        = '';
  vk__adsLight.adsShowedHash    = +new Date;
  vk__adsLight.adsParams        = false;

  vk__adsLight.updateProgress   = 0;
  vk__adsLight.adsShowedAll     = {};

  vk__adsLight.loadComplete     = false;
  vk__adsLight.loaderParams     = false;

  vk__adsLight.adsIdsApplyNeeded  = {};
  vk__adsLight.adsIdsApplyProcess = [];
  vk__adsLight.adsIdsApplyTimer   = false;
  vk__adsLight.adsIdsApplyLocked  = false;

  if ('onfocusin' in window) { // IE
    if (window.addEventListener) { // IE >= 9
      window.addEventListener('focusin',  vk__adsLight.userHandlers.onFocusWindow, false);
      window.addEventListener('focusout', vk__adsLight.userHandlers.onBlurWindow, false);
    } else {
      if (window.attachEvent) { // IE < 9
        window.attachEvent('onfocusin',  vk__adsLight.userHandlers.onFocusWindow);
        window.attachEvent('onfocusout', vk__adsLight.userHandlers.onBlurWindow);
      }
    }
  } else {
    if (window.addEventListener) { // Firefox, Opera, Google Chrome and Safari
      window.addEventListener('focus', vk__adsLight.userHandlers.onFocusWindow, true);
      window.addEventListener('blur',  vk__adsLight.userHandlers.onBlurWindow, true);
    }
  }
  if (document.addEventListener) {
    window.addEventListener('scroll',      vk__adsLight.userHandlers.onScrollWindow, true);
    document.addEventListener('mousedown', vk__adsLight.userHandlers.onMouseDownDocument, true);
  } else if (document.attachEvent) {
    window.attachEvent('onscroll',      vk__adsLight.userHandlers.onScrollWindow);
    document.attachEvent('onmousedown', vk__adsLight.userHandlers.onMouseDownDocument);
  }

  if (!isVkDomain && window.VK && VK.addCallback) {
    VK.addCallback('adsPublish', AdsLight.handleEvent);
  }

  vk__adsLight.yaDirectLoaded = false;
  vk__adsLight.yaDirectAdActive = false;
  vk__adsLight.yaDirectLoadTries = 0;

  vk__adsLight.userHandlers.onInit(true);
}

AdsLight.initUserHandlers = function() {

  vk__adsLight.userHandlers = {
    onInit:                    onInit,
    onHasFocus:                onHasFocus,
    onFocusWindow:             onFocusWindow,
    onBlurWindow:              onBlurWindow,
    onScrollWindow:            onScrollWindow,
    onMouseDownDocument:       onMouseDownDocument,
    onMouseDownDocumentAction: onMouseDownDocumentAction,
    onActiveTab:               onActiveTab
  };

  var needBlur       = false;
  var afterClickLink = false;
  var focusTime      = false;
  var updateTimer    = false;
  var scrollTimer    = false;

  function onInit(eventStub) {
    AdsLight.initObservers();

    if (eventStub) {
      AdsLight.handleEvent('ads.onEvent', 'onInit', 0);
    }

    if (!eventStub) {
      AdsLight.loadAds();
    }

    if (document.hasFocus && document.hasFocus()) {
      onHasFocus(true);
    }
  }
  function onHasFocus(eventStub) {
    if (eventStub) {
      AdsLight.handleEvent('ads.onEvent', 'onHasFocus', 0);
    }

    onActiveTab();
  }
  function onFocusWindow(event) {
    if (event) {
      AdsLight.handleEvent('ads.onEvent', 'onFocusWindow', 0);
    }

    // Opera fix
    // May be obsolete
    if (needBlur) {
      return;
    }
    needBlur = true;

    focusTime = (window.vkNow && vkNow() || 0);

    vk__adsLight.userEventTime = (window.vkNow && vkNow() || 0);

    onActiveTab();
  }
  function onBlurWindow(event) {

    needBlur = false;

    if (window.vkNow && vkNow() - focusTime < 1000) {
      return;
    }

    if (event) {
      AdsLight.handleEvent('ads.onEvent', 'onBlurWindow', 0);
    }

    vk__adsLight.activeTab = (window.vkNow && -vkNow() || 0);
  }
  function onScrollWindow(event, delayed) {
    if (event && !delayed) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        onScrollWindow(event, true);
      }, 100);
      return;
    }

    if (event) {
      AdsLight.handleEvent('ads.onEvent', 'onScrollWindow', 0);
    }

    vk__adsLight.userEventTime = (window.vkNow && vkNow() || 0);

    onActiveTab();

    if (isVkDomain && window.vkNow && window.vk && vk.ads_rotate_interval && isTimeToUpdate()) {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(function() {
        if (isTimeToUpdate()) {
          __adsLoaded = 0;
          AdsLight.updateBlock();
        }
      }, 10);
    }

    if (isVkDomain) {
      AdsLight.applyAds();
    }

    function isTimeToUpdate() {
      return vk__adsLight.adsSection === 'web' && vkNow() - __adsLoaded >= vk.ads_rotate_interval || vkNow() - __adsLoaded >= vk.ads_rotate_interval * 5;
    }
  }
  function onMouseDownDocument(event) {
    if (event) {
      AdsLight.handleEvent('ads.onEvent', 'onMouseDownDocument', 0);
    }

    vk__adsLight.userEventTime = (window.vkNow && vkNow() || 0);

    onActiveTab();

    if (!event) {
      return;
    }
    var elem = event.target;
    while (elem) {
      if (elem.tagName == 'A') {
        break;
      }
      if (elem.onclick) {
        break;
      }
      elem = elem.parentNode;
    }
    if (!elem) {
      return;
    }

    onMouseDownDocumentAction(true);
  }
  function onMouseDownDocumentAction(eventStub) {
    if (eventStub) {
      AdsLight.handleEvent('ads.onEvent', 'onMouseDownDocumentAction', 0);
    }

    clearTimeout(updateTimer);

    afterClickLink = true;
    setTimeout(function() {
      afterClickLink = false;
    }, 10);
  }
  function onActiveTab(eventStub) {
    if (isVkDomain && window.vkNow && window.vk && vk.ads_rotate_interval && !afterClickLink && vk__adsLight.activeTab < 0 && vkNow() + vk__adsLight.activeTab >= 15000 && isTimeToUpdate()) {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(function() {
        if (isTimeToUpdate()) {
          __adsLoaded = 0;
          AdsLight.updateBlock();
        }
      }, 10);
    }
    vk__adsLight.activeTab = 1;

    function isTimeToUpdate() {
      return vkNow() - __adsLoaded >= vk.ads_rotate_interval;
    }
  }
}

AdsLight.initWeb = function(adsSection, loaderParams, adsScriptVersion, adsParamsExport) {
  vk__adsLight.adsSection = adsSection;

  if (top === window) {
    return;
  }

  var rpcMethods = {
    adsPublish: function() {
      AdsLight.handleEvent.apply(AdsLight, arguments);
    },
    onAdsAttached: function() {
      vk__adsLight.rpc.callMethod('publish', 'ads.subscribeEvents');
    },
    onInit: function() {
      vk__adsLight.rpc.callMethod('publish', 'ads.subscribeEvents');
    }
  };
  try {
    vk__adsLight.rpc = new fastXDM.Client(rpcMethods);
    vk__adsLight.rpc.callMethod('adsOnInitLoader', adsScriptVersion);
    vk__adsLight.loaderParams = loaderParams;
    vk__adsLight.adsParamsExport = adsParamsExport;
  } catch (e) {
    debugLog(e);
  }
}

AdsLight.initObservers = function() {
  if (!window.VK || !VK.Observer || !VK.Observer.subscribe) {
    return;
  }
  if (vk__adsLight.observersInited) {
    return;
  }
  vk__adsLight.observersInited = true;

  VK.Observer.subscribe('ads.isVisibleBlockWrap', getHandler('ads.isVisibleBlockWrap'));
  VK.Observer.subscribe('ads.subscribeEvents',    getHandler('ads.subscribeEvents'));
  VK.Observer.subscribe('ads.onEvent',            getHandler('ads.onEvent'));
  VK.Observer.subscribe('ads.onAdsShowed',        getHandler('ads.onAdsShowed'));

  for (var widgetId in VK.Widgets.RPC) {
    if (VK.Widgets.RPC[widgetId].methods.adsOnInit) {
      VK.Widgets.RPC[widgetId].callMethod('onAdsAttached');
    }
  }

  function getHandler(publishEventName) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(publishEventName);
      AdsLight.handleEvent.apply(AdsLight, args);
    };
  }
}

AdsLight.handleEvent = function() {
  var args = Array.prototype.slice.call(arguments);
  var publishEventName = args.shift();
  switch (publishEventName) {
    case 'ads.isVisibleBlockWrap':
      AdsLight.isVisibleBlockWrapRpc.apply(AdsLight, args);
      break;
    case 'ads.subscribeEvents':
      var widgetId = args[0];
      if (widgetId && !vk__adsLight.widgetsIds[widgetId]) {
        vk__adsLight.widgetsIds[widgetId] = true;
      }
      vk__adsLight.userHandlers.onInit(true);
      break;
    case 'ads.onEvent':
      AdsLight.onEvent.apply(AdsLight, args);
      break;
    case 'ads.onAdsShowed':
      AdsLight.onAdsShowed.apply(AdsLight, args);
      break;
  }
}

AdsLight.onEvent = function(eventName, windowsIds) {
  if (windowsIds === 0) {
    windowsIds = [];
    //windowsIds.push(Math.round(Math.random() * -1000)); // For debug
  } else {
    var isWindowCur = false;
    for (var i in windowsIds) {
      if (windowsIds[i] == vk__adsLight.windowId) {
        isWindowCur = true;
        break;
      }
    }
    if (isWindowCur) {
      return;
    }
    if (vk__adsLight.userHandlers[eventName]) {
      vk__adsLight.userHandlers[eventName](false);
    }
  }
  windowsIds.push(vk__adsLight.windowId);

  AdsLight.publish(false, 'ads.onEvent', eventName, windowsIds);
}

AdsLight.onAdsShowed = function(adsShowedAll) {
  if (adsShowedAll === 0) {
    adsShowedAll = {};
  }

  // Sort windows ids to correct compare received messages
  {
    var windowsIds = [];
    for (var windowId in adsShowedAll) {
      windowsIds.push(parseInt(windowId));
    }
    windowsIds.sort();
  }

  // Check for identical message was send
  {
    var publishHash = [];
    for (var i = 0, len = windowsIds.length; i < len; i++) {
      var windowId = windowsIds[i];
      publishHash.push(adsShowedAll[windowId].ads_showed_hash);
    }
    publishHash = publishHash.join('_');

    var noPublish = (publishHash && adsShowedAll[vk__adsLight.windowId] && publishHash === adsShowedAll[vk__adsLight.windowId].publish_hash);
  }

  // Add known showed ads to message
  {
    var nowTime = +new Date;

    if (!adsShowedAll[vk__adsLight.windowId]) {
      adsShowedAll[vk__adsLight.windowId] = {};
      windowsIds.push(vk__adsLight.windowId);
      windowsIds.sort();
    }
    adsShowedAll[vk__adsLight.windowId].ads_showed      = vk__adsLight.adsShowed;
    adsShowedAll[vk__adsLight.windowId].ads_showed_hash = vk__adsLight.adsShowedHash;
    adsShowedAll[vk__adsLight.windowId].update_progress = vk__adsLight.updateProgress;

    for (var windowId in vk__adsLight.adsShowedAll) {
      if ((!adsShowedAll[windowId] || vk__adsLight.adsShowedAll[windowId].publish_time > adsShowedAll[windowId].publish_time) && nowTime - vk__adsLight.adsShowedAll[windowId].publish_time < 10000) {
        adsShowedAll[windowId] = vk__adsLight.adsShowedAll[windowId];
      }
    }

    var publishHash = [];
    for (var i = 0, len = windowsIds.length; i < len; i++) {
      var windowId = windowsIds[i];
      publishHash.push(adsShowedAll[windowId].ads_showed_hash);
    }
    publishHash = publishHash.join('_');

    adsShowedAll[vk__adsLight.windowId].publish_time = nowTime;
    adsShowedAll[vk__adsLight.windowId].publish_hash = publishHash;
  }

  // Update all showed ads
  for (var windowId in adsShowedAll) {
    vk__adsLight.adsShowedAll[windowId] = adsShowedAll[windowId];
  }

  if (!noPublish) {
    AdsLight.publish(true, 'ads.onAdsShowed', adsShowedAll);
  }
}

AdsLight.publish = function(delayBigPublish, publishEventName) {

  var args  = Array.prototype.slice.call(arguments, 1);
  var args1 = args.slice();
  var args2 = args.slice();
  var args3 = args.slice();
  var args4 = args.slice();
  args1.unshift('adsPublish');
  args2.unshift('adsPublish');
  args3.unshift('adsPublish');
  args4.unshift('publish');

  var func;
  var funcs = [];
  if (window.VK && VK.Widgets && VK.Widgets.RPC) {
    for (var widgetId in vk__adsLight.widgetsIds) {
      if (VK.Widgets.RPC[widgetId] && VK.Widgets.RPC[widgetId].callMethod) {
        func = (function() {
          var widgetIdCur = widgetId;
          return function() {
            VK.Widgets.RPC[widgetIdCur].callMethod.apply(VK.Widgets.RPC[widgetIdCur], args1);
          }
        })();
        funcs.push(func);
      }
    }
  }
  if (!isVkDomain && window.VK && VK.callMethod) {
    func = function() {
      VK.callMethod.apply(VK, args2);
    }
    funcs.push(func);
  }
  if (isVkDomain && vk__adsLight.adsSection !== 'web' && window.cur && cur.app && cur.app.runCallback) {
    func = function() {
      cur.app.runCallback.apply(cur.app, args3);
    }
    funcs.push(func);
  }
  if (isVkDomain && vk__adsLight.adsSection === 'web' && vk__adsLight.rpc && vk__adsLight.rpc.callMethod) {
    func = function() {
      vk__adsLight.rpc.callMethod.apply(vk__adsLight.rpc, args4);
    }
    funcs.push(func);
  }

  clearTimeout(vk__adsLight.publishTimers[publishEventName]);
  if (funcs.length > 1 && delayBigPublish) {
    vk__adsLight.publishTimers[publishEventName] = setTimeout(publishAll, 50);
  } else {
    publishAll();
  }

  function publishAll() {
    for (var i = 0, len = funcs.length; i < len; i++) {
      funcs[i]();
    }
  }
}

AdsLight.canUpdate = function(forAjax) {

  var containerElem = ge('ads_left');

  var initialAjax = (forAjax && __adsLoaded === false);

  var result = true;

  // Is visible
  result = (result && containerElem && isVisible(containerElem) && (vk__adsLight.activeTab > 0 && AdsLight.isVisibleBlockWrap() || initialAjax));
  // Is reasonable
  result = (result && vk.id && (vk__adsLight.adsCanShow >= 1 || vkNow() + vk__adsLight.adsCanShow > 3600000)); // hour

  if (vk__adsLight.adsSection === 'web') {
    // Is reasonable
    result = (result && vk__adsLight.loadComplete === 2);
  } else {
    // Is visible
    result = (result && isVisible('side_bar') && !layers.visible && !isVisible('left_friends'));
    // Is reasonable
    result = (result && !vk.no_ads && (vk.loaded || initialAjax));
  }

  return result;
}

AdsLight.getAjaxParams = function(ajaxParams, ajaxOptions) {
  var ajaxParamsNew = {};
  var canUpdateBlock = AdsLight.canUpdate(true);
  if (ajaxOptions.noAds) {
    ajaxParamsNew.al_ad = 0;
  } else if (canUpdateBlock || ajaxOptions.ads) {
    if (ajaxOptions.ads || window.vkNow && window.vk && vk.ads_rotate_interval && vk__adsLight.adsSection !== 'web' && vkNow() - __adsLoaded >= vk.ads_rotate_interval) {
      __adsLoaded = vkNow();
      ajaxParamsNew.al_ad = 1;
    }
    if (ajaxParams.al_ad || ajaxParamsNew.al_ad) {
      ajaxParamsNew.ads_section = vk__adsLight.adsSection;
      ajaxParamsNew.ads_showed = AdsLight.getAdsShowed();
    }
  } else {
    ajaxParamsNew.al_ad = null;
  }
  return ajaxParamsNew;
}

AdsLight.doRequest = function(requestFunc, delayed) {

  var isWebLoad = (vk__adsLight.adsSection === 'web' && vk__adsLight.loadComplete === 1);

  if (!delayed) {
    vk__adsLight.updateProgress = 1;
    AdsLight.onAdsShowed(0);
    setTimeout(AdsLight.doRequest.pbind(requestFunc, true), 300);
    return;
  }

  var lastRequestWindowId = 0;
  var lastRequestWindowsIds = {};
  var intervalTimer;
  var timeoutTimer;

  checkRequest();

  function checkRequest(force) {
    var nowTime = +new Date;
    var currentRequestWindowId = 0;
    for (var windowId in vk__adsLight.adsShowedAll) {
      var windowAdsShowed = vk__adsLight.adsShowedAll[windowId];
      if (nowTime - windowAdsShowed.publish_time >= 30000) {
        delete vk__adsLight.adsShowedAll[windowId];
      } else if (!isWebLoad || !lastRequestWindowsIds[windowId]) {
        if (windowAdsShowed.update_progress == 2) {
          currentRequestWindowId = windowId;
          break;
        } else if (windowAdsShowed.update_progress == 1 && (!currentRequestWindowId || windowId < currentRequestWindowId)) {
          currentRequestWindowId = windowId;
        }
      }
    }

    if (force || !currentRequestWindowId || currentRequestWindowId == vk__adsLight.windowId) {
      clearInterval(intervalTimer);
      clearTimeout(timeoutTimer);
      vk__adsLight.updateProgress = 2;
      AdsLight.onAdsShowed(0);
      requestFunc();
    } else if (currentRequestWindowId != lastRequestWindowId) {
      lastRequestWindowId = currentRequestWindowId;
      clearInterval(intervalTimer);
      clearTimeout(timeoutTimer);
      intervalTimer = setInterval(checkRequest, isWebLoad ? 100 : 200);
      timeoutTimer = setTimeout(checkRequest.pbind(true), 5000 + 50);
    }

    lastRequestWindowsIds[currentRequestWindowId] = (lastRequestWindowsIds[currentRequestWindowId] ? lastRequestWindowsIds[currentRequestWindowId] + 1 : 1);
  }
}

AdsLight.getAdsShowed = function() {
  var adsShowed = [];
  for (var windowId in vk__adsLight.adsShowedAll) {
    var windowAdsShowed = vk__adsLight.adsShowedAll[windowId];
    if (windowAdsShowed.ads_showed) {
      adsShowed.push(windowAdsShowed.ads_showed);
    }
  }
  adsShowed = adsShowed.join(',');
  return adsShowed;
}

AdsLight.updateBlock = function(force, delayed) {

  if (force === 'very_lazy') {
    __adsLoaded = 0;
    return;
  }
  if (force === 'lazy') {
    if (__adsLoaded) {
      __adsLoaded = 0;
      return;
    } else {
      __adsLoaded = 0; // if __adsLoaded === false
    }
  }
  if (force === 'force') {
    __adsLoaded = 0;
  }
  if (force === 'force_hard') {
    __adsLoaded = 0;
  }
  if (force === 'already') {
    __adsLoaded = vkNow();
    return;
  }

  if (__adsLoaded || __adsLoaded === false) {
    return;
  }

  if (!delayed) {
    clearTimeout(vk__adsLight.updateBlockTimer);
    vk__adsLight.updateBlockTimer = setTimeout(AdsLight.updateBlock.pbind(false, 1), 1000);
    return;
  }

  var canUpdateBlock = AdsLight.canUpdate();

  if (delayed == 1) {
    setTimeout(AdsLight.updateBlock.pbind(false, 2), 500); // Period must be greater than in isVisibleBlockWrapCoords
    return;
  }

  if (!canUpdateBlock && (force != 'force_hard')) {
    return;
  }

  __adsLoaded = vkNow();

  var ajaxParams = {};
  for (var i in vk__adsLight.adsParams) {
    ajaxParams[i] = vk__adsLight.adsParams[i];
  }

  AdsLight.doRequest(function(){
    ajaxParams.ads_showed = AdsLight.getAdsShowed();
    ajaxParams.ya_ad_active = +vk__adsLight.yaDirectAdActive;
    ajax.post('/ads_rotate.php?act=al_update_ad', ajaxParams, {ads: 1, onDone: onComplete, onFail: onFailed});
  });

  function onFailed() {
    onComplete();
  }
  function onComplete() {
    vk__adsLight.updateProgress = 3;
  }
}

AdsLight.sendExperimentStat = function (statsCodeBase, stat_type) {
  if (Math.random() >= 0.05) {
    return;
  }

  var statCode;
  switch (stat_type) {
    case 'try': {
      statCode = statsCodeBase + 1;
    } break;
    case 'success': {
      statCode = statsCodeBase + 2;
    } break;
    case 'fail': {
      statCode = statsCodeBase + 3;
    } break;
    case 'noresult': {
      statCode = statsCodeBase + 7;
    } break;

    default: {
      return;
    } break;
  }

  ajax.post('/wkview.php?act=mlet&mt='+statCode, {}, {onFail: function () { return true; }});
}

AdsLight.tryExperiment = function (lineup) {
  for (var experimentIndex in lineup) {
    experimentIndex = intval(experimentIndex);
    var parts = lineup[experimentIndex].split(':');
    var experimentName = parts[0];
    var statsCodeBase = parseInt(parts[1]);
    var experimentParams = parts.slice(2);

    vk__adsLight.yaDirectAdActive = false;
    switch (experimentName) {
      case 'ya_direct': {
        vk__adsLight.yaCloseLink = experimentParams[0];

        if (!vk__adsLight.yaDirectLoaded) {
          if (vk__adsLight.yaDirectLoadTries > 3) { // ya.d did not load within 1 second
            continue;
          } else {
            AdsLight.initYaDirect();
            setTimeout(function () {
              AdsLight.tryExperiment(lineup);
            }, 300);
          }
          return;
        }
        AdsLight.tryRenderYaDirect(experimentParams[1], statsCodeBase, lineup.slice(experimentIndex+1));
        return true;
      } break;

      case 'criteo': {
        AdsLight.tryRenderCriteo(statsCodeBase, lineup.slice(experimentIndex+1));
        return true;
      } break;

      case 'rb': {
        AdsLight.tryRenderTarget(experimentParams[0], statsCodeBase, lineup.slice(experimentIndex+1));
        return true;
      } break;

      case 'vk': {
        AdsLight.sendExperimentStat(statsCodeBase, 'try');

        var oldAdsParams = vk__adsLight.adsParams;
        vk__adsLight.adsParams = vk__adsLight.adsParams || {};
        vk__adsLight.adsParams.ignore_experiments = statsCodeBase;
        AdsLight.updateBlock('force_hard', 2);
        vk__adsLight.adsParams = oldAdsParams;

        return true;
      } break;
    }
  }

  return false;
}

AdsLight.setNewBlock = function(adsHtml, adsSection, adsCanShow, adsShowed, adsParams) {
  if (typeof(adsSection) === 'string') {
    vk__adsLight.adsSection = adsSection;
  }
  var adsExperimentMarker = '<!--ads_experiment';
  if (adsHtml && (adsHtml.slice(0, adsExperimentMarker.length) === adsExperimentMarker)) {
    var parts = adsHtml.split(';');
    AdsLight.tryExperiment(parts.slice(1, -1));
    return;
  }
  vk__adsLight.adsCanShow = ((adsCanShow || adsCanShow === '0') ? 1 : -vkNow());
  vk__adsLight.adsShowed     = adsShowed;
  vk__adsLight.adsShowedHash = +new Date;
  if (adsParams) {
    vk__adsLight.adsParams = adsParams;
  }

  if (!adsHtml) {
    if (vk.no_ads) {
      adsHtml = '';
    } else if (vk__adsLight.adsSection === 'im' && __seenAds == 0) {
      adsHtml = '';
    } else {
      AdsLight.resizeBlockWrap([0,0], false, false, true);
      return;
    }
  }

  __adsLoaded = vkNow();

  var containerElem = ge('ads_left');
  var isContainerVisible = (containerElem && isVisible(containerElem) || vk.ad_preview);
  if (!containerElem) {
    var sideBarElem = ge('side_bar');
    if (!sideBarElem) {
      AdsLight.resizeBlockWrap([0,0], false, false, true);
      return;
    }
    containerElem = sideBarElem.appendChild(ce('div', {id: 'ads_left'}, {display: isContainerVisible ? 'block' : 'none'}));
  }

  AdsLight.showNewBlock(containerElem, adsHtml, isContainerVisible);

  if (window.vk && vk.ads_rotate_interval && vk__adsLight.adsSection === 'web') {
    clearInterval(vk__adsLight.reloadTimer);
    vk__adsLight.reloadTimer = setInterval(function(){
      if (vkNow() - __adsLoaded >= vk.ads_rotate_interval && vkNow() - vk__adsLight.userEventTime <= vk.ads_rotate_interval * 3 / 4) { // Check part of ads_rotate_interval for user actions to prevent side effects when rotating ads cause window to scroll
        __adsLoaded = 0;
        AdsLight.updateBlock();
      }
    }, vk.ads_rotate_interval);
  }

  if (!isVisible(containerElem) && vk.id % 17 < 16) {
    setTimeout(function () {
      AdsLight.forceLeftAdVisibility();
    }, 200);
  }

  setTimeout(function() {
    vk__adsLight.updateProgress = 3;
    AdsLight.onAdsShowed(0);
  }, 100);
}

  AdsLight.forceLeftAdVisibility = function() {
    var elem = ge('ads_left');
    if (elem) {
      var nest = geByClass1('ads_ads_box', elem);
      elem.style.setProperty('visibility', 'visible', 'important');
      elem.style.setProperty('display', 'block', 'important');
      if (nest) {
        nest.style.setProperty('visibility', 'visible', 'important');
        nest.style.setProperty('display', 'table', 'important');
      }
    }
  }


AdsLight.showNewBlock = function(containerElem, adsHtml, isContainerVisible) {
  if (!isContainerVisible || browserLight.msie6 || browserLight.msie7) {
    if (!isContainerVisible) {
      debugLog('Ads container is hidden');
    }
    containerElem.innerHTML = adsHtml;
    var newSize = AdsLight.getBlockSize(containerElem);
    AdsLight.resizeBlockWrap(newSize, false, false, true);
    AdsLight.updateExternalStats(containerElem);
    return;
  }

  var containerElemY   = getXY(containerElem)[1];
  var scrollY          = scrollGetY();
  var isNewBlockEmpty  = !adsHtml;
  var speed            = ((containerElemY + 50 > scrollY + lastWindowHeight) ? 0 : 200);
  var oldSize          = AdsLight.getBlockSize(containerElem);
  var lastSize         = [0, 0];
  var newBlockElem     = containerElem.appendChild((typeof(adsHtml) === 'string') ? ce('div', {innerHTML: adsHtml}, {display: 'none'}) : adsHtml);
  var newBlockSizeElem = (geByClass1('ads_ads_box3', newBlockElem) || newBlockElem);

  var imagesElems   = geByTag('img', newBlockElem);
  var imagesObjects = [];
  for (var i = 0, len = imagesElems.length; i < len; i++) {
    var imageObject = vkImage();
    imageObject.onload  = delayedResizeBlockWrap;
    imageObject.onerror = delayedResizeBlockWrap;
    imageObject.src = imagesElems[i].src;
    imagesObjects.push(imageObject);
  }

  // Wait images then show ads
  clearInterval(vk__adsLight.imagesTimer);
  vk__adsLight.imagesTimer = setInterval(waitIamges.pbind({count: 40}), 50); // 2 seconds

  function waitIamges(context) {
    if (--context.count > 0) {
      for (var i in imagesObjects) {
        if (!imagesObjects[i].width || !imagesObjects[i].height) {
          return;
        }
      }
    }
    clearInterval(vk__adsLight.imagesTimer);
    startShowingNewBlock();
  }
  function delayedResizeBlockWrap() {
    if (isVisible(newBlockElem)) {
      var newSize = AdsLight.getBlockSize(newBlockSizeElem);
      newSize = AdsLight.resizeBlockWrap(newSize, oldSize, lastSize);
    }
  }
  function startShowingNewBlock() {
    setStyle(containerElem, {overflow: 'hidden'});
    // zIndex: 10 - To be upper then previous block and hiders after closing ads
    // width: '100%' - For correct horizontal centering.
    setStyle(newBlockElem, {display: 'block', position: 'absolute', left: 0, top: 0, opacity: 0, zIndex: 10, width: '100%'});

    var newSize = AdsLight.getBlockSize(newBlockSizeElem);
    newSize = AdsLight.resizeBlockWrap(newSize, oldSize, lastSize);

    if (isNewBlockEmpty) {
      showNewBlock();
    } else {
      // Resize container
      animate(containerElem, {width: newSize[0], height: newSize[1]}, speed, showNewBlock.pbind());
    }
  }
  function showNewBlock() {
    cleanElems(containerElem);

    var newSize = AdsLight.getBlockSize(newBlockSizeElem);
    newSize = AdsLight.resizeBlockWrap(newSize, false, lastSize, true);

    if (isNewBlockEmpty) {
      startRemovingOldBlock();
    } else {
      animate(newBlockElem, {opacity: 1}, speed, startRemovingOldBlock.pbind());
    }
  }
  function startRemovingOldBlock() {
    if (isNewBlockEmpty) {
      if (newBlockElem.previousSibling) {
        var elem = newBlockElem;
        while (elem = elem.previousSibling) {
          var callback = (elem.previousSibling ? null : removeOldBlock.pbind());
          animate(elem, {opacity: 0}, speed, callback);
        }
      } else {
        removeOldBlock();
      }
    } else {
      removeOldBlock();
    }
  }
  function removeOldBlock() {
    cleanElems(newBlockElem);

    while (newBlockElem.previousSibling) {
      re(newBlockElem.previousSibling);
    }
    setStyle(newBlockElem, {position: 'static', zIndex: '', width: ''});
    setStyle(containerElem, {width: '', height: '', overflow: 'visible'});

    // Update site layout
    if (window.updSideTopLink) updSideTopLink();

    AdsLight.updateExternalStats(containerElem);

    if (!isNewBlockEmpty) {
      AdsLight.scrollToPreview();
    }
  }
}

AdsLight.updateExternalStats = function(containerElem) {
  var elems;
  if (containerElem && containerElem.getAttribute('external_stats_src')) {
    elems = [containerElem];
  } else {
    elems = geByClass('ads_ad_external_stats', containerElem);
  }
  for (var i = 0, elem; elem = elems[i]; i++) {
    if (elem.getAttribute('external_stats_complete')) {
      continue;
    }
    elem.setAttribute('external_stats_complete', 1);
    vkImage().src = elem.getAttribute('external_stats_src');
  }
}

AdsLight.addAdsToApply = function(adsIdsApply) {
  var adsIdsApplyNeeded;
  if (window.cur) {
    if (!window.cur.adsIdsApplyNeeded) {
      window.cur.adsIdsApplyNeeded = {};
    }
    adsIdsApplyNeeded = window.cur.adsIdsApplyNeeded;
  } else {
    adsIdsApplyNeeded = vk__adsLight.adsIdsApplyNeeded;
  }
  for (var elemId in adsIdsApply) {
    adsIdsApplyNeeded[elemId] = adsIdsApply[elemId];
  }
  AdsLight.applyAds();
}

AdsLight.applyAds = function(delayed) {
  var adsIdsApplyNeeded = (window.cur && window.cur.adsIdsApplyNeeded || vk__adsLight.adsIdsApplyNeeded || {});
  if (isEmpty(adsIdsApplyNeeded)) {
    return;
  }
  if (!delayed) {
    clearTimeout(vk__adsLight.adsIdsApplyTimer);
    vk__adsLight.adsIdsApplyTimer = setTimeout(AdsLight.applyAds.pbind(true), 100);
    return;
  }

  check();

  function check() {
    for (var elemId in adsIdsApplyNeeded) {
      var elem = ge(elemId);
      if (!elem) {
        delete adsIdsApplyNeeded[elemId];
        continue;
      }
      elemRect = elem.getBoundingClientRect();
      if (elemRect.bottom > 0 && elemRect.top < lastWindowHeight) {
        var pointElem1 = document.elementFromPoint(elemRect.left + 1, elemRect.top + 1);
        var pointElem2 = document.elementFromPoint(elemRect.right - 1, elemRect.bottom - 1);
        var isElemVisible = (pointElem1 && (pointElem1 === elem || isAncestor(pointElem1, elem)) || pointElem2 && (pointElem2 === elem || isAncestor(pointElem2, elem)));
        if (isElemVisible) {
          vk__adsLight.adsIdsApplyProcess.push(adsIdsApplyNeeded[elemId][0]);
          delete adsIdsApplyNeeded[elemId];
          continue;
        }
      }
      if (adsIdsApplyNeeded[elemId][1] && (vkNow() - vk.started) / 1000 > adsIdsApplyNeeded[elemId][1]) {
        re(elem);
        delete adsIdsApplyNeeded[elemId];
      }
    }
    request();
  }
  function request(delayed) {
    if (vk__adsLight.adsIdsApplyProcess.length == 0) {
      return;
    }
    if (vk__adsLight.adsIdsApplyLocked) {
      return;
    }
    if (!delayed) {
      clearTimeout(vk__adsLight.adsIdsApplyTimer);
      vk__adsLight.adsIdsApplyTimer = setTimeout(request.pbind(true), 100);
      return;
    }

    vk__adsLight.adsIdsApplyLocked = true;

    var ajaxParams = {};
    ajaxParams.ads_ids_apply = vk__adsLight.adsIdsApplyProcess.join(';');
    if (cur && cur.adsDelayedViewsSrc) {
      ajaxParams.ads_src = cur.adsDelayedViewsSrc;
    }

    vk__adsLight.adsIdsApplyProcess = [];

    ajax.post('/ads_light.php?act=apply_views', ajaxParams, {onDone: onComplete, onFail: onComplete})
  }
  function onComplete(response) {
    vk__adsLight.adsIdsApplyLocked = false;
    if (!response || !isObject(response)) {
      return;
    }
    for (var blockIdSuffix in response) {
      var elem = ge('ads_ad_box2_' + blockIdSuffix);
      if (!elem) {
        continue;
      }
      for (var key in response[blockIdSuffix]) {
        elem.setAttribute(key, response[blockIdSuffix][key]);
      }
    }

    AdsLight.applyAds();
  }
}

AdsLight.isVisibleBlockWrap = function(forceLocal) {
  var containerElem = ge('ads_left');
  var containerRect = containerElem.getBoundingClientRect();
  var coords = [];
  if (containerRect.right && containerRect.bottom) {
    coords.push([containerRect.left + (containerRect.right - containerRect.left) * 1 / 5, containerRect.top + (containerRect.bottom - containerRect.top) * 1 / 5]);
    coords.push([containerRect.left + (containerRect.right - containerRect.left) * 4 / 5, containerRect.top + (containerRect.bottom - containerRect.top) * 4 / 5]);
  }

  AdsLight.isVisibleBlockWrapCoords(coords, containerElem, onComplete, forceLocal);

  return vk__adsLight.wrapVisible;

  function onComplete(isVisibleWrap) {
    vk__adsLight.wrapVisible = isVisibleWrap;
  }
}

AdsLight.isVisibleBlockWrapCoords = function(coords, containerElem, onComplete, forceLocal) {

  var isVisibleWrap = false;
  var coordsNew = [];
  for (var i = 0, len = coords.length; i < len; i++) {
    var elem          = document.elementFromPoint(coords[i][0], coords[i][1]);
    var isVisibleElem = (elem && (elem === containerElem || isAncestor(elem, containerElem)));
    var isVisibleWrap = (isVisibleWrap || isVisibleElem);
    if (isVisibleElem) {
      coordsNew.push(coords[i]);
    }
  }
  isVisibleWrap = !!isVisibleWrap;

  var completeTimer;
  var onCompleteCurrent = function(isVisibleWrapNew) {
    clearTimeout(completeTimer);
    onComplete((isVisibleWrapNew !== undefined) ? isVisibleWrapNew : isVisibleWrap);
  }

  if (!forceLocal && coordsNew.length && window != parent && isVkDomain && vk__adsLight.adsSection === 'web' && vk__adsLight.rpc && vk__adsLight.rpc.callMethod) {
    vk__adsLight.rpc.callMethod('publish', 'ads.isVisibleBlockWrap', coordsNew, onCompleteCurrent);
    completeTimer = setTimeout(onCompleteCurrent, 300); // Period must be lower than in updateBlock
  } else if (!forceLocal && coordsNew.length && window != parent && !isVkDomain && window.VK && VK.callMethod) {
    VK.callMethod('adsPublish', 'ads.isVisibleBlockWrap', coordsNew, onCompleteCurrent);
    completeTimer = setTimeout(onCompleteCurrent, 300); // Period must be lower than in updateBlock
  } else {
    onCompleteCurrent();
  }

  function isAncestor(elem, ancestor) {
    if (!elem || !ancestor) {
      return false;
    }
    while (elem = elem.parentNode) {
      if (elem === ancestor) {
        return true;
      }
    }
    return false;
  }
}

AdsLight.isVisibleBlockWrapRpc = function(coords, onComplete, widgetId) {
  var containerElem;
  if (widgetId) {
    containerElem = VK.Widgets.RPC[widgetId].frame;
  } else {
    containerElem = cur.app.frame;
  }

  var contanerRect = containerElem.getBoundingClientRect();

  var coordsNew = [];
  for (var i = 0, len = coords.length; i < len; i++) {
    var newX = coords[i][0] + contanerRect.left;
    var newY = coords[i][1] + contanerRect.top;
    coordsNew.push([newX, newY]);
  }

  AdsLight.isVisibleBlockWrapCoords(coordsNew, containerElem, onComplete);
}

AdsLight.getBlockSize = function(blockElem) {
  var adBoxes1 = geByClass('ads_ad_box', blockElem);
  var adBoxes5 = geByClass('ads_ad_box5', blockElem);

  each(adBoxes5, function(index, elem) { addClass(elem, 'max_size'); });

  if (browserLight.msie8) {
    each(adBoxes1, function(index, elem) {
      var width = Math.ceil(floatval(getStyle(elem, 'width')));
      var widthMax = Math.ceil(floatval(getStyle(elem, 'max-width')));
      if (widthMax && widthMax > 200 && width >= widthMax) {
        elem.style.width = widthMax + 'px';
      }
    });
  }

  var blockWidth  = Math.ceil(floatval(getStyle(blockElem, 'width')));
  var blockHeight = Math.ceil(floatval(getStyle(blockElem, 'height')));
  var blockSize = [blockWidth, blockHeight];

  each(adBoxes5, function(index, elem) { removeClass(elem, 'max_size'); });

  return blockSize;
}

AdsLight.resizeBlockWrap = function(newSize, oldSize, lastSize, forceResize) {
  if (!newSize) {
    return [0, 0];
  }

  var newWidth  = newSize[0];
  var newHeight = newSize[1];
  if (newWidth && vk__adsLight.adsParams && vk__adsLight.adsParams.ads_ad_unit_width_real > newWidth) {
    newWidth = vk__adsLight.adsParams.ads_ad_unit_width_real;
  }
  if (newHeight && vk__adsLight.adsParams && vk__adsLight.adsParams.ads_ad_unit_height_real > newHeight) {
    newHeight = vk__adsLight.adsParams.ads_ad_unit_height_real;
  }
  var isResizeWidth  = !!(forceResize || oldSize && newWidth > oldSize[0] || lastSize && lastSize[0] && newWidth > lastSize[0]);
  var isResizeHeight = !!(forceResize || oldSize && newHeight > oldSize[1] || lastSize && lastSize[1] && newHeight > lastSize[1]);
  if (!isResizeWidth && !isResizeHeight) {
    return [newWidth, newHeight];
  }
  if (lastSize) {
    if (isResizeWidth) {
      lastSize[0] = newWidth;
    }
    if (isResizeHeight) {
      lastSize[1] = newHeight;
    }
  }

  if (isVkDomain && vk__adsLight.adsSection === 'web' && vk__adsLight.rpc && vk__adsLight.rpc.callMethod) {
    vk__adsLight.rpc.callMethod('resizeWidget', isResizeWidth && newWidth, isResizeHeight && newHeight);
  }

  return [newWidth, newHeight];
}

AdsLight.loadAds = function() {
  if (!isVkDomain || !vk__adsLight.loaderParams || vk__adsLight.loadComplete) {
    return;
  }
  vk__adsLight.loadComplete = 1;

  var adsParamsExport = vk__adsLight.adsParamsExport;
  delete vk__adsLight.adsParamsExport;

  var ajaxParams = {};

  for (var i in vk__adsLight.loaderParams) {
    ajaxParams[i] = vk__adsLight.loaderParams[i];
  }

  ajaxParams.url = document.referrer;
  try { ajaxParams.url_top = top.location.toString(); } catch (e) {}

  var isVisibleWeb = AdsLight.isVisibleBlockWrap(true);
  if (!isVisibleWeb) {
    ajaxParams.web_invisible = 1;
  }

  if (document.documentMode) {
    ajaxParams.ie_document_mode = document.documentMode;
  }

  AdsLight.doRequest(function(){
    ajaxParams.ads_showed = AdsLight.getAdsShowed();
    ajax.post('/ads_rotate.php?act=ads_web', ajaxParams, {onDone: onComplete, onFail: onComplete});
  });

  function onComplete(response, nothing, js) {
    vk__adsLight.updateProgress = 3;

    if (response && isObject(response) && 'ads_html' in response) {
      var styleElemOld = ge('ads_style_web_loader');
      var sheetOld     = (styleElemOld.sheet ? styleElemOld.sheet : styleElemOld.styleSheet);
      var deleteFunc   = (sheetOld.deleteRule ? 'deleteRule' : 'removeRule');
      sheetOld[deleteFunc](0);

      var styleElemNew = ce('style', {type: 'text/css'})
      if (styleElemNew.styleSheet) {
        styleElemNew.styleSheet.cssText = response.css;
      } else {
        styleElemNew.appendChild(document.createTextNode(response.css));
      }
      headNode.appendChild(styleElemNew);

      AdsLight.setNewBlock(response.ads_html, response.ads_section, response.ads_can_show, response.ads_showed, response.ads_params);

      var adsParamsExport = response.ads_params_export;
      if (adsParamsExport.ads_params_unclean) {
        delete adsParamsExport.ads_params_unclean;
        for (var i in adsParamsExport) {
          adsParamsExport[i] = unclean(adsParamsExport[i]);
        }
      }

      vk__adsLight.rpc.callMethod('adsOnInit', response.ads_count, adsParamsExport);

      vk__adsLight.loadComplete = 2;
    } else {
      if (typeof(js) === 'string') {
        try {
          eval(js);
        } catch (e) {
          debugLog(e);
        }
      }
      AdsLight.loadAdsFailed(-3001, adsParamsExport);
    }
  }
}

AdsLight.loadAdsFailed = function(errorCode, adsParamsExport) {
  if (!vk__adsLight.rpc) {
    return false;
  }
  if (vk__adsLight.loadComplete === -1) {
    return true;
  }
  vk__adsLight.loadComplete = -1;

  if (adsParamsExport.ads_params_unclean) {
    delete adsParamsExport.ads_params_unclean;
    for (var i in adsParamsExport) {
      adsParamsExport[i] = unclean(adsParamsExport[i]);
    }
  }

  vk__adsLight.rpc.callMethod('resizeWidget', 0, 0);
  vk__adsLight.rpc.callMethod('adsOnInit', errorCode, adsParamsExport);

  return true;
}

AdsLight.handleAllAds = function(box, adsMore, adsIdsApply, adsHeightMore) {

  var moreLocked    = false;
  var needAdsHeight = false;

  boxLayerWrap.scrollTop = 0;

  var boxOptions = {};
  boxOptions.onClean = deinit;
  box.setOptions(boxOptions);

  if (adsMore) {
    addEvent(boxLayerWrap, 'scroll', onScroll);
  }
  allowApply();
  onScroll();

  function deinit() {
    removeEvent(boxLayerWrap, 'scroll', onScroll);
    hide('ads_ads_all_ads_more');
  }
  function checkDeinit() {
    var adsIdsApplyNeeded = (window.cur && window.cur.adsIdsApplyNeeded || vk__adsLight.adsIdsApplyNeeded || {});
    if (!adsMore && isEmpty(adsIdsApplyNeeded)) {
      deinit();
    }
  }
  function allowApply(delayed) {
    if (!delayed) {
      setTimeout(allowApply.pbind(true), 500);
      return;
    }
    AdsLight.addAdsToApply(adsIdsApply);
    onScroll();
  }
  function onScroll() {
    var moreElem = ge('ads_ads_all_ads_more');
    if (!moreElem) {
      return;
    }
    var moreRect = moreElem.getBoundingClientRect()
    if (moreRect.top < lastWindowHeight + adsHeightMore) {
      needAdsHeight = Math.round(Math.max(needAdsHeight, lastWindowHeight - moreRect.top + adsHeightMore));
      moreAds();
    }

    AdsLight.applyAds();

    checkDeinit();
  }
  function moreAds(delayed) {
    if (!delayed) {
      setTimeout(moreAds.pbind(true), 100);
      return;
    }
    if (!adsMore) {
      return;
    }
    if (!needAdsHeight) {
      return;
    }
    if (moreLocked) {
      return;
    }
    moreLocked = true;

    var ajaxParams = {};
    ajaxParams.ads_more = adsMore;
    ajaxParams.ads_height = needAdsHeight;

    ajax.post('/ads_light.php?act=all_ads_more', ajaxParams, {onDone: onDoneMoreAds, onFail: onFailMoreAds})
  }
  function onDoneMoreAds(response) {
    moreLocked = false;
    if (!response) {
      onFailMoreAds();
      return;
    }
    adsMore = response.ads_more;
    AdsLight.addAdsToApply(response.ads_ids_apply);
    if (response.ads_html) {
      var adsElem = ge('ads_ads_all_ads_rows');
      var moreElem = ge('ads_ads_all_ads_more');
      if (adsElem) {
        adsElem.innerHTML += response.ads_html;
        needAdsHeight = false;
        onScroll();
      }
      if (moreElem) {
        moreElem.height = response.ads_more_height;
      }
    }
    checkDeinit();
  }
  function onFailMoreAds() {
    moreLocked = false;
    return true;
  }
}

AdsLight.blockOverOut = function(event, elemCur, targetClass) {
  var isOver = (event.type === 'mouseover');
  var elemTarget;
  var opacity = false;
  if (hasClass(elemCur, targetClass)) {
    elemTarget = elemCur;
    toggleClass(elemTarget, 'over', isOver);
    opacity = (isOver ? 1 : 0.3);
  } else {
    elemTarget = geByClass1(targetClass, elemTarget);
    elemTarget.over = 1;
    if (!hasClass(elemTarget, 'over')) {
      opacity = (isOver ? 0.3 : 0);
    }
  }
  if (opacity !== false) {
    animate(elemTarget, {opacity: opacity}, 200);
  }
  if (isOver && elemCur == elemTarget) {
    var tooltipTextElem = geByClass1('tooltip_text', elemTarget);
    if (tooltipTextElem) {
      showTooltip(elemTarget, {text: tooltipTextElem.innerHTML, showdt: 0, black: 1, shift: [14, 3, 3]});
    }
  }
}

AdsLight.closeNewsBlock = function(elem, hash, ads_section) {
  while (!hasClass(elem, 'feed_row')) elem = elem.parentNode;
  slideUp(elem, 200);
  ajax.post('/ads_light.php?act=close_news', {hash: hash, ads_section: ads_section}, {onDone: onComplete, onFail: onComplete});
  function onComplete() {
    return true;
  }
}

AdsLight.scrollToPreview = function(delayed) {
  if (!delayed) {
    setTimeout(AdsLight.scrollToPreview.pbind(true), 100);
    return;
  }
  var elem = geByClass1('ads_ads_preview');
  if (!elem || hasClass(elem, 'ads_ads_preview_viewed')) {
    return;
  }
  addClass(elem, 'ads_ads_preview_viewed');
  var scrollY = scrollGetY();
  var elemY = getXY(elem)[1];
  var elemHeight = getSize(elem)[1];
  if (elemY + elemHeight > scrollY + lastWindowHeight) {
    scrollToY(elemY - (lastWindowHeight - elemHeight) / 2, 500);
  }
}

AdsLight.overrideClickEvents = function(targetElem, noDestroy) {
  if (!targetElem) {
    return false;
  }
  var onclickInside  = targetElem.getAttribute('onclick_inside');
  var onclickOutside = targetElem.getAttribute('onclick_outside');
  if (!onclickOutside) {
    return false;
  }
  onclickInside  = new Function(onclickInside || onclickOutside);
  onclickOutside = new Function(onclickOutside);

  var elems = geByTag('a', targetElem);
  for (var i = 0, elem; elem = elems[i]; i++) {
    elem.setAttribute('_href', elem.href);
    elem.removeAttribute('href');
  }

  var skipEvents = false;

  addEvent(targetElem, 'click dblclick mousedown mouseup touchstart touchmove touchend', onEvent, false, false, true);
  if (!noDestroy) {
    cur.destroy.push(function(targetElem){ cleanElems(targetElem); }.pbind(targetElem));
  }

  return true;

  function onEvent(event) {
    event = normEvent(event);
    if (!skipEvents) {
      if (event.type == 'mouseup' && (event.which == 2 || event.which == 1 && checkEvent(event))) { // Middle button or left button with control button
        skipEvents = true;
        setTimeout(function() { skipEvents = false; }, 100);
        onclickOutside();
      } else if (event.type == 'click' && event.which == 1) { // Left button
        onclickInside();
      }
    }
    return cancelEvent(event);
  }
}

AdsLight.initYaDirect = function() {
    vk__adsLight.yaDirectLoadTries++;
    if (vk__adsLight.yaDirectLoading) {
      return;
    }
    vk__adsLight.yaDirectLoading = true;
    (function(w, d, n, s, t) {
      w[n] = w[n] || [];
      w[n].push(function() {
        vk__adsLight.yaDirectLoaded = true;
        vk__adsLight.yaDirectLoading = false;
      });
      t = d.getElementsByTagName("script")[0];
      s = d.createElement("script");
      s.type = "text/javascript";
      s.src = "//an.yandex.ru/system/context.js";
      s.async = true;
      t.parentNode.insertBefore(s, t);
    })(window, window.document, "yandexContextAsyncCallbacks");
  }

AdsLight.tryRenderYaDirect = function (blockId, statsCodeBase, nextLineup) {
  if (!vk__adsLight.yaDirectLoaded) {
    return;
  }
  var yaContainerId = 'yandex_ad_'+blockId;
  var yaContainer;
  if (!ge(yaContainerId)) {
    yaContainer = ce('div', {id: yaContainerId});
    var leftAdsContainer = ge('ads_left');
    leftAdsContainer.appendChild(yaContainer);
  } else {
    animate(ge(yaContainerId), {
      opacity: 0
    }, 200, function () {
      re(yaContainerId);
      AdsLight.tryRenderYaDirect(blockId, statsCodeBase, nextLineup);
    });
    return;
  }
  yaContainer = ge(yaContainerId);

  Ya.Context.AdvManager.render({
    blockId: blockId,
    renderTo: yaContainerId,
    async: true,
    onRender: function () {
      AdsLight.sendExperimentStat(statsCodeBase, 'success');
      AdsLight.onYaDirectRenderSuccessful(yaContainer);
    }
  }, function () {
    AdsLight.sendExperimentStat(statsCodeBase, 'fail');
    AdsLight.onYaDirectRenderUnsuccessful(nextLineup);
  });

  AdsLight.sendExperimentStat(statsCodeBase, 'try');
}

AdsLight.onYaDirectRenderSuccessful = function (adsContainer) {
  if (vk__adsLight.yaCloseLink) {
    var wrapper = se('<div id="ya_direct" style="display:none;" onmouseover="leftBlockOver(\'ya_direct\');" onmouseout="leftBlockOut(\'ya_direct\');"><div id="left_hideya_direct" class="left_hide_button" onmouseover="leftBlockOver(this);" onmouseout="leftBlockOut(this);" onclick="leftAdBlockClose(\'ya_direct\', \''+vk__adsLight.yaCloseLink+'\'); return cancelEvent(event);"></div></div>');
    wrapper.appendChild(adsContainer);
    adsContainer = wrapper;
  }
  AdsLight.showNewBlock(ge('ads_left'), adsContainer, true);
  vk__adsLight.yaDirectAdActive = true;
}

AdsLight.onYaDirectRenderUnsuccessful = function (nextLineup) {
  vk__adsLight.yaDirectAdActive = false;

  AdsLight.tryExperiment(nextLineup);
}

AdsLight.tryRenderCriteo = function (statsCodeBase, nextLineup) {
  var iframeId = 'criteo-iframe';
  var iframe = ge(iframeId);
  if (iframe) {
    animate(iframe, {
      opacity: 0
    }, 200, function () {
      re(iframe);
      AdsLight.tryRenderCriteo(nextLineup);
    });
    return;
  }
  AdsLight.sendExperimentStat(statsCodeBase, 'try');

  iframe = ce('iframe', {
    "id":           iframeId,
    "frameBorder":  "0",
    "marginWidth":  "0",
    "marginHeight": "0",
    "height":       "0",
    "width":        "118",
    "scrolling":    "no"
  }, {
    opacity: 0
  });

  iframe.onload = function () {
    if (iframe.contentDocument.body.scrollHeight > 400) { // content loaded
      AdsLight.sendExperimentStat(statsCodeBase, 'success');
      iframe.height = 600;
      animate(iframe, {
        opacity: 1
      }, 200);
    } else { // failed
      AdsLight.sendExperimentStat(statsCodeBase, 'fail');
      re(iframe);
      AdsLight.tryExperiment(nextLineup);
    }
  };
  iframe.src = '/ads_light.php?act=criteo';
  ge('ads_left').appendChild(iframe);
}

AdsLight.getRBAds = function (container_id, onsuccess, onfail, params) {
  var callback = "__rb" + new Date().getTime(),
    SLOT = "13270",
    url = "https://ad.mail.ru/adq/?callback=" +callback+ "&q%5B%5D=" + SLOT + "%3Fn%3D" + encodeURIComponent(container_id),
    prms = {}, // {bdate: '12.09.1989', sex: 1}
    errorTimeout,
    TIMEOUT_TIME = 5e3;

  function ajax(url, succ, err) {
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(function () {
      err({
        "reason": "timeout"
      });
    }, TIMEOUT_TIME);
    window[callback] = function(e) {
      clearTimeout(errorTimeout);
      if (e && e[0] && e[0].html) {
        try {
          var containerElem = ge(container_id);
          var isContainerVisible = (containerElem && isVisible(containerElem) || vk.ad_preview);
          if (!containerElem) {
            var sideBarElem = ge('side_bar');
            if (!sideBarElem) {
              AdsLight.resizeBlockWrap([0,0], false, false, true);
              return;
            }
            containerElem = sideBarElem.appendChild(ce('div', {id: 'ads_left'}, {display: isContainerVisible ? 'block' : 'none'}));
          }

          AdsLight.showNewBlock(containerElem, e[0].html, isContainerVisible);
        }catch(E){}
        succ(e);
      } else {
        err({
          "reason": "no-ads"
        });
      }
    }
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  if (params && params.test_id) prms.test_id = params.test_id;
  if (params && params.vk_id) prms.vk_id = params.vk_id;

  var param_id;
  for (param_id in prms){
    url += "&" + param_id + "=" + prms[param_id];
  }

  ajax(url, onsuccess, onfail);
}

AdsLight.tryRenderTarget = function (test_group_id, statsCodeBase, nextLineup) {
  var params = {};
  if (test_group_id) {
    params.test_id = test_group_id;
  }
  if (window.vk && vk.id) {
    params.vk_id = vk.id;
  }

  AdsLight.sendExperimentStat(statsCodeBase, 'try');

  var targetNoResultTimeout = setTimeout(function () {
    // no result after 5 seconds, this is suspicious
    AdsLight.sendExperimentStat(statsCodeBase, 'noresult');
  }, 5000);
  stManager.add(['mrtarg.js', 'mrtarg.css'], function() {
    AdsLight.getRBAds('ads_left', function () { // ok
      clearTimeout(targetNoResultTimeout);
      AdsLight.sendExperimentStat(statsCodeBase, 'success');
      if (window.RB && window.RB.doCheck) {
        window.RB.doCheck();
      }
    }, function (data) { // fail
      clearTimeout(targetNoResultTimeout);
      AdsLight.sendExperimentStat(statsCodeBase, 'fail');
      AdsLight.tryExperiment(nextLineup);
    }, params);
  });
}

AdsLight.init();

})();

try{stManager.done('aes_light.js');}catch(e){}
