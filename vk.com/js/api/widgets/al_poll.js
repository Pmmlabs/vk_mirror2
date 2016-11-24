var WPoll = {

  init: function (options) {
    extend(cur, {
      options: options,
      section: options.section,
      heightEl: geByClass1('_wpoll_page'),
      wrapEl: geByClass1('_wpoll_wrap'),
      contentEl: geByClass1('_wpoll_content'),
      footerEl: geByClass1('_wpoll_footer'),
      optionsEl: geByClass1('_wpoll_options'),
      maxAnswers: 5,
      num_answers: 2
    });

    this.override('lite.js');
    stManager.emitter.addListener('update', this.override.bind(this));

    if (options.qtransport) {
      this.initQTransport(options.qtransport);
    }

    if (cur.optionsEl) {
      if (vk.id) {
        radioBtns.wpoll = {
          els: [].slice.apply(geByClass('radiobtn', cur.optionsEl)),
          val: 0
        };
      } else {
        each(geByClass('radiobtn', cur.optionsEl), function (k, v) {
          v.onclick = Widgets.oauth.bind(Widgets);
        }.bind(this));
      }
    }

    cur.RpcMethods = {
      onInit: function() {
        var resizeWidget = this.resizeWidget.bind(this);
        setTimeout(resizeWidget, 0);
        setTimeout(resizeWidget, 500);
      }.bind(this),
    };

    try {
      cur.Rpc = new fastXDM.Client(cur.RpcMethods, {safe: true});
      cur.resizeInt = setInterval(this.resizeWidget.bind(this), 1000);
    } catch (e) {
      debugLog(e);
    }
  },

  progress: function(param) {
    toggleClass(cur.wrapEl, 'wpoll_content_loading', param);
    cur.progress = param;
  },

  resizeWidget: function self() {
    if (!cur.heightEl || !cur.Rpc) return;
    var size = getSize(cur.heightEl)[1];
    if (browser.msie && !browser.msie8 || browser.opera) size += 15;
    window.onBodyResize && onBodyResize();
    cur.Rpc.callMethod('resize', size);
  },

  switchSection: function (section, params, callback) {
    if (cur.progress) return;

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
        replaceClass(bodyNode, 'wpoll_section_admin wpoll_section_results wpoll_section_empty wpoll_section_form', 'wpoll_section_' + cur.section);
        val(cur.contentEl, content || '');
        val(cur.footerEl, footer || '');
        cur.num_answers = 2;
        callback && callback(true);
        this.resizeWidget();
      }.bind(this),
      onError: callback && callback.pbind(false),
      showProgress: this.progress.bind(this, true),
      hideProgress: this.progress.bind(this)
    });
  },

  admDisablePoll: function() {
    if (cur.progress) return;

    ajax.post('al_widget_poll.php', {
      act: 'a_disable_poll',
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      hash: cur.options.admin_hash
    }, {
      onDone: location.reload.bind(location),
      showProgress: this.progress.bind(this, true),
      hideProgress: this.progress.bind(this)
    });
  },

  admAddAnswer: function() {
    var addEl = geByClass1('_wpoll_add'),
      answersEl = geByClass1('_wpoll_answers'),
      inputEl = null;
    if (cur.num_answers < cur.maxAnswers) {
      cur.num_answers++;
      inputEl = domFC(cf(cur.options.answerTpl));
      domInsertBefore(inputEl, addEl);
      inputEl = geByTag1('input', inputEl);
      inputEl.focus();
      this.resizeWidget();
    }
    cur.num_answers >= cur.maxAnswers ? hide(addEl) : show(addEl);
    return inputEl;
  },

  admRemoveAnswer: function(crossEl) {
    var addEl = geByClass1('_wpoll_add');
    re(domPN(crossEl));
    --cur.num_answers >= 20 ? hide(addEl) : show(addEl);
  },

  admSubmitNewPoll: function (btn) {
    if (cur.progress || buttonLocked(btn)) return;

    var questionEl = geByClass1('_wpoll_question'),
      answersEl = geByClass1('_wpoll_answers'),
      question = val(questionEl),
      answers = [],
      answer = null,
      i = null;

    if (!question) return notaBene(questionEl);
    if (!cur.num_answers) return notaBene(this.admAddAnswer());

    each(geByTag('input', answersEl), function(k, v) {
      if (answer = trim(val(v))) answers.push(answer);
    });

    if (!answers.length) return notaBene(geByTag1('input', answersEl));

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
      onDone: location.reload.bind(location),
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },

  resetPollVote: function (option_id) {
    this.switchSection('form', {
      act: 'a_unvote',
      option_id: option_id,
      hash: cur.options.vote_hash
    }, function (success) {
      toggleClass(bodyNode, 'wpoll_my_vote', !success);
      cur.my_vote = !success;
    });
  },

  doVote: function (option_id) {
    this.switchSection('results', {
      act: 'a_vote',
      option_id: option_id,
      hash: cur.options.vote_hash
    }, function (success) {
      toggleClass(bodyNode, 'wpoll_my_vote', success);
      cur.my_vote = success;
      success && cur.options.qtransport && window.curNotifier && !curNotifier.lp_started && this.lpStart();
    }.bind(this));
  },

  override: function(file) {
    if (!StaticFiles[file] || file !== 'lite.js') return;
    extend(window, {

      showTooltip: Widgets.showTooltip,

      showBox: Widgets.showBox(),

      showCaptchaBox: Widgets.showCaptchaBox,

      showReCaptchaBox: Widgets.showReCaptchaBox,

      gotSession: function(session_data) {
        location.reload();
      }

    });
  },

  submitShare: function (btn) {
    if (cur.progress || buttonLocked(btn)) return;

    var txtEl = geByClass1('_wpoll_share'),
      msg = trim(val(txtEl));
    if (!msg) return notaBene(txtEl);

    ajax.post('al_widget_poll.php', {
      act: 'a_share',
      poll_id: cur.options.poll_id,
      page_query: cur.options.page_query,
      url: cur.options.poll_url,
      app: cur.options.app,
      hash: cur.options.vote_hash,
      message: msg,
      part: 1
    }, {
      onDone: function (footer) {
        val(cur.footerEl, footer);
        this.resizeWidget();
      }.bind(this),
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
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
      onDone: location.reload.bind(location),
      showProgress: this.progress.bind(this, true)
    });
    return false;
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
      curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
    }.bind(this));
  },

  lpChecked: function(response) {
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

    each (response.events, function (k, v) {
      WPoll.pushEvent(v);
    });
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
          val(cur.contentEl, ev[2]);
        }
      break;

      case 'poll_update':
        cur.options.poll_id = ev[2];
        val(cur.contentEl, ev[3]);
        toggleClass(bodyNode, 'wpoll_my_vote', false);
        cur.my_vote = false;
        val(cur.footerEl, '');
        hide(cur.footerEl);
      break;
    }
  }

};

try{stManager.done('api/widgets/al_poll.js');}catch(e){}
