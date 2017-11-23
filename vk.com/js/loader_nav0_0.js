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
    'common.js': 1160,
    'common.css': 27642575865,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 17315792024,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 2838965320,
    'lite.css': 39994360999,
    'rtl.css': 15208989910,
    'pagination.js': 1027022568,
    'blog.css': 17346308967,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 16862091001,
    'audioplayer.js': 3876525056,
    'audioplayer.css': 18174466576,
    'audio_html5.js': 287741914,
    'audio.js': 422264092,
    'audio.css': 22210201748,
    'gifts.css': 20111424267,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 17998986902,
    'boxes.css': 16396472834,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 3538576869,
    'tooltips.css': 19582727277,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 15647633591,
    'photoview.js': 4178906126,
    'photoview.css': 19757908981,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 15814213794,
    'spe.js': 3760998372,
    'friends.js': 140439177,
    'friends.css': 17066213687,
    'friends_search.js': 964151048,
    'friends_search.css': 1694758778,
    'board.js': 3924396132,
    'board.css': 23637649044,
    'photos.css': 19203710797,
    'photos.js': 152064977,
    'photos_add.css': 21025880058,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2033072125,
    'wkview.css': 23922616287,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 2585777191,
    'video.css': 22578930679,
    'videocat.js': 1618923991,
    'videocat.css': 18636631957,
    'videoview.js': 2998929246,
    'videoview.css': 24577575448,
    'video_edit.js': 2135196486,
    'video_edit.css': 19114180412,
    'video_upload.js': 812506149,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 14108333388,
    'videoplayer.js': 75991609413,
    'videoplayer.css': 31446188556,
    'translation.js': 51041194,
    'translation.css': 17272312728,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 17991059851,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 14867366568,
    'index.js': 3228561433,
    'join.css': 17047904246,
    'join.js': 4281861549,
    'intro.css': 17373759487,
    'post.css': 19137397716,
    'module.css': 18618723640,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 20120785847,
    'page.js': 3114286438,
    'page.css': 19568995690,
    'page_help.css': 22447022753,
    'public.css': 21122032298,
    'public.js': 1344775948,
    'pages.css': 21034463883,
    'pages.js': 1162259210,
    'groups.css': 23291926522,
    'groups.js': 2855040531,
    'groups_list.js': 3507753248,
    'groups_edit.css': 31006872705,
    'groups_edit.js': 3566441099,
    'profile.css': 24336404282,
    'profile.js': 610604261,
    'calendar.css': 19380804039,
    'calendar.js': 4203451993,
    'wk.css': 21017553510,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 19215860026,
    'qsearch.js': 4098038985,
    'wall.css': 25050336652,
    'wall.js': 3588967340,
    'walledit.js': 865374414,
    'thumbs_edit.css': 14498479051,
    'thumbs_edit.js': 1864853921,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 117014689418,
    'imn.js': 132379391846,
    'im.js': 1322065005,
    'emoji.js': 700456431,
    'wide_dd.css': 17217689159,
    'wide_dd.js': 452755344,
    'writebox.css': 17644288134,
    'writebox.js': 58662822907,
    'sharebox.js': 2160209921,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 981913053,
    'feed.css': 23493857343,
    'privacy.js': 3620108221,
    'privacy.css': 17057617412,
    'apps.css': 30770501675,
    'apps.js': 2557736709,
    'apps_edit.js': 2247867637,
    'apps_edit.css': 26068571428,
    'apps_check.js': 3844411974,
    'apps_check.css': 24003329006,
    'settings.js': 2479542142,
    'settings.css': 22951887042,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 16526988578,
    'profile_edit_edu.js': 174903945,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 695974096,
    'search.css': 28138557628,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1049909811,
    'datepicker.js': 1574876075,
    'datepicker.css': 19761390085,
    'oauth_popup.css': 28182914992,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 22781304940,
    'fave.js': 128270649,
    'fave.css': 21969790452,
    'widget_comments.css': 29282292703,
    'widget_auth.css': 28459616714,
    'widget_community.css': 30618202462,
    'widget_contactus.css': 33256728334,
    'widget_post.css': 28268592910,
    'widget_allow_messages_from_community.css': 31576069560,
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
    'widget_add_community_app.css': 29709615648,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 29339183719,
    'al_poll.css': 3,
    'widget_recommended.css': 28439769677,
    'widgets.css': 30961023631,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 78098033139,
    'notifier.css': 25006553923,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 118430100,
    'restore.css': 17821538453,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 875239394,
    'docs.css': 23407747921,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 16520297537,
    'tasks.js': 4178217651,
    'tasks.css': 14271929424,
    'helpdesk.js': 882017110,
    'helpdesk.css': 21409177474,
    'tickets.js': 4198914222,
    'tickets.css': 21590224630,
    'faq.js': 2841473572,
    'faq.css': 19255156530,
    'talmud.js': 1641838680,
    'agents.js': 1999819841,
    'agents.css': 16703186954,
    'achievements.js': 897703126,
    'achievements.css': 15233716204,
    'sf.css': 15833165041,
    'members.css': 16442950228,
    'meminfo.css': 18503304145,
    'groupinfo.css': 19162962948,
    'bugs.js': 3874995669,
    'bugs.css': 14489977552,
    'bugtracker.js': 69564442,
    'bugtracker.css': 26274589096,
    'login.css': 17682837405,
    'login.js': 3551917100,
    'upload.js': 16891470,
    'upload_photo_transform.js': 1228329948,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 19590555495,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 13952632316,
    'away.css': 18737358974,
    'stats.css': 16697703791,
    'payments.css': 20680225347,
    'payments.js': 786492642,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 25368098518,
    'aes_light.js': 3306454788,
    'ads.css': 25775786205,
    'ads_bonus.css': 460482192,
    'ads.js': 1908075671,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 14008739353,
    'ads_edit.js': 1067782254,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 15016034084,
    'ads_moder.css': 14337643945,
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
    'claims.css': 15814564924,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 18049506890,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 14507906785,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 21442534546,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 14408560528,
    'dev.js': 2143073519,
    'dev.css': 34275982698,
    'share.css': 30105592858,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 16106506449,
    'print.js': 1255624803,
    'print.css': 16444307815,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 15434992533,
    'ui.js': 3953380422,
    'ui_common.js': 3700204219,
    'ui_common.css': 15664226949,
    'ui_media_selector.js': 1634680349,
    'ui_media_selector.css': 19190748693,
    'ui_manual.css': 15686564410,
    'admin.js': 2866808704,
    'admin.css': 18448768084,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 20223161885,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 16473270600,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 16160481493,
    'exchange_moder.js': 971790892,
    'ads_offers.css': 17069835252,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 19396520807,
    'landings/vk10_years.css': 15750426927,
    'chronicle.css': 15951285266,
    'market.css': 22180508497,
    'market.js': 1427771939,
    'stories_admin.css': 14093466795,
    'stories_admin.js': 2465269552,
    'vk2016.css': 2369321949,
    'landings/common.css': 21077245412,
    'landings/community_message.css': 15214000418,
    'landings/wdsd.css': 19336621223,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 14386713290,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 18486294308,
    'landings/psb.css': 20434474613,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 22739387639,
    'landings/moneysend.css': 17863859643,
    'landings/desktop_messenger.css': 16284853515,
    'landings/vklive.css': 14748992795,
    'landings/vk2017.css': 15826446948,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 18102475270,
    'landing_aes.js': 14740012721,
    'landings/donors_day.css': 18077226603,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 16063838454,
    'vkme.css': 18410072177,
    'cmodules/web/vkme-desktop.js': 4936530422,
    'ui_controls.js': 2713858100,
    'highcharts.js': 1982709850,
    'ui_controls.css': 17448089258,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 17756812113,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1750088857,
    'paginated_table.css': 16450946591,
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
    'snapster/style.css': 17641423762,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 2917617036,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 19083551715,
    'snapster/mob_templates.js': 800413458,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 19064733132,
    'snapster/templates.js': 1084088730,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 19042156601,
    'top_logo.css': 15133471379,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 22861000893,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 18597817533,
    'stories.css': 18153817934,
    'internal/nospam.css': 18036885035,
    'internal/away_linksban.css': 14403132355,
    'internal/ui_manual.js': 4115291397,
    'internal/patterns_info.css': 16584195252,
    'article.css': 26215032049,
    'article_editor.css': 25376472805,
    'cmodules/web/article.js': 15410160110,
    'internal/cvkmobile.css': 16150542452,
    'internal/cvkmobile.js': 3588813277,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 3239185360,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'landings/ads_cases.css': 26111545718,
    'surveys.css': 24463595500,
    'surveys.js': 3382685824,
    'landings/author_guide.css': 27072118525,
    'internal/restore2.css': 16660980997,
    'internal/restore2.js': 3254490132,
    'language.js': 3551638980,
    'language.css': 16901430433,
    'internal/admins.js': 2810460581,
    'internal/admins.css': 15870711083,
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
        'lead_forms_app.js': 1,
        'stories.js': 1,
        'grid_sorter2.js': 1,
        'mr_truth.js': 1,
        'rich_dropdown.js': 1
    }
};
var _rnd = 3363;