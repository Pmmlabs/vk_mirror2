var EditBox = {
	buttons: {
		'bold':{cmd:"bold", key:"b"},
		'italic':{cmd:"italic", key:"i"}, 
		'numbers':{cmd:"insertorderedlist",tag:"ol",sep:true},
		'bullets':{cmd:"insertunorderedlist",tag:"ul"}
	},
	txt:"",
	doc:document,
	win:window,
	body:null,
	input:null,
	noCSS:false,
	init:function(){
		var areaEl = document.getElementsByTagName("textarea")[0];
		var area = {
			w:areaEl.offsetWidth-2,
			h:areaEl.offsetHeight-2,
			name:areaEl.name,
			id:areaEl.id};
		var form = areaEl.parentNode;
		var editContainer = dom.create("div", {id:"editContainer"});
		var editor = dom.append(editContainer, "div", {id:"edit", className:"editBox"}); 
		if(!browser.msie){
			var frame = dom.append(editor, "iframe", {id:"editFrame"}, {width:area.w+"px", height:area.h+"px",marginBottom:"-2px"});
      dom.append(editContainer, "div", {id:"editButtonRow"});
      form.replaceChild(editContainer, areaEl);
      this.input = dom.append(form, "input", {type:"hidden",name:area.name, id:area.id});
      var _t = this;
      var onload = function(){
        var doc = ge("editFrame").contentDocument;
        _t.win = ge("editFrame").contentWindow;
        doc.open();
        doc.write("<html><head></head><body></body></html>");
        doc.close();
        _t.body = doc.body;
        dom.append(_t.body.previousSibling, "link", {type:"text/css",href:"css/editor.css",rel:"stylesheet"});
        _t.body.className = "editBody";
        dom.setStyle(_t.body,{padding:"4px"});
        _t.doc = doc;
        if(progImg)progImg.parentNode.removeChild(progImg);
        _t.body.innerHTML = _t.txt;
        doc.designMode="on";
        _t.initButtons();
        _t.updateInput();
      };
      if(!ge("editFrame").contentDocument)addEvent(frame, 'load', onload);
      else onload();
		}else{
			editor.className += " editBody";
			dom.setStyle(editor,{padding:"4px",width:(area.w-8)+"px", height:(area.h-8)+"px",overflow:"auto"});
      dom.append(editContainer, "div", {id:"editButtonRow"});
      form.replaceChild(editContainer, areaEl);
      this.input = dom.append(form, "input", {type:"hidden",name:area.name, id:area.id});
			this.body = ge("edit");
			this.body.contentEditable = true;
      if(progImg)progImg.parentNode.removeChild(progImg);
      this.body.innerHTML = this.txt;
      this.initButtons();
      this.updateInput();
		}
	},
	initButtons:function(){
		var _t = this;
		for(btn in this.buttons){
			var img = dom.append(ge("editButtonRow"), "img", {id:btn+"Btn", src:"images/"+btn+".gif",className:"editButton editButtonOff"});
			if(this.buttons[btn].sep){dom.setStyle(img, {marginLeft:"4px"});}
			this.buttons[btn].img = img;
			events.addEvent(img, "click", function(cmd, _img){return function(){_t.btnClick(cmd, _img)}}(this.buttons[btn].cmd, img));
		}
		var keyObj = browser.msie?this.body:this.win;
		var evs = {	'keydown':keyObj, 'keypress':keyObj, 
					'mousedown':this.body, 'mouseup':this.body, 'drag':this.body};
		for(ev in evs){
			events.addEvent(evs[ev], ev, function(event){return function(){_t.editorEvent(event, arguments)}}(ev));
		}
	},
	editorEvent:function(event, args){
		if(event==(browser.msie?"keydown":"keypress")){
			var key = String.fromCharCode((browser.msie?args[0].keyCode:args[0].charCode)).toLowerCase();
				if(args[0].ctrlKey){
					for(btn in this.buttons){
						if(this.buttons[btn].key == key){
							this.doCmd(this.buttons[btn].cmd);
							this.stopEvent(args[0]);
							return;
						}
					}
					//debug
					//if(key=="y"){alert(this.body.innerHTML);this.stopEvent(args[0]);}
				}
		}
		var _t = this;
		setTimeout(function(){_t.refreshToolbar();}, 30);
	},
	stopEvent:function(ev) {
    if (browser.msie) {
        ev.cancelBubble = true;
        ev.returnValue = false;
    } else {
        ev.preventDefault();
        ev.stopPropagation();
    }
	},
	updateInput:function(){
		var text = this.body.innerHTML.replace(/[\r\n]/g," ").replace(/<br(\/?)>/ig,"\n").replace(/\n<([\/]?li)>/ig,"<$1>");
		this.input.setAttribute("value", text);
		checkTextLength(32000, text, ge('notesWarn'));
	},
	refreshToolbar:function(){
		for(btn in this.buttons){
			var img = this.buttons[btn].img;
			var val = (this.buttons[btn].tag) ? this.findParent(this.buttons[btn].tag, this.getRng().commonAncestorContainer) : this.doc.queryCommandState(btn);
			img.className = (val)?"editButton editButtonOn":"editButton editButtonOff";
		}
		this.updateInput();
	},
	doCmd:function(cmd){
		if(browser.msie)this.body.focus();
		var rng = this.getRng();
		//if(browser.msie && rng.text==""){
		//}
		if(!this.noCSS){
			if(browser.mozilla){
				this.execCmd("styleWithCSS", false);
			}else{
				this.execCmd("formatBlock", "span");
			}
			this.noCSS =true;
		}
		switch(cmd){
			default:
				this.execCmd(cmd, null);
				break;
		}
		this.refreshToolbar();
		var focusObj = (browser.opera)?ge("editFrame"):this.body;
		focusObj.blur();
		focusObj.focus();
	},
	execCmd:function(cmd,val){
		try{
			this.doc.execCommand(cmd, false, val);
		}catch(e){
			//log(e);
		}
	},
	btnClick:function(btn, img){
		this.doCmd(btn);
	},
	getSel: function() {
			return (this.win.getSelection) ? this.win.getSelection() : this.doc.selection;
	},
	getRng: function() {
			var sel = this.getSel();
			if (!sel) {
					return null
			}
			return (sel.rangeCount > 0) ? sel.getRangeAt(0) : sel.createRange();
	},
	findParent:function(tag, el){
		while(tag && el && el.id != "edit"){
			if(el.tagName && el.tagName.toLowerCase()==tag){return el;}
			el = el.parentNode;
		}
		return null;
	}
};

var progImg;
var initInterval = 0;
var checkLoad = function(){
	if(initInterval<0)return;
	var tags = document.getElementsByTagName("textarea");
	if(tags && tags[0]){
		var ta = tags[0];
		EditBox.txt = (ta.value || ta.textContent || "").replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>");
		ta.value = "";
		// image size - 150x8
		progImg = dom.append(document.body, "img", {src:"images/progress7.gif"}, 
			{position:"absolute", left:findX(ta)+(ta.offsetWidth - 150)/2+"px", top:findY(tags[0])+(ta.offsetHeight - 8)/2+"px"});
		clearInterval(initInterval);
		initInterval = -1;
	}
};

initInterval = setInterval(checkLoad, 50);

dom.onReady(function(){
	checkLoad();
	EditBox.init();
});
