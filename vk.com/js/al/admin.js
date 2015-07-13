var adminAddItem = {
  init: function(type) {
    this.clear();

    type = type || '';

    if (cur.addItem.options.obj_id) {
      if (type == 'school') {
        var school = this.getSchool();
        if (school && school.uiSchool) {
          cur.addItem.options.country = school.uiCountry.val();
          cur.addItem.options.country_val = school.uiCountry.val_full();
          cur.addItem.options.city = school.uiCity.val();
          cur.addItem.options.city_val = school.uiCity.val_full();
          cur.addItem.options.school = school.uiSchool.val();
          cur.addItem.options.school_val = school.uiSchool.val_full();
        }
      } else if (type == 'uni' || type == 'faculty' || type == 'chair') {
        var uni = this.getUni();
        if (uni && uni.uiUniversity) {
          cur.addItem.options.country = uni.uiCountry.val();
          cur.addItem.options.country_val = uni.uiCountry.val_full();
          cur.addItem.options.city = uni.uiCity.val();
          cur.addItem.options.city_val = uni.uiCity.val_full();
          cur.addItem.options.uni = uni.uiUniversity.val();
          cur.addItem.options.uni_val = uni.uiUniversity.val_full();
          cur.addItem.options.faculty = uni.uiFaculty.val();
          cur.addItem.options.faculty_val = uni.uiFaculty.val_full();
          cur.addItem.options.chair = uni.uiChair.val();
          cur.addItem.options.chair_val = uni.uiChair.val_full();
        }
      }
    }
  },
  setType: function (type) {
    this.init(type);
    switch (type) {
      case 'school':
        this.schoolInit();
        this.setTypeTitle(cur.addItem.lang['admin_adding_school']);
        this.setAddBtnTitle(cur.addItem.lang['admin_add_school']);
        break;
      case 'uni':
        this.uniInit();
        cur.addItem.options.city && show('row_adm_additem_short', 'row_adm_additem_link');
        this.setTypeTitle(cur.addItem.lang['admin_adding_uni']);
        this.setAddBtnTitle(cur.addItem.lang['admin_add_uni']);
        break;
      case 'faculty':
        cur.addItem.options.uni && show('row_adm_additem_link');
        this.facultyInit();
        this.setTypeTitle(cur.addItem.lang['admin_adding_fac']);
        this.setAddBtnTitle(cur.addItem.lang['admin_add_fac']);
        break;
      case 'chair':
        cur.addItem.options.faculty && show('row_adm_additem_link');
        this.chairInit();
        this.setTypeTitle(cur.addItem.lang['admin_adding_chair']);
        this.setAddBtnTitle(cur.addItem.lang['admin_add_chair']);
        break;
      case 'street':
        this.streetInit();
        this.setTypeTitle(cur.addItem.lang['admin_adding_street']);
        this.setAddBtnTitle(cur.addItem.lang['admin_add_street']);
        break;
      default:
        return;
        break;
    }
    hide('adm_additem_result');
    hide('adm_additem_error');
    addClass(ge('adm_additem_tab_' + type), 'selected');
    var inputsWrapElem = ge('adm_additem_inputs');
    if (!isVisible(inputsWrapElem)) {
      slideDown(inputsWrapElem, 200);
    }
    cur.addItem.curType = type;
  },
  clear: function (hideInputs) {
    switch (cur.addItem.curType) {
      case 'school':
        this.schoolDestroy();
        break;
      case 'uni':
        this.uniDestroy();
        break;
      case 'faculty':
        this.facultyDestroy();
        break;
      case 'chair':
        this.chairDestroy();
        break;
      case 'street':
        this.streetDestroy();
        break;
      default:
        break;
    }
    hide('adm_additem_result');
    hide('adm_additem_error');
    removeClass(ge('adm_additem_tab_' + cur.addItem.curType), 'selected');
    cur.addItem.curType = false;
    if (!cur.addItem.options.isBox && hideInputs) {
      hide('adm_additem_inputs');
    }
  },
  setTypeTitle: function (title) {
    ge('adm_additem_rows_title').innerHTML = title;
  },
  setAddBtnTitle: function (title) {
    ge('adm_additem_btn_add').innerHTML = title;
  },
  cityInit: function (options) {
    var defaultOptions = {
      width: 230,
      progressBar: 'adm_additem_progress',
      city: cur.addItem.options.city_val,
      country: cur.addItem.options.country,
      maxItemsShown: function (query_length) {
        return (query_length > 6) ? 500 : 350;
      },
      dark: 1,
      visible: 1
    };
    options = extend(defaultOptions, options || {});
    if (cur.addItem.uiCity) {
      cur.addItem.uiCity.setOptions(options);
    } else {
      cur.addItem.uiCity = new CitySelect(ge('adm_additem_city'), ge('row_adm_additem_city'), options);
    }
    this.countryInit({
      citySelect: cur.addItem.uiCity
    });
  },
  cityDestroy: function () {
    cur.addItem.uiCity.hide();
    this.countryDestroy();
  },
  countryInit: function (options) {
    var defaultOptions = {
      width: 230,
      progressBar: 'adm_additem_progress',
      country: cur.addItem.options.country_val,
      dark: 1,
      visible: 1
    };
    options = extend(defaultOptions, options || {});
    if (cur.addItem.uiCountry) {
      cur.addItem.uiCountry.setOptions(options);
    } else {
      cur.addItem.uiCountry = new CountrySelect(ge('adm_additem_country'), ge('row_adm_additem_country'), options);
    }
  },
  countryDestroy: function () {
    cur.addItem.uiCountry.hide();
  },
  schoolInit: function () {
    // client search
    var options = {
      width: 150,
      progressBar: 'adm_additem_progress',
      school: cur.addItem.options.school_val || '',
      city: cur.addItem.options.city,
      forceEnableCustom: 1,
      type: 0,
      types: cur.addItem.options.schoolTypes,
      type_width: 72,
      dark: 1,
      visible: 1
    };

    if (cur.addItem.uiSchool) {
      cur.addItem.uiSchool.setOptions(options);
    } else {
      cur.addItem.uiSchool = new SchoolSelect(ge('adm_additem_school'), ge('row_adm_additem_school'), ge('adm_additem_school_type'), ge('row_adm_additem_school_type'), options);
    }

    this.cityInit({
      schoolSelect: cur.addItem.uiSchool,
      onChange: false
    });
  },
  schoolDestroy: function () {
    cur.addItem.uiSchool.clear();
    cur.addItem.uiSchool.hide();
    this.cityDestroy();
  },
  uniInit: function (options, cityOptions) {
    var defaultOptions = {
      width: 230,
      progressBar: 'adm_additem_progress',
      university: cur.addItem.options.uni_val || '',
      city: cur.addItem.options.city,
      forceEnableCustom: 1,
      dark: 1,
      visible: 1
    };
    options = extend(defaultOptions, options || {});
    if (cur.addItem.uiUni) {
      cur.addItem.uiUni.setOptions(options);
    } else {
      cur.addItem.uiUni = new UniversitySelect(ge('adm_additem_uni'), ge('row_adm_additem_uni'), options);
    }

    var onChange = function(val) {
      if (intval(val)) {
        show('row_adm_additem_short', 'row_adm_additem_link');
      } else {
        hide('row_adm_additem_short', 'row_adm_additem_link');
      }
    };

    this.cityInit(extend({
      universitySelect: cur.addItem.uiUni,
      onChange: onChange
    }, cityOptions || {}));
  },
  uniDestroy: function () {
    cur.addItem.uiUni.clear();
    cur.addItem.uiUni.hide();
    val('adm_additem_short', '');
    val('adm_additem_link', '');
    hide('row_adm_additem_short', 'row_adm_additem_link');
    this.cityDestroy();
  },
  facultyInit: function (options, uniOptions) {
    var defaultOptions = {
      width: 230,
      progressBar: 'adm_additem_progress',
      university: cur.addItem.options.uni || '',
      faculty: cur.addItem.options.faculty_val || '',
      city: cur.addItem.options.city,
      forceEnableCustom: 1,
      dark: 1,
      visible: 1
    };

    options = extend(defaultOptions, options || {});
    if (cur.addItem.uiFaculty) {
      cur.addItem.uiFaculty.setOptions(options);
    } else {
      cur.addItem.uiFaculty = new FacultySelect(ge('adm_additem_fac'), ge('row_adm_additem_fac'), options);
    }

    this.uniInit(extend({
      forceEnableCustom: -1,
      facultySelect: cur.addItem.uiFaculty,
      onChange: function (val) {
        if (intval(val)) {
          show('row_adm_additem_link');
        } else {
          hide('row_adm_additem_link');
        }
      }
    }, uniOptions || {}), {onChange: false});
  },
  facultyDestroy: function () {
    cur.addItem.uiFaculty.clear();
    cur.addItem.uiFaculty.hide();
    val('adm_additem_link', '');
    hide('row_adm_additem_link');
    this.uniDestroy();
  },
  chairInit: function () {
    var defaultOptons = {
      width: 230,
      progressBar: 'adm_additem_progress',
      university: cur.addItem.options.uni || '',
      faculty: cur.addItem.options.faculty || '',
      chair: cur.addItem.options.chair_val || '',
      city: cur.addItem.options.city,
      forceEnableCustom: 1,
      dark: 1,
      visible: 1
    };

    if (cur.addItem.uiChair) {
      cur.addItem.uiChair.setOptions(defaultOptons);
    } else {
      cur.addItem.uiChair = new ChairSelect(ge('adm_additem_chair'), ge('row_adm_additem_chair'), defaultOptons);
    }

    this.facultyInit({
      forceEnableCustom: -1,
      chairSelect: cur.addItem.uiChair,
      onChange: function (val) {
        if (intval(val)) {
          show('row_adm_additem_link');
        } else {
          hide('row_adm_additem_link');
        }
      }
    }, {onChange: false});
  },
  chairDestroy: function () {
    cur.addItem.uiChair.clear();
    cur.addItem.uiChair.hide();
    val('adm_additem_link', '');
    hide('row_adm_additem_link');
    this.facultyDestroy();
  },
  streetInit: function () {
    if (cur.addItem.uiStreet) {
      cur.addItem.uiStreet.show();
    } else {
      cur.addItem.uiStreet = new StreetSelect(ge('adm_additem_street'), ge('row_adm_additem_street'), {
        width: 230,
        progressBar: 'adm_additem_progress',
        city: cur.addItem.options.city,
        forceEnableCustom: 1,
        dark: 1,
        visible: 1
      });
    }

    this.cityInit({
      streetSelect: cur.addItem.uiStreet,
      onChange: false
    });
  },
  streetDestroy: function () {
    cur.addItem.uiStreet.clear();
    cur.addItem.uiStreet.hide();
    this.cityDestroy();
  },
  addItem: function (btn) {
    if (!cur.addItem.curType) {
      return;
    }

    var params = {
      hash: cur.addItem.options.hash
    }, alreadyMsg = '';

    switch (cur.addItem.curType) {
      case 'school':
        alreadyMsg = cur.addItem.lang['admin_school_already'];
        if (!this.validateValue(cur.addItem.uiSchool, alreadyMsg)) {
          return;
        }
        params = extend(params, {
          act: 'do_add_school',
          country1: cur.addItem.uiCountry.val(),
          city1: cur.addItem.uiCity.val(),
          school1: cur.addItem.uiSchool.val(),
          school1_type: val('adm_additem_school_type'),
          school1_custom: cur.addItem.uiSchool.customVal()
        });
        break;
      case 'uni':
        alreadyMsg = cur.addItem.lang['admin_uni_already'];
        if (!this.validateValue(cur.addItem.uiUni, alreadyMsg)) {
          return;
        }
        params = extend(params, {
          act: 'do_add_university',
          uni_city: cur.addItem.uiCity.val(),
          university: cur.addItem.uiUni.val(),
          university_custom: cur.addItem.uiUni.customVal(),
          university_short: val('adm_additem_short'),
          university_url: val('adm_additem_link')
        });
        break;
      case 'faculty':
        alreadyMsg = cur.addItem.lang['admin_fac_already'];
        if (!this.validateValue(cur.addItem.uiFaculty, alreadyMsg)) {
          return;
        }
        params = extend(params, {
          act: 'do_add_faculty',
          uni_city2: cur.addItem.uiCity.val(),
          university2: cur.addItem.uiUni.val(),
          faculty2: cur.addItem.uiFaculty.val(),
          faculty2_custom: cur.addItem.uiFaculty.customVal(),
          faculty2_url: val('adm_additem_link')
        });
        break;
      case 'chair':
        alreadyMsg = cur.addItem.lang['admin_chair_already'];
        if (!this.validateValue(cur.addItem.uiChair, alreadyMsg)) {
          return;
        }
        params = extend(params, {
          act: 'do_add_chair',
          uni_city3: cur.addItem.uiCity.val(),
          university3: cur.addItem.uiUni.val(),
          faculty3: cur.addItem.uiFaculty.val(),
          chair3: cur.addItem.uiChair.val(),
          chair3_custom: cur.addItem.uiChair.customVal(),
          chair3_url: val('adm_additem_link')
        });
        break;
      case 'street':
        alreadyMsg = cur.addItem.lang['admin_street_already'];
        if (!this.validateValue(cur.addItem.uiStreet, alreadyMsg)) {
          return;
        }
        params = extend(params, {
          act: 'do_add_street',
          uni_city4: cur.addItem.uiCity.val(),
          street4: cur.addItem.uiStreet.val(),
          street4_custom: cur.addItem.uiStreet.customVal()
        });
        break;
      default:
        return;
        break;
    }
    ajax.post('admin.php', params, {
      onDone: function (res, msg) {
        if (intval(res) === 0) {
          hide('adm_additem_error');
          if (cur.addItem.options.isBox) {
            showDoneBox(msg);
            cur.addItemBox.hide();
          } else {
            this.clear(true);
            ge('adm_additem_result').innerHTML = '<div class="msg">' + msg + '</div>';
            show('adm_additem_result');
          }
          return;
        } else if (intval(res) > 0 && alreadyMsg) {
          msg = alreadyMsg;
        }
        if (msg) {
          this.showError(msg);
        }
      }.bind(this),
      onFail: function (msg) {
        if (msg) {
          this.showError(msg);
        }
        return true;
      }.bind(this),
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  showError: function (msg) {
    ge('adm_additem_error').innerHTML = '<div class="msg">' + msg + '</div>';
    hide('adm_additem_result');
    show('adm_additem_error');
  },
  validateValue: function (selector, alreadyMsg) {
    if (selector && intval(selector.val()) > 0) {
      this.showError(alreadyMsg);
      return false;
    } else if (selector && intval(selector.val()) == -1 && selector.customVal()) {
      hide('adm_additem_error');
      hide('adm_additem_result');
      return true;
    } else if (selector) {
      hide('adm_additem_error');
      hide('adm_additem_result');
    }
    return false;
  },
  destroyScope: function () {
    if (cur.addItem.uiSchool) {
      cur.addItem.uiSchool.destroy();
    }
    if (cur.addItem.uiUni) {
      cur.addItem.uiUni.destroy();
    }
    if (cur.addItem.uiFaculty) {
      cur.addItem.uiFaculty.destroy();
    }
    if (cur.addItem.uiChair) {
      cur.addItem.uiChair.destroy();
    }
    if (cur.addItem.uiStreet) {
      cur.addItem.uiStreet.destroy();
    }
    cur.addItem = {};
  },
  getUni: function() {
    var idx = ProfileEditorEdu && cur.addItem.options.obj_id ? ProfileEditorEdu.getIndex(cur.unis, cur.addItem.options.obj_id) : false;
    return idx === false ? cur.primary_uni || false : cur.unis[idx];
  },
  getSchool: function() {
    var idx = ProfileEditorEdu && cur.addItem.options.obj_id ? ProfileEditorEdu.getIndex(cur.schools, cur.addItem.options.obj_id) : false;
    return idx === false ? false : cur.schools[idx];
  }
};

try { stManager.done('admin.js'); } catch (e) { }