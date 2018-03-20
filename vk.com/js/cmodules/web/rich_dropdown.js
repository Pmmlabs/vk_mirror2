! function(t) {
    function e(i) {
        if (r[i]) return r[i].exports;
        var s = r[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0)
}({
    0: function(t, e, r) {
        t.exports = r(19)
    },
    19: function(t, e, r) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        var s = r(346),
            a = i(s);
        window.RichDropDown = a["default"];
        try {
            stManager.done("rich_dropdown.js")
        } catch (o) {}
    },
    70: function(t, e, r) {
        "use strict";

        function i(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e["default"] = t, e
        }

        function s(t) {
            return stripHTML(String(t)).replace(/\&nbsp\;/g, c.SPACE)
        }

        function a(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1, i = {}, s = 0; s < t.length; s++) {
                var o = t[s],
                    n = [r ? o.key : o.label];
                e && n.unshift(e);
                var l = n.join(".").toLowerCase();
                i[l] = o, o.options && (i = extend(i, a(o.options, l, r)))
            }
            return i
        }

        function o(t) {
            return String(t).split(/(\u0028|\u0029|\u003A|\s+)/g).filter(function(t) {
                return t
            })
        }

        function n(t, e) {
            var r = e || {},
                i = r.color;
            setStyle(t, {
                color: i
            })
        }

        function l(t, e) {
            var r = ce("div", {
                className: "rich_dropdown_textarea",
                innerHTML: (clean(e) || " ") + '<div class="rich_dropdown_cursor"></div>'
            }, {
                opacity: 0,
                position: "absolute"
            });
            t.appendChild(r);
            var i = geByClass1("rich_dropdown_cursor", r),
                s = {
                    left: i.offsetLeft,
                    top: i.offsetTop
                };
            return re(r), s
        }

        function p(t, e) {
            for (var r = o(e), i = t, s = 0; s < r.length; s++) {
                var a = trim(r[s]).toLowerCase();
                a && (i[a] || (i[a] = {}), i = i[a])
            }
        }

        function u(t, e, r) {
            return r.map(function(r) {
                return h(t, e, r)
            }).join(" ")
        }

        function h(t, e, r) {
            var i = r.type,
                s = r.key,
                a = r.values;
            switch (i) {
                case c.TYPE_SECTION:
                    return "( " + u(t, e, a) + " )";
                case c.TYPE_OPERATOR:
                    var o = t[s];
                    return isObject(o) ? o.label : "Failed (" + s + ")";
                case c.TYPE_OPERAND:
                    var n = e[s];
                    return isObject(n) ? n.label : "Failed (" + s + ")"
            }
            return "Bad type (" + i + ")"
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.convertText = s, e.genOptionsObject = a, e.splitTextToWords = o, e.setStyles = n, e.getCursorPosition = l, e.prefixesThreeGen = p, e.itemsToString = u;
        var d = r(73),
            c = i(d)
    },
    73: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.SPACE = " ", e.ITEM_CLASS = "rich_dropdown_item", e.TYPE_ITEM = "item", e.TYPE_OPERATOR = "operator", e.TYPE_BRACKET = "bracket", e.TYPE_OPEN_BRACKET = "open_bracket", e.TYPE_CLOSE_BRACKET = "close_bracket", e.TYPE_SECTION = "section", e.TYPE_OPERAND = "operand", e.TYPE_COLON = "colon", e.TYPE_COMMA = "comma"
    },
    267: function(t, e, r) {
        "use strict";

        function i(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e["default"] = t, e
        }

        function s(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = r(70),
            o = i(a),
            n = function() {
                function t(e, r) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    s(this, t), this.options = r, this.itemEl = null, this.opts = i, this._initIndexer(), this._initDom(e)
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
                    var a = this.getOperators(!0, !0);
                    if (s) {
                        var n = e.extra.substr(16);
                        "&" === n && a["&!"] ? r.unshift(a["&!"]) : "|" === n && a["|!"] && r.unshift(a["|!"])
                    } else "show_no_operator" === e.extra && a["!"] && (e.query && a["!"].label.substr(0, e.query.length) !== e.query || r.unshift(a["!"]));
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
                                    a = se('<div class="rich_dropdown_list_item">\n        <div class="rich_dropdown_list_item_label">' + s + '</div>\n        <div class="rich_dropdown_list_item_type">' + t._getType(i) + "</div>\n      </div>");
                                addEvent(a, "mousedown", function(e) {
                                    return t._onMouseDown(i, e)
                                }), addEvent(a, "mouseover", function(e) {
                                    vkNow() - (t.lastDownChangeTs || 0) > 500 && t._overItem(a, !0)
                                }), a.data = i, 0 === e && addClass(a, "selected"), o.setStyles(a, i.styles), t.listEl.appendChild(a)
                            }, _ = 0; _ < r.length; _++) v(_);
                        0 === r.length && val(this.listEl, '<div class="rich_dropdown_not_found">' + getLang("search_nothing_found") + "</div>"), this.lastItems = JSON.stringify(r), this.lastQuery = e.query;
                        var g = bodyNode.appendChild(ce("div", {
                            innerHTML: val(this.listEl),
                            className: "rich_dropdown_list size_helper"
                        }));
                        setStyle(this.listEl, "width", g.offsetWidth + "px"), re(g)
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
                        s = [];
                    if (this.validOperators)
                        for (var a = 0; a < i.length; a++) this.validOperators[i[a].key] && s.push(i[a]);
                    else s = i;
                    if (t) {
                        for (var o = {}, n = 0; n < s.length; n++) {
                            var l = s[n];
                            o[(e ? l.key : l.label).toLowerCase()] = l
                        }
                        return o
                    }
                    return s
                }, t.prototype._overItem = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                    e || (this.lastDownChangeTs = vkNow(), this.listEl.scrollTop = t.offsetTop - this.listEl.offsetHeight / 2 + t.offsetHeight / 2), removeClass(geByClass1("selected", this.listEl), "selected"), addClass(t, "selected")
                }, t.prototype.setMaxWidth = function(t) {
                    setStyle(this.listEl, "max-width", parseInt(t) + "px")
                }, t
            }();
        e["default"] = n
    },
    346: function(t, e, r) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function s(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = r(507),
            o = i(a),
            n = function() {
                function t(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return s(this, t), r.items = r.items || [], e = ge(e), addClass(e, "rich_dropdown_wrap"), this.input = new o["default"](e, r.items), this.input.renderByInitialData(r.initialData), this.setOptions(r), this
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
        e["default"] = n
    },
    507: function(t, e, r) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function s(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e["default"] = t, e
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            n = function() {
                function t(t, e) {
                    var r = [],
                        i = !0,
                        s = !1,
                        a = void 0;
                    try {
                        for (var o, n = t[Symbol.iterator](); !(i = (o = n.next()).done) && (r.push(o.value), !e || r.length !== e); i = !0);
                    } catch (l) {
                        s = !0, a = l
                    } finally {
                        try {
                            !i && n["return"] && n["return"]()
                        } finally {
                            if (s) throw a
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
            l = r(70),
            p = s(l),
            u = r(73),
            h = s(u),
            d = r(267),
            c = i(d),
            f = function() {
                function t(e, r) {
                    a(this, t), this.el = e, this.opts = {}, this.autoComplete = new c["default"](e, r, {
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
                    this.optionsObj = p.genOptionsObject(t);
                    for (var r = {}, i = 0; i < t.length; i++) p.prefixesThreeGen(r, t[i].label);
                    for (var s = 0; s < e.length; s++) p.prefixesThreeGen(r, e[s].label);
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
                            i = n(r, 2),
                            s = i[0],
                            a = i[1],
                            o = p.getCursorPosition(this.wrapEl, val(this.textaraEl).substr(0, this.textaraEl.selectionStart));
                        this.autoComplete.update({
                            pos: o,
                            query: trim(s),
                            extra: a
                        })
                    }
                }, t.prototype._onBlur = function(t) {
                    this.autoComplete.hide()
                }, t.prototype._onSelect = function(t, e) {
                    this._replaceTextBySelection(t)
                }, t.prototype._validatedParsedValue = function(t) {
                    for (var e = null, r = this.autoComplete.getOperators(!0), i = [], s = 0; s < t.length; s++) {
                        var a = t[s],
                            o = a.type,
                            n = a.words,
                            l = trim(n.join("")),
                            p = o;
                        if (o === h.TYPE_BRACKET && (p = "(" === trim(n.join("")) ? h.TYPE_OPEN_BRACKET : h.TYPE_CLOSE_BRACKET), p === h.TYPE_ITEM && inArray(e, [h.TYPE_ITEM, h.TYPE_CLOSE_BRACKET])) return !1;
                        if (p === h.TYPE_OPEN_BRACKET) {
                            if (e && !inArray(e, [h.TYPE_CLOSE_BRACKET, h.TYPE_OPERATOR, h.TYPE_OPEN_BRACKET])) return !1;
                            i.push("(")
                        } else {
                            if (p === h.TYPE_CLOSE_BRACKET && !i.pop()) return !1;
                            if (p === h.TYPE_OPERATOR) {
                                var u = r[l];
                                if (!u.unary && !inArray(e, [h.TYPE_CLOSE_BRACKET, h.TYPE_ITEM])) return !1;
                                if (u.unary && null !== e && e !== h.TYPE_OPEN_BRACKET) return !1
                            }
                        }
                        e = p
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
                    for (var s = t(), a = s, o = 0; o < e.length; o++) {
                        var n = e[o],
                            l = n.type,
                            p = n.words,
                            u = p.join("");
                        if (trim(u)) {
                            var d = !1,
                                c = void 0;
                            if (l === h.TYPE_BRACKET) {
                                if ("(" !== p[0]) {
                                    if (a && a.parent) {
                                        a = a.parent;
                                        continue
                                    }
                                    return !1
                                }
                                d = !0, n.isSection = !0
                            } else {
                                if (inArray(l, [h.TYPE_COLON, h.TYPE_COMMA])) continue;
                                if (l === h.TYPE_OPERATOR) n.data = i[trim(u).toLowerCase()];
                                else if (l === h.TYPE_ITEM) {
                                    var f = r[trim(u.toLowerCase())];
                                    if (!f) return !1;
                                    n.data = f
                                }
                            }
                            c = t(a, n), a.children.push(c), d && (a = c, d = !1)
                        }
                    }
                    return this._threeToArray(s)
                }, t.prototype.getStringValue = function() {
                    var t = this._parseStr(val(this.textaraEl)),
                        e = this.optionsObj,
                        r = this.autoComplete.getOperators(!0);
                    if (!this._validatedParsedValue(t)) return !1;
                    for (var i = [], s = 0; s < t.length; s++) {
                        var a = t[s],
                            o = a.type,
                            n = a.words,
                            l = n.join("");
                        if (trim(l))
                            if (o === h.TYPE_BRACKET) i.push(l);
                            else if (o === h.TYPE_OPERATOR) i.push(r[trim(l).toLowerCase()].key);
                        else if (o === h.TYPE_ITEM) {
                            var p = e[trim(l).toLowerCase()];
                            if (!p) return !1;
                            i.push(p.key)
                        }
                    }
                    return i.join("")
                }, t.prototype._threeToArray = function(t) {
                    for (var e = [], r = 0; r < t.children.length; r++) {
                        var i = t.children[r],
                            s = i.data,
                            a = s.type,
                            o = s.isSection,
                            n = s.data,
                            l = {};
                        o ? l.type = h.TYPE_SECTION : a === h.TYPE_OPERATOR ? (l.type = h.TYPE_OPERATOR, l.key = n.key) : (l.type = h.TYPE_OPERAND, l.key = n.key), o && (l.values = this._threeToArray(i)), e.push(l)
                    }
                    return e
                }, t.prototype.renderByInitialData = function(t) {
                    val(this.inputEl, ""), val(this.textaraEl, ""), t && (isString(t) ? this._renderByInitialStringData(t) : this._renderByInitialData(t))
                }, t.prototype._renderByInitialStringData = function(t) {
                    var e = this.autoComplete.getOperators(!0, !0),
                        r = p.genOptionsObject(this.autoComplete.getOptions(), !1, !0),
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
                        r = p.genOptionsObject(this.autoComplete.getOptions(), !1, !0),
                        i = p.itemsToString(e, r, t);
                    val(this.textaraEl, i), this._process()
                }, t.prototype._validateLastItem = function(t, e, r) {
                    var i = this.optionsObj,
                        s = e.length - 1,
                        a = trim(e[s].words.join("")).toLowerCase().replace(/\s\s+/g, " "),
                        o = e[s - 1];
                    return t[a] && (r > 0 || t[a].unary) ? (e[s].type = h.TYPE_OPERATOR, e[s].validated = !0, e[s].data = t[a]) : !i[a] || o && o.type === h.TYPE_ITEM || (e[s].type = h.TYPE_ITEM, e[s].validated = !0), e
                }, t.prototype._parseStr = function(t) {
                    for (var e = p.splitTextToWords(t), r = this.autoComplete.getOperators(!0), i = (this.optionsObj, this.textaraEl.selectionStart), s = [], a = this.prefixesThree, n = !1, l = void 0, u = 0, d = !1, c = 0, f = 0; f < e.length; f++) {
                        var E = e[f];
                        if (E) {
                            var y = s[s.length - 1] ? s[s.length - 1].validated : !1,
                                v = trim(E).toLowerCase();
                            u += E.length;
                            var _ = void 0;
                            if (_ = ":" === v ? h.TYPE_COLON : "," === v ? h.TYPE_COMMA : inArray(v, ["(", ")"]) ? h.TYPE_BRACKET : h.TYPE_ITEM, _ === h.TYPE_ITEM) {
                                l || (s.push({
                                    type: _,
                                    words: []
                                }), l = s[s.length - 1]);
                                var g = "object" === o(a[v]),
                                    T = E.match(/\s/),
                                    m = !1;
                                !T && !g || n || (s[s.length - 1].words.push(E), this._validateLastItem(r, s, c), m = !0), !g && !T || n ? (m || (g || s[s.length - 1].validated || s[s.length - 1].type !== _ ? s.push({
                                    type: _,
                                    words: [E]
                                }) : s[s.length - 1].words.push(E)), l = s[s.length - 1], this._validateLastItem(r, s, c), "object" === o(this.prefixesThree[v]) ? (a = this.prefixesThree[v], n = !1) : (a = this.prefixesThree, n = !0)) : g && (a = a[v], n = !1), u >= i && !d && (s[s.length - 1].selected = !0, d = !0), inArray(_, [h.TYPE_COLON, h.TYPE_COMMA, h.TYPE_BRACKET]) && (s[s.length - 1].validated = !0), y && s[s.length - 1].validated && c++
                            } else s.push({
                                type: _,
                                words: [E]
                            }), l = !1
                        }
                    }
                    return s
                }, t.prototype._process = function() {
                    var t = clean(val(this.textaraEl).replace(/\n/g, "")),
                        e = this.optionsObj,
                        r = this._parseStr(t);
                    val(this.inputEl, "");
                    for (var i = [], s = 0; s < r.length; s++) {
                        var a = r[s],
                            o = a.type,
                            n = a.words,
                            l = a.validated,
                            p = n.join(""),
                            u = ce("div", {
                                className: h.ITEM_CLASS + " " + o
                            });
                        if (o === h.TYPE_ITEM) {
                            var d = e[trim(p.toLowerCase()).replace(/\s\s+/g, " ")];
                            l && isObject(d) && (addClass(u, "validated"), toggleClass(u, "value", !d.options))
                        } else if (inArray(o, [h.TYPE_OPERATOR, h.TYPE_COLON, h.TYPE_COMMA])) addClass(u, "validated");
                        else if (o === h.TYPE_BRACKET)
                            if ("(" === p) addClass(u, "incorrect"), i.push(u);
                            else {
                                var c = i.pop();
                                c ? removeClass(c, "incorrect") : addClass(u, "incorrect")
                            }
                        for (var f = "", E = 0; E < n.length; E++) {
                            var y = n[E].replace(/\s/g, "&nbsp;"),
                                v = "";
                            !n[E].match(/^\s+$/) || 0 !== E && E !== n.length - 1 || (v = "spaces_only"), f += '<span class="' + v + '">' + y + "</span>"
                        }
                        val(u, f), this.inputEl.appendChild(u)
                    }
                    0 === r.length && val(this.inputEl, " "), this.opts.onChange && this.opts.onChange(), this.textaraEl.scrollTop = 0
                }, t.prototype._checkOperatorByPrefix = function(t) {
                    for (var e = this.autoComplete.getOperators(), r = t.length, i = 0; i < e.length; i++)
                        if (e[i].label.substr(0, r) === t) return !0;
                    return !1
                }, t.prototype._getQueryBySelection = function() {
                    for (var t = this.textaraEl.selectionStart, e = this.autoComplete.getOperators(!0), r = val(this.textaraEl), i = this._parseStr(r), s = void 0, a = 0, o = void 0, n = void 0, l = 0, u = 0; u < i.length; u++) {
                        var d = i[u],
                            c = d.words.join("");
                        if (trim(c) && (o = d), d.validated && (n = d, l++), d.selected) {
                            s = d;
                            break
                        }
                        a += c.length
                    }
                    if (s || (s = o), !s) return ["", "show_no_operator"];
                    var f = "",
                        E = s.words.join("").substr(0, Math.max(0, t - a)),
                        y = p.splitTextToWords(E).pop(),
                        v = !!String(y).match(/\s$/),
                        _ = n && n.type === h.TYPE_ITEM,
                        g = trim(o.words.join(""));
                    return (s.type === h.TYPE_OPERATOR && (y !== h.SPACE || E !== s.words.join("")) && l > 1 || o && o.type === h.TYPE_BRACKET && ")" === g || s.type === h.TYPE_ITEM && s.validated && v && E === s.words.join("") || s.type === h.TYPE_ITEM && !s.validated && this._checkOperatorByPrefix(s.words.join("")) && _) && (f = "show_operators"), s.type === h.TYPE_OPERATOR && inArray(s.data.key, ["|", "&"]) && v && (f = "suggest_operator" + s.data.key), (o.type === h.TYPE_BRACKET && "(" === g || !l && 1 === i.length || "operator" === o.type && "!" === e[g].key && !v) && (f = "show_no_operator"), !f && v && (f = "show_all_if_empty"), [clean(E), f]
                }, t.prototype._replaceTextBySelection = function(t) {
                    for (var e = this.textaraEl.selectionStart, r = this.textaraEl.selectionEnd, i = val(this.textaraEl), s = " " + t.label + " ", a = t.isOperator ? h.TYPE_OPERATOR : h.TYPE_ITEM, o = "", n = null, l = this._parseStr(i, 1), p = !0, u = 0, d = !1, c = 0; c < l.length; c++) {
                        var f = l[c],
                            E = f.selected,
                            y = f.words,
                            v = f.type,
                            _ = f.validated,
                            g = y.join(""),
                            T = g.length;
                        if (u += T, (u > e || E && (!_ || a === v)) && (null === n && (n = u - T), a === v && (l[c].words = [s], l[c].validated = !0, p = !1), E && (d = !0), u >= r)) break
                    }
                    p && (l.push({
                        words: [s]
                    }), e !== r || d || (n = u = e));
                    for (var m = 0; m < l.length; m++) {
                        var O = l[m],
                            v = O.type,
                            y = O.words,
                            _ = O.validated;
                        (!inArray(v, [h.TYPE_ITEM, h.TYPE_OPERATOR]) || _) && (o += y.join(""))
                    }
                    if (o || (n = r - s.length), browser.mozilla) {
                        var b = i.substr(0, n) + s.replace(/\s\s+/g, " ") + i.substr(u),
                            C = b.length - i.length;
                        val(this.textaraEl, b);
                        var x = Math.max(n, u + C);
                        this.textaraEl.setSelectionRange(x, x)
                    } else this.textaraEl.setSelectionRange(n, u), document.execCommand("insertText", !0, s.replace(/\s\s+/g, " "));
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
        e["default"] = f
    }
});