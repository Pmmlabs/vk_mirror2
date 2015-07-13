var progressLine = '<div style="padding:5px;text-align: center"><img valign="middle" src="/images/upload.gif"></div>';
var progressLineLeft = '<div style="padding:0px;text-align: left"><img valign="middle" src="/images/upload.gif"></div>';

function report(wid, act, hash, pp, url) {
  var ajax = new Ajax();
  ajax.wid = wid;
  ajax.onDone = function (obj,text) {
   try {json=eval("("+text+")");}
   catch(e) {return;};
   if(json&&json.html) {
    ge('wid'+wid).innerHTML="<div id='msg'>"+json.html+"</div>";
    if (json.html == "Предупреждение уже обработано.") {
     msg = ge('wid'+wid).getElementsByTagName('div')[0];
     msg.style.backgroundColor = "#8A4C20";
    }
   }
  };
  ajax.onFail = function (obj,text) {
    ge('wid'+wid).innerHTML="<div id='msg'>" + getLang('admin2_server_error') + " (" + text + ")</div>";
  };
  if(!url)url = 'admin';
  ajax.post('/'+url+'.php', {'act': act, 'wid': wid, 'hash': hash, 'pp': pp});
  ge('wid'+ wid).innerHTML = progressLine;
}

function processWarningReport(act, wid, hash) {
  var ajax = new Ajax();
  ajax.wid = wid;
  ajax.onDone = function (obj,text) {
   try {json=eval("("+text+")");}
   catch(e) {return;};
   if(json&&json.html) {
    ge('wid'+wid).innerHTML="<div id='msg'>"+json.html+"</div>";
    if (json.html == "Жалоба уже обработана.") {
     msg = ge('wid'+wid).getElementsByTagName('div')[0];
     msg.style.backgroundColor = "#8A4C20";
    }
   }
  };
  ajax.onFail = function (obj,text) {
    ge('wid'+wid).innerHTML="<div id='msg'>" + getLang('admin2_server_error') + " (" + text + ")</div>";
  };
  ajax.post('/admin.php', {'act': act, 'wid': wid, 'hash': hash});
  ge('wid'+ wid).innerHTML = progressLine;
}


function changeName(id) {
 obj = ge('itemName'+id);
 name = obj.innerHTML;
 if (ge('typeId'+id).value >= 0) {
  ge('itemType'+id).innerHTML = "<select class='select' name='type"+id+"' id='type"+id+"' style='width:180px'><option id='"+id+"sc0' value = '0'>" + getLang('admin2_school') + "</option><option id='"+id+"sc1' value = '1'>" + getLang('admin2_gymnasium') + "</option><option id='"+id+"sc2' value = '2'>" + getLang('admin2_liceum') + "</option><option id='"+id+"sc3' value = '3'>" + getLang('admin2_internat') + "</option><option id='"+id+"sc4' value = '4'>" + getLang('admin2_evening') + "</option><option id='"+id+"sc5' value = '5'>" + getLang('admin2_music') + "</option><option id='"+id+"sc6' value = '6'>" + getLang('admin2_sports') + "</option><option id='"+id+"sc7' value = '7'>" + getLang('admin2_artistic') + "</option><option id='"+id+"sc13' value = '13'>" + getLang('admin2_art') + "</option><option id='"+id+"sc14' value = '14'>" + getLang('admin2_garten') + "</option><option id='"+id+"sc9' value = '9'>" + getLang('admin2_prof_liceum') + "</option><option id='"+id+"sc8' value = '8'>" + getLang('admin2_colledge') + "</option><option id='"+id+"sc10' value = '10'>" + getLang('admin2_tech') + "</option><option id='"+id+"sc12' value = '12'>" + getLang('admin2_spec_school') + "</option><option id='"+id+"sc11' value = '11'>" + getLang('admin2_prof_tech') + "</option><option id='"+id+"sc15' value = '15'>" + getLang('admin2_prof') + "</option><option id='"+id+"sc16' value = '16'>" + getLang('admin2_driving_sch') + "</option></select>";
  ge(id+'sc'+ge('typeId'+id).value).selected = "selected";
 }
 if (ge('typeId'+id).value == -1) {
  fullname = ge('itemFullNameValue'+id).value;
  ge('itemFullName'+id).innerHTML = "<div>" + getLang('admin2_full_univ_name') + "</div><input type='text' style='width:400px; margin:10px 0px 5px 0px' value='"+fullname+"' id='newFullName"+id+"'>";
 }
 obj.innerHTML = "<input type='text' style='width:400px; margin:10px 0px 5px 0px' value='"+name+"' id='newName"+id+"'>";
 ge('changeLink'+id).innerHTML = "<div id='oldChangeLink"+id+"' style='display: none'>" + ge('changeLink'+id).innerHTML + "</div><a href='javascript: changeReady("+id+");'>" + getLang('admin2_ready') + "</a> <span>|</span> <a href='javascript: changeCancel("+id+");'>" + getLang('admin2_cancel') + "</a> <span>|</span> <a href='javascript: searchName("+id+", 1);'>" + getLang('admin2_search') + "</a>";
 ge('newName'+id).focus();
}

function changeCancel(id){
 ge('itemName'+id).innerHTML = ge('trueItemName'+id).value;
 ge('changeLink'+id).innerHTML = ge('oldChangeLink'+id).innerHTML; // "<a href='javascript: changeName("+id+");'>" + getLang('admin2_edit') + "</a> <span>|</span> <b style='font-weight:normal;' id='itemList"+id+"'><a href='javascript: searchName("+id+", -1);'>" + getLang('admin2_list') + "</a></b> <span>|</span> <a href='javascript: searchName("+id+", 0);'>" + getLang('admin2_search') + "</a>";
 if (ge('typeId'+id).value >= 0) {
  ge('itemType'+id).innerHTML = ge('typeName'+id).value;
 }
 if (ge('typeId'+id).value == -1) {
  ge('itemFullName'+id).innerHTML = "";
 }
}

function showRecentHistory(hash) {
  var params = {act:'a_moder_names_recent_history', hash: hash};
  mb = new MessageBox({title: 'Недавно обработанные заявки', width: 600});
  mb.addButton( { label: 'Закрыть', onClick: function() { mb.hide(); }} );
  mb.loadContent('names_admin.php', params ).show();
  return false;
}


//document.myform.options[document.myform.selectedIndex].text

function changeReady(id){
  name = ge('newName' + id).value;
  ge('trueItemName' + id).value = name;
  obj = ge('itemName' + id);
  obj.innerHTML = name;
  ge('changeLink' + id).innerHTML = ge('oldChangeLink' + id).innerHTML; // "<a href='javascript: changeName("+id+");'>" + getLang('admin2_edit') + "</a> <span>|</span> <b style='font-weight:normal;' id='itemList"+id+"'><a href='javascript: searchName("+id+", -1);'>" + getLang('admin2_list') + "</a></b> <span>|</span> <a href='javascript: searchName("+id+", 0);'>" + getLang('admin2_search') + "</a>";
  if (ge('typeId' + id).value >= 0) {
    ge('typeId' + id).value = ge('type' + id).value;
    ge('itemType' + id).innerHTML = ge(id + 'sc' + ge('typeId' + id).value).innerHTML;
  }
  if (ge('typeId' + id).value == -1) {
    ge('itemFullNameValue' + id).value = ge('newFullName' + id).value;
    ge('itemFullName' + id).innerHTML = "";
  }
}

function searchName(id, newName) {
  var ajax = new Ajax();
  ajax.id = id;
  ajax.onDone = searchSuccess;
  ajax.onFail = searchFailed;
  if (newName == 1) {
    ajax.name = ge('newName' + id).value;
  } else {
    ajax.name = ge('trueItemName' + id).value;
  }
  if (newName == -1) {
    ajax.name = "";
    ge('itemList' + id).innerHTML = "<a href=\"javascript: hideList("+id+");\">" + getLang('admin2_hide_list') + "</a>";
  } else if (newName == 0) {
    ge('itemSearch' + id).innerHTML = "<a href=\"javascript: hideList("+id+");\">" + getLang('admin2_hide_list') + "</a>";
  }
  parent = ge('parentId'+id);
  type = ge('typeId' + id);
  ajax.parent_id = parent.value;
  ajax.type_id = type.value;
  ajax.post('/admin.php', {'act': 'a_search', 'id':ajax.id, 'name':ajax.name, 'parent_id':ajax.parent_id, 'type_id':ajax.type_id});
  ge('searchRes' + id).innerHTML = progressLineLeft;
}

function searchNameNum(id) {
  var ajax = new Ajax();
  ajax.id = id;
  ajax.onDone = searchSuccess;
  ajax.onFail = searchFailed;
  ajax.name = ge('trueItemName' + id).value;
  ge('itemSearchNum' + id).innerHTML = "<a href=\"javascript: hideList("+id+");\">" + getLang('admin2_hide_list') + "</a>";
  parent = ge('parentId'+id);
  type = ge('typeId' + id);
  ajax.parent_id = parent.value;
  ajax.type_id = type.value;
  ajax.post('/admin.php', {'act': 'a_search', 'id':ajax.id, 'name':ajax.name, 'parent_id':ajax.parent_id, 'type_id':ajax.type_id, 'num_only':1});
  ge('searchRes' + id).innerHTML = progressLineLeft;
}

function hideList(id) {
  ge('searchRes' + id).innerHTML = "";
  ge('itemList' + id).innerHTML = "<a href='javascript: searchName(" + id + ", -1);'>" + getLang('admin2_list') + "</a>";
  ge('itemSearch' + id).innerHTML = "<a href='javascript: searchName(" + id + ", 0);'>" + getLang('admin2_search') + "</a>";
  ge('itemSearchNum' + id).innerHTML = "<a href='javascript: searchNameNum(" + id + ");'>" + getLang('admin_added_items_digit_search') + "</a>";
}

function searchSuccess(ajaxObj,responseText) {
 var json;
 try {json = eval("("+responseText+")");}
 catch (e) {searchFailed(); return;};
 id = ajaxObj.id;
 if (json && json.html) {
  ge('searchRes'+id).innerHTML = json.html;
 } else {
  ge('searchRes'+id).innerHTML = getLang('admin2_server_error');
 }
}

function searchFailed(ajaxObj,responseText) {
 id = ajaxObj.id;
 ge('searchRes'+id).innerHTML = getLang('admin2_server_error');
}

function added(id, act, cb) {
  if (act == 'a_postpone') {
    searchSuccess({id: id}, "{html: '<div id=\"msg\" style=\"margin:10px 0px\">Заявка отложена.</div>'}");
    if (!ge('is_processed' + id).value) {
      var nav = geByClass('adminNav', ge('item_id' + id))[0];
      nav.parentNode.removeChild(nav);
      ge('is_processed' + id).value = 1;
    }
    return;
  }
  var ajax = new Ajax();
  ajax.id = id;
  ajax.onDone = function(obj, text) {
    searchSuccess(obj, text);
    if (!ge('is_processed' + id).value) {
      var nav = geByClass('adminNav', ge('item_id' + id))[0];
      nav.parentNode.removeChild(nav);
      ge('is_processed' + id).value = 1;
    }
    if (typeof cb === 'function') {
      cb();
    }
  }
  ajax.onFail = searchFailed;

  ajax.parent = ge('parentId'+id).value;
  ajax.type = ge('typeId'+id).value;
  ajax.name = ge('trueItemName'+id).value;
  if (ajax.type == -1) {
    ajax.fullname = ge('itemFullNameValue'+id).value;
  } else {
    ajax.fullname = '';
  }
  ajax.post('/admin.php', {'act':act, new_btn_support: 1, 'id':id, 'name':ajax.name, 'type':ajax.type, 'parent':ajax.parent, 'fullname': ajax.fullname});
  ge('searchRes'+id).innerHTML = progressLineLeft;
}

function all_to_blacklist() {
  if (isVisible('all_bl_progress')) return;
  show('all_bl_progress');
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    hide('all_bl_progress');
    var response = eval('(' + text + ')');
    for (var i in response) {
      obj.id = i;
      searchSuccess(obj, response[i]);
      if (!ge('is_processed' + i).value) {
        var nav = geByClass('adminNav', ge('item_id' + i))[0];
        nav.parentNode.removeChild(nav);
        ge('is_processed' + i).value = 1;
      }
    }
  }
  var ids = [];
  var page = ge('pageAdmin');
  for (var elem = page.firstChild; elem; elem = elem.nextSibling) {
    if (hasClass(elem, 'itemRow')) {
      var id = intval(elem.id.substr(7));
      if (!ge('is_processed' + id).value) {
        ids.push(id);
      }
    }
  }
  ajax.onFail = function() {
    hide('all_bl_progress');
  }
  ajax.post('/admin.php', {act: 'a_blacklist_all', ids: ids});
}

function feedback_box(item_id, obj_id) {
  var url = 'admin.php',
    query = {act: 'a_feedback_box', item_id: item_id},
    boxName = 'add_obj_comment';

  if (obj_id) {
    query.obj_id = obj_id;
  }

  showBox(boxName, url, query, {
    params: {
      title: getLang('admin_feedback_box_title'),
      width: 480,
      onLoad: function() {
        ge('feedback_' + item_id + '_obj_id').click();
      }
    },
    reload: true
  });

  var box = winBoxes[boxName];
  box.removeButtons();

  box.addButton({label: getLang('global_close'), style: 'button_no', onClick: function () {
    box.hide();
  }});

  box.feedback_process = false;

  box.addButton({label: getLang('box_send'), style: 'button_yes', onClick: function (btn) {
    if (box.feedback_process) {
      return;
    }
    box.feedback_process = true;

    var ajax = new Ajax(),
      feedBackText = ge('feedback_' + item_id).value;

    hide('admin_feedback_error');
    if (feedBackText.match(/\{[a-z]+\}/)) {
      ge('admin_feedback_error').innerHTML = getLang('admin_feedback_bad_text');
      show('admin_feedback_error');
      box.feedback_process = false;
      return;
    }


    show('admin_feedback_loader');
    ajax.onDone = function (ajax, response) {
      response = eval('(' + response + ')') || {};
      if (response) {
        hide('admin_feedback_loader');
        box.hide();
        box.feedback_process = false;
        if (obj_id) {
          added(item_id, 'a_not_add', function() {
            var el = ge('admin_feedback_link' + item_id);
            el.parentNode.innerHTML = response.html;
          });
        } else {
          added(item_id, 'a_not_add');
        }
      }
    };
    ajax.onFail = function() {
      unlockButton(btn);
    };
    query.act = 'do_send_feedback';
    query.comment = feedBackText;
    query.hash = ge('feedback_' + item_id + '_hash').value;
    ajax.post(url, query);
  }});
}

function switchFeedbackTab(el, tab) {
  switch (tab) {
    case 'success':
    case 'fix_type':
      show('admin_feedback_object');
      break;
    case 'decline':
      hide('admin_feedback_object');
      break;
    default:
      return;
  }

  var curTab = geByClass1('flatTabOn', ge('admin_feedback_tabs'));
  removeClass(curTab, 'flatTabOn');
  addClass(curTab, 'flatTab');

  addClass(el, 'flatTabOn');
  removeClass(el, 'flatTab');
}

function loadFeedbackText(item_id, result, item_type) {
  var ajax = new Ajax(),
    ajaxParams = {
      act: 'a_feedback_text',
      item_id: item_id
    };

  if (typeof result !== 'undefined') {
    ajaxParams.item_type = item_type;
    ajaxParams.result = result;
    ge('feedback_' + item_id + '_item_type').value = item_type;
    ge('feedback_' + item_id + '_result').value = result;
  } else {
    ajaxParams.obj_id = ge('feedback_' + item_id + '_obj_id').value;
    ajaxParams.item_type = ge('feedback_' + item_id + '_item_type').value;
    ajaxParams.result = ge('feedback_' + item_id + '_result').value;
  }

  ajax.onDone = function(ajaxRes, response) {
    response = eval('(' + response + ')') || {};
    ge('feedback_' + item_id).innerHTML = response.text;
    ge('feedback_' + item_id + '_obj_id').value = response.obj_id;
    ge('feedback_' + item_id + '_obj_id').click();
    hide('admin_feedback_loader');
  };
  show('admin_feedback_loader');
  ajax.get('admin.php', ajaxParams)
}

function load_details(id, type) {
  if (parseInt(ge('details_' + id + '_' + type + '_visible').innerHTML)) {
    ge('details_' + id + '_' + type + '_visible').innerHTML = '0';
    ge('details_' + id + '_' + type).style.display = 'none';
  } else {
    ge('details_' + id + '_' + type + '_visible').innerHTML = '1';
    ge('details_' + id + '_' + type).style.display = 'block';
    ge('details_' + id + '_' + type).style.textAlign = 'center';
    ge('details_' + id + '_' + type + '_text').innerHTML = '<img style="margin: 30px 0px" src="/images/progress7.gif"/>';
    var ajax = new Ajax();
    ajax.onDone = function(obj, text) {
      ge('details_' + id + '_' + type).style.textAlign = 'left';
      ge('details_' + id + '_' + type + '_text').innerHTML = text;
    }
    ajax.post('/admin.php', {'act': 'reports_details', 'item_id': id, 'item_type': type});
  }
}

function init() {
  if (ge('new_summary')) {
    ge('summary').innerHTML = ge('new_summary').innerHTML;
  }
  if (ge('new_pages')) {
    text = ge('new_pages').innerHTML;
    ge('pages_top').innerHTML = '<ul class="pageList"><li><img style="vertical-align: -3px; display: none;" id="loading_pages_up" src="/images/upload.gif"/></li>' + text + '</ul>';
    if (text.length > 0)
      ge('pages_bottom').innerHTML = '<ul class="pageList"><li><img style="vertical-align: -3px; display: none;" id="loading_pages_down" src="/images/upload.gif"/></li>' + text + '</ul>';
    else
      ge('pages_bottom').innerHTML = '';
  }
}

var current_page = 1;

var filter_is_set = function(index) {
  var power_of_two = 1;
  for (var i = 0; i < index; ++i) {
    power_of_two *= 2;
  }
  return Math.floor(filter_current / power_of_two) % 2 == 0;
}

var filter_set = function(index, value) {
  var power_of_two = 1;
  for (var i = 0; i < index; ++i) {
    power_of_two *= 2;
  }
  var is_set = filter_is_set(index);
  if ((is_set) && (!value)) {
    filter_current += power_of_two;
    ge('filter_' + index).className = 'filter_btn_off';
  } else if ((!is_set) && (value)) {
    filter_current -= power_of_two;
    ge('filter_' + index).className = 'filter_btn_on';
  }
}

function filter_change(index) {
  filter_set(index, !filter_is_set(index));
  added_items_page(current_page);
  return false;
}

function added_items_toggle_rev(el) {
  var input_node = ge('added_items_rev'), rev_value = parseInt(input_node.value);
  input_node.value = rev_value ? 0 : 1;
  removeClass(el, rev_value ? 'sort_rev_icon' : 'sort_not_rev_icon');
  addClass(el, rev_value ? 'sort_not_rev_icon' : 'sort_rev_icon');
  added_items_page(0);
}

function added_items_page(page) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    current_page = page;
    var filters_row = ge('added_items_filter');
    if (filters_row) {
      filters_row.parentNode.removeChild(filters_row);
    }
    ge('rows_content').innerHTML = text;
    if (filters_row) {
      ge('pageAdmin').insertBefore(filters_row, ge('pageAdmin').firstChild);
    }
    init();
  }
  ajax.post('/admin.php', {'act': 'a_added_items_page', 'index': page, 'filter': filter_current, 'c': ge('country_type').innerHTML, 'user': ge('user').value, rev: ge('added_items_rev').value});
  if (ge('loading_pages_up')) {
    ge('loading_pages_up').style.display = 'inline';
  }
  if (ge('loading_pages_down')) {
    ge('loading_pages_down').style.display = 'inline';
  }
}

onDomReady(init);

var informer_moders_visible = false;

function toggle_informer_moders() {
  if (informer_moders_visible) {
    informer_moders_visible = false;
    events.removeEvent(document, 'keydown');
    ge('informer_moders').style.display = 'none';
  } else {
    informer_moders_visible = true;
    events.addEvent(document, 'keydown', function(e) { if (e.keyCode == 27) toggle_informer_moders(); });
    ge('informer_moders').style.display = 'block';
    ge('page').focus();
  }
}

function add_informer_moder() {
  if (ge('page').value.replace(/\s/g, '').length) {
    ge('addingModeratorProgress').style.display = 'block';
    var ajax = new Ajax();
    ajax.onDone = function(obj, text) {
      ge('addingModeratorProgress').style.display = 'none';
      var class_name = '', message_text = '';
      if (text.charAt(0) == 'e') {
        class_name = 'errorMessage';
        if (text.charAt(1) == '1') {
          message_text = 'Этот пользователь уже является модератором.';
        } else if (text.charAt(1) == '2') {
          message_text = 'Неверный адрес страницы пользователя.';
        } else if (text.charAt(1) == '3') {
          message_text = 'Вряд ли этого пользователя следует назначать в модераторы.';
        } else {
          message_text = 'Неизвестная ошибка, код: ' + text.substr(1);
        }
      } else if (text.charAt(0) == 'g') {
        ge('informer_moders_table').innerHTML = text.substr(1);
        class_name = 'infoMessage';
        message_text = 'Пользователь назначен модератором.';
        ge('page').value = '';
        ge('page').focus();
      } else {
        class_name = 'errorMessage';
        message_text = 'Неизвестная ошибка: ' + text;
      }
      ge('addingModeratorMessageCont').style.display = 'block';
      ge('addingModeratorMessageCont').innerHTML = '<div id="addingModeratorMessage" class="' + class_name + '">' + message_text + '</div>';
      setTimeout(function() { (new effects.fader()).fade(ge('addingModeratorMessage'), [0xFFFFFF, 0xDDDDDD], 3000); }, 2500);
    }
    ajax.post('admin.php', {'act': 'a_add_informer_moder', 'page': ge('page').value.replace(/\s/g, '')});
  } else {
    ge('page').focus();
  }
}


function remove_informer_moder(id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (text.charAt(0) == 'e') {
      if (text.charAt(1) == '1') {
      } else if (text.charAt(1) == '2') {
      } else {
      }
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return remove_informer_moder(' + id + ')">Удалить</a>';
    } else if (text.charAt(0) == 'g') {
      ge('moderator' + id).className += ' removed';
      var prev = ge('moderator' + id).previousSibling;
      var has_prev = false;
      if (prev) {
        if (prev.tagName) {
          if (prev.tagName.toString().toLowerCase() == 'div') {
            has_prev = true;
          }
        }
      }
      if (has_prev) {
        prev.style.borderBottomColor = '#ded8b1';
      } else {
        ge('moderator' + id).style.borderTopColor = '#ded8b1';
      }
      ge('moderator' + id + 'del').style.display = 'inline';
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return return_informer_moder(' + id + ')">Отмена</a>';
    } else {
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return remove_informer_moder(' + id + ')">Удалить</a>';
    }
  }
  ge('moderator' + id + 'dellink').innerHTML = '<img src="/images/upload.gif">';
  ajax.post('admin.php', {'act': 'a_remove_informer_moder', 'moder_id': id});
  return false;
}

function return_informer_moder(id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (text.charAt(0) == 'e') {
      if (text.charAt(1) == '1') {
      } else if (text.charAt(1) == '2') {
      } else {
      }
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return return_informer_moder(' + id + ')">Отмена</a>';
    } else if (text.charAt(0) == 'g') {
      ge('moderator' + id).className = ge('moderator' + id).className.replace('removed', '');
      var prev = ge('moderator' + id).previousSibling;
      var has_prev = false;
      if (prev) {
        if (prev.tagName) {
          if (prev.tagName.toString().toLowerCase() == 'div') {
            has_prev = true;
          }
        }
      }
      if (has_prev) {
        prev.style.borderBottomColor = '';
      } else {
        ge('moderator' + id).style.borderTopColor = '#ddd';
      }
      ge('moderator' + id + 'del').style.display = 'none';
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return remove_informer_moder(' + id + ')">Удалить</a>';
    } else {
      ge('moderator' + id + 'dellink').innerHTML = '<a href="#" onclick="return return_informer_moder(' + id + ')">Отмена</a>';
    }
  }
  ge('moderator' + id + 'dellink').innerHTML = '<img src="/images/upload.gif">';
  ajax.post('admin.php', {'act': 'a_return_informer_moder', 'moder_id': id});
  return false;
}


function disableApp(aid, hash) {
  var ajax = new Ajax();
  ajax.aid = aid;
  ajax.hash = hash;
  ajax.onDone = disableAppSuccess;
  ajax.onFail = appOpFailed;
  ajax.post('/apps.php', {'act': 'a_app_disable', 'aid': aid, 'hash': hash});
}

function disableAppSuccess(ajaxObj,responseText) {
  ge('appoptions'+ ajaxObj.aid).innerHTML = responseText;
}

function enableApp(aid, hash) {
  var ajax = new Ajax();
  ajax.aid = aid;
  ajax.hash = hash;
  ajax.onDone = enableAppSuccess;
  ajax.onFail = appOpFailed;
  ajax.post('/apps.php', {'act': 'a_app_enable', 'aid': aid, 'hash': hash});
}

function enableAppSuccess(ajaxObj,responseText) {
  ge('appoptions'+ ajaxObj.aid).innerHTML = responseText;
}


function appOpFailed(ajaxObj,responseText) {
 ge('appoptions'+ ajaxObj.aid).innerHTML="<div id='msg'>" + getLang('admin2_server_error') + "</div>";
}

//new
var Datepicker = function(el, options){

  var calendarDiv, calendarBox, calendarFrame, dates = {}, lockHide = false, months = [], mn = [], dateInput, dateVal, _t = this, w,
  isShown = false, hour = 0, min = 0;

  el = ge(el);
  if(!el)return;

  var date_format = getLang('datepicker_date_format');
  if(date_format == 'datepicker date format') date_format = '{day} {month} {year}';

  for (var i = 1; i < 13; i++) {
    months.push(getLang('month' + i + '_of'));
    mn.push(getLang('Month' + i));
  }

  var defaults = {
    mode: 'd',
    onUpdate: function(d,m){},
    width: 145
  };

  options = extend(defaults, options);

  var mode = options.mode;
  var onUpdate = options.onUpdate;
  var w = options.width;

  var fixIE = function(){
    if(!browser.msie)return;
    calendarDiv = ge(calendarDiv.id);
    calendarBox = ge(calendarBox.id);
    calendarFrame = ge(calendarFrame.id);
    dateInput = ge(dateInput.id);
    dateVal = ge(dateVal.id);
  }

  var onClick = function(e){
    fixIE();
    if (isShown) {
      _t.hide();
    } else {
      showCalendar();
    }
    dateInput.blur();
    return false;
  };

  var showCalendar = function() {
    if (isShown) return;
    isShown = true;

    _ui.sel(_t.guid);
    show(calendarBox);
    new Calendar({
      hideNextMonth:true,
      container:calendarDiv,
      day:dates,
      mode:mode,
      getDay:function(d, m, y, mode){
        updateDate({"d":d,"m":m,"y":y}, mode);
      }
    });
    setStyle(calendarFrame, {width: calendarDiv.offsetWidth, height:calendarDiv.offsetHeight});
    //dpShown = _t;
    var xy = getXY(dateInput);
    var p = dateInput;

    while (p = p.parentNode){
      if(p.style && getStyle(p, 'position') == 'absolute'){
        var xy1 = getXY(p);
        xy[0] -= xy1[0];
        xy[1] -= xy1[1];
      }
    }

    setStyle(calendarBox, {top: xy[1] + dateInput.offsetHeight + 1, left: xy[0] - 1 + (window.is_rtl ? getSize(dateInput)[0] : 0)});
    dateInput.focus();
  };

  var updateDate = function(date, mode, init){
    dates = date;
    if(mode == "m"){
      dateInput.value = mn[date.m-1] || "";
    }else{
      dateInput.value = date_format.replace('{day}', date.d).replace('{month}', winToUtf(months[date.m - 1])).replace('{year}', date.y);
    }
    _t.hide();
    dateVal.value = Math.floor((new Date(date.y, date.m - 1, date.d, hour, min)).getTime() / 1000);
    if(!init)onUpdate(date, mode);
  };

  this.hide = function() {
    if (!isShown) return;
    isShown = false;

    _ui.sel(false);
    hide(calendarBox);
  };

  var d = 0;
  if (options.day || options.month || options.year) {
    if(mode!="m")dates.d = options.day;
    dates.m = options.month;
    dates.y = options.year;
    if(options.time){
      hour = options.hour || 0;
      min = options.min || 0;
    }
  } else if (el.value) {
    d = new Date(parseInt(el.value) * 1000);
  } else{
    d = new Date();
  }
  if (d) {
    dates.d = d.getDate();
    dates.m = d.getMonth()+1;
    dates.y = d.getFullYear();
    hour = d.getHours();
    min = d.getMinutes();
  }

  var id = el.id;
  var inputId = id+"_date_input";
  var p = el.parentNode;

  var html = '<input type="hidden" name="'+id+'" id="'+id+'"/>' +
    '<input readonly="1" style="width:'+(w-25)+'px;" type="text" name="'+inputId+'" id="'+inputId+'"/>' +
    '<div id="'+id+'_cal_box" style="display:none;position:absolute;"><iframe id="'+id+'_cal_frame" style="border:0;position:absolute;z-index:100;"></iframe><div id="'+id+'_cal_div" style="position:absolute;z-index:200"></div></div>';
  var wrap = document.createElement('div');
  wrap.id = id+"_datepicker_container";
  setStyle(wrap, {background: 'url(/images/calendar.gif)', backgroundPosition:(w-18)+'px center', backgroundRepeat:'no-repeat', width:w});
  addClass(wrap, "datepicker_container");
  wrap.innerHTML = html;
  p.replaceChild(wrap, el);
  dateInput = ge(inputId);
  dateVal = ge(id);
  addEvent(dateInput, 'mousedown', onClick);
  updateDate(dates, mode, true);

  _t.guid = _ui.reg({
    container: wrap,
    onEvent: function(e) {
      if (e.type == 'mousedown') {
        var outside = true, t = e.target;
        while (t && t != t.parentNode) {
          if (t == wrap) {
            outside = false;
            break;
          }
          t = t.parentNode;
        }
        if (outside) {
          _t.hide();
        }
      }
    },
    _blur: function() {
      _t.hide();
    }
  });

  if(options.time){
    var time = ge(options.time);
    new Timepicker(time, {onUpdate:function(h, m){
      hour = h;
      min = m;
      updateDate(dates, mode);
    }, hour:hour, min:min});
  }

  calendarBox = ge(id+'_cal_box');
  calendarDiv = ge(id+'_cal_div');
  calendarFrame = ge(id+'_cal_frame');
  if(browser.mozilla){hide(calendarFrame);}
};

var Timepicker = function(el, options){

  el = ge(el);
  if(!el)return;

  var defaults = {
    onUpdate:function(h,m){},
    h: 0,
    m: 0,
    format: '<div class="fl_l" style="padding:5px 3px 0 0;">в </div>{hour}<div class="fl_l" style="padding:5px 3px 0;"> : </div>{min}' //TEMP
  };

  options = extend(defaults, options);

  var id = el.id;
  var inputId = id+"_date_input";
  var p = el.parentNode;

  var h = options.hour || 0;
  var m = options.min || 0;
  m = m - m % 5;

  var html = '<input type="hidden" name="'+id+'" id="'+id+'"/>' +
    options.format.replace('{hour}', '<div class="fl_l"><input type="hidden" id="'+id+'_hour_input" value="'+h+'"/></div>').replace('{min}', '<div class="fl_l"><input type="hidden" id="'+id+'_min_input" value="'+m+'"/></div>') +
    '<div class="results_container"><div class="result_list" style="display:none;"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div></div>';
  var wrap = document.createElement('div');
  wrap.id = id+"_timepicker_container";
  addClass(wrap, "timepicker_container");
  wrap.innerHTML = html;
  p.replaceChild(wrap, el);

  var onChange = function(){
    var hour = hourDD.val();
    var min = minDD.val();
    options.onUpdate(hour, min);
  }

  var hours = [];
  for(var i = 0; i < 24; i++){hours.push([i, i]);}
  var mins = [];
  for(var i = 0; i < 60; i+=5){mins.push([i, i<10 ? '0'+i.toString() : i]);}

	wrap.id = id+"_timepicker_container";

	if(/01test/.test(location.href)){
		resultList = geByClass('result_list', wrap)[0];
		if (browser.chrome) {
			resultList.style.opacity = 1;
		}
		resultListShadow = geByClass('result_list_shadow', wrap)[0];
		var select = new _TimeSelect(resultList, resultListShadow, {});
		select.show();
	}else{
    var hourDD = new Dropdown(ge(id+'_hour_input'), hours, {width:47, multiselect:false, onChange:onChange});
    var minDD = new Dropdown(ge(id+'_min_input'), mins, {width:47, multiselect:false, onChange:onChange});
  }
};

function _TimeSelect(container, shadow, options) {
  var CLASS = {
    FIRST: "first",
    LAST: "last",
    ACTIVE: "ts_active",
    FIRST_ACTIVE: "ts_first_active",
    LAST_ACTIVE: "ts_last_active",
    SELECTED: "active",
    FIRST_SELECTED: "first_active",
    LAST_SELECTED: "last_active",
    SCROLLABLE: "result_list_scrollable"
  };
  var active = -1,
    data = [],
    listH1,
    listH2,
    listM,
    wrap,
    maxHeight = options.height ? options.height : 250;

  var selected = {hour:0,min:0};
  var value = {hour:0,min:0};
  var keys = {listH1:'hour', listH2:'hour', listM:'min'};

  wrap = document.createElement('div');
  container.appendChild(wrap);
  listH1 = document.createElement('ul');
  listH1.id = 'listH1';
  addClass(listH1, 'fl_l listH1');
  listH2 = document.createElement('ul');
  listH2.id = 'listH2';
  addClass(listH2, 'fl_l listH2');
  listM = document.createElement('ul');
  listM.id = 'listM';
  addClass(listM, 'fl_l listM');
  wrap.appendChild(listH1);
  wrap.appendChild(listH2);
  wrap.appendChild(listM);
  addClass(container, 'timepicker_container');
  var am_pm = options.am_pm;
  var zm = '<i>:00</i>';
  for(var i = 1; i < 13; i++){
    appendItem(listH1, [i, am_pm ? i+zm+' AM' : i+zm]);
    appendItem(listH2, [i+12, am_pm ? i+zm+' PM' : (i+12)+zm]);
    appendItem(listM, [i, ':'+(i*5)]);
  }
  updateContainer(listH1);
  updateContainer(listH2);
  updateContainer(listM);
  var contr = {listH1: listH2, listH2: listH1};

  function handleKeyEvent(e) {
    if (!isVisible(container)) {
      return;
    }
    switch(e.keyCode) {
      case KEY.UP:
        moveSelect(-1)
        return false;
        break;

      case KEY.DOWN:
        moveSelect(1);
        return false;
        break;

      case KEY.PAGEUP:
        //select.pageUp();
        return false;
        break;

      case KEY.PAGEDOWN:
        //pageDown();
        return false;
        break;
      case KEY.TAB:
        if (isFunction(options.onItemSelect) && active > -1){
          options.onItemSelect(getSelectedItem());
          return false;
        }
        hideList();
      break;
      case KEY.RETURN:
        if (isFunction(options.onItemSelect) && active > -1){
          options.onItemSelect(getSelectedItem());
        }
        return false;
        break;
      case KEY.ESC:
        hideList();
        return false;
        break;
    }
  };

  var keyevent = browser.opera ? 'keypress' : 'keydown';
  var guid = _ui.reg({
    container: wrap,
    onEvent: function(e) {
      if (e.type == keyevent) {
        handleKeyEvent(e);
      }
    },
    _blur: hideList
  });

  function moveSelect(step) {
    if (movePosition(step)) {
      highlight(list.childNodes[active]);
    }
  };

  function movePosition(step) {
    var selected = parseInt(active) + parseInt(step);
    if (selected < 0)
      container.scrollTop = 0;
    else if (selected + 1 > list.childNodes.length)
      container.scrollTop = list.offsetTop + list.offsetHeight - container.offsetHeight;
    while (1) {
      if (selected + 1 > list.childNodes.length || selected < 0) {
        return false;
      }
      if (!list.childNodes[selected]['_disabled']) {
        break;
      }
      selected++;
    }


    active = selected;
    return true;
  };

  function highlight(list, obj, select) {
    each(list.childNodes, function(i, li) {
      removeClass(li, select ? CLASS.SELECTED : CLASS.ACTIVE);
    });
    if (!obj) return;
    addClass(obj, select ? CLASS.SELECTED : CLASS.ACTIVE);
    removeClass(list.firstChild, select ? CLASS.FIRST_SELECTED : CLASS.FIRST_ACTIVE);
    removeClass(list.lastChild, select ? CLASS.LAST_SELECTED : CLASS.LAST_ACTIVE);
    if (obj == list.firstChild) {
      addClass(obj, select ? CLASS.FIRST_SELECTED : CLASS.FIRST_ACTIVE);
    } else if (obj == list.lastChild) {
      addClass(obj, select ? CLASS.LAST_SELECTED : CLASS.LAST_ACTIVE);
    }
    if (isFunction(options.onItemActive)) {
      options.onItemActive(obj['_value'] || obj.innerHTML);
    }
    if (obj.offsetTop + obj.offsetHeight + list.offsetTop > container.offsetHeight + container.scrollTop - 1) {
      container.scrollTop = obj.offsetTop + list.offsetTop + obj.offsetHeight - container.offsetHeight + 1;
    } else if (obj.offsetTop + list.offsetTop < container.scrollTop) {
      container.scrollTop = obj.offsetTop + list.offsetTop;
    }

  };

  function onMouseMove_item(e) {
    var item = this;
    if (hasClass(item, 'active')) return false;
    each([listH1, listH2, listM], function(i,list){
			var a = indexOf(list.childNodes, item);
			if(a == -1){
        highlight(list, false);
        return;
      }
			active = a;
			highlight(list, item);
		});
  }

  function onClick_item(e) {
    var val = this['_value'] || this.innerHTML;
    var list = this.parentNode;
    if(contr[list.id]){
      highlight(contr[list.id], false, true);
    }
    highlight(list, this, true);
    var key = keys[list.id];
    selected[key] = value[key] = val;
    if (isFunction(options.onItemSelect)) {
      options.onItemSelect(val);
    }

    if(selected.hour && selected.min)hideList();
  }

  function updateContainer(list) {
	  addClass(list.lastChild, CLASS.LAST);
		container.style.height = 'auto';
		var shadow_height = intval(list.offsetHeight) + intval(list.offsetTop);
		if (shadow_height) {
			show(shadow);
			shadow.style.marginTop = shadow_height + 'px';
		} else {
			hide(shadow);
		}
  }

  function appendItem(list, item) {
    var li = document.createElement("li");

    li.innerHTML = item[1];
    li['_value'] = item[0];
    list.appendChild(li);

		addEvent(li, 'mousemove', onMouseMove_item);
		addEvent(li, 'mousedown', onClick_item);

    //updateContainer(list);
  }

/*
  function removeItem(value) {
    if (value === undefined) return;
    for (var i in list.childNodes) {
      var node = list.childNodes[i];
      if (node && (node['_value'] == value || node.innerHTML == value)) {
        node.parentNode.removeChild(node);
        break;
      }
    }
    updateContainer();
  }
*/

  function performShow() {
    wrap.style.position = 'absolute';
    wrap.style.visibility = 'hidden';
    show(container);
    show(shadow);
    updateContainer(listH1);
    updateContainer(listH2);
    updateContainer(listM);
    wrap.style.position = 'relative';
    wrap.style.visibility = 'visible';
  }

  function showList(selectedItem) {
    var wasVisible = isVisible(container);
    if (!wasVisible) {
      performShow();
    }

    var childNode;
    if (selectedItem) {
      for (var i = 0; i < list.childNodes.length; i++) {
        childNode = list.childNodes[i];
        if (childNode['_value'] == selectedItem) {
          active = i;
          highlight(childNode);
          break;
        }
      }
    } else if (options.selectFirst) {
      for (var i = 0; i < list.childNodes.length; i++) {
        childNode = list.childNodes[i];
        if (!childNode['_disabled']) {
          active = i;
          highlight(childNode);
          break;
        }
      }
    }

    if (!wasVisible && isFunction(options.onShow)) options.onShow();
  }
  function hideList() {
    if (!isVisible(container)) return;
    hide(container);
    hide(shadow);
    if (isFunction(options.onHide)) options.onHide();
    active = -1;
    if (isFunction(options.onItemActive)) options.onItemActive();
  }

  return {
    isVisible: function(){
      return isVisible(container);
    },
    toggle: function(){
      if (this.isVisible(container)) hideList();
      else {
        showList();
      }
    },
    handleKeyEvent: function(e) {
      if (isVisible(container))
        handleKeyEvent(e);
    },
    hide: hideList,
    show: showList
  };
};
