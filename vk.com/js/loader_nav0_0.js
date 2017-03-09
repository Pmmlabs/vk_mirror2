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
    'friendsphotos$': ['al_photos.php', ['friendsphotos.js', 'photoview.js', 'friendsphotos.css', 'photoview.css']],
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
    'translation$': ['al_translation.php', []],
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
    'bugtracker($|/)': ['al_bugtracker.php', ['bugtracker.css', 'bugtracker.js']],
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['internal/meminfo.js', 'meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1140,
    'common.css': 20679137782,
    'pads.js': 2514146926,
    'pads.css': 13412878818,
    'retina.css': 1499557272,
    'uncommon.js': 1524646384,
    'uncommon.css': 11902107818,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 2040438164,
    'lite.css': 35004468639,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 12514139400,
    'pagination.js': 1027022568,
    'blog.css': 13709553034,
    'blog.js': 3466412591,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 14167240491,
    'audioplayer.js': 4291731025,
    'audioplayer.css': 15692800303,
    'audio_html5.js': 287741914,
    'audio.js': 1733633534,
    'audio.css': 19814607169,
    'gifts.css': 16733292375,
    'gifts.js': 338252255,
    'cc.js': 883568819,
    'indexer.js': 1640179507,
    'graph.js': 3882247419,
    'graph.css': 15304136392,
    'boxes.css': 13701622324,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 1821546750,
    'tooltips.css': 20509321009,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 12952783081,
    'photoview.js': 2171766428,
    'photoview.css': 22725821407,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 13119363284,
    'friendsphotos.js': 169519698,
    'friendsphotos.css': 2849056081,
    'spe.js': 2834875544,
    'friends.js': 3212870034,
    'friends.css': 13341578411,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 2538879168,
    'board.css': 22498370413,
    'photos.css': 21053935433,
    'photos.js': 152064977,
    'photos_add.css': 22876104694,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 1402953923,
    'wkview.css': 22569983107,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 3840498487,
    'video.css': 23557121992,
    'videocat.js': 1618923991,
    'videocat.css': 20585735089,
    'videoview.js': 172514148,
    'videoview.css': 13987217872,
    'video_edit.js': 2135196486,
    'video_edit.css': 19571118390,
    'video_upload.js': 1051485270,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 11413482878,
    'videoplayer.js': 77882181513,
    'videoplayer.css': 37020303299,
    'translation.js': 2541156631,
    'translation.css': 12415593844,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 15296209341,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 18624243682,
    'index.js': 752775373,
    'join.css': 17441475516,
    'join.js': 4281861549,
    'intro.css': 18521109871,
    'post.css': 18502131127,
    'module.css': 18641630126,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 15773075545,
    'page.js': 4003367016,
    'page.css': 20741323862,
    'page_help.css': 22464597218,
    'public.css': 26844011198,
    'public.js': 3882483539,
    'pages.css': 19447246025,
    'pages.js': 1162259210,
    'groups.css': 21540672649,
    'groups.js': 166703050,
    'groups_list.js': 2953716700,
    'groups_edit.css': 29346750653,
    'groups_edit.js': 942087830,
    'profile.css': 22701367576,
    'profile.js': 3061689951,
    'calendar.css': 16685953529,
    'calendar.js': 4203451993,
    'wk.css': 21035127974,
    'wk.js': 2226505192,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 16521009516,
    'qsearch.js': 4098038985,
    'wall.css': 23709600245,
    'wall.js': 3216669114,
    'walledit.js': 3566580322,
    'thumbs_edit.css': 18730133015,
    'thumbs_edit.js': 662560525,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 105762291172,
    'imn.js': 110220273773,
    'im.js': 1322065004,
    'emoji.js': 4179107525,
    'wide_dd.css': 11756230640,
    'wide_dd.js': 3323487336,
    'writebox.css': 16889744127,
    'writebox.js': 6141701117,
    'sharebox.js': 3843850841,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 2219175661,
    'feed.css': 22615706001,
    'privacy.js': 3875115925,
    'privacy.css': 14362766902,
    'apps.css': 29817120295,
    'apps.js': 1263627382,
    'apps_edit.js': 2664300316,
    'apps_edit.css': 24314364293,
    'apps_check.js': 3844411974,
    'apps_check.css': 24170425686,
    'settings.js': 4027039538,
    'settings.css': 24824636696,
    'profile_edit.js': 312998250,
    'profile_edit.css': 13832138068,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 281115018,
    'profile_edit_mil.js': 112384103,
    'search.js': 3903028041,
    'search.css': 29642771578,
    'grid_sorter.js': 703789694,
    'auto_list.js': 2419796116,
    'suggester.js': 3718548841,
    'datepicker.js': 808741082,
    'datepicker.css': 17066539575,
    'oauth_popup.css': 27299167262,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 2631009968,
    'wiki.css': 22798879405,
    'fave.js': 128270649,
    'fave.css': 18563015651,
    'widget_comments.css': 30864516400,
    'widget_auth.css': 25622305851,
    'widget_community.css': 31854090169,
    'widget_contactus.css': 27900563629,
    'widget_post.css': 30313719125,
    'widget_allow_messages_from_community.css': 28738758697,
    'api/widgets/al_comments.js': 920774215,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 406706841,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 4053792122,
    'api/widgets/al_post.js': 1217136033,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 25546246687,
    'api/widgets/community_messages.js': 2048988710,
    'widget_community_messages.css': 27227636287,
    'al_poll.css': 3,
    'widget_recommended.css': 25602458814,
    'widgets.css': 25481568974,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 30586692953,
    'notifier.css': 23092296502,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 746817657,
    'restore.css': 15947806509,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 3215535710,
    'docs.css': 23017973797,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 13825447027,
    'tasks.js': 3716388560,
    'tasks.css': 14327908061,
    'helpdesk.js': 2219619230,
    'helpdesk.css': 15486058658,
    'tickets.js': 3747535527,
    'tickets.css': 20947879446,
    'faq.js': 1417581931,
    'faq.css': 17389657651,
    'talmud.js': 1641838680,
    'agents.js': 1228491530,
    'agents.css': 14325522123,
    'achievements.js': 897703126,
    'achievements.css': 12899651951,
    'sf.css': 12513838070,
    'sal.css': 12726000073,
    'members.css': 13748099718,
    'meminfo.css': 16166873366,
    'groupinfo.css': 13619197343,
    'bugs.js': 3874995669,
    'bugs.css': 11795127042,
    'bugtracker.js': 188714712,
    'bugtracker.css': 13640652761,
    'login.css': 17520897601,
    'login.js': 3551917100,
    'upload.js': 3754775695,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 19608129960,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 15660981231,
    'stats.css': 14859581637,
    'payments.css': 16566169946,
    'payments.js': 4066298509,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 28358231448,
    'aes_light.js': 3013204428,
    'ads.css': 24481209265,
    'ads_bonus.css': 460482192,
    'ads.js': 270622120,
    'ads_payments.js': 2909099260,
    'ads_edit.css': 13286995919,
    'ads_edit.js': 3524548172,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 12280115251,
    'ads_moder.css': 13359738194,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 3121681807,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 3654572848,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 3956948163,
    'sms_office.js': 1747548685,
    'help.css': 2602432866,
    'help.js': 981062856,
    'claims.css': 13119714414,
    'claims.js': 577939270,
    'video_embed.js': 492405,
    'video_embed.css': 15354656380,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 14813687215,
    'wk_editor.js': 2318898403,
    'wk_editor.css': 19855316688,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 309818898,
    'pe.css': 11713710018,
    'dev.js': 1672914477,
    'dev.css': 29292661131,
    'share.css': 25703359005,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 16471960788,
    'print.js': 1255624803,
    'print.css': 13749457305,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 12735522182,
    'ui.js': 3953380422,
    'ui_common.js': 1765160146,
    'ui_common.css': 11154424417,
    'ui_media_selector.js': 3038838452,
    'ui_media_selector.css': 18336883180,
    'ui_manual.css': 12707803747,
    'admin.js': 2866808704,
    'admin.css': 16258148156,
    'duty_timetable.js': 3515753564,
    'duty_timetable.css': 14748680124,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 13778420090,
    'exchange.css': 4232317785,
    'exchange.js': 3355553135,
    'exchange_moder.css': 13465630983,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 14374984742,
    'ads_offers.js': 153944036,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 15779588127,
    'landings/vk10_years.css': 13055576417,
    'chronicle.css': 13256434756,
    'market.css': 25281893322,
    'market.js': 3418710663,
    'vk2016.css': 2369321949,
    'landings/common.css': 17091894225,
    'landings/community_message.css': 12519149908,
    'landings/wdsd.css': 16641770713,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 11691862780,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 15791443798,
    'landings/psb.css': 20028511103,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 22333424129,
    'landings/moneysend.css': 15224255028,
    'landings/desktop_messenger.css': 13411435776,
    'landings/vklive.css': 14576536421,
    'landings/vk2017.css': 13131596438,
    'vkme.css': 14303120094,
    'ui_controls.js': 3490827165,
    'highcharts.js': 1982709850,
    'ui_controls.css': 12392439933,
    'selects.js': 3019529501,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 18904162497,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 13756096081,
    'api/share.js': 1988203672,
    'api/openapi.js': 2411391687,
    'api/xdm.js': 1449919642,
    'css_clean.js': 4210402166,
    'hls.min.js': 4279436662,
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
    'snapster/style.css': 14946573252,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 1744321754,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 16354905606,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 15406970049,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 13928913982,
    'top_logo.css': 12438620869,
    'favicon': 5,
    'speech.js': 40673857514,
    'voice_message_player.js': 25193101599,
    'speech_worker_mp3.js': 1172578475,
    'speech_worker_opus.js': 3385759348,
    'stories.js': 3550070580,
    'stories.css': 19078138356,
    'shortener.js': 1521479181,
    'lang': 6760
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
    }
};
var _rnd = 1621;