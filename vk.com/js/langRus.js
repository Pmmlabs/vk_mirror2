var langpack = {
    getSymbolFlex: function(n) {
        n = n % 100;
        if (n % 10 == 1 && n != 11) {
            return "";
        }
        if (n % 10 > 1 && n % 10 < 5 && (n - n % 10 != 10)) {
            return "�";
        }
        return "��";
    },
    noteExceedsSymbolLimit: function(n) {
        return "������� ��������� ���������� ����� �� " + n + " ����" + this.getSymbolFlex(n);
    },
    text_exceeds_symbol_limit: function(n) {
        return "���������� ����� �������� �� " + n + " ����" + this.getSymbolFlex(n);
    },
    text_N_symbols_remains: function(n) {
        n = n % 100;
        var remains = (n % 10 == 1 && n != 11) ? "�� " : "��� ";
        return "�����" + remains + n + " ����" + this.getSymbolFlex(n);
    },

    notes_deletion: "�������� �������",
    notes_delete: "�������",
    notes_delete_cancel: "������",
    notes_delete_sure: "�� ������������� ������ ������� ��� �������?",
    notes_deleting: "������� ���������...",

    notes_privacy_whocansee: '��� ����� �������?',
    notes_privacy_cansee: '<b>�������</b> ����� �������������:',
    notes_privacy_save: "���������",
    notes_privacy_cancel: "������",
    notes_privacy_whocancomment: '��� ����� �������������� �������?',
    notes_privacy_cancomment: '<b>�������</b> ����� ��������������:',

    pages_hider_show: '��������',
    pages_hider_hide: '������',

    video_comments_marked_as_spam: "����������� ������� ��� ����.",
    video_marked_as_spam: "����������� �������� ��� ����.",

    photo_marked_as_spam: "���������� �������� ��� ����.",

    captcha_enter_code: "������� ��� � ��������:",

    votes_flex: function(n) {
        var r = n % 10;
        if (r % 1 != 0) {
            return "�";
        }
        if (n > 4 && n < 20) {
            return "��";
        }
        switch (r) {
            case 1:
                return '';
                break;
            case 2:
            case 3:
            case 4:
                return '�';
                break;
            default:
                return '��';
        }
    },

    apps_balance_plus_X_done: function(n) {
        return "�� ��������� ������ ���������� �� <b>" + n + "</b> �����" + getLang('votes_flex', n) + ".";
    },

    apps_balance_minus_X_done: function(n) {
        return "�� ��������� ������ ���������� �� <b>" + n + "</b> �����" + getLang('votes_flex', n) + ".";
    },

    apps_inv_from_X_deleted: function(name) {
        return "����������� � ���������� " + name + " �������.";
    },
    apps_notif_from_X_deleted: function(name) {
        return "���������� �� ���������� " + name + " �������.";
    },
    apps_invites_to_X_blocked: function(name) {
        return "����������� � ���������� " + name + " �����������.";
    },
    apps_notifs_from_X_blocked: function(name) {
        return "���������� �� ���������� " + name + " �����������.";
    },

    friends_create_list_title: '�������� ������ ������',
    friends_continue: '����������',
    friends_create_list: '������� ������',
    friends_you_can_save_this_list: '�� ������ ��������� ���� ������ ������.<br />� ���������� �� ������� ������������ ��� �����.',
    friends_enter_list_name: '������� �������� ������',
    friends_no_user_selected: '�� �� ������� �� ������ ������������.',
    friends_nothing_found_by_query: function(query) {
        return '�� ������� "' + query + '" ������ �� �������.';
    },
    friends_show_more_friends: '�������� ������ ������',
    friends_select_all: '�������� ����',
    friends_remove_selection: '����� ���������',
    friends_change_name: '�������� ��������',
    friends_enter_list_name: '������� �������� ������',
    friends_enter_friend_name: '������� ������� ��� �����',
    friends_all: '���',
    friends_selected: '���������',
    friends_new_friends_list: '����� ������ ������',
    friends_list_name: '�������� ������',
    friends_edit_list_title: '�������������� ������ ������',
    friends_privacy_title: '��������� �����������',
    friends_save: '���������',
    friends_cancel: '������',
    friends_flex: function(count) {
        count %= 100;
        if (count > 4 && count < 21) {
            return "���";
        }
        switch (count) {
            case 1:
                return '�';
                break;
            case 2:
            case 3:
            case 4:
                return '��';
                break;
            default:
                return '���';
        }
    },
    friends_X_users_in_list: function(count) {
        return '� ������ ' + count + ' ���' + getLang('friends_flex', count);
    },

    select_place_not_selected: ' - �� ������� - ',
    select_place_select: '������� ��������',
    select_place_not_found: '�������� �� �������',

    select_house_not_selected: ' - �� ������ - ',
    select_house_select: '������� �����',
    select_house_not_found: '��� �� ������',

    select_street_not_selected: ' - �� ������� - ',
    select_street_select: '������� ��������',
    select_street_not_found: '����� �� �������',

    select_station_not_selected: ' - �� ������� - ',
    select_district_not_selected: ' - �� ������ - ',

    select_chair_not_selected: ' - �� ������� - ',
    select_chair_select: '������� ��������',

    select_fac_not_selected: ' - �� ������ - ',
    select_fac_select: '������� ��������',

    select_uni_not_selected: ' - �� ������ - ',
    select_uni_select: '������� ��������',
    select_uni_not_found: '��� �� ������',

    select_school_not_selected: ' - �� ������� - ',
    select_school_select: '������� ��������',
    select_school_not_found: '����� �� �������',

    select_city_not_selected: ' - �� ������ - ',
    select_city_select: '������� ��������',
    select_city_not_found: '����� �� ������',

    select_country_not_selected: ' - �� ������� - '

};

var activity_update_just_now = "��������� ������ ���";
var activity_cant_update = "�� ������� �������� ������.";
var activity_deleted = "������ ������.";
var activity_change_status = "[ �������� ������ ]";

var admin2_school = "�����";
var admin2_gymnasium = "��������";
var admin2_liceum = "�����";
var admin2_internat = "�����-��������";
var admin2_evening = "�������� �����";
var admin2_music = "����������� �����";
var admin2_sports = "���������� �����";
var admin2_artistic = "���. �����";
var admin2_art = "����� ��������";
var admin2_garten = "������� ���";
var admin2_prof_liceum = "����. �����";
var admin2_colledge = "�������";
var admin2_tech = "��������";
var admin2_spec_school = "�������";
var admin2_prof_tech = "���";
var admin2_prof = "����. �������";
var admin2_driving_sch = "���������";
var admin2_full_univ_name = "������ �������� ����";
var admin2_ready = "������";
var admin2_cancel = "������";
var admin2_search = "�����";
var admin2_edit = "�������������";
var admin2_list = "������";
var admin2_hide_list = "������ ������";
var admin2_server_error = "������ �������.";


var audio_flash_needed = "��� ����, ����� ��������������� �������������, ��� ���������� ���������� Flash-�������������.";


var audio_edit_editing = "�������������� �����������";
var audio_edit_singer = "�����������";
var audio_edit_name = "��������";
var audio_edit_text = "����� �����";
var audio_edit_additionally = "�������������";
var audio_edit_dont_show_search = "�� �������� ��� ������";
var audio_edit_edit = "�������������";
var audio_edit_cancel = "������";
var audio_edit_unknown = "����������� �����������";
var audio_edit_noname = "��� ��������";
var audio_edit_deleting = "�������� �����������";
var audio_edit_sure_delete = "�� ������������� ������ ������� ��� �����������?";
var audio_edit_yes = "��";
var audio_edit_no = "���";


var base_rotating = "������������";
var base_uploading_photo = "���� �������� ����������";
var base_dont_close = "����������, �� ���������� ��� ����, ���� ���������� �� ����������.";


var blog_tryagain = "��������� ����������� ������. ���������� �����.";
var blog_wrote_m = "�������";
var blog_wrote_fm = "��������";
var blog_delete = "�������";
var blog_comm_deleted = "����������� ������.";
var blog_renewpage = "��������� ����������� ������. ���������� ������������� ��������.";
var blog_comment_sent = "���������";
var blog_comment_sending = "������������";
var blog_comment_not_sent = "�� ���������";



var bookmarks_dont_watch = "�� �������";
var bookmarks_sure_dont_watch = "�� ������������� �� ������ ������ ������� �� ����� �������������?";
var bookmarks_yes = "��";
var bookmarks_no = "���";


var common_Jan = "������";
var common_Feb = "�������";
var common_Mar = "�����";
var common_Apr = "������";
var common_May = "���";
var common_Jun = "����";
var common_Jul = "����";
var common_Aug = "�������";
var common_Sep = "��������";
var common_Oct = "�������";
var common_Nov = "������";
var common_Dec = "�������";


var editor_descr = "��������";
var editor_adding_audio = "���������� �����������";
var editor_insert_audio = "�������� �����������";
var editor_singer_name = "����������� - ��������";
var editor_cancel = "������";
var editor_adding_link = "���������� ������";
var editor_insert_link = "�������� ������";


var events_menus_error_xmlhttp = "������ ��� �������� XMLHTTP";
var events_cancel = "������";
var events_new_event_header = "�������� ������ �������";
var events_new_enter_name = "����������, ������� �������� �������";


var friend_showed = "������������";
var friend_first = "������";


var functions_sure_delete = "�� ������������� ������ ������� ��� ������?";


var groups_enter_post = "������� ���������:";
var groups_group_admin = "������������� ������";
var groups_edit = "�������������";
var groups_cancel = "������";
var groups_delete_manager = "�������� ������������";
var groups_sure_delete_manager = "�� ������������� ������ ������� ����� �������� �� �������������?";
var groups_yes = "��";
var groups_no = "���";
var groups_editing_link = "�������������� ������";
var groups_enter_name = "������� ��������:";
var groups_deleting_link = "�������� ������";
var groups_sure_delete_link = "�� ������������� ������ ������� ������ �� ��� ������?";
var groups_cancel2 = "��������";
var groups_partic_accepted = "�������� ������.";
var groups_appl_rejected = "������ ���������.";
var groups_inv_cancelled = "����������� ��������.";
var groups_partic_deleted = "�������� ������.";
var groups_assigning_manager = "���������� ������������";
var groups_assign = "���������";
var groups_assigned = "�������� �������� �������������.";
var groups_unbanned = "������������ ������ �� ���-�����";
var groups_create_new = "�������� ����� ������";
var groups_create_enter = "����������, ������� �������� ������";


var mail_msg_deleted = "��������� �������.";
var mail_cancel = "������";
var mail_error = "������";
var mail_cant_add_more15 = "�� ������ �������� �� ����� 15 ���������.";
var mail_close = "�������";
var mail_add_1_address = "����������, �������� ���� �� ������ ��������.";
var mail_enter_text = "����������, ������� ����� ���������.";


var matches_yes_accepted = "�������� �������.";
var matches_no_accepted = "����� ������.";
var matches_user_deleted = "������������ ������ �� ������.";
var matches_open = "�������";
var matches_close = "�������";


var merger_cant_get_data = "�� ������� �������� ������:";


var photosedit_report_developers = "��������� ������, ����������, �������� �������������.";
var photosedit_cant_query_server = "�� ������� ��������� ������ � �������";


var photosedit_plain_cant_move = "��������, ���������� ����������� �� �������. ���������� ����������� �������� � ����������� ��� ���.";


var profile_edit_error = "������";
var profile_edit_sel_town_to_save = "����������, �������� ���� �� �����, ���� �� ������ ��������� �������� �����.";
var profile_edit_close = "�������";

var placeTypes = [
    ["", 1],
    ["���", 1],
    ["������", 0],
    ["��������", 0],
    ["����", 0],
    ["���", 0],
    ["���", 0],
    ["����", 0],
    ["��������-����", 0],
    ["������������ ����", 0],
    ["���������", 0],
    ["�������", 0],
    ["�������", 0],
    ["���������", 0],
    ["������ ������", 0],
    ["�����������", 1],
    ["���������", 0],
    ["���������", 0],
    ["��� ������", 0],
    ["������", 0],
    ["������", 0],
    ["���������", 0],
    ["�����", 0],
    ["���� �� ���������", 0],
    ["������", 0],
    ["������", 0],
    ["������-�����", 0],
    ["���������� ����", 0],
    ["�������", 0],
    ["��������", 0],
    ["�������", 0],
    ["����� �������", 0],
    ["��������������", 0],
    ["�����", 0],
    ["���������� ���", 0],
    ["����������", 0],
    ["�����", 0],
    ["�������", 0],
    ["����������", 0],
    ["����������� �����", 0],
    ["����", 0],
    ["��������", 0],
    ["�����������", 0],
    ["���������", 0],
    ["������", 0],
    ["�������", 0],
    ["�����", 0],
    ["���", 0],
    ["�����", 0],
    ["�����������", 0],
    ["�����������", 0],
    ["����", 0]
];


var select_select = "��������";
var select_enter = "�������";
var select_uploading = "���� ��������...";
var select_error = "������";
var select_must_sel_var = "���������� ������� ������� �� ������.";
var select_close = "�������";


var simpleajax_loading = "...���� ��������...";


var tagpeople_remove = "������";


var tagshow_you_saved = "�� ��������� �� ���� ����������";
var tagshow_I = "�";
var tagshow_You = "��";
var tagshow_user = "������������";
var tagshow_was_saved = "��� �������� �� ���� ����������";
var tagshow_click_ready = "����� ��������� �������� ������, ������� ������ \"������\".";


var voting_cant_vote = "���, ������������� �� �������. ������������� �������� � ���������� ��� ���.";
var voting_cant_revote = "���, �������������� �� �������. ������������� �������� � ���������� ��� ���.";
var voting_cant_open = "���, ������� ����� �� �������. ������������� �������� � ���������� ��� ���.";
var voting_cant_close = "���, ������� ����� �� �������. ������������� �������� � ���������� ��� ���.";
var voting_cant_place_main = "���, ��������� ����� �� ������� �������� ������ �� �������. ������������� �������� � ���������� ��� ���.";
var voting_cant_remove_main = "���, ������ ����� � ������� �������� ������ �� �������. ������������� �������� � ���������� ��� ���.";
var voting_empty_vars = "������ �������� ������ �����������. ��������� ��� ������� ��.";

var questions_text = "����� �������:";
var questions_topic = "��������:";
var questions_loading = "��������...";
var questions_hide_comms = "������ �����������";
var questions_show_comms = "�������� �����������";

var ebrowse_mn = ['������', '�������', '����', '������', '���', '����', '����', '������', '��������', '�������', '������', '�������'];
var ebrowse_days = "��������������";
var ebrowse_dayname_length = 2;

var friends2_catedit = "�������������";

var news_categories = '����� ������';
var news_updatesforcategories = '���������� ���������� ������ ���� �����:';
var news_save = "���������";
var news_cancel = "������";

var app_comments_showcomms = "�������� �����������";
var app_comments_hidecomms = "������ �����������";
var app_comments_connecterror = "������ ����������.";

forum_adding_subsection = '���������� ����������';
forum_enter_name = '������� ��������:';
forum_new_subsection_or = '��� �� ������ �������� ������������ ���������';
forum_enter_subsection_id = '������� ID ����������:';
forum_add = '��������';
forum_changing_image = '��������� ����������� ����������';
forum_changing_image_text = '����� ������� ������ ������ �� �����������, ���������� �� ����� vkontakte.ru. ���������� ��� ������:';
forum_changing_image_right_link = 'http://<span style="font-style: italic">��������.</span>vkontakte.ru/<span style="font-style: italic">�����_�����������</span>';
forum_enter_link = '������� ������:';
forum_change = '��������';
forum_editing_leaders = '�������������� �������������';
forum_ok = '������';
forum_cancel = '��������';
forum_admin = '�������������';
forum_leader = '������������';
forum_delete = '�������';
forum_show_add_leader = '�������� ������������';
forum_add_leader = '��������';
forum_editing_links = '�������������� ������';
forum_show_add_link = '�������� ������';
forum_edit = '�������������';
forum_link_name = '��������';
forum_link_label = '�������';
forum_link_link = '������';
forum_add_link = '��������';
forum_error_wrong_name_link = '���� ������� �������� � ������';
forum_error_wrong_id = '���� ������ ���������� ID';
forum_error_null_answer = '���� ������ �����';
forum_flood_control = '�� ����������� ��������� ������� ������.';
forum_edit_subsections = '������� �����������';
forum_edit_subsections_finish = '������';
forum_subscribe = '����������� �� ������';
forum_unsubscribe = '���������� �� �������';
forum_error_mark_read = '�� ������� �������� ���� ��� �����������';
forum_editing_comment = '�������������� ������';
forum_enter_text = '�����:';
forum_error_closing_topic = '������ ��� �������� �������';
forum_error_opening_topic = '������ ��� �������� �������';
forum_editing_topic = '�������������� �������';
forum_enter_header = '������� ���������:';
forum_error_sticking_topic = '������ ��� ����������� �������';
forum_error_unsticking_topic = '������ ��� ���������� �������';
forum_rename_section = '�������������� �������';
forum_close_section = '������� ������';
forum_close_section_title = '������� �� ���������� �������� �������� ��������������';
forum_open_section = '������� ������';
forum_open_section_title = '������� �� ���������� �������� �������� ��������������';
forum_error_opening_section = '������ ��� �������� �������';
forum_error_closing_section = '������ ��� �������� �������';
forum_new_topic_text = '����� �� ������ �������� � ������ ������ ������������ ������. ����� �������� ����� ������, �������������� ������� "������ ������" � ������ ��������.';
forum_enter_topic_id = '������� ID �������:';
forum_adding_topic = '���������� �������';
forum_is_hidden_answer = '������� �����';
forum_is_right_answer = '���������� �����';
forum_about_right_answer = '� ������� ������� ���� �� ������� ����� ���� � ������� "���������� �����". �����, ������� ������� ����� �������, ��������� ������ ����������, ����� ����� �������, � ����� �������. �� ������� ��������, ��� � ������� ����� ���� ������� ����� ������� ���� ���� �����, � ���� �������� ������ ����� "����������", �� ������ ������ ������� ������� � ����� ������������ �� ����� ������ �����.';
forum_hidden_topic = '������� ������';
forum_hidden_answer = '������� �����';
forum_hidden_right_answer = '������� �����';
forum_right_answer = '�����';
forum_delete = '�������';
forum_delete_topic = '�������� �������';
forum_delete_topic_confirm = '�� ������������� ������ ������� ���� ������?';
forum_delete_not_unique_topic_confirm = '���� ������ ���������� �� ������ � ���� �������. ���� �� ������� ���, �� �������� �� ���� ��������, � ������� ���������. ���� �� ������ ������� ��� ������ �� ����� �������, ������� �� ������ ����:';
forum_delete_not_unique_topic = '������� �� ����� �������';
forum_delete_section = '�������� �������';
forum_delete_section_confirm = '�� ������������� ������ ������� ���� ������?';
forum_delete_not_unique_section_confirm = '���� ��������� ���������� �� ������ � ���� �������. ���� �� ������� ���, �� �������� �� ���� ��������, � ������� ���������. ���� �� ������ ������� ��� ������ �� ����� �������, ������� �� ������ ����:';
forum_delete_not_unique_section = '������� �� ����� �������';
forum_must_enter_title = '���������� ������ ��������� �������.';
forum_must_enter_text = '���������� ������ ����� �������.';

forum_new_officer_id = 'ID ������ ������������';

temp_messages_shown_function = function(first, last) {
    if (!first)
        first = 1;
    if (first > last)
        return '�� ���� �������� ��� ��� ���������.';
    return '�� �������� ��������� #' + first + '-' + last + '.';
}

temp_answer_count_function = function(count) {
    if (count <= 0)
        return '��� �������';
    if ((count % 100 >= 5) && (count % 100 <= 20))
        return count + ' �������';
    if (count % 10 == 1)
        return count + ' �����';
    if ((count % 10 >= 2) && (count % 10 <= 4))
        return count + ' ������';
    return count + ' �������';
}

temp_msg_count_function = function(count) {
    if (count <= 0)
        return '��� ���������';
    if ((count % 100 >= 5) && (count % 100 <= 20))
        return count + ' ���������';
    if (count % 10 == 1)
        return count + ' ���������';
    if ((count % 10 >= 2) && (count % 10 <= 4))
        return count + ' ���������';
    return count + ' ���������';
}

temp_messages_in_topic_function = function(count) {
    return '� ���������� ' + temp_msg_count_function(count) + '.';
}

temp_post_too_long_function = function(count) {
    var tmp = ' ������';
    if ((count % 100 >= 5) && (count % 100 <= 20))
        tmp = ' ������';
    else if (count % 10 == 1)
        tmp = ' ����';
    else if ((count % 10 >= 2) && (count % 10 <= 4))
        tmp = ' �����';
    return '���������� ����� ������ ��������� �� ' + count + tmp;
}

board_error = '������';
board_too_fast = '�� ����������� ��������� ������� ������.';
board_ok = '��';
board_edit = '�������������';
board_cannot_edit = '�� �� ������ ������������� ��� ���������.';
board_error_occurred = '� ���������, ��������� ������.';
board_links_forbidden = '������������� ������ �������� ������������� ������.';
board_done = '������';
board_any_links_forbidden = '������������� ������ �������� ��������� ����� ������.';
board_enter_text = '���� ������ ����� ���������.';
board_edit_voting = '�������� �����';
board_delete_voting = '������� �����';
board_create_voting = '������� �����';
board_new_topic_title = '����� �������� ����:';
board_cancel = '������';
board_edit_topic = '������������� ����';
board_wrong_topic_number = '�������� ����� ���� ����������.';
board_no_text_stated = '�� �� ������� ����� ����.';
board_cannot_edit_title = '�� �� ������ ������������� �������� ���� ����';
board_sure_delete_topic = '�� �������, ��� ������ ������� ��� ����?';
board_delete = '�������';
board_warning = '��������������';
board_sure_delete_voting = '�� �������, ��� ������ ������� �����?';
board_voting_not_deleted = '�� ������� ������� �����.';
board_voting_deleted = '����� ������.';
board_create_topic = '������� ����';

var market_about_paid_ads = '� ������� �����������';
var market_ok = 'OK';
var market_can_promote = '��� ������������ ����� ���������� ���� ���������� ��� ������.';
var market_features = '�����������:';
var market_determine_cost = '�� ���� �����������, ������� ������ ������� �� ������ ���������� ������� �� ���� ����������.';
var market_pay_for_result = '�� ������� ������ �� ��������� - �� ���� �� ���������� ����� �� ���� ���������� ��������������.';
var market_more_info = '����� ��������� ���������� - � ���������� ������ ����������.';
var market_create_ad = '������� ����������';
var market_available_later = '������� ����� �������� �����';
var market_available_after = '������ ������� ������ �������� ����� �������� ����������.';
var market_ads_search = '����� ����������';
var market_save = '���������';
var market_cancel = '������';
var market_report = '������';
var market_select_ban_reason = '����������, �������� ������� ��� ���������� ����������:';
var market_reason_spam = '���� / ��������� ������';
var market_reason_porn = '�����������';
var market_reason_cheat = '������ ���������� / �������������';
var market_reason_offtop = '�������������� �������';
var market_reason_duplicate = '������������ ������������';
var market_reason_extr = '����������';
var market_reason_nonsense = '�����������';
var market_reason_ortho = '��������������� ������';
var market_defave = '������� �� ����������';
var market_enfave = '�������� � ���������';
var market_all_categs = '��� ���������';

var market_photo_one_of_photo = '����������';
var market_photo_one_of_of = '��';
var market_photos_for_ad = '���������� ��� ����������:';
var market_photos_you_can = '�� ������ ������� �� 5 ���������� ��� ������ ����������.';
var market_photos_choose_album = '�������� ������ � ������������ ��� ������ ����������.';
var market_photos_cancel = '������';
var market_photo_delete = '�������';
var market_photo_no_delete = '�� �������';

var market_currency_count = {

    'RUB': function(count) {
        if (count % 100 > 10 && count % 100 < 20) {
            return '������';
        } else if (count % 10 == 1) {
            return '�����';
        } else if (count % 10 > 1 && count % 10 < 5) {
            return '�����';
        } else {
            return '������';
        }
    },

    'UAH': function(count) {
        if (count % 100 > 10 && count % 100 < 20) {
            return '������';
        } else if (count % 10 == 1) {
            return '������';
        } else if (count % 10 > 1 && count % 10 < 5) {
            return '������';
        } else {
            return '������';
        }
    },

    'KZT': function(count) {
        return '�����';
    },

    'USD': function(count) {
        if (count % 100 > 10 && count % 100 < 20) {
            return '��������';
        } else if (count % 10 == 1) {
            return '������';
        } else if (count % 10 > 1 && count % 10 < 5) {
            return '�������';
        } else {
            return '��������';
        }
    },

    'EUR': function(count) {
        return '����';
    }

};

var payments_send = "���������";
var payments_cancel = "������"
var payments_your_comm = "��� �����";
var payments_thanks_for_comm = "������� �� ��� �����.";
var payments_msg_deleted = "��������� �������.";
var payments_close = "�������";

var captcha_send = "���������";
var captcha_cancel = "������";

mail_delete_failed = '�� ����� ���������� ��������� ������';
mail_restore_failed = '�� ����� ���������� ��������� ������';
mail_delete = '�������';
mail_cancel = '������';
mail_marked_as_spam = '��������� �������� ��� ���� � �������.';
mail_show_all_history = '�������� ��� ������� ���������';

var audio_you_need_flash = "��� ����, ����� ��������������� �������������, ��� ���������� ���������� Flash-�������������.";
var audio_do_you_want_flash = "������ ������� �� �������� ��������� �������������?";

var audio_edit_deleting_error = "��� �������� ����� ��������� ������: ";

var photo_error_occurred = '��������� ������.';

var qArr = [
    [0, '�� �����', '', 'people'],
    [1, '�� �������', '', 'groups'],
    [2, '�� ��������', '', 'events'],
    [3, '�� ������������', '', 'audio'],
    [4, '�� ������������', '', 'video'],
    [5, '�� �����������', '', 'ads'],
    [6, '�� �����������', '', 'apps'],
    [7, '�� ��������', '', 'questions'],
    [8, '�� ��������', '', 'notes'],
    [9, '�� �����', '', 'topics']
];

function langAndFriends(count) {
    return " � ��� " + count + " ���" + friendsFlex(count);
}

function friendsFlex(count) {
    count %= 100;
    if (count > 4 && count < 21) {
        return "���";
    }
    count %= 10;
    switch (count) {
        case 1:
            return '�';
            break;
        case 2:
        case 3:
        case 4:
            return '��';
            break;
        default:
            return '���';
    }
}