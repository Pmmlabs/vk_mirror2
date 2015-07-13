Abuse = {
  changeReasonDD: [],
  switchSection: function (newSection, event) {
    if (checkEvent(event)) {
      return false;
    }
    hide('ab_pages');
    show('ab_progress');
    var params = clone(cur.options.base_params || {0: 'abuse'});
    if (newSection != 'all') {
      params = extend(params, {section: newSection});
    }
    return nav.go(params);
  },
  switchActivitySection: function (oid, reason, solved, section, event) {
    if (checkEvent(event)) {
      return true;
    }
    ajax.post('abuse.php', {act: 'a_get_activity', reason: reason, solved: solved, oid: oid, section: section}, {
      showProgress: setStyle.pbind('ab_owner_header_progress' + oid, {display: 'inline'}),
      hideProgress: hide.pbind('ab_owner_header_progress' + oid),
      onDone: function (html) {
        var suffix = '';
        if (section == 'recent_media' || section == 'recent_photos' || section == 'recent_videos' || section == 'photos' || section == 'videos') {
          suffix = '_media';
        }
        val('ab_abuserow_activity' + suffix + oid, html);
      }
    });
    return false;
  },
  checkActivity: function (oid, ev, el, event) {
    if (Abuse.checkActivityClick(el, event)) {
      return;
    }
    var isOn = false, checked = cur.checkedActivity[oid];
    if (checked == undefined) {
      checked = cur.checkedActivity[oid] = {};
    } else if (checked[ev]) {
      isOn = true;
    }
    toggleClass(ge('ab_abuserow_activity_' + ev), 'ab_abuserow_activity_on');
    if (isOn) {
      delete checked[ev];
    } else {
      checked[ev] = 1;
    }
  },
  checkActivityClick: function (el, event) {
    event = event || window.event;
    if (!el && !event) return false;
    var target = event.target || event.srcElement,
        i = 4,
        foundGood = false,
        checkeRE = /ab_abuserow_activity_info|ab_userow_activity_photo|ab_abuserow_wall/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          target.tagName == 'A' ||
          target.tagName == 'IMG' ||
          target.tagName == 'TEXTAREA' ||
          (foundGood = checkeRE.test(target.className))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  checkLogMsg: function (msg_id) {
    var pos = indexOf(cur.selMsgs, msg_id), row = ge('mess' + msg_id);
    if (!row || cur.deletedRows[msg_id]) return;
    if (pos == -1) {
      if (cur.selMsgs.length >= 100) {
        return false;
      }
      cur.selMsgs.push(msg_id);
      addClass(row, 'im_sel_row');
      removeClass(ge('mess_check' + msg_id), 'im_log_check_on');
      setStyle('ma' + msg_id, {visibility: ''});
    } else {
      cur.selMsgs.splice(pos, 1);
      removeClass(row, 'im_sel_row');
    }
    val('im_n_marked', getLang('mail_im_X_sel_msgs', cur.selMsgs.length));
    toggle('im_tabs', !cur.selMsgs.length);
    toggle('im_log_controls', cur.selMsgs.length);
  },

  solve: function (oid, status, hash) {
    var evs = [];
    if (cur.checkedActivity) each(cur.checkedActivity[oid] || {}, function (ev) {evs.push(ev)});

    ajax.post('abuse.php', {act: 'a_solve', oid: oid, status: status, evs: evs.join(','), hash: hash, reason: ge('top_reason_'+oid).value}, {
      onDone: function (text) {
        val('ab_abuserow_solveform' + oid, text);
      }
    });
    val('ab_abuserow_solveform' + oid, '<div class="progress ab_admin_solve_progress"></div>');
    if (cur.options) {
      if (!cur.options.section) {
        cur.pgOffset--;
        cur.pgCount--;
        animate('ab_abuserow' + oid, {opacity: 0.5}, 200);
      } else {
        cur.pgOffset++;
        cur.pgCount++;
      }
    }
    return false;
  },
  solveCancel: function (oid, solved, hash) {
    ajax.post('abuse.php', {act: 'a_cancel_solve', oid: oid, solved: solved, hash: hash}, {
      onDone: function (text) {
        val('ab_abuserow_solveform' + oid, text);
      }
    });
    val('ab_abuserow_solveform' + oid, '<div class="progress ab_admin_solve_progress"></div>');
    if (cur.options) {
      if (!cur.options.section) {
        cur.pgOffset++;
        cur.pgCount++;
        animate('ab_abuserow' + oid, {opacity: 1}, 200);
      } else {
        cur.pgOffset--;
        cur.pgCount--;
      }
    }
    return false;
  },
  toKorneev: function (oid, hash) {
    ajax.post('abuse.php', {act: 'a_to_korneev', oid: oid, hash: hash}, {
      onDone: function (text) {
        val('ab_abuserow_solveform' + oid, text);
      }
    });
    val('ab_abuserow_solveform' + oid, '<div class="progress ab_admin_solve_progress"></div>');
    return false;
  },
  reasonsBox: function (oid, type, solved) {
    return showBox('abuse.php', {act: 'a_reasons_box', oid: oid, type: type || 0, solved: solved || 0}, {
      params: {bodyStyle: 'height: 300px; padding: 0;'}
    });
  },
  showFullPhoto: function (oid, src, targ) {
    if (cur.photoSrc != src) {
      hide(cur.photo);
      val(cur.photo, '<img class="ab_full_photo" src="' + (cur.photoSrc = src) + '"/>');
    }
    show(cur.photo);
    var pos = getXY(targ);
    setStyle(cur.photo, {top: pos[1], left: pos[0] - 210});
  },
  hideFullPhoto: function () {
    hide(cur.photo);
  },
  initCommon: function () {
    placeholderSetup('ab_search');
    addEvent(ge('ab_search'), 'keydown', function (e) {
      if (e.keyCode != KEY.RETURN) {
        return;
      }
      var v = val(this);
      if (!v) return;
      hide('ab_pages');
      show('ab_progress');
      nav.go({0: 'abuse', q: v});
    });
    bodyNode.insertBefore(cur.photo = ce('div', {id: 'ab_full_photo'}), ge('page_wrap'));
    cur.destroy.push(re.pbind(cur.photo));

    cur._back = {
      text: getLang('global_back'),
      show: [],
      hide: [Abuse.hideFullPhoto],
      loc: false
    };
    if (window.Pagination && cur.initScrollFn) {
      cur._back.show.push(Pagination.reinit.pbind(false));
      cur._back.hide.push(Pagination.deinit);
    }
  },
  init: function (opts) {
    extend(cur, {
      options: opts,
      checkedActivity: {},
      module: 'abuse',

      pgStart: opts.start,
      pgOffset: opts.offset,
      pgCount: opts.count,
      pgPerPage: opts.per_page,
      pgCont: ge('ab_rows'),
      pgMore: ge('ab_more_link'),
      pgPages: ge('ab_pages'),
      pgMorePrg: ge('ab_more_progress'),
      pgPreload: opts.preload,
      pgUrl: opts.url,
      pgParams: opts.params,
      pgHref: opts.href
    });
    Pagination.init();
    cur.destroy.push(Pagination.deinit);
    Abuse.initCommon();
  },
  initModerators: function(opts) {
    var tableOptions = {layout: {topControl: '', bottomControl: ''}, noControls: 1};
    cur.paginatedTable = new PaginatedTable(ge('paginated_table'), tableOptions, opts.table_content);
    Abuse.initCommon();
  },
  initSingle: function (opts) {
    extend(cur, {
      options: opts || {},
      checkedActivity: {},
      module: 'abuse'
    });
    Abuse.initCommon();
  },
  initChangeReasonDD: function (oid) {
    if (Abuse.changeReasonDD[oid]) {
      re(Abuse.changeReasonDD[oid].container);
    }
    Abuse.changeReasonDD[oid] = new DropdownMenu([[1,'Порнография'],[2,'Спам'],[3,'Угрозы']], {
      target: ge('ab_changetype_' + oid + '_dd'),
      value: (ge('top_reason_' + oid)) ? ge('top_reason_' + oid).value : 0,
      fadeSpeed: 0,
      onSelect: function(event) {
        ge('top_reason_' + oid).value = event.target.index || 0;
      }
    });
  },
  changeReason: function(obj, oid, i) {
    ge('top_reason_' + oid).value = i;
    addClass(obj, 'on');
    for (j = 1; j <= 3; j++) {
      if (j != i) removeClass(ge('ab_reason_' + oid + '_' + j), 'on');
    }
  }
}


try{stManager.done('abuse.js');}catch(e){}