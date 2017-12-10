var Helpdesk = {
    setSpeakLang: function(e, t) {
        var s = trim(val("helpdesk_user_speak_lang_comment"));
        return s ? void ajax.post("helpdesk", {
            act: "a_set_speak_lang",
            lang_id: cur.helpdeskSpeakLang.val(),
            comment: s,
            user_id: e,
            hash: t
        }, {
            progress: curBox().progress
        }) : notaBene("helpdesk_user_speak_lang_comment")
    },
    userSpeakLangBox: function(e, t) {
        showBox("helpdesk", {
            act: "speak_lang_box",
            user_id: e,
            hash: t
        }, {
            params: {
                width: 400
            }
        })
    },
    _show: function(content, script) {
        content && val("tickets_content", content), Helpdesk.onTicketScroll(), script && eval(script)
    },
    _getBookmarkGroupId: function(e) {
        return e && e.id ? e.id.replace("tickets_favorites_groups_tab_", "") : 0
    },
    onReorderBookmarks: function(e, t, s) {
        var a = Helpdesk._getBookmarkGroupId(e),
            o = Helpdesk._getBookmarkGroupId(t),
            r = Helpdesk._getBookmarkGroupId(s);
        ajax.post("/helpdesk", {
            act: "reorder_bookmarks",
            hash: cur.reorderHash,
            group_id: a,
            next_group_id: o,
            prev_group_id: r
        })
    },
    initBookmarksGroupsSorter: function() {
        if (isVisible("tickets_favorites")) {
            var e = ge("tickets_favorites_groups_list");
            e && (cur.helpdeskGroupsSort && cur.helpdeskGroupsSort.destroy(), cur.helpdeskGroupsSort = new GridSorter(e, "tickets_favorites_groups_tab", {
                onReorder: Helpdesk.onReorderBookmarks
            }))
        }
    },
    initBookmarks: function() {
        var e = ge("tickets_favorites");
        if (e) {
            Helpdesk.initBookmarksGroupsSorter();
            var t = geByClass("helpdesk_bookmark_row", "helpdesk_bookmarks"),
                s = JSON.parse(attr(e, "data-groups"));
            each(t, function(e, t) {
                var a = geByClass("helpdesk_m_table_dd_block", t)[0];
                t.groupsDD = new InlineDropdown(a, {
                    items: s,
                    withArrow: !0,
                    selected: attr(t, "data-group_id"),
                    onSelect: function(e) {
                        var s = t.id.replace("bookmark_ticket_", ""),
                            a = attr(t, "data-group_id");
                        if (-2 == e) return t.groupsDD.val(a), Helpdesk.editFavoritesGroup(0, s);
                        if (removeClass(t, "_group_" + a), addClass(t, "_group_" + e), attr(t, "data-group_id", e), cur.hashes && cur.hashes.favorite_hash) var o = cur.hashes.favorite_hash;
                        else var o = cur.favoriteHash;
                        var r = -1 == e ? 0 : 1;
                        0 == r && (re(t), e = 0, 0 == geByClass("helpdesk_bookmark_row", "helpdesk_bookmarks").length && show("helpdesk_no_bookmarks")), ajax.post("helpdesk", {
                            act: "favorite",
                            ticket_id: s,
                            add: r,
                            gid: e,
                            hash: o
                        })
                    }
                })
            }), cur.destroy.push(function() {
                removeEvent(document, "keydown", Helpdesk.editNoteKeydown), removeEvent(document, "mousedown", Helpdesk.editNoteMousedown), delete cur.noteEditTicketId
            })
        }
    },
    _hideNoteEditForm: function() {
        cur.noteEditTicketId && (hide("note_edit_form_" + cur.noteEditTicketId), cur.noteEditTicketId = 0)
    },
    _getBookmarkNoteText: function(e) {
        return JSON.parse(attr("helpdesk_note_" + e, "data-text"))
    },
    editNoteKeydown: function(e) {
        e.keyCode == KEY.ESC ? Helpdesk._hideNoteEditForm() : e.shiftKey || e.keyCode != KEY.ENTER && e.keyCode != KEY.RETURN || (cancelEvent(e), Helpdesk.editNoteSave())
    },
    editNoteMousedown: function(e) {
        for (var t = e.target; t.parentNode;) {
            if (t.id == "note_edit_form_" + cur.noteEditTicketId) return;
            t = t.parentNode
        }
        Helpdesk.editNoteSave()
    },
    openNoteForm: function(e, t) {
        cancelEvent(t);
        var s = ge("note_edit_form_" + e),
            a = ge("note_edit_form_input_" + e);
        if (s) {
            show(s), elfocus(a);
            var o = replaceEntities(Helpdesk._getBookmarkNoteText(e));
            o = o.replace(/(<br>|<br \/>|<br\/>)/g, "\n"), val(a, o), autosizeSetup(a, {
                minHeight: 50,
                maxHeight: 400
            }), window.tooltips && tooltips.destroyAll(), cur.noteEditTicketId = e, s.eventsInited || (s.eventsInited = !0, addEvent(document, "keydown", Helpdesk.editNoteKeydown), addEvent(document, "mousedown", Helpdesk.editNoteMousedown))
        }
    },
    editNoteSave: function() {
        if (!cur.helpdeskNoteSaveLoading) {
            var e = cur.noteEditTicketId,
                t = ge("note_edit_form_" + e);
            if (t) {
                var s = attr(t, "data-hash"),
                    a = val("note_edit_form_input_" + e).trim();
                ajax.post("/helpdesk", {
                    act: "a_save_bookmark_note",
                    ticket_id: e,
                    hash: s,
                    text: a
                }, {
                    showProgress: function() {
                        cur.helpdeskNoteSaveLoading = !0, showProgress("helpdesk_note_edit_form_progress_" + e)
                    },
                    hideProgress: function() {
                        cur.helpdeskNoteSaveLoading = !1, hideProgress("helpdesk_note_edit_form_progress_" + e)
                    },
                    onDone: function(t, s, o) {
                        var r = ge("helpdesk_note_" + e),
                            i = ge("helpdesk_note_edit_" + e);
                        r && (attr(r, "data-text", s), attr(r, "data-formated_text", o), toggle(r, a), toggle(i, !a)), Helpdesk._hideNoteEditForm()
                    }
                })
            }
        }
    },
    showBookmarkNoteTooltip: function(e, t) {
        var s = attr("helpdesk_note_" + t, "data-formated_text");
        s && (s = JSON.parse(s), showTooltip(e, {
            text: '<div id="helpdesk_boomkmark_note_text_ ' + t + '">' + s + "</div>",
            shift: [-19, 0, -20],
            forcetodown: 1,
            showdt: 300,
            hidedt: 300,
            hasover: 1,
            asrtl: !1,
            slideX: 15,
            dir: "left",
            className: "helpdesk_bookmark_note_tooltip",
            onHide: function() {
                val("helpdesk_boomkmark_note_text_ " + t, s)
            }
        }))
    },
    initSortDropdown: function(e) {
        cur.sortDD = new InlineDropdown("tickets_sorting_dropdown", {
            items: [
                ["user_response_time", getLang("support_sorting_creation")],
                ["", getLang("support_sorting_last_response")]
            ],
            withArrow: !0,
            selected: e,
            autoHide: 300,
            onSelect: function(e, t) {
                nav.setLoc(extend(nav.objLoc, {
                    sorting: e
                })), nav.go(nav.strLoc)
            }
        })
    },
    goTab: function(e, t) {
        return inArray(nav.objLoc.act || "", ["history", "all"]) && nav.objLoc.q && (e.href += "&q=" + encodeURIComponent(nav.objLoc.q)), uiTabs.goTab(e, t, !0)
    },
    switchSubTab: function(e, t, s) {
        return checkEvent(s) || hasClass(e, "active") ? !1 : (each(geByClass("tickets_subtab1", ge("tickets_subtabs")), function(e, t) {
            removeClass(t, "active")
        }), addClass(e, "active"), nav.go(t, s))
    },
    addBug: function(e) {
        var t = Helpdesk._getCheckedTicketsList();
        return !showBox("helpdesk", {
            act: "add_bug",
            hash: e,
            ticket_id: cur.ticket_id,
            tickets: t
        }, {
            params: {
                width: 620,
                bodyStyle: "padding: 0px"
            }
        })
    },
    addTemplate: function(e) {
        return !showBox("helpdesk", {
            act: "add_template",
            type: e,
            section: cur.selectedSection
        }, {
            params: {
                width: 630
            },
            dark: 1,
            cache: 1
        })
    },
    saveTemplate: function(tid, type) {
        if (!ge("add_template_title") || !ge("add_template_text")) return !1;
        var title = Emoji.val(geByClass1("_add_template_title_field" + tid)),
            titleText = trim(val("add_template_title_text")),
            text = trim(ge("add_template_text").value),
            anySectionChecked = isChecked("mobile_template") || isChecked("desktop_template") || isChecked("desktop_old_template") || isChecked("langs_template"),
            btn = ge("add_template_save");
        if (!title) return notaBene("add_template_title_wrap"), !1;
        if (!text) return notaBene("add_template_text"), !1;
        if (!anySectionChecked && isVisible("add_template_sections")) return notaBene("add_template_sections"), !1;
        var attachs = [],
            chosen = cur.ticketsTemplateMedia.chosenMedias;
        if (chosen)
            for (var i in chosen) {
                var att = chosen[i],
                    type = att[0],
                    value = att[1];
                ("photo" == type || "doc" == type) && attachs.push(type + "," + value)
            }
        var query = {
            act: "a_save_template",
            type: tid ? null : type,
            title: title,
            title_text: titleText,
            text: text,
            attachs: attachs,
            personal: isChecked("own_template"),
            mobile: isChecked("mobile_template"),
            desktop: isChecked("desktop_template"),
            langs: isChecked("langs_template"),
            by_default: isChecked("default_template"),
            hash: cur.hashes.template_hash,
            from_section: cur.selectedSection
        };
        tid && (query.template_id = tid);
        var box = curBox();
        return ajax.post("helpdesk", query, {
            showProgress: lockButton.bind(btn),
            hideProgress: unlockButton.bind(btn),
            onDone: function(title, type, links, script) {
                val("helpdesk_template_links", links), val("helpdesk_template_title", '<a onclick="Helpdesk.deselectTemplate(' + type + "," + tid + ');">' + title + "</a>"), script && eval(script), box.hide()
            },
            onFail: function() {
                box.hide()
            }
        }), !1
    },
    switchTemplates: function(section, sel) {
        var query = {
                act: "a_get_templates",
                section: section,
                hash: cur.hashes.template_hash
            },
            actions = geByClass("_templates_switch");
        return each(actions, function(e, t) {
            removeClass(t, "helpdesk_templates_switch_selected")
        }), addClass(sel, "helpdesk_templates_switch_selected"), cur.selectedSection = intval(section), ajax.post("helpdesk", query, {
            onDone: function(content, script) {
                val("helpdesk_template_links", content), script && eval(script)
            }
        }), !1
    },
    editTemplate: function() {
        return !showBox("helpdesk", {
            act: "edit_template",
            template_id: cur.selectedTemplate
        }, {
            params: {
                width: 630
            },
            dark: 1
        })
    },
    deleteTemplate: function(type) {
        if (!cur.selectedTemplate) return !1;
        var box = curBox();
        return box && box.isVisible() && box.hide({
            fasthide: 1
        }), box = showFastBox({
            title: getLang("support_delete_template_title"),
            width: 430,
            dark: 1
        }, getLang("support_delete_template_confirm"), getLang("global_delete"), function() {
            var tid = cur.selectedTemplate;
            Helpdesk.deselectTemplate(type, tid), ajax.post("helpdesk", {
                act: "delete_template",
                template_id: tid,
                hash: cur.hashes.template_hash,
                from_section: cur.selectedSection
            }, {
                progress: box.progress,
                onDone: function(content, script) {
                    val("helpdesk_template_links", content), script && eval(script), box.hide()
                },
                onFail: function() {
                    box.hide()
                }
            })
        }, getLang("global_cancel")), !1
    },
    selectTemplate: function(e) {
        var t = cur.templates[e];
        if (!t) return !1;
        t.type = parseInt(t.type.toString());
        var s, a = null,
            o = t.title_text;
        switch (t.type) {
            case 0:
                s = cur.editing ? ge("reply" + cur.editing + "edit") : ge("tickets_reply");
                break;
            case 1:
                o = getLang("helpdesk_title_from_support") + " " + t.title_text, a = ge("tickets_title"), s = ge("tickets_text")
        }
        null !== a && val(a, o);
        var r = s.scrollTop,
            i = 0,
            n = s.selectionStart || "0" == s.selectionStart ? "ff" : document.selection ? "ie" : !1,
            c = replaceEntities(t.text.replace(/<br>/g, "\n")) + "\n";
        if ("ie" == n) {
            s.focus();
            var d = document.selection.createRange();
            d.collapse(!0), d.moveStart("character", -s.value.length), i = d.text.length
        } else "ff" == n && (i = s.selectionStart);
        if (browser.chrome && (i += 1), i += c.length, "ie" == n) {
            s.focus();
            var d = document.selection.createRange();
            d.moveStart("character", -s.value.length), d.moveStart("character", i), d.moveEnd("character", 0), d.select()
        } else "ff" == n && (s.focus(), s.selectionStart = i, s.selectionEnd = i);
        var l = s.value.substring(0, i - c.length),
            _ = s.value.substring(i - c.length, s.value.length);
        if (s.value = l + c + _, s.scrollTop = r, s.autosize || autosizeSetup(s, {
                minHeight: 42,
                maxHeight: 100
            }), s.autosize.update(), "ie" == n) {
            var d = s.createTextRange();
            d.move("character", i), d.select()
        } else "ff" == n && (s.focus(), s.setSelectionRange(i, i));
        if (val("helpdesk_template_title", '<a onclick="Helpdesk.deselectTemplate(' + t.type + "," + e + ');">' + t.title + "</a>"), setStyle("edit_template", {
                display: vk.id == intval(t.author_id) || cur.canEditTemplates ? "inline-block" : "none"
            }), cur.selectedTemplate = e, t.attachs) {
            var u = cur.editing ? cur.ticketsEditMedia : cur.ticketsNewMedia;
            for (var h in t.attachs) u.chooseMedia(t.attachs[h][0], t.attachs[h][1], t.attachs[h][2])
        }
        return Helpdesk.focusOnCursor(s), cur.canUseDrafts && (clearTimeout(cur.saveDraftTO), Tickets.saveDraft(cur.ticket_id)), each(geByClass("helpdesk_template_selected", "helpdesk_template_links"), function(e, t) {
            removeClass(t, "helpdesk_template_selected")
        }), !1
    },
    saveTemplatesOrder: function(e) {
        var t = ge("helpdesk_template_links"),
            s = Array.from(domQuery(".helpdesk_template", t)).map(function(e) {
                return e.id.replace("template", "")
            });
        ajax.post("helpdesk", {
            act: "a_save_templates_order",
            type: e,
            from_section: cur.selectedSection,
            template_ids: s
        })
    },
    toggleMoveTemplatesMode: function() {
        if (cur.templatesSorter) {
            var e = ge("helpdesk_templates_move_mode_link");
            toggleClass(e, "on");
            var t = cur.templatesSorter.option("disabled");
            cur.templatesSorter.option("disabled", !t)
        }
    },
    focusOnCursor: function(e) {
        var t = val(e),
            s = t.indexOf("{cursor}"); - 1 != s && (t = t.replace("{cursor}", ""), val(e, t), setTimeout(elfocus.pbind(e, s), 0))
    },
    deselectTemplate: function(e, t) {
        var s, a = null,
            o = "",
            r = getLang("support_templates");
        switch (e) {
            case 0:
                s = ge("tickets_reply");
                break;
            case 1:
                o = getLang("helpdesk_title_from_support") + " ", a = ge("tickets_title"), s = ge("tickets_text"), r = getLang("helpdesk_tickets_templates")
        }
        var i = cur.templates[t] ? cur.templates[t].text.replace(/<br>/g, "\n") : "";
        return cur.templates[t] && trim(val(s)) == trim(replaceEntities(i)) && (val(s, ""), 0 == e && autosizeSetup("tickets_reply", {
            minHeight: 42,
            maxHeight: 100
        })), a && val(a, o), val("helpdesk_template_title", r), hide("edit_template"), delete cur.selectedTemplate, !1
    },
    clearCommentsFlood: function(e, t, s) {
        hide("tickets_flood_msg"), ajax.post("helpdesk", {
            act: "clear_flood",
            mid: e,
            section: t,
            hash: s
        })
    },
    getNewTicket: function(e, t) {
        ajax.post("helpdesk", {
            act: "get_ticket",
            hash: t
        }, {
            onDone: function(e) {
                var t = se(e[0]);
                if (domReplaceEl(ge(t.id), t), e[1]) {
                    var s = se(e[1]);
                    domReplaceEl(ge(s.id), s)
                } else re("helpdesk_m_list_get_ticket")
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    getNextTicket: function() {
        ajax.post("helpdesk", {
            act: "get_next",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.next_hash
        })
    },
    delegateAllTickets: function(e, t, s) {
        return ajax.post("helpdesk", {
            act: "stop_working",
            id: e,
            hash: t
        }, {
            onDone: Helpdesk._show,
            showProgress: addClass.pbind(s, "tickets_delegate_btn_process"),
            hideProgress: removeClass.pbind(s, "tickets_delegate_btn_process")
        }), !1
    },
    showCommentReplies: function(e) {
        return showBox("helpdesk", {
            act: "replies_box",
            reply_id: e
        }, {
            params: {
                width: "727px",
                hideButtons: !0,
                bodyStyle: "padding: 0px; border: 0px;"
            }
        }), !1
    },
    recountReplyComments: function(e) {
        var t = ge("helpdesk_reply_cmt" + e);
        t && ajax.post("helpdesk", {
            act: "a_recount_reply_comments",
            rid: e
        }, {
            onDone: function(e) {
                if (e) {
                    var s = se(e);
                    s && domReplaceEl(t, s)
                }
            }
        })
    },
    showMemberCardCommentsTT: function(e, t, s, a) {
        showTooltip(e, {
            url: "meminfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            dir: "top",
            center: a,
            slide: 15,
            shift: [a ? 0 : 20, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200
        })
    },
    showGroupCardCommentsTT: function(e, t, s, a) {
        showTooltip(e, {
            url: "groupinfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            dir: "top",
            center: a,
            slide: 15,
            shift: [a ? 0 : 20, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200
        })
    },
    passTo: function(e, t, s) {
        var a = cur.pass_warnings && cur.pass_warnings[t] || cur.pass_warnings[0],
            o = {
                msg: a,
                sure_pass: getLang("support_sure_pass").replace("{section}", val(e)),
                avg_time: "",
                section: t,
                pass_to_comment: cur.support_pass_comment,
                send_payform: ""
            };
        cur.cat_average_times && intval(cur.cat_average_times[t]) > 0 && (o.avg_time = getTemplate("passToBoxAvgTime", {
            avg_time: cur.cat_average_times[t]
        })), 16 != t && 17 != t && 18 != t || cur.isMobileTicket || (o.send_payform = '<div class="checkbox' + (cur.sendPayFormDefault ? " on" : "") + '" id="support_send_payform" onclick="checkbox(this);">' + getLang("support_send_form_to_user") + "</div>");
        var r = getTemplate("passToBox", o),
            i = showFastBox({
                title: getLang("support_pass_title"),
                width: 575
            }, r, getLang("support_do_pass"), function() {
                Helpdesk.doPass(t, val("tickets_pass_comm"), i)
            }, getLang("global_cancel"));
        (1 == s || 16 == t || 17 == t || 18 == t || 20 == t || 23 == t || 25 == t) && (checkbox("support_dont_pass_autoanswer", !0), toggle("helpdesk_pt_answer_wrap", !1)), cur.helpdeskPassToCategoryId = t;
        var n = cur.passToLangKeys && cur.passToLangKeys[t] ? cur.passToLangKeys[t] : "";
        "" != n && val("tickets_send_autoanswer", n), hide("tis_add_lnk_auto"), autosizeSetup("tickets_pass_comm", {
            minHeight: 80,
            maxHeight: 200
        }), autosizeSetup("tickets_send_autoanswer", {
            minHeight: 60,
            maxHeight: 500
        }), elfocus("tickets_pass_comm")
    },
    showPassBox: function() {
        var e = Helpdesk._getCheckedTicketsList();
        return !showBox("helpdesk", {
            act: "show_pass_box",
            tickets: e
        }, {
            params: {
                width: "520px",
                bodyStyle: "padding: 0px"
            }
        })
    },
    _getCheckedTicketsList: function() {
        var e = [];
        return "all" == nav.objLoc.act && cur.checkedTickets ? (each(cur.checkedTickets, function(t, s) {
            e.push(t)
        }), e) : !1
    },
    doPass: function(e, t, s) {
        var a = s ? "pass" : "pass_back",
            o = {
                act: a,
                ticket_id: cur.ticket_id,
                to: e,
                comm: t,
                hash: cur.hashes.next_hash
            };
        if (ge("support_send_payform") && (o.send_pay_form = isChecked("support_send_payform") ? 1 : 0), s && ge("support_dont_pass_autoanswer") && !isChecked("support_dont_pass_autoanswer")) {
            o.autoanswer = val("tickets_send_autoanswer");
            var r = ge("helpdesk_autoanswer_other_langs");
            if (r) {
                var i = geByClass("tickets_send_autoanswer", r);
                each(i, function(e, t) {
                    var s = attr(t, "data-lang_id"),
                        a = val(t);
                    o["autoanswer_" + s] = a
                })
            }
        }
        var n = Helpdesk._getCheckedTicketsList();
        return n && (o.tickets = n, o.act = "pass"), ajax.post("helpdesk", o, {
            showProgress: function() {
                s ? s.showProgress() : Helpdesk.showTicketProgress()
            },
            hideProgress: function() {
                s ? s.hideProgress() : Helpdesk.hideTicketProgress()
            },
            onDone: function(e, t) {
                s && boxQueue.hideAll(), Helpdesk._show(e, t)
            }
        }), !1
    },
    sortModerStats: function(e, t) {
        if ("stats" != cur.section && "spec_stats" != cur.section && "ento_stats" != cur.section) return !1;
        if ("rate" == t) switch (cur.sort) {
            case "sum_rate":
                t = "plus_rate";
                break;
            case "plus_rate":
                t = "minus_rate";
                break;
            default:
                t = "sum_rate"
        }
        return t != cur.sort && (each(geByClass("table_header_upper_span", e.parentNode), function(e, t) {
            removeClass(t, "sorted")
        }), addClass(geByClass1("table_header_upper_span", e), "sorted"), nav.go("/helpdesk?act=" + nav.objLoc.act + "&sort=" + t)), !1
    },
    toggleAddBugRow: function(e, t, s) {
        if (s.target || (s.target = s.srcElement || document), "a" == s.target.tagName.toLowerCase()) return !0;
        var a = isVisible("tickets_add_bug_short_text" + e);
        return toggle("tickets_add_bug_short_text" + e, !a), toggle("tickets_add_bug_full_text" + e, a), toggleClass(t, "detailed", a), !1
    },
    toggleAddBugForm: function() {
        toggle("add_bug_search"), toggle("add_bug_form");
        var e = curBox();
        return isVisible(ge("add_bug_form")) ? (val("title", val("add_bug_search_input")), cur.sectionEditFilter.updateInput(), e.removeButtons(), e.addButton(getLang("global_close"), e.hide, "no"), e.addButton(getLang("global_save"), Helpdesk.saveBug, "yes"), e.setControlsText('<a onclick="return Helpdesk.toggleAddBugForm();">' + getLang("global_cancel") + "</a>"), autosizeSetup(geByClass1("text", "add_bug_description"), {
            maxHeight: 500
        })) : (e.removeButtons(), e.addButton(getLang("global_close"), e.hide, "yes"), e.setControlsText("")), !1
    },
    toggleAutoanswerBlock: function(e) {
        checkbox(e), toggle("support_sure_bind", !isChecked(e))
    },
    toggleAutoanswerLangBlock: function(e, t) {
        cancelEvent(e);
        var s = ge("helpdesk_autoanswer_form_lang_" + t),
            a = ge("tickets_send_autoanswer_lang_" + t),
            o = attr(s, "data-langs_list"),
            r = !1;
        if (o && (r = JSON.parse(o)), cur.helpdeskPassToCategoryId && r && r[cur.helpdeskPassToCategoryId]) {
            var i = replaceEntities(r[cur.helpdeskPassToCategoryId]);
            val(a, i)
        }
        toggle(s), s.isInited || (autosizeSetup(a, {
            minHeight: 60,
            maxHeight: 500
        }), s.isInited = !0)
    },
    saveBug: function() {
        var e = trim(val("title"));
        if (!e) return notaBene("title"), !1;
        if (!cur.sectionEditFilter.val()) return notaBene(cur.sectionEditFilter.selector), notaBene(cur.sectionEditFilter.input), !1;
        var t = trim(val("desc"));
        if (!t) return notaBene("desc"), !1;
        var s = function() {
            var s = {
                    act: "save_bug",
                    hash: cur.hashes.save_bug_hash,
                    ticket_id: cur.ticket_id,
                    title: e,
                    desc: t,
                    browser: val("browser"),
                    sections: cur.sectionEditFilter.val()
                },
                a = Helpdesk._getCheckedTicketsList();
            a && (s.tickets = a), ge("tickets_closed_autoanswer_addressing_m") && (s.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (s.addressing_f = val("tickets_closed_autoanswer_addressing_f")), s.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, s.answer_text = val("tickets_send_autoanswer");
            var o = ge("helpdesk_autoanswer_other_langs");
            if (o) {
                var r = geByClass("tickets_send_autoanswer", o);
                each(r, function(e, t) {
                    var a = attr(t, "data-lang_id"),
                        o = val(t),
                        r = ge("tickets_closed_autoanswer_addressing_m" + a),
                        i = ge("tickets_closed_autoanswer_addressing_f" + a);
                    s["answer_text_" + a] = o, r && (s["addressing_m_" + a] = val(r)), i && (s["addressing_f_" + a] = val(i))
                })
            }
            var i = [],
                n = cur.ticketsAutoMedia.chosenMedias;
            return n && each(n, function(e, t) {
                var s = t[0],
                    a = t[1];
                ("photo" == s || "doc" == s) && i.push(s + "," + a)
            }), i.length && (s.attachs = i), ajax.post("helpdesk", s, {
                cache: 1,
                onDone: Helpdesk._show,
                onFail: function() {
                    boxQueue.hideAll()
                }
            }), !0
        };
        return showFastBox({
            title: getLang("support_binding_title"),
            width: 430,
            bodyStyle: "line-height: 160%;"
        }, cur.sure_bind, getLang("support_do_bind"), function() {
            s() && curBox() && (curBox().content('<div style="height:100px; background: url(/images/progress7.gif) 50% 50% no-repeat;"></div>'), curBox().setOptions({
                bodyStyle: "padding: 0px;"
            }))
        }, getLang("global_cancel")), cur.ticketsAutoMedia = Tickets.initAddMedia(domFC("tis_add_lnk_auto"), "tis_preview_auto", cur.mediaTypes, {
            limit: 5,
            oneClick: cur.oneClickUpload,
            photoCallback: Helpdesk.addAutoReplyScreenShot,
            target: "auto"
        }), autosizeSetup("tickets_send_autoanswer", {
            maxHeight: 500
        }), !1
    },
    addAutoReplyScreenShot: function() {
        showBox("helpdesk", {
            act: "choose_photo_box",
            to_id: 100,
            section: cur.selectedSection
        }, {
            params: {
                bodyStyle: "padding: 0px",
                title: !0
            },
            cache: 1,
            onFail: function() {
                return Tickets.showAddScreenBox(Tickets.initPhotoUpload.pbind("tis_add_data", {
                    hideOnStart: !0,
                    target: "auto",
                    uploadData: cur.autoUploadData
                })), !0
            }
        })
    },
    bindTicket: function(e, t) {
        var s = function(e, t) {
                var s = {
                        act: "bind_ticket",
                        bug_id: e,
                        ticket_id: cur.ticket_id,
                        hash: t
                    },
                    a = [],
                    o = cur.ticketsAutoMedia.chosenMedias;
                o && each(o, function(e, t) {
                    var s = t[0],
                        o = t[1];
                    ("photo" == s || "doc" == s) && a.push(s + "," + o)
                }), a && (s.attachs = a);
                var r = Helpdesk._getCheckedTicketsList();
                if (r && (s.tickets = r), ge("support_ignore_autoanswer") && ge("tickets_send_autoanswer")) {
                    s.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, s.answer_text = val("tickets_send_autoanswer");
                    var i = ge("helpdesk_autoanswer_other_langs");
                    if (i) {
                        var n = geByClass("tickets_send_autoanswer", i);
                        each(n, function(e, t) {
                            var a = attr(t, "data-lang_id"),
                                o = ge("tickets_closed_autoanswer_addressing_m" + a),
                                r = ge("tickets_closed_autoanswer_addressing_f" + a);
                            s["answer_text_" + a] = val(t), o && (s["addressing_m_" + a] = val(o)), r && (s["addressing_f_" + a] = val(r))
                        })
                    }
                    ge("tickets_closed_autoanswer_addressing_m") && (s.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (s.addressing_f = val("tickets_closed_autoanswer_addressing_f")), ajax.post("helpdesk", s, {
                        cache: 1,
                        onDone: Helpdesk._show,
                        onFail: function() {
                            boxQueue.hideAll()
                        }
                    })
                }
            },
            a = cur.sure_bind;
        cur.helpdeskAddBugLangAutoanswers && (a = a.replace('<span id="helodesk_add_bug_lang_autoanswer"></span>', cur.helpdeskAddBugLangAutoanswers));
        var o = showFastBox({
            title: getLang("support_binding_title"),
            width: 530,
            bodyStyle: "line-height: 160%;"
        }, a, getLang("support_do_bind"), function() {
            s(e, t), o.hide(), curBox() && curBox().content('<div style="height:100px; background: url(/images/progress7.gif) 50% 50% no-repeat;"></div>')
        }, getLang("global_cancel"));
        return autosizeSetup("tickets_send_autoanswer", {
            minHeight: 60,
            maxHeight: 500
        }), cur.ticketsAutoMedia = Tickets.initAddMedia(ge("tis_add_lnk_auto").firstChild, "tis_preview_auto", cur.mediaTypes, {
            limit: 5,
            oneClick: cur.oneClickUpload,
            photoCallback: Helpdesk.addAutoReplyScreenShot,
            target: "auto"
        }), !1
    },
    unbindTicket: function(e, t, s) {
        var a = function() {
                var a = cur.unbindBox;
                ajax.post("helpdesk", {
                    act: "unbind_ticket",
                    ticket_id: cur.ticket_id,
                    bug_id: e,
                    hash: t
                }, {
                    cache: 1,
                    onDone: function() {
                        slideUp(s, 200, re.pbind(s)), a.hide()
                    },
                    showProgress: a.showProgress,
                    hideProgress: a.hideProgress
                })
            },
            o = function(e) {
                return e.keyCode == KEY.ENTER && __bq.count() ? (a(), !1) : void 0
            };
        browser.mobile || addEvent(document, "keydown", o), cur.unbindBox = showFastBox({
            title: getLang("support_delete_bind"),
            width: 430,
            onHide: function() {
                removeEvent(document, "keydown", o)
            }
        }, getLang("support_delete_text").replace("{title}", cur.bug_link || ""), getLang("support_delete"), a, getLang("global_cancel"))
    },
    rowActive: function(e, t) {
        showTooltip(e, {
            text: t,
            showdt: 200,
            dir: "bottom",
            center: 1,
            typeClass: "tt_black"
        })
    },
    switchModersSubTab: function(e, t, s, a, o, r) {
        return hasClass(e, "active") ? !1 : (each(geByClass("tickets_subtab1", e.parentNode), function(e, t) {
            removeClass(t, "active")
        }), addClass(e, "active"), Helpdesk.updateModerStats(t, s, a, 0, r))
    },
    showModerStats: function(id, hash) {
        var cont = ge("support_moders_stats" + id),
            row = ge("support_moder_stats_row" + id),
            data = ge("support_moder_stats_data" + id);
        return cont ? (isVisible(data) ? removeClass(row, "detailed") : addClass(row, "detailed"), slideToggle(data, 200)) : (addClass(row, "detailed"), slideToggle(data, 200), ajax.post("helpdesk", {
            act: "moder_stats",
            mid: id,
            hash: hash
        }, {
            onDone: function(res, script) {
                val(data, res), script && eval(script)
            }
        })), !1
    },
    showSpecAgentStats: function(id, hash) {
        var cont = ge("support_moders_stats" + id),
            row = ge("support_moder_stats_row" + id),
            data = ge("support_moder_stats_data" + id);
        return cont ? (isVisible(data) ? removeClass(row, "detailed") : addClass(row, "detailed"), slideToggle(data, 200)) : (addClass(row, "detailed"), slideToggle(data, 200), ajax.post("helpdesk", {
            act: "spec_agent_stats",
            mid: id,
            hash: hash
        }, {
            onDone: function(res, script) {
                val(data, res), script && eval(script)
            }
        })), !1
    },
    statsRowOver: function(e, t) {
        addClass(e, "over");
        var s = t ? e.nextSibling && e.nextSibling.nextSibling : e.nextSibling;
        s && addClass(s, "after_over")
    },
    statsRowOut: function(e, t) {
        removeClass(e, "over");
        var s = t ? e.nextSibling && e.nextSibling.nextSibling : e.nextSibling;
        s && removeClass(s, "after_over")
    },
    updateModerStats: function(e, t, s, a, o) {
        return 0 > a ? !1 : (ge("support_moders_period_stats" + e).innerHTML = '<div class="tickets_detailed_loading"><div>', ajax.post("helpdesk", {
            act: "detailed_stats",
            mid: e,
            type: s,
            offset: a,
            hash: t,
            is_spec: o
        }, {
            cache: 1,
            onDone: function(t, s) {
                val("support_moders_period_stats" + e, t), val("moder_subtabs" + e, s)
            },
            onFail: function() {
                val("support_moders_period_stats" + e, "")
            }
        }), !1)
    },
    subscribeToTag: function(e, t) {
        ajax.post("helpdesk", {
            act: "a_subscribe_to_tag",
            tag: e,
            hash: t
        }, {
            cache: 1,
            onDone: function(t) {
                val("agent_tag" + e + "_subscribe", t), addClass("support_moder_stats_row" + e, "my")
            }
        })
    },
    unsubscribeFromTag: function(e, t) {
        ajax.post("helpdesk", {
            act: "a_unsubscribe_from_tag",
            tag: e,
            hash: t
        }, {
            cache: 1,
            onDone: function(t) {
                val("agent_tag" + e + "_subscribe", t), removeClass("support_moder_stats_row" + e, "my")
            }
        })
    },
    onFavoriteChanged: function(e, t) {
        ge("tickets_header_links_movefav");
        return toggle("tickets_bookmarks_icon", !e), toggle("tickets_bookmarks_menu", e), window.tooltips && tooltips.destroyAll(), e && (each(geByClass("_movefav", "tickets_bookmarks_menu"), function(e, t) {
            removeClass(t, "tickets_header_links_fav_selected")
        }), addClass("tickets_header_links_movefav_" + t, "tickets_header_links_fav_selected")), ajax.post("helpdesk", {
            act: "favorite",
            ticket_id: cur.ticket_id,
            add: e ? 1 : 0,
            gid: t ? t : 0,
            hash: cur.hashes.favorite_hash
        }), !1
    },
    onThanksChanged: function(e) {
        return toggle("tickets_header_links_enable_thanks", e), toggle("tickets_header_links_disable_thanks", !e), ajax.post("helpdesk", {
            act: "thanks_mod",
            ticket_id: cur.ticket_id,
            disable: e ? 1 : 0,
            hash: cur.hashes.thanks_hash
        }), !1
    },
    showTicketProgress: function() {
        addClass("tickets_header_info", "tickets_header_info_progress")
    },
    hideTicketProgress: function() {
        removeClass("tickets_header_info", "tickets_header_info_progress")
    },
    searchAdd: function(e) {
        e && " " == e[e.length - 1] && (e[e.length - 1] = "_");
        var t = ge("add_bug_search_input");
        ajax.post("helpdesk?act=a_get_bugs", {
            q: e
        }, {
            cache: 1,
            showProgress: uiSearch.showProgress.pbind(t),
            hideProgress: uiSearch.hideProgress.pbind(t),
            onDone: function(e, t) {
                var s = ge("tickets_add_list");
                e && (val(s, ""), each(sech(e), function(e, t) {
                    s.appendChild(t)
                })), val("tickets_add_button", t)
            }
        })
    },
    enterAddBugSearch: function(e, t) {
        clearTimeout(cur.addTimeout), t != cur.searchStr && (cur.searchStr = t, Helpdesk.searchAdd(cur.searchStr))
    },
    changeAddBugSearch: function(e) {
        clearTimeout(cur.addTimeout), cur.addTimeout = setTimeout(function() {
            e != cur.searchStr && (cur.searchStr = e, clearTimeout(cur.searchAddTimeout), cur.searchAddTimeout = setTimeout(function() {
                Helpdesk.searchAdd(cur.searchStr)
            }.bind(this), 300), scrollToTop())
        }.bind(this), 10)
    },
    getSearchParams: function(e) {
        var t = {
            q: trim(e)
        };
        switch (nav.objLoc.act) {
            case "show":
                t.act = "get_similar", t.ticket_id = cur.ticket_id;
                break;
            case "all":
                t.act = "all", nav.objLoc.faq_id && (t.faq_id = nav.objLoc.faq_id);
                var s = (window.radioBtns.filters || {}).val;
                if (t.good = 1 == s ? 1 : "", t.opened = 2 == s ? 1 : "", t.from_support = 3 == s ? 1 : "", t.has_replies = 4 == s ? 1 : "", t.search = 1, ge("tickets_extra_options") && t.opened) {
                    t.download = isChecked("tickets_download_checkbox"), t.no_category = isChecked("tickets_no_category_checkbox"), t.photo_server = ge("tickets_photo").value, t.id100 = ge("tickets_id").value, t.id1000 = ge("tickets_id1000").value, t.nospam_pid = ge("tickets_nospam_pid").value, t.cdn = ge("tickets_cdn").value;
                    var a = intval(cur.searchMobile.val());
                    a && (t.mobile = a);
                    var o = cur.searchBrowser.val();
                    o && "0" != o && (t.browser = -1 == o ? cur.searchBrowser.curTerm : o);
                    var r = intval(cur.searchTutorial.val());
                    r && (t.tutorial = r);
                    var i = intval(cur.searchSource.val());
                    i && (t.source = i), isChecked("tickets_time_checkbox") && (t.time_from = val("search_start_date"), t.time_to = val("search_end_date"))
                }
                break;
            case "history":
                t.act = "get_answers", t.mid = nav.objLoc.mid
        }
        return t
    },
    sameParams: function(e) {
        if (!cur.params) return !1;
        for (var t in e)
            if (e[t] != cur.params[t]) return !1;
        for (var t in cur.params)
            if (e[t] != cur.params[t]) return !1;
        return !0
    },
    enterAllSearch: function() {
        Helpdesk.updateAllSearch(!0)
    },
    changeAllSearch: function() {
        Helpdesk.updateAllSearch(!1)
    },
    updateAllSearch: function(e) {
        clearTimeout(cur.faqTimeout), cur.faqTimeout = setTimeout(function() {
            var t = Helpdesk.getSearchParams(val("show" == nav.objLoc.act ? "similar_search" : "all_search"));
            !e || Helpdesk.sameParams(t) && !cur.ignoreEqual || (delete cur.ignoreEqual, cur.params = t, cur.searchStr = t.q, Helpdesk.searchAll(cur.searchStr)), "show" != nav.objLoc.act && scrollToTop()
        }.bind(this), 10)
    },
    searchAll: function() {
        var searchEl = "show" == nav.objLoc.act ? "similar_search" : "all_search",
            query = cur.params || Helpdesk.getSearchParams(val(searchEl));
        switch (nav.objLoc.act) {
            case "show":
                addClass(ge("similar_search_bar"), "similar_loading");
                break;
            case "all":
                cur.checkedTickets = {};
                break;
            case "history":
                query.q ? (show("tickets_history_tabs__search"), uiTabs.switchTab(geByClass1("ui_tab", "tickets_history_tabs__search"))) : (uiTabs.switchTab(geByClass1("ui_tab", "tickets_history_tabs__all"), {
                    noAnim: 1
                }), hide("tickets_history_tabs__search"))
        }
        var options = {
            cache: 1,
            onDone: function(cont, script) {
                switch (nav.objLoc.act) {
                    case "show":
                        val("similar_rows", cont), removeClass(ge("similar_search_bar"), "similar_loading"), script && eval(script), toggle("tickets_toup", cur.similarCount > 10), each(cur.checkedTickets, function(e, t) {
                            if (ge("tickets_similar_row" + e)) {
                                var s = geByClass1("tickets_check", ge("tickets_similar_row" + e));
                                checkbox(domFC(s), !0)
                            }
                        }), isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
                            height: "0px"
                        }), setStyle(ge("tickets_toup"), {
                            height: getSize(ge("tickets_similar"))[1]
                        }));
                        break;
                    case "all":
                        val("tickets_all", cont), script && eval(script), delete nav.objLoc.offset, each(["q", "good", "opened", "download", "from_support", "photo_server", "id100", "nospam_pid", "time_from", "time_to", "mobile", "browser", "id1000", "cdn", "no_category", "tutorial", "source", "has_replies"], function(e, t) {
                            query[t] ? nav.objLoc[t] = query[t] : delete nav.objLoc[t]
                        }), nav.setLoc(nav.objLoc);
                        break;
                    case "history":
                        delete nav.objLoc.offset, delete nav.objLoc.section, ge("tickets_replies").innerHTML = cont, query.q ? nav.objLoc.q = query.q : delete nav.objLoc.q, nav.setLoc(nav.objLoc)
                }
            }
        };
        "all_search" === searchEl && extend(options, {
            showProgress: uiSearch.showProgress.pbind("all_search"),
            hideProgress: uiSearch.hideProgress.pbind("all_search")
        }), ajax.post("helpdesk", query, options)
    },
    restoreDraft: function(e) {
        var t = ge("tickets_reply"),
            s = ls.get("helpdesk_draft" + vk.id + "_" + e) || {},
            a = s.txt || "";
        if (!browser.mobile && t && !t.disabled && cur.canUseDrafts && (a || s.medias) && cur.ticket_id == e && (val(t).length < a.length && (val(t, a), t.autosize.update()), (s.medias || []).length && !((cur.ticketsNewMedia || {}).chosenMedias || []).length)) {
            var o = [];
            for (var r in s.medias) s.medias[r] && o.push(s.medias[r].slice(0, 2).join(","));
            ajax.post("helpdesk", {
                act: "draft_medias",
                attachs: o
            }, {
                onDone: function(e) {
                    (e || []).length && each(e, function() {
                        cur.ticketsNewMedia.chooseMedia.apply(cur.ticketsNewMedia, this)
                    })
                }
            })
        }
    },
    uncheckTickets: function() {
        each(cur.checkedTickets, function(e, t) {
            delete cur.checkedTickets[e]
        }), each(geByClass("tickets_check", ge("tickets_checked")), function(e, t) {
            checkbox(geByClass1("checkbox", t), !1)
        }), checkbox(geByClass1("checkbox", "tickets_all_check"), !1);
        var e = ge("tickets_all_search"),
            t = ge("tickets_all_selected");
        isVisible(e) || slideDown(e, 200), isVisible(t) && slideUp(t, 200)
    },
    toggleSimilar: function(e) {
        toggle("tickets_similar", !isVisible("tickets_similar"));
        var t = ge("toggle_similar_link");
        return toggleClass(t, "opened", isVisible("tickets_similar")), isVisible("tickets_similar") ? (t.innerHTML = getLang("support_hide_similar"), ge("similar_search") && cur.searchDD.updateInput(), cur.similarCount < 10 ? hide("tickets_toup") : isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
            height: "0px"
        }), setStyle(ge("tickets_toup"), {
            height: getSize(ge("tickets_similar"))[1]
        }))) : t.innerHTML = cur.similarCount ? getLang("support_show_similar", cur.similarCount) : getLang("support_search_similar"), e && scrollToTop(0), !1
    },
    toggleSimilarRows: function(e) {
        var t = attr(e, "toggle-text"),
            s = val(e),
            a = !attr(e, "toggle-value");
        return attr(e, "toggle-value", a ? "1" : ""), val(e, t), attr(e, "toggle-text", s), each(geByClass("similar_row_wrap", "similar_rows"), function(e, t) {
            Helpdesk.doToggleSimilarRow(t, a)
        }), !1
    },
    toggleSimilarRow: function(e, t) {
        return t.target || (t.target = t.srcElement || document), "a" == t.target.tagName.toLowerCase() ? !0 : (Helpdesk.doToggleSimilarRow(e, !hasClass(e, "detailed")), isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
            height: "0px"
        }), setStyle(ge("tickets_toup"), {
            height: getSize(ge("tickets_similar"))[1]
        })), !1)
    },
    doToggleSimilarRow: function(e, t) {
        toggle(geByClass1("_tickets_similar_short_text", e), !t), toggle(geByClass1("_tickets_similar_full_text", e), t), toggleClass(e, "detailed", t)
    },
    onSubmitSettingsChanged: function(e) {
        ajax.post("helpdesk", {
            act: "save_submit",
            value: e ? 1 : 0,
            hash: cur.hashes.submit_hash
        }), cur.next_manual = !!e
    },
    delayTicket: function(e, t) {
        ajax.post(nav.objLoc[0], {
            act: "delay_ticket",
            ticket_id: cur.ticket_id,
            delay: e,
            hash: t
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(e) {
                val("tickets_header_info", e), cur.initDelayDD()
            }
        })
    },
    closeTicket: function(e) {
        var t = ge("close_ticket_link"),
            s = geByClass1("progress", t),
            a = geByClass1("label", t);
        return hide(a), show(s), ajax.post("helpdesk", {
            act: "close_ticket",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            onDone: Helpdesk._show,
            onFail: function() {
                show(a), hide(s)
            }
        }), !1
    },
    selectFavoritesGroup: function(e) {
        var t = geByClass1("tickets_favorites_groups_tab_sel", "tickets_favorites_groups"),
            s = ge("tickets_favorites_groups_tab_" + e);
        if (t != s) {
            removeClass(t, "tickets_favorites_groups_tab_sel"), addClass(s, "tickets_favorites_groups_tab_sel");
            var a = !0;
            hide("helpdesk_no_bookmarks"), each(geByClass("helpdesk_bookmark_row", "helpdesk_bookmarks"), function(t, s) {
                "all" == e ? (show(s), a = !1) : hasClass(s, "_group_" + e) ? (show(s), a = !1) : hide(s)
            }), a && show("helpdesk_no_bookmarks"), show("tickets_fav_table_" + e), cur.helpdeskGroupsSort && cur.helpdeskGroupsSort.update(), ajax.post("helpdesk", {
                act: "a_save_opened_fav",
                group: e
            })
        }
    },
    editFavoritesGroup: function(e, t) {
        cur.editFavoritesBox = showBox("helpdesk", {
            act: "edit_favorites_group",
            gid: e,
            ticket_id: t
        }, {
            params: {
                width: "430px"
            },
            dark: 1,
            onDone: function(s) {
                e && s.setControlsText('<a onclick="Helpdesk.deleteFavoritesGroup(' + e + ');">' + getLang("support_favorites_delete_btn") + "</a>"), s.setButtons(getLang("global_save"), Helpdesk.saveFavoritesGroup.pbind(e, t)), elfocus("tickets_favorites_editor__text")
            }
        })
    },
    deleteFavoritesGroup: function(e) {
        var t = val("tickets_favorites_editor__hash"),
            s = showFastBox({
                title: getLang("global_warning")
            }, getLang("support_favorites_delete_confirm"), getLang("box_yes"), function() {
                ajax.post("helpdesk", {
                    act: "a_delete_favorites_group",
                    gid: e,
                    hash: t
                }, {
                    showProgress: s.showProgress,
                    hideProgress: s.hideProgress,
                    onDone: function(e) {
                        s.hide(), cur.editFavoritesBox.hide();
                        var t = ge("tickets_favorites");
                        if (e) {
                            var a = se(e);
                            t ? domReplaceEl(t, a) : domFC("tickets_content").appendChild(a)
                        } else re(t);
                        Helpdesk.initBookmarks()
                    }
                })
            }, getLang("box_no"));
        return !1
    },
    saveFavoritesGroup: function(e, t) {
        var s = ge("tickets_favorites_editor__text"),
            a = val(s).trim(),
            o = val("tickets_favorites_editor__hash");
        return a ? void ajax.post("helpdesk", {
            act: "a_save_favorites_group",
            gid: e,
            hash: o,
            title: a,
            ticket_id: t
        }, {
            showProgress: cur.editFavoritesBox.showProgress,
            hideProgress: cur.editFavoritesBox.hideProgress,
            onDone: function(e, t) {
                cur.editFavoritesBox.hide();
                var s = ge("tickets_favorites");
                if (e) {
                    var a = se(e);
                    s ? s.parentNode.replaceChild(a, s) : ge("tickets_content").firstChild.appendChild(a), Helpdesk.selectFavoritesGroup(t)
                } else re(s);
                Helpdesk.initBookmarks()
            }
        }) : notaBene(s)
    },
    undoClose: function(e, t, s) {
        var a = s ? "undo_troll_reply" : "undo_close_ticket";
        ajax.post("helpdesk", {
            act: a,
            ticket_id: e,
            hash: t
        }, {
            showProgress: function() {
                hide("undo_link"), setStyle("undo_progress", {
                    display: "inline-block"
                })
            },
            hideProgress: function() {
                hide("undo_progress"), show("undo_link")
            },
            onDone: Helpdesk._show
        })
    },
    trollAutoReply: function(e) {
        return ajax.post("helpdesk", {
            act: "troll_auto_reply",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    autoReplyPass: function(e, t) {
        ajax.post("helpdesk", {
            act: "auto_reply_pass",
            pass: e,
            ticket_id: cur.ticket_id,
            hash: t
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        })
    },
    recommendAntivirus: function(e) {
        ajax.post(nav.objLoc[0], {
            act: "recommend_antivirus",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        })
    },
    sendPayForm: function(e) {
        var t = showFastBox({
            title: getLang("support_send_form_to_user"),
            width: 500
        }, cur.send_pay_label, getLang("box_send"), function() {
            Helpdesk.doSendPayForm(val("tickets_send_comm"), t, e)
        }, getLang("global_cancel"));
        return !1
    },
    doSendPayForm: function(e, t, s) {
        var a = geByClass1("flat_button", t.bodyNode.nextSibling);
        return ajax.post("helpdesk", {
            act: "send_pay_form",
            ticket_id: cur.ticket_id,
            text: e,
            hash: s
        }, {
            onDone: function(e, s) {
                t.hide(), Helpdesk._show(e, s)
            },
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a)
        }), !1
    },
    takeToSection: function() {
        return ajax.post("helpdesk", {
            act: "take",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.next_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    takeTicket: function() {
        return ajax.post("helpdesk", {
            act: "take_ticket",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.take_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    providerEmail: function() {
        return !showBox("helpdesk", {
            act: "provider_email_box",
            ticket_id: cur.ticket_id
        }, {
            params: {
                width: 500,
                bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                hideButtons: !0
            },
            dark: 1
        })
    },
    getFaqSuggestions: function(e) {
        return !showBox(nav.objLoc[0], {
            act: "tlmd_suggestions",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            params: {
                dark: 1,
                width: 600
            }
        })
    },
    photosChooseMore: function(e) {
        var t = ge("photos_choose_more");
        return hasClass(t, "photos_choose_more_loading") ? !1 : void ajax.post("helpdesk", {
            act: "choose_photo_box",
            offset: attr(t, "offset"),
            to_id: e
        }, {
            onDone: function(e, s, a) {
                domInsertBefore(cf(e), "photos_choose_clear"), attr(t, "offset", s), a && hide(t)
            },
            onFail: removeClass.pbind(t, "photos_choose_more_loading"),
            showProgress: addClass.pbind(t, "photos_choose_more_loading"),
            hideProgress: removeClass.pbind(t, "photos_choose_more_loading")
        })
    },
    setTicketTag: function(e, t, s, a) {
        var o = hasClass(e, "secondary") ? 1 : 0;
        ajax.post("helpdesk", {
            act: "set_tag",
            id: t,
            tid: s,
            hash: a,
            val: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggleClass(e, "secondary", !o)
            }
        })
    },
    addFavGroupTT: function(e, t) {
        showTooltip(e, {
            text: t,
            dir: "bottom",
            typeClass: "tt_black",
            shift: [12, 4, 4]
        })
    },
    setSwitch: function(e, t, s, a) {
        ajax.post("helpdesk", {
            act: "a_set_switch",
            val: t,
            "switch": s,
            hash: a
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(s) {
                var a = gpeByClass("_switch", e);
                toggleClass(a, "helpdesk_switch_enabled", t), val("helpdesk_switches_logs", s)
            }
        })
    },
    getPage: function(offset) {
        show("pages_loading_top"), show("pages_loading_bottom");
        var _n = nav.objLoc,
            act = cur.section,
            query = {
                act: act,
                offset: offset,
                load: 1
            };
        for (var v in _n) "0" != v && "act" != v && "offset" != v && (query[v] = _n[v]);
        return "all" == _n.act && cur.checkedTickets && (window.checkedTickets = cur.checkedTickets, isEmpty(cur.checkedTickets) || (query.hide_search = 1)), ajax.post(cur.objLoc, query, {
            cache: 1,
            onDone: function(content, script) {
                if ("history" == nav.objLoc.act ? val("tickets_replies", content) : val("tickets_content", content), window.tooltips && tooltips.hideAll(), script && eval(script), window.checkedTickets) {
                    cur.checkedTickets = window.checkedTickets, delete window.checkedTickets, each(cur.checkedTickets, function(e, t) {
                        var s = ge("tickets_similar_row" + e);
                        if (s) {
                            var a = geByClass1("tickets_check", s),
                                o = a ? geByClass1("checkbox", a) : null;
                            checkbox(o, !0)
                        }
                    });
                    var allChecked = !0;
                    each(geByClass("tickets_check", "tickets_checked"), function(e, t) {
                        var s = geByClass1("checkbox", t);
                        return isChecked(s) ? void 0 : (allChecked = !1, !1)
                    });
                    var allChb = ge("tickets_all_check");
                    allChb && checkbox(geByClass1("checkbox", allChb), allChecked), Tickets.updateChecked()
                }
                offset ? nav.setLoc(extend(nav.objLoc, {
                    offset: offset
                })) : (delete nav.objLoc.offset, nav.setLoc(nav.objLoc))
            },
            onFail: function() {
                hide("pages_loading_top"), hide("pages_loading_bottom")
            }
        }), !1
    },
    openAllMyTickets: function() {
        var e = [];
        each(geByClass("_ticket_link", "my_tickets_table"), function(t, s) {
            var a = attr(s, "ticket-id");
            e.push([s.href, a])
        });
        var t = setInterval(function() {
            if (!e.length) return void clearInterval(t);
            var s = e.shift();
            window.open(s[0], "helpdesk_show_" + s[1]), window.focus()
        }, 300)
    },
    checkTicketsChecked: function(e, t, s, a) {
        var o = Tickets.getCheckedArr();
        if (o.length) {
            uiTabs.switchTab(geByClass1("ui_tab", "tickets_tab_all"), {
                noAnim: 1
            });
            var r = showFastBox(getLang("support_ento_checked_leave_title"), getLang("support_ento_checked_leave_text"), getLang("global_continue"), function() {
                r.hide(), cur.checkedTickets = {}, nav.go(s)
            }, getLang("global_cancel"));
            return !1
        }
    },
    banContentChunk: function(e, t, s, a, o, r) {
        lockButton(r), ajax.post("al_helpdesk.php", {
            act: "claim_content_chunk",
            claim_id: e,
            reply_id: t,
            type: s,
            idx: a,
            hash: o
        }, {
            onDone: function() {
                unlockButton(r), val(r, getLang("helpdesk_content_banned")), disableButton(r, !0)
            }
        })
    },
    newTicketKeyDown: function(e, t) {
        if (e.altKey || e.ctrlKey || e.metaKey && browser.mac) {
            if (32 == e.keyCode) return cancelEvent(e), Helpdesk.trySelectTemplate(ge("tickets_text"));
            onCtrlEnter(e, Tickets.addTicketReply.pbind(t, !0))
        }
    },
    postFieldKeyDown: function(e, t) {
        if (e.altKey || e.ctrlKey || e.metaKey && browser.mac) {
            if (32 == e.keyCode) return cancelEvent(e), Helpdesk.trySelectTemplate(ge("tickets_reply"));
            onCtrlEnter(e, Tickets.addTicketReply.pbind(t, !0))
        }
    },
    trySelectTemplate: function(e) {
        var t = val(e),
            s = 0;
        if (document.selection) {
            var a = document.selection.createRange();
            a.moveStart("character", -t.length), s = a.text.length
        } else(e.selectionStart || "0" == e.selectionStart) && (s = e.selectionStart);
        var o = t.substring(0, s),
            r = t.substring(s),
            i = o.match(/(.+)$/);
        if (!i) return !1;
        each(geByClass("helpdesk_template_selected", "helpdesk_template_links"), function(e, t) {
            removeClass(t, "helpdesk_template_selected")
        }), i = i[1].toLowerCase(), console.log("Name part: %s", i);
        var n = [],
            c = [];
        if (each(cur.templates, function(e, t) {
                return i == t.title_low ? (n = [e], c = [i], !1) : void(0 == t.title_low.indexOf(i) && (n.push(e), c.push(t.title_low)))
            }), n.length > 1) {
            each(n, function(e, t) {
                addClass("template" + t, "helpdesk_template_selected")
            });
            for (var d = c.sort(), l = d[0], _ = d[d.length - 1], u = l.length, h = 0; u > h && l.charAt(h) === _.charAt(h);) h++;
            h > i.length && (val(e, o.substring(0, o.length - i.length) + l.substring(0, h) + r), elfocus(e, o.length - i.length + h))
        } else 1 == n.length && (val(e, o.substring(0, o.length - i.length) + r), elfocus(e, o.length - i.length), Helpdesk.selectTemplate(n[0]));
        return !1
    },
    toggleSectionStats: function(e) {
        var t = ge("helpdesk_section_stats_row" + e),
            s = ge("helpdesk_section_stats" + e),
            a = !isVisible(t);
        a ? (show(t), slideDown(s, 200)) : slideUp(s, 200, hide.pbind(t))
    },
    createPattern: function(e) {
        cur.createPatternBoxHash = e, cur.createPatternBox = new MessageBox({
            title: getLang("helpdesk_create_pattern_title")
        }), cur.createPatternBox.content(cur.createPatternBoxContent), cur.createPatternBox.addButton(getLang("global_add"), Helpdesk.doCreatePattern, "ok", !1, "helpdesk_create_pattern__save"), cur.createPatternBox.show(), elfocus("helpdesk_create_pattern__title")
    },
    doCreatePattern: function() {
        var e = ge("helpdesk_create_pattern__title"),
            t = ge("helpdesk_create_pattern__save"),
            s = val(e);
        return s ? void ajax.post("helpdesk", {
            act: "a_create_pattern",
            hash: cur.createPatternBoxHash,
            title: s
        }, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t),
            onDone: function(e, t) {
                cur.createPatternBox.hide(), val("helpdesk_patterns_list", e), Helpdesk.editPattern(t)
            }
        }) : notaBene(e)
    },
    editPattern: function(e) {
        cur.editPatternBox = showBox("helpdesk", {
            act: "edit_pattern_box",
            id: e
        })
    },
    savePattern: function(e, t) {
        var s = {
                act: "a_save_pattern",
                id: e,
                hash: t,
                status: radioval("status"),
                group_by_uid: isChecked("helpdesk_edit_pattern_box__uid") ? 1 : 0,
                work_on_low: isChecked("helpdesk_edit_pattern_box__work_on_low") ? 1 : 0
            },
            a = !1,
            o = ge("helpdesk_edit_pattern_box__save");
        each(["title", "query", "message", "period", "frequency", "danger"], function(e, t) {
            var o = ge("helpdesk_edit_pattern_box__" + t),
                r = val(o);
            "" == r && "query" != t && "message" != t && (notaBene(o), a = !0), s[t] = r
        }), a || ajax.post("helpdesk", s, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: function(t) {
                cur.editPatternBox.hide(), domReplaceEl(ge("helpdesk_pattern" + e), se(t)), notaBene("helpdesk_pattern" + e, "notice")
            }
        })
    },
    removePattern: function(e, t) {
        var s = showFastBox(getLang("global_warning"), getLang("helpdesk_confirm_pattern_remove"), getLang("global_delete"), function() {
            s.hide(), hide("helpdesk_edit_pattern_box__remove"), ajax.post("helpdesk", {
                act: "a_remove_pattern",
                id: e,
                hash: t
            }, {
                progress: cur.editPatternBox.progress,
                onDone: function(t) {
                    cur.editPatternBox.hide(), re("helpdesk_pattern" + e), showDoneBox(t)
                }
            })
        }, getLang("global_cancel"))
    },
    showVkMobilePassBox: function(e) {
        return !showBox("/helpdesk?act=pass_vkmobile_box", {
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            params: {
                dark: 1
            }
        })
    },
    passToVkMobile: function(e, t) {
        var s = curBox(),
            a = isChecked(geByClass1("_helpdesk_ticket_vkmobile_send_autoanswer"));
        ajax.post("/helpdesk?act=a_pass_vkmobile", {
            text: e,
            ticket_id: cur.ticket_id,
            hash: t,
            auto_answer: a
        }, {
            onDone: function(e) {
                showDoneBox(e), s.hide()
            },
            showProgress: s.showProgress,
            hideProgress: s.hideProgress
        })
    },
    goToSmsField: function(e, t) {
        checkEvent(t) || ge("helpdesk_post_field_sms") && (cancelEvent(t), isChecked("reply_with_sms") || Helpdesk.toggleSmsFields(ge("reply_with_sms")), scrollToY(getXY("helpdesk_post_field_sms")[1]), elfocus("tickets_reply"), val("helpdesk_post_field_sms__phone", e))
    },
    toggleSmsFields: function(e) {
        checkbox(e), slideToggle("helpdesk_post_field_sms", 200)
    },
    ticketHotkeysCallback: function(e) {
        69 == e.keyCode && e.ctrlKey ? (cur.ticketAuthorId && !curBox() && Helpdesk.openMarksBoxInTicket(0), cancelEvent(e)) : 66 == e.keyCode && e.ctrlKey && cur.ticketAuthorId && !curBox() && showBox("meminfo", {
            act: "bans",
            mid: cur.ticketAuthorId,
            box: 1,
            onhide: 1
        })
    },
    reloadUserMarks: function(e, t) {
        var s = ge("helpdesk_marked_user_row" + e),
            a = geByClass1("_marks", s),
            o = geByClass1("_inner", s);
        return t ? (addClass(s, "helpdesk_marked_user_row_processing"), void ajax.post("helpdesk?act=a_get_marked_user_row", {
            id: e
        }, {
            onDone: function(e, t) {
                val(a, e), val(o, t), removeClass(s, "helpdesk_marked_user_row_processing")
            }
        })) : (val(a, ""), void val(o, ""))
    },
    openMarksBoxInList: function(e, t) {
        cur.ticketAllAuthors || (cur.ticketAllAuthors = {}), cur.ticketAllAuthors[e] = {
            hash: t
        }, Helpdesk.openMarksBox(e, Helpdesk.reloadUserMarks)
    },
    searchUserMarks: function() {
        var e = {
            0: "helpdesk",
            act: "marks",
            q: trim(val("helpdesk_marked_user_form__q"))
        };
        cur.userMarksTypesDD && cur.userMarksTypesDD.val() > 0 && (e.mark = cur.userMarksTypesDD.val()), nav.objLoc.mid && (e.mid = nav.objLoc.mid), e.q || delete e.q, nav.go(e), lockButton("helpdesk_marked_user_form__btn")
    },
    reloadTicketMarks: function(e, t) {
        var s = ge("helpdesk_user_marks" + e);
        t ? (addClass(s, "helpdesk_user_marks_processing"), ajax.post("helpdesk?act=a_get_user_marks", {
            id: e
        }, {
            onDone: function(e) {
                var t = se(e);
                domReplaceEl(ge(t.id), t)
            }
        })) : val(s, "")
    },
    openMarksBoxInTicket: function(e) {
        cur.chooseUserToMarkBox && cur.chooseUserToMarkBox.hide(), Helpdesk.openMarksBox(e, Helpdesk.reloadTicketMarks)
    },
    showChooseUserToMarkBox: function() {
        var e = "";
        each(cur.ticketAllAuthors, function(t, s) {
            e += getTemplate("openMarksBoxButton", s)
        }), cur.chooseUserToMarkBox = showFastBox(getLang("helpdesk_choose_user"), e), cur.chooseUserToMarkBox.setOptions({
            hideButtons: !0
        })
    },
    openMarksBox: function(e, t) {
        if (!e) {
            var s = 0;
            each(cur.ticketAllAuthors, function(t, a) {
                e = t, s++
            })
        }
        if (s > 1) return void Helpdesk.showChooseUserToMarkBox();
        var a = cur.ticketAllAuthors[e];
        a && (cur.editMarksBox = showBox("helpdesk?act=user_marks_box", {
            id: e,
            hash: a.hash
        }, {
            params: {
                width: 550
            },
            onDone: Helpdesk.initMarksBox.pbind(e, a.hash, t)
        }))
    },
    initMarksBox: function(e, t, s) {
        cur.editMarksBox.removeButtons(), each(geByClass("text", "helpdesk_edit_user_marks"), function(e, t) {
            autosizeSetup(t, {
                minHeight: 30
            })
        }), cur.saveMarksBox = Helpdesk.saveMarks.pbind(e, t, s), cur.editMarksBox.addButton(getLang("global_save"), cur.saveMarksBox, "ok", !1, "helpdesk_edit_user_marks__save")
    },
    toggleMark: function(e, t, s) {
        toggleClass(e, "helpdesk_edit_user_mark_disabled", !t);
        var a = geByClass1("text", e);
        disable(a, !t), t ? (a.removeAttribute("readonly"), s && elfocus(a)) : a.setAttribute("readonly", "readonly")
    },
    saveMarks: function(e, t, s) {
        var a = ge("helpdesk_edit_user_marks__save"),
            o = {
                id: e,
                hash: t,
                marks: [],
                enabled: [],
                descr: [],
                disable_expire: [],
                ticket_id: cur.ticket_id
            };
        each(geByClass("_mark", "helpdesk_edit_user_marks"), function(e, t) {
            var s = !hasClass(t, "helpdesk_edit_user_mark_disabled");
            o.marks.push(attr(t, "mark-id")), o.enabled.push(s ? 1 : 0), o.descr.push(s ? val(geByClass1("text", t)) : "");
            var a = geByClass1("_disable_expire", t);
            o.disable_expire.push(a && isChecked(a) ? 1 : 0)
        }), ajax.post("helpdesk?act=a_save_user_marks", o, {
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a),
            onDone: function(t, a) {
                t && s && s(e, a), cur.editMarksBox.hide()
            }
        })
    },
    editMarkClick: function(e) {
        var t = gpeByClass("_mark", e);
        if (t) {
            var s = hasClass(t, "helpdesk_edit_user_mark_disabled");
            Helpdesk.toggleMark(t, s, !0)
        }
    },
    showMoreMarks: function(e) {
        var t = {};
        each(["q", "mark", "mid"], function(e, s) {
            nav.objLoc.hasOwnProperty(s) && (t[s] = nav.objLoc[s])
        }), t.min_ts_to = cur.maxMarkTime, ajax.post("helpdesk?act=marks", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, s) {
                cur.maxMarkTime = s, s || hide(e);
                var a = sech(t),
                    o = ge("helpdesk_marked_user_rows__list");
                each(a, function(e, t) {
                    ge(t.id) || o.appendChild(t)
                })
            }
        })
    },
    showMarkTooltip: function(e, t) {
        showTooltip(e, {
            dir: "top",
            forcetodown: !0,
            text: t,
            showdt: 200,
            hasover: !0,
            shift: [125, 8, 8],
            className: "helpdesk_mark_note_tt"
        })
    },
    editTicketTitle: function(e, t) {
        cur.editTicketTitle = showBox("helpdesk?act=edit_ticket_title_box", {
            id: e,
            hash: t
        }, {
            onDone: function() {
                cur.editTicketTitleId = e, cur.editTicketTitleHash = t
            }
        })
    },
    saveTicketTitle: function() {
        var e = ge("helpdesk_edit_title__inp"),
            t = trim(val(e));
        return "" === t ? notaBene(e) : void ajax.post("helpdesk?act=a_save_ticket_title", {
            id: cur.editTicketTitleId,
            hash: cur.editTicketTitleHash,
            title: t
        }, {
            progress: cur.editTicketTitle.progress,
            onDone: function(e, t) {
                delete cur.editTicketTitleId, delete cur.editTicketTitleHash, Helpdesk._show(e, t), cur.editTicketTitle.hide()
            }
        })
    },
    showSettings: function() {
        cur.helpdeskSettingsBox = showBox("helpdesk?act=settings_box", {}, {})
    },
    saveSettings: function(e) {
        var t = {
            hash: e,
            small_sidebar: isChecked("helpdesk_settings_box_small_sidebar") ? 1 : 0,
            merge_replies: isChecked("helpdesk_settings_box_merge_replies") ? 1 : 0,
            fixed_ticket_header: isChecked("helpdesk_settings_box_fixed_ticket_header") ? 1 : 0
        };
        ajax.post("helpdesk?act=a_save_settings", t, {
            progress: cur.helpdeskSettingsBox.progress,
            onDone: function(e) {
                cur.helpdeskSettingsBox.hide(), showDoneBox(e), nav.reload()
            }
        })
    },
    onTicketScreenResize: function() {
        document.documentElement.clientHeight < 650 ? Helpdesk.toggleFixedHeader(0) : Helpdesk.onTicketScroll()
    },
    onTicketScroll: function() {
        if (window.pageNode && ge("tickets_header_filler") && !(document.documentElement.clientHeight < 650)) {
            var e = scrollGetY(),
                t = ge("tickets_content"),
                s = getSize("page_header_cont")[1];
            if (t) {
                var a = getXY(t);
                Helpdesk.toggleFixedHeader(e + s >= a[1] + 30)
            }
        }
    },
    toggleFixedHeader: function(e) {
        var t = ge("tickets_header"),
            s = ge("tickets_header_filler");
        e != hasClass(t, "tickets_header_fixed") && (e ? setStyle(t, "width", getSize("content")[0]) : setStyle(t, "width", "auto"), toggleClass(t, "tickets_header_fixed", e), toggle(s, e), Helpdesk.resizeHeaderFiller())
    },
    resizeHeaderFiller: function() {
        var e = getSize("tickets_header"),
            t = ge("tickets_header_filler");
        setStyle(t, {
            width: e[0],
            height: e[1]
        })
    },
    _eof: 1
};
try {
    stManager.done("helpdesk.js")
} catch (e) {}