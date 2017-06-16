Claims = {
    switchTab: function(el, evt) {
        if (evt.button) return true;
        show('claims_loading');
        if (hasClass(el.parentNode, 'claim_tab')) {
            each(geByClass('claim_tab_active', ge('claims_tabs')), function(i, v) {
                removeClass(v, 'claim_tab_active');
                addClass(v, 'claim_tab');
            });
            removeClass(el.parentNode, 'claim_tab');
            addClass(el.parentNode, 'claim_tab_active');
        } else if (hasClass(el.firstChild, 'claims_section_filter')) {
            each(geByClass('claims_section_filter', ge('claims_section_filters')), function(i, v) {
                removeClass(v, 'selected');
            });
            addClass(el.firstChild, 'selected');
        }
        return nav.go(el, evt);
    },
    toggleDetails: function(cid) {
        if (isVisible('details' + cid)) {
            Claims.hideDetails(cid);
        } else {
            Claims.showDetails(cid);
        }
    },
    showDetails: function(cid) {
        if (!cur.claimed_content) cur.claimed_content = {};
        if (!cur.claimed_content[cid]) {
            hide('details_link_' + cid);
            show('details_loading_' + cid);
            ajax.post('/claims', {
                act: 'a_get_content',
                claim_id: cid
            }, {
                onDone: function(content) {
                    var cont = ge('details' + cid);
                    var el = ge('content' + cid);
                    el.innerHTML = content;
                    hide('details_loading_' + cid);
                    show('details_hide_' + cid);
                    if (content == "") {
                        hide('content_wrap' + cid);
                    }
                    if (!isVisible(cont)) slideToggle(cont, 200);
                }
            });
        } else {
            cont = ge('details' + cid);
            slideToggle(cont, 200, function() {
                hide('details_link_' + cid);
                show('details_hide_' + cid);
            });
        }
        cur.claimed_content[cid] = true;
        return false;
    },
    hideDetails: function(cid) {
        cont = ge('details' + cid);
        if (isVisible(cont)) slideToggle(cont, 200, function() {
            hide('details_hide_' + cid);
            show('details_link_' + cid);
        });
        return false;
    },
    getPage: function(offset) {
        show('pages_loading_top');
        show('pages_loading_bottom');
        ajax.post('/claims', {
            act: nav.objLoc.act,
            filter: nav.objLoc.filter,
            offset: offset,
            load: 1
        }, {
            cache: 1,
            onDone: function(content, script) {
                ge('content').innerHTML = content;
                if (window.tooltips) tooltips.hideAll();
                if (script) eval(script);
                if (offset) {
                    nav.setLoc(extend(nav.objLoc, {
                        offset: offset
                    }));
                } else {
                    delete nav.objLoc.offset;
                    nav.setLoc(nav.objLoc);
                }
            },
            onFail: function() {
                hide('pages_loading_top');
                hide('pages_loading_bottom');
            }
        });
        return false;
    },

    claimContent: function(cid, type, owner_id, id, hash) {
        ge('claim' + cid + type + owner_id + '_' + id).innerHTML = '';
        ajax.post('/claims', {
            act: 'a_claim',
            claim_id: cid,
            type: type,
            id: id,
            owner_id: owner_id,
            hash: hash
        }, {
            onDone: function(txt) {
                val('claim' + cid + type + owner_id + '_' + id, '<a href="#" onclick="Claims.unclaimContent(' + cid + ',\'' + type + '\',' + owner_id + ',' + id + ',\'' + hash + '\');">' + txt + '</a>');
            }
        });
    },
    unclaimContent: function(cid, type, owner_id, id, hash) {
        ge('claim' + cid + type + owner_id + '_' + id).innerHTML = '';
        ajax.post('/claims', {
            act: 'a_unclaim',
            claim_id: cid,
            type: type,
            id: id,
            owner_id: owner_id,
            hash: hash
        }, {
            onDone: function(txt) {
                val('claim' + cid + type + owner_id + '_' + id, '<a href="#" onclick="Claims.claimContent(' + cid + ',\'' + type + '\',' + owner_id + ',' + id + ',\'' + hash + '\');">' + txt + '</a>');
            }
        });
    },
    setClaimStatus: function(cid, status, onDone, sure, comment) {
        var params = {
            act: 'a_set_status',
            claim_id: cid,
            status: status
        };
        if (status == 2) {
            if (sure) {
                params.comment = comment;
            } else {
                var box = cur.showDeclineBox(function() {
                    var comment = val('claims_decline_comment');
                    box.hide();
                    Claims.setClaimStatus(cid, status, onDone, true, comment);
                });
                return;
            }
        }
        ajax.post('/claims', params, {
            onDone: function(newstatus, message) {
                if (message) {
                    showFastBox(getLang('global_error'), message);
                }
                removeClass('claim' + cid, 'status0');
                removeClass('claim' + cid, 'status1');
                removeClass('claim' + cid, 'status2');
                addClass('claim' + cid, 'status' + newstatus);
                if (onDone) {
                    onDone(cid, newstatus);
                }
            }
        });
    },
    updateClaimButtons: function(cid, status) {
        if (status == 0) {
            ge('claim_status').innerHTML = "�������";
            ge('claim_buttons').innerHTML = "<div class=\"button_blue fl_l\"><button onclick=\"Claims.setClaimStatus(" + cid + ", 1, Claims.updateClaimButtons);\">�������</button></div>" +
                "<div class=\"button_gray fl_l\"><button onclick=\"Claims.setClaimStatus(" + cid + ", 2, Claims.updateClaimButtons);\">���������</button></div>";
        } else
        if (status == 1 || status == 2) {
            ge('claim_status').innerHTML = (status == 1 ? "�������" : "���������");
            ge('claim_buttons').innerHTML = "<div class=\"button_blue fl_l\"><button onclick=\"Claims.setClaimStatus(" + cid + ", 0, Claims.updateClaimButtons);\">�������</button></div>";
        }
        ge('claim_updated_msg').innerHTML = "<b>������</b><br/>������ ������ ������� �������.";
        show('claim_updated_msg');
        setStyle('claim_updated_msg', 'backgroundColor', '#F4EBBD');
        animate(ge('claim_updated_msg'), {
            backgroundColor: '#F9F6E7'
        }, 2000);
        scrollToTop(0);
    },
    updateClaimLinks: function(cid, status) {
        if (status == 0) {
            ge('claim' + cid + '_status').innerHTML = "�������<br/><a href='#' onclick='Claims.setClaimStatus(" + cid + ", 1, Claims.updateClaimLinks); return cancelEvent(event);'>�������</a>" +
                " | <a href='#' onclick='Claims.setClaimStatus(" + cid + ", 2, Claims.updateClaimLinks); return cancelEvent(event);'>���������</a>";
        } else
        if (status == 1 || status == 2) {
            ge('claim' + cid + '_status').innerHTML = ((status == 1) ? "�������" : "���������") + "<br/><a href='#' onclick='Claims.setClaimStatus(" + cid + ", 0, Claims.updateClaimLinks); return cancelEvent(event);'>�������</a>";
        }
    },
    toggleObjectionDetails: function(oid) {
        var cont = ge('objection_details' + oid);
        slideToggle(cont, 200, function() {
            //ge('objection_details_link_0').innerHTML = isVisible(cont) ? "������" : "��������";
        });
    },
    approveObjection: function(oid) {
        ge('objection_status_' + oid).innerHTML = '';
        show('objection_loading_' + oid);
        ajax.post('/claims', {
            act: 'a_approve_objection',
            objection_id: oid
        }, {
            onDone: function(newstatus, oids) {
                hide('objection_loading_' + oid);
                if (oids && oids.length) {
                    for (var i in oids) {
                        ge('objection_status_' + oids[i]).innerHTML = newstatus;
                        addClass('objection' + oids[i], 'approved');
                    }
                }
            }
        });
    },
    declineObjection: function(oid) {
        ge('objection_status_' + oid).innerHTML = '';
        show('objection_loading_' + oid);
        ajax.post('/claims', {
            act: 'a_decline_objection',
            objection_id: oid
        }, {
            onDone: function(newstatus, oids) {
                hide('objection_loading_' + oid);
                if (oids && oids.length) {
                    for (var i in oids) {
                        ge('objection_status_' + oids[i]).innerHTML = newstatus;
                        addClass('objection' + oids[i], 'declined');
                    }
                }
            }
        });
    },

    indexTitles: function(callback) {
        var all = cur.blacklist,
            replacer = function(str, p) {
                var c = intval(p);
                return (c >= 33 && c < 48) ? String.fromCharCode(c) : str;
            };

        cur.titles = cur.titles || {};
        cur.titlesIndex = new vkIndexer(all, function(obj) {
            cur.titles[parseInt(obj.id)] = obj;
            return obj.title_sorted.replace(/\&\#(\d+);?/gi, replacer);
        }, function() {
            if (callback) {
                callback();
            }
        });
    },

    filterClaimedTitles: function(e, obj, force) {
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout((function() {
            var str = trim(obj.value);
            if (str == cur.searchStr && !force) return;
            toggleClass(cur.clearSearch, 'shown', !!str);
            if (str && hasClass(cur.addButton.parentNode, 'button_disabled')) {
                disableButton(cur.addButton, false);
            } else if (!str && !hasClass(cur.addButton.parentNode, 'button_disabled')) {
                disableButton(cur.addButton, true);
            }
            cur.searchStr = str;
            this.searchTitles(str);

            scrollToTop();
        }).bind(this), 10);
    },

    clearTitlesSearch: function(el, event) {
        setStyle(el, {
            opacity: .6
        });
        elfocus(cur.aSearch);
        val(cur.aSearch, '');
        removeClass(cur.clearSearch, 'shown');
        if (!hasClass(cur.addButton.parentNode, 'button_disabled')) {
            disableButton(cur.addButton, true);
        }
        this.filterClaimedTitles(null, cur.aSearch);
    },

    scrollCheck: function() {
        if (browser.mobile || cur.disableAutoMore) return;

        if (!isVisible(cur.showMore) || !cur.curList) return;

        var docEl = document.documentElement;
        var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
        var st = scrollGetY();

        if (st + ch + 400 > cur.showMore.offsetTop) {
            Claims.showTitleRows();
        }
    },

    scrollnode: browser.msie6 ? pageNode : window,
    startTitleEvents: function() {
        addEvent(Claims.scrollnode, 'scroll', Claims.scrollCheck);
        addEvent(window, 'resize', Claims.scrollCheck);
        addEvent(cur.aSearch, 'blur', Claims.searchTitleBlur);
        addEvent(cur.aSearch, 'focus', Claims.searchTitleFocus);
    },

    stopTitleEvents: function() {
        removeEvent(Claims.scrollnode, 'scroll', AudClaimsio.scrollCheck);
        removeEvent(window, 'resize', Claims.scrollCheck);
        removeEvent(cur.aSearch, 'blur', Claims.searchTitleBlur);
        removeEvent(cur.aSearch, 'focus', Claims.searchTitleFocus);
    },

    searchTitleFocus: function() {
        addClass(cur.aContent, 'light');
    },

    searchTitleBlur: function() {
        removeClass(cur.aContent, 'light');
    },

    filterDeletedTitles: function(arr) {
        var len = arr.length;
        var res = [];
        for (var i = 0; i < len; i++) {
            var t = arr[i];
            if (cur.titles && cur.titles[t.id] && !cur.titles[t.id].deleted) {
                res.push(t);
            }
        }
        return res;
    },

    searchTitles: function(str) {
        cur.shownTitles = 0;
        if (str) {
            var htmlentities = function(s) {
                var el = document.createElement('div');
                el.innerText = el.textContent = s;
                s = el.innerHTML;
                delete el;
                return s.split('"').join('&quot;');
            }
            var htmlencode = function(str) {
                return str.toLowerCase().replace(/\u2013|\u2014/g, '-');
                var aStr = str.toLowerCase().replace(/\u2013|\u2014/g, '-').split(''),
                    i = aStr.length,
                    aRet = [];
                while (i--) {
                    var iC = aStr[i].charCodeAt();
                    if ((iC > 127 && iC < 994)) {
                        aRet.push('&#' + iC + ';');
                    } else if (iC == 36) {
                        aRet.push('&#0' + iC + ';');
                    } else {
                        aRet.push(htmlentities(aStr[i]));
                    }
                }
                return aRet.reverse().join('');
            }
            var res = cur.titlesIndex.search(htmlencode(str));
            cur.curList = 'search_' + str;
            cur.titlesList[cur.curList] = res.sort(function(a, b) {
                return a._order - b._order
            });

            if (str) {
                str += ' ' + (parseLatin(str) || '');
                str = trim(escapeRE(str.replace(/\)/g, '')).split('&').join('&amp;'));
                cur.selection = {
                    re: new RegExp('(' + str.replace(cur.titlesIndex.delimiter, '|').replace(/(^\||\|$|\?)/g, '') + ')', 'gi'),
                    val: '<span>$1</span>'
                };
            }
        } else {
            cur.curList = 'all';
            cur.selection = false;
        }

        cur.sectionCount = (cur.titlesList[cur.curList]) ? cur.titlesList[cur.curList].length : 0;
        this.filterTimeout = setTimeout((function() {
            this.showTitleRows();
        }).bind(this), 10);
    },

    showTitleRows: function(start, end) {
        var list = cur.titlesList[cur.curList] || [];
        if (start == undefined) {
            start = cur.shownTitles;
        }
        if (end == undefined) {
            end = cur.shownTitles + cur.titlesPerPage;
        }
        if (window.tooltips && cur.tooltips) {
            for (var i = 0; i < cur.tooltips.length; ++i) {
                if (cur.tooltips[i].el) {
                    if (cur.tooltips[i].el.ttimer) {
                        clearTimeout(cur.tooltips[i].el.ttimer);
                    }
                }
                cur.tooltips[i].hide({
                    fasthide: true
                });
            }
        }
        if (!cur.searchStr) {
            list = Claims.filterDeletedTitles(list);
        }
        if (!list || !list.length) {
            var msg = (cur.blacklist.length) ? getLang('claim_no_audios_found').split('{query}').join('<b>' + cur.searchStr.replace(/([<>&#]*)/g, '') + '</b>') : getLang('claim_no_blacklist_audios'),
                link = se(cur.linkTpl);
            link.className = 'claim_check_link simple';
            cur.aContent.innerHTML = '<div id="not_found" class="claim_msg">' + msg + '</div>';
            ge('not_found').appendChild(link);

            hide(cur.showMore);
        } else {
            if (!cur.shownTitles) cur.aContent.innerHTML = '';
            var titles = list.slice(start, end);
            if (!titles.length) {
                if (cur.shownTitles >= cur.sectionCount) {
                    hide(cur.showMore);
                }
                return;
            }
            var html = [];
            if (cur.searchStr && !start) {
                html.push(cur.linkTpl);
            }
            for (i in titles) {
                var row = clone(titles[i]);
                if (cur.selection) {
                    row.title = row.title.replace(cur.selection.re, cur.selection.val).replace(/&#(\d*)<span>(\d+)<\/span>(\d*);/g, "&#$1$2$3;");
                }
                html.push(cur.titleTpl(row));
                cur.shownTitles += 1;
            }
            var au = ce('div', {
                innerHTML: html.join('')
            });
            while (au.firstChild) {
                var el = au.firstChild;
                cur.aContent.appendChild(el);
            }
            toggle(cur.showMore, (cur.shownTitles < cur.sectionCount));
        }
    },

    checkClaiemdTitle: function(title, el) {
        ajax.post('/claims', {
            act: 'a_search_blacklist',
            title: title,
            hash: cur.hash
        }, {
            onDone: function(res) {
                if (res) {
                    var replaced = hasClass(el, 'simple') ? domPN(el) : el;
                    domPN(replaced).replaceChild(se(res), replaced);
                } else {
                    re(el);
                }
            }
        });
    },

    deleteClaimedTitle: function(title_id) {
        var obj = cur.titles[title_id],
            title = obj && obj.title || '';
        if (!title) {
            var row = ge('row' + title_id),
                titleEl = row && geByClass1('claim_title', row);
            if (titleEl) {
                title = titleEl.innerHTML;
            }
        }
        var box = showFastBox({
            title: getLang('claim_delete_blacklist_title'),
            dark: 1,
            width: 450
        }, rs(cur.sureDelete, {
            title: '<b>' + title + '</b>'
        }), getLang('global_delete'), function(btn) {
            ajax.post('/claims', {
                act: 'a_delete_blacklist',
                title_id: title_id,
                hash: cur.hash
            }, {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function() {
                    if (obj) {
                        cur.titlesIndex.remove(obj);
                        cur.titles[title_id].deleted = true;
                        cur.sectionCount--;
                        if (cur.shownTitles) cur.shownTitles--;
                    }
                    slideUp('row' + title_id, 200, re.pbind('row' + title_id));
                    box.hide();
                },
                onFail: function(err) {
                    ge('claim_error').innerHTML = err;
                    show('claim_error');
                    return true;
                }
            });
        }, getLang('global_cancel'));
    },

    saveClaimedTitle: function(btn) {
        var box = curBox();
        title = trim(val('claim_add_title')),
            claim_id = val('claim_add_claim');
        ajax.post('/claims', {
            act: 'a_add_blacklist',
            str: title,
            claim_id: claim_id,
            hash: cur.hash
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(obj) {
                var all_list = cur.blacklist;
                if (all_list && all_list.length) {
                    obj._order = all_list[0]._order - 1;
                    cur.titlesList['all'].splice(0, 0, obj);
                } else {
                    obj._order = 0;
                    cur.titlesList['all'] = [obj];
                }
                cur.titles[obj[1]] = obj;
                cur.titlesIndex.add(obj);
                Claims.filterClaimedTitles(null, cur.aSearch, true);
                box.hide();
            },
            onFail: function(err) {
                ge('claim_error').innerHTML = err;
                show('claim_error');
                return true;
            }
        });
    },

    newClaimedTitle: function() {
        var str = trim(cur.aSearch.value),
            claim_id = '';
        if (!str) {
            notaBene(cur.aSearch);
            return;
        }
        showFastBox({
            title: getLang('claim_add_blacklist_title'),
            dark: 1,
            width: 450
        }, rs(cur.addForm, {
            title: str,
            claim_id: claim_id
        }), getLang('global_add'), Claims.saveClaimedTitle, getLang('global_cancel'));
        elfocus('claim_add_title');
    },

    addTitleDuration: function(title_id, title) {
        cur.currentTitleId = title_id;
        showBox('audio', {
            act: 'a_choose_audio_box',
            q: title,
            blacklist: 1
        }, {
            cache: 1,
            dark: 1
        });
    },

    chooseTitleDuration: function(link, duration) {
        ajax.post('/claims', {
            act: 'a_add_blacklist_duration',
            title_id: cur.currentTitleId,
            duration: duration,
            hash: cur.hash
        }, {
            onDone: function() {
                var parEl = geByClass1('claim_title_duration', ge('row' + cur.currentTitleId));
                if (parEl) {
                    var addEl = geByClass1('add', parEl);
                    if (addEl) {
                        parEl.insertBefore(se('<div class="claim_title_dur">' + cur.formatTime(duration) + '</div>'), addEl)
                    }
                }
            }
        });
        link.parentNode.innerHTML = '<div class="claim_choose_added">' + getLang('claim_choose_added') + '</div>';
    },

    deleteTitleDuration: function(title_id, duration_id, el) {
        var box = showFastBox({
            title: getLang('claim_delete_blacklist_duration_title'),
            dark: 1,
            width: 450
        }, getLang('claim_sure_delete_blacklist_duration'), getLang('global_delete'), function(btn) {
            ajax.post('/claims', {
                act: 'a_delete_blacklist_duration',
                title_id: title_id,
                duration_id: duration_id,
                hash: cur.hash
            }, {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function() {
                    delete((cur.titles[title_id] || {}).duration || {})[duration_id];
                    re(el);
                    box.hide();
                },
                onFail: box.hide
            });
        }, getLang('global_cancel'));
    },

    _videoHashesHideRow: function(ref) {
        var el = gpeByClass('claim_hashes_row', ref);
        setStyle(el, {
            opacity: 0,
            height: 0
        });
        setTimeout(function() {
            re(el);
        }, 200);
    },

    videoHashesRemove: function(btn, videoId, sourceVideoId, claimId, localClaimId, relevance, hash, collection) {
        Claims._videoHashesHideRow(btn);
        ajax.post('/claims', {
            act: 'a_claim_video_remove',
            video: videoId,
            hash: hash,
            source_video: sourceVideoId,
            claim_id: claimId,
            local_claim_id: localClaimId,
            relevance: relevance,
            collection: collection
        });
    },

    videoHashesSkip: function(btn, videoId, sourceVideoId, claimId, localClaimId, relevance, hash, collection) {
        Claims._videoHashesHideRow(btn);
        ajax.post('/claims', {
            act: 'a_claim_video_skip',
            video: videoId,
            hash: hash,
            source_video: sourceVideoId,
            claim_id: claimId,
            local_claim_id: localClaimId,
            relevance: relevance,
            collection: collection
        });
    },

    videoHashesUnban: function(btn, videoId, sourceVideoId, claimId, localClaimId, relevance, hash, collection) {
        Claims._videoHashesHideRow(btn);
        ajax.post('/claims', {
            act: 'a_claim_video_unban',
            video: videoId,
            hash: hash,
            source_video: sourceVideoId,
            claim_id: claimId,
            local_claim_id: localClaimId,
            relevance: relevance,
            collection: collection
        });
    },

    _eof: 1
};
try {
    stManager.done('claims.js');
} catch (e) {}