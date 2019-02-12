var photos = {
    LOAD_TYPE_PHOTOS: 'photos',
    LOAD_TYPE_ALBUMS: 'albums',
    LOAD_TYPE_TAGGED: 'tagged',

    changeAlbumPhoto: function(albumRaw) {
        showBox('al_photos.php', {
            act: 'change_thumb_box',
            album: albumRaw
        });
    },

    onMouseOverEditRow: function(rowEl) {
        var placeholderEl = geByClass1('photos_photo_edit_row_desc_placeholder', rowEl);
        var inputEl = geByClass1('photos_photo_edit_row_desc_input', rowEl);
        setTitle(placeholderEl, false, val(inputEl));
    },

    editInitSorter: function() {
        var contEl = ge('photos_container_photos');

        cur.photosEditSorter = new GridSorter(contEl, 'photos_photo_edit_row_thumb', {
            onReorder: photos.reorderPhotos
        });
    },

    updateEditHeaderPos: function() {
        if (cur.photosEditHeaderEl === undefined) {
            cur.photosEditHeaderEl = geByClass1('photos_edit_selection_header');
        }
        if (!cur.photosEditHeaderEl) return;

        cur.photosEditHeaderElOffset = cur.photosEditHeaderElOffset || (getXY(cur.photosEditHeaderEl)[1] - getSize(ge('page_header_cont'))[1]);

        if (scrollGetY() >= cur.photosEditHeaderElOffset) {
            if (!hasClass(cur.photosEditHeaderEl, 'photos_header_fixed')) {
                addClass(cur.photosEditHeaderEl, 'photos_header_fixed');
                setStyle(cur.photosEditHeaderEl, {
                    width: getSize(ge('page_body'))[0]
                });
                setStyle(domNS(cur.photosEditHeaderEl), {
                    'margin-top': getSize(cur.photosEditHeaderEl)[1] + 'px',
                });
            }
        } else {
            removeClass(cur.photosEditHeaderEl, 'photos_header_fixed');
            setStyle(cur.photosEditHeaderEl, {
                width: ''
            });
            setStyle(domNS(cur.photosEditHeaderEl), {
                'margin-top': 0
            });
        }
    },

    _editGetSelectedCount: function() {
        var selectedCount = geByClass('photos_edit_selected').length;

        if (cur.photoEditSelectedAll) {
            var shownRowsCount = geByClass('photos_photo_edit_row').length;
            if (selectedCount < shownRowsCount) {
                selectedCount = (cur.count - shownRowsCount) + selectedCount;
            } else {
                selectedCount = cur.count;
            }
        }

        return selectedCount;
    },

    editSelectAll: function(doDeselect) {
        cur.photoEditSelectedAll = !doDeselect;

        each(geByClass('photos_photo_edit_row'), function() {
            toggleClass(this, 'photos_edit_selected', cur.photoEditSelectedAll);
        });

        photos._editUpdateSelectedCounter();
    },

    _editUpdateSelectedCounter: function() {
        var label, selectedCount = photos._editGetSelectedCount();

        if (selectedCount) {
            label = getLang('photos_edit_selected_count').replace('{total}', cur.count).replace('{count}', selectedCount);
        } else {
            label = langNumeric(cur.count, cur.lang.photos_edit_selected_count_initial, true);
        }

        val(ge('photos_edit_selected_label'), label);

        // init actions
        var actionsContainer = ge('photos_edit_selected_actions');
        toggleClass(actionsContainer, 'photos_selected', !!selectedCount);

        geByClass('photos_edit_selected_action', actionsContainer).forEach(function(action) {
            toggleClass(action, 'link_lock', !selectedCount);
        });

        var selectAllToggleEl = ge('photos_select_all_toggle');
        cur.photosEditSelectedHalf = selectedCount >= cur.count / 2;
        if (cur.photosEditSelectedHalf) {
            val(selectAllToggleEl, getLang('photos_edit_deselect_all'));
        } else {
            val(selectAllToggleEl, getLang('photos_edit_select_all'));
        }
    },

    selectEditPhoto: function(ev, checkBtnEl) {
        var thisRowEl = gpeByClass('photos_photo_edit_row', checkBtnEl);
        var isThisSelected = toggleClass(thisRowEl, 'photos_edit_selected');

        if (ev.shiftKey && cur.photoEditPrevSelectedRowEl && cur.photoEditPrevSelectedRowEl != thisRowEl) {
            var parentContainerEl = gpeByClass('photos_edit_photos_container', checkBtnEl);

            var curEl = domFC(parentContainerEl);
            var state = 0;
            while (state < 2 && curEl) {
                if (curEl == cur.photoEditPrevSelectedRowEl || curEl == thisRowEl) {
                    state++;
                }
                if (state) {
                    toggleClass(curEl, 'photos_edit_selected', isThisSelected);
                }
                curEl = domNS(curEl);
            }
        }

        cur.photoEditPrevSelectedRowEl = thisRowEl;

        photos._editUpdateSelectedCounter();

        cancelEvent(ev);
        return false;
    },

    MAX_DESC_INPUT_HEIGHT: 600,

    startEditPhotoDescription: function(event, refEl) {
        photos.stopEditPhotoDescription();

        var parentRowsContainerEl = gpeByClass('photos_edit_photos_container', refEl);
        var parentRowEl = hasClass(refEl, 'photos_photo_edit_row') ? refEl : gpeByClass('photos_photo_edit_row', refEl);

        var parentContEl = geByClass1('photos_photo_edit_row_desc_cont', parentRowEl);
        var placeholderEl = geByClass1('photos_photo_edit_row_desc_placeholder', parentRowEl);
        var inputEl = geByClass1('photos_photo_edit_row_desc_input', parentRowEl);

        val(inputEl, inputEl.getAttribute('data-orig-desc'));

        _updateInputSize(parentContEl, placeholderEl, inputEl);
        show(inputEl);

        addEvent(document, 'click', photos.stopEditPhotoDescription);

        removeEvent(inputEl, 'input');
        addEvent(inputEl, 'input', _updateInputSize.pbind(parentContEl, placeholderEl, inputEl));

        function _updateInputSize(parentContEl, placeholderEl, inputEl, ev) {
            var inputValue = clean(val(inputEl)).split('\n').join('</br>') + '&nbsp;';
            var tempEl = ce('div', {
                innerHTML: inputValue,
                className: 'photos_photo_edit_row_desc_input'
            }, {
                width: getSize(placeholderEl)[0],
                display: 'block',
                visibility: 'hidden'
            });
            parentContEl.appendChild(tempEl);
            var calcHeight = getSize(tempEl)[1] + (browser.msie ? 10 : 0);
            setStyle(inputEl, {
                height: Math.min(photos.MAX_DESC_INPUT_HEIGHT, Math.round(calcHeight))
            });
            re(tempEl);
        }

        inputEl.select();

        addClass(parentRowsContainerEl, 'photos_desc_editing');
        addClass(parentRowEl, 'photos_row_desc_editing');

        event && cancelEvent(event);
    },
    onEditPhotoDescriptionKeyPress: function(event) {
        switch (event.keyCode) {
            case 27: // Esc
                photos.stopEditPhotoDescription(null, true);
                break;
            case 9: // Tab
                photos.stopEditPhotoDescription(null, false);
                var rowEl = gpeByClass('photos_photo_edit_row', event.currentTarget);
                rowEl = domNS(rowEl);
                if (rowEl) {
                    photos.startEditPhotoDescription(null, rowEl);
                }
                cancelEvent(event);
                break;
        }
    },
    stopEditPhotoDescription: function(event, isCancel) {
        if (event && hasClass(event.target, 'photos_photo_edit_row_desc_input')) {
            return;
        }

        removeEvent(document, 'click', photos.stopEditPhotoDescription);

        var row;
        each(geByClass('photos_row_desc_editing'), function() {
            row = this;

            removeClass(row, 'photos_row_desc_editing');

            var placeholderEl = geByClass1('photos_photo_edit_row_desc_placeholder', row);
            var inputEl = geByClass1('photos_photo_edit_row_desc_input', row);
            var photoId = row.getAttribute('data-id');
            var editHash = row.getAttribute('data-edit-hash');

            var desc = '';
            if (isCancel) {
                desc = inputEl.getAttribute('data-orig-desc');
            } else {
                desc = trim(val(inputEl));
                var originalDesc = inputEl.getAttribute('data-orig-desc');
                if (desc != originalDesc) {
                    ajax.post('al_photos.php', {
                        act: 'save_desc',
                        photo: photoId,
                        hash: editHash,
                        text: desc,
                        edit: 1
                    }, {});
                }
                inputEl.setAttribute('data-orig-desc', desc);
                placeholderEl.titleSet = false;
            }

            val(placeholderEl, clean(desc) || getLang('photos_add_description_placeholder'));
            toggleClass(placeholderEl, 'photos_edit_has_desc', !!desc);

            hide(inputEl);
        });

        removeClass(gpeByClass('photos_edit_photos_container', row), 'photos_desc_editing');
    },

    updatePeriods: function() {
        cur.periods = geByClass('photos_period_delimiter', ge('photos_all_block'));
    },

    destroyPeriod: function() {
        if (cur.fixedPeriod) {
            re(cur.fixedPeriod);
            cur.fixedPeriod = false;
            cur.fixedPeriodEl = false;
        }
    },
    fixPeriod: function() {
        if (!ge('photos_albums_block')) return;

        photos.headerHeight = photos.headerHeight || getSize(ge('page_header_cont'))[1];
        if (cur.periods && cur.periods.length) {
            var scroll = vk.staticheader ? Math.max(scrollGetY(), photos.headerHeight) : scrollGetY() + photos.headerHeight;
            var fixed = false;
            var nextY = false;
            var periodHeight = getSize(cur.periods[0])[1];
            for (var i in cur.periods) {
                var y = getXY(cur.periods[i])[1];
                if (y >= scroll) {
                    break;
                }
                fixed = cur.periods[i];
                var ni = intval(i) + 1;
                if (cur.periods[ni]) {
                    nextY = getXY(cur.periods[ni])[1] - scroll;
                } else {
                    nextY = false;
                }
            }

            if (fixed && !cur.fileApiUploadStarted) {
                if (fixed == cur.fixedPeriodEl) {
                    setTimeout(function() {
                        setStyle(cur.fixedPeriod, {
                            left: getXY(fixed)[0] + 'px'
                        });
                    })
                } else {
                    if (cur.fixedPeriod) {
                        cur.fixedPeriod.innerHTML = fixed.innerHTML;
                    } else {
                        var fixPeriod = cur.fixedPeriod = ce('div', {
                            innerHTML: fixed.innerHTML,
                            className: 'photos_period_delimiter_fixed'
                        }, {
                            left: getXY(fixed)[0] + 'px'
                        })
                        ge('page_body').appendChild(cur.fixedPeriod);
                        (cur._back ? cur._back.hide : cur.destroy).push(function() {
                            re(fixPeriod);
                        });
                    }
                    cur.fixedPeriodEl = fixed;
                }
                var diff = (nextY !== false) ? nextY - periodHeight : 0;
                if (diff >= 0) {
                    diff = 0;
                }
                if (cur.fixedPeriodTop !== diff) {
                    setStyle(cur.fixedPeriod, {
                        top: diff + 'px'
                    });
                    cur.fixedPeriodTop = diff;
                }
            } else if (!fixed && cur.fixedPeriod) {
                re(cur.fixedPeriod);
                cur.fixedPeriod = false;
                cur.fixedPeriodEl = false;
            }
        }
    },
    scrollResize: function() {
        if (browser.mobile || cur.pvShown) return;

        var docEl = document.documentElement;
        var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
        var st = scrollGetY();
        var lnk = ge('ui_photos_load_more'),
            albums_lnk = ge('ui_albums_load_more'),
            tagged_lnk = ge('ui_tagged_load_more');

        var loadTriggerOffset = ch * 0.8;

        if (isVisible(lnk) && (lnk.offsetTop - (st + ch)) < loadTriggerOffset) {
            photos.load();
        }
        if (isVisible(albums_lnk) && cur.showAllAlbums && (albums_lnk.offsetTop - (st + ch)) < loadTriggerOffset) {
            photos.load(photos.LOAD_TYPE_ALBUMS);
        }
        if (isVisible(tagged_lnk) && cur.showAllTagged && (tagged_lnk.offsetTop - (st + ch)) < loadTriggerOffset) {
            photos.load(photos.LOAD_TYPE_TAGGED);
        }
        if (cur.fixPeriods) {
            photos.fixPeriod();
        }

        photos.updateEditHeaderPos();
    },
    initScroll: function() {
        cur.module = 'photos';

        photos.scrollnode = browser.msie6 ? pageNode : window;

        addEvent(photos.scrollnode, 'scroll', photos.scrollResize);
        addEvent(window, 'resize', photos.scrollResize);
        removeEvent(window, 'load', photos.initScroll);
        cur.destroy.push(function() {
            removeEvent(photos.scrollnode, 'scroll', photos.scrollResize);
            removeEvent(window, 'resize', photos.scrollResize);
        });
    },
    recache: function(from, delta) {
        if (cur.loading) {
            cur.loading = 1;
            setTimeout(photos.recache.pbind(from, delta), 100);
            return;
        }
        for (var i = cur.offset; ajaxCache['/' + nav.objLoc[0] + '#act=' + nav.objLoc.act + '&offset=' + i + '&part=1']; i += 20) {
            var a = ajaxCache['/' + nav.objLoc[0] + '#act=' + nav.objLoc.act + '&offset=' + i + '&part=1'];
            a[0] += delta;
            ajaxCache['/' + nav.objLoc[0] + '#act=' + nav.objLoc.act + '&offset=' + (i + delta) + '&part=1'] = a;
            delete(ajaxCache['/' + nav.objLoc[0] + '#act=' + nav.objLoc.act + '&offset=' + i + '&part=1']);
        }
        cur.offset += delta;
    },
    loaded: function(off, rows, privacy, type) {
        if (!type) {
            cur.loading = 0;
        }

        var cont, more, from, offset, opts, count;

        type = type || photos.LOAD_TYPE_PHOTOS;
        switch (type) {
            case photos.LOAD_TYPE_TAGGED:
                cur.taggedOffset = off;
                from = cur.moreFromTagged;
                opts = cur.moreTaggedOpts,
                    offset = cur.taggedOffset;
                break;

            case photos.LOAD_TYPE_ALBUMS:
                cur.albumsOffset = off;
                from = cur.moreFromAlbums,
                    opts = cur.moreAlbumsOpts,
                    offset = cur.albumsOffset;
                count = cur.albumsCount;
                break;

            default:
                cur.offset = off;
                from = cur.moreFrom;
                opts = cur.moreOpts;
                offset = cur.offset;
                count = cur.count;
        }

        cont = ge('photos_container_' + type);
        more = ge('ui_' + type + '_load_more');

        var d = ce('div', {
            innerHTML: trim(rows)
        });
        while (d.firstChild) {
            if (hasClass(d.firstChild, 'photos_period_delimiter')) {
                var delimiterYear = d.firstChild.getAttribute('data-year');
                if (geByClass1('photos_period_delimiter_' + delimiterYear)) {
                    re(d.firstChild);
                    continue;
                }
            }
            if (cur.photoEditSelectedAll) {
                addClass(d.firstChild, 'photos_edit_selected');
            }
            cont.appendChild(d.firstChild);
        }
        if (privacy) {
            extend(cur.privacy, privacy);
        }

        if (type == photos.LOAD_TYPE_PHOTOS) {
            photos.updatePeriods();
        }

        if (off >= count || !rows) {
            hide(more);
            return;
        }
        if (type == photos.LOAD_TYPE_PHOTOS) {
            return;
        }
        cur.loading = 1;
        ajax.post(from, extend({
            offset: offset,
            part: 1
        }, opts || {}), {
            cache: 1,
            onDone: function() {
                if (cur.loading == 2) {
                    photos.loaded.apply(window, arguments);
                } else {
                    cur.loading = false;
                }
            },
            onFail: function() {
                cur.loading = 0;
                return true;
            }
        });
    },
    load: function(forceType) {
        var more, from, opts, offset;

        forceType = forceType || photos.LOAD_TYPE_PHOTOS;
        switch (forceType) {
            case photos.LOAD_TYPE_PHOTOS:
                more = ge('ui_photos_load_more');
                from = cur.moreFrom;
                opts = cur.moreOpts;
                offset = cur.offset;
                break;

            case photos.LOAD_TYPE_TAGGED:
                more = ge('ui_tagged_load_more');
                from = cur.moreFromTagged;
                opts = cur.moreTaggedOpts;
                offset = cur.taggedOffset;
                break;

            case photos.LOAD_TYPE_ALBUMS:
                more = ge('ui_albums_load_more');
                from = cur.moreFromAlbums;
                opts = cur.moreAlbumsOpts;
                offset = cur.albumsOffset;
        }

        if (!from) {
            return;
        }

        if (!isVisible(more) || isButtonLocked(more)) return;

        if (cur.loading) {
            cur.loading = 2;
            return;
        }

        if (forceType == photos.LOAD_TYPE_PHOTOS && opts) {
            cur.loading = 1;
        }

        ajax.post(from, extend({
            offset: offset,
            part: 1
        }, opts || {}), {
            onDone: photos.loaded,
            onFail: function() {
                cur.loading = 0;
                return true;
            },
            showProgress: function() {
                lockButton(more);
            },
            hideProgress: function() {
                unlockButton(more);
            },
            cache: 1
        });
    },
    loadMoreButtonClick: function(type) {
        switch (type) {
            case photos.LOAD_TYPE_ALBUMS:
                cur.showAllAlbums = true;
                break;
            case photos.LOAD_TYPE_TAGGED:
                cur.showAllTagged = true;
                break;
        }
        this.load(type);
    },
    reorderAlbums: function(album, before, after) {
        var album_id = album.id.replace('album', '');
        var before_id = (before && before.id || '').replace('album', '');
        var after_id = (after && after.id || '').replace('album', '');
        ajax.post('al_photos.php', {
            act: 'reorder_albums',
            album: album_id,
            before: before_id,
            after: after_id,
            hash: cur.reorderHash
        });
    },
    reorderPhotos: function(photo, before, after) {
        var needle = (nav.objLoc.act == 'edit') ? 'photo_edit_row_' : 'photo_row_';
        var photo_id = photo.id.replace(needle, '');
        var before_id = (before && before.id || '').replace(needle, '');
        var after_id = (after && after.id || '').replace(needle, '');
        var rev = domData(ge('photos_container_photos'), 'rev');

        if (!rev) {
            rev = nav.objLoc.rev;
        } else {
            rev = rev === '1' ? 1 : '';
        }

        ajax.post('al_photos.php', {
            act: 'reorder_photos',
            photo: photo_id,
            before: before_id,
            after: after_id,
            rev: rev,
            hash: cur.reorderHash
        });
    },
    privacy: function(key) {
        if (key == 'photos_move') {
            var val = Privacy.getValue(key);
            val = val.split('_');
            val = val[2];
            if (val != cur.album.split('_')[1]) {
                photos.movePhoto(val);
            }
            return true;
        }

        var m = key.match(/^album(\d+)/);
        if (!m) return;

        var el = ge('album' + vk.id + '_' + m[1]);
        if (!el) return;

        if (el.helper) {
            var sz = getSize(el);
            if (sz[0] != el.w || sz[1] != el.h) {
                setStyle(el.helper, {
                    width: sz[0],
                    height: sz[1] - ge('photos_container').sorter.dh
                });
                extend(el, {
                    x: el.x - el.w / 2 + sz[0] / 2,
                    w: sz[0],
                    y: el.y - el.h / 2 + sz[1] / 2,
                    h: sz[1]
                });
                for (var e = el.nextSibling; e && e.nextSibling; e = e.nextSibling.nextSibling) {
                    setStyle(e.nextSibling, {
                        left: e.offsetLeft,
                        top: e.offsetTop
                    });
                }
            }
        }

        clearTimeout(cur['privacy_timer_' + key]);
        cur['privacy_timer_' + key] = setTimeout(ajax.post.pbind('al_friends.php', {
            act: 'save_privacy',
            key: key,
            val: Privacy.getValue(key),
            hash: cur.privacyHash
        }), 500);
    },

    deleteAlbum: function(album, hash) {
        showFastBox({
                title: getLang('photos_deleting_album'),
                dark: 1,
                bodyStyle: 'padding: 20px;'
            },
            getLang('photos_sure_del_album'),
            getLang('global_delete'),
            function(btn) {
                ajax.post('al_photos.php', {
                    act: 'delete_album',
                    album: album,
                    hash: hash
                }, {
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                })
            },
            getLang('global_cancel')
        );
    },
    showSaved: function(id, color) {
        var msg = ge(id),
            anim = function() {
                setTimeout(animate.pbind(msg, {
                    backgroundColor: color,
                    borderLeftColor: '#D8DFEA',
                    borderRightColor: '#D8DFEA',
                    borderTopColor: '#D8DFEA',
                    borderBottomColor: '#D8DFEA'
                }, 1000), 1000);
            };
        if (isVisible(msg)) {
            animate(msg, {
                backgroundColor: '#E7F1F9',
                borderLeftColor: '#4C96D4',
                borderRightColor: '#4C96D4',
                borderTopColor: '#4C96D4',
                borderBottomColor: '#4C96D4'
            }, 200, anim);
        } else {
            show(msg);
            anim();
        }
    },
    saveAlbum: function(btn) {
        var params = {
            act: 'save_album',
            album: cur.album,
            hash: cur.albumhash,
            title: ge('album_title').value,
            desc: ge('album_description').value
        };
        if (!params.title) return notaBene('album_title');
        var album_id = cur.album.replace(vk.id + '_', '');
        if (cur.privacy['album' + album_id]) {
            extend(params, {
                view: Privacy.getValue('album' + album_id),
                comm: Privacy.getValue('albumcomm' + album_id)
            });
        } else if (ge('album_only_check')) {
            extend(params, {
                main: isChecked('album_main_check'),
                only: isChecked('album_only_check'),
                comm: isChecked('album_comments_check')
            });
        }
        ajax.post('al_photos.php', params, {
            onDone: function() {
                var main = ge('album_main_check');
                if (main && isChecked(main)) {
                    addClass(main, 'on');
                    addClass(main, 'disabled');
                    hide('album_delete_action');
                }
                var savedInfoEl = ge('photos_changes_saved');
                setStyle(savedInfoEl, {
                    opacity: 1
                });
                setTimeout(function() {
                    setStyle(savedInfoEl, {
                        opacity: 0
                    });
                }, 1500);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    savePhotos: function() {
        var params = {
                act: 'save_photos',
                album: cur.album,
                hash: cur.albumhash
            },
            cont = ge('photos_container'),
            i = 0;
        for (var el = cont.firstChild; el; el = el.nextSibling) {
            if (!el.firstChild || !isVisible(el.firstChild)) continue;

            var id = el.id.replace('photo_edit_row', '');
            params['photo_id' + i] = id;
            params['photo_desc' + i] = ge('photo_caption' + id).value;
            ++i;
        }
        ajax.post('al_photos.php', params, {
            onDone: function() {
                for (var el = cont.firstChild; el; el = el.nextSibling) {
                    if (!el.firstChild || !isVisible(el.firstChild)) continue;

                    var id = el.id.replace('photo_edit_row', '');
                    ge('photo_save_result' + id).innerHTML = getLang('photos_privacy_description');
                }
                cur.descs = false;
                scrollToTop(200);
                photos.showSaved('photos_saved_msg', '#F3F8FC');
                if (ge('photos_container').sorter) {
                    sorter.update(ge('photos_container').sorter.elems[0]);
                }
            },
            progress: 'photos_save_progress'
        });
    },
    deleteSelectedPhotos: function(hash) {
        var deletingPhotos = [];
        each(geByClass('photos_edit_selected'), function() {
            deletingPhotos.push(this.getAttribute('data-id'));
        });

        var all = intval(photos._editGetSelectedCount() > deletingPhotos.length);
        var albumId = cur.album.split('_');

        showBox('/al_photos.php', {
            act: 'delete_selected_box',
            Photo_ids: all ? '' : deletingPhotos.join(','),
            owner_id: albumId[0],
            album_id: albumId[1],
            all: all
        }, {
            onDone: function() {
                var box = curBox();
                box.removeButtons();
                box.addButton(getLang('photos_del_selected_box_yes'), function(btn) {
                    show('photos_del_box_progress');
                    hide('photos_del_box_text');

                    re(btn);

                    var progressText = ge('photos_del_box_progress_text');

                    photos.doEditBatchProcess({
                            act: 'delete_photos',
                            hash: hash,
                            owner_id: albumId[0],
                            album_id: albumId[1],
                        },
                        cur.editDeletePhotosArray,
                        ge('photos_del_box_progress_wrap'),
                        'photos_del_selected_title_progress',
                        function(cnt, data, chunkArray, doneCount, total) {
                            val(progressText, getLang('photos_del_selected_box_text_progress').replace('{count}', doneCount).replace('{total}', total));

                            cur.count = Math.max(cur.count - cnt, 0);

                            each(chunkArray, function(i, photoId) {
                                re('photo_edit_row_' + photoId);
                                cur.count = Math.max(cur.count, 0);
                            });
                            photos._editUpdateSelectedCounter();
                        },
                        function() {
                            var box = curBox();
                            box && box.hide();

                            if (cur.count == 0) {
                                nav.reload();
                            } else {
                                var shownRowsCount = geByClass('photos_photo_edit_row').length;
                                if (shownRowsCount < 40) {
                                    photos.load();
                                }
                            }
                        }
                    );
                });
                box.addButton(getLang('box_cancel'), function() {
                    box.hide();
                    cur.editDeletePhotosArray = false;
                }, 'no');
            }
        });
    },
    doEditBatchProcess: function(queryAdd, photoArrayStr, progressEl, titleLang, onProgress, onEnd) {
        var photoArray = photoArrayStr.split(',');
        var total = photoArray.length;
        var CHUNK_SIZE = cur.editPhotosMaxChunkSize || 50;
        var chunksTotal = Math.ceil(total / CHUNK_SIZE);

        var progressBarEl = geByClass1('photos_progress_bar', ge(progressEl)) || geByClass1('ui_progress_bar', ge(progressEl));

        var doneCount = 0;
        var prevTitle = document.title;
        var box = curBox();

        function sendNextChunk(chunkIndex) {
            if (!box.isVisible()) {
                onEnd(doneCount);
                setDocumentTitle(prevTitle);
                return;
            }

            var chunkArray = photoArray.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
            ajax.post('/al_photos.php', extend({
                photos: chunkArray.join(',')
            }, queryAdd), {
                onDone: function(cnt, data, hash) {
                    doneCount += cnt;

                    chunkIndex++;

                    setStyle(progressBarEl, {
                        width: (100 * chunkIndex / chunksTotal) + '%'
                    });

                    var title = getLang(titleLang).replace('{count}', doneCount).replace('{total}', total);
                    setDocumentTitle(title);

                    onProgress(cnt, data, chunkArray, doneCount, total, hash);

                    if (chunkIndex < chunksTotal) {
                        sendNextChunk(chunkIndex);
                    } else {
                        setTimeout(function() {
                            setDocumentTitle(prevTitle);
                            onEnd(doneCount, data);
                        }, 200); // show progress for a while
                    }
                }
            });
        }

        onProgress(0, false, [], 0, total);

        sendNextChunk(0);
    },

    _showProgressPanel: function(itemEl) {
        var progressEl = se('<div class="photo_mask_progress _photo_mask_progress"><div class="round_spinner"></div></div>');
        itemEl.appendChild(progressEl);
        return progressEl;
    },

    _hideProgressPanel: function(itemEl) {
        re(geByClass1('_photo_mask_progress', itemEl));
    },

    deletePhoto: function(photoId, hash, ref, event) {
        var el;

        if (photoId === '' && ref) {
            el = gpeByClass('photos_photo_edit_row', ref);
            photoId = attr(el, 'data-id');
            hash = attr(el, 'data-edit-hash');
        }

        el = el || ge('photo_edit_row_' + photoId);
        if (!el) return;

        var progressEl = photos._showProgressPanel(el);
        addClass(el, 'photos_deleted');

        ajax.post('al_photos.php', {
            act: 'delete_photo',
            photo: photoId,
            hash: hash,
            edit: 1
        }, {
            onDone: function(html) {
                re(progressEl);

                el.appendChild(se(html));

                photos.recache(cur.offset, -1);
                cur.count -= 1;

                photos._editUpdateSelectedCounter();

                if (cur.count < 2) {
                    hide('album_thumb_action');
                }

                if (ge('photos_go_to_album_cont') && !cur.count) {
                    hide('photos_go_to_album_cont');
                }

                if (cur.photoAddUpdate) {
                    cur.photoAddUpdate(el);
                }

                if (cur.introTooltipHide) {
                    cur.introTooltipHide(true);
                }
            }
        });

        return cancelEvent(event);
    },
    restorePhoto: function(btn, photo, hash) {
        var el = ge('photo_edit_row_' + photo);
        if (!el || !hasClass(el, 'photos_deleted')) return;

        var progressEl = photos._showProgressPanel(el);

        re(geByClass1('photos_restore', el));

        ajax.post('al_photos.php', {
            act: 'restore_photo',
            photo: photo,
            hash: hash,
            edit: 1
        }, {
            onDone: function() {
                re(progressEl);
                removeClass(el, 'photos_deleted');

                photos.recache(cur.offset, 1);
                cur.count += 1;

                photos._editUpdateSelectedCounter();

                if (cur.count > 1) {
                    show('album_thumb_action');
                }

                if (ge('photos_go_to_album_cont') && cur.count) {
                    show('photos_go_to_album_cont');
                }

                if (cur.photoAddUpdate) {
                    cur.photoAddUpdate(el);
                }
            },
            progress: 'photo_restore_progress' + photo
        });
    },
    toggleMoveToAlbumMode: function(toNew, event) {
        var searchEl = ge('photos_move_box_search');
        var albumsCont = ge('pv_move_to_album_cont');
        var newAlbumForm = ge('photos_box_edit_data');
        var box = curBox();
        var titleEl = geByClass1('box_title', box.titleWrap);

        if (toNew) {
            hide(searchEl);
            hide(albumsCont);
            show(newAlbumForm);

            box.setOptions({
                width: 500
            });

            var title = getLang('photos_move_to_new_album_title');

            if (!cur.noAlbums) {
                title += '<span class="divider">|</span><a onclick="return photos.toggleMoveToAlbumMode(false, event)" href="" class="toggle">' + getLang('photos_move_to_another_album_toggle') + '</a>';
            }

            val(titleEl, title);

            box.removeButtons().addButton(getLang('photos_create_album_and_move'), cur.saveNewAlbum).addButton(getLang('global_cancel'), box.hide, 'no');

            cur.onNewAlbumDone = function(newAlbumId) {
                curBox().hide();

                photos.movePhotosBox(cur.editPhotosArray.split(','), false, function() {
                    setTimeout(function() {
                        var albumEl = ge('album' + newAlbumId);
                        photos.doMovePhotos(false, albumEl);
                    });
                });
            }
        } else {
            show(searchEl);
            show(albumsCont);
            hide(newAlbumForm);

            box.setOptions({
                width: 795
            });

            val(titleEl, getLang('photos_move_box_title') +
                '<span class="divider">|</span><a onclick="return photos.toggleMoveToAlbumMode(true, event)" href="" class="toggle">' + getLang('photos_move_to_new_album') + '</a>');

            box.removeButtons().addButton(getLang('global_cancel'), box.hide);
        }

        return cancelEvent(event);
    },
    showMove: function(photo, hash, ev) {
        var dd = cur.moveddc,
            lnk = ge('photos_move_link' + photo);
        if (cur.privacyPhotoMove) {
            Privacy.show(lnk, ev, 'photos_move');
        } else {
            if (cur.zIndexUpdated) {
                photos.hideMove();
                cur.noZIndexUpdate = true;
            }
            if (ge('photo_edit_row' + photo)) {
                cur.zIndexUpdated = photo;
                setStyle(ge('photo_edit_row' + photo), {
                    zIndex: 150
                });
            }
            photos.hideMove();
        }
        extend(cur, {
            movelnk: lnk,
            moveph: photo,
            movehash: hash
        });
        if (cur.privacyPhotoMove) return;
        lnk.parentNode.replaceChild(dd, lnk);
        cur.movedd.focus();
        cur.movedd.showDefaultList();
        addEvent(document, 'click', photos.hideMove);
    },
    hideMove: function() {
        if (cur.noZIndexUpdate) {
            delete cur.noZIndexUpdate;
            return;
        }
        if (cur.privacyPhotoMove) return;
        if (cur.movelnk) {
            try {
                cur.moveddc.parentNode.replaceChild(cur.movelnk, cur.moveddc);
                cur.movelnk = false;
                cur.movedd.clear();
                if (cur.zIndexUpdated && ge('photo_edit_row' + cur.zIndexUpdated)) {
                    setStyle(ge('photo_edit_row' + cur.zIndexUpdated), {
                        zIndex: 100
                    });
                    delete cur.zIndexUpdated;
                }
            } catch (e) {}
        }
        removeEvent(document, 'click', photos.hideMove);
    },
    movePhoto: function(album, photo, hash) {
        album = intval(album);
        var showPrg = show.pbind('photo_return_progress' + photo),
            hidePrg = hide.pbind('photo_return_progress' + photo);
        if (!photo) {
            if (!album || album == cur.album.split('_')[1]) {
                return photos.hideMove();
            }
            photo = cur.moveph;
            hash = cur.movehash;
            showPrg = function() {
                hide('photo_delete_link' + photo);
                show('photo_edit_progress' + photo);
            };
            hidePrg = function() {
                hide('photo_edit_progress' + photo);
                show('photo_delete_link' + photo);
            };
        }
        ajax.post('al_photos.php', {
            act: 'move_photo',
            album: album,
            photo: photo,
            hash: hash
        }, {
            onDone: function(text) {
                var el = ge('photo_edit_row' + photo);
                if (!el || !el.firstChild) return;

                if (album == cur.album.split('_')[1]) {
                    if (isVisible(el.firstChild)) return;

                    el.removeChild(el.firstChild.nextSibling);
                    show(el.firstChild);

                    photos.recache(cur.offset, 1);
                    ++cur.count;
                    if (cur.count > 1) {
                        show('album_thumb_action');
                    }
                } else {
                    if (!isVisible(el.firstChild)) return;

                    photos.hideMove();

                    hide(el.firstChild);
                    el.appendChild(ce('div', {
                        innerHTML: text
                    }));

                    photos.recache(cur.offset, -1);
                    --cur.count;
                    if (cur.count < 2) {
                        hide('album_thumb_action');
                    }
                }
                if (cur.photoAddUpdate) {
                    cur.photoAddUpdate(el);
                }
                if (cur.introTooltipHide) {
                    cur.introTooltipHide(true);
                }
                if (ge('photos_go_to_album_cont')) {
                    toggle('photos_go_to_album_cont', !!cur.count);
                }
            },
            onFail: function(text) {
                photos.hideMove();
                if (text) {
                    setTimeout(showFastBox({
                        title: getLang('global_error'),
                        dark: 1,
                        bodyStyle: 'padding: 20px;'
                    }, text).hide, 2000);
                    return true;
                }
            },
            showProgress: showPrg,
            hideProgress: hidePrg
        });
    },
    updateThumbs: function(thumbSrc, sizes) {
        var thumb = ge('photos_add_img' + cur.peEditPhoto);
        if (thumb) {
            thumb.src = thumbSrc;
        }
    },
    editPhoto: function(photo_raw, hash, event) {
        cur.peEditPhoto = photo_raw;
        showBox('al_photos.php', {
            act: 'edit_photo',
            photo: photo_raw,
            webgl: 1,
            stat: ['ui_controls.css', 'ui_controls.js']
        }, {
            dark: 1
        });
    },
    backupDesc: function(photo) {
        if (!cur.descs) cur.descs = {};
        cur.descs[photo] = trim(ge('photo_caption' + photo).value);
    },
    saveDesc: function(photo, hash) {
        var dsc = ge('photo_caption' + photo).value,
            old = cur.descs[photo];
        delete cur.descs[photo];
        if (trim(dsc) == old) return;

        ajax.post('al_photos.php', {
            act: 'save_desc',
            photo: photo,
            hash: hash,
            text: dsc,
            edit: 1
        }, {
            onDone: function(text) {
                ge('photo_save_result' + photo).innerHTML = text;
            },
            onFail: function(text) {
                ge('photo_save_result' + photo).innerHTML = '<div class="photo_save_error">' + text + '</div>';
                return true;
            },
            showProgress: function() {
                ge('photo_save_result' + photo).innerHTML = getLang('photos_privacy_description');
                show('photo_save_progress' + photo);
            },
            hideProgress: function() {
                hide('photo_save_progress' + photo);
            }
        });
    },

    genFile: function(i, oncancel, cancel) {
        return ce('div', {
            innerHTML: '\
<a class="photo_file_cancel" id="photo_cancel' + i + '" onclick="' + oncancel + '">' + cancel + '</a>\
<div class="photo_file_button">\
  <div class="file_button_gray">\
    <div class="file_button" id="photo_file_button' + i + '">' + getLang('photos_choose_file') + '</div>\
  </div>\
</div>\
    '
        });
    },
    initFile: function(i) {
        FileButton.init('photo_file_button' + i, {
            name: 'photo',
            id: 'photo_file' + i,
            accept: 'image/jpeg,image/png,image/gif',
            onchange: photos.fileSelected
        });
    },
    addFile: function() {
        var i = cur.files.length,
            el = photos.genFile(i, 'photos.fileCancel(' + i + ')', getLang('global_cancel'));
        extend(el, {
            className: 'photo_upload_file',
            id: 'photo_upload_row' + i
        });
        ge('photo_upload_files').appendChild(el);
        photos.initFile(i);
        cur.files.push({});
    },
    filesLoad: function() { // for opera mini
        var i = 0,
            j = 0;
        for (; i < cur.files.length; ++i) {
            var val = ge('photo_file' + i).value;
            if (val) break;
        }
        if (i == cur.files.length) return;

        cur.allcont = utilsNode.appendChild(ce('div', {
            innerHTML: '\
<iframe name="photo_frame_all"></iframe>\
<form target="photo_frame_all" id="photo_form_all" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '
        })), form = ge('photo_form_all');
        var fields = extend(cur.fields, {
            act: 'do_add',
            al: 1,
            from_host: locHost,
            ondone: 'photos.filesDone',
            onfail: 'photos.filesFail'
        });
        for (j in fields) {
            form.appendChild(ce('input', {
                name: j,
                value: fields[j]
            }));
        }
        for (i = 0, j = 0; i < cur.files.length; ++i) {
            var f = ge('photo_file' + i);
            if (f.value) {
                f.name = 'file' + j;
                form.appendChild(f);
                ++j;
            }
        }
        form.submit();
    },
    fileSelected: function() {
        var i = intval(this.id.replace('photo_file', ''));
        if (!cur.files[i].deleting && (cur.files[i].cont || cur.files[i].id)) return;

        cur['fileDone' + i] = photos.fileDone.pbind(i);
        cur['fileFail' + i] = photos.fileFail.pbind(i);

        cur.files[i].cont = utilsNode.appendChild(ce('div', {
            innerHTML: '\
<iframe name="photo_frame' + i + '"></iframe>\
<form target="photo_frame' + i + '" id="photo_form' + i + '" method="POST" action="' + cur.url + '" enctype="multipart/form-data"></form>\
    '
        })), form = ge('photo_form' + i);
        var fields = extend(cur.fields, {
            act: 'do_add',
            al: 1,
            from_host: locHost,
            ondone: 'cur.fileDone' + i,
            onfail: 'cur.fileFail' + i
        });
        for (var j in fields) {
            form.appendChild(ce('input', {
                name: j,
                value: fields[j]
            }));
        }
        form.appendChild(this);
        form.submit();

        var btn = ge('photo_file_button' + i);
        lockButton(btn);
        setTimeout(function() {
            btn.innerHTML = btn.innerHTML; // opera hack for redraw
        }, 0);
        show('photo_cancel' + i);
        ge('photo_cancel' + i).innerHTML = getLang('global_cancel');
        if (i == cur.files.length - 1) photos.addFile();
    },
    fileDone: function(i, res) {
        hide('photo_cancel' + i);
        var before = '';
        for (var j = i + 1; j < cur.files.length; ++j) {
            if (cur.files[j].id && !cur.files[j].deleting) {
                before = cur.files[j].id;
                break;
            }
        }
        setTimeout(ajax.post.pbind('al_photos.php', extend({
            act: 'done_add',
            before: before,
            context: 1
        }, q2ajx(res)), {
            onDone: function(id, html) {
                if (!id) return photos.fileFail(i, 0);

                cur.files[i].cont.innerHTML = '';
                utilsNode.removeChild(cur.files[i].cont);
                extend(cur.files[i], {
                    id: id,
                    deleting: false,
                    cont: false
                });

                ge('photo_upload_row' + i).innerHTML = html;
                autosizeSetup('photo_caption' + id, {
                    minHeight: 30
                });
                show('photo_delete' + id);
            },
            onFail: function(text) {
                if (text) {
                    setTimeout(showFastBox({
                        title: getLang('global_error'),
                        dark: 1,
                        bodyStyle: 'padding: 20px;'
                    }, text).hide, 3000);
                    photos.fileCancel(i);
                    return true;
                }
            }
        }), 0);
    },
    fileCancel: function(i, cleaning) {
        if (cur.files[i].cont) {
            cur.files[i].cont.innerHTML = '';
            utilsNode.removeChild(cur.files[i].cont);
        }
        if (cleaning) return;

        var btn = ge('photo_file_button' + i);
        unlockButton(btn);
        btn.innerHTML = getLang('photos_choose_file');
        cur.files[i] = {};
        photos.initFile(i);
        hide('photo_cancel' + i);
    },
    fileFail: function(i, code) {
        photos.fileCancel(i);
    },
    fileDelete: function(id, hash) {
        var i = 0;
        for (; i < cur.files.length && cur.files[i].id != id;) {
            ++i;
        }
        if (i == cur.files.length || cur.files[i].deleting) return;
        cur.files[i].deleting = true;
        ajax.post('al_photos.php', {
            act: 'delete_photo',
            photo: id,
            hash: hash,
            edit: 2
        }, {
            onFail: function() {
                cur.files[i].deleting = false;
            }
        });
        var er = ge('photo_edit_row' + id);
        er.parentNode.insertBefore(photos.genFile(i, 'photos.fileRestore(\'' + id + '\', \'' + hash + '\')', getLang('global_restore')), er);
        hide(er);
        photos.initFile(i);
        show('photo_cancel' + i);
    },
    fileRestore: function(id, hash) {
        var i = 0,
            before = '';
        for (; i < cur.files.length && cur.files[i].id != id;) {
            ++i;
        }
        if (i == cur.files.length || !cur.files[i].deleting || cur.files[i].deleting === -1) return;
        if (cur.files[i].cont) {
            return photos.fileCancel(i);
        }
        for (var j = i + 1; j < cur.files.length; ++j) {
            if (cur.files[j].id && !cur.files[j].deleting) {
                before = cur.files[j].id;
                break;
            }
        }
        cur.files[i].deleting = -1;
        ajax.post('al_photos.php', {
            act: 'restore_photo',
            photo: id,
            hash: hash,
            before: before,
            edit: 2
        }, {
            onDone: function() {
                cur.files[i].deleting = false;
            }
        });
        var er = ge('photo_edit_row' + id);
        show(er);
        re(er.previousSibling);
    },
    filesDone: function(res) {
        setTimeout(ajax.post.pbind('al_photos.php', extend({
            act: 'done_add',
            context: 2
        }, q2ajx(res))), 0);
    },
    filesFail: function() {
        for (var i = 0; i < cur.files.length; ++i) {
            photos.fileCancel(i);
        }
        cur.allcont.innerHTML = '';
        utilsNode.removeChild(cur.allcont);
        cur.allcont = false;
    },

    chooseFlash: function() {
        if (browser.flash < 10) {
            return animate(ge('photo_flash_needed'), {
                backgroundColor: '#FFEFE8',
                borderBottomColor: '#E89B88',
                borderLeftColor: '#E89B88',
                borderRightColor: '#E89B88',
                borderTopColor: '#E89B88'
            }, 100, function() {
                animate(ge('photo_flash_needed'), {
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#CCCCCC',
                    borderLeftColor: '#CCCCCC',
                    borderRightColor: '#CCCCCC',
                    borderTopColor: '#CCCCCC'
                }, 500);
            });
        }
        cur.photoCheckFails = 0;
        show('photo_flash_upload');
        hide('photo_default_upload');
        hide('photo_upload_unavailable');
    },
    chooseDefault: function() {
        cur.photoCheckFails = 0;
        show('photo_default_upload');
        hide('photo_flash_upload');
        if (cur.serverChecked) {
            show('photo_upload_files');
            hide('photo_default_check');
        } else {
            hide('photo_upload_files');
            show('photo_default_check');
            cur.checkUpload();
        }
    },
    flashWidth: function() {
        if (_ua.indexOf('Mac') != -1 && (_ua.indexOf('Opera') != -1 || _ua.indexOf('Firefox') != -1)) return '601';
        return '600';
    },

    activeTab: function(el) {
        var p = domPN(domPN(el));
        for (var i = domFC(p); i; i = domNS(i)) {
            removeClass(i, 'active_link');
        }
        addClass(domPN(el), 'active_link');
    },

    checkHtml5Uploader: function() {
        return (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
    },

    upload: function(obj, ev) {
        if (ev && (ev.button == 2 || ev.ctrlKey)) {
            if (photos.checkHtml5Uploader()) {
                obj.href += '&html5=1';
            }
            return true;
        }
        if (cur.uplId !== undefined && window.Upload && Upload.checked && Upload.checked[cur.uplId] && photos.checkHtml5Uploader()) {
            ge('photos_upload_input').click();
            return false;
        }
        return true;
    },

    uploadLink: function(obj, ev) {
        if (photos.checkHtml5Uploader()) {
            obj.href += '&html5=1';
        }
        return nav.go(obj, ev);
    },

    onUploadSelect: function(files) {
        if (!ge('photos_upload_area')) return;
        window.filesToUpload = files;
        var back = ge('photos_upload_area').innerHTML;
        ge('photos_upload_area').innerHTML = '<img src="/images/upload.gif">';
        nav.go(ge('photos_upload_area').href + '&html5=1', false, {
            onFail: function(text) {
                ge('photos_upload_area').innerHTML = back;
                setTimeout(showFastBox({
                    title: getLang('global_error'),
                    dark: 1,
                    bodyStyle: 'padding: 20px;'
                }, text).hide, 3000);
                return true;
            }
        });
    },

    thumbOver: function(obj, id, show) {
        if (cur.hideTO && cur.hideTO[id]) {
            clearTimeout(cur.hideTO[id]);
        }
        var desc = geByClass1('description', obj),
            title = geByClass1('photo_album_title', obj),
            descY = getSize(desc)[1];
        animate(title, {
            marginTop: 163 - (descY ? descY + 7 : 0)
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        });
        var back = geByClass1('photo_album_info_back', obj),
            cont = geByClass1('photo_album_info_cont', obj);
        if (!back || !cont) return;
        if (back.over && !show) {
            back.over = 0;
            return;
        }
        var bo = show ? 0.6 : 0.5,
            co = show ? 1 : 0.8;
        if (show) back.over = 1;
        animate(back, {
            opacity: bo
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        });
        animate(cont, {
            opacity: co
        }, {
            duration: 200,
            transition: Fx.Transitions.easeOutCirc
        });
    },

    thumbOut: function(obj, id, hide) {
        var back = geByClass1('photo_album_info_back', obj),
            cont = geByClass1('photo_album_info_cont', obj);
        var doHide = function() {
            if (hide) {
                var desc = geByClass1('description', obj),
                    title = geByClass1('photo_album_title', obj);
                animate(title, {
                    marginTop: 163
                }, 200);
            }
            if (!back || !cont) return;
            var bo = hide ? 0 : 0.5,
                co = hide ? 0 : 0.8;
            animate(back, {
                opacity: bo
            }, 200);
            animate(cont, {
                opacity: co
            }, 200);
        }
        if (hide) {
            cur.hideTO = cur.hideTO || {};
            cur.hideTO[id] = setTimeout(doHide, 150);
        } else doHide();
    },

    openEditor: function(ref, event) {
        stManager.add(['photoview.js', 'photoview.css'], function() {
            var rowEl = gpeByClass('photos_photo_edit_row', ref);
            cur.onPESave = function(thumb) {
                curBox().hide();
                setStyle(geByClass1('photos_photo_edit_row_thumb', rowEl), 'background-image', 'url(\'' + thumb + '\')');
                cur.onPESave = false;
                bodyNode.style.overflow = 'auto';
            }
            var photoId = rowEl.getAttribute('data-id');
            Photoview.openEditor(photoId, cur.savedThumbs ? cur.savedThumbs[photoId] : rowEl.getAttribute('data-thumb'));
        });

        return cancelEvent(event);
    },

    addToAlbum: function() {
        cur.isPhotoUpload = true;
        photos.movePhotosBox(cur.savedPhotos || [], false);
    },

    movePhotosBox: function(photoId, ref, onDone, event) {
        var movingPhotos = [],
            all = false;

        if (isArray(photoId)) {
            movingPhotos = photoId;

        } else {
            if (photoId === '' && ref) {
                photoId = gpeByClass('photos_photo_edit_row', ref).getAttribute('data-id');
            }

            if (photoId) {
                movingPhotos.push(photoId);
            } else {
                each(geByClass('photos_edit_selected'), function() {
                    movingPhotos.push(this.getAttribute('data-id'));
                });
            }

            all = intval(photos._editGetSelectedCount() > movingPhotos.length);
        }

        var albumId = cur.album ? cur.album.split('_') : [vk.id];

        showBox('/al_photos.php', {
            act: 'a_move_to_album_box',
            photo_ids: all ? '' : movingPhotos.join(','),
            owner_id: albumId[0],
            from_album_id: albumId[1],
            all: all
        }, {
            onDone: onDone
        });

        return cancelEvent(event);
    },
    cancelMove: function(ev, ref, photoId, fromAlbumId, toAlbumId, ownerId, hash) {
        var el = gpeByClass('photos_photo_edit_row', ref);

        re(geByClass1('photos_cancel_move', el));
        photos._showProgressPanel(el);

        ajax.post('al_photos.php', {
            act: 'move_photos',
            photos: photoId,
            to_album_id: fromAlbumId,
            from_album_id: toAlbumId,
            hash: hash,
            owner_id: ownerId
        }, {
            onDone: function() {
                photos._hideProgressPanel(el);
                cur.count++;
                photos._editUpdateSelectedCounter();
            }
        });

        cancelEvent(ev);
    },
    doMovePhotos: function(ev, ref, isAll) {
        var albumEl = domClosest('_photos_album', ref);

        var toAlbumId = domData(albumEl, 'aid');
        var fromAlbumId = domData(albumEl, 'from-aid');
        var ownerId = domData(albumEl, 'owner-id');
        var hash = domData(albumEl, 'move-hash');
        var from = domData(albumEl, 'from');

        var counterEl = geByClass1('photos_album_counter', ref);
        var thumbEl = geByClass1('photos_album_thumb', ref);

        var progressWrapEl = ge('pv_move_to_album_progress');
        thumbEl.insertBefore(progressWrapEl, thumbEl.children[0]);
        show(progressWrapEl);

        addClass(ref, 'photos_in_progress');
        addClass(gpeByClass('photos_container_albums', ref), 'photos_inactive');

        photos.doEditBatchProcess({
                act: 'move_photos',
                to_album_id: toAlbumId,
                from_album_id: fromAlbumId,
                owner_id: ownerId,
                hash: hash,
                from: from
            },
            cur.editPhotosArray,
            ge('pv_move_to_album_progress'),
            'photos_move_in_progress_title',
            function(cnt, albumName, chunkArray, doneCount, total, cancelHash) {
                cur.count = Math.max(cur.count - cnt, 0);
                val(counterEl, +val(counterEl) + cnt);

                each(chunkArray, function(i, photoId) {
                    var el = ge('photo_edit_row_' + photoId);

                    if (!cur.isPhotoUpload) {
                        if (el && !isAll) {
                            var onclick = 'return photos.cancelMove(event, this, \'' + photoId + '\', ' + fromAlbumId + ', ' + toAlbumId + ', ' + ownerId + ', \'' + cancelHash + '\')';
                            var cancelPanelEl = se('<div class="photos_cancel_move"><a href="" onclick="' + onclick + '">' + getLang('global_cancel') + '</a></div>');
                            el.appendChild(cancelPanelEl);
                        } else {
                            re(el);
                        }
                    }
                    cur.count = Math.max(cur.count, 0);
                });
                photos._editUpdateSelectedCounter();
            },
            function(doneCount, albumHref) {
                var box = curBox();
                box && box.hide();

                var msg = langNumeric(doneCount, cur.lang.photos_x_photos_moved_no_cancel);
                msg = msg.replace('{album}', albumHref);
                showDoneBox(msg);

                if (cur.pvShown && cur.pvCurPhoto) {
                    cur.pvCurPhoto.album = albumHref;
                    geByClass1('pv_album_name').innerHTML = albumHref;
                }

                if (isAll || cur.isPhotoUpload) {
                    if (cur.count == 0) {
                        nav.reload();
                    } else {
                        var shownRowsCount = geByClass('photos_photo_edit_row').length;
                        if (shownRowsCount < 40) {
                            photos.load();
                        }
                    }
                }
            }
        );

        ev && cancelEvent(ev);
    },

    publishPhotos: function(el) {
        if (cur.savedPhotos) {
            cur.savingPhotos = true;
            var query = {
                act: 'post',
                type: 'photos_upload',
                to_id: vk.id,
                attach1_type: 'photos_list',
                attach1: (cur.savedPhotos || []).join(','),
                hash: cur.post_hash
            }
            ajax.post('/al_wall.php', query, {
                showProgress: lockButton.pbind(el),
                onDone: function() {
                    delete cur._back;
                    nav.go('/al_profile.php');
                    showBackLink();
                }
            });
        }
        return false;
    },

    registerDragZone: function(opts) {
        addEvent(document, 'dragenter dragover', function(ev) {
            if (photos.checkHtml5Uploader()) {
                setTimeout(function() {
                    clearTimeout(cur.dragTimer);
                    delete cur.dragTimer;
                }, 0);
                opts.on(ev);
                return cancelEvent(ev);
            }
        });

        addEvent(document, 'dragleave', function(ev) {
            if (cur.dragTimer) {
                clearTimeout(cur.dragTimer);
                delete cur.dragTimer;
            }
            cur.dragTimer = setTimeout(function() {
                opts.un(ev);
            }, 100);
            cancelEvent(ev);
        });

        addEvent(document, 'drop', function(ev) {
            opts.un(ev, true);
            opts.drop(ev.dataTransfer.files);
            return cancelEvent(ev);
        });

        cur.destroy.push(function() {
            removeEvent(document, 'dragenter dragover');
            removeEvent(document, 'dragleave');
            removeEvent(document, 'drop');
        });
    },

    openWebcamPhoto: function() {
        var box = showBox('al_photos.php', {
            act: 'webcam_photo',
            oid: cur.oid
        }, {
            params: {
                dark: 1
            }
        });
        box.setOptions({
            width: 644
        });
    },

    initWebcam: function(box, langs) {
        cur.lang = extend(cur.lang || {}, langs);
        box.setOptions({
            hideButtons: true,
            width: 644,
            bodyStyle: 'padding:0px;border:0px;'
        });

        photos.cameraInit();
    },

    cameraInit: function() {
        var params = ["ajx=1"];
        for (var j in Upload.vars[cur.uplId]) {
            params.push(j + "=" + Upload.vars[cur.uplId][j]);
        }
        var url = Upload.uploadUrls[cur.uplId] + (Upload.uploadUrls[cur.uplId].match(/\?/) ? '&' : '?') + params.join('&');

        var vars = {
            's_noCamera': getLang('profile_no_camera'),
            's_noAccess': getLang('profile_no_camera_access'),
            's_setAccess': getLang('profile_set_camera_access'),
            's_capture': getLang('profile_capture_image'),
            's_videoMode': getLang('profile_to_video_mode'),
            'upload_url': url,
            'saveClbk': 'photos.cameraPhotoDone',
            'hideClbk': 'photos.uploadReturn',
            'overClbk': 'photos.cameraBtnOver',
            'outClbk': 'photos.cameraBtnOut',
            'downClbk': 'photos.cameraBtnDown',
            'upClbk': 'photos.cameraBtnUp',
            'showSaveClbk': 'photos.showCameraSaveBtn',
            'hideSaveClbk': 'photos.hideCameraSaveBtn',
            'hideCaptureClbk': 'photos.hideCameraCaptureBtn',
            'progressClbk': 'photos.cameraSaveProgress',
            'getBtnsPos': 'photos.updateCameraButtonsPos',
            'jpgQuality': '95'
        }

        for (var i in vars) {
            vars[i] = winToUtf(vars[i]);
        }
        var opts = {
            url: '/swf/CaptureImg.swf',
            id: 'flash_camera',
            width: 604,
            height: 480,
            preventhide: 1,
            style: 'visibility: visible',
            version: 9
        }
        var params = {
            allownetworking: 'true',
            wmode: 'transparent'
        }

        this.addWebcamPhotoControls = geByClass1('add_webcam_photo_controls');

        hide('camera_button_no');
        renderFlash('webcam_photo', opts, params, vars);
        return false;
    },
    cameraPhotoDone: function(res) {
        delete this.addWebcamPhotoControls;
        res = JSON.parse(res.replace(/\\"/g, '"'));
        ajax.post('al_photos.php', extend({
            act: 'choose_uploaded'
        }, res), {
            onDone: function(media, data) {
                photos.showEditView(media, data);
            }
        });
    },
    updateCameraButtonsPos: function() {
        var butnsWrap = this.addWebcamPhotoControls,
            pos = [];
        var wrapXY = getXY(butnsWrap),
            wrapSize = getSize(butnsWrap);
        setStyle(this.addWebcamPhotoControls, {
            visibility: 'visible'
        });
        var detectPos = function(i, el) {
            if (!isVisible(el.parentNode)) return;
            var buttonXY = getXY(el),
                buttonSize = getSize(el);
            pos.push([buttonXY[0] - wrapXY[0], buttonXY[1] - wrapXY[1], buttonSize[0] + 2, buttonSize[1] + 2]);
        }
        each(geByTag('button', butnsWrap), detectPos);
        each(geByClass('button', butnsWrap), detectPos);
        if (pos.length == 1)
            pos.push([999, 999, 1, 1]);
        if (ge('flash_camera').setButtonsPos) ge('flash_camera').setButtonsPos(pos);
    },
    showCameraSaveBtn: function() {
        show('camera_button_no');

        ge('camera_button_yes').innerHTML = getLang('profile_oph_camera_save');
        ge('camera_button_no').innerHTML = getLang('profile_to_video_mode');
        this.updateCameraButtonsPos();
    },
    hideCameraSaveBtn: function(noUpdate) {
        hide('camera_button_no');

        var noBtn = ge('camera_button_no');
        ge('camera_button_yes').innerHTML = getLang('profile_capture_image');
        if (noBtn) {
            noBtn.innerHTML = getLang('profile_oph_camera_back');
        }
        if (!noUpdate) this.updateCameraButtonsPos();
    },
    hideCameraCaptureBtn: function() {
        hide(ge('camera_button_no').parentNode);
        ge('camera_button_yes').innerHTML = getLang('profile_no_camera_back');
        this.updateCameraButtonsPos();
    },
    cameraSaveProgress: function(val) {
        var button = ge('camera_button_yes');
        if (!button) return;
        if (val) {
            lockButton(button);
        } else {
            unlockButton(button);
        }
    },
    cameraBtnOver: function(btn_class) {
        var button = geByClass1(btn_class, this.addWebcamPhotoControls);
        if (button) addClass(button, 'hover');
    },
    cameraBtnOut: function(btn_class) {
        var button = geByClass1(btn_class, this.addWebcamPhotoControls);
        if (button) {
            removeClass(button, 'hover');
            removeClass(button, 'active');
        }
    },
    cameraBtnDown: function(btn_class) {
        var button = geByClass1(btn_class, this.addWebcamPhotoControls);
        if (button) addClass(button, 'active');
    },
    cameraBtnUp: function(btn_class) {
        var button = geByClass1(btn_class, this.addWebcamPhotoControls);
        if (button) removeClass(button, 'active');
    },
    uploadReturn: function() {
        curBox().hide();
        delete this.addWebcamPhotoControls;
    },

    showEditView: function(media, data) {
        cur.webcamPhotoMedia = media;
        cur.pvPhoto = null;
        cur.uploadPhotoData = data;
        stManager.add(['photoview.js'], function() {
            cur.fromWebcam = true;
            Photoview.openEditor(media, data.editable.sizes.x[0]);
        });
    },

    onFiltersSave: function() {
        if (cur.imMedia) {
            cur.imMedia.chooseMedia('photo', cur.webcamPhotoMedia, extend(cur.uploadPhotoData, {
                upload_ind: cur.imUploadInd + '_selfie'
            }));
        } else {
            cur.chooseMedia('photo', cur.webcamPhotoMedia, extend(cur.uploadPhotoData, {
                upload_ind: cur.uplId + '_selfie'
            }));
        }
        delete cur.webcamPhotoMedia;
        delete cur.uploadPhotoData;
    },

    returnToWebcam: function() {
        curBox().hide();
        this.openWebcamPhoto();
    }
}

try {
    stManager.done('photos.js');
} catch (e) {}