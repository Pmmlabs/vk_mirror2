var AppsEdit = {

init: function() {
  cur.module = 'apps_edit';
  cur.nav.push((function(changed, old, n) {
      if (changed[0] === undefined && changed['section']) {
        this.switchSection(n['section']);
        return false;
      }
  }).bind(this));
  this.initPage();
},

initPage: function() {
  window.Dev && Dev.checkBlockHeight();
},

switchTab: function(tab, event) {
  if (checkEvent(event)) return;
  if (nav.objLoc.section == tab) return;
  var el = ge('apps_nav_' + tab);
  if (el) {
    var tabs = geByClass('nav_selected', ge('dev_navigation'));
    for (var i in tabs) {
      removeClass(tabs[i], 'nav_selected');
    }
    addClass(el, 'nav_selected');
    var leftNav = ge('dev_left_nav');
    if (leftNav && tabs[0]) {
      var mark = ge('dev_left_nav_mark');
      setStyle(mark, {height: getSize(tabs[0])[1], top: tabs[0].offsetTop || 0});
      addClass(leftNav, 'anim');
      animate(mark, {height: getSize(el)[1], top: el.offsetTop}, {duration: 100, onComplete: function() {
        removeClass(leftNav, 'anim');
      }})
    }
  }
  return nav.go(el, event);
},

animSubTab: function(newSel) {
  var subHeader = ge('app_edit_subheader'), oldSel = subHeader && geByClass1('subheader_sel', subHeader);

  if (subHeader && oldSel) {
    var mark = ge('app_edit_nav_mark'),
        fromX = oldSel && oldSel.offsetLeft || 0, toX = newSel.offsetLeft || 0,
        duration = (toX != fromX) ? intval(70 * Math.log(Math.abs(toX - fromX) / 20)) : 0;
    setStyle(mark, {width: getSize(oldSel)[0], left: fromX});
    addClass(subHeader, 'anim');
    removeClass(oldSel, 'subheader_sel');
    addClass(newSel, 'subheader_sel');
    animate(mark, {width: getSize(newSel)[0], left: toX}, {duration: duration, transition: Fx.Transitions.easeOutCirc, onComplete: function() {
      removeClass(subHeader, 'anim');
      setStyle(mark, {display: ''});
    }});
  }
},

switchSubTab: function(newSel, event) {
  this.animSubTab(newSel);

  return nav.go(newSel, event);
},

switchSection: function(section) {
  ajax.post('editapp', {section: section, id: cur.aid, load: 1}, {
    onDone: function(content, script) {
      hide('apps_edit_progress');
      ge('app_edit_wrap').innerHTML = content;
      if (script) eval(script);
      AppsEdit.hideError();
      nav.setLoc(extend(nav.objLoc, {section: section}));
      AppsEdit.initPage();
      scrollToTop(0);
    },
    onFail: AppsEdit.showError
  });
},

showError: function(error, errorObj) {
  if (!error) {
    return true;
  }
  hide('apps_edit_progress');
  if (errorObj) {
    var editError = ge(errorObj);
    show(editError);
  } else {
    var editError = ge('app_edit_error');
    show(ge('app_edit_error_wrap'));
    scrollToTop(200);
  }
  cur.errorShown = true;
  editError.innerHTML = error;
  return true;
},

hideError: function() {
  if (cur.errorShown) {
    hide('app_edit_error_wrap');
    cur.errorShown = false;
  }
},

showRulesBox: function(accept) {
  return !showBox('editapp', {act: 'show_rules', accept: accept}, {cache: 1, params: {width: '650px', dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'},
    onDone: AppsEdit.hideError,
    onFail: AppsEdit.showError,
    stat: ['wk.css']
  });
},

getParams: function() {
  var cont = ge('app_edit_cont');
  var params = new Object();
  var trimId = function(id) {
    return (id.indexOf('app_') == 0) ? id.substr(4) : id;
  }
  var inputs = geByTag('input', cont);
  for (var i in inputs) {
    var el = inputs[i];
    if (el.id) {
      params[trimId(el.id)] = val(el);
    }
  }
  var textarea = geByTag('textarea', cont);
  for (var i in textarea) {
    var el = textarea[i];
    if (el.id && el.value) {
      params[trimId(el.id)] = val(el);
    }
  }
  var checkboxes = geByClass('checkbox', cont);
  for (var i in checkboxes) {
    var el = checkboxes[i];
    if (el.id) {
      params[trimId(el.id)] = isChecked(el) ? 1 : 0;
    }
  }
  for (var i in window.radioBtns) {
    params[trimId(i)] = window.radioBtns[i].val;
  }
  for (var i in cur.dropDowns) {
    params[trimId(i)] = cur.dropDowns[i].val();
  }
  delete params['selectedItems'];
  return params;
},

saveOptions: function(act, confirm) {
  var params = this.getParams('app_edit_cont');
  params.act = act || 'save_options';
  params['help'] = Privacy.getValue('help');
  if (act != 'save_info') {
    params['openapi'] = Privacy.getValue('openapi');
    params['need_install'] = Privacy.getValue('install');
    if (cur.privacy['push']) {
      params['push'] = Privacy.getValue('push');
    }
    var settingsRaw = Privacy.getValue('require');
    settingsRaw = settingsRaw.split('_');
    if (settingsRaw[1]) {
      settingsRaw = settingsRaw[1].split(',');
      for (var i in settingsRaw) {
        var pref = cur.maskByGroupNum[parseInt(settingsRaw[i]) - 300];
        params['access_'+pref] = 1;
      }
    } else {
      var settings = 0;
    }
  }
  if (confirm) {
    params['confirm'] = 1;
  }
  lockButton(ge('app_save_btn'));
  var onPost = function() {
    unlockButton(ge('app_save_btn'));
  }
  ajax.post('editapp', params, {
    onDone: function(type, text, data) {
      onPost();

      hide('apps_options_saved');
      if (ge('apps_edit_error_text')) {
        hide('apps_edit_error_text');
      }
      if (type == 'confirm') {
        showFastBox(text, data, getLang('global_continue'), function() {
          curBox().hide();
          AppsEdit.saveOptions(act, true);
        }, getLang('global_cancel'));
      } else if (type == 'error') {
        if (data == 'domain') {
          var tbl = ge('apps_addr_table');
          setStyle(tbl, 'backgroundColor', '#FAEAEA');
          setTimeout(animate.pbind(tbl, {backgroundColor: '#FFFFFF'}, 300), 400);
          elfocus('app_domain');
          var resultCont = ge('apps_addr_result');
          resultCont.innerHTML = text;
          fadeIn(resultCont, 200);
          scrollToTop(200);
        } else if (data == 'base_domain') {
          notaBene(cur.selectDD.control.firstChild);
          cur.selectDD.focusInput();
        } else {
          var el = ge('app_'+data);
          elfocus(el);
          setStyle(el, 'backgroundColor', '#FAEAEA');
          setTimeout(animate.pbind(el, {backgroundColor: '#FFFFFF'}, 300), 400);
        }
      } else {
        if (data.domain) {
          var domainEl = ge('app_domain');
          if (domainEl) {
            domainEl.value = data.domain;
          }
          hide('apps_addr_result');
        }
        if (data.titleNotice) {
          ge('app_name_notice').innerHTML = data.titleNotice;
          show('app_name_notice');
          if (data.titleHide) {
            addClass('app_name', 'apps_edit_input_readonly');
            ge('app_name').readOnly = true;
          } else {
            removeClass('app_name', 'apps_edit_input_readonly');
            ge('app_name').readOnly = false;
          }
        }
        var el = ge('apps_options_saved');
        el.innerHTML = text;
        show(el);
        scrollToTop(200);
      }
    },
    onFail: function(error) {
      onPost();
      hide('apps_options_saved');
      return AppsEdit.showError(error);
    }
  })
},

loadCheckHistory: function(aid) {
  if (isVisible('apps_check_history')) {
    hide('apps_check_history');
  } else {
    show('apps_check_history');
    ge('apps_check_history').innerHTML = '<div style="text-align: center; margin: 30px;"><img src="images/progress7.gif" /></div>';
    ajax.post('apps_check.php', {act: 'a_check_history', no_version: 1, app_id: aid}, {
      onDone: function(text) {
        ge('apps_check_history').innerHTML = text;
      }
    });
  }
},

setMultilang: function(aid, enabled, hash, obj) {
  ajax.post('apps_check', {act: 'switch_multilang', aid: aid, enabled: enabled, hash: hash}, {
    onDone: function() {
      nav.reload();
    }
  })
},

resetNameCounter: function(aid, hash) {
  ajax.post('apps_check', {act: 'a_reset_counters', aid: aid, hash: hash}, {
    onDone: function() {
      nav.reload();
    }
  })
},

adminApp: function(act, id, hash, action, penalty, newCheck, banDomain, warnUsers, customOption, customField) {
  var box = showFastBox(cur.appEditAdminTitle, '<div id="apps_show_penalty" style="display:none;"><div style="color:#666;padding:5px 0;">'+cur.appEditAdminPenalty+'</div><input type="text" id="apps_penalty" class="text" style="width:310px" value="'+penalty+'"/></div><div style="color:#666;padding:5px 0;">'+cur.appEditAdminComment+'</div><textarea id="apps_check_comment" style="width:310px;height:100px;"></textarea>'+(banDomain || '')+(warnUsers || '')+(customOption || ''));
  box.setOptions({width: 350});
  if (penalty > 0) {
    show('apps_show_penalty');
  } else {
    hide('apps_show_penalty');
  }
  box.removeButtons();
  box.addButton(getLang('box_cancel'), box.hide, 'no');
  box.addButton(action, function() {
    if (cur.adminActStarted) return;
    cur.adminActStarted = true;
    var params = {act: act, id: id, hash: hash, penalty: ge('apps_penalty').value, comment: ge('apps_check_comment').value};
    if (banDomain) {
      params['ban_domain'] = isChecked('admin_app_bandomain');
    }
    if (warnUsers) {
      params['warn_users'] = isChecked('admin_app_warnusers');
    }
    if (customOption) {
      params[customField] = isChecked('admin_custom_field');
    }
    ajax.post(newCheck ? 'apps_check' : 'apps_check.php', params, {
      onDone: function() {
        nav.reload();
      },
      showProgress: box.showProgress,
      hideProgress: box.hideProgress
    });
  }, 'yes');
},

adminTogglePlatform: function(app_id, platform, hash) {
  var el_node = geByClass1('app_admin_platform_toggle_item'+platform, cur.adminMenu.container);
  var params = {
    act: 'a_toggle_platform_enabled',
    app_id: app_id,
    platform: platform,
    hash: hash
  };
  ajax.post('apps_check', params, {
    onDone: function(new_text) {
      el_node.innerHTML = new_text;
    }
  });
},

uploadIcon: function() {
  showBox('editapp', {act: 'upload_icon_box', aid: cur.aid}, {params: {width: '430px', bodyStyle: 'padding: 0px; position: relative;', dark: 1}});
},

uploadPhoto: function(big) {
  showBox('editapp', {act: 'upload_photo_box', aid: cur.aid, big: big ? 1 : 0, edit_lang: cur.editLang}, {params: {width: '438px', bodyStyle: 'padding: 0px; position: relative;', dark: 1}});
},

checkAddress: function (timeout) {
  cur.addrUnchecked = 0;
  clearTimeout(cur.addressCheckTO);
  if (cur.lastAddress == val('app_domain')) return;
  cur.addressCheckTO = setTimeout(AppsEdit.doCheckAddress, timeout || 0);
},

doCheckAddress: function () {
  var resultCont = ge('apps_addr_result');
  fadeOut(resultCont, 200);
  cur.lastAddress = val('app_domain');
  hide('apps_addr_result');
  ajax.post('editapp', {act: 'a_check_address', name: cur.lastAddress, aid: cur.aid}, {
    onDone: function (msg) {
      cur.addrChecked = 1;
      resultCont.innerHTML = msg;
      fadeIn(resultCont, 200);
    },
    onFail: function (msg) {
      cur.addrChecked = -1;
      resultCont.innerHTML = msg;
      fadeIn(resultCont, 200);
      return true;
    }
  });
},

deleteApp: function() {
  showBox('editapp', {act: 'delete_app_box', aid: cur.aid}, {params: {dark: 1, width: '430px', bodyStyle: 'padding: 20px; line-height: 160%;'}});
},

activateRow: function(obj) {
  var el = geByClass('apps_edit_delete_row',  obj);
  if (el[0].active) return;
  animate(el[0], {backgroundColor: '#C4D2E1'}, 200);
},

deactivateRow: function(obj) {
  var el = geByClass('apps_edit_delete_row',  obj);
  if (el[0].active) return;
  animate(el[0], {backgroundColor: '#FFF'}, 200);
},

activateDelete: function(obj) {
  obj.active = true;
  animate(obj, {backgroundColor: '#6B8DB1'}, 200);
  showTooltip(obj, {text: getLang('global_delete'), showdt: 500});
},

deactivateDelete: function(obj) {
  obj.active = false;
  animate(obj, {backgroundColor: '#C4D2E1'}, 200);
  if (window.tooltips) {
    tooltips.hide(obj);
  }
},

addSWF: function() {
  showBox('editapp', {act: 'add_swf_box', aid: cur.aid}, {params: {dark: 1, width: '430px', bodyStyle: 'padding: 0px; position: relative;'}});
},

deleteSWF: function(rowId, hash, obj) {
  tooltips.hide(obj);
  var box;
  var save = function() {
    box.showProgress();
    ajax.post('editapp', {act: 'a_delete_swf', aid: cur.aid, swf_id: rowId, hash: hash}, {onDone: function(resp) {
      box.hideProgress();
      box.content(resp);
      box.removeButtons();
      box.addButton(getLang('global_close'), box.hide);
      setTimeout(box.hide, 2000);
      re('apps_edit_swf_'+rowId);
      var rows = geByClass('apps_edit_swf_row', ge('apps_edit_flash_other_options'));
      if (rows.length == 1) {
        re(rows[0]);
      }
    }});
  };
  var hide = function() {
    box.hide();
  };
  box = showFastBox(getLang('apps_title_file_delete'), getLang('apps_confirm_file_delete'), getLang('global_delete'), save, getLang('global_cancel'), hide);
},

updateSWF: function() {
  showBox('editapp', {act: 'update_swf_box', aid: cur.aid}, {params: {dark: 1, width: '430px', bodyStyle: 'padding: 0px; position: relative;'}});
},

showHint: function(el, up, shift) {
  el = ge(el);
  text = cur.hint[el.id];
  clearTimeout(cur.hideHintTimout);
  if (!up) {
    showTooltip(el, {
      text: '<div class="apps_edit_side_tt_pointer"></div>' + text,
      slideX: 15,
      className: 'apps_edit_tt',
      shift: shift || [-291, 0, -60],
      forcetodown: true
    });
  } else {
    showTooltip(el, {
      text: text,
      slide: 15,
      className: 'apps_edit_up_tt',
      shift: [0, -1, 0]
    });
  }
},

hideHint: function(el) {
  el = ge(el);
  clearTimeout(cur.hideHintTimout);
  cur.hideHintTimout = setTimeout(function() {
    if (window.tooltips && el.tt) {
      el.tt.hide();
    }
  }, 500);
},

showSecret: function(aid, hash) {
  ajax.post('al_apps_edit.php', {act: 'a_show_secret', aid: aid, hash: hash}, {
    onDone: function(title, html, js) {
      var box = showFastBox(title, html);
      eval(js);
    },
    loader: 1
  });
},

changeType: function(aid, hash, new_type) {
  obj = ge('apps_check_change_type');
  obj.innerHTML = '<img src="/images/upload.gif" />';
  ajax.post('apps_check', {act: 'change_type', aid: aid, hash: hash, from: 'appview', new_type: new_type}, {
    onDone: function(text) {
      obj.innerHTML = text;
      if (cur.adminTypeMenu) {
        cur.adminTypeMenu.setOptions({title: text});
      }
    }
  });
  if (cur.adminTypeMenu) {
    cur.adminTypeMenu.hide();
  }
  return false;
},

initUpload: function(cont, opts, lang, resObj) {
  var options = {
    file_name: 'photo',

    file_size_limit: 1024*1024*5, // 5Mb
    file_types_description: 'Image files (*.jpg, *.png, *.gif)',
    file_types: '*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',

    lang: lang,

    /*check_hash: opts['check_hash'],
    check_rhash: opts['check_rhash'],*/

    onUploadStart: function(i, res) {
      if (Upload.types[i] == 'form') {
        show(box.progress);
      }
      hide('apps_edit_upload_error');
    },

    onUploadComplete: function(i, res) {
      var obj;
      try {
        obj = eval('(' + res + ')');
      } catch(e) {
        obj = q2ajx(res);
      }
      if (obj.code) {
        Upload.onUploadError(i, obj.code);
        return;
      }
      if (opts.vars.mid) {
        obj.mid = opts.vars.mid;
      }
      var params = {act: opts['save_act'], app_id: cur.aid};
      if (cur.editLang) {
        params['edit_lang'] = cur.editLang;
      }
      if (opts.errorObj == 'apps_banner_error') {
        hide('apps_banner_update');
      }
      ajax.post('editapp', extend(obj, params), {
        onDone: function(result, data) {
          if (opts['success_callback']) {
            cur[opts['success_callback']](result, data);
          } else {
            resObj.src = result;
            addClass(resObj.parentNode, 'apps_edit_img_loaded');
            if (resObj.parentNode && resObj.parentNode.bOvered) {
              AppsEdit.bOver(resObj.parentNode);
            }
          }
          if (!opts.lite) {
            Upload.embed(i);
          }
          if (opts.errorObj) {
            hide(opts.errorObj);
          }
        },
        onFail: function(error) {
          AppsEdit.showError(error, opts.errorObj);
          if (!opts.lite) {
            Upload.embed(i);
          }
          return true;
        }
      });
    },

    onUploadProgress: function(i, bytesLoaded, bytesTotal) {
      if (!ge('form'+i+'_progress')) {
        var obj = Upload.obj[i], objHeight = getSize(obj)[1], tm = objHeight / 2 + 10;
        var node = obj.firstChild;
        addClass(obj.parentNode, 'apps_edit_progress');
        while (node) {
          if (node.nodeType == 1) {
            if (node.id == 'uploader'+i && browser.msie) {
              setStyle(node, {position: 'relative', left: '-5000px'});
            } else {
              setStyle(node, {visibility: 'hidden'});
            }
          }
          node = node.nextSibling;
        }
        obj.appendChild(ce('div', {innerHTML: '<div class="apps_info_progress_wrap">\
          <div id="form' + i + '_progress" class="apps_upload_progress" style="width: 0%;"></div>\
        </div></div>', className: 'apps_info_prg_cont'}, {height: tm + 'px', marginTop: -tm + 'px'}));
      }
      var percent = intval(bytesLoaded / bytesTotal * 100);
      percent = Math.min(percent, 100);
      setStyle(ge('form' + i + '_progress'), {width: percent + '%'});
    },

    onUploadError: function(info, res) {
      debugLog('error', info, res);
      if (res == 105) {
        var error = lang['apps_banner_size_error'];
      } else if (res == -1) {
        if (opts.errorObj == 'apps_full_banner_error') {
          var error = lang['apps_full_banner_size_error'];
        } else if (opts.errorObj == 'apps_photo_error') {
          var error = lang['apps_photo_size_error'];
        } else if (opts.errorObj == 'apps_catalog_image_error') {
          var error = lang['apps_catalog_image_size_error'];
        } else if (opts.errorObj == 'apps_screenshot_error') {
          var error = lang['apps_screenshot_size_error'];
        } else {
          var error = lang['apps_banner_size_error'];
        }
      } else {
        var error = lang['apps_photo_notloaded_unknown'];
      }

      var i = info.ind !== undefined ? info.ind : info;
      var obj = Upload.obj[i];
      var container = domPN(obj);
      if (hasClass(container, 'apps_edit_progress')) {
        removeClass(container, 'apps_edit_progress');
      }
      Upload.embed(i);
      AppsEdit.showError(error, opts.errorObj);
    },

    clear: 1,
    type: 'photo',
    buttonClass: 'secondary small',
    max_attempts: 3,
    server: opts.server,
    error: opts['default_error'],
    error_hash: opts['error_hash'],
    dropbox: 'apps_icon_dropbox'
  }
  if (opts.lite) {
    options.flash_lite = 1;
  }
  return Upload.init(cont, opts.url, opts.vars, options);
},

ssOver: function(obj) {
  var nc = geByClass1('apps_edit_screen_close', obj);
  if (!nc) {
    var nc = se('<div class="apps_edit_screen_close" onmouseover="showTooltip(this, {black: 1, text: \''+cur['remove_screenshot']+'\', shift: [12, 2, 0], forcetoup: 1});"></div>');
    addEvent(nc, 'click', AppsEdit.ssClose.pbind(obj, nc));
    cur.destroy.push(function() {
      removeEvent(nc, 'click');
    });

    obj.appendChild(nc);
  }
  fadeIn(nc, 100);
},

ssClose: function(obj, nc, ev) {
  var pid = obj.getAttribute('rel');
  ajax.post('editapp', {act: 'a_remove_screenshot', hash: cur.photoHash, aid: cur.aid, pid: pid});
  fadeOut(obj, 200, function() {
    re(obj);
    if (cur.ssCount < cur.ssMax) {
      show('apps_edit_upload_screenshot');
    }
  });
  cur.ssCount -= 1;
  if (cur.ssCount < cur.ssMax) {
    hide('apps_edit_ss_reason');
  }
  if (nc.tt) {
    nc.tt.destroy();
  }
  return cancelEvent(ev);
},

ssOut: function(obj) {
  var nc = geByClass1('apps_edit_screen_close', obj);
  fadeOut(nc, 100);
},

ssClick: function(obj) {
  var pid = obj.getAttribute('rel');
  showBox('editapp', {act: 'show_screen', aid: cur.aid, pid: pid}, {dark: 1});
},

bOver: function(obj) {
  obj.bOvered = 1;
  if (!hasClass(obj, 'apps_edit_img_loaded')) {
    return;
  }
  var btn = geByClass1('apps_edit_btn_wrap', obj)
  fadeIn(btn, 200);
},

bOut: function(obj) {
  obj.bOvered = 0;
  var btn = geByClass1('apps_edit_btn_wrap', obj)
  fadeOut(btn, 200);
},

bClick: function(obj, uplNum, newFormat) {
  hide(obj.parentNode, 'apps_edit_full_wrap');
  var obj = obj.parentNode.parentNode;
  removeClass(obj, 'apps_edit_img_loaded');
  var img = geByClass1('apps_edit_b_img', obj);
  img.src = newFormat ? (window.devicePixelRatio >= 2 ? '/images/dquestion_q.png' : '/images/dquestion_t.png') : (window.devicePixelRatio >= 2 ? '/images/dquestion_w.png' : '/images/dquestion_z.png');
  removeClass(obj, 'apps_edit_progress');
  Upload.embed(uplNum);

  ajax.post('editapp', {act: 'a_clear_full_banner', hash: cur.photoHash, aid: cur.aid, format: newFormat ? 1 : 0, edit_lang: cur.editLang});
},

certUploadBox: function(obj, type) {
  var push = (Privacy.getValue('push') || '').split('_');
  showBox('editapp', {act: 'select_cert', aid: cur.aid, push: push[2], cert_type: type}, {params: {dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}});
},

urlFocus: function(obj, hint) {
  if (!val(obj)) {
    val(obj, 'http://');
  }
  if (hint) {
    showTooltip(obj, {
      text: '<div class="apps_edit_side_tt_pointer"></div>'+cur[hint],
      className: 'apps_edit_tt',
      slideX: 15,
      forcetodown: 1,
      shift: [-291, 0, -60],
      hasover: 1,
      onCreate: function () {
        removeEvent(obj, 'mouseout');
      }
    });
  }

},

urlBlur: function(obj) {
  if (val(obj) == 'http://') {
    val(this, '');
  }
  if (obj.tt) {
    obj.tt.hide();
  }
},

addToNew: function(aid, hash) {
  showBox('editapp', {act: 'add_to_new_box', aid: aid, hash: hash}, {dark: true});
},

enableOrders: function(aid, hash, force) {
  var btn = ge('enable_orders_btn');
  AppsEdit.hideError();
  ajax.post('editapp', {act: 'enable_orders', aid: aid, force: force, hash: hash}, {
    onDone: function(result, text) {
      if (result) {
        ge('apps_new_api_notice').innerHTML = text;
      } else {
        var confirmBox = showFastBox(getLang('global_action_confirmation'), text, getLang('box_yes'), function() { confirmBox.hide(); AppsEdit.enableOrders(aid, hash, 1); }, getLang('global_cancel'));
      }
    },
    onFail: function(text) {
      showFastBox(getLang('global_error'), text);
      return true;
    },
    showProgress: function() {
      lockButton(btn);
    },
    hideProgress: function() {
      unlockButton(btn);
    }
  })
},

checkSize: function(obj, maxVal) {
  var curVal = val(obj);
  if (curVal > maxVal) {
    notaBene(obj);
    val(obj, maxVal);
  } else if (curVal != positive(curVal)) {
    notaBene(obj);
    val(obj, positive(curVal) || 607);
  }
},

updateSecureUrl: function() {
  if (cur.iframeSecureChanged) {
    return;
  }
  var url = val('app_iframe_url').replace(/^http:/, 'https:');
  val('app_iframe_secure_url', url);
},
onChangeSecureUrl: function() {
  if (val('app_iframe_url').replace(/^http(s)?/, '') != val('app_iframe_secure_url').replace(/^http(s)?/, '')) {
    cur.iframeSecureChanged = true;
  }
},

addFunc: function() {
  hide('apps_edit_funcs_empty');
  hide('apps_edit_funcs_not_found');
  show('func_search_panel');
  var list = ge('apps_edit_funcs');

  var id;
  while (inArray(id = Math.floor(Math.random() * 10000000, cur.funcIds))) {};
  cur.funcIds.unshift(id);
  cur.funcInfos[id] = {name : '', code: 'return "Hello World";'};

  var row = se(rs(cur.funcRowTpl, {
    name: 'newFunc',
    code: 'return "Hello World";',
    id: id
  }));
  list.insertBefore(row, list.firstChild);

  var el = geByClass1('apps_edit_editor', row);
  AppsEdit.switchEditFunc(id);
  AppsEdit.initEditor(el);
  //AppsEdit.initVersionDropdown(id);
  geByClass1('apps_edit_cont_name', row).focus();

  hide('apps_edit_ver_str'+id);
},

removeFunc: function(id) {
  var removedRow = ge("func_row_" + id);
  delete cur.funcInfos[id];
  var index = indexOf(cur.funcIds, id);
  cur.funcIds.splice(index, 1);

  var el = geByClass1('apps_edit_editor', removedRow);
  if (el && el.ace) {
    el.ace.destroy();
  }
  re(removedRow);

  if (cur.funcIds.length == 0) {
    show('apps_edit_funcs_empty');
    hide('func_search_panel');
  } else {
    var hasVisible = false;
    for (var i in cur.funcIds) {
      var rowId = cur.funcIds[i];
      var row = ge("func_row_" + rowId);
      if (isVisible(row)) {
        hasVisible = true;
      }
    }
    if (!hasVisible) {
      var searchText = val(ge('func_search'));
      var errorPanel = ge('apps_edit_funcs_not_found');
      var msg = getLang('developers_no_funcs_found').split('{query}').join('<b>' + this.cleanStr(searchText) + '</b>');
      errorPanel.innerHTML = msg;
      show(errorPanel);
    }
  }

  delete cur.funcsVersion[id];
  delete cur.funcsVersions[id];
  delete cur.funcsVersionsDD[id];
},

removeFuncVersion: function(id, v) {
  var versions = cur.funcsVersions[id].versions;
  for(var i = 0; i < versions.length; i++) {
    if (versions[i][0] == v) {
      var sliced = versions.slice(i + 1);
      cur.funcsVersions[id].versions = versions.slice(0, i).concat(sliced);
      break;
    }
  }
  AppsEdit.updateVersionsDD(id);
  AppsEdit.putVersionCode(id, -1);
},

removeFuncBox: function(id) {
  if (cur.funcSaving) return;
  var removedRow = ge("func_row_" + id);
  var name = val(geByClass1('apps_edit_cont_name', removedRow));
  name = 'execute.' + name;

  var version = cur.funcsVersion[id];

  if (version > 0) {
    var confirm_str = cur.lang.developers_func_remove_confirm.replace('{v}', version).replace('{name}', clean(name));
  } else {
    var confirm_str = cur.lang['developers_remove_func_confrim'].replace('%s', clean(name));
  }

  var box = showFastBox({title: cur.lang['developers_remove_func'], dark: 1}, confirm_str, cur.lang['developers_do_remove'], function() {
    cur.funcSaving = true;
    var func = cur.funcInfos[id];

    var params = {act: 'save_func', aid: cur.aid, hash: cur.funcsHash, old_name: func['name']};

    if (cur.funcsVersion[id] > 0) {
      params.act = 'a_remove_func_version';
      params.v = version;
      AppsEdit.removeFuncVersion(id, version);
    }

    ajax.post('editapp', params, {
      onDone: function(type, num, errText) {
        if (version > 0) {
          AppsEdit.removeFuncVersion(id, version);
        } else {
          AppsEdit.removeFunc(id);
        }
        cur.funcSaving = false;
      },
      onFail: function(type, field) {
        cur.funcSaving = false;
      }
    });

    box.hide();

  }, getLang('global_cancel'));
},

initVersionDropdown: function(id) {
  if (!cur.verDD) {
    cur.verDD = {};
  }

  ge('apps_edit_const_v_' + id).value = cur.lastVersion;
  cur.verDD[id] = new Dropdown(ge('apps_edit_const_v_' + id), cur.versions, {
    width: 118,
    big: 1,
    selectedItem: cur.lastVersion
  });
},

saveFunc: function(btn, id, ajaxLoader) {
  if (cur.funcSaving) return;
  cur.funcSaving = true;
  if (btn) {
    lockFlatButton(btn);
  }
  var func = cur.funcInfos[id];
  var row = ge("func_row_" + id);
  var name = geByClass1('apps_edit_cont_name', row);
  var code = geByClass1('apps_edit_editor', row);
  if (!code || !code.ace) {
    unlockFlatButton(btn);
    cur.funcSaving = false;
    return;
  }
  var codeText = code.ace.getValue();
  var nameText = val(name);

  var params = {act: 'save_func', aid: cur.aid, hash: cur.funcsHash, name: nameText, code: codeText, old_name: func['name']};

  if (cur.funcsVersion[id] > 0) {
    params['act'] = 'a_save_func_version';
    params['func'] = func['name'];
    params['v'] = cur.funcsVersion[id];

    var versions = cur.funcsVersions[id].versions;
    for(var i = 0; i < versions.length; i++) {
      if (versions[i][0] == cur.funcsVersion[id]) {
        cur.funcsVersions[id].versions[i][1] = codeText;
        break;
      }
    }
  } else {
    cur.funcInfos[id].code = codeText;
  }

  ajax.post('editapp', params, {
    onDone: function(type, errText) {
      if (type == 'name') {
        notaBene(name);
      } else if (type == 'code') {
        var err = geByClass1('apps_edit_err_info', row);
        err.innerHTML = errText;
        if (!isVisible(err.parentNode)) {
          slideDown(err.parentNode, 150);
        }
        code.ace.focus();
      } else if (type == 'limit') {
        showFastBox({
          title: cur.lang.box_error,
          dark: 1
        }, errText);
      } else {
        if (!params.v || params.v == -1) {
          func['name'] = nameText;
          func['code'] = codeText;
        } else {
          if (params.v == cur.funcsVersions[id].disable_add) {
            delete cur.funcsVersions[id].disable_add;
          }
        }
        var errEls = geByClass('apps_edit_err_info_cont', row);
        for(var i in errEls) {
          if (isVisible(errEls[i])) {
            slideUp(errEls[i], 150);
          }
        }

        show('apps_edit_ver_str'+id);

        var b = geByClass1('apps_edit_cancel_button', row);
        fadeOut(b, 150, function() {
          var s = geByClass1('apps_edit_save_info', row);
          s.innerHTML = type;
          fadeIn(s, 150);
          setTimeout(function() {
            fadeOut(s, 150, function() {
              fadeIn(b, 150);
            })
          }, 2000);
        })
      }
      if (btn) {
        unlockFlatButton(btn);
      }
      delete cur.editedFuncs[id];
      cur.funcSaving = false;
      if (cur.funcsSaveCallbacks[id]) {
        cur.funcsSaveCallbacks[id]();
        delete cur.funcsSaveCallbacks[id];
      }
    },
    onFail: function(type, num, field) {
      if (btn) {
        unlockFlatButton(btn);
        cur.funcSaving = false;
      }
    },
    loader: ajaxLoader ? true : false
  })
},

cancelFuncChange: function(id) {
  if (cur.funcSaving) return;
  var row = ge("func_row_" + id);
  var name = val(geByClass1('apps_edit_cont_name', row));
  var codeEl = geByClass1('apps_edit_editor', row);
  var code = '';
  if (codeEl && codeEl.ace) {
    code = codeEl.ace.getValue();
  }
  var func = cur.funcInfos[id];

  if (!func['name'] && func['code'] == code) {
    AppsEdit.removeFunc(id);
    return;
  }

  if (name == func['name'] && func['code'] == code || cur.funcsVersion[id] > 0) {
    AppsEdit.switchEditFunc(id);
    return;
  }

  var box = showFastBox({title: cur.lang['developers_cancel_func'], dark: 1}, cur.lang['developers_cancel_func_confrim'].replace('%s', clean(name)), cur.lang['developers_do_cancel'], function() {
    if (!func['name']) {
      AppsEdit.removeFunc(id);
    } else {
      if (codeEl && codeEl.ace) {
        codeEl.ace.setValue(func['code'], 1);
        codeEl.ace.focus();
      }
      var nameEl = geByClass1('apps_edit_cont_name', row);
      nameEl.value = func['name'] ? func['name'] : 'newFunc';
    }
    box.hide();
  });
},

runFunc: function(id, btn) {
  if (isButtonLocked(btn)) return;
  var row = ge('func_row_' + id);
  var codeEl = geByClass1('apps_edit_editor', row);

  var code = '';
  if (codeEl && codeEl.ace) {
    code = codeEl.ace.getValue();
  }
  if (cur.runContProgress) {
    return false;
  }

  var params = {act: 'a_run_method', method: 'execute', param_code: code, hash: cur.runHash};
  var paramNames = AppsEdit.getExecuteFields(row);
  var paramContainer = geByClass1('apps_edit_params', row);
  for (i = 0; i < paramNames.length; i++) {
    var param = paramNames[i];
    var paramPanel = geByClass1('execute_param_' + param, paramContainer);
    var paramInput = geByClass1('execute_field_input', paramPanel);
    params["param_" + param] = val(paramInput);
  }

  if (cur.verDD[id]) {
    params['param_v'] = cur.verDD[id].val();
  }

  ajax.post('dev', params, {
    onDone: function(code) {
      var res = parseJSON(code);
      var html = Dev.wrapObject(res, true);
      showFastBox({title: cur.lang['developers_run_result'], dark: 1, width: 500, bodyStyle: 'padding: 16px 16px 16px 2px;'}, '<div id="dev_result" onmousemove="Dev.resultMove(event.target);" onmouseout="Dev.resultMove(false);">'+html+'</div>');
    },
    onFail: function(msg) {
      setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
      return true;
    },
    showProgress: function() {
      lockFlatButton(btn);
    },
    hideProgress: function() {
      unlockFlatButton(btn);
    },
    stat: ['dev.js', 'dev.css']
  })

},

adjustHeight: function(editor, el) {
  var lineHeight = editor.renderer.lineHeight <= 1 ? 16 : editor.renderer.lineHeight;
  var newHeight = (editor.getSession().getScreenLength() * lineHeight) + editor.renderer.scrollBar.width;
  var row = domPN(el);
  while (!hasClass(row, 'apps_edit_cont_row')) {
    row = domPN(row);
  }
  var runWrap = geByClass1('apps_edit_run_wrap', row);

  newHeight = Math.max(122, newHeight, getSize(runWrap)[1] + 26);
  setStyle(domPN(el), {height: newHeight});
  editor.resize();
},

initEditor: function(el, id) {
  var editor = ace.edit(el);
  el.ace = editor;

  editor.on('change', function() {
    AppsEdit.updateExecuteParams(editor, el);
    cur.editedFuncs[id] = 1;
  });

  var session = editor.getSession();
  session.setMode("ace/mode/javascript");
  session.setUseWorker(false);
  this.adjustHeight(editor, el);
  session.on('tokenizerUpdate', function() { AppsEdit.updateExecuteParams(editor, el) });
},

getExecuteFields: function(row) {
  var paramPanel = geByClass1("apps_edit_params", row);
  var nodes = paramPanel.childNodes;
  var names = [];
  for (i = 0; i < nodes.length; i++) {
    var className = nodes[i].className;
    if (className) {
      var m = nodes[i].className.match(/(?:\\s|^)execute_param_(.+)(?:\\s|$)/);
      if (m && m[1]) {
        names.push(m[1]);
      }
    }
  }
  return names;
},

updateExecuteParams: function(editor, el) {
  var row = domPN(el);
  while (!hasClass(row, 'apps_edit_cont_row')) {
    row = domPN(row);
  }

  var currentParams = AppsEdit.getExecuteFields(row);

  editor.session.getLength();
  var TokenIterator = ace.require("ace/token_iterator").TokenIterator;
  var iterator = new TokenIterator(editor.getSession(), 0, 0);

  var params = [];
  var newParams = [];
  var argsPlace = -100;
  var pointPlace = -100;
  var index = -1;
  while (token = iterator.stepForward()) {
    index++;
    if (token['type'] == 'identifier' && token['value'] == 'Args') {
      argsPlace = index;
    }
    if (token['type'] == 'punctuation.operator' && token['value'] == '.') {
      pointPlace = index;
    }
    if (token['type'] == 'identifier') {
      if (argsPlace == index - 2 && pointPlace == index - 1) {
        var param = token['value'];
        if (params.indexOf(param) < 0) {
          params.push(param);
          if (currentParams.indexOf(param) < 0) {
            newParams.push(param);
          }
        }
      }
    }
  }

  var removedParams = [];
  for (i = 0; i < currentParams.length; i++) {
    var param = currentParams[i];
    if (params.indexOf(param) < 0) {
      removedParams.push(param);
    }
  }

  //just replaced (typed) name
  if (newParams.length == 1 && removedParams.length == 1) {
    var oldName = removedParams[0], newName = newParams[0];
    var oldEl = geByClass1("execute_param_" + oldName, row);
    removeClass(oldEl, "execute_param_" + oldName);
    addClass(oldEl, "execute_param_" + newName);
    geByClass1("execute_field_name", oldEl).innerHTML = newName;
  } else {
    var paramContainer = geByClass1("apps_edit_params", row);
    for (i = 0; i < removedParams.length; i++) {
      var oldName = removedParams[i];
      var oldField = geByClass1("execute_param_" + oldName, paramContainer);
      paramContainer.removeChild(oldField);
    }
    for (var i = 0; i < newParams.length; i++) {
      var newName = newParams[i];
      var newEl = ce('div', {className: "execute_param_" + newName, innerHTML: "<div class='execute_field_name'>" + newName + "</div><input class='text execute_field_input' type='text'>"});
      paramContainer.appendChild(newEl);
    }
  }

  this.adjustHeight(editor, el);
},

switchEditFunc: function(id, e) {

  if (e) {
    var el = e.target;
    cancelEvent(e);
    while(el) {
      if (hasClass(el, 'apps_edit_ver_dd')) {
        return;
      }
      el = el.parentNode;
    }
  }

  if (cur.funcDDShown && id == cur.funcDDShown) {
    return;
  }

  if (cur.currentFunc) {
    var oldRow = ge('func_row_' + cur.currentFunc);
    if (oldRow) {
      removeClass(oldRow, 'active');
      var oldName = geByClass1("apps_edit_cont_name", oldRow);
      setTimeout(function() {
        oldName.readOnly = true;
      }, 0);
      var oldContent = geByClass1('apps_edit_content', oldRow);
      slideUp(oldContent, 150);
    }
  }
  if (!cur.initedFunctions[id]) {
    AppsEdit.initEditor(geByClass('apps_edit_editor', ge('func_row_'+id))[0], id);
    AppsEdit.initVersionDropdown(id);
    cur.initedFunctions[id] = 1;
    AppsEdit.loadFuncVersions(id);

    cur.funcsVersionsDD[id] = new Dropdown(ge('funcs_versions_dd'+id), [], {
      width: 200,
      big: 1,
      autocomplete: true,
      multiselect: false,
      placeholder: cur.lang.developers_search_version,
      onChange: function (val) {
        if (!val) {
          return;
        }
        AppsEdit.putVersionCode(id, val);
      },
      onBlur: function() {
        hide('apps_edit_ver_dd' + id, 'apps_edit_add_version' + id);
        setTimeout(function() {
          cur.funcDDShown = false;
        }, 1000);
      }
    });
  }
  if (cur.currentFunc == id) {
    cur.currentFunc = null;
    return;
  }
  cur.currentFunc = id;
  var newRow = ge('func_row_' + id);
  addClass(newRow, 'active');
  var newName = geByClass1("apps_edit_cont_name", newRow);
  newName.readOnly = false;
  var newContent = geByClass1('apps_edit_content', newRow);
  slideDown(newContent, 150, function() {
    var el = geByClass1('apps_edit_editor', ge('func_row_' + id));
    AppsEdit.adjustHeight(el.ace, el);
  });
},

loadFuncVersions: function(id) {
  var func = cur.funcInfos[id];
  ajax.post('al_apps_edit.php', {act: 'a_get_func_versions', func: func['name'], aid: cur.aid}, {
    onDone: function(d) {
      if (!d) {
        d = {
          last_v: 1,
          versions: [[-1, -1]]
        }
      }
      cur.funcsVersions[id] = {
        last_v: d.last_v,
        versions: d.versions
      };
      AppsEdit.updateVersionsDD(id);
      cur.funcsVersionsDD[id].val(-1);
      removeClass('apps_edit_ver_str'+id, 'apps_edit_ver_str_hidden');
    }
  });
},

addFuncVersion: function(id, force) {

  if (!force && cur.funcsSaveCallbacks[id] || cur.funcsVersions[id].disable_add) {
    return;
  }

  if (cur.editedFuncs[id]) {

    function onBoxClos(btn) {
      box.hide();
      if (!hasClass(btn, 'secondary')) {
        cur.funcsSaveCallbacks[id] = function() {
          delete cur.editedFuncs[id];
          AppsEdit.addFuncVersion(id, 1);
        };
        AppsEdit.saveFunc(false, id, 1);
      } else {
        delete cur.editedFuncs[id];
        AppsEdit.addFuncVersion(id, 1);
      }
    }

    var box = new MessageBox({
      title: getLang('global_warning'),
      dark: 1
    })
    .content(cur.lang.developers_confirmation_sh_func)
    .addButton(getLang('box_no'), onBoxClos, 'gray')
    .addButton(getLang('box_yes'), onBoxClos).show();
    return;
  }

  cur.funcsVersions[id].last_v++;
  var v = cur.funcsVersions[id].last_v;
  cur.funcsVersions[id].versions.unshift([v, 'return "Hello World";']);

  AppsEdit.updateVersionsDD(id);
  AppsEdit.putVersionCode(id, v);

  cur.funcsVersions[id].disable_add = v;
},

showVersionsDD: function(id) {
  show('apps_edit_ver_dd' + id);
  cur.funcsVersionsDD[id].focus();
  cur.funcDDShown = id;

  if (cur.funcsVersions[id] && !cur.funcsVersions[id].disable_add) {
    show('apps_edit_add_version' + id);
  }
},

updateVersionsDD: function(id) {
  var versions = cur.funcsVersions[id].versions;

  var options = [];
  for(var i = 0; i < versions.length; i++) {
    options.push([versions[i][0], cur.lang.developers_version_pref + ' ' + Math.abs(versions[i][0])]);
  }
  cur.funcsVersionsDD[id].select.clear();
  cur.funcsVersionsDD[id].setData(options);

},

putVersionCode: function (id, v) {
  if (v == -1) { // default
    var code = cur.funcInfos[id].code;
  } else {
    var versions = cur.funcsVersions[id].versions;
    for(var i = 0; i < versions.length; i++) {
      if (versions[i][0] == v) {
        var code = versions[i][1];
        break;
      }
    }
  }
  cur.funcsVersion[id] = parseInt(v);
  var editor = geByClass('apps_edit_editor', ge('func_row_'+id))[0].ace;
  editor.setValue(code);

  ge('apps_edit_ver_str'+id).innerHTML = cur.lang.developers_version_pref + ' ' + Math.abs(v);
  cur.funcsVersionsDD[id].val(v);
},

switchEditActivity: function(id, duration) {
  if (duration === undefined) {
    duration = 150;
  }
  if (cur.currentActivity) {
    var oldRow = ge('activity_row_' + cur.currentActivity);
    if (oldRow) {
      removeClass(oldRow, 'active');
      var oldContent = geByClass1('apps_edit_content', oldRow);
      slideUp(oldContent, duration);
    }
  }
  if (cur.currentActivity == id) {
    cur.currentActivity = null;
    return;
  }
  cur.currentActivity = id;
  var newRow = ge('activity_row_' + id);
  addClass(newRow, 'active');
  var newContent = geByClass1('apps_edit_content', newRow);
  slideDown(newContent, duration, function() {
    var el = geByClass1('apps_edit_editor', ge('func_row_' + id));
    AppsEdit.adjustHeight(el.ace, el);
  });
},


switchEditRequest: function(id, duration) {
  if (duration === undefined) {
    duration = 150;
  }
  if (cur.currentRequest) {
    var oldRow = ge('request_row_' + cur.currentRequest);
    if (oldRow) {
      removeClass(oldRow, 'active');
      var oldName = geByClass1("apps_edit_cont_name", oldRow);
      setTimeout(function() {
        oldName.readOnly = true;
      }, 0);
      var oldContent = geByClass1('apps_edit_content', oldRow);
      slideUp(oldContent, duration);
    }
  }
  if (cur.currentRequest == id) {
    cur.currentRequest = null;
    return;
  }
  cur.currentRequest = id;
  var newRow = ge('request_row_' + id);
  addClass(newRow, 'active');
  var newName = geByClass1("apps_edit_cont_name", newRow);
  if (newName) newName.readOnly = false;
  var newContent = geByClass1('apps_edit_content', newRow);
  slideDown(newContent, duration, function() {
    var el = geByClass1('apps_edit_editor', ge('func_row_' + id));
    AppsEdit.adjustHeight(el.ace, el);
  });
},

collectRequestData: function(id) {
  var row = ge('request_row_' + id);
  if (!row) {
    return {};
  }
  return {
    name: trim(val('request_name_' + id)),
    text_m: trim(val('request_text_m_' + id)),
    text_f: trim(val('request_text_f_' + id)),
    text_mul: trim(val('request_text_mul_' + id)),
    button: trim(val('request_accept_text_' + id)),
    response: !!isChecked('request_response_' + id)
  };
},

collectActivityData: function(id) {
  var row = ge('activity_row_' + id);
  if (!row) {
    return {};
  }
  return {
    name: trim(val('activity_text_name_' + id)),
    text_m: trim(val('activity_text_m_' + id)),
    text_f: trim(val('activity_text_f_' + id)),
    points: parseInt(trim(val('activity_text_points_' + id))),
  };
},

checkActivityFields: function(id) {
  var data = this.collectActivityData(id);
  if (!data.name) {
    notaBene('activity_name_' + id);
    if (data.name) {
      this.showRequestMsg(ge('activity_row_' + id), true, getLang('apps_wrong_activity_name'));
    }
    return false;
  }
  if (!data.text_m) {
    notaBene(domPN(ge('activity_text_m_' + id)));
    elfocus('activity_text_m_' + id);
    return false;
  }
  if (!data.text_f) {
    notaBene(domPN(ge('activity_text_f_' + id)));
    elfocus('activity_text_f_' + id);
    return false;
  }
  if (!data.points) {
    notaBene(domPN(ge('activity_text_points_' + id)));
    elfocus('activity_text_mul_' + id);
    return false;
  }
  data.response = data.response ? 1 : 0;

  return data;
},

checkRequestFields: function(id) {
  var data = this.collectRequestData(id);
  if (!data.name.match(/^([a-zA-Z0-9_]+)$/)) {
    notaBene('request_name_' + id);
    if (data.name) {
      this.showRequestMsg(ge('request_row_' + id), true, getLang('apps_wrong_request_name'));
    }
    return false;
  }
  if (!data.text_m) {
    notaBene(domPN(ge('request_text_m_' + id)));
    elfocus('request_text_m_' + id);
    return false;
  }
  if (!data.text_f) {
    notaBene(domPN(ge('request_text_f_' + id)));
    elfocus('request_text_f_' + id);
    return false;
  }
  if (!data.text_mul) {
    notaBene(domPN(ge('request_text_mul_' + id)));
    elfocus('request_text_mul_' + id);
    return false;
  }
  if (!data.button) {
    notaBene('request_accept_text_' + id);
    return false;
  }
  data.response = data.response ? 1 : 0;

  return data;
},

requestNotModified: function(id) {
  var request = cur.requests[id] || this.defaultRequestData(),
      data = this.collectRequestData(id);

  for (var i in data) {
    if (request[i] !== data[i]) {
      return false;
    }
  }

  return true;
},

activityNotModified: function(id) {
  cur.activityChanged = cur.activityChanged || {};

  if (!cur.activities[id] && !cur.activityChanged[id]) {
    return true;
  }
  var activity = cur.activities[id],
      data = this.collectActivityData(id);

  if (!activity) return false;

  for (var i in data) {
    if (activity[i] !== data[i]) {
      return false;
    }
  }

  return true;
},

defaultRequestData: function() {
  return {
    name: 'newRequest',
    text_m: getLang('apps_sent_request_m'),
    text_f: getLang('apps_sent_request_f'),
    text_mul: getLang('apps_sent_request_mul'),
    button: getLang('apps_request_button_accept'),
    response: false
  };
},

defaultActivityData: function() {
  var sample = unclean(cur.activitySamples).split('<#>');
  sample = sample[Math.floor(Math.random() * sample.length)].split('<!>');

  return {
    name: sample[0],
    text_m: sample[1],
    text_f: sample[2],
    points: 10
  };
},

updateRemainingPoints: function() {
  var sum = 0;
  each(geByClass('apps_edit_activity_points'), function() {
    sum += parseInt(val(this)) || 0;
  });

  var remain = Math.max(cur.maxTotalPoints - sum, 0);
  var text = langNumeric(remain, cur.lang.apps_activities_edit_points_remain);

  each(geByClass('apps_edit_points_remain_text'), function() {
    this.innerHTML = text;
  });

  cur.activityRemainPoints = remain;

  return cur.maxTotalPoints - sum;
},

toggleRequestsBtn: function() {
  toggle('add_requests_btn', geByClass('apps_edit_cont_row', ge('apps_edit_requests')).length < cur.maxRequests);
},

toggleActivitiesBtn: function() {
  toggle('add_activities_btn', geByClass('apps_edit_cont_row', ge('apps_edit_activities')).length < cur.maxActivities);
},

requestInsertRow: function(row, list) {
  if (!row || !list) {
    return;
  }
  var rows = geByClass('apps_edit_cont_row', list),
      curId = parseInt(row.id.replace('request_row_', '')),
      rowAfter = false;
  for (var i in rows) {
    var id = parseInt(rows[i].id.replace('request_row_', ''));
    if (id < curId) {
      rowAfter = rows[i];
      break;
    }
  }
  if (rowAfter) {
    list.insertBefore(row, rowAfter);
  } else {
    list.appendChild(row);
  }
},

activityInsertRow: function(row, list) {
  if (!row || !list) {
    return;
  }
  var rows = geByClass('apps_edit_cont_row', list),
      curId = parseInt(row.id.replace('activity_row_', '')),
      rowAfter = false;
  for (var i in rows) {
    var id = parseInt(rows[i].id.replace('activity_row_', ''));
    if (id < curId) {
      rowAfter = rows[i];
      break;
    }
  }
  if (rowAfter) {
    list.insertBefore(row, rowAfter);
  } else {
    list.appendChild(row);
  }
},

onActivityInputsChange: function(input, ev) {
  var parent = gpeByClass('apps_edit_cont_row', input);

  if (!parent) return;

  var activityId = parent.getAttribute('data-id');
  if (activityId > 2000000000) {
    cur.activityChanged = cur.activityChanged || {};
    cur.activityChanged[activityId] = true;
  }

  var nameInputEl = geByClass1('apps_edit_activity_name', parent);
  var pointsInputEl = geByClass1('apps_edit_activity_points', parent);

  var nameContainer = geByClass1('apps_edit_activity_title_name', parent);
  var pointsContainer = geByClass1('apps_edit_activity_title_points', parent);

  var points = parseInt(val(pointsInputEl)) || 0;
  if (points > cur.maxPointsPerActivity || points < 0) {
    val(pointsInputEl, Math.max(0, Math.min(cur.maxPointsPerActivity, points)));
  }

  clearTimeout(cur._activityInputChangeTO);
  cur._activityInputChangeTO = setTimeout(function() {
    nameContainer.innerHTML = clean(trim(nameInputEl.value) || 'No name');
    pointsContainer.innerHTML = clean(langNumeric(trim(pointsInputEl.value) || 0, cur.lang.apps_edit_activities_points) || '');
  }, 50);
},

addActivity: function() {
  hide('apps_edit_activity_empty');
  hide('apps_edit_activity_not_found');

  cur.activityId = (cur.activityId || 2000000000) + 1;

  var list = ge('apps_edit_activities_new');
  var id = cur.activityId;
  var row = this.rowFromActivity(id, this.defaultActivityData());
  AppsEdit.requestInsertRow(row, list);
  show(list);
  AppsEdit.toggleRequestsBtn();

  AppsEdit.switchEditRequest(id);
  AppsEdit.updateRemainingPoints();
  geByClass1('apps_edit_activity_name', row).select();

  re(geByClass1('apps_edit_activity_delete_btn', row));
},

addRequest: function() {
  hide('apps_edit_requests_empty');
  hide('apps_edit_requests_not_found');
  cur.requestId = (cur.requestId || 2000000000) + 1;
  var list = ge('apps_edit_requests_new'),
      id = cur.requestId,
      row = this.rowFromRequest(id, this.defaultRequestData());
  AppsEdit.requestInsertRow(row, list);
  show(list);
  AppsEdit.toggleRequestsBtn();

  AppsEdit.switchEditRequest(id);
  geByClass1('apps_edit_cont_name', row).focus();
},

showRequestMsg: function(row, isError, msg) {
  var b = geByClass1('apps_edit_cancel_button', row);
  fadeOut(b, 150, function() {
    var s = geByClass1('apps_edit_save_info', row);
    if (isError) {
      msg = '<span class="save_error">' + msg + '</span>';
    }
    s.innerHTML = msg;
    fadeIn(s, 150);
    setTimeout(function() {
      fadeOut(s, 150, fadeIn.pbind(b, 150));
    }, 2000);
  });
  return true;
},

showRequestUserTT: function(el, langKey) {
  var text = getLang(langKey || 'apps_edit_request_user_name');
  showTooltip(el, {
    text: '<div class="apps_edit_bottom_tt_pointer"></div>' + text,
    className: 'apps_edit_tt user',
    slide: 15,
    shift: [1, 9, 9]
  });
},

showActivityUserTT: function(el, langKey, shift) {
  var text = getLang(langKey || 'apps_edit_request_user_name');
  showTooltip(el, {
    text: '<div class="apps_edit_bottom_tt_pointer"></div>' + text,
    className: 'apps_edit_tt user',
    slide: 15,
    shift: shift || [1, 9, 9]
  });
},

showRequestStatusTT: function(el, id) {
  var msg = getLang('apps_edit_request_created'),
      request = cur.requests[id];
  if (!request) {
    return;
  }

  switch (request.status) {
    case 0: msg = getLang('apps_edit_request_created'); break;
    case 1: msg = getLang('apps_edit_request_accepted'); break;
    case 2: msg = getLang('apps_edit_request_declined'); break;
  }
  window.tooltips && tooltips.hideAll();
  showTooltip(el, {
    text: '<div class="apps_edit_bottom_tt_pointer"></div>' + msg,
    className: 'apps_edit_tt user',
    slide: 15,
    shift: [17, 15, 15]
  });
},

showActivityStatusTT: function(el, id) {
  var msg = getLang('apps_edit_activity_created'),
      activity = cur.activities[id];
  if (!activity) {
    return;
  }

  switch (activity.status) {
    case 0: msg = getLang('apps_edit_activity_created'); break;
    case 1: msg = getLang('apps_edit_activity_accepted'); break;
    case 2: msg = getLang('apps_edit_activity_declined'); break;
  }
  window.tooltips && tooltips.hideAll();
  showTooltip(el, {
    text: '<div class="apps_edit_bottom_tt_pointer"></div>' + msg,
    className: 'apps_edit_tt user',
    slide: 15,
    shift: [17, 15, 15]
  });
},

rowFromRequest: function(id, request) {
  var row_class = '';
  switch (request.status) {
    case 0:
      row_class = 'review';
      break;
    case 1:
      row_class = 'accepted';
      break;
    case 2:
      row_class = 'declined';
      break;
  }
  var rowData = {
    id: id,
    row_class: row_class,
    name: request.name,
    text_m: request.text_m,
    text_f: request.text_f,
    text_mul: request.text_mul,
    button: request.button,
    check_class: (request.response ? ' on' : ''),
    disabled_attr: (request.status == 1 ? ' disabled="disabled"' : ''),
    disabled_class: (request.status == 1 ? ' disabled' : '')
  };
  return se(rs(cur.requestRowTpl, rowData));
},

rowFromActivity: function(id, activity, noHide) {
  var row_class = '';
  switch (activity.status) {
    case 0:
      row_class = 'review';
      break;
    case 1:
      row_class = 'accepted';
      break;
    case 2:
      row_class = 'declined';
      break;
  }

  var rowData = {
    id: id,
    row_class: row_class,
    name: activity.name,
    text_m: activity.text_m,
    text_f: activity.text_f,
    points: activity.points,
    points_text: langNumeric(activity.points, cur.lang.apps_edit_activities_points),
    check_class: (activity.response ? ' on' : ''),
    disabled_attr: (activity.status == 1 ? ' disabled="disabled"' : ''),
    disabled_class: (activity.status == 1 ? ' disabled' : ''),

    id_hide_style: noHide ? '' : 'display: none',
    points_label_hide_style: noHide ? '' : 'display: none',

    disabled_points_attr: (activity.status == 1 ? ' ' : ''),
    disabled_points_class: (activity.status == 1 ? ' ' : ''),
  };
  return se(rs(cur.activityRowTpl, rowData));
},

saveActivity: function(btn, id) {
  var data = this.checkActivityFields(id);
  if (!data || cur.activitySaving) {
    return;
  }

  cur.activitySaving = true;
  if (btn) {
    lockFlatButton(btn);
  }

  var row = ge('activity_row_' + id),
      params = extend({act: 'save_activity', aid: cur.aid, hash: cur.activityHash, activity_id: id}, data);
  ajax.post('editapp', params, {
    onDone: function(newId, activity, msg) {
      var oldActivity = cur.activities[newId],
          oldCnt = AppsEdit.activityRowsCnt();
      cur.activities[newId] = activity;
      var newRow = AppsEdit.rowFromActivity(newId, activity, true),
          oldList = domPN(row),
          newList = ge('apps_edit_activities_status' + activity.status);
      if (oldList.id == newList.id && oldActivity && oldActivity.status == activity.status) {
        oldList.replaceChild(newRow, row);
      } else {
        AppsEdit.removeActivity(id, true);
        AppsEdit.activityInsertRow(newRow, newList);
        show(newList);
      }
      cur.currentActivity = null;
      if (id == newId) {
        AppsEdit.switchEditActivity(newId, 0);
      } else if (oldCnt == 1) {
        AppsEdit.showActivityStatusTT(geByClass1('apps_edit_cont_icon', newRow), newId);
      }
      AppsEdit.showRequestMsg(newRow, false, msg);
      AppsEdit.updateRemainingPoints();
    },
    onFail: AppsEdit.showRequestMsg.pbind(row, true),
    hideProgress: function() {
      if (btn) {
        unlockFlatButton(btn);
        cur.activitySaving = false;
      }
    }
  })
},

toggleActivity: function(btn, id) {
  var parent = gpeByClass('apps_edit_cont_row', btn);
  var content = geByClass1('apps_edit_content', parent);
  toggle(content);
},

saveRequest: function(btn, id) {
  var data = this.checkRequestFields(id);
  if (!data || cur.requestSaving) {
    return;
  }

  cur.requestSaving = true;
  if (btn) {
    lockFlatButton(btn);
  }

  var row = ge('request_row_' + id),
      params = extend({act: 'save_request', aid: cur.aid, hash: cur.requestHash, request_id: id}, data);
  ajax.post('editapp', params, {
    onDone: function(newId, request, msg) {
      var oldRequest = cur.requests[newId],
          oldCnt = AppsEdit.requestRowsCnt();
      cur.requests[newId] = request;
      var newRow = AppsEdit.rowFromRequest(newId, request),
          oldList = domPN(row),
          newList = ge('apps_edit_requests_status' + request.status);
      if (oldList.id == newList.id && oldRequest && oldRequest.status == request.status) {
        oldList.replaceChild(newRow, row);
      } else {
        AppsEdit.removeRequest(id, true);
        AppsEdit.requestInsertRow(newRow, newList);
        show(newList);
      }
      cur.currentRequest = null;
      if (id == newId) {
        AppsEdit.switchEditRequest(newId, 0);
      } else if (oldCnt == 1) {
        AppsEdit.showRequestStatusTT(geByClass1('apps_edit_cont_icon', newRow), newId);
      }
      AppsEdit.showRequestMsg(newRow, false, msg);
    },
    onFail: AppsEdit.showRequestMsg.pbind(row, true),
    hideProgress: function() {
      if (btn) {
        unlockFlatButton(btn);
        cur.requestSaving = false;
      }
    }
  })
},

correctActivityPointsInput: function(inputEl) {
  var points = parseInt(val(inputEl)) || 0;
  val(inputEl, points);
},

cancelActivityChange: function(id) {
  if (cur.activitySaving) {
    return;
  }

  var row = ge('activity_row_' + id), activity = cur.activities[id], content = geByClass1('apps_edit_content', row);

  if (AppsEdit.activityNotModified(id)) {
    if (!activity) {
      AppsEdit.removeActivity(id);
    } else {
      toggle(content);
    }
    return;
  }

  var box = showFastBox({title: getLang('apps_cancel_activity'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('apps_cancel_activity_confrim'), getLang('developers_do_cancel'), function() {
    if (!activity) {
      AppsEdit.removeActivity(id);
    } else {
      val('activity_text_m_' + id, activity.text_m);
      val('activity_text_f_' + id, activity.text_f);
      val('activity_text_name_' + id, activity.name);
      val('activity_points_' + id, activity.points);

      AppsEdit.onActivityNameChange(ge('activity_text_name_' + id));
      toggle(content);
    }
    box.hide();
  });
},

cancelRequestChange: function(id) {
  if (cur.requestSaving) {
    return;
  }

  var row = ge('request_row_' + id),
      name = val(geByClass1('apps_edit_cont_name', row));
      request = cur.requests[id];

  if (AppsEdit.requestNotModified(id)) {
    if (!request) {
      AppsEdit.removeRequest(id);
    } else {
      AppsEdit.switchEditRequest(id);
    }
    return;
  }

  var box = showFastBox({title: getLang('apps_cancel_request'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('apps_cancel_request_confrim').replace('%s', clean(name)), getLang('developers_do_cancel'), function() {
    if (!request) {
      AppsEdit.removeRequest(id);
    } else {
      val('request_name_' + id, request.name);
      val('request_text_m_' + id, request.text_m);
      val('request_text_f_' + id, request.text_f);
      val('request_text_mul_' + id, request.text_mul);
      val('request_accept_text_' + id, request.button);
      checkbox('request_response_' + id, request.response);
    }
    box.hide();
  });
},

activityRowsCnt: function(parent) {
  if (!parent) {
    parent = ge('apps_edit_activities');
  }
  var rows = parent && geByClass('apps_edit_cont_row', parent) || [];

  return rows.length;
},

requestRowsCnt: function(parent) {
  if (!parent) {
    parent = ge('apps_edit_requests');
  }
  var rows = parent && geByClass('apps_edit_cont_row', parent) || [];

  return rows.length;
},

removeRequest: function(id, onlyHide) {
  var row = ge('request_row_' + id),
      list = domPN(row);
  re(row);
  var rowsCnt = AppsEdit.requestRowsCnt(ge('apps_edit_requests')),
      curRowsCnt = AppsEdit.requestRowsCnt(list);
  if (!curRowsCnt) {
    hide(list);
  }
  if (onlyHide) {
    return;
  }

  delete cur.requests[id];
  AppsEdit.toggleRequestsBtn();

  if (!rowsCnt) {
    show('apps_edit_requests_empty');
  }
},

removeActivity: function(id, onlyHide) {
  var row = ge('activity_row_' + id),
      list = domPN(row);
  re(row);
  var rowsCnt = AppsEdit.activityRowsCnt(ge('apps_edit_requests')),
      curRowsCnt = AppsEdit.activityRowsCnt(list);
  if (!curRowsCnt) {
    hide(list);
  }
  if (onlyHide) {
    return;
  }

  delete cur.activities[id];
  AppsEdit.toggleActivitiesBtn();

  if (!rowsCnt) {
    show('apps_edit_activities_empty');
  }
},

removeActivityBox: function(id) {
  if (cur.activitySaving) {
    return false;
  }

  var activity = cur.activities[id];
  if (AppsEdit.activityNotModified(id) && !activity) {
    AppsEdit.removeActivity(id);
    return;
  }

  var removedRow = ge('activity_row_' + id),
      name = val(geByClass1('apps_edit_cont_name', removedRow));

  var box = showFastBox({title: getLang('apps_remove_activity'), dark: 1}, getLang('apps_remove_activity_confirm').replace('%s', clean(name)), getLang('developers_do_remove'), function() {
    if (!activity) {
      AppsEdit.removeActivity(id);
    } else {
      cur.activitySaving = true;
      ajax.post('editapp', {act: 'delete_activity', aid: cur.aid, hash: cur.activityHash, activity_id: id}, {
        onDone: AppsEdit.removeActivity.pbind(id, false),
        onFail: AppsEdit.showRequestMsg.pbind(removedRow, true),
        hideProgress: function() {
          cur.activitySaving = false;
        }
      });
    }
    box.hide();
  }, getLang('global_cancel'));
},

removeRequestBox: function(id) {
  if (cur.requestSaving) {
    return false;
  }

  var request = cur.requests[id];
  if (AppsEdit.requestNotModified(id) && !request) {
    AppsEdit.removeRequest(id);
    return;
  }

  var removedRow = ge('request_row_' + id),
      name = val(geByClass1('apps_edit_cont_name', removedRow));

  var box = showFastBox({title: getLang('apps_remove_request'), dark: 1}, getLang('apps_remove_request_confrim').replace('%s', clean(name)), getLang('developers_do_remove'), function() {
    if (!request) {
      AppsEdit.removeRequest(id);
    } else {
      cur.requestSaving = true;
      ajax.post('editapp', {act: 'delete_request', aid: cur.aid, hash: cur.requestHash, request_id: id}, {
        onDone: AppsEdit.removeRequest.pbind(id, false),
        onFail: AppsEdit.showRequestMsg.pbind(removedRow, true),
        hideProgress: function() {
          cur.requestSaving = false;
        }
      });
    }
    box.hide();
  }, getLang('global_cancel'));
},

updateList: function(e, obj) {
  if (e.keyCode == 27) {
    return this.resetList(obj);
  }
  clearTimeout(cur.searchTimeout);
  setTimeout((function() {
    var str = trim(obj.value);
    this.searchList(str);
  }).bind(this), 10);
},

cleanStr: function(str) {
  return str.replace(/([<>&#]*)/g, '');
},

resetList: function(obj) {
  val(obj, '');
  return AppsEdit.searchList(false);
},

searchList: function(str) {
  if (str) {
    str = str.toLowerCase();
  }
  toggle('apps_edit_reset_search', !!str);
  var errorPanel = ge('apps_edit_funcs_not_found'),
      notFoundMsg = getLang('developers_no_funcs_found'),
      cont = ge('apps_edit_funcs'),
      rows = geByClass('apps_edit_cont_row', cont),
      shownCount = 0;
  for (var i in rows) {
    var row = rows[i];
    if (str) {
      var name = val(geByClass1('apps_edit_cont_name', row));
      name = name.toLowerCase();
      if (name.indexOf(str) > -1) {
        show(row);
        shownCount++;
      } else {
        hide(row);
      }
    } else {
      show(row);
      shownCount++;
    }
  }
  if (str && !shownCount) {
    var msg = notFoundMsg.split('{query}').join('<b>' + this.cleanStr(str) + '</b>');
    errorPanel.innerHTML = msg;
    show(errorPanel);
  } else {
    hide(errorPanel);
  }
},

uInit: function(opts) {
  AppsEdit.uInitScroll();
  extend(cur, {
    opts: opts,
    searchInp: ge('apps_edit_search_inp'),
    index: {},
    cache: {},

    lang: extend(cur.lang || {}, opts.lang)
  });
  var prop = [], dirs = ['Top', 'Bottom', 'Left', 'Right'];
  for (var i = 0; i < 4; ++i) {
    prop.push('padding' + dirs[i]);
  }
  var styles = extend({
    margin: 0
  }, getStyle(cur.searchInp, prop));
  placeholderSetup(cur.searchInp, {back: true, pad: styles, phColor: '#929eb0'});
  elfocus(cur.searchInp);
  cur.destroy.push(function(c) {
    if (c == cur) AppsEdit.uDeinitScroll();
  });
  AppsEdit.uIndex(cur.opts.data);
},
uInitScroll: function() {
  AppsEdit.scrollnode = browser.msie6 ? pageNode : window;
  AppsEdit.uDeinitScroll();
  addEvent(AppsEdit.scrollnode, 'scroll', AppsEdit.uScroll);
  addEvent(window, 'resize', AppsEdit.uScroll);
},
uDeinitScroll: function() {
  removeEvent(AppsEdit.scrollnode, 'scroll', AppsEdit.uScroll);
  removeEvent(window, 'resize', AppsEdit.uScroll);
},
uScroll: function() {
  if (browser.mobile) return;

  var docEl = document.documentElement;
  var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
  var st = scrollGetY(), lnk = ge('apps_edit_users_more');

  if (!isVisible(lnk)) return;
  if (st + ch > lnk.offsetTop) {
    lnk.onclick();
  }
},
uIndex: function(res, noRefresh) {
  cur.opts.data = res;
  cur.cache = {all: []};
  for (var i = 0, count = res.length; i < count; ++i) {
    cur.cache.all.push(i);
  }
  cur.index = new vkIndexer(cur.cache.all, function(obj) {
    return cur.opts.data[obj][2];
  }, noRefresh ? function(){} : AppsEdit.uSearchUpdate);
},
uResetSearch: function() {
  val(cur.searchInp, '');
  elfocus(cur.searchInp);
  AppsEdit.uSearchUpdate();
},
uSearch: function() {
  var q = trim(val(cur.searchInp));

  if (q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
    return AppsEdit.uEditAdmin(AppsEdit.uGetAddr(q));
  }
},
uGetAddr: function(lnk) {
  var m = lnk.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/(.+)$/), result = m[4].substr(m[4].indexOf('#') + 1).replace(/^[\/\!]*/, '');
  if (m = result.match(/^profile\.php\?id=(\d+)/)) {
    result = intval(m[1]);
  } else {
    if (result.indexOf('?') !== -1) result = result.substr(0, result.indexOf('?'));
    if (m = result.match(/^id(\d+)/)) {
      result = intval(m[1]);
    }
  }
  return result;
},
uSearchUpdate: function() {
  if ((cur.searchInp || {}).id != 'apps_edit_search_inp') return;

  var q = trim(val(cur.searchInp));
  toggle('apps_edit_reset_search', !!q);

  AppsEdit.uShowMore(true);
},
uAddUpdate: function(el) {
  var q = trim(val(el));
  if (!q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) || q === cur.lastUserQ) {
    return false;
  }
  cur.lastUserQ = q;

  var addr = AppsEdit.uGetAddr(q);
  clearTimeout(cur.addAdminTO);
  cur.addAdminTO = setTimeout((function() {
    ajax.post('/al_apps_edit.php', {act: 'edit_admin_box', id: cur.opts.aid, addr: addr}, {
      showProgress: function() {
        el && addClass(domPN(el), 'loading');
      },
      hideProgress: function() {
        el && removeClass(domPN(el), 'loading');
      },
      onFail: function(err) {
        var content = ge('apps_edit_user_info');
        if (!content) return false;

        ge('apps_edit_add_user_error').innerHTML = err;
        show('apps_edit_add_user_error');
        hide(content);
        curBox().setOptions({hideButtons: true});
        return true;
      },
      onDone: function(title, html, js) {
        var content = ge('apps_edit_user_info');
        if (!content) return false;

        hide('apps_edit_add_user_error');
        content.innerHTML = html;
        show(content);
        var box = curBox();
        if (js) {
          eval(js);
        }
      }
    });
  }).bind(this), 500);
},
uUpdateSummary: function() {
  if (trim(val(cur.searchInp)) || !isVisible('apps_edit_summary')) return;

  if (cur.opts.all_count > 0) {
    val('apps_edit_summary', cur.opts.all_count);
  } else {
    hide('apps_edit_summary');
  }
},
uShowMore: function(force) {
  var d = cur.opts.data, q = trim(val(cur.searchInp)), highlight = false;
  if (!d) return;

  var lst = cur.cache.all, m;
  if (force) {
    AppsEdit.uUpdateSummary();
    if (cur.qShown === q) return;
    cur.qShown = q;
  }
  if (q) {
    if (q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
      var addr = AppsEdit.uGetAddr(q);
      lst = [];
      for (var i = 0, l = d.length; i < l; ++i) {
        if (d[i][0] == addr || d[i][1] == '/' + addr) {
          lst.push(i);
        }
      }
    } else {
      lst = cur.cache['_' + q];
      if (lst === undefined) {
        var tmp = cur.index.search(q), mp = {};
        lst = [];
        for (var i = 0, l = tmp.length; i < l; ++i) {
          if (!mp[tmp[i]]) {
            mp[tmp[i]] = true;
            lst.push(tmp[i]);
          }
        }
        lst.sort(function(a,b){return a-b;});
        cur.cache['_' + q] = lst;
      }
      highlight = AppsEdit.uGetHighlight(q);
    }
  }

  var len = lst.length, cont = ge('apps_edit_users_rows'), more = ge('apps_edit_users_more');
  if (!len) {
    hide(more, 'apps_edit_summary');
    val(cont, AppsEdit.uGenEmpty(getLang('apps_no_admin_found')));
    return;
  }

  var start = force ? 0 : cont.childNodes.length, end = Math.min(len, start + 20), html = [];
  for (var i = start; i < end; ++i) {
    var row = d[lst[i]], name = (row || {})[2];
    if (!row) continue;
    if (highlight) {
      name = name.replace(highlight.re, highlight.val);
    }
    html.push(AppsEdit.uGenRow(row, name));
  }

  if (force) {
    val(cont, html.join(''));
    show('apps_edit_summary');
    if (q) {
      val('apps_edit_summary', len);
    } else {
      AppsEdit.uUpdateSummary();
    }
  } else {
    cont.innerHTML += html.join('');
  }
  toggle(more, end < len);
},
uGetHighlight: function(q) {
  var indxr = cur.index, delimiter = indxr.delimiter, trimmer = indxr.trimmer;

  q += ' ' + (parseLatin(q) || '');
  q = escapeRE(q).replace(/&/g, '&amp;');
  q = q.replace(trimmer, '').replace(delimiter, '|');
  return {
    re: new RegExp('(' + q + ')', 'gi'),
    val: '<span class="apps_edit_user_highlight">$1</span>'
  }
},
uGenEmpty: function(text) {
  return '<div class="apps_edit_users_none">' + text + '</div>';
},
uGenRow: function(row, name) {
  var oid = row[0], href = row[1], photo = row[3], sex = row[4], level = row[5],
      info = cur.opts.levels[level] || '', actions = '', nm = name || row[2], q = cur.qShown;
  if (!name && q && !q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
    highlight = AppsEdit.uGetHighlight(q);
    nm = nm.replace(highlight.re, highlight.val);
  }

  if (cur.opts.main_admin && cur.mainAdminChanging) {
    if (level != 3) {
      actions += '<a class="apps_edit_user_action" onclick="AppsEdit.uChangeMainAdmin(' + oid + ')">' + getLang('apps_main_admin_promote') + '</a>';
    } else {
      actions = '<a class="apps_edit_user_action" onclick="AppsEdit.uMainAdmin(true)">' + getLang('apps_main_admin_change_cancel') + '</a>';
    }
  } else {
    if (level == 0) {
      actions = '<a class="apps_edit_user_action" onclick="AppsEdit.uEditAdmin(' + oid + ')">' + getLang('apps_add_admin') + '</a>';
    } else if (level != 3) {
      actions += '<a class="apps_edit_user_action" onclick="AppsEdit.uEditAdmin(' + oid + ')">' + getLang('Edit') + '</a>';
      actions += ' | <a class="apps_edit_user_action" onclick="AppsEdit.uRemoveAdmin(' + oid + ')">' + getLang('apps_edit_admin_demote') + '</a>';
    } else if (cur.opts.main_admin && cur.opts.all_count > 1) {
      actions = '<a class="apps_edit_user_action" onclick="AppsEdit.uMainAdmin()">' + getLang('apps_main_admin_change') + '</a>';
    }
  }

  return rs(cur.opts.template, {
    oid: oid,
    name: nm,
    photo: photo,
    href: href,
    level: info,
    actions: actions
  });
},
uShowMessage: function(txt) {
  showDoneBox(txt);
  return true;
},
uEditAdmin: function(user) {
  showBox('al_apps_edit.php', {act: 'edit_admin_box', id: cur.opts.aid, addr: user}, {
    onFail: AppsEdit.uShowMessage,
    params: {
      bodyStyle: 'padding: 20px; line-height: 160%;',
      width: 450,
      dark: 1
  }});
},
uAddAdmin: function() {
  showBox('al_apps_edit.php', {act: 'add_admin_box', id: cur.opts.aid}, {
    onFail: AppsEdit.uShowMessage,
    params: {
      bodyStyle: 'padding: 0px; line-height: 160%;',
      hideButtons: true,
      width: 450,
      dark: 1
  }});
},
uRemoveAdmin: function(user) {
  var box = curBox();
  if (box) { box.hide(); }
  showBox('al_apps_edit.php', {act: 'edit_admin_box', id: cur.opts.aid, addr: user, remove: 1}, {
    onFail: AppsEdit.uShowMessage,
    params: {
      bodyStyle: 'padding: 20px; line-height: 160%;',
      width: 450,
      dark: 1
  }});
  return false;
},
uSelAdminLevel: function(el, index, name) {
  radiobtn(el, index, name);
  var desc = ge('apps_admin_partial_level_desc').innerHTML.replace(/^\s+|[\s:]+$/g, '');
  if (index) {
    hide('apps_edit_admin_rights');
    val('apps_admin_partial_level_desc', desc);
  } else {
    show('apps_edit_admin_rights');
    val('apps_admin_partial_level_desc', desc + ':');
  }
},
uSaveAdmin: function(mid, hash) {
  var params = {
    act: 'save_admin',
    id: cur.opts.aid,
    mid: mid,
    hash: hash,
    level: radioval('admins_level'),
    rights: []
  };
  each(geByClass('checkbox', ge('apps_edit_admin_rights')), function (i, el) {
    if (isChecked(el)) {
      params.rights.push(el.getAttribute('id').replace(/^apps_admin_right_/, ''));
    }
  });
  if (!params.rights.length) {
    return;
  }
  ajax.post('al_apps_edit.php', params, {
    onDone: function(msg, row) {
      curBox().hide();
      if (msg) AppsEdit.uShowMessage(msg);

      if (!row) return;

      var d = cur.opts.data, found = false, j, k, l, el;
      if (isArray(d)) {
        for (j = 0, l = d.length; j < l; ++j) {
          if (d[j][0] == mid) {
            found = true;
            if (d[j][5] == 0) {
              ++cur.opts.all_count;
            }
            cur.opts.data[j] = row;
            break;
          }
        }
      }
      if (!found) {
        cur.opts.data.unshift(row);
        ++cur.opts.all_count;
        val(cur.searchInp, '');
        delete cur.qShown;
        AppsEdit.uIndex(cur.opts.data);
      } else {
        delete cur.qShown;
        AppsEdit.uSearchUpdate();
      }
      AppsEdit.uUpdateSummary();
    },
    showProgress: curBox().showProgress,
    hideProgress: curBox().hideProgress
  });
},
uDoRemoveAdmin: function(mid, hash) {
  var params = {
    act: 'delete_admin',
    id: cur.opts.aid,
    mid: mid,
    hash: hash
  };
  ajax.post('al_apps_edit.php', params, {
    onDone: function(msg, row) {
      curBox().hide();
      if (msg) AppsEdit.uShowMessage(msg);

      if (!row) return;

      var d = cur.opts.data, j, k, l, el;
      if (isArray(d)) {
        for (j = 0, l = d.length; j < l; ++j) {
          if (d[j][0] == mid) {
            cur.opts.data[j] = row;
            --cur.opts.all_count;
            delete cur.qShown;
            AppsEdit.uSearchUpdate();
            break;
          }
        }
      }
    },
    showProgress: curBox().showProgress,
    hideProgress: curBox().hideProgress
  });
},
uMainAdmin: function(cancel) {
  if (!cancel) {
    if (cur.mainAdminChanging) return;
    cur.mainAdminChanging = true;
  } else {
    if (!cur.mainAdminChanging) return;
    cur.mainAdminChanging = false;
  }
  delete cur.qShown;
  AppsEdit.uSearchUpdate();
},
uChangeMainAdmin: function(mid) {
  if (!cur.mainAdminChanging) return;
  showBox('al_apps_edit.php', {act: 'change_main_admin_box', id: cur.opts.aid, mid: mid}, {cache: 1, params: {width: '400px', bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1},
    onFail: function(msg) {
      AppsEdit.uShowMessage(msg);
      return true;
    }
  });
  return false;
},
uDoChangeMainAdmin: function(mid, hash) {
  var params = {
    act: 'change_main_admin',
    id: cur.opts.aid,
    mid: mid,
    hash: hash
  };
  ajax.post('al_apps_edit.php', params, {
    onDone: function(msg, isMainAdmin) {
      curBox().hide();
      if (msg) AppsEdit.uShowMessage(msg);
      cur.mainAdminChanging = false;
      cur.opts.main_admin = isMainAdmin;

      var d = cur.opts.data, j, k, l;
      if (isArray(d)) {
        for (j = 0, l = d.length; j < l; ++j) {
          if (d[j][0] == mid) {
            cur.opts.data[j][5] = 3;
          } else if (cur.opts.data[j][5] == 3) {
            cur.opts.data[j][5] = 2;
          }
        }
        delete cur.qShown;
        AppsEdit.uSearchUpdate();
      }
    },
    onFail: function(msg) {
      curBox().hide();
      AppsEdit.uShowMessage(msg);
      return true;
    },
    showProgress: curBox().showProgress,
    hideProgress: curBox().hideProgress
  });
},

initFunctionsClone: function (managedApps) {
  if (managedApps) {
    this.funcsCloneChoser = new Dropdown(ge('apps_edit_clone_funcs_app_choser'), managedApps, {
      width: 230,
      big: 1,
      multiselect: false,
      noResult: ''
    });
  }
},

cloneStoredFuncs: function (hash) {
  var cloneButton = ge('apps_edit_clone_button');
  var self = this;

  var box = showFastBox({title: getLang('apps_clone_stored_funcs_confirm_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('apps_clone_stored_funcs_confirm_text'), getLang('apps_clone_stored_funcs_confirm_button'), function() {
    box.hide();
    lockButton(cloneButton);

    ajax.post('al_apps_edit.php', { act: 'clone_funcs', from_aid: cur.aid, to_aid: self.funcsCloneChoser.val(), hash: hash }, {
      onDone: function () {
        unlockButton(cloneButton);
      }
    });
  }, "Close", function () {
    box.hide();
  });
},


loadStatApiData: function(method, stat_interval) {
  if (cur.api_stat_interval == stat_interval && cur.api_stat_filter_method == method) {
    return false;
  }
  ajax.post('editapp', {act: 'stats_api_data', id: cur.aid, method: method, stat_interval: stat_interval, hash: cur.statsApiHash}, {
    cache: 1,
    onDone: function(content, script) {
      ge('apps_edit_stats_api').innerHTML = content;
      cur.api_stat_interval = stat_interval;
      cur.api_stat_filter_method = method;
      if (script) eval(script);

      if (stat_interval  != '2days' || method != '') {
        var newLocVars = {};
        if (method != '') {
          newLocVars['method'] = method;
        }
        if (stat_interval != '2days') {
          newLocVars['stat_interval'] = stat_interval;
        }
        nav.setLoc(extend(nav.objLoc, {method: method, stat_interval: stat_interval}));
      }
    },
    onFail: AppsEdit.showError,
    showProgress: function() {
      cur.api_stat_interval = stat_interval;
      removeClass(ge("api_interval_selector_2days"), 'selected');
      removeClass(ge("api_interval_selector_week"), 'selected');
      removeClass(ge("api_interval_selector_month"), 'selected');
      addClass(ge("api_interval_selector_" + cur.api_stat_interval), 'selected');

      show(ge('apps_edit_api_prg'));
    },
    hideProgress: function() {
      hide(ge('apps_edit_api_prg'));
    }
  });
},

changeStatBlockPeriod: function(period) {
  if (!cur.stat_main_block_period) {
    cur.stat_main_block_period = 'yesterday';
  }
  if (cur.stat_main_block_period == period) {
    return;
  }
  cur.stat_main_block_period = period;
  if (period == 'yesterday') {
    removeClass(ge("app_stat_main_blocks_selector_month"), 'selected');
    addClass(ge("app_stat_main_blocks_selector_yesterday"), 'selected');
  } else {
    removeClass(ge("app_stat_main_blocks_selector_yesterday"), 'selected');
    addClass(ge("app_stat_main_blocks_selector_month"), 'selected');
  }
  toggle(ge('app_stat_main_block1_day'));
  toggle(ge('app_stat_main_block2_day'));
  toggle(ge('app_stat_main_block3_day'));
  toggle(ge('app_stat_main_block1_subtitle_day'));
  toggle(ge('app_stat_main_block1_month'));
  toggle(ge('app_stat_main_block2_month'));
  toggle(ge('app_stat_main_block3_month'));
  toggle(ge('app_stat_main_block1_subtitle_month'));
},

choosePromoVideo: function(hash) {
  var box = showBox('al_video.php', {
    act: 'a_choose_video_box',
    from: 'app_edit',
    app_id: cur.aid
  }, {
    stat: ['page.css', 'page.js'],
    cache: 1
  });

  cur.chooseMedia = function(type, media, data) {
    ajax.post('al_apps.php', {
      act: 'a_save_promo_video',
      aid: cur.aid,
      hash: hash,
      video_id: media
    }, {
      onDone: function(err) {
        if (err) {
          showFastBox({title: 'not applicable', dark: 1}, err);
          setTimeout(function() {
            ge('box_layer_wrap').scrollTop = 0;
          });
        } else {
          box.hide();
          var thumbUrl = data.editable && data.editable.sizes && data.editable.sizes.l ? data.editable.sizes.l[0] : data.thumb;
          var thumbEl = geByClass1('apps_edit_video_thumb');

          cur.appPromoVideoId = media;

          setStyle(thumbEl, 'background-image', 'url(\'' + thumbUrl + '\')');
          show(thumbEl);
        }
      }
    });
    return false;
  }
},

removeSelectedPromoVideo: function(hash, event) {
  cur.appPromoVideoId = false;
  hide(geByClass1('apps_edit_video_thumb'));

  ajax.post('al_apps.php', {
    act: 'a_save_promo_video',
    aid: cur.aid,
    hash: hash
  });

  cancelEvent(event);

  return false;
},

_eof: 1};try{stManager.done('apps_edit.js');}catch(e){}
