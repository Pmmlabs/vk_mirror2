Tasks = {
address: "tasks",

switchTab: function(el, evt) {
  if (evt.button || evt.ctrlKey || browser.mac && evt.metaKey) return true;
  show('tasks_loading');
  if (hasClass(el.parentNode, 'task_tab')) {
    each(geByClass('task_tab_active', ge('tasks_tabs')), function(i, v) {
      removeClass(v, 'task_tab_active');
      addClass(v, 'task_tab');
    });
    removeClass(el.parentNode, 'task_tab');
    addClass(el.parentNode, 'task_tab_active');
  } else if (hasClass(el.firstChild, 'tasks_section_filter')) {
    each(geByClass('tasks_section_filter', ge('tasks_section_filters')), function(i, v) {
      removeClass(v, 'selected');
    });
    addClass(el.firstChild, 'selected');
  }
  return nav.go(el, evt);
},

scrollCheck: function () {
  if (browser.mobile || cur.disableAutoMore || cur.loadingFeed) return;
  var more = ge('show_more_link');
  if (!more) return;

  var docEl = document.documentElement;
  var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
  var st = window.pageYOffset || pageNode.scrollTop || docEl.scrollTop;

  if (st + ch + 400 > more.offsetTop) {
    Tasks.showMore();
  }
},

getPage: function(offset) {
  show('pages_loading_top');
  show('pages_loading_bottom');
  var _n = nav.objLoc, act = (cur.act == 'viewbug') ? 'get_comments' : cur.act;
  ajax.post(this.address, {act: act, offset: offset, q: cur.q, bid: (cur.bug_id ? cur.bug_id : _n.bid), section: _n.section, type: _n.type, sent: _n.sent, opened: _n.opened, priority: _n.priority, id: _n.id, load: 1}, {
    cache: 1,
    onDone: function(content, script) {
      if (cur.act == 'viewbug') {
        ge('task_comments').innerHTML = content;
      } else {
        ge('tasks_content').innerHTML = content;
      }
      if (window.tooltips) tooltips.hideAll();
      if (script) eval(script);
      if (offset || cur.act == 'viewbug') {
        nav.setLoc(extend(nav.objLoc, {offset: offset}));
      } else {
        delete nav.objLoc.offset;
        nav.setLoc(nav.objLoc);
      }
    },
    onFail: function() {
      hide('pages_loading_top');
      hide('pages_loading_bottom');
    }
  });
  return false;
},

search: function() {
  var q = ge('search').value;
  if (q) {
    newLoc = {0: nav.objLoc[0], act: (cur.act == 'comments' ? cur.act : 'bugs'), q: q};
  } else {
    newLoc = {0: nav.objLoc[0], act: cur.act};
  }
  nav.go(newLoc);
},

saveRedmineKey: function() {
  var key = ge('redmine_key').value;
  ajax.post(Tasks.address, {act: 'save_redmine_key', key: key}, {
    onDone: function(result) {
      var el = se('<div class="' + (result ? 'ok_msg' : 'error') + '" style="text-align:center">' + (result ? getLang('global_done') : getLang('global_error')) + '</div>');
      var next = domNS(ge('redmine_key'));
      if (next) {
        domPN(ge('redmine_key')).insertBefore(el, next);
      } else {
        domPN(ge('redmine_key')).appendChild(el);
      }
      setTimeout(function() {
        slideUp(el);
      }, 2000);
    }
  });
},

addTask: function() {
  return !showBox(this.address, {act: 'edit'}, { params: {width: '520px', dark: 1, bodyStyle: 'padding: 20px;'} });
},

editTask: function(bid) {
  return !showBox(this.address, {act: 'edit', bid: bid}, { params: {width: '520px', dark: 1, bodyStyle: 'padding: 20px;'} });
},

saveTask: function(bid, hash) {
  if(!ge('title').value){
    notaBene('title');
    return;
  }
  if(!ge('desc').value){
    notaBene('desc');
    return;
  }
  if(!cur.sectionEditFilter.val()){
    notaBene(cur.sectionEditFilter.selector);
    notaBene(cur.sectionEditFilter.input);
    return;
  }
  var privacy = Privacy.getValue('privacy');
  var pr_data = privacy.split('_');
  var pr_type = intval(pr_data[0]);
  var new_privacy = 0;
  if (pr_type) {
    var pr_cats = pr_data[1].split(',');
    for (var i in pr_cats) {
      new_privacy += 1 << (intval(pr_cats[i]) - 1);
    }
  } else {
    for (var i in cur.privacy.privacy_lists) {
      new_privacy += 1 << (intval(i) - 1);
    }
  }
  var limit_type = intval(cur.deadlineEditFilter.val()),
      task_type = radioBtns.new_task_type.val;
  var query = {
    act: 'save',
    bid: bid,
    type: task_type,
    title: ge('title').value,
    desc: ge('desc').value,
    browser: isVisible('browser') ? ge('browser').value : '',
    priority: cur.priorityEditFilter.val(),
    privacy: new_privacy,
    developer: cur.developerEditFilter.val(),
    author_id: cur.editAuthorId,
    limit_type: limit_type,
    sections: cur.sectionEditFilter.val(),
    hash: hash
  }
  if (limit_type == -1) {
    query.limit_date = ge('custom_date').value;
  }
  if (!bid) {
    query.send_sms = intval(cur.sendSMSFilter.checked());
  }
  if (!bid) {
    ajax.post(Tasks.address, query, {
      onDone: function(text, script) {
        curBox().content(text);
        if (script) eval(script);
      }
    });
  } else {
    ajax.post(Tasks.address, query, {
      onDone: function(summary, actions, content, comments, images) {
        ge('task_summary').innerHTML = summary;
        ge('task_content').innerHTML = content;
        ge('task_actions').innerHTML = actions;
        ge('task_images').innerHTML = images;
        ge('task_comments').innerHTML = comments;
        curBox().hide();
      }
    });
  }
},

deleteTask: function(bid, hash) {
  var box = showFastBox({title: cur.lang['delete_title'], width: 440, dark: 1, bodyStyle: 'padding: 20px; line-height: 20px;', onHide: function() { if (cur.deleted) nav.go(Tasks.address);}}, cur.lang['delete_confirm'], cur.lang['delete'], function() {
    ajax.post(Tasks.address, {act: 'delete', bid: bid, hash: hash}, {
      onDone: function(text) {
        cur.deleted = true;
        box.content(text);
        box.removeButtons();
        box.addButton(global_close, box.hide, 'yes');
        setTimeout(function() {
          box.hide();
        }, 3000);
      }
    });
  }, global_cancel);
},

editPriority: function(bid, hash) {
  var box = showFastBox({title: getLang('tasks_increase_priority'), width: 430, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('tasks_sure_increase_priority'), getLang('tasks_increase'), function(btn) {
    ajax.post(Tasks.address, {act: 'edit_priority', bid: bid, hash: hash}, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onDone: function(summary, actions) {
        ge('task_summary').innerHTML = summary;
        ge('task_actions').innerHTML = actions;
        curBox().hide();
      }
    });
  }, global_cancel);
},

preview: function(el, hash) {
  var pr = ge('preview');
  pr.innerHTML = "";
  if (isVisible(pr)) {
    hide(pr);
  } else {
    lockButton(el);
    ajax.post(this.address, { act: 'preview', hash: hash, text: ge('desc').value }, {
      onDone: function(text) {
        unlockButton(el);
        pr.innerHTML = text;
        show(pr);
      }
    });
  }
},

addComment: function(hash) {
  show('tasks_loading');
  var comment = ge('task_reply_field').value;
  if (!comment) return;
  ajax.post(this.address, {act: 'add_comment', bid: cur.bug_id, from: cur.act, text: comment, reply_to: cur.replyTo, hash: hash}, {
    onDone: function(comments) {
      ge('task_comments').innerHTML = comments;
      ge('task_reply_field').value = '';
      delete cur.replyTo;
      ge('task_reply_field').blur();
      autosizeSetup(ge('task_reply_field'), {minHeight: 70, maxHeight: 500});
      ge('answer_to').innerHTML = '';
      hide('tasks_loading');
    }
  });
},

replyViewComment: function(uid, name)  {
  ge('answer_to').innerHTML = '<a onclick="return Tasks.cancelReplyComment();">'+name+'</a>';
  cur.replyTo = uid;
  return false;
},

cancelReplyComment: function() {
  delete cur.replyTo;
  ge('answer_to').innerHTML = '';
  return false;
},

editComment: function(cid, hash) {
  if (cur.editing) {
    this.cancelEditComment(cur.editing);
  }
  if (!cur.comments) cur.comments = {};
  var cont = geByClass1('tasks_comm_text', ge('comment'+cid));
  cur.comments[cid] = cont.innerHTML;
  var comment = ge('comment' + cid);
  ajax.post(Tasks.address, {act: 'get_comment', cid: cid, hash: hash}, {
    onDone: function(t) {
      cont.innerHTML = '<textarea class="tasks_edit_comment" id="comment'+cid+'edit" onkeydown="Tasks.saveComment(event, '+cid+', \''+hash+'\')">'+t+'</textarea>\
       <div style="margin: 5px 0 0 -2px; height: 23px">\
         <div class="fl_l button_blue">\
          <button id="save_but'+cid+'" onclick="Tasks.doSaveComment('+cid+', \''+hash+'\')">'+cur.lang.save+'</button>\
         </div>\
         <div class="fl_l button_gray" style="margin-left: 6px;">\
          <button id="cancel_but'+cid+'" onclick="Tasks.cancelEditComment('+cid+')">'+cur.lang.cancel+'</button>\
         </div>\
         <div id="editCommentProgress'+cid+'" style="margin: 5px 0px 0px 10px; vertical-align: 0px; float: left; display: none"><img src="/images/upload.gif"/></div>\
       </div>';
      ge('comment'+cid+'edit').focus();
      hide(geByClass1('date', ge('comment'+cid)));
      autosizeSetup(ge('comment'+cid+'edit'), {minHeight: 30});
      cur.editing = cid;
    }
  });
  return false;
},

saveComment: function(event, cid, hash) {
  if (event && event.keyCode == 27) {
    Tasks.cancelEditComment(cur.editing);
    return;
  }
  if (event && event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) this.doSaveComment(cid, hash);
},

cancelEditComment: function(cid) {
  geByClass1('tasks_comm_text', ge('comment'+cid)).innerHTML = cur.comments[cid];
  show(geByClass1('date', ge('comment'+cid)));
  delete cur.editing;
  delete cur.comments[cid];
},

doSaveComment: function(cid, hash) {
  var val = ge('comment'+cid+'edit').value;
  if (!val) {
    ge('comment'+cid+'edit').focus();
    return;
  }
  ajax.post(Tasks.address, {act: 'edit_comment', bid: cur.bug_id, cid: cid, comment: val, hash: hash}, {
    onDone: function(text) {
      var cont = geByClass1('tasks_comm_text', ge('comment'+cid))
      cont.innerHTML = text;
      show(geByClass1('date', ge('comment'+cid)));
      delete cur.editing;
      delete cur.comments[cid];
    },
    showProgress: lockButton.pbind(ge('save_but'+cid)),
    hideProgress: unlockButton.pbind(ge('save_but'+cid)),
  });
},

deleteComment: function(bid, cid, hash) {
  show('tasks_loading');
  ajax.post(Tasks.address, {act: 'delete_comment', bid: bid, cid: cid, from: cur.act, hash: hash}, {
    onDone: function(res) {
      var cont = (cur.act == 'viewbug') ? ge('comment'+cid).firstChild : ge('comment'+bid+'_'+cid).firstChild;
      if (cont) {
        if (!cur.deletedComments) cur.deletedComments = [];
        cur.deletedComments[cid] = cont.innerHTML;
        cont.innerHTML = res;
      }
      hide('tasks_loading');
    }
  });
  return false;
},

restoreComment: function(bid, cid, hash) {
  show('tasks_loading');
  ajax.post(Tasks.address, {act: 'restore_comment', bid: bid, cid: cid, hash: hash}, {
    onDone: function(res) {
      var cont = (cur.act == 'viewbug') ? ge('comment'+cid).firstChild : ge('comment'+bid+'_'+cid).firstChild;
      if (cont) cont.innerHTML = cur.deletedComments[cid];
      hide('tasks_loading');
    }
  });
  return false;
},

viewComments: function(bid, fresh, hash){
  if (!cur.bugComments) cur.bugComments = {};
  if (cur.bugComments[bid] != fresh) {
    if (ge('tph_text'+bid)) {
      show('tph_prg'+bid);
      hide('tph_text'+bid);
    } else {
      ge('com_links'+bid).innerHTML = "";
      show('load_comm'+bid);
    }
    ajax.post(Tasks.address, {act: 'load_comments', bid: bid, fresh: fresh, from: cur.act, hash: hash}, {
      onDone: function(comments, links) {
        var cont = ge('comments'+bid);
        if (!cont) {
          var t = ce('div', {id: 'comments'+bid, className: 'tasks_comments_row'});
          ge('bug'+bid).parentNode.insertBefore(t, ge('bug'+bid).nextSibling);
          cont = ge('comments'+bid);
        }
        cont.innerHTML = comments;
        ge('com_links'+bid).innerHTML = links;
        var el = ge('reply_field' + bid);
        placeholderSetup(el);
        autosizeSetup(el, {minHeight: 30});
        el.show = true;
        setTimeout(Tasks.hideReplyBox.pbind(bid), 0);
        hide('load_comm'+bid);
        hide('com_links'+bid);
        show('com_hide'+bid);
        if (!isVisible(cont)) slideToggle(cont, 200);
      }
    });
  } else {
    cont = ge('comments'+bid);
    slideToggle(cont, 200, function(){
      hide('com_links'+bid);
      show('com_hide'+bid);
    });
  }
  cur.bugComments[bid] = fresh;
  return false;
},

hideComments: function(bid) {
  cont = ge('comments'+bid);
  if (isVisible(cont)) slideToggle(cont, 200, function() {
    hide('com_hide'+bid);
    show('com_links'+bid);
  });
  return false;
},

replyComment: function(id) {
  if (cur.act == 'comments' || cur.act == 'feed') {
    var comm_box = ge('reply_comments'+id);
    var comm_field = ge('reply_field'+id);
    slideToggle(comm_box, 200, function() {
      if (isVisible(comm_box)) comm_field.focus();
    });
  }
},

addReplyComment: function(bid, to, hash) {
  var comment = ge('reply_field' + bid).value;
  if (!comment) return false;
  if (!cur.commentSent) {
    cur.commentSent = true;
    lockButton(ge('send'+bid));
    ajax.post(Tasks.address, {act: 'add_comment', bid: bid, text: comment, reply_to: to, from: cur.act, hash: hash}, {
      onDone:function(res, links) {
        delete cur.commentSent;
        unlockButton(ge('send'+bid));
        if (cur.act == 'feed' || cur.act == 'comments') {
          ge('comment'+bid).innerHTML += res;
          addClass(ge('comment'+bid), 'answered');
          re('reply'+bid);
          hide(geByClass1('tasks_comm_actions', ge('comment'+bid)));
        } else {
          ge('comments_cont'+bid).innerHTML += res;
          ge('com_links'+bid).innerHTML = links;
          ge('reply_field'+bid).value = "";
          ge('reply_field'+bid).blur();
          Tasks.hideReplyBox(bid);
        }
      }
    });
  }
},

showReplyBox: function(full_id) {
  full_id = full_id || '';
  var el = ge('reply_field' + full_id);
  if (cur.focused && cur.focused != full_id) {
    Tasks.hideReplyBox(cur.focused);
  }
  if (!el.show) {
    if (full_id) {
      show('post_submit' + full_id);
    }
    if (el.autosize) {
      el.autosize.update();
    }
    el.show = true;
    cur.focused = full_id;
  }
  return false;
},

hideReplyBox: function(full_id) {
  if (browser.opera && browser.mobile) return;
  full_id = full_id || '';
  var el = ge('reply_field' + full_id);
  if (el && el.show) {
    if (full_id) {
      hide('post_submit' + full_id);
    }
    if (ge('reply_to_name')) ge('reply_to_name').innerHTML = '';
    setStyle(el, {height: 14});
    el.show = false;
    delete cur.focused;
  }
  return true;
},

setupReply: function() {
  each(geByClass('tasks_reply_msg'), function(i,v) {
    placeholderSetup(v);
    autosizeSetup(v, {minHeight: 30});
  });
},

_animDelX: function(el, opacity, set_active) {
  if (!el) return;
  if (set_active !== undefined) {
    el.active = set_active;
  } else if (el.active) {
    return;
  }
  animate(el, {opacity: opacity}, 200);
},

rowActive: function(el, tt) {
  this._animDelX(el, 1, 1);
  if (tt) showTooltip(el, {text: tt, showdt: 200});
},
rowInactive: function(el) {
  this._animDelX(el, 0.5, 0);
},

checkFilter: function(option) {
  var filter_row = ge('filter_' + option), typeMask = cur.typeMask, value = cur.feedTypes[option];
  if (typeMask & (1 << value)) {
    typeMask &= ~(1 << value);
    removeClass(filter_row, 'checked');
  } else {
    typeMask |= (1 << value);
    addClass(filter_row, 'checked');
  }
  cur.typeMask = typeMask;
  setCookie('remixtasks_feed_filter', typeMask, 100);
  Tasks.filterFeed();
},

setFilter: function(option) {
  var cont = ge('right_column'), filter_row = ge('filter_' + option), noChecked = true, typeMask = cur.typeMask, value = cur.feedTypes[option];
  each (geByClass('checked', cont, 'div'), function () {
    if (this != filter_row) return (noChecked = false);
  });
  if (noChecked) {
    each([].slice.apply(geByClass('tasks_feed_filter', cont, 'div')), function () {
      if (hasClass(this, 'checked')) return;
      addClass(this, 'checked');
      typeMask |= (1 << cur.feedTypes[this.id.substr(7)]);
    });
  } else {
    each([].slice.apply(geByClass('checked', cont, 'div')), function () {
      removeClass(this, 'checked');
      typeMask &= ~(1 << cur.feedTypes[this.id.substr(7)]);
    });
    addClass(ge('filter_' + option), 'checked');
    typeMask |= (1 << value);
  }
  cur.typeMask = typeMask;
  setCookie('remixtasks_feed_filter', typeMask, 100);
  Tasks.filterFeed();
},

filterFeed: function() {
  ge('feed_wrap').style.opacity = 0.5;
  ajax.post(Tasks.address, {act: 'feed', load: 1, id: cur.id}, {
    onDone: function(text, extra) {
      if (extra) extend(cur, extra);
      ge('tasks_content').innerHTML = text;
      if (window.tooltips) tooltips.hideAll();
      Tasks.setupReply();
      if (cur.id) {
        nav.setLoc(extend(nav.objLoc, {id: cur.id}));
      } else {
        delete nav.objLoc.id;
        nav.setLoc(nav.objLoc);
      }
    }
  });
},

showMore: function() {
  hide('show_more');
  show('show_more_progress');
  cur.loadingFeed = true;
  ajax.post(Tasks.address, {act: 'feed', from: cur.from, offset: cur.offset, id: cur.id, more: 1}, {
    onDone: function(text, show_more, obj) {
      delete cur.loadingFeed;
      show('show_more');
      hide('show_more_progress');
      ge('feed').innerHTML += text;
      ge('show_more_box').innerHTML = show_more;
      if (obj) extend(cur, obj);
      Tasks.setupReply();
    },
    onFail: function() {
      delete cur.loadingFeed;
      show('show_more');
      hide('show_more_progress');
    }
  });

  return false;
},

showPhoto: function(url, photo_id) {
  var pic = vkImage();
  pic.src = url;
  var onload = function() {
    showFastBox({bodyStyle: "line-height: 0px;", width: Math.min(pic.width, 1024) + 30, dark: 1}, '<img class="tasks_preview_img" src="' + url + '" />');
    hide('tasks_loading');
    removeEvent(pic, 'load');
  };

  if (!pic.width) {
    show('tasks_loading');
    addEvent(pic, 'load', onload);
  } else {
    onload();
  }
  return false;
},

subscribe: function(bid, subscribe, hash) {
  show('tasks_loading');
  var full_id;
  if (bid.toString().indexOf("_") != -1) {
    full_id = bid;
    bid = bid.split("_");
    bid = parseInt(bid[0]);
  }
  ajax.post(Tasks.address, {act: 'subscribe', from: cur.act, subscribe: subscribe, bid: bid, full_id: full_id, hash: hash}, {
    onDone:function(res) {
      switch (cur.act) {
        case 'viewbug':
          ge('task_actions').innerHTML = res;
          break;
        case 'settings':
          ge('subscribe'+bid).innerHTML = res;
          break;
        case 'feed':
          cont = ge('comment'+full_id).firstChild;
          if (!subscribe) {
            if (window.tooltips) {
              tooltips.hide(ge('update_hide'+full_id))
            }
            if (!cur.unsubscribed) cur.unsubscribed = new Array();
            cur.unsubscribed[full_id] = cont.innerHTML;
            cont.innerHTML = res;
          } else {
            cont.innerHTML = cur.unsubscribed[full_id];
          }
          removeClass(cont, 'over');
          setStyle(ge('update_hide' + full_id), {opacity: 0.5});
          break;
      }
      hide('tasks_loading');
    }
  });
},

filterChanged: function(filter, value) {
  switch (cur.act) {
    case 'feed':
      if (filter == 'id') {
        cur.id = intval(value);
        if (cur.id) {
          hide('feed_filters_block');
        } else {
          show('feed_filters_block');
        }
        Tasks.filterFeed();
      }
      break;
    case 'settings':
      if (filter == 'section') {
        Tasks.filterSettings(cur.offset, value);
      }
    case 'my':
    case 'bugs':
    case 'features':
    case 'news':
    case 'support':
      Tasks.filterBugs(filter, value);
      break;
  }
  return false;
},

filterSettings: function(offset, value) {
  show('tasks_loading');
  ajax.post(Tasks.address, {act: cur.act, load: 1, section: value}, {
    onDone: function(text, script) {
      hide('tasks_loading');
      ge('tasks_content').innerHTML = text;
      if (window.tooltips) tooltips.hideAll();
      if (script) eval(script);
      Tasks.setupReply();
      if (value) {
        nav.setLoc(extend(nav.objLoc, {section: value}));
      } else {
        delete nav.objLoc.section;
        nav.setLoc(nav.objLoc);
      }
    }
  });
},

subscribeSections: function(hash, value) {
  ajax.post(Tasks.address, {act: 'subscribe_sections', sections: value, hash: hash});
},

filterBugs: function(filter, value) {
  show('tasks_loading');
  nav.objLoc[filter] = value;
  var _n = nav.objLoc;
  delete nav.objLoc.offset;
  ajax.post(this.address, {act: cur.act, q: _n.q, section: _n.section, type: _n.type, sent: _n.sent, opened: _n.opened, priority: _n.priority, id: _n.id, load: 1}, {
    onDone: function(content, script) {
      hide('tasks_loading');
      ge('tasks_content').innerHTML = content;
      if (window.tooltips) tooltips.hideAll();
      if (script) eval(script);
      nav.setLoc(nav.objLoc);
    }
  });
},

selectDev: function(el, val) {
  if (window.tooltips) {
    tooltips.hide(el.parentNode);
  }
  cur.idSelect.val(val, true);
  return false;
},

addScreenshotLink: function(id, evt) {
  var txtarea = ge('task_reply_field'),
      scrollPos = txtarea.scrollTop,
      strPos = 0,
      br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false ) ),
      text = ' [[screen'+id+']]\n';
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == "ff") strPos = txtarea.selectionStart;

  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    range.moveStart ('character', strPos);
    range.moveEnd ('character', 0);
    range.select();
  } else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
  var front = (txtarea.value).substring(0,strPos-text.length);
  var back = (txtarea.value).substring(strPos-text.length,txtarea.value.length);
  txtarea.value=front+text+back;
  txtarea.scrollTop = scrollPos;
  cancelEvent(evt);
},

addScreenshot: function() {
  showBox(this.address, {act: 'add_screenshot'}, {params: {width: '430px', bodyStyle: 'padding: 0px; position: relative;', dark: 1}});
},

uploadScreenshot: function(el) {
  hide('screenshot_error');
  ge('tasks_add_screen').submit();
  el.disabled = true;
  curBox().showProgress();
},

removeScreenshot: function(id, hash, evt) {
  var cont = ge('image'+id);
  animate(cont, {width: 0, opacity: 0}, 100, function() {
    re(cont);
    var images = geByClass('tasks_image_row', ge('task_images_wrap'));
    if (images.length == 0) {
      re('task_images_wrap');
    }
  });
  ajax.post(Tasks.address, {act: 'delete_screenshot', sc_id: id, bid: cur.bug_id, hash: hash});
  cancelEvent(evt);
},

toRedmine: function(hash, evt) {
  ajax.post(Tasks.address, {act: 'to_redmine', bid: cur.bug_id, hash: hash}, {
    onDone: function() {
      hide('to_redmine');
    }
  });
},

changeTaskStatus: function(status, hash) {
  var doChangeStatus = function(status, hash, box) {
    show('tasks_loading');
    var query = {act: 'change_status', status: status, bid: cur.bug_id, hash: hash};
    if (cur.hideAutoanswer && ge('task_closed_autoanswer')) {
      query.no_autoanswer = cur.hideAutoanswer.val();
      query.answer_text = ge('task_closed_autoanswer').value;
    }
    ajax.post(Tasks.address, query, {
      onDone:function(summary, actions, comments) {
        if (box) box.hide();
        hide('tasks_loading');
        if (summary) ge('task_summary').innerHTML = summary;
        if (actions) ge('task_actions').innerHTML = actions;
        if (comments) ge('task_comments').innerHTML = comments;
      }
    });
  }
  var sendReq = function (hash, box, start) {
    if (cur.forceStop) return;
    var query = {act: 'add_auto_reply', status: status, bid: cur.bug_id, hash: hash, start: start||''};
    if (cur.hideAutoanswer && ge('task_closed_autoanswer')) {
      query.no_autoanswer = cur.hideAutoanswer.val();
      query.answer_text = ge('task_closed_autoanswer').value;
    }
    if (ge('task_closed_autoanswer_addressing_m')) {
      query.addressing_m = ge('task_closed_autoanswer_addressing_m').value;
    }
    if (ge('task_closed_autoanswer_addressing_f')) {
      query.addressing_f = ge('task_closed_autoanswer_addressing_f').value;
    }
    var attachs = [], chosen = cur.ticketsAutoMedia && cur.ticketsAutoMedia.chosenMedias;
    if (chosen) {
      for (var i in chosen) {
        var att = chosen[i], type = att[0], value = att[1];
        if (type == 'photo' || type == 'doc') {
          attachs.push(type+','+value);
        }
      }
    }
    if (attachs.length) query.attachs = attachs;
    ajax.post(Tasks.address, query, {
      onDone: function(finished, progressWidth, newStart) {
        animate(ge('task_status_progress'), {width: progressWidth}, 200);
        if (finished) {
          box.showProgress();
          doChangeStatus(status, hash, box);
          return;
        } else {
          setTimeout(sendReq.pbind(hash, box, newStart), 100);
        }
      }, onFail: function () {
        box.hideProgress();
        box.hide();
      }
    });
  }
  cur.forceStop = false;
  if (status == 1 && cur.binded_tickets && cur.binded_tickets.length) {
    var box = showFastBox({title: cur.lang['close_task'], width: 430, bodyStyle: "line-height: 160%;", dark: 1}, cur.lang['sure_close'], getLang('global_close'), function() {
        box.changed = true;
        show('tasks_status_progress_wrap');
        hide('tasks_sure_close_wrap');
        sendReq(hash, box);
        box.removeButtons();
        box.addButton(getLang('global_close'), function() {
          cur.forceStop = true;
          box.hide();
        });
      }, getLang('global_cancel'), function() {
        cur.forceStop = true;
        box.hide();
      });
      cur.hideAutoanswer = new Checkbox(ge('tasks_ignore_autoanswer'), {label: cur.lang.no_autoanswer, onChange: toggle.pbind(ge('tasks_sure_close'), this.val)});
      ajax.post(Tasks.address, {act: 'get_attach_data'}, {
        cache: 1,
        onDone: function(script) {
          if (script) eval(script);
        }
      })
  } else {
    var box = showFastBox({title: getLang('tasks_please_wait'), width: 430, bodyStyle: "line-height: 160%;", dark: 1}, '<div id="tasks_status_progress_wrap" class="tasks_upload_progress_wrap" style="margin: 20px auto"><div id="task_status_progress" class="tasks_upload_progress" style="width: 0%;"></div></div>', getLang('global_cancel'), function() {
        cur.forceStop = true;
        box.hide();
      }
    );
    sendReq(hash, box);
  }
},

addAutoScreen: function() {
  var doShow = function() {
    var box = showBox('/helpdesk', {act: 'choose_photo_box', scrollbar_width: window.sbWidth()}, {params: {bodyStyle: 'padding: 0px', dark: 1}, cache: 1, onFail: function() {show('tasks_sure_close_error'); hide('tis_add_lnk'); return true;}});
  }
  if (window.Tickets) {
    doShow();
  } else {
    stManager.add(['tickets.js', 'tickets.css'], doShow);
  }
},

showNotifyBox: function() {
  var box = showBox('al_friends.php', {act: 'select_friends_box', from: 'tasks', privacy: cur.view_privacy, bid: cur.bug_id, author: cur.author_id, dev: cur.dev_id}, {stat: ['privacy.js', 'privacy.css', 'indexer.js'], params: {onHide: function() {
    each(cur.flistScrollbar.destroy, function (k, f) {f();});
  }, dark: 1}});
  cur.onFlistSave = function(ids, list, hash) {
    box.leaveOnSave = true;
    ajax.post(Tasks.address, {act: 'notify_users', ids: ids.join(','), bid: cur.bug_id, hash: hash}, {
      onDone:function(header, content) {
        box.removeButtons();
        box.addButton(getLang('global_close'), box.hide, 'yes');
        box.setOptions({title: header, width: '430px', bodyStyle: 'padding: 15px;'});
        box.content(content);
        setTimeout(function() {
          box.hide();
        }, 3000);
      },
      progress: box.progress
    });
  }
},

notifyUser: function(id, hash) {
  showBox(Tasks.address, {act: 'notify_users', ids: id, bid: cur.bug_id, hash: hash}, { params: {width: '430px', dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}});
},

moveTask: function() {
  showBox(Tasks.address, {act: 'move_task'}, {stat: ['ui_controls.js', 'ui_controls.css'], params: {width: '430px', dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}});
},

changeDeveloper: function(dev, hash) {
  show('tasks_loading');
  ajax.post(Tasks.address, {act: 'change_dev', bid: cur.bug_id, dev: dev, hash: hash}, {
    onDone:function(header, actions, comments) {
      hide('tasks_loading');
      if (header) ge('task_header').innerHTML = header;
      if (actions) ge('task_actions').innerHTML = actions;
      if (comments) ge('task_comments').innerHTML = comments;
      if (curBox()) curBox().hide();
    }
  });
},

takeTask: function(hash) {
  Tasks.changeDeveloper(vk.id, hash);
},

sendTask: function(hash) {
  Tasks.changeDeveloper(cur.task_change_dev.val(), hash);
},

bindTicket: function() {
  return !showBox(Tasks.address, {act: 'bind_ticket'}, {params: {width: '430px', dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}});
},

unbindTicket: function(ticket_id, hash) {
  var doUnbind = function() {
    var box = cur.unbindBox;
    ajax.post(Tasks.address, {act: 'unbind_ticket', ticket_id: ticket_id, bug_id: cur.bug_id, hash: hash}, {
      cache: 1,
      onDone: function(script) {
        var el = ge('ticket_row'+ticket_id), par = el.parentNode;
        slideUp(el, 200, function() {
          re(el);
          if (!par.hasChildNodes()) re(par);
        });
        box.hide();
        if (script) eval(script);
      },
      showProgress: box.showProgress,
      hideProgress: box.hideProgress
    });
  }
  var enterUnbind = function(e) {
    if (e.keyCode == KEY.ENTER && __bq.count()) {
      doUnbind();
      return false;
    }
  }
  if (!browser.mobile) {
    addEvent(document, 'keydown', enterUnbind);
  }
  cur.unbindBox = showFastBox({title: cur.lang['delete_ticket_bind'], width: 430, dark: 1, onHide: function() {
    removeEvent(document, 'keydown', enterUnbind);
  }}, cur.lang['delete_ticket_text'], cur.lang['delete'], doUnbind, getLang('global_cancel'));
},

toggleRedesignTask: function(bid, hash, el) {
  var onDone = function(result) {
    el.innerHTML = result;
  };
  ajax.post(Tasks.address, {act: 'toggle_redesign_task', bid: bid, hash: hash}, {onDone: onDone});
},

_eof: 1};try{stManager.done('tasks.js');}catch(e){}
