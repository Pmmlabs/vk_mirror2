var ProfileEditorEdu = {

    init: function() {
        cur.globalCounter = 0;
        cur.unisCount = 0;
        cur.shoolsCount = 0;

        cur.addBox = null;
        cur.addedItems = {
            universities: {},
            faculties: {},
            chairs: {},
            schools: {}
        };
        cur.bannedGeodbCountryIds = [];
    },

    genOneRow: function(prefix, field, id, label, params, additional) {
        var key = prefix + '_' + field + id;
        if (!params) {
            params = 'class="pedit_dropdown" type="hidden"';
        }
        if (!additional) {
            additional = '';
        }
        return '<div class="pedit_row clear_fix" id="row_' + key + '">' +
            '<div class="pedit_label">' + label + '</div>' +
            '<div class="pedit_labeled"><input id="' + key + '" name="' + key + '" ' + params + '/></div>' +
            additional + '</div>';
    },

    genUniRow: function(uni_id, no_delete, first_row) {
        var delete_link = no_delete ? '' : '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml('ProfileEditorEdu.deleteUniversity(' + uni_id + ')') + '</div>';
        return ce('div', {
            className: 'pedit_edu_big_row',
            id: 'uni' + uni_id,
            innerHTML: (!no_delete && !first_row ? '<div class="pedit_separator"></div>' : '') +
                '<div id="uni_content' + uni_id + '">' +
                this.genOneRow('u', 'country', uni_id, getLang('select_country'), '',
                    delete_link + '<img src="/images/upload.gif" class="pedit_progress" id="u_progress' + uni_id + '" />') +
                this.genOneRow('u', 'city', uni_id, getLang('select_city')) +
                this.genOneRow('u', 'university', uni_id, getLang('select_university'), '',
                    '<a href="" class="add_item_link" id="u_add_uni_to_db' + uni_id + '" onclick="return ProfileEditor.addItemBox(\'uni\', ' + uni_id + ')">' + getLang('profileEdit_uni_not_in_db') + '</a>') +
                this.genOneRow('u', 'faculty', uni_id, getLang('select_faculty'), '',
                    '<a href="" class="add_item_link" id="u_add_fac_to_db' + uni_id + '" onclick="return ProfileEditor.addItemBox(\'faculty\', ' + uni_id + ')">' + getLang('profileEdit_fac_not_in_db') + '</a>') +
                this.genOneRow('u', 'chair', uni_id, getLang('select_chair'), '',
                    '<a href="" class="add_item_link" id="u_add_chair_to_db' + uni_id + '" onclick="return ProfileEditor.addItemBox(\'chair\', ' + uni_id + ')">' + getLang('profileEdit_chair_not_in_db') + '</a>') +
                '<div id="u_details' + uni_id + '" style="display: none">' +
                this.genOneRow('u', 'edu_form', uni_id, getLang('select_eduform')) +
                this.genOneRow('u', 'edu_status', uni_id, getLang('select_edustatus')) +
                this.genOneRow('u', 'graduation', uni_id, getLang('select_graduation')) +
                '</div></div>' +
                '<div class="deleted" id="uni_deleted' + uni_id + '"><div></div> ' +
                '<a onclick="ProfileEditorEdu.restoreUniversity(' + uni_id + ')">' + getLang('global_dont_delete') + '</a>' +
                '</div>'
        }, {
            display: 'none'
        });
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

    initUniRow: function(uni, elem, onChangeUni) {
        var g = elem ? function(id) {
            return ProfileEditorEdu.get_by_id(elem, id);
        } : ge;
        uni.uiEducationForm = new EducationFormSelect(g('u_edu_form' + uni.id), g('row_u_edu_form' + uni.id), {
            country: uni.country,
            university: uni.university,
            edu_form: uni.edu_form,
            dark: 1,
            width: uni.width
        });
        uni.uiEducationStatus = new EducationStatusSelect(g('u_edu_status' + uni.id), g('row_u_edu_status' + uni.id), {
            country: uni.country,
            university: uni.university,
            edu_status: uni.edu_status,
            dark: 1,
            width: uni.width
        });
        uni.uiGraduation = new Dropdown(g('u_graduation' + uni.id), cur.selData.graduations, {
            autocomplete: true,
            placeholder: getLang('select_year_not_selected'),
            noResult: getLang('select_year_not_found'),
            selectedItems: uni.graduation,
            onChange: function(value) {
                if (!intval(value)) {
                    uni.uiGraduation.clear();
                }
            },
            dark: 1,
            width: uni.width
        });

        uni.uiChair = new ChairSelect(g('u_chair' + uni.id), g('row_u_chair' + uni.id), {
            progressBar: 'u_progress' + uni.id,
            faculty: uni.faculty,
            chair: uni.chair,
            ignoreVoidList: true,
            onEnableCustomChange: function(enable) {
                var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
                var chair = uni.uiChair ? uni.uiChair.val() : uni.chair;
                if ((uni.showAddChair = (!enable && ProfileEditorEdu.isCountryOpenForNewObjects(country))) && !intval(chair)) {
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
            },
            dark: 1,
            width: uni.width
        });
        uni.uiFaculty = new FacultySelect(g('u_faculty' + uni.id), g('row_u_faculty' + uni.id), {
            progressBar: 'u_progress' + uni.id,
            university: uni.university,
            faculty: uni.faculty,
            chairSelect: uni.uiChair,
            ignoreVoidList: true,
            onEnableCustomChange: function(enable) {
                var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
                var faculty = uni.uiFaculty ? uni.uiFaculty.val() : uni.faculty;
                if ((uni.showAddFaculty = (!enable && ProfileEditorEdu.isCountryOpenForNewObjects(country))) && !intval(faculty)) {
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
            },
            dark: 1,
            width: uni.width
        });
        uni.uiUniversity = new UniversitySelect(g('u_university' + uni.id), g('row_u_university' + uni.id), {
            progressBar: 'u_progress' + uni.id,
            city: uni.city,
            university: uni.university,
            eduFormSelect: uni.uiEducationForm,
            eduStatusSelect: uni.uiEducationStatus,
            facultySelect: uni.uiFaculty,
            ignoreVoidList: true,
            onEnableCustomChange: function(enable) {
                var country = uni.uiCountry ? uni.uiCountry.val() : uni.country;
                var university = uni.uiUniversity ? uni.uiUniversity.val() : uni.university;
                if ((uni.showAddUni = (!enable && ProfileEditorEdu.isCountryOpenForNewObjects(country))) && !intval(university)) {
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

                onChangeUni && onChangeUni(value);
            },
            dark: 1,
            width: uni.width
        });
        uni.uiCity = new CitySelect(g('u_city' + uni.id), g('row_u_city' + uni.id), {
            progressBar: 'u_progress' + uni.id,
            country: uni.country,
            city: uni.city_val,
            universitySelect: uni.uiUniversity,
            maxItemsShown: function(query_length) {
                return (query_length > 6) ? 500 : 350;
            },
            dark: 1,
            width: uni.width
        });
        uni.uiCountry = new CountrySelect(g('u_country' + uni.id), g('row_u_country' + uni.id), {
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
            },
            dark: 1,
            width: uni.width
        });

        g('uni' + uni.id).style.display = 'block';
        if (uni.university) {
            g('u_details' + uni.id).style.display = 'block';
        }

        return uni;
    },

    genOneSchoolRow: function(id) {
        var key = 's_school' + id;
        return '<div class="pedit_row clear_fix" id="row_' + key + '"><div class="pedit_label">' + getLang('select_school') + '</div>' +
            '<div class="pedit_labeled">' +
            '<div class="school_row"><input class="pedit_dropdown" type="hidden" id="' + key + '" name="' + key + '" /></div>' +
            '</div>' +
            '<a class="add_item_link" id="s_add_school_to_db' + id + '" onclick="ProfileEditor.addItemBox(\'school\', ' + id + ')">' + getLang('profileEdit_school_not_in_db') + '</a>' +
            '</div>';
    },

    genSchoolRow: function(school_id, first_row) {
        return ce('div', {
            className: 'pedit_edu_big_row',
            id: 'school' + school_id,
            innerHTML: (!first_row ? '<div class="pedit_separator"></div>' : '') +
                '<div id="school_content' + school_id + '">' +
                this.genOneRow('s', 'country', school_id, getLang('select_country'), '',
                    '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml('ProfileEditorEdu.deleteSchool(' + school_id + ')') + '</div><img src="/images/upload.gif" class="pedit_progress" id="s_progress' + school_id + '" />') +
                this.genOneRow('s', 'city', school_id, getLang('select_city')) +
                this.genOneSchoolRow(school_id) +
                '<div id="s_details' + school_id + '" style="display: none">' +
                this.genOneRow('s', 'start', school_id, getLang('select_start_year')) +
                this.genOneRow('s', 'finish', school_id, getLang('select_finish_year')) +
                this.genOneRow('s', 'graduation', school_id, getLang('select_graduation')) +
                this.genOneRow('s', 'class', school_id, getLang('select_class')) +
                this.genOneRow('s', 'spec', school_id + '_custom', getLang('select_spec'), 'type="text" class="dark"') +
                '</div></div>' +
                '<div class="deleted" id="school_deleted' + school_id + '"><div></div> ' +
                '<a onclick="ProfileEditorEdu.restoreSchool(' + school_id + ')">' + getLang('global_dont_delete') + '</a>' +
                '</div>'
        }, {
            display: 'none'
        });
    },

    initSchoolRow: function(school, elem, onChangeSchool) {
        var g = elem ? function(id) {
            return ProfileEditorEdu.get_by_id(elem, id);
        } : ge;
        school.uiClass = new ClassSelect(g('s_class' + school.id), g('row_s_class' + school.id), {
            country: school.country,
            school: school.school,
            school_class: school.school_class,
            dark: 1,
            width: school.width
        });
        var yearSelect = function(input_id, data, selected) {
            var result = new Dropdown(g(input_id), data, {
                autocomplete: true,
                placeholder: getLang('select_graduation_not_selected'),
                noResult: getLang('select_year_not_found'),
                selectedItems: selected,
                onChange: function(value) {
                    if (!intval(value)) {
                        result.clear();
                    }
                },
                dark: 1,
                width: school.width
            });
            return result;
        }
        school.uiStart = yearSelect('s_start' + school.id, cur.selData.start_years, school.start);
        school.uiFinish = yearSelect('s_finish' + school.id, cur.selData.finish_years, school.finish);
        school.uiGraduation = yearSelect('s_graduation' + school.id, cur.selData.finish_years, school.graduation);
        if (!school.spec) {
            school.spec = '';
        }
        g('s_spec' + school.id + '_custom').value = school.spec;

        // school.uiSchool = new SchoolSelect(g('s_school' + school.id), g('row_s_school' + school.id), g('s_school_type' + school.id), g('row_s_school_type' + school.id), {
        school.uiSchool = new SchoolHintSelect(g('s_school' + school.id), g('row_s_school' + school.id), {
            progressBar: 's_progress' + school.id,
            city: school.city,
            school: school.school,
            classSelect: school.uiClass,
            ignoreVoidList: true,
            onEnableCustomChange: function(enable) {
                var country = school.uiCountry ? school.uiCountry.val() : school.country;
                var school_id = school.uiSchool ? school.uiSchool.val() : school.school;
                if ((school.showAddSchool = (!enable && ProfileEditorEdu.isCountryOpenForNewObjects(country))) && !intval(school_id)) {
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

                onChangeSchool && onChangeSchool(value);
            },
            dark: 1,
            width: school.width
        });
        school.uiCity = new CitySelect(g('s_city' + school.id), g('row_s_city' + school.id), {
            progressBar: 's_progress' + school.id,
            country: school.country,
            city: school.city_val,
            schoolSelect: school.uiSchool,
            maxItemsShown: function(query_length) {
                return (query_length > 6) ? 500 : 350;
            },
            dark: 1,
            width: school.width
        });
        school.uiCountry = new CountrySelect(g('s_country' + school.id), g('row_s_country' + school.id), {
            progressBar: 's_progress' + school.id,
            country: school.country_val,
            classSelect: school.uiClass,
            citySelect: school.uiCity,
            onChange: function(value) {
                //      school.uiSchool.setOptions({ignoreVoidList: intval(value) > 3});
            },
            dark: 1,
            width: school.width
        });

        g('school' + school.id).style.display = 'block';
        if (school.school) {
            g('s_details' + school.id).style.display = 'block';
        }

        return school;
    },

    genAddRow: function(field, label, additional) {
        if (!additional) {
            additional = '';
        }
        return '<div class="pedit_edu_row" id="row_' + field + '">' +
            '<div class="label fl_l ta_r">' + label + '</div>' +
            '<div class="labeled fl_l"><input id="' + field + '" name="' + field + '" /></div>' +
            additional + '</div>';
    },

    addUniversity: function() {
        if (cur.unisCount >= 9) {
            return false;
        }
        var new_uni = {
            id: -(++cur.globalCounter),
            country: cur.primary_uni.country,
            country_val: cur.primary_uni.country_val,
            city: cur.primary_uni.city,
            city_val: cur.primary_uni.city_val
        };
        ge('unis').appendChild(this.genUniRow(new_uni.id, false, cur.unisCount == 0));
        new_uni = this.initUniRow(new_uni);
        cur.unis.push(new_uni);
        ++cur.unisCount;
        if (cur.unisCount >= 9) {
            hide('add_uni_link');
        }
        show('unis');
        return false;
    },

    addSchool: function() {
        if (cur.schoolsCount >= 7) {
            return false;
        }
        var new_school = {
            id: -(++cur.globalCounter),
            country: cur.primary_uni.country,
            country_val: cur.primary_uni.country_val,
            city: cur.primary_uni.city,
            city_val: cur.primary_uni.city_val
        };
        var new_el = ge('schools').appendChild(this.genSchoolRow(new_school.id, cur.schoolsCount == 0));
        if (!cur.schoolsCount) {
            hide(geByClass1('_del_icon', new_el));
        }
        new_school = this.initSchoolRow(new_school);
        if (!cur.schools.length) { // else cannot add schools if there are no schools yet
            cur.schools = new Array();
        }
        cur.schools.push(new_school);
        ++cur.schoolsCount;
        if (cur.schoolsCount >= 7) {
            hide('add_school_link');
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

    deleteUniversity: function(id) {
        --cur.unisCount;
        show('add_uni_link');
        if (intval(ge('u_university' + id).value) || (id > 0)) {
            hide('uni_content' + id);
            ge('uni_deleted' + id).firstChild.innerHTML = getLang('profileEdit_uni_will_be_deleted');
            show('uni_deleted' + id);
        } else {
            var index = this.getIndex(cur.unis, id);
            cur.unis[index] = cur.unis[cur.unis.length - 1];
            cur.unis.pop();
            ge('uni' + id).parentNode.removeChild(ge('uni' + id));
            if (cur.unis.length == 0) {
                hide('unis');
            }
        }
        return false;
    },

    restoreUniversity: function(id) {
        if (cur.unisCount >= 9) {
            return false;
        }
        hide('uni_deleted' + id);
        show('uni_content' + id);
        ++cur.unisCount;
        if (cur.unisCount >= 9) {
            hide('add_uni_link');
        }
        return false;
    },

    deleteSchool: function(id) {
        --cur.schoolsCount;
        show('add_school_link');
        if (intval(ge('s_school' + id).value) || (id > 0)) {
            hide('school_content' + id);
            ge('school_deleted' + id).firstChild.innerHTML = getLang('profileEdit_school_will_be_deleted');
            show('school_deleted' + id);
        } else {
            var index = this.getIndex(cur.schools, id);
            cur.schools[index] = cur.schools[cur.schools.length - 1];
            cur.schools.pop();
            ge('school' + id).parentNode.removeChild(ge('school' + id));
            if (cur.schools.length == 0) {
                this.addSchool();
            }
        }
        return false;
    },

    restoreSchool: function(id) {
        if (cur.schoolsCount >= 7) {
            return false;
        }
        hide('school_deleted' + id);
        show('school_content' + id);
        ++cur.schoolsCount;
        if (cur.schoolsCount >= 7) {
            hide('add_school_link');
        }
        return false;
    },

    addFields: function() {
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
    },

    addTextFields: function() {
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
    },

    addUniParams: function(params, uni, key) {
        params[key + 'id'] = uni.id;
        if (isVisible('uni_content' + uni.id) && intval(ge('u_university' + uni.id).value)) {
            params = this.addFields(params, 'u', key, uni.id, 'country', 'city', 'university',
                'faculty', 'chair', 'edu_form',
                'edu_status', 'graduation');

            params = this.addTextFields(params, 'u', key + 'custom_', uni.id + '_custom', 'university',
                'faculty',
                'chair');
        } else if (uni.id > 0) {
            params[key + 'deleted'] = 1;
        }
        return params;
    },

    addSchoolParams: function(params, school, key) {
        params[key + 'id'] = school.id;
        if (isVisible('school_content' + school.id) && intval(ge('s_school' + school.id).value)) {
            params = this.addFields(params, 's', key, school.id, 'country', 'city', 'school',
                'start', 'finish',
                'graduation', 'class');
            params = this.addTextFields(params, 's', key + 'custom_', school.id + '_custom', 'school',
                'spec');
        } else if (school.id > 0) {
            params[key + 'deleted'] = 1;
        }
        return params;
    },

    saveEducation: function(btn) {
        var doneHandler = false;
        if (isVisible('uni')) {
            var params = {
                act: 'a_save_education_uni'
            };
            params = this.addUniParams(params, cur.primary_uni, 'primary_uni');
            for (var i = 0; i < cur.unis.length; ++i) {
                params = this.addUniParams(params, cur.unis[i], 'uni' + i);
            }

            doneHandler = function(response) {
                var to_remove = [];
                var all_unis = ge('unis');
                for (var i = 0; i < cur.unis.length; ++i) {
                    var new_uni = response['res' + i];
                    if (intval(new_uni.id)) {
                        cur.unis[i] = this.updateUni(cur.unis[i], new_uni, all_unis, i);
                    } else {
                        to_remove.push(i);
                    }
                }
                for (var i = 0; i < to_remove.length; ++i) {
                    var index = to_remove[i];
                    ge('uni' + cur.unis[index].id).parentNode.removeChild(ge('uni' + cur.unis[index].id));
                    cur.unis[index] = cur.unis[cur.unis.length - 1];
                    for (var j = i + 1; j < to_remove.length; ++j) {
                        if (to_remove[j] == cur.unis.length - 1) {
                            to_remove[j] = index;
                        }
                    }
                    cur.unis.pop();
                }
                if (!cur.unis.length) {
                    hide('unis');
                }
                cur.unisCount = cur.unis.length;
                if (cur.unisCount >= 9) {
                    hide('add_uni_link');
                } else {
                    show('add_uni_link');
                }
                cur.primary_uni = this.updateUni(cur.primary_uni, response['res-1'], ge('primary_uni'), true);
            }
        } else {
            var params = {
                act: 'a_save_education_school'
            };
            for (var i = 0; i < cur.schools.length; ++i) {
                params = this.addSchoolParams(params, cur.schools[i], 'school' + i);
            }

            doneHandler = function(response) {
                var to_remove = [];
                for (var i = 0; i < cur.schools.length; ++i) {
                    var new_school = response['res' + i];
                    if (intval(new_school.id)) {
                        cur.schools[i] = this.updateSchool(cur.schools[i], new_school, ge('schools'), i);
                    } else {
                        to_remove.push(i);
                    }
                }
                for (var i = 0; i < to_remove.length; ++i) {
                    var index = to_remove[i];
                    ge('school' + cur.schools[index].id).parentNode.removeChild(ge('school' + cur.schools[index].id));
                    cur.schools[index] = cur.schools[cur.schools.length - 1];
                    for (var j = i + 1; j < to_remove.length; ++j) {
                        if (to_remove[j] == cur.schools.length - 1) {
                            to_remove[j] = index;
                        }
                    }
                    cur.schools.pop();
                }
                cur.schoolsCount = cur.schools.length;
                if (cur.schoolsCount >= 7) {
                    hide('add_school_link');
                } else {
                    show('add_school_link');
                }
                if (!cur.schoolsCount) {
                    this.addSchool();
                }
            }
        }
        params.hash = ge('hash').value;

        ajax.post('al_profileEdit.php', params, {
            onDone: function(uni_data) {
                doneHandler.call(ProfileEditorEdu, uni_data);
                ProfileEditor.showMsg(getLang('profileEdit_unis_saved'));
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
        return false;
    },

    updateUni: function(old_uni, new_uni, parent, no_delete, i) {
        if (old_uni.uiUniversity.val() == -1 && new_uni.university.id) {
            selectsData.addUniversity(old_uni.uiCity.val(), [new_uni.university.id, new_uni.university.name]);
            if (new_uni.faculty.id) {
                selectsData.setUniversityInfo(new_uni.university.id, {
                    completed_faculties: 0,
                    faculties: [
                        [new_uni.faculty.id, new_uni.faculty.name]
                    ]
                });
                if (new_uni.chair.id) {
                    selectsData.setFacultyInfo(new_uni.faculty.id, {
                        completed_chairs: 0,
                        chairs: [
                            [new_uni.chair.id, new_uni.chair.name]
                        ]
                    });
                } else {
                    selectsData.setFacultyInfo(new_uni.faculty.id, {
                        completed_chairs: 0,
                        chairs: []
                    });
                }
            } else {
                selectsData.setUniversityInfo(new_uni.university.id, {
                    completed_faculties: 0,
                    faculties: []
                });
            }
        } else if (old_uni.uiFaculty.val() == -1 && new_uni.faculty.id) {
            selectsData.addFaculty(new_uni.university.id, [new_uni.faculty.id, new_uni.faculty.name]);
            if (new_uni.chair.id) {
                selectsData.setFacultyInfo(new_uni.faculty.id, {
                    completed_chairs: 0,
                    chairs: [
                        [new_uni.chair.id, new_uni.chair.name]
                    ]
                });
            } else {
                selectsData.setFacultyInfo(new_uni.faculty.id, {
                    completed_chairs: 0,
                    chairs: []
                });
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

        var new_elem = this.genUniRow(new_uni.id, no_delete, i == 0);
        var old_elem = ge('uni' + old_uni.id);
        old_uni.id = new_uni.id;
        new_uni = this.initUniRow(old_uni, new_elem);
        parent.replaceChild(new_elem, old_elem);

        return new_uni;
    },

    updateSchool: function(old_school, new_school, parent, i) {
        if (old_school.uiSchool.val() == -1 && new_school.school.id) {
            selectsData.addSchool(old_school.uiCity.val(), [new_school.school.id, new_school.school.name]);
        }

        old_school.country = old_school.uiCountry.val();
        old_school.country_val = old_school.uiCountry.val_full();
        old_school.city = old_school.uiCity.val();
        old_school.city_val = old_school.uiCity.val_full();
        old_school.school = new_school.school.id;
        old_school.start = old_school.uiStart.val();
        old_school.finish = old_school.uiFinish.val();
        old_school.graduation = old_school.uiGraduation.val();
        old_school.school_class = old_school.uiClass.val();
        old_school.spec = ge('s_spec' + old_school.id + '_custom').value;

        var new_elem = this.genSchoolRow(new_school.id, i == 0);
        var old_elem = ge('school' + old_school.id);
        old_school.id = new_school.id;
        new_school = this.initSchoolRow(old_school, new_elem);
        parent.replaceChild(new_elem, old_elem);

        return new_school;
    },

    uniChanged: function(uni) {
        return !isVisible('uni_content' + uni.id) ||
            uni.country != uni.uiCountry.val() || uni.city != uni.uiCity.val() ||
            uni.university != uni.uiUniversity.val() || uni.faculty != uni.uiFaculty.val() ||
            uni.chair != uni.uiChair.val() || uni.edu_form != uni.uiEducationForm.val() ||
            uni.edu_status != uni.uiEducationStatus.val() || uni.graduation != uni.uiGraduation.val();
    },

    schoolChanged: function(school) {
        return !isVisible('school_content' + school.id) ||
            school.country != school.uiCountry.val() || school.city != school.uiCity.val() ||
            school.school != school.uiSchool.val() || school.start != school.uiStart.val() ||
            school.finish != school.uiFinish.val() || school.graduation != school.uiGraduation.val() ||
            school.school_class != school.uiClass.val() || school.spec != ge('s_spec' + school.id + '_custom').value;
    },

    /**
     * ���������, ����� �� ��������� ������� � ������ ������
     */
    isCountryOpenForNewObjects: function(countryId) {
        return !cur.geodbBannedCountries[countryId];
    }
};

try {
    stManager.done('profile_edit_edu.js');
} catch (e) {}