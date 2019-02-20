var Join = {
    show: function(el) {
        if (!isVisible(el)) slideDown(el, 150);
    },
    hide: function(el) {
        if (isVisible(el)) slideUp(el, 150);
    },

    scrollnode: function() {
        return browser.msie6 ? pageNode : window;
    },
    scrollResize: function(e, pp) {
        if (browser.mobile && !browser.safari_mobile) return;

        var de = document.documentElement,
            st = scrollGetY();

        if (pp === true) {
            cur.nextButtonTop = getXY(cur.nextButtonWrap)[1];
            if (browser.msie6) cur.nextButtonTop += st;
        }
        var needDock = cur.resultShown && (st + lastWindowHeight < cur.nextButtonTop + cur.nextButtonHeight + intval(getStyle('content', 'marginTop')) + ge('page_header_cont').offsetHeight - 8);
        if (needDock && !cur.docked) {
            addClass(cur.nextButton, 'fixed');
            if (browser.msie6) {
                bodyNode.appendChild(cur.nextButton);
                e = {
                    type: 'resize'
                };
            }
            cur.docked = true;
        } else if (!needDock && cur.docked) {
            removeClass(cur.nextButton, 'fixed');
            if (browser.msie6) {
                cur.nextButtonWrap.appendChild(cur.nextButton);
            }
            cur.docked = false;
        }
        if (cur.docked && e && e.type == 'resize') {
            if (browser.msie6) {
                cur.nextButton.style.left = getXY(ge('content'))[0] + 'px';
            } else {
                cur.nextButton.style.left = (ge('page_layout').offsetLeft + ge('content').offsetLeft) + 'px';
                setTimeout(Join.nextResetStyle, 0);
            }
        }
    },
    nextResetStyle: function() {
        cur.nextButton.style.left = '';
    },
    initScroll: function() {
        extend(cur, {
            nextButton: ge('join_' + cur.section + '_next'),
            nextButtonWrap: ge('join_' + cur.section + '_next_wrap'),
            resultEl: ge('join_' + cur.section + '_result')
        });
        cur.nextButtonHeight = getSize(cur.nextButton)[1];
        cur.nextButtonWrap.style.height = cur.nextButtonHeight + 'px';
        cur.resultShown = isVisible(cur.resultEl);
        Join.scrollResize(false, true);

        addEvent(Join.scrollnode(), 'scroll', Join.scrollResize);
        addEvent(window, 'resize', Join.scrollResize);
        cur.destroy.push(function(c) {
            removeEvent(Join.scrollnode(), 'scroll', Join.scrollResize);
            removeEvent(window, 'resize', Join.scrollResize);
            if (browser.msie6) c.nextButtonWrap.appendChild(c.nextButton);
        });
    },

    showProgress: function() {
        if (isVisible(cur.resultEl)) {
            var summary = ge('join_' + cur.section + '_summary');
            if (!summary.lastChild || !hasClass(summary.lastChild, 'progress_inline')) {
                summary.appendChild(ce('span', {
                    className: 'progress_inline join_summary_prg'
                }));
            }
        } else {
            show('join_' + cur.section + '_none_prg');
            cur.noneEl.style.visibility = 'hidden';
        }
    },
    hideProgress: function() {
        if (isVisible(cur.resultEl)) {
            var summary = ge('join_' + cur.section + '_summary');
            if (summary.lastChild && hasClass(summary.lastChild, 'progress_inline')) {
                re(summary.lastChild);
            }
        } else {
            cur.noneEl.style.visibility = '';
            hide('join_' + cur.section + '_none_prg');
        }
    },

    addFriendLogged: function(btn, mid, hash) {
        ajax.post('al_friends.php', {
            act: 'add',
            mid: mid,
            hash: hash,
            from: 'fb_sign'
        }, {
            onDone: function() {
                hide('join_add' + mid);
                show('join_request' + mid);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    removeFriendLogged: function(btn, mid, hash) {
        ajax.post('al_friends.php', {
            act: 'remove',
            mid: mid,
            hash: hash,
            from: 'fb_sign'
        }, {
            onDone: function() {
                show('join_add' + mid);
                hide('join_request' + mid);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    isPhoneCall: function() {
        return cur.validationType == 3 || cur.validationType == 4;
    },
    phoneDone: function(phone, cntr) {
        if (phone) {
            var phoneEl = ge('join_phone');
            if (cur.uiPhoneCountry) {
                cur.uiPhoneCountry.val(cntr, true);
            }
            val(phoneEl, phone);
            phoneEl.readOnly = true;
            if (cur.uiPhoneCountry) {
                cur.uiPhoneCountry.disable(true);
                addClass('join_phone_prefixed', 'join_readonly_wrap');
            }
            addClass(phoneEl, 'join_readonly');
        }
        if (cur.resendInt) {
            clearInterval(cur.resendInt);
        }
        cur.resendInt = setInterval(Join.resendUpdate, 1000);
        show('join_code_submit', 'join_other_phone', 'join_resend');
        hide('join_phone_submit');
        if (Join.isPhoneCall()) {
            val(ge('join_called_phone_prefix').firstChild, '');
            val('join_called_phone', '');
            hide('join_code_row');
            slideDown('join_called_phone_row', 150, elfocus.pbind('join_called_phone'));
        } else {
            if (isVisible('join_called_phone_row')) {
                hide('join_called_phone_row');
                show('join_code_row');
                setTimeout(elfocus.pbind('join_code'), 100);
            } else {
                slideDown('join_code_row', 150, elfocus.pbind('join_code'));
            }
        }
        val('join_submit_result', '');
        val('join_code', '');
        Join.initPhoneCode();
    },
    checkStatus: function(phone, cntr) {
        var box = curBox(),
            shprg = box ? box.showProgress : lockButton.pbind('join_send_phone'),
            hdprg = box ? box.hideProgress : unlockButton.pbind('join_send_phone');
        if (!cur.checkingStatus) {
            shprg();
            cur.checkingStatus = 1;
            cur.destroy.push(function() {
                clearTimeout(cur.checkingTimer);
                hdprg();
            });
        } else if (cur.checkingStatus < 0) {
            shprg();
            cur.checkingStatus = 1;
        } else {
            ++cur.checkingStatus;
            if (cur.checkingStatus > 4) {
                cur.checkingStatus = -1;
                hdprg();
                return Join.phoneDone(phone, cntr);
            }
        }
        cur.checkingTimer = setTimeout(ajax.post('join.php', {
            act: 'phone_check'
        }, {
            onDone: function(ok) {
                if (ok || cur.checkingStatus > 3) {
                    cur.checkingStatus = -1;
                    hdprg();
                    return Join.phoneDone(phone, cntr);
                }
                cur.checkingTimer = setTimeout(Join.checkStatus.pbind(phone, cntr), 2000);
            },
            onFail: function(text) {
                cur.checkingStatus = -1;
                hdprg();
                if (!text) return Join.phoneDone(phone, cntr);

                Join.showMsg('join_submit_result', text, elfocus.pbind('join_phone'));
                return true;
            }
        }), 1000);
    },
    submitPhone: function(force) {
        if (!force && buttonLocked('join_send_phone')) return;
        if (!Join.policyChecked()) {
            notaBene('join_accept_terms_checkbox');
            return;
        }

        var phoneEl = ge('join_phone'),
            phone = Join.getPhone(),
            phoneInputVal = val('join_phone'),
            cntr = cur.uiPhoneCountry ? cur.uiPhoneCountry.val_full() : false;
        if (phoneEl.disabled) return elfocus('join_code');

        ajax.post('join.php', {
            act: 'phone',
            phone: phone,
            hash: cur.hash
        }, {
            showProgress: lockButton.pbind('join_send_phone'),
            hideProgress: unlockButton.pbind('join_send_phone'),
            onDone: function(needCheck, boxBody, strong, resendDelay, type) {
                if (needCheck) {
                    lockButton('join_send_phone');
                    setTimeout(Join.submitPhone.pbind(true), 1000);
                    return;
                }
                if (cur.strongCode !== strong) {
                    var tip = ge('join_code').tt;
                    if (tip) tip.destroy();
                    cur.strongCode = strong;
                }
                cur.validationType = type;
                cur.resendDelay = resendDelay;
                Join.phoneDone(phoneInputVal, cntr);
                Join.resendUpdate();
            },
            onFail: function(text) {
                if (!text) return;
                var el = ge('join_phone');
                if (el && el.tt && el.tt.hide) {
                    el.tt.hide({
                        fasthide: true
                    });
                }
                Join.showMsg('join_submit_result', text, elfocus.pbind('join_phone'));
                return true;
            }
        });
    },
    updateStrength: function() {
        var pwd = val('join_pass'),
            level = -1,
            pwds = ['qwerty', '������', 'gfhjkm', '������', 'password', 'abc123', 'fuckyou', '123abc', 'baseball', 'football', 'soccer', 'monkey', 'liverpool', 'princess', 'jordan', 'slipknot', 'superman', 'iloveyou'];
        if (pwd != pwd.replace(/\s/g, '')) {
            val('join_pass', pwd = pwd.replace(/\s/g, ''));
            elfocus('join_pass');
        }
        if (pwd.length < 6) {
            level = 0;
        } else if (pwd.match(/^\d+$/) || indexOf(pwds, pwd) >= 0 || pwd.substr(-1).match(/\d/) && pwds.indexOf(pwd.substr(0, pwd.length - 1)) >= 0) {
            level = 1;
        } else {
            var groups = [/[^a-z]/g, /[^A-Z]/g, /[^�-��]/g, /[^�-ߨ]/g, /[^0-9]/g, /[a-zA-Z�-��-߸�0-9]/g],
                cnts = [],
                big = 0;
            for (var i = 0, c = groups.length; i < c; ++i) {
                var l = pwd.replace(groups[i], '').length;
                if (l) {
                    if (l > 1) ++big;
                    cnts.push({
                        group: i,
                        cnt: l
                    });
                }
            }
            if (cnts.length < 3) {
                if (cnts[cnts.length - 1].group != groups.length - 1 && big < 2) {
                    level = 2;
                }
            }
            if (big > 2 || cnts.length > 2 && cnts[cnts.length - 1].group == groups.length - 1) {
                level = 4;
            }
            if (level < 0 && big > 1) {
                var symbs = pwd.replace(groups[groups.length - 1], '');
                if (symbs.length > 1 && symbs.replace(new RegExp(escapeRE(symbs.charAt(0)), 'g'), '').length) {
                    level = 4;
                }
            }
            if (level < 0) {
                level = 3;
            }
            if (level && level < 3 && pwd.length > 13) ++level;
        }
        ge('join_about_pass').className = 'join_pwd_level' + level;
        ge('join_pass_strength').innerHTML = pwd ? getLang('join_pwd_level' + level) : getLang('join_pwd_min_length');
        setQuickLoginData((cur.fbSign && cur.fbValid) ? cur.fbEmail : Join.getPhone(), pwd, {
            params: cur.joinParams
        });
    },
    initPhoneCode: function() {
        if (cur.codeForm) return;
        setQuickLoginData(Join.getPhone(), '', {
            params: cur.joinParams
        });
        var el = utilsNode.appendChild(ce('div', {
            innerHTML: '\
<form method="POST" action="' + vk.loginscheme + '://' + cur.loginHost + '/?act=check_code&_origin=' + locProtocol + '//' + locHost + '" id="join_code_form" name="join_code_form" target="join_code_frame">\
  <input type="hidden" name="email" id="join_code_phone" />\
  <input type="hidden" name="code" id="join_code_code" />\
  <input type="hidden" name="call" id="join_code_call" />\
  <input type="hidden" name="recaptcha" id="join_code_recaptcha" />\
  <input type="hidden" name="captcha_sid" id="join_code_sid" />\
  <input type="hidden" name="captcha_key" id="join_code_key" />\
</form>\
<iframe id="join_code_frame" name="join_code_frame"></iframe>\
'
        }));
        cur.codeForm = ge('join_code_form');
        cur.codeFrame = ge('join_code_frame');
    },
    initPhoneCountry: function(countries, country) {
        cur.countries = countries;
        cur.defCountry = country;
        cur.uiPhoneCountry = new Dropdown(ge('join_phone_country'), cur.countries, {
            selectedItems: country,
            big_text: true,
            disablePlaceholder: true,
            liteEventsBind: true,
            autocomplete: true,
            multiselect: false,
            onChange: function(v) {
                var ph = ge('join_phone');
                var pref = ge('join_phone_prefix').firstChild;
                var code = cur.uiPhoneCountry.val_full()[3];

                if (ph.readOnly || v === 0 || v === '0' || v === '' || v === false || v === undefined) {
                    var c = val(pref);
                    if (code == c) return;
                    for (var i = 0, l = cur.countries.length; i < l; ++i) {
                        if (cur.countries[i][3] == c) {
                            return cur.uiPhoneCountry.val(cur.countries[i]);
                        }
                    }
                    return cur.uiPhoneCountry.val(cur.defCountry, true);
                }

                val(pref, code);
                if (ge('join_called_phone_row')) {
                    val(geByClass1('join_text', 'content'), getLang(!inArray(v[0], cur.calledPhoneExcludeCountries) ? 'join_about_phone_with_call' : 'join_about_phone'));
                }
                Join.updatePolicyLink(cur.uiPhoneCountry.val());
            }
        });
        if (ge('join_phone').readOnly) {
            cur.uiPhoneCountry.disable(true);
        }
        cur.destroy.push(cur.uiPhoneCountry.destroy.bind(cur.uiPhoneCountry));
    },
    getPhone: function() {
        var phone = trim(val('join_phone')),
            prefix = trim(val((ge('join_phone_prefix') || {}).firstChild) || '');
        return prefix + phone;
    },
    submitPhoneCode: function() {
        if (!cur.codeForm || buttonLocked('join_send_code')) return;
        if (!Join.policyChecked()) {
            notaBene('join_accept_terms_checkbox');
            return;
        }

        var codeField, codeFieldWrap, codeLen;
        if (Join.isPhoneCall()) {
            codeField = 'join_called_phone';
            codeFieldWrap = 'join_called_phone_prefixed';
            codeLen = cur.calledPhoneLen;
        } else {
            codeField = 'join_code';
            codeFieldWrap = codeField;
            codeLen = 5;
        }

        var code = trim(val(codeField)).replace(/[^a-z0-9]/g, '');
        if (code.length < codeLen) {
            return notaBene(codeFieldWrap);
        }
        if (code == '05937') {
            return Join.showMsg('join_submit_result', getLang('join_sorry_code'), elfocus.pbind('join_code', false, false));
        }
        val('join_code_phone', Join.getPhone());
        val('join_code_code', code);
        if (Join.isPhoneCall()) {
            val('join_code_call', vk.id ? -vk.id : getCookie('remixnreg_sid'));
        }
        lockButton('join_send_code');
        cur.codeForm.submit();
    },
    policyChecked: function() {
        var el = geByClass1('checkbox', 'join_accept_terms_checkbox');
        return isChecked(el);
    },
    togglePhoneSubmit: function() {
        var policyChecked = Join.policyChecked();
        disableButton(ge('join_send_phone'), !policyChecked);
        disableButton(ge('join_send_code'), !policyChecked);
        disableButton(ge('join_send_pass'), !policyChecked);
    },

    askPassword: function(hash, sureBox) {
        if (curBox()) curBox().hide();
        cur.sureBoxText = sureBox;
        unlockButton('join_send_code');
        val('join_code', val('join_code_code'));
        var fb = (cur.joinParams && cur.joinParams.facebook);
        cur.joinParams = {
            join_code: val('join_code'),
            join_hash: hash
        };
        if (fb) {
            cur.joinParams.facebook = 1;
        }
        if (Join.isPhoneCall()) {
            ge('join_called_phone').readOnly = true;
            addClass(ge('join_called_phone'), 'join_readonly');
            addClass(ge('join_called_phone_prefixed'), 'join_readonly_wrap');
        } else {
            ge('join_code').readOnly = true;
            addClass(ge('join_code'), 'join_readonly');
        }
        show('join_pass_submit');
        hide('join_other_phone', 'join_code_submit', 'join_resend', 'join_country_row');
        slideDown('join_pass_row', 150, elfocus.pbind('join_pass'));
        val('join_submit_result', '');
    },
    askCaptcha: function(sid, dif, lang) {
        if (!cur.codeForm) return;
        unlockButton('join_send_code');
        if (dif == 2) {
            window.badCodeBox = showReCaptchaBox(sid, lang, window.badCodeBox, {
                onSubmit: function(sid, key) {
                    val('join_code_recaptcha', sid);
                    cur.codeForm.submit();
                },
                onHide: function() {
                    window.badCodeBox = false;
                }
            });
        } else {
            window.badCodeBox = showCaptchaBox(sid, lang, window.badCodeBox, {
                onSubmit: function(sid, key) {
                    val('join_code_sid', sid);
                    val('join_code_key', key);
                    cur.codeForm.submit();
                },
                onHide: function() {
                    window.badCodeBox = false;
                }
            });
        }
    },
    submitPasswordSure: function() {
        showFastBox(getLang('join_new_page_sure_title'), getLang('join_new_page_sure'), getLang('join_new_page_sure_submit'), Join.submitPassword.pbind(-1), getLang('global_cancel'));
    },
    submitPassword: function(toAlready, fbLoginTo) {
        if (buttonLocked('join_send_pass') && !cur.submitOnSign) return;
        if (!Join.policyChecked()) {
            notaBene('join_accept_terms_checkbox');
            return;
        }

        if (fbLoginTo === true) {
            var pass = '000000';
        } else {
            var pass = val('join_pass');
            if (pass.length < 6) return notaBene('join_pass');
        }

        if (cur.sureBoxText && toAlready !== 1 && toAlready !== -1) {
            showFastBox({
                title: getLang('join_sure_detach'),
                hideButtons: true,
                width: 560,
                noCloseButton: true
            }, cur.sureBoxText).changed = true;
            return;
        }
        cur.joinParams.join_to_already = intval(toAlready);
        if (cur.fbSign && !cur.fbSigned) {
            cur.submitOnSign = 1;
            return lockButton('join_send_pass');
        }

        if (!window._oldOnLoginFailed) {
            window._oldOnLoginFailed = onLoginFailed;
            window._oldOnLoginDone = onLoginDone;
            cur.destroy.push(function() {
                onLoginFailed = _oldOnLoginFailed;
                onLoginDone = _oldOnLoginDone;
                _oldOnLoginFailed = false;
                _oldOnLoginDone = false;
            });
        }
        onLoginFailed = function(code, opts) {
            statlogsValueEvent('join_progress', 'finish', 'error', 'password error');

            if (code === -1) {
                location.href = location.href.replace(/^http:/, 'https:');
            } else if (code === 4) {
                location.href = '/login?m=1&email=' + opts.email;
            } else if (code === 10) {
                lockButton('join_send_pass');
                setTimeout(submitQuickLoginForm.pbind(login, pass, {
                    prg: 'join_send_pass',
                    params: cur.joinParams
                }), 1000);
            } else {
                nav.reload();
            }
        };
        onLoginDone = nav.go.pbind('join?act=done')
        if (cur.fbSign && (cur.fbValid || fbLoginTo === true)) {
            var login = cur.fbEmail;
            cur.joinParams['fb_id'] = cur.fbId;
        } else {
            var login = Join.getPhone();
        }
        submitQuickLoginForm(login, pass, {
            prg: 'join_send_pass',
            params: cur.joinParams
        });
    },

    showMsg: function(id, text, handler, type) {
        var el = ge(id);
        showMsg(el, text, type ? type : 'error', true);
        if (isFunction(handler)) handler();
    },
    codeFailed: function(triesLeft, calledPhonePrefix) {
        if (curBox()) curBox().hide();
        unlockButton('join_send_code');
        var text = getLang('join_wrong_code');
        triesLeft = intval(triesLeft);
        if (triesLeft < 0) {
            text = getLang('join_code_failed');
            Join.changePhone();
        } else if (triesLeft && triesLeft < 6) {
            text += '<br>' + getLang('join_tries_left').replace('{count}', '<b>' + triesLeft + '</b>');
        }
        var codeField;
        if (Join.isPhoneCall() && isVisible('join_called_phone_prefix')) {
            codeField = 'join_called_phone';
            val(ge('join_called_phone_prefix').firstChild, calledPhonePrefix);
        } else {
            codeField = 'join_code';
        }
        Join.showMsg('join_submit_result', text, elfocus.pbind(codeField));
        if (window._oldOnLoginFailed) onLoginFailed = _oldOnLoginFailed;
    },
    resendUpdate: function() {
        var resendTime, resendText;
        if (Join.isPhoneCall() && cur.validationType != 4) {
            resendTime = 'join_send_code_via_sms_time';
            resendText = 'join_send_code_via_sms';
        } else {
            resendTime = 'join_resend_code_time';
            resendText = 'join_no_code';
        }
        if (cur.resendDelay > 0) {
            val('join_resend', getLang(resendTime).replace('%s', Math.floor(cur.resendDelay / 60) + ':' + (cur.resendDelay % 60 < 10 ? '0' : '') + (cur.resendDelay % 60)));
            cur.resendDelay--;
        } else if (cur.resendDelay == -1) {
            val('join_resend', '');
            clearInterval(cur.resendInt);
        } else {
            val('join_resend', '<a id="join_resend_lnk" onclick="return Join.noCode()">' + getLang(resendText) + '</a>');
            clearInterval(cur.resendInt);
        }
    },
    noCode: function() {
        var prg = ce('span', {
                className: 'progress_inline'
            }),
            el = ge('join_resend_lnk'),
            prnt = el.parentNode;
        ajax.post('join.php', {
            act: 'resend',
            hash: cur.hash
        }, {
            showProgress: function() {
                if (el.parentNode == prnt) prnt.replaceChild(prg, el);
            },
            hideProgress: function() {
                if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
            },
            onDone: function(text, html, btn, cancel) {
                if (text == 1) {
                    cur.validationType = text;
                    cur.resendDelay = html;
                    Join.phoneDone();
                } else if (html && btn) {
                    val('join_submit_result', '');
                    showFastBox({
                        title: text,
                        width: 450,
                        noCloseButton: true
                    }, html, btn, Join.call, cancel).changed = true;
                } else if (html) {
                    val('join_submit_result', '');
                    showFastBox({
                        title: text,
                        width: 450
                    }, html);
                } else {
                    Join.showMsg('join_submit_result', text);
                }
            }
        });
        return false;
    },
    changePhone: function() {
        var phoneEl = ge('join_phone');
        phoneEl.readOnly = false;
        removeClass(phoneEl, 'join_readonly');
        if (cur.uiPhoneCountry) {
            cur.uiPhoneCountry.disable(false);
            cur.uiPhoneCountry.val(cur.uiPhoneCountry.val(), true);
            removeClass('join_phone_prefixed', 'join_readonly_wrap');
        }
        show('join_phone_submit', 'join_country_row');
        hide('join_code_submit', 'join_other_phone', 'join_resend');
        slideUp(Join.isPhoneCall() ? 'join_called_phone_row' : 'join_code_row', 150);
        val('join_phone', '');
        elfocus('join_phone');
    },
    call: function() {
        ajax.post('join.php', {
            act: 'call',
            hash: cur.hash
        }, {
            progress: curBox().progress,
            onDone: function(text, type) {
                curBox().hide();
                cur.validationType = type;
                if (Join.isPhoneCall()) {
                    Join.phoneDone();
                } else {
                    elfocus('join_code');
                }
                Join.showMsg('join_submit_result', text);
            }
        });
    },

    tipShow: function(el, key, shift, addClass) {
        el = ge(el);
        var showTT = function() {
            showTooltip(el, {
                text: getLang(key),
                dir: 'left',
                slideX: 15,
                className: 'join_finish_tt' + (addClass ? (' ' + addClass) : ''),
                shift: shift,
                onCreate: removeEvent.pbind(el, 'mouseout')
            });
        }
        if (vk.loaded) {
            setTimeout(showTT, 0);
        } else {
            addEvent(window, 'load', showTT);
        }
    },
    tipHide: function() {
        var els = ['join_phone', 'join_code', 'join_pass', 'join_called_phone'];
        for (var i = 0; i < els.length; ++i) {
            el = ge(els[i]);
            if (el && el.tt && el.tt.hide) el.tt.hide();
        }
    },
    phoneTip: function() {
        var field = ge('join_phone'),
            size = getSize(field);
        if (field.readOnly) return;
        Join.tipShow(field, 'join_phone_tip', [-(size[0] + 10), -Math.floor(size[1] / 2)], 'join_phone_tt');
    },
    codeTip: function() {
        var field = ge('join_code'),
            size = getSize(field);
        if (field.readOnly) return;
        Join.tipShow(field, cur.strongCode ? 'join_code_voice_tip' : 'join_code_tip', [-(size[0] + 10), -Math.floor(size[1] / 2)]);
    },
    codeCallTip: function() {
        var field = ge('join_called_phone'),
            size = getSize(field);
        if (field.readOnly) return;
        Join.tipShow(field, 'join_code_call_tip', [-(size[0] + 10), -Math.floor(size[1] / 2)]);
    },
    passTip: function() {
        var field = ge('join_pass'),
            size = getSize(field);
        return Join.tipShow(field, 'join_pass_tip', [-(size[0] + 10), -Math.floor(size[1] / 2)]);
    },

    switchToDefSign: function(hash, obj) {
        ajax.post('join.php', {
            act: 'logout',
            hash: hash,
            noredir: 1
        }, {
            onDone: function() {
                showBox('join.php', {
                    act: 'box',
                    from: nav.strLoc,
                    nofb: 1
                });
            },
            showProgress: lockButton.pbind(obj),
            hideProgress: unlockButton.pbind(obj)
        });
    },

    initContacts: function() {
        selectsData.setCountries(cur.selData.countries);
        selectsData.setCities(cur.selData.country, cur.selData.cities);

        cur.selData.city_val = cur.selData.city_val || ['', ''];
        cur.selData.country_val = cur.selData.country_val || ['', ''];

        cur.uiCity = new CitySelect(ge('pedit_city'), ge('pedit_city_row'), {
            progressBar: ge('pedit_progress'),
            city: cur.selData.city_val,
            country: cur.selData.country,
            maxItemsShown: function(query_length) {
                return (query_length > 6) ? 500 : 350;
            },
            dark: 1,
            width: 280
        });

        cur.uiCountry = new CountrySelect(ge('pedit_country'), ge('pedit_country_row'), {
            progressBar: ge('pedit_progress'),
            country: cur.selData.country_val,
            citySelect: cur.uiCity,
            onChange: Join.checkSave,
            dark: 1,
            width: 280
        });

        Join.checkSave(ge('pedit_country').value);
    },

    submitContacts: function() {
        var params = {
            act: 'check_contacts',
            hash: cur.saveHash,
            country: ge('pedit_country').value,
            city: ge('pedit_city').value
        };

        if (!params.country) {
            statlogsValueEvent('join_progress', 'contacts', 'error', 'empty contacts');
            Join.showMsg('join_submit_result', getLang('join_need_contacts'));
            return true;
        }

        var btn = ge('join_save');

        ajax.post('join.php', params, {
            onDone: function() {
                nav.go('/join?act=education');
            },
            onFail: function(errorMessage) {
                Join.showMsg('join_submit_result', errorMessage);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    initEducation: function() {
        selectsData.setCountries(cur.selData.countries);
        selectsData.setCities(cur.selData.country, cur.selData.cities);

        cur.selData.city_val = cur.selData.city_val || ['', ''];
        cur.selData.country_val = cur.selData.country_val || ['', ''];

        var container = ge('edu');
        var id = 0;
        var params = {
            id: id,
            width: 280,
            city: cur.selData.city,
            city_val: cur.selData.city_val,
            country: cur.selData.country,
            country_val: cur.selData.country_val
        };

        if (cur.isSchool) {
            container.appendChild(ProfileEditorEdu.genSchoolRow(id));
            ProfileEditorEdu.initSchoolRow(params, null, Join.checkSave);
            Join.checkSave(ge('s_school0').value);

            addEvent(ge('s_spec0_custom'), 'keydown', function(ev) {
                if (ev.keyCode == 10 || ev.keyCode == 13) {
                    Join.submitEducation();
                }
            });
        } else {
            container.appendChild(ProfileEditorEdu.genUniRow(id));
            ProfileEditorEdu.initUniRow(params, null, Join.checkSave);
            Join.checkSave(ge('u_university0').value);
        }
    },

    submitEducation: function() {
        var error;
        var params;

        if (cur.isSchool) {
            params = {
                act: 'a_save_education_school'
            };
            params = ProfileEditorEdu.addSchoolParams(params, {
                id: 0
            }, 'school0');

            if (!params['school0school']) {
                error = getLang('join_need_school');
            }

            params.school0id = -1;

        } else {
            params = {
                act: 'a_save_education_uni'
            };
            params = ProfileEditorEdu.addUniParams(params, {
                id: 0
            }, 'primary_uni');

            if (!params['primary_uniuniversity']) {
                error = getLang('join_need_uni');
            }

            params.primary_uniid = cur.uniId || -1;
        }

        if (error) {
            statlogsValueEvent('join_progress', 'education', 'error', (cur.isSchool ? 'empty school' : 'empty university'));
            Join.showMsg('join_submit_result', error);
            return true;
        }

        var btn = ge('join_save');

        params.hash = cur.saveHash;

        ajax.post('al_profileEdit.php', params, {
            onDone: function() {
                statlogsValueEvent('join_progress', 'education', 'success');
                nav.go('/join?act=email');
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    initEmail: function() {
        var email = ge('pedit_email');

        addEvent(email, 'keydown change', function(ev) {
            if (ev.keyCode == 10 || ev.keyCode == 13) {
                Join.submitEmail();
            } else {
                Join.checkSave(email.value);
            }
        });

        Join.checkSave();
    },

    submitEmail: function() {
        var params = {
            act: 'a_bind_mail',
            email: ge('pedit_email').value,
            is_new: 1,
            hash: cur.saveHash
        };

        if (!params.email) {
            statlogsValueEvent('join_progress', 'email', 'error', 'empty email');
            Join.showMsg('join_submit_result', getLang('join_need_email'));
            return true;
        }

        var btn = ge('join_save');

        params.hash = cur.saveHash;

        ajax.post('al_settings.php', params, {
            onDone: function() {
                statlogsValueEvent('join_progress', 'email', 'success');
                // Need force load
                location.href = '/feed';
            },
            onFail: function(errorMessage) {
                if (!isUndefined(errorMessage)) {
                    statlogsValueEvent('join_progress', 'email', 'error', errorMessage);
                    Join.showMsg('join_submit_result', errorMessage);
                }

                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    checkSave: function(value) {
        disableButton(ge('join_save'), !value);
    },

    showPolicy: function(act) {
        showBox('al_help.php', {
            act: act,
            cc_id: cur.uiPhoneCountry.val() || 0,
            box: 1
        });
    },

    updatePolicyLink: function(countryId) {
        var checkBoxEl = geByClass1('checkbox', 'join_accept_terms_checkbox');
        checkbox(checkBoxEl, 0);

        var onDone = function(text) {
            if (text) {
                geByClass1('join_accept_terms_text', ge('join_accept_terms_checkbox')).innerHTML = text;
            }
        };
        ajax.post('join.php', {
            act: 'update_policy',
            cc_id: countryId || 0
        }, {
            onDone: onDone
        });
    }
};

try {
    stManager.done('join.js');
} catch (e) {}