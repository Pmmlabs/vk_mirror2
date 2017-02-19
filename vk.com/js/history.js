function prepareRequest() {
    var http_request = false;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('�訡�� ��� ᮧ����� XMLHTTP');
        return false;
    }
    return http_request;
}

function getHistory(mid, no_pagination) {
    var no_pages = '';
    http_request = prepareRequest();
    ge('progr').style.visibility = 'visible';
    ge('progr').style.display = 'inline';
    http_request.onreadystatechange = function() {
        showHistory(http_request);
    }
    http_request.open('POST', 'mail.php?act=history');
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
    if (no_pagination) {
        no_pages = "&offset=-1";
    }
    http_request.send('mid=' + mid + no_pages);
}

function showHistory(http_request) {
    var PickText, prevDiv;
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            PickText = http_request.responseText;
        } else {
            PickText = 'There was a problem with the request.';
        }
        var prevDiv = ge('historyContents');
        prevDiv.innerHTML = PickText;
    }
}

function show_del_all(vis) {
    var p = ge('del_all_link');
    if (p) {
        p.style.display = vis ? 'inline' : 'none';
    }
}

function show_del_link(type, id) {
    var old_visible = parseInt(ge('is_visible_' + type + '_' + id).value);
    if (old_visible == 0) {
        ge('is_visible_' + type + '_' + id).value = '1';
        if (!parseInt(ge('is_loading_' + type + '_' + id).value)) {
            if (parseInt(ge('is_deleted_' + type + '_' + id).value))
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_cancel;
            else
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_delete;
        }
    }
}

function hide_del_link(type, id) {
    var old_visible = parseInt(ge('is_visible_' + type + '_' + id).value);
    if (old_visible == 1) {
        ge('is_visible_' + type + '_' + id).value = '0';
        if (!parseInt(ge('is_loading_' + type + '_' + id).value))
            ge('a_del_links_' + type + '_' + id).innerHTML = '';
    }
}

function delete_all_messages(box_title, box_text, peer_id, hash) {
    if (!window.deleteAllMessagesBox) {
        window.deleteAllMessagesBox = new MessageBox({
            width: 400,
            bodyStyle: 'padding: 10px',
            closeButton: false,
            progress: 'deleteBoxProgress'
        });
    }
    window.deleteAllMessagesBox.removeButtons();
    window.deleteAllMessagesBox.addButton({
        label: global_cancel,
        style: 'button_no',
        onClick: function() {
            window.deleteAllMessagesBox.hide();
        }
    });
    window.deleteAllMessagesBox.addButton({
        label: global_delete,
        onClick: function() {
            if (isVisible('deleteBoxProgress')) {
                return false;
            }
            var ajax = new Ajax();
            ajax.onDone = function(resp, text) {
                var numb = (text == 'error') ? 4 : 3;
                window.deleteAllMessagesBox.hide();
                document.location = '/mail.php?r=-' + numb;
            }
            show('deleteBoxProgress');
            ajax.post('/mail.php', {
                'act': 'a_delete_all',
                'peer_id': peer_id,
                'hash': hash
            });
        }
    });

    window.deleteAllMessagesBox.setOptions({
        title: box_title
    });
    window.deleteAllMessagesBox.content(box_text).show();
}

function delete_message(type, id) {
    ge('del_links_' + type + '_' + id).innerHTML = '<img src="/images/upload.gif" />';
    ge('is_loading_' + type + '_' + id).value = '1';
    var outbox = parseInt(ge('is_out_' + type + '_' + id).value);
    var ajax = new Ajax();
    ajax.onDone = function(resp, text) {
        ge('is_loading_' + type + '_' + id).value = '0';

        if (text == "error") {
            alert(mail_delete_error);
            ge('del_links_' + type + '_' + id).innerHTML = '<a id="a_del_links_' + type + '_' + id + '" href="javascript: delete_message(\'' + type + '\', ' + id + ')"></a>';
            if (parseInt(ge('is_visible_' + type + '_' + id).value))
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_delete;
        } else {
            ge('message_' + type + '_' + id).className = "message_deleted";
            ge('del_links_' + type + '_' + id).innerHTML = '<a id="a_del_links_' + type + '_' + id + '" href="javascript: restore_message(\'' + type + '\', ' + id + ')"></a>';
            ge('is_deleted_' + type + '_' + id).value = '1';
            if (parseInt(ge('is_visible_' + type + '_' + id).value))
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_cancel;
        }
    }
    ajax.post('/mail.php', {
        'act': 'a_delete',
        'id': id,
        'out': outbox
    });
}

function restore_message(type, id) {
    ge('del_links_' + type + '_' + id).innerHTML = '<img src="/images/upload.gif" />';
    ge('is_loading_' + type + '_' + id).value = '1';
    var outbox = parseInt(ge('is_out_' + type + '_' + id).value);
    var ajax = new Ajax();
    ajax.onDone = function(resp, text) {
        ge('is_loading_' + type + '_' + id).value = '0';

        if (text == "error") {
            alert(mail_restore_error);
            ge('del_links_' + type + '_' + id).innerHTML = '<a id="a_del_links_' + type + '_' + id + '" href="javascript: restore_message(\'' + type + '\', ' + id + ')"></a>';
            if (parseInt(ge('is_visible_' + type + '_' + id).value))
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_cancel;
        } else {
            ge('message_' + type + '_' + id).className = "message_shown";
            ge('del_links_' + type + '_' + id).innerHTML = '<a id="a_del_links_' + type + '_' + id + '" href="javascript: delete_message(\'' + type + '\', ' + id + ')"></a>';
            ge('is_deleted_' + type + '_' + id).value = '0';
            if (parseInt(ge('is_visible_' + type + '_' + id).value))
                ge('a_del_links_' + type + '_' + id).innerHTML = mail_delete;
        }
    }
    ajax.post('/mail.php', {
        'act': 'a_restore',
        'id': id,
        'out': outbox
    });
}