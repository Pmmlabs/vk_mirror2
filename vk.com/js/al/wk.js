var Wiki = {
    inBox: function(params, event) {
        if (checkEvent(event)) return;
        if (cur.wkBox) cur.wkBox.hide();
        var url = (cur.wkUrlInBox ? cur.wkUrlInBox : '/pages?act=in_box');
        cur.wkBox = showBox(url, params, {
            params: {
                width: 657
            }
        });
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
        var loc = extend(clone(nav.objLoc), {
            f: link
        });
        obj.href = '/' + nav.toStr(loc);
        obj.setAttribute('onmousedown', '');
        obj.onmousedown = null;
        delete obj.onmousedown;
    },
    showIconTT: function(el, text) {
        showTooltip(el, {
            text: text,
            slideX: (vk.rtl ? -15 : 15),
            black: 1,
            asrtl: 1,
            className: 'tt_black_side',
            shift: [-25, -21, 0]
        });
    }
}

try {
    stManager.done('wk.js');
} catch (e) {}