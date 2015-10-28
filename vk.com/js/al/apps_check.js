var AppsCheck = {

init: function() {
  cur.nav.push((function(changed, old, n) {
    if (changed[0] === undefined && changed['act']) {
      this.switchSection(n['act']);
      return false;
    }
  }).bind(this));
  if (cur.section == 'comments') {
    each(geByTag('textarea', ge('apps_check_content')), function() { placeholderSetup(this, {back: true}); });
    removeEvent(document, 'click', this.hideEditPostReply);
    addEvent(document, 'click', this.hideEditPostReply);
  }
  var tab = ge('tab_counter_'+cur.section);
  if (tab) {
    if (cur.totalCount && cur.totalCount < 100 && cur.section != 'reports') {
      tab.innerHTML = '+'+cur.totalCount;
    }
    cur.tabCount = parseInt(tab.innerHTML);
    toggleClass(ge('tab_'+cur.section), 'count', !!cur.tabCount);
  }
},

switchTab: function(tab, event) {

  if (tab == cur.section) return;
  var el = ge('tab_' + tab);
  if (el) {
    var tabs = geByClass('active_link', ge('apps_tabs'));
    for (var i in tabs) {
      removeClass(tabs[i], 'active_link');
    }
    addClass(el, 'active_link');
  }
  show('apps_check_progress');
  nav.change({act: tab});
  return false;
},

switchNavTab: function(tab, event, noCache) {
  if (tab == cur.section) return;
  var el = ge('nav_tab_' + tab);
  if (el) {
    var tabs = geByClass('app_tab_selected', ge('apps_nav_tabs'));
    for (var i in tabs) {
      tabs[i].className = 'app_tab';
    }
    el.className = 'app_tab_selected';
  }
  show('apps_check_progress');
  nav.change({act: tab});
  return false;
},

switchSection: function(act) {
  ajax.post('apps_check', {act: act, load: 1}, {
    onDone: function(content, script, summary, title, nav_tabs) {
      hide('apps_check_progress');
      ge('apps_check_content').innerHTML = content;
      if (script) {
        try {
          eval(script);
        } catch(e) {
          console.error(e.stack);
          console.log(script);
        }
      }
      if (summary) ge('apps_summary').innerHTML = summary;
      if (title) document.title = replaceEntities(stripHTML(title));
      if (nav_tabs) {
        ge('apps_nav_tabs').innerHTML = nav_tabs;
        show('apps_nav_tabs');
      } else {
        ge('apps_nav_tabs').innerHTML = '';
        hide('apps_nav_tabs');
      }
      AppsCheck.hideError();
      if (act != 'requests') {
        extend(nav.objLoc, {act: act});
      } else {
        delete nav.objLoc.act;
      }
      delete nav.objLoc.mid;
      delete nav.objLoc.offset;
      nav.setLoc(nav.objLoc);
      var box = curBox();
      if (box) {
        box.hide();
      }
    },
    onFail: AppsCheck.showError
  });
},

showError: function(error) {
  hide('apps_check_progress');
  var checkError = ge('apps_check_error');
  show('apps_check_error_wrap');
  cur.errorShown = true;
  checkError.innerHTML = error;
  scrollToTop(200);
  return true;
},

hideError: function() {
  if (cur.errorShown) {
    hide('apps_check_error_wrap');
    cur.errorShown = false;
  }
},

changeSummary: function() {
  var sum = ge('apps_summary');
  if (cur.section == 'blocked' || cur.section == 'requests' || cur.section == 'comments' || cur.section == 'reports') {
    var res = cur.totalCount ? langNumeric(cur.totalCount, cur.summaryLang['n_requests'], true) : cur.summaryLang['no_requests'];
    if (cur.editAnswers) res += cur.editAnswers;
    if (cur.section == 'reports') {
      var label = cur.all_reports ? cur.summaryLang['unverified_apps'] : cur.summaryLang['all_apps'];
      res += '<span class="divider">|</span><span class="app_check_actions"><a href="#" onclick="AppsCheck.switchReports(); return false;">'+label+'</a></span>'
    }
    sum.innerHTML = res;
    if (ge('tab_counter_'+cur.section)) {
      ge('tab_counter_'+cur.section).innerHTML = (cur.tabCount) ? '+'+cur.tabCount : '';
      toggleClass(ge('tab_'+cur.section), 'count', !!cur.tabCount);
    }
  }
},

changeAutoAnswer: function(id) {
  var val = cur.autoanswers[id];
  if (cur.section == 'comments') {
    if (cur.editing) {
      var field = ge('reply_field'+cur.editing);
      field.value = val;
      field.focus();
    }
  } else {
    ge('decline_comment').value = val;
  }
},

ddShow: function(aid, obj, event) {
  var text = obj.innerHTML;
  var html = '<div id="apps_lists_menu" class="apps_lists_menu" onmouseout="AppsCheck.ddHide(this);" onmouseover="AppsCheck.ddActive(this);">\
<div class="apps_lists_header">\
  <div>'+text+'</div>\
</div>\
<div class="apps_lists_body">\
<table cellspacing="0" cellpadding="0"><tbody><tr><td class="apps_lists_shad_l"><div></div></td><td><div class="apps_lists_shad_t2"></div><div class="apps_lists_shad_t"></div><div class="apps_lists_rows"><div id="rows3">';

  for (i in cur.rules) {
    html += '<a onclick="AppsCheck.checkRule(this, '+aid+', ' + (i - 1) + ');" class="'+((cur.selectedRules & (1 << parseInt(i - 1))) ? 'checked' : '')+'">'+cur.rules[i]+'</a>';
  }
  html += '</div></div><div class="apps_lists_shad_b"></div><div class="apps_lists_shad_b2"></div></td><td class="apps_lists_shad_r"><div> </div></td></tr></tbody></table></div></div>';

  var dd = ce('div', {innerHTML: html});
  obj.parentNode.insertBefore(dd, obj);
},
ddHide: function(obj) {
  cur.ruleTimeout = setTimeout(function() {
    fadeOut(obj, 100, function() {
      re(obj.parentNode);
    });
  }, 600);
},
ddActive: function(obj) {
  if (cur.ruleTimeout) {
    clearTimeout(cur.ruleTimeout);
  }
},
actsOver: function(post) {
  if (!vk.id) return;
  var acts = ge('actions' + post);
  if (!acts) return;
  if (acts.timeout) {
    clearTimeout(acts.timeout);
    removeAttr(acts, 'timeout');
  } else {
    fadeIn(acts, 200);
  }
},
actsOut: function(post) {
  if (!vk.id) return;
  var acts = ge('actions' + post);
  if (!acts) return;
  acts.timeout = setTimeout(function() {
    removeAttr(acts, 'timeout');
    fadeOut(acts, 200);
  }, 1);
},

checkRule: function(obj, uid, listId) {
  var checked = hasClass(obj, 'checked');
  if (checked) {
    removeClass(obj, 'checked');
    if (cur.selectedRules & (1 << listId)) {
      cur.selectedRules -= (1 << listId);
    }
  } else {
    addClass(obj, 'checked');
    if (!(cur.selectedRules & (1 << listId))) {
      cur.selectedRules += (1 << listId);
    }
  }
  if (cur.ruleTimeout) {
    clearTimeout(cur.ruleTimeout);
  }
},

declineRequest: function(id, platform) {
  platform = platform || '';
  return !showBox('apps_check', {act: 'decline_box', aid: id, from: cur.section, platform: platform}, {cache: 1, params:{width: '500px', bodyStyle: 'padding: 10px'}});
},

doDeclineRequest: function(id, box, platform) {
  if (cur.deletingRequest) return;
  cur.deletingRequest = true;
  box.showProgress();
  platform = platform || '';
  ajax.post('apps_check', {act: (cur.section == 'reports') ? 'disable' : 'decline_request', aid: id, rule: cur.selectedRules, platform: platform, comment: ge('decline_comment').value, hash: cur.hashes.decline_hash, do_return: isChecked('return_check')}, {
    onDone: function(title, text) {
      delete cur.deletingRequest;
      if (box) box.hide();
      if (text) setTimeout(showFastBox({title: title}, text, getLang('global_close')).hide, 2000);
      slideUp(ge('app' + id), 200, function() {
        re('app' + id);
        cur.totalCount--;
        cur.tabCount--;
        AppsCheck.changeSummary();
        if (!cur.totalCount) {
          var msg = cur.summaryLang['no_requests_msg'];
          ge('apps_check_content').innerHTML = '<div class="app_msg" id="no_apps">'+msg+'</div>';
        }
      });
    },
    onFail: function() {
      delete cur.deletingRequest;
      if (box) box.hide();
    }
  });
},

approveRequest: function(id, platform) {
  platform = platform || '';
  return !showBox('apps_check', {act: 'approve_box', aid: id, platform: platform}, {cache: 1, params:{width: '400px', bodyStyle: 'padding: 10px'}});
},

changeType: function(aid, obj, newType) {
  obj.innerHTML = '<img src="/images/upload.gif" />';
  var params = {act: 'change_type', aid: aid, hash: cur.hashes.approve_hash};
  if (newType) {
    params['new_type'] = newType;
  }
  ajax.post('apps_check', params, {
    onDone: function(text) {
      obj.innerHTML = text;
    }
  });
},

doApproveRequest: function(id, box, platform) {
  if (cur.approvingRequest) return;
  cur.approvingRequest = true;
  box.showProgress();
  platform = platform || '';
  ajax.post('apps_check', {act: 'approve_request', aid: id, hash: cur.hashes.approve_hash, platform: platform}, {
    onDone: function() {
      delete cur.approvingRequest;
      if (box) box.hide();
      slideUp(ge('app' + id), 200, function() {
        re('app' + id);
        cur.totalCount--;
        cur.tabCount--;
        AppsCheck.changeSummary();
        if (!cur.totalCount) {
          var msg = cur.summaryLang['no_requests_msg'];
          ge('apps_check_content').innerHTML = '<div class="app_msg" id="no_apps">'+msg+'</div>';
        }
      });
    },
    onFail: function() {
      delete cur.approvingRequest;
      if (box) box.hide();
    }
  });
},

showReplies: function(id, count, comments_only) {
  hide('replies_link'+id);
  show('replies_progress'+id);
  ajax.post('apps_check', {act: 'get_comments', id: id, count: count, comments_only: comments_only, from: cur.section, hash: cur.hashes.comments_hash}, {
    cache: 1,
    onDone: function(replies) {
      ge('app_comments'+id).innerHTML = replies;
    },
    onFail: function() {
      hide('replies_progress'+id);
      show('replies_link'+id);
    }
  });
},

hideRow: function(id) {
  slideUp(ge('app' + id), 200, function() {
    re('app' + id);
    cur.totalCount--;
    cur.tabCount--;
    AppsCheck.changeSummary();
    if (!cur.totalCount) {
      var msg = cur.summaryLang['no_requests_msg'];
      ge('apps_check_content').innerHTML = '<div class="app_msg" id="no_apps">'+msg+'</div>';
    }
  });
  ajax.post('apps_check', {act: 'hide_comment', id: id, hash: cur.hashes.hide_row_hash});
},

showEditReply: function(post) {
  var rf = ge('reply_field' + post);
  if (cur.editing === post) {
    elfocus(rf);
    return;
  }
  autosizeSetup(rf, {minHeight: 32});
  this.hideEditPostReply();
  show('replies_wrap' + post, 'submit_reply' + post, 'comm_answers' + post);
  hide('reply_link' + post);
  ge('reply_button' + post).onclick = this.sendReply.pbind(post);
  cur.editing = post;
  elfocus(rf);
},

hideEditPostReply: function(e) {
  if (cur.editing === false || isVisible(boxLayerBG) || isVisible(layerBG)) return;
  var el = (e && e.target) ? e.target : {};
  var id = el.id;
  if (cur.editing) {
    if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
      var post = cur.editing;
      cur.editing = false;
      var rf = ge('reply_field' + post), v = trim(val(rf));
      if (browser.opera_mobile || browser.safari_mobile || v) return;
      hide('submit_reply' + post, 'comm_answers' + post);
      var replyLink = ge('reply_link' + post);
      if (replyLink) {
        show(replyLink);
        hide('replies_wrap' + post);
      }
      rf.blur();
      if (!rf.active) {
        setStyle(rf, {height: 14});
      }
      if (rf.phonblur) rf.phonblur();
    }
  }
},

checkTextLen: function(inp, warn, force) {
  var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
  if (inp.lastLen === val.length && !force) return;

  var realLen = inp.lastLen = val.length, maxLen = cur.options.max_post_len;
  var brCount = realLen - val.replace(/\n/g, '').length;

  warn = ge(warn);
  if (realLen > maxLen - 100 || brCount > 4) {
    show(warn);
    if (realLen > maxLen) {
      warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
    } else if (brCount > 4) {
      warn.innerHTML = getLang('global_recommended_lines', brCount - 4);
    } else {
      warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
    }
  } else {
    hide(warn);
  }
},

sendReply: function(id) {
  ajax.post('apps_check', {act: 'post_comment', id: id, msg: ge('reply_field'+id).getValue(), hash: cur.hashes.post_comment_hash}, {
    onDone: function(comment) {
      var rf = ge('reply_field'+id);
      rf.value = '';
      rf.blur();
      rf.phonblur();
      AppsCheck.hideEditPostReply();
      hide('reply_warn'+id);
      ge('app_comments'+id).innerHTML += comment;
    },
    showProgress: function() {
      lockButton(ge('reply_button'+id));
    },
    hideProgress: function() {
      unlockButton(ge('reply_button'+id));
    }
  });
},

getCommentsPage: function(offset) {
  ajax.post('apps_check', {act: cur.section, mid: cur.mid, offset: offset, load: 1}, {
    cache: 1,
    onDone: function(res, script, summary) {
      if (res) {
        ge('apps_check_content').innerHTML = res;
        if (summary) ge('apps_summary').innerHTML = summary;
        nav.setLoc(extend(nav.objLoc, {offset: offset}));
      }
    },
    showProgress: function() {
      show('apps_check_progress');
      show('page_bottom_progress');
    },
    hideProgress: function() {
      hide('apps_check_progress');
      hide('page_bottom_progress');
    }
  });
  return false;
},

startCheck: function(app_id, width, height) {
  if (cur.shownApp) {
    this.finishCheck(cur.shownApp);
  }
  cur.shownApp = app_id;
  ajax.post('apps_check', {act: 'start_check', uid: cur.viewer_id, hash: cur.hashes.check_hash}, {
    onDone: function(text) {
      if (!text.length) {
        var w = window, de = document.documentElement, h;
        if (w.pageNode) {
          var maxHeight = Math.max(intval(w.innerHeight), intval(de.clientHeight)) - 55;
          h = Math.min(height, maxHeight);
        } else {
          h = height;
        }
        showFastBox({width: width, bodyStyle: 'padding: 0px;', onHide: function() {AppsCheck.finishCheck(app_id);}}, '<iframe src="app'+app_id+'?check=1" style="width: 100%; height: '+h+'px; border: none; overflow-x: hidden" frameborder="0" />', getLang('global_cancel'));
      } else {
        showFastBox({bodyStyle: 'padding: 0px;', onHide: function() {AppsCheck.finishCheck(app_id);}}, text, getLang('global_cancel'));
      }
    }
  });
},
startCheckStandalone: function(app_id, platform) {
  if (cur.shownApp) {
    this.finishCheck(cur.shownApp);
  }
  cur.shownApp = app_id;
  showBox('apps_check', {act: 'start_check', app_id: app_id, platform: platform, uid: cur.viewer_id, hash: cur.hashes.check_hash},
    {params:{width: '400px', bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1, onHide: function() {AppsCheck.finishCheck(app_id);}}});
  /*ajax.post('apps_check', {act: 'start_check', platform: platform, uid: cur.viewer_id, hash: cur.hashes.check_hash}, {
    onDone: function(text) {
      showFastBox({bodyStyle: 'padding: 0px;', onHide: function() {AppsCheck.finishCheck(app_id);}}, text, getLang('global_cancel'));
    }
  });*/
},

finishCheck: function(app_id) {
  ajax.post('apps_check', {act: 'finish_check', uid: cur.viewer_id, hash: cur.hashes.check_hash}, {
    onDone: function(text) {
      if (cur.shownApp == app_id) delete cur.shownApp;
    }
  });
},

toBlackList: function(uid, id) {
  if (cur.addingToBlacklist) return;
  cur.addingToBlacklist = true;
  ajax.post('apps_check', {act: 'to_blacklist', id: uid, hash: cur.hashes.blacklist_hash}, {
    onDone: function(text) {
      delete cur.addingToBlacklist;
      if (text) {
        ge('actions'+id).innerHTML = text;
      }
    }
  });
},

uncomplainApp: function(id) {
  cur.box = showFastBox('', cur.summaryLang['uncomplain_text'], cur.summaryLang['uncomplain_ok'], function(){
    AppsCheck.doUncomplainApp(id);
  }, getLang('global_cancel'));
},

doUncomplainApp: function(id) {
  var box = curBox();
  box.showProgress();
  ajax.post('apps_check', {act: 'uncomplain', id: id, hash: cur.hashes.uncomplain_hash}, {
    onDone: function(title, text) {
      box.hide();
      setTimeout(showFastBox({title: title}, text, getLang('global_close')).hide, 2000);
      slideUp(ge('app' + id), 200, function() {
        re('app' + id);
        cur.totalCount--;
        cur.tabCount--;
        AppsCheck.changeSummary();
        if (!cur.totalCount) {
          var msg = cur.summaryLang['no_requests_msg'];
          ge('apps_check_content').innerHTML = '<div class="app_msg" id="no_apps">'+msg+'</div>';
        }
      });
    }
  });
},

editAutoanswers: function() {
  return !showBox('apps_check', {act: 'edit_autoanswers_box', from: cur.section}, {params:{width: '400px', bodyStyle: 'padding: 10px'}});
},

removeAutoanswer: function(id) {
  if (cur.removingAutoAnswer) return;
  cur.removingAutoAnswer = true;
  ajax.post('apps_check', {act: 'delete_autoanswer', id: id, hash: cur.hashes.autoanswers_hash}, {
    onDone: function(text) {
      delete cur.removingAutoAnswer;
      if (!cur.deletedAutoanswers) cur.deletedAutoanswers = [];
      cur.deletedAutoanswers[id] = ge('autoanswer_row'+id).innerHTML;
      if (text) {
        ge('autoanswer_row'+id).innerHTML = text;
      }
    },
    onFail: function() {
      delete cur.removingAutoAnswer;
    },
    showProgress: function() {
      curBox().showProgress();
    },
    hideProgress: function() {
      curBox().hideProgress();
    }
  });
},

restoreAutoanswer: function(id) {
  if (cur.restoringAutoAnswer) return;
  cur.restoringAutoAnswer = true;
  ajax.post('apps_check', {act: 'restore_autoanswer', id: id, hash: cur.hashes.autoanswers_hash}, {
    onDone: function() {
      delete cur.restoringAutoAnswer;
      if (cur.deletedAutoanswers && cur.deletedAutoanswers[id]) {
        ge('autoanswer_row'+id).innerHTML = cur.deletedAutoanswers[id];
        delete cur.deletedAutoanswers[id];
      }
    },
    onFail: function() {
      delete cur.restoringAutoAnswer;
    },
    showProgress: function() {
      curBox().showProgress();
    },
    hideProgress: function() {
      curBox().hideProgress();
    }
  });
},

editAutoanswer: function(id) {
  if (cur.editingAutoAnswer) return;
  cur.editingAutoAnswer = true;
  var new_label = ge('answer_content'+id).value;
  ajax.post('apps_check', {act: 'edit_autoanswer', from: cur.section, id: id, text: new_label, hash: cur.hashes.autoanswers_hash}, {
    onDone: function(text) {
      delete cur.editingAutoAnswer;
      slideUp('edit_autoanswer'+id, 200, function() {
        cur.autoanswers[id] = new_label;
        if (text) {
          curBox().bodyNode.innerHTML = text;
          placeholderSetup('add_answer_text', {back: true});
          placeholderSetup('add_answer_label', {back: true});
        }
      });
    },
    onFail: function() {
      delete cur.editingAutoAnswer;
    },
    showProgress: function() {
      curBox().showProgress();
    },
    hideProgress: function() {
      curBox().hideProgress();
    }
  });
},

addAutoanswer: function(id) {
  if (cur.addingAutoAnswer) return;
  var name = ge('add_answer_label').value;
  var cont = ge('add_answer_text').value;
  if (!name || !cont) {
    var el = name ? ge('add_answer_text') : ge('add_answer_label');
    var input_back = geByClass1('input_back', el.previousSibling);
    notaBene(input_back);
    el.focus();
    return;
  }
  cur.addingAutoAnswer = true;
  ajax.post('apps_check', {act: 'add_autoanswer', from: cur.section, name: name, text: cont, hash: cur.hashes.autoanswers_hash}, {
    onDone: function(res, id) {
      delete cur.addingAutoAnswer;
      slideUp('edit_autoanswer0', 200, function() {
        cur.autoanswers[id] = cont;
        if (res) {
          curBox().bodyNode.innerHTML = res;
          placeholderSetup('add_answer_text', {back: true});
          placeholderSetup('add_answer_label', {back: true});
        }
      });
    },
    onFail: function() {
      delete cur.addingAutoAnswer;
    },
    showProgress: function() {
      curBox().showProgress();
    },
    hideProgress: function() {
      curBox().hideProgress();
    }
  });
},

cancelAutoanswer: function(id) {
  slideUp('edit_autoanswer'+id, 200, function() {
    if (cur.autoanswers[id]) {
      ge('answer_content'+id).value = cur.autoanswers[id];
    } else {
      ge('answer_content'+id).value = '';
    }
  });
},

switchReports: function() {
  show('apps_check_progress');
  ajax.post('apps_check', {act: 'reports', all: 1 - cur.all_reports, load: 1}, {
    onDone: function(content, script, summary, title) {
      hide('apps_check_progress');
      ge('apps_check_content').innerHTML = content;
      if (script) eval(script);
      if (summary) ge('apps_summary').innerHTML = summary;
      if (title) document.title = replaceEntities(stripHTML(title));
      AppsCheck.hideError();
    },
    onFail: AppsCheck.showError
  });
},

addCollection: function() {
  return !showBox('/apps_check', {act: 'edit_collection_box'}, {params: {dark: 1, width: 550, hideButtons: true, bodyStyle: 'padding: 0px;'}});
},

editCollection: function(collectionId) {
  return !showBox('/apps_check', {act: 'edit_collection_box', collection_id: collectionId}, {params: {dark: 1, width: 550, hideButtons: true, bodyStyle: 'padding: 0px;'}});
},

updateCollections: function(html, script) {
  var list = ge('apps_collection_rows');
  if (list && list.sorter) {
    list.sorter.destroy();
  }
  if (html) {
    ge('apps_check_content').innerHTML = html;
  }
  if (script) {
    eval(script);
  }
  AppsCheck.toggleCollections(ge('apps_toggle_collections'), !!cur.onlyEnabled);
},

saveCollection: function(collectionId, hash, btn) {
  if (!val('apps_check_collection_title')) {
    notaBene('apps_check_collection_title');
    return;
  }
  var query = {
    act: 'a_save_collection',
    collection_id: collectionId,
    hash: hash,
    title: val('apps_check_collection_title'),
    language: cur.languageDD.val(),
    sex: window.radioBtns.sex.val,
    min_age: cur.minAgeDD.val(),
    max_age: cur.maxAgeDD.val()
  };
  ajax.post('/apps_check', query, {
    onDone: function(html, script) {
      AppsCheck.updateCollections(html, script);
      curBox().hide();
    },
    onFail: function(msg) {
      ge('apps_collection_error').innerHTML = msg;
      show('apps_collection_error');
      return true;
    },
    showProgress: lockButton.pbind(btn),
    hideProgress: unlockButton.pbind(btn)
  })
},

toggleCollections: function(el, enabled) {
  var list = ge('apps_collection_rows');
  if (list && list.sorter) {
    list.sorter.destroy();
  }
  if (window.tooltips) {
    tooltips.hideAll();
  }
  toggleClass(list, 'no_disabled', enabled);
  var cnt = 0, rows = geByClass('apps_collection_row', list);
  for (var i in rows) {
    setStyle(rows[i], {zIndex: null, left: null, top: null, width: null, cursor: null});
    var shown = !enabled || !hasClass(rows[i], 'disabled');
    if (shown) {
      cnt++;
    }
    if (!shown) {
      rows[i].setAttribute('skipsort', 1);
    } else {
      rows[i].removeAttribute('skipsort');
    }
  }
  if (cnt > 1) {
    sorter.init(list, {onReorder: cur.reorderApps, dh: 0});
  }
  cur.onlyEnabled = enabled;
  el.innerHTML = enabled ? getLang('apps_all_collections') : getLang('apps_only_enabled_collections');
  toggle('no_apps', !cnt);
  return false;
},

deleteCollection: function(collectionId, hash) {
  return !showFastBox({title: getLang('apps_delete_collection_title'), dark: 1, bodyStyle: 'padding: 20px; linne-height: 140%;'}, getLang('apps_delete_collection_confirm'), getLang('global_delete'), function(btn) {
    ajax.post('/apps_check', {act: 'a_delete_collection', collection_id: collectionId, hash: hash}, {
      onDone: function(html, script) {
        AppsCheck.updateCollections(html, script);
        curBox().hide();
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    })
  }, getLang('global_cancel'));
},

enableCollection: function(collectionId, enable, hash) {
  ajax.post('/apps_check', {act: 'a_enable_collection', collection_id: collectionId, enable: enable, hash: hash}, {
    onDone: AppsCheck.updateCollections
  });
},

addCollectionApp: function() {
  var lnk = val(cur.aSearch);
  if (!lnk) {
    return notaBene(cur.aSearch);
  }
  showBox('apps_check', {act: 'add_collection_app_box', lnk: lnk, id: cur.collectionId}, {
    params: {dark: 1, width: 300},
    onFail: function(err) {
      showDoneBox(err)
      notaBene(cur.aSearch);
      return true;
    }
  });
},

removeCollectionApp: function(collection_id, aid, hash) {
  ajax.post('apps_check', {
    act: 'a_remove_from_collection',
    id: collection_id,
    edit: 1,
    aid: aid,
    hash: hash
  }, {
    onDone: function(html) {
      var list = ge('app_search_list');
      if (list.sorter) {
        list.sorter.destroy();
      }
      list.innerHTML = html;
      if (geByClass('apps_cat_row', ge('app_search_list')).length) {
        cur.sorter = qsorter.init('app_search_list', {onReorder: cur.reorderApps, xsize: 4, width: 148, height: 209 + (browser.msie8 ? 2 : 0)});
      }
    },
    onFail: function(err) {
      showDoneBox(err);
      return true;
    }
  });
},

addFeatured: function() {
  var lnk = val(cur.input);
  if (!lnk) {
    return notaBene(cur.input);
  }
  showBox('apps_check', {act: 'add_featured_box', lnk: lnk}, {
    onFail: function() {
      notaBene(cur.input);
      return true;
    }
  });
},

actFeatured: function(act, obj, aid, hash, fullObj, reload) {
  var back = obj.innerHTML;
  obj.innerHTML = '<img src="/images/upload.gif" />';
  ajax.post('apps_check', {
    act: 'a_'+act+'_featured',
    aid: aid,
    hash: hash
  }, {
    onDone: function(text) {
      if (reload == 2) {
        AppsCheck.switchNavTab('featured', false, true);
      } else if (reload) {
        nav.reload();
      } else {
        (fullObj || obj).innerHTML = text;
      }
    },
    onFail: function(text) {
      obj.innerHTML = back;
      setTimeout(showFastBox(getLang('global_error'), text).hide, __debugMode ? 30000 : 3000);
      return true;
    }
  });
},

showStat: function(aid, type, obj) {
  var hideStat = obj.getAttribute('stat');
  if (hideStat) {
    obj.innerHTML = hideStat;
    hide('apps_check_'+aid+'_graph');
    obj.setAttribute('stat', '');
  } else {
    obj.setAttribute('stat', obj.innerHTML)
    obj.innerHTML = '<img src="/images/upload.gif"/>';
    ajax.post('apps_check', {act: 'a_featured_stat', aid: aid}, {
      onDone: function(html, js, hideText) {
        ge('apps_check_'+aid+'_graph').innerHTML = html;
        eval(js);
        obj.innerHTML = hideText;
        show('apps_check_'+aid+'_graph');
      }
    });
  }
},

showAdsStat: function(appId) {
  var ajaxParams = {};
  ajaxParams.app_id = appId;
  var boxOptions = {params: {}};
  boxOptions.cache = 1;

  showBox('/apps_check?act=ads_stat', ajaxParams, boxOptions);
},

_eof: 1};try{stManager.done('apps_check.js');}catch(e){}
