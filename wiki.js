function switchHider(el){
  var box = el.parentNode.parentNode;
  if(box.className.split(" ")[0]=="hiderBox"){
    box.className=box.className.replace("hiderBox", "hiderBoxOpened");
  }else{
    box.className=box.className.replace("hiderBoxOpened", "hiderBox");
  }
}

function confirmChanges(pid){
  var a = new Ajax(function(res, text){
    ge('alertmsg').style.display = "none";
  });
  a.post('/pages1.php', {act:'a_confirm_changes', id:pid});
}

function rollbackChanges(pid){
  var a = new Ajax(function(res, text){
    ge('wikiBody').innerHTML = text;
    ge('alertmsg').style.display = "none";
  });
  a.post('/pages1.php', {act:'a_rollback_changes', id:pid});
}

var videoCache = {};
function showVideoAjax(vid, elem) {
  if (!videoCache[vid]) {
    Ajax.Post({ url: '/video.php', query: { act: 'a_flash_vars', vid: vid }, onDone: function(ajaxObj, responseText) {
      if (responseText == 'NO_ACCESS') {
        AlertBox(global_warning, 'Пользователь ограничил доступ к просмотру этой видеозаписи', null).show();
        videoCache[vid] = 'NO_ACCESS';
        return false;
      }
      try {
        var vars = eval("(" + responseText + ")");
      } catch (error) {}
      if (vars) {
        eval(vars['common_script']);
        videoCache[vid] = vars;
        showVideoBox(vars, elem,
          decodeURIComponent(vars.desc).replace(/\+/g, ' '),
          decodeURI(vars.to_comments_text).replace(/\+/g, ' '),
          decodeURI(vars.add_text).replace(/\+/g, ' '),
          vars.add_hash,
          decodeURI(vars.thumb),
          vars.player_available,
          vars.allow_html5,
          vars.player_version
          );
      }
    }});
  } else {
    vars = videoCache[vid];
    if (vars == 'NO_ACCESS') {
        AlertBox(global_warning, 'Пользователь ограничил доступ к просмотру этой видеозаписи', null).show();
        return false;
    }
    showVideoBox(vars, elem,
      decodeURIComponent(vars.desc).replace(/\+/g, ' '),
      decodeURI(vars.to_comments_text).replace(/\+/g, ' '),
      decodeURI(vars.add_text).replace(/\+/g, ' '),
      vars.add_hash,
      decodeURI(vars.thumb),
      vars.player_available,
      vars.allow_html5,
      vars.player_version
      );
  }
  return false;
}

var wikiMb;

(function(){
var wikiImgCache = {};

window.showWikiBox = function(type, opt, ct){
  if(!wikiMb){
    wikiMb = new MessageBox();
  }
  switch(type){
    case 'photo':
      var src = opt.src;
      var full = opt.full;
      if (trim(opt.text) == '') {
        opt.text = 'Photo';
      }
      wikiMb.setOptions({title: opt.text, bodyStyle: 'padding: 10px', closeButton: true, fullPageLink: full});
      wikiMb.removeButtons();
      wikiMb.addButton({label: global_close, onClick: function() {
        wikiMb.hide();
      }});
      ct = (ct == undefined) ? true : ct;
      if (ct) {
        wikiMb.addControlsText('<a href="'+full+'">'+opt.text+'</a>');
      }
      if(!wikiImgCache[src]) {
        var img = new Image();
        wikiImgCache[src] = img;
        addEvent(img, 'load', function(){ return showPhoto(img); });
        wikiMb.content('<div class="box_loader"></div>').show();
        setTimeout(function() { img.src = src; }, 100);
      }else{
        showPhoto(wikiImgCache[src]);
      }
      break;
  }
};

var showPhoto = function(img){
  var width = img.width;
  wikiMb.setOptions({width: (intval(width) > 410) ? (width + 20) : 430});
  wikiMb.content('<div style="height: ' + img.height + 'px; text-align: center;" onclick="wikiMb.hide()"><img  src="' + img.src + '" /></div>').show();
};

})();

var photoBox, pic, showTimer;
var isSetPhotos = false;

function setPhotos() {
  isSetPhotos = true;
  var wikiBody = document.getElementsByClassName("wikiText");
  if (wikiBody.length > 0) {
    var wikiHtml = wikiBody[0].innerHTML;
    var pattern = /<a class="(?:wikiPhoto|wk_photo)(.*?)"(.*?)showPhotosBox\('(.*?)'/igm;
    photosOfItem = new Array();
    var match;
    while ((match = pattern.exec(wikiHtml)) != null) {
      photosOfItem.push(match[3]);
    }
    photosCount = photosOfItem.length;
  }
}

function showPhotosBox(url, photo_id, photo_index, target) {
  if (!isSetPhotos) {
    setPhotos();
  }
  if (typeof(target.parentNode.id) != 'undefined' && target.parentNode.id.indexOf('noteindex') == 0) {
    var noteIndex = parseInt(target.parentNode.id.substr(9));
  }
  if (typeof(target.parentNode.parentNode.id) != 'undefined' && target.parentNode.parentNode.id.indexOf('noteindex') == 0) {
    var noteIndex = parseInt(target.parentNode.parentNode.id.substr(9));
  }
  if (showTimer) {
    clearTimeout(showTimer);
  }
  pic = new Image();
  pic.src = url;
  if (!pic.width) {
   var coords = getXY(target);
   ge('imageProgress').style.height = target.offsetHeight+"px";
   ge('imageProgress').style.width = target.offsetWidth+"px";
   ge('imageProgressAnimation').style.marginLeft = (target.offsetWidth / 2 - ge('imageProgressAnimation').width / 2) + "px";
   ge('imageProgressAnimation').style.marginTop = (target.offsetHeight / 2 - ge('imageProgressAnimation').height / 2) + "px";
   ge('imageProgress').style.left = coords[0]+"px";
   ge('imageProgress').style.top = coords[1]+"px";
   show('imageProgress');
   showTimer = setTimeout(function() {showPhotosBox(url, photo_id, photo_index, target);}, 1500);
   return false;
  }
  if (!photoBox) {
    var params = {};
    photoBox = new MessageBox(params);
    photoBox.addButton({label: 'Закрыть', onClick: function() {
      hide('imageProgressBig');
      clearTimeout(showTimer);
      photoBox.hide();
    }});
  }
  renderPhoto(url, photo_index, noteIndex);
  hide('imageProgress');
  return false;
}

function showNextPhoto(url, afterWaited, nextIndex, noteIndex) {
  if (showTimer) {
    clearTimeout(showTimer);
  }
  if (afterWaited) {
    pic = new Image();
    pic.src = url;
  }
  if (!pic.width) {
   var coords = getXY(ge('currentPhoto'));
   ge('imageProgressBig').style.width = ge('currentPhoto').offsetWidth+"px";
   ge('imageProgressBig').style.height = ge('currentPhoto').offsetHeight+"px";
   ge('imageProgressBig').firstChild.style.marginTop = ((ge('currentPhoto').offsetHeight - 8) / 2) + "px";
   ge('imageProgressBig').style.left = coords[0]+"px";
   ge('imageProgressBig').style.top = coords[1]+"px";
   show('imageProgressBig');
   showTimer = setTimeout("showNextPhoto('" + url + "', 1, '" + nextIndex + "', ' + noteIndex + ')", 1500);
   return false;
  }
  renderPhoto(url, nextIndex, noteIndex);
  hide('imageProgressBig');
}

function renderPhoto(url, photo_index, noteIndex) {
  var nextIndex = intval(photo_index) + 1;
  var notePhotosCount = photosCount;
  if (typeof(photoNotesCount) != 'undefined') {
    notePhotosCount = photosCount[noteIndex];
  }
  var title = (notePhotosCount == 1) ? 'Фотография' : getLang('market_photo_one_of_photo').replace('{index}', nextIndex).replace('{count}', notePhotosCount);
  if (nextIndex == notePhotosCount) {
    nextIndex = 0;
  }
  photoBox.setOptions({title: title, width: parseInt(pic.width) + 30});
  if (notePhotosCount > 1) {
    if (typeof(photoNotesCount) != 'undefined') {
      photoBox.content('<a href="#next" onclick="showNextPhoto(\'' + photosOfItem[noteIndex][nextIndex] + '\', null, \'' + nextIndex + '\', ' + noteIndex + '); return false;"><img id="currentPhoto" src="' + url + '" /></a>').show();
    } else {
      photoBox.content('<a href="#next" onclick="showNextPhoto(\'' + photosOfItem[nextIndex] + '\', null, \'' + nextIndex + '\', ' + noteIndex + '); return false;"><img id="currentPhoto" src="' + url + '" /></a>').show();
    }
  } else {
    photoBox.content('<img src="' + url + '" />').show();
  }

  pic = new Image();
  if (typeof(photoNotesCount) != 'undefined') {
    pic.src = photosOfItem[noteIndex][nextIndex];
  } else {
    pic.src = photosOfItem[nextIndex];
  }
}

var Wiki = {
  inBox: function(params, event) {
    if (window.wikiBox && wikiBox.loadPage) {
      wikiBox.loadPage(-params.oid, params.pid ? params.pid : params.title, params.pid ? true : false);
    } else {
      if (!window.wikiPopupBox) {
        window.wikiPopupBox = new MessageBox({
         title: '',
         width: 634,
         onLoad: function() {
           wikiPopupBox.setOptions({
             bodyStyle: 'max-height: 400px; maxHeight: 400px; padding: 10px 16px; padding-left: 10px; paddingLeft: 10px; overflow-y: scroll; overflowY: scroll; overflow-x: hidden; overflowX: hidden;'
           });
         }
        });
        wikiPopupBox.loadPage = function(gid, page, isById) {
          if (isById) {
            wikiPopupBox.setOptions({title: '<br>'});
            wikiPopupBox.loadContent('/page-' + gid + '_' + page).show();
          } else {
            wikiPopupBox.setOptions({title: page});
            wikiPopupBox.loadContent('/pages.php?o=-' + gid + '&p=' + page).show();
          }
        }
        wikiPopupBox.addButton({onClick:function(){wikiPopupBox.hide()}, label: getLang('global_close')});
      }
      wikiPopupBox.loadPage(-params.oid, params.pid ? params.pid : params.title, params.pid ? true : false);
    }
    return false;
  },
  switchHider: function(el) {
    var box = el.parentNode.parentNode;
    if (hasClass(box, 'wk_hider_box')) {
      box.className = box.className.replace('wk_hider_box', 'wk_hider_box_opened');
    } else {
      box.className = box.className.replace('wk_hider_box_opened', 'wk_hider_box');
    }
  }
}
