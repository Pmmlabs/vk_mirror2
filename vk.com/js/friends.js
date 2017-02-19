if (!window.pp_display_fr_count) window.pp_display_fr_count = 5;

function FriendsFilter(dataObj, input, options) {
    if (!dataObj) return false;

    var indexData = [],
        dataObj = dataObj.friends ? dataObj : {
            friends: dataObj
        },
        self = this,
        filteredData,
        options = extend({
            pages: true,
            pageSize: 50
        }, options);

    function initIndex() {
        indexData = [];
        if (dataObj.friends) {
            dataObj.friendsIndex = {};
        }
        for (var i in dataObj.friends) {
            var obj = dataObj.friends[i],
                addedChars = [],
                str = obj[1] + (dataObj.universities ? ' ' + (dataObj.universities[obj[8]] || '').replace('(', ' ') : '');
            var cursor = 0,
                charac;
            dataObj.friendsIndex[obj[0]] = i;
            while (1) {
                charac = str.charAt(cursor).toLowerCase();
                if (indexOf(addedChars, charac) == -1) {
                    indexData[charac] ? indexData[charac].push(obj) : indexData[charac] = [obj];
                    addedChars.push(charac);
                }

                cursor = str.indexOf(' ', cursor + 1);
                if (cursor == -1) break;
                cursor++;
            }
        };
    }

    function matchSubset(s, sub) {
        if (typeof s != "string") return false;
        sub = escapeRE(sub);
        return ((new RegExp("^" + sub + "|\\s" + sub + "|\\(" + sub, "gi")).test(trim(s)));
    }

    this.loadFriends = function(id, filter) {
        if (dataObj.filter == filter)
            return false;
        filteredData = null;
        var url = '8friends.php?id=' + id + '&filter=' + filter;
        Ajax.Post({
            url: url,
            onDone: function(ajaxObj, responseText) {
                dataObj = eval('(' + responseText + ')');
                indexData = [];
                initIndex();
                self.setPage(0);
            }
        });
    }

    this.getData = function() {
        return dataObj;
    }

    this.setData = function(data) {
        if (!data) return false;
        dataObj = data.friends ? data : {
            friends: data
        };
        initIndex();
    }
    this.filterData = function(friendsIds) {
        if (friendsIds === false) {
            filteredData = null;
            return;
        }
        var i, fi;
        filteredData = {
            friends: []
        };
        for (var i = 0; i < friendsIds.length; i++) {
            fi = dataObj.friendsIndex[friendsIds[i]];
            if (fi == undefined) continue;
            filteredData.friends.push(dataObj.friends[fi]);
        }
    }

    this.setPage = function(offset) {
        self.showFriends(input.active ? input.value : '', offset);
        return false;
    }

    this.showFriends = function(query, offset) {
        var matches = [];
        query = query || '';
        if (offset == undefined)
            offset = 0;

        query = trim(query.toLowerCase());
        if (query == '') {
            matches = (filteredData && filteredData.friends) ? filteredData.friends : dataObj.friends;
        } else {
            if (filteredData)
                filteredData = null;
            var translate = parseLatin(query),
                queries = translate == null ? [query] : [query, translate];
            each(queries, function() {
                var tmpMatches;
                if (typeof indexData[this] == 'Array') {
                    tmpMatches = indexData[this];
                } else {
                    tmpMatches = [];
                    var tmpData = indexData[this.charAt(0)];
                    for (var i in tmpData)
                        if (matchSubset(tmpData[i][1] + (dataObj.universities ? ' ' + dataObj.universities[tmpData[i][8]] : ''), this)) {
                            tmpMatches.push(tmpData[i]);
                        }
                    indexData[this] = tmpMatches;
                }
                matches = matches.concat(tmpMatches);
            });
        }
        var pages = "",
            summary = "";

        if (options.pages) {
            var matchesLength = matches.length,
                pageSize = options.pageSize;
            if (matches.length <= offset) {
                offset = 0;
            }

            matches = matches.slice(offset, offset + pageSize);

            if (selected_filter == 'requests') {
                var need_load_common = [];
                for (i in matches) {
                    if (matches[i][13] == undefined) {
                        need_load_common.push(matches[i][0]);
                    }
                }
                if (need_load_common.length > 0) {
                    Ajax.Post({
                        url: 'friends_ajax.php',
                        query: {
                            act: 'get_user_commons',
                            uids: need_load_common.join(',')
                        },
                        onDone: function(ajaxObj, responseText) {
                            var result = eval('(' + responseText + ')');
                            for (var i in need_load_common) {
                                if (result[need_load_common[i]]) {
                                    var block = ge('frcommon' + need_load_common[i]);
                                    if (block) {
                                        block.innerHTML = result[need_load_common[i]];
                                        show(block);
                                        show('frcommon_l' + need_load_common[i]);
                                    }
                                }
                            }
                            for (i in matches) {
                                if (result[matches[i][0]]) {
                                    matches[i][13] = result[matches[i][0]];
                                } else {
                                    matches[i][13] = "";
                                }
                            }
                        }
                    });
                }
            }

            if (matchesLength > pageSize) {
                pages = '<ul class="pageList">';
                var pagesCount = Math.ceil(matchesLength / pageSize),
                    minPage = 1,
                    maxPage = pagesCount,
                    page = Math.floor(offset / pageSize) + 1;
                if (pagesCount > 5) {
                    minPage = Math.max(1, page - 2),
                        maxPage = Math.min(pagesCount, page + 2);
                }
                if (minPage > 1) pages += '<li><a href="#" onclick="getPage(0); return false;">&laquo;</a></li>';
                for (var i = minPage; i <= maxPage; i++) {
                    if (i == page) {
                        pages += '<li class="current">' + i + '</li>';
                    } else {
                        pages += '<li><a href="#" onclick="getPage(' + (i - 1) * pageSize + ');return false;">' + i + '</a></li>';
                    }
                }
                if (maxPage < pagesCount) pages += '<li><a href="#" onclick="getPage(' + (pagesCount - 1) * pageSize + '); return false;">&raquo;</a></li>';
                pages += "</ul>";
            }

            if (dataObj.summary) {
                summary = dataObj.summary + (matchesLength && query.length ? ' (' + matchesLength + ')' : '');
            }
        }

        if (isFunction(options.onDataReady)) {
            options.onDataReady(matches, query, matchesLength, summary, pages);
        }
    }

    // Init index array
    initIndex();
    // Attach event hadler
    var t;
    input = ge(input);
    addEvent(input, 'keydown keypress', function(e) {
        clearTimeout(t);
        t = setTimeout(function() {
            self.showFriends(input.active ? input.value : '')
        }, 100);
    });
};

function PrivacyBox(options) {
    var privacyBox, saveListBox,
        self = this,
        tabListSelected = 0,
        saving_list = false,
        privacyItem = '',
        btnSelectAll,
        friendsFilter, friendsIndex, friendsData, filterQuery, filteredItems, selectedFriends, selectedCount = 0,
        options = extend({
            saveList: true,
            saveListMinUsers: 3
        }, options);

    function initBox() {
        privacyBox = new MessageBox({
            title: getLang('friends_privacy_title'),
            width: '480px',
            bodyStyle: 'padding:0px',
            onHide: options.onHide
        });
        privacyBox.addButton({
            onClick: function() {
                privacyBox.hide(200)
            },
            style: 'button_no',
            label: getLang('friends_cancel')
        }).addButton({
            onClick: savePrivacy,
            label: getLang('friends_save')
        }).addControlsText('<a href="#" id="btn_select_all">' + getLang('friends_select_all') + '</a>');

        privacyBox.content('<div class="friend_list_top">' +
            '<input type="text" placeholder="' + getLang('friends_enter_friend_name') + '" class="inputText" id="privacy_box_friend_list_lookup"/>' +
            '<div class="t_filter_selected" id="privacy_box_list_tab">' +
            '<div class="t_filter2"><div class="t_filter3">' + getLang('friends_all') + '</div></div></div>' +
            '<div class="t_filter_off" id="privacy_box_list_selected_tab">' +
            '<div class="t_filter2"><div class="t_filter3">' + getLang('friends_selected') + ' (<span id="privacy_box_list_selected_count">0</span>)</div></div></div>' +
            '<div class="clearFix"></div>' +
            '<div></div></div>' +
            '<div class="flist_shadow" style="opacity:0.3;filter:alpha(opacity=30);margin-top:0px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.11;filter:alpha(opacity=11);margin-top:1px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.07;filter:alpha(opacity=7);margin-top:2px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.03;filter:alpha(opacity=3);margin-top:3px;"></div>' +
            '<div class="friend_list_body">' +
            '<div id="privacy_box_flist_data"></div></div>' +
            '<div class="flist_shadow" style="opacity:0.03;filter:alpha(opacity=3);margin-top:-4px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.07;filter:alpha(opacity=7);margin-top:-3px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.11;filter:alpha(opacity=11);margin-top:-2px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.3;filter:alpha(opacity=30);margin-top:-1px;"></div>' +
            '<div class="flist_shadow" style="opacity:0.8;filter:alpha(opacity=80);margin-top:0px;background-color:#fff;width:476px;"></div>'
        );
        addEvent('privacy_box_list_tab', 'click', function() {
            t_filter_on(this, privacy_box_list_tabs);
            onListTabChange(false);
        });
        addEvent('privacy_box_list_selected_tab', 'click', function() {
            t_filter_on(this, privacy_box_list_tabs);
            onListTabChange(true);
        });
        btnSelectAll = ge('btn_select_all');
        addEvent(btnSelectAll, 'click', selectAll);

        saveListBox = new MessageBox({
            title: getLang('friends_create_list_title'),
            bodyStyle: '',
            width: '300px'
        });
        saveListBox.addButton({
            onClick: function() {
                if (isFunction(options.onPrivacySave))
                    options.onPrivacySave(privacyItem, getSelectedFriends(), getSelectedFriendsInfo(pp_display_fr_count));

                saveListBox.hide(200);
            },
            style: 'button_no',
            label: getLang('friends_continue')
        }).addButton({
            onClick: saveFriendsList,
            label: getLang('friends_create_list')
        });
        saveListBox.content(getLang('friends_you_can_save_this_list') + '<div style="margin: 18px 0px 3px 0px; text-align:center"><input id="privacy_box_flist_name" type="text" placeholder="' + getLang('friends_enter_list_name') + '" class="inputText" style="width: 180px;font-size:12px"/></div>');
        addEvent('privacy_box_flist_name', 'keydown', function(e) {
            if (e.keyCode == KEY.RETURN) saveFriendsList.call(this, e);
        });
    }

    function showFriendsFilter(offset) {
        var flist = ge('privacy_box_flist_data');
        if (!filteredItems.length) {
            if (tabListSelected && !filterQuery)
                flist.innerHTML = "<div class='flist_empty'>" + getLang('friends_no_user_selected') + "</div>";
            else
                flist.innerHTML = '<div class="flist_empty">' + getLang('friends_nothing_found_by_query').replace('{query}', replaceChars(filterQuery)) + '</div>';
            return;
        }
        var html = "";
        for (var i = offset; i < filteredItems.length; i++) {
            html += listRow(filteredItems[i][0], highlight(filteredItems[i][1], filterQuery), filteredItems[i][2], selectedFriends[filteredItems[i][0]] == 1);
            if (i == 11) {
                break;
            }
            if (i && ((i % 60) == 59) && (i != filteredItems.length - 1)) {
                html += "<span><div class='flist_more clear'><a onclick=\"this.parentNode.parentNode.innerHTML='';showFriendsFilter(" + (i + 1) + ");return false;\">" + getLang('friends_show_more_friends') + " &raquo;</div></span>";
                break;
            }
        }
        if (i == filteredItems.length && !browser.msie6) {
            html += '<div style="clear: left; float: left; height: 1px; position: relative;">';
        }
        if (!offset) {
            flist.innerHTML = html;
            setTimeout(function() {
                showFriendsFilter(12);
            }, 0);
        } else {
            flist.innerHTML += html;
        }
    }

    function selectAll() {
        selectedCount = 0;
        selectedFriends = [];
        if (btnSelectAll.clicked) {
            btnSelectAll.clicked = false;
            btnSelectAll.innerHTML = getLang('friends_select_all');
        } else {
            btnSelectAll.clicked = true;
            btnSelectAll.innerHTML = getLang('friends_remove_selection');
            for (var i in friendsData.friends) {
                selectedFriends[friendsData.friends[i][0]] = 1;
                selectedCount++;
            }
            if (tabListSelected) {
                onListTabChange(1);
            }
        }
        ge('privacy_box_list_selected_count').innerHTML = selectedCount;
        friendsFilter.setPage(0);
        return false;
    }

    function onListTabChange(showSelected) {
        ge('privacy_box_friend_list_lookup').value = '';
        placeholderSetup('privacy_box_friend_list_lookup');
        if (showSelected) {
            var selectedItems = [];
            tabListSelected = 1;
            for (var i in selectedFriends) {
                selectedItems.push(i);
            }
            friendsFilter.filterData(selectedItems);
        } else {
            tabListSelected = 0;
            friendsFilter.filterData(false);
        }
        friendsFilter.setPage(0);
    }

    function savePrivacy() {
        if (selectedCount == 0)
            return;

        privacyBox.hide(200);
        if (options.saveList && options.saveListMinUsers <= selectedCount)
            saveListBox.show();
        else if (isFunction(options.onPrivacySave))
            options.onPrivacySave(privacyItem, getSelectedFriends(), getSelectedFriendsInfo(pp_display_fr_count));
    }

    function saveFriendsList() {
        if (saving_list) {
            return;
        }
        saving_list = true;
        var input = ge('privacy_box_flist_name'),
            listName = input.active ? input.value : '',
            friendsIds = getSelectedFriends();
        Ajax.Post({
            url: 'friends_ajax.php',
            query: {
                act: 'save_list',
                name: listName,
                friends: friendsIds.join(','),
                hash: friendsData.hash
            },
            onDone: function(ajaxObj, responseText) {
                var result = eval('(' + responseText + ')');
                if (result.error) {
                    alert(result.error);
                } else {
                    saveListBox.hide(200);
                    if (isFunction(options.onPrivacySave))
                        options.onPrivacySave(privacyItem, friendsIds, getSelectedFriendsInfo(pp_display_fr_count), result.cat_id, result.cat_name);
                }
                saving_list = false;
            }
        });
    }

    function getSelectedFriendsInfo(maxCount) {
        var result = [],
            i, j = 0,
            href, friend,
            count = Math.min(maxCount, selectedCount);
        for (i in selectedFriends) {
            j++;
            if (j > count) break;
            friend = friendsData.friends[friendsIndex[i]];
            href = friend[4] ? "http://" + friend[4] + ".vkontakte.ru" : base_domain + "id" + friend[0];
            result.push('<a href="' + href + '">' + friend[1] + '</a>');
        }
        return result;
    }

    function getSelectedFriends() {
        var friendsIds = [];
        for (var i in selectedFriends)
            friendsIds.push(i);
        return friendsIds;
    }

    function onFriendClick(obj, n) {
        if (hasClass(obj, 'flist_cell_on')) {
            obj.className = 'flist_cell_over';
            delete selectedFriends[n];
            selectedCount--;
        } else {
            obj.className = 'flist_cell_on';
            selectedFriends[n] = 1;
            selectedCount++;
        }
        ge('privacy_box_list_selected_count').innerHTML = selectedCount;
    }

    this.setOptions = function(newOptions) {
        if (typeof newOptions == 'object') {
            options = extend(options, newOptions);
        }
    }

    this.editPrivacy = function(item, selectedIds) {
        privacyItem = item; // itemX
        var flookup = ge('privacy_box_friend_list_lookup'),
            flname = ge('privacy_box_flist_name');
        flookup.value = flname.value = '';
        placeholderSetup(flookup);
        placeholderSetup(flname);
        ge('privacy_box_list_selected_count').innerHTML = 0;
        ge('privacy_box_list_tab').className = 't_filter_selected';
        ge('privacy_box_list_selected_tab').className = 't_filter_off';
        btnSelectAll.clicked = false;
        btnSelectAll.innerHTML = getLang('friends_select_all');
        selectedFriends = {};
        selectedCount = 0;

        if (friendsFilter == undefined) {
            friendsFilter = new FriendsFilter([], ge('privacy_box_friend_list_lookup'), {
                pages: false,
                onDataReady: function(matches, query) {
                    filteredItems = matches;
                    filterQuery = query;
                    showFriendsFilter(0);
                }
            });
        } else {
            onListTabChange(false);
        }
        var updateSelected = function() {
            if (!selectedIds || !selectedIds.length)
                return;
            var i, fi;
            for (i in selectedIds) {
                fi = friendsIndex[selectedIds[i]];
                if (fi == undefined)
                    continue;
                selectedFriends[selectedIds[i]] = 1;
                selectedCount++;
            }
            ge('privacy_box_list_selected_count').innerHTML = selectedCount;
        }
        if (friendsData == undefined) {
            ge('privacy_box_flist_data').innerHTML = '<div class="listProgress"><img src="http://vkontakte.ru/images/progress7.gif"></div></div>';
            Ajax.Post({
                url: 'friends_ajax.php',
                query: options.params,
                onDone: function(ajaxObj, responseText) {
                    friendsData = eval('(' + responseText + ')');
                    friendsFilter.setData(friendsData);
                    friendsIndex = {};
                    each(friendsData.friends, function(i, item) {
                        friendsIndex[item[0]] = i;
                    });
                    updateSelected();
                    friendsFilter.setPage(0);
                }
            });
        } else {
            updateSelected();
            friendsFilter.setPage(0);
        }
        privacyBox.show();
    }

    initBox();
    // Register global functions
    window.onFriendClick = onFriendClick;
    window.showFriendsFilter = showFriendsFilter;
    window.onListTabChange = onListTabChange;
};

function listRow(n, name, photo, state) {
    var current_state = state ? "_on" : "";
    return '<div onmouseout="flistOff(this)" onmousemove="flistOver(this)" onclick="onFriendClick(this,' + n + ')" class="flist_cell' + current_state + '" id="flist' + n + '"><div class="flist_border_wrap"><div class="flist_wrap">' +
        '<div class="flist_div">' +
        '<div class="flist_image">' +
        '<img src="' + photo + '"/>' +
        '</div>' +
        '</div>' +
        '<div class="flist_name">' + name + '</div>' +
        '</div></div></div>';
}


function highlight(s, sub) {
    if (typeof s != "string") return '';
    if (!sub || !sub.length) return s;
    sub = escapeRE(sub);
    var translate = parseLatin(sub),
        subs = translate == null ? [sub] : [sub, translate];
    each(subs, function() {
        var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + this + ")(?![^<>]*>)(?![^&;]+;)", "gi");
        s = s.replace(re, "<em>$1</em>");
    });
    return s;
}

function t_filter_on(obj, tabs) {
    if (!obj) return;
    for (var i = 0; i < tabs.length; i++) {
        if (obj.id == tabs[i]) {
            ge(tabs[i]).className = "t_filter_selected";
        } else {
            ge(tabs[i]).className = "t_filter_off";
        }
    }
}

function flistOver(obj) {
    if (!hasClass(obj, 'flist_cell_on'))
        obj.className = 'flist_cell_over';
}

function flistOff(obj) {
    if (!hasClass(obj, 'flist_cell_on'))
        obj.className = 'flist_cell';
}

function listOut(obj) {
    if (obj.className != 'side_filter_selected') {
        obj.className = 'side_filter';
    }
}

function listOver(obj) {
    if (obj.className != 'side_filter_selected') {
        obj.className = 'side_filter_over';
    }
}

var list_edit_box_list_tabs = ['list_edit_box_list_tab', 'list_edit_box_list_selected_tab'];
var privacy_box_list_tabs = ['privacy_box_list_tab', 'privacy_box_list_selected_tab'];