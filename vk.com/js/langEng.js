var langpack = {
    getSymbolFlex: function(n) {
        if (n == 1) {
            return "";
        }
        return "s";
    },
    noteExceedsSymbolLimit: function(n) {
        return "The note exceeds the limit by " + n + " character" + this.getSymbolFlex(n);
    },
    text_exceeds_symbol_limit: function(n) {
        return "The limit is esceeded by " + n + " character" + this.getSymbolFlex(n);
    },
    text_N_symbols_remains: function(n) {
        return "" + n + " character" + this.getSymbolFlex(n) + " remaining";
    },

    notes_deletion: "Delete the note",
    notes_delete: "Delete",
    notes_delete_cancel: "Cancel",
    notes_delete_sure: "Are you sure you want to delete this note?",
    notes_deleting: "Deleting the note...",

    notes_privacy_whocansee: 'Who can read this note?',
    notes_privacy_cansee: 'This <b>note</b> can be read by:',
    notes_privacy_save: "Save",
    notes_privacy_cancel: "Cancel",
    notes_privacy_whocancomment: 'Who can leave comments on this note?',
    notes_privacy_cancomment: 'Comments on this <b>note</b> can be left by:',

    pages_hider_show: 'show',
    pages_hider_hide: 'hide',

    video_comments_marked_as_spam: "Comment marked as spam.",
    video_marked_as_spam: "Video marked as spam.",

    captcha_enter_code: "Enter code:",

    votes_flex: function(n) {
        if (n == 1) {
            return "";
        }
        return "s";
    },

    apps_balance_plus_X_done: function(n) {
        return "You have increased the balance on your application by  <b>" + n + "</b> vote" + getLang('votes_flex', n) + ".";
    },

    apps_balance_minus_X_done: function(n) {
        return "You have decreased the balance on your application by <b>" + n + "</b> vote" + getLang('votes_flex', n) + ".";
    },

    apps_inv_from_X_deleted: function(name) {
        return "The invitation to " + name + " has been deleted.";
    },
    apps_notif_from_X_deleted: function(name) {
        return "The notification from the application " + name + " has been deleted.";
    },
    apps_invites_to_X_blocked: function(name) {
        return "You will no longer receive invitations to the application " + name + ".";
    },
    apps_notifs_from_X_blocked: function(name) {
        return "You will no longer receive notifications from the application " + name + ".";
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

    select_place_not_selected: ' - Not selected - ',
    select_place_select: 'Enter name',
    select_place_not_found: 'Place not found',

    select_house_not_selected: ' - Not selected - ',
    select_house_select: 'Enter house number',
    select_house_not_found: 'House not found',

    select_street_not_selected: ' - Not selected - ',
    select_street_select: 'Enter street',
    select_street_not_found: 'Street not found',

    select_station_not_selected: ' - Not selected - ',
    select_district_not_selected: ' - Not selected - ',

    select_chair_not_selected: ' - Not selected - ',
    select_chair_select: 'Enter chair',

    select_fac_not_selected: ' - Not selected - ',
    select_fac_select: 'Enter department',

    select_uni_not_selected: ' - Not selected - ',
    select_uni_select: 'Enter university',
    select_uni_not_found: 'University not found',

    select_school_not_selected: ' - Not selected - ',
    select_school_select: 'Enter school',
    select_school_not_found: 'School not found',

    select_city_not_selected: ' - Not selected - ',
    select_city_select: 'Enter city',
    select_city_not_found: 'City not found',

    select_country_not_selected: ' - Not selected - '

};

var activity_update_just_now = "Updated just a moment ago";
var activity_cant_update = "Status not updated";
var activity_deleted = "Status deleted";
var activity_change_status = "[ Change Status ]";


var admin2_school = "School";
var admin2_gymnasium = "Gymnasium";
var admin2_liceum = "Lyceum";
var admin2_internat = "Boarding School";
var admin2_evening = "Night School";
var admin2_music = "Music School";
var admin2_sports = "Sport School";
var admin2_artistic = "Art School";
var admin2_art = "Art School";
var admin2_garten = "Kindergarten";
var admin2_prof_liceum = "Vocational School";
var admin2_colledge = "Vocational School";
var admin2_tech = "Vocational School";
var admin2_spec_school = "Vocational School";
var admin2_prof_tech = "Vocational School";
var admin2_prof = "Vocational School";
var admin2_driving_sch = "Driving School";

var admin2_full_univ_name = "Full Name";
var admin2_ready = "done";
var admin2_cancel = "cancel";
var admin2_search = "search";
var admin2_edit = "edit";
var admin2_list = "list";
var admin2_hide_list = "hide list";
var admin2_server_error = "Server Error.";


var audio_flash_needed = "You need to install Flash Player in order to use the audio service.";


var audio_edit_editing = "Edit Audio File";
var audio_edit_singer = "Artist";
var audio_edit_name = "Title";
var audio_edit_text = "Lyrics";
var audio_edit_additionally = "Optional";
var audio_edit_dont_show_search = "Do not show in search results";
var audio_edit_edit = "Edit";
var audio_edit_cancel = "Cancel";
var audio_edit_unknown = "Unknown Artist";
var audio_edit_noname = "No Name";
var audio_edit_deleting = "Delete";
var audio_edit_sure_delete = "Are you sure you want to delete this audio file?";
var audio_edit_yes = "Yes";
var audio_edit_no = "No";


var base_rotating = "Rotating";
var base_uploading_photo = "Uploading";
var base_dont_close = "Please do not close this window until the upload is complete.";


var blog_tryagain = "There has been an unknown error. Try again.";
var blog_wrote_m = "wrote";
var blog_wrote_fm = "wrote";
var blog_delete = "Delete";
var blog_comm_deleted = "Comment Deleted.";
var blog_renewpage = "There has been an unknown error. Try refreshing the page.";

var blog_comment_sent = "sent";
var blog_comment_sending = "is sending";
var blog_comment_not_sent = "has not been sent";


var bookmarks_dont_watch = "Unsubscribe";
var bookmarks_sure_dont_watch = "Are you sure you want to unsubscribe from this thread?";
var bookmarks_yes = "Yes";
var bookmarks_no = "No";


var common_Jan = "January";
var common_Feb = "February";
var common_Mar = "March";
var common_Apr = "April";
var common_May = "May";
var common_Jun = "June";
var common_Jul = "July";
var common_Aug = "August";
var common_Sep = "September";
var common_Oct = "October";
var common_Nov = "November";
var common_Dec = "December";


var editor_descr = "Description";
var editor_adding_audio = "Adding Audio File";
var editor_insert_audio = "Insert Audio File";
var editor_singer_name = "Artist - Title";
var editor_cancel = "Cancel";
var editor_adding_link = "Adding Link";
var editor_insert_link = "Insert Link";


var events_menus_error_xmlhttp = "XMLHTTP Error";
var events_cancel = "Cancel";
var events_new_event_header = "Create an Event";
var events_new_enter_name = "Please enter event name";


var friend_showed = "displayed";
var friend_first = "first";


var functions_sure_delete = "Are you sure you want to delete this item?";


var groups_enter_post = "Enter a position:";
var groups_group_admin = "Group Administrator";
var groups_edit = "Edit";
var groups_cancel = "Cancel";
var groups_delete_manager = "Dismiss Officer";
var groups_sure_delete_manager = "Are you sure that you would like to dismiss this officer?";
var groups_yes = "Yes";
var groups_no = "No";
var groups_editing_link = "Editing Link";
var groups_enter_name = "Enter Description:";
var groups_deleting_link = "Deleting Link";
var groups_sure_delete_link = "Are you sure you want to delete this link?";
var groups_cancel2 = "Cancel";
var groups_partic_accepted = "Member Accepted.";
var groups_appl_rejected = "Member Rejected.";
var groups_inv_cancelled = "Invitation Canceled.";
var groups_partic_deleted = "Member Deleted.";
var groups_assigning_manager = "Appointing Officer";
var groups_assign = "Appoint";
var groups_assigned = "Officer Appointed.";
var groups_create_new = "Create a Group";
var groups_create_enter = "Enter group name here";


var mail_msg_deleted = "Message Deleted.";
var mail_cancel = "Cancel";
var mail_error = "Error";
var mail_cant_add_more15 = "You cannot send a message to more than fifteen friends at once.";
var mail_close = "Close";
var mail_add_1_address = "Please specify at least one recipient for this message.";
var mail_enter_text = "Please enter the text of your message.";


var matches_yes_accepted = "Agreement Accepted.";
var matches_no_accepted = "Refusal Accepted.";
var matches_user_deleted = "User Removed from the List.";
var matches_open = "open";
var matches_close = "close";


var merger_cant_get_data = "Could not find the data:";


var photosedit_report_developers = "There has been an error. Please report it to the developers.";
var photosedit_cant_query_server = "Server query unsuccessful";


var photosedit_plain_cant_move = "Sorry, could not move the photo. Refresh the page and try again.";


var profile_edit_error = "Error";
var profile_edit_sel_town_to_save = "Please select at least a city if you want to save this place.";
var profile_edit_close = "Close";

var placeTypes = [
    ["", 1],
    ["Home", 1],
    ["Work", 0],
    ["Restaurant", 0],
    ["Club", 0],
    ["Bar", 0],
    ["Pub", 0],
    ["Cafe", 0],
    ["Internet Cafe", 0],
    ["Computer Club", 0],
    ["Movie Theater", 0],
    ["Bowling", 0],
    ["Billiard", 0],
    ["Hotel", 0],
    ["Summer Camp", 0],
    ["Vacation", 1],
    ["Spa", 0],
    ["Holiday Hotel", 0],
    ["Rest House", 0],
    ["Hostel", 0],
    ["Motel", 0],
    ["Driving School", 0],
    ["Educational Courses", 0],
    ["Society", 0],
    ["Circle", 0],
    ["Studio", 0],
    ["Fitness Center", 0],
    ["Sports Club", 0],
    ["Stadium", 0],
    ["Gym", 0],
    ["Swimming Pool", 0],
    ["Beauty Salon", 0],
    ["Hairdresser's", 0],
    ["Theater", 0],
    ["Concert Hall", 0],
    ["Library", 0],
    ["Museum", 0],
    ["Gallery", 0],
    ["Philharmonic", 0],
    ["Exhibition Center", 0],
    ["Temple", 0],
    ["Hospital", 0],
    ["Clinic", 0],
    ["Military Hospital", 0],
    ["Maternity Hospital", 0],
    ["Store", 0],
    ["Boutique", 0],
    ["Shopping Mall", 0],
    ["Salon", 0],
    ["Supermarket", 0],
    ["Hypermarket", 0],
    ["Summer Cottage", 0]
];

var select_select = "Select";
var select_enter = "Enter";
var select_uploading = "Uploading...";
var select_error = "Error";
var select_must_sel_var = "You must select a variant.";
var select_close = "Close";


var simpleajax_loading = "...Loading...";


var tagpeople_remove = "remove";


var tagshow_you_saved = "Tag for yourself saved ";
var tagshow_I = "Me";
var tagshow_You = "You";
var tagshow_user = "User";
var tagshow_was_saved = "has been tagged in this photo.";
var tagshow_click_ready = "When you are done, click the \"Done Tagging\" button.";


var voting_cant_vote = "Unfortunately, your vote could not be recorded. Refresh the page and try again.";
var voting_cant_revote = "Unfortunately, your revote could not be recorded. Refresh the page and try again.";
var voting_cant_open = "Unfortunately, your poll could not be created. Refresh the page and try again.";
var voting_cant_close = "Unfortunately, the poll could not be closed. Refresh the page and try again.";
var voting_cant_place_main = "Unfortunately, the poll could not be moved to the main page of the group. Refresh the page and try again.";
var voting_cant_remove_main = "Unfortunately, the poll could not be removed from the main page. Refresh the page and try again.";
var voting_empty_vars = "Blank responses are not allowed. Enter something or remove them.";

var questions_text = "����� �������:";
var questions_topic = "��������:";
var questions_loading = "Loading...";
var questions_hide_comms = "Hide comments";
var questions_show_comms = "Show comments";

var ebrowse_mn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var ebrowse_days = "MonTueWedThuFriSatSun";
var ebrowse_dayname_length = 3;

var friends2_catedit = "edit";

var news_categories = "Friends' categories";
var news_updatesforcategories = 'Show updates for following categories:';
var news_save = "Save";
var news_cancel = "Cancel";

var app_comments_showcomms = "Show comments";
var app_comments_hidecomms = "Hide comments";
var app_comments_connecterror = "Connection error.";

forum_adding_subsection = 'Adding subsection';
forum_enter_name = 'Enter title:';
forum_new_subsection_or = 'or you can add existing subsection';
forum_enter_subsection_id = 'Enter subsection ID:';
forum_add = 'Add';
forum_changing_image = 'Changing subsection picture';
forum_changing_image_text = 'You may enter links only to the images stored on vkontakte.ru. Correct link format:';
forum_changing_image_right_link = 'http://<span style="font-style: italic">subdomain.</span>vkontakte.ru/<span style="font-style: italic">image_address</span>';
forum_enter_link = 'Enter a link:';
forum_change = 'Save changes';
forum_editing_leaders = 'Editing officers';
forum_ok = 'Done';
forum_cancel = 'Cancel';
forum_admin = 'Administrator';
forum_leader = 'Officer';
forum_delete = 'Delete';
forum_show_add_leader = 'Add officer';
forum_add_leader = 'Add';
forum_editing_links = 'Editing links';
forum_show_add_link = 'Add link';
forum_edit = 'Edit';
forum_link_name = 'Title';
forum_link_label = 'Subscription';
forum_link_link = 'Link';
forum_add_link = 'Add';
forum_error_wrong_name_link = 'You should enter title and link';
forum_error_wrong_id = 'You should enter correct ID';
forum_error_null_answer = 'You should enter the answer';
forum_flood_control = 'You are sending messages too fast.';
forum_edit_subsections = 'Subsection order';
forum_edit_subsections_finish = 'Done';
forum_subscribe = 'Subscribe for answers';
forum_unsubscribe = 'Unsubscribe from answers';
forum_error_mark_read = 'Unable to mark the topic as unread';
forum_editing_comment = 'Editing answer';
forum_enter_text = 'Text:';
forum_error_closing_topic = 'Error while closing question';
forum_error_opening_topic = 'Error while opening question';
forum_editing_topic = 'Editing question';
forum_enter_header = 'Enter subject:';
forum_error_sticking_topic = 'Error while sticking question';
forum_error_unsticking_topic = 'Error while unsticking question';
forum_rename_section = 'Renaming section';
forum_close_section = 'Close section';
forum_close_section_title = 'Close for adding questions by users';
forum_open_section = 'Open section';
forum_open_section_title = 'Open for adding questions by users';
forum_error_opening_section = 'Error while opening section';
forum_error_closing_section = 'Error while closing section';
forum_new_topic_text = 'You can add an existing question to this subsection here. To add a new question, please uses "Ask a question" link in Questions box.';
forum_enter_topic_id = 'Enter question ID:';
forum_adding_topic = 'Adding question';
forum_is_hidden_answer = 'Hidden answer';
forum_is_right_answer = 'Right answer';
forum_about_right_answer = 'Each question may have one answer marked as "Right answer". The answer that has been marked so becomes the second post, and gets a special sign. Please remember: only one answer to the question can be marked as "Right", if you mark another answer as "Right" then the first becomes an ordinary answer and will be displayed in its original place.';
forum_hidden_topic = 'Hidden question';
forum_hidden_answer = 'Hidden answer';
forum_hidden_right_answer = 'Hidden answer';
forum_right_answer = 'Answer';
forum_delete = 'Delete';
forum_delete_topic = 'Deleting question';
forum_delete_topic_confirm = 'Are you sure you wish to delete this question?';
forum_delete_not_unique_topic_confirm = 'This question is located in multiple sections. If you remove the question, it will be put away from all those sections. If you want to remove the question from this section only, click the link below:';
forum_delete_not_unique_topic = 'Remove from this section';
forum_delete_section = 'Removing section';
forum_delete_section_confirm = 'Are you sure you wish to remove this section?';
forum_delete_not_unique_section_confirm = 'This question is located in multiple sections. If you remove the question, it will be put away from all those sections. If you want to remove the question from this section only, please click the link below:';
forum_delete_not_unique_section = 'Remove from this section';
forum_must_enter_title = 'You must enter the title of your question.';
forum_must_enter_text = 'You must enter the text of your question.';

forum_new_officer_id = 'New Officer ID';

temp_messages_shown_function = function(first, last) {
    if (!first)
        first = 1;
    if (first > last)
        return 'No answers on this page yet.';
    return 'Displaying answers #' + first + '-' + last + '.';
}

temp_answer_count_function = function(count) {
    if (count <= 0)
        return 'no answers';
    if (count == 1)
        return count + ' answer';
    return count + ' answers';
}

temp_msg_count_function = function(count) {
    if (count <= 0)
        return 'no posts';
    if (count == 1)
        return count + ' post';
    return count + ' posts';
}

temp_messages_in_topic_function = function(count) {
    return 'There are ' + temp_msg_count_function(count) + ' in the discussion.';
}

temp_post_too_long_function = function(count) {
    var tmp = ' symbols';
    if (count == 1)
        tmp = ' symbol';
    return 'Permissible answer length exceeded by ' + count + tmp;
}

board_error = 'Error';
board_too_fast = 'You are posting too fast.';
board_ok = 'OK';
board_edit = 'Edit';
board_cannot_edit = 'You cannot edit this post.';
board_error_occurred = 'Error occurred.';
board_links_forbidden = 'Group administrator has forbidden using links..';
board_done = 'Done';
board_any_links_forbidden = 'Group administrator has forbidden using any links.';
board_enter_text = 'Please enter text for this post.';
board_edit_voting = 'Edit poll';
board_delete_voting = 'Delete poll';
board_create_voting = 'Create poll';
board_new_topic_title = 'New topic title:';
board_cancel = 'Cancel';
board_edit_topic = 'Edit topic';
board_wrong_topic_number = 'Wrong topic number.';
board_no_text_stated = 'Please enter text for this topic.';
board_cannot_edit_title = 'You cannot edit title for this topic';
board_sure_delete_topic = 'Are you sure you want to delete this topic?';
board_delete = 'Delete';
board_warning = 'Warning';
board_sure_delete_voting = 'Are you sure you want to delete this poll?';
board_voting_not_deleted = 'Poll could not be created.';
board_voting_deleted = 'Poll deleted.';
board_create_topic = 'Create topic';

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
        if (count == 1) {
            return 'ruble';
        } else {
            return 'rubles';
        }
    },

    'UAH': function(count) {
        if (count == 1) {
            return 'hryvnia';
        } else {
            return 'hryvnias';
        }
    },

    'KZT': function(count) {
        if (count == 1) {
            return 'tenge';
        } else {
            return 'tenges';
        }
    },

    'USD': function(count) {
        if (count == 1) {
            return 'dollar';
        } else {
            return 'dollars';
        }
    },

    'EUR': function(count) {
        if (count == 1) {
            return 'euro';
        } else {
            return 'euros';
        }
    }

};

var payments_send = "Send";
var payments_cancel = "Cancel"
var payments_your_comm = "Your message";
var payments_thanks_for_comm = "Thank you for your message!";
var payments_msg_deleted = "Message has been deleted.";
var payments_close = "Close";

var captcha_send = "Send";
var captcha_cancel = "Cancel";

mail_delete_failed = '�� ����� ���������� ��������� ������';
mail_restore_failed = '�� ����� ���������� ��������� ������';
mail_delete = 'Delete';
mail_cancel = 'Cancel';
mail_marked_as_spam = '��������� �������� ��� ���� � �������.';
mail_show_all_history = '�������� ��� ������� ���������';

var audio_you_need_flash = "��� ����, ����� ��������������� �������������, ��� ���������� ���������� Flash-�������������.";
var audio_do_you_want_flash = "������ ������� �� �������� ��������� �������������?";

var audio_edit_deleting_error = "��� �������� ����� ��������� ������: ";

var photo_error_occurred = '��������� ������.';

var qArr = [
    [0, 'By person', '', 'people'],
    [1, 'By group', '', 'groups'],
    [2, 'By event', '', 'events'],
    [3, 'By audiofile', '', 'audio'],
    [4, 'By video', '', 'video'],
    [5, 'By classified ad', '', 'ads'],
    [6, 'By application', '', 'apps'],
    [7, 'By question', '', 'questions'],
    [8, 'By note', '', 'notes'],
    [9, 'By topic', '', 'topics']
];