function Ajax(onDone, onFail, eval_res){
	var _t = this;
	this.onDone = onDone;
	this.onFail = onFail;
	var tran = null;
	try { tran = new XMLHttpRequest(); }
	catch(e) { tran = null; }
	try { if(!tran) tran = new ActiveXObject("Msxml2.XMLHTTP"); }
	catch(e) { tran = null; }
	try { if(!tran) tran = new ActiveXObject("Microsoft.XMLHTTP"); }
	catch(e) { tran = null; }

	var parseResponse = function(){
		if(!tran || !tran.responseText)return;
		var res = tran.responseText.replace(/^[\s\n]+/g, '');

		if(res.substr(0,10)=="<noscript>")
		{
			try{
				var arr = res.substr(10).split("</noscript>");
				eval(arr[0]);
				tran.responseText = arr[1];
			}catch(e){
			}
		}else{}
	};
	this.get = function(u, q, f){
		f = f || false;
		if(typeof(q)!='string')q = ajx2q(q);
		u = u + (q ? ('?'+q) : '');
		tran.open('GET', u, !f);
		tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		tran.send('');
	};
	this.post = function(u, d, f){
		f = f || false;
		if(typeof(d)!='string')d = ajx2q(d);
		tran.open('POST', u, !f);
		tran.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		tran.send(d);
	};
	var stateDisp = function(){
		if(tran.readyState == 4 ) {
			if(tran.status >= 200 && tran.status < 300) {
				if(eval_res) parseRes();
				if( _t.onDone ) _t.onDone(_t, tran.responseText);
			} else {
				if( _t.onFail ) _t.onFail(_t, tran.responseText);
			}
		}
	}
	tran.onreadystatechange = stateDisp;
}

function ajx2q(qa)
{
  var query = [];
  for( var key in qa ) {
	if(qa[key]===undefined || qa[key] === null || typeof(qa[key])=='function')continue;
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(qa[key]));
  }
  return query.join('&');
}

var ajaxHistory = $ah = {
	enabled:false,
	useCache:true,
	cache:{},
	onLoad:{},
	curHash:"",
	curHashes:{},
	frame:null,
	forceLoad:false,
	init:function(){
		if(!this.enabled)return;
		for(var i in this.onLoad){
			var p = this.sortParams(this.onLoad[i].def);
			this.curHashes[i] = p;
		}
		var handler = function(){
			var origHash = $ah.getHash();
			if(origHash==$ah.curHash && !$ah.forceLoad)return;
			var state = $ah.splitHash(origHash);
			var hash = $ah.joinHash(state);
			if(hash!=$ah.curHash || $ah.forceLoad){
				for(var i in $ah.onLoad){
					var l = $ah.onLoad[i];
					var p = state[i] || $ah.sortParams(l.def);
					if(p!=$ah.curHashes[i] || i == $ah.forceLoad){
						$ah.forceLoad = false;
						if(!$ah.cache[i])$ah.cache[i] = {};
						if(!$ah.cache[i][p] || !$ah.useCache){
							var a = new Ajax((function(ll,ii,pp){return function(res,text){
								if(ll.done)ll.done(res,text);
								$ah.cache[ii][pp] = text;
							};})(l,i,p), l.fail);
							a.post(l.url, p);
						}else if(l.done){
							l.done({}, $ah.cache[i][p]);
						}
						$ah.curHashes[i] = p;
					}
				}
				$ah.curHash = hash;
			}
		};
		if(isIE()){
			var initHash = encodeURIComponent(location.hash);
			document.body.innerHTML += "<iframe id='ahFrame' style='position:absolute;left:-1000px;width:0;height:0' src='/blank.html?ahHash="+initHash+"'></iframe>";
			this.frame = ge('ahFrame');
			this.frame.attachEvent('onload', handler, false);
		}else{
			setInterval(handler, 100);
		}
	},
	prepare:function(id, params){
		this.enabled = true;
		if(params===undefined){params = id; id = 'default';}
		this.onLoad[id] = params;
	},
	setHash:function(hash){
		location.hash = "#" + hash;
		if(isIE()){
			this.frame.src = 'blank.html?ahHash='+encodeURIComponent(hash);
		}
		return true;
	},
	getHash:function(){
		if(!isIE())return location.hash.replace("#","");
		var hash = ge('ahFrame').contentWindow.document.location.search.match(/ahHash=(.*)$/);
		return decodeURIComponent((hash && hash[1]) || "");
	},
	go:function(s, params){
		if(params===undefined){params = s; s = 'default';}
		var state = this.splitHash(this.curHash);
		state[s] = this.sortParams(params);
		var hash = this.joinHash(state);
		this.setHash(hash);
		this.forceLoad = s;
	},
	splitHash:function(hash){
		var hash = hash.replace("#","");
		if(!hash)return {};
		hash = hash.split("/");
		if(hash.length == 1){
			if(this.onLoad['default'].show)hash[0] = this.onLoad['default'].show.from(hash[0]);
			return {'default':this.sortParams(hash[0])};
		}
		var parsed = {};
		for(var i=0;i<hash.length;i+=2){
			var h = hash[i];var p = hash[i+1];
			if(this.onLoad[h].show){p = this.sortParams(this.onLoad[h].show.from(p));}
			else{
				p = this.sortParams(p);
				if(!p && this.onLoad[h])p = this.sortParams(this.onLoad[h].def);
			}
			parsed[h] = p;
		}
		return parsed;
	},
	joinHash:function(hash){
		var joined = [];
		var def = true;
		for(var i in hash){
			def = def && (i=='default');
			var p = this.sortParams(hash[i]);
			if(this.onLoad[i].show){
				var p1 = this.onLoad[i].show.to(this.splitParams(hash[i]));
				if(p1)p = p1;
			}
			joined.push(i + "/" + p);
		}
		if(def && joined[0])return joined[0].split("/")[1];
		return joined.sort().join("/");
	},
	validateHash:function(hash){return this.joinHash(this.splitHash(hash));},
	splitParams:function(params){
		if(!params)return {};
		if(typeof(params)!='string')return params;
		if(!/&|=/.test(params))return params;
		var vals = params.split("&");
		var p = {};
		for(var i=0;i<vals.length;i++){
			var v = vals[i].split("=");
			p[v[0]] = v[1];
		}
		return p;
	},
	
	sortParams:function(params){
		if(typeof(params)=='number')return params+'';
		if(typeof(params)!='string'){
			params = ajx2q(params);
		}
		return params.split("&").sort().join("&");
	}
	
	
}

onDomReady(function(){ajaxHistory.init()});