var notes = {
    changeComment: function(act, oid, nid, cid, hash) {
        if (cid < 0) {
            cid = -cid;
        }
        if (oid < 0) {
            oid = -oid;
        }
        this.hideError();
        if (isVisible('action_progress' + cid)) {
            return;
        }
        show('action_progress' + cid);
        this.unloadNote(oid, nid);
        ajax.post('/notes', {
            act: act,
            oid: oid,
            cid: cid,
            hash: hash,
            comment: oid + '_' + cid
        }, {
            onDone: function(text) {
                hide('action_progress' + cid);
                var comment_node = ge('comm' + cid);
                if (isVisible(comment_node)) {
                    var new_node = document.createElement('div');
                    new_node.innerHTML = text;
                    new_node.className = 'notes_comment_result';
                    comment_node.parentNode.insertBefore(new_node, comment_node);
                    hide(comment_node);
                } else {
                    comment_node.parentNode.removeChild(comment_node.previousSibling);
                    show(comment_node);
                }
            },
            onFail: function(text) {
                var comment_node = ge('comm' + cid);
                if (!isVisible(comment_node)) {
                    show(comment_node);
                }
                text = text || 'Request error.';
                comment_node.innerHTML = '<div class="msg">' + text + '</div>';
            }
        });
    },

    deleteComment: function(oid, nid, cid, hash) {
        this.changeComment('delete_comment', oid, nid, cid, hash);
    },

    reportSpamComment: function(oid, nid, cid, hash) {
        this.changeComment('spam_comment', oid, nid, cid, hash);
    },

    restoreComment: function(oid, nid, cid, hash) {
        this.changeComment('restore_comment', oid, nid, cid, hash);
    },

    editComment: function(oid, nid, cid) {
        if (cur.editing) {
            notes.cancelEditComment(cur.editing);
        }
        show('action_progress' + cid);
        var onDone = function(text) {
            hide('action_progress' + cid);
            var comment = ge('comm' + cid);
            hide(geByClass1('notes_comment_actions', comment));
            var commtext = geByClass1('notes_comment_text', comment);
            var width = (parseInt(getStyle(commtext, 'width')) + 1) + 'px';
            var margin_top = '-3px',
                margin_left = '-5px'; // For Firefox, IE, Safari.
            var padding_left = '';
            if (browser.chrome) {
                margin_left = '-4px';
            } else if (browser.safari) {
                padding_left = 'padding-left: 1px;';
            } else if (browser.opera) {
                margin_left = '-4px';
            } else if (browser.msie6) {
                margin_top = '-5px';
                margin_left = '-4px';
                width = (parseInt(width) - 4) + 'px';
            }
            commtext.innerHTML = '<textarea id="comment' + cid + 'edit" style="' + padding_left + 'width: ' + width + '; height: ' + commtext.offsetHeight + 'px; margin-top: ' + margin_top + '; margin-left: ' + margin_left + '; line-height: 14px; margin-bottom: 0px;" onkeydown="if (event.keyCode == 27) notes.cancelEditComment(' + cid + '); else if (event.keyCode == 13 && event.ctrlKey) notes.doEditComment(' + oid + ', ' + cid + ')">' + text + '</textarea>' +
                '<div style="margin-top: 5px; margin-left: ' + margin_left + '; height: 23px">' +
                '<div class="button_blue"><button onclick="notes.doEditComment(' + oid + ', ' + cid + ')">' + notes_done + '</button></div>' +
                '<div style="margin: 0px 8px;" class="button_gray"><button onclick="notes.cancelEditComment(' + cid + ')">' + notes_cancel + '</button></div>' +
                '<span id="editCommentProgress' + cid + '" style="margin: 5px 0px 0px 10px; vertical-align: 0px; display: none"><img src="images/upload.gif"/></span>' +
                '</div>' +
                '<div id="comment' + cid + 'text" style="display: none">' + commtext.innerHTML + '</div>';
            var text = ge('comment' + cid + 'edit');
            cur.editing = cid;
            elfocus('comment' + cid + 'edit');
        };
        ajax.post('/notes', {
            'act': 'a_get_edit_comment',
            'oid': oid,
            'cid': cid
        }, {
            onDone: onDone
        });
    },

    cancelEditComment: function(cid) {
        cur.editing = 0;
        var comment = ge('comm' + cid);
        show(geByClass1('notes_comment_actions', comment));
        geByClass1('notes_comment_text', comment).innerHTML = ge('comment' + cid + 'text').innerHTML;
    },

    doEditComment: function(oid, cid) {
        if (!ge('comment' + cid + 'edit').value) {
            ge('comment' + cid + 'edit').focus();
            return;
        }
        show('editCommentProgress' + cid);
        var onDone = function(text) {
            cur.editing = 0;
            var comment = ge('comm' + cid);
            show(geByClass1('notes_comment_actions', comment));
            geByClass1('notes_comment_text', comment).innerHTML = text;
        };
        ajax.post('/notes', {
            'act': 'a_edit_comment',
            'oid': oid,
            'cid': cid,
            'comment': ge('comment' + cid + 'edit').value
        }, {
            onDone: onDone
        });
    },

    postComment: function() {
        var comment = ge('notes_comment_input').value;
        if (comment) {
            notes.showError();
            ge('notes_progr').style.display = 'block';

            var callback = function(responseText) {
                ge('notes_progr').style.display = 'none';
                ge('notes_comment_input').value = '';
                ge('blogcommentsandform').innerHTML = responseText;
                if (responseText.substr(0, 14) == '<!--refresh-->') {
                    ge('notes_comment_input').value = comment;
                }
            };
            var onFail = function(text) {
                text = text || "Request error.";
                notes.showError(text);
                ge('notes_progr').style.display = 'none';
            };
            var onCaptchaShow = function() {
                ge('notes_progr').style.display = 'none';
            };
            var onCaptchaHide = function() {};
            var options = {
                onDone: callback,
                onFail: onFail,
                onCaptchaShow: onCaptchaShow,
                onCaptchaHide: onCaptchaHide
            };

            this.unloadNote(ge('blog_id').value, ge('post_id').value);

            ajax.post('/notes', {
                'act': 'post_comment',
                'note': ge('blog_id').value + '_' + ge('post_id').value,
                'post_id': ge('post_id').value,
                'blog_id': ge('blog_id').value,
                'reply_to': ge('reply_to').value,
                'comment': comment,
                'hash': ge('hash').value,
                'add_bookmark': ge('add_bookmark').value
            }, options);
        } else {
            ge('notes_comment_input').focus();
        }
    },

    hideError: function() {
        this.showError('');
    },

    showError: function(error_msg) {
        var err = ge('notes_commenterror');
        if (!err) return;
        if (error_msg) {
            err.innerHTML = error_msg;
            show(err);
        } else {
            hide(err);
        }
    },

    replyTo: function(mid, mname) {
        ge('reply_to').value = mid;
        ge('notes_reply_name').innerHTML = " <a href='javascript:notes.cancelReply()'>" + mname + "</a>";
        ge('notes_comment_input').focus();
    },

    cancelReply: function() {
        ge('reply_to').value = 0;
        ge('notes_reply_name').innerHTML = "";
        ge('notes_comment_input').focus();
    },

    getFullNote: function(a, offset, nid, oid) {
        var span = a.parentNode;
        var ajax = new Ajax();
        ajax.onDone = function(resp, text) {
            var el = document.createElement('span');
            el.innerHTML = text;
            span.parentNode.replaceChild(el, span);
        }
        ajax.post('notes.php', {
            act: "getfullnote",
            offset: offset,
            nid: nid,
            oid: oid
        });
        return false;
    },

    toggleDeleteAll: function(comm_id) {
        toggle('wConfirm' + comm_id);
        if (isVisible('wConfirm' + comm_id)) {
            hide('wConfirm' + deleting_all_id);
            removeEvent(document, 'keydown');
            addEvent(document, 'keydown', function(e) {
                if (e.keyCode == 27) {
                    toggleDeleteAll(comm_id);
                }
            });
            deleting_all_id = comm_id;
        } else {
            removeEvent(document, 'keydown');
            deleting_all_id = 0;
        }
    },

    showDeleteNoteBox: function(nid, hash, lj) {
        var add = lj ? '<div style="padding-top: 10px; padding-bottom: 10px;" class="clear_fix"><div class="fl_l checkbox notes_checkbox on" id="lj_delete" onclick="checkbox(this)" style="height: 11px;">' +
            cur.lang.notes_livejournal_delete + '</div></div>' : '';
        var content = '<div>' + cur.lang.notes_delete_sure + '</div>' + add;

        var fastBox = showFastBox({
            title: cur.lang.notes_deletion
        }, content, cur.lang.notes_delete, function() {
            var lj_del = (lj && isChecked('lj_delete')) ? '1' : '0';
            fastBox.content('<div style="text-align: center">' + cur.lang.notes_deleting + '</div>');
            ajax.post('/notes', {
                act: 'do_delete',
                nid: nid,
                hash: hash,
                lj: lj_del
            }, {
                onDone: function() {
                    fastBox.hide();
                    nav.reload(true);
                },
                onFail: function() {
                    fastBox.hide();
                }
            });
        }, cur.lang.notes_delete_cancel, function() {
            fastBox.hide();
        })
    },

    preloadNote: function(oid, nid) {
        cur.pendingPreloadOid = oid;
        cur.pendingPreloadNid = nid;
        cur.pendingPreload = setTimeout(notes.doPreloadNote, 50);
    },

    cancelPreloadNote: function() {
        clearTimeout(cur.pendingPreload);
    },

    doPreloadNote: function() {
        var oid = cur.pendingPreloadOid;
        var nid = cur.pendingPreloadNid;
        if (cur.cachedNote && !(oid == cur.cachedNote.oid && nid == cur.cachedNote.nid)) {
            notes.unloadNote(cur.cachedNote.oid, cur.cachedNote.nid);
        } else {
            cur.cachedNote = new Object();
        }
        cur.cachedNote.oid = oid;
        cur.cachedNote.nid = nid;

        var url = '/notes';
        var params = {
            act: 'notecomments',
            oid: oid,
            nid: nid
        };
        var q = url + '#' + ajx2q(params);
        if (globalAjaxCache[q] !== undefined) return;
        globalAjaxCache[q] = -1;
        ajax.post(url, extend(params, {
            al: 1
        }), {
            onDone: function() {
                var cb = globalAjaxCache[q],
                    args = Array.prototype.slice.call(arguments);
                globalAjaxCache[q] = args;
                if (isFunction(cb)) {
                    cb.apply(window, args);
                }
            },
            onFail: function() {
                delete globalAjaxCache[q];
            }
        });
    },

    unloadNote: function(oid, nid) {
        var url = '/notes';
        var params = {
            act: 'notecomments',
            oid: oid,
            nid: nid
        };
        var q = url + '#' + ajx2q(params);
        if (globalAjaxCache[q] === undefined) return;
        delete globalAjaxCache[q];
    },

    showNote: function(oid, nid, ncom, toComments) {
        cur.disableAutoMore = true;

        __adsUpdate('force');

        var summary = geByClass1('summary_wrap', document);
        summary.parentNode.removeChild(summary);

        var note = ge('note' + oid + '_' + nid).cloneNode(true);

        var notes = geByClass1('notes', document);
        notes.innerHTML = '';
        notes.appendChild(note);

        var photo = geByClass1('notes_profile_thumb', note);
        photo.parentNode.removeChild(photo);

        hide(geByClass1('view_full_note', note));
        var notePart = ge('note' + nid);
        if (notePart) {
            notePart.style.display = 'inline';
        }

        hide(ge('show_more_link'));
        hide(ge('notes_all_shown'));
        hide(ge('notes_blog_empty'));
        //hide(geByClass1('t_bar'));

        var noteNode = ge('note' + oid + '_' + nid);
        addClass(noteNode, 'notes_note_wide');
        var noteBodyNode = geByClass1('notes_note_body');
        addClass(noteBodyNode, 'notes_note_body_wide');
        var noteHeaderNode = geByClass1('notes_note_header');
        replaceClass(noteHeaderNode, 'notes_note_header', 'notes_note_header_wide');
        var noteContentNode = geByClass1('notes_note_content');
        replaceClass(noteContentNode, 'notes_note_content', 'notes_note_content_wide');
        var noteFooterNode = geByClass1('notes_note_footer');
        replaceClass(noteFooterNode, 'notes_note_footer', 'notes_note_footer_wide');
        var noteCommentsCountNode = geByClass1('notes_comments_count');
        replaceClass(noteCommentsCountNode, 'notes_comments_count', 'notes_comments_count_wide');

        var dateTextNode = geByClass1('notes_note_byline').firstChild.nextSibling.nextSibling;
        if (dateTextNode != null) {
            dateTextNode.parentNode.removeChild(dateTextNode);
        }

        var commentsNumLink = ge('comments_number_link');
        commentsNumLink.parentNode.removeChild(commentsNumLink);
        //commentsNumLink.parentNode.replaceChild(dateTextNode, commentsNumLink);

        geByClass1('notes_comments_count_wide').innerHTML = '';

        var tabs = geByClass1('t0');
        removeClass(geByClass1('active_link', tabs), 'active_link');

        //For viewing from friend notes list
        if (tabs.children.length > 4) {
            tabs.removeChild(tabs.children[tabs.children.length - 2]);
        }

        if (oid != cur.viewer_id) {
            var userNotesText = ge('whos' + oid + '_' + nid).innerHTML;
            tabs.children[tabs.children.length - 1].innerHTML = '<li class="tr_r"><a href="/notes' + oid + '" onclick="return nav.go(this, event)">' + userNotesText + '</a></li>';

            /*var tab = document.createElement('li');
            addClass(tab, 'active_link');
            var tabText = ge('whos' + oid + '_' + nid).innerHTML;
            tab.innerHTML = '<a href="/notes' + oid + '" onclick="return nav.go(this, event)"><b class="tl1"><b></b></b><b class="tl2"></b><b class="tab_word">' + tabText + '</b></a>';
            tabs.appendChild(tab);*/
        }

        var tabView = document.createElement('li');
        addClass(tabView, 'active_link');
        tabView.innerHTML = '<a class="notes_inactive_tab"><b class="tl1"><b></b></b><b class="tl2"></b><b class="tab_word">' + cur.lang.notes_note_view + '</b></a>';
        tabs.appendChild(tabView);

        /*if (ncom > cur.note_comms_per_page) {
          var lastCommentsText = langNumeric(cur.note_comms_per_page, cur.lang.notes_M_replies_of_N);
          var commCountNode = geByClass1('notes_comments_count_wide');
          var span = geByTag1('span', commCountNode);
          if (span) {
            var mOfNComments = document.createTextNode(lastCommentsText.replace('{all}', ncom));
            commCountNode.replaceChild(mOfNComments, span.previousSibling);
          } else {
            commCountNode.innerHTML = lastCommentsText.replace('{all}', ncom);
          }

          var moreLink = document.createElement('a');
          moreLink.style.float = 'right';
          moreLink.href = 'javascript: notes.showMoreComments(' + oid + ', ' + nid + ')';
          moreLink.innerHTML = cur.lang.notes_show_more_comments;
          commCountNode.appendChild(moreLink);
        }*/

        scroll(0, 0);

        //showBackLink(hab.getLoc(), '��������� � ������', false);

        var attachComments = toComments ? '?comments=1' : '';
        hab.setLoc('note' + oid + '_' + nid + attachComments);
        cur.note_id = nid;
        cur.owner_id = oid;

        //Comments preload
        ajax.post('/notes', {
            act: 'notecomments',
            oid: oid,
            nid: nid
        }, {
            cache: true,
            forceGlobalCache: true,
            onDone: function(comments, actions, options) {
                var commentsDiv = ce('div', {
                    id: 'blogcommentsandform'
                }, {
                    paddingLeft: '20px',
                    paddingRight: '20px'
                });
                commentsDiv.innerHTML = comments;
                ge('notes').appendChild(commentsDiv);

                var actionsSpan = ce('span');
                actionsSpan.innerHTML = actions;
                geByClass1('notes_comments_count_wide').appendChild(actionsSpan);

                extend(cur, options);
            },
            onFail: function() {
                //
            }
        });
    },

    showMoreComments: function(oid, nid) {
        var comments = ge('notes_comments_body').children;
        var firstComment = comments[0].id.substr(4);
        var lastComment = comments[comments.length - 1].id.substr(4);
        var showMoreSize = getSize(geByClass1('notes_comments_showmore'))[1];
        ge('more_progress').previousSibling.data = '';
        ajax.post('/al_notes.php', {
            act: 'more',
            oid: oid,
            nid: nid,
            before_id: firstComment,
            max_id: lastComment,
            all_comments: cur.num_comments
        }, {
            onDone: function(beforeComments, showAll) {
                var showMore = geByClass1('notes_comments_showmore');
                var commentsBody = ge('notes_comments_body');
                var height = getSize(commentsBody)[1] + showMoreSize;
                //        geByClass1('notes_comment_body', commentsBody).style.borderTop = '';
                commentsBody.innerHTML = beforeComments + commentsBody.innerHTML;
                scrollToY(scrollGetY() + getSize(commentsBody)[1] - height, 0);
                hab.setLoc('note' + oid + '_' + nid + '?more=1');

                var allDiv = ce('div');
                allDiv.innerHTML = showAll;
                if (showAll != '') {
                    scrollToY(scrollGetY() + showMoreSize, 0);
                    showMore.parentNode.replaceChild(allDiv, showMore);
                } else {
                    //scrollToY(scrollGetY() + showMoreSize, 0);
                    hide(showMore);
                }
            },
            onFail: function() {
                //
            },
            progress: 'more_progress'
        });
    },

    showAllComments: function(oid, nid) {
        var comments = ge('notes_comments_body').children;
        var firstComment = comments[0].id.substr(4);
        var lastComment = comments[comments.length - 1].id.substr(4);
        var showMoreSize = getSize(geByClass1('notes_comments_showmore'))[1];
        ge('more_progress').previousSibling.data = '';
        ajax.post('/al_notes.php', {
            act: 'all',
            oid: oid,
            nid: nid,
            before_id: firstComment,
            max_id: lastComment
        }, {
            onDone: function(beforeComments) {
                var showMore = geByClass1('notes_comments_showmore');
                var commentsBody = ge('notes_comments_body');
                var height = getSize(commentsBody)[1] + showMoreSize;
                //        geByClass1('notes_comment_body', commentsBody).style.borderTop = '';
                commentsBody.innerHTML = beforeComments + commentsBody.innerHTML;
                scrollToY(scrollGetY() + getSize(commentsBody)[1] - height, 0);
                hab.setLoc('note' + oid + '_' + nid + '?all=1');
                hide(showMore);
            },
            onFail: function() {
                //
            },
            progress: 'more_progress'
        });
    },

    view_note_part: function(elem, nid) {
        hide(elem.parentNode);
        ge(nid).style.display = 'inline';
    },

    viewPhoto: function(event, photoRawId, href, text, controls_text) {
        var photoId = photoRawId.substr(5).split('_');
        return showPhotosBox('', photoId[1], 0, event.target);
        var onReady = function(ajaxObj, responseText) {
            if (responseText == 'NO_ACCESS') {
                AlertBox(global_warning, '������������ ��������� ������ � ��������� ���� ����������', null).show();
            } else {
                if (window.showWikiBox) {
                    showWikiBox('photo', {
                        src: responseText,
                        full: href,
                        text: text
                    }, controls_text);
                    return false;
                } else {
                    return true;
                }
            }
        }
        ajax.post({
            url: 'photos.php',
            query: {
                act: 'get_photo',
                photo: photoID.replace('photo', ''),
                rand: Math.random()
            },
            onDone: onReady.bind(this)
        });
    },

    applyOptions: function(options) {
        extend(cur, options);

        if (cur.all_shown_text) {
            ge('notes_all_shown').innerHTML = cur.all_shown_text;
        }

        if (cur.empty_text) {
            ge('notes_blog_empty').innerHTML = cur.empty_text;
        }

        if (cur.count) {
            hide('notes_blog_empty');
            if (cur.all_shown) {
                hide('show_more_link');
                show('notes_all_shown');
            } else {
                hide('notes_all_shown');
                show('show_more_link');
            }
        } else {
            if (cur.oid && cur.section != 'blog') {
                show('notes_blog_empty');
            }
            hide('show_more_link');
            hide('notes_all_shown');
        }
    },

    showMore: function(updated) {
        cur.disableAutoMore = false;
        updated = updated || false;
        var next_rows = ge('notes_rows_next'),
            notes_rows = ge('notes');
        if (!updated && next_rows) {
            while (next_rows.firstChild) {
                notes_rows.insertBefore(next_rows.firstChild, next_rows);
                updated = true;
            }
        }
        if (cur.isBlogLoading) return;
        hide('show_more');
        show('show_more_progress');
        var escPressed = false;
        var tmp = function(e) {
            if (e.keyCode == KEY.ESC) {
                escPressed = true;
            }
        };
        addEvent(document, 'keyup', tmp);
        var offset = parseInt(cur.offset) + parseInt(cur.per_page);

        ajax.post('/notes', {
            act: cur.act,
            section: cur.section,
            id: cur.oid,
            offset: offset,
            part: 1
        }, {
            onDone: function(options, rows, comms_num) {
                removeEvent(document, 'keyup', tmp);
                if (escPressed) {
                    show('show_more');
                    hide('show_more_progress');
                    cur.disableAutoMore = true;
                    return;
                }
                if (rows) {
                    var au = ce('div'),
                        row, cont = updated ? next_rows : notes_rows;
                    au.innerHTML = rows;
                    while (row = au.firstChild) {
                        //Maybe I need this, but what we do here?!
                        /*if (!row.firstChild || !row.firstChild.id || ge(row.firstChild.id)) {
                          au.removeChild(row);
                          continue;
                        }*/
                        cont.appendChild(row);
                    }
                    notes.setPhotos(offset);
                    /*if (!updated) {
                      setTimeout(function () {
                        each(geByTag('textarea', cont), function() { placeholderSetup(this); });
                      }, 0);
                    }*/
                    //cur.offset = options.offset;
                }
                if ((!updated || !rows) && options.has_more) {
                    setTimeout(notes.showMore.pbind(true), 1000);
                }
                show('show_more');
                hide('show_more_progress');
                if (comms_num) {
                    for (var key in comms_num) {
                        cur.comments_num.push(comms_num[key]);
                    }
                }
                if (updated && rows) {
                    cur.next_options = options;
                } else {
                    notes.applyOptions(options);
                }
            },
            showProgress: function() {
                cur.isBlogLoading = true;
            },
            hideProgress: function() {
                cur.isBlogLoading = false;
            },
            cache: 1
        });
    },

    scrollCheck: function() {
        if (browser.mobile || cur.isBlogLoading /*|| cur.idleManager.isIdle*/ || cur.disableAutoMore) return;
        var el = ge('show_more_link');
        if (!isVisible(el)) return;

        var docEl = document.documentElement;
        var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
        var st = scrollGetY();

        if (st + ch + 1200 > el.offsetTop) {
            notes.showMore();
        }
    },

    saveNote: function(mid) {
        var editor = window[window.editorName];
        if (editor) {
            ge('post').value = editor.convertToWiki();
        }
        if (mid == undefined) {
            mid = '';
        }
        ge('privacy_note').value = Privacy.getValue('note' + mid);
        ge('privacy_notecomm').value = Privacy.getValue('notecomm' + mid);
        var form = ge('editPost');
        var act = (mid != '') ? 'update' : 'add';
        var exportStatus = (mid != '') ? '' : isChecked('status_export');
        var formWysiwyg = form.wysiwyg ? form.wysiwyg.value : '';
        ajax.post('/notes', {
            act: act,
            hash: form.hash.value,
            title: form.title.value,
            wysiwyg: formWysiwyg,
            nid: mid,
            status_export: exportStatus,
            privacy_note: form.privacy_note.value,
            privacy_notecomm: form.privacy_notecomm.value,
            Post: form.Post.value
        }, {
            onDone: function() {},
            onFail: function() {}
        });
    },

    privacy: function(key) {
        //Do nothing on privacy change
    },

    getScrollWidth: function() {
        if (!window.scrollbarWidth) {
            text = ce('div', {
                innerHTML: '<div style="height:200px;">1<br/>1<br/>1<br/>1<br/></div>'
            }, {
                overflowY: 'scroll',
                position: 'absolute',
                height: '100px',
                width: '100px'
            });
            var body = geByTag('BODY')[0];
            body.appendChild(test);
            window.scrollbarWidth = test.offsetWidth - geByTag('div', test)[0].offsetWidth - 1;
            body.removeChild(test);
            delete test;
        }
    },

    chkLen: function(el) {
        checkTextLength(cur.maxPostLength, el.value, ge('notesWarn'));
    },

    checkCtrlEnter: function(event, obj, val) {
        if ((event.keyCode == 13 || event.keyCode == 10) && event.ctrlKey) {
            obj.parentNode.submit();
        }
    },

    switchExport: function() {
        isChecked('status_export') ? hide('note_privacy') : show('note_privacy');
    },

    setPhotos: function(offset) {
        cur.isSetPhotos = true;
        var wikiBody = geByClass("wikiText");
        var list = false;
        if (wikiBody.length > 1) {
            list = true;
            if (!offset) {
                cur.photosOfItem = new Array();
                cur.photosCount = new Array();
            }
        }
        var startIndex = !offset ? 0 : cur.photoNoteOffset;
        for (var i = startIndex; i < wikiBody.length; i++) {
            var note = wikiBody[i];
            var realNoteIndex = parseInt(note.id.substr(9));
            var wikiHtml = note.innerHTML;
            var pattern = /<a class="wikiPhoto(.*?)"(.*?)showPhotosBox\('(.*?)'/igm;
            if (!list) {
                cur.photosOfItem = new Array();
            } else {
                cur.photosOfItem[realNoteIndex] = new Array();
            }
            var match;
            while ((match = pattern.exec(wikiHtml)) != null) {
                if (!list) {
                    cur.photosOfItem.push(match[3]);
                } else {
                    cur.photosOfItem[realNoteIndex].push(match[3]);
                }
            }
            if (!list) {
                cur.photosCount = cur.photosOfItem.length;
            } else {
                cur.photosCount[realNoteIndex] = cur.photosOfItem[realNoteIndex].length;
            }
        }
        cur.photoNoteOffset = wikiBody.length;
        cur.photoNotesCount = cur.photosCount ? cur.photosCount.length : 0;
    },

    showPhotosBox: function(url, photo_id, photo_index, target) {
        if (!cur.owner_id || !cur.note_id) {
            var current = target;
            while ((current && current.id && !current.id.match(/note(\d+)_(\d+)/)) || (current && !current.id)) {
                current = current.parentNode;
            }
            var rawId = current.id.substr(4).split('_');
            return showPhoto(rawId[0] + '_' + photo_id, 'note' + rawId[0] + '_' + rawId[1], {});
        } else {
            return showPhoto(cur.owner_id + '_' + photo_id, 'note' + cur.owner_id + '_' + cur.note_id, {});
        }

        if (!cur.isSetPhotos) {
            notes.setPhotos();
        }
        if (typeof(target.parentNode.id) != 'undefined' && target.parentNode.id.indexOf('noteindex') == 0) {
            var noteIndex = parseInt(target.parentNode.id.substr(9));
        }
        if (typeof(target.parentNode.parentNode.id) != 'undefined' && target.parentNode.parentNode.id.indexOf('noteindex') == 0) {
            var noteIndex = parseInt(target.parentNode.parentNode.id.substr(9));
        }
        if (cur.showTimer) {
            clearTimeout(cur.showTimer);
        }
        cur.pic = vkImage();
        cur.pic.src = url;
        if (!cur.pic.width) {
            var coords = getXY(target);
            ge('imageProgress').style.height = target.offsetHeight + "px";
            ge('imageProgress').style.width = target.offsetWidth + "px";
            ge('imageProgressAnimation').style.marginLeft = (target.offsetWidth / 2 - ge('imageProgressAnimation').width / 2) + "px";
            ge('imageProgressAnimation').style.marginTop = (target.offsetHeight / 2 - ge('imageProgressAnimation').height / 2) + "px";
            show('imageProgress');
            ge('imageProgress').style.left = (coords[0] - ge('imageProgress').offsetParent.offsetLeft) + "px";
            ge('imageProgress').style.top = (coords[1] - ge('imageProgress').offsetParent.offsetTop) + "px";
            //show('imageProgress');
            cur.showTimer = setTimeout(function() {
                notes.showPhotosBox(url, photo_id, photo_index, target);
            }, 1500);
            return false;
        }

        var params = {};
        cur.photoBox = new MessageBox(params);
        cur.photoBox.addButton('�������', function() {
            hide('imageProgressBig');
            clearTimeout(cur.showTimer);
            cur.photoBox.hide();
        }, 'blue');
        notes.renderPhoto(url, photo_index, noteIndex);
        hide('imageProgress');
        return false;
    },

    showNextPhoto: function(url, afterWaited, nextIndex, noteIndex) {
        if (cur.showTimer) {
            clearTimeout(cur.showTimer);
        }
        if (afterWaited) {
            cur.pic = vkImage();
            cur.pic.src = url;
        }
        if (!cur.pic.width) {
            var coords = getXY(ge('currentPhoto'));
            ge('imageProgressBig').style.width = ge('currentPhoto').offsetWidth + "px";
            ge('imageProgressBig').style.height = ge('currentPhoto').offsetHeight + "px";
            ge('imageProgressBig').firstChild.style.marginTop = ((ge('currentPhoto').offsetHeight - 8) / 2) + "px";
            ge('imageProgressBig').style.left = coords[0] + "px";
            ge('imageProgressBig').style.top = coords[1] + "px";
            show('imageProgressBig');
            cur.showTimer = setTimeout("notes.showNextPhoto('" + url + "', 1, '" + nextIndex + "', ' + noteIndex + ')", 1500);
            return false;
        }
        notes.renderPhoto(url, nextIndex, noteIndex);
        hide('imageProgressBig');
    },

    renderPhoto: function(url, photo_index, noteIndex) {
        var nextIndex = intval(photo_index) + 1;
        var notePhotosCount = cur.photosCount;
        if (typeof(cur.photoNotesCount) != 'undefined') {
            notePhotosCount = cur.photosCount[noteIndex];
        }
        var title = (notePhotosCount == 1) ? '����������' : getLang('market_photo_one_of_photo').replace('{index}', nextIndex).replace('{count}', notePhotosCount);
        if (nextIndex == notePhotosCount) {
            nextIndex = 0;
        }
        cur.photoBox.setOptions({
            title: title,
            width: parseInt(cur.pic.width) + 30
        });
        if (notePhotosCount > 1) {
            if (typeof(cur.photoNotesCount) != 'undefined') {
                cur.photoBox.content('<a href="#next" onclick="notes.showNextPhoto(\'' + cur.photosOfItem[noteIndex][nextIndex] + '\', null, \'' + nextIndex + '\', ' + noteIndex + '); return false;"><img id="currentPhoto" src="' + url + '" /></a>').show();
            } else {
                cur.photoBox.content('<a href="#next" onclick="notes.showNextPhoto(\'' + cur.photosOfItem[nextIndex] + '\', null, \'' + nextIndex + '\', ' + noteIndex + '); return false;"><img id="currentPhoto" src="' + url + '" /></a>').show();
            }
        } else {
            cur.photoBox.content('<img src="' + url + '" />').show();
        }

        cur.pic = vkImage();
        if (typeof(cur.photoNotesCount) != 'undefined') {
            cur.pic.src = cur.photosOfItem[noteIndex][nextIndex];
        } else {
            cur.pic.src = cur.photosOfItem[nextIndex];
        }
    },

    init: function(options) {
        extend(cur, {
            uid: options.viewer_id
        });
        if (options.user_id) {
            extend(cur, {
                oid: options.user_id
            });
        }
        if (!cur.options) {
            cur.options = {};
        }
        cur.module = 'notes';
        //extend(cur.options, options);
        //extend(cur, options);
        extend(cur.options, options);
        notes.applyOptions(options);

        // Scroll check routine
        notes.scrollnode = browser.msie6 ? pageNode : window;
        window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
        addEvent(notes.scrollnode, 'scroll', notes.scrollCheck);
        addEvent(window, 'resize', notes.scrollCheck);
        cur.destroy.push(function() {
            removeEvent(notes.scrollnode, 'scroll', notes.scrollCheck);
            removeEvent(window, 'resize', notes.scrollCheck);
            //cur.idleManager.stop();
        });

        cur.delMb = false;
        cur.editing = 0;

        cur.photoBox = null;
        cur.pic = null;
        cur.showTimer = null;
        cur.isSetPhotos = false;
        this.setPhotos();

        /*if (!options.section) {
          var attachUid = '';
          if (options.user_id) {
            attachUid = '&id=' + options.user_id;
          }
          setTimeout(showBackLink.pbind('/notes?' + attachUid, '� ������ �������'), 150);
        }*/

        //fixing large (100+) numbered lists (valich@2010-12-18)
        var conts = geByClass('notes_note_content', ge('content'));
        for (var i = 0; i < conts.length; i++) {
            var ols = geByTag('ol', conts[i]);
            for (var j = 0; j < ols.length; j++) {
                if (ols[j].childNodes.length >= 100) {
                    ols[j].style.paddingLeft = '30px';
                }
            }
        }
    }
}

//TEMP global showPhotosBox to support box for old photos
function showPhotosBox(url, photo_id, photo_index, target) {
    notes.showPhotosBox(url, photo_id, photo_index, target);
}

function viewPhoto(event, photoID, href, text, controls_text) {
    notes.viewPhoto(event, photoID, href, text, controls_text);
}

try {
    stManager.done('notes.js');
} catch (e) {}