var OffersModer = {
    requestsInit: function() {
        each(geByClass('offers_moder_request'), function(i, el) {
            var requestId = el.id.replace('offers_moder_request', '');
            if (cur.uiReasonsControls[requestId]) {
                return;
            }

            placeholderSetup('moder_comment' + requestId);
            cur.uiReasonsControls[requestId] = function() {
                return new Ads.MultiDropdownMenu(cur.moderReasons, {
                    target: ge('moder_reason_menu_' + requestId),
                    columnsCount: 2
                });
            };
            cur.uiReasonsControlsInit[requestId] = function(elem) {
                elem.removeAttribute('onmouseover');
                cur.uiReasonsControls[requestId] = cur.uiReasonsControls[requestId]();
            };
        });
    },

    processRequest: function(action, requestId) {
        var requestParams = cur.requestsParams[requestId];
        if (!requestId || !requestParams) {
            return;
        }
        var resultArea = ge('moder_request_result_area' + requestId);

        var params = extend(requestParams, {
            action: action,
            comment: val('moder_comment' + requestId),
        });
        if (action === 'disapprove') {
            params.moder_rules = cur.uiReasonsControls[requestId].getSelectedItems().join(',');
        }

        ajax.post('/offersmoder?act=a_process_request', params, {
            onDone: onComplete.pbind(false),
            onFail: onComplete.pbind(true),
            showProgress: function() {
                resultArea.innerHTML = '<img src="/images/upload.gif" />';
            }
        });

        if (cur.processRequestLock) {
            return;
        }
        cur.processRequestLock = true;

        function onComplete(isError, response) {
            cur.processRequestLock = false;
            var msg = response.msg || '';
            if (!msg) {
                isError = true;
                msg = '������!';
            } else if (response.error) {
                isError = true;
            }
            resultArea.innerHTML = msg;
            if (isError) {
                removeClass(resultArea, 'offers_moder_request_result_success');
                addClass(resultArea, 'offers_moder_request_result_error');
            } else {
                removeClass(resultArea, 'offers_moder_request_result_error');
                addClass(resultArea, 'offers_moder_request_result_success');
            }
            if (!response.tmp_error && nav.objLoc.requests) {
                fadeOut('offers_moder_request' + requestId, 500);
            }
            return true;
        }
    },
    showRequestInfo: function(requestId) {
        showBox('/offersmoder?act=a_request_info_box', {
            request_id: requestId
        }, {
            dark: 1
        });
    },
    loadRequests: function(type, btn) {
        var params = {
            requests: type,
            load: 1
        };
        var rq = geByClass('offers_moder_request', 'offers_moder_requests_container');

        if (!type || type == '') {
            params['last_id'] = rq[rq.length - 1].id.replace('offers_moder_request', '');
        } else {
            params['cur_ids'] = [];
            for (i in rq) {
                params['cur_ids'].push(rq[i].id.replace('offers_moder_request', ''));
            }
            params['cur_ids'] = params['cur_ids'].join(',');
        }
        ajax.post('/offersmoder', params, {
            onDone: function(response, js) {
                if (!isObject(response)) {
                    ge('ads_page').innerHTML = response;
                    eval('(function(){' + js + ';})()');
                    return;
                }

                if (response.requests) {
                    ge('offers_moder_requests_container').innerHTML += response.requests;
                }
                if (response.work_stopped) {
                    ge('offers_moder_requests_container').innerHTML = '';
                    cur.requestsParams = {};
                    cur.uiReasonsControls = {};
                    if (cur.checkNewRequestsInt) {
                        clearInterval(cur.checkNewRequestsInt);
                        cur.checkNewRequestsInt = false;
                    }
                }
                if (response.button) {
                    ge('offers_moder_button_container').innerHTML = response.button;
                }
                ge('offers_moder_summary').innerHTML = response.summary;
                if (js) {
                    eval('(function(){' + js + ';})()');
                    OffersModer.requestsInit();
                }

                if (type == 'work_start') {
                    cur.checkNewRequestsInt = setInterval(OffersModer.checkNewRequests, 5000);
                }
            },
            showProgress: function() {
                if (btn) lockButton(btn);
            },
            hideProgress: function() {
                if (btn) unlockButton(btn);
            }
        });
    },
    checkNewRequests: function() {
        OffersModer.loadRequests('work');
    },

    showPreview: function(offerId) {
        var box = showBox('/offersmoder', {
            act: 'a_preview_box',
            offer_id: offerId
        }, {
            params: {
                width: 500,
                bodyStyle: 'padding: 25px; line-height: 180%;'
            },
            dark: 1
        });
        box.removeButtons().addButton(getLang('ads_offers_moder_test_box_btn'), function() {
            ge('start_offer').submit();
            box.hide();
        });
    },
    showLog: function(offerId) {
        showBox('/offersmoder', {
            act: 'a_testlogs_box',
            offer_id: offerId
        }, {
            params: {
                width: 700,
                bodyStyle: 'padding: 25px; line-height: 180%;',
                hideButtons: 1
            },
            dark: 1
        });
    },
    searchOffers: function(field_class) {

        var q = geByClass(field_class);
        lockButton(ge("btn_search_all_offers"));
        if (!q || !q[0].value) {
            unlockButton(ge("btn_search_all_offers"));
            return;
        }

        q = q[0].value;

        var params = {
            'q': q,
            'act': 'all_offers'
        };

        ajax.post('/offersmoder', params, {
            onDone: function(response, js) {
                var list_area = ge('all_offers_list');
                list_area.innerHTML = response;
                unlockButton(ge("btn_search_all_offers"));
            }
        });
    },
    doCompensation: function() {
        var button = ge('ads_offers_moder_do_compensation');
        if (!Ads.lock('do_compensation', function() {
                lockButton(button);
            }, function() {
                unlockButton(button);
            })) {
            return false;
        }

        ajax.post('/offersmoder?act=a_do_compensation', {
            user_id: ge('ads_offers_moder_compensation_uid').value,
            app_id: ge('ads_offers_moder_compensation_app_id').value,
            votes: ge('ads_offers_moder_compensation_votes').value,
            comment: ge('ads_offers_moder_compensation_comment').value
        }, {
            onDone: function() {
                showFastBox('�������', '�������');
                return true;
            },
            onFail: function(msg) {
                showFastBox(getLang('ads_error_box_title'), msg);
                return true;
            },
            hideProgress: function() {
                Ads.unlock('do_compensation');
            }
        });
    }
};

try {
    stManager.done('ads_offers_moder.js');
} catch (e) {}