var startPos = -1;

function getPosInList(elem) {
    var nodes = ge('sortList').childNodes;
    var newpos = -1;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType == 3) {
            continue;
        }
        newpos++;
        if (nodes[i] == elem) {
            break;
        }
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
            ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progress7.gif"></div>';
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
        ge('boxMessage').innerHTML = '<div style="text-align: center"><img valign="middle" src="/images/progress7.gif"></div>';
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
    var mb = new MessageBox({
        title: groups_editing_link
    });
    mb.addButton({
        label: groups_cancel,
        style: 'button_no',
        onClick: function() {
            mb.hide();
        }
    });
    mb.addButton({
        label: groups_edit,
        onClick: function() {
            if (ge('position').value.length > 0) {
                var position = ge('position').value;
                Ajax.Post({
                    url: '/groups_ajax.php',
                    query: {
                        'act': 'aeditlink',
                        'id': link_id,
                        'gid': group_id,
                        'position': position
                    },
                    onDone: function() {
                        ge('pos' + link_id).innerHTML = ', ' + replaceChars(position);
                        ge('position' + link_id).value = position;
                        mb.hide();
                    }
                });
                mb.content('<div style="text-align: center"><img valign="middle" src="/images/progress7.gif"></div>');
            } else {
                ge('position').focus();
            }
        }
    });
    var text = ge('position' + link_id).value.replace(/'/g, "&#39;").replace(/^, /, '');
    mb.content('<table cellpadding="0"><tr><td valign="top" rowspan="2" style="padding-top: 5px">' + groups_enter_name + '<td><td valign="top"><input type="text" style="width: 182px" id="position" value="' + text + '"></td></tr></table>').show();
    ge('position').focus();
    return false;
}

function showDeleteLinkBox(link_id, group_id) {
    var mb = new MessageBox({
        title: groups_deleting_link
    });
    mb.addButton({
        label: groups_no,
        style: 'button_no',
        onClick: function() {
            mb.hide();
        }
    });
    mb.addButton({
        label: groups_yes,
        onClick: function() {
            Ajax.Post({
                url: '/groups_ajax.php',
                query: {
                    'act': 'adeletelink',
                    'id': link_id,
                    'gid': group_id
                },
                onDone: function() {
                    ge('link' + link_id).parentNode.removeChild(ge('link' + link_id));
                    mb.hide();
                }
            });
            mb.content('<div style="text-align: center"><img valign="middle" src="/images/progress7.gif"></div>');
        }
    });
    mb.content(groups_sure_delete_link).show();
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

    ge('friendtr' + id).style.display = "";
    toInvite--;
    if (toInvite == 0) {
        hide('toinvite');
    }
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
        'gid': gid
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

function unbanMember(uid, gid) {
    if (!window.groups_unbanned) {
        groups_unbanned = "������������ ������ �� ���-�����";
    }
    return doAjax(uid, gid, 'aunbanmember', '<b>' + groups_unbanned + '</b>', effects.fadeToDld);
}

function showAddOfficerBox(user_id, group_id, hash, success_style) {
    ge('boxTitle').innerHTML = groups_assigning_manager;
    ge('boxMessage').innerHTML = "<div id='addOfficerFormCont'><table cellpadding=0><tr><td valign=top rowspan=2 style='padding-top: 5px'>" + groups_enter_post + "<td><td valign=top><input type='text' style='width: 182px' id='position' name='position" + user_id + "'><br><div style='margin-top: 2px'><input style='margin: 1px 2px 0 0; padding: 0px;' type='checkbox' id='admin' name='admin" + user_id + "'>" + groups_group_admin + "</div></td></tr></table></div>";
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
            }
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
    if (window.$ah && $ah.onLoad && $ah.onLoad.pages) {
        var href = location.href;
        var matches = href.match(/gid=(\d+)/);
        if (matches) {
            window.group_id = parseInt(matches[1]);
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
                        offset: parseInt(o[0])
                    };
                }
            }
            $ah.useCache = false;
        }
    }
});

function switchTrigger(op) {
    ge('progr').style.display = "inline";
    ge('progr').style.visibility = "visible";
    getPageContent(0, 1, null, {
        act: 'getpages',
        gid: window.group_id,
        op: op
    });
}

function approvePage() {
    var memDiv = ge('memberPages');
    var group_id = parseInt(document.inviteFriends.gid.value);
    var params = {
        act: 'aapprove',
        gid: group_id
    };
    var n = 1;
    for (var i in memDiv.childNodes) {
        if (!memDiv.childNodes[i].id) continue;
        var id = memDiv.childNodes[i].id.match(/memberRow_(\d+)/);
        if (id) {
            params["ids[" + (n++) + "]"] = id[1];
        }
    }
    var ajax = new Ajax;
    ajax.onDone = function(ajaxObj, responseText) {
        switchTrigger(0);
    };
    ajax.post('groups_ajax.php', params);
}

function inviteFriends() {
    var group_id = parseInt(document.inviteFriends.gid.value);
    params = {
        act: 'ainvitefriends',
        gid: group_id
    };
    var inputs = document.inviteFriends.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (parseInt(inputs[i].name)) params[inputs[i].name] = 1;
    }

    Ajax.postWithCaptcha('groups_ajax.php', params, {
        onSuccess: function(ajaxObj, responseText) {
            ge('toinvitemembers').innerHTML = "";
            ge('toinvite').style.display = "none";
            switchTrigger(1);
        }
    });
}

function removeSearch(item_id, section, oid) {
    var el = ge('mod_action' + item_id);
    if (!el) return;
    var html = el.innerHTML;
    Ajax.Post({
        url: '/gsearch.php',
        query: {
            act: 'a_remove_search',
            section: section,
            item_id: item_id,
            oid: oid
        },
        onDone: function(res, text) {
            el.innerHTML = text;
        },
        onFail: function(res, text) {
            el.innerHTML = html;
        }
    });
    if (el.tagName != 'SPAN') {
        el.innerHTML = '<div style="margin:3px;text-align:center;"><img src="/images/upload.gif"/></div>';
    } else {
        el.innerHTML = '<img src="/images/upload.gif"/>';
    }
}

function restoreSearch(item_id, section, oid) {
    var el = ge('mod_action' + item_id);
    if (!el) return;
    var html = el.innerHTML;
    Ajax.Post({
        url: '/gsearch.php',
        query: {
            act: 'a_restore_search',
            section: section,
            item_id: item_id,
            oid: oid
        },
        onDone: function(res, text) {
            el.innerHTML = text;
        },
        onFail: function(res, text) {
            el.innerHTML = html;
        }
    });
    if (el.tagName != 'SPAN') {
        el.innerHTML = '<div style="margin:3px;text-align:center;"><img src="/images/upload.gif"/></div>';
    } else {
        el.innerHTML = '<img src="/images/upload.gif"/>';
    }
}

// Group tabs
var group_tab_masks = {
    'information': 0x000001,
    'members': 0x000002,
    'groupType': 0x000004,
    'admins': 0x000008,
    'groupEvents': 0x000010,
    'officers': 0x000020,
    'links': 0x000040,
    'applied': 0x000080,
    'photos': 0x000100,
    'topics': 0x000200,
    'wall': 0x000400,
    'albums': 0x000800,
    'videos': 0x001000,
    'audios': 0x002000,
    'recentNews': 0x004000,
    'voting': 0x008000,
    'apps': 0x010000,
    'friends_in': 0x020000,
    'recentNews_hd': 0x040000,
    'audios_hd': 0x080000,
    'microblog': 0x100000
}

function addFaveGroup(gid, hash) {
    ge('faveProgress').innerHTML = '<IMG SRC="images/upload.gif">';
    Ajax.Send('/fave.php', {
        'act': 'a_add_group',
        'gid': gid,
        hash: hash
    }, function(o, t) {
        ge('addToFaves').innerHTML = t;
    });
}

function deleteFaveGroup(gid, hash) {
    ge('faveProgress').innerHTML = '<IMG SRC="images/upload.gif">';
    Ajax.Send('/fave.php', {
        'act': 'a_delete_group',
        'gid': gid,
        hash: hash
    }, function(o, t) {
        ge('addToFaves').innerHTML = t;
    });
}

function collapseBox(id, container, reverse) {
    var box = ge(id);
    if (!box) return;

    var masks = group_tab_masks;
    var cookie_key = 'group_closed_tabs';

    var c = geByClass("c", box)[0];
    if (!c) return;
    var newClass = container.parentNode.className == "bOpen" ? "bShut" : "bOpen";
    if (slideToggle(c, 300, function() {
            if (reverse) id += '_hd';
            if (!masks[id]) return;
            var closed_tabs = parseInt(getCookie('remix' + cookie_key));
            var v = reverse ? !isVisible(c) : isVisible(c);
            if (v) {
                closed_tabs = isNaN(closed_tabs) ? 0 : closed_tabs & ~masks[id];
            } else {
                closed_tabs = isNaN(closed_tabs) ? masks[id] : closed_tabs | masks[id];
            }
            setCookie('remix' + cookie_key, closed_tabs, 360);
        })) {
        container.parentNode.className = newClass;
    }

    return false;
}


function quickReply(id, dopen, dclose, foca) {
    var box = ge(id);
    if (!box) return;
    var c = geByClass("r", box)[0];
    if (!c) return;
    if (!isVisible(c))
        slideDown(c, 200, function() {
            ge("reply_field").focus();
        });
    else
        slideUp(c, 200);
}


var entering = false;

function enterGroup(gid, hash) {
    if (entering) return;
    entering = true;
    var stop = function() {
        entering = false;
    };
    Ajax.postWithCaptcha('/groups_ajax.php', {
        act: 'a_enter',
        gid: gid,
        hash: hash
    }, {
        onSuccess: function(obj, text) {
            entering = false;
            if (text.substr(0, 1) == 'r') {
                location.replace(text.substr(1));
            }
        },
        onFail: stop,
        onCaptchaShow: stop
    });
}

function leaveGroup(gid, hash, text, enterHash) {
    var obj = ge('group_button_' + gid).childNodes[0];
    if (obj) {
        setTimeout(function() {
            obj.href = 'javascript: enterGroup(' + gid + ', \'' + enterHash + '\');';
            obj.innerHTML = text;
        }, 0);

        Ajax.postWithCaptcha('/al_public.php', {
            act: 'a_leave',
            al: 1,
            pid: gid,
            hash: hash
        }, {
            onSuccess: function(obj, text) {

            }
        });
    }
    return false;
}

var currentFocus = false;

function showGroupStatusBox() {
    var el = ge('status_field');
    if (currentFocus !== false) {
        hideReplyBox(currentFocus);
    }
    if (!el.show) {
        if (el.autosize) el.autosize.update();
        show('submit_status');
        el.show = true;
        currentFocus = -1;
    }
    return false;
}

function hideReplyBox(full_id) {
    if (browser.opera && browser.mobile) return;
    full_id = full_id || '';
    var status = (full_id == -1);
    var msg_id = status ? full_id : full_id.split('_')[1];
    if (status || !full_id) {
        var f = data(ge(status ? 'add_wall_media_link_status' : 'add_wall_media_link'), 'postFunc');
        if (f) return;
    }
    var el = ge(status ? 'status_field' : 'reply_field' + full_id);
    if (el.show) {
        if (!status) {
            ge('reply_to' + full_id).value = msg_id || 0;
            if (!full_id) show('media_options');
            hide('reply_to_title' + full_id);
            hide('post_status_title');
            if (full_id) {
                var reply_link = ge('reply_link' + full_id);
                if (reply_link) {
                    hide('replies_wrap' + full_id);
                    show(reply_link);
                }
                hide('post_submit' + full_id);
            }
            if (ge('reply_to_name')) ge('reply_to_name').innerHTML = '';
        } else {
            hide('submit_status');
        }
        setStyle(el, {
            height: 14
        });
        el.show = false;
        currentFocus = false;
    }
    return true;
}

var wallHistory = false;

function postGroupStatus(to_id, hash) {
    if (posting_on_wall) {
        return;
    }
    var l = ge('add_wall_media_link_status'),
        f = data(l, 'postFunc');
    if (f) {
        f();
        return;
    }

    var el = ge('status_field');
    var txt = isFunction(el.getValue) ? el.getValue() : el.value;
    if (!trim(txt).length) {
        if (!window.mentions_mod) el.focus();
        else triggerEvent(el, 'focus');
        return;
    }
    var type = ge('wall_type') ? ge('wall_type').value : 2;
    var reply_to = ge('group_status').value == 1 ? -1 : 0;
    var params = {
        act: 'a_post_wall',
        hash: decodehash(hash),
        message: txt,
        to_id: -to_id,
        reply_to: reply_to
    };
    Ajax.Send('wall.php', params, function(o, t) {
        var r = eval('(' + t + ')');
        wallHistory[0] = r.microblog;
        wallHistory[1] = r.wall;
        if (type == 2) {
            ge('status_top_box_wrap').innerHTML = wallHistory[0];
        } else {
            ge('status_top_box_wrap').innerHTML = wallHistory[1];
        }
        el.style.color = '#777';
        el.value = el.getAttribute('placeholder');
        el.active = 0;
        el.blur();
        if (window.mentions_mod) {
            var mention = data(el, 'mention');
            if (mention) {
                hide(mention.cont);
                show(el);
            }
        }
        hideReplyBox(currentFocus);
        setupReply();
    });
}

function setupReply() {
    each(geByClass('reply_message'), function(i, v) {
        placeholderSetup(v);
        if (!v.autosize) {
            v.autosize = new AutosizeMod(v, {
                minHeight: 30
            });
        }
    });
}

function AutosizeMod(ta, options) {
    if (ta == null) {
        return false;
    }
    // default options
    var defaults = {
        height: 0,
        minHeight: 0,
        padding: 0
    };
    // extend default options with user defined
    options = extend(defaults, options);

    var asHlp = ge('autosize_helpers'),
        helper;
    var oldValue, oldHeight;
    if (!asHlp) {
        asHlp = document.createElement('div');
        asHlp.id = 'autosize_helpers';
        setStyle(asHlp, {
            position: 'absolute',
            left: -10000,
            top: -10000
        });
        document.body.appendChild(asHlp);
    }
    helper = document.createElement('div');
    asHlp.appendChild(helper);
    helper.style.wordWrap = 'break-word';

    var minHeight = intval(options.minHeight) || intval(getStyle(ta, 'height'));
    var maxHeight = intval(options.height);
    var fontSize = intval(getStyle(ta, 'fontSize'));
    ta.style.overflow = 'hidden';
    var w = intval(getStyle(ta, 'width'));
    // fix for hidden textareas
    if (w < 1) {
        w = intval(getStyle(ta, 'width', false));
    }
    if (defaults.padding) w -= defaults.padding * 2;
    setStyle(helper, {
        width: w < 0 ? 0 : w,
        fontFamily: getStyle(ta, 'fontFamily'),
        fontSize: fontSize + 'px',
        lineHeight: getStyle(ta, 'lineHeight')
    })

    function updateSize(he) {
        return function(e) {
            var value = ta.value;
            oldHeight = getSize(ta, true)[1];
            if (he) {
                if (e.keyCode == 13 && !e.ctrlKey && !e.altKey) {
                    value += '\n';
                }
            }
            if (value == oldValue && he) {
                return;
            }
            oldValue = value;
            helper.innerHTML = trim(replaceChars(value)).replace(/<br>$/, '<br>&nbsp;');

            var newHeight = getSize(helper, true)[1] + 4;
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }
            if (maxHeight > 0 && newHeight > maxHeight) {
                newHeight = maxHeight;
                setStyle(ta, {
                    overflow: 'auto',
                    overflowX: 'hidden'
                });
            } else {
                setStyle(ta, {
                    overflowX: 'hidden'
                });
            }
            if (oldHeight != newHeight) {
                setStyle(ta, {
                    height: (oldHeight = newHeight)
                });
                if (options.onResize) options.onResize(newHeight);
            }
        }
    }
    addEvent(ta, 'keydown', updateSize(true));
    addEvent(ta, 'keypress', updateSize(true));
    addEvent(ta, 'keyup', updateSize(false));

    return {
        update: updateSize(false)
    }
}

function showDeleteBox(el) {
    el = ge(el);
    if (el.active) return;
    animate(el, {
        backgroundColor: '#C4D2E1'
    }, 200);
}

function hideDeleteBox(el) {
    el = ge(el);
    if (el.active) return;
    animate(el, {
        backgroundColor: '#FFFFFF'
    }, 200);
}

function activeDeleteBox(el) {
    el = ge(el);
    el.active = 1;
    animate(el, {
        backgroundColor: '#6B8DB1'
    }, 200);
}

function inactiveDeleteBox(el) {
    el = ge(el);
    el.active = 0;
    showDeleteBox(el);
}

function showReplyBox(full_id) {
    full_id = full_id || '';
    var el = ge('reply_field' + full_id);
    if (currentFocus !== false && currentFocus !== full_id) {
        hideReplyBox(currentFocus);
    }
    if (!el.show) {
        if (full_id) {
            var reply_link = ge('reply_link' + full_id);
            if (reply_link) {
                show('replies_wrap' + full_id);
                hide(reply_link);
            }
            show('post_submit' + full_id);
        }
        if (ge('reply_link' + full_id)) {
            el.focus();
        }
        if (el.autosize) {
            el.autosize.update();
        }
        el.show = true;
        currentFocus = full_id;
    }
    return false;
}

function postWall(to_id, hash, top_id, type) {
    var undefined;
    var full_id = top_id;

    var l = ge('add_wall_media_link'),
        f = data(l, 'postFunc');
    if (f) {
        f();
        return;
    }

    if (top_id && top_id.indexOf('_') != '_') {
        top_id = top_id.split('_');
        top_id = top_id[1];
    } else {
        full_id = top_id = '';
    }
    if (posting_on_wall) {
        return;
    }
    var el = ge('reply_field' + full_id);
    var txt = isFunction(el.getValue) ? el.getValue() : el.value;
    if (!trim(txt).length) {
        if (!window.mentions_mod) el.focus();
        else triggerEvent(el, 'focus');
        return;
    }
    posting_on_wall = true;
    hide('msg', 'msg_graffiti', 'msg_photo', 'msg_video', 'msg_audio');
    show('progr2');
    if (type === undefined) type = ge('wall_type') ? ge('wall_type').value : 0;

    var params = {
        act: 'a_post_wall',
        hash: decodehash(hash),
        message: txt,
        to_id: to_id,
        reply_to: (ge('reply_to' + full_id) || {}).value,
        top_id: top_id,
        type: type
    };
    if (full_id) {
        params.start_id = (ge('start_reply' + full_id) || {}).value;
    }
    var callback = function(o, t) {
        var r = eval('(' + t + ')');
        posting_on_wall = false;
        hide('post_status_title');
        hide('reply_to_title');
        if (ge('reply_to')) ge('reply_to').value = 0;
        hide('progr2');

        var ph = el.getAttribute('placeholder') || '';
        el.value = ph;
        if (ph) {
            el.style.color = '#777';
            el.active = 0;
            el.blur();
            if (window.mentions_mod) {
                var mention = data(el, 'mention');
                if (mention) {
                    hide(mention.cont);
                    show(el);
                }
            }
        }
        if (full_id) {
            var reply_link = ge('reply_link' + full_id);
            if (reply_link) {
                reply_link.parentNode.removeChild(reply_link);
            }
            hideReplyBox(full_id);
        }
        if (r.replies) {
            ge('replies' + full_id).innerHTML = r.replies;
            if (type == 2) {
                wallHistory[0] = ge('status_top_box_wrap').innerHTML;
                wallHistory[1] = false;
            } else {
                wallHistory[0] = false;
                wallHistory[1] = ge('status_top_box_wrap').innerHTML;
            }
        } else {
            wallHistory[1] = r.wall;
            ge('status_top_box_wrap').innerHTML = wallHistory[1];
        }
        setupReply();
    }
    var stop = function(obj, text) {
        hide('progr2');
        ge('reply_field' + full_id).focus();
        posting_on_wall = false;
    }
    var options = {
        onSuccess: callback,
        onFail: stop,
        onCaptchaShow: stop,
        onCaptchaHide: stop
    };
    Ajax.Send('wall.php', params, options);
}

var statusHistory = {};

function showGroupStatusHistory(gid, type, hash, offset) {
    Ajax.Send('wall.php', {
        act: 'a_get_wall',
        type: type,
        to_id: -gid,
        hash: hash,
        offset: offset
    }, function(o, t) {
        var res = eval('(' + t + ')');
        var d = document.createElement('div');
        d.innerHTML = res.html;
        var h = ge('status_box').innerHTML;
        if (!h) {
            ge('status_box').innerHTML = res.html;
        } else {
            res.html = h + res.html;
            ge('status_box').appendChild(d);
        }
        ge('status_history_link').innerHTML = res.next || '';
        if (type == 2) {
            wallHistory[0] = ge('status_top_box_wrap').innerHTML;
        } else {
            wallHistory[1] = ge('status_top_box_wrap').innerHTML;
        }
        setupReply();
    });
}

function highlightReply(el) {
    var e = ge(el);
    if (!e) return;
    animate(e, {
        backgroundColor: '#ECEFF3'
    }, 200, function() {
        setTimeout(function() {
            animate(e, {
                backgroundColor: '#FFF'
            }, 200);
        }, 1000);
    });
}

function showReply(to_id, reply_id, msg_id) {
    var k = 'wall_reply' + to_id + '_' + reply_id,
        r = ge(k);
    if (r) {
        highlightReply(r);
    } else {
        showReplies(to_id, msg_id, false, k);
    }
    return false;
}

function showReplies(to_id, msg_id, count, hl) {
    Ajax.Send('wall.php', {
        act: 'a_get_replies',
        msg_id: msg_id,
        to_id: to_id,
        count: count
    }, function(o, t) {
        var r = ge('replies' + to_id + '_' + msg_id);
        if (hl) {
            var n1 = document.getElementsByTagName('html')[0],
                n2 = document.getElementsByTagName('body')[0];
            var h = r.offsetHeight;
            r.innerHTML = t;
            var dh = r.offsetHeight - h;
            n1.scrollTop = intval(n1.scrollTop) + dh;
            n2.scrollTop = intval(n2.scrollTop) + dh;
            highlightReply(hl);
        } else {
            r.innerHTML = t;
        }
    });
}

function toWallComments(to_id, wall_hash, status_hash) {
    if (wallHistory === false) return false;
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
        return true;
    }
    if (window.AudioObject) {
        AudioObject.stop();
    }

    var onDone = function() {
        if (ge('reply_to')) ge('reply_to').value = 0;
        ge('wall_type').value = 1;
        ge('status_top_box_wrap').innerHTML = wallHistory[1];
        setupReply();
        ge('right_wall_link').innerHTML = '<a href="" onclick="cancelEvent(event);return toStatusBox(' + to_id + ', \'' + wall_hash + '\', \'' + status_hash + '\');return false;">' + getLang('group_to_group_posts') + '</a>';
    };
    if (!wallHistory[1]) {
        Ajax.Send('wall.php', {
            act: 'a_get_wall',
            type: 1,
            to_id: -to_id,
            hash: wall_hash,
            offset: 0
        }, function(o, t) {
            var res = eval('(' + t + ')');
            wallHistory[1] = res.html;
            onDone();
        })
    } else {
        onDone();
    }
    return false;
}

function toStatusBox(to_id, wall_hash, status_hash) {
    if (wallHistory === false) return false;
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
        return true;
    }
    if (window.AudioObject) {
        AudioObject.stop();
    }

    var onDone = function() {
        ge('wall_type').value = 2;
        if (ge('reply_to')) ge('reply_to').value = -1;
        ge('status_top_box_wrap').innerHTML = wallHistory[0];
        setupReply();
        ge('right_wall_link').innerHTML = '<a href="" onclick="cancelEvent(event);return toWallComments(' + to_id + ', \'' + wall_hash + '\', \'' + status_hash + '\');return false;">' + getLang('groups_to_all_posts') + '</a>';
    };
    if (!wallHistory[0]) {
        Ajax.Send('wall.php', {
            act: 'a_get_wall',
            type: 2,
            to_id: -to_id,
            hash: status_hash,
            offset: 0
        }, function(o, t) {
            var res = eval('(' + t + ')');
            wallHistory[0] = res.html;
            onDone();
        })
    } else {
        onDone();
    }
    return false;
}

restoreCache = {};

function deleteStatus(cid, oid, hash) {
    var full_id = oid + '_' + cid;
    Ajax.Send('/wall.php', {
            act: 'a_delete',
            oid: oid,
            cid: cid,
            hash: hash
        },
        function(o, t) {
            restoreCache[full_id] = ge('status' + cid).innerHTML;
            ge('status' + cid).innerHTML = t;
        }
    );
}

function replyTo(reply_id, msg_id, to_id, to_href, to_name, top_id) {
    cancelEvent(window.event);
    var full_id = top_id ? (to_id + '_' + top_id) : '';
    ge('reply_to' + full_id).value = msg_id;
    if (!full_id) hide('media_options');
    //if (!full_id) {
    ge('reply_to_name' + full_id).innerHTML = '<a href="' + to_href + '">' + to_name + '</a>';
    //if (!isVisible('reply_to_title')) slideDown('reply_to_title', 50);
    show('reply_to_title' + full_id);
    hide('post_status_title');
    //}
    show('reply_field' + full_id);
    ge('reply_field' + full_id).focus();
}

onDomReady(function() {
    wallHistory = [];
    var el = ge('reply_field');
    if (el) {
        el.value = '';
        placeholderSetup(el);
        el.autosize = new AutosizeMod(el, {
            minHeight: 30
        });
        if (window.initMentions) initMentions(el);
    }
    el = ge('status_field');
    if (el) {
        el.value = '';
        placeholderSetup(el);
        el.autosize = new AutosizeMod(el, {
            minHeight: 30
        });
        if (window.initMentions) initMentions(el);
    }

    addEvent(document, 'click', function(e) {
        if (window._message_box_shown) return;
        var el = e.target;
        var id = el.id;
        if (currentFocus !== false && !hasClass(el, 'reply_link') && id != 'reply_field' + currentFocus && id != 'status_field' && el.className != 'replyToLink') {
            hideReplyBox(currentFocus);
        }
    });
    if (ge('wall_preload') && ge('wall_preload').innerHTML) {
        var sd = ge('wall_default');
        if (sd && sd.value == 1) {
            wallHistory[1] = ge('status_top_box_wrap').innerHTML;
            wallHistory[0] = ge('wall_preload').innerHTML;
        } else {
            wallHistory[0] = ge('status_top_box_wrap').innerHTML;
            wallHistory[1] = ge('wall_preload').innerHTML;
        }
        ge('wall_preload').innerHTML = '';
    }

    setupReply();
});

function officersInGroup(gid, tabbed) {
    var mb;
    if (tabbed) {
        mb = new TabbedBox('officers', [
            ['officers', getLang('groups_officers')],
            ['admins', getLang('groups_admins')]
        ], {
            title: getLang('groups_officers_of_group'),
            tabStyle: 'height: 310px;',
            width: 478,
            onTab: function(tab, loaded) {
                if (!loaded) {
                    mb.tabLoadContent(tab, '/groups.php', {
                        act: 'a_get_officers_in_group',
                        tab: tab,
                        gid: gid
                    }, false, 'height: 300px;').show();
                    return false;
                }
            }
        });
        mb.addButton({
            label: getLang('box_close'),
            onClick: function() {
                mb.hide(200);
            }
        });
        mb.loadTab('officers').show();
    } else {
        mb = new MessageBox({
            title: getLang('groups_admins_of_group'),
            width: 478,
            bodyStyle: 'padding: 0; height: 310px;'
        });
        mb.addButton({
            label: getLang('box_close'),
            onClick: function() {
                mb.hide(200);
            }
        });
        mb.loadContent('/groups.php', {
            act: 'a_get_officers_in_group',
            tab: 'admins',
            gid: gid
        }, false, 'height:300px;').show();
    }
}

function cantEnterGroup() {
    mb = new AlertBox(getLang('groups_limit_title'), getLang('groups_limit_message'));
    mb.show();
}

// from ui_controls

function AutosizeMod(ta, options) {
    if (ta == null) {
        return false;
    }
    // default options
    var defaults = {
        height: 0,
        minHeight: 0,
        padding: 0
    };
    // extend default options with user defined
    options = extend(defaults, options);

    var asHlp = ge('autosize_helpers'),
        helper;
    var oldValue, oldHeight;
    if (!asHlp) {
        asHlp = document.createElement('div');
        asHlp.id = 'autosize_helpers';
        setStyle(asHlp, {
            position: 'absolute',
            left: -10000,
            top: -10000
        });
        document.body.appendChild(asHlp);
    }
    helper = document.createElement('div');
    asHlp.appendChild(helper);
    helper.style.wordWrap = 'break-word';

    var minHeight = intval(options.minHeight) || intval(getStyle(ta, 'height'));
    var maxHeight = intval(options.height);
    var fontSize = intval(getStyle(ta, 'fontSize'));
    ta.style.overflow = 'hidden';
    var w = intval(getStyle(ta, 'width'));
    // fix for hidden textareas
    if (w < 1) {
        w = intval(getStyle(ta, 'width', false));
    }
    if (defaults.padding) w -= defaults.padding * 2;
    setStyle(helper, {
        width: w < 0 ? 0 : w,
        fontFamily: getStyle(ta, 'fontFamily'),
        fontSize: fontSize + 'px',
        lineHeight: getStyle(ta, 'lineHeight')
    })

    function updateSize(he) {
        return function(e) {
            var value = ta.value;
            oldHeight = getSize(ta, true)[1];
            if (he) {
                if (e.keyCode == 13 && !e.ctrlKey && !e.altKey) {
                    value += '\n';
                }
            }
            if (value == oldValue && he) {
                return;
            }
            oldValue = value;
            helper.innerHTML = trim(replaceChars(value)).replace(/<br>$/, '<br>&nbsp;');

            var newHeight = getSize(helper, true)[1] + 4;
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }
            if (maxHeight > 0 && newHeight > maxHeight) {
                newHeight = maxHeight;
                setStyle(ta, {
                    overflow: 'auto',
                    overflowX: 'hidden'
                });
            } else {
                setStyle(ta, {
                    overflowX: 'hidden'
                });
            }
            if (oldHeight != newHeight) {
                setStyle(ta, {
                    height: (oldHeight = newHeight)
                });
                if (options.onResize) options.onResize(newHeight);
            }
        }
    }
    addEvent(ta, 'keydown', updateSize(true));
    addEvent(ta, 'keypress', updateSize(true));
    addEvent(ta, 'keyup', updateSize(false));

    return {
        update: updateSize(false)
    }
}