var cur = {},
    prevPageUrl = false;

var ServerRequest = {
    send: function(query, opts) {
        if (!opts) {
            opts = {};
        }
        if (opts.box_loader) {
            GlobalLoader.boxLoaderShow();
        }
        if (cur.inviteKey) {
            query.invite_key = cur.inviteKey;
        }
        if (isMob) {
            query.is_mob = 1;
        }
        O.ajax('/snapster-web.php', query).done(function(response) {
            var response = JSON.parse(response);

            if (opts.box_loader) {
                GlobalLoader.boxLoaderHide();
            }

            opts.onEnd && opts.onEnd();

            if (response.failture) {
                ServerRequest.handleFailture(response, opts);
            }

            if (response.success) {
                ServerRequest.handleSuccess(response, opts);
            }

            setTimeout(updateFooter);
            ServerRequest.checkVersion(response);
        }).fail(function(code, errorText) {
            if (opts.box_loader) {
                GlobalLoader.boxLoaderHide();
            }
            ServerRequest.handleFailture({
                error_type: 'ajax_error',
                error_data: {
                    query: query,
                    opts: opts,
                }
            }, opts);
            setTimeout(updateFooter);
        }).progress(function(e) {

        });
        setTimeout(updateFooter);
    },
    checkVersion: function(res) {
        return
        if (_version != res.version) {
            location.reload();
        }
    },
    handleFailture: function(res, opts) {
        if (opts.onFail && opts.onFail(res.error_type, res) === true) {
            return;
        }
        /*
          not_found
          need_login
          reload_page
          need_confirm_email
          need_validate_password
          flood_error
          need_validation - captcha
          assert_votes
          flood_error
        */

        switch (res.error_type) {
            case 'not_found':
                pageWrapMessage({
                    msg: lang.page_not_found,
                    box: opts.pageManager ? 0 : 1,
                });
                break;
            case 'access_error':
                pageWrapMessage({
                    msg: lang.access_error,
                    box: opts.pageManager ? 0 : 1,
                });
                break;
            case 'reload_page':
                window.reload();
                break;
            case 'flood_error':
            case 'need_validation':
                pageWrapMessage({
                    msg: lang.flood_error,
                    box: opts.pageManager ? 0 : 1,
                });
                break;
            case 'need_login':
                offlineActions.initLanding();
                break;
            case 'box_error':
                errorBox(res.error_data.msg);
                break;
            default:
                pageWrapMessage({
                    msg: 'Unknown error',
                    box: opts.pageManager ? 0 : 1,
                });
                break;
        }
    },
    handleSuccess: function(res, opts) {
        if (opts.onDone) {
            opts.onDone(res.response);
        }
    }
};

function pageWrapMessage(opts) {
    if (!opts) {
        opts = {};
    }
    if (opts.box) {
        errorBox(opts.msg);
    } else {
        O('#page_wrap').val(Templates.get('pageWrapMessage', opts.msg));
        setTitle(opts.title ? opts.title : opts.msg);
    }
}

function setTitle(title) {
    title = O.stripHTML(title);
    document.title = O.replaceEntities(title);
}

function setPageContent(content) {
    O('#page_wrap').val(content);
}

var GlobalLoader = {
    start: function() {
        var line = O('.global_loader_line').removeClass('global_loader_line_anim').setStyle({
            opacity: 0,
            width: '0%',
            height: '2px',
        });
        setTimeout(function() {
            line.addClass('global_loader_line_anim').setStyle({
                opacity: 1,
                width: '30%',
            });
            delete line;
        }, 10);
    },
    set: function(val, fast) {
        var persent = Math.max(100, (70 * val / 100) + 30);
        var line = O('.global_loader_line').addClass('global_loader_line_anim').setStyle({
            width: persent + '%',
        });
        if (persent == 100) {
            setTimeout(function() {
                line.setStyle({
                    opacity: 0,
                    height: '0px',
                });
                delete line;
            }, fast ? 0 : 150);
        }
    },
    boxLoaderShow: function() {
        if (!cur.lastBodyScrollTop) {
            cur.lastBodyScrollTop = O(window).scrollTop();
        }
        this.boxLoaderHide();
        this._boxLoaderTimeout = setTimeout(function() {
            O('body').addClass('modal_shown_body');
            O('body').append('<div class="modal_layout" id="global_box_loader"><div class="global_box_loader">' + writeLoader(-1, 50) + '</div></div>');
        }, 200);
    },
    boxLoaderHide: function() {
        clearTimeout(this._boxLoaderTimeout);
        O('#global_box_loader').remove();
        checkRestoreBodyScroll(1);
    },
};

var Templates = {
    get: function(name) { // get(name, param1, param2, ...)
        if (_templates[name]) {

            var params = [];
            for (var i in arguments) {
                if (i > 0) params.push(arguments[i]);
            }

            return _templates[name].apply(false, params);
        } else {
            console.warn('Template', name, 'not found');
            return '';
        }
    },
    _eachHelper: function(fnName, itemExp, object) {
        var res = '';
        for (var i in object) {
            var item = object[i];
            var args = eval(itemExp);
            res += Templates.executeFunctionByName(fnName, args);
        }
        return res;
    },
    executeFunctionByName: function(name, args) {
        var namespaces = name.split('.');
        var func = namespaces.pop();

        var context = window;
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    },
};

var snPagination = {
    set: function(k, v) {
        this.scope[k] = v;
    },
    get: function(k) {
        return this.scope[k];
    },
    loadMore: function() {
        var _s = this;
        if (this.get('startLoadMore') == 1 || !this.get('nextFrom') || !this.isCurrent() || !this.query) {
            return;
        }
        this.set('startLoadMore', 1);
        this.onMoreProgress();

        var query = O.clone(this.query);
        query.start_from = this.get('nextFrom');
        query.more = 1;
        query = this.onMoreQuery(query);

        ServerRequest.send(query, {
            onDone: function(data) {
                _s.set('startLoadMore', 0);
                _s.set('nextFrom', data.next_from);
                if (!_s.isCurrent()) {
                    return;
                }
                _s.onMoreStop(data.next_from ? 0 : 1);
                _s.onMoreDone(data);
                curModal && curModal.update();
            },
            onFail: function() {
                _s.onMoreStop(0);
                _s.set('startLoadMore', 0);
            }
        });
    },
    onMoreQuery: function() {
        return callbackHelper.apply(this, ['onMoreQuery', arguments, 1]);
    },
    onMoreProgress: function() {
        return callbackHelper.apply(this, ['onMoreProgress', arguments]);
    },
    onMoreStop: function() {
        return callbackHelper.apply(this, ['onMoreStop', arguments]);
    },
    onMoreDone: function() {
        return callbackHelper.apply(this, ['onMoreDone', arguments, 1]);
    },
}

window.pageID = 0;
window.curPageObj = false;

function Page(query) {
    return new pageManager(query);
}

function pageManager(query) {

    if (curPageObj) {
        curPageObj.onDestroy();
    }

    // check cache
    var cachedPage = cacheManager.checkPage(query);
    if (cachedPage) {
        cachedPage.restore();
        return cachedPage;
    }

    this.scope = {};
    this.pageID = ++pageID;
    curPageObj = this;

    this.query = query;
    this.load();
    return this;
}
pageManager.prototype = {
    // events
    onInit: function() {
        if (arguments.length > 0) {
            this.onInitCallback = arguments[0];
        }
        this.onInitCallback && this.onInitCallback();
        return this;
    },
    onDone: function(fn) {
        if (O.isFunction(fn)) {
            this.onDoneCallback = fn;
        } else {
            this.onDoneCallback && this.onDoneCallback(O.clone(fn, 1));
            checkPageComponents();
            snCheckMediaUrl();
        }
        return this;
    },
    onFail: function(fn) {
        if (O.isFunction(fn)) {
            this.onFailCallback = fn;
        } else {
            this.onFailCallback && this.onFailCallback(fn);
        }
        return this;
    },
    onDestroy: function() {
        this.lastScrollTop = O(window).scrollTop();
        if (arguments.length > 0) {
            this.onDestroyCallback = arguments[0];
        } else {
            this.onDestroyCallback && this.onDestroyCallback();
        }
        return this;
    },
    onMore: function() {
        if (arguments.length > 0) {
            this.onMoreCallback = arguments[0];
        } else {
            if (this.onMoreCallback) {
                this.onMoreCallback();
            } else {
                this.loadMore();
            }
        }
        return this;
    },
    // methods
    restore: function() {
        if (this.serverResponse) {
            this.onDone(this.serverResponse);
        } else if (this.serverError) {
            this.onFail(this.serverError);
        }
        window.scrollTo(0, cur.needPageBack ? this.lastScrollTop : 0);
        this.pageID = ++window.pageID;
        curPageObj = this;
        if (!cur.needPageBack) {
            this.load(1);
        }
        updateFooter();
        return this;
    },
    clearCache: function() {
        cacheManager.clearPage(this.query);
    },
    load: function(no_loader) {
        var _s = this;
        if (_s.startedRequest || !_s.query) {
            initFooter();
            return _s;
        }
        _s.startedRequest = true;
        !no_loader && GlobalLoader.start();
        ServerRequest.send(this.query, {
            pageManager: 1,
            onDone: function(res) {
                if (_s.pageID == pageID) {
                    _s.onDone(res);
                    GlobalLoader.set(100, no_loader);
                }
                if (!_s.serverResponse) {
                    window.scrollTo(0, 0);
                }
                _s.serverResponse = res;
                if (res.next_from) {
                    _s.set('nextFrom', res.next_from);
                }
                cacheManager.putPage(_s.query, _s);
                _s.startedRequest = false;
                initFooter();
            },
            onFail: function(err) {
                _s.startedRequest = false;
                if (_s.pageID != pageID) {
                    return;
                }
                GlobalLoader.set(100, no_loader);
                _s.serverError = err;
                _s.onFail(err);
                initFooter();
            }
        });
        return this;
    },
    serverResExtend: function(key, val) {
        Array.prototype.push.apply(this.serverResponse[key], val);
    },
    opts: function(name, value) {
        if (arguments.length == 1) {
            if (this._opts && this._opts[name]) {
                return this._opts[name];
            } else {
                return null;
            }
        } else {
            if (!this._opts) {
                this._opts = {};
            }
            this._opts[name] = value;
        }
        return this;
    },
    isCurrent: function() {
        if (this.pageID == window.pageID) {
            return true;
        }
        return false;
    },
};
pageManager.prototype = O.extend(pageManager.prototype, snPagination);

var cacheManager = {
    cachedPages: {},
    modifyQuery: function(query) {
        var key = [];
        for (var i in query) {
            key.push(i + '_' + encodeURIComponent(query[i]));
        }
        return key.join('_');
    },
    checkPage: function(query) {
        query = this.modifyQuery(query);
        if (this.cachedPages[query]) {
            return this.cachedPages[query];
        }
        return false;
    },
    putPage: function(query, object) {
        this.cachedPages[this.modifyQuery(query)] = object;
    },
    clearPage: function(query) {
        delete this.cachedPages[this.modifyQuery(query)];
    },
    putData: function(name, data) {
        if (!cur.cachedData) {
            cur.cachedData = {};
        }
        cur.cachedData[name] = data;
    },
    getData: function(name) {
        if (cur.cachedData && cur.cachedData[name]) {
            return cur.cachedData[name];
        }
        return false;
    },
    clearData: function(name) {
        if (cur.cachedData) {
            delete cur.cachedData[name];
        }
    }
};

function roomFieldsForUser(info) {
    info.title = O.clean(info.first_name + ' ' + info.last_name);
    info.cover_src = info.photo_100.indexOf('images') == -1 ? info.photo_100 : 0;
    info.domain = info.domain ? info.domain : 'room-' + info.id;

    return info;
}

function getRoomCover(room) {
    if (room.cover_src) {
        return {
            background: 'background-image: url(' + room.cover_src + ');',
            symbol: ''
        };
    } else {
        var colors = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4DD0E1', '#4FC3F7', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F', '#E0E0E0', '#90A4AE'];
        var index = Math.abs(room.id) % colors.length;
        return {
            background: 'background-color: ' + colors[index] + ';',
            symbol: String(room.title).substr(0, 1)
        };
    }
}

function prepareUsersRooms(rooms, profiles) {
    for (var i in rooms) {
        if (rooms[i].id < 0) {
            var user = profiles[-rooms[i].id];
            if (user) {
                rooms[i].title = user.first_name + ' ' + user.last_name;
                if (user.photo_100.indexOf('images') == -1) {
                    rooms[i].cover_src = user.photo_100;
                } else {
                    rooms[i].cover_src = 0;
                }
            } else {
                debugLog('bad user', rooms[i].id);
            }
        }
    }
    return rooms;
}

function getDateText(time) {
    var diff = parseInt(Date.now() / 1000) - time,
        timeText = '';

    if (diff < 5) {
        timeText = lang.date_just_now;
    } else if (diff < 60) {
        timeText = langNumeric(diff, lang.date_seconds);
    } else if (diff < 3600) {
        timeText = langNumeric(O.intval(diff / 60), lang.date_minutes);
    } else if (diff < 4 * 3600) {
        timeText = langNumeric(O.intval(diff / 3600), lang.date_hours);
    } else {
        var date = new Date();
        var curYear = date.getFullYear();
        var curMonth = date.getMonth();

        var d = new Date(time * 1000);
        var year = d.getFullYear();
        var month = d.getMonth();

        var months = [lang.month0, lang.month1, lang.month2, lang.month3, lang.month5, lang.month6, lang.month7, lang.month8, lang.month9, lang.month10, lang.month11, lang.month12];

        timeText = d.getDate() + ' ' + months[month];
        if (year != curYear) {
            timeText += ' ' + year;
        }
    }
    return timeText;
}

function writeLoader(wrap, width) {
    if (!width) width = 15;

    var html = '<div class="sn_loader" style="width: ' + width + 'px;">\
    <svg class="sn_loader_circular" viewBox="25 25 50 50">\
      <circle class="sn_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" />\
    </div>\
  </div>';
    if (wrap == -1) return html;
    wrap = O(wrap);
    wrap.attr('data-old-str', O.stripHTML(wrap.val())).val(html).addClass('sn_loader_wrap');
}

function destroyLoader(wrap, no_fix_h) {
    wrap = O(wrap);
    if (!no_fix_h) {
        wrap.setStyle('height', wrap.size()[1] + 'px');
    } else {
        wrap.setStyle('height', 'auto');
    }
    wrap.val(O.stripHTML(wrap.attr('data-old-str'))).removeAttr('data-old-str').removeClass('sn_loader_wrap');
}

function langNumeric(number, titles, no_number) {
    if (me.lang == 3) {
        if (number > 1) {
            var str = titles[1];
        } else {
            var str = titles[0];
        }
    } else {
        var cases = [2, 0, 1, 1, 1, 2];
        var str = titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    if (no_number) {
        number = '';
    }

    return String(str).replace('%s', number);
}

function langSex(gender, key) {
    return lang[key][gender == 1 ? 1 : 0];
}

function initPageEvents() {
    O(window)
        .bind('click', onPageClick)
        .bind('resize', onWinResize)
        .bind('scroll', onWinScroll)
        .bind('popstate', onPopState)
        .bind('keydown', onKeyDown);
}

function onPageClick(e) {
    if (window.isExport) {
        return
    }
    var link = e.target.tagName == 'A' ? e.target : false;
    if (!link) {
        link = O(e.target).parent('a');
    } else {
        link = O(link);
    }
    var href = link.attr('href');
    if (e.which == 2) {
        return;
    }
    if (link.count() > 0 && !link.attr('target') && !link.attr('no-active') && hasSnapsterLink(href)) {
        O.cancelEvent(e);
        href = href.replace(/^https?:\/\/(([a-zA-Z\-]+)\.)?snapster\.io/, '');
        return goPage(href, {
            back: parseInt(link.attr('data-back')) == 1 ? 1 : 0,
        });
    }

    if (cur.viewPhoto && e.target.id != 'pw_descr_full' && !O(e.target).parent('.sn_pw_descr_wrap').count()) {
        photoView.hideFullDescr();
    }

    if (NotifyPad.shown && e.target.id != 'notfiy_pad_scroll' && !O(e.target).parent('#notfiy_pad_scroll').count() && !O(e.target).parent('.sn_notify_btn').count()) {
        NotifyPad.hidePad();
    }
}

function goPage(href, opts) {
    prevPageUrl = cleanDomain(location.href);
    history.pushState({
        h: href
    }, false, href);
    return pageRoute(href, opts);
}

function onWinResize() {
    if (isMob) {
        return;
    }
    var cont = O('.site_cont'),
        contW = cont.size()[0];
    cont.setStyle('margin-left', Math.max(30, (window.innerWidth - contW) / 2) + 'px');

    if (cur.pwLayout && cur.pwLayout.isCurrent()) {
        photoView.updateSize();
    } else if (curModal) {
        curModal.update();
    }

    updateFooter();
}

function checkPageComponents() {
    if (isMob) {
        return;
    }
    cur.lastScrollTop = 0;

    cur.roomPanel = O('.left_block_cont');
    if (!cur.roomPanel.count()) {
        delete cur.roomPanel;
    } else {
        cur.roomPanelDefTop = parseInt(cur.roomPanel.getStyle('top').replace('px', '')) + 15;
        cur.lastPanelTop = 0;
        cur.roomPanelNeedDiff = parseInt(cur.roomPanel.attr('data-top-diff'));
    }

    cur.rightBlock = O('.right_block_cont');
    if (!cur.rightBlock.count()) {
        delete cur.rightBlock;
    } else {
        cur.roomRightBlockDefTop = parseInt(cur.rightBlock.getStyle('top').replace('px', '')) + 15;
        cur.lastRightBlockTop = 0;
    }

    cur.headHeight = headerObject.size()[1];
    updateHeadPos(-window.scrollY);

    onWinScroll();
}

function updateHeadPos(st) {
    var headTop = Math.min(0, Math.max(-cur.headHeight, st)),
        st = window.scrollY;

    if (NotifyPad.shown || Search.shown || siteHeader.tipShown) {
        headTop = 0;
    }

    if (st < cur.headHeight) { // safari bugfix
        headTop = Math.min(0, cur.headHeight - st);
    }

    if (headTop == cur.headTop) {
        return;
    }

    cur.headTop = headTop;
    headerObject.setStyle('top', headTop + 'px');
}

function onWinScroll(e) {
    if (window.isExport) {
        return
    }
    var st = window.scrollY,
        wh = window.innerHeight,
        docH = O(document).size()[1];

    var scrollDiff = st - cur.lastScrollTop;

    if (O(document).size()[1] - st <= wh * 2.5) {
        curPageObj && curPageObj.onMore();
    }

    if (!isMob) {
        updateHeadPos(cur.headTop - scrollDiff);

        if (cur.roomPanel || cur.rightBlock) {
            var footerH = O('.footer').height();
            var pageDiff = Math.max(0, st + wh + footerH - docH);
        }
        if (cur.roomPanel) {
            var panelH = cur.roomPanel.size()[1],
                panelTop = Math.max(-cur.headTop, Math.min(cur.lastPanelTop + scrollDiff, -(wh - panelH - cur.roomPanelDefTop - pageDiff)));

            if (cur.roomPanelNeedDiff) {
                panelTop += Math.min(cur.roomPanelNeedDiff, st);
            }

            if (cur.lastPanelTop != panelTop) {
                cur.roomPanel.setStyle('margin-top', -panelTop + 'px');
                cur.lastPanelTop = panelTop;
            }
        }

        if (cur.rightBlock) {
            var rightBlockH = cur.rightBlock.size()[1],
                rightBlockTop = Math.max(-cur.headTop, Math.min(cur.lastRightBlockTop + scrollDiff, -(wh - rightBlockH - cur.roomRightBlockDefTop - pageDiff)));

            if (cur.lastRightBlockTop != rightBlockTop) {
                cur.rightBlock.setStyle('margin-top', -rightBlockTop + 'px');
                cur.lastRightBlockTop = rightBlockTop;
            }
        }
    }

    cur.lastScrollTop = st;
}

function onPopState(e) {
    O.cancelEvent(e);
    pageRoute(false, {
        back: 1,
    });
}

var KEY = {
    ESC: 27,
    NEXT: 39,
    PREV: 37,
    SPACE: 32,
    ENTER: 13,
}

function onKeyDown(e) {
    if ((O.inArray(e.target.tagName, ['TEXTAREA', 'INPUT']) || O(e.target).attr('contenteditable')) && O(e.target).val()) {
        return;
    }
    switch (e.keyCode) {
        case KEY.ESC:
            curModal && !curModal.disabledClose && curModal.close();
            break;
        case KEY.NEXT:
        case KEY.SPACE:
            cur.viewPhoto && photoView.next();
            break;
        case KEY.PREV:
            cur.viewPhoto && photoView.prev();
            break;
    }
}

function snCheckMediaUrl() {
    var photo = location.href.match(/(photo|z|video)(\=)?([0-9\-\_]+)/i);
    if (photo) {

        if (cur.viewPhoto == photo[0]) {
            return;
        }

        var comment_id = location.href.match(/comment_id\=([0-9\-\_]+)/i);
        if (comment_id) {
            comment_id = comment_id[1];
        } else {
            comment_id = 0;
        }
        photoView.show(photo[0], {
            no_sh_link: 1,
            comment_id: comment_id
        });
        return 1;
    }
    return 0;
}

function hasSnapsterLink(link) {
    if (link.substr(0, 1) == '/') {
        return true;
    }
    return (link || '').match(/^https?:\/\/(([a-zA-Z\-]+)\.)?snapster\.io/);
}

function cleanDomain(lnk) {
    return (lnk || '').replace(/^https?:\/\/(([a-zA-Z\-]+)\.)?snapster\.io/, '');
}

function pageRoute(lnk, opts) {
    if (!opts) {
        opts = {};
    }
    if (!lnk) {
        lnk = location.href;
    }

    siteHeader.userOut(isMob ? '.head_menu_ic' : '.head_user', 1);

    var lnk_data = parseUrl(lnk);

    destroyModals();
    NotifyPad.hidePad();

    cur = {};
    if (!opts.noCleanSearch) {
        Search.clean(0, 1);
    }

    if (opts.back) {
        cur.needPageBack = 1;
    }

    var path = lnk_data.path_items[0];

    if (isMob) {
        if (O.inArray(path, ['search', 'invitations'])) {
            return mobilePages.openInApp(lnk_data.url);
        }
    }
    if (!path && lnk_data.query && lnk_data.query_items.act) {
        path = lnk_data.query_items.act;
        if (path === 'team') {
            path = 'about';
        }
    }

    window.isExport = false
    switch (path) {
        case '':
            if (lnk_data.hash) {
                Search.hashTagInit(lnk_data.hash);
                break;
            }
        case 'rooms':
            if (me.logged) {
                roomsList.init();
            } else {
                offlineActions.initLanding();
            }
            break;
        case 'search':
            Search.init();
            break;
        case 'invitations':
            roomsList.init('invitations');
            break;
        case 'vkauth':
            offlineActions.initVkAuth();
            break;
        case 'dl':
            var app = lnk_data.path_items[1];
            switch (app) {
                case 'android':
                case 'ios':
                    location.href = config[app + '_link'];
                    break;
                default:
                    goPage('/rooms');
                    break;
            }
            break;
        case 'logout':
            offlineActions.logout();
            break;
        case 'about':
            otherPages.initAbout();
            break;
        case 'terms':
            otherPages.initTerms();
            break;
        case 'privacy':
            otherPages.initPrivacy();
            break;
        case 'licenses':
            otherPages.initLicenses();
            break;
            /*case 'explore':
              roomsList.init('explore');
              break;*/
        case 'error_page':
            error_page_var.test = 1;
            break;
        case 'export':
            window.isExport = true
            exportPhotos.init()
            break;
        case 'vk':
        default:
            var is_vk = path === 'vk' ? 1 : 0;
            roomView.init(lnk_data.url, {
                is_vk: is_vk,
            });
            break;
    }

    if (!window.isExport) {
        exportPhotos.deinit();
    }

}

function showBox(opts) {

    var modal_opts = {
        width: opts.width ? parseInt(String(opts.width).replace('px', '')) : 600,
        content: opts.content,
        header: {
            title: opts.title,
            tabs: opts.tabs ? opts.tabs : false,
        },
        server: opts.server,
        resultClass: opts.resultClass,
        footerClass: opts.footerClass,
    };
    return new Modal(modal_opts);
}

function errorBox(msg) {
    if (cur.errorModalShown) {
        return;
    }
    cur.errorModalShown = 1;
    return showBox({
        title: lang.error_title,
        content: msg,
        width: 450,
        resultClass: 'modal_error',
        footerClass: 'modal_footer_right',
    }).addButton(lang.close, 'curModal.close()').onClose(function() {
        cur.errorModalShown = 0;
    });
}

function createLayout(opts) {
    return new Modal(opts);
}

var _modalHelper = {},
    _modalI = 0,
    curModal;

function destroyModals() {
    for (var i in _modalHelper) {
        _modalHelper[i] && _modalHelper[i].close();
        delete _modalHelper[i];
    }
    _modalHelper = {};
    _modalI = 0;
    delete curModal;
}

function Modal(opts) {

    if (!opts) {
        opts = {};
    }

    this.id = ++_modalI;
    _modalHelper[this.id] = this;

    this.opts = opts;
    this.width = opts.width;
    curModal = this;

    this.scope = {};

    if (opts.disabledClose) {
        this.disabledClose = 1;
    }

    if (!cur.lastBodyScrollTop) {
        cur.lastBodyScrollTop = O(window).scrollTop();
    }

    this.server = opts.server || {
        query: {}
    };
    this.init();
    if (opts.server) {
        this.getServerData(opts.server);
    }

    return this;
}
Modal.prototype = {
    isCurrent: function() {
        if (this.id == curModal.id) {
            return 1;
        }
        return 0;
    },
    init: function() {
        if (this.inited) {
            return;
        }

        this.inited = 1;
        this.createLayout();

        if (this.opts.content) {
            this.setContent(this.opts.content);
        }
        if (this.opts.header) {
            this.setHeader(this.opts.header);
        }
        if (this.opts.onClose) {
            this.onClose(this.opts.onClose);
        }

        O('body').addClass('modal_shown_body');
        this.updatePos();
    },
    clearCache: function() {
        cacheManager.clearData(this.serverCacheKey);
    },
    getServerData: function(server, opts) {
        var _s = this;

        if (!opts) {
            opts = {};
        }

        if (this.get('startServerLoad') == 1) {
            return;
        }
        this.set('startServerLoad', 1);

        if (!opts.tab || !opts.tab_switch) {
            this.layout.addClass('box_loading');
        }

        this.query = server.query;

        if (server.cache_key && cacheManager.getData(server.cache_key)) {
            this.serverCacheKey = server.cache_key;
            setTimeout(function() {
                _s.layout.removeClass('box_loading');
                _s.onServerDone(cacheManager.getData(server.cache_key));
                curModal && curModal.update();
            }, 1);
        } else if (opts.tab) {
            opts.tab.wrap && O(opts.tab.wrap).val('<div class="modal_loader">' + writeLoader(-1, 50) + '</div>');
        }

        ServerRequest.send(server.query, {
            box_loader: (this.serverCacheKey || opts.tab && opts.tab_switch) ? 0 : 1,
            onDone: function(res) {
                _s.set('startServerLoad', 0);
                _s.layout.removeClass('box_loading');
                _s.set('nextFrom', res.next_from);
                _s.set('startLoadMore', 0);
                _s.onServerDone(res);
                cacheManager.putData(server.cache_key, res);
                curModal && curModal.update();
            },
            onFail: function() {
                _s.set('startServerLoad', 0);
                _s.set('startLoadMore', 0);
            }
        });
    },
    onServerDone: function() {
        if (O.isFunction(arguments[0])) {
            this.onServerDoneCallback = arguments[0];
        } else {
            this.init();
            this.onServerDoneCallback && this.onServerDoneCallback(arguments[0]);
            this.update();
        }
        return this;
    },
    createLayout: function() {
        O('#layout_wrap').append(Templates.get('modalLayout', this.id));

        this.layout = O('#modal_' + this.id);
        this.cont = O('#modal_' + this.id + '_cont');
        this.result = this.cont.children('.modal_cont_result');

        if (this.opts.layoutClass) {
            this.layout.addClass(this.opts.layoutClass);
        }
        if (this.opts.resultClass) {
            this.result.addClass(this.opts.resultClass);
        }
        if (this.opts.contClass) {
            this.cont.addClass(this.opts.contClass);
        }
        if (this.opts.footerClass) {
            O('#modal_' + this.id + '_footer_wrap').addClass(this.opts.footerClass);
        }

        if (this.width) {
            this.cont.setStyle('width', this.width + 'px');
        }
        var _s = this;
        this.layout.bind('scroll', function() {
            _s.updateHeaderPos();
        });
    },
    updatePos: function() {
        if (!this.layout || isMob) {
            return;
        }
        var contH = this.cont.size()[1],
            wh = window.innerHeight,
            mTop = Math.max(15, (wh - contH) / 2);

        this.mTop = mTop;
        this.contH = this.cont.height();
        this.cont.setStyle('margin-top', mTop + 'px');
    },
    updateHeaderPos: function() {
        if (!this.layout || isMob) {
            return;
        }
        var st = this.layout.scrollTop(),
            wh = window.innerHeight;

        if (this.layout[0].scrollHeight - st <= window.innerHeight * 2) {
            this.onMore();
        }

        if (this.opts.fixFooter) {
            if (st + wh <= this.mTop + this.contH && !this.footerFix) {
                this.footerFix = 1;
                O('#modal_' + this.id + '_footer_wrap').addClass('footer_fix');
            } else if (st + wh > this.mTop + this.contH && this.footerFix) {
                this.footerFix = 0;
                O('#modal_' + this.id + '_footer_wrap').removeClass('footer_fix');
            }
        }

        if (!this.head) {
            return;
        }
        if (st >= this.mTop && !this.headFix) {
            this.headFix = true;
            this.head.addClass('fixed');
        } else if (st < this.mTop && this.headFix) {
            this.headFix = false;
            this.head.removeClass('fixed');
        }
    },
    onMore: function() {
        if (!arguments.length && !this.onMoreCallback) {
            this.loadMore();
            return this;
        }
        return callbackHelper.apply(this, ['onMore', arguments]);
    },
    update: function() {
        this.updatePos();
        this.updateHeaderPos();
    },
    setHeader: function(data) {
        var title = data.title;
        O('#modal_' + this.id + '_head_wrap').val(Templates.get('boxHeader', title, this.id));
        this.head = this.cont.children('.modal_header');
        this.head.setStyle('width', this.cont.size()[0] + 'px');

        // tabs
        if (data.tabs) {
            this.initTabs(data.tabs);
        }

        this.cont.children('.modal_header_helper').setStyle('height', this.head.size()[1] + 'px');
    },
    setContent: function(content) {
        O('#modal_' + this.id + '_cont_result').val(content);
        this.updatePos();
    },
    close: function(e) {
        O.cancelEvent(e);

        this.layout.remove();
        var cur_id = this.id;
        delete _modalHelper[this.id];
        delete this;
        curModal = false;
        this.onClose();

        // check modal queue
        var modal = Object.keys(_modalHelper).pop();
        if (modal == cur_id) {
            modal = Object.keys(_modalHelper).pop();
        }
        if (modal) {
            curModal = _modalHelper[modal];
            if (cur.pwLayout && cur.pwLayout.isCurrent()) {
                photoView.updateSize();
            } else {
                curModal.update();
            }
        }
        checkRestoreBodyScroll();
    },
    onClose: function() {
        if (arguments.length > 0) {
            this.onCloseCallback = arguments[0];
        } else {
            this.onCloseCallback && this.onCloseCallback();
        }
        return this;
    },
    checkClose: function(e) {
        if (this.disabledClose || e.target.id != 'modal_' + this.id) {
            return;
        }
        O.cancelEvent(e);
        this.close();
    },

    // tabs
    // tab fields: id, text, onShow (show callback), wrap (content wrapper)
    initTabs: function(tabs) {

        this.head.children('.modal_header_title').addClass('no_display');

        var result = '';
        this.tabs = {};
        this.onChange = tabs.onChange;
        for (var i in tabs.items) {
            var tab = tabs.items[i];
            this.tabs[tab.id] = tab;
            result += Templates.get('modalTab', tab, this.id);
        }
        O('#modal_' + this.id + '_tabs_wrap').val(Templates.get('modalTabs', result)).removeClass('no_display');

        this.activeTab = tabs.active ? tabs.active : tabs.items[0].id;
        O('#modal_' + this.id + '_tab_' + this.activeTab).addClass('modal_tab_active');
        this.tabsLine = this.head.children('.modal_tabs_line');
        this.prepareActiveTab(0);
    },
    tabLineToActive: function() {
        var el = O('#modal_' + this.id + '_tab_' + this.activeTab);
        this.tabsLine.setStyle({
            width: el.width() + 'px',
            left: el.position().left + 'px',
        });
    },
    swithcTab: function(id) {
        if (this.activeTab == id) {
            return;
        }
        var oldTab = this.activeTab;
        O('#modal_' + this.id + '_tab_' + oldTab).removeClass('modal_tab_active');
        O('#modal_' + this.id + '_tab_' + id).addClass('modal_tab_active');

        if (this.tabs[oldTab].wrap) {
            O(this.tabs[oldTab].wrap).addClass('no_display');
        }

        this.activeTab = id;
        this.prepareActiveTab(oldTab);
        this.tabs[id].onShow && this.tabs[id].onShow();
        this.onChange && this.onChange(id);
        this.update();
    },
    prepareActiveTab: function(from_switch) {
        var id = this.activeTab,
            tab = this.tabs[id];
        if (tab.wrap) {
            O(tab.wrap).removeClass('no_display');
        }
        this.tabLineToActive();

        if (tab.server) {
            if (from_switch) {
                this.set('tab' + from_switch + '_nextFrom', this.get('nextFrom'));
            }
            this.query = O.extend(this.server.query, tab.server_query || {});
            this.set('nextFrom', this.get('tab' + id + '_nextFrom') || 0);
            if (this.get('tab_inited' + id) == 1) {
                this.set('startLoadMore', 0);
                return;
            }
            this.set('startLoadMore', 1);
            this.set('tab_inited' + id, 1);
            this.getServerData({
                query: this.query,
                cache_key: 'tab_' + id
            }, {
                tab: tab,
                tab_switch: from_switch,
            });
        } else {
            this.query = false;
        }
    },

    // buttons
    addButton: function(text, callback, opts) {
        if (!opts) {
            opts = {};
        }

        if (opts.inline) {
            var className = 'button_inline';
        } else {
            var className = 'button_fill';
        }
        var btn = O('<div/>').addClass('button ' + className).val(text);
        if (O.isFunction(callback)) {
            btn.bind('click', callback);
        } else {
            btn.attr('onClick', callback);
        }
        var footerH = O('#modal_' + this.id + '_footer_wrap').append(btn, 0, 1).setStyle('width', this.opts.width + 'px').height();
        O('#modal_' + this.id + '_footer_helper').removeClass('no_display').setStyle('height', footerH + 'px');

        this.update();

        return this;
    },

    setOption: function(opt_name, value) {
        switch (opt_name) {
            case 'fixFooter':
                this.opts.fixFooter = value ? 1 : 0;
                break;
        }
        this.update();
        return this;
    },
    disableClose: function() {
        this.disabledClose = 1;
        this.layout.children('.modal_header_close').addClass('no_display');
    },
    enableClose: function() {
        this.disabledClose = 0;
        this.layout.children('.modal_header_close').removeClass('no_display');
    },
    buttonsLoading: function() {
        this.disableClose();
        var footer = this.layout.children('.modal_footer'),
            btn = footer.children('.button_fill'),
            cancel_btn = footer.children('.button_inline');

        buttonLoading(btn);
        cancel_btn.addClass('no_display');
    },
    buttonsLoadingStop: function() {
        this.enableClose();
        var footer = this.layout.children('.modal_footer'),
            btn = footer.children('.button_fill'),
            cancel_btn = footer.children('.button_inline');

        buttonLoadingStop(btn);
        cancel_btn.removeClass('no_display');
    },
    buttonsHide: function() {
        this.layout.children('.modal_footer').addClass('no_display');
    },
    buttonsShow: function() {
        this.layout.children('.modal_footer').removeClass('no_display');
    },
};
Modal.prototype = O.extend(Modal.prototype, snPagination);

function formatNumber(number) {
    if (!number) {
        return 0;
    }
    number = String(number).split('');
    var res = [];
    while (number.length) {
        res.unshift(number.splice(-3).join(''));
    }
    return res.join(' ');
}

function formatNumberShort(number) {
    if (!number) {
        return 0;
    }
    var sub = '';
    if (number >= 1000 && number < 100000) {
        number = parseFloat(number / 1000).toFixed(1);
        sub = 'k';
    } else if (number >= 100000 && number < 1000000) {
        number = parseFloat(number / 100000).toFixed(1);
        sub = 'kk';
    } else if (number >= 1000000) {
        number = parseFloat(number / 1000000).toFixed(1);
        sub = 'kkk';
    }
    var exp = String(number).split('.');
    if (exp[1] == '0') {
        number = exp[0];
    }
    return number + sub;
}


function prepareText(text, opts) {
    if (!opts) {
        opts = {};
    }

    text = O.trim(O.clean(text));
    text = text.replace(/&lt;&lt;/g, '�').replace(/&gt;&gt;/g, '�').replace(/ \-\-/g, ' �').replace(/\-\- /g, '� ');
    text = text.replace(/\[([a-z0-9]+)\|([^\]]+)\]/g, function() {
        var adres = arguments[1];
        if (adres.match(/^id(\d+)$/)) {
            var href = '/room-' + adres.substr(2);
        } else {
            var href = '/vk/' + adres;
        }
        return '<a href="' + href + '" target="_blank">' + arguments[2] + '</a>';
    });
    text = text.replace(/\n{2,}/, '\n').replace(/\n/g, '<div class="line_spliter"></div>');

    text = text.replace(/\&amp\;/g, '&');
    text = Emoji.emojiToHTML(text, 1);

    if (!opts.no_links) {
        text = text.replace(/(^|[^A-Za-z0-9�-��-���\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9�-��-���](?:[A-Za-z\$0-9\-\_�-��-���]*[A-Za-z\$0-9�-��-���])?\.){1,5}[A-Za-z\$������������������������\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9�-��-���\-\_#%?+\/\$.~=;:]+|\[[A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9�-��-���\-\_#%?+\/\$.~=;:]*[A-Za-z0-9�-��-���\_#%?+\/\$~=]|\[[A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9�-��-���\-\_#%?+\/\$.,~=;:]*\)))?)?)/ig, function() {
            var matches = Array.prototype.slice.apply(arguments),
                prefix = matches[1] || '',
                protocol = matches[2] || 'http://',
                domain = matches[3] || '',
                url = domain + (matches[4] || ''),
                full = (matches[2] || '') + matches[3] + matches[4];

            if (domain.indexOf('.') == -1 || domain.indexOf('..') != -1) return matches[0];

            var topDomain = domain.split('.').pop();
            if (topDomain.length > 7 || O.indexOf('place,camera,info,name,academy,aero,arpa,coop,media,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,��,���,����,������,���,cat,pro,local'.split(','), topDomain) == -1) {
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
            full = O.clean(full).replace(/&amp;/g, '&');

            if (domain.match(/^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me|([a-zA-Z0-9\-]\.)?snapster\.io)$/)) {
                url = O.replaceEntities(url).replace(/([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, encodeURIComponent);
                if (domain.indexOf('snaspter.io')) {
                    var target = '';
                } else {
                    var target = 'target="_blank"';
                }
                return prefix + '<a class="sn_link" href="' + (protocol + url).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" ' + target + '>' + full + '</a>';
            }

            return prefix + '<a class="sn_link" href="/away.php?utf=1&to=' + encodeURIComponent(protocol + O.replaceEntities(url)) + '" target="_blank">' + full + '</a>';
        });
        text = text.replace(/\#[\w_\.\u0400-\u04FF]+/ig, function(hashtag) {
            return '<a href="https://' + document.domain + '/' + hashtag + '" target="_blank">' + hashtag + '</a>';
        });
    }

    return text;
}

function checkRestoreBodyScroll(no_release_scroll) {
    if (O('#layout_wrap div').count() == 0) {
        O('body').removeClass('modal_shown_body');
        O(window).scrollTop(cur.lastBodyScrollTop);
        if (!no_release_scroll) {
            cur.lastBodyScrollTop = 0;
        }
    }
}

function Scrollbar(el, opts) {
    el = O(el);

    if (!opts) {
        opts = {};
    }
    this.onScroll = opts.onScroll;

    el.scrollTop(0).setStyle('overflow', 'hidden').insertBefore('<div class="sn_scroll_slider_wrap"><div class="sn_scroll_slider"></div></div>');

    var parent = el.parent().addClass('sn_scroll_wrap');
    this.slider_wrap = parent.children('.sn_scroll_slider_wrap').bind('mousedown', this.sliderDown.bind(this))
    this.slider = this.slider_wrap.children('.sn_scroll_slider');

    el.bind('wheel', this.onWheel.bind(this));
    this.slider_wrap.bind('wheel', this.onWheel.bind(this));
    this.el = el;

    this.update();

    return this;
}
Scrollbar.prototype = {
    destroy: function() {
        delete this.slider;
        delete this.el;
        delete this.slider_wrap;
        delete this;
    },
    onWheel: function(e) {
        O.cancelEvent(e);
        this.el.scrollTop(this.el.scrollTop() + e.deltaY);
        this.updateSlider();
    },
    updateSlider: function(no_scroll) {
        if (this.disabled) {
            return;
        }
        var wrap_h = this.el.height(),
            cont_h = this.el.scrollHeight();

        var top = Math.min(1, this.el.scrollTop() / (cont_h - wrap_h)),
            slider_h = Math.max(30, Math.floor(wrap_h * wrap_h / cont_h));

        this.slider_wrap.setStyle('height', this.el.height() + 'px');
        this.slider.setStyle({
            top: Math.max(0, Math.floor((wrap_h - slider_h - 4) * top + 2)) + 'px',
            height: slider_h + 'px',
        });
        this.sliderH = slider_h;

        if (no_scroll) return;
        this.onScroll && this.onScroll();
    },
    sliderDown: function(e) {
        if (this.disabled) {
            return;
        }
        var wrap_h = this.el.height(),
            cont_h = this.el.scrollHeight();

        O.cancelEvent(e);

        if (!O.hasClass(e.target, 'sn_scroll_slider')) {
            this.el.scrollTop(Math.floor((cont_h - wrap_h) * Math.min(1, (e.offsetY - this.sliderH / 2 + 5) / (wrap_h - this.sliderH))));
            this.updateSlider();
        }

        var start_pos = e.pageY,
            pos, _s = this,
            doc = O(window);
        start_pos -= this.slider.position().top;

        function Move(e1) {
            _s.el.scrollTop(Math.floor(
                (cont_h - wrap_h) *
                Math.min(1, (e1.pageY - start_pos) /
                    (wrap_h - _s.sliderH - 6))
            ));
            _s.updateSlider();
        }

        function Up() {
            doc.unbind('mousemove', Move).unbind('mouseup', Up);
        }
        doc.bind('mousemove', Move).bind('mouseup', Up);
    },
    update: function(no_scroll) {
        var wrap_h = this.el.height(),
            cont_h = this.el.scrollHeight();

        if (wrap_h >= cont_h) {
            this.el.parent().addClass('sn_hide_scroll');
            this.disabled = true;
        } else {
            this.disabled = false;
            this.el.parent().removeClass('sn_hide_scroll');
        }

        this.updateSlider(no_scroll);
        if (!no_scroll) {
            this.el.scrollTop(0);
        }
        return this;
    },
    scrollToBottom: function() {
        var _s = this;
        setTimeout(function() {
            _s.el.scrollTop(_s.el.scrollHeight());
            _s.update(1);
        });
        return this;
    },
    scrollTop: function(st) {
        this.el.scrollTop(st);
        this.update(1);
    }
};

function buttonLoading(btn) {
    btn = O(btn);

    btn.addClass('button_loading');
    writeLoader(btn, btn.height());
}

function buttonLoadingStop(btn) {
    btn = O(btn);
    btn.removeClass('button_loading');
    destroyLoader(btn);
}

function snListener() {
    this.items = {};
    this.listeners = [];
    this.listeners_i = 0;
}
snListener.prototype = {
    broadcast: function(id) {
        for (var i in this.listeners) this.listeners[i](id);
    },
    listen: function(fn) {
        this.listeners[++this.listeners_i] = fn;
    },
    unlisten: function(fn) {
        for (var i in this.listeners) {
            if (this.listeners[i] === fn) {
                delete this.listeners[i];
            }
        }
    },
};

function winToUtf(text) {
    if (!text) {
        return '';
    }
    text = text.replace(/&amp;/g, '&');
    return text.replace(/&#(\d\d+);/g, function(s, c) {
        c = O.intval(c);
        return (c >= 32) ? String.fromCharCode(c) : s;
    });
}

function $s(name) {
    if (!cur.scope) {
        cur.scope = {};
    }
    if (!cur.scope[name]) {
        cur.scope[name] = {};
    }
    if (arguments.length > 1) {
        cur.scope[name] = O.extend(cur.scope[name], arguments[1]);
    }
    return cur.scope[name];
}

function $clear(name) {
    if (cur.scope) {
        if (arguments.length > 1) {
            if (cur.scope[name]) {
                delete cur.scope[name][arguments[1]];
            }
        } else {
            delete cur.scope[name];
        }
    }
}

function makeLink(lnk, text, opts) {
    if (!opts) {
        opts = {};
    }
    var lnk_opts = {
        className: opts.className ? opts.className : '',
    };
    return Templates.get('link', lnk, text, lnk_opts);
}

function parseUrl(url) {
    var res = {};

    url = cleanDomain(url);
    res.url = url;

    var exp = url.split('#');
    url = exp[0];

    if (exp[1]) {
        res.hash = exp[1];
        res.hash_items = parseUrlQuery(res.hash);
    }

    exp = url.split('?');
    var pathname = exp[0];
    var query = exp[1];

    if (pathname) {
        if (pathname.substr(0, 1) === '/') {
            pathname = pathname.substr(1);
        }
        res.pathname = pathname;
        res.path_items = pathname.split('/');
    }
    if (query) {
        res.query = query;
        res.query_items = parseUrlQuery(res.query);
    }

    return res;
}

function parseUrlQuery(query) {
    var res = {};
    query = (query || '').split('&');
    for (var i in query) {
        var exp = query[i].split('=');
        res[exp[0]] = exp[1];
    }
    return res;
}

function updateFooter() {
    if (isMob) {
        return;
    }
    var wh = window.innerHeight,
        cont_h = O('#page_wrap').height(),
        head_h = O('.site_header_helper').height(),
        footer = O('.footer'),
        footer_h = footer.height();

    var mtop = Math.max(0, wh - cont_h - head_h - footer_h);
    var panelH = cur.roomPanel ? cur.roomPanel.height() : 0,
        rightH = cur.rightBlock ? cur.rightBlock.height() : 0;

    if (rightH > cont_h || panelH > cont_h) {
        mtop = Math.max(mtop, panelH - head_h - footer_h, rightH - head_h - footer_h);
    }

    footer.setStyle('margin-top', mtop + 'px');
}

function showLoginBox() {
    location.href = '/';
}

function initFooter() {
    if (window.footerInited) {
        return;
    }
    window.footerInited = 1;
    O('.footer').val(Templates.get('footer'));
    updateFooter();
}

function callbackHelper(name, args, need_ret) {
    var fn = args[0];
    if (O.isFunction(fn)) {
        this[name + 'Callback'] = fn;
    } else {
        if (this[name + 'Callback']) {
            var ret = this[name + 'Callback'](fn);
        } else {
            var ret = fn;
        }
        if (need_ret) {
            return ret;
        }
    }
    return this;
}

function debugLog() {
    if (!O.inArray(me.id, [125864255, 66748])) {
        return;
    }
    console.log.apply(console, arguments);
}

function initPage() {
    roomsHub.init();

    window.isRetina = window.devicePixelRatio >= 1.5 ? 1 : 0;
    if (isRetina) {
        O('#favicon').attr('href', '/images/chronicle/favicon_2x.ico');
    }

    if (isMob) {
        O('body').addClass('is_mob');
        O('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
    } else {
        window.headerObject = O('.site_header');
    }
    siteHeader.update();

    O('.site_header').val(Templates.get('header'));

    pageRoute();

    initPageEvents();
    if (!isMob) {
        onWinResize();

        Search.loadPopular();
    }
}