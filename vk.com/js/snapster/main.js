(function(w) {

    var _ua = navigator.userAgent.toLowerCase();
    var browser = {
        mac: /mac/i.test(_ua),
        android: /android/i.test(_ua),
        iphone: /iphone/i.test(_ua),
    };

    w.O = function(selector, context) {
        return new snObject(selector, context);
    };

    function snObject(selector, context) {

        if (selector && selector.__snObject) {
            return selector;
        }

        var elements = O.parseHTML(selector, context);
        for (var i in elements) {
            this[i] = elements[i];
        }
        return this;
    }

    snObject.prototype = {
        __snObject: true,
        hasClass: function() {
            var names = O.prepareArgs(arguments);
            for (var i in names) {
                var name = O.trim(names[i]);
                if (name && O.hasClass(this[0], name)) {
                    return 1;
                }
            }
            return 0;
        },
        addClass: function() {
            var names = O.prepareArgs(arguments);
            return this.each(function() {
                for (var i in names) O.addClass(this, names[i]);
            });
        },
        removeClass: function() {
            var names = O.prepareArgs(arguments);
            return this.each(function() {
                for (var i in names) O.removeClass(this, names[i]);
            });
        },
        val: function() {
            if (arguments.length > 0) {
                var value = arguments[0];
                this.each(function() {
                    if (this.nodeType != 1) {
                        return 1;
                    }
                    if (O.inArray(this.tagName, ['INPUT', 'TEXTAREA'])) {
                        this.value = value;
                    } else {
                        O.cleanElementChildrens(this);
                        this.innerHTML = value;
                    }
                });
            } else {
                if (!this[0]) {
                    return '';
                }
                if (O.inArray(this[0].tagName, ['INPUT', 'TEXTAREA'])) {
                    var nodeVal = this[0].value;
                } else {
                    if (this.attr('contenteditable')) {
                        var nodeVal = O.htmlToVal(this[0]);
                    } else {
                        var nodeVal = this[0].innerHTML;
                    }
                }
                return O.trim(nodeVal);
            }
            return this;
        },
        focus: function() {
            this[0] && this[0].focus();
            return this;
        },
        get: function(index) {
            if (!index) {
                index = 0;
            }
            return this[index];
        },
        cursorToEnd: function() {
            if (this[0]) {
                if (O.inArray(this[0].tagName, ['TEXTAREA', 'INPUT'])) {
                    this[0].selectionStart = this.val().length;
                } else {
                    O.editableFocus(this[0], false, true);
                }
            }
            return this;
        },
        append: function(selector, context) {
            var elements = O.parseHTML(selector, context);
            this.each(function() {
                O.appendChilds(this, elements);
            });

            return this;
        },
        prepend: function(selector, context) {
            var elements = O.parseHTML(selector, context);

            this.each(function() {
                var firstNode = this.firstChild;
                if (!firstNode) {
                    O.appendChilds(this, elements);
                } else {
                    O.insertBefore(firstNode, elements);
                }
            });
            return this;
        },
        insertBefore: function(selector, context) {
            var elements = O.parseHTML(selector, context);
            this.each(function() {
                O.insertBefore(this, elements);
            });
        },
        attr: function(key, value) {
            if (arguments.length == 1) {
                return this[0] ? O.attr(this[0], key) : '';
            } else {
                return this.each(function() {
                    O.attr(this, key, value);
                })
            }
        },
        children: function(selector) {
            if (selector) {
                return O(selector, this[0]);
            } else {
                return O(this[0] ? this[0].firstChild : false);
            }
        },
        clearObject: function() {
            for (var i in this) delete this[i];
            return this;
        },
        hide: function() {
            this.each(function() {
                var display = O.getStyle(this, 'display');
                this.olddisplay = ((display != 'none') ? display : '');
                this.style.display = 'none';
            });
            return this;
        },
        show: function() {
            this.each(function() {
                var old = this.olddisplay;
                var newStyle = 'block';
                var tag = this.tagName.toLowerCase();
                this.style.display = old || '';

                if (O.getStyle(this, 'display') !== 'none') {
                    return;
                }

                if (O.hasClass(this, 'inline') || O.hasClass(this, '_inline')) {
                    newStyle = 'inline';
                } else if (O.hasClass(this, '_inline_block')) {
                    newStyle = 'inline-block';
                } else if (tag === 'tr') {
                    newStyle = 'table-row';
                } else if (tag === 'table') {
                    newStyle = 'table';
                } else {
                    newStyle = 'block';
                }
                this.style.display = this.olddisplay = newStyle;
            });
            return this;
        },
        remove: function() {
            return this.each(function() {
                O.cleanElement(this);
                this.parentNode.removeChild(this);
            });
        },
        scrollTop: function() {
            if (arguments.length > 0) {
                var top = arguments[0];
                return this.each(function() {
                    if (this == window) {
                        window.scrollTo(0, top);
                    } else {
                        this.scrollTop = top;
                    }
                });
            } else {
                if (!this[0]) {
                    return 0;
                }
                if (this[0] == window) {
                    return window.scrollY;
                }
                return this[0].scrollTop;
            }
        },
        scrollHeight: function() {
            return this[0] ? this[0].scrollHeight : 0;
        },
        parent: function(selector) { // just one parent node
            if (selector) {
                var parent = this[0] ? O.closest(this[0], selector) : [];
            } else {
                var parent = this[0] ? this[0].parentElement : [];
            }
            return O(parent);
        },
        parents: function(selector) { // all parents
            if (!this[0]) {
                return O([]);
            }
            var elements = [],
                el = selector ? O.closest(this[0], selector) : this[0].parentNode;
            while (el) {
                elements.push(el);
                el = selector ? O.closest(el, selector) : el.parentNode;
            }

            return O(elements);
        },
        each: function(callback) {
            O.each(this, callback);
            return this;
        },
        last: function() {
            var keys = Object.keys(this),
                el = this[keys[keys.length - 1]];
            return O(el);
        },
        removeAttr: function(name) {
            return this.each(function() {
                O.removeAttr(this, name);
            });
        },
        bind: function(type, callback) {
            return this.each(function() {
                O.addEvent(this, type, callback);
            });
        },
        unbind: function(type, callback) {
            return this.each(function() {
                O.removeEvent(this, type, callback);
            });
        },
        size: function() {
            var el = this[0];
            if (!el) {
                return [0, 0];
            }

            if (el == window) {
                return [window.innerWidth, window.innerHeight];
            } else {
                if (el == document) {
                    el = document.body;
                }
                return [el.offsetWidth, el.offsetHeight];
            }
        },
        width: function() {
            return this.size()[0];
        },
        height: function() {
            return this.size()[1];
        },
        position: function() {
            if (this[0]) {
                var left = this[0].offsetLeft;
                var top = this[0].offsetTop;
            } else {
                var left = top = 0;
            }
            return {
                left: left,
                top: top
            };
        },
        top: function() {
            return this.offset().top;
        },
        setStyle: function(name, value) {
            return this.each(function() {
                O.setStyle(this, name, value);
            });
        },
        getStyle: function(name) {
            if (!this[0]) return '';
            return O.getStyle(this[0], name);
        },
        count: function() {
            var num = 0;
            this.each(function() {
                num++;
            });
            return num;
        },
        offset: function() {
            var rects = this[0].getBoundingClientRect();

            if (O.getStyle(this[0], 'position') == 'fixed') {
                rects.top += window.scrollY;
            }

            return {
                top: rects.top,
                left: rects.left,
                bottom: rects.bottom,
                right: rects.right,
            };
        },
        first: function() {
            return O(this[0]);
        },
        click: function() {
            this[0] && this[0].click();
            return this;
        },
        blur: function() {
            this[0] && this[0].blur();
            return this;
        }
    };

    O.parseHTML = function(selector, context) {
        var elements = [];
        if (O.isString(selector) && selector.indexOf('<') != -1) { // convert raw html data to html elements
            var t = document.createElement('div');
            t.innerHTML = selector;
            var el = t.firstChild;
            while (el) {
                elements.push(el);
                el = el.nextSibling;
            }
        } else if (O.isString(selector) && selector.length > 0) { // css selector
            if (O.isString(context)) {
                context = document.querySelectorAll(context)[0];
            }
            if (!context || String(context).length == 0) {
                context = document;
            }

            if (selector.match(/^\#([a-zA-Z0-9\-\_]+)$/) && context.getElementById) {
                elements.push(context.getElementById(selector.substr(1)));
            } else if (selector.match(/^([a-zA-Z])$/)) {
                elements = context.getElementsByTagName(selector);
            } else {
                elements = context.querySelectorAll(selector);
            }
        } else if (O.isArray(selector)) { // nodes list
            elements = selector;
        } else if (String(selector).length == 0 && context) { // return child nodes
            elements = context.children;
        } else if (selector && selector.__snObject) {
            var element = []
            O.each(selector, function() {
                elements.push(this);
            });
        } else { // one node
            elements = [selector];
        }

        // filter nodes
        var filtered_nodes = [];
        for (var i in elements) {
            var el = elements[i];
            if (!el) {
                continue;
            }
            if (el.nodeType != 1 && el != window && el != document) {
                continue;
            }
            filtered_nodes.push(el);
        }

        return filtered_nodes;
    };

    O.closest = function(el, selector, curElMatch) {
        if (!curElMatch) {
            el = el.parentNode;
        }
        if (!el || el == window || el == document) {
            return null;
        }
        if (el.closest.typeof == 'function') {
            el = el.closest(selector);
        } else {
            var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
            while (el) {
                if (el.tagName == 'HTML') {
                    return false;
                }
                if (matchesSelector.call(el, selector)) {
                    break;
                }
                el = el.parentNode;
            }
        }
        return el;
    }

    O.getStyle = function(el, name) {
        name = name.replace(/([A-Z])/g, '-$1').toLowerCase();

        var ret, defaultView = document.defaultView || window;
        var computedStyle = defaultView.getComputedStyle(el, null);
        if (computedStyle) {
            ret = computedStyle.getPropertyValue(name);
        }

        ret = (ret + '').split(' ');
        O.each(ret, function(i, v) {
            if (!/^\d+(px)?$/i.test(v) && /^\d/.test(v)) {
                var style = el.style,
                    left = style.left,
                    rsLeft = el.runtimeStyle.left;
                el.runtimeStyle.left = el.currentStyle.left;
                style.left = v || 0;
                ret[i] = style.pixelLeft + 'px';
                style.left = left;
                el.runtimeStyle.left = rsLeft;
            }
        });
        ret = ret.join(' ');

        return ret;
    };

    O.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    O.each = function(object, callback) {
        if (!O.isObject(object) && typeof object.length !== 'undefined') {
            for (var i = 0, length = object.length; i < length; i++) {
                var value = object[i];
                if (callback.call(value, i, value) === false) break;
            }
        } else {
            for (var name in object) {
                if (!Object.prototype.hasOwnProperty.call(object, name)) continue;
                if (callback.call(object[name], name, object[name]) === false)
                    break;
            }
        }
        return object;
    };

    O.hasClass = function(el, name) {
        if (el && el.nodeType === 1 && (' ' + el.className + ' ').replace(/[\t\r\n\f]/g, ' ').indexOf(' ' + name + ' ') >= 0) {
            return true;
        }
        return false;
    };

    O.addClass = function(el, name) {
        if (el && !O.hasClass(el, name)) {
            el.className = (el.className ? el.className + ' ' : '') + name;
        }
    };

    O.removeClass = function(el, name) {
        if (el) {
            el.className = O.trim((el.className || '').replace((new RegExp('(\\s|^)' + name + '(\\s|$)')), ' '));
        }
    };

    O.inArray = function(value, arr) {
        return O.indexOf(arr, value) != -1;
    };

    O.indexOf = function(arr, value, from) {
        for (var i = from || 0, l = (arr || []).length; i < l; i++) {
            if (arr[i] == value) return i;
        }
        return -1;
    }

    O.trim = function(text) {
        return (text || '').replace(/^\s+|\s+$/g, '');
    };

    O.prepareArgs = function(args) {
        if (args.length > 1) {
            return args;
        } else {
            return args[0].split(' ');
        }
    };

    O.isString = function(obj) {
        return typeof obj === 'string';
    };

    O.rand = function(mi, ma) {
        return Math.random() * (ma - mi + 1) + mi;
    };

    O.irand = function(mi, ma) {
        return Math.floor(O.rand(mi, ma));
    };

    O.isUndefined = function(obj) {
        return typeof obj === 'undefined';
    };

    O.isFunction = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };

    O.isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    O.isEmpty = function(o) {
        if (Object.prototype.toString.call(o) !== '[object Object]') {
            return false;
        }
        for (var i in o) {
            if (o.hasOwnProperty(i)) return false;
        }
        return true;
    };

    O.now = function() {
        return +new Date;
    };

    O.stripHTML = function(text) {
        return text ? text.replace(/<(?:.|\s)*?>/g, '') : '';
    };

    O.escapeRE = function(s) {
        return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : '';
    };

    O.intval = function(value) {
        if (value === true) return 1;
        return parseInt(value) || 0;
    };

    O.floatval = function(value) {
        if (value === true) return 1;
        return parseFloat(value) || 0;
    };

    O.positive = function(value) {
        value = intval(value);
        return value < 0 ? 0 : value;
    };

    O.clean = function(str) {
        return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
    }

    O.cleanElementChildrens = function(el) {
        var childs = el.children;
        O.each(childs, function() {
            O.cleanElement(this);
        });
    };

    O.cleanElement = function(el) {
        O.removeEvent(el);
        O.removeData(el);
        O.removeAttr(el);

        O.cleanElementChildrens(el);
    };

    O.attr = function(el, key, value) {
        if (O.isObject(key)) {
            for (var i in key) O.attr(i, key[i]);
            return;
        }
        if (arguments.length > 2) {
            el.setAttribute(key, value);
        } else {
            return el.getAttribute(key);
        }
    };

    O.appendChilds = function(el, childs) {
        O.each(O.cloneElements(childs), function() {
            el.appendChild(this);
        });
    };

    O.insertBefore = function(el, nodes) {
        var parent = el.parentNode;
        O.each(O.cloneElements(nodes), function() {
            parent.insertBefore(this, el);
        });
    };

    O.clone = function(obj, req) {
        var newObj = !O.isObject(obj) && typeof obj.length !== 'undefined' ? [] : {};
        for (var i in obj) {
            if (/webkit/i.test(_ua) && (i == 'layerX' || i == 'layerY' || i == 'webkitMovementX' || i == 'webkitMovementY')) continue;
            if (req && typeof(obj[i]) === 'object' && i !== 'prototype' && obj[i] !== null) {
                newObj[i] = O.clone(obj[i], req);
            } else {
                newObj[i] = obj[i];
            }
        }
        return newObj;
    }

    O.extend = function() {
        var a = arguments,
            target = a[0] || {},
            i = 1,
            l = a.length,
            deep = false,
            options;

        if (typeof target === 'boolean') {
            deep = target;
            target = a[1] || {};
            i = 2;
        }

        if (typeof target !== 'object' && !O.isFunction(target)) target = {};

        for (; i < l; ++i) {
            if ((options = a[i]) != null) {
                for (var name in options) {
                    var src = target[name],
                        copy = options[name];

                    if (target === copy) continue;

                    if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
                        target[name] = O.extend(deep, src || (copy.length != null ? [] : {}), copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }

    O.cloneElements = function(elements) {
        var res = [];
        O.each(elements, function() {
            var new_node = this.cloneNode(true);

            // clone events
            var events = O.data(this, 'events');
            if (events) {
                for (var i in events) {
                    for (var j in events[i]) {
                        O.addEvent(new_node, i, events[i][j]);
                    }
                }
            }

            res.push(new_node);
        });
        return res;
    };

    // Ajax
    O.ajax = function(url, query, opts) {
        return new O._ajax(url, query, opts);
    };
    O._ajax = function(url, query, opts) {

        if (!opts) opts = {};
        if (opts.onDone) {
            this.done(opts.onDone);
        }
        if (opts.onFail) {
            this.fail(opts.onFail);
        }

        var _s = this;

        _s.xhr = new XMLHttpRequest();

        _s.xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (_s.xhr.status == 200) {
                if (_s.onDone) _s.onDone(_s.xhr.responseText);
            } else {
                if (_s.onFail) _s.onFail(_s.xhr.status, _s.xhr.statusText);
            }
        };
        _s.xhr.onprogress = function(e) {
            _s.onProgress && _s.onProgress(e);
        };

        _s.xhr.open('POST', url, true);

        var params = [];
        for (var i in query) {
            params.push(i + '=' + encodeURIComponent(query[i]));
        }
        params.push('_rnd=' + O.now());

        _s.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        _s.xhr.send(params.join('&'));

        return this;
    };

    O._ajax.prototype = {
        done: function(fn) {
            this.onDone = fn;
            return this;
        },
        fail: function(fn) {
            this.onFail = fn;
            return this;
        },
        progress: function(fn) {
            this.onProgress = fn;
            return;
        },
    };

    var vkExpand = 'VK' + O.now(),
        vkUUID = 0,
        vkCache = {};
    O.data = function(elem, name, data) {
        if (!elem) return false;
        var id = elem[vkExpand],
            undefined;
        if (!id) {
            id = elem[vkExpand] = ++vkUUID;
        }

        if (data !== undefined) {
            if (!vkCache[id]) {
                vkCache[id] = {};
            }
            vkCache[id][name] = data;
        }

        return name ? vkCache[id] && vkCache[id][name] : id;
    };

    O.removeData = function(elem, name) {
        var id = elem ? elem[vkExpand] : false;
        if (!id) return;

        if (name) {
            if (vkCache[id]) {
                delete vkCache[id][name];
                name = '';

                var count = 0;
                for (name in vkCache[id]) {
                    if (name !== '__elem') {
                        count++;
                        break;
                    }
                }

                if (!count) {
                    O.removeData(elem);
                }
            }
        } else {
            O.removeEvent(elem);
            O.removeAttr(elem, vkExpand);
            delete vkCache[id];
        }
    };

    O.removeAttr = function(el) {
        for (var i = 0, l = arguments.length; i < l; ++i) {
            var n = arguments[i];
            if (el[n] === undefined) continue;
            try {
                el.removeAttribute(n);
                delete el[n];
            } catch (e) {}
        }
    };

    O.cancelEvent = function(event) {
        event = (event || window.event);
        if (!event) return false;
        while (event.originalEvent) {
            event = event.originalEvent;
        }
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    }

    function _eventHandle(event) {
        event = normEvent(event);

        var handlers = O.data(this, 'events');
        if (!handlers || typeof(event.type) != 'string' || !handlers[event.type] || !handlers[event.type].length) {
            return;
        }

        var eventHandlers = (handlers[event.type] || []).slice();
        for (var i in eventHandlers) {
            if (event.type == 'mouseover' || event.type == 'mouseout') {
                var parent = event.relatedElement;
                while (parent && parent != this) {
                    try {
                        parent = parent.parentNode;
                    } catch (e) {
                        parent = this;
                    }
                }
                if (parent == this) {
                    continue
                }
            }
            var ret = eventHandlers[i].apply(this, arguments);
            if (ret === false || ret === -1) {
                O.cancelEvent(event);
            }
            if (ret === -1) {
                return false;
            }
        }
    }

    function normEvent(event) {
        event = event || window.event;

        var originalEvent = event;
        event = O.clone(originalEvent);
        event.originalEvent = originalEvent;

        if (!event.target) {
            event.target = event.srcElement || document;
        }

        // check if target is a textnode (safari)
        if (event.target.nodeType == 3) {
            event.target = event.target.parentNode;
        }

        if (!event.relatedTarget && event.fromElement) {
            event.relatedTarget = event.fromElement == event.target;
        }

        if (event.pageX == null && event.clientX != null) {
            var doc = document.documentElement,
                body = bodyNode;
            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
            event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
        }

        if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
            event.which = event.charCode || event.keyCode;
        }

        if (!event.metaKey && event.ctrlKey) {
            event.metaKey = event.ctrlKey;
        } else if (!event.ctrlKey && event.metaKey && browser.mac) {
            event.ctrlKey = event.metaKey;
        }

        // click: 1 == left; 2 == middle; 3 == right
        if (!event.which && event.button) {
            event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
        }

        return event;
    }

    O.addEvent = function(elem, types, handler, context, useCapture) {
        if (!elem || elem.nodeType == 3 || elem.nodeType == 8) {
            return;
        }

        var realHandler = context ? function() {
            var newHandler = function(e) {
                var prevData = e.data;
                e.data = context;
                var ret = handler.apply(this, [e]);
                e.data = prevData;
                return ret;
            }
            newHandler.handler = handler;
            return newHandler;
        }() : handler;

        // For IE
        if (elem.setInterval && elem != window) elem = window;

        var events = O.data(elem, 'events') || O.data(elem, 'events', {}),
            handle = O.data(elem, 'handle') || O.data(elem, 'handle', function() {
                _eventHandle.apply(arguments.callee.elem, arguments);
            });
        // to prevent a memory leak
        handle.elem = elem;

        O.each(types.split(/\s+/), function(index, type) {
            if (!events[type]) {
                events[type] = [];
                if (elem.addEventListener) {
                    elem.addEventListener(type, handle, useCapture);
                } else if (elem.attachEvent) {
                    elem.attachEvent('on' + type, handle);
                }
            }
            events[type].push(realHandler);
        });

        elem = null;
    };

    O.removeEvent = function(elem, types, handler, useCapture) {
        if (typeof useCapture === 'undefined') {
            useCapture = false;
        }

        if (!elem) return;
        var events = O.data(elem, 'events');
        if (!events) return;
        if (typeof(types) != 'string') {
            for (var i in events) {
                O.removeEvent(elem, i);
            }
            return;
        }

        O.each(types.split(/\s+/), function(index, type) {
            if (!O.isArray(events[type])) return;
            var l = events[type].length;
            if (O.isFunction(handler)) {
                for (var i = l - 1; i >= 0; i--) {
                    if (events[type][i] && (events[type][i] === handler || events[type][i].handler === handler)) {
                        events[type].splice(i, 1);
                        l--;
                        break;
                    }
                }
            } else {
                for (var i = 0; i < l; i++) {
                    delete events[type][i];
                }
                l = 0;
            }
            if (!l) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, O.data(elem, 'handle'), useCapture);
                } else if (elem.detachEvent) {
                    elem.detachEvent('on' + type, O.data(elem, 'handle'));
                }
                delete events[type];
            }
        });
        if (O.isEmpty(events)) {
            O.removeData(elem, 'events')
            O.removeData(elem, 'handle')
        }
    };

    O.setStyle = function(el, name, value) {
        if (O.isObject(name)) {
            return O.each(name, function(k, v) {
                O.setStyle(el, k, v);
            });
        }
        el.style[name] = value;
    };

    O.replaceEntities = function(str) {
        if (!str) {
            return '';
        }
        return O('<textarea>' + ((str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').val();
    };

    O.htmlToVal = function(cont) {
        if (!cont) {
            return '';
        }
        var el = cont.firstChild;
        var v = '',
            contTag = new RegExp('^(DIV|P|LI|OL|TR|TD|BLOCKQUOTE)$');
        while (el) {
            switch (el.nodeType) {
                case 3:
                    var str = el.data.replace(/^\n|\n$/g, ' ').replace(/[\n\xa0]/g, ' ').replace(/[ ]+/g, ' ');
                    v += str;
                    break;
                case 1:
                    var str = O.htmlToVal(el);
                    if (el.tagName && el.tagName.match(contTag) && str) {
                        if (str.substr(-1) != '\n') {
                            str += '\n';
                        }
                        var prev = el.previousSibling;
                        while (prev && prev.nodeType == 3 && O.trim(prev.nodeValue) == '') {
                            prev = prev.previousSibling;
                        }
                        if (prev && !(prev.tagName && prev.tagName.match(contTag))) {
                            str = '\n' + str;
                        }
                    } else if (el.tagName == 'BR') {
                        str += '\n';
                    }
                    v += str;
                    break;
            }
            el = el.nextSibling;
        }
        return v;
    };

    O.editableFocus = function(editable, obj, after, noCollapse, noForce) {
        if (!editable || (noForce && document.activeElement === editable)) {
            return false;
        }
        editable = O(editable)[0];
        editable.focus();
        if (editable.phonfocus) {
            editable.phonfocus();
        }
        if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
            var sel = window.getSelection();
            if (browser.opera && !after) {
                sel.collapse(obj || editable, 0);
            } else {
                var range = document.createRange();
                if (obj) {
                    range.selectNode(obj);
                } else {
                    range.selectNodeContents(editable);
                }
                if (!noCollapse) {
                    range.collapse(after ? false : true);
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else if (typeof document.body.createTextRange != 'undefined') {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(obj || editable);
            textRange.collapse(after ? false : true);
            textRange.select();
        }
    };

    O.arrayUnique = function(arr) {
        var res = [];
        for (var i in arr) {
            if (!O.inArray(arr[i], res)) {
                res.push(arr[i]);
            }
        }
        return res;
    };

    O.isAndroid = function() {
        return browser.android;
    };

    O.isIphone = function() {
        return browser.iphone;
    };

})(window);