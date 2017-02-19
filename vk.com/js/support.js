var lang_id = 1;
onDomReady(function() {
    if (ge('lang_id')) {
        lang_id = ge('lang_id').value;
    } else if (ge('forum_id')) {
        lang_id = ge('forum_id').value ? ge('forum_id').value : ge('forum_id').innerHTML;
    }
});

var msgBox = null;

function showMessage(params) {
    var defaults = {
        title: '������',
        text: '��������� ������',
        close: '�������'
    };
    params = extend(defaults, params);
    if (!msgBox) {
        msgBox = new MessageBox({
            returnHidden: true
        });
        msgBox.addButton({
            label: params.close,
            style: 'button_no',
            onClick: function() {
                msgBox.hide();
            }
        });
    }
    msgBox.setOptions({
        title: params.title
    });
    msgBox.content(params.text);
    msgBox.show();
}

function failFunction(progress, handler) {
    return function() {
        showMessage({
            text: '�� ������� ����������� � ��������.'
        });
        hide(progress);
        if (isFunction(handler)) {
            handler();
        }
    }
}

function doneFunction(progress, handler) {
    return function(obj, text) {
        hide(progress);
        try {
            var response = eval('(' + text + ')');
        } catch (e) {
            showMessage({
                text: '��������� ����� �������: ' + text
            });
        }
        handler(response);
    }
}

function getSiblingsIds(elem) {
    var prev, next, el = elem;
    while (el.previousSibling) {
        prev = el = el.previousSibling;
        if (prev.nodeType != 3) {
            break;
        }
        prev = null;
    }
    el = elem;
    while (el.nextSibling) {
        next = el = el.nextSibling;
        if (next.nodeType != 3) {
            break;
        }
        next = null;
    }
    return [prev ? prev.id.match(/(\d+)/)[1] : 0, next ? next.id.match(/(\d+)/)[1] : 0];
}

var startSiblings = [0, 0];

function startEditMainTopics(topics) {
    ge('new_main_topic').blur();
    ge('new_main_topic').value = '';
    placeholderSetup('new_main_topic');
    ge('new_main_topic').focus();
    var container = ge('edit_main_topics');
    if (topics) {
        container.innerHTML = topics;
    }
    container.onSortBegin = function(elem) {
        startSiblings = getSiblingsIds(elem);
    }
    container.onSortEnd = function(elem) {
        var siblings = getSiblingsIds(elem);
        if (startSiblings[0] != siblings[0] || startSiblings[1] != siblings[1]) {
            var ajax = new Ajax();
            ajax.post('support.php', {
                l: lang_id,
                act: 'a_reorder_main_topics',
                topic_id: elem.id.match(/(\d+)/)[1],
                after: siblings[0],
                before: siblings[1]
            });
        }
    }
    sortable.makeSortable(container, sortable.DIR_BOTH);
}

function showAddMainTopicError(text) {
    show('add_main_topic_error');
    ge('add_main_topic_error').innerHTML = text;
}

function addMainTopic(page) {
    var ajax = new Ajax();
    ajax.onDone = doneFunction('edit_main_topic_progress', function(response) {
        if (response.error == -1) {
            showAddMainTopicError('��������� ������.');
            focusAtEnd('new_main_topic');
        } else if (response.error == 1) {
            showAddMainTopicError('��������� ������ �� ������. ��������, �� ��� ������.');
            ge('new_main_topic').value = '';
            focusAtEnd('new_main_topic');
        } else if (response.topics) {
            startEditMainTopics(response.topics);
        } else {
            showAddMainTopicError('����������� ������: ' + response.error);
        }
    });
    ajax.onFail = failFunction('edit_main_topic_progress', function() {
        focusAtEnd('new_main_topic');
    });
    show('edit_main_topic_progress');
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_add_main_topic',
        page: page,
        hash: ge('add_main_topic_hash').value
    });
}

function removeMainTopic(id) {
    var ajax = new Ajax();
    ajax.onDone = doneFunction('edit_main_topic_progress', function(response) {
        if (response.success) {
            ge('main_topic_text' + id).style.textDecoration = 'line-through';
            ge('main_topic_del_link' + id).href = 'javascript: restoreMainTopic(' + id + ')';
        } else {
            showMessage({
                text: '����������� ������: ' + response.error
            });
        }
    });
    ajax.onFail = failFunction('edit_main_topic_progress');
    show('edit_main_topic_progress');
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_remove_main_topic',
        topic_id: id,
        hash: ge('main_topic_hash' + id).value
    });
}

function restoreMainTopic(id) {
    var ajax = new Ajax();
    ajax.onDone = doneFunction('edit_main_topic_progress', function(response) {
        if (response.success) {
            ge('main_topic_text' + id).style.textDecoration = 'none';
            ge('main_topic_del_link' + id).href = 'javascript: removeMainTopic(' + id + ')';
        } else {
            showMessage({
                text: '����������� ������: ' + response.error
            });
        }
    });
    ajax.onFail = failFunction('edit_main_topic_progress');
    show('edit_main_topic_progress');
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_restore_main_topic',
        topic_id: id,
        hash: ge('main_topic_hash' + id).value
    });
}

function initMoveTopicSections(index, parent_id) {
    var container = ge('section_select'),
        elem = null;
    while (elem = ge('section_container' + index)) {
        container.removeChild(elem);
        ++index;
    }
    var next_section = document.createElement('div');
    next_section.id = 'section_container' + index;
    next_section.className = 'section_container';
    next_section.innerHTML = '<img id="section_progress' + index + '" src="images/progress7.gif" /></div>';
    container.appendChild(next_section);
    var ajax = new Ajax();
    ajax.onDone = doneFunction('section_progress' + index, function(response) {
        if (!response.error) {
            next_section.innerHTML = '<a id="move_topic_link' + index + '" href="javascript: moveTopic(ge(\'section' + index + '\').value)">���������</a><input id="section' + index + '" name="section' + index + '" />';
            var sections_json = [
                [0, ' - ��������� �� ������ - ']
            ];
            for (var i in response) {
                if (parseInt(response[i][1])) {
                    sections_json.push([i, response[i][0], '������ ������']);
                } else {
                    sections_json.push([i, response[i][0]]);
                }
            }
            sections_json.sort(function(a, b) {
                return a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0);
            });
            new Dropdown(ge('section' + index), sections_json, {
                onChange: function(value) {
                    value = parseInt(value);
                    if (value) {
                        show('move_topic_link' + index);
                        hide('move_topic_link' + (index - 1));
                        initMoveTopicSections(index + 1, value);
                    } else {
                        hide('move_topic_link' + index);
                        show('move_topic_link' + (index - 1));
                        var elem = null,
                            i = index + 1;
                        while (elem = ge('section_container' + i)) {
                            container.removeChild(elem);
                        }
                    }
                }
            });
        };
    });
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_get_sections',
        parent_id: parent_id
    });
}

var moveTopicBox = null;

function showMoveTopicBox(id) {
    if (!moveTopicBox) {
        moveTopicBox = new MessageBox({
            title: '����������� �������'
        });
        moveTopicBox.addButton({
            label: "�������",
            style: "button_no",
            onClick: function() {
                moveTopicBox.hide();
            }
        });
    }
    moveTopicBox.content('<div id="box_loader" class="box_loader"></div>');
    moveTopicBox.show();
    var ajax = new Ajax();
    ajax.onDone = doneFunction('box_loader', function(response) {
        moveTopicBox.content(response.box_content);
        initMoveTopicSections(0, 0);
    });
    ajax.onFail = failFunction('box_loader', function() {
        moveTopicBox.hide();
    });
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_move_topic_box',
        topic_id: id
    });
}

function moveTopic(parent_id) {
    var topic_id = ge('move_topic_id').value;
    var ajax = new Ajax();
    ajax.onDone = doneFunction('box_loader', function(response) {
        if (response.success) {
            if (ge('topic_parent' + topic_id)) {
                ge('topic_parent' + topic_id).innerHTML = response.title;
            }
        }
        moveTopicBox.hide();
    });
    ajax.onFail = failFunction('box_loader', function() {
        moveTopicBox.hide();
    });
    ajax.post('support.php', {
        l: lang_id,
        act: 'a_move_topic',
        topic_id: topic_id,
        section_id: parent_id,
        hash: ge('move_topic_hash').value
    });
    moveTopicBox.content('<div id="box_loader" class="box_loader"></div>');
}

function startNotifications() {
    new Checkbox(ge('notify'), {
        label: '��������� ���������',
        checked: ge('notify').value,
        width: 150,
        onChange: function() {
            (new Ajax()).post('support.php', {
                l: lang_id,
                act: 'a_change_notify',
                notify: ge('notify').value
            });
        }
    });
}

function sentNotifications() {
    ge('receivedTab').className = 'flatTab';
    ge('sentTab').className = 'flatTabOn';
    show('sentNotifications');
    hide('receivedNotifications');
    notificationsBox.setOptions({});
}

function receivedNotifications() {
    ge('receivedTab').className = 'flatTabOn';
    ge('sentTab').className = 'flatTab';
    hide('sentNotifications');
    show('receivedNotifications');
    notificationsBox.setOptions({});
}