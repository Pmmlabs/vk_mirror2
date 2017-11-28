if (!window.snNotify) var snNotify = {
    init: function(data) {
        this.queueInfo = data;
        this.tabID = O.now();
        O(window).bind('storage', this.onStorageEvent.bind(this));
        this.tryMasterNum = 0;
        this.checkMaster();
    },
    initMaster: function() {
        this.initWorker();
        this.isMaster = true;

        if (this.tryMasterNum == 0) { // first tab
            for (var i in this.queueInfo.keys) {
                this.addQueueKey(i, this.queueInfo.keys[i]);
            }
        }
        this.checkQueueKeys();

        Notification.requestPermission(function(result) {
            result = result.toLowerCase();
            if (result == 'granted') snNotify.desktopNotifyEnabled = true;
        });

        setInterval(this.checkQueueKeys.bind(this), 10000);
    },
    checkMaster: function() {
        var _s = this;
        _s.sendStorageMsg('check_master', _s.tabID);
        snNotify.checkMasterTimeout = setTimeout(function() {
            debugLog('check master');
            _s.initMaster();
        }, 500);
    },
    startCheckMaster: function() {
        var _s = this;
        this.tryMasterNum++;
        setTimeout(function() {
            _s.checkMaster();
        }, 5000 + O.irand(-100, 100));
    },
    initWorker: function() {
        this.worker = new Worker('/js/snapster/notify_worker.js');
        this.worker.addEventListener('message', this.onWorkerMessage);
        this.worker.addEventListener('error', this.onWorkerError);
    },
    sendStorageMsg: function(type, msg) {
        localStorage.setItem('_chr', JSON.stringify({
            type: type,
            msg: msg,
        }));
    },
    onStorageEvent: function(e) {
        if (e.key == '_chr_keys') {
            return this.checkQueueKeys();
        }
        if (e.key != '_chr') {
            return;
        }
        var data = JSON.parse(e.newValue);
        switch (data.type) {
            case 'check_master':
                if (snNotify.isMaster && parseInt(data.msg) != snNotify.tabID) {
                    this.sendStorageMsg('checked_master', data.msg);
                }
                break;
            case 'checked_master':
                if (!snNotify.isMaster && parseInt(data.msg) == snNotify.tabID) {
                    clearTimeout(snNotify.checkMasterTimeout);
                    this.startCheckMaster();
                }
                break;
            case 'check_keys':
                var need = [];
                for (var i in data.msg) {
                    var qname = data.msg[i];
                    if (this.queueInfo.keys[qname]) {
                        need.push(qname);
                    }
                }
                if (need.length > 0) {
                    this.sendStorageMsg('checked_keys', need);
                }
                break;
            case 'checked_keys':
                if (!this.isMaster) {
                    return;
                }
                for (var i in data.msg) {
                    this.checkedKeys[data.msg[i]] = 1;
                }
                break;
        }
    },
    onWorkerMessage: function(e) {
        var d = e.data;
        switch (d.type) {
            case 'inited':
                snNotify.sendQueueRequest();
                break;
            case 'request_complete':
                snNotify.onRequestComplete(d.events, d.fails, d.keys);
                break;
            case 'released':
                snNotify.sendQueueRequest();
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
            try {
                var event = String(events[i]).split('<!>')[0];
                event = JSON.parse(event);
            } catch (e) {
                var event = false;
            }
            event && this.proccessEvent(event);
        }
    },
    proccessEvent: function(event) {
        switch (event.type) {
            case 'like_photo':
                snNotify.desktopNotify(event);
                break;
            case 'comment_photo':
                snNotify.desktopNotify(event);
                break;
            case 'feedback_action':
                NotifyPad.getNotifyNum();
                break;
            case 'room_photo':
                snNotify.desktopNotify(event);
                roomsList.onNewPhoto(event.room_id, event.web_photo);
                break;
        }
    },
    initRoomEvents: function() {
        if (this.queueInfo.keys.room) {
            snNotify.releaseQueueKey();
        }
    },
    addQueueKey: function(queue_name, key_data) {
        var old_data = this.queueInfo.keys[queue_name];
        if (old_data && old_data.key != key_data.key) {
            this.releaseQueueKey(queue_name);
        }
        this.queueInfo.keys[queue_name] = key_data;
        debugLog('Add queue key', queue_name, key_data);
        this.addKeyToStorage(queue_name, key_data);
    },
    releaseQueueKey: function(queue_name) {
        if (!this.queueInfo.keys[queue_name]) {
            return;
        }
        debugLog('Queue release key', queue_name, this.queueInfo.keys[queue_name]);
        this.sendWorkerMessage('release_key', {
            key_data: this.queueInfo.keys[queue_name],
            queueInfo: this.queueInfo
        });
        delete this.queueInfo.keys[queue_name];
    },
    getQueueKeys: function(qnames) {
        if (!O.isArray(qnames)) {
            qnames = [qnames];
        }
        if (qnames.length == 0) {
            return;
        }
        debugLog('Get queue keys', qnames);
        ServerRequest.send({
            act: 'queue_key',
            qname_list: qnames.join(','),
        }, {
            onDone: function(keys) {
                for (var i in qnames) {
                    var qname = qnames[i];
                    if (keys[qname]) {
                        snNotify.queueInfo.keys[qname] = keys[qname];
                    } else {
                        delete snNotify.queueInfo.keys[qname];
                    }
                }
                snNotify.sendQueueRequest();
            }
        });
    },
    addKeyToStorage: function(qname, data) {
        var cur_keys = JSON.parse(localStorage.getItem('_chr_keys'));
        if (!cur_keys) {
            cur_keys = {};
        }

        if (cur_keys[qname] && cur_keys[qname].key == data.key) {
            return; // no changes
        }

        cur_keys[qname] = data;
        localStorage.setItem('_chr_keys', JSON.stringify(cur_keys));
    },
    checkQueueKeys: function() { // check using keys
        var cur_keys = JSON.parse(localStorage.getItem('_chr_keys')),
            _s = this;
        _s.checkedKeys = {};

        var need_check = Object.keys(cur_keys);
        this.sendStorageMsg('check_keys', need_check);

        clearTimeout(this.checkKeysTimeout);
        this.checkKeysTimeout = setTimeout(function() {
            for (var i in need_check) {
                var key = need_check[i];
                if (!_s.checkedKeys[key] && !_s.queueInfo.keys[key]) {
                    delete cur_keys[key];
                }
            }
            localStorage.setItem('_chr_keys', JSON.stringify(cur_keys));
        }, 1000);
    },
    desktopNotify: function(event) {
        if (!snNotify.desktopNotifyEnabled || event.from_id == me.id) {
            return;
        }

        switch (event.type) {
            case 'room_photo':
                event.alert = langSex(event.sex, 'new_photo_notify').replace('%s', event.first_name + ' ' + event.last_name);
                event.title = lang.new_photo_notify_title;
                if (event.room_id > 0) {
                    event.alert += ' (' + event.room_title + ')';
                }
                break;
        }

        new Notification(event.title, {
            tag: O.now(), //event.type + '_' + event.from_id,
            body: event.alert,
            icon: event.photo_100,
        }).onclick = function() {
            try {
                window.focus();
            } catch (e) {}
            switch (event.type) {
                case 'like_photo':
                    photoView.show('photo' + event.owner_id + '_' + event.photo_id, {
                        forceServer: 1,
                    });
                    break;
                case 'comment_photo':
                case 'room_photo':
                    photoView.show('photo' + event.owner_id + '_' + event.photo_id, {
                        forceServer: 1,
                        comment_id: event.comment_id,
                    });
                    break;
            }
            this.close();
        };
    },
}

try {
    stManager.done('snapster/notify.js');
} catch (e) {}