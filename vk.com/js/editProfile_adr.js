function genAddressStr(address) {
  var result = [];
  if (address.city) {
    result.push(address.city_val[1]);
  }
  if (address.street) {
    result.push(address.street_val[1]);
  }
  if (address.house) {
    result.push(address.house_val[1]);
  }
  if (result.length) {
    return '<div>' + result.join(', ') + '</div>';
  }
  return '';
}

function genDetailsStr(address) {
  var result = [];
  if (address.district) {
    result.push(address.districtName + ' ' + lang.profileEdit_places_district);
  }
  if (address.station) {
    result.push(lang.profileEdit_places_station + ' ' + address.stationName);
  }
  if (result.length) {
    return '<div>' + result.join(', ') + '</div>';
  }
  return '';
}

function genPlaceStr(address) {
  var result = [];
  if (address.place) {
    result.push(address.place_val[1]);
  }
  if (address.since && address.until && address.since != 1000000 && address.until != 1000000) {
    result.push(getLang('profileEdit_years_from_to').replace('{start}', address.since).replace('{end}', address.until));
  } else if (address.since && address.since != 1000000) {
    result.push(getLang('profileEdit_years_from').replace('%s', address.since));
  } else if (address.until && address.until != 1000000) {
    result.push(getLang('profileEdit_years_to').replace('%s', address.until));
  }
  if (result.length) {
    return '<div>' + result.join(', ') + '</div>';
  }
  return '';
}

function genAddressRow(address) {
  var elem = document.createElement('div');
  elem.id = 'address' + address.id;
  elem.className = 'row';

  var place_str = genPlaceStr(address);
  var address_str = genAddressStr(address);
  var details_str = genDetailsStr(address);
  var str = (address.type == 1) ? (address_str + details_str + place_str) : (place_str + address_str + details_str);

  var links = '<div class="actions">' + 
                '<a href="#edit" onclick="return editAddress(' + address.id + ')">' + lang.global_edit + '</a>' +
                '<a href="#delete" onclick="return deleteAddress(' + address.id + ')">' + lang.global_delete + '</a>' + 
              '</div>';
   
  elem.innerHTML = links + '<div class="typeName">' + address.typeName + '</div><div class="lines">' + str + '</div>';
  return elem;
}

var uiPlaceType, uiCountry, uiCity, uiDistrict, uiStation, uiStreet, uiHouse, uiPlace, uiSince, uiUntil;
var editBox = null;
function initEditBox() {
  if (editBox) {
    return;
  }
  editBox = document.createElement('div');
  editBox.style.display = 'none';
  
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(editBox);

  var test = document.createElement('div');
  test.innerHTML = '<table cellspacing="0" cellpadding="0">' +
                     '<tr><td style="width: 1px">' + lang.select_time_from + '</td></tr>' +
                     '<tr><td style="width: 1px">' + lang.select_time_until + '</td></tr>' +
                   '</table>';
  body.appendChild(test);
  var sinceUntilWidth = test.getElementsByTagName('td')[0].offsetWidth;
  body.removeChild(test);
  delete test;

  var genRow = function(label, name, additional) {
    if (!additional) {
      additional = '';
    }
    return '<div class="row" id="' + name + '_row">' + 
             '<div class="label fl_l ta_r">' + label + '</div>' +
             '<div class="labeled fl_l"><input id="' + name + '" name="' + name + '" /></div>' + additional + 
           '</div>';
  }
  var content = '<div id="placeEditor">' +
                  genRow(lang.select_place_type, 'type', '<img src="/images/upload.gif" id="progress" />') +
                  '<div id="placeDetails">' +
                    genRow(lang.select_country, 'country') +
                    genRow(lang.select_city, 'city') +
                    genRow(lang.select_district, 'district') +
                    genRow(lang.select_station, 'station') +
                    genRow(lang.select_street, 'street') +
                    genRow(lang.select_house, 'house') +
                    genRow(lang.select_place, 'place') + 
                    '<div class="row" id="since_row">' +
                      '<div class="label fl_l ta_r">' + lang.select_time_period + '</div>' + 
                      '<div class="labeled fl_l">' +
                        '<div class="since_until fl_l ta_r" style="width: ' + sinceUntilWidth + 'px">' + lang.select_time_from + '</div>' + 
                        '<div class="fl_l"><input id="since" name="since" /></div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="row" id="until_row">' +
                      '<div class="label fl_l ta_r"></div><div class="labeled fl_l">' +
                        '<div class="since_until fl_l ta_r" style="width: ' + sinceUntilWidth + 'px">' + lang.select_time_until + '</div>' + 
                        '<div class="fl_l"><input id="until" name="until" /></div>' +
                      '</div>' +
                    '</div>' +
                  '</div><div style="clear: both"></div>' +
                  '<div id="buttons">' + 
                    '<ul class="nNav">' +
                      '<li style="margin: 0px">' +
                        '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' +
                        '<span class="ncc"><a href="#save" onclick="return saveEdit();">' + lang.global_save + '</a></span>' +
                        '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' +
                      '</li>' +
                      '<li>' +
                        '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' +
                        '<span class="ncc"><a href="/" onclick="return hideEditAddressBox();">' + lang.global_cancel + '</a></span>' +
                        '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' +
                      '</li>' +
                    '</ul>' +
                    '<img src="images/upload.gif" id="save_progress"/>' +
                  '</div>' +
                '</div>';
  editBox.innerHTML = content;

  uiSince = new Dropdown(ge('since'), [[0, getLang('select_place_time_not_selected')]].concat(selData.since_years), {
    width: 200 - (sinceUntilWidth + 5),
    autocomplete: true,
    placeholder: getLang('select_place_time_not_selected'),
    placeholderColor: '#000',
    noResult: getLang('select_year_not_found'),
    onChange: function(value) {
      value = intval(value);
      var new_until_data = [];
      if (!value) {
        uiSince.clear();
        new_until_data = selData.until_years;
      } else {
        var until_value = intval(uiUntil.val());
        if (until_value && until_value < value) {
          uiUntil.val(value);
        }
        for (var i = 0; i < selData.until_years.length; ++i) {
          if (selData.until_years[i][0] >= value) {
            new_until_data.push(selData.until_years[i]);
          }
        }
      }
      uiUntil.setOptions({defaultItems: [[0, getLang('select_place_time_not_selected')]].concat(new_until_data)});
      uiUntil.setData(new_until_data);
    }
  });
  uiSince.setData(selData.since_years);
  uiUntil = new Dropdown(ge('until'), [[0, getLang('select_place_time_not_selected')]].concat(selData.until_years), {
    width: 200 - (sinceUntilWidth + 5),
    autocomplete: true,
    placeholder: getLang('select_place_time_not_selected'),
    placeholderColor: '#000',
    noResult: getLang('select_year_not_found'),
    onChange: function(value) {
      value = intval(value);
      var new_since_data = [];
      if (!value) {
        uiUntil.clear();
        new_since_data = selData.since_years;
      } else {
        var since_value = intval(uiSince.val());
        if (since_value && since_value > value) {
          uiSince.val(value);
        }
        for (var i = 0; i < selData.since_years.length; ++i) {
          if (selData.since_years[i][0] <= value) {
            new_since_data.push(selData.since_years[i]);
          }
        }
      }
      uiSince.setOptions({defaultItems: [[0, getLang('select_place_time_not_selected')]].concat(new_since_data)});
      uiSince.setData(new_since_data);
    }
  });
  uiUntil.setData(selData.until_years);
  uiPlace = new PlaceSelect(ge('place'), ge('place_row'), {
    width: 200,
    progressBar: 'progress',
    onChange: function(value) {
      var full = uiPlace.val_full();
      if (full && isArray(full[3]) && intval(full[3][0])) {
        uiStreet.val(full[3], true);
      }
      if (full && isArray(full[4]) && intval(full[4][0])) {
        uiHouse.val(full[4], true);
      }          
    }
  });
  uiHouse = new HouseSelect(ge('house'), ge('house_row'), {
    width: 200,
    progressBar: 'progress'
  });
  uiStreet = new StreetSelect(ge('street'), ge('street_row'), {
    width: 200,
    progressBar: 'progress',
    houseSelect: uiHouse,
    placeSelect: uiPlace
  });
  uiDistrict = new DistrictSelect(ge('district'), ge('district_row'), {
    width: 200,
    progressBar: 'progress'
  });
  uiStation = new StationSelect(ge('station'), ge('station_row'), {
    width: 200,
    progressBar: 'progress'
  });
  uiCity = new CitySelect(ge('city'), ge('city_row'), {
    width: 200,
    progressBar: 'progress',
    districtSelect: uiDistrict,
    stationSelect: uiStation,
    streetSelect: uiStreet,
    placeSelect: uiPlace
  });
  uiCountry = new CountrySelect(ge('country'), ge('country_row'), {
    width: 200,
    progressBar: 'progress',
    citySelect: uiCity
  });
  uiPlaceType = new Dropdown(ge('type'), selData.place_types, {
    width: 200,
    testing: true,
    autocomplete: true,
    placeholder: getLang('select_place_type_not_selected'),
    placeholderColor: '#000',
    introText: getLang('select_place_type_select'),
    noResult: getLang('select_place_type_not_found'),
    onChange: function(value) {
      value = intval(value);
      if (value) {
        show('placeDetails');
      } else {
        hide('placeDetails');
        uiPlaceType.clear();
      }
    }
  });
}

onDomReady(function() {
  if (!demo) {
    selectsData.setCountries(selData.countries_list);
    for (var i in selData.countries) {
      selectsData.setCities(i, selData.countries[i]);
    }
    for (var i in selData.cities) {
      selectsData.setCityInfo(i, selData.cities[i]);
    }
  }

  for (var i in placeCategories) {
    ge('addresses').innerHTML += '<div id="category' + i + '" class="placeCategory">' +
                                '<div class="header">' + placeCategories[i].name + '</div>' +
                                '<div class="addresses"></div><div class="separator"><div></div></div>' +
                              '</div>';

    var placesNode = geByClass('addresses', ge('category' + i))[0];
    var addresses = placeCategories[i].addresses;
    for (var j = 0; j < addresses.length; ++j) {
      placesNode.appendChild(genAddressRow(addresses[j]));
      ++addressCount;
    }
    if (addresses.length) {
      show('category' + i);
    }
  }

  initEditBox();

  if (addressCount >= 30) {
    disableAddAddress();
  } else if (!addressCount) {
    show('no_addresses');
  }
});

function disableAddAddress() {
  hide('add_address_link');
  for (var i = 9; i > 0; --i) {
    if (isVisible(ge('category' + i))) {
      geByClass('separator', ge('category' + i))[0].style.visibility = 'hidden';
      return;
    }
  }
}

function enableAddAddress() {
  show('add_address_link');
  each(geByClass('separator', ge('addresses')), function() { this.style.visibility = 'visible'; });
}

function getAddressById(address_id) {
  for (var i in placeCategories) {
    for (var j = 0; j < placeCategories[i].addresses.length; ++j) {
      if (placeCategories[i].addresses[j].id == address_id) {
        return placeCategories[i].addresses[j];
      }
    }
  }
}

var editingItem = 0;

var sure_box = false;
function checkChanges(showBox, next_to_edit) {
  if (!editingItem) {
    if (showBox === 1) {
      return false;
    }
    return;
  }
  var message = false;
  if (editingItem < 0) {
    if (uiPlaceType.val()) {
      message = lang.profileEdit_new_address_changed;
    }
  } else {
    var address = getAddressById(editingItem);
    if (address && (
        address.type    != uiPlaceType.val() || address.country  != uiCountry.val()  ||
        address.city    != uiCity.val()      || address.district != uiDistrict.val() ||
        address.station != uiStation.val()   || address.street   != uiStreet.val()   ||
        address.house   != uiHouse.val()     || address.place    != uiPlace.val()    ||
        address.since   != uiSince.val()     || address.until    != uiUntil.val())) {
      message = lang.profileEdit_address_changed;
    }
  }
  if (showBox === 1) {
    if (message) {
      if (!sure_box) {
        sure_box = new MessageBox({title: lang.global_warning});
      }
      sure_box.removeButtons();
      sure_box.addButton({label: lang.global_cancel, style: 'button_no', onClick: function() {
        sure_box.hide();
      }});
      sure_box.addButton({label: lang.global_continue, onClick: function() {
        sure_box.hide();
        hideEditAddressBox();
        showEditAddressBox(next_to_edit[0], next_to_edit[1], next_to_edit[2], true);
      }});
      sure_box.content(message);
      sure_box.show();
      return true;
    }
    return false;
  }
  if (message) {
    return winToUtf(message);
  }
}

window.onbeforeunload = checkChanges;

function hideEditAddressBox() {
  return showEditAddressBox({id: 0});
}

function saveEdit() {
  var address_id = editingItem;
  show('save_progress');
  var doneHandler = function(obj, text) {
    hide('save_progress');
    var response = eval('(' + text + ')');
    if (response.deleted) {
      if (address_id > 0) {
        addressDeleted(address_id);
      }
    } else {
      var placesNode = geByClass('addresses', ge('category' + response.category))[0];
      if (address_id > 0) {
        var addresses = placeCategories[response.category].addresses;
        for (var i = 0; i < addresses.length; ++i) {
          if (addresses[i].id == address_id) {
            addresses[i] = response;
          }
        }
        placesNode.replaceChild(genAddressRow(response), ge('address' + address_id));
      } else {
        placeCategories[response.category].addresses.push(response);
        placesNode.appendChild(genAddressRow(response));
        show('category' + response.category);

        ++addressCount;
        if (addressCount >= 30) {
          disableAddAddress();
        }

        hide('no_addresses');
      }
    }
    hideEditAddressBox();
  }
  var hideHandler = function(obj, text) {
    hide('save_progress');
  }
  var params = {
    act          : 'a_edit_address',
    hash         : ge('hash').value,
    aid          : address_id,
    type         : uiPlaceType.val(),
    country      : uiCountry.val(),
    city         : uiCity.val(),
    district     : uiDistrict.val(),
    station      : uiStation.val(),
    street       : uiStreet.val(),
    street_custom: uiStreet.customVal(),
    house        : uiHouse.val(),
    house_custom : uiHouse.customVal(),
    place        : uiPlace.val(),
    place_custom : uiPlace.customVal(),
    since        : uiSince.val(),
    until        : uiUntil.val()
  };
  Ajax.postWithCaptcha('editProfile.php', params, {onSuccess: doneHandler, onCaptchaShow: hideHandler});
  return false;
}

function showEditAddressBox(address, title, label, ignoreChanges) {
  if (!ignoreChanges && address.id && checkChanges(1, [address, title, label])) {
    return false;
  }
  if (editingItem > 0) {
    show('address' + editingItem);
  } else if (editingItem) {
    show('add_address_link');
  }
  removeEvent(window, 'keydown');
  editingItem = 0;
  if (!address.id) {
    hide(editBox);
    return false;
  }
  addEvent(window, 'keydown', function(event) {
    if (event.keyCode == 27) {
      hideEditAddressBox();
    }
  });
  if (address.id > 0) {
    var addresses = geByClass('addresses', ge('category' + address.category))[0];
    addresses.insertBefore(editBox.parentNode.removeChild(editBox), ge('address' + address.id));
    hide('address' + address.id);
    editingItem = address.id;
  } else {
    ge('add_address_link').parentNode.insertBefore(editBox.parentNode.removeChild(editBox), ge('add_address_link'));
    hide('add_address_link');
    editingItem = -1;
  }

  uiPlaceType.val(address.type, true);
  uiCountry.val(address.country_val, true);
  uiCity.val(address.city_val, true);
  uiDistrict.val(address.district, true);
  uiStation.val(address.station, true);
  uiStreet.val(address.street_val, true);
  uiHouse.val(address.house_val, true);
  uiPlace.val(address.place_val, true);
  uiSince.val(address.since, true);
  uiUntil.val(address.until, true);

  show(editBox);

  return false;
}

function editAddress(id) {
  showEditAddressBox(getAddressById(id), lang.profileEdit_addr_edition, lang.global_save);
  return false;
}

function addressDeleted(id) {
  --addressCount;
  enableAddAddress();
  var addressNode = ge('address' + id);
  for (var i = 0; i < addressNode.childNodes.length; ++i) {
    var child = addressNode.childNodes[i];
    if (child.className == 'actions') {
      child.innerHTML = '<a href="#cancel" onclick="return restoreAddress(' + id + ')">' + lang.global_cancel + '</a>';
    } else {
      setStyle(child, 'opacity', 0.2);
    }
  }
}

function deleteAddress(id) {
  geByClass('actions', ge('address' + id))[0].innerHTML = '<img src="images/upload.gif" />';
  var ajax = new Ajax();
  ajax.onDone = function() {
    addressDeleted(id);
  }
  ajax.post('editProfile.php', {act: 'a_edit_address', hash: ge('hash').value, aid: id}); // type not passed => deleted
  return false;    
}

function restoreAddress(id) {
  if (addressCount >= 30) {
    return false;
  }
  geByClass('actions', ge('address' + id))[0].innerHTML = '<img src="images/upload.gif" />';
  var ajax = new Ajax();
  ajax.onDone = function() {
    var addressNode = ge('address' + id);
    for (var i = 0; i < addressNode.childNodes.length; ++i) {
      var child = addressNode.childNodes[i];
      if (child.className == 'actions') {
        child.innerHTML = '<a href="#edit" onclick="return editAddress(' + id + ')">' + lang.global_edit + '</a>' +
                          '<a href="#delete" onclick="return deleteAddress(' + id + ')">' + lang.global_delete + '</a>';
      } else {
        setStyle(child, 'opacity', 1);
      }
    }
    ++addressCount;
    if (addressCount >= 30) {
      disableAddAddress();
    }
  }
  ajax.post('editProfile.php', {act: 'a_restore_address', hash: ge('hash').value, aid: id});
  return false;    
}

function addAddress() {
  showEditAddressBox({
   id: -1,
    type: 0,
    country: selData.mem.country,
    country_val: selData.mem.country_val,
    city: selData.mem.city,
    city_val: selData.mem.city_val,
    district: 0,
    station: 0,
    street: 0,
    street_val: '',
    house: 0,
    house_val: '',
    place: 0,
    place_val: '',
    since: 0,
    until: 0
  }, lang.profileEdit_addr_addition, lang.global_add);
  return false;
}