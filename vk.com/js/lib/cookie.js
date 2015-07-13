cookies = {
	cookies:null,
	set:function(name,value,days) {
		if(!this.cookies)this.init();
		this.cookies[name] = value;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	get:function(name) {
		if(!this.cookies)this.init();
		return this.cookies[name];
	},
	init:function(){
		this.cookies = {};
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i].split("=");
			if(c.length == 2)this.cookies[c[0].match(/^[\s]*([^\s]+?)$/i)[1]] = c[1].match(/^[\s]*([^\s]+?)$/i)[1];
		}
	}
}
