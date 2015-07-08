// common.js compatible

sortable = {
	dragging: false,
	drag_elem: null,
	list: null,
	xOff: 0,
	yOff: 0,
	sortHelper: null,
  startOrder:[],
  curElem:null,
  curDrag:null,
  vertical: true,

	makeSortable: function(elem, drag) {
    this.curElem = elem;
    this.curDrag = drag;
		var dragtargets = {nodes:[]};
		if(drag && drag.target){
			var nodes = drag.target.childNodes;
			each(nodes, function(i,v){
				if (v.nodeType == 1)  {
					dragtargets.nodes.push(v);
				}
      });
			dragtargets.ondragover = drag.ondragover;
			dragtargets.ondragout = drag.ondragout;
			dragtargets.ondragend = drag.ondragend;
		}

		var nodes = elem.childNodes;
    var self = this;
    startOrder = [];
    var lastY = 0;
		each(nodes, function(i,v) {
      startOrder.push(nodes[i]);
			if (v.nodeType == 1)  {
				v._sortable = true;
				if(dragtargets.nodes.length>0)v._dragtargets = dragtargets;
				v._size = getSize(v);
				var xy = getXY(v);
        if (lastY >= xy[1]) this.vertical = false;
        lastY = xy[1];
				v._x = xy[0] - v.offsetLeft;
				v._y = xy[1] - v.offsetTop;
				v._xright = v._x + v._size[0];
				v._ybottom = v._y + v._size[1];
				addEvent(v, "mousedown", self.mousedown.bind(self));
				addEvent(v, "mousemove", self.mousemove.bind(self));
				addEvent(v, "mouseup", self.mouseup.bind(self));
			}
		});
	},

	updatePos: function(elem, event) {
    setStyle(elem, {left:event.pageX - this.xOff, top:event.pageY - this.yOff});
	},

	removeNode: function(node) {
    for (var i = 0; i < startOrder.length; ++i) {
      if (startOrder[i] == node) {
        for (var j = i + 1; j < startOrder.length; ++j) {
          startOrder[j - 1] = startOrder[j];
        }
        startOrder.pop();
        return;
      }
    }
  },

	mousedown: function(event) {
		if (this.dragging)
			return;
		var target = event.srcElement || event.target;
		if (target.tagName == "A" || target.tagName == "INPUT" || target.getAttribute("nosorthandle"))
			return;
		var elem = target;
    do {
      if (elem._sortable) break;
      elem = elem.parentNode;
    } while(elem.parentNode != false);
		var xy = getXYRel(elem);
		this.xOff = event.pageX - xy[0];
		this.yOff = event.pageY - xy[1];
		this.pushStyles(elem, {width: getStyle(elem, 'width'), zIndex: "10000", left: getStyle(elem, 'left'), top: getStyle(elem, 'top')});
		var s = elem._size = getSize(elem);
		this.updatePos(elem, event);
		this.sortHelper = ce("div", {innerHTML:'&nbsp; ', className:'sort_blank'}, {height:s[1] - 2, width:s[0] - 2, cssFloat:getStyle(elem,'cssFloat'), styleFloat:getStyle(elem, 'styleFloat')});
 		this.list = elem.parentNode;
   	if (this.list.onSortBegin){
        var allowBegin = (this.list.onSortBegin.bind(this))(elem);
        if(allowBegin !== undefined && !allowBegin)return;
       }
		this.dragging = true;
		this.drag_elem = elem;
		addEvent(document, "mousemove", this.mousemove.bind(this));
		addEvent(document, "drag", this.mousemove.bind(this));
		addEvent(document, "mouseup", this.mouseup.bind(this));
		this.list.insertBefore(this.sortHelper, elem);
		this.pushStyles(elem, {position: "absolute"});

		var nodes = this.list.childNodes, n = nodes.length;
		var dir = 1, before = true;
		return cancelEvent(event);
	},

	mousemove: function(event, wheel) {
		if (!this.dragging)
			return;
		var elem = this.drag_elem;
		this.updatePos(elem, event);
		var nodes = this.list.childNodes, n = nodes.length;
		var dir = 1, before = true;
		var mouseX = event.pageX, mouseY = event.pageY;
		if(elem._dragtargets){
			for(var i in elem._dragtargets.nodes){
				var dragtarget = elem._dragtargets.nodes[i];
				var xy = getXYRel(dragtarget);
				var p1 = {x:(mouseX - xy[0]), y:(mouseY - xy[1])};
				if(p1.x > 0 && p1.x < dragtarget.offsetWidth && p1.y > 0 && p1.y < dragtarget.offsetHeight){
					if(!dragtarget._dragover){
						if(elem._dragtargets.ondragover)elem._dragtargets.ondragover(elem, dragtarget);
						dragtarget._dragover = true;
						elem._dragtarget = dragtarget;
					}
				}else if(dragtarget._dragover){
					if(elem._dragtargets.ondragout)elem._dragtargets.ondragout(elem, dragtarget);
					dragtarget._dragover = false;
					elem._dragtarget = null;
				}
			}
		}
		var wBuffer = 0, hBuffer = 0;
		for(var i = 0; ; i += dir) {
			var itm = nodes[i], xy = [itm.offsetLeft,itm.offsetTop];
			if (itm == this.sortHelper) {
				if (dir == 1) {
					i = n;
					dir = -1;
					before = false;
					continue;
				} else
					break;
			}
			if (itm.nodeType == 3 || itm == elem)
				continue;
			if (before) {
				if ((this.vertical || mouseX <= itm._xright + xy[0]) && mouseY <= itm._ybottom + xy[1]) {
					this.list.removeChild(this.sortHelper);
					this.list.insertBefore(this.sortHelper, itm);
					break;
				}
			} else {
        var s1 = elem._size, s2 = itm._size;
				wBuffer = s1[0] < s2[0] ? s2[0] - s1[0] : 0;
				hBuffer = s1[1] < s2[1] ? s2[1] - s1[1] : 0;
				if ((this.vertical || mouseX > itm._x + xy[0] + wBuffer) && mouseY > itm._y + xy[1] + hBuffer) {
					this.list.removeChild(this.sortHelper);
					this.list.insertBefore(this.sortHelper, itm.nextSibling);
					break;
				}
			}
		}
		if (!wheel)
			return cancelEvent(event);
		return true;
	},

	mouseup: function(event) {
		if (!this.dragging)
			return;
		var elem = this.drag_elem;
		//this.sortHelper.ownerDocument.body.removeChild(elem);
		elem.parentNode.removeChild(elem);
		this.list.insertBefore(elem, this.sortHelper);
		this.list.removeChild(this.sortHelper);
		this.sortHelper = null;
		this.popStyles(elem, ["width", "position", "zIndex", "left", "top"]);
		this.dragging = false;
		this.drag_elem = null;
		removeEvent(document, "mousemove");
		removeEvent(document, "drag");
		removeEvent(document, "mouseup");
		if (elem._dragtarget) {
			if(elem._dragtargets.ondragout)elem._dragtargets.ondragout(elem, elem._dragtarget);
			if(elem._dragtargets.ondragend)elem._dragtargets.ondragend(elem, elem._dragtarget);
      this.restoreOrder();
		} else if (elem.parentNode.onSortEnd) {
			elem.parentNode.onSortEnd(elem);
		}
		return cancelEvent(event);
	},

  restoreOrder:function(){
    var p = document.createElement('div');
    each(startOrder, function(i,v){
      p.appendChild(v);
    });
    this.list.innerHTML = p.innerHTML;
    this.makeSortable(this.curElem, this.curDrag);
  },

	pushStyles: function(obj, styles) {
		for(i in styles) {
			obj["_style" + i] = getStyle(obj, i) || "";
		}
    setStyle(obj, styles);
	},

	popStyles: function(obj, styles) {
		for(i = 0; i < styles.length; i++)
			setStyle(obj, styles[i], obj["_style"+ styles[i]]);
	}
}


function getXYRel(obj) {
  if (!obj || obj == undefined) return [0,0];
  var xy = getXY(obj);
  if (obj.offsetParent) {
    while (obj = obj.offsetParent) {
      if(getStyle(obj, 'position') == 'relative') {
        var pxy = getXY(obj);
        xy[0] -= pxy[0];
        xy[1] -= pxy[1];
        break;
      }
    }
  }
  return xy;
}

var PagedList = function(container, data, options) {
  var isEqual = function(a, b){
    if(!isArray(a) || !isArray(b))return a == b;
    for(var i = 0; i < a.length; ++i){
      if(a[i] != b[i])return false;
    }
    return true;
  }

  var isEmpty = function(a){
    if(!a)return true;
    for(var i = 0; i < a.length; ++i){
      if(a[i])return false;
    }
    return true;
  }

  function cloneAr(a) {
    var b = [];
    for (var i = 0; i < a.length; ++i) {
      b[i] = a[i];
    }
    return b;
  }

  var defaults = {
    getRow: function(row) { return ''; },
    setPages: function(page, pages, side) { },
    filter: function(search, row) { return true; },
    perPage: 30,
    emptyRow: function(search){return '<div>no rows</div>';}
  };
  options = options ? extend(defaults, options) : defaults;

  this.data = data;
  var filtered_data = [];
  for (var i = 0; i < data.length; ++i) {
    filtered_data.push(data[i]);
  }
  var current_search = [];
  var current_page = 0;

  this.setData = function(data){
    this.data = data;
    this.getPage(0, current_search, true);
  }

  var getRow = options.getRow.bind(this);

  this.getPage = function(page, search, force) {
    if(search === undefined)search = current_search;
    if(current_page == page && isEqual(search, current_search) && !force) return;
    current_page = page;
    if(options.onStart)options.onStart();
    if (!isEqual(search, current_search)) {
      current_search = cloneAr(search);
      filtered_data = [];
      for (var i = 0; i < this.data.length; ++i) {
        if(!search || options.filter(search, this.data[i]))filtered_data.push(this.data[i]);
      }
    }
    if(!filtered_data.length){
      ge(container).innerHTML = options.emptyRow(search);
      options.setPages(0, 0, 'top');
      options.setPages(0, 0, 'bottom');
      return;
    }
    var html = [];
    for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
      var row = filtered_data[i];
      html.push(getRow(row, current_search));
    }

    var h = getSize(ge(container))[1];
    ge(container).innerHTML = html.join('');
    setStyle(ge(container), {height: (page && !options.autoheight) ? h : 'auto'});

    if(options.onShow){
      for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
        var row = filtered_data[i];
        options.onShow(row, i);
      }
    }
    var pages = Math.ceil(filtered_data.length / options.perPage);
    options.setPages(page, pages, 'top');
    options.setPages(page, pages, 'bottom');
    if(options.onEnd)options.onEnd();
  }

  this.highlight = function(label, term) {
    term = trim(term);
    if(!term)return label;
    label = term.indexOf(' ') == -1 ? label.split(' ') : [label];
    var tmp = '';
    var termRus = parseLatin(term);

    if (termRus != null) {
      term = term + '|' + termRus;
    }
    var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + term.replace('+', '\\+') + "))(?![^<>]*>)(?![^&;]+;)", "gi");
    for (var i in label) {
      tmp += (i > 0 ? ' ' : '') + label[i].replace(re, "$2<em>$3</em>");
    }
    return tmp;
  }

}

try{stManager.done('sort.js');}catch(e){}
