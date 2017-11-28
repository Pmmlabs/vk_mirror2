(function(window, document) {
    var readyBound = false,
        isReady = false,
        readyList = [],
        ready = function() {
            if (!isReady) {
                isReady = true;
                window.htmlNode = geByTag1('html');
                window.bodyNode = geByTag1('body');
                if (readyList) {
                    var fn_temp = null;
                    while (fn_temp = readyList.shift()) {
                        fn_temp.call(document);
                    }
                    readyList = null;
                }
            }
        };
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            ready();
        }, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                ready();
            }
        });
    }
    if (window.addEventListener) {
        window.addEventListener('load', ready, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', ready);
    } else {
        window.onload = ready;
    }

    function onDOMReady(fn) {
        if (isReady) {
            fn.call(document);
        } else {
            readyList.push(fn);
        }
    };
    window.onDOMReady = onDOMReady;
})(window, document);

function addEvent(elem, types, handler) {
    elem = ge(elem);
    handler = handler || rf;
    if (!elem || elem.nodeType == 3 || elem.nodeType == 8) return;
    if (elem.setInterval && elem != window) elem = window; // for ie
    var types = types.split(' ');
    for (var i = 0, l = types.length; i < l; i++) {
        var type = types[i];
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, handler);
        }
    }
}

function removeEvent(elem, types, handler) {
    elem = ge(elem);
    handler = handler || rf;
    if (!elem || elem.nodeType == 3 || elem.nodeType == 8) return;
    var types = types.split(' ');
    for (var i = 0, l = types.length; i < l; i++) {
        var type = types[i];
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    }
}

function preventEvent(e) {
    e = e || window.event;
    if (!e) return false;
    e = e.originalEvent || e;
    e.preventDefault && e.preventDefault();
    e.returnValue = false;
    return false;
}

function val(el, value) {
    el = ge(el);
    if (!el) return '';
    var tag_name = el.tagName.toLowerCase(),
        is_input = tag_name == 'input' || tag_name == 'textarea' || tag_name == 'select',
        is_checkable = is_input && (el.type == 'radio' || el.type == 'checkbox');
    if (typeof value === 'undefined') {
        return is_input ? (is_checkable ? el.checked : el.value) : el.innerHTML;
    } else {
        if (is_input) {
            if (is_checkable) el.checked = value;
            else el.value = value;
        } else {
            el.innerHTML = value;
            if (tag_name != 'a') {
                ajax.prepare_nav(el);
                ajax.prepare_click(el);
                ajax.onPrepared(true, el);
            }
        }
    }
}

function attr(el, a, value) {
    el = ge(el);
    if (!el) return;
    if (typeof value === 'undefined') {
        if (a.substr(0, 5) == 'data-' && el.dataset) {
            return el.dataset[a.substr(5).replace(/-([a-z0-9])/, function(s, s1) {
                return s1.toUpperCase();
            })] || false;
        }
        return el.getAttribute && el.getAttribute(a) || false;
    } else if (value === false) {
        return el.removeAttribute && el.removeAttribute(a) || false;
    } else {
        el.setAttribute && el.setAttribute(a, value);
    }
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function escapeRE(s) {
    return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : '';
}

function vkNow() {
    return +new Date;
}

function ge(id) {
    return (typeof id === 'string') ? document.getElementById(id) : id;
}

function geByClass(className, elem, tagName) {
    elem = ge(elem) || document;
    tagName = tagName || '*';
    if (elem.getElementsByClassName) {
        var elems = elem.getElementsByClassName(className);
        if (tagName == '*') {
            return Array.prototype.slice.call(elems);
        } else {
            var res = [];
            tagName = tagName.toUpperCase();
            for (var i = 0, l = elems.length; i < l; i++) {
                if (elems[i].tagName.toUpperCase() == tagName) {
                    res.push(elems[i]);
                }
            }
            return res;
        }
    }
    var elems = geByTag(tagName, elem);
    var res = [];
    var re = new RegExp('(^|\\s)' + escapeRE(className) + '(\\s|$)');
    for (var i = 0, l = elems.length; i < l; i++) {
        if (re.test(elems[i].className)) {
            res.push(elems[i]);
        }
    }
    return res;
}

function geByClass1(className, elem, tagName) {
    return geByClass(className, elem, tagName)[0];
}

function geByTag(tagName, elem) {
    return (ge(elem) || document).getElementsByTagName(tagName);
}

function geByTag1(tagName, elem) {
    return geByTag(tagName, elem)[0];
}

function gpeByTag(tagName, elem) {
    elem = ge(elem);
    if (!elem) return null;
    tagName = tagName.toUpperCase();
    while (elem = elem.parentNode) {
        if (elem.tagName && elem.tagName.toUpperCase() == tagName) return elem;
    }
    return null;
}

function hasClass(className, elem) {
    if (elem = ge(elem)) {
        return (new RegExp('(^|\\s)' + escapeRE(className) + '(\\s|$)')).test(elem.className);
    }
}

function addClass(className, elem) {
    if ((elem = ge(elem)) && !hasClass(className, elem)) {
        elem.className = (elem.className ? elem.className + ' ' : '') + className;
    }
}

function removeClass(className, elem, no_escape) {
    if (elem = ge(elem)) {
        elem.className = (elem.className || '').replace(new RegExp('(^|\\s)' + (no_escape ? className : escapeRE(className)) + '(\\s|$)'), function(s, s1, s2) {
            return s1 && s2 ? ' ' : '';
        });
    }
}

function toggleClass(className, elem, add) {
    var rem = (typeof add === 'undefined') ? hasClass(className, elem) : !add;
    rem ? removeClass(className, elem) : addClass(className, elem);
}

function tag(o) {
    o = ge(o);
    return (o && o.tagName || '').toLowerCase();
}

function getHref(link) {
    if (!link) return false;
    var url = false;
    if (link.getAttribute) {
        url = link.getAttribute('data-href') || link.getAttribute('href');
    }
    if (!url) {
        if (link.pathname) {
            url = link.pathname + link.search + link.hash;
        } else if (!tag(link)) {
            url = link;
        }
    }
    return url || false;
}

function checkNav(obj, skip_onclick) {
    obj = ge(obj);
    if (!obj) return false;
    do {
        if (checkElementNav(obj, skip_onclick)) return obj;
    } while (obj = obj.parentNode);
    return false;
}

function checkElementNav(obj, skip_onclick) {
    if (!obj) return false;
    if (tag(obj) == 'a') {
        if ((skip_onclick || !obj.getAttribute('onclick')) && (obj.getAttribute('href') || obj.getAttribute('data-href'))) {
            if (obj.hostname) {
                var host = obj.hostname;
            } else {
                var href = obj.href || attr(obj, 'data-href');
                var host = (/^(https?:)\/\/([^:\/]+)?(?::(\d+))?\/?(.*)$/i.exec(href) || [])[2];
            }
            if (obj.target !== '_blank') {
                return true;
            }

        }
    } else if (tag(obj) == 'input') {
        if (obj.form && (obj.type == 'submit' || obj.type == 'image') && !obj.getAttribute('onclick') || hasClass('al_nav', obj)) {
            return true;
        }
    }
    return false;
}

function checkTouchHover(obj) {
    obj = ge(obj);
    if (!obj) return false;
    do {
        if (tag(obj) == 'a' || tag(obj) == 'input') return obj;
    } while (obj = obj.parentNode);
    return false;
}

function prepareClick(obj) {
    var links = [],
        check = false;
    if (obj && (obj.tagName || '').toLowerCase() == 'a') {
        links.push(obj);
    } else if (isArray(obj)) {
        links = obj;
    } else {
        links = geByTag('a', obj);
        check = true;
    }
    for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i],
            target = link && link.target || '';
        if (!link || !link.getAttribute) continue;
        if (!check || !link.getAttribute('data-href') && checkElementNav(link, true) && target != '_blank') {
            var href = link.getAttribute('href');
            if (href == null) continue;
            attr(link, 'data-href', getHref(link));
            attr(link, 'href', false);
        }
    }
}
var thover = {
    obj: null,
    highlight: false,
    start: function(e) {
        if (!e.touches || e.touches.length != 1) return;
        thover.clear();
        thover.end(e);
        thover.obj = this || null;
        if (!thover.obj) return;
        thover.highlight = true;
        addClass('hover', thover.obj);
    },
    cancel: function(e) {
        if (!thover.obj) return;
        thover.highlight = false;
        thover.end(e);
    },
    end: function(e) {
        if (!thover.obj) return;
        removeClass('hover', thover.obj);
        if (thover.highlight) {
            thover.clear();
            addClass('active', thover.obj);
        }
        thover.obj = null;
        thover.highlight = false;
    },
    clear: function(e) {
        removeClass('active', geByClass1('active', 'vk_wrap'));
    }
};
addEvent(document, 'touchmove touchcancel', thover.cancel);
addEvent(document, 'touchend', thover.end);
addEvent(document, 'touchstart', function(e) {
    var touch_el = checkTouchHover(e.target);
    if (touch_el) {
        thover.start.call(touch_el, e);
    }
});
addEvent(document, 'click', function(e) {
    var nav_el = checkNav(e.target);
    if (nav_el) {
        var href = getHref(nav_el);
        if (href) {
            location.href = href;
        }
    }
});
onDOMReady(function() {
    prepareClick();
});