if (!window.dom)
    var dom = {
        doc: document,
        append: function(el, name, attrs, styles) {
            var child = this.create(name, attrs, styles);
            el.appendChild(child);
            return child;
        },
        create: function(name, props, styles) {
            var el = this.doc.createElement(name);
            this.setProp(el, props);
            this.setStyle(el, styles);
            return el;
        },
        setProp: function(el, props) {
            if (el) {
                for (prop in props) {
                    el[prop] = props[prop];
                }
            }
        },
        setStyle: function(el, styles) {
            if (el && el.style) {
                for (st in styles) {
                    el.style[st] = styles[st];
                }
            }
        },
        ge: function(el, id) {
            if (el.id == id) return el;
            if (!el.firstChild) return null;
            /*
            for(var i=0;i<el.childNodes.length;i++){
            	var c = this.ge(el.childNodes[i],id);
            	if(c)return c;
            }
            */
            var ch = el.firstChild;
            while (ch) {
                var c = this.ge(ch, id);
                if (c) return c;
                ch = ch.nextSibling;
            }
            return null;
        },
        getChild: function(el, inds) {
            for (var i = 0; i < inds.length; i++) {
                el = el.childNodes[inds[i]];
            }
            return el;
        },

        // Dom ready event handling
        // Requires core.js
        // using:
        // dom.onReady(function(){ alert('Hello world!') });
        onReady: function(fn) {
            this.bindReady();
            if (dom.isReady) {
                fn.call(document);
            } else {
                dom.readyList.push(function() {
                    return fn.call(document);
                });
                dom.test = "test";
            }
        },

        isReady: false,
        readyBound: false,
        readyList: [],
        ready: function() {
            if (!dom.isReady) {
                dom.isReady = true;
                if (dom.readyList) {
                    for (var fn = 0; fn < dom.readyList.length; fn++) {
                        dom.readyList[fn].apply(document);
                    }
                    dom.readyList = null;
                }
            }
        },
        bindReady: function() {
            if (dom.readyBound) return;
            dom.readyBound = true;

            if (document.addEventListener && !core.isOpera)
                document.addEventListener("DOMContentLoaded", dom.ready, false);

            if (core.isIE && window == top)(function() {
                if (dom.isReady) return;
                try {
                    document.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                dom.ready();
            })();

            if (core.isOpera)
                document.addEventListener("DOMContentLoaded", function() {
                    if (self.isReady) return;
                    dom.ready();
                }, false);

            if (core.isSafari) {
                (function() {
                    if (dom.isReady) return;
                    if (document.readyState != "loaded" && document.readyState != "complete") {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                    dom.ready();
                })();
            }
            if (window.addEventListener)
                window.addEventListener("load", dom.ready, false);
            else if (window.attachEvent)
                window.attachEvent("onload", dom.ready);
        }
        // END of DOM ready event handling
    }

var domQuick = {
    doc: document,
    append: function(el, name, attrs, styles) {
        var child = this.create(name, attrs, styles);
        el.innerHTML += child;
    },
    create: function(name, props, styles) {
        var el = "<" + name;
        for (prop in props) {
            p = (prop == "className") ? "class" : prop;
            if (prop != "innerHTML") el += " " + p + "='" + props[prop] + "'";
        }
        if (styles) {
            el += "style='" + styles + "'";
        }
        el += ">";
        if (props.innerHTML) el += props.innerHTML;
        el += "</" + name + ">";
        return el;
    }
}

function $(id) {
    return document.getElementById(id) || window[id];
}