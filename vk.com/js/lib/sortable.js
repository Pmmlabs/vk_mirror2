sortable = {
	dragging: false,
	drag_elem: null,
	list: null,
	xOff: 0,
	yOff: 0,
	sortHelper: null,

	makeSortable: function(elem) {
		var nodes = elem.childNodes;
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeType != 3)  {
				nodes[i]._sortable = true;
				nodes[i]._width = nodes[i].offsetWidth;
				nodes[i]._height = nodes[i].offsetHeight;
				nodes[i]._x = findX(nodes[i]) - nodes[i].offsetLeft;
				nodes[i]._y = findY(nodes[i]) - nodes[i].offsetTop;
				nodes[i]._xright = nodes[i]._x + nodes[i]._width;
				nodes[i]._ybottom = nodes[i]._y + nodes[i]._height;
				events.addEvent(nodes[i], "mousedown", this.mousedown.bind(this));
				events.addEvent(nodes[i], "mousemove", this.mousemove.bind(this));
				events.addEvent(nodes[i], "mouseup", this.mouseup.bind(this));
			}
		}
	},

	findNode: function(elem) {
		do {
			if (elem._sortable)
				return elem;
			elem = elem.parentNode;
		} while(elem.parentNode != false);				
		return null;
	},

	updatePos: function(elem, event) {
		elem.style.left = mousePosX(event) - this.xOff + "px";
		elem.style.top = mousePosY(event) - this.yOff + "px";
	},

	mousedown: function(event) {
		if (this.dragging)
			return;
		var target = events.getTarget(event);
		if (target.tagName == "A" || target.tagName == "INPUT" || target.getAttribute("nosorthandle"))
			return;
		var elem = this.findNode(target);
		this.xOff = mousePosX(event) - findX(elem);
		this.yOff = mousePosY(event) - findY(elem);
		css.pushStyles(elem, {"width": elem.style.width || css.getPureWidth(elem) + "px", "zIndex": "10000", "left": elem.style.left || "", "top": elem.style.top || ""});
		elem._width = elem.offsetWidth;
		elem._height = elem.offsetHeight
		this.updatePos(elem, event);
		var t = elem.ownerDocument.createElement("DIV");
		t.innerHTML = '&nbsp; ';
		t.style.height = elem._height - 2 + "px";
		t.style.width = elem._width - 2 + "px";
		t.style.border = "1px dashed #D8DFEA";
		t.style.cssFloat = elem.style.cssFloat || "";
		t.style.styleFloat = elem.style.styleFloat || "";
		this.sortHelper = t;
 		this.list = elem.parentNode;
   	if (this.list.onSortBegin){
        var allowBegin = (this.list.onSortBegin.bind(this))(elem);
        if(allowBegin !== undefined && !allowBegin)return;
       }
		this.dragging = true;
		this.drag_elem = elem;		
		events.addEvent(document, "mousemove", this.mousemove.bind(this));
		events.addEvent(document, "drag", this.mousemove.bind(this));
		events.addEvent(document, "mouseup", this.mouseup.bind(this));
		this.list.insertBefore(t, elem);
		css.pushStyles(elem, {"position": "absolute"});

		var nodes = this.list.childNodes, n = nodes.length;
		var dir = 1, before = true;

		return events.cancelEvent(event);
	},

	mousemove: function(event, wheel) {
		if (!this.dragging)
			return;
		var elem = this.drag_elem;
		this.updatePos(elem, event);	
		var nodes = this.list.childNodes, n = nodes.length;
		var dir = 1, before = true;
		var mouseX = mousePosX(event), mouseY = mousePosY(event);
		var wBuffer = 0, hBuffer = 0;
		for(var i = 0; ; i += dir) {
			var itm = nodes[i];
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
				if (mouseX <= itm._xright + itm.offsetLeft && mouseY <= itm._ybottom + itm.offsetTop) {
					this.list.removeChild(this.sortHelper);
					this.list.insertBefore(this.sortHelper, itm);
					break;
				}
			} else {
				wBuffer = elem._width < itm._width ? itm._width - elem._width : 0;
				hBuffer = elem._height < itm._height ? itm._height - elem._height : 0;
				if (mouseX > itm._x + itm.offsetLeft + wBuffer && mouseY > itm._y + itm.offsetTop + hBuffer) {
					this.list.removeChild(this.sortHelper);
					this.list.insertBefore(this.sortHelper, itm.nextSibling);
					break;
				}
			}
		}
		if (!wheel)
			return events.cancelEvent(event);
		return true;
	},

	mouseup: function(event) {
		if (!this.dragging)
			return;				
		var elem = this.drag_elem;
		this.list.removeChild(elem);
		this.list.insertBefore(elem, this.sortHelper);
		this.list.removeChild(this.sortHelper);
		this.sortHelper = null;
		css.popStyles(elem, ["width", "position", "zIndex", "left", "top"]);
		this.dragging = false;
		this.drag_elem = null;
		events.removeEvent(document, "mousemove");
		events.removeEvent(document, "drag");
		events.removeEvent(document, "mouseup");
    	if (elem.parentNode.onSortEnd)
			elem.parentNode.onSortEnd(elem);
		return events.cancelEvent(event);
	}
}
