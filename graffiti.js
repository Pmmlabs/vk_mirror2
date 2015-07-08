// Developed by Oleg Berman
// http://vk.com/olegberman
var Graffiti = {
  init: function() {
    var useragent = navigator.userAgent.toLowerCase();
    if(/android|iphone|ipod|ipad|opera mini|opera mobi/i.test(useragent)) {

    }
    this.W = 586;
    this.H = 293;
    this.factor = 1;
    this.brush = {
      size: 0,
      opacity: 0,
      color: "51, 102, 153"
    };
    this.resizing = false;
    this.resDif = 0;
    this.resW = 586;
    this.resH = 293;
    this.fsEnabled = false;
    this.resizer = ge("graffiti_resizer");
    this.histHelpCanv = ge("graffiti_hist_helper");
    this.histHelpCtx = this.histHelpCanv.getContext("2d");
    this.canvWrapper = ge("graffiti_aligner");
    this.mainCanv = ge("graffiti_common");
    this.mainCtx = this.mainCanv.getContext("2d");
    this.overlayCanv = ge("graffiti_overlay");
    this.overlayCtx = this.overlayCanv.getContext("2d");
    this.helpCanv = ge("graffiti_helper");
    this.helpCtx = this.helpCanv.getContext("2d");
    this.controlsCanv = ge("graffiti_controls");
    this.controlsCtx = this.controlsCanv.getContext("2d");
    this.grWrapper = ge("graffiti_wrapper");
    this.cpWrapper = ge("graffiti_cpwrap");
    this.cpCanv = ge("graffiti_cpicker");
    this.rzLink = ge("graffiti_resize_link");
    this.cpCtx = this.cpCanv.getContext("2d");
    this.addSlider("size", this.controlsCtx, 267, 31, 20);
    this.addSlider("opacity", this.controlsCtx, 483, 31, 80);
    this.redrawColorPickerButton(this.controlsCtx, 147, 30, "51, 102, 153", false);
    this.addText(this.controlsCtx, cur.lang['graffiti_flash_color'], 100, 35.5);
    this.addText(this.controlsCtx, cur.lang['graffiti_flash_opacity'], 390, 35.5);
    this.addText(this.controlsCtx, cur.lang['graffiti_flash_thickness'], 206, 35.5);
    this.drawColorPicker(this.cpCtx);
    this.attachEvents();
    this.canvWrapper.style.width = this.W + "px";
    this.canvWrapper.style.height = this.H + "px";
  },

  mouse: {
    pressed: false,
    touched: false,
    x:[], y:[]
  },

  destroy: function() {
    this.detachEvents();
    Graffiti.hstorage = [];
    Graffiti.gstorage = [];
    Graffiti.checkPoint = "";
  },

  events: {
    controls: function(e) {
      Graffiti.handleControlsEvents(e);
      return cancelEvent(e);
    },
    drawing: function(e) {
      Graffiti.handleDrawingEvents(e);
      return cancelEvent(e);
    },
    all: function(e) {
      Graffiti.handleDrawingEvents(e);
      Graffiti.handleControlsEvents(e);
      Graffiti.handleResize(e);
      if (e.type == 'mousemove' || e.type == 'touchmove') {
        return cancelEvent(e);
      }
    },
    color: function(e) {
      Graffiti.handleColorPickerEvents(e);
      return cancelEvent(e);
    },
    controlsF: function(e) {
      Graffiti.handleControlsEvents(e);
      return false;
    },
    keyboard: function(e) {
      if (!Graffiti.keyboardEvents(e)) {
        return cancelEvent(e);
      }
    },
    cancel: function(e) {
      return cancelEvent(e);
    },
    resize: function(e) {
      Graffiti.handleResize(e);
      return cancelEvent(e);
    }
  },

  attachEvents: function() {
    var evs = Graffiti.events;
    if (window.navigator.msPointerEnabled) {
      addEvent(Graffiti.controlsCanv, "MSPointerDown MSPointerMove MSPointerUp" , evs.controls);
      addEvent(Graffiti.overlayCanv, "MSPointerDown MSPointerMove MSPointerUp", evs.drawing); // no canceling
      addEvent(Graffiti.cpCanv, "MSPointerDown MSPointerMove", evs.color);
    } else {
      addEvent(Graffiti.controlsCanv, "mousedown click touchstart touchmove touchend" , evs.controls);
      addEvent(window, "mousemove mouseup touchmove touchend", evs.all);
      addEvent(Graffiti.overlayCanv, "mousedown click touchstart touchmove touchend", evs.drawing);
      addEvent(Graffiti.cpCanv, "mousemove click touchstart touchmove", evs.color);
    }
    addEvent(Graffiti.controlsCanv, "DOMMouseScroll mousewheel", evs.controlsF);
    addEvent(document, "keydown keyup", evs.keyboard);
    addEvent(document, "contextmenu", evs.cancel);
    addEvent(document.body, "selectstart", evs.cancel);
    addEvent(Graffiti.resizer, "mousedown", evs.resize);
  },


  detachEvents: function() {
    var evs = Graffiti.events;
    if (window.navigator.msPointerEnabled) {
      removeEvent(Graffiti.controlsCanv, "MSPointerDown MSPointerMove MSPointerUp" , evs.controls);
      removeEvent(Graffiti.overlayCanv, "MSPointerDown MSPointerMove MSPointerUp", evs.drawing); // no canceling
      removeEvent(Graffiti.cpCanv, "MSPointerDown MSPointerMove", evs.color);
    } else {
      removeEvent(Graffiti.controlsCanv, "mousedown click touchstart touchmove touchend" , evs.controls);
      removeEvent(window, "mousemove mouseup touchmove touchend", evs.all);
      removeEvent(Graffiti.overlayCanv, "mousedown click touchstart touchmove touchend", evs.drawing);
      removeEvent(Graffiti.cpCanv, "mousemove click touchstart touchmove touchend", evs.color);
    }
    removeEvent(Graffiti.controlsCanv, "DOMMouseScroll mousewheel", evs.controlsF);
    removeEvent(document, "keydown keyup", evs.keyboard);
    removeEvent(document.body, "selectstart", evs.cancel);
    removeEvent(Graffiti.resizer, "mousedown", evs.resize);
    removeEvent(document, "contextmenu", evs.cancel);
  },

  handleResize: function(e) {
    if (e.button == 2) {
      return;
    }
    switch(e.type) {
      case "mousedown":
        document.body.style.cursor = "s-resize";
        Graffiti.controlsCanv.style.cursor = "s-resize";
        var mouse = Graffiti.getMouseXY(e, window);
        Graffiti.resDif = mouse.y;
        Graffiti.resizing = true;
        Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
      break;

      case "mousemove":
        if(Graffiti.resizing) {
          var mouse = Graffiti.getMouseXY(e, window);
          var height = parseInt(Graffiti.canvWrapper.style.height);
          var width = parseInt(Graffiti.canvWrapper.style.width);
          var newHeight = height + mouse.y - Graffiti.resDif;
          if(newHeight > 586) newHeight = 586;
          if(newHeight < 293) newHeight = 293;
          var newWidth = newHeight / Graffiti.H * Graffiti.W;
          Graffiti.resW = newWidth;
          Graffiti.resH = newHeight;
          Graffiti.canvWrapper.style.width = newWidth + "px";
          Graffiti.canvWrapper.style.height = newHeight + "px";
          if (Graffiti.onResize) {
            Graffiti.onResize(newWidth, newHeight);
          }
          Graffiti.resDif = mouse.y;
        }
      break;

      case "mouseup":
        if(Graffiti.resizing) {
          Graffiti.resizing = false;
          Graffiti.resDif = 0;
          Graffiti.controlsCanv.style.cursor = "default";
          document.body.style.cursor = "default";
          Graffiti.factor = Graffiti.resH / 293;
          Graffiti.W = Graffiti.resW;
          Graffiti.H = Graffiti.resH;
          Graffiti.resizeCanvases(Graffiti.resW, Graffiti.resH);
          Graffiti.copyImage(Graffiti.mainCtx);
        }
      break;
    }
  },

  copyImage: function(ctx, callback) {
    if (Graffiti.checkPoint != '') {
      var img = vkImage();
      img.src = Graffiti.checkPoint;
      img.onload = function() {
        ctx.drawImage(img, 0, 0, Graffiti.W, Graffiti.H);
        Graffiti.propDraw(ctx, Graffiti.hstorage, 0, Graffiti.hstorage.length);
        if (callback) {
          callback();
        }
      }
    } else {
      Graffiti.propDraw(ctx, Graffiti.hstorage, 0, Graffiti.hstorage.length);
      if (callback) {
        callback();
      }
    }
  },

  keyboardBlocked: false,
  shiftPressed: false,

  keyboardEvents: function(e) {
    switch(e.type) {
      case "keydown":
        if(e.shiftKey || e.keyCode == 16) {
          Graffiti.drawPath = true;
          return true;
        }
        switch(e.keyCode) {
          case 90:
            if(!e.ctrlKey) return;
            if(Graffiti.keyboardBlocked) return;
            Graffiti.keyboardBlocked = true;
            Graffiti.backHistory();
            return true;
          break;
          case 70:
            if(!e.ctrlKey) return;
            Graffiti.fullScreen();
            return true;
          break;
        }
      break;
      case "keyup":
        if(e.shiftKey || e.keyCode == 16) {
          Graffiti.stopDrawPathLine();
          return true;
        }
        if(e.keyCode == 90) {
          Graffiti.keyboardBlocked = false;
          return true;
        }
      break;
    }
  },

  handleControlsEvents: function(e) {
    switch(e.type) {
      case "touchstart":
      case "MSPointerDown":
        Graffiti.handleColorBtn(e);
      case "mousedown":
        var mouse = Graffiti.getMouseXY(e, Graffiti.controlsCanv);
        var sl = Graffiti.sliders;
        for(var i=0; i < sl.length; i++) {
          if(mouse.x >= sl[i].x && mouse.x <= sl[i].x+100) {
            if(mouse.y >= sl[i].y-10.5 && mouse.y <= sl[i].y+6) {
              if(mouse.x > sl[i].x+95) mouse.x -=4;
              Graffiti.redrawSlider(sl[i].id, Graffiti.controlsCtx, {x:sl[i].x, y:sl[i].y}, mouse.x);
              Graffiti.sliders[i].holder = mouse.x;
              Graffiti.aboveSlider.status = true;
              Graffiti.aboveSlider.index = i;
            }
          }
        }
      break;
      case "touchmove":
      case "MSPointerMove":
      case "mousemove":
        if(!(Graffiti.mouse.pressed || Graffiti.mouse.touched) && !Graffiti.resizing) {
          var mouse = Graffiti.getMouseXY(e, Graffiti.controlsCanv);
          if(Graffiti.aboveSlider.status) {
              var cs = Graffiti.sliders[Graffiti.aboveSlider.index];
            if(mouse.x > cs.x && mouse.x < cs.x + 95) {
              Graffiti.redrawSlider(cs.id, Graffiti.controlsCtx, {x:cs.x, y:cs.y}, mouse.x);
              Graffiti.sliders[Graffiti.aboveSlider.index].holder = mouse.x;
            } else {
              if(mouse.x < cs.x) {
                Graffiti.redrawSlider(cs.id, Graffiti.controlsCtx, {x:cs.x, y:cs.y}, cs.x);
                Graffiti.sliders[Graffiti.aboveSlider.index].holder = cs.x;
                }
              if(mouse.x > cs.x+95) {
                Graffiti.redrawSlider(cs.id, Graffiti.controlsCtx, {x:cs.x, y:cs.y}, cs.x+95);
                Graffiti.sliders[Graffiti.aboveSlider.index].holder = cs.x+95;
              }
            }
          } else {
            var xy = Graffiti.cpbXY;
            if(mouse.x >= xy.x-8 && mouse.x <= xy.x + 23) {
              if(mouse.y >= xy.y-5 && mouse.y <= xy.y + 25) {
                Graffiti.controlsCanv.style.cursor = "pointer";
                Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x,
                Graffiti.gpXY.y, Graffiti.brush.color, true);
              } else {
                Graffiti.controlsCanv.style.cursor = "default";
                Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x,
                Graffiti.gpXY.y, Graffiti.brush.color, false);
              }
            } else {
              Graffiti.controlsCanv.style.cursor = "default";
              Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x,
              Graffiti.gpXY.y, Graffiti.brush.color, false);
            }
          }
        }
      break;
      case "click":
        Graffiti.handleColorBtn(e);
      break;
      case "MSPointerUp":
      case "touchend":
      case "mouseup":
        if(Graffiti.aboveSlider.status) {
          Graffiti.aboveSlider.status = false;
        }
      break;
      case "DOMMouseScroll":
        Graffiti.handleWheelAboveSlider(e);
      break;
      case "mousewheel":
        Graffiti.handleWheelAboveSlider(e);
      break;
      default:
        throw new Error(e.type);
      break;
    }
  },

  handleColorBtn: function(e) {
    var xy = Graffiti.cpbXY;
    var mouse = Graffiti.getMouseXY(e, Graffiti.controlsCanv);
    if(mouse.x >= xy.x-8 && mouse.x <= xy.x + 23) {
      if(mouse.y >= xy.y-5 && mouse.y <= xy.y + 25) {
        if(!Graffiti.cpActive) {
          Graffiti.cpActive = true;
          Graffiti.cpWrapper.style.display = "block";
          animate(Graffiti.cpWrapper, {opacity: 1, top: -250}, 200);
        } else {
          Graffiti.cpActive = false;
          animate(Graffiti.cpWrapper, {opacity: 0, top: -210}, 200, function() {
            Graffiti.cpWrapper.style.display = "none";
          });
        }
      }
    }

  },


  sliders: [], aboveSlider: { status:false, index:0 },

  addSlider: function(id, ctx, x, y, holder) {
    this.redrawSlider(id, ctx, {x:x, y:y}, x+holder);
    this.drawAboveSliderLines(ctx, x, y);
    this.sliders.push({id:id, x:x, y:y, holder:x+holder});
  },

  redrawSlider: function(id, ctx, sliderXY, holder) {
    var oldX = sliderXY.x;
    var oldY = sliderXY.y;
    var newX = holder;
    ctx.clearRect(oldX-3.5, oldY-3, 108, 12);
    this.drawSliderLine(ctx, oldX, oldY);
    this.drawSliderHolder(ctx, newX-3, oldY);
    this.slideEventHandler(id, sliderXY, holder);
  },

  drawSliderLine: function(ctx, x, y) {
    ctx.lineJoin = "miter";
    ctx.lineCap = "square";
    ctx.strokeStyle = "#BFBFBF";
    ctx.fillStyle = "#E4E4E4";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.fillRect(x+0.5, y+0.5, 100, 4);
    ctx.strokeRect(x+0.5, y+0.5, 100, 4);
    ctx.closePath();
  },

  drawSliderHolder: function(ctx, x, y) {
    ctx.lineJoin = "miter";
    ctx.lineCap = "square";
    ctx.strokeStyle = "#ABB8C7";
    ctx.fillStyle = "#DAE1E8";
    ctx.beginPath();
    ctx.fillRect(x+0.5, y-2.5, 7, 11);
    ctx.strokeRect(x+0.5, y-2.5, 7, 11);
    ctx.closePath();
  },

  drawAboveSliderLines: function(ctx, x, y) {
    ctx.strokeStyle = "#BFBFBF";
    ctx.lineWidth = 1;
    var tempX = x+10.5;
    var tempY = y-4;
    for(var i=0; i<9; i++) {
      ctx.beginPath();
      ctx.moveTo(tempX, tempY-6);
      ctx.lineTo(tempX, tempY);
      tempX += 10;
      ctx.stroke();
      ctx.closePath();
    }
  },

  handleWheelAboveSlider: function(e) {
    var delta = 0;
    var dif = 0;
    if(e.wheelDelta) {
      delta = e.wheelDelta / 120;
    } else if(e.detail) {
      delta = -e.detail/3;
    }
    if(delta) {
      delta = delta * 10;
      dif = delta;
      var mouse = Graffiti.getMouseXY(e, Graffiti.controlsCanv);
      var sl = Graffiti.sliders;
      for(var i=0; i < sl.length; i++) {
        if(mouse.x >= sl[i].x && mouse.x <= sl[i].x+100) {
          if(mouse.y >= sl[i].y-10.5 && mouse.y <= sl[i].y+6) {
            if((sl[i].holder + delta) < sl[i].x) {
              dif = sl[i].x - sl[i].holder;
            }
            if ((sl[i].holder + delta) > sl[i].x + 95) {
              dif = sl[i].x+95 - sl[i].holder;
            }
            if(dif == 0) return;
            Graffiti.redrawSlider(sl[i].id, Graffiti.controlsCtx, { x: sl[i].x, y: sl[i].y }, sl[i].holder+dif);
            Graffiti.sliders[i].holder = sl[i].holder+dif;
          }
        }
      }
    }
  },

  slideEventHandler: function(id, sliderXY, holder) {
    var _curpos = holder-sliderXY.x;
    switch(id) {
      case "size":
        var _s = _curpos;
        if(_s < 1) _s = 1;
        Graffiti.brush.size = ((_s/95*100)/100).toFixed(2) * 64;
        Graffiti.updateSample();
      break;
      case "opacity":
        var _op = (Math.max(Math.min((_curpos/95*100)/100, 1), 0)).toFixed(2);
        if( _op < 0.01 ) _op = 0.01;
        Graffiti.brush.opacity = _op;
        Graffiti.updateSample();
      break;
      default:
        throw new Error("Slider " + id + " is not exist");
      break;
    }
  },

  redrawColorPickerButton: function(ctx, x, y, color, mouseover) {
    Graffiti.gpXY.x = x;
    Graffiti.gpXY.y = y;
    ctx.clearRect(x-3, y-10, 20, 27);
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgb("+color+")";
    ctx.beginPath();
    ctx.fillRect(x, y-1, 13, 13);
    ctx.closePath();
    var _x = x-1;
    var fs;
    if(!mouseover) {
      fs = "rgb(218, 225, 232)";
    } else {
      fs = "rgb(255, 255, 255)";
    }
    ctx.strokeStyle = "rgb(171, 184, 199)";
    ctx.fillStyle = fs;
    ctx.lineCap = "square";
    ctx.lineJoin = "miter";
    ctx.beginPath();
    ctx.moveTo(_x, y-3.5);
    ctx.lineTo(_x+15, y-3.5);
    ctx.lineTo(_x+7.5, y-8.5);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    Graffiti.cpbXY.x = x-1;
    Graffiti.cpbXY.y = y-9;
  },

  updateSample: function() {
    var size = Graffiti.brush.size;
    var opacity = Graffiti.brush.opacity;
    var ctx = Graffiti.controlsCtx;
    ctx.clearRect(0, 0, 66, 66);
    ctx.strokeStyle = "rgba("+Graffiti.brush.color+", "+opacity+")";
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(63.5/2, (63.5/2)+2);
    ctx.lineTo((63.5/2) + 0.51, (63.5/2)+2);
    ctx.stroke();
    ctx.closePath();
  },


  labels: [],

  addText: function(ctx, str, x, y) {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.font = "11px Tahoma, Arial, Verdana, Sans-Serif, Lucida Sans";
    ctx.beginPath();
    ctx.fillText(str, Math.floor(x+0.5), Math.floor(y+0.5));
    ctx.closePath();
  },


  hstorage: [],

  gstorage: [],

  checkPoint: "",

  saveBuffer: 100,

  pushHistory: function(c) {
    Graffiti.gstorage.push(c);
    Graffiti.hstorage.push(c);
    if(Graffiti.hstorage.length != Graffiti.saveBuffer * 2) return;
    Graffiti.histHelpCtx.clearRect(0, 0, 1172, 586);
    if (Graffiti.checkPoint != '') {
      var img = vkImage();
      img.src = Graffiti.checkPoint;
      img.onload = function() {
        Graffiti.histHelpCtx.drawImage(img, 0, 0, 1172, 586);
        histdraw();
      }
    } else {
      histdraw();
    }
    function histdraw() {
      var m = Graffiti.hstorage;
      var _x = [];
      var _y = [];
      var _s;
      var fact;
      for(var i=0; i<Graffiti.saveBuffer; i++) {
        fact = m[i].factor;
        for(var j=0; j<m[i].mouse.x.length; j++) {
          _x.push(m[i].mouse.x[j] / fact * 2);
          _y.push(m[i].mouse.y[j] / fact * 2);
        }
        _s = m[i].size / fact * 2;
        Graffiti.draw(Graffiti.histHelpCtx, {mouse : {x:_x, y: _y}, size: _s, color: m[i].color, opacity: m[i].opacity});
        _x = [];
        _y = [];
      }
      Graffiti.checkPoint = Graffiti.histHelpCanv.toDataURL();
      var img = vkImage();
      img.src = Graffiti.checkPoint;
      img.onload = function() {
        Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
        Graffiti.mainCtx.drawImage(img, 0, 0, Graffiti.W, Graffiti.H);
        Graffiti.propDraw(Graffiti.mainCtx, Graffiti.hstorage, Graffiti.saveBuffer, Graffiti.hstorage.length);
        Graffiti.hstorage.splice(0, Graffiti.saveBuffer);
      }
    }
  },

  backBlocked: false,
  backQueue: 0,
  globalBlock: false,

  backHistory: function() {
    if(Graffiti.globalBlock) return;
    if(this.hstorage.length == 0) {
      Graffiti.backQueue = 0;
      if(this.checkPoint == "") {
        return false;
      } else {

        Graffiti.hstorage = [];
        Graffiti.checkPoint = "";
        fadeOut(Graffiti.mainCanv, 200, function() {
          Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
          Graffiti.mainCanv.style.display = "block";
        });
      }
    } else {
      if(Graffiti.backBlocked) {
        Graffiti.backQueue++;
        return;
      }
      Graffiti.backBlocked = true;
      var m = Graffiti.hstorage;
      if(Graffiti.checkPoint != '') {
        var img = vkImage();
        img.src = Graffiti.checkPoint;
        img.onload = function() {
          Graffiti.helpCanv.style.backgroundColor = "#FFFFFF";
          Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
          Graffiti.mainCtx.drawImage(img, 0, 0, Graffiti.W, Graffiti.H);
          Graffiti.helpCtx.drawImage(img, 0, 0, Graffiti.W, Graffiti.H);
          rd();
        }
      } else {
        Graffiti.helpCanv.style.backgroundColor = "#FFFFFF";
        Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
        rd();
      }
    }
    function rd() {
      Graffiti.propDraw(Graffiti.helpCtx, Graffiti.hstorage, 0, Graffiti.hstorage.length);
      Graffiti.propDraw(Graffiti.mainCtx, Graffiti.hstorage, 0, Graffiti.hstorage.length-1);
      fadeOut(Graffiti.helpCanv, 200, function() {
        Graffiti.helpCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
        Graffiti.helpCanv.style.backgroundColor = "";
        Graffiti.helpCanv.style.display = "block";
        Graffiti.backBlocked = false;
        if(Graffiti.backQueue > 0) {
          for(var i=0; i<Graffiti.backQueue; i++) {
            Graffiti.backHistory();
            Graffiti.backQueue--;
          }
        }
      });
      Graffiti.hstorage.pop();
      Graffiti.gstorage.pop();
    }
  },

  flushHistory: function() {
    fadeOut(Graffiti.mainCanv, 200, function() {
      Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
      Graffiti.mainCanv.style.display = "block";
      Graffiti.checkPoint = "";
      Graffiti.hstorage = [];
      Graffiti.gstorage = [];
    });
  },

  draw: function(ctx, hist) {
    var mouse, color, size, opacity;
    if(hist) {
      mouse = hist.mouse;
      color = hist.color;
      opacity = hist.opacity;
      size = hist.size;
    } else {
      mouse = Graffiti.mouse;
      color = Graffiti.brush.color;
      size = Graffiti.brush.size * Graffiti.factor;
      opacity = Graffiti.brush.opacity;
    }
    ctx.strokeStyle = "rgba("+color+", "+opacity+")";
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if(mouse.x.length < 2) {
      ctx.moveTo(mouse.x[0], mouse.y[0]);
      ctx.lineTo(mouse.x[0] + 0.51, mouse.y[0]);
      ctx.stroke();
      ctx.closePath();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(mouse.x[0], mouse.y[0]);
    ctx.lineTo((mouse.x[0] + mouse.x[1]) * 0.5, (mouse.y[0] + mouse.y[1]) * 0.5);
    var i = 0;
    while(++i < (mouse.x.length -1)) {
      var abs1 = Math.abs(mouse.x[i-1] - mouse.x[i]) + Math.abs(mouse.y[i-1] - mouse.y[i])
      + Math.abs(mouse.x[i] - mouse.x[i+1]) + Math.abs(mouse.y[i] - mouse.y[i+1]);
      var abs2 = Math.abs(mouse.x[i-1] - mouse.x[i+1]) + Math.abs(mouse.y[i-1] -  mouse.y[i+1]);
        if(abs1 > 10 && abs2 > abs1 * 0.8) {
          ctx.quadraticCurveTo(mouse.x[i], mouse.y[i], (mouse.x[i] + mouse.x[i+1]) * 0.5, (mouse.y[i] + mouse.y[i+1]) * 0.5);
          continue;
        }
    ctx.lineTo(mouse.x[i], mouse.y[i]);
    ctx.lineTo((mouse.x[i] + mouse.x[i+1]) * 0.5, (mouse.y[i] + mouse.y[i+1]) * 0.5);
    }
    ctx.lineTo(mouse.x[mouse.x.length-1], mouse.y[mouse.y.length-1]);
    ctx.moveTo(mouse.x[mouse.x.length-1], mouse.y[mouse.y.length-1]);
    ctx.stroke();
    ctx.closePath();
  },

  propDraw: function(ctx, storage, from, to) {
    var m = storage;
    var _x = [];
    var _y = [];
    var _s;
    var fact;
    for(var i=from; i<to; i++) {
      fact = m[i].factor;
      for(var j=0; j<m[i].mouse.x.length; j++) {
        _x.push(m[i].mouse.x[j] / fact * Graffiti.factor);
        _y.push(m[i].mouse.y[j] / fact * Graffiti.factor);
      }
      _s = m[i].size / fact * Graffiti.factor
      Graffiti.draw(ctx, {mouse : {x:_x, y: _y}, size: _s, color: m[i].color, opacity: m[i].opacity});
      _x = [];
      _y = [];
    }
  },

  drawPath: false,

  handleDrawingEvents: function(e) {
    var mouse = Graffiti.getMouseXY(e, Graffiti.overlayCanv);
    if (!e.which && e.button) {
      if (e.button & 1) e.which = 1
      else if (e.button & 4) e.which = 2
      else if (e.button & 2) e.which = 3
    }
    switch(e.type) {
      case "touchstart":
        if(!Graffiti.drawPath) {
          Graffiti.mouse.touched = true;
          Graffiti.mouse.x = [mouse.x];
          Graffiti.mouse.y = [mouse.y];
          Graffiti.draw(Graffiti.overlayCtx);
        }
        break;
      case "MSPointerDown":
      case "mousedown":
        if(e.which == 1) {
          if(!Graffiti.drawPath) {
            Graffiti.mouse.pressed = true;
            Graffiti.mouse.x = [mouse.x];
            Graffiti.mouse.y = [mouse.y];
            Graffiti.draw(Graffiti.overlayCtx);
          }
        }
        if(e.which == 3) {
          Graffiti.drawPath = true;
        }
      break;
      case "click":
        if(e.which == 1) {
          if (Graffiti.drawPath) {
            Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
            Graffiti.mouse.x.push(mouse.x);
            Graffiti.mouse.y.push(mouse.y);
            Graffiti.draw(Graffiti.overlayCtx);
          }
        }
      break;
      case "touchmove":
        if (Graffiti.mouse.touched) {
          Graffiti.handleMouseMove(mouse);
        }
      break;
      case "MSPointerMove":
      case "mousemove":
        if (Graffiti.mouse.pressed) {
          Graffiti.handleMouseMove(mouse);
        }
      break;
      case "touchend":
        if (Graffiti.mouse.touched) {
          Graffiti.handleMouseUp(mouse);
        }
        break;
      case "MSPointerUp":
      case "mouseup":
        if(e.which == 1) {
          if (Graffiti.mouse.pressed) {
            Graffiti.handleMouseUp(mouse);
          }
        }
        if(e.which == 3) {
          Graffiti.stopDrawPathLine();
        }
      break;
    }
  },

  handleMouseMove: function(mouse) {
    var _m = Graffiti.mouse;
    if(_m.x == mouse.x && _m.y == mouse.y) {
      return;
    } else {
      Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
    }
    Graffiti.mouse.x.push(mouse.x);
    Graffiti.mouse.y.push(mouse.y);
    Graffiti.draw(Graffiti.overlayCtx);
  },

  handleMouseUp: function(mouse) {
    Graffiti.mouse.pressed = false;
    Graffiti.mouse.touched = false;
    Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
    Graffiti.draw(Graffiti.mainCtx);
    Graffiti.pushHistory({mouse : {x: Graffiti.mouse.x, y: Graffiti.mouse.y},
    color: Graffiti.brush.color, size: Graffiti.brush.size * Graffiti.factor, opacity: Graffiti.brush.opacity, factor: Graffiti.factor});
    Graffiti.mouse.x = [];
    Graffiti.mouse.y = [];
  },

  stopDrawPathLine: function() {
    Graffiti.drawPath = false;
    Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
    Graffiti.draw(Graffiti.mainCtx);
    Graffiti.pushHistory({mouse : {x: Graffiti.mouse.x, y: Graffiti.mouse.y},
    color: Graffiti.brush.color, size: Graffiti.brush.size * Graffiti.factor, opacity: Graffiti.brush.opacity, factor: Graffiti.factor});
    Graffiti.mouse.x = [];
    Graffiti.mouse.y = [];
  },

  handleColorPickerEvents: function(e) {
    switch(e.type) {
      case "MSPointerMove":
      case "touchmove":
      case "mousemove":
        Graffiti.handleColorMoveEvent(e);
      break;
      case "MSPointerDown":
      case "touchstart":
        Graffiti.handleColorMoveEvent(e);
      case "click":
        var ctx = Graffiti.cpCtx;
        var ac = Graffiti.cpActiveCell;
        var pixelX = (ac.cellX * 14) + 7;
        var pixelY = (ac.cellY * 14) + 7;
        var _ = ctx.getImageData(pixelX, pixelY, 1, 1).data;
        var color = [].slice.call(_, 0, 3).join();
        Graffiti.brush.color = color;
        Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x, Graffiti.gpXY.y, color, false);
        Graffiti.updateSample();
        Graffiti.cpActive = false;
        animate(Graffiti.cpWrapper, {opacity: 0, top: -210}, 200, function() {
          Graffiti.cpWrapper.style.display = "none";
        });
      break;
      default:
        throw new Error(e.type);
      break;
    }
  },

  handleColorMoveEvent: function(e) {
    var mouse = Graffiti.getMouseXY(e, Graffiti.cpCanv);
    var cellX = Math.floor((mouse.x)/14);
    var cellY = Math.floor((mouse.y)/14);
    if(cellY > 11) return;
    if(cellX > 17) return;
    var ctx = Graffiti.cpCtx;
    ctx.lineWidth = 1;
    ctx.lineJoin = "miter";
    ctx.lineCap = "butt";
    var lc = Graffiti.cpLastCell;
    if(lc.length > 0) {
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.strokeRect((lc[0].x * 14)+0.5, (lc[0].y * 14)+0.5, 14, 14);
      ctx.closePath();
      Graffiti.cpLastCell = [];
    }
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.strokeRect((cellX * 14)+0.5, (cellY * 14)+0.5, 14, 14);
    ctx.closePath();
    Graffiti.cpLastCell.push({x : cellX, y : cellY});
    Graffiti.cpActiveCell.cellX = cellX;
    Graffiti.cpActiveCell.cellY = cellY;
  },

  cpbXY: {}, gpXY: {},
  cpActive:false,
  drawColorPicker: function(ctx) {
    var cs = 14;
    var colors = [];
    ctx.lineWidth = 1;
    for(var r=0; r<6; r++) {
      for(var g=0; g<6; g++) {
        for(var b=0; b<6; b++) {
          colors[r*36+g*6+b] = "rgb("+(r/5*255)+","+(g/5*255)+","+(b/5*255)+")";
        }
      }
    }
    for(var j=0; j<12; j++) {
      for(var i=0; i<18; i++) {
        var _r = Math.floor(i / 6) + 3 * Math.floor(j / 6);
        var _g = i % 6;
        var _b = j % 6;
        var _n = _r * 36 + _g * 6 + _b;
        ctx.fillStyle = colors[_n];
        ctx.strokeStyle = "rgb(0, 0, 0)";
        var _x = Math.floor(i*14)+0.5;
        var _y = Math.floor(j*14)+0.5;
        ctx.fillRect(_x, _y, _x+cs, _x+cs);
        ctx.strokeRect(_x, _y, _y+cs, _y+cs);
      }
    }
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.moveTo(252.5, 0);
    ctx.lineTo(252.5, 168.5);
    ctx.moveTo(252.5, 168.5);
    ctx.lineTo(0, 168.5);
    ctx.closePath();
    ctx.stroke();
  },

  cpActiveCell: {cellX: 0, cellY: 0},
  cpLastCell: [],


  blockResize: false,
  fsEnabled: false,
  fullScreen: function() {
    if (Graffiti.mouse.pressed || Graffiti.mouse.touched) return;
    if (Graffiti.blockResize) return;
    if (!this.fsEnabled) {
      this.fsEnabled = true;
      Graffiti.blockResize = true;
      setStyle(Graffiti.canvWrapper, {marginTop: -185, marginLeft: 18});
      addClass(Graffiti.grWrapper, 'graffiti_fullscreen');
      Graffiti.boxPos = getXY(curBox().bodyNode, true);

      setStyle(Graffiti.grWrapper, {
        top: Graffiti.boxPos[1],
        left: Graffiti.boxPos[0],
        height: Graffiti.H + 141,
        width: Graffiti.W + 45
      });

      var width = Math.min(window.innerWidth - 40, 586 * 2);
      var height = Math.min(intval((293 / 586) * width), window.innerHeight - 120);
      width = height * (586 / 293);

      Graffiti.W = width;
      Graffiti.H = height;

      Graffiti.factor = Graffiti.H / 293;

      hide(Graffiti.mainCanv);

      animate(Graffiti.grWrapper, {
        top: 0,
        left: 0,
        height: window.innerHeight,
        width: bodyNode.scrollWidth
      }, 200);
      animate(Graffiti.canvWrapper, {
        width: Graffiti.W,
        height: Graffiti.H,
        marginTop: -Math.floor((Graffiti.H + 75) / 2),
        marginLeft: ((window.innerWidth - Graffiti.W) / 2)
      }, 200, function() {

        show(Graffiti.mainCanv);

        Graffiti.resizeCanvases(Graffiti.W, Graffiti.H)
        Graffiti.copyImage(Graffiti.mainCtx);
        Graffiti.blockResize = false;
        Graffiti.rzLink.innerHTML = cur.lang['graffiti_normal_size'];

        setStyle(Graffiti.grWrapper, {height: '100%', width: '100%'});
      });
    } else {
      this.fsEnabled = false;
      Graffiti.blockResize = true;

      Graffiti.W = Graffiti.resW || 586;
      Graffiti.H = Graffiti.resH || 293;

      Graffiti.factor = Graffiti.H / 293;

      hide(Graffiti.mainCanv);

      animate(Graffiti.grWrapper, {
        top: Graffiti.boxPos[1],
        left: Graffiti.boxPos[0],
        height: Graffiti.H + 140,
        width: Graffiti.W + 45
      }, 200);

      animate(Graffiti.canvWrapper, {
        width: Graffiti.W,
        height: Graffiti.H,
        marginTop: -185,
        marginLeft: 22
      }, 200, function() {

        show(Graffiti.mainCanv);

        Graffiti.resizeCanvases(Graffiti.W, Graffiti.H)

        Graffiti.copyImage(Graffiti.mainCtx);
        Graffiti.blockResize = false;
        Graffiti.rzLink.innerHTML = cur.lang['graffiti_full_screen'];

        removeClass(Graffiti.grWrapper, 'graffiti_fullscreen');
        setStyle(Graffiti.grWrapper, {height: 'auto', width: '100%'});
        setStyle(Graffiti.canvWrapper, {margin: '0 auto'});
      });
    }
  },

  resizeCanvases: function(w, h) {
    Graffiti.mainCanv.width = w;
    Graffiti.mainCanv.height = h;
    Graffiti.overlayCanv.width = w;
    Graffiti.overlayCanv.height = h;
    Graffiti.helpCanv.width = w;
    Graffiti.helpCanv.height = h;
    Graffiti.helpCanv.style.top = (-1 * (h*2)).toFixed()+"px";
    Graffiti.overlayCanv.style.top = (-1 * (h))+"px";
  },

  exportBlocked: false,

  exportSVG: function(needStr) {
    if (Graffiti.exportBlocked) return;
    Graffiti.exportBlocked = true;
    var svg = '<?xml version="1.0" standalone="yes"?>';
    svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    svg += '<svg width="1172px" height="586px" viewBox="0 0 1172 586" xmlns="http://www.w3.org/2000/svg" version="1.1">';
    if (Graffiti.gstorage.length != 0) {
      for (var i=0; i<Graffiti.gstorage.length; i++) {
        svg += Graffiti.drawSVG(Graffiti.gstorage[i]);
      }
    }
    svg += "</svg>";
    Graffiti.exportBlocked = false;
    if (needStr) {
      return svg;
    } else {
      var savewindow = window.open("data:image/svg+xml,"+encodeURIComponent(svg));
      window.focus();
    }
  },

  drawSVG: function(params) {
    var str = '<path d="';
    var color, size, opacity;
    var mouse = { x: [], y: [] };
    var fact = params.factor;
    for(var i=0; i<params.mouse.x.length; i++) {
      mouse.x.push(params.mouse.x[i] / fact * 2);
      mouse.y.push(params.mouse.y[i] / fact * 2);
    }
    color = params.color;
    opacity = params.opacity;
    size = params.size / fact * 2;
    if(mouse.x.length < 2) {
      str += "M"+mouse.x[0] + ","+mouse.y[0]+" ";
      str += "L"+(mouse.x[0] + 0.51) + "," + mouse.y[0] + " ";
      str += '" fill="none" stroke="rgb('+color+')" stroke-opacity="'+opacity+'" stroke-width="'+size+'" stroke-linecap="round" stroke-linejoin="round" />';
      return str;
    }
    str += "M"+mouse.x[0]+","+mouse.y[0]+" ";
    str += "L"+((mouse.x[0] + mouse.x[1]) * 0.5)+","+((mouse.y[0] + mouse.y[1]) * 0.5)+" ";
    var i = 0;
    while(++i < (mouse.x.length -1)) {
      var abs1 = Math.abs(mouse.x[i-1] - mouse.x[i]) + Math.abs(mouse.y[i-1] - mouse.y[i])
      + Math.abs(mouse.x[i] - mouse.x[i+1]) + Math.abs(mouse.y[i] - mouse.y[i+1]);
      var abs2 = Math.abs(mouse.x[i-1] - mouse.x[i+1]) + Math.abs(mouse.y[i-1] -  mouse.y[i+1]);
        if(abs1 > 10 && abs2 > abs1 * 0.8) {
          str += "Q" + mouse.x[i] + "," + mouse.y[i] +" "+ ((mouse.x[i] + mouse.x[i+1]) * 0.5)+","+((mouse.y[i] + mouse.y[i+1]) * 0.5)+" ";
          continue;
        }
    str += "L"+mouse.x[i]+","+mouse.y[i]+" ";
    str += "L"+((mouse.x[i] + mouse.x[i+1]) * 0.5)+","+((mouse.y[i] + mouse.y[i+1]) * 0.5)+" ";
    }
    str += "L" + mouse.x[mouse.x.length-1] + "," + mouse.y[mouse.y.length-1] + " ";
    str += '" fill="none" stroke="rgb('+color+')" stroke-opacity="'+opacity+'" stroke-width="'+size+'" stroke-linecap="round" stroke-linejoin="round" />';
    return str;
  },

  getMouseXY: function(e, obj) {
      var cursor = {};
      var objpos = getXY(obj);
      if (e.type && e.type.substr(0, 5) == 'touch') {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        cursor.x = touch.pageX - objpos[0];
        cursor.y = touch.pageY - objpos[1];
      } else {
        cursor.x = e.pageX - objpos[0];
        cursor.y = e.pageY - objpos[1];
      }
      /*if (browser.opera && (obj == Graffiti.controlsCanv)) {
        cursor.y += scrollGetY();
      }*/
      return cursor;
  },

  isChanged: function() {
    return (Graffiti.hstorage.length || Graffiti.checkPoint);
  },

  getImage: function(callback) {
    var b = {w: Graffiti.W, h: Graffiti.H, f: Graffiti.factor};
    /*Graffiti.factor = 1;
    Graffiti.W = 586;
    Graffiti.H = 293;*/

    Graffiti.factor = 1280/586;
    Graffiti.W = 1280;
    Graffiti.H = 640;

    var saveCanv = ce('canvas', {width: Graffiti.W, height: Graffiti.H});
    var ctx = saveCanv.getContext('2d');
    Graffiti.copyImage(ctx, function() {
      Graffiti.factor = b.f;
      Graffiti.W = b.w;
      Graffiti.H = b.h;
      callback(saveCanv.toDataURL());
    });
  }
}

try{stManager.done('graffiti.js');}catch(e){}
