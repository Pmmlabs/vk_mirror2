var inTop;

function kotUrlEncode(s) {
	return s.replace('%','%25','g').replace('&','%26','g').replace('+','%2B','g').replace('?','%3F','g');
}

function postComment() {
 showError();
 //ge('progrWrap').style.display = "block";
 var onDone = function(res, text){
	ge('commentArea').value = '';
   //ge('progrWrap').style.display = "none";
   ge('photocomment').innerHTML = text;
	 if(dupPages){dupPages();};
 };
 var onFail = function(res, text){
   //ge('progrWrap').style.display = "none";
   text = text || "Request error.";
   showError(text);
 };
 var onHide = function(){
   //ge('progrWrap').style.display = "none";
 }
 var data = {act:'a_post_comment',add_bookmark:ge('add_bookmark').value,aid:ge('aid').value,comment:ge('commentArea').value,hash:ge('hash').value,id:ge('id').value};
 Ajax.postWithCaptcha('/photos.php', data, {onSuccess:onDone, onFail:onFail, onCaptchaHide:onHide});
}

// One function for deleting, reporting spam and restoring comments.
function changeComment(act, oid, cid) {
  hideError();
  show('action_progress' + cid);
  var ajax = new Ajax(function(res, text) {
    hide('action_progress' + cid);
    var comment_node = ge('comm' + cid);
    if (isVisible(comment_node)) {
      var new_node = document.createElement('div');
      new_node.innerHTML = text;
      new_node.className = 'commentResult';
      comment_node.parentNode.insertBefore(new_node, comment_node);
      hide(comment_node);
    } else {
      comment_node.parentNode.removeChild(comment_node.previousSibling);
      show(comment_node);
    }
  }, function(res, text){
    var comment_node = ge('comm' + cid);
    if (!isVisible(comment_node)) {
      show(comment_node);
    }
    text = text || 'Request error.';
    comment_node.innerHTML = text;
  });
  ajax.post('/photos.php', {'act': act, 'oid': oid, 'cid': cid});
}

function deleteComment(oid, cid) {
  changeComment('a_delete_comment', oid, cid);
}

function reportSpamComment(oid, cid) {	
  changeComment('a_spam', oid, cid);
}

function restoreComment(oid, cid) {
  changeComment('a_restore_comment', oid, cid);
}

function separator(comment) {
  var elem;
  for (elem = comment.nextSibling; elem.className != 'separator'; elem = elem.nextSibling) {
  }
  return elem;
}

var editing = 0;
function editComment(oid, cid) {
  if (editing) {
    cancelEditComment(editing);
  }
  show('action_progress' + cid);
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    hide('action_progress' + cid);
    var comment = ge('comm' + cid);
    hide(geByClass('actions', comment)[0]);
    separator(comment).style.height = '2px';
    var commtext = geByClass('text', comment)[0];
    var width = (parseInt(getStyle(commtext, 'width')) + 1) + 'px';
    var margin_top = '-4px', margin_left = '-5px'; // For Firefox, IE, Safari.
    var padding_left = '';
    if (browser.chrome) {
      margin_left = '-4px';
    } else if (browser.safari) {
      padding_left = 'padding-left: 1px;';
    } else if (browser.opera) {
      margin_left = '-4px';
    } else if (browser.msie6) {
      margin_top = '-5px';
      margin_left = '-4px';
      width = (parseInt(width) - 4) + 'px';
    }
    commtext.innerHTML = '<textarea id="comment' + cid + 'edit" style="' + padding_left + 'width: ' + width + '; height: ' + commtext.offsetHeight + 'px; margin-top: ' + margin_top + '; margin-left: ' + margin_left + '; line-height: 14px; margin-bottom: 0px;" onkeydown="if (event.keyCode == 27) cancelEditComment(' + cid + '); else if (event.keyCode == 13 && event.ctrlKey) doEditComment(' + oid + ', ' + cid + ')">' + text + '</textarea>' +
                         '<div style="margin-top: 5px; margin-left: ' + margin_left + '; height: 23px">' + 
                           '<ul class="nNav"><li style="margin-left: 0px">' +
                             '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' + 
                             '<span class="ncc"><a href="javascript: doEditComment(' + oid + ', ' + cid + ')">' + photos_done + '</a></span>' + 
                             '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' + 
                           '</li><li>' + 
                             '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' + 
                             '<span class="ncc"><a href="javascript: cancelEditComment(' + cid + ')">' + photos_cancel + '</a></span>' + 
                             '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' + 
                           '</li></ul>' + 
                           '<div id="editCommentProgress' + cid + '" style="margin: 5px 0px 0px 10px; vertical-align: 0px; float: left; display: none"><img src="images/upload.gif"/></div>' + 
                         '</div>' +
                         '<div id="comment' + cid + 'text" style="display: none">' + commtext.innerHTML + '</div>';
    var text = ge('comment' + cid + 'edit');
    new Autosize(text);
    setSelRange(text, text.value.length, text.value.length);
    editing = cid;
  };
  ajax.post('/photos.php', {'act': 'a_get_edit_comment', 'oid': oid, 'cid': cid});
}

function cancelEditComment(cid) {
  editing = 0;
  var comment = ge('comm' + cid);
  show(geByClass('actions', comment)[0]);
  separator(comment).style.height = '15px';
  geByClass('text', comment)[0].innerHTML = ge('comment' + cid + 'text').innerHTML;
}

function doEditComment(oid, cid) {
  if (!ge('comment' + cid + 'edit').value) {
    ge('comment' + cid + 'edit').focus();
    return;
  }
  show('editCommentProgress' + cid);
  var onDone = function(obj, text) {
    editing = 0;
    var comment = ge('comm' + cid);
    show(geByClass('actions', comment)[0]);
    separator(comment).style.height = '15px';
    geByClass('text', comment)[0].innerHTML = text;
  };
   var onFail = function(res, text){
     text = text || "Request error.";
     showError(text);
   };
   var onHide = function(){
   }
  var data = {'act':'a_edit_comment',add_bookmark:ge('add_bookmark').value,aid:ge('aid').value,comment:ge('comment'+cid+'edit').value,hash:ge('hash').value,id:ge('id').value,'oid':oid,'cid':cid};
  Ajax.postWithCaptcha('/photos.php', data, {onSuccess:onDone, onFail:onFail, onCaptchaHide:onHide});

//  ajax.post('/photos.php', {'act': 'a_edit_comment', 'oid': oid, 'cid': cid, 'comment': ge('comment' + cid + 'edit').value});
}

function hideError() {
  showError('');
}

function showError(error_msg) {
  if (error_msg) {
    ge('commenterror').innerHTML = error_msg;
    ge('commenterror').style.display = "block";
  } else {
    ge('commenterror').style.display = "none";
  }
}

var restoring = false;

function restorePhoto(fid, oid){
	if (restoring) {
		return;
	}
	restoring = true;
	var pid = oid+'_'+fid;
	var box = ge('photo_'+pid+'_desc');
	var s = 0;
	if(!box){
		s = 1;
		box = ge('actionMessage'+pid);
	}
	var q = {'act': 'a_restore_photo', 'oid': oid, 'fid': fid, s:s};
	Ajax.Post({url:'/photos.php', query:q, onDone:function(res, text){
		restoring = false;
		if (s) {
			hide(box);
			show('photoactions');
 		} else {
			box.innerHTML = ge('photo_' + pid + '_desc_old').innerHTML;
		}
	}, onFail:function(res, text){
		restoring = false;
		text = text || 'Request error.';
		box.innerHTML = text;
	}});
}

//
//		new
//


onDomReady(function(){
	// backPh = [photo => index]
	if(!window.ph)return;
	window.backPh = {};
	for(var i in ph){
		window.backPh[ph[i][0]] = i;
	}

	ajaxHistory.useCache = false;

	ajaxHistory.prepare("photo", {
		url:'photos.php',
		done: gotPhotoInfo,
		fail: failedPhotoInfo,
		before: showPhoto,
		show: {
			to: function(p) { return p.photo },
			from: function(p) { return {act: 'photo_info', photo: p, uid: window.watched_uid, all: view_all }}
		},
		def: { act:'photo_info', photo: start_photo, uid: window.watched_uid, all: view_all }
	});
	
	ajaxHistory.prepare("pages", {
		url:'photos.php',
		done: gotComments,
		fail: failedComments,
		before: function(params){
			return (params.id == cur_photo);
		},
		show: {
			to: function(p) { return p.st; },
			from: function(p) { return {act: 'a_comments', id:cur_photo, st: p };}
		},
		def: {act:'a_comments', id:cur_photo, st: last_page}
	});
	
	ajaxHistory.init();
	
	prev_caption = false;
});

function getPhotoComments(offset) {
	ajaxHistory.go("pages", {act: 'a_comments', id: cur_photo, st: offset});
	return false;
}

function gotComments(ajax, res) {
 ge('photocomment').innerHTML = res; 
 scroll(0,getXY(ge('photoinfo'))[1]-260);
 dupPages();
}

function dupPages() {
 var toppages = ge('toppages'), bottompages = ge('bottompages');
 if(toppages && bottompages) {
   bottompages.innerHTML = toppages.innerHTML;
 }
}

function failedComments(ajax, res) {
document.title = 'Ajax Error';
}

function getPhotoInfo(id) {
	photo = ph[id - 1][0];
	ajaxHistory.go("photo", {act:'photo_info', photo: photo, uid: window.watched_uid, all: view_all});
}

function gotPhotoInfo(ajax, res) {
//setTimeout(function(){
//ge('pageHeader').innerHTML += "photo info<br>";
 var r = eval(res);
 
 if(r[0]!=cur_photo)return;
 $ah.onLoad["pages"].def = {act:'a_comments', id:cur_photo, st: r[7]};
 
 if (r[2] !== prev_caption) {
	prev_caption = r[2];
	if (r[2]) {
		r[2] = "<div id='photocaption'>"+r[2]+"</div>";
	}
	ge('photocaption_wrap').innerHTML = r[2];
 }
 
 ge('date_in').innerHTML = r[1];
 if (r[3]) {
  ge('phototags_wrap').innerHTML = r[3];
 } else {
  ge('phototags_wrap').innerHTML = "";
 }
 tag_coords = eval(r[4]);
if(window.tagger) {
	tagger.processTagsCoordinates(tag_coords);
}
 ge('photoinfo').innerHTML = r[5];
 dupPages();
 ge('author_in').innerHTML = r[6];
 
 if (r[8] && ge('to_album_link')) ge('to_album_link').innerHTML = r[8];

 if (browser.msie) {
  ge('ph_overlay').innerHTML = "";
 } else {
  ge('photocaptionleft').className = 'ph_info';
  ge('photoinfo').className = 'ph_info';
 }
 ge('photolike_wrap').innerHTML = r[9];
 ge('photolikes_wrap').innerHTML = r[10];
 setStyle('photolikes_wrap', 'display', ge('photolikes').innerHTML ? 'block' : 'none');

 ge('full_viewer_wrap').innerHTML = r[11] || '';

 ge('pr_overlay').innerHTML = "";
 processTagCoords();
//}, 1000);
}

function failedPhotoInfo(ajax, res) {
 ge('photoinfo').innerHTML = "<div style='text-align:center;'>" + photo_error_occurred + "</div>";
}

function nextPhoto() {
	if (!window.this_id) {
		return true;
	}
	var id = (this_id >= ph.length) ? 1 : this_id + 1;
	if (window.photo_message) {
		hide('photomsgwrap');
	}
	getPhotoInfo(id);
}

function prevPhoto() {
 var id = (this_id <= 1) ? ph.length : this_id - 1;
	if (window.photo_message) {
		hide('photomsgwrap');
	}
 getPhotoInfo(id);
}
function showPhoto(params) {
 hideBox();
 hide_tagging_ui(); 
 
 cur_photo = params.photo;
 this_id = parseInt(backPh[cur_photo])+1;
 if (window.timerMenuVisible) clearInterval(timerMenuVisible);
 var new_url = ph[this_id-1][2];
 ge('myphotolink').innerHTML = "<img src='"+new_url+"' id='myphoto' galleryimg='no'>";
 ge('myphoto').onload = function() { ge('myphoto').onload = null; testPhotoSize(ge('myphoto')); };
 ge('photoarea').style.width = "604px";
 ge('photoarea').style.height = "";
if (!window.tagger) {
 ge('spyphoto').src = new_url;
}
 ge('cur_num').innerHTML = this_id;
 if (this_id >= ph.length-1) {
  var next_id = 0;
 } else {
  var next_id = this_id;
 }

 var preload_img = new Image(1,1);
 preload_img.src = ph[next_id][2];

if(window.tagger) {
	tagger.reset(ph[this_id-1][0]);
}

 initialized = false;
 tagging_initialized = false;
 initElements();

 if (browser.msie) {
  var ov_height = parseInt(ge('photocaptionleft').clientHeight)+parseInt(ge('photoinfo').clientHeight)+20;
  var overlay = "<div style='position:absolute; top: 0px; left:-10px; width:628px; height:"+ov_height+"px; background-color: #F7F7F7; z-index:1300; opacity: 0.80;filter:alpha(opacity=80);'></div>";
  ge('ph_overlay').innerHTML = overlay;
 } else {
  ge('photocaptionleft').className = 'ph_info_dis';
  ge('photoinfo').className = 'ph_info_dis';
 }
 var progress = "<div style='position:absolute; top: -55px; left:-10px; width:628px; background-color: transparent; text-align:center; padding: 20px; z-index:300'><img src='images/progress7.gif'/></div>";
 ge('pr_overlay').innerHTML = progress;
 return true;
}

function setCookie(c_name, value, expiredays) {
 var exdate=new Date();
 exdate.setDate(exdate.getDate()+expiredays);
 document.cookie=c_name+ "=" +escape(value)+
 ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function photoKeydown(e) {
	e = e || window.event;	
	var isFocused = ge('isFocused');
	if (isFocused && isFocused.value != 0) {
		return true;
	}
	switch(e.keyCode) {
		case 37:
			if (e.ctrlKey && !tagger.isFrameCreated()) { 
				var prevp = ge('prevp');
				if (prevp && prevp.href && prevp.href.substr(prevp.href.length-1) != '#') {
					window.location = href;
				} else {
					prevPhoto(); 			
				}
				return cancelEvent(e);
			}
 			break;
		case 39:
			if (e.ctrlKey && !tagger.isFrameCreated()) { 
				var nextp = ge('nextp');
				if (nextp && nextp.href && nextp.href.substr(nextp.href.length-1) != '#') {
					window.location = href;
				} else {
					nextPhoto(); 			
				}
				return cancelEvent(e);
			}
			break;
		case 27:
			tagger.endTagging();
			return cancelEvent(e);
			break;
	}
	return true;
}

var deleting_or_reporting = false;

function reportSpamPhoto(el, fid, oid, sure) {
	if (deleting_or_reporting) {
		return;
	}
	deleting_or_reporting = true;

	var q = {act:'a_spam', oid:oid, fid:fid};
	if (sure) {
		q['sure'] = 1;
	}
	var pid = oid+'_'+fid;
	var box = ge('actionMessage'+pid);
	if(box){
		box.style.display = 'none';
	}else{
		box = ge ('photo_'+pid+'_desc');
	}
	
	Ajax.Post({url: 'photos.php', query:q, onDone:function(res, text){
			deleting_or_reporting = false;
			show(box);
			if (ge('actionMessage'+pid)) {
				hide('photoactions');
				box.innerHTML = text;
			} else {
				if (sure) {
					box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + ge('photo_' + pid + '_desc_old').innerHTML + '</div>';
				} else {
					box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + box.innerHTML + '</div>';
				}
			}
		}, onFail:function(res, text){
			deleting_or_reporting = false;
			show(box);
			box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + box.innerHTML + '</div>';
		}}
	);
}

function deletePhoto(pid, sure) {
	if (deleting_or_reporting) {
		return;
	}
	deleting_or_reporting = true;

	var q = {act:'a_delete_photo', pid:pid};
	if (sure) {
		q['sure'] = 1;
	}
	var box = ge('actionMessage'+pid);
	if(box){
		box.style.display = 'none';
	}else{
		box = ge ('photo_'+pid+'_desc');
	}
	
	Ajax.Post({url: 'photos.php', query:q, onDone:function(res, text){
			deleting_or_reporting = false;
			show(box);
			if (ge('actionMessage'+pid)) {
				hide('photoactions');
				box.innerHTML = text;
			} else {
				if (sure) {
					box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + ge('photo_' + pid + '_desc_old').innerHTML + '</div>';
				} else {
					box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + box.innerHTML + '</div>';
				}
			}
		}, onFail:function(res, text){
			deleting_or_reporting = false;
			show(box);
			box.innerHTML = text + '<div id="photo_' + pid + '_desc_old" style="display: none">' + box.innerHTML + '</div>';
		}}
	);
}

function dontDeletePhoto(pid) {
	var box = ge('photo_'+pid+'_desc');
	if(!box){
		box = ge('actionMessage'+pid);
		hide(box);
		show('photoactions');
	} else {
		box.innerHTML = ge('photo_' + pid + '_desc_old').innerHTML;
	}
}

function editPhotoInit(album_id, owner_id){	
	ge('sortalbum').onSortBegin = function(elem) {
		this.sortHelper.style.border = "0px";
		this.sortHelper.className = "sortPhoto";
		this.sortHelper.innerHTML = "<div class='sortHelperIn'></div>"
		this.sortHelper.style.height = "75px";
		this.sortHelper.style.width = "101px";
		if(browser.msie)this.sortHelper.style.marginTop = "4px";
		elem.style.opacity = 0.8;
		elem.style.filter = "alpha(opacity=80)";
		//debugger;
		startSiblings = getSiblingsIds(elem);
	}
	ge('sortalbum').onSortEnd = function(elem) {
		var siblings = getSiblingsIds(elem);
		elem.style.opacity = 1;
		elem.style.filter = "alpha(opacity=100)";
		if (startSiblings[0] != siblings[0] || startSiblings[1] != siblings[1]) {
			var ajax = new Ajax();
			ajax.onDone = function(){
				hide('progr');
			};
			show('progr');
			ajax.post(location.pathname, {
				act: 'areorderphotos',
				phid: elem.id.match(/(\d+)/)[1],
				aid:album_id,
				oid:owner_id,
				after: siblings[0],
				before: siblings[1]
			});
		}

	}
	var onPhotoDragOver = function(elem, target){
		elem.style.opacity = 0.6;
		elem.style.filter = "alpha(opacity=60)";
		target.style.borderColor='#45688E';
	};

	var onPhotoDragOut = function(elem, target){
		elem.style.opacity = 0.8;
		elem.style.filter = "alpha(opacity=80)";
		target.style.borderColor='#CCCCCC';
	};

	var onPhotoDragEnd = function(elem, target){
		elem.style.opacity = 1;
		elem.style.filter = "alpha(opacity=100)";
		target.style.borderColor='#CCCCCC';
		var id = elem.id;
		var ajax = new Ajax();
		ajax.onDone = function(resp, text){
			var el = ge(id);
			hide('progr');
			target.innerHTML = text;
			sortable.removeNode(el);
			el.parentNode.removeChild(el);
		};
		show('progr');
		var pid = elem.getAttribute("oid");
		ajax.post(location.pathname, {
			act: 'amove',
			pid:pid,
			aid2:target.id.match(/(\d+)/)[1],
			thumb:""
		});
	};
	
	each(geByClass('sortPhotoImgOut'), function(i, box){
		addEvent(box, 'mouseover', function(event){box.style.borderColor='#45688E'});
		addEvent(box, 'mouseout', function(event){box.style.borderColor='#CCCCCC'});
	});

	sortable.vertical = false;
	sortable.makeSortable(ge('sortalbum'), {target:ge('albums'),
	ondragover:onPhotoDragOver,
	ondragout:onPhotoDragOut,
	ondragend:onPhotoDragEnd
	});
}

var startSiblings;

function getSiblingsIds(elem){
	var prev, next, el = elem;
	while (el.previousSibling) {
		prev = el = el.previousSibling;
		if (prev.nodeType != 3)
			break;
		prev = null;
	}
	el = elem;
	while (el.nextSibling) {
		next = el = el.nextSibling;
		if (next.nodeType != 3)
			break;
		next = null;
	}
	return [prev ? prev.id.match(/(\d+)/)[1] : 0, next ? next.id.match(/(\d+)/)[1] : 0];
}

function editAlbumInit(){
	ge('albums').onSortBegin = function(elem) {
		this.sortHelper.style.backgroundColor = "#FFFFFF";
		this.sortHelper.style.marginBottom = "5px";
		startSiblings = getSiblingsIds(elem);
		//ge("editPopup").display = "none";
	}
	ge('albums').onSortEnd = function(elem) {
		var siblings = getSiblingsIds(elem);
		if (startSiblings[0] != siblings[0] || startSiblings[1] != siblings[1]) {
			var ajax = new Ajax();
			ajax.onDone = function(){
				hide('progr');
			};
			show('progr');
			ajax.post(location.pathname, {
				act: 'areorderalbums',
				aid: elem.id.match(/(\d+)/)[1],
				gid: group_id,
				after: siblings[0],
				before: siblings[1]
			});
		}
	}
	sortable.makeSortable(ge('albums'), sortable.DIR_BOTH);
	for(i in ge('albums').childNodes){
		if(ge('albums').childNodes[i].id){
			ge('albums').childNodes[i].style.cursor = "move";
		}
	}
}

function onMovePhoto(moveList) {
	var ajax = new Ajax();
	pid = moveList.id.substring(5);
	aid = moveList.value;
	if (aid > 0) {
		thumb = ge('thumb_'+pid+'_img').src;
		var movedPhoto = function(res, text) {
			try {
				var json = eval("("+text+")");
			}
			catch(e) {
				moveError();
				return;
			};
			if (json&&json.html&&json.pid) {
				ge ('photo_'+json.pid+'_desc').innerHTML = json.html;
			}
		};
		var moveError = function(ajaxObj,text) {
			show('movebox_'+pid);
			hide('progressbar_'+pid);
		};

		ajax.onDone = movedPhoto;
		ajax.onFail = moveError;
		hide('movebox_'+pid);
		show('progressbar_'+pid);
		ajax.post('photos.php', {act:'amove',pid:pid,aid2:aid,thumb:thumb});
	}
};

var deleting_all_id = 0;

function toggleDeleteAll(photo_id) {
  toggle('wConfirm' + photo_id);
  if (isVisible('wConfirm' + photo_id)) {
    hide('wConfirm' + deleting_all_id);
    removeEvent(document, 'keydown');
    addEvent(document, 'keydown', function(e) { if (e.keyCode == 27) { toggleDeleteAll(photo_id); }});
    deleting_all_id = photo_id;
  } else {
    removeEvent(document, 'keydown');
    deleting_all_id = 0;
  }
}

// FROM BASE.JS
function showText(obj, mess) {
 var imgPath;
 if (mess == 1) {ge(obj).innerHTML = "<h4>" + photo_rotating + "<img src='http://vkontakte.ru/images/upload.gif'></h4>";}
 if (mess == 2) {ge(obj).innerHTML = "<div id='uploadingInner'><h4>" + photo_uploading_photo + "<img src='http://vkontakte.ru/images/upload.gif'></h4><p style='margin-top:11px'>" + photo_dont_close + "</p></div>";}
}
var timerMenuVisible = null;
function testPhotoSize(photo) {
  photo.onload = null;
  photo.removeAttribute('onload');
  var w = photo.offsetWidth, h = photo.offsetHeight;
  if ((w > 100) && (h > 100)) {
    if (timerMenuVisible) clearInterval(timerMenuVisible);
    show('album_to_profile');
  } else {
    if (ge('album_to_profile')) {
      timerMenuVisible = setInterval(function() { hide('album_to_profile'); }, 10);
      setTimeout(function() { if (timerMenuVisible) clearInterval(timerMenuVisible); }, 800);
    }
  }
}

/* Photo viewer */
function showPhotoViewer(oid, aid, pid, ver) {
  var viewer;
  
  if (window.photoViewer) {
    viewer = window.photoViewer;
  } else {
    viewer = window.photoViewer = {'obj': null, 'oid': oid, 'aid': aid, 'pid': pid || 0};
  }
  
  if (viewer.obj === null) {
    ver = ver || [0, 0];
    addCss('css/photo_viewer.css' + ((ver[0] > 0) ? ('?' + ver[0]) : ''));
    attachScript('photo_viewer_js', 'js/photo_viewer.js' + ((ver[1] > 0) ? ('?' + ver[1]) : ''));
    if (typeof(JSON) !== 'object' || typeof(JSON.parse) !== 'function') {
      attachScript('lib_json2_js', 'js/lib/json2.js');
    }
    checkPhotoViewer(); 
  } else {
    viewer.pid = pid;
    viewer.obj.go(pid);
    viewer.obj.show()
  }
  return false;
}
function checkPhotoViewer() {
  var viewer;
  
  if (typeof PhotoViewer === 'function' && typeof(JSON) === 'object' && typeof(JSON.parse) === 'function') {
    viewer = window.photoViewer;
    viewer.obj = new PhotoViewer({
      oid: viewer.oid,
      aid: viewer.aid,
      pid: viewer.pid
    });
    viewer.obj.show();
  } else {
    setTimeout(checkPhotoViewer, 100);
  }
}

function generateUploadList(photos) {
  for (var i in photos) {
    if (ge('uploader_list')) ge('uploader_list').innerHTML += '<li id="photo' + i + '" class="default clearFix" style="border-bottom: 1px solid #DAE2E8; margin: 0px; height: 22px; z-index:0; line-height: 0px;">\
      <div id="progress' + i +'" style="position:absolute; background-color: #F0F2F5; width: 0; height: 22px;"></div>\
      <div class="name fl_l" style="position:relative; z-index:1; padding-left: 5px; margin-top: 10px; width: 300px; text-align: left;">' + photos[i] + '</div>\
      <div class="select fl_l" style="position:relative; z-index:1; margin-top: 2px; width: 40px; text-align: center; display:none">\
        <div style="background-color: rgb(196, 210, 225); width: 17px; height: 17px; margin: auto;" id="imgX' + i + '" onmouseover="changeX(\'imgX' + i + '\', 0)" onmouseout="changeX(\'imgX' + i + '\', 1)" onclick="cancelImageUploading(' + i + ');">\
          <img src="/images/pics/statusx.gif" style="cursor: pointer;"/>\
        </div>\
      </div>\
    </li>';
  }
}

function changeX(id, state) {
  el = ge(id);
  if (!el) return;
  var bgColors = ['#6B8DB1', '#C4D2E1'];
  animate(el, {backgroundColor: bgColors[state]}, 200);
}

function showUploadList(photos) {
  generateUploadList(photos);
  if (ge('flash_html_container')) toggle(ge('flash_html_container'));
  toggleFlash();
}

function updateLoadingBar(i, percents) {
  ge('progress'+i).style.width = percents+"%";
}


function likePhoto(oid, photo_id, hash) {
  animate('photolike', {color: '#666'}, 200);;
  Ajax.Send('like.php?act=a_do_like', {'object': 'photo' + oid + '_' + photo_id, hash: hash}, {
    onSuccess: function (o, t) {
      var res = eval('('+t+')');
      ge('photolike').onclick = function () {
        return unlikePhoto(oid, photo_id, hash);
      }
      res.stats = res.stats.replace('{link}', '<a href="#" onclick="return showLikesBox('+oid+', '+photo_id+');">').replace('{/link}', '</a>');
      if (!isVisible('photolikes_wrap')) {
        ge('photolikes').innerHTML = res.stats;
        slideDown('photolikes_wrap', 200);
      } else {
        ge('photolikes').innerHTML = res.stats;
      }
    }
  });
  return false;
}

function unlikePhoto(oid, photo_id, hash) {
  animate('photolike', {color: '#2B587A'}, 200);;
  Ajax.Send('like.php?act=a_do_unlike', {'object': 'photo' + oid + '_' + photo_id, hash: hash}, {
    onSuccess: function (o, t) {
      var res = eval('('+t+')');
      ge('photolike').onclick = function () {
        return likePhoto(oid, photo_id, hash);
      }
      if (!res.stats) {
        slideUp('photolikes_wrap', 200, function () {
          ge('photolikes').innerHTML = '';
        });
      } else {
        res.stats = res.stats.replace('{link}', '<a href="#" onclick="return showLikesBox('+oid+', '+photo_id+');">').replace('{/link}', '</a>');
        ge('photolikes').innerHTML = res.stats;
      }
    }
  });
  return false;
};

function showLikesBox(oid, photo_id) {
  showBox('likesBox', 'like.php?act=a_get_members', {'object': 'photo' + oid + '_' + photo_id}, false, true, {height: 381, width: 478, bodyStyle: 'padding: 0; height: 310px'}, '');
  return false;
}

function getLikedByPage(item, offset) {
  winBoxes.likesBox.loadContent('like.php?act=a_get_members', {'object': item, offset: offset}, true);
  return false;
}

function photoNavState(el, state) {
  if (el.tagName != 'LI' || !el.firstChild) return;
  animate(el.firstChild.firstChild, {opacity: state ? 1 : 0.7}, 100);
  animate(el.firstChild, {backgroundColor: state ? '#e1e7ed' : '#FFF'}, 80);
}
