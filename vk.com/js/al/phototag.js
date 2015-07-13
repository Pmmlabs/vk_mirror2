var Phototag = {
  startTag: function() {
    if (cur.pvTagger || !cur.pvPhoto.firstChild) return;

    if (!cur.pvFriends) {
      cur.pvFriends = layer.appendChild(ce('div', {id: 'pv_friends', innerHTML: '\
<div class="box_title_wrap"><div class="box_x_button"></div>\
  <div class="box_title">' + getLang('photos_typename') + '</div>\
</div>\
<div class="name_input"><input onkeyup="Phototag.updateFriends()" onkeypress="if (event.keyCode == 10 || event.keyCode == 13) Phototag.addTag()" type="text" id="pv_friend_name" class="text" /></div>\
<div class="list_wrap"><a href="/" onclick="return Phototag.addTag(' + vk.id + ', event)">' + getLang('photos_tags_me') + '</a>\
  <div id="pv_friends_cont"><div class="progress"></div></div>\
</div>\
<div class="box_controls_wrap">\
  <div class="box_controls">\
    <div id="pv_tag_buttons" class="clear_all">\
        <button class="flat_button fl_l" id="pv_add_tag">' + getLang('global_add') + '</button>\
        <button class="flat_button secondary fl_l" id="pv_cancel_tag">' + getLang('global_cancel') + '</button>\
    </div>\
    <div id="pv_tag_progress" class="progress"></div>\
  </div>\
</div>\
      '}));
      extend(cur, {
        pvFriendName: ge('pv_friend_name'),
        pvFriendsCont: ge('pv_friends_cont')
      });
      addEvent(cur.pvFriends, 'click', function() {
        cur.pvClicked = true;
      });
      var xbtn = cur.pvFriends.firstChild.firstChild;
      addEvent(xbtn, 'mouseover', function() { animate(this, {backgroundColor: '#FFFFFF'}, 200); });
      addEvent(xbtn, 'mouseout', function() { animate(this, {backgroundColor: '#9CB8D4'}, 200); });
      addEvent(xbtn, 'click', Phototag.stopTag);

      ge('pv_add_tag').onclick = Phototag.addTag;
      ge('pv_cancel_tag').onclick = Phototag.stopTag;
    }
    if (!cur.pvFriendsList) {
      ajax.post('al_friends.php', {act: 'pv_friends'}, {onDone: function(list) {
        cur.pvFriendsList = list;
        Phototag.cacheFriends();
        Phototag.updateFriends();
      }});
    } else {
      cur.pvFriendsQ = false;
      Phototag.updateFriends();
    }
    cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');
    cur.pvTagInfo.innerHTML = '<div class="msg"><a class="fl_r" onclick="Phototag.stopTag()">' + getLang('global_done') + '</a>' + getLang('photos_select_tag_area') + '</div>';
    show(cur.pvTagInfo);
    hide(cur.pvLeft, cur.pvLeftNav, cur.pvRightNav, cur.pvClose);
    Photoview.updateHeight();

    layerWrap.scrollTop = 0;
    cur.pvTagger = 'loading';

    if (!cur.pvTagger) return;
    var options = {
      minw: 30,
      minh: 30,
      onStart: (browser.msie || browser.mozilla) ? hide.pbind(cur.pvFriends) : fadeOut.pbind(cur.pvFriends, 200),
      onFinish: Phototag.showFriends
    }, ph = cur.pvData[cur.pvListId][cur.pvIndex];

    cur.pvTagger = photoTagger(cur.pvPhoto.firstChild, extend(options, {
      zstart: 600
    }));
  },
  stopTag: function() {
    if (!cur.pvTagger || cur.pvTagger == 'loading') {
      cur.pvTagger = false;
      return;
    }
    hide(cur.pvFriends, cur.pvTagInfo);
    if (cur.pvListId && cur.pvData[cur.pvListId].length > 1) {
      show(cur.pvLeft, cur.pvClose, cur.pvLeftNav, cur.pvRightNav);
    }
    Photoview.updateHeight();
    if (cur.pvFriendName) {
      cur.pvFriendName.value = '';
      cur.pvFriendsQ = false;
      Phototag.updateFriends();
    }
    cur.pvTagger.destroy();
    cur.pvTagger = false;
  },
  addTag: function(mid, ev) {
    if (checkEvent(ev)) return true;
    if (!cur.pvTagger || cur.pvTagger == 'loading') return false;
    if (isVisible('pv_tag_progress')) return false;

    var name = trim(cur.pvFriendName.value), rect = cur.pvTagger.result();
    if (!mid) {
      var list = cur.pvFriendsCont;
      if (name && list.firstChild && list.firstChild == list.lastChild && list.firstChild.tagName.toLowerCase() == 'a') {
        mid = list.firstChild.getAttribute('mid');
      }
    }
    if (!mid && !name || !rect[2]) {
      elfocus(cur.pvFriendName);
      return false;
    }
    var listId = cur.pvListId, index = cur.pvIndex, ph = cur.pvData[listId][index];
    var xy = getSize(cur.pvPhoto.firstChild);
    var x = (rect[0] / xy[0] * 100), y = (rect[1] / xy[1] * 100);
    var x2 = ((rect[0] + rect[2]) / xy[0] * 100), y2 = ((rect[1] + rect[3]) / xy[1] * 100);
    ajax.post('al_photos.php', {act: 'add_tag', mid: mid, photo: ph.id, name: name, hash: ph.hash, x: x, y: y, x2: x2, y2: y2}, {onDone: function(tags, tagged, html) {
      ph.tags = tags;
      ph.tagged = tagged;
      ph.tagshtml = html;
      if (cur.pvListId == listId && cur.pvIndex == index) {
        re(Photoview.actionInfo());
        Photoview.setTags(html);
        ((!ph.taginfo && ph.actions.tag && tags[0] < cur.pvMaxTags) ? show : hide)(cur.pvTagLink);
        var resetFr = function() {
          cur.pvFriendName.value = '';
          Phototag.updateFriends();
        }
        if (browser.msie || browser.mozilla) {
          hide(cur.pvFriends);
          resetFr();
        } else {
          fadeOut(cur.pvFriends, 200, resetFr);
        }
        cur.pvTagger.reset();
      }
    }, showProgress: function() {
      hide('pv_tag_buttons');
      show('pv_tag_progress');
    }, hideProgress: function() {
      hide('pv_tag_progress');
      show('pv_tag_buttons');
    }});
    return false;
  },

  updateFriends: function() {
    if (!cur.pvFriendsList || !cur.pvFriends) return;

    var q = trim(cur.pvFriendName.value).toLowerCase().replace(/[¸]/, 'å'), frs = [];
    if (q === cur.pvFriendsQ) return;

    cur.pvFriendsQ = q;
    var lat = parseLatin(q);
    if (!lat) {
      lat = parseCyr(q);
    }
    var toMatch = lat ? [escapeRE(q), escapeRE(lat)] : (q ? [escapeRE(q)] : false);

    if (q.length > 1 && !cur.pvFriendsCache[q] || q.length == 1 && lat) {
      Phototag.cacheFriends(q);
    }
    var friends = q ? cur.pvFriendsCache[q] : cur.pvFriendsList, tagged = cur.pvData[cur.pvListId][cur.pvIndex].tagged;

    for (var i in friends) {
      var fr = cur.pvFriendsList[i], mid = positive(i), name = fr[1];
      if (tagged[mid]) continue;
      if (toMatch) {
        each(toMatch, function() {
          var re = new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + this + ')(?![^<>]*>)(?![^&;]+;)', 'gi');
          name = name.replace(re, '<em>$1</em>');
        });
      }
      frs.push('<a mid="' + mid + '" href="' + fr[0] + '" onclick="return Phototag.addTag(' + mid + ', event)">' + name + '</a>');
    }
    var st = (frs.length > 8) ? {height: '184px', overflow: 'auto'} : {height: '', overflow: ''};
    setStyle(cur.pvFriendsCont.parentNode, st);
    cur.pvFriendsCont.innerHTML = frs.join('');
    (q && !frs.length ? hide : show)(cur.pvFriendsCont.parentNode);
    (q || tagged[vk.id] ? hide : show)(cur.pvFriendsCont.parentNode.firstChild);
  },
  cacheFriends: function(q) {
    if (q) {
      if (!cur.pvFriendsCache[q]) cur.pvFriendsCache[q] = {};

      var t = parseLatin(q);
      if (!t) {
        t = parseCyr(q);
      }
      var queries = t ? [q, t] : [q];
      for (var i in queries) {
        query = queries[i];
        var searchIn = cur.pvFriendsCache[query.substr(0, 1).toLowerCase()];
        if (searchIn) {
          query = escapeRE(query);
          for (var i in searchIn) {
            var name = cur.pvFriendsList[i][1].replace(/[¸¨]/, 'å');
            if ((new RegExp('^' + query + '|\\s' + query + '|\\(' + query, 'gi')).test(name)) {
              cur.pvFriendsCache[q][i] = 1;
            }
          }
        }
      }
      return;
    }
    cur.pvFriendsCache = {};
    for (var i in cur.pvFriendsList) {
      var name = cur.pvFriendsList[i][1].replace(/[¸¨]/, 'å');
      var cursor = 0, letter;
      while (1) {
        letter = name.charAt(cursor).toLowerCase();
        if (!cur.pvFriendsCache[letter]) {
          cur.pvFriendsCache[letter] = {};
        }
        cur.pvFriendsCache[letter][i] = 1;
        cursor = name.indexOf(' ', cursor + 1);
        if (cursor == -1) break;
        ++cursor;
      }
    }
  },
  showFriends: function() {
    if (!cur.pvTagger || cur.pvTagger == 'loading') return;

    var r = cur.pvTagger.result();
    var xy = getXY(cur.pvPhoto.firstChild), x = xy[0] + r[0] + r[2] + 20;
    if (lastWindowWidth <= x + 190 + sbWidth() + 5) {
      if (xy[0] + r[0] <= 190 + 25) {
        x = lastWindowWidth - 190 - sbWidth() - 5;
      } else {
        x = xy[0] + r[0] - 190 - 20;
      }
    }
    var h = getSize(cur.pvFriends)[1], y = xy[1] + layerWrap.scrollTop + r[1] - ((layerWrap.offsetParent || {}).scrollTop || bodyNode.scrollTop || htmlNode.scrollTop);
    if (layerWrap.scrollTop + lastWindowHeight <= y + h + 5) {
      y = layerWrap.scrollTop + lastWindowHeight - h - 5;
    }
    cur.pvFriends.style.left = x + 'px';
    cur.pvFriends.style.top = y + 'px';
    if (!isVisible(cur.pvFriends)) {
      if (browser.msie || browser.mozilla) {
        show(cur.pvFriends);
        setTimeout(elfocus.pbind(cur.pvFriendName, false, false), 1);
      } else {
        fadeIn(cur.pvFriends, 200, function() {
          setTimeout(elfocus.pbind(cur.pvFriendName, false, false), 1);
        });
      }
    } else {
      animate(cur.pvFriends, {opacity: 1}, 200, function() {
        setTimeout(elfocus.pbind(cur.pvFriendName, false, false), 1);
      });
    }
  }
};

try{stManager.done('phototag.js');}catch(e){}
