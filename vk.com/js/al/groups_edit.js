var GroupsEdit = {
    uInit: function(e) {
        GroupsEdit.uInitScroll(), extend(cur, {
            opts: e,
            oid: -e.id,
            tab: e.tab,
            searchInp: ge("group_u_search_inp"),
            searchCont: gpeByClass("_wrap", ge("group_u_search_inp")),
            searchWrap: ge("group_u_search_input_wrap"),
            index: {},
            cache: {},
            offsets: {},
            htmls: {},
            allshown: {},
            rnd: irand(0, 1e4)
        }), elfocus(cur.searchInp), cur.nav.push(GroupsEdit.uNav), cur.destroy.push(function(e) {
            e == cur && GroupsEdit.uDeinitScroll()
        }), cur.opts.admin && GroupsEdit.uIndex("admins", cur.opts.data.admins), GroupsEdit.uStart()
    },
    switchMenu: function(e, t, o) {
        return nav.go(e, o)
    },
    addToLeftMenu: function(e, t, o) {
        ajax.post("al_settings.php", {
            act: "a_toggle_admin_fast",
            gid: cur.gid,
            hash: t,
            update_menu: !0
        }, {
            onDone: function(e, t) {
                geByTag1("ol", ge("side_bar")).innerHTML = t
            },
            onFail: function(t) {
                return checkbox(e), "too_much_groups" !== t ? !1 : (showFastBox(getLang("global_error"), getLang("groups_left_menu_full", 5)), !0)
            }
        })
    },
    uNav: function(e, t, o) {
        if (!e[0] && !cur.noLocNav) {
            var r = cur.tab,
                s = o.tab || "members";
            if (delete e.tab, isEmpty(e) && s != r) return GroupsEdit.uResetSearch(), hide("group_u_wrap_" + r), show("group_u_wrap_" + s), cur.tab = s, GroupsEdit.uResetSearch(), GroupsEdit.uStart(), nav.setLoc(o), !1
        }
    },
    uStart: function() {
        var e = cur.tab,
            t = cur.opts.data[e],
            o = t,
            r = cur.rnd;
        cur.qShown = !1, cur.opts.counts[e] > 1e3 || "lazy" == t ? ("lazy" == t && (cur.opts.data[e] = t = !1), t || (cur.offsets[e] = ge("group_u_rows_" + e).childNodes.length, o = "notavail", cur.offsets[e] < cur.opts.counts[e] && ajax.post("groupsedit.php", {
            act: "get_more",
            id: cur.opts.id,
            tab: e,
            offset: cur.offsets[e]
        }, {
            cache: 1
        }))) : t && "notavail" != t || (o = "loading", delete cur.offsets[e], ajax.post("groupsedit.php", {
            act: "get_list",
            id: cur.opts.id,
            tab: e
        }, {
            onDone: function(t, o) {
                cur.rnd == r && (cur.opts.counts[e] = t, GroupsEdit.uIndex(e, o))
            }
        })), val("group_u_header", cur.opts.headers[e] || ""), val("group_u_header_btn", cur.opts.buttons[e] || ""), val("group_u_summary", cur.opts.counts[e] ? langNumeric(cur.opts.counts[e], "%s", !0) : ""), cur.opts.data[e] = o, cur.searchInp.setAttribute("placeholder", clean(unclean(cur.opts.placeholders[e] || getLang("groups_users_search")))), placeholderInit(cur.searchInp, {
            reload: !0
        }), window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge("narrow_column"))), hasClass(cur.searchCont, "ui_search_fixed") && scrollToY(getXY(cur.searchWrap)[1] + 1, 0), checkPageBlocks(), GroupsEdit.hideMessage(), GroupsEdit.uUpdateBack()
    },
    uInitScroll: function() {
        GroupsEdit.uDeinitScroll(), addEvent(window, "scroll", GroupsEdit.uScroll), addEvent(window, "resize", GroupsEdit.uScroll)
    },
    uDeinitScroll: function() {
        removeEvent(window, "scroll", GroupsEdit.uScroll), removeEvent(window, "resize", GroupsEdit.uScroll)
    },
    uScroll: function() {
        if (!browser.mobile) {
            var e = document.documentElement,
                t = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                o = scrollGetY(),
                r = ge("group_edit_more_" + cur.tab);
            isVisible(r) && o + t > r.offsetTop && r.onclick()
        }
    },
    uUpdateBack: function() {
        var e = "members" == cur.tab || "unsure" == cur.tab ? getLang("groups_back_to_people") : "admins" == cur.tab ? getLang("groups_back_to_leaders") : !1;
        e ? cur._back = {
            text: e,
            show: [GroupsEdit.uInitScroll, elfocus.pbind(cur.searchInp)],
            hide: [GroupsEdit.uDeinitScroll]
        } : cur._back = !1
    },
    uIndex: function(e, t, o) {
        cur.opts.data[e] = t, cur.cache[e] = {
            all: []
        };
        for (var r = 0, s = t.length; s > r; ++r) cur.cache[e].all.push(r);
        cur.index[e] = new vkIndexer(cur.cache[e].all, function(t) {
            return cur.opts.data[e][t][2]
        }, o ? function() {} : GroupsEdit.uSearchUpdate)
    },
    uResetSearch: function() {
        val(cur.searchInp, ""), elfocus(cur.searchInp), GroupsEdit.uSearchUpdate()
    },
    uSearch: function() {
        var e = trim(val(cur.searchInp)),
            t = cur.tab,
            o = cur.opts.data[t];
        return clearTimeout(cur.updateTimer), e ? "notavail" == o && e.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) ? GroupsEdit.uGetPage() : "members" == t || "unsure" == t || "admins" == t ? nav.go(nav.objLoc[0] + "?act=search&c[q]=" + encodeURIComponent(e) + "&from=" + t, !1, {
            noback: !1
        }) : GroupsEdit.uSearchUpdate(!0) : void 0
    },
    uGetAddr: function(e) {
        var t = e.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/(.+)$/),
            o = t[4].substr(t[4].indexOf("#") + 1).replace(/^[\/\!]*/, "");
        return (t = o.match(/^profile\.php\?id=(\d+)/)) ? o = intval(t[1]) : (-1 !== o.indexOf("?") && (o = o.substr(0, o.indexOf("?"))), (t = o.match(/^id(\d+)/)) && (o = intval(t[1]))), o
    },
    uSearchUpdate: function(e) {
        if ("group_u_search_inp" == (cur.searchInp || {}).id) {
            var t = trim(val(cur.searchInp)),
                o = cur.tab,
                r = cur.opts.data[o];
            if (toggle("group_u_wrap_additional_admins", "admins" == o && !t && domFC(ge("group_u_rows_additional_admins"))), t || (cur.searched = !1), clearTimeout(cur.updateTimer), "notavail" == r) {
                if (t.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) return void(cur.updateTimer = setTimeout(GroupsEdit.uGetPage, 1e3));
                if (t && e !== !0) return void(cur.updateTimer = setTimeout(GroupsEdit.uSearchUpdate.pbind(!0), 1e3));
                var s, a = ge("group_u_rows_" + o),
                    i = ge("group_edit_more_" + o);
                t ? (cur.htmls[o] || (cur.htmls[o] = a), hide(i), a && domPN(a).replaceChild(ce("div", {
                    id: "group_u_tmp_" + o,
                    className: "group_u_rows",
                    innerHTML: GroupsEdit.uGenEmpty(getLang("members" == o || "unsure" == o || "admins" == o ? "groups_too_many_enter" : "groups_too_many_for_search"))
                }), a)) : (cur.htmls[o] && (s = ge("group_u_tmp_" + o), domPN(s).replaceChild(cur.htmls[o], s), "group_l_row" == domFC(s).className && domPN(ge(domFC(s).id)) == cur.htmls[o] && cur.htmls[o].replaceChild(domFC(s), ge(domFC(s).id)), toggle(i, cur.offsets[o] < cur.opts.counts[o]), cur.htmls[o] = s = !1), GroupsEdit.uUpdateSummary()), checkPageBlocks()
            } else "loading" != r && GroupsEdit.uShowMore(!0)
        }
    },
    uUpdateSummary: function() {
        var e = cur.tab;
        "requests" == e ? '<span class="divide">|</span><span><a onclick="GroupsEdit.uApproveAll()">' + getLang("groups_approve_all") + "</a></span>" : "";
        trim(val(cur.searchInp)) || val("group_u_summary", cur.opts.counts[e] ? langNumeric(cur.opts.counts[e], "%s", !0) : "")
    },
    uApproveAll: function() {
        showFastBox({
            title: getLang("groups_invitations_title")
        }, getLang("groups_sure_approve_all"), getLang("groups_approve_all"), GroupsEdit.uDoApproveAll.pbind(0), getLang("global_cancel"))
    },
    uDoApproveAll: function(e, t) {
        curBox() && ajax.post("groupsedit.php", {
            act: "approve_all",
            id: cur.opts.id,
            hash: cur.opts.hash,
            part_count: e
        }, {
            onDone: function(e, o) {
                if (e === !1) return GroupsEdit.uDoApproveAll(o, t);
                curBox() && curBox().hide(), GroupsEdit.showMessage(e);
                var r = nav.objLoc;
                o ? delete r.tab : r.tab = "requests", nav.go(r, !1, {
                    nocur: !0
                })
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    uShowMore: function(e) {
        var t = cur.tab,
            o = cur.opts.data[t],
            r = trim(val(cur.searchInp)),
            s = !1,
            a = cur.rnd;
        if (o && "loading" != o && ("notavail" != o || !e) && "lazy" != o) {
            if ("notavail" == o) return void ajax.post("groupsedit.php", {
                act: "get_more",
                id: cur.opts.id,
                tab: t,
                offset: cur.offsets[t]
            }, {
                onDone: function(e, o) {
                    if (cur.rnd == a && !cur.searched) {
                        cur.opts.counts[t] = e;
                        var r, s = ce("div", {
                                innerHTML: o
                            }),
                            i = ge("group_u_rows_" + t);
                        for (r = domFC(s); r; r = domFC(s)) ge(r.id) ? s.removeChild(r) : (i.appendChild(r), ++cur.offsets[t]);
                        cur.offsets[t] < cur.opts.counts[t] && ajax.post("groupsedit.php", {
                            act: "get_more",
                            id: cur.opts.id,
                            tab: t,
                            offset: cur.offsets[t]
                        }, {
                            cache: 1
                        })
                    }
                },
                cache: 1
            });
            var i = cur.cache[t].all,
                n = e && cur.qShown !== !1;
            if (e) {
                if (GroupsEdit.uUpdateSummary(), cur.qShown === r) return;
                cur.qShown = r
            }
            if (r)
                if (r.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
                    var u = GroupsEdit.uGetAddr(r);
                    i = [];
                    for (var c = 0, d = o.length; d > c; ++c)(o[c][0] == u || o[c][1] == "/" + u) && i.push(c)
                } else {
                    if (i = cur.cache[t]["_" + r], void 0 === i) {
                        var p = cur.index[t].search(r),
                            l = {};
                        i = [];
                        for (var c = 0, d = p.length; d > c; ++c) l[p[c]] || (l[p[c]] = !0, i.push(p[c]));
                        i.sort(function(e, t) {
                            return e - t
                        }), cur.cache[t]["_" + r] = i
                    }
                    s = GroupsEdit.uGetHighlight(r)
                }
            var g = i.length,
                _ = ge("group_u_rows_" + t),
                h = ge("group_edit_more_" + t);
            if (!g) return hide(h), val(_, GroupsEdit.uGenEmpty(r ? cur.opts.nfound[t] : getLang("groups_no_users_in_club"))), val("group_u_summary", ""), void checkPageBlocks();
            for (var m = e ? 0 : _.childNodes.length, v = Math.min(g, m + 20), f = [], c = m; v > c; ++c) {
                var b = o[i[c]],
                    w = (b || {})[2];
                b && (s && (w = w.replace(s.re, s.val)), f.push(GroupsEdit.uGenRow(t, b, w)))
            }
            e ? (hasClass(cur.searchCont, "ui_search_fixed") && scrollToY(getXY(cur.searchWrap)[1] + 1, 0), val(_, f.join("")), r ? val("group_u_summary", langNumeric(g, "%s", !0)) : GroupsEdit.uUpdateSummary()) : _.innerHTML += f.join(""), n && GroupsEdit.hideMessage(), toggle(h, g > v), checkPageBlocks()
        }
    },
    uGetPage: function(e) {
        var t = trim(val(cur.searchInp)),
            o = cur.tab,
            r = cur.rnd;
        (e === !0 || cur.searched !== t) && (cur.searched = t, ajax.post("groupsedit.php", {
            act: "get_page",
            id: cur.opts.id,
            tab: o,
            addr: GroupsEdit.uGetAddr(t)
        }, {
            onDone: function(e, t) {
                if (cur.rnd == r) {
                    var s = ge("group_u_rows_" + o);
                    cur.htmls[o] || (cur.htmls[o] = s), hide("group_edit_more_" + o), val("group_u_summary", langNumeric(t ? 1 : "", "%s", !0)), s ? domPN(s).replaceChild(ce("div", {
                        id: "group_u_tmp_" + o,
                        className: "group_u_rows",
                        innerHTML: e
                    }), s) : val("group_u_tmp_" + o, e)
                }
            },
            showProgress: uiSearch.showProgress.pbind(cur.searchInp),
            hideProgress: uiSearch.hideProgress.pbind(cur.searchInp)
        }))
    },
    uGetHighlight: function(e) {
        var t = cur.index[cur.tab],
            o = t.delimiter,
            r = t.trimmer;
        return e += " " + (parseLatin(e) || ""), e = escapeRE(e).replace(/&/g, "&amp;"), e = e.replace(r, "").replace(o, "|"), {
            re: new RegExp("(" + e + ")", "gi"),
            val: '<span class="highlight">$1</span>'
        }
    },
    uGenEmpty: function(e) {
        return '<div class="no_rows">' + e + "</div>"
    },
    uGenRow: function(e, t, o) {
        var r = t[0],
            s = t[1],
            a = t[3],
            i = (t[4], t[5]),
            n = t[6],
            u = t[7],
            c = "",
            d = "",
            p = o || t[2],
            l = cur.qShown;
        o || !l || l.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) || (highlight = GroupsEdit.uGetHighlight(l), p = p.replace(highlight.re, highlight.val)), n > 0 ? c += '<div class="group_u_info_row group_u_level">' + cur.opts.levels[n] + "</div>" : i[0] && (c += '<div class="group_u_desc">' + i[0] + "</div>");
        var g = intval(i[1]),
            _ = onlinePlatformClass(g),
            h = !0,
            m = h ? ' onmouseover="uiPhotoZoom.over(this, ' + r + ')"' : "";
        switch (e) {
            case "requests":
                c += -3 == n ? rs(cur.opts.requestMsgTpl, {
                    msg: getLang("groups_limit_message_autoremoved")
                }) : -1 == n ? rs(cur.opts.requestBtnsTpl, {
                    oid: r,
                    hash: u
                }) : rs(cur.opts.requestDoneTpl, {
                    oid: r,
                    hash: u,
                    text: getLang(0 > n ? "groups_request_declined" : "groups_request_accepted")
                });
                break;
            case "members":
            case "unsure":
            case "admins":
                var v = "";
                n > 3 ? 6 > n && (v = '<a onclick="GroupsEdit.uMainAdmin()">' + getLang("Edit") + "</a>") : n > 0 ? v = '<a onclick="GroupsEdit.uEditAdmin(' + r + ')">' + getLang("Edit") + "</a>" : !n && cur.opts.admin && (v = '<a onclick="GroupsEdit.uEditAdmin(' + r + ')">' + getLang("groups_members_appoint_manager") + "</a>"), v && (c += '<div class="group_u_info_row">' + v + "</div>"), 0 > n ? d += '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', 0)\">" + getLang("groups_restore_member") + "</a>" : 0 >= n ? d += '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', -1)\">" + getLang("groups_members_delete") + "</a>" : 5 > n && r > 0 && (d += '<a class="group_u_action" onclick="GroupsEdit.uRemoveAdmin(' + r + ')">' + getLang("groups_remove_manager") + "</a>");
                break;
            case "declined":
                d += 0 > n ? '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', 0)\">" + getLang("groups_restore_member") + "</a>" : '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', -1)\">" + getLang("groups_members_delete") + "</a>";
                break;
            case "invites":
                d += 0 > n ? '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', 0)\">" + getLang("groups_send_invitation") + "</a>" : '<a class="group_u_action" onclick="GroupsEdit.uAction(this, ' + r + ", '" + u + "', -1)\">" + getLang("groups_members_invitations_cancel") + "</a>"
        }
        return rs(cur.opts.userTpl, {
            oid: r,
            tab: e,
            name: p,
            photo: a,
            href: s,
            info: c,
            actions: d,
            events: m,
            online: _
        })
    },
    uEditAdmin: function(e) {
        showBox("/groupsedit.php", {
            act: "edit_admin",
            id: cur.gid || cur.opts.id,
            addr: e
        })
    },
    uRemoveAdmin: function(e) {
        return showBox("/groupsedit.php", {
            act: "edit_admin",
            id: cur.gid || cur.opts.id,
            addr: e,
            remove: 1
        })
    },
    uDoneAdmin: function(e, t, o) {
        var r = intval(radioBtns.admlevel.val);
        return cur.notSureAdmin && r >= 3 ? showFastBox({
            title: getLang("groups_admin_warning_title")
        }, cur.notSureAdmin, getLang("groups_admin_do_add"), function() {
            curBox().hide(), cur.notSureAdmin = !1, GroupsEdit.uDoneAdmin(e, t, o)
        }, getLang("global_back")) : void ajax.post("groupsedit.php", {
            act: "done_admin",
            id: cur.gid || cur.opts.id,
            addr: e,
            level: r,
            contact: isChecked("gedit_admbox_check"),
            position: val("gedit_admbox_position"),
            email: val("gedit_admbox_email"),
            phone: val("gedit_admbox_phone"),
            hash: t,
            from: nav.objLoc.act
        }, {
            onDone: function(t, o, s) {
                var a, i = ["members", "unsure", "admins"],
                    n = curBox().uRemove,
                    u = "search" == nav.objLoc.act && nav.objLoc.from && cur.gid;
                if (n || (boxQueue.hideAll(!0), t && GroupsEdit.showMessage(t, o || u && void 0 !== o ? !1 : "error")), u) return val(ge("sgedit_acts" + e), o), val(ge("sgedit_lev" + e), s), val(ge("sgedit_edit" + e), s ? getLang("global_edit") : getLang("groups_members_appoint_manager")), void toggleClass(gpeByClass("search_row", "sgedit_lev" + e), "sgedit_moder", !!s);
                if (o) {
                    for (a = 0; 3 > a; ++a) {
                        var c, d, p, l = i[a],
                            g = cur.opts.data[l],
                            _ = !1;
                        if (isArray(g))
                            for (c = 0, d = g.length; d > c; ++c)
                                if (g[c][0] == e) {
                                    _ = !0, "admins" == l && (o[6] > 0 && g[c][6] <= 0 ? ++cur.opts.counts[l] : o[6] <= 0 && g[c][6] > 0 && --cur.opts.counts[l]), cur.opts.data[l][c] = o;
                                    break
                                }
                        "admins" == l && !_ && r ? (cur.opts.data[l].unshift(o), ++cur.opts.counts.admins, val(cur.searchInp, ""), cur.qShown = !1, GroupsEdit.uIndex(l, cur.opts.data[l])) : ((p = ge("group_u_" + l + e)) && domPN(p).replaceChild(se(GroupsEdit.uGenRow(l, o)), p), _ || (ajaxCache = {})), GroupsEdit.uUpdateSummary()
                    }
                    n && GroupsEdit.uAction(!1, n[0], n[1], n[2])
                }
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        })
    },
    uChangeMainAdmin: function(e, t) {
        showFastBox({
            title: getLang("groups_admin_warning_title")
        }, cur.sureChangeAdmin, getLang("groups_change_admin"), function(o) {
            ajax.post("/groupsedit.php", {
                act: "change_main_admin",
                id: cur.gid || cur.opts.id,
                mid: e,
                hash: t
            }, {
                onDone: function(t) {
                    boxQueue.hideAll(!0), showDoneBox(t);
                    var o = "search" == nav.objLoc.act && nav.objLoc.from && cur.gid;
                    if (o) nav.reload();
                    else {
                        var r, s = cur.tab,
                            a = "requests" == s || "declined" == s || "invites" == s ? [s] : ["members", "unsure", "admins"];
                        a.length;
                        for (r = 0; 3 > r; ++r) {
                            var i, n, u, c = a[r],
                                d = cur.opts.data[c];
                            if (isArray(d))
                                for (i = 0, n = d.length; n > i; ++i)(d[i][0] == e || d[i][0] == vk.id) && (cur.opts.data[c][i][6] = d[i][0] == e ? 6 : 3, (u = ge("group_u_" + c + d[i][0])) && domPN(u).replaceChild(se(GroupsEdit.uGenRow(c, cur.opts.data[c][i])), u))
                        }
                    }
                },
                onFail: function(e) {
                    return e && (boxQueue.hideAll(!0), GroupsEdit.showMessage(e, !0)), !0
                },
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o)
            })
        }, getLang("global_back"))
    },
    uCancelMainAdminChange: function(e, t, o) {
        ajax.post("/groupsedit.php", {
            act: "cancel_change_admin",
            id: e,
            hash: t
        }, {
            onDone: function(e) {
                curBox().hide(), showDoneBox(e), TopNotifier.invalidate()
            },
            onFail: function(e) {
                return val("group_box_error", e), show("group_box_error_wrap"), !0
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        })
    },
    uMainAdmin: function() {
        showBox("/groupsedit.php", {
            act: "main_admin",
            id: cur.opts.id
        })
    },
    uInitAdmin: function(e, t, o, r) {
        e.setOptions({
            onClean: function() {
                window.WideDropdown && WideDropdown.deinit("gedit_host_dd")
            },
            bodyStyle: "padding: 25px;"
        }), extend(cur, o, {
            lang: extend(cur.lang || {}, r)
        }), WideDropdown.init("gedit_host_dd", {
            defaultItems: t,
            noResult: getLang("groups_host_not_found"),
            introText: getLang("groups_choose_host"),
            noMultiSelect: 1,
            onItemSelect: function(e) {
                ge("gedit_hostbox_thumb").href = ge("gedit_hostbox_name").href = e[4], ge("gedit_hostbox_img").src = e[3], val(ge("gedit_hostbox_name"), e[1]), cur.hostSel = e
            }
        }), WideDropdown.select("gedit_host_dd", !1, cur.hostSel), e.removeButtons(), e.addButton(getLang("global_save"), GroupsEdit.uSaveAdmin), e.addButton(getLang("global_cancel"), e.hide, "no")
    },
    uSaveAdmin: function() {
        ajax.post("groupsedit.php", {
            act: "save_admin",
            id: cur.hostGid,
            oid: cur.hostSel[0],
            from: cur.hostFrom,
            hash: cur.hostHash
        }, {
            onDone: function(e, t, o) {
                if ("page" == cur.hostFrom) return curBox().hide(), showDoneBox(o), void domPN(ge("event_admin")).replaceChild(se(e), ge("event_admin"));
                var r = "admins";
                toggle("group_u_wrap_additional_" + r, !!t), val("group_u_rows_additional_" + r, t);
                var s = cur.opts.data[r][cur.opts.data[r].length - 1];
                (el = ge("group_u_" + r + e[0])) && domPN(el).replaceChild(se(GroupsEdit.uGenRow(r, e)), el), e[0] > 0 && s[0] < 0 ? (cur.opts.data[r].pop(), --cur.opts.counts[r], (el = ge("group_u_" + r + s[0])) && domPN(el).removeChild(el)) : e[0] < 0 && s[0] > 0 ? (cur.opts.data[r].push(e), ++cur.opts.counts[r], (el = ge("group_u_" + r + s[0])) && domPN(el).appendChild(se(GroupsEdit.uGenRow(r, e)), el)) : (cur.opts.data[r][cur.opts.data[r].length - 1] = e, (el = ge("group_u_" + r + s[0])) && domPN(el).replaceChild(se(GroupsEdit.uGenRow(r, e)), el)), GroupsEdit.uIndex(r, cur.opts.data[r], !0), curBox().hide(), GroupsEdit.showMessage(o), "admins" != cur.tab && nav.go(extend(nav.objLoc, {
                    tab: "admins"
                }))
            },
            showProgress: curBox().showProgress,
            hideProgress: curBox().hideProgress
        })
    },
    uAction: function(e, t, o, r) {
        if (curBox() || !buttonLocked(e) && "progress_inline" != (domFC(e) || {}).className) {
            var s = cur.tab;
            ajax.post("groupsedit.php", {
                act: "user_action",
                id: cur.gid || cur.opts.id,
                addr: t,
                hash: o,
                action: r,
                from: nav.objLoc.act
            }, {
                onDone: function(e, a) {
                    if (GroupsEdit.invalidateBack(), curBox() && curBox().hide(), "search" == nav.objLoc.act && nav.objLoc.from && cur.gid) return val(ge("sgedit_acts" + t), e), val(ge("sgedit_lev" + t), a), void toggleClass(gpeByClass("search_row", "sgedit_lev" + t), "deleted", 0 > r);
                    if (isArray(e)) {
                        var i, n = "requests" == s || "declined" == s || "invites" == s ? [s] : ["members", "unsure", "admins"],
                            u = n.length;
                        for (i = 0; u > i; ++i) {
                            var c, d, p, l = n[i],
                                g = cur.opts.data[l],
                                _ = !1;
                            if (isArray(g))
                                for (c = 0, d = g.length; d > c; ++c)
                                    if (g[c][0] == t) {
                                        _ = !0, cur.opts.data[l][c] = e, "admins" != l && (r ? --cur.opts.counts[l] : ++cur.opts.counts[l]);
                                        break
                                    }(p = ge("group_u_" + l + t)) && (domPN(p).replaceChild(se(GroupsEdit.uGenRow(l, e)), p), "admins" != l && "notavail" == g && (r ? (--cur.opts.counts[l], --cur.offsets[l]) : (++cur.opts.counts[l], ++cur.offsets[l])), toggleClass(ge("group_u_" + l + t), "deleted", 0 > r)), _ || (ajaxCache = {})
                        }("requests" == s && r > 0 || "admins" == s && 0 > r) && (cur.noLocNav = !0), GroupsEdit.uUpdateSummary()
                    } else e ? GroupsEdit.showMessage(e, "error") : GroupsEdit.uRemoveAdmin(t).uRemove = [t, o, r]
                },
                showProgress: function() {
                    curBox() ? curBox().showProgress() : e && "BUTTON" == e.tagName ? lockButton(e) : (e._s || (e._s = val(e)), val(e, '<span class="progress_inline"></span>'))
                },
                hideProgress: function() {
                    curBox() ? curBox().hideProgress() : e && "BUTTON" == e.tagName ? unlockButton(e) : e._s && (val(e, e._s), e._s = !1)
                }
            })
        }
    },
    waitTwitter: function() {
        ajax.post("al_groups.php", {
            act: "get_twitter_auth",
            gid: cur.gid
        }, {
            onDone: function(e) {
                e ? (hide(cur.twitterBox.progress), ge("group_status_export_data").innerHTML = getLang("groups_authorize_please"), cur.twitterBox.removeButtons(), cur.twitterBox.addButton(getLang("groups_auth_in_twitter"), function() {
                    location.href = e
                }), cur.twitterBox.addButton(getLang("global_cancel"), cur.twitterBox.hide, "no")) : cur.twitterTimer = setTimeout(GroupsEdit.waitTwitter, 1e3)
            }
        })
    },
    startTwitter: function() {
        cur.twitterBox = showFastBox({
            title: '<div class="gedit_import_box_icon gedit_import_twitter"></div><div class="gedit_import_box_title">' + getLang("groups_status_export") + "</div>",
            width: 460
        }, '<div class="gedit_status_export_info">  <div class="groups_twitter_info">' + getLang("groups_twitter_desc") + '</div>  <div id="group_status_export_data">' + getLang("groups_external_site_request") + "</div></div>"), cur.twitterBox.setOptions({
            onHide: clearTimeout.bind(window).pbind(cur.twitterTimer)
        }), cur.twitterBox.removeButtons(), addClass(cur.twitterBox.addButton(getLang("groups_auth_in_twitter"), cur.twitterBox.hide, "yes", !0), "button_disabled"), cur.twitterBox.addButton(getLang("global_cancel"), cur.twitterBox.hide, "no"), show(cur.twitterBox.progress), ajax.post("al_groups.php", {
            act: "get_twitter_auth",
            gid: cur.gid,
            first: 1
        }, {
            onDone: function() {
                cur.twitterTimer = setTimeout(GroupsEdit.waitTwitter, 1e3)
            }
        })
    },
    checkTwitter: function() {
        ajax.post("al_groups.php", {
            act: "get_twitter_name",
            gid: cur.gid
        }, {
            onDone: function(e) {
                if (e) {
                    cur.twitterCheckTimer = !1;
                    var t = ge("name_service1");
                    t.innerHTML = e, t.href = "http://twitter.com/" + e
                } else cur.twitterCheckTimer = setTimeout(GroupsEdit.checkTwitter, 1e3)
            }
        })
    },
    removeTwitter: function() {
        showFastBox({
            title: getLang("groups_status_export"),
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("groups_status_confirm"), getLang("global_continue"), function(e) {
            ajax.post("al_groups.php", {
                act: "clear_twitter",
                gid: cur.gid,
                hash: cur.hash
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }, getLang("global_cancel"))
    },
    getFields: function() {
        for (var e = {}, t = 0; t < arguments.length; ++t) {
            var o = arguments[t];
            cur["g_" + o + "DD"] && (e[o] = cur["g_" + o + "DD"].val())
        }
        return e
    },
    nbAddr: function() {
        notaBene("group_edit_addr_table", void 0, !0), notaBene("group_edit_addr", void 0, !0)
    },
    saveInfo: function(e) {
        var t = trim(ge("group_edit_name").value),
            o = trim(ge("group_edit_addr").value);
        if (!t) return notaBene(ge("group_edit_name"));
        if (!o) return GroupsEdit.nbAddr();
        var r = ge("group_sw"),
            s = {
                act: "save",
                gid: cur.gid,
                name: t,
                addr: o,
                description: trim(ge("group_edit_desc").value),
                website: trim(ge("group_website").value),
                sw: r ? trim(r.value) : void 0,
                rss: trim(ge("group_rss").value),
                age_limits: radioval("group_age_limits"),
                hash: cur.hash
            };
        0 == cur.cls || 2 == cur.cls ? (extend(s, GroupsEdit.getFields("access")), s.subject = cur.subjectDD.val(), 2 == cur.cls && extend(s, {
            start_date: val("group_start_date"),
            finish_date: isVisible("group_edit_finish_time") ? val("group_finish_date") : 0,
            host: cur.hostDD ? cur.hostDD.val() : !1,
            email: val("event_mail"),
            phone: val("event_phone")
        })) : 1 == cur.cls && extend(s, {
            pcategory: cur.pcategoryDD.val(),
            psubcategory: cur.psubcategoryDD.val(),
            public_date: val("gedit_public_date")
        }), cur.newCategoriesDD && extend(s, {
            category_0: intval(cur.newCategoriesDD[0].val()),
            category_1: intval(cur.newCategoriesDD[1].val()),
            category_2: intval(cur.newCategoriesDD[2].val())
        }), ajax.post("groupsedit.php", s, {
            onDone: function(e, t) {
                return 0 > e ? GroupsEdit.nbAddr() : e === !1 ? notaBene(ge("group_edit_name")) : "edit_first" == nav.objLoc.act ? nav.go(nav.objLoc[0]) : (GroupsEdit.showMessage(getLang("groups_saved_msg")), scrollToTop(), t != o && (each(geByTag("a"), function() {
                    this.href = this.href.replace(new RegExp("/" + t + "\\?", "g"), "/" + o + "?").replace(new RegExp("/" + t + "$", "g"), "/" + o)
                }), nav.setLoc({
                    0: o,
                    act: "edit"
                }), globalHistoryDestroy(t), ge("group_edit_addr_print_text") && (o != "club" + cur.gid && o != "public" + cur.gid && o != "event" + cur.gid ? ge("group_edit_addr_print_text").innerHTML = cur.lang.groups_print_text.replace("{link}", '<a href="/' + o + '?act=edit&amp;w=print">').replace("{/link}", "</a>") : ge("group_edit_addr_print_text").innerHTML = cur.lang.groups_print_no_domain_text.replace("{link}", '<span onclick="GroupsEdit.nbAddr()">').replace("{/link}", "</span>"))), void globalHistoryDestroy(o))
            },
            onFail: function(e) {
                return e && GroupsEdit.showMessage(e, "error"), !0
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    saveSections: function() {
        var e = {
                act: "save_sections",
                gid: cur.gid,
                hash: cur.hash
            },
            t = ge("group_save");
        0 == cur.cls || 2 == cur.cls ? extend(e, GroupsEdit.getFields("wall", "photos", "video", "audio", "docs", "topics", "wiki")) : 1 == cur.cls && each(["enable_topics", "enable_photos", "enable_video", "enable_audio", "enable_links", "enable_events", "enable_places", "enable_contacts"], function(t, o) {
            e[o] = isChecked(o)
        }), cur.marketCountryDD && (1 == cur.cls ? e.enable_market = isChecked("enable_market") : extend(e, GroupsEdit.getFields("market")), (e.market || e.enable_market) && (extend(e, GroupsEdit.getFields("market_comments", "market_wiki")), e.market_country = cur.marketCountryDD.val(), isVisible("group_market_city_wrap") && (e.market_city = cur.marketCityDD.val()), e.market_currency = cur.marketCurrencyDD.val(), e.market_contact = cur.marketContactDD.val(), isVisible("market_button_type_link") && (e.market_button_type = cur.marketButtonType.val(), e.market_button_name = trim(val("group_market_button_name"))))), ajax.post("groupsedit.php", e, {
            onDone: function(e) {
                return -2 != e && -3 != e || isVisible("group_edit_market") || GroupsEdit.toggleMarketBlock(!0), -2 == e ? notaBene(domPN(ge("group_market_country"))) : -3 == e ? notaBene(domPN(ge("group_market_contact"))) : -4 == e ? notaBene(domPN(ge("group_market_button_name"))) : (GroupsEdit.showMessage(getLang("groups_sections_saved_msg")), scrollToTop(), void globalHistoryDestroy(nav.objLoc[0]))
            },
            onFail: function(e) {
                return e && GroupsEdit.showMessage(e, "error"), !0
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    saveComments: function() {
        var e = {
                gid: cur.gid,
                act: "save_comments",
                obscene_filter: isChecked("group_obcene_words"),
                obscene_stopwords: isChecked("group_obscene_stopwords"),
                Obscene_words: val("group_edit_obscene_stopwords"),
                hash: cur.hash
            },
            t = ge("group_save");
        1 == cur.cls && (e.enable_replies = isChecked("enable_replies")), ajax.post("/groupsedit.php", e, {
            onDone: function(e, t) {
                switch (e) {
                    case -7:
                        key = "obscene_word_wrong_chars";
                        break;
                    case -6:
                        key = "obscene_word_too_short";
                        break;
                    default:
                        key = "obscene_save_patterns_error"
                }
                return e ? 0 > e ? (words_field = ge("group_edit_obscene_stopwords"), notaBene(words_field, "warning")) : (GroupsEdit.showMessage(getLang("groups_comments_saved_msg")), scrollToTop(), void globalHistoryDestroy(nav.objLoc[0])) : GroupsEdit.uShowMessage(getLang(key))
            },
            onFail: function(e) {
                return e = e || getLang("global_unknown_error"), GroupsEdit.showMessage(e, "error"), !0
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    saveMessages: function() {
        var e = {
                act: "save_messages",
                gid: cur.gid,
                first_message: trim(ge("group_edit_first_message").value),
                hash: cur.hash
            },
            t = ge("group_save");
        if (extend(e, GroupsEdit.getFields("messages")), e.messages && (e.messages_widget_info = trim(val("messages_widget_info")), e.messages_widget_offline_info = trim(val("messages_widget_offline_info")), e.messages_widget_domains = val("messages_widget_domains"), e.messages_widget_enable = hasClass("messages_widget_enable", "on") ? 1 : 0, extend(e, GroupsEdit.getFields("messages_chat_bot_group")), e.messages_chat_bot_group)) {
            var o = geByClass1("_messages_enabled_bot_keyboard");
            e.messages_enable_start = hasClass(o, "on") ? 1 : 0
        }
        ajax.post("groupsedit.php", e, {
            onDone: function() {
                GroupsEdit.showMessage(getLang("groups_messages_saved_msg")), scrollToTop(), globalHistoryDestroy(nav.objLoc[0])
            },
            onFail: function(e) {
                return e && GroupsEdit.showMessage(e, "error"), !0
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    checkAddr: function(e) {
        if (clearTimeout(cur.checkAddrTimer), e) {
            var t = ge("group_edit_addr"),
                o = t.value.replace(/[^0-9a-zA-Z_\.]/g, "");
            return o != t.value && (t.value = o), void(cur.checkAddrTimer = setTimeout(GroupsEdit.checkAddr.pbind(!1), 1e3))
        }
        var r = ge("group_edit_addr").value;
        r && ajax.post("al_settings.php", {
            act: "check_addr",
            addr: r,
            oid: -cur.gid
        }, {
            onDone: function(e, t) {
                e || GroupsEdit.nbAddr();
                var o = ge("group_edit_addr_table");
                showTooltip(o, {
                    text: function() {
                        return t
                    },
                    slideX: 15,
                    className: "group_edit_tt",
                    hasover: 1,
                    shift: [-313, -15, -15],
                    dir: "left",
                    onCreate: function() {
                        o.tt && setTimeout(o.tt.hide, 3e3)
                    }
                })
            }
        })
    },
    show: function(e, t) {
        isVisible(e) || slideDown(e, 150, t)
    },
    hide: function(e, t) {
        isVisible(e) && slideUp(e, 150, t)
    },
    checkNewLinesFirstMessage: function(e) {
        var t = e.value;
        paramValue = t.substr(0, cur.group_first_message_max_length), paramValue = GroupsEdit.replaceValueNewLines(paramValue, cur.group_first_message_max_new_lines), paramValue !== t && (e.value = paramValue)
    },
    init: function(e) {
        if (autosizeSetup("group_edit_desc", {
                minHeight: 68,
                maxHeight: 600
            }), cur.twitterVal = e.twitter, extend(cur, {
                module: "groups_edit",
                cls: e.cls,
                new_categories_allowed: e.new_categories_allowed,
                group_first_message_max_length: e.group_first_message_max_length,
                group_first_message_max_new_lines: e.group_first_message_max_new_lines,
                shareSetOwnPhoto: function(e, t) {
                    return val(geByClass1("_cover_upload_label"), t), curBox() && curBox().hide(), scrollToTop(), GroupsEdit.invalidateBack(), GroupsEdit.showMessage(e)
                }
            }), (0 == cur.cls || 2 == cur.cls) && (extend(cur, {
                subjectDD: new Dropdown(ge("group_subject"), e.subjects, {
                    width: 300,
                    dark: !0,
                    multiselect: !1,
                    autocomplete: !0,
                    introText: getLang("groups_start_typing_subject"),
                    zeroPlaceholder: !0,
                    noResult: "",
                    placeholder: getLang("groups_choose_subject")
                })
            }), e.subject && "0" != e.subject && cur.subjectDD.val(e.subject)), 1 == cur.cls) extend(cur, {
            pcategoryDD: new Dropdown(ge("public_type"), e.pcategories, {
                width: 300,
                dark: !0,
                zeroPlaceholder: !0,
                multiselect: !1,
                autocomplete: !1,
                onChange: function(t) {
                    t = intval(t), t && (e.psubcategories[t] || {}).length > 1 ? (cur.psubcategoryDD.setOptions({
                        defaultItems: e.psubcategories[t]
                    }), cur.psubcategoryDD.val(0), cur.new_categories_allowed || GroupsEdit.show(ge("group_edit_psubcategory"))) : GroupsEdit.hide(ge("group_edit_psubcategory")), void 0 !== e.plabelsmap[t] ? val("gedit_public_date_label", e.plabels[e.plabelsmap[t]]) : val("gedit_public_date_label", e.plabels[e.plabelsmap[0]])
                }
            }),
            psubcategoryDD: new Dropdown(ge("public_subtype"), e.psubcategories[e.pcategory || 0] || [], {
                width: 300,
                dark: !0,
                zeroPlaceholder: !0,
                multiselect: !1,
                autocomplete: !1
            }),
            bdPicker: new Daypicker("gedit_public_date", {
                startYear: 1800,
                width: 300,
                dark: !0,
                zeroPlaceholder: !0
            })
        }), cur.pcategoryDD.val(e.pcategory, !0), cur.psubcategoryDD.val(e.psubcategory);
        else if (2 == cur.cls) {
            new Datepicker("group_start_date", {
                time: "group_start_time",
                width: 150,
                resfmt: "plain"
            }), new Datepicker("group_finish_date", {
                time: "group_finish_time",
                width: 150,
                resfmt: "plain"
            });
            var t = 282,
                o = geByClass1("group_edit_at", ge("group_edit_start_time"));
            t += o.offsetWidth;
            var r = 300 - t,
                s = Math.floor(r / 2),
                a = r - s,
                i = {
                    paddingLeft: s + "px",
                    paddingRight: a + "px"
                };
            setStyle(o, i), setStyle(geByClass1("group_edit_at", ge("group_edit_finish_time")), i), e.hosts && extend(cur, {
                hostDD: new Dropdown(ge("event_host"), e.hosts, {
                    width: 300,
                    dark: !0,
                    multiselect: !1,
                    autocomplete: !1,
                    selectedItems: [e.host]
                })
            })
        }
        cur.destroy.push(function(e) {
            0 == e.cls ? e.subjectDD.destroy() : 1 == e.cls ? (e.pcategoryDD.destroy(), e.psubcategoryDD.destroy()) : 2 == e.cls && (e.subjectDD.destroy(), e.hostDD && e.hostDD.destroy())
        }), placeholderSetup("group_rss")
    },
    initSections: function(e) {
        2 != cur.cls && e.marketCountries && (selectsData.setCountries(e.marketCountries), selectsData.setCities(e.marketCountry, e.marketCities), cur.marketCountryChange = function() {
            var e = clone(cur.marketCountryDD.val_full()),
                t = e.length;
            if (t) {
                if (cur.tagRemoved) return void(cur.tagRemoved = !1);
                e = e.pop(), e[0] < 0 ? (cur.marketCountryDD.clear(), cur.marketCountryDD.val(e, !1), cur.marketCountryDD.setOptions({
                    maxItems: 1
                }), cur.marketCityDD.hide()) : t > 1 ? cur.marketCityDD.hide() : (cur.marketCountryDD.setOptions({
                    maxItems: 10
                }), cur.marketCityDD.show())
            }
        }, cur.marketCityDD = new CitySelect(ge("group_market_city"), ge("group_market_city_wrap"), {
            width: 300,
            dark: !0,
            multiselect: !0,
            maxItems: 30,
            placeholder: getLang("groups_market_select_city"),
            placeholderColor: "#999",
            city: e.marketCityVal,
            country: e.marketCountry,
            maxItemsShown: function(e) {
                return e > 6 ? 500 : 350
            }
        }), cur.marketCountryDD = new CountrySelect(ge("group_market_country"), ge("group_market_country_wrap"), {
            width: 300,
            dark: !0,
            multiselect: !0,
            maxItems: 10,
            placeholder: getLang("groups_market_select_country"),
            placeholderColor: "#999",
            noDefaultCountry: !0,
            country: 0,
            selectedItems: e.marketCountryVal,
            citySelect: cur.marketCityDD,
            onChange: cur.marketCountryChange,
            onTagRemove: function(e, t) {
                cur.tagRemoved = !0;
                var o = t.split(",");
                1 == o.length && (cur.marketCityDD.show(), cur.marketCountryDD.setOptions({
                    maxItems: 10
                }))
            }
        }), cur.marketCountryChange(), cur.marketCurrencyDD = new Dropdown(ge("group_market_currency"), e.marketCurrencies, {
            width: 300,
            dark: !0,
            multiselect: !1,
            selectedItems: e.marketCurrency
        }), cur.marketContactDD = new Dropdown(ge("group_market_contact"), e.marketContacts, {
            width: 300,
            dark: !0,
            multiselect: !1,
            autocomplete: !0,
            introText: getLang("groups_start_typing_contact"),
            noResult: "",
            placeholder: getLang("groups_choose_market_contact")
        }), void 0 !== e.marketContact && cur.marketContactDD.val(e.marketContact), cur.marketButtonType = new Dropdown(ge("group_market_button_type"), e.marketButtonTypes, {
            width: 300,
            dark: !0,
            multiselect: !1,
            autocomplete: !1,
            selectedItems: e.marketButtonType,
            onChange: function(e) {
                0 === intval(e) ? (show("market_button_type_im"), hide("market_button_type_link")) : 1 === intval(e) && (hide("market_button_type_im"), show("market_button_type_link"))
            }
        })), cur.destroy.push(function(e) {
            e.marketCountryDD && (e.marketCountryDD.destroy(), e.marketCityDD.destroy(), e.marketCurrencyDD.destroy(), e.marketContactDD.destroy(), e.marketButtonType.destroy())
        })
    },
    initMessages: function() {
        var e = ge("messages_widget_domains");
        e && (cur.messagesWidgetDomains = new TagsDD(e, {
            width: 300,
            search: 0,
            paddings: 1,
            placeholder: ""
        })), autosizeSetup("group_edit_first_message", {
            minHeight: 68,
            maxHeight: 600
        });
        var t = ge("group_edit_first_message"),
            o = GroupsEdit.checkNewLinesFirstMessage.pbind(t);
        addEvent(t, "keydown keyup keypress change paste cut drop input blur", o), cur.destroy.push(function(e) {
            removeEvent(t, "keydown keyup keypress change paste cut drop input blur", o)
        })
    },
    addBlacklist: function() {
        showBox("/groupsedit.php", {
            act: "search_add_box",
            gid: cur.gid,
            to: "blacklist"
        }, {
            stat: ["page.css"]
        })
    },
    addAdmin: function() {
        showBox("/groupsedit.php", {
            act: "search_add_box",
            gid: cur.gid || cur.opts.id,
            to: "admins"
        }, {
            stat: ["page.css"]
        })
    },
    initSearchBox: function(e, t, o) {
        extend(cur, t), o && ajax.preload(cur.searchBoxAddress, cur.searchBoxParams, o), window.uiScrollBox && uiScrollBox.init(e, {
            onShow: function() {
                addEvent(boxLayerWrap, "scroll", GroupsEdit.boxScrollResize), setTimeout(GroupsEdit.boxScrollResize, 0)
            },
            onHide: function() {
                removeEvent(boxLayerWrap, "scroll", GroupsEdit.boxScrollResize)
            }
        }), addEvent(boxLayerWrap, "scroll", GroupsEdit.boxScrollResize), GroupsEdit.boxScrollResize()
    },
    boxScrollResize: function() {
        if (!browser.mobile) {
            var e = lastWindowHeight,
                t = ge(cur.boxMoreLink);
            t && isVisible(t) && e > getXY(t, !0)[1] && cur.boxShowMore()
        }
    },
    moreSearchBoxLoaded: function(e, t, o) {
        cur.searchBoxParams.offset = t;
        for (var r = cur.boxRows, s = ce("div", {
                innerHTML: e
            }); s.firstChild;) r.appendChild(s.firstChild);
        toggle(cur.boxMoreLink, o), o && (cur.loading = 1, ajax.post(cur.searchBoxAddress, cur.searchBoxParams, {
            onDone: function() {
                2 == cur.loading ? GroupsEdit.moreSearchBoxLoaded.apply(window, arguments) : cur.loading = !1
            },
            onFail: function() {
                return cur.loading = 0, !0
            },
            cache: 1
        }))
    },
    moreSearchBox: function(e, t, o) {
        var r = cur.boxMoreLink;
        if (r && (e || isVisible(r) && !hasClass(r, "loading")) && (!e || o != cur.searchBoxParams.q)) {
            if (cur.loading) return void(cur.loading = 2);
            e && (cur.oldBoxParams = {
                q: cur.searchBoxParams.q,
                offset: cur.searchBoxParams.offset
            }, extend(cur.searchBoxParams, {
                q: o,
                offset: 0
            })), ajax.post(cur.searchBoxAddress, cur.searchBoxParams, {
                onDone: function(o, r, s, a) {
                    if (e) {
                        if (a) return extend(cur.searchBoxParams, cur.oldBoxParams), t && val(t, cur.oldBoxParams.q), void(cur.searchBoxFound && cur.searchBoxFound(a));
                        cur.boxRows.innerHTML = o ? "" : cur.boxNoRowsTpl, curBox().tbToTop()
                    }
                    GroupsEdit.moreSearchBoxLoaded.apply(window, arguments)
                },
                onFail: function() {
                    return cur.loading = 0, !0
                },
                showProgress: function() {
                    t && !cur.searchBoxParams.offset ? uiSearch.showProgress(t) : addClass(r, "loading")
                },
                hideProgress: function() {
                    t && uiSearch.hideProgress(t), removeClass(r, "loading")
                },
                cache: 1
            })
        }
    },
    toggleBlacklist: function(e, t) {
        var o = ge("group_bl_row" + e),
            r = o && !hasClass(o, "deleted");
        isVisible("group_bl_progress" + e) || ajax.post("groupsedit.php", {
            act: "bl_user",
            mid: e,
            gid: cur.gid,
            hash: cur.hash
        }, {
            onDone: function(e, t, o, r) {
                GroupsEdit.updateBlacklist(cur.gid, e, t, o, r)
            },
            showProgress: function() {
                hide("group_bl_actions" + e, "group_bl_restore" + e), show("group_bl_progress" + e)
            },
            hideProgress: function() {
                hide("group_bl_progress" + e), show((r ? "group_bl_actions" : "group_bl_restore") + e)
            }
        })
    },
    editBlacklist: function(e) {
        showBox("/groupsedit.php", {
            act: "bl_edit",
            name: "id" + e,
            gid: cur.gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            onFail: function(e) {
                return GroupsEdit.showMessage(e, "error"), !0
            }
        })
    },
    updateBlacklist: function(e, t, o, r, s) {
        if (o && curBox() && (curBox().emit("success", {
                delta: s,
                msg: t
            }), boxQueue.hideAll()), 0 === t) return GroupsEdit.editBlacklist(o);
        if (t) {
            if (!o && ge("group_blb_error")) return val("group_blb_error", t), void show("group_blb_error_wrap");
            GroupsEdit.showMessage(t)
        }
        if ("search" == nav.objLoc.act && "ban" == nav.objLoc.from && o) return nav.go(nav.objLoc[0] + "?act=blacklist", !1, {
            noback: !0
        });
        var a = ge("group_bl_rows");
        if (a && cur.gid == e) {
            var i = ge("group_bl_row" + o),
                n = se(r);
            if (!i && 0 >= s) return;
            i && s && (toggle("group_bl_actions" + o, s > 0), toggle("group_bl_restore" + o, 0 > s), toggleClass(i, "deleted", 0 > s)), i && s >= 0 ? domPN(i).replaceChild(n, i) : !i && s > 0 && (a.insertBefore(n, domFC(a)), hide("group_bl_no")), GroupsEdit.recache(cur.offset, s), GroupsEdit.updateBlacklistSummary(s)
        }
    },
    updateBlacklistSummary: function(e) {
        cur.count += e, ge("group_bl_summary").innerHTML = cur.count > 0 ? langNumeric(cur.count, "%s", !0) : ""
    },
    scrollResize: function() {
        if (!browser.mobile) {
            var e = document.documentElement,
                t = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                o = scrollGetY(),
                r = ge(cur.moreLink);
            isVisible(r) && o + t > r.offsetTop && cur.showMore()
        }
    },
    initScroll: function() {
        window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0, addEvent(window, "scroll", GroupsEdit.scrollResize), addEvent(window, "resize", GroupsEdit.scrollResize), removeEvent(window, "load", GroupsEdit.initScroll)
    },
    deinitScroll: function() {
        removeEvent(window, "scroll", GroupsEdit.scrollResize), removeEvent(window, "resize", GroupsEdit.scrollResize)
    },
    recache: function(e, t) {
        if (cur.loading) return cur.loading = 1, void setTimeout(GroupsEdit.recache.pbind(e, t), 100);
        var o = cur.offset,
            r = "/" + nav.objLoc[0] + "#" + ajx2q(extend({
                offset: 12345,
                part: 1
            }, cur.moreParams)),
            s = ajaxCache[r.replace("12345", o)];
        s && (s[0] += t, ajaxCache[r.replace("12345", o + t)] = s, delete ajaxCache[r.replace("12345", o)]), cur.offset += t
    },
    loaded: function(e, t) {
        cur.offset = e;
        for (var o = ge("group_bl_rows"), r = ce("div", {
                innerHTML: t
            }); r.firstChild;) o.appendChild(r.firstChild);
        return e >= cur.count || !t ? void hide("group_edit_more") : (cur.loading = 1, void ajax.post(nav.objLoc[0], extend({
            offset: cur.offset,
            part: 1
        }, cur.moreParams), {
            cache: 1,
            onDone: function() {
                2 == cur.loading ? GroupsEdit.loaded.apply(window, arguments) : cur.loading = !1
            },
            onFail: function() {
                return cur.loading = 0, !0
            }
        }))
    },
    load: function() {
        var e = ge("group_edit_more");
        if (e && isVisible(e) && !hasClass(e, "loading")) return cur.loading ? void(cur.loading = 2) : void ajax.post(nav.objLoc[0], extend({
            offset: cur.offset,
            part: 1
        }, cur.moreParams), {
            onDone: GroupsEdit.loaded,
            onFail: function() {
                return cur.loading = 0, !0
            },
            showProgress: addClass.pbind(e, "loading"),
            hideProgress: removeClass.pbind(e, "loading"),
            cache: 1
        })
    },
    initLinks: function() {
        if (elfocus("group_l_search"), cur.module = "groups_edit", !isVisible("group_l_no")) {
            var e = ge("group_l_rows");
            sorter.init(e, {
                onReorder: GroupsEdit.reorderLinks,
                dh: 1
            }), cur.destroy.push(e.sorter.destroy)
        }
    },
    reorderLinks: function(e, t, o) {
        for (var r = e.id.replace("group_l_row", ""); o && (!o.id || isVisible("group_l_restore" + o.id.replace("group_l_row", "")));) o = o.previousSibling;
        var s = (o && o.id || "").replace("group_l_row", "");
        ajax.post("groupsedit.php", {
            act: "reorder_links",
            gid: cur.gid,
            hash: cur.hash,
            lid: r,
            after: s
        }, {
            onDone: GroupsEdit.invalidateBack
        })
    },
    editLink: function(e) {
        return showBox("/groupsedit.php", {
            act: "edit_link",
            lid: e,
            gid: cur.gid,
            hash: cur.hash
        }, {
            params: {
                width: 450
            }
        })
    },
    invalidateBack: function() {
        globalHistoryDestroy(nav.objLoc[0]);
        var e = cur.gid || -cur.oid;
        e && (globalHistoryDestroy("club" + e), globalHistoryDestroy("event" + e), globalHistoryDestroy("public" + e))
    },
    linkAction: function(e, t, o) {
        var r = "delete_link" == t;
        if (!r && cur.count >= cur.linksLimit) return GroupsEdit.showMessage(getLang("global_unknown_error"), !0);
        var s = {
            act: t,
            lid: o,
            gid: cur.gid,
            hash: cur.hash
        };
        if (GroupsEdit.linksCount(cur.count + (r ? -1 : 1)), !r) {
            for (var a = ge("group_l_row" + o).previousSibling; a && (!a.id || isVisible("group_l_restore" + a.id.replace("group_l_row", "")));) a = a.previousSibling;
            s.after = (a && a.id || "").replace("group_l_row", "")
        }
        return ajax.post("groupsedit.php", s, {
            onDone: function() {
                GroupsEdit.invalidateBack(), toggle("group_l_actions" + o, !r), toggle("group_l_restore" + o, r), toggleClass("group_l_row" + o, "deleted", r)
            },
            onFail: function() {
                GroupsEdit.linksCount(cur.count + (r ? 1 : -1))
            },
            showProgress: function() {
                hide("group_l_actions" + o, "group_l_restore" + o), show("group_l_progress" + o)
            },
            hideProgress: function() {
                hide("group_l_progress" + o), show((r ? "group_l_actions" : "group_l_restore") + o)
            }
        }), !1
    },
    updateImgs: function() {
        cur.lnkImages.length > 1 && (ge("group_al_thumb_img").parentNode.style.cursor = "pointer")
    },
    rotateImgs: function() {
        if (!(cur.lnkImages.length < 2)) {
            var e = ((cur.lnkIndex || 0) + 1) % cur.lnkImages.length;
            ge("group_al_thumb_img").src = cur.lnkImages[e], cur.lnkIndex = e
        }
    },
    parseLink: function(e, t) {
        /https?:\/\//i.test(e) || (e = "http://" + e);
        var o = curBox();
        t && !/https?:\/\//i.test(t) && (t = "http://" + t), show(o.progress);
        var r = ge("group_l_bar");
        re(cur.lnkParse), cur.lnkParse = r.insertBefore(ce("div", {
            innerHTML: '<iframe class="upload_frame" name="link_parse_iframe"></iframe>   '
        }), r.firstChild);
        var s = cur.lnkParse.appendChild(ce("form", {
            action: cur.parseUrl,
            method: "post",
            target: "link_parse_iframe"
        }));
        each({
            act: "parse_share",
            from_host: locHost,
            mid: vk.id,
            hash: cur.parseHash,
            rhash: cur.parseRHash,
            url: e
        }, function(e, t) {
            s.appendChild(ce("input", {
                type: "hidden",
                name: e,
                value: t
            }))
        }), cur.lnkImages = ["/images/lnkouter" + window._iconAdd + ".png"], window.onParseDone = function(r) {
            if (hide(o.progress), GroupsEdit.showLinkInfo(r.title || "", t || e), r.images && r.images.length) {
                curBox().setOptions({
                    onClean: function() {
                        clearInterval(cur.imgLoadInterval)
                    }
                });
                for (var s in r.images) {
                    var a = "",
                        i = vkImage();
                    /^\//.test(r.images[s]) ? a = (/^https:\/\//i.test(e) ? "https://" : "http://") + GroupsEdit.getDomain(e) : /^https?:\/\//i.test(r.images[s]) || (a = e.replace(/[^\/]*$/, ""), /^https?:\/\/$/i.test(a) && (a = e + "/")), i.src = a + r.images[s], r.images[s] = i
                }
                cur.imgLoadInterval = setInterval(function() {
                    var e = 0;
                    for (var t in r.images) {
                        var o = r.images[t];
                        if (o) {
                            var s = o.width,
                                a = o.height;
                            s || a ? (s >= 50 && a >= 20 && (cur.lnkImages.push(o.src), GroupsEdit.updateImgs(), cur.lnkIndex || GroupsEdit.rotateImgs()), r.images[t] = !1) : ++e
                        }
                    }
                    e || (clearInterval(cur.imgLoadInterval), cur.imgLoadInterval = !0)
                }, 200)
            }
        }, window.onParseFail = function() {
            hide(o.progress), GroupsEdit.showLinkInfo("", t || e)
        }, s.submit()
    },
    getDomain: function(e) {
        return "/" == e.charAt(0) ? locDomain : e.match(/^(https?:\/\/)?([^\/]+)(\/|$)/)[2]
    },
    showLinkInfo: function(e, t) {
        var o = cur.lnkImages[0];
        cur.lnk = t, cur.lnkOwnerId = cur.lnkPhotoId = !1, cur.editing = !1, ge("group_al_link_info").innerHTML = rs(cur.linkInfoTpl, {
            thumb: o,
            title: trim(clean(e)),
            position: GroupsEdit.getDomain(t)
        });
        var r = ge("group_al_title");
        placeholderInit(r), elfocus(r)
    },
    addLinkBox: function() {
        return showBox("/groupsedit.php", {
            act: "add_link_box",
            gid: cur.gid,
            hash: cur.hash
        })
    },
    checkLink: function(e) {
        clearTimeout(cur.checkLinkTO), cur.checkLinkTO = setTimeout(this.getLinkInfo.pbind(e), 500)
    },
    getLinkInfo: function(e) {
        var t = trim(e.value).replace(/\s/g, "+"),
            o = curBox();
        return t ? (cur.lnkIndex = 0, cur.lnkSent = t, void ajax.post("groupsedit.php", {
            act: "get_link_info",
            lnk: t
        }, {
            onDone: function(r, s, a, i) {
                if (t != cur.lnkSent) return !1;
                if (GroupsEdit.hideMessage(), r > 0) 1 & r ? (show(o.progress), ajax.plainpost(s, {
                    _tmp: 1
                }, function(e) {
                    hide(o.progress);
                    var t = trim((e.match(/<title>([^<]*)/i) || {})[1] || "");
                    cur.lnkImages = ["/images/lnkinner" + window._iconAdd + ".png?1"], cur.lnk = s, GroupsEdit.showLinkInfo(t, s)
                }, 2 & r ? GroupsEdit.parseLink.pbind(a, i) : function(t) {
                    return hide(o.progress), GroupsEdit.showMessage(getLang("groups_bad_link"), !0), elfocus(e)
                }, !0)) : 2 & r && GroupsEdit.parseLink(s, a);
                else {
                    if (0 > r) return GroupsEdit.showMessage(getLang("groups_bad_link"), !0), elfocus(e);
                    cur.lnk = s, cur.lnkOwnerId = cur.lnkPhotoId = !1, ge("group_al_link_info").innerHTML = a
                }
            },
            progress: o.progress
        })) : elfocus(e)
    },
    uploadImg: function() {
        var e = ge("group_l_bar"),
            t = e.appendChild(ce("div", {
                innerHTML: '<iframe class="upload_frame" name="link_upload_iframe"></iframe>'
            })),
            o = t.appendChild(ce("form", {
                action: "/share.php",
                method: "post",
                target: "link_upload_iframe"
            }));
        each({
            act: "a_photo",
            index: 0,
            image: cur.lnkImages[cur.lnkIndex],
            extra: "link",
            hash: vk.ip_h
        }, function(e, t) {
            o.appendChild(ce("input", {
                type: "hidden",
                name: e,
                value: t
            }))
        }), window.onUploadDone = function(o, r) {
            window.onUploadFail = window.onUploadDone = function() {}, cur.lnkOwnerId = r.user_id, cur.lnkPhotoId = r.photo_id, e.removeChild(t), cur.lnkIndex = 0, GroupsEdit.doAddLink(!0)
        }, window.onUploadFail = function(o, r) {
            window.onUploadFail = window.onUploadDone = function() {}, e.removeChild(t), cur.lnkIndex = 0, GroupsEdit.doAddLink(!0)
        }, cur.lnkOwnerId = cur.lnkPhotoId = !1, o.submit()
    },
    showMessage: function(e, t) {
        var o = curBox() ? ge("group_edit_box_msg") : ge("group_edit_msg"),
            r = domFC(o);
        r && (r.innerHTML = e, o.className = t ? "info" == t ? "msg info_msg" : "msg error" : "msg ok_msg", show(o), "error" == t && scrollToTop())
    },
    hideMessage: function() {
        var e = curBox() ? ge("group_edit_box_msg") : ge("group_edit_msg");
        hide(e)
    },
    linksCount: function(e) {
        cur.count = e, ge("group_l_summary").innerHTML = e ? langNumeric(e, "%s", !0) : "", toggle("group_l_bar", e < cur.linksLimit)
    },
    doAddLink: function(e) {
        var t = curBox(),
            o = ge("group_al_title"),
            r = ge("group_al_position"),
            s = t.btns.ok[0];
        if ((e || !buttonLocked(s)) && (o || r)) {
            if (lockButton(s), o && cur.lnkIndex) return GroupsEdit.uploadImg();
            var a, i = (o || r).value,
                n = {
                    lnk: cur.lnk,
                    index: cur.lnkIndex,
                    owner_id: cur.lnkOwnerId,
                    photo_id: cur.lnkPhotoId,
                    str: i,
                    gid: cur.gid,
                    lid: cur.editing,
                    hash: cur.hash
                };
            cur.editing ? (n.act = "do_edit_link", a = function(e, o, r, s) {
                t.hide(), GroupsEdit.invalidateBack(), o !== !1 && (ge("group_l_photo" + e).src = o), r !== !1 && (ge("group_l_title" + e).innerHTML = r), s !== !1 && (ge("group_l_position" + e).innerHTML = s)
            }) : (n.act = "add_link", a = function(e, o, r) {
                t.hide(), GroupsEdit.invalidateBack(), GroupsEdit.showMessage(o);
                var s = ge("group_l_rows"),
                    a = ge("group_l_search");
                s.insertBefore(se(r), s.firstChild), GroupsEdit.linksCount(e), val(a, ""), uiSearch.onChanged(a), elfocus(a)
            }), setTimeout(ajax.post.pbind("groupsedit.php", n, {
                onDone: a,
                onFail: function(e) {
                    return t.hide(), GroupsEdit.showMessage(e || getLang("groups_bad_link"), !0), !0
                },
                showProgress: lockButton.pbind(s),
                hideProgress: unlockButton.pbind(s)
            }), 0)
        }
    },
    filterLinks: function(e) {
        e && (e = e.toLowerCase());
        var t = ge("group_l_no"),
            o = getLang("groups_no_links_found"),
            r = ge("group_l_rows"),
            s = geByClass("group_l_row", r),
            a = 0;
        r.sorter && r.sorter.destroy();
        for (var i in s) {
            var n = s[i];
            if (e) {
                var u = val(geByClass1("group_l_title", n));
                u = u.toLowerCase(), u.indexOf(e) > -1 ? (show(n), a++) : hide(n)
            } else show(n), a++;
            setStyle(n, {
                left: null,
                top: null,
                width: null,
                zIndex: null,
                cursor: null
            })
        }
        if (e && !a) {
            var c = o.split("{query}").join("<b>" + e.replace(/([<>&#]*)/g, "") + "</b>");
            t.innerHTML = c
        } else t.innerHTML = getLang("groups_no_links");
        toggle(t, !a), !e && a && sorter.init(r, {
            onReorder: GroupsEdit.reorderLinks,
            dh: 1
        }), hasClass(ge("group_l_bar"), "ui_search_fixed") && scrollToY(ge("gedit_search_input_wrap").offsetTop, 0)
    },
    editPlace: function() {
        showBox("/al_page.php", {
            act: "edit_group_place",
            gid: cur.gid
        }, {
            stat: ["maps.js", "ui_controls.js", "ui_controls.css", "selects.js", "page.css"]
        })
    },
    onPlaceSave: function(e) {
        ge("group_edit_address_link").innerHTML = e
    },
    switchAdSubTab: function(e, t, o) {
        if (checkEvent(o) || hasClass(e, "summary_tab_sel")) return !1;
        each(geByClass("summary_tab_sel", domPN(e)), function(e, t) {
            replaceClass(t, "summary_tab_sel", "summary_tab")
        }), replaceClass(e, "summary_tab", "summary_tab_sel");
        var r = nav.fromStr(t),
            s = r[0];
        return delete r[0], ajax.post(s, extend(r, {
            part: 1
        }), {
            cache: 1,
            onDone: function(e) {
                ge("group_ad_requests_table_wrap").innerHTML = e, delete r.part, nav.setLoc(extend(r, {
                    0: nav.objLoc[0]
                }))
            }
        }), !1
    },
    getAdPage: function(e, t) {
        var o = clone(nav.objLoc),
            r = o[0];
        return delete o[0], ajax.post(r, extend(o, {
            offset: e,
            part: 1
        }), {
            onDone: function(o) {
                ge(t || "group_ad_requests_table_wrap").innerHTML = o, nav.setLoc(extend(nav.objLoc, {
                    offset: e
                }))
            },
            progress: ge("group_ad_requests_pages_loading")
        }), !1
    },
    getAdWithdrawalPage: function(e) {
        return ajax.post("/groupsedit.php", {
            act: "a_adspost_withdrawal_history",
            gid: cur.gid,
            offset: e
        }, {
            onDone: function(e) {
                ge("group_ad_withdrawal_table").innerHTML = e
            },
            progress: ge("group_ad_pages_loading")
        }), !1
    },
    updateAdRequest: function(e, t, o, r) {
        return !showBox("/groupsedit.php", {
            act: "a_adspost_update_request",
            gid: cur.gid,
            ad_id: e,
            request_id: t,
            status: o,
            hash: r
        })
    },
    toggleAdOtherSettings: function() {
        return isVisible("group_ad_other_settings") ? (ge("group_ad_other_settings_lnk").innerHTML = getLang("groups_adspost_show_other_settings"), slideUp(ge("group_ad_other_settings"), 150)) : (ge("group_ad_other_settings_lnk").innerHTML = getLang("groups_adspost_hide_other_settings"), slideDown(ge("group_ad_other_settings"), 150), GroupsEdit.initAdOtherSettings()), !1
    },
    initAdOtherSettings: function() {
        cur.adOtherSettingInit || (cur.adOtherSettingInit = !0, ge("group_ad_subject") && (cur.subjectDD = new Dropdown(ge("group_ad_subject"), cur.selData.subjects, {
            width: 300,
            dark: !0,
            multiselect: !1,
            autocomplete: !0,
            introText: getLang("groups_start_typing_subject"),
            noResult: "",
            placeholder: getLang("groups_choose_subject")
        }), cur.selData.subject && "0" != cur.selData.subject && cur.subjectDD.val(cur.selData.subject), cur.destroy.push(function(e) {
            e.subjectDD.destroy()
        })))
    },
    updateAdRecommendedCost: function(e) {
        var t = {
            act: "a_adspost_recom_cost",
            gid: cur.gid
        };
        e && (t.subject = e), ajax.post("/groupsedit.php", t, {
            cache: 1,
            onDone: function(e) {
                var t = ge("group_ad_cost_label");
                e && t && showTooltip(t, {
                    text: function() {
                        return e
                    },
                    slideX: 15,
                    className: "pedit_tt",
                    hasover: 1,
                    shift: [-getSize(t)[0] - 10, -9, 0],
                    dir: "left"
                })
            }
        })
    },
    saveAdNotificationsSettings: function(e, t) {
        var o = {
            act: "a_adspost_notify_save",
            gid: cur.gid,
            hash: t,
            events: [],
            sms_events: [],
            pm_events: []
        };
        for (var r in cur.selData.events) o.events.push(r + ":" + isChecked("notification_event_" + r)), o.sms_events.push(r + ":" + isChecked("notification_event_sms_" + r)), o.pm_events.push(r + ":" + isChecked("notification_event_pm_" + r));
        o.events = o.events.join(","), o.sms_events = o.sms_events.join(","), o.pm_events = o.pm_events.join(","), ajax.post("/groupsedit.php", o, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind(e),
            onFail: function(e) {
                return cur.showError(e), !0
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    adsPostUpdateCost: function(e) {
        var t = e.value.replace(/[^0-9]/g, "");
        t = intval(parseInt(t, 10)), e.value != t && (e.value = t)
    },
    adsPostJoin: function(e) {
        var t = {
            act: "adspost_join",
            id: cur.adOptions.gid,
            hash: cur.adOptions.hash,
            subject: cur.uiSubject.val(),
            cost: trim(val("group_ad_cost"))
        };
        return t.cost ? (GroupsEdit.hideMessage(), void ajax.post("/groupsedit.php", t, {
            onFail: function(e) {
                return GroupsEdit.showMessage(e, "error"), !0
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })) : void notaBene("group_ad_cost")
    },
    adswebUpdateSlotsValue: function(e, t) {
        var o = getLang("groups_edit_adsweb_slots_exchange_value", t - e),
            r = getLang("groups_edit_adsweb_slots_adsweb_value").replace("{percent}", intval(100 * e / t)),
            s = o + ", " + r;
        val("group_edit_adsweb_slots_value_info", s)
    },
    adswebSaveSlotsValue: function(e, t) {
        function o(o) {
            if (unlockButton("group_edit_adsweb_slots_save_button"), t && t.hide(), isObject(o) && o.ok) return removeClass("group_edit_adsweb_slots_save_result", "unshown"), void addClass("group_edit_adsweb_slots_save_button", "button_disabled");
            if (isObject(o) && "confirm_message" in o) {
                e.confirm = 1;
                var r = showFastBox(getLang("global_box_confirm_title"), o.confirm_message);
                return void r.setButtons(o.confirm_action, GroupsEdit.adswebSaveSlotsValue.pbind(e, r), getLang("box_cancel"))
            }
            return isObject(o) && "error" in o ? void showFastBox(getLang("global_box_error_title"), o.error) : void 0
        }
        isButtonLocked("group_edit_adsweb_slots_save_button") || (lockButton("group_edit_adsweb_slots_save_button"), t && t.showProgress(), e.slots_value = val("group_edit_adsweb_slots_value"), ajax.post("/groupsedit.php?act=a_adsweb_save_slots", e, {
            onDone: o,
            onFail: o
        }))
    },
    adswebJoin: function(e, t) {
        function o(e) {
            isObject(e) && "error" in e && showFastBox(getLang("global_box_error_title"), e.error), unlockButton(r)
        }
        var r = window.event.currentTarget,
            s = {
                group_id: e,
                hash: t
            };
        return lockButton(r), ajax.post("/groupsedit.php?act=a_adsweb_join", s, {
            onDone: o,
            onFail: o
        }), !1
    },
    showAgeLimitsTT: function(e, t) {
        showTooltip(e, {
            text: t,
            className: "group_edit_age_tt",
            slideX: 15,
            shift: this.getAgeLimitsTTShift(e),
            dir: "left",
            showdt: 300,
            hidedt: 100,
            hasover: !0
        })
    },
    getAgeLimitsTTShift: function(e) {
        var t = parseInt(getStyle(e, "paddingTop"), 10);
        t || (t = 0);
        var o = parseInt(getStyle(e, "height"), 10);
        o || (o = 0);
        var r = -t - o / 2;
        return [-135, r, 0]
    },
    showAgeLimitsInfo: function() {
        showFastBox({
            title: getLang("groups_age_limits_title"),
            width: 605
        }, '<div class="group_edit_age_limits_box">' + getLang("groups_about_age_limits") + "</div>")
    },
    showAgeLimitsBlock: function() {
        slideUp("group_edit_limits_link", 150), slideDown("group_edit_limits", 150)
    },
    showAddrTooltip: function(e) {
        return
    },
    toggleMsgsBlock: function(e) {
        var t = ge("group_edit_messages_details");
        e && !isVisible(t) ? slideDown(t, 300) : !e && isVisible(t) && slideUp(t, 300)
    },
    toggleBotBlock: function(e) {
        var t = geByClass1("_gedit_bot_features");
        e && !isVisible(t) ? slideDown(t, 300) : !e && isVisible(t) && slideUp(t, 300)
    },
    toggleMarketBlock: function(e) {
        e ? (setStyle("group_edit_market_placeholder", "height", getSize("group_edit_market_link")[1] + "px"), hide("group_edit_market_link"), show("group_edit_market_placeholder"), slideDown("group_edit_market", 300), slideUp("group_edit_market_placeholder", 300)) : (hide("group_edit_market_link"), slideUp("group_edit_market", 300))
    },
    showMarketTT: function(e, t, o) {
        var r = o ? [-313, -15] : [-110, -8];
        showTooltip(e, {
            text: t,
            dir: "left",
            className: "group_edit_age_tt",
            slideX: 15,
            shift: r,
            showdt: 200,
            hidedt: 500,
            nohideover: !0
        })
    },
    setupMessages: function() {
        var e = function() {
                Privacy.show(ge("privacy_edit_g_messages"), {}, "g_messages")
            },
            t = ge("privacy_edit_g_messages").getBoundingClientRect().top;
        return each([bodyNode], function(o, r) {
            animate(r, {
                scrollTop: t,
                transition: Fx.Transitions.linear
            }, 500, e)
        }), !1
    },
    setupMarket: function(e) {
        var t = Math.round(geByClass1("group_edit").offsetHeight),
            o = function() {
                1 == cur.cls ? isChecked("enable_market") || checkbox("enable_market") : cur.privacy.g_market[0] || (cur.privacy.g_market[0] = 1, val("privacy_edit_g_market", cur.privacy.g_market_types[1])), isVisible("group_edit_market") || GroupsEdit.toggleMarketBlock(!0)
            };
        each([bodyNode, htmlNode], function(e, r) {
            animate(r, {
                scrollTop: t,
                transition: Fx.Transitions.linear
            }, 500, o)
        })
    },
    deleteObscenePattern: function(e, t) {
        var o = ge("groups_obscene_delete_box_button"),
            r = {
                gid: cur.gid,
                act: "a_obscene_delete_pattern",
                approve: 1,
                pid: e,
                hash: t || ""
            },
            s = function(e) {
                switch (e) {
                    case 7:
                        key = "obscene_pattern_deleted";
                        break;
                    default:
                        key = "obscene_delete_pattern_error"
                }
                GroupsEdit.showMessage(getLang(key) + " (code: " + e + ")", "info"), unlockFlatButton(o)
            },
            a = GroupsEdit.showMessage.pbind(getLang("global_unknown_error"), "error");
        lockFlatButton(o), ajax.post("/groupsedit.php", r, {
            onDone: s,
            onFail: a
        })
    },
    addObscenePattern: function(e, t) {
        var o = curBox(),
            r = o && o.isVisible(),
            s = ge(r ? "groups_obscene_edit_box_save" : "group_bl_submit"),
            a = function(e) {
                switch (e) {
                    case 15:
                    case 7:
                        key = 3 & e ? "obscene_edit_pattern_success" : "obscene_add_pattern_success";
                        break;
                    case -7:
                        key = "obscene_word_wrong_chars";
                        break;
                    case -6:
                        key = "obscene_word_too_short";
                        break;
                    case -2:
                        key = "obscene_word_alredy_exists";
                        break;
                    default:
                        key = "obscene_add_pattern_error"
                }
                GroupsEdit.showMessage(getLang(key) + " (code: " + e + ")", "info"), unlockFlatButton(s)
            },
            i = GroupsEdit.showMessage.pbind(getLang("global_unknown_error"), "error"),
            n = {
                gid: cur.gid,
                act: "a_obscene_add_pattern",
                word: r ? val("obs_pattern_word") : val("group_bl_search"),
                pid: intval(val("obs_pattern_pid") || 0),
                hash: t || "",
                override: e
            };
        return trim(n.word) ? (lockFlatButton(s), void ajax.post("/groupsedit.php", n, {
            onDone: a,
            onFail: i
        })) : (el = r ? "obs_pattern_word" : "group_bl_search", notaBene(el, "warning"))
    },
    showObsceneWordsHint: function(e) {
        var t = getLang("obscene_settings_stopwords_hint"),
            o = {
                text: t,
                className: "group_edit_obscene_stopwords_hint",
                hasover: 1,
                slideX: 15,
                showsp: 150,
                dir: "left",
                shift: function() {
                    var t = geByClass1("group_edit_obscene_stopwords_hint"),
                        o = (t.offsetHeight + e.offsetHeight) / 2 - 2;
                    return [-308, 0, -o]
                },
                forcetodown: !0
            };
        showTooltip(e, o), e.onblur = function() {
            e.tt && e.tt.hide && e.tt.hide()
        }
    },
    enableObsceneStopWords: function(e) {
        var t = "group_edit_obscene_stopwords",
            o = "group_edit_obscene_stopwords_wrap",
            e = ge(e);
        return isChecked(e.id) ? (GroupsEdit.show(o, elfocus.pbind(t)), !1) : void GroupsEdit.hide(o)
    },
    setupObsceneFilter: function(e) {
        var t = Math.round(geByClass1("group_edit").offsetHeight / 2) - scrollY,
            o = function() {
                isChecked("group_obscene_stopwords") || checkbox("group_obscene_stopwords"), GroupsEdit.enableObsceneStopWords("group_obscene_stopwords")
            };
        each([bodyNode, htmlNode], function(e, r) {
            animate(r, {
                scrollTop: t,
                transition: Fx.Transitions.linear
            }, 500, o)
        })
    },
    showCreateTokenBox: function(e, t, o) {
        showBox("groupsedit.php", {
            act: "show_create_token_box",
            id: t,
            hash: o
        }, {
            params: {
                dark: 1,
                width: 540
            }
        })
    },
    callback: {
        addServer: function(e, t, o) {
            hide(geByClass1("page_actions_cont", ge("content"))), hide(ge("add_server_button")), show(geByClass1("ui_tabs_progress", ge("content"))), ajax.post("groupsedit.php", {
                act: "callback_add_server",
                id: t,
                hash: o
            }, {
                onDone: function(t, o) {
                    "ok" === t ? (nav.objLoc.server = o, nav.go(nav.objLoc)) : (unlockButton(e), GroupsEdit.callback.showError(o), show(geByClass1("page_actions_cont", ge("content"))), show(ge("add_server_button")), hide(geByClass1("ui_tabs_progress", ge("content"))))
                },
                onFail: function() {
                    GroupsEdit.callback.showError(getLang("groups_api_error_failed")), unlockButton(e)
                }
            })
        },
        showServerConfig: function(e, t, o) {
            hide(geByClass1("page_actions_cont", ge("content"))), show(geByClass1("ui_tabs_progress", ge("content"))), nav.objLoc.server = o, nav.go(nav.objLoc)
        },
        checkUrl: function(e, t, o, r) {
            function s(e, t, o, r, a) {
                return a > 20 ? void nav.go(nav.objLoc) : void ajax.post("groupsedit.php", {
                    act: "callback_get_check_url_result",
                    id: e,
                    server: t,
                    hash: o
                }, {
                    onDone: function(i, n, u) {
                        switch (i) {
                            case "wait":
                                return void setTimeout(s.pbind(e, t, o, r, a + 1), 500);
                            case "ok":
                                return void nav.go(nav.objLoc, void 0, {
                                    onDone: function() {
                                        GroupsEdit.callback.showOk()
                                    }
                                });
                            case "incorrect":
                                var c = getLang("groups_api_error_incorrect");
                                return void nav.go(nav.objLoc, void 0, {
                                    onDone: function() {
                                        GroupsEdit.callback.showError(c, n), unlockButton(r)
                                    }
                                });
                            case "failed":
                                if (u) {
                                    var c = getLang("groups_api_error") + " " + u;
                                    n = null
                                } else var c = getLang("groups_api_error_failed");
                                return void nav.go(nav.objLoc, void 0, {
                                    onDone: function() {
                                        GroupsEdit.callback.showError(c, n)
                                    }
                                });
                            case "error":
                                return void nav.go(nav.objLoc, void 0, {
                                    onDone: function() {
                                        GroupsEdit.callback.showError(n)
                                    }
                                })
                        }
                    },
                    onFail: function() {
                        unlockButton(r)
                    }
                })
            }
            var a = ge("callback_url"),
                i = val(a);
            ge("callback_title");
            return i ? (lockButton(e), void ajax.post("groupsedit.php", {
                act: "callback_check_url",
                id: t,
                server: o,
                url: i,
                hash: r
            }, {
                onDone: function(a, i) {
                    switch (a) {
                        case "ok":
                            s(t, o, r, e, 0);
                            break;
                        case "incorrect_url":
                            unlockButton(e), GroupsEdit.callback.showError(getLang("groups_api_incorrect_url"));
                            break;
                        default:
                            unlockButton(e), GroupsEdit.callback.showError(i)
                    }
                },
                onFail: function() {
                    unlockButton(e)
                }
            })) : void notaBene(a)
        },
        changeTitleBox: function(e, t, o, r, s) {
            function a() {
                i.hide(), i.destroy()
            }
            var i = showBox("groupsedit.php", {
                act: "callback_show_change_title_box",
                id: t,
                server: o,
                title: title,
                hash: r
            }, {
                params: {
                    width: 470,
                    dark: 1
                },
                onFail: function() {}
            });
            i.setButtons(getLang("global_save"), function() {
                GroupsEdit.callback.setTitle(i.btns.ok[0], t, o, s)
            }, getLang("global_cancel"), a)
        },
        setTitle: function(e, t, o, r) {
            function s(t) {
                unlockButton(e), val("group_api_error_title_msg", t), show("group_api_error_title")
            }
            var a = ge("callback_title"),
                i = val(a);
            return hide("group_api_error_title"), i ? (lockButton(e), void ajax.post("groupsedit.php", {
                act: "callback_set_title",
                id: t,
                server: o,
                title: i,
                hash: r
            }, {
                onDone: function(e, t) {
                    "ok" === e ? nav.go(nav.objLoc) : s(t)
                },
                onFail: s
            })) : void notaBene(a)
        },
        saveSecret: function(e, t, o, r) {
            var s = ge("callback_secret"),
                a = val(s);
            a && (hide("group_api_ok"), hide("group_api_error"), lockButton(e), ajax.post("groupsedit.php", {
                act: "callback_save_secret",
                id: t,
                server: o,
                secret: a,
                hash: r
            }, {
                onDone: function(t) {
                    unlockButton(e);
                    var o = null;
                    "length" == t ? o = getLang("groups_api_secret_too_long") : "pattern" == t ? o = getLang("groups_api_secret_wrong_pattern") : "ok" == t && (show("groups_edit_delete_secret"), show("group_api_secret_ok")), o ? (show("group_api_secret_error"), val("group_api_secret_error_msg", o), hide("group_api_secret_ok")) : hide("group_api_secret_error")
                },
                onFail: function() {
                    unlockButton(e)
                }
            }))
        },
        certUploadBox: function(e, t, o, r) {
            showBox("groupsedit.php", {
                act: "select_cert",
                id: t,
                hash: r,
                server: o
            }, {
                params: {
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }
            })
        },
        deleteUrl: function(e, t, o, r) {
            var s = showFastBox({
                title: getLang("groups_api_confirm_box_title"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("groups_api_delete_url_description"), getLang("groups_api_delete_url"), function() {
                s.showProgress(), ajax.post("groupsedit.php", {
                    act: "callback_delete_url",
                    id: t,
                    server: o,
                    hash: r
                }, {
                    onDone: function(e) {
                        s.hide(), hide("groups_edit_delete_url"), val("callback_url", "")
                    }
                })
            }, getLang("global_cancel"))
        },
        deleteSecret: function(e, t, o, r) {
            var s = showFastBox({
                title: getLang("groups_api_confirm_box_title"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("groups_api_delete_secret_description"), getLang("groups_api_delete_url"), function() {
                s.showProgress(), ajax.post("groupsedit.php", {
                    act: "callback_delete_secret",
                    id: t,
                    server: o,
                    hash: r
                }, {
                    onDone: function(e) {
                        s.hide(), hide("groups_edit_delete_secret"), val("callback_secret", "")
                    }
                })
            }, getLang("global_cancel"))
        },
        deleteCert: function(e, t, o, r) {
            var s = showFastBox({
                title: getLang("groups_api_confirm_box_title"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("groups_api_delete_cert_description"), getLang("groups_api_delete_url"), function() {
                s.showProgress(), ajax.post("groupsedit.php", {
                    act: "callback_delete_cert",
                    id: t,
                    server: o,
                    hash: r
                }, {
                    onDone: function(e) {
                        nav.go(nav.objLoc)
                    }
                })
            }, getLang("global_cancel"))
        },
        showCurlResult: function(e, t, o) {
            var r = cur.curlResult[e];
            if (r) {
                var s = {
                    title: t ? getLang("groups_api_request_result") : getLang("groups_api_request_body"),
                    dark: 1,
                    bodyStyle: "padding:0;"
                };
                if (o) {
                    if (r === o) return;
                    s.title = getLang("global_error");
                    var a = getLang("global_api_incorrect_response_dialog").replace("{response}", r).replace("{expected}", o);
                    s.width = 450
                } else {
                    var a = '<pre class="group_api_result_pre"">' + r + "</pre>";
                    s.width = 900
                }
                showFastBox(s, '<div class="group_api_result">' + a + "</div>")
            }
        },
        showError: function(e, t) {
            hide("group_api_secret_error"), hide("group_api_secret_ok"), t ? (show("group_api_error_info"), cur.curlResult = cur.curlResult || {}, cur.curlResult.error = t) : hide("group_api_error_info"), val("group_api_error_msg", e), hide("group_api_ok"), show("group_api_error")
        },
        saveSetting: function(e, t, o, r) {
            var s = ge("group_api_settings_saved");
            setStyle(s, "opacity", 1), clearTimeout(cur.groupeditTimeout), cur.groupeditTimeout = setTimeout(setStyle.pbind(s, "opacity", 0), 1e3), ajax.post("groupsedit.php", {
                act: "callback_save_event_setting",
                id: e,
                server: t,
                name: o,
                value: isChecked(o),
                hash: r
            })
        },
        deleteServer: function(e, t, o, r, s) {
            var a = showFastBox({
                title: getLang("groups_servers_delete_confirm_box_title"),
                dark: 1
            }, getLang("groups_tokens_servers_delete_confirm_description").replace("{serverName}", r), getLang("groups_servers_delete_confirm_box_btn"), function() {
                a.hide(), show(geByClass1("ui_tabs_progress", ge("content"))), hide(geByClass1("page_actions_cont", ge("content"))), ajax.post("groupsedit.php", {
                    act: "callback_delete_server",
                    id: t,
                    server: o,
                    hash: s
                }, {
                    onDone: function(t, o) {
                        "ok" === t ? (nav.objLoc.server = o, nav.go(nav.objLoc)) : (unlockButton(e), GroupsEdit.callback.showError(o), hide(geByClass1("ui_tabs_progress", ge("content"))), show(geByClass1("page_actions_cont", ge("content"))))
                    }
                })
            }, getLang("global_cancel"))
        },
        clearServerId: function() {
            delete nav.objLoc.server, nav.setLoc(nav.objLoc)
        },
        showOk: function() {
            hide("group_api_error"), show("group_api_ok"), show("group_api_settings"), hide("group_api_secret_error"), hide("group_api_secret_ok"), show("groups_edit_delete_url")
        }
    },
    deleteGroupToken: function(e, t, o, r) {
        var s = showFastBox({
            title: getLang("groups_tokens_confirm_box_title"),
            dark: 1
        }, getLang("groups_tokens_confirm_delete_token_description"), getLang("groups_tokens_confirm_box_btn"), function() {
            s.hide();
            var a = geByClass1("progress_inline", e.parentNode);
            hide(e), show(a), ajax.post("groupsedit.php", {
                act: "delete_token",
                id: t,
                token_id: o,
                hash: r
            }, {
                onDone: function(e) {
                    var t = ge("group_token" + o);
                    t.parentNode.removeChild(t), val("group_tokens_count", e > 0 ? e : ""), hide(a);
                    var r = geByClass1("group_tokens_rows");
                    1 == r.childNodes.length && (show(ge("group_tokens_row_empty")), hide(ge("group_tokens_delete_all_btn")))
                }
            })
        }, getLang("global_cancel"))
    },
    deleteGroupTokenApp: function(e, t, o, r) {
        var s = showFastBox({
            title: getLang("groups_tokens_confirm_box_title"),
            dark: 1
        }, getLang("groups_tokens_confirm_delete_tokens_by_app_description"), getLang("groups_tokens_confirm_box_btn"), function() {
            s.hide();
            var a = geByClass("progress_inline", e.parentNode)[0];
            hide(e), show(a), ajax.post("groupsedit.php", {
                act: "delete_token_app",
                id: t,
                app_id: o,
                hash: r
            }, {
                onDone: function(e) {
                    for (var t = geByClass("group_token_app" + o), r = 0; r < t.length; r++) {
                        var s = t[r];
                        s.parentNode.removeChild(s)
                    }
                    val("group_tokens_count", e > 0 ? e : ""), hide(a);
                    var i = geByClass1("group_tokens_rows");
                    1 == i.childNodes.length && (show(ge("group_tokens_row_empty")), hide(ge("group_tokens_delete_all_btn")))
                }
            })
        }, getLang("global_cancel"))
    },
    deleteAllGroupTokens: function(e, t, o) {
        var r = showFastBox({
            title: getLang("groups_tokens_confirm_box_title"),
            dark: 1
        }, getLang("groups_tokens_confirm_delete_all_tokens_description"), getLang("groups_tokens_confirm_box_btn"), function() {
            r.hide();
            var s = geByClass("progress_inline", e.parentNode)[0];
            hide(e), show(s), ajax.post("groupsedit.php", {
                act: "delete_all_tokens",
                id: t,
                hash: o
            }, {
                onDone: function() {
                    for (var e = geByClass1("group_tokens_rows"); e.childNodes.length > 1;) e.removeChild(e.lastChild);
                    val("group_tokens_count", ""), hide(s), show(ge("group_tokens_row_empty"))
                }
            })
        }, getLang("global_cancel"))
    },
    showGroupToken: function(e, t, o) {
        ajax.post("groupsedit.php", {
            act: "show_token",
            id: e,
            token_id: t,
            hash: o
        }, {
            onDone: function(e) {
                if (e) {
                    var o = ge("group_token" + t);
                    geByClass1("group_tokens_content_token", o).innerHTML = '<input type="text" class="group_tokens_content_token_unmask dark" readonly value="' + e + '">'
                }
            }
        })
    },
    callbackInitRequestPage: function(e) {
        var t = ge("groups_edit_request_type_dd");
        t && (cur.callbackRequestTypeDD = new InlineDropdown(t, {
            items: [
                ["sent", getLang("groups_api_requests_sent")],
                ["failed", getLang("groups_api_requests_failed")]
            ],
            withArrow: !0,
            selected: e,
            onSelect: GroupsEdit._onSelectCallback
        }))
    },
    _onSelectCallback: function(e) {
        nav.change({
            errors: "sent" == e ? !1 : 1
        })
    },
    certInitUploadBox: function(e, t, o, r, s) {
        e.setOptions({
            width: 480
        }), Upload.init("groups_edit_cert_upload_cont", t, o, {
            file_name: "file",
            file_size_limit: 5242880,
            file_types_description: "Certificate files (*.p12)",
            file_types: "*.p12;*.P12",
            lang: {
                button_browse: getLang("groups_edit_select_cert_file"),
                switch_mode: getLang("groups_edit_cert_switch_def_uploader"),
                cannot_upload_title: getLang("global_error")
            },
            onUploadStart: function() {
                e.showProgress()
            },
            onUploadComplete: function(t, o) {
                if (e.hideProgress(), "ok" === (o || "").substring(0, 2)) {
                    show("groups_edit_cert_uploaded"), show("groups_edit_cert_updating"), hide("groups_edit_cert_not_uploaded"), hide("groups_edit_cert_ready"), e.hide();
                    var a = o.substring(3);
                    GroupsEdit.callbackUpdateCertResult(a, 0, r, s)
                } else {
                    var i = ge("groups_edit_cert_upload_error");
                    i.innerHTML = getLang(o), show(i)
                }
            },
            onUploadError: function(t, o) {
                e.hideProgress();
                var r = ge("groups_edit_cert_upload_error");
                r.innerHTML = getLang("groups_edit_cert_upload_error_text"), show(r)
            },
            clear: 1,
            type: "photo",
            max_attempts: 3,
            noCheck: 1
        })
    },
    callbackUpdateCertResult: function(e, t, o, r) {
        t > 30 || ajax.post("groupsedit.php", {
            act: "callback_cert_get_status",
            id: o,
            server_id: r,
            key: e
        }, {
            onDone: function(r) {
                "false" == r ? setTimeout(GroupsEdit.callbackUpdateCertResult.pbind(e, t + 1, o), 1e3) : (hide("groups_edit_cert_updating"), show("groups_edit_cert_ready"))
            },
            onFail: function() {}
        })
    },
    snapsterRoomEdit: function(e) {
        cancelEvent(e);
        var t = Math.max(350, Math.min(600, lastWindowHeight)) - 203;
        cur.snapsterRoomsBox = showBox("/groupsedit.php", {
            act: "snapster_room",
            id: cur.gid,
            height: t
        }, {
            params: {
                width: 470
            }
        })
    },
    replaceValueNewLines: function(e, t) {
        for (var o = 0, r = 0; o >= 0; r++) {
            if (r >= t) {
                e = e.substr(0, o) + e.substr(o).replace(/\n/g, " ");
                break
            }
            o = e.indexOf("\n", o), o += o >= 0
        }
        return e
    },
    app: {
        btnName: null,
        privacy: null,
        appWidgetPrivacy: null,
        snippetType: null,
        appName: null,
        initCatalog: function() {},
        initSettings: function() {
            cur.appWidgetInstalled && (GroupsEdit.app.appWidgetPrivacy = new Dropdown(ge("groups_app_widget_privacy"), cur.appWidgetPrivacy, {
                width: 300,
                big: 1,
                multiselect: !1,
                selectedItems: cur.appWidgetPrivacyVal
            })), GroupsEdit.app.privacy = new Dropdown(ge("groups_app_btn_privacy"), cur.btnPrivacy, {
                width: 300,
                big: 1,
                multiselect: !1,
                selectedItems: cur.btnPrivacyVal,
                onChange: function(e) {}
            }), GroupsEdit.app.btnName = ge("group_app_btn_name"), GroupsEdit.app.appName = ge("group_app_app_name"), GroupsEdit.app.snippetType = new Dropdown(ge("groups_app_btn_snippet"), cur.snippetTypes, {
                width: 300,
                big: 1,
                multiselect: !1,
                selectedItems: cur.snippetType,
                onChange: function(e) {}
            })
        },
        show: function(e, t) {
            return cancelEvent(t), showApp(t, e, !0)
        },
        switchTab: function(e, t, o) {
            cancelEvent(o);
            var r = gpeByClass("ui_tabs", t);
            uiTabs.switchTab(t), ajax.post("/groupsedit.php", {
                id: cur.gid,
                act: e,
                tab: 1
            }, {
                onDone: function(t) {
                    ge("apps_catalog").innerHTML = t, nav.objLoc.act = e, nav.setLoc(nav.objLoc), cur.cur_tab = e
                },
                showProgress: function() {
                    uiTabs.showProgress(r)
                },
                hideProgress: function() {
                    uiTabs.showProgress(r)
                }
            })
        },
        copyLink: function(e) {
            var t = function(e) {
                var t = !1,
                    o = ce("textarea", {
                        value: e
                    });
                utilsNode.appendChild(o), o.select();
                try {
                    t = document.execCommand("copy")
                } catch (r) {
                    t = !1
                }
                return re(o), showDoneBox(getLang("groups_app_link_been_copied")), t
            };
            t(e)
        },
        attach: function(e, t, o, r) {
            if (!cur.show_alert || r) {
                var s = {
                    act: "app_attach",
                    id: cur.gid,
                    app_id: e,
                    hash: t,
                    cur_tab: cur.cur_tab
                };
                GroupsEdit.hideMessage(), ajax.post("groupsedit.php", s, {
                    onDone: function(e, t, o, r) {
                        extend(cur, o), cur.show_alert = !0, ge("group_apps_wrapper").innerHTML = e, ge("apps_cat_add") ? ge("apps_cat_add").innerHTML = t : ge("apps_cat_main").parentNode.innerHTML += t, GroupsEdit.app.initSettings(), scrollToY(0), GroupsEdit.showMessage(r), GroupsEdit.invalidateBack()
                    },
                    showProgress: function() {
                        lockLink(o)
                    },
                    hideProgress: function() {
                        unlockLink(o)
                    }
                })
            } else var a = getLang("groups_apps_replace_app_message_content", cur.appName),
                i = showFastBox({
                    title: getLang("groups_apps_replace_app_message_title")
                }, a, getLang("groups_apps_replace_app_message_yes"), function() {
                    i.hide(), GroupsEdit.app.attach(e, t, o, !0)
                }, getLang("global_cancel"))
        },
        changeStatus: function(e) {
            radiobtn(ge("app_status_" + e), e, "app_status")
        },
        save: function() {
            val(GroupsEdit.app.btnName, trim(val(GroupsEdit.app.btnName)));
            var e = {
                act: "app_save",
                app_id: cur.appId,
                id: cur.gid,
                hash: cur.saveAppHash,
                btn_name: val(GroupsEdit.app.btnName),
                privacy: GroupsEdit.app.privacy.selectedItems()[0][0],
                snippet_type: GroupsEdit.app.snippetType.selectedItems()[0][0]
            };
            cur.appWidgetInstalled && (e.app_widget_privacy = GroupsEdit.app.appWidgetPrivacy.selectedItems()[0][0]), GroupsEdit.app.appName && (e.app_name = val(GroupsEdit.app.appName)), GroupsEdit.hideMessage(), ajax.post("groupsedit.php", e, {
                onDone: function(e, t) {
                    return e ? (GroupsEdit.showMessage(t), GroupsEdit.invalidateBack()) : GroupsEdit.showMessage(t, "error"), e
                },
                showProgress: function() {
                    lockButton("group_app_save")
                },
                hideProgress: function() {
                    unlockButton("group_app_save")
                }
            })
        },
        "delete": function(e, t) {
            if (t) {
                var o = {
                    act: "app_delete",
                    app_id: cur.appId,
                    id: cur.gid,
                    hash: cur.delAppHash,
                    cur_tab: cur.cur_tab
                };
                GroupsEdit.hideMessage(), ajax.post("groupsedit.php", o, {
                    onDone: function(e, t, o) {
                        extend(cur, t), ge("group_apps_wrapper").innerHTML = e, re("apps_cat_add"), GroupsEdit.showMessage(o, "info"), cur.show_alert = !1, GroupsEdit.invalidateBack()
                    },
                    showProgress: function() {
                        lockLink(e)
                    },
                    hideProgress: function() {
                        unlockLink(e)
                    }
                })
            } else var r = getLang("groups_apps_delete_app_message_content", cur.appName),
                s = showFastBox({
                    title: getLang("groups_apps_delete_app_message_title")
                }, r, getLang("groups_apps_delete_app_message_yes"), function() {
                    s.hide(), GroupsEdit.app["delete"](e, !0)
                }, getLang("global_cancel"))
        }
    },
    messageWidgetSettings: function(e) {
        hasClass(e, "on") ? slideDown("community_widget_settings", 300) : slideUp("community_widget_settings", 300)
    },
    showNextTransfersHistory: function(e) {
        if (!buttonLocked(e)) {
            lockButton(e);
            var t = {
                act: "transfers_history",
                id: cur.gid,
                offset: cur.historyOffset
            };
            return ajax.post("groupsedit.php", t, {
                onDone: function(t, o) {
                    var r = ge("settings_transfer_history").tBodies[0];
                    if (t)
                        if (unlockButton(e), cur.historyOffset += 100, browser.msie) {
                            var s = se("<table>" + t + "</table>"),
                                a = geByTag("tr", s);
                            for (i in a) 1 == a[i].nodeType && r.appendChild(a[i])
                        } else r.insertAdjacentHTML("beforeEnd", t);
                    (!t || o) && (addClass(r.lastChild, "settings_votes_history_last"), hide(e))
                }
            }), !1
        }
    }
};
try {
    stManager.done("groups_edit.js")
} catch (e) {}