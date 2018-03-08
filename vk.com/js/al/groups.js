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
    showDisclaimer: function(e, o) {
        var t = !1,
            a = function() {
                t || (e.age_disclaimer_back ? history.back() : location.href = "/")
            },
            s = showFastBox({
                title: getLang("groups_age_warning"),
                width: 470,
                hideOnBGClick: !1,
                onHide: a,
                forceNoBtn: 1
            }, '<div class="group_age_disclaimer">' + getLang("groups_age_disclaimer") + '<br><div class="checkbox group_age_checkbox" onclick="checkbox(this); disableButton(curBox().proceedButton, !isChecked(this))"><div></div>' + getLang("groups_age_accepted") + "</div></div>");
        s.removeButtons();
        var n = s.addButton(getLang("global_cancel"), s.hide, "no", !0);
        addClass(n, "group_age_disclaimer_close"), s.proceedButton = s.addButton(getLang("groups_age_approve"), function() {
            t = !0, removeClass(ge(o), "hidden"), s.hide(), e.age_disclaimer_hash ? ajax.post("al_groups.php", {
                act: "a_set_user_age",
                hash: e.age_disclaimer_hash
            }) : setCookie("remixage18", 1), cur.zNavInfo && zNav(cur.zNavInfo.info, cur.zNavInfo.opts)
        }, "yes", !0);
        var r = geByClass1("box_controls", domPN(s.bodyNode));
        addClass(r, "group_age_disclaimer_box"), replaceClass(domFC(r), "fl_r", "fl_l"), disableButton(s.proceedButton, 1)
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
        var s = domClosest("page_block", e);
        return e && e.tt && e.tt.hide && e.tt.hide({
            fasthide: !0
        }), s && slideUp(s, 200, re.pbind(s)), ajax.post("/al_public.php", {
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
    votingUpdate: function(act, html, js, state) {
        var mod = ge("group_voting");
        mod.parentNode.replaceChild(ce("div", {
            innerHTML: html
        }).firstChild, mod), "tomain" == act && toggle("group_voting", state), js && eval(js)
    },
    vote: function(e, o, t, a) {
        radiobtn(e, a, "vote_option" + t);
        var s = hasClass(e.firstChild, "progress") ? e.firstChild : e.insertBefore(ce("span", {
            className: "fl_r progress"
        }), e.firstChild);
        ajax.post("al_voting.php", {
            act: "vote",
            option_id: a,
            owner_id: o,
            voting_id: t,
            hash: cur.polls[t].hash
        }, {
            onDone: Groups.votingUpdate.pbind("vote"),
            progress: s
        })
    },
    subscribe: function(e) {
        window.Notifier && Notifier.addKey(e, Groups.updates), Groups.keyTO = setTimeout(Groups.subscribe, 3e4)
    },
    votingAction: function(e, o) {
        if (o) {
            var t = gpeByClass("top_result_baloon_wrap", o);
            t && fadeOut(t.firstChild, 200)
        }
        var a = 0;
        switch (e) {
            case 101:
                e = "openclose", a = 0;
                break;
            case 102:
                e = "openclose", a = 1;
                break;
            case 103:
                e = "tomain", a = 0;
                break;
            case 104:
                e = "tomain", a = 1
        }
        ajax.post("al_voting.php", {
            act: e,
            owner_id: cur._voting.oid,
            voting_id: cur._voting.vid,
            state: a,
            is_wide: cur._voting.is_wide,
            context: "group",
            hash: cur._voting.hash
        }, {
            onDone: Groups.votingUpdate.pbind(e)
        })
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
    enter: function(e, o, t, a, s) {
        var n, r;
        if (e = ge(e), hasClass(e, "flat_button")) n = lockButton.pbind(e), r = unlockButton.pbind(e);
        else {
            if (e.firstChild && "progress" == e.firstChild.className) return;
            n = function() {
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
                if (s) return s();
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
            showProgress: n,
            hideProgress: r
        })
    },
    confirm: function(e, o, t, a, s) {
        var n = showFastBox({
            title: getLang("global_warning"),
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang(e), getLang("group_leave_group"), function() {
            n.hide(), Groups.leave(o, t, a, s)
        }, getLang("global_cancel"))
    },
    leave: function(e, o, t, a, s) {
        var n, r;
        if (e = ge(e), hasClass(e, "flat_button")) n = lockButton.pbind(e), r = unlockButton.pbind(e);
        else {
            if (e.firstChild && "progress" == e.firstChild.className) return;
            n = function() {
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
                if (s) return s();
                Groups.updateActions(e, o), toggle("page_actions", e);
                var t = geByClass1("_groups_invite_block");
                t && slideUp(t, 200), nav.reload({
                    noframe: !0
                })
            },
            showProgress: n,
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
    toggleTop: function(e, o, t, a, s) {
        ajax.post("al_groups.php", {
            act: "a_toggle_top",
            gid: o,
            hash: t,
            nocis: s
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
        var s = 1 ^ intval(e.getAttribute("data-value")),
            n = hasClass(e, "page_actions_item") || hasClass(e, "ui_actions_menu_item");
        return ajax.post("al_settings.php", {
            act: "a_toggle_admin_fast",
            gid: o,
            hash: t,
            update_menu: 1
        }, {
            onDone: function(e, o) {
                n && a(e), geByTag1("ol", ge("side_bar")).innerHTML = o, window.Notifier && Notifier.resetCommConnection()
            },
            onFail: function(e) {
                return n || a(0), "too_much_groups" !== e ? !1 : (showFastBox(getLang("global_error"), getLang("groups_left_menu_full", 5)), !0)
            }.bind(),
            showProgress: n && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownLock(e) : lockActionsMenuItem(e)
            },
            hideProgress: n && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownUnlock(e) : unlockActionsMenuItem(e)
            }
        }), n || a(s), !1
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
    initCategories: function(e) {
        e.prefix = e.prefix || "group_category_", e.groupClass = e.groupClass || 0, cur.groupCategoriesDD = cur.groupCategoriesDD || {}, cur.groupCategoriesDD[e.prefix] = cur.groupCategoriesDD[e.prefix] || {};
        for (var o = e.categories[e.groupClass], t = 0; 3 > t; ++t) {
            var a = [],
                s = cur.groupCategoriesDD[e.prefix],
                n = s[t];
            if (0 == t) a = o[t][0];
            else if (t > 0) {
                var r = s[t - 1].val();
                "" != r && o[t] && (a = o[t][r] || [])
            }
            n && n.container && n.container.compareDocumentPosition && n.container.compareDocumentPosition(bodyNode) & Node.DOCUMENT_POSITION_DISCONNECTED && (n.destroy(), n = null), n ? (n.setData(a), n.currenDataItems = a, n.setOptions({
                defaultItems: a
            }), n.clear()) : n = new Dropdown(ge(e.prefix + t), a, {
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
                    if (2 > t) {
                        var n = o[t + 1] && o[t + 1][a] || [];
                        s[t + 1].setData(n), s[t + 1].currenDataItems = n, s[t + 1].setOptions({
                            defaultItems: n
                        });
                        for (var r = t + 1; 3 > r; ++r) s[r].clear(), s[r].disable(r > t + 1 || !n.length), toggle(ge(e.prefix + "wrap_" + r), !(r > t + 1 || !n.length))
                    }
                }.pbind(t)
            }), e.selected[t] && -1 != e.selected[t] ? n.val(e.selected[t]) : t > 0 && (-1 == e.selected[t - 1] || !a.length) && (n.disable(!0), hide(ge(e.prefix + "wrap_" + t))), cur.groupCategoriesDD[e.prefix][t] = n
        }
    },
    categoriesGetDropdown: function(e, o) {
        return o = o || "group_category_", cur.groupCategoriesDD && cur.groupCategoriesDD[o] && cur.groupCategoriesDD[o][e]
    },
    categoriesValue: function(e) {
        for (var o = [], t = 0; 3 > t; ++t) {
            var a = this.categoriesGetDropdown(t, e);
            o.push(a ? intval(a.val()) : 0)
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
        var s = ge("group_set_categories_submit");
        hide("group_set_categories_error_wrap"), hide("group_set_categories_success_wrap"), ajax.post("al_groups.php", t, {
            onDone: function(e) {
                val("group_set_categories_success", e), show("group_set_categories_success_wrap")
            },
            onFail: function(e) {
                return val("group_set_categories_error", e), show("group_set_categories_error_wrap"), !0
            },
            showProgress: lockButton.pbind(s),
            hideProgress: unlockButton.pbind(s)
        })
    }
};
try {
    stManager.done("groups.js")
} catch (e) {}