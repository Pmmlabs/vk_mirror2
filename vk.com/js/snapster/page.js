var comments = {
    add: function(e) {
        cancelEvent(e);

        if (vk.id == 0) {
            return snShowLoginBox();
        }

        var el = O('#sn_pw_comm_txt'),
            text = el.val(),
            pid = cur.viewPhoto;

        if (e.ctrlKey || e.metaKey) {
            var pos = el[0].selectionStart;
            if (pos == 0) return;
            if (pos == text.length) el.val(text + '\n');
            else {
                el.val(text.substr(0, pos) + '\n\n' + text.substr(pos));
            }
            pos++;
            el[0].selectionStart = pos;
            el[0].selectionEnd = pos;
            return;
        }

        if (!text.length) {
            return;
        }

        var tmp_id = O.now();
        var comment = cur.commentTpl.replace(/\%cid\%/g, tmp_id)
            .replace('%text%', O.clean(text))
            .replace('%ava%', cur.userAva50)
            .replace('%name%', cur.userName)
            .replace('%domain%', cur.userDomain)
            .replace(/\%from_id\%/g, vk.id)
            .replace(/\%domain\%/g, cur.userDomain)
            .replace('%own_class%', 'comment_owner');

        var photo_data = cur.photosData[cur.viewPhoto];

        O('#sn_pw_comments_result').append(comment);
        photoView.commScrollBottom();

        el.val('').focus();
        if (cur.pwWide) {
            cur.pwReize();
        } else {
            photoView.resizeImage();
        }

        photoView.resizeImage();

        var date_el = O('.comment_date_str', '#comment' + tmp_id);
        writeLoader(date_el[0]);

        var exp = cur.viewPhoto.split('_');
        var query = {
            act: 'add_comment',
            owner_id: exp[0],
            photo_id: exp[1],
            message: text,
            hash: photo_data.comment_hash
        };

        if (cur.replyToID > 0) {
            if (text.substr(0, cur.replyToName.length) == cur.replyToName) {
                query.reply_to = cur.replyToID;
                cur.replyToID = cur.replyToName = false;
            }
        }

        ajax.post('/snapster.php', query, {
            onDone: function(cid, date, hash) {
                date_el.val(date);
                O('#comment' + tmp_id).attr('id', 'comment' + cid)
                    // delete comment but modify
                    .children('.sn_comment_delete')
                    .attr('onclick', 'comments.delete(' + cid + ', event)');

                O('#comment_hash' + tmp_id).val(hash).attr('id', 'comment_hash' + cid);

                comment = comment.replace(tmp_id, cid);

                photo_data.comments += comment;
                photo_data.comments_count++;
                photo_data.loadedComments++;
                comments.updateCommentsNum();

                photoView.resizeImage();
            }
        });
    },
    updateCommentsNum: function() {
        var data = cur.photosData[cur.viewPhoto];
        if (data.comments_count > 0) {
            O('#sn_pw_comments_count').val(langNumeric(data.comments_count, cur.lang.photos_X_comms, 1));
        } else {
            O('#sn_pw_comments_count').val();
        }
    },
    delete: function(id, e) {
        cancelEvent(e);
        O('.comment_cont', '#comment' + id).hide();
        O('.comment_info', '#comment' + id).val('<div class="comment_deleted_info">����������� ������, <a href="/" onClick="comments.restore(' + id + ', event);">������������</a>.</div>');

        var hash = O('#comment_hash' + id).val(),
            photo_data = cur.photosData[cur.viewPhoto];
        ajax.post('snapster.php', {
            act: 'delete_comment',
            pid: cur.viewPhoto,
            cid: id,
            hash: hash
        }, {
            onDone: function(count) {
                photo_data.comments_count = count;
                photo_data.loadedComments--;
                photo_data.comments = O('#sn_pw_comments_result').val();
                comments.updateCommentsNum();

                photoView.resizeImage();
            }
        });
    },
    restore: function(id, e) {
        cancelEvent(e);
        O('.comment_info', '#comment' + id).val('');
        O('.comment_cont', '#comment' + id).show();

        var hash = O('#comment_hash' + id).val(),
            photo_data = cur.photosData[cur.viewPhoto];
        ajax.post('snapster.php', {
            act: 'restore_comment',
            pid: cur.viewPhoto,
            cid: id,
            hash: hash
        }, {
            onDone: function(count) {
                photo_data.comments_count = count;
                photo_data.loadedComments++;
                photo_data.comments = O('#sn_pw_comments_result').val();
                comments.updateCommentsNum();
            }
        });
    },
    loadMore: function() {
        var id = cur.viewPhoto,
            data = cur.photosData[id];

        if (data.startMoreComments) return;
        data.startMoreComments = true;

        var exp = id.split('_');
        var offset = data.loadedComments;

        if (offset >= data.comments_count) {
            return;
        }

        writeLoader('sn_comment_more', 20);
        ajax.post('/snapster.php', {
            act: 'load_comments',
            owner_id: exp[0],
            photo_id: exp[1],
            offset: offset
        }, {
            onDone: function(d, total) {

                data.comments = d + data.comments;
                offset += 15;
                data.loadedComments = offset;

                if (id == cur.viewPhoto) {

                    if (!d) {
                        O('sn_comment_more').remove();
                        return;
                    }

                    var scroll_wr = O('#sn_pw_comments_result'),
                        scrollH = scroll_wr.scrollHeight();

                    scroll_wr.prepend(d);

                    var scrollDiff = scroll_wr.scrollHeight() - scrollH;
                    cur.photoViewScroll.scrollTop(scrollDiff);

                    if (offset < parseInt(total)) {
                        data.startMoreComments = false;
                        O('#sn_comment_more').val(cur.lang.chronicle_show_more_comments);
                    } else {
                        O('#sn_comment_more').remove();
                    }
                }
            }
        });
    },
    loadBeforeComments: function() {
        var id = cur.viewPhoto,
            data = cur.photosData[id];
        if (cur.startLoadBeforeComments) {
            return;
        }
        cur.startLoadBeforeComments = true;

        var btn = O('#comment_before_load_btn');
        if (!btn) {
            return;
        }
        btn.addClass('moreBut_loading');
        writeLoader(btn[0], 33);


        var last_id = O('.comment', '#sn_pw_comments_result').last().attr('id').replace('comment', '');

        var exp = id.split('_');
        ajax.post('snapster.php', {
            act: 'load_comments',
            owner_id: exp[0],
            photo_id: exp[1],
            comment_id: last_id
        }, {
            onDone: function(items, total, items_num, offset, can_before) {
                btn.parent().insertBefore(items);
                if (parseInt(can_before) != 1) {
                    btn.remove();
                } else {
                    cur.startLoadBeforeComments = false;
                    btn.removeClass('moreBut_loading');
                    destroyLoader(btn);
                }
            }
        });
    },
    clickComment: function(el, e) {
        el = O(el);
        var from_id = parseInt(el.attr('data-from'));
        if (from_id == vk.id || e.target.tagName == 'A') {
            return;
        }
        cancelEvent(e);
        var name = O.clean(O('.author_name a', el[0]).val());
        cur.replyToID = parseInt(el.attr('id').replace('comment', ''));
        cur.replyToName = name.split(' ')[0];

        O('#sn_pw_comm_txt').focus().val(cur.replyToName + ', ');
    },
};

var likes = {
    set: function(el, obj, opts) {

        if (vk.id == 0) {
            return snShowLoginBox();
        }

        el = ge(el);

        if (!opts) {
            opts = {};
        }

        var parent = el.parentNode;

        var num_el = ge('likes_num' + obj),
            cnt = parseInt(ge('likes_num_int' + obj).value),
            pref = '',
            exp = obj.split('_');

        if (hasClass(el, 'photo_like_icon_active')) {
            removeClass(el, 'photo_like_icon_active');
            cnt--;
            pref = 'un';
        } else {
            addClass(el, 'photo_like_icon_active');
            cnt++;
        }

        if (cnt <= 0) {
            num_el.innerHTML = '&nbsp;';
        } else {
            if (cnt == 1 && !pref) val(num_el, cnt);
            else animateCount(num_el, cnt);
        }

        ge('likes_num_int' + obj).value = cnt;

        animate('liked_user' + obj + '_' + vk.id, {
            marginLeft: pref == 'un' ? -26 : 6
        }, 200);

        var title = ge('likes_box_title' + obj);
        if (title) {
            title.innerHTML = langNumeric(cnt, cur.lang.chronicle_N_liked);
        }

        if (!opts.noOver) {
            if (parent.tt && parent.tt.show) {
                if (!cnt || cnt < 0) parent.tt.hide({
                    fasthide: 1
                });
                else parent.tt.show();
            } else {
                likes.waiters[obj] = pref == 'un' ? 'unlike' : 'like';
            }
        }

        ajax.post('/snapster.php', {
            act: pref + 'like',
            owner_id: exp[0],
            pid: exp[1],
            hash: el.getAttribute('data-hash')
        }, {
            onDone: function(d) {

            }
        });
    },
    over: function(el, obj) {
        var _l = likes;

        var offsetLeft = window.innerWidth > 750 ? 118 : 5;

        var exp = obj.split('_');
        showTooltip(el, {
            url: 'snapster.php',
            params: {
                act: 'like_users',
                owner_id: exp[0],
                pid: exp[1]
            },
            shift: [offsetLeft, 10, 5],
            slide: 15,
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            className: 'rich like_tt likes_users_bl',
            onShowStart: function(tt) {
                if (!parseInt(ge('likes_num_int' + obj).value)) {
                    tt.hide({
                        fasthide: 1
                    });
                }
            },
        });
    },
    waiters: {},
    update: function(obj, cnt) {
        if (likes.waiters[obj]) {

            var el = ge('liked_user' + obj + '_' + vk.id);
            if (likes.waiters[obj] == 'unlike') {
                animate(el, {
                    marginLeft: -26
                }, 200);
                cnt--;
            } else {
                animate(el, {
                    marginLeft: 6
                }, 200);
                cnt++;
            }

            ge('likes_box_title' + obj).innerHTML = langNumeric(cnt, cur.lang.chronicle_N_liked);
            if (!cnt || cnt < 0) {
                ge('photo_likes_el' + obj).tt.hide({
                    fasthide: 1
                });
            }
        }
    },
    checkDBTouch: function(obj) {
        var now = vkNow();

        if (cur.lastTouchedID == obj && now - cur.lastTouched <= 1000) {
            likes.doubleClick(obj);
            cur.lastTouched = false;
            cur.lastTouchedID = null;
            return;
        }

        cur.lastTouched = now;
        cur.lastTouchedID = obj;
    },
    doubleClick: function(obj) {

        if (vk.id == 0) {
            return snShowLoginBox();
        }

        var el = ge('big_heart' + obj);

        el.innerHTML = '<img src="/images/icons/post_big_hh.png" class="bit_like_icon" width="38" height="34"/>';
        var icon = el.firstChild;
        animate(icon, {
            marginLeft: -3,
            marginTop: 3,
            width: 78,
            height: 71
        }, {
            duration: 100,
            transition: Fx.Transitions.easeOutCubic,
            onComplete: likes.animComplete
        });

        var heart = ge('photo_likes_heart' + obj);
        if (!hasClass(heart, 'photo_like_icon_active')) {
            likes.set(heart, obj, {
                noOver: 1
            });
        }
    },
    animComplete: function() {
        var el = this.el;
        setTimeout(function() {
            animate(el, {
                opacity: 0
            }, {
                duration: 500,
                transition: Fx.Transitions.easeOutCubic
            });
        }, 400);
    }
};

function morePhotos() {
    if (cur.startLoadPhotos || !cur.photosOffset) return;
    cur.startLoadPhotos = true;

    var but = ge('load_more_photos');
    writeLoader(but, 50);
    addClass(but, 'load_more_photos_loading');

    ajax.post('/snapster.php', {
        act: 'room',
        more: 1,
        offset: cur.photosOffset,
        room_id: cur.roomID
    }, {
        onDone: function(d, newOffset, photos_sizes) {
            cur.photosOffset = newOffset;
            if (d) {
                var t = ce('div', {
                        innerHTML: d
                    }),
                    wr = ge('photos_list_res'),
                    first = t.firstChild;
                while (first) {
                    wr.appendChild(first);
                    first = t.firstChild;
                }
                val(but, cur.lang.load_more);
                removeClass(but, 'load_more_photos_loading');

                cur.startLoadPhotos = false;
                if (photos_sizes) {
                    extend(cur.photosSizes, photos_sizes);
                }

                if (!is_mob) {
                    room.assign(geByClass('prepare', 'photos_list_res'));
                }

                room.loadedImage();

                if (!newOffset) {
                    re(but);
                }
            } else {
                re(but);
            }
        }
    });
}

function showAuthorTip(el, opts) {
    showTooltip(el, {
        content: '<div class="tip_author_name">' + opts.name + '</div><div class="tip_author_date">' + opts.date + '</div>',
        shift: [0, 8, 8],
        center: 1,
        noload: 1,
        black: 1,
        className: 'ttb tt_toup author_tip'
    });
}

function docDown(e) {
    if (cur.snBoxShown) {
        var el = e.target,
            close = true;
        while (el) {
            if (el.id == 'sn_modal_wrap') {
                return;
            }
            if (el.id == cur.snBoxShown) {
                close = false;
                break;
            }
            el = el.parentNode;
        }
        if (close) {
            checkCloseBox(e);
        }
    }
    if (cur.shownPwDescr) {
        if (e.target.id != 'sn_pw_descr_cont') {
            photoView.expandDescr(1);
        }
    }
    if (window.snNotify && snNotify.padShown) {
        var el = e.target;
        while (el) {
            if (el.id == 'notify_pad') break;
            el = el.parentNode;
        }
        if (!el || el.id != 'notify_pad') {
            snNotify.hidePad();
        }
    }
}

function docClick(e) {

}

function onWinKeyDown(e) {
    if (e.keyCode == KEY.ESC) {
        if (cur.modalOpened) {
            cancelEvent(e);
            console.log('HERE')
            snModal.close();
        } else if (cur.snBoxShown) {
            checkCloseBox(e);
        }
    }
    if (cur.viewPhoto) {
        photoView.keyDown(e);
    }
}

function checkCloseBox(e) {
    if (cur.snBoxShown == 'search_result') {
        search.hide(e);
    } else if (cur.snBoxShown == 'head_user') {
        removeClass('head_user', 'head_user_active');
        cur.snBoxShown = false;
    } else if (cur.snBoxShown == 'followers_list_wrap') {
        room.closeFollowers();
    } else {
        comments.closeAll(cur.snBoxShown);
    }
}

function onWinResize() {
    if (cur.updateLanding) {
        cur.updateLanding();
    }

    if (window.is_mob) {
        if (window.innerWidth > 750) {
            //snChangeSiteVer();
            is_mob = false;
        }
        return;
    }

    var ww = window.innerWidth,
        wh = window.innerHeight,
        pageH = getSize(bodyNode)[1],
        wrap3 = ge('wrap3');
    if (cur.lastWinWidth != ww) {


        setStyle('sn_footer_helper', 'height', getSize('sn_footer')[1]);

        if (ww < 750) {
            //snChangeSiteVer(1);
            is_mob = true;
            return;
        }

        var w = window.innerWidth;
        if (window.innerHeight < pageH) {
            w -= 15;
        }
        cur.windowW = w;

        if (!vk.loaded) return;


        if (cur.maxWrapWidth == undefined) {
            cur.maxWrapWidth = getSize('head_cont')[0];
        }

        var wrapW = /*Math.min(w - 66, */ cur.maxWrapWidth || 1043; //);
        setStyle(wrap3, {
            width: wrapW,
        });
        setStyle('head_cont', 'width', wrapW);
        setStyle('sn_footer_cont', 'width', wrapW);


        setStyle('sn_page_wrap', 'width', w);
        setStyle(site_head, 'width', w);

        cur.lastWinWidth = ww;
        if (cur.modalOpened) {
            snModal.resize();
        }
    }

    var minH = 0,
        panel = ge('sn_room_info_wrap');
    if (panel) {
        minH = getSize(panel)[1] + 30;
    }

    setStyle(wrap3, 'min-height', Math.max(minH, wh - wrap3.offsetTop - getSize('sn_footer')[1]));

    if (!vk.loaded) return;
    if (cur.lastWinHeight != wh) {
        cur.lastWinHeight = wh;
        if (cur.modalOpened) {
            snModal.resize();
        }
    }

    if (cur.photoShown) {
        setStyle('sn_modal_cont', {
            marginLeft: 'auto'
        });
        cur.photoShown = false;
    }
}

function clickUserLink(el) {
    var parent = el.parentNode;
    if (hasClass(parent, 'logged')) {
        if (hasClass(parent, 'head_user_active')) {
            removeClass(parent, 'head_user_active');
            cur.snBoxShown = false;
        } else {
            addClass(parent, 'head_user_active');
            cur.snBoxShown = 'head_user';
        }
    } else {
        location.href = el.href;
    }
}

function isMob() {
    if (window.innerWidth <= 750) {
        return true;
    } else {
        return false;
    }
}

function snShowLoginBox() {
    var auth_url = 'https://oauth.vk.com/authorize?client_id=3771002&redirect_uri=' + encodeURIComponent('https://snapster.io/vkauth') + '&display=page&response_type=token&v=5.40&revoke=1&scope=offline';
    var cont = '<div class="sn_box_head" style="display:block;">\
    <div class="sn_box_title">' + cur.lang.auth_title + '</div>\
  </div>\
  <div class="vk_login_modal_cont"><a href="' + auth_url + '"><div class="vk_auth_but" style="margin:0px;">' + cur.lang.auth_button + '<div class="vk_auth_ic icon-vk"></div></div></a></div>';
    snModal.show({
        id: 'login_box',
        content: cont,
        cont_class: 'vk_login_modal bsbb',
        size: [450, 'auto']
    });
    snModal.resize();
}

function writeLoader(wrap, width, stroke) {
    if (!width) width = 15;
    if (!stroke) stroke = 5

    var html = '<div class="sn_loader" style="width: ' + width + 'px;">\
    <svg class="sn_loader_circular" viewBox="25 25 50 50">\
      <circle class="sn_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="' + stroke + '" stroke-miterlimit="10" />\
    </div>\
  </div>';
    if (wrap == -1) return html;
    wrap = ge(wrap);
    wrap.setAttribute('data-old-str', val(wrap));
    val(wrap, html);
    addClass(wrap, 'sn_loader_wrap');
}

function destroyLoader(wrap) {
    wrap = O(wrap);
    wrap.val(wrap.attr('data-old-str')).removeAttr('data-old-str').removeClass('sn_loader_wrap');
}

var search = {
    click: function() {
        if (isMob()) {
            clickHeadDropDown(1);
            addClass('head_cont', 'head_search_shown');
            ge('search_query').focus();
        }
    },
    hide: function(e) {
        cur.searchLastQuery = '';
        show('wrap_page_content');
        show('search_loupe');
        hide('close_search_res');
        val('search_result', '');
        val('search_preloader', '');
        val('search_query', '');
        removeClass(bodyNode, 'search');
        removeClass('head_cont', 'head_search_shown');
        delete cur.searchShown;
    },
    resize: function() {
        var wrap = ge('search_result'),
            h = getSize(wrap)[1];

        //var height = Math.min(452, wrap.scrollHeight);

        //setStyle(wrap, {height: 0});
        //setStyle(wrap, 'height', 'px');
        ge('search_result').scroll.update(0, 1);
    },
    get_result: function() {
        ajax.post('snapster.php', {
            act: 'search',
            query: ''
        }, {
            onDone: function(d) {
                ge('search_result').innerHTML = d;
                search.resize();
            }
        });
    },
    overFristItem: function() {
        var el = geByClass1('rooms_list_item', 'search_result');
        if (el) {
            search.item_over(el);
        }
    },
    go: function(q) {

        q = trim(q);

        if (!q) {
            search.hide();
            return;
        }

        if (q == cur.searchLastQuery) return;
        cur.searchLastQuery = q;

        clearTimeout(search.timeOut);
        search.timeOut = setTimeout(function() {
            if (!cur.searchLastQuery) return;

            cur.searchPage = 0;
            search.searchStartLoad = false;

            hide('search_loupe');
            writeLoader('search_preloader', 20);

            var room_id = cur.roomID;
            if (!ge('sn_room_info_wrap')) {
                room_id = 0;
            }

            ajax.post('snapster.php', {
                act: 'search',
                query: q,
                room_id: room_id
            }, {
                onDone: function(d, nextFrom) {
                    val('search_preloader', '');
                    show('close_search_res');
                    show('search_loupe');
                    if (!cur.searchShown) {
                        cur.searchShown = true;
                        addEvent(window, 'scroll', search.onScroll);
                    }
                    if (cur.searchLastQuery != q) {
                        return;
                    }
                    addClass(bodyNode, 'search');
                    hide('wrap_page_content');
                    val('search_result', d);
                    search.overFristItem();
                    cur.searchNextFrom = nextFrom;
                }
            });
        }, 300);
    },
    loadHints: function() {
        return;
        //if (!vk.id) return;
        ajax.post('snapster.php', {
            act: 'search',
            recommedations: 1
        }, {
            onDone: function(d) {
                cur.hintsList = d;
                delete cur.startLoadHints;
                //if (trim(ge('search_query').value).length != 0) {
                ge('search_result').innerHTML = d;
                search.overFristItem();
                //}
            }
        });
    },
    showHintsLoader: function() {
        ge('search_result').innerHTML = '<div class="search_hints_loader"><img src="/images/upload.gif" /></div>';
        search.resize();
    },
    onScroll: function() {
        if (search.searchStartLoad || cur.searchNextFrom == 0) return;

        var st = window.pageYOffset,
            wh = window.innerHeight,
            dh = document.body.offsetHeight;
        if (st + wh > dh - 200) {
            search.loadMore();
        }
    },
    loadMore: function() {
        if (search.searchStartLoad || cur.searchNextFrom == 0) return;
        search.searchStartLoad = true;

        var but = ge('search_load_more');
        if (!but) return;

        writeLoader(but, 43);

        var query = cur.searchLastQuery,
            global_put = geByClass1('sn_search_spliter', 'search_rooms_result') ? 1 : 0;
        ajax.post('snapster.php', {
            act: 'search',
            query: query,
            offset: cur.searchNextFrom,
            global_put: global_put
        }, {
            onDone: function(d, nextFrom) {
                if (cur.searchLastQuery != query) {
                    return;
                }

                cur.searchNextFrom = nextFrom;
                if (nextFrom > 0) {
                    destroyLoader(but);
                    search.searchStartLoad = false;
                } else {
                    re(but);
                }

                if (!d) return;

                var t = ce('div', {
                        innerHTML: d
                    }),
                    res = ge('search_rooms_result'),
                    first = t.firstChild,
                    len = 0;
                while (first) {
                    res.appendChild(first);
                    first = t.firstChild;
                }
            }
        });
    },
    keyUp: function(el, e) {
        cancelEvent(e);

        if (e.keyCode == KEY.DOWN || e.keyCode == KEY.UP || e.keyCode == KEY.ENTER) {
            var cur_el = ge('search_rooms_result').querySelectorAll('.search_item_over')[0];
            if (!cur_el) return;
            if (e.keyCode != KEY.ENTER) removeClass(cur_el, 'search_item_over');
        }

        var upd_scroll = false;

        if (e.keyCode == KEY.ESC) {
            search.hide();
        } else if (e.keyCode == KEY.DOWN) {
            var next = cur_el.nextSibling;
            if (hasClass(next, 'sn_search_spliter')) {
                next = next.nextSibling;
            }
            if (!next || !hasClass(next, 'rooms_list_item')) {
                next = ge('search_rooms_result').firstChild;
            }
            addClass(next, 'search_item_over');
            upd_scroll = next;
        } else if (e.keyCode == KEY.UP) {
            var prev = cur_el.previousSibling;
            if (hasClass(prev, 'sn_search_spliter')) {
                prev = prev.previousSibling;
            }
            if (!prev || !hasClass(prev, 'rooms_list_item')) {
                prev = ge('search_rooms_result').lastChild;
            }
            addClass(prev, 'search_item_over');
            upd_scroll = prev;
        } else if (e.keyCode == KEY.ENTER) {
            cur_el.click();
        } else {
            search.go(el.value);
        }

        if (upd_scroll) {
            window.scrollTo(0, upd_scroll.offsetTop - (window.innerHeight / 2));
        }
    },
    item_over: function(el) {
        var cur_el = ge('search_rooms_result').querySelectorAll('.search_item_over');
        if (cur_el && cur_el[0]) {
            removeClass(cur_el[0], 'search_item_over');
        }
        addClass(el, 'search_item_over');
    }
};

var snModal = {
    fastShow: function(opts) {
        var cont = '<div class="sn_box_head" style="display:block;">\
      <div class="sn_box_title bsbb" id="sn_upload_title">\
        ' + opts.title + '\
        <div class="sn_box_close_str" onClick="snModal.close(\'' + opts.id + '\');">' + getLang('global_close') + '</div>\
      </div>\
    </div>\
    <div class="sn_modal_content clear_fix">' + opts.content + '</div>';

        opts.content = cont;

        cur.snBoxMode = true;

        snModal.show(extend({
            size: [450, 'auto'],
            cont_class: 'vk_login_modal',
            no_close_btn: 1
        }, opts));
        snModal.resize();
    },
    setTitle: function(id, title) {
        if (cur.viewModal != id) return;

        var title_el = geByClass1('sn_box_title', 'sn_modal' + id);
        val(title_el, title);

        setStyle(geByClass1('sn_box_head', 'sn_modal' + id), 'height', getSize(title_el)[1]);
    },
    setContent: function(id, content) {
        if (cur.viewModal != id) return;
        val(geByClass1('sn_modal_content', 'sn_modal' + id), content);
        snModal.resize();
    },
    showNavLoader: function(id) {
        if (cur.viewModal != id) return;
        writeLoader(geByClass1('sn_modal_nav_loader', 'sn_modal' + id), 20);
    },
    hideNavLoader: function(id) {
        if (cur.viewModal != id) return;
        destroyLoader(geByClass1('sn_modal_nav_loader', 'sn_modal' + id));
    },
    moveNavLine: function(from_el, to_el, id) {

        from_el = ge(from_el);
        to_el = ge(to_el);

        var line = geByClass1('sn_modal_nav_line_helper', 'sn_modal' + id);
        if (!isVisible(line)) {
            setStyle(line, {
                left: from_el.offsetLeft,
                width: getSize(from_el)[0]
            });
            show(line);
        }

        addClass(from_el.parentNode, 'sn_modal_nav_moving_line');

        animate(line, {
            left: to_el.offsetLeft,
            width: getSize(to_el)[0]
        }, 150, function() {
            removeClass(from_el.parentNode, 'sn_modal_nav_moving_line');
            hide(line);
        });

        removeClass(from_el, 'sn_modal_item_active');
        addClass(to_el, 'sn_modal_item_active');
    },
    confirmBox: function(title, text, opts) {

        var show_opts = {
            buttons: [{
                    str: opts.accept_str,
                    js: opts.accept_js,
                    blue: 1,
                    id: 'confirm_accept_btn'
                },
                {
                    str: getLang('global_close'),
                    js: 'snModal.close()',
                    gray: 1,
                    id: 'confirm_close_btn'
                }
            ],
            size: [451, 'auto'],
            content: text,
            title: title,
            confirm: 1
        };

        snModal.fastShow(extend(show_opts, opts));
    },
    show: function(opts) {
        if (!opts) opts = {};

        if (!cur.modalQueue) cur.modalQueue = [];

        if (cur.viewModal || cur.viewModal === '') {
            cur.modalQueue.push({
                id: cur.viewModal,
                size: snModal.size,
                onMore: cur.snModalMore,
                onResize: cur.snModalOnResize,
                customClose: snModal.customClose,
                scrollTop: snModal.scrollTop,
                confirm: snModal.confirm,
                onClose: snModal.onClose
            });
            if (is_mob) {
                hide('sn_modal' + cur.viewModal);
            }
        }

        snModal.confirm = opts.confirm ? 1 : 0;
        snModal.scrollTop = window.scrollGetY();
        snModal.onClose = opts.onClose ? opts.onClose : false;

        if (opts.size) {
            var size = opts.size;
        } else {
            var size = [700, 500];
        }
        snModal.size = opts.size;

        cur.viewModal = opts.id ? opts.id : '';
        cur.modalOpened = true;

        if (opts.cont_class) {
            var cont_class = opts.cont_class;
        } else {
            var cont_class = '';
        }

        if (!opts.disable_close) {
            var close_cont = opts.no_close_btn ? '' : '<div class="sn_modal_close" id="sn_modal_close" onClick="snModal.close();">\
        <div class="sn_modal_close_line"></div>\
        <div class="sn_modal_close_line sn_modal_close_line2"></div>\
      </div>',
                check_close_js = 'snModal.checkClose(event);';
        } else {
            var check_close_js = '',
                close_cont = '';
        }

        var cont = close_cont + '\
      <div class="sn_modal_cont ' + cont_class + '" id="sn_modal_cont" onmouseover="snModal.over();" onmouseout="snModal.out();">' + opts.content;

        if (opts.buttons) {
            cont += '<div class="confirm_buttons">';
            for (var i in opts.buttons) {
                var btn = opts.buttons[i];
                if (isObject(btn)) {
                    var class_name = btn.gray ? 'confirm_but_gray' : (btn.blue ? 'confirm_but_blue' : '');
                    cont += '<div class="confirm_but ' + class_name + '" onClick="' + btn.js + '" ' + (btn.id ? 'id="' + btn.id + '"' : '') + '>' + btn.str + '</div>';
                } else {
                    cont += '<div class="confirm_but" onClick="snModal.close()">' + btn + '</div>';
                }
            }
            cont += '</div>';
        }
        cont += '</div>';

        var modal = ce('div', {
            innerHTML: cont,
            className: 'sn_modal bsbb no_select' + (opts.confirm ? '' : ' sn_modal_def'),
            id: 'sn_modal' + cur.viewModal
        });
        modal.setAttribute('onClick', check_close_js);
        ge('sn_modal_wrap').appendChild(modal);

        if (opts.close) {
            snModal.customClose = opts.close;
        } else {
            snModal.customClose = false;
        }

        cur.snModalMore = opts.onMore;
        addEvent('sn_modal' + cur.viewModal, 'scroll', snModal.checkScroll);

        if (!opts.no_fill_bg) {
            setStyle('sn_modal' + cur.viewModal, {
                background: 'rgba(0,0,0,0.7)'
            });
        }

        if (!opts.no_start_resize) {
            snModal.resize();
        }

        addClass(bodyNode, 'modal_shown');

        cur.snModalOnResize = opts.onResize ? opts.onResize : false;

        snModal.checkVisible();
        snModal.resize();
    },
    checkScroll: function() {
        var wh = window.innerHeight,
            modal = ge('sn_modal' + cur.viewModal),
            cont = geByClass1('sn_modal_cont', modal),
            cont_h = getSize(cont)[1],
            st = modal.scrollTop;

        if (cur.snBoxMode) {
            var box_top = cont.offsetTop;
            if (st >= box_top && !cur.modalHeadFix) {
                addClass(geByClass1('sn_box_title', 'sn_modal' + cur.viewModal), 'sn_box_title_fix');
                cur.modalHeadFix = true;
            } else if (st < box_top && cur.modalHeadFix) {
                cur.modalHeadFix = false;
                removeClass(geByClass1('sn_box_title', 'sn_modal' + cur.viewModal), 'sn_box_title_fix');
            }
        }

        var cont_pos = Math.max(getXY(cont)[1] - window.scrollGetY(), 15);
        if (cur.lastBoxClosePos != cont_pos) {
            cur.lastBoxClosePos = cont_pos;
            setStyle(geByClass1('sn_modal_close', 'sn_modal' + cur.viewModal), 'top', cont_pos);
        }

        if (!cur.snModalMore) return;
        if (st + wh >= cont_h - 100) {
            cur.snModalMore();
        }
    },
    disableClose: function() {
        hide(geByClass1('sn_modal_close', 'sn_modal' + cur.viewModal));
        ge('sn_modal' + cur.viewModal).removeAttribute('onClick');
        hide(geByClass1('sn_box_close_str', 'sn_modal' + cur.viewModal));
    },
    getSize: function() {
        var wh = window.innerHeight,
            ww = window.innerWidth;

        if (ww >= 600) {
            wh -= 100;
            ww -= 100;
        }

        var width = Math.min(snModal.size[0], ww),
            auto_height = typeof snModal.size[1] == 'string' ? 1 : 0;

        if (auto_height) {
            var height = snModal.size[1];
        } else {
            var height = snModal.size[1] / snModal.size[0] * width;
        }

        if (!auto_height && height > wh) {
            height = wh;
            width = snModal.size[0] / snModal.size[1] * height;
        }

        var marginTop = (wh - height) / 2;

        return [width, height, marginTop];
    },
    resize: function(from_queue) {
        if (!cur.modalOpened) {
            return;
        }

        if (!snModal.confirm && is_mob) {
            return;
        }

        var wrapSize = snModal.getSize();

        var wh = window.innerHeight,
            ww = window.innerWidth;

        if (ww >= 600) {
            wh -= 100;
        }

        var el = geByClass1('sn_modal_cont', 'sn_modal' + cur.viewModal),
            size = getSize(el),
            marginTop = Math.max(0, (wh - size[1]) / 2);

        setStyle(el, {
            marginTop: marginTop
        });

        setStyle(el, {
            width: wrapSize[0],
            height: wrapSize[1],
            marginTop: wrapSize[2]
        }, 200);

        setStyle(geByClass1('sn_box_title', 'sn_modal' + cur.viewModal), 'width', size[0] + 'px');

        if (cur.snModalOnResize) cur.snModalOnResize(from_queue);

        var cont_pos = getXY(el);
        cont_pos[1] -= window.scrollGetY();
        cur.lastBoxClosePos = cont_pos[1];
        setStyle(geByClass1('sn_modal_close', 'sn_modal' + cur.viewModal), {
            top: cont_pos[1],
            left: cont_pos[0] + getSize(el)[0] + 15
        });

        snModal.checkScroll();
    },
    close: function() {

        if (!ge('sn_modal' + cur.viewModal)) {
            return;
        }

        removeEvent('sn_modal' + cur.viewModal, 'scroll');
        removeEvent('sn_modal_cont');
        if (snModal.customClose) return snModal.customClose();
        re('sn_modal' + cur.viewModal);

        if (snModal.onClose) {
            snModal.onClose();
        }

        if (cur.modalQueue.length > 0) {
            var dat = cur.modalQueue.splice(0, 1)[0];
            if (is_mob) {
                show('sn_modal' + dat.id);
                window.scrollTo(0, snModal.scrollTop);
            }
            cur.viewModal = dat.id;
            snModal.size = dat.size;
            cur.snModalMore = dat.onMore;
            cur.snModalOnResize = dat.onResize;
            snModal.customClose = dat.customClose;
            snModal.scrollTop = dat.scrollTop;
            snModal.confirm = dat.confirm;
            snModal.onClose = dat.onClose;
            snModal.resize(1);
            return;
        }

        delete cur.modalWrapersHidden;
        show('head_cont', 'sn_page_wrap', 'sn_footer');

        setStyle(bodyNode, {
            'overflow-y': 'auto'
        });
        cur.modalOpened = false;
        cur.viewModal = false;

        removeClass(bodyNode, 'modal_shown');

        if (is_mob) {
            window.scrollTo(0, snModal.scrollTop);
        }
    },
    closeAll: function() {
        var wrap = ge('sn_modal_wrap'),
            modal;

        while (modal = wrap.firstChild) {
            removeEvent(modal);
            removeEvent(geByClass1('sn_modal_cont', modal));
            re(modal);
        }

        cur.modalQueue = [];

        setStyle(bodyNode, {
            'overflow-y': 'auto'
        });
        cur.modalOpened = false;
        cur.viewModal = false;
    },
    checkClose: function(e) {
        if (hasClass(e.target, 'sn_modal')) {
            snModal.close();
        }
    },
    over: function() {
        removeClass(geByClass1('sn_modal_close', 'sn_modal' + cur.viewModal), 'sn_modal_close_over');
    },
    out: function() {
        addClass(geByClass1('sn_modal_close', 'sn_modal' + cur.viewModal), 'sn_modal_close_over');
    },
    showLoader: function() {

    },
    scrolToTop: function() {
        var modal = ge('sn_modal' + cur.viewModal),
            st = modal.scrollTop,
            cont = geByClass1('sn_modal_cont', modal);

        modal.scrollTop = Math.abs(st + getXY(cont)[1]);
    },
    checkVisible: function() {
        if (is_mob) {

        } else {
            if (cur.modalOpened) {
                setStyle(bodyNode, 'overflow-y', 'hidden');
            }
        }
    }
};

var photos = {
    MAX_UPLOAD_PHOTOS: 30,
    MAX_PHOTO_SIZE: 1024 * 1024 * 5, // 5 mb
    PW_BOX_ID: 'inline_photo_view',
    show: function(thumb, obj, src, size) {

        if (thumb.loaded) {
            return photos.doShow(thumb, obj, src, size);
        }

        var preloader = geByClass1('sn_attach_photo_preloader', thumb);
        show(preloader);

        var img = new vkImage();
        img.onload = function() {
            thumb.loaded = 1;
            re(preloader);
            photos.doShow(thumb, obj, src, size);
            geByTag1('img', thumb).src = src;
        };
        img.src = src;
    },
    doShow: function(thumb, obj, src, size) {
        var cont = '<img src="' + src + '" class="sn_view_photo" />';

        snModal.show({
            id: photos.PW_BOX_ID,
            content: cont,
            size: size,
            close: photos.close,
            cont_class: 'sn_view_photo_cont',
            no_fill_bg: 1,
            no_start_resize: 1
        });

        cur.openedThumb = thumb;

        var offset = getXY(thumb, 1),
            thumbSize = getSize(thumb),
            modal = ge('sn_modal' + photos.PW_BOX_ID),
            wrap = geByClass1('sn_modal_cont', modal),
            ww = getSize(modal)[0];

        if (ww > 600) {
            var diff = 50;
        } else {
            var diff = 0;
        }
        ww -= diff * 2;

        setStyle(wrap, {
            width: thumbSize[0],
            height: thumbSize[1],
            marginLeft: offset[0] - modal.scrollLeft - diff,
            marginTop: offset[1] - modal.scrollTop - diff
        });

        var wrapSize = snModal.getSize(),
            marginLeft = window.innerWidth - wrapSize[0];

        setStyle('sn_modal' + photos.PW_BOX_ID, {
            background: 'rgba(0,0,0,0.7)'
        });
        animate(wrap, {
            width: wrapSize[0],
            height: wrapSize[1],
            marginTop: wrapSize[2],
            marginLeft: (ww - wrapSize[0]) / 2
        }, {
            duration: 150,
            transition: Fx.Transitions.easeOutCubic,
        });

        cur.photoShown = true;

        addEvent(geByClass1('sn_view_photo_cont'), 'click', snModal.close);
    },
    close: function() {
        var offset = getXY(cur.openedThumb, 1),
            thumbSize = getSize(cur.openedThumb),
            wrap = geByClass1('sn_modal_cont', 'sn_modal' + photos.PW_BOX_ID),
            modal = ge('sn_modal' + photos.PW_BOX_ID),
            ww = getSize(modal)[0];

        if (ww > 600) {
            var diff = 50;
        } else {
            var diff = 0;
        }
        ww -= diff * 2;

        setStyle('sn_modal' + photos.PW_BOX_ID, {
            background: 'rgba(0,0,0,0)'
        });
        setStyle(wrap, 'overflow', 'hidden');
        animate(wrap, {
            width: thumbSize[0],
            height: thumbSize[1],
            marginLeft: offset[0] - modal.scrollLeft - diff,
            marginTop: offset[1] - modal.scrollTop - diff,
        }, {
            duration: 150,
            transition: Fx.Transitions.easeOutCubic,
            onComplete: function() {
                re(wrap);
                snModal.customClose = false;
                cur.openedThumb = null;
                snModal.close();
            }
        });
        cur.photoShown = false;
    },
    initUploadEvents: function() {
        if (!cur.roomPablisher) return;
        var wrap = ge('sn_drop_box');
        addEvent(bodyNode, 'dragenter', photos.onDragEnter);
        addEvent(bodyNode, 'dragover', photos.onDragOver);
        addEvent(bodyNode, 'dragleave', photos.onDragLeave);
        addEvent(bodyNode, 'drop', photos.onDrop);

        show('sn_upload_btn');
    },
    onDragEnter: function(e) {
        if (cur.dragStarted || cur.uploadStarted || !e.dataTransfer) {
            return cancelEvent(e);
        }

        if (!browser.safari && (!e.dataTransfer.items[0] || e.dataTransfer.items[0].type.substr(0, 6) != 'image/')) {
            return;
        }

        show('sn_drop_box');
        cur.dragStarted = 1;
    },
    onDragOver: function(e) {
        cancelEvent(e);
    },
    onDragLeave: function(e) {
        if (cur.uploadStarted || e.target.id != 'sn_drop_box') return cancelEvent(e);
        if (cur.dragStarted) {
            cur.dragStarted = 0;
            hide('sn_drop_box');
        }
        cancelEvent(e);
    },
    onFile: function(file) {
        photos.checkFiles([file]);
    },
    onDrop: function(e) {
        if (cur.uploadStarted) return;

        cur.dragStarted = 0;
        hide('sn_drop_box');
        cancelEvent(e);

        if (!e.dataTransfer || !e.dataTransfer.files.length) return;

        var files = [e.dataTransfer.files[0]];
        photos.checkFiles(files);
    },
    checkFiles: function(files) {
        var len = files.length
        if (len > 0) {
            var alloed_files = [];
            for (var i = 0; i < len; i++) {
                var type = files[i].type.split('/');
                if (files[i].size > photos.MAX_PHOTO_SIZE) {
                    continue;
                }
                if (type[0] == 'image' && /^(jpg|jpeg|gif|png)$/.test(type[1])) {
                    alloed_files.push(files[i]);
                    if (alloed_files.length >= photos.MAX_UPLOAD_PHOTOS) break;
                }
            }
            photos.startUpload(alloed_files);
        }
    },
    startUpload: function(files) {
        var len = files.length;
        if (len == 0) {
            var max_size = Math.floor(photos.MAX_PHOTO_SIZE / (1024 * 1024));
            var max_size_str = cur.lang.chronicle_upload_bad_format.replace('%s', max_size);

            var cont = '<div class="sn_box_head" style="display:block;">\
        <div class="sn_box_title" id="sn_upload_title">' + cur.lang.chronicle_title_info + '</div>\
      </div>\
      <div class="sn_upload_modal_cont sn_upload_modal_error"> ' + max_size_str + '</div>';
            snModal.show({
                content: cont,
                cont_class: 'vk_login_modal bsbb',
                size: [450, 'auto'],
            });
            snModal.resize();
            return;
        }

        if (cur.uploadStarted) return;
        cur.uploadStarted = true;

        var cont = '<div class="sn_box_head" style="display:block;">\
      <div class="sn_box_title" id="sn_upload_title">' + cur.lang.chronicle_upload_title + '</div>\
    </div>\
    <div class="sn_upload_modal_cont">\
      <div class="sn_upload_progress_wrap">\
        <div class="sn_upload_progress" id="sn_upload_progress">\
          <div class="sn_upload_progress_persent" id="sn_upload_progress_persent1"></div>\
        </div>\
        <div class="sn_upload_progress_persent" id="sn_upload_progress_persent2"></div>\
      </div>\
      <div id="sn_upload_save_info">' + cur.lang.chronicle_photo_saving_warning + '</div>\
      <div class="sn_upload_descr_cont">\
        <div class="sn_upload_descr_label">' + cur.lang.descr + '</div>\
        <textarea placeholder="' + cur.lang.enter_photo_descr + '" id="photo_descr_val" class="sn_edit_photo_descr_area bsbb"></textarea>\
        <div class="confirm_buttons">\
          <div class="confirm_but confirm_but_blue" id="confirm_accept_btn" onClick="photos.saveUploadDescr();">' + getLang('global_save') + '</div>\
        </div>\
      </div>\
    </div>';

        snModal.show({
            id: 'upload_photo',
            content: cont,
            cont_class: 'vk_login_modal bsbb',
            size: [450, 'auto'],
            disable_close: 1
        });
        autosizeSetup('photo_descr_val', {
            maxHeight: 170,
            onResize: snModal.resize
        });
        snModal.resize();

        cur.uploadFiles = files;
        cur.uploadedPhotos = '';
        cur.uploadData = [];
        cur.loaded = 0;

        photos.uploadPhoto();
    },
    saveUploadDescr: function() {
        if (cur.uploadStarted) {
            cur.saveUploadDescr = val('photo_descr_val');
            re(geByClass1('sn_upload_descr_cont'));
            snModal.resize();
        } else {

        }
    },
    uploadPhoto: function() {
        var part_limit = 5
        offset = part_limit * cur.uploadPart,
            files = cur.uploadFiles;

        // fill form
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('file' + (i + 1), files[i]);
        }

        var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest,
            xhr = new XHR();

        xhr.open('POST', cur.uploadServer, true);
        xhr.onload = function(e) {
            var obj, res = xhr.responseText;
            try {
                obj = eval('(' + res + ')');
            } catch (e) {
                obj = q2ajx(res);
            }
            var query = extend({
                act: 'save_photos',
                room_id: cur.roomID
            }, obj);

            cur.uploadData.push(obj);
            photos.uploadComplete();
        };
        xhr.upload.onprogress = function(e) {
            var persent = Math.floor((e.loaded / e.totalSize) * 100);
            persent += '%';
            setStyle('sn_upload_progress', 'width', persent);
            val('sn_upload_progress_persent1', persent);
            val('sn_upload_progress_persent2', persent);
        };
        cur.uploadStarted = true;
        xhr.onerror = photos.uploadError;
        xhr.send(formData);
    },
    uploadComplete: function() {

        val('sn_upload_title', cur.lang.photo_saving_title);
        var len = cur.uploadData.length;

        show('sn_upload_save_info');
        hide(geByClass1('sn_upload_progress_wrap'));
        snModal.resize();

        photos.savePhotosPart();
    },
    savePhotosPart: function() {
        var obj = cur.uploadData[0];

        var query = extend({
            act: 'save_photos',
            room_id: cur.roomID
        }, obj);
        cur.uploadStarted = false;

        if (cur.saveUploadDescr) {
            query.caption = cur.saveUploadDescr;
            delete cur.saveUploadDescr;
        }

        ajax.post('snapster.php', query, {
            onDone: function(d, data, descrHash) {
                cur.photosSizes = extend(cur.photosSizes, data);
                cur.uploadedPhotos += d;
                photos.saveComplete(descrHash);
            },
            onFail: photos.uploadError
        });
    },
    saveComplete: function(descrHash) {

        var tmp = ce('div', {
                innerHTML: cur.uploadedPhotos
            }),
            parent = ge('photos_list_res');

        if (parent.firstChild.className == 'empty_room_feed') {
            parent.innerHTML = cur.uploadedPhotos;
        } else {
            while ((first = tmp.firstChild)) {
                parent.insertBefore(first, parent.firstChild);
            }
        }
        cur.uploadStarted = false;

        var last_photo = geByClass1('sn_photo_item', 'photos_list_res');
        //photos.doShowDescrBox(last_photo.id.substr(5), '', descrHash);

        val('sn_upload_title', cur.lang.upload_completed);
        var accpet_btn = ge('confirm_accept_btn');
        if (accpet_btn) {
            re('sn_upload_save_info');
            re(geByClass1('sn_upload_progress_wrap'));
            accpet_btn.setAttribute('onClick', 'photos.saveDescr(\'' + last_photo.id.substr(5) + '\', \'' + descrHash + '\')');
        } else {
            snModal.close();
        }
        room.initPhotos();
    },
    uploadError: function(e) {
        debugLog('uploadError', e);
        snModal.close();

        var cont = '<div class="sn_box_head" style="display:block;">\
      <div class="sn_box_title" id="sn_upload_title">' + cur.lang.error + '</div>\
    </div>\
    <div class="sn_upload_modal_cont sn_upload_modal_error">' + cur.lang.chronicle_upload_error + '</div>';
        snModal.show({
            content: cont,
            cont_class: 'vk_login_modal bsbb',
            size: [450, 'auto']
        });
        snModal.resize();
    },
    doShowDescrBox: function(id, descr, hash) {
        if (!descr) descr = '';
        descr = String(descr).replace('<br/>', '\n');

        var cont = '<textarea placeholder="' + cur.lang.enter_photo_descr + '" id="photo_descr_val" class="sn_edit_photo_descr_area bsbb">' + descr + '</textarea>';

        snModal.confirmBox(cur.lang.photo_descr_title, cont, {
            accept_str: cur.lang.save,
            accept_js: 'photos.saveDescr(\'' + id + '\', \'' + hash + '\')'
        });

        autosizeSetup('photo_descr_val', {
            maxHeight: 170,
            onResize: snModal.resize
        });
    },
    saveDescr: function(pid, hash) {
        var str = clean(trim(val('photo_descr_val')));

        snModal.disableClose();
        re('confirm_close_btn');

        var accept_btn = ge('confirm_accept_btn');
        val(accept_btn, '<div class="sn_mini_btn_loading"></div>');
        accept_btn.removeAttribute('onClick');

        ajax.post('snapster.php', {
            act: 'save_photo_descr',
            pid: pid,
            descr: str,
            hash: hash
        }, {
            onDone: function(caption) {
                snModal.close();
                if (cur.photosData && cur.photosData[pid]) {
                    cur.photosData[pid].full_descr = caption;
                }
            },
            onFail: function() {
                snModal.close();
            }
        })
    },
    deletePhoto: function(pid) {
        if (!cur.deletedPhotos) {
            cur.deletedPhotos = {};
        }
        cur.deletedPhotos[pid] = 1;
        ajax.post('snapster.php', {
            act: 'delete_photo',
            pid: pid,
            hash: cur.photosData[pid].delete_hash
        }, {
            onDone: function() {

            }
        });
    },
    onNewLike: function(event) {

    }
};

var follow = {
    butOver: function(el, e) {
        if (isMob()) return;

        var parent = el.parentNode,
            wrap = ge('follow_but_overed'),
            str = ge('follow_but_str');

        if (parent.overed) return;
        parent.overed = true;

        var size = getSize('follow_btn_wrap'),
            offset = getXY('follow_btn_wrap');

        offset[1] -= window.scrollY;

        var x = Math.min(size[0] + 10, (e.clientX - offset[0]) + 10),
            y = e.clientY - offset[1];

        var start_size = 30;

        if (y < 24) {
            y = -(start_size + 20);
        } else {
            y = size[1] + 20;
        }

        setStyle(wrap, {
            top: y,
            left: x - start_size,
            height: 30,
            width: 30,
        });

        follow.butStart = [x, y];

        var pos = getXY('follow_str');

        animate(wrap, {
            width: 450,
            height: 450,
            top: -(225),
            left: -(225 - x)
        }, {
            duration: 300,
            transition: Fx.Transitions.easeOutCubic
        });
        /*animate(wrap.parentNode, {
          opacity: 1
        }, 100);*/
    },
    butOut: function(el, e) {
        if (isMob()) return;

        var wrap = ge('follow_but_overed'),
            str = ge('follow_but_str');

        var tween = data(wrap, 'tween');
        if (tween && tween.isTweening) tween.stop(false);

        tween = data('follow_but_str', 'tween');
        if (tween && tween.isTweening) tween.stop(false);

        var size = getSize(el),
            offset = getXY(el);

        offset[1] -= window.scrollY;

        var x = Math.min(size[0] + 10, (e.clientX - offset[0]) - 10),
            y = Math.min(size[1] + 10, (e.clientY - offset[1]) - 10);

        if (y > size[1] / 2) {
            y = size[1] + 10;
        } else {
            y = -10;
        }

        animate(wrap, {
            top: y,
            left: x,
            height: 0,
            width: 0
        }, 300);
        /*animate(wrap.parentNode, {
          opacity: 0
        }, 300);*/


        //follow.butStart = null;

        el.parentNode.overed = false;
    },
    btnOver: function(el) {
        var size = getSize(el),
            line = ge('sn_follow_btn_line');

        animate(line, {
            top: -2,
            left: -2,
            width: size[0] + 4,
            height: size[1] + 4
        }, 100);
    },
    btnOut: function(el) {
        var size = getSize(el),
            line = ge('sn_follow_btn_line');

        animate(line, {
            top: 0,
            left: 0,
            width: size[0],
            height: size[1]
        }, 100);
    }
};

var videos = {
    show: function(id) {
        snModal.show({
            content: '<div id="sn_video_wrap"></div>',
            size: [890, 500],
            cont_class: 'sn_view_video'
        });
        showInlineVideo(id, '', {
            autoplay: 1
        }, false, ge('sn_video_wrap'));
        snModal.resize();
    }
};

var room = {
    photoPadding: 30,
    loadedImage: function() {
        var img = geByClass1('sn_no_loaded_img', 'photos_list_res');
        if (img) room.startLoadImage(img);
    },
    startLoadImage: function(img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        removeClass(img, 'sn_no_loaded_img');
    },
    initPhotos: function() {

        // start load images
        var imgs = geByClass('sn_no_loaded_img', 'photos_list_res').slice(0, 3);
        for (var i = 0; i < imgs.length; i++) {
            room.startLoadImage(imgs[i]);
        }
        cur.wrapWidth = false;
        cur.photosLinesH = [];
        room.updatePhotos();

        checkLeftPanelFix();

        removeEvent(window, 'resize', room.updatePhotos);
        removeEvent(window, 'scroll', checkLeftPanelFix);

        addEvent(window, 'resize', room.updatePhotos);
        addEvent(window, 'scroll', checkLeftPanelFix);
    },
    SCALE: 0.03,
    updatePhotos: function(e, data_only) {

        if (window.is_mob) {
            return;
        }

        var ww = window.innerWidth,
            is_center = false;
        if (ww > 650) {
            ww -= 120;
        }
        ww -= 240; // panel

        /*
        var checking = true, columns = 3;
        while(checking) {
          var w = ww / columns;

          if (w >= 200) {
            w = is_center ? w : Math.min(260, w);
            checking = false;
            break;
          }

          columns--;

          if (columns < 2) {
            if (is_center) {
              columns = 1;
              checking = false;
              w = window.innerWidth;
            } else {
              is_center = true;
              columns = 3;
              ww += 240;
            }
          }
        }*/
        var w = 260;
        var columns = 3;

        cur.itemW = w;
        cur.columns = columns;
        var scale = cur.columns == 1 ? 20 : cur.itemW * room.SCALE;

        var el = ge('photos_list');
        var wrapW = (columns * (w + scale)) - scale + 14;
        var no_photos = cur.photosSizes && Object.keys(cur.photosSizes).length == 0 ? true : false;

        if (no_photos) {
            //wrapW = Math.min(600, wrapW);
            //addClass('photos_list', 'photos_list_empty');
            var height = getSize('sn_room_info_wrap')[1] - 32 - 47;
            setStyle(geByClass1('empty_room_feed'), {
                height: height + 'px',
                'line-height': height + 'px',
            });
        }
        if (cur.wrapWidth != wrapW && !data_only) {

            if (is_center) {
                addClass('sn_room_info_wrap', 'sn_room_info_wrap_mob');
                addClass('photos_list', 'photos_list_mob');
            } else {
                removeClass('sn_room_info_wrap', 'sn_room_info_wrap_mob');
                removeClass('photos_list', 'photos_list_mob');
            }

            cur.wrapWidth = wrapW;
            //setStyle(el, 'width', wrapW + 'px');
            cur.photosLinesH = Array.apply(null, Array(columns)).map(Number.prototype.valueOf, 0);
            if (!no_photos) room.assign(geByClass('sn_photo_item', 'photos_list_res'));
        }

        var formW = is_center ? 0 : 240;
        var mleft = ((cur.windowW - wrapW - formW) / 2);
        var contW = wrapW + 240 - scale;
        cur.maxWrapWidth = contW;

        if (!data_only) {
            setStyle('sn_upload_btn', 'left', cur.windowW - 71 - 42);
            cur.lastWinWidth = 0;
        } else {
            return contW;
        }
        onWinResize();

        checkLeftPanelFix();
    },
    assign: function(items) {
        var column, min, h, max_h = 0;

        var scale = cur.columns == 1 ? 20 : cur.itemW * room.SCALE;
        for (var i = 0; i < items.length; i++) {
            min = Math.min.apply(Math, cur.photosLinesH);
            column = cur.photosLinesH.indexOf(min);


            var item = items[i],
                pid = item.id.substr(5);

            var psize = cur.photosSizes[pid]; //cur.photosData[pid];
            var img_w = cur.itemW;
            if (cur.columns > 1) img_w -= scale;
            var blH = psize[1] / psize[0] * img_w;

            setStyle(item, {
                left: ((column) * cur.itemW) + 'px',
                top: cur.photosLinesH[column] + 'px',
                width: cur.itemW + 'px',
                height: (blH + scale) + 'px'
            });

            setStyle(geByClass1('sn_photo_item_cont', item), {
                width: img_w + 'px',
                height: (psize[1] / psize[0] * img_w) + 'px'
            });

            removeClass(item, 'prepare');
            cur.photosLinesH[column] += blH + scale;

            var line_h = cur.photosLinesH[column];
            if (line_h > max_h) max_h = line_h;
        }
        setStyle('photos_list_res', 'min-height', max_h - scale);
    },
    set_follow: function() {
        if (!hasClass('follow_but_el', 'unfollowed_btn') || !cur.roomPablisher) {
            return room.do_set_follow();
        }
        var cont = '<div class="sn_box_head" style="display:block;">\
      <div class="sn_box_title">' + cur.lang.chronicle_confirm_action + '</div>\
    </div>\
    <div class="confirm_str">' + cur.lang.chronicle_unfollow_confirmation + '</div>\
    <div class="confirm_buttons">\
      <div class="confirm_but" onClick="room.do_set_follow()">��, ����������</div>\
      <div class="confirm_but confirm_but_gray" onClick="snModal.close()">������</div>\
    </div>';
        snModal.show({
            content: cont,
            cont_class: 'confirm_modal bsbb',
            size: [453, 'auto']
        });
        snModal.resize();
    },
    do_set_follow: function() {
        var el = ge('follow_but_el');
        if (hasClass(el, 'unfollowed_btn')) {
            removeClass(el, 'unfollowed_btn');
            var act = 'un';
            cur.followersNum--;
        } else {
            addClass(el, 'unfollowed_btn');
            var act = '';
            cur.followersNum++;
        }
        if (cur.followersNum < 0) {
            cur.followersNum = 0;
        }
        val('follow_str', act == 'un' ? cur.lang.follow : cur.lang.unfollow);
        snModal.close();
        val('followers_num', cur.followersNum);
        val('followers_num_str', langNumeric(cur.followersNum, cur.lang.chronicle_N_followers));
        re('room_invited_info');
        ajax.post('snapster.php', {
            act: act + 'follow',
            room_id: cur.roomID,
            invite_key: cur.inviteKey,
            hash: cur.followHash
        }, {
            onDone: function() {

            }
        });
    },
    showFollowers: function() {
        if (!cur.followersNum) {
            return;
        }

        var cont = '<div class="search_hints_loader">' + writeLoader(-1, 50) + '</div>';
        snModal.fastShow({
            id: 'room_followers',
            title: cur.lang.followers_title,
            content: cont,
            size: [500, 'auto'],
            onMore: room.moreFollowers,
            cont_class: 'sn_followers_box',
        });

        ajax.post('snapster.php', {
            act: 'get_followers',
            room_id: cur.roomID
        }, {
            onDone: function(d) {
                cur.followersStartLoad = false;
                cur.followersOffset = d.offset;
                cur.followersTotal = d.offset;

                cur.followersVars = {
                    all: {
                        offset: d.offset,
                        total: d.total
                    }
                };

                delete cur.authorsTabLoaded;
                cur.followersTab = 'all';

                if (cur.roomID > 0) {
                    var tpl_followers = '<div class="sn_box_close_str" onClick="snModal.close();">' + getLang('global_close') + '</div>\
  <div class="sn_modal_nav">\
  <div class="sn_modal_nav_title bsbb">' + cur.lang.room_followers_title + '</div>\
  <div class="sn_modal_item sn_modal_item_active" id="followers_tab_all" onClick="room.followersSwitchTab(this);">' + cur.lang.room_followers_all + '</div>\
  <div class="sn_modal_item" id="followers_tab_authors" onClick="room.followersSwitchTab(this);">' + cur.lang.room_followers_authors + '</div>\
  <div class="clear"></div>\
  <div class="sn_modal_nav_loader"></div>\
  <div class="sn_modal_nav_line_helper"></div>\
  <div class="sn_modal_nav_shadow"></div>\
</div>';
                    snModal.setTitle('room_followers', tpl_followers);
                }
                var cont = '<div id="followers_box_all">' + d.html + '</div><div id="followers_box_authors"></div>';
                snModal.setContent('room_followers', cont);
            }
        });
    },
    followersSwitchTab: function(el) {
        var id = el.id.replace('followers_tab_', '');
        if (id == cur.followersTab) return;

        var cur_el = ge('followers_tab_' + cur.followersTab),
            next_el = ge('followers_tab_' + id);

        snModal.moveNavLine(cur_el, next_el, 'room_followers');

        hide('followers_box_' + cur.followersTab);
        show('followers_box_' + id);

        snModal.scrolToTop();

        cur.followersTab = id;
        if (id == 'authors' && !cur.authorsTabLoaded) {
            snModal.showNavLoader('room_followers');
            cur.authorsTabLoaded = true;
            val('followers_box_' + id, '<div class="search_hints_loader">' + writeLoader(-1, 50) + '</div>');

            ajax.post('snapster.php', {
                act: 'get_followers',
                room_id: cur.roomID,
                tab: 'authors'
            }, {
                onDone: function(d) {

                    cur.followersVars['authors'] = {
                        offset: d.offset,
                        total: d.total
                    };

                    val('followers_box_' + id, d.html);
                    snModal.resize();
                    snModal.hideNavLoader('room_followers');
                }
            });

        } else {
            snModal.hideNavLoader('room_followers');
        }

        snModal.resize();
    },
    moreFollowers: function() {
        if (!cur.followersVars) return;

        var tab = cur.followersTab,
            dat = cur.followersVars[tab];

        if (!dat || dat.startLoad) return;
        cur.followersVars[tab].startLoad = true;

        var but = geByClass1('moreBut ', 'followers_box_' + tab);
        if (!but) return;

        writeLoader(but, 43);

        ajax.post('snapster.php', {
            act: 'get_followers',
            room_id: cur.roomID,
            offset: dat.offset,
            tab: tab
        }, {
            onDone: function(d) {
                if (!d) return;

                cur.followersVars[tab].offset = d.offset;
                cur.followersVars[tab].total = d.total;

                var t = ce('div', {
                        innerHTML: d.html
                    }),
                    first = t.firstChild,
                    wrap = geByClass1('followers_result', 'followers_box_' + tab);
                while (first) {
                    wrap.appendChild(first);
                    first = t.firstChild;
                }

                if (!d.offset || d.offset >= d.total) {
                    re(but);
                } else {
                    destroyLoader(but);
                }

                snModal.resize();

                if (d.offset) cur.followersVars[tab].startLoad = false;
            }
        });
    },
    clickRoom: function(id, e, domain) {
        var lnk = '/' + domain;

        var badge_el = geByClass1('rooms_list_item_badge', 'room' + id),
            badge = intval(val(badge_el));
        if (badge > 0) {
            var pid = geByClass1('search_photo', 'room' + id).getAttribute('data-pid');
            photoView.show(pid);
            val(badge_el, '');
            return;
        }

        return snNav(lnk, e, {
            back: 1
        });
    },
    setRoom: function(e) {

        if (e) cancelEvent(e);

        var room_id = cur.roomID > 0 ? cur.roomID : 0;
        cur.setRoomID = room_id;
        delete cur.setRoomChanged;
        delete cur.newRoomID;
        delete cur.startSaveRoom;

        ajax.post('snapster.php', {
            act: 'edit_room',
            room_id: room_id
        }, {
            onDone: function(html, header, langs) {

                cur.lang = extend(cur.lang || {}, langs);

                snModal.fastShow({
                    title: '',
                    content: html,
                    id: 'create_room',
                    cont_class: 'sn_edit_user',
                    size: [530, 'auto'],
                    onClose: function() {
                        if (cur.setRoomID && cur.setRoomChanged) {
                            snNav('/room' + cur.setRoomID);
                        }
                    }
                });

                snModal.setTitle('create_room', header);

                snInput.check(['sn_room_name', 'sn_room_descr']);
                autosizeSetup('sn_room_descr', {
                    maxHeight: 170,
                    onResize: snModal.resize
                });
                snInput.doFocus('sn_room_name');

                cur.editRoomTab = 'settings';
                cur.selectedUsers = {};
                cur.selectedUsersNum = 0;

                delete cur.searchInvCache;

                snSaveButWrap('cr_save_settings', 'init', {
                    save_str: getLang('global_save'),
                    save_js: 'room.saveRoom()',
                    saved_str: cur.lang.saved
                });
                snSaveButWrap('cr_save_members', 'init', {
                    save_str: getLang('global_done'),
                    save_js: 'room.doInviteUsers()',
                    saved_str: getLang('global_save')
                });
            }
        });
    },
    checkFixInviteUserPanel: function() {
        var st = this.scrollTop,
            wh = window.innerHeight;

        var cont = geByClass1('sn_modal_cont', 'sn_modalcreate_room'),
            raw_top = getXY(cont, 1)[1],
            top = Math.abs(st + raw_top),
            h = getSize(cont)[1];

        var s1 = st + wh,
            s2 = top + h;

        if (cur.inviteUserSearchFixed) {
            if (raw_top > 0) {
                removeClass('create_room_search_form', 'create_room_search_form_fix');
                cur.inviteUserSearchFixed = 0;
            }
        } else if (!cur.inviteUserSearchFixed) {
            if (raw_top < 0) {
                addClass('create_room_search_form', 'create_room_search_form_fix');
                cur.inviteUserSearchFixed = 1;
            }
        }

        if (cur.inviteUserPanelFixed) {
            if (s1 > s2) {
                removeClass('create_room_users_bottom', 'fixed');
                cur.inviteUserPanelFixed = 0;
            }
        } else if (!cur.inviteUserPanelFixed) {
            if (s1 < s2) {
                addClass('create_room_users_bottom', 'fixed');
                cur.inviteUserPanelFixed = 1;
            }
        }
    },
    setRoomSwitchNav: function(el) {
        el = ge(el);
        if (hasClass(el, 'sn_modal_item_disabled')) {
            return;
        }
        var tab = el.id.replace('room_edit_', '');
        if (tab == cur.editRoomTab) return;

        var cur_el = ge('room_edit_' + cur.editRoomTab),
            next_el = ge('room_edit_' + tab);

        snModal.moveNavLine(cur_el, next_el, 'room_followers');

        hide('edit_room_' + cur.editRoomTab);
        show('edit_room_' + tab);

        cur.editRoomTab = tab;
        snModal.resize();

        var wrap = ge('sn_modalcreate_room');
        removeEvent(wrap, 'scroll', room.checkFixInviteUserPanel);
        if (tab == 'members') {
            cur.inviteUserPanelFixed = 0;
            cur.inviteUserSearchFixed = 0;

            removeClass('create_room_search_form', 'create_room_search_form_fix');
            removeClass('create_room_users_bottom', 'fixed');

            addEvent(wrap, 'scroll', room.checkFixInviteUserPanel);
            room.checkFixInviteUserPanel.apply(ge('sn_modalcreate_room'), []);

            var first = ge('create_room_users').firstChild;
            removeClass(geByClass1('create_room_user_over', 'create_room_users'), 'create_room_user_over');
            if (first && hasClass(first, 'create_room_user')) {
                addClass(first, 'create_room_user_over');
            }

        }
    },
    selectUser: function(el, uid) {
        if (hasClass(el, 'create_room_user_selected')) {
            removeClass(el, 'create_room_user_selected');
            delete cur.selectedUsers[uid];
            cur.selectedUsersNum--;
        } else {
            addClass(el, 'create_room_user_selected');
            cur.selectedUsers[uid] = 1;
            cur.selectedUsersNum++;
        }
        var btn_str = cur.selectedUsersNum ? langNumeric(cur.selectedUsersNum, cur.lang.add_users_btn_str) : getLang('global_done');
        val('ssbw_cr_save_members_btn', btn_str);
    },
    checkSelectUsers: function() {
        var el = geByClass1('create_room_user', 'create_room_users');
        while (el) {
            if (hasClass(el, 'create_room_user')) {
                var uid = intval(el.getAttribute('data-id'));
                if (cur.selectedUsers[uid]) {
                    addClass(el, 'create_room_user_selected');
                } else {
                    removeClass(el, 'create_room_user_selected');
                }
            }
            el = el.nextSibling;
        }
    },
    onPhoto: function(img) {

        if (img.size > photos.MAX_PHOTO_SIZE) {
            return;
        }

        var type = img.type.split('/');
        if (type[0] != 'image' || !/^(jpg|jpeg|gif|png)$/.test(type[1])) {
            return;
        }

        var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest,
            xhr = new XHR();

        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var url = e.target.result;

                var vkimg = new vkImage();
                vkimg.src = url;
                var width = vkimg.width;
                var height = vkimg.height;


                re('room_cover_src');
                ge('create_room_cover_wr').appendChild(ce('img', {
                    src: url,
                    id: 'room_cover_src'
                }));

                var mleft = 0,
                    mtop = 0,
                    wr_size = 112;
                if (width > height) {
                    var h = wr_size;
                    var w = width / height * wr_size;
                    mleft = Math.max(0, (w - wr_size) / 2);
                } else {
                    var w = wr_size;
                    var h = height / width * wr_size;
                    mtop = Math.max(0, (h - wr_size) / 2);
                }

                setStyle('room_cover_src', {
                    width: w,
                    height: h,
                    'margin-left': -mleft,
                    'margin-top': -mtop
                });
            };
        })(img);
        reader.readAsDataURL(img);

        setStyle('cover_upload_progress', '0px');
        show('cover_upload_wrap');

        xhr.open('POST', cur.uploadServer, true);
        xhr.onload = function(e) {
            hide('cover_upload_wrap');
            var obj, res = xhr.responseText;
            try {
                obj = eval('(' + res + ')');
            } catch (e) {
                obj = q2ajx(res);
            }
            cur.coverPhotoTmp = obj;
        };
        xhr.upload.onprogress = function(e) {
            var persent = Math.floor((e.loaded / e.totalSize) * 100) + '%';
            setStyle('cover_upload_progress', 'height', persent);
            val('cover_upload_persent', persent);
            val('cover_upload_persent1', persent);
        };
        var formData = new FormData();
        formData.append('file1', img);
        xhr.send(formData);
    },
    saveRoom: function(from_invite) {
        room.setRoomSwitchNav('room_edit_settings');

        if (cur.startSaveRoom) return;

        var title = trim(val('sn_room_name')),
            descr = trim(val('sn_room_descr')),
            public = hasClass('sn_switch_public', 'sn_switch_active') ? 1 : 0;

        if (!title) {
            return snInput.error('sn_room_name');
        }

        var room_id = cur.setRoomID;

        var query = {
            act: 'save_room',
            title: title,
            descr: descr,
            public: public,
            ahash: room_id > 0 ? cur.editRoomHash : cur.createRoomHash
        };
        if (cur.coverPhotoTmp) {
            query.save_photo = 1;
            query = extend(query, cur.coverPhotoTmp);
        }
        if (room_id > 0) {
            query.room_id = room_id;
        }
        var invite_ids = Object.keys(cur.selectedUsers);
        if (invite_ids.length > 0) {
            query.invite_ids = invite_ids.slice(0, 255).join(',');
        }

        snSaveButWrap('cr_save_settings', 'loading');

        cur.startSaveRoom = true;
        ajax.post('snapster.php', query, {
            onDone: function(type, msg) {
                delete cur.startSaveRoom;
                hide('sn_edit_save_saved_info', 'sn_edit_save_error', 'sn_edit_save_loader');

                var err = false;
                switch (type) {
                    case 'error':
                        err = true;
                        break;
                    case 'bad_name':
                        err = true;
                        snInput.error('sn_edit_name');
                        break;
                }

                if (err) {
                    room.setRoomSwitchNav('room_edit_settings');
                    snSaveButWrap('cr_save_settings', 'error', {
                        err_msg: msg
                    });
                } else {
                    cur.setRoomChanged = true;
                    if (msg) {
                        cur.setRoomID = intval(type);
                        cur.newRoomID = intval(type);
                    }
                    snSaveButWrap('cr_save_settings', 'success', {
                        callback: function() {
                            /*if (from_invite) {
                              return room.doInviteUsers();
                            }*/
                            if (msg && !invite_ids.length) {
                                room.setRoomSwitchNav('room_edit_members');
                                snSaveButWrap('cr_save_settings', 'restore');
                                cur.editRoomHash = msg;
                            } else {
                                snModal.close();
                            }
                        }
                    });
                }
            }
        });
    },
    doInviteUsers: function() {
        return room.saveRoom(1);
        /*
        room.setRoomSwitchNav('room_edit_members');

        var invite_ids = Object.keys(cur.selectedUsers);
        if (invite_ids.length == 0) {
          snModal.close('create_room');
        } else {
          snSaveButWrap('cr_save_members', 'loading');
          snModal.disableClose();
          addClass('room_edit_settings', 'sn_modal_item_disabled');

          invite_ids = invite_ids.slice(0, 255);
          ajax.post('snapster.php', {act: 'send_invites', room_id: cur.setRoomID, ids: invite_ids}, {
            onDone: function(err_msg) {
              if (err_msg) {
                snSaveButWrap('cr_save_members', 'error', {
                  err_msg: err_msg
                });
              } else {
                cur.setRoomChanged = true;
                snSaveButWrap('sn_edit_save_wrap', 'success', {
                  callback: function() {
                    snModal.close();
                  }
                });
              }
            }
          });
        }*/
    },
    searchInviteUsersKeyDown: function(e) {
        if (!inArray(e.keyCode, [KEY.DOWN, KEY.UP, KEY.ENTER, KEY.ESC])) {
            return;
        }
        cancelEvent(e);
        if (e.keyCode != KEY.ESC) {
            var cur_el = geByClass1('create_room_user_over', 'create_room_users');
            if (!cur_el) return;
        }
        switch (e.keyCode) {
            case KEY.DOWN:
                var next = cur_el.nextSibling;
                if (!next) {
                    next = ge('create_room_users').firstChild;
                }
                removeClass(cur_el, 'create_room_user_over');
                addClass(next, 'create_room_user_over');
                cur_el = next;
                break;
            case KEY.UP:
                var prev = cur_el.previousSibling;
                if (!prev) {
                    prev = ge('create_room_users').lastChild;
                }
                removeClass(cur_el, 'create_room_user_over');
                addClass(prev, 'create_room_user_over');
                cur_el = prev;
                break;
            case KEY.ENTER:
                cur_el.click();
                break;
            case KEY.ESC:
                val('search_invite_query', '');
                room.searchInviteUsers();
                break;
        }

        var wrap = ge('sn_modalcreate_room'),
            st = wrap.scrollTop,
            wH = window.innerHeight,
            mtop = Math.abs(st + getXY(cur_el)[1]);

        var top = (st + 96 + 44) - mtop;
        if (top > 0) {
            wrap.scrollTop -= top;
        }

        var bottom = (mtop + 57 + 67) - (st + wH);
        if (bottom > 0) {
            wrap.scrollTop += bottom + 1;
        }

    },
    searchInviteUsers: function(e) {
        if (e && inArray(e.keyCode, [KEY.DOWN, KEY.UP, KEY.ENTER, KEY.ESC])) {
            return;
        }

        var q = trim(val('search_invite_query'));
        if (q == cur.lastInvQuery) return;
        cur.lastInvQuery = q;

        clearTimeout(cur.searchInviteUsersTimer);

        if (!cur.searchInvCache) cur.searchInvCache = {};
        if (cur.searchInvCache[q]) {
            return room.searchInviteUsersDone(cur.searchInvCache[q]);
        }

        cur.searchInviteUsersTimer = setTimeout(function() {
            writeLoader('create_room_search_loader', 20);
            cur.searchInviteUsersLoading = 1;
            ajax.post('snapster.php', {
                act: 'search_invite_users',
                room_id: cur.roomID,
                q: q
            }, {
                onDone: function(d) {
                    cur.searchInvCache[q] = d;
                    if (q != cur.lastInvQuery) {
                        return;
                    }
                    room.searchInviteUsersDone(d);
                }
            });
        }, 300);
    },
    searchInviteUsersDone: function(res) {
        val('create_room_search_loader', '');
        val('create_room_users', res);
        snModal.scrolToTop();
        room.checkFixInviteUserPanel.apply(ge('sn_modalcreate_room'), []);

        room.checkSelectUsers();

        var first = ge('create_room_users').firstChild;
        if (first && hasClass(first, 'create_room_user')) {
            addClass(first, 'create_room_user_over');
        }

        cur.searchInviteUsersLoading = 0;
    },
    searchInviteUserOver: function(el) {
        removeClass(geByClass1('create_room_user_over', 'create_room_users'), 'create_room_user_over');
        addClass(el, 'create_room_user_over');
    },
    accpetInvite: function(id, e, hash) {
        cancelEvent(e);
        val(ge('rooms_list_actions' + id), cur.lang.invite_accepted);
        cur.roomsOffset--;
        ajax.post('snapster.php', {
            act: 'accept_invite',
            room_id: id,
            hash: hash
        }, {
            onDone: function() {}
        });
    },
    rejectInvite: function(id, e, hash, target) {
        cancelEvent(e);
        if (target == 'view_room') {
            re('room_invited_info');
            snNav('/rooms/invites');
        } else {
            val(ge('rooms_list_actions' + id), cur.lang.inivte_rejected);
            cur.roomsOffset--;
        }
        ajax.post('snapster.php', {
            act: 'reject_invite',
            room_id: id,
            hash: hash
        }, {
            onDone: function() {}
        });
    },
    openRoomInApp: function(room_id) {
        room.openLinkInApp('room' + room_id);
    },
    openInviteLink: function(hash) {
        room.openLinkInApp('i/' + hash);
    },
    openLinkInApp: function(link) {
        /*setTimeout(function() {
          if (document.hidden) {
            return;
          }
          if (browser.iphone) {
            window.location = 'https://itunes.apple.com/app/id1016603298';
          } else {
            window.location = 'https://play.google.com/store/apps/details?id=com.vk.snapster';
          }
        }, 1000);*/
        window.location = 'snapster://snapster.io/' + link;
    }
};

var photoView = {
    BOX_ID: 'photo_view',
    show: function(id, opts) {
        delete cur.pwPendingShow;
        delete cur.startLoadBeforeComments;

        if (!opts) opts = {};

        if (!cur.photosData || opts.forceServer) {
            cur.photosData = {};
        }

        if (cur.pwShown && opts.forceServer) {
            photoView.close();
        }

        if (!cur.pwShown) {

            if (!cur.photosData[id]) {
                if (opts.no_server) {
                    return photoView.notFoundError();
                } else {
                    return photoView.loadPhotosInfo(id, {
                        with_loader: 1,
                        comment_id: opts.comment_id,
                    });
                }
            }

            photoView.showBox(id, {
                no_server: opts.no_server,
            });
        }

        cur.viewPhoto = id;
        cur.pwCanMore = false;
        cur.replyToID = cur.replyToName = false;
        val('sn_pw_comm_txt', '');
        delete cur.pwLoading;

        if (!opts.no_sh_link) {
            var loc = location.pathname;
            if (loc.indexOf('photo=') == -1) {
                cur.photoViewLoc = loc;
            }
            if (!cur.photoViewLoc) {
                cur.photoViewLoc = 'room' + cur.roomID;
            }
            var h = location.pathname + '?photo=' + id;
            if (opts.comment_id) {
                h += '&comment_id=' + opts.comment_id;
            }
            history.pushState({
                h: h
            }, false, h);
        }

        var data = cur.photosData[id];

        var imgEl = ge('sn_pw_image'),
            size = photoView.getBigSrc(data.sizes);
        cur.photoSize = size;

        if (ge('photo' + id)) {
            imgEl.src = data.src;

            photoView.resizeImage();

            var img = new vkImage();
            img.onload = function() {
                if (cur.viewPhoto != id) return;
                imgEl.src = data.sizes[size];
            };
            img.src = data.sizes[size];
        } else {
            imgEl.src = '';
            imgEl.src = data.sizes[size];
            photoView.resizeImage();
        }

        var author = data.author;
        var author_info = '<div class="sn_photo_view_info_ava_wr fl_l bsbb">\
      <a href="/room-' + data.owner_id + '" onClick="return snNav(this, event);"><img src="' + author.ava + '" class="sn_photo_view_info_ava" /></a>\
    </div>\
    <div class="sn_photo_view_info_cont">\
      <a href="/room-' + data.owner_id + '" onClick="return snNav(this, event);" class="sn_photo_view_info_name">' + author.name + '</a>\
      <div class="sn_photo_view_info_date">' + author.date + '</div>\
    </div>\
    <div class="clear"></div>';
        val('sn_pw_user_info', author_info);

        if (data.short_descr) {
            var descr = data.short_descr + '<span class="sn_pw_descr_cont" id="sn_pw_descr_cont" onmouseover="photoView.descrOver()" onmouseout="photoView.descrOut();">' + data.full_descr + '<div class="sn_pw_descr_hide" onClick="photoView.expandDescr();">��������</div></span> <span class="sn_pw_more_descr" onClick="photoView.expandDescr();">�������� ��������� �</span>';
        } else {
            var descr = data.full_descr;
        }

        val('sn_pw_descr', descr);
        setStyle('sn_pw_descr', 'height', 'auto');

        comments.updateCommentsNum();

        cur.shownPwDescr = false;

        var comments_html = '<div id="sn_pw_comments_result">' + data.comments + '</div>';
        if (data.comments_count > 9 && data.loadedComments < data.comments_count) {
            comments_html = '<div id="sn_comment_more" onClick="comments.loadMore();">' + cur.lang.chronicle_show_more_comments + '</div>' + comments_html;
        }
        val('sn_pw_comments', comments_html);

        cur.photoViewScroll.update(0, 1);

        if (data.user_likes) {
            addClass(geByClass1('sn_pw_heart'), 'sn_pw_heart_liked');
            addClass('sn_pw_like_ic', 'sn_pw_like_active');
        } else {
            removeClass(geByClass1('sn_pw_heart'), 'sn_pw_heart_liked');
            removeClass('sn_pw_like_ic', 'sn_pw_like_active');
        }
        photoView.changeLikeNum(data.likes_count);

        setTimeout(function() {
            photoView.commScrollBottom();
            snModal.resize();
            cur.pwCanMore = true;
        });
        snModal.resize();

        if (cur.deletedPhotos && cur.deletedPhotos[id]) {
            photoView.deletePhoto(1);
        } else {
            val('pw_info_wr', '');
        }

        photoView.checkLoaders();
        photoView.checkActions();
        photoView.loadNextPrev();

        ge('sn_pw_comm_txt').focus();

        if (opts.comment_id) {
            setTimeout(function() {
                photoView.scrollToComment(opts.comment_id);
            }, 1);
        }
    },
    getBigSrc: function(sizes) {
        var ww = window.innerWidth,
            size = 0;

        if (window.devicePixelRatio > 1.5) {
            ww *= 2;
        }

        for (var i in sizes) {
            size = i;
            if (i >= ww) {
                break;
            }
        }
        return parseInt(size);
    },
    commScrollBottom: function() {
        cur.photoViewScroll.update(0, 1);
        var top = cur.photoViewScroll.obj.scrollHeight;
        cur.photoViewScroll.scrollTop(top);
    },
    infoWrapWidth: 330,
    resizeImage: function(from_queue) {
        if (!cur.viewPhoto || is_mob || cur.pwLoading) return;


        var data = cur.photosData[cur.viewPhoto],
            width = window.innerWidth,
            height = window.innerHeight;

        //var is_mob = width <= 750;

        //if (width > cur.photoSize) {
        width -= 120; // padding
        height -= 50;
        //}

        var info_wrap_width = photoView.infoWrapWidth;

        removeClass(geByClass1('sn_photo_view'), 'sn_photo_view_vertical');

        var h = Math.max(400, height);
        var imageH = Math.min(h, data.height / data.width * h, data.height);
        var wrapH = Math.max(h, imageH);
        var imageW = Math.min(width, (data.width / data.height * h));
        var wrapW = Math.min(wrapH * 1.7, width) - info_wrap_width;

        imageW = Math.min(imageW, wrapW);
        imageH = data.height / data.width * imageW;

        var cont = geByClass1('sn_modal_cont', 'sn_modal' + photoView.BOX_ID);
        setStyle(cont, {
            width: (wrapW - 2 + info_wrap_width) + 'px',
            height: wrapH
        });
        setStyle('sn_photo_view_image_wr', {
            width: (wrapW) + 'px',
            height: wrapH
        });
        setStyle('sn_pw_image', {
            width: (imageW) + 'px',
            height: imageH
        });

        if (is_mob) {
            return;
        }
        var left = getXY(cont)[0];
        setStyle('sn_pw_prev_wrap', 'width', left + 'px');
        setStyle('sn_pw_next_wrap', {
            width: left + 'px',
            left: (left + wrapW + info_wrap_width) + 'px'
        });

        var formH = getSize('sn_pw_comm_form')[1],
            infoH = getSize('sn_pw_inf_wr')[1],
            commH = wrapH - formH - infoH;

        setStyle('sn_pw_comments', 'height', commH + 'px');
        cur.photoViewScroll.update(0, 1);

        setStyle('sn_pw_descr_cont', 'max-height', wrapH - commH);

        if (from_queue !== 1) {
            photoView.commScrollBottom();
        }
    },
    showBox: function(id, opts) {

        if (!opts) {
            opts = {};
        }

        if (vk.id > 0) {
            var heart_html = '<div class="sn_pw_heart_over_area">\
        <div class="sn_pw_heart_wrap" id="sn_pw_heart_wrap" onClick="photoView.checkLike(event, this);">\
          <div class="sn_pw_heart icon-heart"></div>\
        </div>\
      </div>';
        } else {
            var heart_html = '';
        }

        var cont = '<div class="sn_photo_view_image_wr" id="sn_photo_view_image_wr" onClick="photoView.next();">\
      <img src="" id="sn_pw_image" />\
      ' + heart_html + '\
    </div>\
    <div class="sn_photo_view_info bsbb" id="sn_photo_view_info">\
      <div id="pw_info_wr"></div>\
      <div id="sn_pw_inf_wr">\
        <div class="sn_pw_head">\
          <div id="pw_actions" class="sn_photo_view_actions icon-actions">\
            <div id="sn_pw_actions_list"></div>\
          </div>\
          <div class="sn_pw_user_info" id="sn_pw_user_info"></div>\
          <div class="sn_pw_descr" id="sn_pw_descr"></div>\
        </div>\
        <div class="sn_pw_likes_wr no_select">\
          <div class="sn_pw_like_ic icon-heart_outline" id="sn_pw_like_ic" onClick="photoView.checkLike(event);">\
            <div class="sn_pw_liked_ic icon-heart"></div>\
          </div>\
          <div class="sn_pw_like_str" id="sn_pw_like_str" onClick="photoView.checkLike(event);"></div>\
          <div class="clear"></div>\
        </div>\
        <div class="sn_pw_comments_count" id="sn_pw_comments_count"></div>\
      </div>\
      <div class="sn_pw_comm_wr">\
        <div class="sn_pw_comments" id="sn_pw_comments"></div>\
      </div>\
      <div class="sn_pw_comm_form" id="sn_pw_comm_form" ' + (vk.id == 0 ? 'onClick="snShowLoginBox()"' : '') + '>\
        <img src="' + cur.userAva50 + '" class="sn_pw_comm_form_ava fl_l" />\
        <div class="sn_pw_comm_form_area_wr">\
          <textarea placeholder="' + cur.lang.chronicle_add_comment + '" id="sn_pw_comm_txt" class="sn_pw_comm_form_area bsbb" ' + (vk.id > 0 ? 'onkeydown="if(event.keyCode == KEY.ENTER) comments.add(event);"' : '') + '></textarea>\
        </div>\
        <div class="clear"></div>\
      </div>\
    </div>';

        // pagination
        cont += '<div class="sn_pw_prev_wrap sn_pw_wrap_disabled" id="sn_pw_prev_wrap" onClick="photoView.prev();">\
      <div class="sn_pw_prev_wrap_arrow">\
        <div class="sn_pw_prev_wrap_arrow_line"></div>\
        <div class="sn_pw_prev_wrap_arrow_line"></div>\
      </div>\
      <div class="sn_pw_pagination_loader" id="sn_pw_prev_loader"></div>\
    </div>';

        cont += '<div class="sn_pw_prev_wrap sn_pw_next_wrap sn_pw_wrap_disabled" id="sn_pw_next_wrap" onClick="photoView.next();">\
      <div class="sn_pw_prev_wrap_arrow">\
        <div class="sn_pw_prev_wrap_arrow_line"></div>\
        <div class="sn_pw_prev_wrap_arrow_line"></div>\
      </div>\
      <div class="sn_pw_pagination_loader sn_pw_pagination_loader_next" id="sn_pw_next_loader"></div>\
    </div>';


        cur.pwShown = true;

        snModal.close('pw_loader');
        snModal.show({
            id: photoView.BOX_ID,
            cont_class: 'sn_photo_view',
            size: [600, 'auto'],
            content: cont,
            onResize: photoView.resizeImage,
            close: photoView.close
        });
        autosizeSetup('sn_pw_comm_txt', {
            maxHeight: 60,
            onResize: photoView.resizeImage
        });

        var keys = Object.keys(cur.photosData);
        cur.photoIndex = indexOf(keys, id);

        browser.safari_mobile = 1;
        cur.photoViewScroll = new Scrollbar('sn_pw_comments', {
            prefix: '',
            nokeys: true,
            scrollChange: function(e) {
                if (cur.pwCanMore && cur.photoViewScroll.obj.scrollTop == 0) {
                    comments.loadMore();
                }
            }
        });

        delete cur.pwNoMore;

        cur.pwListId = vkNow();
        if (!cur.photosData[id]) {
            photoView.loadPhotosInfo(id);
        }
    },
    getCurPos: function() {
        var pos = -1;
        if (cur.pwList) {
            for (var i in cur.pwList) {
                if (cur.pwList[i] == cur.viewPhoto) {
                    if (pos != -1) {
                        console.log('double', cur.pwList[i], i, pos);
                    }
                    pos = parseInt(i);
                }
            }
        }
        return pos;
    },
    next: function() {
        if (cur.pwPendingShow == 'next' || !cur.pwList) {
            return;
        }

        var pos = photoView.getCurPos() + 1,
            len = cur.pwList.length;
        if (pos >= len) {
            if (cur.pwTotal > len && cur.pwStartFrom < cur.pwTotal) {
                cur.pwPendingShow = 'next';
                photoView.checkLoaders();
                photoView.loadNext();
            }
            return;
        }

        if (len < cur.pwTotal && len - pos <= 10) {
            photoView.loadNext(1);
        }

        photoView.show(cur.pwList[pos]);
    },
    prev: function() {
        if (cur.pwPendingShow == 'prev' || !cur.pwList) {
            return;
        }

        var pos = photoView.getCurPos() - 1;
        if (pos < 0) {
            if (cur.pwOffset) {
                cur.pwPendingShow = 'prev';
                photoView.checkLoaders();
                photoView.loadPrev();
            }
            return;
        }

        if (pos <= 10 && cur.pwOffset) {
            photoView.loadPrev(1);
        }

        photoView.show(cur.pwList[pos]);
    },
    close: function() {
        cur.pwShown = false;
        cur.viewPhoto = false;

        snModal.customClose = false;
        snModal.close();

        history.replaceState({
            h: cur.photoViewLoc
        }, false, cur.photoViewLoc);
        delete cur.photoViewLoc;
    },
    keyDown: function(e) {

        if (e.target.id == 'sn_pw_comm_txt' && val(e.target).length > 0) {
            return;
        }

        switch (e.keyCode) {
            case KEY.RIGHT:
            case KEY.SPACE:
                cancelEvent(e);
                photoView.next();
                break;
            case KEY.LEFT:
                cancelEvent(e);
                photoView.prev();
                break;
        }
    },
    checkLike: function(e, el) {
        cancelEvent(e);

        if (vk.id == 0) return snShowLoginBox();

        if (!el) {
            var big = false;
            el = ge('sn_pw_heart_wrap');
        } else {
            var big = true;
        }

        var heart = geByClass1('sn_pw_heart', el),
            data = cur.photosData[cur.viewPhoto];
        if (hasClass(heart, 'sn_pw_heart_liked')) {
            removeClass(heart, 'sn_pw_heart_liked');
            var pref = 'un';
            data.likes_count--;
            data.user_likes = false;
            removeClass('likes_heart' + cur.viewPhoto, 'photo_like_icon_active');
            removeClass('sn_pw_like_ic', 'sn_pw_like_active');
        } else {
            photoView.addLike();
            addClass(heart, 'sn_pw_heart_liked');
            var pref = '';
            data.likes_count++;
            data.user_likes = true;
            addClass('likes_heart' + cur.viewPhoto, 'photo_like_icon_active');
            addClass('sn_pw_like_ic', 'sn_pw_like_active');
            if (!big) {
                addClass('sn_pw_like_ic', 'sn_pw_liked_ic_anim');
                setTimeout(function() {
                    removeClass('sn_pw_like_ic', 'sn_pw_liked_ic_anim');
                }, 500);
            }
        }

        var exp = cur.viewPhoto.split('_');
        var hash = cur.photosData[cur.viewPhoto].hash;

        val('likes_num' + cur.viewPhoto, data.likes_count ? data.likes_count : '');

        photoView.changeLikeNum(data.likes_count);

        ajax.post('/snapster.php', {
            act: pref + 'like',
            owner_id: exp[0],
            pid: exp[1],
            hash: hash
        }, {
            onDone: function(d) {

            }
        });
    },
    changeLikeNum: function(num) {
        if (num > 0) {
            var num_str = langNumeric(num, cur.lang.chronicle_N_liked, 1);
            var str = cur.lang.chronicle_like_pref + ' <a href="/" class="sn_pw_like_num" onClick="photoView.showLikesList(event)">' + num_str + '</a>';
        } else {
            var str = cur.lang.chronicle_like;
        }
        val('sn_pw_like_str', str);
    },
    addLike: function() {
        addClass('sn_pw_heart_wrap', 'sn_pw_heart_anim');
        setTimeout(function() {
            removeClass('sn_pw_heart_wrap', 'sn_pw_heart_anim');
        }, 500);
    },
    expandDescr: function(force_close) {
        var el = ge('sn_pw_descr_cont'),
            wr = ge('sn_pw_descr');
        clearTimeout(cur.pwDescrHideTimer);
        if (!hasClass(el, 'sn_pw_descr_cont_shown') && !force_close) {
            setStyle(wr, 'height', getSize(wr)[1]);
            addClass(el, 'sn_pw_descr_cont_shown');
            cur.shownPwDescr = true;
        } else {
            removeClass(el, 'sn_pw_descr_cont_shown');
            setStyle(wr, 'height', 'auto');
            cur.shownPwDescr = false;
        }
    },
    descrOut: function() {
        cur.pwDescrHideTimer = setTimeout(photoView.expandDescr, 3000);
    },
    descrOver: function() {
        clearTimeout(cur.pwDescrHideTimer);
    },
    showLikesList: function(e) {
        cancelEvent(e);

        var cont = '<div class="search_hints_loader">' + writeLoader(-1, 50) + '</div>';
        snModal.fastShow({
            id: 'likers',
            title: cur.lang.chronicle_likers_title,
            content: cont,
            size: [500, 'auto'],
            onMore: photoView.moreLikers,
            cont_class: 'sn_followers_box'
        });

        ajax.post('snapster.php', {
            act: 'get_likers',
            pid: cur.viewPhoto
        }, {
            onDone: function(d) {
                cur.likersStartLoad = false;
                cur.likersOffset = d.offset;
                cur.likersTotal = d.offset;
                snModal.setContent('likers', d.html);
            }
        });
    },
    moreLikers: function() {
        if (cur.likersStartLoad) return;
        cur.likersStartLoad = true;

        var but = ge('followers_more');
        if (!but) return;

        var but_str = val(but);
        writeLoader(but, 43);
        addClass(but, 'moreBut_loading');

        var pid = cur.viewPhoto;

        ajax.post('snapster.php', {
            act: 'get_likers',
            pid: pid,
            offset: cur.likersOffset
        }, {
            onDone: function(d) {
                if (!d || pid != cur.viewPhoto) return;
                cur.likersOffset = d.offset;
                cur.likersTotal = d.total;

                var t = ce('div', {
                        innerHTML: d.html
                    }),
                    first = t.firstChild,
                    wrap = ge('followers_result');
                while (first) {
                    wrap.appendChild(first);
                    first = t.firstChild;
                }

                if (!cur.likersOffset || cur.likersOffset >= cur.likersTotal) {
                    re(but);
                } else {
                    val(but, but_str);
                    removeClass(but, 'moreBut_loading');
                }

                snModal.resize();

                if (cur.likersOffset) cur.likersStartLoad = false;
            }
        });
    },
    loadPhotosInfo: function(photo, opts) {

        if (!opts) {
            opts = {};
        }

        if (opts.with_loader) {
            snModal.show({
                id: 'pw_loader',
                content: '<div id="pw_loader"></div>',
                size: [70, 70],
                disable_close: 1,
                cont_class: 'sn_pw_loader'
            });
            writeLoader('pw_loader', 70);
        }

        cur.pwLoadingPrev = true;
        cur.pwLoadingNext = true;
        var lid = cur.pwListId;

        var query = {
            act: 'photos_info',
            photo: photo
        };
        if (opts.comment_id) {
            query.comment_id = opts.comment_id;
        }

        ajax.post('snapster.php', query, {
            onDone: function(data, list, offset, startFrom, total, room_id, extened_data) {
                if (cur.pwListId != lid) {
                    console.log('BAD LIST')
                    return;
                }
                delete cur.pwLoadingPrev;
                delete cur.pwLoadingNext;

                cur = extend(cur, extened_data);

                cur.pwOffset = offset;
                cur.pwTotal = total;
                cur.pwStartFrom = startFrom;
                cur.pwList = list;
                cur.pwRoomID = room_id;
                cur.photosData = extend(cur.photosData || {}, data);

                photoView.checkLoaders();

                if (opts.with_loader) {
                    photoView.show(photo, {
                        no_server: 1,
                        comment_id: opts.comment_id
                    });
                }
            }
        });
    },
    loadPrev: function(noShow, after) {
        var lid = cur.pwListId;

        var query = {
            act: 'photos_info',
            photo: cur.viewPhoto,
            room_id: cur.pwRoomID
        };
        if (after) {
            if (cur.pwLoadingNext || cur.pwStartFrom >= cur.pwTotal) {
                return;
            }
            cur.pwLoadingNext = true;
            query.offset = cur.pwStartFrom;
            query.after = 1;
        } else {
            if (cur.pwLoadingPrev || cur.pwTotal == 1) {
                return;
            }
            cur.pwLoadingPrev = true;
            query.before = 1;
            query.offset = cur.pwOffset;
        }

        var pid = cur.viewPhoto;
        ajax.post('snapster.php', query, {
            onDone: function(data, list, offset, startFrom, total) {
                if (cur.pwListId != lid) {
                    return;
                }
                if (after) {
                    delete cur.pwLoadingNext;
                    cur.pwStartFrom = startFrom;
                } else {
                    delete cur.pwLoadingPrev;
                    cur.pwOffset = offset;
                }

                cur.pwTotal = total;

                if (after) {
                    cur.pwList = cur.pwList.concat(list);
                } else {
                    cur.pwList = list.concat(cur.pwList);
                }
                cur.photosData = extend(cur.photosData || {}, data);

                photoView.checkLoaders();

                if (!noShow && pid == cur.viewPhoto || (cur.pwPendingShow == 'next' && after) || (cur.pwPendingShow == 'prev' && !after)) {
                    delete cur.pwPendingShow;
                    if (after) {
                        photoView.next();
                    } else {
                        photoView.prev();
                    }
                }
            },
            onFail: function() {
                if (after) {
                    delete cur.pwLoadingNext;
                } else {
                    delete cur.pwLoadingPrev;
                }
            }
        });
    },
    loadNext: function(noShow) {
        noShow = noShow || false;
        return photoView.loadPrev(noShow, 1);
    },
    checkLoaders: function(target) {
        var pos = photoView.getCurPos();

        // prev
        if (pos > 0 || cur.pwOffset > 0) {
            removeClass('sn_pw_prev_wrap', 'sn_pw_wrap_disabled');
        } else {
            addClass('sn_pw_prev_wrap', 'sn_pw_wrap_disabled');
        }
        if ((!cur.pwList || pos == 0) && cur.pwPendingShow == 'prev') {
            addClass('sn_pw_prev_wrap', 'sn_pw_wrap_pending');
            writeLoader('sn_pw_prev_loader', 30);
        } else {
            removeClass('sn_pw_prev_wrap', 'sn_pw_wrap_pending');
            val('sn_pw_prev_loader', '');
        }

        // next
        if (cur.pwList && pos < cur.pwList.length - 1 || cur.pwTotal > cur.pwStartFrom) {
            removeClass('sn_pw_next_wrap', 'sn_pw_wrap_disabled');
        } else {
            addClass('sn_pw_next_wrap', 'sn_pw_wrap_disabled');
        }
        if ((!cur.pwList || pos == cur.pwList.length - 1) && cur.pwPendingShow == 'next') {
            addClass('sn_pw_next_wrap', 'sn_pw_wrap_pending');
            writeLoader('sn_pw_next_loader', 30);
        } else {
            removeClass('sn_pw_next_wrap', 'sn_pw_wrap_pending');
            val('sn_pw_next_loader', '');
        }
    },
    deletePhoto: function(noRequest) {
        var str = cur.lang.photo_deleted.replace('{link}', '<a href="/" onClick="photoView.restorePhoto(event);">').replace('{/link}', '</a>');
        var deleted_info = '<div class="sn_pw_photo_deleted">\
      <div class="sn_pw_photo_deleted_str">' + str + '</div>\
    </div>';
        val('pw_info_wr', deleted_info);

        if (!noRequest) {
            photos.deletePhoto(cur.viewPhoto);
        }
    },
    restorePhoto: function(e) {
        cancelEvent(e);
        writeLoader(geByClass1('sn_pw_photo_deleted_str', 'pw_info_wr'), 30);
        var pid = cur.viewPhoto;
        ajax.post('snapster.php', {
            act: 'restore_photo',
            pid: pid,
            hash: cur.photosData[pid].delete_hash
        }, {
            onDone: function(res) {
                if (res == 1) {
                    if (cur.viewPhoto == pid) {
                        val('pw_info_wr', '');
                    }
                    delete cur.deletedPhotos[pid];
                } else {
                    if (cur.viewPhoto == pid) {
                        val(geByClass1('sn_pw_photo_deleted_str', 'pw_info_wr'), getLang('global_error'));
                    }
                }
            }
        });
    },
    checkActions: function() {
        var owner_id = cur.viewPhoto.split('_')[0];
        if (owner_id != vk.id) {
            hide('pw_actions');
        } else {
            show('pw_actions');
            var actions = '<div class="sn_pw_actions_item" onClick="photoView.deletePhoto();">' + cur.lang.delete_photo + '</div>';
            val('sn_pw_actions_list', actions);
        }
    },
    loadNextPrev: function() {
        var pos = photoView.getCurPos();
        if (pos == -1) return;

        var next = cur.pwList[pos + 1];
        if (next) {
            var next_img = new vkImage();
            var data = cur.photosData[next];
            next_img.src = data.sizes[photoView.getBigSrc(data.sizes)];
        }

        var prev = cur.pwList[pos - 1];
        if (prev) {
            var prev_img = new vkImage();
            var data = cur.photosData[prev];
            prev_img.src = data.sizes[photoView.getBigSrc(data.sizes)];
        }
    },
    notFoundError: function() {
        snModal.close();
        snModal.fastShow({
            title: getLang('global_error'),
            content: '<div class="sn_modal_box_alert">' + cur.lang.photo_not_found + '</div>'
        });
    },
    scrollToComment: function(cid) {
        cid = parseInt(cid);
        if (cid <= 0) {
            return;
        }
        var el = ge('comment' + cid),
            wrap = ge('sn_pw_comments'),
            size = getSize(wrap),
            top = el.offsetTop;

        cur.photoViewScroll.scrollTop(top - size[1] / 2);

        setStyle(el, 'background', 'rgb(230, 228, 172)');
        setTimeout(function() {
            animate(el, {
                backgroundColor: '#fff'
            }, 2000);
        }, 3000);
    },
};

function snCheckMediaUrl() {
    var photo = location.href.match(/photo\=([0-9\-\_]+)/i);
    if (photo) {

        if (cur.viewPhoto == photo[1]) {
            return;
        }

        var comment_id = location.href.match(/comment_id\=([0-9\-\_]+)/i);
        if (comment_id) {
            comment_id = comment_id[1];
        } else {
            comment_id = 0;
        }
        photoView.show(photo[1], {
            no_sh_link: 1,
            comment_id: comment_id
        });
        return 1;
    }
    return 0;
}

function snInitPage() {
    vk.loaded = true;

    snCheckMediaUrl();

    if (vk.id > 0 && window.snNotify) {
        snNotify.initPad()
    }

    setTimeout(function() {
        removeEvent(window, 'popstate');
        addEvent(window, 'popstate', function(e) {
            cancelEvent(e);

            var h = location.href.replace(/^https?:\/\/([a-zA-Z]+\.)snapster\.io/, '');

            if (snCheckMediaUrl()) {
                return 0;
            }

            snNav(h);

            if (cur.pwShown) {
                photoView.close();
            }

        });
    }, 1000);

    window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost);
    if (__dev) __debugMode = true;

    cur.startLoadHints = true;

    onWinResize();
}

function snNav(h, e, opts) {

    var hints_tmp = cur.hintsList;

    removeEvent(window, 'scroll');
    removeEvent(window, 'resize', room.updatePhotos);

    if (cur.headDDShown) {
        clickHeadDropDown(1);
    }

    if (!opts) opts = {};

    var params = {
        onDone: function(res) {

            if (window.snNotify && snNotify.padShown) {
                snNotify.hidePad();
            }

            cur.wrapWidth = 0;
            search.hide();

            cur.pwShown && photoView.close();
            snModal.closeAll();
            search.hide();

            onWinResize();

            cur.hintsList = hints_tmp;
        }
    };

    if (opts.back) {
        params.back = 1;
    }

    return nav.go(h, e, params);
}

function checkLeftPanelFix() {

    if (is_mob) {
        return;
    }

    var panel = ge('sn_room_info_wrap'),
        size = getSize(panel);
    var cont = ge('wrap3'),
        contSize = getSize(cont);
    var winH = window.innerHeight,
        scrollTop = window.scrollGetY();

    size[1] += 30;

    var offset = 0;
    winH -= getSize('site_head')[1];

    if (winH < size[1]) {
        offset = Math.min(size[1] - winH, scrollTop);
    }

    offset = Math.max(0, offset, (scrollTop + size[1]) - contSize[1]);

    if (offset == cur.lastPanelOffset) return;

    cur.lastPanelOffset = offset;
    setStyle(panel, 'margin-top', '-' + offset + 'px');
}

var snUser = {
    edit: function() {
        ajax.post('snapster.php', {
            act: 'user_edit'
        }, {
            onDone: function(cont, data, hash) {
                snModal.show({
                    content: cont,
                    size: [500, 'auto'],
                    cont_class: 'sn_edit_user',
                    id: 'edit_user',
                    no_close_btn: 1
                });

                snInput.check(['sn_edit_name', 'sn_edit_lname', 'sn_edit_status']);
                snUser.changeGender((data.gender == 1 ? 'fe' : '') + 'male');

                if (data.change_name) {
                    snInput.disable(['sn_edit_name', 'sn_edit_lname']);
                }

                snSaveButWrap('sn_edit_save_wrap', 'init', {
                    save_str: getLang('global_save'),
                    save_js: 'snUser.save(\'' + hash + '\')',
                    saved_str: cur.lang.saved
                });

                cur.editData = data;
            }
        });
        cur.editGender = 'male';
    },
    changeGender: function(gender) {
        if (cur.editGender == gender) return;
        removeClass('sn_edit_gender_' + cur.editGender, 'sn_radio_item_active');
        addClass('sn_edit_gender_' + gender, 'sn_radio_item_active');
        cur.editGender = gender;
    },
    shangeNameCancel: function(el, e) {
        cancelEvent(e);
        re(el.parentNode);

        var dat = cur.editData.change_name;
        if (dat) {
            val('sn_edit_name', dat.name);
            val('sn_edit_lname', dat.lname);
        }

        snInput.undisable(['sn_edit_name', 'sn_edit_lname']);
        snModal.resize();

        ajax.post('snapster.php', {
            act: 'cancel_change_name',
            hash: dat.hash,
            rid: dat.rid
        }, {
            onDone: function() {}
        });
    },
    save: function(hash) {
        var status = val('sn_edit_status'),
            name = trim(val('sn_edit_name')),
            lname = trim(val('sn_edit_lname')),
            gender = cur.editGender == 'male' ? 2 : 1;

        if (name.length == 0 || !name.match(/^([a-zA-Z�-��-�]+)$/)) {
            return snInput.error('sn_edit_name');
        }

        if (lname.length == 0 || !lname.match(/^([a-zA-Z�-��-�]+)$/)) {
            return snInput.error('sn_edit_lname');
        }

        snSaveButWrap('sn_edit_save_wrap', 'loading');

        snModal.disableClose();

        ajax.post('snapster.php', {
            act: 'save_user',
            hash: hash,
            name: name,
            lname: lname,
            status: status,
            gender: gender
        }, {
            onDone: function(type, msg) {
                var err = false;

                switch (type) {
                    case 'error':
                        err = true;
                        break;
                    case 'bad_name':
                        err = true;
                        snInput.error('sn_edit_name');
                        break;
                }

                if (err) {
                    snSaveButWrap('sn_edit_save_wrap', 'error', {
                        err_msg: msg
                    });
                } else {
                    snSaveButWrap('sn_edit_save_wrap', 'success');
                }
            }
        });
    }
};

// material inputs
var snInput = {
    doFocus: function(el) {
        if (O.isString(el)) {
            el = '#' + el;
        }
        O(el).focus().cursorToEnd();
        snInput.focus(el);
    },
    focus: function(el) {
        O(el.parentNode).addClass('material_inp_active', 'material_inp_focused');
    },
    blur: function(el) {
        var v = O(el).val(),
            parent = O(el.parentNode);
        parent.removeClass('material_inp_focused');
        if (v.length == 0) {
            parent.removeClass('material_inp_active');
        }
    },
    check: function(id) {
        if (O.isArray(id)) {
            for (var i in id) snInput.check(id[i]);
            return;
        }
        id = ge(id);
        if (val(id).length > 0) {
            var parent = id.parentNode;
            addClass(parent, 'material_inp_noanim');
            addClass(parent, 'material_inp_active');

            clearTimeout(cur.snInpTimeout);
            if (!cur.snInpTimeoutEls) cur.snInpTimeoutEls = [];
            cur.snInpTimeoutEls.push(parent);
            cur.snInpTimeout = setTimeout(function() {
                if (!cur.snInpTimeoutEls) return;
                for (var i in cur.snInpTimeoutEls) {
                    removeClass(cur.snInpTimeoutEls[i], 'material_inp_noanim');
                }
                delete cur.snInpTimeoutEls;
            }, 300);
        }
    },
    disable: function(el) {
        if (isArray(el)) {
            for (var i in el) snInput.disable(el[i]);
            return;
        }
        el = ge(el);
        addClass(el.parentNode, 'sn_material_inp_wrap_disabled');
        el.setAttribute('disabled', true);
    },
    undisable: function(el) {
        if (isArray(el)) {
            for (var i in el) snInput.undisable(el[i]);
            return;
        }
        el = ge(el);
        removeClass(el.parentNode, 'sn_material_inp_wrap_disabled');
        el.removeAttribute('disabled', true);
    },
    error: function(el) {
        el = ge(el);

        el.focus();
        el.selectionStart = val(el).length;

        var parent = el.parentNode;
        addClass(parent, 'material_inp_error');
        setTimeout(function() {
            removeClass(parent, 'material_inp_error');
        }, 1500);
    }
};

var snSwitch = {
    click: function(el) {
        if (hasClass(el, 'sn_switch_active')) {
            removeClass(el, 'sn_switch_active');
        } else {
            addClass(el, 'sn_switch_active');
        }
    }
};

function snVerifyTT(el) {
    showTooltip(el, {
        text: cur.lang.official_room,
        center: 1,
        shift: [1, 3, 0],
        black: 1
    });
}

function snChangeSiteVer(mob) {
    if (cur.changeVerShown) return;
    cur.changeVerShown = true;

    if (mob) {
        var str = '������ ������� ��������� ������ �����?';
    } else {
        var str = '������ ������� ������ ������ �����?';
    }

    snModal.confirmBox('����������', '<div class="change_site_ver">' + str + '</div>', {
        accept_str: '��',
        size: [350, 'auto'],
        close: function() {
            delete cur.changeVerShown;
            delete snModal.customClose;
            snModal.close();
        },
        accept_js: 'snDoChangeSiteVer()'
    });
}

function snDoChangeSiteVer() {
    var url = location.href,
        ver = is_mob ? 'full' : 'mob';
    if (url.indexOf('change_ver') != -1) {
        url = url.replace(/change_ver\=(full|mob)/, 'change_ver=' + ver);
    } else {
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += 'change_ver=' + ver;
    }
    location.href = url;
}

function snSaveButWrap(id, act, opts) {
    if (!opts) opts = {};

    if (act && act != 'init') {
        hide('ssbw_' + id + '_saved', 'ssbw_' + id + '_error', 'ssbw_' + id + '_loader', 'ssbw_' + id + '_btn');
    }

    switch (act) {
        case 'loading':
            writeLoader('ssbw_' + id + '_loader', 37);
            show('ssbw_' + id + '_loader');
            break;
        case 'error':
            val('ssbw_' + id + '_error', opts.err_msg);
            fadeIn('ssbw_' + id + '_error', 200);
            setTimeout(function() {
                hide('ssbw_' + id + '_error');
                fadeIn('ssbw_' + id + '_btn', 200);
            }, 3000);
            break;
        case 'success':
            fadeIn('ssbw_' + id + '_saved', 200);
            var fn = opts.callback ? opts.callback : snModal.close;
            setTimeout(fn, 2000);
            break;
        case 'restore':
            show('ssbw_' + id + '_btn');
            break;

        case 'init':
        default:
            var wr = ge(id);
            addClass(wr, 'sn_edit_save_wrap');
            wr.innerHTML = '<div class="sn_edit_save_btn no_select" id="ssbw_' + id + '_btn" onclick="' + opts.save_js + '">' + opts.save_str + '</div>\
      <div class="sn_edit_save_loader no_display" id="ssbw_' + id + '_loader"></div>\
      <div class="sn_edit_save_saved_info" id="ssbw_' + id + '_saved">' + opts.saved_str + '</div>\
      <div class="sn_edit_save_error" id="ssbw_' + id + '_error"></div>';
            break;
    }
}

function snMentionOver() {
    return false;
}

function clickHeadDropDown(force_close) {
    var line2 = geByClass('head_user_mobile_tools_line')[1];
    if (force_close || hasClass('head_cont', 'head_user_tools_shown')) {
        removeClass('head_cont', 'head_user_tools_shown');
        cur.headDDShown = false;
    } else {
        addClass('head_cont', 'head_user_tools_shown');
        cur.headDDShown = true;
    }
}

var moder = {
    roomTools: function(e) {
        cancelEvent(e);

        var cont = '<div class="search_hints_loader">' + writeLoader(-1, 50) + '</div>';
        snModal.fastShow({
            id: 'room_manage',
            title: 'Manage room',
            content: cont,
            size: [450, 'auto'],
            cont_class: 'sn_followers_box',
        });

        ajax.post('snapster.php', {
            act: 'room_manage',
            room_id: cur.roomID
        }, {
            onDone: function(d, hash) {
                snModal.setContent('room_manage', d);
                snInput.check(['moder_room_domain']);

                snSaveButWrap('moder_room_save', 'init', {
                    save_str: getLang('global_save'),
                    save_js: 'moder.saveRoom(\'' + hash + '\')',
                    saved_str: cur.lang.saved
                });
            },
            onFail: function() {
                snModal.close('room_manage');
            }
        });
    },
    saveRoom: function(hash) {
        var ban = O('#sn_switch_ban').hasClass('sn_switch_active'),
            verify = O('#sn_switch_verify').hasClass('sn_switch_active'),
            domain = O('#moder_room_domain').val();

        var len = domain.length;
        if (len > 0 && (len < 2 || len > 32 || !domain.match(/^([a-zA-Z0-9\-\_\.]+)$/))) {
            return snInput.error('moder_room_domain');
        }

        snSaveButWrap('moder_room_save', 'loading');
        ajax.post('snapster.php', {
            act: 'moder_save_room',
            room_id: cur.roomID,
            hash: hash,
            ban: ban,
            domain: domain,
            verify: verify
        }, {
            onDone: function() {
                snModal.close('room_manage');
            },
            onFail: function() {
                snSaveButWrap('moder_room_save', 'restore');
            }
        });
    }
};

try {
    stManager.done('snapster/page.js');
} catch (e) {}