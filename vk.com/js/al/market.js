var Market = {
  init: function() {
    extend(cur, {
      searchInp: ge('market_search_input'),
      searchEl: geByClass1('market_search', 'market_search_wrap'),
      listEl: ge('market_list'),
      summaryEl: ge('market_summary'),
      more: ge('show_more'),
      notFound: ge('not_found'),
      catalogEl: ge('market_list_wrap'),
      albumbEl: ge('market_albums_list'),

    });

    placeholderSetup(cur.searchInp, {back: true})
    elfocus(cur.searchInp);
    var onChanged = function() {
      var value = cur.searchInp.getValue();
      toggleClass(cur.searchEl, 'not_empty', value);
    }
    addEvent(cur.searchInp, 'paste cut input', onChanged);
    addEvent(cur.searchInp, 'keydown', function(ev) {
      if (ev.keyCode == KEY.ENTER) {
        onChanged();
        Market.updateList();
        return cancelEvent(ev);
      } else if (ev.keyCode == KEY.ESC) {
        Market.clearItemsSearch();
        return cancelEvent(ev);
      }
    });
    each(['market_search_price_from', 'market_search_price_to'], function (i, elem) {
      elem = ge(elem);
      placeholderSetup(elem);
      addEvent(elem, 'change', Market.updateList);
      addEvent(elem, 'keydown', function(event) {
        if (event.keyCode == KEY.ENTER) Market.updateList();
      });
      addEvent(elem, 'keydown keyup keypress paste cut drop input blur', function(event) {
        var v = elem.value.replace(/[^0-9\.]/g, '');
        if (elem.value != v) {
          val(elem, v);
        }
        return true;
      });
    });

    /*MarketTags.destroy();
    MarketTags.init(cur.searchInp);*/

    Market.initScroll();
    setTimeout(function() {
      cur.destroy.push(function() {
        Market.deinitScroll();
      });
    }, 0);

    cur.uiOrder = new Dropdown(ge('market_search_order'), cur.orderList, {
      width: 150,
      big: 1,
      selectedItems: cur.order,
      onChange: Market.updateList.pbind(false)
    });

    Market.initSorter();

    cur.nav.push((function(changed, old, n) {
      if (old[0] == n[0] && (changed.section !== undefined)) {
        if (old.section !== undefined && old.section.substr(0, 6) == 'album_') {
          re(geByClass1('market_tab_' + old.section, 'market_tabs'));
        }
        nav.setLoc(n);
        return this.section(n.section);
      } else if (old[0] == n[0]) {
        return false;
      }
    }).bind(this));
  },
  switchTab: function(section, el, event) {
    var tabs = geByClass('active_link', ge('market_tabs'));
    for (var i in tabs) {
      removeClass(tabs[i], 'active_link');
    }
    addClass(el.tagName == 'A' ? el.parentNode : el, 'active_link');
    if (section !== 'false') {
      // return nav.change({section: section ? section : false});
    }
    return nav.go(el, event);
  },
  section: function(section) {
    section = section || '';
    if (section == 'albums') {
      cur.mAlbumsSwitching = true;
      addClass('market', 'market_albums_section');
      show(cur.albumbEl);
      Market.clearItemsSearch();
      Market.toggleExtendedControls(false);
      cur.searchInp.blur();
    } else if (section.substr(0, 6) == 'album_' ||
               cur.aid && !section) {
      return true;
    } else {
      ge('market').className = '';
      if (!cur.albumsCount) {
        hide(cur.albumbEl);
      }
    }
    cur.mSection = section;
    Market.initSorter();
    return false;
  },
  initSorter: function() {
    if (cur.mSection != 'albums') {
      return;
    }
    if (cur.albumsSorter) {
      cur.albumsSorter.destroy();
    }

    if (cur.canEdit && cur.albumsCount > 1) {
      var block = geByClass1('market_album_block', 'market_albums_cont'),
          size = getSize(block);

      setTimeout(function() {
        cur.qsorterNoOperaStyle = true;
        cur.qsorterRowClass = 'market_album_block';
        cur.qsorterRowUpClass = 'market_album_block market_row_up';
        cur.albumsSorter = qsorter.init(ge('market_albums_cont'), {
          onReorder: Market.onAlbumReorder,
          xsize: 2,
          width: size[0] + parseInt(getStyle(block, 'marginRight')),
          height: size[1] + parseInt(getStyle(block, 'marginBottom')),
          noMoveCursor: 1,
          canDrag: function(el) {
            return cur.mSection == 'albums';
          },
        });
      }, 10);
    }
  },
  onAlbumReorder: function (album, before, after) {
    var album_id = album.id.replace('market_album_block', '');
    var before_id = (before && before.id || '').replace('market_album_block', '');
    var after_id = (after && after.id || '').replace('market_album_block', '');
    ajax.post('al_market.php', {act: 'a_reorder_albums', oid: cur.oid, aid: album_id, before: before_id, after: after_id, hash: cur.reorderHash});
  },

  toggleExtendedControls: function(show) {
    var wrapEl = ge('market_search_wrap'), controlsEl = ge('market_search_controls');
    if (show == undefined) {
      show = !hasClass(wrapEl, 'market_search_extended_controls');
    }

    (show ? slideDown : slideUp)(controlsEl, 200);
    setTimeout(function() {
      toggleClass(wrapEl, 'market_search_extended_controls', show);
    });
  },

  getSearchParams: function() {
    var params = {
      q: trim(val(cur.searchInp)), load: 1,
      id: cur.oid,
      offset: cur.searchOffset || 0,
      sort: cur.uiOrder.val(),
      price_from: val('market_search_price_from'),
      price_to: val('market_search_price_to'),
    };
    if (cur.aid) {
      params.aid = cur.aid;
    }
    return params;
  },
  sameParams: function(params) {
    if (!cur.params) return false;
    for (var i in params) {
      if (params[i] != cur.params[i]) return false;
    }
    for (var i in cur.params) {
      if (params[i] != cur.params[i]) return false;
    }
    return true;
  },
  updateList: function(offset) {
    clearTimeout(cur.searchTimeout);
    var _update = function() {
      if (offset && offset > 0) {
        cur.searchOffset = offset;
      } else {
        cur.searchOffset = 0;
      }
      var params = Market.getSearchParams();
      if ((!Market.sameParams(params) || cur.ignoreEqual)) {
        delete cur.ignoreEqual;
        cur.params = params;
        Market.searchItems();

        if (!cur.mAlbumsSwitching) {
          if (cur.mSection == 'albums') {
            Market.switchTab('', domFC(geByClass1('market_tab_', 'market_tabs')));
            hide(cur.albumbEl);
          }
        }
        cur.mAlbumsSwitching = false;
      }
      if (!params.offset) {
        scrollToTop();
      }
    }
    if (offset) {
      _update();
    } else {
      cur.searchTimeout = setTimeout(_update.bind(this), 10);
    }
  },
  searchItems: function() {
    var query = cur.params || Market.getSearchParams();
    ajax.post('/al_market.php', query, {
      cache: 1,
      onDone: function(count, rows, showMore) {
        var summary;
        if (count) {
          summary = getLang('market_summary_X_goods', count, true);
        } else {
          summary = getLang('market_summary_no_goods');
        }
        cur.summaryEl.innerHTML = summary;

        hide(cur.notFound);
        if (query['offset'] > 0) {
          cur.listEl.appendChild(cf(rows));
        } else {
          cur.listEl.innerHTML = rows;
          cur.searchOffset = 0;
        }
        if (showMore) {
          show(cur.more);
        } else {
          hide(cur.more);
        }
        if (!cur.searchOffset && !count) {
          if (query['q']) {
            addClass(cur.notFound, 'market_q_search');
            ge('search_ph').innerHTML = query['q'].replace(/([<>&#]*)/g, '');
          } else {
            removeClass(cur.notFound, 'market_q_search');
          }
          show(cur.notFound);
          hide(cur.more);
        }

        var searchParamsCount = 0;
        each (query, function(k, v) {
          if (!inArray(k, ['id', 'load', 'sort', 'offset']) && v != '' || (k == 'sort' && v != 1)) {
            searchParamsCount++;
          }
        });
        (searchParamsCount ? addClass : removeClass)('market', 'market_search_section');

        each(query, function(i, v) {
          if (v && v != 0 && !inArray(i, ['load', 'id', 'offset', 'aid']) && (i != 'sort' || v != 1)) {
            nav.objLoc[i] = v;
          } else {
            delete nav.objLoc[i];
          }
        });
        nav.setLoc(nav.objLoc);
      },
      showProgress: function() {
        addClass(cur.searchEl, 'loading');
        cur.isSearchLoading = true;
      },
      hideProgress: function() {
        removeClass(cur.searchEl, 'loading');
        removeClass(cur.more, 'load_more');
        cur.isSearchLoading = false;
      }
    });
  },
  clearItemsSearch: function() {
    val(cur.searchInp, '');
    elfocus(cur.searchInp);
    removeClass(cur.searchEl, 'not_empty');
    Market.updateList();
  },
  showMore: function() {
    if (cur.mSection == 'albums') return false;
    var offset = cur.searchOffset || 0;
    offset += cur.itemsPerPage;
    addClass(cur.more, 'load_more');
    Market.updateList(offset);
    return false;
  },

  showAllAlbums: function(btn) {
    var wrapEl = ge('market_albums_wrap'),
        contEl = ge('market_albums_cont');

    var isExpanded = data(wrapEl, 'expanded');
    setStyle(wrapEl, 'max-height', isExpanded ? '' : getSize(contEl)[1] + 'px');

    isExpanded = !isExpanded;

    data(wrapEl, 'expanded', isExpanded);

    btn.innerHTML = getLang(isExpanded ? 'market_hide_all_albums_toggle' : 'market_show_all_albums_toggle');

    if (!isExpanded) {
      setTimeout(function() {
        animate(geByTag1('body'), {scrollTop: 0, transition: Fx.Transitions.easeOutCubic}, 700);
      }, 300);
    }
  },

  initScroll: function() {
    Market.scrollnode = browser.msie6 ? pageNode : window;
    Market.deinitScroll();
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    addEvent(Market.scrollnode, 'scroll', Market.scrollCheck);
    addEvent(window, 'resize', Market.scrollCheck);
  },
  deinitScroll: function() {
    removeEvent(Market.scrollnode, 'scroll', Market.scrollCheck);
    removeEvent(window, 'resize', Market.scrollCheck);
  },
  scrollCheck: function() {
    if (browser.mobile || cur.isSearchLoading || cur.disableAutoMore) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY(), lnk = cur.more;

    if (!isVisible(lnk)) return;
    if (st + ch * 3 > lnk.offsetTop) {
      if (lnk.nodeName != 'A') {
        lnk = geByTag1('a', lnk);
      }
      lnk.onclick();
    }
  },

  // upload
  uploadInit: function(cont, opts, isMain) {
    cur.lang = extend(cur.lang || {}, opts.lang);

    var options = {
      file_name: 'photo',
      file_size_limit: 1024*1024*5, // 5Mb
      file_types_description: 'Image files (*.jpg, *.png, *.gif)',
      file_types: '*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',
      accept: 'image/*',

      lang: opts.lang,

      clear: 1,
      noFlash: 1,
      signed: opts.signed,
      type: 'photo',
      buttonClass: 'secondary small',
      max_attempts: 3,
      server: opts.server,
      base_url: opts.base_url,
      static_url: opts.static_url,

      errorObj: opts.errorObj
    };
    if (!isMain) {
      options = extend(options, {
        multiple: true,
        multi_progress: true,
        force_max_files: true,
        max_files: opts.maxFiles,
        noCheck: true,
        dropbox: 'market_ei_photos_dropbox',
      });
    } else {
      options = extend(options, {
        check_url: opts.check_url
      });
    }

    return Upload.init(cont, opts.url, cur.options.photoVars, extend(options, {
      onUploadStart: function(i, res) {
        curBox().changed = true;
        if (Upload.types[i] == 'form') {
          show(box.progress);
        }
        hide(opts.errorObj);
      },

      onCheckComplete: function(i) {
        if (i == cur.uploadId && cur.extraUploadId && Upload.uploadUrls[cur.extraUploadId]) { // main photo
          Upload.uploadUrls[cur.extraUploadId] = Upload.uploadUrls[cur.uploadId];
        }
        Upload.embed(i);
      },

      onUploadComplete: function(info, res, errorAdd) {
        var obj = parseJSON(res) || {error: 'ERR_CLIENT_BAD_RESPONSE: bad request response'};
        if (obj.error || !obj.photos) {
          Market.uploadFail(isMain, info, obj.error + (errorAdd || ''));
          return;
        }
        var i = info.ind !== undefined ? info.ind : info;

        if (isMain) {
          var url = Upload.options[cur.uploadId].base_url + 'upload.php?act=market_photo_crop&_query=' + encodeURIComponent(res) + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost);
          Market.cropPhoto(obj.photos[0], url);
          Upload.embed(i);
        } else {
          var fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
              ind = info.fileName ? i + '_' + info.fileName : info,
              prg = ge('upload' + ind + '_progress_wrap');

          prg && hide(geByClass1('market_prg_x', prg));
          obj.photos = JSON.stringify(obj.photos);
          ajax.post('al_photos.php', extend({act: 'choose_uploaded'}, obj), {
            onDone: function(media, data) {
              Market.choosePhoto(info, media, extend(data, {upload_ind: i + '_' + fileName}));
            },
            onFail: Market.uploadFail.pbind(isMain, info)
          });
        }
      },

      onUploadProgress: function(info, bytesLoaded, bytesTotal) {
        var i = info.ind !== undefined ? info.ind : info;
        if (isMain) {
          if (!ge('form'+i+'_progress')) {
            var obj = Upload.obj[i], objHeight = getSize(obj)[1], tm = objHeight / 2 + 10;
            var node = obj.firstChild;
            while (node) {
              if (node.nodeType == 1) {
                if (node.id == 'uploader'+i && browser.msie) {
                  setStyle(node, {position: 'relative', left: '-5000px'});
                } else {
                  setStyle(node, {visibility: 'hidden'});
                }
              }
              node = node.nextSibling;
            }
            obj.appendChild(ce('div', {innerHTML: '<div class="market_upload_progress_wrap">\
              <div id="form' + i + '_progress" class="market_upload_progress" style="width: 0%;"></div>\
            </div></div>'}, {height: tm + 'px', marginTop: -tm + 'px'}));
          }
          var percent = intval(bytesLoaded / bytesTotal * 100);
          setStyle(ge('form' + i + '_progress'), {width: percent + '%'});
        } else {
          if (Upload.types[i] == 'fileApi') {
            var data = {loaded: bytesLoaded, total: bytesTotal};
            if (info.fileName) {
              data.fileName = info.fileName.replace(/[&<>"']/g, '');
            }
          }
          Market.showUploadPhotoProgress(i, data);
        }
      },
      onUploadError: function(info, err) {
        Market.uploadFail(isMain, info, err);
      }
    }));
  },
  uploadExtraPhotos: function(ev) {
    if (cur.extraUploadId !== undefined && cur.uploadId !== undefined && window.Upload && Upload.checked && Upload.checked[cur.uploadId]) {
      geByTag1('input', 'market_ei_photo_upload').click();
      return false;
    }
    return true;
  },
  uploadFail: function(isMain, info, err) {
    if (!err.match(/^ERR_[A-Z0-9_]+/)) err = 'ERR_CLIENT_BAD_ERROR: error "' + err.toString() + '"';
    var e = err.match(/^(ERR_[A-Z0-9_]+)/), code = e[1], msg;
    switch (code) {
      case 'ERR_UPLOAD_FILE_NOT_SUPPORTED': msg = getLang('profile_oph_err_format'); break;
      case 'ERR_UPLOAD_FILE_NOT_UPLOADED':
        msg = getLang('profile_oph_err_upload').replace('{link}', '<a href="/support">').replace('{/link}', '</a>'); break;
      case 'ERR_UPLOAD_BAD_IMAGE_SIZE':
        msg = getLang('profile_oph_err_size').replace('{min}', '400').replace('{max}', '7<span class="num_delim"> </span>000'); break;
      case 'ERR_UPLOAD_TERMINATED': return;
      default:
        msg = getLang('profile_oph_err_unknown').replace('{link}', '<a href="/support">').replace('{/link}', '</a>'); break;
    }
    msg = msg.replace('{sorry}', '<b>' + getLang('global_error_occured') + '</b>');

    if (isMain === 2) {
      var cont = ge('market_photo_crop_error');
      val(cont, msg);
      show(cont);
      return true;
    }

    var i = info.ind !== undefined ? info.ind : info,
        options = Upload.options[i];
    if (isMain) {
      var obj = Upload.obj[i];
      var container = domPN(obj);
      if (hasClass(container, 'market_upload_progress')) {
        removeClass(container, 'market_upload_progress');
      }
    } else {
      var fileName = info.fileName ? info.fileName : info,
          ind = info.fileName ? i + '_' + info.fileName : info;
      re('upload' + ind + '_progress_wrap');
      Market.unchoosePhoto(i);
    }
    Upload.embed(i);
    val(options.errorObj, msg);
    show(options.errorObj);
    return true;
  },
  choosePhoto: function(info, media, data) {
    var i = info.ind !== undefined ? info.ind : info,
        cont = ge('market_ei_photos');
    if (!isObject(data)) {
      data = {
        thumb_m: data[0] || '',
        thumb_s: data[1] || '',
        list: data[2] || '',
        view_opts: data[3] || '',
        upload_ind: data.upload_ind || undefined
      };
    }
    vkImage().src = data.thumb_m;

    if (!isArray(cur.itemPhotos)) {
      cur.itemPhotos = [];
    }
    var ind = cur.itemPhotos.length;
    cur.itemPhotos.push(media);

    var preview = '<div class="market_ei_photo"><img class="market_ei_img" src="' + data.thumb_m + '" />';
    var mediaHtml = '<div class="market_ei_photo_wrap market_ei_photo%ind% inl_bl" id="market_ei_photo%ind%">' + preview + '<div nosorthandle="1" class="market_x_button inl_bl" '+ (browser.msie ? 'title' : 'tooltip') + '="' + getLang('dont_attach') + '" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tooltip\'), shift: [14, 3, 3], black: 1})" onclick="Market.unchoosePhoto(%ind%); return cancelEvent(event);"><div class="market_x" nosorthandle="1"></div></div></div></div>',
      mediaEl = se(rs(mediaHtml, {ind: ind}));
    cont.insertBefore(mediaEl, ge('market_ei_photo_add'));

    var fileName = info.fileName || info.name || '',
        prg_ind = fileName ? i + '_' + fileName : i;
    re('upload' + prg_ind + '_progress_wrap');

    if (fileName) {
      if ((!browser.msie || browser.version > 8) && cur.itemPhotos.length > 1) {
        stManager.add(['usorter.js'], function() {
          if (cont.usorter) {
            usorter.added(cont);
          } else if (cur.itemPhotos.length > 1) {
            usorter.init(cont, {clsUp: 'market_ei_preview_up'});
          }
        });
      } else if (cont.usorter) {
        cont.usorter.destroy();
      }
    }
    toggle('market_ei_photo_add', Market.uploadedPhotosCount() < Upload.options[cur.extraUploadId].max_files);
  },
  unchoosePhoto: function(ind) {
    if (window.tooltips) {
      tooltips.hide(geByClass1('market_x_button', 'market_ei_photo' + ind));
    }
    re('market_ei_photo' + ind);
    toggle('market_ei_photo_add', Market.uploadedPhotosCount() < Upload.options[cur.extraUploadId].max_files);

    var cont = ge('market_ei_photos');
    if (cont.usorter) {
      cont.usorter.destroy();
      cont.usorter = false;
    }
    if (cur.itemPhotos.length > 1) {
      stManager.add(['usorter.js'], function() {
        usorter.init(cont, {clsUp: 'market_ei_preview_up'});
      });
    }
  },
  uploadedPhotosCount: function() {
    var previewEl = ge('market_ei_photos'),
        progressNode = ge('market_ei_photos_progress');
    return (previewEl.childNodes.length + progressNode.childNodes.length - 1);
  },
  getUploadedPhotos: function() {
    if (!cur.itemPhotos) return [];

    var res = [], m;
    each(geByClass('market_ei_photo_wrap', 'market_ei_photos'), function(k, v) {
      if (m = (v.className || '').match(/market_ei_photo(\d+)/)) {
        m = intval(m[1]);
        res.push(cur.itemPhotos[m]);
      }
    });
    return res;
  },
  showUploadPhotoProgress: function(i, data) {
    var prgNode = ge('market_ei_photos_progress'),
        percent = intval(data.loaded / data.total * 100),
        fileName = data.fileName || data.name || '',
        ind = fileName ? i + '_' + fileName : i,
        label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

    if (!prgNode) return;

    if (!ge('upload' + ind + '_progress_wrap')) {
      var progress = '\
  <div class="market_prg_wrap">\
    <div id="upload' + ind + '_progress" class="market_prg" style="width: ' + percent + '%;"></div>\
  </div></div>';
      var progressEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: '<div class="fl_l">' + progress + '</div>' + (label ? '<div class="market_prg_label fl_l">' + label + '</div>' : '') + '<div class="market_prg_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [14, 3, 3], black: 1})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\'); if (window.tooltips) tooltips.hide(this);"></div>', className: 'clear_fix'}, {marginTop: '6px'});
      prgNode.appendChild(progressEl);
      show(prgNode);
      toggle('market_ei_photo_add', Market.uploadedPhotosCount() < Upload.options[i].max_files);
      if (!percent) {
        hide('upload' + ind + '_progress');
      }
    } else {
      setStyle(ge('upload' + ind + '_progress'), {width: percent + '%'});
      show('upload' + ind + '_progress');
    }
    return false;
  },

  cropPhoto: function(photo, uploadUrl) {
    if (!photo || !photo.sizes) {
      Market.uploadFail(true);
      return;
    }
    var src = false,
        maxSize = false;
    for (var i = 0; i < photo.sizes.length; i++) {
      var v = photo.sizes[i];
      if (v[0] == 'x') {
        src = photo.sizes[i];
        if (!maxSize) maxSize = v;
      } else if (v[0] == 'y') {
        if (!maxSize || maxSize[0] == 'x') maxSize = v;
      } else if (v[0] == 'z') {
        if (!maxSize || maxSize[0] == 'x' || maxSize[0] == 'y') maxSize = v;
      } else if (v[0] == 'w') {
        if (!maxSize || maxSize[0] == 'x' || maxSize[0] == 'y' || maxSize[0] == 'z') maxSize = v;
      }
    }
    if (!src) {
      Market.uploadFail(true);
      return;
    }

    var thumb = Upload.options[cur.extraUploadId].static_url + 'v'+src[1]+'/'+src[2]+'/'+src[3] + '.jpg',
        st = 'width: ' + src[4] + 'px; height: ' + src[5] + 'px;';
    cur.photoCropOpts = {
      size: [maxSize[4], maxSize[5]],
      thumbSize: [src[4], src[5]],
      uploadUrl: uploadUrl
    };

    if (!cur.photoTaggerDestroy) {
      cur.photoTaggerDestroy = function() {
        if (cur.photoTagger) {
          cur.photoTagger.destroy();
          delete cur.photoTagger;
        }
      }
      cur.destroy.push(function() { cur.photoTaggerDestroy(); });
    }

    var html = ge('market_photo_crop').innerHTML.replace(new RegExp('_tmpl', 'g'), '');
        box = showFastBox({
          hideButtons: true,
          width: 644,
          bodyStyle: 'padding:20px;border:0px',
          onClean: cur.photoTaggerDestroy},
        html);
    val('market_photo_crop_thumb', '<div style="' + st + 'margin: 0px auto;"><img id="market_photo_crop_img" src="' + thumb + '" style="' + st + '" onload="stManager.add([\'tagger.css\', \'tagger.js\'], Market.cropInit);" /></div>');
  },
  cropInit: function() {
    var opts = cur.photoCropOpts, size = opts.size, tsize = opts.thumbSize, minSize = [
      Math.max(100, Math.ceil(400 * tsize[0] / size[0])),
      Math.max(100, Math.ceil(400 * tsize[1] / size[1]))
    ], rect;
    if (opts.rect) {
      rect = {
        left: Math.floor(opts.rect[0] * tsize[0] / size[0]),
        top: Math.floor(opts.rect[1] * tsize[1] / size[1]),
        width: Math.ceil(opts.rect[2] * tsize[0] / size[0]),
        height: Math.ceil(opts.rect[3] * tsize[1] / size[1])
      }
    } else {
      rect = {width: Math.max(minSize[0], tsize[0] - 40), height: Math.max(minSize[1], tsize[1] - 40)};
      if (rect.width > rect.height) {
        rect.width = rect.height;
      }
      if (rect.height > rect.width) {
        rect.height = rect.width;
      }
      rect.left = Math.floor((tsize[0] - rect.width) / 2);
      rect.top = Math.floor((tsize[1] - rect.height) / 2);
    }
    if (cur.photoTagger) {
      cur.photoTagger.destroy();
    }
    cur.photoTagger = photoTagger('market_photo_crop_img', {
      minw: minSize[0],
      minh: minSize[1],
      square: 1,
      rect: rect,
      zstart: 1000
    });
  },
  cropDone: function() {
    var rect = cur.photoTagger.result(), opts = cur.photoCropOpts;
    var cx = opts.size[0] / opts.thumbSize[0], cy = opts.size[1] / opts.thumbSize[1], crop = [
      Math.floor(rect[0] * cx),
      Math.floor(rect[1] * cy),
      Math.ceil(rect[2] * cx),
      Math.ceil(rect[3] * cy),
      0,
      0,
      Math.ceil(rect[2] * cx)
    ], url = cur.photoCropOpts.uploadUrl + '&_crop=' + encodeURIComponent(crop.join(','));

    lockButton('market_photo_crop_done');
    clearTimeout(cur.cropTimer);
    cur.cropTimer = setTimeout(Market.cropSuccess.pbind('{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on market_photo_crop iframe request"}'), 10000);
    stManager.add(['upload.js'], function() {
      var jsonp = jsonpManager.reg(Market.cropSuccess);
      utilsNode.appendChild(ce('iframe', {
        src: url + '&_jsonp=' + jsonp + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost)
      }));
    });
  },
  cropSuccess: function(res) {
    clearTimeout(cur.cropTimer);
    var obj = parseJSON(res) || {}, btn = 'market_photo_crop_done';
    if (obj.error) {
      unlockButton(btn);
      Market.uploadFail(2, false, obj.error + Upload.getErrorAdditional(obj));
    } else {
      if (cur.photoTooltipHide) {
        cur.photoTooltipHide(true);
        curBox.hide();
      }
      ajax.post('al_market.php', {act: 'save_photo', _query: res}, {
        onDone: function(data, thumb) {
          ge('market_ei_main_photo').src = thumb;
          cur.itemPhoto = data;
          curBox().hide();
        },
        onFail: function(text) {
          Market.uploadFail(2, false, text);
          return true;
        },
        showProgress: lockButton.pbind(btn),
        hideProgress: unlockButton.pbind(btn)
      });
    }
  },
  // end upload

  showEditBox: function(id, ev) {
    showBox('al_market.php', {act: 'a_edit_item_box', id: id, oid: cur.oid, aid: cur.aid}, {dark: 1});
    return ev && cancelEvent(ev);
  },
  saveItem: function(btn) {
    if (buttonLocked('btn')) return;

    if (cur.uiTags) {
      var tags_a = cur.uiTags.val_full(),
          tags = [];
      if (tags_a && tags_a.length) {
        for (var i in tags_a) {
          tags.push(tags_a[i][1]);
        }
      }
    } else {
      var tags = [];
    }

    var params = {
      oid: cur.options.oid,
      name: val('item_name'),
      description: val('item_description'),
      category: cur.uiCategory.val(),
      tags: tags.join(','),
      price: val('item_price'),
      photo: JSON.stringify(cur.itemPhoto),
      extraPhotos: Market.getUploadedPhotos().join(','),
      album: cur.uiAlbum ? cur.uiAlbum.val() : 0,
      hash: cur.options.hash
    };
    if (cur.options.item_id) {
      params.id = cur.options.item_id;
    }
    if (!params.name.length) {
      notaBene('item_name');
      return;
    }
    if (!params.description.length) {
      notaBene('item_description');
      return;
    }
    if (!floatval(params.price)) {
      notaBene('item_price');
      return;
    }

    hide('market_ei_error');
    ajax.post('al_market.php?act=a_save_item', params, {
      onDone: function(text, albums) {
        curBox().hide();
        if (cur.options.item_id) {
          var el = ge('market_item' + cur.options.item_id);
          if (el) {
            el.innerHTML = se(text).innerHTML;
          }
        } else {
          nav.reload();
        }
        if (cur.aid) {
          nav.reload();
        }
        if (albums) {
          each(albums, function(k, v) {
            var block = geByClass1('market_album_size', 'market_album_block'+k);
            if (block) {
              block.innerHTML = v;
            }
          });
        }
      },
      onFail: function(text) {
        var cont = ge('market_ei_error');
        cont.innerHTML = text;
        show(cont);
        ge('box_layer_wrap').scrollTop = 0;
        return true;
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  deleteItem: function(id, oid, hash) {
    var box = showFastBox({title: getLang('market_item_delete_confirm_title'), dark: 1}, getLang('market_item_delete_confirm'), getLang('global_delete'), function() {
      if (id !== undefined) {
        var params = {oid: oid, id: id, hash: hash};
      } else {
        var params = {oid: cur.options.oid, id: cur.options.item_id, hash: cur.options.hash};
      }
      ajax.post('al_market.php?act=a_delete_item', params, {
        onDone: function(text, albums) {
          boxQueue.hideAll();
          if (window.WkView) {
            WkView.hide()
          }
          re('market_item' + params.id);
          if (cur.module == 'market') {
            cur.itemsCount--;
            var summary = '';
            if (cur.itemsCount > 0) {
              summary = getLang('market_summary_X_goods', cur.itemsCount, true);
            } else {
              summary = getLang('market_summary_no_goods');
              geByClass1('market_empty', cur.notFound).innerHTML = cur.aid ? getLang('market_album_empty') : getLang('market_catalog_empty');
              hide(cur.listEl);
              show(cur.notFound);
            }
            var summaryEl = geByClass1('market_summary_text', cur.summaryEl);
            if (!summaryEl) summaryEl = cur.summaryEl;
            summaryEl.innerHTML = summary;

            if (albums) {
              each(albums, function(k, v) {
                var block = geByClass1('market_album_size', 'market_album_block'+k);
                if (block) {
                  block.innerHTML = v;
                }
              });
            }
          }
          showDoneBox(text);
        },
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
      });
    });
    return false;
  },

  deleteAlbum: function(aid, hash) {
    showFastBox({title: getLang('market_delete_album_title'), dark: 1}, getLang('market_delete_album_sure'), getLang('global_delete'), function() {
      ajax.post('/al_market.php?act=a_delete_album', {aid: aid, oid: cur.oid, hash: hash}, {
        onDone: function() {
          var block = ge('market_album_block' + aid);
          curBox().hide();
          cur.albumsCount--;
          if (cur.albumsSorter) {
            qsorter.remove(ge('market_albums_cont'), block);
          }
          re(block);
          var summary = '';
          if (cur.albumsCount > 0) {
            summary = getLang('market_summary_X_albums', cur.albumsCount, true);
          } else {
            summary = getLang('market_summary_no_albums');
            hide('market_albums_wrap');
            show('market_no_albums_wrap');
          }
          ge('market_albums_summary').innerHTML = summary;
          Market.switchTab('albums', domFC(geByClass1('market_tab_albums', 'market_tabs')));
        }
      });
    });
    return false;
  },
  editAlbum: function(aid) {
    showBox('al_market.php?act=edit_album_box', {oid: cur.oid, aid: aid}, {dark: 1});
    return false;
  },
  createAlbum: function() {
    showBox('al_market.php?act=edit_album_box', {oid: cur.oid}, {dark: 1});
    return false;
  },

  showItem: function(oid, id, from) {
    var _from = '';
    if (from) {
      _from = from;
    } else if (cur.module) {
      _from = cur.module;
    }
    showWiki({w: 'product'+oid+'_'+id + '/query', from: _from});
    return false;
  },
  showWriteMessage: function(e, id, item_id, hash) {
    stManager.add(['page.js', 'wide_dd.js']);
    cur.mbForceAttach = ['market', item_id, hash];
    var box = showBox('al_mail.php', {act: 'write_box', to: id, hash: hash, from: 'market'}, {stat: ['writebox.js', 'writebox.css', 'wide_dd.css', 'page.css', 'emoji.js', 'notifier.css'], cache: 1}, e);
    if (box) cancelEvent(e);
    return !box;
  },
  itemBoxinit: function() {
    if (!cur.mkComments) cur.mkComments = {};
    var cms = ge('market_comments_wrap');
    if (cur.mkComments[cur.options.itemRaw]) {
      domPN(cms).replaceChild(cur.mkComments[cur.options.itemRaw], cms);
    }
    cur.mkYourComment = false;

    setTimeout(function() {
      var h = getSize('market_item_box')[1];
      setStyle('market_item_photo', {maxHeight: h});
      setStyle('market_item_photo_container', {height: h});
    }, 10);

/*    addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    addEvent(window, 'resize', WkView.onResize);*/
    if (cur.options.photos && cur.options.photos.length > 1) {
      addEvent(domPN(ge('market_item_photo')), 'click', Market.switchPhoto.pbind(false));
    }
    if (cur.options.canEnlarge && !cur.showPhotoActionsEn) {
      show('market_item_bigph');
      addEvent(wkcur.wkBox, 'mousemove', Market.showPhotoActions);
      cur.showPhotoActionsEn = true;
    }
    for (var i = 1; i < cur.options.photos.length && i <= 5; i++) {
      vkImage().src = cur.options.photos[i].thumb_x;
    }

    wkcur._hide.push(function() {
      removeEvent(domPN(ge('market_item_photo')), 'click');
      if (cur.showPhotoActionsEn) {
        removeEvent(wkcur.wkBox, 'mousemove', Market.showPhotoActions);
        cur.showPhotoActionsEn = false;
      }
    });

    WkView.updateSize();
  },
  switchPhoto: function(num, force) {
    Market.outPhotoThumb();
    if (num === undefined || num === false) {
      num = cur.options.photoIndex + 1;
      if (num >= cur.options.photos.length) {
        num = 0;
      }
    } else if (!force) {
      cur.switchPhotoTO = setTimeout(Market.switchPhoto.pbind(num, true), 50);
      return;
    }
    if (num >= cur.options.photos.length) {
      return false;
    }
    cur.options.photoIndex = num;
    var container = ge('market_item_photo_container'),
        h = getSize(container)[1];
    setStyle(container, {height: h});
    ge('market_item_photo').src = cur.options.photos[num].thumb_x;
    removeClass(geByClass1('market_item_thumb_active', 'market_item_photos_sidebar'), 'market_item_thumb_active');
    addClass('market_item_thumb' + num, 'market_item_thumb_active');
  },
  outPhotoThumb: function() {
    if (cur.switchPhotoTO) {
      clearTimeout(cur.switchPhotoTO);
      cur.switchPhotoTO = false;
    }
  },
  showPhotoActions: function(ev) {
    var actions = ge('market_item_bigph'),
        pos = getXY(actions),
        size = getSize(actions),
        padding = 100;

    if ((ev.pageX > (pos[0] - padding) && ev.pageX < (pos[0] + size[0] + padding)) &&
      (ev.pageY > (pos[1] - padding) && ev.pageY < (pos[1] + size[1] + padding))) {
      addClass(actions, 'visible');
    } else {
      removeClass(actions, 'visible');
    }
  },
  showBigPhoto: function(ev) {
    if (!cur.options.canEnlarge) return false;
    var ph = cur.options.photos[cur.options.photoIndex];
    removeClass('market_item_bigph', 'visible');
    showPhoto(ph.id, 'market' + cur.options.itemRaw, parseJSON(ph.view_opts), ev);
    return false;
  },

  likeUpdate: function(my, count, title) {
    count = intval(count);

    var rows = ge('like_table_' + cur.options.like_obj);
    var titleNode = ge('like_title_' + cur.options.like_obj),
        countNode = ge('market_like_count');
    var icon = ge('market_like_icon');
    var tt = icon.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -36);

    if (title && titleNode) {
      val(titleNode, title);
    }
    cur.options.likes = count;
    animateCount(countNode, count);

    cur.options.liked = my;
    toggleClass(icon, 'my_like', my);
    if (my) {
      setStyle(icon, {opacity: 1});
    }
    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      } else if (rows) {
        var params = {};
        params[styleName] = newleft;
        animate(rows, params, 200);
      }
      removeClass(icon, 'no_likes');
    } else {
      if (tt.el) tt.hide();
      addClass(icon, 'no_likes');
    }
  },
  like: function() {
    if (!vk.id) return;
    var my = !cur.options.liked;

    ajax.post('like.php', {act: 'a_do_' + (my ? '' : 'un') + 'like', object: cur.options.like_obj, hash: cur.options.likehash}, {
      onDone: function(count, title) {
        return Market.likeUpdate(my, count, title);
      }
    });
    Market.likeUpdate(my, cur.options.likes + (my ? 1 : -1));
  },
  likeShare: function(hash) {
    if (!vk.id) return;
    var el = ge('like_share_' + cur.options.like_obj),
        was = isChecked(el);
    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: cur.options.like_obj, hash: hash}, {
      onDone: Market.likeUpdate.pbind(true)
    });

    var countInput = ge('like_real_count_' + cur.options.like_obj),
        count = countInput ? countInput.value : val('like_count' + cur.options.like_obj),
        my = hasClass(ge('like_icon' + cur.options.like_obj), 'my_like');
    Market.likeUpdate(true, intval(count) + (my ? 0 : 1));
  },
  likeShareCustom: function () {
    if (vk.id) {
      showBox('like.php', {act: 'publish_box', object: cur.options.like_obj, list: ''});
    }
  },
  likeOver: function() {
    var icon = ge('market_like_icon');
    var linkSize = getSize(ge('market_like_link')),
        linkW = linkSize ? linkSize[0] : 20;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', object: cur.options.like_obj},
      slide: 15,
      shift: [0, 8, 9],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich like_tt',
      init: function (tt) {
        if (!tt.container) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: linkW + 2});
        setStyle(tp, {marginLeft: linkW + 2});
      }
    });
  },
  likeOut: function() {
    if (!cur.options.liked) {
      setTimeout(animate.pbind(ge('market_like_icon'), {opacity: 0.4}, 200, false), 1);
    }
  },

  updateComposer: function() {
    var yc = ge('market_reply_form');
    if (!yc || cur.mkYourComment == yc) return;

    if (cur.mkYourComment) {
      domPN(yc).replaceChild(cur.mkYourComment, yc);
      Market.hideEditReply();
      cur.mkYourComment = false;
      return;
    }
    if (!isVisible('market_reply_box')) {
      return;
    }
    var txt = ge('market_reply_field');
        comp = data(txt, 'composer');
    if (comp) {
      Composer.reset(comp);
      Composer.destroy(comp);
    }
    cur.mkYourComment = yc;
    cur.destroy.push(function(c) {
      var field = c.mkYourComment && geByTag1('textarea', c.mkYourComment), comp = field && data(field, 'composer');
      if (comp) {
        Composer.reset(comp);
        Composer.destroy(comp);
      }
    });
    Wall.initComposer(txt, {
      lang: {
        introText: getLang('profile_mention_start_typing'),
        noResult: getLang('profile_mention_not_found')
      },
      wddClass: 'mv_composer_dd',
      width: getSize(domPN(cur.mkYourComment))[0],
      media: {
        lnk: domFC(ge('market_reply_media_lnk')),
        preview: ge('market_reply_media_preview'),
        types: cur.options.media,
        options: {limit: 2, disabledTypes: ['album'], toggleLnk: true, onChange: function() {
          setTimeout(WkView.updateHeight, 2);
        }}
      }
    });
    stManager.add(['emoji.js', 'notifier.css'], function() {
      cur.mkEmoji = Emoji.init(txt, {
        ttDiff: -48,
        rPointer: true,
        controlsCont: txt.parentNode,
        onSend: function() {
          if (!buttonLocked('market_reply_button')) {
            Market.sendComment();
          }
        },
        noEnterSend: 1,
        //sharedTT: cur.sharedIm,
        onStickerSend: function(stNum) {
          Market.sendComment(false, stNum);
        }
      });
      setTimeout(function () {
        hide(geByClass1('input_back_wrap', 'market_reply_box'));
      }, 0);
    });
  },
  showEditReply: function(event) {
    hide('market_reply_fakebox');
    show('market_reply_box');
    Market.updateComposer();
    //prevent flashing of placeholder
    hide(geByClass1('input_back_wrap', 'market_reply_box'));
    ge('market_reply_field').focus();
  },
  hideEditReply: function(event) {
    var rf = ge('market_reply_field'),
        composer = rf && data(rf, 'composer');
    if (composer) {
      Composer.reset(composer);
    } else {
      val(rf, '');
    }
    hide('market_reply_box');
    show('market_reply_fakebox');
  },
  updateCommentsOnScroll: function(resize) {
    return false;
    var wndHeight = window.innerHeight || document.documentElement.clientHeight,
        replyForm = ge('market_reply_form');
    if (!replyForm) {
      return;
    }

    var formWrap = ge('market_reply_form_wrap'),
        formY = getXY(formWrap, true)[1],
        formSize = getSize(replyForm);
        formH = formSize[1];

    if (resize && wkcur.fixedBottom === false && wndHeight - formH < formY + 20) {
      wkLayerWrap.scrollTop += formY + 20 - (wndHeight - formH);
    } else if (isVisible(formWrap) && wndHeight - formH < formY) {
      if (!wkcur.fixedBottom || resize) {
        wkcur.fixedBottom = true;
        addClass(replyForm, 'market_reply_form_fixed');
      }
      setStyle(formWrap, {width: formSize[0], height: formSize[1], bottom: bottom});
      var bottom = Math.min(0, wndHeight - getXY('market_comments_wrap', true)[1] - formH);
      setStyle(replyForm, {bottom: bottom});
    } else {
      if (wkcur.fixedBottom || resize) {
        wkcur.fixedBottom = false;
        removeClass(replyForm, 'market_reply_form_fixed');
        setStyle(formWrap, {width: '', height: ''});
      }
    }
    if (resize && wkcur.fixedBottom) {
      setStyle(replyForm, {left: getXY(wkcur.wkContent)[0] + 'px'})
    }
  },
  highlightComment: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
      setTimeout(function() {
        animate(el, {backgroundColor: '#FFF'}, 200);
      }, 1000);
    }), top = getXY(el, true)[1];

    if (top < 0 || top > lastWindowHeight - 200) {
      animate(wkLayerWrap, {scrollTop: wkLayerWrap.scrollTop + top - 50}, 300, hlfunc);
    } else {
      hlfunc();
    }
  },
  showComment: function(comm) {
    var p = ge('market_comment' + comm);
    if (p) {
      Market.highlightComment(p);
    } else {
      Market.comments(comm);
    }
    return false;
  },
  commDone: function(comm, text, del, script) {
    var node = ge('market_comment' + comm);
    if (!node) return;
    var fChild = domFC(node),
        msg = domNS(fChild);
    if (!text) {
      show(fChild);
      hide(msg);
      ++cur.options.commCount;
      ++cur.options.commShown;

      Market.updateComms();
      return;
    }
    if (msg) {
      msg.innerHTML = text;
      show(msg);
    } else {
      node.appendChild(ce('div', {innerHTML: text}));
    }
    hide(fChild);
    if (del) {
      --cur.options.commCount;
      --cur.options.commShown;
      Market.updateComms();
    } else {
      setTimeout(WkView.updateHeight, 2);
      if (!cur.mkComments) cur.mkComments = {};
      cur.mkComments[cur.options.itemRaw] = ge('market_comments_wrap');
    }
    if (script) {
      eval(script);
    }
  },
  commAction: function(act, comm, hash) {
    if (isVisible('market_comment_progress' + comm)) return;
    ajax.post('al_market.php', {act: act + '_comment', comment: comm, hash: hash}, {
      onDone: Market.commDone.pbind(comm),
      progress: 'market_comment_progress' + comm
    });
  },
  comments: function(showcomm) {
    if (showcomm) {
      var frst = domFC(ge('market_comments')).id || '';
      if (
        !isVisible('market_comments_header') ||
        isVisible('market_comments_progress') ||
        WkView.cmp(frst, 'market_comment' + showcomm) < 0
      ) {
        return;
      }
    }
    ajax.post('al_market.php', {act: 'a_get_comments', offset: cur.options.commShown, item: cur.options.itemRaw}, {
      onDone: function(text, names) {
        Market.receiveComms(text, names, false, showcomm);
        if (showcomm && ge('market_comment' + showcomm)) {
          Market.showComment(showcomm);
        }
      },
      showProgress: function() {
        hide('market_comments_header');
        show('market_comments_progress');
      },
      hideProgress: function() {
        hide('market_comments_progress');
        show('market_comments_header');
      }
    });
  },
  updateComms: function() {
    setTimeout(WkView.updateHeight, 2);
    var commshown = '';
    if (cur.options.commCount > cur.options.commShown) {
      commshown = cur.options.commCount - cur.options.commShown;
    }

    ge('market_comments_header').innerHTML = getLang('market_show_previous_comments', commshown);
    show(domFC(ge('market_comments_wrap')));
    toggleClass('market_comments_header', 'market_comments_expanded', !commshown);
    toggleClass('market_comments_summary', 'market_comments_expanded', !commshown);

    WkView.updateSize();

    if (!cur.mkComments) cur.mkComments = {};
    cur.mkComments[cur.options.itemRaw] = ge('market_comments_wrap');
  },
  commentClick: function(el, event, from) {
    var comm = el.id.replace('market_comment', ''), cmnt = comm.split('_');
    if (Wall.checkReplyClick(el, event)) return;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (from && cmnt[1] && ge('market_reply_field'))
      Market.showEditReply(event);{
      Market.commentTo(comm, from, event);
    }
  },
  commentChanged: function() {
    checkTextLength(cur.options.commLimit, ge('market_reply_field'), 'market_reply_warn');
  },
  commentTo: function(comm, toId, event) {
    var cmnt = (comm || '').split('_'), commId = cmnt[1], replyNameOld = cur.mkReplyTo && cur.options.names[cur.mkReplyTo[0]] || '', replyName = cur.options.names[toId] || '', fld = ge('market_reply_field'), tl = ge('market_reply_to_title'), asGroup = ge('market_reply_as_group');

    if (comm) {
      cur.mkReplyTo = [toId, commId];
      val(tl, replyName[0] || '');
      show(tl, 'market_del_reply_to');
      setStyle(tl, {maxWidth: ge('market_submit_reply').offsetWidth - domPN(ge('market_reply_button')).offsetWidth - (asGroup ? (asGroup.offsetWidth + 10) : 0) - ge('market_reply_media_lnk').offsetWidth - 21});
    } else {
      cur.mkReplyTo = false;
      hide(tl, 'market_del_reply_to');
    }

    var v = window.Emoji ? trim(Emoji.editableVal(fld)) : '';
    var cEl = comm && geByClass1('market_reply_to', ge('market_comment' + comm));
    if (!v || replyNameOld && !winToUtf(replyNameOld[1]).indexOf(v) || comm === false) {
      if (fld && window.Emoji) {
        Emoji.val(fld, comm && !checkEvent(event) ? replyName[1] : '');
      }
    }
    toggleClass(asGroup, 'on', !!(cEl && cEl.getAttribute('rid') === cmnt[0]));
    if (comm && window.Emoji) {
      Emoji.editableFocus(fld, false, true);
    }
  },
  receiveComms: function(text, names, noOld, toUp) {
    var n = ce('div', {innerHTML: text}), comms = ge('market_comments'), last = current = domLC(comms), frm = getXY(current, true)[1];
    for (var el = domLC(n); el; el = domLC(n)) {
      if (ge('market_reply_field')) addClass(el, 'reply_replieable');
      while (current && WkView.cmp(current.id, el.id) > 0) {
        current = domPS(current);
      }
      if (current && !WkView.cmp(current.id, el.id)) {
        comms.replaceChild(el, current);
        current = el;
      } else {
        if (current && domNS(current)) {
          comms.insertBefore(el, domNS(current));
          ++cur.options.commCount;
        } else if (!current && domFC(comms)) {
          if (noOld === true) {
            --cur.options.commShown;
            n.removeChild(el);
          } else {
            comms.insertBefore(el, domFC(comms));
          }
        } else {
          comms.appendChild(el);
        }
        ++cur.options.commShown;
      }
    }
    if (toUp && last) {
      wkLayerWrap.scrollTop += getXY(last, true)[1] - frm;
    }
    extend(cur.options.names, names);
    window.updateWndVScroll && updateWndVScroll();
    Market.updateComms();
  },
  commSaved: function(post) {
    var comms = ge('market_comments_wrap'), vd = comms ? cur.options.itemRaw : false, comm = post.match(/^(-?\d+)market(_\d+)/);
    if (!vd || !comm || !ge('market_comment' + comm[1] + comm[2])) return;
    if (!cur.mkComments) cur.mkComments = {};
    cur.mkComments[cur.options.itemRaw] = comms;
  },
  sendComment: function(ev, stickerId) {
    var fld = ge('market_reply_field'), comp = fld && data(fld, 'composer'),
        replyToName = (cur.options.names[(cur.mkReplyTo || {})[0]] || [])[1];

    if (stickerId) {
      var params = {message: '', attach1_type: 'sticker', attach1: stickerId};
    } else {
      var params = comp ? Composer.getSendParams(comp, Market.sendComment) : {message: trim(val(fld))};
      if (params.delayed) return;

      if (!params.attach1_type && (!params.message || replyToName && !replyToName.indexOf(params.message))) {
        elfocus(fld);
        return;
      }
    }

    hide('market_reply_warn');
    ajax.post('al_market.php', Wall.fixPostParams(extend(params, {
      act: 'post_comment',
      item: cur.options.itemRaw,
      hash: cur.options.hash,
      from_group: isChecked(ge('market_reply_as_group')),
      reply_to: (cur.mkReplyTo || {})[1]
    })), {
      onDone: function(text, names) {
        ++cur.options.commCount;
        Market.receiveComms(text, names, true);
        wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
        if (fld && data(fld, 'composer')) {
          Composer.reset(data(fld, 'composer'));
        } else {
          val(fld, '');
        }
        fld.blur();
        cur.mkReplyTo = false;
        hide('market_reply_to_title', 'market_del_reply_to');
      },
      onFail: function(text) {
        if (fld) {
          showTooltip(fld, {text: text, showdt: 200, forcetodown: 0, slide: 15});
          elfocus(fld);
          return true;
        }
      },
      showProgress: lockButton.pbind('market_reply_button'),
      hideProgress: unlockButton.pbind('market_reply_button')
    });
  },

  emojiShowTT: function(obj, ev) {
    if (cur.mkEmoji === undefined) {
      return false;
    }
    return Emoji.ttShow(cur.mkEmoji, obj, ev);
  },
  emojiHideTT: function(obj, ev) {
    if (cur.mkEmoji === undefined) {
      return false;
    }
    return Emoji.ttHide(cur.mkEmoji, obj, ev);
  },
  showEmojiTT: function(obj, ev) {
    if (cur.mkEmoji === undefined) {
      return false;
    }
    return Emoji.ttClick(cur.mkEmoji, obj, false, false, ev);
  }
}

var MarketTags = {
  init: function (input, options) {
    if (this.inited) {
      return;
    }
    var self = this;
    this.inited = true;
    this.input = input;
    this.cont = input.parentNode;
    var resultContainer = ce('div', {className: 'results_container', innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'});
    this.cont.appendChild(resultContainer);
    this.resultList = geByClass('result_list', resultContainer)[0];
    this.resultListShadow = geByClass('result_list_shadow', resultContainer)[0];
    hide(this.resultList, this.resultListShadow);

    if (browser.chrome) this.resultList.style.opacity = 1;
    else if (!browser.safari) setStyle(this.resultListShadow, 'top', browser.mozilla ? 0 : (browser.msie && browser.version < 8) ? 0 : -1);
    this.resultList.style.width = this.resultListShadow.style.width = resultContainer.style.width = getSize(input)[0] + 'px';

    this.onShowCallback = options ? options.onShow : false;

    this.initSelect(options);

    cur.indexTags = new vkIndexer(cur.tagsList, function(obj) {
      return obj[1];
    });

    addEvent(input, 'keyup click mouseup', self.inputUpHandler);
    addEvent(document, 'click', self.documentClick);
    addEvent(input, 'keypress keydown', self.inputDownHandler);
  },
  inputUpHandler: function(e) {
    var self = MarketTags;
    if (!self.select) return;
    if (self.select.isVisible() && self.select.active > -1 || cur.preventISRequest) {
      delete cur.preventISRequest;
      if (inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN])) return cancelEvent(e);
    }
    clearTimeout(cur.requestTimeout);
    var term = val(self.input);
    self.currentTerm = term;
    if (!term) {
      self.showSelectList(term, cur.tagsList.slice(0, 10));
      return;
    }
    cur.requestTimeout = setTimeout(function() {
      var res = cur.indexTags.search(term),
          highlight = self.getHighlight(term);
          list = [];
      for (var i = 0, l = res.length; i < l; i++) {
        var t = clone(res[i]);
        if (highlight) {
          t.push('')
          t.push(t[1]);
          t[1] = t[1].replace(highlight.re, highlight.val);
        }
        list.push(t);
      }
      self.showSelectList(term, list);
    }, 300);
  },
  documentClick: function(ev) {
    var self = MarketTags;
    if (!self.select || ev.target == self.input) return;
    self.select.hide();
  },
  inputDownHandler: function(e) {
    var self = MarketTags;
    if (!self.select) return;

    if (!self.select || self.select.active < 0) {
      if (e.keyCode == KEY.RETURN && self.select) {
        cur.preventISRequest = true;
        self.select.hide();
      }
      return true;
    }

    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      if (self.select && self.select.isVisible()) {
        triggerEvent(document, e.type, e);
        return cancelEvent(e);
      }
    } else if (e.keyCode == KEY.SPACE) {
      var el = self.select.list.childNodes[self.select.active], id = el ? el.getAttribute('val') : '', item;
      each(self.lastItems, function () {
        if (this[0] == id) {
          item = this;
        }
      });
      if (!item) return;
      val(input, item[3] + ' ');
      focusAtEnd(input);
      return cancelEvent(e);
    }
    return true;
  },

  initSelect: function(options) {
    if (this.select || !window.Select || !window._ui) return;
    if (!this.resultList || !this.resultListShadow) {
      return;
    }
    this.guid = _ui.reg(this);
    var _this = this;
    this.select = new Select(this.resultList, this.resultListShadow, {
      selectFirst: false,
      onItemSelect: this.onItemSelect.bind(this),
      onShow: function() {
        isFunction(_this.onShowCallback) && _this.onShowCallback();
        return _ui.sel(_this.guid);
      },
      onHide: _ui.sel.pbind(false),
      cycle: true
    });
    this.select.hide();
  },
  showSelectList: function (term, items) {
    var self = this;
    if (!this.select) return;
    items = isArray(items) && items.length ? items : [];
    if (!items.length) {
      self.select.hide();
      return;
    }
    this.select.clear();
    this.lastItems = items;
    this.select.content(items);
    this.select.show();

    isFunction(this.onShowCallback) && this.onShowCallback();
  },
  onItemSelect: function(id) {
    if (!this.select) return;
    this.select.hide();
    var item;
    each(this.lastItems, function () {
      if (this[0] == id) {
        item = this;
      }
    });
    if (!item) return;
    var el = ce('div', {innerHTML: item[1]}),
        text = el.innerText || el.textContent;
    text = '#' + text.replace(' ', '_');
    val(this.input, text);

    toggleClass(cur.searchEl, 'not_empty', true);
    Market.updateList();
  },
  onEvent: function(e) {
    if (e.type == (browser.opera || browser.mozilla ? 'keypress' : 'keydown')) {
      this.select.handleKeyEvent(e);
    }
  },
  getHighlight: function(q) {
    var indxr = cur.indexTags, delimiter = indxr.delimiter, trimmer = indxr.trimmer;

    q += ' ' + (parseLatin(q) || '');
    q = escapeRE(q).replace(/&/g, '&amp;');
    q = q.replace(trimmer, '').replace(delimiter, '|');
    return {
      re: new RegExp('(' + q + ')', 'gi'),
      val: '<em>$1</em>'
    }
  },
  destroy: function (prevCur) {
    cleanElems(this.resultList, this.resultListShadow);
    clearTimeout(prevCur ? prevCur.requestTimeout : cur.requestTimeout);
    removeEvent(this.input, 'keyup click mouseup', this.inputUpHandler);
    removeEvent(document, 'click', this.documentClick);
    removeEvent(this.input, 'keypress keydown', this.inputDownHandler);
    if (this.select) {
      this.select.destroy();
      delete this.select;
    }
    if (this.resultList) {
      re(this.resultList.parentNode);
    }
    delete this.lastItems;
    this.inited = false;
  }
}

try{stManager.done('market.js');}catch(e){}
