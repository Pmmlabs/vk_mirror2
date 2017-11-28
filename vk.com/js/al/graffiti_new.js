var Graffiti = {
    brush: [20, "95, 127, 162", .8],
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
    brushPreviewCanvas: void 0,
    brushPreviewContext: void 0,
    colorPreviewBox: void 0,
    colorPickerCell: void 0,
    drawAreaMainCanvas: void 0,
    drawAreaMainContext: void 0,
    drawAreaStrokeCanvas: void 0,
    drawAreaStrokeContext: void 0,
    drawAreaHistoryCanvas: void 0,
    drawAreaHistoryContext: void 0,
    drawAreaWrap: void 0,
    resizer: void 0,
    init: function() {
        var i = curBox() && curBox().bodyNode;
        browser.mobile && (Graffiti.touch = 1), Graffiti.resizer = geByClass1("_graffiti_resize", i), Graffiti.attachEvents(), Graffiti.colorPickerInit(), Graffiti.brushPreviewInit(), Graffiti.drawAreaInit(), Graffiti.sliderInit("thickness", geByClass1("_graffiti_slider_thickness_wrap", i), geByClass1("_graffiti_slider_thickness_thumb", i), 25), Graffiti.sliderInit("opacity", geByClass1("_graffiti_slider_opacity_wrap", i), geByClass1("_graffiti_slider_opacity_thumb", i), 80)
    },
    deInit: function() {
        Graffiti.history = [], Graffiti.historyGlobal = [], Graffiti.historyCheckpoint = null, Graffiti.detachEvents()
    },
    attachEvents: function() {
        addEvent(document, Graffiti.touch ? "touchmove" : "mousemove", Graffiti.eventsMouseMove), addEvent(document, Graffiti.touch ? "touchend" : "mouseup", Graffiti.eventsMouseUp), addEvent(window, "resize", Graffiti.eventsWindowResize), addEvent(document, "selectstart", Graffiti.eventsSelectStart), addEvent(document, "keydown", Graffiti.eventsKeyPress), addEvent(Graffiti.resizer, Graffiti.touch ? "touchstart" : "mousedown", Graffiti.resizeBegin), addEvent(boxLayerWrap, "scroll", Graffiti.drawAreaUpdateOffset)
    },
    detachEvents: function() {
        removeEvent(document, Graffiti.touch ? "touchmove" : "mousemove", Graffiti.eventsMouseMove), removeEvent(document, Graffiti.touch ? "touchend" : "mouseup", Graffiti.eventsMouseUp), removeEvent(window, "resize", Graffiti.eventsWindowResize), removeEvent(document, "selectstart", Graffiti.eventsSelectStart), removeEvent(document, "keydown", Graffiti.eventsKeyPress), removeEvent(Graffiti.resizer, Graffiti.touch ? "touchstart" : "mousedown", Graffiti.resizeBegin), removeEvent(boxLayerWrap, "scroll", Graffiti.drawAreaUpdateOffset)
    },
    extendTouchEvent: function(i) {
        return Graffiti.touch && (i.pageX = i.touches[0].pageX, i.pageY = i.touches[0].pageY), i
    },
    isChanged: function() {
        return Graffiti.historyGlobal.length || Graffiti.historyCheckpoint ? !0 : !1
    },
    eventsMouseMove: function(i) {
        return i = Graffiti.extendTouchEvent(i), Graffiti.sliderMouseMove(i), Graffiti.drawAreaAdvanceStroke(i), Graffiti.resize(i), cancelEvent(i)
    },
    eventsMouseUp: function(i) {
        Graffiti.sliderMouseUp(), Graffiti.drawAreaFinishStroke(), Graffiti.resizeFinish()
    },
    eventsWindowResize: function() {
        Graffiti.drawAreaUpdateOffset()
    },
    eventsSelectStart: function(i) {
        return cancelEvent(i)
    },
    eventsKeyPress: function(i) {
        return Graffiti.shortCutHandle(i) ? cancelEvent(i) : void 0
    },
    shortCutHandle: function(i) {
        if (!i.ctrlKey) return !1;
        switch (i.keyCode) {
            case 90:
                return Graffiti.historyStepBack(), !0;
            case 69:
                return Graffiti.flushGraffiti(), !0
        }
        return !1
    },
    brushPreviewInit: function() {
        var i = curBox() && curBox().bodyNode;
        Graffiti.brushPreviewCanvas = geByClass1("_graffiti_brush_canvas", i), Graffiti.brushPreviewContext = Graffiti.brushPreviewCanvas.getContext("2d"), Graffiti.brushPreviewContext.scale(2, 2), Graffiti.brushPreviewUpdate()
    },
    brushPreviewUpdate: function() {
        var i = Graffiti.brushPreviewContext;
        i.clearRect(0, 0, 160, 160), i.lineCap = "round", i.lineJoin = "round", i.lineWidth = Graffiti.brush[0], i.strokeStyle = "rgba(" + Graffiti.brush[1] + ", " + Graffiti.brush[2] + ")", i.beginPath(), i.moveTo(40, 40), i.lineTo(40, 40.5), i.stroke()
    },
    colorPickerLastHighlight: void 0,
    colorPickerInit: function() {
        var i = curBox() && curBox().bodyNode;
        Graffiti.colorPickerCell = geByClass1("_graffiti_colorpicker_cell_active", i), Graffiti.colorPreviewBox = geByClass1("_graffiti_colorpreview_box", i), Graffiti.colorPreviewWrap = geByClass1("_graffiti_colorpreview_wrap", i)
    },
    colorPickerContent: function() {
        for (var i = '<div class="graffiti_colorpicker_wrap clear_fix" onclick="Graffiti.colorPickerChooseColor();">', r = [], a = 0; 6 > a; a++)
            for (var t = 0; 6 > t; t++)
                for (var e = 0; 6 > e; e++) r[36 * a + 6 * t + e] = "rgb(" + a / 5 * 255 + "," + t / 5 * 255 + "," + e / 5 * 255 + ")";
        for (var f = 0; 12 > f; f++) {
            i += '<div class="graffiti_colorpicker_row">';
            for (var o = 0; 18 > o; o++) {
                var a = Math.floor(o / 6) + 3 * Math.floor(f / 6),
                    t = o % 6,
                    e = f % 6,
                    n = 36 * a + 6 * t + e;
                i += '<div class="graffiti_colorpicker_cell"                       style="background-color: ' + r[n] + '"                       onmouseover="Graffiti.colorPickerHighlight(this)"                       ></div>'
            }
            i += "</div>"
        }
        return i += "</div>"
    },
    colorPickerShow: function(i) {
        showTooltip(i, {
            text: Graffiti.colorPickerContent(),
            className: "graffiti_tt",
            dir: "auto",
            slide: 15,
            hidedt: 500,
            shift: [22, 7, 7],
            hasover: !0
        })
    },
    colorPickerHide: function() {
        Graffiti.colorPreviewWrap.tt && Graffiti.colorPreviewWrap.tt.hide({
            fasthide: !0
        }), hide(Graffiti.colorPickerCell)
    },
    colorPickerHighlight: function(i) {
        var r = i.style.backgroundColor.replace(/(rgb\(|\))/g, "");
        Graffiti.colorPickerLastHighlight = r;
        var a = getXY(domPN(curBox().bodyNode)),
            t = getXY(i);
        show(Graffiti.colorPickerCell), setStyle(Graffiti.colorPickerCell, {
            left: t[0] - a[0] - 1,
            top: t[1] - a[1] - 1
        })
    },
    colorPickerChooseColor: function() {
        Graffiti.brush[1] = Graffiti.colorPickerLastHighlight, Graffiti.colorPreviewBox.style.backgroundColor = "rgb(" + Graffiti.brush[1] + ")", Graffiti.brushPreviewUpdate(), Graffiti.colorPickerHide()
    },
    sliders: {},
    sliderActive: {},
    sliderInit: function(i, r, a, t) {
        Graffiti.sliders[i] = {
            id: i,
            wrapper: r,
            thumb: a,
            value: t
        };
        var e = getSize(r)[0] / 100 * t;
        animate(Graffiti.sliders[i].thumb, {
            paddingLeft: e
        }, 300), addEvent(r, "wheel DOMMouseScroll", Graffiti.sliderWheel), Graffiti.sliderUpdated(i)
    },
    sliderMouseDown: function(i, r) {
        r = Graffiti.extendTouchEvent(r), Graffiti.sliderActive = Graffiti.sliders[i], Graffiti.sliderMove(r)
    },
    sliderMouseMove: function(i) {
        isEmpty(Graffiti.sliderActive) || Graffiti.sliderMove(i)
    },
    sliderMouseUp: function() {
        Graffiti.sliderActive = {}
    },
    sliderHovered: {},
    sliderBeforeWheel: function(i) {
        Graffiti.sliderHovered = Graffiti.sliders[i]
    },
    sliderWheel: function(i) {
        Graffiti.sliderMove(i)
    },
    sliderMove: function(i) {
        var r, a = void 0;
        a = isEmpty(Graffiti.sliderActive) ? Graffiti.sliderHovered : Graffiti.sliderActive;
        var t = getSize(a.wrapper)[0] - 5;
        if ("wheel" == i.type || "DOMMouseScroll" == i.type) {
            var e = i.detail < 0 || i.wheelDelta > 0 ? 5 : -5;
            r = t / 100 * a.value + e, cancelEvent(i)
        } else r = i.pageX - getXY(a.wrapper)[0];
        a.value = r / t * 100, r > t && (r = t, a.value = 100), 0 > r && (r = 0, a.value = 0), setStyle(a.thumb, "paddingLeft", r), Graffiti.sliderUpdated(a.id)
    },
    sliderUpdated: function(i) {
        switch (i) {
            case "thickness":
                Graffiti.brush[0] = Math.max(Graffiti.sliders[i].value / 100 * 70, .7), Graffiti.brushPreviewUpdate();
                break;
            case "opacity":
                Graffiti.brush[2] = Math.max(Graffiti.sliders[i].value / 100, .01), Graffiti.brushPreviewUpdate()
        }
    },
    drawAreaInUse: 0,
    drawAreaWrapOffset: [],
    drawAreaInit: function() {
        var i = curBox() && curBox().bodyNode;
        Graffiti.drawAreaCurWidth = Graffiti.drawAreaMinWidth, Graffiti.drawAreaCurHeight = Graffiti.drawAreaMinHeight, Graffiti.drawAreaWrap = geByClass1("_graffiti_drawarea_wrap", i), addEvent(Graffiti.drawAreaWrap, Graffiti.touch ? "touchstart" : "mousedown", function(i) {
            i = Graffiti.extendTouchEvent(i), Graffiti.drawAreaBeginStroke(i)
        }), Graffiti.drawAreaMainCanvas = geByClass1("_graffiti_canvas_main", i), Graffiti.drawAreaMainContext = Graffiti.drawAreaMainCanvas.getContext("2d"), Graffiti.drawAreaStrokeCanvas = geByClass1("_graffiti_canvas_stroke", i), Graffiti.drawAreaStrokeContext = Graffiti.drawAreaStrokeCanvas.getContext("2d"), Graffiti.drawAreaHistoryCanvas = geByClass1("_graffiti_canvas_history", i), Graffiti.drawAreaHistoryContext = Graffiti.drawAreaHistoryCanvas.getContext("2d");
        var r = Graffiti.drawAreaGetData();
        setStyle(Graffiti.drawAreaHistoryCanvas, {
            width: r[4],
            height: r[5]
        }), Graffiti.drawAreaUpdateSize(), Graffiti.drawAreaUpdateOffset(), Graffiti.resizeRatio = Graffiti.drawAreaCurWidth / Graffiti.drawAreaMinWidth
    },
    drawAreaBeginStroke: function(i) {
        var r = Graffiti.drawAreaWrapOffset;
        Graffiti.strokes.push([i.pageX - r[0], i.pageY - r[1]]), Graffiti.drawAreaInUse = 1, Graffiti.draw(Graffiti.drawAreaStrokeContext)
    },
    drawAreaAdvanceStroke: function(i) {
        if (Graffiti.drawAreaInUse) {
            var r = Graffiti.drawAreaGetData();
            Graffiti.drawAreaStrokeContext.clearRect(0, 0, r[2], r[3]);
            var a = Graffiti.drawAreaWrapOffset;
            Graffiti.strokes.push([i.pageX - a[0], i.pageY - a[1]]), Graffiti.draw(Graffiti.drawAreaStrokeContext)
        }
    },
    drawAreaFinishStroke: function() {
        if (Graffiti.drawAreaInUse) {
            var i = Graffiti.drawAreaGetData();
            Graffiti.drawAreaInUse = 0, Graffiti.draw(Graffiti.drawAreaMainContext);
            var r = Graffiti.drawUnflagStrokes(Graffiti.strokes);
            Graffiti.historyAddStep(r, Graffiti.brush.slice(), Graffiti.resizeRatio), Graffiti.drawAreaStrokeContext.clearRect(0, 0, i[2], i[3]), Graffiti.strokes = []
        }
    },
    flushGraffiti: function() {
        if (Graffiti.isChanged()) var i = showFastBox({
            title: getLang("graffiti_flush_title")
        }, getLang("graffiti_flush_text"), getLang("graffiti_flash_clear"), function() {
            i.hide(), Graffiti.drawAreaErase()
        }, getLang("global_cancel"));
        else Graffiti.drawAreaErase();
        return !1
    },
    drawAreaErase: function() {
        var i = Graffiti.drawAreaGetData();
        animate(Graffiti.drawAreaMainCanvas, {
            opacity: 0
        }, 200, function() {
            Graffiti.drawAreaMainContext.clearRect(0, 0, i[2], i[3]), setStyle(Graffiti.drawAreaMainCanvas, "opacity", 1)
        }), Graffiti.history = [], Graffiti.historyGlobal = [], Graffiti.historyCheckpoint = null
    },
    drawAreaUpdateSize: function() {
        var i = Graffiti.pixelRatio,
            r = getSize(Graffiti.drawAreaMainCanvas);
        Graffiti.drawAreaMainCanvas.width = r[0] * i, Graffiti.drawAreaMainCanvas.height = r[1] * i, Graffiti.drawAreaStrokeCanvas.width = r[0] * i, Graffiti.drawAreaStrokeCanvas.height = r[1] * i
    },
    drawAreaUpdateOffset: function() {
        Graffiti.drawAreaWrapOffset = getXY(Graffiti.drawAreaWrap)
    },
    draw: function(i, r, a) {
        var t = void 0,
            e = !1;
        if (r) {
            if (r = r.slice(), 0 == r.length) return !1;
            var f = r.shift();
            t = Graffiti.drawGetNormalizedStrokes(f[0], f[2], a), e = !0, i.lineWidth = Graffiti.drawGetNormalizedBrushSize(f[1][0], a).toFixed(2), i.strokeStyle = "rgba(" + f[1][1] + ", " + f[1][2] + ")"
        } else t = Graffiti.drawGetNormalizedStrokes(Graffiti.strokes), i.lineWidth = Graffiti.drawGetNormalizedBrushSize(Graffiti.brush[0]).toFixed(2), i.strokeStyle = "rgba(" + Graffiti.brush[1] + ", " + Graffiti.brush[2] + ")";
        if (i.lineCap = "round", i.lineJoin = "round", i.beginPath(), t.length < 2) i.moveTo(t[0][0], t[0][1]), i.lineTo(t[0][0] + .51, t[0][1]);
        else {
            i.moveTo(t[0][0], t[0][1]), i.lineTo(.5 * (t[0][0] + t[1][0]), .5 * (t[0][1] + t[1][1]));
            for (var o = 0; ++o < t.length - 1;) {
                var n = Math.abs(t[o - 1][0] - t[o][0]) + Math.abs(t[o - 1][1] - t[o][1]) + Math.abs(t[o][0] - t[o + 1][0]) + Math.abs(t[o][1] - t[o + 1][1]),
                    s = Math.abs(t[o - 1][0] - t[o + 1][0]) + Math.abs(t[o - 1][1] - t[o + 1][1]);
                n > 10 && s > .8 * n ? i.quadraticCurveTo(t[o][0], t[o][1], .5 * (t[o][0] + t[o + 1][0]), .5 * (t[o][1] + t[o + 1][1])) : (i.lineTo(t[o][0], t[o][1]), i.lineTo(.5 * (t[o][0] + t[o + 1][0]), .5 * (t[o][1] + t[o + 1][1])))
            }
            i.lineTo(t[t.length - 1][0], t[t.length - 1][1]), i.moveTo(t[t.length - 1][0], t[t.length - 1][1])
        }
        i.stroke(), i.closePath(), e && Graffiti.draw(i, r, a)
    },
    drawGetNormalizedStrokes: function(i, r, a, t) {
        i = i.slice(), r = r ? r : Graffiti.resizeRatio, a = a ? a : Graffiti.resizeRatio;
        for (var e = t ? 1 : Graffiti.pixelRatio, f = a / r * e, o = 0; o < i.length; o++) i[o] = i[o].slice(), i[o][2] || (i[o][0] *= f, i[o][1] *= f, i[o][2] = 1);
        return i
    },
    drawGetNormalizedBrushSize: function(i, r, a) {
        var t = a ? 1 : Graffiti.pixelRatio;
        return i * (r || Graffiti.resizeRatio) * t
    },
    drawUnflagStrokes: function(i) {
        i = i.slice();
        for (var r = 0; r < i.length; r++) i[r][2] = 0;
        return i
    },
    history: [],
    historyGlobal: [],
    historyCheckpoint: void 0,
    historyStepBackLock: 0,
    historyAddStep: function(i, r, a) {
        if (Graffiti.history.push([i, r, a]), Graffiti.historyGlobal.push([i, r, a]), Graffiti.history.length == 2 * Graffiti.historyLimit) {
            var t = Graffiti.drawAreaGetData(),
                e = Graffiti.history.splice(0, Graffiti.historyLimit);
            Graffiti.historyDrawToCanvas(e, function() {
                Graffiti.historyCheckpoint = Graffiti.drawAreaHistoryCanvas.toDataURL("image/png", 1), Graffiti.drawAreaHistoryContext.clearRect(0, 0, t[4], t[5])
            })
        }
    },
    historyDrawToCanvas: function(i, r) {
        function a() {
            Graffiti.draw(Graffiti.drawAreaHistoryContext, i, Graffiti.maxResizeRatio / Graffiti.pixelRatio), r()
        }
        var t = Graffiti.drawAreaGetData();
        if (Graffiti.historyCheckpoint) {
            var e = new Image;
            e.onload = function() {
                Graffiti.drawAreaHistoryContext.drawImage(e, 0, 0, t[4], t[5]), a()
            }, e.src = Graffiti.historyCheckpoint
        } else a()
    },
    historyStepBack: function() {
        function i() {
            Graffiti.draw(Graffiti.drawAreaMainContext, Graffiti.history), animate(Graffiti.drawAreaStrokeCanvas, {
                opacity: 0
            }, 200, function() {
                Graffiti.drawAreaStrokeContext.clearRect(0, 0, r[2], r[3]), setStyle(Graffiti.drawAreaStrokeCanvas, {
                    backgroundColor: "transparent",
                    opacity: 1
                }), Graffiti.historyStepBackLock = 0
            })
        }
        if (Graffiti.historyStepBackLock) return !1;
        var r = Graffiti.drawAreaGetData();
        if (0 == Graffiti.history.length) Graffiti.drawAreaErase(), Graffiti.historyCheckpoint = null;
        else if (Graffiti.historyStepBackLock = 1, Graffiti.history.pop(), Graffiti.historyGlobal.pop(), Graffiti.drawAreaStrokeContext.drawImage(Graffiti.drawAreaMainCanvas, 0, 0, r[2], r[3]), setStyle(Graffiti.drawAreaStrokeCanvas, "backgroundColor", "#fff"), Graffiti.drawAreaMainContext.clearRect(0, 0, r[2], r[3]), Graffiti.historyCheckpoint) {
            var a = new Image;
            a.onload = function() {
                Graffiti.drawAreaMainContext.drawImage(a, 0, 0, r[2], r[3]), i()
            }, a.src = Graffiti.historyCheckpoint
        } else i()
    },
    drawAreaGetData: function() {
        var i = getSize(Graffiti.drawAreaMainCanvas),
            r = Graffiti.pixelRatio;
        return [i[0] * r, i[1] * r, i[0] * r, i[1] * r, Graffiti.drawAreaMaxWidth * r, Graffiti.drawAreaMaxHeight * r]
    },
    resizing: !1,
    resize: function(i) {
        if (Graffiti.resizing) {
            var r = getSize(Graffiti.drawAreaMainCanvas)[1],
                a = r + i.pageY - getXY(Graffiti.resizer)[1] - Graffiti.resizing.offset,
                t = Graffiti.drawAreaMinWidth / Graffiti.drawAreaMinHeight * a;
            t = Math.min(Math.max(t, Graffiti.drawAreaMinWidth), Graffiti.drawAreaMaxWidth), a = Math.min(Math.max(a, Graffiti.drawAreaMinHeight), Graffiti.drawAreaMaxHeight), setStyle(Graffiti.drawAreaWrap, {
                width: t,
                height: a
            }), Graffiti.onResize && Graffiti.onResize(t, a), Graffiti.drawAreaCurWidth = t, Graffiti.drawAreaCurHeight = a
        }
    },
    resizeBegin: function(i) {
        i = Graffiti.extendTouchEvent(i), Graffiti.resizing = {
            offset: i.pageY - getXY(Graffiti.resizer)[1]
        }
    },
    resizeFinish: function() {
        function i() {
            Graffiti.draw(Graffiti.drawAreaMainContext, Graffiti.history)
        }
        if (Graffiti.resizing)
            if (Graffiti.resizing = !1, Graffiti.drawAreaUpdateOffset(), Graffiti.resizeRatio = Graffiti.drawAreaCurWidth / Graffiti.drawAreaMinWidth, Graffiti.drawAreaUpdateSize(), Graffiti.historyCheckpoint) {
                var r = new Image;
                r.onload = function() {
                    var a = Graffiti.drawAreaGetData();
                    Graffiti.drawAreaMainContext.drawImage(r, 0, 0, a[2], a[3]), i()
                }, r.src = Graffiti.historyCheckpoint
            } else i()
    },
    exportLock: 0,
    exportSvg: function() {
        if (0 == Graffiti.historyGlobal.length) return !1;
        Graffiti.exportLock = 1;
        for (var i = Graffiti.historyGlobal.slice(), r = Graffiti.drawAreaMaxWidth, a = Graffiti.drawAreaMaxHeight, t = '<?xml version="1.0" standalone="yes"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="' + r + 'px" height="' + a + 'px" viewBox="0 0 ' + r + " " + a + '" xmlns="http://www.w3.org/2000/svg" version="1.1">', e = 0; e < i.length; e++) t += Graffiti.exportSvgGetChunk(i[e]);
        return t += "</svg>"
    },
    exportSvgGetChunk: function(i) {
        var r = '<path d="',
            a = Graffiti.drawGetNormalizedStrokes(i[0], i[2], Graffiti.maxResizeRatio, !0),
            t = Graffiti.drawGetNormalizedBrushSize(i[1][0], Graffiti.maxResizeRatio, !0),
            e = i[1][1],
            f = i[1][2];
        if (a.length < 2) return r += "M" + a[0][0] + "," + a[0][1] + " ", r += "L" + (a[0][0] + .51) + "," + a[0][1] + " ", r += '" fill="none" stroke="rgb(' + e + ')" stroke-opacity="' + f + '      " stroke-width="' + t + '" stroke-linecap="round" stroke-linejoin="round" />';
        r += "M" + a[0][0] + "," + a[0][1] + " ", r += "L" + .5 * (a[0][0] + a[1][0]) + "," + .5 * (a[0][1] + a[1][1]) + " ";
        for (var o = 0; ++o < a.length - 1;) {
            var n = Math.abs(a[o - 1][0] - a[o][0]) + Math.abs(a[o - 1][1] - a[o][1]) + Math.abs(a[o][0] - a[o + 1][0]) + Math.abs(a[o][1] - a[o + 1][1]),
                s = Math.abs(a[o - 1][0] - a[o + 1][0]) + Math.abs(a[o - 1][1] - a[o + 1][1]);
            n > 10 && s > .8 * n ? r += "Q" + a[o][0] + "," + a[o][1] + " " + .5 * (a[o][0] + a[o + 1][0]) + "," + .5 * (a[o][1] + a[o + 1][1]) + " " : (r += "L" + a[o][0] + "," + a[o][1] + " ", r += "L" + .5 * (a[o][0] + a[o + 1][0]) + "," + .5 * (a[o][1] + a[o + 1][1]) + " ")
        }
        return r += "L" + a[a.length - 1][0] + "," + a[a.length - 1][1] + " ", r += '" fill="none" stroke="rgb(' + e + ')" stroke-opacity="' + f + '"                 stroke-width="' + t + '" stroke-linecap="round" stroke-linejoin="round" />'
    },
    exportImage: function(i) {
        Graffiti.historyDrawToCanvas(Graffiti.history, function() {
            i(Graffiti.drawAreaHistoryCanvas.toDataURL("image/png", 1))
        })
    }
};
try {
    stManager.done("graffiti_new.js")
} catch (e) {}