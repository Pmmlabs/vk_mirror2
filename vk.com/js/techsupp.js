var url = 'techsupp.php';

var progressLine = '<div style="padding:18px 0px 19px 0px;text-align: center"><img valign="middle" src="/images/progress7.gif"></div>';

///////////////////////////////////////// Working with AJAX #... params {
var params = new Object();

function set_default_params() {
    params['forum_id'] = ge('forum_id').innerHTML;
    params['leader'] = ge('leader').innerHTML;
    params['supporter'] = parseInt(ge('supporter').value);
    params['act'] = ge('cur_act').innerHTML;

    if ((params['act'] == 's') || (params['act'] == 'default')) {
        params['section_id'] = ge('section_id').innerHTML;
        params['parent_id'] = ge('parent_id').innerHTML;
        params['path'] = ge('path').innerHTML;
        if (parseInt(params['leader'])) {
            parse_subsections();
            document.onmouseup = function() {
                section_reorder_mouseup();
            }
            document.onmousemove = function(ev) {
                section_reorder_mousemove(ev);
            }
        }

        params['page'] = '';
        if (params['act'] == 's') {
            loc.on_location_changed = function(new_loc) {
                var old_page = params['page'];
                var page = new_loc.indexOf('page_');
                if (page != -1) {
                    params['page'] = new_loc.substr(5);
                } else {
                    params['page'] = '1';
                }
                if ((old_page != '') || (params['page'] != '1')) {
                    load_topics_page();
                }
            };
        }
    } else if (params['act'] == 'search') {
        params['page'] = '';
        params['count'] = ge('results_count').innerHTML;
        params['pages_count'] = ge('pages_count').innerHTML;
        params['per_page'] = ge('per_page').innerHTML;

        loc.on_location_changed = function(new_loc) {
            var old_page = params['page'];
            var page = new_loc.indexOf('page_');
            if (page != -1) {
                params['page'] = new_loc.substr(5);
                if (params['page'] == 'last') {
                    params['page'] = params['pages_count'];
                }
            } else {
                params['page'] = '1';
            }
            if ((old_page == '') && (params['page'] == '1')) {
                update_page_links();
            } else {
                load_search_page();
            }
        };
    } else if (params['act'] == 't') {
        params['page'] = '';
        params['count'] = ge('posts_count').innerHTML;
        params['per_page'] = ge('posts_per_page').innerHTML;
        params['pages_count'] = ge('pages_count').innerHTML;
        params['topic_id'] = ge('topic_id').innerHTML;
        params['path'] = ge('path').innerHTML;

        params['topic_closed'] = ge('topic_closed').innerHTML;
        if (parseInt(params['topic_closed'])) {
            if (ge('open_topic_button')) {
                ge('open_topic_button').style.display = 'inline';
            }
            ge('topic_closed_notification').style.display = 'block';
        } else {
            if (ge('close_topic_button')) {
                ge('close_topic_button').style.display = 'inline';
            }
        }

        params['topic_sticked'] = ge('topic_sticked').innerHTML;
        if (parseInt(params['topic_sticked'])) {
            if (ge('unstick_topic_button')) {
                ge('unstick_topic_button').style.display = 'inline';
            }
        } else {
            if (ge('stick_topic_button')) {
                ge('stick_topic_button').style.display = 'inline';
            }
        }

        loc.on_location_changed = function(new_loc) {
            var old_page = params['page'];
            var page = new_loc.indexOf('page_');
            if (page != -1) {
                params['page'] = new_loc.substr(5);
                if (params['page'] == 'last')
                    params['page'] = params['pages_count'];
            } else {
                params['page'] = '1';
            }
            if ((old_page == '') && (params['page'] == '1')) {
                update_page_links();
            } else {
                load_page();
            }
        };
    } else if ((params['act'] == 'na') || (params['act'] == 'nc')) {
        params['page'] = '';
        params['count'] = ge('results_count').innerHTML;
        params['pages_count'] = ge('pages_count').innerHTML;
        params['per_page'] = ge('per_page').innerHTML;

        loc.on_location_changed = function(new_loc) {
            var old_page = params['page'];
            var page = new_loc.indexOf('page_');
            if (page != -1) {
                params['page'] = new_loc.substr(5);
                if (params['page'] == 'last')
                    params['page'] = params['pages_count'];
            } else {
                params['page'] = '1';
            }
            if ((old_page == '') && (params['page'] == '1')) {
                update_page_links();
            } else {
                load_na_nc_page();
            }
        };
    } else if (params['act'] == 'na_filtered') {
        params['page'] = '';
        params['count'] = ge('results_count').innerHTML;
        params['pages_count'] = ge('pages_count').innerHTML;
        params['per_page'] = ge('per_page').innerHTML;

        loc.on_location_changed = function(new_loc) {
            var old_page = params['page'];
            var page = new_loc.indexOf('page_');
            if (page != -1) {
                params['page'] = new_loc.substr(5);
                if (params['page'] == 'last') {
                    params['page'] = params['pages_count'];
                }
            } else {
                params['page'] = '1';
            }
            if ((old_page == '') && (params['page'] == '1')) {
                update_page_links();
            } else {
                load_na_filtered_page();
            }
        };

        if (!ge('filter_link')) {
            ge('results_header').innerHTML = "<a style='float: right; margin-top: 7px' id='filter_link' href='javascript: show_section_tree()'>������&#9660;</a>" + ge('results_header').innerHTML;
        }
    } else if (params['act'] == 'users_topics') {
        params['page'] = '';
        params['count'] = ge('results_count').innerHTML;
        params['pages_count'] = ge('pages_count').innerHTML;
        params['per_page'] = ge('per_page').innerHTML;

        loc.on_location_changed = function(new_loc) {
            var old_page = params['page'];
            var page = new_loc.indexOf('page_');
            if (page != -1) {
                params['page'] = new_loc.substr(5);
                if (params['page'] == 'last') {
                    params['page'] = params['pages_count'];
                }
            } else {
                params['page'] = '1';
            }
            if ((old_page == '') && (params['page'] == '1')) {
                update_page_links();
            } else {
                load_users_topics_page();
            }
        };
    }
}

window_on_load_s.push(set_default_params);

///////////////////////////////////////// Loading pages {
function load_topics_page() {
    var index = 0;
    if (params['page'] != 'last') {
        index = parseInt(params['page']);
    } else {
        index = 'last';
    }
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        ge('topics_body').innerHTML = text;
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_get_topics_page',
        'page': index,
        'perpage': 30,
        'section_id': params['section_id'],
        'p': params['path']
    });
}

function load_search_page() {
    index = parseInt(params['page']);
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        if (text != "flood_control") {
            ge('results_content').innerHTML = text;
            update_page_links();
        }
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_search_page',
        'page': index,
        'perpage': params['per_page'],
        'q': ge('query').innerHTML
    });
}

function load_na_nc_page() {
    index = parseInt(params['page']);
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        if (text != "flood_control") {
            ge('results_content').innerHTML = text;
            update_page_links();
        }
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_na_nc_page',
        'page': index,
        'perpage': params['per_page'],
        'not_answered': ge('not_answered').innerHTML
    });
}

function load_na_filtered_page() {
    index = parseInt(params['page']);
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        if (text != "flood_control") {
            ge('results_content').innerHTML = text;
            update_page_links();
        }
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_na_filtered_page',
        'page': index,
        'perpage': params['per_page']
    });
}

function load_users_topics_page() {
    index = parseInt(params['page']);
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        if (text != "flood_control") {
            ge('results_content').innerHTML = text;
            update_page_links();
        }
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_users_topics_page',
        'page': index,
        'perpage': params['per_page'],
        'mid': ge('member_id').innerHTML
    });
}

function load_page() {
    index = parseInt(params['page']);
    if (ge('loading_pages_up')) {
        ge('loading_pages_up').style.display = 'inline';
        ge('loading_pages_down').style.display = 'inline';
    }
    if (!index) {
        index = 1;
    }
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        ge('forum_posts').innerHTML = text;
        if (ge('loading_pages_up')) {
            ge('loading_pages_up').style.display = 'none';
            ge('loading_pages_down').style.display = 'none';
        }
        update_page_links();
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_get_page',
        'tid': parseInt(params['topic_id']),
        'page': index,
        'perpage': params['per_page']
    });
}

function update_page_links() {
    var cur_page = parseInt(params['page']),
        last_page = parseInt(params['pages_count']);

    var per_page = parseInt(params['per_page']);
    if (params['act'] == 't') {
        var first = (cur_page - 1) * per_page + 1;
        var last = first + per_page - 1;
        var count = parseInt(params['count']);
        if (last >= count) {
            last = count - 1;
        }

        ge('current_posts').innerHTML = '����';
    }

    if (last_page == 1) {
        return;
    }

    var from_page = (cur_page < 4) ? 1 : (cur_page - 2);
    var to_page = (cur_page > last_page - 3) ? last_page : (cur_page + 2);
    if (from_page > to_page) {
        from_page = to_page;
    }

    var links = '';
    if (cur_page > 3) {
        links += '<li><a href="javascript: loc.nav_to(\'page_1\')">&laquo;</a></li> ';
    }
    for (var i = from_page; i <= to_page; ++i) {
        if (i == cur_page) {
            links += '<li class="current">' + i + '</li> ';
        } else {
            links += '<li><a href="javascript: loc.nav_to(\'page_' + i + '\')">' + i + '</a></li> ';
        }
    }

    if (cur_page < last_page - 2) {
        links += '<li><a href="javascript: loc.nav_to(\'page_last\')">&raquo;</a></li>';
    } else {
        links = links.substr(0, links.length - 1);
    }

    if ((last_page == 1) && (cur_page == last_page)) {
        ge('page_links_up').innerHTML = '';
        ge('page_links_down').innerHTML = '';
    } else {
        ge('page_links_up').innerHTML = '<li><img style="display: none" id="loading_pages_up" src="/images/upload.gif"/></li>' + links;
        ge('page_links_down').innerHTML = '<li><img style="display: none" id="loading_pages_down" src="/images/upload.gif"/></li>' + links;
    }
}
///////////////////////////////////////// Loading pages }
///////////////////////////////////////// Working with AJAX #... params }

function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

///////////////////////////////////////// Help ajax function {
function ajax_handler(handler) {
    return function(obj, text) {
        if (text == 'error') {
            alert('Sorry, could not perform your request');
        } else {
            handler(text);
        }
    }
}
///////////////////////////////////////// Help ajax function }
///////////////////////////////////////// Working with right answer {
function expand_answer(id) { // In topic
    if (ge("post" + id + "text")) {
        ge("post" + id + "text").style.display = "block";
    }
    if (ge("post" + id + "expand")) {
        ge("post" + id + "expand").style.display = "none";
    }
}

function show_answer(id) { // In section
    ge("topic" + id + "answer").style.display = "block";

    ge("topic" + id + "answershow").style.display = "none";
    ge("topic" + id + "answerhide").style.display = "inline";
    ge("topic" + id + "answerlink").href = "javascript: hide_answer(" + id + ");";
}

function hide_answer(id) { // In section
    ge("topic" + id + "answer").style.display = "none";

    ge("topic" + id + "answershow").style.display = "inline";
    ge("topic" + id + "answerhide").style.display = "none";
    ge("topic" + id + "answerlink").href = "javascript: show_answer(" + id + ");";
}
///////////////////////////////////////// Working with right answer }
function load_similar() {
    if (trim(ge('title').value).length) {
        var ajax = new Ajax();
        ajax.onDone = ajax_handler(function(text) {
            if (text != "flood_control") {
                ge('similar_results').innerHTML = text;
            }
        });
        ajax.post('/' + url, {
            'fid': params['forum_id'],
            'act': 'a_search_page',
            'page': '1',
            'perpage': '20',
            'q': ge('title').value
        });
    } else {
        ge('similar_results').innerHTML = '';
    }
}
///////////////////////////////////////// Filtering not answered questions by sections {
function show_section_tree() {
    ge('filter_link').innerHTML = '������&#9650;';
    ge('filter_link').href = 'javascript: hide_section_tree()';
    ge('section_tree').style.display = 'block';
}

function hide_section_tree() {
    ge('filter_link').innerHTML = '������&#9660;';
    ge('filter_link').href = 'javascript: show_section_tree()';
    ge('section_tree').style.display = 'none';
}

function check_filter(section_id) {
    ge('filter' + section_id).className = 'forum_filter_checked';
    ge('filter' + section_id).href = 'javascript: uncheck_filter(' + section_id + ')';
    var filtered = ge('forum_filter').innerHTML.split(','),
        new_filtered = new Array();
    for (var i = 0, count = filtered.length; i < count; ++i) {
        if (parseInt(filtered[i]) != section_id) {
            new_filtered.push(filtered[i]);
        }
    }
    ge('forum_filter').innerHTML = new_filtered.join(',');
}

function uncheck_filter(section_id) {
    ge('filter' + section_id).className = 'forum_filter_unchecked';
    ge('filter' + section_id).href = 'javascript: check_filter(' + section_id + ')';
    var filtered = ge('forum_filter').innerHTML.split(',');
    for (var i = 0, count = filtered.length; i < count; ++i) {
        if (parseInt(filtered[i]) == section_id) {
            return;
        }
    }
    filtered.push(section_id);
    ge('forum_filter').innerHTML = filtered.join(',');
}

function save_filter() {
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        window.location.reload();
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_update_filter',
        'filter': ge('forum_filter').innerHTML
    });
}
///////////////////////////////////////// Filtering not answered questions by sections }
///////////////////////////////////////// Ban user {
function show_message_box(cls, msg) {
    ge('messageWrap').style.display = 'block';
    ge('messageWrap').innerHTML = '<div id="' + cls + '">' + msg + '</div>';
}

function banlist_page(page) {
    var ajax = new Ajax();
    ajax.onDone = function(obj, text) {
        ge('memberPages').innerHTML = text;
    }
    ajax.post('/' + url, {
        'act': 'a_banlist_page',
        'fid': params['forum_id'],
        'index': page
    });
    if (ge('loading_page_up')) {
        ge('loading_page_up').style.display = 'inline';
        ge('loading_page_down').style.display = 'inline';
    }
}

function ban_user() {
    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        var result = text.substr(0, 1);
        if (result == 'd') {
            show_message_box('error', '���� ������������ ��� ���� � ������.');
        } else if (result == 'g') {
            show_message_box('message', '������������ ������ ������� :)');
        } else if (result == 'f') {
            show_message_box('message', '������������ ������� � ��� ��� ��������� �������.');
        } else if (result == 'l') {
            show_message_box('error', '���� ������������ �������� �������������.');
            return;
        }
        ge('memberPages').innerHTML = text.substr(1);
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_ban_user',
        'page': ge('page').value,
        'comment': ge('comment').value,
        'hash': ge('hash').value,
        'do_delete': (ge('do_delete').checked ? 1 : 0)
    });
}

function unban_user(index) {
    var ajax = new Ajax();
    ge('memberOptions_' + index).innerHTML = '<img src="/images/upload.gif"/>';
    ajax.onDone = ajax_handler(function(text) {
        var result = text.substr(0, 1);
        if (result == 'n')
            show_message_box('error', '����� ������������ ���� � ������.');
        if (result == 'g')
            show_message_box('message', '������������ ������ �� ������.');
        ge('memberPages').innerHTML = text.substr(1);
    });
    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_remove_ban',
        'user_id': index,
        'hash': ge('hash' + index).value
    });
}

function commentshow(index) {
    ge('comment' + index).style.display = 'block';
    ge('commentshow' + index).style.display = 'none';
    ge('commenthide' + index).style.display = 'block';
    return false;
}

function commenthide(index) {
    ge('comment' + index).style.display = 'none';
    ge('commentshow' + index).style.display = 'block';
    ge('commenthide' + index).style.display = 'none';
    return false;
}
///////////////////////////////////////// Ban user }
///////////////////////////////////////// Topic Details {
function show_details(id) { // In section
    ge("topic" + id + "details").style.display = "block";
    ge("topic" + id + "details").innerHTML = '<div style="text-align: center; margin: 20px 0px"><img src="/images/progress7.gif"/></div>';

    var ajax = new Ajax();
    ajax.onDone = ajax_handler(function(text) {
        ge("topic" + id + "details").innerHTML = text;
    });

    ajax.post('/' + url, {
        'fid': params['forum_id'],
        'act': 'a_topic_details',
        'tid': id
    });

    ge("topic" + id + "detailsshow").style.display = "none";
    ge("topic" + id + "detailshide").style.display = "inline";
    ge("topic" + id + "detailslink").href = "javascript: hide_details(" + id + ");";
}

function hide_details(id) { // In section
    ge("topic" + id + "details").style.display = "none";

    ge("topic" + id + "detailsshow").style.display = "inline";
    ge("topic" + id + "detailshide").style.display = "none";
    ge("topic" + id + "detailslink").href = "javascript: show_details(" + id + ");";
}

///////////////////////////////////////// Topic Details }
///////////////////////////////////////// Editing autoanswers {
function showAutoAnswersBox(tid) {
    createBox();
    ge('boxTitle').innerHTML = '����������';
    str = "<div id='autoAnswers'><div id='answersTable'></div><div id='addAnswer'>";
    str += "<div><table style='margin-top:5px;margin-bottom:5px;' cellpadding=5><tbody><tr><td style='width:97px;'><input id='answerName' type='text' style='text-align:left; width:55px; padding: 2px 10px 0px;' value=''></td><td><a href='javascript:addAutoAnswer();'>��������</a></td></tr></tbody></table></div>";
    str += "<div><textarea style='width:300px;height:70px;margin-left:7px;margin-top:8px;' id='answerText'></textarea></div>";
    str += "</div></div>";
    ge('boxMessage').innerHTML = str;
    ge('button1Cont').style.display = 'none';
    ge('button2').innerHTML = "�������";
    ge('answerText').value = ge('quick_answer_' + tid).value;
    var ajax = new Ajax();
    ajax.onDone = getAutoAnswersSuccess;
    //ajax.onFail = opFailed;
    ajax.post('/techsupp.php', {
        'act': 'a_get_autoanswers',
        'fid': 1
    });
    ge('answersTable').innerHTML = progressLine;
    showBoxOld(function() {});
}

function showAutoAnswersInTopicBox(tid) {
    createBox();
    ge('boxTitle').innerHTML = '����������';
    str = "<div id='autoAnswers'><div id='answersTable'></div><div id='addAnswer'>";
    str += "<div><table style='margin-top:5px;margin-bottom:5px;' cellpadding=5><tbody><tr><td style='width:97px;'><input id='answerName' type='text' style='text-align:left; width:55px; padding: 2px 10px 0px;' value=''></td><td><a href='javascript:addAutoAnswer();'>��������</a></td></tr></tbody></table></div>";
    str += "<div><textarea style='width:300px;height:70px;margin-left:7px;margin-top:8px;' id='answerText'></textarea></div>";
    str += "</div></div>";
    ge('boxMessage').innerHTML = str;
    ge('button1Cont').style.display = 'none';
    ge('button2').innerHTML = "�������";
    ge('answerText').value = ge('post').value;
    var ajax = new Ajax();
    ajax.onDone = getAutoAnswersSuccess;
    //ajax.onFail = opFailed;
    ajax.post('/techsupp.php', {
        'act': 'a_get_autoanswers',
        'fid': 1
    });
    ge('answersTable').innerHTML = progressLine;
    showBoxOld(function() {});
}


function getAutoAnswersSuccess(ajaxObj, responseText) {
    try {
        json = eval("(" + responseText + ")");
    } catch (e) { /*opFailed2;*/
        return;
    };
    if (json && json.html) {
        ge('answersTable').innerHTML = json.html;
        //if (json.num) {ge('autocorrNum').innerHTML=json.num;}
    }
}

function addAutoAnswer() {
    var ajax = new Ajax();
    ajax.onDone = getAutoAnswersSuccess;
    //ajax.onFail = opFailed;
    answer_name = ge('answerName').value;
    answer_text = ge('answerText').value;
    if (answer_name && answer_text) {
        ajax.post('/techsupp.php', {
            'act': 'a_add_autoanswer',
            'fid': 1,
            'name': answer_name,
            'text': answer_text
        });
        ge('answersTable').innerHTML = progressLine;
    } else {
        alert("������� �������� � ����� ������.");
    }
}

function showAutoAnswer(answer_id, section) {
    var ajax = new Ajax();
    ajax.onDone = getOneAutoAnswerSuccess;
    //ajax.onFail = opFailed;
    ajax.post('/techsupp.php', {
        'act': 'a_get_autoanswer',
        'fid': 1,
        'answer_id': answer_id,
        'section': section
    });
}

function getOneAutoAnswerSuccess(ajaxObj, responseText) {
    try {
        json = eval("(" + responseText + ")");
    } catch (e) { /*opFailed2;*/
        return;
    };
    if (json && json.html) {
        text = json.html.replace(/&#092;/g, "\\");
        text = text.replace(/&lt;/g, "<");
        text = text.replace(/&gt;/g, ">");
        text = text.replace(/&quot;/g, "\"");
        text = text.replace(/<br>/g, "\n\n");
        ge('answerText').value = text;
    }
}

function deleteAutoAnswer(answer_id, section) {
    var ajax = new Ajax();
    ajax.onDone = getAutoAnswersSuccess;
    //ajax.onFail = opFailed;
    ajax.post('/techsupp.php', {
        'act': 'a_delete_autoanswer',
        'fid': 1,
        'answer_id': answer_id,
        'section': section
    });
    ge('answersTable').innerHTML = progressLine;
}

///////////////////////////////////////// Editing autoanswers }

function can_be_notified(value) {
    var ajax = new Ajax();
    ajax.post('/support.php', {
        l: ge('forum_id').innerHTML,
        act: 'a_change_notify',
        notify: value ? 1 : 0
    });
    if (value) {
        ge('can_be_notified').href = 'javascript: can_be_notified(0)';
        ge('can_be_notified').innerHTML = '��������� ���������';
    } else {
        ge('can_be_notified').href = 'javascript: can_be_notified(1)';
        ge('can_be_notified').innerHTML = '��������� ���������';
    }
}

function notify() {
    var users = [];
    var elems = ge('notifications');
    for (var i = 0; i < elems.options.length; ++i) {
        if (elems.options[i].selected) {
            users.push(elems.options[i].value);
        }
    }

    var ajax = new Ajax();
    ajax.onDone = function() {
        hide('notifyProgress');
        show('notifyLink');
        for (var i = 0; i < elems.options.length;) {
            if (users.indexOf(elems.options[i].value) != -1) {
                elems.remove(i);
            } else {
                ++i;
            }
        }
    }
    if (users.length) {
        hide('notifyLink');
        show('notifyProgress');
        users_str = users.join('_');
        ajax.post('support.php', {
            l: ge('forum_id').innerHTML,
            act: 'a_notify',
            topic_id: ge('topic_id').innerHTML,
            users: users_str
        });
    }
}