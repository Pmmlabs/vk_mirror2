var base_domain = base_domain || "/";

var browser = {
    opera: /opera/i.test(navigator.userAgent),
    msie: (!this.opera && /msie/i.test(navigator.userAgent)),
    msie6: (!this.opera && /msie 6/i.test(navigator.userAgent)),
    mozilla: /firefox/i.test(navigator.userAgent),
    chrome: /chrome/i.test(navigator.userAgent),
    safari: (!(/chrome/i.test(navigator.userAgent)) && /webkit|safari|khtml/i.test(navigator.userAgent))
}

var rdyMgr = {
    isOp: /opera/i.test(navigator.userAgent),
    isIE: (!this.isOp && /msie/i.test(navigator.userAgent)),
    isIE6: (!this.isOp && /msie 6/i.test(navigator.userAgent)),
    isFF: /firefox/i.test(navigator.userAgent),
    isGC: /chrome/i.test(navigator.userAgent),
    isSaf: (!(/chrome/i.test(navigator.userAgent)) && /webkit|safari|khtml/i.test(navigator.userAgent)),
    onRdy: function(fn) {
        this.bindRdy();
        if (this.isRdy) {
            try {
                fn.call(document);
            } catch (e) {}
        } else {
            this.rdyList.push(function() {
                try {
                    fn.call(document);
                } catch (e) {}
            });
        }
    },
    isRdy: false,
    rdyBnd: false,
    rdyList: [],
    rdy: function() {
        if (!rdyMgr.isRdy) {
            rdyMgr.isRdy = true;
            if (rdyMgr.rdyList) {
                var l = rdyMgr.rdyList;
                l.reverse();
                while (fn = l.pop()) {
                    fn.apply(document);
                }
                rdyMgr.rdyList = null;
            }
        }
    },
    bindRdy: function() {
        if (this.rdyBnd) return;
        this.rdyBnd = true;
        if (document.addEventListener && !this.isOp) document.addEventListener("DOMContentLoaded", this.rdy, false);
        if (this.isIE && window == top)(function() {
            if (rdyMgr.isRdy) return;
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(arguments.callee, 0);
                return;
            }
            rdyMgr.rdy();
        })();
        if (this.isOp) document.addEventListener("DOMContentLoaded", function() {
            if (rdyMgr.isRdy) return;
            rdyMgr.rdy();
        }, false);
        if (this.isSaf) {
            (function() {
                if (rdyMgr.isRdy) return;
                if (document.readyState != "loaded" && document.readyState != "complete") {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                rdyMgr.rdy();
            })();
        }
        if (window.addEventListener) {
            window.addEventListener("load", this.rdy, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", this.rdy);
        }
    }
}

function onDomReady(fn) {
    rdyMgr.onRdy(fn);
}

function addEvent(e, t, f) {
    if (t == 'load' && window.onDomReady) {
        onDomReady(f);
    } else
    if (e.addEventListener) {
        e.addEventListener(t, f, false);
    } else if (e.attachEvent) {
        e.attachEvent('on' + t, f);
    }
}

function removeEvent(e, t, f) {
    if (e.removeEventListener) {
        e.removeEventListener(t, f, false);
    } else if (e.detachEvent) {
        e.detachEvent('on' + t, f);
    }
}

function makesure() {
    if (confirm(functions_sure_delete)) {
        return true;
    } else {
        return false;
    }
}

function flexToggle(el) {
    if (el.className == 'flexOpen') {
        el.className = 'flexShut';
    } else {
        el.className = 'flexOpen';
    }
}

function ge() {
    var ea;
    for (var i = 0; i < arguments.length; i++) {
        var e = arguments[i];
        if (typeof e == 'string')
            e = document.getElementById(e);
        if (arguments.length == 1)
            return e;
        if (!ea)
            ea = new Array();
        ea[ea.length] = e;
    }
    return ea;
}

function show() {
    for (var i = 0; i < arguments.length; i++) {
        var element = ge(arguments[i]);
        if (element && element.style) element.style.display = 'block';
    }
}

function show2() {
    for (var i = 0; i < arguments.length; i++) {
        var element = ge(arguments[i]);
        if (element && element.style) element.style.display = "inline";
    }
    return false;
}

function hide() {
    for (var i = 0; i < arguments.length; i++) {
        var element = ge(arguments[i]);
        if (element && element.style) element.style.display = 'none';
    }
}

function shown(el) {
    el = ge(el);
    return (el.style.display != 'none');
}

function shide(el) {
    if (shown(el)) {
        hide(el);
    } else {
        show(el);
    }
}

function textLimit(ta, count) {
    var text = ge(ta);
    if (text.value.length > count) {
        text.value = text.value.substring(0, count);
        if (arguments.length > 2) { // id of an error block is defined
            ge(arguments[2]).style.display = 'block';
        }
    }
}

function isIE() {
    return rdyMgr.isIE;
}

function placeholderSetup(id) {
    var el = ge(id);
    if (!el) return;
    if (el.type != 'text') return;
    var ph = el.getAttribute("placeholder");
    if (ph && ph != "") {
        el.value = ph;
        s
        el.style.color = '#777';
        el.is_focused = 0;
        el.onfocus = placeholderFocus;
        el.onblur = placeholderBlur;
    }
}

function placeholderFocus() {
    if (!this.is_focused) {
        this.is_focused = 1;
        this.value = '';
        this.style.color = '#000';
        var rs = this.getAttribute("radioselect");
        if (rs && rs != "") {
            var re = document.getElementById(rs);
            if (!re) {
                return;
            }
            if (re.type != 'radio') return;
            re.checked = true;
        }
    }
}

function placeholderBlur() {
    var ph = this.getAttribute("placeholder")
    if (this.is_focused && ph && this.value == "") {
        this.is_focused = 0;
        this.value = ph;
        this.style.color = '#777';
    }
}

function getXY(obj) {
    if (!obj || obj == undefined) return;
    var left = 0,
        top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [left, top];
}

var qCur = 0,
    qOn = 0,
    sOn = 0,
    qfOn = 0,
    qd = 0,
    l = 0,
    qa = 0,
    qfCur = -1,
    newSearch = 0;

reqs = [];
res = [];
friends_l = [];
friends_arr = [];
floaded = false;

function attachScript(id, src) {
    var i;
    var newreqs = [];
    for (reqnum in reqs) {
        req = reqs[reqnum];
        if (req) {
            if (req.running == 0) {
                ge('req' + req.num).parentNode.removeChild(ge('req' + req.num));
                reqs[reqnum] = null;
            } else {
                newreqs[reqnum] = req;
            }
        }
    }
    reqs = newreqs;
    var element = document.createElement('script');
    element.type = 'text/javascript';
    element.src = src;
    element.id = id;
    document.getElementsByTagName('head')[0].appendChild(element);
}

function destroy() {
    if (reqs[this.num]) {
        reqs[this.num].running = 0;
    }
}

function getCookie(name) {
    var prefix = name + "=";
    var start_ind = document.cookie.indexOf(prefix);
    if (start_ind == -1) return null;
    var end_ind = document.cookie.indexOf(";", start_ind + prefix.length)
    if (end_ind == -1) end_ind = document.cookie.length;
    return unescape(document.cookie.substring(start_ind + prefix.length, end_ind));
}

function parseLatin(text) {
    var outtext = text;
    var lat1 = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"];
    var rus1 = ["�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�"];
    for (var i = 0; i < lat1.length; i++) {
        outtext = outtext.split(lat1[i]).join(rus1[i]);
    }
    var lat2 = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY" + "��";
    var rus2 = "����������������������������������������������" + "��";
    for (var i = 0; i < lat2.length; i++) {
        outtext = outtext.split(lat2[i]).join(rus2[i]);
    }
    return (outtext == text) ? null : outtext;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
}

/* Message box*/
var _message_box_guid = 0;

function MessageBox(options) {
    var defaults = {
        type: "MESSAGE", // "MESSAGE" || "POPUP"
        hideOnClick: true,
        title: "Alert",
        width: "410px",
        height: "auto",
        hideFlash: true
    };

    options = extend(defaults, options);

    var buttonsCount = 0,
        body = document.getElementsByTagName('body')[0],
        boxContainer, boxBG, boxContainer, boxLayout, boxTitle, boxBody, boxControls, buttonYes, buttonNo,
        guid = _message_box_guid++;

    boxBG = document.createElement('div');
    boxBG.className = 'popup_box_bg';
    hide(boxBG);
    boxBG.innerHTML = '<iframe class="box_frame"></iframe><div class="popup_box_container" style="display:none"><div class="box_layout" style="z-index:200"><div class="box_title_wrap"><div class="box_title"></div></div><div class="box_body"></div><div class="box_controls"></div></div></div>';

    boxFrame = geByClass('box_frame', boxBG)[0];
    boxContainer = geByClass('popup_box_container', boxBG)[0];
    boxLayout = geByClass('box_layout', boxBG)[0];
    boxTitle = geByClass('box_title', boxBG)[0];
    boxBody = geByClass('box_body', boxBG)[0];
    boxControls = geByClass('box_controls', boxBG)[0];

    boxBG.style.height = getSize(document)[1] + 'px';
    addEvent(document, 'keydown', function(e) {
        if (e.keyCode == 27) {
            hideBox();
        }
    });

    onDomReady(function() {
        body.appendChild(boxBG);
    });

    refreshCoords();
    refreshBox();
    // Refresh box position
    function refreshCoords() {
        var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight)
        boxFrame.style.top = boxContainer.style.top = Math.max(document.documentElement.scrollTop, body.scrollTop) + (height - getSize(boxContainer)[1]) / 3 + 'px';
        boxFrame.style.marginLeft = boxContainer.style.marginLeft = -getSize(boxContainer)[0] / 2 + 'px';
    }

    // Add button
    function addButton(options) {
        buttonsCount++;
        if (typeof options != 'object') options = {};
        options = extend({
            label: 'Button' + buttonsCount,
            style: 'button_yes'
        }, options);

        var buttonWrap = document.createElement('div');
        buttonWrap.className = "button_wrap " + options.style;
        buttonWrap.innerHTML = '<div class="box_button" id="button' + guid + '_' + buttonsCount + '">' + options.label + '</div>';
        boxControls.appendChild(buttonWrap);
        var button = buttonWrap.firstChild;
        addEvent(button, 'mouseover', function() {
            addClass(this, 'button_hover');
        });
        addEvent(button, 'mouseout', function() {
            removeClass(this, 'button_hover');
        });
        if (isFunction(options.onClick)) {
            addEvent(button, 'click', function() {
                options.onClick()
            });
        }
        return button;
    }

    // Remove buttons
    function removeButtons() {
        buttonsCount = 0;
        boxControls.innerHTML = '';
    }

    // Refresh box properties
    function refreshBox() {
        // Set title
        boxTitle.innerHTML = options.title;

        // Set box dimensions
        boxContainer.style.width = typeof(options.width) == 'string' ? options.width : options.width + 'px';
        boxContainer.style.height = typeof(options.height) == 'string' ? options.height : options.height + 'px';

        // Switch box type
        removeClass(boxContainer, 'box_no_controls');
        removeClass(boxContainer, 'message_box');

        removeEvent(boxContainer, 'click');
        if (options.hideOnClick && options.type == 'POPUP') {
            addEvent(boxContainer, 'click', function() {
                hideBox();
            });
        }

        switch (options.type) {
            case 'POPUP':
                addClass(boxContainer, 'box_no_controls');
                addEvent(boxBG, 'click', function() {
                    hideBox();
                });
                break;

            case 'MESSAGE':
                addClass(boxContainer, 'message_box');
                removeEvent(boxBG, 'click');
                break;
        }
    }

    // Show box
    function showBox() {
        // Show blocking background
        show(boxBG);

        refreshCoords();
        // Show box
        show(boxContainer);

        // Hide all flash movies on the page
        if (options.hideFlash) {
            boxFrame.style.height = boxContainer.offsetHeight + 'px';
            boxFrame.style.width = boxContainer.offsetWidth + 'px';
            each(body.getElementsByTagName(browser.msie ? 'embed' : 'object'), function(i, el) {
                el.style.visibility = 'hidden';
            });
        }

        if (options.onShow) {
            options.onShow();
        }
    }
    // Hide box
    function hideBox() {

        hide(boxContainer);
        hide(boxBG);
        // Hide all flash movies on the page
        if (options.hideFlash) {
            each(body.getElementsByTagName(browser.msie ? 'embed' : 'object'), function(i, el) {
                el.style.visibility = 'visible';
            });
        }
        if (options.onHide) options.onHide();
    }

    return {

        // Show box
        show: function() {
            showBox();
            return this;
        },

        // Hide box
        hide: function() {
            hideBox();
            return this;
        },

        // Insert html content into the box
        content: function(html) {
            boxBody.innerHTML = html;
            return this;
        },

        // Load html content from URL
        loadContent: function(url, params) {
            var ajax = new Ajax(function(ajaxObj, responseText) {
                boxBody.innerHTML = responseText;
                refreshCoords();
                if (options.onLoad) options.onLoad(responseText);
            }, function(ajaxObj, responseText) {
                boxBody.innerHTML = 'Request error occured.';
                if (options.onLoadError) options.onLoadError(responseText);
            });
            // Show loader
            boxBody.innerHTML = '<div class="box_loader"></div>';

            // Load remote html using get request
            if (typeof params != 'object') params = {};
            ajax.post(url, params);

            return this;
        },

        // Add button
        addButton: function(options) {
            addButton(options);
            return this;
        },

        // Remove buttons
        removeButtons: function(options) {
            removeButtons();
            return this;
        },

        // Update box options
        setOptions: function(newOptions) {
            options = extend(options, newOptions);
            refreshBox();
            return this;
        }
    };
};