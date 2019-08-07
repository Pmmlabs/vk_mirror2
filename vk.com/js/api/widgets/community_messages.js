var CommunityWidget = {
    init: function(messages, group_info, queue_params, next_from, counters, opts) {
        this.override();

        cur.media.onChange = setTimeout.pbind(function() {
            CommunityWidget.updateSize();
            CommunityWidget.scrollToBottom();
        }, 0);

        cur.loadingMore = 1;
        cur.scrollbar = new uiScroll('history_scroll', {
            nokeys: true,
            nomargin: true,
            onscroll: function() {
                if (cur.loadingMore || !cur.nextFrom || !cur.expanded) {
                    return;
                }
                if (geByClass1('ui_scroll_outer', 'history_scroll').scrollTop < 200) {
                    CommunityWidget.loadMore();
                }
            },
        });

        cur.nextFrom = next_from;

        this.sentI = 0;
        this.sentMessages = [];
        this.unreadMessages = [];

        this.counters = counters;

        this.groupInfo = group_info;
        this.renderMessages(messages[0], 0, messages[1]);
        if (messages[0].length == 0) {
            cur.noMessagesMode = 1;
        }
        setTimeout(function() {
            CommunityWidget.updateSize();
            CommunityWidget.scrollToBottom();
            cur.scrollbar && cur.scrollbar.update(1, 1);
            if (cur.nextFrom) {
                cur.loadingMore = 0;
            }
        }, 0);

        this.initQTransport(opts.longpoll);

        addEvent(window, 'click', this.onWinClick.bind(this));
        cur = extend(cur, opts);

        if (opts.need_user_source) {
            cur.source = {
                info: opts.ref_source_info,
                link: opts.ref_source_link,
            };
        }

        CommunityWidget.updatePreviewPos();

        this.checkInfo();

        this.insertUploadInput('photo_upload_inp');
        this.insertUploadInput('doc_upload_inp');

        var moreItemsHelper = geByClass1('ms_items_more_helper');

        if (moreItemsHelper) {
            moreItemsHelper.style.right = '';
        }

        this.getSettings();

        if (browser.msie9) {
            hide(geByClass1('wcm_button_ic_rev'));
        }

        cur.domain = opts.domain;
        cur.noNewMessagesSong = opts.disable_new_messages_sound;

        cur.newMessagesNum = 0;
    },
    initOther: function(opts) {
        CommunityWidget.updateButtonPosition(opts.widgetPosition);
        cur.disable_welcome_screen = opts.disable_welcome_screen;
        cur.tooltipShowTimer = setTimeout(CommunityWidget.showTooltip, 2000);
    },
    initQTransport: function(data) {
        /*window.curNotifier = extend(options, {
          lp_connected: false,
          error_timeout: 1
        });*/
        CommunityWidget.lpInit(data);
        //CommunityWidget.lpStart();
    },
    lpGetTransportWrap: function() {
        var queueCont = ge('queue_transport_wrap');
        if (!queueCont) {
            queueCont = ce('div', {
                id: 'queue_transport_wrap'
            });
            utilsNode.appendChild(queueCont);
        }
        return queueCont;
    },

    /* Long-poll methods */
    lpInit: function(data) {
        this.queueInfo = data;

        this.worker = new Worker('/js/snapster/notify_worker.js');
        this.worker.addEventListener('message', this.onWorkerMessage);
        this.worker.addEventListener('error', this.onWorkerError);

        /*if (curNotifier.lpMakeRequest) return;
        delete curNotifier.lpMakeRequest;
        re('queue_transport_frame');
        CommunityWidget.lpGetTransportWrap().appendChild(
          ce('iframe', {
            id: 'queue_transport_frame',
            name: 'queue_transport_frame',
            src: curNotifier.frame_path
          })
        );*/
    },
    onWorkerMessage: function(e) {
        var d = e.data;
        switch (d.type) {
            case 'inited':
                CommunityWidget.sendQueueRequest();
                break;
            case 'request_complete':
                CommunityWidget.onRequestComplete(d.events, d.fails, d.keys);
                break;
            case 'released':
                CommunityWidget.sendQueueRequest();
                break;
        }
    },
    onWorkerError: function(e) {
        debugLog('onError', e);
    },
    sendWorkerMessage: function(cmd, data) {
        this.worker.postMessage({
            cmd: cmd,
            data: data,
        });
    },
    prepareQueueFails: function() {
        debugLog('Queue fails', this.queueFails);
        this.getQueueKeys(this.queueFails);
        delete this.queueFails;
    },
    getQueueKeys: function(qnames) {
        if (!isArray(qnames)) {
            qnames = [qnames];
        }
        if (qnames.length == 0) {
            return;
        }
        debugLog('Get queue keys', qnames);
        ajax.post('widget_community_messages.php', {
            act: 'queue_key',
        }, {
            onDone: function(data) {
                CommunityWidget.queueInfo.keys['common'] = data;
                CommunityWidget.sendQueueRequest();
            }
        });
    },
    sendQueueRequest: function() {
        if (this.queueFails && this.queueFails.length > 0) {
            return this.prepareQueueFails();
        }
        if (!Object.keys(this.queueInfo.keys).length) {
            return;
        }
        this.sendWorkerMessage('request', this.queueInfo);
    },
    onRequestComplete: function(events, fails, keys) {
        this.queueInfo.keys = keys;
        this.queueFails = fails;
        this.sendQueueRequest();

        if (!events.length) {
            return;
        }

        for (var i in events) {
            var event = events[i];
            event && this.proccessEvent(event);
        }
    },
    proccessEvent: function(ev) {
        var type = ev[0];

        switch (type) {
            case 6:
            case 7:
                CommunityWidget.onSeen(ev);
                break;
            case 4:
                CommunityWidget.onNewMessage(ev);
                break;
            case 61:
                CommunityWidget.onTyping(ev);
                break;
        }
    },

    lpStart: function() {
        curNotifier.lp_started = true;
        CommunityWidget.lpCheck();
    },
    lpStop: function() {
        curNotifier.lp_started = false;
        clearTimeout(curNotifier.lp_check_to);
        clearTimeout(curNotifier.lp_error_to);
    },
    lpCheck: function() {
        if (!curNotifier.lp_started) return;
        if (!curNotifier.lpMakeRequest) {
            curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1000);
            return;
        }
        curNotifier.lpMakeRequest(curNotifier.frame_url, {
            act: 'a_check',
            ts: curNotifier.timestamp,
            key: curNotifier.key,
            id: curNotifier.uid,
            wait: 25
        }, function(text) {
            if (!curNotifier.lp_started) return;
            try {
                var success = this.lpChecked(eval('(' + text + ')'));
                if (success) {
                    this.lpCheck();
                    curNotifier.error_timeout = 1;
                }
            } catch (e) {
                topError('Notify error: ' + e.message);
                curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
                if (curNotifier.error_timeout < 64) {
                    curNotifier.error_timeout *= 2;
                }
            }
        }.bind(this), function(msg) {
            curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
            if (curNotifier.error_timeout < 64) {
                curNotifier.error_timeout *= 2;
            }
        }.bind(this));
    },
    lpChecked: function(response) {
        var failed = response.failed;
        if (failed == 2) {
            curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
            if (curNotifier.error_timeout < 64) {
                curNotifier.error_timeout *= 2;
            }
            return false;
        } else if (failed) {
            throw getLang('global_unknown_error');
        }
        curNotifier.timestamp = response.ts;
        each(response.events, function(k, v) {
            CommunityWidget.pushEvent(v);
        });
        return true;
    },
    lpGetKey: function() {
        var stNow = vkNow();
        ajax.post('widget_community_messages.php', {
            act: 'get_key'
        }, {
            onDone: function(key, ts) {
                curNotifier.timestamp = ts;
                curNotifier.key = key;
                this.lpCheck();
            }.bind(this),
            onFail: function(code) {
                if (code == 3) {
                    location.reload();
                    return;
                }
                curNotifier.error_timeout = 64;
                this.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
                if (curNotifier.error_timeout < 64) {
                    curNotifier.error_timeout *= 2;
                }
                return true;
            }.bind(this)
        });
    },
    pushEvent: function(ev_text) {
        var ev = ev_text.split('<!>'),
            ev_ver = ev[0],
            ev_type = ev[1],
            peer = ev[2];

        if (peer != -this.groupInfo.id) {
            return;
        }

        switch (ev_type) {
            case 'new':
                this.onNewMessage(peer, ev[3], ev[4], ev[5]);
                break;
            case 'read':
                var msgs = ev[3].split(',');
                var out = 0;
                for (var i in msgs) {
                    var msg_id = intval(msgs[i]);
                    this.onReadMessage(msg_id);
                    var el = ge('msg' + msg_id);
                    if (el && el.parentNode && !hasClass(el.parentNode, 'wcm_msg_block_in')) {
                        this.counters.outbox = msg_id;
                        out = 1;
                    }
                }
                CommunityWidget.readDomMsg(out);
                break;
            case 'typing':
                this.onTyping();
                break;
        }
    },
    readDomMsg: function(out) {
        var class_name = out ? 'outbox' : 'inbox';
        var els = document.querySelectorAll('.wcm_msg_wrap.wcm_msg_wrap_unread.' + class_name);
        for (var i = 0; i < els; i++) {
            var msg_id = intval(els[i].id.replace('msg', ''));
            this.onReadMessage(msg_id);
        }
    },
    updateSize: function() {
        var formH = ge('send_form').offsetHeight,
            headH = geByClass1('wcm_head').offsetHeight,
            offlineInfH = geByClass1('wcm_offline_offline_info').offsetHeight,
            h = window.innerHeight - formH - headH - offlineInfH,
            ginfoH = geByClass1('wcm_group_info').offsetHeight;

        setStyle('history_scroll', {
            height: h + 'px',
        });

        if (cur.noMessagesMode) {

        } else {
            var history = ge('history');
            if (!history) {
                return;
            }
            var historyTop = Math.max(0, h - ginfoH - history.offsetHeight - ge('upload_preview').offsetHeight - ge('typing').offsetHeight);
            setStyle('history', 'margin-top', historyTop + 'px');
        }
    },
    scrollToBottom: function() {
        cur.scrollbar.scrollBottom(0);
    },
    selectPhoto: function() {
        ge('photo_upload_inp').click();
    },
    selectDoc: function() {
        ge('doc_upload_inp').click();
    },
    putMsg: function(data, before) {
        if (before) {
            this.checkBeforeBlock(data);
        } else {
            this.checkBlock(data);
        }

        if (data.fwd > 0) {
            var fwd = '<a href="/im?msgid=' + data.id + '&sel=-' + this.groupInfo.id + '" class="clear_fix wcm_fwd" target="_blank">\
        <div class="wcm_fwd_ic fl_l"></div>\
        <div class="wcm_fwd_msg">' + cur.lang.fwd + '</div>\
      </a>';
        } else {
            var fwd = '';
        }

        var cont = '\
      <div class="wcm_msg">\
        <div class="wcm_msg_text">' + data.text + '</div>\
        <div class="wcm_media">' + this.prepareMedia(data.attachments, data.id) + '</div>\
        <div class="wcm_fwd_msg"></div>\
        ' + fwd + '\
      </div>';

        var class_name = 'wcm_msg_wrap clear_fix';
        if (data.attachments && data.attachments.length > 0 && data.attachments[0].type == 'sticker') {
            class_name += ' wcm_msg_wrap_sticker';
        }

        if (data.from_id < 0) {
            class_name += ' inbox';
            var unread = this.counters.inbox < data.id;
        } else {
            class_name += ' outbox';
            var unread = this.counters.outbox < data.id;
        }

        if (unread || data.unread) {
            class_name += ' wcm_msg_wrap_unread';
        }

        if (data.from_id < 0 && unread) {
            this.unreadMessages.push(data.id);
        }

        var msg = ce('div', {
            className: class_name,
            innerHTML: cont,
            id: 'msg' + data.id,
        });

        if (before) {
            var block = ge('block_' + this.before_block),
                first = block.firstChild;
            if (first) {
                block.insertBefore(msg, first);
            } else {
                block.appendChild(msg);
            }
        } else {
            ge('block_' + this.after_block).appendChild(msg);
        }
    },
    checkBeforeBlock: function(data) {
        if (intval(this.before_date) - intval(data.date) >= 86400) {
            this.putDateSpliter(data.date, 1);
            return this.putNewBlock(data, 1);
        }
        if (intval(this.before_from) != intval(data.from_id)) {
            this.putNewBlock(data, 1);
        }
    },
    checkBlock: function(data) {
        if (intval(data.date) - intval(this.last_date) >= 86400) {
            this.putDateSpliter(data.date);
            return this.putNewBlock(data);
        }
        if (intval(this.last_from) != intval(data.from_id)) {
            this.putNewBlock(data);
        }
    },
    putDateSpliter: function(date, before) {
        var spliter = ce('div', {
            className: 'wcm_msg_date_spliter',
            innerHTML: CommunityWidget.formatDate(date),
        });
        if (before) {
            var history = ge('history');
            history.insertBefore(spliter, geByClass1('wcm_msg_date_spliter', history));
        } else {
            ge('history').appendChild(spliter);
        }
    },
    removeBlock: function(block) {
        var prev = block.previousSibling;
        re(block);

        if (prev) {
            this.last_from = attr(prev, 'data-from');
            this.last_date = attr(prev, 'data-date');
        } else {
            this.last_from = 0;
            this.last_date = 0;
        }
    },
    putNewBlock: function(data, before) {
        this.block_i = ++this.block_i || 0;
        var bId = this.block_i;
        if (before) {
            this.before_from = data.from_id;
            this.before_date = data.date;
        } else {
            this.last_from = data.from_id;
            this.last_date = data.date;
        }

        addClass('wcm_example_messages', 'no_display');

        var class_name = 'wcm_msg_block';
        if (data.from_id < 0) {
            class_name += ' wcm_msg_block_in';

            var cont = '<div class="wcm_msg_ava">\
        <a href="/' + this.groupInfo.domain + '" target="_blank"><img src="' + this.groupInfo.ava + '" class="wcm_msg_ava_img" /></a>\
      </div>';
        } else {
            var cont = '';
        }

        var block = ce('div', {
            className: class_name,
            id: 'block_' + bId,
            innerHTML: cont,
        });
        attr(block, 'data-from', data.from_id);
        attr(block, 'data-date', data.date);

        var history = ge('history');
        if (before) {
            this.before_block = bId;
            var first_block = geByClass1('wcm_msg_date_spliter', history);
            if (first_block) {
                history.insertBefore(block, first_block.nextSibling);
            } else {
                history.appendChild(block);
            }
        } else {
            this.after_block = bId;
            history.appendChild(block);
        }
    },
    renderMessages: function(messages, before, unread_num) {
        for (var i in messages) {
            if (i < unread_num) {
                messages[i].unread = 1;
            }
            this.putMsg(messages[i], before);
        }
        this.updateSize();
    },
    prepareText: function(text, opts) {
        if (!opts) {
            opts = {};
        }

        text = text || '';

        text = text.replace(/\<br\>/g, '\n');

        if (!opts.no_clean) {
            text = clean(text);
        }
        text = text.replace(/\n/g, '<br>');
        text = Emoji.emojiToHTML(text, 1);

        text = text.replace(/(^|[^A-Za-z0-9�-��-���\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9�-��-���](?:[A-Za-z\$0-9\-\_�-��-���]*[A-Za-z\$0-9�-��-���])?\.){1,5}[A-Za-z\$������������������������\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9�-��-���\-\_#%?+\/\$.~=;:]+|\[[A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9�-��-���\-\_#%?+\/\$.~=;:]*[A-Za-z0-9�-��-���\_#%?+\/\$~=]|\[[A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\)))?)?)/ig, function() {
            var matches = Array.prototype.slice.apply(arguments),
                prefix = matches[1] || '',
                protocol = matches[2] || 'http://',
                domain = matches[3] || '',
                url = domain + (matches[4] || ''),
                full = (matches[2] || '') + matches[3] + matches[4];

            if (domain.indexOf('.') == -1 || domain.indexOf('..') != -1) return matches[0];

            var topDomain = domain.split('.').pop();
            if (topDomain.length > 7 || indexOf('place,camera,info,name,academy,aero,arpa,coop,media,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,��,���,����,������,���,cat,pro,local'.split(','), topDomain) == -1) {
                if (!/^[a-zA-Z]+$/.test(topDomain) || !matches[2]) {
                    return matches[0];
                }
            }

            if (matches[0].indexOf('@') != -1) {
                return matches[0];
            }

            try {
                full = decodeURIComponent(full);
            } catch (e) {}

            if (full.length > 47) {
                full = full.substr(0, 45) + '..';
            }
            full = clean(full).replace(/&amp;/g, '&');

            if (domain.match(/^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me|([a-zA-Z0-9\-]\.)?snapster\.io)$/)) {
                url = replaceEntities(url).replace(/([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, encodeURIComponent);
                return prefix + '<a href="' + (protocol + url).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" target="_blank" rel="noopener">' + full + '</a>';
            }

            return prefix + '<a href="/away.php?utf=1&to=' + encodeURIComponent(protocol + replaceEntities(url)) + '" target="_blank" rel="noopener">' + full + '</a>';
        });

        return text;
    },
    failsMsg: {},
    send: function(opts) {
        if (!opts) {
            opts = {};
        }

        if (opts.retry) {
            var params = opts.params;
            var data = opts.data;
            var msgID = opts.msg_id;
        } else {

            if (opts.media) {
                var text = '';
            } else {
                var txt = ge('send_text'),
                    text = String(Emoji.editableVal(txt)).trim();
                if (!text) {
                    return;
                }
                val(txt, '');
            }

            this.sentI--;
            // fix server int32 overflow (msg.random_id - signed int32: max value 2147483647)
            var msgID = vkNow() % 2147483647; // this.sentI;
            var data = {
                id: msgID,
                unread: 1,
                text: this.prepareText(text),
                from_id: vk.id,
            };

            if (opts.media) {
                var mediaExp = opts.media.split(':');
                var mediaInfo = this.checkLocMedia(mediaExp[0], mediaExp[1]);
                if (mediaInfo) {
                    data.attachments = [mediaInfo];
                }
            }

            delete cur.noMessagesMode;

            this.putMsg(data);
            if (opts.media) {
                this.scrollToBottom();
            } else {
                this.animateScrollToBottom();
            }
            this.updateSize();

            var params = {
                act: 'a_send',
                hash: cur.sendHash,
                msg: text,
                from: 'fc',
                to: -this.groupInfo.id,
                media: opts.media,
                random_id: msgID,
                from_widget: 1,
                _ref_domain: cur.domain,
            };
        }

        this.removeMsgError(msgID);

        if (cur.need_user_source) {
            cur.source.link = this.getSourceLink();
            params.ref_source = JSON.stringify(cur.source);
        }

        var _s = this;
        ajax.post('al_im.php', params, {
            customProcessResponse: function(code, answer) {
                if (code == 0) {
                    var response = answer[0];
                    delete CommunityWidget.failsMsg[msgID];
                    cur.lastTyping = 0;

                    var msg = ge('msg' + msgID);
                    if (!msg) {
                        return;
                    }
                    msg.id = 'msg' + response.msg_id;
                    _s.last_from = vk.id;
                    _s.last_date = response.date;

                    if (data.attachments) {
                        var new_media = _s.prepareMedia(data.attachments, response.msg_id);
                        val(geByClass1('wcm_media', msg), new_media);
                    }
                } else if (code == 3) {
                    location.reload();
                } else {
                    CommunityWidget.failsMsg[msgID] = {
                        params: params,
                        data: data,
                    };
                    CommunityWidget.addMsgError(msgID);
                }
            },
        });
        this.sentMessages.push(msgID);
    },
    retrySendMsg: function(msg_id) {
        if (!this.failsMsg[msg_id]) {
            return;
        }
        this.send(extend({
            retry: 1,
            msg_id: msg_id,
        }, this.failsMsg[msg_id]));
    },
    deleteFailMsg: function(msg_id) {
        if (!this.failsMsg[msg_id]) {
            return;
        }
        this.removeMsgError(msg_id);
        re('msg' + msg_id);
        delete this.failsMsg[msg_id];
        CommunityWidget.updateSize();
    },
    removeMsgError: function(msg_id) {
        var nodes = geByClass('wcm_msg_error', 'msg' + msg_id);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].tt && nodes[i].tt.destroy();
            re(nodes[i]);
        }
    },
    addMsgError: function(msg_id) {
        var msg = geByClass1('wcm_msg', 'msg' + msg_id);
        if (!msg) {
            return;
        }
        var err = ce('div', {
            className: 'wcm_msg_error',
            hasover: 1,
            id: 'msg_error_' + msg_id
        });
        attr(err, 'onmouseover', 'CommunityWidget.showErrorTools(this, \'' + msg_id + '\')');

        msg.appendChild(err);
    },
    showErrorTools: function(el, msg_id) {
        showTooltip(el, {
            text: '<div class="wcm_msg_error_tools_item" onClick="CommunityWidget.retrySendMsg(' + msg_id + ');">' + cur.lang.retry_send + '</div><div class="wcm_msg_error_tools_item" onClick="CommunityWidget.deleteFailMsg(' + msg_id + ');">' + cur.lang.delete + '</div>',
            className: 'wcm_msg_error_tools',
            shift: [0, 6],
            dir: 'top',
            slide: 15,
            hasover: 1,
            onShowStart: function(tt) {
                var left = getXY(tt.container)[0],
                    width = getSize(tt.container)[0];
                if (left + width > window.innerWidth) {
                    tt.opts.shift = [width - 28, 6];
                    addClass(tt.container, 'from_right');
                } else {
                    tt.opts.shift = [14, 6];
                    removeClass(tt.container, 'from_right');
                }
                tooltips.rePositionTT(tt);
            },
        });
    },
    waitMessageList: [],
    sentMessages: {},
    addStikerLocMedia: function(id) {
        var size = window.devicePixelRatio > 1 ? 256 : 128;
        var data = {
            type: 'sticker',
            size: size,
            src: Stickers.getStickerUrl(id, size),
        };
        this.mediaInfo['sticker' + id] = data;
        return data;
    },
    onNewMessage: function(ev) {
        var msg_id = ev[1];
        var flags = ev[2];
        var peer_id = ev[3];
        var date = ev[4];
        var text = ev[5];
        var attachments = ev[6];
        var randomId = ev[7];

        if (peer_id != -this.groupInfo.id) {
            return;
        }

        if (ge('msg' + msg_id) || ge('msg' + randomId)) {
            return;
        }

        var is_out = flags & 2;
        var fwd = (attachments && parseInt(attachments.fwd_msg_count) > 0) ? 1 : 0;

        if (!is_out) {
            clearTimeout(cur.typingTimeout);
            setStyle('typing', 'opacity', 0);
            hide(geByClass1('wcm_offline_offline_info'));
            this.updateSize();
        }

        if (flags & 512 && attachments.attach1_type == 'sticker') {
            attachments = [this.addStikerLocMedia(attachments.attach1)];
            flags -= 512;
        } else {
            attachments = [];
        }

        var data = {
            id: msg_id,
            text: this.prepareText(text, {
                no_clean: 1
            }),
            from_id: is_out ? vk.id : -this.groupInfo.id,
            unread: flags & 1,
            attachments: attachments,
            fwd: fwd,
            date: date,
        };
        this.putMsg(data);

        if (flags & 512 && (ev[6].attach1_type || ev[6].geo)) {
            this.loadMedia(msg_id);
        }

        cur.noMessagesMode = 0;
        this.updateSize();

        cur.scrollbar && cur.scrollbar.update(1, 1);
        this.animateScrollToBottom();

        if (peer_id < 0 && !is_out) {
            CommunityWidget.expand();
            if (data.unread) {
                cur.newMessagesNum++;
                if (!document.hasFocus()) {
                    addClass(geByClass1('wcm_head'), 'wcm_head_animate');
                }
                cur.Rpc.callMethod('setPageTitle', '(' + cur.newMessagesNum + ') ' + langNumeric(cur.newMessagesNum, cur.lang.new_message_title));

                if (document.hasFocus && !document.hasFocus() && !cur.noNewMessagesSong) {
                    cur.Rpc.callMethod('newMessage');
                }
            }
        }
    },
    onReadMessage: function(msg_id) {
        removeClass('msg' + msg_id, 'wcm_msg_wrap_unread');
    },
    onTyping: function(ev) {
        if (ev[1] != -this.groupInfo.id) {
            return;
        }
        clearTimeout(cur.typingTimeout);
        setStyle('typing', 'opacity', 1);
        show(geByClass1('fc_tab_typing_icon', 'typing'));
        cur.typingTimeout = setTimeout(function() {
            hide(geByClass1('fc_tab_typing_icon', 'typing'));
            setStyle('typing', 'opacity', 0);
        }, 6000);
    },
    onSeen: function(ev) {
        if (ev[1] != -this.groupInfo.id) {
            return;
        }
        var className = ev[0] == 7 ? 'outbox' : 'inbox';
        var nodes = ge('history').querySelectorAll('.wcm_msg_wrap.' + className + '.wcm_msg_wrap_unread');
        for (var i = 0; i < nodes.length; i++) {
            removeClass(nodes[i], 'wcm_msg_wrap_unread');
            cur.newMessagesNum = 0;
        }
        if (ev[0] == 6) {
            cur.Rpc.callMethod('resetPageTitle');
        }
    },
    loadMedia: function(msg_id) {
        var el = geByClass1('wcm_media', 'msg' + msg_id);
        val(el, '<div class="wcm_media_loader"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div></div>');

        ajax.post('widget_community_messages.php', {
            act: 'load_media',
            msg_id: msg_id,
        }, {
            onDone: function(attachments) {
                val(el, CommunityWidget.prepareMedia(attachments, msg_id));
                cur.scrollbar && cur.scrollbar.update(1, 1);
                CommunityWidget.scrollToBottom();
            },
            onFail: function() {
                val(el, 'Error');
            }
        });
    },
    getAttachPhotoSize: function(item) {
        if (item.width > item.height) {
            var width = Math.min(item.width, 188);
            var height = item.height / item.width * width;
        } else {
            var height = Math.min(item.height, 125);
            var width = item.width / item.height * height;
        }
        return [Math.max(60, width), Math.max(60, height)];
    },
    prepareMedia: function(attachments, msg_id) {
        var res = '';

        for (var i in attachments) {
            var item = attachments[i];

            switch (item.type) {
                case 'photo':
                    var size = CommunityWidget.getAttachPhotoSize(item);
                    res += '<a href="https://vk.com/im?sel=-' + this.groupInfo.id + '&z=photo' + item.id + '%2Fmail' + msg_id + '" target="_blank" onClick="return showPhoto(\'' + item.id + '\', \'' + item.hash + '\');" class="wcm_attach_item"><img class="wcm_attach_photo" style="height:' + size[1] + 'px;width:' + size[0] + 'px;" src="' + item.src + '"></a>';
                    break;
                case 'video':
                    res += '<a href="https://vk.com//im?sel=-' + this.groupInfo.id + '&z=video' + item.id + '%2F' + item.hash + '" target="_blank" onClick="return showVideo(\'' + item.id + '\', \'' + item.hash + '\', {autoplay: 1, queue: 1}, event);" class="wcm_attach_item wcm_attach_video_wrap">\
            <img class="wcm_attach_video" src="' + item.src + '">\
            <div class="wcm_attach_video_duration">' + item.duration + '</div>\
          </a>';
                    break;
                case 'doc':
                    var class_name = CommunityWidget.getAttachFileClass(item.ext);
                    res += '<div class="wcm_attach_item clear_fix wcm_attach_doc">\
            <a href="' + item.url + '" target="_blank" rel="noopener"><div class="wcm_attach_doc_ic fl_l ' + class_name + '"></div></a>\
            <div class="wcm_attach_doc_cont">\
              <div class="wcm_attach_doc_title"><a href="' + item.url + '" target="_blank" rel="noopener">' + clean(unclean(unclean(item.title))) + '</a></div>\
              <div class="wcm_attach_doc_size">' + item.size + '</div>\
            </div>\
          </div>';
                    //res += '<a href="'+item.url+'" target="_blank" class="fc_msg_att_lnk"><span class="fc_msg_att_icon_doc"></span><span class="fc_msg_att_text">'+item.title+'</span></a>';
                    break;
                case 'geo':
                    res += '<div class="wcm_attach_item"><a href="' + item.url + '" target="_blank" rel="noopener"><div class="page_media_map_point"></div><img class="page_media_map" width="188" height="74" src="' + item.img + '" /></a></div>';
                    break;
                case 'sticker':
                    res += '<img class="wcm_attach_item wcm_attach_sticker" height="' + item.size + '" src="' + item.src + '">';
                    break;
                case 'audio':
                    item.title = item.title.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                    res += '<a href="https://vk.com/im?sel=-' + this.groupInfo.id + '&msgid=' + msg_id + '" target="_blank" class="wcm_attach_item wcm_audio_playlist clear_fix wcm_attach_audio_row">\
            <div class="wcm_audio_playlist_cover" style="' + item.cover_style + '"></div>\
            <div class="wcm_audio_playlist_info">\
              <div class="wcm_audio_playlist_title">' + clean(item.title) + '</div>\
              <div class="wcm_audio_playlist_caption_line">' + clean(item.author) + '</div>\
            </div>\
          </a>';
                    break;
                case 'link':
                    res += item.html;
                    break;
                case 'audio_playlist':
                    res += '<a href="' + item.href + '" target="_blank" rel="noopener" class="wcm_attach_item wcm_audio_playlist clear_fix">\
            <div class="wcm_audio_playlist_cover" style="' + item.thumb + '">' + item.grid_covers + '</div>\
            <div class="wcm_audio_playlist_info">\
              <div class="wcm_audio_playlist_title">' + clean(item.title) + '</div>\
              <div class="wcm_audio_playlist_caption_line">' + clean(item.author_name) + '</div>\
              <div class="wcm_audio_playlist_caption_line">' + item.size + '</div>\
            </div>\
           </a>';
                    break;
            }
        }
        return res;
    },
    getAttachFileClass: function(ext) {
        var class_name = '';
        if (inArray(ext, ['png', 'gif', 'jpg', 'jpeg'])) {
            class_name += ' wcm_attach_doc_ic_img';
        }
        return class_name;
    },
    checkLocMedia: function(type, id) {
        var raw_id = type + id;

        if (type == 'sticker') {
            this.addStikerLocMedia(id);
        }

        if (this.mediaInfo[raw_id]) {
            return extend(this.mediaInfo[raw_id], {
                type: type,
                id: id,
            });
        } else {
            return false;
        }
    },
    releaseWaitMesgList: function() {
        for (var i in this.waitMessageList) {
            var item = this.waitMessageList[i];
            var msg_id = item[1];
            if (this.sentMessages[msg_id]) {
                continue;
            }
            this.onNewMessage(item[0], item[1], item[2], item[3]);
        }
        this.waitMessageList = [];
    },
    loadMore: function() {
        if (cur.loadingMore || !cur.nextFrom || !cur.expanded) {
            return;
        }
        cur.loadingMore = 1;

        var curH = geByClass1('ui_scroll_outer', 'history_scroll').scrollHeight;
        ajax.post('widget_community_messages.php', {
            act: 'load_more',
            gid: CommunityWidget.groupInfo.id,
            start_from: cur.nextFrom,
        }, {
            onDone: function(history, next_from) {
                CommunityWidget.renderMessages(history[0], 1);

                var diff = geByClass1('ui_scroll_outer', 'history_scroll').scrollHeight - curH;
                cur.scrollbar.scrollTop(diff);

                cur.nextFrom = next_from;
                if (next_from) {
                    cur.loadingMore = 0;
                }
            },
        });
    },
    putExampleMsg: function(msg) {
        var txt = ge('send_text');
        Emoji.val(txt, msg + ' ');
        Emoji.editableFocus(txt, 0, 1);
    },
    updatePreviewPos: function() {
        var previewInfoH = geByClass1('wcm_chat_preview_group_info').offsetHeight,
            previewH = geByClass1('wcm_chat_preview').offsetHeight - 30;

        setStyle(geByClass1('wcm_chat_preview_group_info'), {
            'margin-top': ((previewH - previewInfoH) / 2) + 'px',
        });
    },
    show: function() {
        removeClass(geByClass1('wcm_chat'), 'wcm_chat_shown');
        CommunityWidget.updatePreviewPos();
    },
    expand: function(opts) {
        opts = opts || {};

        if (cur.expanded) {
            return;
        }

        if (opts.welcomeScreen == undefined) {
            opts.welcomeScreen = !cur.disable_welcome_screen;
        }

        addClass('wcm_button', 'wcm_button_hidden');
        CommunityWidget.hideTooltip();
        setTimeout(function() {
            removeClass('wcm_chat', 'wcm_button_hidden');
            cur.expanded = 1;

            cur.Rpc.callMethod('expand', opts);

            if (intval(opts.welcomeScreen) == 1 || !vk.id) {
                removeClass(geByClass1('wcm_chat_preview'), 'wcm_disable_preview');
            } else {
                addClass(geByClass1('wcm_chat_preview'), 'wcm_disable_preview');
            }

            if (opts.playSong) {
                CommunityWidget.playShowSound();
            }
            CommunityWidget.onWinResize();

            setTimeout(function() {
                cur.scrollbar && cur.scrollbar.update(1, 1);
                CommunityWidget.updateWinSize();
            }, 500);
            if (vk.id && !geByClass1('wcm_error_msg')) {
                Emoji.editableFocus('send_text', 0, 1);
            }
        }, 120);

        if (!cur.sentExpandStat) {
            cur.sentExpandStat = 1;
            ajax.post('widget_community_messages.php', {
                act: 'expand_chat',
            }, {
                onDone: function() {}
            });
        }
    },
    updateWinSize: function() {
        lastWindowWidth = window.innerWidth;
        lastWindowHeight = window.innerHeight;
    },
    minimize: function() {
        CommunityWidget.hideTooltip();
        addClass('wcm_chat', 'wcm_button_hidden');
        cur.expanded = 0;

        cur.Rpc.callMethod('minimize');
        setTimeout(function() {
            removeClass('wcm_button', 'wcm_button_hidden');
        }, 120);
    },
    onWinClick: function() {
        if (cur.expanded) {
            this.markAsRead();
        }
    },
    markAsRead: function() {
        removeClass(geByClass1('wcm_head'), 'wcm_head_animate');

        if (this.unreadMessages.length == 0) {
            return;
        }

        cur.newMessagesNum = 0;

        for (var i in this.unreadMessages) {
            this.onReadMessage(this.unreadMessages[i]);
        }

        this.counters.inbox = intval(this.unreadMessages[this.unreadMessages.length - 1]);

        var ids = clone(this.unreadMessages);
        this.unreadMessages = [];
        ajax.post('al_im.php', {
            act: 'a_mark_read',
            peer: -this.groupInfo.id,
            hash: cur.sendHash,
            ids: ids,
        }, {
            onDone: function(res) {

            }
        });

        cur.Rpc.callMethod('resetPageTitle');
    },
    uploadIdent: 0,
    uploadFiles: {},
    mediaInfo: {},
    onChooseFiles: function(type, files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i],
                try_check_file = 0;
            if (type == 'photo') {
                if (file.size > 1024 * 1024 * 25) {
                    return;
                }
                if (!file.type.match(/image\/(jpg|png|gif|jpeg)/i)) {
                    try_check_file = 1;
                }
                file._type = 'photo';
            }
            if (type == 'doc' || try_check_file) {
                file._type = 'doc';
            }
            var ident = ++this.uploadIdent;
            file.ident = ident;
            this.uploadFiles[ident] = {
                file: file,
            };
        }

        for (var i = 0; i < files.length; i++) {
            this.uploadFile(files[i]);
        }

        this.insertUploadInput(type + '_upload_inp');
    },
    uploadFile: function(file) {
        this.renderUploadFilePreview(file);
        var info = CommunityWidget.uploadFiles[file.ident];

        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {
            try {
                var params = eval('(' + xhr.responseText + ')');
            } catch (e) {
                var params = AjaxConvert.fromQueryString(xhr.responseText);
            }

            CommunityWidget.onUploadDone(file, params);
        };
        xhr.upload.onprogress = function(e) {
            var persent = e.loaded / e.total * 100;
            CommunityWidget.onUploadProgress(file, persent);
        };
        xhr.upload.onerror = function() {
            CommunityWidget.onUploadFail(file);
        };
        info.xhr = xhr;

        var formData = new FormData();
        formData.append('file', file);

        switch (file._type) {
            case 'photo':
                var serverUrl = cur.photo_upload_server;
                break;
            case 'doc':
                var serverUrl = cur.doc_upload_server;
                break;
        }

        xhr.open('POST', serverUrl, true);
        xhr.send(formData);
    },
    renderUploadFilePreview: function(file) {
        var cont = '';

        if (ge('upload_file_' + file.ident)) {
            return;
        }

        var wrap = ce('div', {
            className: 'wcm_msg_wrap clear_fix wcm_msg_wrap_unread',
        });

        switch (file._type) {
            case 'photo':
                var reader = new FileReader();
                reader.onloadend = function() {
                    var img = vkImage();
                    img.src = reader.result;
                    img.onload = function() {
                        var size = CommunityWidget.getAttachPhotoSize({
                            width: img.width,
                            height: img.height,
                        });
                        setStyle('upload_file_' + file.ident, {
                            width: size[0] + 'px',
                            height: size[1] + 'px'
                        });
                    };
                    setStyle('upload_file_' + file.ident, 'background-image', 'url(' + reader.result + ')');
                };
                reader.readAsDataURL(file);

                wrap.appendChild(ce('div', {
                    id: 'upload_file_' + file.ident,
                    className: 'wcm_msg wcm_photo_upload_wrap',
                    innerHTML: '\
<div class="wcm_photo_upload_progress">\
  <svg width="50" height="50">\
    <g class="g-circles"  fill="none" stroke-width="3">\
      <circle r="22" cx="25" cy="25" style="stroke-dasharray: 139;stroke-opacity: 0.5;"/>\
      <circle r="22" cx="25" cy="25" style="stroke-dasharray: 0, 139;" id="upload_progress_' + file.ident + '"/>\
    </g>\
  </svg>\
</div>\
<div class="wcm_photo_upload_cancel" onclick="CommunityWidget.cancelUpload(' + file.ident + ');"></div>\
<div class="wcm_photo_upload_tools_bg"></div>\
<div class="wcm_photo_uploaded"></div>\
<div class="wcm_photo_upload_fail" onclick="CommunityWidget.uploadRetry(' + file.ident + ');"></div>',
                }));
                addClass(wrap, 'wcm_msg_wrap_uploading');
                break;

            case 'doc':
                var class_name = CommunityWidget.getAttachFileClass(file.type.split('/')[1]);
                wrap.appendChild(ce('div', {
                    id: 'upload_file_' + file.ident,
                    className: 'wcm_msg',
                    innerHTML: '<div class="wcm_attach_item wcm_attach_doc">\
<div class="wcm_attach_doc_ic fl_l ' + class_name + '"></div>\
<div class="wcm_attach_doc_cont">\
  <div class="wcm_attach_doc_title">' + clean(file.name) + '</div>\
  <span class="wcm_doc_upload_retry" onclick="CommunityWidget.uploadRetry(' + file.ident + ');">' + cur.lang.upload_retry + '</span>\
  <div class="clear_fix wcm_doc_progress_inf">\
    <div class="wcm_doc_progress_wrap">\
      <div class="wcm_doc_progress"></div>\
    </div>\
    <div class="wcm_doc_upload_cancel" onclick="CommunityWidget.cancelUpload(' + file.ident + ');"></div>\
  </div>\
</div></div>',
                }));
                break;
        }

        delete cur.noMessagesMode;
        addClass('wcm_example_messages', 'no_display');

        ge('upload_preview').appendChild(wrap);
        this.updateSize();
        this.animateScrollToBottom();
        cur.scrollbar && cur.scrollbar.update(1, 1);
    },
    onUploadFail: function(file) {
        switch (file._type) {
            case 'photo':
                removeClass('upload_file_' + file.ident, 'wcm_photo_upload_wrap_uploaded');
                addClass('upload_file_' + file.ident, 'wcm_photo_upload_wrap_fail');
                break;
            case 'doc':
                addClass('upload_file_' + file.ident, 'wcm_doc_upload_fail');
                break;
        }
    },
    onUploadProgress: function(file, persent) {
        switch (file._type) {
            case 'photo':
                var num = persent * 139 / 100;
                setStyle('upload_progress_' + file.ident, 'stroke-dasharray', num + ', 139');
                break;
            case 'doc':
                setStyle(geByClass1('wcm_doc_progress', 'upload_progress_' + file.ident), 'width', persent + '%');
                break;
        }
    },
    onUploadDone: function(file, params) {
        var info = CommunityWidget.uploadFiles[file.ident];

        switch (file._type) {
            case 'photo':
                addClass('upload_file_' + file.ident, 'wcm_photo_upload_wrap_uploaded');
                var startTime = vkNow() + 2000;

                info.xhr = ajax.post('al_photos.php', extend({
                    act: 'choose_uploaded'
                }, params), {
                    onDone: function(media, data) {
                        if (data.editable.sizes.x) {
                            var photo = data.editable.sizes.x;
                        } else {
                            var photo = data.editable.sizes.m;
                        }
                        CommunityWidget.mediaInfo['photo' + media] = {
                            src: photo[0],
                            width: photo[1],
                            height: photo[2],
                            hash: data.list,
                        };
                        setTimeout(function() {
                            CommunityWidget.cancelUpload(file.ident);
                            CommunityWidget.send({
                                media: 'photo:' + media,
                            });
                        }, Math.max(0, startTime - vkNow()));
                    },
                    onFail: function() {
                        CommunityWidget.onUploadFail(file);
                        return true;
                    }
                });
                break;
            case 'doc':
                addClass('upload_file_' + file.ident, 'wcm_doc_upload_saving');
                info.xhr = ajax.post('/docs.php', extend({
                    act: 'a_save_doc',
                    from: 'choose',
                }, params), {
                    onDone: function(oid, did, data) {
                        var doc_raw = oid + '_' + did;
                        CommunityWidget.mediaInfo['doc' + doc_raw] = {
                            ext: data.ext,
                            size: data.size_str,
                            title: file.name,
                            url: 'https://vk.com' + data.href,
                        };
                        CommunityWidget.cancelUpload(file.ident);
                        CommunityWidget.send({
                            media: 'doc:' + doc_raw,
                        });
                    },
                    onFail: function(err_msg) {
                        CommunityWidget.showError(err_msg);
                        CommunityWidget.onUploadFail(file);
                        return true;
                    }
                });
                break;
        }
    },
    cancelUpload: function(ident) {
        var info = this.uploadFiles[ident];
        info.canceled = 1;
        re(ge('upload_file_' + ident).parentNode);
        cur.scrollbar.update(1, 1);

        try {
            info.xhr.abort();
        } catch (e) {}

        CommunityWidget.updateSize();
        CommunityWidget.scrollToBottom();
    },
    uploadRetry: function(ident) {
        var info = this.uploadFiles[ident];
        switch (info.file._type) {
            case 'photo':
                removeClass('upload_file_' + ident, 'wcm_photo_upload_wrap_fail');
                break;
            case 'doc':
                removeClass('upload_file_' + ident, 'wcm_doc_upload_fail');
                break;
        }

        this.uploadFile(this.uploadFiles[ident].file);
    },
    animateScrollToBottom: function() {
        cur.scrollbar.scrollBottom(0, 200);
    },
    showError: function(text) {
        clearTimeout(cur.errorCloseTimer);

        var err = geByClass1('wcm_error');
        setStyle(err, 'top', (getSize(geByClass1('wcm_head')))[1] + 'px');
        val(err, text);

        cur.errorCloseTimer = setTimeout(function() {
            setStyle(err, 'top', '-' + getSize(err)[1] + 'px');
        }, 4000);
    },
    typing: function() {
        var last_typing = cur.lastTyping || 0,
            now = vkNow();

        if (now - last_typing >= 5000) {
            cur.lastTyping = now;
            ajax.post('al_im.php', {
                act: 'a_activity',
                type: 'typing',
                peer: -this.groupInfo.id,
                hash: cur.sendHash,
            }, {
                onDone: function() {
                    cur.lastTyping = vkNow();
                },
                onFail: function(code) {
                    if (code == 3) {
                        location.reload();
                    }
                    return true;
                }
            });
        }
    },
    override: function() {
        extend(window, {

            showBox: Widgets.showBox({
                'al_photos.php': {
                    'photo_box': true
                },
                'al_video.php': {
                    'video_box': true
                }
            }),

            showReCaptchaBox: Widgets.showReCaptchaBox,

            gotSession: function(session_data) {
                location.reload();
            },

            showPhoto: function(photo, list) {
                showBox('al_photos.php', {
                    act: 'photo_box',
                    photo: photo,
                    list: list,
                    widget_width: 654,
                    community_messages_widget: 1,
                });
                return false;
            },

            showVideo: Widgets.showVideo,

            mentionOver: function() {
                return true;
            },

            mentionClick: function() {
                return true;
            },
        });
    },
    formatDate: function(rawDate) {
        var curDate = new Date(),
            curYear = curDate.getFullYear(),
            curDay = curDate.getDate();

        var date = new Date(rawDate * 1000),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            week = date.getDay();


        var dayDiff = day - curDay;

        if (dayDiff == 0) {
            return cur.lang.today;
        } else if (dayDiff == 1) {
            return cur.lang.yesterday;
        } else if (curYear == year) {
            return day + ' ' + cur.lang.months_of[month] + ', ' + cur.lang.week_days[week];
        } else {
            return day + ' ' + cur.lang.months_of[month] + ' ' + year;
        }
    },
    startConversation: function() {
        addClass(geByClass1('wcm_chat_preview'), 'hide');
        if (!CommunityWidget.groupInfo) {
            return;
        }
        ajax.post('widget_community_messages.php', {
            act: 'start_conversation',
            gid: CommunityWidget.groupInfo.id,
            hash: cur.widgetHash,
        }, {
            onDone: function() {
                CommunityWidget.markAsRead();
            },
        });
        Emoji.editableFocus('send_text', 0, 1);
        CommunityWidget.updateSize();
    },
    checkInfo: function() {
        ajax.post('widget_community_messages.php', {
            act: 'check_info',
            gid: CommunityWidget.groupInfo.id,
        }, {
            onDone: function(info) {
                if (!info.online) {
                    var newUrl = location.protocol + '//' + location.host + location.pathname.replace('//', '/') + location.search;
                    window.location = newUrl + '&shown=' + (cur.expanded ? 1 : 0);
                } else {
                    if (cur.adminsStatus != info.admins_offline) {
                        cur.adminsStatus = info.admins_offline;
                        var el = geByClass1('wcm_offline_offline_info');
                        if (info.admins_offline) {
                            var need_bottom = cur.scrollbar.data.scrollBottom < 20;
                            show(el);

                            if (need_bottom) {
                                setTimeout(function() {
                                    CommunityWidget.scrollToBottom();
                                }, 10);
                            }
                        } else {
                            hide(el);
                        }
                        CommunityWidget.updateSize();
                    }
                }
                setTimeout(CommunityWidget.checkInfo, 8000);
            },
            onFail: function() {
                setTimeout(CommunityWidget.checkInfo, 8000);
            }
        });
    },
    insertUploadInput: function(id) {
        var el = ce('input', {
            type: 'file',
            id: id,
        });
        attr(el, 'size', 10);
        attr(el, 'multiple', 1);
        attr(el, 'onchange', 'CommunityWidget.onChooseFiles(\'' + id.split('_')[0] + '\', this.files);');

        if (id == 'photo_upload_inp') {
            attr(el, 'accept', 'image/jpg,image/jpeg,image/png,image/gif');
        }

        re(id);
        geByClass1('upload_utils_wrap').appendChild(el);
    },
    getSettings: function() {
        ajax.post('widget_community_messages.php', {
            act: 'get_settings',
        }, {
            onDone: function(data) {
                window.emojiStickers = data.emoji_stickers;
            },
        });
    },
    onAuth: function() {
        cur.loggedWithPopup = 1;
        var newUrl = location.protocol + '//' + location.host + location.pathname.replace('//', '/') + location.search;
        window.location = newUrl + '&shown=' + (cur.expanded ? 1 : 0);
    },
    auth: function() {
        Widgets.oauth({
            onClose: CommunityWidget.onAuth.pbind(true)
        });
    },
    onWinResize: function() {
        if (cur.expanded) {
            CommunityWidget.updatePreviewPos();
            cur.noLoggedUpdateButton && cur.noLoggedUpdateButton();

            setStyle('history_scroll', 'width', (320 - 2) + 'px');
            if (!cur.scrollbar) {
                return;
            }
            CommunityWidget.updateSize();
            CommunityWidget.scrollToBottom();
        }
    },
    showTooltip: function() {
        var el = geByClass1('wcm_button_tooltip');
        if (!el) {
            return;
        }

        var size = [el.offsetWidth, el.offsetHeight];
        size[0] += 20 + 15;

        cur.Rpc.callMethod('setTooltipSize', size);
        addClass(el, 'shown');
    },
    hideTooltip: function() {
        clearTimeout(cur.tooltipShowTimer);
        re(geByClass1('wcm_button_tooltip'));
        cur.Rpc.callMethod('setTooltipSize', [0, 0]);
    },
    updateButtonPosition: function(pos) {
        var btn = ge('wcm_button');
        if (pos == 'left') {
            removeClass(btn, 'wcm_button_right');
            addClass(btn, 'wcm_button_left');
        } else {
            removeClass(btn, 'wcm_button_left');
            addClass(btn, 'wcm_button_right');
        }
    },
    playSong: function() {
        var song = ge('song');
        if (!song || !song.paused) {
            return;
        }
        song.currentTime = 0;
        song.play();
    },
    getSourceLink: function() {
        var url = cur.source.link;
        try {
            url = top.location.href;
        } catch (e) {}
        return url;
    },
    setSourceData: function(data) {
        if (!cur.need_user_source) {
            return;
        }
        extend(cur.source, data);
    },
    playShowSound: function() {
        var song = ge('song');
        if (!song || !song.paused) {
            return;
        }
        song.currentTime = 0;
        song.play();
    },
    asVKTT: function(el) {
        showTooltip(el, {
            text: cur.lang.as_vk_tt,
            black: 1,
            shift: [0, 9, 0],
            className: 'wcm_as_vk_tt',
            toup: 1
        });
    },
    showLogoTT: function(el) {
        showTooltip(el, {
            text: cur.lang.logo_tooltip,
            black: 1,
            shift: [1, 9, 18],
            className: 'wcm_as_vk_tt'
        });
    }
};

try {
    stManager.done('api/widgets/community_messages.js');
} catch (e) {}