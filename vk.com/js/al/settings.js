var Settings = {
    MAX_LEFT_GROUPS: 5,
    go: function(t, e) {
        var s = Settings.getsect(),
            o = checkEvent(e);
        return o === !1 && (s.className = "", t.parentNode.className = "active_link"), nav.go(t, e)
    },
    getsect: function() {
        for (var t = ge("settings_filters").firstChild; !hasClass(t, "active_link");) t = t.nextSibling;
        return t
    },
    showMsg: function(t, e) {
        e || (e = ge("settings_result")), t ? (showMsg(e, t, "ok_msg", !0), show(e)) : hide(e), scrollToTop(0)
    },
    showError: function(t, e) {
        t = t || getLang("global_unknown_error");
        var s = e ? ge("settings_error_" + e) : ge("settings_result");
        showMsg(s, t, "error", !0), show(s), e || scrollToTop(0)
    },
    toggleBlock: function(t, e) {
        if (t && t.target) {
            var s = t.target;
            o = hasClass(s, "settings_line") ? s : gpeByClass("settings_line", s)
        } else {
            t = ge(t);
            var s = geByClass1("settings_right_control", t),
                o = hasClass(t, "settings_line") ? t : gpeByClass("settings_line", t)
        }
        o && geByClass1("settings_change_block", o) && (!hasClass(o, "unfolded") || hasClass(s, "settings_right_control")) && (cur.changingSetting && cur.changingSetting != o && (removeClass(cur.changingSetting, "unfolded"), window.tooltips && tooltips.hideAll()), toggleClass(o, "unfolded"), cur.changingSetting = o, e && elfocus(e))
    },
    savePrivacyKey: function(t) {
        if ("friends" == t) return void(window.uiPageBlock && uiPageBlock.showSaved("privacy_friends_hide"));
        var e, s = {
            key: t,
            val: Privacy.getValue(t),
            hash: cur.options.hash
        };
        if ("search_access" == t || "updates" == t) {
            if ("updates" == t) {
                var o = Privacy.getValue(t);
                if ("0" != o.substr(0, 1)) {
                    var n = o.substr(2);
                    n.length || (ge("privacy_header").innerHTML = ge("privacy_edit_updates").innerHTML = getLang("settings_updates_no_news"))
                }
            }
            e = "al_settings.php", s.act = "a_save_special"
        } else e = "al_friends.php", s.act = "save_privacy";
        clearTimeout(cur["privacy_timer_" + t]), cur["privacy_timer_" + t] = setTimeout(ajax.post.pbind(e, s, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("privacy_edit_" + t)
        }), 500)
    },
    initPrivacy: function() {
        if (cur.onPrivacyChanged = Settings.savePrivacyKey, nav.objLoc.hl) {
            var t = geByClass1("_" + nav.objLoc.hl);
            Settings.scrollHighlightPrivacy(t)
        }
    },
    highlightPrivacy: function(t) {
        t = ge(t), t && (addClass(t, "setting_row_selected"), setTimeout(function() {
            addClass(t, "setting_row_animated"), setTimeout(function() {
                removeClass(t, "setting_row_selected"), removeClass(t, "setting_row_animated")
            }, 1e3)
        }, 1500))
    },
    scrollHighlightPrivacy: function(t) {
        if (t = ge(t)) {
            var e = getXY(t),
                s = e[1],
                o = scrollGetY() + getSize("page_header")[1];
            o > s ? (scrollToY(s, 300), setTimeout(Settings.highlightPrivacy.pbind(t), 300)) : Settings.highlightPrivacy(t)
        }
    },
    initSearchBox: function(t, e, s) {
        extend(cur, e), s && ajax.preload(cur.searchBoxAddress, cur.searchBoxParams, s), window.uiScrollBox && uiScrollBox.init(t, {
            onShow: function() {
                addEvent(boxLayerWrap, "scroll", Settings.boxScrollResize), setTimeout(Settings.boxScrollResize, 0)
            },
            onHide: function() {
                removeEvent(boxLayerWrap, "scroll", Settings.boxScrollResize)
            }
        }), addEvent(boxLayerWrap, "scroll", Settings.boxScrollResize), Settings.boxScrollResize()
    },
    boxScrollResize: function() {
        if (!browser.mobile) {
            var t = lastWindowHeight,
                e = ge(cur.boxMoreLink);
            e && isVisible(e) && t > getXY(e, !0)[1] && cur.boxShowMore()
        }
    },
    moreSearchBoxLoaded: function(t, e, s) {
        cur.searchBoxParams.offset = e;
        for (var o = cur.boxRows, n = ce("div", {
                innerHTML: t
            }); n.firstChild;) o.appendChild(n.firstChild);
        toggle(cur.boxMoreLink, s), s && (cur.loading = 1, ajax.post(cur.searchBoxAddress, cur.searchBoxParams, {
            onDone: function() {
                2 == cur.loading ? Settings.moreSearchBoxLoaded.apply(window, arguments) : cur.loading = !1
            },
            onFail: function() {
                return cur.loading = 0, !0
            },
            cache: 1
        }))
    },
    moreSearchBox: function(t, e, s) {
        var o = cur.boxMoreLink;
        if ((t || isVisible(o) && !hasClass(o, "loading")) && (!t || s != cur.searchBoxParams.q)) {
            if (cur.loading) return void(cur.loading = 2);
            t && (cur.oldBoxParams = {
                q: cur.searchBoxParams.q,
                offset: cur.searchBoxParams.offset
            }, extend(cur.searchBoxParams, {
                q: s,
                offset: 0
            })), ajax.post(cur.searchBoxAddress, cur.searchBoxParams, {
                onDone: function(s, o, n, i) {
                    if (t) {
                        if (i) return extend(cur.searchBoxParams, cur.oldBoxParams), val(e, cur.oldBoxParams.q), void(cur.searchBoxFound && cur.searchBoxFound(i));
                        cur.boxRows.innerHTML = s ? "" : cur.boxNoRowsTpl, curBox().tbToTop()
                    }
                    Settings.moreSearchBoxLoaded.apply(window, arguments)
                },
                onFail: function() {
                    return cur.loading = 0, !0
                },
                showProgress: function() {
                    cur.searchBoxParams.offset ? addClass(o, "loading") : uiSearch.showProgress(e)
                },
                hideProgress: function() {
                    uiSearch.hideProgress(e), removeClass(o, "loading")
                }
            })
        }
    },
    moreSearchBoxChange: function(t, e) {
        e && "paste" == e.type ? Settings.moreSearchBox(!0, curBox().tbSearchField, t) : t.length || Settings.moreSearchBox(!0, curBox().tbSearchField, "")
    },
    initBlacklist: function() {
        ge("settings_bl_msg") && setTimeout(removeClass.pbind(ge("settings_bl_msg"), "msg_appear"), 0), elfocus("settings_bl_search")
    },
    searchBlacklist: function(t) {
        t && (t = t.toLowerCase());
        var e = ge("settings_bl_empty"),
            s = getLang("settings_blacklist_not_found_by_query"),
            o = ge("settings_bl_list"),
            n = geByClass("settings_bl_row", o),
            i = 0;
        for (var a in n) {
            var r = n[a];
            if (t) {
                var c = geByClass1("settings_bl_name", r);
                c = val(geByTag1("a", c)).toLowerCase(), c.indexOf(t) > -1 ? (show(r), i++) : hide(r)
            } else show(r), i++
        }
        if (t && !i) {
            var l = s.split("{query}").join("<b>" + t.replace(/([<>&#]*)/g, "") + "</b>");
            e.innerHTML = l, show(e), hide("settings_bl_noempty")
        } else hide(e), show("settings_bl_noempty")
    },
    doAddToBlacklist: function(t, e) {
        ajax.post("al_settings.php", {
            act: "search_blacklist",
            query: t,
            hash: cur.options.blacklist_hash
        }, {
            onDone: function(t, e, s) {
                curBox().emit("success", s), curBox().hide();
                var o = ge("settings_bl_summary");
                t && -1 != t && o && (o.innerHTML = langNumeric(t, "%s", !0));
                var n = ce("div", {
                        innerHTML: e
                    }).firstChild,
                    i = ge("settings_bl_list");
                re(n.id), i && (i.insertBefore(n, i.firstChild), show("settings_bl_noempty"), hide("settings_bl_empty"), showMsg("settings_bl_result", s, "ok_msg", !0))
            },
            onFail: function(t) {
                return showMsg("settings_search_rows", t, "error", !0), !0
            },
            showProgress: function() {
                "BUTTON" == e.tagName ? lockButton(e) : uiSearch.showProgress(e)
            },
            hideProgress: function() {
                "BUTTON" == e.tagName ? unlockButton(e) : uiSearch.hideProgress(e)
            }
        })
    },
    addToBlacklist: function() {
        return showBox("al_settings.php", {
            act: "blacklist_box"
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    addToBl: function(t, e, s) {
        ajax.post("al_settings.php", {
            act: "a_add_to_bl",
            id: t,
            hash: e,
            from: "settings"
        }, {
            onDone: function(o) {
                o && (ge("settings_bl_summary").innerHTML = langNumeric(o, "%s", !0)), hide("settings_bl_label" + t), s.onclick = function() {
                    return Settings.delFromBl(t, e, s), !1
                }, s.innerHTML = getLang("settings_remove")
            },
            onFail: function(t) {
                return setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, t).hide, 2e3), !0
            },
            showProgress: function() {
                hide(s), show("settings_progress" + t)
            },
            hideProgress: function() {
                show(s), hide("settings_progress" + t)
            }
        })
    },
    delFromBl: function(t, e, s) {
        ajax.post("al_settings.php", {
            act: "a_del_from_bl",
            id: t,
            hash: e,
            from: "settings"
        }, {
            onDone: function(o) {
                ge("settings_bl_summary").innerHTML = o ? langNumeric(o, "%s", !0) : "", setStyle("settings_bl_label" + t, "display", "inline"), s.onclick = function() {
                    return Settings.addToBl(t, e, s), !1
                }, s.innerHTML = getLang("settings_restore_blacklist")
            },
            onFail: function(t) {
                return setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, t).hide, 2e3), !0
            },
            showProgress: function() {
                hide(s), show("settings_progress" + t)
            },
            hideProgress: function() {
                show(s), hide("settings_progress" + t)
            }
        })
    },
    delTopFromBl: function(t, e, s) {
        var o = ce("img", {
            src: "/images/upload.gif"
        });
        ajax.post("al_settings.php", {
            act: "a_del_from_bl",
            id: t,
            hash: e,
            from: "settings"
        }, {
            onDone: function(s) {
                s && (ge("settings_bl_summary").innerHTML = s ? langNumeric(s, "%s", !0) : ""), setStyle("settings_bl_label" + t, "display", "inline");
                var o = geByTag1("a", geByClass1("settings_bl_action", ge("settings_bl_row" + t)));
                o.onclick = function() {
                    return Settings.addToBl(t, e, o), !1
                }, o.innerHTML = getLang("settings_restore_blacklist"), hide("settings_bl_result")
            },
            showProgress: function() {
                s.parentNode.replaceChild(o, s)
            },
            hideProgress: function() {
                o.parentNode.replaceChild(s, o)
            }
        })
    },
    saveSmsNotify: function(t) {
        lockButton(t);
        var e = {
            act: "a_save_sms_notify",
            hash: cur.options.notify_hash
        };
        each(cur.options.notify_sms_keys, function(t, s) {
            e[s] = Privacy.getValue(s)
        }), e.smsenabled = isChecked("smsenabled") ? 1 : 0, isChecked("daytime") ? (e.daytime_from = ge("daytime_from").value, e.daytime_to = ge("daytime_to").value) : (e.daytime_from = 0, e.daytime_to = 0), val("settings_notify_sms_result", ""), ajax.post("al_settings.php", e, {
            onDone: function(e, s, o) {
                unlockButton(t), s && o ? showFastBox({
                    title: e,
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, s, getLang("settings_subscribe_to_service_btn"), function() {
                    window.open(o), curBox().hide()
                }, getLang("box_cancel"), function() {
                    checkbox("smsenabled", 0), Settings.smsNotifyCheck(), Settings.saveSmsNotify(), curBox().hide()
                }) : showMsg("settings_notify_sms_result", e, "ok_msg", !0)
            },
            onFail: function(e) {
                unlockButton(t), checkbox("smsenabled", 0), Settings.smsNotifyCheck(), Settings.saveSmsNotify()
            }
        })
    },
    saveSiteNotify: function(t) {
        var e = {
            act: "a_save_site_notify",
            hash: cur.options.notify_hash
        };
        each(cur.options.notify_site_keys, function(t, s) {
            e[s] = isChecked(s) ? 1 : 0
        }), each(cur.options.notify_site_pkeys, function(t, s) {
            e[s] = Privacy.getValue(s)
        }), e.ienable = isChecked("settings_ienable") ? 1 : 0, e.itexts = isChecked("settings_itexts") ? 1 : 0, clearTimeout(cur.instantNotifyTO), clearTimeout(cur.instantNotifySaveTO), cur.instantNotifyTO = setTimeout(ajax.post.pbind("al_settings.php", e, {
            onDone: function() {
                cur.instantNotifySaveTO = setTimeout(window.uiPageBlock && uiPageBlock.showSaved.pbind(t), 1e3)
            }
        }), 500), TopNotifier && TopNotifier.invalidate()
    },
    checkboxSiteNotify: function(t, e) {
        e.target && hasClass(e.target, "item_sel") || (checkbox(t), Settings.saveSiteNotify(t))
    },
    saveMailNotify: function(t) {
        var e = {
            act: "a_save_mail_notify",
            hash: cur.options.notify_hash
        };
        e.mail_period = Privacy.getValue("mail_period"), each(cur.options.notify_mail_keys, function(t, s) {
            e[s] = isChecked(s) ? 1 : 0
        }), clearTimeout(cur.mailNotifyTO), cur.mailNotifyTO = setTimeout(ajax.post.pbind("al_settings.php", e, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind(t)
        }), 500)
    },
    saveNotifyPrivacyKey: function(t) {
        "mail_period" == t ? (Settings.saveMailNotify("privacy_edit_" + t), 3 == Privacy.getValue(t) ? hide("mail_options") : show("mail_options")) : "lk_fr" == t || "co_fr" == t ? Settings.saveSiteNotify("privacy_edit_" + t) : "sms_pm_notify" == t && (0 != Privacy.getValue(t) ? hide("sms_pm_privacy_row") : show("sms_pm_privacy_row"))
    },
    initNotify: function() {
        ls.get("sound_notify_off") && removeClass("settings_isounds", "on"), cur.reloadOnMailBind = !0;
        new Dropdown(ge("daytime_from"), ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], {
            selectedItems: cur.options.time_from,
            dark: 1
        }), new Dropdown(ge("daytime_to"), ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], {
            selectedItems: cur.options.time_to,
            dark: 1
        });
        cur.onPrivacyChanged = Settings.saveNotifyPrivacyKey
    },
    smsNotifyCheck: function() {
        isChecked("smsenabled") ? (slideDown(ge("sms_options"), 200), show("sms_options_msg")) : isVisible("sms_options") && (hide("sms_options_msg"), slideUp(ge("sms_options"), 200))
    },
    smsDayTimeCheck: function() {
        isChecked("daytime") ? slideDown(ge("daytime_from_to"), 200) : slideUp(ge("daytime_from_to"), 200)
    },
    updateInstantSounds: function(t) {
        ls.set("sound_notify_off", isChecked(t) ? 0 : 1), uiPageBlock.showSaved(t)
    },
    smsUnsubscribe: function(t, e, s, o) {
        var n = '<a href="' + t.href + '">' + t.innerHTML + "</a>",
            i = 1;
        if (0 > e) {
            i = o ? 3 : 2;
            var a = o ? getLang("settings_confirm_unsubscribe_event_msg") : getLang("settings_confirm_unsubscribe_group_msg")
        } else var a = getLang("settings_confirm_unsubscribe_fan_msg");
        return a = a.replace("{name}", n), showFastBox({
            title: getLang("settings_confirm_unsubscribe_title"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, a, getLang("box_yes"), function() {
            ajax.post("/settings", {
                act: "a_sms_unsubscribe",
                hash: s,
                oid: e,
                row: i
            }, {
                onDone: function(t) {
                    var e = ge("sms_subscribes_row" + i);
                    t ? e.innerHTML = t : hide(e.parentNode), curBox().hide()
                },
                progress: curBox().progress
            })
        }, getLang("box_no")), !1
    },
    checkPIN: function(t) {
        var e = t.value.replace(/[^0-9]/g, "");
        t.value != e && (t.value = e)
    },
    updatePIN: function(t) {
        lockButton(ge("pin_btn")), val("settings_pin_result", "");
        var e = {
            act: "a_change_pin",
            pin: ge("pin").value,
            hash: t
        };
        ajax.post("al_settings.php", e, {
            onDone: function(t) {
                unlockButton(ge("pin_btn")), val("settings_pin_value", e.pin), showMsg("settings_pin_result", t, "ok_msg", !0)
            },
            onFail: function(t) {
                return unlockButton(ge("pin_btn")), showMsg("settings_pin_result", t, "error", !0), !0
            }
        })
    },
    getAdminSelectShowCt: function(t) {
        return Object.keys(t).filter(function(e) {
            return t[e]
        }).length
    },
    initMenuBox: function(t, e, s) {
        this.initMenuEvents(t), t.setOptions({
            onHide: function() {
                cur.adminGroupsDirty && (window.Notifier && Notifier.resetCommConnection(), ajax.post("al_settings.php", {
                    act: "a_get_left_menu"
                }, {
                    onDone: function(t) {
                        geByTag1("ol", ge("side_bar")).innerHTML = t
                    }
                })), 2 == e && isFunction(cur.settingsBoxSetLeftMenuAppCallback) && cur.settingsBoxSetLeftMenuAppCallback(!1)
            }
        }), cur.menuSettings = s, this.updateMenuBoxCount(e)
    },
    initMenuEvents: function(t) {
        var e = geByClass1("olist", t.bodyNode),
            s = geByClass1("summary_tabs", t.bodyNode);
        setStyle(s, "display", "inline-block");
        var o = getSize(s)[0] + parseInt(getStyle(s, "marginLeft")) + parseInt(getStyle(s, "marginRight"));
        o > 450 && t.setOptions({
            width: Math.ceil(o)
        }), setStyle(s, "display", null), addEvent(e, "scroll", this.onMenuBoxScroll.pbind(t, e)), this.onMenuBoxScroll(t, e)
    },
    onMenuBoxScroll: function(t, e) {
        var s = domPN(t.bodyNode),
            o = e.scrollHeight,
            n = e.scrollTop,
            i = e.offsetHeight || e.clientHeight;
        toggleClass(s, "olist_topsh", n > 0), toggleClass(s, "olist_botsh", o > n + i)
    },
    updateMenuBoxCount: function(t) {
        var e = curBox(),
            s = cur.menuSettings[t] || {},
            o = Settings.getAdminSelectShowCt(s),
            n = "";
        (1 == t || 2 == t) && (n = '<span class="settings_menu_box_counter">' + getLang("settings_admin_groups_left").replace("{count}", o).replace("{amt}", Settings.MAX_LEFT_GROUPS) + "</span>"), e.setControlsText(n)
    },
    toggleMenuBoxRow: function(t, e, s) {
        var o = cur.menuSettings[e] || {},
            n = Settings.getAdminSelectShowCt(o),
            i = o[s];
        return curBox().changed = !0, (1 == e || 2 == e) && (toggleClass(gpeByClass("olist_section", t), "settings_menu_rows_disabled", !i && n >= Settings.MAX_LEFT_GROUPS - 1), !i && n >= Settings.MAX_LEFT_GROUPS) ? !1 : (toggleClass(t, "olist_item_wrap_on", !i), o[s] = i ? 0 : 1, Settings.updateMenuBoxCount(e), !1)
    },
    switchMenuBoxSection: function(t, e) {
        var s = curBox();
        each(geByClass("olist_section", s.bodyNode), function() {
            hide(this)
        }), show("settings_menu_" + e), geByClass1("olist", s.bodyNode).scrollTop = 0, Settings.updateMenuBoxCount(e)
    },
    saveMenu: function(t, e) {
        for (var s = curBox(), o = [], n = [], i = [], a = [], r = {
                hash: t,
                act: "a_change_services"
            }, c = !1, l = 0; 3 >= l; l++) {
            var u = cur.menuSettings[l] || {};
            each(u, function(t, e) {
                switch (l) {
                    case 1:
                        e && n.push(t);
                        break;
                    case 2:
                        i.push(t), e && (cur.aid == t && (c = !0), o.push(t));
                        break;
                    case 3:
                        e || a.push(t);
                        break;
                    default:
                        r[t] = e
                }
            })
        }
        i.length && (r.apps_all = i.join(","), r.apps_on = o.join(",")), r.groups_list = n.join(","), r.service_hidden = a.join(","), ajax.post("al_settings.php", r, {
            onDone: function(t) {
                geByTag1("ol", ge("side_bar")).innerHTML = t, window.uiPageBlock && uiPageBlock.showSaved("settings_services"), isFunction(cur.settingsBoxSetLeftMenuAppCallback) && cur.settingsBoxSetLeftMenuAppCallback(c), s.hide(), window.Apps && Apps.updateAddToMenuAction()
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    accessCheck: function() {
        clearTimeout(cur.accessUpdateTO), cur.accessUpdateTO = setTimeout(Settings.accessSubmit, 200)
    },
    giftsCheck: function() {
        clearTimeout(cur.giftsUpdateTO), cur.giftsUpdateTO = setTimeout(Settings.giftsSubmit, 200)
    },
    giftsSubmit: function() {
        ajax.post("/al_profile.php", {
            act: "hide_gifts",
            hash: cur.options.hide_gifts_hash,
            shown: isChecked(ge("hide_gifts")) ? 0 : 1
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    gifCheck: function() {
        clearTimeout(cur.gifUpdateTO), cur.gifUpdateTO = setTimeout(Settings.gifSubmit, 200)
    },
    gifSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_change_autoplay_gif",
            hash: cur.options.gif_autoplay_hash,
            no_autoplay: isChecked(ge("settings_gif_autoplay")) ? 0 : 1
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    accessSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_toggle_access_mode",
            hash: cur.options.access_hash,
            mode: intval(ge("settings_a11y").checked)
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("settings_a11y")
        })
    },
    stickersHintsCheck: function() {
        clearTimeout(cur.stickersHintsTO), cur.stickersHintsTO = setTimeout(Settings.stickersHintsSubmit, 200)
    },
    stickersHintsSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_change_stickers_hints",
            hash: cur.options.stickers_hints_hash,
            hints: isChecked(ge("settings_stickers_hints")) ? 1 : 0
        }, {
            onDone: function() {
                window.uiPageBlock && uiPageBlock.showSaved("cposts"), window.Emoji && Emoji.updateTabs.apply(window, arguments)
            }
        })
    },
    videoCheck: function() {
        clearTimeout(cur.videoUpdateTO), cur.videoUpdateTO = setTimeout(Settings.videoSubmit, 200)
    },
    videoSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_change_autoplay_video",
            hash: cur.options.video_autoplay_hash,
            video_autoplay: isChecked(ge("settings_video_autoplay")) ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    videostartCheck: function() {
        clearTimeout(cur.videostartUpdateTO), cur.videostartUpdateTO = setTimeout(Settings.videostartSubmit, 200)
    },
    videostartSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_change_autostart_video",
            hash: cur.options.video_autostart_hash,
            video_autostart: isChecked(ge("settings_video_autostart")) ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    videoadsCheck: function() {
        clearTimeout(cur.videoadsUpdateTO), cur.videoadsUpdateTO = setTimeout(Settings.videoadsSubmit, 200)
    },
    videoadsSubmit: function() {
        ajax.post("/al_settings.php", {
            act: "a_change_ads_video",
            hash: cur.options.video_ads_hash,
            video_ads: isChecked(ge("settings_video_ads")) ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    microblogCheck: function(t) {
        hasClass(ge("settings_" + t), "disabled") || (clearTimeout(cur.microblogUpdateTO), cur.microblogUpdateTO = setTimeout(Settings.microblogSubmit, 200))
    },
    microblogSubmit: function() {
        var t = {
            act: "a_change_microblog",
            hash: cur.options.microblog_hash
        };
        each(["status_default", "no_wall_replies"], function(e, s) {
            t[s] = isChecked(ge("settings_" + s))
        }), ajax.post("/al_settings.php", t, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind("cposts")
        })
    },
    OTPAuthEnable: function(t) {
        return showBox("al_settings.php", {
            act: "otp_auth_box",
            confirm: t,
            hash: cur.options.otp_hash
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    OTPAuthAppSet: function(t) {
        return showBox("al_settings.php", {
            act: "otp_auth_app_box",
            hash: cur.options.otp_hash
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    OTPAuthDisable: function(t) {
        if (buttonLocked(t)) return !1;
        var e = {
            act: "a_otp_auth_save",
            type: "otp_auth",
            hash: cur.options.otp_hash
        };
        ajax.post("al_settings.php", e, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    OTPAuthAppDisable: function() {
        if (Settings.otpAuthAppDisabling) return !1;
        Settings.otpAuthAppDisabling = !0, curBox().showProgress();
        var t = {
            act: "a_otp_auth_save",
            type: "otp_auth_by_app",
            hash: cur.options.otp_hash
        };
        ajax.post("al_settings.php", t, {
            onDone: function() {
                Settings.otpAuthAppDisabling = !1, addClass("settings_otp_auth_app_set", "settings_otp_app_disabled"), val("settings_otp_auth_app_set_link", getLang("settings_otp_auth_by_app_enable")), curBox().hide()
            }
        })
    },
    OTPAuthShowReserveCodes: function(t, e) {
        return showBox("al_settings.php", {
            act: "otp_auth_reserve_codes_box",
            hash: t,
            force_new: e ? 1 : 0
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    OTPAuthGetTrusted: function(t) {
        var e = ge("settings_otp_auth_trusted");
        if (e && isVisible(e) && (t || geByTag1("img", e))) {
            var s = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
            ajax.post(vk.loginscheme + "://" + location.host + "/al_login.php", {
                act: "is_trusted_browser",
                _http: s
            }, {
                frame: s,
                onDone: function(t) {
                    e.innerHTML = t
                }
            })
        }
    },
    OTPAuthClearTrusted: function(t, e, s) {
        function o() {
            if (!e && cur.options.otp_reset_hash) return cur.onReLoginDoneCallback = function() {
                ge("settings_reset_sessions_link").parentNode.innerHTML = '<div class="settings_labeled_notice">' + getLang("setting_all_sessions_reset") + "</div>"
            }, Settings.reset_sessions = !1, Settings.resetAllSessions(t, '<input name="otp_reset_hash" value="' + cur.options.otp_reset_hash + '" type="hidden" />', t.getAttribute("complete"), cur.options.logout_hash), void(n && n.hide());
            var o = ce("img", {
                    src: "/images/upload" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".gif"
                }, {
                    width: 32
                }),
                i = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
            ajax.post(vk.loginscheme + "://" + location.host + "/al_login.php", {
                act: "clear_trusted_browsers",
                only_cur: e,
                hash: s,
                _http: i
            }, {
                frame: i,
                onDone: function(e) {
                    n && n.hide(), t.parentNode.innerHTML = '<div class="settings_labeled_notice">' + t.getAttribute("complete") + "</div>"
                },
                showProgress: function() {
                    n ? n.showProgress() : t.parentNode.replaceChild(o, t)
                },
                hideProgress: function() {
                    n ? n.hideProgress() : o.parentNode.replaceChild(t, o)
                }
            })
        }
        var n = !1,
            i = t.getAttribute("confirm");
        i ? (i = i.split("<!!>"), n = showFastBox({
            title: i[0],
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, i[1], i.length > 2 ? i[2] : getLang("box_yes"), o)) : o()
    },
    OTPAppPasswords: function() {
        return showBox("al_settings.php", {
            act: "otp_auth_app_passwords_box"
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    OTPCreateAppPassword: function(t, e) {
        if (!isButtonLocked(t)) {
            var s = val("settings_app_password_name");
            if (!s.length) return void notaBene("settings_app_password_name");
            val("settings_app_passwords_error", ""), ajax.post("al_settings.php", {
                act: "a_otp_auth_create_app_password",
                name: s,
                hash: e
            }, {
                onDone: function(t, e, s) {
                    showFastBox({
                        title: t,
                        width: 450
                    }, e), ge("settings_app_passwords_table_wrap").innerHTML = s, hide("settings_app_passwords_empty"), val("settings_app_password_name", "")
                },
                onFail: function(t) {
                    return t && showMsg("settings_app_passwords_error", t, "error", !0), !0
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }
    },
    OTPRemoveAppPassword: function(t, e, s) {
        return ajax.post("al_settings.php", {
            act: "a_otp_auth_remove_app_password",
            id: e,
            hash: s
        }, {
            onDone: function() {
                re("settings_app_password" + e), geByTag("tr", "settings_app_passwords_table_wrap").length <= 1 && (ge("settings_app_passwords_table_wrap").innerHTML = "", show("settings_app_passwords_empty"))
            },
            showProgress: function() {
                showProgress(t.parentNode), hide(t)
            },
            hideProgress: function() {
                hideProgress(t.parentNode), show(t)
            }
        }), !1
    },
    passwordDone: function(t, e) {
        re(cur.pwchFrame), unlockButton(cur.pwchDestroy), cur.pwchFrame = !1;
        var s, o = "settings_new_pwd";
        switch (t) {
            case 1:
                s = "settings_cant_set_this_password";
                break;
            case -2:
                s = "settings_oldpwd_notcorr", o = "settings_old_pwd";
                break;
            case 2:
                return hide("settings_error_pwd"), val(geByClass1("settings_labeled_text", "chgpass"), getLang("settings_pass_update_just_now")), val("settings_old_pwd", ""), val("settings_new_pwd", ""), val("settings_confirm_pwd", ""), Settings.toggleBlock("chgpass"), Settings.showMsg(getLang("settings_pass_success")), void(cur.pwchCaptchaBox && (cur.pwchCaptchaBox.hide(), cur.pwchCaptchaBox = !1));
            case -1:
                return void(cur.pwchCaptchaBox = showCaptchaBox(e, 1, cur.pwchCaptchaBox, {
                    onSubmit: Settings.passwordSubmit.pbind(cur.pwchDestroy),
                    onDestroy: function() {}
                }));
            default:
                s = "settings_cant_change_password"
        }
        cur.pwchCaptchaBox && (cur.pwchCaptchaBox.hide(), cur.pwchCaptchaBox = !1), Settings.showError(getLang(s), "pwd"), notaBene(o)
    },
    passwordSubmit: function(t, e, s) {
        var o = val("settings_old_pwd"),
            n = val("settings_new_pwd"),
            i = val("settings_confirm_pwd"),
            a = ge("settings_pwd_tt_place").tt;
        if (!cur.pwchFrame) {
            if (!o) return void notaBene("settings_old_pwd");
            if (!n) return void notaBene("settings_new_pwd");
            if (!i) return void notaBene("settings_confirm_pwd");
            if (a && a.hide({
                    fasthide: !0
                }), n.match(/\s/)) return Settings.showError(getLang("settings_pwd_bad"), "pwd"), notaBene("settings_new_pwd"), void(a && setTimeout(a.show, 10));
            if (n.length < 6) return Settings.showError(getLang("settings_pwd_bad"), "pwd"), notaBene("settings_new_pwd"), void(a && setTimeout(a.show, 10));
            if (i != n) return Settings.showError(getLang("settings_newpwd_notcorr"), "pwd"), notaBene("settings_confirm_pwd"), void(a && setTimeout(a.show, 10));
            cur.pwchDestroy || cur.destroy.push(function(t) {
                re(t.pwchFrame)
            }), cur.pwchDestroy = t, curBox() || lockButton(cur.pwchDestroy);
            var r = {
                act: "changepass",
                _origin: locProtocol + "//" + locHost,
                pass: o,
                new_pass: n
            };
            e && s && (r.captcha_sid = e, r.captcha_key = s), r.phash = cur.options.phash, cur.pwchDone = Settings.passwordDone, cur.pwchFrame = utilsNode.appendChild(ce("iframe", {
                src: vk.loginscheme + "://login.vk.com/?" + ajx2q(r)
            }))
        }
    },
    mailSubmit: function(t, e) {
        if (e) {
            var s = "";
            re(t)
        } else {
            var s = trim(val("settings_new_mail"));
            if (!s) return void notaBene("settings_new_mail");
            lockButton(t)
        }
        var o = {
            act: "a_bind_mail",
            email: s,
            is_new: 1,
            hash: cur.options.mail_hash
        };
        return ge("settings_new_mail").blur(), hide("settings_error_mail"), ajax.post("al_settings.php", o, {
            onDone: function(e, s) {
                if (unlockButton(t), s) {
                    var o = ge("chgmail");
                    o.parentNode.replaceChild(se(s), o)
                }
                ge("settings_new_mail").value = "", showDoneBox(e, {
                    out: 4e3,
                    w: 400
                })
            },
            onFail: function(e) {
                return unlockButton(t), Settings.showError(e, "mail"), !0
            }
        }), !1
    },
    phoneSubmit: function() {
        var t = {
            act: "change_phone_box",
            hash: cur.options.phone_hash
        };
        showBox("activation.php", t)
    },
    regionalSubmit: function(t) {
        var e = (ge("timezone") || {}).value,
            s = {
                act: "a_change_regional",
                timeoffset: e,
                hash: cur.options.regional_hash || cur.options.regional_hashes[e]
            };
        lockButton(t), ajax.post("al_settings.php", s, {
            onDone: function(e) {
                unlockButton(t), Settings.showMsg(e)
            },
            onFail: function(e) {
                return unlockButton(t), Settings.showError(e), !0
            }
        })
    },
    reset_sessions: !1,
    resetAllSessions: function(t, e, s, o) {
        if (Settings.reset_sessions) return !1;
        Settings.reset_sessions = !0;
        var n = bodyNode.appendChild(ce("div", {
                innerHTML: '<form action="' + vk.loginscheme + '://login.vk.com/" method="POST" target="reset_sessions_frame">  <input name="_origin" value="' + (locProtocol + "//" + locHost) + '" type="hidden" />  <input name="role" value="al_frame" type="hidden" />  <input name="ip_h" value="' + vk.ip_h + '" type="hidden" />  <input name="reset_hash" value="' + cur.options.reset_hash + '" type="hidden" />' + e + '</form><iframe class="upload_frame" name="reset_sessions_frame"></iframe>'
            })),
            i = n.firstChild,
            a = i.nextSibling,
            r = ce("img", {
                src: "/images/upload" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".gif"
            }, {
                width: 32
            });
        return window.onReLoginDone = function(e, i) {
            try {
                var c = a.contentWindow.location.href;
                if (c.match(/&hash=/) && !c.match(/&hash=[a-z0-9]+/)) return location.href = base_domain + "login.php?op=logout&hash=" + o, !1;
                re(n)
            } catch (l) {
                return
            }
            cur.options.reset_hash = i, t ? t !== !0 && r.parentNode.replaceChild(ce("div", {
                className: "settings_labeled_notice",
                innerHTML: s ? s : getLang("setting_all_sessions_reset")
            }), r) : (box = curBox(), box && (box.hideProgress(), box.setControlsText(getLang("setting_all_sessions_reset"))), j = 0, each(ge("activity_history").lastChild.childNodes, function(t, e) {
                if (1 == e.nodeType) {
                    if (j > 1 && !hasClass(e, "settings_old_session")) {
                        addClass(e, "settings_old_session");
                        var s = geByClass("settings_browser_info", e)[0];
                        removeData(s, "tooltip"), removeData(s, "inited")
                    }
                    j++
                }
            })), isFunction(cur.onReLoginDoneCallback) && cur.onReLoginDoneCallback()
        }, t ? t !== !0 && t.parentNode.replaceChild(r, t) : curBox().showProgress(), i.submit(), !1
    },
    showUserClientTT: function(t, e) {
        var s = "";
        hasClass(t.parentNode.parentNode, "settings_old_session") && (s = '<div style="font-weight:bold; margin-bottom:5px;">' + getLang("settings_session_terminated") + "</div>"), cur.options.ua_tooltips[e] && (s += cur.options.ua_tooltips[e]), s && showTooltip(t, {
            text: s,
            dir: "auto",
            slide: 15,
            className: "settings_user_client_tt",
            hasover: 1
        })
    },
    disabledPrivacy: function() {
        var t = geByClass1("settings_privacy_add_replies_view", ge("content"));
        t && showTooltip(t, {
            black: !0,
            hasover: 1,
            className: "settings_comments_disabled_tt",
            shift: [0, 5],
            text: getLang("settings_comments_disabled_tt").replace("{link}", '<a href="/settings?f=cposts" onclick="return nav.go(this, event, {nocur: true})">').replace("{/link}", "</a>")
        })
    },
    checkAddress: function(t) {
        cur.addrUnchecked = 0, clearTimeout(cur.addressCheckTO), cur.lastAddress != val("settings_addr") && (cur.addressCheckTO = setTimeout(Settings.doCheckAddress, t || 0))
    },
    doCheckAddress: function() {
        var t = ge("settings_address_submit"),
            e = t;
        cur.lastAddress = val("settings_addr"), ajax.post("al_settings.php", {
            act: "a_check_address",
            name: cur.lastAddress
        }, {
            onDone: function(t) {
                cur.addrChecked = 1, disableButton(e, !1), e.innerHTML = t
            },
            onFail: function(t) {
                return cur.addrChecked = -1, e.innerHTML = t, disableButton(e, !0), !0
            },
            showProgress: function() {
                lockButton(e), disableButton(e, !1)
            },
            hideProgress: function() {
                unlockButton(e)
            }
        })
    },
    addressSubmit: function(t) {
        if (1 != cur.addrChecked) return void notaBene("settings_addr");
        var e = {
            act: "a_change_address",
            hash: cur.options.address_hash,
            name: val("settings_addr")
        };
        lockButton(t), ajax.post("al_settings.php", e, {
            onDone: function(e) {
                unlockButton(t), Settings.showMsg(e)
            },
            onFail: function(e) {
                return unlockButton(t), e && Settings.showError(e, "addr"), !0
            }
        })
    },
    init: function() {
        cur.checkboxResultsTOs = {}, cur.module = "settings", cur.options.msg && Settings.showMsg(cur.options.msg), each({
            settings_status_default: getLang("settings_status_default_about"),
            settings_no_wall_replies: getLang("settings_no_wall_replies_about"),
            settings_video_autoplay: getLang("settings_video_autoplay")
        }, function(t, e) {
            t = ge(t), t && (t.onmouseover = function() {
                showTooltip(this, {
                    shift: [-20, 8, 8],
                    dir: "auto",
                    text: e,
                    slide: 15,
                    className: "settings_tt",
                    hasover: 1
                })
            })
        });
        var t = ge("settings_pwd_tt_place");
        each([ge("settings_new_pwd"), ge("settings_confirm_pwd")], function() {
            this && (this.onfocus = function() {
                showTooltip(t, {
                    text: getLang("settings_password_about"),
                    dir: "left",
                    slideX: 15,
                    className: "settings_pwd_tt",
                    shift: [-12, -15, 0],
                    onCreate: function() {
                        removeEvent(t, "mouseout")
                    }
                })
            }, this.onblur = function() {
                t.tt && t.tt.hide && t.tt.hide()
            })
        });
        var e = ge("settings_addr");
        e.onfocus = function() {
            showTooltip(e, {
                text: getLang("settings_addr_intro"),
                dir: "auto",
                slide: 15,
                className: "settings_toup_tt",
                shift: [getSize("prefix_input_prefix")[0], 10],
                onCreate: function() {
                    removeEvent(e, "mouseout"), e.onblur = function() {
                        e.tt.hide()
                    }
                }
            })
        }, cur.lastAddress = val(e);
        var s = ge("settings_new_mail");
        s && (s.onfocus = function() {
            showTooltip(s, {
                text: getLang("settings_email_about"),
                dir: "auto",
                slide: 15,
                className: "settings_toup_tt",
                shift: [0, 10],
                onCreate: function() {
                    removeEvent(s, "mouseout"), s.onblur = function() {
                        s.tt.hide()
                    }
                }
            })
        }), extend(cur, {
            validationLastCallback: function(t) {
                curBox() && curBox().hide(), t ? Settings.phoneSubmit() : elfocus("settings_new_phone")
            }
        }), setTimeout(function() {
            if (nav.objLoc.f) {
                var t = ge(nav.objLoc.f.split(",")[0]);
                t && hasClass(t, "settings_line") && Settings.toggleBlock(t.firstChild)
            }
        }, 100), cur.destroy.push(function() {
            window.onLogout = window.onLoginDone = nav.reload
        })
    },
    emailPosts: function(t, e) {
        ajax.post("al_settings.php", {
            act: "send_email_post",
            hash: t
        }, {
            onDone: function(t, s) {
                ge("settings_email_post_msg").innerHTML = t, setStyle(ge("settings_email_post_msg"), {
                    borderColor: "#D4BC4C",
                    backgroundColor: "#F9F6E7"
                }), animate(ge("settings_email_post_msg"), {
                    borderColor: "#B9C4DA",
                    backgroundColor: "#FFFFFF"
                }, 3e3), e.innerHTML = s
            },
            showProgress: function() {
                lockButton(e)
            },
            hideProgress: function() {
                unlockButton(e)
            }
        })
    },
    showPaymentsMethods: function(t, e, s) {
        return ajax.post("al_settings.php", {
            act: "a_payments_methods",
            money_transfer: s ? 1 : 0,
            hash: e
        }, {
            onDone: function(e) {
                var s = ce("div", {
                    innerHTML: e,
                    className: "unshown"
                });
                t.parentNode.replaceChild(s, t), slideDown(s, 100)
            }
        }), !1
    },
    deletePaymentMethod: function(t, e, s, o) {
        if (!o) return void(cur.confirmBox = showFastBox({
            title: cur.lang.global_action_confirmation,
            dark: 1,
            forceNoBtn: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, cur.lang.settings_delete_payment_method_confirm, getLang("global_delete"), function() {
            Settings.deletePaymentMethod(t, e, s, !0)
        }, getLang("global_cancel")));
        var n = t.parentNode;
        return ajax.post("al_payments.php", {
            act: "a_del_instant_method",
            type: e,
            hash: s
        }, {
            onDone: function(t) {
                n.innerHTML = t
            },
            onDone: function(t) {
                return n.innerHTML = t, !0
            },
            showProgress: function() {
                cur.confirmBox.showProgress()
            },
            hideProgress: function() {
                cur.confirmBox.hide()
            }
        }), !1
    },
    showNextPaymentsHistory: function(t, e) {
        if (!buttonLocked(t)) {
            lockButton(t);
            var s, o;
            return "transfer" === e ? (s = {
                act: "a_transfer_history",
                offset: cur.historyOffset
            }, o = "settings_transfer_history") : "subscriptions" === e ? (s = {
                act: "a_payments_subsciptions",
                offset: cur.historyOffset
            }, o = "settings_payments_subscriptions") : (s = {
                act: "a_votes_history",
                offset: cur.historyOffset
            }, o = "settings_votes_history"), ajax.post("al_settings.php", s, {
                onDone: function(e, s) {
                    var n = ge(o).tBodies[0];
                    if (e)
                        if (unlockButton(t), cur.historyOffset += 100, browser.msie) {
                            var a = se("<table>" + e + "</table>"),
                                r = geByTag("tr", a);
                            for (i in r) 1 == r[i].nodeType && n.appendChild(r[i])
                        } else n.insertAdjacentHTML("beforeEnd", e);
                    (!e || s) && (addClass(n.lastChild, "settings_votes_history_last"), hide(t))
                }
            }), !1
        }
    },
    switchPaymentsHistoryTab: function(t, e, s) {
        if (checkEvent(s)) return !0;
        var o = clone(nav.objLoc);
        return uiTabs.switchTab(t), "transfer" === e ? (hide("settings_votes_history_wrap", "settings_payments_subscriptions_wrap"), show("settings_transfer_history_wrap"), o.section = e) : "subscriptions" === e ? (hide("settings_votes_history_wrap", "settings_transfer_history_wrap"), show("settings_payments_subscriptions_wrap"), o.section = e) : (hide("settings_transfer_history_wrap", "settings_payments_subscriptions_wrap"), show("settings_votes_history_wrap"), delete o.section), nav.setLoc(o), !1
    },
    moneyTransferCancel: function(t, e, s, o, n) {
        var i, a, r = domClosest("_row", t),
            c = geByClass1("_status", r);
        return n ? (2 !== n && (addClass(r, "settings_history_row_progress"), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
            tx_id: e,
            hash: s
        }, {
            onDone: function(t, i) {
                return 0 === t ? (2 !== n && (val(c, getLang("settings_transfer_status_cancelling")), removeClass(c, "settings_transfer_receive")), void setTimeout(Settings.moneyTransferCancel.pbind(r, e, s, o, 2), 2e3)) : (removeClass(r, "settings_history_row_progress"), val(c, getLang("settings_transfer_status_cancelled")), removeClass(c, "settings_transfer_receive"), addClass(c, "settings_transfer_status_cancelled"), void TopNotifier.invalidate())
            },
            onFail: function(t) {
                return removeClass(r, "settings_history_row_progress"), setTimeout(showFastBox(getLang("global_error"), t).hide, 2e3), !0
            }
        })) : (o ? (i = getLang("settings_transfer_decline_confirm"), a = getLang("settings_transfer_decline_btn")) : (i = getLang("settings_transfer_cancel_confirm"), a = getLang("settings_transfer_cancel_btn")), void(cur.confirmBox = showFastBox(getLang("global_action_confirmation"), i, a, Settings.moneyTransferCancel.pbind(t, e, s, o, 1), getLang("global_cancel"))))
    },
    moneyTransferRepeat: function(t, e) {
        return showBox("al_payments.php?act=money_transfer_box", {
            repeat_id: t,
            hash: e
        }), !1
    },
    paymentsSubscriptionCancel: function(t, e, s, o, n) {
        var i = domClosest("_row", t);
        return n ? (addClass(i, "settings_history_row_progress"), cur.confirmBox && cur.confirmBox.hide(), void ajax.post("al_apps.php?act=a_cancel_subscription", {
            aid: e,
            subscription_id: s,
            hash: o
        }, {
            onDone: function() {
                removeClass(i, "settings_history_row_progress"), addClass(i, "settings_history_row_deleted")
            },
            onFail: function(t) {
                return removeClass(i, "settings_history_row_progress"), setTimeout(showFastBox(getLang("global_error"), t).hide, 2e3), !0
            }
        })) : void(cur.confirmBox = showFastBox(getLang("global_action_confirmation"), getLang("settings_subscription_cancel_confirm"), getLang("settings_subscription_cancel_btn"), Settings.paymentsSubscriptionCancel.pbind(t, e, s, o, 1), getLang("global_cancel")))
    },
    initApps: function(opts, appTpl) {
        extend(cur, {
            aSearch: ge("s_search"),
            lShowMoreButton: ge("ui_apps_load_more"),
            lContent: ge("settings_apps_list"),
            aEmptyCont: ge("settings_apps_empty"),
            aSummaryCounter: geByClass1("page_block_header_count", "wide_column"),
            onSilentLoad: {},
            apps: {},
            deletedApps: {},
            appTpl: appTpl || function() {
                return ""
            }
        }), extend(cur, opts), cur.defaultCount = cur.shownApps, cur.appTpl = appTpl || function() {
            return ""
        }, Settings.scrollNode = browser.msie6 ? pageNode : window, addEvent(Settings.scrollNode, "scroll", Settings.scrollCheckApps.bind(this)), setTimeout(function() {
            cur.destroy.push(function() {
                removeEvent(Settings.scrollNode, "scroll", Settings.scrollCheckApps.bind(this))
            })
        }, 0), cur.silent = !0, ajax.post("/al_settings.php", {
            act: "load_apps_silent"
        }, {
            cache: 1,
            local: 1,
            onDone: function(data, count) {
                return (data = eval("(" + data + ")")) ? (void 0 === cur.searchOffset && (cur.searchOffset = 0), cur.curList = "all", cur.appsList = data[cur.curList] ? data : {
                    all: []
                }, cur.appsCount = count, void this.indexApp(function() {
                    if (cur.silent = !1, cur.onSilentLoad)
                        for (var t in cur.onSilentLoad) isFunction(cur.onSilentLoad[t]) && cur.onSilentLoad[t]()
                })) : cur.silent = !1
            }.bind(this)
        })
    },
    isDelayedOnSilentLoad: function t(e, s) {
        return cur.silent ? (t.count = t.count || 0, t.count++, cur.onSilentLoad[e || "key_" + t.count] = s, !0) : void 0
    },
    indexApp: function(t) {
        cur.appsIndex = new vkIndexer(cur.appsList.all, function(t) {
            try {
                return cur.apps[parseInt(t[0])] = t, t[3]
            } catch (e) {
                return ""
            }
        }, t)
    },
    scrollCheckApps: function() {
        this.isDelayedOnSilentLoad("scrollCheck", this.scrollCheckApps.bind(this)) || !browser.mobile && !cur.isAppsLoading && !cur.disableAutoMore && isVisible(cur.lShowMoreButton) && (window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight) + scrollGetY() + 400 >= cur.lShowMoreButton.offsetTop && this.showAppsRows()
    },
    showAppsRows: function() {
        if (!this.isDelayedOnSilentLoad("showAppsRows", this.showAppsRows.bind(this)) && cur.defaultCount && cur.shownApps < cur.appsCount) {
            var t = clean(cur.searchStr),
                e = "",
                s = cur.appsList[cur.curList] || [],
                o = s.length;
            if (s = this.filterApps(s.slice(cur.shownApps)).slice(0, cur.defaultCount), s.length && cur.appTpl) {
                var n = [];
                each(s, function(t, e) {
                    e = clone(e), cur.selection && (e[3] = e[3].replace(cur.selection.re, cur.selection.val)), n.push(cur.appTpl(e, t == s.length - 1, !1))
                }.bind(this)), e = n.join("")
            }
            if (cur.shownApps) e && cur.lContent.appendChild(cf(e));
            else if (e) cur.lContent.innerHTML = e, cur.aSummaryCounter && (cur.aSummaryCounter.innerHTML = langNumeric(o, "%s", !0)), show("settings_apps_noempty"), hide(cur.aEmptyCont);
            else {
                var i = getLang("settings_apps_not_found_by_query").split("{query}").join("<b>" + t.replace(/([<>&#]*)/g, "") + "</b>");
                cur.aEmptyCont.innerHTML = i, cur.aSummaryCounter && (cur.aSummaryCounter.innerHTML = ""), show(cur.aEmptyCont), hide("settings_apps_noempty")
            }
            cur.shownApps += cur.defaultCount, cur.shownApps >= cur.appsCount ? hide(cur.lShowMoreButton) : (show(cur.lShowMoreButton), this.scrollCheckApps()), cur.aSearch && uiSearch.hideProgress(cur.aSearch)
        }
    },
    filterApps: function(t) {
        for (var e = t.length, s = [], o = 0; e > o; o++) {
            var n = t[o];
            cur.apps && cur.apps[n[0]] && !cur.apps[n[0]].deleted && s.push(n)
        }
        return s
    },
    searchApps: function(t) {
        if (!this.isDelayedOnSilentLoad("searchApps", this.searchApps.bind(this, t))) {
            if (t && " " == t[t.length - 1] && (t[t.length - 1] = "_"), t.length < 2 && (t = ""), cur.ignoreEqual || cur.searchStr !== t) {
                if (cur.searchStr = t || "", t) {
                    var e = cur.appsIndex.search(clean(t));
                    cur.curList = "all_search_" + t, cur.appsList[cur.curList] = e, t += " " + (parseLatin(t) || ""), t = trim(escapeRE(t).split("&").join("&amp;")), cur.selection = {
                        re: new RegExp("(" + t.replace(cur.appsIndex.delimiter, "|") + ")", "gi"),
                        val: '<em class="highlight">$1</em>'
                    }
                } else cur.curList = "all", cur.selection = !1;
                window.tooltips && tooltips.hideAll(), cur.aSearch && uiSearch.showProgress(cur.aSearch), this.scrollToSearch(), hide(cur.lShowMoreButton), cur.loadMore = 1, cur.shownApps = cur.searchOffset = 0, this.showAppsRows()
            }
            delete cur.ignoreEqual
        }
    },
    showAppSettings: function(t) {
        window.tooltips && tooltips.hideAll(), showBox("/al_apps.php", {
            act: "settings_box_info",
            aid: t,
            from: "profile_settings"
        }, {
            stat: ["apps.css"],
            dark: 1
        })
    },
    removeApp: function(t, e, s, o) {
        if (o && cancelEvent(o), this.removingApp) return !1;
        if (this.isDelayedOnSilentLoad("removeApp" + t, this.removeApp.bind(this, t, e, s))) return !1;
        window.tooltips && tooltips.hideAll();
        var n = ge("app" + t),
            i = "profile_settings",
            a = function() {
                ajax.post("/al_apps.php", {
                    act: "quit",
                    id: t,
                    hash: e,
                    from: i
                }, {
                    onDone: function(e) {
                        window.appsListChanged = !0, cur.apps[t] && (cur.appsIndex.remove(cur.apps[t]), cur.apps[t].deleted = !0), cur.deletedApps[t] = {
                            from: i,
                            html: n.innerHTML
                        }, n && n.appendChild(cf(e.html)), addClass(n, "deleted")
                    }.bind(this),
                    showProgress: function() {
                        addClass(n, "loading"), this.removingApp = !0
                    }.bind(this),
                    hideProgress: function() {
                        removeClass(n, "loading"), this.removingApp = !1
                    }.bind(this)
                })
            }.bind(this);
        a()
    },
    restoreApp: function(t, e) {
        if (this.restoringApp) return !1;
        var s = ge("app" + t);
        return ajax.post("/al_apps.php", {
            act: "join",
            id: t,
            hash: e,
            restore: 1,
            from: "al_apps",
            section: "settings"
        }, {
            onDone: function(e) {
                cur.deletedApps[t] && (s.innerHTML = cur.deletedApps[t].html, delete cur.deletedApps[t]), cur.apps[t] && (delete cur.apps[t].deleted, cur.appsIndex.add(cur.apps[t])), removeClass(s, "deleted")
            }.bind(this),
            showProgress: function() {
                this.restoringApp = !0, addClass(s, "loading")
            }.bind(this),
            hideProgress: function() {
                this.restoringApp = !1, removeClass(s, "loading")
            }.bind(this)
        }), !1
    },
    ttCommon: function(t, e, s, o, n) {
        return o && cancelEvent(o), s ? showTooltip(t, {
            center: s,
            shift: n || [0, 8, 8],
            black: 1,
            text: e
        }) : showTitle(t, e, n)
    },
    scrollToSearch: function() {
        var t = ge("page_header_cont"),
            e = ge("settings_search_wrap");
        if (e && t) {
            var s = getXY(domPN(e))[1] - getSize(t)[1];
            scrollNode.scrollTop > s && scrollToY(s, 200)
        }
    },
    deactivateBox: function() {
        return showBox("al_settings.php", {
            act: "deactivate_box"
        }, {
            params: {
                dark: !0
            }
        }), !1
    },
    httpsOnlySubmit: function(t) {
        ajax.post("al_settings.php", {
            act: "save_https",
            hash: cur.options.https_hash,
            https: isChecked("settings_https_only")
        }, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    showValidateDevices: function(t, e) {
        return ajax.post("al_settings.php", {
            act: "a_validate_devices",
            hash: e
        }, {
            onDone: function(e) {
                tooltips.hideAll();
                var s = ce("div", {
                    innerHTML: e,
                    className: "unshown"
                });
                t.parentNode.replaceChild(s, t), slideDown(s, 100)
            }
        }), !1
    },
    deleteValidateDevice: function(t, e, s, o) {
        if (!o) return void(cur.confirmBox = showFastBox({
            title: cur.lang.global_action_confirmation,
            dark: 1,
            forceNoBtn: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, cur.lang.settings_delete_validate_device_confirm, getLang("global_delete"), function() {
            Settings.deleteValidateDevice(t, e, s, !0)
        }, getLang("global_cancel")));
        var n = t.parentNode;
        return ajax.post("al_settings.php", {
            act: "a_del_validate_device",
            i: e,
            hash: s
        }, {
            onDone: function(t) {
                n.innerHTML = t
            },
            onDone: function(t) {
                return n.innerHTML = t, !0
            },
            showProgress: function() {
                cur.confirmBox.showProgress()
            },
            hideProgress: function() {
                cur.confirmBox.hide()
            }
        }), !1
    },
    showNotifySubscriptions: function() {
        return showBox("al_settings.php", {
            act: "notify_subscriptions_box"
        }, {
            stat: ["indexer.js"]
        }), !1
    },
    notifySubscriptionsInit: function(t, e, s) {
        s.onListClick = Settings.notifySubscriptionToggle, cur.subsOList = new OList(t, e, {}, s), t.removeButtons().addButton(getLang("global_close"), function() {
            t.hide(200)
        }, "yes")
    },
    notifySubscriptionToggle: function(t, e) {
        var s = t.id.match(/-?\d+/)[0],
            o = !1;
        each(cur.subsOList.owners, function() {
            return this[0] == s ? (o = this[4], !1) : void 0
        }), ajax.post("/al_wall.php", {
            act: "a_toggle_posts_subscription",
            subscribe: e ? 1 : 0,
            oid: s,
            hash: o
        }, {
            showProgress: addClass.pbind(t, "olist_item_loading"),
            hideProgress: removeClass.pbind(t, "olist_item_loading")
        })
    }
};
try {
    stManager.done("settings.js")
} catch (e) {}