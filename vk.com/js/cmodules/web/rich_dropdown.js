! function(t) {
    function e(e) {
        for (var r, o, l = e[0], n = e[1], h = e[2], p = 0, u = []; p < l.length; p++) o = l[p], s[o] && u.push(s[o][0]), s[o] = 0;
        for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        for (d && d(e); u.length;) u.shift()();
        return a.push.apply(a, h || []), i()
    }

    function i() {
        for (var t, e = 0; e < a.length; e++) {
            for (var i = a[e], r = !0, l = 1; l < i.length; l++) {
                var n = i[l];
                0 !== s[n] && (r = !1)
            }
            r && (a.splice(e--, 1), t = o(o.s = i[0]))
        }
        return t
    }
    var r = {},
        s = {
            "web/rich_dropdown": 0
        },
        a = [];

    function o(e) {
        if (r[e]) return r[e].exports;
        var i = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = t, o.c = r, o.d = function(t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
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
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) o.d(i, r, function(e) {
                return t[e]
            }.bind(null, r));
        return i
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
    var d = n;
    a.push([138, "bundles/common"]), i()
}({
    138: function(t, e, i) {
        t.exports = i("e8JN")
    },
    e8JN: function(t, e, i) {
        "use strict";
        i.r(e);
        i("rE2o"), i("ioFf"), i("rGqo"), i("SRfc"), i("Btvt"), i("pIFo"), i("91GP"), i("KKXr");
        var r = " ",
            s = "rich_dropdown_item",
            a = "item",
            o = "operator",
            l = "bracket",
            n = "open_bracket",
            h = "close_bracket",
            d = "section",
            p = "operand",
            u = "colon",
            c = "comma";

        function v(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = {}, s = 0; s < t.length; s++) {
                var a = t[s],
                    o = [i ? a.key : a.label];
                e && o.unshift(e);
                var l = o.join(".").toLowerCase();
                r[l] = a, a.options && (r = extend(r, v(a.options, l, i)))
            }
            return r
        }

        function y(t) {
            return String(t).split(/(\u0028|\u0029|\u003A|\s+)/g).filter(t => t)
        }

        function g(t, e) {
            for (var i = y(e), r = t, s = 0; s < i.length; s++) {
                var a = trim(i[s]).toLowerCase();
                a && (r[a] || (r[a] = {}), r = r[a])
            }
        }

        function f(t, e, i) {
            return i.map(i => (function(t, e, i) {
                var r = i.type,
                    s = i.key,
                    a = i.values;
                switch (r) {
                    case d:
                        return `( ${f(t,e,a)} )`;
                    case o:
                        var l = t[s];
                        return isObject(l) ? l.label : `Failed (${s})`;
                    case p:
                        var n = e[s];
                        return isObject(n) ? n.label : `Failed (${s})`
                }
                return `Bad type (${r})`
            })(t, e, i)).join(" ")
        }
        i("Vd3H"), i("Oyvg"), i("OG14");
        class _ {
            constructor(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                this.options = e, this.itemEl = null, this.opts = i, this._initIndexer(), this._initDom(t)
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
                var t = this.searchData.pos,
                    e = t.left,
                    i = t.top;
                addClass(this.listEl, "shown"), setStyle(this.listEl, {
                    top: i + this.lineHeight,
                    left: e
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
                    i = this.searchData,
                    r = "show_operators" === i.extra,
                    s = "suggest_operator" === i.extra.substr(0, 16);
                s && (i.query = ""), i.query = i.query.replace(/[^a-zа-я0-9\s]/gi, ""), r ? t = this.getOperators() : this.subOptions ? t = i.query ? this.subIndexer.search(i.query) : this.subOptions : 0 !== (t = i.query ? this.indexer.search(i.query) : this.options).length || "show_all_if_empty" !== i.extra && !s || (t = this.options), t = clone(t);
                var a = this.getOperators(!0, !0);
                if (s) {
                    var o = i.extra.substr(16);
                    "&" === o && a["&!"] ? t.unshift(a["&!"]) : "|" === o && a["|!"] && t.unshift(a["|!"])
                } else "show_no_operator" === i.extra && a["!"] && (i.query && a["!"].label.substr(0, i.query.length) !== i.query || t.unshift(a["!"]));
                if (r)
                    for (var l = 0; l < t.length; l++)
                        if (t[l].isOperator && "!" === t[l].key) {
                            t.splice(l, 1);
                            break
                        }
                if (JSON.stringify(t) !== this.lastItems || i.query !== this.lastQuery) {
                    val(this.listEl, "");
                    var n, h = i.query.toLowerCase(),
                        d = new RegExp(`${h}`, "ig");
                    if (r) {
                        var p = h.replace(/[^a-zа-я0-9\s]+/g, "").split("").map(t => t + ".*?").join("");
                        n = new RegExp("^(" + p + ")", "i");
                        for (var u = [], c = 0; c < t.length; c++) {
                            var v = t[c],
                                y = v.label.match(n);
                            u.push([v, y ? y[0].length : 0])
                        }
                        u = u.sort((t, e) => t[1] < e[1] ? 1 : t[1] > e[1] ? -1 : 0), t = u.map(t => t[0])
                    }
                    for (var g = function(i) {
                            var r = t[i],
                                s = r.label.replace(d, t => `<span>${t}</span>`),
                                a = se(`<div class="rich_dropdown_list_item">\n        <div class="rich_dropdown_list_item_label">${s}</div>\n        <div class="rich_dropdown_list_item_type">${e._getType(r)}</div>\n      </div>`);
                            addEvent(a, "mousedown", t => e._onMouseDown(r, t)), addEvent(a, "mouseover", t => {
                                    vkNow() - (e.lastDownChangeTs || 0) > 500 && e._overItem(a, !0)
                                }), a.data = r, 0 === i && addClass(a, "selected"),
                                function(t, e) {
                                    var i = (e || {}).color;
                                    setStyle(t, {
                                        color: i
                                    })
                                }(a, r.styles), e.listEl.appendChild(a)
                        }, f = 0; f < t.length; f++) g(f);
                    0 === t.length && val(this.listEl, `<div class="rich_dropdown_not_found">${getLang("search_nothing_found")}</div>`), this.lastItems = JSON.stringify(t), this.lastQuery = i.query;
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
                var t = this.searchData;
                t.options ? (this.subOptions = t.options, this.subIndexer = new vkIndexer(this.subOptions, t => t.label, () => {
                    this._search(t)
                })) : (this.subIndexer = !1, this.subOptions = !1)
            }
            setOperators() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                this.validOperators = {};
                for (var e = 0; e < t.length; e++) this.validOperators[t[e]] = !0
            }
            getOperators() {
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
                    s = [];
                if (this.validOperators)
                    for (var a = 0; a < r.length; a++) this.validOperators[r[a].key] && s.push(r[a]);
                else s = r;
                if (t) {
                    for (var o = {}, l = 0; l < s.length; l++) {
                        var n = s[l];
                        o[(e ? n.key : n.label).toLowerCase()] = n
                    }
                    return o
                }
                return s
            }
            _overItem(t) {
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || (this.lastDownChangeTs = vkNow(), this.listEl.scrollTop = t.offsetTop - this.listEl.offsetHeight / 2 + t.offsetHeight / 2), removeClass(geByClass1("selected", this.listEl), "selected"), addClass(t, "selected")
            }
            setMaxWidth(t) {
                setStyle(this.listEl, "max-width", parseInt(t) + "px")
            }
        }

        function b(t, e) {
            return function(t) {
                if (Array.isArray(t)) return t
            }(t) || function(t, e) {
                var i = [],
                    r = !0,
                    s = !1,
                    a = void 0;
                try {
                    for (var o, l = t[Symbol.iterator](); !(r = (o = l.next()).done) && (i.push(o.value), !e || i.length !== e); r = !0);
                } catch (t) {
                    s = !0, a = t
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (s) throw a
                    }
                }
                return i
            }(t, e) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class m {
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
                for (var i = {}, r = 0; r < t.length; r++) g(i, t[r].label);
                for (var s = 0; s < e.length; s++) g(i, e[s].label);
                this.prefixesThree = i
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
            forceUpdate() {
                var t = () => {
                    this._onKeyUp({
                        force: 1
                    }), this.textaraEl.autosize.update()
                };
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? t() : setTimeout(t, 5)
            }
            _onKeyUp(t) {
                var e = this._isNoEditableEvent(t);
                if (e || this._process(), (!e || "click" === t.type || "input" === t.type) && "insertText" !== t.inputType) {
                    var i = b(this._getQueryBySelection(!0), 2),
                        r = i[0],
                        s = i[1],
                        a = function(t, e) {
                            var i = ce("div", {
                                className: "rich_dropdown_textarea",
                                innerHTML: `${clean(e)||" "}<div class="rich_dropdown_cursor"></div>`
                            }, {
                                opacity: 0,
                                position: "absolute"
                            });
                            t.appendChild(i);
                            var r = geByClass1("rich_dropdown_cursor", i),
                                s = {
                                    left: r.offsetLeft,
                                    top: r.offsetTop
                                };
                            return re(i), s
                        }(this.wrapEl, val(this.textaraEl).substr(0, this.textaraEl.selectionStart));
                    this.autoComplete.update({
                        pos: a,
                        query: trim(r),
                        extra: s
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
                for (var e = null, i = this.autoComplete.getOperators(!0), r = [], s = 0; s < t.length; s++) {
                    var d = t[s],
                        p = d.type,
                        u = d.words,
                        c = trim(u.join("")),
                        v = p;
                    if (p === l && (v = "(" === trim(u.join("")) ? n : h), v === a && inArray(e, [a, h])) return !1;
                    if (v === n) {
                        if (e && !inArray(e, [h, o, n])) return !1;
                        r.push("(")
                    } else {
                        if (v === h && !r.pop()) return !1;
                        if (v === o) {
                            var y = i[c];
                            if (!y.unary && !inArray(e, [h, a])) return !1;
                            if (y.unary && null !== e && e !== n) return !1
                        }
                    }
                    e = v
                }
                return !(r.length > 0)
            }
            getValue() {
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
                for (var s = r(), n = s, h = 0; h < t.length; h++) {
                    var d = t[h],
                        p = d.type,
                        v = d.words,
                        y = v.join("");
                    if (trim(y)) {
                        var g, f = !1;
                        if (p === l) {
                            if ("(" !== v[0]) {
                                if (n && n.parent) {
                                    n = n.parent;
                                    continue
                                }
                                return !1
                            }
                            f = !0, d.isSection = !0
                        } else {
                            if (inArray(p, [u, c])) continue;
                            if (p === o) d.data = i[trim(y).toLowerCase()];
                            else if (p === a) {
                                var _ = e[trim(y.toLowerCase())];
                                if (!_) return !1;
                                d.data = _
                            }
                        }
                        g = r(n, d), n.children.push(g), f && (n = g, f = !1)
                    }
                }
                return this._threeToArray(s)
            }
            getStringValue() {
                var t = this._parseStr(val(this.textaraEl)),
                    e = this.optionsObj,
                    i = this.autoComplete.getOperators(!0);
                if (!this._validatedParsedValue(t)) return !1;
                for (var r = [], s = 0; s < t.length; s++) {
                    var n = t[s],
                        h = n.type,
                        d = n.words.join("");
                    if (trim(d))
                        if (h === l) r.push(d);
                        else if (h === o) r.push(i[trim(d).toLowerCase()].key);
                    else if (h === a) {
                        var p = e[trim(d).toLowerCase()];
                        if (!p) return !1;
                        r.push(p.key)
                    }
                }
                return r.join("")
            }
            _threeToArray(t) {
                for (var e = [], i = 0; i < t.children.length; i++) {
                    var r = t.children[i],
                        s = r.data,
                        a = s.type,
                        l = s.isSection,
                        n = s.data,
                        h = {};
                    l ? h.type = d : a === o ? (h.type = o, h.key = n.key) : (h.type = p, h.key = n.key), l && (h.values = this._threeToArray(r)), e.push(h)
                }
                return e
            }
            renderByInitialData(t) {
                val(this.inputEl, ""), val(this.textaraEl, ""), t && (isString(t) ? this._renderByInitialStringData(t) : this._renderByInitialData(t))
            }
            _renderByInitialStringData(t) {
                var e = this.autoComplete.getOperators(!0, !0),
                    i = v(this.autoComplete.getOptions(), !1, !0),
                    r = trim(t).match(/([a-zA-Z0-9._]+|[\u0021\u007C\u0026]+|[\u0028\u0029])/g).map(t => {
                        if (e[t]) return e[t].label;
                        if (inArray(t, ["(", ")"])) return t;
                        var r = i[t];
                        return isObject(r) ? r.label : `Failed (${t})`
                    });
                val(this.textaraEl, r.join(" ")), this._process()
            }
            setValue(t) {
                this.renderByInitialData(t), this.forceUpdate(!0), this.autoComplete.hide(), this.disabled && (this.disabledOrigText = val(this.textaraEl))
            }
            _renderByInitialData(t) {
                var e = f(this.autoComplete.getOperators(!0, !0), v(this.autoComplete.getOptions(), !1, !0), t);
                val(this.textaraEl, e), this._process()
            }
            _validateLastItem(t, e, i) {
                var r = this.optionsObj,
                    s = e.length - 1,
                    l = trim(e[s].words.join("")).toLowerCase().replace(/\s\s+/g, " "),
                    n = e[s - 1];
                return t[l] && (i > 0 || t[l].unary) ? (e[s].type = o, e[s].validated = !0, e[s].data = t[l]) : !r[l] || n && n.type === a || (e[s].type = a, e[s].validated = !0), e
            }
            _parseStr(t) {
                for (var e, i = y(t), r = this.autoComplete.getOperators(!0), s = (this.optionsObj, this.textaraEl.selectionStart), o = [], n = this.prefixesThree, h = !1, d = 0, p = !1, v = 0, g = 0; g < i.length; g++) {
                    var f = i[g];
                    if (f) {
                        var _ = !!o[o.length - 1] && o[o.length - 1].validated,
                            b = trim(f).toLowerCase();
                        d += f.length;
                        var m = void 0;
                        if ((m = ":" === b ? u : "," === b ? c : inArray(b, ["(", ")"]) ? l : a) === a) {
                            e || (o.push({
                                type: m,
                                words: []
                            }), e = o[o.length - 1]);
                            var w = "object" == typeof n[b],
                                x = f.match(/\s/),
                                E = !1;
                            !x && !w || h || (o[o.length - 1].words.push(f), this._validateLastItem(r, o, v), E = !0), !w && !x || h ? (E || (w || o[o.length - 1].validated || o[o.length - 1].type !== m ? o.push({
                                type: m,
                                words: [f]
                            }) : o[o.length - 1].words.push(f)), e = o[o.length - 1], this._validateLastItem(r, o, v), "object" == typeof this.prefixesThree[b] ? (n = this.prefixesThree[b], h = !1) : (n = this.prefixesThree, h = !0)) : w && (n = n[b], h = !1), d >= s && !p && (o[o.length - 1].selected = !0, p = !0), inArray(m, [u, c, l]) && (o[o.length - 1].validated = !0), _ && o[o.length - 1].validated && v++
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
                    i = this._parseStr(t);
                val(this.inputEl, "");
                for (var r = [], n = 0; n < i.length; n++) {
                    var h = i[n],
                        d = h.type,
                        p = h.words,
                        v = h.validated,
                        y = p.join(""),
                        g = ce("div", {
                            className: s + " " + d
                        });
                    if (d === a) {
                        var f = e[trim(y.toLowerCase()).replace(/\s\s+/g, " ")];
                        v && isObject(f) && (addClass(g, "validated"), toggleClass(g, "value", !f.options))
                    } else if (inArray(d, [o, u, c])) addClass(g, "validated");
                    else if (d === l)
                        if ("(" === y) addClass(g, "incorrect"), r.push(g);
                        else {
                            var _ = r.pop();
                            _ ? removeClass(_, "incorrect") : addClass(g, "incorrect")
                        }
                    for (var b = "", m = 0; m < p.length; m++) {
                        var w = p[m].replace(/\s/g, "&nbsp;"),
                            x = "";
                        !p[m].match(/^\s+$/) || 0 !== m && m !== p.length - 1 || (x = "spaces_only"), b += `<span class="${x}">${w}</span>`
                    }
                    val(g, b), this.inputEl.appendChild(g)
                }
                0 === i.length && val(this.inputEl, " "), this.opts.onChange && this.opts.onChange(), this.textaraEl.scrollTop = 0
            }
            _checkOperatorByPrefix(t) {
                for (var e = this.autoComplete.getOperators(), i = t.length, r = 0; r < e.length; r++)
                    if (e[r].label.substr(0, i) === t) return !0;
                return !1
            }
            _getQueryBySelection() {
                for (var t, e, i, s = this.textaraEl.selectionStart, n = this.autoComplete.getOperators(!0), h = val(this.textaraEl), d = this._parseStr(h), p = 0, u = 0, c = 0; c < d.length; c++) {
                    var v = d[c],
                        g = v.words.join("");
                    if (trim(g) && (e = v), v.validated && (i = v, u++), v.selected) {
                        t = v;
                        break
                    }
                    p += g.length
                }
                if (t || (t = e), !t) return ["", "show_no_operator"];
                var f = "",
                    _ = t.words.join("").substr(0, Math.max(0, s - p)),
                    b = y(_).pop(),
                    m = !!String(b).match(/\s$/),
                    w = i && i.type === a,
                    x = trim(e.words.join(""));
                return (t.type === o && (b !== r || _ !== t.words.join("")) && u > 1 || e && e.type === l && ")" === x || t.type === a && t.validated && m && _ === t.words.join("") || t.type === a && !t.validated && this._checkOperatorByPrefix(t.words.join("")) && w) && (f = "show_operators"), t.type === o && inArray(t.data.key, ["|", "&"]) && m && (f = "suggest_operator" + t.data.key), (e.type === l && "(" === x || !u && 1 === d.length || "operator" === e.type && "!" === n[x].key && !m) && (f = "show_no_operator"), !f && m && (f = "show_all_if_empty"), [clean(_), f]
            }
            _replaceTextBySelection(t) {
                for (var e = this.textaraEl.selectionStart, i = this.textaraEl.selectionEnd, r = val(this.textaraEl), s = ` ${t.label} `, l = t.isOperator ? o : a, n = "", h = null, d = this._parseStr(r, 1), p = !0, u = 0, c = !1, v = 0; v < d.length; v++) {
                    var y = d[v],
                        g = y.selected,
                        f = y.words,
                        _ = y.type,
                        b = y.validated,
                        m = f.join("").length;
                    if (((u += m) > e || g && (!b || l === _)) && (null === h && (h = u - m), l === _ && (d[v].words = [s], d[v].validated = !0, p = !1), g && (c = !0), u >= i)) break
                }
                p && (d.push({
                    words: [s]
                }), e !== i || c || (h = u = e));
                for (var w = 0; w < d.length; w++) {
                    var x = d[w],
                        E = x.type,
                        C = x.words,
                        O = x.validated;
                    inArray(E, [a, o]) && !O || (n += C.join(""))
                }
                if (n || (h = i - s.length), browser.mozilla) {
                    var k = r.substr(0, h) + s.replace(/\s\s+/g, " ") + r.substr(u),
                        S = k.length - r.length;
                    val(this.textaraEl, k);
                    var j = Math.max(h, u + S);
                    this.textaraEl.setSelectionRange(j, j)
                } else this.textaraEl.setSelectionRange(h, u), document.execCommand("insertText", !0, s.replace(/\s\s+/g, " "));
                var T = val(this.textaraEl),
                    D = T.length;
                if (D !== (T = T.replace(/\s\s+/g, " ").replace(/^\s+/, "")).length) {
                    var I = this.textaraEl.selectionEnd - (D - T.length);
                    val(this.textaraEl, T), this.textaraEl.selectionStart === this.textaraEl.selectionEnd && (this.textaraEl.selectionStart = I), this.textaraEl.selectionEnd = I
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
            constructor(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return e.items = e.items || [], t = ge(t), addClass(t, "rich_dropdown_wrap"), this.input = new m(t, e.items), this.input.renderByInitialData(e.initialData), this.setOptions(e), this
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
            setOptions() {
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
            }
            disable() {
                this.input.disable()
            }
            enable() {
                this.input.enable()
            }
            toggleDisable() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                this.input.disabled && !0 !== t || !1 === t ? this.input.enable() : this.input.disable()
            }
            setValue() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                this.input.setValue(t)
            }
        };
        try {
            stManager.done("rich_dropdown.js")
        } catch (t) {}
    }
});