var FriendsSearch = {

    submit: function() {
        var email = ge('fsearch_email').value;
        var pass = ge('fsearch_pass').value;
        if (!/^.{1,40}@.{1,40}\..{1,4}$/.test(email)) {
            return notaBene('fsearch_email');
        }
        if (!pass) {
            return notaBene('fsearch_pass');
        }
        cur.inviteBox.showProgress();
        ge('fsearch_inviter_form').submit();
        hide('fsearch_error');
    },

    checkResult: function(server, mid, vk) {
        if (!cur.inviteBox) {
            return;
        }
        cur.inviteBox.hideProgress();
        try {
            var loc = ge('fsearch_inviter').contentWindow.location;
            var h = loc.href;
            var skey = loc.hash.replace('#', '');
        } catch (e) {
            debugLog(e.message);
        }

        var elem = document.createElement('script');
        elem.type = 'text/javascript';
        elem.src = 'http://' + server + '.vk.com/inviter.php?act=get_friends_list&hash=' + hash + '&skey=' + key + '&mid=' + mid + '&vk=' + vk + '&back=FriendsSearch.getEmailResult&v=' + Math.floor(Math.random() * 10000);
        headNode.appendChild(elem);
    },

    getEmailResult: function(data) {
        if (!data || data.error) {
            FriendsSearch.showError(data.error);
            return false;
        }
        var list = [];
        for (var i in data.list) {
            list.push(i);
        }
        FriendsSearch.getList(1, list, {
            hash: data.hash
        })
    },

    getList: function(service, list, data) {
        list = list.join('|');
        var params = extend({
            act: 'save_friends',
            service: service,
            Ids: list
        }, data);

        ajax.post('al_friends.php', params, {
            onDone: function(text, res) {
                if (res == 1) {
                    curBox().hide();
                    Friends.section('suggestions', function() {
                        Friends.changeSummary();
                        nav.setLoc(extend(nav.objLoc, {
                            section: 'suggestions'
                        }));
                    }, {
                        m: 1
                    });
                    return true;
                }
                var cont = ge('fsearch_results');
                cont.innerHTML = text;
                show(cont);
                curBox().hideProgress();
            }
        });
    },

    checkTwitter: function() {
        showBox('al_profileEdit.php', {
            act: 'twitter_settings_box',
            import_friends: 1
        }, {
            params: {
                width: 560
            }
        });
    },

    confirmImportContacts: function(googleLang, state, type, service) {
        var title, body, btn;
        switch (service) {
            case 'facebook':
                title = getTemplate('friends_confirm_import_title', {
                    service: 'facebook',
                    title: getLang('friends_import_facebook_header')
                });
                body = getTemplate('friends_confirm_import_body', {
                    msg: getLang('profileEdit_facebook_import_desc')
                });
                btn = getLang('profileEdit_auth_in_facebook');
                break;
            case 'google':
                title = getTemplate('friends_confirm_import_title', {
                    service: 'google',
                    title: getLang('friends_import_google_header')
                });
                body = getTemplate('friends_confirm_import_body', {
                    msg: getLang('profileEdit_google_import_desc')
                });
                btn = getLang('profileEdit_auth_in_google');
                break;
            case 'ok':
                title = getTemplate('friends_confirm_import_title', {
                    service: 'ok',
                    title: getLang('friends_import_odnoklassniki_header')
                });
                body = getTemplate('friends_confirm_import_body', {
                    msg: getLang('profileEdit_ok_import_desc')
                });
                btn = getLang('profileEdit_auth_in_ok');
                break;
        }
        var box = showFastBox({
            title: title,
            width: 560
        }, body, btn, function() {
            box.hide();
            return FriendsSearch.checkOAuth(googleLang, state, type);
        }, getLang('global_cancel'));
    },

    checkOAuth: function(googleLang, state, type) {
        var redirectUri = 'https://' + location.host + '/friends?act=import_contacts&type=' + type;

        if (type == 1) {
            var oauthUrl = 'https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/contacts.readonly&response_type=code&redirect_uri=' + encodeURIComponent(redirectUri) + '&approval_prompt=force&state=' + state + '&client_id=841415684880-q8mkaiptra78d5aqgifo84qli993b1km.apps.googleusercontent.com&hl=' + googleLang;
        } else if (type == 3) {
            var oauthUrl = 'https://graph.facebook.com/v2.9/oauth/authorize?client_id=128749580520227&redirect_uri=' + encodeURIComponent(redirectUri) + '&display=popup&state=' + state;
        } else if (type == 4) {
            var oauthUrl = 'http://www.odnoklassniki.ru/oauth/authorize?client_id=1258261760&scope=VALUABLE+ACCESS&response_type=code&redirect_uri=' + encodeURIComponent(redirectUri + '&state=' + state);
        }
        var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
            screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
            outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
            outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
            width = 640,
            height = 450,
            left = parseInt(screenX + ((outerWidth - width) / 2), 10),
            top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
        var features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
        var wnd = window.open(oauthUrl, 'google_auth', features);
        if (!cur.importDone) cur.importDone = {};
        cur.importDone[type] = 0;
        var timer = setInterval(function() {
            if (wnd.closed) {
                clearInterval(timer);
                FriendsSearch.checkImportResult();
            } else if (cur.importDone[type]) {
                clearInterval(timer);
            }
        }, 500);
    },

    importDone: function(data) {
        cur.importDone[data.type] = 1;
        if (data.error) {
            setTimeout(showFastBox(getLang('global_error'), data.error).hide, 2000);
        }
    },

    checkImportResult: function() {
        showBox('al_friends.php', {
            act: 'check_contacts_import',
            from: cur.module
        }, {
            dark: 1,
            showProgress: function() {},
            onFail: function() {
                return true;
            },
            onDone: function(newBox) {
                newBox.show();
            },
            preOnDone: true
        });
    },

    checkImportingLoop: function() {
        var box = curBox();
        cur.importingInt = setInterval(function() {
            showBox('al_friends.php', {
                act: 'check_contacts_import',
                provider: 'twitter',
                from: cur.module
            }, {
                dark: 1,
                showProgress: function() {},
                onFail: function() {
                    return true;
                },
                onDone: function(newBox) {
                    box.hide();
                    clearInterval(cur.importingInt);
                    newBox.show();
                },
                preOnDone: true
            });
        }, 500);
    },

    showImportTT: function(lng) {
        stManager.add(['intro.css'], function() {
            var cont = ge('friends_summary');
            showTooltip(cont, {
                content: '\
    <div id="intr_tt_pointer_left"></div>\
    <div id="intr_tt" style="width: 192px">\
      <div id="intr_hide" class="fl_r" onclick="ge(\'friends_summary\').tt.hide();" onmouseover="showTooltip(this, {text: \'' + lng.hide + '\', black: 1, shift: [14, 4, 0]})"></div>\
      <div id="intr_header">' + lng.header + '</div>\
      <div id="intr_text">' + lng.text + '</div>\
    </div>',
                slideX: 15,
                className: 'profile_intro_side_tt',
                shift: [-454, 0, 0],
                forcetodown: true,
                nohide: true,
                nohideover: true
            });
        });
    },

    showError: function(error) {
        var cont = ge('fsearch_error');
        cont.innerHTML = error;
        show(cont);
        curBox().hideProgress();
    },

    addImported: function(ids, inv, list, opts) {
        debugLog('onimport', arguments);
        var box = curBox();
        if (!box) {
            return;
        }
        ajax.post('al_friends.php', {
            act: 'add_imported',
            hash: opts.hash,
            uids: ids.join(',')
        }, {
            onDone: function(text) {
                box.hide();
                var msg = ge('friends_import_msg');
                msg.className = 'friends_import_success';
                msg.innerHTML = text;
                setStyle(msg, {
                    backgroundColor: '#F4EBBD'
                });
                animate(msg, {
                    backgroundColor: '#F9F6E7'
                }, 2000);
            },
            onFail: function() {
                box.hide();
                var msg = ge('friends_import_msg');
                msg.className = 'friends_import_fail';
                msg.innerHTML = text;
                setStyle(msg, {
                    backgroundColor: '#FACEBB'
                });
                animate(msg, {
                    backgroundColor: '#FFEFE8'
                }, 2000);
            },
            showProgress: box.showProgress,
            hideProgress: box.hideProgress
        });
        return false;
    },

    addCancelled: function(opts) {
        debugLog('why', arguments);
        ajax.post('al_friends.php', {
            act: 'cancel_imported',
            hash: opts.hash
        }, {
            onDone: function() {}
        });
        return true;
    },

    inviteBox: function() {
        showBox('invite.php', {
            act: 'invite_box'
        }, {
            stat: ['ui_controls.js', 'selects.js', 'ui_controls.css', 'invite.js', 'invite.css'],
            params: {
                bodyStyle: 'padding: 0px;',
                dark: 1
            }
        });
        return false;
    },

    __eof: 1
};
try {
    stManager.done('friends_search.js');
} catch (e) {}