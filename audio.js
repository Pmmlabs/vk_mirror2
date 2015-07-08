
var posting = false;
function postAudioOnWall(hash, to_id, audio_id) {
  if (posting) {
    return;
  }
  posting = true;
  var callback = function(obj, text) {
    var r = eval('('+text+')');
    posting = false;
    if (r.url) {
      window.location = r.url;
    }
  }
  var params = {act: 'a_post_wall', hash: hash, to_id: to_id, media:'audio', media_id: audio_id, redirect:1};
  var stop = function(obj, text) {
    posting = false;
  }
  var options = {onSuccess: callback, onFail: stop, onCaptchaShow: stop, onCaptchaHide: stop};
  Ajax.Send('wall.php', params, options);
}

function addAudio(el, params) {
	var aid = params.aid;
	if(!aid)return;
	ge('actionError'+aid).style.display = 'none';
	ge('actionMessage'+aid).style.display = 'none';
  Ajax.Send('audio.php', params, {onSuccess:function(res, text) {
		var container = el.parentNode;
		el.parentNode.innerHTML = text;
		dispatchIntro(6, {el: ge('actions'+aid)});
	}, onFail:function(res, text) {
		if(text){
			ge('actionError'+aid).style.display = 'block';
			ge('actionError'+aid).innerHTML = text;
		}
	}});
}

function addShareAudio(el, aid, oid, hash) {
  Ajax.Send('audio.php', {act:'a_add', aid:aid, oid:oid, hash:hash, share:1}, {
    onSuccess: function(obj, res) {
      var p = el.parentNode;
      data(el, 'tooltip').hide();
      p.innerHTML = '<div class="audio_add over added"></div>';
      el = p.firstChild;
      var showShare = function() {
      showTT(el, LikeTooltip, '', {
        params:{text:res.link_text}, 
        onInit:function(){
          var a = geByClass('lite_cb', this.container)[0];
          addEvent(a, 'click', function(){
            Ajax.Send('audio.php', {act: 'a_share_audio', audio:res.audio, status:res.status, check:isChecked(a)?1:0, hash: res.hash});
          });              
        }});
      }
      addEvent(el, 'mouseover', showShare);
      showShare();
    },
    json: 1
  });
}

var getPageCallback;

function getPage(offset, callback){
  getPageCallback = callback;
  ajaxHistory.go({offset:offset, act:audioData.act, gid:audioData.gid, id:audioData.id, album_id:audioData.aid});
  show('progressTop');
  show('progressBottom');
  return false;
}

function autoPlay(aid) {
  var rows = geByClass('audioRow', ge("audios"));
  for (var i = 0; i < rows.length; i++) {
    if (aid == parseInt(rows[i].id.substr(5))) {
      aid = rows[i].id.substr(5);
      break;
    }
  }
  var a = ge('audio'+aid);
  var btn = ge("imgbutton" + aid);
  if(!a || !btn) return;
  var top = getXY(a)[1] - (window.innerHeight || document.documentElement && document.documentElement.clientHeight || 0) / 2 + getSize(a)[1];
  top = top < 0 ? 0 : top;
  animate(document.getElementsByTagName('html')[0], {scrollTop: top}, 400);
//  a.style.backgroundColor = '#FEFAE4';
  //a.style.borderBottom = '1px solid #FDE021';
//  setTimeout(function(){
//    animate(a, {backgroundColor: '#FFFFFF'/*, borderBottomColor: '#FFFFFF'*/}, 1000);
//  }, 2000);
  btn.onclick();
};

function updatePage(res, text){
  var res = eval('('+text+')');
  AudioObject.stop();
  ge('audios').innerHTML = res.html;
  if(window.sortAudio)sortAudio();
  ge('audio_summary').innerHTML = res.summary;
  ge('header').getElementsByTagName('h1')[0].innerHTML = res.title;
  ge('pagesTop').innerHTML = res.pages;
  ge('pagesBottom').innerHTML = res.pages;
  audioData = res.data;
  var aid = audioData.aid;
  var filters = ge('side_filters').childNodes;
  each(filters, function(i,v){
    if((v.id || '').substr(0,9) != 'list_item') return;
    v.className = (v.id == 'list_item'+aid) ? 'side_filter_selected' : 'side_filter';
  });
  hide('progr');
  hide('progressTop');
  hide('progressBottom');
  if(audioData.audio_id) {
    autoPlay(audioData.audio_id);
  } else {
    scrollToTop();
  }
  if(getPageCallback){
    getPageCallback();
    getPageCallback = null;
  }
}

function loadAlbum(album_id, force) {
  album_id = album_id || 0;
  show('progr');
  show('progressTop');
  show('progressBottom');
  ajaxHistory.go({act:audioData.act, gid:audioData.gid, album_id:album_id, id:audioData.id, offset:0});
}


function alistOver(obj) {
  if (!hasClass(obj, 'alist_cell_on')) {
    obj.className = 'alist_cell_over';
  }
}

function alistOff(obj) {
  if (!hasClass(obj, 'alist_cell_on')){
    obj.className = 'alist_cell';
  }
}

function listOut(obj) {
  if (!hasClass(obj, 'side_filter_selected')) {
    obj.className = 'side_filter';
  }
}
function listOver(obj) {
  if (!hasClass(obj, 'side_filter_selected')) {
    obj.className = 'side_filter_over';
  }
}

var listEditBox;
onDomReady(function(){
  listEditBox = new ListEditBox();
});

var current_tab = 0;

function switchTab(n) {
  var list_edit_box_list_tabs = ['list_edit_box_list_tab','list_edit_box_list_selected_tab'];
  
  var tabs = list_edit_box_list_tabs;
  var obj = ge(list_edit_box_list_tabs[n]);
  for (var i = 0; i < tabs.length; i++) {
   if (obj.id == tabs[i]) {
    ge(tabs[i]).className = "t_filter_selected";
   } else {
    ge(tabs[i]).className = "t_filter_off";
   }
  }
  current_tab = n;
}

function ListEditBox() {

  var listBox, self = this, saving_album = false, audioFilter, selectedAudios;
  
  function initBox() {
    listBox = new MessageBox({width: '480px', bodyStyle: 'padding:0px;_height:361px;_overflow:hidden;'});
    listBox.addButton({
      onClick: function(){listBox.hide(200)},
      style:'button_no',
      label:getLang('global_cancel')
    }).addButton({
      onClick: saveAlbum,
      label:getLang('global_save')
    });
    var paddingSide = window.is_rtl ? 'padding-right' : 'padding-left';
    var input_css_hack = browser.opera || browser.msie ? 'style="'+paddingSide+': 4px; padding-top: 4px;"' : '' ;
    listBox.content('<div class="alist_outer_wrap">'+
      '<div class="fl_r" style="width:150px;"><div id="af_pages_top"></div></div>'+
      '<div id="alist_wrap"><span id="list_edit_box_alist_name"></span><a id="list_change_name" href="#">'+getLang('audio_change_album_name')+'</a></div><div id="alist_edit_wrap"><input id="alist_name_edit" '+input_css_hack+' placeholder="'+getLang('audio_enter_album_name')+'" class="inputText" /></div></div><div class="audio_list_top">'+
      '<input type="text" placeholder="'+getLang('audio_search_enter_audio_name')+'" class="inputText" id="list_edit_box_audio_list_lookup"/>' +
      '<div class="t_filter_selected" id="list_edit_box_list_tab">'+
      '<div class="t_filter2"><div class="t_filter3">'+getLang('friends_all')+'</div></div></div>'+
      '<div class="t_filter_off" id="list_edit_box_list_selected_tab">'+
      '<div class="t_filter2"><div class="t_filter3">'+getLang('friends_selected')+' (<span id="list_edit_box_list_selected_count">0</span>)</div></div></div>'+
      '<div class="clearFix"></div>'+
      '</div>'+
      shadows([30,11,7,3])+
      '<div class="audio_list_body">'+
      '<div id="list_edit_box_alist_data"></div></div>' +
      shadows([3,7,11,30,80], true)
    );
    
    addEvent('alist_name_edit', 'blur', saveListName);
    addEvent('alist_name_edit', 'keydown', function(e) {if (e.keyCode == KEY.RETURN) saveListName.call(this, e);});
    addEvent('list_edit_box_list_tab', 'click', function(){ switchTab(0); audioFilter.getPage(0, getFilter()); });
    addEvent('list_edit_box_list_selected_tab', 'click', function(){ switchTab(1); audioFilter.getPage(0, getFilter()); });
    addEvent('list_change_name', 'click', onEditListClick);
  }
  
  function shadows(ops, back){
    var out = '';
    var len = ops.length;
    each(ops, function(i,v){
      var op = v / 100;
      var margin = back ? i - len + 1 : i;
      var last = (back && (i == len-1)) ? 'background-color:#fff;width:476px;' : '';
      out += '<div class="alist_shadow" style="opacity:'+op+';filter:alpha(opacity='+v+');margin-top:'+margin+'px;'+last+'"></div>';
    });
    return out;
  }

  function saveListName(e) {
    if (this.active && this.value) {
      var new_name = this.value;
      if (new_name.length > 55) {
        new_name = new_name.substr(0, 55);
      }
      ge('list_edit_box_alist_name').innerHTML = new_name;
      show('alist_wrap');
      hide('alist_edit_wrap');
    }
  }
  
  function onEditListClick(e) {
    var name_width = ge('list_edit_box_alist_name').offsetWidth;
    name_width = name_width > 350 ? 350 : name_width;
    name_width = name_width < 160 ? 160 : name_width;
    hide('alist_wrap');
    ge('alist_name_edit').style.width = name_width+8+'px';
    show('alist_edit_wrap');
    ge('alist_name_edit').focus();
    return false;
  }

  function onAudioClick(obj, n) {
    if (hasClass(obj, 'alist_cell_on')) {
      obj.className = 'alist_cell_over';
      var i = indexOf(selectedAudios, n);
      if(i>=0)selectedAudios.splice(i,1);
    } else {
      obj.className = 'alist_cell_on';
      selectedAudios.push(n);
    }
    ge('list_edit_box_list_selected_count').innerHTML = selectedAudios.length;
  }
  
  this.listId = 0;
  
  function saveAlbum() {
    if (saving_album) {
      return;
    }
    saving_album = true;
    var input = ge('alist_name_edit'),
      albumName = input.active ? input.value : '';
    var audioIds = selectedAudios;

    if(!albumName && !this.listId){
      notaBene('alist_name_edit');
      saving_album = false;
      return;
    }
    Ajax.Post({
      url: 'audio.php',
      query: {act: 'a_save_album', audios:audioIds.join(','), hash:audioData.hash, gid:audioData.gid, name:albumName, album_id:this.listId},
      onFail: function(obj, text){debugLog(text); saving_album = false;},
      onDone: function(obj, text) {
        try{
          var res = eval('(' + text + ')');
          if(res.debug)debugLog(res.debug);
          ge('side_filters').innerHTML = res.filters;
          if(window.albumDDM){
            if(albumList.length > 0){
              var c = albumList.pop();
            }
            albumList.push({i:res.album_id, l:res.title});
            albumList.push({i:0, l:getLang('audio_common_list')});
            albumDDM = new DropdownMenu(albumList, {showHover:false, onSelect: function(e){onAlbumChange(e);}});
          }

          listBox.hide(200);
          loadAlbum(res.album_id, res.title, res.audios);
        }catch(e){debugLog(e);}
        saving_album = false;
      }
    });
  }
  
  var audio_data;
  var search_def;

  function showList(windowTitle, listId, listName, selectedIds) {

    listBox.setOptions({title: windowTitle});
    ge('list_edit_box_audio_list_lookup').value = '';
    placeholderSetup('list_edit_box_audio_list_lookup');
    if(!search_def)search_def = ge('list_edit_box_audio_list_lookup').value.toLowerCase();
    ge('list_edit_box_list_selected_count').innerHTML = 0;
    ge('list_edit_box_list_tab').className = 't_filter_selected';
    ge('list_edit_box_list_selected_tab').className = 't_filter_off';
    this.listId = listId;
    
    var listEdit = ge('alist_name_edit');
     if (this.listId == 0) {
      hide('alist_wrap');
      show('alist_edit_wrap');
      listEdit.value = '';
     } else {
      show('alist_wrap');
      hide('alist_edit_wrap');
      listEdit.value = listName;
      ge('list_edit_box_alist_name').innerHTML = listName;
    }
    placeholderSetup(listEdit);

    selectedAudios = selectedIds || [];
    ge('list_edit_box_list_selected_count').innerHTML = selectedAudios.length;

    var initFilter = function(data){
      return new PagedList('list_edit_box_alist_data', data, {
        getRow: function(row){
          var min = Math.floor(row[3] / 60);
          var sec = row[3] %60;
          var dur = min+':'+((sec<10)?'0':'')+sec;
          var len = row[1].length + row[2].length;
          var artist = row[1].length > 28 && len > 60 ? row[1].substr(0, 25) + '...' : row[1];
          var title = row[2].length > 38 && len > 60 ? row[2].substr(0, 35) + '...' : row[2];
          return '<div class="audio_row" id="audio_choose'+row[0]+'">'+
            '<div onmouseout="alistOff(this)" onmousemove="alistOver(this)" onclick="onAudioClick(this,'+row[0]+')" class="alist_cell" id="alist'+row[0]+'">'+
            '<div class="alist_border_wrap"><div class="alist_wrap"><div class="flist_div fl_l"></div><div class="alist_title fl_l">'+
            '<b id="performerChoose'+row[0]+'">'+
            '<a href="#" onclick="return false;">'+artist+'</a></b><span>&nbsp;-&nbsp;</span>'+
            '<span id="titleChoose'+row[0]+'">'+title+'</span>'+
            '</div>'+
            '<div class="alist_duration fl_l">('+dur+')</div>'+
            '</div></div></div></div>';
        },
        onShow: function(row, idx){
          if(indexOf(selectedAudios, row[0]) != -1){
            ge('alist'+row[0]).className = 'alist_cell_on';
          }
        },
        filter: function(search, row) {
          if(!row.low){
            row.low = (row[1]+' '+row[2]).toLowerCase();
          }
          if(search[1])return (indexOf(selectedAudios, row[0]) != -1);
          if(row.low.indexOf(search[0]) != -1) return true;
          return false;
        },
        setPages: function(page, pages, side){
          if(!ge('af_pages_'+side))return;
          if(pages == 1){
            ge('af_pages_'+side).innerHTML = '';
            return;
          }
          var html = ['<ul class="pageList">'];
          var maxp = Math.min(pages, page+3);
          var minp = Math.max(0, page-2);
          if(minp != 0) html.push('<li><a href="" onclick="getAFPage(0);return false;">&laquo;</a></li>');
          for(var i = minp; i < maxp; ++i){
            if(i == page) html.push('<li class="current">'+(i+1)+'</li>');
            else html.push('<li><a href="" onclick="getAFPage('+i+');return false;">'+(i+1)+'</a></li>');
          }
          if(maxp != pages) html.push('<li><a href="" onclick="getAFPage('+(pages-1)+');return false;">&raquo;</a></li>');
          html.push('</ul>');
          if(ge('af_pages_'+side))ge('af_pages_'+side).innerHTML = html.join('');
        },
        onStart: function(){
          ge('af_pages_top').innerHTML = '<img src="images/upload.gif"/>';
          //ge('af_pages_bottom').innerHTML = '<img src="images/upload.gif"/>';
        },
        onEnd: function(){
          animate(ge('list_edit_box_alist_data').parentNode, {scrollTop:0}, 200);
        },
        emptyRow: function(search){
          var txt = getLang('audio_search_not_found').replace('{search}', replaceChars(search[0]));
          return '<div class="alist_empty">'+txt+'</div>';
        }
      });
    }

    if (!audio_data) {
      ge('list_edit_box_alist_data').innerHTML = '<div class="listProgress"><img src="http://vkontakte.ru/images/progress7.gif"></div></div>';
      Ajax.Post({
        url: 'audio.php',
        query:{act:'a_get_audio_data', album_id:this.listId, gid:audioData.gid},
        onDone: function(obj, text) {
          var res = eval('(' + text + ')');
          audio_data = res.rows;
          if(!audioFilter){
            audioFilter = initFilter(audio_data);
            addEvent('list_edit_box_audio_list_lookup', 'keyup', function(){
              switchTab(0);
              audioFilter.getPage(0, getFilter());
            });
          }
          audioFilter.getPage(0, [], true);
        }
     });
    } else {
      audioFilter.getPage(0, getFilter(), true);
    }

    listBox.show();
  }
  
  var getFilter = function(){
    var value = ge('list_edit_box_audio_list_lookup').value.toLowerCase();
    if (value == search_def.toLowerCase()) {
      value = '';
    }
    return [value, current_tab];
  };

  
  this.newList = function() {
    showList(getLang('audio_new_album_title'), 0, getLang('friends_list_name'), 0);
  }
  this.editList = function(listId, listName, selectedAudiosIds) {
    showList(getLang('audio_edit_album_title'), listId, listName, selectedAudiosIds);
  }
  
  var first_page;
  
  function getAFPage(p){
    audioFilter.getPage(p);
  }

  initBox();
  // Register global functions
  window.onAudioClick = onAudioClick;
  window.getAFPage = getAFPage;
};
function getQueryString() {
  var query = window.location.search.substr(1), resultObj = {}, keyValueArray = query.split('&');
  each(keyValueArray, function(i, obj) { var keyValue = keyValueArray[i].split('='); resultObj[keyValue[0]] = keyValue[1]; });
  return resultObj;
}
onDomReady(function() {
  if (location.href.indexOf('act=play') == -1) return;
  var args = getQueryString(), offsetTop = -50, delay = 1000;
  if (args.act && args.aid && args.offset) {
    try {
      var elem = ge('imgbutton' + args.aid);
      if (elem) {
        var xy = getXY(elem);
        var scrollElem = (browser.mozilla || browser.msie) ? document.documentElement : document.body;
        animate(scrollElem, { scrollTop: xy[1] + offsetTop }, delay, function() {
          try {
            if (browser.msie) elem.click();
            else window.eval(elem.getAttribute('onclick').replace('return ', ''));
          } catch(error) { } 
        });
      }
    } catch (error) { }
  }
});

var tooltip;

function showTooltip(obj, text, direction) {
  if (!tooltip) {
    var t = ge('tooltip');
    if (!t) {
      document.body.appendChild(t = ce('div', {id:'tooltip', innerHTML:'<div class="tooltip_top"></div><div class="tooltip_bottom"></div><div class="tooltip_line1"></div><div class="tooltip_line2"></div>'}));
    }
    tooltip = {obj:t,text:text};
  }
  var coords = getXY(obj), o = tooltip.obj, c = o.childNodes;
  c[0].innerHTML = text;
  tooltip.text = text;

  setStyle(o, {left: coords[0], top: coords[1]-24});

  if (browser.msie) {
    show(o);
  } else {
    fadeTo(o, 200, 1);
  }

  setStyle(c[2], 'width', 0);
  setStyle(c[3], 'width', 0);

  var w = getSize(o)[0], w1 = getSize(obj)[0];

  setStyle(c[2], 'width', w);
  setStyle(c[3], 'width', w);

  if (direction) {
    setStyle(o, 'left', coords[0]-w+w1);
  }
}

function hideTooltip() {
  if (!tooltip) {
    return;
  }
  if (browser.msie) {
    hide(tooltip.obj);
  } else {
    fadeOut(tooltip.obj, 200);
  }
}
