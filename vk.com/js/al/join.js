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

    phoneDone: function(phone, cntr) {
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
        if (cur.resendInt) {
            clearInterval(cur.resendInt);
        }
        cur.resendInt = setInterval(Join.resendUpdate, 1000);
        addClass(phoneEl, 'join_readonly');
        show('join_code_submit', 'join_other_phone', 'join_resend');
        hide('join_phone_submit');
        slideDown('join_code_row', 150, elfocus.pbind('join_code'));
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
            onDone: function(needCheck, boxBody, strong, resendDelay) {
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
                cur.resendDelay = resendDelay;
                Join.phoneDone(phoneInputVal, cntr);
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
<form method="POST" action="' + vk.loginscheme + '://login.vk.com/?act=check_code&_origin=' + locProtocol + '//' + locHost + '" id="join_code_form" name="join_code_form" target="join_code_frame">\
  <input type="hidden" name="email" id="join_code_phone" />\
  <input type="hidden" name="code" id="join_code_code" />\
  <input type="hidden" name="recaptcha" id="join_code_sid" />\
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
            autocomplete: true,
            multiselect: false,
            onChange: function(v) {
                var ph = ge('join_phone'),
                    pref = ge('join_phone_prefix').firstChild,
                    code = cur.uiPhoneCountry.val_full()[3];
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
                setTimeout(elfocus.pbind(ph), 0);
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

        var code = trim(val('join_code')).replace(/[^a-z0-9]/g, '');
        if (code.length < 5) {
            return notaBene('join_code');
        }
        if (code == '05937') {
            return Join.showMsg('join_submit_result', getLang('join_sorry_code'), elfocus.pbind('join_code', false, false));
        }
        val('join_code_phone', Join.getPhone());
        val('join_code_code', code);
        lockButton('join_send_code')
        cur.codeForm.submit();
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
        ge('join_code').readOnly = true;
        addClass(ge('join_code'), 'join_readonly');
        show('join_pass_submit', 'join_accept_terms');
        hide('join_other_phone', 'join_code_submit', 'join_resend');
        slideDown('join_pass_row', 150, elfocus.pbind('join_pass'));
        val('join_submit_result', '');
    },
    askCaptcha: function(sid, lang) {
        if (!cur.codeForm) return;
        unlockButton('join_send_code');
        window.badCodeBox = showReCaptchaBox(sid, lang, window.badCodeBox, {
            onSubmit: function(sid, key) {
                val('join_code_sid', sid);
                cur.codeForm.submit();
            },
            onHide: function() {
                window.badCodeBox = false;
            }
        });
    },
    submitPasswordSure: function() {
        showFastBox(getLang('join_new_page_sure_title'), getLang('join_new_page_sure'), getLang('join_new_page_sure_submit'), Join.submitPassword.pbind(-1), getLang('global_cancel'));
    },
    submitPassword: function(toAlready, fbLoginTo) {
        if (buttonLocked('join_send_pass') && !cur.submitOnSign) return;

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
            if (code === -1) {
                location.href = location.href.replace(/^http:/, 'https:');
            } else if (code === 4) {
                location.href = '/login?m=1&email=' + opts.email;
            } else {
                nav.reload();
            }
        };
        onLoginDone = nav.go.pbind('join.php?act=done')
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
    codeFailed: function(triesLeft) {
        if (curBox()) curBox().hide();
        unlockButton('join_send_code');
        var text = getLang('join_wrong_code');
        triesLeft = intval(triesLeft);
        if (triesLeft < 0) {
            text = getLang('join_code_failed');
        } else if (triesLeft && triesLeft < 6) {
            text += '<br>' + getLang('join_tries_left').replace('{count}', '<b>' + triesLeft + '</b>');
        }
        Join.showMsg('join_submit_result', text, elfocus.pbind('join_code'));
        if (window._oldOnLoginFailed) onLoginFailed = _oldOnLoginFailed;
    },
    submitCode: function() {
        if (buttonLocked('join_send_code')) return;

        var code = val('join_code');
        if (code.length < 8) return notaBene('join_code');

        if (!window._oldOnLoginFailed) {
            window._oldOnLoginFailed = onLoginFailed;
            cur.destroy.push(function() {
                onLoginFailed = _oldOnLoginFailed;
                _oldOnLoginFailed = false;
            });
        }
        onLoginFailed = function(code) {
            if (code === -1) {
                location.href = location.href.replace(/^http:/, 'https:');
            } else {
                Join.codeFailed();
            }
        };
        submitQuickLoginForm(Join.getPhone(), code, {
            prg: 'join_send_code'
        })
    },
    resendUpdate: function() {
        if (cur.resendDelay > 0) {
            ge('join_resend').innerHTML = getLang('join_resend_code_time').replace('%s', Math.floor(cur.resendDelay / 60) + ':' + (cur.resendDelay % 60 < 10 ? '0' : '') + (cur.resendDelay % 60));
            cur.resendDelay--;
        } else {
            ge('join_resend').innerHTML = '<a id="join_resend_lnk" onclick="return Join.noCode()">' + getLang('join_no_code') + '</a>';
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
                if (html && btn) {
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
        show('join_phone_submit');
        hide('join_code_submit', 'join_other_phone', 'join_resend');
        slideUp('join_code_row', 150);
        elfocus('join_phone');
    },
    call: function() {
        ajax.post('join.php', {
            act: 'call',
            hash: cur.hash
        }, {
            progress: curBox().progress,
            onDone: function(text) {
                curBox().hide();
                Join.showMsg('join_submit_result', text);
                elfocus('join_code');
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
        var els = ['join_phone', 'join_code', 'join_pass'];
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
    }
};

try {
    stManager.done('join.js');
} catch (e) {}