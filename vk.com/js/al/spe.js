(function(exports) {

    function isRetina() {
        return window.devicePixelRatio >= 2;
    }

    var
        PE_STICKER_PREVIEW_SIZE = isRetina() ? 256 : 128,
        PE_STICKER_DRAG_SIZE = 128,
        PE_STICKER_DRAG_IMAGE_SIZE = isRetina() ? 256 : 128,
        PE_STICKER_MAX_SIZE = 512,

        PE_MIN_LAYER_STICKER_SIZE = 30,

        MIN_FONT_SIZE = 10,

        MAX_STICKERS_1APRIL = 10,
        MAX_LAYER_STICKER_SIZE_1APRIL = 260;

    var _data;
    var _els = {};
    var _stickersMap = {};
    var _canvasSize;
    var _saveButton;
    var _deleteSelectedButton;

    var _onDoneEdit, _onCloseEditor;
    var _bottomInfoEl = '';

    var _onCanvasMouseDown, _onCanvasMouseMove, _onCanvasMouseUp;

    var AVAILABLE_COLORS = ['#E64646', '#FF9300', '#FFCB00', '#62DA37', '#00AEF9', '#CC74E1', '#000000', '#FFFFFF'];

    // stickers
    var _layers = [];
    var _stickerImagesCache = {};
    var _selectedLayerEl;
    var _stickersListScrollbar;
    var _selectionEl;

    // text
    var _currentTextSize;
    var _currentTextColor;
    var _currentTextFont;
    var _currentTextareaEl;
    var _textSizeSlider;

    // drawings
    var _drawingCanvasCtx;
    var _drawings = [];
    var _drawingWidthSlider, _drawingIntensitySlider;
    var _drawingCurrentLineWidth, _drawingCurrentLineColor, _drawingCurrentLineOpacity;

    var HEAD_STICKERS_1APRIL = ['editor_4061', 'editor_4062', 'editor_3992', 'editor_3993', 'editor_3756', 'editor_3759', 'editor_3769', 'editor_3772', 'editor_3541', 'editor_3175', 'editor_3176', 'editor_3177', 'editor_3178', 'editor_3179', 'editor_3180', 'editor_3182', 'editor_3183', 'editor_3190', 'editor_3947', 'editor_3948', 'editor_3995', 'editor_4267'];
    var GLASSES_STICKERS_1APRIL = ['editor_4262', 'editor_3994', 'editor_3198', 'editor_3199', 'editor_3200', 'editor_3202', 'editor_3205', 'editor_4270'];
    var NOSES_STICKERS_1APRIL = ['editor_3187', 'editor_3188', 'editor_3184', 'editor_3185'];

    function init(photo, onDone, onCloseEditor) {
        _reset();

        _onDoneEdit = onDone;
        _onCloseEditor = onCloseEditor;

        addClass(cur.pvCont, 'pv_pe');

        var fontPreload = se('<div id="pe_font_preload">\
      <div style="font-family: \'ImpactPE\'">test</div> \
      <div style="font-family: \'Lobster\'">test</div> \
      <div style="font-family: \'RobotoPE\'">test</div> \
    </div>');

        cur.pvCont.appendChild(fontPreload);
        hide(domFC(cur.pvBottomInfo));

        function onPELoaded(peHtml, peData) {
            re(fontPreload);

            var pvContHeight = getSize(cur.pvCont)[1];

            var pePanel = se(peHtml);
            cur.pvNarrowColumnWrap.appendChild(pePanel);

            setStyle(pePanel, 'height', pvContHeight);

            hide(cur.pvNarrowColumn);

            _els = {};

            _data = peData;
            _data.hash = photo.pe_hash;
            _els.stickersListEl = geByClass1('pe_sticker_pack_list');
            _els.tabs = geByClass('pe_tab');
            _els.tabContents = geByClass('pe_tab_content');
            _els.editPanel = pePanel;

            extend(cur.lang, peData.lang);

            // prepare stickers map for convinience
            each(_data.stickerPacks, function(packId, pack) {
                each(pack, function(i, sticker) {
                    _stickersMap[sticker.id] = sticker;
                });
            });

            _initCanvas();

            _bottomInfoEl = se('<div></div>');
            cur.pvBottomInfo.appendChild(_bottomInfoEl);
            if (_data.edited && _data.canEdit && !cur.shownAs1AprilEditor) {
                _bottomInfoEl.appendChild(se('<a class="pe_restore_link" onclick="SPE.restoreOriginal()">' + getLang('photos_filtered_restore') + '</a>'));
            } else if (!_data.canEdit && !cur.shownAs1AprilEditor) {
                _bottomInfoEl.appendChild(se('<span class="pe_bottom_info">' + getLang('photos_will_be_saved_to_pe_album') + '</span>'));
            }
            _bottomInfoEl.appendChild(_deleteSelectedButton = se('<a class="pe_delete_selected_btn" onclick="SPE.deleteSelected()"></a>'));

            _saveButton = geByClass1('_pe_save_btn');

            if (cur.shownAs1AprilEditor) {
                hide(geByClass1('pe_tabs', 'pv_box'));

                _els.info1April = ce('div', {
                    className: 'pe_1april_info',
                    innerHTML: photo.pe_data.info_1april
                })
                cur.pvBox.appendChild(_els.info1April)

                _els.stickersLimit1AprilMsg = ce('div', {
                    className: 'pe_1april_stickers_limit',
                    innerHTML: photo.pe_data.stickers_limit_1april
                        .replace('{selected}', '<span id="pe_1april_selected_stickers_count"></span>')
                        .replace('{limit}', '<span class="bold">' + MAX_STICKERS_1APRIL + '</span>')
                })
                cur.pvBottomInfo.appendChild(_els.stickersLimit1AprilMsg)
            }

            this.openTab(ge('pe_tab_stickers'));

            _updateSaveButtonState();
        }

        if (photo.pe_html && photo.pe_data) {
            onPELoaded.call(this, photo.pe_html, photo.pe_data);
            delete photo.pe_html;
            delete photo.pe_data;
        } else {
            ajax.post('al_photos.php', {
                act: 'get_editor',
                photo_id: photo.id,
                hash: photo.pe_hash
            }, {
                onDone: onPELoaded.bind(this)
            });
        }

        if (cur.shownAs1AprilEditor) {
            _render1AprilDetectedStickers();
        }
    }

    function _render1AprilDetectedStickers() {
        var leftOffset = cur.pvPhWidth < cur.pvCurData.width ? (cur.pvCurData.width - cur.pvPhWidth) / 2 : 0;
        var topOffset = cur.pvPhHeight < 449 ? (cur.pvCurData.height - cur.pvPhHeight) / 2 : 0;

        var data = cur.pvCurPhoto.faked_detected;

        for (var i = 0; i < data.faces.length; i++) {
            var item = data.faces[i];

            var headSticker = HEAD_STICKERS_1APRIL[irand(0, HEAD_STICKERS_1APRIL.length - 1)];
            var stickerSize = Math.max(PE_MIN_LAYER_STICKER_SIZE, Math.min(MAX_LAYER_STICKER_SIZE_1APRIL, item.width))

            var el = _addLayer('sticker', item.x, item.y, extend(_stickersMap[headSticker], {
                size: [stickerSize, stickerSize],
                packId: 'editor',
            }));

            var y = item.y0 - stickerSize * 0.7;
            var x = item.x0 - leftOffset;

            if (leftOffset) {
                stickerSize -= leftOffset / 2;
            }

            setStyle(el, {
                transform: 'rotate(' + item.rotate + 'deg)',
                width: stickerSize,
                height: stickerSize,
                top: y,
                left: x
            });

            /*_els.stickerLayers.appendChild(ce('div', {

            }, {
              border: '1px solid red',
              width: item.width - leftOffset / 2,
              height: item.height - topOffset / 2,
              position: 'absolute',
              top: item.y,
              left: item.x,
              transform: 'rotate(' +  item.rotate + 'deg)',
              pointerEvents: 'none'
            }))*/
        }

        for (var i = 0; i < data.ext.length; i++) {
            var items = data.ext[i];
            for (var j in items) {
                var item = items[j];
                var x = 0,
                    y = 0,
                    size = 0,
                    sticker;
                if (j === 'eyes') {
                    sticker = GLASSES_STICKERS_1APRIL[irand(0, GLASSES_STICKERS_1APRIL.length - 1)];
                } else if (j === 'nose') {
                    sticker = NOSES_STICKERS_1APRIL[irand(0, NOSES_STICKERS_1APRIL.length - 1)];
                }

                x = item.x;
                y = item.y;
                size = item.width;
                if (leftOffset) {
                    size -= leftOffset / 2;
                }

                if (size < 30) {
                    continue;
                }

                var el = _addLayer('sticker', 0, 0, extend(_stickersMap[sticker], {
                    size: [stickerSize, stickerSize],
                    packId: 'editor',
                }));


                setStyle(el, {
                    transform: 'rotate(' + item.rotate + 'deg)',
                    width: size,
                    height: size,
                    top: y,
                    left: x - leftOffset
                });
            }
        }
    }

    function _updateSaveButtonState() {
        var wasChanged = _getUsedStickerIds(true).length > 0 || _drawings.length > 0 || _els.textLayers.children.length > 0;
        toggleClass(_saveButton, 'button_disabled', !wasChanged);

        if (cur.shownAs1AprilEditor) {
            var selected_stickers = _els.stickerLayers.children.length
            if (selected_stickers >= MAX_STICKERS_1APRIL) {
                addClass(_els.stickersListEl, 'pe_stickers_disabled');
            } else {
                removeClass(_els.stickersListEl, 'pe_stickers_disabled');
            }

            var limit_wrap = ge('pe_1april_selected_stickers_count');
            if (selected_stickers > 0) {
                val(limit_wrap, langNumeric(selected_stickers, cur.lang.pe_1april_limit_N_stickers).replace('{count}', ' <span class="bold">' + selected_stickers + '</span> '));
                show(limit_wrap.parentNode);
            } else {
                hide(limit_wrap.parentNode);
            }
        }
    }

    function _closeEditor() {
        removeClass(cur.pvCont, 'pv_pe');
        show(cur.pvNarrowColumn);
        re(_els.editPanel);
        re(_els.canvasEl);
        re(_currentTextareaEl);
        _bottomInfoEl && re(_bottomInfoEl);
        show(domFC(cur.pvBottomInfo));

        _onCloseEditor();
    }

    function _reset() {
        _selectedLayerEl = null;

        _drawingCanvasCtx = null;
        _drawings = [];

        _drawingWidthSlider && _drawingWidthSlider.destroy();
        _drawingIntensitySlider && _drawingIntensitySlider.destroy();
        _textSizeSlider && _textSizeSlider.destroy();

        _drawingWidthSlider = _drawingIntensitySlider = _textSizeSlider = null;
    }

    function initStickerPacksSlider() {
        var btns = geByClass('pe_sticker_pack_tab_btn');
        var sliderContEl = geByClass1('pe_sticker_packs_slider_cont');
        var sliderWrapEl = domPN(sliderContEl);
        var offset = intval(getStyle(sliderContEl, 'left')),
            step = 250,
            maxOffset = -sliderContEl.scrollWidth + getSize(sliderWrapEl)[0];

        function updateSliderCont() {
            offset = Math.max(Math.min(0, offset), maxOffset)

            setStyle(sliderContEl, 'left', offset);

            toggle(btns[0], offset < 0);
            toggle(btns[1], offset > maxOffset);
        }

        addEvent(sliderWrapEl, 'mousewheel', function(event) {
            offset -= event.deltaY;
            updateSliderCont();
        });

        addEvent(btns[0], 'click', function(event) {
            offset += step;
            updateSliderCont();
            return cancelEvent(event);
        });
        addEvent(btns[1], 'click', function(event) {
            offset -= step;
            updateSliderCont();
            return cancelEvent(event);
        });
    }

    function openTab(tab) {
        each(_els.tabs, function() {
            removeClass(this, 'pe_selected');
        });
        each(_els.tabContents, function() {
            hide(this);
        });

        addClass(tab, 'pe_selected');

        var id = tab.id.split('_')[2]; // e.g. pe_tab_stickers
        var tabContentEl = ge('pe_tab_content_' + id);
        show(tabContentEl);

        _onCanvasMouseDown = _onCanvasMouseMove = _onCanvasMouseUp = false;

        switch (id) {
            case 'stickers':
                _initStickersMode(tabContentEl);
                break;

            case 'text':
                _initTextMode(tabContentEl);
                break;

            case 'draw':
                _initDrawMode(tabContentEl);
                break;
        }
    }

    function removeSelectedLayer() {
        var layer = _selectedLayerEl;
        _deselectLayer();
        re(layer);

        _updateSaveButtonState();
    }

    function onKeyPress(event) {
        if (event.keyCode == 90 /*z*/ && (event.metaKey || event.ctrlKey)) {
            _undoLastDrawing();
        }

        if (inArray(event.keyCode, [8 /*backspace*/ , 46 /*delete*/ ]) && _selectedLayerEl && event.target.nodeName != 'TEXTAREA') {
            removeSelectedLayer();
            return cancelEvent(event);
        }

        return true;
    }

    function _addStickerImageCached(stickerId, size, onload) {
        var key = stickerId + '_' + size;

        if (!_stickerImagesCache[key] || onload) { // if onload provided we have to make new img object in anyway
            var img = vkImage();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                onload && onload(this);
            }

            img.src = _stickersMap[stickerId].sizes[size];

            _stickerImagesCache[key] = img;
        }
    }

    function _getStickerImageCached(stickerId, size) {
        var key = stickerId + '_' + size;
        return _stickerImagesCache[key];
    }

    function _selectStickerPack(stickerPackId) {
        _data.stickerPackSelected = stickerPackId;

        each(geByClass('pe_sticker_pack_tab'), function() {
            removeClass(this, 'pe_selected')
        });
        addClass('pe_stickers_pack_tab_' + stickerPackId, 'pe_selected');

        _stickersListScrollbar && _stickersListScrollbar.destroy();

        _els.stickersListEl.innerHTML = '';
        setStyle(_els.stickersListEl, 'height', getXY(cur.pvCont)[1] + getSize(cur.pvCont)[1] - getXY(_els.stickersListEl)[1] - getSize(geByClass1('pe_bottom_actions'))[1]);

        var offset = 0,
            step = 16;

        _stickersListScrollbar = new uiScroll(_els.stickersListEl, {
            onmoreThreshold: 200,
            onmore: function(api) {
                var stickers = _data.stickerPacks[stickerPackId].slice(offset, offset + step);

                each(stickers, function(i, sticker) {
                    api.content.appendChild(se('<div class="pe_sticker_preview" data-sticker-id="' + sticker.id + '"><img src="' + sticker.sizes[PE_STICKER_PREVIEW_SIZE] + '"/></div>'));
                });

                offset += step;
            }
        });

        var onStickerMouseMove, onStickerDrop;

        removeEvent(_els.stickersListEl, 'mousedown');
        addEvent(_els.stickersListEl, 'mousedown', function(event) {
            var stickerEl = domClosest('pe_sticker_preview', event.target);

            if (!stickerEl) {
                return;
            }

            if (cur.shownAs1AprilEditor && _els.stickerLayers.children.length >= MAX_STICKERS_1APRIL) {
                return
            }

            var stickerId = domData(stickerEl, 'sticker-id');
            var sticker = _stickersMap[stickerId];
            var stickerSizeRatio = 1;

            _addStickerImageCached(stickerId, PE_STICKER_MAX_SIZE, function(img) {
                stickerSizeRatio = img.width / img.height;
            });

            var stickerCloneEl = se('<div class="pe_sticker_preview_drag"><img src="' + sticker.sizes[PE_STICKER_DRAG_IMAGE_SIZE] + '" height="' + PE_STICKER_DRAG_SIZE + '"/><div>');

            cur.pvCont.appendChild(stickerCloneEl);

            var initialPos = [event.pageX, event.pageY];
            var moveDistance = 0;
            onStickerMouseMove = function(event) {
                var stickerSize = [PE_STICKER_DRAG_SIZE * stickerSizeRatio, PE_STICKER_DRAG_SIZE];

                if (cur.shownAs1AprilEditor) {
                    stickerSize = [128 * stickerSizeRatio, 128];
                }

                setStyle(stickerCloneEl, {
                    left: event.pageX - stickerSize[0] / 2,
                    top: event.pageY - scrollGetY() - stickerSize[1] / 2,
                });

                var moveVec = [event.pageX - initialPos[0], event.pageY - initialPos[1]];
                moveDistance = Math.sqrt(moveVec[0] * moveVec[0] + moveVec[1] * moveVec[1]);
            }

            addEvent(window, 'mousemove', onStickerMouseMove);

            addEvent(window, 'mouseup', onStickerDrop = function(event) {
                var imgSize = getSize(geByTag1('img', stickerCloneEl));
                re(stickerCloneEl);

                var mousePos = _getMouseXY(event);

                if (!imgSize || !imgSize[0]) {
                    imgSize = [PE_STICKER_DRAG_SIZE, PE_STICKER_DRAG_SIZE];
                    if (cur.shownAs1AprilEditor && isRetina()) {
                        imgSize = [PE_STICKER_DRAG_SIZE / 2, PE_STICKER_DRAG_SIZE / 2];
                    }
                }

                sticker = extend({}, sticker, {
                    size: imgSize,
                    packId: stickerPackId
                });

                if (mousePos[0] > 0 && mousePos[0] < _canvasSize[0] && mousePos[1] > 0 && mousePos[1] < _canvasSize[1]) {
                    _addLayer('sticker', mousePos[0], mousePos[1], sticker);
                } else if (moveDistance < 5) {
                    _addLayer('sticker', _canvasSize[0] / 2, _canvasSize[1] / 2, sticker);
                }

                removeEvent(window, 'mousemove', onStickerMouseMove);
                removeEvent(window, 'mouseup', onStickerDrop);
            });

            onStickerMouseMove(event);

            return cancelEvent(event);
        });
    }

    function _initCanvas() {
        var imgEl = domFC(cur.pvPhoto);
        var imgSize = getSize(imgEl);
        var imgPos = getXY(imgEl);

        _els.canvasEl = se('<div class="pe_canvas"> \
      <div class="pe_canvas_sticker_layers"></div> \
      <canvas class="pe_drawing_canvas" width="' + imgSize[0] + '" height="' + imgSize[1] + '"></canvas> \
      <div class="pe_canvas_text_layers"></div> \
    </div>');

        setStyle(_els.canvasEl, {
            width: imgSize[0],
            height: imgSize[1],
            marginTop: imgEl.style.marginTop,
            marginLeft: imgEl.offsetLeft
        });

        _canvasSize = imgSize;
        cur.pvPhoto.appendChild(_els.canvasEl);

        _els.textEdits = cur.pvCont;

        _els.stickerLayers = geByClass1('pe_canvas_sticker_layers', _els.canvasEl);
        _els.textLayers = geByClass1('pe_canvas_text_layers', _els.canvasEl);
        _els.drawingCanvas = geByClass1('pe_drawing_canvas', _els.canvasEl);

        var onMouseMove, onMouseUp;

        addEvent(_els.canvasEl, 'mousedown', function(event) {
            if (hasClass(event.target, 'pe_textarea')) {
                event.originalEvent.stopPropagation();
                return;
            }

            cancelEvent(event);
            _onCanvasMouseDown && _onCanvasMouseDown(event);

            onMouseMove && removeEvent(window, 'mousemove', onMouseMove);
            addEvent(window, 'mousemove', onMouseMove = function(event) {
                _onCanvasMouseMove && _onCanvasMouseMove(event);
            });

            onMouseUp && removeEvent(window, 'mouseup', onMouseUp);
            addEvent(window, 'mouseup', onMouseUp = function(event) {
                _onCanvasMouseUp && _onCanvasMouseUp(event);

                removeEvent(window, 'mousemove', onMouseMove);
                removeEvent(window, 'mouseup', onMouseUp);
            });

            return false;
        });
    }

    function _getXY(obj, withoutTransform) {
        if (withoutTransform) {
            return [obj.offsetLeft, obj.offsetTop];
        }

        var cnvPos = getXY(_els.canvasEl);
        var objPos = getXY(obj);

        return [
            objPos[0] - cnvPos[0],
            objPos[1] - cnvPos[1]
        ]
    }

    function _centerXY(obj) {
        var pos = _getXY(obj);
        var size = getSize(obj);
        return [
            pos[0] + size[0] / 2,
            pos[1] + size[1] / 2,
        ];
    }

    function _getSize(obj) {
        return [
            obj.offsetWidth,
            obj.offsetHeight
        ];
    }

    function _getMouseXY(event) {
        var cnvPos = getXY(_els.canvasEl);
        return [
            event.pageX - cnvPos[0],
            event.pageY - cnvPos[1]
        ]
    }

    function _isTextLayer(layerEl) {
        return layerEl && hasClass(layerEl, 'pe_canvas_text_layer');
    }

    function _getTextLayerInner(layerEl) {
        return geByClass1('pe_layer_text_inner', layerEl);
    }

    function _deselectLayer() {
        _doneEditTextLayer();

        if (_selectionEl) {
            re(_selectionEl);
            _selectedLayerEl = false;
        }

        hide(_deleteSelectedButton);
    }

    function _initStickersMode() {
        initStickerPacksSlider();
        _selectStickerPack(_data.stickerPackSelected);
        _initLayerMode();
    }

    function _selectLayer(layerEl) {
        _deselectLayer();

        if (_selectionEl) {
            re(_selectionEl);
        }

        _selectionEl = se(' \
      <div class="pe_layer_selection"> \
        <div class="pe_layer_selection_handler" id="pe_nw"></div> \
        <div class="pe_layer_selection_handler" id="pe_ne"></div> \
        <div class="pe_layer_selection_handler" id="pe_se"></div> \
        <div class="pe_layer_selection_handler" id="pe_sw"></div> \
      </div> \
    ');
        layerEl.appendChild(_selectionEl);

        _selectedLayerEl = layerEl;

        // sync controls on edit panel
        if (_isTextLayer(_selectedLayerEl)) {
            var inner = _getTextLayerInner(_selectedLayerEl);

            _currentTextSize = parseInt(inner.style.fontSize);
            _currentTextFont = inner.style.fontFamily;
            _currentTextColor = domData(inner, 'color-index');

            // font
            var fontRadioBtn = ge('pe_font_roboto');
            if (_currentTextFont.toLowerCase().indexOf('impact') >= 0) {
                fontRadioBtn = ge('pe_font_impact');
            }
            if (_currentTextFont.toLowerCase().indexOf('lobster') >= 0) {
                fontRadioBtn = ge('pe_font_lobster');
            }
            radiobtn(fontRadioBtn, 1, 'pe_fonts');

            // size
            _textSizeSlider.setValue((_currentTextSize - MIN_FONT_SIZE) / 100);

            // color
            _setColorPickerColor(ge('pe_text_color_picker'), _currentTextColor);
        }

        _deleteSelectedButton.innerHTML = _isTextLayer(_selectedLayerEl) ? getLang('photos_pe_delete_text') : getLang('photos_pe_delete_sticker');
        show(_deleteSelectedButton);
    }

    function _initLayerMode() {
        _onCanvasMouseDown = function(event) {
            if (hasClass(event.target, 'pe_layer_selection_handler')) {
                var side = event.target.id.split('_')[1];

                var selectedLayerEl = gpeByClass('pe_canvas_layer', event.target);
                var layerSize = _getSize(selectedLayerEl),
                    layerPos = _getXY(selectedLayerEl, true);

                var layerCenter = [layerPos[0] + layerSize[0] / 2, layerPos[1] + layerSize[1] / 2];
                var ltVec;

                switch (side) {
                    case 'se':
                        ltVec = [
                            layerPos[0] + layerSize[0] - layerCenter[0],
                            layerPos[1] + layerSize[1] - layerCenter[1]
                        ];
                        break;
                    case 'sw':
                        ltVec = [
                            layerPos[0] - layerCenter[0],
                            layerPos[1] + layerSize[1] - layerCenter[1]
                        ];
                        break;
                    case 'ne':
                        ltVec = [
                            layerPos[0] + layerSize[0] - layerCenter[0],
                            layerPos[1] - layerCenter[1]
                        ];
                        break;
                    case 'nw':
                        ltVec = [
                            layerPos[0] - layerCenter[0],
                            layerPos[1] - layerCenter[1]
                        ];
                        break;
                }

                var ltVecLength = Math.sqrt(ltVec[0] * ltVec[0] + ltVec[1] * ltVec[1]);

                _onCanvasMouseMove = function(event) {
                    var mPos = _getMouseXY(event);

                    var ltVecNew = [
                        mPos[0] - layerCenter[0],
                        mPos[1] - layerCenter[1]
                    ];

                    // calculate angle
                    var angleDeg = 180 * (Math.atan2(ltVecNew[1], ltVecNew[0]) - Math.atan2(ltVec[1], ltVec[0])) / Math.PI;

                    var style = {
                        transform: 'rotateZ(' + angleDeg + 'deg)'
                    };

                    // calculate size
                    if (!_isTextLayer(_selectedLayerEl)) {
                        var ltVecNewLength = Math.max(PE_MIN_LAYER_STICKER_SIZE, Math.sqrt(ltVecNew[0] * ltVecNew[0] + ltVecNew[1] * ltVecNew[1]));
                        var scale = ltVecNewLength / ltVecLength;
                        var newWidth = layerSize[0] * scale;
                        var newHeight = layerSize[1] * scale;

                        if (cur.shownAs1AprilEditor) {
                            newWidth = Math.min(MAX_LAYER_STICKER_SIZE_1APRIL, newWidth);
                            newHeight = Math.min(MAX_LAYER_STICKER_SIZE_1APRIL, newHeight);
                        }

                        extend(style, {
                            width: newWidth,
                            height: newHeight,
                            left: layerCenter[0] - newWidth / 2,
                            top: layerCenter[1] - newHeight / 2,
                        });
                    }

                    setStyle(selectedLayerEl, style);
                }

                _onCanvasMouseUp = false;

                return;
            }

            var layerEl = event.target;

            if (layerEl == _els.canvasEl) {
                _deselectLayer();

                _onCanvasMouseUp = _onCanvasMouseMove = false;

                return false;
            }

            var wasSelectedAlready = false;

            if (hasClass(layerEl, 'pe_layer_selection')) {
                layerEl = gpeByClass('pe_canvas_layer', layerEl);
                wasSelectedAlready = true;
            }

            if (!layerEl || !hasClass(layerEl, 'pe_canvas_layer')) {
                return false;
            }

            _selectLayer(layerEl);

            var initialPos = _getMouseXY(event);
            var layerInitialPos = _getXY(layerEl, true);
            var diff = 0;

            _onCanvasMouseMove = function(event) {
                var mousePos = _getMouseXY(event);
                diff = [initialPos[0] - mousePos[0], initialPos[1] - mousePos[1]];

                setStyle(layerEl, {
                    left: layerInitialPos[0] - diff[0],
                    top: layerInitialPos[1] - diff[1]
                });
            }

            _onCanvasMouseUp = function(event) {
                var diffLength = diff ? Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]) : 0;

                if (wasSelectedAlready && _isTextLayer(layerEl) && diffLength <= 2) {
                    _deselectLayer();
                    _editTextLayer(layerEl);
                    return;
                }

                if (cur.shownAs1AprilEditor) {
                    var layerSize = getSize(layerEl);

                    if (layerEl.offsetTop < -layerSize[1] | layerEl.offsetLeft < -layerSize[0] || layerEl.offsetTop > cur.pvPhHeight || layerEl.offsetLeft > cur.pvPhWidth) {
                        removeSelectedLayer();
                    }
                }
            }
        }
    }

    function _addLayer(type, left, top, data) {
        var layerEl = se('<div class="pe_canvas_layer"></div>');

        _deselectLayer();

        if (type == 'sticker') {
            setStyle(layerEl, 'background-image', 'url(\'' + data.sizes[PE_STICKER_PREVIEW_SIZE] + '\')');
            domData(layerEl, 'sticker-id', data.id);
            domData(layerEl, 'pack-id', data.packId);

            var canvasSize = Math.max(_canvasSize[0], _canvasSize[1]);
            var imgRatio = data.size[0] / data.size[1];
            var sizeRatio = 0.25;

            var layerSize = [PE_STICKER_DRAG_SIZE * imgRatio, PE_STICKER_DRAG_SIZE]; //[ canvasSize * sizeRatio, canvasSize * sizeRatio * imgRatio ];

            if (cur.shownAs1AprilEditor && isRetina()) {
                layerSize = [128 * imgRatio, 128];
            }

            setStyle(layerEl, {
                left: left - layerSize[0] / 2,
                top: top - layerSize[1] / 2,
                width: layerSize[0],
                height: layerSize[1],
            });

            var img = vkImage();
            img.onload = function() {
                setStyle(layerEl, 'background-image', 'url(\'' + data.sizes[PE_STICKER_MAX_SIZE] + '\')');
            }
            img.src = data.sizes[PE_STICKER_MAX_SIZE];

            setTimeout(function() {
                _selectLayer(layerEl);
            }, 10);

            _els.stickerLayers.appendChild(layerEl);

        } else if (type == 'text') {
            var text = _data.textPlaceholders[irand(0, _data.textPlaceholders.length - 1)];
            layerEl.innerHTML = '<span class="pe_layer_text_inner">' + text + '</span>';
            setStyle(_getTextLayerInner(layerEl), {
                fontFamily: _currentTextFont,
                fontSize: _currentTextSize,
                color: AVAILABLE_COLORS[_currentTextColor]
            });
            setStyle(layerEl, 'visibility', 'hidden');

            domData(_getTextLayerInner(layerEl), 'color-index', _currentTextColor);

            setTimeout(function() {
                var layerSize = getSize(layerEl);

                setStyle(layerEl, {
                    top: _canvasSize[1] * 0.7,
                    left: _canvasSize[0] * 0.5 - layerSize[0] / 2,
                    visibility: null
                });
            });

            addClass(layerEl, 'pe_canvas_text_layer');

            _els.textLayers.appendChild(layerEl);
        }

        _updateSaveButtonState();

        return layerEl;
    }

    function _updateCurrentTextStyle(style) {
        if (_isTextLayer(_selectedLayerEl)) {
            if (!style) {
                style = {
                    fontFamily: _currentTextFont,
                    fontSize: _currentTextSize,
                    color: AVAILABLE_COLORS[_currentTextColor],
                }
            }

            var innerEl = _getTextLayerInner(_selectedLayerEl);

            var fontFamily = style.fontFamily ? style.fontFamily : innerEl.style.fontFamily;
            var isImpact = fontFamily.toLowerCase().indexOf('impact') >= 0;
            var isLobster = fontFamily.toLowerCase().indexOf('lobster') >= 0;

            setStyle(innerEl, style);
            toggleClass(innerEl, 'pe_text_impact_style', isImpact);
            toggleClass(innerEl, 'pe_text_lobster_style', isLobster);

            if (_currentTextareaEl) {
                setStyle(_currentTextareaEl, style);
                toggleClass(_currentTextareaEl, 'pe_text_impact_style', isImpact);
                toggleClass(_currentTextareaEl, 'pe_text_lobster_style', isLobster);

                triggerEvent(_currentTextareaEl, 'change');
            }
        }
    }

    function _initTextMode(tabContentEl) {
        var fontsList = geByClass1('pe_text_fonts');

        radioBtns.pe_fonts = {
            els: geByClass('_pe_text_font_rdbtn')
        }

        removeEvent(fontsList, 'click');
        addEvent(fontsList, 'click', function(event) {
            var rdBtn = event.target;
            if (hasClass(rdBtn, 'radiobtn')) {
                radiobtn(rdBtn, 1, 'pe_fonts');
                _currentTextFont = domData(rdBtn, 'font');
                _updateCurrentTextStyle({
                    fontFamily: _currentTextFont
                });
            }
        });
        _currentTextFont = domData(geByClass1('_pe_text_font_rdbtn', fontsList), 'font');

        _textSizeSlider = _textSizeSlider || new Slider(geByClass1('pe_text_size_slider'), {
            value: 0.5,
            fireChangeEventOnInit: true,
            size: 2,
            onChange: function(value) {
                value = value * 100 + MIN_FONT_SIZE;
                _currentTextSize = value;
                _updateCurrentTextStyle({
                    fontSize: value
                });
            },
            formatHint: function(value) {
                return parseInt(value * 100 + MIN_FONT_SIZE);
            }
        });

        _initColorPicker(ge('pe_text_color_picker'), function(color, colorIndex) {
            _currentTextColor = colorIndex;

            if (_isTextLayer(_selectedLayerEl)) {
                var innerEl = _getTextLayerInner(_selectedLayerEl);
                setStyle(innerEl, {
                    color: color
                });
                domData(innerEl, 'color-index', colorIndex);
            }
        }, 7 /*index of default color*/ );

        var isThereAnyText = _els.textLayers.children.length > 0;
        if (!isThereAnyText) {
            addTextLayer();
        }

        _initLayerMode();
    }

    function addTextLayer() {
        _deselectLayer();
        var textLayer = _addLayer('text', 0, 0);
        setTimeout(_editTextLayer.pbind(textLayer), 5); // wait while text is loaded and positioned
    }

    function _doneEditTextLayer() {
        if (!_selectedLayerEl || !_isTextLayer(_selectedLayerEl)) {
            return;
        }

        var textareaEl = geByClass1('pe_textarea', _els.textEdits);
        if (!textareaEl) {
            return;
        }

        var text = clean(val(textareaEl)).replace(/\n/g, '</br>');

        val(geByClass1('pe_layer_text_inner', _selectedLayerEl), text);
        if (domPN(textareaEl)) re(textareaEl);

        show(_selectedLayerEl);

        _currentTextareaEl = false;
    }

    function _editTextLayer(textLayer) {
        var textareaEl = se('<textarea class="pe_textarea"></textarea>');

        var layerSize = _getSize(textLayer);
        var layerPos = _getXY(textLayer, true);

        var innerEl = _getTextLayerInner(textLayer);
        var text = innerEl.innerHTML;
        text = text.replace(/<\/?br>/g, '\n');

        val(textareaEl, unclean(text));

        var innerTextStyle = window.getComputedStyle(innerEl);

        var fontStyle = {
            color: 'white',
            fontFamily: innerTextStyle.fontFamily,
            fontSize: innerTextStyle.fontSize
        };

        setStyle(textareaEl, extend({
            width: layerSize[0] + 2,
            height: layerSize[1],
            left: layerPos[0] + parseInt(_els.textEdits.style.paddingLeft) + parseInt(_els.canvasEl.style.marginLeft), // fixme: too hacky
            top: layerPos[1] + parseInt(_els.canvasEl.style.marginTop)
        }, fontStyle));

        _els.textEdits.appendChild(textareaEl);

        textareaEl.select();
        textareaEl.focus();

        var isActive = true;

        addEvent(textareaEl, 'input paste change', function() {
            if (!isActive) return;

            var text = val(textareaEl);

            if (!trim(text)) {
                isActive = false;
                return removeSelectedLayer();
            }

            text = clean(text).replace(/\n/g, '</br>') + (inArray(text[text.length - 1], ['\n', ' ']) ? '&nbsp;' : '');

            var temp = se('<div class="pe_text_temp">' + text + '</div>');

            var innerEl = _getTextLayerInner(_selectedLayerEl);
            var innerTextStyle = window.getComputedStyle(innerEl);

            var fontStyle = {
                fontSize: innerTextStyle.fontSize,
                fontFamily: innerTextStyle.fontFamily,
                letterSpacing: innerTextStyle.letterSpacing,
            }

            _els.canvasEl.appendChild(temp);

            setStyle(temp, fontStyle);

            var tempSize = getSize(temp);
            re(temp);

            setStyle(textareaEl, {
                width: tempSize[0],
                height: tempSize[1] + 8 /* little more space to ensure all letters are fit to textarea */
            });
        });

        hide(textLayer);

        _selectedLayerEl = textLayer;
        _currentTextareaEl = textareaEl;

        _updateCurrentTextStyle();

        triggerEvent(textareaEl, 'change');
    }

    function _setColorPickerColor(colorPickerEl, colorIndex) {
        var colorEl = colorPickerEl.children[colorIndex];
        removeClass(geByClass1('pe_selected', colorPickerEl), 'pe_selected');
        addClass(colorEl, 'pe_selected');
    }

    function _initColorPicker(placeEl, onSelect, colorIndexInitial) {
        if (placeEl.children.length > 0) {
            return;
        }

        each(AVAILABLE_COLORS, function(i, color) {
            var cls = color == '#FFFFFF' ? 'pe_drawing_color_white' : '';
            placeEl.appendChild(se('<div class="pe_drawing_color ' + cls + '" data-color-index="' + i + '" style="background-color: ' + color + '"></div>'));
        });

        function changeColor(event) {
            var colorEl = event.target;
            var colorIndex = domData(colorEl, 'color-index');

            _setColorPickerColor(placeEl, colorIndex);

            onSelect(AVAILABLE_COLORS[colorIndex], colorIndex);
        }

        removeEvent(placeEl, 'click');
        addEvent(placeEl, 'click', changeColor);

        addClass(placeEl, 'pe_drawing_colors_wrap');
        addClass(placeEl, 'clear_fix');

        changeColor({
            target: placeEl.children[colorIndexInitial || 0]
        });
    }

    function _initDrawMode(tabContentEl) {
        var currentDrawing;

        _deselectLayer();

        _onCanvasMouseDown = function(event) {
            var point = _getMouseXY(event);
            currentDrawing = [point, clone(point)];
            currentDrawing[1][1] += 0.1;

            _drawings.push({
                color: _drawingCurrentLineColor,
                width: _drawingCurrentLineWidth,
                opacity: _drawingCurrentLineOpacity,
                path: currentDrawing
            });

            _renderDrawings();
        }

        _onCanvasMouseMove = function(event) {
            currentDrawing.push(_getMouseXY(event));
            _renderDrawings();
        }

        _onCanvasMouseUp = function(event) {
            _updateSaveButtonState();
            toggle(_els.undoDrawing, _drawings.length > 0);
        }

        // init controls
        _drawingWidthSlider = _drawingWidthSlider || new Slider(geByClass1('pe_drawing_width_slider'), {
            value: 0.3,
            fireChangeEventOnInit: true,
            size: 2,
            log: true,
            onChange: function(value) {
                value += 0.1;
                _drawingCurrentLineWidth = 20 * value;
                _updateDrawingPreview();
            },
            formatHint: function(value) {
                return parseInt(value * 100);
            }
        });

        _drawingIntensitySlider = _drawingIntensitySlider || new Slider(geByClass1('pe_drawing_intensity_slider'), {
            value: 1,
            fireChangeEventOnInit: true,
            size: 2,
            onChange: function(value) {
                _drawingCurrentLineOpacity = value;
                _updateDrawingPreview();
            },
            formatHint: function(value) {
                return parseInt(value * 100) + '%';
            }
        });

        // color picker
        function onColorChange(color) {
            _drawingCurrentLineColor = color;
            _updateDrawingPreview();
        }
        _initColorPicker(ge('pe_drawing_color_picker'), onColorChange, 0);

        _els.undoDrawing = geByClass1('_pe_drawing_undo');
        removeEvent(_els.undoDrawing, 'click');
        addEvent(_els.undoDrawing, 'click', _undoLastDrawing);

        _els.drawingPreview = geByClass1('pe_drawing_preview');

        _updateDrawingPreview();
    }

    function _getUsedStickerIds(allStickers) {
        var stickerIds = [];
        each(_els.stickerLayers.children, function() {
            var packId = domData(this, 'pack-id');
            if (!isNaN(packId) || allStickers) {
                stickerIds.push(domData(this, 'sticker-id'));
            }
        });
        return stickerIds;
    }

    function _updateDrawingPreview() {
        if (!_els.drawingPreview) {
            return
        }

        var ctx = _els.drawingPreview.getContext('2d');

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        ctx.moveTo(26, 25);
        ctx.bezierCurveTo(69, 65, 162, 61, 180, 23);

        ctx.lineWidth = _drawingCurrentLineWidth;
        ctx.strokeStyle = _getDrawingLineColor(_drawingCurrentLineColor, _drawingCurrentLineOpacity);
        ctx.lineJoin = ctx.lineCap = 'round';

        ctx.stroke();
    }

    function _getDrawingLineColor(drawingColor, drawingOpacity) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(drawingColor);
        return 'rgba(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ', ' + drawingOpacity + ')';
    }

    function _undoLastDrawing() {
        _drawings.pop();
        _renderDrawings();

        toggle(_els.undoDrawing, _drawings.length > 0);
    }

    function _renderDrawings(ctx, ratio) {
        var contextProvided = ctx;

        if (!_drawingCanvasCtx && !contextProvided) {
            _drawingCanvasCtx = _els.drawingCanvas.getContext('2d');
        }

        ctx = ctx || _drawingCanvasCtx;
        ratio = ratio || 1;

        ctx.lineJoin = ctx.lineCap = 'round';

        if (!contextProvided) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        for (var di = 0, dlen = _drawings.length; di < dlen; di++) {
            var drawing = _drawings[di];

            ctx.lineWidth = drawing.width * ratio;
            ctx.strokeStyle = _getDrawingLineColor(drawing.color, drawing.opacity);

            ctx.beginPath();

            ctx.moveTo(drawing.path[0][0] * ratio, drawing.path[0][1] * ratio);
            for (var i = 0, ilen = drawing.path.length; i < ilen; i++) {
                ctx.lineTo(drawing.path[i][0] * ratio, drawing.path[i][1] * ratio);
            }

            ctx.stroke();
        }
    }

    function _getStickerImageBestSize(size) {
        if (isArray(size)) {
            size = size[0];
        }

        var stickerSize = 512;
        if (size <= 256) {
            stickerSize = 256;
        } else if (size <= 128) {
            stickerSize = 128;
        } else if (size <= 64) {
            stickerSize = 64;
        }

        return stickerSize;
    }

    function save1AprilStickers(btn) {

        var leftOffset = cur.pvPhWidth < cur.pvCurData.width ? (cur.pvCurData.width - cur.pvPhWidth) / 2 : 0;
        var topOffset = cur.pvPhHeight < 449 ? (cur.pvCurData.height - cur.pvPhHeight) / 2 : 0;
        var stickers = [];
        var stickerLayers = _els.stickerLayers.children;

        for (var i = 0; i < stickerLayers.length; i++) {
            var stickerLayer = stickerLayers[i];

            var rotate = stickerLayer.style.transform ? parseFloat(stickerLayer.style.transform.match(/-?[\d.]+/)[0]) : 0;
            var width_ratio = cur.pvCurData.width / cur.pvPhWidth;
            var height_ratio = cur.pvCurData.height / cur.pvPhHeight;
            stickers.push({
                packId: attr(stickerLayer, 'data-pack-id'),
                stickerId: attr(stickerLayer, 'data-sticker-id').split('_')[1],
                left: stickerLayer.offsetLeft * width_ratio,
                top: stickerLayer.offsetTop * height_ratio,
                width: stickerLayer.offsetWidth * width_ratio,
                height: stickerLayer.offsetHeight * height_ratio,
                rotate: rotate
            })
        }

        if (!stickers.length) {
            return
        }

        lockButton(btn);
        _deselectLayer();

        ajax.post('al_photos.php', {
            act: '1april_stickers_save',
            stickers: JSON.stringify(stickers),
            hash: cur.saveHash1AprilEditor,
            photo_raw: cur.pvCurPhoto.id
        }, {
            onDone: function(result) {
                Photoview.doHide(cur);
                window.Profile && Profile.render1AprilStickers && Profile.render1AprilStickers(JSON.parse(result));
                var ava_wrap = geByClass1('page_avatar_wrap');
                addClass(ava_wrap, 'stickers_added_1april');
                removeClass(ava_wrap, 'no_stickers_1april');
            },
            onFail: function() {
                unlockButton(btn);
            }
        })
    }

    function save(btn) {
        if (cur.shownAs1AprilEditor) {
            return save1AprilStickers(btn);
        }
        lockButton(btn);
        _deselectLayer();

        // load max photo size image
        var maxImage = vkImage();
        maxImage.setAttribute('crossOrigin', 'Anonymous');

        maxImage.onerror = function() {
            (new MessageBox({
                title: getLang('global_error')
            })).content(getLang('photos_pe_save_error')).setButtons('Ok', function() {
                curBox().hide()
            }).show();
            unlockButton(btn);
        }

        maxImage.onload = function() {
            var sizeCoeff = maxImage.width / _canvasSize[0];

            // ensure required sticker images are loaded
            var stickerLayers = _els.stickerLayers.children;
            if (stickerLayers.length) {
                var imagesReadyHub = new callHub(function() {
                    _renderFinalImage(maxImage, _saveToServer.pbind(btn));
                }, stickerLayers.length);

                each(stickerLayers, function() {
                    var size = _getSize(this)[0] * sizeCoeff;

                    var stickerId = domData(this, 'sticker-id');
                    _addStickerImageCached(stickerId, _getStickerImageBestSize(size), function() {
                        imagesReadyHub.done()
                    });
                });
            } else {
                _renderFinalImage(maxImage, _saveToServer.pbind(btn));
            }
        }

        maxImage.src = _data.maxPhotoUrl;
    }

    function _getAllTexts() {
        var text = '';
        each(_els.textLayers.children, function() {
            text += _getTextLayerInner(this).innerHTML
        });
        return text;
    }

    function _saveToServer(btn, blob) {
        var formData = new FormData();
        formData.append('file0', blob, encodeURIComponent('edited_' + irand(99999) + '.jpg'));

        var url = _data.upload.url;

        var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
        var xhr = new XHR();
        xhr.open('POST', url, true);

        xhr.onload = function(str) {
            str = str.target.responseText;
            var info = parseJSON(str);
            var usedStickers = _getUsedStickerIds();

            ajax.post('al_photos.php', {
                act: 'pe_save',
                photo: _data.photoId,
                hash: _data.hash,
                _query: str,
                stickers: usedStickers.length ? usedStickers.join(',') : null,
                need_copy: _data.need_copy,
                texts: _getAllTexts()
            }, {
                onDone: function(album, photoObj, thumb, sizes, viewOpts) {
                    _closeEditor();
                    _onDoneEdit(photoObj, thumb, sizes, viewOpts);
                },
                onFail: function(error) {
                    unlockButton(btn);

                    showFastBox(getLang('global_error'), error);

                    return true;
                }
            });
        }

        xhr.send(formData);
    }

    function restoreOriginal() {
        var phId = _data.photoId.split('_');
        ajax.post('al_photos.php', {
            act: 'restore_original',
            oid: phId[0],
            pid: phId[1],
            hash: _data.hash
        }, {
            onDone: function(photoObj, thumb, sizes, viewOpts) {
                _closeEditor();
                _onDoneEdit(photoObj, thumb, sizes, viewOpts);
            }
        });
    }

    function _renderFinalImage(maxImage, cb) {
        var cnv = se('<canvas width="' + maxImage.width + '" height="' + maxImage.height + '">');
        var ctx = cnv.getContext('2d');

        var sizeCoeff = maxImage.width / _canvasSize[0];

        var yoffset = browser.mozilla ? -5 : (browser.chrome ? 7.778 : 0);
        yoffset *= sizeCoeff;

        // render image
        ctx.drawImage(maxImage, 0, 0);

        // render stickers
        each(_els.stickerLayers.children, function() {
            var layerEl = this;

            ctx.save();

            var size = _getSize(layerEl);
            size[0] *= sizeCoeff;
            size[1] *= sizeCoeff;

            var pos = _getXY(layerEl, true);
            pos[0] *= sizeCoeff;
            pos[1] *= sizeCoeff;

            var rot = layerEl.style.transform ? (parseFloat(layerEl.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180) : 0;

            ctx.translate(pos[0], pos[1]); // set position
            ctx.translate(size[0] / 2, size[1] / 2); // prepare for rotation
            ctx.rotate(rot); // rotation
            ctx.translate(-size[0] / 2, -size[1] / 2); // restore after rotation

            var stickerId = domData(layerEl, 'sticker-id');
            var stickerImg = _getStickerImageCached(stickerId, _getStickerImageBestSize(size));

            ctx.drawImage(stickerImg, 0, 0, size[0], size[1]);

            ctx.restore();
        });

        // render drawings
        _renderDrawings(ctx, sizeCoeff);

        // render text
        each(_els.textLayers.children, function() {
            var layerEl = this;

            ctx.save();

            var size = _getSize(layerEl);
            size[0] *= sizeCoeff;
            size[1] *= sizeCoeff;

            var pos = _getXY(layerEl, true);
            pos[0] *= sizeCoeff;
            pos[1] *= sizeCoeff;

            var rot = layerEl.style.transform ? (parseFloat(layerEl.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180) : 0;

            ctx.translate(size[0] / 2, 0); // compensate center align
            ctx.translate(pos[0], pos[1]); // set position
            ctx.translate(0, size[1] / 2); // prepare for rotation
            ctx.rotate(rot); // rotation
            ctx.translate(0, -size[1] / 2); // restore after rotation

            var innerTextEl = _getTextLayerInner(layerEl);
            var lines = replaceEntities(innerTextEl.innerHTML.replace(/<br>/g, '\n')).split('\n');
            var fontSize = parseInt(innerTextEl.style.fontSize) * sizeCoeff;
            var fontFamily = innerTextEl.style.fontFamily;

            var isImpact = fontFamily.toLowerCase().indexOf('impact') >= 0;
            var isLobster = fontFamily.toLowerCase().indexOf('lobster') >= 0;

            ctx.textBaseline = 'top';
            ctx.fillStyle = innerTextEl.style.color;
            ctx.font = fontSize + 'px ' + fontFamily;
            ctx.textAlign = 'center';

            if (isImpact) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.lineJoin = 'round';
            }

            if (isLobster) {
                ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
            }

            for (var i = 0; i < lines.length; i++) {
                if (isImpact) {
                    ctx.strokeText(lines[i], 0, i * fontSize - yoffset);
                }

                ctx.fillText(lines[i], 0, i * fontSize - yoffset);
            }

            ctx.restore();
        });

        // save image
        cnv.toBlob(cb, 'image/jpeg', 1);
    }

    function attemptHide(hideCallback) {
        if (hasClass(_saveButton, 'button_disabled')) {
            _closeEditor();
            return hideCallback();
        }

        var box = showFastBox({
                title: getLang('photos_pe_are_you_sure_close_title'),
                bodyStyle: 'padding: 20px; line-height: 160%;',
                dark: 1,
                forceNoBtn: 1
            },
            getLang('photos_pe_are_you_sure_close_text'),
            getLang('box_yes'),
            function() {
                _closeEditor();
                box.hide();
                hideCallback();
            },
            getLang('box_no')
        );
    }

    exports.SPE = {
        init: init,
        openTab: openTab,
        onKeyPress: onKeyPress,
        addTextLayer: addTextLayer,
        save: save,
        closeEditor: _closeEditor,
        restoreOriginal: restoreOriginal,
        selectStickerPack: _selectStickerPack,
        attemptHide: attemptHide,
        deleteSelected: removeSelectedLayer
    };

})(window);

try {
    stManager.done('spe.js');
} catch (e) {}