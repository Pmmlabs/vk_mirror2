! function(t) {
    function e(i) {
        if (r[i]) return r[i].exports;
        var n = r[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, e), n.l = !0, n.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.d = function(t, r, i) {
        e.o(t, r) || Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, e.n = function(t) {
        var r = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return e.d(r, "a", r), r
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 140)
}({
    140: function(t, e, r) {
        t.exports = r(44)
    },
    154: function(t, e, r) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(e);
        var n = r(63),
            s = function() {
                function t(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return i(this, t), r.items = r.items || [], e = ge(e), addClass(e, "rich_dropdown_wrap"), this.input = new n["default"](e, r.items), this.input.renderByInitialData(r.initialData), this.setOptions(r), this
                }
                return t.prototype.destroy = function() {
                    this.input.destroy(), delete this.input
                }, t.prototype.getValue = function() {
                    return this.input.getValue()
                }, t.prototype.getStringValue = function() {
                    return this.input.getStringValue()
                }, t.prototype.onChange = function(t) {
                    return this.input.setOptions({
                        onChange: t
                    }), this
                }, t.prototype.setOptions = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    for (var e in t) {
                        var r = t[e];
                        switch (e) {
                            case "placeholder":
                                this.input.setPlaceholder(r);
                                break;
                            case "operators":
                                this.input.autoComplete.setOperators(r), this.input.updateOptionsObj();
                                break;
                            case "disabledText":
                                this.input.setDisabledText(r);
                                break;
                            case "autoCompleteMaxWidth":
                                this.input.setAutoCompleteMaxWidth(r);
                                break;
                            case "width":
                                this.input.setWidth(r);
                                break;
                            case "items":
                                this.input.autoComplete.setOptions(r), this.input.updateOptionsObj();
                                break;
                            case "value":
                                this.setValue(r);
                                break;
                            case "onChange":
                                this.onChange(r)
                        }
                    }
                    return this
                }, t.prototype.disable = function() {
                    this.input.disable()
                }, t.prototype.enable = function() {
                    this.input.enable()
                }, t.prototype.toggleDisable = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                    this.input.disabled && t !== !0 || t === !1 ? this.input.enable() : this.input.disable()
                }, t.prototype.setValue = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    this.input.setValue(t)
                }, t
            }();
        e["default"] = s
    },
    218: function(t, e, r) {
        "use strict";
        r.r(e), r.d(e, "SPACE", function() {
            return i
        }), r.d(e, "ITEM_CLASS", function() {
            return n
        }), r.d(e, "TYPE_ITEM", function() {
            return s
        }), r.d(e, "TYPE_OPERATOR", function() {
            return o
        }), r.d(e, "TYPE_BRACKET", function() {
            return a
        }), r.d(e, "TYPE_OPEN_BRACKET", function() {
            return l
        }), r.d(e, "TYPE_CLOSE_BRACKET", function() {
            return p
        }), r.d(e, "TYPE_SECTION", function() {
            return u
        }), r.d(e, "TYPE_OPERAND", function() {
            return h
        }), r.d(e, "TYPE_COLON", function() {
            return d
        }), r.d(e, "TYPE_COMMA", function() {
            return c
        });
        var i = " ",
            n = "rich_dropdown_item",
            s = "item",
            o = "operator",
            a = "bracket",
            l = "open_bracket",
            p = "close_bracket",
            u = "section",
            h = "operand",
            d = "colon",
            c = "comma"
    },
    44: function(t, e, r) {
        "use strict";
        r.r(e);
        var i = r(154);
        window.RichDropDown = i["default"];
        try {
            stManager.done("rich_dropdown.js")
        } catch (n) {}
    },
    463: function(t, e, r) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(e);
        var n = r(545),
            s = function() {
                function t(e, r) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    i(this, t), this.options = r, this.itemEl = null, this.opts = n, this._initIndexer(), this._initDom(e)
                }
                return t.prototype.destroy = function() {
                    delete this.indexer, delete this.subIndexer
                }, t.prototype.setOptions = function(t) {
                    this.options = t, this._initIndexer()
                }, t.prototype.update = function(t) {
                    this.searchData = t, this._checkItem(), this._search(), this.show()
                }, t.prototype.setLineHeight = function(t) {
                    this.lineHeight = t
                }, t.prototype.show = function() {
                    var t = this.searchData.pos,
                        e = t.left,
                        r = t.top;
                    addClass(this.listEl, "shown"), setStyle(this.listEl, {
                        top: r + this.lineHeight,
                        left: e
                    })
                }, t.prototype.hide = function() {
                    removeClass(this.listEl, "shown")
                }, t.prototype.getOptions = function() {
                    return this.options
                }, t.prototype.onKeyDown = function(t) {
                    var e = this,
                        r = geByClass1("selected", this.listEl) || domFC(this.listEl);
                    r && r.data && setTimeout(function() {
                        t.keyCode === KEY.DOWN ? e._overItem(domNS(r) ? domNS(r) : domFC(e.listEl)) : t.keyCode === KEY.UP ? e._overItem(domPS(r) ? domPS(r) : domLC(e.listEl)) : t.keyCode === KEY.ENTER && e._onMouseDown(r.data, t)
                    }, 0)
                }, t.prototype._initIndexer = function() {
                    this.indexer = new vkIndexer(this.options, function(t) {
                        return t.label
                    })
                }, t.prototype._initDom = function(t) {
                    this.listEl = t.appendChild(ce("div", {
                        className: "rich_dropdown_list"
                    }))
                }, t.prototype._search = function() {
                    var t = this,
                        e = this.searchData,
                        r = void 0,
                        i = "show_operators" === e.extra,
                        s = "suggest_operator" === e.extra.substr(0, 16);
                    s && (e.query = ""), e.query = e.query.replace(/[^a-zа-я0-9\s]/gi, ""), i ? r = this.getOperators() : this.subOptions ? r = e.query ? this.subIndexer.search(e.query) : this.subOptions : (r = e.query ? this.indexer.search(e.query) : this.options, 0 !== r.length || "show_all_if_empty" !== e.extra && !s || (r = this.options)), r = clone(r);
                    var o = this.getOperators(!0, !0);
                    if (s) {
                        var a = e.extra.substr(16);
                        "&" === a && o["&!"] ? r.unshift(o["&!"]) : "|" === a && o["|!"] && r.unshift(o["|!"])
                    } else "show_no_operator" === e.extra && o["!"] && (e.query && o["!"].label.substr(0, e.query.length) !== e.query || r.unshift(o["!"]));
                    if (i)
                        for (var l = 0; l < r.length; l++)
                            if (r[l].isOperator && "!" === r[l].key) {
                                r.splice(l, 1);
                                break
                            }
                    if (JSON.stringify(r) !== this.lastItems || e.query !== this.lastQuery) {
                        val(this.listEl, "");
                        var p = e.query.toLowerCase(),
                            u = new RegExp("" + p, "ig"),
                            h = void 0;
                        if (i) {
                            var d = p.replace(/[^a-zа-я0-9\s]+/g, "").split("").map(function(t) {
                                return t + ".*?"
                            }).join("");
                            h = new RegExp("^(" + d + ")", "i");
                            for (var c = [], f = 0; f < r.length; f++) {
                                var E = r[f],
                                    y = E.label.match(h);
                                c.push([E, y ? y[0].length : 0])
                            }
                            c = c.sort(function(t, e) {
                                return t[1] < e[1] ? 1 : t[1] > e[1] ? -1 : 0
                            }), r = c.map(function(t) {
                                return t[0]
                            })
                        }
                        for (var v = function(e) {
                                var i = r[e],
                                    s = i.label.replace(u, function(t) {
                                        return "<span>" + t + "</span>"
                                    }),
                                    o = se('<div class="rich_dropdown_list_item">\n        <div class="rich_dropdown_list_item_label">' + s + '</div>\n        <div class="rich_dropdown_list_item_type">' + t._getType(i) + "</div>\n      </div>");
                                addEvent(o, "mousedown", function(e) {
                                    return t._onMouseDown(i, e)
                                }), addEvent(o, "mouseover", function(e) {
                                    vkNow() - (t.lastDownChangeTs || 0) > 500 && t._overItem(o, !0)
                                }), o.data = i, 0 === e && addClass(o, "selected"), n.setStyles(o, i.styles), t.listEl.appendChild(o)
                            }, g = 0; g < r.length; g++) v(g);
                        0 === r.length && val(this.listEl, '<div class="rich_dropdown_not_found">' + getLang("search_nothing_found") + "</div>"), this.lastItems = JSON.stringify(r), this.lastQuery = e.query;
                        var _ = bodyNode.appendChild(ce("div", {
                            innerHTML: val(this.listEl),
                            className: "rich_dropdown_list size_helper"
                        }));
                        setStyle(this.listEl, "width", _.offsetWidth + "px"), re(_)
                    }
                }, t.prototype._getType = function(t) {
                    if (t.options || t.custom_value) return "Value";
                    if (t.isOperator) switch (t.value) {
                        case "|":
                            return "Or";
                        case "&":
                            return "And";
                        case "!":
                            return "No"
                    }
                    return ""
                }, t.prototype._onMouseDown = function(t, e) {
                    e && cancelEvent(e), this.opts.onSelect(t, e)
                }, t.prototype._checkItem = function() {
                    var t = this,
                        e = this.searchData;
                    e.options ? (this.subOptions = e.options, this.subIndexer = new vkIndexer(this.subOptions, function(t) {
                        return t.label
                    }, function() {
                        t._search(e)
                    })) : (this.subIndexer = !1, this.subOptions = !1)
                }, t.prototype.setOperators = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    this.validOperators = {};
                    for (var e = 0; e < t.length; e++) this.validOperators[t[e]] = !0
                }, t.prototype.getOperators = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
                        r = String(getLang("global_rich_dd_operators")).split("/"),
                        i = [{
                            label: r[0],
                            key: "&",
                            isOperator: !0
                        }, {
                            label: r[1],
                            key: "|",
                            isOperator: !0
                        }, {
                            label: r[2],
                            key: "&!",
                            isOperator: !0
                        }, {
                            label: r[3],
                            key: "|!",
                            isOperator: !0
                        }, {
                            label: r[4],
                            key: "!",
                            isOperator: !0,
                            unary: !0
                        }],
                        n = [];
                    if (this.validOperators)
                        for (var s = 0; s < i.length; s++) this.validOperators[i[s].key] && n.push(i[s]);
                    else n = i;
                    if (t) {
                        for (var o = {}, a = 0; a < n.length; a++) {
                            var l = n[a];
                            o[(e ? l.key : l.label).toLowerCase()] = l
                        }
                        return o
                    }
                    return n
                }, t.prototype._overItem = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                    e || (this.lastDownChangeTs = vkNow(), this.listEl.scrollTop = t.offsetTop - this.listEl.offsetHeight / 2 + t.offsetHeight / 2), removeClass(geByClass1("selected", this.listEl), "selected"), addClass(t, "selected")
                }, t.prototype.setMaxWidth = function(t) {
                    setStyle(this.listEl, "max-width", parseInt(t) + "px")
                }, t
            }();
        e["default"] = s
    },
    545: function(t, e, r) {
        "use strict";

        function i(t) {
            return stripHTML(String(t)).replace(/\&nbsp\;/g, h.SPACE)
        }

        function n(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1, i = {}, s = 0; s < t.length; s++) {
                var o = t[s],
                    a = [r ? o.key : o.label];
                e && a.unshift(e);
                var l = a.join(".").toLowerCase();
                i[l] = o, o.options && (i = extend(i, n(o.options, l, r)))
            }
            return i
        }

        function s(t) {
            return String(t).split(/(\u0028|\u0029|\u003A|\s+)/g).filter(function(t) {
                return t
            })
        }

        function o(t, e) {
            var r = e || {},
                i = r.color;
            setStyle(t, {
                color: i
            })
        }

        function a(t, e) {
            var r = ce("div", {
                className: "rich_dropdown_textarea",
                innerHTML: (clean(e) || " ") + '<div class="rich_dropdown_cursor"></div>'
            }, {
                opacity: 0,
                position: "absolute"
            });
            t.appendChild(r);
            var i = geByClass1("rich_dropdown_cursor", r),
                n = {
                    left: i.offsetLeft,
                    top: i.offsetTop
                };
            return re(r), n
        }

        function l(t, e) {
            for (var r = s(e), i = t, n = 0; n < r.length; n++) {
                var o = trim(r[n]).toLowerCase();
                o && (i[o] || (i[o] = {}), i = i[o])
            }
        }

        function p(t, e, r) {
            return r.map(function(r) {
                return u(t, e, r)
            }).join(" ")
        }

        function u(t, e, r) {
            var i = r.type,
                n = r.key,
                s = r.values;
            switch (i) {
                case h.TYPE_SECTION:
                    return "( " + p(t, e, s) + " )";
                case h.TYPE_OPERATOR:
                    var o = t[n];
                    return isObject(o) ? o.label : "Failed (" + n + ")";
                case h.TYPE_OPERAND:
                    var a = e[n];
                    return isObject(a) ? a.label : "Failed (" + n + ")"
            }
            return "Bad type (" + i + ")"
        }
        r.r(e), r.d(e, "convertText", function() {
            return i
        }), r.d(e, "genOptionsObject", function() {
            return n
        }), r.d(e, "splitTextToWords", function() {
            return s
        }), r.d(e, "setStyles", function() {
            return o
        }), r.d(e, "getCursorPosition", function() {
            return a
        }), r.d(e, "prefixesThreeGen", function() {
            return l
        }), r.d(e, "itemsToString", function() {
            return p
        });
        var h = r(218)
    },
    63: function(t, e, r) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(e);
        var n = r(545),
            s = r(218),
            o = r(463),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            l = function() {
                function t(t, e) {
                    var r = [],
                        i = !0,
                        n = !1,
                        s = void 0;
                    try {
                        for (var o, a = t[Symbol.iterator](); !(i = (o = a.next()).done) && (r.push(o.value), !e || r.length !== e); i = !0);
                    } catch (l) {
                        n = !0, s = l
                    } finally {
                        try {
                            !i && a["return"] && a["return"]()
                        } finally {
                            if (n) throw s
                        }
                    }
                    return r
                }
                return function(e, r) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            p = function() {
                function t(e, r) {
                    i(this, t), this.el = e, this.opts = {}, this.autoComplete = new o["default"](e, r, {
                        onSelect: this._onSelect.bind(this)
                    }), this.updateOptionsObj(), this._init()
                }
                return t.prototype.destroy = function() {
                    this.textaraEl && (this.autoComplete.destroy(), removeEvent(this.textaraEl), val(this.el, ""), delete this.el, delete this.wrapEl, delete this.textaraEl, delete this.autoComplete)
                }, t.prototype.setOptions = function(t) {
                    this.opts = Object.assign(this.opts, t)
                }, t.prototype.updateOptionsObj = function() {
                    var t = this.autoComplete.getOptions(),
                        e = this.autoComplete.getOperators();
                    this.optionsObj = n.genOptionsObject(t);
                    for (var r = {}, i = 0; i < t.length; i++) n.prefixesThreeGen(r, t[i].label);
                    for (var s = 0; s < e.length; s++) n.prefixesThreeGen(r, e[s].label);
                    this.prefixesThree = r
                }, t.prototype.setPlaceholder = function(t) {
                    attr(this.textaraEl, "placeholder", t)
                }, t.prototype._init = function() {
                    var t = this,
                        e = se('<div class="rich_dropdown_wrap"><div contenteditable class="rich_dropdown"></div><textarea placeholder="Enter something.." class="rich_dropdown_textarea"></textarea></div>');
                    this.el.appendChild(e), this.wrapEl = e, this.inputEl = geByClass1("rich_dropdown", e), this.textaraEl = geByClass1("rich_dropdown_textarea", e), addEvent(this.textaraEl, "keydown", this._onKeyDown.bind(this)), addEvent(this.textaraEl, "keyup click input", this._onKeyUp.bind(this)), addEvent(this.textaraEl, "paste", function() {
                        return t.forceUpdate()
                    }), addEvent(this.textaraEl, "blur", this._onBlur.bind(this)), autosizeSetup(this.textaraEl, {
                        minHeight: 32,
                        addHeight: 2,
                        onResize: function() {
                            t.textaraEl.scrollTop = 0, t._process()
                        }
                    });
                    var r = intval(getStyle(this.textaraEl, "line-height").replace("px", ""));
                    this.autoComplete.setLineHeight(r)
                }, t.prototype._isNoEditableEvent = function(t) {
                    var e = inArray(t.keyCode, [KEY.UP, KEY.DOWN]) || !inArray(t.type, ["keydown", "keyup", "keypress"]) || t.ctrlKey || t.metaKey || inArray(t.key, ["Meta"]);
                    return t.force && (e = !1), e
                }, t.prototype._onKeyDown = function(t) {
                    inArray(t.keyCode, [KEY.UP, KEY.DOWN, KEY.ENTER]) && (this.autoComplete.onKeyDown(t), cancelEvent(t));
                    var e = this._isNoEditableEvent(t);
                    e && 90 === t.keyCode && this.forceUpdate()
                }, t.prototype.forceUpdate = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                        r = function() {
                            t._onKeyUp({
                                force: 1
                            }), t.textaraEl.autosize.update()
                        };
                    e ? r() : setTimeout(r, 5)
                }, t.prototype._onKeyUp = function(t) {
                    var e = this._isNoEditableEvent(t);
                    if (e || this._process(), (!e || "click" === t.type || "input" === t.type) && "insertText" !== t.inputType) {
                        var r = this._getQueryBySelection(!0),
                            i = l(r, 2),
                            s = i[0],
                            o = i[1],
                            a = n.getCursorPosition(this.wrapEl, val(this.textaraEl).substr(0, this.textaraEl.selectionStart));
                        this.autoComplete.update({
                            pos: a,
                            query: trim(s),
                            extra: o
                        })
                    }
                }, t.prototype._onBlur = function(t) {
                    this.autoComplete.hide()
                }, t.prototype._onSelect = function(t, e) {
                    this._replaceTextBySelection(t)
                }, t.prototype._validatedParsedValue = function(t) {
                    for (var e = null, r = this.autoComplete.getOperators(!0), i = [], n = 0; n < t.length; n++) {
                        var o = t[n],
                            a = o.type,
                            l = o.words,
                            p = trim(l.join("")),
                            u = a;
                        if (a === s.TYPE_BRACKET && (u = "(" === trim(l.join("")) ? s.TYPE_OPEN_BRACKET : s.TYPE_CLOSE_BRACKET), u === s.TYPE_ITEM && inArray(e, [s.TYPE_ITEM, s.TYPE_CLOSE_BRACKET])) return !1;
                        if (u === s.TYPE_OPEN_BRACKET) {
                            if (e && !inArray(e, [s.TYPE_CLOSE_BRACKET, s.TYPE_OPERATOR, s.TYPE_OPEN_BRACKET])) return !1;
                            i.push("(")
                        } else {
                            if (u === s.TYPE_CLOSE_BRACKET && !i.pop()) return !1;
                            if (u === s.TYPE_OPERATOR) {
                                var h = r[p];
                                if (!h.unary && !inArray(e, [s.TYPE_CLOSE_BRACKET, s.TYPE_ITEM])) return !1;
                                if (h.unary && null !== e && e !== s.TYPE_OPEN_BRACKET) return !1
                            }
                        }
                        e = u
                    }
                    return i.length > 0 ? !1 : !0
                }, t.prototype.getValue = function() {
                    function t() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return {
                            children: [],
                            parent: t,
                            data: e
                        }
                    }
                    var e = this._parseStr(val(this.textaraEl)),
                        r = this.optionsObj,
                        i = this.autoComplete.getOperators(!0);
                    if (!this._validatedParsedValue(e)) return !1;
                    for (var n = t(), o = n, a = 0; a < e.length; a++) {
                        var l = e[a],
                            p = l.type,
                            u = l.words,
                            h = u.join("");
                        if (trim(h)) {
                            var d = !1,
                                c = void 0;
                            if (p === s.TYPE_BRACKET) {
                                if ("(" !== u[0]) {
                                    if (o && o.parent) {
                                        o = o.parent;
                                        continue
                                    }
                                    return !1
                                }
                                d = !0, l.isSection = !0
                            } else {
                                if (inArray(p, [s.TYPE_COLON, s.TYPE_COMMA])) continue;
                                if (p === s.TYPE_OPERATOR) l.data = i[trim(h).toLowerCase()];
                                else if (p === s.TYPE_ITEM) {
                                    var f = r[trim(h.toLowerCase())];
                                    if (!f) return !1;
                                    l.data = f
                                }
                            }
                            c = t(o, l), o.children.push(c), d && (o = c, d = !1)
                        }
                    }
                    return this._threeToArray(n)
                }, t.prototype.getStringValue = function() {
                    var t = this._parseStr(val(this.textaraEl)),
                        e = this.optionsObj,
                        r = this.autoComplete.getOperators(!0);
                    if (!this._validatedParsedValue(t)) return !1;
                    for (var i = [], n = 0; n < t.length; n++) {
                        var o = t[n],
                            a = o.type,
                            l = o.words,
                            p = l.join("");
                        if (trim(p))
                            if (a === s.TYPE_BRACKET) i.push(p);
                            else if (a === s.TYPE_OPERATOR) i.push(r[trim(p).toLowerCase()].key);
                        else if (a === s.TYPE_ITEM) {
                            var u = e[trim(p).toLowerCase()];
                            if (!u) return !1;
                            i.push(u.key)
                        }
                    }
                    return i.join("")
                }, t.prototype._threeToArray = function(t) {
                    for (var e = [], r = 0; r < t.children.length; r++) {
                        var i = t.children[r],
                            n = i.data,
                            o = n.type,
                            a = n.isSection,
                            l = n.data,
                            p = {};
                        a ? p.type = s.TYPE_SECTION : o === s.TYPE_OPERATOR ? (p.type = s.TYPE_OPERATOR, p.key = l.key) : (p.type = s.TYPE_OPERAND, p.key = l.key), a && (p.values = this._threeToArray(i)), e.push(p)
                    }
                    return e
                }, t.prototype.renderByInitialData = function(t) {
                    val(this.inputEl, ""), val(this.textaraEl, ""), t && (isString(t) ? this._renderByInitialStringData(t) : this._renderByInitialData(t))
                }, t.prototype._renderByInitialStringData = function(t) {
                    var e = this.autoComplete.getOperators(!0, !0),
                        r = n.genOptionsObject(this.autoComplete.getOptions(), !1, !0),
                        i = trim(t).match(/([a-zA-Z0-9._]+|[\u0021\u007C\u0026]+|[\u0028\u0029])/g),
                        s = i.map(function(t) {
                            if (e[t]) return e[t].label;
                            if (inArray(t, ["(", ")"])) return t;
                            var i = r[t];
                            return isObject(i) ? i.label : "Failed (" + t + ")"
                        });
                    val(this.textaraEl, s.join(" ")), this._process()
                }, t.prototype.setValue = function(t) {
                    this.renderByInitialData(t), this.forceUpdate(!0), this.autoComplete.hide(), this.disabled && (this.disabledOrigText = val(this.textaraEl))
                }, t.prototype._renderByInitialData = function(t) {
                    var e = this.autoComplete.getOperators(!0, !0),
                        r = n.genOptionsObject(this.autoComplete.getOptions(), !1, !0),
                        i = n.itemsToString(e, r, t);
                    val(this.textaraEl, i), this._process()
                }, t.prototype._validateLastItem = function(t, e, r) {
                    var i = this.optionsObj,
                        n = e.length - 1,
                        o = trim(e[n].words.join("")).toLowerCase().replace(/\s\s+/g, " "),
                        a = e[n - 1];
                    return t[o] && (r > 0 || t[o].unary) ? (e[n].type = s.TYPE_OPERATOR, e[n].validated = !0, e[n].data = t[o]) : !i[o] || a && a.type === s.TYPE_ITEM || (e[n].type = s.TYPE_ITEM, e[n].validated = !0), e
                }, t.prototype._parseStr = function(t) {
                    for (var e = n.splitTextToWords(t), r = this.autoComplete.getOperators(!0), i = (this.optionsObj, this.textaraEl.selectionStart), o = [], l = this.prefixesThree, p = !1, u = void 0, h = 0, d = !1, c = 0, f = 0; f < e.length; f++) {
                        var E = e[f];
                        if (E) {
                            var y = o[o.length - 1] ? o[o.length - 1].validated : !1,
                                v = trim(E).toLowerCase();
                            h += E.length;
                            var g = void 0;
                            if (g = ":" === v ? s.TYPE_COLON : "," === v ? s.TYPE_COMMA : inArray(v, ["(", ")"]) ? s.TYPE_BRACKET : s.TYPE_ITEM, g === s.TYPE_ITEM) {
                                u || (o.push({
                                    type: g,
                                    words: []
                                }), u = o[o.length - 1]);
                                var _ = "object" === a(l[v]),
                                    T = E.match(/\s/),
                                    m = !1;
                                !T && !_ || p || (o[o.length - 1].words.push(E), this._validateLastItem(r, o, c), m = !0), !_ && !T || p ? (m || (_ || o[o.length - 1].validated || o[o.length - 1].type !== g ? o.push({
                                    type: g,
                                    words: [E]
                                }) : o[o.length - 1].words.push(E)), u = o[o.length - 1], this._validateLastItem(r, o, c), "object" === a(this.prefixesThree[v]) ? (l = this.prefixesThree[v], p = !1) : (l = this.prefixesThree, p = !0)) : _ && (l = l[v], p = !1), h >= i && !d && (o[o.length - 1].selected = !0, d = !0), inArray(g, [s.TYPE_COLON, s.TYPE_COMMA, s.TYPE_BRACKET]) && (o[o.length - 1].validated = !0), y && o[o.length - 1].validated && c++
                            } else o.push({
                                type: g,
                                words: [E]
                            }), u = !1
                        }
                    }
                    return o
                }, t.prototype._process = function() {
                    var t = clean(val(this.textaraEl).replace(/\n/g, "")),
                        e = this.optionsObj,
                        r = this._parseStr(t);
                    val(this.inputEl, "");
                    for (var i = [], n = 0; n < r.length; n++) {
                        var o = r[n],
                            a = o.type,
                            l = o.words,
                            p = o.validated,
                            u = l.join(""),
                            h = ce("div", {
                                className: s.ITEM_CLASS + " " + a
                            });
                        if (a === s.TYPE_ITEM) {
                            var d = e[trim(u.toLowerCase()).replace(/\s\s+/g, " ")];
                            p && isObject(d) && (addClass(h, "validated"), toggleClass(h, "value", !d.options))
                        } else if (inArray(a, [s.TYPE_OPERATOR, s.TYPE_COLON, s.TYPE_COMMA])) addClass(h, "validated");
                        else if (a === s.TYPE_BRACKET)
                            if ("(" === u) addClass(h, "incorrect"), i.push(h);
                            else {
                                var c = i.pop();
                                c ? removeClass(c, "incorrect") : addClass(h, "incorrect")
                            }
                        for (var f = "", E = 0; E < l.length; E++) {
                            var y = l[E].replace(/\s/g, "&nbsp;"),
                                v = "";
                            !l[E].match(/^\s+$/) || 0 !== E && E !== l.length - 1 || (v = "spaces_only"), f += '<span class="' + v + '">' + y + "</span>"
                        }
                        val(h, f), this.inputEl.appendChild(h)
                    }
                    0 === r.length && val(this.inputEl, " "), this.opts.onChange && this.opts.onChange(), this.textaraEl.scrollTop = 0
                }, t.prototype._checkOperatorByPrefix = function(t) {
                    for (var e = this.autoComplete.getOperators(), r = t.length, i = 0; i < e.length; i++)
                        if (e[i].label.substr(0, r) === t) return !0;
                    return !1
                }, t.prototype._getQueryBySelection = function() {
                    for (var t = this.textaraEl.selectionStart, e = this.autoComplete.getOperators(!0), r = val(this.textaraEl), i = this._parseStr(r), o = void 0, a = 0, l = void 0, p = void 0, u = 0, h = 0; h < i.length; h++) {
                        var d = i[h],
                            c = d.words.join("");
                        if (trim(c) && (l = d), d.validated && (p = d, u++), d.selected) {
                            o = d;
                            break
                        }
                        a += c.length
                    }
                    if (o || (o = l), !o) return ["", "show_no_operator"];
                    var f = "",
                        E = o.words.join("").substr(0, Math.max(0, t - a)),
                        y = n.splitTextToWords(E).pop(),
                        v = !!String(y).match(/\s$/),
                        g = p && p.type === s.TYPE_ITEM,
                        _ = trim(l.words.join(""));
                    return (o.type === s.TYPE_OPERATOR && (y !== s.SPACE || E !== o.words.join("")) && u > 1 || l && l.type === s.TYPE_BRACKET && ")" === _ || o.type === s.TYPE_ITEM && o.validated && v && E === o.words.join("") || o.type === s.TYPE_ITEM && !o.validated && this._checkOperatorByPrefix(o.words.join("")) && g) && (f = "show_operators"), o.type === s.TYPE_OPERATOR && inArray(o.data.key, ["|", "&"]) && v && (f = "suggest_operator" + o.data.key), (l.type === s.TYPE_BRACKET && "(" === _ || !u && 1 === i.length || "operator" === l.type && "!" === e[_].key && !v) && (f = "show_no_operator"), !f && v && (f = "show_all_if_empty"), [clean(E), f]
                }, t.prototype._replaceTextBySelection = function(t) {
                    for (var e = this.textaraEl.selectionStart, r = this.textaraEl.selectionEnd, i = val(this.textaraEl), n = " " + t.label + " ", o = t.isOperator ? s.TYPE_OPERATOR : s.TYPE_ITEM, a = "", l = null, p = this._parseStr(i, 1), u = !0, h = 0, d = !1, c = 0; c < p.length; c++) {
                        var f = p[c],
                            E = f.selected,
                            y = f.words,
                            v = f.type,
                            g = f.validated,
                            _ = y.join(""),
                            T = _.length;
                        if (h += T, (h > e || E && (!g || o === v)) && (null === l && (l = h - T), o === v && (p[c].words = [n], p[c].validated = !0, u = !1), E && (d = !0), h >= r)) break
                    }
                    u && (p.push({
                        words: [n]
                    }), e !== r || d || (l = h = e));
                    for (var m = 0; m < p.length; m++) {
                        var O = p[m],
                            v = O.type,
                            y = O.words,
                            g = O.validated;
                        (!inArray(v, [s.TYPE_ITEM, s.TYPE_OPERATOR]) || g) && (a += y.join(""))
                    }
                    if (a || (l = r - n.length), browser.mozilla) {
                        var C = i.substr(0, l) + n.replace(/\s\s+/g, " ") + i.substr(h),
                            b = C.length - i.length;
                        val(this.textaraEl, C);
                        var x = Math.max(l, h + b);
                        this.textaraEl.setSelectionRange(x, x)
                    } else this.textaraEl.setSelectionRange(l, h), document.execCommand("insertText", !0, n.replace(/\s\s+/g, " "));
                    var w = val(this.textaraEl),
                        P = w.length;
                    if (w = w.replace(/\s\s+/g, " ").replace(/^\s+/, ""), P !== w.length) {
                        var S = this.textaraEl.selectionEnd - (P - w.length);
                        val(this.textaraEl, w), this.textaraEl.selectionStart === this.textaraEl.selectionEnd && (this.textaraEl.selectionStart = S), this.textaraEl.selectionEnd = S
                    }
                    this._onKeyUp({
                        force: !0
                    }), this.textaraEl.autosize.update()
                }, t.prototype.setDisabledText = function(t) {
                    this.disabledText = t
                }, t.prototype.disable = function() {
                    this.disabled || (this.disabled = !0, this.disabledOrigText = val(this.textaraEl), this.disabledText && val(this.textaraEl, this.disabledText), this.forceUpdate(!0), this.autoComplete.hide(), addClass(this.wrapEl, "disabled"))
                }, t.prototype.enable = function() {
                    this.disabled && (this.disabled = !1, val(this.textaraEl, this.disabledOrigText), delete this.disabledOrigText, this.forceUpdate(!0), this.autoComplete.hide(), removeClass(this.wrapEl, "disabled"))
                }, t.prototype.setAutoCompleteMaxWidth = function(t) {
                    this.autoComplete.setMaxWidth(t)
                }, t.prototype.setWidth = function(t) {
                    var e = this;
                    this.width = t, setStyle(this.wrapEl, "width", t + "px"), setStyle(this.textaraEl, "width", t + "px"), setStyle(this.textaraEl.autosize.helper, "width", t + "px"), setTimeout(function() {
                        e.forceUpdate(!0), e.autoComplete.hide()
                    })
                }, t
            }();
        e["default"] = p
    }
});