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
        s = [],
        r = !1,
        n = 0;
    if (each(this.blocks, function(e, t) {
            n++;
            var a = this._clientSurveyId + "_" + e;
            if ("select" === t.type) {
                if (!radioBtns[a].els.length || !radioBtns[a].els[0].offsetParent) return !0;
                var o = radioBtns[a].val;
                if (!o) return s.push({
                    elementToScroll: radioBtns[a].els[0],
                    id: e
                }), !0;
                i[e] = {
                    answer: [o]
                };
                var u = "survey_edit_" + a + "_" + o;
                if (t.inputs.indexOf(u) >= 0) {
                    var l = ge(u);
                    if (i[e].text = val(l), l.getAttribute("required") && (!i[e].text || i[e].text.trim().length < 2)) return s.push({
                        elementToScroll: l,
                        id: e
                    }), !0
                }
            } else if ("checkbox" === t.type) {
                var c = geByClass("survey_select_" + a);
                if (!c.length || !c[0].offsetParent) return !0;
                i[e] = {
                    answer: []
                };
                for (var h = 0, d = c.length; d > h; h++)
                    if (isChecked(c[h])) {
                        var o = c[h].getAttribute("data-id");
                        i[e].answer.push(o);
                        var u = "survey_edit_" + a + "_" + o;
                        if (t.inputs.indexOf(u) >= 0) {
                            var l = ge(u);
                            if (i[e].text = val(l), l.getAttribute("required") && (!i[e].text || i[e].text.trim().length < 5)) return s.push({
                                elementToScroll: l,
                                id: e
                            }), !0
                        }
                    }
                if (0 === i[e].answer.length) return s.push({
                    elementToScroll: c[0],
                    id: e
                }), !0
            } else if ("textfield" == t.type || "textarea" == t.type) {
                var u = "survey_" + t.type + "_" + a,
                    l = ge(u);
                if (i[e] = {
                        text: val(l)
                    }, !i[e].text || i[e].text.trim().length < 2) return t.required && (r = !0, s.push({
                    elementToScroll: l,
                    id: e
                })), !0
            } else if ("doc" == t.type || "audio" == t.type) {
                i[e] = {
                    answer: []
                };
                var v = cur.addMedias[e].chosenMedias;
                if (each(v, function(t, s) {
                        i[e].answer.push(s[0] + ":" + s[1])
                    }), t.required && (!v || 0 == v.length)) {
                    r = !0;
                    var y = "survey_" + t.type + "_" + a + "_media";
                    s.push({
                        elementToScroll: ge(y),
                        id: e
                    })
                }
            }
        }.bind(this)), s.length && (r || !this.limit || n - s.length < this.limit)) {
        var a = s.find(function(e) {
            return e.elementToScroll
        });
        return a.elementToScroll.scrollIntoView({
            behavior: "smooth"
        }), s.reverse().forEach(function(e) {
            Surveys.notaBene("survey_block_" + e.id)
        }), void showHint(e, {
            dir: "left",
            shift: [-132, -15],
            width: "auto"
        })
    }
    each(geByClass("page_media_x_wrap"), function(e, t) {
        t.style.display = "none"
    }), each(geByClass("media_add"), function(e, t) {
        t.style.display = "none"
    }), each(geByClass("media_label"), function(e, t) {
        addClass(t, "disabled")
    }), each(geByClass("survey_block_wrap-media_audio"), function(e, t) {
        var i = geByClass1("dropbox", t);
        i && i.parentNode.removeChild(i)
    }), lockButton(e), ajax.post("al_surveys.php?act=save_answer", {
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
    radioButton: function(e, t, i, s) {
        if (!hasClass(e, "disabled")) {
            var r = Surveys.activeSurveys[i].state;
            r[s] || (r[s] = {}), radioBtns[i + "_" + s].val && (r[s][radioBtns[i + "_" + s].val] = !1), r[s][t] = !0, radiobtn(e, t, i + "_" + s), Surveys.activeSurveys[i].blocks[s].inputs.map(function(e) {
                return ge(e)
            }).forEach(function(e) {
                hide(e)
            });
            var n = "survey_edit_" + i + "_" + s + "_" + t,
                a = ge(n);
            a && show(n), Surveys.activeSurveys[i].stateChanged()
        }
    },
    checkbox: function(e, t, i, s, r) {
        if (!hasClass(e, "disabled")) {
            if (r > 0 && !isChecked(e)) {
                var n = geByClass("survey_select_" + i + "_" + s).reduce(function(e, t) {
                    return e + +isChecked(t)
                }, 0);
                if (n === r) return
            }
            if (checkbox(e, t), Surveys.activeSurveys[i].blocks[s].inputs.map(function(e) {
                    return ge(e)
                }).forEach(function(e) {
                    hide(e)
                }), isChecked(e)) {
                var a = "survey_edit_" + i + "_" + s + "_" + t,
                    o = ge(a);
                o && show(a)
            }
            var u = Surveys.activeSurveys[i].state;
            u[s] || (u[s] = {}), u[s][e.getAttribute("data-id")] = !!isChecked(e), Surveys.activeSurveys[i].stateChanged()
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