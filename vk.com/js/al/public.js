window['public'] = window.Public = {
  toggleFave: function(btn, hash, act, ev) {
    if (cur.toggleFaveAct != undefined) {
      act = cur.toggleFaveAct;
    }
    ajax.post('fave.php', {act: act ? 'a_add_group' : 'a_delete_group', gid: -cur.oid, hash: hash}, {onDone: function(text) {
      btn.firstChild.nextSibling.innerHTML = text;
      cur.toggleFaveAct = !act;
    }, progress: btn.firstChild});
    cancelEvent(ev);
  },
  switchHelpSteps: function(hash) {
    var m = ge('public_help_steps_module');
    if (!hasClass(m, 'closed')) {
      addClass(m, 'closed');
    } else {
      removeClass(m, 'closed');
    }
    ajax.post('al_public.php', {act: 'a_switch_help_steps', pid: cur.options.public_id, hash: hash}, {onDone: function() {

    }});
  },
  showMapBox: function(address, zoom, link) {
    if (window.showZeroZoneBox && showZeroZoneBox('places', function() {
      Public.showMapBox();
    })) { return; }

    if (!cur.boxForMap) {
      var boxOptions = {
        bodyStyle: 'padding: 0;',
        width: 597,
        title: address,
        dark: 1,
        onShow: function() { if (cur.boxMap) cur.boxMap.redraw(); }
      };
      cur.boxForMap = showFastBox(boxOptions, '<div class="box_loader"></div>');
      cur.boxForMap.setControlsText('<a href="' + link + '">' + getLang('events_goto_search') + '</a>');
    }
    if (!cur.boxMap) {
      cur.boxForMap.content('<div id="boxMap" style="width: 595px; height: 500px"></div>');
      cur.boxMap = new VkMap(ge('boxMap'), {
        type: 'yandex',
        key: cur.mapKey,
        onReady: function() {
          cur.boxMap.updateAddress({str: address, zoom: zoom});
          cur.boxForMap.setOptions({title: cur.boxMap.getShowAddress()});
          cur.boxMap.updateMap();
        }
      });
    } else {
      cur.boxForMap.show();
    }
  },
  showLinks: function() {
    var b = showBox('/al_public.php', {act: 'a_get_links', pid: cur.options.public_id}, {params:{width:467, dark: 1}});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        nav.reload({noscroll: true});
        cur.reloadAfterClose = false;
      }
      return true;
    }});
  },
  showEvents: function(edit) {
    var b = showBox('/al_public.php', {act: 'a_get_events', pid: cur.options.public_id, edit: edit}, {params:{width:467, dark: 1}});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        nav.reload({noscroll: true});
        cur.reloadAfterClose = false;
      }
      return true;
    }});
  },
  showApps: function(edit) {
    var b = showBox('/al_public.php', {act: 'a_get_apps', pid: cur.options.public_id, edit: edit}, {params:{width:467, dark: 1}});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        nav.reload({noscroll: true});
        cur.reloadAfterClose = false;
      }
      return true;
    }});
  },
  otherActs: function(el) {
    clearTimeout(cur.hideOtherTimer);
    if (!el) return false;
    el.blur();
    var acts = ge('page_other_acts');
    if (isVisible(acts)) {
      return false;
    }
    acts.style.marginLeft = '-1px';
    acts.style.marginTop = '-21px';
    show(acts);
    return false;
  },
  hideOther: function(timeout) {
    if (timeout > 0) {
      cur.hideOtherTimer = setTimeout(cur.hideOther, timeout);
    } else {
      var acts = ge('page_other_acts');
      if (timeout == -1) {
        hide(acts);
      } else {
        fadeOut(acts, 200);
      }
    }
  },

  updateBlock: function(blockId, html, js) {
    blockId = ge(blockId);
    if (!blockId || !html) {
      return;
    }
    domPN(blockId).replaceChild(domFC(ce('div', {innerHTML: html})), blockId);
    eval('(function(){' + js + ';})()');
  },

  changeLikeBox: function(from, to) {
    from = ge(from); to = ge(to);
    var oldH = getSize(from)[1], newH = getSize(to)[1];
    setStyle('public_like_module', {height: oldH});
    setStyle(from, {position: 'absolute', zIndex: 0});
    setStyle(to, {opacity: 0, position: 'relative', zIndex: 10});
    show(to);
    animate(to, {opacity: 1}, 200, function() { hide(from); });
    if (oldH != newH) animate('public_like_module', {height: newH}, 200);
  },
  unSubscribe: function() {
    Public.changeLikeBox('unsubscribe', 'subscribe');
    ajax.post('al_public.php', {act:'a_leave', pid:cur.options.public_id, hash:cur.options.enterHash}, {
      onDone: Public.updateBlock
    });
    return false;
  },
  subscribe: function() {
    Public.changeLikeBox('subscribe', 'unsubscribe');
    ajax.post('al_public.php', {act:'a_enter', pid:cur.options.public_id, hash:cur.options.enterHash}, {
      onDone: Public.updateBlock,
      onFail: function(text) {
        if (!text) return;
        showFastBox({title: getLang('global_error'), onHide: nav.reload, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
        return true;
      }
    });
    return false;
  },
  actionsDropdown: function() {
    show('public_actions_wrap');
    if (cur.options.feedLists && cur.feedListsSet === undefined) {
      Public.feedListsGetSettings();
      show('public_actions_item_feed_lists');
    }
  },
  actionsDropdownHide: function(force) {
    if (force === 1) return hide('public_actions_wrap');
    clearTimeout(cur.actDdHide);
    cur.actDdHide = setTimeout(function() {
      fadeOut('public_actions_wrap', 200);
    }, 150);
  },
  actionsDropdownUnhide: function() {
    clearTimeout(cur.actDdHide);
  },
  feedListsGetSettings: function(callback) {
    ajax.post('al_feed.php', {act: 'a_get_lists_by_item', item_id: -cur.options.public_id}, {onDone: function(data) {
      cur.feedListsSet = data;
      cur.feedListsChanges = {};
      if (isFunction(callback)) {
        callback();
      }
    }});
  },
  feedListsDDShow: function(loaded) {
    var obj = ge('public_actions_item_feed_lists');
    addClass(obj, 'public_actions_item_unfolded');
    if (ge('public_feed_lists')) {
      if (loaded && cur.feedListsSet) {
        for (var i in cur.feedListsSet) {
          if (cur.feedListsSet[i])
            addClass('public_feed_item'+i, 'checked');
        }
        return;
      }
      clearTimeout(cur.feedListsDDHide);
      show('public_feed_lists');
      return;
    }
    if (cur.feedListsSet === undefined) {
      Public.feedListsGetSettings(Public.feedListsDDShow.pbind(true));
    }

    var elems = [];
    for (var i in cur.options.feedLists) {
      var lname = cur.options.feedLists[i];
      if (lname.length > 20) {
        lname = trim(lname.substr(0, 18))+'...';
      }
      elems.push('<a id="public_feed_item'+i+'" class="public_actions_item public_feed_item'+(cur.feedListsSet && cur.feedListsSet[i] ? ' checked' : '')+'" onclick="Public.feedListsCheck(this, '+i+');">'+lname+'</a>');
    }
    elems = se('<div id="public_feed_lists" onmouseover="Public.feedListsDDShow();">'+elems.join('')+'</div>');
    obj.parentNode.appendChild(elems);
  },
  feedListsDDHide: function() {
    clearTimeout(cur.frListsDDHide);
    cur.feedListsDDHide = setTimeout(function() {
      hide('public_feed_lists');
      removeClass('public_actions_item_feed_lists', 'public_actions_item_unfolded');
    }, 150);
  },
  feedListsCheck: function(obj, listId) {
    var checked = hasClass(obj, 'checked');
    if (checked) {
      cur.feedListsSet[listId] = 0;
      cur.feedListsChanges[listId] = -1;
    } else {
      cur.feedListsSet[listId] = 1;
      cur.feedListsChanges[listId] = 1;
    }

    (checked ? removeClass : addClass)(obj, 'checked');
    if (cur.feedListsTO) {
      clearTimeout(cur.feedListsTO);
    }
    var ids = [];
    for (var i in cur.feedListsChanges) {
      ids.push(cur.feedListsChanges[i] * i);
    }
    if (!ids.length) return;
    cur.feedListsTO = setTimeout(function() {
      ajax.post('al_feed.php', {act: 'a_toggle_lists', item_id: -cur.options.public_id, lists_ids: ids.join(','), hash: cur.options.feedListsHash}, {onDone: function() {
        cur.feedListsChanges = {};
      }});
    });
  },
  sharePage: function(pid, hash) {
    ajax.post('al_public.php', {act:'a_share', pid:pid, hash: hash}, {onDone: function(res) {
      ge('unshare').innerHTML = res;

      Public.changeLikeBox('unsubscribe', 'unshare');
    }, showProgress: function() {
      hide('share_page_link');
      show('share_page_progress');
    }, hideProgress: function() {
      hide('share_page_progress');
      show('share_page_link');
    }});
  },
  unsharePage: function(pid, post_id, hash) {
    ajax.post('al_public.php', {act:'a_unshare', pid:pid, post_id:post_id, hash: hash}, {onDone:function(res) {
      Public.changeLikeBox('unshare', 'unsubscribe');
    }, showProgress: function() {
      hide('unshare_page_link');
      show('unshare_page_progress');
    }, hideProgress: function() {
      hide('unshare_page_progress');
      show('unshare_page_link');
    }});
  },
  friendsBox: function() {
    showBox('al_page.php', {act: 'box', oid: -cur.options.public_id, tab: 'friends'}, {cache: 1});
  },

  createLike: function(el, options) {
    el = ge(el);
    if (!el) return;
    el.onclick = public.subscribe;
    /*
    var defaults = {
      text: 'Мне нравится',
      align: 'left'
    }
    var o = extend(defaults, options);

    var cl = o.checked ? ' checked' : '';
    el.innerHTML = '<div class="like_dived like_dived_full clear_fix"><div style="width:100%" class="like_inline'+(o.align=='right'?' fl_r':(o.align=='left'?' fl_l':''))+'"><div class="like_wrap like_wrap_h22 fl_l'+cl+'" onclick="return Public.likeClick(event);" onmouseover="Public.likeOver();" onmouseout="Public.likeOut();"><div class="like_left"><div class="like_left_border"><div class="icon iconV"></div><div class="icon iconHeart"></div></div></div><div class="like_right clearFix"><div class="like_right_border fl_l">'+o.text+'</div></div><div class="clear like_bottom_shadow"></div></div></div></div>';
    if (o.align == 'center') {
      var box = geByClass('like_wrap', el)[0], inl = geByClass('like_inline', el)[0], sBox = getSize(box), sInl = getSize(inl);
      setStyle(box, {left:Math.floor((sInl[0] - sBox[0])/2)});
    }

    cur.likeButton = {o: o, wr: geByClass('like_wrap', el)[0], el: el};*/
  },

  showEdit: function(tab) {
    if (cur.tab == 'edit_module_tab') return;
    hide('public_edit_link'); show('public_edit_progress');
    var self = this;
    ajax.post('al_public.php', {act: 'a_settings', pid: cur.options.public_id}, {onDone: function(html, headers, js, extra) {
      hide('public_edit_progress');
      //setStyle(ge('edit_module_tab'), {height:getSize(ge('info_module_tab'))[1]});
      ge('edit_module_tab').innerHTML = html;
      ge('extra_module_tab').innerHTML = extra;
      eval(js);
      extend(cur.tabHeaders, headers);
      var onEnd = function() { show('public_edit_link');  setStyle(ge('info_module_wrap'), {borderBottomWidth:'1px'}); };
      if (!tab) {
        self.switchTab('edit_module_tab', onEnd);
      } else {
        self.switchTab('edit_module_tab', cur.showList.pbind(tab, onEnd));
      }
    }});
  },
  switchTab: function(tab, onEnd, onHeader) {
    if (!cur.tab) cur.tab = 'info_module_tab';
    if (cur.tab == tab) return;
    var w = ge('info_module_wrap'), c = ge('info_module_cont');
    if (tab == 'info_module_tab') setStyle(w, {borderBottomWidth:'0px'});
    var hideTabs = browser.msie7 || browser.msie6;

    var pos = {'info_module_tab':0, 'edit_module_tab':-397, 'list_module_tab':-794, 'extra_module_tab':-794};
    var urls = {'info_module_tab':'', 'edit_module_tab':'?act=edit', 'list_module_tab':'?act=edit&list='+cur.options.list, 'extra_module_tab':'?act=edit&extra=1'};
    var t1 = ge(cur.tab), t2 = ge(tab), back = (pos[tab] > pos[cur.tab]);
    var h1 = getSize(t1)[1];

    if (tab == 'list_module_tab') {
      show('list_module_tab');
      setStyle(t2, {height:h1-1});
    }

    if (tab == 'extra_module_tab') {
      hide('list_module_tab');
    }

    //setStyle(w, {height:h1});
    //if (!back) setStyle(t2, {height:'auto'});
    if (hideTabs) {
      setStyle(c, {height:getSize(w)[1]});
      setStyle(w, {position:'absolute'});
    }
    setStyle(t2, {visibility:'visible'});
    var h2 = getSize(t2)[1];
    //setStyle(t2, {height:h1});
    //setStyle(w, {height:'auto'});

    //setStyle(ge('info_module_header'), {height:getSize(ge('info_module_header'))[1]});
    ge('info_module_header_content').innerHTML = cur.tabHeaders[tab];
    //var hh = getSize(ge('info_module_header_content'))[1];

    ge('public_manage_page_link').innerHTML = cur.tabActions[tab];

    var to = (tab == 'info_module_tab' || cur.tab == 'info_module_tab') ? 0 : 300;

    if (onHeader) onHeader();
    animate(ge('info_tabs'), {left:pos[tab]}, to, function() {
      //animate(ge('info_module_header'), {height:hh}, 100);
      var inc = h2 > h1;
      //if (back) setStyle(t1, {height:1});
      if (hideTabs) {
        setStyle(w, {position:'static'});
        setStyle(c, {height:'auto'});
      }
      setStyle(t1, {visibility:'hidden'});
      if (inc == !back && h1 != h2) {
        //animate(t2, {height:h2}, 150, function() {
          //setStyle(t2, {height:'auto'});
          if (onEnd) onEnd();
          /*
          if (browser.chrome) { //weird bug
            setStyle(t2, {paddingTop:1});
            setTimeout(setStyle.pbind(t2, {paddingTop:0}), 0);
          }
          */
        //});
      } else {
        if (back && tab == 'edit_module_tab') {
          //setStyle(t2, {height:'auto'});
        }
        if (onEnd) onEnd();
      }
      cur.tab = tab;
      nav.setLoc((cur.options.public_link.replace(/^\//, ''))+urls[tab]);
    });
    return false;
  },
  editEvent: function(pid, eid, hash) {
    var b = showBox('al_page.php', {act:'a_edit_event_box', pid:pid}, {params: {bodyStyle: 'position: relative;',  width: 418, dark: 1}});
  },
  deleteEvent: function(pid, eid, hash) {
    cur.reloadAfterClose = true;
    ajax.post('al_public.php', {act:'a_delete_event', pid:pid, eid:eid, hash:hash}, {onDone: function(res){
      curBox().content(res);
    }});
  },
  showInput:function(el) {
    el = el.parentNode;
    addClass(el, 'unshown');
    var input_wrap = geByClass('input_wrap', el.parentNode)[0];
    removeClass(input_wrap, 'unshown');
    geByClass('text', input_wrap)[0].focus();
  },
  hideInput: function(el, val) {
    return;
  },
  searchApp: function(page, onSearch) {
    if (page == cur.lastLink) return;
    ajax.post('al_public.php', {act:'a_search_app', pid:cur.options.public_id, page:page}, {onDone:function(err, aid, img, info, hash, newHref) {
      if (err) {
        ge('public_app_error_msg').innerHTML = err;
        cur.appId = false;
        return;
      }
      cur.appHash = hash;
      cur.appId = aid;
      ge('public_app_error_msg').innerHTML = '';
      ge('public_app_image').innerHTML = img;
      ge('public_app_info').innerHTML = info;
      if (newHref !== undefined) {
        ge('public_app_address').value = newHref;
      }
      if (onSearch) onSearch(err);
    }});
  },
  showPlaces: function(edit) {
    var b = showBox('al_public.php', {act: 'a_get_places', pid: cur.options.public_id, edit: edit}, {
      params: {width: 467, progress: 'qwerty', dark: 1},
      stat: ['ui_controls.js', 'ui_controls.css']
    });
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        nav.reload({noscroll: true});
        cur.reloadAfterClose = false;
      }
      return true;
    }});
  },
  addPlace: function(pid) {
    var b = showBox('al_page.php', {act: 'a_edit_place_box', gid: pid}, {
      stat: ['maps.js', 'ui_controls.js', 'ui_controls.css', 'selects.js'],
      dark: 1
    });
  },
  deletePlace: function(pid, place_id, hash) {
    if (isVisible(curBox().progess)) {
      return;
    }
    cur.reloadAfterClose = true;
    curBox().showProgress()
    ajax.post('al_page.php', {act:'a_delete_place', gid:pid, place_id:place_id, hash:hash}, {
      progress: curBox().progress,
      onDone: function(res) {
        curBox().content(res);
        curBox().hideProgress()
      }
    });
  },
  rssImport: function() {
    var box = showBox('al_public.php', {act: 'set_rss_import_box', pid: cur.oid}, {params: {width: 410}});
    box.removeButtons();
    box.addButton(getLang('global_cancel'), box.hide, 'no');
    box.addButton(getLang('global_save'), function() {
      ajax.post('al_public.php', {act: 'a_set_rss_import', pid: cur.oid, url: ge('rss_import_url').value, hash: ge('rss_import_hash').value}, {onDone: function(tag) {
        ge('public_import_rss_tag').innerHTML = tag;
      }});
      box.hide();
    }, 'yes');
  },

  init: function(options) {
    extend(cur, {
      oid: -options.public_id,
      module: 'public',
      options: options,
      postTo: -options.public_id,
      mid: -options.public_id,
      editing: false,
      hideOther: Public.hideOther,
      otherActs: Public.otherActs,
      tabHeaders: options.info_headers,
      tabActions: options.tab_actions,
      otherCount: options.otherCount,
      _back: {show: [], hide: [], text: options.back}
    });

    if (ge('public_wall')) {
      wall.init(extend(options, {automore: 1}));
    }

    this.createLike(ge('subscribe_button'), {onClick:function(){}, align:'center', checked:options.liked});
  },

  toggleRss: function(obj, gid, hash, ev) {
    obj.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_groups.php', {act: 'a_toggle_rss', gid: gid, hash: hash}, {
      onDone: function(txt) {
        obj.innerHTML = txt;
      }
    });
  },

  toggleTop: function(obj, gid, hash, ev, nocis) {
    obj.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_groups.php', {act: 'a_toggle_top', gid: gid, hash: hash, nocis: nocis}, {
      onDone: function(txt) {
        obj.innerHTML = txt;
      }
    });
  },
  toggleBrand: function(obj, gid, hash, ev) {
    obj.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_groups.php', {act: 'a_toggle_brand', gid: gid, hash: hash}, {
      onDone: function(txt) {
        obj.innerHTML = txt;
      }
    });
  },
  toggleStickers: function(obj, gid, hash, ev) {
    obj.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_groups.php', {act: 'a_toggle_stickers', gid: gid, hash: hash}, {
      onDone: function(txt) {
        obj.innerHTML = txt;
      }
    });
  },
  uploadPhotos: function(el, event) {
    var hasHTML5 = (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));

    if (!hasHTML5 || !event) {
      return nav.go(el, event);
    }
    if (checkEvent(event)) {
      return true;
    }

    cur.onPhotoInputChange = function(files) {
      window.filesToUpload = files;
      return nav.go(el, event);
    }

    var input = ge('page_upload_photos_input');
    if (!input) {
      input = se('<input id="page_upload_photos_input" class="file page_upload_photos_input" type="file" onchange="cur.onPhotoInputChange(this.files);" multiple="true" accept="image/jpeg,image/png,image/gif" name="photo" />')
    }

    input.click(event);
    return false;
  }
};


window.showMapBox = Public.showMapBox;

function initPublicNewSection(options) {
extend(cur, {
  newPageSubmit: function(el) {
    var name = trim(ge('new_public_name').value);
    if (!name) { notaBene('new_public_name'); return; }
    var publicType = ge('new_public_type').value;
    if (publicType < 0) {
      ge('new_public_error').innerHTML = getLang('public_new_no_type_error');
      show('new_public_error_wrap');
      return;
    }
    var publicConfirm = ge('new_public_confirm').value;
    if (!publicConfirm) {
      ge('new_public_error').innerHTML = getLang('public_new_no_agreement_error');
      show('new_public_error_wrap');
      return;
    }
    lockButton(el);
    ajax.post('al_public.php', {act:'a_new', name:name, type:publicType, hash:options.hash}, {
      onDone: function(pid){
        unlockButton(el);
      },
      onFail: function(error){
        unlockButton(el);
        if (error) {
          ge('new_public_error').innerHTML = error;
          show('new_public_error_wrap');
          return true;
        }
      }
    });
  }
});
}

var PagedList = function(container, data, options) {
  var isEqual = function(a, b){
    if(!isArray(a) || !isArray(b))return a == b;
    for(var i = 0; i < a.length; ++i){
      if(a[i] != b[i])return false;
    }
    return true;
  }

  var isEmpty = function(a){
    if(!a)return true;
    for(var i = 0; i < a.length; ++i){
      if(a[i])return false;
    }
    return true;
  }

  function cloneAr(a) {
    var b = [];
    for (var i = 0; i < a.length; ++i) {
      b[i] = a[i];
    }
    return b;
  }

  var defaults = {
    getRow: function(row) { return ''; },
    setPages: function(page, pages, side) { },
    filter: function(search, row) { return true; },
    perPage: 30,
    emptyRow: function(search){return '<div>no rows</div>';}
  };
  options = options ? extend(defaults, options) : defaults;

  this.data = data;
  var filtered_data = [];
  for (var i = 0; i < data.length; ++i) {
    filtered_data.push(data[i]);
  }

  var current_search = [];
  var current_page = 0;

  this.setData = function(data){
    this.data = data;
    this.getPage(0, current_search, true);
  }

  var getRow = options.getRow.bind(this);

  this.getPage = function(page, search, force) {
    if(search === undefined)search = current_search;
    if(current_page == page && isEqual(search, current_search) && !force) return;
    current_page = page;
    if(options.onStart)options.onStart();
    if (!isEqual(search, current_search)) {
      current_search = cloneAr(search);
      filtered_data = [];
      for (var i = 0; i < this.data.length; ++i) {
        if(!search || options.filter(search, this.data[i]))filtered_data.push(this.data[i]);
      }
    }
    if(!filtered_data.length){
      ge(container).innerHTML = options.emptyRow(search);
      options.setPages(0, 0, 'top');
      options.setPages(0, 0, 'bottom');
      return;
    }
    var html = [];
    for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
      var row = filtered_data[i];
      html.push(getRow(row, current_search));
    }
    var h = getSize(ge(container))[1];
    ge(container).innerHTML = html.join('');
    setStyle(ge(container), {height:(page) ? h : 'auto'});
    if(options.onShow){
      for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
        var row = filtered_data[i];
        options.onShow(row, i);
      }
    }
    var pages = Math.ceil(filtered_data.length / options.perPage);
    options.setPages(page, pages, 'top');
    options.setPages(page, pages, 'bottom');
    if(options.onEnd)options.onEnd();
  }

  this.highlight = function(label, term) {
    term = trim(term);
    if(!term)return label;
    label = term.indexOf(' ') == -1 ? label.split(' ') : [label];
    var tmp = '';
    var termRus = parseLatin(term);

    if (termRus != null) {
      term = term + '|' + termRus;
    }
    var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + term.replace('+', '\\+') + "))(?![^<>]*>)(?![^&;]+;)", "gi");
    for (var i in label) {
      tmp += (i > 0 ? ' ' : '') + label[i].replace(re, "$2<em>$3</em>");
    }
    return tmp;
  }
}

window.replaceChars = function(text, nobr) {
  var res = "";
  for (var i = 0; i<text.length; i++) {
    var c = text.charCodeAt(i);
    switch(c) {
      case 0x26: res += "&amp;"; break;
      case 0x3C: res += "&lt;"; break;
      case 0x3E: res += "&gt;"; break;
      case 0x22: res += "&quot;"; break;
      case 0x0D: res += ""; break;
      case 0x0A: res += nobr?"\t":"<br>"; break;
      case 0x21: res += "&#33;"; break;
      case 0x27: res += "&#39;"; break;
      default:   res += ((c > 0x80 && c < 0xC0) || c > 0x500) ? "&#"+c+";" : text.charAt(i); break;
    }
  }
  return res;
};


try{stManager.done('public.js');}catch(e){}
