VideoEdit = {
  init: function() {
    onDomReady(function() {
      VideoEdit.opts = {onReorder: VideoEdit.onReorder};
      cur.albumFilters = ge('video_albums_list');
      if (cur.albumFilters) {
        extend(VideoEdit.opts, {
          target: cur.albumFilters,
          onDragOver: VideoEdit.onDragOver,
          onDragOut: VideoEdit.onDragOut,
          onMouseDown: VideoEdit.onDragStart,
          onMouseUp: VideoEdit.onDragEnd
        });
      }
      sorter.init(cur.vRows, VideoEdit.opts);
    });
    var albumsList = [];
    for (var i in cur.albums) {
      albumsList.push({i: i, l: cur.albums[i]});
    }
    albumsList.push({i: 0, l: getLang('video_no_album')});
    cur.albumDDM = new DropdownMenu(albumsList, {showHover:false, onSelect: VideoEdit.onAlbumChange});
    cur.module = 'video_edit';
  },
  onReorder: function(video, before, after) {
    var video_id = video.id.replace('video_row', '');
    var before_id = (before && before.id || '').replace('video_row', '');
    var after_id = (after && after.id || '').replace('video_row', '');
    ajax.post('al_video.php', {act: 'reorder_videos', video: video_id, before: before_id, after: after_id});
    var list = cur.videoList[cur.vSection];
    var element = false;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0]+'_'+list[i][1] == video_id) {
        element = list[i];
        list.splice(i, 1);
        break;
      }
    }
    if (!element) return;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0]+'_'+list[i][1] == before_id) {
        list.splice(i, 0, element);
        return;
      }
      if (list[i][0]+'_'+list[i][1] == after_id) {
        list.splice(i+1, 0, element);
        return;
      }
    }
  },
  onAdding: function() {
    if (cur.VideoEditChanged) {
      sorter.init(cur.vRows, VideoEdit.opts);
      cur.VideoEditChanged = false;
    } else {
      sorter.added(cur.vRows);
    }
  },
  onChanging: function() {
    cur.VideoEditChanged = true;
  },
  showAlbumMenu: function(vid, t) {
    if (!cur.albumDDM) return;
    //var t = ge('album_menu' + vid);
    if (t.id == cur.albumDDM.options.id) {
      return;
    }
    cur.currentVideo = vid;
    cur.albumDDM.hide(false);
    cur.albumDDM.setOptions({target: t, title: t.innerHTML});
    cur.albumDDM.show();
  },
  onAlbumChange: function(ev) {
    if(!cur.currentVideo) return;
    var albumId = parseInt(ev.target.index || 0);
    VideoEdit.moveVideo(cur.currentVideo, albumId);
  },
  moveVideo: function(vid, albumId, callback) {
    var element = ge('album_menu' + vid);
    element.innerHTML = '<img src="/images/upload.gif" />';

    ajax.post('al_video.php', {act: 'move_to_album', vid: vid, album_id: albumId, oid: cur.oid, hash: cur.moveHash}, {
      onDone: function(text) {
        element.innerHTML = text;
        var oldAlbum = 0;
        var list = cur.videoList['all'];
        for (var i in list) {
          if (list[i][1] == vid) {
            oldAlbum = list[i][6];
            list[i][6] = albumId;
          }
        }
        delete cur.videoList['album_'+oldAlbum];
        delete cur.videoList['album_'+albumId];
        if (callback) {
          callback();
        }
      }
    });
  },
  onDragOver: function(el, target) {
    var id = parseInt(el.id.substr(5));
    clearTimeout(cur.dragOutTimeout);
    if (!hasClass(target, 'side_filter')) {
      return;
    }
    if (!hasClass(target, 'cur_section')) {
      addClass(target, 'video_drag_over');
    }
    animate(el, {opacity: 0.3},  300);
  },
  onDragOut: function(el, target) {
    removeClass(target, 'video_drag_over');
    clearTimeout(cur.dragOutTimeout);
    cur.dragOutTimeout = setTimeout(function(){
      animate(el, {opacity: 1},  200);
    }, 500);
  },
  onDragStart: function(el) {
    addClass(ge('page_body'), 'no_overflow');
    var listParent = ge('video_albums_list');
    each(geByClass('side_filter', listParent), function(i,v) {
      if (!hasClass(v, 'cur_section')) {
        addClass(v, 'video_drag_on');
      }
    });
  },
  onDragEnd: function(el, target) {
    removeClass(ge('page_body'), 'no_overflow');
    var listParent = ge('video_albums_list');
    each(geByClass('side_filter', listParent), function(i,v) {
      removeClass(v, 'video_drag_on');
    });
    if (hasClass(target, 'side_filter')) {
      var row = el.id.split('_');
      var targetRow = target.id.split('_');
      if (!row[2] || !targetRow[3]) {
        return;
      }
      var vid = row[2];
      var albumId = targetRow[3];
      VideoEdit.moveVideo(vid, albumId, function() {
        if (cur.vSection.indexOf('album_') != -1) {
          Video.section(cur.vSection);
        }
      });
    }
  }
};

try{stManager.done('video_edit.js');}catch(e){}
