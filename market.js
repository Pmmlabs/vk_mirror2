(function($){
$.fn.extend({
  placeholder: function(text) {
    return this.each(function(){
      var obj = $(this);
      if (obj.val().length > 0 && obj.val() != text) {
        obj.attr('typed', '1');
      } else {
        obj.val(text).css('color', '#777');
      }
      obj.focus(function(){
        this.style.color = '#000';
        this.value =  this.getAttribute('typed') ? this.value : '';
      }).blur(function(){
        if ($.trim(this.value) == '') {
          this.value = text;
          this.setAttribute('typed', '');
          this.style.color = '#777';
        } else {
          this.setAttribute('typed', '1');
        }
      });
    });
  }
});
})(jQuery);

var adBox;
function showAboutAds() {
if (!adBox) {
 adBox = new MessageBox({title: getLang('market_about_paid_ads')});
}
adBox.removeButtons().addButton(
 {label:getLang('market_ok'), onClick: function(){adBox.hide();}}
).content("<div>" + getLang('market_can_promote') + "<br /><br /><b>" + getLang('market_features') + "</b><br /><br /></div><ul class='listing'><li><span>" + getLang('market_determine_cost') + "</span></li><li><span>" + getLang('market_pay_for_result') + "</span></li></ul><div>" + getLang('market_more_info') + "<br /><br /><div style='text-align:right'><a href='market.php?act=cat'>" + getLang('market_create_ad') + " &raquo;</a></div></div>").show();
 return false;
}

var noBox;
function showNoBox() {
if (!noBox) {
 noBox = new MessageBox({title: getLang('market_available_later')});
}
noBox.removeButtons().addButton(
 {label:'OK', onClick: function(){noBox.hide();}}
).content("<div>" + getLang('market_available_after') + "</div>").show();
 return false;
}

var submitted = false;
var cur_offset = 0;

function submitItemForm(form) {
  // return if form is being submittеd
  if (submitted) {
    return false;
  }
  submitted = true;
  var params = form.serialize();
  if (current_photos) {
    for (var i in current_photos) {
      if (i.toString().charAt(0) == '_') {
        if (!current_photos[i].deleted) {
          params += '&addImage[]=' + current_photos[i].photo_id;
        }
      } else {
        if (current_photos[i].deleted) {
          params += '&deleteImage[]=' + i;
        }
      }
    }
  }
  if (ge('captcha')) {
    params += '&captcha=' + encodeURIComponent(ge('captcha').value);
  }
  show('saving_progress');
  Ajax.postWithCaptcha('market.php?act=save', params, {
   onSuccess: function(ajaxObj, responseText) {
    var response = eval('(' + responseText + ')');
    if (response['error']) {
      hide('saving_progress');
      ge('errorMessage').innerHTML = '<div class="alertmsg">' + response['error'] + '</div>';
      slideDown(ge('errorMessage'), 200);
      if (response['sid']) {
         ge('captchaRow').style.display = (browser.msie ? 'block' : 'table-row');
         ge('captchaImg').src = '/captcha.php?sid=' + response['sid'];
         ge('current_sid').value = response['sid'];
         ge('captcha').focus();
      }
      submitted = false;
    } else {
      var photosForm = $('#photosForm').get(0);
      var selected_files = ge('selected_files');
      if (!selected_files) {
        if (photosForm.file1.value) {
          photosForm.hash.value = response.hash;
          photosForm.rhash.value = response.rhash;
          photosForm.aid.value = response.album_id;
          photosForm.mid.value = response.mid;
          photosForm.gid.value = response.item_id;
          photosForm.submit();
        } else {
          location.replace('market.php?act=view&id='+response.item_id+'&m=1'+ge('referrer').value);
        }
      } else {
        if (selected_files.childNodes.length) {
          var filenames = selected_files.getElementsByTagName('input');
      for (var i = 0; i < filenames.length; ++i) {
            filenames[i].name = 'file' + (i + 1);
          }
          photosForm.hash.value = response.hash;
          photosForm.rhash.value = response.rhash;
          photosForm.aid.value = response.album_id;
          photosForm.mid.value = response.mid;
          photosForm.gid.value = response.item_id;
          photosForm.submit();
        } else {
          location.replace('market.php?act=view&id='+response.item_id+'&m=1'+ge('referrer').value);
        }
      }
    }
  },
  onCaptchaShow: function(){hide('saving_progress'); submitted = false;}
  });
  return true;
}

function update_page(obj, text) {
  var old_section = 0;
  if (ge('section_index')) {
    old_section = ge('section_index').innerHTML;
  } else {
    old_section = ge('section').value;
  }
  if (old_section) {
    old_section = parseInt(old_section);
  } else {
    old_section = 0;
  }

  $('#itemsList').html(text);

  var new_section = ge('section_index').innerHTML;
  if (new_section) {
    new_section = parseInt(new_section);
  } else {
    new_section = 0;
  }

  if (new_section != old_section) {
    ge('section').value = new_section;
    setSectionActive(new_section);
    updateCategories(new_section);
    selectCategory(new_section, parseInt(ge('category_index').innerHTML));
  }

    $('#pageProgressTop').hide();
    $('#pageProgressBottom').hide();
    $("html,body").animate({
      scrollTop: 0
    }, "normal");
}

function selectCategory(section, category) {
   if ((section > 0) && (category > 0)) {
     var selCat = ge('category');
     for (var i in selCat.options) {
       if (selCat.options[i]) {
         if (selCat.options[i].value) {
           if (parseInt(selCat.options[i].value) == category) {
             selCat.selectedIndex = i;
             return;
           }
         }
       }
     }
   }
}

function setSectionActive(section) {
   var current = $('#section' + section);
   $('#sections a').each(function(){
     if (this.className.indexOf('active') != -1) {
      this.className = this.className.substr(0, this.className.indexOf('active'));
     }
   });
   current.addClass('active');
}

function updateCategories(section) {
   var selCat = $('#category');
   if (section > 0) {
     var sectionCats = categories[section];

     var length = 0;
     selCat.empty();
     selCat.append('<option value="0">' + getLang('market_all_categs') + '</option>');
     selCat.append('<option disabled="disabled">--------------------------------------</option>');

     for (var i in sectionCats) {
       length++;
       selCat.append('<option value="' + i + '">' + sectionCats[i] + '</option>');
     }
     if (length > 0) {
       selCat.show();
     } else {
       selCat.hide();
     }
   } else {
     selCat.hide();
   }
}

function getSection(section) {
   if (section == undefined) {
     section = $('#section').val();
   }
   ge('section').value = section;
   var current = $('#section' + section);
   if (current.length && current.hasClass('active') && delete_id == undefined) {
     return false;
   };
   setSectionActive(section);
   $('#itemsList').html('<div id="progressBar"></div>');

   if ($('#searchForm').length) {
     var selCat = $('#category');
     $('#section').val(section);
     selCat.val(0);
     if (!$('#searchField').attr('typed')) {
       $('#searchField').attr('disabled', 'disabled');
     }
     var data = {
       cat: ge('category').options[ge('category').selectedIndex].value,
       price_min: ge('minPrice').value,
       price_max: ge('maxPrice').value,
       section: section,
       show: ge('show').value,
       st: 0,
       q: ge('searchField').value
     };
     if (data.price_min == 'от') {
       data.price_min = '';
     }
     if (data.price_max == 'до') {
       data.price_max = '';
     }
     if (data.q == getLang('market_ads_search')) {
       data.q = '';
     }

     $('#searchField').attr('disabled', '');

     updateCategories(section);
   } else {
     var data = {
       cat: 0,
       price_min: '',
       price_max: '',
       section: section,
       show: ge('show').value,
       st: 0,
       q: ''
     };
   }
   ajaxHistory.go(data);

   return false;
}

function getPage(offset) {
  cur_offset = offset;
  $('#pageProgressTop').show();
  $('#pageProgressBottom').show();

  if ($('#searchForm').length) {
    var data = {
      q: ($('#searchField').attr('typed') ? $('#searchField').val() : ''),
      section: $('#section').val(),
      cat: $('#category').val(),
      show: $('#show').val(),
      st: offset,
      nc: $('#nc').val()
    };
  } else {
    var data = {
      cat: 0,
      price_min: '',
      price_max: '',
      section: ge('section').value,
      show: ge('show').value,
      st: offset,
      nc: ge('nc').value//,
      //q: ''
    };
  }

  ajaxHistory.go(data);
  return false;
}

function deleteAll(id) {
 $.ajax({url: 'market.php?act=delete_all', type: 'post', data: {id: id}, success: function(data, textStatus){
   getPage(cur_offset);
  }
 });
 return false;
}

function deleteItem(id, where) {
 var hash = ge('faveHash').value;
 if (!ge('deleting_' + id)) {
  var node = document.createElement('input');
  node.type = 'hidden';
  node.id = 'deleting_' + id;
  node.value = 1;
  document.body.appendChild(node);
 } else if (parseInt(ge('deleting_' + id).value)) {
  return false;
 } else {
  ge('deleting_' + id).value = 1;
 }
 $.ajax({url: 'market.php?act=delete', type: 'post', data: {id: id, hash: hash, mode: where}, success: function(data, textStatus){
   ge('deleting_' + id).value = 0;
   if (where == 0) {hide('item'+id);} else {setOpacity(ge('item'+id), 50);} ge('res'+id).innerHTML = data; show('res'+id);
  }
 });
 return false;
}

function restoreItem(id, where) {
 var hash = ge('faveHash').value;
 $.ajax({url: 'market.php?act=restore', type: 'post', data: {id: id, hash: hash, mode: where}, success: function(data, textStatus){
   if (where == 0) {show('item'+id); hide('res'+id); ge('faved'+id).innerHTML = data;} else {setOpacity(ge('item'+id), 100); ge('res'+id).innerHTML = data; show('res'+id);}
  }
 });
 return false;
}

function setOpacity(obj, percent) {
try { if (browser.msie) {
  var y = obj.offsetHeight;
  obj.style.height = y+"px";
  obj.style.filter = "alpha(opacity="+percent+")";
 } else {
  obj.style.opacity = percent/100;
 }
} catch (e) {
if (browser.msie) {
  var y = obj.offsetHeight;
  obj.style.height = y+"px";
  obj.style.filter = "alpha(opacity="+percent+")";
 } else {
  obj.style.opacity = percent/100;
 }

}
}

var reportBox;
var reason = 0;
function reportItem(id) {
  if (!reportBox) reportBox = new MessageBox({title: getLang('market_report')});
  reportBox.removeButtons().addButton({
    label:getLang('market_send'),
    onClick: function(){
     $.ajax({url: 'market.php?act=report', type: 'post', data: {id: id, reason: reason}, success: function(data, textStatus){
       ge('faved'+id).innerHTML = data; setOpacity(ge('item'+id), 50); show('faved'+id);
      }
     });
     reportBox.hide();
    }
  }).addButton({
    label: getLang('market_cancel'),
    style: 'button_no',
    onClick: function(){
      reportBox.hide();
    }
  }).content("" + getLang('market_select_ban_reason') + "<br /><br /><div id='marketReport'><div><input type='radio' name='reason' id='r1' onclick='reason=1' checked><label for='r1'>" + getLang('market_reason_spam') + "</label></div><div><input type='radio' name='reason' id='r2' onclick='reason=2'><label for='r2'>" + getLang('market_reason_porn') + "</label></div><div><input type='radio' name='reason' id='r3' onclick='reason=3'><label for='r3'>" + getLang('market_reason_cheat') + "</label></div><div><input type='radio' name='reason' id='r4' onclick='reason=4'><label for='r4'>" + getLang('market_reason_offtop') + "</label></div><div><input type='radio' name='reason' id='r5' onclick='reason=5'><label for='r5'>" + getLang('market_reason_duplicate') + "</label></div><div><input type='radio' name='reason' id='r6' onclick='reason=6'><label for='r6'>" + getLang('market_reason_extr') + "</label></div><div><input type='radio' name='reason' id='r7' onclick='reason=7'><label for='r7'>" + getLang('market_reason_nonsense') + "</label></div><div><input type='radio' name='reason' id='r8' onclick='reason=8'><label for='r8'>" + getLang('market_reason_ortho') + "</label></div></div>").show();
  return false;
}

var photoBox, pic, showTimer;

function showPhoto(url, photo_id) {
  if (showTimer) {
    clearTimeout(showTimer);
  }
  pic = new Image();
  pic.src = url;
  if (!pic.width) {
   var coords = durovGetXY(ge('photo'+photo_id));
   ge('imageProgress').style.height = ge('photo'+photo_id).offsetHeight+"px";
   ge('imageProgress').style.left = coords[0]+"px";
   ge('imageProgress').style.top = coords[1]+"px";
   show('imageProgress');
   showTimer = setTimeout("showPhoto('" + url + "', '" + photo_id + "')", 1500);
   return false;
  }
  if (!photoBox) {
    var params = {};
    if (photosCount < 2) {
      params['type'] = 'POPUP';
      params['width'] = 'auto';
    }
    photoBox = new MessageBox(params);
    if (photosCount > 1) {
      photoBox.addButton({label: 'Закрыть', onClick: function() {
        hide('imageProgressBig');
        clearTimeout(showTimer);
        photoBox.hide();
      }});
    }
  }
  if (photosCount < 2) {
    photoBox.content('<img src="' + url + '" />').show();
  } else {
    renderPhoto(url);
  }
  hide('imageProgress');
  return false;
}

function showNextPhoto(url, afterWaited) {
  if (showTimer) {
    clearTimeout(showTimer);
  }
  if (afterWaited) {
    pic = new Image();
    pic.src = url;
  }
  if (!pic.width) {
   var coords = durovGetXY(ge('currentPhoto'));
   ge('imageProgressBig').style.width = ge('currentPhoto').offsetWidth+"px";
   ge('imageProgressBig').style.height = ge('currentPhoto').offsetHeight+"px";
   ge('imageProgressBig').firstChild.style.marginTop = ((ge('currentPhoto').offsetHeight - 8) / 2) + "px";
   ge('imageProgressBig').style.left = coords[0]+"px";
   ge('imageProgressBig').style.top = coords[1]+"px";
   show('imageProgressBig');
   showTimer = setTimeout("showNextPhoto('" + url + "', 1)", 1500);
   return false;
  }
  renderPhoto(url);
  hide('imageProgressBig');
}

function renderPhoto(url) {
  var index = 0;
  for (var i = 0; i < photosCount; ++i) {
    if (photosOfItem[i] == url) {
      index = i + 1;
      break;
    }
  }
  var title = getLang('market_photo_one_of_photo').replace('{index}', index).replace('{count}', photosCount);
  if (index == photosCount) {
    index = 0;
  }
  photoBox.setOptions({title: title, width: parseInt(pic.width) + 30});
  photoBox.content('<a href="#next" onclick="showNextPhoto(\'' + photosOfItem[index] + '\'); return false;"><img id="currentPhoto" src="' + url + '" /></a>').show();

  pic = new Image();
  pic.src = photosOfItem[index];
}

function durovGetXY(obj) {
 if (!obj || obj == undefined) return;
 var left = 0, top = 0;
 if (obj.offsetParent) {
  do {
   left += obj.offsetLeft;
   top += obj.offsetTop;
  } while (obj = obj.offsetParent);
 }
 return [left,top];
}

function addToFavesSearch(id) {
 ge('to_faves' + id).innerHTML = "<a onclick=\"return deleteFromFavesSearch("+id+");\" href='#' >" + market_defave + "</a>";
 $('#faved' + id).load('market.php?act=add_to_faves&mode=1', {id: id, hash: ge('faveHash').value});
 plusFave();
 return false;
}

function plusFave() {
 var fave_num = parseInt(ge('faveNum').value);
 if (fave_num == 0 && ge('market_tab')) {
  ge('market_tab').style.display = '';
 }
 ge('faveNum').value = fave_num + 1;
}

function minusFave() {
 var fave_num = parseInt(ge('faveNum').value);
 if (fave_num == 1 && ge('market_tab')) {ge('market_tab').style.display = 'none';}
 ge('faveNum').value = fave_num - 1;
}

function deleteFromFavesSearch(id) {
 ge('to_faves' + id).innerHTML = "<a onclick=\"return addToFavesSearch("+id+");\" href='#' >" + market_enfave + "</a>";
 $('#faved' + id).load('market.php?act=delete_from_faves&mode=1', {id: id, hash: ge('faveHash').value});
 minusFave();
 return false;
}

function addToFaves(id) {
 var hash = ge('faveHash').value;
 $.ajax({url: 'market.php?act=add_to_faves', type: 'post', data: {id: id, hash: hash},
  success: function(data, textStatus){
   if (parseInt(data) == 1) {
    show('added_msg');
    hide('deled_msg');
    hide('add_to_faves');
    ge('delete_from_faves').style.display = '';
    plusFave();
   }
  }
 });
 return false;
}

function deleteFromFaves(id) {
 var hash = ge('faveHash').value;
 $.ajax({url: 'market.php?act=delete_from_faves', type: 'post', data: {id: id, hash: hash}, success: function(data, textStatus){
   if (parseInt(data) == 1) {
    hide('added_msg');
    show('deled_msg');
    hide('delete_from_faves');
    ge('add_to_faves').style.display = '';
    minusFave();
   }
  }
 });
 return false;
}

function showCatCount(obj_id, val) {
 obj = ge(obj_id);
 var coords = durovGetXY(obj);
 var max_label = ge('max_label_count');
 max_label.innerHTML = val;
 max_label.style.display = 'block';
 max_label.style.top = coords[1] + "px";
 var left = window.is_rtl ? coords[0] - max_label.offsetWidth - 5 : coords[0] + obj.offsetWidth + 5;
 max_label.style.left = left + "px";
}

function hideCatCount() {
 hide('max_label_count');
}

function user_moderation_selected(id) {
  var ajax = new Ajax();
  if (!ge('sending_to_' + id)) {
    var node = document.createElement('input');
    node.type = 'hidden';
    node.id = 'sending_to_' + id;
    node.value = 1;
    document.body.appendChild(node);
  } else if (parseInt(ge('sending_to_' + id).value)) {
    return;
  } else {
    ge('sending_to_' + id).value = 1;
  }
  var status = ge('user_moderation_select').options[ge('user_moderation_select').selectedIndex].value;
  ajax.onDone = function(obj, txt) {
    ge('sending_to_' + id).value = 0;
    ge('user_moderation_progress').style.display = 'none';
    if (txt.substr(0, 1) != 'g') {
      alert('Sorry, could not perform your request!');
    } else {
      if (ge('added_counter')) {
        ge('added_counter').style.display = 'none';
      }
    }
  }
  ajax.onFail = function() {
    ge('sending_to_' + id).value = 0;
    ge('user_moderation_progress').style.display = 'none';
    alert('Sorry, could not perform your request!');
  }
  var back_link = ge('back_link') ? ge('back_link').value : '';
  ajax.post('market.php', {'act': 'a_user_moderation_status', 'mid': id, 'status': status, 'back_link': back_link});
  ge('user_moderation_progress').style.display = 'inline';
}

function user_moderation_status(id, status, sure) {
  var selected_items = '';
  if (status == -1 && !sure) {
    for (var i in items_list) {
      var cur_id = parseInt(i);
      if (ge('select' + cur_id) && !items_list[cur_id]) {
        if (selected_items.length) {
          selected_items += '_' + cur_id;
        } else {
          selected_items += cur_id;
        }
      }
    }
    if (selected_items.length) {
      var confirm = new MessageBox({title: 'Предупреждение'});
      confirm.content('Вы хотите также <b>удалить все неотмеченные</b> вами объявления?');
      confirm.addButton({label: 'Нет', onClick: function() { user_moderation_status(id, status, true); confirm.hide(); }});
      confirm.addButton({label: 'Да', onClick: function() { location.replace('/market.php?act=delete_warn&items=' + selected_items); }});
      confirm.show();
      return;
    }
  }
  var ajax = new Ajax();
  if (!ge('sending_to_' + id)) {
    var node = document.createElement('input');
    node.type = 'hidden';
    node.id = 'sending_to_' + id;
    node.value = 1;
    document.body.appendChild(node);
  } else if (parseInt(ge('sending_to_' + id).value)) {
    return;
  } else {
    ge('sending_to_' + id).value = 1;
  }
  ajax.onDone = function(obj, txt) {
    ge('sending_to_' + id).value = 0;
    ge('user_moderation_progress').style.display = 'none';
    if (txt.substr(0, 1) != 'g') {
      alert('Sorry, could not perform your request!');
    } else {
      if (status == 0) {
        ge('user_clear').style.display = 'none';
        ge('user_is_ok').style.fontWeight = 'normal';
        ge('user_is_ok').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 1)'>проверенный</a>";
        ge('user_attention').style.fontWeight = 'normal';
        ge('user_attention').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 2)'>подозрительный</a>";
        if (ge('warn_added_counter')) {
          ge('warn_added_counter').innerHTML = '';
        }
      } else if (status == 1) {
        ge('user_clear').style.display = 'inline';
        ge('user_is_ok').style.fontWeight = 'bold';
        ge('user_is_ok').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 1)'>проверенный</a>";
        ge('user_attention').style.fontWeight = 'normal';
        ge('user_attention').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 2)'>подозрительный</a>";
        if (ge('warn_added_counter')) {
          ge('warn_added_counter').innerHTML = '';
        }
      } else if (status == 2) {
        ge('user_clear').style.display = 'inline';
        ge('user_is_ok').style.fontWeight = 'normal';
        ge('user_is_ok').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 1)'>проверенный</a>";
        ge('user_attention').style.fontWeight = 'bold';
        ge('user_attention').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", 2)'>подозрительный</a>";
        if (ge('warn_added_counter')) {
          ge('warn_added_counter').innerHTML = '';
        }
      } else if (status == -1) {
        ge('user_warn').style.fontWeight = 'normal';
        ge('user_warn').innerHTML = 'предупрежден';
        var btn = '<ul class="nNav" style="float: right"><li><b class="nc"><b class="nc1"></b><b class="nc2"></b></b><span class="ncc"><a href="javascript: user_moderation_status(' + id + ', -2)">Отмена</a></span><b class="nc"><b class="nc2"></b><b class="nc1"></b></b></li></ul>';
        ge('itemsList').innerHTML = '<div id="user_warned_message" style="padding: 0px 10px 10px 10px"><div class="message">' + btn + '<div style="padding: 5px 0px">Пользователь предупрежден о нарушении правил.</div></div></div>' + ge('itemsList').innerHTML;
      } else if (status == -2) {
        var msg = ge('user_warned_message');
        if (msg) {
          msg.parentNode.removeChild(msg);
        }

        ge('user_warn').style.fontWeight = 'normal';
        ge('user_warn').innerHTML = "<a href='javascript: user_moderation_status(" + id + ", -1)'>предупредить</a>";
      } else if (status == -3) {
        var msg = ge('warning_message');
        if (msg) {
          msg.parentNode.removeChild(msg);
        }
        if (ge('rules')) {
          ge('rules').style.display = 'block';
        }
        if (ge('formButtons')) {
          ge('formButtons').innerHTML = txt.substr(1);
        }
      } else {
        alert('Sorry, could not perform your request!');
      }
    }
  }
  ajax.onFail = function() {
    ge('sending_to_' + id).value = 0;
    ge('user_moderation_progress').style.display = 'none';
    alert('Sorry, could not perform your request!');
  }
  var back_link = ge('back_link') ? ge('back_link').value : '';
  ajax.post('market.php', {'act': 'a_user_moderation_status', 'mid': id, 'status': status, 'back_link': back_link});
  ge('user_moderation_progress').style.display = 'inline';
}

function albums_message() {
  return market_photos_for_ad + ' ' + photos_count + '. ' + market_photos_you_can + ' ' + market_photos_choose_album;
}

function album_message() {
  return market_photos_for_ad + ' ' + photos_count + '. ' + market_photos_you_can;
}

function generate_message(text, cancel_handler) {
  var buttons = '<div style="float: right; margin-left: 10px"><ul class="nNav"><li style="margin: 0px"><b class="nc"><b class="nc1"></b><b class="nc2"></b></b><span class="ncc"><a href="' + cancel_handler + '">' + market_photos_cancel + '</a></span><b class="nc"><b class="nc2"></b><b class="nc1"></b></b></li></ul></div>';
  return '<div class="from_albums_controls"><div style="height: 23px; vertical-align: middle;">' + buttons + text + '</div></div>';
}

var last = 1;
var selected_files = new Object();

function photo_file_selected() {
  var new_photo = ge('photo_file_inputs').firstChild;
  if (new_photo.value.length) {
    var new_index = last;
    while (new_index && (!ge('file' + new_index))) {
      new_index--;
    }
    new_index++;
    last = new_index;
    var new_div = document.createElement('div');
    new_div.id = 'file' + new_index + 'container';
    new_div.innerHTML = '<table cellpadding="0" cellspacing="0" style="padding: 0"><tr style="padding: 0"><td id="file' + new_index + 'cell" style="padding: 0"><span id="flag_for_' + new_index + '">&nbsp;</span></td><td style="vertical-align: middle; padding: 0;"><a id="delete_photo_file_link_' + new_index + '" href="javascript: delete_photo_file(' + new_index + ')">' + market_photo_delete + '</a></td></tr></table>';
    ge('selected_files').appendChild(new_div);
    ge('photo_file_inputs').removeChild(new_photo);
    ge('file' + new_index + 'cell').insertBefore(new_photo, ge('flag_for_' + new_index));
    new_photo.setAttribute('id', 'file' + new_index);
    new_photo.setAttribute('name', 'file' + new_index);
    selected_files[new_index] = true;
    ge('photo_file_inputs').innerHTML = '<input type="file" id="new_photo" name="new_photo" class="upload" onchange="photo_file_selected()"/>';
    ++photos_count;
    if (photos_count >= 5) {
      ge('adding_photos').style.display = 'none';
      ge('photo_file_inputs').style.display = 'none';
    }
  }
  for (var i in selected_files) {
    if (selected_files[i]) {
      var file = ge('file' + i);
      if (!file.value.length) {
        delete_photo_file(i);
      }
    }
  }
}

function delete_photo_file(id) {
  var file = ge('file' + id + 'container');
  if (file) {
    ge('selected_files').removeChild(file);
    selected_files[id] = false;
    --photos_count;
    if (photos_count < 5) {
      ge('adding_photos').style.display = 'block';
      ge('photo_file_inputs').style.display = 'block';
    }
  }
}

function check_new_photo() {
  var new_photo = ge('new_photo');
  if (new_photo) {
    if (new_photo.value.length) {
      ge('photo_file_inputs').removeChild(new_photo);
      ge('photo_file_inputs').innerHTML += '<input type="file" id="new_photo" name="new_photo" class="upload" onchange="photo_file_selected()"/>';
    }
  }
}

onDomReady(function() {
  setTimeout("check_new_photo()", 10);
});

function checked(item_id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, txt) {
    hide('check_progress');
    if (txt == 'g') {
      var where_to = ge('check_link').getElementsByTagName('a')[0].href;
      ge('check_link').style.fontWeight = 'bold';
      ge('check_link').style.color = '#2B587A';
      ge('check_link').innerHTML = 'Проверено';
      document.location = where_to;
    } else {
      alert('Sorry, could not perform your request!');
    }
  }
  ajax.onFail = function() {
    hide('check_progress');
    alert('Sorry, could not perform your request!');
  }
  ge('check_progress').style.display = 'inline';
  ajax.post('market.php', {'act': 'a_checked', 'item_id': item_id});
  return false;
}

function blacklist_page(page) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    ge('memberPages').innerHTML = text;
  }
  ajax.post('/market.php', {'act': 'a_blacklist_page', 'index': page});
  if (ge('loading_page_up')) {
    ge('loading_page_up').style.display = 'inline';
    ge('loading_page_down').style.display = 'inline';
  }
}

function show_message_box(cls, msg) {
  ge('messageWrap').style.display = 'block';
  ge('messageWrap').innerHTML = '<div id="' + cls + '">' + msg + '</div>';
  setTimeout(function() { (new effects.fader()).fade(ge(cls), [0xFFFFFF, 0xDDDDDD], 3000); }, 2500);
}

function blacklist_user() {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    hide('adding_progress');
    ge('adding_page').disabled = false;
    var result = text.substr(0, 1);
    if (result == 'd') {
      show_message_box('error', 'Этот пользователь уже есть в списке.');
      ge('memberPages').innerHTML = text.substr(1);
    } else if (result == 'g') {
      show_message_box('message', 'Пользователь занесен в черный список.');
      ge('adding_page').value = "";
      ge('memberPages').innerHTML = text.substr(1);
    }
    ge('adding_page').blur();
    ge('adding_page').focus();
  };
  ge('adding_progress').style.display = 'inline';
  ajax.post('/market.php', {'act': 'a_blacklist_user', 'page': ge('adding_page').value, 'hash': ge('hash').value});
}

function unblacklist_user(user_id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (user_id) {
      ge('memberOptions_' + user_id).innerHTML = '<span style="font-weight: bold">Пользователь удален из черного списка</span>';
      effects.fadeToDld(ge('memberRow_' + user_id));
      setTimeout(function() { new effects.fader().fade(ge('memberRow_'+ user_id), [0xFFFFFF, 0xD8DFEA], 3000); }, 2500);

    } else {
      hide('removing_progress');
      ge('removing_page').disabled = false;
      var result = text.substr(0, 1);
      if (result == 'd') {
        show_message_box('error', 'Этого пользователя нет в списке.');
        ge('memberPages').innerHTML = text.substr(1);
      } else if (result == 'g') {
        show_message_box('message', 'Пользователь удален из черного списка.');
        ge('removing_page').value = "";
        ge('memberPages').innerHTML = text.substr(1);
      }
      ge('removing_page').blur();
      ge('removing_page').focus();
    }
  };
  if (user_id) {
    ge('memberOptions_' + user_id).innerHTML = '<img src="/images/upload.gif">';
  } else {
    ge('removing_progress').style.display = 'inline';
  }
  ajax.post('/market.php', {'act': 'a_unblacklist_user', 'user_id': user_id, 'page': ge('removing_page').value, 'hash': ge('hash').value});
}

var captcha_loading = false;

function captcha_loaded() {
  captcha_loading = false;
  hide('captcha_loading_img');
  setOpacity(ge('captchaImg'), 100);
  ge('captcha').focus();
}

function reload_captcha() {
  if (captcha_loading) {
    return false;
  }
  captcha_loading = true;
  ge('captchaImg').src = '/captcha.php?sid=' + ge('current_sid').value + '&rfrsh=' + Math.random();
  captcha_loading = true;
  setOpacity(ge('captchaImg'), 30);
  show('captcha_loading_img');
}

function spamlist_words() {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    hide('adding_progress');
    ge('adding_words').disabled = false;
    var result = text.substr(0, 1);
    if (result == 'q') {
      show_message_box('error', 'Не введено ни одного слова длиной хотя бы три символа.');
    } else if (result == 'd') {
      show_message_box('error', 'Это слово уже есть в спам-фильтре.');
      ge('memberPages').innerHTML = text.substr(1);
    } else if (result == 'g') {
      show_message_box('message', 'Слово занесено в спам-фильтр.');
      ge('adding_words').value = "";
      ge('memberPages').innerHTML = text.substr(1);
    } else if (result == 'n') {
      show_message_box('error', 'Эти слова уже есть в спам-фильтре.');
    } else if (result == 'm') {
      show_message_box('message', 'Слова занесены в спам-фильтр.');
      ge('adding_words').value = "";
      ge('memberPages').innerHTML = text.substr(1);
    } else if (result == 'p') {
      show_message_box('message', 'Какие-то слова занесены в спам-фильтр, остальные там уже есть.');
      ge('memberPages').innerHTML = text.substr(1);
    }
    ge('adding_words').blur();
    ge('adding_words').focus();
  };
  ge('adding_progress').style.display = 'inline';
  ajax.post('/market.php', {'act': 'a_spamlist_words', 'words': ge('adding_words').value, 'hash': ge('hash').value});
}

function unspamlist_words(id) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    if (id) {
      ge('memberOptions_' + id).innerHTML = '<span style="font-weight: bold">Слово удалено из спам-фильтра</span>';
      effects.fadeToDld(ge('memberRow_' + id));
      setTimeout(function() { new effects.fader().fade(ge('memberRow_'+ id), [0xFFFFFF, 0xD8DFEA], 3000); }, 2500);

    } else {
      hide('removing_progress');
      ge('removing_words').disabled = false;
      var result = text.substr(0, 1);
      if (result == 'q') {
        show_message_box('error', 'Не введено ни одного слова длиной хотя бы три символа.');
      } else if (result == 'd') {
        show_message_box('error', 'Этого слова нет в спам-фильтре.');
        ge('memberPages').innerHTML = text.substr(1);
      } else if (result == 'g') {
        show_message_box('message', 'Слово удалено из спам-фильтра.');
        ge('removing_words').value = "";
        ge('memberPages').innerHTML = text.substr(1);
      } else if (result == 'm') {
        show_message_box('message', 'Слова удалены из спам-фильтра.');
        ge('removing_words').value = "";
        ge('memberPages').innerHTML = text.substr(1);
      } else if (result == 'p') {
        show_message_box('message', 'Каких-то слов нет в спам-фильтре, остальные удалены.');
        ge('memberPages').innerHTML = text.substr(1);
      } else if (result == 'n') {
        show_message_box('error', 'Этих слов нет в спам-фильтре.');
        ge('memberPages').innerHTML = text.substr(1);
      }
      ge('removing_words').blur();
      ge('removing_words').focus();
    }
  };
  if (id) {
    ge('memberOptions_' + id).innerHTML = '<img src="/images/upload.gif">';
  } else {
    ge('removing_progress').style.display = 'inline';
  }
  ajax.post('/market.php', {'act': 'a_unspamlist_words', 'id': id, 'words': ge('removing_words').value, 'hash': ge('hash').value});
}

function spamlist_page(page) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, text) {
    ge('memberPages').innerHTML = text;
  }
  ajax.post('/market.php', {'act': 'a_spamlist_page', 'index': page});
  if (ge('loading_page_up')) {
    ge('loading_page_up').style.display = 'inline';
    ge('loading_page_down').style.display = 'inline';
  }
}

var selecting = -1, selecting_from = 0, start_id = 0, event_added = 0;

function change_select(item_id, ev) {
  if (!ev || !ev.shiftKey) {
    selecting = -1;
  }
  if (selecting >= 0) {
    var in_range = false;
    for (var i in items_list) {
      var cur_id = parseInt(i);
      if (ge('select' + cur_id)) {
        if (!in_range && (cur_id == item_id || cur_id == selecting_from)) {
          in_range = true;
          start_id = (item_id == selecting_from) ? 0 : cur_id;
        }
        if (in_range) {
          items_list[cur_id] = selecting;
          if (selecting) {
            addClass(ge('select' + cur_id), 'selected');
          } else {
            removeClass(ge('select' + cur_id), 'selected');
          }
        }
        if (in_range && (cur_id == item_id || cur_id == selecting_from) && (cur_id != start_id)) {
          in_range = false;
        }
      }
    }
  } else {
    if (items_list[item_id]) {
      items_list[item_id] = 0;
    } else {
      items_list[item_id] = 1;
    }
    if (items_list[item_id]) {
      addClass(ge('select' + item_id), 'selected');
    } else {
      removeClass(ge('select' + item_id), 'selected');
    }
    if (selecting < 0) {
      selecting = items_list[item_id];
      selecting_from = item_id;
    }
    if (!event_added) {
      addEvent(document, 'keyup', function(e) { if (e.keyCode == 16) { selecting = -1; } });
      event_added = true;
    }
  }
  var selected_items = [], not_selected_items = [];
  for (var i in items_list) {
    var cur_id = parseInt(i);
    if (ge('select' + cur_id) && !items_list[cur_id]) {
      selected_items.push(cur_id);
    } else {
      not_selected_items.push(cur_id);
    }
  }
  if (selected_items.length) {
    show('delete_warn_cont', 'delete_warn_link');
    ge('delete_warn_link').href = '/market.php?act=delete_warn&items=' + selected_items.join('_') + '&leave=' + not_selected_items.join('_');
  } else {
    hide('delete_warn_cont', 'delete_warn_link');
  }
}