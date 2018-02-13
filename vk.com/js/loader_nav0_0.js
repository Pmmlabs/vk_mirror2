var navMap = {
    '<void>': ['al_index.php', ['index.css', 'index.js']],
    '<other>': ['al_profile.php', ['profile.css', 'page.css', 'profile.js', 'page.js']],
    'public\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'event\\d+($|/)': ['al_events.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'club\\d+($|/)': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'publics\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'groups(\\d+)?$': ['al_groups.php', ['groups.css', 'groups_list.js', 'indexer.js']],
    'events$': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'changemail$': ['al_login.php', ['reg.css']],
    'mail($|/)': ['al_mail.php', ['im.css', 'imn.js']],
    'write[-]?\\d*($|/)': ['al_mail.php', ['im.css', 'imn.js']],
    'im($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'gim\\d+($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'audio-?\\d+_\\d+$': ['al_audio.php', ['audio.css', 'audio.js']],
    'audios(-?\\d+)?$': ['al_audio.php', ['audio.css', 'audio.js']],
    'audio($|/)': ['al_audio.php', ['audio.css', 'audio.js']],
    'music$': ['al_audio.php', ['audio.css', 'audio.js']],
    'apps_check($|/)': ['al_apps_check.php', ['apps.css', 'apps.js']],
    'apps($|/)': ['al_apps.php', ['apps.css', 'apps.js']],
    'community_apps($|/)': ['al_apps.php', ['community_apps.css', 'community_apps.js']],
    'editapp($|/)': ['al_apps_edit.php', ['apps.css', 'apps.js']],
    'regstep\\d$': ['register.php', ['reg.js', 'reg.css', 'ui_controls.js', 'ui_controls.css', 'selects.js']],
    'video(-?\\d+_\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'videoview.js', 'videoview.css', 'indexer.js']],
    'videos(-?\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'indexer.js']],
    'feed$': ['al_feed.php', ['page.css', 'page.js', 'feed.css', 'feed.js']],
    'friends$': ['al_friends.php', ['friends.js', 'friends.css', 'privacy.css']],
    'wall-?\\d+(_\\d+)?$': ['al_wall.php', ['page.js', 'page.css', 'wall.js', 'wall.css']],
    'tag\\d+$': ['al_photos.php', ['photos.js', 'photoview.js', 'photos.css', 'photoview.css']],
    'albums(-?\\d+)?$': ['al_photos.php', ['photos.js', 'photos.css']],
    'photos(-?\\d+)?$': ['al_photos.php', ['photos.js', 'photos.css']],
    'album-?\\d+_\\d+$': ['al_photos.php', ['photos.js', 'photos.css']],
    'photo-?\\d+_\\d+$': ['al_photos.php', ['photos.js', 'photos.css', 'photoview.js', 'photoview.css']],
    'search$': ['al_search.php', ['search.css', 'search.js']],
    'people($|/)': ['al_search.php', ['search.css', 'search.js']],
    'communities$': ['al_search.php', ['search.css', 'search.js']],
    'brands$': ['al_search.php', ['search.css', 'search.js']],
    'invite$': ['invite.php', ['invite.css', 'invite.js', 'ui_controls.css', 'ui_controls.js']],
    'join$': ['join.php', ['join.css', 'join.js']],
    'settings$': ['al_settings.php', ['settings.js', 'settings.css']],
    'edit$': ['al_profileEdit.php', ['profile_edit.js', 'profile_edit.css']],
    'blog($|/)': ['blog.php', ['blog.css', 'blog.js', 'page.js']],
    'fave$': ['al_fave.php', ['fave.js', 'fave.css', 'page.css', 'wall.css', 'qsorter.js', 'indexer.js']],
    'topic$': ['al_board.php', ['board.css']],
    'board\\d+$': ['al_board.php', ['board.css', 'board.js']],
    'topic-?\\d+_\\d+$': ['al_board.php', ['board.css', 'board.js']],
    'stats($|/)': ['al_stats.php', ['stats.css']],
    'ru/(.*)?$': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'pages($|/)': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'page-?\\d+_\\d+$': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'restore($|/)': ['al_restore.php', ['restore.js', 'restore.css']],
    'restoreinfo($|/)': ['al_restore.php', ['restore.js', 'restore.css']],
    'gifts\\d*$': ['al_gifts.php', ['gifts.js', 'gifts.css']],
    'docs($|/)': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'doc-?\\d+_\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'docs-?\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'login($|/)': ['al_login.php', ['login.css', 'login.js']],
    'tasks($|/)': ['tasks.php', ['internal/tasks.css', 'internal/tasks.js']],
    'abuse($|/)': ['abuse.php', ['abuse.css', 'abuse.js']],
    'abuse2($|/)': ['abuse2.php', []],
    'restore2($|/)': ['restore2.php', ['internal/restore2.css', 'internal/restore2.js', 'internal/restore2_autoanswers.js', 'sorter.js']],
    'datababes($|/)': ['datababes.php', []],
    '(support($|/)|faq\\d+)': ['al_tickets.php', ['tickets.css', 'tickets.js']],
    'helpdesk($|/)': ['al_helpdesk.php', ['tickets.css', 'tickets.js']],
    'offersdesk($|/)': ['offers.php', ['offers.css', 'offers.js']],
    'payments($|/)': ['al_payments.php', ['payments.css']],
    'faq($|/)': ['al_faq.php', ['faq.css', 'internal/faq.js']],
    'tlmd($|\\d+|/)': ['al_talmud.php', ['talmud.js']],
    'sms_office($|/)': ['sms_office.php', ['sms_office.css', 'sms_office.js']],
    'dev($|/)': ['dev.php', ['dev.css', 'dev.js']],
    'developers($|/)': ['al_developers.php', ['developers.css']],
    'help($|/)': ['al_help.php', ['help.css', 'help.js']],
    'claims($|/)': ['al_claims.php', ['claims.css', 'claims.js']],
    'video_embed($|/)': ['al_video_embed.php', ['video_embed.css', 'video_embed.js']],
    'ads$': ['ads.php', ['ads.css', 'ads.js']],
    'adbonus$': ['ads.php', ['ads.css', 'ads.js']],
    'adsbonus$': ['ads.php', ['ads.css', 'ads.js']],
    'adregister$': ['ads.php', ['ads.css', 'ads.js']],
    'adsedit$': ['ads_edit.php', ['ads.css', 'ads.js', 'ads_edit.css', 'ads_edit.js']],
    'adscreate$': ['ads_edit.php', ['ads.css', 'ads.js', 'ads_edit.css', 'ads_edit.js']],
    'adsmoder$': ['ads_moder.php', ['ads.css', 'ads.js', 'ads_moder_common.css', 'ads_moder.css', 'ads_moder_common.js', 'ads_moder.js']],
    'adsweb$': ['ads_web.php', ['ads.css', 'ads.js', 'ads_web.css', 'ads_web.js']],
    'ads/([a-zA-Z0-9\\_]+)$': ['ads.php', ['ads.css', 'ads.js', 'landings/ads.css', 'landings/landings.css', 'landing_aes.js']],
    'exchange$': ['ads_posts.php', ['ads.css', 'ads.js', 'exchange.css', 'exchange.js']],
    'exchangemoder$': ['ads_posts_moder.php', ['ads.css', 'ads.js', 'ads_moder_common.css', 'exchange_moder.css', 'ads_moder_common.js', 'exchange_moder.js']],
    'adsmarket$': ['ads_posts.php', ['ads.css', 'ads.js', 'exchange.css', 'exchange.js']],
    'offers$': ['ads_offers.php', ['ads.css', 'ads.js', 'ads_offers.css', 'ads_offers.js']],
    'offersmoder$': ['ads_offers_moder.php', ['ads.css', 'ads.js', 'ads_offers_moder.css', 'ads_offers_moder.js']],
    'test$': ['al_help.php', ['help.css', 'help.js']],
    'agenttest$': ['al_help.php', ['help.css', 'help.js']],
    'grouptest$': ['al_help.php', ['help.css', 'help.js']],
    'dmca$': ['al_tickets.php', ['tickets.css', 'tickets.js']],
    'terms$': ['al_help.php', ['help.css', 'help.js']],
    'privacy($|/)': ['al_help.php', ['help.css', 'help.js']],
    'licence$': ['al_help.php', ['help.css', 'help.js']],
    'editdb($|/)': ['edit.php', []],
    'note\\d+_\\d+$': ['al_wall.php', ['wall.js', 'wall.css', 'wk.js', 'wk.css', 'pagination.js']],
    'notes(\\d+)?$': ['al_wall.php', ['wall.js', 'wall.css', 'wk.js', 'wk.css', 'pagination.js']],
    'bugs($|/)': ['bugs.php', ['bugs.css', 'bugs.js']],
    'wkview.php($)': ['wkview.php', ['wkview.js', 'wkview.css', 'wk.js', 'wk.css']],
    'charts($|/)': ['al_audio.php', ['audio.css', 'audio.js']],
    'maps($|/)': ['maps.php', []],
    'jobs$': ['al_jobs.php', ['jobs.css', 'jobs.js', 'blog.css', 'blog.js']],
    'about$': ['blog.php', ['blog.css', 'blog.js']],
    'products$': ['blog.php', ['blog.css', 'blog.js']],
    'ui$': ['ui.php', []],
    'translation($|/)': ['al_translations.php', []],
    'mobile$': ['al_login.php', []],
    'stickers($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'stickers_office($|/)': ['stickers.php', ['stickers_office.css']],
    'print$': ['al_print.php', ['print.css', 'print.js']],
    'pattern(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'link(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'autoreg(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'statlogs($|/)': ['statlogs_view.php', ['statlogs.css']],
    'market(-?\\d+)?(_\\d+)?$': ['al_market.php', ['market.css', 'market.js']],
    'stories(-?\\d+)?(_\\d+)?$': ['al_stories.php', ['stories.css', 'stories.js']],
    'story(-?\\d+)_(\\d+)$': ['al_stories.php', ['stories.css', 'stories.js']],
    'mask(-?\\d+)_(\\d+)$': ['al_masks.php', []],
    'bugtracker($|/)': ['al_bugtracker.php', ['bugtracker.css', 'bugtracker.js']],
    'bugtracker_adm($|/)': ['al_bugtracker_adm.php', ['bugtracker.css', 'bugtracker.js']],
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']],
    'cvkmobile($|/)': ['cvkmobile.php', ['internal/cvkmobile.css', 'internal/cvkmobile.js']],
    'surveys(-[0-9]+)$': ['al_surveys.php', ['surveys.css']],
    'survey(-[0-9]+)_([0-9]+)$': ['al_surveys.php', ['surveys.css', 'surveys.js']],
    'imnumberx$': ['imnumberx.php', ['imnumberx.css']],
    'push_notifier': ['al_pushNotifier.php', []]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 5181750877,
    'common.js': 1161,
    'common.css': 32352845315,
    'cmodules/web/common_web.js': 1,
    'retina.css': 2633262011,
    'uncommon.js': 1640247993,
    'uncommon.css': 13497825330,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 444515822,
    'lite.css': 42008481613,
    'rtl.css': 13823221183,
    'pagination.js': 1027022568,
    'blog.css': 15589910922,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'audioplayer.js': 6899828691,
    'audioplayer.css': 16788697849,
    'audio_html5.js': 287741914,
    'audio.js': 3202340255,
    'audio.css': 24352314870,
    'gifts.css': 18725655540,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 16613218175,
    'boxes.css': 15010704107,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 2760545978,
    'tooltips.css': 18608125408,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'cmodules/web/photos_module.js': 9685953879,
    'photo_tagger_mode.js': 2604367346,
    'photoview.js': 1772679052,
    'photoview.css': 28052527258,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 14428445067,
    'spe.js': 2562549032,
    'friends.js': 140439177,
    'friends.css': 17342380345,
    'friends_search.js': 3438694410,
    'friends_search.css': 1694758778,
    'board.js': 3844907940,
    'board.css': 22663047175,
    'photos.css': 24449198550,
    'photos.js': 3337807894,
    'photos_add.css': 26392969448,
    'photos_add.js': 1811822476,
    'wkpoll.js': 534542755,
    'wkview.js': 3330037574,
    'wkview.css': 24808111700,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 1924568890,
    'video.css': 23123155187,
    'videocat.js': 3590298689,
    'videocat.css': 24786598174,
    'videoview.js': 18921333807,
    'videoview.css': 25117152821,
    'video_edit.js': 2135196486,
    'video_edit.css': 24481269802,
    'video_upload.js': 4152194215,
    'video_youtube.js': 458412745,
    'video_youtube.css': 12722564661,
    'videoplayer.js': 88389157502,
    'videoplayer.css': 40350721662,
    'translation.js': 2188856658,
    'translation.css': 14979151248,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 16605291124,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 13481597841,
    'index.js': 356147149,
    'join.css': 15662135519,
    'join.js': 4281861549,
    'intro.css': 19787841824,
    'post.css': 18162795847,
    'module.css': 17644121771,
    'owner_photo.js': 3401070266,
    'owner_photo.css': 18735017120,
    'page.js': 2258994750,
    'page.css': 30102337239,
    'page_help.css': 21472420884,
    'public.css': 26829900593,
    'public.js': 1344775948,
    'pages.css': 21919959296,
    'pages.js': 1162259210,
    'groups.css': 26748129933,
    'groups.js': 2855040531,
    'groups_list.js': 3507753248,
    'groups_edit.css': 32583831190,
    'groups_edit.js': 1633960107,
    'profile.css': 17947274799,
    'profile.js': 610604261,
    'calendar.css': 17995035312,
    'calendar.js': 4203451993,
    'wk.css': 20042951641,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 3191664136,
    'tagger.css': 17830091299,
    'qsearch.js': 4098038985,
    'wall.css': 23950534432,
    'wall.js': 2566474011,
    'walledit.js': 2501406680,
    'thumbs_edit.css': 16912561388,
    'thumbs_edit.js': 1864853921,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 125765678466,
    'imn.js': 146860829019,
    'im.js': 1322065005,
    'emoji.js': 2024669263,
    'wide_dd.css': 15831920432,
    'wide_dd.js': 452755344,
    'writebox.css': 16258519407,
    'writebox.js': 15646370805,
    'sharebox.js': 3977597905,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 502072961,
    'feed.css': 18220221012,
    'privacy.js': 3620108221,
    'privacy.css': 13505735783,
    'apps.css': 34986539347,
    'apps.js': 2469485779,
    'apps_edit.js': 1119189232,
    'apps_edit.css': 31345001225,
    'apps_check.js': 3204387834,
    'apps_check.css': 26847707887,
    'settings.js': 2599392129,
    'settings.css': 23504473671,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 15141219851,
    'profile_edit_edu.js': 4232181712,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 4279649652,
    'search.css': 27710528424,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 1643414770,
    'suggester.js': 1049909811,
    'datepicker.js': 4265860601,
    'datepicker.css': 18250421007,
    'oauth_popup.css': 28074286820,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 21806703071,
    'fave.js': 647565245,
    'fave.css': 19620666006,
    'widget_comments.css': 29173664531,
    'widget_auth.css': 28350988542,
    'widget_community.css': 30626707364,
    'widget_contactus.css': 33148100162,
    'widget_post.css': 28159964738,
    'widget_allow_messages_from_community.css': 31467441388,
    'api/widgets/al_poll.js': 790017760,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 39893216,
    'api/widgets/al_like.js': 2029025800,
    'api/widgets/al_post.js': 3723713031,
    'cmodules/api/widgets/comments.js': 1963238163,
    'cmodules/api/widgets/community.js': 3178546499,
    'cmodules/api/widgets/allow_messages_from_community.js': 618639651,
    'cmodules/api/widgets/app.js': 721361909,
    'cmodules/api/widgets/auth.js': 3237508470,
    'api/widgets/al_add_community_app.js': 552092634,
    'widget_add_community_app.css': 29600987476,
    'api/widgets/community_messages.js': 909574838,
    'widget_community_messages.css': 32496039648,
    'al_poll.css': 3,
    'widget_recommended.css': 28331141505,
    'widgets.css': 30852395459,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 31685975710,
    'notifier.css': 21700060461,
    'cmodules/sw/sw.js': 5052744067,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 2437991284,
    'restore.css': 18896022515,
    'docs.js': 995211544,
    'docs.css': 22433146052,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 15134528810,
    'internal/tasks.js': 3155934960,
    'internal/tasks.css': 13330333948,
    'helpdesk.js': 845624364,
    'helpdesk.css': 20100452395,
    'tickets.js': 2459380201,
    'tickets.css': 19225893652,
    'internal/faq.js': 4100753843,
    'faq.css': 19114972996,
    'talmud.js': 1641838680,
    'agents.js': 2426697933,
    'agents.css': 15317418227,
    'achievements.js': 897703126,
    'achievements.css': 13847947477,
    'sf.css': 18152779814,
    'members.css': 15057181501,
    'meminfo.css': 21005025340,
    'groupinfo.css': 20125531313,
    'bugs.js': 3874995669,
    'bugs.css': 13104208825,
    'bugtracker.js': 784471299,
    'bugtracker.css': 23248434104,
    'login.css': 15301831596,
    'login.js': 56821690,
    'upload.js': 16891470,
    'upload_photo_transform.js': 1497838791,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 18615953626,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 12566863589,
    'away.css': 17948746662,
    'stats.css': 15311935064,
    'payments.css': 27002675675,
    'payments.js': 1966729738,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 23943443365,
    'aes_light.js': 1378715905,
    'ads.css': 23496700637,
    'ads_bonus.css': 1294533291,
    'ads.js': 2039077661,
    'ads_payments.js': 2205910694,
    'ads_edit.css': 12622970626,
    'ads_edit.js': 4001967956,
    'ads_edit_geo.js': 519167575,
    'ads_moder_common.css': 13630265357,
    'ads_moder.css': 13208463927,
    'ads_moder_common.js': 3875868763,
    'ads_moder.js': 190658095,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 4274163593,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'cmodules/web/ads_edit_easy.js': 741551452,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 1728588285,
    'sms_office.js': 333673010,
    'help.css': 2602432866,
    'help.js': 915032948,
    'claims.css': 14428796197,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 16663738163,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 13122138058,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 22328029959,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 13022791801,
    'dev.js': 2143073519,
    'dev.css': 32798743829,
    'share.css': 29996964686,
    'stickers_office.css': 15211645060,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 14720737722,
    'print.js': 1255624803,
    'print.css': 15058539088,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 14049223806,
    'ui.js': 3953380422,
    'ui_common.js': 1723304663,
    'ui_common.css': 15999158888,
    'ui_media_selector.js': 512684515,
    'ui_media_selector.css': 18387598297,
    'ui_manual.css': 14300795683,
    'admin.js': 2866808704,
    'admin.css': 17062999357,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 18837393158,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 15087501873,
    'exchange.css': 15208141494,
    'exchange.js': 3247888614,
    'exchange_moder.css': 14774712766,
    'exchange_moder.js': 1937742752,
    'ads_offers.css': 15684066525,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 18010752080,
    'landings/vk10_years.css': 14364658200,
    'chronicle.css': 15108849139,
    'market.css': 24158913681,
    'market.js': 3445680238,
    'stories_admin.css': 16427969276,
    'stories_admin.js': 1129028316,
    'vk2016.css': 2021229875,
    'landings/common.css': 18378665015,
    'landings/community_message.css': 13828231691,
    'landings/wdsd.css': 14207232316,
    'landings/smartfeed.css': 926801211,
    'landings/dota.css': 13000944563,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 17100525581,
    'landings/psb.css': 21566754434,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 24713594919,
    'landings/moneysend.css': 13895395564,
    'landings/moneysend.js': 2406210925,
    'landings/desktop_messenger.css': 14899084788,
    'landings/vklive.css': 15665220095,
    'landings/vk2017.css': 14440678221,
    'landings/vkmusic.css': 2781063990,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/vkvalentine.css': 3589450557,
    'landings/vkvalentine.js': 2683872383,
    'landings/ads.css': 16609387329,
    'landing_aes.js': 14694813984,
    'landings/donors_day.css': 16691457876,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 14678069727,
    'vkme.css': 14853567128,
    'cmodules/web/vkme-desktop.js': 2495416607,
    'ui_controls.js': 2872214892,
    'highcharts.js': 1982709850,
    'ui_controls.css': 16073803807,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 20170894450,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1750088857,
    'paginated_table.css': 15065177864,
    'api/share.js': 2621084197,
    'api/openapi.js': 1152752934,
    'api/xdm.js': 1449919642,
    'hls.min.js': 1200179027,
    'candy.min.js': 1892723665,
    'q_frame.php': 7,
    '/swf/api_wrapper.swf': 7,
    '/swf/api_external.swf': 8,
    '/swf/api_wrapper2_0.swf': 8,
    '/swf/video_lite.swf': 2,
    '/swf/audio_lite.swf': 13,
    '/swf/uploader_lite.swf': 13,
    '/swf/photo_uploader_lite.swf': 17,
    '/swf/CaptureImg.swf': 12,
    '/swf/video.swf': 157,
    '/swf/vkvideochat.swf': 50,
    '/swf/vchatdevices.swf': 1,
    'snapster/style.css': 19227008335,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 699865637,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 20469266408,
    'snapster/mob_templates.js': 616353024,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 17678964405,
    'snapster/templates.js': 417248447,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 17656387874,
    'top_logo.css': 13747702652,
    'favicon': 6,
    'speech.js': 33245099929,
    'voice_message_player.js': 18578298340,
    'cmodules/web/speech_worker_mp3.js': 1074082218,
    'cmodules/web/speech_worker_opus.js': 2818771805,
    'stories.js': 21139067659,
    'stories.css': 14805220846,
    'internal/nospam.css': 15646213694,
    'internal/away_linksban.css': 13017363628,
    'internal/ui_manual.js': 1761369792,
    'internal/patterns_info.css': 15924692635,
    'article.css': 31447080238,
    'article_editor.css': 28696638095,
    'cmodules/web/article.js': 35551730467,
    'cmodules/web/article_layer.js': 20958808571,
    'article_view.js': 18319453036,
    'internal/cvkmobile.css': 14764773725,
    'internal/cvkmobile.js': 3588813277,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 124004037,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'cmodules/web/page_layout.js': 1172409392,
    'landings/ads_cases.css': 24725776991,
    'surveys.css': 22232569722,
    'surveys.js': 3079369917,
    'landings/author_guide.css': 20726510302,
    'internal/restore2.css': 13883323067,
    'internal/restore2.js': 323808116,
    'language.js': 3551638980,
    'language.css': 15515661706,
    'internal/admins.js': 2810460581,
    'internal/admins.css': 14484942356,
    'cmodules/web/stickers.js': 9004259662,
    'cmodules/web/stickers_office.js': 9963462147,
    'cmodules/web/bodymovin.js': 1520167629,
    'lead_forms_app.js': 17346700711,
    'lead_forms_app.css': 18430198570,
    'lang': 6879
};
var stTypes = {
    fromLib: {
        'md5.js': 1,
        'clipboard.js': 1,
        'ui_controls.js': 1,
        'highcharts.js': 1,
        'selects.js': 1,
        'maps.js': 1,
        'hls.min.js': 1,
        'candy.min.js': 1
    },
    fromRoot: {
        'api/share.js': 1,
        'api/openapi.js': 1,
        'api/xdm.js': 1,
        'apps_flash.js': 1,
        'mentions.js': 1,
        'map2.js': 1,
        'ui_controls.css': 1,
        'map.css': 1,
        'paginated_table.js': 1,
        'paginated_table.css': 1,
        'snapster/common.js': 1,
        'snapster/style.css': 1,
        'snapster/page.js': 1,
        'snapster/mobile.css': 1,
        'snapster/main.js': 1,
        'mobile/common.js': 1,
        'mobile/oauth.js': 1,
        'mobile/snapster.js': 1,
        'mobile/adaptive_table.css': 1,
        'mobile/base_head.css': 1,
        'mobile/base_screen.css': 1,
        'mobile/common.css': 1,
        'mobile/common_2x.css': 1,
        'mobile/full_browser.css': 1,
        'mobile/gallery.css': 1,
        'mobile/ios_device.css': 1,
        'mobile/medium_head.css': 1,
        'mobile/medium_screen.css': 1,
        'mobile/oauth_android.css': 1,
        'mobile/oauth_ios.css': 1,
        'mobile/oauth_winmobile.css': 1,
        'mobile/small_screen.css': 1,
        'mobile/snapster.css': 1,
        'mobile/wiki.css': 1
    },
    fromCompiled: {
        'imn.js': 1,
        'audioplayer.js': 1,
        'notifier.js': 1,
        'writebox.js': 1,
        'landing_aes.js': 1,
        'speech.js': 1,
        'voice_message_player.js': 1,
        'videoplayer.js': 1,
        'videoview.js': 1,
        'landing_donors_day.js': 1,
        'lead_forms_app.js': 1,
        'stories.js': 1,
        'grid_sorter2.js': 1,
        'mr_truth.js': 1,
        'article_view.js': 1,
        'rich_dropdown.js': 1,
        'lazyload.js': 1,
        'ny2018.js': 1
    }
};
var _rnd = 6077;