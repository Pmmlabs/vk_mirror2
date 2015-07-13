var Join = {
  show: function(el) {
    if (!isVisible(el)) slideDown(el, 150);
  },
  hide: function(el) {
    if (isVisible(el)) slideUp(el, 150);
  },

  scrollnode: function() {
    return browser.msie6 ? pageNode : window;
  },
  scrollResize: function(e, pp) {
    if (browser.mobile && !browser.safari_mobile) return;

    var de = document.documentElement, st = scrollGetY();

    if (pp === true) {
      cur.nextButtonTop = getXY(cur.nextButtonWrap)[1];
      if (browser.msie6) cur.nextButtonTop += st;
    }
    var needDock = cur.resultShown && (st + lastWindowHeight < cur.nextButtonTop + cur.nextButtonHeight);
    if (needDock && !cur.docked) {
      cur.nextButton.className = 'fixed';
      if (browser.msie6) {
        bodyNode.appendChild(cur.nextButton);
        e = {type: 'resize'};
      }
      cur.docked = true;
    } else if (!needDock && cur.docked) {
      cur.nextButton.className = '';
      if (browser.msie6) {
        cur.nextButtonWrap.appendChild(cur.nextButton);
      }
      cur.docked = false;
    }
    if (cur.docked && e && e.type == 'resize') {
      if (browser.msie6) {
        cur.nextButton.style.left = getXY(ge('content'))[0] + 'px';
      } else {
        cur.nextButton.style.left = (ge('page_layout').offsetLeft + ge('content').offsetLeft) + 'px';
        setTimeout(Join.nextResetStyle, 0);
      }
    }

    var ch = window.innerHeight || de.clientHeight || bodyNode.clientHeight;

    if (!cur.resultShown || !cur.moreLink || !isVisible(cur.moreLink)) return;
    if (st + ch > cur.moreLink.offsetTop) {
      Join.showMore();
    }
  },
  nextResetStyle: function() {
    cur.nextButton.style.left = '';
  },
  initScroll: function() {
    extend(cur, {
      nextButton: ge('join_' + cur.section + '_next'),
      nextButtonWrap: ge('join_' + cur.section + '_next_wrap'),
      imgEl: ge('join_' + cur.section + '_img'),
      rowsEl: ge('join_' + cur.section + '_rows'),
      moreLink: ge('join_' + cur.section + '_more'),
      noneWrap: ge('join_' + cur.section + '_none_wrap'),
      noneEl: ge('join_' + cur.section + '_none'),
      resultEl: ge('join_' + cur.section + '_result')
    });
    cur.nextButtonHeight = getSize(cur.nextButton)[1];
    cur.nextButtonWrap.style.height = cur.nextButtonHeight + 'px';
    cur.resultShown = isVisible(cur.resultEl);
    Join.scrollResize(false, true);

    addEvent(Join.scrollnode(), 'scroll', Join.scrollResize);
    addEvent(window, 'resize', Join.scrollResize);
    cur.destroy.push(function(c) {
      removeEvent(Join.scrollnode(), 'scroll', Join.scrollResize);
      removeEvent(window, 'resize', Join.scrollResize);
      if (browser.msie6) c.nextButtonWrap.appendChild(c.nextButton);
    });
  },

  showMore: function() {
    if (!isVisible('join_' + cur.section + '_rows')) return;
    var params = extend(cur.params, {from: cur.from});
    ajax.post('join.php', params, {
      showProgress: Join.showMoreProgress,
      hideProgress: Join.hideMoreProgress,
      onDone: Join.showRows.pbind(false),
      cache: 1
    });
  },
  showRows: function(fromStart, rows, from, preload, noClassmates) {
    cur.from = from;
    var params;
    if (fromStart) {
      if (!rows) {
        show('join_' + cur.section + '_result_msg');
        return Join.showNone(getLang('join_no_found_' + cur.section), true);
      }
      if (noClassmates) show('join_' + cur.section + '_result_msg');
      else hide('join_' + cur.section + '_result_msg');
      val(cur.rowsEl, rows);
      if (preload && preload[0]) {
        params = extend(cur.params, {from: cur.from});
        ajax.preload('join.php', params, preload);
        show(cur.moreLink);
      } else {
        hide(cur.moreLink);
      }
    } else {
      val(cur.rowsEl, val(cur.rowsEl) + rows);
      hide(cur.moreLink);
      params = extend(cur.params, {from: cur.from});
      ajax.post('join.php', params, {
        cache: 1,
        onDone: function(rows) {
          (rows ? show : hide)(cur.moreLink);
        }
      });
    }
    show(cur.resultEl);
    hide(cur.imgEl);
    cur.noneEl.style.visibility = '';
    hide('join_' + cur.section + '_none_prg');
    cur.resultShown = true;
    val('join_next_step', getLang('join_next_step'));
    //show(cur.nextButtonWrap);
    Join.scrollResize(false, true);
  },
  showNone: function(text, noSkipLabel) {
    show(cur.noneWrap, cur.imgEl);
    cur.noneEl.style.visibility = '';
    hide('join_' + cur.section + '_none_prg');
    hide(cur.resultEl);
    cur.resultShown = false;
    val('join_next_step', getLang((noSkipLabel === true) ? 'join_next_step' : 'join_skip_' + cur.section));
    //hide(cur.nextButtonWrap);
    Join.scrollResize(false, true);
  },

  init: function(section, selData) {
    selectsData.setCountries(selData.countries_list);
    var i;
    for (i in selData.countries) {
      selectsData.setCountryInfo(i, selData.countries[i]);
    }
    for (i in selData.cities) {
      selectsData.setCityInfo(i, selData.cities[i]);
    }
    if (selData.universities) {
      for (i in selData.universities) {
        selectsData.setUniversityInfo(i, selData.universities[i]);
      }
    }
    if (selData.faculties) {
      for (i in selData.faculties) {
        selectsData.setFacultyInfo(i, selData.faculties[i]);
      }
    }
    cur.section = section;
    var upd = (section == 'school') ? Join.updateSchool : Join.updateUniversity;
    cur.cityUpdated = selData.city;

    cur.uiYear = new Dropdown(ge(section + '_year'), selData.years, {
      big: 1,
      width: 180,
      placeholder: getLang('year_ph'),
      zeroPlaceholder: true,
      placeholderColor: '#777',
      selectedItems: [selData.year],
      onChange: function(value) {
        if (intval(value)) {
          Join.tipHide(cur.section + '_year_tip');
        }
        upd();
      }
    });
    if (section == 'school') {
      cur.uiClass = new ClassSelect(ge('school_class'), ge('school_class_row'), {
        show: Join.show,
        hide: Join.hide,
        big: 1,
        width: 180,
        placeholder: getLang('class_ph'),
        zeroPlaceholder: true,
        placeholderColor: '#777',
        country: selData.country,
        school: selData.school,
        school_class: selData.cur_class,
        onChange: upd
      });
      cur.uiSchool = new SchoolHintSelect(ge('school_school'), ge('school_school_row'), {
        show: function(el) {
          Join.show(el);
          if (cur.cityUpdated) {
            cur.cityUpdated = false;
            setTimeout(Join.focusWithoutDropdown, 0);
          }
        },
        hide: function(el) {
          Join.hide(el);
          Join.tipHide('school_school_tip');
        },
        big: 1,
        width: 180,
        school: selData.school_val,
        city: selData.city,
        placeholder: getLang('school_ph'),
        zeroPlaceholder: true,
        placeholderColor: '#777',
        forceEnableCustom: -1,
        classSelect: cur.uiClass,
        onChange: function(value) {
          if (intval(value)) {
            Join.show('school_year_row');
            Join.yearTip();
            Join.tipHide('school_school_tip');
          } else {
            Join.hide('school_year_row');
            Join.tipHide('school_year_tip');
          }
          upd();
        }
      });
    } else {
      cur.uiChair = new ChairSelect(ge('university_chair'), ge('university_chair_row'), {
        show: Join.show,
        hide: Join.hide,
        big: 1,
        width: 180,
        placeholder: getLang('chair_ph'),
        zeroPlaceholder: true,
        placeholderColor: '#777',
        chair: selData.chair,
        faculty: selData.faculty,
        onChange: upd
      });
      cur.uiFaculty = new FacultySelect(ge('university_faculty'), ge('university_faculty_row'), {
        show: Join.show,
        hide: Join.hide,
        big: 1,
        width: 180,
        placeholder: getLang('faculty_ph'),
        zeroPlaceholder: true,
        placeholderColor: '#777',
        faculty: selData.faculty,
        university: selData.university,
        chairSelect: cur.uiChair,
        onChange: upd
      });
      cur.uiUniversity = new UniversitySelect(ge('university_university'), ge('university_university_row'), {
        show: function(el) {
          Join.show(el);
          if (cur.cityUpdated) {
            cur.cityUpdated = false;
            setTimeout(Join.focusWithoutDropdown, 0);
          }
        },
        hide: function(el) {
          Join.hide(el);
          Join.tipHide('university_university_tip');
        },
        big: 1,
        width: 180,
        placeholder: getLang('university_ph'),
        zeroPlaceholder: true,
        placeholderColor: '#777',
        university: selData.university,
        city: selData.city,
        facultySelect: cur.uiFaculty,
        onChange: function(value) {
          if (intval(value)) {
            Join.show('university_year_row');
            Join.yearTip();
            Join.tipHide('university_university_tip');
          } else {
            Join.hide('university_year_row');
            Join.tipHide('university_year_tip');
          }
          upd();
        }
      });
    }
    cur.uiCity = new CitySelect(ge(section + '_city'), ge(section + '_city_row'), {
      show: function(el) {
        setTimeout(function() {
          if (!intval(cur.uiCity.val())) {
            Join.tipShow(cur.section + '_city_tip', 'join_' + cur.section + '_city_tip', [-35, -52, 3], 'join_phone_tt');
          }
        }, 0);
        Join.show(el);
      },
      hide: function(el) {
        Join.tipHide(cur.section + '_city_tip');
        Join.hide(el);
      },
      big: 1,
      width: 180,
      placeholder: getLang('city_ph'),
      zeroPlaceholder: true,
      placeholderColor: '#777',
      city: selData.city_val,
      country: selData.country,
      schoolSelect: (section == 'school') ? cur.uiSchool : false,
      universitySelect: (section == 'university') ? cur.uiUniversity : false,
      onChange: function(value) {
        if (intval(value)) {
          Join.tipHide(cur.section + '_city_tip');
        } else if (intval(cur.uiCountry.val())) {
          Join.tipShow(cur.section + '_city_tip', 'join_' + cur.section + '_city_tip', [-35, -52, 3], 'join_phone_tt');
        }
        cur.cityUpdated = true;
        upd();
      }
    });
    cur.uiCountry = new CountrySelect(ge(section + '_country'), ge(section + '_country_row'), {
      show: Join.show,
      hide: Join.hide,
      big: 1,
      width: 180,
      placeholder: getLang('country_ph'),
      zeroPlaceholder: true,
      placeholderColor: '#777',
      country: selData.country_val,
      citySelect: cur.uiCity,
      classSelect: (section == 'school') ? cur.uiClass : false,
      onChange: upd
    });
    if (isVisible(cur.section + '_year_row')) {
      setTimeout(Join.yearTip, 0);
    }

    cur.params = {act: section + '_load', year: selData.year};
    if (section == 'school') {
      extend(cur.params, {school: selData.school, cls: selData.cur_class});
    } else {
      extend(cur.params, {university: selData.university, faculty: selData.faculty, chair: selData.chair});
    }
    if (cur.preload[0]) {
      ajax.preload('join.php', extend(cur.params, {from: cur.from}), cur.preload);
    }
    Join.initScroll();
  },
  focusWithoutDropdown: function() {
    var dd = (cur.section == 'school') ? cur.uiSchool : cur.uiUniversity;
    if (!intval(cur.uiCity.val()) || intval(dd.val())) return;
    dd.focusSelf = true;
    dd.focus();
    dd.select.hide();
    Join.tipShow(cur.section + '_' + cur.section + '_tip', 'join_' + cur.section + '_tip', [-35, (cur.section == 'school') ? -52 : -40, 3], 'join_' + cur.section + '_tt');
  },
  yearTip: function() {
    if (intval(cur.uiYear.val())) {
      Join.tipHide(cur.section + '_year_tip');
    } else {
      Join.tipShow(cur.section + '_year_tip', 'join_' + cur.section + '_year_tip', [-35, -40, 3], 'join_year_tt');
    }
  },

  showProgress: function() {
    if (isVisible(cur.resultEl)) {
      var summary = ge('join_' + cur.section + '_summary');
      if (!summary.lastChild || !hasClass(summary.lastChild, 'progress_inline')) {
        summary.appendChild(ce('span', {className: 'progress_inline join_summary_prg'}));
      }
    } else {
      show('join_' + cur.section + '_none_prg');
      cur.noneEl.style.visibility = 'hidden';
    }
  },
  hideProgress: function() {
    if (isVisible(cur.resultEl)) {
      var summary = ge('join_' + cur.section + '_summary');
      if (summary.lastChild && hasClass(summary.lastChild, 'progress_inline')) {
        re(summary.lastChild);
      }
    } else {
      cur.noneEl.style.visibility = '';
      hide('join_' + cur.section + '_none_prg');
    }
  },

  updateSchool: function() {
    if (!intval(cur.uiCountry.val())) {
      return Join.showNone(getLang('join_select_school_city'));
    } else if (!intval(cur.uiCity.val())) {
      ajax.post('join.php', {act: 'city_last', country: cur.uiCountry.val(), city: cur.uiCity.val()});
      return Join.showNone(getLang('join_select_school_city'));
    } else if (!intval(cur.uiSchool.val())) {
      ajax.post('join.php', {act: 'city_last', country: cur.uiCountry.val(), city: cur.uiCity.val()});
      return Join.showNone(getLang('join_select_school'));
    } else if (!intval(cur.uiYear.val())) {
      ajax.post('join.php', {act: 'school_last', school: cur.uiSchool.val(), cls: cur.uiClass.val()});
      return Join.showNone(getLang('join_select_school_year'));
    }
    cur.params = {act: 'school_load', school: cur.uiSchool.val(), year: cur.uiYear.val(), cls: cur.uiClass.val()};
    ajax.post('join.php', cur.params, {
      showProgress: Join.showProgress,
      hideProgress: Join.hideProgress,
      onDone: Join.showRows.pbind(true),
      cache: 1
    });
  },
  updateUniversity: function() {
    if (!intval(cur.uiCountry.val())) {
      return Join.showNone(getLang('join_select_university_city'));
    } else if (!intval(cur.uiCity.val())) {
      ajax.post('join.php', {act: 'city_last', country: cur.uiCountry.val(), city: cur.uiCity.val()});
      return Join.showNone(getLang('join_select_university_city'));
    } else if (!intval(cur.uiUniversity.val())) {
      ajax.post('join.php', {act: 'city_last', country: cur.uiCountry.val(), city: cur.uiCity.val()});
      return Join.showNone(getLang('join_select_university'));
    } else if (!intval(cur.uiYear.val())) {
      ajax.post('join.php', {act: 'university_last', university: cur.uiUniversity.val(), faculty: cur.uiFaculty.val(), chair: cur.uiChair.val()});
      return Join.showNone(getLang('join_select_university_year'));
    }
    cur.params = {act: 'university_load', university: cur.uiUniversity.val(), faculty: cur.uiFaculty.val(), chair: cur.uiChair.val(), year: cur.uiYear.val()};
    ajax.post('join.php', cur.params, {
      showProgress: Join.showProgress,
      hideProgress: Join.hideProgress,
      onDone: Join.showRows.pbind(true),
      cache: 1
    });
  },

  clearAjaxCache: function() {
    for (var i in ajaxCache) {
      if (/^\/join\.php\#/.test(i)) {
        delete(ajaxCache[i]);
      }
    }
  },
  go: function(el, section) {
    return nav.go('/join?act=' + section, false, {showProgress: lockButton.pbind(el), hideProgress: unlockButton.pbind(el)});
  },
  skip: function(el, ev) {
    var prg = ce('div', {className: 'progress fl_r join_skip_prg'}), prnt = el.parentNode;
    return nav.go(el, ev, {
      showProgress: function() {
        if (el.parentNode == prnt) prnt.replaceChild(prg, el);
      },
      hideProgress: function() {
        if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
      }
    });
  },
  importComplete: function(el) {
    ajax.post('join.php', {act: 'import_complete', hash: cur.hash}, {
      showProgress: lockButton.pbind(el),
      hideProgress: unlockButton.pbind(el),
      onDone: function() {
      },
      onFail: function(text) {
        if (!text) return;

        showFastBox(getLang('global_error'), text);
        return true;
      }
    });
  },

  addFriend: function(el, mid) {
    var params = (cur.section == 'school') ? {school: cur.uiSchool.val(), cls: cur.uiClass.val()} : {university: cur.uiUniversity.val(), faculty: cur.uiFaculty.val(), chair: cur.uiChair.val};
    ajax.post('join.php', extend(params, {act: 'add_friend', mid: mid, year: cur.uiYear.val(), hash: cur.hash}), {
      showProgress: lockButton.pbind(el),
      hideProgress: unlockButton.pbind(el),
      onDone: function() {
        show(geByClass1('join_request', el.parentNode));//'join_request' + mid
        hide(el);//'join_add' + mid
        Join.clearAjaxCache();
      },
      onFail: function(text) {
        if (!text) return;

        showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
        return true;
      }
    });
  },
  removeFriend: function(el, mid) {
    var prg = ce('span', {className: 'progress_inline'}), prnt = el.parentNode;
    ajax.post('join.php', {act: 'remove_friend', mid: mid, hash: cur.hash}, {
      showProgress: function() {
        if (el.parentNode == prnt) prnt.replaceChild(prg, el);
      },
      hideProgress: function() {
        if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
      },
      onDone: function() {
        show(geByClass1('flat_button', el.parentNode.parentNode));//'join_add' + mid
        hide(el.parentNode);//'join_request' + mid
        Join.clearAjaxCache();
      }
    })
  },
  addImportedFriend: function(el, mid) {
    ajax.post('join.php', {act: 'add_friend', mid: mid, hash: cur.hash}, {
      showProgress: lockButton.pbind(el),
      hideProgress: unlockButton.pbind(el),
      onDone: function(text) {
        var cont = el.parentNode;
        cont.innerHTML = '<div class="friends_imp_status" style="display: none;">'+text+'</div>';
        fadeIn(cont.firstChild, 200);
      },
      onFail: function(text) {
        if (!text) return;
        showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
        return true;
      }
    });
  },

  addFriendLogged: function(btn, mid, hash) {
    ajax.post('al_friends.php', {act: 'add', mid: mid, hash: hash, from: 'fb_sign'}, {
      onDone: function() {
        hide('join_add'+mid);
        show('join_request'+mid);
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },

  removeFriendLogged: function(el, mid, hash) {
    var prg = ce('span', {className: 'progress_inline'}), prnt = el.parentNode;
    ajax.post('al_friends.php', {act: 'remove', mid: mid, hash: hash, from: 'fb_sign'}, {
      onDone: function() {
        show('join_add'+mid);
        hide('join_request'+mid);
      },
      showProgress: function() {
        if (el.parentNode == prnt) prnt.replaceChild(prg, el);
      },
      hideProgress: function() {
        if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
      }
    });
  },

  phoneDone: function(phone, cntr) {
    var phoneEl = ge('join_phone');
    if (cur.uiPhoneCountry) {
      cur.uiPhoneCountry.val(cntr, true);
    }
    val(phoneEl, phone);
    phoneEl.readOnly = true;
    if (cur.uiPhoneCountry) {
      cur.uiPhoneCountry.disable(true);
      addClass('join_phone_table', 'join_readonly_wrap');
    }
    if (cur.resendInt) {
      clearInterval(cur.resendInt);
    }
    cur.resendInt = setInterval(Join.resendUpdate, 1000);
    addClass(phoneEl, 'join_readonly');
    show('join_code_submit', 'join_other_phone', 'join_resend');
    hide('join_phone_submit');
    slideDown('join_code_row', 150, elfocus.pbind('join_code'));
    if (isVisible('join_submit_result')) slideUp('join_submit_result', 150);
    Join.initPhoneCode();
  },
  checkStatus: function(phone, cntr) {
    var box = curBox(), shprg = box ? box.showProgress : lockButton.pbind('join_send_phone'), hdprg = box ? box.hideProgress : unlockButton.pbind('join_send_phone');
    if (!cur.checkingStatus) {
      shprg();
      cur.checkingStatus = 1;
      cur.destroy.push(function() {
        clearTimeout(cur.checkingTimer);
        hdprg();
      });
    } else if (cur.checkingStatus < 0) {
      shprg();
      cur.checkingStatus = 1;
    } else {
      ++cur.checkingStatus;
      if (cur.checkingStatus > 4) {
        cur.checkingStatus = -1;
        hdprg();
        return Join.phoneDone(phone, cntr);
      }
    }
    cur.checkingTimer = setTimeout(ajax.post('join.php', {act: 'phone_check'}, {
      onDone: function(ok) {
        if (ok || cur.checkingStatus > 3) {
          cur.checkingStatus = -1;
          hdprg();
          return Join.phoneDone(phone, cntr);
        }
        cur.checkingTimer = setTimeout(Join.checkStatus.pbind(phone, cntr), 2000);
      },
      onFail: function(text) {
        cur.checkingStatus = -1;
        hdprg();
        if (!text) return Join.phoneDone(phone, cntr);

        Join.showMsg('join_submit_result', text, elfocus.pbind('join_phone'));
        return true;
      }
    }), 1000);
  },
  submitPhone: function(force) {
    if (!force && buttonLocked('join_send_phone')) return;

    var phoneEl = ge('join_phone'), phone = Join.getPhone(), phoneInputVal = val('join_phone'), cntr = cur.uiPhoneCountry ? cur.uiPhoneCountry.val_full() : false;
    if (phoneEl.disabled) return elfocus('join_code');

    ajax.post('join.php', {act: 'phone', phone: phone, hash: cur.hash}, {
      showProgress: lockButton.pbind('join_send_phone'),
      hideProgress: unlockButton.pbind('join_send_phone'),
      onDone: function(needCheck, boxBody, strong, resendDelay) {
        if (needCheck) {
          lockButton('join_send_phone');
          setTimeout(Join.submitPhone.pbind(true), 1000);
          return;
        }
        if (cur.strongCode !== strong) {
          var tip = ge('join_code_wrap').tt;
          if (tip) tip.destroy();
          cur.strongCode = strong;
        }
        cur.resendDelay = resendDelay;
        Join.phoneDone(phoneInputVal, cntr);
      },
      onFail: function(text) {
        if (!text) return;

        Join.showMsg('join_submit_result', text, elfocus.pbind('join_phone'));
        return true;
      }
    });
  },
  updateStrength: function() {
    var pwd = val('join_pass'), level = -1, pwds = ['qwerty', 'éöóêåí', 'gfhjkm', 'ïàðîëü', 'password', 'abc123', 'fuckyou', '123abc', 'baseball', 'football', 'soccer', 'monkey', 'liverpool', 'princess', 'jordan', 'slipknot', 'superman', 'iloveyou'];
    if (pwd != pwd.replace(/\s/g, '')) {
      val('join_pass', pwd = pwd.replace(/\s/g, ''));
      elfocus('join_pass');
    }
    if (pwd.length < 6) {
      level = 0;
    } else if (pwd.match(/^\d+$/) || indexOf(pwds, pwd) >= 0 || pwd.substr(-1).match(/\d/) && pwds.indexOf(pwd.substr(0, pwd.length - 1)) >= 0) {
      level = 1;
    } else {
      var groups = [/[^a-z]/g, /[^A-Z]/g, /[^à-ÿ¸]/g, /[^À-ß¨]/g, /[^0-9]/g, /[a-zA-Zà-ÿÀ-ß¸¨0-9]/g], cnts = [], big = 0;
      for (var i = 0, c = groups.length; i < c; ++i) {
        var l = pwd.replace(groups[i], '').length;
        if (l) {
          if (l > 1) ++big;
          cnts.push({group: i, cnt: l});
        }
      }
      if (cnts.length < 3) {
        if (cnts[cnts.length - 1].group != groups.length - 1 && big < 2) {
          level = 2;
        }
      }
      if (big > 2 || cnts.length > 2 && cnts[cnts.length - 1].group == groups.length - 1) {
        level = 4;
      }
      if (level < 0 && big > 1) {
        var symbs = pwd.replace(groups[groups.length - 1], '');
        if (symbs.length > 1 && symbs.replace(new RegExp(escapeRE(symbs.charAt(0)), 'g'), '').length) {
          level = 4;
        }
      }
      if (level < 0) {
        level = 3;
      }
      if (level && level < 3 && pwd.length > 13) ++level;
    }
    ge('join_about_pass').className = 'join_pwd_level' + level;
    ge('join_pass_strength').innerHTML = pwd ? getLang('join_pwd_level' + level) : '&nbsp;';
    setQuickLoginData((cur.fbSign && cur.fbValid) ? cur.fbEmail : Join.getPhone(), pwd, {params: cur.joinParams});
  },
  initPhoneCode: function() {
    if (cur.codeForm) return;
    setQuickLoginData(Join.getPhone(), '', {params: cur.joinParams});
    var el = utilsNode.appendChild(ce('div', {innerHTML: '\
<form method="POST" action="' + vk.loginscheme + '://login.vk.com/?act=check_code&_origin=' + locProtocol + '//' + locHost + '" id="join_code_form" name="join_code_form" target="join_code_frame">\
  <input type="hidden" name="email" id="join_code_phone" />\
  <input type="hidden" name="code" id="join_code_code" />\
  <input type="hidden" name="captcha_sid" id="join_code_sid" />\
  <input type="hidden" name="captcha_key" id="join_code_key" />\
</form>\
<iframe id="join_code_frame" name="join_code_frame"></iframe>\
'}));
    cur.codeForm = ge('join_code_form');
    cur.codeFrame = ge('join_code_frame');
  },
  initPhoneCountry: function(countries, country) {
    cur.countries = countries;
    cur.defCountry = country;
    cur.uiPhoneCountry = new Dropdown(ge('join_phone_country'), cur.countries, {
      selectedItems: country,
      autocomplete: true,
      width: 134,
      multiselect: false,
      onChange: function(v) {
        var ph = ge('join_phone'), pref = ge('join_phone_prefix').firstChild, code = cur.uiPhoneCountry.val_full()[3];
        debugLog(v);
        if (ph.readOnly || v === 0 || v === '0' || v === '' || v === false || v === undefined) {
          var c = val(pref);
          if (code == c) return;
          for (var i = 0, l = cur.countries.length; i < l; ++i) {
            if (cur.countries[i][3] == c) {
              return cur.uiPhoneCountry.val(cur.countries[i]);
            }
          }
          return cur.uiPhoneCountry.val(cur.defCountry, true);
        }
        val(pref, code);
        setTimeout(elfocus.pbind(ph), 0);
      }
    });
    if (ge('join_phone').readOnly) {
      cur.uiPhoneCountry.disable(true);
    }
    cur.destroy.push(cur.uiPhoneCountry.destroy.bind(cur.uiPhoneCountry));
  },
  getPhone: function() {
    var phone = trim(val('join_phone')), prefix = trim(val((ge('join_phone_prefix') || {}).firstChild) || '');
    return prefix + phone;
  },
  submitPhoneCode: function() {
    if (!cur.codeForm || buttonLocked('join_send_code')) return;

    var code = trim(val('join_code')).replace(/[^a-z0-9]/g, '');
    if (code.length < 4) {
      return notaBene('join_code');
    }
    if (code == '0593') {
      return Join.showMsg('join_submit_result', getLang('join_sorry_code'), elfocus.pbind('join_code', false, false));
    }
    val('join_code_phone', Join.getPhone());
    val('join_code_code', code);
    lockButton('join_send_code')
    cur.codeForm.submit();
  },
  askPassword: function(hash, sureBox) {
    if (curBox()) curBox().hide();
    cur.sureBoxText = sureBox;
    unlockButton('join_send_code');
    val('join_code', val('join_code_code'));
    var fb = (cur.joinParams && cur.joinParams.facebook);
    cur.joinParams = {join_code: val('join_code'), join_hash: hash};
    if (fb) {
      cur.joinParams.facebook = 1;
    }
    ge('join_code').readOnly = true;
    addClass(ge('join_code'), 'join_readonly');
    show('join_pass_submit', 'join_accept_terms');
    hide('join_other_phone', 'join_code_submit', 'join_resend');
    slideDown('join_pass_row', 150, elfocus.pbind('join_pass'));
    if (isVisible('join_submit_result')) slideUp('join_submit_result', 150);
  },
  askCaptcha: function(sid, dif) {
    if (!cur.codeForm) return;
    unlockButton('join_send_code');
    window.badCodeBox = showCaptchaBox(sid, dif, window.badCodeBox, {onSubmit: function(sid, key) {
      val('join_code_sid', sid);
      val('join_code_key', key);
      cur.codeForm.submit();
    }, onHide: function() { window.badCodeBox = false; }});
  },
  submitPasswordSure: function() {
    showFastBox(getLang('join_new_page_sure_title'), '<div class="join_sure_new_page">' + getLang('join_new_page_sure') + '</div>', getLang('join_new_page_sure_submit'), Join.submitPassword.pbind(-1), getLang('global_cancel'));
  },
  submitPassword: function(toAlready, fbLoginTo) {
    if (buttonLocked('join_send_pass') && !cur.submitOnSign) return;

    if (fbLoginTo === true) {
      var pass = '000000';
    } else {
      var pass = val('join_pass');
      if (pass.length < 6) return notaBene('join_pass');
    }

    if (cur.sureBoxText && toAlready !== 1 && toAlready !== -1) {
      showFastBox({title: getLang('join_sure_detach'), hideButtons: true, width: 430, noCloseButton: true, bodyStyle: 'padding: 16px 14px 5px'}, cur.sureBoxText).changed = true;
      ge('join_submit_old').style.position = ge('join_submit_new').style.position = 'relative';
      return;
    }
    cur.joinParams.join_to_already = intval(toAlready);
    if (cur.fbSign && !cur.fbSigned) {
      cur.submitOnSign = 1;
      return lockButton('join_send_pass');
    }

    if (!window._oldOnLoginFailed) {
      window._oldOnLoginFailed = onLoginFailed;
      window._oldOnLoginDone = onLoginDone;
      cur.destroy.push(function() {
        onLoginFailed = _oldOnLoginFailed;
        onLoginDone = _oldOnLoginDone;
        _oldOnLoginFailed = false;
        _oldOnLoginDone = false;
      });
    }
    onLoginFailed = function(code, opts) {
      if (code === -1) {
        location.href = location.href.replace(/^http:/, 'https:');
      } else if (code === 4) {
        location.href = '/login.php?m=1&email=' + opts.email;
      } else {
        nav.reload();
      }
    };
    onLoginDone = nav.go.pbind('join.php?act=done')
    if (cur.fbSign && (cur.fbValid || fbLoginTo === true)) {
      var login = cur.fbEmail;
      cur.joinParams['fb_id'] = cur.fbId;
    } else {
      var login = Join.getPhone();
    }
    submitQuickLoginForm(login, pass, {prg: 'join_send_pass', params: cur.joinParams});
  },

  showMsg: function(id, text, handler) {
    var el = ge(id);
    val(el, text);
    if (isVisible(el)) {
      animate(el, {backgroundColor: '#F4EBBD'}, 100, animate.pbind(el, {backgroundColor: '#F9F6E7'}, 2000));
      handler();
    } else {
      slideDown(el, 100, handler);
    }
  },
  codeFailed: function(triesLeft) {
    if (curBox()) curBox().hide();
    unlockButton('join_send_code');
    var text = getLang('join_wrong_code');
    triesLeft = intval(triesLeft);
    if (triesLeft < 0) {
      text = getLang('join_code_failed');
    } else if (triesLeft && triesLeft < 6) {
      text += '<br>' + getLang('join_tries_left').replace('{count}', '<b>' + triesLeft + '</b>');
    }
    Join.showMsg('join_submit_result', text, elfocus.pbind('join_code'));
    if (window._oldOnLoginFailed) onLoginFailed = _oldOnLoginFailed;
  },
  submitCode: function() {
    if (buttonLocked('join_send_code')) return;

    var code = val('join_code');
    if (code.length < 8) return notaBene('join_code');

    if (!window._oldOnLoginFailed) {
      window._oldOnLoginFailed = onLoginFailed;
      cur.destroy.push(function() {
        onLoginFailed = _oldOnLoginFailed;
        _oldOnLoginFailed = false;
      });
    }
    onLoginFailed = function(code) {
      if (code === -1) {
        location.href = location.href.replace(/^http:/, 'https:');
      } else {
        Join.codeFailed();
      }
    };
    submitQuickLoginForm(Join.getPhone(), code, {prg: 'join_send_code'})
  },
  resendUpdate: function() {
    if (cur.resendDelay > 0) {
      ge('join_resend').innerHTML = getLang('join_resend_code_time').replace('%s', Math.floor(cur.resendDelay / 60) + ':' + (cur.resendDelay % 60 < 10 ? '0' : '') + (cur.resendDelay % 60));
      cur.resendDelay--;
    } else {
      ge('join_resend').innerHTML = '<a id="join_resend_lnk" onclick="return Join.noCode()">' + getLang('join_no_code') + '</a>';
      clearInterval(cur.resendInt);
    }
  },
  noCode: function() {
    var prg = ce('span', {className: 'progress_inline'}), el = ge('join_resend_lnk'), prnt = el.parentNode;
    ajax.post('join.php', {act: 'resend', hash: cur.hash}, {
      showProgress: function() {
        if (el.parentNode == prnt) prnt.replaceChild(prg, el);
      },
      hideProgress: function() {
        if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
      },
      onDone: function(text, html, btn, cancel) {
        if (html && btn) {
          hide('join_submit_result');
          showFastBox({title: text, width: 430, noCloseButton: true}, html, btn, Join.call, cancel).changed = true;
        } else if (html) {
          hide('join_submit_result');
          showFastBox({title: text, width: 430}, html);
        } else {
          Join.showMsg('join_submit_result', text);
        }
      }
    });
    return false;
  },
  changePhone: function() {
    var phoneEl = ge('join_phone');
    phoneEl.readOnly = false;
    removeClass(phoneEl, 'join_readonly');
    if (cur.uiPhoneCountry) {
      cur.uiPhoneCountry.disable(false);
      cur.uiPhoneCountry.val(cur.uiPhoneCountry.val(), true);
      removeClass('join_phone_table', 'join_readonly_wrap');
    }
    show('join_phone_submit');
    hide('join_code_submit', 'join_other_phone', 'join_resend');
    slideUp('join_code_row', 150);
    elfocus('join_phone');
  },
  call: function() {
    ajax.post('join.php', {act: 'call', hash: cur.hash}, {progress: curBox().progress, onDone: function(text) {
      curBox().hide();
      Join.showMsg('join_submit_result', text);
    }});
  },

  activeTab: function(el) {
    var p = el.parentNode.parentNode;
    for (var i = p.firstChild; i; i = i.nextSibling) {
      if (i.className == 'active_link') {
        i.className = '';
      }
    }
    el.parentNode.className = 'active_link';
  },

  tipShow: function(el, key, shift, addClass) {
    el = ge(el);
    var text = getLang(key);
    if (shift[1] == -52 && text.split('<br>')[0].length < 41) {
      shift[1] += 5;
    }
    var showTT = function() {
      showTooltip(el, {
        text: '<div class="join_finish_tt_pointer"></div>' + text,
        slideX: 15,
        className: 'join_finish_tt' + (addClass ? (' ' + addClass) : ''),
        shift: shift,
        forcetoup: true,
        onCreate: removeEvent.pbind(el, 'mouseout')
      });
    }
    if (vk.loaded) {
      setTimeout(showTT, 0);
    } else {
      addEvent(window, 'load', showTT);
    }
  },
  tipHide: function(el) {
    el = ge(el);
    if (el && el.tt && el.tt.hide) el.tt.hide();
  },
  phoneTip: function(fb) {
    if (ge('join_phone').readOnly) return;
    return Join.tipShow('join_phone_wrap', 'join_phone_tip', [-147, fb ? -89 : -95, 3], 'join_phone_tt');
  },
  codeTip: function() {
    if (ge('join_code').readOnly || cur.strongCode > 0) return;
    return Join.tipShow('join_code_wrap', cur.strongCode ? 'join_code_voice_tip' : 'join_code_tip', [-147, -82, 3]);
  },
  passTip: function() {
    return Join.tipShow('join_pass_wrap', 'join_pass_tip', [-147, -82, 3]);
  },
  switchToDefSign: function(hash, obj) {
    ajax.post('join.php', {act: 'logout', hash: hash, noredir: 1},{
      onDone: function() {
        showBox('join.php', {act: 'box', from: nav.strLoc}, {}, event);
      },
      showProgress: lockButton.pbind(obj),
      hideProgress: unlockButton.pbind(obj)
    });
  }
};

try{stManager.done('join.js');}catch(e){}
