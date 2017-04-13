(function() {
    var translationBox, menuBox, saveInProgress = false,
        inviteHash;
    var createBox, transEl;
    window.t = function(event, el, leftBtn, callback, returnHidden, deleteHash) {
        if (event && event.type == 'click' && (!event.altKey && !leftBtn)) {
            return;
        }
        if (deleteHash === undefined) {
            if (!deleteHash) deleteHash = el.getAttribute('delhash');
            //if (!deleteHash) deleteHash = false;
        }
        transEl = el;
        if (!translationBox) {
            translationBox = new MessageBox({
                title: getLang(deleteHash != false ? 'tran_change_title' : 'tran_restore_title'),
                width: 490,
                progress: 'transProgress' /*, onLoad: updateBox*/ ,
                returnHidden: returnHidden
            });
        }
        if (createBox) {
            createBox.content('');
        }
        var langKey = (el.id.substr(0, 5) == 'lang_') ? el.id.substr(5) : el.id;
        hide('transProgress');
        translationBox.removeButtons().addButton({
            label: getLang('box_cancel'),
            style: 'button_gray',
            onClick: function() {
                translationBox.hide(200);
                saveInProgress = false;
            }
        });
        //if (deleteHash) {
        //  translationBox.addControlsText('<a id="transDeleteLink" href="" onclick="return doDeleteKey(\''+langKey+'\', \''+deleteHash+'\')">'+getLang('tran_delete_key')+'</a>');
        //}
        translationBox.addButton({
            label: getLang('box_save'),
            onClick: window.tDoSave = function() {
                doTranslate(transEl, callback)
            }
        }).loadContent('translation.php', {
            act: 'inline',
            key: langKey
        }, true).show();
        cancelEvent(event);
        return false;
    }

    function doTranslate(translatedEl, callback) {
        if (saveInProgress) return false;
        saveInProgress = true;
        var query = serializeForm(ge('translationForm'));
        if (location.pathname.indexOf('translation.php') != -1) {
            query['truncate'] = 1;
        }
        Ajax.Post({
            url: 'translation.php',
            query: query,
            onDone: function(ajaxObj, responseText) {
                hide('transProgress');
                show('transDeleteLink');
                saveInProgress = false;
                var result = eval('(' + responseText + ')');
                if (result.result !== undefined) {
                    translatedEl.innerHTML = result.result;
                    translatedEl.className = 'translated';
                    translationBox.hide(200);
                    if (ge('section_id').value == 1000) { // untranslated
                        var li = translatedEl.parentNode.parentNode;
                        while (li.nextSibling && (!li.nextSibling.tagName || li.nextSibling.tagName != 'LI')) {
                            li = li.nextSibling;
                        }
                        if (li.nextSibling) {
                            var el = (li.nextSibling.getElementsByTagName('I') || {})[0];
                            if (el) {
                                setTimeout(el.onclick.bind(el, false), 420);
                            }
                        }
                    }
                } else if (result.error) {
                    var error = ge('error');
                    error.innerHTML = result.error;
                    show(error);
                }
                if (callback) callback(result);
            },
            onFail: function(ajaxObj, responseText) {
                hide('transProgress');
                show('transDeleteLink');
                saveInProgress = false;
                var error = ge('error');
                var text = responseText;
                try {
                    var res = eval('(' + responseText + ')');
                    text = res.error || text;
                } catch (e) {}
                error.innerHTML = text;
                show(error);
            }
        });
        show('transProgress');
        hide('transDeleteLink');
    }

    var replacedButtonsMap = {};

    function toggleActionLoader(id, isShow) {
        if (isShow) {
            var buttonEl = ge(id);
            replacedButtonsMap[id] = buttonEl;
            var spinner = ce("img", {
                src: "/images/upload.gif",
                width: "32",
                height: "8",
                id: "actionProgressSpinned"
            });
            buttonEl.parentNode.replaceChild(spinner, buttonEl);
        } else {
            buttonEl = replacedButtonsMap[id];
            var spinner = ge('actionProgressSpinned');
            spinner.parentNode.replaceChild(buttonEl, spinner);
        }
    }

    window.doCloneKey = function(curKey, newSectionId, sectionId, hash, isMove) {
        var newKey = ge('clone_key_name').value;

        if (!newKey || saveInProgress) return;

        saveInProgress = true;

        toggleActionLoader('key_action_clone_button', true);
        toggleActionLoader('key_action_move_button', true);

        Ajax.Post({
            url: 'translation.php',
            query: {
                act: 'key_clone',
                key: curKey,
                new_key: newKey,
                new_section_id: newSectionId,
                move: isMove,
                section_id: sectionId,
                hash: hash
            },
            onDone: function(ajaxObj, responseText) {
                toggleActionLoader('key_action_clone_button', false);
                toggleActionLoader('key_action_move_button', false);
                saveInProgress = false;
            },
            onFail: function(ajaxObj, responseText) {
                toggleActionLoader('key_action_clone_button', false);
                toggleActionLoader('key_action_move_button', false);
                saveInProgress = false;
            }
        });
    };

    window.doDeleteKey = function(key, hash) {
        if (saveInProgress) return false;
        AlertBox('������������� ��������', getLang('tran_delete_key_confirm_text'), function() {
            saveInProgress = true;
            var query = {
                act: 'a_delete_key',
                key: key,
                section_id: ge('translationForm')['section_id'].value,
                hash: hash
            };
            toggleActionLoader('key_action_delete_button', true);
            Ajax.Post({
                url: 'translation.php',
                query: query,
                onDone: function(ajaxObj, responseText) {
                    //hide('transProgress');
                    //show('transDeleteLink');
                    toggleActionLoader('key_action_delete_button', false);
                    saveInProgress = false;
                    if (responseText) {
                        var error = ge('error');
                        error.innerHTML = responseText;
                        show(error);
                    } else {
                        translationBox.hide(200);
                        window.location.reload();
                    }
                },
                onFail: function(ajaxObj, responseText) {
                    //hide('transProgress');
                    //show('transDeleteLink');
                    toggleActionLoader('key_action_delete_button', false);
                    saveInProgress = false;
                    var error = ge('error');
                    var text = responseText;
                    try {
                        var res = eval('(' + responseText + ')');
                        text = res.error || text;
                    } catch (e) {}
                    error.innerHTML = text;
                    show(error);
                }
            });
            //show('transProgress');
            //hide('transDeleteLink');
        }, {
            boxType: 'CONFIRM',
            returnHidden: true
        }).show();
        return false;
    }

    function doRestoreKey(restoreEl) {
        if (saveInProgress) return false;
        saveInProgress = true;
        var query = serializeForm(ge('restoreForm'));
        Ajax.Post({
            url: 'translation.php',
            query: query,
            onDone: function(ajaxObj, responseText) {
                hide('transProgress');
                saveInProgress = false;
                if (responseText) {
                    var error = ge('error');
                    error.innerHTML = responseText;
                    show(error);
                } else {
                    translationBox.hide(200);
                    window.location.reload();
                }
            },
            onFail: function(ajaxObj, responseText) {
                hide('transProgress');
                saveInProgress = false;
                var error = ge('error');
                var text = responseText;
                try {
                    var res = eval('(' + responseText + ')');
                    text = res.error || text;
                } catch (e) {}
                error.innerHTML = text;
                show(error);
            }
        });
        show('transProgress');
    }
    window.updateBox = function() {
        var nativeText = ge('nativeText'),
            history = ge('historyWrap');
        var items = ge('translationForm').getElementsByTagName('textarea'),
            tokens;
        if (getSize(nativeText)[1] > 160) {
            setStyle(nativeText, {
                height: '160px',
                overflow: 'auto'
            });
        } else {
            setStyle(nativeText, {
                height: 'auto',
                overflow: 'visible'
            });
        }

        var options = ge('inlineAdditional'),
            opVisible = isVisible(options);
        if (!opVisible) show(options);
        if (history) {
            if (getSize(history)[1] > 160) {
                setStyle(history, {
                    height: '160px',
                    overflow: 'auto'
                });
            }
        }
        each(items, function() {
            Autosize(this, {
                height: 180
            });
            addEvent(this, 'keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
                    doTranslate(transEl);
                }
            });
            tokens = ge('tokens_' + this.id.substr(9));
            if (tokens && tokens.childNodes.length) {
                AutoTokens(this, tokens);
            } else if (tokens) {
                hide(tokens);
            }
        });
        if (!opVisible) hide(options);
    }

    window.createLangKey = function(section_id) {
        if (!createBox) {
            createBox = new MessageBox({
                title: getLang('tran_create_new_title'),
                width: 490,
                progress: 'createProgress',
                onLoad: updateCreateBox
            });
        }
        hide('createProgress');
        if (translationBox) {
            translationBox.content('');
        }
        createBox.removeButtons().addButton({
            label: getLang('box_cancel'),
            style: 'button_gray',
            onClick: function() {
                createBox.hide(200);
                saveInProgress = false;
            }
        }).addButton({
            label: getLang('tran_box_create'),
            onClick: doCreateKey
        }).loadContent('translation.php', {
            act: 'inline_create',
            section_id: section_id
        }, true).show();
        return false;
    }

    function doCreateKey() {
        if (saveInProgress) return false;
        saveInProgress = true;
        var query = serializeForm(ge('translationForm'));
        Ajax.Send(
            'translation.php',
            query,
            function(ajaxObj, responseText) {
                hide('createProgress');
                saveInProgress = false;
                var result = eval('(' + responseText + ')');
                if (result.result) {
                    createBox.content(result.result);
                    createBox.removeButtons().addButton({
                        label: getLang('box_close'),
                        style: 'button_gray',
                        onClick: function() {
                            createBox.hide(200);
                        }
                    });
                    setTimeout(function() {
                        createBox.hide(200);
                    }, 1200);
                    if (result.section_id >= 0) {
                        selectSection(ge('section' + result.section_id), result.section_id, true);
                    } else {
                        location.reload(false);
                    }
                } else if (result.error) {
                    var error = ge('error');
                    error.innerHTML = result.error;
                    show(error);
                }
            });
        show('createProgress');
    }

    function updateCreateBox() {
        var items = ge('translationForm').getElementsByTagName('textarea'),
            tokens;
        each(items, function() {
            Autosize(this, {
                height: 180
            });
        });
    }

    window.inlineMenu = function(sections, admin_href, admin_name, hash) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        if (!menuBox) {
            menuBox = new MessageBox({
                title: 'Select option',
                width: '200px',
                bodyStyle: 'padding:0px'
            });
            menuBox.addButton({
                label: 'Close',
                style: 'button_gray',
                onClick: function() {
                    menuBox.hide();
                }
            });
            var inline_translation = translationEnabled() ? 'Disable inline translation' : 'Enable inline translation';
            var show_all_phrases = '',
                invitation = '';
            var section_id = (sections || '').split(',');
            section_id = section_id[0] || 0;
            if (section_id) {
                show_all_phrases = '<div style="margin-top:8px" class="button_gray button_wide" ><button onclick="showAllPhrases(\'' + sections + '\');">Show all phrases</button></div>';
            }
            if (admin_href) {
                invitation = '<a href="' + admin_href + '">' + admin_name + '</a> has invited you to translate this page. <a href="#" onclick="return showInvitationBox();">Invite friend &raquo;</a>';
                inviteHash = hash;
            }

            if (invitation) {
                invitation = '<div id="invitationWrap" style="background:#F7F7F7;border-bottom:1px solid #CCC;padding:6px 9px;height:30px; overflow:hidden;line-height:130%"><div id="invitationText">' + invitation + '</div><div id="inviteBox" style="display:none;text-align:center; margin-top:4px"><img src="' + base_domain + 'images/upload.gif" id="friendsProgress" style="margin-top:7px" /><table cellspacing="0" cellpadding="0" style="display:none" id="inviteControls"><tr><td><input type="hidden" class="inputText" id="inviteFriendId" name="invite_friend_id" /></td><td style="padding-left:6px"><a href="#" onclick="return doInvite();">Send</a></td></tr></table></div></div>';
            }

            menuBox.content(invitation + '<div style="padding:14px"><div class="button_blue button_wide"><button onclick="enableTranslation()">' + inline_translation + '</button></div>' + show_all_phrases + '<div style="margin-top:8px" class="button_gray button_wide"><button onclick="location.replace(\'' + base_domain + 'translation.php?section_id=' + section_id + '\');">Go to translation page</button></div><div style="padding:5px 5px 0px 5px"><a href="club16000">Help &raquo;</a><br /><a href="translation.php?section_id=1000">Untranslated &raquo;</a></div></div>');
        }
        menuBox.show();
        return false;
    }
    var uiInviteFriend;
    window.showInvitationBox = function() {
        var inviteBox = ge('inviteBox');
        hide('invitationText');
        show(inviteBox);
        if (!uiInviteFriend) {
            addCss('css/ui_controls.css');
            jsDispatcher.include('lib/ui_controls', function() {
                Ajax.Post({
                    url: 'friends_ajax.php',
                    query: {
                        from: 'inline',
                        filter: 'tiny'
                    },
                    onDone: function(ajaxObj, responseText) {
                        var result = eval('(' + responseText + ')');
                        hide('friendsProgress');
                        if (result.friends && result.friends.length) {
                            uiInviteFriend = Dropdown(ge('inviteFriendId'), result.friends, {
                                width: 150,
                                autocomplete: true,
                                placeholder: 'Start typing friend\'s name'
                            });
                            show('inviteControls');
                        } else {
                            var invitationText = ge('invitationText');
                            invitationText.innerHTML = '<div style="text-align:center;padding-top:8px">You have no friends.</div>';
                            hide('inviteBox');
                            show(invitationText);
                        }
                    }
                });
            });
        } else {
            hide('friendsProgress');
            show('inviteControls');
            uiInviteFriend.clear();
        }
        return false;
    }
    window.doInvite = function() {
        var friendId = uiInviteFriend.val();
        if (!friendId) return;
        hide('inviteControls');
        show('friendsProgress');
        Ajax.Post({
            url: 'translation.php',
            query: {
                act: 'a_invite_translator',
                user_id: friendId,
                hash: inviteHash
            },
            onDone: function(ajaxObj, responseText) {
                var result = eval('(' + responseText + ')'),
                    invitationText = ge('invitationText'),
                    text = '';
                if (result.result) {
                    text = result.result;
                } else if (result.error) {
                    text = result.error;
                }
                invitationText.innerHTML = '<div style="text-align:center">' + text + '<br /><a href="#back" onclick="return showInvitationBox();">Go back</a></div>';
                hide('inviteBox');
                show(invitationText);
            }
        });
    }

    var cookie_key = 'remixinline_trans';

    function translationEnabled() {
        return getCookie(cookie_key) ? true : false;
    }

    window.enableTranslation = function() {
        setCookie(cookie_key, translationEnabled() ? '' : '1', 360);
        menuBox.hide(200);
        location.reload(false);
    }

    var elAllPhrases;
    window.showAllPhrases = function(sections) {
        if (!sections) return;
        if (!elAllPhrases) {
            if (!content) return false;
            elAllPhrases = document.createElement('div');
            document.getElementsByTagName('body')[0].appendChild(elAllPhrases);
        }
        hide('banner1');
        show(elAllPhrases);
        //setCookie(cookie_key, '1', 360);
        Ajax.Post({
            url: 'translation.php',
            query: {
                act: 'inline_edit_all',
                sections: sections
            },
            onDone: function(ajaxObj, responseText) {
                elAllPhrases.innerHTML = responseText;
            }
        });
        menuBox.hide(200);
        var coords = getXY(elAllPhrases);
        animate(document.getElementsByTagName('html')[0], {
            scrollTop: coords[1]
        });
        animate(document.getElementsByTagName('body')[0], {
            scrollTop: coords[1]
        });
        elAllPhrases.innerHTML = '<div style="text-align:center; padding: 20px;">Loading...</div>';

    }

    window.hideAllPhrases = function() {
        if (!elAllPhrases) return;
        elAllPhrases.innerHTML = '';
        hide(elAllPhrases);
        show('banner1');
        animate(document.getElementsByTagName('html')[0], {
            scrollTop: 0
        });
        animate(document.getElementsByTagName('body')[0], {
            scrollTop: 0
        });
        return false;
    }

    function AutoTokens(textarea, tokens) {
        var timeout, pattern = /{[^}]+}|%[a-z]/gi;
        addEvent(textarea, 'keyup', function() {
            clearTimeout(timeout);
            setTimeout(function() {
                onEnterText();
            }, 200);
        });
        each(tokens.childNodes, function(i, x) {
            if (x.nodeType == 1) {
                addEvent(x, 'click', function() {
                    return insertToken(x, x.innerHTML)
                });
            }
        });

        function onEnterText(e) {
            var matches = textarea.value.match(pattern);
            var index, token;
            each(tokens.childNodes, function(i, x) {
                if (x.nodeType != 1)
                    return;
                token = x.innerHTML;
                index = matches != null ? indexOf(matches, token) : -1;
                if (index != -1) {
                    matches.splice(index, 1);
                    x.style.display = 'none';
                } else {
                    x.style.display = '';
                }
            });
        }

        function insertToken(el, token) {
            if (textarea.selectionStart != textarea.selectionEnd) {
                textarea.value += token;
            } else {
                var sel = textarea.selectionStart + token.length;
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + token + textarea.value.substr(textarea.selectionStart);
            }
            hide(el);
            if (sel > 0) {
                textarea.selectionStart = textarea.selectionEnd = sel;
            }
            textarea.focus();
            return false;
        }
    }
})();

var PagedList = function(container, data, options) {
    var isEqual = function(a, b) {
        if (!isArray(a) || !isArray(b)) return a == b;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }

    var isEmpty = function(a) {
        if (!a) return true;
        for (var i = 0; i < a.length; ++i) {
            if (a[i]) return false;
        }
        return true;
    }

    function cloneAr(a) {
        var b = [];
        for (var i = 0; i < a.length; ++i) {
            b[i] = a[i];
        }
        return b;
    }

    container = ge(container);
    var defaults = {
        getRow: function(row) {
            return '';
        },
        setPages: function(page, pages, side) {},
        filter: function(search, row) {
            return true;
        },
        perPage: 30,
        emptyRow: function(search) {
            return '<div>no rows</div>';
        }
    };
    options = options ? extend(defaults, options) : defaults;

    this.data = data;
    var filtered_data = [];
    for (var i = 0; i < data.length; ++i) {
        filtered_data.push(data[i]);
    }
    var current_search = [];
    var current_page = 0;

    this.getPage = function(page, search, force) {
        if (search === undefined) search = current_search;
        if (current_page == page && isEqual(search, current_search) && !force) return;
        current_page = page;
        if (options.onStart) options.onStart();
        debugLog('get page');
        if (!isEqual(search, current_search)) {
            current_search = cloneAr(search);
            filtered_data = [];
            for (var i = 0; i < this.data.length; ++i) {
                if (!search || options.filter(search, this.data[i])) filtered_data.push(this.data[i]);
            }
        }
        if (!filtered_data.length) {
            container.innerHTML = options.emptyRow(search);
            options.setPages(0, 0, 'top');
            options.setPages(0, 0, 'bottom');
            return;
        }
        var html = [];
        for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
            var row = filtered_data[i];
            html.push(options.getRow(row));
        }
        container.innerHTML = html.join('');
        if (options.onShow) {
            for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
                var row = filtered_data[i];
                options.onShow(row, i);
            }
        }
        var pages = Math.ceil(filtered_data.length / options.perPage);
        options.setPages(page, pages, 'top');
        options.setPages(page, pages, 'bottom');

    }
}

var prevBatchSearchKey = '';
var betchKeysValues = {};
var prevBatchPattern = '';
window.onPatternChange = function() {
    var patt = trim(ge('batch_pattern').value);
    if (prevBatchPattern == patt) {
        return;
    }

    var globalFlag = ge('regexp_global').checked ? 'g' : '';

    try {
        patt = new RegExp('(' + patt + ')', globalFlag);
    } catch (e) {
        return;
    }

    var items = geByClass('batch_edit_item_value');
    for (var i = 0; i < items.length; i++) {
        var value = betchKeysValues[items[i].getAttribute('data-language-id')];
        value = ce('div', {
            innerHTML: value
        }).innerHTML;
        var hl = value.replace(patt, '<span class="hl">$1</span>');
        items[i].innerHTML = hl;
    }

    onPatternSubstChange();
}


window.onPatternSubstChange = function() {
    var subst = trim(ge('batch_pattern_subst').value);
    var patt = trim(ge('batch_pattern').value);

    var globalFlag = ge('regexp_global').checked ? 'g' : '';

    try {
        patt = new RegExp(patt, globalFlag);
    } catch (e) {
        return;
    }

    var items = geByClass('batch_edit_item_value');
    for (var i = 0; i < items.length; i++) {
        var value = betchKeysValues[items[i].getAttribute('data-language-id')];
        value = ce('div', {
            innerHTML: value
        }).innerHTML;
        value = value.replace(patt, subst);

        var resEl = geByClass1('batch_edit_item_result', items[i].parentNode);
        resEl.innerHTML = value;
    }
}