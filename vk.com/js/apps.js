var inTop;

function prepareRequest() {

    var http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        //if (http_request.overrideMimeType) {
        // See note below about this line
        //}
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert("Error");
        return false;
    }

    return http_request;
}

function kotUrlEncode(s) {
    return s.replace('%', '%25', 'g').replace('&', '%26', 'g').replace('+', '%2B', 'g').replace('?', '%3F', 'g');
}

function unescapeFlashVar(s) {
    alert(s);
    return s.replace('%25', '%', 'g').replace('%26', '&', 'g').replace('%23', '#', 'g').replace('%3B', ';', 'g').replace('%0D', '\\n', 'g').replace('%27', '\'', 'g').replace('%22', '"', 'g');
}

function makeFRequest(url, n) {

    window.status = 'Загрузка...';

    http_request = prepareRequest();
    var seed = 'a';

    if (n == 3) {
        var seed = ge('reply_field').value;
        var hash = '&hash=' + ge('hash').value;
    }

    var mid = ge('id').value;

    http_request.onreadystatechange = function() {
        alertFContents(http_request, n);
    }
    http_request.open('POST', url);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
    http_request.send('seed=' + kotUrlEncode(seed) + '&mid=' + mid + '&n=' + n + hash);
}

function alertFContents(http_request, n) {
    var PickText, prevDiv;
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            PickText = http_request.responseText;
        } else {
            PickText = 'There was a problem with the request.';
        }
        var prevDiv = ge('allcomments');

        prevDiv.innerHTML = PickText;

        window.status = '';

    }
}

function paginationTop(page) {
    inTop = 1;
    // for(i=1;i<=2;i++){ge('page'+i).className = '';}
    // ge('page'+page).className = 'current';
    makeFRequest('apps.php?act=getcomms&page=' + page, 1);
}

function paginationBottom(page) {
    inTop = 0;
    // for(i=1;i<=2;i++){ge('page'+i).className = '';}
    // ge('page'+page).className = 'current';
    makeFRequest('apps.php?act=getcomms&page=' + page, 1);
}

function postIt() {
    //makeFRequest('apps.php?act=getcomms', 3);
    Ajax.postWithCaptcha('apps.php', {
        'act': 'getcomms',
        'hash': ge('hash').value,
        'n': 3,
        'seed': ge('reply_field').value,
        'mid': ge('id').value
    }, {
        onSuccess: postCommentSuccess,
        onFail: postCommentFail
    });
    window.status = 'Загрузка...';
    ge('reply_field').value = '';
}

function postCommentSuccess(ajaxObj, responseText) {
    var prevDiv = ge('allcomments');
    prevDiv.innerHTML = responseText;
    window.status = '';
}

function postCommentFail() {
    var prevDiv = ge('allcomments');
    prevDiv.innerHTML = "There was a problem with the request.";
    window.status = '';
}

function showComms() {
    show('allcomments');
    makeFRequest('apps.php?act=getcomms', 1);
    ge("showcommlink").innerHTML = "<a href='javascript: hideComms()'>" + app_comments_hidecomms + "</a>";
}

function hideComms() {
    ge('allcomments').style.display = 'none';
    ge("showcommlink").innerHTML = "<a href='javascript: showComms()'>" + app_comments_showcomms + "</a>";
}

function appRequest(parent, params) {
    Ajax.Send('apps.php', params, function(ajaxObj, responseText) {
        var response = eval("(" + responseText + ")");
        if (response.result) {
            parent.innerHTML = response.result;
            if (response.menu) {
                ge('nav').innerHTML = response.menu;
            }
        } else {
            alert('Error: ' + (response.error || 'unknown error'));
        }
        if (params.type == 1) {
            hide('linkRemoveApp' + params.id);
        }
    });
    return false;
}


function getSiblingsIds(elem) {
    var prev, next, el = elem;
    while (el.previousSibling) {
        prev = el = el.previousSibling;
        if (prev.nodeType != 3)
            break;
        prev = null;
    }
    el = elem;
    while (el.nextSibling) {
        next = el = el.nextSibling;
        if (next.nodeType != 3)
            break;
        next = null;
    }
    return [prev ? prev.id.match(/(\d+)/)[1] : 0, next ? next.id.match(/(\d+)/)[1] : 0];
}

function orderingInit(mid) {
    var container = ge('appRows');
    container.onSortBegin = function(elem) {
        setStyle(this.sortHelper, {
            backgroundColor: "#FFFFFF",
            marginLeft: 10,
            padding: 0,
            width: 605
        });
        if (!browser.msie) setStyle(this.sortHelper, {
            marginBottom: 5
        });
        startSiblings = getSiblingsIds(elem);
        //ge("editPopup").display = "none";
    }
    container.onSortEnd = function(elem) {
        var siblings = getSiblingsIds(elem);
        if (startSiblings[0] != siblings[0] || startSiblings[1] != siblings[1]) {
            var ajax = new Ajax();
            ajax.post(location.pathname, {
                act: 'a_save_ordering',
                aid: elem.id.match(/(\d+)/)[1],
                after: siblings[0],
                before: siblings[1],
                mid: mid
            });
        }
    }
    sortable.makeSortable(container, sortable.DIR_BOTH);
    each(container.childNodes, function(i, v) {
        if (v.id && v.style) {
            v.style.cursor = "move";
        }
    });
}

function createApp(form) {
    form = ge(form);
    var queryData = serializeForm(form);
    Ajax.postWithCaptcha('apps.php', queryData, {
        onSuccess: function(obj, text) {
            try {
                var result = eval('(' + text + ')');
                if (result.redirect) {
                    location.replace(result.redirect);
                } else if (result.error) {
                    ge('error').innerHTML = result.error;
                    show('error');
                }
            } catch (e) {
                ge('error').innerHTML = e.message;
                show('error');
            }
        }
    });
}


function disable_app(id) {
    ge('disable_' + id + '_href').href = '#';
    ge('disable_' + id + '_href').innerHTML = '<img src="images/upload.gif"/>';
    var ajax = new Ajax();
    ajax.onDone = function() {
        ge('disable_' + id + '_href').href = 'javascript: enable_app(' + id + ')';
        ge('disable_' + id + '_href').innerHTML = 'разблокировать';
    };
    ajax.post('apps.php', {
        'act': 'disable',
        'id': id
    });
}

function enable_app(id) {
    ge('disable_' + id + '_href').href = '#';
    ge('disable_' + id + '_href').innerHTML = '<img src="images/upload.gif"/>';
    var ajax = new Ajax();
    ajax.onDone = function() {
        ge('disable_' + id + '_href').href = 'javascript: disable_app(' + id + ')';
        ge('disable_' + id + '_href').innerHTML = 'заблокировать';
    };
    ajax.post('apps.php', {
        'act': 'enable',
        'id': id
    });
}


function join_app(app_id, hash) {
    Ajax.postWithCaptcha('apps.php?act=join', {
        id: app_id,
        hash: hash
    }, {
        onSuccess: function(o, t) {
            var res = eval('(' + t + ')');
            if (res.loc) {
                location.href = res.loc;
            } else {
                location.reload();
            }
        },
        onCaptchaShow: function(o, t) {

        },
        onCaptchaHide: function(o, t) {

        }
    });
}

function resetFilter() {
    var uf = ge('userFilter');
    uf.value = '';
    placeholderSetup(uf);
}

function getTransactions(offset, admin) {
    var query = {
        act: 'get_transactions',
        offset: offset,
        id: ge('app_id').value,
        admin: admin
    };
    var f = ge(admin ? 'adminFilter' : 'userFilter');
    if (f.active && f.value) {
        query.user_id = f.value;
    }
    Ajax.Post({
        url: 'apps.php',
        query: query,
        onDone: function(ajaxObj, responseText) {
            el = ge(admin ? 'adminPaymentsContent' : 'paymentsContent');
            el.innerHTML = responseText;
        }
    });
    return false;
}

// One function for deleting, reporting spam and restoring comments.
function changeComment(act, cid) {
    show('action_progress' + cid);
    var ajax = new Ajax(function(res, text) {
        hide('action_progress' + cid);
        var comment_node = ge('comm' + cid);
        if (isVisible(comment_node)) {
            var new_node = document.createElement('div');
            new_node.innerHTML = text;
            new_node.className = 'commentResult';
            comment_node.parentNode.insertBefore(new_node, comment_node);
            hide(comment_node);
        } else {
            comment_node.parentNode.removeChild(comment_node.previousSibling);
            show(comment_node);
        }
    }, function(res, text) {
        var comment_node = ge('comm' + cid);
        if (!isVisible(comment_node)) {
            show(comment_node);
        }
        text = text || 'Request error.';
        comment_node.innerHTML = '<div class="msg">' + text + '</div>';
    });
    ajax.post('/apps.php', {
        'act': act,
        'cid': cid
    });
}

function deleteComment(cid) {
    changeComment('a_delete_comment', cid);
}

function reportSpamComment(cid) {
    changeComment('a_spam_comment', cid);
}

function restoreComment(cid) {
    changeComment('a_restore_comment', cid);
}

function separator(comment) {
    var elem;
    for (elem = comment.nextSibling; elem.className != 'separator'; elem = elem.nextSibling) {}
    return elem;
}

var editing = 0;

function editComment(cid) {
    if (editing) {
        cancelEditComment(editing);
    }
    show('action_progress' + cid);
    var ajax = new Ajax();
    ajax.onDone = function(obj, text) {
        hide('action_progress' + cid);
        var comment = ge('comm' + cid);
        hide(geByClass('actions', comment)[0]);
        separator(comment).style.height = '2px';
        var commtext = geByClass('text', comment)[0];
        var width = (parseInt(getStyle(commtext, 'width')) + 1) + 'px';
        var margin_top = '-4px',
            margin_left = '-5px'; // For Firefox, IE, Safari.
        var padding_left = '';
        if (browser.chrome) {
            margin_left = '-4px';
        } else if (browser.safari) {
            padding_left = 'padding-left: 1px;';
        } else if (browser.opera) {
            margin_left = '-4px';
        } else if (browser.msie6) {
            margin_top = '-5px';
            margin_left = '-4px';
            width = (parseInt(width) - 4) + 'px';
        }
        commtext.innerHTML = '<textarea id="comment' + cid + 'edit" style="' + padding_left + 'width: ' + width + '; height: ' + commtext.offsetHeight + 'px; margin-top: ' + margin_top + '; margin-left: ' + margin_left + '; line-height: 14px; margin-bottom: 0px;" onkeydown="if (event.keyCode == 27) cancelEditComment(' + cid + '); else if (event.keyCode == 13 && event.ctrlKey) doEditComment(' + cid + ')">' + text + '</textarea>' +
            '<div style="margin-top: 5px; margin-left: ' + margin_left + '; height: 23px">' +
            '<ul class="nNav"><li style="margin-left: 0px">' +
            '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' +
            '<span class="ncc"><a href="javascript: doEditComment(' + cid + ')">' + apps_done + '</a></span>' +
            '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' +
            '</li><li>' +
            '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' +
            '<span class="ncc"><a href="javascript: cancelEditComment(' + cid + ')">' + apps_cancel + '</a></span>' +
            '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' +
            '</li></ul>' +
            '<div id="editCommentProgress' + cid + '" style="margin: 5px 0px 0px 10px; vertical-align: 0px; float: left; display: none"><img src="images/upload.gif"/></div>' +
            '</div>' +
            '<div id="comment' + cid + 'text" style="display: none">' + commtext.innerHTML + '</div>';
        var text = ge('comment' + cid + 'edit');
        new Autosize(text);
        setSelRange(text, text.value.length, text.value.length);
        editing = cid;
    };
    ajax.post('/apps.php', {
        'act': 'a_get_edit_comment',
        'cid': cid
    });
}

function cancelEditComment(cid) {
    editing = 0;
    var comment = ge('comm' + cid);
    show(geByClass('actions', comment)[0]);
    separator(comment).style.height = '15px';
    geByClass('text', comment)[0].innerHTML = ge('comment' + cid + 'text').innerHTML;
}

function doEditComment(cid) {
    if (!ge('comment' + cid + 'edit').value) {
        ge('comment' + cid + 'edit').focus();
        return;
    }
    show('editCommentProgress' + cid);
    var ajax = new Ajax(function(obj, text) {
        editing = 0;
        var comment = ge('comm' + cid);
        show(geByClass('actions', comment)[0]);
        separator(comment).style.height = '15px';
        geByClass('text', comment)[0].innerHTML = text;
    });
    ajax.post('/apps.php', {
        'act': 'a_edit_comment',
        'cid': cid,
        'comment': ge('comment' + cid + 'edit').value
    });
}

function deleteMerchant(id, hash) {
    hide(ge('ma' + id).getElementsByTagName('small')[0]);
    ge('ma' + id).innerHTML += '<img src="images/upload.gif"/>';
    var ajax = new Ajax(function(obj, text) {
        var ma = ge('ma' + id);
        ma.removeChild(ma.getElementsByTagName('img')[0]);
        hide('mb' + id);
        ge('mm' + id).innerHTML = text;
    });
    ajax.post('/merchants.php', {
        act: 'a_delete_merchant',
        id: id,
        hash: hash
    });
}

function restoreMerchant(id, hash) {
    ge('ma' + id).innerHTML += '<img src="images/upload.gif"/>';
    var ajax = new Ajax(function(obj, text) {
        var ma = ge('ma' + id);
        ma.removeChild(ma.getElementsByTagName('img')[0]);
        ge('mm' + id).innerHTML = '';
        show('mb' + id, ma.getElementsByTagName('small')[0]);
    });
    ajax.post('/merchants.php', {
        act: 'a_restore_merchant',
        id: id,
        hash: hash
    });
}