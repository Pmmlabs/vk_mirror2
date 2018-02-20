// region Constants

// region Unblock Form

// Acts
var ACT_UNBLOCK_RESEND_CODE = 'blocked_resend';
var ACT_UNBLOCK_TUTORIAL = 'tutorial';
var ACT_UNBLOCK_FORM = 'a_unblock_form';
var ACT_UNBLOCK_SEND_PHONE = 'blocked_phone';
var ACT_UNBLOCK_CHECK_VERIFICATION_CODE = 'blocked_check';
var ACT_UNBLOCK_SEND_PASSWORD = 'blocked_done';
var ACT_UNBLOCK_CALL_TO_SPELL_CODE = 'blocked_call';
var ACT_FAST_UNBLOCK = 'unblock_done';

// Uncategorized classes
var INPUTS_CLASS = 'inputs';
var ERROR_MESSAGE_CLASS = 'submit_error';
var BLOCKED_PAGE_WRAP_CLASS = 'login_blocked_wrap';
var BLOCK_CONTENT_CLASS = 'content';
var BOX_BUTTONS_CLASS = 'box_controls_wrap';

// region Tutorial
var TUTORIAL_FINISH_APPEAL_CLASS = 'tutorial_finish_appeal';
var TUTORIAL_STEP_CLASS = 'tutorial_step';

// inputs
var PHONE_NUMBER_INPUT_CLASS = 'phone_number';
var VERIFICATION_CODE_INPUT_CLASS = 'verification_code';
var PASSWORD_INPUT_CLASS = 'new_password';

// input wraps
var VERIFICATION_CODE_INPUT_WRAP_CLASS = 'verification_code_input';
var PASSWORD_INPUT_WRAP_CLASS = 'new_password_input';

// Unblock form buttons
var SUBMIT_PHONE_NUMBER_BUTTON_CLASS = 'receive_code_button';
var SUBMIT_VERIFICATION_CODE_BUTTON_CLASS = 'check_code_button';
var SUBMIT_PASSWORD_BUTTON_CLASS = 'unblock_button';

var CHANGE_PHONE_BUTTON_CLASS = '_change_phone_button';
var RESEND_CODE_BUTTON_CLASS = '_resend_code_button';

// Tooltips
var PHONE_INPUT_TOOLTIP_CLASS = '_phone_input_tooltip';
var VERIFICATION_CODE_TOOLTIP_CLASS = '_verification_code_input_tooltip';
var PASSWORD_TOOLTIP_CLASS = '_password_input_tooltip';

// Special classes
var INPUT_FINISHED_CLASS = 'finished';

// Password
var PASSWORD_DESCRIPTION_ID = 'blocked_about_pass';
var PASSWORD_STRENGTH_CLASS = 'blocked_pass_strength';

var PASSWORD_STRENGTH_NONE = -1;
var PASSWORD_STRENGTH_WEAK_TOO_SHORT = 0;
var PASSWORD_STRENGTH_WEAK_TYPICAL = 1;
var PASSWORD_STRENGTH_GOOD = 2;
var PASSWORD_STRENGTH_VERY_GOOD = 3;
var PASSWORD_STRENGTH_EXCELLENT = 4;

// endregion


var KEYCODE_ENTER = 13;

// endregion

var Login = {
    init: function() {
        each(geByClass('big_text', 'login_form_wrap'), function(i, inp) {
            placeholderInit(inp);
        });
        setTimeout(elfocus.pbind(val('email') ? 'pass' : 'email'), 0);

        var lf = ge('login_form');
        var le = ge('email');
        var lp = ge('pass');

        lf.onsubmit = function() {
            if (!window.submitQuickLoginForm) {
                return true;
            }

            if (!trim(le.value)) {
                notaBene(le);
                return false;
            } else if (!trim(lp.value)) {
                notaBene(lp);
                return false;
            }

            submitQuickLoginForm(le.value, lp.value, {
                prg: 'login_button',
                params: {
                    'expire_input': val('expire_input')
                }
            });

            return false;
        };

        if (window.loginByCredential) {
            le.onclick = loginByCredential;
            lp.onclick = loginByCredential;
        }

        return true;
    },

    /**
     * �������������� ��������, ������� ����� ��������������� ������������
     */
    initBlockedPage: function() {
        // ���� ���� ���� ���� ����� ��������� - ���������� ������� ��� ������
        if (geByClass1(TUTORIAL_STEP_CLASS)) {
            Login._addTutorialAppeal();
        }
    },

    showFastRestore: function(lnk) {
        var wrap = gpeByClass('_retore_wrap', lnk);
        each(geByClass('big_text', wrap), function(i, inp) {
            placeholderInit(inp);
        });
        addClass(wrap, 'shown');
        elfocus('fast_restore_phone');
        return false;
    },
    showInputTooltip: function(el, text) {
        var s = getSize(el);
        showTooltip(el, {
            text: text,
            dir: 'left',
            slideX: 15,
            className: 'login_tt',
            shift: [-s[0] - 10, -s[1] / 2],
            onCreate: function() {
                removeEvent(el, 'mouseout');
                el.onblur = function() {
                    el.tt.hide();
                }
            }
        });
    },
    fastRestoreCheck: function() {
        if (cur.frPhone) {
            if (val('fast_restore_phone') == cur.frSentPhone) {
                show('login_fast_restore_code_row', 'login_fast_restore_resend');
            } else {
                hide('login_fast_restore_name_row', 'login_fast_restore_code_row', 'login_fast_restore_resend');
                if (cur.frResendInt) {
                    clearInterval(cur.frResendInt);
                    cur.frResendInt = false;
                }
            }
        }
    },
    fastRestoreResendUpdate: function(viaPush) {
        if (cur.frResendDelay > 0) {
            ge('login_fast_restore_resend').innerHTML = getLang(viaPush ? 'join_send_code_via_sms_time' : 'join_resend_code_time').replace('%s', Math.floor(cur.frResendDelay / 60) + ':' + (cur.frResendDelay % 60 < 10 ? '0' : '') + (cur.frResendDelay % 60));
            cur.frResendDelay--;
        } else {
            ge('login_fast_restore_resend').innerHTML = '<a onclick="return Login.fastRestoreResend(this);">' + getLang(viaPush ? 'join_send_code_via_sms' : 'join_resend_code') + '</a>';
            clearInterval(cur.frResendInt);
            cur.frResendInt = false;
        }
    },
    fastRestoreResend: function(el) {
        var phone = val('fast_restore_phone'),
            prg = ce('span', {
                className: 'progress_inline'
            }),
            prnt = domPN(el);
        if (!geByClass1('error', 'login_fast_restore_error')) {
            val('login_fast_restore_error', '');
        }
        ajax.post('/al_login.php?act=a_fast_restore_resend', {
            phone: phone,
            restore: cur.frCode
        }, {
            onDone: function(msg) {
                prnt.innerHTML = msg;
                setTimeout(elfocus('fast_restore_code'), 0);
            },
            onFail: function(msg) {
                Login.showFastRestoreError(msg, 'fast_restore_code');
                return true;
            },
            showProgress: function() {
                if (el.parentNode == prnt) prnt.replaceChild(prg, el);
            },
            hideProgress: function() {
                if (prg.parentNode == prnt) prnt.replaceChild(el, prg);
            }
        });
        return false;
    },
    fastRestore: function(ev, hash) {
        ev = ev || window.event;
        if (ev && (ev.keyCode !== undefined) && (ev.type != 'click')) {
            if (ev.keyCode !== KEY.ENTER) {
                return;
            }
            if (ev.target == ge('fast_restore_phone') && isVisible('login_fast_restore_code_row')) {
                elfocus('fast_restore_code');
                return cancelEvent(ev);
            }
        }
        var btn = ge('login_fast_restore_btn'),
            phone = val('fast_restore_phone'),
            code;
        if (phone.replace(/[^0-9]/g, '').length < 8) {
            notaBene('fast_restore_phone');
            return cancelEvent(ev);
        }
        val('login_fast_restore_error', '');
        if (isVisible('login_fast_restore_code_row')) {
            code = val('fast_restore_code');
            if (code.replace(/[^0-9a-z]/g, '').length < 5) {
                notaBene('fast_restore_code');
                return cancelEvent(ev);
            }
            ajax.post('/al_login.php?act=a_fast_restore_code', {
                phone: phone,
                code: code,
                restore: cur.frCode
            }, {
                onFail: function(msg) {
                    Login.showFastRestoreError(msg, 'fast_restore_code');
                    return true;
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        } else {
            var name = isVisible('login_fast_restore_name_row') ? val('fast_restore_name') : '';
            if (!name && isVisible('login_fast_restore_name_row')) {
                notaBene('fast_restore_name');
                return;
            }
            ajax.post('/al_login.php?act=a_fast_restore', {
                phone: phone,
                hash: hash,
                name: name
            }, {
                onDone: function(res, code, delay, notice) {
                    if (!res) {
                        setTimeout(Login.fastRestore.pbind(false), 1000);
                        return;
                    }
                    if (res == 1) {
                        show('login_fast_restore_name_row');
                        setTimeout(elfocus('fast_restore_name'), 0);
                        return;
                    }
                    if (res == 2) {
                        Login.showFastRestoreError(notice, false, 'error');
                        return;
                    }
                    val('login_fast_restore_btn', getLang('login_fast_restore_access'));
                    cur.frCode = code;
                    cur.frSentPhone = phone;
                    show('login_fast_restore_code_row', 'login_fast_restore_resend');
                    setTimeout(elfocus('fast_restore_code'), 0);
                    cur.frResendDelay = delay;
                    cur.frResendInt = setInterval(Login.fastRestoreResendUpdate.pbind(res == 4), 1000);
                    if (res == 4) {
                        Login.fastRestoreResendUpdate(true);
                    }
                    if (notice) {
                        Login.showFastRestoreError(notice, false, 'info_msg');
                    }
                },
                onFail: function(msg) {
                    if (msg) {
                        Login.showFastRestoreError(msg, 'fast_restore_phone');
                    }
                    return true;
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        }
        return cancelEvent(ev);
    },
    showFastRestoreError: function(msg, inp, type) {
        showMsg('login_fast_restore_error', msg, type ? type : 'error', true);
        inp = ge(inp);
        if (inp) {
            notaBene(inp);
            if (inp.tt && inp.tt.hide) {
                inp.tt.hide();
            }
        }
    },
    changeMail: function(fromBox, el, hash) {
        var email = trim(val('login_new_mail')),
            fromPage = 1;
        if (!email) {
            return notaBene('login_new_mail');
        }
        if (fromBox) {
            hash = cur.changeMailHash;
        }
        if (!(/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(email))) {
            return showMsg('login_change_mail_error', getLang('reg0_error_bad_email'), 'error');
        }
        if (fromBox) {
            fromPage = 0;
        }
        ajax.post('/login?act=a_change_mail', {
            newmail: email,
            hash: hash,
            from_page: fromPage
        }, {
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el),
            onDone: function(msg) {
                var mailForm = 'login_change_mail_form';
                if (fromBox) {
                    mailForm = 'login_change_mail_box';
                    curBox().removeButtons();
                    curBox().addButton(getLang('global_cancel'), null, 'no');
                }
                val(mailForm, msg);
            },
            onFail: function(message) {
                showMsg('login_change_mail_error', message, 'error');
                return true;
            }
        });
    },
    initChangeMailBox: function() {
        curBox().removeButtons();
        curBox().addButton(getLang('global_cancel'), null, 'no');
        curBox().addButton(getLang('reg0_change_mail'), Login.changeMail.pbind(1));
        elfocus('change_mail_new');
    },

    // region Ban Tutorial

    /**
     * �������� ����� � ���������, ���������� ��������� ������
     *
     * @param radioButton
     * @param tutorialId
     */
    chooseTutorialAnswer: function(radioButton, tutorialId) {
        if (cur.tutorialProcessing) {
            return;
        }

        var tutorialStep = gpeByClass(TUTORIAL_STEP_CLASS, radioButton);
        if (hasClass(tutorialStep, INPUT_FINISHED_CLASS)) {
            return;
        }

        addClass(radioButton, 'on');
        Login._removeTutorialAppeal();

        ajax.post('support', {
            act: ACT_UNBLOCK_TUTORIAL,
            id: tutorialId,
            load: 1,
            ban: nav.objLoc['ban'] || 0
        }, {
            onDone: function(nextTutorialStep) {
                addClass(tutorialStep, INPUT_FINISHED_CLASS);

                if (nextTutorialStep) {
                    var tutorialWrap = ge(BLOCKED_PAGE_WRAP_CLASS);
                    tutorialWrap.innerHTML += nextTutorialStep;
                    Login._addTutorialAppeal();
                } else {
                    tutorialStep.innerHTML += getTemplate('login_unblock_by_phone');
                    fadeToggle(geByClass('footer')[0]);
                }

                scrollToY(window.innerHeight);
            },
            showProgress: function() {
                cur.tutorialProcessing = true;
                lockButton(radioButton);
            },
            hideProgress: function() {
                cur.tutorialProcessing = false;
                unlockButton(radioButton);
            },
        });
    },

    /**
     * �������� ������� ������� ������ � ��������� ���� ��������� �� ������
     */
    _addTutorialAppeal: function() {
        var tutorialSteps = geByClass(TUTORIAL_STEP_CLASS);
        var lastTutorialStep = tutorialSteps.slice(-1)[0];
        var lastTutorialStepContent = geByClass1(BLOCK_CONTENT_CLASS, lastTutorialStep);

        lastTutorialStepContent.innerHTML = getTemplate('login_tutorial_finish_appeal') + lastTutorialStepContent.innerHTML;
    },

    /**
     * ������� ������� ������� ������ � ��������� ���� ��������� �� ������
     */
    _removeTutorialAppeal: function() {
        var tutorialSteps = geByClass(TUTORIAL_STEP_CLASS);
        var lastTutorialStep = tutorialSteps.slice(-1)[0];
        var lastTutorialStepContent = geByClass1(BLOCK_CONTENT_CLASS, lastTutorialStep);

        slideToggle(geByClass1(TUTORIAL_FINISH_APPEAL_CLASS, lastTutorialStepContent));
    },

    // endregion

    // region Unblock Form

    /**
     * ���������� ����� ��� ��������������
     */
    showUnblockForm: function() {
        showBox('login', {
            act: ACT_UNBLOCK_FORM
        }, {
            onDone: function() {
                // @nsh: Remove native box buttons
                re(geByClass1(BOX_BUTTONS_CLASS));
                Login._addBoxHotKeys();

                Login.updateUnblockFormState();
            }
        });
    },

    // region Form Helpers

    /**
     * ���������� ������� ��� �������������
     */
    _getUnblockStep: function() {
        var box = curBox() ? curBox().bodyNode : null;
        if (!box) {
            return;
        }

        var phoneInput = geByClass1(PHONE_NUMBER_INPUT_CLASS, box);
        var verificationCodeInput = geByClass1(VERIFICATION_CODE_INPUT_CLASS, box);

        if (!hasClass(phoneInput, INPUT_FINISHED_CLASS) && !hasClass(verificationCodeInput, INPUT_FINISHED_CLASS)) {
            return 0;
        } else if (!hasClass(verificationCodeInput, INPUT_FINISHED_CLASS)) {
            return 1;
        } else {
            return 2;
        }
    },

    /**
     * ������� �� ������ finshed, � ����������� �� ��� ���������� ��������� �� 3� ������ �������������
     *
     * ����� ��������������:
     * @see submitPhone
     * @see submitValidationCode
     * @see submitPassword
     */
    updateUnblockFormState: function() {
        var box = curBox() ? curBox().bodyNode : null;
        if (!box) {
            return;
        }

        var phoneInput = geByClass1(PHONE_NUMBER_INPUT_CLASS, box);
        var verificationCodeInput = geByClass1(VERIFICATION_CODE_INPUT_CLASS, box);
        var passwordInput = geByClass1(PASSWORD_INPUT_CLASS);

        var verificationCodeInputWrap = geByClass1(VERIFICATION_CODE_INPUT_WRAP_CLASS, box);
        var newPasswordInputWrap = geByClass1(PASSWORD_INPUT_WRAP_CLASS, box);

        var receiveCodeButton = geByClass1(SUBMIT_PHONE_NUMBER_BUTTON_CLASS, box);
        var checkCodeButton = geByClass1(SUBMIT_VERIFICATION_CODE_BUTTON_CLASS, box);
        var unblockButton = geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS, box);
        var changePhoneButton = geByClass1(CHANGE_PHONE_BUTTON_CLASS);
        var resendCodeButton = geByClass1(RESEND_CODE_BUTTON_CLASS);

        var step = Login._getUnblockStep();
        switch (step) {
            case 0:
                show(receiveCodeButton);
                hide(checkCodeButton);
                hide(changePhoneButton);
                hide(resendCodeButton);
                hide(unblockButton);
                hide(verificationCodeInputWrap);
                hide(newPasswordInputWrap);

                phoneInput.removeAttribute('readonly');
                Login.hideRightTooltip(VERIFICATION_CODE_TOOLTIP_CLASS);
                Login.hideRightTooltip(PASSWORD_TOOLTIP_CLASS);

                elfocus(phoneInput);
                break;

            case 1:
                hide(receiveCodeButton);
                show(checkCodeButton);
                show(changePhoneButton);
                show(resendCodeButton);
                hide(unblockButton);
                show(verificationCodeInputWrap);
                hide(newPasswordInputWrap);

                phoneInput.setAttribute('readonly', 'readonly');
                verificationCodeInput.removeAttribute('readonly');
                Login.hideRightTooltip(PHONE_INPUT_TOOLTIP_CLASS);
                Login.hideRightTooltip(PASSWORD_TOOLTIP_CLASS);

                elfocus(verificationCodeInput);
                break;

            case 2:
                hide(receiveCodeButton);
                hide(checkCodeButton);
                hide(changePhoneButton);
                hide(resendCodeButton);
                show(unblockButton);
                show(verificationCodeInputWrap);
                show(newPasswordInputWrap);

                phoneInput.setAttribute('readonly', 'readonly');
                verificationCodeInput.setAttribute('readonly', 'readonly');
                Login.hideRightTooltip(PHONE_INPUT_TOOLTIP_CLASS);
                Login.hideRightTooltip(VERIFICATION_CODE_TOOLTIP_CLASS);

                elfocus(passwordInput);
                break;

            default:
                debugLog('Wrong step in updateUnblockFormState');
                break;
        }
    },

    _showFormMessageBox: function(message, isError) {
        var templateName = isError ? 'login_submit_error' : 'login_submit_message';
        var errorBlock = getTemplate(templateName, {
            error_message: message
        });

        var errorBox = geByClass1(ERROR_MESSAGE_CLASS);
        if (errorBox) {
            errorBox.innerHTML = errorBlock;
        } else {
            var inputs = geByClass1(INPUTS_CLASS);
            inputs.outerHTML = errorBlock + inputs.outerHTML;
        }
    },

    _hideFormMessageBox: function() {
        var errorBox = geByClass1(ERROR_MESSAGE_CLASS);
        if (!errorBox) {
            return;
        }

        re(errorBox);
    },

    _addBoxHotKeys: function() {
        addEvent(window, 'keydown', function(e) {
            var box = curBox() ? curBox().bodyNode : null;
            if (!box) {
                return;
            }

            if (e.keyCode == KEYCODE_ENTER && e.ctrlKey) {
                var step = Login._getUnblockStep();

                switch (step) {
                    case 0:
                        geByClass1(SUBMIT_PHONE_NUMBER_BUTTON_CLASS, box).click();
                        break;

                    case 1:
                        geByClass1(SUBMIT_VERIFICATION_CODE_BUTTON_CLASS, box).click();
                        break;

                    case 2:
                        geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS, box).click();
                        break;

                    default:
                        debugLog('Wrong step in _addBoxHotKeys');
                        break;
                }
            }
        });
    },

    // endregion

    // region Unblock Steps

    /**
     * ����� 1 - �������� ��������
     */
    submitPhone: function() {
        if (buttonLocked(geByClass1(SUBMIT_PHONE_NUMBER_BUTTON_CLASS))) {
            return;
        }

        var phoneNumber = val(geByClass1(PHONE_NUMBER_INPUT_CLASS));

        Login._hideFormMessageBox();

        ajax.post('/al_login.php', {
            act: ACT_UNBLOCK_SEND_PHONE,
            phone: phoneNumber,
            hash: cur.blockedHash,
            sure: 1
        }, {
            onDone: function(boxTitle, boxBody, boxYes, boxNo) {
                // ����� ��������� �����: ������� ��� ��������, �� �������?
                if (boxBody) {
                    showFastBox(boxTitle, boxBody, boxYes, Login.submitPhone.pbind(1), boxNo);
                    return;
                }

                //  � ���������� �����
                var phoneNumberInput = geByClass1(PHONE_NUMBER_INPUT_CLASS);
                addClass(phoneNumberInput, INPUT_FINISHED_CLASS);

                Login.updateUnblockFormState();
            },
            onFail: function(errorMessage) {
                Login._showFormMessageBox(errorMessage, true);
                Login.updateUnblockFormState();
                return true;
            },
            showProgress: lockButton.pbind(geByClass1(SUBMIT_PHONE_NUMBER_BUTTON_CLASS)),
            hideProgress: unlockButton.pbind(geByClass1(SUBMIT_PHONE_NUMBER_BUTTON_CLASS))
        });
    },

    /**
     * ����� 2 - ���� ���� �������������
     */
    submitValidationCode: function() {
        if (buttonLocked(geByClass1(SUBMIT_VERIFICATION_CODE_BUTTON_CLASS))) {
            return;
        }

        var verificationCodeInput = geByClass1(VERIFICATION_CODE_INPUT_CLASS);
        var code = val(verificationCodeInput);
        if (code.length < 4) {
            return notaBene(verificationCodeInput);
        }

        Login._hideFormMessageBox();

        ajax.post('/al_login.php', {
            act: ACT_UNBLOCK_CHECK_VERIFICATION_CODE,
            code: code,
            hash: cur.blockedHash
        }, {
            onDone: function(hash) {
                cur.unblockHash = hash;

                var verificationCodeInput = geByClass1(VERIFICATION_CODE_INPUT_CLASS);
                addClass(verificationCodeInput, INPUT_FINISHED_CLASS);

                Login.updateUnblockFormState();
            },
            onFail: function(errorMessage) {
                Login._showFormMessageBox(errorMessage, true);
                Login.updateUnblockFormState();
                return true;
            },
            showProgress: lockButton.pbind(geByClass1(SUBMIT_VERIFICATION_CODE_BUTTON_CLASS)),
            hideProgress: unlockButton.pbind(geByClass1(SUBMIT_VERIFICATION_CODE_BUTTON_CLASS))
        });
    },

    /**
     * ����� 3 - ���� ������ ������
     */
    submitPassword: function() {
        if (buttonLocked(geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS))) {
            return;
        }

        var passwordInput = geByClass1(PASSWORD_INPUT_CLASS);
        var pass = val(passwordInput);
        if (pass.length < 6) {
            return notaBene(passwordInput);
        }

        Login.hideRightTooltip(PASSWORD_TOOLTIP_CLASS);
        Login._hideFormMessageBox();

        ajax.post('/al_login.php', {
            act: ACT_UNBLOCK_SEND_PASSWORD,
            pass: pass,
            hash: cur.unblockHash,
            new_pass_hash: cur.newPassHash
        }, {
            onDone: function(email, hash) {

                // @nsh Todo: refactor this sht form request?
                var html = '\
          <form id="login_block_auth_form" target="login_block_auth_frame" action="" method="POST">\
            <input type="hidden" name="_origin" id="login_server_origin" />\
            <input type="hidden" name="email" id="login_block_email" />\
            <input type="hidden" name="pass" id="login_block_pass" />\
          </form>\
          <iframe name="login_block_auth_frame" id="login_block_auth_frame"></iframe>';
                var tmpEl = utilsNode.appendChild(ce('div', {
                        innerHTML: html
                    })),
                    tmp = window.onLoginDone;

                var form = ge('login_block_auth_form');
                form.action = "https://login.vk.com/?act=login&ip_h=" + cur.logoutHash + "&lg_h=" + cur.loginHash + "&redirect=1&role=al_frame";
                val('login_block_email', winToUtf(email));
                val('login_block_pass', winToUtf(pass));
                val('login_server_origin', cur.serverOrigin);

                form.submit();
                lockButton(geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS));

                cur.destroy.push(function() {
                    re(tmpEl);
                    window.onLoginDone = tmp;
                });

                window.onLoginDone = function() {
                    re(tmpEl);
                    unlockButton(geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS));
                    nav.go('/login?act=blocked_why&hash=' + hash, true);
                };
            },
            onFail: function(errorMessage) {
                Login._showFormMessageBox(errorMessage, true);
                Login.updateUnblockFormState();
                return true;
            },
            showProgress: lockButton.pbind(geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS)),
            hideProgress: unlockButton.pbind(geByClass1(SUBMIT_PASSWORD_BUTTON_CLASS))
        });
    },

    /**
     * ������� �� ����� 2 � 1.
     * ���� ������������ ������ ��������� - �� ����� �������� � ������ ����� �������������
     */
    changePhone: function() {
        var phoneNumberInput = geByClass1(PHONE_NUMBER_INPUT_CLASS);

        removeClass(phoneNumberInput, INPUT_FINISHED_CLASS);
        Login.updateUnblockFormState();
    },

    /**
     * ���� ��� �� ����� - �� ��� ���������� � ������������� ���������� ���������, ����� ����� ����������� ���.
     */
    resendCode: function() {
        Login._hideFormMessageBox();

        ajax.post('/al_login.php', {
            act: ACT_UNBLOCK_RESEND_CODE,
            hash: cur.blockedHash
        }, {
            onDone: function(text, html, btn, cancel) {
                if (html && btn) {
                    showFastBox({
                        title: text,
                        width: 430,
                        noCloseButton: true
                    }, html, btn, Login.callToSpellCode, cancel).changed = true;
                } else if (html) {
                    showFastBox({
                        title: text,
                        width: 430
                    }, html);
                } else {
                    Login._showFormMessageBox(text, false);
                }
            }
        });
    },

    /**
     * ���� ��� �� �����, ���� ���� �� ������ �������� �����. ���� � ��� �� ���������� - �� ����� ������ �� ������ �������
     */
    callToSpellCode: function() {
        ajax.post('/al_login.php', {
            act: ACT_UNBLOCK_CALL_TO_SPELL_CODE,
            hash: cur.blockedHash
        }, {
            onDone: function(text) {
                curBox().hide();
                Login._showFormMessageBox(text, false);
            },
            progress: curBox().progress,
        });
    },

    /**
     * ��������� ��������� ������������� ������ �� ���������� � ���������� ��� ��������� � ���� ������� ������� � ������� "������� ������"
     */
    checkPasswordStrength: function() {
        var strengthLevel = PASSWORD_STRENGTH_NONE;

        var passwordInput = geByClass1(PASSWORD_INPUT_CLASS);
        var password = val(passwordInput);
        var badPasswords = ['qwerty', '������', 'gfhjkm', '������', 'password', 'abc123', 'fuckyou', '123abc', 'baseball', 'football', 'soccer', 'monkey', 'liverpool', 'princess', 'jordan', 'slipknot', 'superman', 'iloveyou'];

        if (password.length < 6) {
            strengthLevel = PASSWORD_STRENGTH_WEAK_TOO_SHORT;
        } else if (password.match(/^\d+$/) || badPasswords.indexOf(password) >= 0 || password.substr(-1).match(/\d/) && badPasswords.indexOf(password.substr(0, password.length - 1)) >= 0) {
            strengthLevel = PASSWORD_STRENGTH_WEAK_TYPICAL;
        } else {
            var groups = [/[^a-z]/g, /[^A-Z]/g, /[^�-��]/g, /[^�-ߨ]/g, /[^0-9]/g, /[a-zA-Z�-��-߸�0-9]/g];
            var symbolsCounter = [];
            var big = 0;

            // ������� ���������� �������� � ������� ��������. ���� ����� ����� - ������ �������

            for (var i = 0, c = groups.length; i < c; ++i) {
                var length = password.replace(groups[i], '').length;
                if (length) {
                    if (length > 1) {
                        big++;
                    }

                    symbolsCounter.push({
                        group: i,
                        cnt: length
                    });
                }
            }

            if (symbolsCounter.length < 3 && symbolsCounter[symbolsCounter.length - 1].group != groups.length - 1 && big < 2) {
                strengthLevel = PASSWORD_STRENGTH_GOOD;
            }

            if (big > 2 || symbolsCounter.length > 2 && symbolsCounter[symbolsCounter.length - 1].group == groups.length - 1) {
                strengthLevel = PASSWORD_STRENGTH_EXCELLENT;
            }

            if (strengthLevel < 0 && big > 1) {
                var symbols = password.replace(groups[groups.length - 1], '');
                if (symbols.length > 1 && symbols.replace(new RegExp(escapeRE(symbols.charAt(0)), 'g'), '').length) {
                    strengthLevel = PASSWORD_STRENGTH_EXCELLENT;
                }
            }

            if (strengthLevel < 0) {
                strengthLevel = PASSWORD_STRENGTH_VERY_GOOD;
            }

            if (strengthLevel && strengthLevel < 3 && password.length > 13) {
                strengthLevel++;
            }
        }

        ge(PASSWORD_DESCRIPTION_ID).className = 'blocked_pwd_level' + strengthLevel;
        val(geByClass1(PASSWORD_STRENGTH_CLASS), password ? cur.passwordLevelLabels[strengthLevel] : '&nbsp;');
    },

    // endregion

    // region Tooltips

    /**
     * ���������� ������ ������ �� ����� ��� �����
     *
     * @param elementId
     * @param text
     * @param shift
     * @param addClass
     */
    _showRightTooltip: function(elementId, text, shift, addClass) {
        var element = geByClass1(elementId);

        var showTT = function() {
            showTooltip(element, {
                dir: 'left',
                width: 245,
                text: text,
                slideX: 15,
                className: 'login_blocked_tt' + (addClass ? ' ' + addClass : ''),
                shift: shift,
                forcetoup: true,
                onCreate: removeEvent.pbind(element, 'mouseout')
            });
        };

        if (vk.loaded) {
            setTimeout(showTT, 0);
        } else {
            addEvent(window, 'load', showTT);
        }
    },

    /**
     * �������� ������ ������ �� ����� ��� �����
     *
     * @param elementId
     */
    hideRightTooltip: function(elementId) {
        var element = geByClass1(elementId);
        if (!(element && element.tt && element.tt.hide)) {
            return;
        }

        element.tt.hide();
    },

    /**
     * ���������� ������ ��� ����� ������ ��������
     */
    showPhoneTooltip: function() {
        if (hasClass(geByClass1(PHONE_NUMBER_INPUT_CLASS), INPUT_FINISHED_CLASS)) {
            return;
        }

        Login._showRightTooltip(PHONE_INPUT_TOOLTIP_CLASS, cur.phoneTooltip, [-210, -88, 3]);
    },

    /**
     * ���������� ������ ��� ����� ���� ������������� �� ���
     */
    showVerificationCodeTooltip: function() {
        if (hasClass(geByClass1(VERIFICATION_CODE_INPUT_CLASS), INPUT_FINISHED_CLASS)) {
            return;
        }

        Login._showRightTooltip(VERIFICATION_CODE_TOOLTIP_CLASS, cur.verificationCodeTooltip, [-210, -69, 3]);
    },

    /**
     * ���������� ������ ��� ������ ������
     */
    showPasswordTooltip: function() {
        if (cur.isEmailPass) {
            return;
        }

        Login._showRightTooltip(PASSWORD_TOOLTIP_CLASS, cur.passwordTooltip, [-210, -63, 3]);
    },

    // endregion

    // endregion

    // region Scumfeed unblock

    /**
     * ������ ������ �� ������� �������������.
     */
    fastUnblock: function() {
        ajax.post('/al_login.php', {
            act: ACT_FAST_UNBLOCK,
            hash: cur.fastUnblockHash
        }, {
            onDone: function() {
                nav.reload();
            },
            onFail: function(errorMessage) {
                showDoneBox(errorMessage);
                return true;
            },
            showProgress: lockButton.pbind('blocked_unblock_bad'),
            hideProgress: unlockButton.pbind('blocked_unblock_bad'),
        });
    }
    // endregion
};

try {
    stManager.done('login.js');
} catch (e) {
    console.log(e);
}