function isOnlyNumbers(pass) {
    return (pass.search(/[^0-9]/) == -1);
}

var bad_firstname = false,
    bad_lastname = false,
    bad_email = false,
    bad_password = false,
    bad_sex = false;

var error_box = null;

function showErrorBox(body, for_focus, close_caption, close_style, reg_button) {
    if (!close_caption) {
        close_caption = lang_reg_error_close;
    }
    if (!close_style) {
        close_style = 'button_gray';
    }
    if (!error_box) {
        error_box = new MessageBox({
            title: lang_reg_error_incorrectinfo
        });
    }
    error_box.removeButtons();
    if (reg_button) {
        error_box.addButton({
            label: lang_reg_error_continuereg,
            style: 'button_gray',
            onClick: function() {
                error_box.hide();
                register(true);
            }
        });
    }
    error_box.addButton({
        label: close_caption,
        style: close_style,
        onClick: function() {
            error_box.hide();
            if (ge(for_focus)) {
                ge(for_focus).focus();
            }
        }
    });
    error_box.content(body);
    error_box.show();
}

function showError(container, text) {
    var old_text = ge(container + '_old') ? ge(container + '_old').innerHTML : ge(container).innerHTML;
    ge(container).innerHTML = '<span class="error">' + text + '</span><div id="' + container + '_old" style="display: none">' + old_text + '</div>';
    ge(container).style.position = 'relative';
    if (ge(container).offsetHeight > 20) {
        ge(container).style.top = '0px';
    } else {
        ge(container).style.top = '5px';
    }
}

function hideError(container) {
    if (ge(container + '_old')) {
        ge(container).innerHTML = ge(container + '_old').innerHTML;
        ge(container).style.top = '0px';
    }
}

function checkFirstname() {
    var fname = trim(ge('first_name').value);
    bad_firstname = true;
    if (fname.length < 2) {
        showError('firstname_details', lang_reg_error_fname);
    } else if (/[^A-Za-z\-\'\xc0-\xff\xa8\xb8\xb2\xb3\xaf\xbf\xb4\xa5\xaa\xba]/.test(fname)) {
        bad_firstname = false;
        //    showError('firstname_details', lang_reg_bad_symbols_fname);
    } else {
        bad_firstname = false;
    }
}

function firstnameChanged(ev) {
    ev = ev || window.event;
    if (ev && ev.keyCode == 13) focusAtEnd('last_name');
    if (!bad_firstname) {
        return;
    }
    hideError('firstname_details');
    bad_firstname = false;
}

function checkLastname() {
    var lname = trim(ge('last_name').value);
    bad_lastname = true;
    if (lname.length < 2) {
        showError('lastname_details', lang_reg_error_lname);
    } else if (/[^A-Za-z\-\'\xc0-\xff\xa8\xb8\xb2\xb3\xaf\xbf\xb4\xa5\xaa\xba]/.test(lname)) {
        bad_lastname = false;
        //    showError('lastname_details', lang_reg_bad_symbols_lname);
    } else {
        bad_lastname = false;
    }
}

function lastnameChanged(ev) {
    ev = ev || window.event;
    if (ev && ev.keyCode == 13) focusAtEnd('regemail');
    if (!bad_lastname) {
        return;
    }
    hideError('lastname_details');
    bad_lastname = false;
}


var no_email_reg = false,
    reg_login = '',
    reg_pass = '',
    own_password = false,
    own_email = false;

function emailChanged(ev) {
    ev = ev || window.event;
    if (ev && ev.keyCode == 13) focusAtEnd('regpass');
    if (!bad_email) {
        return;
    }
    hideError('email_details');
    bad_email = false;
}

function checkEmail() {
    var theMail = ge('regemail').value;
    var lenMail = theMail.length;
    bad_email = true;
    if (no_email_reg) {
        if (lenMail < 6) {
            showError('email_details', lang_reg_login_must_be_more);
        } else if (lenMail > 32) {
            showError('email_details', lang_reg_login_must_be_less);
        } else if (theMail.match(/[^a-zA-Z_0-9]/)) {
            showError('email_details', lang_reg_no_email_desc);
        } else if (theMail.match(/^(id)?\d+$/i)) {
            showError('email_details', lang_reg_login_is_numeric);
        } else {
            bad_email = false;
        }
    } else {
        var mailDot = theMail.lastIndexOf('.');
        var mailAt = theMail.indexOf('@');
        if (lenMail < 8) {
            showError('email_details', lang_reg_error_email);
        } else if (mailDot < 0 || mailAt <= 0 || mailDot <= mailAt + 1) {
            showError('email_details', lang_reg_error_bad_email);
        } else {
            bad_email = false;
        }
    }
}

function checkLogin() {
    if (!no_email_reg) {
        return true;
    }
    var theMail = ge('regemail').value;
    var lenMail = theMail.length;
    if (lenMail < 6 || lenMail > 32) {
        return true;
    }
    var callback = function(obj, text) {
        if (text.length) {
            bad_email = true;
            showError('email_details', lang_reg_login_is_taken);
            ge('regemail').focus();
        } else {
            return true;
        }
    }
    Ajax.postWithCaptcha('register.php', {
        act: 'check_login',
        login: theMail
    }, {
        onSuccess: callback
    });
}

function noEmailReg() {
    no_email_reg = true;
    ge('email_details').innerHTML = lang_reg_no_email_desc;
    ge('regemail').value = '';
    ge('emailLabel').innerHTML = lang_reg_login;
    ge('regemail').focus();
    return false;
}

function checkPassword(ignore_silly_password) {
    var thePass = ge('regpass').value;
    var lenPass = thePass.length;
    bad_password = true;
    if (lenPass < 6) {
        showError('password_details', lang_reg_error_pass);
    } else if (!ignore_silly_password && isOnlyNumbers(thePass)) {
        hideError('password_details');
        showErrorBox(lang_reg_error_passonlydigits, 'regpass', lang_reg_error_changepass, 'button_blue', true);
    } else {
        bad_password = false;
    }
}

function passwordChanged(ev) {
    ev = ev || window.event;
    if (ev && ev.keyCode == 13) focusAtEnd('sex');
    if (!bad_password) {
        return;
    }
    hideError('password_details');
    bad_password = false;
}

function checkSex() {
    if (bad_sex = !intval(ge('sex').value)) {
        showError('sex_details', lang_reg_error_sex);
    } else {
        hideError('sex_details');
    }
}

function validate(ignore_silly_password) {
    checkFirstname();
    checkLastname();
    if (!hash || own_email) {
        checkEmail();
    }
    if (!hash || own_password) {
        checkPassword(ignore_silly_password);
    }
    checkSex();
    if (bad_firstname) {
        ge('first_name').focus();
    } else if (bad_lastname) {
        ge('last_name').focus();
    } else if (bad_email) {
        ge('regemail').focus();
    } else if (bad_password) {
        ge('regpass').focus();
    } else {
        return !bad_sex;
    }
    return false;
}

function prepareParams() {
    var result = {
        act: 'register'
    };
    result.first_name = ge('first_name').value;
    result.last_name = ge('last_name').value;
    if (!/^\s*$/.test(hash)) {
        result.hash = hash;
        if (own_password) {
            result.regpass = ge('regpass').value;
        }
        if (own_email) {
            result.regemail = ge('regemail').value;
        }
    } else {
        result.regemail = ge('regemail').value;
        result.regpass = ge('regpass').value;
    }
    result.sex = intval(ge('sex').value);
    timezone_offset = new Date().getTimezoneOffset();
    if (Math.abs(timezone_offset) > 20) {
        result.timezone = -timezone_offset;
    } else {
        result.timezone = -Math.round(timezone_offset / 60);
    }
    result.by_login = no_email_reg ? 1 : 0;
    return result;
}

var registering = false;

function register(ignore_silly_password) {
    if (!registering && validate(ignore_silly_password)) {
        registering = true;
        show('reg_progress');

        reg_login = ge('regemail').value;
        reg_pass = ge('regpass').value;

        var params = prepareParams();
        var failHandler = function(show_error) {
            return function() {
                registering = false;
                hide('reg_progress');
                if (show_error) {
                    showErrorBox('Failed to register.');
                }
            }
        }
        var options = {
            onSuccess: function(obj, text) {
                registering = false;
                hide('reg_progress');

                var response = eval('(' + text + ')');
                if (response.error) {
                    showErrorBox(response.error);
                } else if (response.redir) {
                    location.replace(response.redir);
                } else if (response.do_login) {
                    ge('email_after_reg').value = response.mail ? response.mail : reg_login;
                    ge('pass_after_reg').value = response.pass ? response.pass : reg_pass;
                    ge('login_after_reg').submit();
                } else if (response.not_avail && no_email_reg) {
                    bad_email = true;
                    showError('email_details', lang_reg_login_is_taken);
                    ge('regemail').focus();
                }
            },
            onFail: failHandler(true),
            onCaptchaShow: failHandler(false)
        };
        Ajax.postWithCaptcha('register.php', params, options);
    }
    return false;
}

var terms_box = null;

function show_terms() {
    if (!terms_box) {
        var window_height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
        terms_box = new MessageBox({
            title: lang_reg_reg_terms,
            width: 600,
            onLoad: function() {
                terms_box.setOptions({
                    height: (window_height - 200),
                    bodyStyle: 'overflow: auto; padding: 0; height: ' + (window_height - 270) + 'px'
                });
            }
        });
        terms_box.addButton({
            label: box_close,
            onClick: function() {
                terms_box.hide();
            }
        });
        terms_box.loadContent('help.php?page=terms&ajax=1');
    }
    terms_box.show();
}

var uiSex;
onDomReady(function() {
    uiSex = new Dropdown(ge('sex'), reg_sexes, {
        width: 200,
        onChange: function(value) {
            if (intval(value)) hideError('sex_details');
        }
    });
});

function changeInvitationMail() {
    hide('invitationMailRow');
    show('mailRow');
    ge('regemail').value = ge('invitationMail').innerHTML;
    focusAtEnd('regemail');
    own_email = true;
    return false;
}

function changeInvitationPassword() {
    hide('hiddenPasswordRow');
    show('passwordRow');
    ge('regpass').focus();
    own_password = true;
    return false;
}