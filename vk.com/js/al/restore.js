var Restore = {
    maxPhotosWithType: 1,
    maxPhotos: 2,

    requestTypeFull: 0,
    requestTypeSimple: 4,

    onlineNoOwner: 1,
    onlineOwner: 2,

    submitAuthCode: function(hash) {
        var btn = ge('authBtn'),
            codeInput = ge('code_input'),
            code = trim(val(codeInput));

        if (code.length < 5) {
            return notaBene(codeInput);
        }

        ajax.post('login?act=a_auth_by_code', {
            hash: hash,
            code: code
        }, {
            onDone: function(msg, disable) {
                showMsg('error', msg, 'error', true);
                if (disable) {
                    disableButton(btn, true);
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    submitInstantAuthAsk: function(hash, ia) {
        cur.authAskSureBox.hide();
        cur.resetPasswordIA = ia;
        Restore.submitForgotPassword(hash);
    },

    submitForgotPassword: function(hash) {
        var btn = ge('submitBtn'),
            loginInput = ge('login_input'),
            lastNameInput = ge('lastname_input');
        if (loginInput) {
            var login = val(loginInput);
            if (login.length < 3) {
                return notaBene(loginInput);
            }
            cur.restoreForgotPassParams.login = login;
        }

        if (lastNameInput) {
            var lastName = val(lastNameInput);
            if (lastName.length < 1) {
                return elfocus('lastname_input');
            }
            cur.restoreForgotPassParams.lastName = lastName;
        }

        ajax.post('login?act=a_forgot', {
            login: cur.restoreForgotPassParams.login,
            lname: cur.restoreForgotPassParams.lastName,
            hash: cur.resetPasswordTHash,
            ia: cur.resetPasswordIA,
            sure: hash
        }, {
            onDone: function(result, content, script) {
                result = intval(result);
                if (result === 0) {
                    showMsg('error', content, 'error', true);
                } else if (result === 1) {
                    if (content !== '') {
                        val('forgot_panel', content);
                        showBackLink('/restore');
                        hide(geByClass1('top_nav_link', ge('top_links')));
                        show('top_links');
                    }
                    if (script !== '') {
                        eval(script);
                    }
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    submitForgotPasswordByPhone: function(login, hash, shash) {
        var btn = ge('submitBtn'),
            password = val('password'),
            password2 = val('password2'),
            manually = null;
        if (login === '') {
            login = trim(val('phone_login'));
            if (login === '') {
                return notaBene('phone_login');
            }
            manually = 1;
        }

        if (!password.length) {
            return notaBene('password');
        } else if (!password2.length) {
            return notaBene('password2');
        }

        ajax.post('login?act=a_forgot_by_phone', {
            hash: hash,
            shash: shash,
            login: login,
            password: password,
            password2: password2,
            manually: manually
        }, {
            onDone: function(code, message) {
                if (code == 1) {
                    val('restore_password_form', message);
                } else {
                    val('error', message);
                    show('error');
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    initForgotPassword: function(hash) {
        showBackLink();
        cur.oldLd = window.onLoginDone;
        cur.restoreForgotPassParams = {};
        window.onLoginDone = function() {
            nav.go('/', {
                force: true,
                noback: true
            });
        };
        cur.destroy.push(function(c) {
            window.onLoginDone = c.oldLd;
            delete cur.restoreForgotPassParams;
        });
        elfocus('login_input');
    },
    showMsgBox: function(text, title, input) {
        setTimeout(showFastBox({
            title: title,
            width: 440,
            onHide: function() {
                if (input) ge(input).focus();
            }
        }, text).hide, 8000);
    },
    closeRequest: function(el) {
        lockButton(el);
        var query = {
            act: 'a_cancel_request_by_author',
            hash: cur.options.cancel_hash,
            rhash: cur.options.hash,
            rid: cur.options.request_id
        };
        ajax.post('al_restore.php', query, {
            onDone: function(res) {
                unlockButton(el);
                curBox().hide();
            }
        });
    },
    closeRequestBox: function() {
        showFastBox(getLang('global_box_confirm_title'), getLang('restore_you_sure_want_cancel_request'), getLang('box_no'), false, getLang('box_yes'), Restore.closeRequest);
    },
    showResult: function(id, text, input, scrollToInput) {
        if (cur.wasShown && cur.wasShown != id) hide(cur.wasShown);
        ajax.post('al_index.php', {
            act: 'restore_log',
            id: id,
            text: text,
            value: input ? input.value : 'none'
        });
        cur.wasShown = id;

        var el = ge(id);
        val(el, text);
        if (!isVisible(el)) {
            show(el);
        }
        setTimeout(function() {
            scrollToInput ? scrollToY(getXY(input)[1] - 100, 200) : scrollToY(getXY(el)[1] - 20, 200);
            setTimeout(elfocus.pbind(input), 201);
        }, 1);
        return false;
    },

    checkPhoneOnBlur: function(el) {
        var phone_inp = el;
        phone = ge(phone_inp).value.replace(/[^0-9]/g, '');
        if (isVisible(phone_inp) && !(/^[1-9][0-9]{6,14}$/.test(phone))) {
            return;
        }

        var done = function(res, text) {
            var infoNodeId = 'request_phone_check_res';
            if (res === 2) {
                if (cur.wasShown && cur.wasShown != infoNodeId) {
                    hide(cur.wasShown);
                }
                cur.wasShown = infoNodeId;
                val(infoNodeId, text);
                if (!isVisible(infoNodeId)) {
                    setTimeout(function() {
                        slideDown(infoNodeId, 150);
                    }, 50);
                }
                cur.checkedPhones[phone] = [res, text];
            } else {
                if (isVisible(infoNodeId)) {
                    slideUp(infoNodeId, 200);
                }
            }
            if (res == 3 && !cur.restoreNoEmailAccess) {
                hide('submit_wrapper');
                return Restore.changeFormStep('phones', 'back_link');
            }
            Restore.checkedPasswordStatus();
        };
        cur.checkedPhones = cur.checkedPhones || {};
        if (phone in cur.checkedPhones) {
            done(cur.checkedPhones[phone][0], cur.checkedPhones[phone][1]);
        } else {
            ajax.post('restore?act=a_check_phone', {
                hash: cur.options.fhash,
                phone: phone
            }, {
                onDone: done
            });
        }
    },
    checkEmailOnBlur: function() {
        var email = val('login');
        if (!email) {
            return;
        }
        if (!(/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(email))) {
            return;
        }
        if (!cur.restoreNoEmailAccess) {
            ajax.post('restore?act=a_check_email', {
                hash: cur.options.fhash,
                email: email
            }, {
                onDone: function(ask) {
                    if (ask) {
                        hide('submit_wrapper');
                        return Restore.changeFormStep('phones', 'back_link');
                    }
                }
            });
        }
    },
    getUploadedPhotosIds: function(withDeleted) {
        var r = [];
        each(cur.images, function(i, img) {
            if (withDeleted || !img.deleted) {
                r.push(img.id);
            }
        });
        return r;
    },
    submitDocPhoto: function() {
        return Restore.checkFile(0);
    },
    submitPersonalPhoto: function() {
        return Restore.checkFile(1);
    },
    checkFile: function(type, accept) {
        if (!accept) {
            var name, btn;
            if (type == 1) {
                name = val('photo_input');
            } else {
                name = val('doc_input');
            }
            try {
                var regex = new RegExp(cur.screenshot_regex, 'gi');
                if (regex.test(name)) {
                    var box = new MessageBox({
                            title: getLang('global_action_confirmation')
                        })
                        .addButton(getLang('restore_no_other_photo'));
                    box.addButton(getLang('box_yes'), function() {
                            Restore.checkFile(type, true);
                            box.hide();
                        }, 'gray')
                        .content(getLang('restore_screenshoot_confirm_box_text')).show();
                    return;
                } else {
                    var regex = new RegExp(cur.scan_regex, 'gi');
                    if (regex.test(name)) {
                        return Restore.showMsgBox(getLang('restore_scan_error_msg'), getLang('global_error'));
                    }

                }
            } catch (e) {}
        }

        if (type == 1) {
            btn = ge('photo_file_button');
        } else {
            btn = ge('doc_file_button');
        }
        lockButton(btn);
        var id = (type == 1 ? 'photo_upload_ids' : 'doc_upload_ids');
        val(id, Restore.getUploadedPhotosIds(true).join(','));

        lockButton('restore_extend_request_button');
        if (cur.restoreTTLTimeout) {
            clearTimeout(cur.restoreTTLTimeout);
        }
        if (type == 1) {
            document.photo_upload.submit();
        } else {
            document.doc_upload.submit();
        }
    },
    uploadError: function(code, type) {
        unlockButton('restore_extend_request_button');
        if (cur.regenerateHash) {
            cur.regenerateHash();
        }
        var err = '',
            timeout = 4000;
        if (!code) {
            err = getLang('global_unknown_error');
        } else if (code == 1 || code == 4) {
            err = getLang('restore_not_uploaded');
        } else if (code == 2) {
            err = getLang('restore_bad_format');
        } else if (code == 5) {
            err = getLang('restore_bad_size');
        } else if (code == 7) {
            err = getLang('restore_too_small_image');
            timeout = 8000;
        } else if (code == 8) {
            err = getLang('restore_photo_already_attached');
            timeout = 8000;
        } else if (code == 9) {
            err = getLang('restore_photo_incorrect');
            timeout = 8000;
        } else if (code == 10) {
            err = getLang('support_mobile_restore_no_face_found');
            timeout = 0;
        }
        if (timeout) {
            setTimeout(showFastBox({
                title: getLang('global_error'),
                width: 470
            }, err).hide, timeout);
        } else {
            showFastBox({
                title: getLang('global_error'),
                width: 470
            }, err);
        }

        var prefix = type ? 'photo_' : 'doc_';
        var btn = ge(prefix + 'file_button');
        unlockButton(btn);
    },
    uploadComplete: function(photo, photo_id, photo_hash, type, html, photoType) {
        var step = type ? 'photo' : 'doc',
            prefix = step + '_';
        var btn = ge(prefix + 'file_button') || ge('restore_extend_request_button');
        unlockButton(btn);

        var index = cur.images.length,
            newOne = true;
        each(cur.images, function(ind, img) {
            if (img.type == type && img.deleted) {
                index = ind;
                newOne = false;
                return false;
            }
        });

        cur.images[index] = {
            id: photo_id,
            hash: photo_hash,
            type: type
        };
        ++cur.images_count[type];

        var photosLimit = photoType == 2 || photoType == 3 ? Restore.maxPhotosWithType : Restore.maxPhotos;
        ge(prefix + 'input').disabled = (cur.images_count[type] >= photosLimit);
        if (ge(prefix + 'input').disabled && photoType != 3) {
            hide(prefix + 'upload');
        }

        show(prefix + 'photos');
        html = html.split('%index%').join(index).split('%type%').join(type);
        var imageNode = se(html),
            imageContainer = ge(prefix + 'photos');

        if (imageContainer) {
            if (newOne) {
                imageContainer.appendChild(imageNode);
            } else {
                domReplaceEl(imageContainer, imageNode);
            }
        }
        hide('simple_request_incorrect');
        if (photoType == 3) {
            Restore.extendRequest(ge('restore_extend_request_button'));
        } else {
            Restore.changeFullRequestButton(true);
        }
    },
    deleteImage: function(type, index, photoType) {
        var step = type ? 'photo' : 'doc',
            prefix = step + '_';
        if (cur.images[index].deleted) {
            if (cur.images_count[type] >= 2) {
                return;
            }
            cur.images[index].deleted = false;
            removeClass('photo_img' + index, 'restore_uploaded_image__img_removed');

            var photosLimit = photoType == 2 || photoType == 3 ? Restore.maxPhotosWithType : Restore.maxPhotos;
            if (++cur.images_count[type] >= photosLimit) {
                ge(prefix + 'input').disabled = true;
                hide(prefix + 'upload');
            }
            val('del_link' + index, getLang('global_delete'));
            show('restore_roll_button_' + step);
        } else {
            cur.images[index].deleted = true;
            addClass('photo_img' + index, 'restore_uploaded_image__img_removed');

            --cur.images_count[type];
            ge(prefix + 'input').disabled = false;
            show(prefix + 'upload');
            val('del_link' + index, getLang('global_dont_delete'));
            if (!cur.images_count[type]) {
                hide('restore_roll_button_' + step);
            }
        }
    },
    checkedPasswordStatus: function() {
        if (cur.restorePasswordChecked) {
            var password = val('old_password');
            if (cur.restorePasswordChecked[password] && cur.restorePasswordChecked[password] !== 1) {
                Restore.toFullRequest(false, 1);
            }
        }
    },
    checkPassword: function(el) {
        if (el.timeout) {
            clearTimeout(el.timeout);
        }
        el.timeout = setTimeout(function() {
            var password = val('old_password');
            if (!cur.restorePasswordChecked) {
                cur.restorePasswordChecked = {};
            }
            var phoneInput = isVisible('new_phone_wrap') ? 'new_phone' : 'phone';
            var phone = val(phoneInput).replace(/[^0-9]/g, '');
            if (password.length > 0 && !cur.restorePasswordChecked[password]) {
                ajax.post('restore?act=a_check_password', {
                    hash: cur.options.fhash,
                    password: password
                }, {
                    onDone: function(res) {
                        cur.restorePasswordChecked[password] = res;
                        if (res !== 1 && phone) {
                            Restore.toFullRequest(false, 1);
                        }
                    }
                });
            }
        }, 400);
    },
    submitPageLink: function() {
        var btn = ge('submitBtn'),
            link = val('link');
        if (!link) {
            elfocus('link');
            return;
        }
        hide('error');
        ajax.post('al_restore.php?act=a_profile_link', {
            link: link
        }, {
            onDone: function(msg) {
                val('error', msg);
                show('error');
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    usePhoneAsLogin: function() {
        var btn = ge('usePhoneBtn');
        lockButton(btn);
        var params = {
            act: 'a_new_email',
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: -1
        };
        ajax.post('al_restore.php', params, {
            onDone: function(msg) {
                if (msg) {
                    unlockButton(btn);
                    Restore.showMsgBox(msg, getLang('global_error'));
                } else {
                    nav.reload();
                }
            },
            onFail: function() {
                unlockButton(btn);
            }
        });
    },
    useAnotherEmail: function() {
        var btn = ge('anotherEmailBtn');
        var login = ge('login').value;
        if (!(/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(login))) {
            Restore.showMsgBox(getLang('restore_error_email'), getLang('global_error'), 'login');
            return;
        }
        lockButton(btn);
        var params = {
            act: 'a_new_email',
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: login
        };
        ajax.post('al_restore.php', params, {
            onDone: function(msg) {
                unlockButton(btn);
                Restore.showMsgBox(msg, getLang('global_error'));
            },
            onFail: function() {
                unlockButton(btn);
            }
        });
    },
    extendRequest: function(btn, force) {
        var params = {
            rid: cur.options.request_id,
            hash: cur.options.phash,
            comment: val('comment'),
            images: []
        };
        if (force === true) {
            params['force'] = 1;
        }
        for (var i = 0; i < cur.images.length; ++i) {
            if (!cur.images[i].deleted) {
                params.images.push(cur.images[i].hash);
            }
        }
        if ((!trim(params.comment).length && ge('comment')) && !params.images.length) {
            elfocus('comment');
            return;
        }
        if (cur.restoreTTLTimeout) {
            clearTimeout(cur.restoreTTLTimeout);
        }
        if (!params.images.length && cur.restorePhotosRequested && !force) {
            var boxOpts = {
                title: getLang('global_warning'),
                width: 620
            };
            cur.restoreConfirmNoPhotos = showFastBox(boxOpts, getLang('restore_extend_no_photos_are_you_sure'), getLang('restore_extend'), function() {
                if (cur.regenerateHash) {
                    cur.regenerateHash();
                }
                cur.restoreConfirmNoPhotos.hide();
            }, getLang('restore_dont_extend_with_photos'), function() {
                cur.restoreConfirmNoPhotos.hide();
                Restore.extendRequest(btn, true);
            });
            return;
        }
        if (cur.selfieHash) {
            Restore.deleteImage(1, 0, 3);
        }
        ajax.post('al_restore.php?act=a_extend', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(result, msg) {
                if (result == 0) {
                    Restore.showMsgBox(msg, getLang('global_error'));
                } else if (result == 1) {
                    val('request_result_msg', msg);
                    hide('request_result_wrap');
                    show('request_result_msg');
                } else if (result == 2) {
                    notaBene('comment');
                }
            },
            onFail: function() {
                if (cur.regenerateHash) {
                    cur.regenerateHash();
                }
            }
        });
    },
    noEmailAccessSimpleRequest: function() {
        hide('restore_roll_back_link');
        show('submit_wrapper');
        cur.restoreNoEmailAccess = 1;
    },
    submitSimpleRequest: function() {
        var btn = ge('submitBtn'),
            login, email, old_phone, phone, password;
        login = val('login');
        var phoneInp = isVisible('new_phone_wrap') ? 'new_phone' : 'phone';
        phone = val(phoneInp).replace(/[^0-9\*]/g, '');
        if (phone) {
            Restore.checkedPasswordStatus();
        }
        if (isVisible('email_wrap') && !(/^\s*$/.test(login))) {
            if (!(/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(login))) {
                if (!(/^\s*[a-zA-Z0-9_]{6,32}\s*$/.test(login))) {
                    return Restore.showResult('request_email_res', getLang('restore_login_error'), 'login');
                }
            }
        }
        email = val('email');
        old_phone = val('old_phone').replace(/[^0-9]/g, '');
        if (!(/^\s*$/.test(old_phone))) {
            if (!(/^[1-9][0-9]{6,14}$/.test(old_phone))) {
                return Restore.showResult('request_phone_res', getLang('restore_old_phone_error'), 'old_phone');
            }
        }
        if (isVisible(phoneInp) && !(/^[1-9][0-9\*]{6,14}$/.test(phone))) {
            return Restore.showResult('request_phone_res', getLang('restore_phone_error'), phoneInp);
        }
        if (cur.checkedPhones && cur.checkedPhones[phone] && cur.checkedPhones[phone][0] == 2) {
            return Restore.showResult('request_email_res', cur.checkedPhones[phone][1], phoneInp, true);
        }
        if (!isVisible('new_phone_wrap')) {
            if (!login && !old_phone) {
                var text = getLang('restore_need_email_or_phone');
                text += '<br>' + getLang('restore_need_email_or_phone_desc');
                return Restore.showResult('request_phone_res', text, 'old_phone')
            }
        }
        password = val('old_password');
        if (!password) {
            return Restore.showResult('request_old_password_res', getLang('restore_need_old_password') + '<br>' + getLang('restore_need_old_password_desc'), 'old_password');
        }
        cur.validationLastCallback = function(res) {
            hide('request_phone_res');
            if (res) {
                Restore.submitSimpleRequest();
            } else {
                elfocus('phone');
            }
        };

        ajax.post('restore?act=a_request', {
            hash: cur.options.fhash,
            login: login,
            email: email,
            phone: phone,
            old_phone: old_phone,
            password: password,
            no_email_access: cur.restoreNoEmailAccess || 0
        }, {
            onDone: function(result, msg, msgContainerId, input, errorType, step) {
                var code = intval(result);
                if (code == 0) {
                    step = msgContainerId;
                }
                if (code == -4) {
                    return Restore.toFullRequest(false, 1);
                }
                if (step == 'back_link') {
                    hide('submit_wrapper');
                    return Restore.changeFormStep('phones', 'back_link');
                }
                Restore.processSubmitResult(result, msg, msgContainerId, input, errorType);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    processSubmitResult: function(result, msg, msgContainerId, input, errorType, full) {
        var code = intval(result);
        if (code == -2) {
            var btn, callback;
            if (full) {
                btn = ge('restore_submit_full_request');
                callback = Restore.submitFullRequest;
            } else {
                btn = ge('submitBtn');
                callback = Restore.submitSimpleRequest;
            }
            lockButton(btn);
            return setTimeout(callback, 1000);
        } else if (code == -3) {
            if (errorType == 'login') {
                msg += '<br>' + getLang('restore_need_email_or_phone_desc');
            }
            Restore.showResult(msgContainerId, msg, input);
        } else {
            if (isVisible('simple_request_incorrect')) {
                hide('simple_request_incorrect');
            }
            Restore.showResult('request_phone_res', msg, input);
        }
    },
    toFullRequest: function(mid, msg) {
        if (!isVisible('new_phone_wrap')) {
            var phone = val('phone').replace(/[^0-9]/g, '');
        } else {
            var phone = val('new_phone').replace(/[^0-9]/g, '');
        }
        var query = {
            act: 'return_page',
            full: 1
        };
        if (mid) {
            query.mid = mid;
        }
        if (phone) {
            query.phone = phone;
        }
        if (msg) {
            query.m = msg;
        }
        nav.change(query);
    },
    infoCheckSubmit: function(btn) {
        var link = trim(val('page_link')),
            phone = val('phone').replace(/[^0-9]/g, ''),
            errorBlock = ge('restore_info_error');
        if (!link.length) {
            return notaBene('page_link');
        }
        if (!phone.length) {
            return notaBene('phone');
        }
        hide(errorBlock);
        removeClass(errorBlock, 'restore_info_error_big_text');
        ajax.post('/restore', {
            act: 'a_check_info',
            link: link,
            phone: phone
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(type, text, input) {
                if (type != 1 && text) {
                    val(errorBlock, text);
                    if (type == -1) {
                        addClass(errorBlock, 'restore_info_error_big_text');
                    }
                    show(errorBlock);
                    if (input) {
                        notaBene(input);
                    }
                }
            }
        });
    },
    initCheckInfo: function() {
        Restore.initFormTT(ge('page_link'), 'restore_info_page_link_tooltip');
    },
    initResendCounter: function(time) {
        var btn = ge('resend_sms_button');
        if (time > 0) {
            addClass(btn, 'button_disabled');
            btn.time = time;
            var updateTime = function() {
                if (btn.time <= 1) {
                    removeClass(btn, 'button_disabled');
                    val(btn, getLang('restore_resend_sms_data'));
                    clearInterval(btn.timeInterval);
                    return;
                }
                btn.time -= 1;
                var time = formatTime(btn.time);
                val(btn, getLang('restore_can_resend_sms_after').replace('{time}', time));
            };
            updateTime();
            btn.timeInterval = setInterval(updateTime, 1000);
        }
    },
    resendSMS: function(el) {
        if (hasClass(el, 'button_disabled')) {
            return;
        }
        lockButton(el);
        ajax.post('al_restore.php', {
            act: 'a_resend_sms',
            hash: cur.resend_hash,
            id: cur.rid
        }, {
            onDone: function(status, can_try, time, success_msg) {
                unlockButton(el);
                if (status == 1) {
                    if (time) {
                        Restore.initResendCounter(time);
                    }
                    if (can_try == 0) {
                        hide(el);
                    }
                    if (success_msg) {
                        addClass('resend_success', 'active');
                        setTimeout(removeClass.pbind('resend_success', 'active'), 10000);
                    }
                } else {
                    hide(el);
                }
            }
        });
    },
    initTimeButton: function() {
        if (cur.resend_counter > 0) {
            Restore.initResendCounter(cur.resend_counter);
        }
    },
    initRequest: function() {
        extend(cur, {
            images: [],
            images_count: [0, 0],
            request_id: false,
            request_hash: false
        });
        var request_type = cur.options.request_type;
        var phone_id = request_type == Restore.requestTypeFull ? 'new_phone' : 'phone';
        var cmt = ge('comment'),
            phoneField = ge(phone_id),
            oldPhoneField = ge('old_phone'),
            loginField = ge('login'),
            oldPassField = ge('old_password'),
            newPhoneField = ge('new_phone');
        placeholderSetup(cmt, {
            back: true
        });
        Restore.initFormTT(cmt, 'restore_lost_phone_your_comment_short');
        if (isVisible(phoneField)) {
            Restore.initFormTT(phoneField, 'restore_form_available_phone_tooltip');
        }
        if (request_type == Restore.requestTypeSimple && isVisible(newPhoneField)) {
            Restore.initFormTT(newPhoneField, 'restore_form_available_phone_tooltip');
        }
        if (isVisible(oldPhoneField)) {
            Restore.initFormTT(oldPhoneField, 'restore_form_old_phone_tooltip');
        }
        if (isVisible(loginField)) {
            Restore.initFormTT(loginField, 'restore_form_old_email_tooltip');
        }
        if (isVisible(oldPassField)) {
            Restore.initFormTT(oldPassField, 'restore_about_old_password');
        }
        cur.destroy.push(function() {
            delete cur.requestStep;
            delete cur.requestParams;
            delete cur.restoreNoEmailAccess;
        });
    },

    initFormTT: function(el, langKey) {
        addEvent(el, 'focus', showTooltip.pbind(el, {
            dir: 'right',
            text: getLang(langKey),
            shift: function() {
                var h = Math.round((getSize(el.tt.container)[1] + getSize(el)[1]) / 2);
                return [225, -h, 0];
            },
            width: 215,
            slideX: -15,
            hasover: 1,
            forcetoup: true,
            nohide: true
        }));
        addEvent(el, 'blur', function() {
            if (el.tthide) el.tthide();
        });
    },
    changeFormStep: function(oldStep, newStep) {
        var prefix = 'restore_roll_';
        removeClass(prefix + oldStep, '_restore_roll_active');
        cur.requestStep = newStep;
        if (oldStep == 'back_link') {
            hide(prefix + oldStep);
        }
        var newRoll = ge(prefix + newStep);
        show(newRoll);
        removeClass(newRoll, 'restore_roll_colored');
        scrollToY(getXY(newRoll)[1], 400);
        removeClass('restore_roll_' + newStep, 'restore_roll_hidden');
        addClass(newRoll, '_restore_roll_active');
        if (newStep == 'comment') {
            var cmt = ge('comment');
            autosizeSetup(cmt, {
                minHeight: 55,
                maxHeight: 300
            });
            addEvent(cmt, 'focus keyup', function(ev) {
                if (cmt.timeout) {
                    clearTimeout(cmt.timeout);
                }
                cmt.timeout = setTimeout(function() {
                    try {
                        var cmt_text = val(cmt),
                            regex = new RegExp(cur.delete_regex, 'gi');
                        if (regex.test(cmt_text)) {
                            var text = cur.goto_support;
                        } else {
                            var text = getLang('restore_lost_phone_your_comment_short');
                        }
                        val(cmt.tt.container, '<div class="wrapped"><div class="tt_text">' + text + '</div></div>');
                    } catch (e) {}
                }, 300);
            });
        }
    },
    checkSimpleRequestFields: function() {
        var old_phone = val('old_phone').replace(/[^0-9]/g, '');
        if (!(/^\s*$/.test(old_phone))) {
            if (!(/^[1-9][0-9]{6,14}$/.test(old_phone))) {
                return Restore.showResult('request_phone_res', getLang('restore_old_phone_error'), 'old_phone');
            }
        }
        var phoneInp = isVisible('new_phone_wrap') ? 'new_phone' : 'phone',
            phone = val(phoneInp).replace(/[^0-9]/g, '');
        if (isVisible(phoneInp) && !phone) {
            notaBene(phoneInp);
            return false;
        }
        if (isVisible(phoneInp) && !(/^[1-9][0-9]{6,14}$/.test(phone))) {
            return Restore.showResult('request_phone_res', getLang('restore_phone_error'), phoneInp);
        }
        Restore.checkedPasswordStatus();
        if (cur.checkedPhones && cur.checkedPhones[phone] && cur.checkedPhones[phone][0] == 2) {
            return Restore.showResult('request_email_res', cur.checkedPhones[phone][1], phoneInp, true);
        }
        return true;
    },
    checkSimpleRequestPhone: function(el) {
        if (el && !cur.restoreNoEmailAccess) {
            clearTimeout(el.timeout);
            el.timeout = setTimeout(function() {
                if (Restore.checkSimpleRequestFields(el)) {
                    Restore.checkPhoneOnBlur(el);
                }
            }, 1000);
        }
    },
    submitFullRequest: function(no_email_access) {
        var phoneInput = 'new_phone',
            btn = ge('restore_submit_full_request');
        if (!cur.requestParams) {
            cur.requestParams = {};
            cur.requestStep = 'phones';
        }
        if (cur.requestStep == 'phones') {
            var phone = val(phoneInput).replace(/[^0-9\*]/g, '');
            if (!phone) {
                return notaBene(phoneInput);
            }
            if (!(/^[1-9][0-9\*]{6,14}$/.test(phone))) {
                return Restore.showResult('request_phone_res', getLang('restore_phone_error'), phoneInput);
            }
            cur.requestParams.phone = phone;
        }
        if (cur.requestStep == 'back_link' && no_email_access) {
            return Restore.changeFormStep('back_link', 'photo');
        }
        if (cur.requestStep == 'photo') {
            if (cur.images_count[1] < 1) {
                return Restore.showResult('request_photo_res', getLang('restore_photo_error') + '<br>' + getLang('restore_attention'));
            }
        }
        if (cur.requestStep == 'doc') {
            if (cur.images_count[0] < 1) {
                return Restore.showResult('request_doc_res', getLang('restore_doc_error') + '<br>' + getLang('restore_attention'));
            }
        }
        if (cur.requestStep == 'doc' || cur.requestStep == 'photo') {
            var images = [];
            each(cur.images, function(i, img) {
                if (!img['deleted']) {
                    images.push(img['hash']);
                }
            });
            cur.requestParams.images = images;
        }
        if (cur.requestStep == 'doc') {
            Restore.changeFullRequestButton(true, getLang('restore_submit'));
            return Restore.changeFormStep('doc', 'comment');
        }

        if (cur.requestStep == 'comment') {
            cur.requestParams.comment = val('comment');
        }
        var params = extend({
            hash: cur.options.fhash
        }, cur.requestParams);
        ajax.post('restore?act=a_request', params, {
            onDone: function(result, msg, msgContainerId, input, errorType, step) {
                var code = intval(result);
                if (code == 0) {
                    step = msgContainerId;
                }
                if (code == 1) {
                    val('request_result', msg);
                    show('request_result');
                    hide('request_form');
                    scrollToTop();
                    return;
                }
                if (code == -5) {
                    var box = new MessageBox({
                        title: getLang('global_action_confirmation')
                    });
                    box.addButton(getLang('restore_last_online_yes'), function() {
                        cur.requestParams.no_online = Restore.onlineOwner;
                        box.hide();
                        Restore.submitFullRequest();
                    });
                    box.addButton(getLang('restore_last_online_no'), function() {
                        cur.requestParams.no_online = Restore.onlineNoOwner;
                        box.hide();
                        Restore.submitFullRequest();
                    }, 'gray');
                    box.content(getLang('restore_last_online_modal')).show();
                    return;
                }
                if (step == 'back_link') {
                    Restore.changeFullRequestButton(false);
                    return Restore.changeFormStep('phones', 'back_link');
                } else if (step == 'photo') {
                    Restore.changeFullRequestButton(false);
                    return Restore.changeFormStep('phones', 'photo');
                } else if (step == 'doc') {
                    Restore.changeFullRequestButton(false);
                    return Restore.changeFormStep('photo', 'doc');
                }
                if (code == -3) {
                    hide('simple_request_incorrect');
                }
                Restore.processSubmitResult(result, msg, msgContainerId, input, errorType, true);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    resetPasswordByEmail: function(el) {
        var phone = val('new_phone').replace(/[^0-9]/g, '');
        ajax.post('/login?act=a_forgot', {
            login: val('login'),
            sure: cur.options.fhash,
            hash: cur.resetPasswordTHash,
            from_request: 1
        }, {
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el),
            onDone: function(code, message) {
                if (code == 1) {
                    hide(el);
                    val('reset_password_button', message);
                } else {
                    Restore.showResult('restore_back_link_error', message);
                }
            }
        });
    },
    changeFullRequestButton: function(display, text) {
        toggle('restore_roll_button', display);
        if (text) {
            val('restore_submit_full_request', text);
        }
    },
    activate: function(btn, id, hash) {
        if (isButtonLocked(btn)) {
            return;
        }
        ajax.post('restore?act=a_activate', {
            id: id,
            hash: hash
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    }
};

try {
    stManager.done('restore.js');
} catch (e) {}