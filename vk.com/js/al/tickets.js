var Tickets = {

    switchTab: function(name, evt) {
        if (checkEvent(evt)) return true;
        var oldTab = false;
        var wide_tabs = ge('tickets_page_tabs');
        if (wide_tabs) {
            each(geByClass('page_tab_sel', ge('tickets_page_tabs')), function(i, v) {
                if (hasClass(v, 'page_tab_sel')) {
                    oldTab = v;
                    replaceClass(v, 'page_tab_sel', 'page_tab');
                }
            });
            replaceClass(ge(name + '_tab'), 'page_tab', 'page_tab_sel');
        } else {
            each(geByClass('active_link', ge('tickets_tabs')), function(i, v) {
                if (hasClass(v, 'active_link')) {
                    oldTab = v;
                    removeClass(v, 'active_link');
                }
            });
            addClass(ge(name + '_tab'), 'active_link');
        }
        if (name == 'show') {
            show('show_tab', 'new_link');
            hide('new_tab', 'extra_tab');
            return false;
        } else if (name == 'new') {
            hide('show_tab', 'extra_tab', 'new_link');
            show('new_tab');
            var link = ge(name + '_tab');
            if (!wide_tabs) {
                link = link.firstChild;
            }
            if (cur.fromTopLink) {
                link += '&from=top';
            }
            return nav.go(link, evt, {
                onFail: function(text) {
                    hide('new_tab');
                    show('show_tab', 'new_link');
                    if (wide_tabs) {
                        replaceClass(ge(name + '_tab'), 'page_tab_sel', 'page_tab');
                        if (oldTab) {
                            replaceClass(oldTab, 'page_tab', 'page_tab_sel');
                        }
                    } else {
                        removeClass(ge(name + '_tab'), 'active_link');
                        if (oldTab) {
                            addClass(oldTab, 'active_link');
                        }
                    }
                    setTimeout(showFastBox({
                        title: getLang('global_error'),
                        dark: true,
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, text).hide, 2000);
                    return true;
                }
            });
        } else if (name == 'extra') {
            hide('show_tab', 'new_tab');
            show('extra_tab', 'new_link');
        } else {
            hide('extra_tab', 'show_tab', 'new_tab');
            show('new_link');
            var link = ge(name + '_tab');
            if (!wide_tabs) {
                link = link.firstChild;
            }
            link = link.href;
            if ((name == 'all_history' || name == 'history') && nav.objLoc.q && ge(name + '_tab').firstChild) {
                link += '&q=' + nav.objLoc.q;
            }
            return nav.go(link, evt);
        }
    },

    gotoTicket: function(el, evt) {
        Tickets.switchTab('show', evt);
        return nav.go(el, evt);
    },
    getBrowser: function() {
        var _uan = false,
            _uafull, browsersList = ['opera_mini', 'opera_mobile', 'safari_mobile', 'msie_mobile', 'bada', 'android', 'ipad', 'ipod', 'iphone', 'mozilla', 'opera', 'chrome', 'safari', 'msie10', 'msie9', 'msie8', 'msie7', 'msie6', 'msie'],
            versions = ['opera_mini', 'opera_mobile', 'bada'],
            version;
        for (var i in browsersList) {
            if (window.browser[browsersList[i]] === true) {
                _uan = browsersList[i];
                break;
            }
        }
        if (window._ua && /yabrowser/i.test(_ua)) {
            _uan = 'yabrowser';
        }
        if (_uan) {
            if (window.browser && browser.msie && (!browser.version || browser.version < 10)) {
                version = '';
            } else {
                var fixed_ver = (window._ua.match(/.+(?:mini|bada|mobi)[\/: ]([\d.]+)/) || [0, '0'])[1];
                version = fixed_ver != '0' ? ' ' + fixed_ver : ' ' + window.browser.version;
            }
            _uafull = _uan + version;
        } else {
            _uafull = navigator.userAgent.toLowerCase();
        }
        var f = browser.flashfull;
        _uafull += "|" + f.major + "." + f.minor + "." + f.rev;

        return _uafull;
    },
    showTooltip: function(el, text, className, onLeft, disableMouseOut) {
        showTooltip(el, {
            dir: onLeft ? 'right' : 'left',
            text: text,
            slideX: onLeft ? -15 : 15,
            className: 'tickets_side_tt ' + className,
            shift: function() {
                var containerSize = getSize(el.tt.container),
                    inputSize = getSize(el);
                var leftOffset = 0;
                if (onLeft) {
                    leftOffset = containerSize[0] + 7;
                } else {
                    leftOffset = -inputSize[0] - 7;
                }
                return [leftOffset, 0, -(inputSize[1] + containerSize[1]) / 2];
            },
            forcetodown: true,
            hasover: 1,
            onCreate: function() {
                if (disableMouseOut) {
                    removeEvent(el, 'mouseout');
                }
            }
        });
    },
    hideTooltip: function(el) {
        if (el.tt && el.tt.hide) {
            el.tt.hide();
        }
    },
    doSaveTicket: function(query) {
        ajax.post(cur.objLoc + '?act=a_save', query, {
            onDone: function(code, data) {
                if (code == 0) {
                    showDoneBox(data);
                } else if (code == 1) {
                    Tickets.showAverageTime(data, Tickets.doSaveTicket.pbind(extend({}, query, {
                        force: 1
                    })));
                }
            },
            showProgress: lockButton.pbind('tickets_send'),
            hideProgress: unlockButton.pbind('tickets_send')
        });
    },
    getFromObjLoc: function(fields) {
        var a = {};
        each(fields, function(i, field) {
            if (nav.objLoc[field]) {
                a[field] = nav.objLoc[field];
            }
        });
        return a;
    },
    getAudioFields: function() {
        var q = {};
        if (cur.samples && cur.samples.audio || ge('audio_checking')) {
            q.audio_html = ge('audio_checking').innerHTML;
            var orig = (cur.samples || {}).audio || '';
            if (window.ag && window.sh) {
                q.audio_html = q.audio_html.replace(/_info/g, 'vkontakte_info');
            }
            if (window.dwnl_video || window.add_js) {
                q.audio_html = q.audio_html.replace(/_info/g, 'dwnl_info');
            }
            q.audio_orig = ce('div', {
                innerHTML: orig.replace(/z9q2m/g, 'audio')
            }).innerHTML;
        }
        return q;
    },
    saveTicket: function(hash) {
        var title = trim(val('tickets_title')),
            text = trim(val('tickets_text')),
            fieldsValid = true;
        if (!title) {
            notaBene('tickets_title', false, !fieldsValid);
            fieldsValid = false;
        }
        var attachs = Tickets.getUploadAttachs();
        if (!text && !cur.descriptionNotNeeded && !attachs.length) {
            notaBene('tickets_text', false, !fieldsValid);
            fieldsValid = false;
        }
        var _uafull = Tickets.getBrowser();
        var query = extend({
                title: title,
                text: text,
                hash: hash,
                attachs: attachs,
                browser: _uafull,
                section: cur.faqSection
            },
            Tickets.getAudioFields(),
            Tickets.getFromObjLoc(['mid', 'group_id', 'app_id', 'union_id', 'from', 'mobile', 'bhash'])
        );
        if (nav.objLoc.hasOwnProperty('hds')) {
            query.hds = nav.objLoc['hds'];
        }
        if (cur.fromFaqId) {
            query.faq = cur.fromFaqId;
        }
        if (cur['from']) {
            query.from = cur['from'];
        }

        var efValues = TicketsEF.getValues();
        if (efValues === false) {
            fieldsValid = false;
        }
        if (!fieldsValid) {
            return false;
        }
        extend(query, efValues);

        if (query.faqSection == 39) {
            var outdatedLeft = ls.get('support_outdated_left');
            if (outdatedLeft) {
                if (outdatedLeft.ts && Math.floor((new Date()).getTime() / 1000) - outdatedLeft.ts < 3600) {
                    query.outdated_ticket_id = outdatedLeft.id;
                }
            }
            ls.remove('support_outdated_left');
        }
        Tickets.doSaveTicket(query);
    },

    savePayTicket: function(hash) {
        var title = trim(val('tickets_title')),
            text = trim(val('tickets_text'));
        if (!title) {
            notaBene('tickets_title');
            return;
        }
        var attachs = Tickets.getUploadAttachs();
        if (!text && !attachs.length) {
            notaBene('tickets_text');
            return;
        }
        if (!Tickets.checkPayForm()) {
            return;
        }
        var _uafull = Tickets.getBrowser();
        var query = extend({
                title: title,
                text: text,
                hash: hash,
                attachs: attachs,
                browser: _uafull,
                section: cur.faqSection
            },
            Tickets.getAudioFields(),
            Tickets.getPayFields(),
            Tickets.getFromObjLoc(['id', 'group_id', 'app_id', 'union_id', 'from'])
        );
        Tickets.doSaveTicket(query);
    },

    saveDMCATicket: function(hash) {
        if (!Tickets.checkDMCAForm()) {
            return;
        }
        var attachs = Tickets.getUploadAttachs();
        var _uafull = Tickets.getBrowser();
        var query = extend({
                hash: hash,
                section: cur.faqSection,
                attachs: attachs,
                browser: _uafull
            },
            Tickets.getDMCAFields(),
            Tickets.getAudioFields()
        );
        Tickets.doSaveTicket(query);
    },

    checkDMCAForm: function() {
        var params = Tickets.getDMCAFields();
        var legal = (params.type == 1),
            suffix = legal ? '_legal' : '',
            failed = false;
        if (!params.links || params.links.length < 9) {
            notaBene('tickets_links');
            failed = true;
        }
        if (!params.text) {
            notaBene('tickets_text');
            failed = true;
        }
        if (legal) {
            if (!params.title) {
                notaBene('tickets_dmca_corp');
                failed = true;
            }
            if (!params.address || params.address.length < 9) {
                notaBene('tickets_dmca_address');
                failed = true;
            }
            if (!params.real_address || params.real_address.length < 9) {
                notaBene('tickets_dmca_real_address');
                failed = true;
            }
        } else {
            if (!params.title) {
                notaBene('tickets_dmca_name');
                failed = true;
            }
            if (!params.passport_series) {
                notaBene('tickets_dmca_passport_series');
                failed = true;
            }
            if (!params.passport_number) {
                notaBene('tickets_dmca_passport_number');
                failed = true;
            }
            if (!params.passport_date) {
                notaBene('tickets_dmca_passport_date');
                failed = true;
            }
            if (!params.passport_issued_by) {
                notaBene('tickets_dmca_passport_issued_by');
                failed = true;
            }
        }
        if (!params.phone_fax || params.phone_fax.length < 7) {
            notaBene('tickets_dmca_phone_fax');
            failed = true;
        }
        if (!(/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(params.email))) {
            notaBene('tickets_dmca_email');
            failed = true;
        }
        if (legal) {
            if (!params.repr || params.repr.length < 5) {
                notaBene('tickets_dmca_repr');
                failed = true;
            }
            if (!params.post || params.post.length < 3) {
                notaBene('tickets_dmca_post');
                failed = true;
            }
        }
        if (failed) {
            return false;
        }
        if (!isChecked('support_dmca_agree_owner' + suffix)) {
            return Tickets.showMsgBox(getLang(legal ? 'help_ccform_legal_need_is_owner' : 'help_ccform_natural_need_owner'), getLang('global_error'));
        }
        if (!isChecked('support_dmca_agree_unauthorized' + suffix)) {
            return Tickets.showMsgBox(getLang(legal ? 'help_ccform_legal_need_unauthorized' : 'help_ccform_natural_need_unauthorized'), getLang('global_error'));
        }
        if (!isChecked('support_dmca_agree_perjury' + suffix)) {
            return Tickets.showMsgBox(getLang(legal ? 'help_ccform_legal_need_perjury' : 'help_ccform_natural_need_perjury'), getLang('global_error'));
        }
        if (!isChecked('support_dmca_agree_email' + suffix)) {
            return Tickets.showMsgBox(getLang(legal ? 'help_ccform_legal_need_email' : 'help_ccform_natural_need_email'), getLang('global_error'));
        }
        if (!isChecked('support_dmca_agree_inform' + suffix)) {
            return Tickets.showMsgBox(getLang(legal ? 'help_ccform_legal_need_inform' : 'help_ccform_natural_need_inform'), getLang('global_error'));
        }
        if (!isChecked('support_dmca_agree_rules')) {
            return Tickets.showMsgBox(getLang('help_ccform_need_rules'), getLang('global_error'));
        }

        return true;
    },

    getDMCAFields: function() {
        var res = {
            text: trim(val('tickets_text')),
            links: trim(val('tickets_links')),
            type: cur.dmcaType,
            phone_fax: trim(val('tickets_dmca_phone_fax')),
            email: trim(val('tickets_dmca_email'))
        };
        if (cur.dmcaType == 1) {
            res.title = trim(val('tickets_dmca_corp'));
            res.ogrn = trim(val('tickets_dmca_ogrn'));
            res.address = trim(val('tickets_dmca_address'));
            res.real_address = trim(val('tickets_dmca_real_address'));
            res.repr = trim(val('tickets_dmca_repr'));
            res.post = trim(val('tickets_dmca_post'));
        } else {
            res.title = trim(val('tickets_dmca_name'));
            res.passport_series = trim(val('tickets_dmca_passport_series'));
            res.passport_number = trim(val('tickets_dmca_passport_number'));
            res.passport_date = trim(val('tickets_dmca_passport_date'));
            res.passport_issued_by = trim(val('tickets_dmca_passport_issued_by'));
        }
        for (var i in res) {
            if (res[i] === '') {
                delete res[i];
            }
        }

        return res;

    },

    showMsgBox: function(text, title, input) {
        setTimeout(showFastBox({
            title: title,
            dark: true,
            bodyStyle: 'line-height: 160%;',
            onHide: function() {
                if (input) ge(input).focus();
            }
        }, text).hide, 4000);
        return false;
    },

    checkPhone: function(phone) {
        ajax.post('support?act=a_check_phone', {
            phone: phone
        }, {
            cache: 1,
            onDone: function(real_phone) {
                cur.phone = real_phone;
                val('tickets_number_from', real_phone);
                if (!real_phone) {
                    notaBene('tickets_number_from');
                }
            }
        })
    },

    checkPayForm: function() {
        if (cur.payType === undefined) {
            cur.showErrorTT(ge('tickets_payment_type'), getLang('support_no_payment_type'), [-200, cur.section == 'show' ? -103 : -113, 0]);
            return false;
        }
        switch (cur.payType) {
            case 0:
                if (!cur.phone) {
                    notaBene('tickets_number_from');
                    return false;
                }
                break;
            case 1:
            case 4:
                if (cur.payType == 4) {
                    if (!floatval(val('tickets_pay_sum'))) {
                        notaBene('tickets_pay_sum');
                        return false;
                    }
                    if (!trim(val('tickets_organisation'))) {
                        notaBene('tickets_organisation');
                        return false;
                    }
                }
                var attachs = Tickets.getUploadAttachs();
                if (!attachs.length) {
                    var msg = (cur.payType == 1) ? getLang('support_no_bill_photo') : getLang('support_no_payment_scan');
                    setTimeout(showFastBox({
                        title: getLang('global_error'),
                        dark: true,
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, msg).hide, 2000);
                    return false;
                }
                break;
            case 2:
            case 3:
            case 5:
            case 6:
            case 8:
            case 9:
            case 7:
                if (cur.payType == 2) {
                    if (cur.paySystem === undefined) {
                        cur.showPaySysTT();
                        return false;
                    } else if (cur.paySystem == 4 && !trim(val('tickets_paysystem_name'))) {
                        notaBene('tickets_paysystem_name');
                        return false;
                    }
                }
                if (!floatval(val('tickets_pay_sum'))) {
                    notaBene('tickets_pay_sum');
                    return false;
                }
                break;
            default:
                return false;
        }

        return true;
    },

    getPayFields: function() {
        var res = {};
        if (cur.payType === undefined) {
            return res;
        }
        res.pay_type = cur.payType;
        switch (cur.payType) {
            case 0:
                res.pay_date = val('tickets_payment_date');
                res.number_from = cur.phone;
                if (val('tickets_number_to')) {
                    res.number_to = trim(val('tickets_number_to'));
                }
                if (val('tickets_sms_text')) {
                    res.sms_text = trim(val('tickets_sms_text'));
                }
                if (val('tickets_payed_sum')) {
                    res.payed_sum = trim(val('tickets_payed_sum'));
                }
                break;
            case 1:
                res.pay_date = val('tickets_payment_date');
                res.pay_email = val('tickets_id_email');
                break;
            case 2:
            case 3:
                res.pay_date = val('tickets_payment_date');
                res.pay_sum = floatval(val('tickets_pay_sum'));
                if (cur.payType == 2) {
                    if (cur.paySystem == 4) {
                        res.pay_system_name = trim(val('tickets_paysystem_name'));
                    } else {
                        res.pay_system = cur.paySystem;
                    }
                }
                break;
            case 4:
                res.pay_day = val('tickets_payment_day');
                res.pay_sum = floatval(val('tickets_pay_sum'));
                res.pay_org = trim(val('tickets_organisation'));
                break;
            case 5:
            case 6:
            case 8:
            case 9:
            case 7:
                res.pay_date = val('tickets_payment_date');
                res.pay_sum = floatval(val('tickets_pay_sum'));
                break;
        }
        return res;

    },
    getReplyQueryData: function(text, hash, attachs) {
        var query = {
            act: 'a_add_comment',
            ticket_id: cur.ticket_id,
            text: text,
            hash: hash,
            attachs: attachs,
            hidden: isChecked('tickets_hidden'),
            copy_to_card: isChecked('copy_reply_to_card')
        };
        var _ua = false,
            _uafull;
        for (var i in window.browser) {
            if (window.browser[i] === true) {
                _ua = i;
                break;
            }
        }
        _uafull = _ua ? _ua + " " + window.browser.version : navigator.userAgent.toLowerCase();
        var f = browser.flashfull;
        _uafull += "|" + f.major + "." + f.minor + "." + f.rev;
        query.browser = _uafull;
        if (cur.samples && cur.samples.audio || ge('audio_checking')) {
            query.audio_html = ge('audio_checking').innerHTML;
            var orig = (cur.samples || {}).audio || '';
            if (window.ag && window.sh) {
                query.audio_html = query.audio_html.replace(/_info/g, 'vkontakte_info');
            }
            if (window.dwnl_video || window.add_js) {
                query.audio_html = query.audio_html.replace(/_info/g, 'dwnl_info');
            }
            query.audio_orig = ce('div', {
                innerHTML: orig.replace(/z9q2m/g, 'audio')
            }).innerHTML;
        }
        if (cur.getReplyDataFields) {
            var replyData = cur.getReplyDataFields();
            if (replyData === false) {
                return false;
            }
            extend(query, replyData);
        }
        return query;
    },
    removeReplyDraft: function() {
        var draftKey = 'helpdesk_draft' + vk.id + '_' + cur.ticket_id;
        if (ls.get(draftKey)) {
            ls.set(draftKey, false);
            ls.remove(draftKey);
        }
    },
    getUploadAttachs: function() {
        var attachs = [],
            chosen = cur.ticketsNewMedia.chosenMedias;
        if (chosen) {
            each(chosen, function(i, att) {
                var type = att[0],
                    value = att[1];
                if (type == 'photo' || type == 'doc') {
                    attachs.push(type + ',' + value);
                }
            });
        }
        return attachs;
    },
    addTicketReply: function(hash, isCtrlEnter) {
        if (ge('tickets_reply') && ge('tickets_reply').disabled) {
            return false;
        }
        var text = trim(val('tickets_reply')),
            attachs = Tickets.getUploadAttachs();
        if (!text && !attachs.length) {
            if (isCtrlEnter && Helpdesk) {
                Helpdesk.closeTicket(hash);
            }
            return elfocus('tickets_reply');
        }
        if (cur.sendingAnswer) {
            return false;
        }
        cur.sendingAnswer = true;
        var query = Tickets.getReplyQueryData(text, hash, attachs);
        if (query === false) {
            return false;
        }
        if (cur.checkedTickets) {
            var tickets = [];
            each(cur.checkedTickets, function(i, v) {
                tickets.push(i);
            });
            query.similar = tickets.join(',');
        }
        Tickets.doSendReply(query);
        delete cur.photoUploadInd;
    },
    addPayData: function(hash) {
        if (!Tickets.checkPayForm() || cur.sendingAnswer) {
            return;
        }
        var text = trim(val('tickets_reply')),
            attachs = Tickets.getUploadAttachs();
        var query = Tickets.getReplyQueryData(text, hash, attachs);
        extend(query, Tickets.getPayFields());
        Tickets.doSendReply(query);
    },
    checkVkPayForm: function() {
        var code = val('tickets_vkpay_code'),
            phoneInp = ge('tickets_vkpay_phone'),
            ok = true;
        if (!code.match(/^\d{4}$/)) {
            notaBene('tickets_vkpay_code');
            ok = false;
        }
        if (phoneInp) {
            var phone = trim(val(phoneInp));
            if (!phone.match(/^[\d\*]{10,}$/)) {
                notaBene('tickets_vkpay_phone');
                ok = false;
            }
        }
        return ok;
    },
    addVkPayData: function(hash) {
        if (cur.sendingAnswer || !Tickets.checkVkPayForm()) {
            return;
        }
        var query = Tickets.getReplyQueryData('', hash, []);
        extend(query, {
            ef: [
                val('tickets_vkpay_code'),
                val('tickets_vkpay_phone')
            ]
        });
        Tickets.doSendReply(query);
    },
    doSendReply: function(query) {
        Tickets.removeReplyDraft();
        cur.sendingAnswer = true;
        ajax.post(cur.objLoc, query, {
            onDone: function(content, script) {
                cur.sendingAnswer = false;
                if (content) {
                    val('tickets_content', content);
                }
                if (script) {
                    eval(script);
                }
            },
            onFail: function() {
                cur.sendingAnswer = false;
            },
            showProgress: lockButton.pbind('tickets_send'),
            hideProgress: unlockButton.pbind('tickets_send')
        });
    },
    checkTextLength: function(el, maxLen, warn, maxLines) {
        var v = trim(el.value).replace(/\n\n\n+/g, '\n\n');
        if (el.lastLen === v.length) return;

        var realLen = el.lastLen = v.length;
        var brCount = realLen - v.replace(/\n/g, '').length;
        maxLines = maxLines || 10;

        warn = ge(warn);
        if (realLen > maxLen - 100 || brCount > maxLines || (cur.objLoc == 'dmca' || nav.objLoc.act == 'new_dmca') && realLen > 0) {
            show(warn);
            if (realLen > maxLen) {
                warn.innerHTML = getLang('text_exceeds_symbol_limit', realLen - maxLen);
            } else if (brCount > maxLines) {
                warn.innerHTML = getLang('global_recommended_lines', brCount - maxLines);
            } else {
                warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
            }
        } else {
            hide(warn);
        }
    },
    editComment: function(cid, hash, ticket_id) {
        if (cur.editStarted) return false;
        if (cur.editing) {
            this.cancelEditComment(cur.editing);
        }
        var cont = geByClass1('tickets_reply_text', ge('reply' + cid));
        var mrg = '-1px 0 0 -3px',
            wdt = '530px',
            picmrg = '0px';
        if (browser.mozilla) {
            mrg = '-1px 0 0 -4px';
            picmrg = '8px';
        } else if (browser.opera) {
            mrg = '1px 0 0 -3px';
            picmrg = '4px';
        } else if (browser.msie) {
            picmrg = '2px';
        }

        cur.editStarted = true;
        ajax.post(cur.objLoc + '?act=a_get_comment', {
            ticket_id: cur.ticket_id || ticket_id,
            cid: cid,
            hash: hash
        }, {
            onDone: function(html, cur_data, attachs) {
                var canAttach = true;
                if (cur_data) {
                    if (cur_data.lang) {
                        cur.lang = extend(cur.lang || {}, cur_data.lang);
                        delete cur_data.lang;
                    }
                    if (cur_data.script) {
                        eval(cur_data.script);
                        delete cur_data.script;
                    }
                    if (cur_data.noAttaches) {
                        canAttach = false;
                        delete cur_data.noAttaches;
                    }
                    extend(cur, cur_data);
                }
                delete cur.editStarted;
                cont.parentNode.insertBefore(se(html), cont);
                if (canAttach) {
                    var attachOpts = {
                        limit: 5,
                        oneClick: cur.oneClickUpload,
                        target: 'edit'
                    };
                    if (cur.addScreenShot) {
                        attachOpts.photoCallback = cur.addScreenShot;
                    }
                    cur.ticketsEditMedia = Tickets.initAddMedia(ge('tis_add_lnk_edit').firstChild, 'tis_preview_edit', cur.mediaTypes, attachOpts);
                }

                var textDiv = geByClass1('tickets_reply_text', ge('reply' + cid)),
                    replyInput = ge('reply' + cid + 'edit');
                setStyle(replyInput, 'height', getSize(textDiv)[1]);
                hide(textDiv);
                hide(geByClass1('tickets_reply_actions', ge('reply' + cid)));
                hide('attachs' + cid);

                show('tickets_reply_edit' + cid);

                autosizeSetup(replyInput, {
                    minHeight: 34
                });

                setTimeout(function() {
                    cur.editing = cid;
                    if (canAttach) {
                        for (var i in attachs) {
                            cur.ticketsEditMedia.chooseMedia(attachs[i][0], attachs[i][1], attachs[i][2]);
                        }
                    }
                    elfocus(replyInput);
                }, 0);
            },
            onFail: function(error) {
                delete cur.editStarted;
                hide('reply_actions' + cid);
                return Tickets.showError(error);
            }
        });
        return false;
    },

    saveComment: function(event, cid, hash, ticket_id) {
        if (event && event.keyCode == 27) {
            this.cancelEditComment(cur.editing);
            return;
        }
        if (event && (event.ctrlKey || event.metaKey && browser.mac) && (event.keyCode == 10 || event.keyCode == 13)) this.doSaveComment(cid, hash, ticket_id);
    },

    cancelEditComment: function(cid) {
        show(geByClass1('tickets_reply_text', ge('reply' + cid)));
        show(geByClass1('tickets_reply_actions', ge('reply' + cid)));
        show('attachs' + cid);
        re('tickets_reply_edit' + cid);
        delete cur.editing;
    },

    doSaveComment: function(cid, hash, ticket_id) {
        var v = trim(val('reply' + cid + 'edit'));
        var attachs = [],
            chosen = cur.ticketsEditMedia && cur.ticketsEditMedia.chosenMedias || [];
        if (chosen) {
            for (var i in chosen) {
                var att = chosen[i],
                    type = att[0],
                    value = att[1];
                if (type == 'photo' || type == 'doc') {
                    attachs.push(type + ',' + value);
                }
            }
        }
        if (!v && !attachs.length) {
            notaBene('reply' + cid + 'edit');
            return;
        }
        ajax.post(cur.objLoc + '?act=a_edit_comment', {
            ticket_id: ticket_id,
            cid: cid,
            text: v,
            attachs: attachs,
            hash: hash
        }, {
            onDone: function(text, attachs) {
                var cont = geByClass1('tickets_reply_text', ge('reply' + cid)),
                    acts = geByClass1('tickets_reply_actions', ge('reply' + cid));
                val(cont, text);
                show(geByClass1('tickets_reply_text', ge('reply' + cid)));
                show(acts);
                show('attachs' + cid);
                if (attachs !== 0) {
                    if (attachs) {
                        var attNode = ge('attachs' + cid);
                        if (!attNode) {
                            attNode = acts.parentNode.insertBefore(ce('div', {
                                id: 'attachs' + cid,
                                className: 'clear_fix tr_attachs'
                            }), acts);
                        }
                        val(attNode, attachs);
                    } else {
                        re('attachs' + cid);
                    }
                }
                re('tickets_reply_edit' + cid);
                delete cur.editing;
            },
            onFail: function(error) {
                hide('reply_actions' + cid);
                return Tickets.showError(error);
            },
            showProgress: lockButton.pbind('save_butn' + cid),
            hideProgress: unlockButton.pbind('save_butn' + cid)
        });
    },
    deleteComment: function(ticketId, replyId, hash) {
        ajax.post(cur.objLoc + '?act=a_delete_comment', {
            ticket_id: ticketId,
            reply_id: replyId,
            hash: hash
        }, {
            onDone: function(res) {
                var cont = domFC(ge('reply' + replyId));
                if (cont) {
                    if (!cur.deletedComments) cur.deletedComments = [];
                    cur.deletedComments[replyId] = val(cont);
                    val(cont, res);
                }
            },
            onFail: function(error) {
                hide('reply_actions' + replyId);
                return Tickets.showError(error);
            }
        });
        return false;
    },
    restoreComment: function(cid, hash, ticket_id) {
        ajax.post(cur.objLoc + '?act=a_restore_comment', {
            ticket_id: cur.ticket_id || ticket_id,
            cid: cid,
            hash: hash
        }, {
            onDone: function(res) {
                var cont = ge('reply' + cid).firstChild;
                if (cont) {
                    val(cont, cur.deletedComments[cid]);
                }
            },
            onFail: function(error) {
                hide('reply_actions' + cid);
                return Tickets.showError(error);
            }
        });
        return false;
    },
    rateComment: function(reply_id, rate, hash) {
        if (cur.replyRating) return false;
        cur.replyRating = true;
        ajax.post('support?act=a_rate_comment', {
            ticket_id: cur.ticket_id,
            reply_id: reply_id,
            rate: rate,
            hash: hash
        }, {
            onDone: function(text) {
                delete cur.replyRating;
                ge('reply_actions' + reply_id).innerHTML = text;
            },
            onFail: function() {
                delete cur.replyRating;
            }
        });
        return false;
    },
    deleteTicket: function(ticket_id, hash) {
        var box = showFastBox({
            title: getLang('support_delete_title'),
            dark: true,
            bodyStyle: 'padding: 20px; line-height: 160%;',
            width: 430
        }, getLang('support_delete_confirm'), getLang('support_delete_button'), function() {
            ajax.post(cur.objLoc + '?act=a_delete', {
                ticket_id: ticket_id,
                hash: hash
            }, {
                progress: box.progress,
                onFail: function(text) {
                    box.hide();
                }
            });
        }, getLang('global_cancel'));
        return false;
    },
    showMsg: function(text) {
        var msg = ge('tickets_msg');
        if (!msg) {
            var parent;
            switch (cur.section) {
                case 'list':
                    parent = ge('tickets_list');
                    break;
                case 'new_faq':
                    parent = ge('tickets_faq_msg');
                    show('tickets_faq_msg');
                    break;
                case 'show':
                default:
                    parent = ge('tickets_reply_rows');
                    break;
            }
            if (parent) {
                msg = parent.insertBefore(ce('div', {
                    id: 'tickets_msg',
                    className: 'msg'
                }), parent.firstChild);
            }
        }
        re('tickets_error');
        if (msg) {
            msg.innerHTML = text;
            msg.style.backgroundColor = '#F4EBBD';
            animate(msg, {
                backgroundColor: '#F9F6E7'
            }, 2000);
        }
        return true;
    },
    showError: function(error) {
        var err = ge('tickets_error');
        if (!err) {
            var parent;
            switch (cur.section) {
                case 'list':
                    parent = ge('tickets_list');
                    break;
                case 'new_faq':
                    parent = ge('tickets_faq_msg');
                    show('tickets_faq_msg');
                    break;
                case 'history':
                case 'show':
                default:
                    parent = ge('tickets_reply_rows');
                    break;
            }
            if (parent) {
                err = parent.insertBefore(ce('div', {
                    id: 'tickets_error',
                    className: 'error'
                }), parent.firstChild);
            }
        }
        re('tickets_msg');
        hide('tickets_progress');
        if (err) {
            err.innerHTML = error;
            err.style.backgroundColor = '#FACEBB';
            animate(err, {
                backgroundColor: '#FFEFE8'
            }, 2000);
        }
        scrollToTop(200);
        return true;
    },
    closeTicketByAuthor: function(hash) {
        ajax.post('support?act=a_close_ticket_by_author', {
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            onDone: addClass.pbind('tickets_thank_you_form', 'you_re_welcome'),
            showProgress: addClass.pbind('tickets_thank_you_form', 'processing'),
            hideProgress: removeClass.pbind('tickets_thank_you_form', 'processing')
        });
    },
    reopenTicketByAuthor: function(hash) {
        ajax.post('support?act=a_reopen_ticket_by_author', {
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            onDone: removeClass.pbind('tickets_thank_you_form', 'you_re_welcome'),
            showProgress: addClass.pbind('tickets_thank_you_form', 'processing'),
            hideProgress: removeClass.pbind('tickets_thank_you_form', 'processing')
        });
        return false;
    },
    showPostField: function() {
        hide('tickets_thank_you_form');
        addClass('tickets_post_form__panel', 'tickets_post_form__panel_shown');
        show('tickets_post_field');
        autosizeSetup('tickets_reply', {
            minHeight: 50,
            maxHeight: 500
        });
        elfocus('tickets_reply');
    },
    hidePostField: function() {
        show('tickets_thank_you_form');
        hide('tickets_post_field');
    },
    showAllReplies: function() {
        var link = ge('show_all_replies_link'),
            pr = geByClass1('progress', link),
            label = geByClass1('label', link);
        hide(label);
        show(pr);
        ajax.post(cur.objLoc, {
            act: 'show',
            id: cur.ticket_id,
            all: 1
        }, {
            onDone: function(content, script) {
                if (content) {
                    val('tickets_reply_rows', content);
                }
                if (script) {
                    eval(script);
                }
            },
            onFail: function() {
                show(label);
                hide(pr);
            }
        });
        return false;
    },
    showPhoto: function(photoRaw, listId, opts) {
        var cbox = curBox();
        if (!cbox) {
            return showPhoto(photoRaw, listId, opts);
        }
        var btns = [];
        each(geByTag('button', cbox.bodyNode.nextElementSibling), function() {
            btns.push([this.innerHTML, this.onclick, hasClass(this, 'flat_button') ? 'yes' : 'no']);
        });
        cur.boxBackup = {
            body: document.createDocumentFragment(),
            width: getSize(cbox.bodyNode.parentNode)[0],
            hideButtons: !isVisible(cbox.bodyNode.nextElementSibling),
            bodyStyle: cbox.bodyNode.getAttribute('style'),
            title: val(geByClass1('box_title', cbox.bodyNode.previousElementSibling)),
            btns: btns
        };
        var boxBody = cbox.bodyNode;
        cur.scrollTopBack = boxLayerWrap.scrollTop;
        opts.onShow = function() {
            while (boxBody.firstChild) {
                cur.boxBackup.body.appendChild(boxBody.firstChild);
            }
        }
        opts.onHide = function() {
            box = showFastBox('', '');
            box.setOptions({
                hideButtons: cur.boxBackup.hideButtons,
                title: cur.boxBackup.title,
                bodyStyle: cur.boxBackup.bodyStyle,
                width: cur.boxBackup.width
            });
            box.bodyNode.appendChild(cur.boxBackup.body);
            if (cur.boxBackup.btns) {
                box.removeButtons();
                each(cur.boxBackup.btns.reverse(), function() {
                    box.addButton.apply(box, this);
                });
            }
            box.setOptions({}); // clear box coords
            boxLayerWrap.scrollTop = cur.scrollTopBack;
        }
        return showPhoto(photoRaw, listId, opts);
    },
    showAddScreenBox: function(onShow) {
        var opts = {
            title: getLang('support_adding_screen'),
            width: 450,
            bodyStyle: 'padding: 0px',
            dark: 1
        };
        if (onShow) {
            opts.onShow = onShow;
        }
        return showFastBox(opts, cur.screenBox);
    },
    showAddDocBox: function(onShow) {
        var opts = {
            title: getLang('support_adding_doc'),
            width: 450,
            bodyStyle: 'padding: 0px',
            dark: 1
        };
        if (onShow) {
            opts.onShow = onShow;
        }
        return showFastBox(opts, cur.docBox);
    },
    showAddExtraFieldFileBox: function(index, withSize) {
        return showFastBox({
            onShow: Tickets.initExtraFieldUpload.pbind('tis_add_data', {
                hideOnStart: true,
                fieldIndex: index,
                withSize: withSize
            }),
            title: getLang('support_adding_image'),
            width: 460,
            bodyStyle: 'padding: 0px',
            dark: 1,
            hideButtons: true
        }, cur.extraFieldsBox);
    },
    choosePhotoUploaded: function(info, params, addMedia) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
            ind = info.fileName ? i + '_' + info.fileName : info,
            prg = ge('upload' + ind + '_progress_wrap');

        prg && hide(geByClass1('progress_x', prg));
        ajax.post('al_photos.php', extend({
            act: 'choose_uploaded_support'
        }, params), {
            onDone: function(media, data) {
                addMedia.chooseMedia('photo', media, extend(data, {
                    upload_ind: i + '_' + fileName
                }));
            },
            onFail: Tickets.chooseFail.pbind(addMedia, info)
        });
    },
    chooseDocUploaded: function(info, params, addMedia) {
        var i = info.ind !== undefined ? info.ind : info,
            ind = info.fileName ? i + '_' + info.fileName : info,
            prg = ge('upload' + ind + '_progress_wrap');

        prg && hide(geByClass1('progress_x', prg));
        ajax.post('docs.php', extend({
            act: 'a_save_doc',
            from: 'choose',
            support_hash: cur.uploadDocData.support_hash
        }, params), {
            onDone: function(oid, id, data) {
                re('upload' + ind + '_progress_wrap');
                var insideBox = curBox();
                if (insideBox) {
                    cur.preventBoxHide = true;
                }
                addMedia.chooseMedia('doc', oid + '_' + id, data);
                if (insideBox) {
                    cur.preventBoxHide = false;
                }
            },
            onFail: Tickets.chooseFail.pbind(addMedia, info)
        });
    },
    chooseExtraFieldUploaded: function(fieldIndex, info, params) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
            ind = info.fileName ? i + '_' + info.fileName : info,
            prg = ge('upload' + ind + '_progress_wrap');

        prg && hide(geByClass1('progress_x', prg));
        ajax.post('al_photos.php', extend({
            act: 'choose_uploaded_support'
        }, params), {
            onDone: function(media, data) {
                Tickets.chooseExtraFieldComplete(fieldIndex, media, extend(data, {
                    upload_ind: i + '_' + fileName
                }));
            },
            onFail: function(code) {
                Tickets.chooseFail(null, info, code);
            },
            hideProgress: removeClass.pbind('tickets_new_extra_field__uploaded_' + fieldIndex, 'tickets_new_extra_field__uploaded_p')
        });
    },
    removeExtraFieldFile: function(evt, fieldIndex) {
        var p = evt.target.parentNode;
        if (p.tt && p.tt.hide) {
            p.tt.hide();
        }
        var c = ge('tickets_new_extra_field__uploaded_' + fieldIndex);
        removeClass(c, 'tickets_new_extra_field__uploaded_c');
        removeClass(c, 'tickets_new_extra_field__uploaded_p');
        re('tickets_new_extra_field__file_' + fieldIndex);
        hide('tis_add_lnk');
        show('tickets_new_extra_field__upload_btn_' + fieldIndex, 'tickets_new_extra_field__example_' + fieldIndex);
        data(ge('tickets_new_extra_field_' + fieldIndex), 'value', '');
    },
    allExtraFieldFilesUploaded: function() {
        var result = true,
            efContainer = ge('tickets_new_extra_fields'),
            efFileRows = efContainer ? geByClass('_ef_file', efContainer) : [];
        each(efFileRows, function(i, container) {
            var v = data(container, 'value');
            if (!v) {
                result = false;
                return false;
            }
        });
        return result;
    },
    chooseExtraFieldComplete: function(fieldIndex, media, uplData) {
        if (uplData.upload_ind === undefined) {
            return false;
        }

        if (!isObject(uplData)) {
            uplData = {
                thumb_m: uplData[0] || '',
                thumb_s: uplData[1] || '',
                list: uplData[2] || '',
                view_opts: uplData[3] || '',
                upload_ind: uplData.upload_ind || undefined
            };
        }
        vkImage().src = uplData.thumb_m;
        var preview = '<div onclick="return Tickets.showPhoto(\'' + media + '\', \'' + uplData.list + '\', ' + uplData.view_opts.replace(/"/g, '&quot;') + ');" class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + uplData.thumb_m + '" /></div>';

        var mediaEl = se('<div class="page_preview_photo_wrap" id="tickets_new_extra_field__file_' + fieldIndex + '">' + preview + '<div class="page_media_x_wrap inl_bl" ' + (browser.msie ? 'title' : 'tootltip') + '="' + getLang('dont_attach') + '" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [13, 3, 3], black: 1})"><div class="page_media_x" onclick="Tickets.removeExtraFieldFile(event, ' + fieldIndex + ');"></div></div></div>');

        re('upload' + uplData.upload_ind + '_progress_wrap');
        data(ge('tickets_new_extra_field_' + fieldIndex), 'value', media);
        var container = ge('tickets_new_extra_field__uploaded_' + fieldIndex);
        container.appendChild(mediaEl);
        removeClass(container, 'tickets_new_extra_field__uploaded_p');
        addClass(container, 'tickets_new_extra_field__uploaded_c');

        if (!cur.fileApiUploadStarted) {
            boxQueue.hideLast();
        }

        cur.lastPostMsg = false;
        if (uplData.upload_ind !== undefined) {
            delete uplData.upload_ind;
        }
        if (Tickets.allExtraFieldFilesUploaded()) {
            show('tis_add_lnk');
        }
        return false;
    },
    chooseFail: function(addMedia, info, code) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName || info).replace(/[&<>"']/g, '');
        if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
            var lnkId, ind = info.fileName ? i + '_' + info.fileName : info;
            if (addMedia) {
                re('upload' + ind + '_progress_wrap');
            }
        }
        var msg = '',
            type = (Upload.options[i] || {}).type || '';
        if (type == 'doc') {
            msg = getLang('support_upload_fail');
        } else if (type == 'photo') {
            msg = getLang('support_photo_upload_fail');
        }
        if (msg) {
            setTimeout(showFastBox({
                title: getLang('global_error'),
                dark: 1,
                bodyStyle: 'padding: 20px; line-height: 160%;'
            }, msg).hide, 4000);
        }
        topError('Upload failed', {
            dt: -1,
            type: 102,
            url: (ge('file_uploader_form' + i) || {}).action
        });
        Upload.embed(i);
    },

    initPhotoUpload: function(el, params) {
        el = ge(el);
        if (!el) {
            return;
        }

        var uploadData = cur.uploadPhotoData,
            opts = (uploadData || {}).options,
            addMedia;
        switch (params.target) {
            case 'auto':
                addMedia = cur.ticketsAutoMedia;
                uploadData = cur.autoUploadData;
                opts = uploadData.options;
                break;
            case 'template':
                addMedia = cur.ticketsTemplateMedia;
                uploadData = cur.templateUploadData;
                opts = uploadData.options;
                break;
            case 'edit':
                addMedia = cur.ticketsEditMedia;
                break;
            case 'new':
            default:
                addMedia = cur.ticketsNewMedia;
                break;
        }
        if (!addMedia) {
            return;
        }
        return Upload.init(el, uploadData.url, uploadData.vars, {
            file_name: 'photo',

            file_size_limit: 1024 * 1024 * 5, // 5Mb
            file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
            file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
            accept: 'image/jpeg,image/png,image/gif',
            file_match: '\.(gif|jpg|jpeg|png)$',
            lang: opts.lang,

            onUploadStart: function(info, res) {
                var i = info.ind !== undefined ? info.ind : info,
                    options = Upload.options[i];
                if (Upload.types[i] == 'form') {
                    geByClass1('file', el).disabled = true;
                }
                if (Upload.types[i] == 'fileApi') {
                    if (cur.notStarted) {
                        if (params && params.hideOnStart) boxQueue.hideLast();
                        delete cur.notStarted;
                    }
                    if (options.multi_progress) this.onUploadProgress(info, 0, 0);
                }
            },
            onUploadComplete: function(info, res) {
                var params;
                try {
                    params = eval('(' + res + ')');
                } catch (e) {
                    params = q2ajx(res);
                }
                if (!params.photos) {
                    Upload.onUploadError(info);
                    return;
                }
                Tickets.choosePhotoUploaded(info, params, addMedia);
            },
            onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] == 'fileApi') {
                    var lnkId = (cur.attachMediaIndexes || {})[i];
                    if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia) {
                        var data = {
                            loaded: bytesLoaded,
                            total: bytesTotal
                        };
                        if (info.fileName) {
                            data.fileName = info.fileName.replace(/[&<>"']/g, '');
                        }
                        addMedia.showMediaProgress('photo', i, data);
                    }
                } else if (Upload.types[i] == 'flash') {
                    if (!ge('form' + i + '_progress')) {
                        var obj = Upload.obj[i],
                            objHeight = getSize(obj)[1],
                            tm = objHeight / 2 + 10;
                        var node = obj.firstChild;
                        while (node) {
                            if (node.nodeType == 1) {
                                if (node.id == 'uploader' + i && browser.msie) {
                                    setStyle(node, {
                                        position: 'relative',
                                        left: '-5000px'
                                    });
                                } else {
                                    setStyle(node, {
                                        visibility: 'hidden'
                                    });
                                }
                            }
                            node = node.nextSibling;
                        }
                        obj.appendChild(ce('div', {
                            innerHTML: '<div class="tickets_progress_wrap">\
            <div id="form' + i + '_progress" class="tickets_progress" style="width: 0%;"></div>\
          </div></div>'
                        }, {
                            height: tm + 'px',
                            marginTop: -tm + 'px'
                        }));
                    }
                    var percent = intval(bytesLoaded / bytesTotal * 100);
                    setStyle(ge('form' + i + '_progress'), {
                        width: percent + '%'
                    });
                }
            },
            onUploadError: Tickets.chooseFail.pbind(addMedia),
            onUploadCompleteAll: function(info) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] !== 'fileApi') {
                    if (params.hideOnStart) {
                        boxQueue.hideLast();
                    } else {
                        Upload.embed(i);
                    }
                }
            },

            multiple: 1,
            multi_progress: 1,
            max_files: params && params.max_files || 5,
            max_files_hide_last: 1,
            clear: 1,
            type: 'photo',
            max_attempts: 3,
            file_input: cur.uploadInput,
            server: opts.server,
            error: opts.default_error,
            error_hash: opts.error_hash,
            dropbox: 'tis_dropbox'
        });
    },

    initDocUpload: function(el, params) {
        el = ge(el);
        if (!el) return;

        var uploadData = params.uploadData || cur.uploadDocData,
            opts = uploadData.options,
            addMedia;
        switch (params.target) {
            case 'auto':
                addMedia = cur.ticketsAutoMedia;
                break;
            case 'template':
                addMedia = cur.ticketsTemplateMedia;
                break;
            case 'edit':
                addMedia = cur.ticketsEditMedia;
                break;
            case 'new':
            default:
                addMedia = cur.ticketsNewMedia;
                break;
        }
        if (!addMedia) {
            return;
        }
        return Upload.init(el, uploadData.url, uploadData.vars, {
            file_name: 'file',

            file_size_limit: 1024 * 1024 * 200, // 200Mb
            file_types_description: 'Documents',
            file_types: '*.*;',
            file_disallowed_types: params.disallowedFileTypes ? params.disallowedFileTypes : false,
            lang: opts.lang,

            onUploadStart: function(info, res) {
                var i = info.ind !== undefined ? info.ind : info,
                    options = Upload.options[i];
                if (Upload.types[i] == 'form') {
                    geByClass1('file', el).disabled = true;
                }
                if (Upload.types[i] == 'fileApi') {
                    if (cur.notStarted) {
                        if (params && params.hideOnStart) boxQueue.hideLast();
                        delete cur.notStarted;
                    }
                    if (options.multi_progress) this.onUploadProgress(info, 0, 0);
                }
            },
            onUploadComplete: function(info, res) {
                var fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
                    params;
                try {
                    params = eval('(' + res + ')');
                } catch (e) {
                    params = q2ajx(res);
                }
                if (!params.file) {
                    Upload.onUploadError(info);
                    return;
                }
                Tickets.chooseDocUploaded(info, params, addMedia);
            },
            onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] == 'fileApi') {
                    var lnkId = (cur.attachMediaIndexes || {})[i];
                    if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia) {
                        var data = {
                            loaded: bytesLoaded,
                            total: bytesTotal
                        };
                        if (info.fileName) {
                            data.fileName = info.fileName.replace(/[&<>"']/g, '');
                        }
                        addMedia.showMediaProgress('doc', i, data);
                    }
                } else if (Upload.types[i] == 'flash') {
                    if (!ge('form' + i + '_progress')) {
                        var obj = Upload.obj[i],
                            objHeight = getSize(obj)[1],
                            tm = objHeight / 2 + 10;
                        var node = obj.firstChild;
                        while (node) {
                            if (node.nodeType == 1) {
                                if (node.id == 'uploader' + i && browser.msie) {
                                    setStyle(node, {
                                        position: 'relative',
                                        left: '-5000px'
                                    });
                                } else {
                                    setStyle(node, {
                                        visibility: 'hidden'
                                    });
                                }
                            }
                            node = node.nextSibling;
                        }
                        obj.appendChild(ce('div', {
                            innerHTML: '<div class="tickets_progress_wrap">\
            <div id="form' + i + '_progress" class="tickets_progress" style="width: 0%;"></div>\
          </div></div>'
                        }, {
                            height: tm + 'px',
                            marginTop: -tm + 'px'
                        }));
                    }
                    var percent = intval(bytesLoaded / bytesTotal * 100);
                    setStyle(ge('form' + i + '_progress'), {
                        width: percent + '%'
                    });
                }
            },
            onCheckComplete: params && params.onCheckComplete || false,
            onUploadError: Tickets.chooseFail.pbind(addMedia),
            onUploadCompleteAll: function(info) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] !== 'fileApi') {
                    if (params.hideOnStart) {
                        boxQueue.hideLast();
                    } else {
                        Upload.embed(i);
                    }
                }
            },

            multiple: 1,
            multi_progress: 1,
            max_files: params && params.max_files || 5,
            max_files_hide_last: 1,
            clear: 1,
            type: 'doc',
            max_attempts: 3,
            file_input: cur.uploadInput,
            server: opts.server,
            error: opts.default_error,
            error_hash: opts.error_hash,
            dropbox: 'tis_dropbox'
        });
    },

    showExtraFieldProgress: function(index, i, data, lnkId) {
        var frac = data.loaded / data.total,
            percent = intval(frac * 100),
            fileName = (data.fileName || data.name || '').replace(/[&<>"']/g, ''),
            ind = fileName ? i + '_' + fileName : i,
            label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

        var prg = ge('upload' + ind + '_progress');
        if (!prg) {
            hide('tickets_new_extra_field__upload_btn_' + index, 'tickets_new_extra_field__example_' + index);
            var container = ge('tickets_new_extra_field__uploaded_' + index);
            addClass(container, 'tickets_new_extra_field__uploaded_p');
            if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
            cur.attachMediaIndexes[ind] = lnkId;

            var progress = '\
<div><div class="page_attach_progress_wrap">\
  <div id="upload' + ind + '_progress" class="page_attach_progress"></div>\
</div></div></div>' + (label ? '<div class="attach_label">' + label + '</div>' : '') + '<div class="progress_x" onmouseover="showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\');"></div>';

            container.appendChild(ce('div', {
                id: 'upload' + ind + '_progress_wrap',
                innerHTML: progress,
                className: 'clear_fix upload_' + i + '_progress'
            }));
            show(container);
            prg = ge('upload' + ind + '_progress');
            prg.full = false;

            if (percent) {
                setStyle(prg, {
                    width: prg.full ? (intval(prg.full * frac) + 'px') : percent + '%'
                })
            } else {
                setStyle(prg, {
                    width: '1px'
                });
                hide(prg);
            }
        } else {
            show(prg);
            if (prg.full) {
                var tw = data(prg, 'tween'),
                    w = intval(prg.full * frac);
                if (tw && tw.isTweening) {
                    tw.to.width = w;
                } else {
                    animate(prg, {
                        width: w + 'px'
                    }, 500);
                }
            } else {
                setStyle(prg, {
                    width: percent + '%'
                });
            }
        }
    },

    initExtraFieldUpload: function(el, params) {
        el = ge(el);
        if (!el) return;
        var about = ge('tis_about');
        if (about) {
            about.innerHTML = getLang(params.withSize ? 'support_extra_field_limits_photo' : 'support_extra_field_limits');
        }
        var uploadData = cur.uploadExtraFieldsData,
            opts = uploadData.options,
            fieldIndex = params.fieldIndex;

        return Upload.init(el, uploadData.url, uploadData.vars, {
            file_name: 'file',

            file_size_limit: 1024 * 1024 * 10, // 10Mb
            file_types_description: 'Image files (*.jpg, *.jpeg, *.png)',
            file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG',
            accept: 'image/jpeg,image/png',
            file_match: '\.(jpg|jpeg|png)$',
            lang: opts.lang,

            onUploadStart: function(info, res) {
                var i = info.ind !== undefined ? info.ind : info,
                    options = Upload.options[i];
                if (Upload.types[i] == 'form') {
                    geByClass1('file', el).disabled = true;
                }
                if (Upload.types[i] == 'fileApi') {
                    if (cur.notStarted) {
                        if (params && params.hideOnStart) boxQueue.hideLast();
                        delete cur.notStarted;
                    }
                    if (options.multi_progress) this.onUploadProgress(info, 0, 0);
                }
            },
            onUploadComplete: function(info, res) {
                var params;
                try {
                    params = eval('(' + res + ')');
                } catch (e) {
                    params = q2ajx(res);
                }
                if (!params.photos) {
                    Upload.onUploadError(info);
                    return;
                }
                Tickets.chooseExtraFieldUploaded(fieldIndex, info, params);
            },
            onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] == 'fileApi') {
                    var lnkId = (cur.attachMediaIndexes || {})[i];
                    //if (lnkId === undefined || lnkId) { //  && cur.addMedia[lnkId].chosenMedia
                    var data = {
                        loaded: bytesLoaded,
                        total: bytesTotal
                    };
                    if (info.fileName) {
                        data.fileName = info.fileName.replace(/[&<>"']/g, '');
                    }

                    Tickets.showExtraFieldProgress(fieldIndex, i, data, lnkId);
                } else if (Upload.types[i] == 'flash') {
                    if (!ge('form' + i + '_progress')) {
                        var obj = Upload.obj[i],
                            objHeight = getSize(obj)[1],
                            tm = objHeight / 2 + 10;
                        var node = obj.firstChild;
                        while (node) {
                            if (node.nodeType == 1) {
                                if (node.id == 'uploader' + i && browser.msie) {
                                    setStyle(node, {
                                        position: 'relative',
                                        left: '-5000px'
                                    });
                                } else {
                                    setStyle(node, {
                                        visibility: 'hidden'
                                    });
                                }
                            }
                            node = node.nextSibling;
                        }
                        obj.appendChild(ce('div', {
                            innerHTML: '<div class="tickets_progress_wrap">\
          <div id="form' + i + '_progress" class="tickets_progress" style="width: 0%;"></div>\
        </div></div>'
                        }, {
                            height: tm + 'px',
                            marginTop: -tm + 'px'
                        }));
                    }
                    var percent = intval(bytesLoaded / bytesTotal * 100);
                    setStyle(ge('form' + i + '_progress'), {
                        width: percent + '%'
                    });
                }
            },
            onCheckComplete: false,
            onUploadError: function() {},
            onUploadCompleteAll: function(info) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] !== 'fileApi') {
                    if (params.hideOnStart) {
                        boxQueue.hideLast();
                    } else {
                        Upload.embed(i);
                    }
                }
            },
            multiple: false,
            multi_progress: 1,
            clear: 1,
            type: 'photo',
            max_attempts: 3,
            file_input: null,
            server: opts.server,
            error: opts.default_error,
            error_hash: opts.error_hash,
            dropbox: 'tis_dropbox'
        });
    },
    __getFormUploadIds: function(target) {
        switch (target) {
            case 'auto':
                return ['tis_upload_auto', 'tis_uploader_auto'];
            case 'template':
                return ['tis_upload_template', 'tis_uploader_template'];
            case 'edit':
                return ['tis_upload_edit', 'tis_uploader_edit'];
            case 'new':
            default:
                return ['tis_upload', 'tis_uploader'];
        }
    },
    __photoMediaHandler: function(opts) {
        var target = opts.target || 'new';
        stManager.add('upload.js', function() {
            if (opts.photoCallback) {
                //cur.lastAddMedia = addMedia;
                cur.lastMediaTarget = target;
                opts.photoCallback();
            } else if (opts.oneClick) {
                ge('tickets_photo_input' + target).click();
            } else {
                Tickets.showAddScreenBox(Tickets.initPhotoUpload.pbind('tis_add_data', {
                    hideOnStart: true,
                    target: target
                }));
            }
        });
    },
    __docMediaHandler: function(opts) {
        var target = opts.target || 'new';
        stManager.add('upload.js', function() {
            if (opts.docCallback) {
                cur.lastMediaTarget = target;
                opts.docCallback();
            } else if (opts.oneClick) {
                ge('tickets_doc_input' + target).click();
            } else {
                Tickets.showAddDocBox(Tickets.initDocUpload.pbind('tis_add_data', {
                    hideOnStart: true,
                    target: target,
                    disallowedFileTypes: cur.disallowedFileTypes
                }));
            }
        });
    },
    initAddMedia: function(lnk, previewId, mediaTypes, opts) {
        var addMedia = new MediaSelector(lnk, previewId, mediaTypes, extend(opts, {
            disabledTypes: ["share", "page"],
            mediaHandlers: {
                photo: Tickets.__photoMediaHandler,
                doc: Tickets.__docMediaHandler
            }
        }));
        if (opts.oneClick) {
            Tickets.__initOneClickMediaUpload('photo', opts, Tickets.initPhotoUpload);
            Tickets.__initOneClickMediaUpload('doc', opts, Tickets.initDocUpload);
        }
        return addMedia;
    },
    __initOneClickMediaUpload: function(type, opts, uploadCallback) {
        var target = opts.target || 'new',
            uploadInfo = Tickets.__getFormUploadIds(target),
            inputId = 'tickets_' + type + '_input' + target,
            inp = ge(inputId);

        if (!inp) {
            ge(uploadInfo[0]).appendChild(ce('input', {
                type: 'file',
                multiple: 'true',
                id: inputId,
                onchange: function() {
                    data(this, 'changed', true);
                    cur.uploadInput = this;
                    uploadCallback(uploadInfo[1], {
                        target: target
                    });
                }
            }));
        }
    },
    toggleFAQRow: function(id, hash, el, evt) {
        if (!evt.target) {
            evt.target = evt.srcElement || document;
        }
        if (evt.target.tagName.toLowerCase() == 'a') return true;
        toggle('tickets_faq_short_text' + id, !isVisible('tickets_faq_short_text' + id));
        toggle('tickets_faq_full_text' + id, !isVisible('tickets_faq_full_text' + id));
        if (isVisible('tickets_faq_full_text' + id)) {
            addClass(el, 'detailed');
            if (vk.id) {
                Tickets.setFAQclicked(id, hash, 0, false);
            }
        } else {
            removeClass(el, 'detailed');
            Tickets.cancelFAQclicked(id);
        }
        return false;
    },
    setFAQclicked: function(id, hash, fromNew, now) {
        if (now) {
            clearTimeout(cur.faqViewTimeouts[id]);
            cur.faqViewTimeouts[id] = null;
            ajax.post('support?act=a_faq_clicked', {
                faq_id: id,
                hash: hash,
                from_new: fromNew
            }, {
                cache: 1
            });
        } else if (!cur.faqViewTimeouts.hasOwnProperty(id)) {
            cur.faqViewTimeouts[id] = setTimeout(function() {
                ajax.post('support?act=a_faq_clicked', {
                    faq_id: id,
                    hash: hash,
                    from_new: fromNew
                }, {
                    cache: 1
                });
            }, 1500);
        }
    },

    cancelFAQclicked: function(id) {
        if (cur.faqViewTimeouts[id]) {
            clearTimeout(cur.faqViewTimeouts[id]);
            delete cur.faqViewTimeouts[id];
        }
    },
    rateFAQ: function(id, val, hash, fromNew, quiet) {
        if (!vk.id) return false;
        ajax.post('support?act=a_faq_rate', {
            faq_id: id,
            val: val,
            hash: hash,
            from_new: fromNew
        });
        Tickets.setFAQclicked(id, hash, fromNew, true);

        if (!quiet) {
            hide('tickets_faq_links' + id);
            if (val > 0) {
                show('tickets_faq_useful' + id);
            } else {
                var b = ge('tickets_faq_unuseful' + id),
                    btns = geByClass1('help_table_question_rated_additional__btns', b);
                show(b, geByClass1('help_table_question_rated_additional', b));
                hide(btns, geByClass1('help_table_question__rated_final', b), geByClass1('help_table_question__rated_no_perm', b));
                slideDown(btns, 200);
            }
        }
        return false;
    },
    getAskQuestionData: function(from) {
        if (from == 'faq_dislike' && cur.askQuestionFaqDislike) {
            return cur.askQuestionFaqDislike;
        }
        return cur.askQuestion;
    },
    rateFAQAdditional: function(id, additionalId, hash, act, bhash) {
        if (!vk.id) {
            return false;
        }
        var b = ge('tickets_faq_unuseful' + id);
        ajax.post('support?act=a_faq_rate_additional', {
            faq_id: id,
            additional_id: additionalId,
            hash: hash
        });
        hide(geByClass1('help_table_question_rated_additional', b));
        show(geByClass1('help_table_question__rated_final', b));
        if (additionalId == 2) {
            var askQuestion = Tickets.getAskQuestionData('faq_dislike');
            if (askQuestion.permission) {
                Tickets.tryAskQuestion(function() {
                    Tickets.goToForm(id, 'dislike', act, bhash);
                }, 'faq_dislike');
            } else if (!cur.isFaqTutorial || additionalId == 2) {
                hide(geByClass1('help_table_question__rated_final__t', b));
                show(geByClass1('help_table_question__rated_no_perm', b));
            }
        }
    },
    cancelRateFAQ: function(id, val, hash, evt) {
        if (!vk.id) return false;
        ajax.post('support?act=a_faq_rate', {
            faq_id: id,
            val: val,
            cancel: 1,
            hash: hash
        });
        hide('tickets_faq_useful' + id, 'tickets_faq_unuseful' + id);
        show('tickets_faq_links' + id);
        if (evt) {
            evt.stopPropagation();
        }
        return false;
    },
    rateFAQUrgent: function(id, val, hash) {
        if (!vk.id) return false;
        ajax.post('support?act=a_faq_rate', {
            faq_id: id,
            val: val,
            hash: hash,
            from_new: 1
        });
        Tickets.setFAQclicked(id, hash, 1, true);
        hide('tickets_faq_urgent_links' + id);
        if (val > 0) {
            show('tickets_faq_useful' + id);
            slideUp('tickets_new_wrap', 450);
        } else {
            show('tickets_faq_unuseful' + id);
        }
        return false;
    },
    cancelRateFAQUrgent: function(id, val, hash) {
        if (!vk.id) return false;
        ajax.post('support?act=a_faq_rate', {
            faq_id: id,
            val: val,
            cancel: 1,
            hash: hash
        });
        hide('tickets_faq_useful' + id, 'tickets_faq_unuseful' + id);
        show('tickets_faq_urgent_links' + id);
        var form = ge('tickets_new_wrap');
        if (!isVisible(form)) {
            slideDown(form, 500);
        }
        return false;
    },
    showAverageTime: function(time, confirmCallback) {
        if (cur.timeShown) {
            Tickets.toggleDetailedForm();
            return;
        }
        var msg = getLang('support_wait_message').replace(/\{time\}/g, time) + '<div class="tickets_wait_img"><img src="/images/pics/support_wait.png" /></div>';
        var box = showFastBox({
            title: getLang('support_average_wait_time'),
            width: 430,
            dark: true,
            bodyStyle: 'padding: 20px; line-height: 160%;'
        }, msg, getLang('support_ask_question'), function() {
            box.hide();
            cur.timeShown = true;
            confirmCallback();
        }, getLang('support_back_to_faq'));
    },
    toggleDetailedForm: function(force) {
        var title = ge('tickets_title');
        toggleClass(ge('tickets_content'), 'detailed');
        if (isVisible('tickets_detailed_form')) {
            title.setAttribute('placeholder', getLang('support_please_add_title'));
            removeClass(ge('tickets_search_reset'), 'shown');
            if (force) ge('tickets_text').focus();
        } else {
            title.setAttribute('placeholder', getLang('support_title_msg'));
            var str = trim(ge('tickets_title').value);
            if (str) {
                addClass(ge('tickets_search_reset'), 'shown');
            }
            cur.toggleCanceled = true;
            delete cur.toggled;
            Tickets.searchFAQ(str);
            title.focus();
        }
        placeholderSetup(ge('tickets_title'), {
            back: true,
            reload: true
        });
    },

    getSearchQuery: function() {
        var input = ge('tickets_title') || ge('faq_search_form__title');
        return input ? input.value : '';
    },

    getFormQuery: function(act, ask) {
        var q = {
            0: 'support',
            act: act,
            title: Tickets.getSearchQuery()
        };
        if (ask) q['ask'] = 1;
        return q;
    },

    switchToPayForm: function(event) {
        lockButton('tickets_create_pay');
        return nav.go(Tickets.getFormQuery('new_pay'), event);
    },

    switchToAdsForm: function(event, ask) {
        lockButton('tickets_create_ads');
        return nav.go(Tickets.getFormQuery('new_ads', ask), event);
    },

    switchToNameForm: function(event, ask) {
        lockButton('tickets_create_name');
        return nav.go(Tickets.getFormQuery('new_name', ask), event);
    },

    switchToApiForm: function(event, ask) {
        lockButton('tickets_create_api');
        return nav.go(Tickets.getFormQuery('new_api', ask), event);
    },

    switchToMobileForm: function(event, ask) {
        lockButton('tickets_create_mobile');
        return nav.go(Tickets.getFormQuery('new_mobile', ask), event);
    },

    updateFAQ: function(e, obj) {
        clearTimeout(cur.faqTimeout);
        cur.faqTimeout = setTimeout((function() {
            var origStr = obj.value,
                str = trim(origStr),
                words = str.split(' '),
                textInput = ge('tickets_text');

            if (origStr.length >= 70 && textInput && !textInput.value && !cur.flood) {
                if (!isVisible('tickets_detailed_form')) {
                    Tickets.toggleDetailedForm();
                    obj.value = '';
                    textInput.focus();
                    textInput.value = origStr;
                }
            }
            if (isVisible('tickets_detailed_form')) {
                return;
            }
            if (str == cur.searchStr && (words.length < 4 || words.length == 4 && origStr[origStr.length - 1] != ' ')) {
                return;
            }
            if (str) {
                addClass(ge('tickets_search_reset'), 'shown');
            } else {
                removeClass(ge('tickets_search_reset'), 'shown');
            }
            cur.searchStr = str;
            clearTimeout(cur.searchFAQTimeout);
            cur.searchFAQTimeout = setTimeout((function() {
                Tickets.searchFAQ(cur.searchStr);
            }).bind(this), 300);

            if (!browser.mobile) scrollToTop();
        }).bind(this), 10);
    },

    searchFAQ: function(v) {
        if (v[v.length - 1] == ' ') {
            v[v.length - 1] = '_';
        }
        addClass(ge('tickets_search'), 'loading');
        setStyle(ge('tickets_search_reset'), {
            opacity: .6
        });
        var query = extend({
            q: v,
            from: nav.objLoc.act
        }, Tickets.getFromObjLoc(['group_id', 'app_id', 'union_id']));

        if (cur.tlmd && cur.showAll) {
            delete cur.showAll;
            query.show_all = 1;
            if (cur.from_ads) {
                query.from = 'ads';
            }
        }
        ajax.post('support?act=a_get_faq', query, {
            cache: 1,
            hideProgress: removeClass.pbind('tickets_search', 'loading'),
            onDone: function(cont, button) {
                var origStr = val('tickets_title'),
                    words = trim(origStr).split(' '),
                    needToggle = false;
                if (!cur.toggleCanceled && (words.length > 4 || words.length == 4 && origStr[origStr.length - 1] == ' ') && !cur.flood) needToggle = true;
                if (cont) {
                    val('tickets_faq_list', ce('div', {
                        innerHTML: cont
                    }).firstChild.innerHTML);
                } else {
                    if (button) {
                        val('tickets_faq_button', button);
                    }
                    if (needToggle) {
                        cur.toggled = true;
                        Tickets.toggleDetailedForm();
                    }
                }
                if (cur.tlmd) {
                    if (v) {
                        extend(nav.objLoc, {
                            q: v
                        });
                    } else {
                        delete nav.objLoc.q;
                    }
                    if (nav.objLoc.act == 'faq') {
                        var title = v ? v : getLang('support_page_title');
                        if (!vk.id) {
                            title += ' | ' + getLang('global_vkontakte');
                        }
                        document.title = title;
                    }
                    nav.setLoc(nav.objLoc);
                }
            }
        });
    },

    clearSearch: function(el, event) {
        var field = ge('tickets_title');
        setStyle(el, {
            opacity: .6
        });
        field.value = '';
        ge('tickets_title').focus();
        Tickets.updateFAQ(event, field);
    },
    checkOut: function(el, mid) {
        checkbox(el.firstChild);
    },
    getCheckedArr: function() {
        var tickets = [];
        if (isObject(cur.checkedTickets)) {
            each(cur.checkedTickets, function(i, v) {
                tickets.push(i)
            });
        }
        return tickets;
    },
    updateChecked: function() {
        if (ge('tickets_search_options')) {
            var tickets = Tickets.getCheckedArr(),
                c = tickets.length;
            var tSearch = ge('tickets_all_search'),
                tSelected = ge('tickets_all_selected');

            if (c) {
                if (isVisible(tSearch)) {
                    slideUp(tSearch, 200);
                }
                ge('t_n_marked').innerHTML = langNumeric(c, cur.lang.x_tickets_checked, true);
                if (!isVisible(tSelected)) {
                    slideDown(tSelected, 200);
                }
            } else {
                if (!isVisible(tSearch)) {
                    slideDown(tSearch, 200);
                }
                if (isVisible(tSelected)) {
                    slideUp(tSelected, 200);
                }
            }
        }
    },
    checkChange: function(el, mid) {
        var chb = geByClass1('checkbox', el);
        if (cur.checkedTickets[mid]) {
            delete cur.checkedTickets[mid];
            checkbox(chb, 0);
        } else {
            cur.checkedTickets[mid] = true;
            checkbox(chb, 1);
        }
        this.updateChecked();
    },
    saveDraft: function(ticket_id, evType) {
        var txt = ge('tickets_reply');
        if (browser.mobile || !txt || txt.disabled || !cur.canUseDrafts) return;

        var message = val(txt),
            data = {
                txt: trim(message),
                medias: []
            },
            m = (cur.ticketsNewMedia || {}).chosenMedias || [];

        for (var i = 0, l = m.length; i < l; ++i) {
            if (m[i]) data.medias.push([m[i][0], m[i][1]]);
        }
        if (!data.medias.length && !data.txt.length) {
            data = false;
        }
        ls.set('helpdesk_draft' + vk.id + '_' + ticket_id, data);

        if (txt && cur.ticketsNewMedia && (evType == 'paste' || evType == 'keyup')) {
            cur.ticketsNewMedia.checkMessageURLs(message, evType != 'keyup');
        }
    },
    listToggleQuestion: function(e, id, hash) {
        if (checkEvent(e)) {
            return true;
        }
        var question = e.target.parentNode;
        var ans = geByClass1('help_table_question__ans', question);

        if (isVisible(ans)) {
            removeClass(question, 'help_table_question_visible');
            slideUp(ans, 200);
            Tickets.cancelFAQclicked(id);
        } else {
            addClass(question, 'help_table_question_visible');
            slideDown(ans, 200);
            Tickets.setFAQclicked(id, hash, 1, false);
        }
        return false;
    },
    listToggleUnusefulButton: function(v) {
        toggle(ge('tickets_unuseful'), v);
    },
    listShowAltButton: function(altButtonId) {
        each(geByClass('secondary', ge('help_table_questions_btn')), function(i, e) {
            if (altButtonId == '' || e.id != altButtonId) {
                hide(e);
            } else {
                show(e);
            }
        });
    },
    updateSearchSuggests: function(v) {
        el = this;
        v = trim(v);
        var form = ge('faq_search_form');
        if (form.hideTimeout) {
            clearTimeout(form.hideTimeout);
            form.hideTimeout = null;
        }
        if (form.searchTimeout) {
            clearTimeout(form.searchTimeout);
            form.searchTimeout = null;
        }
        if (!v) {
            removeClass(form, 'faq_search_form_with_suggests', v);
            hide('faq_search_form_suggests');
            return;
        }
        form.searchTimeout = setTimeout(function() {
            var suggests = ge('faq_search_form_suggests');
            if (!suggests) {
                suggests = ce('div', {
                    id: 'faq_search_form_suggests',
                    className: 'tickets_suggests'
                });
                form.appendChild(suggests);
                hide(suggests);
            }
            ajax.post('support?act=a_load_faq_suggests', {
                q: v,
                section: cur.searchSection,
                union_id: nav.objLoc['union_id']
            }, {
                cache: 1,
                onDone: function(html) {
                    if (html) {
                        show(suggests);
                        addClass(form, 'faq_search_form_with_suggests', v);
                    }
                    val(suggests, html);
                },
                showProgress: uiSearch.showProgress.pbind(el),
                hideProgress: uiSearch.hideProgress.pbind(el)
            });
        }, 200);
    },
    hideSearchSuggests: function() {
        var form = ge('faq_search_form');
        form.hideTimeout = setTimeout(function() {
            clearTimeout(form.hideTimeout);
            form.hideTimeout = null;
            hide('faq_search_form_suggests');
            removeClass(form, 'faq_search_form_with_suggests');
        }, 500);
    },
    goToSearchResult: function(el, val) {
        val = trim(val);
        if (val || nav.objLoc['act'] == 'faqs') {
            var objLoc = {
                0: cur.objLoc,
                act: cur.faqsAct
            };
            if (val) {
                objLoc['q'] = val;
            }
            if (nav.objLoc['union_id']) {
                objLoc['union_id'] = nav.objLoc['union_id'];
            }
            nav.go(objLoc);
        }
    },
    goToForm: function(from_faq_id, from, act, bhash) {
        var urlParams = '',
            n = {
                0: 'support',
                act: act
            };
        if (from_faq_id) {
            n['id'] = from_faq_id;
        } else {
            var titleInput = uiSearch.getFieldEl('faq_search_form'),
                title = '';
            if (titleInput) {
                title = trim(val(titleInput));
                if (title !== '') {
                    n['title'] = title;
                }
            }
        }
        if (from) {
            n['from'] = from;
        }
        if (bhash) {
            n['bhash'] = bhash;
        }
        nav.go(extend(n, Tickets.getFromObjLoc(['union_id', 'app_id', 'group_id'])));
        return false;
    },
    listScrollToQuestion: function(questionId) {
        var question = null;
        if (questionId) {
            question = ge('help_table_question_' + questionId);
        }
        if (question) {
            scrollToY(getXY(question)[1] - 10);
            if (!hasClass(question, 'help_table_question_visible')) {
                addClass(question, 'help_table_question_visible');
            }
            var ans = geByClass1('help_table_question__ans', question);
            if (!isVisible(ans)) {
                show(ans);
            }
        }
    },
    tryAskQuestion: function(callback, from) {
        var s = 2,
            askQuestion = Tickets.getAskQuestionData(from);

        if (askQuestion) {
            s = askQuestion.permission;
        }
        if (!s) {
            setTimeout(showFastBox({
                dark: 1,
                bodyStyle: 'line-height: 160%;',
                title: getLang('global_error')
            }, getLang('support_flood_error')).hide, 4000);
        } else if (s == 1) {
            Tickets.showAverageTime(askQuestion.time, callback);
            return false;
        } else {
            callback();
        }
        return false;
    },
    listNotFoundVisible: function() {
        return hasClass('help_table_questions', 'help_table_questions_not_found');
    },
    listHideNotFound: function() {
        removeClass('help_table_questions', 'help_table_questions_not_found');
    },
    loadTickets: function() {
        var progress = ge('tickets_list_load_more'),
            progressY = getXY(progress)[1],
            screenY = scrollGetY();

        var inScreen = screenY <= progressY && progressY <= screenY + window.innerHeight;
        if (!inScreen || cur.ticketsLoading || !cur.ticketsLoadMore) {
            return;
        }
        var params = {
            act: '',
            offset: cur.ticketsOffset,
            load: 1
        };
        if (nav.objLoc['union_id']) {
            params['union_id'] = nav.objLoc['union_id'];
        }
        if (nav.objLoc['app_id']) {
            params['app_id'] = nav.objLoc['app_id'];
        }
        ajax.post('support', params, {
            showProgress: function() {
                addClass(progress, 'tickets_list_load_more_loading');
                cur.ticketsLoading = true;
            },
            hideProgress: function() {
                removeClass(progress, 'tickets_list_load_more_loading');
                cur.ticketsLoading = false;
            },
            onDone: function(rows, newOffset, loadMore) {
                cur.ticketsOffset = newOffset;
                cur.ticketsLoadMore = loadMore;
                var l = ge('tickets_list');
                removeClass(l.lastChild, 'last');
                var rowsArr = sech(rows);
                each(rowsArr, function(i, el) {
                    l.appendChild(el);
                });
                Tickets.loadTickets();
            }
        });
    },
    closeMobileNotice: function(hash) {
        slideUp('tickets_mobile_notice', 200);
        ajax.post('support?act=a_hide_mobile_notice', {
            hash: hash
        });
    },
    listClearCache: function() {
        var obj = nav.objLoc;
        obj['cc'] = 1;
        nav.go(obj);
    },
    storeOutdatedLeft: function(ticket_id) {
        ls.set('support_outdated_left', {
            id: ticket_id,
            ts: Math.floor((new Date()).getTime() / 1000)
        });
        console.log('Win');
    },
    tutorialSelect: function(btn, id, noActions) {
        if (cur.tutorialProcessing) {
            return;
        }
        ajax.post('support?act=tutorial', {
            id: id,
            load: 1,
            ban: nav.objLoc['ban'] || 0,
            no_actions: noActions
        }, {
            showProgress: function() {
                cur.tutorialProcessing = true;
                lockButton(btn);
            },
            hideProgress: function() {
                cur.tutorialProcessing = false;
                unlockButton(btn);
            },
            onDone: function(html, js) {
                var el = ge('support_tutorial_container') || ge('content');
                val(el, html);
                if (js) {
                    eval(js);
                }
                scrollToY(getXY('help_table_question_' + id)[1]);
            }
        });
    },
    showTicketLockedTT: function(el, text) {
        showTooltip(el, {
            dir: 'bottom',
            text: text,
            typeClass: 'tt_black',
            shift: [15, 10, 0]
        });
    },
    toggleQuestionHider: function(btn) {
        var pn = domPN(domPN(btn)),
            body = geByClass1('wk_hider_body', pn);
        toggleClass(pn, 'wk_hider_box');
        toggleClass(pn, 'wk_hider_box_opened');
        if (hasClass(pn, 'wk_hider_box_opened')) {
            slideDown(body, 200);
        } else {
            slideUp(body, 200);
        }
    },
    payoutFormTT: function(el, txt) {
        showTooltip(el, {
            text: txt,
            dir: 'bottom',
            forcetoup: true
        });
    },
    _eof: 1
};

var TicketsEF = {
    _getInput: function(index) {
        return ge('tickets_new_extra_field_' + index + '_inp');
    },
    _getValues: function(index) {
        return cur.extraFieldsValues[index];
    },
    init: function() {
        TicketsEF._runOverAll(function(container, index) {
            var inp = TicketsEF._getInput(index),
                efNote = cur.extraFieldsNotes[index],
                efValues = TicketsEF._getValues(index);
            var type = TicketsEF._getType(container, inp, efValues);
            data(container, 'ef-type', type);
            switch (type) {
                case 'plain':
                    TicketsEF._initPlain(container, inp, efNote);
                    break;
                case 'select':
                    TicketsEF._initSelect(container, inp, efNote, efValues);
                    break;
                case 'radio':
                    TicketsEF._initRadio(container, inp, index);
                    break;
                case 'date':
                    TicketsEF._initDate(container, inp);
                    break;
                case 'datetime':
                    TicketsEF._initDatetime(container, inp);
                    break;
                case 'checkbox':
                    break;
                case 'hidden':
                    break;
                default:
                    console.log('Failed to define type of field=%s', index);
                    break;
            }
        });
        TicketsEF._checkBlocking();
    },
    _runOverAll: function(callback) {
        if (!callback) {
            return;
        }
        var efContainer = ge('tickets_new_extra_fields'),
            efRows = efContainer ? geByClass('_extra_field', efContainer) : [];
        each(efRows, function(k, container) {
            callback(container, attr(container, 'ef-index'));
        });
    },
    _getType: function(container, inp, values) {
        if (inp) {
            if (hasClass(inp, '_date')) {
                if (geByClass1('_time', container)) {
                    return 'datetime';
                }
                return 'date';
            }
            if (values.length > 0) {
                return 'select';
            } else if (container && geByClass1('checkbox', container)) {
                return 'checkbox';
            } else {
                return 'plain';
            }
        } else if (container && geByClass1('radiobtn', container)) {
            return 'radio';
        }
        return 'hidden';
    },
    _getDefinedType: function(container) {
        return data(container, 'ef-type');
    },
    _initPlain: function(container, inp, note) {
        if (!inp) {
            data(container, 'value', '');
            return;
        }
        if (!note || note === '') {
            return;
        }
        addEvent(inp, 'focus', function(event) {
            var inp = event.target;
            Tickets.showTooltip(inp, note, 'extra_field', true, true);
        });
        addEvent(inp, 'blur', Tickets.hideTooltip.pbind(inp));
    },
    _initSelect: function(container, inp, note, values) {
        if (!inp) {
            data(container, 'value', '');
            return;
        }
        var placeholder = attr(inp, 'placeholder'),
            dd = new Dropdown(inp, values, {
                introText: placeholder,
                placeholder: placeholder,
                width: getSize(inp)[0],
                big: 1,
                autocomplete: true,
                multiselect: false,
                zeroPlaceholder: true
            });
        data(container, 'dd', dd);
    },
    _getRadioName: function(index) {
        return 'efRadio' + index;
    },
    _getCheckbox: function(container) {
        return container.querySelector('.checkbox');
    },
    _initRadio: function(container, inp, index) {
        var selectedEl = geByClass1('on', container);
        window.radioBtns[TicketsEF._getRadioName(index)] = {
            val: selectedEl ? intval(attr(selectedEl, 'ef-value')) : '',
            els: geByClass('radiobtn', container)
        };
    },
    _initDatetime: function(container, inp, note) {
        var timeEl = geByClass1('_time', container);
        new Datepicker(inp, {
            time: timeEl,
            width: 207
        });
        if (note !== '') {
            addEvent(container, 'focus', function(event) {
                Tickets.showTooltip(container, note, 'extra_field', true, true);
            });
        }
    },
    _initDate: function(container, inp) {
        var note = attr(inp, 'placeholder').toString();
        new Datepicker(inp, {
            width: 348
        });
        if (note !== '') {
            addEvent(container, 'focus', function(event) {
                Tickets.showTooltip(container, note, 'extra_field', true, true);
            });
        }
    },
    radioClick: function(el) {
        var container = gpeByClass('_extra_field', el);
        if (!container) {
            return;
        }
        radiobtn(el, attr(el, 'ef-value'), TicketsEF._getRadioName(attr(container, 'ef-index')));
        TicketsEF._checkBlocking();
        TicketsEF._checkVisible();
    },
    _checkBlocking: function() {
        var needToBlock = false;
        TicketsEF._runOverAll(function(container, index) {
            if (!isVisible(container)) {
                return;
            }
            if (TicketsEF._isBlocking(container, index)) {
                needToBlock = true;
            }
        });
        toggle('tickets_new_controls', !needToBlock);
    },
    _checkVisible: function() {
        TicketsEF._runOverAll(function(container, index) {
            var visibleRequired = cur.extraFieldsVisible[index];
            if (!visibleRequired) {
                return;
            }
            var setVisible = true;
            each(visibleRequired, function(fieldIndex, visibleValues) {
                if (fieldIndex === '_') {
                    return;
                }
                var fieldV = TicketsEF._getValueByIndex(fieldIndex);
                if (fieldV === '' || !inArray(intval(fieldV), visibleValues)) {
                    setVisible = false;
                }
            });
            toggle(container, setVisible);
        });
    },
    _isBlocking: function(container, index) {
        var inp = TicketsEF._getInput(index),
            values = TicketsEF._getValues(index),
            type = TicketsEF._getDefinedType(container, inp, values);
        if (type == 'radio') {
            var v = intval(radioval(TicketsEF._getRadioName(index))),
                blocking = cur.extraFieldsBlocking[index];
            return inArray(v, blocking);
        }
        return false;
    },
    _getValueByIndex: function(index) {
        var container = ge('tickets_new_extra_field_' + index),
            inp = TicketsEF._getInput(index);
        if (!container) {
            return '';
        }
        return TicketsEF._getValue(container, index, inp, TicketsEF._getDefinedType(container, inp, TicketsEF._getValues(index)));
    },
    _getValue: function(container, index, inp, type) {
        var v = '';
        switch (type) {
            case 'plain':
            case 'date':
            case 'datetime':
                v = trim(val(inp));
                break;
            case 'select':
                var dd = container ? data(container, 'dd') : null;
                if (dd) {
                    v = dd.val();
                }
                break;
            case 'radio':
                v = radioval(TicketsEF._getRadioName(index));
                break;
            case 'checkbox':
                v = isChecked(TicketsEF._getCheckbox(container));
                break;
            case 'hidden':
                v = data(container, 'value');
                break;
        }
        return v;
    },
    _getNotableBlock: function(container, inp, type) {
        var block = inp;
        switch (type) {
            case 'select':
                var dd = data(container, 'dd');
                if (dd) {
                    block = dd.container;
                }
                break;
            case 'radio':
            case 'hidden':
                block = container;
                break;
        }
        return block;
    },
    /**
     * @returns {boolean|object}
     */
    getValues: function() {
        var query = {},
            fieldsValid = true;
        TicketsEF._runOverAll(function(container, index) {
            var inp = TicketsEF._getInput(index),
                required = hasClass(container, '_ef_required'),
                checkUrl = hasClass(container, '_ef_check_url');

            if (!isVisible(container) || hasClass(container, '_ef_note')) {
                return;
            }
            var type = TicketsEF._getDefinedType(container, inp, TicketsEF._getValues(index)),
                v = TicketsEF._getValue(container, index, inp, type);

            if (required && (v === '' || (checkUrl && v.indexOf('vk.com') == -1) || TicketsEF._isBlocking(container, index))) {
                var notableBlock = TicketsEF._getNotableBlock(container, inp, type);
                if (notableBlock) {
                    notaBene(notableBlock, false, !fieldsValid);
                }
                fieldsValid = false;
            }
            query['extra_field_' + index] = v;
        });
        return fieldsValid ? query : false;
    }
};
try {
    stManager.done('tickets.js');
} catch (e) {}