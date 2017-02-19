var globalCounter = 0;
var militariesCount = 0;

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

function genMilitaryRow(military_id) {
    var elem = document.createElement('div');
    elem.className = 'bigRow';
    elem.id = 'military' + military_id;
    elem.style.display = 'none';
    var delete_link = '<a href="#delete" class="fl_r" onclick="return deleteMilitary(' + military_id + ')">' + lang.global_delete + '</a>';
    elem.innerHTML = '<div id="content' + military_id + '">' +
        genOneRow('country', military_id, lang.select_country, '',
            '<img src="/images/upload.gif" id="progress' + military_id + '" />' + delete_link) +
        '<div id="details' + military_id + '" style="display: none">' +
        genOneRow('unit', military_id, lang.select_military_unit) +
        '<div id="all' + military_id + '" style="display: none">' +
        genOneRow('start', military_id, lang.select_military_start) +
        genOneRow('finish', military_id, lang.select_military_finish) +
        '</div></div></div>' +
        '<div class="deleted" id="deleted' + military_id + '"><div></div>' +
        '<a class="fl_r" href="#restore" onclick="return restoreMilitary(' + military_id + ')">' + lang.global_dont_delete + '</a>' +
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

function initMilitaryRow(military, elem) {
    var g = elem ? function(id) {
        return get_by_id(elem, id);
    } : ge;
    military.uiStart = new Dropdown(g('start' + military.id), [
        [0, getLang('select_year_not_selected')]
    ].concat(selData.from_years), {
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
                new_finish_data = selData.until_years;
            } else {
                var finish_value = intval(military.uiFinish.val());
                if (finish_value && finish_value < value) {
                    military.uiFinish.val(value);
                }
                for (var i = 0; i < selData.until_years.length; ++i) {
                    if (selData.until_years[i][0] >= value) {
                        new_finish_data.push(selData.until_years[i]);
                    }
                }
            }
            military.uiFinish.setOptions({
                defaultItems: [
                    [0, getLang('select_year_not_selected')]
                ].concat(new_finish_data)
            });
            military.uiFinish.setData(new_finish_data);
        }
    });
    military.uiStart.setData(selData.from_years);
    military.uiFinish = new Dropdown(g('finish' + military.id), [
        [0, getLang('select_year_not_selected')]
    ].concat(selData.until_years), {
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
                new_start_data = selData.from_years;
            } else {
                var start_value = intval(military.uiStart.val());
                if (start_value && start_value > value) {
                    military.uiStart.val(value);
                }
                for (var i = 0; i < selData.from_years.length; ++i) {
                    if (selData.from_years[i][0] <= value) {
                        new_start_data.push(selData.from_years[i]);
                    }
                }
            }
            military.uiStart.setOptions({
                defaultItems: [
                    [0, getLang('select_year_not_selected')]
                ].concat(new_start_data)
            });
            military.uiStart.setData(new_start_data);
        }
    });
    military.uiFinish.setData(selData.until_years);

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
        }
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
        }
    });

    g('military' + military.id).style.display = 'block';
    if (intval(military.country)) {
        g('details' + military.id).style.display = 'block';
    }
    if (intval(military.unit)) {
        g('all' + military.id).style.display = 'block';
    }

    return military;
}

onDomReady(function() {
    selectsData.setCountries(selData.countries_list);

    if (!isVisible('militaries')) {
        militariesCount = militaries.length;
        if (militariesCount) {
            for (var i = 0; i < militaries.length; ++i) {
                ge('militaries').appendChild(genMilitaryRow(militaries[i].id));
                militaries[i] = initMilitaryRow(militaries[i]);
            }
        } else {
            addMilitary();
        }
        show('militaries');
    }

    if (militariesCount >= 5) {
        hide('add_military_link');
    } else {
        show('add_military_link');
    }
});

function addMilitary() {
    if (militariesCount >= 5) {
        return false;
    }
    var new_military = {
        id: -(++globalCounter),
        country: selData.mem.country,
        country_val: selData.mem.country_val,
        unit: 0,
        unit_val: '',
        start: 0,
        finish: 0
    };
    ge('militaries').appendChild(genMilitaryRow(new_military.id));
    new_military = initMilitaryRow(new_military);
    militaries.push(new_military);
    ++militariesCount;
    if (militariesCount >= 5) {
        hide('add_military_link');
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

function deleteMilitary(id) {
    --militariesCount;
    show('add_military_link');
    if (intval(ge('unit' + id).value)) {
        hide('content' + id);
        ge('deleted' + id).firstChild.innerHTML = lang.profileEdit_military_will_be_deleted;
        show('deleted' + id);
    } else {
        var index = getIndex(militaries, id);
        militaries[index] = militaries[militaries.length - 1];
        militaries.pop();
        ge('military' + id).parentNode.removeChild(ge('military' + id));
        if (militaries.length == 0) {
            addMilitary();
        }
    }
    return false;
}

function restoreMilitary(id) {
    if (militariesCount >= 5) {
        return false;
    }
    hide('deleted' + id);
    show('content' + id);
    ++militariesCount;
    if (militariesCount >= 5) {
        hide('add_military_link');
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

function saveMilitaries() {
    var params = {
        act: 'a_military',
        hash: ge('hash').value
    };
    for (var i = 0; i < militaries.length; ++i) {
        var id = militaries[i].id;
        params['id' + i] = id;
        if (isVisible('content' + id) && intval(ge('unit' + id).value)) {
            params = addFields(params, id, i, 'country', 'unit', 'start', 'finish');
            if (ge('unit' + id + '_custom').value.length) {
                params['unit' + i + '_custom'] = ge('unit' + id + '_custom').value;
            }
        } else {
            params['deleted' + i] = 1;
        }
    }

    var doneHandler = function(obj, text) {
        hide('save_progress');
        var response = eval('(' + text + ')');

        var to_remove = [];
        for (var i = 0; i < militaries.length; ++i) {
            var new_military_id = response['res' + i];
            if (intval(new_military_id)) {
                militaries[i] = updateMilitary(militaries[i], new_military_id, ge('militaries'));
            } else {
                to_remove.push(i);
            }
        }
        for (var i = 0; i < to_remove.length; ++i) {
            var index = to_remove[i];
            ge('military' + militaries[index].id).parentNode.removeChild(ge('military' + militaries[index].id));
            militaries[index] = militaries[militaries.length - 1];
            for (var j = i + 1; j < to_remove.length; ++j) {
                if (to_remove[j] == militaries.length - 1) {
                    to_remove[j] = index;
                }
            }
            militaries.pop();
        }
        militariesCount = militaries.length;
        if (militariesCount >= 5) {
            hide('add_military_link');
        } else {
            show('add_military_link');
        }
        if (!militariesCount) {
            addMilitary();
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

function updateMilitary(old_military, new_military_id, parent) {
    old_military.country = old_military.uiCountry.val();
    old_military.country_val = old_military.uiCountry.val_full();
    old_military.unit = old_military.uiUnit.val();
    old_military.unit_val = old_military.uiUnit.val_full();
    old_military.start = old_military.uiStart.val();
    old_military.finish = old_military.uiFinish.val();

    var new_elem = genMilitaryRow(new_military_id);
    var old_elem = ge('military' + old_military.id);
    old_military.id = new_military_id;
    new_military = initMilitaryRow(old_military, new_elem);
    parent.replaceChild(new_elem, old_elem);

    return new_military;
}

function militaryChanged(military) {
    return !isVisible('content' + military.id) ||
        military.country != military.uiCountry.val() || military.unit != military.uiUnit.val() ||
        military.start != military.uiStart.val() || military.finish != military.uiFinish.val();
}

var leaving = false;
var sure_box = false;

function checkChanges(showBox) {
    if (leaving) return;
    var military_change = false;
    for (var i = 0; i < militaries.length; ++i) {
        if (militaries[i].id > 0 && militaryChanged(militaries[i])) {
            military_change = true;
        } else if (militaries[i].id < 0 && isVisible('content' + militaries[i].id) && intval(ge('unit' + militaries[i].id).value)) {
            military_change = true;
        }
    }
    var message = false;
    if (military_change) {
        message = lang.profileEdit_militaries_changed;
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