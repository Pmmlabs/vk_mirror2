var Graffiti = {

    brush: [20, '95, 127, 162', 0.8], // size, rgb color, opacity
    strokes: [],

    drawAreaCurWidth: 588,
    drawAreaCurHeight: 294,
    drawAreaMinWidth: 588,
    drawAreaMinHeight: 294,
    drawAreaMaxWidth: 1176,
    drawAreaMaxHeight: 588,
    historyLimit: 50,

    touch: 0,
    pixelRatio: window.devicePixelRatio || 1,
    resizeRatio: 1,
    maxResizeRatio: 2,

    brushPreviewCanvas: undefined,
    brushPreviewContext: undefined,
    colorPreviewBox: undefined,
    colorPickerCell: undefined,
    drawAreaMainCanvas: undefined,
    drawAreaMainContext: undefined,
    drawAreaStrokeCanvas: undefined,
    drawAreaStrokeContext: undefined,
    drawAreaHistoryCanvas: undefined,
    drawAreaHistoryContext: undefined,
    drawAreaWrap: undefined,
    resizer: undefined,

    init: function() {
        var box = curBox() && curBox().bodyNode;
        if (browser.mobile) {
            Graffiti.touch = 1;
        }
        Graffiti.resizer = geByClass1('_graffiti_resize', box);
        Graffiti.attachEvents();
        Graffiti.colorPickerInit();
        Graffiti.brushPreviewInit();
        Graffiti.drawAreaInit();
        Graffiti.sliderInit('thickness',
            geByClass1('_graffiti_slider_thickness_wrap', box),
            geByClass1('_graffiti_slider_thickness_thumb', box),
            25);
        Graffiti.sliderInit('opacity',
            geByClass1('_graffiti_slider_opacity_wrap', box),
            geByClass1('_graffiti_slider_opacity_thumb', box),
            80);
    },

    deInit: function() {
        Graffiti.history = [];
        Graffiti.historyGlobal = [];
        Graffiti.historyCheckpoint = null;
        Graffiti.detachEvents();
    },

    attachEvents: function() {
        addEvent(document, (Graffiti.touch ? 'touchmove' : 'mousemove'), Graffiti.eventsMouseMove);
        addEvent(document, (Graffiti.touch ? 'touchend' : 'mouseup'), Graffiti.eventsMouseUp);
        addEvent(window, 'resize', Graffiti.eventsWindowResize);
        addEvent(document, 'selectstart', Graffiti.eventsSelectStart);
        addEvent(document, 'keydown', Graffiti.eventsKeyPress);
        addEvent(Graffiti.resizer, (Graffiti.touch ? 'touchstart' : 'mousedown'), Graffiti.resizeBegin);
        addEvent(boxLayerWrap, 'scroll', Graffiti.drawAreaUpdateOffset);
    },

    detachEvents: function() {
        removeEvent(document, (Graffiti.touch ? 'touchmove' : 'mousemove'), Graffiti.eventsMouseMove);
        removeEvent(document, (Graffiti.touch ? 'touchend' : 'mouseup'), Graffiti.eventsMouseUp);
        removeEvent(window, 'resize', Graffiti.eventsWindowResize);
        removeEvent(document, 'selectstart', Graffiti.eventsSelectStart);
        removeEvent(document, 'keydown', Graffiti.eventsKeyPress);
        removeEvent(Graffiti.resizer, (Graffiti.touch ? 'touchstart' : 'mousedown'), Graffiti.resizeBegin);
        removeEvent(boxLayerWrap, 'scroll', Graffiti.drawAreaUpdateOffset);
    },

    extendTouchEvent: function(ev) {
        if (Graffiti.touch) {
            ev.pageX = ev.touches[0].pageX;
            ev.pageY = ev.touches[0].pageY;
        }
        return ev;
    },

    isChanged: function() {
        return (Graffiti.historyGlobal.length || Graffiti.historyCheckpoint) ? true : false;
    },

    eventsMouseMove: function(ev) {
        ev = Graffiti.extendTouchEvent(ev);
        Graffiti.sliderMouseMove(ev);
        Graffiti.drawAreaAdvanceStroke(ev);
        Graffiti.resize(ev);
        return cancelEvent(ev);
    },

    eventsMouseUp: function(ev) {
        Graffiti.sliderMouseUp();
        Graffiti.drawAreaFinishStroke();
        Graffiti.resizeFinish();
    },

    eventsWindowResize: function() {
        Graffiti.drawAreaUpdateOffset();
    },

    eventsSelectStart: function(ev) {
        return cancelEvent(ev);
    },

    eventsKeyPress: function(ev) {
        if (Graffiti.shortCutHandle(ev)) {
            return cancelEvent(ev);
        }
    },

    shortCutHandle: function(ev) {
        if (!ev.ctrlKey) return false;
        switch (ev.keyCode) {
            case 90: // ctrl + z
                Graffiti.historyStepBack();
                return true;
                break;
            case 69: // ctrl + e (erase)
                Graffiti.flushGraffiti();
                return true;
                break;
        }
        return false;
    },

    brushPreviewInit: function() {
        var box = curBox() && curBox().bodyNode;

        Graffiti.brushPreviewCanvas = geByClass1('_graffiti_brush_canvas', box);
        Graffiti.brushPreviewContext = Graffiti.brushPreviewCanvas.getContext('2d');
        Graffiti.brushPreviewContext.scale(2, 2);
        Graffiti.brushPreviewUpdate();
    },

    brushPreviewUpdate: function() {
        var ctx = Graffiti.brushPreviewContext;
        ctx.clearRect(0, 0, 160, 160);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = Graffiti.brush[0];
        ctx.strokeStyle = 'rgba(' + Graffiti.brush[1] + ', ' + Graffiti.brush[2] + ')';
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(40, 40.5);
        ctx.stroke();
    },

    colorPickerLastHighlight: undefined,

    colorPickerInit: function() {
        var box = curBox() && curBox().bodyNode;

        Graffiti.colorPickerCell = geByClass1('_graffiti_colorpicker_cell_active', box);
        Graffiti.colorPreviewBox = geByClass1('_graffiti_colorpreview_box', box);
        Graffiti.colorPreviewWrap = geByClass1('_graffiti_colorpreview_wrap', box);
    },

    colorPickerContent: function() {
        var html = '<div class="graffiti_colorpicker_wrap clear_fix" onclick="Graffiti.colorPickerChooseColor();">',
            colors = [];
        for (var r = 0; r < 6; r++) {
            for (var g = 0; g < 6; g++) {
                for (var b = 0; b < 6; b++) {
                    colors[r * 36 + g * 6 + b] = 'rgb(' + (r / 5 * 255) + ',' +
                        (g / 5 * 255) + ',' + (b / 5 * 255) + ')';
                }
            }
        }
        for (var j = 0; j < 12; j++) {
            html += '<div class="graffiti_colorpicker_row">';
            for (var i = 0; i < 18; i++) {
                var r = Math.floor(i / 6) + 3 * Math.floor(j / 6);
                var g = i % 6;
                var b = j % 6;
                var n = r * 36 + g * 6 + b;
                html += '<div class="graffiti_colorpicker_cell" \
                      style="background-color: ' + colors[n] + '" \
                      onmouseover="Graffiti.colorPickerHighlight(this)" \
                      ></div>';
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    },

    colorPickerShow: function(el) {
        showTooltip(el, {
            text: Graffiti.colorPickerContent(),
            className: 'graffiti_tt',
            dir: 'auto',
            slide: 15,
            hidedt: 500,
            shift: [22, 7, 7],
            hasover: true
        });
    },

    colorPickerHide: function() {
        Graffiti.colorPreviewWrap.tt && Graffiti.colorPreviewWrap.tt.hide({
            fasthide: true
        });
        hide(Graffiti.colorPickerCell);
    },

    colorPickerHighlight: function(target) {
        var cleanRGB = target.style.backgroundColor.replace(/(rgb\(|\))/g, '')
        Graffiti.colorPickerLastHighlight = cleanRGB;

        var boxPos = getXY(domPN(curBox().bodyNode)),
            hlPos = getXY(target);
        show(Graffiti.colorPickerCell);
        setStyle(Graffiti.colorPickerCell, {
            left: (hlPos[0] - boxPos[0] - 1),
            top: (hlPos[1] - boxPos[1] - 1)
        });
    },

    colorPickerChooseColor: function() {
        Graffiti.brush[1] = Graffiti.colorPickerLastHighlight;
        Graffiti.colorPreviewBox.style.backgroundColor = 'rgb(' + Graffiti.brush[1] + ')';
        Graffiti.brushPreviewUpdate();
        Graffiti.colorPickerHide();
    },

    sliders: {},

    sliderActive: {},

    sliderInit: function(id, wrapper, thumb, value) {
        Graffiti.sliders[id] = {
            id: id,
            wrapper: wrapper,
            thumb: thumb,
            value: value
        };
        var pixelPosition = (getSize(wrapper)[0] / 100 * value);
        animate(Graffiti.sliders[id].thumb, {
            paddingLeft: pixelPosition
        }, 300);
        addEvent(wrapper, 'wheel DOMMouseScroll', Graffiti.sliderWheel);
        Graffiti.sliderUpdated(id);
    },

    sliderMouseDown: function(id, ev) {
        ev = Graffiti.extendTouchEvent(ev);
        Graffiti.sliderActive = Graffiti.sliders[id];
        Graffiti.sliderMove(ev);
    },

    sliderMouseMove: function(ev) {
        if (!isEmpty(Graffiti.sliderActive)) {
            Graffiti.sliderMove(ev);
        }
    },

    sliderMouseUp: function() {
        Graffiti.sliderActive = {};
    },

    sliderHovered: {},

    sliderBeforeWheel: function(id) {
        Graffiti.sliderHovered = Graffiti.sliders[id];
    },

    sliderWheel: function(ev) {
        Graffiti.sliderMove(ev);
    },

    sliderMove: function(ev) {
        var pixelPosition;
        var slider = undefined;
        if (isEmpty(Graffiti.sliderActive)) {
            slider = Graffiti.sliderHovered;
        } else {
            slider = Graffiti.sliderActive;
        }
        var width = getSize(slider.wrapper)[0] - 5;
        if (ev.type == 'wheel' || ev.type == 'DOMMouseScroll') {
            var delta = (ev.detail < 0 || ev.wheelDelta > 0) ? 5 : -5;
            pixelPosition = (width / 100 * slider.value) + delta;
            cancelEvent(ev);
        } else {
            pixelPosition = ev.pageX - getXY(slider.wrapper)[0];
        }
        slider.value = pixelPosition / width * 100;
        if (pixelPosition > width) pixelPosition = width, slider.value = 100;
        if (pixelPosition < 0) pixelPosition = 0, slider.value = 0;
        setStyle(slider.thumb, 'paddingLeft', pixelPosition);
        Graffiti.sliderUpdated(slider.id);
    },

    sliderUpdated: function(id) {
        switch (id) {
            case 'thickness':
                Graffiti.brush[0] = Math.max(Graffiti.sliders[id].value / 100 * 70, 0.7);
                Graffiti.brushPreviewUpdate();
                break;
            case 'opacity':
                Graffiti.brush[2] = Math.max(Graffiti.sliders[id].value / 100, 0.01);
                Graffiti.brushPreviewUpdate();
                break;
        }
    },

    drawAreaInUse: 0,

    drawAreaWrapOffset: [],

    drawAreaInit: function() {
        var box = curBox() && curBox().bodyNode;

        Graffiti.drawAreaCurWidth = Graffiti.drawAreaMinWidth;
        Graffiti.drawAreaCurHeight = Graffiti.drawAreaMinHeight;
        Graffiti.drawAreaWrap = geByClass1('_graffiti_drawarea_wrap', box);
        addEvent(Graffiti.drawAreaWrap, (Graffiti.touch ? 'touchstart' : 'mousedown'), function(ev) {
            ev = Graffiti.extendTouchEvent(ev);
            Graffiti.drawAreaBeginStroke(ev);
        });
        Graffiti.drawAreaMainCanvas = geByClass1('_graffiti_canvas_main', box);
        Graffiti.drawAreaMainContext = Graffiti.drawAreaMainCanvas.getContext('2d');
        Graffiti.drawAreaStrokeCanvas = geByClass1('_graffiti_canvas_stroke', box);
        Graffiti.drawAreaStrokeContext = Graffiti.drawAreaStrokeCanvas.getContext('2d');
        Graffiti.drawAreaHistoryCanvas = geByClass1('_graffiti_canvas_history', box);
        Graffiti.drawAreaHistoryContext = Graffiti.drawAreaHistoryCanvas.getContext('2d');

        var data = Graffiti.drawAreaGetData();
        setStyle(Graffiti.drawAreaHistoryCanvas, {
            width: data[4],
            height: data[5]
        });
        Graffiti.drawAreaUpdateSize();
        Graffiti.drawAreaUpdateOffset();
        Graffiti.resizeRatio = Graffiti.drawAreaCurWidth / Graffiti.drawAreaMinWidth;
    },

    drawAreaBeginStroke: function(ev) {
        var pos = Graffiti.drawAreaWrapOffset;
        Graffiti.strokes.push([ev.pageX - pos[0], ev.pageY - pos[1]]);
        Graffiti.drawAreaInUse = 1;
        Graffiti.draw(Graffiti.drawAreaStrokeContext);
    },

    drawAreaAdvanceStroke: function(ev) {
        if (Graffiti.drawAreaInUse) {
            var data = Graffiti.drawAreaGetData();
            Graffiti.drawAreaStrokeContext.clearRect(0, 0, data[2], data[3]);
            var pos = Graffiti.drawAreaWrapOffset;
            Graffiti.strokes.push([ev.pageX - pos[0], ev.pageY - pos[1]]);
            Graffiti.draw(Graffiti.drawAreaStrokeContext);
        }
    },

    drawAreaFinishStroke: function() {
        if (Graffiti.drawAreaInUse) {
            var data = Graffiti.drawAreaGetData();
            Graffiti.drawAreaInUse = 0;
            Graffiti.draw(Graffiti.drawAreaMainContext);
            var strokes = Graffiti.drawUnflagStrokes(Graffiti.strokes);
            Graffiti.historyAddStep(strokes, Graffiti.brush.slice(), Graffiti.resizeRatio);
            Graffiti.drawAreaStrokeContext.clearRect(0, 0, data[2], data[3]);
            Graffiti.strokes = [];
        }
    },

    flushGraffiti: function() {
        if (Graffiti.isChanged()) {
            var fbox = showFastBox({
                title: getLang('graffiti_flush_title')
            }, getLang('graffiti_flush_text'), getLang('graffiti_flash_clear'), function() {
                fbox.hide();
                Graffiti.drawAreaErase();
            }, getLang('global_cancel'));
        } else {
            Graffiti.drawAreaErase();
        }
        return false;
    },

    drawAreaErase: function() {
        var data = Graffiti.drawAreaGetData();
        animate(Graffiti.drawAreaMainCanvas, {
            opacity: 0
        }, 200, function() {
            Graffiti.drawAreaMainContext.clearRect(0, 0, data[2], data[3]);
            setStyle(Graffiti.drawAreaMainCanvas, 'opacity', 1)
        });
        Graffiti.history = [];
        Graffiti.historyGlobal = [];
        Graffiti.historyCheckpoint = null;
    },

    drawAreaUpdateSize: function() {
        var r = Graffiti.pixelRatio,
            size = getSize(Graffiti.drawAreaMainCanvas);
        Graffiti.drawAreaMainCanvas.width = size[0] * r;
        Graffiti.drawAreaMainCanvas.height = size[1] * r;
        Graffiti.drawAreaStrokeCanvas.width = size[0] * r;
        Graffiti.drawAreaStrokeCanvas.height = size[1] * r;
    },

    drawAreaUpdateOffset: function() {
        Graffiti.drawAreaWrapOffset = getXY(Graffiti.drawAreaWrap);
    },

    draw: function(ctx, history, ratio) {
        var strokes = undefined;
        var recursive = false;
        if (history) {
            history = history.slice();
            if (history.length != 0) {
                var step = history.shift();
                strokes = Graffiti.drawGetNormalizedStrokes(step[0], step[2], ratio);
                recursive = true;
            } else {
                return false;
            }
            ctx.lineWidth = Graffiti.drawGetNormalizedBrushSize(step[1][0], ratio).toFixed(2);
            ctx.strokeStyle = 'rgba(' + step[1][1] + ', ' + step[1][2] + ')';
        } else {
            strokes = Graffiti.drawGetNormalizedStrokes(Graffiti.strokes);
            ctx.lineWidth = Graffiti.drawGetNormalizedBrushSize(Graffiti.brush[0]).toFixed(2);
            ctx.strokeStyle = 'rgba(' + Graffiti.brush[1] + ', ' + Graffiti.brush[2] + ')';
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        if (strokes.length < 2) {
            ctx.moveTo(strokes[0][0], strokes[0][1]);
            ctx.lineTo(strokes[0][0] + 0.51, strokes[0][1]);
        } else {
            ctx.moveTo(strokes[0][0], strokes[0][1]);
            ctx.lineTo((strokes[0][0] + strokes[1][0]) * 0.5,
                (strokes[0][1] + strokes[1][1]) * 0.5);
            var i = 0;
            while (++i < (strokes.length - 1)) {
                var abs1 = Math.abs(strokes[i - 1][0] - strokes[i][0]) +
                    Math.abs(strokes[i - 1][1] - strokes[i][1]) +
                    Math.abs(strokes[i][0] - strokes[i + 1][0]) +
                    Math.abs(strokes[i][1] - strokes[i + 1][1]);
                var abs2 = Math.abs(strokes[i - 1][0] - strokes[i + 1][0]) +
                    Math.abs(strokes[i - 1][1] - strokes[i + 1][1]);
                if (abs1 > 10 && abs2 > abs1 * 0.8) {
                    ctx.quadraticCurveTo(strokes[i][0], strokes[i][1],
                        (strokes[i][0] + strokes[i + 1][0]) * 0.5,
                        (strokes[i][1] + strokes[i + 1][1]) * 0.5);
                    continue;
                }
                ctx.lineTo(strokes[i][0], strokes[i][1]);
                ctx.lineTo((strokes[i][0] + strokes[i + 1][0]) * 0.5,
                    (strokes[i][1] + strokes[i + 1][1]) * 0.5);
            }
            ctx.lineTo(strokes[strokes.length - 1][0], strokes[strokes.length - 1][1]);
            ctx.moveTo(strokes[strokes.length - 1][0], strokes[strokes.length - 1][1]);
        }
        ctx.stroke();
        ctx.closePath();
        if (recursive) Graffiti.draw(ctx, history, ratio);
    },

    drawGetNormalizedStrokes: function(strokes, oldRatio, newRatio, ignoreRetina) {
        strokes = strokes.slice();
        oldRatio = oldRatio ? oldRatio : Graffiti.resizeRatio;
        newRatio = newRatio ? newRatio : Graffiti.resizeRatio;
        var pixelRatio = ignoreRetina ? 1 : Graffiti.pixelRatio;
        var ratio = newRatio / oldRatio * pixelRatio;
        for (var i = 0; i < strokes.length; i++) {
            strokes[i] = strokes[i].slice();
            if (!strokes[i][2]) {
                strokes[i][0] *= ratio;
                strokes[i][1] *= ratio;
                strokes[i][2] = 1;
            }
        }
        return strokes;
    },

    drawGetNormalizedBrushSize: function(brushSize, ratio, ignoreRetina) {
        var pixelRatio = ignoreRetina ? 1 : Graffiti.pixelRatio;
        return brushSize * (ratio || Graffiti.resizeRatio) * pixelRatio;
    },

    drawUnflagStrokes: function(strokes) {
        strokes = strokes.slice();
        for (var i = 0; i < strokes.length; i++) {
            strokes[i][2] = 0;
        }
        return strokes;
    },

    history: [],
    historyGlobal: [],
    historyCheckpoint: undefined,
    historyStepBackLock: 0,

    historyAddStep: function(strokes, brush, resizeRatio) {
        Graffiti.history.push([strokes, brush, resizeRatio]);
        Graffiti.historyGlobal.push([strokes, brush, resizeRatio]);
        if (Graffiti.history.length == Graffiti.historyLimit * 2) {
            var data = Graffiti.drawAreaGetData();
            var checkPointStrokes = Graffiti.history.splice(0, Graffiti.historyLimit);
            Graffiti.historyDrawToCanvas(checkPointStrokes, function() {
                Graffiti.historyCheckpoint = Graffiti.drawAreaHistoryCanvas.toDataURL('image/png', 1);
                Graffiti.drawAreaHistoryContext.clearRect(0, 0, data[4], data[5]);
            });
        }
    },

    historyDrawToCanvas: function(strokes, callback) {
        var data = Graffiti.drawAreaGetData();
        if (Graffiti.historyCheckpoint) {
            var image = new Image();
            image.onload = function() {
                Graffiti.drawAreaHistoryContext.drawImage(image, 0, 0, data[4], data[5]);
                resolveAsynch();
            }
            image.src = Graffiti.historyCheckpoint;
        } else {
            resolveAsynch();
        }

        function resolveAsynch() {
            Graffiti.draw(Graffiti.drawAreaHistoryContext, strokes, Graffiti.maxResizeRatio / Graffiti.pixelRatio);
            callback();
        }
    },

    historyStepBack: function() {
        if (Graffiti.historyStepBackLock) {
            return false;
        }
        var data = Graffiti.drawAreaGetData();
        if (Graffiti.history.length == 0) {
            Graffiti.drawAreaErase();
            Graffiti.historyCheckpoint = null;
        } else {
            Graffiti.historyStepBackLock = 1;
            Graffiti.history.pop();
            Graffiti.historyGlobal.pop();
            Graffiti.drawAreaStrokeContext.drawImage(Graffiti.drawAreaMainCanvas, 0, 0, data[2], data[3]);
            setStyle(Graffiti.drawAreaStrokeCanvas, 'backgroundColor', '#fff');
            Graffiti.drawAreaMainContext.clearRect(0, 0, data[2], data[3]);
            if (Graffiti.historyCheckpoint) {
                var image = new Image();
                image.onload = function() {
                    Graffiti.drawAreaMainContext.drawImage(image, 0, 0, data[2], data[3]);
                    resolveAsynch();
                }
                image.src = Graffiti.historyCheckpoint;
            } else {
                resolveAsynch();
            }
        }

        function resolveAsynch() {
            Graffiti.draw(Graffiti.drawAreaMainContext, Graffiti.history);
            animate(Graffiti.drawAreaStrokeCanvas, {
                opacity: 0
            }, 200, function() {
                Graffiti.drawAreaStrokeContext.clearRect(0, 0, data[2], data[3]);
                setStyle(Graffiti.drawAreaStrokeCanvas, {
                    backgroundColor: 'transparent',
                    opacity: 1
                });
                Graffiti.historyStepBackLock = 0;
            });
        }
    },

    drawAreaGetData: function() {
        var size = getSize(Graffiti.drawAreaMainCanvas),
            r = Graffiti.pixelRatio;
        return [
            size[0] * r,
            size[1] * r,
            size[0] * r,
            size[1] * r,
            Graffiti.drawAreaMaxWidth * r,
            Graffiti.drawAreaMaxHeight * r
        ];
    },

    resizing: false,

    resize: function(ev) {
        if (Graffiti.resizing) {
            var canvasHeight = getSize(Graffiti.drawAreaMainCanvas)[1],
                newHeight = canvasHeight + ev.pageY - getXY(Graffiti.resizer)[1] - Graffiti.resizing.offset,
                newWidth = Graffiti.drawAreaMinWidth / Graffiti.drawAreaMinHeight * newHeight;

            newWidth = Math.min(Math.max(newWidth, Graffiti.drawAreaMinWidth), Graffiti.drawAreaMaxWidth);
            newHeight = Math.min(Math.max(newHeight, Graffiti.drawAreaMinHeight), Graffiti.drawAreaMaxHeight);
            setStyle(Graffiti.drawAreaWrap, {
                width: newWidth,
                height: newHeight
            });
            if (Graffiti.onResize) {
                Graffiti.onResize(newWidth, newHeight);
            }
            Graffiti.drawAreaCurWidth = newWidth;
            Graffiti.drawAreaCurHeight = newHeight;
        }
    },

    resizeBegin: function(ev) {
        ev = Graffiti.extendTouchEvent(ev);
        Graffiti.resizing = {
            offset: ev.pageY - getXY(Graffiti.resizer)[1]
        };
    },

    resizeFinish: function() {
        if (Graffiti.resizing) {
            Graffiti.resizing = false;
            Graffiti.drawAreaUpdateOffset();
            Graffiti.resizeRatio = Graffiti.drawAreaCurWidth / Graffiti.drawAreaMinWidth;
            Graffiti.drawAreaUpdateSize();

            function resolveAsynch() {
                Graffiti.draw(Graffiti.drawAreaMainContext, Graffiti.history);
            }
            if (Graffiti.historyCheckpoint) {
                var image = new Image();
                image.onload = function() {
                    var data = Graffiti.drawAreaGetData();
                    Graffiti.drawAreaMainContext.drawImage(image, 0, 0, data[2], data[3]);
                    resolveAsynch();
                }
                image.src = Graffiti.historyCheckpoint;
            } else {
                resolveAsynch();
            }
        }
    },

    exportLock: 0,

    exportSvg: function() {
        if (Graffiti.historyGlobal.length == 0) return false;
        Graffiti.exportLock = 1;
        var history = Graffiti.historyGlobal.slice();
        var maxW = Graffiti.drawAreaMaxWidth;
        var maxH = Graffiti.drawAreaMaxHeight;
        var file = '<?xml version="1.0" standalone="yes"?>\
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> \
<svg width="' + maxW + 'px" height="' + maxH + 'px" viewBox="0 0 ' + maxW + ' ' + maxH + '" xmlns="http://www.w3.org/2000/svg" version="1.1">';
        for (var i = 0; i < history.length; i++) {
            file += Graffiti.exportSvgGetChunk(history[i]);
        }
        file += '</svg>';
        return file;
    },

    exportSvgGetChunk: function(step) {
        var chunk = '<path d="';
        var strokes = Graffiti.drawGetNormalizedStrokes(step[0], step[2], Graffiti.maxResizeRatio, true);
        var size = Graffiti.drawGetNormalizedBrushSize(step[1][0], Graffiti.maxResizeRatio, true);
        var color = step[1][1];
        var opacity = step[1][2];
        if (strokes.length < 2) {
            chunk += 'M' + strokes[0][0] + ',' + strokes[0][1] + ' ';
            chunk += 'L' + (strokes[0][0] + 0.51) + ',' + strokes[0][1] + ' ';
            chunk += '" fill="none" stroke="rgb(' + color + ')" stroke-opacity="' + opacity + '\
      " stroke-width="' + size + '" stroke-linecap="round" stroke-linejoin="round" />';
            return chunk;
        }
        chunk += 'M' + strokes[0][0] + ',' + strokes[0][1] + ' ';
        chunk += 'L' + ((strokes[0][0] + strokes[1][0]) * 0.5) + ',' +
            ((strokes[0][1] + strokes[1][1]) * 0.5) + ' ';
        var i = 0;
        while (++i < (strokes.length - 1)) {
            var abs1 = Math.abs(strokes[i - 1][0] - strokes[i][0]) +
                Math.abs(strokes[i - 1][1] - strokes[i][1]) +
                Math.abs(strokes[i][0] - strokes[i + 1][0]) +
                Math.abs(strokes[i][1] - strokes[i + 1][1]);
            var abs2 = Math.abs(strokes[i - 1][0] - strokes[i + 1][0]) +
                Math.abs(strokes[i - 1][1] - strokes[i + 1][1]);
            if (abs1 > 10 && abs2 > abs1 * 0.8) {
                chunk += 'Q' + strokes[i][0] + ',' + strokes[i][1] + ' ' +
                    ((strokes[i][0] + strokes[i + 1][0]) * 0.5) + ',' +
                    ((strokes[i][1] + strokes[i + 1][1]) * 0.5) + ' ';
                continue;
            }
            chunk += 'L' + strokes[i][0] + ',' + strokes[i][1] + ' ';
            chunk += 'L' + ((strokes[i][0] + strokes[i + 1][0]) * 0.5) + ',' +
                ((strokes[i][1] + strokes[i + 1][1]) * 0.5) + ' ';
        }
        chunk += 'L' + strokes[strokes.length - 1][0] + ',' + strokes[strokes.length - 1][1] + ' ';
        chunk += '" fill="none" stroke="rgb(' + color + ')" stroke-opacity="' + opacity + '" \
                stroke-width="' + size + '" stroke-linecap="round" stroke-linejoin="round" />';
        return chunk;
    },

    exportImage: function(callback) {
        Graffiti.historyDrawToCanvas(Graffiti.history, function() {
            callback(Graffiti.drawAreaHistoryCanvas.toDataURL('image/png', 1));
        });
    }

};

try {
    stManager.done('graffiti_new.js');
} catch (e) {}