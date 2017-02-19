function updatePage(res) {
    selected_filter = res.filter;
    selectTab(res.filter);
    ge('searchResults').innerHTML = res.html;
    ge('searchSummary').innerHTML = res.summary;
    if (res.script) {
        eval(res.script);
    }
    hide('progressTop');
}

function loadGroups(filter) {
    show('progressTop');
    selectTab(filter);
    if (ge('g_filter'))
        ge('g_filter').setValue('');
    if (filter == 'publics') {
        hide('group_bottom_actions');
    } else {
        show('group_bottom_actions');
    }
    Ajax.Go({
        filter: filter
    });
}

function selectTab(selected_tab) {
    for (var i = 0; i < groups_tabs.length; i++) {
        tab = groups_tabs[i];
        if (tab == selected_tab) {
            ge('groups_' + tab + '_tab').className = 't_filter_selected';
        } else {
            ge('groups_' + tab + '_tab').className = 't_filter_off';
        }
    }
}

function prepareDefaultQuery() {
    var q = location.search.toString().substr(1).split('&');
    var result = {};
    for (var i = 0; i < q.length; ++i) {
        var pair = q[i].split('=');
        if (trim(pair[0])) {
            result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    return result;
}

Ajax.History('groups.php', prepareDefaultQuery(), updatePage);