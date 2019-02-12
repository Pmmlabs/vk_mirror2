var Fave = {
    addLinkBox: function() {
        return showBox('/al_fave.php', {
            act: 'add_link_box'
        });
    },
    checkLink: function(el) {
        clearTimeout(cur.checkLinkTO);
        cur.checkLinkTO = setTimeout(this.getLinkInfo.pbind(el), 500);
    },
    getLinkInfo: function(el) {
        var lnk = trim(el.value).replace(/\s/g, '+'),
            box = curBox();
        if (!lnk) {
            return elfocus(el);
        }

        cur.lnkSent = lnk;

        ajax.post('al_fave.php', {
            act: 'get_link_info',
            lnk: lnk,
            hash: cur.fave_hash
        }, {
            onDone: function(code, innerlnk, html, js) {
                if (lnk != cur.lnkSent) return false;
                Fave.hideMessage();
                if (code < 0) {
                    Fave.showMessage(innerlnk, true);
                    return elfocus(el);
                } else {
                    cur.lnk = innerlnk;
                    ge('fave_al_link_info').innerHTML = html;
                    placeholderInit('fave_al_position');
                    elfocus('fave_al_position');
                }
            },
            progress: box.progress
        });
    },
    showMessage: function(text, type) {
        var msgWrap = curBox() ? ge('fave_edit_box_msg') : ge('fave_edit_msg'),
            msgEl = domFC(msgWrap);
        if (!msgEl) return;
        msgEl.innerHTML = text;
        msgWrap.className = type ? (type == 'info' ? 'msg info_msg' : 'msg error') : 'msg ok_msg';
        show(msgWrap);
    },
    hideMessage: function() {
        var msgWrap = curBox() ? ge('fave_edit_box_msg') : ge('fave_edit_msg');
        hide(msgWrap);
    },
    doAddLink: function(force) {
        var box = curBox(),
            position = ge('fave_al_position');
        if (!force && isVisible(box.progress)) return;

        var desc = val(position);

        ajax.post('al_fave.php', {
            act: 'add_link',
            link: cur.lnk,
            desc: desc,
            hash: cur.fave_hash
        }, {
            onDone: function(res, html) {
                if (res) {
                    var parent;
                    var child;
                    if (ge('empty_links')) {
                        child = ge('empty_links');
                        parent = child.parentNode;
                    } else if (ge('links')) {
                        child = ge('links');
                        parent = child.parentNode;
                    }
                    parent.removeChild(child);
                    parent.innerHTML += html;

                    box.hide();
                } else {
                    Fave.showMessage(html, true);
                }
            },
            onFail: function() {
                //ON FAIL
            },
            progress: box.progress
        });
    },
    deleteLink: function(node, hash) {
        window.tooltips && tooltips.hideAll();

        var link = node.id.substr(6);
        var parts = link.split('_');
        ajax.post('al_fave.php', {
            act: 'unfave_link',
            type: parts[0],
            owner_id: parts[1],
            item_id: parts[2],
            hash: hash
        }, {
            onDone: function(res, html) {
                if (res) {
                    ge('link' + link).innerHTML = html;
                }
            },
            onFail: function() {
                //ON FAIL
            },
            showProgress: function() {
                hide('unfave' + link);
                show('unfave_progress' + link);
            },
            hideProgress: function() {
                hide('unfave_progress' + link);
                show('unfave' + link);
            }
        });
    },

    showMore: function(module, updated) {
        cur.disableAutoMore = false;
        updated = updated || false;
        var nextRows = ge('fave_rows_next_' + module);
        faveRows = domPN(nextRows);
        if (!updated && nextRows) {
            while (nextRows.firstChild) {
                faveRows.insertBefore(nextRows.firstChild, nextRows);
                updated = true;
            }
        }
        if (cur.isListLoading) return;

        var more = ge('show_more_' + module);

        var escPressed = false;
        var tmp = function(e) {
            if (e.keyCode == KEY.ESC) {
                escPressed = true;
            }
        };
        addEvent(document, 'keyup', tmp);

        ajax.post('al_fave.php', {
            act: 'load',
            section: cur.section,
            offset: intval(cur.faveData[module + 'Offset']),
            part: 1
        }, {
            onDone: function(rows, shownAll, real_offset) {
                removeEvent(document, 'keyup', tmp);
                if (escPressed) {
                    cur.disableAutoMore = true;
                    return;
                }
                if (rows) {
                    var au = ce('div'),
                        row, cont = updated ? nextRows : faveRows;
                    au.innerHTML = rows;
                    if (!updated) {
                        cont.removeChild(nextRows);
                    }
                    while (row = au.firstChild) {
                        cont.appendChild(row);
                    }
                    if (!updated) {
                        cont.appendChild(nextRows);
                    }
                }
                if (!shownAll) {
                    show('show_more_' + module);
                } else {
                    hide(more);
                }
                cur.faveData[module + 'Offset'] = real_offset;
            },
            showProgress: function() {
                cur.isListLoading = true;
                lockButton(more);
            },
            hideProgress: function() {
                cur.isListLoading = false;
                unlockButton(more);
            },
            cache: 1
        });
    },

    scrollCheck: function() {
        if (browser.mobile || cur.isListLoading || cur.disableAutoMore || ((cur.section || '').indexOf('likes_') && cur.section !== 'articles' && cur.section !== 'podcasts')) return;

        var el = ge('show_more_' + cur.section);
        if (!isVisible(el)) return;

        var docEl = document.documentElement;
        var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
        var st = scrollGetY();

        if (st + ch + 200 > el.offsetTop) {
            Fave.showMore(cur.section);
        }
    },

    searchSummary: function(users) {
        var num = users.length;
        val(cur.section == 'users' ? 'fave_users_count' : 'fave_users_online_count', num);

        var notFound = ge('fave_list_empty_' + cur.section);

        if (num == 0) {
            var text = cur.lang['fave_search_query_not_found'];
            var query = ge('fave_search').value.replace(/([<>&#]*)/g, '');
            notFound.innerHTML = text.replace('{search}', '<b>' + query + '</b>');

            show(notFound);
        } else {
            hide(notFound);
        }
    },

    drawUsers: function(users, query) {
        if (!users) {
            return;
        } else {
            this.searchSummary(users);
        }
        var parent = ge(cur.section == 'users' ? 'users_content' : 'users_online_content');
        parent.innerHTML = '';
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            parent.innerHTML += cur.faveData.userRows[user.id];
            if (i > 28) {
                setTimeout(function() {
                    var html = '';
                    for (var j = i + 1; j < users.length; j++) {
                        var user = users[j];
                        html += cur.faveData.userRows[user.id];
                    }
                    parent.innerHTML += html;
                }, 0);
                break;
            }
        }

        if (query && query.length > 0) {
            cur.selection = {
                re: new RegExp('(' + query.replace(cur.vIndex.delimiter, '|') + ')', 'gi'),
                val: '<em>$1</em>'
            };
            var names = geByClass('fans_fan_name', cur.section == 'users' ? 'users_content' : 'users_online_content');
            for (var i in names) {
                var name = geByClass1('mem_link', names[i]);
                if (name) {
                    name.innerHTML = name.innerHTML.replace(cur.selection.re, cur.selection.val);
                }
            }
        }
    },

    updateList: function() {
        var query = val('fave_search').toLowerCase();
        query = trim(query);
        if (query.length == 0) {
            if (cur.prevQuery && cur.prevQuery.length > 0) {
                Fave.drawUsers(cur.faveData.faveUsers);
                show(ge('users_online'));
            }
            cur.prevQuery = query;
            return;
        }
        cur.prevQuery = query;

        var results = cur.vIndex.search(query);
        Fave.drawUsers(results, query);
    },

    indexAll: function(callback) {
        var all = cur.faveData.faveUsers;
        cur.vIndex = new vkIndexer(all, (function(obj) {
            return obj['name'];
        }).bind(this), function() {
            // pass
            if (callback) {
                callback();
            }
        });
    },

    init: function() {
        extend(cur, {
            module: 'fave',
            bigphCache: {},
            bigphShown: {},
            _back: {
                text: getLang('fave_return_to_fave'),
                show: [],
                hide: [function() {
                    for (var i in cur.bigphShown) {
                        animate(cur.bigphShown[i], {
                            marginTop: 100
                        }, 0);
                    }
                    cur.bigphShown = {};
                }],
                loc: false
            }
        });

        //Scroll check routine
        Fave.scrollNode = browser.msie6 ? pageNode : window;
        addEvent(Fave.scrollNode, 'scroll', Fave.scrollCheck);
        addEvent(window, 'resize', Fave.scrollCheck);
        cur.destroy.push(function() {
            removeEvent(Fave.scrollNode, 'scroll', Fave.scrollCheck);
            removeEvent(window, 'resize', Fave.scrollCheck);
        });

        if ((cur.section == 'users' || cur.section == 'users_online') && !ge('empty_users')) {
            this.indexAll();
        }

        var userSearch = ge('fave_search');
        if (cur.section == 'users' || cur.section == 'users_online') {
            elfocus(userSearch);
        }

        setTimeout(Fave.scrollCheck, 0);
    },
    removeTip: function(el) {
        showTooltip(el, {
            text: getLang('fave_delete'),
            shift: [8, 5, 5],
            black: 1
        });
    },
    remove: function(el, uid, user, hash, ev) {
        if (el.tt && el.tt.destroy) el.tt.destroy();
        showFastBox({
            title: getLang('global_warning'),
            dark: 1,
            bodyStyle: 'padding: 20px; line-height: 160%;'
        }, getLang('fave_sure_delete').replace('{user}', user), getLang('global_delete'), function() {
            if (isVisible(curBox().progress)) return;

            ajax.post('al_fave.php', {
                act: 'unfave_user',
                uid: uid,
                hash: hash
            }, {
                onDone: function() {
                    val('fave_search', '');
                    cur.prevQuery = '';
                    for (var i = 0, l = cur.faveData.faveUsers.length; i < l; ++i) {
                        if (cur.faveData.faveUsers[i].id == uid) {
                            cur.faveData.faveUsers.splice(i, 1);
                            break;
                        }
                    }
                    if (!cur.faveData.faveUsers.length) return nav.reload();
                    Fave.indexAll();
                    Fave.searchSummary(cur.faveData.faveUsers);
                    var userEl = gpeByClass('fans_fan_row', el);
                    re(userEl);
                    curBox().hide();
                },
                progress: curBox().progress
            });
        }, getLang('global_cancel'));
        return cancelEvent(ev);
    },
    removeArticle: function(el, link, hash) {
        addClass(el, 'removed')

        ajax.post('al_fave.php', {
            act: 'defave_article',
            link: link,
            hash: hash
        }, {
            onFail: removeClass.pbind(el, 'removed')
        })
    },
    restoreArticle: function(el, link, hash) {
        removeClass(el, 'removed')

        ajax.post('al_fave.php', {
            act: 'enfave_article',
            link: link,
            hash: hash
        }, {
            onFail: addClass.pbind(el, 'removed')
        })
    }
};

try {
    stManager.done('fave.js');
} catch (e) {}