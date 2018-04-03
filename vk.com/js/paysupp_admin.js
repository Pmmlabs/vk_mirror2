mode = 0;
_TabBoxMid = 0;
mb_list = '';
mb_decline = '';
curTab = 'groups';
progressLine = '<div style="padding:5px;text-align: left"><img valign="middle" src="/images/upload.gif"></div>';
rowsCount = 0;
cancelButtons = new Array();
var paysuppCache = {};
var openedRequests = 0;

window.onbeforeunload = beforeUnload;

function beforeUnload() {
    if (openedRequests) {
        return "���� ������������� ������, ���� �� ��������?";
    }
}

onDomReady(function() {
    //Omit script execution for 'tickets' section
    if (ge('appRows') == undefined) {
        return false;
    }

    rowsCount = ge('appRows').childElementCount;

    mb_decline = new MessageBox({
        title: '���������� ������'
    });

    mb_list = new TabbedBox(curTab, [
        ['groups', '������', '������ ������������'],
        ['friends', '������ ������������', '������'],
        ['payments', '����������', '���������� ������������'],
        ['names', '�����', '����� �����']
    ], {
        title: '���������� � ������������',
        width: 478,
        tabStyle: 'height:610px',
        onTab: function(tab, loaded) {
            if (!loaded) {
                if (tab == 'friends') {
                    var act = 'a_get_friends';
                } else if (tab == 'payments') {
                    var act = 'a_get_payments';
                } else if (tab == 'names') {
                    var act = 'a_get_names_history';
                } else {
                    var act = 'a_get_groups';
                }
                mb_list.tabLoadContent(tab, '/paysupp_admin.php', {
                    act: act,
                    mid: _TabBoxMid,
                    offset: 0
                }, true, 'height:610px;');
                return false;
            }
        }
    });

    mb_list.addButton({
        label: '�������',
        onClick: function() {
            mb_list.hide();
        }
    });

    onDone = function(obj, text) {
        openedRequests--;
        try {
            json = eval("(" + text + ")");
        } catch (e) {
            return;
        };
        if (json && json.html && mode != 1) {
            ge('result_' + json.tx_src + '_' + json.tx_id).innerHTML = "<div class='msg'>" + json.html + "</div>";
        }
    };

    onFail = function(obj, text) {
        openedRequests--;
        alert("������ ������� (" + text + ")");
    };

    var get = new String(window.location);
    if (get.indexOf("mode=1") != -1) {
        mode = 1;
    } else {
        mode = 0;
    }
});

function paysuppRowCountDecrement() {
    rowsCount--;
    if (rowsCount <= 0) {
        ge('noRows').style.display = 'block';
    }
}

function paysuppGetCardInfo(card) {
    showBox('cardInfo', '/paysupp_admin.php', {
        act: 'a_get_card_payments',
        card: card,
        offset: 0
    }, false, true, {
        title: '���������� �� �����',
        width: 600
    });
}

function getPaypalPayments(payerId) {
    showBox('paypalInfo', '/paysupp_admin.php', {
        act: 'a_get_paypal_account_payments',
        payer_id: payerId,
        offset: 0
    }, false, true, {
        title: '���������� �� �������� ' + payerId,
        width: 600
    });
}

function deleteTicket() {
    mb_confirm = new MessageBox({
        title: '�������� ������'
    });

    mb_confirm.addButton({
        label: '�������',
        onClick: function() {
            mb_confirm.hide();
        },
        style: 'button_no'
    });

    mb_confirm.addButton({
        label: '�������',
        onClick: function() {
            var onDeleteDone = function(obj, text) {
                try {
                    json = eval("(" + text + ")");
                } catch (e) {
                    return;
                };
                if (json && json.done) {
                    mb_confirm.content(json.done);
                    setTimeout(function() {
                        mb_confirm.hide();
                        window.location.href = 'paysupp_admin.php?act=tickets';
                    }, 1000);
                } else if (json && json.error) {
                    mb_confirm.content(json.error);
                    mb_confirm.removeButtons();
                    mb_confirm.addButton({
                        label: '�������',
                        onClick: function() {
                            mb_confirm.hide();
                        }
                    });
                }
            }
            var query = {
                act: 'a_delete',
                hash: ge('hash').value,
                tid: ge('tid').value
            };
            Ajax.Send('paysupp_admin.php', query, onDeleteDone);
        }
    });

    mb_confirm.content("������� ������?");
    mb_confirm.show();

}


function deleteMessage(msg_id) {
    mb_confirm = new MessageBox({
        title: '�������� ���������'
    });

    mb_confirm.addButton({
        label: '�������',
        onClick: function() {
            mb_confirm.hide();
        },
        style: 'button_no'
    });

    mb_confirm.addButton({
        label: '�������',
        onClick: function() {
            var onDeleteDone = function(obj, text) {
                try {
                    json = eval("(" + text + ")");
                } catch (e) {
                    return;
                };

                mb_confirm.removeButtons();
                mb_confirm.addButton({
                    label: '�������',
                    onClick: function() {
                        mb_confirm.hide();
                    }
                });

                if (json && json.done) {
                    mb_confirm.content(json.done);
                    hide(ge('msg_' + msg_id));
                    mb_confirm.hide();
                } else if (json && json.error) {
                    mb_confirm.content(json.error);
                }
            }
            var query = {
                act: 'a_delete',
                hash: ge('hash').value,
                tid: ge('tid').value,
                msg_id: msg_id
            };
            Ajax.Send('paysupp_admin.php', query, onDeleteDone);
        }
    });

    mb_confirm.content("������� ���������?");
    mb_confirm.show();

}


/* New tools */

selected_row_params = {};

function selectPaymentRow(obj) {
    var onDone = function(obj, text) {
        try {
            json = eval("(" + text + ")");
        } catch (e) {
            return;
        };

        if (json && json.html) {
            ge('member_select').innerHTML = json.html;
        }
        if (json && json.script) {
            json.script.eval();
        }

        new Checkbox(ge('close'), {
            width: 110,
            label: '������� ������',
            checked: 1,
            onChange: function(value) {

            }
        });
    }
    selected_row_params = {
        payment_source: obj.payment_source,
        payment_id: obj.payment_id,
        hash: obj.hash
    };
    var query = {
        act: 'a_show_transfer_form',
        mid: obj.mid,
        tid: ge('tid').value,
        type: obj.type,
        amount: obj.amount
    };
    Ajax.Send('paysupp_admin.php', query, onDone);
}


function makeTicketTransfer() {
    var onDone = function(obj, text) {
        try {
            json = eval("(" + text + ")");
        } catch (e) {
            return;
        };

        var mb_process_ticket = new MessageBox();
        mb_process_ticket.addButton({
            label: '�������',
            onClick: function() {
                mb_process_ticket.hide();
            }
        });

        if (json && json.error) {
            mb_process_ticket.setOptions({
                title: '������'
            });
            mb_process_ticket.content(json.error).show();
        } else if (json && json.html) {
            mb_process_ticket.setOptions({
                title: '������ ����������'
            });
            mb_process_ticket.content(json.html).show();
            paysuppSearchSubmit();
        }

        if (json && json.messages) {
            ge('messages_list').innerHTML = json.messages;
        }
    }

    var query = serializeForm(ge('transfer-form'));
    query['tid'] = ge('tid').value;
    query['hash'] = selected_row_params['hash'];
    query['payment_id'] = selected_row_params['payment_id'];
    query['payment_source'] = selected_row_params['payment_source'];

    Ajax.Send('paysupp_admin.php', query, onDone);
}

function overX(obj) {
    obj.className = 'iconXover';
}

function outX(obj) {
    obj.className = 'iconX';
}

function switchTab(name, act, options) {
    if (name == undefined) {
        name = 'members';
    }

    each(geByClass('t_filter_tab'), function(i, el) {
        if (el.id != 'tab_' + name) {
            removeClass(el, 't_filter_selected');
            addClass(el, 't_filter_off');
        } else {
            addClass(el, 't_filter_selected');
            removeClass(el, 't_filter_off');
        }
    });

    var onDone = function(obj, text) {
        try {
            json = eval("(" + text + ")");
        } catch (e) {
            return;
        };

        if (json && json.objects) {
            ge('searchResults').innerHTML = json.objects;
            if (options.onload) {
                options.onload(name);
            }
            if (json.pages) {
                try {
                    ge('choose_audio_pgtop').innerHTML = json.pages;
                } catch (e) {}
                try {
                    ge('choose_history_pgbot').innerHTML = json.pages;
                } catch (e) {}
            }
        }
    }

    location.hash = name;

    ge('searchResults').innerHTML = '<div style="text-align:center; margin:20px;"><img src="/images/progress7.gif" /></div>';

    if (options.query != undefined && options.query != '') {
        Ajax.Send('paysupp_admin.php', {
            act: act,
            filter: name,
            q: options.query
        }, onDone);
    } else {
        Ajax.Send('paysupp_admin.php', {
            act: act,
            filter: name
        }, onDone);
    }
}


function getPaymentsPage(obj, source) {
    var onDone = function(ajax_obj, text) {
        ge('table_' + source).innerHTML = text;
        hide(ge('choose_page_' + source + '_top'));
        hide(ge('choose_page_' + source + '_bottom'));
    };

    Ajax.Post({
        url: obj.href,
        onDone: onDone
    });
    show(ge('choose_page_' + source + '_top'));
    show(ge('choose_page_' + source + '_bottom'));
    return false;
}


function editCannedResponse(pid, oid, message) {
    if (!message) message = '';
    if (!window.resp_mb) {
        window.resp_mb = new MessageBox({
            title: '�������������� �������� ������'
        });
    }
    resp_mb.removeButtons().addButton({
        label: getLang('global_cancel'),
        style: 'button_no',
        onClick: resp_mb.hide
    });
    resp_mb.addButton({
        label: getLang('global_save'),
        onClick: function() {
            var message = ge('canned_message').value;
            if (!trim(message).length) return;
            var query = {
                act: 'a_save_response',
                pid: pid,
                oid: oid,
                message: message
            };
            Ajax.Send('paysupp_admin.php', query, function(obj, text) {
                if (text != 'ok') return;
                message = message.replace(/{id}/g, ge('sender_id').innerHTML).replace(/{name}/g, ge('sender_name').innerHTML);
                ge('message_content').value = message;
                resp_mb.hide();
            });
        }
    });
    resp_mb.content('{id} - ID �����������<br/>{name} - ��� �����������<br/><br/><textarea id="canned_message" style="width: 375px; height: 80px;">' + message + '</textarea>').show();
    ge('canned_message').focus();
    return false;
}

function paysuppTakeTicket() {
    var btn = ge('take_btn');
    lockButton(btn);

    query = {
        act: 'a_take_ticket',
        hash: ge('hash').value,
        tid: ge('tid').value
    };
    Ajax.Send(my, query, function(obj, text) {
        unlockButton(btn);
        try {
            json = eval("(" + text + ")");
        } catch (e) {
            return;
        };
        if (json && json.error) {
            mb.content(json.error);
            mb.show();
        } else if (json && json.messages) {
            ge('messages_list').innerHTML = json.messages;
        }
    });
    return false;
}