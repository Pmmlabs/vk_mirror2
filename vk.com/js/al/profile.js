var Profile = {
        toggleInfo: function(el) {
            var info = ge('profile_full');
            toggle(info);
            toggleClass(el, 'info_shown', isVisible(info));
            return false;
        },
        showGroups: function(e) {
            if (checkEvent(e) !== false) return;
            var lnk = ge('profile_groups_link');
            lnk.oldText = val(lnk);
            ajax.post('al_profile.php', {
                act: 'groups',
                id: cur.oid
            }, {
                onDone: function(label, text) {
                    if (text) {
                        val(lnk, label);
                        lnk.onclick = Profile.hideGroups;
                        var pag = ge('profile_all_groups');
                        val(pag, text);
                        show(pag.parentNode);
                    } else {
                        hide(lnk);
                    }
                },
                showProgress: function() {
                    val(lnk, '<div class="progress" id="profile_groups_prg"></div>');
                },
                hideProgress: function() {
                    val(lnk, lnk.oldText);
                },
                cache: 1
            });
            return cancelEvent(e);
        },
        hideGroups: function(e) {
            if (checkEvent(e) !== false) return;
            var lnk = ge('profile_groups_link');
            val(lnk, lnk.oldText);
            lnk.onclick = Profile.showGroups;
            hide(ge('profile_all_groups').parentNode);
            return cancelEvent(e);
        },
        photoRemove: function(lnk, photo_id, ev) {
            if (cur.viewAsBox) {
                cur.viewAsBox();
                return cancelEvent(ev);
            }
            if (!cur.hidingPh) cur.hidingPh = {};
            if (cur.hidingPh[photo_id]) return cancelEvent(ev);

            ajax.post('al_profile.php', {
                act: 'remove_photo',
                photo_id: photo_id,
                hash: cur.options.profph_hash
            }, {
                onDone: function(about, photos) {
                    var msgEl = ge('profile_photos_about') || ge('profile_photos_module').insertBefore(se('<div class="info_msg" id="profile_photos_about"><div class="msg_text"></div></div>'), ge('page_photos_module'));
                    val(domFC(msgEl), about);
                    each(geByClass('ui_thumb_x_button', ge('page_photos_module')), function() {
                        if (this.tt && this.tt.destroy) {
                            this.tt.destroy();
                        }
                    });
                    val('page_photos_module', photos);
                    if (!photos) {
                        hide('profile_photos_module');
                    }
                },
                showProgress: function() {
                    cur.hidingPh[photo_id] = 1;
                },
                hideProgress: function() {
                    cur.hidingPh[photo_id] = 0;
                }
            });
            return cancelEvent(ev);
        },
        photoReturn: function(lnk, photo_id) {
            if (cur.viewAsBox) return cur.viewAsBox();

            ajax.post('al_profile.php', {
                act: 'return_photo',
                photo_id: photo_id,
                hash: cur.options.profph_hash
            }, {
                onDone: function(photos) {
                    each(geByClass('ui_thumb_x_button', ge('page_photos_module')), function() {
                        if (this.tt && this.tt.destroy) {
                            this.tt.destroy();
                        }
                    });
                    val('page_photos_module', photos);
                    re('profile_photos_about');
                },
                showProgress: addClass.pbind('profile_photos_about', 'loading'),
                hideProgress: removeClass.pbind('profile_photos_about', 'loading')
            });
        },
        editPhoto: function(newph) {
            if (cur.viewAsBox) return cur.viewAsBox();

            showBox('/al_profile.php', extend(newph || {}, {
                act: 'edit_photo'
            }), {
                params: {
                    bodyStyle: 'padding: 16px 7px'
                },
                stat: ['tagger.js', 'tagger.css']
            });
        },
        deletePhoto: function() {
            if (cur.viewAsBox) return cur.viewAsBox();

            showBox('al_profile.php', {
                act: 'delete_photo_box'
            });
        },
        toggleFan: function(btn, hash, act, ev) {
            if (cur.viewAsBox) {
                return cur.viewAsBox();
            }

            if (cur.toggleFanAct != undefined) {
                act = cur.toggleFanAct;
            }
            ajax.post('al_fans.php', {
                act: act ? 'be_fan' : 'not_fan',
                mid: cur.oid,
                hash: hash
            }, {
                onDone: function(text) {
                    btn.firstChild.nextSibling.innerHTML = text;
                    cur.toggleFanAct = !act;
                },
                progress: btn.firstChild
            });
            cancelEvent(ev);
        },
        toggleFave: function(btn, hash, act, ev) {
            if (cur.viewAsBox) {
                return cur.viewAsBox();
            }

            if (cur.toggleFaveAct != undefined) {
                act = cur.toggleFaveAct;
            }
            ajax.post('fave.php', {
                act: act ? 'addPerson' : 'deletePerson',
                mid: cur.oid,
                hash: hash
            }, {
                onDone: function(text) {
                    val(btn, text);
                    cur.toggleFaveAct = !act;
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(btn),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        toggleFriend: function(btn, hash, act, ev, sure) {
            if (cur.viewAsBox) {
                return cur.viewAsBox();
            }

            if (act) {
                if (sure !== true && cur.options.bannedhim) {
                    showBox('al_profile.php', {
                        act: 'banned_him',
                        action: 'friend',
                        mid: cur.oid
                    }).onContinue = Profile.toggleFriend.pbind(btn, hash, act, false, true);
                    return cancelEvent(ev);
                }
                stManager.add(['tooltips.css', 'tooltips.js']);
            }
            var progress = ce('img', {
                src: '/images/upload' + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.gif'
            }, {
                width: 32
            });
            var cont = btn;
            var params = {
                act: act ? 'add' : 'remove',
                mid: cur.oid,
                hash: hash,
                from: 'profile'
            };
            var midLogs;

            var recommInfo = Wall.friendsRecommLogCheckVisited(cur.oid);

            if (recommInfo) {
                params.ref = (cur.module === 'feed' && feed) ? feed.getModuleRef() : cur.module;

                if (recommInfo.trackCode) {
                    params.track_code = recommInfo.trackCode;
                }
            }

            if (act) {
                midLogs = Wall.friendsRecommLogGet(true, cur.oid);

                if (midLogs.length) {
                    Wall.friendsRecommLogClear(cur.oid);
                    params.logs = midLogs;
                }
            }

            ajax.post('al_friends.php', params, {
                onDone: function(text, vis, ttText, ttScript, doReload, friendsRecomm) {
                    if (act && cur.onFriendAdd) {
                        cur.onFriendAdd();
                    }
                    if (!text) return nav.reload();
                    var tt = (ge('profile_am_subscribed') || {}).tt;
                    if (tt && tt.hide) {
                        tt.hide({
                            fasthide: 1
                        });
                        tt.destroy();
                    }
                    var fs = ge('friend_status');
                    cleanElems(fs.firstChild);
                    if (text) {
                        show(fs);
                        val(fs, text);
                    } else {
                        hide(fs);
                    }
                    (vis ? show : hide)('friend_remove');
                    if (doReload || cur.options.bannedhim) {
                        nav.reload({
                            noscroll: true,
                            params: {
                                friends_recomm: 1
                            },
                        });
                    } else {
                        if (ttText) {
                            ajax.preload('al_friends.php', {
                                act: 'friend_tt',
                                mid: cur.oid,
                                hash: hash
                            }, [ttText, ttScript]);
                            setTimeout(Profile.friendTooltip, 0);
                        }

                        Profile.addFriendsRecommends(friendsRecomm);
                    }
                    Profile.frDropdownClear(hash);
                },
                showProgress: function() {
                    if (btn.tagName == 'BUTTON') lockButton(btn);
                    else if (hasClass(btn, 'page_actions_item')) window.Page && Page.actionsDropdownLock(btn);
                    else if (hasClass(domFC(btn), 'progress')) show(domFC(btn));
                    else cont.replaceChild(progress, cont.firstChild);
                },
                hideProgress: function() {
                    if (btn.tagName == 'BUTTON') unlockButton(btn);
                    else if (hasClass(btn, 'page_actions_item')) window.Page && Page.actionsDropdownUnlock(btn);
                    else if (hasClass(domFC(btn), 'progress')) hide(domFC(btn));
                    else cont.replaceChild(cont.firstChild, progress);
                },
                onFail: function(text) {
                    if (midLogs) {
                        Wall.friendsRecommLogOnFail(midLogs);
                    }

                    if (!text) return;

                    showFastBox({
                        title: getLang('global_error'),
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, text);
                    return true;
                }
            });
            cancelEvent(ev);
        },
        friendTTHide: function(e) {
            var tt = (ge('profile_am_subscribed') || {}).tt;
            if (e) {
                for (var el = e.target; el; el = domPN(el)) {
                    if (el.tagName && hasClass(el, 'preq_tt')) {
                        return;
                    }
                }
            }
            if (tt && tt.hide) tt.hide({
                fasthide: 1
            });
            removeEvent(document, 'click', Profile.friendTTHide);
        },
        friendTooltip: function(status, hash) {
            if (cur.viewAsBox) {
                return;
            }

            if (status) {
                setTimeout(function() {
                    removeEvent(document, 'click', Profile.friendTTHide);
                    addEvent(document, 'click', Profile.friendTTHide);
                }, 0);
            } else {
                var tt = (ge('profile_am_subscribed') || {}).tt;
                if (tt && tt.hide && isVisible(tt.container)) {
                    tt.hide({
                        fasthide: 1
                    });
                    removeClass('profile_am_subscribed', 'profile_frdd_active');
                    return;
                }
                addClass('profile_am_subscribed', 'profile_frdd_active');
            }
            return showTooltip(ge('profile_am_subscribed'), {
                url: 'al_friends.php',
                params: {
                    act: 'friend_tt',
                    mid: cur.oid,
                    hash: hash
                },
                cache: 1,
                slide: 15,
                hidedt: 1000,
                shift: [27, -1, status ? 3 : 1],
                className: 'preq_tt',
                forcetodown: true,
                onHide: removeClass.pbind('profile_am_subscribed', 'profile_frdd_active')
            });
        },
        addFriendsRecommends: function(blockHtml) {
            if (!blockHtml) {
                return;
            }

            var friendsBlock = ge('profile_friends_recomm');

            if (friendsBlock) {
                return;
            }

            friendsBlock = se(blockHtml);

            domInsertAfter(friendsBlock, domPN(ge('page_info_wrap')));

            var gallery = geByClass1('ui_gallery', friendsBlock);

            Profile.friendsRecommInit(gallery);
        },
        friendsRecommInit: function(gallery) {
            Wall.friendsRecommInit(gallery, {
                friendId: cur.oid,
                onDestroy: function() {
                    var friendsBlock = domPN(gallery);
                    re(friendsBlock);
                },
            });
        },
        friendsRecommHide: function(el, event) {
            var friendsBlock = ge('profile_friends_recomm');

            if (friendsBlock) {
                var gallery = geByClass1('ui_gallery', friendsBlock);
                var containerEl = gpeByClass('page_block', friendsBlock);
                var trackCode = domData(gallery, 'code') || '';

                uiGetGallery(gallery).destroy();
                Wall.friendsRecommLogSave(['hide_block', vkNow(), cur.module, trackCode], true);

                re(containerEl);
            }

            return event && cancelEvent(event);
        },
        addRequestMessage: function(hash, e) {
            return !showBox('al_friends.php', {
                act: 'request_box',
                mid: cur.oid
            }, {
                params: {
                    bodyStyle: 'padding: 0px',
                    width: 502,
                    hideButtons: 1
                }
            }, e);
        },
        frDropdownPreload: function(el, sh, hash) {
            if (cur.viewAsBox || !cur.oid) return;

            ajax.post('al_friends.php', {
                act: 'friend_dd',
                mid: cur.oid,
                hash: hash
            }, {
                onDone: function(html, js) {
                    if (!sh) return;

                    if (!ge('page_actions_wrap')) {
                        html && domPN(el).appendChild(se(html));
                        eval(js);
                    }
                },
                cache: 1
            });
        },
        frDropdownClear: function(hash) {
            ajax.preload('al_friends.php', {
                act: 'friend_dd',
                mid: cur.oid,
                hash: hash
            }, false);
        },
        frListsDDShow: function(ev) {
            var obj = ge('page_actions_item_lists');
            addClass(obj, 'page_actions_item_unfolded');
            if (ge('page_actions_sublist')) {
                clearTimeout(cur.frListsDDHide);
                show('page_actions_sublist');
                return;
            }
            if (!cur.frListsCats) {
                cur.frListsCats = cur.options.curCats;
            }

            var elems = [];
            var cats = cur.frListsCats;

            var publicLists = [28, 29, 27, 25, 26];
            for (var j = 0, i; j < 5; ++j) {
                i = publicLists[j];
                if (cur.options.publicLists[i]) {
                    elems.push('<a class="page_actions_item page_actions_subitem' + ((cats & (1 << parseInt(i))) ? ' checked' : '') + '" onclick="Profile.frListsCheck(this, ' + i + ');">' + cur.options.publicLists[i] + '</a>');
                }
            }
            for (var i in cur.options.userLists) {
                if (i < 25) {
                    var lname = cur.options.userLists[i];
                    if (lname.length > 20) {
                        lname = trim(lname.substr(0, 18)) + '...';
                    }
                    elems.push('<a class="page_actions_item page_actions_subitem' + ((cats & (1 << parseInt(i))) ? ' checked' : '') + '" onclick="Profile.frListsCheck(this, ' + i + ');">' + lname + '</a>');
                }
            }
            elems = se('<div id="page_actions_sublist" onmouseover="Profile.frListsDDShow(event);">' + elems.join('') + '</div>');
            obj.parentNode.appendChild(elems);
        },
        frListsDDHide: function() {
            clearTimeout(cur.frListsDDHide);
            cur.frListsDDHide = setTimeout(function() {
                hide('page_actions_sublist');
                removeClass('page_actions_item_lists', 'page_actions_item_unfolded');
            }, 150);
        },
        frListsCheck: function(obj, listId) {
            var checked = hasClass(obj, 'checked');
            var cats = parseInt(cur.frListsCats);
            if (checked) {
                if (cats & (1 << listId)) {
                    cats -= (1 << listId);
                }
            } else {
                if (!(cats & (1 << listId))) {
                    cats += (1 << listId);
                }
            }
            cur.frListsCats = cats;

            (checked ? removeClass : addClass)(obj, 'checked');
            if (cur.frListsTO) {
                clearTimeout(cur.frListsTO);
            }
            cur.frListsTO = setTimeout(function() {
                ajax.post('al_friends.php', {
                    act: 'save_cats',
                    uid: cur.oid,
                    cats: cats,
                    hash: cur.options.catsHash
                });
            });
        },
        submitReqText: function() {
            var msg = trim(val('preq_input'));
            if (!msg) return elfocus('preq_input');

            var oid = cur.mfid ? cur.mfid : cur.oid;
            ajax.post('al_friends.php', {
                act: 'request_text',
                mid: oid,
                message: msg,
                hash: cur.reqHash
            }, {
                onDone: function(text) {
                    if (curBox()) curBox().hide();
                    if (!text) return;

                    var t = ge('preq_text');
                    val(t, text);
                    if (t) {
                        show(t.parentNode);
                    }
                    t = ge('preq_input');
                    if (t) {
                        hide(t.parentNode);
                    }
                },
                showProgress: lockButton.pbind('preq_submit'),
                hideProgress: unlockButton.pbind('preq_submit')
            });
        },
        reqTextChanged: function(ev) {
            onCtrlEnter(ev, Profile.submitReqText);
            var field = ge('preq_input');
            var v = trim(val(field)).replace(/\n\n\n+/g, '\n\n');
            if (field.lastLen === v.length) return;
            field.lastLen = v.length;
            var countRealLen = function(text, max, maxbr) {
                var spec = {
                    '&': 5,
                    '<': 4,
                    '>': 4,
                    '"': 6,
                    "\n": 4,
                    "\r": 0,
                    '!': 5,
                    "'": 5
                };
                var res = 0,
                    brs = 0,
                    good = false;
                for (var i = 0, l = text.length; i < l; i++) {
                    var k = spec[text.charAt(i)],
                        c = text.charCodeAt(i);
                    if (c == 10) ++brs;
                    if (k !== undefined) res += k;
                    else if ((c > 0x80 && c < 0xC0) || c > 0x500) res += ('&#' + c + ';').length;
                    else res += 1;
                    if (good === false && (max && res > max || maxbr && brs > maxbr)) good = i ? text.substr(0, i) : '';
                }
                return [res, brs, (good === false) ? text : good];
            }
            var maxLen = 240,
                maxBrs = 4,
                r = countRealLen(v, maxLen, maxBrs),
                realLen = r[0],
                brCount = r[1];
            var warn = ge('preq_warn');
            if (r[2] !== v) {
                if (realLen > maxLen) {
                    realLen = maxLen;
                } else if (brCount > 4) {
                    brCount = 4;
                }
                val(field, r[2]);
                field.lastLen = trim(r[2]).length;
            }
            if (realLen > maxLen - 40 || brCount > maxBrs) {
                if (realLen > maxLen) {
                    warn.innerHTML = getLang('friends_exceeds_symbol_limit', realLen - maxLen);
                } else if (brCount > 4) {
                    warn.innerHTML = getLang('friends_exceeds_lines_limit', brCount - 4);
                } else {
                    warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
                }
                show(warn);
            } else {
                hide(warn);
            }
        },
        toggleBlacklist: function(btn, hash, ev) {
            if (cur.viewAsBox) {
                return cur.viewAsBox();
            }

            ajax.post('al_settings.php', {
                act: cur.options.bannedhim ? 'a_del_from_bl' : 'a_add_to_bl',
                id: cur.oid,
                hash: hash,
                from: 'profile'
            }, {
                onDone: function(text) {
                    val(btn, text);
                    cur.options.bannedhim = !cur.options.bannedhim;
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(btn),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        toggleFeedIgnored: function(btn, hash, ev) {
            if (cur.viewAsBox) {
                return cur.viewAsBox();
            }

            ajax.post('al_feed.php', {
                act: cur.options.ignoredhim ? 'a_unignore_owner' : 'a_ignore_owner',
                owner_id: cur.oid,
                hash: hash,
                from: 'profile'
            }, {
                onDone: function(text) {
                    val(btn, text);
                    cur.options.ignoredhim = !cur.options.ignoredhim;
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(btn),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        showGiftBox: function(mid, ev, ref) {
            cur.gftbxWasScroll = boxLayerWrap.scrollTop;
            boxLayerWrap.scrollTop = 0;
            if (cur.viewAsBox) return cur.viewAsBox();

            return !showBox('al_gifts.php', {
                act: 'get_gift_box',
                mid: mid,
                fr: (mid == vk.id ? 1 : 0),
                ref: ref
            }, {
                stat: ['gifts.css', 'wide_dd.js', 'wide_dd.css'],
                cache: 1
            }, ev);
        },
        showHideGiftsBox: function(ev) {
            if (cur.viewAsBox) return cur.viewAsBox();
            var msg = getLang('profile_sure_hide_gifts').replace('{link}', '<a href="/settings">').replace('{/link}', '</a>').replace('{link1}', '<a href="/settings?act=privacy">').replace('{/link1}', '</a>');

            var box = showFastBox({
                title: getLang('global_warning'),
                bodyStyle: 'line-height: 160%;',
                width: 350
            }, msg, getLang('profile_gifts_hide_button'), function() {
                ajax.post('al_profile.php', {
                    act: 'hide_gifts',
                    hash: cur.options.gifts_hash
                }, {
                    onDone: function() {
                        slideUp('profile_gifts', 200);
                        box.hide();
                    },
                    progress: box.progress
                });
            }, getLang('global_cancel'));
            cancelEvent(ev);
            return false;
        },
        showNewGift: function(giftId, src) {
            var gifts = ge('profile_gifts');
            if (!gifts || !giftId) return;
            var images = geByTag('img', geByClass1('module_body', gifts)),
                pic = vkImage();
            pic.src = src || '/images/gift/' + giftId + '/' + (window.devicePixelRatio >= 2 ? '96' : '96') + '.png';
            var onload = function() {
                var firstPic = images[0],
                    a = firstPic.parentNode,
                    imgCount = images.length;
                if (firstPic) {
                    addClass(pic, 'profile_gift_img');
                    firstPic.parentNode.insertBefore(pic, firstPic);
                    a.scrollLeft = firstPic.offsetLeft;
                    animate(a, {
                        scrollLeft: 0
                    }, 200, function() {
                        if (imgCount >= 3) re(images[images.length - 1]);
                    })
                }
            };
            if (!pic.width) {
                addEvent(pic, 'load', onload);
            } else {
                onload();
            }
        },
        declineFriend: function(hash) {
            if (cur.viewAsBox) return cur.viewAsBox();
            ajax.post('al_friends.php', {
                act: 'remove',
                mid: cur.oid,
                hash: hash
            }, {
                onDone: function(text) {
                    hide('friend_request_actions');
                }
            });
        },
        processRelation: function(el, mid, hash, accept) {
            if (cur.viewAsBox) return cur.viewAsBox();

            var pos = getXY(el),
                parpos = getXY(el.parentNode);
            var pr = ge('relation_progress' + mid);
            ajax.post('al_profile.php', {
                act: 'process_relation',
                mid: mid,
                accept: accept ? 1 : '',
                full_shown: '',
                hash: hash
            }, {
                onDone: function(info) {
                    val('relations_wrap', info);
                },
                showProgress: function() {
                    pr.style.left = (el.offsetLeft + Math.floor((el.offsetWidth - 32) / 2)) + 'px';
                    show(pr);
                    el.style.visibility = 'hidden';
                },
                hideProgress: function() {
                    el.style.visibility = 'visible';
                    hide(pr);
                }
            });
        },
        fansBox: function(oid, ev, tab) {
            if (cur.viewAsBox) return cur.viewAsBox();
            return !showBox('al_fans.php', {
                act: 'box',
                tab: tab || 'fans',
                oid: oid
            }, {
                cache: 1,
                stat: ['page_help.css', 'fansbox.js']
            }, ev);
        },
        giftsBox: function(mid, ev, tab) {
            if (cur.viewAsBox) return cur.viewAsBox();
            return !showBox('al_gifts.php', {
                act: 'box',
                tab: tab || 'received',
                mid: mid
            }, {
                cache: 1,
                stat: ['gifts.css', 'gifts.js']
            }, ev);
        },
        idolsBox: function(oid, ev) {
            return Profile.fansBox(oid, ev, 'idols');
        },
        showClassHint: function(text) {
            var cl = ge('profile_class');
            if (!cl) return;

            var hint = cur.classhint = bodyNode.appendChild(ce('div', {
                id: 'profile_class_hint',
                innerHTML: '\
<table cellspacing="0" cellpadding="0">\
  <tr>\
    <td rowspan="2"><div class="pointer"></div></td>\
    <td><div class="content">' + text + '</div></td>\
  </tr>\
  <tr><td><div class="bottom"></div></td></tr>\
</table>'
            }, {
                display: 'none'
            }));

            var xy = getXY(cl),
                elsize = getSize(cl);

            hint.style.opacity = 0;
            show(hint);
            var size = getSize(hint);

            var top = xy[1] - Math.floor((size[1] - elsize[1]) / 2);
            var newleft = xy[0] + (vk.rtl ? -(size[0] + 10) : (elsize[0] + 10));
            hint.style.left = (newleft + (vk.rtl ? -10 : 10)) + 'px';
            hint.style.top = top + 'px';

            var showhint = animate.pbind(hint, {
                    left: newleft,
                    opacity: 1
                }, 500, false),
                img = vkImage();
            img.onload = showhint;
            img.src = '/images/classhint.gif';

            cur.destroy.push(function(c) {
                if (c.classhint && c.classhint.parentNode) {
                    c.classhint.parentNode.removeChild(c.classhint);
                    c.classhint = false;
                }
            });
            if (cur._back) {
                cur._back.hide.push(function() {
                    if (cur.classhint && cur.classhint.parentNode) {
                        cur.classhint.parentNode.removeChild(cur.classhint);
                        cur.classhint = false;
                    }
                });
            }
        },
        init: function(opts) {
            extend(cur, {
                module: 'profile',
                options: opts,
                oid: opts.user_id,
                postTo: opts.user_id,
                editing: false,
                viewAsWarn: opts.view_as_warn,
                viewAsBox: opts.view_as ? function() {
                    setTimeout(showFastBox({
                        title: getLang('global_warning'),
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, cur.options.view_as).hide, 2000);
                    return false;
                } : false,
                _back: opts.view_as ? false : {
                    loc: opts.loc,
                    show: [],
                    hide: [],
                    text: opts.back
                }
            });
            if (opts.view_as) {
                cur.nav.push(function(changed, old, n, opts) {
                    if (cur._leave) {
                        cur._leave = false;
                        return;
                    }
                    showFastBox({
                        title: getLang('global_warning'),
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, cur.viewAsWarn, getLang('global_continue'), function() {
                        cur._leave = true;
                        nav.go(n);
                    }, getLang('global_cancel'));
                    return false;
                });
            }
            if (opts.mail_cache) {
                ajax.preload('al_im.php', {
                    act: 'a_write_box',
                    to: cur.oid
                }, opts.mail_cache)
            }
            if (ge('profile_wall')) {
                wall.init(extend(opts, {
                    automore: 1
                }));
            }
            if (opts.class_hint) {
                cur.clHintTimer = setTimeout(Profile.showClassHint.pbind(opts.class_hint), 1000);
            }
            if (opts.invite_hint) {
                cur.invHintTimer = setTimeout(function() {
                    var hint = ge('top_invite_hint');
                    showTooltip(hint, {
                        text: opts.invite_hint,
                        slide: 30,
                        shift: [vk.rtl ? -220 : 0, 0, 0],
                        showdt: 0,
                        showsp: 500,
                        forcetodown: true,
                        className: 'invite_tt'
                    });
                    cur.tsUpdated = Profile.inviteHintUpdate;
                    stManager.add(['tooltips.css', 'tooltips.js'], cur.tsUpdated);
                }, 1000);
            }
            (cur._back ? cur._back.hide : cur.destroy).push(function(c) {
                clearTimeout((c || cur).clHintTimer);
                clearTimeout((c || cur).invHintTimer);
                Profile.friendTTHide(true);
            });
            if (nav.objLoc.suggest) {
                delete nav.objLoc.suggest;
                Profile.suggestFriends();
            }

            setTimeout(function() {
                if (window.FastChat && (window.curFastChat && curFastChat.inited || window.curNotifier && curNotifier.fc !== undefined)) {
                    show('profile_fast_chat');
                }
            }, 100);

            cur.onPeerStatusChanged = function(peer, evType, evData) {
                if (peer == cur.oid) {
                    var online = geByClass1('_profile_online');
                    if (evType == 'online') {
                        evData = intval(evData);
                        setStyle('profile_mobile_online', {
                            display: (evData && evData != 1) ? 'inline' : 'none'
                        });
                        addClass(online, 'is_online');
                    } else if (evType == 'offline') {
                        removeClass(online, 'is_online');
                    }
                }
            }

            if (browser.msie && intval(browser.version) < 11) {
                re(geByClass1('profile_1april_button_wrap', 'narrow_column'));
                return;
            }
            if (browser.opera && intval(browser.version) < 13) {
                re(geByClass1('profile_1april_button_wrap', 'narrow_column'));
            }
            if (opts.stickers_1april && opts.stickers_1april.length) {
                Profile.render1AprilStickers(opts.stickers_1april);
            } else {
                addClass(geByClass1('page_avatar_wrap'), 'no_stickers_1april');
            }

            var friendsBlock = ge('profile_friends_recomm');

            if (friendsBlock) {
                var friendsGallery = geByClass1('ui_gallery', friendsBlock);
                Profile.friendsRecommInit(friendsGallery);
            }

            setTimeout(Wall.friendsRecommLogSend, 100);
        },
        inviteHintUpdate: function() {
            var hint = ge('top_invite_hint');
            if (!hint || !hint.tt || !hint.tt.container) return;
            var lnk = isVisible('ts_wrap') ? ge('ts_settings') : ge('top_invite_link'),
                l = 0,
                r = 0;
            if (vk.rtl) {
                r = (413 - lnk.parentNode.parentNode.offsetLeft - (lnk.offsetWidth / 2)) + 'px';
            } else {
                l = (lnk.parentNode.parentNode.offsetLeft + (lnk.offsetWidth / 2) - 370) + 'px';
            }
            geByClass1('top_pointer', hint.tt.container).style.margin = '0px ' + r + ' 0px ' + l;
        },
        appStatusUpdate: function(hash) {
            if (!cur.ciApp) return;

            var exp = isChecked('currinfo_app');
            ajax.post('al_apps.php', {
                act: 'toggle_currinfo',
                hash: hash,
                exp: exp,
                id: cur.ciApp
            }, {
                onDone: function(text) {
                    if (vk.id != cur.oid || !text) return;
                    val('current_info', text);
                }
            })
        },
        suggestFriends: function() {
            if (cur.viewAsBox) return cur.viewAsBox();

            var box = showBox('al_friends.php', {
                act: 'select_friends_box',
                from: 'suggest_friends',
                friend_id: cur.oid
            }, {
                stat: ['privacy.js', 'privacy.css', 'indexer.js']
            });
            box.leaveOnSave = true;
            cur.onFlistSave = function(ids, list, hash) {
                //if (!ids || !ids.length) return;
                ajax.post('al_friends.php', {
                    act: 'a_suggest_friends',
                    mid: cur.oid,
                    ids: ids.join(','),
                    hash: hash
                }, {
                    onDone: function(text) {
                        box.hide();
                        showDoneBox(text);
                    },
                    showProgress: box.showProgress,
                    hideProgress: box.hideProgress
                });
            }
        },
        uploadPhotos: function(el, event) {
            var hasHTML5 = (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));

            if (!hasHTML5 || !event) {
                return nav.go(el, event);
            }
            if (checkEvent(event)) {
                return true;
            }

            cur.onPhotoInputChange = function(files) {
                window.filesToUpload = files;
                return nav.go(el, event);
            }

            var input = ge('page_upload_photos_input');
            if (!input) {
                input = se('<input id="page_upload_photos_input" class="file page_upload_photos_input" type="file" onchange="cur.onPhotoInputChange(this.files);" multiple="true" accept="image/jpeg,image/png,image/gif" name="photo" />')
            }

            input.click(event);
            return false;
        },
        hideFillBlock: function(el, event, type, hash) {
            el.tt && el.tt.hide && el.tt.hide();
            var block = gpeByClass('page_block', el);
            block && slideUp(block, 200, re.pbind(block));
            ajax.post('/al_profile.php', {
                act: 'hide_rate_block',
                type: type,
                hash: hash
            });
            cancelEvent(event);
            return false;
        },
        showProfileBox: function(uid, event) {
            showBox('al_places.php', {
                act: 'photos_box',
                uid: uid
            }, {
                stat: ['maps.js', 'places.js', 'places.css', 'ui_controls.js', 'ui_controls.css']
            });
            cancelEvent(event);
            return false;
        },
        render1AprilStickers: function(stickers) {
            var cont = geByClass1('page_avatar_wrap', 'profile');
            addClass(cont, 'stickers_added_1april');

            var stickersEls = geByClass('profile_1april_sticker', cont);
            for (var i = 0; i < stickersEls.length; i++) {
                re(stickersEls[i]);
            }

            for (var i = 0; i < stickers.length; i++) {
                var sticker = stickers[i];
                var el = ce('div', {
                    className: 'profile_1april_sticker',
                });
                cont.appendChild(el);

                setStyle(el, {
                    top: sticker.top,
                    left: sticker.left,
                    width: sticker.size ? sticker.size : sticker.width,
                    height: sticker.size ? sticker.size : sticker.height,
                    transform: 'rotate(' + (sticker.rotate) + 'deg)',
                    backgroundImage: Stickers.getStickerUrl(sticker.stickerId, 512),
                })
            }
        },
        show1AprilEditor: function(hash, photo_raw, btn) {
            cur.shownAs1AprilEditor = true;
            cur.saveHash1AprilEditor = hash;
            delete cur.pvData;

            return showPhoto(photo_raw, '', {
                additional: {
                    open_pe: 1,
                    stickers_1april: 1
                },
                progress: 1,
                showProgress: function() {
                    lockButton(btn)
                },
                hideProgress: function() {
                    unlockButton(btn)
                }
            });
        },
        initShowAsDropDown: function(friendsList, selected, langUnknownUserAs) {
            var pageBodyNode = ge('page_body');
            var notNode = ge('profile_view_as');
            cur.destroy.push(function() {
                if (!nav.objLoc.no_as_init) {
                    re(notNode);
                    window.viewAsDD = null;
                }
            });

            if (!window.viewAsDD) {
                pageBodyNode.insertBefore(notNode, pageBodyNode.firstChild);

                window.viewAsDD = window.WideDropdown.init('view_as_dd', {
                    defaultItems: friendsList,
                    chosen: selected,
                    width: 280,
                    url: 'hints.php',
                    params: {
                        act: 'a_json_friends',
                        from: 'viewas'
                    },
                    noResult: langUnknownUserAs,
                    introText: langUnknownUserAs,
                    noMultiSelect: 1,
                    custom: function(q) {
                        return q.match(/^(https?:\/\/)?vk\.com\/[\w.]{2,32}$/) ? [
                                [clean(q), clean(q), langUnknownUserAs, '/images/camera_c.gif', '', 0, 0, '', 1]
                            ] :
                            false;
                    },
                    onChange: function(actionId) {
                        var dd = cur.wdd['view_as_dd'];
                        if (actionId !== 1 || !dd.chosen) {
                            return; // only 'added' event is interesting
                        }
                        var value = dd.chosen[0] + '';
                        if (value.match(/^-?\d+$/) && intval(value)) {
                            cur._leave = true;
                            nav.go(Object.assign(nav.objLoc, {
                                as: intval(value),
                                no_as_init: 1
                            }));
                            return;
                        }
                        ajax.post('al_profile.php', {
                            act: 'get_profile_uid',
                            link: value
                        }, {
                            onDone: function(data) {
                                cur._leave = true;
                                var mid = data[0];
                                if (mid && mid !== vk.id) {
                                    WideDropdown.choose('view_as_dd', false, data);
                                }
                            }
                        });
                    }
                });
                show(notNode);
            } else {
                cur.wdd = Object.assign(cur.wdd || {}, {
                    view_as_dd: window.viewAsDD
                });

            }
        },
        leaveAsMode: function(el, event) {
            cur._leave = true;
            return nav.go(el, event);
        }
    },
    profile = Profile;

try {
    stManager.done('profile.js');
} catch (e) {}