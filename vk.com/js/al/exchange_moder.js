var ExchangeModer = {
  requestsInit: function() {
    each(geByClass('exchange_moder_request'), function(i, el) {
      var requestId = el.id.replace('exchange_moder_request', '');
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
        if (isFunction(cur.uiReasonsControls[requestId])) {
          cur.uiReasonsControls[requestId] = cur.uiReasonsControls[requestId]();
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
  },

  processRequestWithConfitmation: function(action, requestId) {
    function executeProcessRequest() {
      ExchangeModer.processRequest(action, requestId);
      msgBov.hide();
    }
    var msgBov = showFastBox('Подтверждение', 'Вы уверены? Все заявки будут отменены!', 'Да, оклонить и отменить', executeProcessRequest, getLang('box_cancel'));

  },
  processRequest: function(action, requestId) {
    var requestParams = cur.requestsParams[requestId];
    if (!requestId || !requestParams) {
      return;
    }
    var resultArea = ge('moder_request_result_area' + requestId);

    var params = extend(requestParams, {
      action: action,
      comment: val('moder_comment' + requestId)
    });
    if ((action === 'disapprove') || (action === 'force_disapprove')) {
      params.moder_rules = cur.uiReasonsControls[requestId].getSelectedItems().join(',');
    }

    ajax.post('/exchangemoder?act=a_process_request', params, {
      onDone: onComplete.pbind(false),
      onFail: onComplete.pbind(true),
      showProgress: function () {
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
        msg = 'Ошибка!';
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
        fadeOut('exchange_moder_request' + requestId, 500);
      }
      return true;
    }
  },
  showRequestInfo: function(requestId) {
    showBox('/exchangemoder?act=a_request_info_box', {request_id: requestId}, {dark: 1});
  },
  loadRequests: function(type, btn) {
    var params = {requests: type, load: 1};
    var rq = geByClass('exchange_moder_request', 'exchange_moder_requests_container');

    if (!type || type == '') {
      params['last_id'] = rq[rq.length - 1].id.replace('exchange_moder_request', '');
    } else {
      params['cur_ids'] = [];
      for (i in rq) {
        params['cur_ids'].push(rq[i].id.replace('exchange_moder_request', ''));
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
  refundRequest: function (gid, ad_id, request_id, from_office, hash) {
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
        title: 'Подтверждение действия',
        dark: true,
        width: 400,
        bodyStyle: bodyStyle
      },  '<div id="exchange_box_error" class="error" style="display: none;"></div>' +
          '<div>Заявка будет переведена в статус &laquo;Невыполненные&raquo;, деньги списаны с группы и возвращены рекламодателю. В случае нехватки денег на счету группы, заявка отменена не будет.</div>',
      'Откатить', doRefundRequest, 'Отмена');
  },
  doRefund: function (hash) {
    var clubId = parseInt(cur.uiRefundClub.val());
    if (!clubId) {
      showFastBox(getLang('global_error'), 'Выберите сообщество');
      return;
    }
    var refundAmount = parseInt(ge('exchange_moder_refund_amount').value);
    if (!refundAmount) {
      showFastBox(getLang('global_error'), 'Укажите сумму компенсации');
      return;
    }

    if (refundAmount > 20000) {
      showFastBox(getLang('global_error'), 'Сумма компенсации ограничена 20 000 руб.');
      return;
    }

    var refundComment = ge('exchange_moder_refund_comment').value;
    if (!refundComment) {
      showFastBox(getLang('global_error'), 'Укажите комментарий');
      return;
    }
    if (refundComment.length > 220) {
      showFastBox(getLang('global_error'), 'Максимальная длина комментария составляет 220 символов');
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
          showFastBox('Операция завершена', 'Деньги успешно переведены', 'Закрыть', function () { nav.reload(); });
        },
        onFail: function(text) {
          ge('exchange_box_error').innerHTML = text;
          show('exchange_box_error');
          return true;
        }
      });
    };

    var refundAmountWithNds = refundAmount*1.18;
    showFastBox('Подтверждение действия',  '<div id="exchange_box_error" class="error" style="display: none;"></div>' +
          '<div>Подтвердите перевод ' + refundAmount + ' руб. (' + refundAmountWithNds.toFixed(2) + ' руб. с НДС) сообществу &laquo;' + clubTitle + '&raquo;.</div>',
      'Перевести деньги', doClubRefund, 'Отмена');
  },
  doUpdateCheckMoneyQueue: function(hash) {
    ajax.post('/exchangemoder', {
      act: 'a_get_queue',
      hash: hash
    }, {
      onDone: function(html) {
        ge('exchange_moder_queue_container').innerHTML = html;
      },
      showProgress: function () {
        removeClass('exchange_moder_check_money_progress', 'unshown');
      },
      hideProgress: function () {
        addClass('exchange_moder_check_money_progress', 'unshown');
      }
    });
  },
  doCheckMoney: function (hash) {
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
      showProgress: function () {
        lockButton(ge('exchange_moder_check_money_button'));
      },
      hideProgress: function () {
        unlockButton(ge('exchange_moder_check_money_button'));
      }
    });
  },

  showFullPost: function(id) {
    var elems = ['exchange_moder_post'+id, 'exchange_moder_last_post'+id];
    for (var i in elems) {
      var el = elems[i];
      if (!ge(el)) continue;

      var post = geByClass1('exchange_post_msg', el);
      if (!post) {
        return;
      }

      removeClass(post.parentNode, 'exchange_preview_short');
      setStyle(post, {maxHeight: 'none'});
    }
  },
  slideFullPost: function(id) {
    var elems = ['exchange_moder_post'+id, 'exchange_moder_last_post'+id];
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
        animate(post, {maxHeight: realSize}, 200, ExchangeModer.showFullPost.pbind(id));
        animate(more, {height: 0}, 200);
      }
    }
  }
};

try{stManager.done('exchange_moder.js');}catch(e){}
