function inviteMemberToGroup(gid, from_gid, mid, hash) {
  show("progr"+mid);
  Ajax.postWithCaptcha(
    'groups_ajax.php',
    {'act': 'ajaxinv', 'gid': gid, 'from_gid': from_gid, 'id': mid, 'hash': decode_hash(hash)},
    {onSuccess: function (ajaxObj, responseText) {
      ge('actions'+mid).innerHTML = responseText;
    }, onFail: function () {
      ge('fBox'+mid).innerHTML = 'There was a problem with the request.';
    }, onCaptchaHide: function() {
      hide("progr"+mid)
    }}
  );
}
function removeMember(gid, mid, hash) {
  show("progr"+mid);
  Ajax.Send('groups_ajax.php', {act: 'a_delete_member', gid: gid, id: mid, hash: hash}, {onSuccess: function (ajaxObj, responseText) {
    var result = eval('('+responseText+')');
    ge('actions'+mid).innerHTML = '<p id="msg">' + (result.result || result.error) + '</p>';
  }, onFail: function () {
    ge('fBox'+mid).innerHTML = 'There was a problem with the request.';
  }});
}

var invOffBox = null;
function showAddOfficerBoxNew(user_id, group_id, hash, success_style) {
  if (!invOffBox) {
    invOffBox = new MessageBox({title: groups_assigning_manager});
  }
  invOffBox.content("<div id='addOfficerFormCont'><table cellpadding=0><tr><td valign=top rowspan=2 style='padding-top: 5px'>" + groups_enter_post + "<td><td valign=top><input type='text' style='width: 182px' id='position" + user_id + "' name='position"+ user_id +"'><br><div style='margin-top: 2px'><input type='hidden' id='admin" + user_id + "' name='admin"+ user_id +"'></div></td></tr></table></div>");
  var uiIsAdmin = new Checkbox(ge("admin" + user_id), {
    width: 150,
    label: groups_group_admin
  });
  invOffBox.removeButtons();
  invOffBox.addButton({label: groups_cancel, style: 'button_no', onClick: function() { invOffBox.hide(); }});
  invOffBox.addButton({label: groups_assign, onClick: function() {
    ajax = new Ajax();
    ajax.onDone = function() {
      location.href = '/groups.php?act=people&gid='+ group_id + '&tab=admins';
    };
    ajax.post('/groups_ajax.php', { act: 'aappoint', id: user_id, gid: group_id, hash: hash, position: ge('position' + user_id).value, admin: uiIsAdmin.val()});
    ge('boxMessage').innerHTML = "<div style='text-align: center; height: 13px'><img valign='middle' src='images/progress7.gif'></div>";
  }});
  invOffBox.show();
  return false;
}
