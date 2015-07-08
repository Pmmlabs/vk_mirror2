core = {
	isOpera:(navigator.userAgent.toLowerCase().indexOf('opera') != -1),
	isIE:(!this.isOpera && (navigator.userAgent.toLowerCase().indexOf('msie') != -1)),
	isFF:(navigator.userAgent.toLowerCase().indexOf('firefox') != -1),
	isSafari: /webkit|safari|khtml/i.test(navigator.userAgent),
	getCoords:function(obj){
		var left = 0, top = 0;
    if (obj.offsetParent) {
      do {
        left += obj.offsetLeft;
        top += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return [left,top];
	},
	getX:function(obj){return this.getCoords(obj)[0];},
	getY:function(obj){return this.getCoords(obj)[1];},
	
	getMousePos:function(e, c, side){
		var pos = 0;
		if (!e) var e = window.event;
		var bodyScrl = document.body["scroll"+side] || 0;
		var docScrl = document.documentElement["scroll"+side] || 0;
		pos = e["page"+c] || (e["client"+c] + (bodyScrl || docScrl)) || 0;
		return pos;
	},
	getMouseX:function(e){
		return this.getMousePos(e, "X", "Left");
	},
	getMouseY:function(e){
		return this.getMousePos(e, "Y", "Top");
	},
	addScript:function(src){
		var isCss =src.match(/\.css$/);
		var head = document.getElementsByTagName("head")[0];
		var scr = document.createElement((isCss)?"link":"script");
		if(isCss){
			scr.href = src;
			scr.type = "text/css";
			scr.rel = "stylesheet";
		}
		else{scr.src = src;}
		head.appendChild(scr);
	},
	require:function(src){
		var isCss =src.match(/\.css$/);
		var scrs = document.getElementsByTagName((isCss)?"link":"script");
		var	prop = (isCss)?"href":"src";
		for(i in scrs){
			if(scrs[i][prop]==src)return;
		}
		this.addScript(src);
	},
  getScrollXY: function() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
  },
  getWindowSize: function() {
    var wndWidth = 0, wndHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      wndWidth = window.innerWidth;
      wndHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      wndWidth = document.documentElement.clientWidth;
      wndHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      wndWidth = document.body.clientWidth;
      wndHeight = document.body.clientHeight;
    }
    return [ wndWidth, wndHeight ];
  }
};

// ---- for compatibility ----

var _isIE = core.isIE;
var _isOpera = core.isOpera;
var _isFF = core.isFF;
var _isSafari = core.isSafari;

if(!window.ge)window.ge = function() {
  var ea;
  for( var i = 0; i < arguments.length; i++ ) {
    var e = arguments[i];
    if( typeof e == 'string' )
      e = document.getElementById(e);
    if( arguments.length == 1 )
      return e;
    if( !ea )
      ea = new Array();
    ea[ea.length] = e;
  }
  return ea;
}

var findX = function(obj) {
  return core.getX(obj);
}

var findY = function(obj) {
  return core.getY(obj);
}

var mousePosX = function(e) {
  return core.getMouseX(e);
}

var mousePosY = function(e) {
  return core.getMouseY(e);
}

// -------------

Function.prototype.bind = function(object) {
    var method = this
    return function() {
        return method.apply(object, arguments) 
    }
}

// To be moved to css.js
 
css = {

	pushStyles: function(obj, styles) {
		for(i in styles) {
			obj["_style"+ i] = obj.style[i] || "";
			obj.style[i] = styles[i];
		}
	},

	popStyles: function(obj, styles) {
		for(i = 0; i < styles.length; i++)
			obj.style[styles[i]] = obj["_style"+ styles[i]];
	},
	
	parseStyleInt: function(value, base){
		var res = parseInt(value, base);
		if(!isNaN(res))return res;
		if(value=="thin")return 2;
		if(value=="medium")return 4;
		if(value=="thick")return 6;
		return 0;
	},

	getStyle: function(obj, style, isInt, intradix) {
		var dv = document.defaultView;
		if (dv && dv.getComputedStyle) {
		var value = dv.getComputedStyle(obj, '').getPropertyValue(style.replace(/[A-Z]/g, 
				function(match) { 
					return "-" + match.toLowerCase(); 
				} ) 
			);
		} else if (obj.currentStyle) 
			var value = obj.currentStyle[style];
		else
			var value = obj.style[style] || "";
		return isInt ? css.parseStyleInt(value, intradix || 10) : value;
	},
	
	getPureWidth: function(obj) {
		var gs = this.getStyle;
		return obj.offsetWidth - gs(obj, "borderLeftWidth", 1) - gs(obj, "paddingLeft", 1) - gs(obj, "paddingRight", 1) - gs(obj, "borderRightWidth", 1);
	}
}