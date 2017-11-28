VideoEmbed = {
    switchTab: function(el, evt) {
        if (evt.button) return true;
        show('ve_hosts_loading');
        if (hasClass(el.parentNode, 've_host_tab')) {
            each(geByClass('ve_host_tab_active', ge('ve_hosts_tabs')), function(i, v) {
                removeClass(v, 've_host_tab_active');
                addClass(v, 've_host_tab');
            });
            removeClass(el.parentNode, 've_host_tab');
            addClass(el.parentNode, 've_host_tab_active');
        } else if (hasClass(el.firstChild, 've_hosts_section_filter')) {
            each(geByClass('ve_hosts_section_filter', ge('ve_hosts_section_filters')), function(i, v) {
                removeClass(v, 'selected');
            });
            addClass(el.firstChild, 'selected');
        }
        return nav.go(el, evt);
    },
    toggleDetails: function(cid) {
        if (isVisible('hidden_details' + cid)) {
            hide('hidden_details' + cid);
        } else {
            show('hidden_details' + cid);
        }
    },
    getPage: function(offset) {
        show('pages_loading_top');
        show('pages_loading_bottom');
        ajax.post('/video_embed', {
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
    setHostStatus: function(cid, status, onDone, sure, comment) {
        var params = {
            act: 'host_set_status',
            host_id: cid,
            status: status
        };
        ajax.post('/video_embed', params, {
            onDone: function(newstatus, message) {
                removeClass('ve_host' + cid, 'status1');
                removeClass('ve_host' + cid, 'status2');
                removeClass('ve_host' + cid, 'status3');
                removeClass('ve_host' + cid, 'status4');
                addClass('ve_host' + cid, 'status' + newstatus);
                if (onDone) {
                    onDone(cid, newstatus);
                }
            }
        });
    },
    updateHostLinks: function(cid, status) {
        var elem = ge('ve_host' + cid + '_status');
        console.log(elem)
        if (status == 1) {
            elem.innerHTML = '���������';
        } else if (status == 2) {
            elem.innerHTML = '���������';
        } else if (status == 3) {
            elem.innerHTML = '������� ���������';
        } else if (status == 4) {
            elem.innerHTML = '��������� � ������';
        }
    },

    setOwnerStatus: function(cid, status, onDone, sure, comment) {
        var params = {
            act: 'owner_set_status',
            owner_id: cid,
            status: status
        };
        ajax.post('/video_embed', params, {
            onDone: function(newstatus, adult_status, message) {
                removeClass('ve_owner' + cid, 'status1');
                removeClass('ve_owner' + cid, 'status2');
                removeClass('ve_owner' + cid, 'status3');
                removeClass('ve_owner' + cid, 'status4');
                addClass('ve_owner' + cid, 'status' + newstatus);
                if (onDone) {
                    onDone(cid, newstatus, adult_status);
                }
            }
        });
    },
    updateOwnerLinks: function(cid, status, adult_status) {
        var elem = ge('ve_owner' + cid + '_status');
        if (status == 1) {
            elem.innerHTML = '���������';
        } else if (status == 2) {
            elem.innerHTML = '���������';
        } else if (status == 3) {
            elem.innerHTML = '������� ���������';
        } else if (status == 4) {
            elem.innerHTML = '��������� � ������';
        }

        var adultElem = ge('ve_owner' + cid + '_adult_status');
        if (adult_status == 1) {
            adultElem.innerHTML = '�������� 18+';
        } else {
            adultElem.innerHTML = '�� �������� 18+';
        }
    },

    _eof: 1
};
try {
    stManager.done('video_embed.js');
} catch (e) {}