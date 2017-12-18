function Survey(e, t, i) {
    this._clientSurveyId = e, this._surveyId = t, this._ownerId = i, this._onStateChange = [], this.state = {}, this.blocks = {}
}
Survey.prototype.stateChanged = function() {
    for (var e = 0, t = this._onStateChange.length; t > e; e++) try {
        this._onStateChange[e](this)
    } catch (i) {}
}, Survey.prototype.onStartChange = function(e) {
    this._onStateChange.push(e)
}, Survey.prototype.send = function(e, t) {
    var i = {},
        r = [],
        s = !1,
        n = 0;
    if (each(this.blocks, function(e, t) {
            n++;
            var o = this._clientSurveyId + "_" + e;
            if ("select" === t.type) {
                if (!radioBtns[o].els.length || !radioBtns[o].els[0].offsetParent) return !0;
                var a = radioBtns[o].val;
                if (!a) return r.push({
                    elementToScroll: radioBtns[o].els[0],
                    id: e
                }), !0;
                i[e] = {
                    answer: [a]
                };
                var u = "survey_edit_" + o + "_" + a;
                if (t.inputs.indexOf(u) >= 0) {
                    var l = ge(u);
                    if (i[e].text = val(l), l.getAttribute("required") && (!i[e].text || i[e].text.trim().length < 2)) return r.push({
                        elementToScroll: l,
                        id: e
                    }), !0
                }
            } else if ("checkbox" === t.type) {
                var c = geByClass("survey_select_" + o);
                if (!c.length || !c[0].offsetParent) return !0;
                i[e] = {
                    answer: []
                };
                for (var h = 0, v = c.length; v > h; h++)
                    if (isChecked(c[h])) {
                        var a = c[h].getAttribute("data-id");
                        i[e].answer.push(a);
                        var u = "survey_edit_" + o + "_" + a;
                        if (t.inputs.indexOf(u) >= 0) {
                            var l = ge(u);
                            if (i[e].text = val(l), l.getAttribute("required") && (!i[e].text || i[e].text.trim().length < 5)) return r.push({
                                elementToScroll: l,
                                id: e
                            }), !0
                        }
                    }
                if (0 === i[e].answer.length) return r.push({
                    elementToScroll: c[0],
                    id: e
                }), !0
            } else if ("textfield" == t.type || "textarea" == t.type) {
                var u = "survey_" + t.type + "_" + o,
                    l = ge(u);
                if (i[e] = {
                        text: val(l)
                    }, !i[e].text || i[e].text.trim().length < 2) return t.required && (s = !0, r.push({
                    elementToScroll: l,
                    id: e
                })), !0
            }
        }.bind(this)), r.length && (s || !this.limit || n - r.length < this.limit)) {
        var o = lement = r.find(function(e) {
            return e.elementToScroll
        });
        return o.elementToScroll.scrollIntoView({
            behavior: "smooth"
        }), r.reverse().forEach(function(e) {
            Surveys.notaBene("survey_block_" + e.id)
        }), void showHint(e, {
            dir: "left",
            shift: [-132, -15],
            width: "auto"
        })
    }
    lockButton(e), ajax.post("al_surveys.php?act=save_answer", {
        id: this._surveyId,
        owner_id: this._ownerId,
        answers: JSON.stringify(i),
        hash: t
    }, {
        onDone: function(t) {
            return "ok" !== t ? void unlockButton(e) : (this.hideSection("footer"), this.showSection("gratitude"), void this.lock())
        }.bind(this),
        onFail: function() {
            unlockButton(e)
        }
    })
}, Survey.prototype.showSection = function(e) {
    show(this._clientSurveyId + "_" + e)
}, Survey.prototype.hideSection = function(e) {
    hide(this._clientSurveyId + "_" + e)
}, Survey.prototype.addBlock = function(e) {
    this.blocks[e.id] = e
}, Survey.prototype.lock = function() {
    for (var e in this.blocks) {
        var t = this.blocks[e];
        "select" === t.type ? (radioBtns[this._clientSurveyId + "_" + e].els.forEach(function(e) {
            Surveys.disable(e, !0)
        }), t.inputs.map(function(e) {
            return ge(e)
        }).forEach(function(e) {
            Surveys.disable(e, !0)
        })) : "checkbox" === t.type ? (geByClass("survey_select_" + this._clientSurveyId + "_" + e).forEach(function(e) {
            Surveys.disable(e, !0)
        }), t.inputs.map(function(e) {
            return ge(e)
        }).forEach(function(e) {
            Surveys.disable(e, !0)
        })) : ("textfield" == t.type || "textarea" == t.type) && t.inputs.map(function(e) {
            return ge(e)
        }).forEach(function(e) {
            Surveys.disable(e, !0)
        })
    }
};
var Surveys = {
    activeSurveys: {},
    Survey: Survey,
    disable: function(e, t) {
        return disable(e, t), "TEXTAREA" == e.tagName && (hasClass(e, "disabled") ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    },
    radioButton: function(e, t, i, r) {
        if (!hasClass(e, "disabled")) {
            var s = Surveys.activeSurveys[i].state;
            s[r] || (s[r] = {}), radioBtns[i + "_" + r].val && (s[r][radioBtns[i + "_" + r].val] = !1), s[r][t] = !0, radiobtn(e, t, i + "_" + r), Surveys.activeSurveys[i].blocks[r].inputs.map(function(e) {
                return ge(e)
            }).forEach(function(e) {
                hide(e)
            });
            var n = "survey_edit_" + i + "_" + r + "_" + t,
                o = ge(n);
            o && show(n), Surveys.activeSurveys[i].stateChanged()
        }
    },
    checkbox: function(e, t, i, r, s) {
        if (!hasClass(e, "disabled")) {
            if (s > 0 && !isChecked(e)) {
                var n = geByClass("survey_select_" + i + "_" + r).reduce(function(e, t) {
                    return e + +isChecked(t)
                }, 0);
                if (n === s) return
            }
            if (checkbox(e, t), Surveys.activeSurveys[i].blocks[r].inputs.map(function(e) {
                    return ge(e)
                }).forEach(function(e) {
                    hide(e)
                }), isChecked(e)) {
                var o = "survey_edit_" + i + "_" + r + "_" + t,
                    a = ge(o);
                a && show(o)
            }
            var u = Surveys.activeSurveys[i].state;
            u[r] || (u[r] = {}), u[r][e.getAttribute("data-id")] = !!isChecked(e), Surveys.activeSurveys[i].stateChanged()
        }
    },
    notaBene: function(e) {
        toggleClass(e, "survey_highlight_c1", !0), toggleClass(e, "survey_highlight_c2", !0), setTimeout(function() {
            toggleClass(e, "survey_highlight_c2", !1), setTimeout(function() {
                toggleClass(e, "survey_highlight_c1", !1)
            }, 400)
        }, 300)
    }
};
try {
    stManager.done("surveys.js")
} catch (e) {}