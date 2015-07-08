function abuseGroup(gid) {
  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.onDone = addGroupSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_add', 'gid': gid});
}

function abuseGroups(gid1, gid2, gid3, gid4, gid5, gid6, gid7, gid8, gid9, gid10) {
  var ajax = new Ajax();
  ajax.onDone = addGroupsSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_add_groups', 'gid1': gid1, 'gid2': gid2, 'gid3': gid3, 'gid4': gid4, 'gid5': gid5, 'gid6': gid6, 'gid7': gid7, 'gid8': gid8, 'gid9': gid9, 'gid10': gid10});
}


function addGroupSuccess(ajaxObj,responseText) {
  ge('abuse'+ ajaxObj.gid).innerHTML = responseText;
}

function addGroupsSuccess(ajaxObj,responseText) {
  try {json=eval("("+responseText+")");}
  catch(e) {opFailed(ajaxObj); return;};
  messages = json.messages;
  for(var msg in json.messages){
    curr_gid = messages[msg].gid;
    curr_msg = messages[msg].message;
    ge('abuse'+ curr_gid).innerHTML = curr_msg;
  }
}

function hideGroupQuery(qid, hash) {
  var ajax = new Ajax();
  ajax.onDone = function(ajaxObj,responseText) {
      ge('querystatus'+ qid).innerHTML = responseText;
  }
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_hide_groupquery', 'qid': qid, 'hash': hash});
}

function unHideGroupQuery(qid, hash) {
  var ajax = new Ajax();
  ajax.onDone = function(ajaxObj,responseText) {
      ge('querystatus'+ qid).innerHTML = responseText;
  }
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_unhide_groupquery', 'qid': qid, 'hash': hash});
}


function doNotChangePass(gid, hash) {
  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.onDone = doNotChangePassSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_do_not_change_pass', 'gid': gid, 'hash': hash});
}

function doNotChangePassSuccess(ajaxObj,responseText) {
  ge('spam'+ ajaxObj.gid).innerHTML = '';
  ge('phish'+ ajaxObj.gid).innerHTML = '';
  ge('virus'+ ajaxObj.gid).innerHTML = '';
  ge('donottouch'+ ajaxObj.gid).innerHTML = '';
  ge('progrid'+ ajaxObj.gid).innerHTML = responseText;
}


function goodGroup(gid, hash) {
  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.hash = hash;
  ajax.onDone = goodGroupSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good', 'gid': gid, 'hash': hash});
}

function goodGroupSuccess(ajaxObj,responseText) {
  ge('inv'+ ajaxObj.gid).innerHTML = responseText;
  ge('good'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:badGroup(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">Или всё же лохотрон...</a>";
  ge('todelete'+ ajaxObj.gid).innerHTML = "";
}

function goodApp(aid, hash) {
  var ajax = new Ajax();
  ajax.aid = aid;
  ajax.hash = hash;
  ajax.onDone = goodAppSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good_app', 'aid': aid, 'hash': hash});
}

function goodAppSuccess(ajaxObj,responseText) {
  ge('appoptions'+ ajaxObj.aid).innerHTML = responseText;
  //ge('good'+ ajaxObj.aid).innerHTML = "<a href=\"javascript:badApp(" + ajaxObj.aid + ", '" + ajaxObj.hash + "')\">Или не безвредное...</a>";
}

function isIE(){
	return (navigator.userAgent.toLowerCase().indexOf("msie") != -1);
}


function badApp(aid, hash) {
  var ajax = new Ajax();
  ajax.aid = aid;
  ajax.hash = hash;
  ajax.onDone = badAppSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad_app', 'aid': aid, 'hash': hash});
}

function badAppSuccess(ajaxObj,responseText) {
  ge('appoptions'+ ajaxObj.aid).innerHTML = responseText;
  //ge('good'+ ajaxObj.aid).innerHTML = "<a href=\"javascript:badApp(" + ajaxObj.aid + ", '" + ajaxObj.hash + "')\">Или не безвредное...</a>";
}

function goodVideo(mid, hash) {
  var ajax = new Ajax();
  ajax.mid = mid;
  ajax.hash = hash;
  ajax.onDone = goodVideoSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good_video', 'mid': mid, 'hash': hash});
}

function goodVideoSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.mid).innerHTML = responseText;
}

function badVideo(mid, hash) {
  var ajax = new Ajax();
  ajax.mid = mid;
  ajax.hash = hash;
  ajax.onDone = badVideoSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad_video', 'mid': mid, 'hash': hash});
}

function badVideoSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.mid).innerHTML = responseText;
}

function goodFake(mid, hash) {
  var ajax = new Ajax();
  ajax.mid = mid;
  ajax.hash = hash;
  ajax.onDone = goodFakeSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good_fake', 'mid': mid, 'hash': hash});
}

function goodFakeSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.mid).innerHTML = responseText;
}

function badFake(mid, hash) {
  var ajax = new Ajax();
  ajax.mid = mid;
  ajax.hash = hash;
  ajax.onDone = badFakeSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad_fake', 'mid': mid, 'hash': hash});
}

function badFakeSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.mid).innerHTML = responseText;
}



function toDelete(gid, hash) {

  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.hash = hash;
  ajax.onDone = toDeleteSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_todelete', 'gid': gid, 'hash': hash});

}

function toDeleteSuccess(ajaxObj,responseText) {
  ge('inv'+ ajaxObj.gid).innerHTML = responseText;
  ge('todelete'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:doNotDelete(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">Или не на удаление...</a>";
  ge('good'+ ajaxObj.gid).innerHTML = "";
}

function doNotDelete(gid, hash) {

  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.hash = hash;
  ajax.onDone = doNotDeleteSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_donotdelete', 'gid': gid, 'hash': hash});

}

function doNotDeleteSuccess(ajaxObj,responseText) {
  ge('inv'+ ajaxObj.gid).innerHTML = responseText;
  ge('todelete'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:toDelete(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">На удаление</a>";
  ge('good'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:goodGroup(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">Не лохотрон</a>";
}


function badGroup(gid, hash) {
  var ajax = new Ajax();
  ajax.gid = gid;
  ajax.hash = hash;
  ajax.onDone = badGroupSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad', 'gid': gid, 'hash': hash});

}

function badGroupSuccess(ajaxObj,responseText) {
  ge('inv'+ ajaxObj.gid).innerHTML = responseText;
  ge('good'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:goodGroup(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">Не лохотрон</a>";
  ge('todelete'+ ajaxObj.gid).innerHTML = "<a href=\"javascript:toDelete(" + ajaxObj.gid + ", '" + ajaxObj.hash + "')\">На удаление</a>";
}

function opFailed(ajaxObj) {
  ge('inv'+ ajaxObj.gid).innerHTML = "Ошибка.";
}

function benefProcessed(mid, hash) {
  var ajax = new Ajax();
  ajax.mid = mid;
  ajax.hash = hash;
  ajax.onDone = benefProcessedSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_benef_processed', 'mid': mid, 'hash': hash});
}

function benefProcessedSuccess(ajaxObj,responseText) {
  ge('checked'+ ajaxObj.mid).innerHTML = "OK";
}

function goodLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.onDone = goodLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good_link', 'lid': link_id, 'hash': hash});
}

function blockedLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.onDone = goodLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_blocked_link', 'lid': link_id, 'hash': hash});
}


function goodLinkSuccess(ajaxObj,responseText) {
  ge('linkact'+ ajaxObj.link_id).innerHTML = responseText;
}

function goodMatch(uid, hash) {
  var ajax = new Ajax();
  ajax.uid = uid;
  ajax.hash = hash;
  ajax.onDone = goodMatchSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_good_match', 'uid': uid, 'hash': hash});
}

function goodMatchSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.uid).innerHTML = responseText;
}


function badLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.onDone = badLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad_link', 'lid': link_id, 'hash': hash});
}

function badLinkSuccess(ajaxObj,responseText) {
  ge('linkact'+ ajaxObj.link_id).innerHTML = responseText;
}

function badMatch(uid, hash) {
  var ajax = new Ajax();
  ajax.uid = uid;
  ajax.hash = hash;
  ajax.onDone = badMatchSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bad_match', 'uid': uid, 'hash': hash});
}

function badMatchSuccess(ajaxObj,responseText) {
  ge('botact'+ ajaxObj.uid).innerHTML = responseText;
}


function phishLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.type = 1;
  ajax.onDone = banLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_linksban', 'lid': link_id, 'type': 1, 'hash': hash});
}

function virusLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.type = 2;
  ajax.onDone = banLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_linksban', 'lid': link_id, 'type': 2, 'hash': hash});
}

function cheatLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.type = 3;
  ajax.onDone = banLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_linksban', 'lid': link_id, 'type': 3, 'hash': hash});
}

function unbanLink(link_id, hash) {
  var ajax = new Ajax();
  ajax.link_id = link_id;
  ajax.hash = hash;
  ajax.onDone = unbanLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_remove_linksban', 'lid': link_id, 'hash': hash});
}


function banLinkSuccess(ajaxObj,responseText) {
  ge('linkact'+ ajaxObj.link_id).innerHTML = responseText;
  ge('blocked'+ ajaxObj.link_id).innerHTML = "<b>да</b>";
}

function unbanLinkSuccess(ajaxObj,responseText) {
  ge('linkact'+ ajaxObj.link_id).innerHTML = responseText;
  ge('blocked'+ ajaxObj.link_id).innerHTML = "";
}

function banBotLink(uid, hash) {
  var ajax = new Ajax();
  ajax.uid = uid;
  ajax.hash = hash;
  ajax.type = 3;
  ajax.onDone = banBotLinkSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_bot_linksban', 'uid': uid, 'type': 3, 'hash': hash});
}

function banBotLinkSuccess(ajaxObj,responseText) {
  ge('blocked'+ ajaxObj.uid).innerHTML = responseText;
}


function viewSiteMessage(id) {
  var ajax = new Ajax();
  ajax.link_id = id;
  ajax.onDone = viewSiteMessageSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_site_message', 'id': id});
}

function viewSiteMessageSuccess(ajaxObj,responseText) {

  try {json=eval("("+responseText+")");}
  catch(e) {opFailed(ajaxObj); return;};

  createBox();
  hide('button2Cont');
  ge('button1').innerHTML = "Закрыть";
  ge("boxTitle").innerHTML = "Текст личного сообщения для " + json.url;
  ge("boxMessage").innerHTML = json.message;
  showBoxOld(function(){hideBox();});
  return false;
}

function viewVideoText(id) {
  var ajax = new Ajax();
  ajax.mid = id;
  ajax.onDone = viewVideoTextSuccess;
  ajax.onFail = opFailed;
  ajax.post('/cheatgroups.php', {'act': 'a_video_text', 'id': id});
}

function viewVideoTextSuccess(ajaxObj,responseText) {

  try {json=eval("("+responseText+")");}
  catch(e) {opFailed(ajaxObj); return;};

  createBox();
  hide('button2Cont');
  ge('button1').innerHTML = "Закрыть";
  ge("boxTitle").innerHTML = "Название и описание видео <a href='id" + ajax.mid + "'>id"+ ajax.mid + "</a>";
  ge("boxMessage").innerHTML = json.message;
  showBoxOld(function(){hideBox();});
  return false;
}

function addQuery() {
	var ajax = new Ajax();
	ajax.onDone = function(obj, text) {
		hide('adding_progress');
		ge('add_query').disabled = false;
		var result = text.substr(0, 1);
		if (result == 'n') { // No query found
			show_message_box('error', 'А где запрос?');
		} else if (result == 'x') { // eXists
			show_message_box('error', 'Запрос уже есть в списке.');
		} else if (result == 'u') { //
			show_message_box('message', 'Запрос был в базе с малой частотой, перемещен в начало списка.');
			ge('add_query').value = "";
			ge('memberPages').innerHTML = text.substr(1);
		} else if (result == 'a') {
			show_message_box('message', 'Запрос добавлен.');
			ge('add_query').value = "";
			ge('memberPages').innerHTML = text.substr(1);
		}
		ge('add_query').blur();
		ge('add_query').focus();
	};
	ge('adding_progress').style.display = 'inline';
	ajax.post('/cheatgroups.php', {'act': 'a_add_groupquery', 'words': ge('add_query').value, 'hash': ge('hash').value});
}


function show_message_box(cls, msg) {
	ge('messageWrap').style.display = 'block';
	ge('messageWrap').innerHTML = '<div id="' + cls + '">' + msg + '</div>';
	setTimeout(function() { (new effects.fader()).fade(ge(cls), [0xFFFFFF, 0xDDDDDD], 3000); }, 2500);
}
