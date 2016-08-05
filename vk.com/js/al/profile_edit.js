var ProfileEditor = {
  go: function(el, ev) {
    if (ProfileEditor.checkChanges(1) === false) {
      cur.onContinueCb = ProfileEditor.go.pbind(el, ev);
      return false;
    }
    var current = ProfileEditor.getsect();
    var result = checkEvent(ev);
    if (result === false) {
      current.className = '';
      el.parentNode.className = 'active_link';
    }
    if (el.href.indexOf('edit') != -1) {
      return nav.go(el, ev);
    }
  },
  getsect: function() {
    var current = ge('pedit_filters').firstChild;
    for (; !hasClass(current, 'active_link');) {
      current = current.nextSibling;
    }
    return current;
  },

  showMsg: function (msg) {
    ge('pedit_result').innerHTML = '<div class="msg" id="pedit_msg">' + msg + '</div>';
    show('pedit_result');
    animate(ge('pedit_msg'), {backgroundColor: '#F9F6E7'}, 2000);
    scrollToTop(200);
  },

  initBeforeUnload: function () {
    cur.nav.push(function (changed, old, n, opts) {
      if (ProfileEditor.checkChanges(1) === false) {
        cur.onContinueCb = nav.go.pbind(n);
        return false;
      }
    });
    cur.prevBefUnload = window.onbeforeunload;
    window.onbeforeunload = ProfileEditor.checkChanges;
    cur.destroy.push(function () {
      window.onbeforeunload = cur.prevBefUnload;
    });
  },

  initGeneral: function () {
    cur.section = 'general';
    var peditData = cur.options;

    // Change name hint
    var ttEl = ge('pedit_name_tt_place');
    each([ge('pedit_first_name'), ge('pedit_last_name')], function () {
      if (!this || this == window || this.setTimeout) return;
      this.onfocus = function () {
        showTooltip(ttEl, {
          text: '<div class="pedit_side_tt_pointer pedit_name_pointer"></div>' + getLang('profileEdit_name_be_patient'),
          slideX: 15,
          className: 'pedit_side_name_tt',
          shift: [-12, -54, 3],
          onCreate: function () {
            removeEvent(ttEl, 'mouseout');
          }
        });
      };
      this.onblur = function () {
        if (!ttEl.tt) return;
        ttEl.tt.hide();
      }
    });
    each(['home_town', 'first_name', 'last_name', 'middle_name', 'maiden_name'], function (k, v) {
      peditData[v] = replaceEntities(peditData[v]);
    });
    toggle('pedit_maiden_row', peditData.sex == 1);


    cur.uiSex = new Dropdown(ge('pedit_sex'), peditData.sexes, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.sex,
      onChange: function(value) {
        hide('pedit_status_ptitle', 'pedit_status_partner', 'pedit_status_detail');
        toggle('pedit_maiden_row', intval(value) == 1);
        cur.uiPartner.clear();
        cur.uiStatus.clear();
        if (intval(value)) {
          show('pedit_status_row');
          cur.uiStatus.setData(peditData.statuses[intval(value)]);
        } else {
          hide('pedit_status_row');
        }
      },
      dark: 1
    });

    var onPartnerChangeCb = function (val) {
      if (val) {
        cur.uiPartner.selectItem(val);
      } else {
        cur.uiPartner.val(0);
      }
      if (cur.onPartnerGot) {
        cur.onPartnerGot();
        cur.onPartnerGot = false;
      }
    };

    var handlePartnerChange = function(value) {
      if (!cur.uiSex.val()) {
        onPartnerChangeCb(0);
        return;
      }
      var statusVal = cur.uiStatus.val();
      if (value == -1) {
        if (statusVal == 7) { // allow find lover by link
          var custom = val('pedit_partner_custom');
          if (custom == peditData.partners[0][1]) {
            onPartnerChangeCb(0);
            return;
          }
          ajax.post('al_profileEdit.php', {act: 'a_get_custom_partner', query: custom}, {
            onDone: function (item, isFriend, sex) {
              if (!item || !isFriend && statusVal != 7/* || sex == cur.uiSex.val()*/) { // disallow custom type for other types
                onPartnerChangeCb(0);
              } else {
                onPartnerChangeCb(item);
              }
            },
            onFail: function (msg) {
              onPartnerChangeCb(0);
              setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
              return true;
            },
            showProgress: show.pbind('pedit_status_progress'),
            hideProgress: hide.pbind('pedit_status_progress')
          });
        } else {
          onPartnerChangeCb(0);
        }
      }
      if (intval(value) && statusVal > 1 && cur.uiStatus.val() < 6) {
        if (intval(value) == peditData.partner) {
          if (ge('pedit_status_detail_content').innerHTML) show('pedit_status_detail');
        } else {
          hide('pedit_status_detail');
        }
      } else {
        if (!intval(value)) {
          cur.uiPartner.clear();
        }
        hide('pedit_status_detail');
      }
    }
    if (peditData.status > 7 || peditData.status < 0) {
      peditData.status = 0;
    }

    cur.uiStatus = new Dropdown(ge('pedit_status'), peditData.statuses[peditData.sex], {
      width: 232,
      multiselect: false,
      selectedItems: peditData.status,
      onChange: function(value) {
        value = intval(value);
        if (value > 1 && value < 6 || value == 7) {
          ProfileEditor.updateFriendsList(function() {
            show('pedit_status_partner');
            if (peditData.ptitles[value][cur.uiSex.val()].length) {
              ge('pedit_status_ptitle').innerHTML = peditData.ptitles[value][cur.uiSex.val()] + ':' || '&nbsp;';
              show('pedit_status_ptitle');
            } else {
              hide('pedit_status_ptitle');
            }
            handlePartnerChange(cur.uiPartner.val());
          });
        } else {
          hide('pedit_status_partner', 'pedit_status_ptitle');
          handlePartnerChange(cur.uiPartner.val());
        }
      },
      dark: 1
    });

    cur.uiPartner = new Selector(ge('pedit_partner'), peditData.partners, {
      width: 232,
      multiselect: false,
      autocomplete: true,
      enableCustom: true,
      placeholder: peditData.partners[0][1],
      placeholderColor: '#000',
      noResult: '',
      introText: '',
      selectedItems: peditData.partner,
      onChange: handlePartnerChange,
      dark: 1
    });

    var partnerInput = cur.uiPartner.input, partnerTtEl = ge('pedit_partner_tt_place'), partnerTtEl1 = ge('pedit_partner_tt_place1');
    addEvent(partnerInput, 'focus blur', function (e) {
      if (e.type == 'focus') {
        if (cur.uiStatus.val() == 7) {
          showTooltip(partnerTtEl, {
            text: '<div class="pedit_side_tt_pointer pedit_partner_pointer"></div>' + getLang('profileEdit_partner_hint'),
            slideX: 15,
            className: 'settings_side_tt pedit_side_pwd_tt',
            shift: [-12, -50, 3],
            onCreate: function () {
              removeEvent(partnerTtEl, 'mouseout');
            }
          });
        } else if (indexOf([2,3,4,5,7], cur.uiStatus.val()) != -1) {
          showTooltip(partnerTtEl1, {
            text: '<div class="pedit_side_tt_pointer pedit_partner_pointer1"></div>' + peditData.status_helps[3 - cur.uiSex.val()],
            slideX: 15,
            className: 'settings_side_tt pedit_side_pwd_tt',
            shift: [-12, -63, 3],
            onCreate: function () {
              removeEvent(partnerTtEl1, 'mouseout');
            }
          });
        }
      } else {
        partnerTtEl.tt && partnerTtEl.tt.hide && partnerTtEl.tt.hide();
        partnerTtEl1.tt && partnerTtEl1.tt.hide && partnerTtEl1.tt.hide();
      }
    });

    if (peditData.sex) {
      show('pedit_status_row');
      if (peditData.status > 1 && peditData.status != 6) {
        if (peditData.ptitles[peditData.status][peditData.sex].length) {
          ge('pedit_status_ptitle').innerHTML = peditData.ptitles[peditData.status][peditData.sex] + ':' || '&nbsp;';
          show('pedit_status_ptitle');
        }
        show('pedit_status_partner');
      }
    }
    if (peditData.partner) {
      if (ge('pedit_status_detail_content').innerHTML) show('pedit_status_detail');
    }

    cur.uiBday = new Dropdown(ge('pedit_bday'), ProfileEditor.generateDays(peditData.byear, peditData.bmonth).slice(intval(peditData.bday) ? 1 : 0), {
      width: 55,
      multiselect: false,
      selectedItems: peditData.bday,
      dark: 1
    });

    cur.uiBmonth = new Dropdown(ge('pedit_bmonth'), peditData.bmonths.slice(intval(peditData.bmonth) ? 1 : 0), {
      width: 96,
      multiselect: false,
      selectedItems: peditData.bmonth,
      onChange: function(value) {
        ProfileEditor.updateDays(cur.uiByear.val(), value);
      },
      dark: 1
    });

    cur.uiByear = new Dropdown(ge('pedit_byear'), peditData.byears.slice(intval(peditData.byear) ? 1 : 0), {
      width: 65,
      multiselect: false,
      selectedItems: peditData.byear,
      onChange: function(value) {
        ProfileEditor.updateDays(value, cur.uiBmonth.val());
      },
      dark: 1
    });

    cur.uiBdayVisibility = new Dropdown(ge('pedit_bday_visibility'), peditData.bday_visibilities, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.bday_visibility,
      dark: 1
    });

    ge('pedit_home_town').value = peditData.home_town;

    cur.uiLangs = new Dropdown(ge('pedit_langs'), peditData.langs, {
      width: 232,
      multiselect: true,
      autocomplete: true,
      indexkeys: [1, 2],
      selectedItems: peditData.lang,
      dark: 1
    });

    cur.relations = [];
    cur.relGuid = 0;
    cur.relIds = {grandparent: 0, parent: 0, sibling: 0, child: 0, grandchild: 0};
    cur.relLimits = {grandparent: 4, parent: 2, sibling: 15, child: 15, grandchild: 15};
    cur.conts = {
      grandparent: 'pedit_grandparents',
      parent: 'pedit_parents',
      sibling: 'pedit_siblings',
      child: 'pedit_children',
      grandchild: 'pedit_grandchildren'
    };
    cur.placeholders = {
      grandparent: getLang('profileEdit_grandparent_placeholder'),
      parent: getLang('profileEdit_parent_placeholder'),
      sibling: getLang('profileEdit_sibling_placeholder'),
      child: getLang('profileEdit_child_placeholder'),
      grandchild: getLang('profileEdit_grandchild_placeholder')
    };

    ProfileEditor.updateFamily(peditData.family);
    ProfileEditor.initBeforeUnload();
    cur.module = 'profileEdit';
  },

  initContacts: function () {
    cur.section = 'contacts';

    selectsData.setCountries(cur.selectData.countries);
    selectsData.setCities(cur.selectData.country, cur.selectData.cities);

    cur.selectData.city_val = cur.selectData.city_val || ['', ''];
    cur.selectData.country_val = cur.selectData.country_val || ['', ''];

    cur.uiCity = new CitySelect(ge('pedit_city'), ge('pedit_city_row'), {
      width: 178,
      progressBar: ge('pedit_country_progress'),
      city: cur.selectData.city_val,
      country: cur.selectData.country,
      maxItemsShown: function(query_length) {
        return (query_length > 6) ? 500 : 350;
      },
      dark: 1
    });

    cur.uiCountry = new CountrySelect(ge('pedit_country'), ge('pedit_country_row'), {
      width: 178,
      progressBar: ge('pedit_country_progress'),
      country: cur.selectData.country_val,
      citySelect: cur.uiCity,
      dark: 1
    });

    ge('pedit_email').value = cur.options.email;
    ge('pedit_mobile').value = cur.options.mobile;
    ge('pedit_home').value = cur.options.home;
    ge('pedit_website').value = cur.options.website;
    ge('pedit_skype').value = cur.options.skype;

    ProfileEditor.initBeforeUnload();
  },

  wereChanges: function (section) {
    switch (section) {
      case 'general':
        var peditData = cur.options;
        return val('pedit_sex') != peditData.sex || val('pedit_status') != peditData.status ||
          val('pedit_partner') != peditData.partner || val('pedit_bday') != peditData.bday ||
          val('pedit_bmonth') != peditData.bmonth || val('pedit_byear') != peditData.byear ||
          val('pedit_bday_visibility') != peditData.bday_visibility ||
          val('pedit_home_town') != peditData.home_town ||
          val('pedit_first_name') != peditData.first_name ||
          val('pedit_last_name') != peditData.last_name ||
          ge('pedit_middle_name') && val('pedit_middle_name') != peditData.middle_name ||
          val('pedit_maiden_name') != peditData.maiden_name||
          val('pedit_langs') != peditData.lang && (val('pedit_langs') || peditData.lang);
        break;

      case 'contacts':
        var peditData = cur.options;
        return ge('pedit_email').value != peditData.email
            || ge('pedit_mobile').value != peditData.mobile
            || ge('pedit_home').value != peditData.home
            || ge('pedit_website').value != peditData.website
            || ge('pedit_skype').value != (peditData.skype || '')
            || (parseInt(ge('pedit_country').value) || '') != (cur.selectData['country_val'][0] || '')
            || (parseInt(ge('pedit_city').value) || '') != (cur.selectData['city_val'][0] || '')
        return false;

      case 'interests':
        var result = false;
        each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function(k, field) {
          var el = ge('pedit_interests_' + field);
          result |= (cur.interests_data[field].replace(/\x0d/g, '') != val(el).replace(/\x0d/g, ''));
        });
        return result;
        break;

      case 'education':
        var school_change = false, uni_change = false;
        if (isVisible('primary_uni')) {
          if (ProfileEditorEdu.uniChanged(cur.primary_uni)) {
            uni_change = true;
          } else {
            for (var i = 0; i < cur.unis.length; ++i) {
              if (cur.unis[i].id > 0 && ProfileEditorEdu.uniChanged(cur.unis[i])) {
                uni_change = true;
              } else if (cur.unis[i].id < 0 && isVisible('uni_content' + cur.unis[i].id) && cur.unis[i].uiUniversity.val()) {
                uni_change = true;
              }
            }
          }
        }
        if (isVisible('schools')) {
          for (var i = 0; i < cur.schools.length; ++i) {
            if (cur.schools[i].id > 0 && ProfileEditorEdu.schoolChanged(cur.schools[i])) {
              school_change = true;
            } else if (cur.schools[i].id < 0 && isVisible('school_content' + cur.schools[i].id) && cur.schools[i].uiSchool.val()) {
              school_change = true;
            }
          }
        }
        return uni_change || school_change;
        break;

      case 'career':
        var work_change = false;
        for (var i = 0; i < cur.works.length; ++i) {
          var position = (cur.works[i].uiPosition.val_full() || [])[1] || '';
          var compRow = ge('company' + cur.works[i].id);
          if (cur.works[i].id > 0 && ProfileEditorJob.workChanged(cur.works[i])) {
            work_change = true;
          } else if (cur.works[i].id < 0 && isVisible('content' + cur.works[i].id) && ((compRow && compRow.value.length) || position.length)) {
            work_change = true;
          }
        }
        return work_change;
        break;

      case 'military':
        var military_change = false;
        for (var i = 0; i < cur.militaries.length; ++i) {
          if (cur.militaries[i].id > 0 && ProfileEditorMil.militaryChanged(cur.militaries[i])) {
            military_change = true;
          } else if (cur.militaries[i].id < 0 && isVisible('content' + cur.militaries[i].id) && intval(ge('unit' + cur.militaries[i].id).value)) {
            military_change = true;
          }
        }
        return military_change;
        break;

      case 'personal':
        var peditData = cur.options;
        return cur.uiPolitical.val() != peditData.political ||
          (cur.uiReligion.val_full()[1].toLowerCase() != peditData.religion.toLowerCase() && (cur.uiReligion.val() || peditData.religion != '')) ||
          val('pedit_life') != peditData.life_priority ||
          val('pedit_people') != peditData.people_priority ||
          val('pedit_smoking') != peditData.smoking ||
          val('pedit_alcohol') != peditData.alcohol ||
          val('pedit_inspired_by') != peditData.inspired_by
        break;
    }
  },

  checkChanges: function(showBox) {
    if (cur.leaving) return;
    var message = false;
    if (ProfileEditor.wereChanges(cur.section)) {
      switch (cur.section) {
        case 'contacts':
          message = getLang('profileEdit_contacts_changed');
          break;

        case 'general':
          message = getLang('profileEdit_general_changed');
          break;

        case 'interests':
          message = getLang('profileEdit_interests_changed');
          break;

        case 'education':
          message = getLang('profileEdit_unis_schools_changed');
          break;

        case 'career':
          message = getLang('profileEdit_works_changed');
          break;

        case 'military':
          message = getLang('profileEdit_militaries_changed');
          break;

        case 'personal':
          message = getLang('profileEdit_personal_changed');
          break;
      }
    }
    if (showBox === 1) {
      if (!message) return true;
      var box = showFastBox(getLang('global_warning'), message, getLang('global_continue'), function () {
        cur.leaving = true;
        box.hide();
        if (cur.onContinueCb) {
          cur.onContinueCb();
        }
      }, getLang('global_cancel'), function () {
        box.hide();
        if (cur.onCancelCb) {
          cur.onCancelCb();
        }
      });
      return false;
    }
    if (message) {
      return winToUtf(message.replace(/<\/?b>/g, '').replace(/<br\s*\/?>/g, '\n'));
    }
  },

  getLastDay: function (year, month) {
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

  generateDays: function(year, month) {
    var result = [[0, getLang('profileEdit_main_sel_bday')+':']], last = ProfileEditor.getLastDay(year, month);
    for (var i = 1; i <= last; ++i) {
      result.push([i, i + '']);
    }
    return result;
  },

  updateDays: function (year, month) {
    if (cur.uiBday.val() > ProfileEditor.getLastDay(year, month)) {
      cur.uiBday.clear();
    }
    cur.uiBday.setData(ProfileEditor.generateDays(year, month).slice(intval(cur.options.bday) ? 1 : 0));
    if (cur.onUpdateDays) {
      cur.onUpdateDays(year, month);
    }
  },

  updateFriendsList: function (cb) {
    if (!cur.friendsFull) {
      ajax.post('al_profileEdit.php', {act: 'a_relations_friends'}, {
        onDone: function(friends) {
          cur.friendsFull = {1: {}, 2: {}};
          for (var i = 1; i <= 2; ++i) {
            var o = 3 - i, fr; // other sex
            for (var j in friends[i]) {
              var croppedArray = [], frs = clone(friends[i][j]), croppedFrs = [];
              for (var k = 1; k < frs.length; ++k) {
                fr = frs[k];
                croppedArray.push(fr);
                croppedFrs.push(fr);
              }
              for (var k = 1; k < friends[o][j].length; ++k) {
                fr = friends[o][j][k];
                frs.push(fr);
                croppedFrs.push(fr);
              }
              cur.friendsFull[i][j] = [friends[i][j], croppedArray, frs, croppedFrs];
            }
          }
          ProfileEditor.doUpdateFriendsList();
          cb();
        },
        showProgress: show.pbind('pedit_status_progress'),
        hideProgress: hide.pbind('pedit_status_progress')
      });
    } else {
      ProfileEditor.doUpdateFriendsList();
      cb();
    }
  },
  doUpdateFriendsList: function () {
    var status = cur.uiStatus.val(), sex = cur.uiSex.val();
    if (status < 2 || status == 6 || !sex) return;
    var data = cur.friendsFull[sex].Nom, gs = (status == 2 || status == 7 || status == 5) ? 2 : 0, p = cur.uiPartner.val(), found = false;

    for (var i in data[gs]) {
      if (data[gs][i][0] == p) {
        found = true;
        break;
      }
    }
    if (!found) p = 0;

    data[gs][0][1] = getLang((status == 5) ? 'profileEdit_main_sel_rel_with_m' : (gs ? 'profileEdit_main_sel_relat' : 'profileEdit_main_sel_rel_with_' + (sex == 1 ? 'm' : 'f')));

    cur.uiPartner.setData(data[gs + 1]);
    cur.uiPartner.setOptions({defaultItems: data[gs]});
    cur.uiPartner.setOptions({placeholder: data[gs][0][1]});
    cur.uiPartner.val(p, true);
  },


  updateFamily: function (family) {
    ge('pedit_grandparents').innerHTML = '';
    ge('pedit_parents').innerHTML = '';
    ge('pedit_siblings').innerHTML = '';
    ge('pedit_children').innerHTML = '';
    ge('pedit_grandchildren').innerHTML = '';
    cur.relGuid = 0;
    cur.relIds = {grandparent: 0, parent: 0, sibling: 0, child: 0, grandchild: 0};
    relations = [];
    if (!family) return;

    each(family || [], function(i,v) {
      var guid = cur.relGuid;
      sel = v.id > 0 ? v.id : [v.id, v.name, '', v.birth];
      ProfileEditor.addRelation(v.type, sel);
    });
  },

  addRelation: function(type, selected) {
    if (!cur.friends) {
      ProfileEditor.loadFriends(type, selected);
    } else {
      ProfileEditor.onFriendsLoaded(type, selected);
    }
  },

  onFriendsLoaded: function(type, selected) {
    var peditData = cur.options;
    var wrap = ce('div', {id: 'pedit_wrap_' + type + cur.relGuid, className: 'pedit_wrap_relation clear_fix'});
    var withDate = (type == 'child' || type == 'grandchild') && (!selected || selected[0] < 0);
    var name = type + cur.relGuid, id = 'pedit_' + name;
    var html = '<div class="pedit_relation_input"><div class="fl_l"><input type="hidden" id="' + id + '" name="' + name + '"/></div><div class="fl_r" style="padding-top: 8px;"><a href="" onclick="ProfileEditor.removeRelation(\'' + type + '\', ' + cur.relGuid + ');return false;">' + getLang('global_delete') + '</a></div>';
    var t = 0;
    if (withDate) {
      t = selected ? parseInt(selected[3]) : 0;
      html += '<div class="pedit_relation_date clear_fix clear"><input class="pedit_date_field" type="hidden" id="' + id + '_date" value="'+ t +'"><div class="pedit_bday fl_l"><input type="hidden" id="' + id + '_day"/></div><div class="pedit_bmonth fl_l"><input type="hidden" id="' + id + '_month"/></div><div class="pedit_byear fl_l"><input type="hidden" id="' + id + '_year"/></div></div>';
    }
    wrap.innerHTML = html;
    ge(cur.conts[type]).appendChild(wrap);
    if(cur.relIds[type] + 1 >= cur.relLimits[type]) {
      hide('pedit_add_' + type + '_link');
    } else {
      show('pedit_add_' + type + '_link');
    }
    var relDD = new Selector(ge(id), cur.friends, {
      width: 232,
      placeholder: cur.placeholders[type],
      introText: '',
      multiselect: false,
      enableCustom: true,
      defaultItems: cur.friends,
      selectedItems: selected?[selected]: [],
      onChange: function(v) {
        var dateEl = ge(id + '_date');
        if (!dateEl) return;
        toggle(dateEl.parentNode, v == -1);
      },
      dark: 1
    });
    if (withDate) {
      var d = new Date(t * 1000);

      var years = [peditData.byears[0]];
      var min_year = 1910;
      if (parseInt(peditData.byear)) {
        min_year = Math.max(min_year, parseInt(peditData.byear) + 10);
      }
      for (var i = min_year; i <= (new Date()).getFullYear(); i++) {
        years.push([i,i]);
      }

      var onDateChange = function() {
        var t = 0, d = intval(dayDD.val()), y = intval(yearDD.val()), m = intval(monthDD.val());
        if (d > ProfileEditor.getLastDay(y, m)) {
          dayDD.val(1);
          d = 1;
        }
        dayDD.setData(ProfileEditor.generateDays(y, m));

        if (y) {
          var date = new Date(y, Math.max(m - 1, 0), Math.max(d, 1));
          t = Math.floor(date.getTime() / 1000);
        }
        ge(id + '_date').value = t;
      }

      var dayDD   = new Dropdown(ge(id + '_day'), ProfileEditor.generateDays(d.getFullYear(), d.getMonth() + 1), {width: 55, selectedItems: t ? d.getDate() : 0, onChange: onDateChange, dark: 1});
      var monthDD = new Dropdown(ge(id + '_month'), peditData.bmonths, {width: 95, selectedItems: t ? (d.getMonth()+1): 0, onChange: onDateChange, dark: 1});
      var yearDD  = new Dropdown(ge(id + '_year'), years, {width: 66, selectedItems: t ? d.getFullYear() : 0, onChange: onDateChange, dark: 1});
    }
    cur.relIds[type]++;
    cur.relGuid++;
  },

  switchUnits: function () {
    var curMeasure = cur.options.measure = cur.options.measure == 1 ? 2 : 1,
        curW = cur.uiWeight.val(),
        curH = cur.uiHeight.val(),
        newWeightData = cur.options.weights[curMeasure],
        newHeightData = cur.options.heights[curMeasure],
        newW = curW,
        newH = curH;

    if (newH >= 140 && newH <= 220) each (newHeightData, function () {
      if (this[0] >= 140 && this[0] <= 220 && this[0] >= curH) {
        newH = this[0];
        return false;
      }
    });
    cur.uiHeight.setData(newHeightData);
    cur.uiHeight.val(newH);

    if (newW >= 40 && newW <= 140) each (newWeightData, function () {
      if (this[0] >= 40 && this[0] <= 140 && this[0] >= curW) {
        newW = this[0];
        return false;
      }
    });
    cur.uiWeight.setData(newWeightData);
    cur.uiWeight.val(newW);
    ge('pedit_units_toggler').innerHTML = curMeasure == 1 ? getLang('profileEdit_switch_to_meters') : getLang('profileEdit_switch_to_inches');
    ge('pedit_height_title').innerHTML = curMeasure == 1 ? getLang('profileEdit_height_in') : getLang('profileEdit_height_cm');
    ge('pedit_weight_title').innerHTML = curMeasure == 1 ? getLang('profileEdit_weight_lbs') : getLang('profileEdit_weight_kg');
  },


  removeRelation: function (type, id) {
    var wrap = ge('pedit_wrap_' + type + id);
    if(!wrap) return;
    wrap.parentNode.removeChild(wrap);
    var rel_id = type+id;
    if(cur.relIds[type] - 1 >= cur.relLimits[type]) {
      hide('pedit_add_'+type+'_link');
    } else {
      show('pedit_add_'+type+'_link');
    }
    cur.relIds[type]--;
  },

  loadFriends: function(type, selected) {
    if (cur.onFrLoaded) {
      return cur.onFrLoaded.push([type, selected]);
    }
    cur.onFrLoaded = [[type, selected]];
    ajax.post('friends_ajax.php', {act: 'custom', no_lists: 1}, {
      onDone: function(friends) {
        if (!cur.onFrLoaded) return;

        cur.friends = friends;
        for (var i = 0, l = cur.onFrLoaded.length; i < l; ++i) {
          ProfileEditor.onFriendsLoaded(cur.onFrLoaded[i][0], cur.onFrLoaded[i][1]);
        }
      }
    });
  },

  showLoversBox: function () {
    cur.lovers_box = showBox('al_profileEdit.php', {act: 'show_lovers_box'}, {params: {width: 495, bodyStyle: 'padding: 7px 5px 5px;'}});
  },
  getLoversPage: function (offset) {
    var box = cur.lovers_box;
    ajax.post('al_profileEdit.php', {act: 'show_lovers_box', offset: offset}, {
      onDone: function(title, html) {
        if (title) {
          box.setOptions({title: title});
        }
        if (html) {
          box.bodyNode.innerHTML = html;
        }
      },
      showProgress: box.showProgress,
      hideProgress: box.hideProgress,
      cache: 1
    });
  },


  saveGeneral: function (btn) {
    var fName = trim(val('pedit_first_name')),
        lName = trim(val('pedit_last_name')),
        mName = isVisible('pedit_maiden_row') ? trim(val('pedit_maiden_name')) : '',
        nName = trim(val('pedit_middle_name')),
        flmName, cleanFName, cleanLName, cleanMName,
        peditData = cur.options;

    if (!fName) {
      notaBene('pedit_first_name');
      return false;
    }
    if (!lName) {
      notaBene('pedit_last_name');
      return false;
    }
    flmName = cleanName(fName, lName, mName);
    if (peditData.first_name == fName && peditData.last_name == lName) {
      cleanFName = fName;
      cleanLName = lName;
    } else {
      cleanFName = flmName[0];
      cleanLName = flmName[1];
    }
    if (cleanFName.toLowerCase() != fName.toLowerCase()) {
//      val('pedit_first_name', cleanFName); // bad idea
      notaBene('pedit_first_name');
      return false;
    }
    if (cleanLName.toLowerCase() != lName.toLowerCase()) {
//      val('pedit_last_name', cleanLName); // bad idea
      notaBene('pedit_last_name');
      return false;
    }
    cleanMName = flmName[2];
    if (cleanMName.toLowerCase() != mName.toLowerCase() && (cleanMName || mName)) {
//      val('pedit_maiden_name', cleanMName); // bad idea
      notaBene('pedit_maiden_name');
      return false;
    }

    if (cur.uiPartner.val() == -1) {
      cur.onPartnerGot = ProfileEditor.saveGeneral.pbind(btn);
      cur.uiPartner.options.onChange();
      return;
    }
    if (!intval(cur.uiSex.val())) {
      cur.uiSex.showDefaultList();
      return;
    }

    var params = {
      act: 'a_save_general',
      hash: cur.options.hash,
      first_name: cleanFName,
      last_name: cleanLName,
      maiden_name: cleanMName,
      nickname: nName
    };

    each(['sex', 'status', 'partner', 'bday', 'bmonth', 'byear', 'bday_visibility'], function() {
      var value = intval(val('pedit_' + this));
      if (value) {
        params['' + this] = value;
      }
    });
    params.home_town = val('pedit_home_town');
    params.langs = cur.uiLangs.val();

    if (parseInt(cur.options.bday) && !intval(params.bday)) {
      notaBene(geByClass1('selector', cur.uiBday.container), false, true);
      notaBene(geByClass1('selector_input', cur.uiBday.container), false, true);
      return;
    }
    if (parseInt(cur.options.bmonth) && !intval(params.bmonth)) {
      notaBene(geByClass1('selector', cur.uiBmonth.container), false, true);
      notaBene(geByClass1('selector_input', cur.uiBmonth.container), false, true);
      return;
    }
    if (parseInt(cur.options.byear) && !intval(params.byear)) {
      notaBene(geByClass1('selector', cur.uiByear.container), false, true);
      notaBene(geByClass1('selector_input', cur.uiByear.container), false, true);
      return;
    }


    var i = 0;
    if (peditData.family !== false) {
      params['familyedit'] = 1;
      i = 1;
      each(geByClass('pedit_relation_input', ge('pedit_grandparents')), function() {
        params['grandparents['+i+']'] = geByClass('resultField', this)[0].value;
        params['grandparents_custom['+i+']'] = geByClass('customField', this)[0].value;
        if (params['grandparents['+i+']'] == -1 && params['grandparents_custom['+i+']']) {
          var name = params['grandparents_custom['+i+']'];
          var n = name.split(/\s+/);
          params['grandparents_custom['+i+']'] = cleanName(n[0] || '', n[1] || '').join(' ');
        }
        i++;
      });
      i = 1;
      each(geByClass('pedit_relation_input', ge('pedit_parents')), function() {
        params['parents['+i+']'] = geByClass('resultField', this)[0].value;
        params['parents_custom['+i+']'] = geByClass('customField', this)[0].value;
        if(params['parents['+i+']'] == -1 && params['parents_custom['+i+']']) {
          var name = params['parents_custom['+i+']'];
          var n = name.split(/\s+/);
          params['parents_custom['+i+']'] = cleanName(n[0] || '', n[1] || '').join(' ');
        }
        i++;
      });
      i = 1;
      each(geByClass('pedit_relation_input', ge('pedit_siblings')), function() {
        params['siblings['+i+']'] = geByClass('resultField', this)[0].value;
        params['siblings_custom['+i+']'] = geByClass('customField', this)[0].value;
        if(params['siblings['+i+']'] == -1 && params['siblings_custom['+i+']']) {
          var name = params['siblings_custom['+i+']'];
          var n = name.split(/\s+/);
          params['siblings_custom['+i+']'] = cleanName(n[0] || '', n[1] || '').join(' ');
        }
        i++;
      });
      i = 1;
      each(geByClass('pedit_relation_input', ge('pedit_children')), function() {
        params['children['+i+']'] = geByClass('resultField', this)[0].value;
        params['children_custom['+i+']'] = geByClass('customField', this)[0].value;
        params['children_date['+i+']'] = (geByClass('pedit_date_field', this)[0]||{value:0}).value;
        if (params['children['+i+']'] == -1 && params['children_custom['+i+']']) {
          var name = params['children_custom['+i+']'];
          var n = name.split(/\s+/);
          params['children_custom['+i+']'] = cleanName(n[0] || '', n[1] || '').join(' ');
        }
        i++;
      });
      i = 1;
      each(geByClass('pedit_relation_input', ge('pedit_grandchildren')), function() {
        params['grandchildren['+i+']'] = geByClass('resultField', this)[0].value;
        params['grandchildren_custom['+i+']'] = geByClass('customField', this)[0].value;
        params['grandchildren_date['+i+']'] = (geByClass('pedit_date_field', this)[0]||{value:0}).value;
        if (params['grandchildren['+i+']'] == -1 && params['grandchildren_custom['+i+']']) {
          var name = params['grandchildren_custom['+i+']'];
          var n = name.split(/\s+/);
          params['grandchildren_custom['+i+']'] = cleanName(n[0] || '', n[1] || '').join(' ');
        }
        i++;
      });
    }
    // debugLog(params);
    if (cur.onProfileEditSave) {
      cur.onProfileEditSave();
    }
    ajax.post('al_profileEdit.php', params, {
      onDone: function(response, introScript) {
        if (response.only_name) {
          ProfileEditor.showMsg(response.name_response);
          return;
        }

        var peditData = cur.options;
        peditData.sex              = cur.uiSex.val();
        peditData.status           = response.status;
        peditData.partner          = response.partner;
        peditData.bday             = cur.uiBday.val();
        peditData.bmonth           = cur.uiBmonth.val();
        peditData.byear            = cur.uiByear.val();
        peditData.bday_visibility  = cur.uiBdayVisibility.val();
        peditData.lang             = cur.uiLangs.val();
        peditData.home_town        = val('pedit_home_town');
        peditData.first_name       = val('pedit_first_name');
        peditData.last_name        = val('pedit_last_name');
        peditData.middle_name      = val('pedit_middle_name');
        peditData.maiden_name      = val('pedit_maiden_name');

        cur.uiStatus.val(response.status, true);
        if (cur.uiPartner.val() != response.partner)
          cur.uiPartner.val(response.partner, true);

        if (peditData.family !== false) {
          peditData.family         = response.family;
          ProfileEditor.updateFamily(peditData.family);
          if (peditData.family === false) {
            each(geByClass('pedit_general_family_row'), function() { hide(this); });
          }
        }

        val('pedit_status_detail_content', response.relation_text);
        if (peditData.partner) {
          if (val('pedit_status_detail_content')) show('pedit_status_detail');
        } else {
          hide('pedit_status_detail');
        }
        hide('pedit_name_request', 'status_help_wrap');

        ProfileEditor.showMsg(response.name_response || getLang('profileEdit_general_changes_saved'));

        if (introScript) {
          setTimeout(function() {
            eval(introScript);
          }, 3000);
        }
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
    return false;
  },
  nameRequestCancel: function (link, reqId, hash) {
    var progress = ce('div', {className: 'progress'}, {display: 'block'});
    ajax.post('al_settings.php', {act: 'a_cancel_name', request_id: reqId, hash: hash}, {
      onDone: function (msg) {
        hide('pedit_name_request');
        ProfileEditor.showMsg(msg);
      },
      onFail: function (msg) {
        ProfileEditor.showError(msg, 'name');
      },
      showProgress: function () {
        link.parentNode.replaceChild(progress, link);
      },
      hideProgress: function () {
        progress.parentNode.replaceChild(link, progress);
      }
    });
  },
  nameChangeCancel: function(obj, hash) {
    if (cur.nameChangeCancelText) {
      return;
    }
    cur.nameChangeCancelText = obj.innerHTML;
    obj.innerHTML = '<div style="padding-top: 8px;"><img src="/images/upload.gif" /></div>';
    ajax.post('al_settings.php', {act: 'a_change_cancel', hash: hash}, {
      onDone: function() {
        obj.innerHTML = cur.nameChangeCancelText;
        cur.nameChangeCancelText = false;
      }
    });
  },

  saveContacts: function(btn) {

    var params = {
      act: 'a_save_contacts',
      hash: cur.saveHash
    }

    var fields = ['email', 'mobile', 'home', 'website', 'skype', 'country', 'city'];
    for (var i in fields) {
      params[fields[i]] = ge('pedit_'+fields[i]).value;
    }

    fields = ['email', 'mobile', 'home'];
    for (var i in fields) {
      params['privacy_'+fields[i]] = Privacy.getValue(fields[i]);
    }

    ajax.post('al_profileEdit.php', params, {
      onDone: function(data, text) {
        if (data) {
          for (var i in data) {
            cur.options[i] = data[i];
            ge('pedit_'+i).value = data[i] || '';
          }
          cur.selectData['country_val'][0] = parseInt(data['country']);
          cur.selectData['city_val'][0] = parseInt(data['city']);
        }
        if (text) {
          ProfileEditor.showMsg(text);
        }
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });

  },

  showSocial: function() {
    hide('pedit_show_social');
    show('pedit_social_options');
  },

  setUpTwitter: function() {
    showBox('al_profileEdit.php', {act: 'twitter_settings_box'}, {dark: 1, params: {width: 460}});
  },

  setUpFacebook: function(app_id, redir, authorized) {
    if (authorized && !cur.disableFbExport) {
      return showBox('al_profileEdit.php', {act: 'facebook_settings_box'});
    }
    var url = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&redirect_uri=' + redir + '&scope=email,user_birthday,publish_actions&display=popup';
    var params = 'scrollbars=0,resizable=1,menubar=0,location=0,left='+(Math.floor(screen.width / 2) - 300)+',top='+(Math.floor(screen.height / 2) - 240)+',width=600,height=400,toolbar=0,status=0';
    var win = window.open(url, 'fb', params);
    try {
      win.focus();
    } catch(e) { }
    window.socialCallback = function(data) {
      ge('export_service_3').innerHTML = '<img src="/images/upload.gif" />';
      ProfileEditor.fetchServiceName(3);
    }
    return;
  },

  fetchServiceName: function(service) {
    cur['nameService'+service] = setInterval(function() {
      ajax.post('/al_profileEdit.php', {act: 'a_get_service_name', service: service}, {
        onDone: function(result) {
          if (result.msg) {
            clearInterval(cur['nameService'+service]);
            ge('export_service_'+service).innerHTML = (result.msg_sett) ? result.msg_sett : result.msg;
            var boxStr = ge('export_box_service_'+service);
            if (boxStr) {
              boxStr.innerHTML = result.msg;
              cur.showIntegrationSaveBtns();
            }
          }
        }
      });
    }, 1000);
  },

  setUpLiveJournal: function() {
    showBox('al_profileEdit.php', {act: 'lj_settings_box'});
  },

  setUpInstagram: function(redirectUrl) {
    var clientId = '1fdcd1b154d54990892368072ab4d303';
    var url = 'https://api.instagram.com/oauth/authorize/?client_id='+clientId+'&redirect_uri='+redirectUrl+'&response_type=code';
    var params = 'scrollbars=0,resizable=1,menubar=0,location=0,left='+(Math.floor(screen.width / 2) - 300)+',top='+(Math.floor(screen.height / 2) - 240)+',width=600,height=400,toolbar=0,status=0';
    var win = window.open(url, 'instagram', params);
    try {
      win.focus();
    } catch(e) { }
    window.socialCallback = function(data) {
      showBox('al_profileEdit.php', {act: 'instagram_settings_box'}, {dark: true, params: {width: 460}});
      //ge('export_service_4').innerHTML = '<div class="progress_inline"></div>';
      //ProfileEditor.fetchServiceName(4);
    }
    return;
  },

  getLiveJournalName: function(box) {
    var nameService2 = setInterval(function() {
      ajax.post('/al_profileEdit.php', {act: 'a_get_livejournal_name'}, {
        onDone: function(result) {
          if (!result || result.error == undefined) return;
          clearInterval(nameService2);
          if (result.msg) {
            box.hide();
            ge('export_service_2').innerHTML = result.msg;
            return;
          } else {
            if (box) {
              box.hideProgress();
            }

            if (result.error == 1) {
              ge('pedit_lj_error').innerHTML = 'Server error.';
              show('pedit_lj_error');
            } else if (result.error == 2) {
              ge('pedit_lj_error').innerHTML = cur.lang['settings_lj_wrong_password'];
              show('pedit_lj_error');
            }
          }
        }
      });
    }, 1000);
  },

  clearSocialExport: function(service) {
    var title, msg;
    switch (service) {
      case 1: title = 'settings_status_export'; msg = 'settings_status_confirm'; break;
      case 2: title = 'settings_notes_export'; msg = 'settings_livejournal_confirm'; break;
      case 3: title = 'settings_status_export'; msg = 'settings_facebook_confirm'; break;
      case 4: title = 'settings_status_import_photo'; msg = 'settings_instagram_confirm'; break;
    }
    var msg = '<center>'+getLang(msg)+'</center>';
    var clrBox = showFastBox(getLang(title), msg, getLang('global_continue'), function() {
      ajax.post('/al_profileEdit.php', {act: 'a_clear_social_export', service: service, hash: cur.saveHash}, {onDone: function(result) {
        if (!result || !result.msg) return;
        clrBox.hide();
        ge('export_service_'+service).innerHTML = result.msg;
        setTimeout(scrollToTop, 300);
        var settBox = curBox();
        if (settBox) {
          settBox.hide();
        }
      }});
      clrBox.showProgress();
    }, getLang('global_cancel'));
  },

  slideShow: function(elem, speed) {
    if (!isVisible(elem)) slideDown(elem, speed || 150);
  },
  slideHide: function(elem, speed) {
    if (isVisible(elem)) slideUp(elem, speed || 150);
  },

  initInterests: function () {
    cur.interests_data = {};
    cur.section = 'interests';
    each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function (k, field) {
      var el = ge('pedit_interests_' + field);
      cur.interests_data[field] = val(el);
      autosizeSetup(el, {minHeight: 80, height: 80});
    });
    ProfileEditor.initBeforeUnload();
  },

  saveInterests: function (btn) {
    var params = {act: 'a_save_interests', hash: cur.options.hash};
    each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function (k, field) {
      params[field] = val('pedit_interests_' + field);
    });
    ajax.post('al_profileEdit.php', params, {
      onDone: function (interests_data) {
        each(['activities', 'interests', 'music', 'movies', 'tv', 'books', 'games', 'quotes', 'about'], function(k, field) {
          var el = ge('pedit_interests_' + field);
          val(el, cur.interests_data[field] = winToUtf(interests_data[field]));
          el.autosize.update();
        });
        ProfileEditor.showMsg(getLang('profileEdit_interests_saved'));
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
    return false;
  },

  initEducation: function () {
    cur.section = 'education';

    cur.nav.push(function(changed, old, n) {
      if (old[0] != 'edit' || changed[0]) return true;

      if ((old['act'] == 'education' || old['act'] == 'higher_education') && (n['act'] == 'education' || n['act'] == 'higher_education')) {
        ProfileEditor.selectEduTab(changed['act']);
        return false;
      } else {
        return true;
      }
    });
    cur.onCancelCb = function() {
      if (cur.section != 'education') return;

      var school_change = false, uni_change = false;
      if (isVisible('primary_uni')) {
        if (ProfileEditorEdu.uniChanged(cur.primary_uni)) {
          uni_change = true;
        } else {
          for (var i = 0; i < cur.unis.length; ++i) {
            if (cur.unis[i].id > 0 && ProfileEditorEdu.uniChanged(cur.unis[i])) {
              uni_change = true;
            } else if (cur.unis[i].id < 0 && isVisible('uni_content' + cur.unis[i].id) && cur.unis[i].uiUniversity.val()) {
              uni_change = true;
            }
          }
        }
      }
      if (isVisible('schools')) {
        for (var i = 0; i < cur.schools.length; ++i) {
          if (cur.schools[i].id > 0 && ProfileEditorEdu.schoolChanged(cur.schools[i])) {
            school_change = true;
          } else if (cur.schools[i].id < 0 && isVisible('school_content' + cur.schools[i].id) && cur.schools[i].uiSchool.val()) {
            school_change = true;
          }
        }
      }
      if (cur.filter_uni && !uni_change && school_change) {
        ProfileEditor.selectEduTab('education');
      } else if (!cur.filter_uni && !school_change && uni_change) {
        ProfileEditor.selectEduTab('higher_education');
      }
    };

    if (!cur.demo) {
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
    }

    ProfileEditorEdu.init();
    ProfileEditor.initBeforeUnload();

    this.selectEduTab(cur.filter_uni ? 'higher_education' : 'education', true);
  },

  selectEduTab: function (tab, isInit) {
    var loc = {0: 'edit', 'act': tab};
    if (tab == 'education') {
      cur.filter_uni = 0;
      removeClass(ge('sum_tab_schools').parentNode, 'summary_tab');
      addClass(ge('sum_tab_schools').parentNode, 'summary_tab_sel');
      removeClass(ge('sum_tab_unis').parentNode, 'summary_tab_sel');
      addClass(ge('sum_tab_unis').parentNode, 'summary_tab');
      show('school');
      hide('uni');
      hide('pedit_result');

      ge('summary').innerHTML = getLang('profileEdit_can_edit_schools');

      if (!isVisible('schools')) {
        cur.schoolsCount = cur.schools.length;
        if (cur.schoolsCount) {
          for (var i = 0; i < cur.schools.length; ++i) {
            ge('schools').appendChild(ProfileEditorEdu.genSchoolRow(cur.schools[i].id));
            cur.schools[i] = ProfileEditorEdu.initSchoolRow(cur.schools[i]);
          }
        } else {
          ProfileEditorEdu.addSchool();
        }
        show('schools');
      }

      if (cur.schoolsCount >= 7) {
        hide('add_school_link');
      } else {
        show('add_school_link');
      }
      if (isInit && 'add_item' in nav.objLoc) {
        loc.add_item = nav.objLoc.add_item;
      }
      nav.setLoc(loc);
    } else if (tab == 'higher_education') {
      cur.filter_uni = 1;
      removeClass(ge('sum_tab_unis').parentNode, 'summary_tab');
      addClass(ge('sum_tab_unis').parentNode, 'summary_tab_sel');
      removeClass(ge('sum_tab_schools').parentNode, 'summary_tab_sel');
      addClass(ge('sum_tab_schools').parentNode, 'summary_tab');
      show('uni');
      hide('school');
      hide('pedit_result');

      ge('summary').innerHTML = getLang('profileEdit_can_edit_unis');

      if (!isVisible('primary_uni')) {
        ge('primary_uni').appendChild(ProfileEditorEdu.genUniRow(cur.primary_uni.id, true));
        cur.primary_uni = ProfileEditorEdu.initUniRow(cur.primary_uni);
        show('primary_uni');
        cur.unisCount = cur.unis.length;
        if (cur.unisCount) {
          for (var i = 0; i < cur.unis.length; ++i) {
            ge('unis').appendChild(ProfileEditorEdu.genUniRow(cur.unis[i].id));
            cur.unis[i] = ProfileEditorEdu.initUniRow(cur.unis[i]);
          }
          show('unis');
        }
      }

      if (cur.unisCount >= 9) {
        hide('add_uni_link');
      } else {
        show('add_uni_link');
      }

      if (isInit && 'add_item' in nav.objLoc) {
        loc.add_item = nav.objLoc.add_item;
      }
      nav.setLoc(loc);
    }
  },

  initCareer: function () {
    cur.section = 'career';

    ProfileEditorJob.init();
    ProfileEditor.initBeforeUnload();
  },

  initMilitary: function () {
    cur.section = 'military';

    ProfileEditorMil.init();
    ProfileEditor.initBeforeUnload();
  },

  initPersonal: function () {
    var peditData = cur.options;
    cur.section = 'personal';

    cur.uiLife = new Dropdown(ge('pedit_life'), peditData.life_priorities, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.life_priority,
      dark: 1
    });

    cur.uiPeople = new Dropdown(ge('pedit_people'), peditData.people_priorities, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.people_priority,
      dark: 1
    });

    cur.uiSmoking = new Dropdown(ge('pedit_smoking'), peditData.smoking_types, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.smoking,
      dark: 1
    });

    cur.uiAlcohol = new Dropdown(ge('pedit_alcohol'), peditData.alcohol_types, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.alcohol,
      dark: 1
    });

    cur.uiPolitical = new Dropdown(ge('pedit_political'), peditData.political_views, {
      width: 232,
      multiselect: false,
      selectedItems: peditData.political,
      dark: 1
    });

    cur.uiReligion = new Selector(ge('pedit_religion'), '', {
      width: 232,
      dropdown: false,
      multiselect: false,
      enableCustom: true,
      introText: '',
      noResult: '',
      placeholder: getLang('profileEdit_main_sel_relig'),
      placeholderColor: '#000',
      onChange: function(value) {
        if (!intval(value)) {
          cur.uiReligion.clear();
        }
      },
      dark: 1
    });
    cur.uiReligion.setData(peditData.religions);
    if (peditData.religion_id > 0) {
      cur.uiReligion.val(peditData.religion_id, true);
    } else if (peditData.religion.length) {
      cur.uiReligion.customVal(peditData.religion);
    }

    ProfileEditor.initBeforeUnload();
  },

  savePersonal: function (btn) {
    var params = {act: 'a_save_personal', hash: cur.options.hash}, data = {
      religion: cur.uiReligion.val(),
      religion_custom: val('pedit_religion_custom'),
      political: cur.uiPolitical.val(),
      life_priority: cur.uiLife.val(),
      people_priority: cur.uiPeople.val(),
      smoking: cur.uiSmoking.val(),
      alcohol: cur.uiAlcohol.val(),
      inspired_by: val('pedit_inspired_by')
    };
    extend(params, data);
    ajax.post('al_profileEdit.php', params, {
      onDone: function (personal_data) {
        cur.options.religion_id = data.religion;
        cur.options.religion = (cur.uiReligion.val_full()[0] < 0) ? data.religion_custom : cur.uiReligion.val_full()[1];
        delete data.religion_custom;
        delete data.religion;
        extend(cur.options, data);
        each(['inspired_by'], function(k, field) {
          val('pedit_' + field, cur.options[field] = winToUtf(personal_data[field] || ''));
        });
        ProfileEditor.showMsg(getLang('profileEdit_personal_saved'));
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
    return false;
  },

  editHome: function(placeId) {
    showBox('edit', {act: 'edit_home', place_id: cur.editAddrId || placeId}, {dark: 1});
  },
  addItemBox: function (type, objId) {
    cur.addItemBox = showBox('al_admin.php', {
      act: 'add_item_box',
      add_item: type || '',
      obj_id: objId || ''
    }, {
      params: {
        dark: 1,
        width: 502,
        marginTop: 70,
        hideButtons: true,
        bodyStyle: 'padding: 0px;',
        cache: 1
      },
      onDestroy: function () {
        adminAddItem.destroyScope();
      }
    });
    return false;
  }
}

try{stManager.done('profile_edit.js');}catch(e){}
