var css = {

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

Element.prototype.addClass = function(name) {
  if (!(new RegExp('\\b'+name+'\\b')).test(this.className)) this.className=(this.className?this.className+' ':'')+name;
  return this;
}

Element.prototype.removeClass = function(name) {
  var re = new RegExp(name+' ?| ?'+name);
  while(re.test(this.className)) this.className = this.className.replace(re, '');
  return this;
}