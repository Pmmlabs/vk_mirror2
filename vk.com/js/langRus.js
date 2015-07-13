var langpack = {
  getSymbolFlex: function(n) {
    n = n % 100;
    if (n % 10 == 1 && n != 11) {return "";}
    if (n % 10 > 1 && n % 10 < 5 && (n - n % 10 != 10)) {return "а";}
    return "ов";
  },
  noteExceedsSymbolLimit:function(n){
    return "Заметка превышает допустимый объем на " + n + " знак" + this.getSymbolFlex(n);
  },
  text_exceeds_symbol_limit:function(n){
    return "Допустимый объем превышен на " + n + " знак" + this.getSymbolFlex(n);
  },
  text_N_symbols_remains:function(n) {
    n = n % 100;
    var remains = (n % 10 == 1 && n != 11) ? "ся " : "ось ";
    return "Остал" + remains + n + " знак" + this.getSymbolFlex(n);
  },
	
  notes_deletion: "Удаление заметки",
  notes_delete: "Удалить",
  notes_delete_cancel: "Отмена",
  notes_delete_sure: "Вы действительно хотите удалить эту заметку?",
  notes_deleting: "Заметка удаляется...",
	
  notes_privacy_whocansee: 'Кто видит заметку?',
  notes_privacy_cansee: '<b>Заметку</b> могут просматривать:',
  notes_privacy_save: "Сохранить",
  notes_privacy_cancel: "Отмена",
  notes_privacy_whocancomment: 'Кто может комментировать заметку?',
  notes_privacy_cancomment: '<b>Заметку</b> могут комментировать:',
	
  pages_hider_show: 'показать',
  pages_hider_hide: 'скрыть',
	
  video_comments_marked_as_spam:  "Комментарий помечен как спам.",
  video_marked_as_spam:  "Видеозапись помечена как спам.",
	
  photo_marked_as_spam:  "Фотография помечена как спам.",
  
  captcha_enter_code: "Введите код с картинки:",
  
  votes_flex: function(n) {
    var r = n % 10;
    if (r % 1 != 0) { return "а"; }
    if (n > 4 && n < 20) { return "ов"; }
    switch (r) {
      case 1: return ''; break;
      case 2:
      case 3:
      case 4: return 'а'; break;
      default: return 'ов';
    }
  },
  
  apps_balance_plus_X_done: function(n){
    return "Вы пополнили баланс приложения на <b>" + n + "</b> голос" + getLang('votes_flex', n) + ".";
  },

  apps_balance_minus_X_done: function(n){
    return "Вы уменьшили баланс приложения на <b>" + n + "</b> голос" + getLang('votes_flex', n) + ".";
  },
  
  apps_inv_from_X_deleted: function(name){
    return "Приглашение в приложение "+name+" удалено.";
  },
  apps_notif_from_X_deleted: function(name){
    return "Оповещение от приложения "+name+" удалено.";
  },
  apps_invites_to_X_blocked: function(name){
    return "Приглашения в приложение "+name+" блокированы.";
  },
  apps_notifs_from_X_blocked: function(name){
    return "Оповещения от приложения "+name+" блокированы.";
  },
  
  friends_create_list_title: 'Создание списка друзей',
  friends_continue: 'Продолжить',
  friends_create_list: 'Создать список',
  friends_you_can_save_this_list: 'Вы можете сохранить этот список друзей.<br />В дальнейшем Вы сможете использовать его снова.',
  friends_enter_list_name: 'Введите название списка',
  friends_no_user_selected: 'Вы не выбрали ни одного пользователя.',
  friends_nothing_found_by_query: function(query){ return 'По запросу "'+query+'" ничего не найдено.'; },
  friends_show_more_friends: 'Показать больше друзей',
  friends_select_all: 'Выделить всех',
  friends_remove_selection: 'Снять выделение',
  friends_change_name: 'изменить название',
  friends_enter_list_name: 'Введите название списка',
  friends_enter_friend_name: 'Начните вводить имя друга',
  friends_all: 'Все',
  friends_selected: 'Выбранные',
  friends_new_friends_list: 'Новый список друзей',
  friends_list_name: 'Название списка',
  friends_edit_list_title: 'Редактирование списка друзей',
  friends_privacy_title: 'Настройки приватности',
  friends_save: 'Сохранить',
  friends_cancel: 'Отмена',
  friends_flex: function(count) {
    count %= 100;
    if (count > 4 && count < 21) {
      return "зей";
    }
    switch (count) {
      case 1: return 'г'; break;
      case 2:
      case 3:
      case 4: return 'га'; break;
      default: return 'зей';
    }
  },
  friends_X_users_in_list: function(count) { return 'В списке ' + count + ' дру' + getLang('friends_flex', count); },

  select_place_not_selected: ' - Не выбрано - ',
  select_place_select: 'Введите название',
  select_place_not_found: 'Название не найдено',

  select_house_not_selected: ' - Не выбран - ',
  select_house_select: 'Введите номер',
  select_house_not_found: 'Дом не найден',

  select_street_not_selected: ' - Не выбрана - ',
  select_street_select: 'Введите название',
  select_street_not_found: 'Улица не найдена',

  select_station_not_selected: ' - Не выбрана - ',
  select_district_not_selected: ' - Не выбран - ',

  select_chair_not_selected: ' - Не выбрана - ',
  select_chair_select: 'Введите название',

  select_fac_not_selected: ' - Не выбран - ',
  select_fac_select: 'Введите название',

  select_uni_not_selected: ' - Не выбран - ',
  select_uni_select: 'Введите название',
  select_uni_not_found: 'ВУЗ не найден',

  select_school_not_selected: ' - Не выбрана - ',
  select_school_select: 'Введите название',
  select_school_not_found: 'Школа не найдена',

  select_city_not_selected: ' - Не выбран - ',
  select_city_select: 'Введите название',
  select_city_not_found: 'Город не найден',

  select_country_not_selected: ' - Не выбрана - '

};

var activity_update_just_now = "Обновлено только что";
var activity_cant_update = "Не удалось обновить статус.";
var activity_deleted = "Статус удален.";
var activity_change_status = "[ изменить статус ]";

var admin2_school = "Школа";
var admin2_gymnasium = "Гимназия";
var admin2_liceum = "Лицей";
var admin2_internat = "Школа-интернат";
var admin2_evening = "Вечерняя школа";
var admin2_music = "Музыкальная школа";
var admin2_sports = "Спортивная школа";
var admin2_artistic = "Худ. школа";
var admin2_art = "Школа искусств";
var admin2_garten = "Детский сад";
var admin2_prof_liceum = "Проф. лицей";
var admin2_colledge = "Колледж";
var admin2_tech = "Техникум";
var admin2_spec_school = "Училище";
var admin2_prof_tech = "ПТУ";
var admin2_prof = "Проф. училище";
var admin2_driving_sch = "Автошкола";
var admin2_full_univ_name = "Полное название вуза";
var admin2_ready = "готово";
var admin2_cancel = "отмена";
var admin2_search = "поиск";
var admin2_edit = "редактировать";
var admin2_list = "список";
var admin2_hide_list = "скрыть список";
var admin2_server_error = "Ошибка сервера.";


var audio_flash_needed = "Для того, чтобы воспользоваться аудиосервисом, Вам необходимо установить Flash-проигрыватель.";


var audio_edit_editing = "Редактирование аудиозаписи";
var audio_edit_singer = "Исполнитель";
var audio_edit_name = "Название";
var audio_edit_text = "Слова песни";
var audio_edit_additionally = "Дополнительно";
var audio_edit_dont_show_search = "Не выводить при поиске";
var audio_edit_edit = "Редактировать";
var audio_edit_cancel = "Отмена";
var audio_edit_unknown = "Неизвестный исполнитель";
var audio_edit_noname = "Без названия";
var audio_edit_deleting = "Удаление аудиозаписи";
var audio_edit_sure_delete = "Вы действительно хотите удалить эту аудиозапись?";
var audio_edit_yes = "Да";
var audio_edit_no = "Нет";


var base_rotating = "Поворачиваем";
var base_uploading_photo = "Идёт загрузка фотографий";
var base_dont_close = "Пожалуйста, не закрывайте это окно, пока фотографии не загрузятся.";


var blog_tryagain = "Произошла неизвестная ошибка. Попробуйте снова.";
var blog_wrote_m = "написал";
var blog_wrote_fm = "написала";
var blog_delete = "Удалить";
var blog_comm_deleted = "Комментарий удален.";
var blog_renewpage = "Произошла неизвестная ошибка. Попробуйте перезагрузить страницу.";
var blog_comment_sent = "отправлен";
var blog_comment_sending = "отправляется";
var blog_comment_not_sent = "не отправлен";



var bookmarks_dont_watch = "Не следить";
var bookmarks_sure_dont_watch = "Вы действительно не хотите больше следить за этими комментариями?";
var bookmarks_yes = "Да";
var bookmarks_no = "Нет";


var common_Jan = "января";
var common_Feb = "февраля";
var common_Mar = "марта";
var common_Apr = "апреля";
var common_May = "мая";
var common_Jun = "июня";
var common_Jul = "июля";
var common_Aug = "августа";
var common_Sep = "сентября";
var common_Oct = "октября";
var common_Nov = "ноября";
var common_Dec = "декабря";


var editor_descr = "Описание";
var editor_adding_audio = "Добавление аудиозаписи";
var editor_insert_audio = "Вставить аудиозапись";
var editor_singer_name = "Исполнитель - Название";
var editor_cancel = "Отмена";
var editor_adding_link = "Добавление ссылки";
var editor_insert_link = "Вставить ссылку";


var events_menus_error_xmlhttp = "Ошибка при создании XMLHTTP";
var events_cancel = "Отмена";
var events_new_event_header = "Создание нового события";
var events_new_enter_name = "Пожалуйста, введите название события";


var friend_showed = "показываются";
var friend_first = "первые";


var functions_sure_delete = "Вы действительно хотите удалить эту запись?";


var groups_enter_post = "Введите должность:";
var groups_group_admin = "Администратор группы";
var groups_edit = "Редактировать";
var groups_cancel = "Отмена";
var groups_delete_manager = "Удаление руководителя";
var groups_sure_delete_manager = "Вы действительно хотите удалить этого человека из руководителей?";
var groups_yes = "Да";
var groups_no = "Нет";
var groups_editing_link = "Редактирование ссылки";
var groups_enter_name = "Введите название:";
var groups_deleting_link = "Удаление ссылки";
var groups_sure_delete_link = "Вы действительно хотите удалить ссылку на эту группу?";
var groups_cancel2 = "Отменить";
var groups_partic_accepted = "Участник принят.";
var groups_appl_rejected = "Заявка отклонена.";
var groups_inv_cancelled = "Приглашение отменено.";
var groups_partic_deleted = "Участник удален.";
var groups_assigning_manager = "Назначение руководителя";
var groups_assign = "Назначить";
var groups_assigned = "Участник назначен руководителем.";
var groups_unbanned = "Пользователь удален из бан-листа";
var groups_create_new = "Создание новой группы";
var groups_create_enter = "Пожалуйста, введите название группы";


var mail_msg_deleted = "Сообщение удалено.";
var mail_cancel = "Отмена";
var mail_error = "Ошибка";
var mail_cant_add_more15 = "Вы можете добавить не более 15 адресатов.";
var mail_close = "Закрыть";
var mail_add_1_address = "Пожалуйста, добавьте хотя бы одного адресата.";
var mail_enter_text = "Пожалуйста, введите текст сообщения.";


var matches_yes_accepted = "Согласие принято.";
var matches_no_accepted = "Отказ принят.";
var matches_user_deleted = "Пользователь удален из списка.";
var matches_open = "открыть";
var matches_close = "закрыть";


var merger_cant_get_data = "Не удалось получить данные:";


var photosedit_report_developers = "Произошла ошибка, пожалуйста, сообщите разработчикам.";
var photosedit_cant_query_server = "не удалось выполнить запрос к серверу";


var photosedit_plain_cant_move = "Извините, фотографию переместить не удалось. Попробуйте перегрузить страницу и попробовать еще раз.";


var profile_edit_error = "Ошибка";
var profile_edit_sel_town_to_save = "Пожалуйста, выберите хотя бы город, если Вы хотите сохранить название места.";
var profile_edit_close = "Закрыть";

var placeTypes = [["",1],
["Дом", 1],
["Работа", 0],
["Ресторан", 0],
["Клуб", 0],
["Бар", 0],
["Паб", 0],
["Кафе", 0],
["Интернет-кафе", 0],
["Компьютерный клуб", 0],
["Кинотеатр", 0],
["Боулинг", 0],
["Бильярд", 0],
["Гостиница", 0],
["Летний лагерь", 0],
["Путешествие", 1],
["Санаторий", 0],
["Пансионат", 0],
["Дом отдыха", 0],
["Хостел", 0],
["Мотель", 0],
["Автошкола", 0],
["Курсы", 0],
["Клуб по интересам", 0],
["Кружок", 0],
["Студия", 0],
["Фитнес-центр", 0],
["Спортивный клуб", 0],
["Стадион", 0],
["Спортзал", 0],
["Бассейн", 0],
["Салон красоты", 0],
["Парикмахерская", 0],
["Театр", 0],
["Концертный зал", 0],
["Библиотека", 0],
["Музей", 0],
["Галерея", 0],
["Филармония", 0],
["Выставочный центр", 0],
["Храм", 0],
["Больница", 0],
["Поликлиника", 0],
["Госпиталь", 0],
["Роддом", 0],
["Магазин", 0],
["Бутик", 0],
["ТРК", 0],
["Салон", 0],
["Супермаркет", 0],
["Гипермаркет", 0],
["Дача", 0]
];


var select_select = "Выберите";
var select_enter = "Введите";
var select_uploading = "Идет загрузка...";
var select_error = "Ошибка";
var select_must_sel_var = "Необходимо выбрать вариант из списка.";
var select_close = "Закрыть";


var simpleajax_loading = "...Идёт загрузка...";


var tagpeople_remove = "убрать";


var tagshow_you_saved = "Вы сохранены на этой фотографии";
var tagshow_I = "Я";
var tagshow_You = "Вы";
var tagshow_user = "Пользователь";
var tagshow_was_saved = "был сохранен на этой фотографии";
var tagshow_click_ready = "Когда закончите отмечать друзей, нажмите кнопку \"Готово\".";


var voting_cant_vote = "Увы, проголосовать не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_cant_revote = "Увы, переголосовать не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_cant_open = "Увы, открыть опрос не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_cant_close = "Увы, закрыть опрос не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_cant_place_main = "Увы, поместить опрос на главную страницу группы не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_cant_remove_main = "Увы, убрать опрос с главной страницы группы не удалось. Перезагрузите страницу и попробуйте еще раз.";
var voting_empty_vars = "Пустые варианты ответа недопустимы. Заполните или уберите их.";

var questions_text = "Текст вопроса:";
var questions_topic = "Тематика:";
var questions_loading = "Загрузка...";
var questions_hide_comms = "Скрыть комментарии";
var questions_show_comms = "Показать комментарии";

var ebrowse_mn = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
var ebrowse_days = "ПнВтСрЧтПтСбВс";
var ebrowse_dayname_length = 2; 

var friends2_catedit = "редактировать";

var news_categories = 'Папки друзей';
var news_updatesforcategories = 'Показывать обновления только этих групп:';
var news_save = "Сохранить";
var news_cancel = "Отмена";

var app_comments_showcomms = "Показать комментарии";
var app_comments_hidecomms = "Скрыть комментарии";
var app_comments_connecterror = "Ошибка соединения.";

forum_adding_subsection = 'Добавление подраздела';
forum_enter_name = 'Введите название:';
forum_new_subsection_or = 'или вы можете добавить существующий подраздел';
forum_enter_subsection_id = 'Введите ID подраздела:';
forum_add = 'Добавить';
forum_changing_image = 'Изменение изображения подраздела';
forum_changing_image_text = 'Можно вводить ссылки только на изображения, хранящиеся на сайте vkontakte.ru. Правильный вид ссылки:';
forum_changing_image_right_link = 'http://<span style="font-style: italic">поддомен.</span>vkontakte.ru/<span style="font-style: italic">адрес_изображения</span>';
forum_enter_link = 'Введите ссылку:';
forum_change = 'Изменить';
forum_editing_leaders = 'Редактирование руководителей';
forum_ok = 'Готово';
forum_cancel = 'Отменить';
forum_admin = 'Администратор';
forum_leader = 'Руководитель';
forum_delete = 'Удалить';
forum_show_add_leader = 'Добавить руководителя';
forum_add_leader = 'Добавить';
forum_editing_links = 'Редактирование ссылок';
forum_show_add_link = 'Добавить ссылку';
forum_edit = 'Редактировать';
forum_link_name = 'Название';
forum_link_label = 'Подпись';
forum_link_link = 'Ссылка';
forum_add_link = 'Добавить';
forum_error_wrong_name_link = 'Надо указать название и ссылку';
forum_error_wrong_id = 'Надо ввести правильный ID';
forum_error_null_answer = 'Надо ввести ответ';
forum_flood_control = 'Вы отправляете сообщения слишком быстро.';
forum_edit_subsections = 'Порядок подразделов';
forum_edit_subsections_finish = 'Готово';
forum_subscribe = 'Подписаться на ответы';
forum_unsubscribe = 'Отписаться от ответов';
forum_error_mark_read = 'Не удалось отметить тему как прочитанную';
forum_editing_comment = 'Редактирование ответа';
forum_enter_text = 'Текст:';
forum_error_closing_topic = 'Ошибка при закрытии вопроса';
forum_error_opening_topic = 'Ошибка при открытии вопроса';
forum_editing_topic = 'Редактирование вопроса';
forum_enter_header = 'Введите заголовок:';
forum_error_sticking_topic = 'Ошибка при прилеплении вопроса';
forum_error_unsticking_topic = 'Ошибка при отлеплении вопроса';
forum_rename_section = 'Переименование раздела';
forum_close_section = 'Закрыть раздел';
forum_close_section_title = 'Закрыть на добавление вопросов рядовыми пользователями';
forum_open_section = 'Открыть раздел';
forum_open_section_title = 'Открыть на добавление вопросов рядовыми пользователями';
forum_error_opening_section = 'Ошибка при открытии раздела';
forum_error_closing_section = 'Ошибка при закрытии раздела';
forum_new_topic_text = 'Здесь вы можете добавить в данный раздел существующий вопрос. Чтобы добавить новый вопрос, воспользуйтесь ссылкой "Задать вопрос" в секции вопросов.';
forum_enter_topic_id = 'Введите ID вопроса:';
forum_adding_topic = 'Добавление вопроса';
forum_is_hidden_answer = 'Скрытый ответ';
forum_is_right_answer = 'Правильный ответ';
forum_about_right_answer = 'У каждого вопроса один из ответов может быть с флажком "Правильный ответ". Ответ, который помечен таким образом, выводится вторым сообщением, сразу после вопроса, и особо отмечен. Не следует забывать, что у вопроса может быть помечен таким образом лишь один ответ, и если пометить второй ответ "Правильным", то первый станет обычным ответом и будет отображаться на своем родном месте.';
forum_hidden_topic = 'Скрытый вопрос';
forum_hidden_answer = 'Скрытый ответ';
forum_hidden_right_answer = 'Скрытый ответ';
forum_right_answer = 'Ответ';
forum_delete = 'Удалить';
forum_delete_topic = 'Удаление вопроса';
forum_delete_topic_confirm = 'Вы действительно хотите удалить этот вопрос?';
forum_delete_not_unique_topic_confirm = 'Этот вопрос содержится не только в этом разделе. Если вы удалите его, он пропадет из всех разделов, в которых находился. Если вы хотите удалить его только из этого раздела, нажмите на ссылку ниже:';
forum_delete_not_unique_topic = 'Удалить из этого раздела';
forum_delete_section = 'Удаление раздела';
forum_delete_section_confirm = 'Вы действительно хотите удалить этот раздел?';
forum_delete_not_unique_section_confirm = 'Этот подраздел содержится не только в этом разделе. Если вы удалите его, он пропадет из всех разделов, в которых находился. Если вы хотите удалить его только из этого раздела, нажмите на ссылку ниже:';
forum_delete_not_unique_section = 'Удалить из этого раздела';
forum_must_enter_title = 'Необходимо ввести заголовок вопроса.';
forum_must_enter_text = 'Необходимо ввести текст вопроса.';

forum_new_officer_id = 'ID нового руководителя';

temp_messages_shown_function = function(first, last)
{
	if (!first)
		first = 1;
	if (first > last)
		return 'На этой странице еще нет сообщений.';
	return 'На странице сообщения #' + first + '-' + last + '.';
}

temp_answer_count_function = function(count)
{
	if (count <= 0)
		return 'нет ответов';
	if ((count % 100 >= 5) && (count % 100 <= 20))
		return count + ' ответов';
	if (count % 10 == 1)
		return count + ' ответ';
	if ((count % 10 >= 2) && (count % 10 <= 4))
		return count + ' ответа';
	return count + ' ответов';
}

temp_msg_count_function = function(count)
{
	if (count <= 0)
		return 'нет сообщений';
	if ((count % 100 >= 5) && (count % 100 <= 20))
		return count + ' сообщений';
	if (count % 10 == 1)
		return count + ' сообщение';
	if ((count % 10 >= 2) && (count % 10 <= 4))
		return count + ' сообщения';
	return count + ' сообщений';
}

temp_messages_in_topic_function = function(count)
{
	return 'В обсуждении ' + temp_msg_count_function(count) + '.';
}

temp_post_too_long_function = function(count)
{
	var tmp = ' знаков';
	if ((count % 100 >= 5) && (count % 100 <= 20))
		tmp = ' знаков';
	else if (count % 10 == 1)
		tmp = ' знак';
	else if ((count % 10 >= 2) && (count % 10 <= 4))
		tmp = ' знака';
	return 'Допустимая длина ответа превышена на ' + count + tmp;
}

board_error = 'Ошибка';
board_too_fast = 'Вы отправляете сообщения слишком быстро.';
board_ok = 'ОК';
board_edit = 'Редактировать';
board_cannot_edit = 'Вы не можете редактировать это сообщение.';
board_error_occurred = 'К сожалению, произошла ошибка.';
board_links_forbidden = 'Администратор группы запретил использование ссылок.';
board_done = 'Готово';
board_any_links_forbidden = 'Администратор группы запретил размещать любые ссылки.';
board_enter_text = 'Надо ввести текст сообщения.';
board_edit_voting = 'Изменить опрос';
board_delete_voting = 'Удалить опрос';
board_create_voting = 'Создать опрос';
board_new_topic_title = 'Новое название темы:';
board_cancel = 'Отмена';
board_edit_topic = 'Редактировать тему';
board_wrong_topic_number = 'Неверный номер темы обсуждения.';
board_no_text_stated = 'Вы не указали текст темы.';
board_cannot_edit_title = 'Вы не можете редактировать название этой темы';
board_sure_delete_topic = 'Вы уверены, что хотите удалить эту тему?';
board_delete = 'Удалить';
board_warning = 'Предупреждение';
board_sure_delete_voting = 'Вы уверены, что хотите удалить опрос?';
board_voting_not_deleted = 'Не удалось удалить опрос.';
board_voting_deleted = 'Опрос удален.';
board_create_topic = 'Создать тему';

var market_about_paid_ads = 'О платных объявлениях';
var market_ok = 'OK';
var market_can_promote = 'Все пользователи могут продвигать свои объявления при поиске.';
var market_features = 'Особенности:';
var market_determine_cost = 'Вы сами определяете, сколько готовы платить за каждый уникальный переход на Ваше объявление.';
var market_pay_for_result = 'Вы платите только за результат - то есть за уникальные клики на Ваше объявление пользователями.';
var market_more_info = 'Более подробная информация - в настройках Вашего объявления.';
var market_create_ad = 'Создать объявление';
var market_available_later = 'Функция будет доступна позже';
var market_available_after = 'Данная функция станет доступна после создания объявления.';
var market_ads_search = 'Поиск объявлений';
var market_save = 'Сохранить';
var market_cancel = 'Отмена';
var market_report = 'Жалоба';
var market_select_ban_reason = 'Пожалуйста, выберите причину для блокировки объявления:';
var market_reason_spam = 'Спам / Сторонние ссылки';
var market_reason_porn = 'Порнография';
var market_reason_cheat = 'Ложная информация / Мошенничество';
var market_reason_offtop = 'Несоответствие разделу';
var market_reason_duplicate = 'Многократное дублирование';
var market_reason_extr = 'Экстремизм';
var market_reason_nonsense = 'Бессмыслица';
var market_reason_ortho = 'Орфографическая ошибка';
var market_defave = 'Удалить из избранного';
var market_enfave = 'Добавить в избранное';
var market_all_categs = 'Все категории';

var market_photo_one_of_photo = 'Фотография';
var market_photo_one_of_of = 'из';
var market_photos_for_ad = 'Фотографий для объявления:';
var market_photos_you_can = 'Вы можете выбрать до 5 фотографий для Вашего объявления.';
var market_photos_choose_album = 'Выберите альбом с фотографиями для вашего объявления.';
var market_photos_cancel = 'Отмена';
var market_photo_delete = 'Удалить';
var market_photo_no_delete = 'Не удалять';

var market_currency_count = {

  'RUB': function(count) {
    if (count % 100 > 10 && count % 100 < 20) {
      return 'рублей';
    } else if (count % 10 == 1) {
      return 'рубль';
    } else if (count % 10 > 1 && count % 10 < 5) {
      return 'рубля';
    } else {
      return 'рублей';
    }
  },

  'UAH': function(count) {
    if (count % 100 > 10 && count % 100 < 20) {
      return 'гривен';
    } else if (count % 10 == 1) {
      return 'гривна';
    } else if (count % 10 > 1 && count % 10 < 5) {
      return 'гривны';
    } else {
      return 'гривен';
    }
  },

  'KZT': function(count) {
    return 'тенге';
  },

  'USD': function(count) {
    if (count % 100 > 10 && count % 100 < 20) {
      return 'долларов';
    } else if (count % 10 == 1) {
      return 'доллар';
    } else if (count % 10 > 1 && count % 10 < 5) {
      return 'доллара';
    } else {
      return 'долларов';
    }
  },

  'EUR': function(count) {
    return 'евро';
  }

};                             

var payments_send = "Отправить";
var payments_cancel = "Отмена"
var payments_your_comm = "Ваш отзыв";
var payments_thanks_for_comm = "Спасибо за Ваш отзыв.";
var payments_msg_deleted = "Сообщение удалено.";
var payments_close = "Закрыть";

var captcha_send = "Отправить";
var captcha_cancel = "Отмена";

mail_delete_failed = 'Во время выполнения произошла ошибка';
mail_restore_failed = 'Во время выполнения произошла ошибка';
mail_delete = 'Удалить';
mail_cancel = 'Отмена';
mail_marked_as_spam = 'Сообщение помечено как спам и удалено.';
mail_show_all_history = 'Показать всю историю сообщений';

var audio_you_need_flash = "Для того, чтобы воспользоваться аудиосервисом, Вам необходимо установить Flash-проигрыватель.";
var audio_do_you_want_flash = "Хотите перейти на страницу установки проигрывателя?";

var audio_edit_deleting_error = "При удалении файла произошла ошибка: ";

var photo_error_occurred = 'Произошла ошибка.';

var qArr = [[0,'по людям', '', 'people'],
[1,'по группам', '', 'groups'],
[2,'по событиям', '', 'events'],
[3,'по аудиозаписям', '', 'audio'],
[4,'по видеозаписям', '', 'video'],
[5,'по объявлениям', '', 'ads'],
[6,'по приложениям', '', 'apps'],
[7,'по вопросам', '', 'questions'],
[8,'по заметкам', '', 'notes'],
[9,'по темам', '', 'topics']];

function langAndFriends(count) {
 return " и еще "+count+" дру"+friendsFlex(count);
}

function friendsFlex(count) {
 count %= 100;
 if (count > 4 && count < 21) {
  return "зей";
 }
 count %= 10;
 switch (count) {
  case 1: return 'г'; break;
  case 2:
  case 3:
  case 4: return 'га'; break;
  default: return 'зей';
 }
}