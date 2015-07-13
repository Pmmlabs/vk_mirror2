function delete_opinion(id, out) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    hide('opinion' + id);
    show('opinion' + id + 'deleted');
    ge('opinion' + id + 'deleted').innerHTML = text;
  }
  ajax.post("/opinions.php", {act: 'a_delete_opinion', id: id, out: out});
}

function restore_opinion(id, out) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (text == 'g') {
      show('opinion' + id);
      hide('opinion' + id + 'deleted');
    } else {
      ge('opinion' + id + 'deleted').innerHTML = text;
    }
  }
  ajax.post("/opinions.php", {act: 'a_restore_opinion', id: id, out: out});  
}

function blacklist_opinion(id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    show('opinion' + id + 'bl');
    ge('opinion' + id + 'bl').innerHTML = text;
    if (parseInt(ge('opinion' + id + 'result').value)) {
      ge('opinion' + id + 'bllink').innerHTML = ge('unblacklist_text').value;
      ge('opinion' + id + 'bllink').href = 'javascript: unblacklist_opinion(' + id + ')';
    }
  }
  ajax.post("/opinions.php", {act: 'a_blacklist_opinion', id: id});  
}

function unblacklist_opinion(id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    show('opinion' + id + 'bl');
    ge('opinion' + id + 'bl').innerHTML = text;
    if (parseInt(ge('opinion' + id + 'result').value)) {
      ge('opinion' + id + 'bllink').innerHTML = ge('blacklist_text').value;
      ge('opinion' + id + 'bllink').href = 'javascript: blacklist_opinion(' + id + ')';
    }
  }
  ajax.post("/opinions.php", {act: 'a_unblacklist_opinion', id: id});
}

function toggle_clear_bl() {
  toggle('clear_bl_confirm');
  if (isVisible('clear_bl_confirm')) {
   addEvent(document, 'keydown', function(e) { if (e.keyCode == 27) { hide('clear_bl_confirm'); }});
  } else {
   removeEvent(document, 'keydown');
  }
}

function clear_blacklist() {
  var ajax = new Ajax();
  show('clearing_bl_progress');
  ajax.onDone = function(obj, text) {
    ge('clear_bl_confirm').innerHTML = '<div class="msg" style="margin: 0px">Черный список полностью очищен.</div>';
    ge('clear_bl').innerHTML = '.';
    ge('clear_bl').style.fontWeight = 'bold';
  }
  ajax.post("/opinions.php", {act: 'a_clear_blacklist', 'hash': ge('clear_bl_hash').value});
}