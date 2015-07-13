var ProfileEditorMil = {

  init: function() {
    cur.globalCounter = 0;
    cur.militariesCount = 0;

    selectsData.setCountries(cur.selData.countries_list);

    if (!isVisible('militaries')) {
      cur.militariesCount = cur.militaries.length;
      if (cur.militariesCount) {
        for (var i = 0; i < cur.militaries.length; ++i) {
          ge('militaries').appendChild(this.genMilitaryRow(cur.militaries[i].id));
          cur.militaries[i] = this.initMilitaryRow(cur.militaries[i]);
        }
      } else {
        this.addMilitary();
      }
      show('militaries');
    }

    if (cur.militariesCount >= 5) {
      hide('add_military_link');
    } else {
      show('add_military_link');
    }
  },

  genOneRow: function(field, id, label, params, additional) {
    var key = field + id;
    if (!params) {
      params = '';
    }
    if (!additional) {
      additional = '';
    }
    return '<div class="pedit_edu_row" id="row_' + key + '">' +
              '<div class="label fl_l ta_r">' + label + '</div>' +
              '<div class="labeled fl_l"><input id="' + key + '" name="' + key + '" ' + params + '/></div>' +
           additional + '</div>';
  },

  genMilitaryRow: function(military_id) {
    return ce('div', {
      className: 'pedit_edu_big_row',
      id: 'military' + military_id,
      innerHTML: '<div id="content' + military_id + '">' +
        this.genOneRow('country', military_id, getLang('select_country'), '',
        '<img src="/images/upload.gif" class="pedit_progress" id="progress' + military_id + '" />' +
        '<a class="fl_r" onclick="ProfileEditorMil.deleteMilitary(' + military_id + ')">' + getLang('global_delete') + '</a>') +
        '<div id="details' + military_id + '" style="display: none">' +
          this.genOneRow('unit', military_id, getLang('select_military_unit')) +
        '<div id="all' + military_id + '" style="display: none">' +
          this.genOneRow('start', military_id, getLang('select_military_start')) +
          this.genOneRow('finish', military_id, getLang('select_military_finish')) +
        '</div></div></div>' +
        '<div class="deleted" id="deleted' + military_id + '"><div></div>' +
          '<a class="fl_r" onclick="ProfileEditorMil.restoreMilitary(' + military_id + ')">' + getLang('global_dont_delete') + '</a>' +
        '</div><div class="separator"><div></div></div>'
    }, {display: 'none'});
  },

  get_by_id: function(elem, id) {
    if (elem.id == id) {
      return elem;
    }
    for (var i = 0; i < elem.childNodes.length; ++i) {
      var result = this.get_by_id(elem.childNodes[i], id);
      if (result) {
        return result;
      }
    }
    return false;
  },

  initMilitaryRow: function(military, elem) {
    var g = elem ? function(id) { return ProfileEditorMil.get_by_id(elem, id); } : ge;
    military.uiStart = new Dropdown(g('start' + military.id), [[0, getLang('select_year_not_selected')]].concat(cur.selData.from_years), {
      width: 200,
      autocomplete: true,
      placeholder: getLang('select_year_not_selected'),
      placeholderColor: '#000',
      noResult: getLang('select_year_not_found'),
      onChange: function(value) {
        value = intval(value);
        var new_finish_data = [];
        if (!value) {
          military.uiStart.clear();
          new_finish_data = cur.selData.until_years;
        } else {
          var finish_value = intval(military.uiFinish.val());
          if (finish_value && finish_value < value) {
            military.uiFinish.val(value);
          }
          for (var i = 0; i < cur.selData.until_years.length; ++i) {
            if (cur.selData.until_years[i][0] >= value) {
              new_finish_data.push(cur.selData.until_years[i]);
            }
          }
        }
        military.uiFinish.setOptions({defaultItems: [[0, getLang('select_year_not_selected')]].concat(new_finish_data)});
        military.uiFinish.setData(new_finish_data);
      },
      dark: 1
    });
    military.uiStart.setData(cur.selData.from_years);
    military.uiFinish = new Dropdown(g('finish' + military.id), [[0, getLang('select_year_not_selected')]].concat(cur.selData.until_years), {
      width: 200,
      autocomplete: true,
      placeholder: getLang('select_year_not_selected'),
      placeholderColor: '#000',
      noResult: getLang('select_year_not_found'),
      onChange: function(value) {
        value = intval(value);
        var new_start_data = [];
        if (!value) {
          military.uiFinish.clear();
          new_start_data = cur.selData.from_years;
        } else {
          var start_value = intval(military.uiStart.val());
          if (start_value && start_value > value) {
            military.uiStart.val(value);
          }
          for (var i = 0; i < cur.selData.from_years.length; ++i) {
            if (cur.selData.from_years[i][0] <= value) {
              new_start_data.push(cur.selData.from_years[i]);
            }
          }
        }
        military.uiStart.setOptions({defaultItems: [[0, getLang('select_year_not_selected')]].concat(new_start_data)});
        military.uiStart.setData(new_start_data);
      },
      dark: 1
    });
    military.uiFinish.setData(cur.selData.until_years);

    military.uiStart.val(military.start, true);
    military.uiFinish.val(military.finish, true);

    military.uiUnit = new Selector(g('unit' + military.id), 'select_ajax.php?act=a_get_units&country=' + military.country, {
      width: 200,
      multiselect: false,
      placeholder: getLang('select_military_unit_not_selected'),
      placeholderColor: '#000',
      noResult: getLang('select_military_unit_select'),
      introText: getLang('select_military_unit_select'),
      selectedItems: [military.unit_val],
      dropdown: false,
      enableCustom: true,
      progressBar: 'progress' + military.id,
      onChange: function(value) {
        if (!intval(value)) {
          military.uiUnit.clear();
          hide('all' + military.id);
        } else {
          show('all' + military.id);
        }
        military.uiStart.val(0, true);
        military.uiFinish.val(0, true);
      },
      dark: 1
    });

    military.uiCountry = new CountrySelect(g('country' + military.id), g('row_country' + military.id), {
      width: 200,
      progressBar: 'progress' + military.id,
      country: military.country_val,
      onChange: function(value) {
        if (intval(value)) {
          show('details' + military.id);
          military.uiUnit.setURL('select_ajax.php?act=a_get_units&country=' + value);
        } else {
          hide('details' + military.id);
        }
      },
      dark: 1
    });

    g('military' + military.id).style.display = 'block';
    if (intval(military.country)) {
      g('details' + military.id).style.display = 'block';
    }
    if (intval(military.unit)) {
      g('all' + military.id).style.display = 'block';
    }

    return military;
  },

  addMilitary: function() {
    if (cur.militariesCount >= 5) {
      return false;
    }
    var new_military = {
      id: -(++cur.globalCounter),
      country: cur.selData.mem.country,
      country_val: cur.selData.mem.country_val,
      unit: 0,
      unit_val: '',
      start: 0,
      finish: 0
    };
    ge('militaries').appendChild(this.genMilitaryRow(new_military.id));
    new_military = this.initMilitaryRow(new_military);
    cur.militaries.push(new_military);
    ++cur.militariesCount;
    if (cur.militariesCount >= 5) {
      hide('add_military_link');
    }
    return false;
  },

  getIndex: function(data, id) {
    for (var i = 0; i < data.length; ++i) {
      if (data[i].id == id) {
        return i;
      }
    }
    return false;
  },

  deleteMilitary: function(id) {
    --cur.militariesCount;
    show('add_military_link');
    if (intval(ge('unit' + id).value)) {
      hide('content' + id);
      ge('deleted' + id).firstChild.innerHTML = getLang('profileEdit_military_will_be_deleted');
      show('deleted' + id);
    } else {
      var index = this.getIndex(cur.militaries, id);
      cur.militaries[index] = cur.militaries[cur.militaries.length - 1];
      cur.militaries.pop();
      ge('military' + id).parentNode.removeChild(ge('military' + id));
      if (cur.militaries.length == 0) {
        this.addMilitary();
      }
    }
    return false;
  },

  restoreMilitary: function(id) {
    if (cur.militariesCount >= 5) {
      return false;
    }
    hide('deleted' + id);
    show('content' + id);
    ++cur.militariesCount;
    if (cur.militariesCount >= 5) {
      hide('add_military_link');
    }
    return false;
  },

  addFields: function() {
    var params = arguments[0];
    var id = arguments[1];
    var index = arguments[2];
    for (var i = 3; i < arguments.length; ++i) {
      if (intval(ge(arguments[i] + id).value)) {
        params[arguments[i] + index] = ge(arguments[i] + id).value;
      }
    }
    return params;
  },

  saveMilitaries: function(btn) {
    var params = {act: 'a_save_military', hash: ge('hash').value};
    for (var i = 0; i < cur.militaries.length; ++i) {
      var id = cur.militaries[i].id;
      params['id' + i] = id;
      if (isVisible('content' + id) && intval(ge('unit' + id).value)) {
        params = this.addFields(params, id, i, 'country', 'unit', 'start', 'finish');
        if (ge('unit' + id + '_custom').value.length) {
          params['unit' + i + '_custom'] = ge('unit' + id + '_custom').value;
        }
      } else {
        params['deleted' + i] = 1;
      }
    }

    var doneHandler = function(response) {
      var to_remove = [];
      for (var i = 0; i < cur.militaries.length; ++i) {
        var new_military_id = response['res' + i];
        if (intval(new_military_id)) {
          cur.militaries[i] = this.updateMilitary(cur.militaries[i], new_military_id, ge('militaries'));
        } else {
          to_remove.push(i);
        }
      }
      for (var i = 0; i < to_remove.length; ++i) {
        var index = to_remove[i];
        ge('military' + cur.militaries[index].id).parentNode.removeChild(ge('military' + cur.militaries[index].id));
        cur.militaries[index] = cur.militaries[cur.militaries.length - 1];
        for (var j = i + 1; j < to_remove.length; ++j) {
          if (to_remove[j] == cur.militaries.length - 1) {
            to_remove[j] = index;
          }
        }
        cur.militaries.pop();
      }
      cur.militariesCount = cur.militaries.length;
      if (cur.militariesCount >= 5) {
        hide('add_military_link');
      } else {
        show('add_military_link');
      }
      if (!cur.militariesCount) {
        this.addMilitary();
      }
    }

    ajax.post('al_profileEdit.php', params, {
      onDone: function (mil_data) {
        doneHandler.call(ProfileEditorMil, mil_data);
        ProfileEditor.showMsg(getLang('profileEdit_military_saved'));
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
    return false;
  },

  updateMilitary: function(old_military, new_military_id, parent) {
    old_military.country = old_military.uiCountry.val();
    old_military.country_val = old_military.uiCountry.val_full();
    old_military.unit = old_military.uiUnit.val();
    old_military.unit_val = old_military.uiUnit.val_full();
    old_military.start = old_military.uiStart.val();
    old_military.finish = old_military.uiFinish.val();

    var new_elem = this.genMilitaryRow(new_military_id);
    var old_elem = ge('military' + old_military.id);
    old_military.id = new_military_id;
    new_military = this.initMilitaryRow(old_military, new_elem);
    parent.replaceChild(new_elem, old_elem);

    return new_military;
  },

  militaryChanged: function(military) {
    return !isVisible('content' + military.id) ||
           military.country != military.uiCountry.val() || military.unit != military.uiUnit.val() ||
           military.start != military.uiStart.val() || military.finish != military.uiFinish.val();
  }
};

try{stManager.done('profile_edit_mil.js');}catch(e){}
