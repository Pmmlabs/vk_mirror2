var AdsModer = window.AdsModer || {};

AdsModer.openDomainCommentEditBox = function(domain, reload, buttons) {
    function onBoxHide() {
        delete cur.domainCommentEditBox;
    }

    var linked_note_id = undefined;
    var add_button = ge('ads_moder_domain_add_button');
    if (cur.linked_domain_notes) {
        linked_note_id = cur.linked_domain_notes[domain];
    }
    ajax.post('/adsmoder?act=a_get_domain_note', {
        domain: domain,
        note_id: linked_note_id
    }, {
        onDone: function(data) {
            var domainCommentTextParams = '';
            var info_string = '';
            if (data.exists) {
                info_string = '<div class="ads_premoderation_domain_info">����� <b>' + domain + '</b> � ��������� ��� �������������� ' + data.user + ' <b><nobr>' + data.update_time + '</nobr></b></div>';
            } else {
                info_string = '<div class="ads_premoderation_domain_info">����� <b>' + domain + '</b> ����� �� �������������</b></div>';
            }
            var comment_box;
            var box_title;
            if (data.allow_edit) {
                comment_box = ' <textarea id="ads_domain_comment_edit" ' + domainCommentTextParams + '>' + (data.comment ? data.comment : '') + '</textarea>';
                box_title = '�������������� ������� � ������ ' + domain;
            } else {
                comment_box = data.comment ? data.comment : '';
                box_title = '�������� ������� � ������ ' + domain;
            }
            var boxHtml =
                '<div class="ads_domain_comment_edit_wrap">' +
                '<div>' +
                comment_box +
                '</div>' +
                '</div>' +
                info_string;

            cur.domainCommentEditBox = showFastBox({
                title: box_title,
                width: 500,
                onHide: onBoxHide
            }, boxHtml);
            cur.domainCommentEditBox.removeButtons();

            cur.domainCommentEditBox.addButton(getLang('box_cancel'), false, 'no');
            if (data.allow_edit) {
                if (!buttons) {
                    if (data.exists) {
                        buttons = [
                            [undefined, '���������']
                        ];
                    } else {
                        buttons = [
                            ['declined', '���������'],
                            ['approved', '��������'],
                            ['warning', '�������� �������']
                        ];
                    }
                }
                for (var i in buttons) {
                    cur.domainCommentEditBox.addButton(buttons[i][1], AdsModer.saveDomainComment.pbind(buttons[i][0], reload), 'yes');
                }
            }

            cur.domainCommentEditBox.domain = domain;
            ge('ads_domain_comment_edit').focus();
        },
        onFail: function() {
            showFastBox('������', '������');
            return true;
        },
        showProgress: function() {
            if (add_button) {
                lockButton(add_button);
            }
        },
        hideProgress: function() {
            if (add_button) {
                unlockButton(add_button);
            }
        }
    });
};

AdsModer.openTemplateEditBox = function(template_id, buttons, type) {
    function onBoxHide() {
        delete cur.templateEditBox;
    }

    ajax.post('/adsmoder?act=a_get_template', {
        template_id: template_id
    }, {
        onDone: function(data) {
            var info_string = '';
            if (data.exists) {
                info_string = '<div class="ads_premoderation_domain_info">������ � ��������� ��� �������������� ' + data.user + ' <b><nobr>' + data.update_time + '</nobr></b></div>';
            }
            var full_text_box;
            var short_title_box;
            var box_title;

            short_title_box = ' <input id="ads_template_title_edit" type="text" placeholder="�������� ��������� �������" class="text" value="' + (data.template ? data.template.short_title : '') + '">';
            full_text_box = ' <textarea id="ads_template_text_edit" placeholder="������ ����� �������">' + (data.template ? data.template.full_text : '') + '</textarea>';
            box_title = '�������������� ������� ' + (data.template ? data.template.short_title : '');

            var boxHtml =
                '<div class="ads_note_edit_wrap">' +
                '<div class="ads_premoderation_template_title">' +
                short_title_box +
                '</div><div>' +
                full_text_box +
                '</div>' +
                '</div>' +
                info_string;

            cur.templateEditBox = showFastBox({
                title: box_title,
                width: 400,
                onHide: onBoxHide
            }, boxHtml);
            cur.templateEditBox.removeButtons();

            cur.templateEditBox.addButton(getLang('box_cancel'), false, 'no');
            if (!buttons) {
                buttons = [
                    [undefined, '���������']
                ];
            }
            for (var i in buttons) {
                cur.templateEditBox.addButton(buttons[i][1], AdsModer.saveTemplate.pbind(buttons[i][0], template_id, type), 'yes');
            }

            ge('ads_template_title_edit').focus();
        },
        onFail: function() {
            showFastBox('������', '������');
            return true;
        }
    });
};

AdsModer.saveTemplate = function(action, template_id, type) {
    if (!Ads.lock('save_template', onLock, onUnlock)) {
        return;
    }

    var ajax_params = {
        template_id: template_id,
        hash: cur.change_template_hash
    };
    if (action == 'disable') {
        ajax_params.status = 1;
    } else if (action == 'enable') {
        ajax_params.status = 0;
    } else {
        ajax_params.short_title = ge('ads_template_title_edit').value;
        ajax_params.full_text = ge('ads_template_text_edit').value;
        ajax_params.type = type;
    }

    ajax.post('/adsmoder?act=a_save_template', ajax_params, {
        onDone: function(data) {
            Ads.unlock('save_template');
            nav.reload();
        },
        onFail: function() {
            showFastBox('������', '������');
            Ads.unlock('save_domain_comment');
            return true;
        }
    });

    function onLock() {
        if (cur.templateEditBox) {
            cur.templateEditBox.showProgress();
        }
    }

    function onUnlock() {
        if (cur.templateEditBox) {
            cur.templateEditBox.hide();
        }
    }
};

AdsModer.addCurrentDomain = function() {
    var domain = ge('ads_moder_domain_search').value;
    if (domain.length) {
        AdsModer.openDomainCommentEditBox(domain, true);
    }
};

AdsModer.onSearchDomainsKeyUp = function(event) {
    if (event.keyCode == 13) {
        AdsModer.searchCurrentDomain();
    }
};

AdsModer.searchCurrentDomain = function() {
    var domain = ge('ads_moder_domain_search').value;
    if (!domain.length) {
        domain = false;
    }
    nav.change({
        domain: domain,
        offset: false
    });
};

AdsModer.saveDomainComment = function(new_status, reload) {
    if (!Ads.lock('save_domain_comment', onLock, onUnlock)) {
        return;
    }

    var ajax_params = {
        domain: cur.domainCommentEditBox.domain,
        comment: ge('ads_domain_comment_edit').value,
        hash: cur.change_domain_comment_hash
    };
    if (new_status) {
        ajax_params.status = new_status;
    }
    ajax.post('/adsmoder?act=a_save_domain_comment', ajax_params, {
        onDone: function(data) {
            Ads.unlock('save_domain_comment');
            if (ajax_params.status) {
                if (reload) {
                    nav.reload();
                } else {
                    AdsModer.onChangedDomainStatus(ajax_params.domain, ajax_params.status);
                }
            }
        },
        onFail: function() {
            Ads.unlock('save_domain_comment');
            showFastBox('������', '������');
            return true;
        }
    });

    function onLock() {
        cur.domainCommentEditBox.showProgress();
    }

    function onUnlock() {
        cur.domainCommentEditBox.hide();
    }
};

AdsModer.onChangedDomainStatus = function(domain, new_status) {
    each(geByClass('ads_premoderation_request_link_domain_' + domain), function(i, v) {
        removeClass(v, v.getAttribute('data-value'));
        addClass(v, new_status);
        if (v.idd) {
            v.idd.select(new_status, true);
        }
        v.setAttribute('data-value', new_status);
    });
};

AdsModer.changeDomainStatus = function(domain, new_status, old_status, action_text) {
    var status_parts = new_status.split(':', 2);
    var edit_comment = false;
    if (status_parts.length > 1) {
        new_status = status_parts[0];
        if (new_status == '') {
            new_status = undefined;
        }
        if (status_parts[1] == 'comment') {
            edit_comment = true;
        }
    }
    if (edit_comment) {
        AdsModer.openDomainCommentEditBox(domain, false, [
            [new_status, action_text]
        ]);
    } else {
        ajax.post('/adsmoder?act=a_change_domain_status', {
            domain: domain,
            new_status: new_status,
            hash: cur.change_domain_status_hash
        }, {
            onDone: function(response) {
                AdsModer.onChangedDomainStatus(domain, new_status);
            },
            onFail: function(msg) {
                showFastBox('������', msg);
            }
        });
    }
};

AdsModer.initDomainStatus = function(v) {
    v.removeAttribute('onmouseover');

    var domain = v.getAttribute('data-domain');
    var idd = new InlineDropdown(v, {
        title: domain,
        items: [
            ['approved', '��������'],
            ['declined', '���������'],
            ['warning', '�������� �������'],
            ['unknown', '�������� �������'],
            ['approved:comment', '�������� � ������������'],
            ['declined:comment', '��������� � ������������'],
            ['warning:comment', '�������� ������� � ������������'],
            [':comment', '������������� �����������']
        ],
        keepTitle: true,
        keepSelected: true,
        withArrow: hasClass(v, 'show_arrow'),
        onSelect: function(id, item) {
            AdsModer.changeDomainStatus(domain, id, v.getAttribute('data-value'), item[1]);
        },
        width: 200
    });
    idd.getElement().idd = idd;
};

AdsModer.initDomainNotes = function() {
    cur.linked_domain_notes = {};
    each(geByClass('ads_premoderation_request_link_domain'), function(i, v) {
        var domain = v.getAttribute('data-domain');
        cur.linked_domain_notes[domain] = v.getAttribute('data-linked-note');
    });
};

AdsModer.initTemplates = function() {
    var items = [];
    for (var i in cur.premoderation_templates_order) {
        var id = cur.premoderation_templates_order[i];
        items.push([id, cur.premoderation_templates[id].short_title]);
    }
    each(geByClass('ads_moder_templates'), function(i, v) {
        var key = v.getAttribute('data-key');
        new InlineDropdown(v, {
            keepTitle: true,
            keepSelected: false,
            withArrow: true,
            items: items,
            onSelect: function(id, item) {
                val('moder_comment_' + key, cur.premoderation_templates[id].full_text);
            },
            width: 200
        });
    });
};

try {
    stManager.done('ads_moder_common.js');
} catch (e) {}