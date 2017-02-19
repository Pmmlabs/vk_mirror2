var startPos = -1;

function getPosInList(elem) {
    var nodes = ge('membersContainer').childNodes;
    var newpos = -1;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType == 3)
            continue;
        newpos++;
        if (nodes[i] == elem)
            break;
    }
    return newpos;
}
onSortBegin = function(elem) {
    startPos = getPosInList(elem);
    setStyle(elem, 'opacity', 0.8);
    this.sortHelper.style.background = 'white';
    this.sortHelper.style.marginBottom = "3px";
};
onSortEnd = function(elem) {
    setStyle(elem, 'opacity', 1);
    var newPos = getPosInList(elem);
    var mid = elem.id.match(/memRow(\d+)/);
    if (startPos != newPos && newPos >= 0 && mid[1]) {
        Ajax.Send('groups_ajax.php', {
            act: 'aorderofficers',
            id: mid[1],
            gid: groupId,
            oldpos: startPos,
            newpos: newPos
        });
    }
};

function sendRequest(mid, gid, act, hash, callback) {
    var el = ge('memRow' + mid);
    var actions = geByClass('actions', el);
    actions = actions[0];
    actions.innerHTML = '<img src="images/upload_mini.gif" />';
    Ajax.Send('groups_ajax.php', {
        act: act,
        gid: gid,
        id: mid,
        hash: hash
    }, function(ajaxObj, responseText) {
        var result = eval('(' + responseText + ')');
        if (result.result) {
            actions.innerHTML = result.result;
            animate(el, {
                backgroundColor: '#E7F1F9',
                borderColor: '#4C96D4'
            }, 800);
            setTimeout(function() {
                animate(el, {
                    backgroundColor: '#FFFFFF',
                    borderColor: '#D8DFEA'
                }, 3000);
            }, 3000);
        } else if (result.error) {
            actions.innerHTML = result.error || 'Server error.';
        }
        if (isFunction(callback)) {
            callback(responseText);
        }
    });
    return false;
}

function deleteMember(mid, gid, hash) {
    return sendRequest(mid, gid, 'a_delete_member', hash);
}

function approveMember(mid, gid, hash) {
    return sendRequest(mid, gid, 'a_approve_member', hash);
}

function declineMember(mid, gid, hash) {
    return sendRequest(mid, gid, 'a_decline_member', hash);
}

function cancelInvitation(mid, gid, hash) {
    return sendRequest(mid, gid, 'a_cancel_invitation', hash);
}


var officerBox;

function editOfficer(mid, gid, hash, name) {
    if (!officerBox) officerBox = new MessageBox({
        progress: 'officer_progress'
    });
    officerBox.setOptions({
        title: name
    });
    var position = ge('officerPosition' + mid);
    position = position ? position.innerHTML.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : '';
    officerBox.content('<table cellpadding="0"><tr><td valign="top" style="padding: 3px 15px 0px 15px">' + groups_enter_post + '<td><td valign="top"><input type="text" style="width: 182px" id="position" value="' + position + '"><br/><div style="margin-top: 2px"><input type="hidden" id="isAdmin"></div></td></tr></table>');
    var uiIsAdmin = new Checkbox(ge('isAdmin'), {
        width: 150,
        checked: ge('isAdmin' + mid).value,
        label: groups_group_admin
    });
    officerBox.removeButtons();
    officerBox.addButton({
        label: groups_cancel,
        style: 'button_no',
        onClick: officerBox.hide
    }).addButton({
        label: groups_edit,
        onClick: function() {
            var position = ge('position').value,
                admin = uiIsAdmin.val();
            position = position.replace(/'/g, "&#39;").replace(/>/g, "&rt;").replace(/</g, "&lt;");
            //officerBox.content('<div class="box_loader"></div>');
            show('officer_progress');
            Ajax.Send('groups_ajax.php', {
                act: 'a_edit_officer',
                id: mid,
                gid: gid,
                hash: hash,
                position: position,
                admin: admin
            }, function() {
                officerBox.hide();
                ge('officerPosition' + mid).innerHTML = position;
                ge('isAdmin' + mid).value = admin;
                hide('officer_progress');
            });

        }
    });
    officerBox.show();
    ge('position').focus();
    return false;
}

var appointMB;

function appointMember(mid, gid, hash, name) {
    if (!appointMB) appointMB = new MessageBox({
        progress: 'officer_progress'
    });
    appointMB.setOptions({
        title: name
    });
    appointMB.removeButtons().addButton({
        label: groups_cancel,
        style: 'button_no',
        onClick: appointMB.hide
    }).addButton({
        label: groups_assign,
        onClick: function() {
            var position = ge('position' + mid).value;
            var admin = uiIsAdmin.val();
            show('officer_progress');
            Ajax.Send('groups_ajax.php', {
                act: 'a_appoint_officer',
                id: mid,
                gid: gid,
                hash: hash,
                position: position,
                admin: admin
            }, {
                onSuccess: function(res, text) {
                    appointMB.hide();
                    hide('officer_progress');
                    ge('appointWrap' + mid).innerHTML = text;
                },
                onFail: function(res, text) {
                    hide('officer_progress');
                    ge('appointError').innerHTML = text;
                }
            });
        }
    });
    appointMB.content('<table cellpadding="0"><tr><td valign="top" style="padding: 3px 15px 0px 15px">' + groups_enter_post + '<td><td valign="top"><input type="text" style="width: 182px" id="position' + mid + '" value=""><br/><div style="margin-top: 2px"><input type="hidden" id="isAdminAppoint' + mid + '"></div></td></tr></table><div id="appointError"></div>').show();
    var uiIsAdmin = new Checkbox(ge('isAdminAppoint' + mid), {
        width: 150,
        checked: 0,
        label: groups_group_admin
    });

}

function dismissOfficer(mid, gid, hash) {
    AlertBox(groups_delete_manager, groups_sure_delete_manager, function() {
        sendRequest(mid, gid, 'a_dismiss_officer', hash);
    }, {
        boxType: 'CONFIRM'
    }).show();
    return false;
}

function unblockUser(mid, gid, hash) {
    return sendRequest(mid, gid, 'a_unblock_user', hash);
}