var ExchangeModer = {
    requestsInit: function() {
        cur.processRequestLock = {};
        each(geByClass('exchange_moder_request'), function(i, el) {
            var requestId = el.getAttribute('data-request-id');
            var requestKey = el.id.replace('exchange_moder_request', '');
            if (cur.uiReasonsControls[requestKey]) {
                return;
            }

            placeholderSetup('moder_comment_' + requestKey);
            cur.uiReasonsControls[requestKey] = function() {
                return new Ads.MultiDropdownMenu(cur.moderReasons, {
                    target: ge('moder_reason_menu_' + requestKey),
                    columnsCount: 2
                });
            };
            cur.uiReasonsControlsInit[requestKey] = function(elem) {
                elem.removeAttribute('onmouseover');
                if (isFunction(cur.uiReasonsControls[requestKey])) {
                    cur.uiReasonsControls[requestKey] = cur.uiReasonsControls[requestKey]();
                }
            };

            var wpt = geByClass1('wall_post_text', el);
            if (wpt) {
                var realSize = getSize(wpt.parentNode)[1];
                if (realSize < 185) {
                    var post_wrap = geByClass1('exchange_preview_short', el);
                    if (post_wrap) {
                        removeClass(post_wrap, 'exchange_preview_short');
                    }
                }
            }
        });
        ExchangeModer.initMultipleRequests();
    },

    processRequest: function(action, requestKey, requestKeyModer, onCompleteExternal) {
        var requestParams = cur.requestsParams[requestKey];
        if (!requestKey || !requestKeyModer || !requestParams) {
            return;
        }
        var resultArea = ge('moder_request_result_area' + requestKey);

        var moderComment = (val('moder_comment_' + requestKeyModer) || '').trim();
        var moderRules = cur.uiReasonsControls[requestKeyModer].getSelectedItems();

        if (action === 'approve' ||
            (action === 'disapprove' && (moderComment.length || moderRules.length))) {
            var result = ExchangeModer.premoderationProcessRequestsMassCheck(action, requestKey);
            if (result) {
                return;
            }
        }

        var params = extend(requestParams, {
            action: action,
            comment: moderComment
        });
        if (action === 'disapprove') {
            params.moder_rules = moderRules.join(',');
        }

        ajax.post('/exchangemoder?act=a_process_request', params, {
            onDone: onComplete.pbind(false),
            onFail: onComplete.pbind(true),
            showProgress: function() {
                resultArea.innerHTML = '<img src="/images/upload.gif" />';
            }
        });

        if (cur.processRequestLock[requestKey]) {
            return;
        }
        cur.processRequestLock[requestKey] = true;

        function onComplete(isError, response) {
            delete cur.processRequestLock[requestKey];
            var msg = response.msg || '';
            if (!msg) {
                isError = true;
                msg = '������!';
            } else if (response.error) {
                isError = true;
            }
            resultArea.innerHTML = msg;
            if (isError) {
                removeClass(resultArea, 'exchange_moder_request_result_success');
                addClass(resultArea, 'exchange_moder_request_result_error');
            } else {
                removeClass(resultArea, 'exchange_moder_request_result_error');
                addClass(resultArea, 'exchange_moder_request_result_success');
            }
            if (!response.tmp_error && nav.objLoc.requests) {
                fadeOut('exchange_moder_request' + requestKey, 500);
            }
            if (isFunction(onCompleteExternal)) {
                onCompleteExternal(response, requestKey, msg);
            }
            return true;
        }
    },
    showRequestInfo: function(requestId) {
        showBox('/exchangemoder?act=a_request_info_box', {
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
        var rq = geByClass('exchange_moder_request', 'exchange_moder_requests_container');

        if (!type || type == '') {
            params['last_id'] = rq[rq.length - 1].getAttribute('data-request-id');
        } else {
            params['cur_ids'] = [];
            for (i in rq) {
                params['cur_ids'].push(rq[i].getAttribute('data-request-id'));
            }
            params['cur_ids'] = params['cur_ids'].join(',');
        }
        ajax.post('/exchangemoder', params, {
            onDone: function(response, js) {
                if (!isObject(response)) {
                    ge('ads_page').innerHTML = response;
                    eval('(function(){' + js + ';})()');
                    return;
                }

                if (response.requests) {
                    ge('exchange_moder_requests_container').innerHTML += response.requests;
                }
                if (response.work_stopped) {
                    ge('exchange_moder_requests_container').innerHTML = '';
                    cur.requestsParams = {};
                    cur.uiReasonsControls = {};
                    if (cur.checkNewRequestsInt) {
                        clearInterval(cur.checkNewRequestsInt);
                        cur.checkNewRequestsInt = false;
                    }
                }
                if (response.button) {
                    ge('exchange_moder_button_container').innerHTML = response.button;
                }
                ge('exchange_moder_summary').innerHTML = response.summary;
                if (js) {
                    eval('(function(){' + js + ';})()');
                    ExchangeModer.requestsInit();
                }

                if (type == 'work_start') {
                    cur.checkNewRequestsInt = setInterval(ExchangeModer.checkNewRequests, 5000);
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
        ExchangeModer.loadRequests('work');
    },
    refundRequest: function(gid, ad_id, request_id, from_office, hash) {
        var doRefundRequest = function() {
            ajax.post('/exchangemoder', {
                act: 'a_refund_request',
                gid: gid,
                ad_id: ad_id,
                request_id: request_id,
                from_office: from_office,
                hash: hash
            }, {
                progress: curBox().progress,
                onDone: function() {
                    curBox().hide();
                    re('exchange_request' + request_id);
                    Exchange.reArrangeRows('exchange_request_row');
                },
                onFail: function(text) {
                    ge('exchange_box_error').innerHTML = text;
                    show('exchange_box_error');
                    return true;
                }
            });
        };

        var bodyStyle = 'line-height: 160%; padding: 16px 20px;';
        showFastBox({
                title: '������������� ��������',
                dark: true,
                width: 400,
                bodyStyle: bodyStyle
            }, '<div id="exchange_box_error" class="error" style="display: none;"></div>' +
            '<div>������ ����� ���������� � ������ &laquo;�������������&raquo;, ������ ������� � ������ � ���������� �������������. � ������ �������� ����� �� ����� ������, ������ �������� �� �����.</div>',
            '��������', doRefundRequest, '������');
    },
    doRefund: function(hash) {
        var clubId = parseInt(cur.uiRefundClub.val());
        if (!clubId) {
            showFastBox(getLang('global_error'), '�������� ����������');
            return;
        }
        var refundAmount = parseInt(ge('exchange_moder_refund_amount').value);
        if (!refundAmount) {
            showFastBox(getLang('global_error'), '������� ����� �����������');
            return;
        }

        // check on server
        /*if (refundAmount > 10000) {
          showFastBox(getLang('global_error'), '����� ����������� ���������� 10 000 ���.');
          return;
        }*/

        var refundComment = ge('exchange_moder_refund_comment').value;
        if (!refundComment) {
            showFastBox(getLang('global_error'), '������� �����������');
            return;
        }
        if (refundComment.length > 220) {
            showFastBox(getLang('global_error'), '������������ ����� ����������� ���������� 220 ��������');
            return;
        }

        var selectedItems = cur.uiRefundClub.selectedItems();
        var clubTitle = selectedItems[0][1];

        var doClubRefund = function() {
            ajax.post('/exchangemoder', {
                act: 'a_refund',
                gid: clubId,
                amount: refundAmount,
                comment: refundComment,
                hash: hash
            }, {
                progress: curBox().progress,
                onDone: function() {
                    curBox().hide();
                    showFastBox('�������� ���������', '������ ������� ����������', '�������', function() {
                        nav.reload();
                    });
                },
                onFail: function(text) {
                    ge('exchange_box_error').innerHTML = text;
                    show('exchange_box_error');
                    return true;
                }
            });
        };

        var refundAmountWithNds = refundAmount * 1.18;
        showFastBox('������������� ��������', '<div id="exchange_box_error" class="error" style="display: none;"></div>' +
            '<div>����������� ������� ' + refundAmount + ' ���. (' + refundAmountWithNds.toFixed(2) + ' ���. � ���) ���������� &laquo;' + clubTitle + '&raquo;.</div>',
            '��������� ������', doClubRefund, '������');
    },
    doUpdateCheckMoneyQueue: function(hash) {
        ajax.post('/exchangemoder', {
            act: 'a_get_queue',
            hash: hash
        }, {
            onDone: function(html) {
                ge('exchange_moder_queue_container').innerHTML = html;
            },
            showProgress: function() {
                removeClass('exchange_moder_check_money_progress', 'unshown');
            },
            hideProgress: function() {
                addClass('exchange_moder_check_money_progress', 'unshown');
            }
        });
    },
    doCheckMoney: function(hash) {
        ajax.post('/exchangemoder', {
            act: 'a_check_money',
            union_id: ge('exchange_moder_check_money_union_id').value,
            hash: hash
        }, {
            onDone: function() {
                ge('exchange_moder_check_money_union_id').value = '';
                ExchangeModer.doUpdateCheckMoneyQueue(hash);
            },
            onFail: function(text) {
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: function() {
                lockButton(ge('exchange_moder_check_money_button'));
            },
            hideProgress: function() {
                unlockButton(ge('exchange_moder_check_money_button'));
            }
        });
    },

    showFullPost: function(id) {
        var elems = ['exchange_moder_post' + id, 'exchange_moder_last_post' + id];
        for (var i in elems) {
            var el = elems[i];
            if (!ge(el)) continue;

            var post = geByClass1('exchange_post_msg', el);
            if (!post) {
                return;
            }

            removeClass(post.parentNode, 'exchange_preview_short');
            setStyle(post, {
                maxHeight: 'none'
            });
        }
    },
    slideFullPost: function(id) {
        var elems = ['exchange_moder_post' + id, 'exchange_moder_last_post' + id];
        for (var i in elems) {
            var el = elems[i];
            if (!ge(el)) continue;

            var post = geByClass1('exchange_post_msg', el);
            var more = geByClass1('exchange_post_msg_more', el);
            if (!post || !more) {
                return;
            }

            var wpt = geByClass1('wall_post_text', post);
            if (wpt) {
                var realSize = getSize(wpt.parentNode)[1];
                animate(post, {
                    maxHeight: realSize
                }, 200, ExchangeModer.showFullPost.pbind(id));
                animate(more, {
                    height: 0
                }, 200);
            }
        }
    }
};

ExchangeModer.initMultipleRequests = function() {
    var checkBoxElements = geByClass('multiple_requests_cb');

    for (var i in checkBoxElements) {
        var requestCb = checkBoxElements[i];
        var requestKey = requestCb.getAttribute('data-request-key');
        var toptUnionId = requestCb.getAttribute('data-top-union-id');
        cur.uiMultipleRequestsCbs[requestKey] = new Checkbox(requestCb, {
            label: "",
            width: "20px",
            onChange: (function(toptUnionId, requestKey, value) {
                if (value) {
                    ExchangeModer.multipleRequestsAddRequest(toptUnionId, requestKey);
                } else {
                    ExchangeModer.multipleRequestsRemoveRequest(requestKey);
                }
            }).pbind(toptUnionId, requestKey)
        });
    }
};

ExchangeModer.multipleRequestsAddRequest = function(topUnionId, requestKey, cb) {
    if (cur.multipleRequestsTopUnionId && cur.multipleRequestsTopUnionId != topUnionId) {
        var requests = cur.multipleRequestsIds;
        for (var idx = cur.multipleRequestsIds.length - 1; idx >= 0; idx--) {
            this.multipleRequestsRemoveRequest(cur.multipleRequestsIds[idx]);
        }
        cur.multipleRequestsIds = [];
    } else if (!cur.multipleRequestsTopUnionId) {
        cur.multipleRequestsIds = [];
    }

    cur.multipleRequestsTopUnionId = topUnionId;
    cur.multipleRequestsIds.push(requestKey);

    var requestElem = ge('exchange_moder_request' + requestKey);
    addClass(requestElem, 'exchange_moder_request_ad_choosen');
};

ExchangeModer.multipleRequestsRemoveRequest = function(requestKey) {
    var requestElem = ge('exchange_moder_request' + requestKey);
    var index = cur.multipleRequestsIds.indexOf(requestKey);
    if (index > -1) {
        cur.multipleRequestsIds.splice(index, 1);
        removeClass(requestElem, 'exchange_moder_request_ad_choosen');
        cur.uiMultipleRequestsCbs[requestKey].checked(0);
    }
};

ExchangeModer.premoderationProcessRequestsMassCheck = function(action, requestKey) {
    var requestsKeys = [],
        needMultipleClearence = true,
        allRequestsKeys;

    if (action !== 'approve' && action !== 'disapprove') {
        return false;
    }

    if (cur.multipleRequestsIds.length && (cur.multipleRequestsIds.indexOf(requestKey) != -1)) {
        requestsKeys = cur.multipleRequestsIds;
    } else {
        requestsKeys = requestsKeys.concat(requestKey);
    }

    allRequestsKeys = requestsKeys.slice();
    if (allRequestsKeys.length == 1) {
        return false;
    }

    allRequestsKeys = allRequestsKeys.filter(function(elem, pos, arr) {
        return arr.indexOf(elem) == pos;
    });

    var confirmTitle = ((action === 'approve') ? '�������� ���������' : '�������� ����������');

    processAll(needMultipleClearence);
    return true;

    function processAll(cleanMultipleRequests) {
        if (cleanMultipleRequests) {
            cleanMultipleChoices();
        }
        ExchangeModer.premoderationProcessRequestsMass(action, requestKey, allRequestsKeys, confirmTitle);
    }

    function cleanMultipleChoices() {
        for (var idx = cur.multipleRequestsIds.length - 1; idx >= 0; idx--) {
            ExchangeModer.multipleRequestsRemoveRequest(cur.multipleRequestsIds[idx]);
        }
    }
};

ExchangeModer.premoderationProcessRequestsMass = function(action, requestKeyModer, requestsKeys, confirmTitle) {
    var totalCount = requestsKeys.length;
    var completeCount = 0;
    var approvedCount = 0;
    var disapprovedCount = 0;
    var errorCount = 0;
    var responseInfos = [];
    var requestKey;

    for (var i = 0; requestKey = requestsKeys[i]; i++) {
        setTimeout(ExchangeModer.processRequest.pbind(action, requestKey, requestKeyModer, onComplete), 100 * i);
    }

    function onComplete(response, responseRequestKey, responseText) {
        var responseAdId = cur.requestsParams[responseRequestKey].ad_id;
        responseInfos.push('<a href="/exchange?act=post&ad_id=' + responseAdId + '" target="_blank">' + responseAdId + ' - ' + responseText + '</a>');

        if (response && (response.approved || response.disapproved)) {
            if (response.approved) {
                approvedCount++;
            }
            if (response.disapproved) {
                disapprovedCount++;
            }
        } else {
            errorCount++;
            removeClass(ge('exchange_moder_request' + responseRequestKey), 'unshown');
        }
        completeCount++;

        if (completeCount == totalCount && errorCount) {
            setTimeout(drawResults, 1000);
        }
    }

    function drawResults() {
        var box = showFastBox({
            title: confirmTitle,
            hideButtons: true
        }, cur.massBoxHtml);
        var resultElem = geByClass1('exchange_moder_mass_result', box.bodyNode);
        var resultTextElem = geByClass1('exchange_moder_mass_result_text', box.bodyNode);
        var resultMoreElem = geByClass1('exchange_moder_mass_result_more', box.bodyNode);

        box.setOptions({
            'hideButtons': false
        });

        var resultText = '';
        if (approvedCount) {
            resultText += '��������: ' + approvedCount + '<br>';
        }
        if (disapprovedCount) {
            resultText += '���������: ' + disapprovedCount + '<br>';
        }
        resultText += '������: ' + errorCount + '<br>';

        resultTextElem.innerHTML = resultText;
        resultMoreElem.innerHTML = responseInfos.join('<br>');
        show(resultElem);
    }
};

ExchangeModer.onSearchPostsTextKeyUp = function(event) {
    if (event.keyCode == 13) {
        ExchangeModer.searchPostsText();
    }
};

ExchangeModer.searchPostsText = function() {
    var text = ge('ads_posts_moder_search_posts_text').value;
    var approvedOnly = hasClass(ge('ads_posts_moder_search_posts_approved_only'), 'on');
    if (!text.length) {
        text = false;
    }
    nav.change({
        text: text,
        offset: false,
        approved_only: approvedOnly
    });
};

ExchangeModer.onToggleSearchPostsApprovedOnly = function(elem) {
    toggleClass(elem, 'on');
    ExchangeModer.searchPostsText();
};

try {
    stManager.done('exchange_moder.js');
} catch (e) {}