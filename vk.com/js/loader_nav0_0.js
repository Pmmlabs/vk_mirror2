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
    'apps_check($|/)': ['al_apps_check.php', ['apps.css', 'apps.js']],
    'apps($|/)': ['al_apps.php', ['apps.css', 'apps.js']],
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
    'editdb($|/)': ['edit.php', ['edit.js']],
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
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['cmodules/internal/meminfo.js', 'meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1150,
    'common.css': 26888870024,
    'pads.css': 18745658294,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 21013292225,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 3506952057,
    'lite.css': 35748377223,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 18898017992,
    'pagination.js': 1027022568,
    'blog.css': 20062595450,
    'blog.js': 359555078,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 20551119083,
    'audioplayer.js': 3274571679,
    'audioplayer.css': 19815393074,
    'audio_html5.js': 287741914,
    'audio.js': 2321433814,
    'audio.css': 24098493464,
    'gifts.css': 23117170967,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 21688014984,
    'boxes.css': 20085500916,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 3126166391,
    'tooltips.css': 20260150222,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 19336661673,
    'photoview.js': 2919002621,
    'photoview.css': 20289017657,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 19503241876,
    'spe.js': 3760998372,
    'friends.js': 493278683,
    'friends.css': 20755241769,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 2073260165,
    'board.css': 22903696252,
    'photos.css': 22892738879,
    'photos.js': 152064977,
    'photos_add.css': 24714908140,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2577556179,
    'wkview.css': 22652320273,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 1065379944,
    'video.css': 23283986940,
    'videocat.js': 1618923991,
    'videocat.css': 23274208485,
    'videoview.js': 1856590344,
    'videoview.css': 24220412423,
    'video_edit.js': 2135196486,
    'video_edit.css': 20130956155,
    'video_upload.js': 1490680443,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 17797361470,
    'videoplayer.js': 74013069254,
    'videoplayer.css': 37957184259,
    'translation.js': 2431784533,
    'translation.css': 19048650870,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 21680087933,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 18556394650,
    'index.js': 3228561433,
    'join.css': 20736932328,
    'join.js': 4281861549,
    'intro.css': 21062787569,
    'post.css': 19268212537,
    'module.css': 18987238451,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 23809813929,
    'page.js': 2893381619,
    'page.css': 23351232928,
    'page_help.css': 22869923057,
    'public.css': 25928686609,
    'public.js': 3770119342,
    'pages.css': 21433694564,
    'pages.js': 1162259210,
    'groups.css': 25531764868,
    'groups.js': 2975645919,
    'groups_list.js': 3507753248,
    'groups_edit.css': 29601013503,
    'groups_edit.js': 2057581327,
    'profile.css': 24931251127,
    'profile.js': 642429379,
    'calendar.css': 23069832121,
    'calendar.js': 4203451993,
    'wk.css': 21440453814,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 22904888108,
    'qsearch.js': 4098038985,
    'wall.css': 24114926084,
    'wall.js': 106343366,
    'walledit.js': 3566580322,
    'thumbs_edit.css': 18187507133,
    'thumbs_edit.js': 574019481,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 105826290577,
    'imn.js': 106862700026,
    'im.js': 1322065004,
    'emoji.js': 1068454446,
    'wide_dd.css': 18140109232,
    'wide_dd.js': 452755344,
    'writebox.css': 20986064928,
    'writebox.js': 4788293668,
    'sharebox.js': 4060876929,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 2937084348,
    'feed.css': 22691901959,
    'privacy.js': 3620108221,
    'privacy.css': 20746645494,
    'apps.css': 24315589007,
    'apps.js': 726679172,
    'apps_edit.js': 119002668,
    'apps_edit.css': 24257253953,
    'apps_check.js': 3844411974,
    'apps_check.css': 23786473377,
    'settings.js': 1239649088,
    'settings.css': 24106094477,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 20216016660,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 2511896194,
    'search.css': 29662471580,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 2238023012,
    'datepicker.js': 1574876075,
    'datepicker.css': 23450418167,
    'oauth_popup.css': 25211290893,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 23204205244,
    'fave.js': 128270649,
    'fave.css': 25658818534,
    'widget_comments.css': 27164073711,
    'widget_auth.css': 25487992615,
    'widget_community.css': 29146042576,
    'widget_contactus.css': 27766250393,
    'widget_post.css': 26640665541,
    'widget_allow_messages_from_community.css': 28604445461,
    'api/widgets/al_comments.js': 1100916062,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 1056997481,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 4053792122,
    'api/widgets/al_post.js': 2158816595,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 25411933451,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 26671911414,
    'al_poll.css': 3,
    'widget_recommended.css': 25468145578,
    'widgets.css': 25347255738,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 28460529380,
    'notifier.css': 22677146243,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 1242653913,
    'restore.css': 22024802370,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 4024778124,
    'docs.css': 23830648225,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 20209325619,
    'tasks.js': 662793453,
    'tasks.css': 19554090540,
    'helpdesk.js': 3971000045,
    'helpdesk.css': 22054008067,
    'tickets.js': 3256001699,
    'tickets.css': 20449265730,
    'faq.js': 1134602325,
    'faq.css': 22944184612,
    'talmud.js': 1641838680,
    'agents.js': 1719521972,
    'agents.css': 20944746701,
    'achievements.js': 897703126,
    'achievements.css': 18922744286,
    'sf.css': 17934203413,
    'sal.css': 19109878665,
    'members.css': 20131978310,
    'meminfo.css': 22635523273,
    'groupinfo.css': 23224190375,
    'bugs.js': 3874995669,
    'bugs.css': 18179005634,
    'bugtracker.js': 3501719115,
    'bugtracker.css': 20316379146,
    'login.css': 20406193821,
    'login.js': 3551917100,
    'upload.js': 3319172650,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 20013455799,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 22044859823,
    'stats.css': 21243460229,
    'payments.css': 22157437680,
    'payments.js': 780224796,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 24477092654,
    'aes_light.js': 3306454788,
    'ads.css': 25342877226,
    'ads_bonus.css': 460482192,
    'ads.js': 1629241604,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 20402157744,
    'ads_edit.js': 3403521381,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 18663993843,
    'ads_moder.css': 18026672027,
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
    'sms_office.css': 3956948163,
    'sms_office.js': 1747548685,
    'help.css': 2602432866,
    'help.js': 981062856,
    'claims.css': 19503593006,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 21738534972,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 21197565807,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 21841765227,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 318083439,
    'pe.css': 18097588610,
    'dev.js': 4126919969,
    'dev.css': 25433716183,
    'share.css': 27133968759,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 22855839380,
    'print.js': 1255624803,
    'print.css': 20133335897,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 19124020615,
    'ui.js': 3953380422,
    'ui_common.js': 2918179257,
    'ui_common.css': 21379717405,
    'ui_media_selector.js': 3483396184,
    'ui_media_selector.css': 24300370960,
    'ui_manual.css': 19091682339,
    'admin.js': 2866808704,
    'admin.css': 22137796166,
    'duty_timetable.js': 929110027,
    'duty_timetable.css': 21132558716,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 20162298682,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 19849509575,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 20758863334,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 23085548889,
    'landings/vk10_years.css': 19439455009,
    'chronicle.css': 19640313348,
    'market.css': 22563099438,
    'market.js': 706006342,
    'vk2016.css': 2369321949,
    'landings/common.css': 23475772817,
    'landings/community_message.css': 18903028500,
    'landings/wdsd.css': 23025649305,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 18075741372,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 22175322390,
    'landings/psb.css': 22879415611,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 25184328637,
    'landings/moneysend.css': 21608133620,
    'landings/desktop_messenger.css': 20737521989,
    'landings/vklive.css': 18438020877,
    'landings/vk2017.css': 19515475030,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 22093379437,
    'landing_aes.js': 16840307206,
    'landings/donors_day.css': 21766254685,
    'landing_donors_day.js': 1027075361,
    'vkme.css': 20686998686,
    'ui_controls.js': 2173726660,
    'highcharts.js': 1982709850,
    'ui_controls.css': 19538344470,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 21445840195,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 20139974673,
    'api/share.js': 2621084197,
    'api/openapi.js': 1813688167,
    'api/xdm.js': 1449919642,
    'css_clean.js': 4210402166,
    'hls.min.js': 330465469,
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
    'snapster/style.css': 21330451844,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 3964802700,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 22738784198,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 21790848641,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 20312792574,
    'top_logo.css': 18822499461,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 24272478849,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 675877973,
    'stories.css': 19985645930,
    'cmodules/internal/meminfo.js': 17609645333,
    'cmodules/internal/nospam.js': 25508713502,
    'cmodules/internal/patterns_info.js': 5428528787,
    'shortener.js': 1002525642,
    'lang': 6830
};
var stTypes = {
    fromLib: {
        'md5.js': 1,
        'clipboard.js': 1,
        'ui_controls.js': 1,
        'highcharts.js': 1,
        'selects.js': 1,
        'sort.js': 1,
        'maps.js': 1,
        'css_clean.js': 1,
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
        'lead_forms_app.js': 1
    }
};
var _rnd = 85;