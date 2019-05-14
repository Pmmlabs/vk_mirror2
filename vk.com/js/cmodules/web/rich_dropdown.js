! function(t) {
    var e = {};

    function i(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.l = !0, o.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) i.d(r, o, function(e) {
                return t[e]
            }.bind(null, o));
        return r
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 129)
}({
    129: function(t, e, i) {
        t.exports = i("e8JN")
    },
    e8JN: function(t, e, i) {
        "use strict";
        i.r(e);
        var r = " ",
            o = "operator",
            a = "section",
            s = "operand";

        function n(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = {}, o = 0; o < t.length; o++) {
                var a = t[o],
                    s = [i ? a.key : a.label];
                e && s.unshift(e);
                var l = s.join(".").toLowerCase();
                r[l] = a, a.options && (r = extend(r, n(a.options, l, i)))
            }
            return r
        }

        function l(t) {
            return String(t).split(/(\u0028|\u0029|\u003A|\s+)/g).filter(function(t) {
                return t
            })
        }

        function p(t, e) {
            for (var i = l(e), r = t, o = 0; o < i.length; o++) {
                var a = trim(i[o]).toLowerCase();
                a && (r[a] || (r[a] = {}), r = r[a])
            }
        }

        function h(t, e, i) {
            return i.map(function(i) {
                return function(t, e, i) {
                    var r = i.type,
                        n = i.key,
                        l = i.values;
                    switch (r) {
                        case a:
                            return "( " + h(t, e, l) + " )";
                        case o:
                            var p = t[n];
                            return isObject(p) ? p.label : "Failed (" + n + ")";
                        case s:
                            var u = e[n];
                            return isObject(u) ? u.label : "Failed (" + n + ")"
                    }
                    return "Bad type (" + r + ")"
                }(t, e, i)
            }).join(" ")
        }
        var u = function() {
                function t(e, i) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.options = i, this.itemEl = null, this.opts = r, this._initIndexer(), this._initDom(e)
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
                        i = t.top;
                    addClass(this.listEl, "shown"), setStyle(this.listEl, {
                        top: i + this.lineHeight,
                        left: e
                    })
                }, t.prototype.hide = function() {
                    removeClass(this.listEl, "shown")
                }, t.prototype.getOptions = function() {
                    return this.options
                }, t.prototype.onKeyDown = function(t) {
                    var e = this,
                        i = geByClass1("selected", this.listEl) || domFC(this.listEl);
                    i && i.data && setTimeout(function() {
                        t.keyCode === KEY.DOWN ? e._overItem(domNS(i) ? domNS(i) : domFC(e.listEl)) : t.keyCode === KEY.UP ? e._overItem(domPS(i) ? domPS(i) : domLC(e.listEl)) : t.keyCode === KEY.ENTER && e._onMouseDown(i.data, t)
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
                        i = void 0,
                        r = "show_operators" === e.extra,
                        o = "suggest_operator" === e.extra.substr(0, 16);
                    o && (e.query = ""), e.query = e.query.replace(/[^a-zа-я0-9\s]/gi, ""), r ? i = this.getOperators() : this.subOptions ? i = e.query ? this.subIndexer.search(e.query) : this.subOptions : 0 !== (i = e.query ? this.indexer.search(e.query) : this.options).length || "show_all_if_empty" !== e.extra && !o || (i = this.options), i = clone(i);
                    var a = this.getOperators(!0, !0);
                    if (o) {
                        var s = e.extra.substr(16);
                        "&" === s && a["&!"] ? i.unshift(a["&!"]) : "|" === s && a["|!"] && i.unshift(a["|!"])
                    } else "show_no_operator" === e.extra && a["!"] && (e.query && a["!"].label.substr(0, e.query.length) !== e.query || i.unshift(a["!"]));
                    if (r)
                        for (var n = 0; n < i.length; n++)
                            if (i[n].isOperator && "!" === i[n].key) {
                                i.splice(n, 1);
                                break
                            }
                    if (JSON.stringify(i) !== this.lastItems || e.query !== this.lastQuery) {
                        val(this.listEl, "");
                        var l = e.query.toLowerCase(),
                            p = new RegExp("" + l, "ig"),
                            h = void 0;
                        if (r) {
                            var u = l.replace(/[^a-zа-я0-9\s]+/g, "").split("").map(function(t) {
                                return t + ".*?"
                            }).join("");
                            h = new RegExp("^(" + u + ")", "i");
                            for (var d = [], c = 0; c < i.length; c++) {
                                var f = i[c],
                                    y = f.label.match(h);
                                d.push([f, y ? y[0].length : 0])
                            }
                            d = d.sort(function(t, e) {
                                return t[1] < e[1] ? 1 : t[1] > e[1] ? -1 : 0
                            }), i = d.map(function(t) {
                                return t[0]
                            })
                        }
                        for (var v = function(e) {
                                var r = i[e],
                                    o = r.label.replace(p, function(t) {
                                        return "<span>" + t + "</span>"
                                    }),
                                    a = se('<div class="rich_dropdown_list_item">\n        <div class="rich_dropdown_list_item_label">' + o + '</div>\n        <div class="rich_dropdown_list_item_type">' + t._getType(r) + "</div>\n      </div>");
                                addEvent(a, "mousedown", function(e) {
                                        return t._onMouseDown(r, e)
                                    }), addEvent(a, "mouseover", function(e) {
                                        vkNow() - (t.lastDownChangeTs || 0) > 500 && t._overItem(a, !0)
                                    }), a.data = r, 0 === e && addClass(a, "selected"),
                                    function(t, e) {
                                        var i = (e || {}).color;
                                        setStyle(t, {
                                            color: i
                                        })
                                    }(a, r.styles), t.listEl.appendChild(a)
                            }, g = 0; g < i.length; g++) v(g);
                        0 === i.length && val(this.listEl, '<div class="rich_dropdown_not_found">' + getLang("search_nothing_found") + "</div>"), this.lastItems = JSON.stringify(i), this.lastQuery = e.query;
                        var m = bodyNode.appendChild(ce("div", {
                            innerHTML: val(this.listEl),
                            className: "rich_dropdown_list size_helper"
                        }));
                        setStyle(this.listEl, "width", m.offsetWidth + "px"), re(m)
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
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        i = String(getLang("global_rich_dd_operators")).split("/"),
                        r = [{
                            label: i[0],
                            key: "&",
                            isOperator: !0
                        }, {
                            label: i[1],
                            key: "|",
                            isOperator: !0
                        }, {
                            label: i[2],
                            key: "&!",
                            isOperator: !0
                        }, {
                            label: i[3],
                            key: "|!",
                            isOperator: !0
                        }, {
                            label: i[4],
                            key: "!",
                            isOperator: !0,
                            unary: !0
                        }],
                        o = [];
                    if (this.validOperators)
                        for (var a = 0; a < r.length; a++) this.validOperators[r[a].key] && o.push(r[a]);
                    else o = r;
                    if (t) {
                        for (var s = {}, n = 0; n < o.length; n++) {
                            var l = o[n];
                            s[(e ? l.key : l.label).toLowerCase()] = l
                        }
                        return s
                    }
                    return o
                }, t.prototype._overItem = function(t) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || (this.lastDownChangeTs = vkNow(), this.listEl.scrollTop = t.offsetTop - this.listEl.offsetHeight / 2 + t.offsetHeight / 2), removeClass(geByClass1("selected", this.listEl), "selected"), addClass(t, "selected")
                }, t.prototype.setMaxWidth = function(t) {
                    setStyle(this.listEl, "max-width", parseInt(t) + "px")
                }, t
            }(),
            d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            c = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            r = !0,
                            o = !1,
                            a = void 0;
                        try {
                            for (var s, n = t[Symbol.iterator](); !(r = (s = n.next()).done) && (i.push(s.value), !e || i.length !== e); r = !0);
                        } catch (t) {
                            o = !0, a = t
                        } finally {
                            try {
                                !r && n.return && n.return()
                            } finally {
                                if (o) throw a
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var f = function() {
            function t(e, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.el = e, this.opts = {}, this.autoComplete = new u(e, i, {
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
                this.optionsObj = n(t);
                for (var i = {}, r = 0; r < t.length; r++) p(i, t[r].label);
                for (var o = 0; o < e.length; o++) p(i, e[o].label);
                this.prefixesThree = i
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
                var i = intval(getStyle(this.textaraEl, "line-height").replace("px", ""));
                this.autoComplete.setLineHeight(i)
            }, t.prototype._isNoEditableEvent = function(t) {
                var e = inArray(t.keyCode, [KEY.UP, KEY.DOWN]) || !inArray(t.type, ["keydown", "keyup", "keypress"]) || t.ctrlKey || t.metaKey || inArray(t.key, ["Meta"]);
                return t.force && (e = !1), e
            }, t.prototype._onKeyDown = function(t) {
                inArray(t.keyCode, [KEY.UP, KEY.DOWN, KEY.ENTER]) && (this.autoComplete.onKeyDown(t), cancelEvent(t)), this._isNoEditableEvent(t) && 90 === t.keyCode && this.forceUpdate()
            }, t.prototype.forceUpdate = function() {
                var t = this,
                    e = function() {
                        t._onKeyUp({
                            force: 1
                        }), t.textaraEl.autosize.update()
                    };
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? e() : setTimeout(e, 5)
            }, t.prototype._onKeyUp = function(t) {
                var e = this._isNoEditableEvent(t);
                if (e || this._process(), (!e || "click" === t.type || "input" === t.type) && "insertText" !== t.inputType) {
                    var i = this._getQueryBySelection(!0),
                        r = c(i, 2),
                        o = r[0],
                        a = r[1],
                        s = function(t, e) {
                            var i = ce("div", {
                                className: "rich_dropdown_textarea",
                                innerHTML: (clean(e) || " ") + '<div class="rich_dropdown_cursor"></div>'
                            }, {
                                opacity: 0,
                                position: "absolute"
                            });
                            t.appendChild(i);
                            var r = geByClass1("rich_dropdown_cursor", i),
                                o = {
                                    left: r.offsetLeft,
                                    top: r.offsetTop
                                };
                            return re(i), o
                        }(this.wrapEl, val(this.textaraEl).substr(0, this.textaraEl.selectionStart));
                    this.autoComplete.update({
                        pos: s,
                        query: trim(o),
                        extra: a
                    })
                }
            }, t.prototype._onBlur = function(t) {
                this.autoComplete.hide()
            }, t.prototype._onSelect = function(t, e) {
                this._replaceTextBySelection(t)
            }, t.prototype._validatedParsedValue = function(t) {
                for (var e = null, i = this.autoComplete.getOperators(!0), r = [], a = 0; a < t.length; a++) {
                    var s = t[a],
                        n = s.type,
                        l = s.words,
                        p = trim(l.join("")),
                        h = n;
                    if ("bracket" === n && (h = "(" === trim(l.join("")) ? "open_bracket" : "close_bracket"), "item" === h && inArray(e, ["item", "close_bracket"])) return !1;
                    if ("open_bracket" === h) {
                        if (e && !inArray(e, ["close_bracket", o, "open_bracket"])) return !1;
                        r.push("(")
                    } else {
                        if ("close_bracket" === h && !r.pop()) return !1;
                        if (h === o) {
                            var u = i[p];
                            if (!u.unary && !inArray(e, ["close_bracket", "item"])) return !1;
                            if (u.unary && null !== e && "open_bracket" !== e) return !1
                        }
                    }
                    e = h
                }
                return !(r.length > 0)
            }, t.prototype.getValue = function() {
                var t = this._parseStr(val(this.textaraEl)),
                    e = this.optionsObj,
                    i = this.autoComplete.getOperators(!0);
                if (!this._validatedParsedValue(t)) return !1;

                function r() {
                    return {
                        children: [],
                        parent: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        data: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    }
                }
                for (var a = r(), s = a, n = 0; n < t.length; n++) {
                    var l = t[n],
                        p = l.type,
                        h = l.words,
                        u = h.join("");
                    if (trim(u)) {
                        var d, c = !1;
                        if ("bracket" === p) {
                            if ("(" !== h[0]) {
                                if (s && s.parent) {
                                    s = s.parent;
                                    continue
                                }
                                return !1
                            }
                            c = !0, l.isSection = !0
                        } else {
                            if (inArray(p, ["colon", "comma"])) continue;
                            if (p === o) l.data = i[trim(u).toLowerCase()];
                            else if ("item" === p) {
                                var f = e[trim(u.toLowerCase())];
                                if (!f) return !1;
                                l.data = f
                            }
                        }
                        d = r(s, l), s.children.push(d), c && (s = d, c = !1)
                    }
                }
                return this._threeToArray(a)
            }, t.prototype.getStringValue = function() {
                var t = this._parseStr(val(this.textaraEl)),
                    e = this.optionsObj,
                    i = this.autoComplete.getOperators(!0);
                if (!this._validatedParsedValue(t)) return !1;
                for (var r = [], a = 0; a < t.length; a++) {
                    var s = t[a],
                        n = s.type,
                        l = s.words.join("");
                    if (trim(l))
                        if ("bracket" === n) r.push(l);
                        else if (n === o) r.push(i[trim(l).toLowerCase()].key);
                    else if ("item" === n) {
                        var p = e[trim(l).toLowerCase()];
                        if (!p) return !1;
                        r.push(p.key)
                    }
                }
                return r.join("")
            }, t.prototype._threeToArray = function(t) {
                for (var e = [], i = 0; i < t.children.length; i++) {
                    var r = t.children[i],
                        n = r.data,
                        l = n.type,
                        p = n.isSection,
                        h = n.data,
                        u = {};
                    p ? u.type = a : l === o ? (u.type = o, u.key = h.key) : (u.type = s, u.key = h.key), p && (u.values = this._threeToArray(r)), e.push(u)
                }
                return e
            }, t.prototype.renderByInitialData = function(t) {
                val(this.inputEl, ""), val(this.textaraEl, ""), t && (isString(t) ? this._renderByInitialStringData(t) : this._renderByInitialData(t))
            }, t.prototype._renderByInitialStringData = function(t) {
                var e = this.autoComplete.getOperators(!0, !0),
                    i = n(this.autoComplete.getOptions(), !1, !0),
                    r = trim(t).match(/([a-zA-Z0-9._]+|[\u0021\u007C\u0026]+|[\u0028\u0029])/g).map(function(t) {
                        if (e[t]) return e[t].label;
                        if (inArray(t, ["(", ")"])) return t;
                        var r = i[t];
                        return isObject(r) ? r.label : "Failed (" + t + ")"
                    });
                val(this.textaraEl, r.join(" ")), this._process()
            }, t.prototype.setValue = function(t) {
                this.renderByInitialData(t), this.forceUpdate(!0), this.autoComplete.hide(), this.disabled && (this.disabledOrigText = val(this.textaraEl))
            }, t.prototype._renderByInitialData = function(t) {
                var e = h(this.autoComplete.getOperators(!0, !0), n(this.autoComplete.getOptions(), !1, !0), t);
                val(this.textaraEl, e), this._process()
            }, t.prototype._validateLastItem = function(t, e, i) {
                var r = this.optionsObj,
                    a = e.length - 1,
                    s = trim(e[a].words.join("")).toLowerCase().replace(/\s\s+/g, " "),
                    n = e[a - 1];
                return t[s] && (i > 0 || t[s].unary) ? (e[a].type = o, e[a].validated = !0, e[a].data = t[s]) : !r[s] || n && "item" === n.type || (e[a].type = "item", e[a].validated = !0), e
            }, t.prototype._parseStr = function(t) {
                for (var e = l(t), i = this.autoComplete.getOperators(!0), r = (this.optionsObj, this.textaraEl.selectionStart), o = [], a = this.prefixesThree, s = !1, n = void 0, p = 0, h = !1, u = 0, c = 0; c < e.length; c++) {
                    var f = e[c];
                    if (f) {
                        var y = !!o[o.length - 1] && o[o.length - 1].validated,
                            v = trim(f).toLowerCase();
                        p += f.length;
                        var g = void 0;
                        if ("item" === (g = ":" === v ? "colon" : "," === v ? "comma" : inArray(v, ["(", ")"]) ? "bracket" : "item")) {
                            n || (o.push({
                                type: g,
                                words: []
                            }), n = o[o.length - 1]);
                            var m = "object" === d(a[v]),
                                b = f.match(/\s/),
                                _ = !1;
                            !b && !m || s || (o[o.length - 1].words.push(f), this._validateLastItem(i, o, u), _ = !0), !m && !b || s ? (_ || (m || o[o.length - 1].validated || o[o.length - 1].type !== g ? o.push({
                                type: g,
                                words: [f]
                            }) : o[o.length - 1].words.push(f)), n = o[o.length - 1], this._validateLastItem(i, o, u), "object" === d(this.prefixesThree[v]) ? (a = this.prefixesThree[v], s = !1) : (a = this.prefixesThree, s = !0)) : m && (a = a[v], s = !1), p >= r && !h && (o[o.length - 1].selected = !0, h = !0), inArray(g, ["colon", "comma", "bracket"]) && (o[o.length - 1].validated = !0), y && o[o.length - 1].validated && u++
                        } else o.push({
                            type: g,
                            words: [f]
                        }), n = !1
                    }
                }
                return o
            }, t.prototype._process = function() {
                var t = clean(val(this.textaraEl).replace(/\n/g, "")),
                    e = this.optionsObj,
                    i = this._parseStr(t);
                val(this.inputEl, "");
                for (var r = [], a = 0; a < i.length; a++) {
                    var s = i[a],
                        n = s.type,
                        l = s.words,
                        p = s.validated,
                        h = l.join(""),
                        u = ce("div", {
                            className: "rich_dropdown_item " + n
                        });
                    if ("item" === n) {
                        var d = e[trim(h.toLowerCase()).replace(/\s\s+/g, " ")];
                        p && isObject(d) && (addClass(u, "validated"), toggleClass(u, "value", !d.options))
                    } else if (inArray(n, [o, "colon", "comma"])) addClass(u, "validated");
                    else if ("bracket" === n)
                        if ("(" === h) addClass(u, "incorrect"), r.push(u);
                        else {
                            var c = r.pop();
                            c ? removeClass(c, "incorrect") : addClass(u, "incorrect")
                        }
                    for (var f = "", y = 0; y < l.length; y++) {
                        var v = l[y].replace(/\s/g, "&nbsp;"),
                            g = "";
                        !l[y].match(/^\s+$/) || 0 !== y && y !== l.length - 1 || (g = "spaces_only"), f += '<span class="' + g + '">' + v + "</span>"
                    }
                    val(u, f), this.inputEl.appendChild(u)
                }
                0 === i.length && val(this.inputEl, " "), this.opts.onChange && this.opts.onChange(), this.textaraEl.scrollTop = 0
            }, t.prototype._checkOperatorByPrefix = function(t) {
                for (var e = this.autoComplete.getOperators(), i = t.length, r = 0; r < e.length; r++)
                    if (e[r].label.substr(0, i) === t) return !0;
                return !1
            }, t.prototype._getQueryBySelection = function() {
                for (var t = this.textaraEl.selectionStart, e = this.autoComplete.getOperators(!0), i = val(this.textaraEl), a = this._parseStr(i), s = void 0, n = 0, p = void 0, h = void 0, u = 0, d = 0; d < a.length; d++) {
                    var c = a[d],
                        f = c.words.join("");
                    if (trim(f) && (p = c), c.validated && (h = c, u++), c.selected) {
                        s = c;
                        break
                    }
                    n += f.length
                }
                if (s || (s = p), !s) return ["", "show_no_operator"];
                var y = "",
                    v = s.words.join("").substr(0, Math.max(0, t - n)),
                    g = l(v).pop(),
                    m = !!String(g).match(/\s$/),
                    b = h && "item" === h.type,
                    _ = trim(p.words.join(""));
                return (s.type === o && (g !== r || v !== s.words.join("")) && u > 1 || p && "bracket" === p.type && ")" === _ || "item" === s.type && s.validated && m && v === s.words.join("") || "item" === s.type && !s.validated && this._checkOperatorByPrefix(s.words.join("")) && b) && (y = "show_operators"), s.type === o && inArray(s.data.key, ["|", "&"]) && m && (y = "suggest_operator" + s.data.key), ("bracket" === p.type && "(" === _ || !u && 1 === a.length || "operator" === p.type && "!" === e[_].key && !m) && (y = "show_no_operator"), !y && m && (y = "show_all_if_empty"), [clean(v), y]
            }, t.prototype._replaceTextBySelection = function(t) {
                for (var e = this.textaraEl.selectionStart, i = this.textaraEl.selectionEnd, r = val(this.textaraEl), a = " " + t.label + " ", s = t.isOperator ? o : "item", n = "", l = null, p = this._parseStr(r, 1), h = !0, u = 0, d = !1, c = 0; c < p.length; c++) {
                    var f = p[c],
                        y = f.selected,
                        v = f.words,
                        g = f.type,
                        m = f.validated,
                        b = v.join("").length;
                    if (((u += b) > e || y && (!m || s === g)) && (null === l && (l = u - b), s === g && (p[c].words = [a], p[c].validated = !0, h = !1), y && (d = !0), u >= i)) break
                }
                h && (p.push({
                    words: [a]
                }), e !== i || d || (l = u = e));
                for (var _ = 0; _ < p.length; _++) {
                    var x = p[_];
                    g = x.type, v = x.words, m = x.validated;
                    inArray(g, ["item", o]) && !m || (n += v.join(""))
                }
                if (n || (l = i - a.length), browser.mozilla) {
                    var E = r.substr(0, l) + a.replace(/\s\s+/g, " ") + r.substr(u),
                        w = E.length - r.length;
                    val(this.textaraEl, E);
                    var C = Math.max(l, u + w);
                    this.textaraEl.setSelectionRange(C, C)
                } else this.textaraEl.setSelectionRange(l, u), document.execCommand("insertText", !0, a.replace(/\s\s+/g, " "));
                var O = val(this.textaraEl),
                    k = O.length;
                if (k !== (O = O.replace(/\s\s+/g, " ").replace(/^\s+/, "")).length) {
                    var S = this.textaraEl.selectionEnd - (k - O.length);
                    val(this.textaraEl, O), this.textaraEl.selectionStart === this.textaraEl.selectionEnd && (this.textaraEl.selectionStart = S), this.textaraEl.selectionEnd = S
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
        var y = function() {
            function t(e) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), i.items = i.items || [], e = ge(e), addClass(e, "rich_dropdown_wrap"), this.input = new f(e, i.items), this.input.renderByInitialData(i.initialData), this.setOptions(i), this
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
                    var i = t[e];
                    switch (e) {
                        case "placeholder":
                            this.input.setPlaceholder(i);
                            break;
                        case "operators":
                            this.input.autoComplete.setOperators(i), this.input.updateOptionsObj();
                            break;
                        case "disabledText":
                            this.input.setDisabledText(i);
                            break;
                        case "autoCompleteMaxWidth":
                            this.input.setAutoCompleteMaxWidth(i);
                            break;
                        case "width":
                            this.input.setWidth(i);
                            break;
                        case "items":
                            this.input.autoComplete.setOptions(i), this.input.updateOptionsObj();
                            break;
                        case "value":
                            this.setValue(i);
                            break;
                        case "onChange":
                            this.onChange(i)
                    }
                }
                return this
            }, t.prototype.disable = function() {
                this.input.disable()
            }, t.prototype.enable = function() {
                this.input.enable()
            }, t.prototype.toggleDisable = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                this.input.disabled && !0 !== t || !1 === t ? this.input.enable() : this.input.disable()
            }, t.prototype.setValue = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                this.input.setValue(t)
            }, t
        }();
        window.RichDropDown = y;
        try {
            stManager.done("rich_dropdown.js")
        } catch (t) {}
    }
});