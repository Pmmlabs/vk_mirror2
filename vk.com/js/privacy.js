if (!window.pp_display_fr_count) window.pp_display_fr_count = 5;

var privacyBox, ppCallback;

onDomReady(function() {
    privacyBox = new PrivacyBox({
        onPrivacySave: onCustomPrivacySave,
        saveList: canSaveList()
    });
    each(['ppMenu', 'dpHead', 'dpMenu'], function() {
        appendDiv(this);
    });
});

function appendDiv(id) {
    var div = document.createElement('div');
    div.id = id;
    var elem = browser.msie6 ? ge('pageContainer') : false;
    if (!elem) elem = document.body;
    elem.appendChild(div);
}

// PP Block

pp_over = 0;
pp_selected = {};
pp_custom_id = -1;
pp_friends_id = 4;
pp_lists_id = 5;
pp_custom_friends = {};
pp_advanced_friends = {};
pp_hidden_options = {};

function ppShow(pp_tag, nofix) {
    if (pp_selected[pp_tag] == undefined) {
        pp_selected[pp_tag] = 0;
    }
    var coords = getXY(ge('pp_' + pp_tag));
    var options = pp_options[pp_tag] || pp_options;
    j = pp_selected[pp_tag];
    var pp_menu = ge('ppMenu');

    var pageContainer = browser.msie6 ? ge('pageContainer') : false;
    if (!pageContainer) pageContainer = document.body;
    var pageScrollTop = pageContainer.scrollTop;
    if (!pageScrollTop && !browser.msie6) pageScrollTop = document.getElementsByTagName('html')[0].scrollTop;

    var height = ppHeight(pp_tag);
    var ie_x_fix = (browser.msie6 && !nofix) ? 1 : (browser.msie ? 0 : 0);
    var ie_y_fix = (browser.msie && !nofix) ? 1 : 0;
    var winHeight = window.innerHeight ? window.innerHeight : (document.documentElement ? document.documentElement.clientHeight : 0);
    var toUp = (coords[1] - 3 + ie_y_fix + height[0] + height[1] - pageScrollTop > winHeight) ? true : false;
    var postfix = (toUp ? 'Up' : '');

    if (pp_tag == 'friends_requests' && j == 2) {
        j = 1;
    }
    var pp_top = '<div onclick="ppHide(1)" class="ppHead' + postfix + '"><div class="ppChooseTop" onmouseover="pp_over=1" onmouseout="pp_over=0; ppRemove()" id="ppChooseWord">' + options[j] + '</div></div>';
    if (toUp) {
        pp_menu.innerHTML = '<table cellpadding="0" cellspacing="0"><tr><td class="ppMenuSide"></td><td><div class="ppMenuBottom"></div><div class="ppMenuBottom2"></div><div onmouseout="ppRemove();" class="ppMenuBodyUp">' + ppOptions(pp_tag, true) + '</div>' + pp_top + '</td><td class="ppMenuSide"></td></tr></table>';
        pp_menu.style.top = (coords[1] + 18 - height[0] + ie_y_fix) + 'px';
    } else {
        pp_menu.innerHTML = '<table cellpadding="0" cellspacing="0"><tr><td class="ppMenuSide"></td><td>' + pp_top + '<div onmouseout="ppRemove();" class="ppMenuBody">' + ppOptions(pp_tag) + '</div><div class="ppMenuBottom2"></div><div class="ppMenuBottom"></div></td><td class="ppMenuSide"></td></tr></table>';
        pp_menu.style.top = (coords[1] - 3 + ie_y_fix) + 'px';
    }

    pp_menu.style.left = (coords[0] - 7 + ie_x_fix) + 'px';
    show(pp_menu);
    if (window.is_rtl) {
        var size = getSize(ge('pp_' + pp_tag));
        var menu_size = getSize(pp_menu);
        pp_menu.style.left = (coords[0] + size[0] - menu_size[0] + 7) + 'px';
    }

    for (var has_lists in friends_lists) break;
    if (j == pp_lists_id && has_lists !== undefined) {
        dpShow(pp_tag);
    }
    pp_menu.style.visibility = 'visible';
}

function ppHeight(pp_tag) {
    var result = [4, 0];
    var j = pp_selected[pp_tag];
    var options = pp_options[pp_tag] || pp_options;
    var found_lists_id = false;
    for (var has_lists in friends_lists) break;
    for (var i = 0; i < options.length; i++) {
        if (i == pp_lists_id) {
            found_lists_id = true;
        }
        if (!options[i] || i == pp_lists_id && has_lists === undefined) continue;
        if (i == pp_friends_id && !js_fr_cnt) continue;
        result[0] += 19;
    }
    if (options[-1]) result[0] += 19;
    result[0] += 19;
    if (has_lists !== undefined && found_lists_id) {
        result[1] = 2;
        for (var i in friends_lists) {
            result[1] += 19;
        }
    }
    return result;
}

function ppOptions(pp_tag, toUp) {
    var str = '';
    var j = pp_selected[pp_tag];
    var cls = '';
    var options = pp_options[pp_tag] || pp_options;
    var h = pp_hidden_options[pp_tag] || {};
    var custom_f = false;
    for (var has_lists in friends_lists) break;
    for (var i = 0; i < options.length; i++) {
        if (!options[i] || i == pp_lists_id && has_lists === undefined || h[i]) continue;
        if (i == pp_friends_id && !js_fr_cnt) continue;
        cls = j == i ? 'ppItemOver' : 'ppItem';
        str = (toUp ? '' : str) + '<div id="ppItem' + i + '" onclick="ppClick(' + i + ',\'' + pp_tag + '\')" onmouseover="ppOverItem(this,' + i + ',\'' + pp_tag + '\')" onmouseout="ppOutItem(this,' + i + ')" class="' + cls + '">' + options[i] + '</div>' + (toUp ? str : '');
        if (i == 3 && options[-1]) {
            cls = j == -1 ? 'ppItemOver' : 'ppItem';
            str = (toUp ? '' : str) + '<div id="ppItem-1" onclick="ppClick(-1,\'' + pp_tag + '\')" onmouseover="ppOverItem(this,-1,\'' + pp_tag + '\')" onmouseout="ppOutItem(this,-1)" class="' + cls + '">' + options[-1] + '</div>' + (toUp ? str : '');
            custom_f = true;
        }
    }
    if (!custom_f && options[-1]) {
        cls = j == -1 ? 'ppItemOver' : 'ppItem';
        str = (toUp ? '' : str) + '<div id="ppItem-1" onclick="ppClick(-1,\'' + pp_tag + '\')" onmouseover="ppOverItem(this,-1,\'' + pp_tag + '\')" onmouseout="ppOutItem(this,-1)" class="' + cls + '">' + options[-1] + '</div>' + (toUp ? str : '');
    }
    return str;
}

function ppOverItem(obj, i, pp_tag) {
    pp_over = 1;
    if (i == pp_lists_id - 1) {
        if (pp_selected[pp_tag] == pp_lists_id) {
            obj.className = 'ppItemOverBottom';
        } else {
            obj.className = (i == pp_friends_id) ? 'ppItemOverPlus' : 'ppItemOver';
        }
    } else {
        obj.className = (i == pp_friends_id) ? 'ppItemOverPlus' : 'ppItemOver';
    }

    if (i == pp_lists_id) {
        dpShow(pp_tag);
    }
    if (pp_selected[pp_tag] != i && (ge('ppItem' + pp_selected[pp_tag]) && ge('ppItem' + pp_selected[pp_tag]).className == 'ppItemOver')) {
        ge('ppItem' + pp_selected[pp_tag]).className = 'ppItem';
    }

}

function ppOutItem(obj, i) {
    pp_over = 0;
    obj.className = 'ppItem';
    ppRemove();
}

function ppClick(i, pp_tag) {
    if (i == pp_lists_id && !dpHasChecks(pp_tag)) {
        return;
    }

    if (i == pp_friends_id) {
        privacyBox.editPrivacy(pp_tag, pp_custom_friends[pp_tag]);
        ppHide(1);
        return false;
    }
    if (i == pp_custom_id) {
        showCustomBox({
            key: pp_tag
        });
        ppHide(1);
        return false;
    } else {
        show('pp_ignore_friends');
    }
    var options = pp_options[pp_tag] || pp_options;
    pp_selected[pp_tag] = i;
    ge('pp_' + pp_tag).innerHTML = options[i];
    if (i != pp_lists_id) {
        ge('pp_custom_' + pp_tag).innerHTML = '';
        dp_checked[pp_tag] = undefined;
    } else if (i != pp_friends_id) {
        pp_custom_friends[pp_tag] = undefined;
    }
    ppHide(1);

    if (isFunction(ppCallback))
        ppCallback(pp_tag, getPrivacy(pp_tag));
}

function ppRemove() {
    setTimeout("ppHide(0)", 100);
}

function ppHide(force) {
    if ((pp_over || dp_over) && !force) {
        return;
    }
    var pp_menu = ge('ppMenu');
    pp_menu.style.visibility = 'hidden';
    hide(pp_menu);
    dpHide(1);
}

// DP Block

var dp_over = 0,
    dp_checked = {};


function dpShow(pp_tag) {
    var options = pp_options[pp_tag] || pp_options;
    var ppItem = ge('ppItem' + pp_lists_id);
    if (!ppItem) return;
    var toUp = hasClass(ppItem.parentNode, 'ppMenuBodyUp');
    var postfix = toUp ? 'Up' : '';
    var coords = getXY(ppItem);
    var dp_head = ge('dpHead');
    var ie_x_fix = browser.msie ? 0 : 0;
    var ie_y_fix = browser.msie ? 0 : 0;

    dp_head.style.left = coords[0] + ie_x_fix + 'px';
    dp_head.style.top = coords[1] + ie_y_fix + 'px';
    dp_head.style.width = ppItem.offsetWidth + 'px';
    var str = '<div class="dpHead' + postfix + '" onclick="ppClick(' + pp_lists_id + ',\'' + pp_tag + '\')" onmouseout="dpRemove(\'' + pp_tag + '\'); dp_over=0;" onmouseover="dp_over=1"><div class="dpChooseTop">' + options[pp_lists_id] + '</div></div>';
    dp_head.innerHTML = str;
    show(dp_head);

    var dp_menu = ge('dpMenu');
    var str = '<table cellpadding="0" cellspacing="0"><tr><td class="dpSide"></td><td>';
    if (toUp) {
        var height = ppHeight(pp_tag);
        dp_menu.style.top = coords[1] - 20 - height[1] + ie_y_fix + dp_head.offsetHeight + 'px';
        str += '<div class="dpBottom2"></div><div class="dpBottom"></div>';
        str += '<div class="dpBodyUp">' + dpItems(pp_tag, true) + '</div>';
    } else {
        dp_menu.style.top = coords[1] - 1 + ie_y_fix + dp_head.offsetHeight + 'px';
        str += '<div class="dpBody">' + dpItems(pp_tag) + '</div>';
        str += '<div class="dpBottom"></div><div class="dpBottom2"></div>';
    }
    str += '</td><td class="dpSide"></td></tr></table>';
    dp_menu.innerHTML = str;
    var rtl_fix = window.is_rtl ? -16 : 0;
    dp_menu.style.left = coords[0] - 1 + ie_x_fix + rtl_fix + 'px';
    show(dp_menu);
}

function dpItems(pp_tag, toUp) {
    var str = "",
        cl_name = "";
    if (dp_checked[pp_tag] == undefined) {
        dp_checked[pp_tag] = [];
    }
    var k = [],
        r = {};
    each(friends_lists, function(i, v) {
        k.push(i);
    });
    k.sort(function(a, b) {
        return a - b;
    });
    each(k, function(i, v) {
        if (dp_checked[pp_tag][v]) {
            cl_name = "dpItemChecked";
        } else {
            cl_name = "dpItem";
        }
        str = (toUp ? '' : str) + '<div id="dp' + v + '" onclick="dpCheck(' + v + ',\'' + pp_tag + '\')" onmouseover="dpOverItem(' + v + ',\'' + pp_tag + '\')" onmouseout="dpOutItem(' + v + ',\'' + pp_tag + '\')" class="' + cl_name + '"><div>' + friends_lists[v] + '</div></div>' + (toUp ? str : '');
    });

    return str;
}

function dpOverItem(n, pp_tag) {
    if (dp_checked[pp_tag][n]) {
        ge('dp' + n).className = 'dpItemCheckedOn';
    } else {
        ge('dp' + n).className = 'dpItemOn';
    }
    dp_over = 1;
}

function dpOutItem(n, pp_tag) {
    if (dp_checked[pp_tag][n]) {
        ge('dp' + n).className = 'dpItemChecked';
    } else {
        ge('dp' + n).className = 'dpItem';
    }
    dp_over = 0;
    dpRemove(pp_tag);
}

function dpCheck(n, pp_tag) {
    var options = pp_options[pp_tag] || pp_options;
    if (dp_checked[pp_tag][n]) {
        dp_checked[pp_tag][n] = 0;
        ge('dp' + n).className = 'dpItemOn';
        if (pp_selected[pp_tag] == pp_lists_id) {
            if (!dpHasChecks(pp_tag)) {
                pp_selected[pp_tag] = 0;
                ge('pp_' + pp_tag).innerHTML = options[pp_selected[pp_tag]];
                ge('ppChooseWord').innerHTML = options[pp_selected[pp_tag]];
            }
        }
    } else {
        dp_checked[pp_tag][n] = 1;
        ge('dp' + n).className = 'dpItemCheckedOn';
        if (pp_selected[pp_tag] != pp_lists_id) {
            pp_selected[pp_tag] = pp_lists_id;
            ge('pp_' + pp_tag).innerHTML = options[pp_selected[pp_tag]];
            ge('ppChooseWord').innerHTML = options[pp_selected[pp_tag]];
        }
    }

    dpMakeCats(pp_tag);

    if (isFunction(ppCallback))
        ppCallback(pp_tag, getPrivacy(pp_tag));
}

function dpRemove(pp_tag) {
    setTimeout("dpHide(0,'" + pp_tag + "')", 50);
}

function dpHide(force, pp_tag) {
    if (!force && (dp_over)) {
        return;
    }
    if (!force && pp_over) {
        if (pp_selected[pp_tag] == pp_lists_id) {
            return;
        }
    }
    var dp_menu = ge('dpMenu');
    hide(dp_menu);
    var dp_head = ge('dpHead');
    hide(dp_head);
    if (!force) {
        ppHide(0);
    }
}

function dpMakeCats(pp_tag) {
    var i, j = 0,
        str = "";
    if (dp_checked[pp_tag] == undefined) {
        return;
    }
    for (i in dp_checked[pp_tag]) {
        if (dp_checked[pp_tag][i]) {
            j = (i - 1) % 8 + 1;
            str += '<span class="Group' + j + '">' + friends_lists[i] + '</span>, ';
        }
    }
    if (str.length) {
        str = ': ' + str.substr(0, str.length - 2);
    }
    ge('pp_custom_' + pp_tag).innerHTML = str;
}

function dpHasChecks(pp_tag) {
    for (var i in dp_checked[pp_tag]) {
        if (dp_checked[pp_tag][i]) {
            return true;
        }
    }
    return false;
}

function onCustomPrivacySave(pp_tag, friends, friends_info, list_id, list_name, minus_friends, minus_friends_info) {
    var options = pp_options[pp_tag] || pp_options;
    dp_checked[pp_tag] = [];
    if (list_id) {
        friends_lists[list_id] = list_name;
        dp_checked[pp_tag][list_id] = list_id;
        pp_selected[pp_tag] = pp_lists_id;
        ge('pp_' + pp_tag).innerHTML = options[pp_lists_id];
        if (canSaveList()) {
            privacyBox.setOptions({
                saveList: false
            });
        }
        pp_custom_friends[pp_tag] = {};
        dpMakeCats(pp_tag);

        if (isFunction(ppCallback))
            ppCallback(pp_tag, getPrivacy(pp_tag));
        return true;
    }

    if (!isArray(minus_friends)) {
        pp_custom_friends[pp_tag] = friends;
        pp_advanced_friends[pp_tag] = undefined;
        pp_selected[pp_tag] = pp_friends_id;
        ge('pp_' + pp_tag).innerHTML = options[pp_friends_id];

        var count = friends.length,
            str = friends_info.join(', ');

        if (count > pp_display_fr_count) {
            count = count - pp_display_fr_count;
            str += ' ' + getLang('privacy_N_friends_some', count);
        }

        str = ': ' + str;
        ge('pp_custom_' + pp_tag).innerHTML = str;
    } else {
        pp_selected[pp_tag] = pp_custom_id;
        pp_custom_friends[pp_tag] = undefined;
        var isList = isArray(friends);
        pp_advanced_friends[pp_tag] = [isList ? 0 : 1, friends, minus_friends];

        var onlyLists = true;
        var onlyIds = true;
        if (isList) {
            each(friends, function(i, v) {
                if (v > 0) {
                    onlyLists = false;
                } else {
                    onlyIds = false;
                    dp_checked[pp_tag][-v] = -v;
                }
            });
        }
        var option_id = isList ? (onlyLists ? pp_lists_id : pp_friends_id) : friends;
        ge('pp_' + pp_tag).innerHTML = options[option_id];

        var count = friends.length,
            str = '';
        if (isList) {
            str = ': ' + friends_info.join(', ');

            if (count > pp_display_fr_count) {
                count = count - pp_display_fr_count;
                str += ' ' + getLang('privacy_N_friends_some', count);
            }
        }

        var m_count = (minus_friends || []).length;
        if (m_count) {
            str += ', ';
            str += getLang('global_privacy_except') + ' ' + minus_friends_info.join(', ');

            if (m_count > pp_display_fr_count) {
                m_count = m_count - pp_display_fr_count;
                str += ' ' + getLang('privacy_N_friends_more', m_count);
            }
        } else {
            debugLog(isList);
            if (isList && onlyLists) {
                pp_selected[pp_tag] = pp_lists_id;
            } else if (isList && onlyIds) {
                pp_selected[pp_tag] = pp_friends_id;
            } else if (!isList) {
                pp_selected[pp_tag] = friends;
                str = '';
            }
        }
        ge('pp_custom_' + pp_tag).innerHTML = str;
    }

    if (isFunction(ppCallback))
        ppCallback(pp_tag, getPrivacy(pp_tag));
}

function canSaveList() {
    var lists_count = 0;
    for (var i in friends_lists) {
        lists_count++;
    }
    return lists_count < 30;
}

function getPrivacy(pp_tag) {
    var privacy = pp_selected[pp_tag] ? pp_selected[pp_tag] : 0;
    if (privacy == pp_friends_id && pp_custom_friends[pp_tag]) {
        privacy += '_' + pp_custom_friends[pp_tag].join(',');
    }
    if (privacy == pp_friends_id && pp_advanced_friends[pp_tag] && isArray(pp_advanced_friends[pp_tag][1])) {
        privacy += '_' + pp_advanced_friends[pp_tag][1].join(',');
    } else if (privacy == pp_lists_id && dp_checked[pp_tag]) {
        privacy += '_';
        for (var i in dp_checked[pp_tag])
            if (dp_checked[pp_tag][i])
                privacy += i + ',';
        privacy = privacy.substr(0, privacy.length - 1);
    } else if (privacy == pp_custom_id) {
        var adv = pp_advanced_friends[pp_tag] || [];
        var plus = (isArray(adv[1]) ? adv[1].join(',') : adv[1]) || '';
        var minus = (isArray(adv[2]) ? adv[2].join(',') : adv[2]) || '';
        privacy += '_' + adv[0] + '_' + plus + '_' + minus;
    }
    return privacy;
}

function setPrivacy(pp_tag, privacy) {
    var options = pp_options[pp_tag] || pp_options;
    privacy = privacy.split('_');
    pp_selected[pp_tag] = privacy[0];
    ge('pp_' + pp_tag).innerHTML = pp_options[privacy[0]];
    if (privacy[0] == 2 && privacy[1]) {
        var cats = privacy[1].split(',');
        dp_checked[pp_tag] = [];
        for (var i in cats) {
            dp_checked[pp_tag][cats[i]] = 1;
        }
        dpMakeCats(pp_tag);
    }
}

(function() {
    var customMB = {};
    var friendsPrivacyList;

    window.customBoxDefaults = {
        who_can_see_title: '���� ����������?',
        who_cannot_see_title: '���� �� ����������?',
        show_to: '���������� {friends}.'
    };

    window.showCustomMenu = function(key) {
        customMB[key].plus_flist_type.show();
    };

    var wrapLink = function(id, name) {
        return id > 0 ? '<a href="/id' + id + '">' + name + '</a>' : '<span class="Group' + ((-id - 1) % 8 + 1) + '">' + name + '</span>';
    }

    window.showCustomBox = function(options) {
        options = extend({}, customBoxDefaults, options || {});
        var key = options.key || 'default';
        if (!customMB[key]) {
            customMB[key] = new MessageBox({
                title: options.title || getLang('privacy_custom_title'),
                width: 400,
                returnHidden: true
            });
            customMB[key].addButton({
                label: getLang('global_close'),
                style: 'button_no',
                onClick: customMB[key].hide
            });
            customMB[key].addButton({
                label: getLang('global_save'),
                onClick: function() {
                    hide('pp_ignore_friends');
                    var minus = [];
                    var plus = [];
                    var plus_info = [];
                    var minus_info = [];
                    each(customMB[key].minus_flist.selectedItems(), function(i, v) {
                        minus.push(v[0]);
                        if (minus_info.length < 5) minus_info.push(wrapLink(v[0], v[1]));
                    });
                    each(customMB[key].plus_flist.selectedItems(), function(i, v) {
                        plus.push(v[0]);
                        if (plus_info.length < 5) plus_info.push(wrapLink(v[0], v[1]));
                    });
                    var type = customMB[key].type || 0;
                    if (type != 4) {
                        plus = type;
                    } else if (!plus.length) {
                        plus = 0;
                    }
                    onCustomPrivacySave(key, plus, plus_info, null, null, minus, minus_info);
                    customMB[key].hide();
                }
            });
            customMB[key].content('<div class="box_loader"></div>');

            function init() {
                var plus_type = 0;
                var plus = [];
                var minus = [];
                if (pp_advanced_friends[key]) {
                    plus_type = pp_advanced_friends[key][0] ? pp_advanced_friends[key][1][0] : 4;
                    plus = plus_type == 4 ? pp_advanced_friends[key][1] : [];
                    if (plus_type == 3) plus_type = 1;
                    minus = pp_advanced_friends[key][2];
                    customMB[key].type = plus_type;
                }
                var hide_type = plus_type == 4 ? '' : 'display:none;';
                var l = [
                    options.all_users || getLang('privacy_options_all_users_dat'),
                    options.friends_only || getLang('privacy_options_friends_only_dat'),
                    options.friends_and_friends || getLang('privacy_options_friends_and_friends_dat'),
                    options.only_me || getLang('privacy_options_only_me_dat'),
                    options.some_friends || getLang('privacy_options_some_friends_dat')
                ];
                customMB[key].content('<div class="plus_friends"><h4 class="header_plus_friends">' + options.who_can_see_title + '</h4>' +
                    '<div style="padding:3px 0;">' + options.show_to.replace('{friends}', '<a href="" id="plus_friends_type_' + key + '" onclick="showCustomMenu(\'' + key + '\');return false;">' + l[plus_type] + '</a>') + '</div>' +
                    '<div class="clear" style="padding: 5px 0;' + hide_type + '" id="plus_friends_list_wrap"><input type="hidden" id="plus_friends_list"/></div></div>' +
                    '<div class="minus_friends"><h4 class="header_minus_friends" style="margin: 15px 0px 5px;">' + options.who_cannot_see_title + '</h4>' +
                    '<div style="padding: 5px 0"><input type="hidden" id="minus_friends_list"/></div></div>');
                customMB[key].plus_flist_type = new DropdownMenu([{
                    i: 0,
                    l: l[0]
                }, {
                    i: 1,
                    l: l[1]
                }, {
                    i: 2,
                    l: l[2]
                }, /*{i:3,l:l[3]},*/ {
                    i: 4,
                    l: l[4]
                }], {
                    target: ge('plus_friends_type_' + key),
                    onSelect: function(e) {
                        var v = parseInt(e.target.index || 0);
                        var shown = isVisible('plus_friends_list_wrap');
                        if (v == 4 && !shown) {
                            slideDown(ge('plus_friends_list_wrap'), 100);
                        } else if (shown) {
                            slideUp(ge('plus_friends_list_wrap'), 100);
                        }
                        customMB[key].type = v;
                        return true;
                    }
                });
                var def = [];
                each(friendsPrivacyList, function(i, v) {
                    if (v[0] < 0) def.push(v);
                });
                customMB[key].plus_flist = new Selector(ge('plus_friends_list'), friendsPrivacyList, {
                    defaultItems: def,
                    width: 350,
                    placeholder: '������� ��� ����� ��� �������� ������ ������',
                    onChange: function(v) {
                        if (v === '') return;
                        var changed = false;
                        v = v.split(',');
                        var items = [];
                        each(customMB[key].minus_flist.selectedItems(), function(i, item) {
                            if (v.indexOf(item[0]) != -1) {
                                changed = true;
                            } else {
                                items.push(item);
                            }
                        });
                        if (changed) {
                            customMB[key].minus_flist.clear();
                            each(items, function(i, item) {
                                customMB[key].minus_flist.selectItem(item);
                            });
                        }
                    },
                    selectedItems: plus,
                    introText: '������� ����� ������, ������� �� ������ ��������� ������'
                });
                customMB[key].minus_flist = new Selector(ge('minus_friends_list'), friendsPrivacyList, {
                    defaultItems: def,
                    width: 350,
                    placeholder: '������� ��� ����� ��� �������� ������ ������',
                    onChange: function(v) {
                        if (v === '') return;
                        var changed = false;
                        v = v.split(',');
                        var items = [];
                        each(customMB[key].plus_flist.selectedItems(), function(i, item) {
                            if (v.indexOf(item[0]) != -1) {
                                changed = true;
                            } else {
                                items.push(item);
                            }
                        });
                        if (changed) {
                            customMB[key].plus_flist.clear();
                            each(items, function(i, item) {
                                customMB[key].plus_flist.selectItem(item);
                            });
                        }
                    },
                    selectedItems: minus,
                    introText: '������� ����� ������, ������� �� ������ ��������� ������'
                });
            };

            if (!friendsPrivacyList) {
                Ajax.Send('friends_ajax.php', {
                    act: 'custom'
                }, {
                    onSuccess: function(o, t) {
                        friendsPrivacyList = eval(t);
                        init();
                    },
                    onFail: function(o, t) {

                    }
                });
            } else {
                init();
            }
        }
        customMB[key].show();
    }

})();