var inviter = {
  toggle: function(block) {
    toggle(block + '_link');
    toggle(block + '_info');
  },
  slideShow: function(elem, speed) {
    if (!isVisible(elem)) slideDown(elem, speed || 150);
  },
  slideHide: function(elem, speed) {
    if (isVisible(elem)) slideUp(elem, speed || 150);
  },

  checkLang: function() {
    var fname = trim(ge('inv_fname').value);
    var lname = trim(ge('inv_lname').value);
    var hasrus = true;
    if (fname && !fname.match(/[à-ÿÀ-ß¸¨]/) && lname && !lname.match(/[à-ÿÀ-ß¸¨]/)) {
      hasrus = false;
    }
    (hasrus ? hide : show)('inv_lang_row');
    if (fname && lname) {
      ajax.plainpost('invite.php', {act: 'get_sex', fname: fname, lname: lname}, function(sex) {
        (intval(sex) ? hide : show)('inv_sex_row');
      });
    }
  },

  getLastDay: function(year, month) {
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
  },
  genDays: function(year, month) {
    var result = [[0, cur.lang.profileEdit_main_sel_bday+':']], last = inviter.getLastDay(year, month);
    for (var i = 1; i <= last; ++i) {
      result.push([i, i + '']);
    }
    return result;
  },

  init: function(opts) {
    cur.lang = extend(cur.lang || {}, opts.lang || {});
    cur.invHash = opts.hash;
    cur.module = 'invite';

    if (!geByClass('user', ge('invites_invites_wrap')).length) {
      hide('invited_invites_show');
    }

    if (!opts.selData) return;

    var selData = opts.selData;

    placeholderInit('inv_mobile');
    /*selectsData.setCountries(selData.countries_list);
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
    }*/

    var uiBDay, uiBMonth, uiBYear, uiCountry, uiCity;

    var uiChair, uiFaculty, uiUniversity, uiUCity, uiUCountry;
    var uiEducationForm, uiEducationStatus, uiGrad;

    var uiSchool, uiSCity, uiSCountry;
    var uiClass, uiSchoolStartYear, uiSchoolFinishYear, uiSchoolGradYear;

    var slideShow = inviter.slideShow, slideHide = inviter.slideHide;

    var uiLang = new Dropdown(ge('inv_lang'), [[0, 'Ðóññêèé'], [3, 'English'], [73, 'Portugues']], {
      big: 1,
      multiselect: false,
      selectedItems: (vk.lang < 3) ? 0 : vk.lang
    });

    cur.uiSex = new Dropdown(ge('inv_sex'), selData.sexes, {
      big: 1,
      multiselect: false,
      onChange: function(val) {
        var label = ge('birth_date_label')
        val = intval(val);
        if (val && label) {
          label.innerHTML = langSex(val, cur.lang.birth_date_label);
        }
      }
    });

    /*var updDays = function(year, month) {
      if (uiBDay.val() > inviter.getLastDay(year, month)) {
        uiBDay.clear();
      }
      uiBDay.setData(inviter.getLastDay(year, month));
    }

    uiBDay = new Dropdown(ge('inv_bday'), inviter.genDays(0, 0), {
      big: 1,
      width: 55,
      multiselect: false
    });

    uiBMonth = new Dropdown(ge('inv_bmonth'), selData.bmonths, {
      big: 1,
      width: 95,
      multiselect: false,
      onChange: function(value) {
        updDays(uiBYear.val(), value);
      }
    });

    uiBYear = new Dropdown(ge('inv_byear'), selData.byears, {
      big: 1,
      width: 60,
      multiselect: false,
      onChange: function(value) {
        updDays(value, uiBMonth.val());
      }
    });

    uiClass = new ClassSelect(ge('inv_sclass'), ge('inv_sclass_row'), {
      big: 1,
      width: 222,
      country: selData.s_country[0],
      school: selData.school,
      school_class: selData.s_class
    });

    uiSchool = new SchoolSelect(ge('inv_sschool'), ge('inv_sschool_row'),
                                ge('inv_sschool_type'), ge('inv_sschool_type_row'), {
      big: 1,
      width: 222,
      type_width: 75,
      with_type_width: 98,
      show: slideShow,
      hide: slideHide,
      types: selData.school_types,
      school: selData.school,
      city: selData.s_city[0],
      classSelect: uiClass,
      onChange: function(value) {
        if (intval(value)) {
          slideShow('inv_sdetails', 300);
        } else {
          slideHide('inv_sdetails', 300);
        }
        uiClass.clear();
        uiSchoolStartYear.clear();
        uiSchoolFinishYear.clear();
        uiSchoolGradYear.clear();
      }
    });

    uiEducationForm = new EducationFormSelect(ge('inv_uedu_form'), ge('inv_uedu_form_row'), {
      big: 1,
      width: 222,
      country: selData.u_country[0],
      university: selData.university,
      edu_form: selData.edu_form
    });

    uiEducationStatus = new EducationStatusSelect(ge('inv_uedu_status'), ge('inv_uedu_status_row'), {
      big: 1,
      width: 222,
      country: selData.u_country[0],
      university: selData.university,
      edu_status: selData.edu_status
    });

    uiChair = new ChairSelect(ge('inv_uchair'), ge('inv_uchair_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      chair: selData.chair,
      faculty: selData.faculty
    });

    uiFaculty = new FacultySelect(ge('inv_ufaculty'), ge('inv_ufaculty_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('uni_progress'),
      faculty: selData.faculty,
      university: selData.university,
      chairSelect: uiChair
    });

    uiUniversity = new UniversitySelect(ge('inv_uuniversity'), ge('inv_uuniversity_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('uni_progress'),
      university: selData.university,
      city: selData.u_city[0],
      facultySelect: uiFaculty,
      eduFormSelect: uiEducationForm,
      eduStatusSelect: uiEducationStatus,
      onChange: function(value) {
        if (intval(value)) {
          slideShow('inv_udetails', 300);
        } else {
          slideHide('inv_udetails', 300);
        }
        uiEducationForm.clear();
        uiEducationStatus.clear();
        uiGrad.clear();
      }
    });

    uiUCity = new CitySelect(ge('inv_ucity'), ge('inv_ucity_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('uni_progress'),
      city: selData.u_city,
      country: selData.u_country[0],
      universitySelect: uiUniversity
    });

    uiSCity = new CitySelect(ge('inv_scity'), ge('inv_scity_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('school_progress'),
      city: selData.s_city,
      country: selData.s_country[0],
      schoolSelect: uiSchool
    });

    uiCity = new CitySelect(ge('inv_city'), ge('inv_city_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      city: selData.city,
      country: selData.country[0],
      onChange: function(value) {
        value = intval(value);
        if (value) {
          var cnfull = uiCountry.val_full(), ctfull = uiCity.val_full();
          if (!intval(uiUCity.val()) || !isVisible('inv_uni_info')) {
            uiUCountry.val(cnfull, true);
            uiUCity.val(ctfull, true);
          }
          if (!intval(uiSCity.val()) || !isVisible('inv_school_info')) {
            uiSCountry.val(cnfull, true);
            uiSCity.val(ctfull, true);
          }
        }
      }
    });

    uiUCountry = new CountrySelect(ge('inv_ucountry'), ge('inv_ucountry_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('uni_progress'),
      country: selData.u_country,
      eduFormSelect: uiEducationForm,
      eduStatusSelect: uiEducationStatus,
      citySelect: uiUCity
    });

    uiSCountry = new CountrySelect(ge('inv_scountry'), ge('inv_scountry_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('school_progress'),
      country: selData.s_country,
      classSelect: uiClass,
      citySelect: uiSCity
    });

    uiCountry = new CountrySelect(ge('inv_country'), ge('inv_country_row'), {
      big: 1,
      width: 222,
      show: slideShow,
      hide: slideHide,
      progressBar: ge('city_progress'),
      country: selData.country,
      citySelect: uiCity,
      onChange: function(value) {
        value = intval(value);
        if (value) {
          var full = uiCountry.val_full();
          if (!intval(uiUCountry.val()) || !isVisible('inv_uni_info')) {
            uiUCountry.val(full, true);
          }
          if (!intval(uiSCountry.val()) || !isVisible('inv_school_info')) {
            uiSCountry.val(full, true);
          }
        }
      }
    });

    uiGrad = new Dropdown(ge('inv_ugraduation'), selData.graduations, {
      big: 1,
      width: 222,
      autocomplete: true,
      placeholderColor: '#000',
      placeholder: cur.lang.select_year_not_selected,
      noResult: cur.lang.select_year_not_found,
      selectedItems: selData.grad,
      onChange: function(value) {
        if (!intval(value)) {
          uiGrad.clear();
        }
      }
    });

    uiSchoolStartYear = new Dropdown(ge('inv_sstart'), selData.start_years, {
      big: 1,
      width: 222,
      autocomplete: true,
      placeholderColor: '#000',
      placeholder: cur.lang.select_year_not_selected,
      noResult: cur.lang.select_year_not_found,
      selectedItems: selData.s_start,
      onChange: function(value) {
        if (!intval(value)) {
          uiSchoolStartYear.clear();
        }
      }
    });

    uiSchoolFinishYear = new Dropdown(ge('inv_sfinish'), selData.finish_years, {
      big: 1,
      width: 222,
      autocomplete: true,
      placeholderColor: '#000',
      placeholder: cur.lang.select_year_not_selected,
      noResult: cur.lang.select_year_not_found,
      selectedItems: selData.s_finish,
      onChange: function(value) {
        if (!intval(value)) {
          uiSchoolFinishYear.clear();
        }
      }
    });

    uiSchoolGradYear = new Dropdown(ge('inv_sgraduation'), selData.finish_years, {
      big: 1,
      width: 222,
      autocomplete: true,
      placeholderColor: '#000',
      placeholder: cur.lang.select_year_not_selected,
      noResult: cur.lang.select_year_not_found,
      selectedItems: selData.s_grad,
      onChange: function(value) {
        if (!intval(value)) {
          uiSchoolGradYear.clear();
        }
      }
    });*/

  },

  send: function(force) {
    if (!force && buttonLocked('invite_send_btn')) return;

    var fnameRaw = trim(ge('inv_fname').value), lnameRaw = trim(ge('inv_lname').value);
    var name = cleanName(fnameRaw, lnameRaw);
    fname = name[0];
    lname = name[1];

    var sex = isVisible('inv_sex_row') ? intval(ge('inv_sex').value) : -1, phone = ge('inv_mobile').value;
    if (!fname || fname.length * 2 < fnameRaw.length) {
      scrollToTop(0);
      return notaBene('inv_fname');
    }
    if (!lname || lname.length * 2 < lnameRaw.length) {
      scrollToTop(0);
      return notaBene('inv_lname');
    }
    if (!sex) {
      return cur.uiSex.showDefaultList();
    }
    if (phone.length < 5) {
      scrollToTop(0);
      return notaBene('inv_mobile');
    }
    var params = {act: 'invite', hash: cur.invHash, fname: fname, lname: lname, sex: sex, phone: phone, lang: isVisible('inv_lang_row') ? ge('inv_lang').value : 0};
    if (curBox()) {
      params.from = 'box';
    }
    if (isVisible('inv_base_info')) {
      extend(params, {
        bday: ge('inv_bday').value,
        bmonth: ge('inv_bmonth').value,
        byear: ge('inv_byear').value,
        country: ge('inv_country').value,
        city: ge('inv_city').value
      });
    }
    if (isVisible('inv_school_info')) {
      extend(params, {
        scountry: ge('inv_scountry').value,
        scity: ge('inv_scity').value,
        sschool: ge('inv_sschool').value,
        sschool_custom: ge('inv_sschool_custom').value,
        sschool_type: ge('inv_sschool_type').value
      });
      if (isVisible('inv_sdetails')) {
        extend(params, {
          sclass: ge('inv_sclass').value,
          sstart: ge('inv_sstart').value,
          sfinish: ge('inv_sfinish').value,
          sgraduation: ge('inv_sgraduation').value
        });
      }
    }
    if (isVisible('inv_uni_info')) {
      extend(params, {
        ucountry: ge('inv_ucountry').value,
        ucity: ge('inv_ucity').value,
        uuniversity: ge('inv_uuniversity').value,
        uuniversity_custom: ge('inv_uuniversity_custom').value,
        ufaculty: ge('inv_ufaculty').value,
        ufaculty_custom: ge('inv_ufaculty_custom').value,
        uchair: ge('inv_uchair').value,
        uchair_custom: ge('inv_uchair_custom').value
      });
      if (isVisible('inv_udetails')) {
        extend(params, {
          ueduform: ge('inv_uedu_form').value,
          uedustatus: ge('inv_uedu_status').value,
          ugraduation: ge('inv_ugraduation').value
        });
      }
    }
    val('inv_error', '');
    ajax.post('invite.php', params, {
      onDone: function(res, html) {
        if (res) {
          setTimeout(inviter.send.pbind(true), 1000);
          return;
        }
        if (html) {
          var container = ge('invited_invites_sent');
          var newEl = se(html);
          newEl.style.display = 'none';
          container.insertBefore(newEl, container.firstChild);
          show('invited_popup_box', 'invited_invites_sent_wrap');
          slideDown(newEl, 200);

          each(['inv_fname', 'inv_lname', 'inv_mobile'], function(i, el) { val(el, '') });
          return;
        }
        show('inv_sex_row');
        cur.uiSex.showDefaultList();
      },
      onFail: function(text) {
        if (!text) return;
        showMsg('inv_error', text, 'error');
        return true;
      },
      showProgress: lockButton.pbind('invite_send_btn'),
      hideProgress: unlockButton.pbind('invite_send_btn')
    });
  },
  showInvites: function() {
    hide('invited_invites_show');
    show('invites_invites_wrap');
  },
  toggleContestTop: function(toggle) {
    var topEl = ge('contest_top');
    if (this.contestTopShown) {
      cssAnim(topEl, { maxHeight: 0 }, { duration: 200 });
      toggle.innerHTML = toggle.getAttribute('data-lang-show');
    } else {
      cssAnim(topEl, { maxHeight: 500 }, { duration: 200 });
      toggle.innerHTML = toggle.getAttribute('data-lang-hide');
    }
    this.contestTopShown = !this.contestTopShown;
  }
}

try{stManager.done('invite.js');}catch(e){}
