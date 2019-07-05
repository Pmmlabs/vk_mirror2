var AdsEdit = {};

AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE = 1;
AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE = 2;
AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE = 3;
AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY = 4;
AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS = 5;
AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE = 6;
AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY = 7;
AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY = 8;
AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST = 9;
AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP = 10;
AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD = 11;
AdsEdit.ADS_AD_FORMAT_TYPE_STORY = 12;

AdsEdit.ADS_AD_LINK_TYPE_GROUP = 1;
AdsEdit.ADS_AD_LINK_TYPE_EVENT = 2;
AdsEdit.ADS_AD_LINK_TYPE_MARKET = 3;
AdsEdit.ADS_AD_LINK_TYPE_APP = 4;
AdsEdit.ADS_AD_LINK_TYPE_URL = 5;
AdsEdit.ADS_AD_LINK_TYPE_PUBLIC = 6;
AdsEdit.ADS_AD_LINK_TYPE_VIDEO = 7;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID = 8;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE = 9;
AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE = 10;
AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW = 11;
AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH = 12;
AdsEdit.ADS_AD_LINK_TYPE_STORY = 13;
AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP = [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC];
AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP = [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE];
AdsEdit.ADS_AD_LINK_TYPES_ALL_POST = [AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW, AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH];

AdsEdit.ADS_AD_COST_TYPE_CLICK = 0;
AdsEdit.ADS_AD_COST_TYPE_VIEWS = 1;

AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_UNKNOWN = '';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_SMALL = 's';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MEDIUM = 'm';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_BIG = 'b';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY = 'p';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL = 'a';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE = 'k';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG = 'e';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE = 'd';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON = 'i';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD = 't';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON = 'n';
AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON = 'c';

AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_LINK_OBJECT = 'link_object';
AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_CRITERIA = 'criteria';

AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD = 0;
AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW = 1;
AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET = 2;
AdsEdit.ADS_CAMPAIGN_TYPE_UI_EASY_PROMOTE_AUTO = 3; // see ads_edit_easy.js

AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE = 1;

AdsEdit.ADS_AD_PLATFORM_STORIES_NO_PROMO = (1 << 4);

AdsEdit.init = function() {
    cur.toClean = {};
    cur.destroy.push(function() {
        AdsEdit.destroy();
    });

    cur.editor = new AdsEditor();
    cur.viewEditor = new AdsViewEditor();
    cur.targetingEditor = new AdsTargetingEditor();

    cur.viewEditor.init({}, cur.editor, cur.targetingEditor, cur.adParams, cur.adParamsData, cur.adParamsParams);
    cur.destroy.push(function() {
        cur.viewEditor.destroy();
    });

    cur.targetingEditor.init({}, cur.editor, cur.viewEditor, cur.targetingCriteria, cur.targetingCriteriaData, cur.targetingCriteriaRanges, cur.targetingCriteriaParams, cur.targetingGroups);

    cur.destroy.push(function() {
        cur.targetingEditor.destroy();
    });

    cur.editor.init(cur.viewEditor, cur.targetingEditor);
    cur.destroy.push(function() {
        cur.editor.destroy();
    });

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

    // TODO enable on realese new prediction widget
    // AdsEditComponents.renderTargetAudiencePredictionWidget(ge('ads_edit_audience_wrap'), {}, {});

    Ads.initFixed('ads_edit_audience_wrap', 59);
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

AdsEdit.invertCheckboxValue = function(value) {
    return value ? 0 : 1;
}

AdsEdit.getTextWidth = function(text) {
    var elem = ce('span', {
        innerHTML: text
    });
    document.body.appendChild(elem);
    var size = getSize(elem);
    re(elem);
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

    errorElem.innerHTML = '<div class="msg_text">' + message + '</div>';
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
    showFastBox(boxOptions, helpValue);

    cancelEvent(event);
    return false;
}

AdsEdit.initHelpTooltipTarget = function(targetElem, handler, curLocal) {
    addEvent(targetElem, 'mouseover mouseout', handler);
    curLocal.destroy.push(function() {
        removeEvent(targetElem, 'mouseover mouseout', handler);
    });
    setTimeout(function() {
        var elemsArr = [];
        elemsArr[0] = geByTag('input', targetElem);
        elemsArr[1] = geByTag('textarea', targetElem);
        for (var j = 0, elems; elems = elemsArr[j]; j++) {
            for (var i = 0, elem; elem = elems[i]; i++) {
                var nodeName = elem.nodeName.toLowerCase();
                if (!elem.readOnly && (nodeName === 'input' && elem.type.toLowerCase() === 'text' || nodeName === 'textarea')) {
                    addEvent(elem, 'focus blur', handler);
                    curLocal.destroy.push(function(elem) {
                        removeEvent(elem, 'focus blur', handler);
                    }.pbind(elem));
                }
            }
        }
    }, 500);
}

AdsEdit.initHelpTooltip = function(targetElem, handler, ttContainer, curLocal) {
    var tt = ttContainer.tt = targetElem.tt;
    curLocal.destroy.push(function() {
        tt.destroy(targetElem);
    });

    var tootltipTextElem = geByClass1('ads_edit_tt_text', tt.container);
    addEvent(tootltipTextElem, 'mouseover mouseout', handler);
    curLocal.destroy.push(function() {
        removeEvent(tootltipTextElem, 'mouseover mouseout', handler);
    });
}

AdsEdit.showHelpCriterionTooltip = function(helpTooltipName, targetElem, ttHandler, ttContainer, helpText, shiftLeft, shiftTop, curLocal, forceTooltip, isNarrow) {
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
            if (inArray(helpTooltipName, ['description', 'title', 'platform'])) {
                forceTooltip = true;
            }
        }
    }

    if ((cur.getLastTooltipText && (helpText != cur.getLastTooltipText())) && (cur.lastHelpTooltipName == helpTooltipName) && !forceTooltip) {
        var lastTooltip = cur.getLastTooltip();
        if (lastTooltip) {
            lastTooltip.hide();
            setTimeout((function() {
                this.showHelpCriterionTooltip(helpTooltipName, targetElem, ttHandler, ttContainer, helpText, shiftLeft, shiftTop, curLocal, true, isNarrow);
            }).bind(this), 500);
            return;
        }
    }
    cur.getLastTooltip = function() {
        return targetElem.tt;
    };
    cur.getLastTooltipText = function() {
        return helpText;
    };
    cur.lastHelpTooltipName = helpTooltipName;

    if (shiftLeft === undefined || shiftLeft === false || shiftLeft === null) {
        shiftLeft = -350;
    }
    if (shiftTop === undefined || shiftTop === false || shiftTop === null) {
        shiftTop = -58;
    }

    showTooltip(targetElem, {
        text: '<div class="ads_edit_tt_pointer ads_edit_tt_pointer_' + helpTooltipName + '"></div><div class="ads_edit_tt_text ' + (isNarrow ? 'ads_edit_tt_text_narrow' : '') + '">' + helpText + '</div>',
        className: 'ads_edit_tt',
        slideX: 15,
        shift: [shiftLeft, 0, isFunction(shiftTop) ? shiftTop() : shiftTop],
        nohide: true,
        forcetodown: true,
        force: !!forceTooltip,
        onCreate: function() {
            AdsEdit.initHelpTooltip(targetElem, ttHandler, ttContainer, curLocal);
        }
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
            setTimeout(function() {
                if (context.over == 1) {
                    context.over = 2;
                    context.overTimeout = setTimeout(function() {
                        showHelp();
                        delete context.overTimeout;
                    }, 100);
                }
            }, 100);
            break;
        case 'mouseout':
            context.over = 0;
            context.out = 1;
            if (context.overTimeout) {
                clearTimeout(context.overTimeout)
                delete context.overTimeout;
            }
            if (context.outTimeout) {
                clearTimeout(context.outTimeout)
                delete context.outTimeout;
            }
            setTimeout(function() {
                if (context.out == 1) {
                    context.out = 2;
                    context.outTimeout = setTimeout(function() {
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
        slideDown(groupElemId, 200, function() {
            cur.targetingEditor.showGroupEnd(groupId);
        });
    }

    if (!cur.targetingPrefs) {
        cur.targetingPrefs = {};
    }
    cur.targetingPrefs[groupId] = prefValue;

    AdsEdit.saveTargetingPrefs();
}

AdsEdit.updateTargetingGroups = function() {
    var hiderInfoElem = ge('ads_edit_targeting_group_additional_hider_info');
    hiderInfoElem.innerHTML = (cur.targetingEditor.isUserDevicesHidden() ? getLang('ads_criteria_section_additional_info_retargeting_new') : getLang('ads_criteria_section_additional_info_new'));
}

AdsEdit.saveTargetingPrefs = function(delayed) {

    if (!delayed) {
        if (cur.saveTargetingPrefsTimeout === undefined) {
            cur.destroy.push(function() {
                clearTimeout(cur.saveTargetingPrefsTimeout);
            });
        } else {
            clearTimeout(cur.saveTargetingPrefsTimeout);
        }
        cur.saveTargetingPrefsTimeout = setTimeout(function() {
            AdsEdit.saveTargetingPrefs(true);
        }, 2000);
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

    ajax.post('/adsedit?act=save_targeting_prefs', ajaxParams, {
        onFail: function() {
            return true;
        }
    });
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

    var criteriaPresets = cur.targetingEditor.criteria.criteria_presets;
    var criteriaPresetName = cur.targetingEditor.criteria.criteria_preset_name;
    if (criteriaPresets.value // ������ ������
        &&
        criteriaPresets.currentHash // ���� ��� ���������� �������
        &&
        !criteriaPresets.confirmed // ��� �� ���������� ���� � ��������������
        &&
        criteriaPresets.currentHash !== MD5(JSON.stringify(cur.targetingEditor.getCriteria())) // ��� �� ���������, �.�. ������ �������� ����� ������
        &&
        !criteriaPresetName.value // �� ������� �������� �������
    ) {
        // criteria preset changed, ask if user wants to save it
        var confirmBox = showFastBox(getLang('ads_criteria_preset_changed'), langStr(getLang('ads_save_criteria_preset'), '%s', cur.targetingEditor.criteria.criteria_presets.ui.selectedItems()[0][1]),
            getLang('global_yes'),
            function() {
                Ads.unlock('save_ad');
                cur.targetingEditor.criteria.criteria_presets.confirmed = 1;
                confirmBox.hide();
                AdsEdit.saveAd();
            },
            getLang('global_no'),
            function() {
                Ads.unlock('save_ad');
                cur.targetingEditor.criteria.criteria_presets.confirmed = -1;
                confirmBox.hide();
                AdsEdit.saveAd();
            });
        return;
    }

    var viewParams = cur.viewEditor.getParams();
    var targetingCriteria = cur.targetingEditor.getCriteria();

    var ajaxParams = {};
    ajaxParams.hash = cur.saveAdHash;
    ajaxParams = extend({}, ajaxParams, viewParams);
    ajaxParams = extend({}, ajaxParams, targetingCriteria);

    ajax.post('/adsedit?act=save_ad', ajaxParams, {
        onDone: onDone,
        onFail: onFail
    });

    function onDone(result) {
        Ads.unlock('save_ad');

        if (result && result.link_domain_continue) {
            var confirmBox = showFastBox({
                    title: getLang('ads_error_url_unreachable_title')
                },
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
            var confirmBox = showFastBox({
                    title: getLang('ads_save_ad_promoted_post_confirmation_box_title')
                },
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

    var showOptions = {
        params: {}
    };
    showOptions.cache = 1;
    showOptions.stat = ['indexer.js'];
    showOptions.params.width = 600;
    showOptions.params.bodyStyle = 'padding: 0;';

    showBox('/adsedit?act=last_ads_box', ajaxParams, showOptions);
}

AdsEdit.initLastAdsBox = function(lastAdsBox, lastAds, lastAdsKeyMap) {
    if (!cur.lastAds) {
        cur.lastAds = lastAds;
        cur.lastAdsKeyMap = lastAdsKeyMap;

        cur.lastAdsIndex = new vkIndexer(lastAds, function(obj) {
            return se(obj[lastAdsKeyMap.indexer_text]).nodeValue;
        });
    }

    var boxOptions = {}
    boxOptions.onClean = function() {
        cleanElems(ge('ads_edit_last_ads_search'), geByClass1('input_back_wrap', lastAdsBox.bodyNode), geByClass1('input_back_content', lastAdsBox.bodyNode));
    };
    lastAdsBox.setOptions(boxOptions);

    cur.lastAdsBox = lastAdsBox;

    placeholderSetup('ads_edit_last_ads_search', {
        back: true
    });

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
    cur.viewEditor.setTitle(AdsEdit.unescapeValueInit(newAd[cur.lastAdsKeyMap.title]));
    cur.viewEditor.setDescription(AdsEdit.unescapeValueInit(newAd[cur.lastAdsKeyMap.description]));
    if (newAd[cur.lastAdsKeyMap.format_photo_size]) {
        cur.viewEditor.setPhotoData(newAd[cur.lastAdsKeyMap.format_photo_size], newAd[cur.lastAdsKeyMap.photo]);
    }
    if (newAd[cur.lastAdsKeyMap.format_type] == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
        cur.viewEditor.setLinkId(newAd[cur.lastAdsKeyMap.link_id]);
    }

    cur.lastAdsBox.hide();
}

AdsEdit.drawUploadGradientProgress = function(uploadBox, loadedCount, totalCount) {
    var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
    var progressElem = geByClass1('ads_gradient_progress', uploadBox.bodyNode);
    var progressWrapElem = geByClass1('ads_edit_upload_progress_wrap2', uploadBox.bodyNode);

    if (!uploaderElem || !progressElem || !progressWrapElem) {
        debugLog('drawUploadGradientProgress: invalid box');
    }

    if (!isVisible(progressWrapElem)) {
        if (browser.msie) {
            setStyle(uploaderElem, {
                position: 'relative',
                left: '-5000px'
            });
        } else {
            setStyle(uploaderElem, {
                visibility: 'hidden'
            });
        }

        var uploaderHeight = getSize(uploaderElem)[1];
        var progressHeight = getSize(progressWrapElem)[1];
        var progressMargin = -intval((uploaderHeight + progressHeight) / 2);
        setStyle(progressWrapElem, {
            height: progressMargin,
            marginTop: progressMargin + 'px'
        });
        show(progressWrapElem);
    }

    var percent = intval(loadedCount / totalCount * 100);
    setStyle(progressElem, {
        width: percent + '%'
    });
}

AdsEdit.hideUploadGradientProgress = function(uploadBox) {
    var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
    var progressWrapElem = geByClass1('ads_edit_upload_progress_wrap2', uploadBox.bodyNode);
    hide(progressWrapElem);
    if (browser.msie) {
        setStyle(uploaderElem, {
            position: '',
            left: ''
        });
    } else {
        setStyle(uploaderElem, {
            visibility: ''
        });
    }
}

AdsEdit.showUploadPhotoBox = function(isIcon) {

    var ajaxParams = {};
    ajaxParams.format_photo_size = cur.viewEditor.getFormatPhotoSize(isIcon);

    var showOptions = {
        params: {}
    };
    showOptions.stat = ['upload.js'];
    showOptions.params.width = 470;

    showBox('/adsedit?act=upload_photo_box', ajaxParams, showOptions);
}

AdsEdit.initUploadPhotoBox = function(uploadBox, uploadUrl, uploadVars, uploadOptions) {
    uploadBox.removeButtons();
    uploadBox.addButton(getLang('box_cancel'));

    var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadBox.bodyNode);
    uploadOptions = extend({}, uploadOptions, {
        clear: true, // Destroy on cur.destroy
        onUploadStart: AdsEdit.onUploadPhotoStart.pbind(uploadBox),
        onUploadError: AdsEdit.onUploadPhotoError.pbind(uploadBox),
        onUploadComplete: AdsEdit.onUploadPhotoComplete.pbind(uploadBox),
        onUploadProgress: function(uploadIndex, bytesLoaded, bytesTotal) {
            AdsEdit.drawUploadGradientProgress(uploadBox, bytesLoaded, bytesTotal);
        }
    });
    Upload.init(uploaderElem, uploadUrl, uploadVars, uploadOptions);

    if (!cur.photoUploadDestroy) {
        cur.photoUploadDestroy = function() {
            if ('photoUploadIndex' in cur) {
                Upload.terminateUpload(cur.photoUploadIndex);
                delete cur.photoUploadIndex;
            }
        }
        cur.destroy.push(function() {
            cur.photoUploadDestroy();
        });
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

AdsEdit.onUploadPhotoStart = function(uploadBox, uploadIndex, result) {

    cur.photoUploadIndex = uploadIndex;

    if (Upload.types[uploadIndex] === 'form') {
        uploadBox.showProgress();
    } else {
        AdsEdit.drawUploadGradientProgress(uploadBox, 0, 100);
    }
    hide('ads_edit_upload_photo_error');
}

AdsEdit.onUploadPhotoError = function(uploadBox, uploadIndex, msg) {

    var errorElem = ge('ads_edit_upload_photo_error');
    if (errorElem) {
        if (msg) {
            errorElem.innerHTML = '<div class="msg_text">' + msg + '</div>';
        } else {
            errorElem.innerHTML = '<div class="msg_text">' + getLang('ads_image_upload_error') + '</div>';
        }
        show(errorElem);
    }

    uploadBox.hideProgress();
    AdsEdit.hideUploadGradientProgress(uploadBox);

    Upload.embed(uploadIndex);
}

AdsEdit.onUploadPhotoComplete = function(uploadBox, uploadIndex, result) {

    if (Upload.types[uploadIndex] !== 'form') {
        AdsEdit.drawUploadGradientProgress(uploadBox, 100, 100);
    }

    var resultParsed;
    try {
        resultParsed = parseJSON(result);
    } catch (e) {}

    if (!resultParsed || !resultParsed.photo || resultParsed.code) {
        var message;
        message = getLang('ads_photo_notloaded');
        switch (intval(resultParsed && resultParsed.code)) {
            case 1:
                message += '<br>' + getLang('ads_photo_upload_error_1');
                break;
            case 2:
                message += '<br>' + getLang('ads_photo_upload_error_2');
                break;
            case 3:
                message += '<br>' + getLang('ads_photo_upload_error_3');
                break;
            case 4:
                message += '<br>' + getLang('ads_photo_upload_error_4');
                break;
            case 5:
                message += '<br>' + getLang('ads_photo_upload_error_3');
                break;
            default:
                if (resultParsed && resultParsed.code !== undefined) {
                    message += '<br>' + getLang('ads_err_code').replace('{code}', resultParsed.code);
                }
                break;
        }
        Upload.onUploadError(uploadIndex, message);
        return;
    }

    delete cur.photoUploadIndex;
    uploadBox.hide();
    var uploadVars = Upload.vars[uploadIndex];
    var formatPhotoSize = uploadVars.size;
    AdsEdit.showCropPhotoBox(resultParsed.photo, formatPhotoSize);
}

AdsEdit.showCropPhotoBox = function(uploadPhoto, formatPhotoSize) {

    var successCrop = {
        success: false
    };
    var isIcon = inArray(formatPhotoSize, [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON]);

    var ajaxParams = {};
    ajaxParams.format_photo_size = formatPhotoSize;

    var viewParams = cur.viewEditor.getParams();
    ajaxParams.client_id = viewParams.client_id;
    ajaxParams.photo = isIcon ? viewParams.photo : uploadPhoto;
    ajaxParams.photo_icon = isIcon ? uploadPhoto : viewParams.photo_icon;
    ajaxParams.format_type = viewParams.format_type;
    ajaxParams.title = viewParams.title;
    ajaxParams.description = viewParams.description;
    ajaxParams.link_type = viewParams.link_type;
    ajaxParams.link_id = viewParams.link_id;
    ajaxParams.link_owner_id = viewParams.link_owner_id;
    ajaxParams.link_domain = viewParams.link_domain;
    ajaxParams.link_title = viewParams.link_title || cur.viewEditor.params.link_title.value_default;
    ajaxParams.link_button = viewParams.link_button;
    ajaxParams.video_id = viewParams.video_id;
    ajaxParams.video_owner_id = viewParams.video_owner_id;
    ajaxParams.video_hash = viewParams.video_hash;
    ajaxParams.disclaimer_medical = viewParams.disclaimer_medical;
    ajaxParams.disclaimer_specialist = viewParams.disclaimer_specialist;
    ajaxParams.disclaimer_supplements = viewParams.disclaimer_supplements;
    ajaxParams.disclaimer_finance = viewParams.disclaimer_finance;
    ajaxParams.disclaimer_finance_name = viewParams.disclaimer_finance_name;
    ajaxParams.disclaimer_finance_license_no = viewParams.disclaimer_finance_license_no;
    ajaxParams.age_restriction = viewParams.age_restriction;

    var showOptions = {
        params: {}
    };
    showOptions.stat = ['tagger.css', 'ads_tagger.js'];

    showBox('/adsedit?act=crop_photo_box', ajaxParams, showOptions);
}

AdsEdit.initCropPhotoBox = function(cropBox, formatPhotoSize, uploadUrl, uploadParams, cropPhotoBoxWidth, resultPhotoWidth, resultPhotoHeight, previewPhotoWidth, previewPhotoHeight, cropOptions, newSizeWidth, newSizeHeight) {
    cropBox.removeButtons();
    cropBox.addButton(getLang('box_cancel'), false, 'no');
    cropBox.addButton(getLang('box_save'), AdsEdit.saveCropPhoto.pbind(cropBox, formatPhotoSize, uploadUrl, uploadParams), 'yes');

    var destroyHintTt = Ads.initRedesignHintTooltip();
    cur.destroy.push(destroyHintTt);

    var safeZones = {};
    if (newSizeWidth && newSizeHeight) {
        var ratio = newSizeWidth / newSizeHeight,
            boxw = Math.min(resultPhotoWidth, intval(resultPhotoHeight * ratio)),
            boxh = Math.min(resultPhotoHeight, intval(boxw / ratio));
        if (boxw != resultPhotoWidth) {
            safeZones.left = Math.floor((resultPhotoWidth - boxw) / 2);
            safeZones.right = Math.ceil((resultPhotoWidth - boxw) / 2);
        }
        if (boxh != resultPhotoHeight) {
            safeZones.top = Math.floor((resultPhotoHeight - boxh) / 2);
            safeZones.bottom = Math.ceil((resultPhotoHeight - boxh) / 2);
        }
        previewPhotoWidth = newSizeWidth;
        previewPhotoHeight = newSizeHeight;
    }
    var icons = [{
        width: previewPhotoWidth,
        height: previewPhotoHeight,
        box: 'ads_edit_crop_photo_small'
    }];

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
        safeZones: safeZones
    });

    if (!cur.photoTaggerDestroy) {
        cur.photoTaggerDestroy = function() {
            if (cur.photoTagger) {
                cur.photoTagger.destroy();
                delete cur.photoTagger;
            }
        }
        cur.destroy.push(function() {
            cur.photoTaggerDestroy();
        });
    }

    var boxOptions = {};
    boxOptions.width = cropPhotoBoxWidth;
    boxOptions.onClean = function() {
        destroyHintTt();
        cur.photoTaggerDestroy();
    };
    cropBox.setOptions(boxOptions);
}

AdsEdit.saveCropPhoto = function(cropBox, formatPhotoSize, uploadUrl, uploadParams) {
    if (!Ads.lock('saveCropPhoto', onLock, onUnlock)) {
        return;
    }

    var ajaxParams = {};
    ajaxParams = extend({}, ajaxParams, uploadParams);

    var cropInfo = cur.photoTagger.result();
    ajaxParams.crop = cropInfo.join(','); // For backward compatibility // TODO: Remove it!
    ajaxParams.crop_x = cropInfo[0];
    ajaxParams.crop_y = cropInfo[1];
    ajaxParams.crop_width = cropInfo[2];
    ajaxParams.crop_height = cropInfo[3];

    uploadUrl += '?' + ajx2q(ajaxParams);

    var onComplete = AdsEdit.onSaveCropPhotoComplete.pbind(cropBox, formatPhotoSize);

    ajax.plainpost(uploadUrl, {}, onComplete, onComplete, true);

    function onLock() {
        cropBox.showProgress();
    }

    function onUnlock() {
        cropBox.hideProgress();
    }
}

AdsEdit.onSaveCropPhotoComplete = function(cropBox, formatPhotoSize, result, r) {
    Ads.unlock('saveCropPhoto');

    var resultParsed;
    try {
        resultParsed = parseJSON(result);
    } catch (e) {}

    if (!resultParsed || !resultParsed.photo) {
        var message = getLang('ads_photo_notloaded');
        message += ((resultParsed && resultParsed.errcode !== undefined) ? ('<br>' + getLang('ads_err_code').replace('{code}', resultParsed.errcode)) : '');
        var errorElem = ge('ads_edit_crop_photo_error');
        errorElem.innerHTML = message;
        show(errorElem);
        return;
    }

    cur.viewEditor.setPhotoData(formatPhotoSize, resultParsed.photo);

    cropBox.hide();
}

AdsEdit.showUploadVideoBox = function(buttonElem, hash) {
    if (hasClass(buttonElem.parentNode, 'button_disabled')) {
        return;
    }

    var ajaxParams = {};
    ajaxParams.hash = hash;

    var showOptions = {
        params: {}
    };
    showOptions.stat = ['upload.js'];

    var uploadVideoBox = showBox('/adsedit?act=upload_video_box', ajaxParams, showOptions);
}

AdsEdit.initUploadVideoBox = function(uploadVideoBox, uploadUrl, uploadVars, uploadOptions, updateAfterUploadHash) {

    uploadVideoBox.removeButtons();
    uploadVideoBox.addButton(getLang('box_cancel'));

    var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadVideoBox.bodyNode);
    uploadOptions = extend({}, uploadOptions, {
        clear: true, // Destroy on cur.destroy
        onUploadStart: AdsEdit.onUploadVideoStart.pbind(uploadVideoBox),
        onUploadError: AdsEdit.onUploadVideoError.pbind(uploadVideoBox, uploadVars, uploadOptions),
        onUploadComplete: AdsEdit.onUploadVideoComplete.pbind(uploadVideoBox, uploadVars, uploadOptions, updateAfterUploadHash),
        onUploadProgress: function(uploadIndex, bytesLoaded, bytesTotal) {
            AdsEdit.drawUploadGradientProgress(uploadVideoBox, bytesLoaded, bytesTotal);
        }
    });
    Upload.init(uploaderElem, uploadUrl, uploadVars, uploadOptions);

    if (!cur.videoUploadDestroy) {
        cur.videoUploadDestroy = function() {
            if ('videoUploadIndex' in cur) {
                Upload.terminateUpload(cur.videoUploadIndex);
                delete cur.videoUploadIndex;
            }
        }
        cur.destroy.push(function() {
            cur.videoUploadDestroy();
        });
    }

    window.onParseDone = AdsEdit.onParseVideoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash);
    window.onParseFail = AdsEdit.onParseVideoComplete.pbind(uploadVideoBox, uploadVars, updateAfterUploadHash);

    var externalVideoLinkElem = ge('ads_edit_upload_video_external_link');
    var interestingEvents = 'keydown keyup keypress change paste cut drop input blur';
    var externalVideoLinkHandler = function() {
        AdsEdit.parseVideoExternal();
    };
    addEvent(externalVideoLinkElem, interestingEvents, externalVideoLinkHandler);
    cur.destroy.push(function() {
        removeEvent(externalVideoLinkElem, interestingEvents, externalVideoLinkHandler);
    });

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
    var boxElem = ge('ads_edit_upload_video_box');
    var uploadElems = geByClass('ads_edit_upload_video_only_upload', boxElem);
    var externalElems = geByClass('ads_edit_upload_video_only_external', boxElem);

    if (isExternal) {
        each(externalElems, function(k, v) {
            show(v);
        });
        each(uploadElems, function(k, v) {
            hide(v);
        });
    } else {
        each(uploadElems, function(k, v) {
            show(v);
        });
        each(externalElems, function(k, v) {
            hide(v);
        });
    }
}

AdsEdit.onUploadVideoStart = function(uploadVideoBox, uploadVideoInfo, result) {

    var uploadIndex = uploadVideoInfo.ind;

    // cur.videoUploadIndex = uploadIndex;

    if (Upload.types[uploadIndex] === 'form') {
        uploadVideoBox.showProgress();
    } else {
        AdsEdit.drawUploadGradientProgress(uploadVideoBox, 0, 100);
    }
    hide('ads_edit_upload_video_error');
    show('ads_edit_upload_video_info');
}

AdsEdit.onUploadVideoError = function(uploadVideoBox, uploadVars, uploadOptions, uploadIndex, msg) {
    uploadVideoBox.hide();
    showFastBox({
        title: getLang('video_external_server_error')
    }, msg || getLang('video_external_server_error'));
}

AdsEdit.onUploadVideoComplete = function(uploadVideoBox, uploadVars, uploadOptions, updateAfterUploadHash, uploadIndex, result) {

    if (Upload.types[uploadIndex] !== 'form') {
        AdsEdit.drawUploadGradientProgress(uploadVideoBox, 100, 100);
    }

    // To prevent click upload during ajax request
    if (Upload.types[uploadIndex] === 'form' || Upload.types[uploadIndex] === 'fileApi') {
        var uploaderElem = geByClass1('ads_edit_upload_uploader', uploadVideoBox.bodyNode)
        var fileElem = geByClass1('file', uploaderElem);
        fileElem.disabled = true;
    }

    var resultParsed;
    try {
        resultParsed = parseJSON(result);
    } catch (e) {
        resultParsed = q2ajx(result);
    }

    if (!resultParsed || resultParsed.code || resultParsed.error) {
        var message = resultParsed && (resultParsed.code ? resultParsed.code : resultParsed.error);
        if (resultParsed && resultParsed.debug) {
            try {
                var debug = parseJSON(resultParsed.debug);
                message = debug.error_lang_key ? getLang(debug.error_lang_key) : (debug.error_message || debug.video_error_code || resultParsed.code || message);
            } catch (e) {}
        }
        Upload.onUploadError(uploadIndex, message);
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

    ge('ads_edit_upload_video_external_photo_url').value = result.url;
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

    var ajaxParams = {};
    ajaxParams.owner_id = videoOwnerId;
    ajaxParams.video_id = videoId;
    ajaxParams.server = videoServer;
    ajaxParams.extra = videoExtra;
    ajaxParams.extra_data = videoExtraData;
    ajaxParams.photo_owner_id = videoPhotoOwnerId;
    ajaxParams.photo_id = videoPhotoId
    ajaxParams.hash = updateAfterUploadHash;
    ajax.post('/adsedit?act=upload_video_update', ajaxParams, {
        onDone: onDone,
        onFail: onFail
    });

    function onDone(ajaxResult, videoHash, videoPreviewHash, videoThumbUrl) {
        if (ajaxResult === 'ok' && videoHash && videoPreviewHash && videoThumbUrl) {
            uploadVideoBox.hide();
            showFastBox({
                title: getLang('ads_edit_ad_upload_done_title')
            }, getLang('ads_video_upload_done'));
            cur.viewEditor.setVideoData(videoId, videoOwnerId, videoHash, videoThumbUrl);
        } else {
            onFail();
        }
    }

    function onFail() {
        uploadVideoBox.hide();
        showFastBox({
            title: getLang('global_error')
        }, getLang('ads_error_unexpected_error_try_later'));
        return true;
    }
}

AdsEdit.showCreatingPostBox = function(buttonElem) {
    if (hasClass(buttonElem.parentNode, 'button_disabled')) {
        return;
    }

    var ajaxParams = {};
    var viewParams = cur.viewEditor.getParams();
    ajaxParams.client_id = viewParams.client_id;
    ajaxParams.campaign_id = viewParams.campaign_id;

    var boxOptions = {};
    boxOptions.width = 400;
    boxOptions.onShow = function() {
        cur.preventBoxHide = true;
    }
    boxOptions.onHide = function() {
        setTimeout(function() {
            if (boxQueue.count() > 1) {
                cur.preventBoxHide = false;
            }
        }, 1);
    }
    boxOptions.onDestroy = function() {
        cur.preventBoxHide = false;
    }

    var showOptions = {};
    showOptions.params = boxOptions;

    var creatingPostBox = showBox('/adsedit?act=creating_post_box', ajaxParams, showOptions);
    if (!creatingPostBox.cur) {
        creatingPostBox.cur = {};
    }
    creatingPostBox.changed = true; // prevent hiding box on background click
}

AdsEdit.initCreatingPostBox = function(creatingPostBox, groupsDefaultItems, selectedItem) {

    creatingPostBox.removeButtons();
    var buttonElem = creatingPostBox.addButton(getLang('ads_edit_ad_creating_post_continue'), AdsEdit.showCreatingPostForm.pbind(null, creatingPostBox), 'yes', true);
    if (!selectedItem) {
        addClass(buttonElem, 'button_disabled');
    }
    creatingPostBox.cur.buttonLockElem = buttonElem;
    creatingPostBox.addButton(getLang('box_cancel'), false, 'no');

    var targetElem = ge('ads_edit_ad_creating_post_group_id');
    targetElem.removeAttribute('autocomplete');
    creatingPostBox.cur.uiGroupId = new Autocomplete(targetElem, '/adsedit?act=search_user_objects&section=groups&group_purpose=' + AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_LINK_OBJECT + '&create_promoted_stealth=1', {
        defaultItems: groupsDefaultItems,
        selectedItems: selectedItem,

        introText: getLang('ads_type_community'),
        placeholder: getLang('ads_type_community'),
        noResult: getLang('ads_notfound_link_object'),

        dropdown: true,
        multiselect: false,
        big: true,
        withIcons: true,
        width: 350,

        onChange: onChangePostOwnerId
    });

    function onChangePostOwnerId(value) {
        toggleClass(buttonElem, 'button_disabled', !value);
    }
}

AdsEdit.showCreatingPostForm = function(buttonElem, creatingPostBox, postOwnerId, snippetLink) {
    if (buttonElem && hasClass(buttonElem.parentNode, 'button_disabled')) {
        return;
    }

    var lockHash = 'creating_post_form';
    if (!Ads.lock(lockHash)) {
        return;
    }

    var viewParams = cur.viewEditor.getParams();

    var ajaxParams = {};
    ajaxParams.client_id = viewParams.client_id;
    ajaxParams.campaign_id = viewParams.campaign_id;
    ajaxParams.link_subtype = viewParams.link_subtype;
    ajaxParams.snippet_link = snippetLink;
    ajaxParams.group_id = -postOwnerId;

    creatingPostBox = showBox('/adsedit?act=creating_post_form', ajaxParams, {
        onDone: onComplete.pbind(true),
        onFail: onComplete.pbind(false)
    });

    function onComplete(isDone) {
        Ads.unlock(lockHash);

        if (isDone) {
            if (typeof AdsPiwik !== 'undefined') {
                AdsPiwik.sendPaq('ads_create', 'click', 'create_post_button');
            }
        }
    }
}

AdsEdit.triggerDefaultMediaForPostForm = function(wallOptions) {
    if (wallOptions.additional_save_params && wallOptions.additional_save_params.ads_promoted_post_subtype) {
        var triggerMediaType = null;
        var handlerOptions = {};
        switch (wallOptions.additional_save_params.ads_promoted_post_subtype) {
            case 'promoted_post_pretty_cards':
                {
                    triggerMediaType = 'pretty_cards';
                    handlerOptions.replace_owner_id = cur.oid;
                    break;
                }

            case 'promoted_post_button':
                {
                    triggerMediaType = 'share';
                    break;
                }

            case 'promoted_post_lead_form':
                {
                    triggerMediaType = 'lead_form';
                    break;
                }

            case 'promoted_post_with_video':
                {
                    if (cur.viewEditor.params.link_type.video_id) {
                        triggerMediaType = 'share';
                        handlerOptions.videoId = cur.viewEditor.params.link_type.video_id;
                    }
                    break;
                }

            default:
            case 'promoted_post':
                {
                    // do nothing
                    break;
                }
        }

        if (triggerMediaType === 'lead_form') {
            AdsEdit.showLeadFormBoxes();
            return false;
        }

        if (triggerMediaType && cur.wallAddMedia) {
            each(cur.wallAddMedia.menu.types, function(k, v) {
                if (v[0] === triggerMediaType) {
                    v[2](handlerOptions);
                    return false;
                }
            });
        }
    }
}

AdsEdit.reinitCreatingPostForm = function(creatingPostBox, wallOptions, withoutRedraw) {
    withoutRedraw = !!withoutRedraw;
    var boxBodyNode = creatingPostBox.bodyNode;
    var postMessageInput = geByClass1('submit_post_field', boxBodyNode);
    var postMessage = trim((window.Emoji ? Emoji.editableVal : val)(postMessageInput));

    cur.editing = false;
    geByClass1('ads_edit_ad_submit_post_wrap', boxBodyNode).innerHTML = creatingPostBox.postEditorHtml;
    Wall.init(wallOptions);
    Wall.showEditPost();

    if (!withoutRedraw) {
        postMessageInput = geByClass1('submit_post_field', boxBodyNode);
        val(postMessageInput, clean(postMessage));

        if (wallOptions.additional_save_params.ads_promoted_post_snippet_link) {
            cur.addMedia[cur.wallAddMedia.lnkId].checkURL(wallOptions.additional_save_params.ads_promoted_post_snippet_link);
        } else {
            AdsEdit.triggerDefaultMediaForPostForm(wallOptions);
        }
    }
}

AdsEdit.reinitCreatingPostFormNeeded = function() {
    var reinitNeeded = false;
    each(cur.wallAddMedia.chosenMedias || [], function() {
        var media = this;
        if (!media) {
            return;
        }

        var mediaType = media[0];

        if (mediaType) {
            switch (mediaType) {
                case 'pretty_cards':
                    {
                        if (cur.wallAddMedia.prettyCardGallery.needSendData()) {
                            reinitNeeded = true;
                        }
                        break;
                    }
                default:
                    {
                        reinitNeeded = true;
                    }
            }
        }
    });

    return reinitNeeded;
}

AdsEdit.reinitCreatingPostFormConfirm = function(confirmCallback) {
    showFastBox({
            title: getLang('global_action_confirmation'),
            dark: true,
            width: 400,
        },
        getLang('ads_edit_promoted_post_confirm_reinit'),
        getLang('global_continue'),
        function() {
            curBox().hide();
            confirmCallback && confirmCallback();
        }, getLang('global_cancel'));
}

AdsEdit.reinitCreatingPostFormBound = function() {}

AdsEdit.initCreatingPostForm = function(creatingPostBox, postOwnerId, wallOptions) {
    creatingPostBox.removeButtons();
    creatingPostBox.addButton(getLang('ads_edit_ad_creating_post_create'), AdsEdit.createPost.pbind(creatingPostBox), 'yes', false, 'send_post');
    creatingPostBox.addButton(getLang('box_cancel'), false, 'no');
    creatingPostBox.setOptions({
        width: 600
    });

    // Pre-load clubs list
    ajax.post('/ads_edit.php', {
        act: 'a_get_promoted_post_stealth_groups'
    }, {
        cache: 1
    });

    // Hacks for ugly page.js
    cur.oid = postOwnerId;
    cur.postTo = postOwnerId;
    cur.options = wallOptions;

    creatingPostBox.postEditorHtml = geByClass1('ads_edit_ad_submit_post_wrap', creatingPostBox.bodyNode).innerHTML;

    Wall.init(wallOptions);
    Wall.showEditPost();

    AdsEdit.reinitCreatingPostFormBound = AdsEdit.reinitCreatingPostForm.pbind(creatingPostBox, wallOptions, false);
    AdsEdit.reinitCreatingPostFormBoundWithoutRedraw = AdsEdit.reinitCreatingPostForm.pbind(creatingPostBox, wallOptions, true);

    creatingPostBox.changed = true; // prevent hiding box on background click

    if (wallOptions.additional_save_params.ads_promoted_post_snippet_link) {
        cur.addMedia[cur.wallAddMedia.lnkId].checkURL(wallOptions.additional_save_params.ads_promoted_post_snippet_link);
    } else {
        AdsEdit.triggerDefaultMediaForPostForm(wallOptions);
    }

    if (!ls.get('ads_promoted_posts_stealth_groups_selector_hidden') && !cur.buttonTextTooltip) {
        var tryShowTooltipInterval = setInterval(function() {
            if (creatingPostBox.isVisible()) {
                clearInterval(tryShowTooltipInterval);
            } else {
                return;
            }
            cur.closeGroupSelectorTooltip = function() {
                cur.groupSelectorTooltip.hide();
                ls.set('ads_promoted_posts_stealth_groups_selector_hidden', 1);
            };
            var el = geByClass1('ads_edit_ad_submit_post_author_selector_wrapper', creatingPostBox.bodyNode);
            if (el) {
                var appendTo = domCA(el, '.box_layout');
                cur.groupSelectorTooltip = new ElementTooltip(el, {
                    autoShow: false,
                    appendTo: appendTo ? appendTo : geByTag1('body'),
                    content: '<div class="feature_intro_tt_hide" onclick="cur.closeGroupSelectorTooltip();"></div>' + getLang('ads_promoted_post_stealth_group_selector'),
                    forceSide: 'right',
                    offset: [18, -2],
                    type: ElementTooltip.TYPE_HORIZONTAL,
                    cls: 'feature_intro_tt',
                    onHide: function() {
                        cur.groupSelectorTooltip.destroy();
                    }
                });
                cur.groupSelectorTooltip.show();
                addEvent(el, 'mouseover', function() {
                    if (cur.groupSelectorTooltip) {
                        cur.groupSelectorTooltip.hide();
                    }
                });
            }
        }, 1000);
    }

    cur.prevBefUnload = window.onbeforeunload;
    window.onbeforeunload = function(event) {
        var confirmationMessage = getLang('ads_promoted_post_confirm_leave');

        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    };
    cur.destroy.push(function() {
        window.onbeforeunload = cur.prevBefUnload;
    });
    creatingPostBox.setOptions({
        onShow: function() {
            cur.preventBoxHide = true;
        },
        onHide: function() {
            window.onbeforeunload = cur.prevBefUnload;
            if (boxQueue.count() > 1) {
                cur.preventBoxHide = false;
            }
        }
    });
}

AdsEdit.createPost = function(creatingPostBox) {

    cur.options.onSendPostDone = onComplete;
    //cur.options.onSendPostFail = onComplete;

    debugLog('call Wall.sendPost');
    Wall.sendPost();

    function onComplete(response) {
        if (response && response.post_url) {
            cur.viewEditor.completeLinkPending = true;
            cur.viewEditor.setLinkUrl(response.post_url);
            creatingPostBox.hide();

            if (typeof AdsPiwik !== 'undefined') {
                AdsPiwik.sendPaq('ads_create', 'save', 'create_post_box');
            }
        }
    }
}

AdsEdit.showEditingPostBox = function(buttonElem) {
    if (hasClass(buttonElem.parentNode, 'button_disabled')) {
        return;
    }

    var lockHash = 'editing_post_form';
    if (!Ads.lock(lockHash, onLock, onUnlock)) {
        return;
    }

    var viewParams = cur.viewEditor.getParams();

    var ajaxParams = {};
    ajaxParams.post_owner_id = viewParams.link_owner_id;
    ajaxParams.post_id = viewParams.link_id;

    ajax.post('/adsedit?act=editing_post_box', ajaxParams, {
        onDone: onDone,
        onFail: onFail
    })

    function onDone() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(lockHash);
        AdsEdit.initEditingPostBox.apply(window, args);

        if (typeof AdsPiwik !== 'undefined') {
            AdsPiwik.sendPaq('ads_edit', 'click', 'edit_post_button');
        }
    }

    function onFail(message) {
        Ads.unlock(lockHash);
        if (message) {
            AdsEdit.showError(message);
            return true;
        }
    }

    function onLock() {
        boxRefreshCoords(boxLoader);
        show(boxLoader);
        show(boxLayerWrap);
    }

    function onUnlock() {
        hide(boxLoader);
        hide(boxLayerWrap);
    }
}

AdsEdit.initEditingPostBox = function(lockHash, html, js, postOwnerId, postId, wallOptions) {

    var boxOptions = {};
    boxOptions.title = getLang('ads_edit_ad_editing_post_title');
    boxOptions.width = 600;
    boxOptions.onShow = function() {
        cur.preventBoxHide = true;
    }
    boxOptions.onHide = function() {
        setTimeout(function() {
            if (boxQueue.count() > 1) {
                cur.preventBoxHide = false;
            }
        }, 1);
    }
    boxOptions.onDestroy = function() {
        cur.preventBoxHide = false;
    }

    var editingPostBox = new MessageBox(boxOptions);
    editingPostBox.content(html);

    eval(js);

    // Hacks for ugly page.js
    cur.oid = postOwnerId;
    cur.postTo = postOwnerId;
    cur.options = wallOptions;

    var editOptions = {};
    editOptions.save_result_type = 'simple';

    Wall.init(wallOptions);
    Wall.editPost(null, postOwnerId + '_' + postId, editOptions, onFail, onDone);

    function onDone() {
        Ads.unlock(lockHash);

        re('wpe_save');

        editingPostBox.addButton(getLang('ads_edit_ad_editing_post_save'), WallEdit.savePost.pbind(AdsEdit.completeEditingPost.pbind(editingPostBox)), 'yes', false, 'wpe_save');
        editingPostBox.addButton(getLang('box_cancel'), false, 'no');
        editingPostBox.show();
    }

    function onFail() {
        Ads.unlock(lockHash);
    }
}

AdsEdit.completeEditingPost = function(editingPostBox) {
    editingPostBox.hide();
    cur.viewEditor.updateLinkPromotedPost();

    if (typeof AdsPiwik !== 'undefined') {
        AdsPiwik.sendPaq('ads_edit', 'save', 'edit_post_box');
    }
}

AdsEdit.scrollToEditing = function() {
    var scrollElem = geByClass1('ads_edit_link_type_cards_wrapper');
    var scrollY = getXY(scrollElem)[1] + getSize(scrollElem)[1] + 20;
    scrollToY(scrollY);
}

AdsEdit.showLeadFormBoxes = function() {
    // first of all, check do we have a group and do we need to show group change box
    if (cur.canUseLeadFormsForAd && cur.postTo) {
        this.showLeadFormBox(-cur.postTo);
        return false;
    }

    this.showLeadFormGroupBox(-cur.postTo);
}

AdsEdit.showLeadFormBox = function(groupId) {
    if (!groupId) {
        return false;
    }

    var ajaxParams = {
        group_id: groupId
    };

    var showOptions = {};
    showOptions.params = {
        width: 795,
        containerClass: 'ads_create_lead_form_ad',
        progress: true,
        hideButtons: true
    };

    showBox('/adsedit?act=show_lead_form_box', ajaxParams, showOptions);
}

AdsEdit.showLeadFormGroupBox = function(groupId) {
    var showOptions = {};
    showOptions.params = {
        width: 450,
        dark: 1,
        progress: true,
    };

    var ajaxParams = {
        selected_group_id: groupId
    };

    cur.leadFormGroupBox = showBox('/adsedit?act=show_lead_form_group_box', ajaxParams, showOptions);
}

AdsEdit.goToShowLeadFormGroupBox = function(groupId) {
    if (curBox()) {
        curBox().hide();
    }

    AdsEdit.showLeadFormGroupBox(groupId);
}

AdsEdit.changeLeadFormGroupForPostEdit = function(el, ownerId) {
    cur.oid = ownerId;
    cur.postTo = ownerId;

    var groupSelect = geByClass1('ads_edit_ad_submit_post_author_selector');

    if (!window.replyAsData) {
        window.replyAsData = {};
    }
    // we need to format group info data from one select to other. It's id, pict_url, group_url and group_name
    window.replyAsData[ownerId] = [-(el[0]), el[3], false, el[1]];
    wall.setReplyAsGroup(groupSelect, {
        from: (ownerId).toString(),
        reinitConfirmed: true,
        withoutRedraw: true
    });
}

AdsEdit.initLeadFormGroupBoxDropdown = function(groups, selectedGroupId, selectedGroupData, selectedGroupParams) {
    var groupsDropdownEl = ge('ads_edit_ad_creating_post_lead_form_group');

    if (!groupsDropdownEl) {
        return false;
    }

    var groupList = [];
    each(groups, function(groupId, groupInfo) {
        groupList.push(groupInfo);
    });

    var leadFormGroupBoxDropdownUrl = '/adsedit?act=search_user_objects&section=groups&create_promoted_stealth=1&format_menu_list=1&check_for_admin=1&check_for_opened=1&group_purpose=' + AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_LINK_OBJECT;
    var leadFormGroupBoxDropdown = new Autocomplete(groupsDropdownEl, leadFormGroupBoxDropdownUrl, {
        autocomplete: true,
        big: true,
        preventDuplicates: true,
        width: 400,
        withIcons: true,
        defaultItems: groupList,
        includeLabelsOnMatch: true,
        multiselect: false,
        maxItems: 20,
        selectedItems: selectedGroupId,
        placeholder: getLang('ads_edit_lead_forms_group_box_placeholder'),
        onChange: this.onChangeLeadFormGroupBoxDropdown.bind(this)
    });

    this.hideLeadFormGroupBoxResults();
    if (selectedGroupParams.need_install) {
        this.showLeadFormGroupBoxNeedInstall(selectedGroupId);
    } else {
        this.showLeadFormGroupBoxAlreadyInstalled(selectedGroupId);
    }

    if (-selectedGroupId !== cur.postTo) {
        this.changeLeadFormGroupForPostEdit(selectedGroupData, -selectedGroupId);
    }
}

AdsEdit.onChangeLeadFormGroupBoxDropdown = function(groupId, el) {
    if (!groupId || !el) {
        return false;
    }

    var selectGroupForLeadFormBoxBody = ge('ads_edit_select_group_for_lead_form_box_body');
    if (!selectGroupForLeadFormBoxBody) {
        return false;
    }

    var selectGroupForLeadFormBoxResults = geByClass('ads_edit_easy_group_lead_form_box__result', selectGroupForLeadFormBoxBody);
    if (!selectGroupForLeadFormBoxResults) {
        return false;
    }

    var selectGroupForLeadFormBoxSettingsLink = ge('ads_edit_easy_group_lead_form_box__result_settings_link', selectGroupForLeadFormBoxBody);
    if (selectGroupForLeadFormBoxSettingsLink) {
        selectGroupForLeadFormBoxSettingsLink.href = '/public' + groupId + '?act=apps';
    }

    var selectGroupForLeadFormBoxAppLink = ge('ads_edit_easy_group_lead_form_box__result_app_link', selectGroupForLeadFormBoxBody);
    if (selectGroupForLeadFormBoxAppLink) {
        selectGroupForLeadFormBoxAppLink.href = '/community_apps?from=club' + groupId + '&w=app6013442';
    }

    var ajaxParams = {};
    ajaxParams.group_id = groupId;

    this.changeLeadFormGroupForPostEdit(el, -groupId);

    ajax.post('/adsedit?act=get_lead_form_group_info', ajaxParams, {
        onDone: this.onChangeLeadFormGroupBoxDropdownComplete.bind(this, groupId),
        onFail: this.onChangeLeadFormGroupBoxDropdownComplete.bind(this, groupId),
        showProgress: function() {
            if (cur.leadFormGroupBox) {
                cur.leadFormGroupBox.showProgress();
            }
        },
        hideProgress: function() {
            if (cur.leadFormGroupBox) {
                cur.leadFormGroupBox.hideProgress();
            }
        }
    });
}

AdsEdit.onChangeLeadFormGroupBoxDropdownComplete = function(groupId, result) {
    this.hideLeadFormGroupBoxResults();

    if (!result || !result.ok) {
        this.showLeadFormGroupBoxError();
        return true;
    }

    if (result.installed) {
        this.showLeadFormGroupBoxAlreadyInstalled(groupId);
        return true;
    }

    if (result.need_install) {
        this.showLeadFormGroupBoxNeedInstall(groupId);
        return true;
    }
}

AdsEdit.hideLeadFormGroupBoxResults = function() {
    var selectGroupForLeadFormBoxBody = ge('ads_edit_select_group_for_lead_form_box_body');
    if (!selectGroupForLeadFormBoxBody) {
        return false;
    }

    var selectGroupForLeadFormBoxResults = geByClass('ads_edit_easy_group_lead_form_box__result', selectGroupForLeadFormBoxBody);
    if (!selectGroupForLeadFormBoxResults) {
        return false;
    }

    each(selectGroupForLeadFormBoxResults, function(i, item) {
        hide(item);
    });

    if (!cur.leadFormGroupBox) {
        return false;
    }

    cur.leadFormGroupBox.removeButtons();
}

AdsEdit.showLeadFormGroupBoxError = function() {
    var selectGroupForLeadFormBoxError = ge('ads_edit_easy_group_lead_form_box__result_error');
    if (!selectGroupForLeadFormBoxError) {
        return false;
    }

    show(selectGroupForLeadFormBoxError);

    if (!cur.leadFormGroupBox) {
        return false;
    }

    cur.leadFormGroupBox.removeButtons();
    cur.leadFormGroupBox.addButton(getLang('global_close'), cur.leadFormGroupBox.hide);
}

AdsEdit.showLeadFormGroupBoxAlreadyInstalled = function(groupId) {
    if (!cur.leadFormGroupBox) {
        return false;
    }

    cur.leadFormGroupBox.removeButtons();
    var goToFormButton = cur.leadFormGroupBox.addButton(getLang('global_box_continue'), this.onClickLeadFormGroupBoxContinue.bind(this), '', true, 'ads_edit_easy_group_lead_form_box__result_app_go');
    if (goToFormButton) {
        attr(goToFormButton, 'data-group-id', groupId);
    }
}

AdsEdit.showLeadFormGroupBoxNeedInstall = function(groupId) {
    var selectGroupForLeadFormBoxResultNeedInstall = ge('ads_edit_easy_group_lead_form_box__result_need_install');
    if (!selectGroupForLeadFormBoxResultNeedInstall) {
        return false;
    }

    show(selectGroupForLeadFormBoxResultNeedInstall);

    if (!cur.leadFormGroupBox) {
        return false;
    }

    cur.leadFormGroupBox.removeButtons();
    var installButton = cur.leadFormGroupBox.addButton(getLang('global_box_continue'), this.onClickLeadFormGroupBoxContinue.bind(this), '', true, 'ads_edit_easy_group_lead_form_box__result_app_install');
    if (installButton) {
        attr(installButton, 'data-group-id', groupId);
    }
}

AdsEdit.onClickLeadFormGroupBoxContinue = function(button) {
    if (!button) {
        return false;
    }

    var groupId = attr(button, 'data-group-id');
    if (!groupId) {
        return false;
    }

    if (curBox()) {
        curBox().hide();
    }

    this.showLeadFormBox(groupId);
}

AdsEdit.showSnippetVideo = function(videoId) {
    if (!videoId || !cur.wallAddMedia || (typeof cur.wallAddMedia.lnkId === 'undefined') || !cur.addMedia || !cur.addMedia[cur.wallAddMedia.lnkId]) {
        return false;
    }

    ajax.post('al_video.php', {
        act: 'a_videos_attach_info',
        videos: videoId,
    }, {
        onDone: function(data) {
            var allowSnippetVideo = cur.options ? (!!(cur.options.share && cur.options.share.allow_snippet_video)) : false;
            if (allowSnippetVideo) {
                cur.addMedia[cur.wallAddMedia.lnkId].initSnippetVideoFunctions();
                cur.chooseSnippetVideo(videoId, data[videoId]);
            }
        },
        showProgress: function() {
            if (curBox) {
                curBox().showProgress();
            }
        },
        hideProgress: function() {
            if (curBox) {
                curBox().hideProgress();
            }
        }
    });

    return false;
}



//
// AdsEditor
//

function AdsEditor() {}
AdsEditor.prototype.init = function(viewEditor, targetingEditor) {

    this.updateDataTimeout = null;
    this.updateDataCounter = 0;

    this.lastViewData = {};
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

    this.lastViewData = {};
    this.lastTargetingData = {};

    var ajaxParams = {};
    ajaxParams = extend({}, ajaxParams, lastData);

    ajax.post('/adsedit?act=get_target_params', ajaxParams, {
        onDone: onDone.bind(this),
        onFail: onFail.bind(this)
    });

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

    // ��������� ���������� ���������� ����������.
    // value ������� ��������� ���������� �� ������ ��� ���������� ���������� � ��� ���������� ������ ����� get_target_params.
    // ���� �����-�� �������� �� ����� ��� ���� ��������, � ��������� �����-�� �������������� ������, �� ����� ��� �������� � �������������� ���� �������� ����������� �� ������ ���������.
    this.params = {
        ad_id: {
            value: 0
        },
        format_type: {
            value: 0,
            unreachable: false
        },
        cost_type: {
            value: AdsEdit.ADS_AD_COST_TYPE_CLICK,
            cpm_only: false,
            cpc_only: false,
            allow_promoted_posts_cpc: false,
            promoted_posts_cpc_default: false
        },
        link_type: {
            value: 0,
            subvalue: '',
            complete: false,
            allow_edit_all: false,
            allow_edit_link: false,
            editing: false,
            cancelling: false,
            force_show_other_link_types: false,
            video_id: ''
        },
        link_id: {
            value: '',
            data: [],
            video_value: '',
            app_game_links_ids: {},
            app_admin_links_ids: {},
            app_in_news_links_ids: {},
            app_trusted_links_ids: {},
            promoted_post_text: '',
            promoted_post_kludges_have: {},
            promoted_post_checked: false,
            promoted_posts_cpc: false
        },
        link_owner_id: {
            value: '',
            video_value: ''
        },
        link_url: {
            value: '',
            video_value: '',
            video_preview_hash: '',
            is_ok: false,
            event_final_time: 1,
            force_show: false,
            stories: [],
            storiesContainer: null
        },
        link_url_vk: {
            value: 0,
            link_type_value: 0,
            link_id_value: 0
        },
        link_domain: {
            value: '',
            value_escaped: '',
            link_url: '',
            delayed_error: '',
            needed: false,
            is_ok: false
        },
        link_domain_confirm: {
            value: 0
        },
        link_title: {
            value: '',
            value_escaped: '',
            value_default: '',
            max_length: 0,
            max_new_lines: 0,
            value_max: '',
            update_value_max: true,
            max_length_adaptive_ads: 0
        },
        link_button: {
            value: '',
            data: []
        },
        title: {
            value: '',
            value_escaped: '',
            value_default: '',
            max_length: 0,
            max_new_lines: 0,
            value_max: '',
            update_value_max: true,
            max_length_normal: 0,
            max_length_adaptive_ads: 0
        },
        description: {
            value: '',
            value_escaped: '',
            value_default: '',
            max_length: 0,
            max_new_lines: 0,
            max_length_normal: 0,
            max_length_mobile: 0,
            max_length_adaptive_ads: 0
        },
        category1_id: {
            value: '',
            data: [],
            suggestions: []
        },
        subcategory1_id: {
            value: '',
            data: []
        },
        category2_id: {
            value: '',
            data: []
        },
        subcategory2_id: {
            value: '',
            data: []
        },
        stats_url: {
            value: ''
        },
        stats_url2: {
            value: ''
        },
        stats_url_long: {
            value: ''
        },
        stats_url_long2: {
            value: ''
        },
        disclaimer_medical: {
            value: 0,
            may_be_any: false
        },
        disclaimer_specialist: {
            value: 0
        },
        disclaimer_supplements: {
            value: 0
        },
        disclaimer_finance: {
            value: 0
        },
        disclaimer_finance_name: {
            value: '',
            value_escaped: '',
            value_default: '',
            max_length: 0
        },
        disclaimer_finance_license_no: {
            value: '',
            value_escaped: '',
            value_default: '',
            max_length: 0
        },
        age_restriction: {
            value: 0,
            data: []
        },
        photo: {
            value: '',
            box_classes: ''
        },
        photo_link: {
            value: ''
        },
        video_id: {
            value: '',
            allow: false,
            allow_video_only: false
        },
        video_owner_id: {
            value: ''
        },
        video_hash: {
            value: '',
            value_old: ''
        },
        repeat_video: {
            value: 0,
            data: []
        },
        cost_per_click: {
            value: '',
            edited: false,
            last_value: ''
        },
        platform: {
            value: 0,
            data: [],
            data_all: [],
            values_normal: 0,
            values_disabled: 0
        },
        platform_no_wall: {
            value: 0
        },
        platform_no_ad_network: {
            value: 0
        },
        view_retargeting_group_id: {
            value: 0,
            data: []
        },
        views_limit_flag: {
            value: 0
        },
        views_limit_exact: {
            value: 0,
            data: [],
            default_values: [],
            data_ranges: []
        },
        client_id: {
            value: 0
        },
        campaign_type: {
            value: AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD,
            allow_special_app: false
        },
        campaign_id: {
            value: 0,
            data: [],
            value_normal: 0,
            value_app: 0
        },
        campaign_name: {
            value: '',
            value_normal: ''
        },
        promoted_post_need_confirmation: {
            value: 0
        },
        weekly_schedule: {
            value: ''
        },
        audience_notify: {
            value: 0
        },
    };

    // Init "format photo size"-specific keys
    {
        this.params.link_id['app_rates_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = '';
        this.params.link_id['mobile_app_bottom_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = '';

        var formatPhotoSizes = [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE];
        for (var i in formatPhotoSizes) {
            this.params.link_domain['value_' + formatPhotoSizes[i]] = '';
        }

        var formatPhotoSizes = [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE];
        for (var i in formatPhotoSizes) {
            this.params.title['value_' + formatPhotoSizes[i]] = '';
        }

        var formatPhotoSizes = [
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_SMALL,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MEDIUM,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_BIG,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON,
            AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON
        ];
        for (var i in formatPhotoSizes) {
            this.params.photo['value_' + formatPhotoSizes[i]] = '';
            this.params.photo['box_classes_' + formatPhotoSizes[i]] = '';
            this.params.photo_link['value_' + formatPhotoSizes[i]] = '';
            this.params.photo_link['value_default_' + formatPhotoSizes[i]] = '';
        }
        this.params.photo_link['value_default_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_app'] = '';
        this.params.photo_link['value_default_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_group'] = '';
        this.params.photo_link['value_empty_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MEDIUM] = '';
        this.params.photo_link['value_empty_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_BIG] = '';
    }

    this.updateNeeded = {};

    this.preview = {};

    this.ignoreSpellingMessageHashes = {};

    this.help = {};

    this.userData = {};

    if (params)
        for (var i in params) {
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

    if (paramsData)
        for (var i in paramsData) {
            if (paramsData[i] && (i in this.params) && ('data' in this.params[i])) {
                this.params[i].data = paramsData[i];
            }
        }

    if (paramsParams)
        for (var i in paramsParams) {
            if (paramsParams[i] && (i in this.params)) {
                this.params[i] = extend({}, this.params[i], paramsParams[i]);
            }
        }

    this.interestingEvents = 'keydown keyup keypress change paste cut drop input blur';

    this.cur = {
        destroy: []
    };

    this.updateNeeded.need_user_data = true;

    this.initPreview();
    this.initHelp();
    this.initUi();

    if (this.params.link_type && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH && this.params.link_owner_id.value && !this.params.link_id.value) {
        var snippetLink = '';
        if (this.params.link_type.subvalue !== "promoted_post_with_video") {
            snippetLink = 'https://vk.com/club' + (-this.params.link_owner_id.value);
        }

        AdsEdit.showCreatingPostForm(ge('ads_param_post_create_post'), null, this.params.link_owner_id.value, snippetLink);
    }
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
    this.preview.layout = geByClass1('ads_edit_panel_preview');
    this.preview.link = geByClass1('ads_ad_box2', this.preview.layout);
    this.preview.title = geByClass1('ads_ad_title', this.preview.layout);
    this.preview.title_box = geByClass1('ads_ad_title_box', this.preview.layout);
    this.preview.title_regular = geByClass1('ads_ad_title_regular', this.preview.layout);
    this.preview.title_big_app = geByClass1('ads_ad_title_big_app', this.preview.layout);
    this.preview.description = geByClass1('ads_ad_description', this.preview.layout);
    this.preview.description_up = geByClass1('ads_ad_description_up', this.preview.layout);
    this.preview.description_down = geByClass1('ads_ad_description_down', this.preview.layout);
    this.preview.description_big_app = geByClass1('ads_ad_description_big_app', this.preview.layout);
    this.preview.community_join = geByClass1('ads_ad_community_join', this.preview.layout);
    this.preview.app_rating = geByClass1('ads_ad_app_rating', this.preview.layout);
    this.preview.mobile_app_bottom = geByClass1('ads_ad_mobile_app_bottom', this.preview.layout);
    this.preview.disclaimer_medical = geByClass1('ads_ad_disclaimer_medical', this.preview.layout);
    this.preview.disclaimer_specialist = geByClass1('ads_ad_disclaimer_specialist', this.preview.layout);
    this.preview.disclaimer_supplements = geByClass1('ads_ad_disclaimer_supplements', this.preview.layout);
    this.preview.disclaimer_finance = geByClass1('ads_ad_disclaimer_finance', this.preview.layout);
    this.preview.disclaimers_photo = geByClass1('ads_ad_disclaimers_photo', this.preview.layout);
    this.preview.disclaimers_bottom = geByClass1('ads_ad_disclaimers_bottom', this.preview.layout);
    this.preview.disclaimers_promoted_post = geByClass1('ads_ad_disclaimers_promoted_post', this.preview.layout);
    this.preview.disclaimers = geByClass1('ads_ad_disclaimers', this.preview.layout);
    this.preview.age_restriction = geByClass1('ads_ad_age_restriction', this.preview.layout);
    this.preview.age_restriction_snippet = geByClass1('ads_ad_age_restriction_snippet', this.preview.layout);
    this.preview.age_restriction_photo = geByClass1('ads_ad_age_restriction_photo', this.preview.layout);
    this.preview.domain = geByClass1('ads_ad_domain', this.preview.layout);
    this.preview.domain_ver = geByClass1('ads_ad_domain_ver', this.preview.layout);
    this.preview.domain_out = geByClass1('ads_ad_domain_out', this.preview.layout);
    this.preview.domain_snippet = geByClass1('ads_ad_domain_snippet', this.preview.layout);
    this.preview.link_title = geByClass1('ads_ad_link_title', this.preview.layout);
    this.preview.link_button = geByClass1('ads_ad_link_button', this.preview.layout);
    this.preview.photo_box = geByClass1('ads_ad_photo_box', this.preview.layout);
    this.preview.photo_box_hor = geByClass1('ads_ad_photo_box_hor', this.preview.layout);
    this.preview.photo_box_ver = geByClass1('ads_ad_photo_box_ver', this.preview.layout);
    this.preview.photo_box_snippet = geByClass1('ads_ad_photo_box_snippet', this.preview.layout);
    this.preview.photo = geByClass1('ads_ad_photo', this.preview.layout);
    this.preview.photo_icon = geByClass1('ads_ad_photo_icon', this.preview.layout);
    this.preview.promoted_post = geByClass1('ads_ad_promoted_post', this.preview.layout);
    this.preview.big_app_info_box = geByClass1('ads_ad_big_app_info_box', this.preview.layout);
    this.preview.explain = geByClass1('ads_ad_explain', this.preview.layout);
    this.preview.play = geByClass1('ads_adaptive_ad_video_play', this.preview.layout);
    this.preview.storiesContainer = ge('ads_edit_stories_container');

    var targetElem = geByClass1('wall_module', this.preview.promoted_post);
    AdsLight.overrideClickEvents(targetElem, true);

    var storiesParentEl = this.preview.storiesContainer;
    if (storiesParentEl && window.AdsEditComponents) {
        AdsEditComponents.renderStories(storiesParentEl, this.params.link_url.stories.list, this.params.link_url.stories.options);
    }
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
    var context = {
        focus: false,
        over: 0,
        out: 2
    };
    var shiftLeft;
    var shiftTop;

    if (!this.help[paramNameHelp]) {
        this.help[paramNameHelp] = {};
    }

    switch (paramNameHelp) {
        case 'format_type_exclusive':
            shiftTop = -55;
            shiftLeft = -215;
            break;
        case 'format_type_apps_only':
            shiftTop = -55;
            shiftLeft = -215;
            break;
        case 'format_type_groups_only':
            shiftTop = -55;
            shiftLeft = -215;
            break;
        case 'description':
            shiftTop = -81;
            break;
        case 'category1_id':
            shiftTop = -44;
            break;
        case 'views_limit_flag':
            shiftTop = -32;
            break;
    }

    switch (paramNameHelp) {
        case 'format_type_exclusive':
            targetElem = ge('ads_param_format_type_exclusive_wrap');
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'format_type_groups_only':
            targetElem = ge('ads_param_format_type_groups_only_wrap');
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'format_type_apps_only':
            targetElem = ge('ads_param_format_type_apps_only_wrap');
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'category1_id':
            targetElem = ge(this.options.targetIdPrefix + 'category1_id').parentNode;
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'description':
            targetElem = ge('ads_param_description');
            helpText = function() {
                return cur.adParamsHelp['description'];
            };
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            this.descriptionTooltipHandler = handler;
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'title':
            targetElem = ge('ads_param_title');
            helpText = function() {
                return cur.adParamsHelp['title'];
            };
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            this.titleTooltipHandler = handler;
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'platform':
            targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
            helpText = function() {
                if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                    return cur.adParamsHelp['platform_post'];
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) {
                    return cur.adParamsHelp['platform_adaptive_ad'];
                }
                return cur.adParamsHelp['platform'];
            }.bind(this);
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'platform_no_wall':
        case 'platform_no_ad_network':
            targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'view_retargeting_group_id':
            targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
            helpText = function() {
                return cur.adParamsHelp['view_retargeting_group_id'];
            };
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'views_limit_flag':
            targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'stats_url_long':
        case 'stats_url_long2':
            targetElem = ge(this.options.targetIdPrefix + paramNameHelp).parentNode;
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
            AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            break;
        case 'cost_type_promoted_posts_cpc':
            targetElem = ge(this.options.targetIdPrefix + 'cost_type').parentNode;
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(paramNameHelp, targetElem, handler, this.help[paramNameHelp], helpText, shiftLeft, shiftTop, this.cur);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.help[paramNameHelp].tt);
            }.bind(this);
            handler = function(event) {
                if (!this.params || !this.params.format_type || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST) {
                    return;
                }
                AdsEdit.onHelpTooltipEvent(event, paramNameHelp, context, showTooltip, hideTooltip);
            }.bind(this);
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
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_text_and_image'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_text_image.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_big_image');
            this.params[paramName].ui_big_image = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_big_image'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_big_image.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_exclusive');
            this.params[paramName].ui_exclusive = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_exclusive'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_exclusive.destroy();
            }.bind(this));

            var label = (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) ? getLang('ads_edit_ad_format_type_promotion_community') : getLang('ads_edit_ad_format_type_square_image'));
            label = '<span id="' + this.options.targetIdPrefix + 'format_type_promotion_community_label">' + label + '</span>';
            targetElem = ge(this.options.targetIdPrefix + 'format_type_promotion_community');
            this.params[paramName].ui_promotion_community = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: label,
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_promotion_community.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_app_in_news');
            this.params[paramName].ui_app_in_news = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_news'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_app_in_news.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_apps_only');
            this.params[paramName].ui_apps_only = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_apps_only'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_apps_only.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_groups_only');
            this.params[paramName].ui_group = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_groups_only'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_group.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_big_app');
            this.params[paramName].ui_big_app = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_big_app') + ' <span class="ads_edit_ad_format_type_new">new</span>',
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_big_app.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_mobile');
            this.params[paramName].ui_mobile = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_mobile'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_mobile.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'format_type_promoted_post');
            this.params[paramName].ui_mobile = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_format_type_promoted_post'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_mobile.destroy();
            }.bind(this));

            Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
            break;
        case 'cost_type':
            targetElem = ge(this.options.targetIdPrefix + 'cost_type_clicks');
            this.params[paramName].ui_clicks = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_cost_type_per_click'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_clicks.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'cost_type_views');
            this.params[paramName].ui_views = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_cost_type_per_views'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_views.destroy();
            }.bind(this));

            Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
            break;
        case 'link_type':
            var containerElem = geByClass1('ads_edit_link_type_cards_wrapper');
            each(geByClass('ads_edit_link_type_card', containerElem), function(key, targetElem) {
                addEvent(targetElem, 'click', function(event) {
                    return this.onUiEvent(paramName, event);
                }.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_community');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_post');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_app_vk');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_video');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_app_mobile');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_type_link');
            addEvent(targetElem, 'click', function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            addEvent(ge(this.options.targetIdPrefix + 'post_or_choose_post_link'), 'click', function() {
                this.params.link_url.force_show = true;
                this.updateUiParamVisibility('link_url');
                this.updateUiParamVisibility('_link_buttons');
                this.updateUiParam('link_url');
                elfocus(this.options.targetIdPrefix + 'link_url');
                if (typeof AdsPiwik !== 'undefined') {
                    AdsPiwik.sendPaq('ads_create', 'click', 'choose_post_link');
                }
                return false;
            }.bind(this));

            addEvent(ge('ads_edit_link_type_show_other'), 'click', function() {
                this.params.link_type.force_show_other_link_types = true;
                this.updateUiParamVisibility('_link_type');
                return false;
            }.bind(this));
            break;
        case 'link_id':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Autocomplete(targetElem, this.getUiParamData(paramName), {
                selectedItems: this.params[paramName].value,
                defaultItems: this.getUiParamDefaultData(paramName),

                introText: this.getUiParamPlaceholderText(paramName),
                placeholder: this.getUiParamPlaceholderText(paramName),
                noResult: this.getUiParamNoResultText(paramName),

                dropdown: true,
                multiselect: false,
                big: true,
                withIcons: true,
                width: this.options.uiWidth,

                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.params[paramName].ui.disable(!this.params.link_type.editing || !this.params.link_type.allow_edit_all);
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'link_url':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            placeholderSetup(targetElem, {
                back: true,
                big: true
            });
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'link_domain':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            placeholderSetup(targetElem, {
                back: true,
                big: true
            });
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'title':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'link_title':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'description':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'category1_id':
        case 'category2_id':
        case 'subcategory1_id':
        case 'subcategory2_id':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                introText: getLang('ads_select_category'),
                placeholder: getLang('ads_select_category'),
                selectedItem: this.params[paramName].value,
                disabledText: this.getUiParamDisabledText(paramName),
                big: true,
                autocomplete: true,
                indexkeys: [1, 4],
                includeLabelsOnMatch: true,
                preventDuplicates: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.params[paramName].ui.disable(this.getUiParamEnabled(paramName) === false);
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'stats_url':
        case 'stats_url2':
        case 'stats_url_long':
        case 'stats_url_long2':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            placeholderSetup(targetElem, {
                back: true,
                big: true
            });
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'disclaimer_medical':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'disclaimer_specialist':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'disclaimer_supplements':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'disclaimer_finance':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'disclaimer_finance_name':
        case 'disclaimer_finance_license_no':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'age_restriction':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'link_button':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'cost_per_click':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'platform':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.params[paramName].ui.disable(this.params[paramName].disabled);
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
            // Be careful: values are inverted
        case 'platform_no_wall':
        case 'platform_no_ad_network':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: AdsEdit.invertCheckboxValue(this.params[paramName].value),
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, AdsEdit.invertCheckboxValue(state));
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'view_retargeting_group_id':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'views_limit_flag':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'views_limit_exact':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'campaign_type':
            targetElem = ge(this.options.targetIdPrefix + 'campaign_type_select');
            this.params[paramName].ui_select = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_campaign_type_select'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_select.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'campaign_type_input');
            this.params[paramName].ui_input = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_campaign_type_new'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_input.destroy();
            }.bind(this));

            targetElem = ge(this.options.targetIdPrefix + 'campaign_type_app');
            this.params[paramName].ui_app = new Radiobutton(targetElem, {
                width: this.options.uiWidth,
                label: getLang('ads_edit_ad_campaign_type_app_discount'),
                onSelect: function(value) {
                    this.onUiSelect(paramName, value)
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui_app.destroy();
            }.bind(this));

            Radiobutton.select(this.options.targetIdPrefix + paramName, this.params[paramName].value);
            break;
        case 'campaign_id':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            targetElem.removeAttribute('autocomplete');
            this.params[paramName].ui = new Dropdown(targetElem, this.getUiParamData(paramName), {
                selectedItem: this.params[paramName].value,
                big: true,
                width: this.options.uiWidth,
                onChange: function(value) {
                    this.onUiChange(paramName, value);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
        case 'campaign_name':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            placeholderSetup(targetElem, {
                back: true,
                big: true
            });
            addEvent(targetElem, this.interestingEvents, function(event) {
                return this.onUiEvent(paramName, event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'repeat_video':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            this.params[paramName].ui = new Checkbox(targetElem, {
                label: this.params[paramName].label_checkbox,
                checked: this.params[paramName].value,
                width: this.options.uiWidth,
                onChange: function(state) {
                    this.onUiChange(paramName, state);
                }.bind(this)
            });
            this.cur.destroy.push(function() {
                this.params[paramName].ui.destroy();
            }.bind(this));
            break;
    }

    switch (paramName) {
        case 'link_type':
            targetElem = ge(this.options.targetIdPrefix + 'link_object_complete');
            addEvent(targetElem, 'click', function(event) {
                this.completeLink();
                return false;
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_object_edit');
            addEvent(targetElem, 'click', function(event) {
                this.editLink();
                return false;
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));

            targetElem = ge(this.options.targetIdPrefix + 'link_object_cancel');
            addEvent(targetElem, 'click', function(event) {
                this.cancelLink();
                return false;
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'title':
            targetElem = ge(this.options.targetIdPrefix + 'title_reduce');
            addEvent(targetElem, 'click keypress', function(event) {
                return this.onUiEvent('title_reduce', event);
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
            break;
        case 'category1_id':
            targetElem = ge('ads_param_category_more');
            addEvent(targetElem, 'click', function() {
                this.showMoreCategories();
                return false;
            }.bind(this));
            this.cur.destroy.push(function(targetElem) {
                cleanElems(targetElem);
            }.pbind(targetElem));
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
            var paramSubvalue = '';
            if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
                paramValue = AdsEdit.ADS_AD_LINK_TYPE_GROUP;
            }
            if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)) {
                paramValue = AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID;
            }
            if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                paramValue = AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW;
                paramSubvalue = this.params.link_type.subvalue;
            }
            if (inArray(paramValue, [AdsEdit.ADS_AD_LINK_TYPE_URL])) {
                paramSubvalue = this.params.link_type.subvalue;
            }
            var elems = geByClass('ads_edit_link_type_card', 'ads_edit_link_type_cards_wrapper');
            var disableAllLinkTypes = !!(this.params.link_type.disabled || !this.params.link_type.editing || !this.params.link_type.allow_edit_all);
            var disableOtherPostTypes = inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && !!this.params.link_url.value;
            for (var i = 0, elem; elem = elems[i]; i++) {
                toggleClass(elem, 'selected', !!(intval(elem.getAttribute('value')) == paramValue && ((paramSubvalue && elem.getAttribute('subvalue') === paramSubvalue) || !paramSubvalue)));
                toggleClass(elem, 'disabled', disableAllLinkTypes || (disableOtherPostTypes && inArray(elem.getAttribute('value'), AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && elem.getAttribute('subvalue') !== paramSubvalue));
            }
            geByClass('ads_edit_link_type_cards_block_title').map(function(el) {
                toggleClass(el, 'disabled', disableAllLinkTypes)
            });
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
            this.params.link_type.complete = !!(false ||
                inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.value ||
                inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE]) && linkUrlOk ||
                this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO && this.params.link_id.value && this.params.link_owner_id.value && (linkUrlOk || !this.params.link_url.value) ||
                inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.link_id.value && this.params.link_owner_id.value ||
                this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_STORY && this.params.link_id.value
            );
            toggleClass('ads_param_link_object_complete', 'button_disabled', !(this.params.link_type.complete && (!inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) || this.params.link_id.promoted_post_checked)));
            break;
        case '_link_type_editing':
            toggleClass(this.options.targetIdPrefix + 'upload_video', 'button_disabled', !(this.params.link_type.editing));
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
        case '_link_post':
            var disabledButton = !!(!this.params.link_type.editing || this.params.link_url.value != '' && !this.params.link_type.complete);
            toggleClass(this.options.targetIdPrefix + 'post_create_post', 'button_disabled', disabledButton);
            break;
        case '_link_video':
            var linkResult = this.getLink();
            targetElem = geByClass1('ads_edit_link_go', this.options.targetIdPrefix + 'link_video_go_wrap');
            this.updateLink(targetElem, linkResult.link, linkResult.link_packed, linkResult.onclick, '_self');
            break;
        case 'title':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            var maxLengthNew = this.params[paramName].max_length;
            var isChanged = (targetElem.getAttribute('maxlength') != maxLengthNew);
            targetElem.setAttribute('maxlength', maxLengthNew);
            if (isChanged) {
                this.setTitle(this.params[paramName].value);
            }
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
                    this.titleTooltipHandler({
                        type: 'manual_hide'
                    });
                } else {
                    cur.adParamsHelp[paramName] = this.params['title_spelling'];
                    this.params['title_spelling'] = false;
                    this.titleTooltipHandler({
                        type: 'manual_show'
                    });
                }
            }
            break;
        case 'link_title':
            targetElem = ge(this.options.targetIdPrefix + paramName);
            var maxLengthNew = this.params[paramName].max_length;
            var isChanged = (targetElem.getAttribute('maxlength') != maxLengthNew);
            targetElem.setAttribute('maxlength', maxLengthNew);
            if (isChanged) {
                targetElem.value = this.params[paramName].value;
            }
            break;
        case 'link_button':
            this.initUiParam(paramName);
            if (this.params[paramName].uiInited) {
                this.params[paramName].value = this.params[paramName].ui.val();
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
                    this.descriptionTooltipHandler({
                        type: 'manual_hide'
                    });
                } else {
                    cur.adParamsHelp[paramName] = this.params['description_spelling'];
                    this.params['description_spelling'] = false;
                    this.descriptionTooltipHandler({
                        type: 'manual_show'
                    });
                }
            }
            break;
        case '_link_title':
        case '_title':
        case '_description':
            var paramNameOriginal = paramName.substr(1);
            var remainElem = ge(this.options.targetIdPrefix + paramNameOriginal + '_remain_length');
            var remainLength = this.params[paramNameOriginal].max_length - this.params[paramNameOriginal].value.length;
            if (remainElem) {
                remainElem.innerHTML = remainLength;
            }
            break;
        case 'category1_id':
            var value = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]) ? 125 : 0);
            var disabled = (value == 125);
            if (!value && this.params.category1_id.suggestions.length) {
                var suggestions = this.params.category1_id.suggestions;
                value = suggestions[0];
            }
            this.onParamUpdate(paramName, value, false, true);
            if (this.params[paramName].uiInited) {
                if (value) {
                    this.params[paramName].ui.selectItem(value);
                } else {
                    this.params[paramName].ui.clear();
                }

                this.params[paramName].ui.disable(disabled);
            }
            break;
        case 'category2_id':
            var value = 0;
            this.onParamUpdate(paramName, value, false, true);
            if (this.params[paramName].uiInited) {
                if (value) {
                    this.params[paramName].ui.selectItem(value);
                } else {
                    this.params[paramName].ui.clear();
                }
            }
            break;
        case 'disclaimer_medical':
        case 'disclaimer_specialist':
        case 'disclaimer_supplements':
        case 'disclaimer_finance':
            var disclaimers = ['disclaimer_medical', 'disclaimer_specialist', 'disclaimer_supplements', 'disclaimer_finance'];
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
            suffixesAll += ((this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK) ? '_click' : '_views');
            suffixesAll += ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE) ? '_exclusive' : '');
            suffixesAll += (isApp ? '_app' : '');

            var costPerClickValue = 'value' + suffixesAll;
            var costPerClickRecommendedShort = 'recommended' + suffixesAll + '_short';
            var costPerClickRecommendedLong = 'recommended' + suffixesAll + '_long';

            if (!this.params[paramName].edited || costPerClickValue !== this.params[paramName].last_value) {
                this.params[paramName].last_value = costPerClickValue;
                this.params[paramName].value = this.params[paramName][costPerClickValue];
                var targetElem = ge(this.options.targetIdPrefix + paramName);
                targetElem.value = this.params[paramName].value;
            }

            var currencyElem = ge(this.options.targetIdPrefix + paramName + '_currency');
            currencyElem.innerHTML = getLang('global_money_amount_rub_text', this.params[paramName].value);

            var recommendedShortElem = ge('ads_edit_recommended_cost_text');
            var recommendedLongElem = ge('ads_param_cost_per_click_recommended');
            recommendedShortElem.innerHTML = this.params[paramName][costPerClickRecommendedShort];
            recommendedLongElem.innerHTML = this.params[paramName][costPerClickRecommendedLong];
            break;
        case '_platform':
            this.params.platform.hidden = !!(!inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD && (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_STORY || !this.params.platform.allow_stories) && (!this.params.platform.allow_web || !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL])));
            this.params.platform_no_wall.hidden = !!(!inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD || !this.params.platform_no_wall.allow);
            this.params.platform_no_ad_network.hidden = !!(!inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD || !this.params.platform_no_ad_network.allow);
            break;
        case 'platform':
            var isDisclaimers = (this.params.disclaimer_medical.value || this.params.disclaimer_specialist.value || this.params.disclaimer_supplements.value || this.params.disclaimer_finance.value);
            this.params[paramName].disabled_web = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD && this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE || this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_CLICK || isDisclaimers);
            this.params[paramName].disabled = (!inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD && (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_STORY || !this.params.platform.allow_stories) && this.params[paramName].disabled_web);

            var formatType = this.params.format_type.value;
            if (this.params.platform.disabled) {
                this.params[paramName].value = (this.params.platform.values_disabled[formatType] ? this.params.platform.values_disabled[formatType] : this.params.platform.values_disabled[0]);
            } else {
                this.params[paramName].value = (this.params.platform.values_normal[formatType] ? this.params.platform.values_normal[formatType] : this.params.platform.values_normal[0]);
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
            if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) || this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_STORY) {
                return '/adsedit?act=search_user_objects&section=groups&group_purpose=' + AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_LINK_OBJECT;
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
            return this.params[paramName].data_all[this.params.format_type.value] || this.params[paramName].data_all[0] || [];
        case 'views_limit_exact':
            return this.params[paramName].data_ranges[this.params.format_type.value] || [];
        default:
            return this.params[paramName].data || [];
    }
}

AdsViewEditor.prototype.updateUiParamData = function(paramName) {
    if (!('data' in this.params[paramName])) {
        try {
            console.error("Can't update data");
        } catch (e) {}
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
        default: var data = this.getUiParamData(paramName);
        if (typeof(data) === 'string') {
            data = false;
        }
        return data || this.params[paramName].data || [];
    }
}

AdsViewEditor.prototype.updateUiParamDefaultData = function(paramName) {
    if (!('data' in this.params[paramName])) {
        try {
            console.error("Can't update default data");
        } catch (e) {}
        return;
    }

    if (!this.params[paramName].ui) {
        return;
    }

    var defaultData = this.getUiParamDefaultData(paramName);
    this.params[paramName].ui.setOptions({
        defaultItems: defaultData
    });
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
        case 'repeat_video':
            return !!(this.params.video_id.value);
        default:
            return null;
    }
}

AdsViewEditor.prototype.updateUiParamEnabled = function(paramName) {
    if (!('data' in this.params[paramName])) {
        try {
            console.error("Can't update enabled state");
        } catch (e) {}
        return;
    }

    this.updateUiParamVisibility(paramName); // Should be before any ui.disable()

    if (this.params[paramName].ui) {
        var enabled = this.getUiParamEnabled(paramName);
        if (enabled !== null) {
            if (!this.params[paramName].value) {
                this.params[paramName].ui.disable(enabled); // Fix disabling introText
                this.params[paramName].ui.disable(!enabled);
                this.params[paramName].ui.clear && this.params[paramName].ui.clear(); // Fix placeholder
            }
        }
    }
}

AdsViewEditor.prototype.updateUiParamVisibility = function(paramName) {
    switch (paramName) {
        case 'link_id':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'link_url':
            var linkTypeNeedsVisibleLinkUrl = inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE]);
            var showPromotedPostLinkUrl = inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && (!!this.params.link_url.value || this.params.link_url.force_show);
            this.params[paramName].hidden = !(linkTypeNeedsVisibleLinkUrl || showPromotedPostLinkUrl);

            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case '_link_buttons':
            var showButtons = true;
            if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && this.params.link_url.hidden) {
                showButtons = false;
            }
            toggle(ge('ads_edit_link_object_buttons_row'), showButtons);
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
        case '_link_type':
            toggleClass('ads_edit_ad_row_link_upload_video', 'unshown', !(this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO));
            var isAdaptiveAd = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL) && (this.params.link_type.subvalue === 'adaptive_ad');
            var isStory = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_STORY);

            var hideOtherLinkTypes = (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) || isAdaptiveAd || isStory) && !this.params.link_type.force_show_other_link_types;

            var otherLinkTypesBlock = geByClass1('ads_edit_link_type_cards_block_other');
            if (hideOtherLinkTypes && isVisible(otherLinkTypesBlock)) {
                slideUp(otherLinkTypesBlock, 200);
            }
            if (!hideOtherLinkTypes && !isVisible(otherLinkTypesBlock)) {
                slideDown(otherLinkTypesBlock, 200);
            }
            toggleClass('ads_edit_link_type_show_other_row', 'unshown', !hideOtherLinkTypes || !this.params.link_type.editing);
            break;
        case '_link_type_editing':
            toggleClass(this.options.targetIdPrefix + 'link_object_complete', 'unshown', !(this.params.link_type.editing));
            toggleClass(this.options.targetIdPrefix + 'link_object_edit', 'unshown', !!(this.params.link_type.editing));
            toggleClass('ads_edit_panels_not_link', 'unshown', !!(this.params.link_type.editing));
            break;
        case '_link_id':
            var linkResult = this.getLink();
            var elemVisible = !!(linkResult.link_url && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]));
            toggleClass(this.options.targetIdPrefix + 'link_id_go_wrap', 'unshown', !elemVisible);
            break;
        case '_link_url':
            var linkResult = this.getLink();
            var elemVisible = !!(linkResult.link_url && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE]) ||
                this.params.link_id.value && this.params.link_owner_id.value && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)
            );
            toggleClass(this.options.targetIdPrefix + 'link_url_go_wrap', 'unshown', !elemVisible);
            break;
        case '_link_post':
            var visibleCreatePostButton = !!((this.params.link_type.value != AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH || !this.params.link_type.complete) && this.params.link_type.allow_edit_all && this.params.link_type.allow_create_post);
            var visibleEditPostButton = !!(this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH && this.params.link_type.complete && this.params.link_type.allow_edit_post);
            toggleClass(this.options.targetIdPrefix + 'post_create_post', 'unshown', !visibleCreatePostButton);
            toggleClass(this.options.targetIdPrefix + 'post_or_choose_post', 'unshown', !visibleCreatePostButton);
            toggleClass(this.options.targetIdPrefix + 'post_edit_post', 'unshown', !visibleEditPostButton);
            toggleClass('ads_edit_ad_row_link_editing_post', 'unshown', !(inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && (visibleCreatePostButton || visibleEditPostButton)));
            break;
        case '_link_video':
            var linkResult = this.getLink();
            var elemVisible = !!(linkResult.onclick && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO);
            toggleClass(this.options.targetIdPrefix + 'link_video_go_wrap', 'unshown', !elemVisible);
            break;
        case 'link_title':
            this.initUiParam(paramName);
            this.params[paramName].hidden = (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'link_button':
            this.initUiParam(paramName);
            this.params[paramName].hidden = (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'format_type':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);

            var linkTypeValue = this.params.link_type.value;
            var linkTypeSubvalue = this.params.link_type.subvalue;
            var elemsHidden = {};

            toggleClass(this.options.targetIdPrefix + paramName + '_text_image_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL]) && inArray(linkTypeSubvalue, ['url', 'group', 'app'])));
            toggleClass(this.options.targetIdPrefix + paramName + '_big_image_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO])));
            toggleClass(this.options.targetIdPrefix + paramName + '_exclusive_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]) && this.params.format_type.allow_exclusive));
            toggleClass(this.options.targetIdPrefix + paramName + '_promotion_community_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])));
            toggleClass(this.options.targetIdPrefix + paramName + '_app_in_news_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_in_news_links_ids[this.params.link_id.value] && this.params.format_type.allow_app_in_news));
            toggleClass(this.options.targetIdPrefix + paramName + '_apps_only_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_trusted_links_ids[this.params.link_id.value]));
            toggleClass(this.options.targetIdPrefix + paramName + '_groups_only_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC]) && this.params.format_type.allow_groups_only));
            toggleClass(this.options.targetIdPrefix + paramName + '_big_app_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_APP]) && this.params.link_id.app_trusted_links_ids[this.params.link_id.value] && this.params.format_type.allow_big_app));
            toggleClass(this.options.targetIdPrefix + paramName + '_mobile_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE])));
            toggleClass(this.options.targetIdPrefix + paramName + '_promoted_post_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW, AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH])));
            toggleClass(this.options.targetIdPrefix + paramName + '_adaptive_ad_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_URL]) && this.params.format_type.allow_adaptive_ad && inArray(linkTypeSubvalue, ['adaptive_ad'])));
            toggleClass(this.options.targetIdPrefix + paramName + '_story_wrap', 'unshown', elemsHidden[AdsEdit.ADS_AD_FORMAT_TYPE_STORY] = !(inArray(linkTypeValue, [AdsEdit.ADS_AD_LINK_TYPE_STORY])));

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

            setStyle('ads_param_format_type_wrap', {
                height: ''
            });
            break;
        case '_format_type':
            var headerTitle = '';
            switch (this.params.format_type.value) {
                case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST:
                    headerTitle = getLang('ads_edit_ad_header_setting_link_params');
                    break;
                case AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD:
                    headerTitle = getLang('ads_edit_ad_header_setting_adaptive_ad');
                    break;
                default:
                    headerTitle = getLang('ads_edit_ad_header_setting_view');
            }
            ge('ads_edit_value_header_view').innerHTML = headerTitle;
            var allowPhoto = !(inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_STORY])) && !this.params.video_id.allow_video_only;
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            var allowAdaptiveAdVideo = isAdaptiveAd && this.params.video_id.allow;
            toggleClass('ads_edit_ad_row_upload_photo', 'unshown', !(allowPhoto || allowAdaptiveAdVideo)); // wrapper for photo & video
            toggleClass('ads_edit_upload_photo', 'unshown', !allowPhoto); // upload photo button
            toggleClass('ads_edit_upload_video', 'unshown', !allowAdaptiveAdVideo); // upload video button
            toggleClass('ads_edit_upload_video_or_label', 'unshown', !(allowPhoto && allowAdaptiveAdVideo)); // or label
            toggleClass('ads_edit_ad_row_upload_photo_icon', 'unshown', (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) && !this.isStoryPromo());
            break;
        case 'title':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case '_title':
            toggleClass(this.options.targetIdPrefix + 'title_reduce', 'unshown', !(inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS, AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD]) && this.params.title.value_max.match(/[^\s:,][\s:,]+[^\s:,]/)));
            break;
        case 'description':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case '_view_additional':
            toggleClass('ads_edit_ad_row_view_additional', 'unshown', !!(this.params.disclaimer_medical.hidden && this.params.disclaimer_specialist.hidden && this.params.disclaimer_supplements.hidden && this.params.disclaimer_finance.hidden));
            break;
        case 'disclaimer_medical':
        case 'disclaimer_specialist':
        case 'disclaimer_supplements':
        case 'disclaimer_finance':
            this.initUiParam(paramName);
            toggleClass(this.options.targetIdPrefix + paramName + '_wrap', 'unshown', !!this.params[paramName].hidden);
            break;
        case 'disclaimer_finance_name':
        case 'disclaimer_finance_license_no':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'category1_id':
        case 'category2_id':
        case 'subcategory1_id':
        case 'subcategory2_id':
            var viewParams = cur.targetingEditor.viewEditor.getParams();
            this.params[paramName].hidden = (
                this.params[paramName].hidden_normal ||
                (
                    this.params.category1_id.value == 125 &&
                    !this.params.category2_id.value &&
                    this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP &&
                    this.params.link_id.app_game_links_ids[this.params.link_id.value]
                ) ||
                (
                    inArray(viewParams.link_type, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) &&
                    this.params.category1_id.suggestions[0] &&
                    this.params.category1_id.value // if can detect category automatically from suggestions
                )
            );
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'stats_url':
        case 'stats_url2':
        case 'stats_url_long':
        case 'stats_url_long2':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'cost_type':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'platform':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'platform_no_wall':
        case 'platform_no_ad_network':
            this.initUiParam(paramName);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !!this.params[paramName].hidden);
            break;
        case 'view_retargeting_group_id':
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
        case 'repeat_video':
            this.initUiParam(paramName);
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            toggleClass('ads_edit_ad_row_' + paramName, 'unshown', !(this.params.video_id.allow && isAdaptiveAd));
            break;
    }
}

AdsViewEditor.prototype.getUiParamPlaceholderText = function(paramName) {
    switch (paramName) {
        case 'link_id':
            switch (this.params.link_type.value) {
                case AdsEdit.ADS_AD_LINK_TYPE_STORY:
                case AdsEdit.ADS_AD_LINK_TYPE_GROUP:
                case AdsEdit.ADS_AD_LINK_TYPE_EVENT:
                case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC:
                    return getLang('ads_type_community');
                case AdsEdit.ADS_AD_LINK_TYPE_APP:
                    return getLang('ads_type_app');
            }
            break;
        default:
            return '';
    }
}

AdsViewEditor.prototype.updateUiParamPlaceholderText = function(paramName) {
    if (!('data' in this.params[paramName])) {
        try {
            console.error("Can't update placeholder text");
        } catch (e) {}
        return;
    }

    if (!this.params[paramName].ui) {
        return;
    }

    var placeholderText = this.getUiParamPlaceholderText(paramName);
    this.params[paramName].ui.setOptions({
        introText: placeholderText,
        placeholder: placeholderText
    });
    this.updateUiParamData(paramName); // Workaround to set introText and placeholder
}

AdsViewEditor.prototype.getUiParamNoResultText = function(paramName) {
    switch (paramName) {
        case 'link_id':
            return getLang('ads_notfound_link_object');
        default:
            return '';
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
        try {
            console.error("Can't update disabled text");
        } catch (e) {}
        return;
    }

    if (!this.params[paramName].ui) {
        return;
    }

    var disabledText = this.getUiParamDisabledText(paramName);
    this.params[paramName].ui.setOptions({
        disabledText: disabledText
    });
}

AdsViewEditor.prototype.onParamUpdate = function(paramName, paramValue, forceDataUpdate, delayed, options) {
    var paramValueOld = this.params[paramName].value;
    options = options || {};
    var paramSubValue = options.paramSubValue ? options.paramSubValue : '';

    // postpone function execution
    if (!delayed) {
        var delayMs = 1;

        switch (paramName) {
            case 'format_type': // animate layout when switching from/to big_app format
                if (((paramValue == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) || (paramValueOld == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP)) && (paramValueOld != paramValue)) {
                    animate(this.preview.layout, {
                        height: 0
                    }, 200, function() {
                        setTimeout(function() {
                            animate(this.preview.layout, {
                                height: 315 + 15
                            }, 200); // ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG height + 15px padding
                        }.bind(this), 400);
                    }.bind(this));
                    delayMs = 200;
                }
                break;
        }

        setTimeout(function() {
            this.onParamUpdate(paramName, paramValue, forceDataUpdate, true, options);
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

        if (this.params[paramName].value === paramValue && !paramSubValue) {
            break;
        }

        if ('value_escaped' in this.params[paramName]) {
            this.params[paramName].value_escaped = AdsEdit.escapeValue(paramValue);
        }
        this.params[paramName].value = paramValue;

        //debugLog(paramName + ' updated: ' + paramValueOld + ' => ' + this.params[paramName].value);

        switch (paramName) {
            case 'format_type':
                var formatPhotoSize = this.getFormatPhotoSize();
                this.params.cost_type.cpm_only = (
                    inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_STORY]) ||
                    (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && (!this.params.cost_type.allow_promoted_posts_cpc || !this.params.link_id.promoted_posts_cpc))
                );
                this.params.cost_type.cpc_only = (
                    inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD])
                );
                this.params.cost_type.hidden = this.params.cost_type.cpm_only || this.params.cost_type.cpc_only;

                if (this.params.cost_type.cpm_only) {
                    this.setCostType(AdsEdit.ADS_AD_COST_TYPE_VIEWS);
                }
                if (this.params.cost_type.cpc_only) {
                    this.setCostType(AdsEdit.ADS_AD_COST_TYPE_CLICK);
                }

                this.params.title.hidden = (inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_STORY]));
                this.params.title.disabled = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS, AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE]);
                this.params.title.max_length = ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) ? this.params.title.max_length_adaptive_ads : this.params.title.max_length_normal);
                this.params.link_title.hidden = (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
                this.params.link_title.max_length = ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) ? this.params.link_title.max_length_adaptive_ads : 0);
                this.params.link_button.hidden = (this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
                this.params.description.hidden = !inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD]);
                this.params.description.max_length = ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) ? this.params.description.max_length_mobile : ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) ? this.params.description.max_length_adaptive_ads : this.params.description.max_length_normal));
                this.params.disclaimer_medical.may_be_any = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD, AdsEdit.ADS_AD_FORMAT_TYPE_STORY]);
                this.params.disclaimer_medical.hidden = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_medical.allow);
                this.params.disclaimer_specialist.hidden = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_specialist.allow);
                this.params.disclaimer_supplements.hidden = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_supplements.allow);
                this.params.disclaimer_finance.hidden = (!this.params.disclaimer_medical.may_be_any || !this.params.disclaimer_finance.allow);
                this.params.stats_url.hidden = !(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE && this.params.stats_url.allow_exclusive || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && this.params.stats_url.allow_promoted_post || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD && this.params.stats_url.allow_adaptive_ad || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY && this.params.stats_url.allow_story);
                this.params.stats_url2.hidden = !(!this.params.stats_url.hidden && this.params.stats_url2.allow);
                this.params.stats_url_long.hidden = !(this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && this.params.stats_url_long.allow_promoted_post);
                this.params.stats_url_long2.hidden = !(!this.params.stats_url_long.hidden && this.params.stats_url_long2.allow_promoted_post);
                this.params.view_retargeting_group_id.hidden = (!this.params.view_retargeting_group_id.allow || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST || !this.params.view_retargeting_group_id.value);
                this.params.views_limit_flag.hidden = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY);
                this.params.views_limit_exact.hidden = (this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_STORY);

                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY]);
                    if ((!this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY]) || (!this.params.photo_link['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY])) {
                        this.updateNeeded.need_format_promotion_community = true;
                    }
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL]);
                    if (!this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL]) {
                        this.updateNeeded.need_format_app_in_news = true;
                    }
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE]);
                    if (!this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE]) {
                        this.updateNeeded.need_format_apps_only = true;
                    }
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY]);
                    if (!this.params.photo['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE]) {
                        this.updateNeeded.need_format_promotion_community = true;
                    }
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG]);
                    if (!this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG]) {
                        this.updateNeeded.need_format_big_app = true;
                    }
                }
                if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) {
                    this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE]);
                    if (!this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE]) {
                        this.updateNeeded.need_format_mobile = true;
                    }
                }

                if (inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD, AdsEdit.ADS_AD_FORMAT_TYPE_STORY])) {
                    this.params['views_limit_exact'].value = this.params['views_limit_exact'].default_values[this.params.format_type.value];
                    this.setViewsLimitExact();
                }

                this.updateUiParam('title');
                this.updateUiParam('_title');
                this.updateUiParam('link_title');
                this.updateUiParam('link_button');
                this.updateUiParam('description');
                this.updateUiParam('_description');
                this.updateUiParam('cost_per_click');
                this.updateUiParam('platform');
                this.updateUiParam('view_retargeting_group_id');
                this.updateUiParam('views_limit_flag');
                this.updateUiParamData('views_limit_exact');
                this.updateUiParam('views_limit_exact');
                this.updateUiParamVisibility('_format_type');
                this.updateUiParamVisibility('title');
                this.updateUiParamVisibility('_title');
                this.updateUiParamVisibility('link_title');
                this.updateUiParamVisibility('_link_title');
                this.updateUiParamVisibility('link_button');
                this.updateUiParamVisibility('description');
                this.updateUiParamVisibility('_view_additional');
                this.updateUiParamVisibility('disclaimer_medical');
                this.updateUiParamVisibility('disclaimer_specialist');
                this.updateUiParamVisibility('disclaimer_supplements');
                this.updateUiParamVisibility('disclaimer_finance');
                this.updateUiParamVisibility('disclaimer_finance_name');
                this.updateUiParamVisibility('disclaimer_finance_license_no');
                this.updateUiParamVisibility('age_restriction');
                this.updateUiParamVisibility('stats_url');
                this.updateUiParamVisibility('stats_url2');
                this.updateUiParamVisibility('stats_url_long');
                this.updateUiParamVisibility('stats_url_long2');
                this.updateUiParamVisibility('view_retargeting_group_id');
                this.updateUiParamVisibility('cost_type');
                this.updateUiParamVisibility('platform_no_wall');
                this.updateUiParamVisibility('platform_no_ad_network');
                this.updateUiParamVisibility('views_limit_flag');
                this.updateUiParamVisibility('views_limit_exact');
                this.updateUiParamVisibility('category1_id');
                this.updateUiParamEnabled('repeat_video');
                this.updatePreview('layout');
                this.updatePreview('play');
                this.updatePreview('description');
                this.updatePreview('domain');
                this.updatePreview('link_title');
                this.updatePreview('link_button');
                this.updatePreview('community_join');
                this.updatePreview('app_rating');
                this.updatePreview('mobile_app_bottom');
                this.updatePreview('age_restriction');
                this.updatePreview('big_app_info_box');
                this.updatePreview('disclaimers');
                this.updatePhotoData();
                this.updatePhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON);
                this.updatePhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON);
                this.updatePhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON);
                this.updatePreview('photo_icon');

                this.updateTips();

                this.targetingEditor.updateUiCriterionData('geo_mask');

                isUpdateNeeded = true;
                break;
            case 'cost_type':
                this.params.views_limit_flag.hidden = (this.params.cost_type.value != AdsEdit.ADS_AD_COST_TYPE_VIEWS || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY);
                this.params.views_limit_exact.hidden = (this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK || this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_STORY);

                this.updateUiParam('cost_per_click');
                this.updateUiParam('platform');
                this.updateUiParam('views_limit_flag');
                this.updateUiParamVisibility('views_limit_flag');
                this.updateUiParamVisibility('views_limit_exact');

                isUpdateNeeded = true;
                break;
            case 'link_type':
                this.params.link_type.subvalue = paramSubValue;
                this.params.link_id.value = '';
                this.params.link_owner_id.value = '';
                this.params.link_id.data = [];
                this.params.link_id.hidden = !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_STORY]);
                this.params.link_domain.hidden = !inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_URL, AdsEdit.ADS_AD_LINK_TYPE_VIDEO]);
                if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) {
                    this.params.link_id.value = this.params.link_id.video_value;
                    this.params.link_owner_id.value = this.params.link_owner_id.video_value;
                }
                if (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) || inArray(paramValueOld, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)) {
                    var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
                    this.params.link_domain.value = '';
                    this.params.link_domain.link_url = '';
                    this.params.link_domain.delayed_error = '';
                    this.params.link_domain.needed = (linkUrlInfo && (!linkUrlInfo.domain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/) || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)));
                    this.params.link_domain.disabled = (!this.params.link_type.cancelling || !this.params.link_domain.needed);
                    this.params.link_domain.is_ok = false;
                    this.params.link_domain_confirm.value = 0;
                }

                this.updateUiParam('_platform');
                this.updateUiParam('link_id');
                this.updateUiParam('link_url');
                this.updateUiParam('link_domain');
                this.updateUiParam('_link_type');
                this.updateUiParam('_link_id');
                this.updateUiParam('_link_url');
                this.updateUiParam('_link_post');
                this.updateUiParam('_link_video');
                this.updateUiParamPlaceholderText('link_id');
                this.updateUiParamData('link_id');
                this.updateUiParamVisibility('_link_type');
                this.updateUiParamVisibility('_link_id');
                this.updateUiParamVisibility('_link_url');
                this.updateUiParamVisibility('_link_post');
                this.updateUiParamVisibility('_link_video');
                this.updateUiParamVisibility('link_id');
                this.updateUiParamVisibility('link_url');
                this.updateUiParamVisibility('link_domain');
                this.updateUiParamVisibility('_link_buttons');
                if (!this.params.link_type.cancelling && (inArray(paramValue, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) || inArray(paramValueOld, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP))) {
                    this.updateLinkDomain();
                }

                this.updateTips();
                if (paramValueOld == 0) {
                    this.showLinkObjectPanel();
                }

                if (!this.params.link_type.cancelling && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP, AdsEdit.ADS_AD_LINK_TYPE_STORY])) {
                    this.updateNeeded.need_links = true;
                    isUpdateNeeded = true;
                }
                if (!this.params.link_type.cancelling && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                    this.updateNeeded.need_link_post = true;
                    isUpdateNeeded = true;
                }
                break;
            case 'link_id':
                if (inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])) {
                    var items = this.params.link_id.ui.selectedItems();
                    var itemId = intval(items && items[0] && items[0][0] || 0);
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

                if (this.params.link_url.storiesContainer) {
                    var selectedOwnersInfo = this.params.link_id.ui.selectedItems();
                    if (selectedOwnersInfo && selectedOwnersInfo.length) {
                        // ����, ��� � �������� ���������� ����� �� selectedOwnersInfo
                        this.params.link_url.storiesContainer.setOwnerInfo(-selectedOwnersInfo[0][0], selectedOwnersInfo[0][1], selectedOwnersInfo[0][3]);
                    }
                }
                break;
            case 'link_url':
                var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
                this.params.link_url.is_ok = !!linkUrlInfo;
                // <???>
                this.params.link_url_vk.value = 0;
                this.params.link_url_vk.link_type_value = 0;
                this.params.link_url_vk.link_id_value = 0;
                // </???>
                if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                    this.params.link_id.value = 0;
                    this.params.link_id.promoted_post_checked = false;
                    this.params.link_id.promoted_posts_cpc = false;
                    this.params.link_owner_id.value = 0;
                }
                this.params.link_domain.value = '';
                this.params.link_domain.link_url = '';
                this.params.link_domain.delayed_error = '';
                this.params.link_domain.needed = (linkUrlInfo && (!linkUrlInfo.domain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/) || inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD));
                this.params.link_domain.disabled = (!this.params.link_type.cancelling || !this.params.link_domain.needed);
                this.params.link_domain.is_ok = false;
                this.params.link_domain_confirm.value = 0;
                this.params.promoted_post_need_confirmation.value = 0;
                this.updateUiParam('link_domain');
                this.updateUiParam('link_type');
                this.updateUiParam('_link_type');
                this.updateUiParam('_link_url');
                this.updateUiParam('_link_post');
                this.updateUiParam('_link_video');
                this.updateUiParamVisibility('link_url');
                this.updateUiParamVisibility('_link_url');
                this.updateUiParamVisibility('_link_post');
                this.updateUiParamVisibility('_link_buttons');
                if (!this.params.link_type.cancelling) {
                    this.updateLinkDomain();
                }
                if (!this.params.link_type.cancelling && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
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
            case 'link_title':
                this.updateUiParam(paramName);
                this.updateUiParam('_link_title');
                this.updateUiParamVisibility('_link_title');
                this.updatePreview(paramName);
                break;
            case 'description':
                this.updateUiParam(paramName);
                this.updateUiParam('_description');
                this.updatePreview(paramName);
                break;
            case 'category1_id':
                this.params.subcategory1_id.value = 0;

                this.updateUiParamVisibility('category1_id');
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
            case 'disclaimer_finance':
                this.params.disclaimer_finance_name.hidden = !this.params.disclaimer_finance.value;
                this.params.disclaimer_finance_license_no.hidden = !this.params.disclaimer_finance.value;
                this.updateUiParam('disclaimer_finance');
                this.updateUiParam('platform');
                this.updateUiParamVisibility('disclaimer_finance_name');
                this.updateUiParamVisibility('disclaimer_finance_license_no');
                this.updatePreview('disclaimer_finance');
                this.updatePreview('disclaimers');
                break;
            case 'disclaimer_finance_name':
                this.updateUiParam('disclaimer_finance_name');
                this.updatePreview('disclaimer_finance');
                this.updatePreview('disclaimers');
                break;
            case 'disclaimer_finance_license_no':
                this.updateUiParam('disclaimer_finance_license_no');
                this.updatePreview('disclaimer_finance');
                this.updatePreview('disclaimers');
                break;
            case 'age_restriction':
                this.updateUiParam('age_restriction');
                this.updatePreview('age_restriction');
                this.updatePreview('domain');
                break;
            case 'link_button':
                this.updateUiParam('link_button');
                this.updatePreview('link_button');
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
                } else if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) {
                    auctionName = 'adaptive_ads';
                } else if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY) {
                    auctionName = 'stories';
                }

                var suffixesAll = '';
                suffixesAll += ((this.params.cost_type.value == AdsEdit.ADS_AD_COST_TYPE_CLICK) ? '_click' : '_views');
                suffixesAll += ((this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE) ? '_exclusive' : '');
                suffixesAll += (isApp ? '_app' : '');

                var multClick = (this.params.cost_per_click.coeffs[auctionName] || this.params.cost_per_click.coeffs['site']);
                var multExclusive = 2;
                var multApp = 1 / 2;

                var costPerClickValue = 'value' + suffixesAll;

                var suffixes = [{
                        from: '_views',
                        to: '_click',
                        mult: 1 * multClick
                    },
                    {
                        from: '_click',
                        to: '_click_exclusive',
                        mult: 1 * multExclusive
                    },
                    {
                        from: '_click_exclusive',
                        to: '_click_app',
                        mult: 1 / multExclusive * multApp
                    },
                    {
                        from: '_click_app',
                        to: '_click_exclusive_app',
                        mult: 1 * multExclusive
                    },
                    {
                        from: '_click_exclusive_app',
                        to: '_views_exclusive_app',
                        mult: 1 / multClick
                    },
                    {
                        from: '_views_exclusive_app',
                        to: '_views_app',
                        mult: 1 / multExclusive
                    },
                    {
                        from: '_views_app',
                        to: '_views_exclusive',
                        mult: 1 * multExclusive / multApp
                    },
                    {
                        from: '_views_exclusive',
                        to: '_views',
                        mult: 1 / multExclusive
                    }
                ];

                var values = {};

                values[costPerClickValue] = Number(this.params.cost_per_click.value);

                do {
                    var valuesCountComplete = 0;
                    var valuesCountTotal = 0;

                    for (var iSuffix in suffixes) {
                        var suffixInfo = suffixes[iSuffix];
                        var valueNameTo = 'value' + suffixInfo.to;
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
                var formatType = this.params.format_type.value;
                var formatTypeNormal = (this.params.platform.values_normal[formatType] ? formatType : 0);
                this.params.platform.values_normal[formatTypeNormal] = this.params.platform.value;

                isUpdateNeeded = true;
                break;
            case 'platform_no_wall':
                isUpdateNeeded = true;
                break;
            case 'platform_no_ad_network':
                isUpdateNeeded = true;
                break;
            case 'campaign_type':
                this.params.campaign_id.hidden = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW || this.params.campaign_id.data.length == 0 || (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET && !this.params.campaign_id.value_app));
                this.params.campaign_name.hidden = !this.params.campaign_id.hidden;
                this.params.campaign_id.disabled = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET);
                this.params.campaign_name.disabled = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET);
                if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET) {
                    this.params.campaign_id.value = this.params.campaign_id.value_app;
                    this.params.campaign_name.value = getLang('ads_default_first_app_campaign_name');
                } else if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_OLD) {
                    this.params.campaign_id.value = this.params.campaign_id.value_normal;
                    this.params.campaign_name.value = '';
                } else if (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_CREATE_NEW) {
                    this.params.campaign_id.value = 0;
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

            var elems = geByClass('ads_edit_link_type_card', 'ads_edit_link_type_cards_wrapper');
            for (var i = 0, elem; elem = elems[i]; i++) {
                removeClass(elem, 'selected');
            }
            addClass(curElem, 'selected');

            var paramValue = curElem.getAttribute('value');
            var paramSubValue = curElem.getAttribute('subvalue');
            this.onParamUpdate(paramName, paramValue, undefined, undefined, {
                paramSubValue: paramSubValue
            });

            if (typeof AdsPiwik !== 'undefined') {
                AdsPiwik.sendPaq('ads_create', 'click', paramSubValue);
            }
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
        case 'stats_url2':
        case 'stats_url_long':
        case 'stats_url_long2':
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
        case 'link_title':
        case 'title':
        case 'description':
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
        case 'disclaimer_finance_name':
        case 'disclaimer_finance_license_no':
            correctValue.bind(this)(false, event);
            // setTimeout at least for IE
            setTimeout(correctValue.bind(this, true, event), 100);
            break;
    }

    return true;


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
        if (param === 'title' && this.params.title.disabled) {
            return;
        }

        this.updateNeeded['need_' + param + '_spelling'] = true;
        this.needDataUpdate();
    }
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

    var updateTargetingForPromotedPost = false;

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

    if (isObject(result)) {
        if ('show_audience_notify' in result) {
            this.userData.showNotify = result['show_audience_notify'];
        }

        if ('user_name' in result) {
            this.userData.userName = result['user_name'];
        }

        if ('budget_min' in result) {
            this.userData.budgetMin = result['budget_min'];
        }

        if ('budget' in result) {
            this.userData.budget = result['budget'];
        }

        if ('audience_count_max' in result) {
            this.userData.audienceCountMax = result['audience_count_max'];
        }

        if ('notify_close_hash' in result) {
            this.userData.notifyCloseHash = result['notify_close_hash'];
        }
    }

    if (isObject(result) && 'audience_count_text' in result) {
        var targetElem = ge('ads_edit_audience_text');
        targetElem.innerHTML = result.audience_count_text;

        this.triggerAudienceNotify(data, result);
    }

    // Temporary disabled
    if (false && isObject(result) && 'link_url_vk_link_type' in result && data.link_url === this.params.link_url.value) {
        this.params.link_url_vk.value = 1;
        this.params.link_url_vk.link_type_value = result.link_url_vk_link_type;
        this.params.link_url_vk.link_id_value = result.link_url_vk_link_id;
    }

    if (isObject(result) && 'post_link_id' in result) {
        if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && data.link_type == this.params.link_type.value && data.link_url == this.params.link_url.value) {
            this.params.link_type.value = result['post_link_type'];
            this.params.link_type.subvalue = result['post_link_subtype'];
            this.params.link_id.value = result['post_link_id'];
            this.params.link_owner_id.value = result['post_link_owner_id'];
            this.params.link_id.promoted_post_text = result['post_text'];
            this.params.link_id.promoted_post_kludges_have = result['post_kludges_have'];
            this.params.link_id.promoted_posts_cpc = result['post_cpc_allowed'];
            this.params.link_id.promoted_post_checked = true;

            this.params.cost_type.cpm_only = !this.params.cost_type.allow_promoted_posts_cpc || !this.params.link_id.promoted_posts_cpc;
            this.params.cost_type.hidden = this.params.cost_type.cpm_only;

            if (this.params.cost_type.promoted_posts_cpc_default && !this.params.cost_type.cpm_only) {
                this.setCostType(AdsEdit.ADS_AD_COST_TYPE_CLICK);
            } else {
                this.setCostType(AdsEdit.ADS_AD_COST_TYPE_VIEWS);
            }

            this.updateUiParam('link_type');
            this.updateUiParam('_link_type');
            this.updateUiParam('_link_url');
            this.updateUiParam('cost_per_click');
            this.updateUiParamVisibility('_link_url');
            this.updateUiParamVisibility('_link_post');
            this.updateUiParamVisibility('cost_type');
            this.updatePreview('promoted_post');

            if ('category_suggestions' in result) {
                this.params.category1_id.suggestions = result.category_suggestions;
                this.updateUiParam('category1_id');
            } else {
                this.params.category1_id.suggestions = [];
                this.updateUiParam('category1_id');
            }

            updateTargetingForPromotedPost = true;
        }
    }

    if (isObject(result) && 'post_check_error' in result) {
        this.editLink();
        this.params.link_id.promoted_post_checked = false;
        this.updateUiParam('_link_type');
    }

    if (isObject(result) && 'post_text_new' in result) {
        if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && data.link_type == this.params.link_type.value && data.link_url == this.params.link_url.value) {
            this.params.link_id.promoted_post_text = result['post_text_new'];
            this.params.link_id.promoted_post_kludges_have = result['post_kludges_have'];

            this.updatePreview('promoted_post');

            updateTargetingForPromotedPost = true;
        }
    }

    if (updateTargetingForPromotedPost) {
        this.targetingEditor.updateUiCriterionVisibility('price_list_id');
        this.targetingEditor.updateUiCriterionVisibility('price_list_retargeting_formula');
        this.targetingEditor.updateUiCriterionVisibility('pinned_card_1');

        var priceListIdVisible = this.targetingEditor.getUiCriterionVisibility('price_list_id', false);
        if (priceListIdVisible === false) {
            this.targetingEditor.correctCriterion('price_list_id');
            this.targetingEditor.correctCriterion('price_list_retargeting_formula');
            this.targetingEditor.updateUiCriterionVisibility('price_list_id');
            this.targetingEditor.updateUiCriterionVisibility('pinned_card_1');
            this.targetingEditor.updateUiCriterionVisibility('price_list_retargeting_formula');
        }

        this.targetingEditor.eventsRetargetingGroupsUpdateRules('events_retargeting_groups');
    }

    if (isObject(result) && AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_title' in result) {
        var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
        if (inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY]) && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && inArray(vkLinkType, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_APP])) {
            var titleUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_title']);
            if (result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_photo'] && (this.params.format_type.value === AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY)) {
                this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_photo']);
            } else if (result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_photo'] && (this.params.format_type.value === AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY)) {
                this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_photo']);
            }
            var titleValues = {};
            titleValues['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY] = titleUnescaped;

            this.setTitle(titleUnescaped, false, titleValues);
            this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY + '_link_domain'];
            this.updateUiParam('link_domain');
            this.updatePreview('domain');
        }
    }

    if (isObject(result) && 'a_title' in result) {
        var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
            var titleUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL + '_title']);
            var titleValues = {};
            titleValues['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL] = titleUnescaped;

            this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL + '_photo']);
            this.setTitle(titleUnescaped, false, titleValues);
            this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL + '_link_domain'];
            this.updateUiParam('link_domain');
            this.updatePreview('domain');
        }
    }

    if (isObject(result) && AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_title' in result) {
        var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
            var titleUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_title']);
            var titleValues = {};
            titleValues['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = titleUnescaped;

            this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_photo']);
            this.setTitle(titleUnescaped, false, titleValues);
            this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_link_domain'];
            this.params.link_id['app_rates_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE + '_app_rates'];
            this.updateUiParam('link_domain');
            this.updatePreview('domain');
            this.updatePreview('app_rating');
        }
    }

    if (isObject(result) && AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG + '_title' in result) {
        var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP && data.link_type == this.params.link_type.value && data.link_id == this.params.link_id.value && data.link_url == this.params.link_url.value && vkLinkType == AdsEdit.ADS_AD_LINK_TYPE_APP) {
            var titleUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG + '_title']);
            var titleValues = {};
            titleValues['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG] = titleUnescaped;

            var descriptionUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG + '_description']);
            this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG + '_photo']);
            this.setTitle(titleUnescaped, false, titleValues);
            this.setDescription(descriptionUnescaped);
        }
    }

    if (isObject(result) && AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE + '_title' in result) {
        if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) && data.link_type == this.params.link_type.value && data.link_url == this.params.link_url.value) {
            var titleUnescaped = AdsEdit.unescapeValueInit(result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE + '_title']);
            var titleValues = {};
            titleValues['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = titleUnescaped;

            this.params.link_type.value = result['mobile_app_link_type'];
            this.params.link_owner_id.value = result['mobile_app_link_owner_id'];
            this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON, result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON + '_photo']);
            this.setTitle(titleUnescaped, false, titleValues);
            this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE + '_link_domain'];
            this.params.link_id['mobile_app_bottom_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = result[AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE + '_mobile_app_bottom'];
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

    if (this.completeLinkPending) {
        this.completeLink();
    }

    return setResult;
}

AdsViewEditor.prototype.triggerAudienceNotify = function(data, result) {
    if (!data || !result || !Object.keys(this.userData).length) {
        return false;
    }

    if (!this.userData.showNotify) {
        return false;
    }

    var ConstDataForComponent = {
        budget: this.userData.budget,
        userName: this.userData.userName ? this.userData.userName : '',
        budgetMin: this.userData.budgetMin ? this.userData.budgetMin : false,
        closeHash: this.userData.notifyCloseHash,
        clientId: this.params.client_id.value,
        audienceCountMax: this.userData.audienceCountMax ? this.userData.audienceCountMax : false,
    };

    var LetDataForComponent = {
        sex: data.sex,
        geo: {
            cities: data.cities,
            geoNear: data.geo_near
        },
        age: {
            ageFrom: data.age_from,
            ageTo: data.age_to
        },
        audienceCount: result.audience_count,
    };

    if (!cur.AdsEditAudienceCountNotifyContainer) {
        var audienceNotifyEl = ge('ads_edit_panel_notify');
        AdsEditComponents.renderNotify(audienceNotifyEl, extend({}, ConstDataForComponent, LetDataForComponent));
        return false;
    }

    cur.AdsEditAudienceCountNotifyContainer.handleAudienceCountChange(LetDataForComponent)
}

AdsViewEditor.prototype.setAudienceNotifyKey = function() {
    this.onParamUpdate('audience_notify', 1);
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
    linkInfo.domain = matches[2];
    linkInfo.path = matches[3];
    linkInfo.domain = linkInfo.domain.toLowerCase();
    if (linkInfo.domain.length > 7) {
        linkInfo.domain = linkInfo.domain.replace(/^www\./, '');
    }
    return linkInfo;
}

AdsViewEditor.prototype.isStoryPromo = function() {
    return (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY) && !(this.params.platform.value & AdsEdit.ADS_AD_PLATFORM_STORIES_NO_PROMO);
}

AdsViewEditor.prototype.getParams = function() {
    var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
    var isStory = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY);

    var params = {};
    for (var paramName in this.params) {
        params[paramName] = this.params[paramName].value;
    }

    params.link_complete = (this.params.link_type.complete ? 1 : 0);
    params.link_subtype = this.params.link_type.subvalue;

    var photoIconSize;
    if (this.isStoryPromo()) {
        photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON;
    } else if (isAdaptiveAd) {
        photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON;
    } else {
        photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON;
    }

    params.photo_icon = this.params.photo['value_' + photoIconSize];
    var weeklyScheduleTargetEl = ge(this.options.targetIdPrefix + 'weekly_schedule');
    if (weeklyScheduleTargetEl) {
        params.weekly_schedule = weeklyScheduleTargetEl.value;
    }

    if (isStory && this.params.link_url.storiesContainer) {
        params.link_url = this.params.link_url.storiesContainer.getStoriesIds();
        params.stories_update_data = JSON.stringify(this.params.link_url.storiesContainer.getStoriesUpdateData());
        if (this.params.link_id.value) {
            params.link_owner_id = -this.params.link_id.value;
            params.link_id = '';
        }
    }

    return params;
}

AdsViewEditor.prototype.getFormatPhotoSize = function(isIcon) {
    switch (this.params.format_type.value) {
        case AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_SMALL;
        case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MEDIUM;
        case AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_BIG;
        case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY;
        case AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL;
        case AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE;
        case AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE;
        case AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG;
        case AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE;
        case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_UNKNOWN; // No photo needed for promoted post
        case AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD:
            return isIcon ? AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON : AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD;
        case AdsEdit.ADS_AD_FORMAT_TYPE_STORY:
            return (isIcon && this.isStoryPromo()) ? AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON : AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_UNKNOWN; // No photo needed for a story
        default:
            return AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_UNKNOWN;
    }
}

AdsViewEditor.prototype.setPhotoData = function(formatPhotoSize, photo) {
    var valueBySize = 'value_' + formatPhotoSize;

    this.params.photo[valueBySize] = photo || '';
    this.params.photo_link[valueBySize] = '';

    var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
    var isIcon = inArray(formatPhotoSize, [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON]);
    if (isAdaptiveAd && !isIcon) { // ���� �������� ������� �������� ����������� �������, �� ������� �����
        this.params.video_id.value = '';
        this.params.video_hash.value = '';
        this.params.video_owner_id.value = '';

        this.updateUiParamEnabled('repeat_video');
    }

    this.updatePhotoData(formatPhotoSize);
}

AdsViewEditor.prototype.updatePhotoData = function(formatPhotoSize) {
    var formatPhotoSizeCur = this.getFormatPhotoSize();
    formatPhotoSize = formatPhotoSize || formatPhotoSizeCur;
    var valueBySize = 'value_' + formatPhotoSize;
    var boxClassesBySize = 'box_classes_' + formatPhotoSize;

    if (formatPhotoSize === formatPhotoSizeCur && !inArray(formatPhotoSize, [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON])) {
        this.params.photo.value = this.params.photo[valueBySize];
        this.params.photo.box_classes = this.params.photo[boxClassesBySize];
        this.params.photo_link.value = this.params.photo_link[valueBySize];
    }

    this.updatePhotoLink(formatPhotoSize);
}

AdsViewEditor.prototype.updatePhotoLink = function(formatPhotoSize) {
    var valueBySize = 'value_' + formatPhotoSize;
    var boxClassesBySize = 'box_classes_' + formatPhotoSize;

    if (this.params.photo_link[valueBySize] || this.params.photo_link[valueBySize] === null || !this.params.photo[valueBySize]) {
        this.loadPhotoLink(formatPhotoSize);
        return;
    }
    var lockHash = 'update_photo_link_' + formatPhotoSize + '_' + this.params.photo[valueBySize];
    if (!Ads.lock(lockHash)) {
        return;
    }

    var vkLinkType = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_URL && this.params.link_url_vk.link_type_value) ? this.params.link_url_vk.link_type_value : this.params.link_type.value);

    var ajaxParams = {};
    ajaxParams.format_photo_size = formatPhotoSize;
    ajaxParams.photo = this.params.photo[valueBySize];
    ajaxParams.format_type = this.params.format_type.value;
    ajaxParams.link_type = vkLinkType;

    ajax.post('/adsedit?act=get_photo_link', ajaxParams, {
        onDone: onDone.bind(this),
        onFail: onFail.bind(this)
    })

    function onDone(result) {
        Ads.unlock(lockHash);
        if (this.params.photo[valueBySize] == ajaxParams.photo) {
            this.params.photo[boxClassesBySize] = (result.photo_box_classes || '');
            this.params.photo_link[valueBySize] = (result.photo_link || null);

            this.updatePhotoData(formatPhotoSize);
        }
    }

    function onFail() {
        Ads.unlock(lockHash);
    }
}

AdsViewEditor.prototype.loadPhotoLink = function(formatPhotoSize, delayed) {
    var isIcon = inArray(formatPhotoSize, [AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON, AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON]);

    if (!delayed && this.params.photo_link['value_' + formatPhotoSize]) {
        var imageObject = vkImage();
        imageObject.onload = imageObject.onerror = this.loadPhotoLink.bind(this, formatPhotoSize, true);
        imageObject.src = this.params.photo_link.value;
        return;
    }
    if (formatPhotoSize === this.getFormatPhotoSize(isIcon)) {
        this.updatePreview(isIcon ? 'photo_icon' : 'photo');
        this.updatePreview('play');
    }
}

AdsViewEditor.prototype.setVideoData = function(videoId, ownerId, videoHash, videoThumbUrl) {
    this.params.video_hash.value = videoHash;
    this.params.video_id.value = videoId;
    this.params.video_owner_id.value = ownerId;

    var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
    if (isAdaptiveAd) {
        this.params.photo['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD] = null;
        this.params.photo['value'] = null;
        this.params.photo_link['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD] = (videoThumbUrl || null);
        this.updatePhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD);
        this.updateUiParamEnabled('repeat_video');
    }

    this.updateUiParam('_link_video');
    this.updateUiParamVisibility('_link_video');
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

AdsViewEditor.prototype.setViewsLimitExact = function() {
    this.onParamUpdate('views_limit_exact', this.params.views_limit_exact.value, false, true);
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

AdsViewEditor.prototype.setLinkUrl = function(linkUrl) {
    var targetElem = ge(this.options.targetIdPrefix + 'link_url');
    targetElem.value = linkUrl;
    this.onParamUpdate('link_url', linkUrl);
}

AdsViewEditor.prototype.getLinkPromotedPostKludgesHave = function() {
    return this.params.link_id.promoted_post_kludges_have;
}

AdsViewEditor.prototype.updateLinkPromotedPost = function() {
    if (this.params.ad_id.value) {
        this.updateNeeded.need_link_post_text_new = true;
    } else {
        this.updateNeeded.need_link_post = true;
    }
    this.needDataUpdate();
}

AdsViewEditor.prototype.setTitle = function(title, noUpdateValueMax, titleValues) {
    this.params.title.update_value_max = !noUpdateValueMax;
    var targetElem = ge(this.options.targetIdPrefix + 'title');
    targetElem.value = title;
    var clearTitleValues = (titleValues === '');
    if (clearTitleValues || isObject(titleValues)) {
        var valuesKeys = ['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY, 'value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL, 'value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE, 'value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE, 'value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG];
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
    title = title.replace(/([\s:,]|[\-��\|]\s)[^\s:,]+$/, '');
    title = title.replace(/[\s:,\-��\|]+$/, '');
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

    this.updateLinkDomainContext.linkType = this.params.link_type.value;
    this.updateLinkDomainContext.linkUrl = link;
    this.updateLinkDomainContext.adId = this.params.ad_id.value;
    this.updateLinkDomainContext.campaignId = this.params.campaign_id.value;
    this.updateLinkDomainContext.triesLeft = 30;
    this.updateLinkDomainContext.first = true;
    this.updateLinkDomainContext.hash = this.params.link_domain.get_hash;
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
        ajaxParams.hash = updateContext.hash;
        ajaxParams.link_type = updateContext.linkType;
        ajaxParams.link_url = updateContext.linkUrl;
        ajaxParams.ad_id = updateContext.adId;
        ajaxParams.campaign_id = updateContext.campaignId;
        ajax.post('/adsedit?act=get_link_domain', ajaxParams, {
            onDone: onAjaxComplete.bind(this),
            onFail: onAjaxComplete.bind(this)
        });
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
                    this.params.link_domain.value_escaped = AdsEdit.escapeValue(response.link_domain);
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
    this.completeLinkPending = false;

    if (!this.params.link_type.complete) {
        return;
    }
    if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && !this.params.link_id.promoted_post_checked) {
        return;
    }
    if (this.updateLinkDomainContext && this.updateLinkDomainContext.linkUrl) {
        return;
    }

    var isChangedLinkType = (!this.params_old ||
        !(this.params.link_type.value == this.params_old.link_type.value && this.params.link_type.subvalue == this.params_old.link_type.subvalue ||
            inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP) ||
            inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP)
        )
    );
    var isChangedAny = (!this.params_old ||
        this.params.link_type.value != this.params_old.link_type.value // No isChangedLinkType here
        ||
        this.params.link_type.subvalue != this.params_old.link_type.subvalue // No isChangedLinkType here
        ||
        this.params.link_id.value != this.params_old.link_id.value ||
        this.params.link_owner_id.value != this.params_old.link_owner_id.value ||
        this.params.link_url.value != this.params_old.link_url.value ||
        this.params.link_domain.value != this.params_old.link_domain.value
    );
    var isChangedImportant = (!this.params_old ||
        isChangedLinkType ||
        this.params.link_id.value != this.params_old.link_id.value && inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_GROUP, AdsEdit.ADS_AD_LINK_TYPE_EVENT, AdsEdit.ADS_AD_LINK_TYPE_PUBLIC, AdsEdit.ADS_AD_LINK_TYPE_MARKET, AdsEdit.ADS_AD_LINK_TYPE_APP]) ||
        this.params.link_url.value != this.params_old.link_url.value && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_MOBILE_APP) ||
        (this.params.link_id.value != this.params_old.link_id.value || this.params.link_owner_id.value != this.params_old.link_owner_id.value) && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)
    );

    this.params.link_type.editing = false;

    //hide(this.options.targetIdPrefix + 'link_object_cancel');
    this.updateUiParam('_link_type_post');
    this.updateUiParam('_link_type_editing');
    this.updateUiParamVisibility('_link_type_editing');
    this.updateUiParamVisibility('_link_type');

    if (this.params.link_type.allow_edit_all) {
        this.updateUiParam('link_type');
        this.updateUiParam('link_id');
    }
    this.updateUiParam('link_url');
    this.updateUiParam('link_domain');

    if (isChangedImportant) {
        this.params.link_id['app_rates_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = '';
        this.params.link_id['mobile_app_bottom_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = '';
        this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY] = '';
        this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL] = '';
        this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE] = '';
        this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE] = '';
        this.setTitle(this.params.title.value, false, '');

        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY);
        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL);
        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE);
        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON);
        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON);
        this.setPhotoData(AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON);

        this.params.format_type.hidden = !!(inArray(this.params.link_type.value, [AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE, AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE, AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW, AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH]));
        this.updateUiParamVisibility('format_type');
        if (this.params.format_type.unreachable) {
            var formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE;
            switch (this.params.link_type.value) {
                case AdsEdit.ADS_AD_LINK_TYPE_VIDEO:
                    formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE;
                    break;
                case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID:
                case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE:
                case AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE:
                    formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE;
                    break;
                case AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW:
                case AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH:
                    formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST;
                    break;
                case AdsEdit.ADS_AD_LINK_TYPE_URL:
                    if (this.params.link_type.subvalue === 'adaptive_ad') {
                        formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD;
                        this.params.format_type.hidden = true;
                    }
                    break;
                case AdsEdit.ADS_AD_LINK_TYPE_STORY:
                    formatTypeDefault = AdsEdit.ADS_AD_FORMAT_TYPE_STORY;
                    this.params.format_type.hidden = true;
                    break;
            }
            this.setFormatType(formatTypeDefault);
        } else {
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY]);
                this.updateNeeded.need_format_promotion_community = true;
            }
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY]);
                this.updateNeeded.need_format_promotion_community = true;
            }
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL]);
                this.updateNeeded.need_format_app_in_news = true;
            }
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE]);
                this.updateNeeded.need_format_apps_only = true;
            }
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_BIG]);
                this.updateNeeded.need_format_big_app = true;
            }
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE) {
                this.setTitle(this.params.title['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE]);
                this.updateNeeded.need_format_mobile = true;
            }
        }

        if (!this.params.ad_id.is_copy) {
            var oldGroupId = false;
            if (this.params_old && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
                oldGroupId = this.params_old.link_id.value;
            } else if (this.params_old && inArray(this.params_old.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                oldGroupId = -this.params_old.link_owner_id.value;
            }
            if (!this.targetingEditor.criteria.groups_not.value || oldGroupId == this.targetingEditor.criteria.groups_not.value) {
                var selectedValue = false;
                if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
                    selectedValue = this.params.link_id.value;
                } else if (inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST)) {
                    selectedValue = -this.params.link_owner_id.value;
                }
                this.targetingEditor.setAutoGroupsNotValue(selectedValue);
            }
        }

        this.updateUiParam('_platform');
        this.updateUiParam('platform');
        this.updateUiParam('cost_per_click');
        this.updateUiParamData('platform');
        this.updateUiParamVisibility('format_type');
        this.updateUiParamVisibility('description');
        this.updateUiParamVisibility('platform');
        this.updateUiParamVisibility('platform_no_wall');
        this.updateUiParamVisibility('platform_no_ad_network');

        this.targetingEditor.updateUiCriterionVisibility('events_retargeting_groups');
        this.targetingEditor.eventsRetargetingGroupsUpdateRules('events_retargeting_groups');
    }

    if (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value] ||
        this.params_old && this.params_old.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params_old.link_id.value]
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
        this.targetingEditor.correctCriterion('price_list_id');
        this.targetingEditor.correctCriterion('pinned_card_1');
        this.targetingEditor.correctCriterion('price_list_retargeting_formula');
        this.targetingEditor.updateUiCriterionVisibility('user_devices');
        this.targetingEditor.updateUiCriterionVisibility('user_operating_systems');
        this.targetingEditor.updateUiCriterionVisibility('user_browsers');
        this.targetingEditor.updateUiCriterionVisibility('pays_money');
        this.targetingEditor.updateUiCriterionVisibility('price_list_id');
        this.targetingEditor.updateUiCriterionVisibility('pinned_card_1');
        this.targetingEditor.updateUiCriterionVisibility('price_list_retargeting_formula');
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

    Ads.initFixed('ads_edit_audience_wrap', 59);

    addClass('ads_edit_error_link_msg', 'unshown');

    AdsEdit.scrollToEditing();
}

AdsViewEditor.prototype.editLink = function() {
    if (this.editor.isUpdatingData()) {
        return;
    }
    if (!this.params.link_type.allow_edit_all && !this.params.link_type.allow_edit_link) {
        return;
    }

    this.params_old = {};
    this.params_old.link_type = clone(this.params.link_type, true);
    this.params_old.link_id = clone(this.params.link_id, true);
    this.params_old.link_owner_id = clone(this.params.link_owner_id, true);
    this.params_old.link_url = clone(this.params.link_url, true);
    this.params_old.link_domain = clone(this.params.link_domain, true);
    this.params_old.video_hash = clone(this.params.video_hash, true);

    this.params.link_type.editing = true;

    AdsEdit.hideErrors(true);
    this.updateUiParam('_link_type_post');
    this.updateUiParam('_link_type_editing');
    this.updateUiParamVisibility('_link_type_editing');
    this.updateUiParamVisibility('_link_type');

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

    this.params.link_type.editing = false;
    this.params.link_type.cancelling = true;

    if (this.params.link_type.allow_edit_all) {
        this.setLinkType(this.params_old.link_type.value);
        this.setLinkId(this.params_old.link_id.value, this.params_old.link_id.data)
    }
    this.setVideoData(this.params_old.link_id.video_value, this.params_old.link_owner_id.video_value, this.params_old.video_hash.value);
    this.onParamUpdate('link_url', this.params_old.link_url.value, false, true);
    this.updateUiParam('link_url');
    this.params.link_domain.link_url = this.params_old.link_domain.link_url;
    this.onParamUpdate('link_domain', this.params_old.link_domain.value, false, true);
    this.updateUiParam('link_domain');

    this.updateUiParam('_link_type_post');
    this.updateUiParam('_link_type_editing');
    this.updateUiParamVisibility('_link_type_editing');

    this.params.link_type.cancelling = false;
}

AdsViewEditor.prototype.getLink = function() {
    var link = '';
    var linkUrl = '';
    var linkPacked = '';
    var onclick = '';
    var target = '_blank';

    if (this.params.link_id.value) {
        switch (this.params.link_type.value) {
            case AdsEdit.ADS_AD_LINK_TYPE_GROUP:
                linkUrl = '/club' + this.params.link_id.value + '?ad_id={ad_id}';
                break;
            case AdsEdit.ADS_AD_LINK_TYPE_EVENT:
                linkUrl = '/event' + this.params.link_id.value + '?ad_id={ad_id}';
                break;
            case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC:
                linkUrl = '/public' + this.params.link_id.value + '?ad_id={ad_id}';
                break;
            case AdsEdit.ADS_AD_LINK_TYPE_MARKET:
                linkUrl = '/market.php?act=view&id=' + this.params.link_id.value;
                break;
            case AdsEdit.ADS_AD_LINK_TYPE_APP:
                linkUrl = '/app' + this.params.link_id.value + '?ad_id={ad_id}';
                break;
            case AdsEdit.ADS_AD_LINK_TYPE_POST_WITH_SHADOW:
            case AdsEdit.ADS_AD_LINK_TYPE_POST_STEALTH:
                linkUrl = '/wall' + this.params.link_owner_id.value + '_' + this.params.link_id.value;
                break;
                // ADS_AD_LINK_TYPE_STORY ?
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
    result.link = link;
    result.link_url = linkUrl;
    result.link_packed = linkPacked;
    result.onclick = onclick;
    result.target = target;

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
        case AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY:
            return this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY];
        case AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY:
            return this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY];
        case AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS:
            return this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_APP_HORIZONTAL];
        case AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY:
            return this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE];
        case AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE:
            return this.params.link_domain['value_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE];
    }

    switch (this.params.link_type.value) {
        case AdsEdit.ADS_AD_LINK_TYPE_GROUP:
            return getLang('global_ad_link_type_group');
        case AdsEdit.ADS_AD_LINK_TYPE_EVENT:
            return getLang('global_ad_link_type_event');
        case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC:
            return getLang('global_ad_link_type_public');
        case AdsEdit.ADS_AD_LINK_TYPE_MARKET:
            return getLang('global_ad_link_type_market');
        case AdsEdit.ADS_AD_LINK_TYPE_APP:
            return getLang('global_ad_link_type_app');
        case AdsEdit.ADS_AD_LINK_TYPE_VIDEO:
            return getLang('global_ad_link_type_video');
        case AdsEdit.ADS_AD_LINK_TYPE_STORY:
            return getLang('global_ad_link_type_story');
        case AdsEdit.ADS_AD_LINK_TYPE_URL:
            var linkUrlInfo = this.getLinkInfo(this.params.link_url.value);
            if (!linkUrlInfo) {
                return '';
            }
            var linkDomain = linkUrlInfo.domain;
            if (!linkDomain.match(/(^|\.)(vkontakte\.ru|vk\.com)$/) || this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) {
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
        default:
            return '';
    }
}

AdsViewEditor.prototype.updatePreview = function(previewParamName) {
    switch (previewParamName) {
        case 'layout':
            var isAppInNews = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS);
            var isAppsOnly = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_APPS_ONLY);
            var isGroupsOnly = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY);
            var isBigApp = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);
            var isMobile = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
            var isAndroid = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_ANDROID);
            var isIphone = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_IPHONE);
            var isWphone = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_MOBILE_APP_WPHONE);
            var isPromotedPost = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST);
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            var isStory = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_STORY);
            var isRedesign = !(isAppInNews || isAppsOnly || isGroupsOnly || isBigApp || isMobile || isAndroid || isIphone || isWphone || isPromotedPost || isAdaptiveAd || isStory);
            var elems = geByClass('format_edit', this.preview[previewParamName]);
            elems.push(this.preview[previewParamName]);
            for (var i in elems) {
                toggleClass(elems[i], 'app_in_news', !!isAppInNews);
                toggleClass(elems[i], 'apps_only', !!isAppsOnly);
                toggleClass(elems[i], 'groups_only', !!isGroupsOnly);
                toggleClass(elems[i], 'big_app', !!isBigApp);
                toggleClass(elems[i], 'mobile', !!isMobile);
                toggleClass(elems[i], 'android', !!isAndroid);
                toggleClass(elems[i], 'iphone', !!(isIphone || isWphone)); // isWphone - temporary
                toggleClass(elems[i], 'promoted_post', !!isPromotedPost);
                toggleClass(elems[i], 'adaptive_ad', !!isAdaptiveAd);
                toggleClass(elems[i], 'story', !!isStory);
                toggleClass(elems[i], 'redesign', !!isRedesign);
            }
            var titlePlaceElem = (isBigApp ? this.preview.title_big_app : this.preview.title_regular);
            var descriptionPlaceElem = ((isMobile || isAdaptiveAd) ? this.preview.description_up : (isBigApp ? this.preview.description_big_app : this.preview.description_down));
            //var photoBoxPlaceElem    = ((isAppInNews || isAppsOnly || isGroupsOnly) ? this.preview.photo_box_hor : this.preview.photo_box_ver);
            var photoBoxPlaceElem = isAdaptiveAd ? this.preview.photo_box_snippet : this.preview.photo_box_hor; // Redesign styles
            var domainPlaceElem = isAdaptiveAd ? this.preview.domain_snippet : (((isAppInNews || isAppsOnly || isGroupsOnly) ? this.preview.domain_out : this.preview.domain_ver));
            var disclaimersPlaceElem = (isPromotedPost ? this.preview.disclaimers_promoted_post : (isGroupsOnly ? this.preview.disclaimers_photo : this.preview.disclaimers_bottom));
            var ageRestrictionPlaceElem = isAdaptiveAd ? this.preview.age_restriction_snippet : this.preview.age_restriction_photo;
            titlePlaceElem.parentNode.insertBefore(this.preview.title_box, titlePlaceElem);
            descriptionPlaceElem.parentNode.insertBefore(this.preview.description, descriptionPlaceElem);
            photoBoxPlaceElem.parentNode.insertBefore(this.preview.photo_box, photoBoxPlaceElem);
            domainPlaceElem.parentNode.insertBefore(this.preview.domain, domainPlaceElem);
            disclaimersPlaceElem.parentNode.insertBefore(this.preview.disclaimers, disclaimersPlaceElem);
            ageRestrictionPlaceElem.parentNode.insertBefore(this.preview.age_restriction, ageRestrictionPlaceElem);

            toggleClass(this.preview.age_restriction, 'inline', isAdaptiveAd);
            toggleClass(this.preview.photo, 'ads_ad_snippet_img', isAdaptiveAd);
            toggle(this.preview.storiesContainer, isStory);
            break;
        case 'link':
            var linkResult = this.getLink();
            this.updateLink(this.preview[previewParamName], linkResult.link, linkResult.link_packed, linkResult.onclick, linkResult.target);
            break;
        case 'link_button':
            this.preview[previewParamName].innerHTML = this.getLinkButtonText(this.params.link_button.value);
            break;
        case 'link_title':
            this.preview[previewParamName].innerHTML = (this.params.link_title.value_escaped || this.params.link_title.value_default || '&nbsp;');
            break;
        case 'title':
            this.preview[previewParamName].innerHTML = (this.params.title.value_escaped || this.params.title.value_default);
            break;
        case 'description':
            this.preview[previewParamName].innerHTML = (this.params.description.value_escaped || this.params.description.value_default);
            toggle(this.preview[previewParamName], !!inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD]));
            break;
        case 'community_join':
            var isAppGame = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_game_links_ids[this.params.link_id.value]);
            if (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY && this.params.link_type.value != 0) {
                switch (this.params.link_type.value) {
                    case AdsEdit.ADS_AD_LINK_TYPE_GROUP:
                        this.preview[previewParamName].innerHTML = getLang('global_group_join');
                        break;
                    case AdsEdit.ADS_AD_LINK_TYPE_EVENT:
                        this.preview[previewParamName].innerHTML = getLang('global_event_join');
                        break;
                    case AdsEdit.ADS_AD_LINK_TYPE_PUBLIC:
                        this.preview[previewParamName].innerHTML = getLang('global_public_join');
                        break;
                    case AdsEdit.ADS_AD_LINK_TYPE_APP:
                        this.preview[previewParamName].innerHTML = (isAppGame ? getLang('global_app_game_join') : getLang('global_app_join'));
                        break;
                    default:
                        this.preview[previewParamName].innerHTML = '';
                        break;
                }
                show(this.preview[previewParamName]);
            } else {
                hide(this.preview[previewParamName]);
            }
            break;
        case 'app_rating':
            this.preview[previewParamName].innerHTML = this.params.link_id['app_rates_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE];
            break;
        case 'mobile_app_bottom':
            this.preview[previewParamName].innerHTML = this.params.link_id['mobile_app_bottom_' + AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_MOBILE];
            break;
        case 'disclaimer_medical':
            toggle(this.preview[previewParamName], !!(this.params.disclaimer_medical.value));
            if (this.params.link_url.storiesContainer) {
                this.params.link_url.storiesContainer.setDisclaimerText(this.getDisclaimersText());
            }
            break;
        case 'disclaimer_specialist':
            toggle(this.preview[previewParamName], !!(this.params.disclaimer_specialist.value));
            if (this.params.link_url.storiesContainer) {
                this.params.link_url.storiesContainer.setDisclaimerText(this.getDisclaimersText());
            }
            break;
        case 'disclaimer_supplements':
            toggle(this.preview[previewParamName], !!(this.params.disclaimer_supplements.value));
            if (this.params.link_url.storiesContainer) {
                this.params.link_url.storiesContainer.setDisclaimerText(this.getDisclaimersText());
            }
            break;
        case 'disclaimer_finance':
            if (this.params.disclaimer_finance.value) {
                var text = getLang(this.params.disclaimer_finance.active_template)
                    .replace("{name}", this.params.disclaimer_finance_name.value_escaped || this.params.disclaimer_finance_name.value_default)
                    .replace("{license_no}", this.params.disclaimer_finance_license_no.value_escaped || this.params.disclaimer_finance_license_no.value_default);
                this.preview[previewParamName].innerHTML = text;
            }
            toggle(this.preview[previewParamName], !!(this.params.disclaimer_finance.value));
            this.params.link_url.storiesContainer.setDisclaimerText(this.getDisclaimersText());
            break;
        case 'age_restriction':
            var isMobile = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
            if (isMobile) {
                hide(this.preview[previewParamName]);
            } else {
                this.preview[previewParamName].innerHTML = this.getAgeRestrictionText(this.params.age_restriction.value);
                toggle(this.preview[previewParamName], !!(this.params.age_restriction.value));
            }
            if (this.params.link_url.storiesContainer) {
                if (this.params.age_restriction.value) {
                    this.params.link_url.storiesContainer.setAgeRestrictionText(this.getAgeRestrictionText(this.params.age_restriction.value));
                } else {
                    this.params.link_url.storiesContainer.setAgeRestrictionText('');
                }
            }
            break;
        case 'disclaimers':
            var isDisclaimersAllowed = inArray(this.params.format_type.value, [AdsEdit.ADS_AD_FORMAT_TYPE_TEXT_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_BIG_IMAGE, AdsEdit.ADS_AD_FORMAT_TYPE_EXCLUSIVE, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTION_COMMUNITY, AdsEdit.ADS_AD_FORMAT_TYPE_GROUPS_ONLY, AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD]);
            toggle(this.preview.disclaimers, isDisclaimersAllowed && (!!(this.params.disclaimer_medical.value) || !!(this.params.disclaimer_specialist.value) || !!(this.params.disclaimer_supplements.value) || !!(this.params.disclaimer_finance.value)));
            break;
        case 'domain':
            var domainValue = this.getPreviewDomain();
            var isMobile = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE);
            var isBigApp = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_BIG_APP);
            if (isMobile && this.params.age_restriction.value) {
                domainValue += ' ' + this.getAgeRestrictionText(this.params.age_restriction.value);
            }
            this.preview[previewParamName].innerHTML = domainValue;
            toggle(this.preview[previewParamName], !!(domainValue && !isBigApp));
            break;
        case 'photo':
            var isPhotoSrcSet = true;
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            var isAdaptiveAdVideo = isAdaptiveAd && this.params.video_id.value && this.params.video_owner_id.value && this.params.video_hash.value;
            if ((this.params.photo.value || isAdaptiveAdVideo) && this.params.photo_link.value) { // ��� ����� �������� ��������� ������ �������� ��� �������� � photo, ������ ��� ��� ������ �� �����
                this.preview[previewParamName].src = this.params.photo_link.value;
            } else {
                var formatPhotoSize = this.getFormatPhotoSize();
                var photoLinkSuffix = '';
                if (formatPhotoSize === AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_PROMOTION_COMMUNITY && this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP) {
                    photoLinkSuffix = '_app';
                } else if (formatPhotoSize === AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_COMMUNITY_SQUARE && inArray(this.params.link_type.value, AdsEdit.ADS_AD_LINK_TYPES_ALL_GROUP)) {
                    photoLinkSuffix = '_group';
                }
                var specialValue = ((this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO) ? 'value_empty_' : 'value_default_') + formatPhotoSize + photoLinkSuffix;
                specialValue = this.params.photo_link[specialValue];
                isPhotoSrcSet = !!specialValue;
                this.preview[previewParamName].src = specialValue || '';
            }
            var photoBoxClasses = ['promotion', 'big_image', 'legacy'];
            for (var i in photoBoxClasses) {
                var className = photoBoxClasses[i];
                toggleClass(this.preview.photo_box, className, !!(this.params.photo.box_classes && this.params.photo.box_classes.indexOf(className) != -1));
            }
            this.preview.photo_box.style.display = isPhotoSrcSet ? 'block' : 'none';
            break;
        case 'photo_icon':
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);

            var photoIconSize;
            if (this.isStoryPromo()) {
                photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_STORY_PROMO_ICON;
            } else if (isAdaptiveAd) {
                photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ADAPTIVE_AD_ICON;
            } else {
                photoIconSize = AdsEdit.ADS_AD_FORMAT_PHOTO_SIZE_ICON;
            }

            this.preview[previewParamName].src = (this.params.photo['value_' + photoIconSize] ? this.params.photo_link['value_' + photoIconSize] : this.params.photo_link['value_default_' + photoIconSize]);
            break;
        case 'play':
            var isAdaptiveAd = (this.params.format_type.value == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD);
            var isAdaptiveAdVideo = isAdaptiveAd && this.params.video_id.value && this.params.video_owner_id.value && this.params.video_hash.value;
            toggleClass(this.preview[previewParamName], 'unshown', !(this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_VIDEO || isAdaptiveAdVideo));
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
        var isAppCampaign = (this.params.campaign_type.value == AdsEdit.ADS_CAMPAIGN_TYPE_UI_USE_APPS_WITH_BUDGET || (this.params.campaign_id.value_app && this.params.campaign_id.value == this.params.campaign_id.value_app));
        var isAppAdminLink = (this.params.link_type.value == AdsEdit.ADS_AD_LINK_TYPE_APP && this.params.link_id.app_admin_links_ids[this.params.link_id.value]);
        toggle('ads_param_campaign_tip_app_only', !!(isAppCampaign));
        toggle('ads_param_campaign_tip_no_app_bonus', !!(isAppAdminLink && !isAppCampaign && this.params.format_type.value != AdsEdit.ADS_AD_FORMAT_TYPE_APP_IN_NEWS));
        //toggle('ads_param_link_apps_tip', !!(isAppAdminLink && isAppCampaign));
    }
}

AdsViewEditor.prototype.showMoreCategories = function() {
    hide('ads_param_category_more');
    this.params.category2_id.hidden_normal = false;
    this.params.subcategory2_id.hidden_normal = false;
    this.updateUiParamVisibility('category2_id');
    this.updateUiParamVisibility('subcategory2_id');
}

AdsViewEditor.prototype.showLinkObjectPanel = function(delayed) {
    if (!delayed) {
        setTimeout(this.showLinkObjectPanel.bind(this, true), 1);
        return;
    }
    var panelElem = ge('ads_edit_panel_link_object');
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

AdsViewEditor.prototype.getDisclaimersText = function() {
    var result = [];
    var disclaimerText = '';
    var disclaimers = ['disclaimer_medical', 'disclaimer_specialist', 'disclaimer_supplements', 'disclaimer_finance'];
    for (var i in disclaimers) {
        var disclaimer = disclaimers[i];
        if (!this.params[disclaimer].value) {
            continue;
        }
        if (disclaimer === 'disclaimer_finance') {
            disclaimerText = getLang(this.params.disclaimer_finance.active_template)
                .replace('{name}', this.params.disclaimer_finance_name.value_escaped || this.params.disclaimer_finance_name.value_default)
                .replace('{license_no}', this.params.disclaimer_finance_license_no.value_escaped || this.params.disclaimer_finance_license_no.value_default);
        } else {
            disclaimerText = this.params[disclaimer].text;
        }
        result.push(disclaimerText);
    }
    return result.join(' ');
}

AdsViewEditor.prototype.getLinkButtonText = function(linkButton) {
    var linkButtonData = this.params.link_button.data;
    for (var i in linkButtonData) {
        if (linkButtonData[i][0] == linkButton) {
            return linkButtonData[i][1];
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
        uiWidthGeo: 400,
        uiHeight: 250,
        uiWidthRange: 151 + 8,
        uiHeightRange: 190,
        uiMaxSelected: 100
    };

    this.options = extend({}, this.options, options);

    // defaultData exists if data may be not equal defaultData
    this.criteria = {
        geo_type: {
            value: 0
        },
        geo_mask: {
            value: 0,
            data: [],
            valueEmpty: -1
        },
        geo_near: {
            value: '',
            data: [],
            defaultData: [],
            radius_selector: '',
            radius_selector_full: '',
            radius_selector_online: '',
            data_radius: [],
            data_radius_online: [],
            allowed_radiuses: [],
            allowed_radiuses_online: [],
            default_radius: 1000,
            default_center: [59.92688, 30.32913],
            lngcode: 'ru',
            zoom_radius_map: {}
        },
        country: {
            value: 0,
            data: [],
            valueEmpty: -1
        },
        cities: {
            value: '',
            data: [],
            defaultData: [],
            selectedData: []
        },
        cities_not: {
            value: '',
            data: [],
            selectedData: []
        },

        sex: {
            value: 0,
            data: []
        },
        age_from: {
            value: 0,
            data: []
        },
        age_to: {
            value: 0,
            data: []
        },
        birthday: {
            value: 0
        },
        statuses: {
            value: '',
            data: []
        },

        interests: {
            value: '',
            data: [],
            defaultData: []
        },
        interest_categories: {
            value: '',
            data: []
        },
        group_types: {
            value: '',
            data: []
        },
        groups: {
            value: '',
            data: [],
            defaultData: [],
            selectedData: [],
            defaultDataOriginal: [],
            link_object_id: 0,
            link_object_item: null,
            link_object_processed: true
        },
        groups_not: {
            value: '',
            data: [],
            selectedData: []
        },
        groups_active: {
            value: '',
            data: [],
            selectedData: []
        },
        apps: {
            value: '',
            data: [],
            defaultData: [],
            selectedData: [],
            defaultDataOriginal: [],
            link_object_id: 0,
            link_object_item: null,
            link_object_processed: true
        },
        apps_not: {
            value: '',
            data: [],
            selectedData: []
        },
        religions: {
            value: '',
            data: []
        },
        travellers: {
            value: 0
        },

        districts: {
            value: '',
            data: [],
            selectedData: [],
            dataInited: true
        }, // No default data to allow autocomplete by data
        stations: {
            value: '',
            data: [],
            selectedData: [],
            dataInited: true
        }, // No default data to allow autocomplete by data
        streets: {
            value: '',
            data: [],
            selectedData: []
        }, // No default data at all

        schools_type: {
            value: 0
        },
        schools: {
            value: '',
            data: [],
            selectedData: []
        }, // No default data at all
        school_from: {
            value: 0,
            data: []
        },
        school_to: {
            value: 0,
            data: []
        },
        uni_from: {
            value: 0,
            data: []
        },
        uni_to: {
            value: 0,
            data: []
        },
        positions: {
            value: '',
            data: [],
            defaultData: [],
            selectedData: []
        },

        operators: {
            value: '',
            data: [],
            defaultData: [],
            selectedData: []
        },
        browsers: {
            value: '',
            data: []
        },
        user_devices: {
            value: '',
            data: []
        },
        user_operating_systems: {
            value: '',
            data: []
        },
        user_browsers: {
            value: '',
            data: []
        },
        pays_money: {
            value: 0,
            data: []
        },
        retargeting_groups: {
            value: '',
            data: []
        },
        retargeting_groups_not: {
            value: '',
            data: []
        },
        autoaudience: {
            value: 0
        },
        price_list_id: {
            value: 0,
            data: []
        },
        price_list_retargeting_formula: {
            value: '',
            data: []
        },
        pinned_card_1: {
            value: 0,
            data: []
        },
        tags: {
            value: ''
        },

        // Not criteria
        events_retargeting_groups: {
            value: '',
            data: [],
            data_rules_promoted_posts: [],
            data_rules_promoted_posts_video: [],
            data_rules_adaptive_ads: [],
            data_rules_stories: [],
            template: ''
        },
        criteria_presets: {
            value: '',
            data: []
        },
        criteria_preset_name: {
            value: ''
        },
        criteria_preset_name_button: {
            value: ''
        },
        criteria_presets_raw: {
            data: []
        },
        criteria_presets_data: {
            data: []
        }
    };

    this.updateNeeded = {};

    for (var criterionName in this.criteria) {
        if (!('valueEmpty' in this.criteria[criterionName])) {
            this.criteria[criterionName].valueEmpty = this.criteria[criterionName].value;
        }
    }

    if (criteria)
        for (var i in criteria) {
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
        if (criteriaData.data)
            for (var i in criteriaData.data) {
                if (criteriaData.data[i] && (i in this.criteria) && ('data' in this.criteria[i])) {
                    this.criteria[i].data = criteriaData.data[i];
                }
            }
        if (criteriaData.defaultData)
            for (var i in criteriaData.defaultData) {
                if (criteriaData.defaultData[i] && (i in this.criteria) && ('defaultData' in this.criteria[i])) {
                    this.criteria[i].defaultData = criteriaData.defaultData[i];
                }
            }
        if (criteriaData.selectedData)
            for (var i in criteriaData.selectedData) {
                if (criteriaData.selectedData[i] && (i in this.criteria) && ('selectedData' in this.criteria[i])) {
                    this.criteria[i].selectedData = criteriaData.selectedData[i];
                }
            }
    }

    if (criteriaParams)
        for (var i in criteriaParams) {
            if (criteriaParams[i] && (i in this.criteria)) {
                this.criteria[i] = extend({}, this.criteria[i], criteriaParams[i]);
            }
        }

    {
        this.criteria.groups.defaultDataOriginal = this.criteria.groups.defaultData;
        this.criteria.apps.defaultDataOriginal = this.criteria.apps.defaultData;
    }

    this.criteriaRanges = criteriaRanges;
    this.targetingGroups = targetingGroups;

    this.interestingEvents = 'keydown keyup keypress change paste cut drop input blur';

    this.cur = {
        destroy: []
    };

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
    var context = {
        focus: false,
        over: 0,
        out: 2
    };
    var shiftTop;
    var shiftLeft = false;
    var isNarrow = false;

    switch (criterionName) {
        case 'travellers':
            shiftTop = -52;
            break;
        case 'pinned_card_1':
            shiftTop = -52;
            break;
        case 'positions':
            shiftTop = -44;
            break;
        case 'pays_money':
            shiftTop = -44;
            break;
        case 'tags':
            shiftTop = -96;
            break;
        case 'events_retargeting_groups':
            shiftLeft = -357;
            break;
        case 'geo_type':
            shiftLeft = -320;
            isNarrow = true;
            break;
        case 'geo_mask':
            shiftLeft = -410;
            isNarrow = true;
            break;
        case 'geo_near':
            shiftLeft = -410;
            isNarrow = true;
            shiftTop = function() {
                return -(44 + 345 + 28 + (geByClass1('ads_edit_value', ge('ads_edit_criterion_row_geo_near')).clientHeight - 345 - 28) / 2)
            };
            break;
        case 'autoaudience':
            shiftTop = -52;
            break;
    }

    switch (criterionName) {
        case 'cities':
        case 'interest_categories':
        case 'interests':
        case 'group_types':
        case 'travellers':
        case 'pinned_card_1':
        case 'schools':
        case 'positions':
        case 'browsers':
        case 'pays_money':
        case 'retargeting_groups':
        case 'autoaudience':
        case 'tags':
        case 'geo_type':
        case 'geo_mask':
        case 'geo_near':
        case 'events_retargeting_groups':
            targetElem = ge(this.options.targetIdPrefix + criterionName).parentNode;
            if (criterionName === 'events_retargeting_groups') {
                targetElem = geByClass1('ads_edit_value_events_retargeting_groups_row_selector_wrap', targetElem);
                if (!targetElem) {
                    return;
                }
            }

            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(criterionName, targetElem, handler, this.criteria[criterionName], helpText, shiftLeft, shiftTop, this.cur, undefined, isNarrow);
            }.bind(this);
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(this.criteria[criterionName].tt);
            }.bind(this);
            handler = function(event) {
                AdsEdit.onHelpTooltipEvent(event, criterionName, context, showTooltip, hideTooltip);
            }.bind(this);

            if (!inArray(criterionName, ['geo_near', 'geo_mask'])) {
                AdsEdit.initHelpTooltipTarget(targetElem, handler, this.cur);
            }

            if (criterionName === 'geo_mask') {
                setTimeout(showTooltip, 1000);
                setTimeout(hideTooltip, 10000);
            }
            if (criterionName === 'geo_near') {
                this.criteria[criterionName].ttHandler = handler;
            }
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
                addEvent(targetElem, 'click keypress', function(event) {
                    return this.onUiEvent('group_' + groupName + '_more', event);
                }.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
            }
            if (this.targetingGroups[groupName].criteria_less) {
                targetElem = ge('ads_edit_targeting_group_' + groupName + '_less_link');
                addEvent(targetElem, 'click keypress', function(event) {
                    return this.onUiEvent('group_' + groupName + '_less', event);
                }.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
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
    switch (criterionName) {}

    // Init UI control
    // ����� case ���� ����� ���������� � ������������ case-�� �������������, ���� ����� �������� ���������������� ����� �� ������� ��� � ������, �������� age_from � school_from.
    // ���� �� ������������� ������ ����������, �� ����� ��������� ����� ��������������� case, �������� cities � geo_near.
    switch (criterionName) {
        //
        // Dropdowns
        //

        // Autocomplete with default values
        case 'criteria_presets':
            {
                targetElem = geByClass1('ads_edit_value_criteria_presets_selector_remove');
                addEvent(targetElem, 'click', this.removeCurrentCriteriaPreset.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
            }
        case 'country':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
                    selectedItem: this.getUiCriterionSelectedData(criterionName),
                    defaultItems: this.getUiCriterionDefaultData(criterionName),
                    big: true,
                    autocomplete: true,
                    width: this.options.uiWidth,
                    introText: this.getUiCriterionIntroText(criterionName),
                    placeholder: this.getUiCriterionPlaceholderText(criterionName),
                    onChange: function(value) {
                        this.onUiChange(criterionName, value);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }

            // Simple dropdown with any item selected
        case 'pays_money':
        case 'price_list_id':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
                    selectedItem: this.getUiCriterionSelectedData(criterionName),
                    big: true,
                    width: this.options.uiWidth,
                    onChange: function(value) {
                        this.onUiChange(criterionName, value);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }

            // Simple dropdown for geo
        case 'geo_mask':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
                    selectedItem: this.getUiCriterionSelectedData(criterionName),
                    big: true,
                    width: this.options.uiWidthGeo,
                    onChange: function(value) {
                        this.onUiChange(criterionName, value);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }

            // Ranges
        case 'age_from':
        case 'age_to':
        case 'school_from':
        case 'school_to':
        case 'uni_from':
        case 'uni_to':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Dropdown(targetElem, this.getUiCriterionData(criterionName), {
                    selectedItem: this.getUiCriterionSelectedData(criterionName),
                    big: true,
                    zeroPlaceholder: true,
                    width: this.options.uiWidthRange,
                    height: this.options.uiHeightRange,
                    onChange: function(value) {
                        this.onUiChange(criterionName, value);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }

            // Multi dropdown
        case 'cities':
        case 'cities_not':
        case 'statuses':
        case 'interests':
        case 'interest_categories':
        case 'group_types':
        case 'groups':
        case 'groups_not':
        case 'groups_active':
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
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Autocomplete(targetElem, this.getUiCriterionData(criterionName), {
                    defaultItems: this.getUiCriterionDefaultData(criterionName),
                    selectedItems: this.getUiCriterionSelectedData(criterionName),

                    indexkeys: criterionName === 'interest_categories' ? [1, 4] : [1],
                    includeSectionsOnMatch: criterionName === 'interest_categories',
                    preventDuplicates: criterionName === 'interest_categories',
                    hideSectionedChildren: criterionName === 'interest_categories',

                    introText: this.getUiCriterionIntroText(criterionName),
                    placeholder: this.getUiCriterionPlaceholderText(criterionName),
                    noResult: this.getUiCriterionNoResultText(criterionName),
                    disabledText: this.getUiCriterionDisabledText(criterionName),

                    dropdown: true,
                    big: true,
                    withIcons: inArray(criterionName, ['groups', 'groups_not', 'groups_active', 'apps', 'apps_not']),
                    maxItems: this.options.uiMaxSelected,
                    width: this.options.uiWidth,
                    height: this.options.uiHeight,

                    onTagAdd: function(tag, value) {
                        this.onUiTagAdd(criterionName, value, tag);
                    }.bind(this),
                    onTagRemove: function(tag, value) {
                        this.onUiTagRemove(criterionName, value, tag);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }
        case 'geo_near':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                targetElem.removeAttribute('autocomplete');
                this.criteria[criterionName].ui = new Autocomplete(targetElem, this.getUiCriterionData(criterionName), {
                    defaultItems: this.getUiCriterionDefaultData(criterionName),
                    selectedItems: this.getUiCriterionSelectedData(criterionName),

                    introText: this.getUiCriterionIntroText(criterionName),
                    placeholder: this.getUiCriterionPlaceholderText(criterionName),
                    nativePlaceholder: true,
                    hidePlaceholderOnSelected: false,
                    noResult: this.getUiCriterionNoResultText(criterionName),
                    disabledText: this.getUiCriterionDisabledText(criterionName),

                    dropdown: false,
                    listStyle: true,
                    limitedListHeight: true,
                    selectable: false,
                    big: true,
                    maxItems: this.options.uiMaxSelected,
                    width: this.options.uiWidthGeo,
                    height: this.options.uiHeight,
                    selectedItemsDelimiter: ';',

                    fixBoxWidth: true,
                    onTagAdd: function(tag, value) {
                        this.onUiTagAdd(criterionName, value, tag);
                    }.bind(this),
                    onTagRemove: function(tag, value) {
                        this.onUiTagRemove(criterionName, value, tag);
                    }.bind(this),
                    onTokenClick: function(value, event) {
                        this.onUiTagClick(criterionName, value, event);
                    }.bind(this),
                    onTokenMouseOver: function(value, event) {
                        this.onUiEvent(criterionName, event);
                    }.bind(this),
                    onTokenMouseOut: function(value, event) {
                        this.onUiEvent(criterionName, event);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));


                var currentCriteriaUi = this.criteria[criterionName].ui;
                if (currentCriteriaUi && currentCriteriaUi.selectedItemsContainer) {
                    currentCriteriaUi.selectedItemsContainerScrollWrap = new uiScroll(currentCriteriaUi.selectedItemsContainer);
                    currentCriteriaUi.selectedItemsContainer = currentCriteriaUi.selectedItemsContainerScrollWrap.content;
                }

                var mapContainer = ge(this.options.targetIdPrefix + criterionName + '_box');
                this.initGeoEditor(criterionName, mapContainer);
                break;
            }

            //
            // Radiobuttons
            //

        case 'geo_type':
            {
                var widthRegions = AdsEdit.getTextWidth(getLang('ads_geo_type_regions'));
                var widthPoints = AdsEdit.getTextWidth(getLang('ads_geo_type_points'));
                var widthMore = Math.floor((this.options.uiWidth - (widthRegions + widthPoints)) / 2);
                widthRegions += widthMore;
                widthPoints += widthMore;

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_regions');
                this.criteria[criterionName].ui_geo_type_regions = new Radiobutton(targetElem, {
                    width: widthRegions,
                    label: getLang('ads_geo_type_regions'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_geo_type_regions.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_points');
                this.criteria[criterionName].ui_geo_type_points = new Radiobutton(targetElem, {
                    width: widthPoints,
                    label: getLang('ads_geo_type_points'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_geo_type_points.destroy();
                }.bind(this));

                Radiobutton.select(this.options.targetIdPrefix + criterionName, this.criteria[criterionName].value);
                break;
            }
        case 'sex':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName + '_any');
                this.criteria[criterionName].ui_any = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('search_adv_any_sex'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_any.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_male');
                this.criteria[criterionName].ui_male = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('Sex_m'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_male.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_female');
                this.criteria[criterionName].ui_female = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('Sex_fm'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_female.destroy();
                }.bind(this));

                Radiobutton.select(this.options.targetIdPrefix + criterionName, this.criteria[criterionName].value);
                break;
            }
        case 'schools_type':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName + '_any');
                this.criteria[criterionName].ui_any = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('ads_schools_type_any'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_any.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_school');
                this.criteria[criterionName].ui_school = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('ads_schools_type_school'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_school.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + criterionName + '_uni');
                this.criteria[criterionName].ui_uni = new Radiobutton(targetElem, {
                    width: this.options.uiWidth,
                    label: getLang('ads_schools_type_university'),
                    onSelect: function(value) {
                        this.onUiSelect(criterionName, value)
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_uni.destroy();
                }.bind(this));

                Radiobutton.select(this.options.targetIdPrefix + criterionName, this.criteria[criterionName].value);
                break;
            }

            //
            // Checkboxes
            //

        case 'birthday':
            {
                var labelToday = this.criteria.birthday.label_checkbox_today;
                var labelTomorrow = this.criteria.birthday.label_checkbox_tomorrow;
                var labelWeek = this.criteria.birthday.label_checkbox_week;
                var widthToday = AdsEdit.getTextWidth(labelToday);
                var widthTomorrow = AdsEdit.getTextWidth(labelTomorrow);
                var widthWeek = AdsEdit.getTextWidth(labelWeek);
                var widthMore = Math.floor((this.options.uiWidth - (widthToday + widthTomorrow + widthWeek)) / 3);
                widthToday += widthMore;
                widthTomorrow += widthMore;
                widthWeek += widthMore;

                var isCheckedToday = !!(this.criteria.birthday.value & (1 << 0));
                var isCheckedTomorrow = !!(this.criteria.birthday.value & (1 << 1));
                var isCheckedWeek = !!(this.criteria.birthday.value & (1 << 2));

                targetElem = ge(this.options.targetIdPrefix + 'birthday_today');
                this.criteria.birthday.ui_today = new Checkbox(targetElem, {
                    label: labelToday,
                    checked: isCheckedToday,
                    width: widthToday,
                    onChange: function(state) {
                        this.onUiChange('birthday_today', state);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_today.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + 'birthday_tomorrow');
                this.criteria.birthday.ui_tomorrow = new Checkbox(targetElem, {
                    label: labelTomorrow,
                    checked: isCheckedTomorrow,
                    width: widthTomorrow,
                    onChange: function(state) {
                        this.onUiChange('birthday_tomorrow', state);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_tomorrow.destroy();
                }.bind(this));

                targetElem = ge(this.options.targetIdPrefix + 'birthday_week');
                this.criteria.birthday.ui_week = new Checkbox(targetElem, {
                    label: labelWeek,
                    checked: isCheckedWeek,
                    width: widthWeek,
                    onChange: function(state) {
                        this.onUiChange('birthday_week', state);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui_week.destroy();
                }.bind(this));

                if (isCheckedWeek) {
                    this.criteria[criterionName].ui_today.disable(true);
                    this.criteria[criterionName].ui_tomorrow.disable(true);
                }

                break;
            }
        case 'pinned_card_1':
        case 'travellers':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                this.criteria[criterionName].ui = new Checkbox(targetElem, {
                    label: this.criteria[criterionName].label_checkbox,
                    checked: this.criteria[criterionName].value,
                    width: this.options.uiWidth,
                    onChange: function(state) {
                        this.onUiChange(criterionName, state);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                if (criterionName === 'pinned_card_1') {
                    this.updateUiCriterionEnabled(criterionName);
                }
                break;
            }
        case 'autoaudience':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                this.criteria[criterionName].ui = new Checkbox(targetElem, {
                    label: this.criteria.autoaudience.label_checkbox,
                    checked: this.criteria.autoaudience.value,
                    width: this.options.uiWidth,
                    onChange: function(state) {
                        this.onUiChange(criterionName, state);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }

            //
            // Inputs
            //

        case 'criteria_preset_name':
        case 'tags':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                addEvent(targetElem, this.interestingEvents, function(event) {
                    return this.onUiEvent(criterionName, event);
                }.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
                break;
            }

            //
            // Other
            //

        case 'criteria_preset_name_button':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                addEvent(targetElem, 'click', function(event) {
                    return this.onUiEvent(criterionName, event);
                }.bind(this));
                this.cur.destroy.push(function(targetElem) {
                    cleanElems(targetElem);
                }.pbind(targetElem));
                break;
            }

        case 'price_list_retargeting_formula':
            {
                targetElem = ge(this.options.targetIdPrefix + criterionName);
                this.criteria[criterionName].ui = new RichDropDown(targetElem, {
                    items: this.getUiCriterionData(criterionName),
                    value: this.getUiCriterionSelectedData(criterionName),
                    width: this.options.uiWidth,
                    autoCompleteMaxWidth: 400,
                    operators: ['&', '&!', '|', '!'],
                    placeholder: this.getUiCriterionPlaceholderText(criterionName),
                    onChange: function() {
                        this.onUiChange(criterionName);
                    }.bind(this)
                });
                this.updateUiCriterionEnabled(criterionName);
                this.cur.destroy.push(function() {
                    this.criteria[criterionName].ui.destroy();
                }.bind(this));
                break;
            }
        case 'events_retargeting_groups':
            {
                this.criteria[criterionName].ui = [];
                var addAudienceLink = ge(this.options.targetIdPrefix + criterionName + '_add');
                var addAudienceContainer = ge(this.options.targetIdPrefix + criterionName);
                addEvent(addAudienceLink, 'click', this.eventsRetargetingGroupsAdd.bind(this, addAudienceContainer, this.criteria[criterionName].template, undefined, undefined));

                if (this.criteria[criterionName].value) {
                    var eventsRetargetingGroupsItems = this.criteria[criterionName].value.split(';');
                    each(eventsRetargetingGroupsItems, function(k, v) {
                        if (!v) {
                            return;
                        }
                        var eventsRetargetingGroupsArray = v.split(':');
                        this.eventsRetargetingGroupsAdd(addAudienceContainer, this.criteria[criterionName].template, intval(eventsRetargetingGroupsArray[0]) || undefined, eventsRetargetingGroupsArray[1]);
                    }.bind(this));
                } else {
                    this.eventsRetargetingGroupsAdd(addAudienceContainer, this.criteria[criterionName].template);
                }

                this.eventsRetargetingGroupsUpdateValue(criterionName);
                this.initHelpCriterion(criterionName);
            }
    }

    this.criteria[criterionName].uiInited = true;
    //debugLog('Targeting: ' + criterionName + ' UI inited');
}

AdsTargetingEditor.prototype.getUiCriterionData = function(criterionName, options) {
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
        case 'groups_active':
            return '/adsedit?act=search_user_objects&section=groups&group_purpose=' + AdsEdit.ADS_AD_CHECK_GROUP_PURPOSE_CRITERIA;
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
        case 'geo_mask':
            {
                var viewParams = this.viewEditor.getParams();
                var showOnlineGeo = (inArray(viewParams.format_type, [AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST, AdsEdit.ADS_AD_FORMAT_TYPE_MOBILE, AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD]) || (this.criteria[criterionName].value == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE));
                return this.criteria[criterionName].data.filter(function(row) {
                    return showOnlineGeo ? true : (row[0] != AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE);
                }, this);
            }
        case 'geo_near':
            {
                var suffix = '';
                var mapCenter;
                if (options && options.mapCenter) {
                    mapCenter = options.mapCenter;
                }
                var geoEditor = this.criteria.geo_near.geo_editor;
                if (geoEditor && geoEditor.inited) {
                    if (!mapCenter) {
                        mapCenter = geoEditor.map.getCenter();
                    }
                    suffix += '&radius=' + geoEditor.options.defaultRadius;
                }

                if (mapCenter) {
                    suffix += '&lat=' + mapCenter.lat + '&lon=' + mapCenter.lon;
                }

                return '/adsedit?act=search_geo' + suffix;
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
        case 'retargeting_groups_not':
            return this.criteria['retargeting_groups'].data || [];
        default:
            return this.criteria[criterionName].data || [];
    }
}

AdsTargetingEditor.prototype.updateUiCriterionData = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) {
        try {
            console.error("Can't update data");
        } catch (e) {}
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
    var data = [
        [0, langValueAny]
    ];
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
                    for (; i < defaultDataCount; i++) {
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
        case 'groups_active':
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
        case 'price_list_id':
            return this.criteria[criterionName].data || [];
        default:
            return this.criteria[criterionName].defaultData || [];
    }
}

AdsTargetingEditor.prototype.updateUiCriterionDefaultData = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) { // No 'defaultData' here
        try {
            console.error("Can't update default data");
        } catch (e) {}
        return;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    var defaultData = this.getUiCriterionDefaultData(criterionName);
    this.criteria[criterionName].ui.setOptions({
        defaultItems: defaultData
    });
}

AdsTargetingEditor.prototype.getUiCriterionSelectedData = function(criterionName) {
    switch (criterionName) {
        case 'geo_near':
            return ''; // ���������������� � initGeoEditor
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
            try {
                console.error("Can't update selected data");
            } catch (e) {}
        }
        return;
    }

    if (inArray(criterionName, ['geo_near', 'price_list_retargeting_formula', 'events_retargeting_groups'])) {
        return;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    var value = this.criteria[criterionName].value;
    if (!value) {
        return;
    }

    this.criteria[criterionName].ui.clear();

    var selectedItems;
    selectedItems = value.toString().split(',');

    each(selectedItems, function(key, value) {
        this.criteria[criterionName].ui.selectItem(value, false);
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
        case 'price_list_id':
            var viewParams = this.viewEditor.getParams();
            return !(viewParams.ad_id || this.criteria[criterionName].data.length <= 1);
        case 'price_list_retargeting_formula':
        case 'pinned_card_1':
            return !!(this.criteria.price_list_id.value);
        default:
            return null;
    }
}

AdsTargetingEditor.prototype.updateUiCriterionEnabled = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) {
        try {
            console.error("Can't update enabled state", criterionName);
        } catch (e) {}
        return;
    }

    this.updateUiCriterionVisibility(criterionName); // Should be before any ui.disable()

    if (this.criteria[criterionName].ui) {
        var enabled = this.getUiCriterionEnabled(criterionName);
        var criterionUi = this.criteria[criterionName].ui;

        if (enabled !== null) {
            if (criterionName === 'pinned_card_1') {
                criterionUi.disable(!enabled);
                if (!enabled) {
                    criterionUi.setState(0);
                }
            } else if (inArray(criterionName, ['price_list_retargeting_formula'])) {
                criterionUi.toggleDisable(!enabled);
            } else if (!this.criteria[criterionName].value) {
                criterionUi.disable(enabled); // Fix disabling introText
                criterionUi.disable(!enabled);
                criterionUi.clear(); // Fix placeholder
                if (this.criteria[criterionName].value === 0) {
                    criterionUi.val(this.criteria[criterionName].value);
                }
            } else if (inArray(criterionName, ['price_list_id'])) {
                criterionUi.disable(!enabled);
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

    var tabbedControl = inArray(criterionName, ['geo_near', 'geo_mask', 'country', 'cities', 'cities_not', 'streets', 'districts', 'stations']);

    if (visible !== false) {
        switch (criterionName) {
            case 'districts':
            case 'stations':
            case 'streets':
                // var citiesOnlyIds = this.getCitiesOnly();
                // visible = !!(!citiesOnlyIds || this.criteria[criterionName].data.length) && (this.criteria.geo_type.value == 0);
                visible = false;
                if (this.criteria.geo_type.value == 0) {
                    tabbedControl = false; // allow to show if this criterion has value
                }
                break;
            case 'country':
            case 'cities':
            case 'cities_not':
                visible = (this.criteria.geo_type.value == 0);
                break;
            case 'geo_mask':
            case 'geo_near':
                visible = (this.criteria.geo_type.value == 1);
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
            case 'price_list_id':
            case 'pinned_card_1':
            case 'price_list_retargeting_formula':
                var viewParams = this.viewEditor.getParams();
                var promotedPostKludgesHave = this.viewEditor.getLinkPromotedPostKludgesHave();
                visible = !!(inArray(viewParams.link_type, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) && promotedPostKludgesHave.pretty_cards);
                break;
            case 'events_retargeting_groups':
                var viewParams = this.viewEditor.getParams();
                visible = !!(inArray(viewParams.link_type, AdsEdit.ADS_AD_LINK_TYPES_ALL_POST) || viewParams.format_type == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD || viewParams.format_type == AdsEdit.ADS_AD_FORMAT_TYPE_STORY);
                break;
            case 'criteria_preset_name':
            case 'criteria_preset_name_button':
                visible = !this.criteria[criterionName].hidden;
                break;
        }
    }

    if (visible === false && checkCriterionValue && !tabbedControl) {
        visible = !!(this.criteria[criterionName].value);
    }

    return visible;
}

AdsTargetingEditor.prototype.updateUiCriterionVisibility = function(criterionName) {

    var checkCriterionValue = criterionName !== 'events_retargeting_groups';
    var visible = this.getUiCriterionVisibility(criterionName, checkCriterionValue);
    if (visible === null) {
        return;
    }

    this.criteria[criterionName].hidden = !visible;

    var rowName = (this.criteria[criterionName].row_name ? this.criteria[criterionName].row_name : criterionName);

    if (visible) {
        this.initUiCriterion(criterionName);
        removeClass('ads_edit_criterion_row_' + rowName, 'unshown');

        if (rowName === 'events_retargeting_groups') {
            removeClass('ads_edit_group_' + rowName, 'unshown');
        }
    } else if (!('dataInited' in this.criteria[criterionName]) || this.criteria[criterionName].dataInited) {
        addClass('ads_edit_criterion_row_' + rowName, 'unshown');

        if (rowName === 'events_retargeting_groups') {
            addClass('ads_edit_group_' + rowName, 'unshown');

            if (this.criteria[criterionName].uiInited) {
                each(this.criteria[criterionName].ui, function(k, eventsRetargetingGroupsUiElements) {
                    each(eventsRetargetingGroupsUiElements, function(kk, eventsRetargetingGroupsUiElement) {
                        if (eventsRetargetingGroupsUiElement.destroy && !eventsRetargetingGroupsUiElement.destroyed) {
                            eventsRetargetingGroupsUiElement.destroy();
                        }
                    });
                });
                ge(this.options.targetIdPrefix + criterionName).innerHTML = '';
                this.eventsRetargetingGroupsUpdateValue(criterionName);
            }
        }
    }
}

AdsTargetingEditor.prototype.getUiCriterionIntroText = function(criterionName) {
    switch (criterionName) {
        case 'cities':
        case 'cities_not':
            return getLang('ads_starttypingname_city_region');
        case 'statuses':
            return getLang('ads_select_marital');
        case 'interests':
            return getLang('ads_starttypingname_interest');
        case 'interest_categories':
            return getLang('ads_select_interest_category');
        case 'group_types':
            return getLang('ads_starttypingname_group');
        case 'groups':
            return getLang('ads_type_group_public');
        case 'groups_not':
            return getLang('ads_type_group_public');
        case 'groups_active':
            return getLang('ads_type_group_public');
        case 'apps':
            return getLang('ads_type_app_site');
        case 'apps_not':
            return getLang('ads_type_app_site');
        case 'religions':
            return getLang('ads_select_religion');
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
        case 'positions':
            return getLang('ads_starttypingname_position');
        case 'operators':
            return getLang('ads_select_mobile_operator');
        case 'browsers':
            return getLang('ads_select_internet_browser');
        case 'user_devices':
            return getLang('ads_select_user_device');
        case 'user_operating_systems':
            return getLang('ads_select_user_operating_system');
        case 'user_browsers':
            return getLang('ads_select_user_browser');

        case 'events_retargeting_groups':
        case 'retargeting_groups':
        case 'retargeting_groups_not':
            return getLang('ads_select_retargeting_group_new');

        case 'price_list_id':
            return getLang('ads_select_price_list');

        case 'criteria_presets':
            return getLang('ads_select_criteria_preset');

        default:
            return '';
    }
}

AdsTargetingEditor.prototype.updateUiCriterionIntroText = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) {
        try {
            console.error("Can't update intro text");
        } catch (e) {}
        return;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    var introText = this.getUiCriterionIntroText(criterionName);
    this.criteria[criterionName].ui.setOptions({
        introText: introText
    });
    this.updateUiCriterionDefaultData(criterionName); // Workaround to set introText
}

AdsTargetingEditor.prototype.getUiCriterionPlaceholderText = function(criterionName) {
    switch (criterionName) {
        case 'geo_near':
            return getLang('ads_edit_ad_geo_map_address_placeholder');
        case 'cities':
        case 'cities_not':
            return getLang('ads_starttypingname_city_region');
        case 'statuses':
            return getLang('ads_select_marital');
        case 'interests':
            return getLang('ads_starttypingname_interest');
        case 'interest_categories':
            return getLang('ads_select_interest_category');
        case 'group_types':
            return getLang('ads_starttypingname_group');
        case 'groups':
            return getLang('ads_type_community');
        case 'groups_not':
            return getLang('ads_type_community');
        case 'groups_active':
            return getLang('ads_type_community');
        case 'apps':
            return getLang('ads_type_app_site');
        case 'apps_not':
            return getLang('ads_type_app_site');
        case 'religions':
            return getLang('ads_select_religion');
        case 'districts':
            return getLang('ads_starttypingname_district');
        case 'stations':
            return getLang('ads_starttypingname_station');
        case 'streets':
            return getLang('ads_starttypingname_street');
        case 'schools':
            return getLang('ads_starttypingname_school');
        case 'positions':
            return getLang('ads_starttypingname_position');
        case 'operators':
            return getLang('ads_select_mobile_operator');
        case 'browsers':
            return getLang('ads_select_internet_browser');
        case 'user_devices':
            return getLang('ads_select_user_device');
        case 'user_operating_systems':
            return getLang('ads_select_user_operating_system');
        case 'user_browsers':
            return getLang('ads_select_user_browser');

        case 'events_retargeting_groups':
        case 'retargeting_groups':
        case 'retargeting_groups_not':
            return getLang('ads_select_retargeting_group_new');

        case 'price_list_id':
            return getLang('ads_select_price_list');
        case 'price_list_retargeting_formula':
            return this.getUiCriterionEnabled(criterionName) ? getLang('ads_type_price_list_retargeting_formula') : this.getUiCriterionDisabledText(criterionName);

        case 'criteria_presets':
            return getLang('ads_select_criteria_preset');

        default:
            return '';
    }
}

AdsTargetingEditor.prototype.updateUiCriterionPlaceholderText = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) {
        try {
            console.error("Can't update placeholder text");
        } catch (e) {}
        return;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    var placeholderText = this.getUiCriterionPlaceholderText(criterionName);
    if (inArray(criterionName, ['price_list_retargeting_formula'])) {
        this.criteria[criterionName].ui.setOptions({
            placeholder: placeholderText
        });
    } else {
        this.criteria[criterionName].ui.setOptions({
            placeholder: placeholderText
        });
        this.updateUiCriterionDefaultData(criterionName); // Workaround to set introText and placeholder
    }
}

AdsTargetingEditor.prototype.getUiCriterionNoResultText = function(criterionName) {
    switch (criterionName) {
        case 'cities':
        case 'cities_not':
            return getLang('ads_notfound_city');
        case 'statuses':
            return getLang('ads_notfound_marital');
        case 'interests':
            return getLang('ads_notfound_interest');
        case 'interest_categories':
            return getLang('ads_notfound_interest_category');
        case 'group_types':
        case 'groups':
            return getLang('ads_notfound_group');
        case 'groups_not':
            return getLang('ads_notfound_group');
        case 'groups_active':
            return getLang('ads_notfound_group');
        case 'apps':
            return getLang('ads_notfound_app');
        case 'apps_not':
            return getLang('ads_notfound_app');
        case 'religions':
            return getLang('ads_notfound_religion');
        case 'districts':
            return getLang('ads_notfound_district');
        case 'stations':
            return getLang('ads_notfound_station');
        case 'streets':
            return getLang('ads_notfound_street');
        case 'schools':
            return getLang('ads_notfound_school');
        case 'positions':
            return getLang('ads_notfound_position');
        case 'operators':
            return getLang('ads_notfound_mobile_operator');
        case 'browsers':
            return getLang('ads_notfound_internet_browser');
        case 'user_devices':
            return getLang('ads_notfound_user_device');
        case 'user_operating_systems':
            return getLang('ads_notfound_user_operating_system');
        case 'user_browsers':
            return getLang('ads_notfound_user_browser');
        case 'retargeting_groups':
            return getLang('ads_notfound_retargeting_groups');
        case 'retargeting_groups_not':
            return getLang('ads_notfound_retargeting_groups');
        case 'geo_near':
            return getLang('ads_notfound_geo');
        default:
            return '';
    }
}

AdsTargetingEditor.prototype.getUiCriterionDisabledText = function(criterionName) {
    switch (criterionName) {
        case 'cities':
        case 'cities_not':
            return getLang('ads_first_select_country');
        case 'districts':
        case 'stations':
        case 'streets':
            return getLang('ads_first_select_city');
        case 'schools':
            if (this.criteria.schools_type.value == 1) {
                return getLang('ads_first_select_city_for_school');
            } else {
                return getLang('ads_first_select_city_for_university');
            }
        case 'price_list_retargeting_formula':
            return getLang('ads_first_select_price_list');
        default:
            return '';
    }
}

AdsTargetingEditor.prototype.updateUiCriterionDisabledText = function(criterionName) {
    if (!('data' in this.criteria[criterionName])) {
        try {
            console.error("Can't update disabled text");
        } catch (e) {}
        return;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    var disabledText = this.getUiCriterionDisabledText(criterionName);
    this.criteria[criterionName].ui.setOptions({
        disabledText: disabledText
    });
}

AdsTargetingEditor.prototype.setAutoGroupsNotValue = function(selectedValue) {
    if (selectedValue === false) return;

    this.showGroupMore('interests');
    this.initUiCriterion('groups');
    this.initUiCriterion('groups_not');
    this.initUiCriterion('groups_active');

    if (this.criteria.groups.uiInited && this.criteria.groups_not.uiInited) {
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
        case 'price_list_id':
            if (this.criteria[criterionName].value != 0) {
                this.onCriterionUpdate(criterionName, 0, false, true);
                this.criteria[criterionName].ui.selectItem(this.criteria[criterionName].value);
            }
            break;
        case 'price_list_retargeting_formula':
            this.criteria[criterionName].ui.setValue('');
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
                this.updateUiCriterionData('geo_near');
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
            case 'price_list_id':
                this.updateUiCriterionEnabled('price_list_retargeting_formula');
                this.updateUiCriterionEnabled('pinned_card_1');
                this.updateUiCriterionPlaceholderText('price_list_retargeting_formula');
                break;
            case 'price_list_retargeting_formula':
                this.updateUiCriterionEnabled('price_list_retargeting_formula');
                this.updateUiCriterionPlaceholderText('price_list_retargeting_formula');
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

            case 'geo_mask':
                {
                    var mask = this.criteria[criterionName].value;
                    var isOnline = (mask == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE);
                    var allowedRadiuses = isOnline ? this.criteria['geo_near'].allowed_radiuses_online : this.criteria['geo_near'].allowed_radiuses;
                    var radiusSelector = isOnline ? this.criteria['geo_near'].radius_selector_online : this.criteria['geo_near'].radius_selector;
                    var geoEditor = this.criteria['geo_near'].geo_editor;

                    each(geByClass('ads_edit_geo_place_radius_selector_wrap', this.criteria['geo_near'].ui.container), function(i, el) {
                        var menu = geByClass1('_ui_menu', el);
                        if (!menu) {
                            menu = data(el, 'dummyMenu');
                            data(el, 'dummyMenu', null);
                        }

                        re(menu);

                        el.appendChild(geByClass1('ui_actions_menu', se(radiusSelector)));
                    });

                    if (geoEditor && geoEditor.inited) {
                        geoEditor.setMask(mask);
                        geoEditor.options.allowedRadiuses = allowedRadiuses;
                        var boxGeoEditor = geoEditor.box_geo_editor;
                        if (boxGeoEditor && boxGeoEditor.inited) {
                            boxGeoEditor.setMask(mask);
                            boxGeoEditor.options.allowedRadiuses = allowedRadiuses;
                        }

                        if (geoEditor.havePointsWithUnallowedRadius()) {
                            // show tooltip
                            this.criteria['geo_near'].ttHandler({
                                type: 'manual_show'
                            });
                            setTimeout(this.criteria['geo_near'].ttHandler.bind(this, {
                                type: 'manual_hide'
                            }), 8000);
                        }
                    }

                    break;
                }

            case 'geo_type':
                {
                    this.updateUiCriterionVisibility('country');
                    this.updateUiCriterionVisibility('cities');
                    this.updateUiCriterionVisibility('cities_not');
                    this.updateUiCriterionVisibility('streets');
                    this.updateUiCriterionVisibility('districts');
                    this.updateUiCriterionVisibility('stations');
                    this.updateUiCriterionVisibility('geo_near');
                    this.updateUiCriterionVisibility('geo_mask');

                    toggleClass('ads_edit_targeting_group_' + 'geography' + '_more_row', 'ads_edit_row_more_hidden', this.criteria[criterionName].value);
                    toggleClass('ads_edit_targeting_group_' + 'geography' + '_less_row', 'ads_edit_row_more_hidden', this.criteria[criterionName].value);
                    break;
                }
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
        case 'price_list_retargeting_formula':
            criterionValue = this.criteria.price_list_retargeting_formula.ui.getStringValue();
            criterionValue = criterionValue || '';
            break;
        case 'criteria_presets':
            var criteriaPreset = this.criteria.criteria_presets_raw.data[criterionValue] || {};
            var criteriaPresetData = this.criteria.criteria_presets_data.data[criterionValue] || {};
            var criteriaSelected = criteriaPreset && criteriaPresetData;
            if (criteriaSelected) {
                this.selectCriteriaPreset(criteriaPreset, criteriaPresetData);
            }
            toggleClass(geByClass1('ads_edit_value_criteria_presets_selector_remove'), 'unshown', !(criteriaSelected && (criterionValue > 0)));
            break;
    }

    this.onCriterionUpdate(criterionName, criterionValue);

    function updateBirhday(newValue) {
        var isCheckedToday = !!(newValue & (1 << 0));
        var isCheckedTomorrow = !!(newValue & (1 << 1));
        var isCheckedWeek = !!(newValue & (1 << 2));
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

AdsTargetingEditor.prototype.resetCriteria = function() {
    var criteriaToReset = [
        'age_from', 'age_any', 'sex', 'country', 'cities', 'cities_not', 'birthday',
        'statuses'
    ];

    for (var criterionIndex in criteriaToReset) {
        var criterionName = criteriaToReset[criterionIndex];

        switch (criterionName) {
            case 'cities':
            case 'cities_not':
            case 'statuses':
                this.criteria[criterionName].ui.clear();
                break;

            case 'country':
                this.criteria[criterionName].ui.selectItem(-1);
                this.criteria.geo_type.ui_geo_type_regions.checked(true);
                break;

            case 'age_from':
            case 'age_to':
                this.criteria[criterionName].ui.clear();
                break;

            case 'sex':
                this.criteria[criterionName].ui_any.checked(true);
                break;

            case 'birthday':
                this.criteria[criterionName].ui_today.checked(false);
                this.criteria[criterionName].ui_tomorrow.checked(false);
                this.criteria[criterionName].ui_week.checked(false);
                break;
        }
    }
}

AdsTargetingEditor.prototype.selectCriteriaPreset = function(criteriaPreset, criteriaPresetData, delayed) {
    var criteriaNames = Object.keys(this.criteria);
    var highPriorityKeys = ['schools_type', 'geo_near'];
    for (var criterionNameIndex in highPriorityKeys) {
        var criterionName = highPriorityKeys[criterionNameIndex];
        var index = criteriaNames.indexOf(criterionName);
        if (index == -1) {
            continue;
        }

        criteriaNames.splice(index, 1);
        criteriaNames.splice(0, 0, criterionName);
    }

    for (var criterionNameIndex in criteriaNames) {
        var criterionName = criteriaNames[criterionNameIndex];
        var criterionValue = (criterionName in criteriaPreset) ? criteriaPreset[criterionName] : this.criteria[criterionName].valueEmpty;
        var criterionValueInt = intval(criteriaPreset[criterionName]);
        var criterionValueArray = (criterionValue ? String(criterionValue).split(',') : []);
        var criterionData = criteriaPresetData[criterionName] || [];

        if (criterionName === 'geo_type') {
            continue;
        }

        this.initUiCriterion(criterionName);
        this.onCriterionUpdate(criterionName, criterionValue, false, true);

        switch (criterionName) {
            case 'geo_near':
                if (criterionValue) {
                    this.onCriterionUpdate('geo_type', 1, false, true);
                    this.criteria.geo_type.ui_geo_type_points.checked(true);
                }
                if (this.criteria.geo_near.geo_editor && this.criteria.geo_near.geo_editor.inited) {
                    this.criteria.geo_near.geo_editor.setPointsFromString(criterionValue);
                }
                break;
            case 'cities':
            case 'cities_not':
                if (criterionValue) {
                    this.onCriterionUpdate('geo_type', 0, false, true);
                    this.criteria.geo_type.ui_geo_type_regions.checked(true);
                }
                // no break
            case 'groups':
            case 'groups_not':
            case 'groups_active':
            case 'apps':
            case 'apps_not':
            case 'positions':
            case 'schools':
                if (this.criteria[criterionName].uiInited) {
                    this.criteria[criterionName].ui.clear();
                    each(criterionData, function(k, v) {
                        this.criteria[criterionName].ui.selectItem(v, false);
                    }.bind(this));
                }
                break;

            case 'statuses':
            case 'interest_categories':
            case 'retargeting_groups':
            case 'retargeting_groups_not':
            case 'user_devices':
            case 'user_operating_systems':
            case 'user_browsers':
                this.criteria[criterionName].ui.clear();
                each(criterionValueArray, function(k, v) {
                    this.criteria[criterionName].ui.selectItem(v, false);
                }.bind(this));
                break;

            case 'country':
                if (criterionValue) {
                    this.onCriterionUpdate('geo_type', 0, false, true);
                    this.criteria.geo_type.ui_geo_type_regions.checked(true);
                }
                if (this.criteria[criterionName].uiInited) {
                    this.criteria[criterionName].ui.selectItem(criterionValue);
                }
                break;

            case 'age_from':
            case 'age_to':
            case 'school_from':
            case 'school_to':
            case 'uni_from':
            case 'uni_to':
                if (this.criteria[criterionName].uiInited) {
                    this.criteria[criterionName].ui.selectItem(criterionValue);
                }
                break;

            case 'sex':
                switch (criterionValueInt) {
                    case 1:
                        this.criteria[criterionName].ui_female.checked(true);
                        break;
                    case 2:
                        this.criteria[criterionName].ui_male.checked(true);
                        break;
                    default:
                    case 0:
                        this.criteria[criterionName].ui_any.checked(true);
                        break;
                }
                break;

            case 'schools_type':
                switch (criterionValueInt) {
                    case 1:
                        this.criteria[criterionName].ui_school.checked(true);
                        break;
                    case 2:
                        this.criteria[criterionName].ui_uni.checked(true);
                        break;
                    default:
                    case 0:
                        this.criteria[criterionName].ui_any.checked(true);
                        break;
                }
                break;

            case 'birthday':
                var isCheckedToday = !!(criterionValueInt & (1 << 0));
                var isCheckedTomorrow = !!(criterionValueInt & (1 << 1));
                var isCheckedWeek = !!(criterionValueInt & (1 << 2));

                this.criteria[criterionName].ui_today.checked(isCheckedToday);
                this.criteria[criterionName].ui_tomorrow.checked(isCheckedTomorrow);
                this.criteria[criterionName].ui_week.checked(isCheckedWeek);

                break;

            case 'travellers':
                if (this.criteria[criterionName].uiInited) {
                    this.criteria[criterionName].ui.checked(!!criterionValueInt);
                }
                break;
        }
    }

    setTimeout(function() {
        this.criteria.criteria_presets.currentHash = MD5(JSON.stringify(this.getCriteria()));
    }.bind(this), 100);
}

AdsTargetingEditor.prototype.removeCurrentCriteriaPreset = function() {
    var criteriaPresetId = this.criteria.criteria_presets.value;
    if (!criteriaPresetId || criteriaPresetId <= 0) {
        return false;
    }

    var viewParams = cur.viewEditor.getParams();

    ajax.post('/adsedit?act=a_edit_criteria_preset', extend({}, {
        client_id: viewParams.client_id,
        criteria_preset_id: criteriaPresetId,
        hash: cur.saveCriteriaPresetHash,
        source: 'adsedit',
        do_delete: 1
    }));

    var newPresets = this.criteria.criteria_presets.data.filter(function(preset) {
        return preset[0] != criteriaPresetId;
    });
    this.criteria.criteria_presets.data = newPresets;
    this.criteria.criteria_presets.ui.setOptions({
        defaultItems: newPresets
    });
    this.criteria.criteria_presets.ui.dataItems = newPresets;
    this.criteria.criteria_presets.ui.select.removeItem(criteriaPresetId);
    this.criteria.criteria_presets.ui.clear();

    if (newPresets.length <= 1) { // only "not selected"
        hide(ge('ads_edit_targeting_group_criteria_presets'));
    }
}

AdsTargetingEditor.prototype.onUiTagAdd = function(criterionName, criterionValue, criterionTag) {
    switch (criterionName) {
        case 'cities':
            setTimeout(function() {
                this.criteria.cities_not.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'cities_not':
            setTimeout(function() {
                this.criteria.cities.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'groups':
            setTimeout(function() {
                this.criteria.groups_not.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'groups_not':
            setTimeout(function() {
                this.criteria.groups.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'apps':
            setTimeout(function() {
                this.criteria.apps_not.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'apps_not':
            setTimeout(function() {
                this.criteria.apps.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'retargeting_groups':
            setTimeout(function() {
                this.criteria.retargeting_groups_not.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'retargeting_groups_not':
            setTimeout(function() {
                this.criteria.retargeting_groups.ui.removeTagData(criterionTag[0]);
            }.bind(this), 1);
            break;
        case 'geo_near':
            {
                var pointInfo = criterionTag[0].split(',');
                var newPointID = this.criteria[criterionName].geo_editor.addPoint(pointInfo[0], pointInfo[1], pointInfo[2], pointInfo[3], criterionTag[1]);
                this.criteria[criterionName].geo_editor.updateMap(newPointID);
                return; // prevent update, it will be called by map
            }
    }

    this.onCriterionUpdate(criterionName, criterionValue);
}

AdsTargetingEditor.prototype.onUiTagRemove = function(criterionName, criterionValue, criterionTag) {
    switch (criterionName) {
        case 'geo_near':
            {
                this.criteria[criterionName].geo_editor.removePoint(criterionTag[0]);
                this.criteria[criterionName].geo_editor.updateMap();
                return; // prevent update, it will be called by map
            }
    }
    this.onCriterionUpdate(criterionName, criterionValue);
}

AdsTargetingEditor.prototype.onUiTagClick = function(criterionName, criterionValue, event) {
    switch (criterionName) {
        case 'geo_near':
            {
                if (gpeByClass('ads_edit_geo_place_radius_selector_wrap', event.target)) {
                    // do not handle click inside radius selector
                    return;
                }
                var token = gpeByClass('token', event.target);
                var pointID = token.getAttribute('data-id');
                this.criteria[criterionName].geo_editor.focusOnPoint(pointID);
                break;
            }
    }
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
        case 'geo_near':
            {
                if (event.type === 'mouseover') {
                    var token = gpeByClass('token', event.target);
                    var pointID = token.getAttribute('data-id');
                    this.criteria[criterionName].geo_editor.highlightPoint(pointID, true);
                }
                if (event.type === 'mouseout') {
                    var token = gpeByClass('token', event.target);
                    var e = event.toElement || event.relatedTarget;
                    if (e && (e.parentNode == token || e == token)) {
                        return;
                    }
                    var pointID = token.getAttribute('data-id');
                    this.criteria[criterionName].geo_editor.highlightPoint(pointID, false);
                }
                break;
            }
        case 'criteria_preset_name_button':
            {
                this.criteria['criteria_preset_name_button'].hidden = true;
                this.criteria['criteria_preset_name'].hidden = false;
                this.updateUiCriterionVisibility('criteria_preset_name_button');
                this.updateUiCriterionVisibility('criteria_preset_name');

                ge(this.options.targetIdPrefix + 'criteria_preset_name').focus();
                break;
            }
        case 'criteria_preset_name':
        case 'price_list_retargeting_formula':
        case 'tags':
            {
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
                this.criteria.groups.link_object_id = result.groups_link_object_id;
                this.criteria.groups.link_object_item = result.groups_link_object_item;
                this.criteria.groups.link_object_processed = false;
                this.updateUiCriterionDefaultData('groups');
                this.updateUiCriterionDefaultData('groups_not');
            }
        } else if (isObject(result) && 'post_group_object_id' in result && 'post_group_object_item' in result && result.post_group_object_id != 0) {
            if (result.groups_link_object_id != this.criteria.groups.link_object_id) {
                this.criteria.groups.link_object_id = result.post_group_object_id;
                this.criteria.groups.link_object_item = result.post_group_object_item;
                this.criteria.groups.link_object_processed = false;
                this.updateUiCriterionDefaultData('groups');
                this.updateUiCriterionDefaultData('groups_not');
            }
        } else {
            this.criteria.groups.link_object_id = 0;
            this.criteria.groups.link_object_item = null;
            this.criteria.groups.link_object_processed = false;
            this.updateUiCriterionDefaultData('groups');
            this.updateUiCriterionDefaultData('groups_not');
        }
        if (isObject(result) && 'apps_link_object_id' in result && 'apps_link_object_item' in result && result.apps_link_object_id != 0) {
            if (result.apps_link_object_id != this.criteria.apps.link_object_id) {
                this.criteria.apps.link_object_id = result.apps_link_object_id;
                this.criteria.apps.link_object_item = result.apps_link_object_item;
                this.criteria.apps.link_object_processed = false;
                this.updateUiCriterionDefaultData('apps');
                this.updateUiCriterionDefaultData('apps_not');
            }
        } else {
            this.criteria.apps.link_object_id = 0;
            this.criteria.apps.link_object_item = null;
            this.criteria.apps.link_object_processed = false;
            this.updateUiCriterionDefaultData('apps');
            this.updateUiCriterionDefaultData('apps_not');
        }
    }

    if (isObject(result) && 'audience_count_texts_geo_near' in result) {
        this.updateGeoPointsAudience('geo_near', result.audience_count_texts_geo_near, result.audience_count_texts_geo_near_only);
    }

    return setResult;
}

AdsTargetingEditor.prototype.isUserDevicesHidden = function() {
    return this.criteria.user_devices.hidden;
}

AdsTargetingEditor.prototype.correctInvalidValue = function(criterionName, criterionValue) {
    if (this.criteria[criterionName].max_length) {
        criterionValue = criterionValue.substr(0, this.criteria[criterionName].max_length);
    }
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
    if (this.criteria.geo_type.value == 1) {
        criteria.country = '';
        criteria.cities = '';
        criteria.cities_not = '';
        criteria.districts = '';
        criteria.stations = '';
        criteria.streets = '';
    } else if (this.criteria.geo_type.value == 0) {
        criteria.geo_near = '';
        criteria.geo_mask = '';
    }

    if (this.criteria.criteria_presets.confirmed) {
        criteria.criteria_presets_confirmed = this.criteria.criteria_presets.confirmed;
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

AdsTargetingEditor.prototype.initGeoFileUpload = function(criterionName) {
    var boxGeoEditor = this.criteria[criterionName].geo_editor.box_geo_editor;

    if (typeof window.FileReader === 'function') {
        var fileSizeLimit = 1024 * 30; // 30 kb
        Upload.init(ge('ads_edit_geo_box_file_upload', boxGeoEditor.box), '', {}, {
            file_name: 'doc',
            uploadButton: 'ads_edit_geo_box_file_upload_button_dummy',
            buttonClass: 'secondary',

            file_size_limit: fileSizeLimit,
            file_types_description: 'CSV file (*.csv, *.txt)',
            file_types: '*.csv;*.CSV;*.txt;*.TXT',

            onUploadFileSelected: function() {
                var filesInput = geByTag1('input', ge('ads_edit_geo_box_file_upload', boxGeoEditor.box));
                if (!filesInput.files || !filesInput.files[0]) {
                    return;
                }
                var file = filesInput.files[0];
                filesInput.value = "";
                if (file.size > fileSizeLimit) {
                    showFastBox(getLang('global_error'), getLang('ads_geo_file_size_error'));
                    return;
                }
                if (!inArray(file.type, ['text/plain', 'text/csv'])) {
                    showFastBox(getLang('global_error'), getLang('ads_geo_file_type_error'));
                    return;
                }
                fr = new FileReader();
                fr.onload = function() {
                    val(boxGeoEditor.batch_input, fr.result);
                    this.updateGeoBoxBatchLinesCounter(criterionName);
                }.bind(this);
                fr.readAsText(file)
            }.bind(this),
            lang: {
                button_browse: getLang('ads_geo_button_browse')
            },

            noCheck: 1,
            noFlash: 1,
            clear: 1,
            type: 'doc',
            max_attempts: 3
        });
    } else {
        hide(ge('ads_edit_geo_box_file_wrapper', boxGeoEditor.box));
    }
}

AdsTargetingEditor.prototype.getGeoBoxBatchLines = function(criterionName) {
    var boxGeoEditor = this.criteria[criterionName].geo_editor.box_geo_editor;

    var text = val(boxGeoEditor.batch_input);
    var lines = text.split("\n");
    var result = [];
    for (var i in lines) {
        var line = lines[i].trim();
        if (!line.length) {
            continue;
        }

        result.push(line);
    }

    return result;
}

AdsTargetingEditor.prototype.updateGeoBoxBatchLinesCounter = function(criterionName) {
    var boxGeoEditor = this.criteria[criterionName].geo_editor.box_geo_editor;

    var counter = this.getGeoBoxBatchLines(criterionName).length;
    var linesLimit = 100;
    val(boxGeoEditor.batch_lines_counter, langStr(langNumeric(linesLimit, cur.lang.ads_geo_batch_line_counter), 'lines', counter, 'limit', linesLimit));
    toggleClass(boxGeoEditor.batch_lines_counter, 'ads_edit_geo_box_batch_line_counter_overflow', counter > linesLimit);

    hide(boxGeoEditor.batch_msg);
}

AdsTargetingEditor.prototype.initGeoBox = function(criterionName, geoEditorOptions) {
    var boxGeoEditor = this.criteria[criterionName].geo_editor.box_geo_editor;

    boxGeoEditor.box = ge('ads_edit_geo_box_wrap');
    boxGeoEditor.table = ge('ads_edit_geo_box_table', boxGeoEditor.box);
    boxGeoEditor.table_header = ge('ads_edit_geo_box_table_header', boxGeoEditor.box);
    boxGeoEditor.table_wrap = geByClass1('ads_edit_geo_box_table_wrap', boxGeoEditor.box);
    boxGeoEditor.table_body = ge('ads_edit_geo_box_table_body', boxGeoEditor.box);
    boxGeoEditor.batch_input = ge('ads_edit_geo_box_batch_input', boxGeoEditor.box);
    boxGeoEditor.batch_lines_counter = ge('ads_edit_geo_box_batch_line_counter', boxGeoEditor.box);
    boxGeoEditor.batch_submit = ge('ads_edit_geo_box_batch_submit', boxGeoEditor.box);
    boxGeoEditor.batch_msg = ge('ads_edit_geo_box_batch_msg', boxGeoEditor.box);
    boxGeoEditor.radius_selector_tt_container = boxGeoEditor.box; //geByClass1('ads_edit_geo_radius_tt_container', boxGeoEditor.box);

    this.initGeoFileUpload(criterionName);

    addEvent(boxGeoEditor.batch_input, 'change keyup', this.updateGeoBoxBatchLinesCounter.bind(this, criterionName));

    addEvent(boxGeoEditor.batch_submit, 'click', function() {
        var lines = this.getGeoBoxBatchLines(criterionName);
        if (!lines.length) {
            return;
        }
        setTimeout(lockButton.pbind(boxGeoEditor.batch_submit), 0);
        var linesLimit = 100;

        var validLines = 0;
        var linesProcessed = 0;
        for (var i in lines) {
            if (linesProcessed++ >= linesLimit) {
                break;
            }
            var lineInfo = lines[i].split(',');
            if (lineInfo[3] && lineInfo.length > 4) {
                lineInfo[3] = lineInfo.slice(3).join(',');
                lineInfo.splice(4);
            }
            if (lineInfo.length < 3 || lineInfo.length > 4) {
                continue;
            }
            var addResult = boxGeoEditor.addPoint(lineInfo[0].trim(), lineInfo[1].trim(), lineInfo[2].trim(), undefined, lineInfo[3] ? lineInfo[3].trim() : undefined);
            if (addResult) {
                validLines++;
            }
        }
        boxGeoEditor.updateMap();
        setTimeout(unlockButton.pbind(boxGeoEditor.batch_submit), 0);

        if (validLines == lines.length) {
            addClass(boxGeoEditor.batch_msg, 'ok_msg');
            removeClass(boxGeoEditor.batch_msg, 'error');
        } else {
            removeClass(boxGeoEditor.batch_msg, 'ok_msg');
            addClass(boxGeoEditor.batch_msg, 'error');
        }
        var addMsg = '';
        if (linesProcessed >= linesLimit) {
            addMsg = '<br>' + getLang('ads_geo_batch_too_many_lines');
        }
        val(boxGeoEditor.batch_msg, langStr(langNumeric(lines.length, cur.lang.ads_geo_batch_message), 'lines', validLines, 'total', lines.length) + addMsg);
        show(boxGeoEditor.batch_msg);
    }.bind(this));

    addEvent(boxGeoEditor.table_wrap, 'wheel', function(event) {
        var top = boxGeoEditor.table_wrap.scrollTop <= 0;
        var bottom = (boxGeoEditor.table_wrap.scrollTop + boxGeoEditor.table_wrap.offsetHeight) >= boxGeoEditor.table_wrap.scrollHeight;

        if (bottom && event.deltaY > 0) {
            return cancelEvent(event);
        }
        if (top && event.deltaY < 0) {
            return cancelEvent(event);
        }
    });
    addEvent(boxGeoEditor.table_body, 'click', function(event) {
        var parentNode, pointID;

        if (hasClass(event.target, 'ads_edit_geo_box_table_point_remove_button')) {
            parentNode = gpeByClass('ads_edit_geo_box_table_point_row', event.target);
            pointID = parentNode.getAttribute('data-id');
            boxGeoEditor.removePoint(pointID);
            boxGeoEditor.updateMap();
        } else {
            if (gpeByClass('ads_edit_geo_place_radius_selector_wrap', event.target)) {
                // do not handle click inside radius selector
                return;
            }
            parentNode = gpeByClass('ads_edit_geo_box_table_point_row', event.target);
            if (!parentNode) {
                return;
            }
            pointID = parentNode.getAttribute('data-id');
            boxGeoEditor.focusOnPoint(pointID);
        }
    }.bind(this));

    addEvent(boxGeoEditor.radius_selector_tt_container, 'click', function(event) {
        var parentNode, pointID;

        if (hasClass(event.target, 'ui_actions_menu_item')) { // dropdown click
            var newRadius = event.target.getAttribute('data-radius');
            parentNode = gpeByClass('ads_edit_geo_box_table_point_row', data(gpeByClass('ui_actions_menu_dummy_wrap', event.target), 'origMenu'));
            pointID = parentNode.getAttribute('data-id');

            var newID = boxGeoEditor.setPointRadius(pointID, newRadius);
            boxGeoEditor.updateMap(newID);
            this.updateGeoEditorDefaultRadius(criterionName, newRadius);
        }
    }.bind(this));

    each(geByClass('ads_edit_geo_box_tab_switch', boxGeoEditor.box), function(_, v) {
        addEvent(v, 'click', function(e) {
            each(geByClass('ads_edit_geo_box_tab', boxGeoEditor.box), function(_, v) {
                hide(v);
            });
            show(geByClass1('ads_edit_geo_box_tab_' + v.getAttribute('data-tab'), boxGeoEditor.box));
        }.bind(this));
    });

    var tableWrap = domPN(boxGeoEditor.table);
    geoEditorOptions.defaultRadius = this.criteria[criterionName].geo_editor.options.defaultRadius;
    geoEditorOptions.defaultMask = this.criteria['geo_mask'].value;
    boxGeoEditor.init(ge('ads_edit_geo_box_map'), geoEditorOptions, {
        onLoaded: function() {
            boxGeoEditor.setPointsFromArray(this.criteria[criterionName].geo_editor.points.slice(0));

            var targetElem = ge(this.options.targetIdPrefix + criterionName + '_geo_box_address', boxGeoEditor.box);
            targetElem.removeAttribute('autocomplete');
            boxGeoEditor.ui = new Autocomplete(targetElem, this.getUiCriterionData(criterionName), {
                introText: this.getUiCriterionIntroText(criterionName),
                placeholder: this.getUiCriterionPlaceholderText(criterionName),
                nativePlaceholder: true,
                hidePlaceholderOnSelected: false,
                noResult: this.getUiCriterionNoResultText(criterionName),
                disabledText: this.getUiCriterionDisabledText(criterionName),

                dropdown: false,
                listStyle: false,
                selectable: false,
                multiselect: false,
                big: true,
                withIcons: false,
                maxItems: this.options.uiMaxSelected,
                width: 322 + 130 + 20,
                height: this.options.uiHeight,
                selectedItemsDelimiter: ';',

                onChange: function(_, tag) {
                    var pointInfo = tag[0].split(',');
                    var newPointID = boxGeoEditor.addPoint(pointInfo[0], pointInfo[1], undefined, pointInfo[3], tag[1]); // radius is undefined because it is to be chosen from dropdown
                    boxGeoEditor.updateMap(newPointID);
                    boxGeoEditor.ui.clear();
                }.bind(this),
                onTagRemove: function(tag, value) {}.bind(this),
                onTokenClick: function(value, event) {}.bind(this)
            });
            this.cur.destroy.push(function() {
                boxGeoEditor.ui.destroy();
            });

            // Radius selector
            targetElem = ge(this.options.targetIdPrefix + criterionName + '_geo_box_radius', boxGeoEditor.box);
            if (0) {
                targetElem.removeAttribute('autocomplete');
                boxGeoEditor.ui_radius = new Dropdown(targetElem, this.criteria[criterionName].data_radius, {
                    selectedItem: geoEditorOptions.defaultRadius,
                    big: true,
                    width: 130,
                    onChange: function(value) {
                        boxGeoEditor.options.defaultRadius = parseInt(value);
                    }.bind(this)
                });
                this.cur.destroy.push(function() {
                    boxGeoEditor.ui_radius.destroy();
                });
            } else {
                hide(targetElem);
            }

        }.bind(this),
        onPointAdded: function(point) {
            re('ads_edit_geo_box_table_row_span');
            var row = boxGeoEditor.table_body.insertRow(boxGeoEditor.table_body.rows.length);
            var cell;

            cell = row.insertCell(0);
            cell.className = 'ads_edit_geo_box_table_point_remove';
            cell.innerHTML = '<div class="ads_edit_geo_box_table_point_remove_button"></div>';

            cell = row.insertCell(0);
            cell.className = 'ads_edit_geo_box_table_point_reach';
            cell.innerHTML = (point.audience !== undefined) ? boxGeoEditor.formatPointAudience(point.audience, point.audienceGeoNearOnly) : getProgressHtml();

            var isGeoOnline = this.criteria.geo_mask.value == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE;
            var radiusSelector = isGeoOnline ? this.criteria[criterionName].radius_selector_online : this.criteria[criterionName].radius_selector_full;
            cell = row.insertCell(0);
            cell.className = 'ads_edit_geo_box_table_point_radius';
            cell.innerHTML = radiusSelector;
            geByClass1('ads_edit_geo_place_radius_selector_text', cell).innerHTML = this.formatGeoRadius(criterionName, point.radius);

            cell = row.insertCell(0);
            cell.className = 'ads_edit_geo_box_table_point_caption';
            cell.innerHTML = point.caption;

            row.setAttribute('id', 'ads_edit_geo_box_table_row_' + point.id);
            row.setAttribute('data-id', point.id);
            row.className = 'ads_edit_geo_box_table_point_row';

            addEvent(row, 'mouseover mouseout', function(event) {
                if (event.type === 'mouseover') {
                    var rowEl = gpeByClass('ads_edit_geo_box_table_point_row', event.target);
                    var pointID = rowEl.getAttribute('data-id');
                    boxGeoEditor.highlightPoint(pointID, true);
                }
                if (event.type === 'mouseout') {
                    var rowEl = gpeByClass('ads_edit_geo_box_table_point_row', event.target);
                    var e = event.toElement || event.relatedTarget;
                    if (e && (e.parentNode == rowEl || e == rowEl)) {
                        return;
                    }
                    var pointID = rowEl.getAttribute('data-id');
                    boxGeoEditor.highlightPoint(pointID, false);
                }
            }.bind(this));

            setTimeout(function() {
                animate(tableWrap, {
                    scrollTop: tableWrap.scrollHeight
                });
            }, 0);

            this.criteria[criterionName].value = boxGeoEditor.savePointsToString();
            this.needDataUpdate();
        }.bind(this),
        onPointUpdated: function(oldPointID, point, changes) {
            var row = ge('ads_edit_geo_box_table_row_' + oldPointID, boxGeoEditor.box);
            if (!row) {
                return;
            }

            if (changes.id) {
                row.setAttribute('id', 'ads_edit_geo_box_table_row_' + point.id);
                row.setAttribute('data-id', point.id);
            }

            if (changes.caption) {
                geByClass1('ads_edit_geo_box_table_point_caption', row).innerHTML = point.caption;
            }
            if (changes.radius) {
                geByClass1('ads_edit_geo_place_radius_selector_text', row).innerHTML = this.formatGeoRadius(criterionName, point.radius);
            }
            if (changes.audience) {
                var audienceLabel;
                geByClass1('ads_edit_geo_box_table_point_reach', row).innerHTML = (point.audience !== undefined) ? boxGeoEditor.formatPointAudience(point.audience, point.audienceGeoNearOnly) : getProgressHtml();
            }

            if (changes.coords || changes.radius || changes.mask) {
                this.criteria[criterionName].value = boxGeoEditor.savePointsToString();
                this.needDataUpdate();
            }
        }.bind(this),
        onPointRemoved: function(pointID) {
            re('ads_edit_geo_box_table_row_' + pointID);

            if (boxGeoEditor.table_body.rows.length == 0) { // no rows remaining
                var row = boxGeoEditor.table_body.insertRow(0);
                var cell;

                cell = row.insertCell(0);
                cell.className = 'ads_edit_geo_box_table_row_span';
                cell.innerHTML = getLang('ads_geo_empty_table_span');
                cell.colSpan = 4;

                row.setAttribute('id', 'ads_edit_geo_box_table_row_span');
            }
        },
        onMapBoundsChanged: function(options) {
            if (!boxGeoEditor.ui) {
                return;
            }
            boxGeoEditor.ui.setURL(this.getUiCriterionData(criterionName, {
                mapCenter: boxGeoEditor.map.getCenter()
            }));

            if (options.newZoom != options.oldZoom) {
                this.updateGeoEditorDefaultRadius(criterionName, undefined, options.newZoom);
            }
        }.bind(this),
        onPointMarkerClicked: function(pointID) {
            var row = ge('ads_edit_geo_box_table_row_' + pointID);
            if (!row) {
                return;
            }
            animate(boxGeoEditor.table_wrap, {
                scrollTop: row.offsetTop - boxGeoEditor.table_wrap.clientHeight / 2 + boxGeoEditor.table_header.clientHeight
            });
            removeClass(row, 'long_transition');
            addClass(row, 'highlighted');
            setTimeout(function() {
                addClass(row, 'long_transition');
                removeClass(row, 'highlighted');
                setTimeout(removeClass.pbind(row, 'long_transition'), 2100);
            }, 1000);
        }.bind(this)
    });
}

AdsTargetingEditor.prototype.showGeoBox = function(criterionName, tab, geoEditorOptions) {
    var boxGeoEditor = this.criteria[criterionName].geo_editor.box_geo_editor;

    var ajaxParams = {
        selected: tab
    };

    var boxOptions = {};
    boxOptions.width = 1134;
    boxOptions.hideButtons = true;
    boxOptions.onShow = function() {
        cur.preventBoxHide = true;
    };
    boxOptions.onHide = function() {
        setTimeout(function() {
            if (boxQueue.count() > 1) {
                cur.preventBoxHide = false;
            }
        }, 1);

        this.criteria[criterionName].ui.clear();
        this.criteria[criterionName].geo_editor.setPointsFromArray(boxGeoEditor.points.slice(0));
    }.bind(this);
    boxOptions.onDestroy = function() {
        cur.preventBoxHide = false;
    };

    var showOptions = {};
    showOptions.params = boxOptions;
    showOptions.onDone = this.initGeoBox.bind(this, criterionName, geoEditorOptions);

    showBox('/adsedit?act=geo_box', ajaxParams, showOptions);

    return boxGeoEditor;
}

AdsTargetingEditor.prototype.initGeoEditor = function(criterionName, mapContainer) {
    if (!mapContainer) {
        try {
            console.error("Can't init geo editor without map container");
        } catch (e) {}
        return;
    }

    var geoEditor = new AdsGeoEditor();
    var geoEditorOptions = {
        defaultRadius: this.criteria[criterionName].default_radius,
        expandMapButton: true,
        allowedRadiuses: this.criteria[criterionName].allowed_radiuses,
        locale: this.criteria[criterionName].lngcode,
        defaultMask: this.criteria['geo_mask'].value,

        defaultMapCenter: {
            lat: this.criteria[criterionName].default_center[0],
            lon: this.criteria[criterionName].default_center[1]
        }
    };
    var boxGeoEditorOptions = {
        defaultRadius: this.criteria[criterionName].default_radius, // this will be overriden later by default radius from geo_editor
        allowedRadiuses: this.criteria[criterionName].allowed_radiuses,
        locale: this.criteria[criterionName].lngcode,
        defaultMask: this.criteria['geo_mask'].value,

        defaultMapCenter: {
            lat: this.criteria[criterionName].default_center[0],
            lon: this.criteria[criterionName].default_center[1]
        }
    };

    var geoEditorEvents = {};
    geoEditorEvents.onPointAdded = function(point) {
        var isGeoOnline = this.criteria.geo_mask.value == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE;
        var radiusSelector = isGeoOnline ? this.criteria[criterionName].radius_selector_online : this.criteria[criterionName].radius_selector;
        var el = this.criteria[criterionName].ui.addTagData([point.id, point.caption, '', 1, '', radiusSelector]);
        geByClass1('ads_edit_geo_place_radius_selector_text', el).innerHTML = this.formatGeoRadius(criterionName, point.radius);
        this.criteria[criterionName].ui.updateInput();

        this.onCriterionUpdate(criterionName, geoEditor.savePointsToString());
        this.restoreMapPosition(criterionName);

        this.needDataUpdate();
    }.bind(this);
    geoEditorEvents.onPointUpdated = function(oldPointID, point, changes) {
        var tokenEl = this.criteria[criterionName].ui.replaceTagID(oldPointID, point.id);

        if (changes.caption) {
            this.criteria[criterionName].ui.replaceTagText(point.id, point.caption);
        }

        if (changes.radius) {
            geByClass1('ads_edit_geo_place_radius_selector_text', tokenEl).innerHTML = this.formatGeoRadius(criterionName, point.radius);
        }

        this.onCriterionUpdate(criterionName, geoEditor.savePointsToString());
        this.restoreMapPosition(criterionName);

        if (changes.coords || changes.radius || changes.mask) {
            this.needDataUpdate();
        }
    }.bind(this);
    geoEditorEvents.onPointRemoved = function(pointID) {
        this.criteria[criterionName].ui.removeTagData(pointID);

        this.onCriterionUpdate(criterionName, geoEditor.savePointsToString());
        this.restoreMapPosition(criterionName);
    }.bind(this);
    geoEditorEvents.onLoaded = function() {
        geoEditor.setPointsFromString(this.criteria[criterionName].value);
        this.saveMapPosition(criterionName);

        addEvent(window, 'scroll', this.saveMapPosition.bind(this, criterionName));
    }.bind(this);
    geoEditorEvents.onExpandClick = this.showGeoBox.bind(this, criterionName, 'single', boxGeoEditorOptions);
    geoEditorEvents.onMapBoundsChanged = function(options) {
        this.updateUiCriterionData(criterionName);
        if (options.newZoom != options.oldZoom) {
            this.updateGeoEditorDefaultRadius(criterionName, undefined, options.newZoom);
        }
    }.bind(this);
    geoEditorEvents.onPointMarkerClicked = function(pointID) {
        this.criteria[criterionName].ui.highlightTag(pointID);
    }.bind(this);

    geoEditor.init(mapContainer, geoEditorOptions, geoEditorEvents);

    this.criteria[criterionName].geo_editor = geoEditor;
    geoEditor.box_geo_editor = new AdsGeoEditor();

    addEvent(gpeByClass('ads_edit_geo_radius_tt_container', this.criteria[criterionName].ui.container), 'click', function(event) {
        if (!hasClass(event.target, 'ui_actions_menu_item')) {
            return;
        }
        var newRadius = event.target.getAttribute('data-radius');
        var newRadiusLabel = event.target.innerHTML;
        var parentNode = gpeByClass('token', data(gpeByClass('ui_actions_menu_dummy_wrap', event.target), 'origMenu'));
        var radiusLabel = geByClass1('ads_edit_geo_place_radius_selector', parentNode);

        this.criteria[criterionName].geo_editor.setPointRadius(parentNode.getAttribute('data-id'), newRadius);
        this.criteria[criterionName].geo_editor.updateMap(parentNode.getAttribute('data-id'));

        this.updateGeoEditorDefaultRadius(criterionName, newRadius);
    }.bind(this));

    var geoButton = ge(this.options.targetIdPrefix + criterionName + '_button');
    addEvent(geoButton, 'click', this.showGeoBox.bind(this, criterionName, 'batch', boxGeoEditorOptions));
}

AdsTargetingEditor.prototype.formatGeoRadius = function(criterionName, radius) {
    var isGeoOnline = this.criteria.geo_mask.value == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE;
    var dataRadius = isGeoOnline ? this.criteria[criterionName].data_radius_online : this.criteria[criterionName].data_radius;
    for (var i = 0, row; row = dataRadius[i]; ++i) {
        if (radius == row[0]) {
            return row[1];
        }
    }
    return langNumeric(radius, '%s', true) + ' ' + getLang('ads_edit_ad_geo_radius_unit_meters');
}

AdsTargetingEditor.prototype.saveMapPosition = function(criterionName) {
    var mapContainer = ge(this.options.targetIdPrefix + criterionName + '_box');
    if (!mapContainer) {
        return;
    }

    var mapRect = mapContainer.getBoundingClientRect();
    if (!mapRect) {
        return;
    }

    this.criteria[criterionName].map_position_top = mapRect.top;
}

AdsTargetingEditor.prototype.restoreMapPosition = function(criterionName) {
    if (!this.criteria[criterionName].map_position_top) {
        return;
    }

    var mapContainer = ge(this.options.targetIdPrefix + criterionName + '_box');
    if (!mapContainer) {
        return;
    }

    var mapRect = mapContainer.getBoundingClientRect();
    if (!mapRect) {
        return;
    }

    var dy = this.criteria[criterionName].map_position_top - mapRect.top;
    scrollToY(scrollGetY() - dy, 0, 0, true);
}

AdsTargetingEditor.prototype.updateGeoPointsAudience = function(criterionName, audiences, audiencesGeoNearOnly) {
    var criterion = this.criteria[criterionName];
    if (!criterion.geo_editor) {
        return;
    }
    audiencesGeoNearOnly = audiencesGeoNearOnly || {};

    for (var pointID in audiences) {
        criterion.geo_editor.setPointAudience(pointID, audiences[pointID], audiencesGeoNearOnly[pointID]);
        if (criterion.geo_editor.box_geo_editor && criterion.geo_editor.box_geo_editor.inited) {
            criterion.geo_editor.box_geo_editor.setPointAudience(pointID, audiences[pointID], audiencesGeoNearOnly[pointID]);
        }
    }
}

AdsTargetingEditor.prototype.updateGeoEditorDefaultRadius = function(criterionName, lastSelectedRadius, lastMapZoom) {
    if (lastSelectedRadius === undefined && lastMapZoom === undefined) {
        return;
    }
    var geoEditor = this.criteria[criterionName].geo_editor;
    if (!geoEditor || !geoEditor.inited) {
        return;
    }

    var mask = this.criteria['geo_mask'].value;
    var isOnline = (mask == AdsEdit.ADS_GEO_CIRCLE_TYPE_MASK_ONLINE);

    if (lastMapZoom !== undefined && !geoEditor.manually_changed_radius && !isOnline) {
        var maxZoom = -1;
        for (var zoom in this.criteria[criterionName].zoom_radius_map) {
            zoom = parseInt(zoom);
            if (lastMapZoom >= zoom && zoom > maxZoom) {
                lastSelectedRadius = this.criteria[criterionName].zoom_radius_map[zoom];
                maxZoom = zoom;
            }
        }
    } else {
        geoEditor.manually_changed_radius = true;
    }

    if (!lastSelectedRadius) {
        return;
    }

    var boxGeoEditor = geoEditor.box_geo_editor;
    if (boxGeoEditor && boxGeoEditor.inited) {
        boxGeoEditor.options.defaultRadius = lastSelectedRadius;
        if (boxGeoEditor.ui) {
            boxGeoEditor.ui.setURL(this.getUiCriterionData(criterionName, {
                mapCenter: boxGeoEditor.map.getCenter()
            }));
        }
    }

    geoEditor.options.defaultRadius = lastSelectedRadius;
    this.updateUiCriterionData(criterionName);
}

AdsTargetingEditor.prototype.eventsRetargetingGroupsAdd = function(container, template, audienceSelected, eventsSelected) {
    // fallback for old format
    if (eventsSelected && isString(eventsSelected) && eventsSelected.indexOf('+') != -1) {
        var eventsSelected_ = [];
        each(eventsSelected.split(','), function(k, v) {
            eventsSelected_.push(Math.min.apply(null, v.split('+')));
        });
        eventsSelected = eventsSelected_.join(',');
    }

    var newAudience = domFC(se(template));
    container.appendChild(newAudience);

    var targetRulesElem = geByClass1('ads_edit_value_events_retargeting_groups_row_rules', newAudience);
    targetRulesElem.removeAttribute('autocomplete');

    var targetAudienceElem = geByClass1('ads_edit_value_events_retargeting_groups_row_selector', newAudience);
    targetAudienceElem.removeAttribute('autocomplete');

    var targetAudienceNameRowElem = geByClass1('ads_edit_events_retargeting_groups_row_name', newAudience);
    var targetAudienceNameElem = geByClass1('ads_edit_value_events_retargeting_groups_row_name', targetAudienceNameRowElem);

    var criterionName = 'events_retargeting_groups';

    var uiAudienceSelector = new Dropdown(targetAudienceElem, this.getUiCriterionData(criterionName), {
        selectedItem: audienceSelected,
        introText: this.getUiCriterionIntroText(criterionName),
        placeholder: this.getUiCriterionPlaceholderText(criterionName),
        autocomplete: true,
        big: true,
        width: this.options.uiWidth,
        height: this.options.uiHeight,
        onChange: function(value) {
            var toBeShowed = (value === "0");
            toggle(targetAudienceNameRowElem, toBeShowed);
            if (toBeShowed) {
                setTimeout(elfocus.pbind(targetAudienceNameElem), 0);
            }

            this.eventsRetargetingGroupsUpdateValue(criterionName);
        }.bind(this)
    });
    this.cur.destroy.push(function() {
        uiAudienceSelector.destroy();
    }.bind(this));

    var formatType = this.viewEditor.params.format_type.value;
    var promotedPostKludgesHave = this.viewEditor.getLinkPromotedPostKludgesHave();

    var dataRules = [];
    if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST) {
        dataRules = promotedPostKludgesHave.video_ads_autoplay ? this.criteria[criterionName].data_rules_promoted_posts_video : this.criteria[criterionName].data_rules_promoted_posts;
    } else if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) {
        dataRules = this.criteria[criterionName].data_rules_adaptive_ads;
    } else if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_STORY) {
        dataRules = this.criteria[criterionName].data_rules_stories;
    }

    var uiRulesSelector = new Selector(targetRulesElem, dataRules, {
        selectedItems: eventsSelected,

        introText: getLang('ads_criteria_save_audience_select_rules'),
        placeholder: getLang('ads_criteria_save_audience_select_rules'),
        nativePlaceholder: false,
        hidePlaceholderOnSelected: true,
        noResult: this.getUiCriterionNoResultText(criterionName),
        disabledText: this.getUiCriterionDisabledText(criterionName),

        dropdown: true,
        listStyle: false,
        limitedListHeight: false,
        selectable: true,
        big: true,
        withIcons: false,
        maxItems: this.options.uiMaxSelected,
        width: this.options.uiWidth,
        height: this.options.uiHeight,
        selectedItemsDelimiter: ',',

        onChange: function(value) {
            this.eventsRetargetingGroupsUpdateValue(criterionName);
        }.bind(this)
    });
    this.cur.destroy.push(function() {
        uiRulesSelector.destroy();
    }.bind(this));

    addEvent(targetAudienceNameElem, 'change', function() {
        this.eventsRetargetingGroupsUpdateValue(criterionName);
    }.bind(this));

    this.criteria[criterionName].ui.push([uiAudienceSelector, targetAudienceNameElem, uiRulesSelector]);

    addEvent(geByClass1('ads_edit_value_events_retargeting_groups_row_remove', newAudience), 'click', function() {
        uiAudienceSelector.destroy();
        uiRulesSelector.destroy();
        re(newAudience);

        this.eventsRetargetingGroupsUpdateValue(criterionName);
    }.bind(this));

    this.eventsRetargetingGroupsUpdateValue(criterionName);
}

AdsTargetingEditor.prototype.eventsRetargetingGroupsUpdateValue = function(criterionName) {
    var values = [];
    each(this.criteria[criterionName].ui, function(k, v) {
        var uiAudienceSelector = v[0];
        var targetAudienceNameElem = v[1];
        var uiRulesSelector = v[2];

        if (uiAudienceSelector.destroyed || uiRulesSelector.destroyed) {
            return;
        }

        var audienceName = val(targetAudienceNameElem);
        values.push([uiAudienceSelector.val(), uiRulesSelector.val(), audienceName].join(';;'));
    });

    this.onUiChange(criterionName, values.join('||'));
}

AdsTargetingEditor.prototype.eventsRetargetingGroupsUpdateRules = function(criterionName) {

    var formatType = this.viewEditor.params.format_type.value;
    var promotedPostKludgesHave = this.viewEditor.getLinkPromotedPostKludgesHave();

    var dataRules = [];
    if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_PROMOTED_POST) {
        dataRules = promotedPostKludgesHave.video_ads_autoplay ? this.criteria[criterionName].data_rules_promoted_posts_video : this.criteria[criterionName].data_rules_promoted_posts;
    } else if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_ADAPTIVE_AD) {
        dataRules = this.criteria[criterionName].data_rules_adaptive_ads;
    } else if (formatType == AdsEdit.ADS_AD_FORMAT_TYPE_STORY) {
        dataRules = this.criteria[criterionName].data_rules_stories;
    }

    if (!this.criteria[criterionName].ui) {
        return;
    }

    each(this.criteria[criterionName].ui, function(k, v) {
        var uiRulesSelector = v[2];

        if (uiRulesSelector.destroyed) {
            return;
        }

        uiRulesSelector.setData(dataRules);
        uiRulesSelector.currenDataItems = dataRules;
        uiRulesSelector.setOptions({
            defaultItems: dataRules
        });
    });
}

try {
    stManager.done('ads_edit.js');
} catch (e) {}