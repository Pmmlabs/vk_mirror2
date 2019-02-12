var ProfileEditorJob = {

    init: function() {
        cur.globalCounter = 0;
        cur.worksCount = 0;

        selectsData.setCountries(cur.selData.countries_list);
        for (var i in cur.selData.countries) {
            selectsData.setCities(i, cur.selData.countries[i]);
        }

        if (!isVisible('works')) {
            cur.worksCount = cur.works.length;
            if (cur.worksCount) {
                for (var i = 0; i < cur.works.length; ++i) {
                    ge('works').appendChild(this.genWorkRow(cur.works[i].id, i == 0));
                    cur.works[i] = this.initWorkRow(cur.works[i]);
                }
            } else {
                this.addWork();
            }
            show('works');
        }

        if (cur.worksCount >= 7) {
            hide('add_work_link');
        } else {
            show('add_work_link');
        }
    },

    genOneRow: function(field, id, label, params, attr, additional) {
        var key = field + id;
        if (!params) {
            params = 'class="pedit_dropdown" type="hidden"';
        }
        if (!additional) {
            additional = '';
        }
        return '<div class="pedit_row clear_fix" id="row_' + key + '"' + (attr || '') + '>' +
            '<div class="pedit_label">' + label + '</div>' +
            '<div class="pedit_labeled"><input id="' + key + '" name="' + key + '" ' + params + '/></div>' +
            additional + '</div>';
    },

    genWorkRow: function(work_id, first_row) {
        var dn = ' style="display: none;"';
        var html = (!first_row ? '<div class="pedit_separator"></div>' : '') +
            '<div id="content' + work_id + '">' +
            this.genOneRow('group', work_id, getLang('select_company'), 'type="text" class="dark"', '', '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml('ProfileEditorJob.deleteWork(' + work_id + ')') + '</div><img class="pedit_progress" src="/images/upload.gif" id="progress' + work_id + '" />') +
            //this.genOneRow('company', work_id, getLang('select_company'), 'type="text" class="text"', dn) +
            '<div id="pedit_country_row' + work_id + '">' +
            this.genOneRow('country', work_id, getLang('select_country'), '') +
            this.genOneRow('city', work_id, getLang('select_city'), '') +
            '</div><div id="details' + work_id + '" style="display: none">' +
            this.genOneRow('start', work_id, getLang('select_work_start')) +
            this.genOneRow('finish', work_id, getLang('select_work_finish')) +
            this.genOneRow('position', work_id, getLang('select_work_position'), 'id="position' + work_id + '_name" class="pedit_dropdown"') +
            '</div></div>' +
            '<div class="deleted" id="deleted' + work_id + '"><div></div>' +
            '<a class="pedit_right_control" onclick="ProfileEditorJob.restoreWork(' + work_id + ')">' + getLang('global_dont_delete') + '</a>' +
            '</div>';
        return ce('div', {
            className: 'pedit_edu_big_row',
            id: 'work' + work_id,
            innerHTML: html
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

    initWorkRow: function(work, elem) {
        var g = elem ? function(id) {
            return ProfileEditorJob.get_by_id(elem, id);
        } : ge;
        work.uiStart = new Dropdown(g('start' + work.id), [
            [0, getLang('select_year_not_selected')]
        ].concat(cur.selData.years), {
            autocomplete: true,
            placeholder: getLang('select_year_not_selected'),
            noResult: getLang('select_year_not_found'),
            onChange: function(value) {
                value = intval(value);
                var new_finish_data = [];
                if (!value) {
                    work.uiStart.clear();
                    new_finish_data = cur.selData.years;
                } else {
                    var finish_value = intval(work.uiFinish.val());
                    if (finish_value && finish_value < value) {
                        work.uiFinish.val(value);
                    }
                    for (var i = 0; i < cur.selData.years.length; ++i) {
                        if (cur.selData.years[i][0] >= value) {
                            new_finish_data.push(cur.selData.years[i]);
                        }
                    }
                }
                work.uiFinish.setOptions({
                    defaultItems: [
                        [0, getLang('select_year_not_selected')]
                    ].concat(new_finish_data)
                });
                work.uiFinish.setData(new_finish_data);
            },
            dark: 1
        });
        work.uiStart.setData(cur.selData.years);
        work.uiFinish = new Dropdown(g('finish' + work.id), [
            [0, getLang('select_year_not_selected')]
        ].concat(cur.selData.years), {
            autocomplete: true,
            placeholder: getLang('select_year_not_selected'),
            noResult: getLang('select_year_not_found'),
            onChange: function(value) {
                value = intval(value);
                var new_start_data = [];
                if (!value) {
                    work.uiFinish.clear();
                    new_start_data = cur.selData.years;
                } else {
                    var start_value = intval(work.uiStart.val());
                    if (start_value && start_value > value) {
                        work.uiStart.val(value);
                    }
                    for (var i = 0; i < cur.selData.years.length; ++i) {
                        if (cur.selData.years[i][0] <= value) {
                            new_start_data.push(cur.selData.years[i]);
                        }
                    }
                }
                work.uiStart.setOptions({
                    defaultItems: [
                        [0, getLang('select_year_not_selected')]
                    ].concat(new_start_data)
                });
                work.uiStart.setData(new_start_data);
            },
            dark: 1
        });
        work.uiFinish.setData(cur.selData.years);

        work.uiStart.val(work.start, true);
        work.uiFinish.val(work.finish, true);

        work.uiPosition = new Selector(g('position' + work.id), 'select.php?act=apositions', {
            multiselect: false,
            noResult: getLang('select_work_position_select'),
            introText: getLang('select_work_position_select'),
            selectedItems: [work.position_val],
            dropdown: false,
            enableCustom: true,
            progressBar: 'progress' + work.id,
            onChange: function(value) {
                var val = intval(value);
                if (!val) {
                    work.uiPosition.clear();
                }
            },
            dark: 1
        });

        ProfileEditorJob.initGroupCompany(work);

        ge('work' + work.id).style.display = 'block';
        if (work.city || work.company_gid) {
            ge('details' + work.id).style.display = 'block';
        }

        return work;
    },

    initGroupCompany: function(work) {
        var opts = {
            autocomplete: true,
            enableCustom: true,
            noResult: '',
            placeholder: cur.workCompanyPlaceholder,
            defaultItems: cur.groupsList,
            onChange: function(val) {
                if (parseInt(val) !== -1) {
                    var gid = parseInt(val);
                    var countryInfo = cur.countryInfo[gid];
                    if (countryInfo && countryInfo[0]) {
                        work.uiCountry.selectItem(countryInfo[0]);
                        if (countryInfo[1]) {
                            work.uiCity.selectItem(countryInfo[1]);
                        }
                    }
                    var found = false;
                    for (var i in cur.groupsList) {
                        if (cur.groupsList[i][0] == gid) {
                            found = true;
                        }
                    }
                    if (!found && cur.searchList[gid]) {
                        cur.groupsList.push(cur.searchList[gid]);
                    }
                }
            },
            onData: function(data) {
                if (!cur.searchList) {
                    cur.searchList = {};
                }
                for (var i in data) {
                    cur.searchList[data[i][0]] = data[i];
                }
            },
            withIcons: true,
            dark: true,
            dropdown: true,
            multiselect: false,
            al: true,
            hideDropdown: true,
            noArr: true
        };

        work.uiCity = new CitySelect(ge('city' + work.id), ge('row_city' + work.id), {
            progressBar: 'progress' + work.id,
            country: work.country,
            city: work.city_val,
            onChange: function(value) {
                if (intval(value)) {
                    show('details' + work.id);
                } else {
                    hide('details' + work.id);
                }
            },
            dark: 1
        });
        work.uiCountry = new CountrySelect(ge('country' + work.id), ge('row_country' + work.id), {
            progressBar: 'progress' + work.id,
            country: work.country_val,
            citySelect: work.uiCity,
            dark: 1
        });

        if (work.company_name) {
            var companyName = winToUtf(work.company_name);
            if (work.company_gid) {
                opts.selectedItems = [work.company_gid];
            } else {
                opts.selectedItems = [
                    [-1, companyName]
                ];
            }
        }
        var groupsUrl = '/edit?act=a_career_groups';
        work.uiGroup = new Autocomplete(ge('group' + work.id), groupsUrl, opts);
    },

    addWork: function() {
        if (cur.worksCount >= 7) {
            return false;
        }
        var new_work = {
            id: -(++cur.globalCounter),
            country: cur.selData.mem.country,
            country_val: cur.selData.mem.country_val,
            city: cur.selData.mem.city,
            city_val: cur.selData.mem.city_val,
            company_name: '',
            start: 0,
            finish: 0,
            position: 0,
            position_val: ''
        };
        var new_el = ge('works').appendChild(this.genWorkRow(new_work.id, cur.worksCount == 0));
        if (!cur.worksCount) {
            hide(geByClass1('_del_icon', new_el));
        }
        new_work = this.initWorkRow(new_work);
        if (!cur.works.length) {
            cur.works = new Array();
        }
        cur.works.push(new_work);
        ++cur.worksCount;
        if (cur.worksCount >= 7) {
            hide('add_work_link');
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

    deleteWork: function(id) {
        --cur.worksCount;
        show('add_work_link');
        if ((ge('position' + id).value.length) || (id > 0)) {
            hide('content' + id);
            ge('deleted' + id).firstChild.innerHTML = getLang('profileEdit_work_will_be_deleted');
            show('deleted' + id);
        } else {
            var index = this.getIndex(cur.works, id);
            cur.works[index] = cur.works[cur.works.length - 1];
            cur.works.pop();
            ge('work' + id).parentNode.removeChild(ge('work' + id));
            if (cur.works.length == 0) {
                this.addWork();
            }
        }
        return false;
    },

    restoreWork: function(id) {
        if (cur.worksCount >= 7) {
            return false;
        }
        hide('deleted' + id);
        show('content' + id);
        ++cur.worksCount;
        if (cur.worksCount >= 7) {
            hide('add_work_link');
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

    saveWorks: function(btn) {
        var params = {
            act: 'a_save_career',
            hash: ge('hash').value
        };
        for (var i = 0; i < cur.works.length; ++i) {
            var id = cur.works[i].id;
            params['id' + i] = id;
            if (isVisible('content' + id)) {
                params = this.addFields(params, id, i, 'start', 'finish');
                var company = cur.works[i].uiGroup.val_full();
                params['company' + i] = company[1];
                params = this.addFields(params, id, i, 'country', 'city');
                var groupId = intval(company[0]);
                if (groupId != -1) {
                    params['group' + i] = groupId;
                }

                //params = this.addTextFields(params, id, i, 'company');

                if (ge('position' + id).value.length) {
                    var position_val = cur.works[i].uiPosition.val_full();
                    var position = position_val[1] || '';
                    if (position.length) {
                        params['position' + i] = position;
                    }
                }
            } else {
                params['deleted' + i] = 1;
            }
        }

        var doneHandler = function(response) {
            var to_remove = [];
            var worksCont = ge('works');
            var oldWorksElems = geByClass('pedit_edu_big_row', worksCont)
            for (var i in oldWorksElems) {
                worksCont.removeChild(oldWorksElems[i]);
            }
            //var i = cur.works.length;
            //while(i--) {
            var worksList = [];

            for (var i = 0; i < cur.works.length; ++i) {
                var new_work_id = response['res' + i];
                if (intval(new_work_id)) {
                    worksList[i] = this.updateWork(cur.works[i], new_work_id, worksCont, i);
                }
            }
            cur.works = worksList;
            cur.worksCount = cur.works.length;
            if (cur.worksCount >= 7) {
                hide('add_work_link');
            } else {
                show('add_work_link');
            }
            if (!cur.worksCount) {
                this.addWork();
            }
        }

        ajax.post('al_profileEdit.php', params, {
            onDone: function(job_data) {
                doneHandler.call(ProfileEditorJob, job_data);
                ProfileEditor.showMsg(getLang('profileEdit_works_saved'));
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
        return false;
    },

    updateWork: function(old_work, new_work_id, parent, i) {
        old_work.country = old_work.uiCountry.val();
        old_work.country_val = old_work.uiCountry.val_full();
        old_work.city = old_work.uiCity.val();
        old_work.city_val = old_work.uiCity.val_full();
        old_work.company = old_work.uiGroup.val()
        old_work.company_val = old_work.uiGroup.val_full()
        old_work.company_name = old_work.company_val[1];
        if (old_work.company_val[0] && old_work.company_val[0] != '-1') {
            old_work.company_gid = old_work.company_val[0];
        }

        old_work.start = old_work.uiStart.val();
        old_work.finish = old_work.uiFinish.val();
        old_work.position = old_work.uiPosition.val();
        old_work.position_val = old_work.uiPosition.val_full();

        var new_elem = this.genWorkRow(new_work_id, i == 0);
        show(new_elem);
        old_work.id = new_work_id;

        parent.appendChild(new_elem);

        new_work = this.initWorkRow(old_work, new_elem);

        return new_work;
    },

    workChanged: function(work) {
        var old_position = work.position_val[1] || '',
            position = (work.uiPosition.val_full() || [])[1] || '';

        return !isVisible('content' + work.id) ||
            work.country != work.uiCountry.val() || work.city != work.uiCity.val() ||
            winToUtf(work.company_name) != winToUtf(work.uiGroup.val_full()[1]) || winToUtf(old_position) != winToUtf(position) ||
            work.start != work.uiStart.val() || work.finish != work.uiFinish.val();
    }
};

try {
    stManager.done('profile_edit_job.js');
} catch (e) {}