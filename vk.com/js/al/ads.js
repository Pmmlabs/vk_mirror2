var Ads = {};

Ads.init = function() {
    cur.module = 'ads';
    showBackLink();
    Ads.processNotices();
}

Ads.initOfficesMenu = function(event) {

    if (!window.DropdownMenu || !cur.mainNavigationOfficesItems) {
        return;
    }

    if (cur.navigationOficesMenu) {
        return;
    }

    ge('ads_navigation_offices_menu').removeAttribute('onmouseover');

    function hideMenu() {
        cur.navigationOficesMenu.hide();
    }

    var realLocation = '';
    if (location.hash.indexOf('#/') != -1 || location.hash.indexOf('#!') != -1) {
        realLocation = location.hash.replace('#/', '').replace('#!', '');
    } else {
        realLocation = location.pathname + location.search;
    }

    var unionId;
    var unionIdReal;
    var unionIdParam = '';
    var curItems = [];
    for (var i in cur.mainNavigationOfficesItems) {
        curItems[i] = {};
        curItems[i].onClick = hideMenu;
        for (var j in cur.mainNavigationOfficesItems[i]) {
            curItems[i][j] = cur.mainNavigationOfficesItems[i][j];
        }
        if (curItems[i].i == 'all') {
            curItems[i].h = "/ads?act=offices_list";
        } else {
            unionId = '';
            unionIdReal = intval(curItems[i].i);
            unionIdParam = '';
            if (curItems[i].i.indexOf('default') == -1) {
                unionId = unionIdReal;
                unionIdParam = "&union_id=" + unionIdReal;
            }

            var link = "/ads?act=office" + unionIdParam;
            if (!unionIdReal) {
                link = "/ads?act=no_office";
            } else if (cur.getOfficeLink) {
                link = cur.getOfficeLink(unionId);
            } else if (realLocation.match(/act=budget(&|$)/)) {
                link = "/ads?act=budget" + unionIdParam;
            } else if (realLocation.match(/act=export_stats(&|$)/)) {
                link = "/ads?act=export_stats" + unionIdParam;
            } else if (realLocation.match(/act=settings(&|$)/)) {
                link = "/ads?act=settings" + unionIdParam;
            }

            curItems[i].h = link;
        }
    }

    var options = {
        title: '<span id="ads_navigation_dd_menu_header_text">' + ge('ads_navigation_offices_menu_text').innerHTML + '</span>',
        containerClass: 'ads_navigation_dd_menu_header_wrap',
        target: ge('ads_navigation_offices_menu'),
        showHover: false,
        updateTarget: false,
        onSelect: function(e) {}
    };
    cur.navigationOficesMenu = new DropdownMenu(curItems, options);
    cur.destroy.push(function() {
        cur.navigationOficesMenu.destroy();
    });
}

Ads.lock = function(lockKey, onLock, onUnlock) {
    if (!cur.locks) {
        cur.locks = {};
    }
    if (cur.locks[lockKey]) {
        return false;
    }
    cur.locks[lockKey] = {
        onLock: onLock,
        onUnlock: onUnlock
    };
    if (isFunction(cur.locks[lockKey].onLock)) {
        cur.locks[lockKey].onLock();
    }
    return true;
}

Ads.unlock = function(lockKey) {
    if (!cur.locks) {
        cur.locks = {};
    }
    if (cur.locks[lockKey] && isFunction(cur.locks[lockKey].onUnlock)) {
        cur.locks[lockKey].onUnlock();
    }
    delete cur.locks[lockKey];
}

Ads.simpleAjax = function(url, elem) {
    if (elem) {
        var elemRect = elem.getBoundingClientRect();
        var imgTop = (elemRect.bottom - elemRect.top - 8) / 2;
        var span = ce('span', {}, {
            position: 'relative'
        })
        var img = ce('img', {
            src: '/images/upload.gif'
        }, {
            position: 'absolute',
            top: imgTop + 'px'
        });
        span.appendChild(img);
        elem.appendChild(span);
    }

    ajax.post(url, {}, {
        onDone: onComplete,
        onFail: onComplete
    });

    function onComplete(response) {
        if (elem) {
            elem.removeChild(span);
        }
        if (response && response.html) {
            var boxOptions = {};
            boxOptions.title = '���������';
            boxOptions.onHide = nav.reload;
            showFastBox(boxOptions, response.html);
        } else {
            nav.reload();
        }
        return true;
    }
}

Ads.escapeValue = function(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

Ads.onInputEvent = function(event, func) {
    if (event.keyCode == KEY.RETURN) {
        func();
        return false;
    }
    return true;
}

Ads.onSubLinkEvent = function(event) {
    event = normEvent(event);
    var elem = event.target
    var newLink = elem.getAttribute('href_');
    if (!newLink) {
        return;
    }
    var linkElem = elem;
    while (linkElem && linkElem.nodeName !== 'A') {
        linkElem = linkElem.parentNode;
    }
    if (!linkElem) {
        return;
    }
    if (event.type === 'mouseover') {
        elem.setAttribute('href_old', linkElem.href);
        linkElem.href = newLink;
    } else if (event.type === 'mouseout') {
        var oldLink = elem.getAttribute('href_old');
        if (oldLink) {
            linkElem.href = oldLink;
        } else {
            linkElem.removeAttribute('href');
        }
    }
}

Ads.onBoxFail = function(message) {
    if (!message) {
        message = getLang('global_unknown_error');
    }
    setTimeout(function() {
        showFastBox(getLang('ads_error_box_title'), message);
    }, 1);
    return true;
}

Ads.setLoginHandlers = function(onLoginDoneNew, onLoginFailedNew) {
    var restoreOnLoginDone = function(handler) {
        if (cur.onLoginDoneWindowOld && window.onLoginDone == handler) {
            window.onLoginDone = cur.onLoginDoneWindowOld;
            delete cur.onLoginDoneWindowOld;
        }
    }
    var restoreOnLoginFailed = function(handler) {
        if (cur.onLoginFailedWindowOld && window.onLoginFailed == handler) {
            window.onLoginFailed = cur.onLoginFailedWindowOld;
            delete cur.onLoginFailedWindowOld;
        }
    }

    if (onLoginDoneNew) {
        if (window.onLoginDone != onLoginDoneNew) {
            cur.onLoginDoneWindowOld = window.onLoginDone;
            window.onLoginDone = onLoginDoneNew;
            cur.destroy.push(restoreOnLoginDone.pbind(onLoginDoneNew));
        }
    } else {
        restoreOnLoginDone(window.onLoginDone);
    }

    if (onLoginFailedNew) {
        if (window.onLoginFailed != onLoginFailedNew) {
            cur.onLoginFailedWindowOld = window.onLoginFailed;
            window.onLoginFailed = onLoginFailedNew;
            cur.destroy.push(restoreOnLoginFailed.pbind(onLoginFailedNew));
        }
    } else {
        restoreOnLoginFailed(window.onLoginFailed);
    }
}

Ads.scrollToError = function(errorElem) {
    errorElem = ge(errorElem);
    var scrollY = scrollGetY();
    var errorY = getXY(errorElem)[1];
    if (errorY < scrollY || errorY > (scrollY + lastWindowHeight / 2)) {
        errorY -= 15;
        scrollToY(errorY);
    }
}

Ads.onFormEdit = function() {
    if (window.wkcur) {
        wkcur.noClickHide = true;
    }
}

Ads.processNotices = function() {
    var noticeElems = geByClass('ads_notice_important');
    for (var i in noticeElems) {
        animate(noticeElems[i], {
            backgroundColor: '#F6F7F9',
            borderColor: '#D8DFEA'
        }, 6000);
    }
}

Ads.initFixed = function(elemWrap) {
    elemWrap = ge(elemWrap);
    if (!elemWrap) return;
    var elemFixed = elemWrap.firstChild;
    if (!elemFixed) return;

    var inited = elemWrap.getAttribute('fixed_inited');
    var positionTop = 66;

    if (inited) {
        setStyle(elemWrap, {
            width: '',
            height: ''
        });
        setStyle(elemFixed, {
            position: 'static',
            top: 'auto',
            left: 'auto'
        });
    }
    var elemWrapSize = getSize(elemWrap);
    if (!elemWrapSize[0] || !elemWrapSize[1]) return;
    setStyle(elemWrap, {
        width: elemWrapSize[0] + 'px',
        height: elemWrapSize[1] + 'px'
    });

    elemWrap.setAttribute('fixed_inited', 1);

    if (!inited) {
        var scrolledNode = browser.msie6 ? pageNode : window;
        addEvent(scrolledNode, 'scroll', onScroll);
        cur.destroy.push(function() {
            removeEvent(scrolledNode, 'scroll', onScroll);
        });
    }

    onScroll();

    function onScroll() {
        var elemWrapXY = getXY(elemWrap);
        var scrollY = scrollGetY();
        if (scrollY + positionTop < elemWrapXY[1]) {
            setStyle(elemFixed, {
                position: 'static',
                top: 'auto',
                left: 'auto'
            });
        } else {
            setStyle(elemFixed, {
                position: 'fixed',
                top: positionTop,
                left: elemWrapXY[0]
            });
        }
    }
}

Ads.initIntroPage = function(widgetParamsMore) {
    var widgetHeight = 332;
    var subsectionsEl = ge('ads_intro_subsections');
    if (subsectionsEl) {
        var subsectionsElSize = getSize(subsectionsEl);
        var wrapperHeight = subsectionsElSize[1] - ge('ads_intro_news_widget').offsetTop;
        widgetHeight = wrapperHeight + 13 + 1; // widget bottom padding = 13, + 1 px safe zone
        ge('ads_intro_news_widget_wrap').style.height = wrapperHeight + 'px';
    }

    var widgetParams = {}
    widgetParams.mode = 2;
    widgetParams.width = 314;
    widgetParams.height = widgetHeight;
    widgetParams.no_head = 1;
    widgetParams.base_domain = '//' + window.location.hostname + '/';
    widgetParams.color1 = '#FFFFFF';
    extend(widgetParams, widgetParamsMore);
    VK.Widgets.Group('ads_intro_news_widget', widgetParams, 19542789);

    var emailInput = ge('ads_mobile_intro_email');
    cur.subscribeMobileLaunch = function(event) {
        if (!Ads.lock('subscribe_mobile_launch', function() {
                lockButton(ge('ads_mobile_intro_subscribe_button'));
            }, function() {
                unlockButton(ge('ads_mobile_intro_subscribe_button'));
            })) {
            return false;
        }

        if (!emailInput) {
            return;
        }
        var email = emailInput.value;
        var hash = cur.subscribeMobileLaunchHash;
        ajax.post('/ads?act=a_subscribe_mobile_launch', {
            email: email,
            hash: hash
        }, {
            onDone: function(msg) {
                showWiki({
                    w: 'ads_mobile_launch_verify'
                }, false, event, {
                    noLocChange: true
                });
                emailInput.setAttribute('disabled', 'disabled');
                addClass(emailInput, 'disabled');
                ge('ads_mobile_intro_subscribe_button').setAttribute('disabled', 'disabled');
                addClass(ge('ads_mobile_intro_subscribe_button'), 'button_disabled');
            },
            onFail: function(err) {
                if (err) {
                    showFastBox(getLang('ads_error_box_title'), err);
                } else {
                    showFastBox(getLang('ads_error_box_title'), getLang('ads_error_box_title'));
                }
                return true;
            },
            showProgress: function() {
                emailInput.setAttribute('disabled', 'disabled');
            },
            hideProgress: function() {
                emailInput.removeAttribute('disabled');
                Ads.unlock('subscribe_mobile_launch');
            }
        });
    };
}

Ads.showIntroBox = function(section, event) {
    showBox(
        'ads.php', {
            act: 'w_ads_intro_' + section
        }, {
            params: {
                grey: true,
                width: 638,
                hideButtons: true
            }
        },
        event);
    return false;
}

Ads.showAnnouncementVideoBox = function(title, player_link, title_link) {
    var content = '<iframe frameborder="0" src="' + player_link + '" style="width:720px;height:405px;" allowfullscreen></iframe>';
    if (title_link) {
        title = '<a href="' + title_link + '" target="_blank">' + title + '</a>';
    }
    showFastBox({
        title: title,
        containerClass: "ads_announcement_video_box",
        width: 720,
        hideButtons: true,
        animSpeed: 300,
        onShow: function() {
            setStyle(window.boxLayerBG, 'opacity', 0.8);
        },
        onHide: function() {
            setStyle(window.boxLayerBG, 'opacity', '');
        }
    }, content);
}

//////////////////////////////////////////////////////////////////////
// OLD
//////////////////////////////////////////////////////////////////////

Ads.updateUnionName = function(unionId, unionName) {
    var elemsTitle = geByClass('title_union_name_' + unionId);
    for (var i in elemsTitle) {
        elemsTitle[i].innerHTML = Ads.escapeValue(unionName);
    }

    var elemNavigation = ge('ads_navigation_union_' + unionId);
    if (elemNavigation) {
        unionName = replaceEntities(unionName);
        unionName = (unionName.length > 40 ? unionName.substr(0, 40) + '...' : unionName);
        elemNavigation.innerHTML = Ads.escapeValue(unionName);
    }

    var elemGeneralInfoHeader = ge('general_info_header_name_' + unionId);
    if (elemGeneralInfoHeader) {
        elemGeneralInfoHeader.innerHTML = Ads.escapeValue(unionName);
    }
}

Ads.openUnionsGeneralInfoBox = function(unionId, params) {
    var ajaxParams = {};
    ajaxParams.union_id = unionId;
    var showOptions = {
        params: params.options || {}
    };
    delete params.options;
    ajaxParams = extend({}, ajaxParams, params);

    showOptions.onFail = Ads.onBoxFail;
    showOptions.params.width = params.from_exchange ? 315 : 300;

    showBox('/ads?act=a_unions_general_info_box', ajaxParams, showOptions);
}

Ads.openUnionCreateBox = function(unionId) {
    var ajaxParams = {}
    ajaxParams.union_id = unionId;

    var showOptions = {
        params: {}
    };
    showOptions.onFail = Ads.onBoxFail;
    showOptions.params.width = 250;

    showBox('/ads?act=a_union_create_box', ajaxParams, showOptions);
}

Ads.openDeleteUnionBox = function(unionType, unionId, hash, lock, unlock, updateStatus, newclass) {
    var boxTitle = '';
    var boxContent = '';
    switch (unionType) {
        case 'ad':
            boxTitle = getLang('ads_archive_box_ad_title');
            boxContent = getLang('ads_archive_box_ad_warning');
            break;
        case 'campaign':
            boxTitle = getLang('ads_archive_box_campaign_title');
            boxContent = getLang('ads_archive_box_campaign_warning');
            break;
        case 'client':
            boxTitle = getLang('ads_archive_box_client_title');
            boxContent = getLang('ads_archive_box_client_warning');
            break;
    }

    var boxOptions = {};
    boxOptions.title = boxTitle;
    boxOptions.bodyStyle = 'line-height: 160%;';

    cur.deleteConfirmBox = new MessageBox();
    cur.deleteConfirmBox.setOptions(boxOptions);
    cur.deleteConfirmBox.content(boxContent);
    cur.deleteConfirmBox.removeButtons();
    cur.deleteConfirmBox.addButton(getLang('box_cancel'), false, 'no');
    cur.deleteConfirmBox.addButton(getLang('ads_archive_box_action'), function() {
        Ads.deleteUnion(unionType, unionId, hash, lock, unlock, updateStatus, newclass);
    });
    cur.deleteConfirmBox.setControlsText('<img id="delete_union_progress" src="/images/upload.gif" style="top: 1px; display: none;">');
    cur.deleteConfirmBox.show();
}

Ads.deleteUnion = function(unionType, unionId, hash, lock, unlock, updateStatus, newclass) {
    if (!lockDeletion()) {
        return;
    }
    var completeMessage = '';
    switch (unionType) {
        case 'ad':
            completeMessage = getLang('ads_archive_box_ad_complete');
            break;
        case 'campaign':
            completeMessage = getLang('ads_archive_box_campaign_complete');
            break;
        case 'client':
            completeMessage = getLang('ads_archive_box_client_complete');
            break;
    }
    var requestsCount = 0;
    var firstRequestedUnions = unionId.toString().split(',');
    var firstRequestedHashes = hash.toString().split(',');
    var lastRequestedUnions;

    performRequest(unionId, hash);

    function performRequest(unionId, hash, continueHash) {
        var ajaxParams = {};
        ajaxParams.union_id = unionId;
        ajaxParams.hash = hash;
        if (newclass) ajaxParams.newclass = 1;
        if (continueHash) ajaxParams.continue_hash = continueHash;

        lastRequestedUnions = unionId.toString().split(',');
        ajax.post('/ads?act=a_union_delete', ajaxParams, {
            onDone: onRequestComplete,
            onFail: onRequestComplete
        });
        requestsCount++;
    }

    function onRequestComplete(response) {
        var lastError = false;
        var lastMessage = false;
        var needContinue = [];
        if (isArray(response)) {
            each(response, function(i, r) {
                // Retry if not fully complete
                if (r.timelimit) {
                    needContinue.push([lastRequestedUnions[i], r.continueHash]);
                } else {
                    if (!isObject(r) || r.error) {
                        lastError = isObject(r) ? r.error : getLang('ads_error_unexpected_error_try_later');
                    } else {
                        if (updateStatus) {
                            if (newclass != 2) { // updateStatus with newclass=2 handle multiple responses, otherwise call for each sub-response
                                updateStatus(r.status, r.status_class, r.status_type, r.status_variants);
                            }
                        } else {
                            lastMessage = completeMessage;
                        }
                    }
                }
            });
            if (newclass == 2 && updateStatus) {
                // Prepare responses array for updateStatus with nulled unions which needs to be continued
                var statuses = [];
                each(firstRequestedUnions, function(i, union) {
                    var idx = lastRequestedUnions.indexOf(union);
                    statuses[i] = ((idx === -1 || response[idx].timelimit) ? null : response[idx]);
                });
                updateStatus(statuses);
            }
        }
        if (needContinue.length && requestsCount < 5000) {
            // resend request with left unions
            var newUnions = [];
            var newHashes = [];
            var continueHashes = [];
            each(needContinue, function(i, item) {
                var union = item[0];
                var idx = firstRequestedUnions.indexOf(union);
                if (idx === -1) {
                    console.log('bad union', union, firstRequestedUnions, lastRequestedUnions);
                } else {
                    newUnions.push(union);
                    newHashes.push(firstRequestedHashes[idx]);
                    continueHashes.push(item[1]);
                }
            });
            performRequest(newUnions.join(','), newHashes.join(','), continueHashes.join(','));
        } else {
            if (lastError) {
                showMessage(lastError);
            } else if (lastMessage) {
                showMessage(lastMessage, true, function() {
                    nav.reload();
                }, unionType);
            }
            unlockDeletion();
        }
        return true;
    }

    function showMessage(message, isSuccess, onHide, unionType) {
        var boxTitle = '';
        switch (unionType) {
            case 'ad':
                boxTitle = getLang('ads_archive_box_ad_title');
                break;
            case 'campaign':
                boxTitle = getLang('ads_archive_box_campaign_title');
                break;
            case 'client':
                boxTitle = getLang('ads_archive_box_client_title');
                break;
        }

        var boxOptions = {};
        boxOptions.title = (isSuccess ? boxTitle : '������');
        boxOptions.width = 350;
        boxOptions.onHide = onHide;
        showFastBox(boxOptions, message);
    }

    function lockDeletion() {
        if (lock) {
            if (!lock()) {
                return false;
            }
            cur.deleteConfirmBox.hide();
        } else {
            if (cur.deleteUnionLocked) {
                return false;
            }
            cur.deleteUnionLocked = true;
            show('delete_union_progress');
        }
        return true;
    }

    function unlockDeletion() {
        if (unlock) {
            unlock()
        } else {
            cur.deleteUnionLocked = false;
            hide('delete_union_progress');
        }
    }
}

Ads.openHelpBox = function(type, unionId) {
    var ajaxParams = {}
    ajaxParams.type = type;
    ajaxParams.union_id = unionId;

    var showOptions = {
        params: {}
    };
    showOptions.onFail = Ads.onBoxFail;
    showOptions.cache = 1;
    showOptions.params.width = 450;

    showBox('/ads?act=a_help_text', ajaxParams, showOptions);
}

Ads.openCreateOfficeBox = function() {
    var ajaxParams = {};

    var showOptions = {
        params: {}
    };
    showOptions.onFail = Ads.onBoxFail;
    showOptions.params.width = 350;

    showBox('/ads?act=a_create_office_box', ajaxParams, showOptions);
}

Ads.createExportSubmitButton = function(elem, bindingId, topUnionId) {
    var postIframe = ce((browser.msie && browser.version < 9.0) ? '<iframe name="secret_iframe">' : 'iframe', {
        name: 'secret_iframe',
        id: 'secret_iframe'
    });
    postIframe.style.display = 'none';
    document.body.appendChild(postIframe);

    function showExportFastBoxDataEmpty(e) {
        if (e.data === 'ads_target_export_data_empty') {
            var box = new showFastBox(getLang("ads_export_stat_error_box_title_no_data"), getLang("ads_error_export_stat_period_no_data"));
        }
    }

    addEvent(window, 'message', showExportFastBoxDataEmpty);

    if (cur && cur.destroy) {
        cur.destroy.push(function() {
            removeEvent(window, 'message', showExportFastBoxDataEmpty);
        });
    }

    var topUnionIdParam = (topUnionId ? '&union_id=' + topUnionId : '');
    var postForm = ce('form', {
        method: 'post',
        action: '/ads?act=get_export_stats' + topUnionIdParam,
        target: 'secret_iframe'
    });
    document.body.appendChild(postForm);
    var valueNames = [
        'group_time',
        'group_ads',
        'group_ads_promoted',
        'method',
        'stats_type',
        'from_day',
        'from_month',
        'from_year',
        'to_day',
        'to_month',
        'to_year',
        'Ids',
        'offices',
        'offices_list',
        'ads_types'
    ];
    var valueContainers = {};
    for (var i = 0; i < valueNames.length; i++) {
        var curName = valueNames[i];
        valueContainers[curName] = ce('input', {
            type: 'hidden',
            id: curName + '_container_' + bindingId,
            name: curName
        });
        postForm.appendChild(valueContainers[curName]);
    }

    var errorBox;
    var action = function() {
        var postData = {},
            elem, day, val, curClientId;
        elem = geByClass('grouping_time_' + bindingId)[0];
        if (!elem) return;
        valueContainers.group_time.value = elem.getIndex();

        elem = geByClass('grouping_ads_' + bindingId)[0];
        if (!elem) return;
        valueContainers.group_ads.value = elem.getIndex();

        elem = geByClass('grouping_ads_promoted_' + bindingId)[0];
        if (!elem) return;
        valueContainers.group_ads_promoted.value = elem.getIndex();

        elem = geByClass1('client_choose_row_' + bindingId);
        if (elem && elem.uiDropdown) {
            curClientId = parseInt(elem.uiDropdown.val(), 10);
            if (!curClientId) {
                curClientId = 'aca';
            }
        }

        elem = geByClass('export_method_' + bindingId)[0];
        if (!elem) return;
        valueContainers.method.value = elem.getIndex();
        if (valueContainers.method.value == 3 /*Web-interface*/ ) {
            postForm.target = '';
        }

        elem = geByClass('stats_type_' + bindingId)[0];
        if (!elem) return;
        valueContainers.stats_type.value = elem.getIndex();

        day = cur.exportParamsData.start_time;
        valueContainers.from_day.value = day.day;
        valueContainers.from_month.value = day.month;
        valueContainers.from_year.value = day.year;

        day = cur.exportParamsData.stop_time;
        valueContainers.to_day.value = day.day;
        valueContainers.to_month.value = day.month;
        valueContainers.to_year.value = day.year;

        elem = geByClass('offices_' + bindingId)[0];
        if (elem) {
            valueContainers.offices.value = elem.getIndex();
            valueContainers.offices_list.value = cur.offices_list ? cur.offices_list.replace(/\t/g, ';') : '';
        }

        var isPromotedPosts = false;
        elem = geByClass('ads_types_' + bindingId)[0];
        if (elem) {
            val = elem.getIndex();
            isPromotedPosts = val == 1;
            valueContainers.ads_types.value = val;
        }

        if ((new Date(valueContainers.to_year.value, valueContainers.to_month.value, valueContainers.to_day.value)) <
            (new Date(valueContainers.from_year.value, valueContainers.from_month.value, valueContainers.from_day.value))) {
            showFastBox(getLang('ads_error_box_title'), getLang('ads_error_export_stat_invalid_period'));
            return;
        }

        var ids;
        if (isPromotedPosts) {
            ids = getTableSelectedIds_promoted(parseInt(valueContainers.group_ads_promoted.value), curClientId);
        } else {
            ids = getTableSelectedIds(parseInt(valueContainers.group_ads.value), curClientId);
        }

        if (ids.length === 0) {
            showFastBox(getLang('ads_error_box_title'), getLang('ads_error_export_stat_no_campaigns_selected'));
            return;
        }

        valueContainers.Ids.value = '' + ids.join(',');

        postForm.submit();
    };

    function getTableSelectedIds(groupAdsMode, curClientId) {
        var ids = [];

        elem = ge('paginated_table');
        var pt = elem.tableObj;
        var selection = pt.getSelection(0);
        switch (groupAdsMode) {
            case 0:
                ids.push(elem.topId);
                break;
            case 1:
                for (var j = 0; j < selection.length; j++) {
                    var clId = pt.content.extra['union_id'][selection[j]];
                    ids.push(clId);
                }
                break;
            case 2:
                if (curClientId == 'aca') {
                    ids.push('aca');
                } else {
                    for (var i = 0; i < selection.length; i++) {
                        ids.push(pt.content.extra['union_id'][selection[i]]);
                    }
                }
                break;
            case 3:
                for (var i = 0; i < selection.length; i++) {
                    ids.push(pt.content.extra['union_id'][selection[i]]);
                }
                break;
        }

        return ids;
    }

    function getTableSelectedIds_promoted(groupAdsPromotedMode, curClientId) {
        var ids = [];

        elem = ge('paginated_table');
        var pt = elem.tableObj;
        var selection = pt.getSelection(0);
        switch (groupAdsPromotedMode) {
            case 2:
            case 3:
                if (curClientId == 'aca') {
                    ids.push('aca');
                } else {
                    for (var i = 0; i < selection.length; i++) {
                        ids.push(pt.content.extra['union_id'][selection[i]]);
                    }
                }
                break;
            case 0:
            case 1:
                for (var i = 0; i < selection.length; i++) {
                    ids.push(pt.content.extra['union_id'][selection[i]]);
                }
                break;
        }

        return ids;
    }

    createButton(elem, action);
}

Ads.createStaticDatePicker = function(elem, bindingId, classid, defaultDate, mode) {
    elem = ge(elem);
    if (classid) elem.className = classid + '_' + bindingId;

    var spanDay = ce('span', {
            id: elem.id + '_day'
        }),
        spanMonth = ce('span', {
            id: elem.id + '_month'
        });

    if (!cur.exportParamsData) {
        cur.exportParamsData = {};
    }
    cur.exportParamsData[classid] = defaultDate;
    if (mode === undefined) {
        mode = 'd';
    }

    var params = {
        mode: mode,
        day: defaultDate.day,
        month: defaultDate.month,
        year: defaultDate.year,
        width: 155,
        pastActive: true,
        onUpdate: function(d, m) {
            if (m == 'h') {
                cur.exportParamsData[classid].day = defaultDate.day;
                cur.exportParamsData[classid].month = defaultDate.month;
                cur.exportParamsData[classid].year = defaultDate.year;
                return;
            }
            if (m == 'd') {
                cur.exportParamsData[classid].day = d.d;
            } else if (m == 'm') {
                cur.exportParamsData[classid].day = 1;
            }
            cur.exportParamsData[classid].month = d.m;
            cur.exportParamsData[classid].year = d.y;
        }
    };

    if (!cur.exportUi) {
        cur.exportUi = {};
    }
    cur.exportUi[classid] = new Datepicker(elem, params);
}

Ads.openInnerTable = function(id, bindingId) {
    if (!id) id = 'acl';

    var tab = ge('paginated_table');

    var newOptions;
    switch (id) {
        case 'cli':
            newOptions = tab.optionsDep['cli'];
            break;
        case 'aca':
        case 'acl':
            newOptions = tab.optionsDep['default'];
            break;
        case 'cam':
            newOptions = tab.optionsDep['cam'];
            break;
        case 'cam_pp':
            newOptions = tab.optionsDep['cam_pp'];
            break;
        case 'cam_pp_rs':
            newOptions = tab.optionsDep['cam_pp_rs'];
            break;
        default:
            newOptions = tab.optionsDep['cam'];
            break;
    }

    if (id in tab.contentDep && tab.contentDep[id]) {
        var newContent = tab.contentDep[id];
        tab.tableObj.setOptions(newOptions);
        tab.tableObj.setContent(newContent);
        tab.tableObj.applyData();
    } else {
        function onDone(data) {
            var newContent = data;
            tab.contentDep[id] = newContent;
            tab.tableObj.setOptions(newOptions);
            tab.tableObj.setContent(newContent);
            tab.tableObj.applyData();
            hideProgress('getting_campaigns_progress');
        }

        function onFail() {
            hideProgress('getting_campaigns_progress');
            return true;
        };
        var ads_types_elem = geByClass1('ads_types_' + bindingId);
        var ads_types = ads_types_elem ? ads_types_elem.getIndex() : 0;
        var dataReq = {
            client_id: id,
            ads_types: ads_types
        };

        var grouping_ads_elem = geByClass('grouping_ads_' + bindingId)[0];
        if (grouping_ads_elem) {
            dataReq.group_ads = grouping_ads_elem.getIndex();
        }

        var grouping_ads_promoted_elem = geByClass('grouping_ads_promoted_' + bindingId)[0];
        if (grouping_ads_promoted_elem) {
            dataReq.group_ads_promoted = grouping_ads_promoted_elem.getIndex();
        }

        showProgress('getting_campaigns_progress');
        ajax.post('/ads?act=a_get_client_children', dataReq, {
            onDone: onDone,
            onFail: onFail
        });
    }
}

Ads.createStaticDropdownMenuAds = function(elem, bindingId, values, params) {
    var clientChooseRow = geByClass1('client_choose_row_' + bindingId);

    if (!clientChooseRow) {
        return;
    }

    if (params.classname == 'client_choose') {
        onDomReady(function() {
            hide(clientChooseRow);
        });
    }

    clientChooseRow.uiDropdown = new Dropdown(elem, values, {
        big: 1,
        autocomplete: 1,
        multiselect: 0,
        selectedItems: 0,
        onChange: function(value) {
            var i = parseInt(value, 10);
            if (!i) i = 'aca';
            Ads.openInnerTable(i, bindingId);
        }
    });
}

// threshold is height of container
Ads.makeDDScrollable = function(dd, threshold) {
    if (!dd) return;
    if (threshold === undefined) {
        threshold = 300;
    }

    var uiBody = dd.body,
        uiTable = geByClass('dd_menu_rows', uiBody)[0].firstChild,
        uiTableS = getSize(uiBody),
        uiTableW = uiTableS[0],
        uiTableH = uiTableS[1] - 4, // dont understand why
        barW = 6,
        barH = Math.max(20, intval(threshold * threshold / uiTableH)),
        scrollBar = ce('div', {
            className: 'ads_dropdown_menu_scrollbar'
        }, {
            top: barH / 10,
            right: 3,
            width: barW,
            height: barH
        });

    if (uiTableH < threshold) {
        return;
    }

    setStyle(uiTable.parentNode, {
        overflowY: 'hidden',
        height: threshold
    });
    uiBody.appendChild(scrollBar);
    setStyle(uiTable, 'position', 'relative');

    var startY = null,
        startTop = 0,
        hoverState = 0,
        hoverTimer = null;
    var onScroll = function(e) {
        var oldTop = parseFloat(getStyle(uiTable, 'top'));
        if (isNaN(oldTop)) {
            oldTop = 0;
        }

        var delta = e.wheelDelta ? e.wheelDelta / 120 : -e.detail / 3;
        scrollBody(oldTop + delta * 20);

        if (hoverTimer) {
            clearTimeout(hoverTimer);
        } else {
            doHover(1);
        }
        hoverTimer = setTimeout(function() {
            hoverTimer = null;
            doHover(-1);
        }, 200);

        cancelEvent(e);
        return false;
    }
    var onMouseMove = function(e) {
        if (startY === null) return;
        var y = e.pageY;
        var localD = startY - y,
            delta = 1.0 * localD * (uiTableH - threshold) / (threshold - barH - 5);
        scrollBody(startTop + delta);
    }
    var scrollBody = function(newTop) {
        newTop = Math.min(0, newTop);
        newTop = Math.max(-uiTableH + threshold, newTop);

        var barTop = 3 - 1.0 * newTop / (uiTableH - threshold) * (threshold - barH - 5);
        setStyle(uiTable, 'top', newTop);
        setStyle(scrollBar, 'top', barTop);
    }
    var onDown = function(e) {
        startY = e.pageY;
        startTop = parseFloat(getStyle(uiTable, 'top'));
        if (isNaN(startTop)) startTop = 0;

        doHover(1);
        cancelEvent(e);
    }
    var onUp = function(e) {
        if (startY !== null) {
            doHover(-1);
        }
        startY = null;
    }
    var doHover = function(dh) {
        hoverState += dh;
        if (hoverState == 0) removeClass(scrollBar, 'hovered');
        if (hoverState == 1) addClass(scrollBar, 'hovered');
    }

    dd.options.onShow = function() {
        scrollBody(100000);
    }
    addEvent(uiBody, 'mousewheel DOMMouseScroll', onScroll);
    addEvent(scrollBar, 'mousedown', onDown);
    addEvent(document.body, 'mouseup dragend', onUp);
    addEvent(uiBody, 'mousemove', onMouseMove);

    cur.destroy.push(function() {
        removeEvent(uiBody, 'mousewheel DOMMouseScroll', onScroll);
        removeEvent(scrollBar, 'mousedown', onDown);
        removeEvent(document.body, 'mouseup dragend', onUp);
        removeEvent(uiBody, 'mousemove', onMouseMove);
    });
}

// params must be ready to go to contructor
Ads.createStaticDropdown = function(elem, bindingId, values, params) {
    elem = ge(elem);
    if (params.classname) elem.className = params.classname + '_' + bindingId;
    elem.className = elem.className + ' dd_link';

    elem.valueList = values;
    elem.getValue = function() {
        return elem.value;
    }
    elem.getIndex = function() {
        if (elem.index !== undefined) return elem.index;

        for (var i = 0; i < elem.valueList.length; i++) {
            if (elem.valueList[i][1] == elem.value) {
                return elem.valueList[i][0];
            }
        }
        return -1;
    }

    if (params.classname == 'client_choose') {
        onDomReady(function() {
            hide(geByClass('client_choose_row_' + bindingId)[0]);
        });
    }

    function getAdsTypeValue() {
        var elem = geByClass1('ads_types_' + bindingId);
        if (elem) {
            return elem.getIndex();
        }
        return -1;
    }

    params.updateHeader = function(i, t) {
        if (!i) i = 0;
        var label_el;
        var chser;
        var dd;
        var text;

        //
        // offices
        //
        if (elem.className.substring(0, 'offices'.length) == 'offices') {
            if (i == 1) {
                hide(geByClass1('grouping_ads_row_' + bindingId));
                hide(geByClass1('grouping_ads_promoted_row_' + bindingId));

                var bodyStyle = 'line-height: 160%; padding: 16px 20px;';
                var saveOfficesList = function() {
                    cur.offices_list = ge('offers_offices_list').value;
                    curBox().hide();
                };
                showFastBox({
                        title: '�������� ���������',
                        dark: true,
                        width: 500,
                        bodyStyle: bodyStyle
                    },
                    '<div>�������� ID ��������� ��������, �� ������� ���� �������� ��������, � ��������� �������:<br>[ID ��������]<span style="color: #888; font-size: 0.8em; margin: 0 2px;">���</span>[�������� ��� "-"]<span style="color: #888; font-size: 0.8em; margin: 0 2px;">���</span>[������ ��� "-"]<span style="color: #888; font-size: 0.8em; margin: 0 2px;">���</span>[��������� ��� "-"]</div><textarea id="offers_offices_list" style="width: 100%; height: 200px; margin-top: 4px;">' + (cur.offices_list ? cur.offices_list : '') + '</textarea>',
                    '���������', saveOfficesList);
            } else {
                if (getAdsTypeValue() == 1) {
                    show(geByClass1('grouping_ads_promoted_row_' + bindingId));
                } else {
                    show(geByClass1('grouping_ads_row_' + bindingId));
                }
            }
        } else
            //
            // offices
            //
            if (elem.className.substring(0, 'ads_types'.length) == 'ads_types') {
                var promoted_posts_mode = !!i;

                toggle(geByClass1('grouping_time_row_' + bindingId), !promoted_posts_mode);
                toggle(geByClass1('grouping_ads_row_' + bindingId), !promoted_posts_mode);
                toggle(geByClass1('grouping_ads_promoted_row_' + bindingId), promoted_posts_mode);
                toggle(geByClass1('stats_type_row_' + bindingId), !promoted_posts_mode);
                toggle(geByClass1('client_choose_row_' + bindingId), promoted_posts_mode || (geByClass1('grouping_ads_' + bindingId).uiDropdown.value == 2));
                toggle(geByClass1('start_time_row_' + bindingId), !promoted_posts_mode);
                toggle(geByClass1('stop_time_row_' + bindingId), !promoted_posts_mode);

                if (promoted_posts_mode) {
                    var grouping_ads_promoted_el = geByClass1('grouping_ads_promoted_' + bindingId);
                    grouping_ads_promoted_el.uiDropdown.options.updateHeader(grouping_ads_promoted_el.uiDropdown.items[3] ? 3 : 1, undefined);
                } else {
                    var grouping_ads_el = geByClass1('grouping_ads_' + bindingId);
                    grouping_ads_el.uiDropdown.options.updateHeader(grouping_ads_el.uiDropdown.value, undefined);
                }
            } else
                //
                // grouping_time
                //
                if (elem.className.substring(0, 'grouping_time'.length) == 'grouping_time') {
                    var modes = ['d', 'm', 'h'];
                    cur.exportUi['start_time'].setMode(modes[i]);
                    cur.exportUi['stop_time'].setMode(modes[i]);
                } else
                    //
                    // client_choose
                    //
                    if (elem.className.substring(0, 'client_choose'.length) == 'client_choose') {
                        if (!i) i = 'aca';
                        Ads.openInnerTable(i, bindingId);
                    } else
                        //
                        // grouping_ads_promoted
                        //
                        if (elem.className.substring(0, 'grouping_ads_promoted'.length) == 'grouping_ads_promoted') {
                            switch (i) {
                                case 2:
                                case 3:
                                    chser = geByClass1('client_choose_row_' + bindingId);

                                    if (chser) {
                                        dd = chser.uiDropdown || false;
                                        if (dd) {
                                            dd.val(dd.dataItems[0]);
                                        }
                                        show(chser);
                                    }

                                    Ads.openInnerTable('aca', bindingId);

                                    label_el = ge('unions_table_label_' + bindingId);
                                    label_el.innerHTML = getLang('ads_export_stat_data_title_campaigns');
                                    break;
                                case 0:
                                    Ads.openInnerTable('cam_pp_rs', bindingId);
                                    break;
                                case 1:
                                    Ads.openInnerTable('cam_pp', bindingId);
                                    break;
                                default:
                                    break;
                            }
                        }
        //
        // grouping_ads
        //
        else if (elem.className.substring(0, 'grouping_ads'.length) == 'grouping_ads') {
            switch (i) {
                case 0:
                    hide(geByClass('client_choose_row_' + bindingId)[0]);
                    Ads.openInnerTable('acl', bindingId);

                    label_el = ge('unions_table_label_' + bindingId);
                    label_el.innerHTML = getLang('ads_export_stat_data_title_campaigns');
                    break;
                case 1:
                    hide(geByClass('client_choose_row_' + bindingId)[0]);
                    Ads.openInnerTable('cli', bindingId);

                    label_el = ge('unions_table_label_' + bindingId);
                    label_el.innerHTML = getLang('ads_export_stat_data_title_clients');
                    break;
                case 2:
                    show(geByClass1('client_choose_row_' + bindingId));
                    Ads.openInnerTable('aca', bindingId);

                    label_el = ge('unions_table_label_' + bindingId);
                    label_el.innerHTML = getLang('ads_export_stat_data_title_campaigns');
                    break;
                case 3:
                    Ads.openInnerTable('cam', bindingId);
                    break;
                default:
                    break;
            }
        }

        elem.index = i;
        elem.value = t;
        return t;
    }
    params.onSelect = function(value) {
        if (value === undefined) value = uiDropdown.val();
        elem.value = value;
        elem.innerHTML = value;
    };
    params.target = elem;
    params.showHover = true;
    //params.alwaysMenuToUp = true;

    params.onSelect(values[0][1]);

    elem.uiDropdown = new DropdownMenu(values, params);
}

Ads.createInlineStaticEdit = function(editElem, bindingId, params) {
    if (!params) params = {};
    editElem = ge(editElem);
    if (params.classname) editElem.className = params.classname + '_' + bindingId;

    var uiTimeDay, uiTimeMonth, uiTimeYear, uiAbstractDropdown;

    if (!params['type'] && !params['values']) return false;

    var defaultValue;
    if (params['default']) {
        defaultValue = params['default'];
    }

    var type = params['type'] || 'dropdown';

    switch (type) {
        case 'dropdown':
            if (params['values'] === undefined) {
                return false;
            }
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            break;
        case 'time':
            break;
        default:
            break;
    }

    monthNames = [
        getLang('ads_jan'),
        getLang('ads_feb'),
        getLang('ads_mar'),
        getLang('ads_apr'),
        getLang('ads_may'),
        getLang('ads_jun'),
        getLang('ads_jul'),
        getLang('ads_aug'),
        getLang('ads_sep'),
        getLang('ads_oct'),
        getLang('ads_nov'),
        getLang('ads_dec')
    ];
    saveValue(defaultValue);

    function saveValue(newValue) {
        editElem.value = newValue;

        var newText = '';
        switch (type) {
            case 'time':
                if (newValue && newValue.day && newValue.month && newValue.year) {
                    newText = newValue.day + ' ' + monthNames[newValue.month - 1] + ' ' + newValue.year;
                }
                break;
            case 'dropdown':
                if (parseInt(newValue) !== undefined) {
                    newText = params['values'][parseInt(newValue)];
                } else
                if (typeof newValue == 'string') {
                    newText = newValue;
                } else {
                    for (var index in newValue) {
                        saveValue.call(this, newValue[index]);
                        return;
                    }
                }
                break;
            default:
                break;
        }

        applyNewValue.call(this, newValue, newText);
    }

    function applyNewValue(newValue, newText) {
        editElem.value = newValue;
        editElem.innerHTML = newText;
    }

    function checkValue(value) {
        return true;
    }

    function showLongError(error) {
        showFastBox(getLang('ads_error_box_title'), error);
    }

    function updateTimeDays(month) {
        uiTimeDay.setData(getDays(month));
    }

    //
    // Helpers
    //
    function getDays(month, year) {
        var ret = [],
            days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var curMonth = (new Date()).getMonth() + 1;
        var curYear = (new Date()).getFullYear();
        if (!month) month = curMonth;
        if (!year) year = month >= curMonth ? curYear : curYear + 1;
        if (month == 2 && year % 4 == 0) {
            days[2] = 29;
        }
        for (var i = 1, days = days[month]; i <= days; i++) {
            ret.push(i);
        }
        return ret;
    }

    function getMonths() {
        var months = [];
        for (var i = 1; i <= 12; i++) {
            months.push([i, monthNames[i - 1]]);
        }
        return months;
    }

    function getYears() {
        var ret = [];
        var curY = (new Date()).getFullYear();
        for (var i = curY; i >= curY - 10; i--) {
            ret.push(i);
        }
        return ret;
    }

    function getAssocFromValues(array) {
        var res = [];
        for (var i = 0; i < array.length; i++) {
            res.push([i, array[i]]);
        }
        return res;
    }

    //
    // Events
    //
    function afterInit() {
        var self = this;

        switch (type) {
            case 'time':
                uiTimeDay = new Dropdown(
                    geByClass('inline_time_day', this.contentTable)[0],
                    getDays(), {
                        width: 45,
                        height: 150,
                        selectedItem: 1
                    }
                );
                uiTimeMonth = new Dropdown(
                    geByClass('inline_time_month', this.contentTable)[0],
                    getMonths(), {
                        width: 80,
                        height: 150,
                        selectedItem: 1,
                        onChange: function(value) {
                            updateTimeDays.call(this, value);
                        }
                    }
                );
                uiTimeYear = new Dropdown(
                    geByClass('inline_time_year', this.contentTable)[0],
                    getYears(), {
                        width: 65,
                        height: 150,
                        selectedItem: (new Date()).getFullYear()
                    }
                );
                break;

            case 'dropdown':
                uiAbstractDropdown = new Dropdown(
                    geByClass('ads_inline_dropdown', this.contentTable)[0],
                    getAssocFromValues(params['values']), {
                        height: 150,
                        selectedItem: 0
                    }
                );
                break;

            default:
                break;
        }
    }

    function onBeforeShow() {
        switch (type) {
            case 'time':
                if (defaultValue && defaultValue.day && defaultValue.month && defaultValue.year) {
                    uiTimeDay.setData(getDays(defaultValue.month));
                    uiTimeDay.val(defaultValue.day);
                    uiTimeMonth.val(defaultValue.month);
                    uiTimeYear.val(defaultValue.year);
                } else {
                    editElem.innerHTML = "�� ������";
                }
                break;

            case 'dropdown':
                uiAbstractDropdown.val(defaultValue);
                break;

            default:
                break;
        }
    }

    function onShow() {}

    function onConfirm() {
        var newValue;
        if (type == 'time') {
            newValue = {};
            newValue.day = uiTimeDay.val();
            newValue.month = uiTimeMonth.val();
            newValue.year = uiTimeYear.val();
        } else
        if (type == 'dropdown') {
            newValue = uiAbstractDropdown.val();
        }

        saveValue.call(this, newValue);
        return true;
    }

    var options = {
        afterInit: afterInit,
        onBeforeShow: onBeforeShow,
        onShow: onShow,
        onConfirm: onConfirm
    };

    switch (type) {
        case 'time':
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table">' +
                '<tr>' +
                '<td style="white-space: nowrap; width: 200px;">' +
                '<table class="ads_inline_edit_table">' +
                '<tr>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_day text" style="width: 30px;" /></td>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_month text" style="width: 30px;" /></td>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_year text" style="width: 30px;" /></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
        case 'dropdown':
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table" style="width: 100%;">' +
                '<tr><td><input type="text" class="ads_inline_dropdown text" /></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
        default:
            break;
    }

    new InlineEdit(editElem, options);
}

Ads.onInlineEditClick = function(elem, callback, rown, coln) {
    var _t = this;

    var editElem = elem,
        progressElem = _t.content.extra.progress_elem[rown][coln],
        unionId = _t.content.extra.union_id[rown][coln],
        unionType = _t.content.extra.union_type[rown][coln],
        valueType = _t.content.extra.value_type[rown][coln],
        initValue = _t.content.extra.init_value[rown][coln],
        hash = _t.content.extra.hash[rown][coln],
        additionalParams = extend(_t.content.extra.additional_params[rown][coln], {
            valCallback: function(val) {
                callback({
                    value: val,
                    extra: {
                        init_value: val
                    }
                });
            }
        });

    var ret = Ads.createInlineEdit(editElem, progressElem, unionType, unionId, valueType, initValue, hash, additionalParams);
    ret.obj.show();
}

Ads.createInlineEdit = function(editElem, progressElem, unionType, unionId, valueType, initValue, hash, additionalParams) {
    editElem = ge(editElem);
    progressElem = ge(progressElem);
    var defaultValue = initValue;
    var bad_this = this;

    var uiTimeDay, uiTimeMonth, uiTimeHour;

    var valueGeneralType;
    switch (valueType) {
        case 'cost_per_click':
            valueGeneralType = 'cost_per_click';
            break;
        case 'day_limit':
        case 'month_limit':
        case 'all_limit':
        case 'contract_limit':
            valueGeneralType = 'limit';
            break;
        case 'start_time':
        case 'stop_time':
            valueGeneralType = 'time';
            break;
        default:
            valueGeneralType = 'text';
            break;
    }

    var elemParams = {};

    function saveValue(newValue, isRemoveValue) {

        if (valueGeneralType == 'limit') {
            if ((!isRemoveValue && defaultValue == newValue) || (isRemoveValue && defaultValue == 0)) {
                if (isRemoveValue) {
                    this.hide();
                }
                return;
            }
        } else {
            if (defaultValue == newValue) {
                return;
            }
        }

        var unknownError = getLang('ads_error_unexpected_error_try_later');

        var params = {};
        params.union_id = unionId;
        params.hash = hash;
        extend(params, additionalParams);

        if (isRemoveValue) {
            params[valueType] = 0;
        } else {
            if (valueGeneralType == 'time') {
                params[valueType + '_day'] = newValue.day;
                params[valueType + '_month'] = newValue.month;
                params[valueType + '_hour'] = newValue.hour;
            } else {
                params[valueType] = newValue;
            }
        }

        var self = this;

        function onAjaxComplete(response) {
            if (isObject(response)) {
                if (response.error) {
                    showLongError.call(self, response.error);
                } else if (!response.not_changed) {
                    if ((valueType + '_value') in response) {
                        applyNewValue.call(self, response[valueType + '_value'], response[valueType + '_text']);
                    } else if (response[valueType + '_value_day']) {
                        var newValue = {};
                        newValue.day = response[valueType + '_value_day'];
                        newValue.month = response[valueType + '_value_month'];
                        newValue.hour = response[valueType + '_value_hour'];
                        applyNewValue.call(self, newValue, response[valueType + '_text']);
                    } else {
                        showLongError.call(self, unknownError);
                    }
                }
            } else {
                showLongError.call(self, unknownError);
            }

            hide(progressElem);
            show(editElem);

            return true;
        }
        ajax.post('/ads?act=a_unions_general_info_save', params, {
            onDone: onAjaxComplete,
            onFail: onAjaxComplete
        });

        hide(editElem);
        show(progressElem);
        if (isRemoveValue) {
            this.hide();
        }
    }

    function applyNewValue(newValue, newText) {
        if (valueType == 'name') {
            Ads.updateUnionName(unionId, newText);
        }
        defaultValue = newValue;
        if (additionalParams.valCallback) {
            if (isFunction(additionalParams.valCallback)) {
                additionalParams.valCallback(newValue, newText);
            } else {
                eval('(function(v, t){' + additionalParams.valCallback + '(v, t);})(' + newValue + ',\'' + newText + '\')');
            }
        } else {
            editElem.innerHTML = newText;
        }
    }

    function checkValue(value) {
        switch (valueGeneralType) {
            case 'cost_per_click':
                if (value == '' || value == '0' || value == 0) {
                    return (additionalParams.is_cost_per_click ? getLang('ads_error_cost_per_click_no_value') : getLang('ads_error_cost_per_views_no_value'));
                }
                if (!value.match(/[0-9.,]/)) {
                    return (additionalParams.is_cost_per_click ? getLang('ads_error_cost_per_click_invalid_value') : getLang('ads_error_cost_per_views_invalid_value'));
                }
                value = value.replace(',', '.');

                var valueFloat = parseFloat(value);
                var suffixesAll = '';
                suffixesAll += (additionalParams.is_cost_per_click ? '_click' : '_views');
                suffixesAll += (additionalParams.is_special_ad ? '_special' : '');
                suffixesAll += (additionalParams.is_big_app ? '_big_app' : '');
                suffixesAll += (additionalParams.is_mobile_app ? '_mobile' : '');
                suffixesAll += (additionalParams.is_promoted_post ? '_promoted_post' : '');
                suffixesAll += (additionalParams.is_exclusive_ad ? '_exclusive' : '');
                suffixesAll += (additionalParams.is_app_admin ? '_app' : '');
                var suffixesExt = '';
                suffixesExt += (additionalParams.is_cis ? '_cis' : '');
                var minValue = elemParams.minCost || cur.unionsLimits['cost_per' + suffixesAll + suffixesExt + '_min'] || cur.unionsLimits['cost_per' + suffixesAll + '_min'];
                var maxValue = elemParams.maxCost || cur.unionsLimits['cost_per' + suffixesAll + suffixesExt + '_max'] || cur.unionsLimits['cost_per' + suffixesAll + '_max'];

                var minErrorLangKey = (additionalParams.is_cost_per_click ? 'ads_error_cost_per_click_min_value' : 'ads_error_cost_per_views_min_value');
                var maxErrorLangKey = (additionalParams.is_cost_per_click ? 'ads_error_cost_per_click_max_value' : 'ads_error_cost_per_views_max_value');
                if (!minValue || valueFloat < minValue) {
                    elemParams.minCostError = {
                        value: minValue
                    };
                    return getLang(minErrorLangKey).replace('{money}', getLang('global_money_amount_rub', minValue));
                }
                if (!maxValue || valueFloat > maxValue) {
                    return getLang(maxErrorLangKey).replace('{money}', getLang('global_money_amount_rub', maxValue));
                }

                if (!value.match(cur.unionsLimits.cost_per_click_pattern)) {
                    return (additionalParams.is_cost_per_click ? getLang('ads_error_cost_per_click_invalid_value') : getLang('ads_error_cost_per_views_invalid_value'));
                }
                return true;
            case 'limit':
                if (value == '' || value == '0' || value == 0) {
                    return getLang('ads_error_limit_no_value');
                }
                if (!value.match(/[0-9.,]/)) {
                    return getLang('ads_error_limit_invalid_value');
                }
                if (value.indexOf('.') != -1 || value.indexOf(',') != -1) {
                    return getLang('ads_error_limit_integer_value');
                }
                if (parseInt(value) < cur.unionsLimits.limit_min) {
                    return getLang('ads_error_limit_min_value').replace('{money}', getLang((additionalParams.is_votes_limit ? 'global_n_votes' : 'global_money_amount_rub'), cur.unionsLimits.limit_min));
                }
                if (parseInt(value) > cur.unionsLimits.limit_max) {
                    return getLang('ads_error_limit_large_value');
                }
                if (!value.match(cur.unionsLimits.limit_pattern)) {
                    return getLang('ads_error_limit_invalid_value');
                }
                return true;
        }
        switch (valueType) {
            case 'name':
                if (value == '') {
                    if (unionType == 4) { // Top union
                        // Nothing
                    } else if (unionType == 2) {
                        return getLang('ads_error_client_name_no_value');
                    } else if (unionType == 1) {
                        return getLang('ads_error_campaign_name_no_value');
                    }
                }
                return true;
        }
        if (additionalParams.server_check) {
            return true;
        } else {
            return false;
        }
    }

    function showFastError(error) {
        geByClass('ads_inline_fast_error', this.fastErrorRow)[0].innerHTML = error;
        show(this.fastErrorRow);
    }

    function hideFastError() {
        hide(this.fastErrorRow);
        geByClass('ads_inline_fast_error', this.fastErrorRow)[0].innerHTML = '';
    }

    function showLongError(error) {
        showFastBox(getLang('ads_error_box_title'), error);
    }

    function removeValue() {
        saveValue.call(this, false, true);
        return true;
    }

    function updateTimeDays(month) {
        uiTimeDay.setData(getDays(month));
    }

    //
    // Helpers
    //
    function getDays(month) {
        var ret = [],
            days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var curMonth = (new Date()).getMonth() + 1;
        var curYear = (new Date()).getFullYear();
        if (!month) month = curMonth;
        var year = month >= curMonth ? curYear : curYear + 1;
        if (month == 2 && year % 4 == 0) {
            days[2] = 29;
        }
        for (var i = 1, days = days[month]; i <= days; i++) {
            ret.push(i);
        }
        return ret;
    }

    function getMonths() {
        var months = [];
        months.push([1, getLang('ads_jan')]);
        months.push([2, getLang('ads_feb')]);
        months.push([3, getLang('ads_mar')]);
        months.push([4, getLang('ads_apr')]);
        months.push([5, getLang('ads_may')]);
        months.push([6, getLang('ads_jun')]);
        months.push([7, getLang('ads_jul')]);
        months.push([8, getLang('ads_aug')]);
        months.push([9, getLang('ads_sep')]);
        months.push([10, getLang('ads_oct')]);
        months.push([11, getLang('ads_nov')]);
        months.push([12, getLang('ads_dec')]);
        return months;
    }

    function getHours() {
        var ret = [];
        for (var i = 0; i < 24; i++) {
            ret.push([i, i + ':00']);
        }
        return ret;
    }

    //
    // Events
    //
    function afterInit() {
        var self = this;

        if (valueGeneralType == 'limit' || valueGeneralType == 'time') {
            this.removeValueAnchor = geByClass('ads_inline_edit_remove_value', this.contentTable)[0];
            addEvent(this.removeValueAnchor, 'click', function() {
                removeValue.call(self);
                return false;
            });
        }

        if (valueGeneralType == 'time') {
            uiTimeDay = new Dropdown(
                geByClass('inline_time_day', this.contentTable)[0],
                getDays(), {
                    width: 45,
                    height: 150,
                    selectedItem: 1
                }
            );
            uiTimeMonth = new Dropdown(
                geByClass('inline_time_month', this.contentTable)[0],
                getMonths(), {
                    width: 80,
                    height: 150,
                    selectedItem: 1,
                    onChange: function(value) {
                        updateTimeDays.call(this, value);
                    }
                }
            );
            uiTimeHour = new Dropdown(
                geByClass('inline_time_hour', this.contentTable)[0],
                getHours(), {
                    width: 65,
                    height: 150,
                    selectedItem: 0
                }
            );
        }

        this.fastErrorRow = geByClass('ads_inline_fast_error_row', this.contentTable)[0];

        if (this.input) {
            this.is_user_action = true;
            addEvent(this.input, 'keyup', function(event) {
                if (event.keyCode != 13) {
                    hideFastError.call(self);
                }
            });
        }
    }

    function onBeforeShow() {
        if (this.input) {
            this.input.value = defaultValue;
        }

        if (valueGeneralType == 'time') {
            uiTimeDay.setData(getDays(defaultValue.month));
            uiTimeDay.val(defaultValue.day);
            uiTimeMonth.val(defaultValue.month);
            uiTimeHour.val(defaultValue.hour);
        }

        hideFastError.call(this);

        var self = this;
        if (valueGeneralType == 'cost_per_click' && !this.recommended_cost_loaded) {
            var recommendedCostProgress = geByClass('inline_recommended_cost_progress', this.contentTable)[0];
            var recommendedCostText = geByClass('ads_inline_recommended_cost_text', this.contentTable)[0];

            function onDone(response) {
                if (response) {
                    if (response.recommended_costs && response.recommended_costs.cost_text) {
                        recommendedCostText.innerHTML = response.recommended_costs.cost_text;
                        hide(recommendedCostProgress);
                        show(recommendedCostText);
                        if (!this.is_user_action && self.input.value == '0') {
                            self.input.value = response.recommended_costs.cost_value;
                        }
                        self.recommended_cost_loaded = true;
                    }
                    if (response.min_cost && response.max_cost) {
                        elemParams.minCost = response.min_cost;
                        elemParams.maxCost = response.max_cost;
                        if (elemParams.minCostError && elemParams.minCostError.value != elemParams.minCost) {
                            hide(self.fastErrorRow);
                        }
                    }
                }
            };
            var ajaxParams = {
                ad_id: unionId
            };
            ajax.post('/ads?act=a_get_recommended_cost', ajaxParams, {
                onDone: onDone
            });
        }
    }

    function onShow() {
        if (this.input) {
            elfocus(this.input);
        }
    }

    function onConfirm() {
        var newValue;
        if (valueGeneralType == 'time') {
            newValue = {};
            newValue.day = uiTimeDay.val();
            newValue.month = uiTimeMonth.val();
            newValue.hour = uiTimeHour.val();
        } else {
            newValue = this.input.value;

            var checkResult = checkValue.call(this, newValue, valueType);
            if (typeof(checkResult) == 'string') {
                showFastError.call(this, checkResult);
                return false;
            }
            if (checkResult !== true) {
                showFastError.call(this, getLang('ads_error_unknown_error'));
                return false;
            }
        }

        saveValue.call(this, newValue, false);
        return true;
    }

    var options = {
        afterInit: afterInit,
        onBeforeShow: onBeforeShow,
        onShow: onShow,
        onConfirm: onConfirm
    };

    switch (valueGeneralType) {
        case 'cost_per_click':
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table" style="width: 100%;">' +
                '<tr><td><input class="inlInput text" type="text" /></td></tr>' +
                '<tr><td style="padding-top: 7px; height: 22px;">' +
                '<img class="inline_recommended_cost_progress" src="/images/upload.gif" />' +
                '<span class="ads_inline_recommended_cost_text"></span>' +
                '<div style="width: 275px; height: 1px;"></div>' +
                '</td></tr>' +
                '<tr class="ads_inline_fast_error_row"><td><div class="ads_inline_fast_error"></div></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
        case 'limit':
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table">' +
                '<tr>' +
                '<td><input class="inlInput text" type="text" /></td>' +
                '<td><a class="ads_inline_edit_remove_value" href="#">' + getLang('ads_inline_edit_remove_limit') + '</a></td>' +
                '</tr>' +
                '<tr class="ads_inline_fast_error_row"><td colspan="2"><div class="ads_inline_fast_error"></div></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
        case 'time':
            var removeValueText;
            switch (valueType) {
                case 'start_time':
                    removeValueText = getLang('ads_inline_edit_remove_start_time');
                    break;
                case 'stop_time':
                    removeValueText = getLang('ads_inline_edit_remove_stop_time');
                    break;
            }
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table">' +
                '<tr>' +
                '<td style="white-space: nowrap; width: 200px;">' +
                '<table class="ads_inline_edit_table">' +
                '<tr>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_day text" style="width: 30px;" /></td>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_month text" style="width: 30px;" /></td>' +
                '<td style="padding-right: 5px;"><input type="text" class="inline_time_hour text" style="width: 30px;" /></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr><td style="padding-top: 7px;"><a class="ads_inline_edit_remove_value" style="padding-left: 0;" href="#">' + removeValueText + '</a></td></tr>' +
                '<tr class="ads_inline_fast_error_row"><td colspan="2"><div class="ads_inline_fast_error"></div></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
        case 'text':
            options.contentHTML =
                '<tr>' +
                '<td colspan="2">' +
                '<table class="ads_inline_edit_table" style="width: 100%;">' +
                '<tr><td><input class="inlInput text" type="text" /></td></tr>' +
                '<tr class="ads_inline_fast_error_row"><td><div class="ads_inline_fast_error"></div></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>';
            break;
    }

    var ret = {
        target: editElem,
        options: options
    };
    if (this.getOptionsOnly) { // dirty hack.
        return ret;
    }
    ret.obj = new InlineEdit(editElem, options);

    var accessFunctions = {
        applyNewValue: applyNewValue
    }

    if (!cur.inlineEditControls) {
        cur.inlineEditControls = {};
    }
    cur.inlineEditControls[valueType + '_' + unionId] = accessFunctions;

    return ret;
}

Ads.createInlineDropdownMenu = function(menuElem, boxElem, progressElem, unionId, valueType, items, initValue, hash, additionalParams) {
    menuElem = ge(menuElem);
    boxElem = ge(boxElem);
    progressElem = ge(progressElem);
    var defaultValue = initValue;

    var self;

    function saveValue(newValue) {

        if (newValue == defaultValue) {
            return;
        }

        var unknownError = getLang('ads_error_unexpected_error_try_later');

        var params = {};
        params.union_id = unionId;
        params.hash = hash;
        extend(params, additionalParams);
        params[valueType] = newValue;

        function onAjaxComplete(response) {
            if (isObject(response)) {
                if (response.error) {
                    showLongError.call(self, response.error);
                } else if (!response.not_changed) {
                    if (response[valueType + '_value'] !== undefined) {
                        applyNewValue(response[valueType + '_value'], response[valueType + '_text']);
                        if (additionalParams.reload) {
                            nav.reload();
                        }
                    } else {
                        showLongError.call(self, unknownError);
                    }
                }
            } else {
                showLongError.call(self, unknownError);
            }

            hide(progressElem);
            show(boxElem);

            return true;
        }
        ajax.post('/ads?act=a_unions_general_info_save', params, {
            onDone: onAjaxComplete,
            onFail: onAjaxComplete
        });

        hide(boxElem);
        show(progressElem);
    }

    function applyNewValue(newValue, newText) {
        defaultValue = newValue;
        self.setOptions({
            title: newText
        });
        menuElem.innerHTML = newText;
    }

    function showLongError(error) {
        showFastBox(getLang('ads_error_box_title'), error);
    }

    function onMenuChange(event) {
        var newValue = event.target.index;
        saveValue(newValue);
    }

    var options = {};
    options.target = menuElem;
    options.onSelect = onMenuChange;
    options.showHover = false;
    options.updateTarget = false;
    self = new DropdownMenu(items, options);
}

Ads.createInlineDropdownSelectorMenu = function(menuElem, inputElem, boxElem, progressElem, unionId, valueType, items, initValue, hash, zeroPlaceholder, additionalParams) {
    menuElem = ge(menuElem);
    inputElem = ge(inputElem);
    boxElem = ge(boxElem);
    progressElem = ge(progressElem);
    var inputParentElem = inputElem.parentNode;
    var defaultValue = initValue;

    var self;

    function saveValue(newValue) {
        if (newValue == defaultValue) {
            return;
        }

        var unknownError = getLang('ads_error_unexpected_error_try_later');

        var params = {};
        params.union_id = unionId;
        params.hash = hash;
        extend(params, additionalParams);
        params[valueType] = newValue;

        function onAjaxComplete(response) {
            if (isObject(response)) {
                if (response.error) {
                    showLongError.call(self, response.error);
                } else if (!response.not_changed) {
                    if (response[valueType + '_value'] !== undefined) {
                        applyNewValue(response[valueType + '_value'], response[valueType + '_text']);
                        if (additionalParams.reload) {
                            nav.reload();
                        }
                    } else {
                        showLongError.call(self, unknownError);
                    }
                }
            } else {
                showLongError.call(self, unknownError);
            }

            hide(progressElem);
            show(boxElem);

            return true;
        }
        ajax.post('/ads?act=a_unions_general_info_save', params, {
            onDone: onAjaxComplete,
            onFail: onAjaxComplete
        });

        hide(boxElem);
        show(progressElem);
    }

    function applyNewValue(newValue, newText) {
        defaultValue = newValue;
        self.selectItem(newValue);
        menuElem.innerHTML = newText;
    }

    function showLongError(error) {
        showFastBox(getLang('ads_error_box_title'), error);
    }

    function toggleInputVisibility(showInput) {
        if (showInput) {
            if (self) {
                self.selectItem(defaultValue);
            }
            addClass(menuElem, 'unshown');
            removeClass(inputParentElem, 'unshown');
            addEvent(window, 'click', onOuterClick);
            self.showDefaultList();
        } else {
            addClass(inputParentElem, 'unshown');
            removeClass(menuElem, 'unshown');
            removeEvent(window, 'click', onOuterClick);
        }
    }

    function onSelect(id, name) {
        saveValue(id);
        toggleInputVisibility(false);
    }

    if (cur.destroy) {
        cur.destroy.push(function() {
            removeEvent(window, 'click', onOuterClick);
            if (self) {
                self.destroy();
            }
        });
    }

    addEvent(menuElem, 'click', function(e) {
        toggleInputVisibility(true);
        return cancelEvent(e);
    });

    var onOuterClick = function(e) {
        var node = e.target,
            needHide = true;
        while (node && node != document) {
            if (hasClass(node, 'idd_menu_wrap')) {
                needHide = false;
                break;
            }
            node = node.parentNode;
        }

        if (needHide) {
            toggleInputVisibility(false);
        }
    };

    var options = {
        multiselect: false,
        selectedItems: initValue,
        defaultItems: items,
        zeroPlaceholder: !!zeroPlaceholder,
        onChange: onSelect,

        introText: '',
        width: 320 + 8,
        autocomplete: true
    };
    self = new Selector(inputElem, items, options);
};

Ads.MultiDropdownMenu = function(items, options) {
    var dropdownMenu;
    var selectedItems = {};
    var curItems = [];

    function onItemClick(e) {
        var target = e.target;
        while (target.nodeName !== 'A') {
            target = target.parentNode;
        }
        if (!hasClass(target, 'label')) {
            if (hasClass(target, 'checkbox_on')) {
                selectedItems[target.index] = false;
            } else {
                selectedItems[target.index] = true;
            }
            toggleClass(target, 'checkbox_on');
        }
        return false;
    }

    for (var i in items) {
        curItems[i] = {};
        for (var j in items[i]) {
            curItems[i][j] = items[i][j];
        }
        curItems[i].onClick = onItemClick;
        curItems[i].c = 'ads_dd_menu_multi_item' + (curItems[i].i ? '' : ' label');
        selectedItems[curItems[i].i] = false;
    }

    dropdownMenu = new DropdownMenu(curItems, options);
    dropdownMenu.getSelectedItems = function() {
        var selectedItemsResult = [];
        for (var i in selectedItems) {
            if (selectedItems[i]) {
                selectedItemsResult.push(i);
            }
        }
        return selectedItemsResult;
    }

    return dropdownMenu;
}

Ads.getCampaignsTotalLabel = function(total) {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 0:
                return getLang('ads_stopped_campaigns_total', total);
            case 1:
                return getLang('ads_running_campaigns_total', total);
            case 3:
                return getLang('ads_planned_campaigns_total', total);
            case 4:
                return getLang('ads_archived_campaigns_total', total);
            default:
                return getLang('ads_active_campaigns_total', total);
        }
    } else {
        switch (type) {
            case 0:
                return getLang('ads_stopped_campaigns_found', total);
            case 1:
                return getLang('ads_running_campaigns_found', total);
            case 3:
                return getLang('ads_planned_campaigns_found', total);
            case 4:
                return getLang('ads_archived_campaigns_found', total);
            default:
                return getLang('ads_active_campaigns_found', total);
        }
    }
}

Ads.getNoCampaignsLabel = function() {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 0:
                return getLang('ads_no_stopped_campaigns');
            case 1:
                return getLang('ads_no_running_campaigns');
            case 3:
                return getLang('ads_no_planned_campaigns');
            case 4:
                return getLang('ads_no_archived_campaigns');
            default:
                return getLang('ads_no_active_campaigns');
        }
    } else {
        switch (type) {
            case 0:
                return getLang('ads_no_stopped_campaigns_found');
            case 1:
                return getLang('ads_no_running_campaigns_found');
            case 3:
                return getLang('ads_no_planned_campaigns_found');
            case 4:
                return getLang('ads_no_archived_campaigns_found');
            default:
                return getLang('ads_no_active_campaigns_found');
        }
    }
}

Ads.getAdsTotalLabel = function(total) {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 0:
                return getLang('ads_stopped_ads_total', total);
            case 1:
                return getLang('ads_running_ads_total', total);
            case 3:
                return getLang('ads_planned_ads_total', total);
            case 4:
                return getLang('ads_archived_ads_total', total);
            default:
                return getLang('ads_active_ads_total', total);
        }
    } else {
        switch (type) {
            case 0:
                return getLang('ads_stopped_ads_found', total);
            case 1:
                return getLang('ads_running_ads_found', total);
            case 3:
                return getLang('ads_planned_ads_found', total);
            case 4:
                return getLang('ads_archived_ads_found', total);
            default:
                return getLang('ads_active_ads_found', total);
        }
    }
}

Ads.getNoAdsLabel = function() {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 0:
                return getLang('ads_no_stopped_ads');
            case 1:
                return getLang('ads_no_running_ads');
            case 3:
                return getLang('ads_no_planned_ads');
            case 4:
                return getLang('ads_no_archived_ads');
            default:
                return getLang('ads_no_active_ads');
        }
    } else {
        switch (type) {
            case 0:
                return getLang('ads_no_stopped_ads_found');
            case 1:
                return getLang('ads_no_running_ads_found');
            case 3:
                return getLang('ads_no_planned_ads_found');
            case 4:
                return getLang('ads_no_archived_ads_found');
            default:
                return getLang('ads_no_active_ads_found');
        }
    }
}

Ads.getClientsTotalLabel = function(total) {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 4:
                return getLang('ads_archived_clients_total', total);
            default:
                return getLang('ads_active_clients_total', total);
        }
    } else {
        switch (type) {
            case 4:
                return getLang('ads_archived_clients_found', total);
            default:
                return getLang('ads_active_clients_found', total);
        }
    }
}

Ads.getNoClientsLabel = function() {
    var type = this._curFilter;
    if (typeof type == 'object') type = type[0];
    if (!this._curSearchString || this._curSearchString == '') {
        switch (type) {
            case 4:
                return getLang('ads_no_archived_clients');
            default:
                return getLang('ads_no_active_clients');
        }
    } else {
        switch (type) {
            case 4:
                return getLang('ads_no_archived_clients_found');
            default:
                return getLang('ads_no_active_clients_found');
        }
    }
}

Ads.addOfficeFormatFunctions = function(options) {
    var arrFind = function(arr, val) {
        var i = 0;
        for (; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
        return -1;
    }

    var ind = arrFind(options.columnClasses, 'column_name_view');
    options.columnFormatting[ind] = function(data, rown) {
        if (rown == -1) return data;
        var unionId = this.content.extra.unionId[rown];
        return '<div class="ads_paginated_table_name"><a href="/ads?act=office&union_id=' + unionId + '">' + data + '</a></div>';
    }

    var limitFormat = function(data, rown, coln) {
        if (rown == -1) return data;
        var wrap;
        try {
            var uid = this.content.extra.uid[rown][coln];
            if (uid) {
                wrap = "<img id=\"inline_edit_progress" + uid + "\" src=\"/images/upload.gif\" style=\"display: none;\" /><a id=\"inline_edit_value" + uid + "\" >{value}</a>";
            }
        } catch (e) {
            // Nothing
        }
        if (!wrap) {
            wrap = '{value}';
        }
        var value = data;
        if (data == 0) {
            value = getLang('ads_no_money_limit');
        } else {
            value = this._formatData(data, 'currency_int_sign');
        }
        return wrap.replace('{value}', value);
    }
    ind = arrFind(options.columnClasses, 'column_day_limit_view');
    if (ind != -1) options.columnFormatting[ind] = limitFormat;
    ind = arrFind(options.columnClasses, 'column_month_limit_view');
    if (ind != -1) options.columnFormatting[ind] = limitFormat;
    ind = arrFind(options.columnClasses, 'column_all_limit_view');
    if (ind != -1) options.columnFormatting[ind] = limitFormat;

    return options;
}

Ads.createOfficePaginatedTable = function(container, options, content) {
    var getButton = function(label, callback) {
        var div = ce('div', {
            className: 'button_blue'
        });
        var butt = ce('button', {
            innerHTML: label,
            onclick: callback
        });
        div.appendChild(butt);
        return div;
    }

    var statusCol = 1;

    var selected;

    var buttons = [],
        labels = [getLang('ads_status_do_disable'),
            getLang('ads_status_do_enable'),
            getLang('ads_status_do_archive')
        ];


    var changeStatus = function(val) {
        return function() {
            var unionIds = [],
                hashes = [],
                hashesDel = [],
                enable = val; // 1 - on, 0 - off, 2 - delete
            var i;
            for (i in selected) {
                unionIds.push(pt.content.extra.union_id[selected[i]][statusCol]);
                hashes.push(pt.content.extra.hash[selected[i]][statusCol]);
                hashesDel.push(pt.content.extra.hash_delete[selected[i]][statusCol]);
            }

            unionIds = unionIds.join(',');
            hashes = hashes.join(',');
            hashesDel = hashesDel.join(',');

            if (val == 2) { // delete
                Ads.openDeleteUnionBox(cur.tableUnionTypeForDelete, unionIds, hashesDel, lockChangeStatus, unlockChangeStatus, updateStatusInTable, 2);
                return;
            }

            var params = {
                union_id: unionIds,
                hash: hashes,
                newclass: 1,
                enable: val
            };

            lockChangeStatus();

            function lockChangeStatus() {
                lockButton(buttons[val]);
                return true;
            };

            function unlockChangeStatus() {
                unlockButton(buttons[val]);
            }

            function updateStatusInTable(ans) {
                if (ans['status_class']) ans = [ans];

                var errored = 0;
                for (var i in selected) {
                    if (!ans[i]) continue;
                    if (!ans[i]['status_class']) {
                        if (ans[i]['error'] && !errored) {
                            errored = 1;
                            showFastBox(getLang('ads_cant_start_ad_box_title'), ans[i]['error']);
                        }
                        continue;
                    }
                    pt.content.types[selected[i]] = ans[i]['status_type'];
                    pt.content.extra.status_text[selected[i]][statusCol] = ans[i]['status'];
                    pt.content.extra.status_variants[selected[i]][statusCol] = ans[i]['status_variants'];
                    pt._updateValue(selected[i], statusCol, ans[i]['status_class']);
                }
                updateButtons.apply(pt);
            }

            function onRequestComplete(response) {
                // response may be object or array

                unlockChangeStatus();

                if (!response || response.error) { // no isObject or isArray check here
                    debugLog('onFail change status');
                    var errorMessage = ((response && response.error) ? response.error : getLang('ads_error_unexpected_error_try_later'));
                    showFastBox(getLang('ads_cant_start_ad_box_title'), errorMessage);
                    return true;
                }

                var info = '';
                if (response && response.info) {
                    info = response.info;
                }
                debugLog('onDone change status, ' + info);

                updateStatusInTable(response);
                return true;
            }

            ajax.post('/ads?act=a_union_change_status', params, {
                onDone: onRequestComplete,
                onFail: onRequestComplete
            });
        };
    }

    var updateButtons = function() {
        selected = this.getSelection(0, 1);
        var i;
        for (i in buttons) {
            hide(buttons[i]);
        }
        if (selected.length == 0) {} else {
            var was = [false, false];
            var on = {
                    on: 1,
                    pending: 1
                },
                off = {
                    off: 1,
                    off_red: 1,
                    cross: 1
                };
            for (i in selected) {
                var stat = this.content.data[selected[i]][statusCol];
                if (on[stat]) was[0] = 1;
                if (off[stat]) was[1] = 1;
            }
            if (was[0]) show(buttons[0]);
            if (was[1]) show(buttons[1]);
            show(buttons[2]);
        }
    }

    options.onCheckboxPick = updateButtons;
    options.onRefresh = updateButtons;

    options = Ads.addOfficeFormatFunctions(options);

    var i;
    for (i = 0; i < 3; i++) {
        buttons[i] = getButton(labels[i], changeStatus(i));
    }

    var pt = new PaginatedTable(container, options, content);
    //  pt.getData('/ads?act=a_unions_table&union_id=1000157403&period_key=20111018&sort_key=default_r&offset={offset}&limit={limit}');

    // mass actions
    var container = ge('pt_' + pt.globalNum + '_mass_act_default_container');
    if (container) {
        addClass(container, 'ads_mass_act_container');
        container.appendChild(buttons[1]);
        container.appendChild(buttons[0]);
        container.appendChild(buttons[2]);
        for (i in buttons) {
            hide(buttons[i]);
        }
        show(container);
    }

    // selecting subclasses
    var selectSubclass = function(classes) {
        return function() {
            var corr = 1;
            for (i = 0; i < pt.tableSize; i++) {
                if (i < pt.curFrom || i > pt.curTo) continue;
                var j = pt.permutation[i];
                var curClass = pt.content.data[j][statusCol];
                corr &= ((pt.selection[j] == 1) == (classes[curClass] == 1));
            }
            var checked = 1 ^ corr;
            for (i = 0; i < pt.tableSize; i++) {
                if (i < pt.curFrom || i > pt.curTo) continue;
                var j = pt.permutation[i];
                var curClass = pt.content.data[j][statusCol];
                var curToggle = classes[curClass] ? checked : 0;
                var el = ge('cb_row_' + j + '_' + pt.globalNum);
                if (el) {
                    window[curToggle ? 'addClass' : 'removeClass'](el, 'on');
                }
                pt.toggleCheckbox(false, j, curToggle);
            }
        };
    }
    container = ge('select_all_link');
    if (container) {
        container.onclick = selectSubclass({
            on: 1,
            off: 1,
            off_red: 1,
            cross: 1,
            pending: 1
        });
    }
    container = ge('select_running_link');
    if (container) {
        container.onclick = selectSubclass({
            on: 1
        });
    }
    container = ge('select_stopped_link');
    if (container) {
        container.onclick = selectSubclass({
            off: 1,
            off_red: 1,
            cross: 1
        });
    }
}

Ads.onStatusHover = function(elem, callback, rown, coln) {
    var _t = this;
    var options = {
        status: {
            type: this.content.data[rown][coln],
            title: this.content.extra.status_text[rown][coln]
        },
        items: this.content.extra.status_variants[rown][coln],
        popupTime: -1,
        onSelect: function(event) { // copypasted
            var index = event.target.index,
                unionId = _t.content.extra.union_id[rown][coln],
                hash = _t.content.extra.hash[rown][coln],
                hashDelete = _t.content.extra.hash_delete[rown][coln];

            if (index == 'archived') {
                setTimeout(function() {
                    Ads.openDeleteUnionBox(cur.tableUnionTypeForDelete, unionId, hashDelete, lockChangeStatus, unlockChangeStatus, updateStatusInTable, 1);
                }, 1);
                return;
            }

            var params = {};
            params.union_id = unionId;
            params.hash = hash;
            params.newclass = 1;

            params.enable = ((index == 'on') ? 1 : 0);

            lockChangeStatus();

            function lockChangeStatus() {
                var selectorBox = ge('union_' + unionId + '_status_selector_box');
                var progress = ge('union_' + unionId + '_status_progress');
                hide(selectorBox);
                show(progress);
                return true;
            };

            function unlockChangeStatus() {
                var selectorBox = ge('union_' + unionId + '_status_selector_box');
                var progress = ge('union_' + unionId + '_status_progress');
                hide(progress)
                show(selectorBox);
            }

            function updateStatusInTable(status, status_class, status_type, status_variants) {
                if (!status && !status_class) return;

                var ret = {
                    value: status_class,
                    extra: {
                        status_text: status,
                        status_variants: status_variants
                    },
                    type: status_type
                };

                if (status_class == 'deleted') {
                    ret.listeners = false;
                    ret.extra.link_class = '';
                }
                callback(ret);
            }

            function onRequestComplete(response) {
                unlockChangeStatus();

                if (!isObject(response) || response.error) {
                    debugLog('onFail change status');
                    var errorMessage = (isObject(response) ? response.error : getLang('ads_error_unexpected_error_try_later'));
                    if (response.error_low_budget_link) {
                        showFastBox(getLang('ads_cant_start_ad_box_title'), errorMessage, getLang('ads_budget_box_make_payment'), function() {
                            nav.go(response.error_low_budget_link)
                        });
                    } else {
                        showFastBox(getLang('ads_cant_start_ad_box_title'), errorMessage);
                    }
                    return true;
                }

                var info = '';
                if (response && response.info) {
                    info = response.info;
                }
                debugLog('onDone change status, ' + info);

                updateStatusInTable(response.status, response.status_class, response.status_type, response.status_variants);
                return true;
            }

            ajax.post('/ads?act=a_union_change_status', params, {
                onDone: onRequestComplete,
                onFail: onRequestComplete
            });
        }
    };

    var sdd;
    if (!cur._statusDropdown) {
        var handler = elem.getAttribute('onclick');
        sdd = cur._statusDropdown = Ads.statusDropdown(elem, options);
        elem.setAttribute('onclick', handler);
        elem.onclick = function() {
            eval(handler);
        };
    } else {
        sdd = cur._statusDropdown;
        sdd.hideHeader();
        clearTimeout(sdd.timer);
        sdd.setContainer(elem);
        sdd.setStatus(options.status);
        sdd.setItems(options.items);
        sdd.setHandler(options.onSelect);
    }

    sdd.onOver();
}

Ads.statusDropdown = function(container, options) {
    container = ge(container);
    if (!container) return false;

    options = extend({
        popupTime: 200, // -1 means 'always show entire body'
        status: {
            type: 'off',
            title: 'Disabled'
        },
        onSelect: function() {}
    }, options);

    var compareTypes = function(type1, type2) {
        var same = {
            on: {
                on: 1,
                pending: 1
            },
            off: {
                off: 1,
                off_red: 1,
                cross: 1
            },
            archived: {
                deleted: 1
            }
        };
        if (!same[type1]) return 0;
        return same[type1][type2] || 0;
    }

    var items = clone(options.items);
    for (var i in items) {
        if (compareTypes(items[i]['i'], options.status.type)) {
            delete items[i];
        }
    }

    var imgSpanFake = {
        className: geByClass('ads_status_image_span', container)[0].className
    };
    var imgSpanHTML = '<span class="' + imgSpanFake.className + '"></span>';

    var deltaTop = 0,
        deltaLeft = 0;
    if (browser.opera) deltaTop += -1;
    if (browser.mozilla) deltaTop += -1;
    if (browser.msie) {
        deltaTop += -1;
        deltaLeft += 1;
    }

    var dd = new DropdownMenu(items, {
        title: imgSpanHTML + options.status.title,
        target: container,
        onSelect: options.onSelect,
        showHover: false,
        updateTarget: false,
        offsetTop: -2 + deltaTop,
        offsetLeft: -1 + deltaLeft
    });
    dd.hide();
    addClass(dd.header, 'ads_dd_wide');
    addClass(dd.body, 'ads_dd_wide');

    var showTimer, hideTimer;
    var overListener = function() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = false;
        }
        if (options.popupTime == -1) {
            dd.show();
            return true;
        }
        showTimer = setTimeout(function() {
            showTimer = false;
            ret.showHeader();
        }, options.popupTime);
    };
    var outListenerSoft = function() {
        if (showTimer) {
            clearTimeout(showTimer);
            showTimer = false;
        } else {
            hideTimer = setTimeout(function() {
                hideTimer = false;
                ret.hideHeader();
            }, 500);
        }
    };
    var outListenerHard = function() {
        hideTimer = setTimeout(function() {
            hideTimer = false;
            ret.hideHeader();
        }, 500);
    };

    if (options.popupTime != -1) {
        addEvent(dd.header, 'click', function() {
            removeClass(dd.header, 'ads_dd_header_popup');
        });
        addEvent(container, 'click', function() {
            ret.showBody();
        });

        addEvent(container, 'mouseover', overListener);
        addEvent(container, 'mouseout', outListenerSoft);
        addEvent(dd.header, 'mouseover', overListener);
        addEvent(dd.header, 'mouseout', outListenerHard);
        addEvent(dd.body, 'mouseover', overListener);
        addEvent(dd.body, 'mouseout', outListenerHard);
    }

    var clearTimers = function() {
        if (showTimer) {
            clearTimeout(showTimer);
            showTimer = false;
        }
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = false;
        }
    }

    var ret = {
        getStatus: function() {
            return options.status;
        },
        setStatus: function(status) {
            removeClass(imgSpanFake, 'status_' + options.status.type);
            options.status = status;
            addClass(imgSpanFake, 'status_' + options.status.type);
            dd.setOptions({
                title: '<span class="' + imgSpanFake.className + '"></span>' + options.status.title
            });
        },
        setContainer: function(newContainer) {
            if (!newContainer) return false;
            clearTimers();
            if (options.popupTime != -1) {
                removeEvent(container, 'mouseover', overListener);
                removeEvent(container, 'mouseout', outListenerSoft);
                removeEvent(dd.header, 'mouseover', overListener);
                removeEvent(dd.header, 'mouseout', outListenerHard);
                removeEvent(dd.body, 'mouseover', overListener);
                removeEvent(dd.body, 'mouseout', outListenerHard);
            }
            container = newContainer;
            dd.setOptions({
                target: container
            });
            dd.moveToTarget();
            if (options.popupTime != -1) {
                addEvent(container, 'mouseover', overListener);
                addEvent(container, 'mouseout', outListenerSoft);
                addEvent(dd.header, 'mouseover', overListener);
                addEvent(dd.header, 'mouseout', outListenerHard);
                addEvent(dd.body, 'mouseover', overListener);
                addEvent(dd.body, 'mouseout', outListenerHard);
            }
        },
        setItems: function(newItems) {
            var items = clone(newItems);
            for (var i in items) {
                if (compareTypes(items[i]['i'], options.status.type)) {
                    delete items[i];
                }
            }
            dd.setData(items);
        },
        setHandler: function(handler) {
            dd.setOptions({
                onSelect: handler
            });
        },
        showHeader: function() {
            if (!dd.visible) {
                addClass(dd.header, 'ads_dd_header_popup');
            }
            dd.moveToTarget();
            show(dd.header);
        },
        hideHeader: function() {
            dd.hide();
            hide(dd.header);
            removeClass(dd.header, 'ads_dd_header_popup');
        },
        showBody: function() {
            removeClass(dd.header, 'ads_dd_header_popup');
            dd.show();
        },
        hideBody: function() {
            dd.hide();
        },
        onOver: overListener,
        onOut: outListenerHard
    };

    return ret;
}

Ads.changeDemographyView = function(name, unionId, updateOnly) {

    // Change navigation
    var navCur = ge('ads_demography_navigation_tab_' + name);
    if (!navCur) {
        return;
    }
    navCur = navCur.parentNode;
    var navCurSelected = hasClass(navCur, 'summary_tab_sel');
    if (navCurSelected && !updateOnly || !navCurSelected && updateOnly) {
        return;
    }
    var navElems = [
        ge('ads_demography_navigation_tab_bars_all').parentNode,
        ge('ads_demography_navigation_tab_graphs').parentNode
    ];
    for (var i in navElems) {
        var navElem = navElems[i];
        addClass(navElem, 'summary_tab');
        removeClass(navElem, 'summary_tab_sel');
    }
    addClass(navCur, 'summary_tab_sel');
    removeClass(navCur, 'summary_tab');

    // Change graph
    var bars1 = ge('ads_demography_bars_all_wrap1');
    var bars2 = ge('ads_demography_bars_all_wrap2');
    var graphs1 = ge('ads_demography_graphs_wrap1');
    var graphs2 = ge('ads_demography_graphs_wrap2');

    if (name === 'bars_all') {
        setStyle(bars1, {
            visibility: 'visible',
            height: getSize(bars2)[1] + 'px'
        })
        setStyle(bars2, {
            top: '0'
        })
        setStyle(graphs1, {
            visibility: 'hidden',
            height: '0'
        });
    } else if (name === 'graphs') {
        if (!Ads.loadDemography(unionId)) {
            return;
        }

        !cur.graphUsersStatsSexEmpty && cur.pageGraphs['ads_graph_users_stats_day_sex'].loadGraph(intval(cur.lastDemographySourceOffset));
        !cur.graphUsersStatsAgeEmpty && cur.pageGraphs['ads_graph_users_stats_day_age'].loadGraph(intval(cur.lastDemographySourceOffset) * 3 + intval(cur.lastDemographyAgeOffset));
        !cur.graphUsersStatsCitiesEmpty && cur.pageGraphs['ads_graph_users_stats_day_cities'].loadGraph(intval(cur.lastDemographySourceOffset));

        setStyle(graphs2, {
            width: getSize(graphs1)[0] + 'px'
        });
        setStyle(graphs1, {
            visibility: 'visible',
            height: getSize(graphs2)[1] + 'px'
        });
        setStyle(bars1, {
            visibility: 'hidden',
            height: '0'
        });
        setStyle(bars2, {
            position: 'absolute',
            top: '-100000px'
        });

        if (cur.can_show_views_stats_only) {
            Ads.changeDemographySource('views');
        }
    }
}

Ads.changeDemographySource = function(name) {

    // Change navigation
    var clicksSideNav = ge('ads_demography_navigation_clicks');
    var viewsSideNav = ge('ads_demography_navigation_views');
    var clicksTabNav = ge('ads_demography_navigation_tab_clicks');
    var viewsTabNav = ge('ads_demography_navigation_tab_views');
    if (clicksTabNav) {
        clicksTabNav = clicksTabNav.parentNode;
        viewsTabNav = viewsTabNav.parentNode;
    }
    if (name == 'clicks') {
        if (clicksSideNav) {
            if (hasClass(clicksSideNav, 'nav_selected')) {
                return;
            }
            addClass(clicksSideNav, 'nav_selected');
            removeClass(viewsSideNav, 'nav_selected');
        }
        if (clicksTabNav) {
            if (hasClass(clicksTabNav, 'summary_tab_sel')) {
                return;
            }
            addClass(clicksTabNav, 'summary_tab_sel');
            addClass(viewsTabNav, 'summary_tab');
            removeClass(clicksTabNav, 'summary_tab');
            removeClass(viewsTabNav, 'summary_tab_sel');
        }
    } else {
        if (clicksSideNav) {
            if (hasClass(viewsSideNav, 'nav_selected')) {
                return;
            }
            addClass(viewsSideNav, 'nav_selected');
            removeClass(clicksSideNav, 'nav_selected');
        }
        if (clicksTabNav) {
            if (hasClass(viewsTabNav, 'summary_tab_sel')) {
                return;
            }
            addClass(viewsTabNav, 'summary_tab_sel');
            addClass(clicksTabNav, 'summary_tab');
            removeClass(viewsTabNav, 'summary_tab');
            removeClass(clicksTabNav, 'summary_tab_sel');
        }
    }

    // Change graph
    if (name == 'clicks') {
        cur.lastDemographySourceOffset = 0;
        if (cur.isDemographySvg) {
            each(geByClass('ads_demography_bars_clicks'), function(i, el) {
                el.style.visibility = 'visible';
                el.style.position = 'relative';
            });
            each(geByClass('ads_demography_bars_views'), function(i, el) {
                el.style.visibility = 'hidden';
                el.style.position = 'absolute';
            });
        } else {
            each(geByClass('ads_demography_bars_clicks'), show);
            each(geByClass('ads_demography_bars_views'), hide);
        }
        try {
            cur.pageGraphs['ads_graph_users_stats_day_sex'].loadGraph(intval(cur.lastDemographySourceOffset));
        } catch (e) {}
        try {
            cur.pageGraphs['ads_graph_users_stats_day_age'].loadGraph(intval(cur.lastDemographySourceOffset) * 3 + intval(cur.lastDemographyAgeOffset));
        } catch (e) {}
        try {
            cur.pageGraphs['ads_graph_users_stats_day_cities'].loadGraph(intval(cur.lastDemographySourceOffset));
        } catch (e) {}
    } else {
        cur.lastDemographySourceOffset = 1;
        if (cur.isDemographySvg) {
            each(geByClass('ads_demography_bars_views'), function(i, el) {
                el.style.visibility = 'visible';
                el.style.position = 'relative';
            });
            each(geByClass('ads_demography_bars_clicks'), function(i, el) {
                el.style.visibility = 'hidden';
                el.style.position = 'absolute';
            });
        } else {
            each(geByClass('ads_demography_bars_views'), show);
            each(geByClass('ads_demography_bars_clicks'), hide);
        }
        try {
            cur.pageGraphs['ads_graph_users_stats_day_sex'].loadGraph(intval(cur.lastDemographySourceOffset));
        } catch (e) {}
        try {
            cur.pageGraphs['ads_graph_users_stats_day_age'].loadGraph(intval(cur.lastDemographySourceOffset) * 3 + intval(cur.lastDemographyAgeOffset));
        } catch (e) {}
        try {
            cur.pageGraphs['ads_graph_users_stats_day_cities'].loadGraph(intval(cur.lastDemographySourceOffset));
        } catch (e) {}
    }
}

Ads.changeDemographyAge = function(name) {
    // Change navigation
    var allNav = ge('ads_demography_navigation_tab_age_all').parentNode;
    var femaleNav = ge('ads_demography_navigation_tab_age_female').parentNode;
    var maleNav = ge('ads_demography_navigation_tab_age_male').parentNode;
    switch (name) {
        case 'all':
            if (hasClass(allNav, 'summary_tab_sel')) {
                return;
            }
            addClass(allNav, 'summary_tab_sel');
            addClass(femaleNav, 'summary_tab');
            addClass(maleNav, 'summary_tab');
            removeClass(allNav, 'summary_tab');
            removeClass(femaleNav, 'summary_tab_sel');
            removeClass(maleNav, 'summary_tab_sel');
            break;
        case 'female':
            if (hasClass(femaleNav, 'summary_tab_sel')) {
                return;
            }
            addClass(femaleNav, 'summary_tab_sel');
            addClass(allNav, 'summary_tab');
            addClass(maleNav, 'summary_tab');
            removeClass(femaleNav, 'summary_tab');
            removeClass(allNav, 'summary_tab_sel');
            removeClass(maleNav, 'summary_tab_sel');
            break;
        case 'male':
            if (hasClass(maleNav, 'summary_tab_sel')) {
                return;
            }
            addClass(maleNav, 'summary_tab_sel');
            addClass(allNav, 'summary_tab');
            addClass(femaleNav, 'summary_tab');
            removeClass(maleNav, 'summary_tab');
            removeClass(allNav, 'summary_tab_sel');
            removeClass(femaleNav, 'summary_tab_sel');
            break;
        default:
            return;
    }

    // Change graph
    switch (name) {
        case 'all':
            cur.lastDemographyAgeOffset = 0;
            break;
        case 'female':
            cur.lastDemographyAgeOffset = 1;
            break;
        case 'male':
            cur.lastDemographyAgeOffset = 2;
            break;
        default:
            return;
    }
    try {
        cur.pageGraphs['ads_graph_users_stats_day_age'].loadGraph(intval(cur.lastDemographySourceOffset) * 3 + intval(cur.lastDemographyAgeOffset));
    } catch (e) {}
}

Ads.loadDemography = function(unionId) {
    if (!cur.demographyDelayed) {
        return true;
    }
    if (!Ads.lock('load_demography', lock, unlock)) {
        return false;
    }

    var ajaxParams = {};
    ajaxParams.union_id = unionId;

    ajax.post('/ads?act=a_users_stats', ajaxParams, {
        onDone: onComplete,
        onFail: onComplete
    });

    function lock() {
        setStyle('ads_demography_navigation_tab_progress', {
            visibility: 'visible'
        });
    }

    function unlock() {
        setStyle('ads_demography_navigation_tab_progress', {
            visibility: 'hidden'
        });
    }

    function onComplete(response) {
        Ads.unlock('load_demography');
        if (response && response.graphs_html && response.graphs_js) {
            cur.demographyDelayed = false;
            ge('ads_demography_graphs_wrap2').innerHTML = response.graphs_html;
            eval(response.graphs_js);
            Ads.changeDemographyView('graphs', unionId, true);
        }
        return true;
    }

    return false;
}

Ads.showEditAdminBox = function(event, unionId, userId, userEmail, isRemove) {
    if (event && (event.which > 1 || event.button > 1 || event.ctrlKey)) {
        return;
    }

    userId = intval(userId);

    if (!userId && !userEmail) {
        var userLink = ge('ads_user_link').getValue();
        if (!userLink) {
            showFastBox(getLang('ads_error_box_title'), getLang('ads_edit_admin_no_user_link'));
            return;
        }
    }

    if (isRemove) {
        cur.editAdminBoxTitle = getLang('ads_edit_admin_box_title_remove');
    } else {
        if (userId || userEmail) {
            cur.editAdminBoxTitle = getLang('ads_edit_admin_box_title_edit');
        } else {
            cur.editAdminBoxTitle = getLang('ads_edit_admin_box_title_add');
        }
    }

    var ajaxParams = {};
    ajaxParams.union_id = unionId;
    if (isRemove) {
        ajaxParams.action = 'remove';
    } else {
        ajaxParams.action = 'edit';
    }
    if (userId) {
        ajaxParams.user_link = userId;
    } else if (userEmail) {
        ajaxParams.user_link = userEmail;
    } else {
        ajaxParams.user_link = userLink;
    }

    var showOptions = {
        params: {}
    };
    showOptions.onFail = Ads.onBoxFail;
    showOptions.params.width = 440;

    showBox('/ads?act=a_edit_admin_box', ajaxParams, showOptions);

    return false;
}

Ads.showRetargetingGroupActions = function(el, groupId, hasAttachedPixel, canRequestLookalike, isShared, canShare) {
    cur.options.groupId = groupId;
    cur.uiRetargetingActions.setOptions({
        target: el
    });
    var editRuleEl = geByClass1('ads_retargeting_menu_edit_rule', cur.uiRetargetingActions.rows);
    var editAudienceEl = geByClass1('ads_retargeting_menu_edit_audience', cur.uiRetargetingActions.rows);
    var addAudienceEl = geByClass1('ads_retargeting_menu_add_audience', cur.uiRetargetingActions.rows);
    var excludeAudienceEl = geByClass1('ads_retargeting_menu_exclude_audience', cur.uiRetargetingActions.rows);
    var shareAudienceEl = geByClass1('ads_retargeting_menu_share_audience', cur.uiRetargetingActions.rows);
    if (hasAttachedPixel) {
        show(editRuleEl);
        show(addAudienceEl);
        hide(editAudienceEl);
    } else {
        hide(editRuleEl);
        hide(addAudienceEl);
        show(editAudienceEl);
    }
    if (isShared) {
        hide(addAudienceEl);
        hide(editAudienceEl);
        hide(excludeAudienceEl);
    }

    if (canShare) {
        show(shareAudienceEl);
    } else {
        hide(shareAudienceEl);
    }

    var requestLookalikeEl = geByClass1('ads_retargeting_menu_request_lookalike', cur.uiRetargetingActions.rows);
    if (canRequestLookalike) {
        show(requestLookalikeEl);
    } else {
        hide(requestLookalikeEl);
    }

    geByClass1('ads_retargeting_menu_header', cur.uiRetargetingActions.rows).innerHTML = el.innerHTML;
    cur.uiRetargetingActions.show();
}

Ads.showRetargetingGroupBox = function(act, addParams, boxParams) {
    if (!boxParams) {
        boxParams = {};
    }

    var hideButtons;
    if (addParams.hideButtons) {
        hideButtons = true;
        delete addParams.hideButtons;
    } else {
        hideButtons = false;
    }
    var ajaxParams = {};
    ajaxParams.union_id = cur.options.unionId;
    if (cur.options.groupId) {
        ajaxParams.group_id = cur.options.groupId;
        ajaxParams.smart_pixel_id = cur.options.groupId;
    }
    if (addParams) {
        ajaxParams = extend(ajaxParams, addParams);
    }

    var showOptions = {
        params: {
            width: 480,
            dark: true,
            hideButtons: hideButtons,
            bodyStyle: 'padding: 0;'
        }
    };
    showOptions.onFail = Ads.onBoxFail;
    extend(showOptions.params, boxParams);

    return showBox('/ads?act=a_retargeting_group_' + act + '_box', ajaxParams, showOptions);
}

Ads.showLookalikeExportBox = function(lookalikeRequestId) {
    if (!lookalikeRequestId || !cur.options.unionId) {
        return false;
    }

    var ajaxParams = {
        union_id: cur.options.unionId,
        lookalike_request_id: lookalikeRequestId
    };

    var showOptions = {
        onFail: Ads.onBoxFail,
        params: {
            width: 480,
            dark: true,
            bodyStyle: 'padding: 20px;',
            onHide: function() {
                var loc = nav.objLoc;
                delete loc.lookalike_request_id;
                nav.setLoc(loc);
                return true;
            }
        }
    };
    showBox('/ads?act=a_lookalike_export_audience_box', ajaxParams, showOptions);

    return true;
}



Ads.retargetingCreateRuleArgumentInput = function(id, type, rule) {
    var ruleIndex = false;
    for (var i in cur.smartPixelRules) {
        if (cur.smartPixelRules[i].id == id) {
            ruleIndex = i;
            break;
        }
    }
    if (ruleIndex === false) {
        return;
    }

    // cleanup
    if (cur.smartPixelRules[ruleIndex].selector) {
        cur.smartPixelRules[ruleIndex].selector.destroy();
        delete cur.smartPixelRules[ruleIndex].selector;
    }
    if (cur.smartPixelRules[ruleIndex].input) {
        delete cur.smartPixelRules[ruleIndex].input;
    }
    cur.smartPixelRules[ruleIndex].argumentWrapper.innerHTML = '';

    // create new input
    var ruleArgumentsInput;
    if (inArray(type, [cur.ruleTypesConstants.ADS_RETARGETING_RULE_TYPE_SUBSTR, cur.ruleTypesConstants.ADS_RETARGETING_RULE_TYPE_SUBSTR_ACTION])) {
        ruleArgumentsInput = ce('input', {
            type: "hidden",
            id: 'retargeting_rule_argument_' + id
        });
    } else {
        ruleArgumentsInput = ce('input', {
            type: "text",
            autocomplete: "off",
            className: "dark retargeting_rule_argument",
            id: 'retargeting_rule_argument_' + id
        });
    }

    cur.smartPixelRules[ruleIndex].argumentWrapper.appendChild(ruleArgumentsInput);

    if (inArray(type, [cur.ruleTypesConstants.ADS_RETARGETING_RULE_TYPE_SUBSTR, cur.ruleTypesConstants.ADS_RETARGETING_RULE_TYPE_SUBSTR_ACTION])) {
        cur.smartPixelRules[ruleIndex].selector = new Selector(ruleArgumentsInput, [], {
            multiselect: true,
            dropdown: false,
            enableCustom: true,
            multiCustom: true,
            valueIsCustom: true,
            autocomplete: true,
            width: 278,
            big: true,
            noResult: '',
            tokenPrefix: getLang('ads_retargeting_rule_token_prefix_and'),
            addCustomTokenOnKeys: [32, 188], // space and comma
            selectedItems: (id > 0 && rule && rule.substrings) ? rule.substrings : []
        });
        setTimeout(function() {
            cur.smartPixelRules[ruleIndex].selector.focus();
        }, 0);
    } else {
        val(ruleArgumentsInput, (id > 0 && rule && rule.regex) ? rule.regex : ((rule && rule.string) ? rule.string : '')); // ADS_RETARGETING_RULE_TYPE_
        cur.smartPixelRules[ruleIndex].input = ruleArgumentsInput;
        setTimeout(elfocus.pbind(cur.smartPixelRules[ruleIndex].input), 0);
    }
}

Ads.retargetingUpdateDeleteRuleVisibility = function() {
    if (cur.smartPixelRules.length == 1) {
        addClass(cur.smartPixelRules[0].ruleDeleteButton, 'unshown');
    } else {
        each(cur.smartPixelRules, function(k, v) {
            removeClass(cur.smartPixelRules[k].ruleDeleteButton, 'unshown');
        });
    }
}

Ads.retargetingCheckSmartPixelRulesCount = function() {
    cur.smartPixelRules = cur.smartPixelRules || [];

    var limit = 10;

    if (cur.smartPixelRules.length >= limit) {
        hide('ads_retargeting_add_parameter_link');
        return false;
    } else {
        show('ads_retargeting_add_parameter_link');
    }

    return true;
}

Ads.retargetingAddSmartPixelRule = function(id, type, rule) {
    var container = ge('ads_retargeting_edit_rule_parameters');
    var ruleContainer = ce('div', {
        className: 'ads_retargeting_edit_rule_parameter_wrap'
    });

    var ruleDeleteButton = ce('div', {
        className: 'ads_retargeting_rule_delete',
        title: getLang('global_delete')
    });
    addEvent(ruleDeleteButton, 'click', function() {
        if (cur.smartPixelRules.length < 2) {
            return false;
        }
        var ruleIndex = false;
        for (var i in cur.smartPixelRules) {
            if (cur.smartPixelRules[i].id == id) {
                ruleIndex = i;
                break;
            }
        }
        if (ruleIndex === false) {
            return;
        }
        if (cur.smartPixelRules[ruleIndex].selector) {
            cur.smartPixelRules[ruleIndex].selector.destroy();
        }

        re(cur.smartPixelRules[ruleIndex].ruleContainer);
        delete cur.smartPixelRules[ruleIndex];
        cur.smartPixelRules.splice(ruleIndex, 1);
        Ads.retargetingUpdateDeleteRuleVisibility();
        Ads.retargetingCheckSmartPixelRulesCount();
    });
    ruleContainer.appendChild(ruleDeleteButton);

    cur.smartPixelRules = cur.smartPixelRules || [];
    id = id || -(+(new Date()) % 100000000);

    var ruleTypeDropdown = ce('input', {
        type: 'hidden',
        id: 'retargeting_rule_type_' + id
    });

    var ruleTypeDropdownWrapper = ce('div', {
        className: 'ads_retargeting_rule_type_wrapper'
    });

    ruleTypeDropdownWrapper.appendChild(ruleTypeDropdown);
    ruleContainer.appendChild(ruleTypeDropdownWrapper);

    var ruleArgumentWrapper = ce('div', {
        className: 'ads_retargeting_rule_argument_wrapper'
    });

    ruleContainer.appendChild(ruleArgumentWrapper);
    container.appendChild(ruleContainer);

    var ruleObject = {
        id: id,
        type: type,
        ruleContainer: ruleContainer,
        ruleDeleteButton: ruleDeleteButton,
        argumentWrapper: ruleArgumentWrapper
    };

    ruleObject.typeDropdown = new Dropdown(ge('retargeting_rule_type_' + id), cur.ruleTypes.types, {
        selectedItems: type,
        width: 140,
        resultListWidth: 200,
        dark: true,
        onChange: function(value) {
            Ads.retargetingCreateRuleArgumentInput(id, value);
        }
    });
    cur.smartPixelRules.push(ruleObject);

    Ads.retargetingCreateRuleArgumentInput(id, type, rule);
    Ads.retargetingUpdateDeleteRuleVisibility();
    Ads.retargetingCheckSmartPixelRulesCount();
}

Ads.retargetingUpdateWip = function(unionId) {
    if (!cur.options.unionId || !cur.options.wip_hash) {
        if (cur.adsRetargetingWipInterval) {
            clearInterval(cur.adsRetargetingWipInterval);
            cur.adsRetargetingWipInterval = null;
        }

        return;
    }
    ajax.post('/ads?act=a_retargeting_update_wip', {
        union_id: cur.options.unionId,
        hash: cur.options.wip_hash
    }, {
        onDone: function(response, files_statuses) {
            var el;
            for (var groupId in response) {
                el = ge('union_' + groupId + '_updated');
                if (el) {
                    el.innerHTML = response[groupId];
                }
            }
            for (var fileKey in files_statuses) {
                el = ge('ads_retargeting_wip_file_' + fileKey);
                if (el) {
                    el.innerHTML = files_statuses[fileKey];
                }
            }
        },
        onFail: function(msg) {
            if (cur.adsRetargetingWipInterval) {
                clearInterval(cur.adsRetargetingWipInterval);
                cur.adsRetargetingWipInterval = null;
            }
            return true;
        }
    });
}

Ads.saveRetargetingGroupParam = function(id, v) {
    var el = ge('ads_retargeting_' + id);
    if (el) {
        v = trim(val(el));
    } else if (!el && v === undefined) {
        return;
    }
    hide('ads_retargeting_box_error');

    ajax.post('/ads?act=a_retargeting_save_params', {
        union_id: cur.options.unionId,
        group_id: cur.options.groupId,
        type: id,
        value: v,
        hash: cur.options.saveHash
    }, {
        onDone: function(value) {
            var value_s = value;
            if (id === 'domain' && !value_s) {
                value_s = getLang('ads_retargeting_domain_not_set');
            }

            (ge('ads_retargeting_' + cur.options.groupId + '_' + id) || {}).innerHTML = value;

            var value_s_el = ge('ads_retargeting_' + id + '_text');
            if (value_s_el) {
                value_s_el.innerHTML = value_s;
            }
            var value_el = ge('ads_retargeting_' + id);
            if (value_el) {
                value_el.innerHTML = value;
            }
            cur.values = cur.values || {};
            cur.values[id] = value;

            val('union_' + cur.options.groupId + '_' + id, value);
            cur.paramsTOs = cur.paramsTOs || {};
            var labelEl = ge('ads_retargeting_' + id + '_saved');
            if (labelEl) {
                Ads.toggleRetargetingInput(id, false);

                setStyle(labelEl, 'opacity', 1);
                clearTimeout(cur.paramsTOs[id]);
                cur.paramsTOs[id] = setTimeout(function() {
                    animate(labelEl, {
                        opacity: 0
                    }, 1000);
                }, 3000);
            } else {
                curBox().hide();
            }
        },
        onFail: function(msg) {
            ge('ads_retargeting_box_error').innerHTML = msg;
            show('ads_retargeting_box_error');
            return true;
        },
        showProgress: function() {
            var el = ge('ads_retargeting_save_' + id);
            if (el && el.tagName == 'BUTTON') {
                lockButton(el);
            }
        },
        hideProgress: function() {
            var el = ge('ads_retargeting_save_' + id);
            if (el && el.tagName == 'BUTTON') {
                unlockButton(el);
            }
        }
    });

    return true;
}

Ads.copyRetargetingGroup = function() {
    if (!cur.options.unionId || !cur.options.groupId) {
        return false;
    }

    target_client_union_id = trim(val(ge('ads_retargeting_copy_to_client_id')))

    var options = {
        union_id: cur.options.unionId,
        retargeting_group_id: cur.options.groupId,
        target_client_union_id: target_client_union_id,
        hash: cur.options.copyHash,
        is_mirror: +cur.isMirrorCheckbox.checked()
    };

    ajax.post('/ads?act=a_retargeting_copy_group', options, {
        onDone: function(html) {
            ge('ads_retargeting_processing_msg').innerHTML = getLang('ads_retargeting_group_copy_status_queued');
            var progressBarContent = geByClass1('ads_upload_progress_wrap', ge('ads_retargeting_box_processing'));
            progressBarContent.innerHTML = '<div id="copy_' + cur.options.groupId + '_progress" class="ads_upload_progress"></div>';
            hide(ge('ads_retargeting_copy_form'));
            show(ge('ads_retargeting_box_processing'));
            cur.options.checkStatusIntervalId = setInterval(Ads.copyRetargetingGroupStatus, 1000)
            lockButton("ads_retargeting_copy_box_button");
        },
        onFail: function(msg) {
            ge('ads_retargeting_box_error').innerHTML = msg;
            show('ads_retargeting_box_error');
            return true;
        },
        showProgress: function() {
            lockButton("ads_retargeting_copy_box_button");
        },
        hideProgress: function() {
            unlockButton("ads_retargeting_copy_box_button");
        }
    })
}

Ads.copyRetargetingGroupStatus = function() {
    var options = {
        union_id: cur.options.unionId,
        retargeting_group_id: cur.options.groupId,
        target_client_union_id: target_client_union_id,
    };
    ajax.post("/ads?act=a_retargeting_copy_group_check_status", options, {
        onDone: function(data) {
            if (data[0] == cur.const['ADS_RETARGETING_QUEUE_COPY_STATUS_DONE']) {
                clearInterval(cur.options.checkStatusIntervalId)
                setStyle(ge('copy_' + cur.options.groupId + '_progress'), {
                    width: '100%'
                });
                ge('ads_retargeting_groups_table').innerHTML = data[1];
                Ui.tableInitFilters(geByClass1('ui_table'));
                curBox().hide();
                showDoneBox(getLang('ads_retargeting_group_copy_status_done'), {
                    out: 2000
                });
            }

            if (data[0] == cur.const['ADS_RETARGETING_QUEUE_COPY_STATUS_IN_PROGRESS']) {
                var percent = intval(data[1] / data[2] * 100);
                var statusMessage = getLang('ads_retargeting_group_copy_status_in_progress', data[1]);
                statusMessage = statusMessage.replace('{all_count}', data[2]);
                ge('ads_retargeting_processing_msg').innerHTML = statusMessage;
                setStyle(ge('copy_' + cur.options.groupId + '_progress'), {
                    width: percent + '%'
                });
            }
        },
        onFail: function(msg) {
            clearInterval(cur.options.checkStatusIntervalId)
            ge('ads_retargeting_box_error').innerHTML = msg;
            show('ads_retargeting_box_error');
            hide(ge('ads_retargeting_box_processing'));
            unlockButton("ads_retargeting_copy_box_button");
            return true;
        },
    })
}

Ads.deleteRetargetingGroup = function() {
    if (!cur.options.unionId || !cur.options.groupId) {
        return false;
    }

    cur.uiRetargetingActions.hide(); //
    var confirm_message = (cur.options.current_tab === 'pixels') ? getLang('ads_retargeting_del_smart_pixel_confirm_message') : getLang('ads_retargeting_del_audience_confirm_message');
    var box = showFastBox(getLang('ads_retargeting_del_confirm_title'), confirm_message, getLang('box_yes'), function() {
        ajax.post('/ads?act=a_del_retargeting_group', {
            union_id: cur.options.unionId,
            group_id: cur.options.groupId,
            hash: cur.options.del_hash
        }, {
            onDone: function(html) {
                ge('ads_retargeting_groups_table').innerHTML = html;
                Ui.tableInitFilters(geByClass1('ui_table'));
                curBox().hide();
            },
            onFail: function(err) {
                curBox().hide();
                if (err) {
                    showFastBox(getLang('ads_error_box_title'), err);
                } else {
                    showFastBox(getLang('ads_error_box_title'), getLang('ads_error_box_title'));
                }
                return true;
            },
            showProgress: box.showProgress,
            hideProgress: box.hideProgress
        });
    }, getLang('box_no'));

    return false;
}

Ads.prepareLookalikeRequestRetargetingGroupInput = function(inputData) {
    if (!cur.options.groupId) {
        cur.selector = new Autocomplete(ge('retargeting_group_selector'), inputData, {
            placeholder: getLang('ads_lookalike_retargeting_group_selector_placeholder'),
            width: 408,
            big: true,
            multiselect: false
        })
    }
}


Ads.retargetingGroupRequestLookalike = function() {
    if (!cur.options.unionId || !cur.options.requestLookalikeHash) {
        return false;
    }

    groupId = cur.selector ? cur.selector.val() : cur.options.groupId;

    if (!groupId) {
        return false;
    }

    var refererTab = nav.objLoc['show'];
    ajax_params = {
        union_id: cur.options.unionId,
        group_id: groupId,
        hash: cur.options.requestLookalikeHash,
        referer_tab: refererTab,
    }

    ajax.post('/ads?act=a_lookalike_request', ajax_params, {
        onDone: function(html) {
            if (refererTab == 'lookalike') {
                ge('ads_retargeting_groups_table').innerHTML = html
            }
            curBox().hide()
            return true;
        },
        onFail: function(err) {
            ge('ads_lookalike_box_error').innerHTML = err;
            show('ads_lookalike_box_error');
            return true;
        },
        showProgress: lockButton.pbind('ads_retargeting_box_request_lookalike_button'),
        hideProgress: unlockButton.pbind('ads_retargeting_box_request_lookalike_button')
    })

}

Ads.lookalikeExportAudience = function(lookalikeRequestId, exportAudienceHash) {
    if (!cur.options.unionId || !lookalikeRequestId || !exportAudienceHash) {
        return false;
    }
    segment = ge('ads_lookalike_slider_export_audience').value
    // segment = ge('ads_lookalike_export_segment_selector').querySelector('input[name=lookalikeSegment]:checked').value

    var ajaxParams = {
        union_id: cur.options.unionId,
        lookalike_request_id: lookalikeRequestId,
        segment: segment,
        hash: exportAudienceHash
    };

    ajax.post('/ads?act=a_lookalike_export_audience', ajaxParams, {
        onDone: function(html) {
            ge('ads_retargeting_groups_table').innerHTML = html;
            curBox().hide();
        },
        onFail: function(err) {
            ge('ads_lookalike_box_error').innerHTML = err;
            show('ads_lookalike_box_error');
            return true;
        },
        showProgress: curBox().showProgress,
        hideProgress: curBox().hideProgress
    });

    return false;
}

Ads.lookalikeExportAudienceInitSlider = function() {
    segmentMin = Math.min.apply(null, Object.keys(cur.lookalikeSegments));
    segmentMax = Math.max.apply(null, Object.keys(cur.lookalikeSegments));

    slider = ge('ads_lookalike_slider_export_audience');
    slider.min = segmentMin;
    slider.max = segmentMax;
    if (slider.max == slider.min) {
        hide('ads_lookalike_slider_export_audience_block');
        show(geByClass1('ads_lookalike_no_slider'));
    }
    Ads.lookalikeExportAudienceMoveSlider(slider.min);
}

Ads.lookalikeExportAudienceMoveSlider = function(segment_number) {
    segment = cur.lookalikeSegments[segment_number]
    ge('ads_lookalike_audience_size').innerHTML = segment.audienceCount;
    var hint = ge('ads_lookalike_audience_hint');
    if (hint) {
        hint.setAttribute('data-title', '��������: ' + segment.precision + '%<br> �������: ' + segment.recall + "%");
    }
}

Ads.retargetingShareGroup = function(groupId, hash) {
    ajax.post('/ads?act=a_retargeting_share_group', {
        union_id: cur.options.unionId,
        group_id: groupId,
        hash: hash,
        link: val('retargeting_group_share_target')
    }, {
        onDone: function(title, message) {
            curBox().hide();
            showFastBox({
                title: title
            }, message);
            return true;
        },
        onFail: function(err) {
            ge('ads_retargeting_box_error').firstChild.innerHTML = err;
            show('ads_retargeting_box_error');
            elfocus('retargeting_group_share_target');
            return true;
        },
        showProgress: function() {
            hide('ads_retargeting_box_error');
            lockButton('retargeting_group_share_button');
            disable('retargeting_group_share_target', true);
        },
        hideProgress: function() {
            unlockButton('retargeting_group_share_button');
            disable('retargeting_group_share_target', false);
        }
    });
}

Ads.retargetingShareGroupAccept = function(shareHash, hash) {
    var targetUnionId;
    if (cur.rtrgShareAcceptUnionDropdown) {
        if (!cur.rtrgShareAcceptUnionDropdown.val()) {
            notaBene(cur.rtrgShareAcceptUnionDropdown.container);
            return
        }
        targetUnionId = cur.rtrgShareAcceptUnionDropdown.val();
    } else {
        targetUnionId = cur.rtrgShareAcceptUnionId;
    }

    ajax.post('/ads?act=a_retargeting_share_group_accept', {
        share_hash: shareHash,
        hash: hash,
        union_id: targetUnionId
    }, {
        onDone: function() {
            curBox().hide();
            return true;
        },
        onFail: function(err) {
            ge('ads_retargeting_box_error').firstChild.innerHTML = err;
            show('ads_retargeting_box_error');
            return true;
        },
        showProgress: function() {
            hide('ads_retargeting_box_error');
            lockButton('ads_retargeting_share_accept_button');
        },
        hideProgress: function() {
            unlockButton('ads_retargeting_share_accept_button');
        }
    });
}

Ads.retargetingShareGroupLinkRefresh = function(groupId, hash, remove) {
    ajax.post('/ads?act=a_retargeting_share_group_link_refresh', {
        union_id: cur.options.unionId,
        group_id: groupId,
        hash: hash,
        remove: intval(remove),
    }, {
        onDone: function(link) {
            if (remove) {
                show('retargeting_group_share_link_switcher');
                hide('retargeting_group_share_link_wrapper');
            } else {
                val('retargeting_group_share_link', link);
                hide('retargeting_group_share_link_switcher');
                show('retargeting_group_share_link_wrapper');
            }

            unlockLink('retargeting_group_share_link_copy', ['link_lock_disabled']);
            ge('retargeting_group_share_link_copy').innerHTML = getLang('ads_retargeting_group_share_link_copy');
            return true;
        },
        onFail: function(err) {
            ge('ads_retargeting_box_error').firstChild.innerHTML = err;
            show('ads_retargeting_box_error');
            return true;
        },
        showProgress: function() {
            hide('ads_retargeting_box_error');
            lockLink('retargeting_group_share_link_refresh', ['link_lock_disabled']);
            lockLink('retargeting_group_share_link_remove', ['link_lock_disabled']);
            lockLink('retargeting_group_share_link_switcher_link', ['link_lock_disabled']);
        },
        hideProgress: function() {
            unlockLink('retargeting_group_share_link_refresh', ['link_lock_disabled']);
            unlockLink('retargeting_group_share_link_remove', ['link_lock_disabled']);
            unlockLink('retargeting_group_share_link_switcher_link', ['link_lock_disabled']);
        }
    });
}

Ads.retargetingCheckLink = function() {
    hide('ads_retargeting_box_error');
    hide('ads_retargeting_check_link_results');

    var link = val('ads_retargeting_check_link_input').trim();
    if (!link) {
        notaBene('ads_retargeting_check_link_input');
        return false;
    }

    ajax.post('/ads?act=a_retargeting_check_link', {
        union_id: cur.options.unionId,
        link: link
    }, {
        onDone: function(html) {
            ge('ads_retargeting_check_link_results').innerHTML = html;
            show('ads_retargeting_check_link_results');
            elfocus('ads_retargeting_check_link_input');
            return true;
        },
        onFail: function(err) {
            ge('ads_retargeting_box_error').innerHTML = err;
            show('ads_retargeting_box_error');
            return true;
        },
        showProgress: lockButton.pbind('ads_retargeting_check_link_button'),
        hideProgress: unlockButton.pbind('ads_retargeting_check_link_button')
    });
}

Ads.retargetingCreatePixel = function() {
    /*if (cur.retargetingIsEdit) {
      cur.retargetingDeferAudienceCreation = {
        group_id: cur.options.groupId
      };
    } else {
      cur.retargetingDeferAudienceCreation = {
        name: val('retargeting_group_name')
      };
    }*/

    curBox().hide();
    if (cur.options.groupId) {
        delete cur.options.groupId;
    }
    Ads.showRetargetingGroupBox('edit_smart_pixel', {
        redirect: 1
    });
}

Ads.retargetingSaveSmartPixel = function() {
    var box = curBox();

    var options = {
        'name': val('retargeting_smart_pixel_name').trim(),
        'domain': val('retargeting_smart_pixel_domain').trim(),
        'hash': val('retargeting_smart_pixel_hash'),
        'category_id': cur.uiRetargetingSmartPixelCategorySelector.val(),
        'union_id': cur.options.unionId,
        'smart_pixel_id': box.groupId,
        'redirect': cur.retargetingRedirectAfterSmartPixelSave
    };
    if (cur.retargetingRedirectAfterSmartPixelSave) {
        delete cur.retargetingRedirectAfterSmartPixelSave;
    }

    if (!options.name) {
        notaBene('retargeting_smart_pixel_name');
        return;
    }

    hide('ads_retargeting_box_error');

    ajax.post('/ads?act=a_retargeting_save_smart_pixel', options, {
        onDone: function(smart_pixel_id, name, domain, table_html) {
            (ge('ads_retargeting_' + smart_pixel_id + '_name') || {}).innerHTML = name;
            (ge('ads_retargeting_' + smart_pixel_id + '_domain') || {}).innerHTML = domain;
            box.hide();
            if (cur.retargetingDeferAudienceCreation) {
                Ads.showRetargetingGroupBox('edit', cur.retargetingDeferAudienceCreation);
                delete cur.retargetingDeferAudienceCreation;
            } else if (!cur.options.groupId) { // show box only when creating pixel
                Ads.showRetargetingGroupBox('edit_smart_pixel', {
                    smart_pixel_id: smart_pixel_id,
                    only_code: 1
                });
            }
            if (cur.options.current_tab === 'pixels') {
                ge('ads_retargeting_groups_table').innerHTML = table_html;
                Ui.tableInitFilters(geByClass1('ui_table'));
            }
        },
        onFail: function(err) {
            var msg;
            if (err) {
                msg = err;
            } else {
                msg = getLang('ads_error_box_title');
            }
            ge('ads_retargeting_box_error').innerHTML = msg;
            show('ads_retargeting_box_error');

            return true;
        },
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
    });
}

Ads.toggleRetargetingInput = function(id, show) {
    var link = ge('ads_retargeting_' + id + '_link'),
        input = ge('ads_retargeting_' + id);
    if (!link || !input) return false;
    if (!show && isVisible(link)) return false;
    toggle(link, !show);
    toggle(ge('ads_retargeting_' + id + '_input'), show);
    if (show) {
        input.select();
        if (!cur.values) cur.values = {};
        cur.values[id] = input.value;
    }
    return false;
}
Ads.retargetingInputChanged = function(id) {
    var new_val = trim(ge('ads_retargeting_' + id).value);
    if (cur.values[id] != new_val) {
        Ads.saveRetargetingGroupParam(id);
        cur.values[id] = new_val;
    } else {
        Ads.toggleRetargetingInput(id, false);
    }
}

Ads.hideHeroUnit = function(key, hash) {
    hide('ads_hero_unit');
    ajax.post('/ads?act=a_hide_hero', {
        key: key,
        hash: hash
    }, {});
}

Ads.initContacts = function(selectData, ajaxParams, isBig) {

    if (cur.contacts && cur.contacts.destroy) {
        cur.contacts.destroy();
    }

    var destroy = [];

    cur.contacts = {};
    cur.contacts.ajaxParams = ajaxParams;

    cur.contacts.destroy = function() {
        for (var i in destroy) {
            destroy[i]();
        }
        destroy = [];
    }
    cur.destroy.push(function() {
        cur.contacts.destroy();
    });

    var interestingEvents = 'keydown keyup keypress change paste cut drop input blur';

    var uiWidth = 250 + (isBig ? 22 : 0);

    var uiCountry = null;
    var uiCity = null;

    ge('country').removeAttribute('autocomplete');
    uiCountry = new Dropdown(ge('country'), selectData.countries, {
        selectedItem: [selectData.country_val],

        big: isBig,
        width: uiWidth,
        multiselect: false,

        onChange: function(value) {
            Ads.onFormEdit();
            if (value == 1) {
                hide('ads_contacts_form_nonresident', 'cis_msg');
                show('ads_contacts_form_rus');
            } else if (value > 1) {
                hide('ads_contacts_form_rus');
                show('ads_contacts_form_nonresident');
                if (value < 4) show('cis_msg');
                else hide('cis_msg');
            }
            if (value == -1) {
                getAllCountries();
                return;
            } else if (value > 3) {
                hide('city_row');
                return;
            }
            uiCity.clear();
            uiCity.setURL('/select_ajax.php?act=a_get_cities&country=' + value);
            selectsData.getCountryInfo(value, 1, function(response) {
                var new_options = {
                    defaultItems: response.cities,
                    dropdown: true
                };
                uiCity.setOptions(new_options);
                if (selectData.country == value) {
                    uiCity.selectItem(selectData.city_val);
                }
            });
            show(ge('city_row'));
        }
    });
    destroy.push(function() {
        uiCountry.destroy();
    });

    ge('city').removeAttribute('autocomplete');
    uiCity = new Selector(ge('city'), '/select_ajax.php?act=a_get_cities&country=' + selectData.country, {
        defaultItems: selectData.cities,
        selectedItems: [selectData.city_val],

        big: isBig,
        width: uiWidth,
        multiselect: false,
        dropdown: true,

        placeholder: getLang('select_city_not_selected'),
        introText: getLang('select_city_select'),
        noResult: getLang('select_city_not_found'),
        otherCity: getLang('select_city_other_city'),

        onChange: function(value) {
            Ads.onFormEdit();
        }
    });
    destroy.push(function() {
        uiCity.destroy();
    });

    var uiAgency = new Checkbox(ge('agency'), {
        checked: 1,
        width: uiWidth,
        label: getLang('ads_help_contacts_agency'),

        onChange: function(value) {
            Ads.onFormEdit();
            if (value == 1) {
                slideDown(ge("agency_fields"), 200);
            } else {
                if (isVisible('agency_fields')) {
                    slideUp(ge("agency_fields"), 200);
                }
            }
        }
    });
    destroy.push(function() {
        uiAgency.destroy();
    });

    var uiDating = new Checkbox(ge('dating'), {
        checked: 0,
        width: uiWidth,
        label: getLang('ads_help_contacts_dating'),

        onChange: function(value) {
            Ads.onFormEdit();
        }
    });
    destroy.push(function() {
        uiDating.destroy();
    });

    var uiMedicine = new Checkbox(ge('medicine'), {
        checked: 0,
        width: uiWidth,
        label: getLang('ads_help_contacts_medicine'),

        onChange: function(value) {
            Ads.onFormEdit();
        }
    });
    destroy.push(function() {
        uiMedicine.destroy();
    });

    ge('budget').removeAttribute('autocomplete');
    var uiBudget = new Dropdown(ge('budget'), selectData.budget, {
        selectedItems: '0',
        big: isBig,
        width: uiWidth,
        zeroPlaceholder: true,
        multiselect: false,

        onChange: function(value) {
            Ads.onFormEdit();
        }
    });
    destroy.push(function() {
        uiBudget.destroy();
    });

    ge('budget_nr').removeAttribute('autocomplete');
    var uiBudgetNr = new Dropdown(ge('budget_nr'), selectData.budget, {
        selectedItems: '0',
        big: isBig,
        width: uiWidth,
        zeroPlaceholder: true,
        multiselect: false,

        onChange: function(value) {
            Ads.onFormEdit();
        }
    });
    destroy.push(function() {
        uiBudgetNr.destroy();
    });

    if (selectData.offices) {
        ge('office').removeAttribute('autocomplete');
        var uiOffice = new Dropdown(ge('office'), selectData.offices, {
            selectedItems: selectData.office,
            big: isBig,
            width: uiWidth,
            multiselect: false,

            onChange: function(value) {
                Ads.onFormEdit();
            }
        });
        destroy.push(function() {
            uiOffice.destroy();
        });
    }

    addEvent(ge('organisation'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('organisation'));
    });
    addEvent(ge('contact'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('contact'));
    });
    addEvent(ge('email'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('email'));
    });
    addEvent(ge('phone'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('phone'));
    });
    addEvent(ge('message'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('message'));
    });
    addEvent(ge('organisation_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('organisation_nr'));
    });
    addEvent(ge('contact_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('contact_nr'));
    });
    addEvent(ge('requisites_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('requisites_nr'));
    });
    addEvent(ge('email_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('email_nr'));
    });
    addEvent(ge('phone_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('phone_nr'));
    });
    addEvent(ge('clients_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('clients_nr'));
    });
    addEvent(ge('message_nr'), interestingEvents, Ads.onFormEdit);
    destroy.push(function() {
        cleanElems(ge('message_nr'));
    });

    function getAllCountries() {
        function onDone(response) {
            if (response && isArray(response.countries)) {
                response.countries.splice(0, 1);
                uiCountry.setData(response.countries);
                uiCountry.val('');
                uiCity.clear();
                uiCity.setOptions({
                    defaultItems: []
                });
            }
        }
        ajax.post('/ads?act=a_get_countries', {}, {
            onDone: onDone
        });
    }
}

Ads.sendContactsForm = function(button) {
    if (!Ads.lock('sendContactsForm', onLock, onUnlock)) {
        return false;
    }

    var ajaxParams = extend({}, cur.contacts.ajaxParams);
    ajaxParams.country = ge('country').value;
    ajaxParams.city = ge('city').value;
    ajaxParams.agency = ge('agency').value;
    ajaxParams.dating = ge('dating').value;
    ajaxParams.medicine = ge('medicine').value;
    ajaxParams = extend(ajaxParams, serializeForm(ge(ajaxParams.country == 1 ? 'ads_contacts_form_rus' : 'ads_contacts_form_nonresident')));

    ajax.post('/ads?act=a_send_contacts', ajaxParams, {
        onDone: onDone,
        onFail: onDone
    });

    function onDone(response) {
        Ads.unlock('sendContactsForm');
        if (!response || !response.result) {
            if (!response || !response.msg) {
                tryErrorBox(getLang('ads_error_unexpected_error_try_later'));
            } else {
                tryErrorBox(response.msg);
            }
            return true;
        }
        ge('ads_contacts_form').innerHTML = response.msg;
    }

    function tryErrorBox(message) {
        showFastBox(getLang('global_error'), message);
    }

    function onLock() {
        lockButton(button);
    }

    function onUnlock() {
        unlockButton(button);
    }
}

Ads.removeAdminSelf = function(union_id, hash) {
    var box = showFastBox(getLang('ads_admin_remove_self_confirm_title'), getLang('ads_admin_remove_self_confirm_message'), getLang('box_yes'), function() {
        ajax.post('/ads?act=a_remove_admin', {
            union_id: union_id,
            hash: hash
        }, {
            onDone: function(html) {
                curBox().hide();
                nav.go('/ads?act=office&last=1');
            },
            showProgress: box.showProgress,
            hideProgress: box.hideProgress
        });
    }, getLang('box_no'));

    return false;
}

Ads.getNamespace = function(namespace) {
    if (!cur.namespaces) {
        cur.namespaces = {};
    }
    if (!cur.namespaces[namespace]) {
        cur.namespaces[namespace] = {};
    }
    return cur.namespaces[namespace];
}

Ads.createDropdown = function(element, namespace, name, values, options) {
    var options = extend({
        selected_value: values[0][0],
        onSelect: null
    }, options);

    var params = {
        target: element,
        value: options.selected_value,
        onSelect: function(event) {
            if (options.onSelect) {
                options.onSelect(event);
            }
        }
    };

    var namespace = this.getNamespace(namespace);
    namespace[name] = new DropdownMenu(values, params);
}

Ads.initRedesignHintTooltip = function() {
    var el = geByClass1('ads_ad_redesign_hint', document, 'span');
    if (!el) {
        return function() {};
    }
    var show = showTooltip.pbind(el, {
        text: getLang('ads_ad_redesign_tooltip'),
        className: 'ads_ad_redesign_hint_tt',
        shift: [130, 0, 0],
        slide: 15
    });
    addEvent(el, 'mouseover', show);
    return function() {
        removeEvent(el, 'mouseover', show);
        tooltips.destroy(el);
    }
}

Ads.showRetargetingPriceListActionsTable = function(event, curUnionId, priceListId, hash) {
    cancelEvent(event);

    if (Ads.checkRetargetingPriceListActionsTableLoading(priceListId)) {
        return;
    }

    var priceListItem = ge('ads_retargeting_price_list_item_' + priceListId),
        priceListItemActionsBlock = ge('ads_retargeting_price_list_actions_' + priceListId),
        priceListItemActionsWrapper = geByClass1('ads_retargeting_price_list_actions_wrapper', priceListItemActionsBlock);

    if (hasClass(priceListItem, 'ads_retargeting_price_list_item_opened')) {
        var priceListItemActionsError = ge('ads_retargeting_price_list_actions_error_' + priceListId);
        hide(priceListItemActionsError);
        Ads.toggleRetargetingPriceListActionsTable(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper);
        return;
    }

    if (priceListItemActionsWrapper.getAttribute('data-filled') === '1') {
        Ads.toggleRetargetingPriceListActionsTable(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper);
        return;
    }
    Ads.getRetargetingPriceListActionsTable(event, curUnionId, priceListId, hash);
}

Ads.checkRetargetingPriceListActionsTableLoading = function(priceListId) {
    cur.adsRetargetingPriceList = cur.adsRetargetingPriceList || {};
    cur.adsRetargetingPriceList[priceListId] = cur.adsRetargetingPriceList[priceListId] || {};

    if (cur.adsRetargetingPriceList[priceListId].loading) {
        return true;
    }

    return false;
}

Ads.getRetargetingPriceListActionsTable = function(event, curUnionId, priceListId, hash) {
    cancelEvent(event);

    if (Ads.checkRetargetingPriceListActionsTableLoading(priceListId)) {
        return;
    }

    cur.adsRetargetingPriceList[priceListId].loading = true;

    var priceListItem = ge('ads_retargeting_price_list_item_' + priceListId),
        priceListItemActionsBlock = ge('ads_retargeting_price_list_actions_' + priceListId),
        priceListItemActionsWrapper = geByClass1('ads_retargeting_price_list_actions_wrapper', priceListItemActionsBlock),
        priceListItemActionsError = ge('ads_retargeting_price_list_actions_error_' + priceListId),
        priceListItemLoading = ge('ads_retargeting_price_list_actions_loading_' + priceListId);

    hide(priceListItemActionsError);
    show(priceListItemLoading);
    showProgress(priceListItemLoading, 'ads_retargeting_price_list_actions_loading_progress_' + priceListId, 'ads_retargeting_price_list_actions_loading_progress pr_medium');
    addClass(priceListItem, "ads_retargeting_price_list_item_opened");

    var ajaxParams = {
        cur_union_id: curUnionId,
        price_list_id: priceListId,
        hash: hash
    };

    ajax.post('/ads?act=a_retargeting_price_list_actions', ajaxParams, {
        onDone: onComplete,
        onFail: onComplete
    });

    function onComplete(response) {
        cur.adsRetargetingPriceList[priceListId].loading = false;

        if (response && response.ok && response.result) {
            slideUp(priceListItemActionsError, 100);
            priceListItemActionsWrapper.innerHTML = response.result;
            priceListItemActionsWrapper.setAttribute('data-filled', '1');
            Ads.openRetargetingPriceListActionsTable(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper, priceListItemLoading);
            return;
        }

        var priceListItemActionsErrorText = geByClass1('ads_retargeting_price_list_actions_error_text', priceListItemActionsError);
        if (priceListItemActionsErrorText) {
            priceListItemActionsErrorText.innerHTML = response || getLang('global_unknown_error');
            slideDown(priceListItemActionsError, 100);
            Ads.openRetargetingPriceListActionsTable(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper, priceListItemLoading);
        }
    }
}

Ads.toggleRetargetingPriceListActionsTable = function(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper) {
    slideToggle(priceListItemActionsWrapper, 150);
    priceListItem.classList.toggle("ads_retargeting_price_list_item_opened");
    priceListItemActionsBlock.classList.toggle("ads_retargeting_price_list_actions_opened");
}

Ads.openRetargetingPriceListActionsTable = function(priceListItem, priceListItemActionsBlock, priceListItemActionsWrapper, priceListItemLoading) {
    slideUp(priceListItemLoading, 100);
    hideProgress(priceListItemLoading);

    slideDown(priceListItemActionsWrapper, 150);
    addClass(priceListItemActionsBlock, "ads_retargeting_price_list_actions_opened");
}

Ads.showRetargetingPriceListEditBox = function(event, unionId, hash, priceListId, hashArchive) {
    event.preventDefault();

    var box, deleteLink;

    var onClickArchiveLinkCallback = function() {
        Ads.retargetingPriceListEditBoxArchiveOnClick(unionId, hashArchive, priceListId, box);
    };

    box = Ads.showRetargetingGroupBox('price_list_edit', {
        'union_id': unionId,
        'price_list_id': priceListId,
        'hash': hash
    }, {
        onBeforeHide: function() {
            if (deleteLink) {
                deleteLink.removeEventListener('click', onClickArchiveLinkCallback);
            }
        }
    });

    box.removeButtons();
    box.addButton(getLang('global_save'), function() {
        Ads.saveRetargetingPriceList(unionId, hash, priceListId)
    }, '', false, 'ads_retargeting_box_price_list_save');
    box.addButton(getLang('global_cancel'), box.hide, 'gray', false, 'ads_retargeting_box_price_list_cancel');

    if (!hashArchive) {
        return;
    }

    var boxControlsText = getLang('ads_retargeting_price_list_delete');
    box.setControlsText('<a id="ads_retargeting_box_price_list_delete">' + boxControlsText + '</a>');

    deleteLink = ge('ads_retargeting_box_price_list_delete');

    if (deleteLink) {
        deleteLink.addEventListener('click', onClickArchiveLinkCallback);
    }
}

Ads.retargetingPriceListEditBoxArchiveOnClick = function(unionId, hashArchive, priceListId, box) {
    Ads.archiveRetargetingPriceList(unionId, hashArchive, priceListId, false, box);
}

Ads.saveRetargetingPriceListUnescape = function(str) {
    return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

Ads.saveRetargetingPriceList = function(unionId, hash, priceListId) {
    var btnSave = ge('ads_retargeting_box_price_list_save');

    if (isButtonLocked(btnSave)) {
        return;
    }
    lockButton(btnSave);

    var checkboxHttpAuth = cur.uiEditPriceListHttpAuth;
    var checkboxUrlStripUtm = cur.uiEditPriceListUrlStripUtmCheckBox;
    var checkboxUrlExtraParams = cur.uiEditPriceListUrlExtraParamsCheckbox;

    if (!checkboxHttpAuth || !checkboxUrlStripUtm || !checkboxUrlExtraParams) {
        topError('Checkboxes init failed');
        return;
    }

    var newPriceListName = val('ads_retargeting_box_price_list_edit_name').trim(),
        newPriceListUrl = val('ads_retargeting_box_price_list_edit_url').trim();

    var newPriceListHttpAuth = (checkboxHttpAuth.checked() ? 1 : 0),
        newPriceListHttpAuthUsername = (newPriceListHttpAuth ? val('ads_retargeting_box_price_list_edit_http_auth_username').trim() : ''),
        newPriceListHttpAuthPassword = (newPriceListHttpAuth ? val('ads_retargeting_box_price_list_edit_http_auth_password').trim() : '');

    var newPriceListUrlStripUtmEnabled = (checkboxUrlStripUtm.checked() ? 1 : 0),
        newPriceListUrlExtraParamsEnabled = (checkboxUrlExtraParams.checked() ? 1 : 0),
        newPriceListUrlExtraParams = val('ads_retargeting_box_price_list_edit_url_extra_params').trim();

    var ajaxParams = {
        union_id: unionId,
        hash: hash,
        name: newPriceListName,
        url: newPriceListUrl,

        http_auth: newPriceListHttpAuth,
        http_auth_username: newPriceListHttpAuthUsername,
        http_auth_password: newPriceListHttpAuthPassword,

        url_strip_utm_enabled: newPriceListUrlStripUtmEnabled,
        url_extra_params_enabled: newPriceListUrlExtraParamsEnabled,
        url_extra_params: newPriceListUrlExtraParams
    };

    var isNew = !priceListId;
    if (!isNew) {
        ajaxParams.price_list_id = priceListId;
    }

    ajax.post('/ads.php?act=a_retargeting_price_lists_save', ajaxParams, {
        onDone: onComplete.pbind(true),
        onFail: onComplete.pbind(false)
    });

    function onComplete(isOk, response) {
        if (isOk && response && (response.ok || response.uninitialized)) {
            if (response.reload_url) {
                nav.go(response.reload_url);
            }
            return;
        } else {
            var error = (response && response.error || getLang('global_unknown_error')),
                errorBlock = geByClass1('msg_text', ge('ads_retargeting_box_error'));
            errorBlock.innerHTML = error;
            show('ads_retargeting_box_error');

            unlockButton(btnSave);
            return true;
        }
    }
}

Ads.archiveRetargetingPriceList = function(unionId, hash, priceListId, confirm, box) {
    var buttonConfirm = ge('ads_retargeting_box_price_list_archive_confirm');
    if (buttonConfirm) {
        if (isButtonLocked(buttonConfirm)) {
            return;
        }
        lockButton(buttonConfirm);
    }

    box && box.showProgress();

    var ajaxParams = {
        union_id: unionId,
        hash: hash,
        price_list_id: priceListId,
        confirm: confirm | 0
    };

    ajax.post('/ads.php?act=a_retargeting_price_lists_archive', ajaxParams, {
        onDone: onComplete.pbind(true),
        onFail: onComplete.pbind(false)
    });

    function onComplete(isDone, response) {
        var newBox;
        var error;

        if (buttonConfirm) {
            unlockButton(buttonConfirm);
        }

        box && box.hide();

        if (!isDone || !isObject(response)) {
            error = (isObject(response) && response.error || getLang('global_unknown_error'));
            showFastBox(getLang('global_box_error_title'), error);
            return true;
        }

        if (response.confirm_required) {
            newBox = showFastBox(getLang('global_box_confirm_title'), response.confirm_message);

            newBox.removeButtons();
            newBox.addButton(response.confirm_action, function() {
                Ads.archiveRetargetingPriceList(unionId, hash, priceListId, true, newBox);
            }, '', false, 'ads_retargeting_box_price_list_archive_confirm');
            newBox.addButton(getLang('box_cancel'), newBox.hide, 'gray');

            return;
        }

        if (response.retargeting_group_is_used) {
            newBox = showFastBox(response.error_title, response.error);
            newBox.setButtons(
                response.show_usages_action,
                Ads.showRetargetingGroupBox.pbind('usage', {
                    union_id: unionId,
                    group_id: response.retargeting_group_id
                }),
                getLang('box_cancel')
            );
            return;
        }

        if (response.ok) {
            if (response.reload_url) {
                nav.go(response.reload_url);
                return;
            }

            showFastBox('Done', (response.message || 'Done. Refresh the page.'));
            return;
        }

        error = response.error || getLang('global_unknown_error');
        showFastBox(getLang('global_box_error_title'), error);
    }
}

Ads.showRetargetingPriceListProcessInfoBox = function(event, unionId, priceListId, tech) {
    event.preventDefault();

    var params = {
        'union_id': unionId,
        'price_list_id': priceListId,
        'tech': (tech ? 1 : 0)
    };
    var options = {
        width: 800
    };
    var box = Ads.showRetargetingGroupBox('price_list_process_info', params, options);
    box.removeButtons();
}

Ads.checkRetargetingPriceListInputKeyup = function(event, unionId, hash, priceListId) {
    if (event.which === KEY.ENTER || event.keyCode === KEY.ENTER) {
        Ads.saveRetargetingPriceList(unionId, hash, priceListId);
    }
}

Ads.startPriceListUpdate = function(event, btn, startUpdate, unionId, priceListId, priceListUrl, priceListHash) {
    event.preventDefault();

    var isBtnDisabled = btn.classList.contains('ads_retargeting_price_list_item_cell_update_link_disabled');

    if (isBtnDisabled || !startUpdate) {
        return;
    }

    if (unionId && priceListId && priceListUrl) {
        btn.classList.add('ads_retargeting_price_list_item_cell_update_link_disabled', 'ads_retargeting_price_list_item_cell_update_link_waiting');

        var ajaxParams = {
            union_id: unionId,
            hash: priceListHash,
            price_list_id: priceListId,
            price_list_url: priceListUrl
        };

        ajax.post('/ads.php?act=a_retargeting_price_lists_update', ajaxParams, {
            onDone: onComplete.pbind(true),
            onFail: onComplete.pbind(false)
        });
    }

    function onComplete(isOk, response) {
        if (isOk && response) {
            nav.reload();
            return;
        } else {
            btn.classList.remove('ads_retargeting_price_list_item_cell_update_link_disabled', 'ads_retargeting_price_list_item_cell_update_link_waiting');
        }
    }
}

Ads.showRetargetingPriceListStatusErrorBox = function(event) {
    event.preventDefault();

    Ads.showRetargetingGroupBox('price_list_error', {
        hideButtons: true
    });
}

Ads.showRetargetingPriceListStatusErrorCode = function(event, link) {
    event.preventDefault();

    var errorBox = ge('ads_retargeting_box_price_list_error');
    errorBox.classList.add('ads_retargeting_box_price_list_error_opened');
}

Ads.checkRetargetingPriceListProduct = function() {
    var btn = ge('ads_retargeting_box_price_list_check_product_button');

    if (isButtonLocked(btn)) {
        return;
    }

    var errWrap = ge('ads_retargeting_box_price_list_check_product_error');
    var resWrap = ge('ads_retargeting_box_price_list_check_product_result');

    addClass(errWrap, 'unshown');
    addClass(resWrap, 'unshown');

    var productFullId = val('ads_retargeting_box_price_list_check_product_input').trim();
    if (!productFullId || !productFullId.match(/(\d+)_(.+)/)) {
        notaBene('ads_retargeting_box_price_list_check_product_input');
        return false;
    }

    ajax.post('/ads?act=a_retargeting_group_price_list_check_product', {
        union_id: cur.options.unionId,
        product_full_id: productFullId
    }, {
        onDone: function(html) {
            resWrap.innerHTML = html;
            removeClass(resWrap, 'unshown');
            elfocus('ads_retargeting_box_price_list_check_product_input');
            return true;
        },
        onFail: function(err) {
            errWrap.innerHTML = err;
            removeClass(errWrap, 'unshown');
            return true;
        },
        showProgress: lockButton.pbind(btn),
        hideProgress: unlockButton.pbind(btn)
    });
};

Ads.toggleRelevanceScoreInfo = function(switcherName) {
    removeClass(geByClass1("ads_relevance_score_switcher_item_active"), "ads_relevance_score_switcher_item_active");
    addClass(ge("ads_relevance_score_switcher_" + switcherName), "ads_relevance_score_switcher_item_active");

    removeClass(geByClass1("ads_relevance_score_top_tabs_item_active"), "ads_relevance_score_top_tabs_item_active");
    addClass(ge("ads_relevance_score_top_tabs_" + switcherName), "ads_relevance_score_top_tabs_item_active");
}

Ads.showPixelErrorsBox = function(event, unionId, pixelId, hash) {
    event.preventDefault();

    var ajaxParams = {
        union_id: unionId,
        pixel_id: pixelId,
        hash: hash
    };

    var showOptions = {
        onFail: Ads.onBoxFail,
        params: {
            width: 600
        }
    };

    showBox('/ads?act=a_retargeting_pixel_get_errors_box', ajaxParams, showOptions);
}

Ads.showRelevanceScoreTooltip = function() {
    Ads.showNewFeatureTooltip('ads_promoted_posts_relevance_score_tooltip', geByClass1("ads_relevance_score_top"), {
        width: 190,
        offset: [10, 0],
        content: getLang('ads_relevance_score_hint_new_feature')
    });
}

Ads.showPixelErrorsTooltip = function() {
    Ads.showNewFeatureTooltip('adsPixelErrorsTooltip', geByClass1("ads_retargeting_pixel_errors_column"), {
        width: 235,
        offset: [-5, 0],
        content: getLang('ads_retargeting_pixel_errors_new_feature')
    });
}

Ads.showPriceListErrorsTooltip = function() {
    Ads.showNewFeatureTooltip('adsPriceListErrorsTooltip', geByClass1("ads_retargeting_price_list_item_cell_status_link"), {
        width: 235,
        offset: [-15, 0],
        content: getLang('ads_retargeting_price_list_errors_new_feature')
    });
}

Ads.showNewInterestsTooltip = function() {
    Ads.showNewFeatureTooltip('ads_weights_new_interests_feature', ge("ads_edit_targeting_group_interests"), {
        width: 235,
        offset: [-70, -60],
        forceSide: 'right',
        content: getLang('ads_edit_weights_new_interests_feature')
    });
}

/**
 Show tooltip about new feature.
 ttp  - tooltip name
 el   - object id which tootlip should point to
 opts - opts for new ElementTooltip (usual for ElementTooltip + closeIcon: true/false (default: true))
 */
Ads.showNewFeatureTooltip = function(ttp, el, opts) {
    if (!ttp || !el) {
        return;
    }

    var tooltipName = ttp;
    var tooltipLs = tooltipName + '_hidden';
    var tooltipDisplayCounterLs = tooltipName + '_display_counter';

    if (ls.get(tooltipLs) || cur[tooltipName]) {
        return;
    }

    opts = opts || {};

    if (opts.displayCounter) {
        var tooltipDisplayCounter = ls.get(tooltipDisplayCounterLs);
        if (tooltipDisplayCounter && (parseInt(tooltipDisplayCounter, 10) >= parseInt(opts.displayCounter, 10))) {
            return;
        }
    }

    var defaultOpts = {
        autoShow: false,
        appendTo: el,
        forceSide: 'left',
        width: 220,
        cls: 'eltt_blue'
    };

    defaultOpts.content = '';
    if (typeof opts.closeIcon !== 'undefined') {
        defaultOpts.content = opts.closeIcon ? '<div class="eltt_blue_hide" onclick="cur.' + tooltipName + '.closeTooltip(event);"></div>' : '';
        delete opts.closeIcon;
    } else {
        defaultOpts.content = '<div class="eltt_blue_hide" onclick="cur.' + tooltipName + '.closeTooltip(event);"></div>';
    }

    if (typeof opts.content !== 'undefined') {
        defaultOpts.content += opts.content;
        delete opts.content;
    }

    defaultOpts.onHide = function() {
        if (typeof opts.onHide !== 'undefined') {
            opts.onHide();
            delete opts.onHide;
        }
        cur[tooltipName].destroy();
    }

    var params = extend(defaultOpts, opts);
    cur[tooltipName] = new ElementTooltip(el, params);
    cur[tooltipName].show();

    if (opts.displayCounter) {
        ls.set(tooltipDisplayCounterLs, (ls.get(tooltipDisplayCounterLs) + 1));
    }

    cur[tooltipName].closeTooltip = function(event) {
        cancelEvent(event);
        cur[tooltipName].hide();
        ls.set(tooltipLs, 1);
    };
}

var AdsSupportChat;

try {
    stManager.done('ads.js');
} catch (e) {}