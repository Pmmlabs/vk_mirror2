var Market = {
    init: function() {
        extend(cur, {
            searchInp: ge('market_search_input'),
            searchEl: geByClass1('market_search', 'market_search_wrap'),
            listEl: ge('market_list'),
            more: ge('ui_items_load_more'),
            notFound: ge('not_found'),
            catalogEl: ge('market_list_wrap'),
            albumbEl: ge('market_albums_list'),
            tabsEl: geByClass1('ui_content_tabs', 'market_list_wrap'),
            pageHeaderEl: ge('market_page_header'),
            headerEl: geByClass1('page_block_sub_header', 'market_list_wrap')
        });

        Market.initFilters();

        /*MarketTags.destroy();
        MarketTags.init(cur.searchInp);*/

        Market.initScroll();
        setTimeout(function() {
            cur.destroy.push(function() {
                Market.deinitScroll();
            });
        }, 0);

        Market._createSorters();
    },
    switchTabSpinner: function(sideLink, cls, status, text) {
        if (status === 'on') {
            val(sideLink, '');
            addClass(sideLink, cls);
        } else if (status === 'off') {
            removeClass(sideLink, cls);
            val(sideLink, text);
        }
    },
    switchTab: function(section, el, event) {
        var sideLink = geByClass1('side_link', gpeByClass('ui_tabs', el));
        uiTabs.switchTab(el);
        var text = val(sideLink);
        ajax.post('/al_market.php', {
            id: cur.oid,
            section: section,
            load: 1,
            tab: 1
        }, {
            onDone: function(count, rows, showMore) {
                cur.listEl.innerHTML = rows;
                if (showMore) {
                    show(cur.more);
                } else {
                    hide(cur.more);
                }
                Market.section(section);
            },
            showProgress: Market.switchTabSpinner.pbind(sideLink, 'round_spinner', 'on', text),
            hideProgress: Market.switchTabSpinner.pbind(sideLink, 'round_spinner', 'off', text),
        });
        return false;
    },
    section: function(section) {
        section = section || '';
        if (!section && cur.mSection == 'comments') {
            var crumbs = geByClass('ui_crumb', cur.pageHeaderEl),
                crumbs_sep = geByClass('ui_crumb_sep', cur.pageHeaderEl),
                name = crumbs[crumbs.length - 2].textContent;
            re(crumbs[crumbs.length - 1]);
            re(crumbs[crumbs.length - 2]);
            re(crumbs_sep[crumbs_sep.length - 1]);
            domPN(crumbs[0]).appendChild(ce('div', {
                className: 'ui_crumb',
                innerHTML: name
            }));
        }
        cur.mSection = section;
        nav.setLoc('market' + cur.oid + (section ? '?section=' + section : ''));
        ge('market').className = 'page_block';
        setDocumentTitle(replaceEntities(stripHTML(cur.htitles[section] || cur.htitles[''])));
        Market._createSorters();
        return false;
    },
    _createSorters: function() {
        if (cur.itemsSorter) {
            cur.itemsSorter.destroy();
        }
        if (cur.albumsSorter) {
            cur.albumsSorter.destroy();
        }
        if (!cur.canEdit) {
            return;
        }

        if ((!cur.mSection || cur.mSection == 'albums') && cur.albumsCount > 1) {
            cur.itemsSorter = new GridSorter('market_albums_cont', 'market_album_photo_img', {
                onReorder: Market._onAlbumReorder
            });
        }

        if ((!cur.mSection || cur.aid) && cur.itemsCount > 1 && !hasClass('market', 'market_search_section')) {
            cur.itemsSorter = new GridSorter(cur.listEl, 'market_row_img', {
                onReorder: Market._onItemReorder
            });
        }
    },
    _reinitSorters: function(disable) {
        if (!cur.canEdit) return;

        clearTimeout(cur._rsto);
        cur._rsto = setTimeout(function() {
            if (cur.itemsSorter) {
                if (disable) {
                    cur.itemsSorter.disable();
                } else {
                    cur.itemsSorter.enable();
                }
            } else {
                Market._createSorters();
            }
        });
    },
    _onItemReorder: function(itemEl, nextItemEl, prevItemEl) {
        var item_id = itemEl.getAttribute('data-id');
        var pitem_id = prevItemEl ? prevItemEl.getAttribute('data-id') : null;
        var nitem_id = nextItemEl ? nextItemEl.getAttribute('data-id') : null;
        ajax.post('al_market.php', {
            act: 'a_reorder_items',
            oid: cur.oid,
            aid: cur.aid,
            id: item_id,
            before: nitem_id,
            after: pitem_id,
            hash: cur.reorderHash
        });
    },
    _onAlbumReorder: function(albumEl, nextAlbumEl, prevAlbumEl) {
        var aid = albumEl.getAttribute('data-id');
        var paid = prevAlbumEl ? prevAlbumEl.getAttribute('data-id') : null;
        var naid = nextAlbumEl ? nextAlbumEl.getAttribute('data-id') : null;
        ajax.post('al_market.php', {
            act: 'a_reorder_albums',
            oid: cur.oid,
            aid: aid,
            before: naid,
            after: paid,
            hash: cur.reorderHash
        });
    },

    initFilters: function() {
        cur.searchFilters = {};

        each(['market_fltr_price_from', 'market_fltr_price_to'], function(i, id) {
            elem = ge(id);
            cur.searchFilters[id.replace('market_fltr_', '')] = elem;
            placeholderInit(elem);
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

        stManager.add(['ui_controls.js', 'ui_controls.css'], function() {
            cur.searchFilters['sort'] = new Dropdown(ge('market_fltr_order'), cur.orderList, {
                big: 1,
                selectedItems: cur.order,
                onChange: Market.updateList.pbind(false)
            });

            Market.updateFiltersPane();
        });
    },
    getFilterValue: function(elem) {
        var fv = false;
        if (elem.__className == 'Selector') {
            fv = clone(elem.selectedItems()[0]);
            fv.push(fv[0] == elem.options.defaultItems[0][0]);
        } else if (elem.tagName == 'INPUT') {
            var v = val(elem);
            fv = [v, v, v === ''];
            if (elem.type == 'text') {
                var p = gpeByClass('ui_search_fltr_sel', elem),
                    label = domPS(p);
                if (hasClass(label, 'ui_search_fltr_label')) {
                    var prefix = label.textContent,
                        _prefix = '',
                        postfix = geByClass1('ui_search_fltr_label_postfix', label);
                    if (postfix) {
                        _prefix = postfix.getAttribute('data-prefix');
                        postfix = postfix.textContent;
                        prefix = prefix.replace(postfix, '').replace(/,\s$/, '');
                        if (_prefix) {
                            postfix = false;
                        }
                    }
                    if (geByClass1('ui_search_fltr_sep', p)) {
                        each(geByTag('input', p), function(i, inp) {
                            if (inp == elem) {
                                prefix += ' ' + (i == 0 ? getLang('market_filter_range_from') : getLang('market_filter_range_to'));
                            }
                        });
                    }
                    fv[1] = prefix + (_prefix ? (' ' + _prefix) : ' ') + fv[1] + (postfix ? (' ' + postfix) : '');
                }
            }
        }
        return fv;
    },
    clearFilter: function(elem) {
        if (elem.__className == 'Selector') {
            elem.selectItem(elem.options.defaultItems[0][0], false);
        } else if (elem.tagName == 'INPUT') {
            val(elem, '');
        }
    },
    updateFiltersPane: function() {
        each(cur.searchFilters, function(fid, elem) {
            var v = Market.getFilterValue(elem);
            uiSearch.toggleFilter(cur.searchInp, fid, window.clean(v[1]), !v[2]);
        });
    },
    onFilterRemoved: function(fid) {
        Market.clearFilter(cur.searchFilters[fid]);

        cur.filterIsRemoved = true;
        Market.updateList();
    },

    getSearchParams: function() {
        var params = {
            q: trim(val(cur.searchInp)),
            load: 1,
            id: cur.oid,
            offset: cur.searchOffset || 0
        };
        each(cur.searchFilters, function(fid, elem) {
            var v = Market.getFilterValue(elem);
            params[fid] = v[0];
        });
        if (cur.aid) {
            params.aid = cur.aid;
        }
        if (cur.mSection == 'disabled') {
            params.disabled = 1;
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
    onChangeQuery: function(str) {
        if (!str && cur.params && cur.params.q) {
            Market.updateList();
        }
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
                if (!offset && !hasClass('shown', geByClass1('ui_search_fltr_control', 'market_search_wrap'))) {
                    uiSearch && uiSearch.showProgress(cur.searchInp);
                }
                cur.params = params;
                Market.searchItems();

                if (cur.mSection == 'comments') {
                    Market.section('');
                }
            }
            if (!params.offset) {
                scrollToTop();
            }
        };
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
                var summaryEl = geByClass1('market_summary_text', 'market_list_wrap');
                if (summaryEl) {
                    var summary = '';
                    if (count) {
                        summary = getLang('market_summary_X_goods', count, true);
                    } else {
                        summary = getLang('market_summary_no_goods');
                    }
                    summaryEl.innerHTML = summary;
                } else {
                    val('market_items_count', count ? langNumeric(count, '%s', true) : '');
                }

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
                    addClass('market', 'market_content_not_found');
                    hide(cur.more);
                } else {
                    removeClass('market', 'market_content_not_found');
                }

                if (!cur.filterIsRemoved) {
                    Market.updateFiltersPane();
                } else {
                    cur.filterIsRemoved = false;
                }

                var searchParamsCount = 0;
                each(query, function(k, v) {
                    if (!inArray(k, ['id', 'load', 'sort', 'offset', 'disabled']) && v != '' || (k == 'sort' && v != 0)) {
                        searchParamsCount++;
                    }
                });
                if (searchParamsCount) {
                    addClass('market', 'market_search_section');
                } else {
                    removeClass('market', 'market_search_section');
                    if (cur.albumsCount) {
                        show(cur.albumbEl);
                    }
                    if (cur.tabsEl) {
                        show(cur.tabsEl);
                        hide(cur.headerEl);
                    }
                }

                Market._reinitSorters(searchParamsCount > 0);

                each(query, function(i, v) {
                    if (v && v != 0 && !inArray(i, ['load', 'id', 'offset', 'aid']) && (i != 'sort' || v != 0)) {
                        nav.objLoc[i] = v;
                    } else {
                        delete nav.objLoc[i];
                    }
                });
                nav.setLoc(nav.objLoc);
            },
            showProgress: function() {
                show('market_fltr_progress');
                cur.isSearchLoading = true;
            },
            hideProgress: function() {
                hide('market_fltr_progress');
                uiSearch && uiSearch.hideProgress(cur.searchInp);
                unlockButton(cur.more);
                cur.isSearchLoading = false;
            }
        });
    },
    clearItemsSearch: function() {
        if (window.uiSearch) {
            uiSearch.reset(cur.searchInp, false);
            uiSearch.removeAllFilters(cur.searchInp);
        }
        elfocus(cur.searchInp);
        removeClass(cur.searchEl, 'not_empty');
        Market.updateList();
    },
    loadComments: function(offset) {
        if (cur.loadComments) return;
        cur.searchOffset = offset;
        cur.loadComments = 1;

        var params = {
            load: 1,
            section: 'comments',
            id: cur.oid,
            offset: cur.searchOffset || 0
        }
        ajax.post('/al_market.php', params, {
            onDone: function(count, rows, showMore) {
                cur.listEl.appendChild(cf(rows));
                unlockButton(cur.more);
                if (showMore) {
                    show(cur.more);
                } else {
                    hide(cur.more);
                }
                cur.loadComments = 0;
            }
        });
    },
    showMore: function() {
        if (cur.mSection == 'albums') return false;
        var offset = cur.searchOffset || 0;
        offset += cur.itemsPerPage;
        lockButton(cur.more);
        if (cur.mSection == 'comments') {
            Market.loadComments(offset);
        } else {
            Market.updateList(offset);
        }
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
                animate(geByTag1('body'), {
                    scrollTop: 0,
                    transition: Fx.Transitions.easeOutCubic
                }, 700);
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
        var st = scrollGetY(),
            lnk = cur.more;

        if (!isVisible(lnk)) return;
        if (st + ch * 3 > lnk.offsetTop) {
            lnk.onclick();
        }
    },

    // upload
    uploadInit: function(cont, opts, isMain) {
        cur.lang = extend(cur.lang || {}, opts.lang);

        var options = {
            file_name: 'photo',
            file_size_limit: 1024 * 1024 * 25, // 25Mb
            file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
            file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',
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

        return Upload.init(cont, opts.url, cur.mkOptions.photoVars, extend(options, {
            onUploadStart: function(i, res) {
                curBox().changed = true;
                if (Upload.types[i] == 'form') {
                    show(box.progress);
                }
                re(geByClass1('error', opts.errorObj));
            },

            onCheckComplete: function(i) {
                if (i == cur.uploadId && cur.extraUploadId && Upload.uploadUrls[cur.extraUploadId]) { // main photo
                    Upload.uploadUrls[cur.extraUploadId] = Upload.uploadUrls[cur.uploadId];
                }
                Upload.embed(i);
            },

            onUploadComplete: function(info, res, errorAdd) {
                var obj = parseJSON(res) || {
                    error: 'ERR_CLIENT_BAD_RESPONSE: bad request response'
                };
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
                    ajax.post('al_photos.php', extend({
                        act: 'choose_uploaded'
                    }, obj), {
                        onDone: function(media, data) {
                            Market.choosePhoto(info, media, extend(data, {
                                upload_ind: i + '_' + fileName
                            }));
                        },
                        onFail: Market.uploadFail.pbind(isMain, info)
                    });
                }
            },

            onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                var i = info.ind !== undefined ? info.ind : info;
                if (isMain) {
                    var progressBar = getProgressBarEl(ge('form' + i + '_progress'));
                    if (!progressBar) {
                        var obj = Upload.obj[i],
                            objHeight = getSize(obj)[1],
                            tm = objHeight / 2 + 10;
                        var node = obj.firstChild;
                        while (node) {
                            if (node.nodeType == 1) {
                                if (node.id == 'uploader' + i && browser.msie) {
                                    setStyle(node, {
                                        position: 'relative',
                                        left: '-5000px'
                                    });
                                } else {
                                    setStyle(node, {
                                        visibility: 'hidden'
                                    });
                                }
                            }
                            node = node.nextSibling;
                        }
                        obj.appendChild(ce('div', {
                            className: 'market_upload_progress_wrap',
                            innerHTML: '<div id="form' + i + '_progress" class="ui_progress">\
                <div class="ui_progress_back"></div>\
                <div class="ui_progress_bar"></div>\
              </div>'
                        }, {
                            height: tm + 'px',
                            marginTop: -tm + 'px'
                        }));
                        progressBar = getProgressBarEl(ge('form' + i + '_progress'));
                    }
                    var percent = intval(bytesLoaded / bytesTotal * 100);
                    setStyle(progressBar, {
                        width: percent + '%'
                    });
                } else {
                    if (Upload.types[i] == 'fileApi') {
                        var data = {
                            loaded: bytesLoaded,
                            total: bytesTotal
                        };
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
        var e = err.match(/^(ERR_[A-Z0-9_]+)/),
            code = e[1],
            msg;
        switch (code) {
            case 'ERR_UPLOAD_FILE_NOT_SUPPORTED':
                msg = getLang('profile_oph_err_format');
                break;
            case 'ERR_UPLOAD_FILE_NOT_UPLOADED':
                msg = getLang('profile_oph_err_upload').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                break;
            case 'ERR_UPLOAD_BAD_IMAGE_SIZE':
                msg = getLang('profile_oph_err_size').replace('{min}', '400').replace('{max}', '7<span class="num_delim"> </span>000');
                break;
            case 'ERR_UPLOAD_TERMINATED':
                return;
            default:
                msg = getLang('profile_oph_err_unknown').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                break;
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
        showMsg(options.errorObj, msg, 'error', true);
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
        var mediaHtml = '<div class="_ei_photo market_ei_photo_wrap market_ei_photo%ind% inl_bl" id="market_ei_photo%ind%">' + preview + '<div nosorthandle="1" class="ui_thumb_x_button ui_thumb_small_x" data-title="' + getLang('dont_attach') + '" onmouseover="showTitle(this)" onclick="Market.unchoosePhoto(%ind%); return cancelEvent(event);"><div class="ui_thumb_x" nosorthandle="1"></div></div></div></div>',
            mediaEl = se(rs(mediaHtml, {
                ind: ind
            }));
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
                        usorter.init(cont, {
                            clsUp: 'market_ei_preview_up'
                        });
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
            tooltips.hide(geByClass1('ui_thumb_x_button', 'market_ei_photo' + ind));
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
                usorter.init(cont, {
                    clsUp: 'market_ei_preview_up'
                });
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

        var res = [],
            m;
        each(geByClass('_ei_photo', 'market_ei_photos'), function(k, v) {
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

        var progressBar = getProgressBarEl(ge('upload' + ind + '_progress_wrap'));
        if (!progressBar) {
            var progress = '\
  <div class="ui_progress">\
    <div class="ui_progress_back"></div>\
    <div class="ui_progress_bar" style="width: ' + percent + '%;"></div>\
  </div></div>';
            var progressEl = ce('div', {
                id: 'upload' + ind + '_progress_wrap',
                innerHTML: '<div class="market_prg_wrap">' + progress + '</div>' + (label ? '<div class="market_prg_label">' + label + '</div>' : '') + '<div class="market_prg_x" data-title="' + getLang('dont_attach') + '" onmouseover="showTitle(this)" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\'); if (window.tooltips) tooltips.hide(this);"></div>',
                className: 'clear_fix'
            }, {
                marginTop: '6px'
            });
            prgNode.appendChild(progressEl);
            progressBar = getProgressBarEl(ge('upload' + ind + '_progress_wrap'));
            show(prgNode);
            toggle('market_ei_photo_add', Market.uploadedPhotosCount() < Upload.options[i].max_files);
        }
        if (!percent) {
            hide('upload' + ind + '_progress');
        } else {
            setStyle(progressBar, {
                width: percent + '%'
            });
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

        var thumb = Upload.options[cur.extraUploadId].static_url + 'v' + src[1] + '/' + src[2] + '/' + src[3] + '.jpg',
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
            };
            cur.destroy.push(function() {
                cur.photoTaggerDestroy();
            });
        }

        var html = ge('market_photo_crop').innerHTML.replace(new RegExp('_tmpl', 'g'), '');
        box = showFastBox({
                title: getLang('market_photo_crop_title'),
                hideButtons: true,
                grey: true,
                width: 644,
                bodyStyle: 'padding:20px;border:0px',
                onClean: cur.photoTaggerDestroy
            },
            html);
        val('market_photo_crop_thumb', '<div style="' + st + 'margin: 0px auto;"><img id="market_photo_crop_img" src="' + thumb + '" style="' + st + '" onload="stManager.add([\'tagger.css\', \'tagger.js\'], Market.cropInit);" /></div>');
    },
    cropInit: function() {
        var opts = cur.photoCropOpts,
            size = opts.size,
            tsize = opts.thumbSize,
            minSize = [
                Math.max(100, Math.ceil(400 * tsize[0] / size[0])),
                Math.max(100, Math.ceil(400 * tsize[1] / size[1]))
            ],
            rect;
        if (opts.rect) {
            rect = {
                left: Math.floor(opts.rect[0] * tsize[0] / size[0]),
                top: Math.floor(opts.rect[1] * tsize[1] / size[1]),
                width: Math.ceil(opts.rect[2] * tsize[0] / size[0]),
                height: Math.ceil(opts.rect[3] * tsize[1] / size[1])
            }
        } else {
            rect = {
                width: Math.max(minSize[0], tsize[0] - 40),
                height: Math.max(minSize[1], tsize[1] - 40)
            };
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
        if (!cur.photoTagger) return;
        var rect = cur.photoTagger.result(),
            opts = cur.photoCropOpts;
        var cx = opts.size[0] / opts.thumbSize[0],
            cy = opts.size[1] / opts.thumbSize[1],
            crop = [
                Math.floor(rect[0] * cx),
                Math.floor(rect[1] * cy),
                Math.ceil(rect[2] * cx),
                Math.ceil(rect[3] * cy),
                0,
                0,
                Math.ceil(rect[2] * cx)
            ],
            url = cur.photoCropOpts.uploadUrl + '&_crop=' + encodeURIComponent(crop.join(','));

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
        var obj = parseJSON(res) || {},
            btn = 'market_photo_crop_done';
        if (obj.error) {
            unlockButton(btn);
            Market.uploadFail(2, false, obj.error + Upload.getErrorAdditional(obj));
        } else {
            if (cur.photoTooltipHide) {
                cur.photoTooltipHide(true);
                curBox.hide();
            }
            ajax.post('al_market.php', {
                act: 'save_photo',
                _query: res
            }, {
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

    showEditBox: function(id, oid, ev) {
        if (!oid) oid = cur.oid;
        if (oid > 0) {
            return MarketEditItemBox.show(id, oid, ev);
        }
        showBox('al_market.php', {
            act: 'a_edit_item_box',
            id: id,
            oid: oid,
            aid: cur.aid
        }, {
            dark: 1
        });
        return ev && cancelEvent(ev);
    },
    changeCity: function() {
        hide(ge('market_ei_address_choosed'));
        show(ge('market_ei_city_choose'));
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
            oid: cur.mkOptions.oid,
            name: val('item_name'),
            description: val('item_description'),
            category: cur.uiCategory.val(),
            tags: tags.join(','),
            price: val('item_price'),
            photo: JSON.stringify(cur.itemPhoto),
            extraPhotos: Market.getUploadedPhotos().join(','),
            albums: cur.uiAlbums ? cur.uiAlbums.val() : 0,
            disabled: isChecked('item_disabled'),
            hash: cur.mkOptions.hash
        };
        if (cur.mkOptions.item_id) {
            params.id = cur.mkOptions.item_id;
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

        re(geByClass1('error', 'market_edit_item_box'));
        ajax.post('al_market.php?act=a_save_item', params, {
            onDone: function(text, albums) {
                curBox().hide();
                if (cur.mkOptions.item_id) {
                    var el = ge('market_item' + cur.mkOptions.item_id);
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
                        var block = geByClass1('market_album_size', 'market_album_block' + k);
                        if (block) {
                            block.innerHTML = v;
                        }
                    });
                }
                if (params.disabled && !params.id) {
                    nav.change({
                        section: 'disabled'
                    });
                } else if (params.disabled || cur.mSection == 'disabled' && !params.disabled) {
                    addClass('market_item' + params.id, 'market_row_disabled');
                }
            },
            onFail: function(text) {
                showMsg('market_edit_item_box', text, 'error', true);
                ge('box_layer_wrap').scrollTop = 0;
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    deleteItem: function(id, oid, hash) {
        var box = showFastBox({
            title: getLang('market_item_delete_confirm_title'),
            dark: 1
        }, getLang('market_item_delete_confirm'), getLang('global_delete'), function() {
            if (id !== undefined) {
                var params = {
                    oid: oid,
                    id: id,
                    hash: hash
                };
            } else {
                var params = {
                    oid: cur.mkOptions.oid,
                    id: cur.mkOptions.item_id,
                    hash: cur.mkOptions.hash
                };
            }
            ajax.post('al_market.php?act=a_delete_item', params, {
                onDone: function(text, albums) {
                    while (boxQueue.count()) boxQueue.hideLast(false, window.event);
                    if (window.WkView) {
                        WkView.hide()
                    }
                    re('market_item' + params.id);
                    if (cur.module == 'market' || cur.module == 'marketplace') {
                        cur.itemsCount--;
                        var count = '',
                            summary = '';
                        if (cur.itemsCount > 0) {
                            count = langNumeric(cur.itemsCount, '%s', true);
                            summary = getLang('market_summary_X_goods', cur.itemsCount, true);
                        } else {
                            summary = getLang('market_summary_no_goods');
                            geByClass1('market_empty', cur.notFound).innerHTML = cur.aid ? getLang('market_album_empty') : getLang('market_catalog_empty');
                            hide(cur.listEl);
                            show(cur.notFound);
                        }
                        var summaryEl = geByClass1('market_summary_text', 'market_list_wrap');
                        if (summaryEl) {
                            summaryEl.innerHTML = summary;
                        } else {
                            val('market_items_count', count);
                        }

                        if (albums) {
                            each(albums, function(k, v) {
                                var block = geByClass1('market_album_size', 'market_album_block' + k);
                                if (block) {
                                    block.innerHTML = v;
                                }
                            });
                        }
                        if (cur.module == 'marketplace') {
                            Marketplace.changeCounter(-1);
                        }
                    }
                    showDoneBox(text);
                },
                showProgress: box.showProgress,
                hideProgress: box.hideProgress
            });
            Market._reinitSorters(true);
        });
        return false;
    },

    deleteAlbum: function(aid, hash) {
        showFastBox({
            title: getLang('market_delete_album_title'),
            dark: 1
        }, getLang('market_delete_album_sure'), getLang('global_delete'), function() {
            ajax.post('/al_market.php?act=a_delete_album', {
                aid: aid,
                oid: cur.oid,
                hash: hash
            }, {
                onDone: function() {
                    var block = ge('market_album_block' + aid);
                    curBox().hide();
                    cur.albumsCount--;
                    if (cur.albumsSorter) {
                        qsorter.remove(ge('market_albums_cont'), block);
                    }
                    re(block);
                    var count = '';
                    if (cur.albumsCount > 0) {
                        count = langNumeric(cur.albumsCount, '%s', true);
                    } else {
                        hide('market_albums_wrap');
                        show('market_no_albums_wrap');
                    }
                    ge('market_albums_count').innerHTML = count;
                    if (cur.aid) {
                        nav.go('/market' + cur.oid);
                    }
                }
            });
        });
        return false;
    },
    editAlbum: function(aid) {
        showBox('al_market.php?act=edit_album_box', {
            oid: cur.oid,
            aid: aid
        }, {
            dark: 1
        });
        return false;
    },
    createAlbum: function() {
        showBox('al_market.php?act=edit_album_box', {
            oid: cur.oid
        }, {
            dark: 1
        });
        return false;
    },

    showItem: function(oid, id, e, from) {
        if (checkEvent(e)) return true;

        var _from = '';
        if (from) {
            _from = from;
        } else if (cur.module) {
            _from = cur.module;
        }
        showWiki({
            w: 'product' + oid + '_' + id + '/query',
            from: _from
        });
        return false;
    },
    showWriteMessage: function(e, id, item_id, hash) {
        stManager.add(['page.js', 'wide_dd.js']);
        cur.mbForceAttach = ['market', item_id, hash];
        var box = showBox('al_im.php', {
            act: 'a_write_box',
            to: id,
            hash: hash,
            from: 'market' + item_id
        }, {
            stat: ['writebox.js', 'writebox.css', 'wide_dd.css', 'page.css', jsc('web/emoji.js'), 'notifier.css'],
            cache: 1
        }, e);
        if (box) cancelEvent(e);
        return !box;
    },
    proxyUrl: function(e, ownerId, item_id, type, hash) {
        ajax.post('al_market.php', {
            act: 'a_proxy_url',
            owner_id: ownerId,
            hash: hash,
            item_id: item_id,
            type: type,
        });

        return true;
    },
    itemBoxinit: function() {
        if (cur.mkOptions.post) {
            var rf = ge('reply_field' + cur.mkOptions.post);
            if (rf) {
                data(rf, 'send', Market.sendComment);
                placeholderInit(rf, {
                    editable: 1
                });
            }
        }

        if (!cur.mkComments) cur.mkComments = {};
        var cms = ge('market_comments_wrap');
        if (cur.mkComments[cur.mkOptions.itemRaw]) {
            domPN(cms).replaceChild(cur.mkComments[cur.mkOptions.itemRaw], cms);
        }
        cur.mkYourComment = false;
        cur.editing = false;

        // Times update interval. For relative time correction
        cur.tsDiff = cur.walTpl && cur.walTpl.abs_timestamp ? Math.round((vkNow() / 1000 - cur.walTpl.abs_timestamp) / 900.0) * 900 : 0;
        cur.mkTimeUpdateInt = setInterval(function() {
            Wall.updateTimes('market_comments');
        }, 10000);
        cur.destroy.push(function() {
            clearInterval(cur.mkTimeUpdateInt);
        });

        /*    addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
            addEvent(window, 'resize', WkView.onResize);*/
        if (cur.mkOptions.photos && cur.mkOptions.photos.length > 1) {
            addEvent(domPN(ge('market_item_photo')), 'click', Market.switchPhoto.pbind(false));
        }
        if (cur.mkOptions.canEnlarge) {
            show('market_item_bigph');
        }
        for (var i = 1; i < cur.mkOptions.photos.length && i <= 5; i++) {
            vkImage().src = cur.mkOptions.photos[i].thumb_x;
        }

        wkcur._hide.push(function() {
            removeEvent(domPN(ge('market_item_photo')), 'click');
        });
        if (geByClass1('wall_post_more', 'market_item_description')) {
            setStyle('market_item_description', 'cursor', 'pointer');
        }
        if (cur.mkOptions.ddObjects && isArray(cur.mkOptions.ddObjects)) {
            cur.marketObjDD = new Dropdown(ge('market_shop_add_to_cart_obj'), cur.mkOptions.ddObjects, {
                big: 1,
                width: 270
            });
        }
        WkView.updateSize();
    },
    switchPhoto: function(num, force) {
        Market.outPhotoThumb();
        if (num === undefined || num === false) {
            num = cur.mkOptions.photoIndex + 1;
            if (num >= cur.mkOptions.photos.length) {
                num = 0;
            }
        } else if (!force) {
            cur.switchPhotoTO = setTimeout(Market.switchPhoto.pbind(num, true), 50);
            return;
        }
        if (num >= cur.mkOptions.photos.length) {
            return false;
        }
        cur.mkOptions.photoIndex = num;
        ge('market_item_photo').src = cur.mkOptions.photos[num].thumb_x;
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
        if (!cur.mkOptions.canEnlarge) return false;
        var ph = cur.mkOptions.photos[cur.mkOptions.photoIndex];
        removeClass('market_item_bigph', 'visible');
        showPhoto(ph.id, 'market' + cur.mkOptions.itemRaw, parseJSON(ph.view_opts), ev);
        return false;
    },
    checkDescriptionClick: function(el, event) {
        event = event || window.event;
        if (!el || !event) return true;
        var target = event.target || event.srcElement,
            i = 8,
            foundGood = false;
        do {
            if (!target ||
                target == el ||
                target.onclick ||
                target.onmousedown ||
                inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT'])
            ) {
                break;
            }
        } while (i-- && (target = target.parentNode));
        return target || true;
    },
    descriptionClick: function(el, event) {
        var clickEl = Market.checkDescriptionClick(el, event);
        if (!clickEl) return;
        var moreLink = geByClass1('wall_post_more', clickEl, 'a');
        if (moreLink && isVisible(moreLink)) {
            moreLink.onclick();
            return;
        }
    },
    toggleFavourite: function(ownerId, itemId, hash, el) {
        if (isButtonLocked(el)) return;
        var params = {
            act: 'a_set_favourite',
            owner_id: ownerId,
            item_id: itemId,
            hash: hash
        };
        ajax.post('/al_market.php', params, {
            onDone: function(success, text) {
                if (!success) return;

                toggleClass(el, 'selected');
                toggleClass('market_row_fav' + ownerId + '_' + itemId, 'selected');
                geByClass1('_btn_text', el).innerHTML = text;
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        });
    },
    reportFromDD: function(hash, reason) {
        var onDone = function(responseText) {
            var actions = document.querySelector('._like_market' + cur.mkOptions.itemOwnerId + '_' + cur.mkOptions.itemId);
            var reportButton = actions.querySelector('.ui_actions_menu');
            reportButton.innerHTML = '<a class="ui_actions_menu_item" tabIndex="0" role="link">' + responseText + '</a>'
        }

        stManager.add([jsc('web/reports.js'), 'reports.css'], function() {
            window.showReportReasonDescriptionPopup('market', cur.mkOptions.itemOwnerId, cur.mkOptions.itemId, parseInt(reason), hash, onDone);
        });
    },

    likeUpdate: function(my, count, title) {
        count = intval(count);

        var wrap = ge('market_like'),
            icon = domByClass(wrap, '_icon'),
            countNode = domByClass(wrap, '_count');
        if (!countNode) {
            return;
        }
        var tt = wrap.tt || {},
            opts = clone(tt.opts || {})
        countInput = domByClass(tt.container, '_value'),
            content = domByClass(tt.container, '_content'),
            titleNode = domByClass(tt.container, '_title');

        if (title && titleNode) {
            val(titleNode, title);
        }
        if (tt) {
            tt.likeInvalidated = true;
        }
        if (countInput) {
            countInput.value = count;
        }
        cur.mkOptions.likes = count;
        animateCount(countNode, count);

        cur.mkOptions.liked = my;
        toggleClass(wrap, 'my_like', my);
        toggleClass(wrap, 'no_likes', !count);
        toggleClass(content, 'me_hidden', !my);
        if (count) {
            if (tt.el && !isVisible(tt.container) && !title) {
                tooltips.show(tt.el, extend(opts, {
                    showdt: 0
                }));
            }
        } else {
            if (tt.el) tt.hide();
        }
    },
    like: function() {
        if (!vk.id) return;
        var my = !cur.mkOptions.liked;

        ajax.post('like.php', {
            act: 'a_do_' + (my ? '' : 'un') + 'like',
            object: cur.mkOptions.like_obj,
            hash: cur.mkOptions.likehash
        }, {
            onDone: function(count, title) {
                return Market.likeUpdate(my, count, title);
            }
        });
        Market.likeUpdate(my, cur.mkOptions.likes + (my ? 1 : -1));
    },
    likeShare: function(hash) {
        if (!vk.id) return;
        var el = ge('like_share_' + cur.mkOptions.like_obj),
            was = isChecked(el);
        checkbox(el);
        ajax.post('like.php', {
            act: 'a_do_' + (was ? 'un' : '') + 'publish',
            object: cur.mkOptions.like_obj,
            hash: hash
        }, {
            onDone: Market.likeUpdate.pbind(true)
        });

        var countInput = ge('like_real_count_' + cur.mkOptions.like_obj),
            count = countInput ? countInput.value : val('like_count' + cur.mkOptions.like_obj),
            my = hasClass(ge('like_icon' + cur.mkOptions.like_obj), 'my_like');
        Market.likeUpdate(true, intval(count) + (my ? 0 : 1));
    },
    likeShareCustom: function() {
        if (vk.id) {
            showBox('like.php', {
                act: 'publish_box',
                object: cur.mkOptions.like_obj,
                list: ''
            });
        }
    },
    likeOver: function(wrapEl) {
        var iconEl = domByClass(wrapEl, '_icon');
        if (!iconEl || cur.viewAsBox) return;

        var tt_offset = 41, // @likes-tt-corner-offset + 1
            wrap_left = getXY(wrapEl)[0],
            icon_left = getXY(iconEl)[0],
            icon_width = getSize(iconEl, true)[0],
            left_offset = icon_left + icon_width / 2 - wrap_left - tt_offset;

        showTooltip(wrapEl, {
            url: 'like.php',
            params: {
                act: 'a_get_stats',
                object: cur.mkOptions.like_obj
            },
            slide: 15,
            shift: [-left_offset, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            typeClass: 'like_tt',
            className: 'market_like_tt',
            dir: 'auto'
        });
    },
    likesShowList: function(el) {
        var wrapEl = domPN(el),
            iconEl = domByClass(wrapEl, '_icon'),
            curMarket = cur.mkOptions;

        if (!iconEl || cur.viewAsBox || !curMarket) return;

        showWiki({
            w: 'likes' + '\/' + clean(curMarket.like_obj)
        }, false, false, {
            queue: 1
        });
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
            setStyle(formWrap, {
                width: formSize[0],
                height: formSize[1],
                bottom: bottom
            });
            var bottom = Math.min(0, wndHeight - getXY('market_comments_wrap', true)[1] - formH);
            setStyle(replyForm, {
                bottom: bottom
            });
        } else {
            if (wkcur.fixedBottom || resize) {
                wkcur.fixedBottom = false;
                removeClass(replyForm, 'market_reply_form_fixed');
                setStyle(formWrap, {
                    width: '',
                    height: ''
                });
            }
        }
        if (resize && wkcur.fixedBottom) {
            setStyle(replyForm, {
                left: getXY(wkcur.wkContent)[0] + 'px'
            })
        }
    },
    commDone: function(node, text, del, script) {
        if (!node) return;
        var fChild = domFC(node),
            msg = domNS(fChild);
        if (!text) {
            show(fChild);
            hide(msg);
            if (cur.mkOptions && cur.mkOptions.commCount !== undefined) {
                ++cur.mkOptions.commCount;
                ++cur.mkOptions.commShown;
                Market.updateComms();
            }
            return;
        }
        if (msg) {
            msg.innerHTML = text;
            show(msg);
        } else {
            node.appendChild(ce('div', {
                innerHTML: text
            }));
        }
        hide(fChild);
        if (cur.mkOptions && cur.mkOptions.commCount !== undefined) {
            if (del) {
                --cur.mkOptions.commCount;
                --cur.mkOptions.commShown;
                Market.updateComms();
            } else {
                setTimeout(WkView.updateHeight, 2);
                if (!cur.mkComments) cur.mkComments = {};
                cur.mkComments[cur.mkOptions.itemRaw] = ge('market_comments_wrap');
            }
            if (script) {
                eval(script);
            }
        }
    },
    commAction: function(act, link, comm, hash) {
        var r = gpeByClass('reply', link);
        actionsWrap = gpeByClass('post_actions', link);
        if (hasClass(r, 'post_actions_progress')) return;
        ajax.post('al_market.php', {
            act: act + '_comment',
            comment: comm,
            hash: hash
        }, {
            onDone: Market.commDone.pbind(r),
            showProgress: addClass.pbind(actionsWrap, 'post_actions_progress'),
            hideProgress: removeClass.pbind(actionsWrap, 'post_actions_progress')
        });
    },
    comments: function(showcomm) {
        if (showcomm) {
            var frst = domFC(ge('market_comments')).id || '';
            if (!isVisible('market_comments_header') ||
                geByClass1('progress_inline', 'market_comments_header') ||
                WkView.cmp(frst, 'post' + showcomm) < 0
            ) {
                return;
            }
        }
        ajax.post('al_market.php', {
            act: 'a_get_comments',
            offset: cur.mkOptions.commShown,
            item: cur.mkOptions.itemRaw
        }, {
            onDone: function(text, names) {
                Market.receiveComms(text, names, false, showcomm);
                if (showcomm && ge('post' + showcomm)) {
                    Wall.scrollHighlightReply('post' + showcomm);
                }
            },
            showProgress: function() {
                ge('market_comments_header').innerHTML = '';
                showProgress('market_comments_header');
            },
            hideProgress: function() {
                ge('market_comments_header').innerHTML = '';
            }
        });
    },
    updateComms: function() {
        setTimeout(WkView.updateHeight, 2);
        var commshown = '';
        if (cur.mkOptions.commCount > cur.mkOptions.commShown) {
            commshown = cur.mkOptions.commCount - cur.mkOptions.commShown;
        }

        ge('market_comments_summary').innerHTML = getLang('market_view_comments_summary', cur.mkOptions.commCount);
        ge('market_comments_header').innerHTML = getLang('market_show_previous_comments', commshown);
        show('market_comments_wrap');
        toggleClass('market_comments_wrap', 'market_comments_expanded', !commshown);

        WkView.updateSize();

        if (!cur.mkComments) cur.mkComments = {};
        cur.mkComments[cur.mkOptions.itemRaw] = ge('market_comments_wrap');
    },
    receiveComms: function(text, names, noOld, toUp) {
        var n = ce('div', {
                innerHTML: text
            }),
            comms = ge('market_comments'),
            last = current = domLC(comms),
            frm = getXY(current, true)[1];
        for (var el = domLC(n); el; el = domLC(n)) {
            if (ge('market_reply_form')) addClass(el, 'reply_replieable');
            while (current && WkView.cmp(current.id, el.id) > 0) {
                current = domPS(current);
            }
            if (current && !WkView.cmp(current.id, el.id)) {
                comms.replaceChild(el, current);
                current = el;
            } else {
                if (current && domNS(current)) {
                    comms.insertBefore(el, domNS(current));
                    ++cur.mkOptions.commCount;
                } else if (!current && domFC(comms)) {
                    if (noOld === true) {
                        --cur.mkOptions.commShown;
                        n.removeChild(el);
                    } else {
                        comms.insertBefore(el, domFC(comms));
                    }
                } else {
                    comms.appendChild(el);
                }
                ++cur.mkOptions.commShown;
            }
        }
        if (toUp && last) {
            wkLayerWrap.scrollTop += getXY(last, true)[1] - frm;
        }
        extend(cur.mkOptions.reply_names, names);
        window.updateWndVScroll && updateWndVScroll();
        Market.updateComms();
    },
    commSaved: function(post) {
        var comms = ge('market_comments_wrap'),
            vd = comms ? cur.mkOptions.itemRaw : false,
            comm = post.match(/^(-?\d+)market(_\d+)/);
        if (!vd || !comm || !ge('market_comment' + comm[1] + comm[2])) return;
        if (!cur.mkComments) cur.mkComments = {};
        cur.mkComments[cur.mkOptions.itemRaw] = comms;
    },
    sendComment: function(post, ev, options) {
        var fld = ge('reply_field' + post),
            btn = ge('reply_button' + post),
            row = ge('feedback_row' + post),
            replyToName = (cur.mkOptions.reply_names[(cur.reply_to || {})[0]] || [])[1],
            composer = fld && data(fld, 'composer'),
            state;

        if (options.stickerId) {
            var params = {
                message: '',
                attach1_type: 'sticker',
                attach1: options.stickerId,
                sticker_referrer: options.sticker_referrer,
            };
        } else {
            var params = composer ? Composer.getSendParams(composer, Market.sendComment.pbind(post)) : {
                message: trim(Emoji.editableVal(fld))
            };
            if (params.delayed) return;

            if (!params.attach1_type && (!params.message || replyToName && !replyToName.indexOf(params.message))) {
                Emoji.editableFocus(fld, false, true);
                return;
            }
        }

        hide('reply_warn' + post);
        ajax.post('al_market.php', Wall.fixPostParams(extend(params, {
            act: 'post_comment',
            item: cur.mkOptions.itemRaw,
            hash: cur.mkOptions.hash,
            from_group: (domData(domClosest('_submit_post_box', ge('market_reply_as_group')), 'from-oid')) < 0 ? 1 : '',
            reply_to: (cur.reply_to || {})[1]
        })), {
            onDone: function(text, names) {
                ++cur.mkOptions.commCount;
                Market.receiveComms(text, names, true);
                wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
                if (composer) {
                    Composer.reset(composer);
                } else {
                    Emoji.val(fld, '');
                }
                if (fld.autosize) {
                    fld.autosize.update();
                }
                if (browser.mobile) {
                    Wall.hideEditReply(post);
                } else {
                    Emoji.editableFocus(fld, false, true);
                    Wall.cancelReplyTo(post, ev);
                }
                re('reply_link' + post);
            },
            onFail: function(text) {
                if (fld) {
                    showTooltip(fld, {
                        text: text,
                        showdt: 200,
                        forcetodown: 0,
                        slide: 15
                    });
                    Emoji.editableFocus(fld, false, true);
                    return true;
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    reportComment: function(obj, ev, commentRaw) {
        stManager.add(['privacy.js', 'privacy.css'], function() {
            return Privacy.show(obj, ev, 'report_' + commentRaw);
        });
    },

    _onEdit: function() {
        if (window.WkView) {
            WkView.hide()
        }
        if (cur.mkOptions.oid > 0) {
            MarketEditItemBox.show(cur.mkOptions.itemId, cur.mkOptions.itemOwnerId);
        } else {
            Market.showEditBox(cur.mkOptions.itemId, cur.mkOptions.itemOwnerId);
        }

    },
    _onDelete: function() {
        Market.deleteItem(cur.mkOptions.itemId, cur.mkOptions.itemOwnerId, cur.mkOptions.editHash);
    },
    _onRestoreInCatalog: function() {
        Marketplace.updateCatalogByItem(cur.mkOptions.itemId, cur.mkOptions.itemOwnerId, cur.mkOptions.editHash, this, 'restore');
    },
    _onRemoveFromCatalog: function() {
        Marketplace.updateCatalogByItem(cur.mkOptions.itemId, cur.mkOptions.itemOwnerId, cur.mkOptions.editHash, this, 'remove');
    },
    sendScores: function(oid) {
        cur.marketSendScoresBox = showBox('market?act=send_scores_box', {
            owner_id: oid
        }, {
            onDone: function() {
                cur.marketSendScoresBox.removeButtons();
                cur.marketSendScoresBox.addButton(getLang('market_send_scores'), Market.doSendScores);
            }
        });
    },
    doSendScores: function() {
        var p = extend({}, cur.marketSendScoresData, {
                v: trim(val('market_send_scores_value')),
                to_id: cur.marketSendScoresToDD.val(),
                note: trim(val('market_send_scores_note'))
            }),
            fail = false;
        if (!p.v) {
            notaBene('market_send_scores_value');
            fail = true;
        }
        if (!p.to_id) {
            notaBene(cur.marketSendScoresToDD.container);
            fail = true;
        }
        if (fail) {
            return;
        }
        ajax.post('market?act=a_send_scores', p, {
            progress: cur.marketSendScoresBox.progress,
            onDone: function(balance, msg, rows, trRowId) {
                cur.marketSendScoresBox.hide();
                showDoneBox(msg);
                val('market_balance_page_value', balance);
                val('market_balance_page_rows', rows);
                notaBene(ge(trRowId), 'notice');
            }
        });
    },
    cancelOrder: function(btn, owner_id, order_id, hash) {
        cur.marketCancelConfirm = showFastBox(getLang('global_warning'), getLang('market_sure_cancel_order'), getLang('market_cancel_order'),
            function() {
                ajax.post('market?act=a_cancel_order', {
                    owner_id: owner_id,
                    order_id: order_id,
                    hash: hash
                }, {
                    progress: cur.marketCancelConfirm.progress,
                    onDone: function(msg, html) {
                        cur.marketCancelConfirm.hide();
                        showDoneBox(msg);
                        Market.updateView(html);
                    }
                });
            }, getLang('global_no'));
    },
    updateView: function(html) {
        var el = se(html);
        if (ge(el.id)) {
            domReplaceEl(ge(el.id), el);
        }
    },
    openMarketAppPage: function(page) {
        return showWiki({
            w: page
        });
    }
};

var MarketCart = {
    add: function(btn, oid, itemId, objId, hash) {
        if (buttonLocked(btn)) {
            return;
        }
        if (!objId) {
            if (cur.marketObjDD) {
                var fullVal = cur.marketObjDD.val_full();
                objId = fullVal[0];
                if (objId == 0 || !fullVal[2]) {
                    return notaBene(cur.marketObjDD.container);
                }
            } else {
                return;
            }
        }
        ajax.post('market?act=a_modify_count', {
            owner_id: oid,
            item_id: itemId,
            obj_id: objId,
            hash: hash,
            value: 1,
            delta: 1
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(done, objCnt, itemCnt, price, sum, total, hash, cartCount, cartPrice) {
                if (done) {
                    val(btn, itemCnt ? getLang('market_item_X_added_to_cart', itemCnt) : getLang('market_item_add_to_cart'));
                    if (itemCnt) {
                        show('market_goto_cart');
                        notaBene('market_goto_cart', '#FFFFA0');
                    }
                    MarketCart._updateItemCount(itemId, itemCnt);
                    MarketCart._updateInfo(cartCount, cartPrice);
                }
            }
        });
    },
    setCount: function(inp, oid, itemId, objId) {
        var tr = ge('market_cart_row' + itemId + '_' + objId),
            v = trim(val(inp)),
            hash = attr(inp, 'modify-hash');
        if (!tr || hasClass(tr, 'processing')) {
            return;
        }
        if (!v.match(/^\d+$/)) {
            return notaBene(inp);
        }
        ajax.post('market?act=a_modify_count', {
            owner_id: oid,
            item_id: itemId,
            obj_id: objId,
            value: v,
            hash: hash
        }, {
            showProgress: function() {
                addClass(tr, 'processing');
                inp.readOnly = true;
            },
            hideProgress: function() {
                removeClass(tr, 'processing');
                inp.readOnly = false;
            },
            onDone: function(done, objCnt, itemCnt, price, sum, total, hash, cartCount, cartPrice, balance) {
                if (done) {
                    val(geByClass1('_price', tr), price);
                    val(geByClass1('_sum', tr), sum);
                    val('market_cart_rows_total', total);
                    cur.marketOrderData.hash = hash;
                    MarketCart._updateItemCount(itemId, itemCnt);
                    MarketCart._updateInfo(cartCount, cartPrice);
                }
            }
        });
    },
    clear: function(btn, oid, hash) {
        if (buttonLocked(btn)) {
            return;
        }
        ajax.post('market?act=a_clear_cart', {
            owner_id: oid,
            hash: hash
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html) {
                val('market_cart_wrap', html);
                scrollToY(0);
            }
        });
    },
    _updateItemCount: function(itemId, count) {
        var itemBlock = ge('market_item' + itemId),
            cartBlock = itemBlock ? geByClass1('_in_cart', itemBlock) : null,
            countBlock = cartBlock ? geByClass1('_count', cartBlock) : null;
        if (!cartBlock || !countBlock) {
            return;
        }
        toggleClass(itemBlock, 'market_row_in_cart', count > 0);
        val(countBlock, count);
        toggle(cartBlock, count > 0);
        var modBtn = geByClass1('_minus', itemBlock);
        if (modBtn) {
            toggleClass(modBtn, 'market_shop_item_action_disabled', count == 0);
        }
    },
    removeItem: function(oid, itemId, hash) {
        MarketCart._updateItemCount(itemId, 0);
        ajax.post('market?act=a_remove_item_cart', {
            owner_id: oid,
            item_id: itemId,
            hash: hash
        }, {
            onDone: MarketCart._updateInfo
        });
    },
    changeItemCount: function(btn, oid, itemId, hash, delta) {
        ajax.post('market?act=a_modify_count', {
            owner_id: oid,
            item_id: itemId,
            hash: hash,
            value: delta,
            delta: 1
        }, {
            showProgress: addClass.pbind(btn, 'market_shop_item_processing'),
            hideProgress: removeClass.pbind(btn, 'market_shop_item_processing'),
            onDone: function(done, objCnt, itemCnt, price, sum, total, hash, cartCount, cartPrice) {
                if (done) {
                    MarketCart._updateItemCount(itemId, itemCnt);
                    MarketCart._updateInfo(cartCount, cartPrice);
                }
            }
        });
    },
    addItem: function(oid, itemId, hash) {
        MarketCart._updateItemCount(itemId, 0);
        ajax.post('market?act=a_add_item_cart', {
            owner_id: oid,
            item_id: itemId,
            hash: hash
        }, {
            onDone: function(itemCount, cartCount, cartPrice) {
                Market._updateItemCount(itemId, itemCount);
                Market._updateInfo(cartCount, cartPrice);
            }
        });
    },
    _updateInfo: function(count, price) {
        var el = ge('market_shop_cart_info'),
            filtersEl = ge('market_search_filters_btn');
        if (!el || !filtersEl) {
            return;
        }
        toggle(el, count > 0);
        if (count > 0) {
            var str = getLang('market_shop_cart_info');
            val(el, str.replace('{count}', getLang('market_summary_X_goods', count)).replace('{price}', getLang('market_currency_amount_SCO', price)));
        }
    },
    order: function() {
        var p = extend({}, cur.marketOrderData, {
                contact_phone: trim(val('market_cart_contact_phone')),
                delivery_id: cur.marketCartDeliveryDD.val(),
                details: trim(val('market_cart_delivery_details')),
                uid: cur.marketCartBuyerDD ? cur.marketCartBuyerDD.val() : null
            }),
            fail = false,
            btn = ge('market_shop_create_order'),
            clBtn = ge('market_shop_clear_cart');
        if (buttonLocked(btn)) {
            return;
        }
        lockButton(btn);
        if (p.delivery_id == 0) {
            notaBene(cur.marketCartDeliveryDD.container);
            fail = true;
        }
        if (p.contact_phone.length < 4) {
            notaBene('market_cart_contact_phone');
            fail = true;
        }
        if (isVisible('market_cart_delivery_address_block')) {
            p['delivery_address'] = trim(val('market_cart_delivery_address'));
            p['delivery_person'] = trim(val('market_cart_delivery_person'));
            if (p['delivery_person'].length < 4) {
                notaBene('market_cart_delivery_person');
                fail = true;
            }
            if (p['delivery_address'].length < 4) {
                notaBene('market_cart_delivery_address');
                fail = true;
            }
        }
        if (isVisible('market_cart_delivery_need_to_meet')) {
            p['need_to_meet'] = isChecked('market_cart_delivery_need_to_meet') ? 1 : 0;
        }
        if (fail) {
            unlockButton(btn);
            return;
        }
        ajax.post('market?act=a_create_order', p, {
            showProgress: function() {
                hide(clBtn);
            },
            hideProgress: function() {
                show(clBtn);
                unlockButton(btn);
            },
            onDone: function(code, data) {
                if (code == 0) {
                    var table = se(data.table);
                    scrollToY(ge(table.id), 400);
                    setTimeout(domReplaceEl.pbind(ge(table.id), table), 450);
                    cur.marketOrderData.hash = data.hash;
                    notaBene(table, 'notice');
                }
            }
        });
    },
    deliveryChanged: function(v) {
        var descr = '',
            addrRequired = false,
            needToMeetRequired = false;
        if (v != 0 && cur.marketCartDeliveriesData[v]) {
            descr = cur.marketCartDeliveriesData[v]['descr'];
            addrRequired = cur.marketCartDeliveriesData[v]['address_required'];
            needToMeetRequired = cur.marketCartDeliveriesData[v]['need_to_meet'];
        }
        val('market_cart_delivery_note', descr);
        toggle('market_cart_delivery_need_to_meet', needToMeetRequired);
        toggle('market_cart_delivery_address_block', addrRequired);
    },
    buyerChanged: function(uid) {
        uid = intval(uid);
        if (uid <= 0) {
            return;
        }
        ajax.post('market?act=a_load_delivery_data', {
            owner_id: cur.marketOrderData.owner_id,
            uid: uid
        }, {
            onDone: function(details) {
                var deliveryId = intval(details['delivery_id']);
                if (!cur.marketCartDeliveriesData[deliveryId]) {
                    deliveryId = 0;
                }
                cur.marketCartDeliveryDD.val(deliveryId, true);
                val('market_cart_delivery_address', details['delivery_address']);
                val('market_cart_delivery_person', details['delivery_person']);
                val('market_cart_contact_phone', details['contact_phone']);
                checkbox('market_cart_delivery_need_to_meet', details['need_to_meet']);
            }
        });
    }
};

var MarketEditItemBox = {
    show: function(id, oid, ev, from_attach) {
        if (!oid) oid = cur.oid;
        var params = {
            act: 'a_edit_item_box',
            id: id,
            oid: oid,
            aid: cur.aid
        };
        if (from_attach) {
            params.from_attach = true;
        }
        showBox('al_market.php', params, {
            dark: 1
        });
        return ev && cancelEvent(ev);
    },
    initBox: function(options, box) {
        cur.mkOptions = extend(cur.mkOptions || {}, options);
        box.setOptions({
            width: 600
        });
        box.changed = true;
        autosizeSetup('item_description', {
            minHeight: 80,
            maxHeight: 250
        });
        MarketEditItemBox.init.category(cur.mkOptions);
        MarketEditItemBox.init.address(options.marketAddress);
        MarketEditItemBox.init.albums(options);
        MarketEditItemBox.init.price();
        MarketEditItemBox.init.upload(cur.mkOptions);
    },
    init: {
        price: function() {
            var elem = ge('item_price');
            addEvent(elem, 'keydown keyup keypress change paste cut drop input blur', function(event) {
                var v = elem.value.replace(/[^0-9\.]/g, '');
                if (elem.value != v) {
                    val(elem, v);
                }
                return true;
            });
            cur.destroy.push(function(elem) {
                cleanElems(elem);
            }.pbind(elem));
        },
        category: function(mkOptions) {
            var categories = mkOptions.categories;
            var category = mkOptions.category;
            var subcategories = mkOptions.subcategories;
            var subcategory = mkOptions.subcategory;
            var uiCategory = new Dropdown(ge('item_category'), categories, {
                big: 1,
                multiselect: false,
                autocomplete: true,
                noResult: '',
                introText: getLang('market_start_typing_category'),
                placeholder: getLang('market_choose_category'),
                onChange: function(val) {
                    if (mkOptions.withSubcategories) {
                        var selectetedSubcategories = {};
                        if (mkOptions.subcategories[10000 + Number(val)] != undefined) {
                            selectetedSubcategories = mkOptions.subcategories[10000 + Number(val)];
                        }
                        if (isEmpty(selectetedSubcategories)) {
                            hide(ge('item_subcategory_wrap'));
                        } else {
                            MarketEditItemBox.uiSubCategory.setOptions({
                                defaultItems: selectetedSubcategories
                            });
                            show(ge('item_subcategory_wrap'));

                        }
                    }
                }
            });
            if (category) {
                uiCategory.val(category);
            }
            MarketEditItemBox.uiCategory = uiCategory;
            if (mkOptions.withSubcategories) {
                var selectetedSubcategories = {};
                if (category) {
                    if (mkOptions.subcategories[10000 + Number(category)] != undefined) {
                        selectetedSubcategories = mkOptions.subcategories[10000 + category];
                    }
                }
                var uiSubCategory = new Dropdown(ge('item_subcategory'), selectetedSubcategories, {
                    big: 1,
                    multiselect: false,
                    autocomplete: true,
                    noResult: '',
                    introText: getLang('market_start_typing_category'),
                    placeholder: getLang('market_menu_subcategory_choose')
                });
                if (isEmpty(selectetedSubcategories)) {
                    hide(ge('item_subcategory_wrap'));
                }
                if (subcategory) {
                    uiSubCategory.val(subcategory);
                }
                MarketEditItemBox.uiSubCategory = uiSubCategory;
            }

        },
        address: function(marketAddress) {
            if (!marketAddress) {
                return;
            }
            var uiMarketCity = new CitySelect(ge('group_market_city'), ge('group_market_city_wrap'), {
                big: 1,
                placeholder: getLang('groups_market_select_city'),
                city: marketAddress.city,
                country: marketAddress.country,
                onChange: function() {
                    MarketEditItemBox.uiMetro.val('', true);
                    if (marketAddress.citiesWithMetro.indexOf(this.city) != -1) {
                        var params = {
                            act: 'a_select_metro',
                            city_id: this.city
                        };
                        ajax.post('al_market.php', params, {
                            onDone: function(metros) {
                                MarketEditItemBox.uiMetro.setOptions({
                                    defaultItems: metros
                                });
                                MarketEditItemBox.uiMetro.clear();
                                MarketEditItemBox.uiMetro.indexer.setData(metros);
                            }
                        });
                        show(ge('group_market_metro_div'));
                    } else {
                        hide(ge('group_market_metro_div'));
                    }
                }
            });
            var uiMarketCountry = new CountrySelect(ge('group_market_country'), ge('group_market_country_wrap'), {
                big: 1,
                placeholder: getLang('groups_market_select_country'),
                noDefaultCountry: true,
                country: marketAddress.country,
                citySelect: uiMarketCity,
                onChange: function(val) {
                    var currencyStr = cur.mkOptions.countriesCurrency[val] == undefined ? 'RUB' : cur.mkOptions.countriesCurrency[val];
                    if (indexOf(cur.mkOptions.availableCurrencies, currencyStr) == -1) {
                        currencyStr = 'RUB';
                    }
                    ge('item_currency').innerHTML = getLang('market_tiny_' + currencyStr);
                }
            });

            var metroOptions = {
                big: 1,
                multiselect: false,
                autocomplete: true,
                placeholder: getLang('groups_market_select_metro'),
            };
            if (marketAddress.metroSelect) {
                metroOptions.selectedItems = marketAddress.metroSelect;
            }
            var uiMarketMetro = Dropdown(ge('group_market_metro'), marketAddress.metros, metroOptions);
            if (marketAddress.marketMetros) {
                show(ge('group_market_metro_wrap'));
            }
            MarketEditItemBox.uiCity = uiMarketCity;
            MarketEditItemBox.uiCountry = uiMarketCountry;
            MarketEditItemBox.uiMetro = uiMarketMetro;
        },
        albums: function(options) {
            if (!isVisible('market_ei_album_wrap')) {
                return;
            }
            MarketEditItemBox.uiAlbums = new Dropdown(ge('item_album'), options.albumsList, {
                big: 1,
                maxItems: 10,
                multiselect: true,
                autocomplete: true,
                placeholder: getLang('market_select_album'),
                noResult: getLang('market_album_nothing_found'),
                selectedItems: options.albums
            });
        },
        upload: function(options) {

            cur.uploadId = MarketEditItemBox.upload.uploadInit('market_ei_main_photo_upload', options.mainPhoto, true);
            cur.extraUploadId = MarketEditItemBox.upload.uploadInit('market_ei_photo_upload', options.extraPhoto);
            cur.itemPhotos = [];
            cur.itemPhoto = {};
            if (cur.mkOptions.photos) {
                for (var i = 0; i < cur.mkOptions.photos.length; i++) {
                    var photo = cur.mkOptions.photos[i];
                    MarketEditItemBox.upload.choosePhoto(i, photo.media, photo.options);
                }
                if (cur.itemPhotos.length > 1) {
                    var cont = ge('market_ei_photos');
                    if (cont.usorter) {
                        cont.usorter.destroy();
                    }
                    stManager.add(['usorter.js'], function() {
                        usorter.init(cont, {
                            clsUp: 'market_ei_preview_up'
                        });
                    });
                }
            }
        }
    },
    upload: {
        // upload
        uploadInit: function(cont, opts, isMain) {
            cur.lang = extend(cur.lang || {}, opts.lang);

            var options = {
                file_name: 'photo',
                file_size_limit: 1024 * 1024 * 25, // 25Mb
                file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
                file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP',
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
                    max_files_hide_last: true,
                    max_files_warning: getLang('market_attach_max_n_files'),
                    noCheck: true,
                    dropbox: 'market_ei_photos_dropbox',
                });
            } else {
                options = extend(options, {
                    check_url: opts.check_url
                });
            }

            return Upload.init(cont, opts.url, cur.mkOptions.photoVars, extend(options, {
                onUploadStart: function(i, res) {
                    curBox().changed = true;
                    if (Upload.types[i] == 'form') {
                        show(box.progress);
                    }
                    re(geByClass1('error', opts.errorObj));
                },

                onCheckComplete: function(i) {
                    if (i == cur.uploadId && cur.extraUploadId && Upload.uploadUrls[cur.extraUploadId]) { // main photo
                        Upload.uploadUrls[cur.extraUploadId] = Upload.uploadUrls[cur.uploadId];
                    }
                    Upload.embed(i);
                },

                onUploadComplete: function(info, res, errorAdd) {
                    var obj = parseJSON(res) || {
                        error: 'ERR_CLIENT_BAD_RESPONSE: bad request response'
                    };
                    if (obj.error || !obj.photos) {
                        MarketEditItemBox.upload.uploadFail(isMain, info, obj.error + (errorAdd || ''));
                        return;
                    }
                    var i = info.ind !== undefined ? info.ind : info;

                    if (isMain) {
                        var url = Upload.options[cur.uploadId].base_url + 'upload.php?act=market_photo_crop&_query=' + encodeURIComponent(res) + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost);
                        MarketEditItemBox.upload.cropPhoto(obj.photos[0], url);
                        Upload.embed(i);
                    } else {
                        var fileName = (info.fileName || info).replace(/[&<>"']/g, ''),
                            ind = info.fileName ? i + '_' + info.fileName : info,
                            prg = ge('upload' + ind + '_progress_wrap');

                        prg && hide(geByClass1('market_prg_x', prg));
                        obj.photos = JSON.stringify(obj.photos);

                        ajax.post('al_photos.php', extend({
                            act: 'choose_uploaded'
                        }, obj), {
                            onDone: function(media, data) {
                                MarketEditItemBox.upload.choosePhoto(info, media, extend(data, {
                                    upload_ind: i + '_' + fileName
                                }));
                            },
                            onFail: MarketEditItemBox.upload.uploadFail.pbind(isMain, info)
                        });
                    }
                },

                onUploadProgress: function(info, bytesLoaded, bytesTotal) {
                    var i = info.ind !== undefined ? info.ind : info;
                    if (isMain) {
                        var progressBar = getProgressBarEl(ge('form' + i + '_progress'));
                        if (!progressBar) {
                            var obj = Upload.obj[i],
                                objHeight = getSize(obj)[1],
                                tm = objHeight / 2 + 10;
                            var node = obj.firstChild;
                            while (node) {
                                if (node.nodeType == 1) {
                                    if (node.id == 'uploader' + i && browser.msie) {
                                        setStyle(node, {
                                            position: 'relative',
                                            left: '-5000px'
                                        });
                                    } else {
                                        setStyle(node, {
                                            visibility: 'hidden'
                                        });
                                    }
                                }
                                node = node.nextSibling;
                            }
                            obj.appendChild(ce('div', {
                                className: 'market_upload_progress_wrap',
                                innerHTML: '<div id="form' + i + '_progress" class="ui_progress">\
                <div class="ui_progress_back"></div>\
                <div class="ui_progress_bar"></div>\
              </div>'
                            }, {
                                height: tm + 'px',
                                marginTop: -tm + 'px'
                            }));
                            progressBar = getProgressBarEl(ge('form' + i + '_progress'));
                        }
                        var percent = intval(bytesLoaded / bytesTotal * 100);
                        setStyle(progressBar, {
                            width: percent + '%'
                        });
                    } else {
                        if (Upload.types[i] == 'fileApi') {
                            var data = {
                                loaded: bytesLoaded,
                                total: bytesTotal
                            };
                            if (info.fileName) {
                                data.fileName = info.fileName.replace(/[&<>"']/g, '');
                            }
                        }
                        MarketEditItemBox.upload.showUploadPhotoProgress(i, data);
                    }
                },
                onUploadError: function(info, err) {
                    MarketEditItemBox.upload.uploadFail(isMain, info, err);
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
            var e = err.match(/^(ERR_[A-Z0-9_]+)/),
                code = e[1],
                msg;
            switch (code) {
                case 'ERR_UPLOAD_FILE_NOT_SUPPORTED':
                    msg = getLang('profile_oph_err_format');
                    break;
                case 'ERR_UPLOAD_FILE_NOT_UPLOADED':
                    msg = getLang('profile_oph_err_upload').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                    break;
                case 'ERR_UPLOAD_BAD_IMAGE_SIZE':
                    msg = getLang('profile_oph_err_size').replace('{min}', '400').replace('{max}', '7<span class="num_delim"> </span>000');
                    break;
                case 'ERR_UPLOAD_TERMINATED':
                    return;
                default:
                    msg = getLang('groups_market_photo_error').replace('{link}', '<a href="/support?act=new&from=ph">').replace('{/link}', '</a>');
                    break;
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
                MarketEditItemBox.upload.unchoosePhoto(i);
            }
            Upload.embed(i);
            showMsg(options.errorObj, msg, 'error', true);
            return true;
        },
        choosePhoto: function(info, media, data) {
            var i = info.ind !== undefined ? info.ind : info,
                cont = ge('market_ei_photos');
            if (!isObject(data) && data != undefined) {
                data = {
                    thumb_m: data[0] || '',
                    thumb_s: data[1] || '',
                    list: data[2] || '',
                    view_opts: data[3] || '',
                    upload_ind: data.upload_ind || undefined
                };
            }
            if (data == undefined) {
                return;
            }

            var fileName = info.fileName || info.name || '',
                prg_ind = fileName ? i + '_' + fileName : i;
            re('upload' + prg_ind + '_progress_wrap');

            if (MarketEditItemBox.upload.uploadedPhotosCount() >= Upload.options[cur.extraUploadId].max_files) {
                return;
            }
            vkImage().src = data.thumb_m;

            if (!isArray(cur.itemPhotos)) {
                cur.itemPhotos = [];
            }
            var ind = cur.itemPhotos.length;
            cur.itemPhotos.push(media);

            var preview = '<div class="market_ei_photo"><img class="market_ei_img" src="' + data.thumb_m + '" />';
            var mediaHtml = '<div class="_ei_photo market_ei_photo_wrap market_ei_photo%ind% inl_bl" id="market_ei_photo%ind%">' + preview + '<div nosorthandle="1" class="ui_thumb_x_button ui_thumb_small_x" data-title="' + getLang('dont_attach') + '" onmouseover="showTitle(this)" onclick="MarketEditItemBox.upload.unchoosePhoto(%ind%); return cancelEvent(event);"><div class="ui_thumb_x" nosorthandle="1"></div></div></div></div>',
                mediaEl = se(rs(mediaHtml, {
                    ind: ind
                }));
            cont.insertBefore(mediaEl, ge('market_ei_photo_add'));

            if (fileName) {
                if ((!browser.msie || browser.version > 8) && cur.itemPhotos.length > 1) {
                    stManager.add(['usorter.js'], function() {
                        if (cont.usorter) {
                            usorter.added(cont);
                        } else if (cur.itemPhotos.length > 1) {
                            usorter.init(cont, {
                                clsUp: 'market_ei_preview_up'
                            });
                        }
                    });
                } else if (cont.usorter) {
                    cont.usorter.destroy();
                }
            }
            toggle('market_ei_photo_add', MarketEditItemBox.upload.uploadedPhotosCount() < Upload.options[cur.extraUploadId].max_files);
        },
        unchoosePhoto: function(ind) {
            if (window.tooltips) {
                tooltips.hide(geByClass1('ui_thumb_x_button', 'market_ei_photo' + ind));
            }
            re('market_ei_photo' + ind);
            toggle('market_ei_photo_add', MarketEditItemBox.upload.uploadedPhotosCount() < Upload.options[cur.extraUploadId].max_files);

            var cont = ge('market_ei_photos');
            if (cont.usorter) {
                cont.usorter.destroy();
                cont.usorter = false;
            }
            if (cur.itemPhotos.length > 1) {
                stManager.add(['usorter.js'], function() {
                    usorter.init(cont, {
                        clsUp: 'market_ei_preview_up'
                    });
                });
            }
        },
        uploadedPhotosCount: function() {
            var previewEl = ge('market_ei_photos'),
                progressNode = ge('market_ei_photos_progress');
            return geByClass('_ei_photo', previewEl).length + progressNode.childNodes.length;
        },
        getUploadedPhotos: function() {
            if (!cur.itemPhotos) return [];

            var res = [],
                m;
            each(geByClass('_ei_photo', 'market_ei_photos'), function(k, v) {
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

            var progressBar = getProgressBarEl(ge('upload' + ind + '_progress_wrap'));
            if (!progressBar) {
                var progress = '\
  <div class="ui_progress">\
    <div class="ui_progress_back"></div>\
    <div class="ui_progress_bar" style="width: ' + percent + '%;"></div>\
  </div></div>';
                var progressEl = ce('div', {
                    id: 'upload' + ind + '_progress_wrap',
                    innerHTML: '<div class="market_prg_wrap">' + progress + '</div>' + (label ? '<div class="market_prg_label">' + label + '</div>' : '') + '<div class="market_prg_x" data-title="' + getLang('dont_attach') + '" onmouseover="showTitle(this)" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\'); if (window.tooltips) tooltips.hide(this);"></div>',
                    className: 'clear_fix'
                }, {
                    marginTop: '6px'
                });
                prgNode.appendChild(progressEl);
                progressBar = getProgressBarEl(ge('upload' + ind + '_progress_wrap'));
                show(prgNode);
                toggle('market_ei_photo_add', MarketEditItemBox.upload.uploadedPhotosCount() < Upload.options[i].max_files);
            }
            if (!percent) {
                //hide('upload' + ind + '_progress');
            } else {
                setStyle(progressBar, {
                    width: percent + '%'
                });
                show('upload' + ind + '_progress');
            }
            return false;
        },

        cropPhoto: function(photo, uploadUrl) {
            if (!photo || !photo.sizes) {
                MarketEditItemBox.upload.uploadFail(true);
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
                MarketEditItemBox.upload.uploadFail(true);
                return;
            }

            var thumb = Upload.options[cur.extraUploadId].static_url + 'v' + src[1] + '/' + src[2] + '/' + src[3] + '.jpg',
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
                };
                cur.destroy.push(function() {
                    cur.photoTaggerDestroy();
                });
            }

            var html = ge('market_photo_crop').innerHTML.replace(new RegExp('_tmpl', 'g'), '');
            box = showFastBox({
                    title: getLang('market_photo_crop_title'),
                    hideButtons: true,
                    grey: true,
                    width: 644,
                    bodyStyle: 'padding:20px;border:0px',
                    onClean: cur.photoTaggerDestroy
                },
                html);
            val('market_photo_crop_thumb', '<div style="' + st + 'margin: 0px auto;"><img id="market_photo_crop_img" src="' + thumb + '" style="' + st + '" onload="stManager.add([\'tagger.css\', \'tagger.js\'], MarketEditItemBox.upload.cropInit);" /></div>');
        },
        cropInit: function() {
            var opts = cur.photoCropOpts,
                size = opts.size,
                tsize = opts.thumbSize,
                minSize = [
                    Math.max(100, Math.ceil(400 * tsize[0] / size[0])),
                    Math.max(100, Math.ceil(400 * tsize[1] / size[1]))
                ],
                rect;
            if (opts.rect) {
                rect = {
                    left: Math.floor(opts.rect[0] * tsize[0] / size[0]),
                    top: Math.floor(opts.rect[1] * tsize[1] / size[1]),
                    width: Math.ceil(opts.rect[2] * tsize[0] / size[0]),
                    height: Math.ceil(opts.rect[3] * tsize[1] / size[1])
                }
            } else {
                rect = {
                    width: Math.max(minSize[0], tsize[0] - 10),
                    height: Math.max(minSize[1], tsize[1] - 10)
                };
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
            if (!cur.photoTagger) return;
            var rect = cur.photoTagger.result(),
                opts = cur.photoCropOpts;
            var cx = opts.size[0] / opts.thumbSize[0],
                cy = opts.size[1] / opts.thumbSize[1],
                crop = [
                    Math.floor(rect[0] * cx),
                    Math.floor(rect[1] * cy),
                    Math.ceil(rect[2] * cx),
                    Math.ceil(rect[3] * cy),
                    0,
                    0,
                    Math.ceil(rect[2] * cx)
                ],
                url = cur.photoCropOpts.uploadUrl + '&_crop=' + encodeURIComponent(crop.join(','));

            lockButton('market_photo_crop_done');
            clearTimeout(cur.cropTimer);
            cur.cropTimer = setTimeout(MarketEditItemBox.upload.cropSuccess.pbind('{"error":"ERR_CLIENT_UPLOAD_TIMEOUT: no response on market_photo_crop iframe request"}'), 10000);
            stManager.add(['upload.js'], function() {
                var jsonp = jsonpManager.reg(MarketEditItemBox.upload.cropSuccess);
                utilsNode.appendChild(ce('iframe', {
                    src: url + '&_jsonp=' + jsonp + '&_origin=' + encodeURIComponent(locProtocol + '//' + locHost)
                }));
            });
        },
        cropSuccess: function(res) {

            clearTimeout(cur.cropTimer);
            var obj = parseJSON(res) || {},
                btn = 'market_photo_crop_done';
            if (obj.error) {
                unlockButton(btn);
                MarketEditItemBox.upload.uploadFail(2, false, obj.error + Upload.getErrorAdditional(obj));
            } else {
                if (cur.photoTooltipHide) {
                    cur.photoTooltipHide(true);
                    curBox.hide();
                }
                ajax.post('al_market.php', {
                    act: 'save_photo',
                    _query: res
                }, {
                    onDone: function(data, thumb) {
                        ge('market_ei_main_photo').src = thumb;
                        cur.itemPhoto = data;
                        curBox().hide();

                    },
                    onFail: function(text) {
                        MarketEditItemBox.upload.uploadFail(2, false, text);
                        return true;
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                });
            }
            hide(ge('market_ei_main_photo_info'));
            show(ge('market_ei_main_photo_change'));
            show(geByClass1('market_ei_photos_wrap'));
        }

    },
    changeMainPhoto: function() {
        geByTag1('input', 'market_ei_main_photo_upload').click();
    },
    saveItem: function(btn) {
        if (isButtonLocked(btn)) return;
        var params = {
            oid: cur.mkOptions.oid,
            name: val('item_name'),
            description: val('item_description'),
            category: MarketEditItemBox.uiCategory.val(),
            price: val('item_price'),
            photo: JSON.stringify(cur.itemPhoto),
            extraPhotos: MarketEditItemBox.upload.getUploadedPhotos().join(','),
            hash: cur.mkOptions.hash,
            url: val('item_link')
        };
        if (ge('item_user_limit')) {
            params['user_limit'] = trim(val('item_user_limit'));
        }
        if (ge('item_limit')) {
            params['limit'] = trim(val('item_limit'));
        }
        if (cur.mkOptions.oid > 0) {
            params.country_id = MarketEditItemBox.uiCountry.val();
            params.city_id = MarketEditItemBox.uiCity.val();
            if (isVisible('group_market_metro_wrap')) {
                params.metro_id = MarketEditItemBox.uiMetro.val();
            } else {
                params.metro_id = 0
            }
            if (!cur.mkOptions.from_attach && !cur.mkOptions.from_wall) {
                params.attach_to_wall = isChecked('item_share') ? 1 : 0;
            }
            if (cur.mkOptions.from_wall) {
                params.add_attach_data = 1;
            }
            params.disabled = isChecked('item_disabled');
            if (cur.mkOptions.withSubcategories) {
                if (cur.mkOptions.subcategories[10000 + Number(params.category)] != undefined) {
                    params.subcategory = MarketEditItemBox.uiSubCategory.val();
                }
            }
        } else {
            params.disabled = isChecked('item_disabled');
            params.albums = MarketEditItemBox.uiAlbums ? MarketEditItemBox.uiAlbums.val() : 0;
        }
        if (cur.mkOptions.item_id) {
            params.id = cur.mkOptions.item_id;
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
        re(geByClass1('error', 'market_edit_item_box'));
        ajax.post('al_market.php?act=a_save_item', params, {
            onDone: function(text, albums, item_id, attach_data) {
                curBox().hide();
                if (cur.mkOptions.item_id && cur.module != 'marketplace') {
                    var el = ge('market_item' + cur.mkOptions.item_id);
                    if (el) {
                        el.innerHTML = se(text).innerHTML;
                    }
                } else {
                    if (!cur.mkOptions.from_attach && !cur.mkOptions.from_wall) {
                        nav.reload();
                    } else {
                        if (params.add_attach_data) {
                            cur.chooseMedia('market', attach_data[1], attach_data[0], false, false, false);
                        }
                    }
                }
                if (cur.aid) {
                    nav.reload();
                }
                if (albums) {
                    each(albums, function(k, v) {
                        var block = geByClass1('market_album_size', 'market_album_block' + k);
                        if (block) {
                            block.innerHTML = v;
                        }
                    });
                }
                if (params.disabled && !params.id) {
                    nav.change({
                        section: 'disabled'
                    });
                } else if (params.disabled || cur.mSection == 'disabled' && !params.disabled) {
                    addClass('market_item' + params.id, 'market_row_disabled');
                }
                if (cur.module == 'marketplace') {
                    if (cur.act != 'my') {
                        nav.go('/market?act=my');
                    }
                }
                if (cur.mkOptions.from_attach) {
                    MarketChooseBox.attachItem('item', cur.mkOptions.oid, item_id);
                }
            },
            onFail: function(text) {
                showMsg('market_edit_item_box', text, 'error', true);
                ge('box_layer_wrap').scrollTop = 0;
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    }
};

var MarketChooseBox = {
    init: function() {
        extend(cur.marketChooseBox, {
            searchInputEl: ge('market_search_input'),
            tabAll: ge('market_subtab_pane_all'),
            tabAlbums: ge('market_subtab_pane_albums'),
            tabAlbum: ge('market_subtab_pane_album'),
            tabSearch: ge('market_subtab_pane_search'),
            tabs: geByClass1('market_choose_box_tabs'),
            curTab: null,
            curTabId: 'all',
            prevTab: null,
            curAlbum: 0,
            curAlbumCount: 0,
            box: ge('market_choose_box'),
            more: ge('ui_all_load_more'),
            isLoading: false,

        });
        MarketChooseBox.setCurrentTab(cur.marketChooseBox.tabAll);
        MarketChooseBox.initScroll();
    },
    initScroll: function() {
        addEvent(ge('box_layer_wrap'), 'scroll', MarketChooseBox.onScroll);
    },
    onScroll: function() {
        if (cur.marketChooseBox.disableScroll[cur.marketChooseBox.curTabId]) return false;
        var showMoreBtnEl = geByClass1('ui_load_more_btn', cur.marketChooseBox.curTab);
        if (showMoreBtnEl) {
            var ch = clientHeight(),
                scroll = scrollGetY(),
                btnPos = getXY(showMoreBtnEl);
            if ((scroll + ch) > (btnPos[1] - ch / 2)) {
                MarketChooseBox.showMore(cur.marketChooseBox.curTabId, showMoreBtnEl);
            }
        }
    },
    showMore: function(type, el) {
        if (!cur.marketChooseBox.isLoading) {
            if (['search', 'album', 'albums', 'all'].indexOf(type) == -1) {
                return false;
            }
            var params = {
                type: type,
                to_id: cur.oid,
                act: 'a_choose_box_get_items',
                offset: cur.marketChooseBox.position[type],
                limit: cur.marketChooseBox.perPage[type]
            };
            if (type == 'search') {
                params.q = trim(val(cur.marketChooseBox.searchInputEl));
                params.album_id = cur.marketChooseBox.curAlbum;
            } else if (type == 'album') {
                params.album_id = cur.marketChooseBox.curAlbum;
            }
            ajax.post('/al_market.php', params, {
                cache: 1,
                onDone: function(count, html, showMore) {
                    el.insertAdjacentHTML('beforeBegin', html);
                    cur.marketChooseBox.position[type] += count;
                    if (!showMore) {
                        hide(geByClass1('ui_load_more_btn', cur.marketChooseBox.curTab));
                        cur.marketChooseBox.disableScroll[type] = true;
                    }
                },
                showProgress: function() {
                    cur.marketChooseBox.isLoading = true;
                },
                hideProgress: function() {
                    cur.marketChooseBox.isLoading = false;
                }
            });
        }
    },
    setCurrentTab: function(el) {
        cur.marketChooseBox.prevTab = cur.marketChooseBox.curTab;
        hide(cur.marketChooseBox.prevTab);
        cur.marketChooseBox.curTab = el;
        if (el == cur.marketChooseBox.tabAll) {
            cur.marketChooseBox.curTabId = 'all';
        } else if (el == cur.marketChooseBox.tabAlbums) {
            cur.marketChooseBox.curTabId = 'albums';
        } else if (el == cur.marketChooseBox.tabAlbum) {
            cur.marketChooseBox.curTabId = 'album';
        } else if (el == cur.marketChooseBox.tabSearch) {
            cur.marketChooseBox.curTabId = 'search';
        }
        show(cur.marketChooseBox.curTab);
    },
    switchTabInBox: function(el, e) {
        cancelEvent(e);
        var tabs = gpeByClass('ui_tabs', el);
        if (geByClass1('ui_tab_sel', tabs) == el) return false;
        uiTabs.switchTab(el);
        var tab_id = el.parentElement.getAttribute('data-id');
        if (tab_id == "all") {
            MarketChooseBox.setCurrentTab(cur.marketChooseBox.tabAll);
        } else if (tab_id == 'albums') {
            MarketChooseBox.setCurrentTab(cur.marketChooseBox.tabAlbums);
        }
        return false;
    },
    getAlbum: function(ownerId, albumId, e) {
        cancelEvent(e);
        var type = 'album';
        cur.marketChooseBox.position[type] = 0;
        cur.marketChooseBox.disableScroll[type] = false;
        var params = {
            type: type,
            offset: cur.marketChooseBox.position[type],
            limit: cur.marketChooseBox.perPage[type],
            act: 'a_choose_box_get_items',
            to_id: ownerId,
            album_id: albumId
        };

        ajax.post('/al_market.php', params, {
            onDone: function(count, html, showMore) {
                cur.marketChooseBox.tabAlbum.innerHTML = html;
                cur.marketChooseBox.position[type] = count;
                if (!showMore) {
                    cur.marketChooseBox.disableScroll[type] = true;
                }
                cur.marketChooseBox.curAlbum = albumId;
                if (count == 0) {
                    hide(cur.marketChooseBox.searchInputEl);
                }
                MarketChooseBox.setCurrentTab(cur.marketChooseBox.tabAlbum);
                hide(cur.marketChooseBox.tabs);
                MarketChooseBox.showBackButton();
            },
            showProgress: function() {
                cur.marketChooseBox.isLoading = true;
            },
            hideProgress: function() {
                cur.marketChooseBox.isLoading = false;
            }
        });
    },
    showBackButton: function() {
        var box = curBox();
        geByClass1('box_title', box.titleWrap).innerHTML = '<div class="back" onclick="MarketChooseBox.chooseBoxBack();">' + getLang('market_box_title_back') + '</div>';
    },
    attachItem: function(type, ownerId, itemId, e) {
        cancelEvent(e);
        if (type == 'item') {
            var params = {
                act: 'a_market_attach',
                owner_id: ownerId,
                item_id: itemId
            };
            ajax.post('/al_market.php', params, {
                onDone: function(itemId, data) {
                    cur.chooseMedia('market', itemId, data, false, false, false);
                }
            });
        } else if (type == 'album') {
            var params = {
                act: 'a_market_attach',
                owner_id: ownerId,
                item_id: itemId,
                is_album: true
            };
            ajax.post('/al_market.php', params, {
                onDone: function(itemId, data, url) {
                    cur.chooseMedia('market_album', itemId, data, url, true, false);
                    var box = curBox();
                    box.hide();
                }
            });
        }
    },
    chooseBoxBack: function() {
        if (cur.marketChooseBox.curTab == cur.marketChooseBox.tabSearch) {
            MarketChooseBox.backFromSearch();
        } else {
            var box = curBox();
            geByClass1('box_title', box.titleWrap).innerHTML = getLang('market_choose_product_title');
            MarketChooseBox.setCurrentTab(cur.marketChooseBox.prevTab);
            show(cur.marketChooseBox.tabs);
            show(cur.marketChooseBox.searchInputEl);
        }
    },
    onChangeQuery: function() {
        MarketChooseBox.searchItems();
    },
    backFromSearch: function() {
        var box = curBox();
        geByClass1('box_title', box.titleWrap).innerHTML = getLang('market_choose_product_title');
        show(cur.marketChooseBox.tabs);
        MarketChooseBox.setCurrentTab(cur.marketChooseBox.prevTab);
        cur.marketChooseBox.searchInputEl.value = "";
    },
    searchItems: function() {
        var q = trim(val(cur.marketChooseBox.searchInputEl));
        if (q == '' || q.length <= 3) {
            if (cur.marketChooseBox.curTab == cur.marketChooseBox.tabSearch) {
                MarketChooseBox.backFromSearch();
            }
            return false;
        }
        var type = 'search';
        cur.marketChooseBox.position[type] = 0;
        var params = {
            type: type,
            offset: cur.marketChooseBox.position[type],
            limit: cur.marketChooseBox.perPage[type],
            q: q,
            album_id: cur.marketChooseBox.curAlbum,
            to_id: cur.oid,
            act: 'a_choose_box_get_items'
        };
        ajax.post('/al_market.php', params, {
            cache: 1,
            onDone: function(count, html, showMore) {
                cur.marketChooseBox.position[type] = count;
                cur.marketChooseBox.tabSearch.innerHTML = html;
                if (cur.marketChooseBox.curTab != cur.marketChooseBox.tabSearch) {
                    hide(cur.marketChooseBox.tabs);
                    MarketChooseBox.showBackButton();
                    MarketChooseBox.setCurrentTab(cur.marketChooseBox.tabSearch);
                }
            },
            showProgress: function() {
                cur.marketChooseBox.isLoading = false;
            },
            hideProgress: function() {
                cur.marketChooseBox.isLoading = false;
            }
        });
    }
};

var MarketTags = {
    init: function(input, options) {
        if (this.inited) {
            return;
        }
        var self = this;
        this.inited = true;
        this.input = input;
        this.cont = input.parentNode;
        var resultContainer = ce('div', {
            className: 'results_container',
            innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'
        });
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
            var el = self.select.list.childNodes[self.select.active],
                id = el ? el.getAttribute('val') : '',
                item;
            each(self.lastItems, function() {
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
    showSelectList: function(term, items) {
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
        each(this.lastItems, function() {
            if (this[0] == id) {
                item = this;
            }
        });
        if (!item) return;
        var el = ce('div', {
                innerHTML: item[1]
            }),
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
        var indxr = cur.indexTags,
            delimiter = indxr.delimiter,
            trimmer = indxr.trimmer;

        q += ' ' + (parseLatin(q) || '');
        q = escapeRE(q).replace(/&/g, '&amp;');
        q = q.replace(trimmer, '').replace(delimiter, '|');
        return {
            re: new RegExp('(' + q + ')', 'gi'),
            val: '<em>$1</em>'
        }
    },
    destroy: function(prevCur) {
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
};

var Marketplace = {
    init: function() {
        extend(cur, {
            searchInp: ge('market_search_input'),
            viewIcons: geByClass('marketplace-icon'),
            userItemsMoreBtn: ge('ui_marketplace_items_load_more'),
            notFound: ge('not_found'),
            notFoundText: geByClass1('market_empty', cur.notFound),
            searchTabs: geByClass1('market_place_search_tabs'),
            userItemSearchCounter: geByClass('ui_tab_count', geByClass1('market_place_search_tabs'))[0],
            commItemSearchCounter: geByClass('ui_tab_count', geByClass1('market_place_search_tabs'))[1],
            marketplaceContent: ge('marketplace_content'),
            marketplaceFull: ge('marketplace_content_full'),
            userItemsCounter: geByClass1('page_block_sub_header_count'),
            itemsSubheader: geByClass1('page_block_sub_header'),
            customSearchChange: Marketplace.searchItems,
            onlyFriendsTogglerBlock: ge('search_by_friends_toogle'),
            onlyFriendsToggler: geByClass1('ui_toggler', ge('search_by_friends_toogle'))
        });
        if (cur.showCreateItemTT) {
            Marketplace.createItemTooltip();
        }
        Marketplace.scroll.init();
        setTimeout(function() {
            cur.destroy.push(function() {
                Marketplace.scroll.deinit();
            });
        }, 0);
        Marketplace.filters.init();
        if (nav.objLoc.q) {
            saveSearchAttemptStats('market', 0, !isVisible(cur.notFound));
        }
    },
    scroll: {
        init: function() {
            Marketplace.scrollnode = browser.msie6 ? pageNode : window;
            Marketplace.scroll.deinit();
            window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
            addEvent(Marketplace.scrollnode, 'scroll', Marketplace.scroll.check);
            addEvent(window, 'resize', Marketplace.scroll.check);
        },
        deinit: function() {
            removeEvent(Marketplace.scrollnode, 'scroll', Marketplace.scroll.check);
            removeEvent(window, 'resize', Marketplace.scroll.check);
        },
        check: function() {
            if (browser.mobile || cur.isSearchLoading || cur.disableAutoMore) return;
            var docEl = document.documentElement;
            var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
            var st = scrollGetY(),
                lnk = cur.userItemsMoreBtn;
            if (isVisible(lnk)) {
                if (st + ch * 3 > lnk.offsetTop) {
                    lnk.onclick();
                }
            }
        }
    },
    filters: {
        init: function() {
            cur.searchFilters = {};
            cur.searchFilters['sort'] = cur.uiSort;
            cur.searchFilters['category'] = cur.uiCategory;
            cur.searchFilters['subcategory'] = cur.uiSubcategory;
            cur.searchFilters['price_from'] = cur.uiPriceFrom;
            cur.searchFilters['price_to'] = cur.uiPriceTo;
            cur.searchFilters['country'] = cur.uiCountry;
            cur.searchFilters['city'] = cur.uiCity;
            cur.searchFilters['metro'] = cur.uiMetro;
            cur.searchFilters['by_names'] = cur.uiSearchByNames;
        },
        getValue: function(elem) {
            var fv = false;
            if (elem.__className == 'Selector') {
                if (elem.selectedItems()[0]) {
                    fv = clone(elem.selectedItems()[0]);
                    fv.push(elem.selectedItems()[0]);
                }

            } else if (elem.tagName == 'INPUT') {
                var v = val(elem);
                fv = [v, v, v === ''];
                if (elem.type == 'text') {
                    var p = gpeByClass('ui_search_fltr_sel', elem),
                        label = domPS(p);
                    if (hasClass(label, 'ui_search_fltr_label')) {
                        var prefix = label.textContent,
                            _prefix = '',
                            postfix = geByClass1('ui_search_fltr_label_postfix', label);
                        if (postfix) {
                            _prefix = postfix.getAttribute('data-prefix');
                            postfix = postfix.textContent;
                            prefix = prefix.replace(postfix, '').replace(/,\s$/, '');
                            if (_prefix) {
                                postfix = false;
                            }
                        }
                        if (geByClass1('ui_search_fltr_sep', p)) {
                            each(geByTag('input', p), function(i, inp) {
                                if (inp == elem) {
                                    prefix += ' ' + (i == 0 ? getLang('market_filter_range_from') : getLang('market_filter_range_to'));
                                }
                            });
                        }
                        fv[1] = prefix + (_prefix ? (' ' + _prefix) : ' ') + fv[1] + (postfix ? (' ' + postfix) : '');
                    }
                }
            } else if (hasClass(elem, 'checkbox')) {
                if (isChecked(elem)) {
                    fv = [1, '', ''];
                }
            }
            return fv;
        },
        onEnterSearch: function() {
            var q = trim(val(cur.searchInp));
            if (cur.lastQ != q) {
                Marketplace.searchItems('', q !== '');
            }
        },
        onBlurSearch: function() {
            var q = trim(val(cur.searchInp));
            if (cur.lastQ != q) {
                Marketplace.searchItems();
            }
        },
        onChangeQuery: function(query, suggestedQuery, fromHistory) {
            if (typeof suggestedQuery == 'string') {
                Marketplace.searchItems(suggestedQuery, query !== '');
            }
        },
        onlyFriendsToggle: function(elem) {
            toggleClass(geByClass1('ui_toggler', elem), 'on');
            Marketplace.searchItems();
        }
    },
    switchToCatalog: function(el, event) {
        if (cur.searchMode) {
            return true;
        }
        return uiRightMenu.go(el, event);
    },
    updateCatalogByItem: function(id, oid, hash, elem, type) {
        var params = {
            oid: oid,
            id: id,
            hash: hash,
            type: type
        };
        ajax.post('al_market.php?act=a_update_catalog_by_item', params, {
            onDone: function(text) {
                if (window.WkView) {
                    WkView.hide()
                }
                nav.reload();
                showDoneBox(text);
            }
        });
    },
    deleteItem: function(id, oid, hash, ev) {
        var box = showFastBox({
                title: getLang('market_item_delete_confirm_title'),
                dark: 1
            },
            getLang('market_item_delete_confirm'),
            getLang('global_delete'),
            function() {
                var params = {
                    oid: oid,
                    id: id,
                    hash: hash
                };
                ajax.post('al_market.php?act=a_delete_item', params, {
                    onDone: function(text, albums) {
                        box.hide();
                        re('market_item' + params.id);
                        cur.itemsCount--;
                        var count = '',
                            summary = '';
                        if (cur.itemsCount > 0) {
                            count = langNumeric(cur.itemsCount, '%s', true);
                            summary = getLang('market_summary_X_goods', cur.itemsCount, true);
                        } else {
                            summary = getLang('market_summary_no_goods');
                            geByClass1('market_empty', cur.notFound).innerHTML = cur.aid ? getLang('market_album_empty') : getLang('market_catalog_empty');
                            hide(cur.listEl);
                            show(cur.notFound);
                        }
                        var summaryEl = geByClass1('market_summary_text', 'market_list_wrap');
                        if (summaryEl) {
                            summaryEl.innerHTML = summary;
                        } else {
                            val('market_items_count', count);
                        }
                        Marketplace.changeCounter(-1);
                        showDoneBox(text);
                    },
                    showProgress: box.showProgress,
                    hideProgress: box.hideProgress
                });
            }
        );
        return false;
    },
    showItem: function(oid, id, e, from) {
        Market.showItem(oid, id, e, from);
        Marketplace._saveHistoryAction(oid, id);
        return false;
    },
    getSearchParams: function() {
        var params = {
            q: trim(val(cur.searchInp)),
            offset: cur.searchOffset || 0,
            view_type: cur.viewType,
        };
        var selectedSort = cur.searchFilters['sort'].selectedItems();
        if (selectedSort && selectedSort[0] && selectedSort[0].length > 0) {
            params.sort = selectedSort[0][0];
        }
        var selectedCategory = cur.searchFilters['category'].selectedItems();
        if (selectedCategory && selectedCategory[0]) {
            params.category = selectedCategory[0].length > 0 ? selectedCategory[0][0] : 0;
        }

        var selectedSubCategory = cur.searchFilters['subcategory'].selectedItems();
        if (selectedSubCategory && selectedSubCategory[0]) {
            params.subcategory = selectedSubCategory[0].length > 0 ? selectedSubCategory[0][0] : 0;
        }
        var selectedCountry = cur.searchFilters['country'].selectedItems();
        if (selectedCountry && selectedCountry[0]) {
            if (selectedCountry[0].length > 0) {
                if (selectedCountry[0][0] != cur.defaultCountry) {
                    params.country = selectedCountry[0][0];
                }
            } else {
                params.country = 0;
            }
        } else {
            params.country = 0;
        }
        var selectedCity = cur.searchFilters['city'].selectedItems();
        if (selectedCity && selectedCity[0]) {
            if (selectedCity[0].length > 0) {
                if (selectedCity[0][0] != cur.defaultCity) {
                    params.city = selectedCity[0][0];
                }
            } else {
                params.city = 0
            }
        } else {
            params.city = 0
        }
        var selectedMetro = cur.searchFilters['metro'].selectedItems();
        if (selectedMetro && selectedMetro[0]) {
            if (selectedMetro[0].length > 0) {
                params.metro = selectedMetro[0][0];
            }
        }

        var priceFrom = val(cur.searchFilters["price_from"]);
        if (priceFrom) {
            params.price_from = priceFrom;
        }
        var priceTo = val(cur.searchFilters["price_to"]);
        if (priceTo) {
            params.price_to = priceTo;
        }
        if (params.q) {
            var byNames = isChecked(cur.searchFilters['by_names']);
            if (byNames) {
                params.by_names = 1;
            }
        }

        if (cur.groups) {
            params.groups = 1;
        }
        if (isVisible(cur.onlyFriendsTogglerBlock) && isChecked(cur.onlyFriendsToggler)) {
            params.only_friends = 1;
            if (cur.friendsLastView) {
                params.lastview = cur.friendsLastView;
            }
        }
        return params;
    },
    changeView: function(type) {
        if (cur.viewType == type || cur.changeViewTypeLoad) {
            return;
        }
        cur.searchOffset = 0;
        var query = {};
        var loadSearchParams = false;
        var loadSection = true;
        var loadAct = '';
        if (cur.act == 'my') {
            loadAct = "a_marketplace_my";
        } else if (cur.act == 'fav') {
            loadAct = "a_marketplace_fav";
        } else {
            loadSearchParams = true;
            loadSection = false;
            loadAct = "a_marketplace_search";
        }
        if (loadSearchParams) {
            query = Marketplace.getSearchParams();
        }
        if (loadSection) {
            query.section = cur.section;
        }
        query.view_type = type;
        query.act = loadAct;
        ajax.post('/al_market.php', query, {
            cache: 1,
            onDone: function(html) {
                if (html) {
                    cur.marketplaceContent.innerHTML = html;
                }
                cur.viewIcons.forEach(function(el) {
                    cur.viewType = type;
                    toggleClass(el, 'selected');
                });
            },
            showProgress: function() {
                cur.changeViewTypeLoad = true;
                cur.searchInp && uiSearch.showProgress(cur.searchInp)
            },
            hideProgress: function() {
                cur.changeViewTypeLoad = false;
                cur.searchInp && uiSearch.hideProgress(cur.searchInp)
            }
        });
    },
    switchSearchTab: function(section, el, e) {
        cancelEvent(e);
        cur.groups = section == 'groups' ? 1 : 0;
        cur.forseTabSwitch = true;
        uiTabs.switchTab(el);
        Marketplace.searchItems();
    },
    searchItems: function(q, saveStats) {
        if (cur.isSearchLoading) {
            return;
        }
        cur.searchOffset = 0;
        var query = Marketplace.getSearchParams();
        if (q) {
            query.q = q;
        }
        var ts = +new Date();
        ajax.post('/al_market.php?act=a_marketplace_search', query, {
            cache: 1,
            onDone: function(html, userCnt, userMore, communityCnt, communityMore, notFoundText, countHash, resetSearch) {
                var commDisplayed = false;
                if (query.groups) {
                    commDisplayed = communityCnt != 0;
                } else {
                    commDisplayed = userCnt == 0 && communityCnt != 0 && !cur.forseTabSwitch;
                }

                if (!query.groups && commDisplayed) {
                    var el = geByClass('ui_tab', 'market_place_search_tabs')[1];
                    commDisplayed = true;
                    uiTabs.switchTab(el);
                    cur.groups = 1;
                }
                var displayedMore = commDisplayed ? communityMore : userMore;
                var displayedCnt = commDisplayed ? communityCnt : userCnt;
                var userDisplayedCnt = langNumeric(userCnt, '%s', true);
                var communityDisplayedCnt = langNumeric(communityCnt, '%s', true);
                cur.searchMode = !resetSearch;
                if (cur.searchMode) {
                    if (!cur.filtersShown) {
                        searcher.toggleMinimizedFilters(ge('search_filters_minimized'));
                    }
                    addClass(cur.onlyFriendsTogglerBlock, 'unshown');
                    removeClass(cur.searchTabs, 'hide');
                    addClass(cur.itemsSubheader, 'hide');
                    addClass(cur.marketplaceContent, 'marketplace_content_search');
                    cur.userItemSearchCounter.innerHTML = userCnt ? userDisplayedCnt : '0';
                    cur.commItemSearchCounter.innerHTML = communityCnt ? communityDisplayedCnt : '0';
                } else {
                    addClass(cur.searchTabs, 'hide');
                    removeClass(cur.onlyFriendsTogglerBlock, 'unshown');
                    removeClass(cur.itemsSubheader, 'hide');
                    removeClass(cur.marketplaceContent, 'marketplace_content_search');
                    cur.userItemsCounter.innerHTML = userDisplayedCnt;
                }
                if (displayedMore) {
                    show(cur.userItemsMoreBtn);
                } else {
                    hide(cur.userItemsMoreBtn);
                }
                cur.marketplaceContent.innerHTML = html;
                if (displayedCnt) {
                    if (!cur.searchMode) {
                        removeClass(cur.itemsSubheader, 'hide');
                    }
                    show(cur.marketplaceFull);
                    hide(cur.notFound)
                } else {
                    if (query.q == '') {
                        addClass(cur.itemsSubheader, 'hide');
                    }
                    cur.notFoundText.innerHTML = notFoundText;
                    hide(cur.marketplaceFull);
                    show(cur.notFound)
                }
                if (!cur.searchResults) cur.searchResults = {};
                if (q && countHash && (!cur.searchResults[q] || cur.searchResults[q].count < userCnt + communityCnt)) {
                    cur.searchResults[q] = {
                        count: userCnt + communityCnt,
                        countHash: countHash
                    }
                }
                if (commDisplayed) {
                    cur.uiMetro.disable(true)
                } else {
                    cur.uiMetro.disable(false)
                }
                Marketplace.updateLocation(query);
                if (saveStats) {
                    saveSearchAttemptStats('market', ts, !isVisible(cur.notFound));
                }
            },
            showProgress: function() {
                uiSearch && uiSearch.showProgress(cur.searchInp);
                cur.isSearchLoading = true;
            },
            hideProgress: function() {
                uiSearch && uiSearch.hideProgress(cur.searchInp);
                cur.isSearchLoading = false;
            }
        });
    },
    updateLocation: function(query) {
        each(nav.objLoc, function(i, v) {
            if (i != 0) {
                delete nav.objLoc[i];
            }
        });
        if (cur.searchMode) {
            each(query, function(i, v) {
                if (v && v != 0 && !inArray(i, ['only_friends', 'load', 'id', 'offset', 'aid', 'view_type', 'force_search', 'reset_search']) && (i != 'sort' || v != 0)) {
                    nav.objLoc[i] = v;
                } else {
                    delete nav.objLoc[i];
                }
            });
        } else {
            each(query, function(i, v) {
                if (v && v != 0 && inArray(i, ['only_friends'])) {
                    nav.objLoc[i] = v;
                }
            });
        }
        nav.setLoc(nav.objLoc);
    },
    showMore: function() {
        if (isButtonLocked(cur.userItemsMoreBtn)) {
            return;
        }
        var offset = cur.searchOffset || 0;
        offset += cur.itemsPerPage;
        cur.searchOffset = offset;
        var query = {};
        var loadSearchParams = false;
        var loadSection = true;
        var loadAct = '';
        if (cur.act == 'my') {
            loadAct = "a_marketplace_my";
        } else if (cur.act == 'fav') {
            loadAct = "a_marketplace_fav";
        } else {
            loadSearchParams = true;
            loadSection = false;
            loadAct = "a_marketplace_search";
        }
        if (loadSearchParams) {
            query = Marketplace.getSearchParams();
        }
        if (loadSection) {
            query.section = cur.section;
        }
        query.offset = cur.searchOffset;
        query.act = loadAct;
        ajax.post('/al_market.php', query, {
            onDone: function(html, user_cnt, user_more, community_cnt, community_more, not_found_text) {
                var comm_displayed = query.act == 'a_marketplace_search' && query.groups == 1;
                var displayed_more = comm_displayed ? community_more : user_more;
                if (displayed_more) {
                    show(cur.userItemsMoreBtn);
                } else {
                    hide(cur.userItemsMoreBtn);
                }
                if (html) {
                    cur.marketplaceContent.appendChild(cf(html));
                }
            },
            showProgress: function() {
                lockButton(cur.userItemsMoreBtn);
                cur.searchInp && uiSearch.showProgress(cur.searchInp)
            },
            hideProgress: function() {
                unlockButton(cur.userItemsMoreBtn);
                cur.searchInp && uiSearch.hideProgress(cur.searchInp)
            }
        });
    },
    showTooltip: function(el) {
        var lang = getLang('market_item_add_to_fav');
        if (hasClass(el, 'selected')) {
            lang = getLang('market_item_delete_from_fav');
        }
        showTitle(el, lang, 0, {
            appendParentCls: 'marketcat_row'
        });
    },
    before: '',
    _saveHistoryAction: function(oid, id) {
        if (cur.module == 'marketplace') {
            if (cur.act == 'fav' || cur.act == 'my') {
                return;
            }
            var searchParams = Marketplace.getSearchParams();
            if (searchParams.q && cur.searchResults) {
                var res = cur.searchResults[searchParams.q];
                if (res) {
                    uiSearch.saveHistorySearch(cur.searchInp, searchParams.q, oid, id, res.count, res.countHash);
                }
            }
        }
    },
    initPlaceholder: function() {
        var div = ce('div', {
            className: 'market_row'
        });
        extend(cur, {
            rowPlaceholder: div
        });
    },
    showFullCard: function(el) {
        if (Marketplace.fullCard) {
            return;
        }
        Marketplace.initPlaceholder();
        var div = cur.rowPlaceholder,
            size = getSize(el),
            xy = getXY(el),
            xy1 = getXY('marketplace');
        setStyle(div, {
            height: size[1]
        });
        addClass(el, 'over');
        domInsertBefore(div, el);
        setStyle(el, {
            left: xy[0] - xy1[0] - 13,
            top: xy[1] - xy1[1] - 13
        });
        Marketplace.fullCard = el;
    },
    hideFullCard: function(el) {
        setStyle(el, {
            left: '',
            top: ''
        });
        removeClass(el, 'over');
        Marketplace.fullCard = '';
        re(cur.rowPlaceholder);

        var ttEl = geByClass1('_badge', el);
        if (ttEl && ttEl.tt) ttEl.tt.hide({
            fasthide: true
        });
    },
    setFavs: {},
    setFavourite: function(ownerId, itemId, hash, el) {
        var key = "m" + ownerId + itemId;
        if (key in Marketplace.setFavs) {
            return;
        }
        var params = {
            act: 'a_set_favourite',
            owner_id: ownerId,
            item_id: itemId,
            hash: hash
        };
        toggleClass(el, 'selected');
        ajax.post('/al_market.php', params, {
            onDone: function(success) {
                if (success) {
                    if (cur.act && cur.act == 'fav') {
                        if (hasClass(el, 'selected')) {
                            Marketplace.changeCounter(1);
                        } else {
                            Marketplace.changeCounter(-1);
                        }
                    }

                    tooltips.destroy(el);
                } else {
                    toggleClass(el, 'selected');
                }
            },
            showProgress: function() {
                Marketplace.setFavs[key] = true;
            },
            hideProgress: function() {
                delete Marketplace.setFavs[key];
            }
        });
    },
    hideUserItems: function(ownerId, hash, ev) {
        var box = showFastBox(getLang('market_hide_user_items_confirm_title'), getLang('market_hide_user_items_confirm'), getLang('market_hide_user_items_confirm_btn'), function() {
            var btn = box.btns['ok'][0];
            if (isButtonLocked(btn)) return;
            var params = {
                act: 'a_toggle_user_items',
                owner_id: ownerId,
                hash: hash
            };
            ajax.post('/al_market.php', params, {
                onDone: function(success, text) {
                    box.hide();
                    if (!success) return;
                    nav.reload();
                    //Marketplace.searchItems();
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        }, getLang('global_cancel'));
        return cancelEvent(ev);
    },
    changeCounter: function(val) {
        var counter = geByClass1('ui_tab_count', geByClass1('ui_tab_sel'));
        counter.innerHTML = intval(counter.innerHTML) + (val);
    },
    createItemTooltip: function() {
        var lsKey = 'marketplace_create_item_tooltip_shown',
            ttCounter = ls.get(lsKey) || 0,
            el = geByClass1('_market_create_item_btn', 'marketpalce');
        if (!el || cur.marketplaceTooltip) return;

        if (ttCounter > 2) {
            if (ttCounter > 4) return;
            setTimeout(function() {
                ls.set(lsKey, ttCounter + 1);
                cur.marketplaceTooltip = new ElementTooltip(el, {
                    autoShow: false,
                    content: '<div class="feature_intro_tt_hide" onclick="cur.closeMarketplaceTooltip();"></div>' + getLang('market_create_item_btn_tt'),
                    appendToParent: true,
                    cls: 'feature_intro_tt',
                    offset: [0, -8],
                    onHide: function() {
                        if (cur.marketplaceTooltip) cur.marketplaceTooltip.destroy();
                    }
                });
                cur.marketplaceTooltip.show();

                cur.closeMarketplaceTooltip = function() {
                    if (cur.marketplaceTooltip) cur.marketplaceTooltip.destroy();
                    ls.set(lsKey, 999);
                };
            }, 1000);
        } else {
            ls.set(lsKey, ttCounter + 1);
        }
    },
    showCommonTT: function(el, mid) {
        var sx = Math.round(20 - getSize(el)[0] / 2);
        showTooltip(el, {
            url: 'al_market.php',
            params: {
                act: 'a_common_friends_tt',
                'mid': mid
            },
            typeClass: 'tt_black',
            slide: 15,
            shift: [sx, 8],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: 'auto'
        });
    },
    showCommonBox: function(ev, mid) {
        showTabbedBox('al_page.php', {
            act: 'box',
            oid: mid,
            tab: 'common'
        }, {
            cache: 1
        }, ev);
        cancelEvent(ev);
    }
};


try {
    stManager.done('market.js');
} catch (e) {}