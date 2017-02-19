String.prototype.find = function(what) {
    return (this.indexOf(what) >= 0 ? true : false);
}

var corners = {
    r1: {
        margin: "0 3px",
        borderWidth: "0 2px"
    },
    r2: {
        margin: "0 2px"
    },
    r3: {
        margin: "0 1px"
    },
    r4: {
        height: "2px"
    },
    rb1: {
        margin: "0 8px",
        borderWidth: "0 2px"
    },
    rb2: {
        margin: "0 6px",
        borderWidth: "0 2px"
    },
    rb3: {
        margin: "0 5px"
    },
    rb4: {
        margin: "0 4px"
    },
    rb5: {
        margin: "0 3px"
    },
    rb6: {
        margin: "0 2px"
    },
    rb7: {
        margin: "0 1px",
        height: "2px"
    },
    rb8: {
        margin: "0",
        height: "2px"
    },
    rs1: {
        margin: "0 1px"
    },
    /*transparent inside*/
    t1: {
        borderWidth: "0 5px"
    },
    t2: {
        borderWidth: "0 3px"
    },
    t3: {
        borderWidth: "0 2px"
    },
    t4: {
        height: "2px"
    },
    tb1: {
        borderWidth: "0 10px"
    },
    tb2: {
        borderWidth: "0 8px"
    },
    tb3: {
        borderWidth: "0 6px"
    },
    tb4: {
        borderWidth: "0 5px"
    },
    tb5: {
        borderWidth: "0 4px"
    },
    tb6: {
        borderWidth: "0 3px"
    },
    tb7: {
        borderWidth: "0 2px",
        height: "2px"
    },
    tb8: {
        borderWidth: "0 1px",
        height: "2px"
    },
    ts1: {
        borderWidth: "0 2px"
    }
};

function Nifty(selector, options) {
    var $ = function(id) {
        return document.getElementById(id);
    };

    var setStyle = function(el, styles) {
        if (!el.style) return;
        for (var s in styles) {
            el.style[s] = styles[s];
        }
        return el;
    };

    var getStyle = function(el, style) {
        if (el.currentStyle)
            return (el.currentStyle[style]);
        if (document.defaultView.getComputedStyle)
            return (document.defaultView.getComputedStyle(el, '')[style]);
        if (el.style)
            return el.style[style];
        return 0;
    };

    var each = function(a, func) {
        for (var i = 0; i < a.length; i++) {
            func(a[i], i);
        }
    };

    var rounded = function(selector, options) {
        var i, top = "",
            bottom = "",
            v = new Array();
        if (options != "") {
            var arr = [
                ["left", "tl bl"],
                ["right", "tr br"],
                ["top", "tr tl"],
                ["bottom", "br bl"],
                ["transparent", "alias"]
            ];
            each(arr, function(item) {
                options = options.replace(item[0], item[1]);
            });
            if (options.find("tl"))
                top = "left";
            if (options.find("tr"))
                top = (top == "left") ? "both" : "right";
            if (options.find("bl"))
                bottom = "left";
            if (options.find("br"))
                bottom = (bottom == "left") ? "both" : "right";
        }
        if (top == "" && bottom == "" && !options.find("none")) {
            top = "both";
            bottom = "both";
        }
        var els = $$(selector);
        each(els, function(v) {
            fixIE(v);
            var d = [];
            if (top != "") d.push(addTopBottom(v, top, options, "Top"));
            if (bottom != "") d.push(addTopBottom(v, bottom, options, "Bottom"));
            v.oldSetStyle = v.setStyle;
            v.setStyle = function(obj) {
                this.oldSetStyle(obj);
                this.updateColors();
            }
            v.updateColors = function() {
                for (i = 0; i < d.length; i++) {
                    setColors(d[i], options.find("alias"));
                }
            }
        });
    }

    var $$ = function(selector) {
        var i, j, selid = "",
            selclass = "",
            tag = selector,
            tag2 = "",
            v2, k, f, a, s = [],
            objlist = [],
            c;
        if (selector.find("#")) {
            if (selector.find(" ")) {
                s = selector.split(" ");
                var fs = s[0].split("#");
                if (fs.length == 1) return (objlist);
                f = $(fs[1]);
                if (f) {
                    v = f.getElementsByTagName(s[1]);
                    for (i = 0; i < v.length; i++) objlist.push(v[i]);
                }
                return (objlist);
            } else {
                s = selector.split("#");
                tag = s[0];
                selid = s[1];
                if (selid != "") {
                    f = $(selid);
                    if (f) objlist.push(f);
                    return (objlist);
                }
            }
        }
        if (selector.find(".")) {
            s = selector.split(".");
            tag = s[0];
            selclass = s[1];
            if (selclass.find(" ")) {
                s = selclass.split(" ");
                selclass = s[0];
                tag2 = s[1];
            }
        }
        var v = document.getElementsByTagName(tag);
        if (selclass == "") {
            for (i = 0; i < v.length; i++) objlist.push(v[i]);
            return (objlist);
        }
        for (i = 0; i < v.length; i++) {
            c = v[i].className.split(" ");
            for (j = 0; j < c.length; j++) {
                if (c[j] == selclass) {
                    if (tag2 == "") objlist.push(v[i]);
                    else {
                        v2 = v[i].getElementsByTagName(tag2);
                        for (k = 0; k < v2.length; k++) objlist.push(v2[k]);
                    }
                }
            }
        }
        return (objlist);
    };

    var setColors = function(d, alias) {
        el = d.parentNode;
        var color, bk, border = "";
        if (alias || (color = getBk(el)) == "transparent") {
            color = "transparent";
            bk = "transparent";
            border = getParentBk(el);
        } else {
            bk = getParentBk(el);
            border = mix(color, bk);
        }
        setStyle(d, {
            background: bk
        });
        setStripColors(d, color, border);
    }

    var setStripColors = function(d, color, border) {
        each(d.getElementsByTagName("b"), function(b) {
            setStyle(b, {
                backgroundColor: color,
                borderColor: border
            });
        });
    }

    var addTopBottom = function(el, side, options, type) {
        isTop = (type == "Top");
        var d = document.createElement("b"),
            lim = 4,
            border = "",
            p, i, btype = "r",
            bk, color;
        setStyle(d, {
            marginLeft: "-" + getPadding(el, "Left") + "px"
        });
        setStyle(d, {
            marginRight: "-" + getPadding(el, "Right") + "px"
        });
        if (options.find("alias") || (color = getBk(el)) == "transparent") {
            btype = "t";
        }
        setStyle(d, {
            display: "block"
        });
        d.className = "niftycorners";
        p = getPadding(el, type);
        var st = {};
        var field = (isTop) ? "marginBottom" : "marginTop";
        if (options.find("small")) {
            st[field] = (p - 2) + "px";
            btype += "s";
            lim = 2;
        } else if (options.find("big")) {
            st[field] = (p - 10) + "px";
            btype += "b";
            lim = 8;
        } else {
            st[field] = (p - 5) + "px";
        }
        setStyle(d, st);
        var strips = [];
        for (i = 1; i <= lim; i++) {
            j = (isTop) ? i : lim - i + 1;
            d.appendChild(createStrip(j, side, btype));
        }
        if (isTop) {
            setStyle(el, {
                paddingTop: 0
            });
            el.insertBefore(d, el.firstChild);
        } else {
            setStyle(el, {
                paddingBottom: 0
            });
            el.appendChild(d);
        }
        setColors(d, options.find("alias"));
        return d;
    }

    var createStrip = function(index, side, btype) {
        var x = setStyle(document.createElement("b"), {
            display: "block",
            height: "1px",
            lineHeight: "1px",
            fontSize: "1px",
            overflow: "hidden",
            borderStyle: "solid",
            borderWidth: "0 1px"
        });
        setStyle(x, corners[btype + index]);
        if (side == "left") {
            setStyle(x, {
                borderRightWidth: "0",
                marginRight: "0"
            });
        } else if (side == "right") {
            setStyle(x, {
                borderLeftWidth: "0",
                marginLeft: "0"
            });
        }
        return (x);
    }

    var fixIE = function(el) {
        if (el.currentStyle && el.currentStyle.hasLayout != null && el.currentStyle.hasLayout == false)
            setStyle(el, {
                display: "inline-block"
            });
    }

    var sameHeight = function(selector, maxh) {
        var i, v = $A(selector.split(",")),
            t, j, els = [],
            gap;
        each(v, function(item) {
            each($$(item), function(el) {
                if (el.offsetHeight > maxh) maxh = els[i].offsetHeight;
                setStyle(el, {
                    height: "auto"
                });

                gap = maxh - el.offsetHeight;
                if (gap > 0) {
                    t = setStyle(document.createElement("b"), {
                        height: gap + "px",
                        display: "block"
                    });
                    nc = el.lastChild;
                    if (nc.className == "niftycorners")
                        el.insertBefore(t, nc);
                    else
                        el.appendChild(t);
                }
            });
        });
    }

    var getParentBk = function(x) {
        var el = x.parentNode,
            c;
        while (el.tagName.toUpperCase() != "HTML" && (c = getBk(el)) == "transparent")
            el = el.parentNode;
        if (c == "transparent")
            c = "#FFFFFF";
        return (c);
    }

    var getBk = function(x) {
        var c = getStyle(x, "backgroundColor");
        if (!c || c == "transparent" || c.find("rgba(0, 0, 0, 0)"))
            return ("transparent");
        if (c.find("rgb"))
            c = rgb2hex(c);
        return (c);
    }

    var getPadding = function(x, side) {
        var p = getStyle(x, "padding" + side) || "0";
        return (parseInt(p));
    }

    var rgb2hex = function(value) {
        var hex = "",
            v, h, i;
        var regexp = /([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
        var h = regexp.exec(value);
        for (i = 1; i < 4; i++) {
            v = parseInt(h[i]).toString(16);
            if (v.length == 1)
                hex += "0" + v;
            else
                hex += v;
        }
        return ("#" + hex);
    }

    var mix = function(c1, c2) {
        var i, x, y, r = new Array(3);
        var step1 = (c1.length == 4) ? 1 : 2;
        var step2 = (c2.length == 4) ? 1 : 2;
        for (i = 0; i < 3; i++) {
            x = parseInt(c1.substr(1 + step1 * i, step1), 16);
            if (step1 == 1)
                x = 16 * x + x;
            y = parseInt(c2.substr(1 + step2 * i, step2), 16);
            if (step2 == 1)
                y = 16 * y + y;
            r[i] = Math.floor((x * 50 + y * 50) / 100);
            r[i] = r[i].toString(16);
            if (r[i].length == 1)
                r[i] = "0" + r[i];
        }
        return ("#" + r[0] + r[1] + r[2]);
    }

    var i, v = selector.split(","),
        h = 0;
    var options = options || "";
    if (options.find("fixed-height"))
        h = $$(v[0])[0].offsetHeight;
    for (i = 0; i < v.length; i++)
        rounded(v[i], options);
    if (options.find("height")) sameHeight(selector, h);

}