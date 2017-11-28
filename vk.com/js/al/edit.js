var Edit = {
    progressLine: '<div style="padding:18px 0px 19px 0px;text-align: center"><img valign="middle" src="/images/progress7.gif"></div>',
    checkSrc: "data:image/gif,GIF89a%10%00%10%00%91%00%00%DE%E6%EF%84%9C%B5%00%00%00%00%00%00%21%F9%04%09%00%00%02%00%2C%00%00%00%00%10%00%10%00%00%08D%00%05%08%1CH%B0%A0%C1%83%02%02%204%18%40%E1%C2%81%0D%1D%3E%8C%28%11%21E%00%04%2B%26%8C%08%00%23D%89%17%3D%7ET%18%92%21%C5%86%1D%0F%028%99R%E5J%94%22%5D%06h%F9%B0c%CC%9A%0Fs%16%0C%08%00",
    d2h: function(e) {
        return e.toString(16)
    },
    h2d: function(e) {
        return parseInt(e, 16)
    },
    countRealLen: function(e, t) {
        for (var r = {
                "&": 5,
                ",": 5,
                "<": 4,
                ">": 4,
                '"': 6,
                "\\n": t ? 1 : 4,
                "\\r": 0,
                "!": 5,
                "'": 5,
                $: 6,
                "\\\\": 6
            }, o = {
                1168: 1,
                1169: 1,
                8211: 1,
                8212: 1,
                8216: 1,
                8217: 1,
                8218: 1,
                8230: 1,
                8240: 1,
                8249: 1,
                8250: 1,
                8364: 1,
                8470: 1,
                8482: 1,
                65533: 1
            }, n = {
                1037: 1,
                1104: 1,
                1117: 1
            }, a = 0, i = 0, c = e.length; c > i; i++) {
            var d = r[e.charAt(i)],
                l = e.charCodeAt(i);
            a += void 0 !== d ? d : l >= 128 && (1025 > l || n[l] || l > 1119) && !o[l] && (8220 > l || l > 8222) && (8224 > l || l > 8226) ? ("&#" + l + ";").length : 1
        }
        return a
    },
    showAutoCorrect: function(e) {
        each(ge("auxFuncs").children, function(e, t) {
            t.style && !hasClass(t, "ed_autocorr_block") && toggle(t)
        }), show("autoCorrectLink"), ajax.post("/editdb", {
            act: "a_get_autocorrections",
            section: e
        }, {
            onDone: Edit.getAutoCorrectionsSuccess
        }), ge("autoCorrections").innerHTML = Edit.progressLine
    },
    getAutoCorrectionsSuccess: function(e, t, r) {
        Edit.loadAutocorrects(e), ge("autoCorrections").innerHTML = t, r && (ge("autocorrNum").innerHTML = r, ge("autocorr_num") && (ge("autocorr_num").value = r))
    },
    removeAutoCorrection: function(e, t) {
        ajax.post("/editdb", {
            act: "a_remove_autocorrection",
            cid: e,
            section: t
        }, {
            onDone: Edit.getAutoCorrectionsSuccess
        }), ge("autoCorrections").innerHTML = Edit.progressLine
    },
    addAutoCorrection: function(e) {
        var t = val("addCorrectionFrom"),
            r = val("addCorrectionTo");
        t ? (ajax.post("/editdb", {
            act: "a_add_autocorrection",
            section: e,
            from: t,
            to: r
        }, {
            onDone: Edit.getAutoCorrectionsSuccess
        }), ge("autoCorrections").innerHTML = Edit.progressLine) : notaBene("addCorrectionFrom")
    },
    updateObjectTime: function(e, t) {
        ajax.post("editdb", {
            act: "a_update_time",
            obj_id: e,
            obj_type: t,
            hash: val("object_time_" + t + "_" + e + "_hash")
        }, {
            onDone: function(r) {
                ge("edit_time_link_" + t + "_" + e).innerHTML = r
            }
        })
    },
    loadAutocorrects: function(e) {
        ajax.post("/editdb", {
            act: "a_autocorrection_list",
            section: e
        }, {
            onDone: function(t) {
                cur.autoCorrectCache[e] = {
                    loaded: 1,
                    corrections: t
                }
            }
        })
    },
    autoCorrect: function(e, t) {
        Edit.doAutoCorrect(t ? t : "name", cur.autoCorrectCache[e] ? cur.autoCorrectCache[e].corrections : {})
    },
    autoCorrectMul: function(e, t) {
        for (var r = Edit.getSelectedItems(t), o = 0; o < r.length; ++o) {
            var n = parseInt(r[o]);
            Edit.autoCorrect(e, "name" + n)
        }
    },
    doAutoCorrect: function(inp, corrections) {
        if (corrections) {
            var input = inp ? ge(inp) : ge("name");
            if (input) {
                var lines = val(input).split("\n");
                for (i = 0; i < corrections.length; i++) {
                    var correction = corrections[i],
                        from = correction.from.replace(/&#092;/g, "\\");
                    matches = from.match(/&#\d+;/g);
                    var replacements = [];
                    if (matches)
                        for (j = 0; j < matches.length; j++) {
                            var num = parseInt(matches[j].substring(2, matches[j].length - 1));
                            2 == Edit.d2h(num).length ? mid = "0" : mid = "", replacements[j] = {
                                num: num,
                                repl: eval("'\\u0" + mid + Edit.d2h(num) + "'")
                            }
                        }
                    for (j = 0; j < replacements.length; j++) from = from.replace("&#" + replacements[j].num.toString(10) + ";", replacements[j].repl);
                    from = from.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/, "&");
                    var replaceTo = correction.to,
                        matches = replaceTo.match(/&#\d+;/g);
                    if (replacements = [], matches)
                        for (j = 0; j < matches.length; j++) {
                            var num = parseInt(matches[j].substring(2, matches[j].length - 1));
                            2 == Edit.d2h(num).length ? mid = "0" : mid = "", replacements[j] = {
                                num: num,
                                repl: eval("'\\u0" + mid + Edit.d2h(num) + "'")
                            }
                        }
                    for (j = 0; j < replacements.length; j++) replaceTo = replaceTo.replace("&#" + replacements[j].num.toString(10) + ";", replacements[j].repl);
                    replaceTo = replaceTo.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/, "&");
                    try {
                        var replaceFrom = new RegExp(from, "g");
                        for (j = 0; j < lines.length; j++) lines[j] = lines[j].replace(replaceFrom, replaceTo)
                    } catch (e) {}
                }
                val(input, lines.join("\n")), input.scrollTop = input.scrollHeight
            }
        }
    },
    replaceText: function(e) {
        e || (e = "name");
        var t = e.split(",");
        for (i in t)
            if (e = t[i], e = ge(e)) {
                var r = e.value,
                    o = [];
                for (o = r.split("\n"), i = 0; i < o.length; i++) {
                    var n = new RegExp(ge("replaceFrom").value, "g");
                    o[i] = o[i].replace(n, ge("replaceTo").value)
                }
                text1 = o.join("\n"), e.value = text1, e.scrollTop = e.scrollHeight
            }
    },
    replaceTextMul: function(e) {
        for (var t = Edit.getSelectedItems(e), r = 0; r < t.length; ++r) {
            var o = parseInt(t[r]);
            Edit.replaceText("name" + o)
        }
    },
    translit: function(e) {
        if (e = ge(e)) {
            var t, r = e.value,
                o = r,
                n = ["yo", "zh", "h", "ts", "ch", "sch", "sch", "sh", "e", "yu", "ya", "Yo", "Zh", "H", "Ts", "Ch", "Sch", "Sch", "Sh", "E", "Yu", "Ya", "'"],
                a = ["�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�"];
            for (t = 0; t < a.length; t++) o = o.split(a[t]).join(n[t]);
            var i = "abvgdeziyklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY��",
                c = "������������������������������������������������";
            for (t = 0; t < c.length; t++) o = o.split(c.charAt(t)).join(i.charAt(t));
            e.value = o
        }
    },
    translitMul: function(e, t) {
        for (var r = Edit.getSelectedItems(t), o = 0; o < r.length; ++o) {
            var n = parseInt(r[o]);
            Edit.translit("name" + n)
        }
    },
    convertCaseAa: function(e, t) {
        if (!t) return topError("No input to convert specified", {
            dt: 6
        }), !1;
        var r = t.split(",");
        for (var o in r)
            if (t = r[o], t = ge(t)) {
                for (var n = val(t).split("\n"), a = [], i = 0; i < n.length; i++) {
                    var c = n[i];
                    if (c) {
                        var d = c.substring(0, 1).toUpperCase(),
                            l = c.substring(1);
                        a.push(d + l)
                    }
                }
                t.value = a.join("\n") + "\n", t.scrollTop = t.scrollHeight, Edit.autoCorrect(e, t)
            }
    },
    convertCaseAaMul: function(e, t) {
        for (var r = Edit.getSelectedItems(t), o = 0; o < r.length; ++o) {
            var n = parseInt(r[o]);
            Edit.convertCaseAa(e, "name" + n), Edit.convertCaseAa(e, "native_name" + n)
        }
    },
    convertCaseAaBb: function(e, t) {
        if (!t) return topError("No input to convert specified", {
            dt: 6
        }), !1;
        var r = t.split(",");
        for (var o in r) {
            t = ge(r[o]);
            for (var n = val(t).split("\n"), a = [], i = 0; i < n.length; i++) {
                var c = n[i];
                if (c) {
                    for (var d = "", l = 0; l < c.length; ++l) {
                        for (var s = " ", u = l - 1; u >= 0 && (s = c[u], "(" == s || '"' == s); --u);
                        d += " " == s || "." == s || '"' == s || "(" == s ? c[l].toUpperCase() : c[l].toLowerCase()
                    }
                    a.push(d)
                }
            }
            t.value = a.join("\n") + "\n", t.scrollTop = t.scrollHeight, Edit.autoCorrect(e, t)
        }
    },
    convertCaseAaBbMul: function(e, t) {
        for (var r = Edit.getSelectedItems(t), o = 0; o < r.length; ++o) {
            var n = parseInt(r[o]);
            Edit.convertCaseAaBb(e, "name" + n), Edit.convertCaseAaBb(e, "native_name" + n)
        }
    },
    convertCaseAabb: function(e, t) {
        if (!t) return topError("No input to convert specified", {
            dt: 6
        }), !1;
        var r = t.split(",");
        for (var o in r)
            if (t = r[o], t = ge(t)) {
                for (var n = val(t).split("\n"), a = [], i = 0; i < n.length; i++) curr_line = n[i], curr_line && (first_letter = curr_line.substring(0, 1), first_letter = first_letter.toUpperCase(), tail = curr_line.substring(1).toLowerCase(), a.push(first_letter + tail));
                t.value = a.join("\n") + "\n", t.scrollTop = t.scrollHeight, Edit.autoCorrect(e, t)
            }
    },
    convertCaseAabbMul: function(e, t) {
        for (var r = Edit.getSelectedItems(t), o = 0; o < r.length; ++o) {
            var n = parseInt(r[o]);
            Edit.convertCaseAabb(e, "name" + n), Edit.convertCaseAabb(e, "native_name" + n)
        }
    },
    addObjComment: function(e, t) {
        var r = "editdb",
            o = {
                act: "a_add_comment",
                obj_id: e,
                obj_type: t
            },
            n = showBox(r, o, {
                onDone: function() {
                    elfocus("obj_comment_" + t + "_" + e)
                }
            });
        n.removeButtons(), n.addButton(getLang("global_close"), null, "no");
        var a = function(a) {
                o.comment = val("obj_comment_" + t + "_" + e), o.do_add = 1, o.hash = val("obj_comment_" + t + "_" + e + "_hash"), ajax.post(r, o, {
                    showProgress: lockButton.pbind(a),
                    hideProgress: unlockButton.pbind(a),
                    onDone: function(r) {
                        ge("edit_add_comment_link_" + t + "_" + e).innerHTML = getLang("edit_add_comment_link") + (r ? "" : " +1"), n.hide()
                    }
                })
            },
            i = n.addButton(getLang("global_save"), a, "", !0);
        cur.addObjCommentBtnFunc = function() {
            a(i)
        }
    },
    genCorrectionControls_: function(e, t, r, o, n, a, i, c) {
        var d = '<div style="padding: 5px 2px;"><b>' + getLang("edit_case_word") + '</b></div><div>  <div class="flat_button secondary" onclick="' + t + '">' + getLang("edit_some_words1") + '</div>  <div class="flat_button secondary" onclick="' + r + '">' + getLang("edit_some_words2") + '</div>  <div class="flat_button secondary"  onclick="' + o + '">' + getLang("edit_some_words3") + '</div></div><div style="padding: 5px 2px;"><b>' + getLang("edit_replacement") + "</b></div><div style=\"padding: 5px 0;\">  <input id='replaceFrom' type='text' style='width:80px;' class='text dark' value='' placeholder='" + getLang("edit_replacement_what") + "'/> &rarr; <input id='replaceTo' type='text' style='width:80px;' class='text dark' value='' placeholder='" + getLang("edit_replacement_by") + '\' />  <div class="flat_button secondary" onclick="' + n + '">' + getLang("edit_replace") + '</div></div><div id="autoCorrectLink" style="padding: 5px 2px;" class="ed_autocorr_block"><a onclick=\'' + a + "'><b>" + getLang("edit_autoreplacements") + ' (<span id="autocorrNum">' + e + "</span>)</b></a></div>" + c + '<div id="autoCorrections" style="padding: 5px 7px; display: none;">' + getLang("edit_autoreplacements_list") + "</div>";
        return d += "<div style=\"padding: 5px 2px; border-style: none none none; display: none;\"><table cellpadding=5><tbody><tr><td><input id='addCorrectionFrom' type='text' style='width:180px;' value=''></td><td> &gt;&gt; </td><td><input id='addCorrectionTo' type='text' style='width:80px;' value=''></td><td><a href='javascript:" + i + "'>" + getLang("edit_add") + "</a></td>", d += "</tr></tbody></table></div>"
    },
    genCorrectionControls: function(e, t, r) {
        var o = '<div class="flat_button secondary" onclick="Edit.autoCorrect(' + e + ", " + t + ');">' + getLang("edit_do_autoreplace") + "</div>";
        return o += ' <div class="flat_button secondary" onclick="Edit.translit(' + t + ');">Translit</div>', Edit.genCorrectionControls_(r, "Edit.convertCaseAa(" + e + ", '" + t + "')", "Edit.convertCaseAaBb(" + e + ", '" + t + "')", "Edit.convertCaseAabb(" + e + ", '" + t + "')", "Edit.replaceText('" + t + "')", "Edit.showAutoCorrect(" + e + ")", "Edit.addAutoCorrection(" + e + ")", "<div>" + o + "</div>")
    },
    genCorrectionControlsMul: function(e, t, r) {
        var o = '<div class="flat_button secondary" onclick="Edit.autoCorrectMul(' + e + ", " + t + ');">' + getLang("edit_do_autoreplace") + "</div>";
        return o += ' <div class="flat_button secondary" onclick="Edit.translitMul(' + e + ", " + t + ')">Translit</div>', Edit.genCorrectionControls_(r, "Edit.convertCaseAaMul(" + e + ", " + t + ")", "Edit.convertCaseAaBbMul(" + e + ", " + t + ")", "Edit.convertCaseAabbMul(" + e + ", " + t + ")", "Edit.replaceTextMul(" + t + ")", "Edit.showAutoCorrect(" + e + ")", "Edit.addAutoCorrection(" + e + ")", "<div>" + o + "</div>")
    },
    initPageItems: function() {
        cur.filteredItems = cur.pageItems || [];
        for (var e in cur.pageItems) {
            var t = ge(cur.pageItems[e]);
            addEvent(t, "mousemove", function(e) {
                e.ctrlKey && Edit.selectItem(e.target.id, !0), e.shiftKey && Edit.selectItem(e.target.id, !1)
            })
        }
    },
    deinitPageItems: function() {
        for (var e in cur.pageItems) {
            var t = ge(cur.pageItems[e]);
            removeEvent(t, "mousemove")
        }
    },
    getDefaultListParams: function(e, t) {
        return {
            defaultItems: t,
            selectedItems: e,
            introText: "",
            maxItems: 2e4,
            showMax: 200,
            width: 400,
            height: 250,
            dropdown: !0
        }
    },
    getSelectedItems: function(e) {
        var t = [];
        for (var r in cur.selected) cur.selected[r] && t.push([parseInt(r.toString().replace(/[^\d]*/, "")), e(cur.selected[r])]);
        return t
    },
    getAllItems: function(e) {
        var t = [];
        for (var r in cur.pageItems) {
            var o = cur.pageItems[r];
            ge(o) && t.push([parseInt(o.toString().replace(/[^\d]*/, "")), e(ge(o))])
        }
        return t
    },
    getIdList: function(e) {
        var t = [];
        for (var r in e) t.push(e[r][0]);
        return t.join(",")
    },
    selectItem: function(e, t) {
        var r = cur.filteredItems,
            o = 0;
        if ("all" == e) {
            for (var n in r) {
                var e = r[n],
                    a = ge("check_" + e);
                if (checkbox(a, !cur.selectedAll), cur.selectedAll) cur.selected[e] = void 0;
                else {
                    ++o;
                    var i = ge(e);
                    cur.selected[e] = i
                }
            }
            cur.selectedAll = !cur.selectedAll
        } else {
            var i = ge(e),
                c = ge("check_" + e);
            if (!i || !c) return;
            var d = cur.selected[e];
            void 0 !== t && (d = !t), checkbox(c, !d), d ? cur.selected[e] = void 0 : (i = ge(e), cur.selected[e] = i), cur.selectedAll = !0;
            for (var n in r) "length" != n && (void 0 == cur.selected[r[n]] ? cur.selectedAll = !1 : ++o)
        }
        each(geByClass("checkboxall"), function(e, t) {
            checkbox(t, cur.selectedAll)
        }), val("select_counter", o ? getLang("edit_selected_objects", o, !1) : "");
        var l = ge("ed_head_title");
        addClass(l, "page_block_header_refresh"), removeClass(l, "page_block_header_refresh")
    },
    getMessageBox: function(e, t, r, o, n, a) {
        var i = new MessageBox({
                title: e,
                width: t
            }),
            c = function(e) {
                ("enter" == a && e.keyCode == KEY.RETURN || "ctrl-enter" == a && e.keyCode == KEY.RETURN && e.ctrlKey) && (d(), cancelEvent(e))
            },
            d = function() {
                n(), a && removeEvent(window, "keydown", c)
            },
            l = function() {
                i.hide(), a && removeEvent(window, "keydown", c)
            };
        return i.removeButtons(), i.addButton(o, l, "no"), i.addButton(r, d), a && addEvent(window, "keydown", c), i
    },
    hideBox: function() {
        var e = curBox();
        e && e.hide()
    },
    onEnter: function(e, t) {
        e && e.keyCode == KEY.ENTER && t && t()
    },
    addMessageBoxButtons: function(e, t, r) {
        return e.removeButtons(), e.addButton(getLang("global_cancel"), null, "no"), e.addButton(t, r, "ok", !0)
    },
    processSearchForm: function(e) {
        var t = ge(e),
            r = geByTag("input", t),
            o = {
                0: nav.objLoc[0]
            };
        each(r, function(e, t) {
            o[attr(t, "name")] = val(t)
        }), addClass(domPN(t), "ed_obj_search_loading"), nav.go(o)
    },
    _eof: 1
};
try {
    stManager.done("edit.js")
} catch (e) {}