! function(t) {
    function e(e) {
        for (var i, o, l = e[0], n = e[1], h = e[2], d = 0, u = []; d < l.length; d++) o = l[d], r[o] && u.push(r[o][0]), r[o] = 0;
        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        for (p && p(e); u.length;) u.shift()();
        return a.push.apply(a, h || []), s()
    }

    function s() {
        for (var t, e = 0; e < a.length; e++) {
            for (var s = a[e], i = !0, l = 1; l < s.length; l++) {
                var n = s[l];
                0 !== r[n] && (i = !1)
            }
            i && (a.splice(e--, 1), t = o(o.s = s[0]))
        }
        return t
    }
    var i = {},
        r = {
            "web/rich_dropdown": 0
        },
        a = [];

    function o(e) {
        if (i[e]) return i[e].exports;
        var s = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(s.exports, s, s.exports, o), s.l = !0, s.exports
    }
    o.m = t, o.c = i, o.d = function(t, e, s) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (o.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) o.d(s, i, function(e) {
                return t[e]
            }.bind(null, i));
        return s
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "";
    var l = window.webpackJsonp = window.webpackJsonp || [],
        n = l.push.bind(l);
    l.push = e, l = l.slice();
    for (var h = 0; h < l.length; h++) e(l[h]);
    var p = n;
    a.push([137, "bundles/common"]), s()
}({
    137: function(t, e, s) {
        t.exports = s("e8JN")
    },
    e8JN: function(t, e, s) {
        "use strict";
        s.r(e);
        s("SRfc"), s("Btvt"), s("pIFo"), s("KKXr");
        var i = " ",
            r = "rich_dropdown_item",
            a = "item",
            o = "operator",
            l = "bracket",
            n = "open_bracket",
            h = "close_bracket",
            p = "section",
            d = "operand",
            u = "colon",
            c = "comma";

        function v(t, e = "", s = !1) {
            for (var i = {}, r = 0; r < t.length; r++) {
                var a = t[r],
                    o = [s ? a.key : a.label];
                e && o.unshift(e);
                var l = o.join(".").toLowerCase();
                i[l] = a, a.options && (i = extend(i, v(a.options, l, s)))
            }
            return i
        }

        function y(t) {
            return String(t).split(/(\u0028|\u0029|\u003A|\s+)/g).filter(t => t)
        }

        function g(t, e) {
            for (var s = y(e), i = t, r = 0; r < s.length; r++) {
                var a = trim(s[r]).toLowerCase();
                a && (i[a] || (i[a] = {}), i = i[a])
            }
        }

        function f(t, e, s) {
            return s.map(s => (function(t, e, s) {
                var {
                    type: i,
                    key: r,
                    values: a
                } = s;
                switch (i) {
                    case p:
                        return `( ${f(t,e,a)} )`;
                    case o:
                        var l = t[r];
                        return isObject(l) ? l.label : `Failed (${r})`;
                    case d:
                        var n = e[r];
                        return isObject(n) ? n.label : `Failed (${r})`
                }
                return `Bad type (${i})`
            })(t, e, s)).join(" ")
        }
        s("Vd3H"), s("Oyvg"), s("OG14");
        class _ {
            constructor(t, e, s = {}) {
                this.options = e, this.itemEl = null, this.opts = s, this._initIndexer(), this._initDom(t)
            }
            destroy() {
                delete this.indexer, delete this.subIndexer
            }
            setOptions(t) {
                this.options = t, this._initIndexer()
            }
            update(t) {
                this.searchData = t, this._checkItem(), this._search(), this.show()
            }
            setLineHeight(t) {
                this.lineHeight = t
            }
            show() {
                var {
                    left: t,
                    top: e
                } = this.searchData.pos;
                addClass(this.listEl, "shown"), setStyle(this.listEl, {
                    top: e + this.lineHeight,
                    left: t
                })
            }
            hide() {
                removeClass(this.listEl, "shown")
            }
            getOptions() {
                return this.options
            }
            onKeyDown(t) {
                var e = geByClass1("selected", this.listEl) || domFC(this.listEl);
                e && e.data && setTimeout(() => {
                    t.keyCode === KEY.DOWN ? this._overItem(domNS(e) ? domNS(e) : domFC(this.listEl)) : t.keyCode === KEY.UP ? this._overItem(domPS(e) ? domPS(e) : domLC(this.listEl)) : t.keyCode === KEY.ENTER && this._onMouseDown(e.data, t)
                }, 0)
            }
            _initIndexer() {
                this.indexer = new vkIndexer(this.options, t => t.label)
            }
            _initDom(t) {
                this.listEl = t.appendChild(ce("div", {
                    className: "rich_dropdown_list"
                }))
            }
            _search() {
                var t, e = this,
                    s = this.searchData,
                    i = "show_operators" === s.extra,
                    r = "suggest_operator" === s.extra.substr(0, 16);
                r && (s.query = ""), s.query = s.query.replace(/[^a-zа-я0-9\s]/gi, ""), i ? t = this.getOperators() : this.subOptions ? t = s.query ? this.subIndexer.search(s.query) : this.subOptions : 0 !== (t = s.query ? this.indexer.search(s.query) : this.options).length || "show_all_if_empty" !== s.extra && !r || (t = this.options), t = clone(t);
                var a = this.getOperators(!0, !0);
                if (r) {
                    var o = s.extra.substr(16);
                    "&" === o && a["&!"] ? t.unshift(a["&!"]) : "|" === o && a["|!"] && t.unshift(a["|!"])
                } else "show_no_operator" === s.extra && a["!"] && (s.query && a["!"].label.substr(0, s.query.length) !== s.query || t.unshift(a["!"]));
                if (i)
                    for (var l = 0; l < t.length; l++)
                        if (t[l].isOperator && "!" === t[l].key) {
                            t.splice(l, 1);
                            break
                        }
                if (JSON.stringify(t) !== this.lastItems || s.query !== this.lastQuery) {
                    val(this.listEl, "");
                    var n, h = s.query.toLowerCase(),
                        p = new RegExp(`${h}`, "ig");
                    if (i) {
                        var d = h.replace(/[^a-zа-я0-9\s]+/g, "").split("").map(t => t + ".*?").join("");
                        n = new RegExp("^(" + d + ")", "i");
                        for (var u = [], c = 0; c < t.length; c++) {
                            var v = t[c],
                                y = v.label.match(n);
                            u.push([v, y ? y[0].length : 0])
                        }
                        u = u.sort((t, e) => t[1] < e[1] ? 1 : t[1] > e[1] ? -1 : 0), t = u.map(t => t[0])
                    }
                    for (var g = function(s) {
                            var i = t[s],
                                r = i.label.replace(p, t => `<span>${t}</span>`),
                                a = se(`<div class="rich_dropdown_list_item">\n        <div class="rich_dropdown_list_item_label">${r}</div>\n        <div class="rich_dropdown_list_item_type">${e._getType(i)}</div>\n      </div>`);
                            addEvent(a, "mousedown", t => e._onMouseDown(i, t)), addEvent(a, "mouseover", t => {
                                    vkNow() - (e.lastDownChangeTs || 0) > 500 && e._overItem(a, !0)
                                }), a.data = i, 0 === s && addClass(a, "selected"),
                                function(t, e) {
                                    var {
                                        color: s
                                    } = e || {};
                                    setStyle(t, {
                                        color: s
                                    })
                                }(a, i.styles), e.listEl.appendChild(a)
                        }, f = 0; f < t.length; f++) g(f);
                    0 === t.length && val(this.listEl, `<div class="rich_dropdown_not_found">${getLang("search_nothing_found")}</div>`), this.lastItems = JSON.stringify(t), this.lastQuery = s.query;
                    var _ = bodyNode.appendChild(ce("div", {
                        innerHTML: val(this.listEl),
                        className: "rich_dropdown_list size_helper"
                    }));
                    setStyle(this.listEl, "width", _.offsetWidth + "px"), re(_)
                }
            }
            _getType(t) {
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
            }
            _onMouseDown(t, e) {
                e && cancelEvent(e), this.opts.onSelect(t, e)
            }
            _checkItem() {
                var {
                    searchData: t
                } = this;
                t.options ? (this.subOptions = t.options, this.subIndexer = new vkIndexer(this.subOptions, t => t.label, () => {
                    this._search(t)
                })) : (this.subIndexer = !1, this.subOptions = !1)
            }
            setOperators(t = []) {
                this.validOperators = {};
                for (var e = 0; e < t.length; e++) this.validOperators[t[e]] = !0
            }
            getOperators(t = !1, e = !1) {
                var s = String(getLang("global_rich_dd_operators")).split("/"),
                    i = [{
                        label: s[0],
                        key: "&",
                        isOperator: !0
                    }, {
                        label: s[1],
                        key: "|",
                        isOperator: !0
                    }, {
                        label: s[2],
                        key: "&!",
                        isOperator: !0
                    }, {
                        label: s[3],
                        key: "|!",
                        isOperator: !0
                    }, {
                        label: s[4],
                        key: "!",
                        isOperator: !0,
                        unary: !0
                    }],
                    r = [];
                if (this.validOperators)
                    for (var a = 0; a < i.length; a++) this.validOperators[i[a].key] && r.push(i[a]);
                else r = i;
                if (t) {
                    for (var o = {}, l = 0; l < r.length; l++) {
                        var n = r[l];
                        o[(e ? n.key : n.label).toLowerCase()] = n
                    }
                    return o
                }
                return r
            }
            _overItem(t, e = !1) {
                e || (this.lastDownChangeTs = vkNow(), this.listEl.scrollTop = t.offsetTop - this.listEl.offsetHeight / 2 + t.offsetHeight / 2), removeClass(geByClass1("selected", this.listEl), "selected"), addClass(t, "selected")
            }
            setMaxWidth(t) {
                setStyle(this.listEl, "max-width", parseInt(t) + "px")
            }
        }
        class b {
            constructor(t, e) {
                this.el = t, this.opts = {}, this.autoComplete = new _(t, e, {
                    onSelect: this._onSelect.bind(this)
                }), this.updateOptionsObj(), this._init()
            }
            destroy() {
                this.textaraEl && (this.autoComplete.destroy(), removeEvent(this.textaraEl), val(this.el, ""), delete this.el, delete this.wrapEl, delete this.textaraEl, delete this.autoComplete)
            }
            setOptions(t) {
                this.opts = Object.assign(this.opts, t)
            }
            updateOptionsObj() {
                var t = this.autoComplete.getOptions(),
                    e = this.autoComplete.getOperators();
                this.optionsObj = v(t);
                for (var s = {}, i = 0; i < t.length; i++) g(s, t[i].label);
                for (var r = 0; r < e.length; r++) g(s, e[r].label);
                this.prefixesThree = s
            }
            setPlaceholder(t) {
                attr(this.textaraEl, "placeholder", t)
            }
            _init() {
                var t = se('<div class="rich_dropdown_wrap"><div contenteditable class="rich_dropdown"></div><textarea placeholder="Enter something.." class="rich_dropdown_textarea"></textarea></div>');
                this.el.appendChild(t), this.wrapEl = t, this.inputEl = geByClass1("rich_dropdown", t), this.textaraEl = geByClass1("rich_dropdown_textarea", t), addEvent(this.textaraEl, "keydown", this._onKeyDown.bind(this)), addEvent(this.textaraEl, "keyup click input", this._onKeyUp.bind(this)), addEvent(this.textaraEl, "paste", () => this.forceUpdate()), addEvent(this.textaraEl, "blur", this._onBlur.bind(this)), autosizeSetup(this.textaraEl, {
                    minHeight: 32,
                    addHeight: 2,
                    onResize: () => {
                        this.textaraEl.scrollTop = 0, this._process()
                    }
                });
                var e = intval(getStyle(this.textaraEl, "line-height").replace("px", ""));
                this.autoComplete.setLineHeight(e)
            }
            _isNoEditableEvent(t) {
                var e = inArray(t.keyCode, [KEY.UP, KEY.DOWN]) || !inArray(t.type, ["keydown", "keyup", "keypress"]) || t.ctrlKey || t.metaKey || inArray(t.key, ["Meta"]);
                return t.force && (e = !1), e
            }
            _onKeyDown(t) {
                inArray(t.keyCode, [KEY.UP, KEY.DOWN, KEY.ENTER]) && (this.autoComplete.onKeyDown(t), cancelEvent(t)), this._isNoEditableEvent(t) && 90 === t.keyCode && this.forceUpdate()
            }
            forceUpdate(t = !1) {
                var e = () => {
                    this._onKeyUp({
                        force: 1
                    }), this.textaraEl.autosize.update()
                };
                t ? e() : setTimeout(e, 5)
            }
            _onKeyUp(t) {
                var e = this._isNoEditableEvent(t);
                if (e || this._process(), (!e || "click" === t.type || "input" === t.type) && "insertText" !== t.inputType) {
                    var [s, i] = this._getQueryBySelection(!0), r = function(t, e) {
                        var s = ce("div", {
                            className: "rich_dropdown_textarea",
                            innerHTML: `${clean(e)||" "}<div class="rich_dropdown_cursor"></div>`
                        }, {
                            opacity: 0,
                            position: "absolute"
                        });
                        t.appendChild(s);
                        var i = geByClass1("rich_dropdown_cursor", s),
                            r = {
                                left: i.offsetLeft,
                                top: i.offsetTop
                            };
                        return re(s), r
                    }(this.wrapEl, val(this.textaraEl).substr(0, this.textaraEl.selectionStart));
                    this.autoComplete.update({
                        pos: r,
                        query: trim(s),
                        extra: i
                    })
                }
            }
            _onBlur(t) {
                this.autoComplete.hide()
            }
            _onSelect(t, e) {
                this._replaceTextBySelection(t)
            }
            _validatedParsedValue(t) {
                for (var e = null, s = this.autoComplete.getOperators(!0), i = [], r = 0; r < t.length; r++) {
                    var {
                        type: p,
                        words: d
                    } = t[r], u = trim(d.join("")), c = p;
                    if (p === l && (c = "(" === trim(d.join("")) ? n : h), c === a && inArray(e, [a, h])) return !1;
                    if (c === n) {
                        if (e && !inArray(e, [h, o, n])) return !1;
                        i.push("(")
                    } else {
                        if (c === h && !i.pop()) return !1;
                        if (c === o) {
                            var v = s[u];
                            if (!v.unary && !inArray(e, [h, a])) return !1;
                            if (v.unary && null !== e && e !== n) return !1
                        }
                    }
                    e = c
                }
                return !(i.length > 0)
            }
            getValue() {
                var t = this._parseStr(val(this.textaraEl)),
                    e = this.optionsObj,
                    s = this.autoComplete.getOperators(!0);
                if (!this._validatedParsedValue(t)) return !1;

                function i(t = null, e = {}) {
                    return {
                        children: [],
                        parent: t,
                        data: e
                    }
                }
                for (var r = i(), n = r, h = 0; h < t.length; h++) {
                    var p = t[h],
                        {
                            type: d,
                            words: v
                        } = p,
                        y = v.join("");
                    if (trim(y)) {
                        var g, f = !1;
                        if (d === l) {
                            if ("(" !== v[0]) {
                                if (n && n.parent) {
                                    n = n.parent;
                                    continue
                                }
                                return !1
                            }
                            f = !0, p.isSection = !0
                        } else {
                            if (inArray(d, [u, c])) continue;
                            if (d === o) p.data = s[trim(y).toLowerCase()];
                            else if (d === a) {
                                var _ = e[trim(y.toLowerCase())];
                                if (!_) return !1;
                                p.data = _
                            }
                        }
                        g = i(n, p), n.children.push(g), f && (n = g, f = !1)
                    }
                }
                return this._threeToArray(r)
            }
            getStringValue() {
                var t = this._parseStr(val(this.textaraEl)),
                    e = this.optionsObj,
                    s = this.autoComplete.getOperators(!0);
                if (!this._validatedParsedValue(t)) return !1;
                for (var i = [], r = 0; r < t.length; r++) {
                    var {
                        type: n,
                        words: h
                    } = t[r], p = h.join("");
                    if (trim(p))
                        if (n === l) i.push(p);
                        else if (n === o) i.push(s[trim(p).toLowerCase()].key);
                    else if (n === a) {
                        var d = e[trim(p).toLowerCase()];
                        if (!d) return !1;
                        i.push(d.key)
                    }
                }
                return i.join("")
            }
            _threeToArray(t) {
                for (var e = [], s = 0; s < t.children.length; s++) {
                    var i = t.children[s],
                        {
                            type: r,
                            isSection: a,
                            data: l
                        } = i.data,
                        n = {};
                    a ? n.type = p : r === o ? (n.type = o, n.key = l.key) : (n.type = d, n.key = l.key), a && (n.values = this._threeToArray(i)), e.push(n)
                }
                return e
            }
            renderByInitialData(t) {
                val(this.inputEl, ""), val(this.textaraEl, ""), t && (isString(t) ? this._renderByInitialStringData(t) : this._renderByInitialData(t))
            }
            _renderByInitialStringData(t) {
                var e = this.autoComplete.getOperators(!0, !0),
                    s = v(this.autoComplete.getOptions(), !1, !0),
                    i = trim(t).match(/([a-zA-Z0-9._]+|[\u0021\u007C\u0026]+|[\u0028\u0029])/g).map(t => {
                        if (e[t]) return e[t].label;
                        if (inArray(t, ["(", ")"])) return t;
                        var i = s[t];
                        return isObject(i) ? i.label : `Failed (${t})`
                    });
                val(this.textaraEl, i.join(" ")), this._process()
            }
            setValue(t) {
                this.renderByInitialData(t), this.forceUpdate(!0), this.autoComplete.hide(), this.disabled && (this.disabledOrigText = val(this.textaraEl))
            }
            _renderByInitialData(t) {
                var e = f(this.autoComplete.getOperators(!0, !0), v(this.autoComplete.getOptions(), !1, !0), t);
                val(this.textaraEl, e), this._process()
            }
            _validateLastItem(t, e, s) {
                var i = this.optionsObj,
                    r = e.length - 1,
                    l = trim(e[r].words.join("")).toLowerCase().replace(/\s\s+/g, " "),
                    n = e[r - 1];
                return t[l] && (s > 0 || t[l].unary) ? (e[r].type = o, e[r].validated = !0, e[r].data = t[l]) : !i[l] || n && n.type === a || (e[r].type = a, e[r].validated = !0), e
            }
            _parseStr(t) {
                for (var e, s = y(t), i = this.autoComplete.getOperators(!0), r = (this.optionsObj, this.textaraEl.selectionStart), o = [], n = this.prefixesThree, h = !1, p = 0, d = !1, v = 0, g = 0; g < s.length; g++) {
                    var f = s[g];
                    if (f) {
                        var _ = !!o[o.length - 1] && o[o.length - 1].validated,
                            b = trim(f).toLowerCase();
                        p += f.length;
                        var m = void 0;
                        if ((m = ":" === b ? u : "," === b ? c : inArray(b, ["(", ")"]) ? l : a) === a) {
                            e || (o.push({
                                type: m,
                                words: []
                            }), e = o[o.length - 1]);
                            var x = "object" == typeof n[b],
                                w = f.match(/\s/),
                                E = !1;
                            !w && !x || h || (o[o.length - 1].words.push(f), this._validateLastItem(i, o, v), E = !0), !x && !w || h ? (E || (x || o[o.length - 1].validated || o[o.length - 1].type !== m ? o.push({
                                type: m,
                                words: [f]
                            }) : o[o.length - 1].words.push(f)), e = o[o.length - 1], this._validateLastItem(i, o, v), "object" == typeof this.prefixesThree[b] ? (n = this.prefixesThree[b], h = !1) : (n = this.prefixesThree, h = !0)) : x && (n = n[b], h = !1), p >= r && !d && (o[o.length - 1].selected = !0, d = !0), inArray(m, [u, c, l]) && (o[o.length - 1].validated = !0), _ && o[o.length - 1].validated && v++
                        } else o.push({
                            type: m,
                            words: [f]
                        }), e = !1
                    }
                }
                return o
            }
            _process() {
                var t = clean(val(this.textaraEl).replace(/\n/g, "")),
                    e = this.optionsObj,
                    s = this._parseStr(t);
                val(this.inputEl, "");
                for (var i = [], n = 0; n < s.length; n++) {
                    var {
                        type: h,
                        words: p,
                        validated: d
                    } = s[n], v = p.join(""), y = ce("div", {
                        className: r + " " + h
                    });
                    if (h === a) {
                        var g = e[trim(v.toLowerCase()).replace(/\s\s+/g, " ")];
                        d && isObject(g) && (addClass(y, "validated"), toggleClass(y, "value", !g.options))
                    } else if (inArray(h, [o, u, c])) addClass(y, "validated");
                    else if (h === l)
                        if ("(" === v) addClass(y, "incorrect"), i.push(y);
                        else {
                            var f = i.pop();
                            f ? removeClass(f, "incorrect") : addClass(y, "incorrect")
                        }
                    for (var _ = "", b = 0; b < p.length; b++) {
                        var m = p[b].replace(/\s/g, "&nbsp;"),
                            x = "";
                        !p[b].match(/^\s+$/) || 0 !== b && b !== p.length - 1 || (x = "spaces_only"), _ += `<span class="${x}">${m}</span>`
                    }
                    val(y, _), this.inputEl.appendChild(y)
                }
                0 === s.length && val(this.inputEl, " "), this.opts.onChange && this.opts.onChange(), this.textaraEl.scrollTop = 0
            }
            _checkOperatorByPrefix(t) {
                for (var e = this.autoComplete.getOperators(), s = t.length, i = 0; i < e.length; i++)
                    if (e[i].label.substr(0, s) === t) return !0;
                return !1
            }
            _getQueryBySelection() {
                for (var t, e, s, r = this.textaraEl.selectionStart, n = this.autoComplete.getOperators(!0), h = val(this.textaraEl), p = this._parseStr(h), d = 0, u = 0, c = 0; c < p.length; c++) {
                    var v = p[c],
                        g = v.words.join("");
                    if (trim(g) && (e = v), v.validated && (s = v, u++), v.selected) {
                        t = v;
                        break
                    }
                    d += g.length
                }
                if (t || (t = e), !t) return ["", "show_no_operator"];
                var f = "",
                    _ = t.words.join("").substr(0, Math.max(0, r - d)),
                    b = y(_).pop(),
                    m = !!String(b).match(/\s$/),
                    x = s && s.type === a,
                    w = trim(e.words.join(""));
                return (t.type === o && (b !== i || _ !== t.words.join("")) && u > 1 || e && e.type === l && ")" === w || t.type === a && t.validated && m && _ === t.words.join("") || t.type === a && !t.validated && this._checkOperatorByPrefix(t.words.join("")) && x) && (f = "show_operators"), t.type === o && inArray(t.data.key, ["|", "&"]) && m && (f = "suggest_operator" + t.data.key), (e.type === l && "(" === w || !u && 1 === p.length || "operator" === e.type && "!" === n[w].key && !m) && (f = "show_no_operator"), !f && m && (f = "show_all_if_empty"), [clean(_), f]
            }
            _replaceTextBySelection(t) {
                for (var e = this.textaraEl.selectionStart, s = this.textaraEl.selectionEnd, i = val(this.textaraEl), r = ` ${t.label} `, l = t.isOperator ? o : a, n = "", h = null, p = this._parseStr(i, 1), d = !0, u = 0, c = !1, v = 0; v < p.length; v++) {
                    var {
                        selected: y,
                        words: g,
                        type: f,
                        validated: _
                    } = p[v], b = g.join("").length;
                    if (((u += b) > e || y && (!_ || l === f)) && (null === h && (h = u - b), l === f && (p[v].words = [r], p[v].validated = !0, d = !1), y && (c = !0), u >= s)) break
                }
                d && (p.push({
                    words: [r]
                }), e !== s || c || (h = u = e));
                for (var m = 0; m < p.length; m++) {
                    var {
                        type: x,
                        words: w,
                        validated: E
                    } = p[m];
                    inArray(x, [a, o]) && !E || (n += w.join(""))
                }
                if (n || (h = s - r.length), browser.mozilla) {
                    var C = i.substr(0, h) + r.replace(/\s\s+/g, " ") + i.substr(u),
                        O = C.length - i.length;
                    val(this.textaraEl, C);
                    var k = Math.max(h, u + O);
                    this.textaraEl.setSelectionRange(k, k)
                } else this.textaraEl.setSelectionRange(h, u), document.execCommand("insertText", !0, r.replace(/\s\s+/g, " "));
                var S = val(this.textaraEl),
                    j = S.length;
                if (j !== (S = S.replace(/\s\s+/g, " ").replace(/^\s+/, "")).length) {
                    var T = this.textaraEl.selectionEnd - (j - S.length);
                    val(this.textaraEl, S), this.textaraEl.selectionStart === this.textaraEl.selectionEnd && (this.textaraEl.selectionStart = T), this.textaraEl.selectionEnd = T
                }
                this._onKeyUp({
                    force: !0
                }), this.textaraEl.autosize.update()
            }
            setDisabledText(t) {
                this.disabledText = t
            }
            disable() {
                this.disabled || (this.disabled = !0, this.disabledOrigText = val(this.textaraEl), this.disabledText && val(this.textaraEl, this.disabledText), this.forceUpdate(!0), this.autoComplete.hide(), addClass(this.wrapEl, "disabled"))
            }
            enable() {
                this.disabled && (this.disabled = !1, val(this.textaraEl, this.disabledOrigText), delete this.disabledOrigText, this.forceUpdate(!0), this.autoComplete.hide(), removeClass(this.wrapEl, "disabled"))
            }
            setAutoCompleteMaxWidth(t) {
                this.autoComplete.setMaxWidth(t)
            }
            setWidth(t) {
                this.width = t, setStyle(this.wrapEl, "width", t + "px"), setStyle(this.textaraEl, "width", t + "px"), setStyle(this.textaraEl.autosize.helper, "width", t + "px"), setTimeout(() => {
                    this.forceUpdate(!0), this.autoComplete.hide()
                })
            }
        }
        window.RichDropDown = class {
            constructor(t, e = {}) {
                return e.items = e.items || [], t = ge(t), addClass(t, "rich_dropdown_wrap"), this.input = new b(t, e.items), this.input.renderByInitialData(e.initialData), this.setOptions(e), this
            }
            destroy() {
                this.input.destroy(), delete this.input
            }
            getValue() {
                return this.input.getValue()
            }
            getStringValue() {
                return this.input.getStringValue()
            }
            onChange(t) {
                return this.input.setOptions({
                    onChange: t
                }), this
            }
            setOptions(t = {}) {
                for (var e in t) {
                    var s = t[e];
                    switch (e) {
                        case "placeholder":
                            this.input.setPlaceholder(s);
                            break;
                        case "operators":
                            this.input.autoComplete.setOperators(s), this.input.updateOptionsObj();
                            break;
                        case "disabledText":
                            this.input.setDisabledText(s);
                            break;
                        case "autoCompleteMaxWidth":
                            this.input.setAutoCompleteMaxWidth(s);
                            break;
                        case "width":
                            this.input.setWidth(s);
                            break;
                        case "items":
                            this.input.autoComplete.setOptions(s), this.input.updateOptionsObj();
                            break;
                        case "value":
                            this.setValue(s);
                            break;
                        case "onChange":
                            this.onChange(s)
                    }
                }
                return this
            }
            disable() {
                this.input.disable()
            }
            enable() {
                this.input.enable()
            }
            toggleDisable(t) {
                this.input.disabled && !0 !== t || !1 === t ? this.input.enable() : this.input.disable()
            }
            setValue(t = "") {
                this.input.setValue(t)
            }
        };
        try {
            stManager.done("rich_dropdown.js")
        } catch (t) {}
    }
});