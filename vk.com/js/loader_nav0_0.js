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
    'login($|/)': ['al_login.php', ['login.css']],
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
    'common.css': 29989691761,
    'cmodules/web/common_web.js': 2,
    'retina.css': 2633262011,
    'uncommon.js': 1640247993,
    'uncommon.css': 11552859075,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 436027221,
    'lite.css': 36731131061,
    'rtl.css': 12219697143,
    'pagination.js': 1027022568,
    'blog.css': 13986386882,
    'blog.js': 1358605934,
    'html5audio.js': 976782859,
    'audioplayer.js': 6899828691,
    'audioplayer.css': 15185173809,
    'audio_html5.js': 287741914,
    'audio.js': 3202340255,
    'audio.css': 19142541117,
    'gifts.css': 17122131500,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 15009694135,
    'boxes.css': 13407180067,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 2760545978,
    'tooltips.css': 13398351655,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'cmodules/web/photos_module.js': 8423613376,
    'photo_tagger_mode.js': 2604367346,
    'photoview.js': 1772679052,
    'photoview.css': 22842753505,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 12824921027,
    'spe.js': 2562549032,
    'friends.js': 140439177,
    'friends.css': 15738856305,
    'friends_search.js': 3438694410,
    'friends_search.css': 1694758778,
    'board.js': 3844907940,
    'board.css': 17453273422,
    'photos.css': 21271168141,
    'photos.js': 3151850036,
    'photos_add.css': 21868565534,
    'photos_add.js': 1811822476,
    'wkpoll.js': 534542755,
    'wkview.js': 3330037574,
    'wkview.css': 19598337947,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 1924568890,
    'video.css': 17913381434,
    'videocat.js': 3590298689,
    'videocat.css': 19576824421,
    'videoview.js': 19933334038,
    'videoview.css': 17702505323,
    'video_edit.js': 2135196486,
    'video_edit.css': 19271496049,
    'video_upload.js': 210793097,
    'video_youtube.js': 458412745,
    'video_youtube.css': 11119040621,
    'videoplayer.js': 88022945353,
    'videoplayer.css': 35140947909,
    'translation.js': 2188856658,
    'translation.css': 13375627208,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 15001767084,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 11878073801,
    'index.js': 356147149,
    'join.css': 14058611479,
    'join.js': 4281861549,
    'intro.css': 14578068071,
    'post.css': 12245300276,
    'module.css': 12434348018,
    'owner_photo.js': 3401070266,
    'owner_photo.css': 17131493080,
    'page.js': 3113648224,
    'page.css': 25396052191,
    'page_help.css': 16262647131,
    'public.css': 21877438063,
    'public.js': 1344775948,
    'pages.css': 16710185543,
    'pages.js': 1162259210,
    'groups.css': 21538356180,
    'groups.js': 2855040531,
    'groups_list.js': 3507753248,
    'groups_edit.css': 27800142787,
    'groups_edit.js': 2656103,
    'profile.css': 12737501046,
    'profile.js': 610604261,
    'calendar.css': 16391511272,
    'calendar.js': 4203451993,
    'wk.css': 14833177888,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 3191664136,
    'tagger.css': 16226567259,
    'qsearch.js': 4098038985,
    'wall.css': 18740760679,
    'wall.js': 2566474011,
    'walledit.js': 2501406680,
    'thumbs_edit.css': 11702787635,
    'thumbs_edit.js': 1864853921,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 119418466856,
    'imn.js': 149856246600,
    'im.js': 1322065005,
    'emoji.js': 1774603029,
    'wide_dd.css': 14228396392,
    'wide_dd.js': 452755344,
    'writebox.css': 14654995367,
    'writebox.js': 14492627257,
    'sharebox.js': 3977597905,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 1726814941,
    'feed.css': 13010447259,
    'privacy.js': 3620108221,
    'privacy.css': 11902211743,
    'apps.css': 29143736523,
    'apps.js': 1252591207,
    'apps_edit.js': 3639353527,
    'apps_edit.css': 26383984944,
    'apps_check.js': 3204387834,
    'apps_check.css': 21570357335,
    'settings.js': 1674416369,
    'settings.css': 21242799944,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 13537695811,
    'profile_edit_edu.js': 4232181712,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 4279649652,
    'search.css': 22758065894,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 1643414770,
    'suggester.js': 1049909811,
    'datepicker.js': 4265860601,
    'datepicker.css': 16646896967,
    'oauth_popup.css': 22457494059,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 16596929318,
    'fave.js': 647565245,
    'fave.css': 18017141966,
    'widget_comments.css': 23896313979,
    'widget_auth.css': 23073637990,
    'widget_community.css': 25349356812,
    'widget_contactus.css': 27870749610,
    'widget_post.css': 22882614186,
    'widget_allow_messages_from_community.css': 26190090836,
    'api/widgets/al_poll.js': 790017760,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 39893216,
    'api/widgets/al_like.js': 2029025800,
    'api/widgets/al_post.js': 3723713031,
    'cmodules/api/widgets/comments.js': 1963238163,
    'cmodules/api/widgets/community.js': 1650887228,
    'cmodules/api/widgets/allow_messages_from_community.js': 618639651,
    'cmodules/api/widgets/app.js': 3131808422,
    'cmodules/api/widgets/auth.js': 2163782307,
    'api/widgets/al_add_community_app.js': 552092634,
    'widget_add_community_app.css': 24323636924,
    'api/widgets/community_messages.js': 909574838,
    'widget_community_messages.css': 27218689096,
    'al_poll.css': 3,
    'widget_recommended.css': 23053790953,
    'widgets.css': 25575044907,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'notifier.js': 29543862373,
    'notifier.css': 16490286708,
    'cmodules/sw/sw.js': 4889939668,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 3799506757,
    'restore.css': 14657636599,
    'docs.js': 995211544,
    'docs.css': 17223372299,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 13531004770,
    'internal/tasks.js': 3155934960,
    'internal/tasks.css': 11726809908,
    'helpdesk.js': 1492079844,
    'helpdesk.css': 16355618036,
    'tickets.js': 3419742811,
    'tickets.css': 17336072864,
    'internal/faq.js': 2622161233,
    'faq.css': 18157622156,
    'talmud.js': 1641838680,
    'agents.js': 2426697933,
    'agents.css': 13713894187,
    'achievements.js': 897703126,
    'achievements.css': 12244423437,
    'sf.css': 14980413612,
    'members.css': 13453657461,
    'meminfo.css': 20143247980,
    'groupinfo.css': 18798274068,
    'bugs.js': 3874995669,
    'bugs.css': 11500684785,
    'bugtracker.js': 216510435,
    'bugtracker.css': 18482719339,
    'login.css': 18217180622,
    'cmodules/web/login.js': 229557255,
    'upload.js': 16891470,
    'upload_photo_transform.js': 1497838791,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 13406179873,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 10963339549,
    'away.css': 16345222622,
    'stats.css': 13708411024,
    'payments.css': 21792901922,
    'payments.js': 301538576,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 18666092813,
    'aes_light.js': 1484013701,
    'ads.css': 18286926884,
    'ads_bonus.css': 1294533291,
    'ads.js': 2039077661,
    'ads_payments.js': 2205910694,
    'ads_edit.css': 11019446586,
    'ads_edit.js': 4001967956,
    'ads_edit_geo.js': 519167575,
    'ads_moder_common.css': 12026741317,
    'ads_moder.css': 11604939887,
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
    'claims.css': 12825272157,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 15060214123,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 11518614018,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 17118256206,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 3589638532,
    'pe.js': 318083439,
    'pe.css': 11419267761,
    'dev.js': 3510788917,
    'dev.css': 30528633805,
    'share.css': 24719614134,
    'stickers_office.css': 13608121020,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 13117213682,
    'print.js': 1255624803,
    'print.css': 13455015048,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 12445699766,
    'ui.js': 3953380422,
    'ui_common.js': 4268023570,
    'ui_common.css': 14395634848,
    'ui_media_selector.js': 512684515,
    'ui_media_selector.css': 16784074257,
    'ui_manual.css': 12697271643,
    'admin.js': 2866808704,
    'admin.css': 15459475317,
    'duty_timetable.js': 1870217086,
    'duty_timetable.css': 17233869118,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 13483977833,
    'exchange.css': 13604617454,
    'exchange.js': 3247888614,
    'exchange_moder.css': 13171188726,
    'exchange_moder.js': 1937742752,
    'ads_offers.css': 14080542485,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 16407228040,
    'landings/vk10_years.css': 12761134160,
    'chronicle.css': 13505325099,
    'market.css': 18949139928,
    'market.js': 3445680238,
    'stories_admin.css': 14824445236,
    'stories_admin.js': 1129028316,
    'vk2016.css': 2021229875,
    'landings/common.css': 16775140975,
    'landings/community_message.css': 12224707651,
    'landings/wdsd.css': 12603708276,
    'landings/smartfeed.css': 926801211,
    'landings/dota.css': 11397420523,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 15497001541,
    'landings/psb.css': 16356980681,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 19503821166,
    'landings/moneysend.css': 13239856937,
    'landings/moneysend.js': 2406210925,
    'landings/desktop_messenger.css': 13295560748,
    'landings/vklive.css': 14061696055,
    'landings/vk2017.css': 12837154181,
    'landings/vkmusic.css': 2781063990,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/vkvalentine.css': 13448502833,
    'landings/vkvalentine.js': 3463861529,
    'landings/ads.css': 15005863289,
    'landing_aes.js': 14694813984,
    'landings/donors_day.css': 15087933836,
    'landing_donors_day.js': 1027075361,
    'landings/testing.css': 13074545687,
    'vkme.css': 13250043088,
    'cmodules/web/vkme-desktop.js': 5837370790,
    'ui_controls.js': 2872214892,
    'highcharts.js': 1982709850,
    'ui_controls.css': 14470279767,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2858461320,
    'places.js': 592992591,
    'places.css': 15646490536,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'paginated_table.js': 1750088857,
    'paginated_table.css': 13461653824,
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
    'snapster/style.css': 17623484295,
    'snapster/page.js': 2845116435,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 699865637,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 3582987504,
    'snapster/modules.js': 1096919680,
    'snapster/snapster.css': 18865742368,
    'snapster/mob_templates.js': 616353024,
    'snapster/snapster_mobile.js': 300135426,
    'snapster/snapster_mobile.css': 16075440365,
    'snapster/templates.js': 417248447,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 16052863834,
    'top_logo.css': 12144178612,
    'favicon': 6,
    'speech.js': 28783763008,
    'voice_message_player.js': 18549969583,
    'cmodules/web/speech_worker_mp3.js': 1074082218,
    'cmodules/web/speech_worker_opus.js': 2818771805,
    'stories.js': 36161026227,
    'stories.css': 13547598432,
    'internal/nospam.css': 14042689654,
    'internal/away_linksban.css': 11413839588,
    'internal/ui_manual.js': 1761369792,
    'internal/patterns_info.css': 14321168595,
    'article.css': 26237306485,
    'article_editor.css': 23486864342,
    'cmodules/web/article.js': 35745417102,
    'cmodules/web/article_layer.js': 21864639524,
    'article_view.js': 16816539614,
    'internal/cvkmobile.css': 13161249685,
    'internal/cvkmobile.js': 2752055160,
    'shortener.js': 16413120,
    'cmodules/web/pretty_cards.js': 124004037,
    'cmodules/web/landing_ads_case.js': 3936066274,
    'cmodules/web/trending_results.js': 1020488162,
    'cmodules/web/page_layout.js': 1172409392,
    'landings/ads_cases.css': 23122252951,
    'surveys.css': 17022795969,
    'surveys.js': 3079369917,
    'landings/author_guide.css': 19122986262,
    'internal/restore2.css': 12279799027,
    'internal/restore2.js': 323808116,
    'language.js': 3551638980,
    'language.css': 13912137666,
    'internal/admins.js': 2810460581,
    'internal/admins.css': 12881418316,
    'cmodules/web/stickers.js': 7998248183,
    'cmodules/web/stickers_office.js': 9963462147,
    'cmodules/web/bodymovin.js': 1520167629,
    'lead_forms_app.js': 11788960687,
    'lead_forms_app.css': 16826674531,
    'internal/stories_admin_panel.css': 11564276146,
    'time_spent.js': 1789786634,
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
        'ny2018.js': 1,
        'groups_edit_stories.js': 1
    }
};
var _rnd = 4675;