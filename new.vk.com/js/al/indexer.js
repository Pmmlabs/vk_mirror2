function vkIndexer(list, prepareFunc, callback) {
  this.list = list;
  this.iterCur = 0;
  this.iterEnd = (list) ? list.length : 0;
  this.index = {};
  this.callback = callback || function() {};
  this.prepareFunc = prepareFunc || function(obj) {
    return obj;
  };
  setTimeout(this.indexIteration.bind(this), 10);
}

vkIndexer.prototype.delimiter = vkIndexer.delimiter = new RegExp('[\\s\\-\\.,\\"\\\'\\«\\(\\)\\[\\]\\{\\}\\+\\?\\\\]+', 'g');
vkIndexer.prototype.trimmer = new RegExp('^[\\s\\-\\.,\\"\\\'\\«\\(\\)\\[\\]\\{\\}\\+\\?\\\\]+|[\\s\\-,\\"\\\'\\«\\(\\)\\[\\]\\{\\}\\\\]+$', 'g');

vkIndexer.prototype.toTranslit = {1072:"a",1073:"b",1074:"v",1075:"g",1076:"d",1077:"e",1078:"zh",
1079:"z",1080:"i",1081:"y",1082:"k",1083:"l",1084:"m",1085:"n",1086:"o",1087:"p",1088:"r",
1089:"s",1090:"t",1091:"u",1092:"f",1093:"h",1094:"ts",1095:"ch",1096:"sh",1097:"sh",1099:"y",
1101:"e",1102:"yu",1103:"ya", 1105:"e", 1098:"", 1100:""};

vkIndexer.prototype.toLocalCase = {'f':"a",',':"b",'<':"b",'d':"v",'u':"g",'l':"d",'t':"e",';':"zh",
':':"zh",'p':"z",'b':"i",'q':"y",'r':"k",'k':"l",'v':"m",'y':"n",'j':"o",'g':"p",'h':"r",'c':"s",'n':"t",
'e':"u",'a':"f",'[':"h",'{':"kh",'w':"ts",'x':"ch",'i':"sh",'o':"sh",'s':"y",'\'':"e",'"':"e",'.':"yu",
'>':"yu",'z':"ya",'`':"e",'~':"e",'m':"",']':"",'}':""};

vkIndexer.prototype.toLocalTranslit = {1072:"f",1074:"d",1075:"u",1076:"l",1077:"t",
1079:"p",1080:"b",1081:"q",1082:"r",1083:"k",1084:"v",1085:"y",1086:"j",1087:"g",1088:"h",
1089:"c",1090:"n",1091:"e",1092:"a",1094:"w",1095:"x",1096:"i",1097:"o",1099:"s",1103:"z", 1098:"m"};

vkIndexer.prototype.indexIteration = function() {
  var end = Math.min(this.iterEnd, this.iterCur + 200);
  for (var i = this.iterCur; i < end; i++) {
    var obj = this.list[i];
    obj._order = i;
    this.add(obj);
  }
  this.iterCur = i;
  if (i >= this.iterEnd) {
    this.callback(this);
  } else {
    setTimeout(this.indexIteration.bind(this), 10);
  }
};

vkIndexer.prototype.strToPrefixes = function(val) {
  var prefixes = {};
  var words = winToUtf(val).toLowerCase().split(this.delimiter);
  var len = words.length;
  while (len--) {
    var w = words[len], key = '', key2 = '', key3 = '';
    if (!w) continue;
    for (var letter = 0; letter < 6; letter++) {
      var symbol = w.charCodeAt(letter);
      if (symbol) {
        var trSymbol = this.toTranslit[symbol];
        var wletter = w.substr(letter, 1);
        key += (trSymbol != undefined) ? trSymbol : wletter;
      }
    }
    prefixes[key] = 1;
  }
  return prefixes;
};

vkIndexer.prototype.strToSearchPrefixes = function(val) {
  var result = [];
  var words = val.toLowerCase().split(this.delimiter);
  var len = words.length;
  while (len--) {
    var prefixes = {}, w = words[len], key = '', key2 = '', key3 = '', wFull = w.length > 1;
    if (!w) continue;
    for (var letter = 0; letter < 6; letter++) {
      var symbol = w.charCodeAt(letter);
      if (symbol) {
        var trSymbol = this.toTranslit[symbol];
        var wletter = w.substr(letter, 1);
        key += (trSymbol != undefined) ? trSymbol : wletter;
        if (wFull) {
          var lcSymbol = this.toLocalCase[wletter];
          var ltSymbol = this.toLocalTranslit[symbol];
          key2 += (lcSymbol != undefined) ? lcSymbol : wletter;
          key3 += (ltSymbol != undefined) ? ltSymbol : wletter;
        }
      }
    }
    prefixes[key] = 1;
    if (wFull) {
      prefixes[key2] = 2;
      prefixes[key3] = 3;
    }
    result.push(prefixes);
  }
  return result;
};

vkIndexer.prototype.toIndexTree = function(key, obj) {
  var prnt = this.index;
  for (var i=0; i < 6; i++) {
    var k = key.substr(i, 1) || -1;
    if (prnt[k]) {
      prnt = prnt[k];
    } else {
      prnt = prnt[k] = (i == 5) ? [] : {};
    }
  }
  prnt.push(obj);
};

vkIndexer.prototype.remove = function(obj) {
  var item = this.prepareFunc(obj);
  var prefixes = this.strToPrefixes(item);
  for (var key in prefixes) {
    var prnt = this.index;
    for (var i = 0; i < 6; i++) {
      var k = key.substr(i, 1) || -1;
      if (prnt[k]) {
        prnt = prnt[k];
      } else {
        break;
      }
    }
    if (prnt.length) {
      for (var i in prnt) {
        if (this.equals(prnt[i], obj)) {
          prnt.splice(i, 1);
          break;
        }
      }
    }
  }
};

vkIndexer.prototype.equals = function(obj1, obj2) {
  for (var i in obj1) {
    switch(typeof(obj1[i])) {
      case 'object':
        if (!this.equals(obj1[i], obj2[i])) { return false } break;
      case 'function':
        if (typeof(obj1[i])=='undefined' || (obj1[i].toString() != obj2[i].toString())) { return false; } break;
      default:
        if (obj1[i] != obj2[i]) { return false; }
    }
  }
  for (var i in obj2) {
    if(typeof(obj2[i])=='undefined') {return false;}
  }
  return true;
};

vkIndexer.prototype.intersect = function(a, b)
{
  var result = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0]._order < b[0]._order) {
      a.shift();
    } else if (a[0]._order > b[0]._order) {
      b.shift();
    } else {
      if (this.equals(a[0], b[0])) result.push(a.shift());
      b.shift();
    }
  }
  return result;
};

vkIndexer.prototype.add = function(obj) {
  var item = this.prepareFunc(obj);
  var prefixes = this.strToPrefixes(item);
  for (var k in prefixes) {
    this.toIndexTree(k, obj);
  }
}

vkIndexer.prototype.search = function(text) {
  var prnt = this.index;
  var prefixes = this.strToSearchPrefixes(text);
  var result = [];
  var merged = false;
  for (var k in prefixes) {
    if (merged && !result) break;
    var t = this.localSearch(prefixes[k], 0, prnt);
    t.sort(function(a,b) {return a._order - b._order});
    result = merged ? this.intersect(result, t) : t;
    merged = true;
  }
  var topIndex = 0, last = result[0], len = result.length+1, rows = [];
  for (var i = 1; i < len; i++) {
    var val = result[i];
    if (val != last) {
      rows.push(last);
      last = val;
    }
  }
  return rows;
};

vkIndexer.prototype.localSearch = function(prefixes, deep, prnt) {
  if (!prnt) {
    return [];
  }
  var lines = {};
  for (var k in prefixes) {
    var c = k.substr(deep, 1) || -1;
    if (!lines[c]) {
      lines[c] = {};
    }
    lines[c][k] = 1;
  }
  if (deep++ == 6 || !prnt) {
    return prnt;
  }
  var result = [];
  for (var c in lines) {
    if (c == -1) {
      for (var i in prnt) {
        result.push.apply(result, this.localSearch(lines[c], deep, prnt[i]));
      }
    } else {
      var res = this.localSearch(lines[c], deep, prnt[c]);
      result.push.apply(result, res);
    }
  }
  return result;
};

try{stManager.done('indexer.js');}catch(e){}
