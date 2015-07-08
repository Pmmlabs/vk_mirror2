var Wiki = {
  inBox: function(params, event) {
    if (checkEvent(event)) return;
    if (cur.wkBox) cur.wkBox.hide();
    var url = (cur.wkUrlInBox ? cur.wkUrlInBox : '/pages?act=in_box');
    cur.wkBox = showBox(url, params, {params: {
      width: 634,
      bodyStyle: 'max-height: 400px; padding: 10px 16px; padding-left: 10px; overflow-y: scroll; overflow-x: hidden;'
    }});
    return cancelEvent(event);
  },
  switchHider: function(el) {
    var box = el.parentNode.parentNode;
    if (hasClass(box, 'wk_hider_box')) {
      box.className = box.className.replace('wk_hider_box', 'wk_hider_box_opened');
    } else {
      box.className = box.className.replace('wk_hider_box_opened', 'wk_hider_box');
    }
  },
  toHash: function(obj, link) {
    var loc = extend(clone(nav.objLoc), {f: link});
    obj.href = '/'+nav.toStr(loc);
    obj.setAttribute('onmousedown', '');
    obj.onmousedown = null;
    delete obj.onmousedown;
  }
}

try{stManager.done('wk.js');}catch(e){}
