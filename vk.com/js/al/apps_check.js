var AppsCheck = {

    init: function() {
        extend(cur, {
            aTabs: ge('apps_tabs'),
            aSubTabs: ge('apps_subtabs')
        });

        uiTabs.hideProgress(cur.aTabs);
        uiTabs.hideProgress(cur.aSubTabs);
        cur.section != 'reports' && val('tab_counter_' + cur.section, cur.totalCount && cur.totalCount < 100 ? cur.totalCount : '');

        cur.nav.push((function(changed, old, n) {
            if (changed[0] === undefined && changed['act']) {
                this.switchSection(n['act']);
                return false;
            }
        }).bind(this));

        if (cur.section == 'comments') {
            each(geByTag('textarea', ge('apps_check_content')), function() {
                placeholderSetup(this, {
                    back: true
                });
            });
            removeEvent(document, 'click', this.hideEditPostReply);
            addEvent(document, 'click', this.hideEditPostReply);
        }
    },

    switchNavTab: function(tab, event, noCache) {
        if (tab == cur.section) return;
        var el = ge('nav_tab_' + tab);
        if (el) {
            var tabs = geByClass('app_tab_selected', ge('apps_nav_tabs'));
            for (var i in tabs) {
                tabs[i].className = 'app_tab';
            }
            el.className = 'app_tab_selected';
        }
        show('apps_check_progress');
        nav.change({
            act: tab
        });
        return false;
    },

    switchSection: function(act) {
        ajax.post('apps_check', {
            act: act,
            load: 1
        }, {
            onDone: function(content, script, summary, title, nav_tabs) {
                hide('apps_check_progress');
                ge('apps_check_content').innerHTML = content;
                if (script) {
                    try {
                        eval(script);
                    } catch (e) {
                        console.error(e.stack);
                        console.log(script);
                    }
                }
                if (summary) ge('apps_summary').innerHTML = summary;
                if (title) setDocumentTitle(replaceEntities(stripHTML(title)));
                if (nav_tabs) {
                    ge('apps_nav_tabs').innerHTML = nav_tabs;
                    show('apps_nav_tabs');
                } else {
                    ge('apps_nav_tabs').innerHTML = '';
                    hide('apps_nav_tabs');
                }
                AppsCheck.hideError();
                if (act != 'requests') {
                    extend(nav.objLoc, {
                        act: act
                    });
                } else {
                    delete nav.objLoc.act;
                }
                delete nav.objLoc.mid;
                delete nav.objLoc.offset;
                nav.setLoc(nav.objLoc);
                var box = curBox();
                if (box) {
                    box.hide();
                }
            },
            onFail: AppsCheck.showError
        });
    },

    showError: function(error) {
        hide('apps_check_progress');
        var checkError = ge('apps_check_error');
        show('apps_check_error_wrap');
        cur.errorShown = true;
        checkError.innerHTML = error;
        scrollToTop(200);
        return true;
    },

    hideError: function() {
        if (cur.errorShown) {
            hide('apps_check_error_wrap');
            cur.errorShown = false;
        }
    },

    changeSummary: function() {
        var sum = ge('apps_summary');
        if (cur.section == 'blocked' || cur.section == 'requests' || cur.section == 'comments' || cur.section == 'reports') {
            var res = cur.totalCount ? langNumeric(cur.totalCount, cur.summaryLang['n_requests'], true) : cur.summaryLang['no_requests'];
            if (cur.editAnswers) res += cur.editAnswers;
            if (cur.section == 'reports') {
                var label = cur.all_reports ? cur.summaryLang['unverified_apps'] : cur.summaryLang['all_apps'];
                res += '<span class="divider">|</span><span class="app_check_actions"><a href="#" onclick="AppsCheck.switchReports(); return false;">' + label + '</a></span>'
            }
            sum.innerHTML = res;
            if (ge('tab_counter_' + cur.section)) {
                ge('tab_counter_' + cur.section).innerHTML = (cur.tabCount) ? '+' + cur.tabCount : '';
                toggleClass(ge('tab_' + cur.section), 'count', !!cur.tabCount);
            }
        }
    },

    changeAutoAnswer: function(id) {
        var val = unclean(cur.autoanswers[id]);
        if (cur.section == 'comments') {
            if (cur.editing) {
                var field = ge('reply_field' + cur.editing);
                field.value = val;
                field.focus();
            }
        } else {
            ge('decline_comment').value = val;
        }
    },

    actsOver: function(post) {
        if (!vk.id) return;
        var acts = ge('actions' + post);
        if (!acts) return;
        if (acts.timeout) {
            clearTimeout(acts.timeout);
            removeAttr(acts, 'timeout');
        } else {
            fadeIn(acts, 200);
        }
    },

    actsOut: function(post) {
        if (!vk.id) return;
        var acts = ge('actions' + post);
        if (!acts) return;
        acts.timeout = setTimeout(function() {
            removeAttr(acts, 'timeout');
            fadeOut(acts, 200);
        }, 1);
    },

    declineRequest: function(id, platform) {
        platform = platform || '';
        return !showBox('apps_check', {
            act: 'decline_box',
            aid: id,
            from: cur.section,
            platform: platform
        }, {
            cache: 1,
            params: {
                width: '500px'
            }
        });
    },

    doDeclineRequest: function(id, box, platform) {
        if (cur.deletingRequest) return;
        cur.deletingRequest = true;
        box.showProgress();
        platform = platform || '';
        ajax.post('apps_check', {
            act: (cur.section == 'reports') ? 'disable' : 'a_decline_request',
            aid: id,
            rule: cur.selectedRules,
            platform: platform,
            comment: ge('decline_comment').value,
            hash: cur.hashes.decline_hash,
            do_return: isChecked('return_check')
        }, {
            onDone: function(title, text) {
                delete cur.deletingRequest;
                if (box) box.hide();
                if (text) setTimeout(showFastBox({
                    title: title
                }, text, getLang('global_close')).hide, 2000);
                slideUp(ge('app' + id), 200, function() {
                    re('app' + id);
                    cur.totalCount--;
                    cur.tabCount--;
                    AppsCheck.changeSummary();
                    if (!cur.totalCount) {
                        var msg = cur.summaryLang['no_requests_msg'];
                        ge('apps_check_content').innerHTML = '<div class="no_rows" id="no_apps">' + msg + '</div>';
                    }
                });
            },
            onFail: function() {
                delete cur.deletingRequest;
                if (box) box.hide();
            }
        });
    },

    approveRequest: function(id, platform) {
        platform = platform || '';
        return !showBox('apps_check', {
            act: 'approve_box',
            aid: id,
            platform: platform
        }, {
            cache: 1
        });
    },

    changeType: function(aid, obj, newType) {
        obj.innerHTML = '<img src="/images/upload.gif" />';
        var params = {
            act: 'change_type',
            aid: aid,
            hash: cur.hashes.approve_hash
        };
        if (newType) {
            params['new_type'] = newType;
        }
        ajax.post('apps_check', params, {
            onDone: function(text) {
                obj.innerHTML = text;
            }
        });
    },

    doApproveRequest: function(id, box, platform) {
        if (cur.approvingRequest) return;
        cur.approvingRequest = true;
        box.showProgress();
        platform = platform || '';
        ajax.post('apps_check', {
            act: 'a_approve_request',
            aid: id,
            hash: cur.hashes.approve_hash,
            platform: platform
        }, {
            onDone: function() {
                delete cur.approvingRequest;
                if (box) box.hide();
                slideUp(ge('app' + id), 200, function() {
                    re('app' + id);
                    cur.totalCount--;
                    cur.tabCount--;
                    AppsCheck.changeSummary();
                    if (!cur.totalCount) {
                        var msg = cur.summaryLang['no_requests_msg'];
                        ge('apps_check_content').innerHTML = '<div class="no_rows" id="no_apps">' + msg + '</div>';
                    }
                });
            },
            onFail: function() {
                delete cur.approvingRequest;
                if (box) box.hide();
            }
        });
    },

    showReplies: function(id, count, comments_only, btn) {
        if (buttonLocked(btn)) return;
        lockButton(btn);
        ajax.post('apps_check', {
            act: 'a_get_comments',
            id: id,
            count: count,
            comments_only: comments_only,
            from: cur.section,
            hash: cur.hashes.comments_hash
        }, {
            cache: 1,
            onDone: function(replies) {
                val('app_comments' + id, replies);
            },
            onFail: unlockButton.pbind(btn)
        });
    },

    hideRow: function(id) {
        slideUp(ge('app' + id), 200, function() {
            re('app' + id);
            cur.totalCount--;
            cur.tabCount--;
            AppsCheck.changeSummary();
            if (!cur.totalCount) {
                var msg = cur.summaryLang['no_requests_msg'];
                ge('apps_check_content').innerHTML = '<div class="no_rows" id="no_apps">' + msg + '</div>';
            }
        });
        ajax.post('apps_check', {
            act: 'a_hide_comment',
            id: id,
            hash: cur.hashes.hide_row_hash
        });
    },

    showEditReply: function(post) {
        var rf = ge('reply_field' + post);
        if (cur.editing === post) {
            elfocus(rf);
            return;
        }
        autosizeSetup(rf, {
            minHeight: 32
        });
        this.hideEditPostReply();
        show('replies_wrap' + post, 'comm_answers' + post);
        hide('reply_link' + post);
        ge('reply_button' + post).onclick = this.sendReply.pbind(post);
        cur.editing = post;
        elfocus(rf);
    },

    hideEditPostReply: function(e) {
        if (cur.editing === false || isVisible(boxLayerBG) || isVisible(layerBG)) return;
        var el = (e && e.target) ? e.target : {};
        var id = el.id;
        if (cur.editing) {
            if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
                var post = cur.editing;
                cur.editing = false;
                var rf = ge('reply_field' + post),
                    v = trim(val(rf));
                if (browser.opera_mobile || browser.safari_mobile || v) return;
                hide('comm_answers' + post);
                var replyLink = ge('reply_link' + post);
                if (replyLink) {
                    show(replyLink);
                    hide('replies_wrap' + post);
                }
                rf.blur();
                if (!rf.active) {
                    setStyle(rf, {
                        height: 14
                    });
                }
                if (rf.phonblur) rf.phonblur();
            }
        }
    },

    checkTextLen: function(inp, warn, force) {
        var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
        if (inp.lastLen === val.length && !force) return;

        var realLen = inp.lastLen = val.length,
            maxLen = cur.options.max_post_len;
        var brCount = realLen - val.replace(/\n/g, '').length;

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
    },

    sendReply: function(id) {
        ajax.post('apps_check', {
            act: 'a_post_comment',
            id: id,
            msg: ge('reply_field' + id).getValue(),
            hash: cur.hashes.post_comment_hash
        }, {
            onDone: function(comment) {
                var rf = ge('reply_field' + id);
                rf.value = '';
                rf.blur();
                rf.phonblur();
                AppsCheck.hideEditPostReply();
                hide('reply_warn' + id);
                ge('app_comments' + id).innerHTML += comment;
            },
            showProgress: function() {
                lockButton(ge('reply_button' + id));
            },
            hideProgress: function() {
                unlockButton(ge('reply_button' + id));
            }
        });
    },

    getCommentsPage: function(offset) {
        ajax.post('apps_check', {
            act: cur.section,
            mid: cur.mid,
            offset: offset,
            load: 1
        }, {
            cache: 1,
            onDone: function(res, script, summary) {
                if (res) {
                    ge('apps_check_content').innerHTML = res;
                    if (summary) ge('apps_summary').innerHTML = summary;
                    nav.setLoc(extend(nav.objLoc, {
                        offset: offset
                    }));
                }
            },
            showProgress: function() {
                show('apps_check_progress');
                show('page_bottom_progress');
            },
            hideProgress: function() {
                hide('apps_check_progress');
                hide('page_bottom_progress');
            }
        });
        return false;
    },

    startCheck: function(app_id, width, height, obj) {
        if (cur.shownApp) {
            this.finishCheck(cur.shownApp);
        }
        if (obj && buttonLocked(obj)) return;
        lockButton(obj);
        cur.shownApp = app_id;
        ajax.post('apps_check', {
            act: 'start_check',
            uid: cur.viewer_id,
            app_id: app_id,
            hash: cur.hashes.check_hash
        }, {
            onDone: function(text) {
                unlockButton(obj);
                if (!text.length) {
                    var w = window,
                        de = document.documentElement,
                        h;
                    if (w.pageNode) {
                        var maxHeight = Math.max(intval(w.innerHeight), intval(de.clientHeight)) - 200;
                        h = Math.min(height, maxHeight);
                    } else {
                        h = height;
                    }
                    showFastBox({
                        width: width + sbWidth() + 1,
                        bodyStyle: 'padding: 0px;',
                        onHide: AppsCheck.finishCheck.bind(AppsCheck, app_id)
                    }, '<iframe src="app' + app_id + '?check=1" style="vertical-align: top;width: 100%; height: ' + h + 'px; border: none; overflow-x: hidden" frameborder="0" />', getLang('global_cancel'));
                } else {
                    showFastBox({
                        onHide: AppsCheck.finishCheck.bind(AppsCheck, app_id)
                    }, text, getLang('global_cancel'));
                }
            }
        });
    },
    startCheckStandalone: function(app_id, platform, obj) {
        if (cur.shownApp) {
            this.finishCheck(cur.shownApp);
        }
        cur.shownApp = app_id;
        showBox('apps_check', {
            act: 'start_check',
            app_id: app_id,
            platform: platform,
            uid: cur.viewer_id,
            hash: cur.hashes.check_hash
        }, {
            params: {
                width: '400px',
                bodyStyle: 'padding: 20px; line-height: 160%;',
                dark: 1,
                onHide: function() {
                    AppsCheck.finishCheck(app_id);
                }
            }
        });
    },

    finishCheck: function(app_id) {
        ajax.post('apps_check', {
            act: 'finish_check',
            uid: cur.viewer_id,
            hash: cur.hashes.check_hash
        }, {
            onDone: function(text) {
                if (cur.shownApp == app_id) delete cur.shownApp;
            }
        });
    },

    toBlackList: function(uid, id) {
        if (cur.addingToBlacklist) return;
        cur.addingToBlacklist = true;
        ajax.post('apps_check', {
            act: 'to_blacklist',
            id: uid,
            hash: cur.hashes.blacklist_hash
        }, {
            onDone: function(text) {
                delete cur.addingToBlacklist;
                if (text) {
                    ge('actions' + id).innerHTML = text;
                }
            }
        });
    },

    uncomplainApp: function(id) {
        cur.box = showFastBox('', cur.summaryLang['uncomplain_text'], cur.summaryLang['uncomplain_ok'], function() {
            AppsCheck.doUncomplainApp(id);
        }, getLang('global_cancel'));
    },

    doUncomplainApp: function(id) {
        var box = curBox();
        box.showProgress();
        ajax.post('apps_check', {
            act: 'uncomplain',
            id: id,
            hash: cur.hashes.uncomplain_hash
        }, {
            onDone: function(title, text) {
                box.hide();
                setTimeout(showFastBox({
                    title: title
                }, text, getLang('global_close')).hide, 2000);
                slideUp(ge('app' + id), 200, function() {
                    re('app' + id);
                    cur.totalCount--;
                    cur.tabCount--;
                    AppsCheck.changeSummary();
                    if (!cur.totalCount) {
                        var msg = cur.summaryLang['no_requests_msg'];
                        ge('apps_check_content').innerHTML = '<div class="no_rows" id="no_apps">' + msg + '</div>';
                    }
                });
            }
        });
    },

    /* Autoanswers */

    editAutoanswers: function() {
        return !showBox('apps_check', {
            act: 'edit_autoanswers_box',
            from: cur.section
        }, {});
    },

    removeAutoanswer: function(id) {
        if (cur.removingAutoAnswer) return;
        cur.removingAutoAnswer = true;
        ajax.post('apps_check', {
            act: 'a_delete_autoanswer',
            id: id,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function(text) {
                delete cur.removingAutoAnswer;
                if (!cur.deletedAutoanswers) cur.deletedAutoanswers = [];
                cur.deletedAutoanswers[id] = ge('autoanswer_row' + id).innerHTML;
                if (text) {
                    ge('autoanswer_row' + id).innerHTML = text;
                }
            },
            onFail: function() {
                delete cur.removingAutoAnswer;
            },
            showProgress: function() {
                curBox().showProgress();
            },
            hideProgress: function() {
                curBox().hideProgress();
            }
        });
    },

    restoreAutoanswer: function(id) {
        if (cur.restoringAutoAnswer) return;
        cur.restoringAutoAnswer = true;
        ajax.post('apps_check', {
            act: 'a_restore_autoanswer',
            id: id,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function() {
                delete cur.restoringAutoAnswer;
                if (cur.deletedAutoanswers && cur.deletedAutoanswers[id]) {
                    ge('autoanswer_row' + id).innerHTML = cur.deletedAutoanswers[id];
                    delete cur.deletedAutoanswers[id];
                }
            },
            onFail: function() {
                delete cur.restoringAutoAnswer;
            },
            showProgress: function() {
                curBox().showProgress();
            },
            hideProgress: function() {
                curBox().hideProgress();
            }
        });
    },

    editAutoanswer: function(id) {
        if (cur.editingAutoAnswer) return;
        cur.editingAutoAnswer = true;
        var new_label = ge('answer_content' + id).value;
        ajax.post('apps_check', {
            act: 'a_edit_autoanswer',
            from: cur.section,
            id: id,
            text: new_label,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function(text) {
                delete cur.editingAutoAnswer;
                slideUp('edit_autoanswer' + id, 200, function() {
                    cur.autoanswers[id] = new_label;
                    if (text) {
                        curBox().bodyNode.innerHTML = text;
                        placeholderSetup('add_answer_text', {
                            back: true
                        });
                        placeholderSetup('add_answer_label', {
                            back: true
                        });
                    }
                });
            },
            onFail: function() {
                delete cur.editingAutoAnswer;
            },
            showProgress: function() {
                curBox().showProgress();
            },
            hideProgress: function() {
                curBox().hideProgress();
            }
        });
    },

    addAutoanswer: function(id) {
        if (cur.addingAutoAnswer) return;
        var name = ge('add_answer_label').value;
        var cont = ge('add_answer_text').value;
        if (!name || !cont) {
            var el = name ? ge('add_answer_text') : ge('add_answer_label');
            notaBene(el);
            el.focus();
            return;
        }
        cur.addingAutoAnswer = true;
        ajax.post('apps_check', {
            act: 'a_add_autoanswer',
            from: cur.section,
            name: name,
            text: cont,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function(res, id) {
                delete cur.addingAutoAnswer;
                slideUp('edit_autoanswer0', 200, function() {
                    cur.autoanswers[id] = cont;
                    if (res) {
                        curBox().bodyNode.innerHTML = res;
                        placeholderSetup('add_answer_text', {
                            back: true
                        });
                        placeholderSetup('add_answer_label', {
                            back: true
                        });
                    }
                });
            },
            onFail: function() {
                delete cur.addingAutoAnswer;
            },
            showProgress: function() {
                curBox().showProgress();
            },
            hideProgress: function() {
                curBox().hideProgress();
            }
        });
    },

    cancelAutoanswer: function(id) {
        slideUp('edit_autoanswer' + id, 200, function() {
            if (cur.autoanswers[id]) {
                if (ge('answer_content' + id)) ge('answer_content' + id).value = unclean(cur.autoanswers[id]);
            } else {
                if (ge('answer_content' + id)) ge('answer_content' + id).value = '';
            }
        });
    },

    switchReports: function() {
        show('apps_check_progress');
        ajax.post('apps_check', {
            act: 'reports',
            all: 1 - cur.all_reports,
            load: 1
        }, {
            onDone: function(content, script, summary, title) {
                hide('apps_check_progress');
                ge('apps_check_content').innerHTML = content;
                if (script) eval(script);
                if (summary) ge('apps_summary').innerHTML = summary;
                if (title) setDocumentTitle(replaceEntities(stripHTML(title)));
                AppsCheck.hideError();
            },
            onFail: AppsCheck.showError
        });
    },

    /* Collections box */

    collectionPhotoDeinitUpload: function() {
        if (!cur.collectionPhotoUploadOptions) return;
        each(cur.collectionPhotoUploadOptions, function(k, v) {
            v.upload && Upload.deinit(v.upload);
            delete v.upload;
            delete v.cont;
        });
    },

    collectionPhotoUploadError: function(upload, err) {
        if (!err.match(/^ERR_[A-Z0-9_]+(\:|$)/)) err = 'ERR_CLIENT_BAD_ERROR: error "' + clean(err.toString()) + '"';
        var e = err.match(/^(ERR_[A-Z0-9_]+)(\:\s*|$)([\S\s]*)\s*$/),
            code = e[1],
            msg = null,
            el = ge('apps_collection_error');

        switch (code) {
            case 'ERR_UPLOAD_FILE_NOT_SUPPORTED':
                msg = getLang('apps_check_collection_photo_not_supported');
                break;
            case 'ERR_UPLOAD_FILE_NOT_UPLOADED':
            case 'ERR_UPLOAD_BAD_IMAGE_SIZE':
                msg = getLang('apps_check_collection_photo_bad_size');
                break;
            case 'ERR_STORAGE_ENGINE_NOT_CONNECTED':
            case 'ERR_STORAGE_ENGINE_SAVE_FAILED':
                msg = getLang('apps_check_collection_photo_failed');
                break;
            default:
                msg = getLang('global_unknown_error')
                break;
        }

        val(el, msg);
        if (!isVisible(el)) {
            slideDown(el, 150);
        }
    },

    collectionPhotoUploadInit: function() {
        if (!curBox() || !cur.collectionPhotoUploadOptions) return;
        var box = curBox();

        box.setOptions({
            onClean: AppsCheck.collectionPhotoDeinitUpload
        });

        each(cur.collectionPhotoUploadOptions, function(k, v) {
            if (v.upload) return;
            v.lang = k;
            v.cont = geByClass1('_apps_check_collection_photo_upload_' + k);
            v.img = geByClass1('_apps_check_collection_photo_' + k);
            if (!v.cont) return;

            debugLog('Init upload ' + v.lang);

            v.upload = Upload.init(v.cont, v.options.url, {}, {
                file_name: 'photo',

                file_size_limit: 1024 * 1024 * 5, // 5Mb
                file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
                file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',

                lang: v.options.lang,

                clear: 1,
                type: 'photo',
                noFlash: 1,
                max_attempts: 3,
                signed: 1,
                static_url: v.options.static_url,
                check_url: v.options.check_url,
                base_url: v.options.base_url,
                buttonClass: "secondary apps_check_collection_photo_upload_btn",

                onUploadStart: function(i, res) {
                    box.changed = true;
                    lockButton(geByTag1('button', v.cont));
                },

                onUploadComplete: function(i, res) {
                    var obj = parseJSON(res) || {};
                    if (obj.error) {
                        AppsCheck.collectionPhotoUploadError(v, obj.error);
                    } else if (!obj.photo || !obj.photo.sizes) {
                        var txt = (res === false) ? '[FALSE]' : ((res === null) ? '[NULL]' : ((res === undefined) ? '[UNDEFINED]' : ('&laquo;' + clean(res.toString().substr(0, 1024)) + '&raquo;')));
                        AppsCheck.collectionPhotoUploadError(v, 'ERR_CLIENT_BAD_RESPONSE: bad upload collection photo response, recv ' + txt);
                    } else {
                        v.res = res;
                        var size = obj.photo.sizes[isRetina() ? 1 : 0];
                        v.img.src = v.options.static_url + 'v' + size[1] + '/' + size[2] + '/' + size[3] + '.jpg';
                        isVisible('apps_collection_error') && slideUp('apps_collection_error', 150);
                    }
                    unlockButton(geByTag1('button', v.cont));
                }
            });
        });
    },

    addCollection: function() {
        return !showBox('/apps_check', {
            act: 'edit_collection_box',
            type: cur.type
        }, {
            params: {
                width: 570
            }
        });
    },

    editCollection: function(collectionId) {
        return !showBox('/apps_check', {
            act: 'edit_collection_box',
            collection_id: collectionId
        }, {
            params: {
                width: 570
            }
        });
    },

    saveCollection: function(collectionId, hash, btn) {
        var box = curBox();
        if (!box || buttonLocked(btn)) return;

        if (!val('apps_check_collection_title')) {
            notaBene('apps_check_collection_title');
            return;
        }

        var photos = {};
        each(cur.collectionPhotoUploadOptions || {}, function(k, v) {
            if (v.res) photos['photo_' + k] = v.res;
        });

        ajax.post('/apps_check', extend({
            act: 'a_save_collection',
            collection_id: collectionId,
            hash: hash,
            title: val('apps_check_collection_title'),
            type: cur.type,
            photos: photos,
            language: cur.languageDD.val(),
            sex: radioval('sex'),
            min_age: cur.minAgeDD.val(),
            max_age: cur.maxAgeDD.val()
        }, photos), {
            onDone: function(html, script) {
                AppsCheck.updateCollections(html, script);
                box.hide();
            },
            onFail: function(msg) {
                val('apps_collection_error', msg);
                if (!isVisible('apps_collection_error')) {
                    slideDown('apps_collection_error', 150);
                }
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        })
    },

    /* Collections page */

    updateCollections: function(html, script) {
        var list = ge('apps_collection_rows');
        if (list && list.sorter) {
            list.sorter.destroy();
        }
        if (html) {
            ge('apps_check_content').innerHTML = html;
        }
        if (script) {
            eval(script);
        }
        AppsCheck.toggleCollections(ge('apps_toggle_collections'), !!cur.onlyEnabled);
    },

    toggleCollections: function(el, enabled) {
        cur.onlyEnabled = enabled;

        var list = ge('apps_collection_rows');
        if (list && list.sorter) list.sorter.destroy();
        if (window.tooltips) tooltips.hideAll();

        (enabled ? addClass : removeClass)(list, 'no_disabled');

        var cnt = 0,
            rows = geByClass('apps_collection_row_wrap', list);
        for (var i in rows) {
            setStyle(rows[i], {
                zIndex: null,
                left: null,
                top: null,
                width: null,
                cursor: null
            });
            if (!enabled || !hasClass(rows[i], 'disabled')) {
                rows[i].removeAttribute('skipsort');
                cnt++;
            } else {
                rows[i].setAttribute('skipsort', 1);
            }
        }
        if (cnt > 1) {
            //sorter.init(list, {onReorder: cur.reorderApps, dh: 0});
        }

        val(el, enabled ? getLang('apps_all_collections') : getLang('apps_only_enabled_collections'));
        toggle('no_apps', !cnt);
        return false;
    },

    deleteCollection: function(collectionId, hash) {
        return !showFastBox({
            title: getLang('apps_delete_collection_title'),
            dark: 1,
            bodyStyle: 'padding: 20px; linne-height: 140%;'
        }, getLang('apps_delete_collection_confirm'), getLang('global_delete'), function(btn) {
            ajax.post('/apps_check', {
                act: 'a_delete_collection',
                collection_id: collectionId,
                hash: hash,
                type: cur.type
            }, {
                onDone: function(html, script) {
                    AppsCheck.updateCollections(html, script);
                    curBox().hide();
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            })
        }, getLang('global_cancel'));
    },

    enableCollection: function(collectionId, enable, hash) {
        ajax.post('/apps_check', {
            act: 'a_enable_collection',
            collection_id: collectionId,
            enable: enable,
            hash: hash,
            type: cur.type
        }, {
            onDone: AppsCheck.updateCollections
        });
    },

    addCollectionApp: function() {
        var lnk = val(cur.aSearch);
        if (!lnk) {
            return notaBene(cur.aSearch);
        }
        showBox('apps_check', {
            act: 'add_collection_app_box',
            lnk: lnk,
            id: intval(cur.listId)
        }, {
            onFail: function(err) {
                showDoneBox(err)
                notaBene(cur.aSearch);
                return true;
            }
        });
    },

    removeCollectionApp: function(collection_id, aid, hash, event) {
        event && cancelEvent(event);
        ajax.post('apps_check', {
            act: 'a_remove_from_collection',
            id: collection_id,
            edit: 1,
            aid: aid,
            hash: hash
        }, {
            onDone: function(html) {
                var list = ge('apps_list_content');
                if (list.sorter) {
                    list.sorter.destroy();
                }
                list.innerHTML = html;
                if (cur.sorter && geByClass('apps_cat_row', ge('apps_search_content')).length) {
                    cur.sorter = qsorter.init('apps_search_content', {
                        onReorder: cur.reorderApps,
                        xsize: 5,
                        width: 154,
                        height: 226
                    });
                }
            },
            onFail: function(err) {
                showDoneBox(err);
                return true;
            }
        });
    },

    addFeatured: function() {
        var lnk = val(cur.input);
        if (!lnk) {
            return notaBene(cur.input);
        }
        showBox('apps_check', {
            act: 'add_featured_box',
            lnk: lnk
        }, {
            onFail: function() {
                notaBene(cur.input);
                return true;
            }
        });
    },

    actFeatured: function(act, obj, aid, hash, fullObj, reload) {
        var back = obj.innerHTML;
        obj.innerHTML = '<img src="/images/upload.gif" />';
        ajax.post('apps_check', {
            act: 'a_' + act + '_featured',
            aid: aid,
            hash: hash
        }, {
            onDone: function(text) {
                if (reload == 2) {
                    uiTabs.goTab(domFC(ge('subtab_featured')))
                } else if (reload) {
                    nav.reload();
                } else {
                    (fullObj || obj).innerHTML = text;
                }
            },
            onFail: function(text) {
                obj.innerHTML = back;
                setTimeout(showFastBox(getLang('global_error'), text).hide, __debugMode ? 30000 : 3000);
                return true;
            }
        });
    },

    showStat: function(aid, type, obj) {
        var hideStat = obj.getAttribute('stat');
        if (hideStat) {
            obj.innerHTML = hideStat;
            hide('apps_check_' + aid + '_graph');
            obj.setAttribute('stat', '');
        } else {
            obj.setAttribute('stat', obj.innerHTML)
            obj.innerHTML = '<img src="/images/upload.gif"/>';
            ajax.post('apps_check', {
                act: 'a_featured_stat',
                aid: aid
            }, {
                onDone: function(html, js, hideText) {
                    ge('apps_check_' + aid + '_graph').innerHTML = html;
                    eval(js);
                    obj.innerHTML = hideText;
                    show('apps_check_' + aid + '_graph');
                }
            });
        }
    },

    showAdsStat: function(appId) {
        var ajaxParams = {};
        ajaxParams.app_id = appId;
        var boxOptions = {
            params: {}
        };
        boxOptions.cache = 1;

        showBox('/apps_check?act=ads_stat', ajaxParams, boxOptions);
    },

    _eof: 1
};
try {
    stManager.done('apps_check.js');
} catch (e) {}