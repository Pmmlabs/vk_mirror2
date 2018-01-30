var _templates = {
    header: function() {
        return '<a class="site_logo mob_site_logo icon-text_logo" href="/"></a><div class="head_menu_ic" onclick="siteHeader.userOver(this);"> <div class="head_menu_ic_lines"> <div class="head_menu_ic_line"></div> <div class="head_menu_ic_line"></div> <div class="head_menu_ic_line"></div> </div></div><div class="snapster_death"> ' + lang.death_info + ' <a href="/export" no-active="true" class="export_page_login_btn">' + lang.death_info_btn + '</a></div><div class="mob_head_menu" id="head_user_wrap"></div>';
    },
    headUser: function(user) {
        return '<a href="/' + user.domain + '" class="mob_head_menu_item">' + lang.my_room + '</a><a href="/rooms" class="mob_head_menu_item">' + lang.rooms + '</a><a href="/logout" class="mob_head_menu_item">' + lang.logout + '</a>';
    },
    headUserNoLogged: function() {
        return '<a href="/" class="mob_head_menu_item">' + lang.login + '</a>';
    },
    footer: function() {
        return '<div class="mob_footer_links"> <a href="/about">' + lang.about + '</a> <a href="https://vk.com/snapster">' + lang.vk_group_link + '</a></div><div class="mob_footer_apps clear_fix"> <a href="/dl/android" target="_blank" class="mob_footer_app fl_l icon-android"></a> <a href="/dl/ios" target="_blank" class="mob_footer_app fl_r icon-ios"></a></div><div class="mob_footer_copyright">Snapster � 2017</div>';
    },
    sitePagesWrap: function(active_class, content) {
        return '' + content + '';
    },
    termsPageItem: function(text, title) {
        return '<div class="sn_block about_block about_text terms_block"> <div class="about_block_title">' + title + '</div> ' + text + '</div>';
    },
    aboutPage: function() {
        return '<div class="sn_block about_block"> <div class="about_big_title">Snapster 2.0</div> <div class="about_text">' + lang.about_descr + '</div></div><div class="sn_block about_block"> <div class="about_big_title">' + lang.about_title2 + '</div> <div class="about_text">' + lang.about_descr2 + '</div> <div class="about_apps clear_fix"> <a href="https://snapster.io/dl/android" target="_blank"><div class="button button_fill button_green fl_l"><span class="about_app_ic icon-android"></span>' + lang.download_android + '</div></a> <a href="https://snapster.io/dl/ios" target="_blank"><div class="button button_fill fl_l"><span class="about_app_ic icon-ios"></span>' + lang.download_iphone + '</div></a> </div></div>';
    },
    privacyPage: function(title, blocks) {
        return '' + blocks + '';
    },
    openInApp: function(open_link, download_link) {
        return '<div class="open_in_app_wrap sn_block"> <div class="open_in_app_title">' + lang.bad_page_title + '</div> <div class="open_in_app_descr">' + lang.bad_page_descr + '</div> <div class="open_in_app_btns"> <a href="' + open_link + '"><div class="button button_fill">' + lang.open_in_app + '</div></a><br> <a href="' + download_link + '"><div class="button button_fill button_green">' + lang.download_app + '</div></a> </div></div>';
    },
    landingPage: function(langPref, vk_url) {
        return '<div class="landing_main" id="landing_main"> <div id="landing_main_pic"></div> <a href="https://vk.com/snapster" target="_blank"><div class="landing_logo icon-logo"></div></a> <div class="landing_main_dark"></div> <div class="landing_main_info_wrap"> <div class="landing_logo_str">Snapster <span class="landing_logo_str_ver">2.0</span></div> <div class="landing_descr">' + lang.app_descr + '</div> </div></div>';
    },
    roomPanel: function(cover, room) {
        return '<div class="sn_block room_panel_info"> <div class="mob_room_panel_cover" style="' + cover.background + '"> <div>' + cover.symbol + '</div> </div> <div class="room_panel_title">' + room.title + '</div> <div class="room_panel_description">' + room.description + '</div> <div class="room_panel_followers_num">' + room.followers + '</div> <div class="room_panel_followers_num_str">' + room.followers_str + '</div></div>';
    },
    downloadAppPanel: function(lnk, store_lnk) {
        return '<div class="mobile_info clear_fix"> <a href="' + store_lnk + '" target="_blank" class="fl_r"><div class="button button_fill button_green">' + lang.download + '</div></a> <a href="' + lnk + '" target="_blank"><div class="button button_fill">' + lang.open_in_app + '</div></a></div>';
    },
    roomViewWrap: function(feed) {
        return '<div id="room_panel_wrap"></div><div class="sn_block mob_room_view_photos_wrap"> <div class="room_photos" id="room_photos">' + feed + '</div></div>';
    },
    roomViewPhoto: function(photo) {
        return '<div class="room_view_photo room_view_photo_noprepared room_view_photo_no_loaded" id="photo' + photo.id + '" onclick="photoView.show(\'' + photo.type + '' + photo.id + '\')" data-height="' + photo.height + '" data-width="' + photo.width + '" data-src="' + photo.src + '" style="height: ' + photo.height + 'px;"></div>';
    },
    modalLayout: function(id) {
        return '<div class="modal_layout" id="modal_' + id + '" onclick="_modalHelper[' + id + '].checkClose(event);"> <div class="modal_cont" id="modal_' + id + '_cont"> <div id="modal_' + id + '_head_wrap"></div> <div id="modal_' + id + '_cont_result" class="modal_cont_result"></div> <div id="modal_' + id + '_footer_wrap" class="modal_footer bsbb"></div> <div id="modal_' + id + '_footer_helper" class="modal_footer_helper no_display"></div> </div></div>';
    },
    boxHeader: function(title, id) {
        return '<div class="modal_header_helper"> <div class="modal_header"> <div class="modal_header_title fl_l">' + title + '</div> <div class="modal_header_close fl_r no_select" onclick="_modalHelper[' + id + '].close(event);">' + lang.close + '</div> <div class="clear"></div> </div></div>';
    },
    photoViewBox: function(data) {
        return '<div id="mob_pw_header"></div><div class="mob_pw_image_wrap" id="sn_photo_view_image_wr"> <img src="" class="sn_pw_image_mob" id="sn_pw_image" /></div><div class="sn_pw_info" id="sn_pw_info"></div>';
    },
    photoViewVideo: function(src) {
        return '<div class="pw_video_play_control" onclick="photoView.clickPlayControl(event)" id="pw_video_play_control"> <div class="icon-pause"></div></div><div class="pw_video_play_control sound clear_fix" onclick="photoView.clickSoundControl(event)" id="pw_video_sound_control"> <div class="icon-no_sound fl_r"></div></div><div id="pw_video" class="pw_video"> <video src="' + src + '" loop id="pw_video_el"/></div>';
    },
    photoViewInfo: function(cover, author, descr, comments) {
        return '<div class="sn_pw_info_head clear_fix"> <a href="/' + author.domain + '"><div class="sn_pw_info_author_cover fl_l" style="' + cover.background + '"> <div>' + cover.symbol + '</div> </div></a> <div class="sn_pw_author_info"> <div class="sn_pw_author_info_name"><a href="/' + author.domain + '">' + author.title + '</a></div> <div class="sn_pw_date">' + author.date + '</div> </div> <div class="clear"></div> <div class="sn_pw_descr_wrap"> <div class="sn_pw_descr_text" id="sn_pw_descr_text">' + descr.text + '</div> <div class="sn_pw_descr_full_text no_display" id="pw_descr_full" onmouseover="photoView.descrHideStop()" onmouseout="photoView.descrHideStart()"> <div class="sn_pw_descr_text" id="pw_descr_full_text"></div> <div class="sn_pw_descr_expand" onclick="photoView.hideFullDescr();">' + lang.hide_full_descr + '</div> </div> <div class="sn_pw_descr_expand ' + descr.expand_class + '" id="pw_show_full_descr_btn" onclick="photoView.expandDescr();">' + lang.show_full_descr + '</div> </div> <div id="pw_adm_wrap"></div></div>';
    },
    pageWrapMessage: function(msg) {
        return '<div class="sn_block page_wrap_message"> ' + msg + '</div>';
    },
    roomsListWrap: function(rooms_list) {
        return '<div id="room_panel_wrap"></div><div id="rooms_list_result">' + rooms_list + '</div><div id="rooms_list_preloader" class="rooms_list_preloader"></div>';
    },
    roomsListItem: function(room, photos) {
        return '<a href="/' + room.domain + '" class="room_item sn_block clear_fix" id="rooms_list_item' + room.id + '"> <div class="room_item_cover fl_l" style="' + room.cover.background + '"> <div>' + room.cover.symbol + '</div> </div> <div class="room_item_info clear_fix"> ' + photos + ' <div> <div class="room_item_title"><span>' + room.title + '</span></div> <div class="room_item_date">' + room.date + '</div> </div> </div></a>';
    },
    roomsListItemPhotos: function(photo, badge_class, badge_count) {
        return '<div class="mob_room_item_photo fl_r" style="background-image: url(' + photo.src + ');"> <div class="room_item_badge">' + badge_count + '</div></div>';
    },
    pageWrapMessage: function(msg) {
        return '<div class="page_wrap_message"> ' + msg + '</div>';
    },
};