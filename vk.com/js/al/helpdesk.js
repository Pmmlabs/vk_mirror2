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
    agentsProcessedTicketsBox: function(e) {
        showBox("helpdesk?act=processed_log_box", {
            id: e
        }, {
            params: {
                width: 650
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
        var o = Helpdesk._getBookmarkGroupId(e),
            a = Helpdesk._getBookmarkGroupId(t),
            i = Helpdesk._getBookmarkGroupId(s);
        ajax.post("/helpdesk", {
            act: "reorder_bookmarks",
            hash: cur.reorderHash,
            group_id: o,
            next_group_id: a,
            prev_group_id: i
        })
    },
    initBookmarksGroupsSorter: function() {
        if (isVisible("tickets_favorites")) {
            var e = ge("helpdesk_favorites_groups_list");
            e && (cur.helpdeskGroupsSort && cur.helpdeskGroupsSort.destroy(), cur.helpdeskGroupsSort = new GridSorter(e, "tickets_favorites_groups_tab", {
                onReorder: Helpdesk.onReorderBookmarks
            }))
        }
    },
    initBookmarks: function() {
        var e = ge("tickets_favorites");
        if (e) {
            Helpdesk.initBookmarksGroupsSorter();
            var t = geByClass("_row", "helpdesk_bookmarks"),
                s = JSON.parse(attr(e, "data-groups"));
            each(t, function(e, t) {
                var o = geByClass("helpdesk_m_table_dd_block", t)[0];
                t.groupsDD = new InlineDropdown(o, {
                    items: s,
                    withArrow: !0,
                    selected: attr(t, "data-group_id"),
                    onSelect: function(e) {
                        var s = t.id.replace("bookmark_ticket_", ""),
                            o = attr(t, "data-group_id");
                        if (-2 == e) return t.groupsDD.val(o), Helpdesk.editFavoritesGroup(0, s);
                        removeClass(t, "_group_" + o), addClass(t, "_group_" + e), attr(t, "data-group_id", e);
                        var a = "";
                        a = cur.hashes && cur.hashes.favorite_hash ? cur.hashes.favorite_hash : cur.favoriteHash;
                        var i = -1 == e ? 0 : 1;
                        if (0 == i) {
                            re(t), e = 0, 0 == geByClass("_row", "helpdesk_bookmarks").length && show("helpdesk_no_bookmarks"), re("helpdesk_actual_until_row" + s);
                            var r = ge("helpdesk_actual_until");
                            r && !geByClass1("_row", r) && re(r)
                        }
                        ajax.post("helpdesk?act=a_favorite", {
                            ticket_id: s,
                            add: i,
                            gid: e,
                            hash: a
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
            o = ge("note_edit_form_input_" + e);
        if (s) {
            show(s), elfocus(o);
            var a = replaceEntities(Helpdesk._getBookmarkNoteText(e));
            a = a.replace(/(<br>|<br \/>|<br\/>)/g, "\n"), val(o, a), autosizeSetup(o, {
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
                    o = val("note_edit_form_input_" + e).trim();
                ajax.post("/helpdesk?act=a_save_bookmark_note", {
                    ticket_id: e,
                    hash: s,
                    text: o
                }, {
                    showProgress: function() {
                        cur.helpdeskNoteSaveLoading = !0, showProgress("helpdesk_note_edit_form_progress_" + e)
                    },
                    hideProgress: function() {
                        cur.helpdeskNoteSaveLoading = !1, hideProgress("helpdesk_note_edit_form_progress_" + e)
                    },
                    onDone: function(t, s, a) {
                        var i = ge("helpdesk_note_" + e),
                            r = ge("helpdesk_note_edit_" + e);
                        i && (attr(i, "data-text", s), attr(i, "data-formated_text", a), toggle(i, o), toggle(r, !o)), Helpdesk._hideNoteEditForm()
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
        return !showBox("helpdesk?act=add_bug_box", {
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
        return !showBox("helpdesk?act=add_template", {
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
        chosen && each(chosen, function(e, t) {
            var s = t[0],
                o = t[1];
            ("photo" == s || "doc" == s) && attachs.push(s + "," + o)
        });
        var query = {
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
        return ajax.post("helpdesk?act=a_save_template", query, {
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
        var s, o = null,
            a = t.title_text;
        switch (t.type) {
            case 0:
                s = cur.editing ? ge("reply" + cur.editing + "edit") : ge("tickets_reply");
                break;
            case 1:
                a = getLang("helpdesk_title_from_support") + " " + t.title_text, o = ge("tickets_title"), s = ge("tickets_text")
        }
        null !== o && val(o, a);
        var i = s.scrollTop,
            r = 0,
            n = s.selectionStart || "0" == s.selectionStart ? "ff" : document.selection ? "ie" : !1,
            c = replaceEntities(t.text.replace(/<br>/g, "\n")) + "\n";
        if ("ie" == n) {
            s.focus();
            var d = document.selection.createRange();
            d.collapse(!0), d.moveStart("character", -s.value.length), r = d.text.length
        } else "ff" == n && (r = s.selectionStart);
        if (browser.chrome && (r += 1), r += c.length, "ie" == n) {
            s.focus();
            var d = document.selection.createRange();
            d.moveStart("character", -s.value.length), d.moveStart("character", r), d.moveEnd("character", 0), d.select()
        } else "ff" == n && (s.focus(), s.selectionStart = r, s.selectionEnd = r);
        var l = s.value.substring(0, r - c.length),
            _ = s.value.substring(r - c.length, s.value.length);
        if (s.value = l + c + _, s.scrollTop = i, s.autosize || autosizeSetup(s, {
                minHeight: 42,
                maxHeight: 100
            }), s.autosize.update(), "ie" == n) {
            var d = s.createTextRange();
            d.move("character", r), d.select()
        } else "ff" == n && (s.focus(), s.setSelectionRange(r, r));
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
        var s, o = null,
            a = "",
            i = getLang("support_templates");
        switch (e) {
            case 0:
                s = ge("tickets_reply");
                break;
            case 1:
                a = getLang("helpdesk_title_from_support") + " ", o = ge("tickets_title"), s = ge("tickets_text"), i = getLang("helpdesk_tickets_templates")
        }
        var r = cur.templates[t] ? cur.templates[t].text.replace(/<br>/g, "\n") : "";
        return cur.templates[t] && trim(val(s)) == trim(replaceEntities(r)) && (val(s, ""), 0 == e && autosizeSetup("tickets_reply", {
            minHeight: 42,
            maxHeight: 100
        })), o && val(o, a), val("helpdesk_template_title", i), hide("edit_template"), delete cur.selectedTemplate, !1
    },
    clearCommentsFlood: function(e, t, s) {
        hide("tickets_flood_msg"), ajax.post("helpdesk", {
            act: "clear_flood",
            mid: e,
            section: t,
            hash: s
        })
    },
    setActualTicketsContent: function(e, t) {
        var s = se(e);
        domReplaceEl(ge(s.id), s), Helpdesk.setButtonsContent(t)
    },
    setButtonsContent: function(e) {
        if ("" !== e) {
            var t = se(e),
                s = ge(t.id);
            if (s) domReplaceEl(s, t);
            else {
                var o = ge("tickets_get_new");
                o.insertBefore(t, domFC(o))
            }
        } else re("helpdesk_m_table_actions")
    },
    getNewTicket: function(e, t) {
        ajax.post("helpdesk?act=a_get_ticket", {
            hash: t
        }, {
            onDone: function(e) {
                Helpdesk.setActualTicketsContent(e[0], e[1])
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
    showCommentReplies: function(e, t) {
        return showBox("helpdesk", {
            act: "replies_box",
            ticket_id: e,
            reply_id: t
        }, {
            params: {
                width: "727px",
                hideButtons: !0,
                bodyStyle: "padding: 0px; border: 0px;"
            }
        }), !1
    },
    recountReplyComments: function(e, t) {
        var s = ge("helpdesk_reply_cmt" + e + "_" + t);
        s && ajax.post("helpdesk", {
            act: "a_recount_reply_comments",
            rid: t,
            ticket_id: e
        }, {
            onDone: function(e) {
                if (e) {
                    var t = se(e);
                    t && domReplaceEl(s, t)
                }
            }
        })
    },
    showMemberCardCommentsTT: function(e, t, s, o) {
        showTooltip(e, {
            url: "meminfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            dir: "top",
            center: o,
            slide: 15,
            shift: [o ? 0 : 20, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200
        })
    },
    showGroupCardCommentsTT: function(e, t, s, o) {
        showTooltip(e, {
            url: "groupinfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            dir: "top",
            center: o,
            slide: 15,
            shift: [o ? 0 : 20, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200
        })
    },
    passTo: function(e, t, s) {
        var o = cur.pass_warnings && cur.pass_warnings[t] || cur.pass_warnings[0],
            a = {
                msg: o,
                sure_pass: getLang("support_sure_pass").replace("{section}", val(e)),
                avg_time: "",
                section: t,
                pass_to_comment: cur.support_pass_comment,
                send_payform: ""
            };
        cur.cat_average_times && intval(cur.cat_average_times[t]) > 0 && (a.avg_time = getTemplate("passToBoxAvgTime", {
            avg_time: cur.cat_average_times[t]
        })), 16 != t && 17 != t && 18 != t || cur.isImTicket || (a.send_payform = '<div class="checkbox' + (cur.sendPayFormDefault ? " on" : "") + '" id="support_send_payform" onclick="checkbox(this);">' + getLang("support_send_form_to_user") + "</div>");
        var i = getTemplate("passToBox", a),
            r = showFastBox({
                title: getLang("support_pass_title"),
                width: 575
            }, i, getLang("support_do_pass"), function() {
                Helpdesk.doPass(t, val("tickets_pass_comm"), r)
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
        var o = s ? "pass" : "pass_back",
            a = {
                act: o,
                ticket_id: cur.ticket_id,
                to: e,
                comm: t,
                hash: cur.hashes.next_hash
            };
        if (ge("support_send_payform") && (a.send_pay_form = isChecked("support_send_payform") ? 1 : 0), s && ge("support_dont_pass_autoanswer") && !isChecked("support_dont_pass_autoanswer")) {
            a.autoanswer = val("tickets_send_autoanswer");
            var i = ge("helpdesk_autoanswer_other_langs");
            if (i) {
                var r = geByClass("tickets_send_autoanswer", i);
                each(r, function(e, t) {
                    var s = attr(t, "data-lang_id"),
                        o = val(t);
                    a["autoanswer_" + s] = o
                })
            }
        }
        var n = Helpdesk._getCheckedTicketsList();
        return n && (a.tickets = n, a.act = "pass"), ajax.post("helpdesk", a, {
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
        if (t != cur.sort) {
            each(geByClass("table_header_upper_span", e.parentNode), function(e, t) {
                removeClass(t, "sorted")
            }), addClass(geByClass1("table_header_upper_span", e), "sorted");
            var s = "";
            nav.objLoc.section && (s = "&section=" + nav.objLoc.section), nav.go("/helpdesk?act=" + nav.objLoc.act + s + "&sort=" + t)
        }
        return !1
    },
    toggleAddBugRow: function(e, t, s) {
        if (s.target || (s.target = s.srcElement || document), "a" == s.target.tagName.toLowerCase()) return !0;
        var o = isVisible("tickets_add_bug_short_text" + e);
        return toggle("tickets_add_bug_short_text" + e, !o), toggle("tickets_add_bug_full_text" + e, o), toggleClass(t, "detailed", o), !1
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
            o = ge("tickets_send_autoanswer_lang_" + t),
            a = attr(s, "data-langs_list"),
            i = !1;
        if (a && (i = JSON.parse(a)), cur.helpdeskPassToCategoryId && i && i[cur.helpdeskPassToCategoryId]) {
            var r = replaceEntities(i[cur.helpdeskPassToCategoryId]);
            val(o, r)
        }
        toggle(s), s.isInited || (autosizeSetup(o, {
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
                o = Helpdesk._getCheckedTicketsList();
            o && (s.tickets = o), ge("tickets_closed_autoanswer_addressing_m") && (s.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (s.addressing_f = val("tickets_closed_autoanswer_addressing_f")), s.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, s.answer_text = val("tickets_send_autoanswer");
            var a = ge("helpdesk_autoanswer_other_langs");
            if (a) {
                var i = geByClass("tickets_send_autoanswer", a);
                each(i, function(e, t) {
                    var o = attr(t, "data-lang_id"),
                        a = val(t),
                        i = ge("tickets_closed_autoanswer_addressing_m" + o),
                        r = ge("tickets_closed_autoanswer_addressing_f" + o);
                    s["answer_text_" + o] = a, i && (s["addressing_m_" + o] = val(i)), r && (s["addressing_f_" + o] = val(r))
                })
            }
            var r = [],
                n = cur.ticketsAutoMedia.chosenMedias;
            return n && each(n, function(e, t) {
                var s = t[0],
                    o = t[1];
                ("photo" == s || "doc" == s) && r.push(s + "," + o)
            }), r.length && (s.attachs = r), ajax.post("helpdesk", s, {
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
                        bug_id: e,
                        ticket_id: cur.ticket_id,
                        hash: t
                    },
                    o = [],
                    a = cur.ticketsAutoMedia.chosenMedias;
                a && each(a, function(e, t) {
                    var s = t[0],
                        a = t[1];
                    ("photo" == s || "doc" == s) && o.push(s + "," + a)
                }), o && (s.attachs = o);
                var i = Helpdesk._getCheckedTicketsList();
                if (i && (s.tickets = i), ge("support_ignore_autoanswer") && ge("tickets_send_autoanswer")) {
                    s.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, s.answer_text = val("tickets_send_autoanswer");
                    var r = ge("helpdesk_autoanswer_other_langs");
                    if (r) {
                        var n = geByClass("tickets_send_autoanswer", r);
                        each(n, function(e, t) {
                            var o = attr(t, "data-lang_id"),
                                a = ge("tickets_closed_autoanswer_addressing_m" + o),
                                i = ge("tickets_closed_autoanswer_addressing_f" + o);
                            s["answer_text_" + o] = val(t), a && (s["addressing_m_" + o] = val(a)), i && (s["addressing_f_" + o] = val(i))
                        })
                    }
                    ge("tickets_closed_autoanswer_addressing_m") && (s.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (s.addressing_f = val("tickets_closed_autoanswer_addressing_f")), ajax.post("helpdesk?act=a_bind_ticket", s, {
                        cache: 1,
                        onDone: Helpdesk._show,
                        onFail: function() {
                            boxQueue.hideAll()
                        }
                    })
                }
            },
            o = cur.sure_bind;
        cur.helpdeskAddBugLangAutoanswers && (o = o.replace('<span id="helodesk_add_bug_lang_autoanswer"></span>', cur.helpdeskAddBugLangAutoanswers));
        var a = showFastBox({
            title: getLang("support_binding_title"),
            width: 530,
            bodyStyle: "line-height: 160%;"
        }, o, getLang("support_do_bind"), function() {
            s(e, t), a.hide(), curBox() && curBox().content('<div style="height:100px; background: url(/images/progress7.gif) 50% 50% no-repeat;"></div>')
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
        var o = function() {
                var o = cur.unbindBox;
                ajax.post("helpdesk", {
                    act: "unbind_ticket",
                    ticket_id: cur.ticket_id,
                    bug_id: e,
                    hash: t
                }, {
                    cache: 1,
                    onDone: function() {
                        slideUp(s, 200, re.pbind(s)), o.hide()
                    },
                    showProgress: o.showProgress,
                    hideProgress: o.hideProgress
                })
            },
            a = function(e) {
                return e.keyCode == KEY.ENTER && __bq.count() ? (o(), !1) : void 0
            };
        browser.mobile || addEvent(document, "keydown", a), cur.unbindBox = showFastBox({
            title: getLang("support_delete_bind"),
            width: 430,
            onHide: function() {
                removeEvent(document, "keydown", a)
            }
        }, getLang("support_delete_text").replace("{title}", cur.bug_link || ""), getLang("support_delete"), o, getLang("global_cancel"))
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
    switchModersSubTab: function(e, t, s, o, a, i) {
        return hasClass(e, "active") ? !1 : (each(geByClass("tickets_subtab1", e.parentNode), function(e, t) {
            removeClass(t, "active")
        }), addClass(e, "active"), Helpdesk.updateModerStats(t, s, o, 0, i))
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
    updateModerStats: function(e, t, s, o, a) {
        return 0 > o ? !1 : (ge("support_moders_period_stats" + e).innerHTML = '<div class="tickets_detailed_loading"><div>', ajax.post("helpdesk", {
            act: "detailed_stats",
            mid: e,
            type: s,
            offset: o,
            hash: t,
            is_spec: a
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
        return e && !isVisible("tickets_bookmarks_menu") && (Helpdesk.toggleBookmarksTimerView(!1, !0), Helpdesk.toggleBookmarkIsFavView(!1)), toggle("tickets_bookmarks_icon", !e), toggle("tickets_bookmarks_menu", e), window.tooltips && tooltips.destroyAll(), e && (each(geByClass("_movefav", "tickets_bookmarks_menu"), function(e, t) {
            removeClass(t, "helpdesk_header_links_fav_selected")
        }), addClass("tickets_header_links_movefav_" + t, "helpdesk_header_links_fav_selected")), ajax.post("helpdesk?act=a_favorite", {
            ticket_id: cur.ticket_id,
            add: e ? 1 : 0,
            gid: t ? t : 0,
            hash: cur.hashes.favorite_hash
        }), !1
    },
    setFavoriteUntil: function(e) {
        ajax.post("helpdesk?act=a_set_favorite_until", {
            ticket_id: cur.ticket_id,
            until: e,
            hash: cur.hashes.favorite_hash
        })
    },
    setIsFavorite: function(e) {
        ajax.post("helpdesk?act=a_set_is_favorite", {
            ticket_id: cur.ticket_id,
            is_fav: e,
            hash: cur.hashes.favorite_hash
        })
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
                    var o = intval(cur.searchMobile.val());
                    o && (t.mobile = o);
                    var a = cur.searchBrowser.val();
                    a && "0" != a && (t.browser = -1 == a ? cur.searchBrowser.curTerm : a);
                    var i = intval(cur.searchTutorial.val());
                    i && (t.tutorial = i);
                    var r = intval(cur.searchSource.val());
                    r && (t.source = r), isChecked("tickets_time_checkbox") && (t.time_from = val("search_start_date"), t.time_to = val("search_end_date"))
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
            o = s.txt || "";
        if (!browser.mobile && t && !t.disabled && cur.canUseDrafts && (o || s.medias) && cur.ticket_id == e && (val(t).length < o.length && (val(t, o), t.autosize.update()), (s.medias || []).length && !((cur.ticketsNewMedia || {}).chosenMedias || []).length)) {
            var a = [];
            for (var i in s.medias) s.medias[i] && a.push(s.medias[i].slice(0, 2).join(","));
            ajax.post("helpdesk", {
                act: "draft_medias",
                attachs: a
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
            }))) : t.innerHTML = cur.similarCount ? getLang("support_show_similar", cur.similarCount) : getLang("support_search_similar"),
            e && scrollToTop(0), !1
    },
    toggleSimilarRows: function(e) {
        var t = attr(e, "toggle-text"),
            s = val(e),
            o = !attr(e, "toggle-value");
        return attr(e, "toggle-value", o ? "1" : ""), val(e, t), attr(e, "toggle-text", s), each(geByClass("similar_row_wrap", "similar_rows"), function(e, t) {
            Helpdesk.doToggleSimilarRow(t, o)
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
            o = geByClass1("label", t);
        return hide(o), show(s), ajax.post("helpdesk?act=a_close_ticket", {
            ticket_id: cur.ticket_id,
            hash: e,
            tmp: isChecked("helpdesk_close_temporary")
        }, {
            onDone: Helpdesk._show,
            onFail: function() {
                show(o), hide(s)
            }
        }), !1
    },
    toggleTicketClose: function(e, t) {
        var s = ge("reply" + e);
        ajax.post("helpdesk?act=a_toggle_close_ticket", {
            ticket_id: cur.ticket_id,
            reply_id: e,
            hash: t
        }, {
            showProgress: function() {
                addClass(s, "helpdesk_close_processing"), Helpdesk.showTicketProgress()
            },
            hideProgress: function() {
                removeClass(s, "helpdesk_close_processing"), Helpdesk.hideTicketProgress()
            },
            onDone: function(e, t) {
                var o = se(t);
                domReplaceEl(s, o), val("helpdesk_ticket_status", e)
            }
        })
    },
    sortFavorites: function(e, t) {
        e.sort(function(e, s) {
            return "until" == t ? intval(attr(e, "data-until")) - intval(attr(s, "data-until")) : intval(attr(s, "data-ts")) - intval(attr(e, "data-ts"))
        });
        var s = ge("helpdesk_bookmarks");
        each(e, function(e, t) {
            s.appendChild(t)
        })
    },
    selectFavoritesGroup: function(e) {
        var t = geByClass1("tickets_favorites_groups_tab_sel", "helpdesk_favorites_groups"),
            s = ge("tickets_favorites_groups_tab_" + e);
        if (t != s) {
            removeClass(t, "tickets_favorites_groups_tab_sel"), addClass(s, "tickets_favorites_groups_tab_sel");
            var o = !0;
            hide("helpdesk_no_bookmarks");
            var a = [];
            each(geByClass("_row", "helpdesk_bookmarks"), function(t, s) {
                "all" == e || hasClass(s, "_group_" + e) ? (show(s), a.push(s), o = !1) : hide(s)
            }), Helpdesk.sortFavorites(a, "until" == e ? "until" : "ts"), o && show("helpdesk_no_bookmarks"), show("tickets_fav_table_" + e), cur.helpdeskGroupsSort && cur.helpdeskGroupsSort.update(), ajax.post("helpdesk?act=a_save_opened_fav", {
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
                            var o = se(e);
                            t ? domReplaceEl(t, o) : domFC("tickets_content").appendChild(o)
                        } else re(t);
                        Helpdesk.initBookmarks()
                    }
                })
            }, getLang("box_no"));
        return !1
    },
    saveFavoritesGroup: function(e, t) {
        var s = ge("tickets_favorites_editor__text"),
            o = val(s).trim(),
            a = val("tickets_favorites_editor__hash");
        return o ? void ajax.post("helpdesk", {
            act: "a_save_favorites_group",
            gid: e,
            hash: a,
            title: o,
            ticket_id: t
        }, {
            showProgress: cur.editFavoritesBox.showProgress,
            hideProgress: cur.editFavoritesBox.hideProgress,
            onDone: function(e, t) {
                cur.editFavoritesBox.hide();
                var s = ge("tickets_favorites");
                if (e) {
                    var o = se(e);
                    s ? s.parentNode.replaceChild(o, s) : ge("tickets_content").firstChild.appendChild(o), Helpdesk.selectFavoritesGroup(t)
                } else re(s);
                Helpdesk.initBookmarks()
            }
        }) : notaBene(s)
    },
    undoClose: function(e, t, s) {
        var o = s ? "undo_troll_reply" : "undo_close_ticket";
        ajax.post("helpdesk", {
            act: o,
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
        return ajax.post("helpdesk?act=a_troll_auto_reply", {
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    trollsMultiReply: function(e, t) {
        var s = [];
        each(cur.checkedTickets, function(e, t) {
            s.push(e)
        }), ajax.post("helpdesk?act=a_troll_auto_reply", {
            tickets: s,
            hash: t
        }, {
            onDone: Helpdesk._show,
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    autoReplyPass: function(e, t) {
        ajax.post("helpdesk?act=auto_reply_pass", {
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
            }, cur.sendPayFormBox, getLang("box_send"), function() {
                Helpdesk.doSendPayForm(val("tickets_send_comm"), t, e)
            }, getLang("global_cancel")),
            s = ge("tickets_send_comm");
        return s && autosizeSetup(s, {}), !1
    },
    doSendPayForm: function(e, t, s) {
        var o = geByClass1("flat_button", t.bodyNode);
        return ajax.post("helpdesk?act=a_send_pay_form", {
            ticket_id: cur.ticket_id,
            text: e,
            hash: s
        }, {
            onDone: function(e, s) {
                t.hide(), Helpdesk._show(e, s)
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        }), !1
    },
    sendVkPayCodeRequest: function(e) {
        var t = showFastBox({
                title: getLang("support_send_vkpay_code_request_to_user"),
                width: 500
            }, cur.sendVkPayCodeRequestBox, getLang("box_send"), function() {
                Helpdesk.doSendVkPayCodeRequest(val("tickets_send_comm"), t, e)
            }, getLang("global_cancel")),
            s = ge("tickets_send_comm");
        return s && autosizeSetup(s, {}), !1
    },
    doSendVkPayCodeRequest: function(e, t, s) {
        var o = geByClass1("flat_button", t.bodyNode);
        return ajax.post("helpdesk?act=a_send_vkpay_code_request", {
            ticket_id: cur.ticket_id,
            text: e,
            hash: s
        }, {
            onDone: function(e, s) {
                t.hide(), Helpdesk._show(e, s)
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        }), !1
    },
    takeToSection: function() {
        return ajax.post("helpdesk?act=a_take_to_section", {
            ticket_id: cur.ticket_id,
            hash: cur.hashes.next_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    dropTicket: function() {
        return ajax.post("helpdesk?act=a_drop_ticket", {
            ticket_id: cur.ticket_id,
            hash: cur.hashes.drop_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: Helpdesk._show
        }), !1
    },
    takeTicket: function() {
        return ajax.post("helpdesk?act=a_take_ticket", {
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
            onDone: function(e, s, o) {
                domInsertBefore(cf(e), ge("photos_choose_clear")), attr(t, "offset", s), o && hide(t)
            },
            onFail: removeClass.pbind(t, "photos_choose_more_loading"),
            showProgress: addClass.pbind(t, "photos_choose_more_loading"),
            hideProgress: removeClass.pbind(t, "photos_choose_more_loading")
        })
    },
    setTicketTag: function(e, t, s, o) {
        var a = hasClass(e, "secondary") ? 1 : 0;
        ajax.post("helpdesk?act=a_set_tag", {
            id: t,
            tid: s,
            hash: o,
            val: a
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggleClass(e, "secondary", !a)
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
    setSwitch: function(e, t, s, o) {
        ajax.post("helpdesk", {
            act: "a_set_switch",
            val: t,
            "switch": s,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(s) {
                var o = gpeByClass("_switch", e);
                toggleClass(o, "helpdesk_switch_enabled", t), val("helpdesk_switches_logs", s)
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
                            var o = geByClass1("tickets_check", s),
                                a = o ? geByClass1("checkbox", o) : null;
                            checkbox(a, !0)
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
            var o = attr(s, "ticket-id");
            e.push([s.href, o])
        });
        var t = setInterval(function() {
            if (!e.length) return void clearInterval(t);
            var s = e.shift();
            window.open(s[0], "helpdesk_show_" + s[1]), window.focus()
        }, 300)
    },
    checkTicketsChecked: function(e, t, s, o) {
        var a = Tickets.getCheckedArr();
        if (a.length) {
            uiTabs.switchTab(geByClass1("ui_tab", "tickets_tab_all"), {
                noAnim: 1
            });
            var i = showFastBox(getLang("support_ento_checked_leave_title"), getLang("support_ento_checked_leave_text"), getLang("global_continue"), function() {
                i.hide(), cur.checkedTickets = {}, nav.go(s)
            }, getLang("global_cancel"));
            return !1
        }
    },
    banContentChunk: function(e, t, s, o, a, i) {
        lockButton(i), ajax.post("al_helpdesk.php", {
            act: "claim_content_chunk",
            claim_id: e,
            reply_id: t,
            type: s,
            idx: o,
            hash: a
        }, {
            onDone: function() {
                unlockButton(i), val(i, getLang("helpdesk_content_banned")), disableButton(i, !0)
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
            var o = document.selection.createRange();
            o.moveStart("character", -t.length), s = o.text.length
        } else(e.selectionStart || "0" == e.selectionStart) && (s = e.selectionStart);
        var a = t.substring(0, s),
            i = t.substring(s),
            r = a.match(/(.+)$/);
        if (!r) return !1;
        each(geByClass("helpdesk_template_selected", "helpdesk_template_links"), function(e, t) {
            removeClass(t, "helpdesk_template_selected")
        }), r = r[1].toLowerCase(), console.log("Name part: %s", r);
        var n = [],
            c = [];
        if (each(cur.templates, function(e, t) {
                return r == t.title_low ? (n = [e], c = [r], !1) : void(0 == t.title_low.indexOf(r) && (n.push(e), c.push(t.title_low)))
            }), n.length > 1) {
            each(n, function(e, t) {
                addClass("template" + t, "helpdesk_template_selected")
            });
            for (var d = c.sort(), l = d[0], _ = d[d.length - 1], u = l.length, h = 0; u > h && l.charAt(h) === _.charAt(h);) h++;
            h > r.length && (val(e, a.substring(0, a.length - r.length) + l.substring(0, h) + i), elfocus(e, a.length - r.length + h))
        } else 1 == n.length && (val(e, a.substring(0, a.length - r.length) + i), elfocus(e, a.length - r.length), Helpdesk.selectTemplate(n[0]));
        return !1
    },
    toggleSectionStats: function(e) {
        var t = ge("helpdesk_section_stats_row" + e),
            s = ge("helpdesk_section_stats" + e),
            o = !isVisible(t);
        o ? (show(t), slideDown(s, 200)) : slideUp(s, 200, hide.pbind(t))
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
            o = !1,
            a = ge("helpdesk_edit_pattern_box__save");
        each(["title", "query", "message", "period", "frequency", "danger"], function(e, t) {
            var a = ge("helpdesk_edit_pattern_box__" + t),
                i = val(a);
            "" == i && "query" != t && "message" != t && (notaBene(a), o = !0), s[t] = i
        }), o || ajax.post("helpdesk", s, {
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a),
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
            o = isChecked(geByClass1("_helpdesk_ticket_vkmobile_send_autoanswer"));
        ajax.post("/helpdesk?act=a_pass_vkmobile", {
            text: e,
            ticket_id: cur.ticket_id,
            hash: t,
            auto_answer: o
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
            o = geByClass1("_marks", s),
            a = geByClass1("_inner", s);
        return t ? (addClass(s, "helpdesk_marked_user_row_processing"), void ajax.post("helpdesk?act=a_get_marked_user_row", {
            id: e
        }, {
            onDone: function(e, t) {
                val(o, e), val(a, t), removeClass(s, "helpdesk_marked_user_row_processing")
            }
        })) : (val(o, ""), void val(a, ""))
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
            each(cur.ticketAllAuthors, function(t, o) {
                e = t, s++
            })
        }
        if (s > 1) return void Helpdesk.showChooseUserToMarkBox();
        var o = cur.ticketAllAuthors[e];
        o && (cur.editMarksBox = showBox("helpdesk?act=user_marks_box", {
            id: e,
            hash: o.hash
        }, {
            params: {
                width: 550
            },
            onDone: Helpdesk.initMarksBox.pbind(e, o.hash, t)
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
        var o = geByClass1("text", e);
        disable(o, !t), t ? (o.removeAttribute("readonly"), s && elfocus(o)) : o.setAttribute("readonly", "readonly")
    },
    saveMarks: function(e, t, s) {
        var o = ge("helpdesk_edit_user_marks__save"),
            a = {
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
            a.marks.push(attr(t, "mark-id")), a.enabled.push(s ? 1 : 0), a.descr.push(s ? val(geByClass1("text", t)) : "");
            var o = geByClass1("_disable_expire", t);
            a.disable_expire.push(o && isChecked(o) ? 1 : 0)
        }), ajax.post("helpdesk?act=a_save_user_marks", a, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: function(t, o) {
                t && s && s(e, o), cur.editMarksBox.hide()
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
                var o = sech(t),
                    a = ge("helpdesk_marked_user_rows__list");
                each(o, function(e, t) {
                    ge(t.id) || a.appendChild(t)
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
            fixed_ticket_header: isChecked("helpdesk_settings_box_fixed_ticket_header") ? 1 : 0,
            ml_tags: isChecked("helpdesk_settings_box_ml_tags") ? 1 : 0
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
        if (!(!window.pageNode || !ge("tickets_header_filler") || document.documentElement.clientHeight < 650 || document.documentElement.clientWidth < 500)) {
            var e = scrollGetY(),
                t = ge("tickets_content"),
                s = getSize("page_header_cont")[1];
            if (t) {
                var o = getXY(t);
                Helpdesk.toggleFixedHeader(e + s >= o[1] + 30)
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
    takeRest: function(e, t, s) {
        buttonLocked(e) || (cur.helpdeskRestBox = showFastBox(getLang("global_warning"), getLang(s ? "helpdesk_need_a_rest_leave" : "helpdesk_need_a_rest"), getLang("helpdesk_take_rest"), function() {
            ajax.post("helpdesk?act=a_take_rest", {
                hash: t
            }, {
                progress: cur.helpdeskRestBox.progress,
                onDone: function(e) {
                    cur.helpdeskRestBox.hide(), Helpdesk.setActualTicketsContent(e[0], e[1])
                }
            })
        }, getLang("global_cancel")))
    },
    requestRest: function(e, t) {
        cur.helpdeskRequestRestBox = showBox("helpdesk?act=request_rest_box", {
            hash: t
        }, {
            params: {
                width: 500
            }
        })
    },
    doRequestRest: function() {
        return -1 == radioval("restType") ? notaBene("request_rest_types") : void ajax.post("helpdesk?act=a_create_rest_request", {
            type: radioval("restType"),
            reason: trim(val("request_rest_reason")),
            hash: cur.restRequestHash
        }, {
            progress: cur.helpdeskRequestRestBox.progress,
            onDone: function(e, t) {
                cur.helpdeskRequestRestBox.hide(), showDoneBox(e), Helpdesk.setActualTicketsContent(t[0], t[1])
            }
        })
    },
    doCancelRest: function() {
        var e = showFastBox(getLang("global_action_confirmation"), getLang("helpdesk_confirm_cancel_rest_request"), getLang("helpdesk_cancel_rest"), function() {
            e.hide(), ajax.post("helpdesk?act=a_cancel_rest_request", {
                hash: cur.restRequestHash
            }, {
                progress: cur.helpdeskRequestRestBox.progress,
                onDone: function(e, t) {
                    cur.helpdeskRequestRestBox.hide(), showDoneBox(e), Helpdesk.setActualTicketsContent(t[0], t[1])
                }
            })
        }, getLang("global_cancel"), null)
    },
    ticketStatusTT: function(e, t) {
        showTooltip(e, {
            text: t,
            dir: "bottom",
            typeClass: "tt_black",
            shift: [12, 8]
        })
    },
    toggleBookmarksTimerView: function(e, t) {
        t ? toggle("helpdesk_bookmarks_timer", e) : e ? slideDown("helpdesk_bookmarks_timer", 200) : slideUp("helpdesk_bookmarks_timer", 200), toggle("tickets_header_links_fav_timer_on", !e), toggle("tickets_header_links_fav_timer_off", e), toggleClass("tickets_bookmarks_menu", "tickets_actions_bookmarks_timer", e)
    },
    toggleBookmarksTimer: function(e) {
        Helpdesk.toggleBookmarksTimerView(e, !1), e ? Helpdesk.setFavoriteUntil(val("helpdesk_bookmarks_timer_date")) : Helpdesk.setFavoriteUntil(0)
    },
    toggleBookmarkIsFav: function(e) {
        Helpdesk.toggleBookmarkIsFavView(e), Helpdesk.setIsFavorite(e)
    },
    toggleBookmarkIsFavView: function(e) {
        toggle("tickets_header_links_fav_set_love_on", !e), toggle("tickets_header_links_fav_set_love_off", e), toggleClass("tickets_bookmarks_menu", "tickets_actions_bookmarks_love", e)
    },
    setDMCAStatus: function(btn, ticket_id, status, hash, sure, comment) {
        var params = {
            ticket_id: ticket_id,
            status: status,
            hash: hash
        };
        if (sure) params.comment = comment, ajax.post("helpdesk?act=a_change_dmca_status", params, {
            onDone: function(content, script) {
                content && val("tickets_content", content), script && eval(script)
            },
            onFail: function(e) {
                return Tickets.showMsgBox(e, getLang("global_error")), !0
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
        else var callback = 2 == status ? cur.showDeclineBox : cur.showApproveBox,
            box = callback(function() {
                var e = val("tickets_decline_dmca_comment") || "";
                box.hide(), Helpdesk.setDMCAStatus(btn, ticket_id, status, hash, !0, e)
            })
    },
    choosePhotoBox: function(e, t, s, o) {
        showBox("helpdesk?act=choose_photo_box", {
            to_id: e,
            section: t
        }, {
            params: {
                bodyStyle: "padding: 0px",
                title: !0
            },
            cache: 1,
            onFail: function() {
                var e = {
                    hideOnStart: !0,
                    target: s ? s : cur.lastMediaTarget
                };
                return o && (e.uploadData = o), Tickets.showAddScreenBox(Tickets.initPhotoUpload.pbind("tis_add_data", e)), !0
            }
        })
    },
    chooseDocBox: function(e, t, s, o) {
        showBox("helpdesk?act=choose_doc_box", {
            to_id: e,
            section: t
        }, {
            params: {
                bodyStyle: "padding: 0px",
                title: !0
            },
            onFail: function() {
                var e = {
                    hideOnStart: !0,
                    target: s ? s : cur.lastMediaTarget
                };
                return o && (e.uploadData = o), Tickets.showAddDocBox(Tickets.initDocUpload.pbind("tis_add_data", e)), !0
            }
        })
    },
    deleteCommentConfirm: function(e, t, s) {
        var o = showFastBox(getLang("global_warning"), getLang("helpdesk_confirm_im_reply_delete"), getLang("global_yes"), function() {
            Tickets.deleteComment(e, t, s), o.hide()
        }, getLang("global_cancel"))
    },
    showPayoutLogs: function(e, t) {
        showBox("helpdesk?act=payout_requests_log_box", {
            id: e,
            cid: t
        }, {
            params: {
                hideButtons: !0,
                width: 700
            }
        })
    },
    checkPayoutAvailable: function(e) {
        ajax.post("helpdesk?act=a_check_payout_available", {
            id: e
        }, {
            onDone: function(t) {
                t || addClass("helpdesk_header_links_send_payout_form" + e, "helpdesk_header_links_send_payout_form_disabled")
            }
        })
    },
    changeRestType: function(e, t) {
        radiobtn(e, t, "restType"), hasClass(e, "disabled") || (3 == t ? val("request_rest_save_button", getLang("helpdesk_start_rest")) : val("request_rest_save_button", cur.helpdeskRequestRestBoxButton))
    },
    willExpireTT: function(e, t) {
        showTooltip(e, {
            text: t,
            dir: "bottom",
            typeClass: "tt_black",
            showdt: 200
        })
    },
    moveToGroup: function(e) {
        cur.helpdeskMoveToGroupBox = showFastBox(getLang("helpdesk_move_ticket_to_group_title"), getTemplate("moveToGroup", {
            link: e
        }), getLang("helpdesk_move_ticket"), Helpdesk.doMoveToGroup), elfocus("helpdesk_move_to_group_link")
    },
    doMoveToGroup: function() {
        var e = trim(val("helpdesk_move_to_group_link"));
        return "" === e ? notaBene("helpdesk_move_to_group_link") : void ajax.post("helpdesk?act=a_move_to_group", {
            id: cur.ticket_id,
            hash: cur.hashes.to_group_hash,
            club: e
        }, {
            progress: cur.helpdeskMoveToGroupBox.progress,
            onDone: function(e, t) {
                cur.helpdeskMoveToGroupBox.hide(), Helpdesk._show(e, t)
            }
        })
    },
    _eof: 1
};
try {
    stManager.done("helpdesk.js")
} catch (e) {}