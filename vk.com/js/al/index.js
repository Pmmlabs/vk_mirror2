var Index = {
    initNew: function() {
        each(geByClass('big_text', 'index_rcolumn'), function(i, inp) {
            placeholderInit(inp);
            if (gpeByClass('ij_form', inp, ge('index_rcolumn'))) {
                addEvent(inp, 'keydown', function(event) {
                    if (event.keyCode == 10 || event.keyCode == 13) Index.submitJoinStart();
                });
            }
        });
        Index.initRegForm();
        setTimeout(elfocus.pbind('index_email'), 0);

        var lf = ge('index_login_form'),
            le = ge('index_email'),
            lp = ge('index_pass');
        lf.onsubmit = function() {
            if (!window.submitQuickLoginForm) return true;
            if (!trim(le.value)) {
                notaBene(le);
                return false;
            } else if (!trim(lp.value)) {
                notaBene(lp);
                return false;
            }
            submitQuickLoginForm(le.value, lp.value, {
                prg: 'index_login_button',
                params: {
                    'expire_input': val('index_expire_input')
                }
            });
            return false;
        }
        if (window.loginByCredential) {
            le.onclick = loginByCredential;
            lp.onclick = loginByCredential;
        }

        window.onReLoginDone = function(href) {
            location.href = href;
        }
        window.onReLoginFailed = function(code) {
            if (code === -1) {
                location.href = location.href.replace(/^http:/, 'https:');
            }
        };
    },
    initRegForm: function() {
        cur.uiBday = new Dropdown(ge('ij_bday'), Index.generateDays(cur.options.byear, cur.options.bmonth), {
            big_text: true,
            multiselect: false,
            zeroPlaceholder: true,
            selectedItems: cur.options.bday
        });
        cur.uiBmonth = new Dropdown(ge('ij_bmonth'), cur.options.bmonths, {
            big_text: true,
            multiselect: false,
            zeroPlaceholder: true,
            selectedItems: cur.options.bmonth,
            onChange: function(value) {
                Index.updateDays(cur.uiByear.val(), value);
            }
        });
        cur.uiByear = new Dropdown(ge('ij_byear'), cur.options.byears, {
            big_text: true,
            multiselect: false,
            zeroPlaceholder: true,
            selectedItems: cur.options.byear,
            onChange: function(value) {
                Index.updateDays(value, cur.uiBmonth.val());
            }
        });
        window.radioBtns['ij_sex'] = {
            els: [].slice.apply(geByClass('radiobtn', ge('ij_sex_row'))),
            val: 0
        };
        cur.destroy.push(function(c) {
            if (c.uiBday) c.uiBday.destroy();
            if (c.uiBmonth) c.uiBmonth.destroy();
            if (c.uiByear) c.uiByear.destroy();
        })
        stManager.add(['tooltips.js', 'tooltips.css']);
    },
    submitJoinStart: function() {
        var btn = ge('ij_submit');
        if (buttonLocked(btn)) return;

        var params = {
            fname: trim(val('ij_first_name')),
            lname: trim(val('ij_last_name')),
            bday: cur.uiBday.val(),
            bmonth: cur.uiBmonth.val(),
            byear: cur.uiByear.val(),
            frm: 1,
            ah: nav.objLoc.ah
        }
        if (isVisible('ij_sex_row')) {
            params.sex = intval(radioval('ij_sex'));
        }
        window.tooltips && tooltips.hideAll();

        val('ij_msg', '');
        ajax.post('join.php?act=start', params, {
            onDone: function(field, data) {
                var el = ge('ij_' + field);
                if (field == 'sex_row') {
                    show(el);
                }
                if (el) {
                    Index.showRegTT(el, data);
                } else {
                    showMsg('ij_msg', data, 'msg', true);
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    showRegTT: function(el, msg) {
        var isInputEl = el.tagName === 'INPUT',
            ttEl = el,
            _ttEl;
        if (!isInputEl && (_ttEl = geByClass1('selector_table', el))) {
            ttEl = _ttEl;
        } else if (!isInputEl && (_ttEl = geByClass1('radiobtn', el))) {
            ttEl = _ttEl;
        }
        var tt = function() {
            showTooltip(ttEl, {
                text: msg,
                dir: 'right',
                width: 320,
                typeClass: 'ij_tt',
                shift: [335, -getSize(ttEl)[1] / 2],
                hasover: 1,
                nohideover: 1,
                onCreate: function() {
                    removeEvent(ttEl, 'mouseout');
                    if (isInputEl) {
                        ttEl.onblur = function() {
                            if (ttEl.tt && ttEl.tt.hide) ttEl.tt.hide();
                        }
                    }
                }
            });
        };
        if (isInputEl) {
            el.onfocus = tt;
            notaBene(el);
        } else {
            tt();
            each(geByClass('selector_table', el), function(i, v) {
                notaBene(v);
            });
        }
    },

    showLoginBox: function(ul) {
        showBox('al_login.php', {
            act: 'auth_box',
            ul: ul
        }, {
            params: {
                dark: true,
                hideButtons: true,
                bodyStyle: 'padding: 44px 25px;'
            }
        });
        return false;
    },

    deleteRecentAccount: function(link, mid, hash, ev) {
        window.tooltips && tooltips.hideAll();
        ajax.post('/al_login.php?act=delete_recent_account', {
            mid: mid,
            hash: hash
        }, {
            onDone: function() {
                re(gpeByClass('_row', link));
            }
        });
        return cancelEvent(ev);
    },

    getLastDay: function(year, month) {
        if (month == 2) {
            if (year % 4 == 0) {
                return 29;
            } else {
                return 28;
            }
        } else if (month > 0 && ((month < 8 && month % 2 == 0) || (month > 7 && month % 2 == 1))) {
            return 30;
        }
        return 31;
    },
    generateDays: function(year, month) {
        var result = [
                [0, getLang('index_sel_bday')]
            ],
            last = Index.getLastDay(year, month);
        for (var i = 1; i <= last; ++i) {
            result.push([i, i + '']);
        }
        return result;
    },
    updateDays: function(year, month, uiBday) {
        if (!uiBday) uiBday = cur.uiBday;
        if (uiBday.val() > Index.getLastDay(year, month)) {
            uiBday.clear();
        }
        uiBday.setData(Index.generateDays(year, month).slice(intval(cur.options.bday) ? 1 : 0));
    },

    fbCheck: function(appId, context) {
        window.fbAsyncInit = function() {
            FB.init({
                appId: appId,
                xfbml: true,
                version: 'v2.7'
            });
            var isBox = context == '_box';
            var indexDiv = ge('index_fbcontinuewithsign' + (context || ''));
            setStyle(indexDiv, {
                opacity: 0,
                height: 0,
                overflow: 'hidden'
            });
            show(indexDiv);
            FB.Event.subscribe('xfbml.render', function() {
                animate(indexDiv, {
                    height: isBox ? 78 : 54,
                    opacity: 1
                }, 200);
            });
        };

        if (window.FB && window.FB.init) {
            window.fbAsyncInit();
        } else {
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/" + cur.fbLocale + "/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    },
    fbJoin: function(context) {
        cur.fbContext = context;
        setCookie('remixfbstate', cur.fbState, 30);
        var redirectUri = location.protocol + '//' + location.host + '/join?act=fb_sign';
        var oauthUrl = 'https://graph.facebook.com/v2.9/oauth/authorize?client_id=' + cur.fbApp + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=email,user_birthday&display=popup&state=' + cur.fbState;
        var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
            screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
            outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
            outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
            width = 640,
            height = 340,
            left = parseInt(screenX + ((outerWidth - width) / 2), 10),
            top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
        var wnd = window.open(oauthUrl, 'fb_sign', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
        return false;
    },
    fbFinish: function(data) {
        if (data.error) {
            setTimeout(showFastBox(getLang('global_error'), data.error).hide, 2000);
        } else if (data.date) {
            lockButton(ge('index_fb' + (cur.fbContext || '')));
            nav.go('/join?act=fb_start');
        }
    }
}

try {
    stManager.done('index.js');
} catch (e) {}