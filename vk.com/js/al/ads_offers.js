var Offers = {
    initOfficesMenu: function(event) {

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

            unionId = '';
            unionIdReal = intval(curItems[i].i);
            unionIdParam = '';
            if (curItems[i].i.indexOf('default') == -1) {
                unionId = unionIdReal;
                unionIdParam = "&union_id=" + unionIdReal;
            }

            var link = "/offers?act=office" + unionIdParam;
            var onclick = false;
            if (!unionIdReal) {
                // link = "/offers?act=office";
                // onclick = function(event) {
                //   hideMenu();
                //   return showWiki({w: 'new_ad_union', create: 1}, false, event, {queue: true});
                // }
            } else if (cur.getOfficeLink) {
                link = cur.getOfficeLink(unionId);
            } else if (realLocation.match(/act=budget(&|$)/)) {
                link = "/offers?act=budget" + unionIdParam;
            } else if (realLocation.match(/act=export_stats(&|$)/)) {
                link = "/offers?act=export_stats" + unionIdParam;
            } else if (realLocation.match(/act=settings(&|$)/)) {
                link = "/offers?act=settings" + unionIdParam;
            }

            curItems[i].h = link;
            if (onclick) {
                curItems[i].onClick = onclick;
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
    },

    onStatusHover: function(elem, offerId, type) {
        var options = {
            status: {
                type: type,
                title: cur.options.statusText[offerId]
            },
            items: cur.options.statusVariants[offerId],
            popupTime: -1,
            onSelect: function(event) {
                var index = event.target.index,
                    hash = cur.options.hash[offerId],
                    hashDelete = cur.options.hash_delete[offerId];

                if (index == -1) {
                    setTimeout(function() {
                        Offers.openDeleteOfferBox(offerId, hashDelete, lockChangeStatus, unlockChangeStatus, updateStatusInTable, 1);
                    }, 1);
                    return;
                }

                function lockChangeStatus() {
                    var selectorBox = ge('offer_' + offerId + '_status_selector_box');
                    var progress = ge('offer_' + offerId + '_status_progress');
                    hide(selectorBox);
                    show(progress);
                    return true;
                };

                function unlockChangeStatus() {
                    var selectorBox = ge('offer_' + offerId + '_status_selector_box');
                    var progress = ge('offer_' + offerId + '_status_progress');
                    hide(progress)
                    show(selectorBox);
                }

                function updateStatusInTable(status) {
                    if (!status || !status.text) return;

                    cur.options.statusText[offerId] = status.text;
                    cur.options.statusVariants[offerId] = status.variants;
                    var img_span = geByClass1('ads_status_image_span', elem);
                    img_span.className = 'ads_status_image_span status_' + status.class;

                    if (status.class != 'deleted') {
                        elem.onclick = Offers.onStatusHover.pbind(elem, offerId, status.status);
                    } else {
                        elem.onclick = '';
                    }
                }

                Offers.changeStatus(offerId, index, hash, false, false, lockChangeStatus, unlockChangeStatus, updateStatusInTable, cur.options.linkTypes[offerId]);
            }
        };

        var sdd;
        if (!cur._statusDropdown) {
            var handler = elem.getAttribute('onclick');
            sdd = cur._statusDropdown = Offers.statusDropdown(elem, options);
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
    },

    openDeleteOfferBox: function(offerId, hash, lock, unlock, updateStatus) {
        cur.deleteConfirmBox = showFastBox({
            title: getLang('ads_archive_box_offer_title'),
            dark: true,
            width: 430,
            bodyStyle: 'line-height: 160%; padding: 16px 20px;'
        }, getLang('ads_archive_box_offer_warning'), getLang('ads_archive_box_action'), function() {
            Offers.deleteOffer(offerId, hash, lock, unlock, updateStatus);
        }, getLang('box_cancel'));
    },
    deleteOffer: function(offerId, hash, lock, unlock, updateStatus) {
        if (!lock) {
            lock = function() {
                addClass('offers_info_archive', 'loading');
                return true;
            }
            unlock = function() {
                removeClass('offers_info_archive', 'loading');
                return true;
            }
            Offers.openDeleteOfferBox(offerId, hash, lock, unlock);
            return false;
        }

        if (!lockDeletion()) {
            return;
        }

        ajax.post('/offers?act=a_offer_delete', {
            offer_id: offerId,
            hash: hash,
            from: !updateStatus ? 'button' : 'table'
        }, {
            onDone: function(response) {
                if (updateStatus) {
                    updateStatus(response);
                } else {
                    nav.reload();
                }
            },
            onFail: function(msg) {
                showFastBox({
                    title: getLang('global_error'),
                    width: 350
                }, msg);
                return true;
            },
            hideProgress: unlockDeletion
        });

        function lockDeletion() {
            if (!lock()) {
                return false;
            }
            cur.deleteConfirmBox.hide();
            return true;
        }

        function unlockDeletion() {
            unlock();
        }
    },
    updateOfferStatusVariants: function(offerId) {
        function lockChangeStatus() {
            var selectorBox = ge('offer_' + offerId + '_status_selector_box');
            var progress = ge('offer_' + offerId + '_status_progress');
            hide(selectorBox);
            show(progress);
            return true;
        };

        function unlockChangeStatus() {
            var selectorBox = ge('offer_' + offerId + '_status_selector_box');
            var progress = ge('offer_' + offerId + '_status_progress');
            hide(progress)
            show(selectorBox);
        }
        ajax.post('/offers?act=a_get_offer_status_variants', {
            offer_id: offerId
        }, {
            onDone: function(response) {
                offerId = parseInt(offerId);
                cur.options.statusVariants[offerId] = response;
            },
            onFail: function(msg) {
                var errorMessage = msg ? msg : getLang('ads_error_unexpected_error_try_later');
                showFastBox(getLang('ads_cant_start_offer_box_title'), errorMessage);
                return true;
            },
            showProgress: lockChangeStatus,
            hideProgress: unlockChangeStatus
        });
    },
    updateActionButtons: function(offerId) {
        ajax.post('/offers?act=a_get_actions_buttons', {
            offer_id: offerId
        }, {
            onDone: function(response) {
                ge('offers_status_btn').parentNode.parentNode.innerHTML = response;
            },
            onFail: function(msg) {
                var errorMessage = msg ? msg : getLang('ads_error_unexpected_error_try_later');
                showFastBox(getLang('ads_cant_start_offer_box_title'), errorMessage);
                return true;
            },
            showProgress: function() {
                lockButton('offers_status_btn');
                lockButton('offers_status_btn2');
            },
            hideProgress: function() {
                unlockButton('offers_status_btn');
                unlockButton('offers_status_btn2');
            }
        });
    },
    changeStatus: function(offerId, status, hash, addParams, force, lock, unlock, updateStatus, linkType) {
        if (status == 1 && !force) { // 1 = OFFERS_STATUS_REVIEWING
            var box = showBox('/offers', {
                act: 'a_review_box',
                offer_id: offerId,
                hash: hash
            }, {
                params: {
                    width: 450,
                    bodyStyle: 'padding: 20px;'
                },
                dark: 1,
                onFail: Offers.onBoxFail
            });
            box.postData = function(addParams) {
                Offers.changeStatus(offerId, status, hash, addParams, true, lock, unlock, updateStatus, linkType);
            };
            if (updateStatus) {
                requestBox(box, updateStatus);
            }
        } else if (status == 3 && !force && ((linkType == 'app') || (linkType == 'group'))) { // 3 = OFFERS_STATUS_RUNNING
            var box = showBox('/offers', {
                act: 'a_ban_users_box',
                offer_id: offerId,
                hash: hash
            }, {
                params: {
                    width: 450,
                    bodyStyle: 'padding: 20px;'
                },
                dark: 1,
                onFail: Offers.onBoxFail
            });
            box.postData = function(addParams) {
                Offers.changeStatus(offerId, status, hash, addParams, true, lock, unlock, updateStatus, linkType);
            };
            if (updateStatus) {
                requestBox(box, updateStatus);
            }
        } else {
            var box = curBox();
            var params = {
                offer_id: offerId,
                status: status,
                hash: hash,
                from: !updateStatus ? 'button' : 'table'
            };
            if (addParams) {
                params = extend(params, addParams);
            }

            ajax.post('/offers?act=a_change_status', params, {
                onDone: function(response, status) {
                    if (box && box.onDone) {
                        box.onDone(response);
                        box.hide();
                    } else if (updateStatus) {
                        updateStatus(response);
                    } else {
                        if (box) box.hide();
                        ge('offers_status_btn').parentNode.parentNode.innerHTML = response;
                        ge('offers_info_status').innerHTML = status;
                    }
                },
                onFail: function(msg) {
                    var errorMessage = msg ? msg : getLang('ads_error_unexpected_error_try_later');
                    if (box) {
                        Offers.showError(msg, box.bodyNode);
                    } else {
                        showFastBox(getLang('ads_cant_start_offer_box_title'), errorMessage);
                    }
                    return true;
                },
                showProgress: function() {
                    if (box) {
                        box.showProgress();
                    }
                    if (lock) {
                        lock();
                    } else if (!box) {
                        lockButton('offers_status_btn');
                        lockButton('offers_status_btn2');
                    }
                },
                hideProgress: function() {
                    if (box) {
                        box.hideProgress();
                    }
                    if (unlock) {
                        unlock();
                    } else if (!box) {
                        unlockButton('offers_status_btn');
                        unlockButton('offers_status_btn2');
                    }
                }
            });
        }
    },

    showMsg: function(text, parentEl) {
        re('offers_msg');
        var msg = ge('offers_msg');
        if (!msg) {
            var parent = parentEl || ge('ads_page');
            msg = parent.insertBefore(ce('div', {
                id: 'offers_msg',
                className: 'msg'
            }), parent.firstChild);
        }
        msg.innerHTML = text;
        msg.style.backgroundColor = '#F4EBBD';
        animate(msg, {
            backgroundColor: '#F9F6E7'
        }, 2000);
        return true;
    },
    showError: function(text, parentEl) {
        re('offers_error');
        var err = ge('offers_error');
        if (!err) {
            var parent = parentEl || ge('ads_page');
            err = parent.insertBefore(ce('div', {
                id: 'offers_error',
                className: 'error'
            }), parent.firstChild);
        }
        err.innerHTML = text;
        err.style.backgroundColor = '#FACEBB';
        animate(err, {
            backgroundColor: '#FFEFE8'
        }, 2000);
        return true;
    },
    onBoxFail: function(message) {
        if (!message) {
            message = getLang('global_unknown_error');
        }
        setTimeout(function() {
            showFastBox(getLang('ads_error_box_title'), message);
        }, 1);
        return true;
    },

    updateOffersListTable: function(params) {
        if (cur.loadingListTable) {
            return;
        }
        cur.loadingListTable = true;
        var obj = clone(nav.objLoc),
            url = obj[0];
        delete obj[0];
        delete obj['offset'];
        ajax.post(url, extend(obj, params, {
            load: 1
        }), {
            onDone: function(res, tabs) {
                ge('offers_list_table_wrap').innerHTML = res;
                val('offers_period_tabs', tabs)
                var _obj = clone(nav.objLoc);
                delete _obj['offset'];
                nav.setLoc(extend(_obj, params));
            },
            showProgress: function() {
                show('table_period_selector_progress');
            },
            hideProgress: function() {
                cur.loadingListTable = false;
                hide('table_period_selector_progress');
            }
        });
    },
    updateOfferStats: function(params) {
        var obj = clone(nav.objLoc),
            url = obj[0];
        delete obj[0];
        delete obj['offset'];
        ajax.post(url, extend(obj, params, {
            load: 1
        }), {
            onDone: function(res) {
                ge('offers_stats_table_wrap').innerHTML = res;
            },
            showProgress: function() {
                show('table_period_selector_progress');
            },
            hideProgress: function() {
                hide('table_period_selector_progress');
            }
        });
    },
    addClient: function(union_id) {
        return !showBox('/offers', {
            act: 'a_create_client_box',
            union_id: union_id
        }, {
            params: {
                width: '315px',
                dark: true,
                bodyStyle: 'padding: 20px;'
            }
        });
    },
    createClient: function(union_id, hash) {
        var name = trim(val('new_union_name'));
        if (!name) {
            notaBene('new_union_name');
            return;
        }

        ajax.post('/offers?act=a_create_client', {
            union_id: union_id,
            hash: hash,
            name: name
        }, {
            onFail: function(msg) {
                if (curBox()) {
                    Offers.showError(msg, curBox().bodyNode);
                }
                return true;
            },
            showProgress: curBox().showProgress,
            hideProgress: curBox().hideProgress,
        });
    },

    switchSectionsTab: function(el, tab, event, force) {
        if (checkEvent(event) || hasClass(el, 'active_link') && !force) return;
        each(geByClass('active_link', 'offers_offer_tabs'), function(i, v) {
            removeClass(v, 'active_link');
        });
        addClass(el.parentNode, 'active_link');

        var obj = clone(nav.objLoc),
            url = obj[0];
        delete obj[0];
        ajax.post('/offers', extend(obj, {
            section: tab,
            load: 1
        }), {
            onDone: function(html, js) {
                ge('offers_offer_section_wrap').innerHTML = html;
                if (js) {
                    eval('(function(){' + js + ';})()');
                }
            },
            showProgress: function() {
                hide('offers_offer_export_link');
                show('offers_offer_tabs_progress');
            },
            hideProgress: function() {
                hide('offers_offer_tabs_progress');
                show('offers_offer_export_link');
            },
        });
        return false;
    },
    showPreview: function(testMode) {
        var box = showBox('/offers', {
            act: 'a_preview_box',
            offer_id: cur.offerId,
            test_mode: testMode
        }, {
            params: {
                width: 500,
                bodyStyle: 'padding: 25px; line-height: 180%;',
                hideButtons: 1
            },
            dark: 1
        });
    },
    previewBoxStartOffer: function() {
        ge('start_offer').submit();
        setTimeout(function() {
            curBox().hide();
            Offers.switchSectionsTab(ge('offers_tab_test'), 'test', false, true);
        }, 1000);
    },
    showSecret: function() {
        showBox('/offers', {
            act: 'a_secret_box',
            offer_id: cur.offerId
        }, {
            params: {
                width: 400,
                bodyStyle: 'padding: 20px;'
            },
            dark: 1
        });
    },
    updateCostInfo: function(newValue, newText) {
        newText = newText.split("\t");
        geByTag1('a', 'offers_info_cost').innerHTML = newText[0];
        geByClass1('offers_preview_votes', 'offers_preview').innerHTML = newText[0];
        val('offers_info_amount', newText[1]);
    },
    showExportStats: function() {
        showBox('/offers', {
            act: 'a_export_stats_box',
            offer_id: cur.offerId
        }, {
            dark: 1
        });
        return false;
    },
    onOfferTypeClick: function(elem) {
        if (hasClass(elem, 'disabled')) {
            return;
        }

        var isIntegration = elem.getAttribute('value');
        each(geByClass('offers_int_type'), function(i, elem) {
            removeClass(elem, 'selected');
        });
        addClass(elem, 'selected');
        cur.offerIsIntegration = isIntegration;
    },
    onLinkTypeClick: function(elem) {
        if (hasClass(elem, 'disabled')) {
            return;
        }

        var type = elem.getAttribute('value');
        each(geByClass('offers_edit_link_type_item', 'offers_edit_link_type_wrap'), function(i, elem) {
            removeClass(elem, 'selected');
        });
        addClass(elem, 'selected');
        cur.linkType = type;

        hide('offers_edit_link_id_row', 'offers_edit_link_url_row', 'offers_edit_link_object_complete', 'offers_edit_link_object_edit', 'offers_edit_link_id_go_wrap', 'offers_edit_link_url_go_wrap');
        var uiData = false;
        switch (type) {
            case 'group':
                uiData = '/adsedit?act=search_user_objects&section=groups&group_purpose=link_object';
                var placeholderText = getLang('ads_type_community'),
                    defaultData = cur.options.typeGroups;
                break;
            case 'app':
                uiData = '/adsedit?act=search_user_objects&section=apps';
                var placeholderText = getLang('ads_type_app'),
                    defaultData = cur.options.typeApps;
                break;
            case '0':
                show('offers_edit_link_url_row');
                break;
        }

        if (uiData) {
            cur.uiLinkId.setURL(uiData);
            cur.uiLinkId.setOptions({
                introText: placeholderText,
                placeholder: placeholderText,
                defaultItems: defaultData
            });
            cur.uiLinkId.selectItem('');

            show('offers_edit_link_id_row');
        }
        show('offers_edit_link_object');
        if (!hasClass(elem, 'unavailable')) {
            show('offers_edit_link_object_complete');
        }
        disableButton('offers_edit_link_object_complete_btn', true);
    },
    editMetricTitle: function(id) {
        hide('offer_metric_title_link_' + id);
        show('offer_metric_title_input_' + id);
        ge('offer_metric_title_input_' + id).focus();
    },
    getMetricCaption: function(metricTitle) {
        if (!metricTitle) {
            return '�������� �������';
        }
        var metricCaptionMaxLength = 27;
        return (metricTitle.length > metricCaptionMaxLength) ? metricTitle.substr(0, metricCaptionMaxLength) + '&hellip;' : metricTitle;
    },
    saveMetricTitle: function(id) {
        var metricTitle = ge('offer_metric_title_input_' + id).value;
        if (metricTitle.length) {
            ge('offer_metric_title_link_' + id).innerHTML = Offers.getMetricCaption(metricTitle);
            show('offer_metric_title_link_' + id);
            hide('offer_metric_title_input_' + id);
        }
    },
    removeMetric: function(id) {
        re('offer_metric_' + id);
    },
    generateMetricRow: function(id, metricType, metricTitle) {
        metricType = parseInt(metricType);
        metricTypeTitle = '��� �������';
        for (var i = 0; i < cur.options.metricTypes.length; ++i) {
            if (cur.options.metricTypes[i].i == metricType) {
                metricTypeTitle = cur.options.metricTypes[i].l;
                break;
            }
        }
        metricTitleValue = metricTitle || '';
        metricTitleText = Offers.getMetricCaption(metricTitle);
        var elem = ce('div', {
            id: 'offer_metric_' + id
        });
        elem.setAttribute('data-metric-id', id);
        addClass(elem, 'offers_edit_row nopadding clear_fix offers_edit_metric_row');
        elem.innerHTML =
            '<div class="offers_edit_label fl_l"><div class="offers_edit_metric_remove"><a onclick="Offers.removeMetric(' + id + ')">&times;</a></div></div>' +
            '<div class="offers_edit_value offers_edit_value_text fl_l">' +
            '<div class="offer_metric_title fl_l"><a id="offer_metric_title_link_' + id + '" onclick="Offers.editMetricTitle(' + id + ')">' + metricTitleText + '</a><input onblur="Offers.saveMetricTitle(' + id + ')" id="offer_metric_title_input_' + id + '" type="text" placeholder="�������� �������" value="' + metricTitleValue + '" maxlength="100"></div>' +
            '<div class="offer_metric_type fl_l"><a id="offer_metric_type_' + id + '" class="dd_link">' + metricTypeTitle + '</a></div>' +
            '</div>';
        return elem;
    },
    downloadMetricCodes: function() {
        function lockButton() {
            hide('offers_download_metric_codes_button');
            show('offers_download_metric_codes_progress');
        }

        function unlockButton() {
            show('offers_download_metric_codes_button');
            hide('offers_download_metric_codes_progress');
        }
        lockButton();
        var postIframe = ce((browser.msie && browser.version < 9.0) ? '<iframe name="secret_iframe">' : 'iframe', {
            name: 'secret_iframe',
            id: 'secret_iframe'
        });
        postIframe.style.display = 'none';
        document.body.appendChild(postIframe);
        var downloadWatcherCookieName = 'dwcookie';
        var downloadWatcherCookieValue = Math.random();
        var topUnionIdParam = (cur.topUnionId ? '&union_id=' + cur.topUnionId : '');
        var postFormParams = {
            method: 'post',
            action: '/offers?act=a_download_metric_codes' + topUnionIdParam,
            target: 'secret_iframe'
        };

        var postForm = ce('form', postFormParams);
        postForm.appendChild(ce('input', {
            type: 'hidden',
            name: 'offer_id',
            value: cur.offerId
        }));
        postForm.appendChild(ce('input', {
            type: 'hidden',
            name: downloadWatcherCookieName,
            value: downloadWatcherCookieValue
        }));
        document.body.appendChild(postForm);
        postForm.submit();

        var downloadWatcherCheckInterval = setInterval(function() {
            if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue + '-error') != -1) {
                clearInterval(downloadWatcherCheckInterval);
                unlockButton();
                showFastBox({
                    title: getLang('global_error'),
                    width: 350
                }, getLang('global_error'));
            }
            if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue) != -1) {
                unlockButton();
                clearInterval(downloadWatcherCheckInterval);
            }
        }, 500);
    },
    addMetrics: function(metrics) {
        Offers.metrics = metrics;
        for (var metricId in metrics) {
            Offers.addMetric(metricId, metrics[metricId].type, metrics[metricId].title, true);
        }
    },
    addMetric: function(metricId, metricType, metricTitle, doNotEdit) {
        Offers.metricCounter = Offers.metricCounter || 1;
        if (metricId == undefined) {
            metricId = Offers.metricCounter++;
        } else {
            metricId = parseInt(metricId);
            if (metricId >= Offers.metricCounter) {
                Offers.metricCounter = metricId + 1;
            }
        }

        metricType = metricType || 0;
        var newRow = this.generateMetricRow(metricId, metricType, metricTitle);
        newRow.setAttribute('data-metric-type', metricType);
        ge('offers_edit_metrics_container').appendChild(newRow);
        new DropdownMenu(cur.options.metricTypes, {
            target: ge('offer_metric_type_' + metricId),
            showHover: false,
            onSelect: function(event) {
                newRow.setAttribute('data-metric-type', event.data.item.i);
            }
        });
        if (!doNotEdit) {
            Offers.editMetricTitle(metricId);
        }
    },
    updateMetricsStats: function(params) {
        var obj = clone(nav.objLoc),
            url = obj[0];
        delete obj[0];
        delete obj['offset'];
        params.section = 'metrics';
        ajax.post(url, extend(obj, params, {
            load: 1
        }), {
            onDone: function(res) {
                ge('offers_metric_stats_wrap').innerHTML = res;
            },
            showProgress: function() {
                show('table_period_selector_progress');
            },
            hideProgress: function() {
                hide('table_period_selector_progress');
            }
        });
    },
    showMetricCodeBox: function(metricId) {
        var ajaxParams = {
            metric_id: metricId,
            offer_id: cur.offerId
        };

        var showOptions = {
            params: {}
        };
        showOptions.onFail = function(msg) {
            showFastBox({
                title: getLang('global_error'),
                width: 350
            }, msg);
        };
        showOptions.params = {
            width: 450,
            dark: true,
            hideButtons: true,
            bodyStyle: 'padding: 0;'
        };

        cur.editingMetricId = metricId;
        showBox('/offers?act=a_metric_code_box', ajaxParams, showOptions);

        return true;
    },
    showMetricEditBox: function(metricId) {
        var ajaxParams = {
            metric_id: metricId,
            offer_id: cur.offerId
        };

        var showOptions = {
            params: {}
        };
        showOptions.onFail = function(msg) {
            showFastBox({
                title: getLang('global_error'),
                width: 350
            }, msg);
        };
        showOptions.params = {
            width: 450,
            dark: true,
            hideButtons: true,
            bodyStyle: 'padding: 0;'
        };

        cur.editingMetricId = metricId;
        cur.metricEditBox = showBox('/offers?act=a_metric_edit_box', ajaxParams, showOptions);

        return true;
    },
    removeCurrentMetric: function(hash, force) {

        if (force) {
            ajax.post('/offers?act=a_remove_metric', {
                offer_id: cur.offerId,
                metric_id: cur.editingMetricId,
                hash: hash
            }, {
                onDone: function(result, msg, section) {
                    if (cur.confirmRemoveMetricBox) {
                        cur.confirmRemoveMetricBox.hide();
                    }
                    cur.metricEditBox.hide();
                    Offers.switchSectionsTab(ge('offers_tab_metrics'), 'metrics', false, true);
                },
                onFail: function(msg) {
                    showFastBox({
                        title: getLang('global_error'),
                        width: 350
                    }, msg);
                    return true;
                },
                showProgress: function() {
                    cur.confirmRemoveMetricBox.showProgress();
                    lockButton(ge('offer_metric_edit_box_remove'));
                },
                hideProgress: function() {
                    cur.confirmRemoveMetricBox.hideProgress();
                    unlockButton(ge('offer_metric_edit_box_remove'));
                }
            });
        } else {
            cur.confirmRemoveMetricBox = showFastBox(getLang('global_action_confirmation'), getLang('ads_offers_remove_metric_confirmation'), getLang('Delete'), Offers.removeCurrentMetric.pbind(hash, true), getLang('box_cancel'));
        }
    },
    saveCurrentMetric: function(hash) {
        ajax.post('/offers?act=a_save_metric', {
            title: ge('offer_metric_edit_box_metric_title').value,
            metric_type: cur.editBoxMetricType.value,
            offer_id: cur.offerId,
            metric_id: cur.editingMetricId,
            hash: hash
        }, {
            onDone: function(result, msg, section) {
                cur.metricEditBox.hide();
                Offers.switchSectionsTab(ge('offers_tab_metrics'), 'metrics', false, true);
            },
            onFail: function(msg) {
                showFastBox({
                    title: getLang('global_error'),
                    width: 350
                }, msg);
                return true;
            },
            showProgress: function() {
                lockButton(ge('offer_metric_edit_box_save'));
            },
            hideProgress: function() {
                unlockButton(ge('offer_metric_edit_box_save'));
            }
        });
    },
    toggleMetricLinkInput: function(show_text) {
        var link_input = ge('offers_metric_link');
        if (show_text === undefined) {
            show_text = isVisible(link_input);
        }

        if (show_text) {
            ajax.post('/offers?act=a_save_metric_link', {
                link: link_input.value,
                offer_id: cur.offerId,
                metric_id: cur.editingMetricId
            }, {
                onDone: function(result, msg, section) {
                    link_input.value = result.link;
                    toggle(ge('offers_metric_link_text_wrap'), true);
                    toggle(link_input, false);

                    var displayValue = link_input.value;
                    if (displayValue.length > 35) {
                        displayValue = displayValue.substr(0, 35) + '&hellip;';
                    }
                    ge('offers_metric_link_text').innerHTML = displayValue;
                },
                onFail: function(msg) {
                    ge('offers_metric_link_error').innerHTML = msg;
                    removeClass(ge('offers_metric_link_error'), 'unshown');
                    link_input.focus();
                    return true;
                },
                showProgress: function() {
                    addClass(ge('offers_metric_link_error'), 'unshown');
                    removeClass(ge('offers_metric_loader'), 'unshown');
                    link_input.setAttribute('disabled', 'disabled');
                },
                hideProgress: function() {
                    addClass(ge('offers_metric_loader'), 'unshown');
                    link_input.removeAttribute('disabled');
                }
            });
        } else {
            toggle(ge('offers_metric_link_text_wrap'), false);
            toggle(link_input, true);
            link_input.focus();
        }
    },
    editIntType: function() {
        if (!cur.allowIntegration) {
            return Offers.completeLinkType();
        }
        each(geByClass('offers_int_type'), function(i, elem) {
            removeClass(elem, 'disabled');
        });

        hide('offers_edit_panel_not_link', 'offers_edit_link_object_edittype');
        show('offers_edit_link_object_completetype');
        scrollToTop();
    },
    chooseIntType: function() {
        if (!cur.allowIntegration) {
            return Offers.completeLinkType();
        }

        each(geByClass('offers_int_type'), function(i, elem) {
            removeClass(elem, 'disabled');
        });
        each(geByClass('offers_edit_link_type_item', 'offers_edit_link_type_wrap'), function(i, elem) {
            addClass(elem, 'disabled');
        });
        if (cur.uiLinkId) {
            cur.uiLinkId.disable(true);
        }

        var inp = ge('offers_param_link_url');
        addClass(inp, 'disabled');
        inp.disabled = true;
        inp.setAttribute('readonly', 'readonly');

        hide('offers_edit_link_object_complete', 'offers_edit_link_object_edittype');
        show('offers_edit_panel_int_type', 'offers_edit_link_object_edit', 'offers_edit_link_object_completetype');
    },
    completeLinkType: function() {
        each(geByClass('offers_int_type'), function(i, elem) {
            addClass(elem, 'disabled');
        });

        function initTT(name, tt) {
            cur.tt_data[name] = {};
            var targetElem = ge('offers_' + name + '_wrap'),
                topOffset = tt.topOffset || -68,
                helpText = tt.text;
            var handler, context = {
                focus: false,
                over: 0,
                out: 2
            };
            var showTooltip = function() {
                AdsEdit.showHelpCriterionTooltip(name, targetElem, handler, cur.tt_data[name], helpText, -360, topOffset, cur);
            };
            var hideTooltip = function() {
                AdsEdit.hideHelpTooltip(cur.tt_data[name].tt);
            };
            handler = function(event) {
                Offers.onHelpTooltipEvent(event, name, context, showTooltip, hideTooltip);
            };
            removeEvent(targetElem, 'mouseover mouseout');
            targetElem.tt = false;
            AdsEdit.initHelpTooltipTarget(targetElem, handler, cur);
        }

        var instruction_inp = ge('offers_param_instruction');
        if (cur.linkType && cur.linkType != '0') {
            hide('offers_param_cost_inp_wrap');
            show('offers_param_cost_wrap');
            cur.uiCostSelector.setData(cur.options.joinPrices);
            if (!cur.options.canEditIntruction) {
                addClass(instruction_inp, 'disabled');
                instruction_inp.disabled = true;
                Offers.updateDefaultInstruction();
                initTT('param_instruction', cur.options.tooltips['param_instruction_disabled']);
            } else if (cur.options.is_create) {
                Offers.updateDefaultInstruction();
            }

        } else {
            hide('offers_param_cost_wrap');
            show('offers_param_cost_inp_wrap');
        }

        var inp = ge('offers_param_link_url');
        addClass(inp, 'disabled');
        inp.disabled = true;

        show('offers_edit_panel_not_link', 'offers_edit_link_object_edittype');
        hide('offers_edit_link_object_completetype');
        if (cur.offerIsIntegration == 1) { // integration
            show('offers_edit_integration_settings_int');
            hide('offers_edit_general_info', 'offers_edit_integration_settings');
        } else {
            hide('offers_edit_integration_settings_int');
            show('offers_edit_general_info', 'offers_edit_integration_settings');
        }
        if ((cur.offerIsIntegration == 1) || cur.isOfferpoint) { // show metrics
            show('offer_edit_panel_metrics');
        } else {
            hide('offer_edit_panel_metrics');
        }

        Ads.initFixed('offers_edit_audience_wrap');
        scrollToY(getXY('offers_edit_link_object')[1] - 20, 500);
    },
    editLinkType: function() {
        each(geByClass('offers_edit_link_type_item', 'offers_edit_link_type_wrap'), function(i, elem) {
            removeClass(elem, 'disabled');
        });
        if (cur.uiLinkId) {
            cur.uiLinkId.disable(false);
            cur.uiLinkId.selectItem(cur.linkId);
        }
        var inp = ge('offers_param_link_url');
        removeClass(inp, 'disabled');
        inp.disabled = false;
        inp.removeAttribute('readonly');

        hide('offers_edit_link_object_edit', 'offers_edit_panel_not_link', 'offers_edit_panel_int_type');
        show('offers_edit_link_object_complete');
        scrollToTop();
    },
    getLinkInfo: function(link) {
        if (!link) {
            return false;
        }
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
    },
    updateDefaultInstruction: function() {
        if (!cur.linkType || cur.linkType == '0') return;

        var text = cur.options.instructions[cur.linkType];
        text = text.replace('{name}', cur.uiLinkId.val_full()[1]).replace('{votes}', getLang('global_n_votes', cur.uiCostSelector.val())).replace(/&quot;/g, '"');
        val('offers_param_instruction', text);
    },

    editOnParamUpdate: function(paramName, paramValue, delayed) {
        if (!delayed) {
            setTimeout(function() {
                Offers.editOnParamUpdate(paramName, paramValue, true);
            }, 1);
            return;
        }
        var targetElem = ge('offers_param_' + paramName);
        if (!cur.params) cur.params = {};
        if (paramValue) {
            if (cur.params[paramName] === paramValue) {
                return;
            }
            cur.params[paramName] = paramValue;
        }

        switch (paramName) {
            case 'link_id':
                if (paramValue) {
                    if (cur.linkType == 'group') {
                        var link = '/club';
                    } else if (cur.linkType == 'app') {
                        var link = '/app';
                    } else {
                        return;
                    }
                    cur.linkId = paramValue;
                    geByClass1('offers_edit_link_go', 'offers_edit_link_id_go_wrap').href = link + paramValue;
                    show('offers_edit_link_id_go_wrap');
                    disableButton('offers_edit_link_object_complete_btn', false);
                } else {
                    hide('offers_edit_link_id_go_wrap');
                    disableButton('offers_edit_link_object_complete_btn', true);
                }
                break;
            case 'link_url':
                var linkUrlInfo = Offers.getLinkInfo(paramValue);
                if (linkUrlInfo) {
                    geByClass1('offers_edit_link_go', 'offers_edit_link_url_go_wrap').href = paramValue;
                    show('offers_edit_link_url_go_wrap');
                    disableButton('offers_edit_link_object_complete_btn', false);
                } else {
                    hide('offers_edit_link_url_go_wrap');
                    disableButton('offers_edit_link_object_complete_btn', true);
                }
                break;
            case 'title':
            case 'short_descr':
            case 'descr':
                var remainElem = ge('offers_param_' + paramName + '_remain_length');
                var remainLength = targetElem.getAttribute('maxlength') - targetElem.value.replace("\r", '').length;
                remainElem.innerHTML = remainLength;
                break;
            case 'users_percent':
                val(targetElem, paramValue);
                break;
            case 'cost_inp':
                val(targetElem, paramValue);
                var rub = paramValue * cur.options.voteCost;
                rub = parseInt(rub, 10) == rub ? rub.toFixed(0) : rub.toFixed(1);
                ge('offers_param_cost_currency').innerHTML = paramValue ? getLang('votes_flex', paramValue) : '';
                ge('offers_param_price').innerHTML = paramValue ? (cur.options.isNonResident ? getLang('ads_offers_price_without_nds', rub) : getLang('ads_offers_price_with_nds', rub)) : '&ndash;';
                ge('offers_param_price_notice').innerHTML = cur.options.priceNotices[paramValue] ? cur.options.priceNotices[paramValue] : (cur.options.priceNotices[''] ? cur.options.priceNotices[''] : '&nbsp;');
                if (!cur.options.canEditIntruction) {
                    Offers.updateDefaultInstruction();
                }
                break;
        }
    },
    editOnUiEvent: function(paramName, event) {
        switch (paramName) {
            case 'link_url':
                // setTimeout at least for IE
                setTimeout(function() {
                    var targetElem = ge('offers_param_' + paramName);
                    if (!targetElem) {
                        return;
                    }
                    var paramValue = targetElem.value;
                    Offers.editOnParamUpdate(paramName, paramValue);
                }, 100);
                break;
            case 'title':
            case 'short_descr':
            case 'descr':
                if (event.keyCode == 10 || event.keyCode == 13) {
                    return false;
                }

                function correctValue(delayed, event) {
                    var targetElem = ge('offers_param_' + paramName);
                    if (!targetElem) {
                        return;
                    }
                    var paramValue = targetElem.value;
                    if (browser.msie && event.type === 'paste') {
                        targetElem.blur();
                        targetElem.focus();
                    }
                    if (delayed) {
                        Offers.editOnParamUpdate(paramName, paramValue);
                    }
                }

                correctValue(false, event);

                // setTimeout at least for IE
                setTimeout(correctValue.pbind(true, event), 100);
                break;
            case 'users_percent':
                setTimeout(function() {
                    var targetElem = ge('offers_param_' + paramName);
                    if (!targetElem) {
                        return;
                    }
                    var paramValue = targetElem.value;
                    paramValue = paramValue.replace(/[^0-9]/g, '');
                    if (paramValue > 100) {
                        paramValue = 100;
                    }
                    Offers.editOnParamUpdate(paramName, paramValue);
                }, 100);
                break;
            case 'cost_inp':
                setTimeout(function() {
                    var targetElem = ge('offers_param_' + paramName);
                    if (!targetElem) {
                        return;
                    }
                    var paramValue = targetElem.value;
                    paramValue = paramValue.replace(/[^0-9]/g, '');
                    Offers.editOnParamUpdate(paramName, paramValue);
                }, 100);
                break;
        }
    },
    onHelpTooltipEvent: function(event, helpTooltipName, context, showTooltip, hideTooltip) {
        switch (event.type) {
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
                if (context.over == 1) {
                    context.over = 2;
                    context.overTimeout = setTimeout(function() {
                        showHelp();
                        delete context.overTimeout;
                    }, 100);
                }
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
                if (context.out == 1) {
                    context.out = 2;
                    context.outTimeout = setTimeout(function() {
                        hideHelp();
                        delete context.outTimeout;
                    }, 500);
                }
                break;
        }

        function showHelp() {
            if (context.focus || context.over == 2 /*&& !cur.focusedHelpTooltipName*/ ) {
                showTooltip();
            }
        }

        function hideHelp() {
            if (!context.focus && context.out == 2) {
                hideTooltip();
            }
        }
    },

    showUploadPhotoBox: function() {
        showBox('/offers', {
            act: 'a_upload_photo_box',
            offer_id: cur.offerId,
            union_id: cur.unionId
        }, {
            params: {
                width: 460
            },
            dark: 1
        });
    },
    openHelpBox: function(type, unionId) {
        showBox('/offers?act=a_help_text_box', {
            type: type,
            union_id: unionId
        }, {
            params: {
                width: 450,
                dark: 1,
                bodyStyle: 'padding: 20px;'
            },
            cache: 1
        });
        return false;
    },

    getUiCriterionDataRange: function(min, max, step, langValue, langValueAny) {
        min = intval(min);
        max = intval(max);
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
    },

    showSavingError: function(msg, section) {
        var cont = ge('offers_edit_error_' + section);
        cont.innerHTML = msg;
        show(cont);
        scrollToY(getXY(cont)[1] - 20, 500);
    },
    getOfferViewData: function() {
        var params = {
            union_id: cur.unionId,
            offer_id: cur.offerId,
            offer_is_integration: cur.offerIsIntegration,
            title: val('offers_param_title'),
            short_descr: val('offers_param_short_descr'),
            descr: val('offers_param_descr'),
            instruction: val('offers_param_instruction'),
            cost: !cur.linkType || cur.linkType == '0' ? val('offers_param_cost_inp') : cur.uiCostSelector.val(),
            link_type: cur.linkType,
            link_id: cur.uiLinkId ? cur.uiLinkId.val() : 0,
            link_url: val('offers_param_link_url'),
        };
        if (cur.photo) {
            params.photo = cur.photo;
        }
        return params;
    },
    getOfferTargetData: function() {
        var metrics = [];
        each(geByClass('offers_edit_metric_row'), function(index, elemRow) {
            var id = elemRow.getAttribute('data-metric-id');
            var type = elemRow.getAttribute('data-metric-type');
            var metric = [id, type, ge('offer_metric_title_input_' + id).value].join(';;;');
            metrics.push(metric);
        });
        var params = {
            metrics: metrics,
            country: cur.uiCountry.val(),
            city: cur.uiCity.val(),
            sex: cur.rbGender,
            age_from: cur.uiAgeFrom.val(),
            age_to: cur.uiAgeTo.val(),
            browser: cur.uiBrowser.val(),
            users_percent: val('offers_param_users_percent'),
            mobile_confirm: isChecked('offers_param_mobile_confirm'),
            only_app_start: isChecked('offers_param_only_app_start'),
            permit_apps: cur.uiPermitApps.val(),
            int_app: cur.uiChooseIntApp.val(),
            ban_apps: cur.uiBanApps.val(),
            ban_offers: cur.uiBanOffers ? cur.uiBanOffers.val() : '',
            ban_offers_users: cur.uiBanOffersUsers ? cur.uiBanOffersUsers.val() : ''
        };
        return params;
    },
    saveOffer: function(confirm_cost_lowering) {
        var params = Offers.getOfferViewData();
        params = extend(params, Offers.getOfferTargetData());
        params = extend(params, {
            confirm_cost_lowering: (confirm_cost_lowering === undefined) ? false : confirm_cost_lowering
        });
        params.hash = cur.options.hash;

        each(['offer', 'view', 'targeting', 'settings'], function(i, v) {
            hide('offers_edit_error_' + v);
        });
        ajax.post('/offers?act=a_save_offer', params, {
            onDone: function(result, msg, section) {
                if (result == 2) {
                    showFastBox(getLang('ads_offers_cost_lowering_title'), msg, getLang('box_yes'), function() {
                        Offers.saveOffer(true);
                    }, getLang('box_no'));
                    return;
                } else if (result) {
                    nav.go(msg);
                    return;
                }
                Offers.showSavingError(msg, section);
            },
            onFail: function(msg) {
                Offers.showSavingError(msg, 'offer');
                return true;
            },
            showProgress: lockButton.pbind('offers_edit_save_button'),
            hideProgress: unlockButton.pbind('offers_edit_save_button'),
        });
    },
    updateEditData: function(force, delayed) {
        if (!delayed) {
            clearTimeout(cur.updateDataTimer);
            var timeout = ((force == 2) ? 100 : (force ? 10 : 500));
            cur.updateDataTimer = setTimeout(function() {
                cur.updateDataTimer = null;
                Offers.updateEditData(false, true);
            }, timeout);
            return;
        }

        var params = {
            offer_id: cur.offerId
        };
        params = extend(params, Offers.getOfferTargetData());

        ajax.post('/offers?act=a_get_target_params', params, {
            onDone: function(result) {
                ge('offers_edit_audience_text').innerHTML = result;
            },
            showProgress: show.pbind('offers_edit_audience_progress'),
            hideProgress: hide.pbind('offers_edit_audience_progress'),
        });
    },

    statusDropdown: function(container, options) {
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
            if (type1 == type2 ||
                type1 == 2 && inArray(type2, [0, 5])) {
                return 1;
            }
            return 0;
        }

        var items = clone(options.items);
        for (var i in items) {
            if (compareTypes(items[i]['i'], options.status.type)) {
                delete items[i];
            }
        }

        var deltaTop = 0,
            deltaLeft = 0;
        if (browser.opera) deltaTop += -1;
        if (browser.mozilla) deltaTop += -1;
        if (browser.msie) {
            deltaTop += -1;
            deltaLeft += 1;
        }

        var dd = new DropdownMenu(items, {
            title: '<span class="' + geByClass('ads_status_image_span', container)[0].className + '"></span>' + options.status.title,
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
                options.status = status;
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
                        var el = se(items[i]['l']);
                        dd.setOptions({
                            title: '<span class="' + el.className + '"></span>' + options.status.title
                        });
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
    },
    initExportStats: function(topUnionId, watchControls, union_created_date) {
        cur.topUnionId = topUnionId;
        cur.watchControls = watchControls;
        cur.unionCreatedDate = union_created_date;
        cur.storedDate = {};

        var ns = Ads.getNamespace('offers_export_stats');
        ns.stats_period.options.onSelect = Offers.onExportStatsPeriodChanged;
        if (ns.offices) {
            ns.offices.options.onSelect = Offers.onExportStatsOfficesChanged;
        }
    },
    onExportStatsOfficesChanged: function(event) {
        switch (event.target.index) {
            default: show(ge('offers_export_grouping_offers'));
            break;
            case 1:
                    hide(ge('offers_export_grouping_offers'));

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
                break;
        }
    },
    onExportStatsPeriodChanged: function(event) {
        switch (event.target.index) {
            default: // dates
                cur.exportUi.start_time.setMode('d');
            if (cur.storedDate.start_time) {
                cur.exportUi.start_time.setDate(cur.storedDate.start_time.year, cur.storedDate.start_time.month, cur.storedDate.start_time.day);
            }

            cur.exportUi.stop_time.setMode('d');
            if (cur.storedDate.stop_time) {
                cur.exportUi.stop_time.setDate(cur.storedDate.stop_time.year, cur.storedDate.stop_time.month, cur.storedDate.stop_time.day);
            }
            break;
            case 1: // months
                    cur.exportUi.start_time.setMode('m');
                cur.exportUi.stop_time.setMode('m');
                break;
            case 2: // all time
                    cur.exportUi.start_time.setMode('d');
                cur.exportUi.stop_time.setMode('d');

                cur.storedDate.start_time = clone(cur.exportParamsData.start_time);
                cur.storedDate.stop_time = clone(cur.exportParamsData.stop_time);

                cur.exportUi.start_time.setDate(cur.unionCreatedDate.year, cur.unionCreatedDate.month, cur.unionCreatedDate.day);
                cur.exportUi.stop_time.setDate();

                cur.exportUi.start_time.setMode('h');
                cur.exportUi.stop_time.setMode('h');
                break;
        }
    },
    submitExportStatsForm: function() {
        if (!Ads.lock('offers_stat_export', function() {
                lockButton(cur.exportOffersStatButton);
            }, function() {
                unlockButton(cur.exportOffersStatButton);
            })) {
            return false;
        }
        var isExportMethodHtml = (Ads.getNamespace('offers_export_stats').export_method.value == 0);
        var topUnionIdParam = (cur.topUnionId ? '&union_id=' + cur.topUnionId : '');
        var downloadWatcherCookieName = 'dwcookie';
        var downloadWatcherCookieValue = Math.random();
        var postFormParams = {
            method: 'post',
            action: '/offers?act=get_export_stats' + topUnionIdParam
        };

        if (isExportMethodHtml) {
            var postFields = {};
            for (var id in cur.watchControls) {
                postFields[cur.watchControls[id]] = Ads.getNamespace('offers_export_stats')[cur.watchControls[id]].value;
            }
            postFields['start_time'] = cur.exportParamsData.start_time.year + ('0' + cur.exportParamsData.start_time.month).slice(-2) + ('0' + cur.exportParamsData.start_time.day).slice(-2);
            postFields['end_time'] = cur.exportParamsData.stop_time.year + ('0' + cur.exportParamsData.stop_time.month).slice(-2) + ('0' + cur.exportParamsData.stop_time.day).slice(-2);
            if (cur.offices_list) {
                postFields['offices_list'] = cur.offices_list.replace(/\t/g, ';');
            }
            postFields['dwcookie'] = downloadWatcherCookieValue;

            ajax.post('/offers?act=get_export_stats' + topUnionIdParam, postFields, {
                onDone: function(a) {
                    ge('offers_stats_content').innerHTML = a;
                },
                onFail: function(msg) {
                    showFastBox({
                        title: getLang('global_error'),
                        width: 350
                    }, msg);
                    return true;
                }
            });
        } else {
            var postIframe = ce((browser.msie && browser.version < 9.0) ? '<iframe name="secret_iframe">' : 'iframe', {
                name: 'secret_iframe',
                id: 'secret_iframe'
            });
            postIframe.style.display = 'none';
            document.body.appendChild(postIframe);
            postFormParams.target = 'secret_iframe';

            var postForm = ce('form', postFormParams);
            for (var id in cur.watchControls) {
                postForm.appendChild(ce('input', {
                    type: 'hidden',
                    name: cur.watchControls[id],
                    value: Ads.getNamespace('offers_export_stats')[cur.watchControls[id]].value
                }));
            }
            postForm.appendChild(ce('input', {
                type: 'hidden',
                name: 'start_time',
                value: cur.exportParamsData.start_time.year + ('0' + cur.exportParamsData.start_time.month).slice(-2) + ('0' + cur.exportParamsData.start_time.day).slice(-2)
            }));
            if (cur.offices_list) {
                postForm.appendChild(ce('input', {
                    type: 'hidden',
                    name: 'offices_list',
                    value: cur.offices_list.replace(/\t/g, ';')
                }));
            }
            postForm.appendChild(ce('input', {
                type: 'hidden',
                name: 'end_time',
                value: cur.exportParamsData.stop_time.year + ('0' + cur.exportParamsData.stop_time.month).slice(-2) + ('0' + cur.exportParamsData.stop_time.day).slice(-2)
            }));
            postForm.appendChild(ce('input', {
                type: 'hidden',
                name: 'dwcookie',
                value: downloadWatcherCookieValue
            }));
            document.body.appendChild(postForm);
            postForm.submit();
        }

        var downloadWatcherCheckInterval = setInterval(function() {
            if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue + '-error') != -1) {
                clearInterval(downloadWatcherCheckInterval);
                Ads.unlock('offers_stat_export');
                if (!isExportMethodHtml) { // ��� html ���� ���� ���������� ������ � .ajax
                    showFastBox({
                        title: getLang('global_error'),
                        width: 350
                    }, getLang('global_error'));
                }
            }
            if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue) != -1) {
                clearInterval(downloadWatcherCheckInterval);
                Ads.unlock('offers_stat_export');
            }
        }, 500);
    },
    createExportSubmitButton: function(element) {
        cur.exportOffersStatButton = element;
        (new Image()).src = '/images/upload_inv.gif'; // pre-load animation
        createButton(element, function() {
            Offers.submitExportStatsForm();
        });
    }
};

try {
    stManager.done('ads_offers.js');
} catch (e) {}