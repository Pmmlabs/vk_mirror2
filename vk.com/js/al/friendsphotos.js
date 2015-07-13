var friendsphotos = {
  scrollResize: function() {
    if (browser.mobile) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    var el = ge('albums_load_more');
    if (st + ch > el.offsetTop) {
      friendsphotos.loadAlbums();
    }
  },
  loadedPhotos: function(album, off, label, rows) {
    cur.albums[album].offset = off;

    ge('album_photos' + album).appendChild(ce('div', {innerHTML: rows}));

    var lnk = ge('album_more_progress' + album).parentNode;
    if (!label) {
      hide(lnk);
      return;
    }
    lnk.firstChild.innerHTML = label;
    cur.albums[album].loading = 1;
    ajax.post('al_photos.php', {act: 'friends_photos', album: album, offset: cur.albums[album].offset}, {cache: 1, onDone: function() {
      if (cur.albums[album].loading == 2) {
        friendsphotos.loadedPhotos.pbind(album).apply(window, arguments);
      } else {
        cur.albums[album].loading = false;
      }
    }});
  },
  loadPhotos: function(album) {
    var prg = ge('album_more_progress' + album);
    if (!isVisible(prg.parentNode) || isVisible(prg)) return;
    if (cur.albums[album].loading) {
      cur.albums[album].loading = 2;
      return;
    }

    ajax.post('al_photos.php', {act: 'friends_photos', album: album, offset: cur.albums[album].offset}, {onDone: friendsphotos.loadedPhotos.pbind(album), showProgress: function() {
      show(prg);
      hide(prg.parentNode.firstChild);
    }, hideProgress: function() {
      show(prg.parentNode.firstChild);
      hide(prg);
    }, cache: 1});
  },
  loadedAlbums: function(off, count, rows, preloaded) {
    cur.offset = off;
    cur.count = count;
    for (var i in preloaded) {
      cur.albums[i] = {offset: cur.already};
      ajax.preload('al_photos.php', {act: 'friends_photos', album: i, offset: cur.already}, preloaded[i]);
    }

    rows = ce('div', {innerHTML: rows});
    while (rows.firstChild) {
      ge('friends_albums').appendChild(rows.firstChild);
    }

    if (off >= count) {
      hide('albums_load_more');
      return;
    }
    cur.loading = false;
    friendsphotos.recache();
  },
  loadAlbums: function() {
    if (!isVisible('albums_load_more') || isVisible('albums_more_progress')) return;
    if (cur.loading) {
      cur.loading = 2;
      return;
    }

    ajax.post('friendsphotos', {offset: cur.offset, part: 1}, {onDone: friendsphotos.loadedAlbums, showProgress: function() {
      show('albums_more_progress');
      hide(ge('albums_load_more').firstChild);
    }, hideProgress: function() {
      show(ge('albums_load_more').firstChild);
      hide('albums_more_progress');
    }, cache: 1});
  },
  recache: function() {
    if (cur.loading) {
      cur.loading = 1;
      setTimeout(friendsphotos.recache, 100);
      return;
    }
    for (var i = cur.offset; ajaxCache['/friendsphotos#offset=' + i + '&part=1']; i += 10) {
      delete(ajaxCache['/friendsphotos#offset=' + i + '&part=1']);
    }
    cur.loading = 1;
    ajax.post('friendsphotos', {offset: cur.offset, part: 1}, {cache: 1, onDone: function() {
      if (cur.loading == 2) {
        friendsphotos.loadedAlbums.apply(window, arguments);
      } else {
        cur.loading = false;
      }
    }});
  },

  init: function() {
    cur.module = 'friendsphotos';
    friendsphotos.scrollnode = browser.msie6 ? pageNode : window;
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    addEvent(friendsphotos.scrollnode, 'scroll', friendsphotos.scrollResize);
    addEvent(window, 'resize', friendsphotos.scrollResize);
    removeEvent(window, 'load', cur.init);
    cur.destroy.push(function() {
      removeEvent(friendsphotos.scrollnode, 'scroll', friendsphotos.scrollResize);
      removeEvent(window, 'resize', friendsphotos.scrollResize);
    });
  },

  removeOver: function(album) {
    var el = ge('album_remove' + album);
    animate(el, {backgroundColor: '#6B8DB1'}, 200);
    showTooltip(el, {text: getLang('photos_dont_show_album')});
  },
  removeOut: function(album) {
    animate(ge('album_remove' + album), {backgroundColor: '#C4D2E1'}, 200);
  },
  removeAlbum: function(album, hash, prog) {
    if (prog && !prog.tagName) prog = false;

    var date = ge('album_date' + album);
    ajax.post('al_photos.php', {act: 'fr_remove_album', album: album, hash: hash}, {onDone: function(text) {
      if (prog) {
        hide(prog.parentNode);
        show(prog.parentNode.previousSibling);
      }

      var el = (ge('album_photos' + album) || {}).parentNode;
      if (!el) return;

      --cur.offset;
      friendsphotos.recache();

      el.parentNode.insertBefore(ce('div', {innerHTML: text, className: 'album_removed'}), el);
      hide(el);
    }, showProgress: function() {
      if (prog) {
        hide(prog.nextSibling);
        show(prog);
      } else {
        hide(date);
        show(date.nextSibling);
      }
    }, hideProgress: function() {
      if (prog) {
        hide(prog);
        show(prog.nextSibling);
      } else {
        hide(date.nextSibling);
        show(date);
      }
    }});
  },
  removeAllAlbums: function(album, hash, prog) {
    if (prog && !prog.tagName) prog = false;

    var prg = ge('frph_remove_progress' + album);
    ajax.post('al_photos.php', {act: 'fr_remove_all', album: album, hash: hash}, {onDone: function(text) {
      if (prog) {
        hide(prog.parentNode);
        show(prog.parentNode.previousSibling);
      }

      var alb = (ge('album_photos' + album) || {}).parentNode;
      if (!alb) return;

      var owner = album.split('_')[0], passed = false;
      var cont = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      for (var el = ge('friends_albums').firstChild; el; el = el.nextSibling) {
        if (!el.tagName) continue;
        var id = el.id.match(/^album(-?\d+)_(\d+)$/);
        if (!id) { // text about deleted album
          if (el.nextSibling.id == 'album' + album) {
            show(el.lastChild);
            hide(el.firstChild);
            passed = true;
          }
          el = el.nextSibling;
          continue;
        }
        if (id[1] == owner) {
          --cur.offset;
          if (!passed) {
            var s = getSize(el);
            cont.scrollTop -= s[1];
          }
          hide(el);
        }
      }
      friendsphotos.recache();
    }, showProgress: function() {
      if (prog) {
        hide(prog.nextSibling);
        show(prog);
      } else {
        prg.style.visibility = 'visible';
      }
    }, hideProgress: function() {
      if (prog) {
        hide(prog);
        show(prog.nextSibling);
      } else {
        prg.style.visibility = 'hidden';
      }
    }});
  },
  returnAlbum: function(album, hash, prog) {
    if (prog && !prog.tagName) prog = false;

    var prg = ge('frph_remove_progress' + album);
    ajax.post('al_photos.php', {act: 'fr_return_album', album: album, hash: hash}, {onDone: function() {
      if (prog) {
        hide(prog.parentNode);
        show(prog.parentNode.nextSibling);
        cur.removedBox.setOptions({onHideAttempt: function() {
          show(cur.removedBox.progress);
          nav.reload();
          return false;
        }});
      }

      var el = (ge('album_photos' + album) || {}).parentNode;
      if (!el) return;

      ++cur.offset;
      friendsphotos.recache();

      show(el);
      el.parentNode.removeChild(el.previousSibling);
    }, showProgress: function() {
      if (prog) {
        hide(prog.nextSibling);
        show(prog);
      } else {
        prg.style.visibility = 'visible';
      }
    }, hideProgress: function() {
      if (prog) {
        hide(prog);
        show(prog.nextSibling);
      } else {
        prg.style.visibility = 'hidden';
      }
    }});
  },
  returnAllAlbums: function(album, hash, prog) {
    if (prog && !prog.tagName) prog = false;

    var prg = ge('frph_return_progress' + album);
    ajax.post('al_photos.php', {act: 'fr_return_all', album: album, hash: hash}, {onDone: function(text) {
      if (prog) {
        hide(prog.parentNode);
        show(prog.parentNode.nextSibling);
        cur.removedBox.setOptions({onHideAttempt: function() {
          show(cur.removedBox.progress);
          nav.reload();
          return false;
        }});
      }

      var alb = (ge('album_photos' + album) || {}).parentNode;
      if (!alb) return;

      var owner = album.split('_')[0], passed = false;
      var cont = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      for (var el = ge('friends_albums').firstChild; el; el = el.nextSibling) {
        if (!el.tagName) continue;
        var id = el.id.match(/^album(-?\d+)_(\d+)$/);
        if (!id) { // text about deleted album
          if (el.nextSibling.id == 'album' + album) {
            show(el.firstChild);
            hide(el.lastChild);
            passed = true;
          }
          el = el.nextSibling;
          continue;
        }
        if (id[1] == owner) {
          ++cur.offset;
          if (!passed) {
            var s = getSize(el);
            cont.scrollTop += s[1];
          }
          show(el);
        }
      }
      friendsphotos.recache();
    }, showProgress: function() {
      if (prog) {
        hide(prog.nextSibling);
        show(prog);
      } else {
        prg.style.visibility = 'visible';
      }
    }, hideProgress: function() {
      if (prog) {
        hide(prog);
        show(prog.nextSibling);
      } else {
        prg.style.visibility = 'hidden';
      }
    }});
  },

  activeTab: function(el) {
    var p = domPN(domPN(el));
    for (var i = domFC(p); i; i = domNS(i)) {
      removeClass(i, 'active_link');
    }
    addClass(domPN(el), 'active_link');
  }

}

try{stManager.done('friendsphotos.js');}catch(e){}