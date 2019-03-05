var FiltersPE = {

    updateActionButtonsEnabled: function() {
        var actionButtons = geByClass('pe_action');
        each(actionButtons, function(i, button) {
            var enabled = false;
            switch (button.getAttribute('id')) {
                case 'pe_text':
                    var text = cur.pe.getText();
                    if (text)
                        enabled = !!text.text;
                    break;
                case 'pe_crop':
                    var crop = cur.pe.getLastCrop();
                    enabled = crop.l + crop.t + crop.r + crop.b > 0;
                    break;
                case 'pe_blur':
                    var blur = cur.pe.getBlur();
                    if (blur)
                        enabled = blur.size > 0;
                    break;
                case 'pe_rotate':
                    enabled = cur.pe.getRotation() > 0;
                    break;
                case 'pe_auto':
                    enabled = cur.pe.isAuto();
                    break;
            }
            toggleClass(button, 'enabled', enabled);
        });
    },

    updateUndo: function() {
        var settings = FiltersPE.toStr();

        if (FiltersPE.initialSettings !== undefined && settings !== FiltersPE.initialSettings) {
            addClass('pe_undo', 'enabled');
            FiltersPE.showQuitConfirm = true;
        } else {
            removeClass('pe_undo', 'enabled');
            FiltersPE.showQuitConfirm = false;
        }
        FiltersPE.updateActionButtonsEnabled();
    },

    onUndo: function() {
        FiltersPE.fromStr(FiltersPE.initialSettings);
        FiltersPE.updateUndo();
    },

    onActionRotate: function(event, ref) {
        if (cur.filterParams.disableCrop) {
            return;
        }

        cur.pe.rotate();
        FiltersPE.updateActionButtonsEnabled();
        FiltersPE.updateUndo();
    },

    onActionAuto: function(event, ref) {
        cur.pe.applyAuto();
        FiltersPE.updateActionButtonsEnabled();
        FiltersPE.updateUndo();
    },

    hideCropArea: function(immideate) {
        var cropAreaEl = geByClass1('pe_crop_area');
        if (!cropAreaEl) return false;

        if (immideate) {
            re(cropAreaEl);
        } else {
            removeClass(cropAreaEl, 'visible');
            setTimeout(re.pbind(cropAreaEl), 300);
        }

        return true;
    },

    applyCrop: function(dontConvert) {
        var crop = cur._peCrop;
        if (!dontConvert) {
            var size = cur.pe.getSize();
            crop.l = crop.l / size[0];
            crop.r = crop.r / size[0];
            crop.t = crop.t / size[1];
            crop.b = crop.b / size[1];
        }
        cur.pe.crop(crop.l, crop.r, crop.t, crop.b, false, true);

        FiltersPE.hideCropArea(true);

        FiltersPE.updateActionButtonsEnabled();
        FiltersPE.updateUndo();
    },

    resetCrop: function() {
        cur.pe.crop(0, 0, 0, 0);
        FiltersPE.hideCropArea();
        FiltersPE.updateActionButtonsEnabled();
        FiltersPE.updateUndo();
    },

    onActionCrop: function(event, ref) {
        if (FiltersPE.hideCropArea()) {
            if (cur._minCropSet) {
                FiltersPE.resetCrop();
            } else {
                FiltersPE.applyCrop();
            }
            FiltersPE.updateActionButtonsEnabled();
            return;
        }

        cur.pe.resetCrop();

        var canvasWrapEl = geByClass1('pe_canvas_wrap');

        cropAreaEl = '<div class="pe_crop_area">';
        each('top left bottom right top_left top_right bottom_left bottom_right'.split(' '), function(i, side) {
            cropAreaEl += '<div class="pe_side_handle" id="pe_crop_side_handle_' + side + '"></div>'
        });
        cropAreaEl += '<div class="pe_crop_apply_wrap"><div class="pe_crop_apply_button" id="crop_apply" onclick="FiltersPE.applyCrop()"></div><div class="pe_crop_apply_button" id="crop_reset" onclick="FiltersPE.resetCrop()"></div></div>';
        cropAreaEl += '</div>';
        cropAreaEl = se(cropAreaEl);

        canvasWrapEl.appendChild(cropAreaEl);

        var cnvSize = getSize('pe_main');
        setStyle(cropAreaEl, {
            width: cnvSize[0],
            height: cnvSize[1]
        });

        var crop = cur.pe.getLastCrop();
        if (crop.l + crop.r + crop.b + crop.t == 0) {
            crop.l = crop.r = crop.b = crop.t = 0.05;
            cur._minCropSet = true;
        } else {
            cur._minCropSet = false;
        }
        var cnvSize = cur.pe.getSize();
        cur._peCrop = {
            l: crop.l * cnvSize[0],
            t: crop.t * cnvSize[1],
            r: crop.r * cnvSize[0],
            b: crop.b * cnvSize[1],
        }

        var cropApplyWrap = geByClass1('pe_crop_apply_wrap', canvasWrapEl);

        each('Top Left Right Bottom'.split(' '), function(i, side) {
            var bname = 'border' + side + 'Width';
            setStyle(cropAreaEl, {
                bname: cur._peCrop[side.toLowerCase()[0]]
            });
        });

        function updateCropArea() {
            setStyle(cropAreaEl, {
                borderLeftWidth: cur._peCrop.l
            });
            setStyle(cropAreaEl, {
                borderRightWidth: cur._peCrop.r
            });
            setStyle(cropAreaEl, {
                borderTopWidth: cur._peCrop.t
            });
            setStyle(cropAreaEl, {
                borderBottomWidth: cur._peCrop.b
            });
            updateHandlers();
        }

        function updateCrop() {
            cur._peCrop.h = cur._peCrop.r - cur._peCrop.l + 1;
            cur._peCrop.w = cur._peCrop.b - cur._peCrop.t + 1;
        }

        function updateHandlers() {
            each('top left bottom right top_left top_right bottom_left bottom_right'.split(' '), function(i, side) {
                var handle = ge('pe_crop_side_handle_' + side);
                var marginBottom = parseInt(getStyle(handle, 'marginBottom'));
                setStyle(handle, {
                    marginBottom: (marginBottom + Math.random() * 0.1)
                });
            });
            setStyle(cropApplyWrap, {
                marginBottom: Math.random() * 0.1
            });
        }

        var currSide, currHandle;

        function onMouseUp(event) {
            removeEvent(window, 'mousemove', onMouseMove);
            removeEvent(window, 'mouseup', onMouseUp);
            removeClass(cropAreaEl, 'no_actions');
            cancelEvent(event);
            return false;
        }

        function onMouseMove(event) {
            var sides = currSide.split('_');
            var cnvPos = getXY(canvasWrapEl);

            each(currSide.split('_'), function(i, side) {
                switch (side) {
                    case 'top':
                        var top = Math.max(event.pageY, cnvPos[1]);
                        top = Math.min(top, cnvPos[1] + cnvSize[1]);
                        top = Math.min(top, cnvPos[1] + cnvSize[1] - cur._peCrop.b - 100);

                        setStyle(cropAreaEl, {
                            borderTopWidth: top - cnvPos[1]
                        });
                        cur._peCrop.t = top - cnvPos[1];
                        break;
                    case 'left':
                        var left = Math.max(event.pageX, cnvPos[0]);
                        left = Math.min(left, cnvPos[0] + cnvSize[0]);
                        left = Math.min(left, cnvPos[0] + cnvSize[0] - cur._peCrop.r - 100);

                        setStyle(cropAreaEl, {
                            borderLeftWidth: left - cnvPos[0]
                        });
                        cur._peCrop.l = left - cnvPos[0];
                        break;
                    case 'right':
                        var left = Math.max(event.pageX, cnvPos[0]);
                        left = Math.min(left, cnvPos[0] + cnvSize[0]);
                        left = Math.max(left, cnvPos[0] + cur._peCrop.l + 100);

                        setStyle(cropAreaEl, {
                            borderRightWidth: left - cnvPos[0] - cnvSize[0]
                        });
                        cur._peCrop.r = cnvSize[0] - (left - cnvPos[0]);
                        break;
                    case 'bottom':
                        var top = Math.max(event.pageY, cnvPos[1]);
                        top = Math.min(top, cnvPos[1] + cnvSize[1]);
                        top = Math.max(top, cnvPos[1] + cur._peCrop.t + 100);

                        setStyle(cropAreaEl, {
                            borderBottomWidth: top - cnvPos[1] - cnvSize[1]
                        });
                        cur._peCrop.b = cnvSize[1] - (top - cnvPos[1]);
                        break;
                }
            });

            updateCrop();
            updateHandlers();

            cancelEvent(event);
            return false;
        }

        each('top left bottom right top_left top_right bottom_left bottom_right'.split(' '), function(i, side) {
            var handle = ge('pe_crop_side_handle_' + side);

            addEvent(handle, 'mousedown', function(event) {
                currHandle = event.target;
                currSide = currHandle.getAttribute('id').split('_').slice(4).join('_');

                addEvent(window, 'mousemove', onMouseMove);
                addEvent(window, 'mouseup', onMouseUp);

                addClass(cropAreaEl, 'no_actions');

                cancelEvent(event);
                return false;
            });
        });

        var orX, orY, cropLeftOrig, cropRightOrig, cropTopOrig, cropBottomOrig;

        function onCropAreaMousedown(event) {
            orX = event.pageX;
            orY = event.pageY;
            cropLeftOrig = cur._peCrop.l;
            cropRightOrig = cur._peCrop.r;
            cropTopOrig = cur._peCrop.t;
            cropBottomOrig = cur._peCrop.b;
            addEvent(window, 'mousemove', onCropAreaMove);
            addEvent(window, 'mouseup', onCropAreaMouseup);

            addClass(cropAreaEl, 'active');
            addClass(cropAreaEl, 'no_actions');
        }

        function onCropAreaMouseup(event) {
            removeEvent(window, 'mousemove', onCropAreaMove);
            removeEvent(window, 'mouseup', onCropAreaMouseup);
            removeClass(cropAreaEl, 'active');
            removeClass(cropAreaEl, 'no_actions');
        }

        function onCropAreaMove(event) {
            var l = cropLeftOrig + event.pageX - orX;
            l = Math.max(0, l);
            l = Math.min(l, cnvSize[0] - cur._peCrop.r - 100);
            var r = cropRightOrig - event.pageX + orX;
            r = Math.max(0, r);
            r = Math.min(r, cnvSize[0] - cur._peCrop.l - 100);

            var t = cropTopOrig + event.pageY - orY;
            t = Math.max(0, t);
            t = Math.min(t, cnvSize[1] - cur._peCrop.b - 100);
            var b = cropBottomOrig - event.pageY + orY;
            b = Math.max(0, b);
            b = Math.min(b, cnvSize[1] - cur._peCrop.t - 100);

            cur._peCrop.r = r;
            cur._peCrop.l = l;
            cur._peCrop.t = t;
            cur._peCrop.b = b;

            updateCrop();
            updateCropArea();

            cancelEvent(event);
            return false;
        }

        addEvent(cropAreaEl, 'mousedown', onCropAreaMousedown);
        updateCropArea();

        addClass(cropAreaEl, 'visible'); // no cssAnim, because it adds ALL transition
    },

    _hideActionBar: function(event, id) {
        FiltersPE.actionBars = FiltersPE.actionBars || {};

        if (!Object.keys(FiltersPE.actionBars).length) return false;

        if (event && event.target) {
            var tg = event.target,
                count = 10;
            while (tg && count--) {
                if (hasClass(tg, 'pe_action_bar')) {
                    return;
                }
                tg = tg.parentNode;
            }
        }

        var actionBarId, needClose = true;
        each(FiltersPE.actionBars, function(elid, el) {
            actionBarId = elid;

            if (actionBarId == 'blur' && event && event.target.getAttribute('id') == 'pe_main') {
                return needClose = false;
            }

            cssAnim(el, {
                marginLeft: -5,
                opacity: 0
            }, {
                duration: 100
            }, function() {
                re(el);
                delete FiltersPE.actionBars[elid];
            });
        });

        if (needClose) {
            removeEvent(window, 'click', FiltersPE._hideActionBar);
            removeClass(geByClass1('pe_actions'), 'active');

            if (actionBarId == 'blur') {
                var canvasWrap = geByClass1('pe_canvas_wrap');
                removeClass(canvasWrap, 'blur_pos');
                removeEvent(canvasWrap, 'click');
            }
        }

        FiltersPE.updateActionButtonsEnabled();

        return actionBarId == id;
    },

    onActionBlur: function(event, ref) {
        if (FiltersPE._hideActionBar(null, 'blur')) {
            return;
        }

        var actionBarEl = FiltersPE.actionBars['blur'] = se('<div class="pe_blur_input pe_action_bar" id="blur"> <div class="pe_blur_slider"></div> <div class="pe_blurtype_changer" onmouseover="showTooltip(this, {text: \'' + cur.lang.photos_pe_change_blur_type + '\', shift: [11,4,4], showdt: 0, black: 1, showsp: 110});"></div> </div>');

        var parent = geByClass1('pe_wrap');
        parent.parentNode.insertBefore(actionBarEl, parent.nextSibling);

        var boxPos = getXY(curBox().bodyNode);

        var pos = getXY(ref);
        var size = getSize(ref);
        setStyle(actionBarEl, {
            left: pos[0] - boxPos[0] + size[0] + 10,
            top: pos[1] - boxPos[1]
        });

        addClass(geByClass1('pe_actions'), 'active');
        cssAnim(actionBarEl, {
            marginLeft: 0,
            opacity: 0.9
        }, {
            duration: 200
        });

        var blur = cur.pe.getBlur();
        if (blur === undefined) {
            cur.pe.setBlur(.5, [.5, .5], 1);
            blur = cur.pe.getBlur();
        }

        new Slider(geByClass1('pe_blur_slider', actionBarEl), {
            width: 100,
            size: 1,
            debounce: 10,
            value: blur.size || 0.5,
            onChange: function(value) {
                var blur = cur.pe.getBlur();
                if (blur) {
                    cur.pe.setBlur(value, blur.position, blur.type);
                }
                FiltersPE.updateActionButtonsEnabled();
                FiltersPE.updateUndo();
            }
        });

        var _this = this;
        addEvent(window, 'click', function(event) {
            if (event.target.id == 'pe_main') {
                return;
            }
            var n = event.target;
            for (var i = 0; i < 10 && n; i++) {
                if (hasClass(n, 'pe_action_bar')) {
                    return;
                }
                n = n.parentNode;
            }
            removeEvent(window, 'mousemove', _this.onMouseMoveBlur);
            removeEvent(window, 'mouseup', _this.onMouseUpBlur);
            removeEvent(canvasWrap, 'mousedown', this.onMouseDownBlur);
            FiltersPE._hideActionBar();
        });

        var typeChoser = geByClass1('pe_blurtype_changer', actionBarEl);
        addEvent(typeChoser, 'click', function() {
            var hc = toggleClass(typeChoser, 'linear');
            var blur = cur.pe.getBlur();
            cur.pe.setBlur(blur.size, blur.position, hc ? 2 : 1);
        });

        toggleClass(typeChoser, 'linear', blur.type == 2);

        var canvasWrap = geByClass1('pe_canvas_wrap');
        var canvasWrapPos = getXY(canvasWrap);
        var canvasWrapSize = getSize(canvasWrap);
        addClass(canvasWrap, 'blur_pos');

        this.onMouseMoveBlur = function(event) {
            var canvasWrapPos = getXY(canvasWrap);
            var canvasWrapSize = getSize(canvasWrap);
            var pos = [
                (event.pageX - canvasWrapPos[0]) / canvasWrapSize[0],
                (event.pageY - canvasWrapPos[1]) / canvasWrapSize[1],
            ];
            pos[0] = Math.max(0.0, Math.min(pos[0], 1.0));
            pos[1] = Math.max(0.0, Math.min(pos[1], 1.0));
            var blur = cur.pe.getBlur();
            cur.pe.setBlur(blur.size, pos, blur.type);

            cancelEvent(event);
        }
        this.onMouseUpBlur = function(event) {
            removeEvent(window, 'mousemove', _this.onMouseMoveBlur);
            removeEvent(window, 'mouseup', _this.onMouseUpBlur);
            cancelEvent(event);
        }
        this.onMouseDownBlur = function() {
            addEvent(window, 'mousemove', _this.onMouseMoveBlur);
            addEvent(window, 'mouseup', _this.onMouseUpBlur);
        }
        addEvent(canvasWrap, 'mousedown', this.onMouseDownBlur);

        cancelEvent(event);
        return false;
    },

    onActionText: function(event, ref) {
        if (FiltersPE._hideActionBar(null, 'text')) {
            return;
        }

        var actionBarEl = FiltersPE.actionBars['text'] = se('<div class="pe_text_input pe_action_bar" id="text"><textarea></textarea> <div class="pe_text_font_changer" onmouseover="showTooltip(this, {text: \'' + cur.lang.photos_pe_change_font + '\', shift: [11,4,4], showdt: 0, black: 1, showsp: 110});"></div> </div>');
        var parent = geByClass1('pe_wrap');
        parent.parentNode.insertBefore(actionBarEl, parent.nextSibling);

        var boxPos = getXY(curBox().bodyNode);

        var pos = getXY(ref);
        var size = getSize(ref);
        setStyle(actionBarEl, {
            left: pos[0] - boxPos[0] + size[0] + 11,
            top: pos[1] - boxPos[1] - 2
        });

        var textarea = geByTag1('textarea', actionBarEl);
        var fontChoser = geByClass1('pe_text_font_changer', actionBarEl);

        var curText = cur.pe.getText();
        val(textarea, curText.text);
        toggleClass(fontChoser, 'impact', curText.font == 0);

        function updateTextareaHeight() {
            var text = val(textarea);
            var testEl = ce('div', {
                className: 'pe_text_input_tester',
                innerHTML: clean(text).split(/\r\n|\r|\n/).join('<br>') + '&nbsp;'
            });
            document.body.appendChild(testEl);
            setStyle(textarea, {
                height: testEl.offsetHeight
            });
            re(testEl);
        }
        updateTextareaHeight();

        addEvent(textarea, 'keydown input', function(event) {
            if (event.keyCode == 27) {
                cur.pe.setText(curText.text, curText.font);
                FiltersPE._hideActionBar(null, 'text');
                cancelEvent(event);
                return false;
            }
            updateTextareaHeight();
            var text = cur.pe.setText(val(textarea), hasClass(fontChoser, 'impact') ? 0 : 1);
            val(textarea, text);
            FiltersPE.updateActionButtonsEnabled();
            FiltersPE.updateUndo();
        });

        addEvent(window, 'click', FiltersPE._hideActionBar);

        addClass(geByClass1('pe_actions'), 'active');
        cssAnim(actionBarEl, {
            marginLeft: 0,
            opacity: 0.9
        }, {
            duration: 200
        });
        textarea.select();

        addEvent(fontChoser, 'click', function() {
            var hc = toggleClass(fontChoser, 'impact');
            cur.pe.setText(val(textarea), hc ? 0 : 1);
        });

        cancelEvent(event);
        return false;
    },

    _selectTab: function(tabChoser) {
        tabChoser = ge(tabChoser);
        if (!hasClass(tabChoser, 'selected')) {
            var selectors = geByClass1('pe_type_chooser');

            var others = selectors.children;
            for (var i = 0; i < others.length; i++) {
                removeClass(others[i], 'selected');
                hide(others[i].id + '_tab');
            }
            addClass(tabChoser, 'selected');

            show(tabChoser.id + '_tab');
        }
        this._initPE();
    },
    switchToFilters: function() {
        cur.pe.setFadeImage();

        this._selectTab(ge('pe_type_filters'));
        cur.pe.applyFilter();

        cur.pe.removeFadeImage();
        FiltersPE.updateUndo();
    },
    switchToParameters: function() {
        cur.pe.setFadeImage();

        this._selectTab('pe_type_parameters');
        this._initParameters();
        cur.pe.applyParameters();

        cur.pe.removeFadeImage();
        FiltersPE.updateUndo();
    },

    _initPE: function(vars, customOpts, callback) {
        if (!cur.pe) {
            var loader = ge('pe_loader');
            var h = customOpts.pe_height;
            var w = customOpts.pe_width;
            if (w > h) { // FIXME: code duplicate with pe.js
                w = Math.min(w, 700);
                h = Math.round((customOpts.pe_height / customOpts.pe_width) * w);
            } else {
                h = Math.min(h, 700);
            }

            setStyle(loader, {
                height: h
            });

            cur.pe = new PhotoEdit(geByClass1('pe_canvas_wrap'), vars.src_pe, vars.src_pe_big, {}, callback, function() {
                var peCanvasWrap = geByClass1('pe_canvas_wrap');
                var peCanvas = geByTag1('canvas', peCanvasWrap);
                if (peCanvas && peCanvas.offsetHeight) {
                    setStyle(peCanvasWrap, 'marginTop', Math.round(peCanvasWrap.offsetHeight / 2 - peCanvas.offsetHeight / 2));
                }
            });

            addEvent(window, 'keydown', FiltersPE.onEditorKeypress);
        }
    },

    onEditorKeypress: function(event) {
        if (event.metaKey || event.ctrlKey || event.target.nodeName.toLowerCase() == 'textarea') {
            return;
        }
        switch (event.which) {
            case 82:
                FiltersPE.onActionRotate();
                break;
            case 65:
                FiltersPE.onActionAuto();
                break;
        }
    },

    init: function(opts, vars, filterSaveOptions, filterParams, customOpts, photo, hash, desc) {
        cur.filterApplied = null;

        if (cur.pe) {
            cur.pe.clean();
            delete cur.pe;
            cur.pe = null;
        }

        cur.filterHash = hash;
        cur.filterPhoto = photo;
        cur.filterSaveOptions = filterSaveOptions;
        cur.filterParams = filterParams;
        cur.peDesc = desc.replace(/<br>/g, '\n');

        var whiteFade = ce('div', {
            className: 'pe_white_fade'
        });
        var parentEl = geByClass1('pe_canvas_wrap');
        parentEl.appendChild(whiteFade);

        FiltersPE._initPE(vars, customOpts, function() {
            FiltersPE.fromStr(filterParams.settings);
            hide('pe_loader');
            cur.pe.show();

            var actionsEl = geByClass1('pe_actions');

            if (filterParams.disableCrop) {
                re('pe_rotate');
                re('pe_crop');
            }

            if (customOpts.pe_height < 110 || customOpts.pe_width < 110) {
                re('pe_crop');
            }

            cssAnim(actionsEl, {
                opacity: 1.0
            }, {
                duration: 200
            });

            var tabs = ge('pe_tabs_panel');
            show(tabs);
            cssAnim(tabs, {
                opacity: 1.0
            }, {
                duration: 200
            });

            var buttons = geByClass1('pe_filter_buttons');
            show(buttons);
            cssAnim(buttons, {
                opacity: 1.0
            }, {
                duration: 200
            });

            cssAnim(whiteFade, {
                opacity: 0
            }, {
                duration: 200
            }, function() {
                re(whiteFade);
                whiteFade = null;
            });
        });
    },

    clear: function() {
        FiltersPE.showQuitConfirm = false;
        delete FiltersPE.initialSettings;
        this._parametersInited = false;
        cur.filterApplied = undefined;
        cur.pe.clean();

        if (FiltersPE.actionBars) {
            each(FiltersPE.actionBars, function(elid, el) {
                re(el);
            });
            FiltersPE.actionBars = null;
        }
        removeEvent(window, 'keydown', FiltersPE.onEditorKeypress);
    },

    _initParameters: function() {
        if (this._parametersInited) {
            return;
        }
        this._parametersInited = true;

        var sliders = geByClass('pe_params_slider');
        each(sliders, function(i, sliderEl) {
            new Slider(sliderEl, {
                width: 200,
                debounce: 10,
                size: 2,
                value: sliderEl.getAttribute('data-default') || 0,
                onChange: function(value) {
                    var name = sliderEl.getAttribute('id').split('_')[2];
                    name = name[0].toUpperCase() + name.substr(1);
                    cur.pe['set' + name](value);
                    FiltersPE.updateUndo();
                },
                formatHint: function(value) {
                    return Math.round(value * 100) + '%';
                }
            });
        });
    },

    fromStr: function(str) {
        if (str == 'f//////') {
            str = '';
        }

        cur.pe.restoreAll();
        var params = str.split('/');

        switch (params.shift()) {
            case 'f':
                var filter = params.shift().split(',');
                cur.FiltersPEAmount = parseInt(filter[1]) / 100 || 0;
                FiltersPE.switchToFilters();
                FiltersPE.applyFilter(filter[0] || 'original');
                break;
            case 'p':
                var filter = params.shift().split(',');
                FiltersPE.switchToParameters();

                cur.pe.disableParametersUpdate(true);
                each('exposure contrast saturation vignette sharpness sepia'.split(' '), function(i, name) {
                    var slider = data(ge('pe_param_' + name), 'slider');
                    slider.setValue(parseInt(filter[i]) / 100);
                });
                cur.pe.disableParametersUpdate(false);
                cur.pe.updateTexture();
                break;
            default:
                FiltersPE.switchToFilters();
                FiltersPE.applyFilter('original');
                FiltersPE.initialSettings = str;
                return;
        }

        var auto = parseInt(params.shift());

        var rotation = parseInt(params.shift());
        for (var i = 0; i < rotation; i++) {
            cur.pe.rotate();
        }

        var blur = params.shift();
        if (blur) {
            blur = blur.split(',');
            var blurAmount = parseFloat(blur[0]) / 100;
            var blurType = parseInt(blur[1]);
            var blurPos = [parseFloat(blur[2]) / 100, parseFloat(blur[3]) / 100];
            cur.pe.setBlur(blurAmount, blurPos, blurType);
        }

        var crop = params.shift();
        if (crop) {
            crop = crop.split(',');
            cur._peCrop = {
                t: parseFloat(crop[0]) / 100,
                l: parseFloat(crop[1]) / 100,
                r: parseFloat(crop[2]) / 100,
                b: parseFloat(crop[3]) / 100
            };
            FiltersPE.applyCrop(true);
        }

        cur.pe.applyAuto(auto);

        var text = params.shift();
        if (text) {
            text = text.split(',');
            var font = text[text.length - 1];
            text = text.slice(0, -1).join(',');
            text = replaceEntities(text);
            cur.pe.setText(text, font);
        }

        FiltersPE.updateActionButtonsEnabled();
        FiltersPE.initialSettings = str;
    },

    toStr: function() {
        // type/(filter,amount)|()|(e,c,s,v,s,s)/isauto/rotation/blurAmount,blurType,bposX,bpoxY/ct,cl,cr,cb/texttype,text

        var str = '';

        switch (cur.pe.getMode()) {
            case 'filter':
                str += 'f/';
                var filter = cur.pe.getCurrentFilter();
                if (filter.name != 'original' && filter.name) {
                    str += filter.name + ',' + intval(filter.amount * 100);
                }
                break;
            case 'params':
                str += 'p/';
                var params = [];
                params.push(intval(100 * cur.pe.getExposure()));
                params.push(intval(100 * cur.pe.getContrast()));
                params.push(intval(100 * cur.pe.getSaturation()));
                params.push(intval(100 * cur.pe.getVignette()));
                params.push(intval(100 * cur.pe.getSharpness()));
                params.push(intval(100 * cur.pe.getSepia()));
                str += params.join(',');
                break;
        }
        str += '/';

        str += (cur.pe.isAuto() ? 1 : '') + '/';

        var rotation = cur.pe.getRotation();
        str += rotation ? rotation : '';
        str += '/';

        var blur = cur.pe.getBlur();
        if (blur && blur.size > 0) {
            str += intval(100 * blur.size) + ',' + intval(blur.type || 1) + ',' + intval(blur.position[0] * 100) + ',' + intval(blur.position[1] * 100);
        }
        str += '/';

        var crop = cur.pe.getLastCrop();
        if (crop && (crop.l + crop.r + crop.b + crop.t)) {
            str += Math.round(crop.t * 100) + ',' + Math.round(crop.l * 100) + ',' + Math.round(crop.r * 100) + ',' + Math.round(crop.b * 100);
        }
        str += '/';

        var text = cur.pe.getText();
        if (text && text.text) {
            str += text.text.replace(/\//g, '&#47;') + ',' + intval(text.font);
        }

        if (str.match(/^\/*$/)) {
            str = '';
        }

        if (str == 'f//////') {
            str = '';
        }

        return str;
    },

    applyFilter: function(name) {
        var thumb = ge('pe_filter_' + name);

        var currentFilter = cur.pe.getCurrentFilter();
        cur.FiltersPEAmount = cur.FiltersPEAmount === undefined ? 0.75 : cur.FiltersPEAmount;

        if (name != currentFilter.name) {
            var selectedEl = geByClass1('pe_filter_selected', thumb.parentElement);
            removeClass(selectedEl, 'pe_filter_selected');
            re(geByClass1('pe_filter_amount_slider', selectedEl));

            addClass(thumb, 'pe_filter_selected');

            var nameEl = geByClass1('pe_thumb_filter_name', thumb);
            re(nameEl);

            if (name != 'original') {
                var amountSliderEl = se('<div class="pe_filter_amount_slider"> <div class="slider"></div> </div>');
                thumb.appendChild(amountSliderEl);

                new Slider(geByClass1('slider', amountSliderEl), {
                    width: 68,
                    size: 1,
                    debounce: 5,
                    value: 0.75,
                    color: '#ffffff',
                    backColor: '#3D3D3D',
                    value: cur.FiltersPEAmount || 0.75,
                    fireChangeEventOnInit: true,
                    onChange: function(value) {
                        cur.FiltersPEAmount = value;
                        cur.pe.applyFilter(name, value);
                        FiltersPE.updateUndo();
                    }
                });
            } else {
                cur.pe.applyFilter(name, cur.FiltersPEAmount);
                FiltersPE.updateUndo();
            }
        }
    },

    savePhotoFilter: function(obj) {
        obj = obj || ge('pe_filter_save');
        addClass('pe_pointer_events_wrap', 'pe_pointer_events_wrap');
        lockButton(obj);
        cur.pe.save();
    },

    changeThumbs: function(thumb, sizes) {
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
                        if (p[j].type == 'photo' && p[j].photo.id == 'photo' + cur.filterPhoto) {
                            p[j].photo.sizes = sizes;
                            found = true;
                        }
                    }
                    if (found) ThumbsEdit.refresh(i);
                }
            }
        }
    },

    save: function(info) {
        FiltersPE.showQuitConfirm = false;

        var query = {
            act: 'save_desc',
            photo: cur.filterPhoto,
            hash: cur.filterHash,
            filter_num: cur.filterApplied,
            conf: FiltersPE.toStr(),
            text: cur.peDesc,
            auto_tries: cur._autoCorrectiontOnceTried,
        };
        if (info) {
            if (info.hash) {
                extend(query, {
                    filter_hash: info['hash'],
                    filter_aid: info['aid'],
                    filter_server: info['server'],
                    filter_photo: info['photos_list']
                });
            } else {
                query._query = info;
            }
        }

        ajax.post('al_photos.php', query, {
            onDone: function(text, album, photoObj, thumb, sizes) {
                if (cur.webcamPhotoMedia) {
                    if (thumb && sizes) {
                        cur.uploadPhotoData.editable.sizes = sizes;
                        cur.uploadPhotoData.thumb_m = cur.uploadPhotoData.thumb_s = thumb;
                    }
                    photos.onFiltersSave();
                    var box = curBox();
                    if (box) {
                        box.hide();
                    }
                    return;
                }

                if (cur.onPESave) {
                    cur.onPESave(thumb, sizes);
                }

                if (cur.pvListId) {
                    var listId = cur.pvListId,
                        index = cur.pvIndex;
                    var listRow = cur.pvData[listId];
                    if (!listRow) {
                        return nav.reload();
                    }
                    var ph = listRow[index];
                    unlockButton(ge('pe_filter_save'));
                    var box = curBox();
                    if (box) {
                        box.hide();
                    }

                    ph.desc = text;
                    if (album) ph.album = album;
                    if (listId.substr(0, 5) == 'album') {
                        var listAid = intval(listId.split('_')[1]);
                        ph.moved = (query.aid != listAid);
                    }

                    ph.pe_type = Photoview.PE_V2;

                    var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
                    if (photoObj && thumb) {
                        FiltersPE.changeThumbs(thumb, sizes);
                        delete ph.x_;
                        delete ph.x_src;
                        delete ph.y_;
                        delete ph.y_src;
                        delete ph.z_;
                        delete ph.z_src;
                        extend(ph, photoObj);
                    }
                    if (shown) {
                        var d = domFC(cur.pvDesc);
                        val(d, text || ('<span class="pe_desc_edit">' + getLang('photos_edit_desc') + '</span>'));
                        if (d)
                            d.onmouseover = text ? Photoview.descTT.pbind(d) : function() {};
                        if (album && ge('pe_album')) ge('pe_album').innerHTML = album;

                        cur.pvCurData = Photoview.genData(ph, vk.pvbig ? (cur.pvVeryBig ? (cur.pvVeryBig > 1 ? 'z' : 'z') : 'y') : 'x');
                        domFC(cur.pvPhoto).src = Photoview.blank;

                        setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0);
                    }
                }
            }
        });
    },

    restoreOriginal: function(obj, oid, pid, hash) {
        FiltersPE.showQuitConfirm = false;
        ajax.post('al_photos.php', {
            act: 'restore_original',
            oid: oid,
            pid: pid,
            hash: hash
        }, {
            onDone: function(photoObj, thumb, sizes) {
                if (cur.onPESave) {
                    cur.onPESave(thumb, sizes);
                }
                if (cur.pvData) {
                    var listId = cur.pvListId,
                        index = cur.pvIndex,
                        ph = cur.pvData[listId][index];
                    var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
                    extend(ph, photoObj);

                    if (ph.pe_type) {
                        ph.pe_type = Photoview.PE_V1 | Photoview.PE_V2 | Photoview.PE_V3;
                    }

                    var box = curBox();
                    if (box) {
                        box.hide();
                    }
                    FiltersPE.changeThumbs(thumb, sizes);
                    if (shown) {
                        cur.pvCurData = Photoview.genData(ph, vk.pvbig ? (cur.pvVeryBig ? (cur.pvVeryBig > 1 ? 'z' : 'z') : 'y') : 'x');
                        cur.pvPhoto.firstChild.src = cur.pvCurData.src;

                        setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0);
                    }
                }
            },
            loader: 1
        });
    },

    hideName: function(thumb) {
        var nameEl = geByClass1('pe_thumb_filter_name', thumb);
        cssAnim(nameEl, {
            opacity: 0
        }, {
            duration: 200
        }, function() {
            re(nameEl);
        });
    },

    showName: function(thumb, name) {
        var currentFilter = cur.pe.getCurrentFilter();
        if (currentFilter.name == name.toLowerCase()) {
            return;
        }

        var thumbSize = getSize(thumb);

        var nameEl = geByClass1('pe_thumb_filter_name', thumb);
        nameEl && re(nameEl);

        nameEl = se('<div class="pe_thumb_filter_name">' + name + '</div>');
        thumb.appendChild(nameEl);
        setStyle(nameEl, {
            width: thumbSize[0] - 12
        });
        cssAnim(nameEl, {
            opacity: 0.7
        }, {
            duration: 100
        });
    },

    onHide: function() {
        if (cur.fromWebcam && !cur.confirmBoxShown) {
            delete cur.fromWebcam;
            setTimeout(function() {
                boxQueue.hideLast()
            }); // webcam
        }

        if (!cur.confirmBoxShown) {
            delete cur.pe;
        }
    },

    onHideAttempt: function() {
        if (!FiltersPE.showQuitConfirm) {
            return true;
        }

        var settings = FiltersPE.toStr();
        if (settings == 'f//////') {
            settings = '';
        }

        if (settings !== FiltersPE.initialSettings) {
            cur.confirmBoxShown = true;
            var fastBox = showFastBox({
                title: getLang('photos_pe_onhide_title'),
                dark: 1,
                forceNoBtn: true,
                bodyStyle: 'padding: 20px; line-height: 160%;'
            }, getLang('photos_pe_onhide_text'), getLang('photos_pe_onhide_yes'), function(button) {
                FiltersPE.showQuitConfirm = cur.confirmBoxShown = false;
                boxQueue.hideLast();
                setTimeout(function() {
                    FiltersPE.savePhotoFilter();
                }, 100);
            }, getLang('photos_pe_onhide_no'), function() {
                FiltersPE.showQuitConfirm = cur.confirmBoxShown = false;
                boxQueue.hideLast();
                boxQueue.hideLast();
            });

            return false;
        }

        return true;
    },

    eof: 1
};
try {
    stManager.done('filters_pe.js');
} catch (e) {}