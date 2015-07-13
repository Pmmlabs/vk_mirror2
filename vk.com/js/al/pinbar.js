if (!window._iconAdd) window._iconAdd = (window.devicePixelRatio >= 2 ? '_2x' : '');
window.initPinBar = function(profile, mail, lng) {
  if ( !navigator.userAgent.toLowerCase().match(/msie (9|10)(\.?[0-9]*)*/) ) {
    return;
  }
  window.lang = extend(window.lang || {}, lng);

  var options = {
    applicationName: getLang('global_vkontakte'),
    startURL: '/feed',
    shortcutIcon: '/images/icons/' + (vk.intnat ? 'pinbar_favicon_vk' :'pinbar_faviconnew') + '.ico',
    taskIcon: '/images/' + (vk.intnat ? 'favicon_vk' :'faviconnew') + _iconAdd + '.ico',
    tasks: [
      { name: getLang('left_mynews'),  action: '/feed'},
      { name: getLang('left_mymessages'),  action: mail || '/im'},
      { name: getLang('left_myfriends'),  action: '/friends'},
      { name: getLang('left_mypage'),  action: profile || '/al_profile.php'}]
  };

  var lib = {
    meta: function(name, content) {
      return se('<meta name="'+name+'" content="'+content+'" />');
    },
    link: function(rel, href) {
      return se('<link rel="'+rel+'" href="'+href+'" />');
    }
  };

  try {
    var ext = window.external;
    bodyNode.onfocus = ext.msSiteModeClearIconOverlay();
    ext.msSiteModeCreateJumpList(getLang('global_vkontakte'));
    ext.msSiteModeClearJumpList();
    for ( var i = 0, task; i < options.tasks.length; i++ ) {
      task = options.tasks[i];
      ext.msSiteModeAddJumpListItem(task.name, task.action, options.taskIcon);
    }
    ext.msSiteModeShowJumpList();
  } catch(e) {
    try { console.error(e); } catch (e2) {}
  }

  setFavIcon(options.shortcutIcon, true);

  try {
    headNode.appendChild( lib.meta('application-name', options.applicationName) );
    headNode.appendChild( lib.meta('msapplication-starturl', options.startURL) );
  } catch (e) {
    try { console.error(e); } catch (e2) {}
  }
}

try{stManager.done('pinbar.js');}catch(e){}
