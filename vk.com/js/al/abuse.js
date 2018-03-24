Abuse = {
    changeReasonDD: [],
    switchSection: function(newSection, event) {
        if (checkEvent(event)) {
            return false;
        }
        hide('ab_pages');
        show('ab_progress');
        var params = clone(cur.options.base_params || {
            0: 'abuse'
        });
        if (newSection != 'all') {
            params = extend(params, {
                section: newSection
            });
        }
        return nav.go(params);
    },
    checkLogMsg: function(msg_id) {
        var pos = indexOf(cur.selMsgs, msg_id),
            row = ge('mess' + msg_id);
        if (!row || cur.deletedRows[msg_id]) return;
        if (pos == -1) {
            if (cur.selMsgs.length >= 100) {
                return false;
            }
            cur.selMsgs.push(msg_id);
            addClass(row, 'im_sel_row');
            removeClass(ge('mess_check' + msg_id), 'im_log_check_on');
            setStyle('ma' + msg_id, {
                visibility: ''
            });
        } else {
            cur.selMsgs.splice(pos, 1);
            removeClass(row, 'im_sel_row');
        }
        val('im_n_marked', getLang('mail_im_X_sel_msgs', cur.selMsgs.length));
        toggle('im_tabs', !cur.selMsgs.length);
        toggle('im_log_controls', cur.selMsgs.length);
    },
    showFullPhoto: function(oid, src, targ) {
        if (cur.photoSrc != src) {
            hide(cur.photo);
            val(cur.photo, '<img class="ab_full_photo" src="' + (cur.photoSrc = src) + '"/>');
        }
        show(cur.photo);
        var pos = getXY(targ);
        setStyle(cur.photo, {
            top: pos[1],
            left: pos[0] - 210
        });
    },
    hideFullPhoto: function() {
        hide(cur.photo);
    },
    initCommon: function() {
        placeholderSetup('ab_search');
        addEvent(ge('ab_search'), 'keydown', function(e) {
            if (e.keyCode != KEY.RETURN) {
                return;
            }
            var v = val(this);
            if (!v) return;
            hide('ab_pages');
            show('ab_progress');
            nav.go({
                0: 'abuse',
                q: v
            });
        });
        bodyNode.insertBefore(cur.photo = ce('div', {
            id: 'ab_full_photo'
        }), ge('page_wrap'));
        cur.destroy.push(re.pbind(cur.photo));

        cur._back = {
            text: getLang('global_back'),
            show: [],
            hide: [Abuse.hideFullPhoto],
            loc: false
        };
        if (window.Pagination && cur.initScrollFn) {
            cur._back.show.push(Pagination.reinit.pbind(false));
            cur._back.hide.push(Pagination.deinit);
        }
    },
    init: function(opts) {
        extend(cur, {
            options: opts,
            checkedActivity: {},
            module: 'abuse',

            pgStart: opts.start,
            pgOffset: opts.offset,
            pgCount: opts.count,
            pgPerPage: opts.per_page,
            pgCont: ge('ab_rows'),
            pgMore: ge('ab_more_link'),
            pgPages: ge('ab_pages'),
            pgMorePrg: ge('ab_more_progress'),
            pgPreload: opts.preload,
            pgUrl: opts.url,
            pgParams: opts.params,
            pgHref: opts.href
        });
        Pagination.init();
        cur.destroy.push(Pagination.deinit);
        Abuse.initCommon();
    },
    initModerators: function(opts) {
        var tableOptions = {
            layout: {
                topControl: '',
                bottomControl: ''
            },
            noControls: 1
        };
        cur.paginatedTable = new PaginatedTable(ge('paginated_table'), tableOptions, opts.table_content);
        Abuse.initCommon();
    },
    initSingle: function(opts) {
        extend(cur, {
            options: opts || {},
            checkedActivity: {},
            module: 'abuse'
        });
        Abuse.initCommon();
    },
}


try {
    stManager.done('abuse.js');
} catch (e) {}