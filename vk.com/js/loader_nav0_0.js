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
    'privacy$': ['al_help.php', ['help.css', 'help.js']],
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
    'fonts_cnt.css': 2889730895,
    'common.js': 1161,
    'common.css': 29299729316,
    'cmodules/web/common_web.js': 1,
    'retina.css': 2633262011,
    'uncommon.js': 1640247993,
    'uncommon.css': 12548440442,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 145463682,
    'lite.css': 38266341570,
    'rtl.css': 12873836295,
    'pagination.js': 1027022568,
    'blog.css': 14640526034,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'audioplayer.js': 6135304862,
    'audioplayer.css': 15839312961,
    'audio_html5.js': 287741914,
    'audio.js': 327489109,
    'audio.css': 23402929982,
    'gifts.css': 17776270652,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 15663833287,
    'boxes.css': 14061319219,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 2760545978,
    'tooltips.css': 17658740520,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'cmodules/web/photos_module.js': 12160308159,
    'photo_tagger_mode.js': 2604367346,
    'photoview.js': 533491074,
    'photoview.css': 29728307905,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 13479060179,
    'spe.js': 2562549032,
    'friends.js': 140439177,
    'friends.css': 16392995457,
    'friends_search.js': 3438694410,
    'friends_search.css': 1694758778,
    'board.js': 3924396132,
    'board.css': 21713662287,
    'photos.css': 23980886883,
    'photos.js': 152064977,
    'photos_add.css': 25443584560,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 3330037574,
    'wkview.css': 23858726812,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 389419219,
    'video.css': 22173770299,
    'videocat.js': 3520065324,
    'videocat.css': 23054336459,
    'videoview.js': 14756656239,
    'videoview.css': 24167767933,
    'video_edit.js': 2135196486,
    'video_edit.css': 23531884914,
    'video_upload.js': 3535577292,
    'video_youtube.js': 458412745,
    'video_youtube.css': 11773179773,
    'videoplayer.js': 89267975640,
    'videoplayer.css': 42892225569,
    'translation.js': 2635875905,
    'translation.css': 15783225610,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 15655906236,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 12532212953,
    'index.js': 356147149,
    'join.css': 14712750631,
    'join.js': 4281861549,
    'intro.css': 18838456936,
    'post.css': 17213410959,
    'module.css': 16694736883,
    'owner_photo.js': 3401070266,
    'owner_photo.css': 17785632232,
    'page.js': 1023013437,
    'page.css': 26681319176,
    'page_help.css': 20523035996,
    'public.css': 25880515705,
    'public.js': 1344775948,
    'pages.css': 20970574408,
    'pages.js': 1162259210,
    'groups.css': 25798745045,
    'groups.js': 2855040531,
    'groups_list.js': 3507753248,
    'groups_edit.css': 31634446302,
    'groups_edit.js': 1633960107,
    'profile.css': 19149274226,
    'profile.js': 610604261,
    'calendar.css': 17045650424,
    'calendar.js': 4203451993,
    'wk.css': 19093566753,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 3191664136,
    'tagger.css': 16880706411,
    'qsearch.js': 4098038985,
    'wall.css': 23001149544,
    'wall.js': 2566474011,
    'walledit.js': 3354405371,
    'thumbs_edit.css': 15963176500,
    'thumbs_edit.js': 1864853921,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 118335606226,
    'imn.js': 154666740240,
    'im.js': 1322065005,
    'emoji.js': 2024669263,
    'wide_dd.css': 14882535544,
    'wide_dd.js': 452755344,
    'writebox.css': 15309134519,
    'writebox.js': 12260772539,
    'sharebox.js': 3977597905,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 3768614057,
    'feed.css': 20205192742,
    'privacy.js': 3620108221,
    'privacy.css': 12556350895,
    'apps.css': 33162269105,
    'apps.js': 2168906660,
    'apps_edit.js': 1119189232,
    'apps_edit.css': 29529642640,
    'apps_check.js': 3844411974,
    'apps_check.css': 25032349302,
    'settings.js': 1980295408,
    'settings.css': 20685021599,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 14191834963,
    'profile_edit_edu.js': 174903945,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 695974096,
    'search.css': 26761143536,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1049909811,
    'datepicker.js': 4265860601,
    'datepicker.css': 17301036119,
    'oauth_popup.css': 26258928235,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 20857318183,
    'fave.js': 1424071809,
    'fave.css': 18671281118,
    'widget_comments.css': 27358305946,
    'widget_auth.css': 26535629957,
    'widget_community.css': 28694215705,
    'widget_contactus.css': 31332741577,
    'widget_post.css': 26344606153,
    'widget_allow_messages_from_community.css': 29652082803,
    'api/widgets/al_auth.js': 3307446686,
    'api/widgets/al_poll.js': 790017760,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 39893216,
    'api/widgets/al_like.js': 2029025800,
    'api/widgets/al_post.js': 3723713031,
    'cmodules/api/widgets/comments.js': 59563448,
    'cmodules/api/widgets/community.js': 1148125808,
    'cmodules/api/widgets/allow_messages_from_community.js': 426372466,
    'cmodules/api/widgets/app.js': 3772085269,
    'api/widgets/al_add_community_app.js': 552092634,
    'widget_add_community_app.css': 27785628891,
    'api/widgets/community_messages.js': 909574838,
    'widget_community_messages.css': 27415196962,
    'al_poll.css': 3,
    'widget_recommended.css': 26515782920,
    'widgets.css': 29037036874,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 34522545665,
    'notifier.css': 20750675573,
    'cmodules/sw/sw.js': 4303672181,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 118430100,
    'restore.css': 17946637627,
    'docs.js': 995211544,
    'docs.css': 21483761164,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 14185143922,
    'internal/tasks.js': 3155934960,
    'internal/tasks.css': 12380949060,
    'helpdesk.js': 845624364,
    'helpdesk.css': 19151067507,
    'tickets.js': 2432513104,
    'tickets.css': 18276508764,
    'internal/faq.js': 4100753843,
    'faq.css': 18165588108,
    'talmud.js': 1641838680,
    'agents.js': 2426697933,
    'agents.css': 14368033339,
    'achievements.js': 897703126,
    'achievements.css': 12898562589,
    'sf.css': 14957537504,
    'members.css': 14107796613,
    'meminfo.css': 16793778979,
    'groupinfo.css': 16972553358,
    'bugs.js': 3874995669,
    'bugs.css': 12154823937,
    'bugtracker.js': 1251503767,
    'bugtracker.css': 21271850840,
    'login.css': 14352446708,
    'login.js': 3347113160,
    'upload.js': 16891470,
    'upload_photo_transform.js': 1497838791,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 17666568738,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 11617478701,
    'away.css': 16402205359,
    'stats.css': 14362550176,
    'payments.css': 18213011166,
    'payments.js': 663584179,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 22128084780,
    'aes_light.js': 592436914,
    'ads.css': 22547315749,
    'ads_bonus.css': 460482192,
    'ads.js': 2039077661,
    'ads_payments.js': 2205910694,
    'ads_edit.css': 11673585738,
    'ads_edit.js': 1911656733,
    'ads_edit_geo.js': 519167575,
    'ads_moder_common.css': 12680880469,
    'ads_moder.css': 12259079039,
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
    'claims.css': 13479411309,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 15714353275,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 12172753170,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 21378645071,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 12073406913,
    'dev.js': 2143073519,
    'dev.css': 30983385244,
    'share.css': 28181606101,
    'stickers_office.css': 14262260172,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 13771352834,
    'print.js': 1255624803,
    'print.css': 14109154200,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 13099838918,
    'ui.js': 3953380422,
    'ui_common.js': 1723304663,
    'ui_common.css': 11762779983,
    'ui_media_selector.js': 2715341584,
    'ui_media_selector.css': 18515223829,
    'ui_manual.css': 13351410795,
    'admin.js': 2866808704,
    'admin.css': 16113614469,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 17888008270,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 14138116985,
    'exchange.css': 14258756606,
    'exchange.js': 3247888614,
    'exchange_moder.css': 13825327878,
    'exchange_moder.js': 1937742752,
    'ads_offers.css': 14734681637,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 17061367192,
    'landings/vk10_years.css': 13415273312,
    'chronicle.css': 13616131651,
    'market.css': 23209528793,
    'market.js': 1427771939,
    'stories_admin.css': 15478584388,
    'stories_admin.js': 1129028316,
    'vk2016.css': 2369321949,
    'landings/common.css': 18742091797,
    'landings/community_message.css': 12878846803,
    'landings/wdsd.css': 17001467608,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 12051559675,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 16151140693,
    'landings/psb.css': 20617369546,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 22922282572,
    'landings/moneysend.css': 15528706028,
    'landings/desktop_messenger.css': 13949699900,
    'landings/vklive.css': 12413839180,
    'landings/vk2017.css': 13491293333,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/vkvalentine.css': 3589450557,
    'landings/vkvalentine.js': 2683872383,
    'landings/ads.css': 15767321655,
    'landing_aes.js': 14740012721,
    'landings/donors_day.css': 15742072988,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 13728684839,
    'vkme.css': 16074918562,
    'cmodules/web/vkme-desktop.js': 2495416607,
    'ui_controls.js': 2872214892,
    'highcharts.js': 1982709850,
    'ui_controls.css': 15124418919,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 19221509562,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1750088857,
    'paginated_table.css': 14115792976,
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
    'snapster/style.css': 15306270147,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 699865637,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 16748398100,
    'snapster/mob_templates.js': 800413458,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 16729579517,
    'snapster/templates.js': 1084088730,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 16707002986,
    'top_logo.css': 12798317764,
    'favicon': 6,
    'speech.js': 33245099929,
    'voice_message_player.js': 18578298340,
    'cmodules/web/speech_worker_mp3.js': 1074082218,
    'cmodules/web/speech_worker_opus.js': 2818771805,
    'stories.js': 22684661752,
    'stories.css': 16202468584,
    'internal/nospam.css': 14696828806,
    'internal/away_linksban.css': 12067978740,
    'internal/ui_manual.js': 1761369792,
    'internal/patterns_info.css': 14249041637,
    'article.css': 33830282836,
    'article_editor.css': 29924782738,
    'cmodules/web/article.js': 26542609216,
    'cmodules/web/article_layer.js': 18099891163,
    'article_view.js': 15460535628,
    'internal/cvkmobile.css': 13815388837,
    'internal/cvkmobile.js': 3588813277,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 2072913343,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'cmodules/web/page_layout.js': 1172409392,
    'landings/ads_cases.css': 23776392103,
    'surveys.css': 22483024548,
    'surveys.js': 3079369917,
    'landings/author_guide.css': 19777125414,
    'internal/restore2.css': 11535860504,
    'internal/restore2.js': 3884948169,
    'language.js': 3551638980,
    'language.css': 14566276818,
    'internal/admins.js': 2810460581,
    'internal/admins.css': 13535557468,
    'cmodules/web/stickers.js': 9004259662,
    'cmodules/web/stickers_office.js': 9052615706,
    'cmodules/web/bodymovin.js': 1520167629,
    'lang': 6877
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
var _rnd = 7530;