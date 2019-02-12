var Help = {
    initCCObjectionSelects: function() {
        cur.citySelect = new CitySelect(ge('ccform_city'), ge('ccform_city_row'), {
            width: 308,
            progressBar: ge('ccform_progress'),
            city: cur.selectData.city_val,
            country: cur.selectData.country
        });
        cur.countrySelect = new CountrySelect(ge('ccform_country'), ge('ccform_country_row'), {
            width: 308,
            progressBar: ge('ccform_progress'),
            country: cur.selectData.country_val,
            citySelect: cur.citySelect
        });
    },
    showMsgBox: function(text, title, input) {
        setTimeout(showFastBox({
            title: title,
            onHide: function() {
                if (input) ge(input).focus();
            }
        }, text).hide, 4000);
        return false;
    },
    submitCCObjection: function(claim_id, content_type, content_owner, content_id) {
        var btn = ge('ccform_submit');
        var params = {
            act: 'a_cc_objection',
            claim_id: claim_id,
            content_type: content_type,
            content_owner: content_owner,
            content_id: content_id,
            name: ge('ccform_name').value,
            email: ge('ccform_email').value,
            country: cur.countrySelect.val(),
            city: cur.citySelect.val(),
            region: ge('ccform_region').value,
            address: ge('ccform_address').value,
            objections: ge('ccform_legality').value,
            doc_mid: ge('ccform_doc_mid').value,
            doc_photo: ge('ccform_doc_photo').value,
            doc_server: ge('ccform_doc_server').value
        };
        if (params.name.length < 5) {
            notaBene('ccform_name');
            return false;
        }
        if (!(/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(params.email))) {
            notaBene('ccform_email');
            return false;
        }
        if (params.country < 1) {
            cur.countrySelect.focus();
            return false;
        }
        if (params.city < 1) {
            cur.citySelect.focus();
            return false;
        }
        if (params.address < 9) {
            notaBene('ccform_address');
            return false;
        }
        if (params.objections.length < 5) {
            notaBene('ccform_legality');
            return false;
        }
        if (!isChecked('ccobjection_agree_email')) {
            return Help.showMsgBox(getLang('help_ccobjection_need_email'), getLang('global_error'));
        }
        if (!isChecked('ccobjection_agree_inform')) {
            return Help.showMsgBox(getLang('help_ccobjection_need_inform'), getLang('global_error'));
        }
        if (!isChecked('ccobjection_agree_rules')) {
            return Help.showMsgBox(getLang('help_ccobjection_need_rules'), getLang('global_error'));
        }


        lockButton(btn);
        ajax.post('/al_help.php', params, {
            onDone: function(result) {
                nav.go('/help?act=cc_objection_sent');
            },
            onFail: function() {
                unlockButton(btn);
            }
        });
    },
    submitDocPhoto: function() {
        var btn = ge('doc_file_button');
        lockButton(btn);
        setTimeout(function() {
            btn.innerHTML = btn.innerHTML; // opera hack for redraw
        }, 0);
        ge('doc_upload_frame').uploadType = 0;
        document.doc_upload.submit();
    },
    uploadError: function(code) {
        var err = '';
        if (!code) {
            err = getLang('global_unknown_error');
        } else if (code == 1 || code == 4) {
            err = getLang('restore_not_uploaded');
        } else if (code == 2) {
            err = getLang('restore_bad_format');
        } else if (code == 5) {
            err = getLang('restore_bad_size');
        }
        setTimeout(showFastBox(getLang('global_error'), err).hide, 2000);

        var prefix = type ? 'photo_' : 'doc_';
        var btn = ge(prefix + 'file_button');
        unlockButton(btn);
    },
    uploadComplete: function(mid, photo, server, thumb) {
        var btn = ge('doc_file_button');
        unlockButton(btn);
        ge('ccform_doc_mid').value = mid;
        ge('ccform_doc_photo').value = photo;
        ge('ccform_doc_server').value = server;
        show('doc_photos');
        ge('doc_photos').innerHTML = '<div id="photo"><img id="photo_img" src="' + thumb + '" /><span onmouseover="this.className=\'over\';" onmouseout="this.className=\'\';" onclick="Help.deleteImage()" id="del_link">' + getLang('global_delete') + '</span></div>';
    },
    deleteImage: function() {
        ge('ccform_doc_mid').value = '0';
        ge('ccform_doc_photo').value = '';
        ge('ccform_doc_server').value = '0';
        hide('doc_photos');
        ge('doc_photos').innerHTML = '';
    },


    initSecurityTest: function(options) {
        extend(cur, options);
        cur.doneQuestions = {};
        cur.qLen = cur.doneLen = cur.doneRight = 0;
        var i;
        for (i in cur.questions) cur.qLen++;
        for (i = 0; i < cur.questions.length; i++) {
            radioBtns['s_test_answer_' + i] = {
                val: 0,
                els: geByClass('radiobtn', ge('help_question' + i), 'div')
            };
        }

        var btn = ge('help_test_finish_btn');
        setStyle('help_test_finish_btn_lock', {
            height: btn.clientHeight + 2,
            width: btn.clientWidth + 2
        });

        if (!cur.after_ban) return;

        cur.nav.push(function(changed, old, n, opts) {
            if (cur.leaving || cur.doneLen >= cur.qLen) return;

            var box = showFastBox(getLang('global_warning'), getLang('help_sectest_away_warning'), getLang('help_sectest_away_skip'), function() {
                cur.leaving = true;
                box.hide();
                nav.go(n);
            }, getLang('global_cancel'), function() {
                box.hide();
            });
            return false;
        });
    },
    stestRadioClick: function(question, answer) {
        if (cur.doneQuestions[question] !== undefined) {
            return;
        }
        var hintEl = ge('help_question_hint' + question),
            qEl = ge('help_question' + question),
            answersEl = geByClass1('help_answers', qEl),
            answersLockEl = geByClass1('help_answers_lock', qEl),
            result = cur.questions[question][answer],
            hint = result[1],
            right = result[0];

        val(geByClass1('help_question_hint_text', hintEl, 'div'), hint);
        toggleClass(hintEl, 'help_question_hint_wrong', !right);
        cur.doneQuestions[question] = answer;
        if (right) {
            cur.doneRight++;
        } else {
            addClass(geByClass1('radiobtn', ge('help_answer' + question + '_' + answer), 'div'), 'on');
        }
        cur.doneLen++;
        each(cur.questions[question], function(a) {
            addClass('help_answer' + question + '_' + a, this[0] ? 'help_right_answer' : 'help_done_answer');
        });
        addClass('help_question_hint' + question + '_' + answer, 'help_done_question');
        setStyle(answersLockEl, {
            width: answersEl.offsetWidth,
            height: answersEl.offsetHeight,
            display: 'block'
        })
        show(hintEl);

        if (cur.doneLen < cur.qLen) {
            val('help_test_results_warn', getLang('help_sectest_cant_finish_X_done', cur.doneLen) + ' ' + getLang('help_sectest_cant_finish_X_remain', cur.qLen))
            show('help_question' + (question + 1));
        } else {
            hide('help_test_results_warn', 'help_test_finish_btn_lock');
        }
    },
    stestFinish: function(btn, test_page) {
        lockButton(btn);
        nav.go(test_page + '?r=' + (cur.doneRight || 0) + '&ab=' + (cur.after_ban ? 1 : 0), false, {
            onFail: unlockButton.pbind(btn)
        });
    },
    initSecurityTestResults: function(options) {
        extend(cur, options);

        if (window.VK && VK.init && VK.Widgets && VK.Widgets.Like) {
            Help.stestInitWLike();
        } else {
            window.vkAsyncInit = Help.stestInitWLike;
            headNode.appendChild(ce('script', {
                type: 'text/javascript',
                src: '/js/api/openapi.js?' + options.openapi_version
            }));
        }
    },
    stestInitWLike: function() {
        VK.init({
            apiId: 1936057
        });
        VK.Widgets.Like('help_test_results_like', {
            pageTitle: cur.like_title,
            pageDescription: cur.like_desc,
            pageUrl: cur.like_url,
            pageImage: cur.like_image,
            text: cur.like_text,
            width: 450,
            base_domain: locProtocol + '//' + locHost + '/'
        }, cur.like_page);
        delete window.vkAsyncInit;
    }


};
try {
    stManager.done('help.js');
} catch (e) {}