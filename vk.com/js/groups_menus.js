function prepareRequest() {

    var http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        //if (http_request.overrideMimeType) {
            // See note below about this line
        //}
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
      alert('Ошибка при создании XMLHTTP'); return false;
    }
    return http_request;
}

function cantAcceptInvitation() {
  mb = new AlertBox(getLang('groups_limit_title'), getLang('groups_limit_message'));
  mb.show();
}

function processRequest(gid, n, hash) {
	
 var url = 'groups.php?act=ajax&hash=' + hash;
 http_request = prepareRequest();		
 pbar = "progr"; 
	dbar = ge('prograp').innerHTML;
	ge('progrid'+gid).innerHTML = dbar;
 ge('progrid'+gid).style.paddingRight = '50px';
	ge('prograp').innerHTML = '';
	ge(pbar).style.visibility = 'visible'; 
	ge(pbar).style.display = 'inline';
	setTimeout('ge(pbar).src = "images/upload.gif"', 200);
 http_request.onreadystatechange = function() {alertContents(http_request, gid, n);}
 http_request.open('POST', url);
 http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
	http_request.send('gid='+gid+'&n='+n);

}

function processLeave(gid, hash) {
	
 var url = 'groups_ajax.php?act=aleave&hash='+hash;
 http_request = prepareRequest();
 pbar = "progr"; 
	dbar = ge('prograp').innerHTML;
	ge('progrid'+gid).innerHTML = dbar;
 ge('progrid'+gid).style.paddingRight = '50px';
	ge('prograp').innerHTML = '';
	ge(pbar).style.visibility = 'visible'; 
	ge(pbar).style.display = 'inline';
	setTimeout('pbar.src = "images/upload.gif"', 200);
 http_request.onreadystatechange = function() {alertContents(http_request, gid);}
 http_request.open('POST', url);
 http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
	http_request.send('gid='+gid);

}


function alertContents(http_request, gid, n) {
var PickText, prevDiv;

 if (http_request.readyState == 4) {
  if (http_request.status == 200) {
   PickText = http_request.responseText;
  } else {
   PickText = 'There was a problem with the request.';
  }
  var prevDiv = ge('inv'+gid);
  prevDiv.innerHTML = PickText;

  dbar = ge('progrid'+gid).innerHTML;
  ge('progrid'+gid).innerHTML = '';
  if(ge('progric'+gid))
	  ge('progric'+gid).style.display = 'none';
 	ge('prograp').innerHTML = dbar;

  pbar = "progr";
  ge(pbar).style.visibility = 'hidden'; 
  ge(pbar).style.display = 'none';
  }
}

function reportSpam(gid) {

 pbar = "progr"; 
 dbar = ge('prograp').innerHTML;
 ge('progrid'+gid).innerHTML = dbar;
 ge('progrid'+gid).style.paddingRight = '50px';
 ge('prograp').innerHTML = '';
 ge(pbar).style.visibility = 'visible'; 
 ge(pbar).style.display = 'inline';
 setTimeout('ge(pbar).src = "images/upload.gif"', 200);

 var onSuccess = function(ajaxObj, responseText) {
  var prevDiv = ge('inv'+gid);
  prevDiv.innerHTML = responseText;

  dbar = ge('progrid'+gid).innerHTML;
  ge('progrid'+gid).innerHTML = '';
  if(ge('progric'+gid))
	  ge('progric'+gid).style.display = 'none';
  ge('prograp').innerHTML = dbar;

  pbar = "progr";
  ge(pbar).style.visibility = 'hidden'; 
  ge(pbar).style.display = 'none';

 };
 var onFail = function() {
  var prevDiv = ge('inv'+gid);
  prevDiv.innerHTML = 'There was a problem with the request.';
 };
 var onCaptchaShow = function() {
  ge('progric'+gid).style.display = 'none';
 };
 var onCaptchaHide = function() {};
 var options = {onSuccess: onSuccess, onFail: onFail, onCaptchaShow: onCaptchaShow, onCaptchaHide: onCaptchaHide};

 Ajax.postWithCaptcha('groups_ajax.php', {'act': 'areportspam', 'gid': gid}, options);

}

var create_box;
var create_box_show = function() {
 create_box.show();
 addEvent(ge('new_name'), 'keypress', function(e) {
  if (e.keyCode == 13) {
   on_create_group();
  }
 });
 ge('new_name').focus();
 creating_box = false;
}
var creating_box = false;
var on_create_group = function() {
 if (creating_box) {
  return;
 }
 creating_box = true;
 var params = {'act': 'a_create', 'name': ge('new_name').value, 'hash': ge('create_hash').value};
 var redirect = function(obj, text) {
  if (text.substr(0, 1) == 'r') {
   create_box.hide();
   window.location = text.substr(1);
  } else {
   creating_box = false;
   ge('new_name').focus();
  }
 }
 var box_hidden = function() {
  removeEvent(ge('new_name'), 'keypress');
  creating_box = false;
 }
 var options = {onSuccess: redirect, onFail: create_box_show, onCaptchaShow: box_hidden, onCaptchaHide: create_box_show};
 Ajax.postWithCaptcha('/groups.php', params, options);
}
onDomReady(function() {
 if (ge('create_hash')) {
  create_box = new MessageBox({title: groups_create_new, width: 330});
  create_box.addButton({label: groups_cancel, style: 'button_no', onClick: function(){
   create_box.hide();
   removeEvent(ge('new_name'), 'keypress');
  }});
  create_box.addButton({label: groups_group_create_button, onClick: on_create_group});
 }
});

function create_group() {
 create_box.content('<div class="ta_l"><div style="margin-bottom: 5px">' + groups_create_enter + '</div><input id="new_name" name="new_name" type="text" style="width: 290px; margin: 3px 0px 0px;"/><div id="groups_new_public_tip">'+getLang('groups_new_public_tip')+'</div>');
 create_box_show();
}

var refinedSearch = function(searchItems, itemsContainer, itemContainerId, itemNameId, summaryRefined, noItemsFoundCont, noItemsFoundContText) {

  var preparedArray = searchItems;
  var timeoutId = -1;
  var lookupResults = null;

  var prepare = function() {
    var t = ge(itemsContainer);
    if (t) {
      itemsContainer = t;
      lookupResults = itemsContainer.cloneNode(false);
      lookupResults.id = 'refinedSearchResults' + Math.random().toString().replace(".", "");
      itemsContainer.parentNode.insertBefore(lookupResults, itemsContainer);		
      return true;
    }
    return false;
  }

  this.lookup = function(input, event) {
    if (!lookupResults) {
      if (!prepare()) {
        return;
      }			
    }
    if (!preparedArray.length) {
      return;
    }
    if (!event) {
      event = window.event;
    }
    clearTimeout(timeoutId);
    if (trim(input.value) != '') {
      timeoutId = setTimeout(function() { performLookup(input, event); }, 50);
    } else {
      this.reset();
    }	
  }

  this.reset = function() {
    hide(lookupResults.id);
    if (summaryRefined) {
      hide(summaryRefined.id);
    }
    show(itemsContainer.id);
  }

  var performLookup = function(input, event) {		
    var shown = 0;
    var inputVal = input.value;
    var inputVal_lc = inputVal.toLowerCase();
    var skipped = false;
    lookupResults.innerHTML = '';	
    for (i = 0; i < preparedArray.length; i++) {
      var item = preparedArray[i];
      var friendId = item[0];
      var rawName = item[1];
      var rawName_lc = item[2];
      var matchPos = rawName_lc.toLowerCase().indexOf(inputVal_lc);
      if (matchPos != -1) {
        if (!item[3]) {
          item[3] = ge(itemNameId + friendId);
          item[4] = ge(itemContainerId + friendId);
        }			
        if (shown + 1 > 50) {
          skipped = true;
          break;
        } else if (item[3]) {
          var matchedText = "";
          if (matchPos > 0) {
            matchedText = rawName.substr(0, matchPos);
          } 
          matchedText += '<span class="suggest">' + rawName.substr(matchPos, inputVal.length) + '</span>'; 
          if (matchPos + inputVal.length < rawName.length) {
            matchedText += rawName.substr(matchPos + inputVal.length);
          }
          item[3].innerHTML = matchedText;				
          var node = item[4].cloneNode(true);
          lookupResults.appendChild(node);
          item[3].innerHTML = rawName;
          shown++;
        }
      }
    }
    if (shown == 0 && noItemsFoundCont) {
      noItemsFoundCont.innerHTML = noItemsFoundContText.replace('%s', '"'+replaceChars(inputVal)+'"');
      lookupResults.appendChild(noItemsFoundCont.cloneNode(true));
    }
    if (summaryRefined) {
      summaryRefined.innerHTML = '&nbsp;(' + (skipped ? 'первые ' : '') + shown + ')';
      show(summaryRefined);
    }
    hide(itemsContainer.id);
    show(lookupResults.id);
  }	
}
