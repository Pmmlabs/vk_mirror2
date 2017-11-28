var siteHeader = {
    update: function() {
        ServerRequest.send({
            act: 'update_header',
        }, {
            onDone: function(res) {
                siteHeader.updateMe(res.me);
                NotifyPad.updateNewNum(res.notify_num);

                if (res.queue_params && !isMob) {
                    snNotify.init(res.queue_params);
                }
            },
            onFail: function(err) {
                siteHeader.updateMe({
                    lang: me.lang,
                    id: 0,
                    logged: 0,
                });
            }
        });
    },
    updateMe: function(info) {
        if (info.logged != me.logged) {
            Search.loadPopular();
        }

        me = info;

        if (me.logged) {
            siteHeader.onlineMode();
        } else {
            siteHeader.offlineMode();
        }
    },
    offlineMode: function() {
        O('#head_user_wrap').val(Templates.get('headUserNoLogged'));
        O('.sn_notify_btn').addClass('no_display');
    },
    onlineMode: function() {
        O('#head_user_wrap').val(Templates.get('headUser', me.info));
        O('.sn_notify_btn').removeClass('no_display');
    },
    userOver: function(el) {
        if (siteHeader.tipShown && isMob) {
            return siteHeader.userOut(el, 1);
        }
        siteHeader.tipShown = 1;
        clearTimeout($s('header').userOutTimer);
        O(el).addClass('head_user_over');
    },
    userOut: function(el, fast) {
        $s('header').userOutTimer = setTimeout(function() {
            siteHeader.tipShown = 0;
            O(el).removeClass('head_user_over');
        }, fast ? 0 : 500);
    }
};

var roomPanel = {
    render: function(info) {
        roomsHub.putRooms(info);
        var info = roomsHub.getRoom(info.id);

        roomPanel.roomID = info.id;
        roomPanel.followHash = info.follow_hash;
        roomPanel.role = info.role;

        info.followers_str = langNumeric(info.followers, lang.followers_num, 1);
        info.followers = info.followers ? formatNumber(info.followers) : 0;

        info.description = prepareText(info.description, {
            no_links: 1,
        });

        O('#room_panel_wrap').val(Templates.get('roomPanel', info.cover, info));

        if (info.role) {
            roomPanel.followedMode();
        } else {
            roomPanel.noFollowedMode();
        }
        Admin.roomAdminTools();
    },
    followedMode: function() {
        var roomData = roomsHub.getRoom(roomPanel.roomID);

        O('#room_panel_no_followed_mode').addClass('no_display');
        O('#room_panel_followed_mode').removeClass('no_display');

        var role = roomPanel.role,
            unFollowBtn = O('#room_panel_unfollow_btn');
        if (O.inArray(role, ['creator', 'admin', 'publisher'])) {
            unFollowBtn.addClass('button_inline');
            O('#room_panel_upload_btn').removeClass('no_display');
        } else {
            O('#room_panel_upload_btn').addClass('no_display');
            unFollowBtn.removeClass('button_inline');
        }
        if (roomPanel.roomID == -me.id || roomPanel.roomID < 0 && roomData.role == 'creator') {
            unFollowBtn.addClass('no_display');
        } else {
            unFollowBtn.removeClass('no_display');
        }

        if (O.inArray(role, ['creator', 'admin']) && roomPanel.roomID > 0) {
            O('#room_panel_edit_button').removeClass('no_display');
        } else {
            O('#room_panel_edit_button').addClass('no_display');
        }

        if (roomData.can_suggest) {
            O('#room_panel_suggest_button').removeClass('no_display');
        } else {
            O('#room_panel_suggest_button').addClass('no_display');
        }

        O('#room_panel_invite_info').addClass('no_display');

        roomPanel.updateSuggestBlock();
    },
    updateSuggestBlock: function() {
        var roomData = roomsHub.getRoom(roomPanel.roomID),
            num = roomData.suggest_count;

        if (roomData.role === 'viewer') {
            num = roomData.suggest_badge;
        }

        if (num > 0) {
            var btn_str = '<span>' + num + '</span> ' + langNumeric(num, lang.suggest_count_num);
            O('#room_panel_suggest_btn').removeClass('no_display').val(btn_str);
        }
    },
    noFollowedMode: function() {
        var roomData = roomsHub.getRoom(roomPanel.roomID);

        O('#room_panel_followed_mode').addClass('no_display');
        if (me.logged) {
            O('#room_panel_no_followed_mode').removeClass('no_display');
        }

        if (roomData.invite) {
            roomsHub.putRooms(roomData.invite.inviter_info);
            var inviter = roomsHub.getRoom(-roomData.invite.inviter_id);
            O('#room_panel_invite_info').removeClass('no_display').val(makeLink(inviter.domain, inviter.title) + ' ' + langSex(inviter.sex, 'invite_info'));
        }
    },
    showFollowers: function(tab) {
        var roomData = roomsHub.getRoom(roomPanel.roomID);
        if (!roomData.followers) {
            return;
        }
        if (!tab) {
            tab = 'all';
        }

        var tabs = {
            items: [{
                id: 'all',
                text: lang.tab_all,
                wrap: '#room_all_result',
                server: 1,
                server_query: {
                    section: 'all'
                }
            }, ],
            active: tab,
        };
        if (roomPanel.roomID > 0) {
            tabs.items.push({
                id: 'publishers',
                text: lang.tab_authors,
                wrap: '#room_publishers_result',
                server: 1,
                server_query: {
                    section: 'publishers'
                }
            });
        }
        showBox({
            title: lang.followers,
            tabs: tabs,
            width: 520,
            content: Templates.get('roomFollowers'),
            server: {
                query: {
                    act: 'room_users',
                    room_id: roomPanel.roomID,
                },
                cache_key: 'room_users_' + tab,
            }
        }).onServerDone(function(data) {
            O('#room_' + this.activeTab + '_result').val(roomPanel.prepareFollowers(data));
        }).onMoreDone(function(data) {
            O('#room_' + this.activeTab + '_result').append(roomPanel.prepareFollowers(data));
        }).onMoreProgress(function() {
            writeLoader('#room_followers_preloader_wrap', 30);
        }).onMoreStop(function(can_more) {
            destroyLoader('#room_followers_preloader_wrap', can_more);
        });
    },
    prepareFollowers: function(data) {
        roomsHub.putRooms(data.rooms_data);

        var result = '';
        O.each(data.rooms_list, function() {
            var item = roomsHub.getRoom(-this);
            item.first_name = O.clean(item.first_name);
            item.last_name = O.clean(item.last_name);
            result += Templates.get('roomFollower', item);
        });
        return result;
    },
    follow: function(el) {
        roomPanel.setFollow(el);
    },
    unfollow: function(force) {
        if (!force && roomPanel.role != 'viewer') {
            showBox({
                    title: lang.warning,
                    content: lang.unfollow_warning,
                    resultClass: 'modal_warning_result',
                    width: 500,
                })
                .addButton(lang.cancel, 'curModal.close()', {
                    inline: 1
                })
                .addButton(lang.confirm_unfollow, 'roomPanel.unfollow(1); curModal.close();');
            return;
        }
        roomPanel.setFollow('#room_panel_unfollow_btn', 1);
    },
    setFollow: function(el, un) {
        if (O(el).hasClass('button_loading')) {
            return;
        }
        buttonLoading(el);

        ServerRequest.send({
            act: (un ? 'un' : '') + 'follow',
            room_id: roomPanel.roomID,
            hash: roomPanel.followHash,
        }, {
            onDone: function() {
                pageRoute();
            },
            onFail: function() {
                pageRoute();
            }
        });
    },
    editRoom: function() {
        roomsManage.createRoom(roomPanel.roomID);
    },
    showSuggestions: function() {
        cur.suggestBoxVars = {};
        showBox({
            title: lang.suggestions_title,
            width: 500,
            server: {
                query: {
                    act: 'get_suggestions',
                    room_id: roomPanel.roomID,
                }
            }
        }).onServerDone(function(data) {
            if (!data.feed.length) {
                return pageRoute();
            }
            this.setContent(Templates.get('suggestBox', roomPanel.prepareSuggestItems(data)));
        }).onMore(roomPanel.loadMoreSuggestions).onClose(function() {
            cur.suggestBoxVars && cur.suggestBoxVars.needReload && pageRoute();
        });
    },
    prepareSuggestItems: function(data) {
        roomsHub.putRooms(data.rooms_data);
        cur.suggestBoxVars.startFrom = data.next_from;

        var role = roomsHub.getRoom(roomPanel.roomID).role;
        if (O.inArray(role, ['creator', 'admin'])) {
            var out_class = 'no_display',
                in_class = '';
        } else {
            var out_class = '',
                in_class = 'no_display';
        }

        var result = '';
        for (var i in data.feed) {
            var item = data.feed[i],
                pid_exp = item.id.split('_');
            var room = roomsHub.getRoom(-parseInt(pid_exp[0]));

            var photo = {
                id: item.id,
                date: getDateText(item.date),
                src: item.src,
                height: item.height / item.width * 460,
                out_class: out_class,
                in_class: in_class,
            };

            result += Templates.get('suggestPhotoItem', room, photo);
        }
        return result;
    },
    loadMoreSuggestions: function() {
        if (!cur.suggestBoxVars || cur.suggestBoxVars.startLoad || !cur.suggestBoxVars.startFrom) {
            return;
        }
        cur.suggestBoxVars.startLoad = 1;
        writeLoader('#suggestions_result_loader', 30);
        ServerRequest.send({
            act: 'get_suggestions',
            room_id: roomPanel.roomID,
            start_from: cur.suggestBoxVars.startFrom
        }, {
            onDone: function(data) {
                O('#suggestions_result').append(roomPanel.prepareSuggestItems(data));
                destroyLoader('#suggestions_result_loader', 1);
            },
            onFail: function() {
                destroyLoader('#suggestions_result_loader', 1);
            }
        });
    },
    confirmSuggestionBox: function(id, action) {

        switch (action) {
            case 'reject':
                var text = lang.suggest_reject_confirm;
                break;
            case 'accept':
                var text = lang.suggest_publish_confirm;
                break;
            case 'cancel':
                var text = lang.suggest_cancel_confirm;
                break;
        }
        showBox({
                title: lang.confirm_title,
                content: text,
                resultClass: 'modal_warning_result',
                width: 450,
            })
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.yes_button, 'roomPanel.suggestAction(\'' + id + '\', this, \'' + action + '\')');
    },
    suggestAction: function(id, btn, action) {
        btn = O(btn);
        if (btn.hasClass('button_loading')) {
            return;
        }

        buttonLoading(btn);
        curModal.disableClose();
        var cancel_btn = btn.parent().children('.button.button_inline').addClass('no_display');

        ServerRequest.send({
            act: 'set_suggest_photo',
            pid: id,
            room_id: roomPanel.roomID,
            hash: roomsHub.getRoom(roomPanel.roomID).save_hash,
            action: action
        }, {
            onDone: function() {
                curModal.close();
                O('#suggest_item' + id).remove();

                if (action === 'cancel') {
                    var suggest_count = roomsHub.getRoom(roomPanel.roomID).suggest_badge;
                    suggest_count--;
                    roomsHub.putRooms({
                        id: roomPanel.roomID,
                        suggest_badge: suggest_count,
                    });
                    roomPanel.updateSuggestBlock();
                } else {
                    var suggest_count = roomsHub.getRoom(roomPanel.roomID).suggest_count;
                    suggest_count--;
                    roomsHub.putRooms({
                        id: roomPanel.roomID,
                        suggest_count: suggest_count,
                    });
                    roomPanel.updateSuggestBlock();

                    if (action === 'accept') {
                        cur.suggestBoxVars.needReload = 1;
                    }
                }

                if (suggest_count <= 0) {
                    curModal.close();
                } else {
                    curModal.update();
                    curModal.clearCache();
                }
            },
            onFail: function() {
                curModal.enableClose();
                cancel_btn.removeClass('no_display');
                buttonLoadingStop(btn);
            }
        });
    },
};

var roomsList = {
    init: function(tab) {
        if (!O.inArray(tab, ['invitations', 'explore'])) {
            tab = 'result';
        }
        $s('rooms_list').tab = tab;

        var query = {
            act: 'rooms_list',
            tab: tab,
        };
        if (cur.authToken) {
            query.token = cur.authToken;
        }
        setTitle(lang.rooms);
        roomsList.page = Page(query).onDone(function(data) {
                cur.saveRoomHash = data.save_room_hash;

                roomsList.render(data);
                roomPanel.render(data.room_info);
                roomsList.renderPublishRooms(data.publish_rooms);

                if (data.invites_num > 0 || tab === 'invitations') {
                    O('#invitations_list_tab').removeClass('no_display').children('.top_nav_item_badge').val(data.invites_num);
                }
                roomsList.invitesNum = data.invites_num;

                if (query.token) {
                    siteHeader.update();
                }
                this.set('tab', tab);

                O('.rooms_list_tab').addClass('no_display');
                O('#rooms_list_' + $s('rooms_list').tab).removeClass('no_display');
                O('.top_nav_item_active').removeClass('top_nav_item_active');
                O('#' + $s('rooms_list').tab + '_list_tab').addClass('top_nav_item_active');

                if (tab === 'invitations') {
                    roomsList.showInvitations(data);
                } else if (tab === 'explore') {
                    O('#rooms_list_explore').val(Explore.explorePrepareData(data));
                }
            }).onFail(function(err) {
                if (err.error_type == 'no_authorized') {
                    siteHeader.offlineMode();
                }
            })
            // pagination
            .onMoreProgress(function() {
                writeLoader('#rooms_list_preloader', 30);
            }).onMoreQuery(function(query) {
                query.tab = $s('rooms_list').tab;
                return query;
            }).onMoreDone(function(data) {
                if (this.get('tab') === 'invitations') {
                    O('#rooms_list_invitations').append(roomsList.prepareInvitations(data));
                } else if (this.get('tab') === 'explore') {
                    O('#rooms_list_explore').append(Explore.explorePrepareData(data));
                } else {
                    var rooms_list = roomsList.prepareRooms(data);
                    O('#rooms_list_result').append(rooms_list);
                }
                this.serverResExtend('rooms_list', data.rooms_list);
            }).onMoreStop(function(can_more) {
                destroyLoader('#rooms_list_preloader', can_more);
            });
    },
    showInvitations: function(data) {
        var items = roomsList.prepareInvitations(data);
        O('#rooms_list_invitations').val(items);
    },
    prepareInvitations: function(data) {
        roomsHub.putRooms(data.rooms_data);

        var profiles = [];
        for (var i in data.profiles) {
            profiles.push(data.profiles[i]);
        }
        roomsHub.putRooms(profiles);

        var rooms_list = data.rooms_list,
            result = '';
        for (var i in rooms_list) {
            var room_id = rooms_list[i],
                inv_data = data.inviters[room_id],
                info = roomsHub.getRoom(room_id),
                user = roomsHub.getRoom(-inv_data.inviter_id);

            if (inv_data.role === 'publisher') {
                var str = lang.invite_publisher_inf;
            } else {
                var str = lang.invite_viewer_inf;
            }

            result += Templates.get('invitationsItem', info, user, str, inv_data.hash);
        }
        return result;
    },
    prepareRooms: function(data) {
        roomsHub.putRooms(data.rooms_data, {
            profiles: data.profiles,
        });

        var rooms_list = data.rooms_list,
            result = '';
        for (var i in rooms_list) {
            var info = roomsHub.getRoom(rooms_list[i]);

            var photos = '',
                badge = info.badge;
            if (isMob) {
                info.photos = info.photos.slice(0, 1);
            }
            for (var j in info.photos) {
                var badge_class = badge > 0 ? 'room_item_photo_new' : '';
                badge--;
                if (info.badge > 0 && badge == 0 || j == 3 && info.badge >= 4 || isMob && info.badge) {
                    var badge_count = info.badge;
                } else {
                    var badge_count = '';
                }
                photos += Templates.get('roomsListItemPhotos', info.photos[j], badge_class, badge_count);
            }

            result += Templates.get('roomsListItem', info, photos);
        }
        return result;
    },
    prepareSmallRooms: function(rooms_list, rooms_data) {
        roomsHub.putRooms(rooms_data);
        var result = '';
        for (var i in rooms_list) {
            var info = roomsHub.getRoom(rooms_list[i], {
                title_maxlen: 20,
            });
            info.followers = langNumeric(info.followers, lang.followers_num);
            result += Templates.get('roomsListSmallItem', info);
        }
        return result;
    },
    render: function(data) {
        if ($s('rooms_list').tab === 'invitations') {
            var items = '';
        } else {
            var items = roomsList.prepareRooms(data);
        }
        O('#page_wrap').val(Templates.get('roomsListWrap', items));
    },
    renderPublishRooms: function(data) {
        O('#publish_rooms_wrap').val(Templates.get('publishRoomsBlock', data[0], roomsList.prepareSmallRooms(data[1], data[2])));
    },
    setInvite: function(btn, room_id, hash, cancel) {
        btn = O(btn);
        if (btn.hasClass('button_loading')) {
            return;
        }
        buttonLoading(btn);
        var cancel_btn = btn.parent().children(cancel ? '.button_fill' : '.button_inline').addClass('no_display');
        ServerRequest.send({
            act: cancel ? 'reject_invite' : 'follow',
            room_id: room_id,
            hash: hash,
        }, {
            onDone: function() {
                btn.parent().val('<div class="invitation_accepted">' + (cancel ? lang.invite_rejected : lang.invite_accepted) + '</div>');
                if (roomsList.nextFrom) {
                    roomsList.nextFrom--;
                }
                roomsList.invitesNum--;
                O('#invitations_list_tab').children('.top_nav_item_badge').val(roomsList.invitesNum ? roomsList.invitesNum : 0);
                roomsList.page.clearCache();
            },
            onFail: function() {
                buttonLoadingStop(btn);
                cancel_btn.removeClass('no_display');
            }
        });
    },
    showPublishRooms: function() {
        showBox({
            title: lang.publish_rooms,
            width: 500,
            server: {
                query: {
                    act: 'publish_rooms',
                },
                cache_key: 'publish_rooms'
            }
        }).onServerDone(function(data) {
            this.setContent(Templates.get('roomsListPublishWrap', roomsList.preparePublishRooms(data)));
        }).onMoreDone(function(data) {
            O('.rooms_list_publish_wrap').append(roomsList.preparePublishRooms(data));
            destroyLoader('#rooms_list_publish_loader', 1);
        }).onMoreProgress(function() {
            writeLoader('#rooms_list_publish_loader', 30);
        }).onMoreStop(function(can_more) {
            destroyLoader('#rooms_list_publish_loader', can_more);
        });
    },
    preparePublishRooms: function(data) {
        roomsHub.putRooms(data.rooms_data, {
            profiles: data.profiles ? data.profiles : {},
        });

        var result = '';
        for (var i in data.rooms_list) {
            var room_info = roomsHub.getRoom(data.rooms_list[i], {
                title_maxlen: 52,
            });
            var followers = langNumeric(room_info.followers, lang.followers_num);
            result += Templates.get('roomsListPublishItem', room_info, followers);
        }
        return result;
    },
    onNewPhoto: function(room_id, photo) {
        var el = O('#rooms_list_item' + room_id + ' .room_item_photos');
        if (el.count()) {
            el.prepend(Templates.get('roomsListItemPhotos', photo, 'room_item_photo_anim room_item_photo_new', ''));
            var photo = el.children('.room_item_photo:first-child'); //el.children('#photo'+photo.id);
            setTimeout(function() {
                photo.addClass('room_item_photo_anim_run');
                setTimeout(function() {
                    photo.removeClass('room_item_photo_anim_run room_item_photo_anim');
                }, 200);
            }, 10);
        }
    },
};

var roomView = {
    init: function(link, opts) {
        if (!opts) {
            opts = {};
        }
        roomView.page = Page({
                act: 'room_view',
                link: link,
                sort_asc: cur.roomViewSortDesc,
                is_vk: opts.is_vk,
            }).onDone(function(data) {
                roomView.photosLinesH = [0, 0, 0];
                roomView.roomID = data.room_id;

                if (data.invite_key) {
                    cur.inviteKey = data.invite_key;
                }

                setTitle(data.room_info.title);

                roomView.render(data);
                roomPanel.render(data.room_info);
                if (data.piblishers) {
                    roomView.renderPublishers(data.piblishers);
                }
                if (data.feed.length == 0) {
                    roomView.noPhotosWrapHeight();
                }

                if (cur.needShowInviteBox) {
                    setTimeout(function() {
                        roomsManage.showInviteBox(data.room_id);
                    }, 200);
                }

                roomView.followedRoomsRender(data);
            })
            // pagination
            .onMoreProgress(function() {
                writeLoader('#room_photos_preloader', 30);
            }).onMoreDone(function(data) {
                O('#room_photos').append(roomView.prepareFeed(data));
                roomView.assignPhotos();
                this.serverResExtend('feed', data.feed);
            }).onMoreStop(function(can_more) {
                destroyLoader('#room_photos_preloader', can_more);
            });
    },
    noPhotosWrapHeight: function() {
        var leftH = O('.left_block_cont').height() - 55 - 32;
        O('.room_view_not_photos').setStyle({
            height: leftH + 'px',
            'line-height': leftH + 'px'
        });
    },
    resortRoomPhotos: function() {
        cur.roomViewSortDesc = cur.roomViewSortDesc ? 0 : 1;
        this.init('room' + roomView.roomID);
    },
    prepareFeed: function(data) {
        var result = '',
            feed = data.feed;
        for (var i in feed) {
            result += Templates.get('roomViewPhoto', feed[i]);
        }
        return result;
    },
    render: function(data) {
        if (data.feed.length > 0) {
            var feed = roomView.prepareFeed(data);
        } else {
            var feed = Templates.get('roomViewNotPhotos');
        }
        var resort_class = cur.roomViewSortDesc ? 'room_view_asc_sorting' : '';
        var back_url = prevPageUrl ? prevPageUrl : '/rooms';
        O('#page_wrap').val(Templates.get('roomViewWrap', feed, resort_class, back_url));
        roomView.assignPhotos();

        if (isMob) {
            O('#room_panel_wrap').insertBefore(mobilePages.downLoadPanel());
        }
    },
    loadPhotos: function() {
        var item = O('.room_view_photo_no_loaded').first().removeClass('room_view_photo_no_loaded');
        if (item.count() == 0) {
            cur.loaginPhotosStarted = false;
        } else {
            O('<img>').attr('src', item.attr('data-src')).bind('load', function() {
                item.setStyle('background-image', 'url(' + item.attr('data-src') + ')');
                roomView.loadPhotos();
            })
            cur.loaginPhotosStarted = true;
        }
    },
    renderPublishers: function(data) {
        var authors = '',
            items = data.users_list;
        roomsHub.putRooms(data.rooms_data);
        for (var i in items) {
            var id = items[i];
            var info = roomsHub.getRoom(-id);
            var cover = info.cover;

            if (id == data.creator_id) {
                info.followers = lang.role_creator;
            } else if (O.inArray(id, data.admins)) {
                info.followers = lang.role_admin;
            } else if (O.inArray(id, data.invited)) {
                info.followers = lang.role_invited;
            } else {
                info.followers = lang.role_author;
            }
            info.cover = cover;

            authors += Templates.get('roomsListSmallItem', info);
        }
        if (!authors) {
            return;
        }
        O('#room_publishers_wrap').val(Templates.get('roomAuthorsBlock', data.count, authors));
    },
    assignPhotos: function() {
        var max_h = 0,
            margin = 10,
            itemW = 256;
        if (isMob) {
            margin = 3;
            itemW = (window.innerWidth - 26) / 3;
        }
        O('.room_view_photo_noprepared').each(function() {
            var min = Math.min.apply(Math, roomView.photosLinesH),
                column = roomView.photosLinesH.indexOf(min);

            var el = O(this),
                ph = parseInt(el.attr('data-height')),
                pw = parseInt(el.attr('data-width')),
                h = ph / pw * itemW;
            el.setStyle({
                left: (column * itemW + (margin * column)) + 'px',
                top: roomView.photosLinesH[column] + 'px',
                height: h + 'px',
                width: itemW + 'px',
            }).removeClass('room_view_photo_noprepared');

            roomView.photosLinesH[column] += h + margin;
            if (roomView.photosLinesH[column] > max_h) {
                max_h = roomView.photosLinesH[column];
            }
        });
        if (max_h) {
            O('#room_photos').setStyle({
                height: max_h + 'px'
            });
        }
        if (isMob) {
            O('#room_photos').setStyle('width', (itemW * 3 + 6) + 'px');
        }

        if (!cur.loaginPhotosStarted) {
            for (var i = 0; i < 2; i++) {
                roomView.loadPhotos();
            }
        }
    },
    loadMore: function() {
        if (roomView.startLoadMore || !roomView.nextFrom || !roomView.page || !roomView.page.isCurrent()) {
            return;
        }
        roomView.startLoadMore = true;

        writeLoader('#room_photos_preloader', 30);
        ServerRequest.send({
            act: 'room_view',
            start_from: roomView.nextFrom,
            room_id: roomView.roomID,
            sort_asc: cur.roomViewSortDesc,
        }, {
            onDone: function(data) {
                if (!roomView.page.isCurrent()) {
                    return;
                }
                destroyLoader('#room_photos_preloader', data.next_from ? 0 : 1);
                if (data.next_from) {
                    roomView.nextFrom = data.next_from;
                    roomView.startLoadMore = false;
                } else {
                    roomView.nextFrom = false;
                }
                O('#room_photos').append(roomView.prepareFeed(data));
                roomView.assignPhotos();
            }
        });
    },
    clickBack: function() {
        window.history.back();
    },
    followedRoomsRender: function(data) {
        if (!data.user_rooms_list || !data.user_rooms_list.length) {
            return;
        }
        roomsHub.putRooms(data.user_rooms_data, {
            profiles: data.user_rooms_profiles
        });

        var result = '';
        for (var i in data.user_rooms_list) {
            result += Templates.get('roomViewFollowedRoomsListItem', roomsHub.getRoom(data.user_rooms_list[i], {
                title_maxlen: 25,
            }));
        }

        var roomData = roomsHub.getRoom(roomView.roomID);
        var count_str = langSex(roomData.sex, 'followed_rooms_count_pref') + ' ';
        count_str += langNumeric(data.user_rooms_total, lang.followed_rooms_count);

        var more_link = data.user_rooms_total > 7 ? Templates.get('link', '', '���������� ���', {
            className: 'room_view_followed_block_all fl_r',
            ext: 'onClick="roomView.showFollowedRoomsBox(event);" no-active="1"'
        }) : '';

        O('#room_photos').parent().insertBefore(Templates.get('roomViewFollowedRoomsList', result, count_str, more_link));
    },
    showFollowedRoomsBox: function(e) {
        O.cancelEvent(e);
        showBox({
            title: lang.followed_box_title,
            width: 500,
            server: {
                query: {
                    act: 'followed_rooms',
                    mid: -roomView.roomID,
                }
            }
        }).onServerDone(function(data) {
            this.setContent(Templates.get('roomsListPublishWrap', roomsList.preparePublishRooms(data)));
        }).onMoreDone(function(data) {
            O('.rooms_list_publish_wrap').append(roomsList.preparePublishRooms(data));
            destroyLoader('#rooms_list_publish_loader', 1);
        }).onMoreProgress(function() {
            writeLoader('#rooms_list_publish_loader', 30);
        }).onMoreStop(function(can_more) {
            destroyLoader('#rooms_list_publish_loader', can_more);
        });
    },
};

var photoView = {
    show: function(id, opts) {
        delete cur.pwPendingShow;
        delete cur.startLoadBeforeComments;

        cur.pwType = id.match(/^[a-z]+/)[0];

        if (!opts) opts = {};

        if (!cur.photosData || opts.forceServer) {
            cur.photosData = {};
        }

        if (cur.pwLayout && opts.forceServer) {
            cur.pwLayout.close();
        }

        if (!cur.pwLayout) {

            // check list
            if (photoView.getCurPos(id) == -1) {
                delete cur.photosData[id];
            }

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

            cur.pwLayout = createLayout({
                content: Templates.get('photoViewBox'),
                layoutClass: 'photo_view_wrap',
                resultClass: 'clear_fix',
            }).onClose(this.onClosePhoto);
            if (isMob) {
                O('#mob_pw_header').val(Templates.get('boxHeader', 'Photo view', cur.pwLayout.id));
            }
            cur.pwListId = O.now();
        }

        cur.viewPhoto = id;
        cur.pwCanMore = false;
        cur.replyToID = cur.replyToName = false;
        delete cur.pwLoading;
        $s('viewed_photos')[id] = 1;

        if (!opts.no_sh_link) {
            var loc = parseUrl(location.href).url;
            if (loc.indexOf('z=') == -1) {
                cur.photoViewLoc = loc;
            }
            if (!cur.photoViewLoc) {
                cur.photoViewLoc = cur.roomID ? 'room' + cur.roomID : '/';
            }
            var h = location.pathname + '?z=' + id;
            if (opts.comment_id) {
                h += '&comment_id=' + opts.comment_id;
            }
            history.pushState({
                h: h
            }, false, h);
        }

        var data = cur.photosData[id],
            size = photoView.getBigSrc(data.sizes);
        cur.photoSize = size;

        O('#sn_pw_image').removeClass('no_display');
        O('#pw_video, .pw_video_play_control').remove();
        if (cur.pwType == 'video') {
            photoView.renderVideo(data);
        } else {
            var imgEl = O('#sn_pw_image'),
                page_photo = O('#photo' + id);
            if (page_photo.count()) {
                imgEl.attr('src', page_photo.attr('data-src'));
                O('<img src="' + data.sizes[size] + '">').bind('load', function() {
                    if (cur.viewPhoto != id) return;
                    imgEl.attr('src', data.sizes[size]);
                });
            } else {
                imgEl.attr('src', '').attr('src', data.sizes[size]);
            }
        }

        this.updateInfo();
        this.updateSize();

        photoView.checkLoaders();
        photoView.loadNextPrev();

        if (opts.comment_id) {
            setTimeout(function() {
                photoView.scrollToComment(opts.comment_id);
            }, 1);
        }
    },
    renderVideo: function(data) {
        O('#sn_photo_view_image_wr').append(Templates.get('photoViewVideo', data.video_src));
        O('#sn_pw_image').addClass('no_display');
        if (window.pwUnMuted) {
            this.unmuteVideo();
        } else {
            this.muteVideo();
        }
        this.playVideo();
    },
    muteVideo: function() {
        O('#pw_video_el')[0].muted = 1;
        window.pwUnMuted = 0;
        O('#pw_video_sound_control div').addClass('icon-no_sound').removeClass('icon-sound');
    },
    unmuteVideo: function() {
        window.pwUnMuted = 1;
        O('#pw_video_el')[0].muted = 0;
        O('#pw_video_sound_control div').removeClass('icon-no_sound').addClass('icon-sound');
    },
    pauseVideo: function() {
        O('#pw_video_el')[0].pause();
        O('#pw_video_play_control div').removeClass('icon-pause').addClass('icon-play');
        cur.pwPlaying = 0;
    },
    playVideo: function() {
        O('#pw_video_el')[0].play();
        O('#pw_video_play_control div').addClass('icon-pause').removeClass('icon-play');
        cur.pwPlaying = 1;
    },
    clickPlayControl: function(e) {
        O.cancelEvent(e);
        if (cur.pwPlaying) {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    },
    clickSoundControl: function(e) {
        O.cancelEvent(e);
        if (!window.pwUnMuted) {
            this.unmuteVideo();
        } else {
            this.muteVideo();
        }
    },
    updateInfo: function() {
        if ($s('deleted_photos')[cur.viewPhoto]) {
            return photoView.photoDeletedMode();
        }
        var data = cur.photosData[cur.viewPhoto];

        roomsHub.putRooms(data.author);
        var author = roomsHub.getRoom(-data.author.id);
        var cover = author.cover;
        author.date = getDateText(data.date);

        // description
        var descr_data = {
            expand_class: 'no_display pw_descr_long',
            text: data.descr,
        };
        if (data.descr.length > 250) {
            descr_data.expand_class = '';
            descr_data.text = descr_data.text.substr(0, 130) + '..';
        }
        descr_data.text = prepareText(descr_data.text);

        // comments
        var comments_data = {
            items: commentsModule.prepareComments(data.comments),
        };

        if (me.logged) {
            comments_data.cover = getRoomCover(roomFieldsForUser(me.info));
        } else {
            comments_data.cover = getRoomCover({
                cover_src: 0,
                id: 0
            });
        }

        delete cur.startLoadComments;
        delete cur.startLoadBeforeComments;

        O('#sn_pw_info').val(Templates.get('photoViewInfo', cover, author, descr_data, comments_data));
        commentsModule.updateCommentsNum();

        // likes
        this.updateLikesNum();
        if (data.user_likes) {
            O('#sn_pw_heart_wrap .sn_pw_heart').addClass('sn_pw_heart_liked');
            O('#sn_pw_like_ic').addClass('sn_pw_like_active');
        } else {
            O('#sn_pw_heart_wrap .sn_pw_heart').removeClass('sn_pw_heart_liked');
        }

        photoView.photoEditTools(data);

        photoView.descrHideStop();
        if (!isMob) {
            cur.descrScroll = new Scrollbar('#pw_descr_full');
            cur.commentsScroll = new Scrollbar('#pw_comments_scroll', {
                onScroll: commentsModule.onCommentsScroll,
            }).scrollToBottom();
        }

        if (data.views_count > 0) {
            O('.sn_pw_views').removeClass('no_display').children('span:last-child').val(formatNumber(data.views_count));
        }

        cur.disabledCommentsMore = 1;
        setTimeout(function() {
            O('#comment_text').focus();
            cur.disabledCommentsMore = 0;
        });
    },
    photoEditTools: function(data) {
        var tools = [],
            roomData = roomsHub.getRoom(data.room_id);

        /*if (data.can_edit) {
          tools.push([lang.room_edit_button, 'photoView.editPhoto()']);
        }*/
        if (data.owner_id == me.id || O.inArray(roomData.role, ['creator', 'admin']) || me.admin) {
            tools.push([lang.delete, 'photoView.deletePhoto()']);
        }
        if (me.admin) {
            tools.push(['Manage', 'Admin.photoManageBox();', 'head_user_dd_item_spec']);
        }
        if (tools.length > 0) {
            var tools_html = '';
            for (var i in tools) {
                tools_html += Templates.get('photoViewEditToolsItem', tools[i][0], tools[i][1], tools[i][2]);
            }
            O('.sn_pw_edit_tools .head_user_dd').append(tools_html).parent().removeClass('no_display');
        }
    },
    editPhoto: function() {
        showBox({
            title: lang.edit_room,
            width: 500,
        });
    },
    photoDeletedMode: function() {
        O('#sn_pw_info').val(Templates.get('photoViewDeleted'));
    },
    deletePhoto: function() {
        $s('deleted_photos')[cur.viewPhoto] = 1;
        photoView.photoDeletedMode();
        ServerRequest.send({
            act: 'delete_photo',
            object: cur.viewPhoto,
            hash: cur.photosData[cur.viewPhoto].delete_hash,
        });
    },
    restorePhoto: function(e) {
        O.cancelEvent(e);
        delete $clear('deleted_photos', cur.viewPhoto);
        photoView.updateInfo();
        ServerRequest.send({
            act: 'restore_photo',
            object: cur.viewPhoto,
            hash: cur.photosData[cur.viewPhoto].delete_hash,
        });
    },
    updateLikesNum: function() {
        var num = cur.photosData[cur.viewPhoto].likes_count;
        if (num > 0) {
            var str = lang.liked_pref;
            str += ' <a href="/" onClick="photoView.showLikeUsers(event)">' + langNumeric(num, lang.likes_num) + '</a>';
        } else {
            var str = lang.like_def;
        }
        O('#sn_pw_likes_str').val(str);
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
    updateSize: function() {
        if (isMob) {
            return;
        }
        var width = window.innerWidth - 120,
            height = window.innerHeight - 50,
            data = cur.photosData[cur.viewPhoto],
            info = O('#sn_pw_info'),
            infoW = info.width();

        var wrapH = Math.max(500, height),
            imageH = Math.min(wrapH, data.height / data.width * wrapH, data.height),
            imageW = Math.min(width, (data.width / data.height * wrapH));

        wrapH = Math.max(wrapH, imageH);
        var wrapW = Math.max(Math.min(wrapH * 1.7, width), 600 + infoW);

        imageW = Math.min(imageW, wrapW - infoW);
        imageH = data.height / data.width * imageW;

        cur.pwLayout.result.setStyle({
            height: wrapH + 'px',
        });
        cur.pwLayout.cont.setStyle({
            width: wrapW + 'px',
        });
        O('#sn_pw_image').setStyle({
            width: imageW + 'px',
            height: imageH + 'px',
            top: ((wrapH - imageH) / 2) + 'px',
        });
        O('#sn_photo_view_image_wr').setStyle({
            width: (wrapW - infoW) + 'px'
        });
        info.setStyle({
            height: wrapH + 'px',
        });
        cur.pwLayout.update();

        var arrowWrW = (window.innerWidth - wrapW) / 2;
        O('#sn_pw_prev_wrap').setStyle({
            width: arrowWrW + 'px',
        });
        var left = arrowWrW + wrapW;
        O('#sn_pw_next_wrap').setStyle({
            width: arrowWrW + 'px',
            left: left + 'px',
        });
        O('#sn_pw_close').setStyle('left', (left + 20) + 'px');

        // description
        if (!isMob) {
            O('#pw_descr_full').setStyle('max-height', (wrapH - 75 - 13) + 'px');
            cur.descrScroll && cur.descrScroll.update();
        }

        // comments
        O('#pw_comments_scroll').setStyle({
            height: (wrapH - O('#pw_info_top_wr').height() - O('#pw_comment_form').height()) + 'px',
        });
        cur.commentsScroll && cur.commentsScroll.update(1);
    },
    getCurPos: function(pid) {
        var pos = -1;
        if (cur.pwList) {
            if (!pid) {
                pid = cur.viewPhoto;
            }
            for (var i in cur.pwList) {
                if (cur.pwList[i] == pid) {
                    if (pos != -1) {
                        debugLog('double', cur.pwList[i], i, pos);
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
    keyDown: function(e) {

        if (e.target.id == 'sn_pw_comm_txt' && val(e.target).length > 0) {
            return;
        }

        switch (e.keyCode) {
            case KEY.RIGHT:
            case KEY.SPACE:
                O.cancelEvent(e);
                photoView.next();
                break;
            case KEY.LEFT:
                cancelEvent(e);
                O.photoView.prev();
                break;
        }
    },
    loadPhotosInfo: function(photo, opts) {

        if (!opts) {
            opts = {};
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

        ServerRequest.send(query, {
            onDone: function(data) {
                O('#rooms_list_item' + data.room_id + ' .room_item_photo_new').removeClass('room_item_photo_new');
                O('#rooms_list_item' + data.room_id + ' .room_item_badge').val('');
                if (cur.pwListId != lid) {
                    debugLog('BAD LIST')
                    return;
                }
                delete cur.pwLoadingPrev;
                delete cur.pwLoadingNext;

                cur = O.extend(cur, data.extened_data);

                cur.pwOffset = data.offset;
                cur.pwTotal = data.total;
                cur.pwStartFrom = data.startFrom;
                cur.pwList = data.list;
                cur.pwRoomID = data.room_id;
                cur.photosData = O.extend(cur.photosData || {}, data.photos);

                photoView.checkLoaders();

                if (opts.with_loader) {
                    photoView.show(photo, {
                        no_server: 1,
                        comment_id: opts.comment_id
                    });
                }
            },
            box_loader: opts.with_loader ? 1 : 0,
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
        ServerRequest.send(query, {
            onDone: function(data) {
                if (cur.pwListId != lid) {
                    return;
                }
                if (after) {
                    delete cur.pwLoadingNext;
                    cur.pwStartFrom = data.startFrom;
                } else {
                    delete cur.pwLoadingPrev;
                    cur.pwOffset = data.offset;
                }

                cur.pwTotal = data.total;

                if (after) {
                    cur.pwList = cur.pwList.concat(data.list);
                } else {
                    cur.pwList = data.list.concat(cur.pwList);
                }
                cur.photosData = O.extend(cur.photosData || {}, data.photos);

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
        var pos = photoView.getCurPos(),
            prev = O('#sn_pw_prev_wrap'),
            next = O('#sn_pw_next_wrap');

        // prev
        if (pos > 0 || cur.pwOffset > 0) {
            prev.removeClass('sn_pw_wrap_disabled');
        } else {
            prev.addClass('sn_pw_wrap_disabled');
        }
        if ((!cur.pwList || pos == 0) && cur.pwPendingShow == 'prev') {
            prev.addClass('sn_pw_wrap_pending');
            writeLoader('#sn_pw_prev_loader', 30);
        } else {
            prev.removeClass('sn_pw_wrap_pending');
            O('#sn_pw_prev_loader').val('');
        }

        // next
        if (cur.pwList && pos < cur.pwList.length - 1 || cur.pwTotal > cur.pwStartFrom) {
            next.removeClass('sn_pw_wrap_disabled');
        } else {
            next.addClass('sn_pw_wrap_disabled');
        }
        if ((!cur.pwList || pos == cur.pwList.length - 1) && cur.pwPendingShow == 'next') {
            next.addClass('sn_pw_wrap_pending');
            writeLoader('#sn_pw_next_loader', 30);
        } else {
            next.removeClass('sn_pw_wrap_pending');
            O('#sn_pw_next_loader').val('');
        }
    },
    loadNextPrev: function() {
        var pos = photoView.getCurPos();
        if (pos == -1) return;

        var next = cur.pwList[pos + 1];
        if (next) {
            var data = cur.photosData[next];
            O('<img src="' + data.sizes[photoView.getBigSrc(data.sizes)] + '">');
        }

        var prev = cur.pwList[pos - 1];
        if (prev) {
            var data = cur.photosData[prev];
            O('<img src="' + data.sizes[photoView.getBigSrc(data.sizes)] + '">');
        }
    },
    notFoundError: function() {
        showBox({
            title: lang.error_title,
            content: lang.photo_not_found,
            width: 450,
            resultClass: 'modal_error'
        });
    },
    onClosePhoto: function() {
        delete cur.pwLayout;
        cur.viewPhoto = false;

        if (!isMob) {
            cur.commentsScroll && cur.commentsScroll.destroy();
            cur.descrScroll.destroy();
            delete cur.commentsScroll;
            delete cur.descrScroll;
        }
        history.replaceState({
            h: cur.photoViewLoc
        }, false, cur.photoViewLoc);
        delete cur.photoViewLoc;

        photoView.sendSeenPhotos();
    },
    sendSeenPhotos: function() {
        if (!me.logged) {
            return;
        }
        var viewed_photos = $s('viewed_photos'),
            list = [];
        for (var i in viewed_photos) {
            i = i.replace(/^[a-z]+/, '');
            Array.prototype.push.apply(list, i.split('_'));
        }
        $clear('viewed_photos');

        if (!list.length) {
            return;
        }

        ServerRequest.send({
            act: 'seen_photos',
            list: list,
        });
    },
    checkLike: function(e, el) {
        O.cancelEvent(e);

        if (!me.logged) {
            return showLoginBox();
        }

        if (!el) {
            var big = false;
            el = O('#sn_pw_heart_wrap');
        } else {
            el = O(el);
            var big = true;
        }

        var heart = el.children('.sn_pw_heart'),
            data = cur.photosData[cur.viewPhoto],
            ic = O('#sn_pw_like_ic');
        if (ic.hasClass('sn_pw_like_active')) {
            heart.removeClass('sn_pw_heart_liked');
            var pref = 'un';
            data.likes_count--;
            data.user_likes = false;
            ic.removeClass('sn_pw_like_active');
        } else {
            el.addClass('sn_pw_heart_anim');
            setTimeout(function() {
                el.removeClass('sn_pw_heart_anim');
            }, 500);

            heart.addClass('sn_pw_heart_liked');
            var pref = '';
            data.likes_count++;
            data.user_likes = true;
            ic.addClass('sn_pw_like_active');
            if (!big) {
                ic.addClass('sn_pw_liked_ic_anim');
                setTimeout(function() {
                    ic.removeClass('sn_pw_liked_ic_anim');
                }, 500);
            }
        }

        this.updateLikesNum();

        var hash = cur.photosData[cur.viewPhoto].hash;
        ServerRequest.send({
            act: pref + 'like',
            object: cur.viewPhoto,
            hash: hash
        });
    },
    showLikeUsers: function(e) {
        O.cancelEvent(e);

        cur.likesVars = {};
        showBox({
            title: lang.likes_box_title,
            width: 520,
            content: Templates.get('photoLikesBoxWrap'),
            server: {
                query: {
                    act: 'like_users',
                    object: cur.viewPhoto,
                },
                cache_key: 'photo_likers' + cur.viewPhoto,
            }
        }).onServerDone(function(data) {
            O('#likes_result').val(roomPanel.prepareFollowers(data));
            cur.likesVars.nextFrom = data.next_from;
        }).onMore(this.loadMoreLikes);
    },
    loadMoreLikes: function() {
        if (cur.likesVars.startLoad || !cur.likesVars.nextFrom) {
            return;
        }
        cur.likesVars.startLoad = 1;
        writeLoader('#likes_preloader', 30);
        ServerRequest.send({
            act: 'like_users',
            photo: cur.viewPhoto,
            start_from: cur.likesVars.nextFrom,
        }, {
            onDone: function(data) {
                O('#likes_result').append(roomPanel.prepareFollowers(data));
                if (data.next_from) {
                    cur.likesVars.nextFrom = data.next_from;
                    cur.likesVars.startLoad = 0;
                } else {
                    cur.likesVars.nextFrom = 0;
                }
                destroyLoader('#likes_preloader', 1);
            }
        });
    },
    expandDescr: function() {
        var descr = prepareText(cur.photosData[cur.viewPhoto].descr);
        O('#pw_descr_full_text').val(descr).parent().removeClass('no_display')
        if (isMob) {
            O('#sn_pw_descr_text, #pw_show_full_descr_btn').addClass('no_display');
        }
        cur.descrScroll && cur.descrScroll.update();
        photoView.descrHideStop();
    },
    hideFullDescr: function() {
        photoView.descrHideStop();
        O('#pw_descr_full_text').val('').parent().addClass('no_display');
        if (isMob) {
            O('#sn_pw_descr_text').removeClass('no_display');
            if (!O('#pw_show_full_descr_btn').hasClass('pw_descr_long')) {
                O('#pw_show_full_descr_btn').removeClass('no_display');
            }
        }
        cur.descrScroll && cur.descrScroll.update();
    },
    descrHideStart: function() {
        if (isMob) {
            return;
        }
        photoView.descrHideStop();
        cur.hideDescrTimeout = setTimeout(this.hideFullDescr, 2000);
    },
    descrHideStop: function() {
        clearTimeout(cur.hideDescrTimeout);
    },
    scrollToComment: function(cid) {
        cid = parseInt(cid);
        if (cid <= 0) {
            return;
        }
        var el = O('#comment' + cid),
            top = el.position().top;

        cur.commentsScroll && cur.commentsScroll.scrollTop(top - O('#sn_pw_comments').height() / 2);

        el.setStyle('background', 'rgb(230, 228, 172)');
        setTimeout(function() {
            el.setStyle({
                transition: 'background 2000ms linear',
                background: '#fff',
            });
        }, 3000);
    },
};

var commentsModule = {
    prepareComments: function(items) {
        var result = '';
        for (var i in items) {
            var item = items[i];

            roomsHub.putRooms(item.author);
            var author = roomsHub.getRoom(-item.author.id);
            var cover = author.cover;
            var text = prepareText(item.text);
            var date = getDateText(item.date);
            var class_name = item.from_id == me.id ? ' comment_own' : '';

            if (cur.deletedComments && cur.deletedComments[item.id]) {
                class_name += ' comment_deleted';
                var deleted = Templates.get('commentDeletedInfo');
            } else {
                var deleted = '';
            }

            result += Templates.get('comment', item.id, author, cover, text, date, class_name, item.hash, deleted);
        }
        return result;
    },
    deleteComment: function(el) {
        var parent = O(el).parent('.comment').addClass('comment_deleted');
        parent.children('.deleted_wrap').val(Templates.get('commentDeletedInfo'));
        cur.photosData[cur.viewPhoto].comments_count--;
        commentsModule.updateCommentsNum();

        var hash = parent.children('input').val(),
            cid = parseInt(parent.attr('id').replace('comment', ''));
        ServerRequest.send({
            act: 'delete_comment',
            object: cur.viewPhoto,
            cid: cid,
            hash: hash,
        });

        if (!cur.deletedComments) {
            cur.deletedComments = {};
        }
        cur.deletedComments[cid] = 1;
    },
    restoreComment: function(el, event) {
        O.cancelEvent(event);
        var parent = O(el).parent('.comment').removeClass('comment_deleted');
        parent.children('.deleted_wrap').val('');
        cur.photosData[cur.viewPhoto].comments_count++;
        commentsModule.updateCommentsNum();

        var hash = parent.children('input').val(),
            cid = parseInt(parent.attr('id').replace('comment', ''));
        ServerRequest.send({
            act: 'restore_comment',
            object: cur.viewPhoto,
            cid: cid,
            hash: hash,
        });

        if (cur.deletedComments) {
            delete cur.deletedComments[cid];
        }
    },
    updateCommentsNum: function() {
        var num = cur.photosData[cur.viewPhoto].comments_count;
        if (num > 0) {
            str = langNumeric(num, lang.comments_num);
        } else {
            var str = '';
        }
        O('#pw_comment_num').val(str);
        commentsModule.checkMoreCommentsButtons();
    },
    checkFromSize: function(el) {
        var h = el.height(),
            oldH = parseInt(el.attr('data-last-height'));
        if (h != oldH) {
            el.attr('data-last-height', h);
            photoView.updateSize();
        }
    },
    keyDown: function(el, e) {
        el = O(el);
        if (e.keyCode == KEY.ENTER) {
            O.cancelEvent(e);
            return commentsModule.sendComment(el);
        }
        commentsModule.checkFromSize(el);
    },
    keyUp: function(el, e) {
        el = O(el);
        commentsModule.checkFromSize(el);
    },
    sendComment: function(el) {
        var text = el.val().trim();

        if (!text) {
            return;
        }

        if (!me.logged) {
            return showLoginBox();
        }

        el.val('');
        commentsModule.checkFromSize(el);

        var comment = {
            id: O.now(),
            text: text,
            author: me.info,
            date: O.now() / 1000,
        };
        O('#pw_comments_result').append(commentsModule.prepareComments([comment]));
        var el = O('#comment' + comment.id),
            date_el = el.children('.comment_date');

        writeLoader(date_el, 13);

        var pid = cur.viewPhoto;
        var query = {
            act: 'add_comment',
            object: pid,
            message: text,
            hash: cur.photosData[cur.viewPhoto].comment_hash,
        };

        if (cur.replyToID > 0) {
            if (text.substr(0, cur.replyToName.length) == cur.replyToName) {
                query.reply_to = cur.replyToID;
                cur.replyToID = cur.replyToName = false;
            }
        }

        if (cur.photosData[pid].commentsNextFrom) {
            cur.photosData[pid].commentsNextFrom = 0;
            query.need_comments = 1;
        }

        cur.commentsScroll && cur.commentsScroll.update().scrollToBottom();

        ServerRequest.send(query, {
            onDone: function(data) {
                if (!cur.photosData[pid]) {
                    return;
                }
                if (query.need_comments) {
                    cur.photosData[pid].comments_count = data.comments.total;
                    cur.photosData[pid].comments = data.comments.items;
                    cur.photosData[pid].commentsPrevFrom = data.comments.new_offset;
                    cur.photosData[pid].commentsNextFrom = 0;
                } else {
                    cur.photosData[pid].comments_count++;
                    cur.photosData[pid].comments.push(O.extend(comment, data));
                }

                if (pid == cur.viewPhoto) {
                    if (query.need_comments) {
                        cur.startLoadComments = false;
                        cur.startLoadBeforeComments = false;
                        O('#pw_comments_result').val(commentsModule.prepareComments(data.comments.items));
                        cur.commentsScroll && cur.commentsScroll.update().scrollToBottom();
                    } else {
                        el.attr('id', 'comment' + data.cid).addClass('comment_own').children('input').val(data.hash);
                        date_el.val(getDateText(data.date));
                    }

                    commentsModule.updateCommentsNum();
                }
            },
            onFail: function() {
                O('#comment_text').blur();
                el.remove();
            }
        });
    },
    focusCommentArea: function(e) {
        if (e.target.id == 'comment_text') {
            return;
        }
        O('#comment_text').focus().cursorToEnd();
    },
    clickComment: function(el) {
        el = O(el);
        if (el.hasClass('comment_own')) {
            return false;
        }
        cur.replyToName = el.children('.comment_author_name a').val().split(' ')[0];
        cur.replyToID = parseInt(el.attr('id').replace('comment', ''));
        var form = O('#comment_text').val(cur.replyToName + ',&nbsp;').cursorToEnd();
        commentsModule.checkFromSize(form);
    },
    onCommentsScroll: function() {
        var data = cur.photosData[cur.viewPhoto],
            st = cur.commentsScroll.el.scrollTop();

        if (st == 0) {
            commentsModule.loadMoreComments();
        }
        if (data.commentsNextFrom && (st >= cur.commentsScroll.el.scrollHeight() - cur.commentsScroll.el.height())) {
            commentsModule.loadBeforeComments();
        }
    },
    loadMoreComments: function() {
        var data = cur.photosData[cur.viewPhoto];
        if (cur.startLoadComments || !data.commentsPrevFrom || cur.disabledCommentsMore) {
            return;
        }
        cur.startLoadComments = true;
        writeLoader('#comments_prev_loader', 34);

        var pid = cur.viewPhoto,
            height = cur.commentsScroll.el.scrollHeight();
        ServerRequest.send({
            act: 'load_comments',
            object: cur.viewPhoto,
            offset: data.commentsPrevFrom,
        }, {
            onDone: function(data) {
                if (!cur.photosData[pid]) {
                    return;
                }
                cur.photosData[pid].commentsPrevFrom = data.new_offset;
                Array.prototype.unshift.apply(cur.photosData[pid].comments, data.items);
                cur.photosData[pid].comments_count = data.total;

                if (cur.viewPhoto != pid) {
                    return;
                }
                cur.startLoadComments = false;
                var items = commentsModule.prepareComments(data.items);
                O('#pw_comments_result').prepend(items);
                commentsModule.updateCommentsNum();
                cur.commentsScroll.scrollTop(cur.commentsScroll.el.scrollHeight() - height);
            }
        });
    },
    loadBeforeComments: function() {
        var data = cur.photosData[cur.viewPhoto];
        if (cur.startLoadBeforeComments || !data.commentsNextFrom || cur.disabledCommentsMore) {
            return;
        }
        cur.startLoadBeforeComments = true;
        writeLoader('#comments_next_loader', 34);

        var pid = cur.viewPhoto,
            height = cur.commentsScroll.el.scrollHeight(),
            cid = O('#pw_comments_result .comment:last-child').attr('id').replace('comment', '');
        ServerRequest.send({
            act: 'load_comments',
            photo: cur.viewPhoto,
            comment_id: cid,
        }, {
            onDone: function(data) {
                if (!cur.photosData[pid]) {
                    return;
                }
                cur.photosData[pid].commentsNextFrom = data.new_offset;
                Array.prototype.push.apply(cur.photosData[pid].comments, data.items);
                cur.photosData[pid].comments_count = data.total;

                if (cur.viewPhoto != pid) {
                    return;
                }
                cur.startLoadBeforeComments = false;
                var items = commentsModule.prepareComments(data.items);
                O('#pw_comments_result').append(items);
                commentsModule.updateCommentsNum();
                cur.commentsScroll.update(1);
            }
        });
    },
    checkMoreCommentsButtons: function() {
        var data = cur.photosData[cur.viewPhoto];

        if (!cur.startLoadComments) {
            O('#comments_prev_loader').remove();
            if (data.commentsPrevFrom) {
                O('#pw_comments_scroll').prepend('<div id="comments_prev_loader" class="pw_preloader"><div class="button" onClick="commentsModule.loadMoreComments()">' + lang.show_previos_comments + '</div></div>');
            }
        }

        if (!cur.startLoadBeforeComments) {
            O('#comments_next_loader').remove();
            if (data.commentsNextFrom) {
                O('#pw_comments_scroll').append('<div id="comments_next_loader" class="pw_preloader"><div class="button" onClick="commentsModule.loadBeforeComments()">' + lang.show_more + '</div></div>');
            }
        }
    },
};

var Emoji = {
    emojiCharSeq: /[0-9\uD83D\uD83C\uD83E]/,
    emojiRegEx: /((?:[\u203C\u2049\u2122\u2328\u2601\u260E\u261d\u2626\u262A\u2638\u2639\u263a\u267B\u267F\u2702\u2708]|[\u2600\u26C4\u26BE\u2705\u2764]|[\u2194-\u2199\u21AA\u21A9]|[\u231A-\u231B]|[\u23E9-\u23EF]|[\u23F0-\u23F4]|[\u23F8-\u23FA]|[\u24C2]|[\u25AA-\u25AB]|[\u25B6\u25C0]|[\u25FB-\u25FE]|[\u2602-\u2618]|[\u2648-\u2653]|[\u2660-\u2668]|[\u26A0-\u26FA]|[\u2692-\u269C]|[\u262E-\u262F]|[\u2622-\u2623]|[\u2709-\u2764]|[\u2795-\u2797]|[\u27A1]|[\u27BF]|[\u2934-\u2935]|[\u2B05-\u2B07]|[\u2B1B]|[\u2B50\u2B55]|[\u303D]|[\u3297\u3299]|[\uE000-\uF8FF]|[\uD83D\uD83C\uD83E][\uDC00-\uDFFF]|[0-9]\u20E3|[\u0023-\u0039\u203C-\u21AA]\uFE0F\u20E3|[\u200C\u200D])+)/g,
    emojiFlagRegEx: /\uD83C\uDDE8\uD83C\uDDF3|\uD83C\uDDE9\uD83C\uDDEA|\uD83C\uDDEA\uD83C\uDDF8|\uD83C\uDDEB\uD83C\uDDF7|\uD83C\uDDEC\uD83C\uDDE7|\uD83C\uDDEE\uD83C\uDDF9|\uD83C\uDDEF\uD83C\uDDF5|\uD83C\uDDF0\uD83C\uDDF7|\uD83C\uDDF7\uD83C\uDDFA|\uD83C\uDDFA\uD83C\uDDF8/,
    emojiToHTML: function(str, replaceSymbols) {
        str = str.replace(/&nbsp;/g, ' ').replace(/\&amp\;/g, '&')

        str = str.replace(/\&\#([0-9]+)\;/g, function() {
            var number = arguments[1];
            //a = Math.floor((number - 0x10000) / 0x400) + 0xD800,
            //b = (number - 0x10000) % 0x400 + 0xDC00,
            //hex = (a.toString(16) + b.toString(16)).toUpperCase();

            return O.replaceEntities('&#' + number);
            //return  Emoji.getEmojiHTML(hex, false, true);
        });

        var regs = {
            'D83DDE07': /(\s|^)([0O�]:\))([\s\.,]|$)/g,
            'D83DDE09': /(\s|^)(;-\)+)([\s\.,]|$)/g,
            'D83DDE06': /(\s|^)([X�x�]-?D)([\s\.,]|$)/g,
            'D83DDE0E': /(\s|^)(B-\))([\s\.,]|$)/g,
            'D83DDE0C': /(\s|^)(3-\))([\s\.,]|$)/g,
            'D83DDE20': /(\s|^)(&gt;\()([\s\.,]|$)/g,
            'D83DDE30': /(\s|^)(;[o�O�])([\s\.,]|$)/g,
            'D83DDE33': /(\s|^)(8\|)([\s\.,]|$)/g,
            'D83DDE32': /(\s|^)(8-?[o�O�])([\s\.,]|$)/g,
            'D83DDE0D': /(\s|^)(8-\))([\s\.,]|$)/g,
            'D83DDE37': /(\s|^)(:[X�])([\s\.,]|$)/g,
            'D83DDE28': /(\s|^)(:[o�O�])([\s\.,]|$)/g,
            '2764': /(\s|^)(&lt;3)([\s\.,]|$)/g
        };

        for (var i = 0; i < 2; i++) {
            for (var code in regs) {
                str = str.replace(regs[code], function(match, pre, smile, space) {
                    return (pre || '') + Emoji.getEmojiHTML(code) + (space || '');
                });
            }
        }

        var regs = {
            'D83DDE0A': /(:-\))([\s\.,]|$)/g,
            'D83DDE03': /(:-D)([\s\.,]|$)/g,
            'D83DDE1C': /(;-[P�])([\s\.,]|$)/g,
            'D83DDE0B': /(:-[p�])([\s\.,]|$)/g,
            'D83DDE12': /(:-\()([\s\.,]|$)/g,
            '263A': /(:-?\])([\s\.,]|$)/g,
            'D83DDE0F': /(;-\])([\s\.,]|$)/g,
            'D83DDE14': /(3-?\()([\s\.,]|$)/g,
            'D83DDE22': /(:&#039;\()([\s\.,]|$)/g,
            'D83DDE2D': /(:_\()([\s\.,]|$)/g,
            'D83DDE29': /(:\(\()([\s\.,]|$)/g,
            //'D83DDE15': /(:\\)([\s\.,]|$)/g,
            'D83DDE10': /(:\|)([\s\.,]|$)/g,
            'D83DDE21': /(&gt;\(\()([\s\.,]|$)/g,
            'D83DDE1A': /(:-\*)([\s\.,]|$)/g,
            'D83DDE08': /(\}:\))([\s\.,]|$)/g,
            'D83DDC4D': /(:like:)([\s\.,]|$)/g,
            'D83DDC4E': /(:dislike:)([\s\.,]|$)/g,
            '261D': /(:up:)([\s\.,]|$)/g,
            '270C': /(:v:)([\s\.,]|$)/g,
            'D83DDC4C': /(:ok:|:��:)([\s\.,]|$)/g
        };
        for (var code in regs) {
            str = str.replace(regs[code], function(match, smile, space) {
                return Emoji.getEmojiHTML(code) + (space || '');
            });
        }

        if (replaceSymbols) {
            str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace);
        }

        return str;
    },
    emojiReplace: function(symbolstr) {
        var i = 0;
        var buffer = '';
        var altBuffer = '';
        var num = '';
        var symbols = [];
        var codes = [];
        var collectCodes = true;

        if (symbolstr.match(/\uFE0F\u20E3/g)) {
            symbolstr = symbolstr.replace(/\uFE0F/g, '');
        }

        do {
            var num = symbolstr.charCodeAt(i++);

            if (!num) {
                collectCodes = false;
                continue;
            }

            var code = num.toString(16).toUpperCase();
            var symbol = symbolstr.charAt(i - 1);

            if (num == 8419) {
                var numPrevPos = i - 2;
                var numPrevChar = symbolstr.charAt(numPrevPos);

                codes.push('003' + numPrevChar + '20E3');
                symbols.push(numPrevChar);

                buffer = '';
                altBuffer = '';
                continue;
            }

            buffer += code;
            altBuffer += symbol;

            if (!symbol.match(Emoji.emojiCharSeq)) {
                codes.push(buffer);
                symbols.push(altBuffer);
                buffer = '';
                altBuffer = '';
            }

        } while (collectCodes)

        if (buffer) {
            codes.push(buffer);
            symbols.push(altBuffer);
        }

        var out = '';
        var joiner = false;
        var isFlag = false;

        i = 0;
        buffer = '';
        altBuffer = '';

        for (var i in codes) {
            var code = codes[i];
            var symbol = symbols[i];
            if (symbol.match(/\uD83C[\uDFFB-\uDFFF]/)) { // colors
                buffer += code;
                altBuffer += symbol;
                continue;
            }
            if (joiner) {
                buffer += code;
                altBuffer += symbol;
                joiner = false;
                continue;
            }
            if (code == '200C' || code == '200D') { // joiners
                if (buffer) {
                    joiner = true;
                    continue;
                } else {
                    out += symbol;
                }
            }
            if (symbol.match(/\uD83C[\uDDE6-\uDDFF]/)) { // flags
                if (isFlag) {
                    buffer += code;
                    altBuffer += symbol;
                    isFlag = false;
                    continue;
                }
                isFlag = true;
            } else if (isFlag) {
                isFlag = false;
            }

            if (buffer) {
                out += Emoji.getEmojiHTML(buffer, altBuffer, true);
            }
            buffer = code;
            altBuffer = symbol;
        }

        if (buffer) {
            out += Emoji.getEmojiHTML(buffer, altBuffer, true);
        }

        return out;
    },
    getEmojiHTML: function(code, symbol, enabled) {
        return '<img class="emoji" ' + (symbol ? 'alt="' + symbol + '"' : '') + ' src="/images/emoji/' + code + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.png" />';
    }
};

var Search = {
    focus: function() {
        if (Search.extendedMode) {
            return;
        }
        var query_str = O('#search_query').val();
        if (!query_str && !Search.popularList) {
            cur.searchNeedShowFast = 1;
            return;
        }
        O('.search_wrap').append(Templates.get('searchResultWrap'));
        setTimeout(function() {
            O('.search_result_wrap').addClass('search_result_wrap_shown');
        });
        Search.updateItems();
        Search.shown = 1;
    },
    blur: function() {
        delete cur.searchNeedShowFast;
        O('.search_result_wrap').remove();
        Search.shown = 0;
    },
    updateItems: function() {
        var query_str = O('#search_query').val();
        if (query_str) {
            O('#search_result_title_popular').addClass('no_display');
            O('#search_result_title').removeClass('no_display');
            var items = Search.lastResult || [];
        } else {
            O('#search_result_title').addClass('no_display');
            O('#search_result_title_popular').removeClass('no_display');
            var items = Search.popularList;
        }
        var result = '';
        for (var i in items) {
            var item = roomsHub.getRoom(items[i]);
            var room = {
                id: item.id,
                title: item.title,
                followers: formatNumberShort(item.followers) + langNumeric(item.followers, lang.followers_num, 1),
                domain: item.domain,
                followed: item.role ? 'follow_btn_active' : '',
                hash: item.follow_hash,
                follow_visible: (me.logged && -me.id != item.id) ? '' : 'no_display',
                cover: item.cover,
            };
            result += Templates.get('searchItem', room);
        }
        if (!result) {
            result = Templates.get('searchResultEmpty');
            O('.search_result_title a').addClass('no_display');
        } else {
            O('.search_result_title a').removeClass('no_display');
        }
        O('#search_result').val(result);
    },
    loadPopular: function() {
        ServerRequest.send({
            act: 'get_populars',
        }, {
            onDone: function(data) {
                roomsHub.putRooms(data.rooms_data, {
                    profiles: data.profiles,
                });
                Search.popularList = data.rooms_list;
                if (cur.searchNeedShowFast) {
                    Search.focus();
                }
            }
        });
    },
    itemDown: function(el, e) {
        el = O(el);
        var target = O(e.target);
        if (target.hasClass('follow_btn')) {
            O.cancelEvent(e);
            if (target.hasClass('button_loading')) {
                return;
            }
            Search.setFollow(target, el);
            return false;
        }
        goPage(el.attr('href'));
    },
    setFollow: function(target, el, force) {
        target = O(target);
        if (!el) {
            el = target;
        }

        buttonLoading(target);

        if (target.hasClass('button')) {
            var un = !target.hasClass('button_fill');
        } else {
            var un = target.hasClass('follow_btn_active');
        }

        var room_id = parseInt(el.attr('data-room-id')),
            roomInfo = roomsHub.getRoom(room_id);

        if (!force && un && roomInfo.role && roomInfo.role != 'viewer') {
            showBox({
                    title: lang.warning,
                    content: lang.unfollow_warning,
                    resultClass: 'modal_warning_result',
                    width: 500,
                })
                .addButton(lang.cancel, 'curModal.close()', {
                    inline: 1
                })
                .addButton(lang.confirm_unfollow, function() {
                    Search.setFollow(target, el, 1);
                    curModal.close();
                });
            return;
        }

        ServerRequest.send({
            act: (un ? 'un' : '') + 'follow',
            room_id: room_id,
            hash: el.attr('data-follow-hash'),
        }, {
            onDone: function() {
                buttonLoadingStop(target);
                if (un) {
                    if (target.hasClass('button')) {
                        target.val(lang.follow);
                        target.addClass('button_fill');
                    } else {
                        target.removeClass('follow_btn_active');
                    }
                } else {
                    if (target.hasClass('button')) {
                        target.removeClass('button_fill');
                        target.val(lang.unfollow);
                    } else {
                        target.addClass('follow_btn_active');
                    }
                }
                roomsHub.putRooms({
                    id: room_id,
                    role: un ? '' : 'viewer'
                });
            },
            onFail: function() {
                buttonLoadingStop(target);
                if (target.hasClass('button')) {
                    target.val(lang.follow);
                    target.addClass('button_fill');
                } else {
                    target.removeClass('follow_btn_active');
                }
            }
        });
    },
    keyUp: function(el) {
        el = O(el);

        var query = el.val();

        if (!query) {
            O('#search_close_wrap').addClass('no_display');
        } else {
            O('#search_close_wrap').removeClass('no_display');
        }

        if (!query && !Search.extendedMode) {
            clearTimeout(Search.timer);
            return Search.updateItems();
        }
        clearTimeout(Search.timer);
        if ($s('search').hashTagMode) {
            Search.timer = setTimeout(function() {
                query = O('#search_query').val();
                if (query) {
                    Search.hashTagInit(query, 1);
                }
            }, 600);
            return;
        }
        Search.timer = setTimeout(function() {
            ServerRequest.send({
                act: 'search',
                query: query,
                extended: Search.extendedMode,
            }, {
                onDone: function(data) {
                    roomsHub.putRooms(data.rooms_data, {
                        profiles: data.profiles,
                    });
                    Search.lastResult = data.rooms_list;
                    if (Search.extendedMode) {
                        if (data.rooms_list.length) {
                            var rooms = Search.prepareExtendedItems(data.rooms_list);
                        } else {
                            var rooms = Templates.get('searchResultEmpty');
                        }
                        cur.searchNextFrom = data.next_from;
                        delete cur.searchStartMore;
                        O('#search_extended_result').val(rooms);
                    } else {
                        Search.updateItems();
                    }
                }
            });
        }, 200);
    },
    clean: function(e, clear) {
        if (e) {
            O.cancelEvent(e);
        }
        var el = O('#search_query').val('');
        Search.keyUp(el);
        if (!clear) {
            el.focus();
        }
    },
    // extended search
    init: function() {
        Page({
            act: 'search',
            extended: 1,
            query: O('#search_query').val(),
        }).onInit(function() {
            Search.extendedMode = 1;
        }).onDestroy(function() {
            Search.extendedMode = 0;
        }).onDone(function(data) {
            if (data.rooms_list.length) {
                cur.searchNextFrom = data.next_from;
                delete cur.searchStartMore;

                roomsHub.putRooms(data.rooms_data, {
                    profiles: data.profiles,
                });
                var rooms = Search.prepareExtendedItems(data.rooms_list);
            } else {
                var rooms = Templates.get('searchResultEmpty');
            }
            O('#page_wrap').val(Templates.get('searchExtendedWrap', rooms));
            roomPanel.render(data.room_info);
        }).onMore(Search.loadMore);
    },
    prepareExtendedItems: function(items) {
        var result = '';
        for (var i in items) {
            var item = roomsHub.getRoom(items[i]);
            var room = {
                id: item.id,
                hash: item.follow_hash,
                domain: item.domain,
                title: item.title,
                followers: formatNumber(item.followers) + langNumeric(item.followers, lang.followers_num, 1),
                follow_btn_class: (me.logged && -me.id != item.id) ? (item.role ? '' : 'button_fill') : 'no_display',
                follow_btn_text: item.role ? lang.unfollow : lang.follow,
                cover: item.cover,
            };

            var photos = '';
            if (item.photos) {
                for (var j in item.photos) {
                    photos += Templates.get('searchExtendedItemPhoto', item.photos[j]);
                }
            }

            result += Templates.get('searchExtendedItem', room, photos);
        }
        return result;
    },
    loadMore: function() {
        if (cur.searchStartMore || !cur.searchNextFrom) {
            return;
        }
        cur.searchStartMore = true;
        var query = O('#search_query').val();
        ServerRequest.send({
            act: 'search',
            extended: 1,
            query: query,
            start_from: cur.searchNextFrom,
        }, {
            onDone: function(data) {
                if (query != O('#search_query').val()) {
                    return;
                }
                cur.searchNextFrom = data.next_from;
                cur.searchStartMore = false;
                roomsHub.putRooms(data.rooms_data, {
                    profiles: data.profiles,
                });
                O('#search_extended_result').append(Search.prepareExtendedItems(data.rooms_list));
            }
        });
    },
    hashTagInit: function(hashtag, from_search) {

        if (isMob) {
            return mobilePages.openInApp(location.href);
        }

        Search.extendedMode = 1;
        $s('search').hashTagMode = 1;

        hashtag = hashtag.replace('#', '').replace('/', '');
        if (from_search) {
            var href = 'https://' + document.domain + '/#' + hashtag;
            history.pushState({
                h: href
            }, false, href);
        }
        if (hashtag) {
            O('#search_query').val('#' + hashtag);
            O('#search_close_wrap').removeClass('no_display');
        }
        Page({
            act: 'hashtag',
            hashtag: hashtag,
        }).onDone(function(data) {
            if (data.feed.length > 0) {
                var feed = roomView.prepareFeed(data);
            } else {
                var feed = Templates.get('roomViewNotPhotos');
            }
            setPageContent(Templates.get('hashTagsWrap', feed));
            otherPages.checkRoomPanel(data.room_info);

            if (data.feed.length > 0) {
                O('#hashtags_feed_count').val(langNumeric(data.total_count, lang.hashtag_photos_count));
            } else {
                roomView.noPhotosWrapHeight();
            }

            roomView.photosLinesH = [0, 0, 0];
            roomView.assignPhotos();
        }).onMoreDone(function(data) {
            O('#room_photos').append(roomView.prepareFeed(data));
            roomView.assignPhotos();
        }).onMoreProgress(function() {
            writeLoader('#room_photos_preloader', 30);
        }).onMoreStop(function(no_more) {
            destroyLoader('#room_photos_preloader', no_more);
        });
    },
};

var roomsHub = {
    init: function() {
        window.roomsListener = new snListener();
        this.rooms = {};
    },
    putRooms: function(rooms, opts) {
        if (!O.isArray(rooms)) {
            rooms = [rooms];
        }
        if (!opts) {
            opts = {};
        }
        if (opts.profiles) {
            rooms = prepareUsersRooms(rooms, opts.profiles);
        }

        var updated_list = [];
        rooms = O.clone(rooms, 1);
        for (var i in rooms) {
            var room_id = rooms[i].id;

            if (rooms[i].first_name) {
                rooms[i] = roomFieldsForUser(rooms[i]);
                room_id = -room_id;
                rooms[i].id = room_id;
            }

            updated_list.push(room_id);
            this.rooms[room_id] = O.extend(this.rooms[room_id] || {}, rooms[i]);
        }
        if (updated_list.length) {
            roomsListener.broadcast(updated_list);
        }
    },
    getRoom: function(room_id, opts) {
        if (O.isObject(room_id)) {
            room_id = room_id.id;
        }
        if (!opts) {
            opts = {};
        }
        if (!this.rooms[room_id]) {
            return {
                title: 'NOT FOUND'
            };
        }
        var room = O.clone(this.rooms[room_id], 1);

        room.cover = getRoomCover(room);
        room.title = O.clean(winToUtf(room.title));
        room.date = getDateText(room.date);
        room.followers = room.followers

        if (opts.title_maxlen && room.title.length >= opts.title_maxlen) {
            room.title = room.title.substr(0, opts.title_maxlen - 2) + '..';
        }

        if (!opts.no_icons) {
            if (room_id > 0 && !room.public) {
                room.title += '<span class="icon-private"></span>';
            } else if (room.verified && !opts.no_verify_icon) {
                room.title += '<span class="icon-verify"></span>';
            }
        }

        return room;
    },
    getRooms: function(rooms) {
        var res = [];
        for (var i = 0; i < rooms.length; i++) {
            res.push(roomsHub.getRoom(rooms[i]));
        }
        return res;
    },
};

var Upload = {
    clickButton: function() {
        O('#upload_input_file').click();
    },
    onChange: function(files) { // select file
        var file = files[0];

        if (file.size > 1024 * 1024 * 5) {
            errorBox(lang.photo_upload_bad_size);
            return;
        }

        var reader = new FileReader();
        reader.onloadend = function() {
            O('.upload_preview').setStyle('background-image', 'url(' + reader.result + ')');
        };
        reader.readAsDataURL(file);

        Upload.showBox();

        var room_id = roomPanel.roomID,
            roomData = roomsHub.getRoom(room_id);

        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {
            cur.uploadData = eval('(' + xhr.responseText + ')');
            O('.upload_progress_str').val(lang.upload_done).parent().addClass('upload_progress_done');
            O('#upload_progress_line').setStyle('width', '100%');
            O('#upload_save_btn').removeClass('button_disabled');
        };
        xhr.upload.onprogress = function(e) {
            var persent = e.loaded / e.total * 100;
            O('#upload_progress_line').setStyle('width', persent + '%');
        };
        xhr.onerror = Upload.onError;

        var formData = new FormData();
        formData.append('file1', file);

        xhr.open('POST', roomData.uploadServer, true);
        xhr.send(formData);
    },
    onError: function() {
        O('.upload_progress_str').val(lang.error_title).parent().addClass('upload_progress_done');
        O('#upload_progress_line').setStyle('width', '100%');
    },
    showBox: function() {
        var roomData = roomsHub.getRoom(roomPanel.roomID);
        Upload.box = createLayout({
            content: Templates.get('uploadBox'),
            width: 700,
            disabledClose: 1,
            contClass: 'upload_box'
        });
        cur.uploadExportDD = new DropDown('upload_export_method', {
            options: [
                [1, lang.vk_export_album],
                [2, lang.vk_export_wall],
            ]
        });
        O('#upload_descr').focus();

        if (roomData.can_suggest) {
            O('#upload_save_btn').val(lang.suggest_photo_button).addClass('button_green');
        }
    },
    cancelUpload: function() {
        curModal.close();
        Upload.destroyUpload();
    },
    destroyUpload: function() {
        delete cur.uploadExportDD;
    },
    savePhoto: function() {
        var descr = O('#upload_descr').val(),
            vk_export = O('#vk_export').hasClass('checkbox_active') ? 1 : 0,
            vk_export_method = cur.uploadExportDD.selected;

        var btn = O('#upload_save_btn');
        if (btn.hasClass('button_loading button_disabled')) {
            return;
        }

        var room_id = roomPanel.roomID;

        buttonLoading(btn);
        O('#upload_cancel_btn').addClass('no_display');

        var query = {
            act: 'save_photo',
            descr: descr,
            vk_export: vk_export,
            vk_export_method: vk_export_method,
            room_id: room_id,
        };
        query = O.extend(query, cur.uploadData);

        Upload.box.disableClose();
        ServerRequest.send(query, {
            onDone: function(data) {
                pageRoute();
            },
            onFail: function() {
                buttonLoadingStop(btn);
                Upload.onError();
                Upload.box.enableClose();
            }
        });
    },
};

var NotifyPad = {
    showPad: function() {
        if (this.shown) {
            return this.hidePad();
        }
        this.shown = 1;

        var pad = O('#notify_pad');

        if (!this.inited) {
            pad.val(Templates.get('notifyPad', '<div class="notfiy_pad_loader">' + writeLoader(-1, 30) + '</div>'));
            this.inited = 1;
            NotifyPad.scroll = new Scrollbar('#notfiy_pad_scroll', {
                onScroll: NotifyPad.onScroll
            });
            this.loadNotifications();
        } else {
            NotifyPad.loadNewNotifications();
        }

        pad.addClass('notify_pad_shown');

        if (Search.shown) {
            O('#search_query').blur();
        }
    },
    hidePad: function() {
        this.shown = 0;
        O('#notify_pad').removeClass('notify_pad_shown');
    },
    loadNotifications: function() {
        if (this.startLoad) {
            return;
        }
        this.startLoad = 1;
        ServerRequest.send({
            act: 'notifications',
            read: 1,
        }, {
            onDone: function(data) {
                NotifyPad.startLoad = 0;
                NotifyPad.startFrom = data.next_from;
                if (!data.items.length) {
                    var items = Templates.get('notifyPadEmpty');
                } else {
                    var items = NotifyPad.prepareNotifications(data, data.notify_num);
                }
                O('#notfiy_pad_result').val(items);
                NotifyPad.scroll.update();
                NotifyPad.updateNewNum(0);
            }
        });
    },
    wrapTypes: {
        USER: 'notifyPadItemUser',
        ROOM: 'notifyPadItemRoom',
        PHOTO: 'notifyPadItemPhoto',
    },
    prepareNotifications: function(data, spliter) {
        roomsHub.putRooms(data.rooms_data, {
            profiles: data.profiles,
        });
        roomsHub.putRooms(data.profiles);

        var photos = {};
        for (var i in data.photos) {
            photos[data.photos[i].id] = data.photos[i];
        }
        var result = '';
        for (var i in data.items) {
            var item = data.items[i];

            var item_data = {
                date: getDateText(item.date),
            };

            if (item.room_id) {
                item_data.room = roomsHub.getRoom(item.room_id, {
                    no_verify_icon: 1,
                });
            }
            if (item.photo_id) {
                item_data.photo = photos[item.photo_id];
                item_data.photo.comment_id = 0;
                item_data.photo.force_server = 0;
            }
            if (item.user_id) {
                item_data.user = roomsHub.getRoom(-item.user_id, {
                    no_verify_icon: 1,
                });
                if (item_data.user.role) {
                    item_data.user.followed_class = 'follow_btn_active';
                }
            }

            var wrap_type = this.wrapTypes.USER;
            switch (item.type) {
                case 'follow':
                    var text = langSex(item_data.user.sex, 'notfiy_follow');
                    if (item.room_id > 0) {
                        wrap_type = this.wrapTypes.ROOM;
                        text = text.replace('%s', makeLink(item_data.room.domain, item_data.room.title, {
                            className: 'notify_link'
                        }));
                    } else {
                        text = text.replace('%s', '');
                    }
                    item_data.text = text;
                    break;
                case 'like_photo':
                    wrap_type = this.wrapTypes.PHOTO;
                    item_data.text = langSex(item_data.user.sex, 'notfiy_like_photo');
                    break;
                case 'comment_photo':
                case 'photo_mention':
                case 'photo_comment_mention':
                case 'comment_photo_reply':
                    wrap_type = this.wrapTypes.PHOTO;

                    if (item.type == 'photo_comment_mention') {
                        item.type = 'photo_mention';
                    }
                    item_data.text = langSex(item_data.user.sex, 'notfiy_' + item.type);
                    item_data.photo.comment_id = item.comment ? item.comment.id : 0;
                    item_data.photo.force_server = 1;
                    break;
                case 'friend_joined':
                    item_data.text = langSex(item_data.user.sex, 'notfiy_friend_joined' + (item.install_v2 == 1 ? '_v2' : ''));
                    break;
                case 'create_room':
                    wrap_type = this.wrapTypes.ROOM;
                    item_data.text = langSex(item_data.user.sex, 'notfiy_create_room').replace('%s', makeLink(item_data.room.domain, item_data.room.title, {
                        className: 'notify_link'
                    }));
                    break;
                case 'set_room_access':
                    wrap_type = this.wrapTypes.ROOM;
                    item_data.text = langSex(item_data.user.sex, 'notfiy_set_room_access')
                        .replace('{role}', lang['notify_role_' + item.role])
                        .replace('%s', makeLink(item_data.room.domain, item_data.room.title, {
                            className: 'notify_link'
                        }));
                    break;
                case 'suggest_photo_accepted':
                case 'suggest_photo_rejected':
                    wrap_type = this.wrapTypes.PHOTO;
                    item_data.user = item_data.room;
                    item_data.text = lang['notify_' + item.type].replace('%s', makeLink(item_data.room.domain, item_data.room.title, {
                        className: 'notify_link'
                    }));
                    item_data.photo.comment_id = 1;
                    item_data.photo.force_server = 1;
                    break;
                default: // unknown type
                    continue;
                    break;
            }
            if (spliter !== 'after' && spliter > 0 && i == spliter) {
                result += Templates.get('notifyPadSpliter');
            }
            result += Templates.get('notifyPadItemWrap', Templates.get(wrap_type, item_data), item._id);
        }
        if (spliter === 'after' && result) {
            result += Templates.get('notifyPadSpliter');
        }
        if (arguments.length > 1) {
            O('#notify_pad_spliter').remove();
        }
        return result;
    },
    getNotifyNum: function() {
        ServerRequest.send({
            act: 'notifications_num',
        }, {
            onDone: function(num) {
                NotifyPad.updateNewNum(num);
                if (NotifyPad.shown) {
                    NotifyPad.loadNewNotifications();
                }
            }
        });
    },
    updateNewNum: function(num) {
        num = parseInt(num);
        if (num > 0) {
            O('.sn_notify_btn').addClass('sn_notify_btn_unread');
        } else {
            O('.sn_notify_btn').removeClass('sn_notify_btn_unread');
        }
    },
    onScroll: function() {
        var el = O('#notfiy_pad_scroll'),
            sH = el.scrollHeight(),
            h = el.height(),
            top = el.scrollTop();

        if (top + h >= sH) {
            NotifyPad.loadMoreNotifications();
        }
    },
    loadMoreNotifications: function() {
        var _s = NotifyPad;
        if (_s.loadingMore || !_s.startFrom) {
            return;
        }
        _s.loadingMore = 1;
        ServerRequest.send({
            act: 'notifications',
            start_from: _s.startFrom,
        }, {
            onDone: function(data) {
                _s.loadingMore = 0;
                _s.startFrom = data.next_from;
                var items = NotifyPad.prepareNotifications(data);
                O('#notfiy_pad_result').append(items);
                NotifyPad.scroll.update(1);
            }
        });
    },
    loadNewNotifications: function() {
        if (NotifyPad.startBeforeLoad || !NotifyPad.shown) {
            return;
        }
        NotifyPad.startBeforeLoad = 1;
        var before_id = O('#notfiy_pad_result .notfiy_pad_item_wrap:first-child').attr('data-id');
        ServerRequest.send({
            act: 'notifications',
            before_id: before_id,
            read: 1,
        }, {
            onDone: function(data) {
                NotifyPad.startBeforeLoad = 0;
                O('#notfiy_pad_result').prepend(NotifyPad.prepareNotifications(data, 'after'));
                NotifyPad.updateNewNum(0);
            }
        });
    },
};

var roomsManage = {
    createRoom: function(room_id) {
        cur.createRoomVars = {};
        if (room_id > 0) {
            var roomData = roomsHub.getRoom(room_id, {
                no_icons: 1,
            });
            cur.createRoomVars.editMode = 1;
            cur.createRoomVars.roomID = room_id;
            cur.createRoomVars.saveHash = roomData.save_hash;
        } else {
            var roomData = {
                title: '',
                description: '',
                cover_src: '',
            };
            cur.createRoomVars.saveHash = cur.saveRoomHash;
        }

        var tabs = {
            items: [],
            onChange: roomsManage.editRoomOnTabChange,
        };
        tabs.items.push({
            id: 'settings',
            text: lang[room_id > 0 ? 'edit_room' : 'create_room'],
            wrap: '#create_room_tab_settings'
        });

        if (!cur.createRoomVars.editMode) {
            //tabs.items.push({id: 'invite', text: lang.invite_friends, wrap: '#create_room_tab_invite'});
        } else {
            tabs.items.push({
                id: 'authors',
                text: '������',
                wrap: '#create_room_tab_authors'
            });
            tabs.items.push({
                id: 'viewers',
                text: '����������',
                wrap: '#create_room_tab_viewers'
            });
        }
        cur.createRoomVars.tab = 'settings';

        var boxData = {
            title: String(roomData.title),
            descr: String(roomData.description),
            public: roomData.public ? 'sn_switch_active' : '',
            cover: roomData.cover_src ? 'background-image: url(' + roomData.cover_src + ');' : '',
        };

        showBox({
                content: Templates.get('createRoomBox', boxData),
                width: 550,
                tabs: tabs,
                resultClass: 'clear_fix create_room_wrap',
                footerClass: 'modal_footer_right'
            })
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.save, 'roomsManage.saveRoom(this);')
            .setOption('fixFooter', 1)
            .onMore(roomsManage.editRoomOnMore)
            .onClose(function() {
                if (cur.createRoomVars && cur.createRoomVars.needReload) {
                    pageRoute();
                }
            });

        cur.createRoomVars.selected = {};
    },
    editRoomOnTabChange: function(tab) {
        cur.createRoomVars.tab = tab;

        switch (tab) {
            case 'authors':
            case 'viewers':
                if (!cur.createRoomVars[tab + 'Loaded']) {
                    O('#create_room_tab_' + tab).val('<div class="modal_loader">' + writeLoader(-1, 40) + '</div>');
                    roomsManage.loadFollowers();
                }
                break;
        }
    },
    prepareInviteItems: function(list, data, tab, append) {

        if (tab !== 'invite' && !cur.createRoomVars[tab + 'Loaded']) {
            cur.createRoomVars[tab + 'Loaded'] = 1;
            O('#create_room_tab_' + tab).val(Templates.get('createRoomTabWrap', tab, cur.createRoomVars.roomID));
            if (tab === 'invite') {
                O('.create_room_search_wrap').removeClass('no_display');
            }
        }

        roomsHub.putRooms(data.rooms_data);

        if (tab === 'invite') {
            var selected = Object.keys($s('invite').selected);
            list = O.arrayUnique(selected.concat(list));
        } else {
            var selected = [];
        }

        var result = '';
        for (var i in list) {
            var uid = list[i],
                roomData = roomsHub.getRoom(-uid);

            var class_name = '',
                caption = '',
                extra = {
                    tab: tab
                };
            if (tab === 'invite') {
                var tools_opts = {
                    tools_class: 'no_display',
                };
                class_name = 'create_room_invite_item_disabled';
                /*if (O.inArray(uid, data.invited)) {
                  tools_opts.disabled_str = langSex(roomData.sex, 'invited_info');
                } else */
                if (O.inArray(uid, data.banned)) {
                    tools_opts.disabled_str = langSex(roomData.sex, 'blocked_info');
                } else if (O.inArray(uid, data.members)) {
                    tools_opts.disabled_str = langSex(roomData.sex, 'folloved_info');
                } else {
                    tools_opts.tools_class = '';
                    class_name = '';
                }
                var tools = Templates.get('createRoomInviteItemTools', roomData.id, tools_opts);
            } else if (tab == 'authors' || tab == 'viewers') {
                class_name = 'create_room_invite_item_with_caption';
                if (uid == data.creator_id) {
                    caption = lang.role_creator;
                    extra.role = 'creator';
                } else if (O.inArray(uid, data.admins)) {
                    caption = lang.invite_role_admin;
                    extra.role = 'admin';
                } else if (O.inArray(uid, data.invited)) {
                    caption = langSex(roomData.sex, 'invited_info');
                    extra.role = 'invited';
                } else {
                    if (tab === 'viewers') {
                        caption = lang.invite_role_follower;
                        extra.role = 'viewer';
                    } else {
                        caption = lang.invite_role_publisher;
                        extra.role = 'publisher';
                    }
                }
                extra.can_remove = O.inArray(data.can_remove) ? 1 : 0;
                if (uid == data.creator_id || uid == me.id) {
                    var tools = '';
                } else if (extra.role === 'invited') {
                    var tools = Templates.get('editRoomItemToolsInvited', roomData.id);
                } else {
                    var tools = Templates.get('editRoomItemToolsFollower', roomData.id);
                }
            }
            result += Templates.get('createRoomInviteItem', roomData, tools, class_name, caption, extra);
        }
        if (append) {
            O('#create_room_' + tab + '_result').append(result);
        } else {
            if (!result) {
                result = Templates.get('createRoomEmptyList', tab === 'invite' ? lang.search_not_found : lang.list_empty);
            }
            O('#create_room_' + tab + '_result').val(result);

            if (selected.length > 0) {
                for (var i in selected) {
                    var dd = O('#room_invite_dd-' + selected[i]).removeClass('no_display');
                    roomsManage.createRoomInitInviteDD(dd);
                    checkbox(dd.parent().children('.checkbox'));
                }
            }
        }

        curModal.update();
    },
    loadFollowers: function() {
        var tab = cur.createRoomVars.tab;
        ServerRequest.send({
            act: 'room_users',
            section: tab === 'viewers' ? 'viewers' : 'publishers',
            room_id: cur.createRoomVars.roomID,
        }, {
            onDone: function(data) {
                roomsManage.prepareInviteItems(data.rooms_list, data, tab);
                if (data.next_from) {
                    cur.createRoomVars[tab + 'StartFrom'] = data.next_from;
                }
            }
        });
    },
    clickInviteItem: function(el, e) {
        el = O(el);

        if (e && e.target && (e.target.tagName === 'A' || O(e.target).parent('a').count())) {
            return;
        }

        if (el.hasClass('create_room_invite_item_disabled')) {
            return;
        }

        var target = O(e.target),
            checkboxEl = el.children('.checkbox'),
            roomID = -parseInt(el.attr('data-room-id')),
            dd = O('#room_invite_dd-' + roomID);

        if (!$s('invite').shown && (cur.createRoomVars.tab === 'authors' || cur.createRoomVars.tab === 'viewers')) {
            return roomsManage.editRoleBox(-roomID, el);
        }

        if (target.hasClass('create_room_invite_dd') || target.parent('.create_room_invite_dd').count()) {
            return;
        }

        if (!target.hasClass('checkbox')) {
            checkbox(checkboxEl);
        }

        if (checkboxEl.hasClass('checkbox_active')) {
            var num = Object.keys($s('invite').selected).length;
            if (num > 30) {
                checkbox(checkboxEl);
                errorBox(lang.invite_limit_error);
                return;
            } else {
                $s('invite').selected[roomID] = parseInt(dd.attr('data-dd-val')) || 1;
                dd.removeClass('no_display');
            }
        } else {
            delete $s('invite').selected[roomID];
            dd.addClass('no_display');
        }

        if (!dd.attr('data-dd-inited')) {
            roomsManage.createRoomInitInviteDD(dd);
        }
    },
    createRoomInitInviteDD: function(dd) {
        var room_id = parseInt(dd.attr('id').replace('room_invite_dd-', ''));
        dd.attr('data-dd-inited', 1);
        new DropDown(dd.attr('id'), {
            options: [
                [1, lang.invite_role_publisher],
                [2, lang.invite_role_follower],
            ],
            def: $s('invite').selected[room_id],
            onChange: function(val) {
                $s('invite').selected[room_id] = val;
            }
        });
    },
    onSelectRoomCover: function(file) {
        if (!file) {
            return;
        }

        if (file.size > 1024 * 1024 * 5) {
            errorBox(lang.photo_upload_bad_size);
            return;
        }

        var reader = new FileReader();
        reader.onloadend = function() {
            O('.create_room_cover_img').setStyle('background-image', 'url(' + reader.result + ')');
        };
        reader.readAsDataURL(file);

        cur.startCoverUpload = 1;
        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {
            cur.coverData = eval('(' + xhr.responseText + ')');
            delete cur.startCoverUpload;
            O('#upload_cover_progress_line').setStyle('height', '0px');
        };
        xhr.upload.onprogress = function(e) {
            var persent = e.loaded / e.total * 100;
            O('#upload_cover_progress_line').setStyle('height', persent + '%');
        };
        xhr.onerror = roomsManage.uploadCoverError;

        var formData = new FormData();
        formData.append('file1', file);

        var roomData = roomsHub.getRoom(-me.id);
        xhr.open('POST', roomData.uploadServer, true);
        xhr.send(formData);
    },
    uploadCoverError: function() {
        errorBox(lang.upload_error);
        O('.create_room_cover_img').setStyle('background-image', '');
        delete cur.startCoverUpload;
    },
    saveRoom: function(btn) {
        btn = O(btn);
        if (btn.hasClass('button_loading')) {
            return;
        }

        var title = O('#create_room_title').val();

        if (title.length == 0 || title.length < 3 || title.length > 40) {
            if (title.length < 3) {
                errorBox(lang.room_title_error);
            }
            if (title.length > 40) {
                errorBox(lang.room_title_err2);
            }
            curModal.swithcTab('settings');
            return inputError('#create_room_title');
        }

        var query = {
            act: 'save_room',
            title: title,
            descr: O('#create_room_descr').val(),
            public: snSwitch.check('#sn_switch_public'),
            save_hash: cur.createRoomVars.saveHash,
            room_id: cur.createRoomVars.roomID || 0,
        };

        if (cur.coverData) {
            query = O.extend(query, cur.coverData);
        }

        buttonLoading(btn);
        curModal.disableClose();
        btn.parent().children('.button.button_inline').addClass('no_display');

        ServerRequest.send(query, {
            onDone: function(room_id) {
                cur.createRoomVars.needReload = 0;
                if (room_id != roomView.roomID) {
                    goPage('/room' + room_id);
                    cur.needShowInviteBox = 1;
                } else {
                    pageRoute(); // refresh
                }
            },
            onFail: function(code) {
                buttonLoadingStop(btn);
                btn.parent().children('.button.button_inline').removeClass('no_display');
                curModal.enableClose();

                if (code == 'flood_error') {
                    errorBox(lang.create_room_flood_error);
                    return true;
                }
            }
        });
    },
    editRoleBox: function(id, el) {
        var role = el.attr('data-role');
        if (role === 'creator' || id == -me.id) {
            return;
        }

        if (role === 'invited') {
            return showBox({
                    title: lang.confirm_title,
                    content: lang.confirm_uninvite_info,
                    resultClass: 'modal_warning_result',
                    width: 450,
                })
                .addButton(lang.cancel, 'curModal.close()', {
                    inline: 1
                })
                .addButton(lang.yes_button, 'roomsManage.cancelInvite(' + id + ', this)');
        }

        var roomData = roomsHub.getRoom(id);
        showBox({
                title: roomData.title,
                content: Templates.get('editRoleBox'),
                footerClass: 'modal_footer_right',
                width: 350,
                onClose: function() {
                    delete cur.editRoomRadio;
                }
            })
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.save, 'roomsManage.saveRoomRole(' + id + ', this)');

        cur.editRoomRadio = snRadio('#edit_room_role_radios', {
            items: [{
                    id: 'admin',
                    text: lang.role_admin,
                    caption: lang.role_admin_descr
                },
                {
                    id: 'publisher',
                    text: lang.role_author,
                    caption: lang.role_publisher_descr
                },
                {
                    id: 'viewer',
                    text: lang.role_viewer,
                    caption: lang.role_viewer_descr
                },
            ],
            def: role,
        });
        curModal.update();
    },
    cancelInvite: function(id, btn) {
        btn = O(btn);
        if (btn.hasClass('button_loading')) {
            return;
        }
        var cancel_bnt = btn.parent().children('.button.button_inline').addClass('no_display');

        curModal.disableClose();
        buttonLoading(btn);

        ServerRequest.send({
            act: 'cancel_invite',
            room_id: cur.createRoomVars.roomID,
            uid: -id,
            hash: roomsHub.getRoom(cur.createRoomVars.roomID).save_hash,
        }, {
            onDone: function() {
                O('.edit_room_item' + id).remove();
                curModal.close();
            },
            onFail: function() {
                cancel_bnt.removeClass('no_display');
                curModal.enableClose();
                buttonLoadingStop(btn);
            }
        });
    },
    saveRoomRole: function(id, btn) {
        btn = O(btn);
        if (btn.hasClass('button_loading')) {
            return;
        }
        var cancel_bnt = btn.parent().children('.button.button_inline').addClass('no_display');

        curModal.disableClose();
        buttonLoading(btn);

        var role = cur.editRoomRadio.getVal();
        ServerRequest.send({
            act: 'set_room_access',
            uid: -id,
            room_id: cur.createRoomVars.roomID,
            role: role,
            hash: roomsHub.getRoom(cur.createRoomVars.roomID).save_hash,
        }, {
            onDone: function() {
                var lng_key = role == 'publisher' ? 'author' : role;
                O('.edit_room_item' + id).attr('data-role', role).each(function() {
                    O(this).children('.create_room_invite_caption').val(lang['role_' + lng_key]);
                });
                curModal.close();
                cur.createRoomVars.needReload = 1;
            },
            onFail: function(code) {
                cancel_bnt.removeClass('no_display');
                curModal.enableClose();
                buttonLoadingStop(btn);

                if (code === 'access_error') {
                    errorBox(lang.set_room_access_error);
                    return true;
                }
            }
        });
    },
    editRoomOnMore: function() {
        var tab = cur.createRoomVars.tab;

        if (cur.createRoomVars[tab + 'Loading'] || !cur.createRoomVars[tab + 'StartFrom']) {
            return;
        }
        cur.createRoomVars[tab + 'Loading'] = 1;

        writeLoader('#create_room_' + tab + '_loader', 30);
        ServerRequest.send({
            act: 'room_users',
            room_id: cur.createRoomVars.roomID,
            section: tab === 'viewers' ? 'viewers' : 'publishers',
            start_from: cur.createRoomVars[tab + 'StartFrom'],
        }, {
            onDone: function(data) {
                roomsManage.prepareInviteItems(data.rooms_list, data, tab, 1);
                destroyLoader('#create_room_' + tab + '_loader');
                if (data.next_from) {
                    cur.createRoomVars[tab + 'Loading'] = 0;
                    cur.createRoomVars[tab + 'StartFrom'] = data.next_from;
                }
            }
        });
    },
    showInviteBox: function(room_id) {
        $clear('invite');
        $s('invite', {
            roomID: room_id,
            selected: {},
            shown: 1,
        });
        showBox({
                title: lang.invite_friends,
                content: Templates.get('inviteRoomBox'),
                width: 550,
                resultClass: 'clear_fix create_room_wrap',
                footerClass: 'modal_footer_right',
            }).setOption('fixFooter', 1)
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.send, 'roomsManage.sendInvites(this)')
            .onClose(function() {
                $s('invite').shown = 0;
                if ($s('invite').changed) {
                    pageRoute();
                }
            });
        O('#create_room_invite_result').val('<div class="modal_loader">' + writeLoader(-1, 40) + '</div>');
        roomsManage.inviteSearch(1);
        curModal.update();
    },
    inviteSearch: function(fast) {
        if ($s('invite').loading) {
            return;
        }

        clearTimeout($s('invite').timer);
        $s('invite').timer = setTimeout(function() {
            $s('invite').loading = 1;
            ServerRequest.send({
                act: 'users_search',
                room_id: $s('invite').roomID,
                query: O('#friends_query').val(),
                tab: 'invite',
            }, {
                onDone: function(data) {
                    $s('invite').loading = 0;
                    roomsManage.prepareInviteItems(data.rooms_list, data, 'invite');
                }
            });
        }, fast ? 0 : 200);
    },
    sendInvites: function(el) {
        if (O(el).hasClass('button_loading')) {
            return;
        }
        var invites = [];
        for (var i in $s('invite').selected) {
            invites.push(i, $s('invite').selected[i]);
        }

        if (!invites.length) {
            return curModal.close();
        }

        var room_id = $s('invite').roomID;
        curModal.buttonsLoading();
        ServerRequest.send({
            act: 'send_invites',
            room_id: room_id,
            invite_list: invites.join(','),
            hash: roomsHub.getRoom(room_id).save_hash,
        }, {
            onDone: function() {
                $s('invite').changed = 1;
                curModal.close();
            },
            onFail: function() {
                curModal.buttonsLoadingStop();
            },
        });
    }
};

var offlineActions = {
    initLanding: function() {
        if (window.isExport) {
            return exportPhotos.initLogin()
        }
        Page().onInit(function() {
            var langPref = me.lang == 3 ? 'en' : 'ru';
            var vk_url = offlineActions.getAuthUrl();
            O('#page_wrap').val(Templates.get('landingPage', langPref, vk_url));
        });
    },
    getAuthUrl: function() {
        var state = ''
        if (window.isExport) {
            state = 'export'
        }
        return 'https://oauth.vk.com/authorize?client_id=3771002&redirect_uri=' + encodeURIComponent('https://' + document.domain + '/vkauth') + '&display=page&response_type=token&v=5.40&revoke=1&scope=offline&state=' + state;
    },
    initVkAuth: function() {
        var url_data = parseUrl(location.href);
        var token = url_data.hash_items ? url_data.hash_items.access_token : false;
        if (!token) {
            pageWrapMessage({
                title: lang.error_title,
                msg: lang.auth_error,
            });
        } else {
            cur.authToken = token;
            if (url_data.hash_items.state === 'export') {
                history.pushState({
                    h: '/export'
                }, false, '/export');
                exportPhotos.init()
            } else {
                history.pushState({
                    h: '/rooms'
                }, false, '/rooms');
                roomsList.init();
            }
        }
    },
    logout: function() {
        if (!me.logged) {
            location.href = '/';
        }
        ServerRequest.send({
            act: 'logout',
            hash: me.info.logout_hash,
        }, {
            onDone: function() {
                location.href = '/';
            }
        });
    },
};

var Admin = {
    photoManageTools: function() {
        if (!me.admin) {
            return;
        }
        O('#pw_adm_wrap').val(Templates.get('photoAdminButtons'));
    },
    promoPhoto: function(type, topic) {
        ServerRequest.send({
            act: 'promo_photo',
            type: type,
            topic: (topic || ''),
            photo: cur.viewPhoto,
            hash: me.adminHash,
        }, {
            onDone: function(r) {
                if (r) {
                    curModal.close()
                }
            }
        })
    },
    promoRoom: function() {
        ServerRequest.send({
            act: 'promo_room',
            type: type,
            topic: (topic || ''),
            photo: cur.viewPhoto,
            hash: me.adminHash,
        }, {
            onDone: function(r) {
                if (r) {
                    curModal.close()
                }
            }
        })
    },
    photoManageBox: function() {
        showBox({
                title: 'Photo manage',
                server: {
                    query: {
                        act: 'photo_manage',
                        photo: cur.viewPhoto,
                    }
                },
                width: 500,
                footerClass: 'modal_footer_right',
            }).onServerDone(function(data) {
                debugLog('PHOTO MANAGE BOX', data);
                this.setContent(Templates.get('photoAdminBox', data));
            })
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.save, 'Admin.photoManageSave()');
    },
    photoManageSave: function() {
        curModal.buttonsLoading(); // buttonsLoadingStop
    },
    roomAdminTools: function() {
        if (!me.admin) {
            return;
        }
        O('#room_panel_cont').append(Templates.get('roomAdminInfo', roomPanel.roomID));
    },
    showRoomAdminTools: function() {
        showBox({
                title: 'Room manage',
                tabs: {
                    items: [{
                            id: 'manage',
                            text: 'Manage',
                            wrap: '#room_admin_manage'
                        },
                        {
                            id: 'promo',
                            text: 'Promo',
                            wrap: '#room_admin_promo'
                        },
                    ],
                    active: 'manage',
                    onChange: function(tab) {
                        if (tab == 'promo') {
                            curModal.buttonsHide()
                        } else {
                            curModal.buttonsShow()
                        }
                    }
                },
                width: 450,
                server: {
                    query: {
                        act: 'adm_room_info',
                        room_id: roomPanel.roomID,
                    }
                },
            }).onServerDone(function(data) {
                var room_data = {
                    banned: data.banned ? 'sn_switch_active' : '',
                    verified: data.verified ? 'sn_switch_active' : '',
                    domain: data.domain,
                };
                console.log('here', 'roomAdminBox' + this.activeTab);
                this.setContent(Templates.get('roomAdminInfoBox', room_data));
            })
            .addButton(lang.cancel, 'curModal.close()', {
                inline: 1
            })
            .addButton(lang.save, 'Admin.saveRoomInfo()');
    },
    saveRoomInfo: function() {
        var query = {
            act: 'moder_save_room',
            room_id: roomPanel.roomID,
            hash: me.adminHash,
            verify: snSwitch.check('#sn_switch_verified'),
            ban: snSwitch.check('#sn_switch_banned'),
            domain: O('#room_domain').val(),
        };
        curModal.buttonsLoading();
        ServerRequest.send(query, {
            onDone: function() {
                curModal.close();
            },
            onEnd: curModal.buttonsLoadingStop.bind(curModal),
        });
    }
};

var otherPages = {
    initAbout: function() {
        if (me.logged) {
            var query = {
                act: 'get_user_room'
            };
        } else {
            var query = false;
        }
        Page(query).onInit(this.renderAboutPage).onDone(this.renderAboutPage);
    },
    renderAboutPage: function(data) {
        if (!data) {
            data = {};
        }
        if (me.logged && !data.room_info) {
            return;
        }
        setTitle(lang.about);
        setPageContent(Templates.get('sitePagesWrap', {
            about: 'top_nav_item_active'
        }, Templates.get('aboutPage')));
        otherPages.checkRoomPanel(data.room_info);
    },
    initTerms: function() {
        Page({
            act: 'terms_data'
        }).onDone(function(data) {
            setTitle(data.title);
            setPageContent(Templates.get('sitePagesWrap', {
                terms: 'top_nav_item_active'
            }, otherPages.prepareBlocks(data.blocks, data.title)));
            otherPages.checkRoomPanel(data.room_info);
        });
    },
    prepareBlocks: function(blocks, title) {
        var result = '';
        for (var i in blocks) {
            result += Templates.get('termsPageItem', blocks[i], i == 0 ? O.stripHTML(title) : '');
        }
        return result;
    },
    initPrivacy: function() {
        Page({
            act: 'terms_data',
            privacy: 1,
        }).onDone(function(data) {
            setTitle(data.title);
            setPageContent(Templates.get('privacyPage', 'Privacy', otherPages.prepareBlocks(data.blocks, data.title)));
            otherPages.checkRoomPanel(data.room_info);
        });
    },
    initLicenses: function() {
        var query = {
            act: 'terms_data',
        };
        if (O.isAndroid()) {
            query.licenses_android = 1;
        } else {
            query.licenses = 1;
        }
        Page(query).onDone(function(data) {
            setTitle(data.title);
            setPageContent(Templates.get('privacyPage', 'Licenses', otherPages.prepareBlocks(data.blocks, data.title)));
            otherPages.checkRoomPanel(data.room_info);
        });
    },
    checkRoomPanel: function(room_info) {
        if (isMob) {
            return;
        }
        if (room_info) {
            roomPanel.render(room_info);
        } else {
            O('.left_block_cont').attr('data-top-diff', 55);
            O('#room_panel_wrap').val(Templates.get('offlineLeftPanel', offlineActions.getAuthUrl()));
        }
    },
};

var Explore = {
    explorePrepareData: function(data) {
        var result = '';
        console.log(data);
        for (var i in data.items) {
            var item = data.items[i];

            if (item.rooms) {
                roomsHub.putRooms(item.rooms, {
                    profiles: data.profiles,
                });
            }

            var cont = '';

            if (!item.photos) {
                item.photos = [];
            }
            if (!item.rooms) {
                item.rooms = [];
            }

            if (item.photos.length == 1 && item.rooms.length > 0) {
                cont += Templates.get('exploreBigPhoto', item.photos[0], roomsHub.getRoom(item.rooms[0].id), getDateText(item.photos[0].date));
            } else if (item.photos.length > 0) {
                item.photos = item.photos.slice(0, 4);
                cont += Templates.get('explorePhotosBlock', item.photos);
            } else if (item.rooms.length == 3) {
                cont += Explore.exploreRoomsWrap(item);
            }

            var head = Explore.checkItemHead(item);

            result += Templates.get('exploreItemWrap', head, cont);
        }
        return result;
    },
    checkItemHead: function(item) {
        if (item.title) {
            return Templates.get('exploreItemHead', item.title);
        }
        return '';
    },
    exploreRoomsWrap: function(item) {
        var result = '';
        for (var i in item.rooms) {
            var room = roomsHub.getRoom(item.rooms[i]);

            if (room.role) {
                var follow_str = lang.unfollow;
                var follow_class = '';
            } else {
                var follow_str = lang.follow;
                var follow_class = 'button_fill';
            }

            result += Templates.get('exploreRoomsBlock', room, follow_str, follow_class);
        }
        return Templates.get('exploreRoomsWrap', result);
    }
};

var exportPhotos = {

    init: function() {
        exportPhotos.renderLoader()

        var query = {
            act: 'export'
        };
        if (cur.authToken) {
            query.token = cur.authToken;
        }
        exportPhotos.page = Page(query).onDone(function(data) {
            roomsHub.putRooms(data.rooms_data, {
                profiles: data.profiles,
            });
            exportPhotos.render(data)
            exportPhotos.renderRooms(data)
        })
    },

    deinit: function() {
        O('body').removeClass('export');
    },

    renderLoader: function() {
        O('body').addClass('export');
        O('#page_wrap').val(Templates.get('exportLoading'));
        writeLoader('.export_page_login', 40, 1);
    },

    render: function() {
        O('body').addClass('export');
        O('#page_wrap').val(Templates.get('export'));
    },

    renderRooms: function(data) {
        var cont = ''
        for (var i = 0; i < data.rooms.length; i++) {
            var room = data.rooms[i]
            var info = roomsHub.getRoom(room.id);

            var caption = formatNumberShort(info.followers) + langNumeric(info.followers, lang.followers_num, 1);

            cont += Templates.get('exportRoom', info, caption, room.link)
        }
        O('.export_page_rooms').val(cont)
    },

    initLogin: function() {
        var vk_url = offlineActions.getAuthUrl();
        O('body').addClass('export');
        O('#page_wrap').val(Templates.get('exportLogin', vk_url));
    }
}