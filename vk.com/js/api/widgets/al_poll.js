WPoll = {
  resetPollVote: function (option_id) {
    hide('wpoll_revote_link_wrap');
    WPoll.go('form', {
      act: 'a_unvote',
      option_id: option_id,
      hash: cur.options.vote_hash
    }, function (res) {
      toggle('wpoll_revote_link_wrap', !res);
    });
    return false;
  },
  doVote: function (option_id) {
    WPoll.go('results', {
      act: 'a_vote',
      option_id: option_id,
      hash: cur.options.vote_hash
    }, function (res) {
      if (res) {
        show('wpoll_revote_link_wrap');
        if (window.curNotifier && !curNotifier.lp_started) {
          WPoll.lpStart();
        }
      }
    });
    return false;
  },
  submitShare: function () {
    var msg = trim(val('wpoll_sharetxt'));
    if (!msg) {
      notaBene('wpoll_sharetxt');
      return;
    }
    ajax.post('al_widget_poll.php', {
      act: 'a_share',
      poll_id: cur.options.poll_id,
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      hash: cur.options.vote_hash,
      part: 1
    }, {
      onDone: function (footer) {
        val('wpoll_footer', footer);
        WPoll.resizeWidget();
      },
      showProgress: lockButton.pbind(ge('wpoll_share_btn')),
      hideProgress: unlockButton.pbind(ge('wpoll_share_btn'))
    });
  },
  switchToAdmin: function () {
    WPoll.go(cur.section == 'admin' ? 'results' : 'admin', {}, function (res) {
      if (res) {
        cur.num_answers = 2;
      }
    });
    return false;
  },
  go: function (section, params, cb) {
    ajax.post('al_widget_poll.php', extend({
      poll_id: cur.options.poll_id,
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      section: section,
      part: 1
    }, params || {}), {
      onDone: function (content, footer, options) {
        cur.section = options.section;
        val('wpoll_content', content);
        val('wpoll_footer_wrap', footer);
        toggle('wpoll_footer_wrap', footer);
        cur.num_answers = 2;
        WPoll.resizeWidget();
        cb && cb(true);
      },
      onError: cb && cb.pbind(false),
      showProgress: show.pbind('wpoll_head_progress'),
      hideProgress: hide.pbind('wpoll_head_progress')
    });
    return false;
  },
  admIncAnswers: function () {
    if (cur.num_answers >= 20) return false;
    cur.num_answers++;
    show('wpoll_answer' + cur.num_answers);
    ge('wpoll_adm_inc').className = cur.num_answers >= 20 ? 'wpoll_adm_inc_disabled' : '';
    ge('wpoll_adm_dec').className = cur.num_answers <= 2 ? 'wpoll_adm_inc_disabled' : '';
    WPoll.resizeWidget();
    return false;
  },
  admDecAnswers: function () {
    if (cur.num_answers <= 2) return false;
    hide('wpoll_answer' + cur.num_answers);
    cur.num_answers--;
    ge('wpoll_adm_inc').className = cur.num_answers >= 20 ? 'wpoll_adm_inc_disabled' : '';
    ge('wpoll_adm_dec').className = cur.num_answers <= 2 ? 'wpoll_adm_inc_disabled' : '';
    return false;
  },
  admSubmitNewPoll: function () {
    var question = trim(val('wpoll_question_txt')),
        answer, answers = [], i;
    if (!question) {
      notaBene('wpoll_question_txt');
      return;
    }
    for (i = 1; i <= cur.num_answers; i++) {
      if (answer = trim(val('wpoll_answer' + i))) {
        answers.push(answer);
      }
    }
    if (!answers.length) {
      notaBene('wpoll_answer1');
      return;
    }
    ajax.post('al_widget_poll.php', {
      act: 'a_create_poll',
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      question: question,
      answers: answers.join('#@*'),
      hash: cur.options.admin_hash,
      part: 1
    }, {
      onDone: function () {
        location.reload();
      },
      showProgress: lockButton.pbind(ge('wpoll_submit_new_poll')),
      hideProgress: unlockButton.pbind(ge('wpoll_submit_new_poll'))
    });
    return false;
  },
  admSelectPreviousPoll: function (poll_id) {
    ajax.post('al_widget_poll.php', {
      act: 'a_set_poll',
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      new_poll_id: poll_id,
      hash: cur.options.admin_hash,
      part: 1
    }, {
      onDone: function () {
        location.reload();
      },
      showProgress: show.pbind('wpoll_head_progress')
    });
    return false;
  },
  initVotingForm: function () {
    if (!ge('wpoll_options_wrap')) {
      return;
    }
    if (!vk.id) {
      each (geByClass('radiobtn', ge('wpoll_options_wrap')), function () {
        this.onclick = function () {WPoll.auth();};
      });
      return;
    }
    radioBtns.wpoll = {
      els: Array.prototype.slice.apply(geByClass('radiobtn', ge('wpoll_options_wrap'))),
      val: 0
    };
  },
  resizeWidget: function () {
    if (!cur.heightEl || !cur.Rpc) return;
    var size = getSize(cur.heightEl)[1];
    if (browser.msie && !browser.msie8 || browser.opera) size += 15;
    cur.Rpc.callMethod('resize', size);
  },
  auth: function () {
    var
      screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
      features = 'width=655,height=479,left=' + parseInt(screenX + ((outerWidth - 655) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 479) / 2.5), 10);
      var active = this.active = window.open(location.protocol + '//oauth.vk.com/authorize?client_id=-1&redirect_uri=close.html&display=widget', 'vk_openapi', features);
      function checkWnd() {
        if (active.closed) {
         window.gotSession(true);
        } else {
         setTimeout(checkWnd, 1000);
        }
      }
      checkWnd();
  },

  /* Long-poll methods */
  initQTransport: function (options) {
    window.curNotifier = extend(options, {
      lp_connected: false,
      error_timeout: 1
    });
    WPoll.lpInit();
    // debugLog(options, cur.section);
    if (cur.section == 'results') {
      WPoll.lpStart();
    }
  },
  lpGetTransportWrap: function () {
    var queueCont = ge('queue_transport_wrap');
    if (!queueCont) {
      queueCont = ce('div', {id: 'queue_transport_wrap'});
      utilsNode.appendChild(queueCont);
    }
    return queueCont;
  },
  lpInit: function () {
    if (curNotifier.lpMakeRequest) return;
    delete curNotifier.lpMakeRequest;
    re('queue_transport_frame');
    WPoll.lpGetTransportWrap().appendChild(
      ce('iframe', {
        id: 'queue_transport_frame',
        name: 'queue_transport_frame',
        src: curNotifier.frame_path
      })
    );
  },
  lpStart: function () {
    curNotifier.lp_started = true;
    WPoll.lpCheck();
  },
  lpStop: function () {
    curNotifier.lp_started = false;
    clearTimeout(curNotifier.lp_check_to);
    clearTimeout(curNotifier.lp_error_to);
  },
  lpCheck: function () {
    if (!curNotifier.lp_started) return;
    if (!curNotifier.lpMakeRequest) {
      curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1000);
      return;
    }
    curNotifier.lpMakeRequest(curNotifier.frame_url, {
      act: 'a_check',
      ts: curNotifier.timestamp,
      key: curNotifier.key,
      id: curNotifier.uid,
      wait: 25
    }, function (text) {
      if (!curNotifier.lp_started) return;
      try {
        var success = this.lpChecked(eval('(' + text + ')'));
        if (success) {
          this.lpCheck();
          curNotifier.error_timeout = 1;
        }
      } catch (e) {
        topError('Notify error: ' + e.message);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
      }
    }.bind(this), function (msg) {
//        topError('Notify error: ' + msg);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
    }.bind(this));
  },
  lpChecked: function(response) {
    // debugLog('response', response);
    var failed = response.failed;
    if (failed == 2) {
      curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
      return false;
    } else if (failed) {
      throw getLang('global_unknown_error');
    }

    curNotifier.timestamp = response.ts;
    if (!cur.section.indexOf('admin')) {
      return true;
    }
    if (cur.options.fixed_height) {
      var scrollCont = ge('WPoll_posts_wrap'),
          postsCont = ge('WPoll_posts'),
          st = scrollCont.scrollTop, sh = postsCont.offsetHeight;
    }
    each (response.events, function (k, v) {
      WPoll.pushEvent(v);
    });
    if (cur.options.fixed_height) {
      if (st > 100) {
        scrollCont.scrollTop = st + (postsCont.offsetHeight - sh);
      } else {
        scrollCont.scrollTop = 0;
      }
      cur.scrollbar && cur.scrollbar.update(false, true);
    }
    return true;
  },
  lpGetKey: function () {
    var stNow = vkNow();
    ajax.post('al_widget_poll.php', {act: 'a_get_key', id: curNotifier.uid, app: cur.options.app, poll_id: cur.options.poll_id}, {
      onDone: function (key, ts) {
        curNotifier.timestamp = ts;
        curNotifier.key = key;
        this.lpCheck();
      }.bind(this),
      onFail: function (code) {
        if (code == 3) {
          location.reload();
          return;
        }
        curNotifier.error_timeout = 64;
        this.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
        return true;
      }.bind(this)
    });
  },
  pushEvent: function (ev_text) {
    var ev = ev_text.split('<!>'), ev_ver = ev[0], ev_type = ev[1];
    if (ev_ver != cur.options.qversion) {
      location.reload();
      return;
    }
    switch (ev_type) {
      case 'stats_update':
        if (cur.section == 'results') {
          val('wpoll_content', ev[2]);
        }
        break;

      case 'poll_update':
        cur.options.poll_id = ev[2];
        val('wpoll_content', ev[3]);
        val('wpoll_footer_wrap', '');
        hide('wpoll_footer_wrap');
        break;
    }
  },
  init: function (options) {
    cur.options = options;
    cur.section = cur.options.section;
    cur.heightEl = ge('wpoll_page');
    if (options.qtransport) {
      WPoll.initQTransport(options.qtransport);
    }
    WPoll.initVotingForm();

    cur.RpcMethods = {
      onInit: function() {
        setTimeout(function () {
          WPoll.resizeWidget();
        }, 0);
        setTimeout(function () {
          WPoll.resizeWidget();
        }, 500);
      }
    };
    try {
      cur.Rpc = new fastXDM.Client(cur.RpcMethods, {safe: true});
      cur.resizeInt = setInterval(WPoll.resizeWidget, 1000);
    } catch (e) {
      debugLog(e);
      // Return scroll
    }
  }
}

function goAway(url) { return true; }
function gotSession (session_data) {
  location.reload();
}

try{stManager.done('api/widgets/al_poll.js');}catch(e){}

