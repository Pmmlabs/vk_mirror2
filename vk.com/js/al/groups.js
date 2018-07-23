var Groups = {
    init: function(e) {
        extend(cur, {
            module: "groups",
            hideOther: Groups.hideOther,
            otherActs: Groups.otherActs,
            options: e,
            oid: -e.group_id,
            postTo: -e.group_id,
            _back: {
                loc: e.loc,
                show: [],
                hide: [],
                text: e.back
            }
        }), ge("group_wall") && wall.init(extend(e, {
            automore: 1
        })), cur.nav.push(function(e) {
            e[0] && clearTimeout(Groups.keyTO)
        }), e.cntKey && Groups.subscribe(e.cntKey), e.age_disclaimer && Groups.showDisclaimer(e, "group")
    },
    inviteToChat: function(e, o) {
        stManager.add([jsc("web/group_invite_chat.js"), "group_invite_chat.css", "indexer.js"], function() {
            window.showGroupChatInviteBox(e)
        }), o.preventDefault()
    },
    inviteToChatPreload: function() {
        stManager.add([jsc("web/group_invite_chat.js"), "group_invite_chat.css", "indexer.js"], function() {})
    },
    showDisclaimer: function(e, o) {
        var t = !1,
            a = function() {
                t || (e.age_disclaimer_back ? history.back() : location.href = "/")
            },
            n = showFastBox({
                title: getLang("groups_age_warning"),
                width: 470,
                hideOnBGClick: !1,
                onHide: a,
                forceNoBtn: 1
            }, '<div class="group_age_disclaimer">' + getLang("groups_age_disclaimer") + '<br><div class="checkbox group_age_checkbox" onclick="checkbox(this); disableButton(curBox().proceedButton, !isChecked(this))"><div></div>' + getLang("groups_age_accepted") + "</div></div>");
        n.removeButtons();
        var s = n.addButton(getLang("global_cancel"), n.hide, "no", !0);
        addClass(s, "group_age_disclaimer_close"), n.proceedButton = n.addButton(getLang("groups_age_approve"), function() {
            t = !0, removeClass(ge(o), "hidden"), n.hide(), e.age_disclaimer_hash ? ajax.post("al_groups.php", {
                act: "a_set_user_age",
                hash: e.age_disclaimer_hash
            }) : setCookie("remixage18", 1), cur.zNavInfo && zNav(cur.zNavInfo.info, cur.zNavInfo.opts)
        }, "yes", !0);
        var r = geByClass1("box_controls", domPN(n.bodyNode));
        addClass(r, "group_age_disclaimer_box"), replaceClass(domFC(r), "fl_r", "fl_l"), disableButton(n.proceedButton, 1)
    },
    switchTab: function(e, o, t) {
        return checkEvent(t) ? !0 : "wiki" == o && hasClass(e, "ui_tab_sel") ? nav.go(e, t) : (ge("page_info_wrap").className = "page_info_wrap " + o, uiTabs.switchTab(e))
    },
    toggleFave: function(e, o, t, a) {
        void 0 != cur.toggleFaveAct && (t = cur.toggleFaveAct), ajax.post("fave.php", {
            act: t ? "a_add_group" : "a_delete_group",
            gid: -cur.oid,
            hash: o
        }, {
            onDone: function(o) {
                val(e, o), cur.toggleFaveAct = !t
            },
            showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
            hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
        }), cancelEvent(a)
    },
    hideHelpStep: function(e, o, t, a) {
        var n = domClosest("page_block", e);
        return e && e.tt && e.tt.hide && e.tt.hide({
            fasthide: !0
        }), n && slideUp(n, 200, re.pbind(n)), ajax.post("/al_public.php", {
            act: "a_hide_help_step",
            pid: o,
            step: "help_step_advice",
            hash: t
        }), a.cancelBubble = !0, cancelEvent(a)
    },
    showInviteBox: function(e, o) {
        return !showBox("al_page.php", {
            act: "a_invite_box",
            gid: o
        }, {
            params: {
                bodyStyle: "padding: 0px;",
                width: 560
            }
        }, e)
    },
    subscribe: function(e) {
        window.Notifier && Notifier.addKey(e, Groups.updates), Groups.keyTO = setTimeout(Groups.subscribe, 3e4)
    },
    toggleFeedIgnored: function(e, o, t) {
        ajax.post("al_feed.php", {
            act: cur.options.ignored_news ? "a_unignore_owner" : "a_ignore_owner",
            owner_id: cur.oid,
            hash: o,
            from: "group"
        }, {
            onDone: function(o) {
                val(e, o), cur.options.ignored_news = !cur.options.ignored_news
            },
            showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
            hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
        }), cancelEvent(t)
    },
    showLinks: function() {
        var e = showBox("al_groups.php", {
            act: "show_links",
            oid: cur.oid
        });
        e.setOptions({
            onHideAttempt: function() {
                return cur.reloadAfterClose && (nav.reload({
                    noscroll: !0
                }), cur.reloadAfterClose = !1), !0
            }
        })
    },
    createEvent: function(e, o) {
        stManager.add([jsc("web/groups_create.js"), "groups_create.css"], function() {
            GroupsCreate.showInfoBox("event", {
                parentId: e,
                parentHash: o,
                onSave: function() {
                    cur.reloadAfterClose = !1, curBox() && curBox().hide(), cur.reloadAfterClose = !0, Groups.showEvents()
                }
            })
        })
    },
    deleteEvent: function(e, o, t) {
        cur.reloadAfterClose = !0, ajax.post("al_public.php", {
            act: "a_delete_event",
            pid: e,
            eid: o,
            hash: t
        }, {
            onDone: function(o) {
                window.tooltips && tooltips.destroyAll(ge("public_event_cell" + e)), curBox().content(o)
            }
        })
    },
    showEvents: function() {
        var e = showBox("al_public.php", {
            act: "a_get_events",
            pid: cur.options.public_id || -cur.oid
        });
        e.setOptions({
            onHideAttempt: function() {
                return cur.reloadAfterClose && (nav.reload({
                    noscroll: !0
                }), cur.reloadAfterClose = !1), !0
            }
        })
    },
    updateCnt: function(e) {
        e = parseInt(e);
        var o = geByClass1("_group_message_cnt");
        o && (o.textContent = e, toggleClass(o, "unshown", 0 === e))
    },
    updates: function(e, o) {
        each(o.events, function(e, o) {
            var t = o.split("<!>"),
                a = t[1];
            switch (a) {
                case "update_cnt":
                    Groups.updateCnt(t[4])
            }
        })
    },
    updateActions: function(e, o, t) {
        val("page_actions", e);
        var a = geByClass1("_page_actions_container");
        a && o && domPN(a).replaceChild(se(o), a), void 0 !== t && val("group_moder_info", t)
    },
    enter: function(e, o, t, a, n) {
        var s, r;
        if (e = ge(e), hasClass(e, "flat_button")) s = lockButton.pbind(e), r = unlockButton.pbind(e);
        else {
            if (e.firstChild && "progress" == e.firstChild.className) return;
            s = function() {
                e.oldhtml = e.innerHTML, e.innerHTML = '<span class="progress" style="display: block"></span>'
            }, r = function() {
                e.innerHTML = e.oldhtml
            }
        }
        window.Page && hasClass(e, "page_actions_btn") && Page.actionsDropdownHide(domPS(e), 1), ajax.post("al_groups.php", {
            act: "enter",
            gid: o,
            hash: t,
            context: a
        }, {
            onDone: function(e, o) {
                if (n) return n();
                Groups.updateActions(e, o), toggle("page_actions", e);
                var t = geByClass1("_groups_invite_block");
                t && slideUp(t, 200), nav.reload({
                    noframe: !0,
                    noscroll: !0
                })
            },
            onFail: function(e) {
                return e ? (setTimeout(showFastBox({
                    title: getLang("global_error"),
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, e).hide, 3e3), !0) : void 0
            },
            showProgress: s,
            hideProgress: r
        })
    },
    confirm: function(e, o, t, a, n) {
        var s = showFastBox({
            title: getLang("global_warning"),
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang(e), getLang("group_leave_group"), function() {
            s.hide(), Groups.leave(o, t, a, n)
        }, getLang("global_cancel"))
    },
    leave: function(e, o, t, a, n) {
        var s, r;
        if (e = ge(e), hasClass(e, "flat_button")) s = lockButton.pbind(e), r = unlockButton.pbind(e);
        else {
            if (e.firstChild && "progress" == e.firstChild.className) return;
            s = function() {
                e.oldhtml = e.innerHTML, e.innerHTML = '<span class="progress" style="display: block"></span>'
            }, r = function() {
                e.innerHTML = e.oldhtml
            }
        }
        window.Page && hasClass(e, "page_actions_btn") && Page.actionsDropdownHide(domPS(e), 1), ajax.post("al_groups.php", {
            act: "leave",
            gid: o,
            hash: t,
            context: a
        }, {
            onDone: function(e, o) {
                if (n) return n();
                Groups.updateActions(e, o), toggle("page_actions", e);
                var t = geByClass1("_groups_invite_block");
                t && slideUp(t, 200), nav.reload({
                    noframe: !0
                })
            },
            showProgress: s,
            hideProgress: r
        })
    },
    otherActs: function(e) {
        if (clearTimeout(cur.hideOtherTimer), !e) return !1;
        e.blur();
        var o = ge("page_other_acts");
        return isVisible(o) ? !1 : (o.style.marginLeft = "-1px", o.style.marginTop = "-21px", show(o), !1)
    },
    hideOther: function(e) {
        if (e > 0) cur.hideOtherTimer = setTimeout(cur.hideOther, e);
        else {
            var o = ge("page_other_acts"); - 1 == e ? hide(o) : fadeOut(o, 200)
        }
    },
    toggleTop: function(e, o, t, a, n) {
        ajax.post("al_groups.php", {
            act: "a_toggle_top",
            gid: o,
            hash: t,
            nocis: n
        }, {
            onDone: function(o) {
                e.innerHTML = o
            },
            showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
            hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
        })
    },
    toggleStickers: function(e, o, t, a) {
        ajax.post("al_groups.php", {
            act: "a_toggle_stickers",
            gid: o,
            hash: t
        }, {
            onDone: function(o) {
                e.innerHTML = o
            },
            showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
            hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
        })
    },
    toggleFastAccess: function(e, o, t) {
        function a(t) {
            var a = t ? getLang("groups_fast_menu_access_invert") : getLang("groups_fast_menu_access");
            val(e, a), e.setAttribute("data-value", t), "groups_list" == cur.module && window.GroupsList && GroupsList.updateGroupField(o, 11, t)
        }
        var n = 1 ^ intval(e.getAttribute("data-value")),
            s = hasClass(e, "page_actions_item") || hasClass(e, "ui_actions_menu_item");
        return ajax.post("al_settings.php", {
            act: "a_toggle_admin_fast",
            gid: o,
            hash: t,
            update_menu: 1
        }, {
            onDone: function(e, o) {
                s && a(e), geByTag1("ol", ge("side_bar")).innerHTML = o, window.Notifier && Notifier.resetCommConnection()
            },
            onFail: function(e) {
                return s || a(0), "too_much_groups" !== e ? !1 : (showFastBox(getLang("global_error"), getLang("groups_left_menu_full", 5)), !0)
            }.bind(),
            showProgress: s && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownLock(e) : lockActionsMenuItem(e)
            },
            hideProgress: s && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownUnlock(e) : unlockActionsMenuItem(e)
            }
        }), s || a(n), !1
    },
    showMapBox: function(e, o, t) {
        window.showZeroZoneBox && showZeroZoneBox("places", function() {
            events.showMapBox(e, o, t)
        }) || showTabbedBox("/al_places.php", {
            act: "show_photo_place",
            place_id: e
        }, {
            stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js"]
        })
    },
    showAddressBox: function(e, o) {
        window.showZeroZoneBox && showZeroZoneBox("places", function() {
            events.showAddressBox(e, o)
        }) || showBox("places.php", {
            act: "a_get_address_box",
            country: e,
            address: o
        }, {
            stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js"],
            params: {
                width: 640,
                bodyStyle: "padding:0;"
            }
        })
    },
    uploadPhotos: function(e, o) {
        var t = (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
        if (!t || !o) return nav.go(e, o);
        if (checkEvent(o)) return !0;
        cur.onPhotoInputChange = function(t) {
            return window.filesToUpload = t, nav.go(e, o)
        };
        var a = ge("page_upload_photos_input");
        return a || (a = se('<input id="page_upload_photos_input" class="file page_upload_photos_input" type="file" onchange="cur.onPhotoInputChange(this.files);" multiple="true" accept="image/jpeg,image/png,image/gif" name="photo" />')), a.click(o), !1
    },
    getFlattenedCategories: function(e, o) {
        var t = o[0][e],
            a = o[1];
        if (void 0 === a) return t;
        for (var n = [], s = 0; s < t.length; s++) {
            var r = t[s];
            r[3] = "section", n = n.concat([r]), a[r[0]] && (r[5] = "1", n = n.concat(a[r[0]]))
        }
        for (var s = 0; s < n.length; s++) n[s][3] += " sectioned";
        return n
    },
    initCategories: function(e) {
        e.prefix = e.prefix || "group_category_", e.groupClass = e.groupClass || 0, cur.groupCategoriesDD = cur.groupCategoriesDD || {}, cur.groupCategoriesDD[e.prefix] = cur.groupCategoriesDD[e.prefix] || {};
        for (var o = e.categories[e.groupClass], t = 0; 2 > t; ++t) {
            var a = [],
                n = cur.groupCategoriesDD[e.prefix],
                s = n[t];
            if (0 == t) a = o[t][0];
            else if (t > 0) {
                var r = n[t - 1].val();
                "" != r && o[t] && (a = this.getFlattenedCategories(r, o.slice(1)) || [])
            }
            s && s.container && s.container.compareDocumentPosition && s.container.compareDocumentPosition(bodyNode) & Node.DOCUMENT_POSITION_DISCONNECTED && (s.destroy(), s = null), s ? (s.setData(a), s.currenDataItems = a, s.setOptions({
                defaultItems: a
            }), s.clear()) : s = new Dropdown(ge(e.prefix + t), a, {
                width: 300,
                dark: !0,
                multiselect: !1,
                autocomplete: !0,
                introText: getLang("groups_start_typing_subject"),
                zeroPlaceholder: !0,
                indexkeys: [1, 4],
                preventDuplicates: !0,
                noResult: "",
                placeholder: getLang("groups_choose_subject"),
                onChange: function(t, a) {
                    if (0 == t && a) {
                        var s = Groups.getFlattenedCategories(a, o.slice(1)) || [];
                        n[t + 1].setData(s), n[t + 1].currenDataItems = s, n[t + 1].setOptions({
                            defaultItems: s
                        });
                        for (var r = t + 1; 2 > r; ++r) n[r].clear(), n[r].disable(r > t + 1 || !s.length), toggle(ge(e.prefix + "wrap_" + r), !(r > t + 1 || !s.length))
                    }
                }.pbind(t)
            }), e.selected[t] && -1 != e.selected[t] ? 1 == t && e.selected[2] ? s.val(e.selected[2]) : s.val(e.selected[t]) : t > 0 && (-1 == e.selected[t - 1] || !a.length) && (s.disable(!0), hide(ge(e.prefix + "wrap_" + t))), cur.groupCategoriesDD[e.prefix][t] = s
        }
    },
    categoriesGetDropdown: function(e, o) {
        return o = o || "group_category_", cur.groupCategoriesDD && cur.groupCategoriesDD[o] && cur.groupCategoriesDD[o][e]
    },
    getDetailedCategories: function(e, o) {
        for (var t = -1, a = 0; a < e.length; a++)
            if (e[a][0] == o) {
                t = a;
                break
            }
        for (var n = -1, a = t; a >= 0; a--)
            if (Number(e[a][0]) < 3e3) {
                n = a;
                break
            }
        return -1 == t || -1 == n ? [0, 0] : n == t ? [e[t][0], 0] : [e[n][0], e[t][0]]
    },
    categoriesValue: function(e) {
        for (var o = [], t = 0; 2 > t; ++t) {
            var a = this.categoriesGetDropdown(t, e);
            if (0 == t) o.push(a ? intval(a.val()) : 0);
            else {
                var n = a ? intval(a.val()) : 0;
                o = o.concat(this.getDetailedCategories(a.dataItems, n))
            }
        }
        return o
    },
    deinitCategories: function(e) {
        for (var o = 0; 3 > o; ++o) {
            var t = this.categoriesGetDropdown(o, e);
            t && t.destroy()
        }
        cur.groupCategoriesDD && delete cur.groupCategoriesDD[e]
    },
    saveNewCategories: function(e, o) {
        var t = {
            act: "set_new_categories",
            gid: e,
            hash: o
        };
        if (Groups.categoriesGetDropdown(0)) {
            var a = Groups.categoriesValue();
            extend(t, {
                category_0: a[0],
                category_1: a[1],
                category_2: a[2]
            })
        }
        var n = ge("group_set_categories_submit");
        hide("group_set_categories_error_wrap"), hide("group_set_categories_success_wrap"), ajax.post("al_groups.php", t, {
            onDone: function(e) {
                val("group_set_categories_success", e), show("group_set_categories_success_wrap")
            },
            onFail: function(e) {
                return val("group_set_categories_error", e), show("group_set_categories_error_wrap"), !0
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        })
    },
    hideTopNotice: function(e, o, t) {
        var a = "gtop_" + e,
            n = {
                act: "hide_top_notice",
                notice: e,
                group_id: o,
                hash: t
            };
        return ajax.post("al_groups.php", n), slideUp(ge(a), 150, re.pbind(a)), !1
    },
    goToTopNoticeMoreLink: function(e, o, t, a) {
        return statlogsValueEvent("groups_top_notice", 1, o, "accept"), checkEvent(e) || a ? !0 : nav.go(t)
    },
    processActionButton: function(e, o, t, a, n) {
        return isButtonLocked(e) ? !0 : (ajax.post("al_groups.php", {
            act: "proxy_cta_button",
            action: o,
            group_id: t,
            hash: a
        }, {
            onDone: function() {
                unlockButton(e)
            }
        }), n ? n() : !0)
    }
};
try {
    stManager.done("groups.js")
} catch (e) {}