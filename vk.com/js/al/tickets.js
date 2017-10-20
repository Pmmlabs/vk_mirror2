var Tickets = {
    switchTab: function(e, t) {
        if (checkEvent(t)) return !0;
        var i = !1,
            a = ge("tickets_page_tabs");
        if (a ? (each(geByClass("page_tab_sel", ge("tickets_page_tabs")), function(e, t) {
                hasClass(t, "page_tab_sel") && (i = t, replaceClass(t, "page_tab_sel", "page_tab"))
            }), replaceClass(ge(e + "_tab"), "page_tab", "page_tab_sel")) : (each(geByClass("active_link", ge("tickets_tabs")), function(e, t) {
                hasClass(t, "active_link") && (i = t, removeClass(t, "active_link"))
            }), addClass(ge(e + "_tab"), "active_link")), toggle("stats_link", "stats" == e), "show" == e) return show("show_tab", "new_link"), hide("new_tab", "extra_tab"), !1;
        if ("new" == e) {
            hide("show_tab", "extra_tab", "new_link"), show("new_tab");
            var o = ge(e + "_tab");
            return a || (o = o.firstChild), cur.fromTopLink && (o += "&from=top"), nav.go(o, t, {
                onFail: function(t) {
                    return hide("new_tab"), show("show_tab", "new_link"), a ? (replaceClass(ge(e + "_tab"), "page_tab_sel", "page_tab"), i && replaceClass(i, "page_tab", "page_tab_sel")) : (removeClass(ge(e + "_tab"), "active_link"), i && addClass(i, "active_link")), setTimeout(showFastBox({
                        title: getLang("global_error"),
                        dark: !0,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, t).hide, 2e3), !0
                }
            })
        }
        if ("extra" != e) {
            hide("extra_tab", "show_tab", "new_tab"), show("new_link");
            var o = ge(e + "_tab");
            return a || (o = o.firstChild), o = o.href, ("all_history" == e || "history" == e) && nav.objLoc.q && ge(e + "_tab").firstChild && (o += "&q=" + nav.objLoc.q), nav.go(o, t)
        }
        hide("show_tab", "new_tab"), show("extra_tab", "new_link")
    },
    gotoTicket: function(e, t) {
        return Tickets.switchTab("show", t), nav.go(e, t)
    },
    getBrowser: function() {
        var e, t, i = !1,
            a = ["opera_mini", "opera_mobile", "safari_mobile", "msie_mobile", "bada", "android", "ipad", "ipod", "iphone", "mozilla", "opera", "chrome", "safari", "msie10", "msie9", "msie8", "msie7", "msie6", "msie"];
        for (var o in a)
            if (window.browser[a[o]] === !0) {
                i = a[o];
                break
            }
        if (window._ua && /yabrowser/i.test(_ua) && (i = "yabrowser"), i) {
            if (window.browser && browser.msie && (!browser.version || browser.version < 10)) t = "";
            else {
                var s = (window._ua.match(/.+(?:mini|bada|mobi)[\/: ]([\d.]+)/) || [0, "0"])[1];
                t = "0" != s ? " " + s : " " + window.browser.version
            }
            e = i + t
        } else e = navigator.userAgent.toLowerCase();
        var r = browser.flashfull;
        return e += "|" + r.major + "." + r.minor + "." + r.rev
    },
    showTooltip: function(e, t, i, a, o) {
        showTooltip(e, {
            dir: a ? "right" : "left",
            text: t,
            slideX: a ? -15 : 15,
            className: "tickets_side_tt " + i,
            shift: function() {
                var t = getSize(e.tt.container),
                    i = getSize(e),
                    o = 0;
                return o = a ? t[0] + 7 : -i[0] - 7, [o, 0, -(i[1] + t[1]) / 2]
            },
            forcetodown: !0,
            hasover: 1,
            onCreate: function() {
                o && removeEvent(e, "mouseout")
            }
        })
    },
    hideTooltip: function(e) {
        e.tt && e.tt.hide && e.tt.hide()
    },
    initExtraFields: function() {
        for (var e in cur.extraFields) {
            var t = cur.extraFields[e],
                i = ge("tickets_new_extra_field_" + e + "_inp");
            3 == t.required && cur.verifiedPage || (i ? (t.title && placeholderSetup(i, {
                back: !0
            }), t.note && (data(i, "note", t.note), addEvent(i, "focus", function(e) {
                var t = e.target;
                Tickets.showTooltip(t, '<div class="hint_wrap">' + data(t, "note") + "</div>", "extra_field", !0, !0)
            }), addEvent(i, "blur", Tickets.hideTooltip.pbind(i)))) : data(ge("tickets_new_extra_field_" + e), "value", ""))
        }
    },
    trySaveTicket: function(e, t) {
        var i = nav.objLoc.from;
        !t || "n" == i || "top" == i || "s" == i || "dislike" == i && nav.objLoc.id ? e() : Tickets.tryAskQuestion(function() {
            e()
        })
    },
    saveTicket: function(e, t) {
        var i = trim(val("tickets_title")),
            a = trim(val("tickets_text")),
            o = !0;
        i || (notaBene("tickets_title", !1, !o), o = !1);
        var s = [],
            r = cur.ticketsNewMedia.chosenMedias;
        if (r)
            for (var n in r) {
                var c = r[n],
                    l = c[0],
                    d = c[1];
                ("photo" == l || "doc" == l) && s.push(l + "," + d)
            }
        a || cur.descriptionNotNeeded || s.length || (notaBene("tickets_text", !1, !o), o = !1);
        var _ = Tickets.getBrowser(),
            u = {
                act: "save",
                title: i,
                text: a,
                hash: e,
                attachs: s,
                browser: _,
                section: cur.faqSection
            };
        if (cur.samples && cur.samples.audio || ge("audio_checking")) {
            u.audio_html = ge("audio_checking").innerHTML;
            var p = (cur.samples || {}).audio || "";
            window.ag && window.sh && (u.audio_html = u.audio_html.replace(/_info/g, "vkontakte_info")), (window.dwnl_video || window.add_js) && (u.audio_html = u.audio_html.replace(/_info/g, "dwnl_info")), u.audio_orig = ce("div", {
                innerHTML: p.replace(/z9q2m/g, "audio")
            }).innerHTML
        }
        nav.objLoc.mid && (u.mid = nav.objLoc.mid), nav.objLoc.gid && (u.gid = nav.objLoc.gid), nav.objLoc.app_id && (u.app_id = nav.objLoc.app_id), nav.objLoc.union_id && (u.union_id = nav.objLoc.union_id), cur.fromFaqId && (u.faq = cur.fromFaqId), cur.from ? u.from = cur.from : nav.objLoc.from && (u.from = nav.objLoc.from);
        for (var n in cur.extraFields) {
            var h = cur.extraFields[n],
                g = ge("tickets_new_extra_field_" + n + "_inp"),
                f = "",
                m = g;
            if (3 != h.required || !cur.verifiedPage) {
                g ? f = g.value.trim() : (m = ge("tickets_new_extra_field_" + n), f = data(m, "value"));
                var k = 1 == h.required || (2 == h.required || 3 == h.required) && !cur.verifiedPage;
                (!f && k || 4 == h.type && k && -1 == f.indexOf("vk.com")) && (notaBene(m, !1, !o), o = !1), u["extra_field_" + n] = f
            }
        }
        return o ? (nav.objLoc.mobile && (u.mobile = 1), nav.objLoc.bhash && (u.bhash = nav.objLoc.bhash), void Tickets.trySaveTicket(function() {
            if (39 == u.faqSection) {
                var e = ls.get("support_outdated_left");
                e && e.ts && Math.floor((new Date).getTime() / 1e3) - e.ts < 3600 && (u.outdated_ticket_id = e.id), ls.remove("support_outdated_left")
            }
            ajax.post(cur.objLoc, u, {
                onDone: function(e) {
                    showDoneBox(e)
                },
                showProgress: lockButton.pbind(ge("tickets_send")),
                hideProgress: unlockButton.pbind(ge("tickets_send"))
            })
        }, t)) : !1
    },
    savePayTicket: function(e) {
        var t = trim(val("tickets_title")),
            i = trim(val("tickets_text"));
        if (!t) return void notaBene("tickets_title");
        var a = [],
            o = cur.ticketsNewMedia.chosenMedias;
        if (o)
            for (var s in o) {
                var r = o[s],
                    n = r[0],
                    c = r[1];
                ("photo" == n || "doc" == n) && a.push(n + "," + c)
            }
        if (!i && !a.length) return void notaBene("tickets_text");
        if (Tickets.checkPayForm()) {
            var l = Tickets.getBrowser(),
                d = extend({
                    act: "save",
                    title: t,
                    text: i,
                    hash: e,
                    attachs: a,
                    browser: l,
                    section: cur.faqSection
                }, Tickets.getPayFields());
            if (nav.objLoc.gid && (d.gid = nav.objLoc.gid), nav.objLoc.app_id && (d.app_id = nav.objLoc.app_id), nav.objLoc.union_id && (d.union_id = nav.objLoc.union_id), cur.samples && cur.samples.audio || ge("audio_checking")) {
                d.audio_html = ge("audio_checking").innerHTML;
                var _ = (cur.samples || {}).audio || "";
                window.ag && window.sh && (d.audio_html = d.audio_html.replace(/_info/g, "vkontakte_info")), (window.dwnl_video || window.add_js) && (d.audio_html = d.audio_html.replace(/_info/g, "dwnl_info")), d.audio_orig = ce("div", {
                    innerHTML: _.replace(/z9q2m/g, "audio")
                }).innerHTML
            }
            "new_ads" == nav.objLoc.act && (d.section = 1), "new_pay" == nav.objLoc.act && (d.section = 16), ajax.post("support", d, {
                onDone: function(e) {
                    showDoneBox(e)
                },
                showProgress: lockButton.pbind(ge("tickets_send")),
                hideProgress: unlockButton.pbind(ge("tickets_send"))
            })
        }
    },
    saveDMCATicket: function(e) {
        if (Tickets.checkDMCAForm()) {
            var t = [],
                i = cur.ticketsNewMedia.chosenMedias;
            if (i)
                for (var a in i) {
                    var o = i[a],
                        s = o[0],
                        r = o[1];
                    ("photo" == s || "doc" == s) && t.push(s + "," + r)
                }
            var n = Tickets.getBrowser(),
                c = extend({
                    act: "save",
                    hash: e,
                    section: cur.faqSection,
                    attachs: t,
                    browser: n
                }, Tickets.getDMCAFields());
            if (cur.samples && cur.samples.audio || ge("audio_checking")) {
                c.audio_html = ge("audio_checking").innerHTML;
                var l = (cur.samples || {}).audio || "";
                window.ag && window.sh && (c.audio_html = c.audio_html.replace(/_info/g, "vkontakte_info")), (window.dwnl_video || window.add_js) && (c.audio_html = c.audio_html.replace(/_info/g, "dwnl_info")), c.audio_orig = ce("div", {
                    innerHTML: l.replace(/z9q2m/g, "audio")
                }).innerHTML
            }
            ajax.post("/support", c, {
                onDone: function(e) {
                    showDoneBox(e)
                },
                showProgress: lockButton.pbind(ge("tickets_send")),
                hideProgress: unlockButton.pbind(ge("tickets_send"))
            })
        }
    },
    checkDMCAForm: function() {
        var e = Tickets.getDMCAFields(),
            t = 1 == e.type,
            i = t ? "_legal" : "";
        if (!e.links || e.links.length < 9) return notaBene("tickets_links"), !1;
        if (!e.text) return notaBene("tickets_text"), !1;
        if (t) {
            if (!e.title) return notaBene("tickets_dmca_corp"), !1;
            if (!e.address || e.address.length < 9) return notaBene("tickets_dmca_address"), !1;
            if (!e.real_address || e.real_address.length < 9) return notaBene("tickets_dmca_real_address"), !1
        } else {
            if (!e.title) return notaBene("tickets_dmca_name"), !1;
            if (!e.passport_series) return notaBene("tickets_dmca_passport_series"), !1;
            if (!e.passport_number) return notaBene("tickets_dmca_passport_number"), !1;
            if (!e.passport_date) return notaBene("tickets_dmca_passport_date"), !1;
            if (!e.passport_issued_by) return notaBene("tickets_dmca_passport_issued_by"), !1
        }
        if (!e.phone || e.phone.length < 7) return notaBene("tickets_dmca_phone"), !1;
        if (!/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(e.email)) return notaBene("tickets_dmca_email"), !1;
        if (t) {
            if (!e.repr || e.repr.length < 5) return notaBene("tickets_dmca_repr"), !1;
            if (!e.post || e.post.length < 3) return notaBene("tickets_dmca_post"), !1
        }
        return isChecked("support_dmca_agree_owner" + i) ? isChecked("support_dmca_agree_unauthorized" + i) ? isChecked("support_dmca_agree_perjury" + i) ? isChecked("support_dmca_agree_email" + i) ? isChecked("support_dmca_agree_inform" + i) ? isChecked("support_dmca_agree_rules") ? !0 : Tickets.showMsgBox(getLang("help_ccform_need_rules"), getLang("global_error")) : Tickets.showMsgBox(getLang(t ? "help_ccform_legal_need_inform" : "help_ccform_natural_need_inform"), getLang("global_error")) : Tickets.showMsgBox(getLang(t ? "help_ccform_legal_need_email" : "help_ccform_natural_need_email"), getLang("global_error")) : Tickets.showMsgBox(getLang(t ? "help_ccform_legal_need_perjury" : "help_ccform_natural_need_perjury"), getLang("global_error")) : Tickets.showMsgBox(getLang(t ? "help_ccform_legal_need_unauthorized" : "help_ccform_natural_need_unauthorized"), getLang("global_error")) : Tickets.showMsgBox(getLang(t ? "help_ccform_legal_need_is_owner" : "help_ccform_natural_need_owner"), getLang("global_error"))
    },
    getDMCAFields: function() {
        var e = (trim(val("tickets_text")), trim(val("tickets_links")), {
            text: trim(val("tickets_text")),
            links: trim(val("tickets_links")),
            type: cur.dmcaType,
            phone: trim(val("tickets_dmca_phone")),
            fax: trim(val("tickets_dmca_fax")),
            email: trim(val("tickets_dmca_email"))
        });
        1 == cur.dmcaType ? (e.title = trim(val("tickets_dmca_corp")), e.ogrn = trim(val("tickets_dmca_ogrn")), e.inn = trim(val("tickets_dmca_inn")), e.address = trim(val("tickets_dmca_address")), e.real_address = trim(val("tickets_dmca_real_address")), e.repr = trim(val("tickets_dmca_repr")), e.post = trim(val("tickets_dmca_post"))) : (e.title = trim(val("tickets_dmca_name")), e.passport_series = trim(val("tickets_dmca_passport_series")), e.passport_number = trim(val("tickets_dmca_passport_number")), e.passport_date = trim(val("tickets_dmca_passport_date")), e.passport_issued_by = trim(val("tickets_dmca_passport_issued_by")));
        for (var t in e) "" === e[t] && delete e[t];
        return e
    },
    showMsgBox: function(e, t, i) {
        return setTimeout(showFastBox({
            title: t,
            dark: !0,
            bodyStyle: "line-height: 160%;",
            onHide: function() {
                i && ge(i).focus()
            }
        }, e).hide, 4e3), !1
    },
    checkPhone: function(e) {
        ajax.post("support", {
            act: "check_phone",
            phone: e
        }, {
            cache: 1,
            onDone: function(e) {
                cur.phone = e, val("tickets_number_from", e), e || notaBene("tickets_number_from")
            }
        })
    },
    checkPayForm: function() {
        if (void 0 === cur.payType) return cur.showErrorTT(ge("tickets_payment_type"), getLang("support_no_payment_type"), [-200, "show" == cur.section ? -103 : -113, 0]), !1;
        switch (cur.payType) {
            case 0:
                if (!cur.phone) return notaBene("tickets_number_from"), !1;
                break;
            case 1:
            case 4:
                if (4 == cur.payType) {
                    if (!floatval(val("tickets_pay_sum"))) return notaBene("tickets_pay_sum"), !1;
                    if (!trim(val("tickets_organisation"))) return notaBene("tickets_organisation"), !1
                }
                var e = Tickets.getReplyAttachs();
                if (!e.length) {
                    var t = 1 == cur.payType ? getLang("support_no_bill_photo") : getLang("support_no_payment_scan");
                    return setTimeout(showFastBox({
                        title: getLang("global_error"),
                        dark: !0,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, t).hide, 2e3), !1
                }
                break;
            case 2:
            case 3:
            case 5:
            case 7:
                if (2 == cur.payType) {
                    if (void 0 === cur.paySystem) return cur.showPaySysTT(), !1;
                    if (4 == cur.paySystem && !trim(val("tickets_paysystem_name"))) return notaBene("tickets_paysystem_name"), !1
                }
                if (!floatval(val("tickets_pay_sum"))) return notaBene("tickets_pay_sum"), !1;
                break;
            default:
                return !1
        }
        return !0
    },
    getPayFields: function() {
        var e = {};
        if (void 0 === cur.payType) return e;
        switch (e.pay_type = cur.payType, cur.payType) {
            case 0:
                e.pay_date = val("tickets_payment_date"), e.number_from = cur.phone, val("tickets_number_to") && (e.number_to = trim(val("tickets_number_to"))), val("tickets_sms_text") && (e.sms_text = trim(val("tickets_sms_text"))), val("tickets_payed_sum") && (e.payed_sum = trim(val("tickets_payed_sum")));
                break;
            case 1:
                e.pay_date = val("tickets_payment_date"), e.pay_email = val("tickets_id_email");
                break;
            case 2:
            case 3:
                e.pay_date = val("tickets_payment_date"), e.pay_sum = floatval(val("tickets_pay_sum")), e.pay_currency = cur.currencyDD.val(), 2 == cur.payType && (4 == cur.paySystem ? e.pay_system_name = trim(val("tickets_paysystem_name")) : e.pay_system = cur.paySystem);
                break;
            case 4:
                e.pay_day = val("tickets_payment_day"), e.pay_sum = floatval(val("tickets_pay_sum")), e.pay_org = trim(val("tickets_organisation"));
                break;
            case 5:
            case 7:
                e.pay_date = val("tickets_payment_date"), e.pay_sum = floatval(val("tickets_pay_sum"))
        }
        return e
    },
    getReplyQueryData: function(e, t, i) {
        var a, o = {
                act: "add_comment",
                ticket_id: cur.ticket_id,
                text: e,
                hash: t,
                attachs: i,
                hidden: isChecked("tickets_hidden"),
                copy_to_card: isChecked("copy_reply_to_card")
            },
            s = !1;
        for (var r in window.browser)
            if (window.browser[r] === !0) {
                s = r;
                break
            }
        a = s ? s + " " + window.browser.version : navigator.userAgent.toLowerCase();
        var n = browser.flashfull;
        if (a += "|" + n.major + "." + n.minor + "." + n.rev, o.browser = a, cur.samples && cur.samples.audio || ge("audio_checking")) {
            o.audio_html = ge("audio_checking").innerHTML;
            var c = (cur.samples || {}).audio || "";
            window.ag && window.sh && (o.audio_html = o.audio_html.replace(/_info/g, "vkontakte_info")), (window.dwnl_video || window.add_js) && (o.audio_html = o.audio_html.replace(/_info/g, "dwnl_info")), o.audio_orig = ce("div", {
                innerHTML: c.replace(/z9q2m/g, "audio")
            }).innerHTML
        }
        if (cur.getReplyDataFields) {
            var l = cur.getReplyDataFields();
            if (l === !1) return !1;
            extend(o, l)
        }
        return o
    },
    removeReplyDraft: function() {
        var e = "helpdesk_draft" + vk.id + "_" + cur.ticket_id;
        ls.get(e) && (ls.set(e, !1), ls.remove(e))
    },
    getReplyAttachs: function() {
        var e = [],
            t = cur.ticketsNewMedia.chosenMedias;
        return t && each(t, function(t, i) {
            var a = i[0],
                o = i[1];
            ("photo" == a || "doc" == a) && e.push(a + "," + o)
        }), e
    },
    addTicketReply: function(e, t) {
        if (ge("tickets_reply") && ge("tickets_reply").disabled) return !1;
        var i = trim(val("tickets_reply")),
            a = Tickets.getReplyAttachs();
        if (!i && !a.length) return t && Helpdesk && Helpdesk.closeTicket(e), elfocus("tickets_reply");
        if (cur.sendingAnswer) return !1;
        cur.sendingAnswer = !0;
        var o = Tickets.getReplyQueryData(i, e, a);
        if (o === !1) return !1;
        if (cur.checkedTickets) {
            var s = [];
            each(cur.checkedTickets, function(e, t) {
                s.push(e)
            }), o.similar = s.join(",")
        }
        Tickets.doSendReply(o), delete cur.photoUploadInd
    },
    addPayData: function(e) {
        if (Tickets.checkPayForm() && !cur.sendingAnswer) {
            var t = trim(val("tickets_reply")),
                i = Tickets.getReplyAttachs(),
                a = Tickets.getReplyQueryData(t, e, i);
            extend(a, Tickets.getPayFields()), Tickets.doSendReply(a)
        }
    },
    doSendReply: function(query) {
        Tickets.removeReplyDraft(), cur.sendingAnswer = !0, ajax.post(cur.objLoc, query, {
            onDone: function(content, script) {
                cur.sendingAnswer = !1, content && val("tickets_content", content), script && eval(script)
            },
            onFail: function() {
                cur.sendingAnswer = !1
            },
            showProgress: lockButton.pbind("tickets_send"),
            hideProgress: unlockButton.pbind("tickets_send")
        })
    },
    checkTextLength: function(e, t, i, a) {
        var o = trim(e.value).replace(/\n\n\n+/g, "\n\n");
        if (e.lastLen !== o.length) {
            var s = e.lastLen = o.length,
                r = s - o.replace(/\n/g, "").length;
            a = a || 10, i = ge(i), s > t - 100 || r > a || ("dmca" == cur.objLoc || "new_dmca" == nav.objLoc.act) && s > 0 ? (show(i), s > t ? i.innerHTML = getLang("text_exceeds_symbol_limit", s - t) : r > a ? i.innerHTML = getLang("global_recommended_lines", r - a) : i.innerHTML = getLang("text_N_symbols_remain", t - s)) : hide(i)
        }
    },
    editComment: function(cid, hash, ticket_id) {
        if (cur.editStarted) return !1;
        cur.editing && this.cancelEditComment(cur.editing);
        var cont = geByClass1("tickets_reply_text", ge("reply" + cid)),
            mrg = "-1px 0 0 -3px",
            wdt = "530px",
            picmrg = "0px";
        return browser.mozilla ? (mrg = "-1px 0 0 -4px", picmrg = "8px") : browser.opera ? (mrg = "1px 0 0 -3px", picmrg = "4px") : browser.msie && (picmrg = "2px"), cur.editStarted = !0, ajax.post(cur.objLoc, {
            act: "get_comment",
            ticket_id: cur.ticket_id || ticket_id,
            cid: cid,
            hash: hash
        }, {
            onDone: function(html, cur_data, attachs) {
                var canAttach = !0;
                if (cur_data && (cur_data.lang && (cur.lang = extend(cur.lang || {}, cur_data.lang), delete cur_data.lang), cur_data.script && (eval(cur_data.script), delete cur_data.script), cur_data.noAttaches && (canAttach = !1, delete cur_data.noAttaches), extend(cur, cur_data)), delete cur.editStarted, cont.parentNode.insertBefore(se(html), cont), canAttach) {
                    var attachOpts = {
                        limit: 5,
                        oneClick: cur.oneClickUpload,
                        target: "edit"
                    };
                    cur.addScreenShot && (attachOpts.photoCallback = cur.addScreenShot), cur.ticketsEditMedia = Tickets.initAddMedia(ge("tis_add_lnk_edit").firstChild, "tis_preview_edit", cur.mediaTypes, attachOpts)
                }
                var textDiv = geByClass1("tickets_reply_text", ge("reply" + cid)),
                    replyInput = ge("reply" + cid + "edit");
                setStyle(replyInput, "height", getSize(textDiv)[1]), hide(textDiv), hide(geByClass1("tickets_reply_actions", ge("reply" + cid))), hide("attachs" + cid), show("tickets_reply_edit" + cid), autosizeSetup(replyInput, {
                    minHeight: 34
                }), setTimeout(function() {
                    if (cur.editing = cid, canAttach)
                        for (var e in attachs) cur.ticketsEditMedia.chooseMedia(attachs[e][0], attachs[e][1], attachs[e][2]);
                    elfocus(replyInput)
                }, 0)
            },
            onFail: function(e) {
                return delete cur.editStarted, hide("reply_actions" + cid), Tickets.showError(e)
            }
        }), !1
    },
    saveComment: function(e, t, i, a) {
        return e && 27 == e.keyCode ? void this.cancelEditComment(cur.editing) : void(e && (e.ctrlKey || e.metaKey && browser.mac) && (10 == e.keyCode || 13 == e.keyCode) && this.doSaveComment(t, i, a))
    },
    cancelEditComment: function(e) {
        show(geByClass1("tickets_reply_text", ge("reply" + e))), show(geByClass1("tickets_reply_actions", ge("reply" + e))), show("attachs" + e), re("tickets_reply_edit" + e), delete cur.editing
    },
    doSaveComment: function(e, t, i) {
        var a = trim(val("reply" + e + "edit")),
            o = [],
            s = cur.ticketsEditMedia && cur.ticketsEditMedia.chosenMedias || [];
        if (s)
            for (var r in s) {
                var n = s[r],
                    c = n[0],
                    l = n[1];
                ("photo" == c || "doc" == c) && o.push(c + "," + l)
            }
        return a || o.length ? void ajax.post(cur.objLoc, {
            act: "edit_comment",
            ticket_id: i,
            cid: e,
            text: a,
            attachs: o,
            hash: t
        }, {
            onDone: function(t, i) {
                var a = geByClass1("tickets_reply_text", ge("reply" + e)),
                    o = geByClass1("tickets_reply_actions", ge("reply" + e));
                if (val(a, t), show(geByClass1("tickets_reply_text", ge("reply" + e))), show(o), show("attachs" + e), 0 !== i)
                    if (i) {
                        var s = ge("attachs" + e);
                        s || (s = o.parentNode.insertBefore(ce("div", {
                            id: "attachs" + e,
                            className: "clear_fix tr_attachs"
                        }), o)), val(s, i)
                    } else re("attachs" + e);
                re("tickets_reply_edit" + e), delete cur.editing
            },
            onFail: function(t) {
                return hide("reply_actions" + e), Tickets.showError(t)
            },
            showProgress: lockButton.pbind("save_butn" + e),
            hideProgress: unlockButton.pbind("save_butn" + e)
        }) : void notaBene("reply" + e + "edit")
    },
    deleteComment: function(e, t, i) {
        return ajax.post(cur.objLoc, {
            act: "delete_comment",
            ticket_id: cur.ticket_id || i,
            cid: e,
            hash: t
        }, {
            onDone: function(t) {
                var i = ge("reply" + e).firstChild;
                i && (cur.deletedComments || (cur.deletedComments = []), cur.deletedComments[e] = val(i), val(i, t))
            },
            onFail: function(t) {
                return hide("reply_actions" + e), Tickets.showError(t)
            }
        }), !1
    },
    restoreComment: function(e, t, i) {
        return ajax.post(cur.objLoc, {
            act: "restore_comment",
            ticket_id: cur.ticket_id || i,
            cid: e,
            hash: t
        }, {
            onDone: function(t) {
                var i = ge("reply" + e).firstChild;
                i && val(i, cur.deletedComments[e])
            },
            onFail: function(t) {
                return hide("reply_actions" + e), Tickets.showError(t)
            }
        }), !1
    },
    rateComment: function(e, t, i) {
        return cur.replyRating ? !1 : (cur.replyRating = !0, ajax.post("support", {
            act: "rate_comment",
            ticket_id: cur.ticket_id,
            reply_id: e,
            rate: t,
            hash: i
        }, {
            onDone: function(t) {
                delete cur.replyRating, ge("reply_actions" + e).innerHTML = t
            },
            onFail: function() {
                delete cur.replyRating
            }
        }), !1)
    },
    deleteTicket: function(e, t) {
        var i = showFastBox({
            title: getLang("support_delete_title"),
            dark: !0,
            bodyStyle: "padding: 20px; line-height: 160%;",
            width: 430
        }, getLang("support_delete_confirm"), getLang("support_delete_button"), function() {
            ajax.post(cur.objLoc, {
                act: "delete",
                ticket_id: e,
                hash: t
            }, {
                progress: i.progress,
                onFail: function(e) {
                    i.hide()
                }
            })
        }, getLang("global_cancel"));
        return !1
    },
    showMsg: function(e) {
        var t = ge("tickets_msg");
        if (!t) {
            var i;
            switch (cur.section) {
                case "list":
                    i = ge("tickets_list");
                    break;
                case "new_faq":
                    i = ge("tickets_faq_msg"), show("tickets_faq_msg");
                    break;
                case "show":
                default:
                    i = ge("tickets_reply_rows")
            }
            i && (t = i.insertBefore(ce("div", {
                id: "tickets_msg",
                className: "msg"
            }), i.firstChild))
        }
        return re("tickets_error"), t && (t.innerHTML = e, t.style.backgroundColor = "#F4EBBD", animate(t, {
            backgroundColor: "#F9F6E7"
        }, 2e3)), !0
    },
    showError: function(e) {
        var t = ge("tickets_error");
        if (!t) {
            var i;
            switch (cur.section) {
                case "list":
                    i = ge("tickets_list");
                    break;
                case "new_faq":
                    i = ge("tickets_faq_msg"), show("tickets_faq_msg");
                    break;
                case "history":
                case "show":
                default:
                    i = ge("tickets_reply_rows")
            }
            i && (t = i.insertBefore(ce("div", {
                id: "tickets_error",
                className: "error"
            }), i.firstChild))
        }
        return re("tickets_msg"), hide("tickets_progress"), t && (t.innerHTML = e, t.style.backgroundColor = "#FACEBB", animate(t, {
            backgroundColor: "#FFEFE8"
        }, 2e3)), scrollToTop(200), !0
    },
    closeTicketByAuthor: function(e) {
        ajax.post("support", {
            act: "close_ticket_by_author",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            onDone: addClass.pbind("tickets_thank_you_form", "you_re_welcome"),
            showProgress: addClass.pbind("tickets_thank_you_form", "processing"),
            hideProgress: removeClass.pbind("tickets_thank_you_form", "processing")
        })
    },
    reopenTicketByAuthor: function(e) {
        return ajax.post("support", {
            act: "reopen_ticket_by_author",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            onDone: removeClass.pbind("tickets_thank_you_form", "you_re_welcome"),
            showProgress: addClass.pbind("tickets_thank_you_form", "processing"),
            hideProgress: removeClass.pbind("tickets_thank_you_form", "processing")
        }), !1
    },
    showPostField: function() {
        hide("tickets_thank_you_form"), addClass("tickets_post_form__panel", "tickets_post_form__panel_shown"), show("tickets_post_field"), autosizeSetup("tickets_reply", {
            minHeight: 50,
            maxHeight: 500
        }), elfocus("tickets_reply")
    },
    hidePostField: function() {
        show("tickets_thank_you_form"), hide("tickets_post_field")
    },
    showAllReplies: function() {
        var link = ge("show_all_replies_link"),
            pr = geByClass1("progress", link),
            label = geByClass1("label", link);
        return hide(label), show(pr), ajax.post(cur.objLoc, {
            act: "show",
            id: cur.ticket_id,
            all: 1
        }, {
            onDone: function(content, script) {
                content && val("tickets_reply_rows", content), script && eval(script)
            },
            onFail: function() {
                show(label), hide(pr)
            }
        }), !1
    },
    showPhoto: function(e, t, i) {
        var a = curBox();
        if (!a) return showPhoto(e, t, i);
        var o = [];
        each(geByTag("button", a.bodyNode.nextSibling), function() {
            o.push([this.innerHTML, this.onclick, hasClass(this, "flat_button") ? "yes" : "no"])
        }), cur.boxBackup = {
            body: document.createDocumentFragment(),
            width: getSize(a.bodyNode.parentNode)[0],
            hideButtons: !isVisible(a.bodyNode.nextSibling),
            bodyStyle: a.bodyNode.getAttribute("style"),
            title: geByClass1("box_title", a.bodyNode.previousSibling).innerHTML,
            btns: o
        };
        var s = a.bodyNode;
        return cur.scrollTopBack = boxLayerWrap.scrollTop, i.onShow = function() {
            for (; s.firstChild;) cur.boxBackup.body.appendChild(s.firstChild)
        }, i.onHide = function() {
            box = showFastBox("", ""), box.setOptions({
                hideButtons: cur.boxBackup.hideButtons,
                title: cur.boxBackup.title,
                bodyStyle: cur.boxBackup.bodyStyle,
                width: cur.boxBackup.width
            }), box.bodyNode.appendChild(cur.boxBackup.body), cur.boxBackup.btns && (box.removeButtons(), each(cur.boxBackup.btns.reverse(), function() {
                box.addButton.apply(box, this)
            })), box.setOptions({}), boxLayerWrap.scrollTop = cur.scrollTopBack
        }, showPhoto(e, t, i)
    },
    showAddScreenBox: function(e) {
        var t = {
            title: getLang("support_adding_screen"),
            width: 450,
            bodyStyle: "padding: 0px",
            dark: 1
        };
        return e && (t.onShow = e), showFastBox(t, cur.screenBox)
    },
    showAddDocBox: function(e) {
        var t = {
            title: getLang("support_adding_doc"),
            width: 450,
            bodyStyle: "padding: 0px",
            dark: 1
        };
        return e && (t.onShow = e), showFastBox(t, cur.docBox)
    },
    showAddExtraFieldFileBox: function(e, t) {
        return showFastBox({
            onShow: Tickets.initExtraFieldUpload.pbind("tis_add_data", {
                hideOnStart: !0,
                fieldIndex: e,
                withSize: t
            }),
            title: getLang("support_adding_image"),
            width: 460,
            bodyStyle: "padding: 0px",
            dark: 1,
            hideButtons: !0
        }, cur.extraFieldsBox)
    },
    choosePhotoUploaded: function(e, t, i) {
        var a = void 0 !== e.ind ? e.ind : e,
            o = (e.fileName || e).replace(/[&<>"']/g, ""),
            s = e.fileName ? a + "_" + e.fileName : e,
            r = ge("upload" + s + "_progress_wrap");
        r && hide(geByClass1("progress_x", r)), ajax.post("al_photos.php", extend({
            act: "choose_uploaded_support"
        }, t), {
            onDone: function(e, t) {
                i.chooseMedia("photo", e, extend(t, {
                    upload_ind: a + "_" + o
                }))
            },
            onFail: Tickets.chooseFail.pbind(i, e)
        })
    },
    chooseDocUploaded: function(e, t, i) {
        var a = void 0 !== e.ind ? e.ind : e,
            o = e.fileName ? a + "_" + e.fileName : e,
            s = ge("upload" + o + "_progress_wrap");
        s && hide(geByClass1("progress_x", s)), ajax.post("docs.php", extend({
            act: "a_save_doc",
            from: "choose",
            support_hash: cur.uploadDocData.support_hash
        }, t), {
            onDone: function(e, t, a) {
                re("upload" + o + "_progress_wrap");
                var s = curBox();
                s && (cur.preventBoxHide = !0), i.chooseMedia("doc", e + "_" + t, a), s && (cur.preventBoxHide = !1)
            },
            onFail: Tickets.chooseFail.pbind(i, e)
        })
    },
    chooseExtraFieldUploaded: function(e, t, i) {
        var a = void 0 !== t.ind ? t.ind : t,
            o = (t.fileName || t).replace(/[&<>"']/g, ""),
            s = t.fileName ? a + "_" + t.fileName : t,
            r = ge("upload" + s + "_progress_wrap");
        r && hide(geByClass1("progress_x", r)), ajax.post("al_photos.php", extend({
            act: "choose_uploaded_support"
        }, i), {
            onDone: function(t, i) {
                Tickets.chooseExtraFieldComplete(e, t, extend(i, {
                    upload_ind: a + "_" + o
                }))
            },
            onFail: function(e) {
                Tickets.chooseFail(null, t, e)
            },
            hideProgress: removeClass.pbind("tickets_new_extra_field__uploaded_" + e, "tickets_new_extra_field__uploaded_p")
        })
    },
    removeExtraFieldFile: function(e, t) {
        var i = e.target.parentNode;
        i.tt && i.tt.hide && i.tt.hide();
        var a = ge("tickets_new_extra_field__uploaded_" + t);
        removeClass(a, "tickets_new_extra_field__uploaded_c"), removeClass(a, "tickets_new_extra_field__uploaded_p"), re("tickets_new_extra_field__file_" + t), hide("tis_add_lnk"), show("tickets_new_extra_field__upload_btn_" + t, "tickets_new_extra_field__example_" + t), data(ge("tickets_new_extra_field_" + t), "value", "")
    },
    allExtraFieldFilesUploaded: function() {
        for (var e in cur.extraFields) {
            var t = cur.extraFields[e];
            if (6 == t.type || 7 == t.type || 8 == t.type) {
                var i = data(ge("tickets_new_extra_field_" + e), "value");
                if (!i) return !1
            }
        }
        return !0
    },
    chooseExtraFieldComplete: function(e, t, i) {
        if (void 0 === i.upload_ind) return !1;
        isObject(i) || (i = {
            thumb_m: i[0] || "",
            thumb_s: i[1] || "",
            list: i[2] || "",
            view_opts: i[3] || "",
            upload_ind: i.upload_ind || void 0
        }), vkImage().src = i.thumb_m;
        var a = "<div onclick=\"return Tickets.showPhoto('" + t + "', '" + i.list + "', " + i.view_opts.replace(/"/g, "&quot;") + ');" class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + i.thumb_m + '" /></div>',
            o = se('<div class="page_preview_photo_wrap" id="tickets_new_extra_field__file_' + e + '">' + a + '<div class="page_media_x_wrap inl_bl" ' + (browser.msie ? "title" : "tootltip") + '="' + getLang("dont_attach") + '" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [13, 3, 3], black: 1})"><div class="page_media_x" onclick="Tickets.removeExtraFieldFile(event, ' + e + ');"></div></div></div>');
        re("upload" + i.upload_ind + "_progress_wrap"), data(ge("tickets_new_extra_field_" + e), "value", t);
        var s = ge("tickets_new_extra_field__uploaded_" + e);
        return s.appendChild(o), removeClass(s, "tickets_new_extra_field__uploaded_p"), addClass(s, "tickets_new_extra_field__uploaded_c"), cur.fileApiUploadStarted || boxQueue.hideLast(), cur.lastPostMsg = !1, void 0 !== i.upload_ind && delete i.upload_ind, Tickets.allExtraFieldFilesUploaded() && show("tis_add_lnk"), !1
    },
    chooseFail: function(e, t, i) {
        var a = void 0 !== t.ind ? t.ind : t;
        (t.fileName || t).replace(/[&<>"']/g, "");
        if ("fileApi" == Upload.types[a] && !Upload.options[a].wiki_editor) {
            var o = t.fileName ? a + "_" + t.fileName : t;
            e && re("upload" + o + "_progress_wrap")
        }
        var s = "",
            r = (Upload.options[a] || {}).type || "";
        "doc" == r ? s = getLang("support_upload_fail") : "photo" == r && (s = getLang("support_photo_upload_fail")), s && setTimeout(showFastBox({
            title: getLang("global_error"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, s).hide, 4e3), topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + a) || {}).action
        }), Upload.embed(a)
    },
    initPhotoUpload: function(el, params) {
        if (el = ge(el)) {
            var uploadData = cur.uploadPhotoData,
                opts = (uploadData || {}).options,
                addMedia;
            switch (params.target) {
                case "auto":
                    addMedia = cur.ticketsAutoMedia, uploadData = cur.autoUploadData, opts = uploadData.options;
                    break;
                case "template":
                    addMedia = cur.ticketsTemplateMedia, uploadData = cur.templateUploadData, opts = uploadData.options;
                    break;
                case "edit":
                    addMedia = cur.ticketsEditMedia;
                    break;
                case "new":
                default:
                    addMedia = cur.ticketsNewMedia
            }
            return Upload.init(el, uploadData.url, uploadData.vars, {
                file_name: "photo",
                file_size_limit: 5242880,
                file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF",
                accept: "image/jpeg,image/png,image/gif",
                file_match: ".(gif|jpg|jpeg|png)$",
                lang: opts.lang,
                onUploadStart: function(e, t) {
                    var i = void 0 !== e.ind ? e.ind : e,
                        a = Upload.options[i];
                    "form" == Upload.types[i] && (geByClass1("file", el).disabled = !0), "fileApi" == Upload.types[i] && (cur.notStarted && (params && params.hideOnStart && boxQueue.hideLast(), delete cur.notStarted), a.multi_progress && this.onUploadProgress(e, 0, 0))
                },
                onUploadComplete: function(info, res) {
                    var params;
                    try {
                        params = eval("(" + res + ")")
                    } catch (e) {
                        params = q2ajx(res)
                    }
                    return params.photos ? void Tickets.choosePhotoUploaded(info, params, addMedia) : void Upload.onUploadError(info)
                },
                onUploadProgress: function(e, t, i) {
                    var a = void 0 !== e.ind ? e.ind : e;
                    if ("fileApi" == Upload.types[a]) {
                        var o = (cur.attachMediaIndexes || {})[a];
                        if (void 0 === o || o && cur.addMedia[o].chosenMedia) {
                            var s = {
                                loaded: t,
                                total: i
                            };
                            e.fileName && (s.fileName = e.fileName.replace(/[&<>"']/g, "")), addMedia.showMediaProgress("photo", a, s)
                        }
                    } else if ("flash" == Upload.types[a]) {
                        if (!ge("form" + a + "_progress")) {
                            for (var r = Upload.obj[a], n = getSize(r)[1], c = n / 2 + 10, l = r.firstChild; l;) 1 == l.nodeType && (l.id == "uploader" + a && browser.msie ? setStyle(l, {
                                position: "relative",
                                left: "-5000px"
                            }) : setStyle(l, {
                                visibility: "hidden"
                            })), l = l.nextSibling;
                            r.appendChild(ce("div", {
                                innerHTML: '<div class="tickets_progress_wrap">            <div id="form' + a + '_progress" class="tickets_progress" style="width: 0%;"></div>          </div></div>'
                            }, {
                                height: c + "px",
                                marginTop: -c + "px"
                            }))
                        }
                        var d = intval(t / i * 100);
                        setStyle(ge("form" + a + "_progress"), {
                            width: d + "%"
                        })
                    }
                },
                onUploadError: Tickets.chooseFail.pbind(addMedia),
                onUploadCompleteAll: function(e) {
                    var t = void 0 !== e.ind ? e.ind : e;
                    "fileApi" !== Upload.types[t] && (params.hideOnStart ? boxQueue.hideLast() : Upload.embed(t))
                },
                multiple: 1,
                multi_progress: 1,
                max_files: params && params.max_files || 5,
                max_files_hide_last: 1,
                clear: 1,
                type: "photo",
                max_attempts: 3,
                file_input: cur.uploadInput,
                server: opts.server,
                error: opts.default_error,
                error_hash: opts.error_hash,
                dropbox: "tis_dropbox"
            })
        }
    },
    initDocUpload: function(el, params) {
        if (el = ge(el)) {
            var uploadData = params.uploadData || cur.uploadDocData,
                opts = uploadData.options,
                addMedia;
            switch (params.target) {
                case "auto":
                    addMedia = cur.ticketsAutoMedia;
                    break;
                case "template":
                    addMedia = cur.ticketsTemplateMedia;
                    break;
                case "edit":
                    addMedia = cur.ticketsEditMedia;
                    break;
                case "new":
                default:
                    addMedia = cur.ticketsNewMedia
            }
            return Upload.init(el, uploadData.url, uploadData.vars, {
                file_name: "file",
                file_size_limit: 209715200,
                file_types_description: "Documents",
                file_types: "*.*;",
                file_disallowed_types: params.disallowedFileTypes ? params.disallowedFileTypes : !1,
                lang: opts.lang,
                onUploadStart: function(e, t) {
                    var i = void 0 !== e.ind ? e.ind : e,
                        a = Upload.options[i];
                    "form" == Upload.types[i] && (geByClass1("file", el).disabled = !0), "fileApi" == Upload.types[i] && (cur.notStarted && (params && params.hideOnStart && boxQueue.hideLast(), delete cur.notStarted), a.multi_progress && this.onUploadProgress(e, 0, 0))
                },
                onUploadComplete: function(info, res) {
                    var fileName = (info.fileName || info).replace(/[&<>"']/g, ""),
                        params;
                    try {
                        params = eval("(" + res + ")")
                    } catch (e) {
                        params = q2ajx(res)
                    }
                    return params.file ? void Tickets.chooseDocUploaded(info, params, addMedia) : void Upload.onUploadError(info)
                },
                onUploadProgress: function(e, t, i) {
                    var a = void 0 !== e.ind ? e.ind : e;
                    if ("fileApi" == Upload.types[a]) {
                        var o = (cur.attachMediaIndexes || {})[a];
                        if (void 0 === o || o && cur.addMedia[o].chosenMedia) {
                            var s = {
                                loaded: t,
                                total: i
                            };
                            e.fileName && (s.fileName = e.fileName.replace(/[&<>"']/g, "")), addMedia.showMediaProgress("doc", a, s)
                        }
                    } else if ("flash" == Upload.types[a]) {
                        if (!ge("form" + a + "_progress")) {
                            for (var r = Upload.obj[a], n = getSize(r)[1], c = n / 2 + 10, l = r.firstChild; l;) 1 == l.nodeType && (l.id == "uploader" + a && browser.msie ? setStyle(l, {
                                position: "relative",
                                left: "-5000px"
                            }) : setStyle(l, {
                                visibility: "hidden"
                            })), l = l.nextSibling;
                            r.appendChild(ce("div", {
                                innerHTML: '<div class="tickets_progress_wrap">            <div id="form' + a + '_progress" class="tickets_progress" style="width: 0%;"></div>          </div></div>'
                            }, {
                                height: c + "px",
                                marginTop: -c + "px"
                            }))
                        }
                        var d = intval(t / i * 100);
                        setStyle(ge("form" + a + "_progress"), {
                            width: d + "%"
                        })
                    }
                },
                onCheckComplete: params && params.onCheckComplete || !1,
                onUploadError: Tickets.chooseFail.pbind(addMedia),
                onUploadCompleteAll: function(e) {
                    var t = void 0 !== e.ind ? e.ind : e;
                    "fileApi" !== Upload.types[t] && (params.hideOnStart ? boxQueue.hideLast() : Upload.embed(t))
                },
                multiple: 1,
                multi_progress: 1,
                max_files: params && params.max_files || 5,
                max_files_hide_last: 1,
                clear: 1,
                type: "doc",
                max_attempts: 3,
                file_input: cur.uploadInput,
                server: opts.server,
                error: opts.default_error,
                error_hash: opts.error_hash,
                dropbox: "tis_dropbox"
            })
        }
    },
    showExtraFieldProgress: function(e, t, i, a) {
        var o = i.loaded / i.total,
            s = intval(100 * o),
            r = (i.fileName || i.name || "").replace(/[&<>"']/g, ""),
            n = r ? t + "_" + r : t,
            c = r ? r.length > 33 ? r.substr(0, 30) + "..." : r : "",
            l = ge("upload" + n + "_progress");
        if (l)
            if (show(l), l.full) {
                var d = i(l, "tween"),
                    _ = intval(l.full * o);
                d && d.isTweening ? d.to.width = _ : animate(l, {
                    width: _ + "px"
                }, 500)
            } else setStyle(l, {
                width: s + "%"
            });
        else {
            hide("tickets_new_extra_field__upload_btn_" + e, "tickets_new_extra_field__example_" + e);
            var u = ge("tickets_new_extra_field__uploaded_" + e);
            addClass(u, "tickets_new_extra_field__uploaded_p"), cur.attachMediaIndexes || (cur.attachMediaIndexes = {}), cur.attachMediaIndexes[n] = a;
            var p = '<div><div class="page_attach_progress_wrap">  <div id="upload' + n + '_progress" class="page_attach_progress"></div></div></div></div>' + (c ? '<div class="attach_label">' + c + "</div>" : "") + '<div class="progress_x" onmouseover="showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [6, 3, 3]})" onclick="Upload.terminateUpload(' + t + ", '" + (r || t) + "');\"></div>";
            u.appendChild(ce("div", {
                id: "upload" + n + "_progress_wrap",
                innerHTML: p,
                className: "clear_fix upload_" + t + "_progress"
            })), show(u), l = ge("upload" + n + "_progress"), l.full = !1, s ? setStyle(l, {
                width: l.full ? intval(l.full * o) + "px" : s + "%"
            }) : (setStyle(l, {
                width: "1px"
            }), hide(l))
        }
    },
    initExtraFieldUpload: function(el, params) {
        if (el = ge(el)) {
            var about = ge("tis_about");
            about && (about.innerHTML = getLang(params.withSize ? "support_extra_field_limits_photo" : "support_extra_field_limits"));
            var uploadData = cur.uploadExtraFieldsData,
                opts = uploadData.options,
                fieldIndex = params.fieldIndex;
            return Upload.init(el, uploadData.url, uploadData.vars, {
                file_name: "file",
                file_size_limit: 10485760,
                file_types_description: "Image files (*.jpg, *.jpeg, *.png)",
                file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG",
                accept: "image/jpeg,image/png",
                file_match: ".(jpg|jpeg|png)$",
                lang: opts.lang,
                onUploadStart: function(e, t) {
                    var i = void 0 !== e.ind ? e.ind : e,
                        a = Upload.options[i];
                    "form" == Upload.types[i] && (geByClass1("file", el).disabled = !0), "fileApi" == Upload.types[i] && (cur.notStarted && (params && params.hideOnStart && boxQueue.hideLast(), delete cur.notStarted), a.multi_progress && this.onUploadProgress(e, 0, 0))
                },
                onUploadComplete: function(info, res) {
                    var params;
                    try {
                        params = eval("(" + res + ")")
                    } catch (e) {
                        params = q2ajx(res)
                    }
                    return params.photos ? void Tickets.chooseExtraFieldUploaded(fieldIndex, info, params) : void Upload.onUploadError(info)
                },
                onUploadProgress: function(e, t, i) {
                    var a = void 0 !== e.ind ? e.ind : e;
                    if ("fileApi" == Upload.types[a]) {
                        var o = (cur.attachMediaIndexes || {})[a],
                            s = {
                                loaded: t,
                                total: i
                            };
                        e.fileName && (s.fileName = e.fileName.replace(/[&<>"']/g, "")), Tickets.showExtraFieldProgress(fieldIndex, a, s, o)
                    } else if ("flash" == Upload.types[a]) {
                        if (!ge("form" + a + "_progress")) {
                            for (var r = Upload.obj[a], n = getSize(r)[1], c = n / 2 + 10, l = r.firstChild; l;) 1 == l.nodeType && (l.id == "uploader" + a && browser.msie ? setStyle(l, {
                                position: "relative",
                                left: "-5000px"
                            }) : setStyle(l, {
                                visibility: "hidden"
                            })), l = l.nextSibling;
                            r.appendChild(ce("div", {
                                innerHTML: '<div class="tickets_progress_wrap">          <div id="form' + a + '_progress" class="tickets_progress" style="width: 0%;"></div>        </div></div>'
                            }, {
                                height: c + "px",
                                marginTop: -c + "px"
                            }))
                        }
                        var d = intval(t / i * 100);
                        setStyle(ge("form" + a + "_progress"), {
                            width: d + "%"
                        })
                    }
                },
                onCheckComplete: !1,
                onUploadError: function() {},
                onUploadCompleteAll: function(e) {
                    var t = void 0 !== e.ind ? e.ind : e;
                    "fileApi" !== Upload.types[t] && (params.hideOnStart ? boxQueue.hideLast() : Upload.embed(t))
                },
                multiple: !1,
                multi_progress: 1,
                clear: 1,
                type: "photo",
                max_attempts: 3,
                file_input: null,
                server: opts.server,
                error: opts.default_error,
                error_hash: opts.error_hash,
                dropbox: "tis_dropbox"
            })
        }
    },
    __getFormUploadIds: function(e) {
        switch (e) {
            case "auto":
                return ["tis_upload_auto", "tis_uploader_auto"];
            case "template":
                return ["tis_upload_template", "tis_uploader_template"];
            case "edit":
                return ["tis_upload_edit", "tis_uploader_edit"];
            case "new":
            default:
                return ["tis_upload", "tis_uploader"]
        }
    },
    __photoMediaHandler: function(e) {
        var t = e.target || "new";
        stManager.add("upload.js", function() {
            e.photoCallback ? (cur.lastMediaTarget = t, e.photoCallback()) : e.oneClick ? ge("tickets_photo_input" + t).click() : Tickets.showAddScreenBox(Tickets.initPhotoUpload.pbind("tis_add_data", {
                hideOnStart: !0,
                target: t
            }))
        })
    },
    __docMediaHandler: function(e) {
        var t = e.target || "new";
        stManager.add("upload.js", function() {
            e.docCallback ? (cur.lastMediaTarget = t, e.docCallback()) : e.oneClick ? ge("tickets_doc_input" + t).click() : Tickets.showAddDocBox(Tickets.initDocUpload.pbind("tis_add_data", {
                hideOnStart: !0,
                target: t,
                disallowedFileTypes: cur.disallowedFileTypes
            }))
        })
    },
    initAddMedia: function(e, t, i, a) {
        var o = new MediaSelector(e, t, i, extend(a, {
            disabledTypes: ["share", "page"],
            mediaHandlers: {
                photo: Tickets.__photoMediaHandler,
                doc: Tickets.__docMediaHandler
            }
        }));
        return a.oneClick && (Tickets.__initOneClickMediaUpload("photo", a, Tickets.initPhotoUpload), Tickets.__initOneClickMediaUpload("doc", a, Tickets.initDocUpload)), o
    },
    __initOneClickMediaUpload: function(e, t, i) {
        var a = t.target || "new",
            o = Tickets.__getFormUploadIds(a),
            s = "tickets_" + e + "_input" + a,
            r = ge(s);
        r || ge(o[0]).appendChild(ce("input", {
            type: "file",
            multiple: "true",
            id: s,
            onchange: function() {
                data(this, "changed", !0), cur.uploadInput = this, i(o[1], {
                    target: a
                })
            }
        }))
    },
    toggleFAQRow: function(e, t, i, a) {
        return a.target || (a.target = a.srcElement || document), "a" == a.target.tagName.toLowerCase() ? !0 : (toggle("tickets_faq_short_text" + e, !isVisible("tickets_faq_short_text" + e)), toggle("tickets_faq_full_text" + e, !isVisible("tickets_faq_full_text" + e)), isVisible("tickets_faq_full_text" + e) ? (addClass(i, "detailed"), vk.id && Tickets.setFAQclicked(e, t, 0, !1)) : (removeClass(i, "detailed"), Tickets.cancelFAQclicked(e)), !1)
    },
    setFAQclicked: function(e, t, i, a) {
        a ? (clearTimeout(cur.faqViewTimeouts[e]), cur.faqViewTimeouts[e] = null, ajax.post("support", {
            act: "faq_clicked",
            faq_id: e,
            hash: t,
            from_new: i
        }, {
            cache: 1
        })) : cur.faqViewTimeouts.hasOwnProperty(e) || (cur.faqViewTimeouts[e] = setTimeout(function() {
            ajax.post("support", {
                act: "faq_clicked",
                faq_id: e,
                hash: t,
                from_new: i
            }, {
                cache: 1
            })
        }, 1500))
    },
    cancelFAQclicked: function(e) {
        cur.faqViewTimeouts[e] && (clearTimeout(cur.faqViewTimeouts[e]), delete cur.faqViewTimeouts[e])
    },
    rateFAQ: function(e, t, i, a, o) {
        if (!vk.id) return !1;
        if (ajax.post("support", {
                act: "faq_rate",
                faq_id: e,
                val: t,
                hash: i,
                from_new: a
            }), Tickets.setFAQclicked(e, i, a, !0), !o)
            if (hide("tickets_faq_links" + e), t > 0) show("tickets_faq_useful" + e);
            else {
                var s = ge("tickets_faq_unuseful" + e),
                    r = geByClass1("help_table_question_rated_additional__btns", s);
                show(s, geByClass1("help_table_question_rated_additional", s)), hide(r, geByClass1("help_table_question__rated_final", s), geByClass1("help_table_question__rated_no_perm", s)), slideDown(r, 200)
            }
        return !1
    },
    rateFAQAdditional: function(e, t, i, a, o) {
        if (!vk.id) return !1;
        var s = ge("tickets_faq_unuseful" + e);
        ajax.post("support", {
            act: "faq_rate_additional",
            faq_id: e,
            additional_id: t,
            hash: i
        }), hide(geByClass1("help_table_question_rated_additional", s)), show(geByClass1("help_table_question__rated_final", s)), 2 == t && (cur.askQuestion.permission ? Tickets.tryAskQuestion(function() {
            Tickets.goToForm(e, "dislike", a, o)
        }) : cur.isFaqTutorial && 2 != t || (hide(geByClass1("help_table_question__rated_final__t", s)), show(geByClass1("help_table_question__rated_no_perm", s))))
    },
    cancelRateFAQ: function(e, t, i, a) {
        return vk.id ? (ajax.post("support", {
            act: "faq_rate",
            faq_id: e,
            val: t,
            cancel: 1,
            hash: i
        }), hide("tickets_faq_useful" + e, "tickets_faq_unuseful" + e), show("tickets_faq_links" + e), a && a.stopPropagation(), !1) : !1
    },
    rateFAQUrgent: function(e, t, i) {
        return vk.id ? (ajax.post("support", {
            act: "faq_rate",
            faq_id: e,
            val: t,
            hash: i,
            from_new: 1
        }), Tickets.setFAQclicked(e, i, 1, !0), hide("tickets_faq_urgent_links" + e), t > 0 ? (show("tickets_faq_useful" + e), slideUp("tickets_new_wrap", 450)) : show("tickets_faq_unuseful" + e), !1) : !1
    },
    cancelRateFAQUrgent: function(e, t, i) {
        if (!vk.id) return !1;
        ajax.post("support", {
            act: "faq_rate",
            faq_id: e,
            val: t,
            cancel: 1,
            hash: i
        }), hide("tickets_faq_useful" + e, "tickets_faq_unuseful" + e), show("tickets_faq_urgent_links" + e);
        var a = ge("tickets_new_wrap");
        return isVisible(a) || slideDown(a, 500), !1
    },
    showAverageTime: function(e, t) {
        if (cur.timeShown) return void Tickets.toggleDetailedForm();
        var i = getLang("support_wait_message").replace(/\{time\}/g, e) + '<div class="tickets_wait_img"><img src="/images/pics/support_wait.png" /></div>',
            a = showFastBox({
                title: getLang("support_average_wait_time"),
                width: 430,
                dark: !0,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, i, getLang("support_ask_question"), function() {
                a.hide(), cur.timeShown = !0, t()
            }, getLang("support_back_to_faq"))
    },
    toggleDetailedForm: function(e) {
        var t = ge("tickets_title");
        if (toggleClass(ge("tickets_content"), "detailed"), isVisible("tickets_detailed_form")) t.setAttribute("placeholder", getLang("support_please_add_title")), removeClass(ge("tickets_search_reset"), "shown"), e && ge("tickets_text").focus();
        else {
            t.setAttribute("placeholder", getLang("support_title_msg"));
            var i = trim(ge("tickets_title").value);
            i && addClass(ge("tickets_search_reset"), "shown"), cur.toggleCanceled = !0, delete cur.toggled, Tickets.searchFAQ(i), t.focus()
        }
        placeholderSetup(ge("tickets_title"), {
            back: !0,
            reload: !0
        })
    },
    getSearchQuery: function() {
        var e = ge("tickets_title") || ge("faq_search_form__title");
        return e ? e.value : ""
    },
    getFormQuery: function(e, t) {
        var i = {
            0: "support",
            act: e,
            title: Tickets.getSearchQuery()
        };
        return t && (i.ask = 1), i
    },
    switchToPayForm: function(e, t) {
        return lockButton("tickets_create_pay"), nav.go(Tickets.getFormQuery("new_pay", t), e)
    },
    switchToAdsForm: function(e, t) {
        return lockButton("tickets_create_ads"), nav.go(Tickets.getFormQuery("new_ads", t), e)
    },
    switchToNameForm: function(e, t) {
        return lockButton("tickets_create_name"), nav.go(Tickets.getFormQuery("new_name", t), e)
    },
    switchToApiForm: function(e, t) {
        return lockButton("tickets_create_api"), nav.go(Tickets.getFormQuery("new_api", t), e)
    },
    switchToMobileForm: function(e, t) {
        return lockButton("tickets_create_mobile"), nav.go(Tickets.getFormQuery("new_mobile", t), e)
    },
    updateFAQ: function(e, t) {
        clearTimeout(cur.faqTimeout), cur.faqTimeout = setTimeout(function() {
            var e = t.value,
                i = trim(e),
                a = i.split(" "),
                o = ge("tickets_text");
            e.length >= 70 && o && !o.value && !cur.flood && (isVisible("tickets_detailed_form") || Tickets.toggleDetailedForm(), t.value = "", o.focus(), o.value = e), isVisible("tickets_detailed_form") || i == cur.searchStr && (a.length < 4 || 4 == a.length && " " != e[e.length - 1]) || (i ? addClass(ge("tickets_search_reset"), "shown") : removeClass(ge("tickets_search_reset"), "shown"), cur.searchStr = i, clearTimeout(cur.searchFAQTimeout), cur.searchFAQTimeout = setTimeout(function() {
                Tickets.searchFAQ(cur.searchStr)
            }.bind(this), 300), browser.mobile || scrollToTop())
        }.bind(this), 10)
    },
    searchFAQ: function(e) {
        " " == e[e.length - 1] && (e[e.length - 1] = "_"), addClass(ge("tickets_search"), "loading"), setStyle(ge("tickets_search_reset"), {
            opacity: .6
        });
        var t = {
            act: "get_faq",
            q: e,
            from: nav.objLoc.act
        };
        nav.objLoc.gid && (t.gid = nav.objLoc.gid), nav.objLoc.app_id && (t.app_id = nav.objLoc.app_id), nav.objLoc.union_id && (t.union_id = nav.objLoc.union_id), cur.tlmd && cur.showAll && (delete cur.showAll, t.show_all = 1, cur.from_ads && (t.from = "ads")), ajax.post("support", t, {
            cache: 1,
            hideProgress: removeClass.pbind("tickets_search", "loading"),
            onDone: function(t, i) {
                var a = ge("tickets_title").value,
                    o = trim(a).split(" "),
                    s = !1;
                if (cur.toggleCanceled || !(o.length > 4 || 4 == o.length && " " == a[a.length - 1]) || cur.flood || (s = !0), t ? ge("tickets_faq_list").innerHTML = ce("div", {
                        innerHTML: t
                    }).firstChild.innerHTML : (i && (ge("tickets_faq_button").innerHTML = i), s && (cur.toggled = !0, Tickets.toggleDetailedForm())), cur.tlmd) {
                    if (e ? extend(nav.objLoc, {
                            q: e
                        }) : delete nav.objLoc.q, "faq" == nav.objLoc.act) {
                        var r = e ? e : getLang("support_page_title");
                        vk.id || (r += " | " + getLang("global_vkontakte")), document.title = r
                    }
                    nav.setLoc(nav.objLoc)
                }
            }
        })
    },
    clearSearch: function(e, t) {
        var i = ge("tickets_title");
        setStyle(e, {
            opacity: .6
        }), i.value = "", ge("tickets_title").focus(), Tickets.updateFAQ(t, i)
    },
    checkOut: function(e, t) {
        checkbox(e.firstChild)
    },
    getCheckedArr: function() {
        var e = [];
        return isObject(cur.checkedTickets) && each(cur.checkedTickets, function(t, i) {
            e.push(t)
        }), e
    },
    updateChecked: function() {
        if (ge("tickets_search_options")) {
            var e = Tickets.getCheckedArr(),
                t = e.length,
                i = ge("tickets_all_search"),
                a = ge("tickets_all_selected");
            t ? (isVisible(i) && slideUp(i, 200), ge("t_n_marked").innerHTML = langNumeric(t, cur.lang.x_tickets_checked, !0), isVisible(a) || slideDown(a, 200)) : (isVisible(i) || slideDown(i, 200), isVisible(a) && slideUp(a, 200))
        }
    },
    checkChange: function(e, t) {
        var i = geByClass1("checkbox", e);
        cur.checkedTickets[t] ? (delete cur.checkedTickets[t], checkbox(i, 0)) : (cur.checkedTickets[t] = !0, checkbox(i, 1)), this.updateChecked()
    },
    saveDraft: function(e, t) {
        var i = ge("tickets_reply");
        if (!browser.mobile && i && !i.disabled && cur.canUseDrafts) {
            for (var a = val(i), o = {
                    txt: trim(a),
                    medias: []
                }, s = (cur.ticketsNewMedia || {}).chosenMedias || [], r = 0, n = s.length; n > r; ++r) s[r] && o.medias.push([s[r][0], s[r][1]]);
            o.medias.length || o.txt.length || (o = !1), ls.set("helpdesk_draft" + vk.id + "_" + e, o), i && cur.ticketsNewMedia && ("paste" == t || "keyup" == t) && cur.ticketsNewMedia.checkMessageURLs(a, "keyup" != t)
        }
    },
    listToggleQuestion: function(e, t, i) {
        if (checkEvent(e)) return !0;
        var a = e.target.parentNode,
            o = geByClass1("help_table_question__ans", a);
        return isVisible(o) ? (removeClass(a, "help_table_question_visible"), slideUp(o, 200), Tickets.cancelFAQclicked(t)) : (addClass(a, "help_table_question_visible"), slideDown(o, 200), Tickets.setFAQclicked(t, i, 1, !1)), !1
    },
    listToggleUnusefulButton: function(e) {
        toggle(ge("tickets_unuseful"), e)
    },
    listShowAltButton: function(e) {
        each(geByClass("secondary", ge("help_table_questions_btn")), function(t, i) {
            "" == e || i.id != e ? hide(i) : show(i)
        })
    },
    updateSearchSuggests: function(e) {
        el = this, e = trim(e);
        var t = ge("faq_search_form");
        return t.hideTimeout && (clearTimeout(t.hideTimeout), t.hideTimeout = null), t.searchTimeout && (clearTimeout(t.searchTimeout), t.searchTimeout = null), e ? void(t.searchTimeout = setTimeout(function() {
            var i = ge("faq_search_form_suggests");
            i || (i = ce("div", {
                id: "faq_search_form_suggests",
                className: "tickets_suggests"
            }), t.appendChild(i), hide(i)), ajax.post("support", {
                act: "load_faq_suggests",
                q: e,
                section: cur.section,
                union_id: nav.objLoc.union_id
            }, {
                cache: 1,
                onDone: function(a) {
                    a && (show(i), addClass(t, "faq_search_form_with_suggests", e)), i.innerHTML = a
                },
                showProgress: uiSearch.showProgress.pbind(el),
                hideProgress: uiSearch.hideProgress.pbind(el)
            })
        }, 200)) : (removeClass(t, "faq_search_form_with_suggests", e), void hide("faq_search_form_suggests"))
    },
    hideSearchSuggests: function() {
        var e = ge("faq_search_form");
        e.hideTimeout = setTimeout(function() {
            clearTimeout(e.hideTimeout), e.hideTimeout = null, hide("faq_search_form_suggests"), removeClass(e, "faq_search_form_with_suggests")
        }, 500)
    },
    goToSearchResult: function(e, t) {
        if (t = trim(t), t || "faqs" == nav.objLoc.act) {
            var i = {
                0: cur.objLoc,
                act: cur.faqsAct
            };
            t && (i.q = t), nav.go(i)
        }
    },
    goToForm: function(e, t, i, a) {
        var o = {
            0: "support",
            act: i
        };
        if (e) o.id = e;
        else {
            var s = uiSearch.getFieldEl("faq_search_form"),
                r = "";
            s && (r = s.value.trim(), r && (o.title = r))
        }
        return t && (o.from = t), a && (o.bhash = a), nav.go(o), !1
    },
    listScrollToQuestion: function(e) {
        var t = null;
        if (e && (t = ge("help_table_question_" + e)), t) {
            scrollToY(getXY(t)[1] - 10), hasClass(t, "help_table_question_visible") || addClass(t, "help_table_question_visible");
            var i = geByClass1("help_table_question__ans", t);
            isVisible(i) || show(i)
        }
    },
    listClearSearchInput: function() {
        uiSearch.reset("faq_search_form", !0)
    },
    listSelectCategory: function(e, t) {
        "top" != e && (e = "cat" + e);
        var i = ge("ui_rmenu_" + e),
            a = i.innerHTML;
        return uiRightMenu.switchMenu(i), t && uiRightMenu.showProgress(i), a
    },
    listDiselectCategory: function() {
        each(geByClass("ui_rmenu_item_sel", ge("help_table_categories")), function(e, t) {
            removeClass(t, "ui_rmenu_item_sel")
        })
    },
    listRemoveCategoryLoading: function() {
        uiRightMenu.hideProgress("help_table_categories_menu")
    },
    listSetTitle: function(e) {
        var t = ge("help_table_questions__title");
        e ? (show(t), t.innerHTML = e) : hide(t)
    },
    tryAskQuestion: function(e) {
        var t = 2;
        if (cur.askQuestion && (t = cur.askQuestion.permission), t) {
            if (1 == t) return Tickets.showAverageTime(cur.askQuestion.time, e), !1;
            e()
        } else setTimeout(showFastBox({
            dark: 1,
            bodyStyle: "line-height: 160%;",
            title: getLang("global_error")
        }, getLang("support_flood_error")).hide, 4e3);
        return !1
    },
    listNotFoundVisible: function() {
        return hasClass("help_table_questions", "help_table_questions_not_found")
    },
    listHideNotFound: function() {
        removeClass("help_table_questions", "help_table_questions_not_found")
    },
    listShowNotFound: function(e) {
        addClass("help_table_questions", "help_table_questions_not_found"), ge("help_table_not_found__query").innerHTML = e;
        var t = ge("help_table_not_found__btn");
        t && !isVisible(t) && -1 != e.trim().indexOf(" ") && show(t)
    },
    loadTickets: function() {
        var e = ge("tickets_list_load_more"),
            t = getXY(e)[1],
            i = scrollGetY(),
            a = t >= i && t <= i + window.innerHeight;
        if (a && !cur.ticketsLoading && cur.ticketsLoadMore) {
            var o = {
                act: "",
                offset: cur.ticketsOffset,
                load: 1
            };
            nav.objLoc.union_id && (o.union_id = nav.objLoc.union_id), nav.objLoc.app_id && (o.app_id = nav.objLoc.app_id), ajax.post("support", o, {
                showProgress: function() {
                    addClass(e, "tickets_list_load_more_loading"), cur.ticketsLoading = !0
                },
                hideProgress: function() {
                    removeClass(e, "tickets_list_load_more_loading"), cur.ticketsLoading = !1
                },
                onDone: function(e, t, i) {
                    cur.ticketsOffset = t, cur.ticketsLoadMore = i;
                    var a = ge("tickets_list");
                    removeClass(a.lastChild, "last");
                    var o = sech(e);
                    each(o, function(e, t) {
                        a.appendChild(t)
                    }), Tickets.loadTickets()
                }
            })
        }
    },
    closeMobileNotice: function(e) {
        slideUp("tickets_mobile_notice", 200), ajax.post("support", {
            act: "hide_mobile_notice",
            hash: e
        })
    },
    listClearCache: function() {
        var e = nav.objLoc;
        e.cc = 1, nav.go(e)
    },
    storeOutdatedLeft: function(e) {
        ls.set("support_outdated_left", {
            id: e,
            ts: Math.floor((new Date).getTime() / 1e3)
        }), console.log("Win")
    },
    tutorialOpen: function(e, t) {
        var i = cur.chosenTutorialFaqId ? ge("help_table_question_" + cur.chosenTutorialFaqId) : null;
        i ? show("support_tutorial_container") : slideDown("support_tutorial_container", 300), e.parentNode.replaceChild(ce("span", {
            innerHTML: e.innerHTML
        }), e), ajax.post("support", {
            act: "a_open_tutorial",
            hash: t
        }), i && scrollToY(getXY(i)[1])
    },
    tutorialSelect: function(btn, id, noActions) {
        cur.tutorialProcessing || ajax.post("support", {
            act: "tutorial",
            id: id,
            load: 1,
            ban: nav.objLoc.ban || 0,
            no_actions: noActions
        }, {
            showProgress: function() {
                cur.tutorialProcessing = !0, lockButton(btn)
            },
            hideProgress: function() {
                cur.tutorialProcessing = !1, unlockButton(btn)
            },
            onDone: function(html, js) {
                var el = ge("support_tutorial_container") || ge("content");
                val(el, html), js && eval(js), scrollToY(getXY("help_table_question_" + id)[1])
            }
        })
    },
    showTicketLockedTT: function(e, t) {
        showTooltip(e, {
            dir: "bottom",
            text: t,
            typeClass: "tt_black",
            shift: [15, 10, 0]
        })
    },
    toggleQuestionHider: function(e) {
        var t = domPN(domPN(e)),
            i = geByClass1("wk_hider_body", t);
        toggleClass(t, "wk_hider_box"), toggleClass(t, "wk_hider_box_opened"), hasClass(t, "wk_hider_box_opened") ? slideDown(i, 200) : slideUp(i, 200)
    },
    _eof: 1
};
try {
    stManager.done("tickets.js")
} catch (e) {}