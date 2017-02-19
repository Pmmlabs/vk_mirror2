var globalCounter = 0;
var worksCount = 0;

function genOneRow(field, id, label, params, additional) {
    var key = field + id;
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

function genWorkRow(work_id) {
    var elem = document.createElement('div');
    elem.className = 'bigRow';
    elem.id = 'work' + work_id;
    elem.style.display = 'none';
    var delete_link = '<a href="#delete" class="fl_r" onclick="return deleteWork(' + work_id + ')">' + lang.global_delete + '</a>';
    elem.innerHTML = '<div id="content' + work_id + '">' +
        genOneRow('country', work_id, lang.select_country, '',
            '<img src="/images/upload.gif" id="progress' + work_id + '" />' + delete_link) +
        genOneRow('city', work_id, lang.select_city) +
        '<div id="details' + work_id + '" style="display: none">' +
        genOneRow('company', work_id, lang.select_company, 'type="text" class="inputText"') +
        genOneRow('start', work_id, lang.select_work_start) +
        genOneRow('finish', work_id, lang.select_work_finish) +
        genOneRow('position', work_id, lang.select_work_position, 'type="text" class="inputText"') +
        '</div></div>' +
        '<div class="deleted" id="deleted' + work_id + '"><div></div>' +
        '<a class="fl_r" href="#restore" onclick="return restoreWork(' + work_id + ')">' + lang.global_dont_delete + '</a>' +
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

function initWorkRow(work, elem) {
    var g = elem ? function(id) {
        return get_by_id(elem, id);
    } : ge;
    work.uiStart = new Dropdown(g('start' + work.id), [
        [0, getLang('select_year_not_selected')]
    ].concat(selData.years), {
        width: 200,
        autocomplete: true,
        placeholder: getLang('select_year_not_selected'),
        placeholderColor: '#000',
        noResult: getLang('select_year_not_found'),
        onChange: function(value) {
            value = intval(value);
            var new_finish_data = [];
            if (!value) {
                work.uiStart.clear();
                new_finish_data = selData.years;
            } else {
                var finish_value = intval(work.uiFinish.val());
                if (finish_value && finish_value < value) {
                    work.uiFinish.val(value);
                }
                for (var i = 0; i < selData.years.length; ++i) {
                    if (selData.years[i][0] >= value) {
                        new_finish_data.push(selData.years[i]);
                    }
                }
            }
            work.uiFinish.setOptions({
                defaultItems: [
                    [0, getLang('select_year_not_selected')]
                ].concat(new_finish_data)
            });
            work.uiFinish.setData(new_finish_data);
        }
    });
    work.uiStart.setData(selData.years);
    work.uiFinish = new Dropdown(g('finish' + work.id), [
        [0, getLang('select_year_not_selected')]
    ].concat(selData.years), {
        width: 200,
        autocomplete: true,
        placeholder: getLang('select_year_not_selected'),
        placeholderColor: '#000',
        noResult: getLang('select_year_not_found'),
        onChange: function(value) {
            value = intval(value);
            var new_start_data = [];
            if (!value) {
                work.uiFinish.clear();
                new_start_data = selData.years;
            } else {
                var start_value = intval(work.uiStart.val());
                if (start_value && start_value > value) {
                    work.uiStart.val(value);
                }
                for (var i = 0; i < selData.years.length; ++i) {
                    if (selData.years[i][0] <= value) {
                        new_start_data.push(selData.years[i]);
                    }
                }
            }
            work.uiStart.setOptions({
                defaultItems: [
                    [0, getLang('select_year_not_selected')]
                ].concat(new_start_data)
            });
            work.uiStart.setData(new_start_data);
        }
    });
    work.uiFinish.setData(selData.years);

    work.uiStart.val(work.start, true);
    work.uiFinish.val(work.finish, true);

    work.uiCity = new CitySelect(g('city' + work.id), g('row_city' + work.id), {
        width: 200,
        progressBar: 'progress' + work.id,
        country: work.country,
        city: work.city_val,
        onChange: function(value) {
            if (intval(value)) {
                show('details' + work.id);
            } else {
                hide('details' + work.id);
            }
        }
    });
    work.uiCountry = new CountrySelect(g('country' + work.id), g('row_country' + work.id), {
        width: 200,
        progressBar: 'progress' + work.id,
        country: work.country_val,
        citySelect: work.uiCity
    });

    g('company' + work.id).value = winToUtf(work.company_name);
    g('position' + work.id).value = winToUtf(work.position);

    g('work' + work.id).style.display = 'block';
    if (work.city) {
        g('details' + work.id).style.display = 'block';
    }

    return work;
}

onDomReady(function() {
    selectsData.setCountries(selData.countries_list);
    for (var i in selData.countries) {
        selectsData.setCities(i, selData.countries[i]);
    }

    if (!isVisible('works')) {
        worksCount = works.length;
        if (worksCount) {
            for (var i = 0; i < works.length; ++i) {
                ge('works').appendChild(genWorkRow(works[i].id));
                works[i] = initWorkRow(works[i]);
            }
        } else {
            addWork();
        }
        show('works');
    }

    if (worksCount >= 7) {
        hide('add_work_link');
    } else {
        show('add_work_link');
    }
});

function addWork() {
    if (worksCount >= 7) {
        return false;
    }
    var new_work = {
        id: -(++globalCounter),
        country: selData.mem.country,
        country_val: selData.mem.country_val,
        city: selData.mem.city,
        city_val: selData.mem.city_val,
        company_name: '',
        start: 0,
        finish: 0,
        position: ''
    };
    ge('works').appendChild(genWorkRow(new_work.id));
    new_work = initWorkRow(new_work);
    if (!works.length) {
        works = new Array();
    }
    works.push(new_work);
    ++worksCount;
    if (worksCount >= 7) {
        hide('add_work_link');
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

function deleteWork(id) {
    --worksCount;
    show('add_work_link');
    if ((ge('company' + id).value.length) || (ge('position' + id).value.length) || (id > 0)) {
        hide('content' + id);
        ge('deleted' + id).firstChild.innerHTML = lang.profileEdit_work_will_be_deleted;
        show('deleted' + id);
    } else {
        var index = getIndex(works, id);
        works[index] = works[works.length - 1];
        works.pop();
        ge('work' + id).parentNode.removeChild(ge('work' + id));
        if (works.length == 0) {
            addWork();
        }
    }
    return false;
}

function restoreWork(id) {
    if (worksCount >= 7) {
        return false;
    }
    hide('deleted' + id);
    show('content' + id);
    ++worksCount;
    if (worksCount >= 7) {
        hide('add_work_link');
    }
    return false;
}

function addFields() {
    var params = arguments[0];
    var id = arguments[1];
    var index = arguments[2];
    for (var i = 3; i < arguments.length; ++i) {
        if (intval(ge(arguments[i] + id).value)) {
            params[arguments[i] + index] = ge(arguments[i] + id).value;
        }
    }
    return params;
}

function addTextFields() {
    var params = arguments[0];
    var id = arguments[1];
    var index = arguments[2];
    for (var i = 3; i < arguments.length; ++i) {
        if (ge(arguments[i] + id).value.length) {
            params[arguments[i] + index] = ge(arguments[i] + id).value;
        }
    }
    return params;
}

function showMessage(message, cl) {
    ge('messageWrap').innerHTML = '<div class="' + cl + '">' + message + '</div>';
    show('messageWrap');
    setTimeout(function() {
        animate(ge('messageWrap').firstChild, {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#D8DFEA',
            borderLeftColor: '#D8DFEA',
            borderRightColor: '#D8DFEA',
            borderTopColor: '#D8DFEA'
        }, 1000);
    }, 1000);
}

function hideMessage() {
    hide('messageWrap');
}

function saveWorks() {
    var params = {
        act: 'a_career',
        hash: ge('hash').value
    };
    for (var i = 0; i < works.length; ++i) {
        var id = works[i].id;
        params['id' + i] = id;
        if (isVisible('content' + id) && (ge('company' + id).value.length || ge('position' + id).value.length)) {
            params = addFields(params, id, i, 'country', 'city', 'start', 'finish');
            params = addTextFields(params, id, i, 'company', 'position');
        } else {
            params['deleted' + i] = 1;
        }
    }

    var doneHandler = function(obj, text) {
        hide('save_progress');
        var response = eval('(' + text + ')');

        var to_remove = [];
        for (var i = 0; i < works.length; ++i) {
            var new_work_id = response['res' + i];
            if (intval(new_work_id)) {
                works[i] = updateWork(works[i], new_work_id, ge('works'));
            } else {
                to_remove.push(i);
            }
        }
        for (var i = 0; i < to_remove.length; ++i) {
            var index = to_remove[i];
            ge('work' + works[index].id).parentNode.removeChild(ge('work' + works[index].id));
            works[index] = works[works.length - 1];
            for (var j = i + 1; j < to_remove.length; ++j) {
                if (to_remove[j] == works.length - 1) {
                    to_remove[j] = index;
                }
            }
            works.pop();
        }
        worksCount = works.length;
        if (worksCount >= 7) {
            hide('add_work_link');
        } else {
            show('add_work_link');
        }
        if (!worksCount) {
            addWork();
        }

        window.scroll(0, 0);
        showMessage(lang.global_changes_saved + '.', 'message');
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
    Ajax.postWithCaptcha('editProfile.php', params, {
        onSuccess: doneHandler,
        onFail: failHandler,
        onCaptchaShow: hideHandler
    });
    return false;
}

function updateWork(old_work, new_work_id, parent) {
    old_work.country = old_work.uiCountry.val();
    old_work.country_val = old_work.uiCountry.val_full();
    old_work.city = old_work.uiCity.val();
    old_work.city_val = old_work.uiCity.val_full();
    old_work.company_name = ge('company' + old_work.id).value;
    old_work.start = old_work.uiStart.val();
    old_work.finish = old_work.uiFinish.val();
    old_work.position = ge('position' + old_work.id).value;

    var new_elem = genWorkRow(new_work_id);
    var old_elem = ge('work' + old_work.id);
    old_work.id = new_work_id;
    new_work = initWorkRow(old_work, new_elem);
    parent.replaceChild(new_elem, old_elem);

    return new_work;
}

function workChanged(work) {
    return !isVisible('content' + work.id) ||
        work.country != work.uiCountry.val() || work.city != work.uiCity.val() ||
        winToUtf(work.company_name) != ge('company' + work.id).value || winToUtf(work.position) != ge('position' + work.id).value ||
        work.start != work.uiStart.val() || work.finish != work.uiFinish.val();
}

var leaving = false;
var sure_box = false;

function checkChanges(showBox) {
    if (leaving) return;
    var work_change = false;
    for (var i = 0; i < works.length; ++i) {
        if (works[i].id > 0 && workChanged(works[i])) {
            work_change = true;
        } else if (works[i].id < 0 && isVisible('content' + works[i].id) && (ge('company' + works[i].id).value.length || ge('position' + works[i].id).value.length)) {
            work_change = true;
        }
    }
    var message = false;
    if (work_change) {
        message = lang.profileEdit_works_changed;
    }
    if (showBox === 1) {
        if (message) {
            if (!sure_box) {
                sure_box = new MessageBox({
                    title: lang.global_warning
                });
                sure_box.addButton({
                    label: lang.global_cancel,
                    style: 'button_no',
                    onClick: function() {
                        sure_box.hide();
                    }
                });
                sure_box.addButton({
                    label: lang.global_continue,
                    onClick: function() {
                        leaving = true;
                        location.replace('/');
                    }
                });
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