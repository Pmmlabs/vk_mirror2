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
    'restore2($|/)': ['restore2.php', ['internal/restore2.css', 'internal/restore2.js', 'internal/restore2_autoanswers.js', 'sorter.js']],
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
    'common.js': 1158,
    'common.css': 25629760570,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 14108842892,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 1000716318,
    'lite.css': 38477219664,
    'rtl.css': 12002040778,
    'pagination.js': 1027022568,
    'blog.css': 14139359835,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 13655141869,
    'audioplayer.js': 7638787923,
    'audioplayer.css': 14967517444,
    'audio_html5.js': 287741914,
    'audio.js': 4203163340,
    'audio.css': 20886293977,
    'gifts.css': 15197423014,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 14792037770,
    'boxes.css': 13189523702,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 4232536498,
    'tooltips.css': 15706028245,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 12440684459,
    'photoview.js': 4178906126,
    'photoview.css': 15881209949,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 12607264662,
    'spe.js': 3760998372,
    'friends.js': 140439177,
    'friends.css': 13859264555,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 3924396132,
    'board.css': 18604096916,
    'photos.css': 15996761665,
    'photos.js': 152064977,
    'photos_add.css': 17818930926,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2033072125,
    'wkview.css': 20045917255,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 187248878,
    'video.css': 18702231647,
    'videocat.js': 1618923991,
    'videocat.css': 15429682825,
    'videoview.js': 960431600,
    'videoview.css': 20691799909,
    'video_edit.js': 2135196486,
    'video_edit.css': 15907231280,
    'video_upload.js': 812506149,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 10901384256,
    'videoplayer.js': 78508921064,
    'videoplayer.css': 29294264050,
    'translation.js': 51041194,
    'translation.css': 14065363596,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 14784110719,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 11660417436,
    'index.js': 3228561433,
    'join.css': 13840955114,
    'join.js': 4281861549,
    'intro.css': 14166810355,
    'post.css': 14554582700,
    'module.css': 18315356397,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 16913836715,
    'page.js': 3849479683,
    'page.css': 18235124666,
    'page_help.css': 18570323721,
    'public.css': 21694553180,
    'public.js': 1344775948,
    'pages.css': 17157764851,
    'pages.js': 1162259210,
    'groups.css': 23779041393,
    'groups.js': 3788665915,
    'groups_list.js': 3507753248,
    'groups_edit.css': 28840756700,
    'groups_edit.js': 839608970,
    'profile.css': 20459705250,
    'profile.js': 3346872471,
    'calendar.css': 16173854907,
    'calendar.js': 4203451993,
    'wk.css': 17140854478,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 16008910894,
    'qsearch.js': 4098038985,
    'wall.css': 21173637620,
    'wall.js': 3588967340,
    'walledit.js': 972441060,
    'thumbs_edit.css': 11291529919,
    'thumbs_edit.js': 2241504624,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 118834206916,
    'imn.js': 127487808903,
    'im.js': 1322065005,
    'emoji.js': 478110222,
    'wide_dd.css': 14010740027,
    'wide_dd.js': 452755344,
    'writebox.css': 14437339002,
    'writebox.js': 3870429897,
    'sharebox.js': 2160209921,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 1123849832,
    'feed.css': 19947171604,
    'privacy.js': 3620108221,
    'privacy.css': 13850668280,
    'apps.css': 29986219063,
    'apps.js': 3735536424,
    'apps_edit.js': 2247867637,
    'apps_edit.css': 21787412303,
    'apps_check.js': 3844411974,
    'apps_check.css': 19722169881,
    'settings.js': 3179311966,
    'settings.css': 18811960015,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 13320039446,
    'profile_edit_edu.js': 174903945,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 2182721495,
    'search.css': 28402276733,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1049909811,
    'datepicker.js': 1574876075,
    'datepicker.css': 16554440953,
    'oauth_popup.css': 26681121557,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 18904605908,
    'fave.js': 128270649,
    'fave.css': 18762841320,
    'widget_comments.css': 27780499268,
    'widget_auth.css': 26957823279,
    'widget_community.css': 29116409027,
    'widget_contactus.css': 31754934899,
    'widget_post.css': 26766799475,
    'widget_allow_messages_from_community.css': 30074276125,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 2664555904,
    'api/widgets/al_post.js': 1353009905,
    'cmodules/api/widgets/comments.js': 3317228637,
    'cmodules/api/widgets/community.js': 1027737491,
    'cmodules/api/widgets/allow_messages_from_community.js': 426372466,
    'cmodules/api/widgets/app.js': 3831665829,
    'api/widgets/al_add_community_app.js': 552092634,
    'widget_add_community_app.css': 28207822213,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 28141742078,
    'al_poll.css': 3,
    'widget_recommended.css': 26937976242,
    'widgets.css': 29459230196,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 33841278620,
    'notifier.css': 21829433738,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 2405865094,
    'restore.css': 15681211404,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 1484979496,
    'docs.css': 19531048889,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 13313348405,
    'tasks.js': 4178217651,
    'tasks.css': 11064980292,
    'helpdesk.js': 1998123585,
    'helpdesk.css': 16173118899,
    'tickets.js': 515972259,
    'tickets.css': 20581910423,
    'faq.js': 2841473572,
    'faq.css': 16048207398,
    'talmud.js': 1641838680,
    'agents.js': 1999819841,
    'agents.css': 13496237822,
    'achievements.js': 897703126,
    'achievements.css': 12026767072,
    'sf.css': 14016338117,
    'members.css': 13236001096,
    'meminfo.css': 15296355013,
    'groupinfo.css': 15956013816,
    'bugs.js': 3874995669,
    'bugs.css': 11283028420,
    'bugtracker.js': 1213584201,
    'bugtracker.css': 19943338306,
    'login.css': 15261327475,
    'login.js': 3551917100,
    'upload.js': 532526424,
    'upload_photo_transform.js': 1228329948,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 15713856463,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 10745683184,
    'away.css': 15530409842,
    'stats.css': 14347483015,
    'payments.css': 14910334307,
    'payments.js': 2694322533,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 22262902740,
    'aes_light.js': 3306454788,
    'ads.css': 20056757769,
    'ads_bonus.css': 460482192,
    'ads.js': 2559771898,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 13658037226,
    'ads_edit.js': 729526321,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 11768016629,
    'ads_moder.css': 11130694813,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 3522009107,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 4274163593,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'cmodules/web/ads_edit_easy.js': 112585639,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 1728588285,
    'sms_office.js': 333673010,
    'help.css': 2602432866,
    'help.js': 915032948,
    'claims.css': 12607615792,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 14842557758,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 11300957653,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 17565835514,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 11201611396,
    'dev.js': 1837466610,
    'dev.css': 34409140883,
    'share.css': 28603799423,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 12899557317,
    'print.js': 1255624803,
    'print.css': 13237358683,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 12228043401,
    'ui.js': 3953380422,
    'ui_common.js': 465114920,
    'ui_common.css': 12457277817,
    'ui_media_selector.js': 3620910617,
    'ui_media_selector.css': 17789077801,
    'ui_manual.css': 12479615278,
    'admin.js': 2866808704,
    'admin.css': 15241818952,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 17016212753,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 13266321468,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 12953532361,
    'exchange_moder.js': 971790892,
    'ads_offers.css': 13862886120,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 16189571675,
    'landings/vk10_years.css': 12543477795,
    'chronicle.css': 12744336134,
    'market.css': 18303809465,
    'market.js': 1427771939,
    'stories_admin.css': 14129565472,
    'stories_admin.js': 3640524027,
    'vk2016.css': 2369321949,
    'landings/common.css': 17870296280,
    'landings/community_message.css': 12007051286,
    'landings/wdsd.css': 16129672091,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 11179764158,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 15279345176,
    'landings/psb.css': 18031539981,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 20336453007,
    'landings/moneysend.css': 13982034351,
    'landings/desktop_messenger.css': 13077904383,
    'landings/vklive.css': 11542043663,
    'landings/vk2017.css': 12619497816,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 14895526138,
    'landing_aes.js': 14740012721,
    'landings/donors_day.css': 14870277471,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 11438473624,
    'vkme.css': 15203123045,
    'cmodules/web/vkme-desktop.js': 4912670899,
    'ui_controls.js': 2963107885,
    'highcharts.js': 1982709850,
    'ui_controls.css': 14493185962,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 14549862981,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 13243997459,
    'api/share.js': 2621084197,
    'api/openapi.js': 519085702,
    'api/xdm.js': 1449919642,
    'hls.min.js': 2157207560,
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
    'snapster/style.css': 14434474630,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 2917617036,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 15876602583,
    'snapster/mob_templates.js': 800413458,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 15857784000,
    'snapster/templates.js': 1084088730,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 15835207469,
    'top_logo.css': 11926522247,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 22861000893,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 4166849129,
    'stories.css': 16081539815,
    'internal/nospam.css': 14829935903,
    'internal/away_linksban.css': 10928864581,
    'internal/ui_manual.js': 1615379973,
    'internal/patterns_info.css': 13377246120,
    'article.css': 22338333017,
    'article_editor.css': 21499773773,
    'cmodules/web/article.js': 15410160110,
    'internal/cvkmobile.css': 12943593320,
    'internal/cvkmobile.js': 3588813277,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 1388461462,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'landings/ads_cases.css': 22904596586,
    'surveys.css': 20586896468,
    'surveys.js': 3382685824,
    'landings/author_guide.css': 23865169393,
    'internal/restore2.css': 13454031865,
    'internal/restore2.js': 1037282534,
    'language.js': 3496086639,
    'language.css': 13694481301,
    'lang': 6854
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
        'mr_truth.js': 1,
        'rich_dropdown.js': 1
    }
};
var _rnd = 2281;