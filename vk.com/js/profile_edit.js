var MAX_ADDRESSES = 30;
var MAX_MILITARY = 5;
var addrCount = 0;
var milCount = 0;

function placeHook(list_id, listItemId) {
    var lival = ge('list_element_value' + list_id + listItemId);
    var value = lival.value;
    var text = ge('list_element_text' + list_id + listItemId).value;
    value = value.split(",");
    lival.value = value[0];

    var rownum = list_id.match(/.*?(\d+)/)[1];
    var new_type = parseInt(value[1]) || false;
    var new_district_id = parseInt(value[2]) || false;
    var new_station_id = parseInt(value[3]) || false;
    var new_street_id = parseInt(value[4]) || false;
    var new_street = value[5] || "";
    var new_house_id = parseInt(value[6]) || false;
    var new_house = value[7] || "";

    var type = ge('addr_type' + rownum).value;
    var district = ge('addr_district' + rownum).value;
    var station = ge('addr_station' + rownum).value;
    var street = ge('addr_street' + rownum).value;
    var house = ge('addr_house' + rownum).value;
    var house_hooked = false;

    if (new_type && checkValue(type)) {
        setListValue('addr_type' + rownum, new_type, "");
        ge('addr_type' + rownum + 'OtherInput').value = eval('select_placetype' + new_type);
        ge('addr_type' + rownum + 'OtherInput').style.color = "#000";
        //		typeSelectOnChange(new_type);
        typeSelectOnChange(rownum, new_type);
    }
    if (new_district_id && checkValue(district)) {
        setListValue('addr_district' + rownum, new_district_id, "");
    }
    if (new_station_id && checkValue(station)) {
        setListValue('addr_station' + rownum, new_station_id, "");
    }
    if (new_street_id && checkValue(street)) {
        setListValue('addr_street' + rownum, new_street_id, new_street);
        ge('addr_street' + rownum + 'OtherInput').value = new_street;
        if (new_house_id) {
            house_hooked = true;
            onSelectAjaxedHooks['addr_street' + rownum] = setHouse(rownum, house, new_house_id, new_house);
        }
        handleListChange('addr_street' + rownum);
    }
    if (new_house_id && !house_hooked) {
        setHouse(rownum, house, new_house_id, new_house)();
    }
}

function setHouse(rownum, oldvalue, value, text) {
    return function() {
        if (checkValue(oldvalue)) {
            setListValue('addr_house' + rownum, value, text);
            ge('addr_house' + rownum + 'OtherInput').value = text;
        }
    }
}

function checkValue(value) {
    return value == 'nil' || value == 'other' || value == 'other_ajax';
}

function validate() {
    var i;
    for (i = 1; i <= MAX_ADDRESSES; i++) {
        //		if (ge('addr_city'+ i).value == 'nil' && ge('addr_place'+ i).value != 'nil' && (ge('addr_place'+ i).value != 'other_ajax' || (ge('addr_place'+ i +'OtherInput').value.length > 0))) {
        //		if (ge('addr_city'+ i).value == 'nil' && ge('addr_place'+ i).value != 'nil' && ge('addr_place'+ i).value != 'other' && ge('addr_place'+ i).value != 'other_ajax') {
        if (ge('addr_city' + i).value == 'nil' && ge('addr_place' + i).value != 'nil') {
            ge('boxTitle').innerHTML = profile_edit_error;
            ge('boxMessage').innerHTML = profile_edit_sel_town_to_save;
            ge('button1').innerHTML = profile_edit_close;
            hide('button2Cont');
            showBoxOld(function() {
                ge('addr_city' + i).focus();
                hideBoxOld();
            });
            return false;
        }
    }
    return true;
}

function showAddr(type, skip0) {
    if (skip0 && addrCount == 0)
        addrCount = 1;
    hide('show' + addrCount);
    hide('del' + addrCount);
    if (addrCount < MAX_ADDRESSES) {
        addrCount++;
        //ge('addr_type'+addrCount).value = type;
        //ge('addr_type'+addrCount).onchange();
        if (type > 0) {
            setListValue('addr_type' + addrCount, type, eval('select_placetype' + type));
            typeSelectOnChange(addrCount, type);
            ge('addr_type' + addrCount + 'OtherInput').value = eval('select_placetype' + type);
            ge('addr_type' + addrCount + 'OtherInput').style.color = '#000';
            setTimeout(function() {
                new effects.fader().fade(ge('addr_type' + ac + 'OtherInput'), [0xE7EBF0], 400, 50);
            }, 300);
            //function() { new effects.fader().fade(ge('addr_type'+ ac +'OtherInput'), [0xFFFFFF], 300, 50); }
            //			setTimeout(function() { new effects.fader().fade(ge('addr_type'+ ac +'OtherInput'), [0xFFFFFF], 400, 50); }, 700);
        } else {
            //			setListValue('addr_type'+ addrCount, 'other', '');
            //			ge('addr_type'+ addrCount +'OtherInput').value = '';
        }
        show('addr' + addrCount);
        var ac = addrCount;
        new effects.fader().fade(ge('addr' + ac), [0xFFFFFF], 300, 50);
        setTimeout(function() {
            new effects.fader().fade(ge('addr' + ac), [0xF7F7F7], 1500, 50);
        }, 1500);
    }
    if (addrCount > 1)
        location.href = "#addr" + addrCount;
    return false;
}

function hideAddr() {
    hide('addr' + addrCount);
    setListValue('addr_type' + addrCount, 'nil', "");
    ge('addr_type' + addrCount + 'OtherInput').value = '';
    setListValue('addr_country' + addrCount, 'nil', "");
    handleListChange('addr_country' + addrCount);
    setListValue('addr_place' + addrCount, 'nil', "");
    if (ge('addr_place' + addrCount + 'OtherInput')) {
        ge('addr_place' + addrCount + 'OtherInput').value = '';
    }
    ge('addr_since' + addrCount).value = '0';
    ge('addr_until' + addrCount).value = '0';
    addrCount--;
    show('show' + addrCount);
    if (addrCount > 1)
        show('del' + addrCount);
    return false;
}

function typeSelectOnChange(rownum, value) {
    value = parseInt(value) || 0;
    //ge('pdesc'+ rownum).innerHTML = placeTypes[value][0];
    if (value < 2) {
        hide('addr_place' + rownum + 'OuterCont');
        setListValue('addr_place' + rownum, 'nil', '');
        if (ge('addr_place' + rownum + 'OtherInput'))
            ge('addr_place' + rownum + 'OtherInput').value = '';
    } else if (ge('addr_place' + rownum + 'OtherInput')) {
        ge('addr_place' + rownum + 'OuterCont').style.display = '';
    }
}

function showMil() {
    if (milCount == 0)
        milCount = 1;
    hide('show' + milCount);
    hide('del' + milCount);
    if (milCount < MAX_MILITARY) {
        milCount++;
        show('mil' + milCount);
        var ac = milCount;
        new effects.fader().fade(ge('mil' + ac), [0xFFFFFF], 300, 50);
        setTimeout(function() {
            new effects.fader().fade(ge('mil' + ac), [0xF7F7F7], 1500, 50);
        }, 1500);
    }
    if (milCount > 1)
        location.href = "#mil" + milCount;
    return false;
}

function hideMil() {
    hide('mil' + milCount);
    setListValue('mil_country' + milCount, 'nil', "");
    handleListChange('mil_country' + milCount);
    ge('mil_started' + milCount).value = '0';
    ge('mil_finished' + milCount).value = '0';
    milCount--;
    show('show' + milCount);
    if (milCount > 1)
        show('del' + milCount);
    return false;
}

function milUnitHook(list_id, listItemId) {
    var lival = ge('list_element_value' + list_id + listItemId);
    var value = lival.value;
    var rownum = list_id.match(/.*?(\d+)/)[1];
    value = value.split(",");
    lival.value = value[0];
    setListValue('mil_country' + rownum, value[1], "");
}