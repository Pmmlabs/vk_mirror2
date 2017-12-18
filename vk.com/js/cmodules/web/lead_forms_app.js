! function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
}([function(e, t, r) {
    e.exports = r(31)
}, function(e, t, r) {
    var n = r(61);
    e.exports = function(e, t, r) {
        if (n(e), void 0 === t) return e;
        switch (r) {
            case 1:
                return function(r) {
                    return e.call(t, r)
                };
            case 2:
                return function(r, n) {
                    return e.call(t, r, n)
                };
            case 3:
                return function(r, n, o) {
                    return e.call(t, r, n, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(59),
        o = r(11),
        a = r(15),
        i = {};
    r(47)(i, r(30)("iterator"), function() {
        return this
    }), e.exports = function(e, t, r) {
        e.prototype = n(i, {
            next: o(1, r)
        }), a(e, t + " Iterator")
    }
}, function(e, t, r) {
    var n = r(35),
        o = r(24),
        a = r(47),
        i = r(29),
        s = r(1),
        u = "prototype",
        l = function(e, t, r) {
            var c, p, _, d, f = e & l.F,
                m = e & l.G,
                v = e & l.S,
                g = e & l.P,
                h = e & l.B,
                y = m ? n : v ? n[t] || (n[t] = {}) : (n[t] || {})[u],
                C = m ? o : o[t] || (o[t] = {}),
                w = C[u] || (C[u] = {});
            m && (r = t);
            for (c in r) p = !f && y && void 0 !== y[c], _ = (p ? y : r)[c], d = h && p ? s(_, n) : g && "function" == typeof _ ? s(Function.call, _) : _, y && i(y, c, _, e & l.U), C[c] != _ && a(C, c, d), g && w[c] != _ && (w[c] = _)
        };
    n.core = o, l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
}, function(e, t, r) {
    var n = r(70);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e) {
        var t = c.get(e.currentTarget);
        if (t) {
            var r = t[e.type];
            if (r)
                for (var n = void 0, o = 0; o < r.length; o++) {
                    var a = s(r[o], 2),
                        i = a[0],
                        u = a[1],
                        l = void 0;
                    if (hasClass(e.target, i) ? l = u(e, e.target) : (n = gpeByClass(i, e.target, e.currentTarget)) && (l = u(e, n)), l === !1) break
                }
        }
    }

    function a(e, t, r, n) {
        var a = c.get(e);
        a || (c.set(e, {}), a = c.get(e));
        for (var i = t.split(" "), s = 0; s < i.length; s++) {
            var u = i[s];
            a[u] || (a[u] = [], addEvent(e, u, o)), a[u].push([r, n])
        }
    }

    function i(e, t, r, n) {
        var a = c.get(e);
        if (a) {
            t.split(" ").forEach(function(t) {
                a[t] && (a[t] = a[t].filter(function(e) {
                    return e[0] !== r || e[1] !== n
                }), 0 === a[t].length && removeEvent(e, t, o))
            });
            var i = Object.keys(a).map(function(e) {
                return a[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === i && c["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var r = [],
                n = !0,
                o = !1,
                a = void 0;
            try {
                for (var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value), !t || r.length !== t); n = !0);
            } catch (u) {
                o = !0, a = u
            } finally {
                try {
                    !n && s["return"] && s["return"]()
                } finally {
                    if (o) throw a
                }
            }
            return r
        }
        return function(t, r) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.addDelegateEvent = a, t.removeDelegateEvent = i;
    var u = r(51),
        l = n(u),
        c = new l["default"]
}, function(e, t, r) {
    var n = r(70),
        o = r(30)("toStringTag"),
        a = "Arguments" == n(function() {
            return arguments
        }()),
        i = function(e, t) {
            try {
                return e[t]
            } catch (r) {}
        };
    e.exports = function(e) {
        var t, r, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(r = i(t = Object(e), o)) ? r : a ? n(t) : "Object" == (s = n(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t, r) {
    var n = r(49);
    e.exports = function(e) {
        return Object(n(e))
    }
}, function(e, t, r) {
    var n = r(52),
        o = r(7),
        a = r(21)("IE_PROTO"),
        i = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = o(e), n(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? i : null
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return {
            callMutations: function() {
                if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                return e
            },
            bindMutations: function() {
                if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                return e = e.apply(void 0, arguments)
            }
        }
    }

    function o(e, t, r, n) {
        c(t, r, n), e._registeredHandlers.push(["bind", t, r, n])
    }

    function a(e, t, r, n, o) {
        (0, u.addDelegateEvent)(t, r, n, o), e._registeredHandlers.push(["delegate", t, r, n, o])
    }

    function i(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(o.bind(null, t), a.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? u.removeDelegateEvent.apply(void 0, t) : p.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = n, t.createModule = i, t.destroyModule = s;
    var u = r(5),
        l = window,
        c = l.addEvent,
        p = l.removeEvent
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, r) {
    var n = r(4),
        o = r(49);
    e.exports = function(e) {
        return n(o(e))
    }
}, function(e, t, r) {
    var n = r(58),
        o = r(44);
    e.exports = Object.keys || function(e) {
        return n(e, o)
    }
}, function(e, t, r) {
    var n = r(41),
        o = r(37),
        a = function(e, t) {
            if (o(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                n = r(1)(Function.call, r(65).f(Object.prototype, "__proto__").set, 2), n(e, []), t = !(e instanceof Array)
            } catch (o) {
                t = !0
            }
            return function(e, r) {
                return a(e, r), t ? e.__proto__ = r : n(e, r), e
            }
        }({}, !1) : void 0),
        check: a
    }
}, function(e, t, r) {
    var n = r(36).f,
        o = r(52),
        a = r(30)("toStringTag");
    e.exports = function(e, t, r) {
        e && !o(e = r ? e : e.prototype, a) && n(e, a, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, r) {
    for (var n = r(54), o = r(29), a = r(35), i = r(47), s = r(50), u = r(30), l = u("iterator"), c = u("toStringTag"), p = s.Array, _ = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], d = 0; 5 > d; d++) {
        var f, m = _[d],
            v = a[m],
            g = v && v.prototype;
        if (g) {
            g[l] || i(g, l, p), g[c] || i(g, c, m), s[m] = p;
            for (f in n) g[f] || o(g, f, n[f], !0)
        }
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t, r, n) {
        return {
            addCustomQuestion: function(e) {
                r.length < l && (r.push((0, u["default"])(r.length + 1, e, {
                    onRemove: function(e) {
                        r.splice(e - 1, 1);
                        for (var n = 0; n < r.length; n++) r[n].setNum(n + 1);
                        t().updateCustomQuestionsButton(), LeadFormsApp.updatePreview()
                    }
                })), t().updateCustomQuestionsButton(), LeadFormsApp.step2Changed())
            },
            updateCustomQuestionsButton: function() {
                var e = r.length,
                    t = ge("lead_forms_app_add_question_button"),
                    n = geByTag1("span", t);
                toggle(t, l > e), e > 0 ? val(n, " (" + cur.lang.communityApps_lead_forms_custom_questions_limit_pref.replace("%s", l - e) + ")") : val(n, "")
            },
            getCustomQuestionsData: function() {
                for (var e = [], t = 0; t < r.length; t++) e.push(r[t].getData());
                return e
            },
            getAdmins: function() {
                return n.adminsDD.val()
            },
            getAdminsElem: function() {
                return n.adminsDD.container
            },
            getEmails: function() {
                return n.adminsEmailsDD.selectedItems().map(function(e) {
                    return e[1]
                }).join(",")
            },
            getEmailsElem: function() {
                return n.adminsEmailsDD.container
            },
            renderConfData: function() {
                for (var e = cur.leadFormConf, r = e.step2.custom_questions, n = 0; n < r.length; n++) t().addCustomQuestion(r[n])
            },
            unmount: function() {
                (0, i.destroyModule)(e)
            }
        }
    }

    function a(e) {
        var t = [],
            r = {},
            n = cur.leadFormConf,
            a = (0, i.createMutations)(o),
            s = a.callMutations,
            u = a.bindMutations;
        r.adminsDD = new Dropdown(ge("lead_forms_generator_dd_settings_admins"), cur.leadFormsAdmins, {
            width: 300,
            big: 1,
            selectedItem: n.step5 ? n.step5.admins : void 0,
            multiselect: !0,
            autocomplete: !0,
            placeholder: getLang("communityApps_lead_form_settings_admins_placeholder"),
            onChange: LeadFormsApp.checkboxNotificationsChanged
        }), r.adminsEmailsDD = new Selector(ge("lead_forms_generator_dd_settings_admins_emails"), [], {
            width: 300,
            big: 1,
            dropdown: !1,
            enableCustom: !0,
            multiCustom: 1,
            noResult: "",
            maxItems: 10,
            placeholder: getLang("communityApps_lead_form_settings_admins_emails_placeholder"),
            onChange: LeadFormsApp.checkboxNotificationsChanged,
            customSearch: LeadFormsApp.checkboxNotificationsChanged
        }), r.scroll = new uiScroll(e);
        var l = (0, i.createModule)({
            handlers: function(e, t) {}
        });
        return u(l, s, t, r)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = r(10),
        s = r(19),
        u = n(s),
        l = 5
}, function(e, t, r) {
    var n = r(41),
        o = r(14).set;
    e.exports = function(e, t, r) {
        var a, i = t.constructor;
        return i !== r && "function" == typeof i && (a = i.prototype) !== r.prototype && n(a) && o && o(e, a), e
    }
}, function(e, t, r) {
    "use strict";

    function n(e, t, r) {
        var n = vkNow(),
            i = a(n, o(e), "", t.label ? t.label : "", c),
            s = cur.leadFormsTpls.dropDown.replace("{input_id}", n).replace("{label}", getLang("communityApps_lead_forms_custom_question_answer_type")),
            u = se(cur.leadFormsTpls.customQuestionWrap.replace("{question}", i).replace("{answer_type}", s)),
            l = geByClass1("lead_forms_app_labeled_row_cont", u).appendChild(ce("div", {
                className: "lead_forms_app_custom_question_row_remove"
            }));
        return addEvent(l, "click", function() {
            re(domClosest("lead_forms_app_custom_question_row", l)), r()
        }), ge("lead_forms_app_custom_questions").appendChild(u), ge("lead_forms_generator_input_" + n).focus(), [u, n]
    }

    function o(e) {
        return getLang("communityApps_lead_forms_custom_question_label").replace("%s", e)
    }

    function a(e, t, r, n, o) {
        return cur.leadFormsTpls.inputRow.replace(/\{input\_id\}/g, e).replace("{label}", t).replace("{placeholder}", r).replace("{value}", n).replace(/\{max\_length\}/g, o)
    }

    function i(e, t, r) {
        return {
            setText: function(e) {},
            onTypeChanged: function(e, n) {
                var o = geByClass1("_lead_forms_app_custom_question_row_extra", r.questionEl);
                if (removeEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click"), val(o, ""), !inArray(e, ["input", "textarea"])) {
                    var a = n.options ? n.options.length : 2;
                    "select" !== e || n.options || (a = 1), val(o, cur.leadFormsTpls.customQuestionExtra.replace("{inputs}", ""));
                    for (var i = 0; a > i; i++) {
                        var s = n.options ? n.options[i] : "";
                        t().addInput(s)
                    }
                }
                addEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click", function(e) {
                    cancelEvent(e), t().addInput()
                }), LeadFormsApp.step2Changed()
            },
            addInput: function(e) {
                var n = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl),
                    o = getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", n.children.length + 1),
                    i = n.appendChild(se(a(vkNow(), "", o, e || "", p))),
                    s = geByClass1("lead_forms_app_labeled_row_cont", i).appendChild(ce("div", {
                        className: "lead_forms_app_custom_question_row_remove"
                    }));
                addEvent(s, "click", function() {
                    t().removeInput(s)
                });
                var u = domCA(geByClass1("lead_forms_app_custom_question_row_extra_add_input", r.questionEl), ".lead_forms_app_labeled_row");
                n.children.length >= _ ? hide(u) : show(u), LeadFormsApp.step2Changed()
            },
            removeInput: function(e) {
                re(domClosest("lead_forms_app_labeled_row", e));
                for (var t = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), n = 0; n < t.length; n++) attr(t[n], "placeholder", getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", n + 1))
            },
            getData: function() {
                for (var e = {
                        label: trim(val("lead_forms_generator_input_" + r.ident)),
                        type: r.answerTypeDD.val(),
                        options: []
                    }, t = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), n = 0; n < t.length; n++) {
                    var o = trim(val(t[n]));
                    o && e.options.push(trim(val(t[n])))
                }
                return e
            },
            getNum: function() {
                return r.questionNum
            },
            setNum: function(e) {
                r.questionNum = e, val(geByClass1("lead_forms_app_labeled_row_label", r.questionEl), o(e))
            },
            unmount: function() {
                (0, l.destroyModule)(e)
            }
        }
    }

    function s(e, t, r) {
        t = t || {};
        var o = n(e, t, function() {
                r.onRemove(d().getNum())
            }),
            a = u(o, 2),
            s = a[0],
            c = a[1],
            p = {
                questionNum: e,
                ident: c,
                questionEl: s,
                callbacks: r
            },
            _ = (0, l.createMutations)(i),
            d = _.callMutations,
            f = _.bindMutations;
        p.answerTypeDD = new Dropdown(ge("lead_forms_generator_dd_" + c), cur.leadFormsData.customQuestionAnswerTypes, {
            width: 300,
            big: 1,
            onChange: function(e) {
                d().onTypeChanged(e, {})
            },
            selectedItem: t.type ? t.type : void 0
        }), t.type && setTimeout(function() {
            d().onTypeChanged(t.type, t)
        });
        var m = (0, l.createModule)({
            handlers: function(e, t) {}
        });
        return f(m, d, p)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            var r = [],
                n = !0,
                o = !1,
                a = void 0;
            try {
                for (var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value), !t || r.length !== t); n = !0);
            } catch (u) {
                o = !0, a = u
            } finally {
                try {
                    !n && s["return"] && s["return"]()
                } finally {
                    if (o) throw a
                }
            }
            return r
        }
        return function(t, r) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t["default"] = s;
    var l = r(10),
        c = 200,
        p = 60,
        _ = 15
}, function(e, t, r) {
    "use strict";
    var n = r(46),
        o = r(3),
        a = r(29),
        i = r(47),
        s = r(52),
        u = r(50),
        l = r(2),
        c = r(15),
        p = r(8),
        _ = r(30)("iterator"),
        d = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        m = "keys",
        v = "values",
        g = function() {
            return this
        };
    e.exports = function(e, t, r, h, y, C, w) {
        l(r, t, h);
        var b, x, E, F = function(e) {
                if (!d && e in B) return B[e];
                switch (e) {
                    case m:
                        return function() {
                            return new r(this, e)
                        };
                    case v:
                        return function() {
                            return new r(this, e)
                        }
                }
                return function() {
                    return new r(this, e)
                }
            },
            k = t + " Iterator",
            S = y == v,
            A = !1,
            B = e.prototype,
            O = B[_] || B[f] || y && B[y],
            D = O || F(y),
            T = y ? S ? F("entries") : D : void 0,
            j = "Array" == t ? B.entries || O : O;
        if (j && (E = p(j.call(new e)), E !== Object.prototype && (c(E, k, !0), n || s(E, _) || i(E, _, g))), S && O && O.name !== v && (A = !0, D = function() {
                return O.call(this)
            }), n && !w || !d && !A && B[_] || i(B, _, D), u[t] = D, u[k] = g, y)
            if (b = {
                    values: S ? D : F(v),
                    keys: C ? D : F(m),
                    entries: T
                }, w)
                for (x in b) x in B || a(B, x, b[x]);
            else o(o.P + o.F * (d || A), t, b);
        return b
    }
}, function(e, t, r) {
    var n = r(25)("keys"),
        o = r(38);
    e.exports = function(e) {
        return n[e] || (n[e] = o(e))
    }
}, function(e, t, r) {
    var n = r(12),
        o = r(56),
        a = r(28);
    e.exports = function(e) {
        return function(t, r, i) {
            var s, u = n(t),
                l = o(u.length),
                c = a(i, l);
            if (e && r != r) {
                for (; l > c;)
                    if (s = u[c++], s != s) return !0
            } else
                for (; l > c; c++)
                    if ((e || c in u) && u[c] === r) return e || c;
            return !e && -1
        }
    }
}, function(e, t, r) {
    var n = r(41),
        o = r(35).document,
        a = n(o) && n(o.createElement);
    e.exports = function(e) {
        return a ? o.createElement(e) : {}
    }
}, function(e, t) {
    var r = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = r)
}, function(e, t, r) {
    var n = r(35),
        o = "__core-js_shared__",
        a = n[o] || (n[o] = {});
    e.exports = function(e) {
        return a[e] || (a[e] = {})
    }
}, function(e, t) {
    var r = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e)
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, r) {
    var n = r(26),
        o = Math.max,
        a = Math.min;
    e.exports = function(e, t) {
        return e = n(e), 0 > e ? o(e + t, 0) : a(e, t)
    }
}, function(e, t, r) {
    var n = r(35),
        o = r(47),
        a = r(52),
        i = r(38)("src"),
        s = "toString",
        u = Function[s],
        l = ("" + u).split(s);
    r(24).inspectSource = function(e) {
        return u.call(e)
    }, (e.exports = function(e, t, r, s) {
        var u = "function" == typeof r;
        u && (a(r, "name") || o(r, "name", t)), e[t] !== r && (u && (a(r, i) || o(r, i, e[t] ? "" + e[t] : l.join(String(t)))), e === n ? e[t] = r : s ? e[t] ? e[t] = r : o(e, t, r) : (delete e[t], o(e, t, r)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[i] || u.call(this)
    })
}, function(e, t, r) {
    var n = r(25)("wks"),
        o = r(38),
        a = r(35).Symbol,
        i = "function" == typeof a;
    e.exports = function(e) {
        return n[e] || (n[e] = i && a[e] || (i ? a : o)("Symbol." + e))
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var o = function() {
            function e(e, t) {
                var r = [],
                    n = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value), !t || r.length !== t); n = !0);
                } catch (u) {
                    o = !0, a = u
                } finally {
                    try {
                        !n && s["return"] && s["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = r(17),
        i = n(a);
    window.LeadFormsApp = {
        showGeneratorBox: function(e) {
            showBox("lead_forms_app.php", {
                act: "generate_form_box",
                group_id: cur.leadFormGroupId,
                form_id: e
            }, {
                onDone: function() {
                    cur.initialFormConf = LeadFormsApp.getDomData(), cur.leadFormName = trim(val("lead_form_header_name"))
                },
                params: {
                    onHideAttempt: function(e) {
                        return e || JSON.stringify(LeadFormsApp.getDomData()) === JSON.stringify(cur.initialFormConf) && cur.leadFormName === trim(val("lead_form_header_name")) ? !0 : (showFastBox(getLang("global_warning"), getLang("communityApps_lead_forms_hide_generator_warning"), getLang("global_continue"), LeadFormsApp.doHideGenerator, getLang("global_cancel")), !1)
                    }
                }
            })
        },
        doHideGenerator: function() {
            curBox().hide(), curBox().hide(!0)
        },
        initGenerator: function(e) {
            curBox().setOptions({
                grey: !0,
                hideButtons: !0,
                width: 1e3
            }), cur.leadFormsData = e, cur.leadFormsTpls = e.tpl;
            var t = geByClass1("lead_forms_app_generator_sections");
            cur.leadFromGenerator = (0, i["default"])(t), cur.leadFromGenerator.renderConfData(), this.initUpload(e.upload_info), cur.leadFormsStep = cur.leadFormConf.step1.on ? 1 : 2, this.updatePreview()
        },
        welcomeScreenToggle: function(e, t) {
            cancelEvent(t), toggleClass(geByClass1("_ui_toggler", e), "on"), this.step1Changed(), removeClass("lead_forms_step_section_1", "section_error"), removeClass("lead_forms_generator_input_title", "input_error"), removeClass("lead_forms_generator_input_description", "input_error"), removeClass("lead_forms_generator_input_button", "input_error"), removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error")
        },
        checkSectionErrors: function(e) {
            var t = ge("lead_forms_step_section_" + e);
            geByClass1("input_error", t) || geByClass1("button_error", t) || removeClass(t, "section_error")
        },
        sectionHeaderClick: function(e) {
            var t = e.parentNode,
                r = geByClass1("lead_forms_app_section_content", t);
            slideToggle(r, 200), toggleClass(t, "expanded")
        },
        inputOnKeyUp: function(e) {
            var t = e.id.replace("lead_forms_generator_input_", ""),
                r = parseInt(attr(e, "maxlength"));
            if (cur.leadFormsStep = parseInt(attr(domCA(e, ".lead_forms_app_generator_section"), "data-step")), removeClass(e, "input_error"), this.checkSectionErrors(cur.leadFormsStep), 5 !== cur.leadFormsStep && this.updatePreview(), !isNaN(r)) {
                var n = Math.max(0, r - val(e).length);
                val("lead_forms_generator_input_limit_info_" + t, n)
            }
        },
        initUpload: function(e) {
            var t = this,
                r = {
                    file_name: "photo",
                    file_size_limit: 26214400,
                    file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                    file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                    accept: "image/*",
                    lang: e.lang,
                    clear: 1,
                    noFlash: 1,
                    signed: 1,
                    type: "photo",
                    buttonClass: "secondary small",
                    max_attempts: 3,
                    server: e.server,
                    base_url: e.server_base_url,
                    static_url: e.server_static_url,
                    check_url: e.check_url
                },
                n = ge("lead_form_upload_wrap");
            Upload.init(n, e.upload_url, {}, extend(r, {
                onUploadStart: function() {
                    removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"), t.checkSectionErrors(1), lockButton(geByClass1("flat_button", n))
                },
                onUploadComplete: function(e, r) {
                    var o = parseJSON(r) || {
                        error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                    };
                    if (o.error || !o.photos) {
                        var a = void 0;
                        return a = "ERR_UPLOAD_BAD_IMAGE_SIZE" === o.error || o.error.indexOf('result "1"') > -1 ? getLang("communityApps_lead_forms_upload_error") : o.error, showFastBox(getLang("global_error"), a), void unlockButton(geByClass1("flat_button", n))
                    }
                    t.saveUploadedCover(o, geByClass1("flat_button", n))
                },
                onUploadError: function() {
                    unlockButton(geByClass1("flat_button", n))
                }
            }))
        },
        saveUploadedCover: function(e, t) {
            var r = this;
            e.photos = JSON.stringify(e.photos), ajax.post("al_photos.php", extend({
                act: "choose_uploaded"
            }, e), {
                onDone: function(e, t) {
                    var n = ge("lead_form_upload_wrap");
                    attr(n, "data-media", e), r.step1Changed()
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        },
        getDomData: function() {
            for (var e = ge("lead_form_upload_wrap"), t = {
                    title: trim(val("lead_forms_generator_input_title")),
                    cover: attr(e, "data-media"),
                    description: trim(val("lead_forms_generator_input_description")),
                    button: val("lead_forms_generator_input_button"),
                    on: hasClass(geByClass1("_lead_forms_welcome_screen_toggler"), "on")
                }, r = {
                    questions: [],
                    custom_questions: cur.leadFromGenerator.getCustomQuestionsData()
                }, n = geByClass("lead_forms_app_questions_checkboxes"), o = 0; o < n.length; o++) {
                var a = n[o];
                hasClass(a, "on") && r.questions.push(attr(a, "data-name"))
            }
            var i = {
                    link: trim(val("lead_forms_generator_input_policy_url"))
                },
                s = {
                    description: trim(val("lead_forms_generator_input_confirm_description")),
                    link: trim(val("lead_forms_generator_input_confirm_url"))
                },
                u = {
                    pixel: trim(val("lead_forms_generator_input_pixel_vk")),
                    no_repeat: hasClass(geByClass1("_lead_forms_checkbox_settings_no_repeat"), "on"),
                    notification: hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on"),
                    im_notify: hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                    admins: cur.leadFromGenerator.getAdmins(),
                    emails: cur.leadFromGenerator.getEmails()
                };
            return {
                step1: t,
                step2: r,
                step3: i,
                step4: s,
                step5: u
            }
        },
        saveForm: function(e) {
            var t = this.getDomData(),
                r = t.step1,
                n = t.step2,
                o = t.step3,
                a = t.step5,
                i = !1;
            !r.on || r.title && r.description && r.button && r.cover ? removeClass("lead_forms_step_section_1", "section_error") : (i = !0, addClass("lead_forms_step_section_1", "section_error"), r.title || addClass("lead_forms_generator_input_title", "input_error"), r.description || addClass("lead_forms_generator_input_description", "input_error"), r.button || addClass("lead_forms_generator_input_button", "input_error"), r.cover || addClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"));
            var s = !0;
            for (var u in n.custom_questions)
                if (n.custom_questions.label) {
                    s = !1;
                    break
                }
            return !n.questions.length && s ? void topError(getLang("communityApps_lead_forms_no_questions_error"), {
                dt: 3
            }) : (o.link || (i = !0, addClass("lead_forms_step_section_3", "section_error"), addClass("lead_forms_generator_input_policy_url", "input_error")), !a.notification || a.admins || a.emails || (i = !0, addClass("lead_forms_step_section_5", "section_error"), addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), addClass(cur.leadFromGenerator.getEmailsElem(), "input_error")), a.im_notify && !a.admins && (i = !0, addClass("lead_forms_step_section_5", "section_error"), addClass(cur.leadFromGenerator.getAdminsElem(), "input_error")), a.pixel && !a.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/) && (i = !0, addClass("lead_forms_step_section_5", "section_error"), addClass("lead_forms_generator_input_pixel", "input_error"), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_pixel_error"))), void(i || ajax.post("lead_forms_app.php", {
                act: "save_form",
                name: val("lead_form_header_name"),
                group_id: cur.leadFormGroupId,
                data: JSON.stringify(t),
                hash: cur.leadFormsAppSaveHash,
                form_id: cur.leadFormId
            }, {
                onDone: function() {
                    curBox().hide(!0), nav.reload()
                },
                onFail: function(e) {
                    return "bad_policy_link" === e ? (addClass("lead_forms_step_section_3", "section_error"), addClass("lead_forms_generator_input_policy_url", "input_error"), !0) : "bad_site_link" === e ? (addClass("lead_forms_step_section_4", "section_error"), addClass("lead_forms_generator_input_confirm_url", "input_error"), !0) : void 0
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })))
        },
        updatePreview: function() {
            var e = this;
            clearTimeout(cur.leadFormsUpdatePreviewTimer), cur.leadFormsUpdatePreviewTimer = setTimeout(function() {
                ajax.post("lead_forms_app.php", {
                    act: "save_preview",
                    group_id: cur.leadFormGroupId,
                    preview_id: cur.leadFormsPreviewId,
                    hash: cur.leadFormsPreviewHash,
                    data: JSON.stringify(e.getDomData())
                }, {
                    onDone: function() {
                        var e = ce("iframe", {
                                frameBorder: 0,
                                className: "lead_forms_preview_frame",
                                src: vk.loginscheme + "://" + vk.host + "/lead_forms_app.php?act=view_form&group_id=" + cur.leadFormGroupId + "&step=" + cur.leadFormsStep + "&preview=" + cur.leadFormsPreviewId
                            }),
                            t = ge("lead_forms_preview_wrap");
                        val(t, ""), ge(t).appendChild(e)
                    }
                })
            }, 400)
        },
        initForm: function() {
            if (cur.leadFormsPixel) {
                var e = vkImage();
                e.src = "https://vk.com/rtrg?p=" + cur.leadFormsPixel, utilsNode.appendChild(e)
            }
        },
        step1Changed: function() {
            cur.leadFormsStep = 1, this.updatePreview()
        },
        step2Changed: function() {
            cur.leadFormsStep = 2, this.updatePreview()
        },
        switchStep: function(e) {
            var t = ge("lead_forms_view_wrap");
            removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), addClass("step" + e, "lead_forms_step_active"), addClass("step" + e + "_buttons", "lead_forms_step_active");
            var r = e;
            2 == cur.leadFormSteps && r--, val("lead_forms_step_info", cur.lang.communityApps_lead_forms_step_info.replace("{step}", r).replace("{total_steps}", cur.leadFormSteps))
        },
        sendForm: function(e) {
            for (var t = cur.leadFormConfig, r = [], n = !1, o = 0; o < t.step2.questions.length; o++) {
                var a = t.step2.questions[o],
                    i = "lead_forms_view_input_" + a,
                    s = trim(val(i));
                !s || "email" === a && !this.validateEmail(s) || "phone_number" === a && !this.validatePhone(s) || "birthday" === a && !this.validateBirthday(s) ? (notaBene(i, !1, n), n = !0) : r.push({
                    question: a,
                    value: s
                })
            }
            for (var u = 0; u < t.step2.custom_questions.length; u++) {
                var l = t.step2.custom_questions[u],
                    c = void 0,
                    p = void 0,
                    _ = geByClass1("_custom_question_" + u);
                switch (l.type) {
                    case "input":
                    case "textarea":
                        p = ge("lead_forms_view_input_custom_question_" + u), c = trim(val(p));
                        break;
                    case "radio":
                        c = window.radioBtns["custom_question_" + u].val, c > 0 && (c = l.options[c - 1]);
                        break;
                    case "checkbox":
                        c = [];
                        for (var d = geByClass("checkbox", _), f = 0; f < d.length; f++) hasClass(d[f], "on") && c.push(l.options[f]);
                        break;
                    case "select":
                        c = l.options[parseInt(ge("lead_forms_custom_question_select_" + u).value)]
                }
                c.length ? r.push({
                    question: "custom_" + u,
                    value: c
                }) : (inArray(l.type, ["input", "textarea"]) ? (notaBene(p, !1, n), n || LeadFormsApp.scrollToEl(p)) : LeadFormsApp.titleError(geByClass1("lead_form_view_labeled_row_label", _), n), n = !0)
            }
            var m = geByClass1("lead_form_view_policy");
            return hasClass(m, "on") ? void(n || ajax.post("lead_forms_app.php", {
                act: "send_form",
                hash: cur.leadFormSendHash,
                questions: JSON.stringify(r),
                group_id: cur.leadFormGroupId,
                form_id: cur.leadFormId,
                access_token: cur.leadFormsAccessToken
            }, {
                onDone: function() {
                    LeadFormsApp.switchStep(3), cur.leadFormSiteLink || hide(geByClass1("lead_forms_buttons_wrap"))
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })) : LeadFormsApp.titleError(m, n)
        },
        titleError: function(e, t) {
            addClass(e, "mark_as_error"), setTimeout(function() {
                removeClass(e, "mark_as_error")
            }, 800), t || LeadFormsApp.scrollToEl(e)
        },
        scrollToEl: function(e) {
            var t = geByClass1("lead_forms_view_cont_wrap"),
                r = t.scrollTop,
                n = getXY(e)[1] - (window.innerHeight - 180);
            t.scrollTop = r + n
        },
        formNameDown: function(e) {
            if (!geByTag1("input", e)) {
                var t = e.offsetWidth - 30,
                    r = clean(val(e));
                val(e, '<input type="text" class="dark" value="' + r + '" id="lead_form_name" style="width: ' + t + 'px;" onblur="LeadFormsApp.fromNameBlur(this, event)" onkeypress="if (event.keyCode == KEY.ENTER) this.blur()" />'), setStyle(e, "margin-left", "-6px"), setTimeout(function() {
                    setStyle("lead_form_name", "width", 270);
                    var e = geByTag1("input", "lead_form_header_name");
                    document.activeElement !== e && (e.focus(), e.selectionStart = String(val(e)).length)
                })
            }
        },
        fromNameBlur: function(e, t) {
            cancelEvent(t);
            var r = clean(val(e)),
                n = ge("lead_form_header_name");
            setStyle(n, "margin-left", 0), val(n, trim(r) || cur.leadFormDefName)
        },
        setFormStatus: function(e, t, r) {
            var n = 1;
            hasClass(e, "lead_forms_app_form_active") && (n = 0), toggleClass(e, "lead_forms_app_form_active"), val(e, n ? cur.lang.communityApps_lead_form_status_on : cur.lang.communityApps_lead_form_status_off), ajax.post("lead_forms_app.php", {
                act: "set_form_status",
                status: n,
                group_id: cur.leadFormGroupId,
                form_id: t,
                hash: r
            }, {
                showProgress: lockLink.pbind(e),
                hideProgress: unlockLink.pbind(e)
            })
        },
        deleteForm: function(e, t, r) {
            addClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted");
            var n = ge("lead_form_actions" + t),
                o = n.offsetWidth - 20;
            addClass(n, "lead_forms_app_no_display");
            var a = ge("lead_form_restore" + t);
            removeClass(a, "lead_forms_app_no_display"), setStyle(a, "width", o + "px"), this.deleteFormSend(r, t)
        },
        restoreForm: function(e, t, r) {
            removeClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted"), removeClass("lead_form_actions" + t, "lead_forms_app_no_display"), addClass("lead_form_restore" + t, "lead_forms_app_no_display"), this.deleteFormSend(r, t, !0)
        },
        deleteFormSend: function(e, t, r) {
            ajax.post("lead_forms_app.php", {
                act: "form_delete",
                hash: e,
                form_id: t,
                group_id: cur.leadFormGroupId,
                restore: r ? 1 : 0
            })
        },
        validateEmail: function(e) {
            var t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return t.test(e)
        },
        validatePhone: function(e) {
            var t = String(e).replace(/[^0-9]/g, "").length;
            return t >= 10 && 12 >= t
        },
        validateBirthday: function(e) {
            var t = String(e).match(/^\d{1,2}([./-])\d{1,2}\1\d{4}$/);
            if (!t) return !1;
            var r = t[0].split(t[1]),
                n = o(r, 3),
                a = n[0],
                i = n[1],
                s = n[2];
            return a = parseInt(trim(a)), a > 31 || 1 > a ? !1 : (i = parseInt(trim(i)), i > 12 || 1 > i ? !1 : (s = parseInt(trim(s)), s > 1927))
        },
        policyCheckBoxClick: function(e, t) {
            "A" !== e.target.tagName && checkbox(t)
        },
        formLinkClick: function(e, t) {
            cancelEvent(t);
            var r = document.createRange();
            r.selectNodeContents(e);
            var n = getSelection();
            n.removeAllRanges(), n.addRange(r), document.execCommand("copy")
        },
        checkboxNotificationsChanged: function() {
            removeClass("lead_forms_step_section_5", "section_error"), removeClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), removeClass(cur.leadFromGenerator.getEmailsElem(), "input_error")
        },
        copyLink: function(e, t) {
            cancelEvent(t);
            var r = bodyNode.appendChild(ce("input", {
                value: e
            }, {
                position: "fixed",
                top: 0,
                left: 0,
                opacity: 0
            }));
            r.select(), document.execCommand("copy"), re(r), showDoneBox(getLang("communityApps_lead_forms_link_copied"))
        }
    };
    try {
        stManager.done("lead_forms_app.js")
    } catch (s) {}
}, function(e, t, r) {
    e.exports = r(35).document && document.documentElement
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(35),
        o = r(3),
        a = r(29),
        i = r(45),
        s = r(60),
        u = r(66),
        l = r(69),
        c = r(41),
        p = r(27),
        _ = r(53),
        d = r(15),
        f = r(18);
    e.exports = function(e, t, r, m, v, g) {
        var h = n[e],
            y = h,
            C = v ? "set" : "add",
            w = y && y.prototype,
            b = {},
            x = function(e) {
                var t = w[e];
                a(w, e, "delete" == e ? function(e) {
                    return g && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return g && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return g && !c(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, r) {
                    return t.call(this, 0 === e ? 0 : e, r), this
                })
            };
        if ("function" == typeof y && (g || w.forEach && !p(function() {
                (new y).entries().next()
            }))) {
            var E = new y,
                F = E[C](g ? {} : -0, 1) != E,
                k = p(function() {
                    E.has(1)
                }),
                S = _(function(e) {
                    new y(e)
                }),
                A = !g && p(function() {
                    for (var e = new y, t = 5; t--;) e[C](t, t);
                    return !e.has(-0)
                });
            S || (y = t(function(t, r) {
                l(t, y, e);
                var n = f(new h, t, y);
                return void 0 != r && u(r, v, n[C], n), n
            }), y.prototype = w, w.constructor = y), (k || A) && (x("delete"), x("has"), v && x("get")), (A || F) && x(C), g && w.clear && delete w.clear
        } else y = m.getConstructor(t, e, v, C), i(y.prototype, r), s.NEED = !0;
        return d(y, e), b[e] = y, o(o.G + o.W + o.F * (y != h), b), g || m.setStrong(y, e, v), y
    }
}, function(e, t) {
    var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = r)
}, function(e, t, r) {
    var n = r(37),
        o = r(71),
        a = r(72),
        i = Object.defineProperty;
    t.f = r(67) ? Object.defineProperty : function(e, t, r) {
        if (n(e), t = a(t, !0), n(r), o) try {
            return i(e, t, r)
        } catch (s) {}
        if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
        return "value" in r && (e[t] = r.value), e
    }
}, function(e, t, r) {
    var n = r(41);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t) {
    var r = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + n).toString(36))
    }
}, function(e, t, r) {
    var n = r(50),
        o = r(30)("iterator"),
        a = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || a[o] === e)
    }
}, function(e, t, r) {
    var n = r(30)("unscopables"),
        o = Array.prototype;
    void 0 == o[n] && r(47)(o, n, {}), e.exports = function(e) {
        o[n][e] = !0
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, r) {
    var n = r(36),
        o = r(37),
        a = r(13);
    e.exports = r(67) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var r, i = a(t), s = i.length, u = 0; s > u;) n.f(e, r = i[u++], t[r]);
        return e
    }
}, function(e, t, r) {
    var n = r(37);
    e.exports = function(e, t, r, o) {
        try {
            return o ? t(n(r)[0], r[1]) : t(r)
        } catch (a) {
            var i = e["return"];
            throw void 0 !== i && n(i.call(e)), a
        }
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, r) {
    var n = r(29);
    e.exports = function(e, t, r) {
        for (var o in t) n(e, o, t[o], r);
        return e
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, r) {
    var n = r(36),
        o = r(11);
    e.exports = r(67) ? function(e, t, r) {
        return n.f(e, t, o(1, r))
    } : function(e, t, r) {
        return e[t] = r, e
    }
}, function(e, t, r) {
    "use strict";
    var n = r(64);
    e.exports = r(34)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = n.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return n.def(this, 0 === e ? 0 : e, t)
        }
    }, n, !0)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t, r) {
    r(55), r(57), r(16), r(48), e.exports = r(24).Map
}, function(e, t) {
    var r = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return r.call(e, t)
    }
}, function(e, t, r) {
    var n = r(30)("iterator"),
        o = !1;
    try {
        var a = [7][n]();
        a["return"] = function() {
            o = !0
        }, Array.from(a, function() {
            throw 2
        })
    } catch (i) {}
    e.exports = function(e, t) {
        if (!t && !o) return !1;
        var r = !1;
        try {
            var a = [7],
                i = a[n]();
            i.next = function() {
                r = !0
            }, a[n] = function() {
                return i
            }, e(a)
        } catch (s) {}
        return r
    }
}, function(e, t, r) {
    "use strict";
    var n = r(40),
        o = r(33),
        a = r(50),
        i = r(12);
    e.exports = r(20)(Array, "Array", function(e, t) {
        this._t = i(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            r = this._i++;
        return !e || r >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, r) : "values" == t ? o(0, e[r]) : o(0, [r, e[r]])
    }, "values"), a.Arguments = a.Array, n("keys"), n("values"), n("entries")
}, function(e, t, r) {
    "use strict";
    var n = r(6),
        o = {};
    o[r(30)("toStringTag")] = "z", o + "" != "[object z]" && r(29)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t, r) {
    var n = r(26),
        o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(n(e), 9007199254740991) : 0
    }
}, function(e, t, r) {
    "use strict";
    var n = r(68)(!0);
    r(20)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            r = this._i;
        return r >= t.length ? {
            value: void 0,
            done: !0
        } : (e = n(t, r), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, r) {
    var n = r(52),
        o = r(12),
        a = r(22)(!1),
        i = r(21)("IE_PROTO");
    e.exports = function(e, t) {
        var r, s = o(e),
            u = 0,
            l = [];
        for (r in s) r != i && n(s, r) && l.push(r);
        for (; t.length > u;) n(s, r = t[u++]) && (~a(l, r) || l.push(r));
        return l
    }
}, function(e, t, r) {
    var n = r(37),
        o = r(42),
        a = r(44),
        i = r(21)("IE_PROTO"),
        s = function() {},
        u = "prototype",
        l = function() {
            var e, t = r(23)("iframe"),
                n = a.length,
                o = ">";
            for (t.style.display = "none", r(32).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + o), e.close(), l = e.F; n--;) delete l[u][a[n]];
            return l()
        };
    e.exports = Object.create || function(e, t) {
        var r;
        return null !== e ? (s[u] = n(e), r = new s, s[u] = null, r[i] = e) : r = l(), void 0 === t ? r : o(r, t)
    }
}, function(e, t, r) {
    var n = r(38)("meta"),
        o = r(41),
        a = r(52),
        i = r(36).f,
        s = 0,
        u = Object.isExtensible || function() {
            return !0
        },
        l = !r(27)(function() {
            return u(Object.preventExtensions({}))
        }),
        c = function(e) {
            i(e, n, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        p = function(e, t) {
            if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, n)) {
                if (!u(e)) return "F";
                if (!t) return "E";
                c(e)
            }
            return e[n].i
        },
        _ = function(e, t) {
            if (!a(e, n)) {
                if (!u(e)) return !0;
                if (!t) return !1;
                c(e)
            }
            return e[n].w
        },
        d = function(e) {
            return l && f.NEED && u(e) && !a(e, n) && c(e), e
        },
        f = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: p,
            getWeak: _,
            onFreeze: d
        }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, r) {
    var n = r(6),
        o = r(30)("iterator"),
        a = r(50);
    e.exports = r(24).getIteratorMethod = function(e) {
        return void 0 != e ? e[o] || e["@@iterator"] || a[n(e)] : void 0
    }
}, function(e, t, r) {
    "use strict";
    var n = r(35),
        o = r(36),
        a = r(67),
        i = r(30)("species");
    e.exports = function(e) {
        var t = n[e];
        a && t && !t[i] && o.f(t, i, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, r) {
    "use strict";
    var n = r(36).f,
        o = r(59),
        a = (r(47), r(45)),
        i = r(1),
        s = r(69),
        u = r(49),
        l = r(66),
        c = r(20),
        p = r(33),
        _ = r(63),
        d = r(67),
        f = r(60).fastKey,
        m = d ? "_s" : "size",
        v = function(e, t) {
            var r, n = f(t);
            if ("F" !== n) return e._i[n];
            for (r = e._f; r; r = r.n)
                if (r.k == t) return r
        };
    e.exports = {
        getConstructor: function(e, t, r, c) {
            var p = e(function(e, n) {
                s(e, p, t, "_i"), e._i = o(null), e._f = void 0, e._l = void 0, e[m] = 0, void 0 != n && l(n, r, e[c], e)
            });
            return a(p.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete t[r.i];
                    e._f = e._l = void 0, e[m] = 0
                },
                "delete": function(e) {
                    var t = this,
                        r = v(t, e);
                    if (r) {
                        var n = r.n,
                            o = r.p;
                        delete t._i[r.i], r.r = !0, o && (o.n = n), n && (n.p = o), t._f == r && (t._f = n), t._l == r && (t._l = o), t[m]--
                    }
                    return !!r
                },
                forEach: function(e) {
                    s(this, p, "forEach");
                    for (var t, r = i(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (r(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!v(this, e)
                }
            }), d && n(p.prototype, "size", {
                get: function() {
                    return u(this[m])
                }
            }), p
        },
        def: function(e, t, r) {
            var n, o, a = v(e, t);
            return a ? a.v = r : (e._l = a = {
                i: o = f(t, !0),
                k: t,
                v: r,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = a), n && (n.n = a), e[m]++, "F" !== o && (e._i[o] = a)), e
        },
        getEntry: v,
        setStrong: function(e, t, r) {
            c(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, r = e._l; r && r.r;) r = r.p;
                return e._t && (e._l = r = r ? r.n : e._t._f) ? "keys" == t ? p(0, r.k) : "values" == t ? p(0, r.v) : p(0, [r.k, r.v]) : (e._t = void 0, p(1))
            }, r ? "entries" : "values", !r, !0), _(t)
        }
    }
}, function(e, t, r) {
    var n = r(9),
        o = r(11),
        a = r(12),
        i = r(72),
        s = r(52),
        u = r(71),
        l = Object.getOwnPropertyDescriptor;
    t.f = r(67) ? l : function(e, t) {
        if (e = a(e), t = i(t, !0), u) try {
            return l(e, t)
        } catch (r) {}
        return s(e, t) ? o(!n.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, r) {
    var n = r(1),
        o = r(43),
        a = r(39),
        i = r(37),
        s = r(56),
        u = r(62);
    e.exports = function(e, t, r, l, c) {
        var p, _, d, f = c ? function() {
                return e
            } : u(e),
            m = n(r, l, t ? 2 : 1),
            v = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (a(f))
            for (p = s(e.length); p > v; v++) t ? m(i(_ = e[v])[0], _[1]) : m(e[v]);
        else
            for (d = f.call(e); !(_ = d.next()).done;) o(d, m, _.value, t)
    }
}, function(e, t, r) {
    e.exports = !r(27)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, r) {
    var n = r(26),
        o = r(49);
    e.exports = function(e) {
        return function(t, r) {
            var a, i, s = String(o(t)),
                u = n(r),
                l = s.length;
            return 0 > u || u >= l ? e ? "" : void 0 : (a = s.charCodeAt(u), 55296 > a || a > 56319 || u + 1 === l || (i = s.charCodeAt(u + 1)) < 56320 || i > 57343 ? e ? s.charAt(u) : a : e ? s.slice(u, u + 2) : (a - 55296 << 10) + (i - 56320) + 65536)
        }
    }
}, function(e, t) {
    e.exports = function(e, t, r, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(r + ": incorrect invocation!");
        return e
    }
}, function(e, t) {
    var r = {}.toString;
    e.exports = function(e) {
        return r.call(e).slice(8, -1)
    }
}, function(e, t, r) {
    e.exports = !r(67) && !r(27)(function() {
        return 7 != Object.defineProperty(r(23)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, r) {
    var n = r(41);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var r, o;
        if (t && "function" == typeof(r = e.toString) && !n(o = r.call(e))) return o;
        if ("function" == typeof(r = e.valueOf) && !n(o = r.call(e))) return o;
        if (!t && "function" == typeof(r = e.toString) && !n(o = r.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}]);