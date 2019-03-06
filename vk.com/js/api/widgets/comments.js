var currentFocus = false;

function showReplyBox(full_id) {
    if (window.noAuthVal) {
        widgetAuth();
        return false;
    }
    full_id = full_id || '';
    var el = ge('reply_field' + full_id);
    if (currentFocus !== false && currentFocus !== full_id) {
        hideReplyBox(currentFocus);
    }
    if (!el.show) {
        if (full_id) {
            var reply_link = ge('reply_link' + full_id);
            if (reply_link) {
                show('replies_wrap' + full_id);
                hide(reply_link);
            }
            show('post_submit' + full_id);
        }
        if (ge('reply_link' + full_id)) {
            el.focus();
        }
        if (el.autosize) {
            el.autosize.update();
        }
        el.show = true;
        currentFocus = full_id;
    }
    return false;
}

function showAttach() {
    if (window.noAuthVal) {
        widgetAuth();
        return false;
    }
    show_add_wall_media('status');
    return false;
}

function hideReplyBox(full_id) {
    full_id = full_id || '';
    var status = (full_id == -1);
    var msg_id = status ? full_id : full_id.split('_')[1];
    var el = ge(status ? 'status_field' : 'reply_field' + full_id);
    if (el && el.show) {
        if (!status) {
            ge('reply_to' + full_id).value = msg_id || 0;
            if (!full_id) show('media_options');
            hide('reply_to_title' + full_id);
            hide('post_status_title');
            if (full_id) {
                var reply_link = ge('reply_link' + full_id);
                if (reply_link) {
                    hide('replies_wrap' + full_id);
                    show(reply_link);
                }
                hide('post_submit' + full_id);
            }
            if (ge('reply_to_name')) ge('reply_to_name').innerHTML = '';
        } else {
            hide('submit_status');
        }
        setStyle(el, {
            height: 14
        });
        el.show = false;
        currentFocus = false;
    }
    resizeWidget();
    return true;
}

function showReplies(to_id, msg_id, count) {
    Ajax.Send('wall.php', {
        act: 'a_get_replies',
        count: count,
        msg_id: msg_id,
        to_id: to_id
    }, function(o, t) {
        ge('replies' + to_id + '_' + msg_id).innerHTML = t;
    });
}

function replyTo(reply_id, msg_id, to_id, to_href, to_name, top_id) {
    var full_id = to_id + '_' + top_id;
    ge('reply_to' + full_id).value = msg_id;
    ge('reply_to_name' + full_id).innerHTML = '<a href="' + to_href + '">' + to_name + '</a>';
    show('reply_to_title' + full_id);
    hide('post_status_title');
    show('reply_field' + full_id);
    ge('reply_field' + full_id).focus();
}

function setupReply() {
    each(geByClass('reply_message'), function(i, v) {
        placeholderSetup(v);
        if (!v.autosize) {
            v.autosize = new AutosizeMod(v, {
                minHeight: 30,
                onResize: resizeWidget
            });
        }
    });
}

function AutosizeMod(ta, options) { // Contain widget fixes
    if (ta == null) {
        return false;
    }
    // default options
    var defaults = {
        height: 0,
        minHeight: 0,
        padding: 0
    };
    // extend default options with user defined
    options = extend(defaults, options);

    var asHlp = ge('autosize_helpers'),
        helper;
    var oldValue, oldHeight;
    if (!asHlp) {
        asHlp = document.createElement('div');
        asHlp.id = 'autosize_helpers';
        setStyle(asHlp, {
            position: 'absolute',
            left: -10000,
            top: -10000
        });
        document.body.appendChild(asHlp);
    }
    helper = document.createElement('div');
    asHlp.appendChild(helper);
    helper.style.wordWrap = 'break-word';

    var minHeight = intval(options.minHeight) || intval(getStyle(ta, 'height'));
    var maxHeight = intval(options.height);
    var fontSize = intval(getStyle(ta, 'fontSize'));
    ta.style.overflow = 'hidden';
    var w = intval(getStyle(ta, 'width'));
    // fix for hidden textareas
    if (w < 1) {
        if (browser.msie) {
            w = document.body.clientWidth - 65; // Evil fix
        } else {
            w = intval(getStyle(ta, 'width', false));
        }
    }
    if (defaults.padding) w -= defaults.padding * 2;
    setStyle(helper, {
        width: w < 0 ? 0 : w,
        fontFamily: getStyle(ta, 'fontFamily'),
        fontSize: fontSize + 'px',
        lineHeight: getStyle(ta, 'lineHeight')
    })

    function updateSize(he) {
        return function(e) {
            var w = intval(getStyle(ta, 'width'));
            // fix for hidden textareas
            if (w < 1) {
                if (browser.msie) {
                    w = document.body.clientWidth - 65; // Evil fix
                } else {
                    w = intval(getStyle(ta, 'width', false));
                }
            }
            if (defaults.padding) w -= defaults.padding * 2;
            setStyle(helper, {
                width: w
            });

            var value = ta.value;
            oldHeight = getSize(ta, true)[1];
            if (he) {
                if (e.keyCode == 13 && !e.ctrlKey && !e.altKey) {
                    value += '\n';
                }
            }
            if (value == oldValue && he) {
                return;
            }
            oldValue = value;
            helper.innerHTML = trim(replaceChars(value)).replace(/<br>$/, '<br>&nbsp;');

            var newHeight = getSize(helper, true)[1] + 4;
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }
            if (maxHeight > 0 && newHeight > maxHeight) {
                newHeight = maxHeight;
                setStyle(ta, {
                    overflow: 'auto',
                    overflowX: 'hidden'
                });
            } else {
                setStyle(ta, {
                    overflowX: 'hidden'
                });
            }
            if (oldHeight != newHeight) {
                setStyle(ta, {
                    height: (oldHeight = newHeight)
                });
                if (options.onResize) options.onResize(newHeight);
            }
        }
    }
    addEvent(ta, 'keydown', updateSize(true));
    addEvent(ta, 'keypress', updateSize(true));
    addEvent(ta, 'keyup', updateSize(false));

    return {
        update: updateSize(false)
    }
};

var MediaPoster = function(postType, target, preview, msgBox, toId, types) {
    target = ge(target);
    if (!target || data(target, 'inited')) return;
    data(target, 'inited', 1);
    preview = ge(preview);
    var base_domain = (vk.al ? '/' : window.base_domain);

    var icon = base_domain + 'images/icons/wall_icons.gif?1';
    var id = target.id,
        hideTO = false;
    (new Image()).src = icon;

    var itemInfo = {
        graffiti: ['graffiti.php?act=draw&to_id=', 0],
        video: ['video.php?to_id=', -22],
        photo: ['photos.php?to_id=', -44],
        audio: ['audio.php?to_id=', -66],
        poll: ['id', -88]
    }

    var rows = '',
        spec_style = (/mac/.test(_ua) && browser.mozilla) ? 'height: 19px; padding-top: 3px;' : '';
    each(types, function(i, v) {
        if (v[0] != 'app') {
            var info = itemInfo[v[0]],
                url = base_domain + info[0] + toId;
            var ico = icon;
            var bgpos = '0px ' + info[1] + 'px;';
        } else {
            var appId = v[3];
            var ico = v[5];
            var url = base_domain + 'app' + appId + '?to_id=' + toId;
            var bgpos = '3px 3px';;
        }
        rows += '<a onfocus="this.blur()" id="' + id + '_post_type' + i + '" style="background-image: url(' + ico + '); background-position: ' + bgpos + spec_style + '" href="' + url + '">' + v[1].replace(/\s/g, '&nbsp;') + '</a>';
    });

    var prefix = vk.al ? 'add_media' : 'add_wall';
    var html = '<table cellspacing="0" cellpadding="0"><tr><td class="' + prefix + '_side"><div>&nbsp;</div></td><td><div class="rows">' + rows + '</div><div class="' + prefix + '_bottom"></div><div class="' + prefix + '_bottom2"></div></td><td class="' + prefix + '_side"><div>&nbsp;</div></td></tr></table>';
    if (!ge(id + '_add_menu')) {
        var toAppend = document.body;
        toAppend.appendChild(ce('div', {
            id: id + '_menu',
            className: prefix + '_menu',
            innerHTML: '<div id="' + id + '_header" class="' + prefix + '_header"><div>' + target.innerHTML + '</div></div><div id="' + id + '_rows" class="' + prefix + '_rows">' + html + '</div>'
        }));
    } else {
        ge(id + '_rows').innerHTML = html;
    }

    var hideMenu = function(noTimeout) {
        var hideFunc = function() {
            browser.msie ? hide(id + '_menu') : fadeOut(ge(id + '_menu'), 100);
        }
        if (noTimeout) hideFunc();
        else hideTO = setTimeout(hideFunc, 300);
    }

    var showMenu = function() {
        clearTimeout(hideTO);
        onDomReady(function() {
            var el = ge(id + '_menu');
            if (el && !isVisible(el)) {
                target.blur();
                var coords = getXY(target);
                var left = coords[0] - 8 + (browser.msie6 ? 1 : 0);
                var top = coords[1] - 4 + (browser.msie && !browser.msie8 ? 1 : 0);
                setStyle(el, {
                    left: left,
                    top: top
                });

                // Showing to up in case of little widget height
                setStyle(el, {
                    display: 'block',
                    visibility: 'hidden'
                });
                var size = getSize(ge(id + '_rows'));
                setStyle(el, {
                    display: 'none',
                    visibility: 'visible'
                });
                setStyle(ge(id + '_rows'), 'top', (ge('main').clientHeight < coords[1] + size[1] + 10) ? -size[1] : (/mac/.test(_ua) && browser.mozilla ? 22 : 20));

                browser.msie ? show(el) : fadeIn(el, 100);
            }
        });
        return false;
    }

    addEvent(ge(id + '_menu'), 'mouseover', function() {
        showMenu();
    });
    addEvent(ge(id + '_menu'), 'mouseout', function() {
        hideMenu();
    });

    each(types, function(i, v) {
        addEvent(ge(id + '_post_type' + i), 'click', function(onClick) {
            hideMenu(true);
            var href = itemInfo[v[0]] && itemInfo[v[0]][0];
            var t = v[2],
                h = v[3];
            var appId = v[3],
                appHref = v[4],
                icon = v[5],
                appHash = v[6];
            var url = base_domain + (v[0] == 'app' ? ('app' + appId + '?to_id=') : href) + toId;
            switch (v[0]) {
                case 'graffiti':
                    showGraffitiBox(toId, t, h);
                    break;
                case 'photo':
                    showPhotoBox(toId, t, url, h);
                    break;
                case 'video':
                    showVideoBox(toId, t, url);
                    break;
                case 'audio':
                    showAudioBox(toId, t, url);
                    break;
                case 'poll':
                    showPollBox(toId, t, h);
                    break;
            }
            return false;
        });
    });

    var boxes = {};

    var cancelBox = function(type) {
        if (type == 'share' || !boxes[type]) return;
        boxes[type].setOptions({
            onHideAttempt: false
        }).hide();
        return false;
    };

    function clearReplyField(el) {
        if (window.mentions_mod) {
            var mention = data(el, 'mention');
            if (mention) {
                hide(mention.cont);
                show(el);
            }
            hide('status_warn');
            hide('submit_status');
        }
        if (!el) return;
        setStyle(el, {
            height: 14
        });
        if (el.setValue) {
            el.setValue();
        } else {
            el.value = '';
            el.phevents = 0;
            placeholderSetup(el);
        }
    }

    function postAttach(media, media_id, toId, hash, options, target, preview) {
        posting_on_wall = true;
        var el = ge(msgBox),
            msg = (el && isFunction(el.getValue)) ? el.getValue() : (el && el.value || '');
        var type = ge('wall_type') ? ge('wall_type').value : 0,
            export_el = ge('status_export');

        var params = extend({}, _initialParams, _shareData, {
            hash: hash,
            media: media,
            media_id: media_id,
            to_id: toId,
            message: msg,
            type: type,
            reply_to: -1,
            status_export: (export_el ? export_el.value : 1)
        });
        if (media == 'share') {
            if (share_data.parse_failed || !share_data.url) {
                delete params.media;
                delete params.media_id;
            } else {
                params.media_id = share_data.user_id + '_' + share_data.photo_id;
                params.description = share_data.description;
                params.url = share_data.url;
                params.title = share_data.title;
            }
        }
        if (share_data && share_data.initial_pattern) {
            params.message = params.message.replace(share_data.initial_pattern, ' ');
        }
        if (media == 'poll') {
            params.question = ge(postType + '_poll_question').value;
            var answers = [],
                answer;
            for (var i = 1; i <= 10; i++) {
                if (answer = trim(ge(postType + '_poll_answer' + i).value)) {
                    answers.push(answer);
                }
                params.answers = answers.join('#@*');
            }
        }

        if (share_data.extra) { //youtube
            params.extra = share_data.extra;
            params.extra_data = share_data.extraData;
        }

        if (share_data.openGraph) {
            params['open_graph_data'] = share_data.openGraph.data;
            params['open_graph_hash'] = share_data.openGraph.hash;
        }

        var opt = {
            onSuccess: function(o, t) {
                data(target, 'postFunc', false);
                data(target, 'media', false);
                preview.innerHTML = '';
                if (sharePreview) {
                    share_data = {};
                    sharePreview.innerHTML = '';
                    hide(sharePreview);
                    hide(sharePreview.nextSibling);
                }
                if (pollConstructor) {
                    hide(pollConstructor);
                    hide(pollConstructor.nextSibling);
                }
                posting_on_wall = false;
                appendStatusToComments(o, t);
            },
            onFail: function(o, t) {
                posting_on_wall = false;
                if (isFunction(options.onFail)) return options.onFail(o, t);
            },
            onCaptchaShow: function() {
                posting_on_wall = false;
                if (isFunction(options.onCaptchaShow)) options.onCaptchaShow();
            },
            onCaptchaHide: function(done) {
                posting_on_wall = false;
                if (done) return;
                if (isFunction(options.onCaptchaHide)) options.onCaptchaHide(done);
            }
        };
        Ajax.Send('wall.php', params, opt);
    }

    var showGraffitiBox = function(toId, title, post_hash) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        Rpc.callMethod('showBox', 'graffiti.php?' + ajx2q({
            act: 'a_draw_box',
            to_id: toId,
            widget: 1,
            addCss: 'profile.css,swfobject.js'
        }), {
            height: 506,
            width: 630
        });
        return false;
    }

    var showPhotoBox = function(toId, title, href, post_hash) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        Rpc.callMethod('showBox', 'photos.php?' + ajx2q({
            act: 'a_choose_photo_box',
            to_id: toId,
            scrollbar_width: window.sbWidth(),
            preview: 1,
            widget: 1,
            addCss: 'profile.css'
        }), {
            height: 504,
            width: 630
        });
        window.doSendPhoto = function(phid, toId, hash, src) {
            if (posting_on_wall) {
                return false;
            }
            setPreview('photo', [src, 75, 0], phid, toId, hash, {});
            return false;
        }

        window.newPostedUploaded = function(phid, thumb_x, thumb_s) {
            cancelBox('photo');
            setPreview('posted_photo', [thumb_s, 75, 0], phid, toId, post_hash, {});
        }

        return false;
    }

    var showVideoBox = function(toId, title, href) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        Rpc.callMethod('showBox', 'video.php?' + ajx2q({
            act: 'a_choose_video_box',
            to_id: toId,
            scrollbar_width: window.sbWidth(),
            preview: 1,
            widget: 1,
            addCss: 'profile.css'
        }), {
            height: 511,
            width: 630
        });
        window.doSendVideo = function(id, owner, toId, hash, src) {
            if (posting_on_wall) {
                return false;
            }
            setPreview('video', [src, 65, 0], owner + '_' + id, toId, hash, {});
            return false;
        }
        return false;
    }

    var showAudioBox = function(toId, title, href) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        Rpc.callMethod('showBox', 'audio.php?' + ajx2q({
            act: 'a_choose_audio_box',
            to_id: toId,
            scrollbar_width: window.sbWidth(),
            preview: 1,
            widget: 1,
            addCss: 'profile.css'
        }), {
            height: 511,
            width: 630
        });
        window.doSendAudio = function(id, owner, toId, hash, performer, songTitle) {
            if (posting_on_wall) {
                return false;
            }
            audio_owner = owner ? owner : 0;
            setPreview('audio', [performer, songTitle], audio_owner + '_' + id, toId, hash, {});
            return false;
        }
        return false;
    }

    // Inline Polls
    var pollConstructor = null,
        pollHTML = '<div><div class="row"><div class="label">{question}</div><div class="labeled"><input id="' + postType + '_poll_question" type="text" style="margin-bottom: 8px;"/></div></div><div class="row"><div class="label">{answers} <nobr><a href="#" id="' + postType + '_poll_inc">' + getLang('global_add').toLowerCase() + '</a><span class="divider" id="' + postType + '_poll_split"> | </span><a href="#" id="' + postType + '_poll_dec" class="disabled">' + getLang('global_delete').toLowerCase() + '</a></nobr></div><div class="labeled">{answers_inputs}</div><div class="clear"></div></div>',
        ansHTML = '',
        numAnswers = 2;
    for (var i = 1; i <= 10; i++) {
        ansHTML += '<input type="text" id="' + postType + '_poll_answer' + i + '"' + (i > 2 ? ' style="display: none; "' : '') + '/> ';
    }
    var showPollBox = function(toId, labels, hash) {
        if (window.event && (window.event.which == 2 || window.event.button == 1)) {
            return true;
        }
        if (!pollConstructor) {
            pollConstructor = ce('div', {
                id: postType + '_poll',
                className: 'wall_poll'
            });
            data(preview, 'pollConstructor', pollConstructor);
            ge(postType + '_attach').parentNode.insertBefore(pollConstructor, ge(postType + '_attach'));
            ge(postType + '_attach').parentNode.insertBefore(ce('div', {
                className: 'status_poll_preview_tail tt_bottom_pointer'
            }), ge(postType + '_attach'));
        } else {
            pollConstructor.innerHTML = '';
            show(pollConstructor);
            show(pollConstructor.nextSibling);
        }
        var html = pollHTML.replace('{question}', labels[1]).replace('{answers}', labels[2]).replace('{answers_inputs}', ansHTML);
        var tmpDiv = ce('div', {
            innerHTML: html
        }, {
            position: 'absolute',
            width: getSize(pollConstructor)[0],
            visibility: 'hidden'
        });
        document.body.appendChild(tmpDiv);
        var tmpDiv1 = ce('div');
        pollConstructor.appendChild(tmpDiv1);

        animate(tmpDiv1, {
            height: getSize(tmpDiv)[1]
        }, 400, function() {
            pollConstructor.innerHTML = html;
            addEvent(ge(postType + '_poll_question'), 'keyup', function() {
                var q = this.value;
                ge(postType + '_poll_question_preview').innerHTML = q ? (': <span class="pollQ">' + (q.length > 40 ? q.substr(0, 40) + '...' : q) + '</span>') : '';
            });
            numAnswers = 2;
            addEvent(ge(postType + '_poll_inc'), 'click', function() {
                if (numAnswers >= 10) return false;
                numAnswers++;
                show(postType + '_poll_answer' + numAnswers);
                ge(postType + '_poll_inc').className = numAnswers >= 10 ? 'disabled' : '';
                ge(postType + '_poll_dec').className = numAnswers <= 2 ? 'disabled' : '';
                return false;
            });
            addEvent(ge(postType + '_poll_dec'), 'click', function() {
                if (numAnswers <= 2) return false;
                hide(postType + '_poll_answer' + numAnswers);
                numAnswers--;
                ge(postType + '_poll_inc').className = numAnswers >= 10 ? 'disabled' : '';
                ge(postType + '_poll_dec').className = numAnswers <= 2 ? 'disabled' : '';
                return false;
            });
        });
        document.body.removeChild(tmpDiv);
        tmpDiv.innerHTML = '';
        setPreview('poll', labels, false, toId, hash, false);
    }

    var setPreview = function(type, info, media_id, toId, hash, options) {
        var obj;
        switch (type) {
            case 'audio':
                obj = '<div class="attach_audio fl_l"><span class="performer">' + info[0] + '</span> - <span class="title">' + info[1] + '</span></div>';
                break;
            case 'app':
                obj = '<div class="attach_app fl_l"><span><img src="' + info[1] + '"/></span><span>' + info[0] + '</span></div>';
                break;
            case 'share':
                obj = '<div class="attach_url fl_l"><span>' + getLang('wall_link_label') + ': <a href="' + base_domain + 'away.php?to=' + encodeURIComponent(info[1]) + '" target="_blank" rel="noopener">' + info[0] + '</a></span></div>';
                shareLoadPreview(info[1]);
                break;
            case 'poll':
                obj = '<div class="attach_poll fl_l"><span>�����</span><span id="' + postType + '_poll_question_preview"></span></div>';
                break;
            default:
                var size = 'width: ' + info[1] + 'px;' + (info[2] ? 'height: ' + info[2] + 'px;' : '');
                obj = '<div class="attach_img fl_l"><img style="' + size + '" src="' + info[0] + '" /></div>';
                break;
        }
        if (type != 'poll' && pollConstructor) {
            hide(pollConstructor);
            hide(pollConstructor.nextSibling);
        }
        if (type != 'share' && sharePreview) {
            hide(sharePreview);
            hide(sharePreview.nextSibling);
        }
        preview.innerHTML = '<div class="attach_box clearFix">' + obj + '<div class="attach_x fl_l"><div class="iconX" onmouseover="overX(this);" onmouseout="outX(this);" onclick="cancelMedia(\'' + preview.id + '\', \'' + id + '\')"></div></div></div>';

        data(target, 'postFunc', function(onSuccess) {
            if (isFunction(onSuccess)) {
                var f = options.onSuccess;
                options.onSuccess = function(o, t, r) {
                    if (isFunction(f)) f(o, t, r);
                    onSuccess(o, t, r);
                };
            }
            if (type == 'share') {
                postShareAttach(type, media_id, toId, hash, options, target, preview);
                return;
            }
            postAttach(type, media_id, toId, hash, options, target, preview);
        });
        data(target, 'media', type);
        data(target, 'force', 1);
        cancelBox(type);
        try {
            ge(msgBox).onkeyup();
            ge(msgBox).blur();
            ge(msgBox).focus();
        } catch (e) {
            debugLog(e);
        }
    }

    window.overX = function(obj) {
        obj.className = 'iconXover';
    }

    window.outX = function(obj) {
        obj.className = 'iconX';
    }

    window.cancelMedia = function(preview, id) {
        preview = ge(preview);
        preview.innerHTML = '';
        var pollConstructor = data(preview, 'pollConstructor');
        var sharePreview = data(preview, 'sharePreview');
        if (share_data) {
            if (share_data.url) urls_cancelled.push(share_data.url);
            if (share_data.initial_pattern) urls_cancelled.push(share_data.initial_pattern);
            share_data = {};
        }
        if (sharePreview) {
            sharePreview.innerHTML = '';
            hide(sharePreview);
            hide(sharePreview.nextSibling);
        }
        if (pollConstructor) {
            hide(pollConstructor);
            hide(pollConstructor.nextSibling);
        }
        data(ge(id), 'postFunc', false);
        data(ge(id), 'media', false);
        data(ge(id), 'force', 1);
        ge(msgBox).onkeyup();
    }

    /* Share URL posting */
    var
        share_data = {},
        sharePreview = ge('wall_share_preview'),
        url_active_ta = /([!()?., \r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0])/i,
        url_inactive_ta = /([!()?., \r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i,
        url_matches,
        urls_cancelled = [],
        media_info_loading = false;


    var checkLinkInField = function(wiki_value, noFocus) {
        if (browser.msie6) return;
        if (!shareServerData) return;
        if (trim(ge(postType + '_attach').innerHTML)) return;
        var rx = noFocus ? url_inactive_ta : url_active_ta;
        while (wiki_value && (matches_url = wiki_value.match(rx))) {
            wiki_value = wiki_value.substr(matches_url.index + matches_url[0].length);
            var url = matches_url[2],
                initial_url = url;
            url = url.replace(/[,.;'!@#$%^&*()?:]+$/, '');
            if (!url.match(/^https?:\/\//)) url = 'http://' + url;
            if (inArray(url, urls_cancelled) || inArray(initial_url, urls_cancelled)) continue;
            if (matches_url[4].match(/vkontakte.ru|vk.com|vkontakte.com|vk.cc/)) {
                var query = matches_url[5],
                    media_matches = null,
                    media_type = false;
                if ((media_matches = query.match(/#photo\/(\-?\d+)_(\d+)/)) || (media_matches = query.match(/photo(\-?\d+)_(\d+)/)) || (media_matches = query.match(/photos.php\?oid=\-?\d+&act=show&id=(\-?\d+)_(\d+)/))) {
                    media_type = 'photo';
                } else if ((media_matches = query.match(/video(\-?\d+)_(\d+)/))) {
                    media_type = 'video';
                } else if ((media_matches = query.match(/audio.php\?id=(\-?\d+)&audio_id=(\d+)/))) {
                    media_type = 'audio';
                }
                if (!media_type) continue;
                if (media_info_loading) return;
                media_info_loading = true;
                Ajax.Send('wall.php?act=a_get_media_info', {
                    type: media_type,
                    media: media_matches[1] + '_' + media_matches[2],
                    to_id: toId
                }, {
                    onSuccess: function(o, t) {
                        var res = eval('(' + t + ')');
                        switch (res.media) {
                            case 'photo':
                                setPreview('photo', [res.thumb, 75, 0], res.full_id, res.to_id, res.hash, {});
                                break;
                            case 'audio':
                                setPreview('audio', [res.performer, res.song], res.full_id, res.to_id, res.hash, {});
                                break;
                            case 'video':
                                setPreview('video', [res.thumb, 75, 0], res.full_id, res.to_id, res.hash, {});
                                break;
                        }
                        share_data = {
                            initial_pattern: initial_url
                        };
                        data(preview, 'sharePreview', sharePreview);
                        media_info_loading = false;
                    },
                    onFail: function() {
                        media_info_loading = false;
                    }
                });
                return;
            }

            share_data = {
                url: url,
                domain: matches_url[4],
                initial_pattern: initial_url
            };
            addCss('css/profile.css');
            setPreview('share', [share_data.domain, share_data.url], 0, toId, shareServerData.send_hash, {});
            wiki_value = wiki_value.substr(matches_url.index, matches_url.index + matches_url[0].length);
        }
    }
    data(ge('status_field'), 'checkLink', checkLinkInField);

    function shareLoadPreview(url) {
        if (!sharePreview) {
            sharePreview = ce('div', {
                id: 'wall_share_preview'
            });
            data(preview, 'sharePreview', sharePreview);
            ge(postType + '_attach').parentNode.insertBefore(sharePreview, ge(postType + '_attach'));
            ge(postType + '_attach').parentNode.insertBefore(ce('div', {
                className: 'wall_share_preview_tail tt_bottom_pointer'
            }), ge(postType + '_attach'));
        }
        sharePreview.innerHTML = '<img src="/images/upload.gif" class="loading" style="padding: 0 0 2px;"/>';

        sharePreview.appendChild(ce('div', {
            innerHTML: '<iframe id="wall_share_parse_iframe" name="wall_share_parse_iframe"></iframe>'
        }, {
            left: -1000,
            top: -1000,
            position: 'absolute'
        }));

        var shareForm = ce('form', {
            action: shareServerData.server,
            method: 'POST',
            target: 'wall_share_parse_iframe'
        });
        each({
            url: url,
            mid: shareServerData.mid,
            hash: shareServerData.hash,
            rhash: shareServerData.rhash,
            from_host: location.host,
            act: 'parse_share',
            vk: ''
        }, function(k, v) {
            shareForm.appendChild(ce('input', {
                type: 'hidden',
                'name': k,
                value: v
            }));
        });
        sharePreview.appendChild(shareForm);
        show(sharePreview);
        show(sharePreview.nextSibling);

        window.onParseDone = function(data) {
            extend(share_data, data);
            if (!share_data.images || !share_data.images.length) {
                shareShowPreview();
                return;
            }
            var tmpImg = new Image();
            var url = '';
            share_data.imagesStyles = {};
            if (/^\//.test(share_data.images[0])) {
                url = (/^https:\/\//i.test(share_data.url) ? 'https://' : 'http://') + share_data.domain;
            } else if (!/^https?:\/\//i.test(share_data.images[0])) {
                url = share_data.url.replace(/[^\/]*$/, '');
                if (/^https?:\/\/$/i.test(url)) {
                    url = share_data.url + '/';
                }
            }
            share_data.images[0] = url + share_data.images[0];
            tmpImg.src = share_data.images[0];
            var imgLoadInterval = setInterval(function() {
                if (tmpImg.width || tmpImg.height) {
                    var w = tmpImg.width,
                        h = tmpImg.height;
                    if (w < 10 || h < 10) {
                        share_data.images = [];
                    } else {
                        if (w > h && w > 150) {
                            h = 150 * h / w;
                            w = 150;
                        } else if (h > 150) {
                            w = 150 * w / h;
                            h = 150;
                        }
                        share_data.imagesStyles[0] = 'style="width: ' + w + 'px; height: ' + h + 'px;"';
                    }
                    clearInterval(imgLoadInterval);
                    imgLoadInterval = true;
                    shareShowPreview();
                }
            }, 500);
            setTimeout(function() {
                if (imgLoadInterval === true) return;
                share_data.images = [];
                clearInterval(imgLoadInterval);
                shareShowPreview();
            }, 5000);
        }

        window.onParseFail = function() {
            share_data.parse_failed = true;
            shareShowPreview();
        }

        var locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+$/)[0];
        if (!browser.msie6 || document.domain != locDomain) document.domain = locDomain;

        shareForm.submit();
    }

    function shareShowPreview() {
        if (share_data.parse_failed) {
            var html = getLang('page_not_loaded');
        } else {
            var html = (share_data.images && share_data.images[0] ? '<img src="' + share_data.images[0] + '" class="fl_l tt_thumb" ' + share_data.imagesStyles[0] + '/>' : '') + (share_data.title ? '<h4 class="tt_header">' + share_data.title + '</h4>' : '') + (share_data.description ? '<div class="descr">' + share_data.description + '</div>' : '') + '<div class="clear"></div>';
        }
        var tmpDiv = ce('div', {
            innerHTML: html
        }, {
            position: 'absolute',
            width: getSize(sharePreview)[0],
            visibility: 'hidden'
        });
        document.body.appendChild(tmpDiv);
        var tmpDiv1 = ce('div');
        sharePreview.appendChild(tmpDiv1);
        tmpDiv1.appendChild(sharePreview.firstChild);

        animate(tmpDiv1, {
            height: getSize(tmpDiv)[1]
        }, 400, function() {
            sharePreview.innerHTML = html;
        });
    }

    function postShareAttach(type, media_id, toId, hash, options, target, preview) {
        if (!share_data.images) return postAttach(type, media_id, toId, hash, options, target, preview);
        window.onUploadDone = function(index, params) {
            share_data.user_id = params.user_id;
            share_data.photo_id = params.photo_id;
            postAttach(type, media_id, toId, hash, options, target, preview);
            window.onUploadDone = function() {}
        }
        window.onUploadFail = function(index, msg) {
            share_data.user_id = 0;
            share_data.photo_id = 0;
            postAttach(type, media_id, toId, hash, options, target, preview);
        }
        sharePreview.appendChild(ce('div', {
            innerHTML: '<iframe id="wall_share_upload_iframe" name="wall_share_upload_iframe"></iframe>'
        }, {
            left: -1000,
            top: -1000,
            position: 'absolute'
        }));
        var postData = {
            act: 'a_photo',
            url: share_data.url,
            image: share_data.images[0],
            extra: share_data.extra || 0,
            hash: vk.ip_h
        };
        var shareUploadForm = ce('form', {
            action: 'share.php',
            method: 'POST',
            target: 'wall_share_upload_iframe'
        });
        each(postData, function(k, v) {
            shareUploadForm.appendChild(ce('input', {
                type: 'hidden',
                'name': k,
                value: v
            }));
        });
        sharePreview.appendChild(shareUploadForm);
        shareUploadForm.submit();
    }

    removeEvent(target, 'click');
    target.setAttribute('onclick', '');
    addEvent(target, 'click', function() {
        if (window.noAuthVal) {
            widgetAuth();
            return false;
        }
        return showMenu();
    });
    addEvent(ge(id + '_header'), 'click', function(e) {
        hideMenu(true);
    });
}

// Mentions availibility (contenteditable attribute)
window.mentions_mod = !(browser.mozilla && browser.version.match(/^2\./) || browser.ipod || browser.iphone || browser.ipad || browser.opera && !browser.version.match(/^10\./));

/* Mentions onfocus initialisation */
function initMentions(el) {
    if (!mentions_mod) return;
    var _tmp = function() {
        addCss('css/ui_controls.css');
        jsDispatcher.include('mentions', function() {
            var mention = new MentionAutocomplete(el, {
                minHeight: 42,
                introText: getLang('mention_start_typing'),
                noResult: getLang('mention_not_found'),
                onSubmit: window.postComment ? postComment : null,
                checkLen: function(text) {
                    checkTextLength(4096, text, ge('status_warn'));
                },
                onValueChange: data(el, 'checkLink')
            });
            triggerEvent(el, 'focus');
        });
        removeEvent(el, 'focus', _tmp);
    }
    addEvent(el, 'focus', _tmp);
}

/* Share preview */
function sharePreview(anchor, params, hash) {
    //anchor = anchor.getElementsByTagName('a')[0];
    params.posTarget = geByClass('a', anchor)[0];
    showTT(anchor, ShareTooltip, 'share.php', extend({
        act: 'a_status_info',
        hash: hash
    }, params));
}

function ShareTooltip(target, options) {
    //target = geByClass('a', target)[0];
    var link_text = options.link_text || options.full_url || '';
    if (link_text.length > 58) link_text = link_text.substr(0, 57) + '...';
    if (options.full_url.match(/http:\/\/([^\/]*)(vkontakte\.ru|vk\.com|vk\.cc)/) || options.full_url.charAt(0) == '/') {
        var away_url = options.full_url || '';
    } else {
        var away_url = 'away.php?to=' + encodeURIComponent(options.full_url || '') + (parseInt(getCookie('remixsettings_bits')) & 1 ? '&h=' + options.full_url_h || '' : '');
    }
    options.footer = '<a href="' + away_url + '" target="_blank" rel="noopener">' + link_text + '</a>';
    options.title = '<a href="' + away_url + '" target="_blank" rel="noopener">' + (options.title || '') + '</a>';

    return new BaseTooltip(target, extend({
        width: 350,
        height: 100,
        contentTemplate: '<div class="tt_content">\
    <img class="tt_thumb" src="{thumb}" />\
    <h4 class="tt_header">{title}</h4>\
    <div class="tt_descr">{description}</div>\
    <div class="tt_footer clear">{footer}</div>\
  </div>',
        params: {
            title: options.title,
            description: options.description,
            thumb: options.thumb,
            footer: options.footer
        },
        className: 'share_tooltip',
        onInit: function() {
            if (this.options.thumb) {
                var pic = new Image();
                pic.src = this.options.thumb;
                var self = this;

                var checkPhotoInterval = setInterval(function() {
                    if (pic.height) {
                        clearInterval(checkPhotoInterval);
                        self.height = getSize(self.container)[1];
                        setStyle(self.container, {
                            display: 'none',
                            visibility: 'visible'
                        });
                    }
                }, 200);
                return false;
            }
            return true;
        }
    }, options));
}

/* Like preview */
function LikeTooltip(target, options) {
    var link = ge('like_link' + options.status),
        stats = ge('like_count' + options.status),
        wrapper = link.parentNode;
    return new BaseTooltip(target, extend({
        width: 206,
        height: 100,
        contentTemplate: '<div class="tt_content">\
    <div class="tt_head">{head}</div>\
    <div class="tt_descr">{users}</div>' +
            (options.footer ? '<div class="tt_footer clear">{footer}</div>' : '') +
            '</div>',
        params: {
            head: options.head,
            users: options.users,
            footer: options.footer
        },
        onInit: function() {
            var self = this;
            this.head = geByClass('tt_head', this.container)[0];
            this.publishCb = geByClass('lite_cb', this.container)[0];
            addEvent(this.head, 'click', function() {
                showLikedByBox(options.status, 0, options.boxlang);
                self.hide();
            });
            addEvent(this.publishCb, 'click', function() {
                this.blur();
                if (wrapper.loading) return false;
                checkbox(this);
                if (!hasClass(wrapper, 'like_wrap_on')) {
                    animate(self.statsTable, {
                        left: 0
                    }, 200);
                    addClass(link.parentNode, 'like_wrap_on');
                    if (!isVisible(stats)) setStyle(stats, 'visibility', 'visible');
                }
                wrapper.loading = true;
                Ajax.Send('like.php', {
                    act: 'a_do_' + (isChecked(this) ? '' : 'un') + 'publish',
                    status: options.status,
                    hash: options.publish_hash
                }, {
                    onSuccess: function(o, t) {
                        wrapper.loading = false;
                        var res = eval('(' + t + ')');
                        stats.innerHTML = res.likes_count > 0 ? res.likes_count : 1;
                        setStyle(stats, 'visibility', res.likes_count > 0 ? 'visible' : 'hidden');
                        self.head.innerHTML = res.head;
                    }
                });
                return false;
            });
            this.statsTable = geByClass('like_stats', this.container)[0];
        },
        className: 'share_tooltip like_stats_tooltip' + (options.footer ? '' : ' tt_no_footer'),
        onShow: function() {
            if (!isVisible(stats)) return false;
            if (hasClass(wrapper, 'like_wrap_on') && this.statsTable.style.left == '-31px') {
                animate(this.statsTable, {
                    left: 0
                }, 200);
            }
        },
        onHide: function() {
            if (link.toHide) setStyle(link, 'visibility', 'hidden');
            if (wrapper.toHide) setStyle(wrapper, 'visibility', 'hidden');
        }
    }, options));
}

function likePreview(likeButton, params) {
    var counter = geByClass('like_count', likeButton)[0];
    if (!hasClass(likeButton, 'like_wrap') || !counter /* || !isVisible(counter) */ ) return;
    showTT(likeButton, LikeTooltip, 'like.php', extend({
        'act': 'a_get_stats'
    }, params));
}


var likedByBoxes = {};

function showLikedByBox(status_id, tab, titles) {
    var curTab = tab ? 'publishedBy' : 'likedBy',
        likedByBox = likedByBoxes[status_id];
    if (!likedByBox) {
        likedByBox = new TabbedBox(curTab, titles, {
            title: titles[0][1],
            width: 478,
            tabStyle: 'height:310px',
            onTab: function(tab, loaded) {
                if (!loaded) {
                    likedByBox.tabLoadContent(tab, '/like.php', {
                        act: 'a_get_members',
                        status: status_id,
                        offset: 0,
                        published: tab == 'publishedBy' ? 1 : 0
                    }, true, 'height:310px;');
                    return false;
                }
            }
        });
        likedByBox.addButton({
            label: getLang('box_close'),
            onClick: function() {
                likedByBox.hide(200);
            }
        });
        likedByBoxes[status_id] = likedByBox;
    }
    likedByBox.loadTab(curTab).show();
}

function getLikedByPage(status_id, mode, offset) {
    Ajax.Send('/like.php', {
        act: 'a_get_members',
        published: mode ? 1 : 0,
        status: status_id,
        offset: offset
    }, function(o, t) {
        var res = eval('(' + t + ')');
        likedByBoxes[status_id].tabContent(mode ? 'publishedBy' : 'likedBy', res.html);
    });
    return false;
}

function showStatusLike(status_id) {
    var link = ge('like_link' + status_id),
        count = ge('like_count' + status_id);
    if (!link) return;
    var wrapper = link.parentNode;
    wrapper.toHide = link.toHide = false;
    setStyle(link, 'visibility', 'visible');
    setStyle(wrapper, 'visibility', 'visible');
}

function hideStatusLike(status_id) {
    var link = ge('like_link' + status_id),
        count = ge('like_count' + status_id);
    if (!link) return;
    var wrapper = link.parentNode,
        tooltip = data(wrapper, 'tooltip');
    if (tooltip && isVisible(tooltip.container)) {
        link.toHide = true;
        if (!isVisible(count)) wrapper.toHide = true;
    } else {
        setStyle(link, 'visibility', 'hidden');
        if (!isVisible(count)) setStyle(wrapper, 'visibility', 'hidden');
    }
}

function likePost(status_id, hash, prefix, no_send) {
    if (!prefix) prefix = '';
    var link = ge(prefix + 'like_link' + status_id),
        stats = ge(prefix + 'like_count' + status_id),
        wrapper = link.parentNode,
        tooltip = data(wrapper, 'tooltip'),
        act = 'a_do_like';
    if (!hash || wrapper.loading) return;
    wrapper.loading = true;
    if (hasClass(wrapper, 'like_wrap_on')) {
        if (tooltip && stats.innerHTML != "1") animate(tooltip.statsTable, {
            left: -31
        }, 200);
        if (tooltip) removeClass(tooltip.publishCb, 'on');
        removeClass(link.parentNode, 'like_wrap_on');
        act = 'a_do_unlike';
        var next_num = intval(stats.innerHTML) - 1;
        if (!next_num) {
            next_num = 1;
            setStyle(stats, 'visibility', 'hidden');
        }
        stats.innerHTML = next_num;
    } else {
        if (tooltip) {
            animate(tooltip.statsTable, {
                left: 0
            }, 200);
        }
        addClass(wrapper, 'like_wrap_on');
        if (!isVisible(stats)) setStyle(stats, 'visibility', 'visible');
    }
    if (!no_send) {
        Ajax.Send('like.php', {
            act: act,
            status: status_id,
            hash: hash
        }, {
            onSuccess: function(o, t) {
                wrapper.loading = false;
                var res = eval('(' + t + ')');
                stats.innerHTML = res.likes_count > 0 ? res.likes_count : 1;
                setStyle(stats, 'visibility', res.likes_count > 0 ? 'visible' : 'hidden');
                if (tooltip) {
                    if (!intval(res.likes_count)) {
                        tooltip.hide();
                    } else {
                        tooltip.head.innerHTML = res.head;
                        if (!isVisible(tooltip.container)) tooltip.show();
                    }
                } else {
                    data(wrapper, 'over', false);
                    wrapper.onmouseover();
                }
            }
        });
    }
}

function showWallPhoto(photo_id, owner_id) {
    var h = 607,
        w = 607;
    Rpc.callMethod('showBox', 'photos.php?' + ajx2q({
        act: 'a_show_photo_box',
        photo: photo_id,
        wall_owner: owner_id,
        widget: 1,
        addCss: 'profile.css'
    }), {
        height: h + 112,
        width: w + 42
    });
    return false;
}

function showGraffiti(graffiti_id, owner_id) {
    var h = 293,
        w = 586;
    Rpc.callMethod('showBox', 'graffiti.php?' + ajx2q({
        act: 'a_show_graffiti_box',
        graffiti: graffiti_id,
        wall_owner: owner_id,
        widget: 1,
        addCss: 'profile.css'
    }), {
        height: h + 112,
        width: w + 42
    });
    return false;
}

function showVideoBoxCommon(vars, elem, description, to_comments_text, add_text, add_hash, thumb, player_available, allow_html5, player_version) {
    Rpc.callMethod('showBox', 'video.php?' + ajx2q({
        act: 'a_show_video_box',
        video: vars.oid + '_' + vars.vid,
        wall_owner: vars.oid,
        widget: 1,
        addCss: 'profile.css,lib/swfobject2.js'
    }), {
        height: 441,
        width: 502
    });
    return false;
}



function showCaptcha(sid, img, onClick, onShow, onHide) {
    Rpc.callMethod('showBox', 'al_apps.php?' + ajx2q({
        act: 'show_captcha_box',
        sid: sid,
        src: img,
        need_mobile: window.need_mobile_act == 1 ? 1 : 0,
        widget: 1,
        addCss: 'profile.css'
    }), {
        height: 201,
        width: 322
    });
    window.onCaptcha = onClick;
    window.onCaptchaHide = onHide;
    return false;
}

function appendStatusToComments(o, t) {
    var res = eval('(' + t + ')');
    var el = ge('status_field');
    Ajax.Send("/widget_comments.php?act=a_post", {
        status: res.status,
        hash: res.hash,
        pageQuery: _pageQuery,
        app: _aid,
        'export': ge('status_export') ? ge('status_export').value : 1
    }, {
        onSuccess: function(o, t) {
            hide('loading');
            if (mentions_mod) {
                var mention = data(el, 'mention');
                if (mention) {
                    hide(mention.cont);
                    show(el);
                }
            }
            if (el.setValue) el.setValue('');
            else el.value = '';
            setStyle(el, {
                height: 42
            });

            if (!t) return;
            var ret = eval('(' + t + ')');
            var res = ge('queryResult');
            res.innerHTML = ret.html + res.innerHTML;
            eval(ret.js);
            if (window.Rpc) Rpc.callMethod('commentsNum', ret.num, ret.date, ret.num_hash);
            if ((ret.pageId || !window.moderMode) && window.Rpc) Rpc.callMethod('onChange', ret.num, ret.last_comment, ret.date, ret.full_hash, ret.pageId);

            each(geByClass('reply_message', res), function(i, v) {
                placeholderSetup(v);
                if (!v.autosize) {
                    v.autosize = new AutosizeMod(v, {
                        minHeight: 30,
                        onResize: resizeWidget
                    });
                }
            });
            resizeWidget();

        },
        onFail: function() {
            hide('loading');
        },
        onCaptchaHide: function() {
            hide('loading');
        }
    });
}

function saveComment() {
    var el = ge('status_field'),
        cText = ge('status_field').getValue ? ge('status_field').getValue() : ge('status_field').value;
    var f = data(ge('add_wall_media_link_status'), 'postFunc');
    if (f) return f();
    if (!trim(cText)) {
        if (!window.mentions_mod) el.focus();
        else triggerEvent(el, 'focus');
        return;
    }
    if (isVisible('loading')) return;
    window._currentFocusEl = ge('queryResult');
    show('loading');

    var params = extend({}, _initialParams, _shareData, {
        hash: ge('hash').value,
        media: '',
        media_id: '',
        to_id: ge('id').value,
        message: cText,
        type: '',
        reply_to: -1,
        status_export: ge('status_export') ? ge('status_export').value : 1
    });
    Ajax.Send('wall.php', params, {
        onSuccess: appendStatusToComments,
        onFail: function() {
            hide('loading');
        },
        onCaptchaHide: function() {
            hide('loading');
        }
    });
}

function postWall(to_id, hash, top_id) {
    var undefined;
    var full_id = top_id;
    if (top_id && top_id.indexOf('_') != '_') {
        top_id = top_id.split('_');
        top_id = top_id[1];
    } else {
        full_id = top_id = '';
    }
    if (window.posting_on_wall) {
        return;
    }
    var el = ge('reply_field' + full_id);
    var txt = isFunction(el.getValue) ? el.getValue() : el.value;
    if (!trim(txt).length) {
        el.focus();
        return;
    }
    posting_on_wall = true;
    hide('msg', 'msg_graffiti', 'msg_photo', 'msg_video', 'msg_audio');
    show('progr2');

    var params = {
        act: 'a_reply',
        hash: decodehash(hash),
        message: txt,
        to_id: to_id,
        reply_to: (ge('reply_to' + full_id) || {}).value,
        top_id: top_id,
        pageQuery: _pageQuery,
        app: _aid
    };
    if (full_id) {
        params.start_id = (ge('start_reply' + full_id) || {}).value;
    }
    var stop = function(obj, text) {
        hide('progr2');
        ge('reply_field' + full_id).focus();
        posting_on_wall = false;
    }
    window._currentFocusEl = el;
    Ajax.Send("/widget_comments.php", params, {
        onSuccess: function(o, t) {
            var res = eval('(' + t + ')');
            posting_on_wall = false;
            hide('post_status_title');
            hide('reply_to_title');
            if (ge('reply_to')) ge('reply_to').value = 0;
            hide('progr2');

            var ph = el.getAttribute('placeholder') || '';
            el.value = ph;
            if (ph) {
                el.style.color = '#777';
                el.active = 0;
                el.blur();
            } else {
                //old
                hide('r');
            }
            if (full_id) {
                var reply_link = ge('reply_link' + full_id);
                if (reply_link) {
                    reply_link.parentNode.removeChild(reply_link);
                }
                hideReplyBox(full_id);
            }
            if (res.replies) {
                ge('replies' + full_id).innerHTML = res.replies;
                show('replies' + full_id, 'replies_wrap' + full_id);
            }

            if (!ge('fBox2')) {
                window.fbox2_cache = res.html;
            } else if (!res.replies) {
                ge('fBox2').innerHTML = res.html;
            }

            setupReply();
            resizeWidget();
        },
        onFail: stop,
        onCaptchaShow: stop,
        onCaptchaHide: stop
    });
}

function showDeleteBox(el) {
    el = ge(el);
    if (!el || el.active) return;
    animate(el, {
        backgroundColor: '#C4D2E1'
    }, 200);
}

function hideDeleteBox(el) {
    el = ge(el);
    if (!el || el.active) return;
    animate(el, {
        backgroundColor: '#FFFFFF'
    }, 200);
}

function activeDeleteBox(el) {
    el = ge(el);
    el.active = 1;
    animate(el, {
        backgroundColor: '#6B8DB1'
    }, 200);
}

function inactiveDeleteBox(el) {
    el = ge(el);
    el.active = 0;
    showDeleteBox(el);
}

function showReplies(to_id, msg_id, count) {
    Ajax.Send('wall.php', {
        act: 'a_get_replies',
        msg_id: msg_id,
        to_id: to_id,
        count: count
    }, function(o, t) {
        ge('replies' + to_id + '_' + msg_id).innerHTML = t;
    });
}

function deleteStatus(cid, oid, hash) {
    var full_id = oid + '_' + cid;
    var params = {
        act: 'a_delete',
        oid: oid,
        cid: cid,
        hash: hash,
        app: _aid
    };
    if (!window.moderMode) {
        params.pageQuery = _pageQuery;
    }
    Ajax.Send('/widget_comments.php', params,
        function(o, t) {
            var res = eval('(' + t + ')');
            if (!window.moderMode && window.Rpc) Rpc.callMethod('commentsNum', res.num, res.date, res.num_hash);
            if ((res.pageId || !window.moderMode) && window.Rpc) Rpc.callMethod('onChange', res.num, res.last_comment, res.date, res.full_hash, res.pageId);
            restoreCache[full_id] = ge('status' + full_id).innerHTML;
            ge('status' + full_id).innerHTML = res.html;
            eval(res.js);
        }
    );
}

function showMore(app, pageQuery, from, limit) {
    var moreLink = ge('commentsMoreLink');
    var params = {
        act: 'a_more',
        app: app,
        from: from,
        limit: limit
    };
    if (!window.moderMode) {
        params.pageQuery = pageQuery;
    } else if (moderMode == 'updates') {
        params.page = 'updates';
    }
    Ajax.Send('/widget_comments.php', params,
        function(o, t) {
            tmpDiv = ce('div', {
                innerHTML: t
            });
            moreLink.parentNode.replaceChild(tmpDiv, moreLink);
            while (tmpDiv.firstChild) tmpDiv.parentNode.insertBefore(tmpDiv.firstChild, tmpDiv);
            tmpDiv.parentNode.removeChild(tmpDiv);
            setupReply();
            resizeWidget();
        }
    );
}

function extractChilds(el) {
    while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
    el.parentNode.removeChild(el);
}

function showMoreMembers(from, limit) {
    var moreLink = ge('usersMoreLink');
    Ajax.Send('/widget_comments.php', {
            act: 'a_blacklist_more',
            app: _aid,
            from: from,
            limit: limit
        },
        function(o, t) {
            var resp = eval('(' + t + ')'),
                tmpDiv = ce('div', {
                    innerHTML: resp.rows
                }),
                tmpDiv2 = ce('div', {
                    innerHTML: resp.more
                });
            ge('membersRows').appendChild(tmpDiv);
            extractChilds(tmpDiv);
            moreLink.parentNode.replaceChild(tmpDiv2, moreLink);
            extractChilds(tmpDiv2);
            resizeWidget();
        }
    );
}

function switchModMode(val, anchor) {
    if (ge('mod_sections_loading')) {
        setStyle('mod_sections_loading', 'visibility', 'visible');
    } else {
        anchor.parentNode.replaceChild(ce('span', {
            innerHTML: '<img src="/images/upload.gif" />'
        }), anchor);
    }
    if (val) {
        Ajax.Send('/widget_comments.php', {
                act: 'a_' + val,
                app: _aid,
                limit: 20
            },
            function(o, t) {
                ge('main').innerHTML = t;
                moderMode = val;
                setupReply();
                resizeWidget();
            }
        );
    } else {
        location.href = location.href;
    }
}

function deleteAndBan(mid, anchor, hash, obj) {
    if (!hash) {
        hash = anchor.href.match(/hash=(.+)$/i)[1];
    }
    Ajax.Send('/widget_comments.php', {
            act: 'a_blacklist_add',
            app: _aid,
            mid: mid,
            hash: hash
        },
        function(o, t) {
            each(ge('main').childNodes, function() {
                if (this.tagName == 'DIV' && hasClass(this, 'commentFrom' + mid)) {
                    this.innerHTML = t;
                }
            });
            if (obj) {
                obj.parentNode.parentNode.innerHTML = t;
            }
        }
    );
    return false;
}

function unblockUser(mid, hash, anchor) {
    var newActions = ce('span', {
        innerHTML: '<img src="/images/upload.gif" />'
    });
    anchor.parentNode.replaceChild(newActions, anchor);
    Ajax.Send('/widget_comments.php', {
            act: 'a_blacklist_remove',
            app: _aid,
            mid: mid,
            hash: hash
        },
        function(o, t) {
            newActions.innerHTML = t;
        }
    );
    return false;
}



function updateTAWidth() {
    if (!window.mainDiv) return;
    if (window.noAuthVal || Math.max(document.body.offsetWidth, document.body.clientWidth, window.mainDiv.offsetWidth) < 400) {
        hide('toStatus');
    } else {
        show('toStatus');
    }
}

function resizeWidget() {
    if (!window.mainDiv || !window.Rpc) return;
    var size = getSize(window.mainDiv)[1];
    if (browser.msie && !browser.msie8 || browser.opera) size += 15;

    if (window.mentions_mod && size < 150 && window.mention) { // fix for mentions list
        if (mention.select.isVisible()) {
            size += Math.max(getSize(mention.select.list)[1] - 35, 0);
        }
    }
    window.Rpc.callMethod('resize', size);
}

moderMode = false;

onDomReady(function() {
    setupReply();
    placeholderSetup(ge('status_field'));
    if (window.noAuthVal) {
        hide('authorPic');
    }
    if (ge('status_export')) new Checkbox(ge('status_export'), {
        label: getLang('export_to_status'),
        width: 300
    });
    updateTAWidth();

    setInterval(resizeWidget, 1000);

    window.mainDiv = ge('main');
    addEvent(document, 'click', function(e) {
        var el = e.target;
        var id = el.id;
        if (currentFocus !== false && !hasClass(el, 'reply_link') && id != 'reply_field' + currentFocus && id != 'status_field' && el.className != 'replyToLink') {
            hideReplyBox(currentFocus);
        }
    });
    initMentions(ge('status_field'));

    window.Rpc = new fastXDM.Client({
        onInit: function() {
            setTimeout(function() {
                resizeWidget();
            }, 0);
            updateTAWidth();
            setTimeout(function() {
                resizeWidget();
            }, 500);
        },
        doSendPhoto: function() {
            window.doSendPhoto.apply(window, arguments);
        },
        doSendVideo: function() {
            window.doSendVideo.apply(window, arguments);
        },
        doSendAudio: function() {
            window.doSendAudio.apply(window, arguments);
        },
        newPostedUploaded: function() {
            window.newPostedUploaded.apply(window, arguments);
        },
        captcha: function(sid, value) {
            window.onCaptcha(sid, value);
        },
        captchaHide: function() {
            window.onCaptchaHide();
        }
    });
});

function goAway(url) {
    return true;
}

function widgetAuth() {
    var
        screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
        outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
        outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
        features = 'width=554,height=207,left=' + parseInt(screenX + ((outerWidth - 554) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 207) / 2.5), 10);
    this.active = window.open('http://vkontakte.ru/login.php?app=-1&layout=widgets', 'vk_openapi', features);
}

function gotSession(session_data) {
    location.href = location.href + '&1';
}