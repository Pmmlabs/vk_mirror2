var _templates = {
    link: function(url, text, opts) {
        return '<a href="/' + url + '" class="' + opts.className + '" ' + opts.ext + '>' + text + '</a>';
    },
    radioItem: function(id, text, caption, class_name) {
        return '<div class="sn_radio_item' + class_name + '" data-id="' + id + '" id="radio_item_' + id + '"> ' + text + ' <div class="sn_radio_caption">' + caption + '</div></div>';
    },
    footer: function() {
        return '<div class="footer_links fl_l clear_fix"> <div class="fl_l"> <a href="/about">' + lang.about + '</a> <a href="https://vk.com/snapster" target="_blank">' + lang.vk_group_link + '</a> <a href="/terms">' + lang.terms + '</a> </div> <div class="fl_r clear_fix footer_apps_links"> <a href="http://' + document.domain + '/dl/android" target="_blank"><div class="footer_app_icon icon-android fl_l"></div></a> <a href="http://' + document.domain + '/dl/ios" target="_blank"><div class="footer_app_icon icon-ios fl_l"></div></a> </div></div><div class="footer_copyright fl_r">Snapster � 2017</div>';
    },
    header: function() {
        return '<div class="site_cont clear_fix"> <a class="site_logo icon-text_logo fl_l" href="/"></a> <div class="search_wrap fl_l"> <input type="text" id="search_query" placeholder="' + lang.search + '" class="search_input" onfocus="Search.focus();" onblur="Search.blur();" onkeyup="Search.keyUp(this);"/> <div class="search_loupe icon-search"></div> <div class="search_close_wrap no_display" onmousedown="Search.clean(event);" id="search_close_wrap"> <div class="sn_pw_close search_close"> <div class="sn_pw_close_line"></div> <div class="sn_pw_close_line sn_pw_close_line2"></div> </div> </div> </div> <div id="head_user_wrap" class="head_user_wrap fl_r"></div> <div class="sn_notify_btn fl_r no_display"> <div class="icon-bell sn_notify_btn_ic" onclick="O.cancelEvent(event); NotifyPad.showPad();" onmousedown="O.cancelEvent(event);"></div> <div class="notify_pad box_anim" id="notify_pad"></div> </div> <div class="snapster_death"> ' + lang.death_info + ' <a href="/export" class="export_page_login_btn">' + lang.death_info_btn + '</a> </div></div>';
    },
    headUser: function(user) {
        return '<div class="head_user" onmouseover="siteHeader.userOver(this)" onmouseout="siteHeader.userOut(this)"> <a href="/' + user.domain + '"><img class="head_user_ava" src="' + user.photo_50 + '" /></a> <div class="head_user_dd"> <div class="notify_pad_arrow_wrap head_user_dd_arrow_wrap"> <div class="notify_pad_arrow head_user_dd_arrow"></div> </div> <a href="/' + user.domain + '"><div class="head_user_dd_item">' + lang.my_room + '</div></a> <a href="/rooms"><div class="head_user_dd_item">' + lang.rooms + '</div></a> <a href="/logout"><div class="head_user_dd_item">' + lang.logout + '</div></a> </div></div>';
    },
    headUserNoLogged: function() {
        return '<a class="head_user_no_logged" href="/">' + lang.login + '</a>';
    },
    roomPanel: function(cover, room) {
        return '<div class="room_panel_cont" id="room_panel_cont"> <div class="room_panel sn_block"> <a href="/' + room.domain + '"><div class="room_panel_cover" style="' + cover.background + '"> <div>' + cover.symbol + '</div> </div></a> <div class="room_panel_info"> <a href="/' + room.domain + '" class="room_panel_title">' + room.title + '</a> <div class="room_panel_description">' + room.description + '</div> <div class="room_panel_followers"> <div class="room_panel_followers_num" onclick="roomPanel.showFollowers();">' + room.followers + '</div> <div class="room_panel_followers_num_str">' + room.followers_str + '</div> </div> <div id="room_panel_followed_mode" class="no_display"> <div onClick="Upload.clickButton();" class="button button_fill no_display room_panel_upload_button" id="room_panel_upload_btn"> <span class="icon-camera"></span>' + lang.upload_photo + ' </div> <div onClick="Upload.clickButton();" class="button button_fill button_green no_display room_panel_upload_button" id="room_panel_suggest_button"> ' + lang.suggest_photo_button + ' </div> <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" class="upload_input_file" id="upload_input_file" onchange="Upload.onChange(this.files)"/> <div class="button room_panel_follow_btn" id="room_panel_unfollow_btn" onclick="roomPanel.unfollow();">' + lang.unfollow + '</div> </div> <div id="room_panel_no_followed_mode" class="no_display"> <div class="button button_fill room_panel_follow_btn" onclick="roomPanel.follow(this);">' + lang.follow + '</div> </div> <div id="room_panel_edit_button" class="room_panel_edit_button no_select no_display" onclick="roomPanel.editRoom()"> <span class="icon-edit"></span>' + lang.room_edit_button + ' </div> </div> </div> <div class="sn_block room_panel_suggest_btn no_select no_display" id="room_panel_suggest_btn" onclick="roomPanel.showSuggestions()"></div> <div class="sn_block room_panel_suggest_btn no_select room_panel_invite_info no_display" id="room_panel_invite_info"></div> <div id="room_panel_blocks"></div></div>';
    },
    roomsListWrap: function(rooms_list) {
        return '<div class="left_block fl_l"> <div class="left_block_cont"> <div class="room_panel_wrap" id="room_panel_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="right_block_wrap fl_r"> <div class="right_block_cont clear_fix" id="publish_rooms_wrap"></div> </div> <div class="rooms_list_wrap fl_l"> <div class="top_nav_wrap clear_fix no_select"> <a href="/rooms"><div class="top_nav_item top_nav_item_active fl_l" id="result_list_tab">' + lang.updates + '</div></a> <a href="/invitations"><div class="top_nav_item fl_l no_display" id="invitations_list_tab">' + lang.invitations + ' <span class="top_nav_item_badge"></span></div></a> <a href="/explore"><div class="top_nav_item fl_l no_display" id="explore_list_tab">Explore <span class="top_nav_item_badge"></span></div></a> </div> <div id="rooms_list_invitations" class="no_display sn_block rooms_list_tab"></div> <div id="rooms_list_explore" class="no_display rooms_list_tab"></div> <div id="rooms_list_result" class="rooms_list_tab">' + rooms_list + '</div> <div id="rooms_list_preloader" class="rooms_list_preloader"></div> </div></div>';
    },
    invitationsItem: function(room, user, str, hash) {
        return '<div class="invitations_item clear_fix"> <div class="invitations_item_cover_wrap fl_l"> <a href="/' + room.domain + '"><div class="invitations_item_cover" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div></a> <a href="/' + user.domain + '"><div class="invitations_item_cover_inviter" style="' + user.cover.background + '"> <div>' + user.cover.symbol + '</div> </div></a> </div> <div class="invitations_item_cont"> <div class="invitations_item_title"> <a href="/' + user.domain + '">' + user.title + '</a> ' + str + ' <a href="/' + room.domain + '">' + room.title + '</a> </div> <div class="invitations_item_buttons"> <div class="button button_fill" onclick="roomsList.setInvite(this, ' + room.id + ', \'' + hash + '\');">' + lang.accept + '</div> <div class="button button_inline" onclick="roomsList.setInvite(this, ' + room.id + ', \'' + hash + '\', 1);">' + lang.reject + '</div> </div> </div></div>';
    },
    roomsListPublishWrap: function(items) {
        return '<div class="rooms_list_publish_wrap">' + items + '</div><div id="rooms_list_publish_loader"></div>';
    },
    roomsListPublishItem: function(room, followers) {
        return '<a href="/' + room.domain + '"><div class="create_room_invite_item clear_fix no_select create_room_invite_item_with_caption"> <div class="create_room_invite_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="create_room_invite_cont"> <div class="create_room_invite_title">' + room.title + '</div> <div class="create_room_invite_caption">' + followers + '</div> </div></div></a>';
    },
    roomsListItem: function(room, photos) {
        return '<a href="/' + room.domain + '" class="room_item sn_block" id="rooms_list_item' + room.id + '"> <div class="room_item_head clear_fix"> <div class="room_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="room_item_info"> <div class="room_item_title"><span>' + room.title + '</span></div> <div class="room_item_date">' + room.date + '</div> </div> </div> <div class="room_item_photos clear_fix">' + photos + '</div></a>';
    },
    roomsListItemPhotos: function(photo, badge_class, badge_count) {
        return '<div class="room_item_photo fl_l ' + badge_class + '" id="photo' + photo.id + '" style="background-image: url(' + photo.src + ');" data-src="' + photo.src + '" onClick="O.cancelEvent(event); photoView.show(\'' + photo.type + '' + photo.id + '\');"> <div class="room_item_badge">' + badge_count + '</div></div>';
    },
    publishRoomsBlock: function(count, rooms) {
        return '<div class="right_block"> <div class="right_block_title" onclick="roomsList.showPublishRooms();"><div class="right_block_title_num fl_r">' + count + '</div>' + lang.publish_rooms + '</div> <div class="right_block_rows">' + rooms + '</div> <div class="create_room_button" onclick="roomsManage.createRoom();"><div class="create_room_button_ic icon-plus"></div>������� �������</div></div>';
    },
    roomsListSmallItem: function(room) {
        return '<a href="/' + room.domain + '" class="room_item_small clear_fix"> <div class="room_item_small_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="room_item_small_cont"> <div class="room_item_small_title">' + room.title + '</div> <div class="room_item_small_followers">' + room.followers + '</div> </div></a>';
    },
    roomViewWrap: function(feed, resort_class, back_url) {
        return '<div class="room_panel_wrap"> <div class="left_block_cont"> <div id="room_panel_wrap"></div> <div id="room_publishers_wrap" class="room_publishers_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="top_nav_wrap clear_fix"> <a href="' + back_url + '" data-back="1"><div class="top_nav_item top_nav_item_active fl_l"> <span class="top_nav_item_back_icon icon-arrow_down"></span> ' + lang.back + ' </div></a> <div class="top_nav_item fl_r" onclick="roomView.resortRoomPhotos();"> ' + lang.sort + ' <span class="room_view_sort_btn">' + lang.by_date + ' <div class="top_nav_item_active room_view_resort_ic icon-arrow_down ' + resort_class + '"></div></span> </div> </div> <div class="sn_block"> <div class="room_photos" id="room_photos">' + feed + '</div> </div> <div class="rooms_list_preloader" id="room_photos_preloader"></div></div>';
    },
    roomViewPhoto: function(photo) {
        return '<div class="room_view_photo room_view_photo_noprepared room_view_photo_no_loaded" id="photo' + photo.id + '" onclick="photoView.show(\'' + photo.type + '' + photo.id + '\')" data-src="' + photo.src + '" data-height="' + photo.height + '" data-width="' + photo.width + '"></div>';
    },
    roomViewNotPhotos: function() {
        return '<div class="room_view_not_photos">' + lang.not_photos + '</div>';
    },
    roomAuthorsBlock: function(count, authors) {
        return '<div class="right_block"> <div class="right_block_title" onclick="roomPanel.showFollowers(\'publishers\')"><div class="right_block_title_num fl_r">' + count + '</div>' + lang.authors + '</div> <div class="right_block_rows">' + authors + '</div></div>';
    },
    roomViewFollowedRoomsList: function(items, count_str, more_link) {
        return '<div class="sn_block room_view_followed_block"> <div class="clear_fix"> <div class="room_view_followed_block_title fl_l">' + count_str + '</div> ' + more_link + ' </div> <div class="room_view_followed_items clear_fix">' + items + '</div></div>';
    },
    roomViewFollowedRoomsListItem: function(room) {
        return '<a class="room_view_followed_item fl_l" href="/' + room.domain + '"> <div class="room_view_followed_item_cover" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="room_view_followed_item_title">' + room.title + '</div></a>';
    },
    modalLayout: function(id) {
        return '<div class="modal_layout" id="modal_' + id + '" onclick="_modalHelper[' + id + '].checkClose(event);"> <div class="modal_cont" id="modal_' + id + '_cont"> <div id="modal_' + id + '_head_wrap"></div> <div id="modal_' + id + '_cont_result" class="modal_cont_result"></div> <div id="modal_' + id + '_footer_wrap" class="modal_footer bsbb"></div> <div id="modal_' + id + '_footer_helper" class="modal_footer_helper no_display"></div> </div></div>';
    },
    boxHeader: function(title, id) {
        return '<div class="modal_header_helper"> <div class="modal_header"> <div class="modal_header_title fl_l">' + title + '</div> <div id="modal_' + id + '_tabs_wrap" class="no_display fl_l modal_tabs_wrap"></div> <div class="modal_header_close fl_r no_select" onclick="_modalHelper[' + id + '].close(event);">' + lang.close + '</div> <div class="clear"></div> </div></div>';
    },
    modalTabs: function(tabs) {
        return '<div class="modal_tabs clear_fix no_select"> ' + tabs + ' <div class="modal_tabs_line"></div></div>';
    },
    modalTab: function(tab, id) {
        return '<div class="modal_tab fl_l" id="modal_' + id + '_tab_' + tab.id + '" onClick="_modalHelper[' + id + '].swithcTab(\'' + tab.id + '\');"> ' + tab.text + '</div>';
    },
    roomFollowers: function() {
        return '<div id="room_all_result" class="clear_fix no_display"></div><div id="room_publishers_result" class="clear_fix no_display"></div><div id="room_followers_preloader_wrap"></div>';
    },
    roomFollower: function(room) {
        return '<a class="room_follower fl_l" href="/' + room.domain + '"> <div class="room_follower_cover" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="room_follower_name">' + room.first_name + '</div> <div class="room_follower_lname">' + room.last_name + '</div></a>';
    },
    photoViewBox: function(data) {
        return '<div class="sn_photo_view_image_wr no_select fl_l" id="sn_photo_view_image_wr" onClick="photoView.next();"> <img src="" id="sn_pw_image" /> <div class="sn_pw_heart_over_area"> <div class="sn_pw_heart_wrap" id="sn_pw_heart_wrap" onClick="photoView.checkLike(event, this);"> <div class="sn_pw_heart icon-heart"></div> </div> </div></div><div class="sn_pw_info fl_r" id="sn_pw_info"></div><div class="sn_pw_prev_wrap sn_pw_wrap_disabled" id="sn_pw_prev_wrap" onClick="photoView.prev();"> <div class="sn_pw_prev_wrap_arrow"> <div class="sn_pw_prev_wrap_arrow_line"></div> <div class="sn_pw_prev_wrap_arrow_line"></div> </div> <div class="sn_pw_pagination_loader" id="sn_pw_prev_loader"></div></div><div class="sn_pw_prev_wrap sn_pw_next_wrap sn_pw_wrap_disabled" id="sn_pw_next_wrap" onClick="photoView.next();"> <div class="sn_pw_prev_wrap_arrow"> <div class="sn_pw_prev_wrap_arrow_line"></div> <div class="sn_pw_prev_wrap_arrow_line"></div> </div> <div class="sn_pw_pagination_loader sn_pw_pagination_loader_next" id="sn_pw_next_loader"></div></div><div class="sn_pw_close" id="sn_pw_close"> <div class="sn_pw_close_line"></div> <div class="sn_pw_close_line sn_pw_close_line2"></div></div>';
    },
    photoViewVideo: function(src) {
        return '<div class="pw_video_play_control" onclick="photoView.clickPlayControl(event)" id="pw_video_play_control"> <div class="icon-pause"></div></div><div class="pw_video_play_control sound clear_fix" onclick="photoView.clickSoundControl(event)" id="pw_video_sound_control"> <div class="icon-no_sound fl_r"></div></div><div id="pw_video" class="pw_video"> <video src="' + src + '" width="100%" height="100%" loop id="pw_video_el"/></div>';
    },
    photoViewInfo: function(cover, author, descr, comments) {
        return '<div id="pw_info_top_wr"> <div class="sn_pw_info_head"> <div class="sn_pw_edit_tools no_display"> <span class="icon-actions"></span> <div class="head_user_dd"> <div class="notify_pad_arrow_wrap head_user_dd_arrow_wrap"> <div class="notify_pad_arrow head_user_dd_arrow"></div> </div> </div> </div> <a href="/' + author.domain + '"><div class="sn_pw_info_author_cover fl_l" style="' + cover.background + '"> <div>' + cover.symbol + '</div> </div></a> <div class="sn_pw_author_info"> <div class="sn_pw_author_info_name"><a href="/' + author.domain + '">' + author.title + '</a></div> <div class="sn_pw_date">' + author.date + '</div> </div> <div class="clear"></div> <div class="sn_pw_descr_wrap"> <div class="sn_pw_descr_text">' + descr.text + '</div> <div class="sn_pw_descr_full_text no_display" id="pw_descr_full" onmouseover="photoView.descrHideStop()" onmouseout="photoView.descrHideStart()"> <div class="sn_pw_descr_text" id="pw_descr_full_text"></div> <div class="sn_pw_descr_expand" onclick="photoView.hideFullDescr();">' + lang.hide_full_descr + '</div> </div> <div class="sn_pw_descr_expand ' + descr.expand_class + '" onclick="photoView.expandDescr();">' + lang.show_full_descr + '</div> </div> <div id="pw_adm_wrap"></div> </div> <div class="clear_fix"> <div class="sn_pw_likes_wrap clear_fix fl_l"> <div class="sn_pw_like_ic icon-heart_outline fl_l" id="sn_pw_like_ic" onclick="photoView.checkLike(event);"> <div class="sn_pw_liked_ic icon-heart"></div> </div> <div class="sn_pw_likes_str fl_l" id="sn_pw_likes_str" onclick="photoView.checkLike(event);"></div> </div> <div class="sn_pw_views fl_r no_display"> <span class="icon-views"></span> <span></span> </div> </div> <div class="pw_comment_num" id="pw_comment_num"></div></div><div class="pw_comments_wrap"> <div id="pw_comments_scroll"> <div id="pw_comments_result">' + comments.items + '</div> </div></div><div class="pw_comment_form bsbb" id="pw_comment_form" onclick="commentsModule.focusCommentArea(event);"> <div class="comment_author_cover comment_form_cover fl_l" style="' + comments.cover.background + '"> <div>' + comments.cover.symbol + '</div> </div> <div class="comment_form_area bsbb" id="comment_text" contenteditable="true" onkeydown="commentsModule.keyDown(this, event);" onkeyup="commentsModule.keyUp(this, event);"></div> <div class="comment_form_area_placeholder no_select">' + lang.add_comment + '</div></div>';
    },
    photoViewEditToolsItem: function(str, js, class_name) {
        return '<div class="head_user_dd_item ' + class_name + '" onclick="' + js + '">' + str + '</div>';
    },
    photoViewDeleted: function() {
        return '<div class="sn_pw_deleted">���������� �������. <a href="/" onclick="photoView.restorePhoto(event);">������������</a></div>';
    },
    photoLikesBoxWrap: function() {
        return '<div id="likes_result" class="clear_fix"></div><div id="likes_preloader" class="box_preloader"></div>';
    },
    comment: function(id, author, cover, text, date, class_name, hash, deleted) {
        return '<div class="comment clear_fix' + class_name + '" id="comment' + id + '" onclick="commentsModule.clickComment(this);"> <a href="/' + author.domain + '"><div class="comment_author_cover fl_l" style="' + cover.background + '"> <div>' + cover.symbol + '</div> </div></a> <div class="comment_cont fl_l"> <div class="deleted_wrap">' + deleted + '</div> <div class="comment_cont_result"> <div class="comment_date_wrap fl_r"> <div class="comment_date">' + date + '</div> <div class="sn_pw_close comment_delete no_display" onclick="commentsModule.deleteComment(this);"> <div class="sn_pw_close_line"></div> <div class="sn_pw_close_line sn_pw_close_line2"></div> </div> </div> <div class="comment_author_name"><a href="/' + author.domain + '">' + author.title + '</a></div> <div class="clear"></div> <div class="comment_text">' + text + '</div> </div> </div> <input type="hidden" value="' + hash + '"/></div>';
    },
    commentDeletedInfo: function() {
        return '' + lang.comment_deleted + ' <a href="/" onClick="commentsModule.restoreComment(this, event);">' + lang.comment_restore + '</a>';
    },
    pageWrapMessage: function(msg) {
        return '<div class="page_wrap_message"> ' + msg + '</div>';
    },
    searchResultWrap: function() {
        return '<div class="search_result_wrap box_anim"> <div class="search_result_title"> <div id="search_result_title_popular">' + lang.search_title_popular + '</div> <div id="search_result_title"> <div class="fl_r"><a href="/search" onmousedown="goPage(this.href, {noCleanSearch: 1});">' + lang.all_search_results + '</a></div> ' + lang.search_title + ' </div> </div> <div id="search_result"></div></div>';
    },
    searchItem: function(room) {
        return '<a href="/' + room.domain + '" class="search_item clear_fix" onmousedown="Search.itemDown(this, event)" onClick="O.cancelEvent(event);" data-room-id="' + room.id + '" data-follow-hash="' + room.hash + '"> <div class="search_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="search_item_cont"> <div class="fl_r search_follow_btn_wrap ' + room.follow_visible + '"> <div class="follow_btn ' + room.followed + '"></div> </div> <div class="search_item_title">' + room.title + '</div> <div class="search_item_followers">' + room.followers + '</div> </div></a>';
    },
    searchResultEmpty: function() {
        return '<div class="search_empty">' + lang.search_not_found + '</div>';
    },
    searchExtendedWrap: function(rooms) {
        return '<div class="room_panel_wrap"> <div class="left_block_cont"> <div id="room_panel_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="top_nav_wrap"> <div class="top_nav_item fl_l">' + lang.search_title + '</div> </div> <div class="sn_block"> <div class="search_extended_result" id="search_extended_result">' + rooms + '</div> </div></div>';
    },
    searchExtendedItem: function(room, photos) {
        return '<div class="search_extended_item clear_fix"> <a href="/' + room.domain + '"><div class="search_extended_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div></a> <div class="search_extended_item_cont clear_fix"> <div class="fl_r search_extended_photos clear_fix">' + photos + '</div> <div> <div class="search_item_title search_extended_item_title"><a href="/' + room.domain + '">' + room.title + '</a></div> <div class="search_item_followers search_extended_item_followers">' + room.followers + '</div> <div class="button ' + room.follow_btn_class + ' search_extended_follow_btn" onclick="Search.setFollow(this)" data-room-id="' + room.id + '" data-follow-hash="' + room.hash + '">' + room.follow_btn_text + '</div> </div> </div></div>';
    },
    searchExtendedItemPhoto: function(photo) {
        return '<div class="search_extended_photo fl_l" style="background-image: url(' + photo.src + ')" onclick="photoView.show(\'' + photo.type + '' + photo.id + '\')"></div>';
    },
    uploadBox: function() {
        return '<div class="upload_preview fl_l"></div><div class="upload_info fl_r"> <div class="upload_progress no_select"> <div class="upload_progress_str">' + lang.photo_uploading + '</div> <div class="upload_progress_line" id="upload_progress_line"></div> </div> <div class="upload_label">' + lang.photo_descr + '</div> <textarea class="upload_descr" id="upload_descr" placeholder="' + lang.enter_photo_descr + '"></textarea> <div class="upload_export_wrap clear_fix"> <div class="checkbox fl_l" onclick="checkbox(this);" id="vk_export">' + lang.photo_export_vk + '</div> <div id="upload_export_method" class="fl_r"></div> </div> <div class="upload_buttons_wrap"> <div class="button button_inline" onclick="Upload.cancelUpload();" id="upload_cancel_btn">' + lang.cancel + '</div> <div class="button button_fill button_disabled" id="upload_save_btn" onclick="Upload.savePhoto();">' + lang.save + '</div> </div></div><div class="clear"></div>';
    },
    dropDown: function() {
        return '<div class="dropdown_selected"></div><div class="dropdown_arrow"></div><div class="dropdown_options"></div>';
    },
    dropDownOption: function(option, class_name) {
        return '<div class="dropdown_option ' + class_name + '" data-value="' + option[0] + '">' + option[1] + '</div>';
    },
    notifyPad: function(items) {
        return '<div class="notify_pad_cont"> <div class="notify_pad_arrow_wrap"> <div class="notify_pad_arrow"></div> </div> <div id="notfiy_pad_scroll" class="notfiy_pad_scroll"> <div class="search_result_title">' + lang.notify_last_updates + '</div> <div id="notfiy_pad_result">' + items + '</div> </div></div>';
    },
    notifyPadItemWrap: function(row, id) {
        return '<div class="notfiy_pad_item_wrap" data-id="' + id + '"> <div class="notfiy_pad_item clear_fix"> ' + row + ' </div></div>';
    },
    notifyPadItemUser: function(data) {
        return '<a href="/' + data.user.domain + '"><div class="notfiy_pad_cover fl_l" style="' + data.user.cover.background + '"> <div>' + data.user.cover.symbol + '</div></div></a><div class="notfiy_pad_item_cont clear_fix"> <div class="search_follow_btn_wrap fl_r"> <div class="follow_btn ' + data.user.followed_class + '" onclick="Search.setFollow(this);" data-room-id="' + data.user.id + '" data-follow-hash="' + data.user.follow_hash + '"></div> </div> <div class="notfiy_pad_item_text" dir="auto"> <a href="/' + data.user.domain + '">' + data.user.title + '</a> ' + data.text + ' </div></div>';
    },
    notifyPadItemRoom: function(data) {
        return '<a href="/' + data.user.domain + '"><div class="notfiy_pad_cover fl_l" style="' + data.user.cover.background + '"> <div>' + data.user.cover.symbol + '</div></div></a><div class="notfiy_pad_item_cont clear_fix"> <a href="/' + data.room.domain + '"><div class="notfiy_pad_cover fl_r" style="' + data.room.cover.background + '"> <div>' + data.room.cover.symbol + '</div> </div></a> <div class="notfiy_pad_item_text" dir="auto"> <a href="/' + data.user.domain + '">' + data.user.title + '</a> ' + data.text + ' </div></div>';
    },
    notifyPadItemPhoto: function(data) {
        return '<a href="/' + data.user.domain + '"><div class="notfiy_pad_cover fl_l" style="' + data.user.cover.background + '"> <div>' + data.user.cover.symbol + '</div></div></a><div class="notfiy_pad_item_cont clear_fix"> <div class="notfiy_pad_photo fl_r" onclick="photoView.show(\'' + data.photo.type + '' + data.photo.id + '\', {comment_id: ' + data.photo.comment_id + ', forceServer: ' + data.photo.force_server + '});" style="background-image: url(' + data.photo.small_src + ')"></div> <div class="notfiy_pad_item_text" dir="auto"> <a href="/' + data.user.domain + '">' + data.user.title + '</a> ' + data.text + ' </div></div>';
    },
    notifyPadSpliter: function() {
        return '<div class="search_result_title" id="notify_pad_spliter">' + lang.seen_notifications + '</div>';
    },
    notifyPadEmpty: function() {
        return '<div class="search_empty">' + lang.notify_empty + '</div>';
    },
    createRoomBox: function(data) {
        return '<div id="create_room_tab_settings"> <div class="create_room_cover fl_l"> <div class="create_room_cover_camera icon-camera"></div> <div class="create_room_cover_img" style="' + data.cover + '"></div> <div id="upload_cover_progress_line" class="upload_cover_progress_line"></div> <input type="file" class="create_room_cover_inp" onclick="if(cur.startCoverUpload) O.cancelEvent(event);" onchange="roomsManage.onSelectRoomCover(this.files[0])" /> </div> <div class="create_room_info_wrap"> <div class="upload_label create_room_label">' + lang.room_title_label + '</div> <input type="text" class="upload_descr create_room_inp" value="' + data.title + '" placeholder="' + lang.room_title_placeholder + '" id="create_room_title" /> <div class="upload_label">' + lang.room_descr_label + '</div> <textarea class="upload_descr create_room_descr" placeholder="' + lang.room_descr_placeholder + '" id="create_room_descr">' + data.descr + '</textarea> <div class="sn_switch ' + data.public + '" onclick="snSwitch.click(this);" id="sn_switch_public"> <div class="sn_switch_but fl_r"> <div class="sn_switch_inner"></div> </div> <div class="sn_switch_str">' + lang.public_room + '</div> <div class="clear"></div> </div> </div></div><div id="create_room_tab_authors" class="no_display"></div><div id="create_room_tab_viewers" class="no_display"></div>';
    },
    inviteRoomBox: function() {
        return '<div class="create_room_search_wrap"> <input type="text" onkeyup="roomsManage.inviteSearch()" class="upload_descr create_room_inp create_room_search" placeholder="' + lang.search + '" id="friends_query" /> <div class="create_room_search_loupe icon-search"></div></div><div class="create_room_invite_wrap"> <div id="create_room_invite_result"></div></div>';
    },
    createRoomTabWrap: function(tab, room_id) {
        return '<div class="create_room_invite_wrap"> <div class="create_room_invite_item clear_fix no_select" onclick="roomsManage.showInviteBox(' + room_id + ')"> <div class="create_room_invite_button_ic icon-user_plus fl_l"></div> <div class="create_room_invite_button_str create_room_invite_cont">' + lang.invite_users + '</div> </div> <div id="create_room_' + tab + '_result"></div></div><div id="create_room_' + tab + '_loader" class="create_room_loader"></div>';
    },
    createRoomInviteItem: function(room, tools, class_name, caption, extra) {
        return '<div class="create_room_invite_item clear_fix no_select ' + class_name + ' edit_room_item' + room.id + '" data-role="' + extra.role + '" data-room-id="' + room.id + '" data-can-remove=' + extra.can_remove + ' onmousedown="roomsManage.clickInviteItem(this, event);"> <a href="/' + room.domain + '" target="_blank"><div class="create_room_invite_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div></a> <div class="create_room_invite_cont clear_fix"> <div class="fl_r create_room_invite_tools clear_fix">' + tools + '</div> <div> <div class="create_room_invite_title">' + room.title + '</div> <div class="create_room_invite_caption">' + caption + '</div> </div> </div></div>';
    },
    createRoomInviteItemTools: function(room_id, opts) {
        return '<div class="' + opts.tools_class + '"> <div class="fl_l create_room_invite_dd no_display" id="room_invite_dd' + room_id + '"></div> <div class="checkbox fl_l checkbox_single" onmousedown="checkbox(this);"></div></div><div class="create_room_invite_disabled_info no_display">' + opts.disabled_str + '</div>';
    },
    editRoomItemToolsFollower: function() {
        return '<div class="create_room_invite_ic icon-settings"></div>';
    },
    editRoomItemToolsInvited: function() {
        return '<div class="create_room_invite_ic icon-close"></div>';
    },
    editRoleBox: function() {
        return '<div id="edit_room_role_radios"></div>';
    },
    createRoomEmptyList: function(str) {
        return '<div class="search_empty create_room_search_empty">' + str + '</div>';
    },
    suggestBox: function(feed) {
        return '<div id="suggestions_result">' + feed + '</div><div id="suggestions_result_loader" class="box_preloader"></div>';
    },
    suggestPhotoItem: function(room, photo) {
        return '<div class="suggest_item" id="suggest_item' + photo.id + '"> <div class="suggest_item_head clear_fix"> <div class="suggest_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="suggest_item_cont clear_fix"> <div class="fl_r"> <div class="button button_inline ' + photo.out_class + '" onclick="roomPanel.confirmSuggestionBox(\'' + photo.id + '\', \'cancel\')">��������</div> <div class="button button_inline fl_l suggest_item_cancel ' + photo.in_class + '" onclick="roomPanel.confirmSuggestionBox(\'' + photo.id + '\', \'reject\')"> <div class="icon-close"></div> </div> <div class="button button_fill fl_l ' + photo.in_class + '" onclick="roomPanel.confirmSuggestionBox(\'' + photo.id + '\', \'accept\')">������������</div> </div> <div> <div class="suggest_item_author"><a href="/' + room.domain + '">' + room.title + '</a></div> <div class="suggest_item_date">' + photo.date + '</div> </div> </div> </div> <div class="suggest_item_photo" id="photo' + photo.id + '" onclick="photoView.show(\'' + photo.type + '' + photo.id + '\', {forceServer: 1, comment_id: 1});" data-src="' + photo.src + '" style="background-image: url(' + photo.src + ');height: ' + photo.height + 'px;"></div></div>';
    },
    landingPage: function(langPref, vk_url) {
        return '<div class="landing_main" id="landing_main"> <div id="landing_main_pic"></div> <a href="https://vk.com/snapster" target="_blank"><div class="landing_logo icon-logo"></div></a> <a href="' + vk_url + '"><div class="landing_logo icon-enter_' + langPref + ' landing_sign_in"></div></a> <div class="landing_main_dark"></div> <div class="landing_main_info_wrap"> <div class="landing_logo_str">Snapster <span class="landing_logo_str_ver">2.0</span></div> <div class="landing_descr">' + lang.app_descr + '</div> <div class="landing_apps clear_fix"> <a href="https://itunes.apple.com/app/id1016603298" target="_blank"><div class="landing_app icon-app_store_' + langPref + ' fl_l"></div></a> <a href="https://play.google.com/store/apps/details?id=com.vk.snapster" target="_blank"><div class="landing_app icon-google_play_' + langPref + ' fl_r"></div></a> </div> </div></div>';
    },
    photoAdminBox: function(data) {
        var _obj0 = data.topics;
        var _tpl0 = function(row) {
            return ' <div class="button button_fill" onclick="Admin.promoPhoto(\'photo_many\', ' + row.id + ')">' + row.name + '</div> ';
        };
        var _cont0 = '';
        if (_obj0)
            for (var i in _obj0) _cont0 += _tpl0(_obj0[i]);
        return '<div class="clear_fix"> <div class="upload_label create_room_label">Select how would you promote photo:</div> <div class="button button_fill" onclick="Admin.promoPhoto(\'photo_one\')">Publish one</div>&nbsp; <div class="button button_fill" onclick="Admin.promoPhoto(\'photo_many\')">Publish many</div> <br/><br/> <div class="upload_label create_room_label">Select Topic:</div> ' + _cont0 + ' <br /><br /> <div class="upload_label create_room_label">Create Topic:</div> <div class="clear_fix"> <input id="photo_admin_topic" type="text" class="upload_descr create_room_inp" value="" placeholder="Enter topic" id="create_room_title"> <br/><br/> <div class="button button_fill" onclick="Admin.promoPhoto(\'photo_topic\', O(\'#photo_admin_topic\').val())">Create topic and promo</div> <div></div>';
    },
    roomAdminInfo: function(room_id) {
        return '<div class="sn_block room_panel_suggest_btn no_select"> <div>ID: <text style="user-select: all;-webkit-user-select: all;" onclick="O.editableFocus(this, this, 0, 1)">' + room_id + '</text></div> <div class="photo_admin_tools_btn" onclick="Admin.showRoomAdminTools();">Manage</div></div>';
    },
    roomAdminInfoBox: function(data) {
        var _obj0 = data.topics;
        var _tpl0 = function(row) {
            return ' <div class="button button_fill" onclick="Admin.promoRoom(\'photo_many\', ' + row.id + ')">' + row.name + '</div> ';
        };
        var _cont0 = '';
        if (_obj0)
            for (var i in _obj0) _cont0 += _tpl0(_obj0[i]);
        return '<div id="room_admin_manage"> <div class="sn_switch ' + data.banned + ' clear_fix" onclick="snSwitch.click(this);" id="sn_switch_banned"> <div class="sn_switch_but fl_r"> <div class="sn_switch_inner"></div> </div> <div class="sn_switch_str">Porn room</div> </div> <div class="sn_switch ' + data.verified + ' clear_fix" onclick="snSwitch.click(this);" id="sn_switch_verified"> <div class="sn_switch_but fl_r"> <div class="sn_switch_inner"></div> </div> <div class="sn_switch_str">Verified room</div> </div> <br> <div class="upload_label create_room_label">Room domain</div> <input type="text" class="upload_descr create_room_inp" value="' + data.domain + '" placeholder="Enter a domain" id="room_domain"></div><div id="room_admin_promo" class="no_display"> <div class="upload_label create_room_label">Room promote:</div> ' + _cont0 + ' <br /><br /> <div class="upload_label create_room_label">Create Topic:</div> <div class="clear_fix"> <input id="photo_admin_topic" type="text" class="upload_descr create_room_inp" value="" placeholder="Enter topic" id="create_room_title"> <br/><br/> <div class="button button_fill" onclick="Admin.promoRoom(\'photo_topic\', O(\'#photo_admin_topic\').val())">Create topic and promo</div> <div></div>';
    },
    sitePagesWrap: function(active_class, content) {
        return '<div class="left_block fl_l"> <div class="left_block_cont"> <div class="room_panel_wrap" id="room_panel_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="top_nav_wrap clear_fix"> <a href="/about"><div class="top_nav_item ' + active_class.about + ' fl_l">' + lang.about + '</div></a> <a href="https://vk.com/snapster" target="_blank"><div class="top_nav_item fl_l">' + lang.vk_group_link + '</div></a> <a href="/terms"><div class="top_nav_item ' + active_class.terms + ' fl_l">' + lang.terms + '</div></a> </div> ' + content + '</div>';
    },
    aboutPage: function() {
        return '<div class="sn_block about_block"> <div class="about_big_title">Snapster 2.0</div> <div class="about_text">' + lang.about_descr + '</div></div><div class="sn_block about_block"> <div class="about_big_title">' + lang.about_title2 + '</div> <div class="about_text">' + lang.about_descr2 + '</div> <div class="about_apps clear_fix"> <a href="https://snapster.io/dl/android" target="_blank"><div class="button button_fill button_green fl_l"><span class="about_app_ic icon-android"></span>' + lang.download_android + '</div></a> <a href="https://snapster.io/dl/ios" target="_blank"><div class="button button_fill fl_l"><span class="about_app_ic icon-ios"></span>' + lang.download_iphone + '</div></a> </div></div>';
    },
    termsPageItem: function(text, title) {
        return '<div class="sn_block about_block about_text terms_block"> <div class="about_block_title">' + title + '</div> ' + text + '</div>';
    },
    privacyPage: function(title, blocks) {
        return '<div class="left_block fl_l"> <div class="left_block_cont"> <div class="room_panel_wrap" id="room_panel_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="top_nav_wrap clear_fix"> <div class="top_nav_item top_nav_item_active fl_l">' + title + '</div> </div> ' + blocks + '</div>';
    },
    offlineLeftPanel: function(vk_auth_url) {
        return '<div class="room_panel_cont" id="room_panel_cont"> <div class="sn_block"> <a href="' + vk_auth_url + '" class="button button_fill button_full"> <span class="about_vk_login_ic icon-vk"></span> ' + lang.login + ' </a> </div></div>';
    },
    hashTagsWrap: function(feed) {
        return '<div class="room_panel_wrap"> <div class="left_block_cont"> <div id="room_panel_wrap"></div> </div></div><div class="page_cont_wrap clear_fix"> <div class="top_nav_wrap clear_fix"> <div class="top_nav_item top_nav_item_active fl_l">' + lang.hashtag_items + '</div> <div class="top_nav_item fl_r" id="hashtags_feed_count"></div> </div> <div class="sn_block"> <div class="room_photos" id="room_photos">' + feed + '</div> </div> <div class="rooms_list_preloader" id="room_photos_preloader"></div></div>';
    },
    exploreItemWrap: function(head, cont) {
        return '<div class="sn_block explore_block"> ' + head + ' <div class="clear_fix">' + cont + '</div></div>';
    },
    exploreItemHead: function(title) {
        return '<div class="explore_block_head clear_fix"> <div class="explore_block_head_title">' + title + '</div></div>';
    },
    explorePhotosBlock: function(photos) {
        var _obj0 = photos;
        var _tpl0 = function(row) {
            return '<div class="room_item_photo fl_l" id="photo' + row.id + '" style="background-image: url(' + row.src + ');" data-src="' + row.src + '" onClick="photoView.show(\'' + row.type + '' + row.id + '\');"></div>';
        };
        var _cont0 = '';
        if (_obj0)
            for (var i in _obj0) _cont0 += _tpl0(_obj0[i]);
        return '' + _cont0 + '';
    },
    exploreBigPhoto: function(photo, room, date) {
        return '<div class="explore_big_photo" style="background-image: url(' + photo.src + ');" id="photo' + photo.id + '" data-src="' + photo.src + '" onClick="if(O(event.target).parent(\'.explore_big_photo_room\').count() == 0) photoView.show(\'' + photo.type + '' + photo.id + '\');"> <div class="explore_big_photo_room"> <a href="/' + room.domain + '"><div class="explore_big_photo_room_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div></a> <div class="explore_big_photo_room_info"> <a href="/' + room.domain + '" class="explore_big_photo_room_title">' + room.title + '</a> <div class="explore_big_photo_room_time">' + date + '</div> </div> </div></div>';
    },
    exploreRoomsWrap: function(rooms) {
        return '<div class="explore_rooms_wrap clear_fix">' + rooms + '</div>';
    },
    exploreRoomsBlock: function(room, follow_str, follow_class) {
        return '<div class="explore_room_item fl_l"> <div class="explore_room_item_cover" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="explore_room_item_title">' + room.title + '</div> <div class="button ' + follow_class + '" data-follow-hash="' + room.follow_hash + '" data-room-id="' + room.id + '" onclick="Search.setFollow(this);">' + follow_str + '</div></div>';
    },
    exportLoading: function() {
        return '<div class="export_page export_page_login"></div>';
    },
    export: function() {
        return '<div class="export_page"> <div class="export_page_logo"></div> <div class="export_page_caption">' + lang.export_caption + '</div> <div class="export_page_rooms"></div></div>';
    },
    exportRoom: function(room, caption, link) {
        return '<div class="export_page_room"> <div class="export_page_room_cover" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="export_page_room_cont"> <div class="export_page_room_title">' + room.title + '</div> <div class="export_page_room_caption">' + caption + '</div> </div> <div class="export_page_room_download"> <a href="' + link + '" target="_blank" class="export_page_room_download_btn" onClick="O(this).addClass(\'done\')"></a> </div></div>';
    },
    exportLogin: function(vk_url) {
        return '<div class="export_page export_page_login"> <div class="export_page_logo"></div> <div class="export_page_caption">' + lang.export_need_login + '</div> <a href="' + vk_url + '" class="export_page_login_btn">' + lang.export_login_btn + '</a></div>';
    },
};