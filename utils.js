utils = {
	readCookie:function(cookieName) {
		var theCookie=""+document.cookie;
		var ind=theCookie.indexOf(cookieName);
		if (ind==-1 || cookieName=="") return ""; 
		var ind1=theCookie.indexOf(';',ind);
		if (ind1==-1) ind1=theCookie.length; 
		return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
	},
	htmlentities:function(s){
		var div = document.createElement('div');
		var text = document.createTextNode(s);
		div.appendChild(text);
		return div.innerHTML;
	},
	lastLength:0,
	checkTextLength:function(max_len, val, warn, exceedFunc, remainFunc){
		if(this.lastLength==val.length)return;
		this.lastLength=val.length;
		n_len = this.replaceChars(val).length;
		if (n_len > max_len) {
			var n_plus = n_len - max_len;
			warn.style.display = "";
			warn.innerHTML = langNumeric(n_plus, text_exceeds_symbol_limit);
		} else if (n_len > max_len - 100) {
			var n_rem = max_len - n_len;
			warn.style.display = "";
			warn.innerHTML = langNumeric(n_rem, text_N_symbols_remain);
		} else {
			warn.style.display = "none";
			warn.innerHTML = '';
		}
	},
	replaceChars:function(text){
		//text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>").replace(/\r/g, "").replace(/!/g, "&#33;").replace(/'/g, "&#39;");
		var res = "";
		temp = "";
		for(var i =0; i<text.length; i++){
			var c = text.charCodeAt(i);
			temp+=c+",";
			if((c > 0x80 && c < 0xC0) || c>0x500){
				res += "&#"+c+";";
			}else{
				switch(c){
					case 0x26:res+="&amp;";break;
					case 0x3C:res+="&lt;";break;
					case 0x3E:res+="&gt;";break;
					case 0x22:res+="&quot;";break;
					case 0x0D:res+="";break;
					case 0x0A:res+="<br>";break;
					case 0x21:res+="&#33;";break;
					case 0x27:res+="&#39;";break;
					default:res+=text.charAt(i);break;
				}
			}
		}
		return res;
	},
	trim:function(str){
		return str.replace(/(^\s+|\s+)$/g, "", str);
	},
	submit:function(e, form, val){
		if(val !== undefined && this.trim(val).length==0)return;
		if (e.keyCode==10 || (e.ctrlKey && e.keyCode==13)) {
			if(this.isFunction(form)){form();}
			else if(form){form.submit();}
		}
	},
	isFunction:function(f){
		return Object.prototype.toString.call(f) === "[object Function]";
	}
}

function readCookie(cookieName) {
 return utils.readCookie(cookieName);
}

(function(){
  var boxes = {};

  window.simpleBox = function(key, title, width, okTitle, cancelTitle, onOk, okKey){
    var mb = boxes[key];
    if (!mb) {
      boxes[key] = new MessageBox({title:title, width:width});
      mb = boxes[key];
    }
    mb.removeButtons();
    var cancelFunc = function(){
      mb.hide();
      if (okKey) removeEvent(window, 'keydown', onKeyDown);
    }
    mb.addButton({label: cancelTitle, style: 'button_no', onClick: cancelFunc});
    if(okTitle){
      var onKeyDown = function(e){
        if ((okKey=='enter' && e.keyCode == KEY.RETURN) ||
            (okKey=='ctrl-enter' && e.keyCode == KEY.RETURN && e.ctrlKey)) {
          okFunc();
          cancelEvent(e);
        }
      }
      var okFunc = function(){
        onOk();
        if (okKey) removeEvent(window, 'keydown', onKeyDown);
      }
      mb.addButton({label: okTitle, onClick: okFunc});
    }
    if (okKey) addEvent(window, 'keydown', onKeyDown);
    return mb;
  }
})();