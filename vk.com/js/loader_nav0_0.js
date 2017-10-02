var navMap = {
    '<void>': ['al_index.php', ['index.css', 'index.js']],
    '<other>': ['al_profile.php', ['profile.css', 'page.css', 'profile.js', 'page.js']],
    'public\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'event\\d+($|/)': ['al_events.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'club\\d+($|/)': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'publics\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'groups(\\d+)?$': ['al_groups.php', ['groups.css', 'groups_list.js', 'indexer.js']],
    'events$': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'changemail$': ['register.php', ['reg.css']],
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
    'recover($|/)': ['recover.php', ['recover.js', 'recover.css']],
    'gifts\\d*$': ['al_gifts.php', ['gifts.js', 'gifts.css']],
    'docs($|/)': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'doc-?\\d+_\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'docs-?\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'login($|/)': ['al_login.php', ['login.css', 'login.js']],
    'tasks($|/)': ['tasks.php', ['tasks.css', 'tasks.js']],
    'abuse($|/)': ['abuse.php', ['abuse.css', 'abuse.js']],
    'abuse2($|/)': ['abuse2.php', []],
    'restore2($|/)': ['restore2.php', ['dyn-restore2.css', 'dyn-restore2.js', 'dyn-restore2_aa.js', 'sorter.js']],
    'datababes($|/)': ['datababes.php', []],
    '(support($|/)|faq\\d+)': ['al_tickets.php', ['tickets.css', 'tickets.js']],
    'helpdesk($|/)': ['al_helpdesk.php', ['tickets.css', 'tickets.js']],
    'offersdesk($|/)': ['offers.php', ['offers.css', 'offers.js']],
    'payments($|/)': ['al_payments.php', ['payments.css']],
    'faq($|/)': ['al_faq.php', ['faq.css', 'faq.js']],
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
    'stickers_office($|/)': ['stickers_office.php', ['stickers_office.css', 'stickers_office.js']],
    'charts($|/)': ['al_audio.php', ['audio.css', 'audio.js']],
    'maps($|/)': ['maps.php', []],
    'jobs$': ['al_jobs.php', ['jobs.css', 'jobs.js', 'blog.css', 'blog.js']],
    'about$': ['blog.php', ['blog.css', 'blog.js']],
    'products$': ['blog.php', ['blog.css', 'blog.js']],
    'ui$': ['ui.php', []],
    'translation($|/)': ['al_translations.php', []],
    'mobile$': ['al_login.php', []],
    'stickers($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
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
    'survey(-[0-9]+)_([0-9]+)$': ['al_surveys.php', ['surveys.css', 'surveys.js']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1157,
    'common.css': 28099301520,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 17189624872,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 359619547,
    'lite.css': 40915311084,
    'rtl.css': 15074350639,
    'pagination.js': 1027022568,
    'blog.css': 15553581642,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 16727451730,
    'audioplayer.js': 5064231095,
    'audioplayer.css': 18039827305,
    'audio_html5.js': 287741914,
    'audio.js': 3846430147,
    'audio.css': 23958603838,
    'gifts.css': 18922179082,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 17864347631,
    'boxes.css': 16261833563,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 4232536498,
    'tooltips.css': 17886604657,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 15512994320,
    'photoview.js': 4178906126,
    'photoview.css': 17807263720,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 15679574523,
    'spe.js': 3760998372,
    'friends.js': 140439177,
    'friends.css': 16931574416,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 3924396132,
    'board.css': 20530150687,
    'photos.css': 19069071526,
    'photos.js': 152064977,
    'photos_add.css': 20891240787,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2949321433,
    'wkview.css': 19977978664,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 187248878,
    'video.css': 20628285418,
    'videocat.js': 1618923991,
    'videocat.css': 18501992686,
    'videoview.js': 4045169461,
    'videoview.css': 22499336675,
    'video_edit.js': 2135196486,
    'video_edit.css': 18979541141,
    'video_upload.js': 812506149,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 13973694117,
    'videoplayer.js': 77184446951,
    'videoplayer.css': 32366573911,
    'translation.js': 2431784533,
    'translation.css': 15024677007,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 17856420580,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 14732727297,
    'index.js': 3228561433,
    'join.css': 16913264975,
    'join.js': 4281861549,
    'intro.css': 17239120216,
    'post.css': 16480636471,
    'module.css': 20241410168,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 19986146576,
    'page.js': 2228870848,
    'page.css': 19208426623,
    'page_help.css': 20496377492,
    'public.css': 23107919047,
    'public.js': 3770119342,
    'pages.css': 19083818622,
    'pages.js': 1162259210,
    'groups.css': 25554132640,
    'groups.js': 2975645919,
    'groups_list.js': 3507753248,
    'groups_edit.css': 34782255112,
    'groups_edit.js': 4082532822,
    'profile.css': 21109818197,
    'profile.js': 642429379,
    'calendar.css': 19246164768,
    'calendar.js': 4203451993,
    'wk.css': 19066908249,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 19081220755,
    'qsearch.js': 4098038985,
    'wall.css': 23099691391,
    'wall.js': 1795168917,
    'walledit.js': 1522832013,
    'thumbs_edit.css': 14363839780,
    'thumbs_edit.js': 2241504624,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 106369176857,
    'imn.js': 120074205566,
    'im.js': 1322065005,
    'emoji.js': 478110222,
    'wide_dd.css': 17083049888,
    'wide_dd.js': 452755344,
    'writebox.css': 17162397575,
    'writebox.js': 4788293669,
    'sharebox.js': 2160209921,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 1524488239,
    'feed.css': 21769808938,
    'privacy.js': 3620108221,
    'privacy.css': 16922978141,
    'apps.css': 22627955064,
    'apps.js': 1400745086,
    'apps_edit.js': 2247867637,
    'apps_edit.css': 21687779224,
    'apps_check.js': 3844411974,
    'apps_check.css': 23293872878,
    'settings.js': 3514162990,
    'settings.css': 26157441638,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 16392349307,
    'profile_edit_edu.js': 174903945,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 2182721495,
    'search.css': 29433811101,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1049909811,
    'datepicker.js': 1574876075,
    'datepicker.css': 19626750814,
    'oauth_popup.css': 26952174548,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 20830659679,
    'fave.js': 128270649,
    'fave.css': 21835151181,
    'widget_comments.css': 28051552259,
    'widget_auth.css': 27228876270,
    'widget_community.css': 29387462018,
    'widget_contactus.css': 29507134048,
    'widget_post.css': 27471908323,
    'widget_allow_messages_from_community.css': 30345329116,
    'api/widgets/al_comments.js': 1407160207,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 493048488,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 2664555904,
    'api/widgets/al_post.js': 1353009905,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 27152817106,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 28412795069,
    'al_poll.css': 3,
    'widget_recommended.css': 27209029233,
    'widgets.css': 29730283187,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 36407260888,
    'notifier.css': 26966519794,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 3097641851,
    'restore.css': 15767003346,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 1484979496,
    'docs.css': 21457102660,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 16385658266,
    'tasks.js': 4285291205,
    'tasks.css': 16731140638,
    'helpdesk.js': 3278046146,
    'helpdesk.css': 20700462028,
    'tickets.js': 1883347153,
    'tickets.css': 22241520780,
    'faq.js': 2841473572,
    'faq.css': 19120517259,
    'talmud.js': 1641838680,
    'agents.js': 3714363511,
    'agents.css': 16391741569,
    'achievements.js': 897703126,
    'achievements.css': 15099076933,
    'sf.css': 17088647978,
    'members.css': 16308310957,
    'meminfo.css': 17384981066,
    'groupinfo.css': 19028323677,
    'bugs.js': 3874995669,
    'bugs.css': 14355338281,
    'bugtracker.js': 1213584201,
    'bugtracker.css': 24133386639,
    'login.css': 16582526468,
    'login.js': 3551917100,
    'upload.js': 645417492,
    'upload_photo_transform.js': 1228329948,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 17639910234,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 18602719703,
    'stats.css': 17419792876,
    'payments.css': 18872389240,
    'payments.js': 3849061612,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 25784982194,
    'aes_light.js': 3306454788,
    'ads.css': 19377876019,
    'ads_bonus.css': 460482192,
    'ads.js': 1803608766,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 15305852285,
    'ads_edit.js': 2353910901,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 14840326490,
    'ads_moder.css': 14203004674,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 3522009107,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 4274163593,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 1728588285,
    'sms_office.js': 333673010,
    'help.css': 2602432866,
    'help.js': 915032948,
    'claims.css': 15679925653,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 17914867619,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 14373267514,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 19491889285,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 14273921257,
    'dev.js': 666079941,
    'dev.css': 28456672638,
    'share.css': 28874852414,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 15971867178,
    'print.js': 1255624803,
    'print.css': 16309668544,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 15300353262,
    'ui.js': 3953380422,
    'ui_common.js': 3070177449,
    'ui_common.css': 16363161579,
    'ui_media_selector.js': 991580020,
    'ui_media_selector.css': 20861387662,
    'ui_manual.css': 15268014986,
    'admin.js': 2866808704,
    'admin.css': 18314128813,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 20088522614,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 16338631329,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 16025842222,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 16935195981,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 19261881536,
    'landings/vk10_years.css': 15615787656,
    'chronicle.css': 15816645995,
    'market.css': 20229863236,
    'market.js': 1427771939,
    'stories_admin.css': 17201875333,
    'stories_admin.js': 3474276114,
    'vk2016.css': 2369321949,
    'landings/common.css': 19652105464,
    'landings/community_message.css': 15079361147,
    'landings/wdsd.css': 19201981952,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 14252074019,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 18351655037,
    'landings/psb.css': 21103849842,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 23408762868,
    'landings/moneysend.css': 17054344212,
    'landings/desktop_messenger.css': 17912672356,
    'landings/vklive.css': 14614353524,
    'landings/vk2017.css': 15691807677,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 16490227303,
    'landing_aes.js': 17765034262,
    'landings/donors_day.css': 17942587332,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 14510783485,
    'vkme.css': 18275432906,
    'ui_controls.js': 84081749,
    'highcharts.js': 1982709850,
    'ui_controls.css': 15714677117,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 17622172842,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 16316307320,
    'api/share.js': 2621084197,
    'api/openapi.js': 1696652409,
    'api/xdm.js': 1449919642,
    'hls.min.js': 3590183848,
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
    'snapster/style.css': 17506784491,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 2917617036,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 18948912444,
    'snapster/mob_templates.js': 800413458,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 18930093861,
    'snapster/templates.js': 1084088730,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 18907517330,
    'top_logo.css': 14998832108,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 22861000893,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 4166849129,
    'stories.css': 19153849676,
    'internal/nospam.css': 17981449225,
    'internal/away_linksban.css': 17139086580,
    'internal/patterns_info.css': 15234503526,
    'article.css': 24264386788,
    'article_editor.css': 23425827544,
    'cmodules/web/article.js': 15410160110,
    'internal/cvkmobile.css': 16015903181,
    'internal/cvkmobile.js': 3834199633,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 1388461462,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'landings/ads_cases.css': 25976906447,
    'surveys.css': 20147726009,
    'surveys.js': 3994896871,
    'lang': 6848
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
        'landing_donors_day.js': 1,
        'grid_sorter2.js': 1,
        'lead_forms_app.js': 1,
        'mr_truth.js': 1
    }
};
var _rnd = 6040;