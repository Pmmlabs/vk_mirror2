function saveContacts() {
  show('save_progress');
  var params = {act: 'a_contacts', hash: ge('hash').value};
  each(['email', 'mobile', 'home', 'icq'], function() {
    params['privacy_' + this] = getPrivacy(this);
  });
  each(['email', 'mobile', 'hometel', 'icq', 'website', 'nick'], function() {
    params['' + this] = ge('' + this).value;
  });
  if (ge('forum').value != ge('forum').getAttribute('placeholder')) {
    params['forum'] = ge('forum').value;
  }
  each(['country', 'city'], function() {
    var value = intval(ge('' + this).value);
    if (value) {
      params['' + this] = value;
    }
  });
  var doneHandler = function(obj, text) {
    hide('save_progress');

    selData.city = ge('city').value;
    selData.country = ge('country').value;

    contacts.email   = ge('email').value;
    contacts.mobile  = ge('mobile').value;
    contacts.home    = ge('hometel').value;
    contacts.icq     = ge('icq').value;
    contacts.website = ge('website').value;
    contacts.nick    = ge('nick').value;
    contacts.forum   = (ge('forum').value == ge('forum').getAttribute('placeholder')) ? '' : ge('forum').value;

    showMessage(lang.global_changes_saved + '.', 'message');
    window.scroll(0, 0);
  }
  var hideHandler = function(obj, text) {
    hide('save_progress');
  }
  Ajax.postWithCaptcha('editProfile.php', params, {onSuccess: doneHandler, onCaptchaShow: hideHandler});
  return false;
}

function selectForum(i) {
  ge('forum').value = forums[i];
  ge('forum').active = 1;
  ge('forum').style.color = '#000';
  return false;
}

function addNickname() {
  hide('add_nick_row');
  show('nick_row');
  return false;
}

var uiSex, uiStatus, uiPartner, uiBday, uiBmonth, uiByear, uiBdayVisibility, uiPolitical, uiReligion, friendsFull = false, help_timeout = false;

var relations = [], rel_guid = 0, placeholders;
var rel_ids = {parent:0,sibling:0,child:0};
var rel_limits = {parent:2,sibling:15,child:15};
var conts = {parent:'parents',sibling:'siblings',child:'children'};

onDomReady(function(){
  if(window.general_data) {
    placeholders = {parent:getLang('profileEdit_parent_placeholder'),sibling:getLang('profileEdit_sibling_placeholder'),child:getLang('profileEdit_child_placeholder')};
    
    updateFamily(general_data.family);
  }
});

function updateFamily(family) {
  ge('parents').innerHTML = '';
  ge('siblings').innerHTML = '';
  ge('children').innerHTML = '';
  rel_guid = 0;
  rel_ids = {parent:0,sibling:0,child:0};
  relations = [];
  if(!family) return;
  each(family || [], function(i,v){
    var guid = rel_guid;
    sel = v.id > 0 ? v.id : [v.id, v.name, '', v.birth];
    addRelation(v.type, sel);
  });
}

function addRelation(type, selected) {
  if(!friends_list) {
    loadFriends(type, selected);
  } else {
    onFriendsLoaded(type, selected);
  }
}

function onFriendsLoaded(type, selected) {
  debugLog(1);
  var wrap = document.createElement('div');
  wrap.id = 'wrap_' + type + rel_guid;
  var withDate = type == 'child' && (!selected || selected[0] < 0);
  wrap.className = 'wrap_relation';
  var id = type + rel_guid;
  var html = '<div class="relation_input"><div class="fl_l"><input type="hidden" id="' + id + '" name="' + id + '"/></div><div class="fl_r" style="padding-top:3px;"><a href="" onclick="removeRelation(\'' + type + '\', ' + rel_guid + ');return false;">' + global_delete + '</a></div>';
  var t = 0;
  if(withDate) {
    t = selected ? parseInt(selected[3]) : 0;
    html += '<div class="relation_date"><input class="dateField" type="hidden" id="' + id + '_date" value="'+ t +'"><div class="bday"><input type="hidden" id="' + id + '_day"/></div><div class="bmonth"><input type="hidden" id="' + id + '_month"/></div><div class="byear"><input type="hidden" id="' + id + '_year"/></div></div>';
  }
  html += '</div><div class="relation_date"></div>';
  wrap.innerHTML = html;
  ge(conts[type]).appendChild(wrap);
  if(rel_ids[type] + 1 >= rel_limits[type]) {
    hide('add_'+type+'_link');
  } else {
    show('add_'+type+'_link');
  }
  debugLog(2);
  var relDD = new Selector(ge(type+rel_guid), friends_list, {width:220, placeholder:placeholders[type],introText: '', multiselect: false, enableCustom:true, defaultItems:friends_list, selectedItems:selected?[selected]:[], onChange:function(v){
    var p = ge(id+'_date').parentNode;
    if(v == -1) {
      show(p);
    } else {
      hide(p);
    }
  }});
  debugLog(3);
  if(withDate) {
    var d = new Date(t * 1000);
    
    var years = [[0,general_data.byears[0][1]]];
    var min_year = 1971;
    if(parseInt(general_data.byear)) {
      min_year = Math.max(min_year, parseInt(general_data.byear) + 10);
    }
    for(var i = min_year; i <= (new Date()).getFullYear(); i++) {
      years.push([i,i]);
    }
    
    var onDateChange = function() {
      var t = 0, d = dayDD.val(), y = yearDD.val(), m = monthDD.val();
      if (d > get_last_day(y, m)) {
        dayDD.val(1);
        d = 1;
      }
      dayDD.setData(generate_days(y, m));
      
      if(y) {
        var date = new Date(y, Math.max(m - 1, 0), Math.max(d, 1));
        t = Math.floor(date.getTime()/1000);
      }
      ge(id + '_date').value = t;
    }
    
    var dayDD   = new Dropdown(ge(id+'_day'), generate_days(d.getFullYear(), d.getMonth()+1), {width:55, selectedItems:t?d.getDate():0, onChange:onDateChange});
    var monthDD = new Dropdown(ge(id+'_month'), general_data.bmonths, {width:95, selectedItems:t?(d.getMonth()+1):0, onChange:onDateChange});
    var yearDD  = new Dropdown(ge(id+'_year'), years, {width:60, selectedItems:t?d.getFullYear():0, onChange:onDateChange});
  }
  rel_ids[type]++;
  rel_guid++;
  debugLog(4);
}

function removeRelation(type, id) {
  var wrap = ge('wrap_'+type+id);
  if(!wrap) return;
  wrap.parentNode.removeChild(wrap);
  var rel_id = type+id;
  if(rel_ids[type] - 1 >= rel_limits[type]) {
    hide('add_'+type+'_link');
  } else {
    show('add_'+type+'_link');
  }
  rel_ids[type]--;
}

function loadFriends(type, selected) {
  Ajax.Send('friends_ajax.php', {act:'custom',no_lists:1}, function(o,t){
    friends_list = eval('('+t+')');
    onFriendsLoaded(type, selected);
  });
}

function saveGeneral() {
  show('save_progress');
  var params = {act: 'a_general', hash: ge('hash').value};
  each(['sex', 'status', 'partner', 'bday', 'bmonth', 'byear', 'bday_visibility', 'political', 'religion'], function() {
    var value = intval(ge('' + this).value);
    if (value) {
      params['' + this] = value;
    }
  });
  each(['religion_custom', 'home_town'], function() {
    params['' + this] = ge('' + this).value;
  });
  var i = 1;
  each(geByClass('relation_input', ge('parents')), function() {
    params['parents['+i+']'] = geByClass('resultField', this)[0].value;
    params['parents_custom['+i+']'] = geByClass('customField', this)[0].value;
    if(params['parents['+i+']'] == -1 && params['parents_custom['+i+']']) {
      var name = params['parents_custom['+i+']'];
      var n = name.split(/\s+/);
      params['parents_custom['+i+']'] = cleanName(n[0]||'', n[1]||'').join(' ');
    }
    i++;
  });
  i = 1;
  each(geByClass('relation_input', ge('siblings')), function() {
    params['siblings['+i+']'] = geByClass('resultField', this)[0].value;
    params['siblings_custom['+i+']'] = geByClass('customField', this)[0].value;
    if(params['siblings['+i+']'] == -1 && params['siblings_custom['+i+']']) {
      var name = params['siblings_custom['+i+']'];
      var n = name.split(/\s+/);
      params['siblings_custom['+i+']'] = cleanName(n[0]||'', n[1]||'').join(' ');
    }
    i++;
  });
  i = 1;
  each(geByClass('relation_input', ge('children')), function() {
    params['children['+i+']'] = geByClass('resultField', this)[0].value;
    params['children_custom['+i+']'] = geByClass('customField', this)[0].value;
    params['children_date['+i+']'] = (geByClass('dateField', this)[0]||{value:0}).value;
    if(params['children['+i+']'] == -1 && params['children_custom['+i+']']) {
      var name = params['children_custom['+i+']'];
      var n = name.split(/\s+/);
      params['children_custom['+i+']'] = cleanName(n[0]||'', n[1]||'').join(' ');
    }
    i++;
  });
  var doneHandler = function(obj, text) {
    hide('save_progress');

    var response = eval('(' + text + ')');

    general_data.sex              = uiSex.val();
    general_data.status           = response.status;
    general_data.partner          = response.partner;
    general_data.bday             = uiBday.val();
    general_data.bmonth           = uiBmonth.val();
    general_data.byear            = uiByear.val();
    general_data.bday_visibility  = uiBdayVisibility.val();
    general_data.political        = uiPolitical.val();
    general_data.religion_id      = response.religion_id;
    general_data.religion         = response.religion;
    general_data.home_town        = ge('home_town').value;
    general_data.family           = response.family;

    uiStatus.val(response.status, true);
    uiPartner.val(response.partner, true);

    if (general_data.religion_id > 0 || !general_data.religion.length) {
      uiReligion.val(general_data.religion_id, true);
    } else {
      uiReligion.customVal(general_data.religion);
    }
    
    updateFamily(general_data.family);

    ge('status_detail_content').innerHTML = response.relation_text;
    if (general_data.partner) {
      show('status_detail');
    } else {
      hide('status_detail');
    }
    hide('status_help_wrap');
    
    showMessage(lang.global_changes_saved + '.', 'message');
    window.scroll(0, 0);
  }
  var hideHandler = function(obj, text) {
    hide('save_progress');
  }
  Ajax.postWithCaptcha('editProfile.php', params, {onSuccess: doneHandler, onCaptchaShow: hideHandler});
  return false;
}

function savePersonal() {
  show('save_progress');
  var params = {act: 'a_personal', hash: ge('hash').value};
  each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function() {
    params['' + this] = ge('' + this).value;
  });
  var doneHandler = function(obj, text) {
    hide('save_progress');

    var response = eval('(' + text + ')');

    each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function() {
      ge('' + this).value = personal_data['' + this] = winToUtf(response['' + this]);
      autosizes['' + this].update();
    });

    showMessage(lang.global_changes_saved + '.', 'message');
    window.scroll(0, 0);
  }
  var hideHandler = function(obj, text) {
    hide('save_progress');
  }
  Ajax.postWithCaptcha('editProfile.php', params, {onSuccess: doneHandler, onCaptchaShow: hideHandler});
  return false;
}

function get_last_day(year, month) {
  if (month == 2) {
    if (year % 4 == 0) {
      return 29;
    } else {
      return 28;
    }
  } else if (month > 0 && ((month < 8 && month % 2 == 0) || (month > 7 && month % 2 == 1))) {
    return 30;
  }
  return 31;
}

function generate_days(year, month) {
  var result = [[0, lang.profileEdit_main_sel_bday+':']], last = get_last_day(year, month);
  for (var i = 1; i <= last; ++i) {
    result.push([i, i + '']);
  }
  return result;
}

function update_days(year, month) {
  if (uiBday.val() > get_last_day(year, month)) {
    uiBday.clear();
  }
  uiBday.setData(generate_days(year, month));
}

function do_update_friends_list() {
  var status = uiStatus.val(), sex = uiSex.val();
  if (status < 2 || status > 5 || !sex) return;
  var casus = 'Abl';
  if (status == 2) {
    casus = 'Nom';
  } else if (status == 3 || (status == 4 && sex == 1) || status == 5) {
    casus = 'Ins';
  }
  var data = friendsFull[sex][casus];
  uiPartner.setData(data[1]);
  uiPartner.setOptions({defaultItems: data[0]});
  uiPartner.setOptions({placeholder: data[0][0][1]});
  uiPartner.val(uiPartner.val(), true);
}

function update_friends_list(to_do) {
  if (!friendsFull) {
    show('load_friends_progress');
    Ajax.Send('editProfile.php', {act: 'a_rel_friends'}, {onSuccess: function(obj, text) {
      hide('load_friends_progress');
      friendsFull = eval('(' + text + ')');
      for (var i = 1; i <= 2; ++i) {
        for (var j in friendsFull[i]) {
          var cropped_array = [];
          for (var k = 1; k < friendsFull[i][j].length; ++k) {
            cropped_array.push(friendsFull[i][j][k]);
          }
          friendsFull[i][j] = [friendsFull[i][j], cropped_array];
        }
      }
      do_update_friends_list();
      to_do();
    }});
  } else {
    do_update_friends_list();
    to_do();
  }
}

var personal_data = {}, autosizes = {};

onDomReady(function() {
  if (act == 'contacts') {
    selectsData.setCountries(selData.countries);
    selectsData.setCities(selData.country, selData.cities);

    var uiCity = new CitySelect(ge('city'), ge('city_row'), {
      width: 170,
      progressBar: 'selProgress',
      country: selData.country,
      city: selData.city_val
    });

    var uiCountry = new CountrySelect(ge('country'), ge('country_row'), {
      width: 170,
      progressBar: 'selProgress',
      country: selData.country_val,
      citySelect: uiCity
    });

    ge('email').value = contacts.email;
    ge('mobile').value = contacts.mobile;
    ge('hometel').value = contacts.home;
    ge('icq').value = contacts.icq;
    ge('website').value = contacts.website;
    ge('nick').value = contacts.nick;
    ge('forum').value = contacts.forum;

    if (ge('nick').value.length) {
      show('nick_row');
    } else {
//      show('add_nick_row');
    }

    var forums_text = '';
    for (var i in forums) {
      forums_text += '<a href="#' + forums[i] + '" onclick="return selectForum(' + i + ')" onfocus="this.blur()">' + forums[i] + '</a>';
    }
    ge('forums').innerHTML = forums_text;

    placeholderSetup('forum');

    show('contacts');
  } else if (act == 'general') {
    uiSex = new Dropdown(ge('sex'), general_data.sexes, {
      width: 220,
      multiselect: false,
      selectedItems: general_data.sex,
      onChange: function(value) {
        hide('status_prep', 'status_partner', 'status_help_wrap', 'status_detail');
        clearTimeout(help_timeout);
        uiPartner.clear();
        uiStatus.clear();
        if (intval(value)) {
          show('status_row');
          uiStatus.setData(general_data.statuses[intval(value)]);
        } else {
          hide('status_row');
        }
      }
    });

    var handlePartnerChange = function(value) {
      if (!uiSex.val()) {
        return;
      }
      clearTimeout(help_timeout);
      if (intval(value) && uiStatus.val() > 1 && uiStatus.val() < 6) {
        if (intval(value) == general_data.partner) {
          fadeOut(ge('status_help_wrap'), 500);
          show('status_detail');
        } else {
          ge('status_help_content').innerHTML = general_data.status_helps[3 - uiSex.val()];
          var real_left = getXY(ge('status_partner'))[0];
          var left = isVisible(ge('status_prep')) ? getXY(ge('status_prep'))[0] : real_left;
          if (browser.msie6) {
            ++left;
            ++real_left;
          }
          ge('status_help_wrap').style.left = left + 'px';
          ge('status_help_wrap').style.paddingLeft = (real_left - left) + 'px';
          fadeIn(ge('status_help_wrap'), 500);
          help_timeout = setTimeout(function() { fadeOut(ge('status_help_wrap'), 500); }, 5000);
          hide('status_detail');
        }
      } else {
        if (!intval(value)) {
          uiPartner.clear();
        }
        fadeOut(ge('status_help_wrap'), 500);
        hide('status_detail');
      }
    }

    uiStatus = new Dropdown(ge('status'), general_data.statuses[general_data.sex], {
      width: 220,
      multiselect: false,
      selectedItems: general_data.status,
      onChange: function(value) {
        value = intval(value);
        if (value > 1 && value < 6) {
          update_friends_list(function() {
            show('status_partner');
            if (general_data.prepositions[value][uiSex.val()].length) {
              ge('status_prep').innerHTML = general_data.prepositions[value][uiSex.val()];
              show('status_prep');
            } else {
              hide('status_prep');
            }
            handlePartnerChange(uiPartner.val());
          });
        } else {
          hide('status_partner', 'status_prep');
          handlePartnerChange(uiPartner.val());
        }
      }
    });

    uiPartner = new Dropdown(ge('partner'), general_data.partners, {
      width: 180,
      multiselect: false,
      autocomplete: true,
      placeholder: general_data.partners[0][1],
      placeholderColor: '#000',
      noResult: '',
      introText: '',
      selectedItems: general_data.partner,
      onChange: handlePartnerChange
    });

    if (general_data.sex) {
      show('status_row');
      if (general_data.status > 1 && general_data.status < 6) {
        if (general_data.prepositions[general_data.status][general_data.sex].length) {
          ge('status_prep').innerHTML = general_data.prepositions[general_data.status][general_data.sex];
          show('status_prep');
        }
        show('status_partner');
      }
    }
    if (general_data.partner) {
      show('status_detail');
    }

    uiBday = new Dropdown(ge('bday'), generate_days(general_data.byear, general_data.bmonth), {
      width: 55,
      multiselect: false,
      selectedItems: general_data.bday
    });

    uiBmonth = new Dropdown(ge('bmonth'), general_data.bmonths, {
      width: 95,
      multiselect: false,
      selectedItems: general_data.bmonth,
      onChange: function(value) {
        update_days(uiByear.val(), value);
      }
    });

    uiByear = new Dropdown(ge('byear'), general_data.byears, {
      width: 60,
      multiselect: false,
      selectedItems: general_data.byear,
      onChange: function(value) {
        update_days(value, uiBmonth.val());
      }
    });

    uiBdayVisibility = new Dropdown(ge('bday_visibility'), general_data.bday_visibilities, {
      width: 220,
      multiselect: false,
      selectedItems: general_data.bday_visibility
    });

    ge('home_town').value = general_data.home_town;

    uiPolitical = new Dropdown(ge('political'), general_data.political_views, {
      width: 220,
      multiselect: false,
      selectedItems: general_data.political
    });

    uiReligion = new Selector(ge('religion'), '', {
      width: 220,
      dropdown: false,
      multiselect: false,
      enableCustom: true,
      introText: '',
      noResult: '',
      placeholder: lang.profileEdit_main_sel_relig,
      placeholderColor: '#000',
      onChange: function(value) {
        if (!intval(value)) {
          uiReligion.clear();
        }
      }
    });
    uiReligion.setData(general_data.religions);
    if (general_data.religion_id > 0 || !general_data.religion.length) {
      uiReligion.val(general_data.religion_id, true);
    } else {
      uiReligion.customVal(general_data.religion);
    }
  } else if (act == 'personal') {
    show('personal');
    each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function() {
      personal_data['' + this] = ge('' + this).value;
      autosizes['' + this] = new Autosize(ge('' + this), { minHeight: 80 });
    });
  }
});

function showMessage(message, cl) {
  ge('messageWrap').innerHTML = '<div class="' + cl + '">' + message + '</div>';
  show('messageWrap');
  setTimeout(function() {
    animate(ge('messageWrap').firstChild, {backgroundColor: '#FFFFFF', borderBottomColor: '#D8DFEA', borderLeftColor: '#D8DFEA', borderRightColor: '#D8DFEA', borderTopColor: '#D8DFEA'}, 1000);
  }, 1000);
}

function hideMessage() {
  hide('messageWrap');
}

function wereChanges() {
  if (act == 'contacts') {
    return intval(ge('country').value) != selData.country || intval(ge('city').value) != selData.city ||
           ge('email').value != contacts.email || ge('mobile').value != contacts.mobile ||
           ge('hometel').value != contacts.home || ge('icq').value != contacts.icq ||
           ge('website').value != contacts.website || ge('nick').value != contacts.nick ||
          (ge('forum').value != contacts.forum && (contacts.forum || ge('forum').value != ge('forum').getAttribute('placeholder')));
  } else if (act == 'general') {
    return ge('sex').value != general_data.sex || ge('status').value != general_data.status ||
           ge('partner').value != general_data.partner || ge('bday').value != general_data.bday ||
           ge('bmonth').value != general_data.bmonth || ge('byear').value != general_data.byear ||
           ge('bday_visibility').value != general_data.bday_visibility || ge('political').value != general_data.political ||
           ge('home_town').value != general_data.home_town ||
          (uiReligion.val_full()[1].toLowerCase() != general_data.religion.toLowerCase() && (uiReligion.val() != 0 || general_data.religion != ''));
  } else if (act == 'personal') {
    var result = false;
    each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function() {
      result |= (personal_data['' + this].replace(/\x0d/g, '') != ge('' + this).value.replace(/\x0d/g, ''));
    });
    return result;
  }
}

var leaving = false;
var sure_box = false;
function checkChanges(showBox) {
  if (leaving) return;
  var message = false;
  if (wereChanges()) {
    if (act == 'contacts') {
      message = lang.profileEdit_contacts_changed;
    } else if (act == 'general') {
      message = lang.profileEdit_general_changed;
    } else if (act == 'personal') {
      message = lang.profileEdit_personal_changed;
    }
  }
  if (showBox === 1) {
    if (message) {
      if (!sure_box) {
        sure_box = new MessageBox({title: lang.global_warning});
        sure_box.addButton({label: lang.global_cancel, style: 'button_no', onClick: function() {
          sure_box.hide();
        }});
        sure_box.addButton({label: lang.global_continue, onClick: function() {
          leaving = true;
          location.replace('/');
        }});
      }
      sure_box.content(message);
      sure_box.show();
      return false;
    }
    return true;
  }
  if (message) {
    return winToUtf(message);
  }
}

window.onbeforeunload = checkChanges;
