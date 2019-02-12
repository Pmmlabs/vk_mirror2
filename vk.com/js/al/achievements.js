var Achievements = {
    updateSearch: function(v) {
        clearTimeout(cur.achievementsSearchTimeout);
        cur.achievementsSearchTimeout = setTimeout(Achievements.doUpdateSearch.pbind(v), 300);
    },
    doUpdateSearch: function(v) {
        var c = ge('ach_list');
        if (!c) {
            return;
        }
        v = v.toLowerCase();
        var children = domChildren(c),
            lastVisEl = null;
        each(children, function(i, el) {
            removeClass(el, 'ach_list_row_last_visible');
            if (!v) {
                show(el);
            } else {
                var t = val(geByClass1('_title', el)),
                    vis = t.toLowerCase().indexOf(v) != -1;
                toggle(el, vis);
                if (vis) {
                    lastVisEl = el;
                }
            }
        });
        if (lastVisEl) {
            addClass(lastVisEl, 'ach_list_row_last_visible');
        }
        if (v) {
            nav.objLoc['q'] = v;
        } else {
            delete(nav.objLoc['q']);
        }
        nav.setLoc(nav.objLoc);
    },
    save: function(btn, id, hash, andReturn) {
        var params = {
            act: 'save',
            id: id,
            hash: hash,
            title: trim(val('ach_title')),
            descr: trim(val('ach_descr')),
            lore: trim(val('ach_lore')),
            photo_id: trim(val('ach_photo_id')),
            parent_id: cur.achParentDD.val(),
            weight: val('ach_weight'),
            hidden: cur.achHiddenDD ? cur.achHiddenDD.val() : 0,
            challenged: isChecked('ach_challenged') ? 1 : 0,
            grant_type: cur.achGrantTypeDD ? cur.achGrantTypeDD.val() : 0,
            unlocked: isChecked('ach_unlocked') ? 1 : 0
        };
        if (andReturn) {
            params['return'] = 1;
        }
        if (!params.title) {
            return notaBene('ach_title');
        }
        ajax.post('achievements.php', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    addLink: function(btn, aid, hash) {
        var params = {
            act: 'add_link',
            uid: cur.addAchLinkUserDD.val(),
            public_note: trim(val('ach_link_public_note')),
            ts_expire: trim(val('ach_link_ts_expire')),
            aid: aid,
            hash: hash
        };
        if (!params.uid) {
            return;
        }
        ajax.post('achievements.php', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html) {
                if (html) {
                    var c = ge('ach_links_list');
                    c.insertBefore(se(html), c.firstChild);
                    cur.addAchLinkUserDD.val('');
                    val('ach_link_public_note', '');
                    val('ach_link_ts_expire', 0);
                } else {
                    notaBene();
                }
            }
        });
    },
    removeLink: function(btn, uid, aid, hash) {
        var div = gpeByClass('ach_links_list_row', btn);
        ajax.post('achievements.php', {
            act: 'remove_link',
            uid: uid,
            aid: aid,
            hash: hash
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function() {
                slideUp(div, 300, function() {
                    re(div);
                });
            }
        });
    },
    openEditLinkBox: function(uid, aid) {
        cur.editLinkBox = showBox('/ach', {
            act: 'edit_link_box',
            uid: uid,
            aid: aid
        }, {
            params: {
                width: 500
            }
        });
    },
    saveLink: function(uid, aid, hash, callback) {
        ajax.post('/ach', {
            act: 'save_link',
            uid: uid,
            aid: aid,
            hash: hash,
            note: val('ach_edit_link_note')
        }, {
            showProgress: cur.editLinkBox.showProgress,
            hideProgress: cur.editLinkBox.hideProgress,
            onDone: callback
        });
    },
    updateLinkNote: function(uid, aid, note) {
        var el = geByClass1('_note', 'ach_links_list_row' + uid + '_' + aid);
        val(el, note);
        cur.editLinkBox.hide();
    },
    showTooltip: function(el, aid, mid) {
        if (hasClass(el, 'agent_ach_blur') && !hasClass(el, 'agent_ach_blur_ignore')) {
            return;
        }
        showTooltip(el, {
            dir: 'top',
            url: 'ach',
            params: {
                act: 'tt',
                id: aid,
                mid: mid
            },
            center: true,
            className: 'ach_tt',
            shift: [0, -5, 0],
            onHide: function() {
                removeClass('achievements', 'achievements_opacity');
                removeClass(el, 'agent_ach_marked');
            }
        });
    },
    loadMoreHistory: function(btn) {
        var container = ge('ach_history_rows'),
            params = {
                act: 'history',
                load: 1,
                last_id: attr(domLC(container), 'log-id')
            };

        each(['type', 'aid', 'uid', 'who_uid'], function(i, k) {
            if (nav.objLoc[k]) {
                params[k] = nav.objLoc[k];
            }
        });
        ajax.post('/ach', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html, hasMore) {
                each(sech(html), function(i, el) {
                    container.appendChild(el);
                });
                toggle(btn, hasMore);
            }
        });
    },
    showProgressTT: function(el, txt) {
        showTooltip(el, {
            center: 1,
            dir: 'bottom',
            text: txt,
            typeClass: 'tt_black'
        });
    },
    openRequestBox: function(btn, uid, aid) {
        cur.achRequestBox = showBox('ach', {
            act: 'request_box',
            aid: aid,
            uid: uid
        }, {
            params: {
                width: 620
            }
        });
    },
    sendRequest: function(uid, aid) {
        ajax.post('/ach', {
            act: 'send_request',
            uid: uid,
            aid: aid,
            note: val('ach_request_note')
        }, {
            showProgress: cur.achRequestBox.showProgress,
            hideProgress: cur.achRequestBox.hideProgress,
            onDone: function(html) {
                val('ach_block_request', html);
                cur.achRequestBox.hide();
            }
        });
    },
    cancelRequest: function(uid, aid, hash) {
        ajax.post('/ach', {
            act: 'cancel_request',
            uid: uid,
            aid: aid,
            hash: hash
        }, {
            onDone: function(html) {
                val('ach_block_request', html);
                cur.achRequestBox.hide();
            }
        });
    },
    processRequest: function(btn, uid, aid, hash, result) {
        ajax.post('/ach', {
            act: 'process_request',
            uid: uid,
            aid: aid,
            hash: hash,
            result: result
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html) {
                var el = ge('ach_request_row' + uid + '_' + aid),
                    c = el.parentNode;
                if (hasClass(el, 'ach_request_row_closed')) {
                    c.replaceChild(se(html), el);
                } else {
                    c = ge('ach_request_closed_rows');
                    re(el);
                    c.insertBefore(se(html), c.firstChild);
                    if (!geByClass1('ach_request_row', 'ach_request_new_rows')) {
                        show('ach_request_rows_empty');
                    }
                }
            }
        });
    },
    openChoosePhotoBox: function() {
        cur.achChoosePhotoBox = showBox('/ach', {
            act: 'choose_photo_box',
            current: val('ach_photo_id')
        }, {
            params: {
                width: 800
            }
        });
    },
    choosePhoto: function(photo, url) {
        val('ach_photo_id', photo);
        show('ach_form_image');
        ge('ach_form_image__img').src = url;
        cur.achChoosePhotoBox.hide();
    },
    applyHistoryFilters: function() {
        var objLoc = {
            0: nav.objLoc[0],
            act: nav.objLoc['act']
        };
        if (cur.achievementsAchDD.val()) {
            objLoc['aid'] = cur.achievementsAchDD.val();
        }
        nav.go(objLoc);
    },
    hideUnlocked: function(mid) {
        slideUp('agent_unlocked_achievements', 500, function() {
            re('agent_unlocked_achievements');
            var tn = ge('achievements_top_notify');
            if (!val(tn)) {
                re(tn);
            }
        });
        ajax.post('ach', {
            act: 'hide_unlocked',
            mid: mid
        });
    },
    _eof: 1
};
try {
    stManager.done('achievements.js');
} catch (e) {}