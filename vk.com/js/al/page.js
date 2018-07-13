var Page = {
        /**
         * e.g. {
         *   '-1231_132': true,
         *   '-4552_22': false
         * }
         */
        _isAdPost: {},
        _postsClearTimeoutsCalls: 0,

        // mainly used in image paste from clipboard (see Emoji)
        initUploadForImagePaste: function(txtEl, addMedia, blob) {
            stManager.add(['upload.js'], function() {
                addMedia.menu && addMedia.menu.activate();

                var uploadEl;

                domInsertBefore(uploadEl = ce('div', {
                    className: 'post_upload_wrap fl_r',
                    innerHTML: '<div id="page_field_upload" class="post_upload"></div>'
                }), txtEl);

                // get upload params from already existed data on page
                var uploadData = cur.wallUploadOpts;

                if (addMedia.clipboardImageUploadIndex !== undefined) {
                    Upload.onFileApiSend(addMedia.clipboardImageUploadIndex, [blob]);

                } else {
                    var composer = txtEl && data(txtEl, 'composer');
                    var composerOpts = composer && composer.options && composer.options.media && composer.options.media.options || {};
                    var limit = composerOpts && composerOpts.limit || 2;
                    addMedia.clipboardImageUploadIndex = Upload.init(domFC(uploadEl), uploadData.url, uploadData.params, {
                        file_name: 'photo',
                        file_size_limit: 1024 * 1024 * 25, // 25Mb
                        file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
                        file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
                        file_input: null,
                        accept: 'image/jpeg,image/png',
                        file_match: uploadData.opts.ext_re,
                        lang: uploadData.opts.lang,
                        wiki_editor: 0,

                        onUploadStart: function(info, res) {
                            var i = info.ind !== undefined ? info.ind : info,
                                options = Upload.options[i];
                            if (Upload.types[i] == 'form') {
                                geByClass1('file', ge('choose_photo_upload')).disabled = true;
                            }
                            if (Upload.types[i] == 'fileApi') {
                                if (cur.notStarted) {
                                    if (!cur.preventBoxHide) {
                                        boxQueue.hideLast();
                                    }
                                    delete cur.notStarted;
                                }
                                if (options.multi_progress) this.onUploadProgress(info, 0, 0);
                            }
                        },
                        onUploadComplete: function(info, res) {
                            var params, i = info.ind !== undefined ? info.ind : info,
                                fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');

                            try {
                                params = eval('(' + res + ')');
                            } catch (e) {
                                params = q2ajx(res);
                            }
                            if (!params.photos) {
                                Upload.onUploadError(info);
                                return;
                            }

                            ajax.post('al_photos.php', extend({
                                act: 'choose_uploaded'
                            }, params), {
                                onDone: function(media, data) {
                                    data.uploadNum = i;
                                    addMedia.chooseMedia('photo', media, extend(data, {
                                        upload_ind: i + '_' + fileName
                                    }));
                                },
                                onFail: function() {},
                                progress: (Upload.types[i] == 'form') ? box.progress : null
                            });
                        },
                        onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                            var i = info.ind !== undefined ? info.ind : info;
                            if (Upload.types[i] == 'fileApi') {
                                var lnkId = (cur.attachMediaIndexes || {})[i];
                                if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
                                    var loadData = {
                                        loaded: bytesLoaded,
                                        total: bytesTotal
                                    };
                                    if (info.fileName) loadData.fileName = info.fileName.replace(/[&<>"']/g, '');
                                    addMedia.showMediaProgress('photo', i, loadData);
                                }
                            }
                        },
                        onUploadError: WallUpload.uploadFailed,
                        onCheckServerFailed: function() {
                            delete cur.uploadInited;
                            WallUpload.hide();
                        },
                        onUploadCompleteAll: function(i) {
                            if (Upload.types[i] == 'form') {
                                Upload.embed(i);
                            }
                        },
                        onCheckComplete: function(ind) {
                            Upload.types[ind] = 'fileApi';
                            Upload.onFileApiSend(ind, [blob]);
                        },
                        customShowProgress: function() {},

                        noFlash: 1,
                        multiple: 1,
                        multi_progress: 1,
                        max_files: limit,
                        chooseBox: 1,
                        clear: 1,
                        type: 'photo',
                        max_attempts: 3,
                        server: uploadData.opts.server,
                        error: uploadData.opts.default_error,
                        error_hash: uploadData.opts.error_hash
                    });
                }
            });

        },

        buildMediaLinkEl: function(url, noIcon) {
            return '<div class="page_media_link_url ' + (noIcon ? 'page_market_owner_link' : '') + '">' + (noIcon ? '' : '<div class="page_media_link_icon"></div>') + '<div class="page_media_link_text">' + url + '</div></div>';
        },
        showManyPhoto: function(el, photoId, listId, opts) {
            var m = allPhotos = [];
            each(domPN(el).childNodes, function(k, v) {
                var cl = v && v.getAttribute && v.getAttribute('onclick'),
                    m = cl.match(/'(-?\d+_\d+)'\s*,\s*'([a-f0-9]{18})'/i);
                if (m) {
                    allPhotos.push(m[1] + '/' + m[2]);
                }
            });
            opts.additional = {
                draft_photos: allPhotos.join(';')
            };
            return showPhoto(photoId, listId, extend(opts, {
                queue: 1
            }));
        },
        inviteToGroup: function(el, gid, mid, invited, hash) {
            var actions = domPN(el),
                row = domPN(domPN(el))
            var setInvited = function(invited) {
                var newInv = invited ? 1 : 0,
                    label = invited ? getLang('friends_cancel_event_invite') : getLang('friends_send_event_invite');
                actions.innerHTML = '<a onclick="return page.inviteToGroup(this, ' + gid + ', ' + mid + ', ' + newInv + ', \'' + hash + '\')">' + label + '</a>';
            }
            if (invited) {
                ajax.post('/al_page.php', {
                    act: 'a_cancel_invite',
                    mid: mid,
                    gid: gid,
                    hash: hash
                });
                setInvited(0);
            } else {
                ajax.post('/al_page.php', {
                    act: 'a_invite',
                    mid: mid,
                    gid: gid,
                    hash: hash
                }, {
                    onDone: function(res, message) {
                        if (!res) {
                            setInvited(0);
                            hide(actions);
                            var error = geByClass1('error', row),
                                newErr = se('<div class="page_members_box_error msg"><div class="msg_text">' + message + '</div></div>');
                            if (!error) {
                                row.insertBefore(newErr, row.firstChild);
                            } else {
                                row.replaceChild(newErr, error);
                            }
                        }
                    }
                });
                setInvited(1);
            }
            return false;
        },
        moneyTransferBox: function(ev, from) {
            showBox('al_payments.php', {
                act: 'money_transfer_box',
                to_id: cur.oid,
                from: from
            }, {
                onFail: function(text) {
                    setTimeout(showFastBox(getLang('global_error'), text).hide, 2000);
                    return true;
                }
            });
            cancelEvent(ev);
        },
        toggleSubscription: function(btn, hash, ev, oid, source, onDone) {
            var act = parseInt(domData(btn, 'act')) ? 1 : 0;

            ajax.post('al_wall.php', {
                act: 'a_toggle_posts_subscription',
                subscribe: act ? 1 : 0,
                oid: oid ? oid : cur.oid,
                hash: hash,
                source: source
            }, {
                onDone: function(text) {
                    if (onDone) {
                        onDone(text, act ? 0 : 1);
                    } else {
                        val(btn, text);
                        btn.setAttribute('data-act', act ? 0 : 1);
                    }
                },
                showProgress: Page.actionsDropdownLock.pbind(btn),
                hideProgress: Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        toggleLiveSubscription: function(btn, hash, act, ev) {
            if (cur.toggleLiveSubscriptionAct != undefined) {
                act = cur.toggleLiveSubscriptionAct;
            }
            ajax.post('al_video.php?act=a_subscribe_live', {
                subscribe: act ? 1 : 0,
                owner_id: cur.oid,
                hash: hash
            }, {
                onDone: function(text) {
                    val(btn, text);
                    cur.toggleLiveSubscriptionAct = !act;
                },
                showProgress: Page.actionsDropdownLock.pbind(btn),
                hideProgress: Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        showMessagesFromCommunityTooltip: function(btn, baseState, text) {
            if (cur.toggleMessagesFromCommunityAct == undefined && baseState == 0) {
                showTooltip(btn, {
                    text: text,
                    dir: 'auto'
                });
            }
        },
        toggleMessagesFromCommunity: function(btn, hash, act, ev) {
            if (cur.toggleMessagesFromCommunityAct != undefined) {
                act = cur.toggleMessagesFromCommunityAct;
            }
            ajax.post('al_groups.php', {
                act: 'a_toggle_messages_from_community',
                allow: act ? 1 : 0,
                oid: cur.oid,
                hash: hash
            }, {
                onDone: function(text) {
                    val(btn, text);
                    cur.toggleMessagesFromCommunityAct = !act;
                },
                showProgress: Page.actionsDropdownLock.pbind(btn),
                hideProgress: Page.actionsDropdownUnlock.pbind(btn)
            });
            cancelEvent(ev);
        },
        showPageMembers: function(ev, oid, tab) {
            if (cur.viewAsBox) {
                cur.viewAsBox();
                return cancelEvent(ev);
            }
            return !showTabbedBox('al_page.php', {
                act: 'box',
                oid: oid,
                tab: tab
            }, {
                cache: 1
            }, ev);
        },
        showPageVideos: function(ev, oid) {
            if (cur.viewAsBox) {
                cur.viewAsBox();
                return cancelEvent(ev);
            }
            return !showBox('al_video.php', {
                act: 'a_choose_video_box',
                review: 1,
                to_id: oid
            }, {
                cache: 1,
                grey: 1
            });
        },
        showPageAudios: function(ev, oid) {
            if (cur.viewAsBox) {
                cur.viewAsBox();
                return cancelEvent(ev);
            }
            return !showBox('/al_audio.php', {
                act: 'audios_box',
                oid: oid
            }, {
                cache: 1,
                params: {
                    width: 638
                }
            }, ev);
        },
        ownerPhotoFast: function() {
            var inp = ge('owner_photo_bubble_input');
            if (!inp) inp = ge('owner_photo_wrap').appendChild(ce('input', {
                type: 'file',
                id: 'owner_photo_bubble_input',
                onchange: function() {
                    data(this, 'changed', true);
                    showBox('al_page.php', {
                        act: 'owner_photo_box',
                        oid: cur.oid
                    }).inp = this;
                }
            }));
            inp.click();
        },
        ownerPhoto: function(oid, opts) {
            if (!opts) {
                opts = {};
            }
            showBox('al_page.php', {
                act: 'owner_photo_box',
                oid: oid || cur.oid,
                gid: opts.gid
            }, {
                stat: ['owner_photo.css', 'owner_photo.js']
            });
        },
        ownerCrop: function(oid) {
            showBox('al_page.php', {
                act: 'owner_photo_crop',
                oid: oid || cur.oid
            }, {
                stat: ['owner_photo.css', 'owner_photo.js']
            });
        },
        ownerPhotoEffects: function(photo_raw, owner_id) {
            var listId = 'album' + owner_id + '_0/rev';
            if (cur.pvData && (!cur.pvShown || cur.pvListId != listId)) {
                delete cur.pvData[listId];
            }
            showPhoto(photo_raw, listId, {
                additional: {
                    open_pe: 1,
                    pe_no_copy: 1
                },
                loader: 1,
                onHide: function() {
                    if (cur.pvEditorSaved) {
                        nav.reload();
                    }
                }
            });
        },
        uploadOwnerCover: function(oid) {
            return !showBox('al_page.php', {
                act: 'owner_photo_box',
                oid: oid || cur.oid,
                cover: 1
            }, {
                stat: ['owner_photo.css', 'owner_photo.js']
            });
        },
        editOwnerCover: function(oid) {
            showBox('al_page.php', {
                act: 'owner_cover_crop',
                oid: oid || cur.oid
            }, {
                stat: ['owner_photo.css', 'owner_photo.js']
            });
        },
        deleteOwnerCover: function(oid, hash) {
            showFastBox({
                title: getLang('groups_delete_cover_title')
            }, getLang('groups_delete_cover_confirm'), getLang('global_delete'), function(btn) {
                ajax.post('al_page.php', {
                    act: 'owner_cover_remove',
                    oid: oid,
                    hash: hash,
                    from: cur.module
                }, {
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn),
                    onDone: cur.shareSetOwnPhoto
                });
            }, getLang('global_cancel'));
        },
        editPhoto: function(newph) {
            cur.hideOther();
            showBox('al_page.php', extend(newph || {}, {
                act: 'a_edit_photo'
            }), {
                params: {
                    bodyStyle: 'padding: 16px 7px'
                },
                stat: ['tagger.js', 'tagger.css']
            });
        },
        deletePhoto: function(oid, hash) {
            cur.hideOther();
            var box = showFastBox({
                title: getLang('global_warning')
            }, getLang('sure_delete_photo'), getLang('global_delete'), function() {
                ajax.post('al_page.php', {
                    act: 'a_delete_photo',
                    hash: hash,
                    oid: oid
                }, {
                    showProgress: box.showProgress,
                    hideProgress: box.hideProgress
                });
            }, getLang('global_cancel'));
        },
        shareCurrent: function() {
            var curAudio = geByClass1('current_audio', ge('page_current_info'));
            if (!curAudio) nav.reload(); // :(

            curAudio = curAudio.getAttribute('data-audio');
            if (!curAudio) nav.reload(); // :(

            curAudio = curAudio.split('_');
            if (curAudio.length < 3 || curAudio[2].substr(0, 1) != 's') nav.reload(); // :(

            return !showBox('like.php', {
                act: 'publish_box',
                object: 'audio' + curAudio[0] + '_' + curAudio[1],
                list: curAudio[2] + ((curAudio[3] && curAudio[3].charAt(0) == 'h') ? '_' + curAudio[3] : '')
            }, {
                stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css', 'sharebox.js']
            });
        },

        playCurrent: function(el, liveInfo) {
            var parent = el.parentNode;

            return Page.playLive(liveInfo, {
                showProgress: function() {
                    showProgress(parent);
                },
                hideProgress: function() {
                    hideProgress(parent);
                }
            });
        },

        playLive: function(liveInfo, ajaxOpts) {
            getAudioPlayer().playLive(liveInfo, ajaxOpts);
        },

        audioStatusUpdate: function(hash) {
            var exp = isChecked('currinfo_audio');
            var ap = getAudioPlayer();

            var currAudio = AudioUtils.asObject(ap.getCurrentAudio());
            if (currAudio && !ap.isPlaying()) {
                currAudio = '';
            }

            var currPlaylist = currAudio ? ap.getCurrentPlaylist() : false;

            ajax.post('al_audio.php', {
                act: 'toggle_status',
                hash: hash,
                exp: exp,
                id: (currAudio ? currAudio.fullId : ''),
                oid: vk.id
            }, {
                onDone: function(text, expStatus) {
                    if (vk.id != cur.oid || !text) return;
                    val('current_info', text);

                    ap.setStatusExportInfo(expStatus);
                }
            });
        },

        audioListenersOver: function(el, oid) {
            showTooltip(el, {
                url: 'al_audio.php',
                params: {
                    act: 'listeners_tt',
                    'oid': oid
                },
                slide: 15,
                shift: [24, 10, 10],
                ajaxdt: 100,
                showdt: 400,
                hidedt: 200,
                asrtl: 1,
                dir: 'auto',
                typeClass: 'audio_tt',
                appendParentCls: 'scroll_fix_wrap'
            });
        },
        showAudioListeners: function(oid, ev) {
            function onBoxScroll() {
                var moreLink = ge('listeners_more_link');
                var moreLinkTrigger = ge('listeners_more_link_trigger');
                if (isVisible(moreLinkTrigger) && boxLayerWrap.scrollHeight - 500 < (boxLayerWrap.scrollTop + boxLayerWrap.offsetHeight)) {
                    hide(moreLinkTrigger);
                    moreLink.click();
                }
            }

            ev.cancelBubble = true;

            cur.audioListenersOnDone = {
                onHide: function() {
                    removeEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
                },
                onDone: function(box, needMore) {
                    window.audioListenersOffset = 0;

                    if (!needMore) {
                        re('listeners_more_link');
                        re('listeners_more_link_trigger');
                    } else {
                        addEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
                    }
                }
            };

            return !showBox('/al_audio.php', {
                act: 'listeners_box',
                oid: oid
            }, extend(cur.audioListenersOnDone, {
                cache: 1
            }));
        },
        moreAudioListeners: function(oid) {
            window.audioListenersOffset += 50;
            var content = geByClass1('fans_rows'),
                moreBtn = ge('listeners_more_link');

            ajax.post("/al_audio.php", {
                act: 'listeners_box',
                oid: oid,
                offset: window.audioListenersOffset
            }, {
                onDone: function(rows, needMore) {

                    var newRows = ce('div', {
                        innerHTML: rows
                    });

                    for (var e = domFC(newRows); e; e = domFC(newRows)) {
                        content.appendChild(e);
                    }

                    if (!needMore) {
                        re(moreBtn);
                        re('listeners_more_link_trigger');
                    } else {
                        var moreLink = ge('listeners_more_link_trigger');
                        show(moreLink);
                    }
                },
                showProgress: lockButton.pbind(moreBtn),
                hideProgress: unlockButton.pbind(moreBtn)
            });
        },
        postsUnseen: function(posts) {
            if (!window._postsExtras) {
                _postsExtras = {};
            }
            var now = vkNow();
            var ch = false;
            for (i in posts) {
                for (j in posts[i]) {
                    if (j == 'module' || j == 'index' || j == 'q' || j == 'block') continue;
                    var pdict = _postsExtras[j];
                    if (pdict && pdict.diff == -1) {
                        pdict.diff = now - pdict.start;
                        ch = true;
                    }
                }
            }
            if (ch) {
                Page.postsClearTimeouts();
            }
        },
        postsSeen: function(posts) {
            var i, j, ch, p, se, sa, module, index, block, query;
            if (!vk.id || !posts.length || vk.pd) return;

            if (!window._postsSeenModules) _postsSeenModules = {};
            if (!window._postsExtras) {
                _postsExtras = {};
            }
            var now = vkNow();
            var isAdPost = Page._isAdPost;
            var postElem;

            for (i in posts) {
                module = Page.getPostModuleCode(posts[i].module ? posts[i].module : '');

                index = posts[i].index;
                query = posts[i].q;
                block = posts[i].block;
                if (posts[i].hash && !window._postsViewHash) {
                    window._postsViewHash = posts[i].hash;
                }
                for (j in posts[i]) {
                    if (j == 'module' || j == 'index' || j == 'q' || j == 'hash' || j == 'block') continue;

                    _postsSeenModules[j] = module;
                    p = posts[i][j];

                    if (!(j in isAdPost)) {
                        postElem = ge('post' + j);
                        // TODO: there are rare situations in which `Page._isAdPost` will be calculated wrong.
                        // For example:
                        // 1) Visit ad post page (e.g. `vk.com/wall-18098621_178771`)
                        // 2) There is no `data-ad-view` for such post
                        // 3) `isAdPost` will keep `false` for this post
                        // 4) Then, if user sees this post in his newsfeed, no post data for this post will be sent (only ad data)
                        isAdPost[j] = !!(postElem && attr(postElem, 'data-ad-view'));
                    }

                    if (!isAdPost[j]) {
                        se = _postsSeen[j];
                        sa = _postsSaved[j];

                        if (sa == -1 || se == -1 || p == 1 && (sa || se)) {
                            continue;
                        }
                    }

                    ch = _postsSeen[j] = p;
                    _postsExtras[j] = {
                        start: now,
                        diff: -1,
                        index: index,
                        q: query,
                        block: block,
                        session_id: cur.feed_session_id ? cur.feed_session_id : 'na'
                    };
                    Wall.triggerAdPostStat(j, 'impression');
                }
            }
            if (ch) {
                Page.postsClearTimeouts();
            }
        },
        postsClearTimeouts: function() {
            clearTimeout(_postsSaveTimer);
            clearTimeout(_postsSendTimer);

            if (++Page._postsClearTimeoutsCalls < 10) {
                _postsSaveTimer = setTimeout(Page.postsSave, 2500);
                _postsSendTimer = setTimeout(Page.postsSend, 5000);
            } else {
                Page._postsClearTimeoutsCalls = 0;
                Page.postsSave();
                Page.postsSend();
            }
        },
        postsSave: function() {
            if (!ls.checkVersion() || isEmpty(_postsSeen)) return _postsSeen;

            var sent = ls.get('posts_sent') || {};
            var seen = ls.get('posts_seen') || {};
            var modules = ls.get('posts_seen_modules') || {};
            var extras = ls.get('posts_extras') || {};
            var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
            var isAdPost = Page._isAdPost;
            var ch, i, p, snt, sn;
            if (!window._postsExtras) {
                _postsExtras = {};
            }
            for (i in _postsSeen) {
                sn = _postsSeen[i];
                if (_postsExtras[i]) {
                    extras[i] = {
                        diff: _postsExtras[i].diff,
                        index: _postsExtras[i].index,
                        q: _postsExtras[i].q,
                        session_id: _postsExtras[i].session_id ? _postsExtras[i].session_id : 'na',
                        block: _postsExtras[i].block
                    };
                    delete _postsExtras[i];
                }
                p = i.split('_');
                if (p[0] !== 'ad' && p[0] !== 'posthashtag' && p[0] !== 'block') {
                    p[0] = intval(p[0]);
                    if (!p[1] || p[1].substr(0, 1) != 'p') {
                        p[1] = intval(p[1]);
                    }
                }
                snt = (sent[p[0]] || {})[p[1]];
                if (p[0] != vk.id && (isAdPost[i] || (!snt || sn == -1 && snt > 0))) {
                    if (!seen[p[0]]) {
                        seen[p[0]] = {};
                        delete modules[i];
                    }
                    if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
                        ch = seen[p[0]][p[1]] = t * sn;
                        modules[i] = _postsSeenModules[i];
                    }
                }
                _postsSaved[i] = sn;
            }
            _postsSeen = {};
            _postsSeenModules = {};
            if (ch) {
                ls.set('posts_seen', seen);
                ls.set('posts_seen_modules', modules);
                ls.set('posts_extras', extras);
            }
        },
        getPostModuleCode: function(module) {
            switch (module) {
                case 'feed':
                    return 'f';
                case 'public':
                    return 'c';
                case 'groups':
                    return 'c';
                case 'profile':
                    return 'p';
                case 'wall':
                    return 'w';
                case 'wall_top':
                    return 'tw';
                case 'feed_search':
                    return 's';
                case 'feed_news_recent':
                    return 'rf';
                case 'feed_news':
                    return 'rf';
                case 'feed_news_top':
                    return 'tf';
                case 'feed_recommended':
                    return 'd';
                case 'feed_recommended_recent':
                    return 'd';
                case 'feed_recommended_top':
                    return 'e';
                case 'feed_other':
                    return 'o';
                case 'feed_friends':
                    return 'rr';
                case 'feed_friends_recent':
                    return 'rr';
                case 'feed_friends_top':
                    return 'tr';
                case 'feed_groups':
                    return 'rg';
                case 'feed_groups_recent':
                    return 'rg';
                case 'feed_groups_top':
                    return 'tg';
                case 'feed_videos':
                    return 'rv';
                case 'feed_videos_recent':
                    return 'rv';
                case 'feed_videos_top':
                    return 'tv';
                case 'feed_photos':
                    return 'rp';
                case 'feed_photos_recent':
                    return 'rp';
                case 'feed_photos_top':
                    return 'tp';
                case 'feed_list_recent':
                    return 'rl';
                case 'feed_list_top':
                    return 'tl';
                case 'groups_ads_promoted_post':
                    return 'ag';
                case 'public_ads_promoted_post':
                    return 'ap';
                default:
                    return 'u';
            }
        },
        postsSend: function() {
            var seen = {};
            var modules = {};
            var extras = {};
            var data = [];
            var i, j, r, m;
            if (ls.checkVersion()) {
                seen = ls.get('posts_seen');
                modules = ls.get('posts_seen_modules') || {};
                extras = ls.get('posts_extras') || {};
            } else {
                r = Page.postsSave();
                for (i in r) {
                    sn = r[i];
                    p = i.split('_');
                    if (p[0] !== 'ad' && p[0] !== 'posthashtag') {
                        p[0] = intval(p[0]);
                        if (p[1].substr(0, 1) != 'p') {
                            p[1] = intval(p[1]);
                        }
                    }
                    if (!seen[p[0]]) {
                        seen[p[0]] = {};
                    }
                    if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
                        seen[p[0]][p[1]] = sn;
                    }
                }
            }
            for (i in seen) {
                r = [];
                for (j in seen[i]) {
                    var full_id = i + '_' + j;
                    m = modules[full_id] || '';
                    var extra = extras[full_id];
                    var query_str = (m == 's' && extra && extra.q) ? extra.q : '';
                    query_str = query_str.replace(/[,;:]/g, '');
                    var session_id_str = extra && extra.session_id ? extra.session_id : 'na';
                    var extra_str = (extra && i != 'ad' && i != 'posthashtag') ? (':' + extra.diff + ':' + extra.index + ':' + session_id_str + ':' + (query_str || '') + ':' + (extra.block || '')).replace(/:+$/, '') : '';

                    r.push(m + ((seen[i][j] > 0) ? j : -j) + extra_str);
                }
                if (r.length) {
                    data.push(i + '_' + r.join(','));
                }
            }
            if (!data.length) return;
            if (!vk.id) return Page.postsClear();

            var query_data = {
                act: 'seen',
                data: data.join(';')
            };
            if (window._postsViewHash) {
                query_data['hash'] = window._postsViewHash;
            }
            ajax.post('al_page.php', query_data, {
                onDone: function() {
                    if (!ls.checkVersion()) {
                        return extend(_postsSaved, _postsSeen);
                    }
                    var cseen = ls.get('posts_seen') || {},
                        sent = ls.get('posts_sent') || {},
                        smodules = ls.get('posts_seen_modules'),
                        i, j;
                    for (i in seen) {
                        for (j in seen[i]) {
                            if (!sent[i]) {
                                sent[i] = {};
                            }
                            if (sent[i][j] != -1) {
                                sent[i][j] = seen[i][j];
                            }
                            if ((cseen[i] || {})[j]) {
                                delete(cseen[i][j]);
                                delete smodules[i + '_' + j];
                            }
                        }
                        if (cseen[i] && isEmpty(cseen[i])) {
                            delete(cseen[i]);
                            delete smodules[i + '_' + j];
                        }
                    }
                    ls.set('posts_seen', cseen);
                    ls.set('posts_sent', sent);
                    ls.set('posts_seen_modules', smodules);

                    clearTimeout(_postsCleanTimer);
                    _postsCleanTimer = setTimeout(Page.postsClean, 10000);
                }
            });
        },
        postsClean: function() {
            if (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle) {
                debugLog('waiting ls clean..');
                clearTimeout(_postsCleanTimer);
                _postsCleanTimer = setTimeout(Page.postsClean, 10000);
                return;
            }

            debugLog('cleaning ls..');
            var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
            var sent = ls.get('posts_sent') || {},
                i, j, k, ch = 0;
            for (i in sent) {
                for (j in sent[i]) {
                    k = sent[i][j];
                    if (t - ((k > 0) ? k : -k) > 24) {
                        delete(sent[i][j]);
                        ch = 1;
                    }
                }
                if (isEmpty(sent[i])) {
                    delete(sent[i]);
                    ch = 1;
                }
            }
            ls.set('posts_sent', sent);

            Wall.cleanAdsEvents();
        },
        postsClear: function() {
            ls.set('posts_seen', {});
            ls.set('posts_extras', {});
            ls.set('posts_sent', _postsSaved = _postsSeen = _postsSeenModules = _postsExtras = {});
            ls.set(Wall.LS_ADS_EVENTS, Wall._lsAdsEvents = {});
        },
        showContacts: function(oid, edit, callback) {
            var b = showBox('/al_page.php', {
                act: 'a_get_contacts',
                oid: oid,
                edit: edit
            });
            b.setOptions({
                onHideAttempt: function() {
                    if (cur.reloadAfterClose) {
                        if (callback) {
                            callback();
                        } else {
                            nav.reload({
                                noscroll: true
                            });
                            cur.reloadAfterClose = false;
                        }
                    }
                    return true;
                }
            });
        },
        showContactTT: function(el, text) {
            showTooltip(el, {
                text: function() {
                    return text;
                },
                slideX: 15,
                className: 'pedit_tt',
                hasover: 1,
                shift: [-getSize(el)[0] - 10, -15, -15],
                dir: 'left',
                appendParentCls: 'scroll_fix_wrap',
                onCreate: function() {
                    if (el.tt) {
                        setTimeout(el.tt.hide, 3000);
                    }
                }
            });
        },
        editContact: function(oid, mid, hash, callback) {
            var b = showBox('al_page.php', {
                act: 'a_edit_contact_box',
                mid: mid,
                oid: oid
            }).setButtons(getLang('global_save'), function(btn) {
                cur.reloadAfterClose = true;

                function onSearch() {
                    var params = {
                        act: 'a_add_contact',
                        mid: mid,
                        oid: oid
                    };
                    params.hash = hash;
                    if (!hash) params.hash = ge('group_contact_hash').value;
                    params.title = val('group_contact_position');
                    params.phone = val('group_contact_phone');
                    params.email = val('group_contact_email');
                    if (!mid && ge('group_contact_memlink')) {
                        params.page = val('group_contact_memlink');
                        if (!params.page && !params.phone && !params.email) {
                            b.hide();
                            return;
                        }
                    }
                    ajax.post('al_page.php', params, {
                        onDone: function(res, script) {
                            b.hide();
                            var box = curBox();
                            if (box) {
                                box.content(res);
                                if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
                                    ge('public_contacts_list').sorter.destroy();
                                }
                                if (script) {
                                    eval(script);
                                }
                                toggle('group_add_contact', ge('public_contacts_list').childNodes.length < 30);
                            } else {
                                page.showContacts(oid, 1, callback);
                            }
                        },
                        onFail: function(error) {
                            if (ge('group_contact_error')) {
                                ge('group_contact_error').innerHTML = error;
                                show('group_contact_error_wrap');
                                return true;
                            }
                        },
                        showProgress: lockButton.pbind(btn),
                        hideProgress: unlockButton.pbind(btn)
                    });
                }
                if (!mid && cur.lastContact != val('group_contact_memlink')) {
                    page.searchContact(oid, val('group_contact_memlink'), onSearch);
                } else {
                    onSearch();
                }
            }, getLang('global_cancel'));
            return false;
        },
        searchContact: function(oid, page, onSearch) {
            if (!trim(page)) {
                cur.lastContact = '';
                if (onSearch) onSearch();
                return;
            }
            if (page == cur.lastContact) return;
            ajax.post('al_page.php', {
                act: 'a_search_contact',
                oid: oid,
                page: page
            }, {
                onDone: function(uid, img, name, hash) {
                    cur.lastContact = page;
                    ge('group_contact_name').innerHTML = name;
                    ge('group_contact_image').innerHTML = img;
                    ge('group_contact_hash').value = hash;
                    if (!uid) {
                        notaBene('group_contact_memlink', '', true);
                        hide('group_contact_error_wrap');
                    } else {
                        if (onSearch) {
                            onSearch();
                        } else {
                            hide('group_contact_error_wrap');
                        }
                    }
                }
            });
        },
        deleteContact: function(oid, mid, hash) {
            cur.reloadAfterClose = true;
            ajax.post('al_page.php', {
                act: 'a_delete_contact',
                oid: oid,
                mid: mid,
                hash: hash
            }, {
                onDone: function(res, script) {
                    var box = curBox();
                    box.content(res);
                    if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
                        ge('public_contacts_list').sorter.destroy();
                    }
                    if (script) {
                        eval(script);
                    }
                    toggle('group_add_contact', ge('public_contacts_list').childNodes.length < 30);
                }
            });
            return false;
        },
        reorderContacts: function(oid, hash, user, before, after) {
            var mid = user.id.replace('group_contact_cell', '');
            var before_id = (before && before.id || '').replace('group_contact_cell', '');
            var after_id = (after && after.id || '').replace('group_contact_cell', '');
            cur.reloadAfterClose = true;
            ajax.post('/al_page.php', {
                act: 'a_reorder_contacts',
                oid: oid,
                mid: mid,
                before: before_id,
                after: after_id,
                hash: hash
            });
        },

        initStatusEditable: function(txt) {
            if (txt.emojiInited) {
                return false;
            }
            txt.emojiInited = true;
            stManager.add(['emoji.js', 'notifier.css'], function() {
                var optId = Emoji.init(txt, {
                    ttDiff: -48,
                    rPointer: true,
                    controlsCont: domPN(txt),
                    noStickers: true,
                    forceEnterSend: true,
                    ref: 'status',
                    onSend: Page.infoSave,
                    checkEditable: function() {
                        var msg = Emoji.editableVal(txt),
                            maxLen = 140;
                        if (msg.length > maxLen) {
                            Emoji.val(txt, clean(msg.substr(0, maxLen)));
                            Emoji.editableFocus(txt, false, true);
                        }
                    }
                });
            });
        },
        infoEdit: function(audio) {
            if (cur.viewAsBox) return cur.viewAsBox();

            var tt = ge('current_info').tt;
            if (tt && tt.hide) {
                tt.hide({
                    fasthide: true
                });
            }
            show('currinfo_editor', 'currinfo_fake');
            hide('currinfo_wrap');
            if (isVisible('currinfo_app') && !cur.ciApp) {
                show('currinfo_audio');
                hide('currinfo_app');
            } else if (cur.ciApp) {
                hide('currinfo_audio');
                show('currinfo_app');
            }
            var info = ge('current_info').firstChild,
                input = ge('currinfo_input'),
                link = geByTag1('a', info);
            Page.initStatusEditable(input, cur.infoOld);
            cur.infoEditing = (info.className == 'my_current_info');
            if (cur.infoEditing) {
                var infoHtml = link ? link.innerHTML : info.innerHTML;
                infoHtml = infoHtml.replace(/<img[^>]+alt="([^"]+)"[^>]*>/g, '$1');
                cur.infoOld = trim(clean(stripHTML(infoHtml)));
            } else {
                cur.infoOld = '';
            }
            if (window.Emoji) {
                Emoji.val(input, winToUtf(cur.infoOld));
                Emoji.editableFocus(input, false, true, true);
            } else {
                val(input, winToUtf(cur.infoOld));
                elfocus(input);
            }
            addEvent(window, 'keydown', Page.infoKeydown);
            addEvent(document, 'mousedown', Page.infoMousedown);
            ge('currinfo_save').onclick = Page.infoSave;

            return false;
        },
        infoCancel: function() {
            hide('currinfo_editor', 'currinfo_fake');
            show('currinfo_wrap');
            cleanElems('currinfo_save', 'currinfo_cancel');
            removeEvent(window, 'keydown', Page.infoKeydown);
            removeEvent(document, 'mousedown', Page.infoMousedown);
            cur.ciApp = false;
        },
        infoShowShare: function() {
            if (cur.viewAsBox) return cur.viewAsBox();

            var el = ge('current_info'),
                label = getLang('share_current_info');
            showTooltip(el, {
                content: '<div class="content"><div class="checkbox">' + label + '</div></div>',
                className: 'share_tt',
                init: function() {
                    addEvent(geByClass1('checkbox', el.tt.container), 'click', function() {
                        checkbox(this);
                        ajax.post('al_page.php', {
                            act: 'share_currinfo',
                            hash: cur.options.info_hash,
                            oid: cur.oid,
                            checked: isChecked(this)
                        }, {
                            onDone: Wall.receive
                        });
                    });
                },
                toup: false,
                showdt: 0,
                slide: 10,
                shift: [6, 8, 8],
                dir: 'auto',
                hidedt: 200,
                onClean: function() {
                    cleanElems(geByClass1('checkbox', el.tt.container));
                }
            });
        },
        infoKeydown: function(e) {
            if (e.keyCode == KEY.ESC) {
                Page.infoCancel();
            }
        },
        infoMousedown: function(e) {
            var t = e.target;
            while (t.parentNode) {
                if (t.id == 'currinfo_editor') {
                    return;
                }
                t = t.parentNode;
            }
            Page.infoCancel();
        },
        infoSave: function() {
            if (cur.viewAsBox) return cur.viewAsBox();

            var input = ge('currinfo_input'),
                txt = trim((window.Emoji ? Emoji.editableVal : val)(input)).replace(/\n/g, ' ');

            if (txt == cur.infoOld || txt == winToUtf(cur.infoOld)) {
                return Page.infoCancel();
            }
            txt = trim(txt).substr(0, 140);
            ajax.post('al_page.php', {
                act: 'current_info',
                oid: cur.oid,
                info: txt,
                hash: cur.options.info_hash
            }, {
                onDone: function() {
                    var c = txt ? 'my' : 'no',
                        t = txt ? ('<span class="current_text">' + Emoji.emojiToHTML(txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'), true) + '</span>') : getLang('change_current_info');
                    ge('current_info').innerHTML = ge('currinfo_fake').innerHTML = '<span class="' + c + '_current_info">' + t + '</span>';
                    Page.infoCancel();
                    var el = ge('current_info'),
                        tt = el.tt;
                    if (tt && tt.el) {
                        tt.destroy();
                        removeEvent(el, 'mouseover');
                    }
                    if (txt) {
                        addEvent(el, 'mouseover', Page.infoShowShare);
                        Page.infoShowShare();
                    }
                },
                onFail: function(t) {
                    if (!t) {
                        return true;
                    }
                },
                showProgress: lockButton.pbind('currinfo_save'),
                hideProgress: unlockButton.pbind('currinfo_save'),
                stat: ['tooltips.js', 'tooltips.css', 'emoji.js']
            });
        },
        showGif: function(obj, ev, dontHideActive, canPlayMp4) {
            if (ev && (ev.ctrlKey || ev.metaKey)) {
                return true;
            }

            if (isUndefined(canPlayMp4)) {
                checkMp4(function(canPlay) {
                    Page.showGif(obj, ev, dontHideActive, canPlay);
                });
                return;
            }

            cur.gifAdded = cur.gifAdded || {};
            if (cur.activeGif && domPN(domPN(cur.activeGif)) == domPN(domPN(obj)) || hasClass(domPN(cur.activeGif), 'page_gif_large') && !dontHideActive) {
                Page.hideGif(cur.activeGif, false);
            }

            var doc = obj.getAttribute('data-doc')
            var hash = obj.getAttribute('data-hash');
            var addTxt = obj.getAttribute('data-add-txt') || '';
            var addHash = obj.getAttribute('data-add-hash');
            var shareTxt = obj.getAttribute('data-share-txt') || '';
            var postRaw = obj.getAttribute('data-post');
            var replyRaw = obj.getAttribute('data-reply');
            var hasPreview = obj.getAttribute('data-preview');
            var previewWidth = obj.getAttribute('data-width');
            var previewHeight = obj.getAttribute('data-height');
            var largeGif = hasClass(domPN(obj), 'page_gif_large');
            var isAutoplay = !ev;
            var el;

            if (postRaw) {
                var oid, post_id, ids;
                ids = postRaw.split('_');
                oid = ids[0];
                post_id = ids[1];
                statlogsValueEvent('show_post_gif', 1, oid, post_id);
            }

            if (!hasPreview) {
                canPlayMp4 = false;
            }

            var el_src = obj.href + '&wnd=1&module=' + cur.module;

            if (canPlayMp4) {
                el = ce('video', {
                    autoplay: true,
                    muted: true,
                    loop: 'loop',
                    poster: obj.getAttribute('data-thumb'),
                    src: el_src + '&mp4=1',
                    className: 'pages_gif_img page_gif_big'
                }, {
                    width: previewWidth ? previewWidth + 'px' : null,
                    height: previewHeight ? previewHeight + 'px' : null,
                    background: largeGif ? 'transparent url(' + obj.getAttribute('data-thumb') + ') no-repeat 0 0' : '',
                    backgroundSize: 'cover'
                });
                attr(el, 'webkit-playsinline', '');
                if (browser.ipad) {
                    attr(el, 'controls', '');
                }
            } else {
                el = ce('img', {
                    src: el_src,
                    className: 'pages_gif_img'
                }, {
                    width: previewWidth ? previewWidth + 'px' : null,
                    height: previewHeight ? previewHeight + 'px' : null
                });
            }

            var acts = '<div class="page_gif_share" onmouseover="showTooltip(this, {text: \'' + shareTxt + '\', black: 1, shift: [7, 6, 6], toup: 0, needLeft: 1})" onclick="return Page.shareGif(this, \'' + doc + '\', \'' + hash + '\', event)"><div class="page_gif_share_icon"></div></div>';;
            if (addHash) {
                acts += '<div class="page_gif_add" onmouseover="return Page.overGifAdd(this, \'' + addTxt + '\', \'' + doc + '\', event);" onclick="return Page.addGif(this, \'' + doc + '\', \'' + hash + '\', \'' + addHash + '\', event);"><div class="page_gif_add_icon"></div></div>';
            }
            acts = '<div class="page_gif_actions">' + acts + '</div>';

            var progressIcon = '<div class="page_gif_progress_icon" style="display:none;">' + rs(vk.pr_tpl, {
                id: '',
                cls: ''
            }) + '</div>';

            var imgCont = ce('a', {
                href: obj.href,
                className: 'page_gif_preview' + (cur.gifAdded[doc] ? ' page_gif_added' : ''),
                innerHTML: progressIcon + (largeGif ? '<div class="page_gif_label">gif</div>' : '') + acts,
                onclick: cancelEvent
            }, {
                background: canPlayMp4 ? '' : (getStyle(domFC(obj), 'background') || '').replace(/"/g, '\''),
                width: previewWidth ? previewWidth + 'px' : '',
                height: previewHeight ? previewHeight + 'px' : ''
            });

            imgCont.appendChild(el);
            cur.activeGif = imgCont;
            domPN(obj).insertBefore(imgCont, obj);
            hide(obj);

            var isLoaded = false;

            var onLoaded = function() {
                if (getSize(el)[0] || getSize(el)[1]) {
                    clearInterval(loadingInterval);
                    el.onload = el.onloadeddata = null;
                    isLoaded = true;

                    // if (!cur.activeGif) return;
                    hide(domFC(imgCont));
                    imgCont.style.background = '';
                    imgCont.setAttribute('onclick', "return Page.hideGif(this, event);");
                    addClass(el, 'page_gif_big');
                    addClass(imgCont, 'page_gif_loaded');
                    statlogsValueEvent('gif_play', 0, canPlayMp4 ? 'mp4' : 'gif');
                }
            };

            if (ev) { // clicked by user
                show(domFC(imgCont));
            } else {
                setTimeout(function() {
                    if (!isLoaded) {
                        show(domFC(imgCont));
                    }
                }, 300);
            }

            if (canPlayMp4) {
                el.onloadeddata = onLoaded;
            } else {
                var loadingInterval = setInterval(onLoaded, 10);
                el.onload = onLoaded;
            }

            domPN(obj).setAttribute('data-playing', 1);

            var statsMode = isAutoplay ? 'autoplay' : 'manual';
            var statsModule = cur.module || 'other';
            var statsFrom = postRaw ? 'post' : (replyRaw ? 'reply' : '');
            statlogsValueEvent('gif_show', statsMode, statsModule, statsFrom);

            return cancelEvent(ev);
        },
        hideGif: function(obj, ev) {
            if (ev && (ev.ctrlKey || ev.metaKey)) {
                return true;
            }

            var wrap = domPN(obj);
            var thumb = domNS(obj);

            wrap.removeAttribute('data-playing');
            if (ev) {
                removeClass(wrap, 'page_gif_autoplay');
            }
            re(obj);
            show(thumb);
            delete cur.activeGif;
            return false;
        },
        overGifAdd: function(obj, txt, doc, ev) {
            cur.gifAdded = cur.gifAdded || {};
            if (cur.gifAdded[doc]) {
                txt = cur.gifAdded[doc].tooltip;
                if (!txt) return false;
            }

            showTooltip(obj, {
                text: txt,
                black: 1,
                shift: [7, 6, 6],
                toup: 0,
                needLeft: 1
            });
            return false;
        },
        addGif: function(obj, doc, hash, addHash, ev) {
            cur.gifAdded = cur.gifAdded || {};
            if (isObject(obj.tt)) obj.tt.hide();

            var wrap = gpeByClass('page_gif_large', obj) || domPN(obj);

            if (!cur.gifAdded[doc]) {
                addClass(obj, 'page_gif_adding');
                ajax.post('docs.php', {
                    act: 'a_add',
                    doc: doc,
                    hash: hash,
                    add_hash: addHash
                }, {
                    onDone: function(text, tooltip, docObj, hash) {
                        showDoneBox(text);
                        addClass(wrap, 'page_gif_added');
                        if (obj.tt && obj.tt.el) obj.tt.destroy();
                        cur.gifAdded[doc] = {
                            tooltip: tooltip,
                            did: docObj[0],
                            hash: hash
                        };
                    }
                });
            } else {
                ajax.post('docs.php', {
                    act: 'a_delete',
                    oid: vk.id,
                    did: cur.gifAdded[doc].did,
                    hash: cur.gifAdded[doc].hash
                }, {
                    onDone: function() {
                        removeClass(wrap, 'page_gif_added');
                        if (obj.tt && obj.tt.el) obj.tt.destroy();
                        delete cur.gifAdded[doc];
                    }
                });
            }
            return cancelEvent(ev);
        },

        shareGif: function(obj, doc, hash, ev) {
            if (isObject(obj.tt)) obj.tt.hide();
            showBox('like.php', {
                act: 'publish_box',
                object: 'doc' + doc,
                list: hash,
            }, {
                stat: ['wide_dd.js', 'wide_dd.css', 'sharebox.js']
            });

            return cancelEvent(ev);
        },

        initGifAutoplay: function(canPlayMp4) {
            if (cur.gifAutoplayScrollHandler || browser.mobile || canPlayMp4 === false) return;

            if (isUndefined(canPlayMp4)) {
                checkMp4(function(canPlay) {
                    Page.initGifAutoplay(canPlay);
                });
                return;
            }

            var fixedHeaderHeight = getSize('page_header')[1];

            var scrollHandler = debounce(function() {
                var autoplayGifs;
                autoplayGifs = geByClass('page_gif_autoplay');
                if (!autoplayGifs.length || window.wkcur && wkcur.shown) return;

                var viewportHeight = (window.innerHeight || document.documentElement.clientHeight) - fixedHeaderHeight;
                var viewportMiddle = fixedHeaderHeight + viewportHeight / 2;
                var activeSpace = Math.min(viewportHeight, 800);
                var activeTop = viewportMiddle - activeSpace / 2;
                var activeBottom = viewportMiddle + activeSpace / 2;

                var index = autoplayGifs.length - 1;
                var direction = -1;
                var candidateGif;
                var tmpGif;

                if (cur.activeGif) {
                    var rect = cur.activeGif.getBoundingClientRect();
                    var inViewport = rect.top > activeTop && rect.bottom < activeBottom;

                    if (inViewport) {
                        var inTheMiddle = rect.top < viewportMiddle && rect.bottom > viewportMiddle;
                        if (inTheMiddle) {
                            return;
                        }

                        var activeGifIndex = indexOf(autoplayGifs, domPN(cur.activeGif));
                        var distanceToMiddle = Math.min(Math.abs(viewportHeight / 2 - rect.top), Math.abs(viewportHeight / 2 - rect.bottom));

                        candidateGif = {
                            el: domPN(cur.activeGif),
                            distanceToMiddle: distanceToMiddle
                        };

                        if (activeGifIndex > -1) {
                            index = activeGifIndex;
                            direction = Math.abs(viewportHeight / 2 - rect.top) < Math.abs(viewportHeight / 2 - rect.bottom) ? -1 : 1;
                        }
                    } else if (inArray(domPN(cur.activeGif), autoplayGifs)) { // hide active if it is autoplayable gif
                        Page.hideGif(cur.activeGif);
                    }
                }

                while (tmpGif = autoplayGifs[index]) {
                    var rect = tmpGif.getBoundingClientRect();
                    var inViewport = rect.width && rect.height && rect.top > activeTop && rect.bottom < activeBottom;

                    if (inViewport && index == 0 && scrollGetY() < 300) {
                        candidateGif = {
                            el: tmpGif,
                            distanceToMiddle: distanceToMiddle
                        };
                        break;
                    }

                    if (inViewport) {
                        var distanceToMiddle = Math.min(Math.abs(viewportHeight / 2 - rect.top), Math.abs(viewportHeight / 2 - rect.bottom));
                        if (candidateGif && distanceToMiddle > candidateGif.distanceToMiddle) {
                            break;
                        } else {
                            candidateGif = {
                                el: tmpGif,
                                distanceToMiddle: distanceToMiddle
                            };
                        }
                    }

                    index += direction;
                }

                if (candidateGif && domFC(candidateGif.el) !== cur.activeGif) {
                    Page.showGif(domFC(candidateGif.el));

                    var nextGifIndex = indexOf(autoplayGifs, candidateGif.el) + 1;
                    var nextGif;
                    while (nextGif = autoplayGifs[nextGifIndex++]) {
                        var rect = nextGif.getBoundingClientRect();
                        if (rect.width && rect.height) { // if visible then preload
                            ce('video', {
                                src: domFC(nextGif).href + '&wnd=1&mp4=1',
                                preload: 'auto'
                            });
                            break;
                        }
                    }
                }
            }, 50);

            cur.gifAutoplayScrollHandler = scrollHandler;

            addEvent(window, 'scroll', scrollHandler);
            addEvent(window, 'resize', scrollHandler);

            scrollHandler();

            cur.destroy.push(function() {
                removeEvent(window, 'scroll', scrollHandler);
                removeEvent(window, 'resize', scrollHandler);
                scrollHandler = null;
                delete cur.gifAutoplayScrollHandler;
            });
        },

        initVideoAutoplay: function(canPlayMp4) {
            if (browser.mobile || canPlayMp4 === false || cur.videoAutoplayScrollHandler) {
                if (cur.module == 'feed') {
                    statlogsValueEvent('feed_init_video_autoplay', cur.videoAutoplayScrollHandler ? 'already_init' : 'bad_browser');
                }
                return;
            }

            if (isUndefined(canPlayMp4)) {
                checkMp4(function(canPlay) {
                    Page.initVideoAutoplay(canPlay);
                });
                return;
            }

            var isMessagePage = (cur.module == 'im');

            if (cur.module == 'feed') {
                statlogsValueEvent('feed_init_video_autoplay', 'good_browser');
            } else if (isMessagePage) {
                var chatWrapper = geByClass1('_im_chat_body_abs');
                var chatWrapperUiScroll = data(chatWrapper, 'ui-scroll');

                var chatHeader = geByClass1('im-page--chat-header'),
                    chatHeaderHeight = getSize(chatHeader)[1];
                var chatInputBox = geByClass1('im-chat-input');
                var chatHeaderBottom, chatInputBoxTop;

                var lastScroll = 0;
                var directionUp = true;
                var lastAutoPlayVideo = null;
            }

            var canPlayHls = window.MediaSource && MediaSource.isTypeSupported && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
            var noHlsMaxDuration = 5 * 60;
            var fixedHeaderHeight = getSize('page_header')[1];

            var scrollHandler = debounce(function(e, playInOrder) {
                if (layers.visible || window.mvcur && mvcur.mvShown || nav.objLoc.z || _getFullscreenElement()) return;

                var thumbs = geByClass('page_video_autoplayable');
                var thumbsNum = thumbs.length;
                if (!thumbsNum) return;

                if (playInOrder && cur.videoInlinePlayer && !cur.videoInlinePlayer.isAutoplay()) {
                    return;
                }

                var bodyHeight = document.body.scrollHeight - fixedHeaderHeight;
                var viewportHeight = (window.innerHeight || document.documentElement.clientHeight) - fixedHeaderHeight;
                var activeTop, activeBottom;
                var viewportMiddle = fixedHeaderHeight + viewportHeight / 2;
                var activeSpace = Math.min(viewportHeight, 800);

                if (isMessagePage) {
                    var currentScroll = cur.imClassicInterface ? bodyHeight - (viewportHeight + scrollGetY()) : chatWrapperUiScroll.api.data.scrollBottom;
                    directionUp = currentScroll >= lastScroll;
                    lastScroll = currentScroll;

                    if (playInOrder || (currentScroll && ((cur.imClassicInterface && directionUp) || (!cur.imClassicInterface && directionUp)))) {
                        thumbs = thumbs.reverse();
                    }

                    activeTop = viewportMiddle - activeSpace / 2;
                    activeBottom = currentScroll < 100 ? viewportHeight : activeTop + activeSpace;

                    if (cur.imClassicInterface) {
                        chatHeaderBottom = chatHeader.getBoundingClientRect().top + chatHeaderHeight;
                        chatInputBoxTop = chatInputBox.getBoundingClientRect().top;
                    } else {
                        chatHeaderBottom = getXY(chatHeader)[1] + chatHeaderHeight;
                        chatInputBoxTop = getXY(chatInputBox)[1];
                    }

                    if (activeTop < chatHeaderBottom) {
                        activeTop = chatHeaderBottom;
                    }
                    if (activeBottom > chatInputBoxTop) {
                        activeBottom = chatInputBoxTop;
                    }
                } else {
                    currentScroll = scrollGetY();
                    activeTop = currentScroll < 300 ? fixedHeaderHeight : (viewportMiddle - activeSpace / 2);
                    activeBottom = activeTop + activeSpace;
                }

                var curPlayer = cur.videoInlinePlayer;
                if (curPlayer) {
                    var isAutoplaying = curPlayer.isAutoplay();
                    var isPromoPost = domData(domClosest('post', curPlayer.el), 'ad-view');
                    var rect = curPlayer.el.getBoundingClientRect();
                    var inViewport = rect.top > activeTop && rect.bottom < activeBottom;
                    if (isPromoPost || !isAutoplaying) {
                        inViewport = rect.bottom > activeTop && rect.bottom < activeBottom || rect.top > activeTop && rect.top < activeBottom;
                    }
                    if (inViewport) {
                        if (isAutoplaying && curPlayer.getState() == 'paused') {
                            curPlayer.play();
                        }
                        if (curPlayer.getState() != 'ended') {
                            return;
                        }
                    } else if (isAutoplaying && !curPlayer.isActiveLive()) {
                        curPlayer.pause();
                    }
                }

                var index = thumbsNum;
                if (playInOrder && lastAutoPlayVideo) {
                    index = thumbs.indexOf(lastAutoPlayVideo);
                }
                while (index--) {
                    var thumb = thumbs[index];
                    if (!canPlayHls && intval(domData(thumb, 'duration')) > noHlsMaxDuration) continue;
                    var isLoading = domData(thumb, 'loading');
                    var isPlaying = domData(thumb, 'playing');
                    var isPromoPost = domData(domClosest('post', thumb), 'ad-view');
                    var rect = (isPlaying ? domNS(thumb) : thumb).getBoundingClientRect();

                    if (!rect.width || !rect.height) continue;

                    var inViewport = rect.top > activeTop && rect.bottom < activeBottom;
                    if (isPromoPost && !curPlayer) {
                        inViewport = rect.bottom > activeTop && rect.bottom < activeBottom || rect.top > activeTop && rect.top < activeBottom;
                    }

                    if (inViewport) {
                        if (!isPlaying && !isLoading) {
                            var params = _getVideoParams(thumb);
                            var beforeInitTime = vkNow();
                            lastAutoPlayVideo = thumb;

                            showInlineVideo(params.video, params.list, {
                                autoplay: 1,
                                no_progress: 1,
                                cache: 1,
                                addParams: params
                            }, false, thumb);
                            statlogsValueEvent('page_show_inline_video', vkNow() - beforeInitTime);
                            _sendLoadEvent(params);
                            cur.videoAutoplayStat = {
                                video: params.video,
                                launched: vkNow(),
                                preloaded: _isPreloaded(params.video)
                            };
                        }
                        break;
                    } else if (!isMessagePage && rect.top <= activeTop) {
                        break;
                    }
                }

                var preloadIndex = index + 1;
                if (isMessagePage) {
                    if (!currentScroll) {
                        return;
                    }
                    preloadIndex = index - 1;
                }
                do {
                    var nextThumb = thumbs[preloadIndex];
                    if (nextThumb && (canPlayHls || intval(domData(nextThumb, 'duration')) <= noHlsMaxDuration)) {
                        var params = _getVideoParams(nextThumb);
                        if (!_isPreloaded(params['video'])) {
                            loadInlineVideo(params, _onVideoDataLoaded, true);
                        }
                        break;
                    }
                } while (++preloadIndex < thumbsNum && !isMessagePage);
            }, 50);

            cur.videoAutoplayScrollHandler = scrollHandler;

            addEvent(window, 'scroll', scrollHandler);
            addEvent(window, 'resize', scrollHandler);

            if (isMessagePage && !cur.imClassicInterface) {
                addEvent(window, 'imScroll', scrollHandler);
            }

            scrollHandler();

            cur.destroy.push(function() {
                removeEvent(window, 'scroll', scrollHandler);
                removeEvent(window, 'resize', scrollHandler);
                removeEvent(window, 'imScroll', scrollHandler);

                scrollHandler = null;
                delete cur.videoAutoplayScrollHandler;
            });

            function _getVideoParams(thumb) {
                return {
                    video: domData(thumb, 'video'),
                    list: domData(thumb, 'list'),
                    post_id: domData(domClosest('post', thumb), 'post-id'),
                    stretch_vertical: intval(domData(thumb, 'stretch-vertical')),
                    autoplay: 1,
                    from_autoplay: 1,
                    module: currentModule()
                };
            }

            function _isPreloaded(videoId) {
                var preloaded = false;
                each(ajaxCache, function(key, value) {
                    if (key.indexOf('/al_video.php?act=show_inline') == 0 && key.indexOf('&video=' + videoId) > 0) {
                        preloaded = true;
                        return false;
                    }
                });
                return preloaded;
            }

            function _sendLoadEvent(params) {
                ajax.post('al_video.php?act=autoplay_stat', {
                    event: 'load',
                    video: params.video,
                    post_id: params.post_id,
                    module: cur.module || ''
                }, {});
            }

            function _onVideoDataLoaded(sucess, data) {
                if (!sucess) return;
                var playerParams = data[3].player.params;
                var playerVars = playerParams[0];
                VideoPlayer.preload(playerVars);
            }

            function _getFullscreenElement() {
                return document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
            }
        },

        actionsDropdown: function(el, preloadClbk) {
            if (!el && preloadClbk) {
                preloadClbk();
                return;
            }

            show(el);
        },
        actionsDropdownHide: function(el, force, callback) {
            if (force === 1) {
                callback && callback();
                return hide(el);
            }
            clearTimeout(cur.actDdHide);
            cur.actDdHide = setTimeout(function() {
                fadeOut(el, 200, hide.pbind('page_actions_sublist'));
                callback && callback();
            }, 150);
        },
        actionsDropdownUnhide: function() {
            clearTimeout(cur.actDdHide);
        },
        actionsDropdownLocked: function(el) {
            if (!(el = ge(el))) return;
            return hasClass(el, 'page_actions_item_lock');
        },
        actionsDropdownLock: function(el) {
            if (
                (el = ge(el)) &&
                hasClass(el, 'page_actions_item') &&
                !hasClass(el, 'page_actions_item_lock')
            ) {
                data(el, 'inner', el.innerHTML);
                addClass(el, 'page_actions_item_lock');
                var lockText = ce('div', {
                    className: 'page_actions_item_lock_text'
                });
                val(lockText, el.innerHTML);
                el.appendChild(lockText);
                showProgress(el);
            }
        },
        actionsDropdownUnlock: function(el) {
            if (
                (el = ge(el)) &&
                hasClass(el, 'page_actions_item') &&
                hasClass(el, 'page_actions_item_lock')
            ) {
                removeClass(el, 'page_actions_item_lock');
                el.innerHTML = data(el, 'inner');
            }
        },
        actionsPreloadFeedLists: function(el, sh) {
            ajax.post('al_feed.php', {
                act: 'a_get_lists_by_item',
                item_id: cur.oid
            }, {
                onDone: function(html, js) {
                    if (!sh) return;

                    if (!ge('page_actions_wrap')) {
                        domPN(el).appendChild(se(html), el);
                        eval(js);
                    }
                },
                cache: 1
            });
        },
        feedListsDDShow: function() {
            var obj = ge('page_actions_item_lists');
            addClass(obj, 'page_actions_item_unfolded');
            if (ge('page_actions_sublist')) {
                clearTimeout(cur.feedListsDDHide);
                show('page_actions_sublist');
                return;
            }

            var elems = [];
            for (var i in cur.options.feedLists) {
                var lname = cur.options.feedLists[i];
                if (lname.length > 20) {
                    lname = trim(lname.substr(0, 18)) + '...';
                }
                elems.push('<a id="page_feed_item' + i + '" class="page_actions_item page_actions_subitem' + (cur.options.feedListsSet && cur.options.feedListsSet[i] ? ' checked' : '') + '" onclick="Page.feedListsCheck(this, ' + i + ');">' + lname + '</a>');
            }
            elems = se('<div id="page_actions_sublist" onmouseover="Page.feedListsDDShow();">' + elems.join('') + '</div>');
            domPN(obj).appendChild(elems);
        },
        feedListsDDHide: function() {
            clearTimeout(cur.feedListsDDHide);
            cur.feedListsDDHide = setTimeout(function() {
                hide('page_actions_sublist');
                removeClass('page_actions_item_lists', 'page_actions_item_unfolded');
            }, 150);
        },
        feedListsCheck: function(obj, listId) {
            var checked = hasClass(obj, 'checked');
            if (checked) {
                cur.options.feedListsSet[listId] = 0;
                cur.options.feedListsChanges[listId] = -1;
            } else {
                cur.options.feedListsSet[listId] = 1;
                cur.options.feedListsChanges[listId] = 1;
            }

            toggleClass(obj, 'checked', !checked);
            if (cur.feedListsTO) {
                clearTimeout(cur.feedListsTO);
            }
            var ids = [];
            for (var i in cur.options.feedListsChanges) {
                ids.push(cur.options.feedListsChanges[i] * i);
            }
            if (!ids.length) return;
            cur.feedListsTO = setTimeout(function() {
                ajax.post('al_feed.php', {
                    act: 'a_toggle_lists',
                    item_id: cur.oid,
                    lists_ids: ids.join(','),
                    hash: cur.options.feedListsHash
                }, {
                    onDone: function() {
                        cur.options.feedListsChanges = {};
                    }
                });
            });
        },

        addAudioPreview: function(media, data) {
            stManager.add(['audioplayer.css', 'audioplayer.js']);
            data[AudioUtils.AUDIO_ITEM_INDEX_CONTEXT] = 'attach_preview'
            return AudioUtils.drawAudio(data, 'inlined');
        }
    },
    page = Page;


var Wall = {
    LS_ADS_EVENTS: 'ads.events',
    deleteAll: function(el, post, hash) {
        ajax.post('al_wall.php', {
            act: 'delete_all',
            post: post,
            hash: hash
        }, {
            onDone: function(text) {
                var p = domPN(domPN(el));
                p.oldt = val(p);
                val(p, text);
            },
            showProgress: function() {
                hide(el);
                show(domNS(el) || domPN(el).appendChild(ce('div', {
                    className: 'progress'
                })));
            },
            hideProgress: function() {
                show(el);
                re(domNS(el));
            }
        });
    },
    restoreAll: function(el, post, hash) {
        var rnd = cur.wallRnd = Math.floor(Math.random() * 100000);
        ajax.post('al_wall.php', {
            act: 'restore_all',
            post: post,
            hash: hash,
            rnd: rnd
        }, {
            onDone: function(text) {
                var p = domPN(el);
                val(p, p.oldt);
            },
            showProgress: function() {
                hide(el);
                show(domNS(el) || domPN(el).appendChild(ce('span', {
                    className: 'progress_inline'
                })));
            },
            hideProgress: function() {
                show(el);
                re(domNS(el));
            }
        });
    },
    block: function(el, post, hash, bl, from) {
        ajax.post('al_wall.php', {
            act: 'block',
            post: post,
            hash: hash,
            bl: bl,
            from: from
        }, {
            onDone: function(text) {
                if (bl) {
                    domPN(el).insertBefore(ce('span', {
                        innerHTML: text
                    }), el);
                    hide(el);
                } else {
                    show(domNS(domPN(el)));
                    re(domPN(el));
                }
            },
            showProgress: function() {
                showProgress(el, 'post_inline_progress', 'post_inline_progress', true);
            },
            hideProgress: function() {
                re('post_inline_progress');
            }
        });
    },
    blockEx: function(gid, mid) {
        showBox('groupsedit.php', {
            act: 'bl_edit',
            name: 'id' + mid,
            gid: gid,
            auto: 1
        }, {
            stat: ['page.css', 'ui_controls.js', 'ui_controls.css'],
            dark: 1
        });
    },
    withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
    editPost: function(el, post, options, onFail, onDone) {
        if (cur.editingPost && ge('wpe_text')) {
            var posts = gpeByClass('wall_posts', ge('wpe_text'));
            if (posts && !isVisible(posts)) {
                Wall.cancelEdit();
            } else {
                onFail && onFail();
                return notaBene('wpe_text');
            }
        }
        cur.editingPost = [post];
        if (Wall.withMentions) {
            stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js', 'walledit.js']);
        } else {
            stManager.add(['walledit.js']);
        }
        ajax.post('al_wall.php', extend({
            act: 'edit',
            post: post,
            mention: Wall.withMentions ? 1 : ''
        }, options), {
            onDone: function() {
                var args = Array.prototype.slice.call(arguments);

                if (isArray(args[4]) && cur.options && isArray(cur.options.filter_media_types)) {
                    var mediaTypes = [];
                    each(args[4], function(i, arr1) {
                        each(cur.options.filter_media_types, function(i, arr2) {
                            if (arr1[0] === arr2[0]) {
                                mediaTypes.push(arr2);
                                return false;
                            }
                        });
                    });
                    args[4] = mediaTypes;
                }

                args.unshift(post);
                WallEdit.editPost.apply(window, args);
                onDone && onDone();
            },
            onFail: function() {
                cur.editingPost = false;
                onFail && onFail();
            },
            showProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                    lockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                    lockButton(el);
                } else {
                    addClass(geByClass1('post_actions', 'post' + post), 'post_actions_progress');
                }
            },
            hideProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                    unlockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                    unlockButton(el);
                } else {
                    removeClass(geByClass1('post_actions', 'post' + post), 'post_actions_progress');
                }
            },
            noSort: true
        });
    },
    fixPost: function(link, post, hash, value) {
        ajax.post('al_wall.php', {
            act: 'a_fix_post',
            post: post,
            hash: hash,
            value: value
        }, {
            onDone: function(js) {
                if (js) {
                    eval(js);
                }
                var postEl = (cur.wallLayer == post) ? ge('wl_post') : ge('post' + post);
                each(geByClass('post_fixed'), function() {
                    removeClass(this, 'post_fixed');
                });
                toggleClass(postEl, 'post_fixed', value);
                if (link) {
                    val(link, getLang(value ? 'wall_unfix_post' : 'wall_fix_post'));
                    link.onclick = function() {
                        return Wall.fixPost(link, post, hash, value ? 0 : 1);
                    }
                }
                if (cur.onWKFix) {
                    cur.onWKFix(value);
                    delete cur.onWKFix;
                }
            },
            showProgress: function() {
                if (hasClass(link, 'ui_actions_menu_item')) {
                    lockActionsMenuItem(link);
                } else {
                    lockButton.pbind('wpe_fix' + post);
                }
            },
            hideProgress: function() {
                if (hasClass(link, 'ui_actions_menu_item')) {
                    unlockActionsMenuItem(link);
                } else {
                    unlockButton.pbind('wpe_fix' + post);
                }
            }
        });
        return false;
    },

    cancelEdit: function(layerOnly) {
        if (cur.editingPost) {
            if (layerOnly === true && cur.editingPost[0].match(/^-?\d+_/)) return;
            if (window.WallEdit) {
                WallEdit.cancelEditPost();
            } else {
                cur.editingPost = false;
            }
        }
    },

    searchWall: function() {
        // nav.change({q: false, search: nav.objLoc.day ? false : 1});

    },
    switchTabContent: function(tab) {
        hide('page_wall_posts', 'page_postponed_posts', 'page_suggested_posts', 'page_search_posts', 'page_top_posts');
        switch (tab) {
            case 'own':
            case 'all':
                show('page_wall_posts');
                break;
            case 'postponed':
                show('page_postponed_posts');
                hide('wall_more_link');
                break;
            case 'suggested':
                show('page_suggested_posts');
                break;
            case 'search':
                show('page_search_posts');
                break;
            case 'top':
                show('page_top_posts');
                break;
        }
        // checkPageBlocks();
    },
    switchWall: function(el, ev, type) {
        if (ev && checkEvent(ev)) return true;

        if (!type) {
            type = (cur.wallType == 'own') ? 'all' : 'own';
        }

        if (ev && ev.type == 'click' && ev.clientX && ev.offsetX && cur.wallTab == type && cur.wallType == type && type !== 'top') {
            return nav.go(el, ev);
        }

        if (cur.wallTab == 'postponed') {
            wall.checkPostponedCount();
        }

        if (type !== 'top') {
            var wallEl = ge('page_wall_posts');
            removeClass(wallEl, 'own');
            removeClass(wallEl, 'all');
            addClass(wallEl, type);
        }

        cur.wallType = type;
        cur.wallTab = type;

        uiTabs.switchTab(el);
        uiTabs.hideProgress(el);

        if (type === 'top') {
            cur.baseWallModule = cur.module;
            cur.module = 'wall_top';

            if (cur.topWallFeatureTT) {
                cur.topWallFeatureTT.hide();
            }

        } else if (cur.baseWallModule) {
            cur.module = cur.baseWallModule;
            delete cur.baseWallModule;
        }

        if (Wall.hasPosts()) {
            Wall.update();
            Wall.showWall();
        } else {
            cur.wallNextFrom = 0;
            cur.wallTopNextFrom = 0;

            if (type === 'top') {
                delete cur.wallTopFinished;
            }

            uiTabs.showProgress(el);

            Wall.showMore(0, el);
        }

        return cancelEvent(ev);
    },
    hasPosts: function(type) {
        type = type || cur.wallType;
        return !!(geByClass1('post', (type === 'top' ? 'page_top_posts' : 'page_wall_posts')));
    },
    showSuggested: function(ev, rows, notAll) {
        if (ev && checkEvent(ev)) return true;
        if (!cur.oid) return false;

        var el = ge('page_wall_suggest');

        if (hasClass(el, 'unshown')) {
            el = domQuery1('#page_wall_suggest_more .ui_tab_group_item');
        } else {
            el = geByClass1('ui_tab', el);
        }

        if (!el) {
            return false;
        }

        uiTabs.switchTab(el);
        cur.wallTab = 'suggested';
        delete cur.suggestedDeletedCount;

        if (rows !== undefined) {
            wall.suggestLoaded(rows, notAll);
        } else {
            if (cur.suggestedLoading) return false;
            var cur_oid = cur.suggestedLoading = cur.oid
            uiTabs.showProgress(el);
            ajax.post('al_wall.php', {
                act: 'get_suggests',
                owner_id: cur.oid
            }, {
                onDone: function(rows, notAll, js, count) {
                    if (js) {
                        eval(js);
                    }
                    cur.suggestedLoading = false;
                    uiTabs.hideProgress(el);
                    Wall.updateTabCounter('page_wall_suggested_cnt', count);
                    if (cur_oid !== cur.oid) return;
                    if (cur.wallTab != 'suggested') return;
                    wall.suggestLoaded.apply(window, arguments);
                }
            });
        }
        return false;
    },
    deleteSuggested: function(post_id, group_id, hash, el) {
        if (buttonLocked(el)) {
            return;
        }
        lockButton(el);

        var box = showFastBox({
                title: getLang('global_action_confirmation'),
                onHide: function() {
                    unlockButton(el);
                },
            },
            getLang('wall_delete_suggested_box'),
            getLang('wall_delete_suggested_btn'),
            function(btn) {
                if (buttonLocked(btn)) {
                    return;
                }
                lockButton(btn);

                ajax.post('al_wall.php', {
                    act: 'delete_suggested',
                    post_id: post_id,
                    hash: hash,
                    group_id: group_id
                }, {
                    onDone: function(count) {
                        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
                            var offset = (Math.ceil(count / cur.pgPerPage) - 1) * cur.pgPerPage;
                            if (offset < cur.pgOffset) {
                                if (offset > 0) {
                                    nav.objLoc.offset = offset;
                                } else {
                                    delete nav.objLoc.offset;
                                }
                                nav.setLoc(nav.objLoc);
                            }
                            nav.reload();
                        } else {
                            Wall.showSuggested();
                        }
                        box.hide();
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn),
                });
            },
            getLang('global_cancel')
        );
    },
    suggestLoaded: function(rows, notAll) {
        val('page_suggested_posts', rows);
        toggle('wall_more_link', notAll);
        wall.switchTabContent('suggested');
    },
    suggestMore: function() {
        var cont = ge('page_suggested_posts'),
            more = ge('wall_more_link');
        if (buttonLocked(more)) return;

        ajax.post('al_wall.php', {
            act: 'get_suggests',
            owner_id: cur.oid,
            offset: geByClass('post', cont).length - geByClass('dld', cont).length
        }, {
            onDone: function(rows, notAll) {
                var el = ce('div', {
                        innerHTML: rows
                    }),
                    fc = domFC(el);
                while (fc) {
                    if (ge(fc.id) || !hasClass(fc, 'post')) {
                        re(fc);
                    } else {
                        cont.appendChild(fc);
                    }
                    fc = domFC(el);
                }
                toggle(more, notAll);
            },
            showProgress: lockButton.pbind(more),
            hideProgress: unlockButton.pbind(more)
        });
    },
    suggestUpdate: function(delta) {
        var c = ge('page_suggests_count'),
            v = intval(val(c));
        if (c) {
            if (delta === -1 || delta === 1) {
                val(c, v += delta);
            }
            Wall.updateTabCounter('page_wall_suggested_cnt', v);
        }
    },
    suggestPublished: function(post, text, postponed) {
        if (cur.onepost) {
            return nav.go('/wall' + cur.oid);
        }

        Wall.suggestUpdate(-1);
        showDoneBox(text);
        cur.wallMyDeleted[post] = 1;
        Wall.deinitComposer(ge('wpe_text'));

        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
            Pagination.recache(-1);
            FullWall.updateSummary(cur.pgCount);
        }

        if (postponed) {
            val('page_postponed_posts', postponed);
            wall.postponeUpdateCount();
        }

        if (!intval(val('page_suggests_count'))) {
            var wallMenu = ge('wall_rmenu');
            if (wallMenu) {
                geByClass1('ui_rmenu_item', wallMenu).click();
                hide(geByClass1('_wall_menu_suggested', wallMenu));
            } else if (ge('wall_tabs')) {
                geByClass1('ui_tab', ge('wall_tabs')).click();
                wall.updateTabVisibility('page_wall_suggest', false);
            }
        } else {
            re('post' + post);
        }
    },
    showPostponedFull: function(rows) {
        var menu = ge('ui_rmenu_postponed'),
            cont = ge('page_wall_posts');
        if (!menu || !hasClass(menu, 'ui_rmenu_item_sel') || !cont) {
            var nloc = {
                0: nav.objLoc[0],
                postponed: 1
            };
            return nav.go(nloc);
        }

        val(cont, rows);
        FullWall.updateSummary(geByClass('post', cont).length);
    },
    showPostponed: function(ev, rows) {
        if (ev && checkEvent(ev)) return true;
        if (!cur.oid) return false;

        var el = ge('page_wall_postponed');

        if (hasClass(el, 'unshown')) {
            el = domQuery1('#page_wall_postponed_more .ui_tab_group_item')
        } else {
            el = geByClass1('ui_tab', el);
        }

        if (!el) {
            return false;
        }

        uiTabs.switchTab(el);
        cur.wallTab = 'postponed';

        if (rows !== undefined) {
            Wall.postponedLoaded(rows);
        } else {
            if (cur.postponedLoading) return false;
            var cur_oid = cur.postponedLoading = cur.oid;
            uiTabs.showProgress(el);
            ajax.post('al_wall.php', {
                act: 'get_postponed',
                owner_id: cur.oid
            }, {
                onDone: function(rows) {
                    cur.postponedLoading = false;
                    uiTabs.hideProgress(el);
                    if (cur_oid !== cur.oid) return;
                    if (cur.wallTab != 'postponed') return;
                    Wall.postponedLoaded(rows);
                }
            });
        }
        return false;
    },
    postponedLoaded: function(rows) {
        val('page_postponed_posts', rows);
        wall.postponeUpdateCount();
        wall.switchTabContent('postponed');
    },
    postponeUpdateCount: function() {
        var wrapEl = ge('page_postponed_posts'),
            count = wrapEl && (geByClass('post', wrapEl).length - geByClass('dld', wrapEl).length) || 0;

        if (!wrapEl) {
            return;
        }

        Wall.updateTabCounter('page_wall_postponed_cnt', count);
    },
    checkPostponedCount: function() {
        var posts = geByClass('post', 'page_postponed_posts'),
            postponedCnt = 0;
        each(posts, function() {
            var postId = this.id.replace('post', '');
            if (!cur.wallMyDeleted[postId]) {
                postponedCnt++;
            }
        });
        if (!postponedCnt) {
            wall.updateTabVisibility('page_wall_postponed', false);
        }
    },
    updateTabCounter: function(name, count) {
        count = count ? langNumeric(count, '%s', true) : '';

        geByClass(name).forEach(function(el) {
            val(el, count);

            var tab = domPN(el);

            if (hasClass(tab, 'ui_tab_group_item')) {
                domData(tab, 'default-label', tab.innerHTML);
            }
        });
    },
    updateTabVisibility: function(tabName, visible) {
        var moreTab = ge('page_wall_more_tab');
        var tabsCount;
        var tabs;
        var tab;
        var shown;

        if (moreTab) {
            if (isVisible(moreTab)) {
                if (!visible) {
                    tab = ge(tabName);

                    // Hide regular tab
                    if (!hasClass(tab, 'unshown')) {
                        addClass(tab, 'unshown');

                        tabs = geByClass('ui_tab', ge('wall_tabs')).filter(function(tabEl) {
                            tabEl = domPN(tabEl);
                            return tabEl !== moreTab && !hasClass(tabEl, 'unshown');
                        });

                        tabsCount = (cur.wallTabsLimit - 1) - tabs.length;

                        // Check rest visible and show extra from more if needed
                        if (tabsCount > 0) {
                            cur.wallTabsMorePriority.forEach(function(id) {
                                if (tabsCount <= 0) {
                                    return;
                                }

                                var tabEl = ge(id + '_more');

                                if (tabEl && !hasClass(tabEl, 'unshown')) {
                                    removeClass(ge(id), 'unshown');
                                    addClass(tabEl, 'unshown');
                                    tabsCount--;
                                }
                            });
                        }

                        // Hide tab in more
                    } else {
                        addClass(ge(tabName + '_more'), 'unshown');
                    }

                    tabs = geByClass('ui_tab_group_item', moreTab);

                    // Check tabs in more and expand in only one
                    if (tabs.length - geByClass('unshown', moreTab).length <= 1) {
                        tabs.forEach(function(tabEl) {
                            tabEl = domPN(tabEl);

                            if (!hasClass(tabEl, 'unshown')) {
                                removeClass(ge(tabEl.id.replace(/_more$/, '')), 'unshown');
                                addClass(tabEl, 'unshown');
                            }
                        });

                        addClass(moreTab, 'unshown');
                    }
                } else if (hasClass(tabName, 'unshown') && hasClass(tabName + '_more', 'unshown')) {
                    shown = false;

                    // Check visible extra tabs and if any with less priority swap it
                    cur.wallTabsMorePriority.forEach(function(id) {
                        if (!shown && !hasClass(id, 'unshown')) {
                            addClass(id, 'unshown');
                            removeClass(id + '_more', 'unshown');
                            removeClass(tabName, 'unshown');
                            shown = true;
                        }
                    });

                    // Or show in more
                    if (!shown) {
                        removeClass(tabName + '_more', 'unshown');
                    }
                }

            } else {
                toggleClass(ge(tabName), 'unshown', !visible);

                tabs = geByClass('ui_tab', ge('wall_tabs')).filter(function(tabEl) {
                    tabEl = domPN(tabEl);
                    return tabEl !== moreTab && !hasClass(tabEl, 'unshown');
                });

                // Collapse extra visible tabs
                if (tabs.length > cur.wallTabsLimit) {
                    tabsCount = tabs.length - (cur.wallTabsLimit - 1);

                    geByClass('ui_tab_group_item', moreTab).forEach(function(tabEl) {
                        addClass(tabEl, 'unshown');
                    });

                    cur.wallTabsMorePriority.forEach(function(id) {
                        if (tabsCount <= 0) {
                            return;
                        }

                        var tabEl = ge(id);

                        if (tabEl && !hasClass(tabEl, 'unshown')) {
                            addClass(tabEl, 'unshown');
                            removeClass(ge(id + '_more'), 'unshown');
                            tabsCount--;
                        }
                    });

                    removeClass(moreTab, 'unshown');

                    statlogsValueEvent('wall_more_tab_shown', cur.oid);
                }
            }

        } else {
            toggleClass(ge(tabName), 'unshown', !visible);
        }
    },
    postponedPublished: function(post, text) {
        if (cur.onepost) {
            return nav.go('/wall' + cur.oid);
        }

        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
            Pagination.recache(-1);
            FullWall.updateSummary(cur.pgCount);
        }

        text && showDoneBox(text);
        cur.wallMyDeleted[post] = 1;
        var posts = geByClass('post', ge('page_postponed_posts')),
            curPost = ge('post' + post);
        if (posts.length <= 1 && inArray(curPost, posts)) {
            var wallMenu = ge('wall_rmenu');
            if (wallMenu) {
                geByClass1('ui_rmenu_item', wallMenu).click();
                hide(geByClass1('_wall_menu_postponed', wallMenu));
            } else if (ge('wall_tabs')) {
                geByClass1('ui_tab', ge('wall_tabs')).click();
                wall.updateTabVisibility('page_wall_postponed', false);
            }
        } else {
            re(curPost);
            wall.postponeUpdateCount();
        }
    },
    onWallSearchSend: function(el, value) {
        if (value) {
            Wall.showSearch(value, 0);
        } else {
            Wall.hideSearch();
        }
    },
    showSearch: function(query, offset) {
        if (cur.searchLoading && cur.searchLoading == query || !cur.oid) return false;
        var cur_oid = cur.oid;
        cur.wallQuery = cur.searchLoading = query;
        if (cur.wallTab != 'search') {
            cur.prevWallTab = cur.wallTab;
            cur.wallTab = 'search';
        }

        var more = ge('wall_more_link');
        ajax.post('al_wall.php', {
            act: 's',
            search: 1,
            q: query,
            owner_id: cur.oid,
            offset: offset,
            inline: 1,
            owners_only: 1
        }, {
            onDone: function(rows, newOffset, count) {
                if (cur_oid !== cur.oid) return;
                if (cur.wallTab != 'search') return;

                var postsEl = ge('page_search_posts');
                if (!offset) {
                    val(postsEl, '');
                }
                postsEl.appendChild(cf(rows));
                wall.switchTabContent('search');

                toggle(more, newOffset < count);
                more.onclick = Wall.showSearch.pbind(query, newOffset);
            },
            showProgress: function() {
                uiSearch.showProgress('wall_search');
                offset && lockButton(more);
            },
            hideProgress: function() {
                cur.searchLoading = false;
                uiSearch.hideProgress('wall_search');
                offset && unlockButton(more);
            }
        });
        return false;
    },
    hideSearch: function() {
        delete cur.wallQuery;
        if (!cur.prevWallTab) return;

        cur.wallTab = cur.prevWallTab;
        cur.prevWallTab = false;
        wall.switchTabContent(cur.wallTab);
        wall.update();
    },
    publishPostponedPost: function(post, hash, from) {
        showFastBox(getLang('publish_postponed_title'), getLang('publish_postponed_confirm'), getLang('publish_postponed_btn'), function() {
            curBox().hide();
            ajax.post('al_wall.php', {
                act: 'publish_postponed',
                post: post,
                from: from,
                hash: hash
            }, {
                onDone: Wall.postponedPublished.pbind(post),
                showProgress: lockButton.pbind('wpe_publish' + post),
                hideProgress: unlockButton.pbind('wpe_publish' + post)
            });
        }, getLang('global_cancel'));
    },
    cmp: function(id1, id2) {
        var l1 = id1.length,
            l2 = id2.length;
        if (l1 < l2) {
            return -1;
        } else if (l1 > l2) {
            return 1;
        } else if (id1 < id2) {
            return -1;
        } else if (id1 > id2) {
            return 1;
        }
        return 0;
    },
    receive: function(rows, names, type) {
        type = type || cur.wallType;

        var isTop = (type === 'top');
        var n = ce('div', {
                innerHTML: rows
            }),
            revert = !!cur.options.revert;
        var posts = (isTop ? ge('page_top_posts') : ge('page_wall_posts'));
        var cleanBlock = (isTop ? ge('page_wall_posts') : ge('page_top_posts'));
        var current = (revert ? posts.firstChild : posts.lastChild),
            added = 0;
        var adsPosts = [];
        var prevPostEl;
        var prevCurrent;
        var insertPositionEl;
        var el, node;

        // Clean up other posts container
        if (cleanBlock) {
            el = domFC(cleanBlock);

            while (el) {
                node = el;
                el = domNS(el);

                if (!node.tagName || node.tagName.toLowerCase() !== 'input') {
                    re(node);
                }
            }
        }

        function getPostId(postEl) {
            if (!postEl || !postEl.tagName || postEl.tagName.toLowerCase() !== 'div' || !postEl.id || postEl.id.substr(0, 4) !== 'post') {
                return false;
            }
            return postEl.id;
        }

        for (var el = re(revert ? n.firstChild : n.lastChild); el; el = re(revert ? n.firstChild : n.lastChild)) {
            if (el.tagName.toLowerCase() == 'input') {
                var old = ge(el.id);
                if (old) {
                    posts.replaceChild(el, old);
                } else {
                    (posts.firstChild ? domInsertBefore(el, posts.firstChild) : posts.appendChild(el));
                }
                continue;
            }

            if (hasClass(el, 'post_fixed') && ge(el.id)) {
                continue;
            }
            if (hasClass(el, '_ads_promoted_post')) {
                adsPosts.push({
                    el: el,
                    beforePost: getPostId(revert ? n.firstChild : prevPostEl),
                    afterPost: getPostId(revert ? prevPostEl : n.lastChild)
                });
                continue;
            }

            // Iterating over div-s with posts, until current post id less than id from response `el`
            // That way we are searching for a place to insert/replace. Ads posts are skipped.
            while (
                current &&
                current.tagName &&
                current.tagName.toLowerCase() == 'div' &&
                !hasClass(current, 'post_fixed') // ???
                &&
                (hasClass(current, '_ads_promoted_post') || (!isTop && Wall.cmp(current.id, el.id) < 0))
            ) {
                current = (revert ? current.nextSibling : current.previousSibling);
            }
            ++added;
            if (!current) {
                if (revert) {
                    posts.appendChild(el);
                } else {
                    posts.insertBefore(el, posts.firstChild);
                }
            } else if (!Wall.cmp(current.id, el.id)) {
                posts.replaceChild(el, current);
                current = el;
                --added;
            } else {
                // if ad was skipped above (during "current" iteration), take it into account again
                insertPositionEl = current;
                prevCurrent = (revert ? current.previousSibling : current.nextSibling);
                if (prevCurrent && hasClass(prevCurrent, '_ads_promoted_post')) {
                    insertPositionEl = prevCurrent;
                }

                if (revert) {
                    posts.insertBefore(el, insertPositionEl);
                } else {
                    posts.insertBefore(el, insertPositionEl.nextSibling);
                }
            }
            prevPostEl = el;
            placeholderSetup(geByTag1('textarea', el), {
                fast: 1
            });
        }

        var adsPostData, postId, positionErr;
        if (adsPosts.length) {
            for (var i = 0, l = adsPosts.length; i < l; ++i) {
                adsPostData = adsPosts[i];
                if (!adsPostData.beforePost && !adsPostData.afterPost) {
                    continue;
                }
                // �� `ge`, � ����, �� ������ ����������� id div-�� � ������� c ������� �������
                positionErr = 'no_position';
                for (el = (revert ? posts.firstChild : posts.lastChild); el; el = (revert ? el.nextSibling : el.previousSibling)) {
                    insertPositionEl = null;
                    postId = getPostId(el);
                    if (!postId) {
                        continue;
                    }
                    if (adsPostData.beforePost === postId) {
                        insertPositionEl = el;
                    } else if (adsPostData.afterPost === postId) {
                        insertPositionEl = el.nextSibling;
                    }
                    if (insertPositionEl && (
                            insertPositionEl.previousSibling && hasClass(insertPositionEl.previousSibling, '_ads_promoted_post') ||
                            hasClass(insertPositionEl, '_ads_promoted_post')
                        )) {
                        insertPositionEl = null;
                        positionErr = 'ads_sibling';
                        break;
                    }
                    if (insertPositionEl) {
                        posts.insertBefore(adsPostData.el, insertPositionEl);
                        positionErr = false;
                        break;
                    }
                }
                if (positionErr) {
                    statlogsValueEvent('debug_watch', 1, 'js_page_ads_promoted_post_no_position', positionErr);
                }
            }
        }

        if (isTop && !added) {
            cur.wallTopFinished = cur.oid;
        }

        if (type == 'full_own' || type == 'full_all') {
            Pagination.recache(added);
            FullWall.updateSummary(cur.pgCount);
        }
        Wall.update();
        extend(cur.options.reply_names, names);
        Wall.updateMentionsIndex();

        if (added) {
            getAudioPlayer().updateCurrentPlaying();
        }
    },
    showMore: function(offset, tabEl) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (cur.wallLayer) return;
        if (cur.wallTab == 'suggested') return Wall.suggestMore();
        if (cur.wallTypeLoading && cur.wallTypeLoading[cur.wallType]) return;
        if (cur.wallType === 'top' && cur.wallTopFinished === cur.oid) return;

        var type = cur.wallType,
            isTop = (type === 'top'),
            more = ge('wall_more_link'),
            wallNextFrom = (offset !== 0 ? (isTop ? cur.wallTopNextFrom : cur.wallNextFrom) : '') || '',
            tmp = cur.wallLoading = cur.oid,
            onlyCache = (isTop && !!cur.wallTopOnlyCache);

        cur.wallTypeLoading = cur.wallTypeLoading || {};
        cur.wallTypeLoading[type] = true;

        ajax.post('al_wall.php', {
            act: 'get_wall',
            owner_id: cur.oid,
            offset: offset,
            type: type,
            fixed: cur.options.fixed_post_id || '',
            wall_start_from: wallNextFrom,
            onlyCache: onlyCache
        }, {
            onDone: function(data, names, videos, newNextFrom) {
                tabEl && uiTabs.hideProgress(tabEl);
                if (tmp !== cur.oid || type !== cur.wallType) {
                    delete cur.wallLoading;
                    delete cur.wallTypeLoading[type];
                    return;
                }

                // Wait a bit while build a smart wall
                if (isTop && isObject(data) && data.wait) {
                    cur.wallTopLoadingDelay = (cur.wallTopLoadingDelay ? cur.wallTopLoadingDelay + 100 : 200);

                    if (cur.wallTopLoadingDelay < 500) {
                        setTimeout(function() {
                            delete cur.wallLoading;
                            delete cur.wallTypeLoading[type];
                            Wall.showMore(offset);
                        }, cur.wallTopLoadingDelay);
                    } else {
                        delete cur.wallLoading;
                        delete cur.wallTypeLoading[type];
                        cur.wallTopOnlyCache = false;
                        Wall.showMore(offset);
                    }

                    return;
                }

                delete cur.wallTopLoadingDelay;

                if (cur.wallVideos) {
                    each(videos, function(playlistId, playlist) {
                        if (cur.wallVideos[playlistId]) {
                            cur.wallVideos[playlistId].list = cur.wallVideos[playlistId].list.concat(playlist.list);
                        }
                    });
                }

                if (isTop) {
                    cur.wallTopNextFrom = newNextFrom;
                } else {
                    cur.wallNextFrom = newNextFrom;
                }

                setTimeout(function() {
                    Wall.receive(data, names, type);

                    if (!offset && type === cur.wallType) {
                        Wall.showWall();
                    }

                    delete cur.wallLoading;
                    delete cur.wallTypeLoading[type];
                }, 0);
            },
            showProgress: lockButton.pbind(more),
            hideProgress: unlockButton.pbind(more)
        });
    },

    showWall: function() {
        wall.switchTabContent(cur.wallType);

        var wallY = getXY(domClosest('wall_module', ge('page_wall_posts')))[1];

        if (wallY < scrollGetY()) {
            scrollToY(wallY - 15);
        }
    },

    checkTextLen: function(inp, warn, force) {
        var val = trim(Emoji.editableVal(inp).replace(/\n\n\n+/g, '\n\n'));
        //var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
        if (inp.lastLen === val.length && !force) {
            if (window.FullWall && cur.onepost) {
                FullWall.onePostOnScroll();
            }
            return;
        }

        var realLen = inp.lastLen = val.length,
            maxLen = (cur.options || {}).max_post_len || (window.mvcur || {}).maxReplyLength,
            brCount = realLen - val.replace(/\n/g, '').length;

        warn = ge(warn);
        if (realLen > maxLen - 100 || brCount > 4) {
            show(warn);
            if (realLen > maxLen) {
                warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
            } else if (brCount > 4) {
                warn.innerHTML = getLang('global_recommended_lines', brCount - 4);
            } else {
                warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
            }
        } else {
            hide(warn);
        }

        if (window.FullWall && cur.onepost) {
            FullWall.onePostOnScroll();
        }
    },
    checkPostLen: function(field, warn, val, force) {
        var pf = ge(field);
        val = trim(val).replace(/\n\n\n+/g, '\n\n');
        if (!pf || pf.lastLen === val.length && !force) return;
        var realLen = pf.lastLen = val.length,
            maxLen = cur.options.max_post_len;
        var brCount = realLen - val.replace(/\n/g, '').length;
        var pw = ge(warn);
        if (realLen > maxLen - 100 || brCount > 4) {
            if (realLen > maxLen) {
                pw.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
            } else if (brCount > 4) {
                pw.innerHTML = getLang('global_recommended_lines', brCount - 4);
            } else {
                pw.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
            }
            show(pw);
        } else {
            hide(pw);
        }
    },
    postChanged: function(force) {
        if (!isVisible('submit_post') || !hasClass(ge('submit_post_box'), 'shown')) Wall.showEditPost();
        if (vk.id && !vk.widget && !cur.options.no_draft) {
            clearTimeout(cur.postAutosave);
            var saveCallback = (intval(cur.oid) == vk.id) ? Wall.saveDraft : Wall.saveOwnerDraftText.pbind(cur.oid);
            if (force === true) {
                saveCallback();
            } else {
                cur.postAutosave = setTimeout(saveCallback, (force === 10) ? 10 : 1000);
            }
        }
    },
    ownerDraftKey: function(ownerId) {
        return 'wall_draft' + vk.id + '_' + ownerId;
    },
    ownerDraftData: function() {
        if (!cur.wallDraftData) {
            cur.wallDraftData = {};
        }
        return cur.wallDraftData;
    },
    addOwnerDraftMedia: function(ownerId, info) {
        if (cur.options.no_draft) {
            return;
        }

        var data = Wall.ownerDraftData(),
            type = info[0],
            id = info[1],
            object = info[2];

        data._attach_cache = data._attach_cache || {};
        if (object) {
            data._attach_cache[type + id] = object;
        } else {
            object = data._attach_cache[type + id];
        }

        data.attaches = data.attaches || [];
        var lsAttaches = ls.get(Wall.ownerDraftKey(ownerId)) || {};
        if (type !== false) {
            data.attaches.push([type, id, object, data.attaches.length]);
        } else if (type === false && typeof(id) !== 'undefined') {
            data.attaches = data.attaches.filter(function(el) {
                return el[3] !== id;
            });
        }
        ls.set(Wall.ownerDraftKey(ownerId), extend(lsAttaches, {
            txt: clean(Wall.getDraftData().message || ''),
            medias: data.attaches
        }));
    },
    cleanOwnerDraftMedia: function(ownerId) {
        if (cur.options.no_draft) {
            return;
        }

        var data = Wall.ownerDraftData(),
            lsAttaches = ls.get(Wall.ownerDraftKey(ownerId)) || {};

        data.attaches = [];
        ls.set(Wall.ownerDraftKey(ownerId), extend({
            txt: ''
        }, lsAttaches, {
            medias: []
        }));
    },
    saveOwnerDraftText: function(ownerId) {
        cur.postFieldZoomText && cur.postFieldZoomText(cur.postField, cur.wallAddMedia);

        if (cur.options.no_draft) {
            return;
        }

        var data = Wall.ownerDraftData(),
            lsText = ls.get(Wall.ownerDraftKey(ownerId)) || {},
            draftData = Wall.getDraftData(),
            content = clean(draftData.message || '');

        data.txt = content;
        each(lsText.medias || {}, function(i, v) {
            switch (v[0]) {
                case 'postpone':
                    if (draftData.postpone) {
                        lsText.medias[i][1] = draftData.postpone;
                        lsText.medias[i][2].draft = 1;
                    }
                    break;
                case 'poll':
                    var pollData = (cur.wallAddMedia || {}).pollData(true, true);
                    if (pollData) {
                        extend(lsText.medias[i][2], pollData);
                    }
                    break;
            }
        });
        extend(lsText, {
            txt: content
        });
        if (cur.shareShowImg) {
            extend(lsText, {
                shareShowImg: cur.shareShowImg
            });
        }
        if (ownerId < 0) {
            extend(lsText, {
                from: (domData(domClosest('_submit_post_box', ge('official')), 'from-oid') || vk.id),
                signed: (isChecked('signed') ? 1 : 0)
            });
        }
        ls.set(Wall.ownerDraftKey(ownerId), lsText);
    },
    getOwnerDraft: function(ownerId) {
        if (cur.options.no_draft) {
            return [];
        }

        var draft = ls.get(Wall.ownerDraftKey(ownerId)) || [];
        return [draft.txt, draft.medias, true, {
            from: intval(draft.from),
            signed: intval(draft.signed),
            shareShowImg: intval(draft.shareShowImg)
        }];
    },
    saveOwnerDraftMedia: function(ownerId, type, id, object) {
        if (cur.options.no_draft) {
            return;
        }

        Wall.cleanOwnerDraftMedia(ownerId);
        var addmedia = cur.wallAddMedia || {},
            media = addmedia.chosenMedia || {},
            medias = cur.wallAddMedia ? addmedia.getMedias() : [],
            current = [],
            allmedia = medias.slice().map(function(el) {
                return el.slice(0, 2);
            });

        if (typeof id !== 'undefined' && type) {
            current = [
                [type, id, object]
            ];
        } else if (!type && typeof id !== 'undefined') {
            allmedia.splice(id, 1);
        }

        allmedia = allmedia.concat(current);
        each(allmedia, function() {
            Wall.addOwnerDraftMedia(ownerId, this);
        });
    },
    saveDraft: function() {
        cur.postFieldZoomText && cur.postFieldZoomText(cur.postField, cur.wallAddMedia);

        if (cur.options.no_draft) {
            return;
        }
        if (cur.noDraftSave) {
            cur.noDraftSave = false;
            return;
        }
        if (cur.postSent || vk.id != intval(cur.oid)) {
            return;
        }

        var params = Wall.getDraftData();
        if (params.delayed) {
            return;
        }
        ajax.post('al_wall.php', Wall.fixPostParams(extend({
            act: 'save_draft',
            hash: cur.options.post_hash
        }, params)), {
            onFail: function() {
                return true;
            }
        });
    },
    getDraftData: function() {
        if (cur.options.no_draft) {
            return {};
        }

        var addmedia = cur.wallAddMedia || {},
            media = addmedia.chosenMedia || {},
            medias = cur.wallAddMedia ? addmedia.getMedias() : [],
            share = (addmedia.shareData || {})
        msg = trim((window.Emoji ? Emoji.editableVal : val)(ge('post_field'))), attachI = 0,
            params = {
                message: msg
            };

        if (isArray(media) && media.length) {
            medias.push(clone(media));
        }

        if (medias.length) {
            var ret = false;
            each(medias, function(k, v) {
                if (!v) return;

                var type = this[0],
                    attachVal = this[1];
                switch (type) {
                    case 'poll':
                        var poll = addmedia.pollData(true, true);
                        if (!poll) {
                            params.delayed = true;
                            return false;
                        }
                        attachVal = poll.question;
                        delete poll.question;
                        params = extend(params, poll);
                        break;
                    case 'share':
                        if (
                            share.failed ||
                            !share.url ||
                            !share.title && (!share.images || !share.images.length) && !share.photo_url && !share.video
                        ) {
                            if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                                params.delayed = true;
                                return false;
                            } else {
                                return;
                            }
                        }
                        if (share.video) {
                            attachVal = share.video_owner_id + '_' + share.video_id;
                            params.snippet_video = 1;
                        } else {
                            attachVal = (share.user_id && share.photo_id && !share.noPhoto) ? share.user_id + '_' + share.photo_id : '';
                        }
                        if (share.initialPattern && (trim(msg) == share.initialPattern)) {
                            params.message = '';
                        }
                        params = extend(params, {
                            url: share.url,
                            mode: share.mode,
                            title: replaceEntities(share.title),
                            description: replaceEntities(share.description),
                            button_text: replaceEntities(share.button_text),
                            button_action: share.button_action,
                            extra: share.extra,
                            extra_data: share.extraData,
                            photo_url: share.video ? '' : replaceEntities(share.photo_url),
                            open_graph_data: (share.openGraph || {}).data,
                            open_graph_hash: (share.openGraph || {}).hash
                        });
                        break;
                    case 'page':
                        if (share.initialPattern && (trim(msg) == share.initialPattern)) {
                            params.message = '';
                        }
                        break;
                    case 'postpone':
                        var ts = val('postpone_date' + addmedia.lnkId);
                        params = extend(params, {
                            postpone: ts
                        });
                        return;
                    case 'mark_as_ads':
                        params = extend(params, {
                            mark_as_ads: 1
                        });
                        return;
                }
                if (this[3] && trim(msg) == this[3]) {
                    params.message = '';
                }
                params['attach' + (attachI + 1) + '_type'] = type;
                params['attach' + (attachI + 1)] = attachVal;
                attachI++;
            });
        }

        return params;
    },
    setDraft: function(data) {
        if (cur.options.no_draft) {
            return;
        }
        if (!data[0] && (!data[1] || !data[1].length)) {
            return;
        }

        var field = ge('post_field');
        if (!field) {
            return;
        }

        Emoji.val(field, clean(replaceEntities(data[0] || '')).replace(/\n/g, '<br/>'));
        Wall.showEditPost(function() {
            setTimeout(function() {
                if (data[1] && cur.wallAddMedia) {
                    for (var i in data[1]) {
                        cur.noDraftSave = true;
                        cur.wallAddMedia.chooseMedia.apply(cur.wallAddMedia, data[1][i]);
                    }
                }
            }, 0);

        });
        if (data[2]) {
            wall.focusOnEnd();
        }
        if (data[3] !== undefined) {
            wall.setReplyAsGroup(ge('official'), data[3]);
            if (data[3].shareShowImg) {
                cur.shareShowImgRestored = data[3].shareShowImg;
            }
        }

        cur.postFieldZoomText && cur.postFieldZoomText(cur.postField, cur.wallAddMedia);
    },
    initPostEditable: function(draft) {
        var txt = cur.postField;
        if (!txt || txt.emojiInited) {
            return false;
        }

        txt.emojiInited = true;

        stManager.add(['emoji.js', 'notifier.css'], function() {
            Emoji.init(txt, {
                ttDiff: -42,
                rPointer: true,
                controlsCont: domPN(txt),
                noStickers: true,
                onSend: Wall.sendPost,
                noEnterSend: true,
                ref: 'post',
                checkEditable: Wall.postChanged,
                initUploadForImagePasteCallback: function(txt, addMedia, blob) {
                    if (window.Upload) {
                        Upload.onFileApiSend(cur.wallUploadInd, [blob]);
                    }
                }
            });
            addClass(txt, 'submit_post_inited')

            if (draft) {
                setTimeout(Wall.setDraft.pbind(draft), 0);
            } else {
                cur.postFieldZoomText && cur.postFieldZoomText(cur.postField, cur.wallAddMedia);
            }
        });

        setTimeout(function() {
            if (cur.postFieldZoomText) {
                addEvent(txt, 'keydown paste', function() {
                    setTimeout(function() {
                        cur.postFieldZoomText(cur.postField, cur.wallAddMedia);
                    }, 0);
                });
            }
        }, 0);
    },
    showEditPost: function(callback) {
        var input = ge('post_field');
        if (cur.viewAsBox) {
            setTimeout(function() {
                input.blur()
            }, 0);
            return cur.viewAsBox();
        }

        if (cur.editing === 0) return;
        setTimeout(WallUpload.init, 0);

        Wall.initComposer(input, {
            lang: {
                introText: getLang('profile_mention_start_typing'),
                noResult: getLang('profile_mention_not_found')
            },
            checkLen: Wall.postChanged,
            onValueChange: Wall.onPostValChange
        }, callback);

        Wall.hideEditPostReply();
        addClass('submit_post_box', 'shown');
        cur.editing = 0;

        if (isFunction(cur.onShowEditPost)) {
            cur.onShowEditPost()
        }
    },

    initComposer: function(input, options, callback) {
        if (!data(input, 'composer')) {
            if (!cur.composerAdded) {
                stManager.add(['wide_dd.css', 'wide_dd.js'], function() {
                    cur.composerAdded = true;
                    var composer = Composer.init(input, options);
                    callback && callback();
                    cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
                });
            } else {
                var composer = Composer.init(input, options);
                callback && callback();
                cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
            }
        } else {
            callback && callback();
        }
    },
    deinitComposer: function(input) {
        var composer = data(input, 'composer');
        if (composer) {
            Composer.destroy(composer);
        }
        if (input.emojiId && window.Emoji) {
            Emoji.destroy(input.emojiId);
        }
    },
    hasComposerMedia: function(input) {
        var composer = input && data(input, 'composer');
        if (!composer || !composer.addMedia) {
            return false;
        }
        return composer.addMedia.attachCount() > 0;
    },
    composerListShown: function(input) {
        var composer = input && data(input, 'composer');
        if (!composer) return false;

        var controlEvent = composer.wdd,
            cnt = 0;
        for (var i in controlEvent.shown) {
            cnt += 1;
        }
        if (controlEvent && isVisible(controlEvent.listWrap) && cnt) {
            return true;
        }

        return false;
    },

    onPostValChange: function(val) {
        if (cur.wallAddMedia) {
            cur.wallAddMedia.checkMessageURLs.apply(window, arguments);
        }
        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
            Pagination.pageTopUpdated();
        }

        // Force redraw for IE; wrong position of placeholder
        if (browser.msie && !val) {
            var field = ge('post_field');
            hide(field);
            show(field);
            elfocus(field);
        }
    },
    hideEditPost: function(force) {
        cur.editing = false;
        var rf = ge('post_field'),
            addmedia = cur.wallAddMedia || {},
            v = trim((window.Emoji ? Emoji.editableVal : val)(rf)),
            empty = true;

        if (browser.opera_mobile || !rf) return;
        if (!force && (v || addmedia.chosenMedia || (addmedia.getMedias && addmedia.getMedias().length > 0) || (addmedia.attachCount && addmedia.attachCount() > 0))) return;
        removeClass('submit_post_box', 'shown');
        if (rf && !v) {
            if (cur.postMention) {
                cur.postMention.options.minHeight = cur.emptyPostheight || 14;
            }
        }
        cur.onWallSendCancel && cur.onWallSendCancel();
        window.WallUpload && WallUpload.hide();
        if (cur.wallAddMedia) {
            cur.wallAddMedia._hideAddMedia(true);
        }
    },
    clearInput: function() {
        show('page_add_media');

        var rf = ge('post_field');
        if (Wall.withMentions) {
            var mention = data(rf, 'mention');
            if (mention) {
                mention.rtaEl.innerHTML = '';
                hide(mention.cont);
                show(rf);
            }
        }
        val(rf, '');
        rf.blur();
        rf.phonblur();
        Wall.hideEditPost(true);
        if (cur.wallAddMedia) cur.wallAddMedia.unchooseMedia();
        checkbox('export_status', false);
        checkbox('close_comments', false);

        var composer = data(rf, 'composer')
        if (composer) {
            re(composer.articleConvertEl)
            composer.articleConvertEl = false
        }
    },
    fixPostParams: function(params) {
        var newParams = clone(params);
        newParams.Message = params.message;
        delete newParams.message;
        return newParams;
    },
    focusOnEnd: function() {
        var el = ge('post_field');

        if (!el) {
            return
        }

        if (el.tagName == 'TEXTAREA') {
            elfocus(el);
            return;
        }
        var len = el.innerHTML ? el.innerHTML.length : (el.length ? el.length : el.childNodes.length - 1);
        el.focus();
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.moveStart('character', len);
            sel.select();
        } else {
            window.getSelection().collapse(el, el.childNodes.length);
        }
    },
    isAnonPost: function() {
        var anonToggler = geByClass1('anon_toggle');
        return (anonToggler && hasClass(geByClass1('_ui_toggler', anonToggler), 'on') ? 1 : '');
    },
    saveAnon: function(el) {
        toggleClass(geByClass1('_ui_toggler', el), 'on');

        var isAnon = Wall.isAnonPost();

        checkbox('friends_only', false);
        checkbox('status_export', !isAnon);
        checkbox('facebook_export', !isAnon);
        toggleClass(ge('submit_post_box'), 'anon_field_on');

        var prevBtnText = cur.anonPostBtn || getLang('wall_send');

        cur.anonPostBtn = ge('send_post').innerHTML;

        ge('send_post').innerHTML = isAnon ? getLang('wall_send') : prevBtnText;
    },

    showPostSettings: function(el, ev) {
        if (!data(el, 'ett')) {
            var content = domNS(el);

            new ElementTooltip(el, {
                cls: 'post_settings_tooltip',
                content: val(content),
                defaultSide: 'top',
                offset: [0, -5],
                appendTo: domPN(el)
            });

            re(content);
        }

        if (ev && checkKeyboardEvent(ev) && ev.type === 'click') {
            data(el, 'ett').toggle();
        }
    },

    saveExport: function(el, service, hash) {
        if (!isChecked('friends_only') && !Wall.isAnonPost()) {
            checkbox(el);
        }

        cur.saveExportTO = cur.saveExportTO || {};
        clearTimeout(cur.saveExportTO[service]);
        cur.saveExportTO[service] = setTimeout(function() {
            ajax.post('/al_settings.php', {
                act: 'a_save_export',
                service: service,
                disabled: (isChecked(el) ? 0 : 1),
                hash: hash
            });
        }, 300);
    },
    saveFriendsOnly: function(el) {
        var isAnon = Wall.isAnonPost();

        checkbox(el, !isAnon && !isChecked(el));

        var friendsOnly = isChecked(el);
        var twitter = ge('status_export');
        var fb = ge('facebook_export');

        if (friendsOnly) {
            checkbox(twitter, false);
            checkbox(fb, false);
        }

        twitter && disable(twitter, friendsOnly);
        fb && disable(fb, friendsOnly);
    },
    needCheckSign: function() {
        var el = ge('check_sign');
        return el && isChecked(el);
    },
    saveCheckSign: function(el) {
        var checked = isChecked(el);
        domData(el, 'title', checked ? getLang('wall_check_sign_disabled') : getLang('wall_check_sign_enabled'));
        if (window.tooltips) tooltips.hide(el, {
            onHide: el.onmouseover.bind(el)
        });
        checkbox(el, !checked);
    },
    checkAsGroup: function(el) {
        checkbox(el);
        wall.setReplyAsGroup(el, {
            fromGroup: isChecked(el)
        });
    },
    sendPost: function(skipLocked) {
        var addmedia = cur.wallAddMedia || {},
            media = addmedia.chosenMedia || {},
            medias = cur.wallAddMedia ? addmedia.getMedias() : [],
            share = (addmedia.shareData || {}),
            msg = trim((window.Emoji ? Emoji.editableVal : val)(ge('post_field'))),
            postponePost = false,
            isAnon = Wall.isAnonPost(),
            sendBtn = ge('send_post');

        var pType = cur.options.suggesting ? 'suggest' : cur.wallType;

        if (pType === 'top') {
            pType = 'all';
        }

        var params = {
            act: 'post',
            message: msg,
            to_id: cur.postTo,
            type: pType,
            friends_only: !isAnon && isChecked('friends_only'),
            check_sign: Wall.needCheckSign(),
            status_export: !isAnon && isChecked('status_export'),
            facebook_export: !isAnon && ge('facebook_export') ? (isChecked('facebook_export') ? 1 : 0) : '',
            close_comments: ge('close_comments') ? (isChecked('close_comments') ? 1 : 0) : '',
            mute_notifications: ge('mute_notifications') ? (isChecked('mute_notifications') ? 1 : 0) : '',
            official: (domData(domClosest('_submit_post_box', ge('official')), 'from-oid') == cur.postTo) ? 1 : '',
            signed: isChecked('signed'),
            anonymous: isAnon,
            hash: cur.options.post_hash,
            from: cur.from ? cur.from : '',
            fixed: cur.options.fixed_post_id || ''
        };
        var attachI = 0;

        if (cur.options.additional_save_params) {
            params = extend(params, cur.options.additional_save_params);
        }

        if (isArray(media) && media.length) {
            medias.push(clone(media));
        }

        hide('submit_post_error');

        function showError(errorMessage) {
            ge('submit_post_error').innerHTML = (errorMessage.length > 60 ? ('<div class="msg_text">' + errorMessage + '</div>') : errorMessage);
            if (!isVisible('submit_post_error')) {
                slideDown('submit_post_error', 100);
                animate(ge('box_layer_wrap'), {
                    scrollTop: 0
                });
            }
        }

        if (medias.length) {
            var hasUploadedNewCount = 0;
            var ret = false;
            each(medias, function(k, v) {
                if (!v) return;
                var type = this[0],
                    attachVal = this[1];
                switch (type) {
                    case 'video':
                        // draft only for publics ???
                        var draft = Wall.getOwnerDraft(cur.oid)[1];
                        if (!draft) {
                            break;
                        }

                        each(draft, function(i, attach) {
                            if (attach[1] === attachVal) {
                                var currentAttach = attach[2];
                                if (currentAttach.upload_new) {
                                    hasUploadedNewCount++; // check only unique
                                }
                            }
                        });

                        break;
                    case 'poll':
                        if (isAnon) {
                            return;
                        }

                        var poll = addmedia.pollData();
                        if (!poll) {
                            ret = true;
                            return false;
                        }
                        attachVal = poll.question;
                        delete poll.question;
                        params = extend(params, poll);
                        break;
                    case 'share':
                        if (
                            share.failed ||
                            !share.url ||
                            !share.title && (!share.images || !share.images.length) && !share.photo_url && !share.video
                        ) {
                            if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                                ret = true;
                                return false;
                            } else {
                                return;
                            }
                        }
                        if ((cur.options.share || {}).button_exclusive && share.button_text && share.button_action) {
                            var errorMessage;
                            if (medias.length > 1) {
                                errorMessage = getLang('global_share_too_many_attachments');
                            }
                            if ((msg.split("\n").length - 1) > (cur.options.share || {}).button_exclusive_max_message_newlines) {
                                errorMessage = getLang('global_share_too_many_newlines');
                            }
                            if (msg.length > (cur.options.share || {}).button_exclusive_max_message_len) {
                                errorMessage = getLang('global_share_too_long_message');
                            }

                            var messageUrls = extractUrls(" " + msg + " ");
                            var shareUrl = extractUrls(" " + share.url + " ")[0];
                            if (shareUrl && messageUrls.length) {
                                if (shareUrl.query === '/') {
                                    shareUrl.query = '';
                                }
                                if (shareUrl.domain.substr(0, 4) === 'www.') {
                                    shareUrl.domain = shareUrl.domain.substr(4);
                                }

                                for (var i = 0; i < messageUrls.length; ++i) {
                                    var url = messageUrls[i];
                                    if (url.query === '/') {
                                        url.query = '';
                                    }
                                    if (url.domain.substr(0, 4) === 'www.') {
                                        url.domain = url.domain.substr(4);
                                    }

                                    if (shareUrl.domain != url.domain || shareUrl.query != url.query) {
                                        errorMessage = getLang('global_share_too_many_links');
                                        break;
                                    }
                                }
                            }

                            if (errorMessage) {
                                showError(errorMessage);
                                ret = true;
                                return false;
                            }
                        }

                        if (!share.title) {
                            showError(getLang('global_share_title_required'));
                            ret = true;
                            return false;
                        }

                        if (share.video) {
                            attachVal = share.video_owner_id + '_' + share.video_id;
                            params.snippet_video = 1;
                        } else {
                            attachVal = (share.user_id && share.photo_id && !share.noPhoto) ? share.user_id + '_' + share.photo_id : '';
                        }
                        if (share.share_upload_failed && !attachVal) {
                            share.share_upload_failed = 0;
                            return;
                        }
                        var needUploadShare = share.images && share.images.length &&
                            !isArray(share.images[cur.shareShowImg]) &&
                            !attachVal &&
                            !share.noPhoto &&
                            !share.share_own_image &&
                            !share.video;
                        if (needUploadShare) {
                            lockButton(sendBtn);
                            addmedia.uploadShare(function() {
                                Wall.sendPost(true);
                            });
                            ret = true;
                            return false;
                        }
                        if ((cur.options.share || {}).require_image && !attachVal) {
                            showError(getLang('global_share_image_required'));
                            ret = true;
                            return false;
                        }
                        if (share.initialPattern && (trim(msg) == share.initialPattern)) {
                            params.message = '';
                        }
                        params = extend(params, {
                            url: share.url,
                            mode: share.mode,
                            title: replaceEntities(share.title),
                            description: replaceEntities(share.description),
                            button_text: replaceEntities(share.button_text),
                            button_action: share.button_action,
                            extra: share.extra,
                            extra_data: share.extraData,
                            photo_url: share.noPhoto || share.video ? '' : replaceEntities(share.photo_url),
                            open_graph_data: (share.openGraph || {}).data,
                            open_graph_hash: (share.openGraph || {}).hash
                        });
                        break;
                    case 'page':
                        if (share.initialPattern && (trim(msg) == share.initialPattern)) {
                            params.message = '';
                        }
                        break;
                    case 'postpone':
                        if (isAnon) {
                            return;
                        }

                        var ts = val('postpone_date' + addmedia.lnkId);
                        params = extend(params, {
                            postpone: ts
                        });
                        cur.postponedLastDate = ts;
                        postponePost = true;
                        return;
                    case 'mark_as_ads':
                        params = extend(params, {
                            mark_as_ads: 1
                        });
                        return;
                    case 'pretty_cards':
                        if (!addmedia.prettyCardGallery) {
                            return;
                        }

                        if (addmedia.prettyCardGallery.needSendData()) {
                            addmedia.prettyCardGallery.saveCards(Wall.sendPost, function(response) {
                                showError(response);
                            });
                            ret = true;
                            return false;
                        }

                        var prettyCardsResult = addmedia.prettyCardGallery.getSendData();
                        attachVal = prettyCardsResult.attachVal;

                        break;
                }
                if (this[3] && trim(msg) == this[3]) {
                    params.message = '';
                }

                if (isAnon && type !== 'photo') {
                    return;
                }

                params['attach' + (attachI + 1) + '_type'] = type;
                params['attach' + (attachI + 1)] = attachVal;
                attachI++;
            });

            if (hasUploadedNewCount && !skipLocked && !cur.postponeVideoPost) {
                if (curBox()) {
                    curBox().hide();
                }

                var box = showBox('al_video.php?act=postponed_post_box', {
                    videos_count: hasUploadedNewCount
                }, {
                    onDone: function(box, data) {
                        box.removeButtons();
                        box.addButton(data.video_post_later_text, function() {
                            cur.postponeVideoPost = true;
                            Wall.sendPost(true);
                            box.hide();
                        });
                        box.addButton(data.video_post_now_text, function() {
                            Wall.sendPost(true);
                            box.hide();
                        }, 'no');
                    },
                });
                return;
            }

            if (ret) {
                if (skipLocked) {
                    unlockButton(sendBtn);
                }
                return;
            }
        }
        if (!attachI && !msg) {
            if (skipLocked) {
                unlockButton(sendBtn);
            }

            elfocus('post_field');
            return;
        }

        if (sendBtn && !skipLocked && buttonLocked(sendBtn)) {
            return;
        }

        if (cur.postponeVideoPost) {
            params = extend(params, {
                postpone_video: true,
                postpone_video_hd: isChecked(ge('postponed_post_hd')),
            });
        }

        if (cur.postAutosave) {
            clearTimeout(cur.postAutosave);
        }
        hide('submit_post_error');

        cur.postSent = true;
        setTimeout(function() {
            ajax.post('al_wall.php', Wall.fixPostParams(params), {
                onDone: function(rows, names) {
                    Wall.clearInput();
                    cur.postSent = false;
                    cur.postponeVideoPost = false;

                    if (cur.options.onSendPostDone) {
                        cur.options.onSendPostDone.apply(window, arguments);
                        return;
                    }

                    if (isObject(rows) && rows.redirect) {
                        nav.go(rows.redirect);
                        return
                    }

                    if (postponePost) {
                        if (pType == 'feed') {
                            showDoneBox(rows, {
                                out: 3000
                            });
                        } else if (pType == 'full_own' || pType == 'full_all') {
                            return Wall.showPostponedFull(rows);
                        }
                        wall.updateTabVisibility('page_wall_postponed', true);
                        Wall.showPostponed(false, rows);

                        if (ge('wall_tabs')) {
                            removeClass(ge('wall_tabs'), 'page_tabs_hidden');
                        }
                        return;
                    }
                    if ((pType == 'full_own' || pType == 'full_all') && (cur.pgStart || nav.objLoc.postponed)) {
                        var nloc = clone(nav.objLoc);
                        delete(nloc.offset);
                        delete(nloc.postponed);
                        if (vk.id != cur.oid) {
                            delete(nloc.own);
                        }
                        return nav.go(nloc);
                    }
                    if (vk.id != cur.oid && pType == 'full_own') {
                        var nloc = clone(nav.objLoc);
                        delete(nloc.own);
                        return nav.go(nloc);
                    }
                    if (pType == 'feed') {
                        return cur.wallPostCb();
                    }
                    if (pType == 'suggest') {
                        wall.updateTabVisibility('page_wall_suggest', true);
                        Wall.showSuggested(false, rows, names);

                        return Wall.suggestUpdate();
                    } else if (cur.wallTab == 'suggested') {
                        Wall.showSuggested();
                    } else if (ge('wall_tabs')) {
                        removeClass(ge('wall_tabs'), 'page_tabs_hidden');
                        geByClass1('ui_tab', ge('wall_tabs')).click();
                    }
                    Wall.receive(rows, names);

                    if (cur.onWallSendPost) {
                        cur.onWallSendPost();
                    }
                },
                onFail: function(msg) {
                    cur.postSent = false;
                    cur.postponeVideoPost = false;

                    if (cur.options.onSendPostFail) {
                        cur.options.onSendPostFail.apply(window, arguments);
                        return;
                    }
                    if (!msg) {
                        return true;
                    }
                    ge('submit_post_error').innerHTML = (msg.length > 60 ? '<div class="msg_text">' + msg + '</div>' : msg);
                    if (!isVisible('submit_post_error')) {
                        slideDown('submit_post_error', 100);
                    }
                    return true;
                },
                showProgress: function() {
                    lockButton(sendBtn);
                },
                hideProgress: function() {
                    unlockButton(sendBtn);
                },
                noSort: true
            });
        }, 0);
    },

    _repliesLoaded: function(post, hl, replies, names, data) {
        var r = ge('replies' + post);

        if (!r) return; // fixme: shortcut solution that prevents js error when clicking on name of replied person in comments

        var openEl = r.nextSibling;
        var a = vkNow();
        if (hl) {
            var h = r.offsetHeight;
            r.innerHTML = replies;
            scrollToY(scrollGetY() + (r.offsetHeight - h), 0, undefined, true);
            setTimeout(Wall.scrollHighlightReply.pbind('post' + hl), 0);
        } else {
            r.innerHTML = replies;
        }
        if (openEl && openEl.className == 'replies_open') {
            re(openEl);
        }

        ajax._framenext();

        if (post == cur.wallLayer) {
            var reverse = wkcur.reverse;
            extend(wkcur, {
                offset: !reverse && data.offset || 0,
                loaded: data.num || geByClass('reply', r, 'div').length,
                count: data.count
            });
            extend(wkcur.options.reply_names, names);
            WkView.wallUpdateReplies();
            if (!reverse) {
                wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
                WkView.wallUpdateRepliesOnScroll();
            }
        } else {
            extend(cur.options.reply_names, names);
            Wall.repliesSideSetup(post);
        }
        Wall.updateMentionsIndex();
        setTimeout(function() {
            getAudioPlayer().updateCurrentPlaying();
        }, 10);

        if (data) {
            Likes.updateComments('wall' + post, data.count);
        }
    },
    repliesSideSetup: function(post) {
        if (cur.wallLayer == post) {
            WkView.wallUpdateReplies();
            return;
        }
        var r = ge('replies' + post);
        if (!r) return;

        var header = geByClass1('wr_header', r, 'a'),
            h = r.offsetHeight || 0,
            ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
            side = ge('replies_side' + post);

        if (cur.wallMyOpened[post] && header) {
            if (!side) {
                var sideWrap = se('<div class="replies_side_wrap"><div id="replies_side' + post + '" class="replies_side"></div></div>')
                r.parentNode.insertBefore(sideWrap, r);
                side = sideWrap.firstChild;
                side.onclick = Wall.repliesSideClick.pbind(post);
                side.onmouseover = Wall.repliesSideOver.pbind(post);
                side.onmouseout = Wall.repliesSideOut.pbind(post);
            }
            show(side);
            r.onmouseover = Wall.repliesSideOver.pbind(post);
            r.onmouseout = Wall.repliesSideOut.pbind(post);
            Wall.repliesSideOver(post);
        } else {
            hide(side);
            r.onmouseover = null;
            r.onmouseout = null;
        }
    },
    repliesSideClick: function(post) {
        var postEl = ge('post' + post),
            r = ge('replies' + post),
            header = r && geByClass1('wr_header', r, 'a'),
            st = scrollGetY(),
            pos = getXY(r)[1];

        if (st > pos) {
            scrollToY(pos - 100, 0);
        }
        hide('replies_side' + post);
        return Wall.showReplies(post, 3, false);
    },
    repliesSideOver: function(post) {
        var r = ge('replies' + post),
            side = ge('replies_side' + post);
        if (!r) return;

        var sideTop = getXY(domPN(side))[1],
            sideH = getSize(side)[1],
            repliesTop = getXY(r)[1],
            repliesH = r.offsetHeight,
            wh = window.lastWindowHeight || 0;

        var minOffset = 16,
            minSt = sideTop + sideH - wh + 15,
            maxSt = repliesTop + repliesH - wh;


        cur.wallRepliesSideOver = [
            post,
            side,
            minSt,
            maxSt
        ];
        Wall.repliesSideUpdate();
    },
    repliesSideOut: function(post) {
        if (cur.wallRepliesSideOver && cur.wallRepliesSideOver[0] == post) {
            delete cur.wallRepliesSideOver;
        }
    },

    repliesSideUpdate: function(st) {
        var postData = cur.wallRepliesSideOver;
        if (!postData) return;

        var side = postData[1],
            curStyle = postData[4] || {},
            newStyle,
            curClass = postData[5] || '',
            newClass = 'replies_side';
        if (st === undefined) {
            st = scrollGetY();
        }
        if (st < postData[2]) {
            newStyle = {
                marginTop: 0,
                opacity: 1
            };
        } else if (st < postData[3]) {
            newClass += ' replies_side_fixed';
            newStyle = {
                opacity: Math.max(0, Math.min(1, (postData[3] - st) / 200))
            };
        } else {
            newClass += ' replies_side_hidden';
            newStyle = {
                marginTop: postData[3] - postData[2],
                opacity: 0
            };
        }
        if (JSON.stringify(curStyle) !== JSON.stringify(newStyle)) {
            each(curStyle, function(i, k) {
                curStyle[i] = null;
            });
            setStyle(side, extend(curStyle, newStyle));
            postData[4] = newStyle;
        }
        if (curClass != newClass) {
            if (side) {
                side.className = newClass;
            }
            postData[5] = newClass;
        }
    },
    highlightReply: function(el) {
        el = ge(el);
        if (!el) return;

        addClass(el, 'reply_highlighted');
        setTimeout(function() {
            removeClass(el, 'reply_highlighted');
        }, 1500);
    },
    scrollHighlightReply: function(el) {
        el = ge(el);
        if (!el) return;

        var hlfunc = function() {
            addClass(el, 'reply_highlighted');
            setTimeout(function() {
                removeClass(el, 'reply_highlighted');
            }, 1500);
        };

        if (cur.wallLayer || el.id.match(/^post-?\d+(photo|video|market)?_\d+$/) && (window.wkcur && wkcur.shown || window.mvcur && mvcur.mvShown || cur.pvShown)) {
            var top = getXY(el, true)[1];
            if (top < 0 || top > lastWindowHeight - 200) {
                animate(wkLayerWrap, {
                    scrollTop: wkLayerWrap.scrollTop + top - 50
                }, 300, Wall.highlightReply.pbind(el));
            } else {
                Wall.highlightReply(el);
            }
            return;
        }

        var xy = getXY(el),
            top = xy[1],
            st = scrollGetY() + getSize('page_header')[1];
        if (top < st) {
            scrollToY(top, 300);
            setTimeout(Wall.highlightReply.pbind(el), 300);
        } else {
            Wall.highlightReply(el);
        }
    },
    showReply: function(el, post, reply, ev) {
        if (cur.viewAsBox) return false;
        if (ev && checkEvent(ev)) return true;
        if (window.mvcur && mvcur.post == post) {
            Videoview.showComment(reply);
            return false;
        }
        var p = ge('post' + reply);
        if (p) {
            Wall.scrollHighlightReply(p);
        } else {
            if (cur.wallLayer == post) {
                WkView.wallShowPreviousReplies(reply);
            } else if (post.match(/market/)) {
                Market.comments(post);
            } else {
                el.tt && el.tt.hide && el.tt.hide();
                if (cur.wallType == 'full') {
                    var replyId = reply.split('_');
                    delete nav.objLoc.offset;
                    return nav.go(extend(nav.objLoc, {
                        reply: replyId[1]
                    }));
                } else {
                    Wall.showReplies(post, false, reply);
                }
            }
        }
        return false;
    },
    showReplies: function(post, count, hl, ev) {
        if (checkEvent(ev || window.event)) {
            return true;
        }
        if (cur.viewAsBox) return cur.viewAsBox();
        if (cur.wallLayer == post && wkcur.reverse) {
            return;
        }
        cur.wallMyOpened[post] = (count != 3);
        var params = {
                act: 'get_replies',
                post: post,
                count: count
            },
            opts = {
                onDone: Wall._repliesLoaded.pbind(post, hl),
                showProgress: lockButton.pbind('wrh' + post),
                hideProgress: unlockButton.pbind('wrh' + post),
                local: 1
            };
        if (!hl && (!count || count > 20)) {
            extend(params, {
                cont: 'replies' + post
            });
            extend(opts, {
                frame: 1
            });
            cur.onFrameBlocksDone = /*vkLocal(*/ function() {
                setTimeout(Wall.repliesSideSetup.pbind(post), browser.msie ? 100 : 10);
            } /*)*/
        }
        ajax.post('al_wall.php', params, opts);

        if (!browser.msie && count > 0 && count < 10) {
            var cont = ge('replies' + post),
                el = cont && cont.lastChild,
                slice = [];
            while (slice.length < count && el) {
                if (el.tagName == 'DIV' && hasClass(el, 'reply')) {
                    slice.push(el);
                }
                el = el.previousSibling;
            }
            if (slice.length == count) {
                var total = geByClass('reply', cont, 'div').length;
                val(cont, '<a class="wr_header wrh_all"></a>');
                Wall.updateRepliesHeader(post, cont.firstChild, count, total);
                hide('replies_side' + post);
                while (slice.length) {
                    cont.appendChild(slice.pop());
                }
                lockButton('wrh' + post);
            }
        }
        return false;
    },
    moreReplies: function(post, offset, count, opts) {
        var params = {
            act: 'get_replies',
            offset: offset,
            post: post,
            count: count
        };
        extend(params, {
            rev: opts.rev,
            from: opts.from
        });

        ajax.post('al_wall.php', params, {
            onDone: function(replies, names, data) {
                var r = ge('replies' + post);
                if (opts.clear) {
                    // r.removeChild(r.firstChild); // remove header
                    r.innerHTML = replies;
                } else if (opts.rev || opts.append) {
                    r.appendChild(cf(replies))
                } else {
                    // r.removeChild(r.firstChild); // remove header
                    r.innerHTML = replies + r.innerHTML;
                }
                extend((post == cur.wallLayer ? wkcur : cur).options.reply_names, names);
                if (opts.onDone) {
                    opts.onDone(replies, names, data);
                }
                Wall.updateMentionsIndex();
            },
            showProgress: opts.showProgress,
            hideProgress: opts.hideProgress
        });
        return false;
    },
    emojiOpts: {},
    getReplyName: function(id) {
        if (cur.pvShown && cur.pvReplyNames) {
            return cur.pvReplyNames[id] || [];
        }

        if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
            return mvcur.mvReplyNames[id] || [];
        }

        var data = {},
            options, replyNames;

        if (cur.wallLayer) {
            data = wkcur;
        } else {
            data = cur;
        }

        replyNames = (data.options || {}).reply_names;
        replyNames = replyNames || {};

        return replyNames[id] || [];
    },
    emojiShowTT: function(post, obj, ev) {
        if (Wall.emojiOpts[post] === undefined) {
            return false;
        }
        return Emoji.ttShow(Wall.emojiOpts[post], obj, ev);
    },
    emojiHideTT: function(post, obj, ev) {
        if (Wall.emojiOpts[post] === undefined) {
            return false;
        }
        return Emoji.ttHide(Wall.emojiOpts[post], obj, ev);
    },
    initReplyEditable: function(txt, cont, post, fixed) {
        if (txt.emojiInited) {
            return false;
        }

        txt.emojiInited = true;
        stManager.add(['emoji.js', 'notifier.css'], function() {
            var optId = Emoji.init(txt, {
                ttDiff: fixed ? -40 : -42,
                rPointer: true,
                controlsCont: cont,
                shouldFocus: true,
                ref: 'reply',
                onSend: function() {
                    Wall.sendReply(post);
                    txt.blur();
                },
                ctrlSend: function() {
                    return Wall.customCur().wallTpl.reply_multiline || Wall.composerListShown(txt);
                },
                //sharedTT: cur.sharedIm,
                checkEditable: function() {
                    if (cur.onReplyChanged) {
                        cur.onReplyChanged(txt, post);
                    }

                    Wall.checkTextLen(txt, 'reply_warn' + post);
                },
                onStickerSend: function(stNum, sticker_referrer) {
                    Wall.sendReply(post, false, {
                        stickerId: stNum,
                        sticker_referrer: sticker_referrer
                    });
                },
                initUploadForImagePasteCallback: Page.initUploadForImagePaste
            });
            vk.widget && !window.emojiStickers && Emoji.updateTabs();
            Wall.emojiOpts[post] = optId;
            if (cur.afterEmojiInit && cur.afterEmojiInit[post]) {
                var sm = geByClass1('emoji_smile', Emoji.opts[optId].controlsCont);
                if (isVisible(sm)) {
                    cur.afterEmojiInit[post]();
                    delete cur.afterEmojiInit[post];
                }
            }
        });
    },
    showEditReply: function(post, ev, fixed) {
        if (cur.viewAsBox) {
            setTimeout(function() {
                ge('reply_field' + post).blur()
            }, 0);
            return cur.viewAsBox();
        }

        var rf = ge('reply_field' + post);
        var postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post);
        var fakeBox = ge('reply_fakebox' + post);
        var realBox = ge('reply_box' + post);

        if (!postEl && fakeBox) {
            postEl = gpeByClass('_post_wrap', fakeBox);
        } else if (!postEl && realBox) {
            postEl = gpeByClass('_post_wrap', realBox);
        }

        if (fakeBox) {
            var postHash = ge('post_hash' + post),
                canReplyAsGroup = intval(postHash && postHash.getAttribute('can_reply_as_group')) > 0,
                ownerPhoto = domData(fakeBox, 'owner-photo') || '',
                ownerHref = domData(fakeBox, 'owner-href') || '',
                ownerName = domData(fakeBox, 'owner-name') || '',
                tpl = canReplyAsGroup ? cur.wallTpl.reply_form_official_placeholder : (post.match(/^(-?\d+)_(\d+)$/) ? cur.wallTpl.reply_form_official : '');

            realBox = se(rs(cur.wallTpl.reply_form, {
                add_buttons: rs(tpl, {
                    post_id: post,
                    oid: intval(post),
                    owner_photo: ownerPhoto || '/images/blank.gif'
                }),
                post_id: post,
                oid: intval(post),
                owner_photo: ownerPhoto,
                owner_href: ownerHref,
                owner_name: clean(unclean(ownerName))
            }));
            fakeBox.parentNode.replaceChild(realBox, fakeBox);
            rf = ge('reply_field' + post);
        }
        Wall.initReplyEditable(rf, realBox, post, fixed);
        if (cur.wallMyOpened) {
            cur.wallMyOpened[post] = cur.wallMyOpened[post] || false;
        }

        if (cur.editing === post) {
            Emoji.editableFocus(rf, false, true);
            return false;
        }
        Wall.hideEditPostReply();
        addClass(postEl, 'reply_box_open');
        setStyle('replies_wrap' + post, {
            display: ''
        });

        cur.editing = post;
        if (window.Emoji) {
            setTimeout(function() {
                Emoji.editableFocus(rf, false, true);
                Wall.repliesSideOver(post);
            }, 0);
        }

        if (!data(rf, 'composer')) {
            var mediaTypes = [];
            var rawTypes;
            var maxShown, hideAfterCount;
            if (window.mvcur && mvcur.mvShown) {
                rawTypes = mvcur.mvMediaTypes;
            } else if (cur.wallLayer == post) {
                rawTypes = wkcur.options.rmedia_types;
            } else if (window.pvcur && cur.pvShown) {
                rawTypes = pvcur.rmedia_types;
                maxShown = 0;
                hideAfterCount = 0;
            } else {
                rawTypes = cur.options.rmedia_types;
            }
            each(rawTypes || cur.options.media_types || [], function() {
                if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link', 'page'])) {
                    mediaTypes.push(this);
                }
            });
            var media, toup = false;
            if (mediaTypes.length > 0 && (post.match(/^(\d+_)?-?\d+_(photo|video|topic|market)?\d+(mv)?(_\d+)?$/))) {
                media = {
                    lnk: ge('reply_add_media_' + post),
                    preview: ge('reply_media_preview' + post),
                    types: mediaTypes,
                    options: {
                        from: 'comment',
                        limit: 2,
                        disabledTypes: ['album', 'market'],
                        toggleLnk: true,
                        maxShown: maxShown !== undefined ? maxShown : undefined,
                        hideAfterCount: hideAfterCount !== undefined ? hideAfterCount : undefined
                    }
                };
                if (post.match(/^-?\d+_topic/)) {
                    extend(media.options, {
                        disabledTypes: ['album', 'share', 'link', 'page'],
                        limit: 10,
                        editable: 1,
                        sortable: 1,
                        teWidth: 280,
                        teHeight: 200
                    });
                    toup = true;
                }
            } else {
                re('reply_add_media_' + post);
            }
            Wall.initComposer(rf, {
                lang: {
                    introText: getLang('profile_mention_start_typing'),
                    noResult: getLang('profile_mention_not_found')
                },
                toup: toup,
                wddClass: 'reply_composer_dd',
                width: getSize(rf.parentNode)[0],
                media: media,
                isReply: true,
            });
        }
        triggerEvent(window, 'scroll');
        if (rf.emojiId !== undefined && cur.afterEmojiInit && cur.afterEmojiInit[post]) {
            cur.afterEmojiInit[post]();
            delete cur.afterEmojiInit[post];
        }

        if (cur.wallTpl && cur.wallTpl.reply_multiline_intro) {
            ajax.post('al_wall.php', {
                act: 'a_ctrl_submit_intro',
                hash: cur.wallTpl.poll_hash
            }, {
                onDone: function(perform) {
                    if (perform && cur.editing === post) {
                        Wall.replySubmitTooltip(post, 1);
                    }
                },
                onFail: function() {
                    return true;
                }
            })
        }

        if (window.mvcur && mvcur.post == post) {
            Videoview.onShowEditReply();
        }

        if (isFunction(cur.onReplyFormSizeUpdate)) {
            cur.onReplyFormSizeUpdate(rf);
        }

        if (isFunction(cur.onReplyFormFocus)) {
            cur.onReplyFormFocus(rf);
        }

        return false;
    },
    hideEditReply: function(post, force) {
        cur.editing = false;

        var rf = ge('reply_field' + post),
            postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post),
            realBox = ge('reply_box' + post),
            replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
            v = trim(window.Emoji ? Emoji.editableVal(rf) : ''),
            hasMedia = Wall.hasComposerMedia(rf),
            replyLink;
        if (!postEl && realBox) {
            postEl = gpeByClass('_post_wrap', realBox);
        }

        if (!rf || hasMedia && !force) return;
        if (replyName && isArray(replyName)) {
            if (!v || !replyName[1].indexOf(v)) {
                val(rf, '');
                v = '';
            }
        }
        if (force && (v || hasMedia)) {
            var composer = rf && data(rf, 'composer');
            if (composer) {
                Composer.reset(composer);
            } else {
                val(rf, '');
            }
            v = '';
            hide(geByClass1('reply_warn', postEl));
        }
        if (browser.opera_mobile || browser.safari_mobile || v) return;

        removeClass(postEl, 'reply_box_open');
        if (replyLink = ge('reply_link' + post)) {
            hide('replies_wrap' + post);
        }
        if (window.tooltips && realBox) {
            tooltips.hideAll(realBox);
        }
        rf.blur();
        triggerEvent(window, 'scroll');
        val('reply_to' + post, '');
        hide('reply_to_title' + post);
        cur.reply_to = false;

        cur.onReplyFormSizeUpdate && cur.onReplyFormSizeUpdate();

        var point = cur.replySubmitSettings;
        point && point.tt && point.tt.el && point.tt.destroy();

        if (window.mvcur && mvcur.post == post) {
            Videoview.onHideEditReply();
        }
    },
    replyNamesRE: function() {
        var names = ((cur.wallLayer ? wkcur : cur).options || {}).reply_names;
        if (!names) return false;
        var greetings = [];
        each(names, function() {
            if (this[1] && typeof this[1] == 'string') {
                greetings.push(escapeRE(this[1]));
            }
        });
        return new RegExp('^(' + greetings.join('|') + ')');
    },
    replyTo: function(post, toMsgId, toId, event) {
        var cur = window.cur.wallLayer == post ? wkcur : window.cur;
        Wall.showEditReply(post, event);
        val('reply_to' + post, toMsgId);
        var replyNameOld = cur.reply_to && Wall.getReplyName(cur.reply_to[0]);
        cur.reply_to = [toId, toMsgId];
        var replyName = Wall.getReplyName(toId);

        var replyAs = ge('reply_as_group' + post);
        var replyParts = post.match(/^(-?\d+)_([a-z]+)?(\d+)([a-z]+)?$/);
        var replyOid = replyParts[1];
        var replyType = replyParts[2] || '';
        var replyAt = replyParts[4] || '';
        var reply = ge('post' + replyOid + replyType + '_' + toMsgId);
        var replyTo = reply && geByClass1('reply_to', reply, 'a');
        var re = Wall.replyNamesRE();

        var replyNameFirst = isArray(replyName) ? replyName[0] : replyName;
        replyNameFirst = '<a class="reply_to_mem" onclick="return wall.showReply(this, \'' + post + '\', \'' + replyOid + replyType + '_' + toMsgId + replyAt + '\', event);">' + replyNameFirst + '</a>';
        var value = '<span class="reply_to_cancel" onclick="return Wall.cancelReplyTo(\'' + post + '\', event);"></span><div class="reply_to_label">' + langStr(getLang('global_reply_to'), 'user', replyNameFirst) + '</div>';
        val('reply_to_title' + post, value);

        if (isArray(replyName) && window.Emoji) {
            var rf = ge('reply_field' + post);
            var v = clean(trim(Emoji.val(rf)));
            v = v.replace(/&nbsp;/g, ' ');
            if (!v || replyNameOld && isArray(replyNameOld) && !winToUtf(replyNameOld[1]).indexOf(winToUtf(v))) {
                Emoji.val(rf, replyName[1]);
            } else if (re) {
                v = v.replace(re, replyName[1]);
                Emoji.val(rf, v);
            }
            Emoji.focus(rf, true);
        }
        show('reply_to_title' + post);

        if (replyAs) {
            var onBehalfGroup = isVisible(replyAs.parentNode) && replyOid < 0 && replyTo && replyTo.getAttribute('rid') === replyOid;
            Wall.setReplyAsGroup(replyAs, {
                from: (onBehalfGroup ? replyOid : vk.id)
            });
        }

        cur.onReplyFormSizeUpdate && cur.onReplyFormSizeUpdate();

        stopEvent(event);
        return false;
    },
    cancelReplyTo: function(post, event) {
        var cur = window.cur.wallLayer == post ? wkcur : window.cur,
            rf = ge('reply_field' + post),
            replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
            v = clean(trim(window.Emoji ? Emoji.editableVal(rf) : '')),
            re = Wall.replyNamesRE();
        if (isArray(replyName) && window.Emoji) {
            if (!v || !replyName[1].indexOf(v)) {
                v = '';
                Emoji.val(rf, v);
            } else if (re) {
                v = v.replace(re, '');
                Emoji.val(rf, v);
            }
            Emoji.focus(rf, true);
        }
        val('reply_to' + post, '');
        hide('reply_to_title' + post);
        if (window.mvcur && mvcur.post == post) {
            mvcur.mvReplyTo = false;
        } else {
            cur.reply_to = false;
        }

        if (cur.onReplyFormSizeUpdate && isFunction(cur.onReplyFormSizeUpdate)) {
            cur.onReplyFormSizeUpdate(rf);
        }

        stopEvent(event);
        return false;
    },
    replySubmitTooltip: function(post, over, place) {
        var cur = post && window.cur.wallLayer == post ? wkcur : window.cur,
            box = post && ge('reply_box' + post),
            hintPlace = box && geByClass1('button_blue', box, 'div'),
            point = cur.replySubmitSettings;

        if (place && hintPlace && isVisible(hintPlace)) {
            return
        }
        place = place || hintPlace;
        if (hasClass(place, 'flat_button') && buttonLocked(place)) {
            return;
        }


        if (!point) {
            point = cur.replySubmitSettings = ce('div', {
                className: 'reply_submit_hint_tt_point'
            });
        }
        if (!over) {
            if (point && point.tt && point.tt.hide) {
                point.tt.hide();
            }
            return;
        }

        if (!place) {
            return;
        }

        if (point.parentNode == place && point.tt && point.tt.show) {
            point.tt.show();
            return;
        }

        point.tt && point.tt.el && point.tt.destroy();
        place.insertBefore(point, place.firstChild);
        var ctrlSubmit = Wall.customCur().wallTpl.reply_multiline ? 1 : 0,
            hint = rs(Wall.customCur().wallTpl.reply_multiline_hint, {
                enabled: ctrlSubmit ? 'on' : '',
                disabled: !ctrlSubmit ? 'on' : ''
            });

        showTooltip(point, {
            text: hint,
            typeClass: 'tt_default_right',
            slide: 15,
            shift: [0, 8],
            asrtl: 1,
            hasover: 1,
            toup: false,
            showdt: 700,
            hidedt: 700,
            dir: 'auto',
            noZIndex: true,
            onCreate: function() {
                radioBtns.reply_submit = {
                    els: Array.prototype.slice.apply(geByClass('radiobtn', ge('reply_submit_hint_opts'))),
                    val: hint ? 1 : 0
                };
            }
        });
    },
    onReplySubmitChanged: function(value, from) {
        cur.wallTpl.reply_multiline = value;
        if (Wall.customCur().wallTpl) {
            Wall.customCur().wallTpl.reply_multiline = value;
        }
        if (from) {
            var point = cur.replySubmitSettings;
            point && point.tt && point.tt.el && point.tt.destroy();
        } else {
            ajax.post('al_wall.php', {
                act: 'a_save_ctrl_submit',
                value: value,
                hash: Wall.customCur().wallTpl.poll_hash
            });
            window.Notifier && Notifier.lcSend('wall_reply_multiline', {
                value: value
            });
        }
    },
    getReplyFromId: function(post) {
        var fromGroupEl = ge('reply_as_group' + post);

        if (fromGroupEl && isVisible(fromGroupEl.parentNode)) {
            return domData(domClosest('_submit_post_box', fromGroupEl), 'from-oid');
        }

        return false;
    },
    sendReply: function(post, ev, options) {
        options = extend({}, options);

        if (window.mvcur && mvcur.post == post) {
            return Videoview.sendComment(post, ev, options.stickerId);
        }

        var wallLayer = (window.cur.wallLayer == post),
            cur = wallLayer ? wkcur : window.cur,
            rf = ge('reply_field' + post),
            composer = rf && data(rf, 'composer'),
            replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
            state;

        var _send = rf && data(rf, 'send');
        if (_send && isFunction(_send)) {
            return _send(post, ev, options);
        }

        if (options.stickerId) {
            var params = {
                message: '',
                attach1_type: "sticker",
                attach1: options.stickerId,
                sticker_referrer: options.sticker_referrer
            };
        } else if (options.suggest) {
            var params = {
                message: options.suggest
            };
        } else {
            var params = composer ? Composer.getSendParams(composer, Wall.sendReply.pbind(post)) : {
                message: trim(Emoji.editableVal(rf))
            };
            if (params.delayed) {
                return;
            }

            if (!params.attach1_type) {
                if (!params.message ||
                    isArray(replyName) && !replyName[1].indexOf(params.message)) {
                    Emoji.editableFocus(ge('reply_field' + post), false, true);
                    return;
                }
            }

            if (composer) {
                state = Composer.reset(composer);
            } else if (window.Emoji) {
                Emoji.val(rf, '');
            }
            if (rf.autosize) {
                rf.autosize.update();
            }
        }

        cur.wallMyOpened = cur.wallMyOpened || {};

        cur.wallMyReplied[post] = 1;
        cur.wallMyOpened[post] = 1;
        var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash,
            newEl = null;

        extend(params, {
            act: 'post',
            type: cur.wallType,
            reply_to: post,
            reply_to_msg: val('reply_to' + post),
            reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
            start_id: val('start_reply' + post),
            from: wallLayer && 'wkview' || '',
            hash: post_hash
        });
        if (cur.reverse) {
            params.rev = 1;
        }

        var fromOid = wall.getReplyFromId(post);
        if (fromOid) {
            params.from_oid = fromOid;
        }

        if (cur.wallType) {
            if (cur.wallType == 'feed') {
                if (cur.section == 'news') {
                    ref = 'feed_' + (cur.subsection ? cur.subsection : cur.section)
                } else if (cur.section == 'recommended') {
                    ref = 'feed_recommended' + (cur.subsection != 'recent' ? ('_' + cur.subsection) : '')
                } else if (['friends', 'groups', 'videos', 'photos', 'list'].indexOf(cur.section) !== -1) {
                    ref = 'feed_' + cur.section + (cur.subsection ? '_' + cur.subsection : '');
                } else {
                    ref = 'feed_' + cur.section
                }
            } else if (cur.wallType == 'top') {
                ref = 'wall_top';
            } else {
                ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'))
            }
        } else {
            ref = cur.module;
        }
        extend(params, {
            ref: ref
        });

        if (browser.mobile) {
            Wall.hideEditReply(post);
        } else {
            Emoji.editableFocus(rf, false, true);
            Wall.cancelReplyTo(post, ev);
        }

        ajax.post('al_wall.php', Wall.fixPostParams(params), {
            onDone: function(reply, replies, names, data) {
                if (cur.wallType == 'full') {
                    return FullWall.onReplySent.apply(window, arguments);
                }
                cur.wallMyReplied[post] = 0;
                re('reply_link' + post);
                hide('reply_warn' + post);
                Wall._repliesLoaded(post, false, replies, names, data);
                Wall.processPostReplyActions(reply);
            },
            onFail: function() {
                newEl && re(newEl);
                if (composer) {
                    state = Composer.restore(composer, state);
                } else {
                    val(rf, params.message);
                }
                if (rf.autosize) rf.autosize.update();
            },
            showProgress: lockButton.pbind(ge('reply_button' + post)),
            hideProgress: unlockButton.pbind(ge('reply_button' + post))
        });

        if (window.cur.onPostReply) {
            window.cur.onPostReply(post);
        }

        if (params.from_oid || !params.message) return;

        var repliesEl = ge('replies' + post),
            replyId = -(++cur.wallMyRepliesCnt);

        var message = Emoji.emojiToHTML(clean(params.message), true),
            toName = params.reply_to_user < 0 ? getLang('wall_replied_to_group') : cur.options.reply_names[params.reply_to_user] && cur.options.reply_names[params.reply_to_user][0],
            toLnk = toName ? rs(cur.wallTpl.reply_link_to, {
                to_user: toName
            }) : '';
        newEl = se(rs(cur.wallTpl.reply_fast, {
            reply_id: '0_' + replyId,
            message: message.replace(/\n/g, '<br/>'),
            to_link: toLnk,
            date: Wall.getNowRelTime(cur)
        }));

        if (repliesEl && !isVisible(repliesEl) || ge('reply_link' + post)) {
            re('reply_link' + post);
            show('replies_wrap' + post);
        } else if (!cur.onepost) {
            var openEl = repliesEl.nextSibling;
            if (openEl && openEl.className == 'replies_open') {
                Wall.openNewComments(post);
            }
            if (!wallLayer) {
                var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                    shown = geByClass('reply', repliesEl, 'div').length + 1,
                    total = shown;
                if (headerEl) {
                    total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
                }
                if (total > 5 || shown < total) {
                    if (!headerEl) {
                        repliesEl.insertBefore(headerEl = ce('a', {
                            className: 'wr_header'
                        }), repliesEl.firstChild);
                    }
                    Wall.updateRepliesHeader(post, headerEl, shown, total);
                }
            }
        }
        if (cur.reverse) {
            repliesEl.insertBefore(newEl, repliesEl.firstChild);
        } else {
            repliesEl.appendChild(newEl);
        }

        if (wallLayer) {
            WkView.wallUpdateReplies();
            if (!cur.reverse) {
                wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
                WkView.wallUpdateRepliesOnScroll();
            }
        }
    },
    postTooltip: function(el, post, opts, tooltipOpts) {
        if (cur.viewAsBox) return;
        var reply = (opts || {}).reply,
            extraClass = (opts || {}).className || '',
            toRight = (reply && !(reply % 2)) && getXY(el)[0] > 420;
        tooltipOpts = tooltipOpts || {};
        if (!reply) {
            tooltipOpts.appendEl = bodyNode;
        }
        showTooltip(el, extend({
            url: 'al_wall.php',
            params: extend({
                act: 'post_tt',
                post: post
            }, opts || {}),
            slide: 15,
            shift: [toRight ? 417 : 27, 6, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: 'auto',
            className: 'rich wall_tt' + extraClass,
            typeClass: (toRight ? 'tt_default_right' : 'tt_default')
        }, tooltipOpts));
    },

    adsMarkTooltip: function(el) {
        if (cur.viewAsBox) return;

        showTooltip(el, {
            black: 1,
            shift: [15, 7, 0],
            text: el.getAttribute('data-tooltip')
        });
    },

    hideEditPostReply: function(e, noLayerCheck) {
        if (cur.editing === false || !noLayerCheck && (isVisible(boxLayerBG) || isVisible(layerBG))) return;
        var el = (e && e.target) ? e.target : {};
        var id = el.id;
        if (cur.editing) {
            if (cur.editingHide) {
                cur.editingHide(cur.editing, el);
            } else if (!e || !domClosest('_reply_wrap', el) && !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
                Wall.hideEditReply(cur.editing);
            }
        } else if (!(cur.wallAddMedia || {}).chosenMedia) {
            if (!e || id != 'post_field') {
                Wall.hideEditPost();
            }
        }
    },
    deletePost: function(el, post, hash, root, force) {
        (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 1;
        var r = ge('post' + post),
            actionsWrap = geByClass1('post_actions', r);

        var params = {
            act: 'delete',
            post: post,
            hash: hash,
            root: root ? 1 : 0,
            confirm: force ? 1 : 0,
            from: 'wall'
        };

        if (cur.suggestedDeletedCount && cur.suggestedDeletedCount >= 2) {
            params.delete_all = 1;
        }

        ajax.post('al_wall.php', params, {
            onDone: function(msg, res, need_confirm) {
                if (need_confirm) {
                    var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() {
                        box.hide();
                        wall.deletePost(el, post, hash, root, 1);
                    }, getLang('box_cancel'));
                    return;
                }
                var t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
                revertLastInlineVideo(t);
                var pd = ge('post_del' + post);
                if (pd) {
                    pd.innerHTML = '<span class="dld_inner">' + msg + '</span>';
                    show(pd);
                } else {
                    r.appendChild(ce('div', {
                        id: 'post_del' + post,
                        className: 'dld',
                        innerHTML: '<span class="dld_inner">' + msg + '</span>'
                    }));
                }
                hide(t);
                if (domNS(t).className == 'post_publish') hide(domNS(t));
                if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
                    Pagination.recache(-1);
                    FullWall.updateSummary(cur.pgCount);
                } else if (cur.wallType == 'full') {
                    if (hasClass(r, 'reply')) {
                        cur.pgOffset--;
                        cur.pgCount--;
                        FullWall.repliesSummary(cur.pgCount);
                    }
                }

                var publishWrapEl = ge('post_publish_wrap' + post);
                if (publishWrapEl && domData(publishWrapEl, 'suggest')) {
                    if (cur.suggestedDeletedCount === void 0) {
                        cur.suggestedDeletedCount = 0;
                    }
                    cur.suggestedDeletedCount++;
                }

                if (hasClass(r, 'suggest')) {
                    Wall.suggestUpdate(-1);
                } else if (hasClass(r, 'postponed')) {
                    wall.postponeUpdateCount();
                } else if (cur.wallType == 'own' || cur.wallType == 'all') {
                    if (hasClass(r, 'own')) ++cur.deletedCnts.own;
                    if (hasClass(r, 'all')) ++cur.deletedCnts.all;
                    Wall.update();
                }
            },
            showProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                    lockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                    lockButton(el);
                } else {
                    addClass(actionsWrap, 'post_actions_progress');
                }
            },
            hideProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                    unlockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                    unlockButton(el);
                } else {
                    removeClass(actionsWrap, 'post_actions_progress');
                }
            }
        });
        var btn = ge('delete_post' + post),
            myReply;
        if (btn && btn.tt && btn.tt.el) {
            btn.tt.destroy();
        }
    },

    /**
     * �������� �� �������
     *
     * @param el
     * @param post
     * @param hash
     * @param inline
     */
    markAsSpam: function(el, post, hash, inline) {
        ajax.post('al_wall.php', {
            act: 'spam',
            post: post,
            hash: hash,
            from: inline ? 'inline' : ''
        }, {
            onDone: function(msg, js) {
                if (inline) {
                    domPN(el).replaceChild(ce('div', {
                        innerHTML: msg
                    }), el);
                } else {
                    var r = ge('post' + post),
                        t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
                    revertLastInlineVideo(r);
                    var pd = ge('post_del' + post);
                    if (pd) {
                        pd.innerHTML = '<span class="dld_inner">' + msg + '</span>';
                        show(pd);
                    } else {
                        r.appendChild(ce('div', {
                            id: 'post_del' + post,
                            className: 'dld',
                            innerHTML: '<span class="dld_inner">' + msg + '</span>'
                        }));
                    }
                    hide(t);
                }
                if (js) {
                    eval(js);
                }
            },
            showProgress: function() {
                if (el && hasClass(el, 'ui_actions_menu_item')) {
                    lockActionsMenuItem(el);
                } else if (inline) {
                    hide(el);
                    show(domNS(el) || domPN(el).appendChild(ce('span', {
                        className: 'progress_inline'
                    })));
                }
            },
            hideProgress: function() {
                if (el && hasClass(el, 'ui_actions_menu_item')) {
                    unlockActionsMenuItem(el);
                } else if (inline) {
                    show(el);
                    re(domNS(el));
                }
            },
            stat: ['privacy.js', 'privacy.css']
        });
        var btn = ge('delete_post' + post);
        if (btn && btn.tt && btn.tt.el) {
            btn.tt.destroy();
        }
    },

    ignoreAdsItem: function(post_raw, feed_raw, hash) {
        var postEl = ge('post' + post_raw),
            adData = postEl.getAttribute('data-ad'),
            actMenu = geByClass1('ui_actions_menu_wrap', postEl);
        if (!postEl) {
            return;
        }
        actMenu && uiActionsMenu.toggle(actMenu, false);
        revertLastInlineVideo(postEl);
        ajax.post('/al_feed.php?misc', {
            act: 'a_ignore_item',
            post_raw: post_raw,
            feed_raw: feed_raw,
            hash: hash,
            ad_data: adData,
            no_html: 1
        }, {
            onDone: function() {
                hide(postEl);
            }
        });
    },
    ignoreAdsOwner: function(post_raw, owner_id, hash, btn) {
        var postEl = ge('post' + post_raw);
        if (!postEl) {
            return;
        }
        ajax.post('/al_feed.php?misc', {
            act: 'a_ignore_owner',
            post_raw: post_raw,
            owner_id: owner_id,
            hash: hash,
            list: 0,
            no_html: 1
        }, {
            onDone: function(html) {
                hide(postEl);
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    markAsAds: function(post, hash, el, fullPost) {
        ajax.post('al_wall.php', {
            act: 'mark_as_ads',
            post: post,
            hash: hash,
            full: intval(fullPost)
        }, {
            onDone: function(msg) {
                ge('ui_actions_menu_item_mark_as_ads' + post).innerHTML = msg;
            }
        });
    },
    restorePost: function(post, hash, root) {
        (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 0;
        ajax.post('al_wall.php', {
            act: 'restore',
            post: post,
            hash: hash,
            root: root ? 1 : 0
        }, {
            onDone: function(msg) {
                re('post_del_btn' + post);
                var pd = ge('post_del' + post);
                if (!pd) return;
                var r = ge('post' + post),
                    t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
                show(t);
                if (domNS(t).className == 'post_publish') show(domNS(t));
                re(pd);

                if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
                    Pagination.recache(1);
                    FullWall.updateSummary(cur.pgCount);
                } else if (cur.wallType == 'full') {
                    if (hasClass(r, 'reply')) {
                        cur.pgOffset++;
                        cur.pgCount++;
                        FullWall.repliesSummary(cur.pgCount);
                    }
                }

                if (hasClass(r, 'suggest')) {
                    Wall.suggestUpdate(1);
                } else if (hasClass(r, 'postponed')) {
                    wall.postponeUpdateCount();
                } else if (cur.wallType == 'own' || cur.wallType == 'all') {
                    if (hasClass(r, 'own')) --cur.deletedCnts.own;
                    if (hasClass(r, 'all')) --cur.deletedCnts.all;
                    Wall.update();
                }
            }
        });
        return false;
    },
    blockPostApp: function(aid, from, hash, obj) {
        ajax.post('al_wall.php', {
            act: 'block_post_app',
            aid: aid,
            from: from,
            hash: hash
        }, {
            onDone: function(text) {
                obj.parentNode.parentNode.innerHTML = text;
            },
            showProgress: lockButton.pbind(obj),
            hideProgress: unlockButton.pbind(obj)
        });
    },
    checkPostClick: function(el, event, allowDblclick) {
        event = event || window.event;
        if (!el || !event) return true;
        var target = event.target || event.srcElement,
            i = 8,
            foundGood = false,
            classRE = /wall_post_text|published_comment|post_media|page_event_share|page_public_share|page_group_share|feed_friends|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
        do {
            if (!target ||
                target == el ||
                target.onclick ||
                target.onmousedown ||
                inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
                inArray(target.className, ['play_new', 'video_box_wrap']) ||
                (foundGood = target.className.match && target.className.match(classRE))
            ) {
                break;
            }
        } while (i-- && (target = target.parentNode));
        if (!foundGood) {
            return false;
        }

        if (!cur.postClicked) cur.postClicked = {};
        if (!allowDblclick || !cur.postClicked[el]) {
            var sel = trim((
                window.getSelection && window.getSelection() ||
                document.getSelection && document.getSelection() ||
                document.selection && document.selection.createRange().text || ''
            ).toString());
            if (sel) {
                return false;
            }

            if (allowDblclick) {
                cur.postClicked[el] = true;
                setTimeout(function() {
                    cur.postClicked[el] = false;
                }, 2000);
            }
        }
        return target || true;
    },
    postClick: function(post, event, opts) {
        opts = opts || {};
        var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
            el = ge('post' + post);

        if (opts.skipCheck) {
            var clickEl = true;
        } else {
            var clickEl = Wall.checkPostClick(el, event);
        }
        if (!clickEl) return;

        if (clickEl !== true) {
            var moreLink = geByClass1('wall_post_more', clickEl, 'a');
            if (moreLink && isVisible(moreLink)) {
                moreLink.onclick();
                if (!matches) removeClass(el, 'wall_post_over');
                return;
            }
        }

        if (!matches) return;

        if (hasClass(el, 'suggest') || cur.onepost) return;

        var adData = el && el.getAttribute('data-ad');
        var adBlockUID = el && el.getAttribute('data-ad-block-uid');

        var url = '/wall' + matches[1] + '_' + matches[3];
        if (browser.mobile && event) {
            var navOpts = {};
            if (adData && adBlockUID) {
                navOpts.params = {
                    _post_ad_data: adData,
                    _post_ad_block_unique_id: adBlockUID
                };
            }
            nav.go(url, null, navOpts);
        } else if (checkEvent(event)) {
            window.open(url, '_blank');
        } else {
            if (adData && adBlockUID) {
                opts.ads_params = {
                    post_ad_data: adData,
                    ad_block_unique_id: adBlockUID
                };
            }
            Wall.hideEditPostReply();
            Wall.postFull('wall' + matches[1] + '_' + matches[3], false, opts);
        }
    },
    postClickStat: function(event) {
        event = normEvent(event);
        var postEl = event.currentTarget;
        var posts = [];
        if (postEl.getAttribute('data-ad-view')) {
            posts.push(Wall.postsGetRaws(postEl));
            Page.postsSeen(posts);
        }

        var targetEl = event.target;

        if (
            // new way
            inArray(targetEl.getAttribute('data-post-click-type'), ['post_owner_img', 'post_owner_link'])
            // old way (remove?)
            ||
            hasClass(targetEl, 'author') || hasClass(targetEl, 'post_image') || hasClass(targetEl, 'post_img')
        ) {
            Wall.triggerAdPostStat(postEl, 'click_post_owner');
        } else if (
            event.target.nodeName == 'A' && gpeByClass('wall_post_text', event.target, postEl) ||
            gpeByClass('page_media_thumbed_link', event.target, postEl) ||
            hasClass(event.target, 'lnk') ||
            gpeByClass('lnk', event.target, postEl)
        ) {
            Wall.triggerAdPostStat(postEl, 'click_post_link');
        }
    },
    getAdsEvents: function() {
        var lsData = Wall._lsAdsEvents;
        if (!lsData) {
            lsData = Wall._lsAdsEvents = ls.get(Wall.LS_ADS_EVENTS) || {};
        }
        return lsData;
    },
    cleanAdsEvents: function() {
        var lsData = Wall.getAdsEvents();
        var now = ((new Date()).getTime() / 1000) | 0;
        var maxAge = 3600;
        var isChanged = false;
        each(lsData, function(key, timestamp) {
            if (now - timestamp >= maxAge) {
                delete lsData[key];
                isChanged = true;
            }
        });
        if (isChanged) {
            ls.set(Wall.LS_ADS_EVENTS, lsData);
        }
    },
    triggerAdPostStat: function(post, event) {
        var postEl = typeof post == 'string' ? Wall.domPost(post) : post;

        var pixels = domData(postEl, 'ad-stat-' + event);
        while (pixels) {
            var adBlockUID = domData(postEl, 'ad-block-uid');
            var isUniqueEvent = inArray(event, [
                'load', 'impression',
                'video_start', 'video_play_3s', 'video_play_25', 'video_play_50', 'video_play_75', 'video_play_95'
            ]);
            if (isUniqueEvent) {
                domData(postEl, 'ad-stat-' + event, null);
            }
            if (adBlockUID && isUniqueEvent) {
                try {
                    var eventKey = hashCode('' + event + adBlockUID);
                    var lsData = Wall.getAdsEvents();
                    if (lsData[eventKey]) {
                        break;
                    }
                    var now = ((new Date()).getTime() / 1000) | 0;
                    lsData[eventKey] = now;
                    ls.set(Wall.LS_ADS_EVENTS, lsData);
                } catch (e) {
                    try {
                        console.log(e.message);
                    } catch (e2) {}
                }
            }

            pixels = pixels.split('$$$');
            each(pixels, function(i, pxl) {
                vkImage().src = pxl;
            });

            break;
        }

        var statHtml = domData(postEl, 'ad-stat-html-' + event);
        domData(postEl, 'ad-stat-html-' + event, null);

        if (statHtml) {
            var statElemWrap = ce('div', {
                innerHTML: statHtml
            });
            var elem;
            while (elem = statElemWrap.firstChild) {
                postEl.appendChild(elem);
                if (elem.tagName === 'SCRIPT') {
                    eval(elem.innerHTML);
                }
            }
        }
    },
    copyHistory: function(ev, el, post, offset) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement,
            i = 8,
            foundGood = false,
            classRE = /published_a_quote/;
        do {
            if (!target ||
                (foundGood = target.className.match(classRE)) ||
                target.onclick ||
                target.onmousedown ||
                inArray(target.tagName, ['A', 'IMG'])
            ) {
                break;
            }
        } while (i-- && (target = target.parentNode));
        if (!foundGood) return;
        var sel = trim((
            window.getSelection && window.getSelection() ||
            document.getSelection && document.getSelection() ||
            document.selection && document.selection.createRange().text || ''
        ).toString());
        if (sel) return;

        ajax.post('al_wall.php', {
            act: 'copy_history',
            post: post,
            offset: offset,
            from: cur.module
        }, {
            onDone: function(rows) {
                if (!domPN(el)) return;

                hide(el);
                if (!rows) return;

                var after = hasClass(domPN(el), 'published_by_quote') ? domPN(el) : el;
                domPN(after).insertBefore(cf(rows), domNS(after));
                if (isAncestor(after, 'im_rows')) {
                    IM.updateScroll(true);
                } else if (isAncestor(after, 'wl_post')) {
                    WkView.wallUpdateReplies();
                }
            }
        });

        return cancelEvent(ev);
    },
    postFull: function(post, event, opts) {
        if (post.match(/^wall-?\d+_\d+$/) && !(opts || {}).nolist && !(cur.pgParams && (cur.pgParams.owners_only || cur.pgParams.q))) {
            switch (cur.wallType) {
                case 'all':
                case 'full_all':
                    post += '/all';
                    break;

                    // case 'feed':
                    //   if (cur.section == 'news') {
                    //     post += '/feed';
                    //   }
                    //   break;
            }
        }
        return showWiki({
            w: post
        }, false, event, opts);
    },
    checkReplyClick: function(el, event) {
        event = event || window.event;
        if (!el || !event) return false;
        var target = event.target || event.srcElement,
            i = 8,
            foundGood = false,
            classRE = /reply_dived/;
        do {
            if (!target ||
                target == el ||
                target.onclick ||
                target.onmousedown ||
                target.tagName == 'A' && !hasClass(target, '_reply_lnk') ||
                inArray(target.tagName, ['IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) && !hasClass(target, 'emoji') ||
                target.id == 'wpe_cont' ||
                (foundGood = hasClass(target, '_reply_content'))
            ) {
                break;
            }
        } while (i-- && (target = target.parentNode));
        if (!foundGood) {
            return true;
        }
        var sel = trim((
            window.getSelection && window.getSelection() ||
            document.getSelection && document.getSelection() ||
            document.selection && document.selection.createRange().text || ''
        ).toString());
        if (sel) {
            return true;
        }
        return false;
    },
    replyClick: function(post, reply, event, answering) {
        var oid_pid = post.split('_');
        var oid = intval(oid_pid[0]),
            pid_type = oid_pid[1].replace(/-?\d+$/, ''),
            el = ge('post' + oid + pid_type + '_' + reply);
        if (gpeByClass('closed_comments', el) || (!cur.stickerClicked && Wall.checkReplyClick(el, event))) return;
        (event || {}).cancelBubble = true;

        var moreLink = geByClass1('wall_reply_more', el, 'a');
        if (moreLink && isVisible(moreLink)) {
            removeClass(el, 'reply_moreable');
            moreLink.onclick();
            return;
        }
        if (answering) {
            var productId = cur.stickerClicked || false,
                rf = ge('reply_field' + post);
            cur.stickerClicked = false;
            if (productId && (!rf || !rf.emojiInited)) {
                cur.afterEmojiInit = cur.afterEmojiInit || {};
                cur.afterEmojiInit[post] = function() {
                    Emoji.clickSticker(productId, ge('reply_field' + post));
                };
            }
            Wall.replyTo(post, reply, answering, event);
            if (productId && rf && rf.emojiInited) {
                Emoji.clickSticker(productId, rf);
            }
        }
    },
    stickerClick: function(packId, obj, event) {
        (event || {}).cancelBubble = true;
        if (!window.Emoji) {
            stManager.add(['emoji.js', 'notifier.css'], function() {
                Wall.stickerClick(packId, obj);
            });
            return;
        }
        if (!obj) {
            Emoji.clickSticker(packId, false);
            return;
        }

        var en = Emoji.isStickerPackEnabled(packId, Wall.stickerClick.pbind(packId, obj));
        if (en === 0) {
            return;
        } else if (!en) {
            Emoji.clickSticker(packId, false);
        } else {
            var el = obj.parentNode,
                i = 8;
            do {
                if (!el || hasClass(el, 'reply')) {
                    break;
                }
            } while (i-- && (el = el.parentNode));
            if (el && el.onclick) {
                cur.stickerClicked = packId;
                el.onclick();
            }
        }
    },

    domPost: function(post_id) {
        return ge('post' + post_id);
    },
    formatCount: function(count, opts) {
        opts = opts || {};
        return formatCount(count, opts);
    },
    likeFullUpdate: function(el, like_obj, likeData) {
        var matches = like_obj.match(/^(wall|photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(-?\d+_)(\d+)/),
            post = matches ? (matches[2] + (matches[1] == 'wall' ? '' : matches[1]) + matches[3]) : like_obj;

        Likes.update(matches ? (matches[1] || 'wall') + matches[2] + matches[3] : like_obj, likeData);
    },
    likeUpdate: function(el, post_id, my, count, title, share, views) {
        if (!views) {
            count = intval(count);
        }
        if (el === false && cur.wallLayer === post_id) {
            el = ge('wl_post_body');
        }

        var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
            like_type = matches[3] || 'wall',
            post_raw = matches[1] + '_' + matches[4],
            like_obj = like_type + post_raw;

        var post = el && (gpeByClass('_post_content', el) || gpeByClass('wl_post', el)) || wall.domPost(post_raw),
            wrap = domByClass(post, views ? '_views_wrap' : (share ? '_share_wrap' : '_like_wrap')),
            icon = domByClass(wrap, '_icon'),
            countNode = domByClass(wrap, '_count');
        if (!countNode) {
            return;
        }
        if (!views && !share) {
            var viewsWrap = domByClass(post, '_views_wrap'),
                viewsCountNode = viewsWrap && domByClass(viewsWrap, '_count');
            if (viewsCountNode && hasClass(viewsWrap, '_auto_update') && (!val(viewsCountNode) || val(viewsCountNode) == val(countNode))) {
                wall.likeUpdate(el, post_id, 0, this.formatCount(count), undefined, undefined, 1);
            }
        }
        var tt = wrap.tt || {},
            opts = clone(tt.opts || {});
        var countInput = domByClass(tt.container, '_value'),
            content = domByClass(tt.container, '_content'),
            titleNode = domByClass(tt.container, '_title');

        if (title && titleNode) {
            val(titleNode, title);
        }
        if (tt) {
            tt.likeInvalidated = true;
        }
        if (countInput) {
            countInput.value = count;
        }
        animateCount(countNode, (views ? count : langNumeric(count, '%s', true)), {
            str: 'auto',
            noWrapWidth: !!views
        });

        toggleClass(wrap, share ? 'my_share' : 'my_like', my);
        toggleClass(wrap, views ? 'no_views' : (share ? 'no_shares' : 'no_likes'), !count);
        toggleClass(content, 'me_hidden', !my && !views);

        if (count) {
            if (tt.el) {
                if (title === false) {
                    tt.destroy && tt.destroy();
                } else if (!isVisible(tt.container) && !title && title !== false && !testGroupWithFeedbackStr) {
                    tooltips.show(tt.el, extend(opts, {
                        showdt: 0
                    }));
                }
            }
        } else {
            if (tt.el) tt.hide();
        }

        var countFormatted = langNumeric(count, '%s', true);
        if (views) {
            var viewsEl = geByClass1('feedback_views', post);
            var viewsCount = 0;
            if (count.match(/^\d+$/)) {
                viewsCount = intval(count);
            } else {
                viewsCount = 5;
            }
            val(viewsEl, '<em>' + count + '</em> ' + getLang('global_X_post_views', viewsCount, true));
        } else if (share) {
            var shareCount = '';
            if (count > 0) {
                shareCount = '<em>' + countFormatted + '</em> ' + getLang('global_X_shared', count, true);
            }
            val(geByClass1('feedback_share', post), shareCount);
        } else {
            var likesCount = '';
            if (count > 0) {
                likesCount = '<em>' + countFormatted + '</em> ' + getLang('global_like');
            }
            val(geByClass1('feedback_like', post), likesCount);
        }

        Wall.updateFeedbackVisibility(post);
    },
    updateFeedbackVisibility: function(post) {
        var views = trim(val(geByClass1('feedback_views', post))),
            share = trim(val(geByClass1('feedback_share', post))),
            likes = trim(val(geByClass1('feedback_like', post)));

        var hidden = !likes && !share && !views;
        toggleClass(geByClass1('post_feedback_info', post), 'empty', hidden);
    },
    likeShareUpdate: function(el, post_id, my, count, title) {
        return Wall.likeUpdate(el, post_id, my, count, title, true);
    },
    like: function(post_id, hash) {
        if (!vk.id || cur.viewAsBox) return;

        var post = wall.domPost(post_id),
            wrap = domByClass(post, '_like_wrap'),
            icon = domByClass(wrap, '_icon'),
            countNode = domByClass(wrap, '_count'),
            my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like'),
            matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
            like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
            ref = cur.module;
        if (cur.wallType) {
            if (cur.wallType == 'feed') {
                ref = 'feed_' + ((cur.section == 'news' && cur.subsection) ? cur.subsection : cur.section)
            } else if (cur.wallType == 'top') {
                ref = 'wall_top';
            } else {
                ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'))
            }
        }

        ajax.post('like.php', {
            act: 'a_do_' + (my ? 'un' : '') + 'like',
            'object': like_obj,
            hash: hash,
            wall: 2,
            from: ref
        }, {
            onDone: Wall.likeFullUpdate.pbind(false, post_id)
        });
        var count = val(countNode);
        Wall.likeUpdate(false, post_id, !my, intval(count) + (my ? -1 : 1));
        if (cur.onWallLike) {
            cur.onWallLike();
        }
    },
    bookmark: function(button, event) {
        cancelEvent(event);
        addClass(button, 'bookmarked');
    },
    likeShare: function(post_id, hash) {
        if (!vk.id || cur.viewAsBox) return;
        var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
            like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
            el = ge('like_share_' + like_obj),
            was = isChecked(el),
            ref = cur.wallType ? (cur.wallType == 'feed' ? 'feed_' + cur.section : ('wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page')))) : cur.module;
        if (cur.wallType == 'top') {
            ref = 'wall_top';
        }
        checkbox(el);
        ajax.post('like.php', {
            act: 'a_do_' + (was ? 'un' : '') + 'publish',
            object: like_obj,
            hash: hash,
            wall: 2,
            ref: ref
        }, {
            onDone: Wall.likeFullUpdate.pbind(false, post_id)
        });
        var post = wall.domPost(post_id),
            wrap = domByClass(post, '_like_wrap'),
            icon = domByClass(wrap, '_icon'),
            count = val(domByClass(post, '_count')),
            my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like');
        Wall.likeUpdate(false, post_id, true, intval(count) + (my ? 0 : 1));
    },
    likeShareCustom: function(post, params) {
        var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
            like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4];

        showBox('like.php', extend({
            act: 'publish_box',
            object: like_obj
        }, params));
    },
    likeShareCheckLen: function(inp, warn, maxLen) {
        inp = ge(inp);
        warn = ge(warn);
        maxLen = maxLen || 255;
        var v = trim(val(inp)).replace(/\n\n\n+/g, '\n\n');
        if (inp.lastLen === v.length) return;

        var realLen = inp.lastLen = v.length;
        var brCount = realLen - v.replace(/\n/g, '').length;


        if (realLen > maxLen - 50 || brCount > 4) {
            if (realLen > maxLen) {
                val(warn, getLang('text_exceeds_symbol_limit', realLen - maxLen));
            } else if (brCount > 4) {
                val(warn, getLang('global_recommended_lines', brCount - 4));
            } else {
                val(warn, getLang('text_N_symbols_remain', maxLen - realLen));
            }
            show(warn);
        } else {
            hide(warn);
        }
    },
    showLikesPage: function(like_obj, published, offset) {
        cur.likesBox.loadTabContent('like.php', {
            act: 'a_get_members',
            object: like_obj,
            published: published,
            offset: offset,
            wall: 1
        }, published);
    },
    clearLikesCache: function(like_obj, published) {
        var str = '^/like.php#' + ajx2q({
                act: 'a_get_members',
                object: like_obj,
                published: published,
                offset: 12345,
                wall: 1,
                tab: published,
                only_content: 1
            }).replace('12345', '\\d+') + '$',
            re = new RegExp(str, 'i');
        for (var i in ajaxCache) {
            if (re.test(i)) {
                delete(ajaxCache[i]);
            }
        }
    },
    subscribeByButton: function(btn, authorId, hash, statHash, from) {
        var subscribed = hasClass(btn, '_subscribed');

        var reqOptions = {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function() {
                subscribed = !subscribed;
                toggleClass(btn, '_subscribed', subscribed);
            },
        };
        var query = {};

        if (authorId > 0 && from) {
            query.from = from;
        }

        Wall.subscribeToAuthor(subscribed, authorId, hash, statHash, reqOptions, query);
    },
    subscribeByAction: function(btn, authorId, hash, from) {
        if (actionsMenuItemLocked(btn)) {
            return;
        }

        var subscribed = intval(domData(btn, 'value')) ? 1 : 0;
        var reqOptions = {
            showProgress: lockActionsMenuItem.pbind(btn),
            hideProgress: unlockActionsMenuItem.pbind(btn),
        };
        var query = {};

        if (authorId > 0 && from) {
            query.from = from;
        } else if (authorId < 0) {
            reqOptions = extend(reqOptions, {
                onDone: function(text, confirmText, isClosed) {
                    if (confirmText) {
                        var box = showFastBox(getLang('global_warning'), confirmText, getLang('group_leave_group'), function() {
                            box.hide();
                            Wall.subscribeToAuthor(subscribed, authorId, hash, reqOptions, '', {
                                confirm: 1
                            });
                        }, getLang('global_cancel'));
                        return true;
                    }

                    val(btn, text);
                    btn.setAttribute('data-value', 1 - subscribed);
                    if (isClosed) {
                        re(domNS(btn));
                        re(btn);
                    }
                }
            })
        }

        Wall.subscribeToAuthor(subscribed, authorId, hash, '', reqOptions, query);
    },
    subscribeToAuthor: function(state, authorId, hash, statHash, reqOptions, query) {
        reqOptions = extend({
            onFail: function(msg) {
                setTimeout(showFastBox(getLang('global_error'), msg).hide, 3000);
            }
        }, reqOptions);
        query = query || {};

        if (authorId > 0) {
            ajax.post('al_friends.php', extend({
                act: (state ? 'remove' : 'add'),
                mid: authorId,
                hash: hash,
                from: 'feed'
            }, query), reqOptions);
        } else {
            ajax.post('al_groups.php', extend({
                act: (state ? 'list_leave' : 'list_enter'),
                gid: -authorId,
                hash: hash
            }, query), reqOptions);
        }

        if (statHash) {
            ajax.post('al_feed.php?act=viral_subscribe_stat', {
                author_id: authorId,
                subscribe: intval(!state),
                hash: statHash
            });
        }
    },
    showPhoto: function(to_id, ph, hash, el, ev) {
        return !showBox('al_photos.php', {
            act: 'photo_box',
            to_id: to_id,
            photo: ph,
            hash: hash
        }, {
            cache: 1
        }, el.href ? ev : false);
    },
    _animDelX: function(opacity, new_active, post, action) {
        return; // need to deprecate
    },
    domFC: function(el) {
        for (el = domFC(el); el && el.id.match(/page_wall_count_/);) {
            el = domNS(el);
        }
        return el;
    },
    domPS: function(el) {
        for (el = domPS(el); el && el.id.match(/page_wall_count_/);) {
            el = domPS(el);
        }
        return el;
    },
    scrollCheck: function(ev, st, noScrollToY) {
        var st = st == undefined ? scrollGetY() : st,
            top, ntop = 0,
            el, nel, bits, posts = [],
            ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
        if (window.scrollAnimation) {
            return false;
        }
        Wall.repliesSideUpdate(st);
        if (cur.wallPage) {
            var rowsCont;

            if (cur.wallTab == 'suggested') {
                rowsCont = ge('page_suggested_posts');
            } else if (cur.wallTab == 'top') {
                rowsCont = ge('page_top_posts');
            } else {
                rowsCont = ge('page_wall_posts');
            }

            if (
                domPN(cur.topRow) != rowsCont ||
                ((cur.topRow || {}).id || '').match(/page_wall_count_/)
            ) {
                cur.topRow = Wall.domFC(rowsCont);
            }
            if (
                vk.id &&
                cur.topRow &&
                !cur.topRow.id.match(/page_wall_count_/) &&
                !((window.curNotifier || {}).idle_manager || {}).is_idle
            ) {
                var postsUnseen = [];
                for (el = Wall.domPS(cur.topRow); el; el = Wall.domPS(el)) {
                    if (cur.topRow.offsetTop > st) cur.topRow = el;
                    if (!el.unseen) {
                        el.unseen = true;
                        postsUnseen.push(Wall.postsGetRaws(el));
                    }
                }
                Page.postsUnseen(postsUnseen);
                for (el = cur.topRow; el; el = nel) {
                    LongView && LongView.register(el, 'Wall');
                    top = ntop ? ntop : el.offsetTop;
                    if (top >= st + ch) break;

                    nel = domNS(el);
                    if (((nel || {}).id || '').match(/page_wall_count_/)) nel = null;

                    ntop = nel ? nel.offsetTop : top + el.offsetHeight;
                    if (ntop < st && nel) cur.topRow = nel;

                    bits = el.bits || 0;
                    if (bits >= 3) continue;

                    if (bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0)) {
                        el.bits = bits;
                        if (bits == 3) {
                            posts.push(Wall.postsGetRaws(el));
                        }
                    }
                }
                LongView && LongView.onScroll(st, ch);
                Page.postsSeen(posts);
            }
        }
        if (!cur.wallAutoMore || cur.wallLoading || cur.viewAsBox) return;
        el = ge('wall_more_link');
        if (!isVisible(el)) return;

        if (st + lastWindowHeight + 1500 > getXY(el)[1]) {
            el.onclick();
        }
    },
    postsGetRaws: function(el) {
        var index = indexOf(domPN(el).children, el);
        var f = domFC(el);
        var m, res = {};
        if (!el) return res;

        res.module = cur.module;
        res.index = index;

        var isAdsPromotedPost = hasClass(el, '_ads_promoted_post');
        var dataAdView = el.getAttribute('data-ad-view');
        if (dataAdView) {
            res['ad_' + dataAdView] = 1;
            if (isAdsPromotedPost) {
                res.module += '_ads_promoted_post';
            }
        }

        var postViewHash = el.getAttribute('post_view_hash');
        if (postViewHash) {
            res['hash'] = postViewHash;
        }

        if (el.id.substr(0, 6) === 'block_') {
            res[el.id] = 1;
            res['block'] = el.id.substr(6);
            var contain = attr(el, 'data-contain');
            if (contain) {
                contain = contain.split(',');
                contain.forEach(function(v) {
                    v = v.split(':');
                    res[v[0]] = intval(v[1]) || 1;
                });
            }
        } else if (m = el.id.match(/^post(-?\d+_\d+)$/)) {
            res[m[1]] = 1;
            if (m = (el.getAttribute('data-copy') || '').match(/^(-?\d+_\d+)$/)) {
                res[m[1]] = -1;
            }
        }
        return res;
    },

    votingRevote: function(actionMenuItemEl) {
        if (actionsMenuItemLocked(actionMenuItemEl)) {
            return;
        }

        var votingEl = gpeByClass('media_voting', actionMenuItemEl);

        if (votingEl) {
            var votingId = domData(votingEl, 'id');
            var isBoard = domData(votingEl, 'board');
            var isFixed = domData(votingEl, 'fixed');

            if (this.votingIsLocked(votingId)) {
                return;
            }

            var hash = domData(votingEl, 'hash');
            var votingEls = geByClass('_media_voting' + votingId);

            ajax.post('al_voting.php', {
                act: 'revote',
                voting_id: votingId,
                is_board: isBoard,
                is_widget: vk.widget ? 1 : 0,
                is_fixed: isFixed,
                hash: hash,
                width: vk.widget ? cur.widgetWidth : undefined,
                url: vk.widget ? cur.url : undefined,
                vote_hash: cur.voteHash
            }, {
                onDone: this.votingUpdate.bind(this, votingId),
                showProgress: function() {
                    lockActionsMenuItem(actionMenuItemEl);
                    this.votingLock(votingId);
                }.bind(this),
                hideProgress: function() {
                    unlockActionsMenuItem(actionMenuItemEl);
                    this.votingUnlock(votingId);
                }.bind(this)
            });
        }
    },
    votingIsLocked: function(votingId) {
        var votingEls = geByClass('_media_voting' + votingId);
        var isLocked = false;
        votingEls.forEach(function(votingEl) {
            if (hasClass(votingEl, 'media_voting_locked')) {
                isLocked = true;
            }
        });
        return isLocked;
    },
    votingLock: function(votingId) {
        var votingEls = geByClass('_media_voting' + votingId);
        votingEls.forEach(function(votingEl) {
            addClass(votingEl, 'media_voting_locked');
        });
    },
    votingUnlock: function(votingId) {
        var votingEls = geByClass('_media_voting' + votingId);
        votingEls.forEach(function(votingEl) {
            removeClass(votingEl, 'media_voting_locked');
        });
    },
    votingUpdate: function(votingId, data) {
        if (votingId) {
            var votingEls = geByClass('_media_voting' + votingId);

            if (votingEls.length) {
                if (isString(data)) {
                    votingEls.forEach(function(el) {
                        if (data === '') {
                            re(el);
                        } else {
                            var newEl = cf(data);
                            if (hasClass(el, 'media_voting_can_vote')) {
                                var votingEl = domFC(newEl);
                                addClass(votingEl, 'media_voting_just_voted');
                                domReplaceEl(el, newEl);
                                removeClassDelayed(votingEl, 'media_voting_just_voted');
                            } else {
                                domReplaceEl(el, newEl);
                            }
                        }
                    });
                    if (vk.widget && window.WPoll) {
                        window.WPoll.resizeWidget();
                    }
                }
            }
        }
    },
    votingVote: function(votingEl, optionIds) {
        var votingId = domData(votingEl, 'id');

        if (this.votingIsLocked(votingId) || !vk.id) {
            if (vk.widget) {
                Widgets.oauth();
            }
            return;
        }

        var isBoard = domData(votingEl, 'board');
        var isFixed = domData(votingEl, 'fixed');
        var isWkview = hasClass(domPN(votingEl), 'wk_voting_box');
        var hash = domData(votingEl, 'hash');

        if (optionIds.length && hash) {
            ajax.post('al_voting.php', {
                act: 'vote',
                voting_id: votingId,
                is_board: isBoard,
                is_widget: vk.widget ? 1 : 0,
                is_fixed: isFixed,
                option_ids: optionIds.join(','),
                hash: hash,
                width: vk.widget ? cur.widgetWidth : undefined,
                url: vk.widget ? cur.url : undefined,
                vote_hash: cur.voteHash
            }, {
                onDone: function(html, shareMessage) {
                    if (isWkview) {
                        nav.reload();
                        return;
                    }
                    if (vk.widget && window.WPoll) {
                        window.WPoll.updateShareMessage(shareMessage);
                    }
                    this.votingUpdate(votingId, html);
                }.bind(this),
                showProgress: this.votingLock.bind(this, votingId),
                hideProgress: function(votingId) {
                    if (!isWkview) {
                        this.votingUnlock(votingId);
                    }
                }.bind(this, votingId)
            });
        }
    },
    votingButtonVote: function(buttonEl) {
        var votingEl = gpeByClass('media_voting', buttonEl);

        if (votingEl && hasClass(votingEl, 'media_voting_multiple')) {
            var optionEls = geByClass('media_voting_option_selected', votingEl);
            var optionIds = [];
            optionEls.forEach(function(optionEl) {
                var optionId = domData(optionEl, 'id');
                if (optionId) {
                    optionIds.push(optionId);
                }
            });

            this.votingVote(votingEl, optionIds);
        }
    },
    votingOptionVote: function(optionEl, event) {
        var votingEl = gpeByClass('media_voting', optionEl);

        if (votingEl) {
            var isMultiple = hasClass(votingEl, 'media_voting_multiple');

            if (isMultiple) {
                var votingId = domData(votingEl, 'id');

                if (this.votingIsLocked(votingId) || !vk.id) {
                    if (vk.widget) {
                        Widgets.oauth();
                    }
                    return;
                }

                toggleClass(optionEl, 'media_voting_option_selected');
                var hasSelectedOptions = geByClass('media_voting_option_selected', votingEl).length;
                toggleClass(votingEl, 'media_voting_has_selected_options', hasSelectedOptions);
            } else {
                var optionId = domData(optionEl, 'id');

                this.votingVote(votingEl, [optionId]);
            }

            cancelEvent(event);
        }
    },
    votingOptionTooltip: function(optionEl) {
        var votingEl = gpeByClass('media_voting', optionEl);

        if (votingEl) {
            var optionId = domData(optionEl, 'id');
            var ownerId = domData(votingEl, 'owner-id');
            var votingId = domData(votingEl, 'id');
            var isBoard = domData(votingEl, 'board');

            showTooltip(optionEl, {
                url: 'al_voting.php',
                params: {
                    act: 'option_tt',
                    option_id: optionId,
                    owner_id: ownerId,
                    is_board: isBoard,
                    voting_id: votingId
                },
                slide: 15,
                ajaxdt: 100,
                showdt: 400,
                hidedt: 200,
                dir: 'auto',
                shift: [0, 10, 10],
                typeClass: 'voting_tt',
            });
        }
    },
    votingLayer: function(el, event) {
        var optionEl = hasClass(el, 'media_voting_option_wrap') ? el : false;
        var optionId = optionEl ? domData(optionEl, 'id') : 0;
        var votingEl = hasClass(el, 'media_voting') ? el : gpeByClass('media_voting', el);

        if (votingEl) {
            var votingId = domData(votingEl, 'id');
            var ownerId = domData(votingEl, 'owner-id');
            var isBoard = domData(votingEl, 'board');
            var opts = {
                w: (isBoard ? 'board_poll' : 'poll') + ownerId + '_' + votingId,
            };
            if (optionId) {
                opts.opt_id = optionId;
            }

            if (vk.widget) {
                window.open(location.origin + '/' + opts.w, 'poll');
            } else {
                showWiki(opts, false, undefined, {
                    queue: 1,
                    noloader: !!curBox()
                });
            }

            cancelEvent(event);
        }
    },
    votingUpdateByPostRaw: function(postRaw) {
        if (vk.id) {
            postRaw = postRaw.split('_');
            var postId = positive(postRaw[1]);
            var ownerId = intval(postRaw[0]);
            var votingEls = geByClass('_post_media_voting' + ownerId + '_' + postId);

            if (postId && ownerId && votingEls.length) {
                ajax.post('al_voting.php', {
                    act: 'update',
                    post_id: postId,
                    owner_id: ownerId
                }, {
                    onDone: function(html) {
                        if (html) {
                            votingEls.forEach(function(el) {
                                val(el, html);
                            });
                        }
                    },
                    onFail: function() {
                        return true;
                    }
                });
            }
        }
    },
    votingExport: function(el) {
        var votingEl = gpeByClass('media_voting', el);

        if (votingEl && !domData(votingEl, 'board')) {
            var votingId = domData(votingEl, 'id');

            showBox('al_voting.php', {
                act: 'export_box',
                vote_hash: cur.voteHash,
                is_widget: vk.widget ? 1 : 0,
                voting_id: votingId
            }, {
                onDone: function() {
                    curBox().setOptions({
                        width: 500
                    });
                }
            });
        }
    },
    votingOnMain: function(actionMenuItemEl, state) {
        if (actionsMenuItemLocked(actionMenuItemEl)) {
            return;
        }

        var votingEl = gpeByClass('media_voting', actionMenuItemEl);

        if (votingEl) {
            var votingId = domData(votingEl, 'id');
            var isFixed = domData(votingEl, 'fixed');

            if (this.votingIsLocked(votingId)) {
                return;
            }

            var hash = domData(votingEl, 'hash');
            var votingEls = geByClass('_media_voting' + votingId);

            ajax.post('al_voting.php', {
                act: 'onmain',
                state: state ? 1 : 0,
                voting_id: votingId,
                is_fixed: isFixed,
                hash: hash
            }, {
                onDone: this.votingUpdate.bind(this, votingId),
                showProgress: function() {
                    lockActionsMenuItem(actionMenuItemEl);
                    this.votingLock(votingId);
                }.bind(this),
                hideProgress: function() {
                    unlockActionsMenuItem(actionMenuItemEl);
                    this.votingUnlock(votingId);
                }.bind(this)
            });
        }
    },
    votingClosed: function(actionMenuItemEl, state) {
        if (actionsMenuItemLocked(actionMenuItemEl)) {
            return;
        }

        var votingEl = gpeByClass('media_voting', actionMenuItemEl);

        if (votingEl) {
            var votingId = domData(votingEl, 'id');
            var isFixed = domData(votingEl, 'fixed');

            if (this.votingIsLocked(votingId)) {
                return;
            }

            var hash = domData(votingEl, 'hash');
            var votingEls = geByClass('_media_voting' + votingId);

            ajax.post('al_voting.php', {
                act: 'closed',
                state: state ? 1 : 0,
                voting_id: votingId,
                is_fixed: isFixed,
                hash: hash
            }, {
                onDone: this.votingUpdate.bind(this, votingId),
                showProgress: function() {
                    lockActionsMenuItem(actionMenuItemEl);
                    this.votingLock(votingId);
                }.bind(this),
                hideProgress: function() {
                    unlockActionsMenuItem(actionMenuItemEl);
                    this.votingUnlock(votingId);
                }.bind(this)
            });
        }
    },
    votingNarrowAction: function(votingId, hash, action) {
        var act;
        var state;
        switch (action) {
            case 101:
                act = 'closed';
                state = 0;
                break;

            case 102:
                act = 'closed';
                state = 1;
                break;

            case 103:
                act = 'onmain';
                state = 0;
                break;

            case 104:
                act = 'onmain';
                state = 1;
                break;
        }

        if (act && !cur.votingNarrowActionProgress) {
            ajax.post('al_voting.php', {
                act: act,
                voting_id: votingId,
                is_fixed: 1,
                state: state,
                narrow: 1,
                hash: hash
            }, {
                onDone: function(html, js) {
                    var votingModuleEl = ge('group_voting');
                    if (votingModuleEl) {
                        votingModuleEl = domPN(votingModuleEl);
                        if (html) {
                            domReplaceEl(votingModuleEl, cf(html));
                        } else {
                            re(votingModuleEl);
                        }
                    }
                    if (js) {
                        eval(js);
                    }
                },
                showProgress: function() {
                    cur.votingNarrowActionProgress = true;
                },
                hideProgress: function() {
                    cur.votingNarrowActionProgress = false;
                }
            });
        }
    },
    votingReport: function(actionMenuItemEl, hash) {
        if (actionsMenuItemLocked(actionMenuItemEl)) {
            return;
        }

        var votingEl = gpeByClass('media_voting', actionMenuItemEl);

        if (votingEl) {
            var votingId = domData(votingEl, 'id');

            if (this.votingIsLocked(votingId)) {
                return;
            }

            var isBoard = domData(votingEl, 'board');

            ajax.post('al_voting.php', {
                act: 'a_report_form',
                voting_id: votingId,
                is_board: isBoard,
                hash: hash
            }, {
                onDone: function(html, js) {
                    var newEl = cf(html);
                    if (hasClass(votingEl, 'media_voting_board')) {
                        addClass(domFC(newEl), 'media_voting_board');
                    }
                    domReplaceEl(votingEl, newEl);
                    if (js) {
                        eval(js);
                    }
                    if (vk.widget && window.WPoll) {
                        window.WPoll.resizeWidget();
                    }
                },
                showProgress: function() {
                    lockActionsMenuItem(actionMenuItemEl);
                    this.votingLock(votingId);
                }.bind(this),
                hideProgress: function() {
                    unlockActionsMenuItem(actionMenuItemEl);
                    this.votingUnlock(votingId);
                }.bind(this)
            });
        }
    },

    foTT: function(el, text, opts) {
        if (opts && opts.oid) {
            if (opts.oid == vk.id) {
                text = getLang('wall_my_friends_only');
            } else {
                text = val('wpfo' + opts.pid);
            }
        }
        showTitle(el, text);
    },
    update: function() {
        if (cur.wallLayer) {
            WkView.wallUpdateReplies();
            return;
        }

        var isTopWall = (cur.wallType === 'top');

        if (
            (cur.wallType !== 'all' && cur.wallType !== 'own' && !isTopWall) ||
            (cur.wallTab !== 'all' && cur.wallTab !== 'own' && cur.wallTab !== 'top')
        ) {
            return;
        }

        var postType = (isTopWall ? 'own' : cur.wallType);

        var morelnk = ge('wall_more_link');
        var posts = (isTopWall ? ge('page_top_posts') : ge('page_wall_posts'));

        var del = intval(cur.deletedCnts[postType]);
        var count = geByClass(postType, posts).length - del;
        var needHideMore = false;

        if (isTopWall && (isVisible(geByClass1('no_posts', posts)) || cur.wallTopFinished === cur.oid)) {
            needHideMore = true;
        } else {
            var cnts = {
                all: intval(val('page_wall_count_all')),
                own: intval(val('page_wall_count_own')),
                top: intval(val('page_wall_count_top')),
            };

            var maxCount = cnts[(isTopWall ? 'top' : postType)];

            if (cur.wallTab != 'suggested') {
                var cnt = maxCount;

                if (cur.oid < 0 && cur.options['fixed_post_id']) {
                    cnt -= 1;
                }

                val('page_wall_posts_count', cnt ? langNumeric(cnt, cur.options.wall_counts) : cur.options.wall_no);
            }

            var checkCount = count;

            if (!isTopWall && cur.options['fixed_post_id'] && cur.options['wall_oid'] < 0) {
                checkCount += 1;
            }

            needHideMore = (checkCount >= maxCount - del);
        }

        if (needHideMore) {
            hide(morelnk);
        } else {
            show(morelnk);
            morelnk.onclick = Wall.showMore.pbind(count);
        }

        if (cur.wallTab == cur.wallType) {
            shortCurrency();
            if (cur.gifAutoplayScrollHandler) {
                cur.gifAutoplayScrollHandler();
            }
            if (cur.videoAutoplayScrollHandler) {
                cur.videoAutoplayScrollHandler();
            }
        }
    },
    getAbsDate: function(ts, cur) {
        cur = cur || window.cur;
        var date = new Date(ts || vkNow()),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            ampm = '',
            numhours;
        if (cur.wallTpl.time_system) {
            ampm = cur.wallTpl.time_system[hours > 11 ? 1 : 0];
            hours = (hours % 12) || 12;
        }
        numhours = hours > 9 ? hours : ('0' + hours);
        minutes = minutes > 9 ? minutes : ('0' + minutes);
        return cur.wallTpl.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
    },
    getNowRelTime: function(cur) {
        cur = cur || window.cur;
        var ts = vkNow();
        return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + Wall.getAbsDate(ts, cur) + '">' + getLang('wall_just_now') + '</span>';
    },
    getNewPostHTML: function(ev, adminLevel, extendCb, cur) {
        cur = cur || window.cur;
        var acts = [],
            post_id = ev[2],
            oid = post_id.split('_')[0],
            reply_link = reply_button = '',
            thumbs = ev[4].split('|'),
            repls,
            date = Wall.getNowRelTime(cur);

        if (ev[8] == 1) {
            reply_link += cur.wallTpl.reply_link;
            reply_button += cur.wallTpl.reply_button;
        } else if (oid != vk.id) {
            reply_link += cur.wallTpl.own_reply_link;
        }
        var nameStr = ev[3].replace('mem_link', 'author').replace('memLink', 'author'),
            ownerNameEl = se(nameStr),
            ownerName = clean(unclean(ownerNameEl.innerText || ownerNameEl.textContent || ''));
        if (ev[6].indexOf('id="wpfo') != -1) {
            nameStr += '<span class="page_fronly inl_bl" onmouseover="Wall.foTT(this, false, {oid: \'' + oid + '\', pid: \'' + ev[2] + '\'})"></span>';
        }

        if (cur.wallTpl.custom_del && (adminLevel > (ev[9] == oid ? 1 : 0) || oid == vk.id || ev[9] == vk.id || ev[2].split('_')[0] != ev[4])) {
            acts.push(cur.wallTpl.custom_del);
        }
        if (adminLevel > (ev[9] == oid ? 1 : 0) || oid == vk.id || ev[9] == vk.id) {
            acts.push(cur.wallTpl.del);
        } else if (ev[2].split('_')[0] != ev[4]) {
            acts.push(cur.wallTpl.spam);
        }
        var isEditor = adminLevel > 1 && ev[9] == oid || oid == vk.id || ev[9] == vk.id;
        if (isEditor && ev[13] !== 'rss') {
            acts.push(cur.wallTpl.edit);
        }

        if ((oid == vk.id || ev[9] == vk.id) && ev[6]) {
            ev[6] = ev[6].replace('vk2017_snippet_show_layer_button', 'vk2017_snippet_show_layer_button_hidden');
        }

        var canReplyAsGroup = oid < 0 && ev[9] == oid && adminLevel > 1;

        repls = {
            oid: oid,
            name: nameStr,
            actions: acts.length ? rs(cur.wallTpl.post_actions, {
                actions: acts.join('')
            }) : '',
            replies: '',
            reply_link: reply_link,
            reply_button: reply_button,
            own_reply_link: cur.wallTpl.own_reply_link,
            reply_box: ev[8] == 1 ? cur.wallTpl.reply_box : '',
            photo: psr(thumbs[0]),
            link: ev[5],
            text: psr(ev[6]),
            date: date,
            post_id: ev[2],
            poll_hash: cur.wallTpl.poll_hash,
            date_postfix: '',
            user_image: '',
            post_url: '/wall' + post_id.replace('_wall_reply', '_'),
            can_reply_as_group: canReplyAsGroup ? 1 : '',
            owner_photo: canReplyAsGroup ? psr(thumbs[1] || thumbs[0]) : '',
            owner_href: canReplyAsGroup ? ev[5] : '',
            owner_name: canReplyAsGroup ? ownerName : '',
            online_class: (oid > 0) ? ' online' : '',
            likes: Likes.makeTemplate(cur.wallTpl.post_likes, {
                object_raw: ev[2]
            })
        };

        if (window.fifaReplaceText) {
            repls.text = fifaReplaceText(repls.text);
        }

        extendCb && extend(repls, extendCb(repls, ev));

        if (isEditor && cur.wallTpl.author_data) {
            repls.date = rs(cur.wallTpl.author_data, {
                date: repls.date,
                post_id: post_id
            });
        }

        return rs(rs(cur.wallTpl.post, repls), repls);
    },
    updateAnonNewPost: function(ev, el) {
        if (ev[13] == 'anon') {
            var authorEl = geByClass1('author', el);
            var newAuthorEl = ce('span');
            newAuthorEl.innerHTML = authorEl.innerHTML;
            newAuthorEl.className = authorEl.className;
            domReplaceEl(authorEl, newAuthorEl);

            var postImgEl = geByClass1('post_image', el);
            var newPostImgEl = ce('span');
            newPostImgEl.innerHTML = postImgEl.innerHTML;
            newPostImgEl.className = postImgEl.className;
            domReplaceEl(postImgEl, newPostImgEl);
        }

        return el;
    },
    getNewReplyHTML: function(ev, adminLevel, extendCb, cur) {
        cur = cur || window.cur;
        var acts = [],
            can_reply = ge('reply_field' + ev[2]) || ge('reply_fakebox' + ev[2]) || ge('fwr_text'),
            className = '',
            answer = '',
            attr = '',
            toLnk = ev[10] || '';

        if (adminLevel > 0 || !ev[2].indexOf(vk.id + '_') || ev[4] == vk.id) {
            acts.push(cur.wallTpl.del_reply);
        } else if (ev[2].split('_')[0] != ev[4]) {
            acts.push(cur.wallTpl.spam_reply);
        }
        if ((adminLevel > 1) && (ev[4] == intval(ev[2])) || ev[4] == vk.id) {
            acts.push(cur.wallTpl.edit_reply);
        }
        if (ev[8].indexOf('class="wall_reply_more"') != -1) {
            className += 'reply_moreable';
        }
        if (can_reply) {
            className += ' reply_replieable';
            answer = cur.wallTpl.reply_link_wrap;
            if (!cur.options.reply_names[ev[4]]) {
                cur.options.reply_names[ev[4]] = [ev[11], ev[12]]; // name link, name greeting
            }
        }
        if (className) {
            attr = ' onclick="Wall.replyClick(\'%post_id%\', %reply_msg_id%, event, %reply_uid%)"';
        }
        acts = rs(cur.wallTpl.reply_actions, {
            actions: acts.join('')
        });
        var repls = {
            name: ev[5].replace('mem_link', 'author'),
            photo: psr(ev[6]),
            link: ev[7],
            text: psr(ev[8]),
            classname: className,
            actions: acts,
            attr: attr,
            date: Wall.getNowRelTime(cur),
            to_link: toLnk,
            answer_link: answer,
            post_id: ev[2],
            reply_id: ev[3],
            like_id: ev[3].replace('_', '_wall_reply'),
            reply_msg_id: ev[3].split('_')[1],
            reply_uid: ev[4] || 'false',
            likes: Likes.makeTemplate(cur.wallTpl.reply_likes, {
                object_raw: ev[3]
            })
        };

        if (window.fifaReplaceText) {
            repls.text = fifaReplaceText(repls.text);
        }

        extendCb && extend(repls, extendCb(repls));

        return rs(cur.wallTpl.reply, repls);
    },
    updatePostImages: function(html) {
        return html.replace(/<img[^>]+>/g, function(str) {
            if (str.match(/class=/)) {
                return str.replace('src=', 'data-src=').replace('class="', 'class="__need_img ');
            }
            return str;
        });
    },
    loadPostImages: function(container) {
        each(geByClass('__need_img', container, 'img'), function() {
            var src = this.getAttribute('data-src');
            if (src) {
                this.src = src;
                this.removeAttribute('data-src');
            }
            removeClass(this, '__need_img');
        });
    },
    openNewComments: function(post_raw) {
        var repliesEl = ge('replies' + post_raw),
            openEl = repliesEl.nextSibling,
            headerEl = geByClass1('wr_header', repliesEl, 'a'),
            newCnt = 0,
            shown = geByClass('reply', repliesEl, 'div').length,
            total = shown,
            newTotal = openEl.newCnt;
        Wall.loadPostImages(repliesEl);
        each(clone(geByClass('new_reply', repliesEl, 'div')), function() {
            removeClass(this, 'new_reply');
            nodeUpdated(this);
            newCnt++;
            if (newCnt == 100) return false;
        });
        if (headerEl) {
            total = newCnt + intval(headerEl.getAttribute('offs').split('/')[1]);
        }
        shown += -newTotal + newCnt;
        if (total > 3 || shown < total) {
            if (!headerEl) {
                repliesEl.insertBefore(headerEl = ce('a', {
                    className: 'wr_header'
                }), repliesEl.firstChild);
            }
            Wall.updateRepliesHeader(post_raw, headerEl, shown, total);
        }
        cur.wallMyOpened[post_raw] = 1;
        if (openEl && openEl.className == 'replies_open') {
            if (newTotal > 100) {
                openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newTotal - newCnt));
                openEl.newCnt -= newCnt;
            } else {
                re(openEl);
            }
        }
        Wall.repliesSideSetup(post_raw);
    },
    langWordNumeric: function(num, words, arr) {
        return langWordNumeric(num, words, arr);
    },
    updateTimes: function(cont) {
        if (!(cur.lang || {}).wall_X_seconds_ago_words) {
            return;
        }
        var timeNow = intval(vkNow() / 1000),
            toClean = [];
        timeNow -= cur.tsDiff;
        each(geByClass('rel_date_needs_update', cont || ge('page_wall_posts'), 'span'), function(k, v) {
            if (!v) return;

            var timeRow = intval(v.getAttribute('time')),
                diff = timeNow - timeRow,
                timeText = v.getAttribute('abs_time');

            if (diff < 5) {
                timeText = getLang('wall_just_now');
            } else if (diff < 60) {
                timeText = Wall.langWordNumeric(diff, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago);
            } else if (diff < 3600) {
                timeText = Wall.langWordNumeric(intval(diff / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago);
            } else if (diff < 4 * 3600) {
                timeText = Wall.langWordNumeric(intval(diff / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago);
            } else {
                toClean.push(v);
            }
            v.innerHTML = timeText;
        });
        each(toClean, function() {
            removeClass(this, 'rel_date_needs_update');
        });
    },

    updateRepliesHeader: function(post_raw, headerEl, shown, total) {
        if (cur.onepost) return;
        var headerText, href = headerEl.href,
            matches, showCount = 3,
            cls = 0;

        if (!href && (matches = post_raw.match(/^(-?\d+)_(photo|video|note|topic|video|)(\d+)$/))) {
            var type = matches[2] || 'wall';
            href = '/' + type + matches[1] + '_' + matches[3];
            switch (type) {
                case 'topic':
                    href += '?offset=last&scroll=1';
                    break;
                case 'wall':
                    href += '?offset=last&f=replies';
                    break;
            }
            headerEl.href = href;
        }
        if (total > shown) {
            if (shown < 100) {
                if (total > 100) {
                    headerText = getLang('wall_show_n_last_replies', 100);
                } else {
                    headerText = getLang('wall_show_all_n_replies', total);
                }
                showCount = false;
            } else {
                headerText = getLang('wall_hide_replies');
            }
        } else {
            headerText = getLang('wall_hide_replies');
            cls = 1;
        }
        toggleClass(headerEl, 'wrh_all', cls);
        headerEl.innerHTML = headerText;
        headerEl.onclick = Wall.showReplies.pbind(post_raw, showCount, false);
        headerEl.setAttribute('offs', shown + '/' + total);
    },

    updated: function(layer, key, data) {
        var cur = layer ? wkcur : window.cur;
        if (!cur.wallAddQueue || cur.wallAddQueue.key != key) {
            return;
        }
        if (data.failed) {
            cur.wallAddQueue = false;
            return;
        }
        cur.wallAddQueue.ts = data.ts;
        if (!isArray(data.events) || !data.events.length) {
            return;
        }

        var len = data.events.length,
            startST = layer ? wkLayerWrap.scrollTop : scrollGetY(),
            curST = startST,
            fullWall = !(cur.wallType || '').indexOf('full'),
            onepost = cur.onepost,
            layerpost = layer ? true : false,
            fixed = layer;

        if (fullWall && (nav.objLoc.q || nav.objLoc.search || nav.objLoc.day)) return;

        each(data.events, function() {
            var ev = this.split('<!>'),
                ev_ver = ev[0],
                ev_type = ev[1],
                post_id = ev[2],
                updH = 0,
                updY = 0,
                el = layer && window.cur.wallLayer == post_id && ge('wl_post'),
                mt = 15;

            if (!el || ev_type == 'del_reply') {
                el = ge('post' + post_id);
                if (!isAncestor(el, layer ? wkLayerWrap : pageNode)) {
                    el = null;
                }
            }

            if (ev_ver != cur.options.qversion) {
                return;
            }
            switch (ev_type) {
                case 'new_post':
                    {
                        if (el) break;
                        if (fullWall && cur.pgStart > 0) {
                            cur.pgOffset++;
                            break;
                        }
                        if (cur.oid == vk.id && vk.id == ev[9]) {
                            if (window.curNotifier && curNotifier.idle_manager.is_idle) {
                                Wall.clearInput();
                            }
                        }

                        if (cur.wallType !== 'own' && cur.wallType !== 'all' && !Wall.hasPosts('own')) {
                            break;
                        }

                        var cont = ge('page_wall_posts'),
                            lastPost = cont.lastChild,
                            extendCb = fullWall ? FullWall.addTetaTet : false,
                            flgs = intval(ev[ev.length - 1]),
                            adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
                            newEl = se(Wall.getNewPostHTML(ev, adminLevel, extendCb, cur)),
                            insBefore = cont.firstChild;

                        Wall.updateAnonNewPost(ev, newEl);

                        if (ge('post' + post_id)) break;
                        if (lastPost && lastPost != newEl) {
                            re(lastPost);
                        } else lastPost = false;
                        if (!fullWall) {
                            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
                            addClass(newEl, 'all');
                            if (intval(ev[10])) {
                                val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
                                addClass(newEl, 'own');
                            }
                        } else if (!lastPost) {
                            cur.pgOffset++;
                        }

                        // can reply
                        if (ev[8] == 0) {
                            addClass(newEl, 'closed_comments');
                        }

                        while (insBefore && (insBefore.tagName == 'INPUT' || insBefore.nodeType != 1 || hasClass(insBefore, 'post_fixed'))) {
                            insBefore = insBefore.nextSibling;
                        }
                        cont.insertBefore(newEl, insBefore);
                        Wall.votingUpdateByPostRaw(post_id);
                        updH = newEl.offsetHeight + mt;
                        updY = getXY(newEl, fixed)[1];
                        nodeUpdated(newEl);
                        window.updateAriaElements && updateAriaElements();
                        Wall.updateMentionsIndex();

                        AudioUtils.updateQueueReceivedPost(newEl);

                        break;
                    }
                case 'edit_post':
                    {
                        var editEl = ge('wpt' + post_id);
                        if (!isVisible(el) || !editEl) break;

                        var wasExpanded = geByClass1('wall_post_more', editEl);
                        if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

                        updH = -editEl.offsetHeight;
                        updY = getXY(editEl, fixed)[1];
                        var text = psr(rs(ev[3], {
                            poll_hash: cur.wallTpl.poll_hash
                        }));

                        if (window.fifaReplaceText) {
                            text = fifaReplaceText(text);
                        }

                        // only for VK videos
                        var isPlayerLoaded = (cur.videoInlinePlayer && isAncestor(window._videoLastInlined[0], editEl));
                        var isVideoPlaying = isPlayerLoaded && cur.videoInlinePlayer.getState() == 'playing';

                        val(editEl, text);

                        if (isPlayerLoaded) {
                            var wrapEl = geByClass1('page_post_sized_thumbs', editEl);
                            if (domChildren(wrapEl).length == 1) {
                                wrapEl.innerHTML = '';
                                wrapEl.appendChild(window._videoLastInlined[1]);
                                wrapEl.appendChild(window._videoLastInlined[0]);
                                if (isVideoPlaying) {
                                    setTimeout(function() {
                                        cur.videoInlinePlayer.play();
                                    }, 0);
                                }
                            }
                        }

                        if (wasExpanded) {
                            wasExpanded = geByClass1('wall_post_more', editEl);
                            if (wasExpanded) wasExpanded.onclick();
                        }
                        Wall.votingUpdateByPostRaw(post_id);
                        updH += editEl.offsetHeight;
                        nodeUpdated(editEl);
                        Wall.updatePostAuthorData(post_id);
                        break;
                    }
                case 'edit_reply':
                    {
                        var reply_id = ev[3],
                            editEl = ge('wpt' + reply_id);
                        if (!isVisible('post' + reply_id) || !editEl) break;

                        var wasExpanded = geByClass1('wall_reply_more', editEl);
                        if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

                        var text = psr(ev[4]);

                        if (window.fifaReplaceText) {
                            text = fifaReplaceText(text);
                        }

                        val(editEl, text);

                        updH = -editEl.offsetHeight;
                        updY = getXY(editEl, fixed)[1];
                        if (wasExpanded) {
                            wasExpanded = geByClass1('wall_reply_more', editEl);
                            if (wasExpanded) wasExpanded.onclick();
                        }
                        updH += editEl.offsetHeight;
                        nodeUpdated(editEl);
                        break;
                    }
                case 'post_parsed_link':
                    {
                        if (!el) break;
                        var btnWrap = geByClass1('wall_postlink_preview_btn_disabled', el);
                        if (!btnWrap) break;
                        if (intval(ev[3])) {
                            removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');
                        } else {
                            re(btnWrap);
                        }
                        break;
                    }
                case 'del_post':
                    {
                        if (!isVisible(el)) break;

                        if (!cur.wallMyDeleted[post_id] && !onepost) {
                            updH -= el.offsetHeight + mt;
                            updY = getXY(el, fixed)[1];
                            revertLastInlineVideo(el);
                            addClass(el, 'unshown');
                            if (!fullWall && !layerpost) {
                                val('page_wall_count_all', intval(val('page_wall_count_all')) - 1);
                                if (ev[3]) {
                                    val('page_wall_count_own', intval(val('page_wall_count_own')) - 1);
                                }
                            }
                        }
                        break;
                    }
                case 'res_post':
                    {
                        if (!el || isVisible(el)) break;
                        if (cur.wallRnd == ev[4]) removeClass(el, 'unshown');

                        if (fullWall) {
                            cur.pgOffset++;
                        } else {
                            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
                            if (ev[3]) {
                                val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
                            }
                        }
                        break;
                    }
                case 'new_reply':
                    {
                        if (!el || cur.wallMyReplied[post_id] ||
                            ge('post' + ev[3]) ||
                            (onepost && cur.pgOffset < cur.pgCount) ||
                            (layerpost && (!cur.reverse ? cur.offset + cur.loaded < cur.count : cur.offset))
                        ) break;

                        var repliesEl = ge('replies' + post_id),
                            repliesWrap = ge('replies_wrap' + post_id),
                            flgs = intval(ev[ev.length - 1]),
                            adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
                            newEl = se(Wall.getNewReplyHTML(ev, adminLevel, false, cur)),
                            highlight = false,
                            startH = layerpost ? repliesEl.offsetHeight : el.offsetHeight;

                        if ((!isVisible(repliesEl) || !isVisible(repliesWrap) || isVisible('reply_link' + post_id)) && !domClosest('wall_fixed', repliesWrap)) {
                            re('reply_link' + post_id);
                            show(repliesWrap, repliesEl);
                            highlight = true;
                        } else {
                            var openEl = repliesEl.nextSibling,
                                newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
                            if (!layerpost && !onepost && !cur.wallMyOpened[post_id]) {
                                addClass(newEl, 'new_reply');
                                if (!openEl || openEl.className != 'replies_open') {
                                    openEl = ce('div', {
                                        className: 'replies_open',
                                        onclick: Wall.openNewComments.pbind(post_id),
                                        role: 'button',
                                        tabIndex: 0
                                    });
                                    repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
                                }
                                openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
                                openEl.newCnt = newCnt;
                            } else if (!onepost) {
                                if (openEl && openEl.className == 'replies_open') re(openEl);
                                highlight = true;
                                var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                                    shown = geByClass('reply', repliesEl, 'div').length + 1,
                                    total = shown;
                                if (headerEl) {
                                    total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
                                }
                                if (total > 5 || shown < total) {
                                    if (!headerEl) {
                                        repliesEl.insertBefore(headerEl = ce('a', {
                                            className: 'wr_header'
                                        }), repliesEl.firstChild);
                                    }
                                    Wall.updateRepliesHeader(post_id, headerEl, shown, total);
                                }
                            }
                        }
                        if ((layer ? cur.reverse : false) && repliesEl.firstChild) {
                            repliesEl.insertBefore(newEl, repliesEl.firstChild);
                        } else {
                            repliesEl.appendChild(newEl);
                        }
                        if (highlight) {
                            nodeUpdated(newEl);
                        }
                        if (layerpost) {
                            cur.count++;
                            cur.loaded++;
                            WkView.wallUpdateReplies();
                            updH = repliesEl.offsetHeight - startH;
                            updY = getXY(newEl, fixed)[1];
                        } else {
                            if (onepost) {
                                FullWall.repliesSummary(ev[13]);
                                cur.pgOffset++;
                                cur.pgCount++;
                                FullWall.repliesSummary(cur.pgCount);
                                Pagination.pageReady(false);
                                FullWall.onePostOnScroll(false, false, true);
                            }
                            updH = el.offsetHeight - startH;
                            updY = getXY(highlight ? newEl : openEl)[1];
                            Wall.repliesSideSetup(post_id);
                        }
                        Wall.updateMentionsIndex();
                        Likes.update('wall' + post_id, {
                            comment_num: ev[13]
                        });
                        break;
                    }
                case 'del_reply':
                    {
                        if (cur.wallMyDeleted[post_id] || !el) break;
                        updH -= el.offsetHeight;
                        updY = getXY(el, fixed)[1];
                        revertLastInlineVideo(el);
                        if (cur.layerpost) {
                            hide(el);
                            cur.count--;
                            cur.loaded--;
                        } else {
                            if (onepost) {
                                cur.pgOffset--;
                                cur.pgCount--;
                                FullWall.repliesSummary(cur.pgCount);
                            }
                            var post = el.parentNode.id.match(/replies(-?\d+_\d+)/);
                            re(el);
                            if (post) {
                                Wall.repliesSideSetup(post[1]);
                            }
                        }
                        break;
                    }
                case 'view_post':
                    {
                        Wall.likeUpdate(false, post_id, 0, Wall.formatCount(intval(ev[3])), undefined, undefined, 1);
                        break;
                    }
                case 'like_post':
                case 'like_reply':
                    {
                        if (!el) break;
                        var likePost = (ev_type == 'like_reply' ? 'wall_reply' + post_id : post_id),
                            likeWrap = el && domByClass(el, '_like_wrap'),
                            shareWrap = el && domByClass(el, '_share_wrap');

                        wall.likeFullUpdate(likeWrap, likePost, {
                            like_my: likeWrap && hasClass(likeWrap, 'my_like'),
                            like_num: ev[3],
                            like_title: false,
                            share_my: shareWrap && hasClass(shareWrap, 'my_share'),
                            share_num: ev[4],
                            share_title: false
                        });
                        break;
                    }
                case 'upd_ci':
                    {
                        var info = ev[2],
                            edit = ge('current_info'),
                            el = edit || ge('page_current_info');

                        if (!el) {
                            break;
                        }
                        switch (ev[3]) {
                            case 'audio':
                                var curCntEl = geByClass1('current_audio_cnt');
                                if (curCntEl && curCntEl.tt) curCntEl.tt.hide();

                                var ci_cnt = intval(ev[5] || ''),
                                    ci_cnt_class = ci_cnt ? '' : ' hidden',
                                    attr = '';

                                if (!edit) {
                                    attr += ' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAudioTip + '\', black: 1, shift: [14, 5, 5]})" onclick="Page.playCurrent(this, \'' + ev[4] + '\')"';
                                }

                                info = rs(cur.options.ciAudioTpl, {
                                    text: info,
                                    attrs: attr,
                                    count: ci_cnt,
                                    cnt_class: ci_cnt_class
                                });
                                wall.updateOwnerStatus(info, el, ev, edit);
                                break;

                            case 'app':
                                var shift = ev[6] ? '[12, 5, 5]' : '[15, 5, 5]',
                                    addCls = ev[6] ? ' current_app_icon' : '';
                                var attr = edit ? (' onclick="cur.ciApp = ' + ev[4] + '"') : (' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAppTip + '\', black: 1, shift: ' + shift + '})" href="' + ev[5] + '?ref=14" onclick="return showApp(event, ' + ev[4] + ', 1, 14, cur.oid)"');
                                if (ev[6]) attr += ' style="background-image: url(\'' + ev[6] + '\')"';
                                info = '<a class="current_app' + addCls + '"' + attr + '>' + info + '</a>';
                                wall.updateOwnerStatus(info, el, ev, edit);
                                break;

                            default:
                                stManager.add(['emoji.js'], function() {
                                    info = info ? ('<span class="current_text">' + Emoji.emojiToHTML(info, true) + '</span>') : info;
                                    wall.updateOwnerStatus(info, el, ev, edit);
                                });
                                break;
                        }
                        break;
                    }
                case 'upd_ci_cnt':
                    {
                        var edit = ge('current_info'),
                            cnt = intval(ev[2]),
                            el = edit || ge('page_current_info'),
                            cntEl = el && geByClass1('current_audio_cnt', el);
                        if (cntEl) {
                            if (cntEl.tt) {
                                cntEl.tt.destroy();
                            }
                            toggleClass(cntEl, 'hidden', cnt == 0);
                            animateCount(cntEl, langNumeric(cnt, '%s', true), {
                                str: 'auto'
                            });
                        }
                        break;
                    }
                case 'cover_updated':
                    {
                        var coverEl = geByClass1('_page_cover');
                        if (coverEl && ev[2]) {
                            var fakeEl = vkImage(),
                                imageUrl = isRetina() ? ev[3] : ev[2];
                            fakeEl.src = imageUrl;
                            fakeEl.onload = function() {
                                coverEl.style.backgroundImage = "url('" + imageUrl + "')";
                                re(fakeEl);
                            }
                        }
                        break;
                    }
            }
            if (updH && (layer ? (updY < 0) : (curST + getSize('page_header_cont')[1] > updY))) {
                curST += updH;
            }
        });
        var endST = scrollGetY();
        if (curST != startST && startST > 100 && !cur.onepost /* && Math.abs(startST - endST) > 100*/ ) {
            if (layer) {
                wkLayerWrap.scrollTop = curST;
            } else {
                scrollToY(curST, 0, false, true);
            }
        }
        Wall.update();
    },

    updateOwnerStatus: function(info, el, ev, edit) {
        if (edit) {
            var cls = info ? 'my_current_info' : 'no_current_info';
            info = '<span class="' + cls + '">' + (info || getLang('change_current_info')) + '</span>';
            val(el.parentNode.nextSibling, info);
            if (!isVisible('currinfo_editor') && cur.oid > 0) {
                toggle('currinfo_audio', ev[3] != 'app');
                toggle('currinfo_app', ev[3] == 'app');
                addClass('currinfo_app', 'on');
            }
        }
        val(el, info);
        // nodeUpdated(el.firstChild);
    },

    updateMentionsIndex: function(force) {
        clearTimeout(cur.wallUpdateMentionsIndexTO);
        if (!force) {
            cur.wallUpdateMentionsIndexTO = setTimeout(wall.updateMentionsIndex.pbind(true), 300);
            return;
        }

        var byHref = {},
            list = [],
            linkRe = new RegExp('^(https?://(vk\.com|' + location.host.replace(/\./, '\\.') + '))?\/?'),
            photoLinks = [];

        each(geByClass('author', bodyNode, 'a'), function() {
            var name = val(this),
                href = this.href.replace(linkRe, '');
            if (byHref[href] !== undefined) {
                return;
            }
            var // oidMatches = href.match(/^(id|club|event|public)(\d+)$/),
                oid = /*oidMatches ? (oidMatches[1] == 'id' ? oidMatches[2] : -oidMatches[2]) : */ intval(this.getAttribute('data-from-id'));

            if (oid && oid != vk.id) {
                byHref[href] = list.length;
                list.push([oid, name, '@' + href, '/images/camera_c.gif']);
            }
        });

        photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('post_image', bodyNode, 'a')));
        photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('reply_image', bodyNode, 'a')));

        each(photoLinks, function() {
            var href = this.href.replace(linkRe, ''),
                listId = byHref[href];
            if (listId === undefined) {
                return;
            }

            var img = domFC(this);
            while (img && img.tagName != 'IMG') {
                img = domNS(img);
            }
            if (img) {
                list[listId][3] = img.getAttribute('src');
                delete byHref[href];
            }
        });
        cur.wallMentions = list;
    },

    initUpdates: function(key) {
        if (!key || !window.Notifier) {
            return;
        }
        var wasKey = cur.wallAddQueue,
            checkCb = function() {
                if (cur.wallAddQueue) Notifier.addKey(cur.wallAddQueue, Wall.updated.pbind(false));
            };

        cur.wallAddQueue = key;
        checkCb();
        if (!wasKey) {
            checkInt = setInterval(checkCb, 10000);
            cur.destroy.push(function() {
                clearInterval(checkInt)
            });
        }
    },

    initWallOptions: function(opts) {
        extend(cur, {
            wallType: opts.wall_type,
            wallTpl: opts.wall_tpl,
            wallMyDeleted: {},
            tsDiff: opts.wall_tpl && opts.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
            wallMyOpened: {},
            wallMyReplied: {},
            wallMentions: [],
            wallMyRepliesCnt: 0,
            wallUploadOpts: opts.upload,
            wallUploadVideoOpts: opts.upload_video,
            hasGroupAudioAccess: opts.hasGroupAudioAccess,
        });
        if (opts.wall_tpl && opts.wall_tpl.lang) {
            cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
        }

        window.Notifier && Notifier.addRecvClbk('wall_reply_multiline', 'wall', function(data) {
            Wall.onReplySubmitChanged(data.value, 1);
        }, true);
    },

    // fyi: this function is used only for ads at the moment, so it is called not in all expected places yet
    onPostLoaded: function(post, maybeWrappedElement) {
        post = ge(post);
        if (maybeWrappedElement && !hasClass(post, '_post')) {
            post = geByClass1('_post', post);
        }
        if (!post || !hasClass(post, '_post')) {
            return;
        }
        if (hasClass(post, '_ads_promoted_post_data_w')) {
            Wall.triggerAdPostStat(post, 'load');
        }

        if (cur.onPostLoaded) {
            cur.onPostLoaded(post);
        }
    },

    init: function(opts) {
        Wall.initWallOptions(opts);

        extend(cur, {
            wallInited: true,
            postField: ge('post_field'),
            wallSearch: ge('wall_search'),
            wallPage: ge('profile') || ge('group') || ge('public'),
            wallPageNarrow: ge('narrow_column'),
            wallUploadOpts: opts.upload || false,
            deletedCnts: {
                own: 0,
                all: 0
            }
        });

        cur.destroy.push(function(c) {
            cleanElems(c.postField);
        });
        var rem = removeEvent.pbind(document, 'click', Wall.hideEditPostReply);

        if (cur._back) {
            cur._back.hide.push(rem);
            cur._back.show.push(rem);
            cur._back.show.push(addEvent.pbind(document, 'click', Wall.hideEditPostReply));
        } else {
            cur.destroy.push(rem);
        }
        cur.wallTab = cur.wallType;
        Wall.update();
        Wall.initUpdates(opts.add_queue_key);

        // Times update interval. For relative time correction
        if (opts.wall_tpl) {
            cur.timeUpdateInt = setInterval(function() {
                Wall.updateTimes(opts.wallCont);
            }, 10000);
            cur.destroy.push(function() {
                clearInterval(cur.timeUpdateInt);
            });
        }

        var scrollNode = window;
        addEvent(scrollNode, 'scroll', Wall.scrollCheck);
        addEvent(window, 'resize', Wall.scrollCheck);
        cur.destroy.push(function() {
            removeEvent(scrollNode, 'scroll', Wall.scrollCheck);
            removeEvent(window, 'resize', Wall.scrollCheck);
        });
        cur.wallAutoMore = opts.automore;

        var draft = false;
        if (!cur.options.no_draft) {
            draft = (opts.draft || cur.oid != vk.id && Wall.getOwnerDraft(cur.oid));
        }
        Wall.initPostEditable(draft);
        if (cur.wallSearch) {
            placeholderInit(cur.wallSearch);
        }

        removeEvent(document, 'click', Wall.hideEditPostReply);
        addEvent(document, 'click', Wall.hideEditPostReply);

        if (opts.media_types) {
            cur.wallAddMedia = new MediaSelector(ge('page_add_media'), 'media_preview', opts.media_types, extend({
                onAddMediaChange: function() {
                    Wall.postChanged(10);

                    if (cur.oid != vk.id) {
                        var args = Array.prototype.slice.call(arguments);
                        args.unshift(cur.oid);
                        Wall.saveOwnerDraftMedia.apply(window, args);
                    }
                },
                onMediaChange: function() {
                    Wall.postChanged();
                },
                onMediaUploadStarted: function() {
                    Wall.postChanged();
                },
                editable: 1,
                from: 'post',
                sortable: 1
            }, opts.media_opts || {}));
        }

        cur.withUpload = window.WallUpload && !browser.safari_mobile && inArray(cur.wallType, ['all', 'own', 'feed', 'full_all', 'ads_promoted_stealth']) && Wall.withMentions && cur.wallUploadOpts;
        if (cur.withUpload && WallUpload.checkDragDrop()) {
            var clean = function() {
                    removeEvent(document, 'dragover dragenter drop dragleave', cb);
                },
                cb = function(e) {
                    if (dragtimer !== false) {
                        clearTimeout(dragtimer);
                        dragtimer = false;
                    }
                    if (cur.uploadInited) {
                        clean();
                        return cancelEvent(e);
                    }
                    switch (e.type) {
                        case 'drop':
                            started = false;
                            delete cur.wallUploadFromDrag;
                            hide('post_upload_dropbox');
                            break;

                        case 'dragleave':
                            dragtimer = setTimeout(function() {
                                started = false;
                                delete cur.wallUploadFromDrag;
                                hide('post_upload_dropbox');
                            }, 100);
                            break;

                        case 'dragover':
                        case 'dragenter':
                            if (!started) {
                                started = (e.target && (e.target.tagName == 'IMG' || e.target.tagName == 'A')) ? 1 : 2;
                                if (started == 2) {
                                    setTimeout(WallUpload.initCallback, 0);
                                }
                            }
                            if (started == 2) {
                                cur.wallUploadFromDrag = 1;
                            }
                    }
                    return cancelEvent(e);
                },
                started = false,
                dragtimer = false;
            addEvent(document, 'dragover dragenter drop dragleave', cb);
            cur.destroy.push(clean);
        }
        Wall.updateMentionsIndex();

        if (opts.top_wall_feature_tooltip) {
            setTimeout(function() {
                Wall.showTopWallTooltip(opts.top_wall_feature_tooltip_hash);
            }, 800);
        }
    },
    switchOwner: function(obj) {
        toggleClass(geByClass1('_ui_toggler', obj), 'on');
        uiSearch.showProgress('wall_search');
        cur.options.params.owners_only = cur.options.params.owners_only ? null : 1;
        nav.change({
            owners_only: cur.options.params.owners_only,
            offset: null
        });
    },
    setReplyAsGroup: function(el, opts) {
        if (!el) {
            return false;
        }
        if (el.hasAttribute('data-reinit-ads-needs-confirmation') && window.AdsEdit && !opts.reinitConfirmed) {
            if (AdsEdit.reinitCreatingPostFormNeeded()) {
                AdsEdit.reinitCreatingPostFormConfirm(wall.setReplyAsGroup.pbind(el, extend({}, opts || {}, {
                    reinitConfirmed: true
                })));
                return false;
            }
        }

        var wrap = domClosest('_submit_post_box', el),
            signed = wrap && ge('signed'),
            closeComments = wrap && ge('close_comments'),
            muteNotifications = wrap && ge('mute_notifications'),
            official = wrap && ge('official'),
            ttChooser = data(el, 'tt'),
            from = opts.from || (opts.fromGroup ? cur.oid : vk.id),
            fromData = (from == vk.id) ? wall.replyAsProfileData() : (window.replyAsData && window.replyAsData[from] || wall.replyAsGroupDomData(el));

        if (domData(wrap, 'from-oid') == from || !fromData || fromData[0] != from) {
            return false;
        }

        domData(wrap, 'from-oid', from);
        wall.replyAsAnimate(wrap, fromData[2], fromData[1]);

        if (ttChooser && ttChooser.rows) {
            each(ttChooser.rows, function() {
                toggleClass(this, 'active', domData(this, 'from-oid') == from);
            });
        }

        if (signed) {
            disable(signed, from > 0);
        }

        if (closeComments) {
            disable(closeComments, from > 0);
        }

        if (muteNotifications) {
            disable(muteNotifications, from > 0);
        }

        if (official) {
            checkbox(official, from !== vk.id);
        }

        el.setAttribute('aria-label', getLang(from < 0 ? 'wall_reply_as_group' : 'wall_reply_as_user'));

        if (el.hasAttribute('data-replace-owner-name')) {
            el.innerHTML = fromData[3];
            if (el.tagName === 'A') {
                el.href = fromData[2];
            }
        }
        if (el.hasAttribute('data-replace-post-to')) {
            cur.postTo = fromData[0];
        }
        if (el.hasAttribute('data-replace-oid')) {
            cur.oid = fromData[0];
        }
        if (el.hasAttribute('data-reinit-ads-post-editor') && window.AdsEdit) {
            if (opts.withoutRedraw) {
                AdsEdit.reinitCreatingPostFormBoundWithoutRedraw();
            } else {
                AdsEdit.reinitCreatingPostFormBound();
            }
        }

        if (el.id == 'official') {
            Wall.postChanged(true);
        }

        triggerEvent(geByClass1('submit_post_field', wrap), 'td_update');

        return false;
    },
    replyAsAnimate: function(el, url, image) {
        var author = el && geByClass1('_post_field_author', el),
            authorImgs = author && geByClass('_post_field_image', author),
            choose = el && geByClass1('_post_field_official', el),
            chooseImgs = choose && geByClass('_post_field_image', choose),
            index = hasClass(el, 'author_secondary') ? 0 : 1;

        if (author && authorImgs && authorImgs[index]) {
            author.href = url;
            authorImgs[index].src = image;
        }

        if (chooseImgs && chooseImgs[index]) {
            chooseImgs[index].src = image;
        }

        toggleClass(el, 'author_secondary');
    },
    replyAsGroupOver: function(obj) {
        if (!hasClass(obj, 'checkbox_official') || hasClass(obj, 'disabled')) return false;

        var postBox = gpeByClass('_submit_post_box', obj);
        showTooltip(obj, {
            text: function() {
                var fromGroup = (domData(postBox, 'from-oid') || vk.id) < 0;
                return (fromGroup ? getLang('global_on_behalf_group') : getLang('global_on_behalf_me'));
            },
            black: 1,
            shift: [9, 8, 8]
        });
        if (wall.isWallReply(obj) || wall.isAdsCreatingPost(obj)) {
            var url = '/al_groups.php';
            var act = 'get_editor_clubs';
            if (wall.isAdsCreatingPost(obj)) {
                url = '/ads_edit.php';
                act = 'a_get_promoted_post_stealth_groups';
            }
            ajax.post(url, {
                act: act
            }, {
                cache: 1
            });
        }
        return;
    },
    replyAsGroupFocus: function(obj) {
        var ttChooser = data(obj, 'tt');
        if (ttChooser && ttChooser.isShown()) {
            return;
        }
        wall.replyAsGroupOver(obj);
    },
    replyAsGroup: function(obj, owner) {
        if (!hasClass(obj, 'checkbox_official') || hasClass(obj, 'disabled')) {
            return false;
        }

        if ((wall.isWallReply(obj) || wall.isAdsCreatingPost(obj)) && !window.replyAsList) {
            var url = '/al_groups.php';
            var act = 'get_editor_clubs';
            if (wall.isAdsCreatingPost(obj)) {
                url = '/ads_edit.php';
                act = 'a_get_promoted_post_stealth_groups';
            }

            ajax.post(url, {
                act: act
            }, {
                cache: 1,
                onDone: function(list) {
                    window.replyAsList = list;
                    window.replyAsData = {};
                    each(list, function() {
                        window.replyAsData[this[0]] = this;
                    });
                    wall.replyAsGroupTT(obj, owner);
                }
            });
        } else {
            wall.replyAsGroupTT(obj, owner);
        }
    },
    replyAsGroupDomData: function(obj) {
        var postBox = gpeByClass('_submit_post_box', obj),
            oid = postBox && domData(postBox, 'oid'),
            ownerPhoto = postBox && domData(postBox, 'owner-photo'),
            ownerHref = postBox && domData(postBox, 'owner-href'),
            ownerName = postBox && domData(postBox, 'owner-name');

        return oid && ownerPhoto && ownerHref && ownerName &&
            [oid, ownerPhoto, ownerHref, clean(unclean(ownerName))] || cur.wallTpl && cur.wallTpl.ownerData || false;
    },
    isWallReply: function(obj) {
        var ttChooser = data(obj, 'tt'),
            postBox = gpeByClass('_submit_post_box', obj);

        return postBox && postBox.id.match(/reply_box(-?\d+)_(\d+)/);
    },
    isAdsCreatingPost: function(obj) {
        var postHeader = gpeByClass('ads_edit_ad_submit_post_header', obj);

        return !!postHeader;
    },
    replyAsProfileData: function() {
        return window.cur && cur.wallTpl && cur.wallTpl.profileData ||
            window.wkcur && wkcur.wallTpl && wkcur.wallTpl.profileData ||
            window.mvcur && mvcur.wallTpl && mvcur.wallTpl.profileData;
    },
    replyAsGroupList: function(obj, owner) {
        var list = obj.hasAttribute('data-disallow-profile') ? [] : [wall.replyAsProfileData()],
            ownerData = wall.replyAsGroupDomData(obj);
        if (ownerData) {
            list.push(ownerData);
        }
        if (wall.isWallReply(obj) || wall.isAdsCreatingPost(obj)) {
            each(window.replyAsList, function() {
                if (this[0] != owner) {
                    list.push(this);
                }
            });
        }

        return list;
    },
    replyAsGroupTT: function(obj, owner) {
        var ttChooser = data(obj, 'tt'),
            postBox = gpeByClass('_submit_post_box', obj),
            from = postBox && domData(postBox, 'from-oid');

        if (!wall.replyAsProfileData()) {
            return false;
        }

        if (!ttChooser) {
            var list = wall.replyAsGroupList(obj, owner),
                rows = '';

            if (obj.hasAttribute('data-enable-search')) {
                rows += '<div class="post_from_tt_row_search_wrap"><input class="clear_fix post_from_tt_row post_from_tt_row_search" value="" placeholder="' + getLang('global_search') + '" /><div class="post_from_tt_row_search_progress"></div></div>';
            }

            function rowTemplate(rowClass, rowOid, rowHref, rowImageSrc, rowText) {
                return '<a id="_post_from_tt_row_oid_' + rowOid + '" class="clear_fix post_from_tt_row _post_from_tt_row_searchable' + rowClass + '" data-from-oid="' + rowOid + '" href="' + rowHref + '"><img class="post_from_tt_image" src="' + rowImageSrc + '" aria-label="' + rowText + '">' + rowText + '</a>';
            }

            each(list, function() {
                var cl = (from == this[0]) ? ' active' : '';
                rows += rowTemplate(cl, this[0], this[2], this[1], this[3]);
            });

            ttChooser = new ElementTooltip(obj, {
                content: '<div class="post_from_tt_choose _post_scroll_wrap">' + rows + '</div>',
                appendToParent: true,
                autoHide: true,
                customShow: true,
                defaultSide: 'bottom',
                offset: function() {
                    return wall.isAdsCreatingPost(obj) ? [obj.offsetWidth / 2 + 8.5, -2] : [-10, -5];
                },
                onFirstTimeShow: function(ttel) {
                    var rowEls = geByClass('post_from_tt_row', ttel);
                    each(rowEls, function(i, row) {
                        if (hasClass(row, 'post_from_tt_row_search')) {
                            return;
                        }
                        addEvent(row, 'click', wall.setReplyAsGroup.pbind(obj, {
                            from: domData(this, 'from-oid')
                        }));
                    });

                    var searchElement = geByClass1('post_from_tt_row_search', ttel);
                    if (searchElement) {
                        var searchableRowEls = geByClass('_post_from_tt_row_searchable', ttel);
                        var searchUrl = obj.getAttribute('data-search-url');
                        var searchTermsDone = {};
                        addEvent(searchElement, 'keyup valueChanged', function() {
                            var searchTerm = trim(val(searchElement)).toLowerCase();
                            if (searchUrl && searchTerm) {
                                if (obj.searchRequestTimeout) {
                                    clearTimeout(obj.searchRequestTimeout);
                                    delete obj.searchRequestTimeout;
                                }
                                var searchProgress = geByClass1('post_from_tt_row_search_progress', ttel);
                                if (!geByClass1('pr', searchProgress)) {
                                    showProgress(searchProgress);
                                }
                                obj.searchRequestTimeout = setTimeout(function() {
                                    if (searchTermsDone[searchTerm]) {
                                        hideProgress(searchProgress);
                                        return;
                                    }
                                    ajax.plainpost(searchUrl, {
                                        str: searchTerm
                                    }, function(response) {
                                        searchTermsDone[searchTerm] = true;
                                        response = JSON.parse(response);
                                        each(response, function() {
                                            if (!ge('_post_from_tt_row_oid_' + this[0])) {
                                                var newRow = se(rowTemplate('', this[0], this[2], this[1], this[3]));
                                                geByClass1('ui_scroll_content', ttel).appendChild(newRow);
                                                addEvent(newRow, 'click', wall.setReplyAsGroup.pbind(obj, {
                                                    from: domData(newRow, 'from-oid')
                                                }));

                                                if (!window.replyAsData[this[0]]) {
                                                    window.replyAsData[this[0]] = this;
                                                }
                                            }
                                        });

                                        searchableRowEls = geByClass('_post_from_tt_row_searchable', ttel);
                                        setTimeout(function() {
                                            ttChooser.scroll.update();
                                            ttChooser.updatePosition();
                                        }, 0);
                                        hideProgress(searchProgress);
                                    }, function() {
                                        hideProgress(searchProgress);
                                    });
                                }, 500);
                            }
                            each(searchableRowEls, function(i, row) {
                                toggle(row, (searchTerm === '') || (row.innerText.toLowerCase().indexOf(searchTerm) !== -1));
                            });
                        });
                    }
                    this.rows = rowEls;
                    this.scroll = new uiScroll(geByClass1('_post_scroll_wrap', ttel));
                    setTimeout(function() {
                        ttChooser.scroll.update();
                        ttChooser.updatePosition();
                    }, 0);
                },
                onShow: function(ttel) {
                    setTimeout(function() {
                        if (!ttChooser.scroll) {
                            return;
                        }

                        var active = geByClass1('active', ttel),
                            newScroll = active ? active.offsetTop - (ttChooser.scroll.data.viewportHeight - getSize(active)[1]) / 2 : 0;
                        ttChooser.scroll.scrollTop(newScroll);

                        var searchElement = geByClass1('post_from_tt_row_search', ttel);
                        if (searchElement) {
                            elfocus(searchElement);
                        }
                    }, 0);
                },
                onHide: function(ttel) {
                    var searchElement = geByClass1('post_from_tt_row_search', ttel);
                    if (searchElement) {
                        val(searchElement, '');
                    }
                }
            });
            data(obj, 'tt', ttChooser);
        }
        if (owner && ttChooser.isShown() && !obj.hasAttribute('data-disallow-profile')) {
            wall.setReplyAsGroup(obj, {
                from: (from == vk.id ? owner : vk.id)
            });
        }

        if (obj.tt && obj.tt.hide) {
            obj.tt.hide();
        }
        if (!ttChooser.isShown()) {
            ttChooser.show();
        }
    },
    reportPost: function(obj, ev, postRaw) {
        stManager.add(['privacy.js', 'privacy.css'], function() {
            return Privacy.show(obj, ev, 'report_' + postRaw);
        });
    },

    parsePostId: function(post_id) {
        var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/);
        return {
            type: matches[3] || 'wall',
            id: matches[1] + '_' + matches[4]
        };
    },
    likeIt: function(el, post_id, hash, ev) {
        stopEvent(ev);
        if (!vk.id) return false;
        if (cur.viewAsBox) {
            cur.viewAsBox();
            return cancelEvent(ev);
        }

        var p = wall.parsePostId(post_id),
            like_type = p.type,
            post_raw = p.id,
            postEl = el && (gpeByClass('_post_content', el) || gpeByClass('wl_post', el)) || wall.domPost(post_raw),
            wrapEl = domByClass(postEl, '_like_wrap'),
            iconEl = domByClass(wrapEl, '_icon'),
            countEl = domByClass(wrapEl, '_count'),
            my = hasClass(wrapEl, 'my_like'),
            ref;

        if (post_id == cur.wallLayer) {
            ref = 'wkview';
        } else if (cur.wallType) {
            if (cur.wallType == 'feed') {
                if (cur.section == 'news') {
                    ref = 'feed_' + (cur.subsection ? cur.subsection : cur.section);
                } else if (cur.section == 'recommended') {
                    ref = 'feed_recommended' + (cur.subsection != 'recent' ? ('_' + cur.subsection) : '');
                } else if (cur.section == 'friends' || cur.section == 'groups' || cur.section == 'videos' || cur.section == 'photos') {
                    ref = 'feed_' + cur.section + (cur.subsection ? '_' + cur.subsection : '');
                } else {
                    ref = 'feed_' + cur.section;
                }
            } else if (cur.wallType == 'top') {
                ref = 'wall_top';
            } else {
                ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'));
            }
        } else {
            ref = cur.module;
        }

        ajax.post('like.php', {
            act: my ? 'a_do_unlike' : 'a_do_like',
            object: like_type + post_raw,
            hash: hash,
            wall: 2,
            from: ref
        }, {
            onDone: Wall.likeFullUpdate.pbind(el, post_id),
            onFail: function() {
                return true;
            }
        });
        var count = stripHTML(val(countEl)).replace(/(\s|,)/g, '');
        Wall.likeUpdate(el, post_id, !my, intval(count) + (my ? -1 : 1));

        if (like_type == 'wall' && window.cur.onPostLike) {
            window.cur.onPostLike(el, post_id, my);
        }

        if (cur.onWallLike) {
            cur.onWallLike();
        }
        if (like_type == 'wall') {
            Wall.triggerAdPostStat(post_raw, 'like_post');
        }
        return false;
    },
    likesShow: function(el, post_id, opts) {
        if (el.postDontShowLikes) {
            return;
        }

        opts = opts || {};
        var p = wall.parsePostId(post_id),
            like_type = p.type,
            post_raw = p.id,
            like_obj = like_type + post_raw,
            postEl = el && (gpeByClass('_post_content', el) || gpeByClass('wl_post', el)) || wall.domPost(post_raw),
            wrapClass = opts.views ? '_views_wrap' : (opts.share ? '_share_wrap' : '_like_wrap'),
            wrapEl = domByClass(postEl, wrapClass),
            iconEl = hasClass(el, '_feedback_info_item') ? el : domByClass(wrapEl, '_icon'),
            hasShare = postEl && domByClass(postEl, '_share_wrap');
        if (!iconEl || cur.viewAsBox) return;

        var tt_offset = 41, // @likes-tt-corner-offset + 1
            wrap_left = getXY(wrapEl)[0],
            icon_left = getXY(iconEl)[0],
            icon_width = getSize(iconEl, true)[0],
            left_offset = icon_left + icon_width / 2 - wrap_left - tt_offset;

        var extra = opts.views ? {
            views: 1
        } : (opts.share ? {
            published: 1
        } : {});
        if (opts.listId) {
            extra.list = opts.listId;
        }

        if (hasClass(iconEl, '_feedback_info_item')) {
            var countEl = geByTag1('em', iconEl);
            left_offset = -40

            if (hasClass(iconEl, 'feedback_share')) {
                left_offset += 7
            }

            left_offset += getSize(countEl)[0] / 2
        }

        var ttEl = hasClass(iconEl, '_feedback_info_item') ? iconEl : iconEl.parentNode;
        showTooltip(ttEl, {
            url: '/like.php',
            params: extend({
                act: 'a_get_stats',
                'object': like_obj,
                has_share: hasShare ? 1 : ''
            }, extra),
            slide: 15,
            shift: [-left_offset, opts.views ? 2 : (like_type == 'wall_reply' ? -3 : 7)],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: 'auto',
            checkLeft: true,
            reverseOffset: 80,
            noZIndex: true,
            tip: {
                over: function() {
                    Wall.likesShow(el, post_id, opts);
                }
            },
            onShowStart: function() {
                var cont = ttEl.tt.container;
                setTimeout(function() {
                    setStyle(cont, {
                        left: floatval(getStyle(cont, 'left')) + getXY(iconEl)[0] - icon_left
                    });
                }, 10);
                statlogsValueEvent('likes_show', domData(el, 'shown'));
            },
            typeClass: 'like_tt',
            className: opts.cl || ''
        });
    },
    likesShowList: function(el, post_id, opts) {
        opts = opts || {};
        var p = wall.parsePostId(post_id),
            like_type = p.type,
            post_raw = p.id,
            like_obj = like_type + post_raw,
            postEl = el && (gpeByClass('_post_content', el) || gpeByClass('wl_post', el)) || wall.domPost(post_raw),
            wrapClass = opts.share ? '_share_wrap' : '_like_wrap',
            wrapEl = domByClass(postEl, wrapClass),
            iconEl = domByClass(wrapEl, '_icon');

        if (!iconEl || cur.viewAsBox) return;

        showWiki({
            w: (opts.views ? 'views' : (opts.share ? 'shares' : 'likes')) + '\/' + clean(like_obj)
        }, false, false, {
            queue: 1
        });
    },
    sharesShow: function(el, post_id, opts) {
        Wall.likesShow(el, post_id, extend(opts, {
            share: 1
        }));
    },
    viewsShow: function(el, post_id, opts) {
        Wall.likesShow(el, post_id, extend(opts, {
            views: 1
        }));
    },
    sharesShowList: function(el, post_id, opts) {
        Wall.likesShowList(el, post_id, extend(opts, {
            share: 1
        }));
    },
    viewsShowList: function(el, post_id, opts) {
        Wall.likesShowList(el, post_id, extend(opts, {
            views: 1
        }));
    },
    viewsUpdate: function(el, post_id) {
        var p = wall.parsePostId(post_id),
            like_type = p.type,
            post_raw = p.id,
            like_obj = like_type + post_raw,
            params = {
                act: 'a_get_stats',
                'object': like_obj,
                views: 1
            };
        ajax.post('/like.php', params, {
            cache: 1,
            onDone: function(cnt, title) {
                Wall.likeUpdate(false, post_id, false, cnt, undefined, undefined, 1);
                var fakeEl = ce('div', {
                    innerHTML: title
                });
                el.setAttribute('title', fakeEl.innerText || fakeEl.textContent);
                setTimeout(ajax.invalidate.pbind('/like.php', params), 3000);
            }
        });
    },
    sharesOpen: function(ev, post_id, params) {
        if (cur.viewAsBox) {
            cur.viewAsBox();
            return cancelEvent(ev);
        }
        if (!vk.id) return false;

        stopEvent(ev);
        var p = wall.parsePostId(post_id),
            like_type = p.type,
            post_raw = p.id,
            like_obj = like_type + post_raw;
        showBox('/like.php', extend({
            act: 'publish_box',
            object: like_obj
        }, params));
        if (like_type == 'wall') {
            Wall.triggerAdPostStat(post_raw, 'share_post');
        }
        return false;
    },
    customCur: function() {
        if (window.wkcur && wkcur.shown) return wkcur;
        if (window.mvcur && mvcur.mvShown) return mvcur;
        if (window.pvcur && cur.pvShown) return pvcur;
        return cur;
    },
    processPostReplyActions: function(reply) {

    },

    updatePostAuthorData: function(post_id) {
        geByClass('_post_author_data_' + post_id).forEach(function(el) {
            el.post_author_data_update = true;
        });
    },

    closeComments: function(el, owner, post_id, hash, onDone) {
        var close = intval(domData(el, 'closed')) ? 0 : 1;

        ajax.post('al_wall.php', {
            act: 'close_comments',
            owner_id: owner,
            post_id: post_id,
            close: close,
            hash: hash
        }, {
            onDone: function() {
                if (onDone) {
                    onDone(close);
                } else {
                    var post = gpeByClass('post', el);
                    Wall.onCloseComments(close, post);
                }
            }
        })
    },

    onCloseComments: function(close, post, skip) {
        if (!post || hasClass(post, 'postponed') || !hasClass(post, 'post')) {
            return;
        }

        var commentBut = geByClass1('comment', post);
        var replyBox = geByClass1('reply_box_inner_wrap', post);

        if (!skip && (!commentBut || !replyBox)) {
            var postId = post.id.replace('post', '').split('_');

            ajax.post('al_wall.php', {
                act: 'comment_box',
                owner_id: postId[0],
                post_id: postId[1]
            }, {
                onDone: function(comment, reply) {
                    var commentBut = geByClass1('comment', post);
                    var replyBox = geByClass1('reply_box_inner_wrap', post);

                    if (!commentBut && comment) {
                        var likeBut = geByClass1('like', post);
                        domInsertAfter(se(comment), domNS(likeBut));
                    }

                    if (!replyBox && reply) {
                        var repliesList = geByClass1('replies_list', post);
                        domInsertAfter(se(reply), repliesList);
                    }

                    Wall.onCloseComments(close, post, true);
                }
            });

            return;
        }

        toggleClass(post, 'closed_comments', close);

        var action = geByClass1('action_closing_comments', post);
        domData(action, 'closed', close);
        val(action, getLang(close ? 'wall_open_comments' : 'wall_closing_comments'));
    },

    showPostAuthorData: function(el, event) {
        var post_raw = el.className.match(/_post_author_data_(-?\d+_\d+)/)[1] || '';
        var target = event ? event.target : window.event.srcElement;

        if (!post_raw || target != el && target.onmouseover) {
            return;
        }

        if (el.post_author_data_update) {
            delete el.post_author_data_update;

            if (el.post_author_data_tt) {
                el.post_author_data_tt.destroy();
                el.post_author_data_tt = false;
            }
        }

        if (el.post_author_data_tt) {
            return;
        }

        ajax.post('al_page.php', {
            act: 'post_author_data_tt',
            raw: post_raw
        }, {
            onDone: function(html) {
                var anchor = geByClass1('post_link', el) || domFC(el);

                if (!html || !anchor) {
                    el.post_author_data_tt = true;
                    return;
                }

                var opts = {
                    content: html,
                    arrowSize: 'mini',
                    cls: 'post_author_data',
                    defaultSide: 'bottom',
                    align: 'left',
                    id: 'author_tt_' + post_raw
                };

                var messStack = gpeByClass('_im_mess_stack', el);
                if (messStack) {
                    opts.appendTo = messStack;
                } else {
                    opts.appendToParent = true;
                }

                if (vk.widget) {
                    opts.offset = [0, -2];
                    opts.forceSide = 'bottom';
                }

                el.post_author_data_tt = new ElementTooltip(anchor, opts);
                el.post_author_data_tt.show();
            }
        })
    },

    showTopWallTooltip: function(hash) {
        if (cur.topWallFeatureTT) return;

        var topWallTab = ge('page_wall_top');

        if (!topWallTab || !isVisible(topWallTab)) {
            topWallTab = ge('page_wall_top_more');
        }

        if (topWallTab && isVisible(topWallTab)) {
            cur.topWallFeatureTT = new ElementTooltip(geByClass1('ui_tab', topWallTab) || gpeByClass('ui_tab', topWallTab), {
                content: '<div class="feature_tooltip__close" onclick="cur.topWallFeatureTT.hide();"></div>' + getLang('wall_top_feature_text'),
                forceSide: 'top',
                cls: 'feature_intro_tt feature_info_tooltip',
                autoShow: false,
                noHideOnClick: true,
                noAutoHideOnWindowClick: true,
                appendTo: domClosest('page_block', topWallTab),
                onHide: function() {
                    ajax.post('al_index.php', {
                        act: 'hide_feature_tt',
                        hash: hash,
                        type: 'top_wall_web',
                    });
                },
            });

            cur.topWallFeatureTT.show();
        }
    },

    toggleRecommFriend: function(btn, ev, hash) {
        var card = gpeByClass('friend_recomm_card', btn);
        var mid = card && +domData(card, 'uid');
        var from = domData(gpeByClass('ui_gallery', btn), 'from') || 'user_rec';

        if (!mid) {
            return;
        }

        var params = {
            act: 'add',
            mid: mid,
            hash: hash,
            from: from,
            ts: vkNow()
        };
        var midLogs = Wall.friendsRecommLogGet(true, mid);

        if (midLogs.length) {
            Wall.friendsRecommLogClear(mid);
            params.logs = midLogs;
        }

        ajax.post('al_friends.php', params, {
            onDone: function(text) {
                val(btn, text);
                addClass(btn, 'secondary');
                disableButton(btn, true);
                addClass(card, 'friend_recomm_card_accepted');
                re(geByClass1('wall_card_text_special', card));
            },
            onFail: function(text) {
                if (midLogs) {
                    Wall.friendsRecommLogOnFail(midLogs);
                }

                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });

        cancelEvent(ev);
        return false;
    },

    hideRecommFriend: function(btn, ev, hash) {
        var card = gpeByClass('friend_recomm_card', btn);
        var mid = card && +domData(card, 'uid');
        var from = domData(gpeByClass('ui_gallery', btn), 'from') || 'user_rec';

        if (!mid) {
            return;
        }

        ajax.post('al_friends.php', {
            act: 'hide_possible',
            mid: mid,
            hash: hash,
            from: from
        }, {
            onDone: function() {
                var gallery = uiGetGallery(gpeByClass('ui_gallery', btn));

                if (gallery) {
                    var item = gpeByClass('ui_gallery_item', btn);
                    gallery.removeItem(item);
                }
            },
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });

        cancelEvent(ev);
        return false;
    },

    onClickRecommFriend: function(el) {
        var mid = +domData(el, 'uid');
        var from = domData(gpeByClass('ui_gallery', el), 'from') || 'user_rec';

        if (!mid) {
            return;
        }

        Wall.friendsRecommLogSave(['open_user', mid, vkNow(), from]);
    },

    friendsRecommLogSave: function(log, force) {
        var logs = Wall.friendsRecommLogGet();
        logs.push(log);
        ls.set('friends_recomm', logs);

        Wall.friendsRecommLogSend(force);
    },

    friendsRecommLogGet: function(prepare, mid, exclude) {
        var logs = ls.get('friends_recomm') || [];

        if (mid) {
            logs = logs.filter(function(log) {
                return (exclude ? log[1] !== mid : log[1] === mid) && inArray(log[0], ['show_user_rec', 'open_user']);
            });
        }

        if (prepare) {
            logs = logs.map(function(log) {
                return log.join('|');
            });
        }

        return logs;
    },

    friendsRecommLogClear: function(mid) {
        if (mid) {
            var logs = Wall.friendsRecommLogGet(false, mid, true);

            if (!logs.length) {
                ls.remove('friends_recomm');
            } else {
                ls.set('friends_recomm', logs);
            }

        } else {
            ls.remove('friends_recomm');
        }
    },

    friendsRecommLogSend: function(force) {
        if (!cur.friendsRecommLogIdle && window.curNotifier && curNotifier.idle_manager) {
            if (!isArray(cur.onIdle)) {
                cur.onIdle = [];
            }
            if (!isArray(cur.onUnidle)) {
                cur.onUnidle = [];
            }

            cur.friendsRecommLogIdle = function() {
                clearTimeout(cur.friendsRecommLog)
            };
            cur.onIdle.push(cur.friendsRecommLogIdle);
            cur.onUnidle.push(Wall.friendsRecommLogSend);
        }

        clearTimeout(cur.friendsRecommLog);

        if (force) {
            Wall._friendsRecommLogSend();
        } else {
            cur.friendsRecommLog = setTimeout(Wall._friendsRecommLogSend, 10000);
        }
    },

    _friendsRecommLogSend: function() {
        if (cur.friendsRecommProcess) {
            return;
        }

        var logs = Wall.friendsRecommLogGet(true);

        if (logs.length) {
            cur.friendsRecommProcess = true;
            Wall.friendsRecommLogClear();

            ajax.post('al_friends.php', {
                act: 'a_recomm_logs',
                logs: logs
            }, {
                onDone: function() {
                    delete cur.friendsRecommProcess;
                },
                onFail: function() {
                    Wall.friendsRecommLogOnFail(logs);
                    delete cur.friendsRecommProcess;
                    return true;
                }
            });
        }
    },

    friendsRecommLogOnFail: function(prevLogs) {
        var logs = Wall.friendsRecommLogGet();
        logs = prevLogs.map(function(log) {
            return log.split('|');
        }).concat(logs);
        ls.set('friends_recomm', logs);
    }
}

var wall = Wall;

WallUpload = {
    _videoUploadIndex: null,

    photoUploaded: function(info, params) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, ''),
            ind = info.fileName ? i + '_' + info.fileName : info,
            prg = ge('upload' + ind + '_progress_wrap');

        prg && hide(geByClass1('progress_x', prg));
        ajax.post('al_photos.php', extend({
            act: 'choose_uploaded'
        }, params), {
            onDone: function(media, data) {
                WallUpload.addMedia().chooseMedia('photo', media, extend(data, {
                    upload_ind: i + '_' + fileName
                }));
            },
            onFail: WallUpload.uploadFailed.pbind(info)
        });
    },
    uploadFailed: function(info, code) {
        var i = info.ind !== undefined ? info.ind : info,
            options = Upload.options[i],
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
        if (Upload.types[i] == 'fileApi' && !options.wiki_editor) {
            var lnkId, ind = info.fileName ? i + '_' + info.fileName : info;
            if (cur.imMedia) {
                re('upload' + ind + '_progress_wrap');
                lnkId = cur.imMedia.lnkId;
                cur.addMedia[lnkId].unchooseMedia();
            } else if (cur.addMedia) {
                re('upload' + ind + '_progress_wrap');
                lnkId = (cur.attachMediaIndexes || {})[fileName];
                if (lnkId) cur.addMedia[lnkId].unchooseMedia();
            }
            if (options.filesTotalCount == 1) {
                setTimeout(showFastBox({
                    title: getLang('global_error')
                }, getLang('wall_add_photo_error')).hide, 2000);
            }
        }
        // hide(box.progress);
        topError('Upload failed', {
            dt: -1,
            type: 102,
            url: (ge('file_uploader_form' + i) || {}).action
        });
        Upload.embed(i);
    },
    show: function() {
        if (!cur.uploadInited) return;
        var s = {};
        if (cur.wallType == 'feed') {
            removeClass(cur.uploadWrap, 'post_upload_min_wrap');
        } else {
            show(cur.uploadWrap);
        }
    },
    hide: function() {
        if (!cur.uploadInited) return;
        if (cur.wallType == 'feed') {
            addClass(cur.uploadWrap, 'post_upload_min_wrap');
        } else {
            hide(cur.uploadWrap);
        }
        hide('post_upload_dropbox');
    },
    addMedia: function() {
        return cur.dropboxAddMedia || cur.wallAddMedia;
    },
    attachEl: function() {
        return WallUpload.dropboxAttachEl || ge('submit_post_box');
    },
    attachToEl: function(el) {
        el = ge(el);
        var dropbox = ge('post_upload_dropbox');
        WallUpload.dropboxAttachEl = el;
        if (!el || !dropbox) {
            return false;
        }

        el.insertBefore(dropbox, domFC(el));
    },
    checkDragDrop: function() {
        var b = browser,
            bv = floatval(browser.version);
        if (!(b.msie && bv >= 9 || b.mozilla && bv >= 3.5 || b.chrome || b.safari)) { // Drag'n'Drop reqs
            return false;
        }
        return (window.XMLHttpRequest || window.XDomainRequest) &&
            (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
    },
    initCallback: function() {
        if (cur.editingPost) {
            WallUpload.init();
        } else {
            Wall.showEditPost();
        }
    },
    init: function() {
        if (!cur.withUpload) return;

        if (!cur.uploadAdded) {
            cur.uploadAdded = true;
            if (!window.Upload) {
                stManager.add(['upload.js', 'video_upload.js'], function() {
                    WallUpload.initLoader();
                    Wall._videoUploadIndex = WallUpload.initVideoUploader();
                });
            } else {
                WallUpload.initLoader();
                Wall._videoUploadIndex = WallUpload.initVideoUploader();
            }
        } else {
            WallUpload.show();
        }
    },

    initVideoUploader: function() {
        var data = cur.wallUploadVideoOpts;
        if (!data || !data.vars.is_wall_upload_allowed) {
            return;
        }
        var uploadHolder = ge('post_field_upload_video');
        var dropbox = ge('post_upload_video_dropbox');
        data.options.from = 'post';

        return window.VideoInlineUpload.getUploadModule(uploadHolder, dropbox, data, WallUpload.addMedia());
    },

    initLoader: function() {
        removeEvent(bodyNode, 'dragover dragenter');
        var data = cur.wallUploadOpts,
            field = ge('post_field');

        if (!WallUpload.checkDragDrop()) return;

        cur.uploadWrap = ce('div', {
            className: 'post_upload_wrap fl_r',
            innerHTML: '<div id="post_field_upload" class="post_upload"></div>'
        });
        domInsertBefore(cur.uploadWrap, field);

        cur.uploadVideoWrap = ce('div', {
            className: 'post_upload_video_wrap fl_r',
            innerHTML: '<div id="post_field_upload_video" class="post_upload_video"></div>'
        });
        domInsertBefore(cur.uploadVideoWrap, field);

        var submitBox = WallUpload.attachEl();
        submitBox.insertBefore(ce('div', {
            id: 'post_upload_dropbox',
            className: 'post_upload_dropbox',
            innerHTML: '' +
                '<div class="post_upload_dropbox_inner">' +
                '<div class="post_upload_label drop_label">' + (data.opts.lang.wall_drop_media_here || 'Drop files here') + '</div>' +
                '<div class="post_upload_label release_label">' + (data.opts.lang.wall_release_media_here || 'Release button to attach files') + '</div>' +
                '</div>'
        }), submitBox.firstChild);

        cur.wallUploadInd = Upload.init('post_field_upload', data.url, data.params, {
            accept: 'image/jpeg,image/png,image/gif',
            dragEl: bodyNode,
            dropbox: 'post_upload_dropbox',
            file_input: null,
            file_name: 'photo',
            file_size_limit: 1024 * 1024 * 25, // 25Mb
            file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
            file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
            file_match: data.opts.ext_re,
            lang: data.opts.lang,
            noFlash: 1,
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: 'photo',
            max_attempts: 3,
            server: data.opts.server,
            error: data.opts.default_error,
            error_hash: data.opts.error_hash,
            label: data.opts.label,
            wiki_editor: 0,
            onUploadStart: function(info, res) {
                var i = info.ind !== undefined ? info.ind : info,
                    options = Upload.options[i];
                if (Upload.types[i] == 'form') {
                    // show(box.progress);
                    geByClass1('file', ge('choose_photo_upload')).disabled = true;
                }
                if (Upload.types[i] == 'fileApi') {
                    if (cur.notStarted) {
                        if (!cur.preventBoxHide) {
                            boxQueue.hideLast();
                        }
                        delete cur.notStarted;
                    }
                    if (options.multi_progress) this.onUploadProgress(info, 0, 0);
                }
            },
            onUploadComplete: function(info, res) {
                var params, i = info.ind !== undefined ? info.ind : info,
                    fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
                try {
                    params = eval('(' + res + ')');
                } catch (e) {
                    params = q2ajx(res);
                }
                if (!params.photos) {
                    Upload.onUploadError(info);
                    return;
                }
                WallUpload.photoUploaded(info, params);
            },
            onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                var i = info.ind !== undefined ? info.ind : info;
                if (Upload.types[i] == 'fileApi') {
                    var lnkId = (cur.attachMediaIndexes || {})[i];
                    if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
                        var data = {
                            loaded: bytesLoaded,
                            total: bytesTotal
                        };
                        if (info.fileName) data.fileName = info.fileName.replace(/[&<>"']/g, '');
                        WallUpload.addMedia().showMediaProgress('photo', i, data);
                    }
                }
            },
            onUploadError: WallUpload.uploadFailed,
            onCheckServerFailed: function() {
                delete cur.uploadInited;
                WallUpload.hide();
            },
            onUploadCompleteAll: function(i) {
                if (Upload.types[i] == 'form') {
                    Upload.embed(i);
                }
            },
            onDragEnter: function() {
                if (cur.editingPost) {
                    WallUpload.init();
                } else {
                    Wall.showEditPost();
                }
            },
            onNoFilteredCallback: function(files) {
                if (Wall._videoUploadIndex) {
                    Upload.onFileApiSend(Wall._videoUploadIndex, files);
                }
            }
        });
        cur.uploadInited = true;
        WallUpload.show();
        if (cur.wallUploadFromDrag) {
            if (cur.wallUploadFromDrag == 1) {
                show('post_upload_dropbox');
            }
            delete cur.wallUploadFromDrag;
        }
    }
};

Composer = {
    init: function(el, options) {
        if (!(el = ge(el))) {
            return null;
        }

        var composer = data(el, 'composer');
        if (composer) {
            return composer;
        }
        composer = {
            input: el,
            inited: false,
            options: options
        };

        data(el, 'composer', composer);

        el.parentNode.insertBefore(
            composer.wddWrap = ce('div', {
                className: 'composer_wdd clear_fix ' + (options.wddClass || ''),
                id: el.id + '_composer_wdd',
                innerHTML: '<input type="hidden" id="' + el.id + '_composer_wdd_term"/>'
            }, {
                width: options.width || getSize(el)[0]
            }),
            el.nextSibling
        );

        composer.wddInput = composer.wddWrap.firstChild;
        composer.wdd = WideDropdown.initSelect(composer.wddWrap, extend({
            text: composer.wddInput,
            input: el,
            noResult: options.lang.noResult || '',
            introText: options.lang.introText || '',
            toup: options.toup,
            wddOpts: options.wddOpts,
            searchKeys: options.searchKeys,
            width: 'auto',
            onItemSelect: Composer.onItemSelect.bind(Composer).pbind(composer)
        }, options.wddOpts || {
            url: 'hints.php',
            params: {
                act: 'a_json_friends',
                from: 'composer'
            }
        }));

        el.dd = composer.wddWrap.id;

        Composer.initEvents(composer);

        if (options.media) {
            composer.addMedia = new MediaSelector(options.media.lnk, options.media.preview, options.media.types, options.media.options);
        }

        setStyle(composer.wddWrap, 'width', '');

        composer.inited = true;
        Composer.updateAutoComplete(composer);

        composer.edit = options.edit
        composer.isReply = options.isReply

        Composer.updateArticleConvertSuggest(composer)

        var prevOnMediaChanged = cur.onMediaChanged
        cur.onMediaChanged = function() {
            Composer.updateArticleConvertSuggest(composer)

            if (prevOnMediaChanged) {
                prevOnMediaChanged()
            }
        }

        return composer;
    },
    initEvents: function(composer) {
        addEvent(composer.input, 'keyup keydown keypress', Composer.onKeyEvent.pbind(composer));
        addEvent(composer.input, 'click mousedown mouseup focus blur paste', Composer.onMouseEvent.pbind(composer));
    },
    destroy: function(composer) {
        WideDropdown.deinit(composer.wddWrap);
        cleanElems(composer.input, composer.wddWrap);
        re(composer.wddWrap);
        composer.inited = false;
        if (composer.addMedia) composer.addMedia.destroy();
        data(composer.input, 'composer', null);

        re(composer.articleConvertEl)
        composer.articleConvertEl = false
    },

    onKeyEvent: function(composer, event) {
        var isArrowKey = !event.shiftKey && inArray(event.keyCode, [KEY.UP, KEY.DOWN, KEY.RETURN]);
        var controlEvent = composer.wdd && isArrowKey;
        if (event.type == 'keypress' || event.type == 'keydown') {
            if (event.keyCode == KEY.RETURN || event.keyCode == 10) {
                if (!composer.select || !composer.select.isVisible()) {
                    if (event.ctrlKey && isFunction(composer.options.onSubmit)) {
                        // composer.input.blur();
                        // composer.options.onSubmit();
                        return true;
                    }
                } else {
                    triggerEvent(document, event.type, event);
                    return cancelEvent(event);
                }
            }
            if (event.keyCode == KEY.TAB) {
                var input = composer.input,
                    value = window.Emoji ? Emoji.editableVal(input) : '',
                    curPos = Composer.getCursorPosition(input);
                curValue = value.substr(0, curPos) + "\001" + value.substr(curPos),
                    matches = curValue.match(/^[\s\S]*(@|\*)[\S]+\s*\([\s\S]*?\001[\s\S]*?\)\s*/);

                if (matches) {
                    var pos = matches[0].length - 1;
                    elfocus(composer.input, pos, pos);
                    return cancelEvent(event);
                }
            }
            var cnt = 0;
            for (var i in composer.wdd.shown) {
                cnt += 1;
            }
            if (controlEvent && isVisible(composer.wdd.listWrap) && cnt) {
                if (event.type == (browser.opera && !browser.chrome ? 'keypress' : 'keydown')) {
                    WideDropdown._textEvent(event);
                }
                return cancelEvent(event);
            }
        }

        if (event.type == 'keyup' && !controlEvent) {
            if (event.keyCode == 65 && event.ctrlKey) { // fix Ctrl+A
                return;
            }
            if (composer.wdd && inArray(event.keyCode, [KEY.SPACE, KEY.HOME, 190, 191, 78, 55, 49])) {
                Composer.hideSelectList(composer);
            }
        }
        if (event.type == 'keyup' && (!controlEvent || event.keyCode == KEY.RETURN)) {
            Composer.updateAutoComplete(composer, event);
        }

        Composer.updateArticleConvertSuggest(composer)
    },
    isArticleConvertSuggestAvailable: function(composer) {
        if (composer.edit || composer.isReply) {
            return false
        }

        var mediaTypes = cur.wallAddMedia ? cur.wallAddMedia.types : false
        var canCreateArticle = false
        if (mediaTypes) {
            for (var i = 0; i < mediaTypes.length; i++) {
                if (mediaTypes[i][0] == 'article') {
                    canCreateArticle = true
                    break
                }
            }
        }

        if (!canCreateArticle || !isArticleEditorAvailable()) {
            return false
        }

        var supportedMedias = true
        each((cur.wallAddMedia.getMedias() || []), function(index, media) {
            if (!inArray(media[0], ['photo', 'video', 'postpone', 'mark_as_ads'])) {
                supportedMedias = false
                return false
            }
        })
        if (!supportedMedias) {
            return false
        }

        var isEnoughSymbols = cur.options.articleConvertThreshold > 0 && composer.curValue.length >= cur.options.articleConvertThreshold
        if (!isEnoughSymbols) {
            return false
        }

        return true
    },
    updateArticleConvertSuggest: function(composer) {
        if (Composer.isArticleConvertSuggestAvailable(composer)) {
            if (!composer.articleConvertEl) {
                var inputWrapEl = gpeByClass('post_field_wrap', composer.input)

                composer.articleConvertEl = se('<button class="article_post_convert round_button">' + getLang('profile_convert_to_article_short') + '</button>')
                inputWrapEl.appendChild(composer.articleConvertEl)

                removeEvent(composer.articleConvertEl)
                addEvent(composer.articleConvertEl, 'click', function() {
                    cur.postComposer = composer

                    var medias = []
                    each((cur.wallAddMedia.getMedias() || []), function(index, media) {
                        if (inArray(media[0], ['photo', 'video'])) {
                            medias.push(media[0] + '_' + media[1])
                        }
                    })

                    openArticleEditor(cur.oid, 0, {
                        text: composer.curValue,
                        medias: medias,
                    })
                })
            }

            show(composer.articleConvertEl)
        } else {
            re(composer.articleConvertEl)
            delete composer.articleConvertEl
        }
    },
    onMouseEvent: function(composer, event) {
        if (event.type == 'blur') {
            Composer.hideSelectList(composer);
            return;
        }
        if (event.type == 'focus' || event.type == 'click') {
            Composer.updateAutoComplete(composer, event);
        }
        if (event.type == 'paste') {
            setTimeout(Composer.updateAutoComplete.pbind(composer, event), 0);
        }
    },
    updateAutoComplete: function(composer, event) {
        var input = composer.input,
            value = (composer.options && composer.options.getValue || window.Emoji && Emoji.editableVal || val)(input),
            pos = Math.max(value.lastIndexOf('@'), value.lastIndexOf('*')),
            term = false;

        if (pos > -1) {
            var curPos = Composer.getCursorPosition(input),
                prefValue = value.substr(0, curPos),
                pos = Math.max(prefValue.lastIndexOf('@'), prefValue.lastIndexOf('*')),
                matches = prefValue.match(/(^|[\s.,:\'\"��;>\)\(]|\#[\w_\.\u0400-\u04FF]+)[@\*]([^,@\*\(\)\?\!\s\n\r \u00A0]*)$/);
            if (matches && matches[2].substr(-1) !== '.') {
                term = matches[2];
            }
        }

        if (term === false) {
            delete composer.ignoredTerm;
        }
        if (composer.ignoredTerm !== undefined && term == composer.ignoredTerm) {
            term = false;
        }

        composer.curValue = value;
        composer.curTerm = term;
        composer.curPos = pos;
        val(composer.wddInput, term);
        Composer.toggleSelectList(composer);

        if (event && (event.type == 'keyup' || event.type == 'paste')) {
            if (composer.options.onValueChange) {
                composer.options.onValueChange(value, event.type != 'keyup');
            }
            if (composer.addMedia) {
                composer.addMedia.checkMessageURLs(value, event.type != 'keyup');
            }
            if (composer.options.checkLen) {
                composer.options.checkLen(value);
            }
        }
    },
    toggleSelectList: function(composer) {
        var term = composer.curTerm;
        if (term === false) {
            Composer.hideSelectList(composer);
        } else {
            Composer.showSelectList(composer, term);
        }
    },
    hideSelectList: function(composer) {
        composer.wddInput.focused = false;
        WideDropdown._hideList(composer.wdd);

        var options = composer.options || {};
        if (options.onHide) {
            options.onHide();
        }
    },
    showSelectList: function(composer, term) {
        composer.wddInput.focused = true;
        WideDropdown.items(composer.wdd.id, cur.wallMentions || []);
        WideDropdown._updateList(composer.wdd, false, term);

        var options = composer.options || {};
        if (options.onShow) {
            options.onShow();
        }
    },
    onItemSelect: function(composer, item) {
        if (!item) {
            return false;
        }

        var mention = item[2].replace('@', ''),
            alias = item[8] || item[1],
            prefValue = composer.curValue.substr(0, composer.curPos),
            suffValue = composer.curValue.substr(composer.curPos);

        if (!mention) {
            if (itemId > 0) {
                mention = 'id' + itemId;
            } else {
                mention = 'club' + Math.abs(itemId);
            }
        }

        var noAlias = prefValue.match(/\#[\w_\.\u0400-\u04FF]+$/i) ? true : false;

        var isEmoji = (window.Emoji && composer.input.emojiId !== undefined);
        if (isEmoji) {
            suffValue = clean(suffValue);
        } else {
            alias = replaceEntities(alias);
        }

        cur.selNum = (cur.selNum || 0) + 1;
        var re = new RegExp('^(@|\\*)' + escapeRE(composer.curTerm) + '(?:\\s+\\((?:(.*?)\\))?\\s*)?', '');
        suffValue = suffValue.replace(re, function(whole, asterisk, prevAlias) {
            var replacement = asterisk + mention + ' ';
            if (noAlias) {
                replacement += isEmoji ? '<span id="tmp_sel_' + cur.selNum + '"></span>' : '';
            } else {
                replacement += (isEmoji ? '<span id="tmp_sel_' + cur.selNum + '">' : '') + '(';
                replacement += alias.replace(/[\(\)\]\[]/g, '');
                replacement += ')' + (isEmoji ? '</span>' : '') + ' ';
            }

            return replacement;
        });

        if (!noAlias && prefValue && !prefValue.match(/[\.\(\)\?\!\s\n\r\'\"�� \u00A0]$/)) {
            suffValue = ' ' + suffValue;
        }

        Composer.hideSelectList(composer);
        if (isEmoji) {
            Emoji.val(composer.input, clean(prefValue) + suffValue);
            Emoji.focus(composer.input);
            Emoji.editableFocus(composer.input, ge('tmp_sel_' + cur.selNum), true);
        } else {
            val(composer.input, prefValue + suffValue);
            elfocus(composer.input);
        }
        return false;
    },
    getCursorPosition: function(node) {
        if (node.selectionStart !== undefined) {
            return node.selectionStart;
        } else if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (!sel || !sel.rangeCount) {
                return 0;
            }

            var range = sel.getRangeAt(0),
                preRange = range.cloneRange(),
                fakeNode = ce('div');

            preRange.selectNodeContents(node);
            preRange.setEnd(range.startContainer, range.startOffset);
            fakeNode.appendChild(preRange.cloneContents());
            return (window.Emoji ? Emoji.editableVal : val)(fakeNode).replace(/\n$/, '').length;
        }

        return 0;
    },
    getSendParams: function(composer, delayedCallback, silentCheck) {
        var addMedia = composer.addMedia || {},
            media = addMedia.chosenMedia || {},
            medias = (addMedia && addMedia.getMedias) ? addMedia.getMedias() : [],
            share = (addMedia.shareData || {}),
            limit = composer && composer.options.media && composer.options.media.options.limit || 0;


        var input = composer.input;
        var message = trim(window.Emoji ? Emoji.editableVal(input) : val(input));
        var params = {
            message: message
        };
        var attachI = 0;
        var needAttachmentAccessHash = hasClass(gpeByClass('post', input), 'suggest');

        if (isArray(media) && media.length) {
            medias.push(clone(media));
        }

        setStyle(bodyNode, {
            cursor: 'default'
        });
        var editCont = ge('wpe_cont'),
            errEl = geByClass1('wpe_error', editCont);
        errEl && hide(errEl);

        function showError(errorMessage) {
            if (!errEl) {
                errEl = se('<div class="wpe_error error"><div>');
                editCont.insertBefore(errEl, domFC(editCont));
            }

            errEl.innerHTML = (errorMessage.length > 60 ? ('<div class="msg_text">' + errorMessage + '</div>') : errorMessage);
            if (!isVisible(errEl)) {
                slideDown(errEl, 100);
                scrollToY(getXY(errEl)[1] - 15);
                animate(ge('box_layer_wrap'), {
                    scrollTop: 0
                });
            }
        }

        if (medias.length) {
            var delayed = false;
            each(medias, function(k, v) {
                if (!isArray(v) || !v.length) {
                    return;
                }
                var type = this[0],
                    attachVal = this[1];
                if (attachI >= limit && type != 'postpone') {
                    return false;
                }

                switch (type) {
                    case 'poll':
                        var poll = addMedia.pollData(silentCheck);
                        if (!poll) {
                            params.delayed = true;
                            return false;
                        }
                        if (intval(attachVal)) {
                            params.poll_id = intval(attachVal);
                        }
                        attachVal = poll.question;
                        delete poll.question;
                        params = extend(params, poll);
                        break;

                    case 'share':
                        if (
                            share.failed ||
                            !share.url ||
                            !share.title && (!share.images || !share.images.length) && !share.photo_url && !share.video
                        ) {
                            if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                                params.delayed = true;
                                return false;
                            } else {
                                return;
                            }
                        }
                        if ((cur.options.share || {}).button_exclusive && share.button_text && share.button_action) {
                            var errorMessage;
                            if (medias.length > 1) {
                                errorMessage = getLang('global_share_too_many_attachments');
                            }
                            if ((params.message.split("\n").length - 1) > (cur.options.share || {}).button_exclusive_max_message_newlines) {
                                errorMessage = getLang('global_share_too_many_newlines');
                            }
                            if (params.message.length > (cur.options.share || {}).button_exclusive_max_message_len) {
                                errorMessage = getLang('global_share_too_long_message');
                            }

                            var messageUrls = extractUrls(" " + params.message + " ");
                            var shareUrl = extractUrls(" " + share.url + " ")[0];
                            if (shareUrl && messageUrls.length) {
                                if (shareUrl.query === '/') {
                                    shareUrl.query = '';
                                }
                                if (shareUrl.domain.substr(0, 4) === 'www.') {
                                    shareUrl.domain = shareUrl.domain.substr(4);
                                }

                                for (var i = 0; i < messageUrls.length; ++i) {
                                    var url = messageUrls[i];
                                    if (url.query === '/') {
                                        url.query = '';
                                    }
                                    if (url.domain.substr(0, 4) === 'www.') {
                                        url.domain = url.domain.substr(4);
                                    }

                                    if (shareUrl.domain != url.domain || shareUrl.query != url.query) {
                                        errorMessage = getLang('global_share_too_many_links');
                                        break;
                                    }
                                }
                            }

                            if (errorMessage) {
                                showError(errorMessage);
                                params.delayed = true;
                                return false;
                            }
                        }

                        if (!share.title) {
                            showError(getLang('global_share_title_required'));
                            params.delayed = true;
                            return false;
                        }

                        if (share.video) {
                            attachVal = share.video_owner_id + '_' + share.video_id;
                            params.snippet_video = 1;
                        } else {
                            attachVal = (share.user_id && share.photo_id && !share.noPhoto) ? (share.user_id + '_' + share.photo_id) : '';
                        }
                        if (share.share_upload_failed && !attachVal) {
                            share.share_upload_failed = 0;
                            params.delayed = true;
                            return false;
                        }
                        var needUploadShare = share.images && share.images.length &&
                            !isArray(share.images[cur.shareShowImg]) &&
                            !silentCheck &&
                            !attachVal &&
                            !share.noPhoto &&
                            !share.video;
                        if (needUploadShare) {
                            addMedia.uploadShare(delayedCallback);
                            params.delayed = true;
                            return false;
                        }
                        if ((cur.options.share || {}).require_image && !attachVal) {
                            showError(getLang('global_share_image_required'));
                            params.delayed = true;
                            return false;
                        }
                        if (share.initialPattern && (trim(message) == share.initialPattern)) {
                            params.message = '';
                        }
                        extend(params, {
                            url: share.url,
                            mode: share.mode,
                            title: replaceEntities(share.title),
                            description: replaceEntities(share.description),
                            button_text: replaceEntities(share.button_text),
                            button_action: share.button_action,
                            extra: share.extra,
                            extra_data: share.extraData,
                            photo_url: share.video ? '' : replaceEntities(share.photo_url),
                            placeholder_inserted: share.placeholder_inserted,
                            open_graph_data: (share.openGraph || {}).data,
                            open_graph_hash: (share.openGraph || {}).hash
                        });
                        break;
                    case 'page':
                        if (share.initialPattern && (trim(message) == share.initialPattern)) {
                            params.message = '';
                        }
                        break;
                    case 'postpone':
                        params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
                        return;
                    case 'mark_as_ads':
                        params.mark_as_ads = 1;
                        return;
                    case 'pretty_cards':
                        if (!addMedia.prettyCardGallery) {
                            return;
                        }

                        if (addMedia.prettyCardGallery.needSendData()) {
                            addMedia.prettyCardGallery.saveCards(delayedCallback, function(response) {
                                showError(response);
                            });
                            params.delayed = true;
                            return false;
                        }

                        var prettyCardsResult = addMedia.prettyCardGallery.getSendData();
                        attachVal = prettyCardsResult.attachVal;

                        break;
                }
                if (this[3] && trim(message) == this[3]) {
                    params.message = '';
                }
                if (needAttachmentAccessHash && this[4]) {
                    attachVal += '_' + this[4];
                }
                params['attach' + (attachI + 1) + '_type'] = type;
                params['attach' + (attachI + 1)] = attachVal;
                attachI++;
            });
        }
        if (!addMedia.multi && !params.postpone && addMedia.postponePreview) {
            params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
        }
        if (!addMedia.multi && !params.mark_as_ads && addMedia.markAsAds) {
            params.mark_as_ads = 1;
        }

        return params;
    },
    reset: function(composer) {
        var input = composer.input,
            value = val(input),
            media = composer.addMedia,
            state = {
                value: value
            };

        //val(input, '');
        if (window.Emoji) {
            Emoji.val(input, '');
        } else {
            input.innerHTML = '';
        }
        if (media) {
            state.urlsCancelled = clone(media.urlsCancelled);
            media.unchooseMedia();
            media.urlsCancelled = [];
        }

        re(composer.articleConvertEl)

        return state;
    },
    restore: function(composer, prevState) {
        var input = composer.input,
            state = Composer.reset(composer);
        val(input, prevState.value || '');

        return state;
    }
}

if (!window._postsSendTimer) _postsSendTimer = setTimeout(Page.postsSend, 10000);

try {
    stManager.done('page.js');
} catch (e) {}