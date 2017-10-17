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
            s = function() {
                t || (e.age_disclaimer_back ? history.back() : location.href = "/")
            },
            a = showFastBox({
                title: getLang("groups_age_warning"),
                width: 470,
                hideOnBGClick: !1,
                onHide: s,
                forceNoBtn: 1
            }, '<div class="group_age_disclaimer">' + getLang("groups_age_disclaimer") + '<br><div class="checkbox group_age_checkbox" onclick="checkbox(this); disableButton(curBox().proceedButton, !isChecked(this))"><div></div>' + getLang("groups_age_accepted") + "</div></div>");
        a.removeButtons();
        var n = a.addButton(getLang("global_cancel"), s, "no", !0);
        addClass(n, "group_age_disclaimer_close"), a.proceedButton = a.addButton(getLang("groups_age_approve"), function() {
            t = !0, removeClass(ge(o), "hidden"), a.hide(), e.age_disclaimer_hash ? ajax.post("al_groups.php", {
                act: "a_set_user_age",
                hash: e.age_disclaimer_hash
            }) : setCookie("remixage18", 1), cur.zNavInfo && zNav(cur.zNavInfo.info, cur.zNavInfo.opts)
        }, "yes", !0);
        var r = geByClass1("box_controls", domPN(a.bodyNode));
        addClass(r, "group_age_disclaimer_box"), replaceClass(domFC(r), "fl_r", "fl_l"), disableButton(a.proceedButton, 1)
    },
    switchTab: function(e, o, t) {
        return checkEvent(t) ? !0 : "wiki" == o && hasClass(e, "ui_tab_sel") ? nav.go(e, t) : (ge("page_info_wrap").className = "page_info_wrap " + o, uiTabs.switchTab(e))
    },
    toggleFave: function(e, o, t, s) {
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
        }), cancelEvent(s)
    },
    hideHelpStep: function(e, o, t, s) {
        var a = domClosest("page_block", e);
        return e && e.tt && e.tt.hide && e.tt.hide({
            fasthide: !0
        }), a && slideUp(a, 200, re.pbind(a)), ajax.post("/al_public.php", {
            act: "a_hide_help_step",
            pid: o,
            step: "help_step_advice",
            hash: t
        }), s.cancelBubble = !0, cancelEvent(s)
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
    votingUpdate: function(html, js) {
        var mod = ge("group_voting");
        mod.parentNode.replaceChild(ce("div", {
            innerHTML: html
        }).firstChild, mod), js && eval(js)
    },
    vote: function(e, o, t, s) {
        radiobtn(e, s, "vote_option" + t);
        var a = hasClass(e.firstChild, "progress") ? e.firstChild : e.insertBefore(ce("span", {
            className: "fl_r progress"
        }), e.firstChild);
        ajax.post("al_voting.php", {
            act: "vote",
            option_id: s,
            owner_id: o,
            voting_id: t,
            hash: cur.polls[t].hash
        }, {
            onDone: Groups.votingUpdate,
            progress: a
        })
    },
    subscribe: function(e) {
        window.Notifier && Notifier.addKey(e, Groups.updates), Groups.keyTO = setTimeout(Groups.subscribe, 3e4)
    },
    votingAction: function(e) {
        var o = 0;
        switch (e) {
            case 101:
                e = "openclose", o = 0;
                break;
            case 102:
                e = "openclose", o = 1;
                break;
            case 103:
                e = "tomain", o = 0;
                break;
            case 104:
                e = "tomain", o = 1
        }
        ajax.post("al_voting.php", {
            act: e,
            owner_id: cur._voting.oid,
            voting_id: cur._voting.vid,
            state: o,
            context: "group",
            hash: cur._voting.hash
        }, {
            onDone: Groups.votingUpdate
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
    showEvents: function() {
        var e = showBox("al_groups.php", {
            act: "show_events",
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
    updateCnt: function(e) {
        e = parseInt(e);
        var o = geByClass1("_group_message_cnt");
        o && (o.textContent = e, toggleClass(o, "unshown", 0 === e))
    },
    updates: function(e, o) {
        each(o.events, function(e, o) {
            var t = o.split("<!>"),
                s = t[1];
            switch (s) {
                case "update_cnt":
                    Groups.updateCnt(t[4])
            }
        })
    },
    updateActions: function(e, o, t) {
        val("page_actions", e);
        var s = geByClass1("_page_actions_container");
        s && o && domPN(s).replaceChild(se(o), s), void 0 !== t && val("group_moder_info", t)
    },
    enter: function(e, o, t, s, a) {
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
            context: s
        }, {
            onDone: function(e, o) {
                if (a) return a();
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
    confirm: function(e, o, t, s, a) {
        var n = showFastBox({
            title: getLang("global_warning"),
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang(e), getLang("group_leave_group"), function() {
            n.hide(), Groups.leave(o, t, s, a)
        }, getLang("global_cancel"))
    },
    leave: function(e, o, t, s, a) {
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
            context: s
        }, {
            onDone: function(e, o) {
                if (a) return a();
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
    toggleTop: function(e, o, t, s, a) {
        ajax.post("al_groups.php", {
            act: "a_toggle_top",
            gid: o,
            hash: t,
            nocis: a
        }, {
            onDone: function(o) {
                e.innerHTML = o
            },
            showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
            hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
        })
    },
    toggleStickers: function(e, o, t, s) {
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
        function s(t) {
            var s = t ? getLang("groups_fast_menu_access_invert") : getLang("groups_fast_menu_access");
            val(e, s), e.setAttribute("data-value", t), "groups_list" == cur.module && window.GroupsList && GroupsList.updateGroupField(o, 11, t)
        }
        var a = 1 ^ intval(e.getAttribute("data-value")),
            n = hasClass(e, "page_actions_item") || hasClass(e, "ui_actions_menu_item");
        return ajax.post("al_settings.php", {
            act: "a_toggle_admin_fast",
            gid: o,
            hash: t,
            update_menu: 1
        }, {
            onDone: function(e, o) {
                n && s(e), geByTag1("ol", ge("side_bar")).innerHTML = o, window.Notifier && Notifier.resetCommConnection()
            },
            onFail: function(e) {
                return n || s(0), "too_much_groups" !== e ? !1 : (showFastBox(getLang("global_error"), getLang("groups_left_menu_full", 5)), !0)
            }.bind(),
            showProgress: n && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownLock(e) : lockActionsMenuItem(e)
            },
            hideProgress: n && function() {
                hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownUnlock(e) : unlockActionsMenuItem(e)
            }
        }), n || s(a), !1
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
        var s = ge("page_upload_photos_input");
        return s || (s = se('<input id="page_upload_photos_input" class="file page_upload_photos_input" type="file" onchange="cur.onPhotoInputChange(this.files);" multiple="true" accept="image/jpeg,image/png,image/gif" name="photo" />')), s.click(o), !1
    },
    initSetNewCategories: function(e) {
        e = e || 0, cur.newCategoriesGroupClass = e, cur.newCategoriesDD = cur.newCategoriesDD || {};
        for (var o = 0; 3 > o; ++o) {
            var t = [];
            if (0 == o) t = cur.groupsNewCategories[e][o][0];
            else if (o > 0) {
                var s = cur.newCategoriesDD[o - 1].val();
                "" != s && cur.groupsNewCategories[e][o] && (t = cur.groupsNewCategories[e][o][s] || [])
            }
            var a = cur.newCategoriesDD[o];
            a && !domCA(a.container, "body") && (a.destroy(), a = null), a ? (cur.newCategoriesDD[o].setData(t), cur.newCategoriesDD[o].currenDataItems = t, cur.newCategoriesDD[o].setOptions({
                defaultItems: t
            }), cur.newCategoriesDD[o].clear()) : a = new Dropdown(ge("group_category_" + o), t, {
                width: 300,
                dark: !0,
                multiselect: !1,
                autocomplete: !0,
                introText: getLang("groups_start_typing_subject"),
                zeroPlaceholder: !0,
                noResult: "",
                placeholder: getLang("groups_choose_subject"),
                onChange: function(e, o) {
                    if (2 > e) {
                        var t = cur.groupsNewCategories[cur.newCategoriesGroupClass][e + 1] && cur.groupsNewCategories[cur.newCategoriesGroupClass][e + 1][o] || [];
                        cur.newCategoriesDD[e + 1].setData(t), cur.newCategoriesDD[e + 1].currenDataItems = t, cur.newCategoriesDD[e + 1].setOptions({
                            defaultItems: t
                        });
                        for (var s = e + 1; 3 > s; ++s) cur.newCategoriesDD[s].clear(), cur.newCategoriesDD[s].disable(s > e + 1 || !t.length), toggle(ge("group_category_wrap_" + s), !(s > e + 1 || !t.length))
                    }
                }.pbind(o)
            }), cur.groupsNewCategoriesSelected[o] && -1 != cur.groupsNewCategoriesSelected[o] ? a.val(cur.groupsNewCategoriesSelected[o]) : o > 0 && (-1 == cur.groupsNewCategoriesSelected[o - 1] || !t.length) && (a.disable(!0), hide(ge("group_category_wrap_" + o))), cur.newCategoriesDD[o] = a
        }
    },
    deinitSetNewCategories: function() {
        for (var e = 0; 3 > e; ++e) cur.newCategoriesDD[e] && (cur.newCategoriesDD[e].destroy(), delete cur.newCategoriesDD[e])
    },
    saveNewCategories: function(e, o) {
        for (var t = {
                act: "set_new_categories",
                gid: e,
                hash: o
            }, s = 0; 3 > s; ++s) t["category_" + s] = cur.newCategoriesDD[s].val();
        var a = ge("group_set_categories_submit");
        hide("group_set_categories_error_wrap"), hide("group_set_categories_success_wrap"), ajax.post("al_groups.php", t, {
            onDone: function(e) {
                val("group_set_categories_success", e), show("group_set_categories_success_wrap")
            },
            onFail: function(e) {
                return val("group_set_categories_error", e), show("group_set_categories_error_wrap"), !0
            },
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a)
        })
    }
};
try {
    stManager.done("groups.js")
} catch (e) {}