function initRegSteps(step) {

extend(cur, {
  module: 'regstep',

  anim: Fx.Transitions.sineInOut,

  step: step,
  stepsGlass: ge('reg_steps_s'),
  stepsPoint: ge('reg_point'),
  stepsWrap: ge('reg_steps_c')
});
extend(cur, {
  stepsGlassContent: geByClass1('content', cur.stepsGlass),
  stepsContent: geByClass1('content', cur.stepsWrap),
  move: function(to_step) {
    if (to_step == (cur.moving ? cur.m_to : cur.step)) {
      if (!cur.moving) {
        nav.setLoc('regstep' + cur.step);
      }
      return;
    }
    if (!cur.moving) {
      cur.m_height = cur.stepsWrap.offsetHeight - 2;
      cur.m_g = (cur.step - 1) * 115;
      cur.m_c = (1 - cur.step) * 632;
      cur.m_cur = cur.step;
      cur.moving = setInterval(function() {
        cur.m_time += 13;
        if (cur.anim_v) {
          if (cur.m_time > cur.v_time) {
            cur.m_height = cur.m_to_height;
            cur.anim_v = false;
            if (cur.anim_h = (cur.m_to_c != cur.m_c)) {
              for (var i = 1; i <= 3; ++i) {
                show('reg_step' + i + '_c');
                if (browser.opera_mobile) {
                  ge('reg_step' + i +'_c').style.visibility = 'visible';
                } else {
                  ge('reg_step' + i +'_c').style.height = 'auto';
                }
              }
            }
            cur.m_time -= cur.v_time;
          } else {
            cur.m_height = cur.anim(cur.m_time, cur.m_from_height, cur.m_to_height - cur.m_from_height, cur.v_time);
          }
          cur.stepsWrap.style.height = cur.m_height + 'px';
        }
        if (cur.anim_h) {
          if (cur.m_time > cur.h_time) {
            cur.m_g = cur.m_to_g;
            cur.m_c = cur.m_to_c;
            cur.anim_h = false;
            cur.anim_v = (cur.m_to_height != cur.m_height);
            cur.m_time -= cur.h_time;
          } else {
            cur.m_g = cur.anim(cur.m_time, cur.m_from_g, cur.m_to_g - cur.m_from_g, cur.h_time);
            cur.m_c = cur.anim(cur.m_time, cur.m_from_c, cur.m_to_c - cur.m_from_c, cur.h_time);
          }
          cur.stepsContent.style.marginLeft = cur.m_c + 'px';

          cur.stepsGlass.style.marginLeft = cur.m_g + 'px';
          cur.stepsGlassContent.style.marginLeft = (-cur.m_g - 2) + 'px';

          cur.m_cur = Math.floor(cur.m_g / 115) + 1;
          if (cur.m_to <= cur.m_cur && cur.m_cur < cur.m_next) {
            removeClass(ge('reg_step' + cur.m_next), 'passed');
            --cur.m_next;
          }
          if (cur.m_to > cur.m_cur && cur.m_cur == cur.m_next) {
            addClass(ge('reg_step' + cur.m_next), 'passed');
            ++cur.m_next;
          }

          cur.stepsPoint.style.marginLeft = (cur.m_g + 47) + 'px';
        }
        if (!cur.anim_v && !cur.anim_h) {
          cur.step = cur.m_to;
          nav.setLoc('regstep' + cur.step);
          clearInterval(cur.moving);
          cur.moving = false;
          for (var i = 1; i <= 3; ++i) {
            if (i < cur.step) {
              if (browser.opera_mobile) {
                ge('reg_step' + i +'_c').style.visibility = 'hidden';
              } else {
                ge('reg_step' + i +'_c').style.height = '10px';
              }
            } else if (i > cur.step) {
              hide('reg_step' + i + '_c');
            }
          }
          cur.stepsWrap.style.height = 'auto';
          cur.stepsContent.style.width = (cur.step * 632) + 'px';
          cur.stepsWrap.style.overflow = 'visible';
          if (cur.step == 3 && ge('inv_password')) elfocus('inv_password');
        }
      }, 13);
    }
    cur.m_time = 0;
    cur.m_to = to_step;

    cur.m_next = cur.m_cur;

    cur.m_from_height = cur.m_height;

    var to_node = ge('reg_step' + cur.m_to + '_c');
    to_node.style.position = 'absolute';
    to_node.style.left = '-5000px';
    show(to_node);
    cur.m_to_height = geByClass1('borders', to_node).offsetHeight;

    cur.m_from_g = cur.m_g;
    cur.m_to_g = (cur.m_to - 1) * 115;
    cur.m_from_c = cur.m_c;
    cur.m_to_c = (1 - cur.m_to) * 632;
    cur.anim_v = (cur.m_to_height > cur.m_height);
    cur.stepsWrap.style.height = cur.m_height + 'px';
    cur.stepsWrap.style.overflow = 'hidden';
    cur.stepsContent.style.width = '5000px';

    to_node.style.position = 'static';
    to_node.style.left = 'auto';
    if (cur.anim_h = (cur.m_to_height <= cur.m_height)) {
      for (var i = 1; i <= 3; ++i) {
        show('reg_step' + i + '_c');
        if (browser.opera_mobile) {
          ge('reg_step' + i +'_c').style.visibility = 'visible';
        } else {
          ge('reg_step' + i +'_c').style.height = 'auto';
        }
      }
    }
    cur.h_time = Math.abs(cur.m_to_c - cur.m_c) * 2 / 5; // horizontal
    cur.v_time = Math.abs(cur.m_to_height - cur.m_height) / 2; // vertical
    if (cur.h_time > 500) cur.h_time = 500;
    if (cur.v_time > 500) cur.v_time = 500;
  },

  finish: function(hash) {
    ajax.post('register.php', {act: 'finish', hash: hash}, {progress: 'step3_progress'});
  },

  uploadPhoto: function() {
    hide('photo_error');
    show('upload_progress');
    document.upload.submit();
    setTimeout('ge(\'photo\').blur(); ge(\'photo\').disabled = true;', 0);
  },
  uploadSucceed: function(server, photo, hash, url) {
    var tmp = vkImage();
    tmp.src = url;

    cur.updatePhoto = function() {
      if (tmp.height) {
        ge('photo_file').innerHTML = '<input id="photo" class="inputFile" type="file" onchange="cur.uploadPhoto()" name="photo" />';
        hide('upload_progress');
        var reg_photo = ge('reg_photo');
        if (reg_photo.firstChild.tagName.toLowerCase() == 'img') {
          animate(reg_photo, {height: tmp.height + 'px'}, 200, function() {
            ge('reg_photo').innerHTML = '<img src="' + url + '" />';
          });
        } else {
          animate(reg_photo.firstChild.firstChild, {height: (tmp.height - 2) + 'px'}, 200, function() {
            ge('reg_photo').innerHTML = '<img src="' + url + '" />';
          });
        }
      } else {
        setTimeout(cur.updatePhoto, 100);
      }
    }
    cur.updatePhoto();

    cur.photo = [server, photo, hash];
  },
  uploadError: function(text) {
    ge('photo_error').innerHTML = text;
    show('photo_error');
    hide('upload_progress');
    ge('photo_file').innerHTML = '<input id="photo" class="inputFile" type="file" onchange="cur.uploadPhoto()" name="photo" />';
  }
});

for (var i = 1; i <= 3; ++i) {
  if (i < cur.step) {
    if (browser.opera_mobile) {
      ge('reg_step' + i +'_c').style.visibility = 'hidden';
    } else {
      ge('reg_step' + i +'_c').style.height = '10px';
    }
  } else if (i > cur.step) {
    hide('reg_step' + i + '_c');
  }
}

cur.stepsContent.style.width = (cur.step * 632) + 'px';
cur.stepsWrap.style.overflow = 'visible';
cur.m_height = cur.stepsWrap.offsetHeight - 2;
cur.m_g = (cur.step - 1) * 115;
cur.m_c = (1 - cur.step) * 632;
cur.stepsPoint.style.marginLeft = (cur.m_g + 47) + 'px';
show(cur.stepsPoint);
cur.stepsGlass.style.marginLeft = cur.m_g + 'px';
cur.stepsGlassContent.style.marginLeft = (-cur.m_g - 2) + 'px';
show(cur.stepsGlass);
cur.stepsContent.style.marginLeft = cur.m_c + 'px';
show(cur.stepsContent);

selectsData.setCountries(cur.selData.countries_list);
for (var i in cur.selData.countries) {
  selectsData.setCountryInfo(i, cur.selData.countries[i]);
}
for (var i in cur.selData.cities) {
  selectsData.setCityInfo(i, cur.selData.cities[i]);
}
for (var i in cur.selData.universities) {
  selectsData.setUniversityInfo(i, cur.selData.universities[i]);
}
for (var i in cur.selData.faculties) {
  selectsData.setFacultyInfo(i, cur.selData.faculties[i]);
}

var slide_show = function(elem, speed) {
  if (!isVisible(elem)) slideDown(elem, speed || 150);
}
var slide_hide = function(elem, speed) {
  if (isVisible(elem)) slideUp(elem, speed || 150);
}

var uiSex, uiBDay, uiBMonth, uiBYear, uiCountry, uiCity;

var uiChair, uiFaculty, uiUniversity, uiUCity, uiUCountry;
var uiEducationForm, uiEducationStatus, uiGrad;

var uiSchool, uiSCity, uiSCountry;
var uiClass, uiSchoolStartYear, uiSchoolFinishYear, uiSchoolGradYear;

cur.getLastDay = function(year, month) {
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

cur.genDays = function(year, month) {
  var result = [[0, cur.lang.profileEdit_main_sel_bday+':']], last = cur.getLastDay(year, month);
  for (var i = 1; i <= last; ++i) {
    result.push([i, i + '']);
  }
  return result;
},

uiSex = new Dropdown(ge('sex'), cur.selData.sexes, {
  width: 225,
  multiselect: false,
  selectedItems: cur.selData.sex,
  onChange: function(val) {
    val = intval(val);
    if (val) {
      ge('birth_date_label').innerHTML = langSex(val, cur.lang.birth_date_label);
    }
  }
});

var updDays = function(year, month) {
  if (uiBDay.val() > cur.getLastDay(year, month)) {
    uiBDay.clear();
  }
  uiBDay.setData(cur.getLastDay(year, month));
}

uiBDay = new Dropdown(ge('bday'), cur.genDays(cur.selData.byear, cur.selData.bmonth), {
  width: 60,
  multiselect: false,
  selectedItems: cur.selData.bday
});

uiBMonth = new Dropdown(ge('bmonth'), cur.selData.bmonths, {
  width: 95,
  multiselect: false,
  selectedItems: cur.selData.bmonth,
  onChange: function(value) {
    updDays(uiBYear.val(), value);
  }
});

uiBYear = new Dropdown(ge('byear'), cur.selData.byears, {
  width: 60,
  multiselect: false,
  selectedItems: cur.selData.byear,
  onChange: function(value) {
    updDays(value, uiBMonth.val());
  }
});

uiClass = new ClassSelect(ge('s_class'), ge('s_class_row'), {
  width: 200,
  country: cur.selData.s_country[0],
  school: cur.selData.school,
  school_class: cur.selData.s_class
});

uiSchool = new SchoolSelect(ge('school'), ge('school_container'),
                            ge('school_type'), ge('selectSchoolType'), {
  width: 200,
  type_width: 87,
  with_type_width: 108,
  show: slide_show,
  hide: slide_hide,
  types: cur.selData.school_types,
  school: cur.selData.school,
  city: cur.selData.s_city[0],
  classSelect: uiClass,
  onChange: function(value) {
    if (intval(value)) {
      slide_show('school_details', 300);
    } else {
      slide_hide('school_details', 300);
    }
    uiClass.clear();
    uiSchoolStartYear.clear();
    uiSchoolFinishYear.clear();
    uiSchoolGradYear.clear();
  }
});

uiEducationForm = new EducationFormSelect(ge('edu_form'), ge('edu_form_row'), {
  width: 200,
  country: cur.selData.u_country[0],
  university: cur.selData.university,
  edu_form: cur.selData.edu_form
});

uiEducationStatus = new EducationStatusSelect(ge('edu_status'), ge('edu_status_row'), {
  width: 200,
  country: cur.selData.u_country[0],
  university: cur.selData.university,
  edu_status: cur.selData.edu_status
});

uiChair = new ChairSelect(ge('chair'), ge('chair_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  chair: cur.selData.chair,
  faculty: cur.selData.faculty
});

uiFaculty = new FacultySelect(ge('faculty'), ge('faculty_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('uni_progress'),
  faculty: cur.selData.faculty,
  university: cur.selData.university,
  chairSelect: uiChair
});

uiUniversity = new UniversitySelect(ge('university'), ge('university_container'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('uni_progress'),
  university: cur.selData.university,
  city: cur.selData.u_city[0],
  facultySelect: uiFaculty,
  eduFormSelect: uiEducationForm,
  eduStatusSelect: uiEducationStatus,
  onChange: function(value) {
    if (intval(value)) {
      slide_show('university_details', 300);
    } else {
      slide_hide('university_details', 300);
    }
    uiEducationForm.clear();
    uiEducationStatus.clear();
    uiGrad.clear();
  }
});

uiUCity = new CitySelect(ge('u_city'), ge('u_city_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('uni_progress'),
  city: cur.selData.u_city,
  country: cur.selData.u_country[0],
  universitySelect: uiUniversity
});

uiSCity = new CitySelect(ge('s_city'), ge('s_city_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('school_progress'),
  city: cur.selData.s_city,
  country: cur.selData.s_country[0],
  schoolSelect: uiSchool
});

uiCity = new CitySelect(ge('city'), ge('city_row'), {
  width: 225,
  show: slide_show,
  hide: slide_hide,
  city: cur.selData.city,
  country: cur.selData.country[0],
  onChange: function(value) {
    value = intval(value);
    if (value) {
      var cnfull = uiCountry.val_full(), ctfull = uiCity.val_full();
      if (!intval(uiUCity.val())) {
        uiUCountry.val(cnfull, true);
        uiUCity.val(ctfull, true);
      }
      if (!intval(uiSCity.val())) {
        uiSCountry.val(cnfull, true);
        uiSCity.val(ctfull, true);
      }
    }
  }
});

uiUCountry = new CountrySelect(ge('u_country'), ge('u_country_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('uni_progress'),
  country: cur.selData.u_country,
  eduFormSelect: uiEducationForm,
  eduStatusSelect: uiEducationStatus,
  citySelect: uiUCity
});

uiSCountry = new CountrySelect(ge('s_country'), ge('s_country_row'), {
  width: 200,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('school_progress'),
  country: cur.selData.s_country,
  classSelect: uiClass,
  citySelect: uiSCity
});

uiCountry = new CountrySelect(ge('country'), ge('country_row'), {
  width: 225,
  show: slide_show,
  hide: slide_hide,
  progressBar: ge('city_progress'),
  country: cur.selData.country,
  citySelect: uiCity,
  onChange: function(value) {
    value = intval(value);
    if (value) {
      var full = uiCountry.val_full();
      if (!intval(uiUCountry.val())) {
        uiUCountry.val(full, true);
      }
      if (!intval(uiSCountry.val())) {
        uiSCountry.val(full, true);
      }
    }
  }
});

uiGrad = new Dropdown(ge('grad'), cur.selData.graduations, {
  width: 200,
  autocomplete: true,
  placeholderColor: '#000',
  placeholder: cur.lang.select_year_not_selected,
  noResult: cur.lang.select_year_not_found,
  selectedItems: cur.selData.grad,
  onChange: function(value) {
    if (!intval(value)) {
      uiGrad.clear();
    }
  }
});

uiSchoolStartYear = new Dropdown(ge('s_start'), cur.selData.start_years, {
  width: 200,
  autocomplete: true,
  placeholderColor: '#000',
  placeholder: cur.lang.select_year_not_selected,
  noResult: cur.lang.select_year_not_found,
  selectedItems: cur.selData.s_start,
  onChange: function(value) {
    if (!intval(value)) {
      uiSchoolStartYear.clear();
    }
  }
});

uiSchoolFinishYear = new Dropdown(ge('s_fin'), cur.selData.finish_years, {
  width: 200,
  autocomplete: true,
  placeholderColor: '#000',
  placeholder: cur.lang.select_year_not_selected,
  noResult: cur.lang.select_year_not_found,
  selectedItems: cur.selData.s_finish,
  onChange: function(value) {
    if (!intval(value)) {
      uiSchoolFinishYear.clear();
    }
  }
});

uiSchoolGradYear = new Dropdown(ge('s_grad'), cur.selData.finish_years, {
  width: 200,
  autocomplete: true,
  placeholderColor: '#000',
  placeholder: cur.lang.select_year_not_selected,
  noResult: cur.lang.select_year_not_found,
  selectedItems: cur.selData.s_grad,
  onChange: function(value) {
    if (!intval(value)) {
      uiSchoolGradYear.clear();
    }
  }
});

ge('step1_save').onclick = function() {
  var fnameRaw = trim(ge('fname').value), lnameRaw = trim(ge('lname').value);
  var name = cleanName(fnameRaw, lnameRaw);
  fname = name[0];
  lname = name[1];

  var sex = intval(ge('sex').value);
  if (!fname || fname.length * 2 < fnameRaw.length) {
    scrollToTop(0);
    return notaBene('fname');
  }
  if (!lname || lname.length * 2 < lnameRaw.length) {
    scrollToTop(0);
    return notaBene('lname');
  }
  if (!sex) {
    scrollToTop(0);
    return uiSex.showDefaultList();
  }
  var params = {
    act: 'save_general',
    country: ge('country').value,
    city: ge('city').value,
    fname: fname,
    lname: lname,
    sex: ge('sex').value,
    bday: ge('bday').value,
    bmonth: ge('bmonth').value,
    byear: ge('byear').value,
    hash: ge('reghash').value
  };
  ajax.post('register.php', params, {progress: 'step1_progress', onDone: function() {
    cur.selData.fname = fname;
    cur.selData.lname = lname;
    setTimeout(show.pbind('rs_skip1'), 300);
    nav.go('/regstep2');
  }});
}

ge('step2_save').onclick = function() {
  var addFields = function() {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var name = arguments[i];
      var value = ge(name).value;
      if (intval(value)) {
        result[name] = value;
      }
    }
    return result;
  }
  var addTextFields = function() {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var name = arguments[i];
      var value = ge(name).value;
      if (value.length) {
        result[name] = value;
      }
    }
    return result;
  }
  var params = {act: 'save_education', hash: ge('reghash').value};
  params = addFields(params, 's_country', 's_city', 'school', 'school_type', 's_class', 's_start', 's_fin', 's_grad', 'u_country', 'u_city', 'university', 'faculty', 'chair', 'edu_form', 'edu_status', 'grad');
  params = addTextFields(params, 'school_custom', 'university_custom', 'faculty_custom', 'chair_custom');
  ajax.post('register.php', params, {progress: 'step2_progress'});
}

ge('step3_save').onclick = function() {
  ajax.post('register.php', {
    act: 'set_photo',
    server: cur.photo[0],
    photo: cur.photo[1],
    hash: ge('reghash').value,
    phash: cur.photo[2]
  }, {progress: 'step3_progress'});
}

cur.destroy.push(function() {
  each([uiCountry, uiCity, uiChair, uiFaculty, uiUniversity, uiUCity, uiUCountry,
        uiEducationForm, uiEducationStatus, uiGrad, uiSchool, uiSCity, uiSCountry,
        uiClass, uiSchoolStartYear, uiSchoolFinishYear, uiSchoolGradYear],
    Selector.prototype.destroy
  );
  cleanElems(
    'step1_save', 'step2_save', 'step3_save', 'reg_step1_c', 'reg_step2_c',
    'reg_step3_c', 'uni_progress', 'school_progress', 'city_progress'
  );
});

cur.nav.push(function(changed) {
  if (!changed[0]) return false;
  var m = changed[0].match(/regstep(\d)/i);
  if (!m) return;
  delete(changed[0]);
  if (!isEmpty(changed)) return;

  var step = intval(m[1]);
  if (step > 1) {
    if (!cur.selData.fname) {
      elfocus('fname');
      return false;
    } else if (!cur.selData.lname) {
      elfocus('lname');
      return false;
    }
  }
  if (step < 1 || step > 3) {
    setTimeout(function() {
      nav.go('regstep1');
    }, 0);
  } else {
    cur.move(step);
    document.title = document.title;
  }
  return false;
});

}

var Reg = {
}

try{stManager.done('reg.js');}catch(e){}
