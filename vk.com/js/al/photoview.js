var Photoview = {
        MIN_WIDTH: 600,
        MIN_HEIGHT: 450,

        PE_MIN_WIDTH: 750,
        PE_MIN_HEIGHT: 500,

        PE_MIN_WIDTH_1APRIL: 400,
        PE_MIN_HEIGHT_1APRIL: 550,

        SIDE_COLUMN_WIDTH: 310,
        SIDE_MIN_GAP: 40,
        VERTICAL_MIN_GAP: 15,
        BOTTOM_BAR_HEIGHT: 52,

        SIDE_NAV_PANELS_MAX_WIDTH: 120,
        SIDE_NAV_PANELS_MIN_WIDTH: 25,

        LEFT_RIGHT_NAV_RATIO: 0.25,

        blank: '/images/blank.gif',
        blankf: function() {},
        cacheSize: 3,
        allSizes: ['x', 'y', 'z', 'w'],
        photoSize1April: ['a'],

        PE_V1: 1 << 0,
        PE_V2: 1 << 1,
        PE_V3: 1 << 2,

        _getViewedPhotoFullId: function() {
            var listId = cur.pvListId;
            var index = cur.pvIndex;
            var photo = cur.pvData[listId][index];

            return photo.id;
        },

        changeThumbs: function(thumb, sizes, editedPhotoId) {
            if (thumb) {
                var rows = [ge('photo_row' + cur.filterPhoto), ge('photos_add_thumb' + cur.filterPhoto)];
                var childs = geByClass('page_post_thumb_wrap')
                childs.push.apply(childs, geByClass('page_preview_photo'));
                childs.push.apply(childs, geByClass('im_preview_photo'));
                childs.push.apply(childs, geByClass('photo'));
                childs.push.apply(childs, geByClass('page_square_photo'));
                childs.push.apply(childs, geByClass('photos_row'));
                for (var i in childs) {
                    var oncl = childs[i].getAttribute('onclick');

                    if (!oncl) {
                        var c = domFC(childs[i]);
                        oncl = c ? c.getAttribute('onclick') : false;
                    }

                    if (oncl && oncl.indexOf("'" + cur.filterPhoto + "'") != -1) {
                        rows.push(childs[i]);
                    }
                }
                for (var i in rows) {
                    if (rows[i]) {
                        if (hasClass(rows[i], 'page_square_photo') || rows[i].style.backgroundImage) {
                            setStyle(rows[i], {
                                backgroundImage: 'url(' + thumb + ')'
                            });
                            continue;
                        }

                        var img = geByTag1('img', rows[i]);
                        if (img) {
                            img.src = thumb;
                            setStyle(img, {
                                height: 'auto'
                            });
                        }
                    }
                }
                if (!cur.pvNoTemp) cur.pvNoTemp = {};
                cur.pvNoTemp[cur.filterPhoto] = true;
                if (window.ThumbsEdit && sizes) {
                    var c = ThumbsEdit.cache();
                    for (var i in c) {
                        var p = c[i].previews || [],
                            found = false;
                        for (var j in p) {
                            if (p[j].type == 'photo' && p[j].photo.id == 'photo' + editedPhotoId) {
                                p[j].photo.sizes = sizes;
                                found = true;
                            }
                        }
                        if (found) ThumbsEdit.refresh(i);
                    }
                }
            }
        },

        openStickersEditor: function(photo) {
            if (cur.pvEditorMode) {
                return;
            }

            if (!photo) {
                photo = cur.pvCurPhoto;
            }

            Photoview.stopTagger();
            cur.pvPhotoTags && cur.pvPhotoTags.hideAreas();

            Photoview.toggleNavControls();
            hide(cur.pvLikeFSWrap);
            Photoview.hideTag(true);

            cur.pvEditorMode = true;
            cur.pvEditorSaved = false;

            Photoview.updatePhotoDimensions();

            stManager.add(['spe.js'], function() {
                SPE.init(photo, function(photoObj, thumb, sizes, viewOpts) {
                    var newPhoto = photoObj.id != photo.id;

                    cur.pvEditorSaved = true;
                    cur.pvPhotoTags && cur.pvPhotoTags.reload();

                    if (photo.closeOnPEEdit) { // need close photoview

                        if (photoObj && thumb) { // photo was cloned

                            if (window.ThumbsEdit && sizes) { // page has attaches
                                var c = ThumbsEdit.cache();
                                for (var i in c) {
                                    var editIndex = i.replace('thumbs_edit', ''); // e.g. thumbs_edit1
                                    var addMedia = cur.addMedia[editIndex];
                                    var p = c[i].previews || [],
                                        found = false,
                                        attachIndex = 0;

                                    for (var j in p) {
                                        if (p[j].type == 'photo' && p[j].photo.id == 'photo' + photo.id) {
                                            var ph = p[j].photo;

                                            if (newPhoto) { // need replace attachements with new photo
                                                ph.id = 'photo' + photoObj.id;
                                                ph.pid = photoObj.id.split('_')[1];

                                                var media = {
                                                    editable: {
                                                        sizes: sizes
                                                    },
                                                    thumb_m: sizes.m,
                                                    thumb_s: sizes.s,
                                                    view_opts: viewOpts,
                                                };

                                                var medias = addMedia.getMedias();
                                                each(medias, function() {
                                                    if (this[0] == 'photo' && this[1] == photo.id) {
                                                        this[1] = photoObj.id;

                                                        return false;
                                                    }
                                                });
                                            }

                                            p[j].click = addMedia.showPhoto.pbind(photoObj.id, photoObj.list, parseJSON(viewOpts));
                                            p[j].itemId = ph.pid;

                                            ph.sizes = sizes;
                                            found = true;
                                        }

                                        attachIndex++;
                                    }

                                    if (found) {
                                        ThumbsEdit.refresh(i);
                                        addMedia.onChange && addMedia.onChange();
                                    }
                                }
                            }
                        }

                        Photoview.changeThumbs(thumb, sizes, photoObj.id);

                        return Photoview.hide(0);
                    }

                    if (cur.pvListId) {
                        var listId = cur.pvListId,
                            index = cur.pvIndex;
                        var listRow = cur.pvData[listId];
                        if (!listRow) {
                            return nav.reload();
                        }
                        var ph = listRow[index];

                        if (newPhoto) { // if new photo then add it to photoview list
                            var newPh = extend({}, photoObj);

                            index = ++cur.pvIndex;
                            listRow.splice(index, 0, newPh);
                            ph = newPh;

                            cur.pvCommsLikes[ph.id] = [ph.comments, 0, vkNow(), false];
                            delete(ph.comments);
                            delete(ph.likes);
                        }

                        var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
                        if (photoObj && thumb && !newPhoto) {
                            Photoview.changeThumbs(thumb, sizes, photo.id);
                            delete ph.x_;
                            delete ph.x_src;
                            delete ph.y_;
                            delete ph.y_src;
                            delete ph.z_;
                            delete ph.z_src;
                            extend(ph, photoObj);
                        }

                        ph.pe_type = Photoview.PE_V3;

                        if (shown) {
                            cur.pvCurData = Photoview.genData(ph, Photoview.getPhotoSize());
                            domFC(cur.pvPhoto).src = Photoview.blank;

                            setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0);
                        }
                    }
                }, function() {
                    delete cur.pvEditorMode;
                    delete cur.pvEditorModeDimensionsUpdated;
                    cur.pvPhotoTags && cur.pvPhotoTags.reload();

                    if (photo.closeOnPEEdit) {
                        return Photoview.hide(0);
                    }

                    show(cur.pvLikeFSWrap);
                    Photoview.toggleNavControls(['left', 'right', 'close']);

                    setTimeout(Photoview.updatePhotoDimensions, 1);
                });
            });
        },

        genUrl: function(base, add) {
            if (!add) {
                return '';
            }

            if (!add.match(/\.[a-z]{3}$/i)) {
                add += '.jpg';
            }

            if (add.match(/https?:\/\//i)) {
                return add;
            }

            return (base || '').replace(/\/[a-z0-9_:\.]*$/i, '') + '/' + add;
        },

        genData: function(ph, size) {
            var f = (size == 'x') ? 3 : ((size == 'y') ? 2 : ((size == 'z') ? 1 : 0));

            var c = (cur.shownAs1AprilEditor ? Photoview.photoSize1April : ['w', 'z', 'y', 'x']).slice(f);
            var d, s;

            for (var i = 0; i < 4 - f; ++i) {
                var l = c[i];
                if (d = ph[l + '_']) break;
                if (s = ph[l + '_src']) break;
            }

            if (!d) d = [s];

            return {
                src: Photoview.genUrl(ph.base, d[0]),
                width: d[2] && d[1],
                height: d[1] && d[2]
            };
        },

        actionInfo: function() {
            return ge('pv_action_info') || domPN(cur.pvTags).insertBefore(ce('div', {
                id: 'pv_action_info',
                className: 'pv_right_block'
            }), cur.pvTags);
        },

        locNav: function(ch, old, nw, opts) {
            if ((cur.pvListId == 'newtag' + vk.id + (nw.rev ? '/rev' : '')) && (nw[0] == 'albums' + vk.id) && (nw.act == 'added')) {
                Photoview.hide(opts.hist);
                return false;
            }
            nw = nav.toStr(nw);
            if (nw.replace('?rev=1', '/rev') == cur.pvListId && cur.pvShown) {
                Photoview.hide(opts.hist);
                return false;
            }
            var m = nw.match(/^photo(-?\d+_\d+)\??((all=1|newtag=\d+)(&rev=1)?|(rev=1&)?tag=\d+|rev=1)?$/);
            if (!m) return;

            var listId = cur.pvListId;
            if (!listId || !cur.pvShown) {
                if (nav.objLoc.act == 'added') {
                    listId = 'newtag' + vk.id + (nav.objLoc.rev ? '/rev' : '');
                } else {
                    listId = nav.strLoc.replace('?rev=1', '/rev');
                }
            }
            var data = cur.pvData[listId];
            if (!data) return;

            for (var i = 0, l = data.length; i < l; ++i) {
                if (data[i] && data[i].id == m[1]) {
                    Photoview.show(listId, i, false, cur.pvRoot);
                    return false;
                }
            }
        },
        updateLocNav: function() {
            if (cur.pvRoot) {
                for (var i = 0, l = cur.nav.length; i < l; ++i) {
                    if (cur.nav[i] == Photoview.locNav) return;
                }
                cur.nav.push(Photoview.locNav);
            } else {
                for (var i = 0, l = cur.nav.length; i < l; ++i) {
                    if (cur.nav[i] == Photoview.locNav) {
                        cur.nav.splice(i, 1);
                        --i;
                        --l;
                    }
                }
            }
        },

        toggleOnPhotoControls: function(doShow) {
            doShow = !!doShow;

            toggle(cur.pvFSWrap, doShow);
        },

        checkLayerVisibility: function() {
            if (cur.pvShown) return true;

            debugLog('layerqueue.hide from photoview');
            layerQueue.hide();

            addEvent(window, 'resize', Photoview.onResize);
            addEvent(document, 'keydown', Photoview.onKeyDown);
            addEvent(layerWrap, 'click', Photoview.onLayerClick);
            boxQueue.hideAll();
            setStyle(layerBG, {
                opacity: ''
            });
            layers.show();
            layers.fullhide = Photoview.hide;
        },
        emojiShowTT: function(obj, ev) {
            if (cur.pvEmoji === undefined) {
                return false;
            }
            return Emoji.ttShow(cur.pvEmoji, obj, ev);
        },
        emojiHideTT: function(obj, ev) {
            if (cur.pvEmoji === undefined) {
                return false;
            }
            return Emoji.ttHide(cur.pvEmoji, obj, ev);
        },

        onImageWrapMouseDown: function(event) {
            if (event.button == 2 || cur.pvEditorMode) {
                return;
            }

            if (!cur.pvTagger && checkEvent(event) === false) {
                var nextIndex = cur.pvIndex;

                Photoview.updateNavBtnsLeftThreshold();

                if (event.pageX < cur.pvLeftBtnAmount) {
                    nextIndex -= 1;
                } else {
                    nextIndex += 1;
                }

                cur.pvPointerPosition = [event.pageX, event.pageY];

                return Photoview.show(false, nextIndex, event);
            }
        },

        onImageWrapMouseLeave: function(event) {
            removeClass(cur.pvNavBtnLeft, 'pv_nav_btn_show');
            removeClass(cur.pvNavBtnRight, 'pv_nav_btn_show');

            removeClass(cur.pvImageAreaWrap, 'pv_init_hover');

            Photoview.updateNavBtnsLeftThreshold(true);
        },

        onImageWrapMouseMove: function(event) {
            Photoview.updateNavBtnsLeftThreshold();

            toggleClass(cur.pvNavBtnLeft, 'pv_nav_btn_show', event.pageX < cur.pvLeftBtnAmount);
            toggleClass(cur.pvNavBtnRight, 'pv_nav_btn_show', event.pageX > cur.pvLeftBtnAmount);
        },

        toggleLightModeClass: function(show) {
            show = show ? cur.pvIsLightMode : false;
            toggleClass(cur.pvBox, 'pv_light_mode', !!show);
            show = show ? cur.pvShowBottomActions : false;
            toggleClass(cur.pvBox, 'pv_show_bottom_actions', !!show);
        },

        isPhotosList: function() {
            return !!cur.pvVideoTagsShown || !!cur.pvAlbumsShown || !!cur.pvAlbumShown || !!cur.pvPhotoTagShown;
        },

        createLayer: function() {
            cur.pvLayerCreated = true;

            delete cur.pvLeftBtnAmount;

            addClass(layerWrap, 'pv_layer_wrap');
            addClass(layerBG, 'pv_layer');

            var isPhotosList = Photoview.isPhotosList();
            var isFAQ = nav.objLoc[0].match(/^faq(\d)+$/);
            var isBug = nav.objLoc[0].match(/^bug(\d)+$/);
            var isTranslationBox = cur.translationBoxOpened;
            cur.pvIsLightMode = isBug || nav.objLoc[0].indexOf('blog/') == 0 || isFAQ || inArray(nav.objLoc[0], ['blog', 'about', 'support', 'helpdesk', 'tutorial', 'market', 'bugs', 'translation', 'restore2']) || isTranslationBox;
            cur.pvShowBottomActions = !cur.pvIsLightMode || isFAQ || inArray(nav.objLoc[0], ['helpdesk', 'support']);

            var DISPLAY_NONE = 'display: none';

            var fsHide = Photoview.canFullscreen() ? '' : DISPLAY_NONE;
            var albumsHtml = cur.pvAlbumsShown ? cur.pvAlbumsData[cur.pvAlbumsShown].html : '';
            var albumHtml = cur.pvAlbumShown ? cur.pvAlbumData[cur.pvAlbumShown].html : '';
            var pvVTagsHtml = cur.pvVideoTagsShown ? cur.pvVideoTagsData.html : '';
            var pwStyle = isPhotosList ? DISPLAY_NONE : '';
            var titleStyle = isPhotosList ? '' : DISPLAY_NONE;
            var awStyle = cur.pvAlbumsShown ? '' : DISPLAY_NONE;
            var sawStyle = cur.pvAlbumShown ? '' : DISPLAY_NONE;
            var vtStyle = cur.pvVideoTagsShown ? '' : DISPLAY_NONE;

            if (cur.pvPhotoTagShown) {
                albumHtml = cur.pvPhotoTagData[cur.pvPhotoTagShown].html;
                sawStyle = '';
            }
            if (ge('pv_comments')) {
                cur.pvBackupComments = ge('pv_comments');
                domPN(ge('pv_comments')).removeChild(ge('pv_comments'));
            }

            var titleEl = '<div style="' + titleStyle + '" class="box_title_wrap box_grey"><div class="box_x_button" onclick="Photoview.hide(0)"></div><div class="box_title_controls"></div><div class="box_title"></div></div>';

            var navButtons = ' \
      <div class="pv_nav_btn" id="pv_nav_btn_left" onmousedown="cur.pvClicked = true; Photoview.show(false, cur.pvIndex - 1, event);"> \
        <div class="pv_nav_btn_icon"></div> \
      </div> \
      <div class="pv_nav_btn" id="pv_nav_btn_right" onmousedown="cur.pvClicked = true; Photoview.show(false, cur.pvIndex + 1, event);"><div class="pv_nav_btn_icon"></div></div> \
    ';

            var fs = cur.pvIsLightMode ? '' : '\
      <div class="pv_fs_wrap"> \
        <div class="pv_fs_btn" onmousedown="return Photoview.fullscreen(event);"><div></div></div> \
      </div> \
    ';

            var bottomInfoPanel = '\
      <div class="pv_bottom_info clear_fix"> \
        <div> \
          <div class="pv_bottom_info_left"><span class="pv_album_name" onmouseover="setTitle(this)"></span><span class="pv_counter"></span></div> \
          ' + (cur.pvShowBottomActions ? '<div class="pv_bottom_actions"></div>' : '') + ' \
        </div> \
      </div>';

            var narrowColumnWrap = cur.pvIsLightMode ? '' : '\
      <div class="pv_narrow_column_wrap">\
        <div class="pv_narrow_column_cont wall_module">\
          <div class="narrow_column" id="pv_narrow"></div>\
        </div>\
      </div>';

            var imgProgress = getProgressHtml('pv_image_progress');

            var MOUSE_OUT_LAYER = 'pv_mouse_out_layer';

            layer.innerHTML = '\
    <div class="pv_cont">\
      <div id="pv_box" class="_scroll_node pv_box" tabindex="0" onclick="cur.pvClicked = true;" onmouseenter="removeClass(layerWrap, \'' + MOUSE_OUT_LAYER + '\')" onmouseleave="addClass(layerWrap, \'' + MOUSE_OUT_LAYER + '\')"> \
        ' + titleEl + '\
        <div class="clear_fix pv_photo_wrap" style="' + pwStyle + '"> \
          <div class="pv_close_btn" onclick="Photoview.hide(0)"></div> \
          <div class="no_select pv_left_wrap">\
          \
            <div class="no_select pv_image_wrap">\
              <div id="pv_tag_info" class="clear_fix"> \
                <div class="pv_tag_info_buttons_wrap"></div> \
                <div class="pv_tag_info_text" onmouseover="setTitle(this)"></div> \
              </div>\
              <div id="pv_tag_frame"></div>\
              <div id="pv_tag_faded"></div>\
              <div id="pv_tag_person" onmouseout="Photoview.hideTag()"></div>\
              <div class="pv_photo_tags" id="pv_photo_tags"></div>\
              <div class="pv_img_area_wrap pv_init_hover" onmouseleave="return Photoview.onImageWrapMouseLeave(event)" onmousedown="return Photoview.onImageWrapMouseDown(event)" onmousemove="Photoview.onImageWrapMouseMove(event)"> \
                <div class="pv_img_progress_wrap">' + imgProgress + '</div> \
                <a onselectstart="return cancelEvent(event);" onclick="return checkEvent(event)" href="" id="pv_photo"></a> \
                ' + navButtons + ' \
                <div class="pv_like_fs_wrap"> \
                ' + fs + '\
                </div> \
              </div> \
            </div> \
            ' + bottomInfoPanel + '\
          </div>' + narrowColumnWrap + '\
        </div>\
        <div id="pv_albums_wrap" class="pv_white_bg photos_container_albums" style="' + awStyle + '">' + albumsHtml + '</div>\
        <div id="pv_album_wrap" class="pv_white_bg" style="' + sawStyle + '">' + albumHtml + '</div>\
        <div id="pv_vtagged_wrap" class="pv_white_bg" style="' + vtStyle + '">' + pvVTagsHtml + '</div>\
      </div>\
    \
    </div>';

            if (cur.pvYourComment) {
                domPN(ge('pv_your_comment')).replaceChild(cur.pvYourComment, ge('pv_your_comment'));
            }

            extend(cur, {
                pvCont: domFC(layer),
                pvBox: ge('pv_box'),

                pvImageAreaWrap: geByClass1('pv_img_area_wrap'),

                pvLeftWrap: geByClass1('pv_left_wrap'),

                pvTitle: geByClass1('box_title_wrap'),
                pvTitleText: geByClass1('box_title'),

                pvImageWrap: geByClass1('pv_image_wrap'),

                pvNavBtnLeft: ge('pv_nav_btn_left'),
                pvNavBtnRight: ge('pv_nav_btn_right'),
                pvNavBtnClose: geByClass1('pv_close_btn'),

                pvNarrowColumnWrap: geByClass1('pv_narrow_column_wrap'),
                pvNarrowColumn: geByClass1('pv_narrow_column_cont'),

                pvPhotoWrap: geByClass1('pv_photo_wrap'),
                pvAlbumWrap: ge('pv_album_wrap'),
                pvAlbumsWrap: ge('pv_albums_wrap'),
                pvVTagsWrap: ge('pv_vtagged_wrap'),

                pvPhotoTagsContainer: ge('pv_photo_tags'),
                pvTagInfo: ge('pv_tag_info'),
                pvTagFrame: ge('pv_tag_frame'),
                pvTagFaded: ge('pv_tag_faded'),
                pvTagPerson: ge('pv_tag_person'),
                pvPhoto: ge('pv_photo'),

                pvTagInfoText: geByClass1('pv_tag_info_text'),
                pvTagInfoButtons: geByClass1('pv_tag_info_buttons_wrap'),

                pvBottomInfo: geByClass1('pv_bottom_info'),
                pvAlbumName: geByClass1('pv_album_name'),
                pvCounter: geByClass1('pv_counter'),
                pvBottomActions: geByClass1('pv_bottom_actions'),
                pvBottomLeft: geByClass1('pv_bottom_info_left'),

                pvNarrow: ge('pv_narrow'),
                pvWide: ge('pv_wide'),

                pvImgProgress: ge('pv_image_progress'),

                pvLikeFSWrap: geByClass1('pv_like_fs_wrap'),
                pvFSWrap: geByClass1('pv_fs_wrap'),
                pvFS: ge('pv_fs'),
                pvFSFg: ge('pv_fs_fg'),
                pvActions: ge('pvs_actions'),

                pvYourComment: ge('pv_your_comment'),
                pvAddMedia: domFC(ge('pv_add_media')),
                pvMediaPreview: ge('pv_media_preview'),
                pvCommentSend: ge('pv_comment_send'),
                pvComment: ge('pv_comment')
            });

            addEvent(layerWrap, 'scroll', Photoview.scrollResize);

            addEvent(layerWrap, 'mousemove', Photoview.onLayerMouseMove);

            Photoview.updateSize();

            if (isPhotosList) {
                uiScrollBox.init(false, {
                    parent: layerWrap
                });
            }

            var oldScroll = layerWrap.scrollTop;
            elfocus(geByClass1('_scroll_node', cur.pvCont));
            layerWrap.scrollTop = oldScroll;
        },
        doShowAlbums: function(ownerId, ev) {
            ownerId = intval(ownerId);
            if (ev && (ev.button == 2 || ev.which == 3)) return;

            clearTimeout(window.__pvhideTimer);
            if (__afterFocus) {
                return ev ? cancelEvent(ev) : false;
            }
            if (cur.pvTagger) {
                Phototag.stopTag();
                if (ev !== false) {
                    return ev ? cancelEvent(ev) : false;
                }
            }

            var data = (cur.pvAlbumsData || {})[ownerId];
            if (!data) return;

            Photoview.checkLayerVisibility();
            cur.pvRoot = false;
            Photoview.updateLocNav();

            Photoview.toggleLightModeClass(false);

            if (ev && ev.pageX && ev.pageY) {
                extend(cur, {
                    pvOldX: ev.pageX,
                    pvOldY: ev.pageY,
                    pvOldT: vkNow()
                });
            }

            cur.pvShown = true;
            cur.pvAlbumsShown = ownerId;
            if (val('pva_owner') != ownerId) {
                extend(cur, {
                    pvaOffset: data.opts.offset,
                    pvaCount: data.opts.count,
                    pvaPhotosOffset: data.opts.photos_offset,
                    pvaPhotosCount: data.opts.photos_count,
                    pvShowAllAlbums: false
                });
            }

            if (!cur.pvLayerCreated) {
                Photoview.createLayer(true);
            } else {
                if (val('pva_owner') != ownerId) {
                    val(cur.pvAlbumsWrap, data.html);
                }
                if (!isVisible(cur.pvAlbumsWrap)) {
                    hide(cur.pvPhotoWrap, cur.pvAlbumWrap, cur.pvVTagsWrap);
                    show(cur.pvAlbumsWrap);
                    Photoview.updateSize();
                    layerWrap.scrollTop = val('pva_scroll');
                }
            }

            uiScrollBox.show();

            show(cur.pvTitle);
            show(cur.pvAlbumsWrap);
            cur.pvTitleText.innerHTML = data.opts.summary;

            if (cur.pvListId && cur.pvListId != 'temp') {
                extend(cur, {
                    pvOldListId: cur.pvListId,
                    pvOldIndex: cur.pvIndex
                });

            } else {
                if (!browser.msie || browser.version > 8) cur.pvClicked = false;
            }

            Photoview.toggleNavControls();

            cur.pvListId = false;

            var nl = extend(nav.objLoc, {
                z: 'albums' + cur.pvAlbumsShown
            });
            if (nav.strLoc != nav.toStr(nl)) {
                if (!cur.pvNoHistory) {
                    ++cur.pvHistoryLength;
                }
                nav.setLoc(nl);
            }

            Photoview.updatePeriods();

            return ev ? cancelEvent(ev) : false;
        },
        jumpToAlbums: function(returning) {
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
                if (cur.pvJumpTo.z == 'albums' + val('pva_owner') && cur.pvJumpTo.z == nav.objLoc.z) {
                    showAlbums(val('pva_owner'), {
                        noHistory: true
                    });
                    return;
                }
            }
            if (returning) {
                cur.pvListId = false;
            }
            extend(cur, {
                pvJumpFrom: false,
                pvJumpSteps: 0
            });
            nav.change(cur.pvJumpTo);
        },
        jumpToAlbum: function(returning) {
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
                if (cur.pvJumpTo.z == 'album' + val('pvsa_album') && cur.pvJumpTo.z == nav.objLoc.z) {
                    showAlbum(val('pvsa_album'), {
                        noHistory: true
                    });
                    return;
                }
            }
            if (returning) {
                cur.pvListId = false;
            }
            extend(cur, {
                pvJumpFrom: false,
                pvJumpSteps: 0
            });
            nav.change(cur.pvJumpTo);
        },
        jumpToTagged: function(returning) {
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
                if (cur.pvJumpTo.z == 'tag' + val('pvsa_tag') && cur.pvJumpTo.z == nav.objLoc.z) {
                    showTagged(val('pvsa_tag'), {
                        noHistory: true
                    });
                    return;
                }
            }
            if (cur.pvJumpTo.z == 'tag' + val('pvsa_tag')) {
                cur.pvJumpTo.z = 'photo_' + cur.pvJumpTo.z;
            }
            if (returning) {
                cur.pvListId = false;
            }
            extend(cur, {
                pvJumpFrom: false,
                pvJumpSteps: 0
            });
            nav.change(cur.pvJumpTo);
        },
        doShowAlbum: function(albumRaw, ev) {
            if (ev && (ev.button == 2 || ev.which == 3)) return;

            clearTimeout(window.__pvhideTimer);
            if (__afterFocus) {
                return ev ? cancelEvent(ev) : false;
            }
            if (cur.pvTagger) {
                Phototag.stopTag();
                if (ev !== false) {
                    return ev ? cancelEvent(ev) : false;
                }
            }

            var data = (cur.pvAlbumData || {})[albumRaw];
            if (!data) return;

            Photoview.checkLayerVisibility();
            cur.pvRoot = false;
            Photoview.updateLocNav();

            Photoview.toggleLightModeClass(false);

            if (ev && ev.pageX && ev.pageY) {
                extend(cur, {
                    pvOldX: ev.pageX,
                    pvOldY: ev.pageY,
                    pvOldT: vkNow()
                });
            }

            if (!cur.pvShown && !cur.pvAlbumShown && !cur.pvAlbumsShown) {
                layerQueue.push();
            }

            uiScrollBox.show();

            cur.pvShown = true;
            cur.pvAlbumShown = albumRaw;
            if (!cur.pvLayerCreated || val('pvsa_album') != albumRaw) {
                extend(cur, {
                    pvsaOffset: data.opts.offset,
                    pvsaCount: data.opts.count
                });
            }

            if (!cur.pvLayerCreated) {
                Photoview.createLayer();
            } else {
                if (val('pvsa_album') != albumRaw) {
                    val(cur.pvAlbumWrap, data.html);
                }
                if (!isVisible(cur.pvAlbumWrap)) {
                    hide(cur.pvPhotoWrap, cur.pvAlbumsWrap, cur.pvVTagsWrap);
                    show(cur.pvAlbumWrap);
                    Photoview.updateSize();
                    layerWrap.scrollTop = val('pvsa_scroll');
                }
            }

            show(cur.pvTitle);
            show(cur.pvAlbumWrap);

            var author = data.opts.author || '';
            cur.pvTitleText.innerHTML = (author ? (author + '<span class="divider"></span> ') : '') + data.opts.summary;

            if (cur.pvListId && cur.pvListId != 'temp') {
                extend(cur, {
                    pvOldListId: cur.pvListId,
                    pvOldIndex: cur.pvIndex
                });
                var old = (cur.pvListId || '').split('/');
                if (old[0]) {
                    Photoview.showRepeat(ge(old[0]));
                }
            } else {
                if (!browser.msie || browser.version > 8) {
                    cur.pvClicked = false;
                }
            }

            Photoview.toggleNavControls();

            cur.pvListId = false;

            var nl = extend(nav.objLoc, {
                z: 'album' + cur.pvAlbumShown
            });
            if (nav.strLoc != nav.toStr(nl)) {
                if (!cur.pvNoHistory) {
                    ++cur.pvHistoryLength;
                }
                nav.setLoc(nl);
            }

            return ev ? cancelEvent(ev) : false;
        },
        doShowTagged: function(ownerId, ev) {
            ownerId = intval(ownerId);
            if (ev && (ev.button == 2 || ev.which == 3)) return;

            clearTimeout(window.__pvhideTimer);
            if (__afterFocus) {
                return ev ? cancelEvent(ev) : false;
            }
            if (cur.pvTagger) {
                Phototag.stopTag();
                if (ev !== false) {
                    return ev ? cancelEvent(ev) : false;
                }
            }

            var data = (cur.pvPhotoTagData || {})[ownerId];
            if (!data) return;

            Photoview.checkLayerVisibility();
            cur.pvRoot = false;
            Photoview.updateLocNav();

            Photoview.toggleLightModeClass(false);

            if (ev && ev.pageX && ev.pageY) {
                extend(cur, {
                    pvOldX: ev.pageX,
                    pvOldY: ev.pageY,
                    pvOldT: vkNow()
                });
            }

            cur.pvShown = true;
            cur.pvPhotoTagShown = ownerId;
            if (!cur.pvLayerCreated || val('pvsa_tag') != ownerId) {
                extend(cur, {
                    pvsaOffset: data.opts.offset,
                    pvsaCount: data.opts.count
                });
            }

            if (!cur.pvLayerCreated) {
                Photoview.createLayer();
            } else {
                if (val('pvsa_tag') != ownerId) {
                    val(cur.pvAlbumWrap, data.html);
                }
                if (!isVisible(cur.pvAlbumWrap)) {
                    hide(cur.pvPhotoWrap, cur.pvAlbumsWrap, cur.pvVTagsWrap);
                    show(cur.pvAlbumWrap);
                    Photoview.updateSize();
                    layerWrap.scrollTop = val('pvsa_scroll');
                }
            }

            show(cur.pvTitle);
            show(cur.pvAlbumWrap);
            cur.pvTitleText.innerHTML = data.opts.summary;

            if (cur.pvListId && cur.pvListId != 'temp') {
                extend(cur, {
                    pvOldListId: cur.pvListId,
                    pvOldIndex: cur.pvIndex
                });
                var old = (cur.pvListId || '').split('/');
                if (old[0]) {
                    Photoview.showRepeat(ge(old[0]));
                }

            } else {
                if (!browser.msie || browser.version > 8) cur.pvClicked = false;
            }

            Photoview.toggleNavControls();

            cur.pvListId = false;

            var nl = extend(nav.objLoc, {
                z: 'photo_tag' + cur.pvPhotoTagShown
            });
            if (nav.strLoc != nav.toStr(nl)) {
                if (!cur.pvNoHistory) {
                    ++cur.pvHistoryLength;
                }
                nav.setLoc(nl);
            }

            return ev ? cancelEvent(ev) : false;
        },

        // controlsToShow - array [ 'close', 'left', 'right' ]
        toggleNavControls: function(controlsToShow) {
            each([cur.pvNavBtnRight, cur.pvNavBtnLeft, cur.pvNavBtnClose], function() {
                hide(this);
            });

            if (isString(controlsToShow)) {
                controlsToShow = controlsToShow.split(' ');
            }

            each(controlsToShow || [], function(i, ctrl) {
                switch (ctrl) {
                    case 'close':
                        show(cur.pvNavBtnClose);
                        break;
                    case 'left':
                        show(cur.pvNavBtnLeft);
                        break;
                    case 'right':
                        show(cur.pvNavBtnRight);
                        break;
                }
            });
        },

        getPhotoSize: function() {

            if (cur.shownAs1AprilEditor) {
                return 'a';
            }

            var sz;
            switch (cur.pvVeryBig) {
                case 3:
                    sz = 'w';
                    break;

                case 2:
                case 1:
                    sz = 'z';
                    break;

                default:
                    sz = 'y';
                    break;
            }

            return sz;
        },

        show: function(listId, index, ev, root) {
            if (cur.pvEditorMode) return
            if (ev && (ev.button == 2 || ev.which == 3)) return;

            if (cur.cancelClick) {
                delete cur.cancelClick;
                return;
            }

            Photoview.destroyPeriod();

            clearTimeout(window.__pvhideTimer);

            if (listId == 'temp' && cur.pvShown) {
                if (cur.pvListId && cur.pvListId != 'temp') return;
                cur.pvWasShown = true;
            } else {
                cur.pvWasShown = false;
            }
            if (__afterFocus) {
                return ev ? cancelEvent(ev) : false;
            }
            if (cur.pvTagger) {
                Phototag.stopTag();
                if (ev !== false) {
                    return ev ? cancelEvent(ev) : false;
                }
            }

            if (listId === false) {
                if (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown) {
                    if (cur.pvOldListId) {
                        extend(cur, {
                            pvJumpTo: cur.pvOldJumpTo,
                            pvJumpFrom: cur.pvOldJumpFrom,
                            pvJumpSteps: cur.pvOldJumpSteps
                        });
                        if (index == cur.pvOldIndex + 1) ++cur.pvOldIndex;
                        return Photoview.show(cur.pvOldListId, cur.pvOldIndex, ev, root);

                    } else {
                        Photoview.toggleNavControls();
                    }
                }
                listId = cur.pvListId;
            }
            var count = ((cur.pvData || {})[listId] || {}).length,
                otherList = (listId != cur.pvListId);
            if (!count) return;

            if (ev && ev.pageX && ev.pageY) {
                extend(cur, {
                    pvOldX: ev.pageX,
                    pvOldY: ev.pageY,
                    pvOldT: vkNow()
                });
            }

            if ((cur.pvOptions || {}).queue) {
                debugLog('pushing in photoview.show');
                layerQueue.push();
                cur.pvOptions.queue = false;
                cur.pvHistoryLength = 0;
            }

            if (!Photoview.checkLayerVisibility()) {
                otherList = true;
            }

            var newIndex = index + (index < 0 ? count : (index >= count ? (-count) : 0));
            var direction = otherList ? 1 : (cur.pvIndex > index ? -1 : 1);

            if (!otherList && !cur.pvCanvas) {
                if (cur.pvJumpTo) {
                    cur.pvJumpSteps += (index - cur.pvIndex);
                    var needJump = (newIndex === cur.pvJumpFrom && cur.pvJumpSteps >= count);
                    if (needJump) {
                        extend(cur, {
                            pvOldJumpFrom: cur.pvJumpFrom,
                            pvOldJumpSteps: cur.pvJumpSteps - (index - cur.pvIndex),
                            pvOldJumpTo: cur.pvJumpTo
                        });
                        return Photoview.jumpToAlbums(cur.pvJumpSteps < 0);
                    }
                    if (direction > 0) {
                        if (newIndex < cur.pvJumpFrom && newIndex + 4 > cur.pvJumpFrom || newIndex < cur.pvJumpFrom + count && newIndex + 4 > cur.pvJumpFrom + count) {
                            vkImage().src = stManager._srcPrefix('.css') + '/images/icons/post_hh' + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.png?3';
                            var m = cur.pvJumpTo.z.match(/^albums(-?\d+)$/);
                            if (m) {
                                if (!cur.pvAlbumsData) cur.pvAlbumsData = {};
                                if (!cur.pvAlbumsData[m[1]]) {
                                    cur.pvAlbumsData[m[1]] = 'loading';
                                    ajax.post('al_photos.php', {
                                        act: 'show_albums',
                                        owner: m[1],
                                        other: 1
                                    }, {
                                        onDone: Photoview.loadedAlbums
                                    });
                                }
                            }
                        }
                    }
                    if (cur.pvJumpSteps <= -count) {
                        cur.pvJumpSteps += count;
                    }
                }
                if (count == 1 && index != cur.pvIndex && (listId != 'temp' || cur.pvOptions.temp_final)) {
                    Photoview.hide();
                    return ev ? cancelEvent(ev) : false;
                }
            }

            if (otherList && listId != 'temp') {
                if (cur.pvJumpFrom === false) {
                    cur.pvJumpFrom = newIndex;
                }
                cur.pvRoot = root;
                Photoview.updateLocNav();
            }

            index = newIndex;

            var ph = cur.pvData[listId][index];

            if (!ph || !ph.x_ && !ph.x_src) return;

            cur.pvIndex = index;
            cur.pvShown = true;
            cur.pvAlbumsShowing = cur.pvAlbumsShown = false;
            cur.pvAlbumShowing = cur.pvAlbumShown = false;
            cur.pvPhotoTagShowing = cur.pvPhotoTagShown = false;
            cur.pvVideoTagShowing = cur.pvVideoTagsShown = false;
            cur.pvListId = listId;

            Photoview.calculateVeryBig();

            var sz = Photoview.getPhotoSize();

            cur.pvCurData = Photoview.genData(ph, sz);

            if (!cur.pvLayerCreated) {
                Photoview.createLayer();
            }

            if (cur.pvCurrent) {
                cur.pvCurrent.onload = Photoview.blankf;
                cur.pvCurrent.src = Photoview.blank;
            }
            delete cur.pvCurrent;
            cur.pvCurrent = vkImage();
            cur.pvCurrent.onload = Photoview.preload.pbind(index, direction);
            cur.pvCurrent.src = cur.pvCurData.src;

            if (otherList) {
                //var needControls = (count > 1) || ((cur.pvJumpTo || {}).z == 'albums' + val('pva_owner')) || ((cur.pvJumpTo || {}).z == 'album' + val('pvsa_album'));
                Photoview.toggleNavControls(count > 1 ? 'left right close' : 'close');
            }

            hideProgress(cur.pvCounter);

            if (listId == 'temp' && !cur.pvOptions.temp_final) {
                showProgress(cur.pvCounter, '', 'pr_baw');
            } else if (listId == 'temp' && cur.pvOptions.temp_final && cur.pvOptions.temp_summary) {
                //cur.pvSummary.innerHTML = cur.pvOptions.temp_summary;
            } else {
                cur.pvCounter.innerHTML = ((count > 1) ? getLang('photos_photo_counter_num_of_N').replace('%s', cur.pvIndex + 1).replace(/%s|{count}/, count) : '');
                //cur.pvSummary.innerHTML = ((count > 1) ? getLang('photos_photo_num_of_N').replace('%s', cur.pvIndex + 1).replace(/%s|{count}/, count) : getLang('photos_view_one_photo'));
            }

            cur.pvCurPhoto = ph;
            if (!cur.pvCurData.width || !cur.pvCurData.height) {
                cur.pvCurData = cur.pvCurrent;
                cur.pvTimerPassed = 0;
                clearTimeout(cur.pvTimer);
                cur.pvTimer = setTimeout(Photoview.doShow, 0);
            } else {
                Photoview.doShow();
            }

            cur.pvBox && toggleClass(cur.pvBox, 'photos_is_albums_view', !!cur.pvAlbumsShown);

            return ev ? cancelEvent(ev) : false;
        },
        _checkWebGL: function() {
            function tryWebGL() {
                try {
                    var canvas = document.createElement('canvas');
                    canvas.width = canvas.height = 100;
                    var ctxOptions = {
                        preserveDrawingBuffer: true,
                        premultipliedAlpha: false
                    };
                    return !!window.WebGLRenderingContext && (canvas.getContext('webgl', ctxOptions) || canvas.getContext('experimental-webgl', ctxOptions));
                } catch (e) {
                    return false;
                }
            }

            if (navigator.userAgent.indexOf('Windows NT 5.1') >= 0) { // xp
                return -1;
            }

            if (!tryWebGL()) {
                if (browser.safari) {
                    debugLog('photo editor: webgl enable needed');
                    return -2; // need enable
                }
                debugLog('photo editor: webgl not suported');
                return -1; // doesn't support
            } else {
                return 1; // enabled
            }
        },

        openEditor: function(mediaId, src) { // parameters optional and for webcam
            src = src ? src : cur.pvCurData.src;

            function _openEditor(hasCors) {
                if (!hasCors) {
                    debugLog('photo editor: CORS not available (' + src + ')');
                }
                return showBox('al_photos.php', {
                    act: 'edit_photo',
                    photo: mediaId ? mediaId : cur.pvData[cur.pvListId][cur.pvIndex].id,
                    webgl: Photoview._checkWebGL(),
                    cors: hasCors
                }, {
                    dark: 1,
                    stat: ['ui_controls.css', 'ui_controls.js']
                });
            }
            var testImg = vkImage();
            testImg.onerror = function() {
                _openEditor(0);
            }
            testImg.onload = function() {
                _openEditor(1);
            }
            testImg.crossOrigin = '';
            testImg.src = src;
        },

        showSpamActions: function() {
            show(geByClass1('pv_more_acts_hidden'));
            cur.pvMoreActionsTooltip.updatePosition();
        },

        doShow: function() {
            show(cur.pvImgProgress);

            var img = cur.pvCurData;
            if ((!img.width || !img.height) && cur.pvTimerPassed < 5000) {
                clearTimeout(cur.pvTimer);
                cur.pvTimerPassed += 100;
                cur.pvTimer = setTimeout(Photoview.doShow, 100);
                return;
            }

            if (!cur.pvShown) return;

            if (cur.pvCanvas) {
                Photoview.pvCanvasSet();
                return;
            }

            Photoview.toggleLightModeClass(true);

            if (isVisible(cur.pvAlbumsWrap)) {
                val('pva_scroll', layerWrap.scrollTop);
                hide(cur.pvAlbumsWrap);
                show(cur.pvPhotoWrap);
                Photoview.updateSize();
            }

            if (isVisible(cur.pvAlbumWrap)) {
                val('pvsa_scroll', layerWrap.scrollTop);
                hide(cur.pvAlbumWrap);
                show(cur.pvPhotoWrap);
                Photoview.updateSize();
            }

            uiScrollBox.hide();

            hide(cur.pvTitle);

            function updateImgSrc(src) {
                cur.pvPhoto.innerHTML = '<img src="' + src + '" />';
            }

            var imgEl = cur.pvPhoto && domFC(cur.pvPhoto);
            if (imgEl && imgEl.src) {
                // dont set src for the same image but with different domain (avoid flickering)
                var regex = /https?:\/\/[a-z0-9\.\-]+/;
                var prevSrc = imgEl.src.replace(regex, '');
                var currSrc = img.src.replace(regex, '');

                if (prevSrc != currSrc) {
                    updateImgSrc(img.src);
                }
            } else {
                updateImgSrc(img.src);
            }

            addEvent(domFC(cur.pvPhoto), 'load', function() {
                hide(cur.pvImgProgress);
            })

            Photoview.updatePhotoDimensions();

            if (window.tooltips) {
                tooltips.destroyAll(cur.pvBox);
            }

            if (cur.pvListId == 'temp') {
                hide(cur.pvCommentsData);
                Photoview.toggleOnPhotoControls(false);
                Photoview.updateVerticalPosition();
                return;
            }

            Photoview.toggleOnPhotoControls(true);

            var ph = cur.pvCurPhoto;

            if (ph.pe_html) { // photo editor was initialized (came from attaches), so show it immideatly.
                ph.closeOnPEEdit = true;
                Photoview.openStickersEditor(ph);
                return;
            }

            var notAvail = (ph.commshown >= 0) ? false : (-ph.commshown);
            var taglnkst = (!ph.taginfo && ph.actions.tag && ph.tags[0] < cur.pvMaxTags) ? '' : ' style="display: none"';

            if (cur.pvTagger) Phototag.stopTag();
            Photoview.hideTag(true);

            if (img.width < 200 || img.height < 200) {
                ph.actions.prof = false;
                ph.actions.dialog = false;
            }

            var albumName = '';
            if (ph.album != 'NA' && notAvail != 2 || ph.graffiti) {
                albumName = ph.album;
            }

            var isMegaOldPhoto = !ph.album || !ph.author;

            // RIGHT BOCK RENDERING
            if (!cur.pvIsLightMode && !isMegaOldPhoto) {
                var rightColumnHTML = '';

                // author block
                rightColumnHTML += '<div class="pv_author_block clear_fix">';
                var authorName = '';
                if (ph.author != 'NA') {
                    authorName = ph.author;
                }

                if (authorName) {
                    if (ph.author_href) {
                        rightColumnHTML += '<a class="pv_author_img fl_l" href="' + ph.author_href + '">';
                    }
                    rightColumnHTML += '<div class="ow_ava ow_ava_comm" style="background-image: url(\'' + ph.author_photo + '\');"></div>';
                    if (ph.author_href) {
                        rightColumnHTML += '</a>';
                    }
                }

                rightColumnHTML += '\
        <div class="pv_author_info"> \
          <div id="pv_author_name">' + authorName + '</div> \
          <div class="pv_date_info_wrap"> \
            <span id="pv_date_info">' + ph.date + '</span> \
          </div> \
        </div> \
      </div>';

                // progress
                rightColumnHTML += getProgressHtml('pv_progress');

                // like
                var commslikes = cur.pvCommsLikes[ph.id],
                    comms = commslikes[0],
                    likes = commslikes[1];

                rightColumnHTML += Likes.makeTemplate(ph.likes_tpl, {
                    object_raw: ph.id,
                    likes_count: likes || '',
                    liked: ph.liked,
                    share_count: ph.shares || '',
                    share_opts: {
                        list: cur.pvListId,
                        to: 'mail'
                    }
                });

                // description
                var showDesc = ph.actions.edit & 1 || ph.desc;

                if (showDesc) {
                    var desc = ph.desc;
                    var descText = '<div' + (ph.actions.edit & 1 ? (' class="pv_can_edit pv_desc_cont" onclick="Photoview.editInline(event)"' + (ph.desc ? (' onmouseover=""') : '')) : ' class="pv_cant_edit pv_desc_cont"') + '>' + (ph.desc || ('<span class="pv_desc_edit">' + getLang('photos_edit_desc') + '</span>')) + '</div>';
                }

                if (ph.was_edited == 1) {
                    rightColumnHTML += '<div id="pv_edit_info" class="pv_right_block">' + getLang('photos_was_edited') + '</div>';
                } else if (ph.was_edited) {
                    rightColumnHTML += '<div id="pv_edit_info" class="pv_right_block" onmouseover="showTooltip(this, {text: \'' + ph.was_edited + '\', black: 1});">' + getLang('photos_was_edited') + '</div>';
                }

                rightColumnHTML += '<div id="pv_desc" class="pv_right_block" style="' + (showDesc ? '' : 'display: none') + '">' + descText + '</div>';

                rightColumnHTML += '<div id="pv_microdata">' + (ph.microdata_html ? ph.microdata_html : '') + (ph.microdata_preview_button ? ph.microdata_preview_button : '') + '</div>';
                if (ph.microdata_html) {
                    shortCurrency();
                }

                // tags
                var tagsst = ph.tagshtml ? '' : ' style="display: none"';
                rightColumnHTML += '<div id="pv_tags"' + tagsst + ' class="pv_right_block">' + getLang('photos_onthisphoto') + ': ' + ph.tagshtml + '</div>';

                // place
                var placeText = ph.place ? ('<span class="pv_place_label"></span> <a class="pv_place_a" id="pv_place_a" onclick="Photoview.showPlace()">' + ph.place + '</a>') : '';
                rightColumnHTML += '<div id="pv_place" class="pv_right_block">' + placeText + '</div>';

                { // comments
                    rightColumnHTML += comms.tagName ? '<div id="pv_comments_place"></div>' : trim(comms); // can be node element

                    // reply block
                    cur.pvReplyForm && re(cur.pvReplyForm);
                    cur.pvReplyForm = null;
                }

                // rotate
                rightColumnHTML += '<div id="pv_rotate"><form method="POST" target="pv_rotate_frame" name="pv_rotate_form" id="pv_rotate_form"></form></div></div>';

                cur.pvNarrow.innerHTML = '';

                Photoview.updateRightBlock();

                cur.pvNarrow.innerHTML = rightColumnHTML;

                var closedCommentsPlaceholderEl = geByClass1('pv_closed_commments_placeholder');
                if (notAvail || !ph.actions.comm) {
                    removeClass(closedCommentsPlaceholderEl, 'unshown');

                } else if (ph.reply_form) {
                    addClass(closedCommentsPlaceholderEl, 'unshown');

                    ph.replyFormEl = cur.pvReplyForm = ph.replyFormEl || se(ph.reply_form);
                    cur.pvNarrowColumn.appendChild(cur.pvReplyForm);
                    cur.onReplyFormSizeUpdate = cur.onMediaChanged = function(currentMedias) {
                        if (cur.pvShown) {
                            Photoview.updateRightBlock();
                        }
                    };
                    cur.onReplyFormFocus = function() {
                        Photoview.updateRightBlock(true);
                        cur.pvNarrowScrollbar.scrollBottom(0, true);
                    };
                }

                { // add comments if they are nodes
                    if (comms.tagName) {
                        each(geByClass('page_gif_loading', comms), function() {
                            Page.hideGif(this, false);
                        });
                        var commsNode = ge('pv_comments_place');
                        domPN(commsNode).replaceChild(comms, commsNode);
                    }
                }

                cur.pvNarrowScrollbar = new uiScroll(cur.pvNarrow, {
                    global: true
                });

                // comments reply form init ...
                if (ph.reply_form) {
                    var rf = geByClass1('reply_field', cur.pvNarrowColumn);
                    data(rf, 'send', Photoview.sendComment);
                    placeholderInit(rf, {
                        editable: 1
                    });
                }

                // reset reply form box editing flag
                cur.editing = false;

                Photoview.updateRightBlock();
            }

            var actionsHTML = '';

            { // BOTTOM BLOCK RENDERING
                albumName = albumName || '';
                cur.pvAlbumName.innerHTML = albumName;
                toggle(cur.pvBottomInfo, !cur.pvIsLightMode || cur.pvShowBottomActions || albumName);

                var _actionsHTML = [];

                if (vk.id) {
                    _actionsHTML.push('<a id="pv_share" onclick="Photoview.sendPhoto()">' + getLang('photos_share_from_view') + '</a>');
                }

                if (!ph.taginfo && ph.actions.tag && ph.tags[0] < cur.pvMaxTags) {
                    _actionsHTML.push('<a id="pv_tag_link" onclick="stManager.add([\'photo_tagger_mode.js\', \'tagger.css\', \'tagger.js\'], function() { Phototag.startTag(); })">' + getLang('photos_tagperson') + '</a>');
                }

                if (ph.actions.del) {
                    _actionsHTML.push('<a id="pv_delete" onclick="Photoview.deletePhoto()">' + getLang('photos_pv_act_delete') + '</a>');
                }
                if (ph.actions.save) {
                    _actionsHTML.push('<a id="pv_save_to_me" onclick="Photoview.savePhoto()">' + getLang('photos_pv_act_save') + '</a>');
                }

                /**
                 * �������� � ���. ��������� ����� ���������� � ����� ���� � each(actions, function(i, act) { })
                 *
                 * act[0] - ����� id, pv_more_act_ + act[0]
                 * act[1] - ��������
                 * act[2] - onclick
                 * act[3] - onmouseover
                 */
                if (cur.pvShowBottomActions && !isMegaOldPhoto) {
                    var actions = [];
                    var spamActions = [];

                    if (ph.actions.spam) {
                        actions.push(['spam', getLang('photos_report'), '', 'Photoview.showSpamActions()']);
                        actions.push('sep');
                        spamActions = cur.pvReasons;
                    }

                    if (ph.actions.forbid) {
                        var photoIds = Photoview._getViewedPhotoFullId().split("_");
                        var ownerId = photoIds[0];
                        var objectId = photoIds[1];
                        var typeId = 1;

                        // @uglified addToForbiddenRegistry, showForbidObjectForm
                        actions.push(['atfr', getLang('reports_atfr'), 'sfof(' + ownerId + ', ' + objectId + ', ' + typeId + ')']);
                    }

                    if (ph.actions.edit) {
                        if (ph.pe_type & Photoview.PE_V1 || ph.pe_type & Photoview.PE_V2) {
                            actions.push(['pe', getLang('photos_pv_act_photoeditor'), 'Photoview.openEditor()']);
                        }
                    }

                    if (vk.id && (ph.pe_type & Photoview.PE_V3) && isPhotoeditor3Available() && !inArray(nav.objLoc[0], ['support', 'helpdesk'])) {
                        actions.push(['spe', getLang('global_pe_edit'), 'Photoview.openStickersEditor()']);
                    }

                    if (ph.actions.rot) {
                        actions.push(['rotate_ccw', getLang('photos_pv_act_rotate_ccw'), 'Photoview.rotatePhoto(-1)']);
                        actions.push(['rotate_cw', getLang('photos_pv_act_rotate_cw'), 'Photoview.rotatePhoto(1)']);

                        actions.push('sep');
                    }

                    if (ph.actions.place) {
                        actions.push(['place', getLang('photos_edit_add_place'), 'Photoview.editPlace()']);
                    }

                    if (ph.actions.prof) {
                        actions.push(['to_profile', getLang('photos_pv_act_to_avatar'),
                            "showBox('al_page.php', {act: 'owner_photo_edit', photo: '" + ph.id + "'}, {stat: ['owner_photo.css', 'owner_photo.js', 'tagger.css', 'tagger.js']})"
                        ]);
                    }

                    if (ph.actions.dialog) {
                        actions.push(['to_dialog', getLang('photos_load_to_dialog'), 'showBox(\'al_page.php\', {act: \'owner_photo_edit\', photo: \'' + ph.id + '\', oid: ' + ph.actions.dialog + ', list: \'' + cur.pvListId + '\'}, {stat: [\'owner_photo.css\', \'owner_photo.js\', \'tagger.css\', \'tagger.js\']});']);
                    }

                    if (ph.actions.move) {
                        var oid = ph.id.split('_')[0];
                        actions.push(['move_to', getLang('photos_pv_act_move_to_album'),
                            "showBox('al_photos.php', {act: 'a_move_to_album_box', photo_id: '" + ph.id + "', owner_id: " + oid + "}, {stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css']})"
                        ]);

                        if (ph.actions.cover) {
                            actions.push(['as_title', getLang('photos_album_to_cover'),
                                "ajax.post('al_photos.php', {act: 'a_set_as_album_title', photo: '" + ph.id + "', hash: '" + ph.hash + "'}, {onDone: showDoneBox})"
                            ]);
                        }
                    }

                    var spamActionsHtml = '';
                    each(spamActions, function(i, act) {
                        var onclick = "Photoview.report('" + ph.hash + "', '" + act[0] + "')";
                        spamActionsHtml += '<div onclick="' + onclick + '" class="pv_more_act_item pv_more_spam_act_item" id="pv_more_spam_act_' + act[0] + '">' + act[1] + '</div>';
                    });
                    spamActionsHtml = spamActionsHtml ? ('<div class="pv_more_acts_hidden">' + spamActionsHtml + '</div>') : '';

                    var actionsHtml = '';
                    each(actions, function(i, act) {
                        if (act == 'sep') {
                            actionsHtml += '<div class="pv_more_act_item_sep"></div>';
                        } else {
                            actionsHtml += '<div class="pv_more_act_item" onmouseover="' + (act[3] || '') + '" onclick="' + (act[2] || '') + '" id="pv_more_act_' + act[0] + '">' + act[1] + '</div>';
                        }
                    });
                    actionsHtml += '<a class="pv_more_act_item" id="pv_more_act_download" target="_blank" rel="noopener" href="' + Photoview.genData(ph, 'w').src + '">' + getLang('photos_pv_act_open_original') + '</a>';
                    actionsHtml = '<div class="pv_more_acts">' + actionsHtml + '</div>';

                    if (actions.length) {
                        actions = JSON.stringify(actions);
                        actions = actions.replace(/\"/g, '&quot;');
                        _actionsHTML.push('<a class="pv_actions_more" data-items="' + actions + '">' + getLang('photos_actions_more') + '</a>');
                    } else if (inArray(nav.objLoc[0], ['support', 'helpdesk'])) {
                        _actionsHTML.push('<a id="pv_more_act_download" target="_blank" rel="noopener" href="' + Photoview.genData(ph, 'w').src + '">' + getLang('photos_pv_act_open_original') + '</a>');
                    }

                    _actionsHTML = _actionsHTML.join('<span class="divider"></span>');
                    if (cur.pvIsLightMode) {
                        _actionsHTML += '<div id="pv_rotate" style="display:none;"><form method="POST" target="pv_rotate_frame" name="pv_rotate_form" id="pv_rotate_form"></form></div></div>';
                    }

                    cur.pvBottomActions.innerHTML = _actionsHTML;

                    var actionsMoreEl = geByClass1('pv_actions_more');
                    if (actionsMoreEl) {
                        cur.pvMoreActionsTooltip = new ElementTooltip(actionsMoreEl, {
                            id: 'pv_more_acts_tt',
                            forceSide: 'top',
                            elClassWhenShown: 'pv_more_shown',
                            content: spamActionsHtml + actionsHtml,
                            offset: [0, -5],
                            autoShow: true,
                            noHideOnClick: true
                        });
                    }
                }
            }

            Photoview.updatePhotoDimensions();

            extend(cur, {
                pvTagLink: ge('pv_tag_link'),
                pvLikeIcon: geByClass1('pv_like_icon'),
                pvLikeLink: geByClass1('pv_like_link'),
                pvDesc: ge('pv_desc'),
                pvTags: ge('pv_tags'),
                pvEditing: false,
                pvProgress: ge('pv_progress')
            });

            if (ph.deleted || !ph.author) {
                cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');
                if (isArray(ph.deleted)) {
                    Photoview.toggleTopInfoPanel(ph.deleted[0], ph.deleted[1]);
                }

                if (!isMegaOldPhoto) {
                    Photoview.toggleDeletedState(true);
                }

            } else if (ph.taginfo) {
                cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');

                Photoview.toggleTopInfoPanel(ph.taginfo, '\
        <button class="flat_button" id="pv_confirm_tag" onclick="Photoview.confirmTag(' + ph.tagid + ', this)">' + getLang('photos_confirm_tag') + '</button> \
        <button class="flat_button secondary black" id="pv_delete_tag" onclick="Photoview.deleteTag(' + ph.tagid + ', this)">' + getLang('photos_delete_tag') + '</button> \
      </div>');

                show(cur.pvCommentsData);

            } else {
                Photoview.toggleTopInfoPanel(false);
                //show(cur.pvCommentsData);
                Photoview.toggleDeletedState(false);
            }

            if ((cur.pvOptions || {}).scroll) {
                cur.pvNarrowScrollbar && cur.pvNarrowScrollbar.scrollTop(cur.pvOptions.scroll);
            }

            cur.pvBodyScrollTop = bodyNode.scrollTop;
            setTimeout(function() {
                if (cur.pvBodyScrollTop !== undefined) {
                    bodyNode.scrollTop = cur.pvBodyScrollTop;
                    delete cur.pvBodyScrollTop;
                }
            }, 0);

            Photoview.updateVerticalPosition();

            // Init photo tags component for the photo
            var imageEle = domFC(cur.pvPhoto);
            if (cur.pvPhotoTags) {
                cur.pvPhotoTags.reload(imageEle);
            } else if (vk.id) {
                cur.pvPhotoTags = new PhotoTags(imageEle, cur.pvPhotoTagsContainer);
            }

            setTimeout(Photoview.afterShow, 2);
        },

        toggleTopInfoPanel: function(text, btns) {
            var doShow = isString(text) ? true : !!text;

            if (text !== undefined) {
                cur.pvTagInfoText.innerHTML = text;
            }
            if (btns !== undefined) {
                cur.pvTagInfoButtons.innerHTML = btns;
            }

            toggle(cur.pvTagInfo, doShow);

            Photoview.updatePhotoTagsContainerDimensions();
            Photoview.updatePhotoDimensions();
        },

        toggleDeletedState: function(isDeleted) {
            isDeleted = !!isDeleted;

            toggleClass(cur.pvCont, 'pv_deleted_state', isDeleted);
            Photoview.updateRightBlock();
        },

        updatePhotoTagsContainerDimensions: function(w) {
            var imgEl = domFC(cur.pvPhoto);
            if (!imgEl) {
                return;
            }

            if (!w) {
                w = imgEl.offsetWidth;
            }

            var x = imgEl.offsetLeft,
                y = imgEl.offsetTop;

            setStyle(cur.pvPhotoTagsContainer, {
                top: y + 'px',
                left: x + 'px',
                width: w + 'px'
            });
        },

        updateTagFrameDimensions: function(w, h, imgTopOffset) {
            var imgEl = domFC(cur.pvPhoto);
            if (!imgEl) {
                return;
            }

            var x = imgEl.offsetLeft,
                y = imgEl.offsetTop;

            setStyle(cur.pvTagFaded, {
                width: cur.pvPhWidth + 'px',
                height: cur.pvPhHeight + 'px',
                left: x + 'px',
                top: y + 'px'
            });

            setStyle(cur.pvTagFrame, {
                left: x + 'px',
                top: y + 'px'
            });

            setStyle(cur.pvTagPerson, {
                left: x + 'px',
                top: y + 'px'
            });

            if (w && h) {
                setStyle(domFC(cur.pvTagFrame), {
                    width: w,
                    height: h,
                    marginTop: intval(imgTopOffset)
                });
            }
        },

        afterShow: function() {
            cur.pvPhoto.href = '/photo' + cur.pvCurPhoto.id;
            cur.pvPhoto.focus();

            if ((cur.pvCurPhoto.actions.edit & 4 && cur.pvCurPhoto.actions.edit & 1) && !cur.pvCurPhoto.desc) {
                Photoview.editInline();
            }

            cur.pvTagFrame.innerHTML = '<img src="' + cur.pvCurData.src + '" />';

            Photoview.updateTagFrameDimensions();

            if ((cur.pvOptions || {}).scroll) {
                layerWrap.scrollTop = cur.pvOptions.scroll;
                cur.pvOptions.scroll = 0;
            }

            Photoview.updateLoc();

            Photoview.updatePhotoDimensions();
        },
        pvCanvasUpdate: function(force) {
            var img = cur.pvCurData;
            if (!cur.pvCanvas || !img || !img.width || !img.height) return;

            cur.pvScrWidth = cur.pvCanvas.offsetWidth;
            cur.pvScrHeight = cur.pvCanvas.offsetHeight;

            var c = 1,
                t = 0,
                l = 0,
                w = img.width || 604,
                h = img.height || 453,
                imgElWrap = ge('pv_fs_img_fade') || ge('pv_fs_img_wrap'),
                imgEl = imgElWrap && domFC(imgElWrap);
            c = cur.pvScrWidth / w;
            if (h * c > cur.pvScrHeight) {
                c = cur.pvScrHeight / h;
            }
            if (c > 1.25) c = 1.25;
            w = Math.floor(w * c);
            h = Math.floor(h * c);
            t = Math.floor((cur.pvScrHeight - h) / 2);

            if (cur.pvFSWidth != w || cur.pvFSHeight != h || cur.pvFSTop != t || force) {
                cur.pvFSWidth = w;
                cur.pvFSHeight = h;
                cur.pvFSTop = t;
                if (imgEl) {
                    setStyle(imgEl, {
                        marginTop: t,
                        width: w,
                        height: h
                    });
                }
            }
        },
        pvCanvasSet: function() {
            var img = cur.pvCurData;
            if (!cur.pvCanvas || !img) return;

            var i = vkImage(),
                replaceFade = function() {
                    if (ge('pv_fs_img_fade')) {
                        re('pv_fs_img_wrap');
                        ge('pv_fs_img_fade').id = 'pv_fs_img_wrap';
                    }
                },
                onLoaded;
            replaceFade();
            if (domFC(ge('pv_fs_img_wrap')) && cur.pvSlideNeedAnimation) {
                cur.pvSlideNeedAnimation = false;
                cur.pvCanvas.insertBefore(se('<div id="pv_fs_img_fade"><img src="' + img.src + '" /></div>'), ge('pv_fs_img_wrap'));
                onLoaded = function() {
                    cssAnim(ge('pv_fs_img_wrap'), {
                        opacity: 0
                    }, {
                        duration: 1000
                    }, function() {
                        replaceFade();
                        Photoview.fullscreenOnLoad();
                    });
                    cssAnim(ge('pv_fs_img_fade'), {
                        opacity: 1
                    }, {
                        duration: 1000
                    });
                }
            } else {
                val(ge('pv_fs_img_wrap'), '<img src="' + img.src + '" />');
                onLoaded = Photoview.fullscreenOnLoad;
            }
            Photoview.pvCanvasUpdate(true);
            i.onload = onLoaded;
            i.src = img.src;

            if (window.FullscreenPV) FullscreenPV.updateInfo();
        },
        updateLoc: function() {
            var nl, listId = cur.pvListId;
            if (cur.pvRoot) {
                nl = {
                    0: 'photo' + cur.pvCurPhoto.id
                };
                if (listId.substr(0, 6) == 'photos') {
                    nl.all = 1;
                } else if (listId.substr(0, 3) == 'tag') {
                    nl.tag = intval(listId.substr(3));
                } else if (listId.substr(0, 6) == 'newtag') {
                    nl.newtag = intval(listId.substr(6));
                }
                if (listId.indexOf('/rev') != -1) {
                    nl.rev = 1;
                }
            } else {
                nl = extend(nav.objLoc, {
                    z: 'photo' + cur.pvCurPhoto.id + '/' + (cur.pvCurPhoto.list_override || listId)
                });
            }

            if (nav.strLoc != nav.toStr(nl)) {
                if (!cur.pvNoHistory) {
                    ++cur.pvHistoryLength;
                }
                nav.setLoc(nl);
                if ((cur.pvOptions || {}).fromQueue) {
                    cur.pvNoHistory = true;
                    cur.pvHistoryLength = 0;
                }
            }
            if (cur.pvOptions) cur.pvOptions.fromQueue = false;
        },

        canFullscreen: function() {
            var b = browser,
                v = floatval(browser.version);
            return !b.mobile && (document.fullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || b.safari && v > 5);
        },
        fullscreenOnLoad: function() {
            if (window.FullscreenPV) {
                FullscreenPV.slide();
            }
        },
        fullscreenEnd: function(finishing) {
            var el = cur.pvCanvas;
            if (!el) return;
            cleanElems(el);
            re(el);
            clearTimeout(cur.pvFSTimer);
            clearTimeout(cur.pvFSControlsTimer);
            cur.pvCanvas = cur.pvFSControls = cur.pvFSTimer = cur.pvFSControlsTimer = false;
            removeEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange webkitfullscreenerror mozfullscreenerror fullscreenerror');
            show(pageNode);
            if (cur.pvCanvasUpdateTO) {
                clearInterval(cur.pvCanvasUpdateTO);
            }
            if (cur.pvScrWasY !== undefined) {
                scrollToY(cur.pvScrWasY, 0);
                delete cur.pvScrWasY;
            }
            if (finishing !== true) {
                Photoview.updateSize();
                Photoview.show(cur.pvListId, cur.pvIndex);
            }
        },
        fullscreen: function(event) {
            if (cur.pvCanvas || cur.pe) return;

            var el = cur.pvCanvas = bodyNode.appendChild(ce('div', {
                    className: 'fixed',
                    id: 'pv_fullscreen',
                    innerHTML: '<div id="pv_fs_img_wrap"></div>'
                })),
                method = el.requestFullscreen || el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

            cur.pvFinishing = false;
            stManager.add(['fullscreen_pv.css', 'fullscreen_pv.js'], function() {
                FullscreenPV.init();
            });

            addEvent(document, 'webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenchange', Photoview.onFullscreen);
            addEvent(document, 'webkitfullscreenerror mozfullscreenerror MSFullscreenError fullscreenerror', Photoview.fullscreenEnd.pbind(true));

            try {
                method.call(el);
            } catch (e) {
                cur.pvPartScreen = true;
                Photoview.onFullscreen();
            }

            return cancelEvent(event);
        },
        fullscreenStop: function(finishing) {
            cur.pvFinishing = (finishing === true);
            cur.pvPartScreen = false;
            var method = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
            try {
                method.call(document);
            } catch (e) {
                Photoview.onFullscreen();
            }
            setTimeout(Photoview.fullscreenEnd, 30);
        },
        onFullscreen: function() {
            if (isFullScreen()) {
                if (cur.pvTagger) {
                    Phototag.stopTag();
                }
                cur.pvScrWidth = cur.pvCanvas.offsetWidth;
                cur.pvScrHeight = cur.pvCanvas.offsetHeight;
                cur.pvScrWasY = scrollGetY();
                hide(pageNode);
                cur.pvCanvasUpdateTO = setInterval(Photoview.pvCanvasUpdate.pbind(false), 100);
                if (!cur.pvFinishing) {
                    Photoview.updateSize();
                    Photoview.show(cur.pvListId, cur.pvIndex);
                }
            } else {
                Photoview.fullscreenEnd(cur.pvFinishing);
            }
        },

        showDD: function(obj, dd) {
            if (hasClass(obj, 'pv_report_blocked')) {
                return;
            }
            if (!dd) {
                return;
            }
            clearTimeout(cur.hideShareTimer);
            obj.blur();
            if (hasClass(dd, 'pv_dd_hiding')) {
                return;
            }
            if (isVisible(dd)) {
                return fadeIn(dd, 0);
            }
            if (cur.ddShown) {
                Photoview.hideDD(0);
            }
            cur.ddShown = dd;
            setTimeout(addEvent.pbind(document, 'click', Photoview.hideDD), 1);
            show(dd);
        },

        hideDD: function(timeout) {
            if (timeout > 0) {
                cur.hideShareTimer = setTimeout(Photoview.hideDD.pbind(0), timeout);
                return;
            }
            var dd = cur.ddShown;
            if (!dd) return;
            if (timeout == -1) {
                hide(dd);
            } else {
                addClass(dd, 'pv_dd_hiding')
                fadeOut(dd, 200, function() {
                    removeClass(dd, 'pv_dd_hiding')
                });
            }
            removeEvent(document, 'click', Photoview.hideDD);
            cur.ddShown = false;
        },

        createDD: function(rows, name) {
            return '<div onmouseover="Photoview.showDD(this.previousSibling, this);" onmouseout="Photoview.hideDD(500)" onclick="Photoview.hideDD(-1)" class="pvs_dd fixed"><table cellspacing="0" cellpadding="0"><tr>\
    <td class="pvs_side_sh"><div class="pvs_side_sh_el"></div></td>\
    <td>\
      <div class="pvs_header_wrap"><div class="pvs_header"><span class="pvs_header_text">' + name + '</span></div></div>\
      <div class="pvs_acts">' + rows + '</div>\
      <div class="pvs_sh1"></div><div class="pvs_sh2"></div>\
    </td>\
    <td class="pvs_side_sh"><div class="pvs_side_sh_el"></div></td>\
  </tr></table></div>'
        },

        report: function(hash, reason) {
            var ids = cur.pvCurPhoto.id.split('_');

            var onDone = function() {
                var menuItemEl = ge('pv_more_act_spam');
                val(menuItemEl, getLang('global_report_sent'));

                re(geByClass1('pv_more_acts_hidden'));
                cur.pvMoreActionsTooltip.updatePosition();
                cur.pvMoreActionsTooltip.show();
            };

            stManager.add([jsc('web/reports.js'), 'reports.css'], function() {
                window.showReportReasonDescriptionPopup('photo', parseInt(ids[0]), parseInt(ids[1]), parseInt(reason), hash, onDone);
            });
        },

        showShare: function() {
            clearTimeout(cur.hideShareTimer);
            var dd = ge('pvs_dd');
            ge('pv_share').blur();
            if (isVisible(dd)) {
                return fadeIn(dd, 0);
            }
            setTimeout(addEvent.pbind(document, 'click', Photoview.hideShare), 1);
            show(dd);
        },
        hideShare: function(timeout) {
            if (timeout > 0) {
                cur.hideShareTimer = setTimeout(Photoview.hideShare.pbind(0), timeout);
                return;
            }
            var dd = ge('pvs_dd');
            if (!dd) return;
            if (timeout == -1) {
                hide(dd);
            } else {
                fadeOut(dd, 200);
            }
            removeEvent(document, 'click', Photoview.hideShare);
        },
        savePhoto: function() {
            var listId = cur.pvListId;
            var ph = cur.pvData[listId][cur.pvIndex];

            ajax.post('al_photos.php', {
                act: 'save_me',
                photo: ph.id,
                list: listId,
                hash: ph.hash
            }, {
                onDone: function() {
                    var btn = document.getElementById('pv_save_to_me');

                    domPN(btn).replaceChild(ce(
                        'div', {
                            className: 'pv_save_to_me_saved',
                            innerHTML: getLang('photos_pv_act_save_saved')
                        }
                    ), btn);

                    ph.actions.save = 0;
                },
                onFail: function(error) {
                    showFastBox(getLang('global_error'), error);

                    return true;
                }
            });
        },
        sendPhoto: function() {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            showBox('like.php', {
                act: 'publish_box',
                object: 'photo' + ph.id,
                list: listId,
                to: 'mail'
            }, {
                stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css', 'sharebox.js']
            });
        },
        moveToAlbumBox: function(ownerId, photoId, from) {
            return !showBox('al_photos.php', {
                act: 'a_move_to_album_box',
                photo_id: ownerId + '_' + photoId,
                owner_id: ownerId,
                from: from
            }, {
                stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css']
            });
        },
        moveToAlbum: function(photoId, albumId, hash) {
            ajax.post('al_photos.php', {
                act: 'a_move_photo',
                photo: photoId,
                album_id: albumId,
                hash: hash
            }, {
                onDone: function(albumLink, albumId) {
                    curBox().hide();
                    var albumName = ge('pv_album_name');
                    if (albumName) {
                        albumName.innerHTML = albumLink;
                    }
                    cur.pvCurPhoto.album = albumLink;
                    showDoneBox('<div class="pv_done_box">' + getLang('photos_move_to_album_success').replace('{album}', albumLink) + '</div>');
                }
            });
        },

        setTags: function(tags) {
            Photoview.hideTag();
            if (!tags) {
                hide(cur.pvTags);
                return;
            }
            show(cur.pvTags);
            if (window.tooltips) {
                each(geByClass('delete', cur.pvTags), function() {
                    tooltips.destroy(this);
                });
            }
            cur.pvTags.innerHTML = getLang('photos_onthisphoto') + ': ' + tags;
        },
        preload: function(from, direction) {
            window.updateWndVScroll && updateWndVScroll(); // Because called on photo load
            var listId = cur.pvListId,
                count = ((cur.pvData || {})[listId] || {}).length;

            if (!count) return;

            var s1 = cur.pvVeryBig > 2 ? 'w' : (cur.pvVeryBig ? 'z' : 'y');
            var s2 = cur.pvVeryBig > 1 ? 'z' : (cur.pvVeryBig ? 'z' : 'y');
            var s3 = cur.pvVeryBig > 1 ? 'z' : (cur.pvVeryBig ? 'y' : 'x');
            var s4 = cur.pvVeryBig > 1 ? 'y' : (cur.pvVeryBig ? 'x' : 0);

            cur.pvLastFrom = from;
            cur.pvLastDirection = direction;

            var allSizes = cur.shownAs1AprilEditor ? Photoview.photoSize1April : Photoview.allSizes

            // remove preloaded ones without touching preloading ones
            for (var i = 0; i < Math.min(Photoview.cacheSize, count - Photoview.cacheSize); ++i) {
                var ind = from + (i + 1) * (-direction);
                while (ind >= count) ind -= count;
                while (ind < 0) ind += count;

                var p = cur.pvData[listId][ind];
                if (!p) continue;
                for (var j = 0, l = allSizes.length; j < l; ++j) {
                    var s = allSizes[j];
                    if (p[s] && p[s].src) {
                        p[s].src = Photoview.blank;
                        delete(p[s]);
                    }
                }
            }

            for (var i = 0; i < Photoview.cacheSize; ++i) {
                var ind = from + (i + 1) * direction;
                while (ind >= count) ind -= count;
                while (ind < 0) ind += count;

                var p = cur.pvData[listId][ind];
                if (!p || !p.id) {
                    if (!p || (vkNow() - p > 3000)) {
                        cur.pvData[listId][ind] = vkNow();
                        setTimeout(function() {
                            ajax.post('al_photos.php', {
                                act: 'show',
                                list: listId,
                                offset: Photoview.realOffset(listId, ind, -1),
                                direction: direction
                            }, {
                                onDone: Photoview.loaded
                            });
                        }, 10);
                    }
                    break;
                }

                if (p[s1]) continue;
                if (p[s1 + '_src']) {
                    p[s1] = vkImage();
                    p[s1].src = p[s1 + '_src'];
                    continue;
                } else {
                    p[s1] = 1;
                }

                if (p[s2]) continue;
                if (p[s2 + '_src']) {
                    p[s2] = vkImage();
                    p[s2].src = p[s2 + '_src'];
                    continue;
                } else {
                    p[s2] = 1;
                }

                if (p[s3]) continue;
                if (p[s3 + '_src']) {
                    p[s3] = vkImage();
                    p[s3].src = p[s3 + '_src'];
                    continue;
                } else {
                    p[s3] = 1;
                }

                if (p[s4]) continue;
                if (p[s4 + '_src']) {
                    p[s4] = vkImage();
                    p[s4].src = p[s4 + '_src'];
                    continue;
                } else {
                    p[s4] = 1;
                }

                if (p.x) continue;
                p.x = vkImage();
                p.x.src = p.x_src;
            }
        },
        hide: function(noLoc, fromQueue) {
            Photoview.hideTag(true);
            if (!cur.pvShown || __afterFocus && fromQueue !== true) return;
            if (cur.pvCanvas) Photoview.fullscreenStop(true);

            cur.prevPhotoWidth = cur.prevPhotoHeight = 0;

            if ((cur.pvJumpTo || {}).z == 'albums' + val('pva_owner') && !cur.pvAlbumsShown && noLoc === 0) {
                return Photoview.jumpToAlbums(true);
            }
            if ((cur.pvJumpTo || {}).z == 'album' + val('pvsa_album') && !cur.pvAlbumShown && noLoc === 0) {
                return Photoview.jumpToAlbum(true);
            }
            if ((cur.pvJumpTo || {}).z == 'tag' + val('pvsa_tag') && !cur.pvPhotoTagShown && noLoc === 0) {
                return Photoview.jumpToTagged(true);
            }
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
            } else if (!cur.pvNoHistory && !noLoc && cur.pvHistoryLength > 0 && cur.pvHistoryLength < 10) {
                cur.pvNoHistory = true;
                __adsUpdate('very_lazy');
                cur.pvBodyScrollTop = bodyNode.scrollTop;
                return history.go(-cur.pvHistoryLength);
            }

            if (noLoc !== true && !layerQueue.count()) {
                var newLoc;
                if (cur.pvRoot) {
                    if (cur.pvListId.substr(0, 6) == 'newtag') {
                        newLoc = 'albums' + vk.id + '?act=added';
                        if (cur.pvListId.indexOf('/rev') != -1) {
                            newLoc += '&rev=1';
                        }
                    } else {
                        newLoc = cur.pvListId.replace(/^photos/, 'albums').replace('/rev', '?rev=1');
                    }
                    nav.setLoc(newLoc);
                } else {
                    newLoc = clone(nav.objLoc);
                    delete(newLoc.z);
                }
                if (nav.strLoc != nav.toStr(newLoc)) {
                    nav.setLoc(newLoc);
                }
                __adsUpdate('very_lazy');
            }

            // cur.pvBodyScrollTop = bodyNode.scrollTop;
            window.__pvhideTimer = setTimeout(Photoview.doHide.pbind(cur), 0);
            __adsUpdate();

            cur.pvAlbumsShowing = cur.pvAlbumsShown = false;
            cur.pvAlbumShowing = cur.pvAlbumShown = false;
            cur.pvPhotoTagShowing = cur.pvPhotoTagShown = false;
            cur.pvVideoTagShowing = cur.pvVideoTagsShown = false;
        },

        doHide: function(c) {
            if (cur.pvBodyScrollTop !== undefined) {
                bodyNode.scrollTop = cur.pvBodyScrollTop;
                delete cur.pvBodyScrollTop;
            }
            if (cur.pvTaggerTooltip) {
                cur.pvTaggerTooltip.unMount();
                delete cur.pvTaggerTooltip;
            }
            c.pvHistoryLength = 0;
            if (cur.pvTagger) Phototag.stopTag();
            cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');
            if (c.pvFriends) {
                cleanElems('pv_add_tag', 'pv_cancel_tag', c.pvFriends.firstChild.firstChild, c.pvFriends);
                re(c.pvFriends);
                c.pvFriends = c.pvFriendName = false;
            }

            Wall.cancelEdit(true);

            var allSizes = cur.shownAs1AprilEditor ? Photoview.photoSize1April : Photoview.allSizes

            // remove preloaded
            var listId = c.pvListId,
                count = ((c.pvData || {})[listId] || {}).length;
            if (c.pvLastDirection && count) {
                for (var i = 0; i < Photoview.cacheSize; ++i) {
                    var ind = c.pvLastFrom + (i + 1) * c.pvLastDirection;
                    while (ind >= count) ind -= count;
                    while (ind < 0) ind += count;

                    var p = c.pvData[listId][ind];
                    if (!p) continue;
                    for (var j = 0, l = allSizes.length; j < l; ++j) {
                        var s = allSizes[j];
                        if (p[s] && p[s].src) {
                            p[s].src = Photoview.blank;
                            delete(p[s]);
                        }
                    }
                }
                c.pvLastDirection = c.pvLastFrom = false;
            }

            cur.pvYourComment = re(cur.pvYourComment);

            layers.hide();
            layers.fullhide = false;

            delete cur.pvLayerCreated;

            if (window.tooltips) {
                tooltips.destroyAll(cur.pvBox);
            }

            removeClass(layerWrap, 'pv_layer_wrap');
            removeClass(layerBG, 'pv_layer');
            layerBG.style.opacity = '';

            c.pvShown = c.pvListId = c.pvClicked = false;
            removeEvent(window, 'resize', Photoview.onResize);
            removeEvent(document, 'keydown', Photoview.onKeyDown);
            removeEvent(layerWrap, 'click', Photoview.onLayerClick);
            removeEvent(layerWrap, 'scroll', Photoview.scrollResize);

            removeEvent(layerWrap, 'mousemove', Photoview.onLayerMouseMove);

            //    if (window.wkcur && wkcur.shown) {
            //      WkView.showLayer();
            //    }
            var onh = cur.pvOptions && cur.pvOptions.onHide;
            if (cur.pvOptions) {
                var onh = cur.pvOptions.onHide;
                cur.pvOptions.onHide = false;
                if (onh) onh();
            }
            layerQueue.pop();
            Photoview.destroyPeriod();

            if (c.pvPreloaded && c === cur) {
                var cont = geByClass1('photos_container'),
                    d = ce('div', {
                        innerHTML: c.pvPreloaded
                    });
                while (d.firstChild) {
                    cont.appendChild(d.firstChild);
                }
                if (cont.qsorter) {
                    setTimeout(qsorter.added.pbind(cont), 0);
                }
                c.pvPreloaded = false;
            }

            uiScrollBox.hide();

            Photoview.toggleFastChats(true);

            delete cur.pvEditorMode;
            delete cur.pvEditorModeDimensionsUpdated;

            if (cur.shownAs1AprilEditor) {
                delete cur.shownAs1AprilEditor;
                delete cur.pvData;
            }

            if (cur.pvPhotoTags) {
                cur.pvPhotoTags.unMount();
                delete cur.pvPhotoTags;
            }
        },

        editPhoto: function() {},

        descTT: function(el) {
            return showTooltip(el, {
                text: getLang('photos_edit_desc'),
                black: 1,
                shift: [-160, 13, 0],
                showdt: 0,
                appendParentCls: 'narrow_column'
            });
        },

        editInline: function(ev, noreq) {
            if (((ev || window.event || {}).target || {}).tagName == 'A' || cur.pvEditing) return;

            window.tooltips && window.tooltips.hideAll();

            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index],
                noreq = !ph.desc;
            var onDone = function(text) {
                if (!cur.pvShown || cur.pvListId != listId || cur.pvIndex != index || cur.pvEditing) return;

                cur.pvEditing = [listId, index];

                var el = cur.pvDesc.appendChild(ce('div', {
                    innerHTML: '\
          <textarea class="dark" id="pv_edit_text" onkeydown="onCtrlEnter(event, Photoview.saveInline)" onkeyup="checkTextLength(cur.pvCaptionLimit, this, ge(\'pv_caption_warn\'));" placeholder="' + getLang('photos_edit_desc_intro') + '">' + text + '</textarea> \
        <div id="pv_caption_warn"><div>'
                }, {
                    display: 'none'
                }));

                var txt = ge('pv_edit_text');

                autosizeSetup(txt, {
                    minHeight: 21,
                    maxHeight: 350
                });
                setTimeout(function() {
                    show(el);
                    elfocus(txt);
                    addEvent(txt, 'blur', Photoview.saveInline);
                    hide(cur.pvDesc.firstChild);
                    cur.pvNarrowScrollbar.scrollTop(0);
                }, 1);
            };

            if (!noreq) {
                ajax.post('al_photos.php', {
                    act: 'edit_desc',
                    photo: ph.id
                }, {
                    onDone: onDone,
                    progress: cur.pvProgress
                });
            } else {
                onDone('');
            }
        },
        cancelInline: function() {
            cur.pvEditing = false;
            removeEvent(ge('pv_edit_text'), 'blur');
            show(cur.pvDesc.firstChild);
            re(cur.pvDesc.firstChild.nextSibling);
        },
        saveInline: function() {
            if (!cur.pvEditing) return;
            removeEvent(ge('pv_edit_text'), 'blur');

            var listId = cur.pvEditing[0],
                index = cur.pvEditing[1],
                ph = cur.pvData[listId][index],
                t = trim(val('pv_edit_text'));
            if (geByClass1('pv_desc_edit', cur.pvDesc) && !t) return Photoview.cancelInline();
            ajax.post('al_photos.php', {
                act: 'save_desc',
                photo: ph.id,
                hash: ph.hash,
                text: t
            }, {
                onDone: function(text) {
                    ph.desc = text;

                    var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
                    if (!shown) return;

                    cur.pvEditing = false;
                    var d = domFC(cur.pvDesc);
                    val(d, text || ('<span class="pv_desc_edit">' + getLang('photos_edit_desc') + '</span>'));
                    d.onmouseover = text ? Photoview.descTT.pbind(d) : function() {};
                    show(d);
                    re(domNS(d));
                },
                progress: cur.pvProgress
            });
        },

        cmp: function(id1, id2) {
            var l1 = id1.length,
                l2 = id2.length;
            if (l1 < l2) {
                return -1;
            } else if (l1 > l2) {
                return 1;
            } else if (id1 < id2) {
                return -1;
            } else if (id1 > id2) {
                return 1;
            }
            return 0;
        },
        receiveComms: function(listId, index, text, names, noOld, toUp) {
            if (listId != cur.pvListId || index != cur.pvIndex) return;

            var n = ce('div', {
                innerHTML: text
            });
            var comms = ge('pv_comments_list');
            var last = current = domLC(comms);
            var frm = getXY(current, true)[1];
            var ph = cur.pvData[listId][index];

            for (var el = domLC(n); el; el = domLC(n)) {
                if (ph.actions.comm) addClass(el, 'reply_replieable');
                while (current && Photoview.cmp(current.id, el.id) > 0) {
                    current = domPS(current);
                }
                if (current && !Photoview.cmp(current.id, el.id)) {
                    comms.replaceChild(el, current);
                    current = el;
                } else {
                    if (current && domNS(current)) {
                        comms.insertBefore(el, domNS(current));
                    } else if (!current && domFC(comms)) {
                        if (noOld === true) {
                            --ph.commshown;
                            n.removeChild(el);
                        } else {
                            comms.insertBefore(el, domFC(comms));
                        }
                    } else {
                        comms.appendChild(el);
                    }
                    ++ph.commshown;
                }
            }
            if (toUp && last) {
                layerWrap.scrollTop += getXY(last, true)[1] - frm;
            }


            cur.pvCommsLikes[ph.id][0] = ge('pv_comments');
            extend(cur.pvReplyNames, names);
            Photoview.updateComms();
        },
        commSaved: function(post) {
            if (!cur.pvShown) return;
            var comms = ge('pv_comments'),
                ph = comms ? cur.pvData[cur.pvListId][cur.pvIndex] : false,
                comm = post.match(/^(-?\d+)photo(_\d+)/);
            if (!ph || !comm || !ge('pv_comment' + comm[1] + comm[2])) return;

            cur.pvCommsLikes[ph.id][0] = comms;
        },
        comments: function(showcomm) {
            if (showcomm) {
                var frst = domFC(ge('pv_comments')).id || '';
                if (!isVisible('pv_comments_header') ||
                    Photoview.cmp(frst, 'pv_comment' + showcomm) < 0
                ) {
                    return;
                }
            }

            var listId = cur.pvListId;
            var index = cur.pvIndex;
            var ph = cur.pvData[listId][index];
            var commentsHeader = ge('pv_comments_header');

            ajax.post('al_photos.php', {
                act: 'photo_comments',
                offset: ph.commshown,
                photo: ph.id,
                list_id: cur.pvListId
            }, {
                onDone: function(text, names) {
                    Photoview.receiveComms(listId, index, text, names, false, showcomm);
                    if (showcomm && ge('pv_comment' + showcomm)) {
                        Photoview.showComment(showcomm);
                    }
                },
                showProgress: function() {
                    commentsHeader.innerHTML = '';
                    showProgress(commentsHeader);
                },
                hideProgress: function() {
                    hideProgress(commentsHeader);
                }
            });
        },
        updateComms: function(wasDeleted) {
            var ph = cur.pvData[cur.pvListId][cur.pvIndex];
            var commshown = '';
            var commheader = ge('pv_comments_header');

            if (ph.commcount > ph.commshown) {
                commshown = getLang('photos_show_prev_comments', ph.commcount - ph.commshown);
            }

            toggleClass(ge('pv_comments_list'), 'unshown', !wasDeleted && ph.commcount == 0);
            toggle(commheader, commshown);
            toggle(geByClass1('pv_no_commments_placeholder'), ph.commcount == 0 && !geByClass1('_post_content', cur.pvBox));

            commheader.innerHTML = commshown;
        },
        commentChanged: function() {
            checkTextLength(cur.pvCommLimit, cur.pvComment);
            cur.pvCommenting = cur.pvData[cur.pvListId][cur.pvIndex].id;
        },

        updateRightBlock: function(immediate) {
            function _update() {
                var boxHeight = getSize(cur.pvLeftWrap)[1];
                var narrowColumnHeight = boxHeight - (cur.pvReplyForm ? getSize(cur.pvReplyForm)[1] : 0);

                setStyle(cur.pvNarrow, 'height', narrowColumnHeight);

                // update placeholder
                var placeholderWrap = geByClass1('pv_no_commments_placeholder_wrap');
                if (placeholderWrap && (isVisible(placeholderWrap.children[0]) || isVisible(placeholderWrap.children[1]))) {
                    var placeholderHeight = getSize(placeholderWrap)[1];
                    var commentsListHeight = getSize('pv_comments_list')[1];

                    var comms = ge('pv_comments');
                    var remainHeight = narrowColumnHeight - comms.offsetTop - commentsListHeight;

                    setStyle(placeholderWrap, 'margin-top', Math.max(0, remainHeight / 2 - placeholderHeight / 2));
                }
            }

            _update();

            clearTimeout(cur.pvRightBlockUpdateTO);
            cur.pvRightBlockUpdateTO = setTimeout(_update);
        },

        getReplyAsGroupEl: function() {
            return ge('pv_reply_as_group');
        },

        sendComment: function(post, ev, options) {
            var listId = cur.pvListId;
            var index = cur.pvIndex;
            var ph = cur.pvData[listId][index];
            var fld = ge('reply_field' + post);
            var composer = fld && data(fld, 'composer');
            var replyToName = (cur.pvReplyNames[(cur.reply_to || {})[0]] || [])[1];
            var btn = geByClass1('addpost_button', cur.pvReplyForm);

            var options = options || {};
            var stickerId = options.stickerId;

            if (stickerId) {
                var params = {
                    message: '',
                    attach1_type: 'sticker',
                    attach1: stickerId,
                    sticker_referrer: options.sticker_referrer
                };
            } else {
                var params = composer ? Composer.getSendParams(composer, Photoview.sendComment.pbind(post)) : {
                    message: trim(Emoji.editableVal(fld))
                };
                if (params.delayed) return;

                if (!params.attach1_type && (!params.message || replyToName && !replyToName.indexOf(params.message))) {
                    Emoji.editableFocus(fld, false, true);
                    return;
                }
            }

            hide('reply_warn' + post);

            var replyAsGroup = Photoview.getReplyAsGroupEl();

            ajax.post('al_photos.php', Wall.fixPostParams(extend(params, {
                act: 'post_comment',
                photo: ph.id,
                hash: ph.hash,
                from_group: replyAsGroup && (domData(domClosest('_submit_post_box', ge(replyAsGroup)), 'from-oid')) < 0 ? 1 : '',
                reply_to: (cur.reply_to || {})[1]
            })), {
                onDone: function(text, names) {
                    ++ph.commcount;
                    Photoview.receiveComms(listId, index, text, names, true);
                    if (!stickerId) {
                        if (composer) {
                            Composer.reset(composer);
                        } else {
                            Emoji.val(fld, '');
                        }
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

                    Wall.hideEditPostReply(null, true);

                    cur.pvNarrowScrollbar && cur.pvNarrowScrollbar.scrollBottom();
                    Photoview.updateRightBlock();
                },
                showProgress: function() {
                    lockButton(btn);
                },
                hideProgress: function() {
                    unlockButton(btn);
                }
            });
        },
        highlightComment: function(el) {
            el = ge(el);
            if (!el) return;

            var hlfunc = animate.pbind(el, {
                    backgroundColor: '#ECEFF3'
                }, 200, function() {
                    setTimeout(function() {
                        animate(el, {
                            backgroundColor: '#FFF'
                        }, 200, function() {
                            setStyle(el, {
                                backgroundColor: ''
                            });
                        });
                    }, 1000);
                }),
                top = getXY(el, true)[1];

            if (top < 0 || top > lastWindowHeight - 200) {
                animate(layerWrap, {
                    scrollTop: layerWrap.scrollTop + top - 50
                }, 300, hlfunc);
            } else {
                hlfunc();
            }
        },
        showComment: function(comm) {
            var p = ge('pv_comment' + comm);
            if (p) {
                Photoview.highlightComment(p);
            } else {
                Photoview.comments(comm);
            }
            return false;
        },
        commDone: function(node, text, del, script) {
            if (!node) return;

            var fc = domFC(node);
            var msg = domNS(fc);

            var ph = (cur.pvListId == undefined || cur.pvIndex == undefined) ? false : cur.pvData[cur.pvListId][cur.pvIndex];

            if (!text) {
                show(fc);
                hide(msg);
                if (ph) {
                    ++ph.commcount;
                    ++ph.commshown;
                    Photoview.updateComms();
                } else if (window.photos && cur.offset) {
                    photos.recache(cur.offset, 1);
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

            hide(fc);

            if (del) {
                if (ph) {
                    --ph.commshown;
                    --ph.commcount;
                    Photoview.updateComms(del);
                } else if (window.photos && cur.offset) {
                    photos.recache(cur.offset, -1);
                }
            }

            if (ph) {

                cur.pvCommsLikes[ph.id][0] = ge('pv_comments');
            }

            if (script) {
                eval(script);
            }
        },
        commProgress: function(comm, sh) {
            var acts = ge('pv_actions' + comm);
            if (!acts) return;

            var prg = acts.firstChild.nextSibling;
            if (sh !== true) {
                hide(prg);
                show(acts.firstChild);
                return;
            }
            hide(acts.firstChild);
            if (!prg) {
                prg = acts.appendChild(ce('div', {
                    className: 'progress'
                }));
            }
            show(prg);
        },
        commParams: function(comm, context) {
            return {
                onDone: Photoview.commDone.pbind(comm, context),
                progress: 'pv_progress' + comm + context,
                stat: ['privacy.js', 'privacy.css']
            }
        },
        commAction: function(act, link, comm, hash) {
            var replyLink = gpeByClass('reply', link);
            var actionsWrap = gpeByClass('post_actions', link);
            var ACTION_PROGRESS_CLS = 'post_actions_progress';

            if (hasClass(replyLink, ACTION_PROGRESS_CLS)) return;

            ajax.post('al_photos.php', {
                act: act + '_comment',
                comment: comm,
                hash: hash
            }, {
                onDone: Photoview.commDone.pbind(replyLink),
                showProgress: addClass.pbind(actionsWrap, ACTION_PROGRESS_CLS),
                hideProgress: removeClass.pbind(actionsWrap, ACTION_PROGRESS_CLS)
            });
        },

        _isOverLayer: function(e) {
            return e.target == layer || e.target == cur.pvCont;
        },

        _isOverLayerLeft: function(e) {
            if (Photoview._isOverLayer(e)) {
                var pvBoxPos = getXY(cur.pvBox),
                    pvBoxSize = getSize(cur.pvBox);
                var overLeftPanel = (e.pageX < pvBoxPos[0]) && (e.pageY > pvBoxPos[1] && e.pageY < pvBoxPos[1] + pvBoxSize[1]);
                return overLeftPanel;
            }
        },

        onLayerMouseMove: function(e) {
            if (Photoview._isOverLayer(e)) {
                var overLeftPanel = Photoview._isOverLayerLeft(e);
                toggleClass(layerWrap, 'pv_left_panel_over', overLeftPanel);
                toggleClass(cur.pvNavBtnLeft, 'pv_nav_btn_show', overLeftPanel);
            } else {
                removeClass(layerWrap, 'pv_left_panel_over');
            }
        },

        onLayerClick: function(e, skipClicked) {
            if (cur.pvEditorMode) {
                if (e.target == layerWrap || e.target == layer) {
                    SPE.attemptHide(function() {
                        Photoview.hide(0);
                    });
                }
                return;
            }

            if (Photoview._isOverLayer(e) && Photoview._isOverLayerLeft(e)) {
                return Photoview.show(false, cur.pvIndex - 1, e);
            }

            Photoview._doLayerClick(e, skipClicked);
        },

        _doLayerClick: function(e, skipClicked) {
            if (cur.pvClicked && !skipClicked || __afterFocus || e && cur.__mdEvent && e.target != cur.__mdEvent.target) {
                cur.pvClicked = false;
                return;
            }

            if (e && (e.button == 2 || e.which == 3 || e.pvHandle)) return;
            if (e) e.pvHandle = true;

            var px = e.pageX,
                py = e.pageY;
            if (px == null && e.clientX != null) {
                var doc = document.documentElement,
                    body = bodyNode;
                px = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
                py = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
            }

            var dx = Math.abs(px - intval(cur.pvOldX));
            var dy = Math.abs(py - intval(cur.pvOldY));
            if (dx > 3 || dy > 3) {
                if (vkNow() - intval(cur.pvOldT) > 300) {
                    if (cur.pvTagger) {
                        Phototag.stopTag();
                    } else {
                        Photoview.hide(0);
                    }
                }
            }
        },
        onKeyDown: function(e) {
            if (e.returnValue === false) return false;

            if (window.SPE && cur.pvEditorMode) { // backspace
                return SPE.onKeyPress(e);
            }

            if (inArray(e.keyCode, [KEY.DOWN, KEY.UP]) && cur.pvNarrowScrollbar && !hasClass(e.target, 'reply_field')) {
                cur.pvNarrowScrollbar.scrollBy(e.keyCode == KEY.DOWN ? 70 : -70);
                return cancelEvent(e);
            }

            if (e.keyCode == KEY.ESC && cur.pvEditing) {
                Photoview.cancelInline();
                return cancelEvent(e);
            }

            if (e.altKey && e.keyCode == KEY.RETURN && Photoview.canFullscreen()) {
                (cur.pvCanvas ? Photoview.fullscreenStop() : Photoview.fullscreen());
            }

            if (e.keyCode == KEY.SPACE && cur.pvCanvas && window.FullscreenPV) {
                FullscreenPV.startSlide();
                FullscreenPV.showControls(true);
            }

            var ceval = e.target.contentEditable;

            if (
                window.Emoji && Emoji.shown ||
                e.target && (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || e.target.tagName == 'DIV' && ceval && ceval != 'inherit')
            ) {
                return true;
            }

            if (e.keyCode == KEY.ESC) {
                if (cur.pvCanvas) {
                    Photoview.fullscreenStop();
                } else if (cur.pvTagger) {
                    Phototag.stopTag();
                } else if (!e.vkCanceled && !curBox()) {
                    Photoview.hide(0);
                }
                return cancelEvent(e);
            } else if (!cur.pvTagger && !boxQueue.count() && (!cur.pvComment || !cur.pvComment.focused)) {
                if (!e.ctrlKey) {
                    if (e.keyCode == KEY.RIGHT) {
                        Photoview.show(cur.pvListId, cur.pvIndex + 1);
                    } else if (e.keyCode == KEY.LEFT) {
                        Photoview.show(cur.pvListId, cur.pvIndex - 1);
                    }
                }
            }

            if (cur.pvCanvas && window.FullscreenPV) {
                return false;
            }
        },
        updateVerticalPosition: function(offset) {
            if (cur.pvCont) {
                var pvContSize = getSize(cur.pvCont);
                var ch = clientHeight();
                var topOffset = ch / 2 - pvContSize[1] / 2 - intval(offset);
                setStyle(layer, 'margin-top', Math.round(topOffset));
            }
        },
        calculateVeryBig: function() {
            var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if (ww > 1800) {
                cur.pvVeryBig = 3;
            } else if (ww > 1200) {
                cur.pvVeryBig = 2;
            } else if (ww > 800) {
                cur.pvVeryBig = 1;
            } else {
                cur.pvVeryBig = false;
            }

            if (window.devicePixelRatio > 1) {
                cur.pvVeryBig += 1;
                cur.pvVeryBig = Math.min(3, cur.pvVeryBig);
            }
        },

        updateNavBtnsLeftThreshold: function(reset) {
            var pvImageWrapWidth = getSize(cur.pvImageWrap)[0];
            var pvImageWrapLeft = getXY(cur.pvImageWrap)[0];

            if (!cur.pvLeftBtnAmount || reset) {
                cur.pvLeftBtnAmount = pvImageWrapLeft + Photoview.LEFT_RIGHT_NAV_RATIO * pvImageWrapWidth;
            }
        },

        updatePhotoDimensions: function(fromResize) {
            if (Photoview.isPhotosList() || cur.pvEditorModeDimensionsUpdated) {
                return;
            }

            var minPhotoWidth = Photoview.MIN_WIDTH;
            var minPhotoHeight = Photoview.MIN_HEIGHT;

            // in editor mode we have to make min photo dimensions
            if (cur.pvEditorMode) {
                minPhotoWidth = Photoview.PE_MIN_WIDTH;
                minPhotoHeight = Photoview.PE_MIN_HEIGHT;

                cur.pvEditorModeDimensionsUpdated = true;
            }

            if (cur.shownAs1AprilEditor) {
                minPhotoWidth = 400;
                minPhotoHeight = Math.min(649, Math.max(cur.pvCurData.height, 449)) + 49;
            }

            removeClass(cur.pvBottomInfo, 'pv_with_line_break');

            var pvTagInfoVisible = isVisible(cur.pvTagInfo);
            var pvTagInfoHeight = pvTagInfoVisible ? getSize(cur.pvTagInfo)[1] : 0;

            var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var wh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var bottomBarHeight = getSize(cur.pvBottomInfo)[1];

            // get available width for photo (excluding right panel and arrow panels)
            var widthAvailable = Math.max(minPhotoWidth, ww - Photoview.SIDE_COLUMN_WIDTH - Photoview.SIDE_MIN_GAP * 2);
            var heightAvailable = Math.max(minPhotoHeight, wh - bottomBarHeight - Photoview.VERTICAL_MIN_GAP * 2 - pvTagInfoHeight);

            Photoview.calculateVeryBig();

            var img = clone(cur.pvCurData || {
                width: minPhotoWidth,
                height: minPhotoHeight,
            });

            img.width = img.width || minPhotoWidth;
            img.height = img.height || minPhotoHeight;

            // fit to width
            var imgRatio = img.width / img.height;
            var w = Math.min(widthAvailable, img.width);
            var h = w / imgRatio;

            // fit to height
            h = Math.min(heightAvailable, h);
            w = Math.ceil(h * imgRatio);

            // make the line break if no space available for text in bottom panel
            var bottomMinPanelsDist = (getXY(cur.pvBottomLeft)[0] + getSize(cur.pvBottomLeft)[0]) > (getXY(cur.pvBottomActions)[0] - 20);
            toggleClass(cur.pvBottomInfo, 'pv_with_line_break', bottomMinPanelsDist);

            // don't count on previous dimensions
            if (fromResize) {
                cur.prevPhotoWidth = cur.prevPhotoHeight = 0;
            }

            // choose final image wrap size according to prev dimensions
            var pvPhotoWidth = cur.prevPhotoWidth = Math.max(w, minPhotoWidth, cur.prevPhotoWidth || 0);
            var pvPhotoHeight = cur.prevPhotoHeight = Math.max(h, minPhotoHeight, (cur.prevPhotoHeight || 0) - pvTagInfoHeight);

            // calc top offset to place image in center
            var imgTopOffset = Math.max(0, pvPhotoHeight / 2 - h / 2);

            // update top offset counting bottom panel
            if (imgTopOffset > 0 && !pvTagInfoVisible) {
                var boxAndBottomHeight = getSize(cur.pvPhoto)[1] + bottomBarHeight;
                var boxAndBottomHeightCentering = boxAndBottomHeight / 2 - h / 2;
                if (boxAndBottomHeightCentering > bottomBarHeight) {
                    imgTopOffset = boxAndBottomHeightCentering;
                }
            }

            // update photo wrap <a> element
            setStyle(cur.pvPhoto, {
                width: pvPhotoWidth,
                height: pvPhotoHeight,
            });

            // update <img> element
            setStyle(domFC(cur.pvPhoto), {
                width: w,
                height: h,
                marginTop: imgTopOffset
            });

            // tag info size
            setStyle(cur.pvTagInfo, {
                width: pvPhotoWidth
            });

            if (cur.pvTagFrame) {
                Photoview.updateTagFrameDimensions(w, h, imgTopOffset);
            }

            if (cur.pvPhotoTagsContainer) {
                Photoview.updatePhotoTagsContainerDimensions(w);
            }

            // update progress bar position
            setStyle(cur.pvImgProgress, 'marginTop', imgTopOffset + h / 2);

            //
            var boxWidth = (cur.pvIsLightMode ? 0 : Photoview.SIDE_COLUMN_WIDTH) + pvPhotoWidth;
            setStyle(cur.pvCont, {
                width: boxWidth,
                paddingLeft: sbWidth() // compensate centered position inside layer
            });

            Photoview.updateRightBlock();
            Photoview.updateVerticalPosition();

            cur.pvPhWidth = w;
            cur.pvPhHeight = h;

            Photoview.updateNavBtnsLeftThreshold();

            // fast chats hide logic
            var pvContPos = getXY(cur.pvCont),
                pvContSize = getSize(cur.pvCont);
            var boxBottom = pvContPos[1] + pvContSize[1];
            var boxRight = pvContPos[0] + pvContSize[0];

            var MIN_BOTTOM_SPACE = 60,
                MIN_RIGHT_SPACE = 85;

            var shouldHideFastChats = (ww - boxRight < MIN_RIGHT_SPACE) || (wh - boxBottom < MIN_BOTTOM_SPACE);
            Photoview.toggleFastChats(!shouldHideFastChats);
        },

        toggleFastChats: function(doShow) {
            toggleClass('chat_onl_wrap', 'hidden', !doShow);

            // adskiy kostyl. hz kak sdelat luchshe ne trogaya fastchaty
            each(geByClass('rb_box_wrap'), function() {
                toggleClass(this, 'hidden', !doShow);
            })
        },

        onResize: function() {
            var dwidth = lastWindowWidth,
                dheight = lastWindowHeight,
                sbw = sbWidth();
            if (cur.pvCanvas) {
                var sizeChanged = false,
                    oldverybig = cur.pvVeryBig,
                    w = cur.pvCanvas.offsetWidth,
                    h = cur.pvCanvas.offsetHeight;
                cur.pvVeryBig = (w > 1280 || h > 1280) ? 2 : ((w > 807 || h > 807) ? 1 : false);
                if (sizeChanged = (oldverybig != cur.pvVeryBig)) {
                    setTimeout(Photoview.preload.pbind(cur.pvIndex, cur.pvLastDirection || 1), 10);
                }
                return;
            }

            if (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown) {
                setStyle(cur.pvCont, 'width', 800);

            } else {
                Photoview.updatePhotoDimensions(true);
            }

            if (!cur.pvPhoto) return;

            if (browser.mozilla && cur.pvPhoto.firstChild) {
                var x = cur.pvPhoto.firstChild.offsetLeft,
                    deltaX = ((lastWindowWidth - cur.pvActualWidth) % 2) && ((cur.pvActualWidth - cur.pvPhWidth) % 2) ? 4 : 3;
                setStyle(cur.pvTagFrame, {
                    left: (x - deltaX) + 'px' // 3 - tag w border, mozilla buggy
                });
            }

            Photoview.scrollResize();
            Photoview.stopTagger();
        },
        stopTagger: function() {
            cur.pvTagger && Phototag.stopTag();
        },
        updateSize: function() {
            cur.pvBox && toggleClass(cur.pvBox, 'photos_is_albums_view', !!cur.pvAlbumsShown || !!cur.pvAlbumShown);

            onBodyResize();
            Photoview.onResize();
        },

        activate: function(arrow) {
            if (arrow && arrow.timeout) {
                clearTimeout(arrow.timeout);
                removeAttr(arrow, 'timeout');
            } else if (isVisible(arrow)) {
                fadeTo(arrow, 200, vk.pvdark ? 1 : 0.7);
            }
        },
        deactivate: function(arrow) {
            if (!arrow || !isVisible(arrow) || arrow.timeout) {
                return;
            }
            arrow.timeout = setTimeout(function() {
                removeAttr(arrow, 'timeout');
                fadeTo(arrow, 200, 0.4);
            }, 1);
        },

        deletePhoto: function(sure) {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index],
                box = curBox();

            cur.deletionProgress = cur.deletionProgress || {};
            if (cur.deletionProgress[ph.id]) {
                return;
            }
            cur.deletionProgress[ph.id] = true;

            if (cur.pvTagger && ev !== false) {
                Photoview.stopTagger();
                return;
            }

            cur.pvPhotoTags && cur.pvPhotoTags.hideAreas();

            ajax.post('al_photos.php', {
                act: 'delete_photo',
                photo: ph.id,
                hash: ph.hash,
                set_prev: isChecked('pvb_prev_check'),
                sure: intval(sure)
            }, {
                onDone: function(text, deleteAll) {
                    cur.deletionProgress[ph.id] = false;

                    if (box) {
                        box.hide();
                        return nav.go('/id0', false, {
                            nocur: true
                        });
                    }

                    if (listId == cur.pvListId && index == cur.pvIndex) {
                        cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');

                        Photoview.toggleTopInfoPanel(deleteAll || getLang('photo_deleted'), text);
                        ph.deleted = [cur.pvTagInfoText.innerHTML, cur.pvTagInfoButtons.innerHTML];

                        Photoview.toggleDeletedState(true);
                        Photoview.updatePhotoDimensions();
                    }
                }
            });
        },
        restorePhoto: function(btn) {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            if (isButtonLocked(btn)) return;

            ajax.post('al_photos.php', {
                act: 'restore_photo',
                photo: ph.id,
                hash: ph.hash
            }, {
                onDone: function(text) {
                    ph.deleted = false;
                    if (listId == cur.pvListId && index == cur.pvIndex) {
                        cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');
                        Photoview.toggleTopInfoPanel(false);
                        Photoview.toggleDeletedState(false);
                        Photoview.updatePhotoDimensions();
                    }
                    cur.pvPhotoTags && cur.pvPhotoTags.showAreas();
                },
                onFail: function(error) {
                    showFastBox(getLang('global_error'), error);

                    return true;
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
            });
        },
        spamPhoto: function(spamHash, btn) {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            if (isButtonLocked(btn)) return;

            if (cur.pvTagger && ev !== false) {
                Phototag.stopTag();
                return;
            }

            ajax.post('al_photos.php', {
                act: 'spam_photo',
                photo: ph.id,
                hash: ph.hash,
                spam_hash: spamHash,
                pv: 1
            }, {
                onDone: function(actions, del) {
                    if (del) ph.deleted = actions;
                    if (listId == cur.pvListId && index == cur.pvIndex) {
                        cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');

                        Photoview.toggleTopInfoPanel(getLang('photo_marked_as_spam_restore'), actions);

                        if (del) hide(cur.pvCommentsData);
                    }
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
            });
        },
        rotatePhoto: function(to) {
            var prg = ge('pv_rotate_progress');
            if (isVisible(prg)) return;
            Photoview.stopTagger();

            show(prg);
            ge('pv_rotate').appendChild(ce('div', {
                id: 'pv_rotate_frame',
                className: 'upload_frame',
                innerHTML: '<iframe name="pv_rotate_frame"></iframe>'
            }));
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index],
                form = ge('pv_rotate_form');
            form.innerHTML = '';
            form.action = ph.rotate[0];
            var data = extend({
                act: 'do_rotate',
                to: to,
                list_id: listId,
                index: index,
                fid: ph.id
            }, ph.rotate);
            to = (to + 4) % 4;
            if (data.act == 'rotate_photo') {
                data.angle = (data.angle + to) % 4;
            }
            if (data['rot' + to]) {
                data.act = 'done_rotate';
                data.complete = 1;
                ajax.post('/al_photos.php', data, {
                    onDone: Photoview.rotateDone,
                    onFail: function() {
                        Photoview.rotateDone();
                    }
                });
                return;
            }
            for (var i in data) {
                if (i != 0) {
                    form.appendChild(ce('input', {
                        type: 'hidden',
                        name: i,
                        value: data[i]
                    }));
                }
            }
            form.submit();
        },
        rotateDone: function(data) {
            hide('pv_rotate_progress');
            var el = ge('pv_rotate_frame');

            if (!el) return;
            re(el);

            if (!data) return;
            var listId = data.list_id,
                index = data.index,
                ph = cur.pvData[listId][index];
            extend(ph, {
                x_src: data.x_src,
                y_src: data.y_src,
                z_src: data.z_src,
                w_src: data.w_src,
                base: data.base,
                x_: data.x_,
                y_: data.y_,
                z_: data.z_,
                w_: data.w_,
                x: 0,
                y: 0,
                z: 0,
                w: 0,
                tags: data.tags,
                tagged: data.tagged,
                suggested_tags: data.suggested_tags,
                tagshtml: data.html
            })
            extend(ph.rotate, {
                photo: data.photo,
                hash: data.hash,
                rhash: data.rhash,
                angle: data.angle,
                rot1: data.rot1,
                rot3: data.rot3
            });
            if (listId == cur.pvListId && index == cur.pvIndex) {
                Photoview.show(listId, index);
            }
            cur.pvPhotoTags && cur.pvPhotoTags.reload();
        },

        likeUpdate: function(my, count, title) {
            count = intval(count);
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];

            var wrap = ge('pv_like');
            var icon = domByClass(wrap, '_icon');
            var countNode = domByClass(wrap, '_count');

            if (!countNode) {
                return;
            }

            var tt = wrap.tt || {};
            var opts = clone(tt.opts || {});
            var countInput = domByClass(tt.container, '_value');
            var content = domByClass(tt.container, '_content');
            var titleNode = domByClass(tt.container, '_title');

            if (title && titleNode) {
                val(titleNode, title);
            }
            if (tt) {
                tt.likeInvalidated = true;
            }
            if (countInput) {
                countInput.value = count;
            }

            animateCount(countNode, count);

            toggleClass(wrap, 'pv_liked', my);
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
        tagOver: function(el) {
            animate(el, {
                backgroundColor: '#6B8DB1'
            }, 200);
            showTooltip(el, {
                text: getLang('photos_delete_tag'),
                shift: [0, -2, 0]
            });
        },
        tagOut: function(el) {
            if (!el.parentNode || !el.parentNode.parentNode) return;
            animate(el, {
                backgroundColor: '#C4D2E1'
            }, 200);
        },
        deleteTag: function(tagId, btn) {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            if (ph.tagid) {
                if (isVisible('pv_tag_handling')) return;
            } else {
                if (ge('pv_action_progress')) return;
            }

            var isTopPanel = btn ? 1 : 0;

            ajax.post('al_photos.php', {
                act: 'delete_tag',
                photo: ph.id,
                tag: tagId,
                hash: ph.hash,
                top_panel: isTopPanel
            }, {
                onDone: function(text, tags, tagged, html) {
                    if (ph.tagid) {
                        ph.taginfo = ph.tagid = false;
                        cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');

                        Photoview.toggleTopInfoPanel(getLang('photos_tag_deleted'), text);
                        addClass(cur.pvTagInfoButtons, 'no_events');

                        setTimeout(function() {
                            removeClass(cur.pvTagInfoButtons, 'no_events');
                        }, 1000);
                    } else {
                        Photoview.actionInfo().innerHTML = text;
                    }

                    if (tags !== undefined) {
                        ph.tags = tags;
                        ph.tagged = tagged;
                        ph.tagshtml = html;
                        if (cur.pvListId == listId && cur.pvIndex == index) {
                            Photoview.setTags(html);

                            ((!ph.taginfo && ph.actions.tag && tags[0] < cur.pvMaxTags) ? show : hide)(cur.pvTagLink);
                        }
                    }
                    cur.pvPhotoTags && cur.pvPhotoTags.deleteTag(tagId);
                },
                onFail: function(text) {
                    if (!text) return;
                    Photoview.actionInfo().innerHTML = text;
                    return true;
                },
                showProgress: function() {
                    lockButton(btn);
                    if (ph.tagid) {} else {
                        var actionInfoEl = Photoview.actionInfo();
                        actionInfoEl.innerHTML = '';
                        showProgress(actionInfoEl);
                    }
                },
                hideProgress: function() {
                    unlockButton(btn);
                    if (ph.tagid) {} else {
                        re(Photoview.actionInfo());
                    }
                }
            });
        },
        restoreTag: function(tagId) {
            if (ge('pv_action_progress')) return;

            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            ajax.post('al_photos.php', {
                act: 'restore_tag',
                photo: ph.id,
                tag: tagId,
                hash: ph.hash
            }, {
                onDone: function(text, tags, tagged, html) {
                    if (tags !== undefined) {
                        ph.tags = tags;
                        ph.tagged = tagged;
                        ph.tagshtml = html;
                        if (cur.pvListId == listId && cur.pvIndex == index) {
                            Photoview.setTags(html);
                            ((!ph.taginfo && ph.actions.tag && tags[0] < cur.pvMaxTags) ? show : hide)(cur.pvTagLink);
                        }

                        cur.pvPhotoTags && cur.pvPhotoTags.renderTagAreas();
                    }
                    Photoview.actionInfo().innerHTML = text;
                },
                onFail: function(text) {
                    if (!text) return;
                    Photoview.actionInfo().innerHTML = text;
                    return true;
                },
                showProgress: function() {
                    var actionInfoEl = Photoview.actionInfo();
                    actionInfoEl.innerHTML = '';
                    showProgress(actionInfoEl);
                },
                hideProgress: function() {
                    re(Photoview.actionInfo());
                }
            });
        },

        confirmTag: function(tagId, btn) {
            var listId = cur.pvListId,
                index = cur.pvIndex,
                ph = cur.pvData[listId][index];
            if (isVisible('pv_tag_handling')) return;

            ajax.post('al_photos.php', {
                act: 'confirm_tag',
                tag: tagId,
                photo: ph.id,
                hash: ph.hash
            }, {
                onDone: function(tags, tagged, html) {
                    ph.tags = tags;
                    ph.tagged = tagged;
                    ph.tagshtml = html;
                    ph.taginfo = ph.tagid = false;
                    if (listId == cur.pvListId && index == cur.pvIndex) {
                        Photoview.setTags(html);
                        ((!ph.taginfo && ph.actions.tag && tags[0] < cur.pvMaxTags) ? show : hide)(cur.pvTagLink);
                        cleanElems('pv_confirm_tag', 'pv_delete_tag', 'pv_prof_cancel', 'pv_prof_done');
                        Photoview.toggleTopInfoPanel(false);
                    }

                },
                showProgress: function() {
                    lockButton(btn);
                },
                hideProgress: function() {
                    unlockButton(btn);
                }
            });
        },

        toProfileTag: function() {
            var tag = cur.pvData[cur.pvListId][cur.pvIndex].tagged[vk.id];
            if (tag && !cur.pvTagger) {
                Photoview.showTag(tag);
            }
        },
        showTag: function(tagId) {
            cur.pvPhotoTags && cur.pvPhotoTags.showTagArea(tagId);
        },
        showDynTag: function(tagId) {
            clearTimeout(cur.pvHidingTag);
            if (cur.pvShowingTag == tagId) return;

            var coords = clone(cur.pvData[cur.pvListId][cur.pvIndex].tags[tagId]),
                el = ge('pv_tag' + tagId);
            if (!el) return;

            each(coords, function(i, v) {
                coords[i] = positive(v * cur[(i % 2) ? 'pvPhHeight' : 'pvPhWidth'] / 100);
            });

            var addTopOffset = 0;
            if (isVisible(cur.pvTagInfo)) {
                addTopOffset = getSize(cur.pvTagInfo)[1];
            }

            setStyle(cur.pvTagPerson, {
                marginLeft: coords[0] + 'px',
                marginTop: addTopOffset + coords[3] + 'px',
                minWidth: (coords[2] - coords[0]) + 'px'
            });
            cur.pvTagPerson.innerHTML = el.firstChild.innerHTML;
            var s = getSize(cur.pvTagPerson);
            if (coords[3] + s[1] > cur.pvPhHeight) {
                setStyle(cur.pvTagPerson, {
                    marginTop: (cur.pvPhHeight - s[1]) + 'px'
                });
            }
            cur.pvTagPerson.onmouseover = Photoview.showDynTag.pbind(tagId);
            cur.pvShowingTag = tagId;
            if (browser.msie) {
                show(cur.pvTagPerson);
            } else {
                fadeIn(cur.pvTagPerson, 200);
            }
        },
        hideTag: function(quick) {
            cur.pvPhotoTags && cur.pvPhotoTags.hideTagArea();
        },
        realOffset: function(listId, offset, inc) {
            var res = offset;
            if (!cur.pvData || !cur.pvData[listId]) {
                return res;
            }
            for (var i = 0; i < offset; i++) {
                if (cur.pvData[listId][i] && (cur.pvData[listId][i].deleted || cur.pvData[listId][i].moved)) {
                    res += inc;
                }
            }
            return res;
        },
        realCount: function(listId, count) {
            var res = count;
            if (!cur.pvData || !cur.pvData[listId]) {
                return res;
            }
            for (var i = 0; i < cur.pvData[listId].length; i++) {
                if (cur.pvData[listId][i] && (cur.pvData[listId][i].deleted || cur.pvData[listId][i].moved)) {
                    res++;
                }
            }
            return res;
        },

        list: function(photoId, listId, realList) {
            if (realList == 'deleted') return;
            if (!cur.pvList) cur.pvList = {};
            cur.pvList[photoId + '_' + listId] = realList;
        },
        loaded: function(listId, count, offset, data, opts) {
            if (listId == 'deleted') return;

            if (opts) {
                extend(cur, {
                    lang: extend(cur.lang || {}, opts.lang),
                    pvHash: opts.hash,
                    pvCommLimit: opts.commlimit,
                    pvCaptionLimit: opts.captionlimit,
                    pvMaxTags: opts.maxtags,
                    pvReasons: opts.reasons,
                    pvReplyNames: extend(cur.pvReplyNames || {}, opts.names || {}),
                    pvAskForAutoTag: opts.ask_for_autotag,
                    pvTagsQueueParams: opts.qparams
                });

                window.pvcur = extend(window.pvcur || {}, {
                    wallTpl: opts.wallTpl,
                    rmedia_types: opts.rmedia_types,
                });

                cur.wallTpl = cur.wallTpl || opts.wallTpl;

                if (!cur.options) cur.options = {};
                if (!cur.options.share) cur.options.share = opts.share;
                val(domFC(ge('pv_add_media')), getLang('global_add_media'));
            }

            count = Photoview.realCount(listId, count);
            offset = Photoview.realOffset(listId, offset, 1);

            if (!cur.pvData) cur.pvData = {};
            if (!cur.pvCommsLikes) cur.pvCommsLikes = {};
            if (!cur.pvData[listId]) {
                cur.pvData[listId] = new Array(count);
            } else if (cur.pvData[listId].length < count) {
                for (var i = cur.pvData[listId].length; i < count; ++i) {
                    cur.pvData[listId].push(undefined);
                }
            } else if (cur.pvData[listId].length > count) {
                cur.pvData[listId] = cur.pvData[listId].slice(0, count);
            }
            var nw = vkNow();
            for (var i = 0, len = data.length; i < len; ++i) {
                var index = (offset + i),
                    ph = clone(data[i]);
                while (index >= count) index -= count;

                cur.pvCommsLikes[ph.id] = [ph.comments, ph.likes, vkNow(), false];
                delete(ph.comments);
                delete(ph.likes);
                cur.pvData[listId][index] = ph;
            }
        },
        showDeleted: function(lst, msg, spm) {
            if (cur.pvShown && cur.pvListId == 'temp') {
                msg += '<br><br>' + spm;
            }

            showFastBox({
                title: getLang('global_error'),
                onHide: function() {
                    if (cur.pvShown && cur.pvListId == 'temp') {
                        Photoview.hide(true);
                    }
                }
            }, msg);
        },
        spamDeleted: function(el, ph, hash) {
            if (isVisible(curBox().progress)) return;
            ajax.post('al_photos.php', {
                act: 'spam_photo',
                photo: ph,
                hash: hash,
                from: 'deleted'
            }, {
                onDone: function(text) {
                    domPN(el).replaceChild(ce('span', {
                        innerHTML: text
                    }), el);
                },
                showProgress: curBox().showProgress,
                hideProgress: curBox().hideProgress
            });
        },
        showPhoto: function(photoId, listId, options, just) {
            if (!cur.pvShown || cur.pvListId == 'temp' && !cur.pvWasShown || options.noHistory !== undefined) {
                debugLog('in showPhoto noHistory: ' + options.noHistory);
                cur.pvNoHistory = options.noHistory;
                cur.pvHistoryLength = options.noHistory ? 0 : (options.histLen || 0);
            }

            extend(cur, {
                pvJumpTo: options.jumpTo || false,
                pvJumpFrom: false,
                pvJumpSteps: 0
            });
            listId = cur.pvList && cur.pvList[photoId + '_' + listId] || listId;

            if (!cur.pvData || !cur.pvData[listId]) {
                //Photoview.destroyPeriod();
                return;
            }

            var data = cur.pvData[listId],
                whole = true,
                onh = cur.pvOptions && cur.pvOptions.onHide;
            cur.pvOptions = options;
            if (!cur.pvOptions.onHide) cur.pvOptions.onHide = onh;
            for (var i = 0, len = data.length; i < len; ++i) {
                if (data[i]) {
                    if (data[i].id === photoId) {
                        Photoview.show(listId, i, false, options.root);
                        if (options.onShow) {
                            options.onShow();
                        }
                        return false;
                    }
                } else {
                    whole = false;
                }
            }
            if (whole && just) {
                if (options.onEmpty) {
                    options.onEmpty();
                }
                return false;
            }
        },

        loadedAlbums: function(ownerId, html, preload, opts) {
            if (!cur.pvAlbumsData) return;

            ajax.preload('al_photos.php', extend({
                offset: opts.offset,
                part: 1,
                owner: ownerId
            }, {
                act: 'show_albums'
            }), preload);
            //ajax.preload('al_photos.php', extend({offset: opts.photos_offset, part: 1, owner: ownerId}, {act: 'show_albums', only_photos: 1}), preloadPhotos);

            cur.curYear = opts.cur_year;
            cur.pvAlbumsData[ownerId] = {
                html: html,
                opts: opts
            };
            if (cur.pvAlbumsShowing == ownerId) {
                Photoview.doShowAlbums(ownerId, false);
                boxRefreshCoords(layer);
            }
        },

        showAlbums: function(ownerId, options) {
            ownerId = intval(ownerId);
            if (!cur.pvAlbumsData) cur.pvAlbumsData = {};
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
            }

            cur.pvNoHistory = options.noHistory;
            cur.pvHistoryLength = 0;
            cur.pvAlbumsShowing = ownerId;
            var of = options.onFail;
            if (!cur.pvAlbumsData[ownerId]) {
                cur.pvAlbumsData[ownerId] = 'loading';
                ajax.post('al_photos.php', {
                    act: 'show_albums',
                    owner: ownerId
                }, extend(options, {
                    onDone: Photoview.loadedAlbums,
                    onFail: function(t) {
                        if ( of ) of (t);
                        delete(cur.pvAlbumsData[ownerId]);
                        cur.pvAlbumsData[ownerId];
                        if (layers.fullhide) {
                            layers.fullhide(true);
                        }
                        return true;
                    }
                }));

            } else if (cur.pvAlbumsData[ownerId] != 'loading') {
                Photoview.doShowAlbums(ownerId, false);
                boxRefreshCoords(layer);
            }
        },
        loadedAlbum: function(albumRaw, html, preload, opts) {
            if (!cur.pvAlbumData) return;

            if (preload) {
                ajax.preload('al_photos.php', extend({
                    offset: opts.offset,
                    part: 1,
                    album: albumRaw
                }, {
                    act: 'show_album'
                }), preload);
            }

            cur.pvAlbumData[albumRaw] = {
                html: html,
                opts: opts
            };

            if (cur.pvAlbumShowing == albumRaw) {
                Photoview.doShowAlbum(albumRaw, false);
                boxRefreshCoords(layer);
            }
        },
        showAlbum: function(albumRaw, options) {
            if (!cur.pvAlbumData) cur.pvAlbumData = {};
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
            }

            cur.pvNoHistory = options.noHistory;
            cur.pvHistoryLength = 0;
            cur.pvAlbumShowing = albumRaw;
            var of = options.onFail;
            if (!cur.pvAlbumData[albumRaw]) {
                cur.pvAlbumData[albumRaw] = 'loading';
                ajax.post('al_photos.php', {
                    act: 'show_album',
                    album: albumRaw
                }, extend(options, {
                    onDone: Photoview.loadedAlbum,
                    onFail: function(t) {
                        if ( of ) of (t);
                        delete(cur.pvAlbumData[albumRaw]);
                        cur.pvAlbumData[albumRaw];
                        layers.fullhide(true);
                        return true;
                    }
                }));
            } else if (cur.pvAlbumData[albumRaw] != 'loading') {
                Photoview.doShowAlbum(albumRaw, false);
                boxRefreshCoords(layer);
            }
        },
        loadedTagged: function(ownerId, html, opts) {
            if (!cur.pvPhotoTagData) return;

            cur.pvPhotoTagData[ownerId] = {
                html: html,
                opts: opts
            };

            if (cur.pvPhotoTagShowing == ownerId) {
                Photoview.doShowTagged(ownerId, false);
                boxRefreshCoords(layer);
            }
        },
        showTagged: function(ownerId, options) {
            ownerId = intval(ownerId);
            if (!cur.pvPhotoTagData) cur.pvPhotoTagData = {};
            if (cur.pvListId == 'temp') {
                cur.pvCancelLoad();
            }

            cur.pvNoHistory = options.noHistory;
            cur.pvHistoryLength = 0;
            cur.pvPhotoTagShowing = ownerId;

            var of = options.onFail;

            if (!cur.pvPhotoTagData[ownerId]) {
                cur.pvPhotoTagData[ownerId] = 'loading';
                ajax.post('al_photos.php', {
                    act: 'show_tag',
                    mid: ownerId
                }, extend(options, {
                    onDone: Photoview.loadedTagged,
                    onFail: function(t) {
                        if ( of ) of (t);
                        delete(cur.pvPhotoTagData[ownerId]);
                        cur.pvPhotoTagData[ownerId];
                        layers.fullhide(true);
                        return true;
                    }
                }));
            } else if (cur.pvPhotoTagData[ownerId] != 'loading') {
                Photoview.doShowTagged(ownerId, false);
                boxRefreshCoords(layer);
            }
        },

        updatePeriods: function() {
            Photoview.periods = geByClass('photos_period_delimiter');
        },

        destroyPeriod: function() {
            if (Photoview.fixedPeriod) {
                re(Photoview.fixedPeriod);
                Photoview.fixedPeriod = false;
                Photoview.fixedPeriodEl = false;
            }
        },

        fixPeriod: function() {
            if (Photoview.periods && Photoview.periods.length) {
                var scroll = scrollGetY();
                var fixed = false;
                var nextY = false;
                var periodHeright = getSize(Photoview.periods[0])[1];
                for (var i in Photoview.periods) {
                    var y = getXY(Photoview.periods[i])[1];
                    if (y >= scroll) {
                        break;
                    }
                    fixed = Photoview.periods[i];
                    var ni = intval(i) + 1;
                    if (Photoview.periods[ni]) {
                        nextY = getXY(Photoview.periods[ni])[1] - scroll;
                    } else {
                        nextY = false;
                    }
                }
                if (fixed) {
                    if (fixed == Photoview.fixedPeriodEl) {} else {
                        if (Photoview.fixedPeriod) {
                            Photoview.fixedPeriod.innerHTML = fixed.innerHTML;
                            //setStyle(Photoview.fixedPeriod, {top: '0px'});
                        } else {
                            Photoview.fixedPeriod = ce('div', {
                                innerHTML: fixed.innerHTML,
                                className: 'pva_period_fixed'
                            }, {
                                left: getXY(fixed)[0] + 'px'
                            })
                            utils.appendChild(Photoview.fixedPeriod);
                        }
                        Photoview.fixedPeriodEl = fixed;
                    }
                    var diff = (nextY !== false) ? nextY - periodHeright : 0;
                    if (diff >= 0) {
                        diff = 0;
                    }
                    if (Photoview.fixedPeriodTop !== diff) {
                        setStyle(Photoview.fixedPeriod, {
                            top: diff + 'px'
                        });
                        Photoview.fixedPeriodTop = diff;
                    }
                } else if (!fixed && Photoview.fixedPeriod) {
                    re(Photoview.fixedPeriod);
                    Photoview.fixedPeriod = false;
                    Photoview.fixedPeriodEl = false;
                }
            }
        },

        scrollResize: function() {
            if (browser.mobile || !cur.pvShown || (!cur.pvAlbumsShown && !cur.pvAlbumShown && !cur.pvPhotoTagShown && !cur.pvVideoTagsShown)) return;

            var moreBtn = ge('ui_pv_photos_load_more');
            var albumsLnk = ge('ui_pva_more_load_more');

            var bt = lastWindowHeight * 3;

            if (isVisible(moreBtn) && bt > getXY(moreBtn)[1] - (browser.msie6 ? 0 : scrollGetY())) {
                if (cur.pvVideoTagsShown) {
                    Photoview.loadVideoTags();
                } else if (cur.pvPhotoTagShown) {
                    Photoview.loadTaggedPhotos();
                } else if (cur.pvAlbumsShown) {
                    Photoview.loadAlbumsPhotos();
                } else {
                    Photoview.loadAlbumPhotos();
                }
            }

            if (cur.pvAlbumsShowing) {
                Photoview.fixPeriod();
            }

            if (cur.pvAlbumsShown && cur.pvShowAllAlbums && isVisible(albumsLnk) && bt > getXY(albumsLnk)[1] - (browser.msie6 ? 0 : scrollGetY())) {
                Photoview.loadAlbums();
            }
        },
        loadAlbums: function() {
            cur.pvShowAllAlbums = true;
            Photoview.loadAlbumsPhotos(true);
        },
        loadedAlbumsPhotos: function(off, rows, albums, curYear) {
            cur.pvaLoading = 0;

            if (!cur.pvAlbumsShown) return;

            if (albums) {
                cur.pvaOffset = off;
            } else {
                cur.pvaPhotosOffset = off;
            }

            if (curYear) {
                cur.curYear = curYear;
            }

            var cont = albums ? ge('pva_content') : ge('pva_content_photos'),
                more = albums ? ge('ui_pva_more_load_more') : ge('ui_pv_photos_load_more'),
                opts = albums ? {
                    act: 'show_albums'
                } : {
                    act: 'show_albums',
                    only_photos: 1,
                    cur_year: cur.curYear
                },
                offset = albums ? cur.pvaOffset : cur.pvaPhotosOffset,
                count = albums ? cur.pvaCount : cur.pvaPhotosCount;

            if (!cont) return;

            var d = ce('div', {
                innerHTML: rows
            });
            while (d.firstChild) {
                if (hasClass(d.firstChild, 'photos_period_delimiter')) {
                    // check that this year already shown for these rows. If so remove it
                    var year = domData(d.firstChild, 'year');
                    if (geByClass1('photos_period_delimiter_' + year)) {
                        re(d.firstChild);
                        continue;
                    }
                }
                cont.appendChild(d.firstChild);
            }

            Photoview.onResize();

            Photoview.updatePeriods();

            if (off >= count || !rows) {
                hide(more);
                return;
            }

            if (!albums) { // only for albums
                return;
            }
            cur.pvaLoading = 1;

            ajax.post('al_photos.php', extend({
                offset: offset,
                part: 1,
                owner: cur.pvAlbumsShown
            }, opts || {}), {
                onDone: function() {
                    debugLog('preload done: ' + cur.pvaLoading);
                    if (cur.pvaLoading == 2) {
                        Photoview.loadedAlbumsPhotos.apply(window, arguments);
                    } else {
                        cur.pvaLoading = false;
                    }
                },
                onFail: function() {
                    cur.pvaLoading = 0;
                    return true;
                }
            });
        },
        loadAlbumsPhotos: function(albums) {
            var more = albums ? ge('ui_pva_more_load_more') : ge('ui_pv_photos_load_more');
            var opts = albums ? {
                act: 'show_albums'
            } : {
                act: 'show_albums',
                only_photos: 1
            };
            var offset = albums ? cur.pvaOffset : cur.pvaPhotosOffset;

            if (!cur.pvAlbumsShown || !more || !isVisible(more) || isButtonLocked(more)) return;

            if (cur.pvaLoading) {
                cur.pvaLoading = 2;
                return;
            }

            ajax.post('al_photos.php', extend({
                offset: offset,
                part: 1,
                owner: cur.pvAlbumsShown
            }, opts || {}), {
                cache: opts.only_photos ? 0 : 1,
                onDone: Photoview.loadedAlbumsPhotos,
                onFail: function() {
                    cur.pvaLoading = 0;
                    return true;
                },
                showProgress: function() {
                    lockButton(more);
                },
                hideProgress: function() {
                    unlockButton(more);
                }
            });
        },
        loadedAlbumPhotos: function(off, rows) {
            cur.pvaLoading = 0;

            if (!cur.pvAlbumShown) return;

            cur.pvsaOffset = off;

            var cont = ge('pvsa_content_photos');
            var more = ge('ui_pv_photos_load_more');

            if (!cont) return;

            cont.appendChild(cf(rows));

            var noKnownCount = cur.pvAlbumData[cur.pvAlbumShown].opts.no_known_count;

            if (!noKnownCount && off >= cur.pvsaCount || !rows) {
                hide(more);
                Photoview.onResize();
                return;
            }

            setTimeout(function() {
                Photoview.onResize();
            }, 10);

            cur.pvsaLoading = 1;

            ajax.post('al_photos.php', {
                offset: cur.pvsaOffset,
                part: 1,
                album: cur.pvAlbumShown,
                act: 'show_album'
            }, {
                onDone: function() {
                    if (cur.pvsaLoading == 2) {
                        Photoview.loadedAlbumPhotos.apply(window, arguments);
                    } else {
                        cur.pvsaLoading = false;
                        ajax.preload('al_photos.php', {
                            offset: cur.pvsaOffset,
                            part: 1,
                            album: cur.pvAlbumShown,
                            act: 'show_album'
                        }, arguments);
                    }
                },
                onFail: function() {
                    cur.pvsaLoading = 0;
                    return true;
                }
            });
        },
        loadAlbumPhotos: function() {
            var more = ge('ui_pv_photos_load_more');
            var offset = cur.pvsaOffset;

            if (!cur.pvAlbumShown || !more || !isVisible(more) || isButtonLocked(more)) return;

            if (cur.pvsaLoading) {
                cur.pvsaLoading = 2;
                return;
            }

            ajax.post('al_photos.php', {
                act: 'show_album',
                album: cur.pvAlbumShown,
                offset: offset,
                part: 1
            }, {
                onDone: Photoview.loadedAlbumPhotos,
                onFail: function() {
                    cur.pvsaLoading = 0;
                    return true;
                },
                showProgress: function() {
                    lockButton(more);
                },
                hideProgress: function() {
                    unlockButton(more);
                },
                cache: true
            });
        },
        loadedTaggedPhotos: function(off, rows) {
            cur.pvaLoading = 0;

            if (!cur.pvPhotoTagShown) return;

            cur.pvsaOffset = off;

            var cont = ge('pvsa_content_photos');
            var more = ge('ui_pv_photos_load_more');

            if (!cont) return;

            cont.appendChild(cf(rows));

            Photoview.onResize();

            if (off >= cur.pvsaCount || !rows) {
                hide(more);
                return;
            }
            cur.pvsaLoading = 1;

            ajax.post('al_photos.php', extend({
                offset: cur.pvsaOffset,
                part: 1,
                mid: cur.pvPhotoTagShown
            }, {
                act: 'show_tag'
            }), {
                onDone: function() {
                    debugLog('preload done: ', cur.pvsaLoading);
                    if (cur.pvsaLoading == 2) {
                        Photoview.loadedTaggedPhotos.apply(window, arguments);
                    } else {
                        cur.pvsaLoading = false;
                    }
                },
                onFail: function() {
                    cur.pvsaLoading = 0;
                    return true;
                }
            });
        },
        loadTaggedPhotos: function(albums) {
            var more = ge('ui_pv_photos_load_more');
            var offset = cur.pvsaOffset;

            if (!cur.pvPhotoTagShown || !more || !isVisible(more) || isButtonLocked(more)) return;

            if (cur.pvsaLoading) {
                cur.pvsaLoading = 2;
                return;
            }

            ajax.post('al_photos.php', {
                act: 'show_tag',
                mid: cur.pvPhotoTagShown,
                offset: offset,
                part: 1
            }, {
                onDone: Photoview.loadedTaggedPhotos,
                onFail: function() {
                    cur.pvsaLoading = 0;
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
        thumbOver: function(obj, id) {
            clearTimeout((cur.pvHideTO || {})[id]);
            var title = geByClass1('pva_title', obj),
                r = title.previousSibling,
                descY = getSize(geByClass1('pva_desc', obj))[1];
            if (descY < 5) return;

            animate(title, {
                marginTop: 146 - (descY + 7)
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            });
            if (r.className == 'pva_repeat') {
                animate(r, {
                    marginTop: 43 - Math.floor((descY + 7) / 2)
                }, {
                    duration: 200,
                    transition: Fx.Transitions.easeOutCirc
                });
            }
        },
        thumbOut: function(obj, id) {
            if (!cur.pvHideTO) cur.pvHideTO = {};
            cur.pvHideTO[id] = setTimeout(function() {
                var title = geByClass1('pva_title', obj),
                    r = title.previousSibling;
                animate(title, {
                    marginTop: 146
                }, 200);
                if (r.className == 'pva_repeat') {
                    animate(r, {
                        marginTop: 43
                    }, 200);
                }
            }, 150);
        },

        fsMove: function(ev) {
            if (cur.pvAlbumsShown || cur.pvAlbumShown || cur.pvPhotoTagShown || !cur.pvCurPhoto.author) return;

            var pos = getXY(cur.pvActions);
            var size = getSize(cur.pvActions);
            var padding = Math.max(100, cur.pvPhWidth * 0.2);

            if ((ev.pageX > (pos[0] - padding) && ev.pageX < (pos[0] + size[0] + padding)) &&
                (ev.pageY > (pos[1] - padding) && ev.pageY < (pos[1] + size[1] + padding))) {
                addClass(cur.pvActions, 'visible');
            } else {
                removeClass(cur.pvActions, 'visible');
            }
        },

        showRepeat: function(row) {
            if (!row || geByClass1('pva_repeat', row)) return;

            geByClass1('pva_link', row).insertBefore(ce('div', {
                className: 'pva_repeat',
                innerHTML: '\
<div class="pva_repeat_blob">\
  <div class="pva_repeat_cont"><img class="pva_repeat_img png" src="' + stManager._srcPrefix('.css') + '/images/icons/post_hh' + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.png?3" /><span class="pva_repeat_text">' + getLang('photos_repeat_album') + '</span></div>\
</div>'
            }), geByClass1('pva_title', row));
        },

        showPlace: function() {
            var geohash = cur.pvCurPhoto.geohash;
            showBox('al_places.php', {
                act: 'show_photo_place',
                geohash: geohash,
                photo: cur.pvCurPhoto.id
            }, {
                cache: 1
            });
        },

        editPlace: function() {
            var geohash = cur.pvCurPhoto.geohash;
            showBox('al_places.php', {
                act: 'show_photo_place',
                edit: 1,
                geohash: geohash || '',
                photo: cur.pvCurPhoto.id
            });
        },

        updatePlace: function(photo, place) {
            var placeCont = ge('pv_edit_place');
            if (place) {
                placeCont && (placeCont.innerHTML = place ? place + '.' : '');
                ge('pv_place').innerHTML = place ? '<span class="pv_place_label"></span> <a class="pv_place_a" id="pv_place_a" onclick="Photoview.showPlace()">' + place + '</a>' : '';
                hide('pv_add_place');
            } else {
                setTimeout(function() {
                    ajax.post('al_photos.php', {
                        act: 'get_photo_place',
                        photo: photo
                    }, {
                        onDone: function(place, placeGeoHash) {
                            Photoview.updatePlace(photo, place);
                        }
                    })
                }, 1000);
            }
        },

        reportComment: function(obj, ev, commentRaw) {
            stManager.add(['privacy.js', 'privacy.css'], function() {
                return Privacy.show(obj, ev, 'report_' + commentRaw);
            });
        }

    },
    photoview = Photoview;

try {
    stManager.done('photoview.js');
} catch (e) {}