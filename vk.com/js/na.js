function change_mail() {
    showBox('change_mail', 'register.php', {
        act: 'change_mail_box'
    }, false, true, {
        type: 'POPUP',
        hideOnClick: false,
        progress: 'change_progress'
    }, ['css/al/reg.css']);
}

var resend_box = null;

function do_change_mail(use_old_mail) {
    if (window.winBoxes.change_mail && isVisible('change_progress')) return;
    if (resend_box && resend_box.isVisible()) return;
    var show_error = function(error) {
        ge('change_mail_error').innerHTML = error;
        show('change_mail_error');
        focusAtEnd('new_mail');
    }
    var mail = '',
        resend_box;
    if (use_old_mail !== 1) {
        mail = ge('new_mail').value;
        if (/^\s*$/.test(mail)) {
            focusAtEnd('new_mail');
            return;
        }
        if (!(/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(mail))) {
            show_error(lang_reg_error_bad_email);
            return;
        }
        show('change_progress');
    } else {
        if (!resend_box) {
            resend_box = new MessageBox({
                hideOnClick: false
            });
        }
        resend_box.setOptions({
            type: 'POPUP'
        });
        resend_box.content('<div class="box_loader"></div>').show();
    }
    Ajax.postWithCaptcha('register.php', {
        act: 'do_change_mail',
        email: mail
    }, {
        onSuccess: function(obj, text) {
            hide('change_progress');
            var response = eval('(' + text + ')');
            if (response.error) {
                if (window.winBoxes.change_mail) {
                    show_error(response.error);
                } else if (resend_box) {
                    resend_box.setOptions({
                        type: 'MESSAGE',
                        title: getLang('global_error')
                    });
                    resend_box.addButton({
                        label: getLang('box_close'),
                        onClick: resend_box.hide
                    });
                    resend_box.content(response.error);
                }
            } else if (response.redir) {
                location.replace(response.redir);
            } else {
                if (window.winBoxes.change_mail) {
                    window.winBoxes.change_mail.content(response.txt);
                    window.winBoxes.change_mail.removeButtons().addButton({
                        label: getLang('box_close'),
                        onClick: window.winBoxes.change_mail.hide
                    });
                    setTimeout(function() {
                        window.winBoxes.change_mail.hide(500);
                    }, 2000);
                } else if (resend_box) {
                    resend_box.setOptions({
                        type: 'MESSAGE',
                        title: response.title
                    });
                    resend_box.addButton({
                        label: getLang('box_close'),
                        onClick: resend_box.hide
                    });
                    resend_box.content(response.txt);
                    setTimeout(function() {
                        resend_box.hide(500);
                    }, 2000);
                }
                ge('please_confirm_mail').innerHTML = response.please;
            }
        },
        onFail: function(obj, text) {
            hide('change_progress');
            show_error(text);
        },
        onCaptchaShow: function() {
            hide('change_progress');
        },
        onCaptchaHide: function(success) {
            if (window.winBoxes.change_mail && use_old_mail !== 1) {
                window.winBoxes.change_mail.show();
            } else if (resend_box) {
                resend_box.show();
            }
        }
    });
}

function show_change_mail_box(on_hide) {
    if (!window._please_box) {
        window._please_box = new MessageBox({
            title: ge('please_confirm_title').value
        });
        window._please_box.addButton({
            label: getLang('box_close'),
            onClick: window._please_box.hide
        });
        window._please_box.content(ge('please_confirm_mail').innerHTML);
    }
    window._please_box.setOptions({
        onHide: on_hide
    });
    window._please_box.show();
}