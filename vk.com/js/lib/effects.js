var effects = {
	fader: function() {
		this.defaultstyles = [ "backgroundColor", "borderColor", "color" ];
		this.elems = null;
		this.dstcolors = null;
		this.colors = new Array;
		this.deltas = new Array;
		this.counter = 0;
		this.timeoutHandle = 0;
		this.onEnd = null;
		this.getColor = function(elem, colortype) {
			do {
				color = css.getStyle(elem, colortype == "borderColor" ? "borderLeftColor" : colortype);
			} while((elem = elem.parentNode) && color == 'transparent');
			if (!color || color == "transparent") {
				return [255, 255, 255];
			}
			else if (color.charAt(0) == "#") {
				color = color.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])$/, "#$1$1$2$2$3$3").match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/);
				return [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
			} else {
				color = color.match(/rgb\(([0-9a-f]{1,3}),? ?([0-9a-f]{1,3}),? ?([0-9a-f]{1,3})\)/);
				return [color[1], color[2], color[3]];
			}
		};		
		this.getDeltas = function(elem, srcColor, dstColor) {
			var i, deltas = new Array(), src, dst;
			for (i = 0; i < 3; i++) {
				src = srcColor[i]; dst = (dstColor & (0xff << (16 - 8 * i))) >> (16 - 8 * i);
				deltas[i] = Math.abs(src - dst) / this.counter * (src > dst ? 1 : -1);
			}
			return deltas;
		};
		this.fade = function(elems, dstcolors, duration, fps, endfunc) {
			if (!elems || !dstcolors)
				return false;
				
			this.onEnd = endfunc;
			duration = duration || 1000;
			fps = fps || 25;
			this.counter = Math.round(duration * fps / 1000.0); 
	
			if (!elems.length)
				elems = [ elems ];
			this.elems = elems;
			if (!dstcolors.length || typeof(dstcolors[0]) != "object")
				dstcolors = [ dstcolors ];			
			this.dstcolors = dstcolors;
			
			var colorCounter = 0;
			for (var i = 0; i < elems.length; i++) {
				var elem = elems[i];
				if (elem._fading)
					clearInterval(elem._fading);
				this.colors[i] = new Array(); this.deltas[i] = new Array();
				for (var style in dstcolors[colorCounter]) {
					if (parseInt(style, 10) == style) {
						var oldstyle = style;
						style = this.defaultstyles[style];
						this.dstcolors[colorCounter][style] = dstcolors[colorCounter][oldstyle];
						delete this.dstcolors[colorCounter][oldstyle];					
					}
					this.colors[i][style] = this.getColor(elem, style);
					this.deltas[i][style] = this.getDeltas(elem, this.colors[i][style], dstcolors[colorCounter][style]);
				}
				colorCounter++;
			}
	
			this.intervalHandle = setInterval(this.intervalFunc.bind(this), Math.round(1000 / fps));				
			for (var i = 0; i < elems.length; i++)
				elems[i]._fading = this.intervalHandle;
			return false;
		};		
		this.intervalFunc = function(colorsFunc) {
			if (this.counter-- <= 0) {
				clearInterval(this.intervalHandle);
				for (var i = 0; i < this.elems.length; i++)
					this.elems[i]._fading = null;
				if (this.onEnd)
					this.onEnd(this.elems);
			}
			else {
				for (var i = 0; i < this.elems.length; i++) {
					var elem = this.elems[i], newval, newstyle;
					for (var style in this.dstcolors[i]) {
						newstyle = "";
						for (j = 0; j < 3; j++) {							
							this.colors[i][style][j] = Math.max(0, Math.min(0xff, this.colors[i][style][j] - this.deltas[i][style][j]));
							newval = Math.round(this.colors[i][style][j]);
							newstyle += (newval > 15 ? "" : "0") + newval.toString(16);
						}
						elem.style[style] = "#" + newstyle;
					}
				}
			}
		};
	},
	
	fadeToMsg: function(elem) {
		new effects.fader().fade(elem, [0xF9F6E7, 0xD4BC4C], 200, 50);
	},
	fadeToDld: function(elem) {
		new effects.fader().fade(elem, [0xE7F1F9, 0x4C96D4], 200, 50);
	},
	fadeMsg: function(elem, fadeTimeout) {
		if (fadeTimeout)
			setTimeout(function() { effects.fadeMsg(elem); }, fadeTimeout);
		else
			new effects.fader().fade(elem, [0xFEFEFE, 0xD8DFEA], 3000);
	},
	
	blinds: function(elem, duration, fps) {
		this.default_duration = 100;
		this.default_fps = 30;
		this.elem = elem;
		this.duration = duration || this.default_duration;
		this.fps = fps || this.default_fps;
		this.timer = 0;
		this.height_fix = 0;
		this.ie_fix = _isIE ? 1 : 0;
		this.curHeight = 0;
		this.origHeight = 0;
		this.ended = false;
		this.onFinish = null;
		this.no_timer = false;		

		this.initUp = function() {
			//var x = new Date();
			//ge('header').innerHTML += "ustart: " + x.getSeconds() + "." + x.getMilliseconds() + " ";
			if (this.elem.blinds)
				this.elem.blinds.end(true);				
			this.end = this.endUp;
			this.progress = this.progressUp;
		
			css.pushStyles(this.elem, {"overflow": "hidden", "height": this.elem.style.height || ""});
			if (this.elem.clientHeight == 0) {
				this.elem.style.height = this.elem.offsetHeight + "px";
			}
			this.curHeight = this.elem.clientHeight;
			this.step = this.curHeight / (this.fps * this.duration / 1000);
			// x1 = new Date();
			// var step = Math.round(elem.clientHeight / (fps * duration / 1000)); //
			// step = Math.max(1, step);
			// this.rstep = Math.round(step);
			// this.timer = elem.blinding = setInterval(this.decHeight.bind(this), Math.round(duration * step / elem.clientHeight)); //
			this.elem.blinds = this;
		};
		
		this.initDown = function() {
			if (this.elem.blinds)
				this.elem.blinds.end(true);
			this.end = this.endDown;
			this.progress = this.progressDown;			
			
		    css.pushStyles(this.elem, {"overflow": "hidden", "visibility": "hidden", "position": "absolute", "display": ""});
			this.origHeight = this.elem.offsetHeight;
		    // ge('header').innerHTML +=  elem.offsetHeight + " " +elem.style.height + " ";
			css.popStyles(this.elem, ["visibility", "position"]);
			css.pushStyles(this.elem, {"height": "0px"});
		    this.curHeight = 0;
		    this.step = this.origHeight / (this.fps * this.duration / 1000);
		    //ge('header').innerHTML += this.step + " ";
		    // step = Math.max(1, step);
			//ge('header').innerHTML += Math.round(duration * step / this.origHeight) + " ";
			//x1 = new Date();
			//ge('header').innerHTML += "dstart: " + x1.getSeconds() + "." + x1.getMilliseconds() + " ";
			// this.timer = elem.blinding = setInterval(this.incHeight.bind(this), Math.round(duration * step / this.origHeight)); //
			this.elem.blinds = this;
		};
		
		this.runUp = function() {
			this.initUp();
			this.timer = setInterval(this.progressUp.bind(this), 1000 / this.fps); //
			this.progressUp();
		}
		
		this.runDown = function() {
			this.initDown();
			this.timer = setInterval(this.progressDown.bind(this), 1000 / this.fps); //
			this.progressDown();
		}

		this.progressUp = function() { 
			///ge('header').innerHTML += "up: " + this.curHeight + ", " + this.step; 
			//t1 = this.curHeight;
			//t = Math.floor(this.curHeight);
			this.curHeight = this.curHeight - this.step + 0.005;
			var newHeight = Math.floor(this.curHeight);
			//ge('header').innerHTML += "<br>u: " + (newHeight - t) + ", " + t1 + ", " + this.curHeight + ", ";
			//ge('header').innerHTML += ", " + newHeight;
			if (newHeight - this.height_fix <= 0) {
				return this.end();
			} else {
				this.setHeight(newHeight);
			}
			return true;
		};

		this.progressDown = function() { 
			//ge('header').innerHTML += "down: " + this.curHeight + ", " + this.step; 
			//t = Math.ceil(this.curHeight) - this.ie_fix;
			this.curHeight = this.curHeight + this.step;
			var newHeight = Math.ceil(this.curHeight) - this.ie_fix;
			//ge('header').innerHTML += "d: " + (newHeight - t) + ", " + t + ", " + this.curHeight;
			//ge('header').innerHTML += ", " + newHeight;
			if (newHeight - this.height_fix >= this.origHeight) {
				return this.end();
			} else {
				this.setHeight(newHeight);
			}
			return true;
		};

		this.setHeight = function(newHeight) {
			this.elem.style.height = newHeight - this.height_fix + "px";
			var ch = this.elem.clientHeight;
			if (ch != newHeight) {
				this.height_fix = ch - newHeight;
				this.elem.style.height = newHeight - this.height_fix + "px";
			}
		};
		
		this.end = null;
		
		this.endUp = function(premature) {
			this.elem.style.display = "none";
			css.popStyles(this.elem, ["overflow", "height"]);
			clearInterval(this.timer);
			this.elem.blinds = null;
			this.ended = true;
			if (this.onFinish && !premature)
				this.onFinish.bind(this)();
			//x2 = new Date();
			//ge('header').innerHTML += x2-x1 + " ";
			//var x = new Date();
			//ge('header').innerHTML += "ufinish: " + x.getSeconds() + "." + x.getMilliseconds() + " ";			
			return false;
		};
		
		this.endDown = function(premature) {
			css.popStyles(this.elem, ["overflow", "height"]);
			clearInterval(this.timer);
			this.elem.blinds = null;
			this.ended = true;
			if (this.onFinish && !premature)
				this.onFinish.bind(this)();
			///x2 = new Date();
			//ge('header').innerHTML += x2-x1 + " ";
			// ge('header').innerHTML += "dfinish: " + x.getSeconds() + "." + x.getMilliseconds() + " ";
			// console.log(element.steps-1);			
			return false;
		};
	},
	
	batch: function() {
		this.effects = null;		
		this.timer = 0;
		
		this.run = function(effects, fps) {
			var i, n = effects.length;
			for (i = 0; i < n; i++) {
				effects[i].init();
				effects[i].progress();
			}
			this.effects = effects;
			//return;
			this.timer = setInterval(this.runEffects.bind(this), 1000 / fps);
		};
		
		this.runEffects = function() {
			var i, n = this.effects.length, eff, running = 0;
			for (i = 0; i < n; i++) {
				eff = this.effects[i];
				if (!eff.ended) {
					eff.progress.bind(eff)();
					running++;
				}
			}
			if (!running)
				clearInterval(this.timer);
		};
	}
};