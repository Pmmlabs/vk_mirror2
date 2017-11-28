var startPos = -1;

function getPosInList(elem) {
    var nodes = ge('sortList').childNodes;
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
    elem.style.opacity = 0.8;
    elem.style.filter = "alpha(opacity=80)";
    this.sortHelper.style.background = 'white';
    this.sortHelper.style.marginBottom = "2px";
};
onSortEnd = function(elem) {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=100)";
    var newPos = getPosInList(elem);
    var ajax = new Ajax();
    ajax.onDone = function() {
        hide('progr');
    };
    var gidid = elem.innerHTML.match(/GID(\d+)ID(\d+)/);
    if (startPos != newPos && newPos >= 0 && gidid[1] && gidid[2]) {
        show('progr');
        ajax.post('/groups_ajax.php', {
            act: ge('reorderact').value,
            id: gidid[2],
            gid: gidid[1],
            oldpos: startPos,
            newpos: newPos
        });
    }
};

function showEditOfficerBox(user_id, group_id) {
    ge('boxTitle').innerHTML = ge('officer' + user_id + '_name').innerHTML;
    ge('boxMessage').innerHTML = "<table cellpadding=0><tr><td valign=top rowspan=2 style='padding-top: 5px'>" + groups_enter_post + "<td><td valign=top><input type='text' style='width: 182px' id='position' value='" + ge('position' + user_id).value.replace(/'/g, "&#39;") + "'><br><div style='margin-top: 2px'><input style='margin: 1px 2px 0 0; padding: 0px;' type='checkbox' id='admin' " + ge('is_admin' + user_id).value + ">" + groups_group_admin + "</div></td></tr></table>";
    ge('button1').innerHTML = groups_edit;
    ge('button2').innerHTML = groups_cancel;
    showBoxOld(function() {
        if (ge('position').value.length > 0) {
            var ajax = new Ajax();
            var position = ge('position').value;
            var admin = ge('admin').checked ? 1 : 0;
            var admin2 = ge('admin').checked ? "checked" : "";
            ajax.onDone = function() {
                ge('pos' + user_id).innerHTML = ', ' + position;
                ge('position' + user_id).value = position;
                ge('is_admin' + user_id).value = admin2;
                hideBoxOld();
            };
            ajax.post('/groups_ajax.php', {
                'act': 'aeditofficer',
                'id': user_id,
                'gid': group_id,
                'position': position,
                'admin': admin
            });
            ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progressbar.gif"></div>';
        } else {
            ge('position').focus();
        }
    });
    ge('position').focus();
    return false;
}

function showDeleteOfficerBox(user_id, group_id) {
    ge('boxTitle').innerHTML = groups_delete_manager;
    ge('boxMessage').innerHTML = groups_sure_delete_manager;
    ge('button1').innerHTML = groups_yes;
    ge('button2').innerHTML = groups_no;
    showBoxOld(function() {
        var ajax = new Ajax();
        ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progressbar.gif"></div>';
        ajax.onDone = function() {
            ge('officer' + user_id).parentNode.removeChild(ge('officer' + user_id));
            hideBoxOld();
        };
        ajax.post('/groups_ajax.php', {
            'act': 'adeleteofficer',
            'id': user_id,
            'gid': group_id
        });
    });
    return false;
}

function showEditLinkBox(link_id, group_id) {
    ge('boxTitle').innerHTML = groups_editing_link;
    ge('boxMessage').innerHTML = "<table cellpadding=0><tr><td valign=top rowspan=2 style='padding-top: 5px'>" + groups_enter_name + "<td><td valign=top><input type='text' style='width: 182px' id='position' value='" + ge('position' + link_id).value.replace(/'/g, "&#39;") + "'></td></tr></table>";
    ge('button1').innerHTML = groups_edit;
    ge('button2').innerHTML = groups_cancel;
    showBoxOld(function() {
        if (ge('position').value.length > 0) {
            var ajax = new Ajax();
            var position = ge('position').value;
            ajax.onDone = function() {
                ge('pos' + link_id).innerHTML = ', ' + position;
                ge('position' + link_id).value = position;
                hideBoxOld();
            };
            ajax.post('/groups_ajax.php', {
                'act': 'aeditlink',
                'id': link_id,
                'gid': group_id,
                'position': position
            });
            ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progressbar.gif"></div>';
        } else {
            ge('position').focus();
        }
    });
    ge('position').focus();
    return false;
}

function showDeleteLinkBox(link_id, group_id) {
    ge('boxTitle').innerHTML = groups_deleting_link;
    ge('boxMessage').innerHTML = groups_sure_delete_link;
    ge('button1').innerHTML = groups_yes;
    ge('button2').innerHTML = groups_no;
    showBoxOld(function() {
        var ajax = new Ajax();
        ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progressbar.gif"></div>';
        ajax.onDone = function() {
            ge('link' + link_id).parentNode.removeChild(ge('link' + link_id));
            hideBoxOld();
        };
        ajax.post('/groups_ajax.php', {
            'act': 'adeletelink',
            'id': link_id,
            'gid': group_id
        });
    });
}

var toInvite = 0;

function addToInvite(id) {
    show('toinvite');
    var node = document.createElement("DIV");
    node.id = "toinvite" + id;
    node.innerHTML = "<div class='mName'><a href='/id" + id + "'>" + ge("friend" + id).innerHTML + "</a></div><div class='mOption'><a href='#' onClick='return delToInvite(" + id + ");'>" + groups_cancel2 + "</a></div><input type='hidden' name='" + id + "' value='1'>";
    node.className = "mRow clearFix";
    ge('toinvitemembers').appendChild(node);
    hide('friendtr' + id);
    toInvite++;
    return false;
}

function delToInvite(id) {
    var node = ge('toinvite' + id);
    node.parentNode.removeChild(node);
    //ge('friendcheck'+ id).childNodes[0].checked = false;
    ge('friendtr' + id).style.display = "";
    toInvite--;
    if (toInvite == 0)
        hide('toinvite');
    return false;
}

function doAjax(uid, gid, act, message, fadefunc) {
    var ajax = new Ajax();
    ajax.onDone = function() {
        fadefunc(ge('memberRow_' + uid));
        ge('memberOptions_' + uid).innerHTML = message;
        setTimeout(function() {
            new effects.fader().fade(ge('memberRow_' + uid), [0xFFFFFF, 0xD8DFEA], 3000);
        }, 2500);
    };
    ge('memberOptions_' + uid).innerHTML = '<img style="overflow: hidden;" valign="middle" src="/images/upload_mini.gif"> ';
    ajax.post('/groups_ajax.php', {
        'act': act,
        'id': uid,
        'gid': gid,
        'e': 1
    });
    return false;
}

function approve(uid, gid) {
    return doAjax(uid, gid, 'aapprove', '<b>' + groups_partic_accepted + '</b>', effects.fadeToMsg);
}

function decline(uid, gid) {
    return doAjax(uid, gid, 'adecline', '<b>' + groups_appl_rejected + '</b>', effects.fadeToDld);
}

function deleteInvited(uid, gid) {
    return doAjax(uid, gid, 'adeleteinvited', '<b>' + groups_inv_cancelled + '</b>', effects.fadeToDld);
}

function deleteMember(uid, gid) {
    return doAjax(uid, gid, 'adeletemember', '<b>' + groups_partic_deleted + '</b>', effects.fadeToDld);
}

function showAddOfficerBox(user_id, group_id, hash, success_style) {
    ge('boxTitle').innerHTML = groups_assigning_manager;
    ge('boxMessage').innerHTML =
        "<div id='addOfficerFormCont'><table cellpadding=0><tr><td valign=top rowspan=2 style='padding-top: 5px'>" + groups_enter_post + "<td><td valign=top><input type='text' style='width: 182px' id='position' name='position" + user_id + "'><br><div style='margin-top: 2px'><input style='margin: 1px 2px 0 0; padding: 0px;' type='checkbox' id='admin' name='admin" + user_id + "'>" + groups_group_admin + "</div></td></tr></table></div>";
    ge('button1').innerHTML = groups_assign;
    ge('button2').innerHTML = groups_cancel;
    showBoxOld(function() {
        if (ge('position').value.length > 0) {
            ajax = new Ajax();
            ajax.onDone = function() {
                switch (success_style) {
                    case 2:
                        hideBoxOld(function() {
                            effects.fadeToMsg(ge('memberRow_' + user_id));
                            ge('memberOptions_' + user_id).innerHTML = "<b>" + groups_assigned + "</b>";
                            setTimeout(function() {
                                new effects.fader().fade(ge('memberRow_' + user_id), [0xFFFFFF, 0xD8DFEA], 3000);
                            }, 2500);
                        });
                        break;
                    case 1:
                    default:
                        hideBoxOld(function() {
                            location.href = '/groups.php?act=officers&gid=' + group_id + '&msg=1';
                        });
                }
            };
            ajax.post('/groups_ajax.php', {
                act: 'aappoint',
                id: user_id,
                gid: group_id,
                hash: hash,
                position: ge('position').value,
                admin: ge('admin').checked ? 1 : 0
            });
            ge('boxMessage').innerHTML = "<div style='text-align: center; height: 13px'><img valign='middle' src='images/progress7.gif'></div>";
        } else {
            ge('position').focus();
        }
    });
    return false;
}

onDomReady(function() {
    if (window.$ah) {
        var href = location.href;
        window.group_id = parseInt(href.match(/gid=(\d+)/)[1]);
        var defOp = (/act=banned/.test(href)) ? -1 : 2;
        $ah.onLoad['pages'].def.op = defOp;
        $ah.onLoad['pages'].show = {
            to: function(p) {
                return p.offset + "_" + p.op;
            },
            from: function(p) {
                var o = p.split("_");
                if (!o[1]) o[1] = defOp;
                return {
                    act: 'getpages',
                    gid: window.group_id,
                    op: parseInt(o[1]),
                    offset: parseInt(o[0]),
                    e: 1
                };
            }
        };
        $ah.useCache = false;
    }
});

function switchTrigger(op) {
    ge('progr').style.display = "inline";
    ge('progr').style.visibility = "visible";
    //pagination.ajaxPagesParams.op = op;
    getPageContent(0, 1, null, {
        act: 'getpages',
        gid: window.group_id,
        op: op,
        e: 1
    });
}
/*
function switchTrigger(op){
	var ajax = new Ajax;
	ajax.onDone = function (ajaxObj, responseText) {
		ge('membersPanel').innerHTML = responseText;
		ge('progr').style.display = "none";
	};
	ajax.onFail = function (ajaxObj, responseText) {};
	ge('progr').style.display = "inline";
	ge('progr').style.visibility = "visible";
	var group_id = parseInt(document.inviteFriends.gid.value);
	ajax.post('groups_ajax.php', {act:'getpagesfull', gid:group_id, op:op, e:1});
}
*/

function inviteFriends() {

    /*	var ajax = new Ajax;
    	ajax.onDone = function (ajaxObj, responseText) {
    		ge('toinvitemembers').innerHTML = "";
    		ge('toinvite').style.display = "none";
    		switchTrigger(1);
    	};
    	ajax.onFail = function (ajaxObj, responseText) {};
    */
    var group_id = parseInt(document.inviteFriends.gid.value);
    params = {
        act: 'ainvitefriends',
        gid: group_id,
        e: 1
    };
    var inputs = document.inviteFriends.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (parseInt(inputs[i].name)) params[inputs[i].name] = 1;
    }
    //ajax.post('groups_ajax.php', params);
    Ajax.postWithCaptcha('groups_ajax.php', params, {
        onSuccess: function(ajaxObj, responseText) {
            ge('toinvitemembers').innerHTML = "";
            ge('toinvite').style.display = "none";
            switchTrigger(1);
        }
    });
}