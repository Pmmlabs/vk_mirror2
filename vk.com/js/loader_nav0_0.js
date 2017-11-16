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
    'common.css': 23784669210,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 13044515210,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 2838965320,
    'lite.css': 36591701624,
    'rtl.css': 10937713096,
    'pagination.js': 1027022568,
    'blog.css': 13075032153,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 12590814187,
    'audioplayer.js': 5257384920,
    'audioplayer.css': 13903189762,
    'audio_html5.js': 287741914,
    'audio.js': 422264091,
    'audio.css': 17938924934,
    'gifts.css': 15840147453,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 13727710088,
    'boxes.css': 12125196020,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 4232536498,
    'tooltips.css': 15311450463,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 11376356777,
    'photoview.js': 4178906126,
    'photoview.css': 15486632167,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 11542936980,
    'spe.js': 3760998372,
    'friends.js': 140439177,
    'friends.css': 12794936873,
    'friends_search.js': 964151048,
    'friends_search.css': 1694758778,
    'board.js': 3924396132,
    'board.css': 18209519134,
    'photos.css': 14932433983,
    'photos.js': 152064977,
    'photos_add.css': 16754603244,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2033072125,
    'wkview.css': 19651339473,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 2585777191,
    'video.css': 18307653865,
    'videocat.js': 1618923991,
    'videocat.css': 14365355143,
    'videoview.js': 2998929246,
    'videoview.css': 20306298634,
    'video_edit.js': 2135196486,
    'video_edit.css': 14842903598,
    'video_upload.js': 812506149,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 9837056574,
    'videoplayer.js': 82056071180,
    'videoplayer.css': 28229936368,
    'translation.js': 51041194,
    'translation.css': 13001035914,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 13719783037,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 10596089754,
    'index.js': 3228561433,
    'join.css': 12776627432,
    'join.js': 4281861549,
    'intro.css': 13102482673,
    'post.css': 14776184965,
    'module.css': 14347446826,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 15849509033,
    'page.js': 939990738,
    'page.css': 15297718876,
    'page_help.css': 18175745939,
    'public.css': 16850755484,
    'public.js': 1344775948,
    'pages.css': 16763187069,
    'pages.js': 1162259210,
    'groups.css': 18040342013,
    'groups.js': 2855040531,
    'groups_list.js': 3507753248,
    'groups_edit.css': 26735595891,
    'groups_edit.js': 3660395697,
    'profile.css': 20065127468,
    'profile.js': 3346872471,
    'calendar.css': 15109527225,
    'calendar.js': 4203451993,
    'wk.css': 16746276696,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 14944583212,
    'qsearch.js': 4098038985,
    'wall.css': 20779059838,
    'wall.js': 3588967340,
    'walledit.js': 865374414,
    'thumbs_edit.css': 10227202237,
    'thumbs_edit.js': 1864853921,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 111391006438,
    'imn.js': 128103095599,
    'im.js': 1322065005,
    'emoji.js': 3160351728,
    'wide_dd.css': 12946412345,
    'wide_dd.js': 452755344,
    'writebox.css': 13373011320,
    'writebox.js': 53289061572,
    'sharebox.js': 2160209921,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 600396768,
    'feed.css': 19222580529,
    'privacy.js': 3620108221,
    'privacy.css': 12786340598,
    'apps.css': 26499224861,
    'apps.js': 3735536424,
    'apps_edit.js': 2247867637,
    'apps_edit.css': 21797294614,
    'apps_check.js': 3844411974,
    'apps_check.css': 19732052192,
    'settings.js': 3179311966,
    'settings.css': 18680610228,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 12255711764,
    'profile_edit_edu.js': 174903945,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 695974096,
    'search.css': 23867280814,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1049909811,
    'datepicker.js': 1574876075,
    'datepicker.css': 15490113271,
    'oauth_popup.css': 23911638178,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 18510028126,
    'fave.js': 128270649,
    'fave.css': 17698513638,
    'widget_comments.css': 25011015889,
    'widget_auth.css': 24188339900,
    'widget_community.css': 26346925648,
    'widget_contactus.css': 28985451520,
    'widget_post.css': 23997316096,
    'widget_allow_messages_from_community.css': 27304792746,
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
    'widget_add_community_app.css': 25438338834,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 25067906905,
    'al_poll.css': 3,
    'widget_recommended.css': 24168492863,
    'widgets.css': 26689746817,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 76316403486,
    'notifier.css': 19961997959,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 118430100,
    'restore.css': 14616883722,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 875239394,
    'docs.css': 19136471107,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 12249020723,
    'tasks.js': 4178217651,
    'tasks.css': 10000652610,
    'helpdesk.js': 710896426,
    'helpdesk.css': 16855910078,
    'tickets.js': 4198914222,
    'tickets.css': 16481305478,
    'faq.js': 2841473572,
    'faq.css': 14983879716,
    'talmud.js': 1641838680,
    'agents.js': 1999819841,
    'agents.css': 12431910140,
    'achievements.js': 897703126,
    'achievements.css': 10962439390,
    'sf.css': 11561888227,
    'members.css': 12171673414,
    'meminfo.css': 14232027331,
    'groupinfo.css': 14891686134,
    'bugs.js': 3874995669,
    'bugs.css': 10218700738,
    'bugtracker.js': 69564442,
    'bugtracker.css': 22003312282,
    'login.css': 14196999793,
    'login.js': 3551917100,
    'upload.js': 16891470,
    'upload_photo_transform.js': 1228329948,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 15319278681,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 9681355502,
    'away.css': 14466082160,
    'stats.css': 12426426977,
    'payments.css': 15249164103,
    'payments.js': 786492642,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 21096821704,
    'aes_light.js': 3306454788,
    'ads.css': 21504509391,
    'ads_bonus.css': 460482192,
    'ads.js': 3020653079,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 9737462539,
    'ads_edit.js': 298331018,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 10744757270,
    'ads_moder.css': 10066367131,
    'ads_moder_common.js': 3875868763,
    'ads_moder.js': 3522009107,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 4274163593,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'cmodules/web/ads_edit_easy.js': 3647759686,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 1728588285,
    'sms_office.js': 333673010,
    'help.css': 2602432866,
    'help.js': 915032948,
    'claims.css': 11543288110,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 13778230076,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 10236629971,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 17171257732,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 10137283714,
    'dev.js': 2143073519,
    'dev.css': 30004705884,
    'share.css': 25834316044,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 11835229635,
    'print.js': 1255624803,
    'print.css': 12173031001,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 11163715719,
    'ui.js': 3953380422,
    'ui_common.js': 3700204219,
    'ui_common.css': 11392950135,
    'ui_media_selector.js': 1634680349,
    'ui_media_selector.css': 14919471879,
    'ui_manual.css': 11415287596,
    'admin.js': 2866808704,
    'admin.css': 14177491270,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 15951885071,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 12201993786,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 11889204679,
    'exchange_moder.js': 971790892,
    'ads_offers.css': 12798558438,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 15125243993,
    'landings/vk10_years.css': 11479150113,
    'chronicle.css': 11680008452,
    'market.css': 17909231683,
    'market.js': 1427771939,
    'stories_admin.css': 13065237790,
    'stories_admin.js': 3640524027,
    'vk2016.css': 2369321949,
    'landings/common.css': 16805968598,
    'landings/community_message.css': 10942723604,
    'landings/wdsd.css': 15065344409,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 10115436476,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 14215017494,
    'landings/psb.css': 16163197799,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 18468110825,
    'landings/moneysend.css': 13592582829,
    'landings/desktop_messenger.css': 12013576701,
    'landings/vklive.css': 10477715981,
    'landings/vk2017.css': 11555170134,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 13831198456,
    'landing_aes.js': 14740012721,
    'landings/donors_day.css': 13805949789,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 11792561640,
    'vkme.css': 14138795363,
    'cmodules/web/vkme-desktop.js': 4912670899,
    'ui_controls.js': 2713858100,
    'highcharts.js': 1982709850,
    'ui_controls.css': 12684652273,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 13485535299,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1750088857,
    'paginated_table.css': 12179669777,
    'api/share.js': 2621084197,
    'api/openapi.js': 519085702,
    'api/xdm.js': 1449919642,
    'hls.min.js': 3740087726,
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
    'snapster/style.css': 13370146948,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 2917617036,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 14812274901,
    'snapster/mob_templates.js': 800413458,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 14793456318,
    'snapster/templates.js': 1084088730,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 14770879787,
    'top_logo.css': 10862194565,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 22861000893,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 4166849129,
    'stories.css': 15017212133,
    'internal/nospam.css': 13765608221,
    'internal/away_linksban.css': 10131855541,
    'internal/ui_manual.js': 916576507,
    'internal/patterns_info.css': 12312918438,
    'article.css': 21943755235,
    'article_editor.css': 21105195991,
    'cmodules/web/article.js': 15410160110,
    'internal/cvkmobile.css': 11879265638,
    'internal/cvkmobile.js': 3588813277,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 1388461462,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'landings/ads_cases.css': 21840268904,
    'surveys.css': 20192318686,
    'surveys.js': 3382685824,
    'landings/author_guide.css': 22800841711,
    'internal/restore2.css': 12389704183,
    'internal/restore2.js': 3254490132,
    'language.js': 3551638980,
    'language.css': 12630153619,
    'internal/admins.js': 3518114731,
    'internal/admins.css': 11599434269,
    'lang': 6868
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
var _rnd = 9714;