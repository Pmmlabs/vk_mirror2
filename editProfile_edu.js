var globalCounter = 0;
var unisCount = 0;
var shoolsCount = 0;

function genOneRow(prefix, field, id, label, params, additional) {
  var key = prefix + '_' + field + id;
  if (!params) {
    params = '';
  }
  if (!additional) {
    additional = '';
  }
  return '<div class="row" id="row_' + key + '">' +
            '<div class="label fl_l ta_r">' + label + '</div>' +
            '<div class="labeled fl_l"><input id="' + key + '" name="' + key + '" ' + params + '/></div>' +
         additional + '</div>';
}

function genUniRow(uni_id, no_delete) {
  var elem = document.createElement('div');
  elem.className = 'bigRow';
  elem.id = 'uni' + uni_id;
  elem.style.display = 'none';
  var delete_link = '<a class="fl_r" href="#delete" onclick="return deleteUniversity(' + uni_id + ')">' + lang.global_delete + '</a>';
  if (no_delete) {
    delete_link = '';
  }
  elem.innerHTML = '<div id="uni_content' + uni_id + '">' +
    genOneRow('u', 'country', uni_id, lang.select_country, '',
    '<img src="/images/upload.gif" id="u_progress' + uni_id + '" />' + delete_link) +
    genOneRow('u', 'city', uni_id, lang.select_city) +
    genOneRow('u', 'university', uni_id, lang.select_university, '',
    '<span class="add_item_link fl_l" id="u_add_uni_to_db' + uni_id + '"><b><a href="#add" onclick="return addUniversityToDB(' + uni_id + ')">' + lang.profileEdit_uni_not_in_db + '</a></b></span>') +
    genOneRow('u', 'faculty', uni_id, lang.select_faculty, '',
    '<span class="add_item_link fl_l" id="u_add_fac_to_db' + uni_id + '"><b><a href="#add" onclick="return addFacultyToDB(' + uni_id + ')">' + lang.profileEdit_fac_not_in_db + '</a></b></span>') +
    genOneRow('u', 'chair', uni_id, lang.select_chair, '',
    '<span class="add_item_link fl_l" id="u_add_chair_to_db' + uni_id + '"><b><a href="#add" onclick="return addChairToDB(' + uni_id + ')">' + lang.profileEdit_chair_not_in_db + '</a></b></span>') +
    '<div id="u_details' + uni_id + '" style="display: none">' +
      genOneRow('u', 'edu_form', uni_id, lang.select_eduform) +
      genOneRow('u', 'edu_status', uni_id, lang.select_edustatus) +
      genOneRow('u', 'graduation', uni_id, lang.select_graduation) +
    '</div></div>' +
    '<div class="deleted" id="uni_deleted' + uni_id + '"><div></div>' +
      '<a class="fl_r" href="#restore" onclick="return restoreUniversity(' + uni_id + ')">' + lang.global_dont_delete + '</a>' +
    '</div><div class="separator"><div></div></div>';
  return elem;
}

function get_by_id(elem, id) {
  if (elem.id == id) {
    return elem;
  }
  for (var i = 0; i < elem.childNodes.length; ++i) {
    var result = get_by_id(elem.childNodes[i], id);
    if (result) {
      return result;
    }
  }
  return false;
}

function initUniRow(uni, elem) {
  var g = elem ? function(id) { return get_by_id(elem, id); } : ge;
  uni.uiEducationForm = new EducationFormSelect(g('u_edu_form' + uni.id), g('row_u_edu_form' + uni.id), {
    width: 200,
    country: uni.country,
    university: uni.university,
    edu_form: uni.edu_form
  });
  uni.uiEducationStatus = new EducationStatusSelect(g('u_edu_status' + uni.id), g('row_u_edu_status' + uni.id), {
    width: 200,
    country: uni.country,
    university: uni.university,
    edu_status: uni.edu_status
  });
  uni.uiGraduation = new Dropdown(g('u_graduation' + uni.id), selData.graduations, {
    width: 200,
    autocomplete: true,
    placeholder: getLang('select_year_not_selected'),
    placeholderColor: '#000',
    noResult: getLang('select_year_not_found'),
    selectedItems: uni.graduation,
    onChange: function(value) {
      if (!intval(value)) {
        uiGraduation.clear();
      }
    }
  });

  uni.uiChair = new ChairSelect(g('u_chair' + uni.id), g('row_u_chair' + uni.id), {
    width: 200,
    progressBar: 'u_progress' + uni.id,
    faculty: uni.faculty,
    chair: uni.chair,
//    ignoreVoidList: (uni.country > 3),
    onEnableCustomChange: function(enable) {
      var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
      var chair = uni.uiChair ? uni.uiChair.val() : uni.chair;
      if ((uni.showAddChair = (!enable && country > 3)) && !intval(chair)) {
        show('u_add_chair_to_db' + uni.id);
      } else {
        hide('u_add_chair_to_db' + uni.id);
      }
    },
    onChange: function(value) {
      if (!intval(value)) {
        if (uni.showAddChair) {
          show('u_add_chair_to_db' + uni.id);
        }
      } else {
        hide('u_add_chair_to_db' + uni.id);
      }
    }
  });
  uni.uiFaculty = new FacultySelect(g('u_faculty' + uni.id), g('row_u_faculty' + uni.id), {
    width: 200,
    progressBar: 'u_progress' + uni.id,
    university: uni.university,
    faculty: uni.faculty,
    chairSelect: uni.uiChair,
//    ignoreVoidList: (uni.country > 3),
    onEnableCustomChange: function(enable) {
      var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
      var faculty = uni.uiFaculty ? uni.uiFaculty.val() : uni.faculty;
      if ((uni.showAddFaculty = (!enable && country > 3)) && !intval(faculty)) {
        show('u_add_fac_to_db' + uni.id);
      } else {
        hide('u_add_fac_to_db' + uni.id);
      }
    },
    onChange: function(value) {
      if (!intval(value)) {
        if (uni.showAddFaculty) {
          show('u_add_fac_to_db' + uni.id);
        }
      } else {
        hide('u_add_fac_to_db' + uni.id);
      }
    }
  });
  // uni.uiUniversity = new UniversitySelect(g('u_university' + uni.id), g('row_u_university' + uni.id), {
  uni.uiUniversity = new UniversityHintSelect(g('u_university' + uni.id), g('row_u_university' + uni.id), {
    width: 200,
    progressBar: 'u_progress' + uni.id,
    city: uni.city,
    university: uni.university,
    eduFormSelect: uni.uiEducationForm,
    eduStatusSelect: uni.uiEducationStatus,
    facultySelect: uni.uiFaculty,
//    ignoreVoidList: (uni.country > 3),
    onEnableCustomChange: function(enable) {
      var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
      var university = uni.uiUniversity ? uni.uiUniversity.val() : uni.university;
      if ((uni.showAddUni = (!enable && country > 3)) && !intval(university)) {
        show('u_add_uni_to_db' + uni.id);
      } else {
        hide('u_add_uni_to_db' + uni.id);
      }
    },
    onChange: function(value) {
      if (!intval(value)) {
        hide('u_details' + uni.id);
        if (uni.showAddUni) {
          show('u_add_uni_to_db' + uni.id);
        }
      } else {
        show('u_details' + uni.id);
        hide('u_add_uni_to_db' + uni.id);
      }
      uni.uiEducationForm.clear();
      uni.uiEducationStatus.clear();
      uni.uiGraduation.clear();
    }
  });
  uni.uiCity = new CitySelect(g('u_city' + uni.id), g('row_u_city' + uni.id), {
    width: 200,
    progressBar: 'u_progress' + uni.id,
    country: uni.country,
    city: uni.city_val,
    universitySelect: uni.uiUniversity
  });
  uni.uiCountry = new CountrySelect(g('u_country' + uni.id), g('row_u_country' + uni.id), {
    width: 200,
    progressBar: 'u_progress' + uni.id,
    country: uni.country_val,
    eduFormSelect: uni.uiEducationForm,
    eduStatusSelect: uni.uiEducationStatus,
    citySelect: uni.uiCity,
    onChange: function(value) {
//      var new_options = {ignoreVoidList: intval(value) > 3};
//      uni.uiUniversity.setOptions(new_options);
//      uni.uiFaculty.setOptions(new_options);
//      uni.uiChair.setOptions(new_options);
    }
  });

  g('uni' + uni.id).style.display = 'block';
  if (uni.university) {
    g('u_details' + uni.id).style.display = 'block';
  }

  return uni;
}

function genOneSchoolRow(id) {
  var key = 's_school' + id;
  return '<div class="row" id="row_' + key + '"><div class="label fl_l ta_r">' + lang.select_school + '</div>' +
           '<div class="labeled fl_l">' +
             // '<div class="school_type_row" id="row_s_school_type' + id + '"><input id="s_school_type' + id + '" name="s_school_type' + id + '" /></div>' +
             '<div class="school_row"><input id="' + key + '" name="' + key + '" /></div>' +
           '</div>' +
           '<span class="add_item_link fl_l" id="s_add_school_to_db' + id + '"><b><a href="#add" onclick="return addSchoolToDB(' + id + ')">' + lang.profileEdit_school_not_in_db + '</a></b></span>' +
         '</div>';
}

function genSchoolRow(school_id) {
  var elem = document.createElement('div');
  elem.className = 'bigRow';
  elem.id = 'school' + school_id;
  elem.style.display = 'none';
  elem.innerHTML = '<div id="school_content' + school_id + '">' +
    genOneRow('s', 'country', school_id, lang.select_country, '',
    '<img src="/images/upload.gif" id="s_progress' + school_id + '" />' +
    '<a class="fl_r" href="#delete" onclick="return deleteSchool(' + school_id + ')">' + lang.global_delete + '</a>') +
    genOneRow('s', 'city', school_id, lang.select_city) +
    genOneSchoolRow(school_id) +
    '<div id="s_details' + school_id + '" style="display: none">' +
      genOneRow('s', 'start', school_id, lang.select_start_year) +
      genOneRow('s', 'finish', school_id, lang.select_finish_year) +
      genOneRow('s', 'graduation', school_id, lang.select_graduation) +
      genOneRow('s', 'class', school_id, lang.select_class) +
      genOneRow('s', 'spec', school_id + '_custom', lang.select_spec, 'type="text" class="inputText"') +
    '</div></div>' +
    '<div class="deleted" id="school_deleted' + school_id + '"><div></div>' +
      '<a class="fl_r" href="#restore" onclick="return restoreSchool(' + school_id + ')">' + lang.global_dont_delete + '</a>' +
    '</div><div class="separator"><div></div></div>';
  return elem;
}

function initSchoolRow(school, elem) {
  var g = elem ? function(id) { return get_by_id(elem, id); } : ge;
  school.uiClass = new ClassSelect(g('s_class' + school.id), g('row_s_class' + school.id), {
    width: 200,
    country: school.country,
    school: school.school,
    school_class: school.school_class
  });
  var yearSelect = function(input_id, data, selected) {
    var result = new Dropdown(g(input_id), data, {
      width: 200,
      autocomplete: true,
      placeholder: getLang('select_year_not_selected'),
      placeholderColor: '#000',
      noResult: getLang('select_year_not_found'),
      selectedItems: selected,
      onChange: function(value) {
        if (!intval(value)) {
          result.clear();
        }
      }
    });
    return result;
  }
  school.uiStart = yearSelect('s_start' + school.id, selData.start_years, school.start);
  school.uiFinish = yearSelect('s_finish' + school.id, selData.finish_years, school.finish);
  school.uiGraduation = yearSelect('s_graduation' + school.id, selData.finish_years, school.graduation);
  if (!school.spec) {
    school.spec = '';
  }
  g('s_spec' + school.id + '_custom').value = school.spec;

  // school.uiSchool = new SchoolSelect(g('s_school' + school.id), g('row_s_school' + school.id), g('s_school_type' + school.id), g('row_s_school_type' + school.id), {
  school.uiSchool = new SchoolHintSelect(g('s_school' + school.id), g('row_s_school' + school.id), {
    width: 200,
    progressBar: 's_progress' + school.id,
    /*type_width: 87,
    with_type_width: 108,
    types: selData.school_types,
    type: school.school_type,*/
    city: school.city,
    school: school.school,
    classSelect: school.uiClass,
//    ignoreVoidList: (school.country > 3),
    onEnableCustomChange: function(enable) {
      var country = school.uiCountry ? school.uiCountry.val() : school.country;
      var school_id = school.uiSchool ? school.uiSchool.val() : school.school;
      if ((school.showAddSchool = (!enable && country > 3)) && !intval(school_id)) {
        show('s_add_school_to_db' + school.id);
      } else {
        hide('s_add_school_to_db' + school.id);
      }
    },
    onChange: function(value) {
      if (!intval(value)) {
        hide('s_details' + school.id);
        if (school.showAddSchool) {
          show('s_add_school_to_db' + school.id);
        }
      } else {
        show('s_details' + school.id);
        hide('s_add_school_to_db' + school.id);
      }
      school.uiClass.clear();
      school.uiStart.clear();
      school.uiFinish.clear();
      school.uiGraduation.clear();
      ge('s_spec' + school.id + '_custom').value = '';
    }
  });
  school.uiCity = new CitySelect(g('s_city' + school.id), g('row_s_city' + school.id), {
    width: 200,
    progressBar: 's_progress' + school.id,
    country: school.country,
    city: school.city_val,
    schoolSelect: school.uiSchool
  });
  school.uiCountry = new CountrySelect(g('s_country' + school.id), g('row_s_country' + school.id), {
    width: 200,
    progressBar: 's_progress' + school.id,
    country: school.country_val,
    classSelect: school.uiClass,
    citySelect: school.uiCity,
    onChange: function(value) {
//      school.uiSchool.setOptions({ignoreVoidList: intval(value) > 3});
    }
  });

  g('school' + school.id).style.display = 'block';
  if (school.school) {
    g('s_details' + school.id).style.display = 'block';
  }

  return school;
}

function genAddRow(field, label, additional) {
  if (!additional) {
    additional = '';
  }
  return '<div class="row" id="row_' + field + '">' +
            '<div class="label fl_l ta_r">' + label + '</div>' +
            '<div class="labeled fl_l"><input id="' + field + '" name="' + field + '" /></div>' +
         additional + '</div>';
}

var addBox, uiAddCountry, uiAddCity, uiAddUniversity, uiAddFaculty, uiAddChair, uiAddSchool;
var addedItems = {universities: {}, faculties: {}, chairs: {}, schools: {}};

onDomReady(function() {
  addBox = new MessageBox({progress: 'add_box_progress'});
});

// initer returns additional CitySelect params, like schoolSelect or universitySelect.
function addObjectToDB(country_val, rows, initer, handler) {
  addBox.setOptions({onHide: function() {}});
  addBox.content('<div id="adding_to_db" class="profileEditor">' +
                   genAddRow('add_country', lang.select_country) +
                   genAddRow('add_city', lang.select_city) + rows +
                 '</div>');
  addBox.removeButtons();
  addBox.addButton({label: lang.global_cancel, style: 'button_no', onClick: function() {
    addBox.hide();
  }});
  addBox.addButton({label: lang.global_done, onClick: handler});
  var citySelectParams = extend({
    width: 200,
    progressBar: 'add_box_progress'
  }, initer());
  uiAddCity = new CitySelect(ge('add_city'), ge('row_add_city'), citySelectParams);
  uiAddCountry = new CountrySelect(ge('add_country'), ge('row_add_country'), {
    width: 200,
    progressBar: 'add_box_progress',
    country: country_val,
    citySelect: uiAddCity
  });
}

function addToDB(obj, title, id) {
  var do_add = true;
  addBox.setOptions({title: title, onHide: function() { do_add = false; }});
  addBox.removeButtons();
  addBox.addButton({label: lang.global_cancel, style: 'button_no', onClick: function() {
    addBox.hide();
  }});
  addBox.content('<div class="box_loader"></div>').show();
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (!do_add) return;
    var adder = eval('(' + text + ')');
    adder(id);
  }
  ajax.post('editProfile.php', {act: 'a_add_' + obj + '_js'});
  return false;
}

function addUniversityToDB(id) {
  return addToDB('university', lang.profileEdit_adding_uni_to_db, id);
}

function addFacultyToDB(id) {
  return addToDB('faculty', lang.profileEdit_adding_fac_to_db, id);
}

function addChairToDB(id) {
  return addToDB('chair', lang.profileEdit_adding_chair_to_db, id);
}

function addSchoolToDB(id) {
  return addToDB('school', lang.profileEdit_adding_school_to_db, id);
}

function filterUni() {
  ge('filter_uni').className = 'filter_on';
  ge('filter_school').className = 'filter';
  show('uni');
  hide('school');
  hideMessage();

  ge('summary').innerHTML = lang.profileEdit_can_edit_unis;

  if (!isVisible('primary_uni')) {
    ge('primary_uni').appendChild(genUniRow(primary_uni.id, true));
    primary_uni = initUniRow(primary_uni);
    show('primary_uni');
    unisCount = unis.length;
    if (unisCount) {
      for (var i = 0; i < unis.length; ++i) {
        ge('unis').appendChild(genUniRow(unis[i].id));
        unis[i] = initUniRow(unis[i]);
      }
      show('unis');
    }
  }

  if (unisCount >= 9) {
    hide('add_uni_link');
  } else {
    show('add_uni_link');
  }
}

function filterSchool() {
  ge('filter_school').className = 'filter_on';
  ge('filter_uni').className = 'filter';
  show('school');
  hide('uni');
  hideMessage();

  ge('summary').innerHTML = lang.profileEdit_can_edit_schools;

  if (!isVisible('schools')) {
    schoolsCount = schools.length;
    if (schoolsCount) {
      for (var i = 0; i < schools.length; ++i) {
        ge('schools').appendChild(genSchoolRow(schools[i].id));
        schools[i] = initSchoolRow(schools[i]);
      }
    } else {
      addSchool();
    }
    show('schools');
  }

  if (schoolsCount >= 7) {
    hide('add_school_link');
  } else {
    show('add_school_link');
  }
}

onDomReady(function() {
  var over_handler = function() {
    if (this.className != 'filter_on') {
      this.className = 'filter_over';
    }
  };
  var out_handler = function() {
    if (this.className != 'filter_on') {
      this.className = 'filter';
    }
  }
  addEvent(ge('filter_uni'), 'mouseover', over_handler);
  addEvent(ge('filter_uni'), 'mouseout', out_handler);
  addEvent(ge('filter_school'), 'mouseover', over_handler);
  addEvent(ge('filter_school'), 'mouseout', out_handler);

  if (!demo) {
    selectsData.setCountries(selData.countries_list);
    for (var i in selData.countries) {
      selectsData.setCountryInfo(i, selData.countries[i]);
    }
    for (var i in selData.cities) {
      selectsData.setCityInfo(i, selData.cities[i]);
    }
    for (var i in selData.universities) {
      selectsData.setUniversityInfo(i, selData.universities[i]);
    }
    for (var i in selData.faculties) {
      selectsData.setFacultyInfo(i, selData.faculties[i]);
    }
  }

  if (filter_uni) {
    filterUni();
  } else {
    filterSchool();
  }
});

function addUniversity() {
  if (unisCount >= 9) {
    return false;
  }
  var new_uni = {
    id: -(++globalCounter),
    country: primary_uni.country,
    country_val: primary_uni.country_val,
    city: primary_uni.city,
    city_val: primary_uni.city_val
  };
  ge('unis').appendChild(genUniRow(new_uni.id));
  new_uni = initUniRow(new_uni);
  unis.push(new_uni);
  ++unisCount;
  if (unisCount >= 9) {
    hide('add_uni_link');
  }
  show('unis');
  return false;
}

function addSchool() {
  if (schoolsCount >= 7) {
    return false;
  }
  var new_school = {
    id: -(++globalCounter),
    country: primary_uni.country,
    country_val: primary_uni.country_val,
    city: primary_uni.city,
    city_val: primary_uni.city_val
  };
  ge('schools').appendChild(genSchoolRow(new_school.id));
  new_school = initSchoolRow(new_school);
  if (!schools.length) { // else cannot add schools if there are no schools yet
    schools = new Array();
  }
  schools.push(new_school);
  ++schoolsCount;
  if (schoolsCount >= 7) {
    hide('add_school_link');
  }
  return false;
}

function getIndex(data, id) {
  for (var i = 0; i < data.length; ++i) {
    if (data[i].id == id) {
      return i;
    }
  }
  return false;
}

function deleteUniversity(id) {
  --unisCount;
  show('add_uni_link');
  if (intval(ge('u_university' + id).value) || (id > 0)) {
    hide('uni_content' + id);
    ge('uni_deleted' + id).firstChild.innerHTML = lang.profileEdit_uni_will_be_deleted;
    show('uni_deleted' + id);
  } else {
    var index = getIndex(unis, id);
    unis[index] = unis[unis.length - 1];
    unis.pop();
    ge('uni' + id).parentNode.removeChild(ge('uni' + id));
    if (unis.length == 0) {
      hide('unis');
    }
  }
  return false;
}

function restoreUniversity(id) {
  if (unisCount >= 9) {
    return false;
  }
  hide('uni_deleted' + id);
  show('uni_content' + id);
  ++unisCount;
  if (unisCount >= 9) {
    hide('add_uni_link');
  }
  return false;
}

function deleteSchool(id) {
  --schoolsCount;
  show('add_school_link');
  if (intval(ge('s_school' + id).value) || (id > 0)) {
    hide('school_content' + id);
    ge('school_deleted' + id).firstChild.innerHTML = lang.profileEdit_school_will_be_deleted;
    show('school_deleted' + id);
  } else {
    var index = getIndex(schools, id);
    schools[index] = schools[schools.length - 1];
    schools.pop();
    ge('school' + id).parentNode.removeChild(ge('school' + id));
    if (schools.length == 0) {
      addSchool();
    }
  }
  return false;
}

function restoreSchool(id) {
  if (schoolsCount >= 7) {
    return false;
  }
  hide('school_deleted' + id);
  show('school_content' + id);
  ++schoolsCount;
  if (schoolsCount >= 7) {
    hide('add_school_link');
  }
  return false;
}

function addFields() {
  var params = arguments[0];
  var prefix = arguments[1];
  var key = arguments[2];
  var id = arguments[3];
  for (var i = 4; i < arguments.length; ++i) {
    if (intval(ge(prefix + '_' + arguments[i] + id).value)) {
      params[key + arguments[i]] = ge(prefix + '_' + arguments[i] + id).value;
    }
  }
  return params;
}

function addTextFields() {
  var params = arguments[0];
  var prefix = arguments[1];
  var key = arguments[2];
  var id = arguments[3];
  for (var i = 4; i < arguments.length; ++i) {
    if (ge(prefix + '_' + arguments[i] + id).value.length) {
      params[key + arguments[i]] = ge(prefix + '_' + arguments[i] + id).value;
    }
  }
  return params;
}

function addUniParams(params, uni, key) {
  params[key + 'id'] = uni.id;
  if (isVisible('uni_content' + uni.id) && intval(ge('u_university' + uni.id).value)) {
    params = addFields(params, 'u', key, uni.id, 'country', 'city', 'university',
                                                 'faculty', 'chair', 'edu_form',
                                                 'edu_status', 'graduation');

    params = addTextFields(params, 'u', key + 'custom_', uni.id + '_custom', 'university',
                                                                             'faculty',
                                                                             'chair');
  } else if (uni.id > 0) {
    params[key + 'deleted'] = 1;
  }
  return params;
}

function addSchoolParams(params, school, key) {
  params[key + 'id'] = school.id;
  if (isVisible('school_content' + school.id) && intval(ge('s_school' + school.id).value)) {
    params = addFields(params, 's', key, school.id, 'country', 'city', 'school',
                                                    'start', 'finish',
                                                    'graduation', 'class');
    params = addTextFields(params, 's', key + 'custom_', school.id + '_custom', 'school',
                                                                                'spec');
  } else if (school.id > 0) {
    params[key + 'deleted'] = 1;
  }
  return params;
}

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

function saveEducation() {
  var doneHandler = false;
  if (isVisible('uni')) {
    var params = {act: 'a_education_uni'};
    params = addUniParams(params, primary_uni, 'primary_uni');
    for (var i = 0; i < unis.length; ++i) {
      params = addUniParams(params, unis[i], 'uni' + i);
    }

    doneHandler = function(response) {
      var to_remove = [];
      var all_unis = ge('unis');
      for (var i = 0; i < unis.length; ++i) {
        var new_uni = response['res' + i];
        if (intval(new_uni.id)) {
          unis[i] = updateUni(unis[i], new_uni, all_unis);
        } else {
          to_remove.push(i);
        }
      }
      for (var i = 0; i < to_remove.length; ++i) {
        var index = to_remove[i];
        ge('uni' + unis[index].id).parentNode.removeChild(ge('uni' + unis[index].id));
        unis[index] = unis[unis.length - 1];
        for (var j = i + 1; j < to_remove.length; ++j) {
          if (to_remove[j] == unis.length - 1) {
            to_remove[j] = index;
          }
        }
        unis.pop();
      }
      if (!unis.length) {
        hide('unis');
      }
      unisCount = unis.length;
      if (unisCount >= 9) {
        hide('add_uni_link');
      } else {
        show('add_uni_link');
      }
      primary_uni = updateUni(primary_uni, response['res-1'], ge('primary_uni'), true);
    }
  } else {
    var params = {act: 'a_education_school'};
    for (var i = 0; i < schools.length; ++i) {
      params = addSchoolParams(params, schools[i], 'school' + i);
    }

    doneHandler = function(response) {
      var to_remove = [];
      for (var i = 0; i < schools.length; ++i) {
        var new_school = response['res' + i];
        if (intval(new_school.id)) {
          schools[i] = updateSchool(schools[i], new_school, ge('schools'));
        } else {
          to_remove.push(i);
        }
      }
      for (var i = 0; i < to_remove.length; ++i) {
        var index = to_remove[i];
        ge('school' + schools[index].id).parentNode.removeChild(ge('school' + schools[index].id));
        schools[index] = schools[schools.length - 1];
        for (var j = i + 1; j < to_remove.length; ++j) {
          if (to_remove[j] == schools.length - 1) {
            to_remove[j] = index;
          }
        }
        schools.pop();
      }
      schoolsCount = schools.length;
      if (schoolsCount >= 7) {
        hide('add_school_link');
      } else {
        show('add_school_link');
      }
      if (!schoolsCount) {
        addSchool();
      }
    }
  }
  params.hash = ge('hash').value;

  var handlerWrapper = function(handler) {
    return function(obj, text) {
      hide('save_progress');
      var response = eval('(' + text + ')');
      handler(response);
      window.scroll(0, 0);
      showMessage(lang.global_changes_saved + '.', 'message');
    }
  }
  var failHandler = function(obj, text) {
    hide('save_progress');
    text = text || lang.global_unknown_error;
    window.scroll(0, 0);
    showMessage(lang.global_error_occured + ': ' + text, 'error');
  }
  var hideHandler = function() {
    hide('save_progress');
  }

  show('save_progress');
  Ajax.postWithCaptcha('editProfile.php', params, {onSuccess: handlerWrapper(doneHandler), onFail: failHandler, onCaptchaShow: hideHandler});
  return false;
}

function updateUni(old_uni, new_uni, parent, no_delete) {
  if (old_uni.uiUniversity.val() == -1 && new_uni.university.id) {
    selectsData.addUniversity(old_uni.uiCity.val(), [new_uni.university.id, new_uni.university.name]);
    if (new_uni.faculty.id) {
      selectsData.setUniversityInfo(new_uni.university.id, {completed_faculties: 0, faculties: [[new_uni.faculty.id, new_uni.faculty.name]]});
      if (new_uni.chair.id) {
        selectsData.setFacultyInfo(new_uni.faculty.id, {completed_chairs: 0, chairs: [[new_uni.chair.id, new_uni.chair.name]]});
      } else {
        selectsData.setFacultyInfo(new_uni.faculty.id, {completed_chairs: 0, chairs: []});
      }
    } else {
      selectsData.setUniversityInfo(new_uni.university.id, {completed_faculties: 0, faculties: []});
    }
  } else if (old_uni.uiFaculty.val() == -1 && new_uni.faculty.id) {
    selectsData.addFaculty(new_uni.university.id, [new_uni.faculty.id, new_uni.faculty.name]);
    if (new_uni.chair.id) {
      selectsData.setFacultyInfo(new_uni.faculty.id, {completed_chairs: 0, chairs: [[new_uni.chair.id, new_uni.chair.name]]});
    } else {
      selectsData.setFacultyInfo(new_uni.faculty.id, {completed_chairs: 0, chairs: []});
    }
  } else if (old_uni.uiChair.val() == -1 && new_uni.chair.id) {
    selectsData.addChair(new_uni.faculty.id, [new_uni.chair.id, new_uni.chair.name]);
  }

  old_uni.country = old_uni.uiCountry.val();
  old_uni.country_val = old_uni.uiCountry.val_full();
  old_uni.city = old_uni.uiCity.val();
  old_uni.city_val = old_uni.uiCity.val_full();
  old_uni.university = new_uni.university.id;
  old_uni.faculty = new_uni.faculty.id;
  old_uni.chair = new_uni.chair.id;
  old_uni.edu_form = old_uni.uiEducationForm.val();
  old_uni.edu_status = old_uni.uiEducationStatus.val();
  old_uni.graduation = old_uni.uiGraduation.val();

  var new_elem = genUniRow(new_uni.id, no_delete);
  var old_elem = ge('uni' + old_uni.id);
  old_uni.id = new_uni.id;
  new_uni = initUniRow(old_uni, new_elem);
  parent.replaceChild(new_elem, old_elem);

  return new_uni;
}

function updateSchool(old_school, new_school, parent) {
  if (old_school.uiSchool.val() == -1 && new_school.school.id) {
    selectsData.addSchool(old_school.uiCity.val(), [new_school.school.id, new_school.school.name]);
  }

  old_school.country = old_school.uiCountry.val();
  old_school.country_val = old_school.uiCountry.val_full();
  old_school.city = old_school.uiCity.val();
  old_school.city_val = old_school.uiCity.val_full();
  old_school.school = new_school.school.id;
  // old_school.school_type = old_school.uiSchool.type_val();
  old_school.start = old_school.uiStart.val();
  old_school.finish = old_school.uiFinish.val();
  old_school.graduation = old_school.uiGraduation.val();
  old_school.school_class = old_school.uiClass.val();
  old_school.spec = ge('s_spec' + old_school.id + '_custom').value;

  var new_elem = genSchoolRow(new_school.id);
  var old_elem = ge('school' + old_school.id);
  old_school.id = new_school.id;
  new_school = initSchoolRow(old_school, new_elem);
  parent.replaceChild(new_elem, old_elem);

  return new_school;
}

function uniChanged(uni) {
  return !isVisible('uni_content' + uni.id) ||
         uni.country != uni.uiCountry.val() || uni.city != uni.uiCity.val() ||
         uni.university != uni.uiUniversity.val() || uni.faculty != uni.uiFaculty.val() ||
         uni.chair != uni.uiChair.val() || uni.edu_form != uni.uiEducationForm.val() ||
         uni.edu_status != uni.uiEducationStatus.val() || uni.graduation != uni.uiGraduation.val();
}
function schoolChanged(school) {
  return !isVisible('school_content' + school.id) ||
         school.country != school.uiCountry.val() || school.city != school.uiCity.val() ||
         school.school != school.uiSchool.val() || school.start != school.uiStart.val() ||
         school.finish != school.uiFinish.val() || school.graduation != school.uiGraduation.val() ||
         school.school_class != school.uiClass.val() || school.spec != ge('s_spec' + school.id + '_custom').value;
}

var leaving = false;
var sure_box = false;
function checkChanges(showBox) {
  if (leaving) return;
  var school_change = false, uni_change = false;
  if (isVisible('primary_uni')) {
    if (uniChanged(primary_uni)) {
      uni_change = true;
    } else {
      for (var i = 0; i < unis.length; ++i) {
        if (unis[i].id > 0 && uniChanged(unis[i])) {
          uni_change = true;
        } else if (unis[i].id < 0 && isVisible('uni_content' + unis[i].id) && unis[i].uiUniversity.val()) {
          uni_change = true;
        }
      }
    }
  }
  if (isVisible('schools')) {
    for (var i = 0; i < schools.length; ++i) {
      if (schools[i].id > 0 && schoolChanged(schools[i])) {
        school_change = true;
      } else if (schools[i].id < 0 && isVisible('school_content' + schools[i].id) && schools[i].uiSchool.val()) {
        school_change = true;
      }
    }
  }
  var message = false;
  if (uni_change && school_change) {
    message = lang.profileEdit_unis_schools_changed;
  } else if (uni_change) {
    message = lang.profileEdit_unis_changed;
  } else if (school_change) {
    message = lang.profileEdit_schools_changed;
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