var BugTracker = {
    getAddr: function(e) {
        var t = e.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/(.+)$/),
            r = t[4].substr(t[4].indexOf("#") + 1).replace(/^[\/\!]*/, "");
        return (t = r.match(/^profile\.php\?id=(\d+)/)) ? r = intval(t[1]) : (-1 !== r.indexOf("?") && (r = r.substr(0, r.indexOf("?"))), (t = r.match(/^id(\d+)/)) && (r = intval(t[1]))), r
    },
    goNewBugPage: function(e, t) {
        lockButton(e), t || nav.objLoc.product && (t = nav.objLoc.product), nav.go({
            0: "bugtracker",
            act: "add",
            product: t
        })
    },
    updateSearchInForm: function() {
        var e = trim(val("bt_form_title")),
            t = parseInt(cur.newBugProductDD.val()),
            r = ge("bt_report_form_found_block");
        "" === e ? val(r, "") : ajax.post("bugtracker?act=a_search_in_form", {
            q: e,
            product_id: t
        }, {
            showProgress: addClass.pbind(r, "bt_report_form_found_block_progress"),
            hideProgress: removeClass.pbind(r, "bt_report_form_found_block_progress"),
            onDone: function(e) {
                val(r, e)
            }
        })
    },
    clearForm: function() {
        cur.newBugTagsDD = null, cur.newBugPlatformsDD = null, cur.newBugPlatformsIOSVersionsDD = null, cur.newBugDevicesDD = null, cur.newBugProductDD = null, cur.newBugBox = null, cur.btRemoveBtn = null
    },
    closeNewBugBoxCallback: function(e) {
        if (!e && !cur.btForceCloseNewBox && (trim(val("bt_form_title")) || trim(val("bt_form_descr")) || cur.newBugTagsDD && cur.newBugTagsDD.val() || cur.btNewMedia && cur.btNewMedia.getMedias().length)) {
            var t = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_close_filled_form_confirm"), getLang("global_close"), function() {
                t.hide(), cur.newBugBox.hide(!0)
            }, getLang("global_cancel"));
            return !1
        }
        return cur.btForceCloseNewBox && delete cur.btForceCloseNewBox, !0
    },
    getPlatformsVersions: function() {
        var e = [];
        if (cur.newBugPlatformsIOSVersionsDD && isVisible("bt_form_platforms_ios_versions")) {
            var t = cur.newBugPlatformsIOSVersionsDD.val();
            "" !== t && each(t.split(","), function(t, r) {
                e.push(r)
            })
        }
        if (cur.newBugPlatformsAndroidVersionsDD && isVisible("bt_form_platforms_android_versions")) {
            var r = cur.newBugPlatformsAndroidVersionsDD.val();
            "" !== r && each(r.split(","), function(t, r) {
                e.push(r)
            })
        }
        return e.join(",")
    },
    saveNewBug: function(e, t) {
        var r = cur.newBugBoxButton;
        if (r) {
            var o = {
                    act: "a_save",
                    id: e,
                    hash: t,
                    product: BugTracker.formGetProductId(),
                    title: trim(val("bt_form_title")),
                    descr: trim(val("bt_form_descr")),
                    severity: cur.newBugSeverityDD.val(),
                    platforms: cur.newBugPlatformsDD ? cur.newBugPlatformsDD.val() : "",
                    platforms_versions: BugTracker.getPlatformsVersions(),
                    devices: cur.newBugDevicesDD ? cur.newBugDevicesDD.val() : "",
                    tags: cur.newBugTagsDD.val(),
                    vulnerability: isChecked("bt_form_vulnerability") ? 1 : 0,
                    confidential: isChecked("bt_form_confidential") ? 1 : 0,
                    comment: val("bt_form_comment"),
                    phone: val("bt_form_phone").replace(/[^\d]/g, ""),
                    region_id: isVisible("bt_form_region_block") ? cur.newBugRegionDD.val() : 0,
                    box: cur.newBugBox ? 1 : 0
                },
                a = !1;
            if (o.title || (notaBene("bt_form_title"), a = !0), o.tags.length || (notaBene(cur.newBugTagsDD.container), a = !0), isVisible("bt_form_phone_block") && "" == o.phone && (notaBene("bt_form_phone"), a = !0), isVisible("bt_form_region_block") && 0 == o.region_id && (notaBene(cur.newBugRegionDD.container), a = !0), !o.platforms.length && isVisible("bt_form_platforms") && (notaBene(cur.newBugPlatformsDD.container), a = !0), "" === cur.newBugPlatformsIOSVersionsDD.val() && isVisible("bt_form_platforms_ios_versions") && (notaBene(cur.newBugPlatformsIOSVersionsDD.container), a = !0), "" === cur.newBugPlatformsAndroidVersionsDD.val() && isVisible("bt_form_platforms_android_versions") && (notaBene(cur.newBugPlatformsAndroidVersionsDD.container), a = !0), !o.devices.length && cur.newBugDevicesDD.dataItems.length > 1 && isVisible("bt_form_devices") && (notaBene(cur.newBugDevicesDD.container), a = !0), !a) {
                var n = [];
                each(cur.btNewMedia.getMedias(), function(e, t) {
                    n.push(t[0] + "," + t[1])
                }), o.attachs = n, ajax.post("bugtracker", o, {
                    onDone: function(e) {
                        if (e) {
                            var t = se(e);
                            domReplaceEl(ge(t.id), t)
                        }
                        cur.newBugBox && cur.newBugBox.hide()
                    },
                    showProgress: lockButton.pbind(r),
                    hideProgress: unlockButton.pbind(r)
                })
            }
        }
    },
    formGetProductId: function() {
        return cur.newBugProductDD ? cur.newBugProductDD.val() : cur.newProductId
    },
    formPlatformsChanged: function() {
        var e = cur.newBugPlatformsDD.val();
        if (isVisible("bt_form_platforms")) "" === e && 1 == cur.newBugPlatformsDD.dataItems.length && (e = cur.newBugPlatformsDD.dataItems[0][0].toString());
        else {
            var t = BugTracker.formGetProductId();
            e = cur.btFormDDValues[t].platforms[0][0].toString()
        }
        var r = "" !== e ? e.split(",") : [],
            o = !1,
            a = !1,
            n = !1;
        each(r, function(e, t) {
            t = t.toString(), cur.btFormPlatformSupportsDevices[t] && (o = !0), 3 == t ? a = !0 : 4 == t && (n = !0)
        }), toggle("bt_form_devices", o), toggle("bt_form_platforms_ios_versions", a), toggle("bt_form_platforms_android_versions", n)
    },
    sendComment: function() {
        if (cur.bugreportId && cur.bugreportHash) {
            var b = ge("bt_comment_form_submit"),
                t = ge("bt_comment_form_text"),
                m = trim(val(t)),
                attachs = [];
            return each(cur.btNewCommentMedia.getMedias(), function(e, t) {
                attachs.push(t[0] + "," + t[1])
            }), m || attachs.length ? void ajax.post("bugtracker", {
                act: "send_comment",
                report_id: cur.bugreportId,
                hash: cur.bugreportHash,
                message: m,
                attachs: attachs
            }, {
                showProgress: lockButton.pbind(b),
                hideProgress: unlockButton.pbind(b),
                onDone: function(html, js) {
                    domReplaceEl(ge("bt_report_one_section"), se(html)), js && eval(js)
                }
            }) : notaBene(t)
        }
    },
    updateMergeBoxSearch: function(e) {
        clearTimeout(cur.btMergeBoxSearchTimeout), cur.btMergeBoxSearchTimeout = setTimeout(BugTracker.doUpdateMergeBoxSearch.pbind(e), 300)
    },
    forceUpdateMergeBoxSearch: function(e, t) {
        clearTimeout(cur.btSearchTimeout), BugTracker.doUpdateMergeBoxSearch(t)
    },
    doUpdateMergeBoxSearch: function(e) {
        ajax.post("bugtracker?act=a_bind_box_search", {
            q: e,
            bugreports: BugTracker.getSelectedReportIds()
        }, {
            showProgress: uiSearch.showProgress.pbind("bt_merge_box_search"),
            hideProgress: uiSearch.hideProgress.pbind("bt_merge_box_search"),
            onDone: function(e, t) {
                toggle("bt_merge_box_title", t.length), val("bt_merge_box_rows", e), window.radioBtns.original_id = {
                    els: geByClass("radiobtn", "bt_merge_box_rows"),
                    val: t[0]
                }
            }
        })
    },
    updateSearch: function(e) {
        clearTimeout(cur.btSearchTimeout), cur.btSearchTimeout = setTimeout(BugTracker.doUpdateSearch.pbind(e), 300)
    },
    forceUpdateSearch: function(e, t) {
        clearTimeout(cur.btSearchTimeout), BugTracker.doUpdateSearch(t, !0)
    },
    addSearchFilter: function(e, t, r, o) {
        var a = null;
        "platform" == e ? a = cur.btSearchPlatformDD : "product" == e ? a = cur.btSearchProductDD : "platform_version" == e ? a = cur.btSearchPlatformVersionDD : "device" == e ? a = cur.btSearchDeviceDD : "version" == e ? a = cur.btSearchVersionDD : "tag" == e ? a = cur.btSearchTagsDD : "region" == e && (a = cur.btSearchRegionDD), a && (r && BugTracker.ddVisible(cur.btSearchProductDD) && cur.btSearchProductDD.val() != r && (cur.btPreventUpdateProduct = "product" != e, cur.btSearchProductDD.val(r, !0)), "product" != e && ("platform_version" != e && "device" != e || !BugTracker.ddVisible(cur.btSearchPlatformDD) || (cur.btPreventUpdatePlatform = !0, cur.btSearchPlatformDD.val(o, !0)), a.val(t, !0)))
    },
    ddVisible: function(e) {
        return isVisible(domPN(e.container))
    },
    updateSearchFilters: function(e, t) {
        var r = {
            0: "bugtracker"
        };
        nav.objLoc.act && (r.act = nav.objLoc.act), nav.objLoc.q && (r.q = nav.objLoc.q);
        var o = cur.btSearchProductDD.val(),
            a = cur.btSearchVersionDD.val(),
            n = cur.btSearchPlatformDD.val(),
            i = cur.btSearchPlatformVersionDD.val(),
            s = cur.btSearchStatusDD.val(),
            c = cur.btSearchSeverityDD.val(),
            d = cur.btSearchTagsDD.val(),
            u = cur.btSearchOriginalDD ? parseInt(cur.btSearchOriginalDD.val()) : 0,
            _ = cur.btSearchDeviceDD.val();
        BugTracker.ddVisible(cur.btSearchProductDD) && o > 0 && (r.product = o), a > 0 && BugTracker.ddVisible(cur.btSearchVersionDD) && (r.version = a), n > 0 && BugTracker.ddVisible(cur.btSearchPlatformDD) && (r.platform = n), i && BugTracker.ddVisible(cur.btSearchPlatformVersionDD) && (r.pversion = i), _ && BugTracker.ddVisible(cur.btSearchDeviceDD) && (r.device = _), s && (r.status = s), c && (r.severity = c), d && BugTracker.ddVisible(cur.btSearchTagsDD) && (r.tag = d), cur.btSearchRegionDD && cur.btSearchRegionDD.val() > 0 && BugTracker.ddVisible(cur.btSearchRegionDD) && (r.region = cur.btSearchRegionDD.val()), u > 0 && (r.original = u), isChecked("bt_sb_search_vulnerabilites") && (r.vulnerability = 1), isChecked("bt_sb_search_wishes") && (r.wishes = 1), isChecked("bt_sb_search_unrated") && (r.unrated = 1), ge("bt_sb_search_member") && nav.objLoc.mid && (r.mid = nav.objLoc.mid), BugTracker.loadSearch(r, e, t)
    },
    doUpdateSearch: function(e, t) {
        e = e.toLowerCase(), (e != nav.objLoc.q || t) && (e ? nav.objLoc.q = e : delete nav.objLoc.q, BugTracker.loadSearch(nav.objLoc))
    },
    loadSearch: function(e, t, r) {
        if (r) return uiSearch.showProgress("bt_search"), nav.go(e);
        nav.setLoc(e);
        var o = extend({}, e, {
            load: 1
        });
        t && cur.btMaxUDate && (o.min_udate = cur.btMaxUDate), delete o[0], ajax.post("bugtracker", o, {
            showProgress: uiSearch.showProgress.pbind("bt_search"),
            hideProgress: uiSearch.hideProgress.pbind("bt_search"),
            onDone: function(e, t) {
                removeClass("bt_reports", "bt_reports_reloading"), val("bt_page_content", e), BugTracker.checkSelectedReports(), cur.btMaxUDate = t
            }
        })
    },
    unsubscribe: function(e, t, r) {
        var o = +!hasClass(e, "bt_bugreport_unsubscribed");
        toggleClass(e, "button_light", !1), lockButton(e), ajax.post("bugtracker", {
            act: "a_unsubscribe",
            subscribed: o,
            bugreport_id: t,
            hash: r
        }, {
            onDone: function(t) {
                toggleClass(e, "bt_bugreport_unsubscribed", o), toggleClass(e, "bt_report_fav_checked", !o), toggleClass(e, "button_light", !0), unlockButton(e)
            },
            onFail: function() {
                toggleClass(e, "button_light", !0), unlockButton(e)
            }
        })
    },
    bookmark: function(e, t, r) {
        var o = hasClass(e, "bt_report_fav_checked") ? 0 : 1;
        toggleClass(e, "bt_report_fav_checked"), ajax.post("bugtracker", {
            act: "a_subscribe",
            v: o,
            id: t,
            hash: r
        }, {
            onDone: function(e) {
                e && (toggleClass("bt_report_sb_subscribe_btns", "bt_report_sb_subscribed"), val("bt_report_sb_nsubscribers", e))
            }
        })
    },
    cancelEdit: function() {
        var e = geByClass1("bt_comment_edit_form");
        if (e) {
            var t = e.getAttribute("data-id"),
                r = ge("cmt" + t),
                o = geByClass1("bt_report_cmt_text", r);
            re(e), setTimeout(function() {
                show(geByClass1("page_post_sized_thumbs", r)), show(geByClass1("post_thumbed_media", r)), show(o), show(geByClass1("bt_report_cmt_info", r)), toggleClass(r, "editing", !1)
            })
        }
    },
    saveComment: function(btn, hash) {
        var editForm = geByClass1("bt_comment_edit_form");
        if (editForm) {
            var cidRaw = editForm.getAttribute("data-id"),
                t = ge("bt_comment_edit_form_text"),
                m = trim(val(t)),
                attachs = [];
            return each(cur.btEditCommentMedia.getMedias(), function(e, t) {
                attachs.push(t[0] + "," + t[1])
            }), m || attachs.length ? void ajax.post("bugtracker", {
                act: "a_save_edited_comment",
                comment_id: cidRaw,
                hash: hash,
                message: m,
                attachs: attachs
            }, {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function(html, js) {
                    domReplaceEl(ge("bt_report_one_section"), se(html)), js && eval(js)
                }
            }) : notaBene(t)
        }
    },
    editComment: function(e, t, r, o, a) {
        BugTracker.cancelEdit();
        var n = ge("cmt" + e),
            i = geByClass1("bt_report_cmt_text", n),
            s = '<div class="bt_comment_edit_form" data-id="' + e + '">  <textarea class="text bt_comment_form_text" id="bt_comment_edit_form_text" onkeydown="onCtrlEnter(event, BugTracker.saveComment.bind(null, ge(\'bt_comment_edit_form_submit\'), \'' + t + '\'));" style="overflow: hidden; resize: none; height: 50px;">' + i.innerText + '</textarea>  <div id="bt_comment_edit_form_media_preview" class="clear_fix bt_comment_form_media_preview"></div>  <div id="bt_comment_edit_form_attach" class="bt_comment_form_attach clear_fix"><span class="add_media_lnk"></span></div>  <div>  <button type="button" class="flat_button fl_r" id="bt_comment_edit_form_submit" onclick="BugTracker.saveComment(this, \'' + t + "');\">" + getLang("global_save") + '</button>  <button type="button" class="flat_button button_light secondary fl_r" id="bt_comment_edit_form_cancel" onclick="BugTracker.cancelEdit()">' + getLang("global_cancel") + "</button>  </div>  </div>",
            c = sech(s)[0];
        i.parentNode.insertBefore(c, i), hide(i), hide(geByClass1("page_post_sized_thumbs", n)), hide(geByClass1("post_thumbed_media", n)), hide(geByClass1("bt_report_cmt_info", n)), toggleClass(n, "editing", !0), setTimeout(function() {
            autosizeSetup(geByClass1("bt_comment_form_text", n), {}), cur.btEditCommentMedia = MediaSelector(ge("bt_comment_edit_form_attach").firstChild, "bt_comment_edit_form_media_preview", cur.btCommentMediaTypes, {
                limit: 10,
                hideAfterCount: 10,
                editable: 1,
                sortable: 1,
                teWidth: 210,
                teHeight: 160,
                toId: a
            }), r.forEach(function(e) {
                cur.btEditCommentMedia.chooseMedia(e.type, e[0], e.data)
            })
        })
    },
    removeComment: function(e, t) {
        var r = ge("cmt" + e);
        r && ajax.post("bugtracker", {
            act: "remove_comment",
            id: e,
            hash: t
        }, {
            showProgress: addClass.pbind(r, "bt_report_cmt_processing"),
            hideProgress: removeClass.pbind(r, "bt_report_cmt_processing"),
            onDone: function(e) {
                addClass(r, "bt_report_cmt_removed"), r.appendChild(se(e))
            }
        })
    },
    restoreComment: function(e, t) {
        var r = ge("cmt" + e);
        r && ajax.post("bugtracker", {
            act: "restore_comment",
            id: e,
            hash: t
        }, {
            showProgress: addClass.pbind(r, "bt_report_cmt_processing"),
            hideProgress: removeClass.pbind(r, "bt_report_cmt_processing"),
            onDone: function() {
                re(geByClass1("_restore_msg", r)), removeClass(r, "bt_report_cmt_removed")
            }
        })
    },
    openChangeStatusBox: function(e, t) {
        curBox() || (cur.btChangeStatusBox = showBox("bugtracker", {
            act: "change_status_box",
            id: e,
            hash: t
        }))
    },
    removeReport: function(e, t) {
        var r = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_remove_report_confirm"), getLang("global_delete"), function() {
            r.hide(), ajax.post("bugtracker", {
                act: "a_remove_bugreport",
                id: e,
                hash: t
            }, {
                showProgress: cur.newBugBox ? cur.newBugBox.showProgress : null,
                hideProgress: cur.newBugBox ? cur.newBugBox.hideProgress : null
            })
        }, getLang("global_cancel"))
    },
    loadMore: function(e) {
        var t = {
            load: 1,
            max_udate: cur.btMaxUDate
        };
        cur.btMaxId && (t.max_id = cur.btMaxId), each(["act", "product", "device", "q", "mid", "vulnerability", "wishes", "unrated", "platform", "pversion", "status", "severity", "tag", "original"], function(e, r) {
            nav.objLoc.hasOwnProperty(r) && (t[r] = nav.objLoc[r])
        }), ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r) {
                cur.btMaxUDate = r, r || re(e);
                var o = sech(t),
                    a = ge("bt_reports");
                each(o, function(e, t) {
                    ge(t.id) || a.appendChild(t)
                }), BugTracker.checkSelectedReports()
            }
        })
    },
    initSelected: function() {
        cur.btSelected = {
            count: 0,
            reports: {}
        }
    },
    selectAllRows: function(e) {
        checkbox(e);
        var t = isChecked(e);
        each(geByClass("_sel_checkbox", "bt_reports"), function(e, r) {
            if (t != isChecked(r)) {
                var o = gpeByClass("bt_report_row", r),
                    a = o.id.replace("bugreport", "");
                checkbox(r, t), BugTracker.storeSelection(a, t)
            }
        }), BugTracker.updateSelectedCount()
    },
    storeSelection: function(e, t) {
        t ? cur.btSelected.reports[e] || (cur.btSelected.reports[e] = 1, cur.btSelected.count++) : cur.btSelected.reports[e] && (delete cur.btSelected.reports[e], cur.btSelected.count--)
    },
    selectReportRow: function(e, t) {
        checkbox(e), BugTracker.storeSelection(t, isChecked(e)), BugTracker.updateSelectedCount()
    },
    updateSelectedCount: function() {
        var e = ge("bt_search_selected");
        !isVisible(e) && cur.btSelected.count > 0 ? slideDown(e, 200) : isVisible(e) && !cur.btSelected.count && slideUp(e, 100), val(geByClass1("_count", "bt_search_selected_count"), getLang("bugs_t_X_reports_selected", cur.btSelected.count))
    },
    diselectAllReports: function() {
        BugTracker.initSelected();
        var e = ge("bt_reports"),
            t = ge("bt_search_selected");
        e && each(geByClass("_sel_checkbox", e), function(e, t) {
            checkbox(t, !1)
        }), t && isVisible(t) && slideUp(t, 100)
    },
    checkSelectedReports: function() {
        var e = ge("bt_reports");
        e && cur.btSelected && cur.btSelected.reports && each(e.children, function(e, t) {
            var r = t.id.replace("bugreport", ""),
                o = geByClass1("_sel_checkbox", t);
            checkbox(o, 1 == cur.btSelected.reports[r])
        })
    },
    getSelectedReportIds: function() {
        var e = [];
        return cur.btSelected && each(cur.btSelected.reports, function(t, r) {
            e.push(t)
        }), e
    },
    openMergeBox: function(e) {
        cur.btMergeBox = showBox("bugtracker", {
            act: "merge_box",
            ids: BugTracker.getSelectedReportIds()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.btMergeBox.show()
            },
            params: {
                width: 550
            }
        })
    },
    merge: function(e) {
        var t = {
            act: "a_merge",
            ids: BugTracker.getSelectedReportIds(),
            to_id: radioval("original_id")
        };
        cur.btMergeBoxStatusDD && (t.status = cur.btMergeBoxStatusDD.val()), cur.btMergeBoxSeverityDD && (t.severity = cur.btMergeBoxSeverityDD.val()), ge("bt_merge_box_comment") && (t.comment = val("bt_merge_box_comment")), ge("bt_merge_box_vulnerability") && (t.set_vulnerability = radioval("set_vulnerability")), ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                cur.btMergeBox && cur.btMergeBox.hide(), cur.btBindToBox && cur.btBindToBox.hide(), BugTracker.diselectAllReports(), addClass("bt_reports", "bt_reports_reloading"), BugTracker.updateSearchFilters(!0), showDoneBox(e)
            }
        })
    },
    unbind: function(e, t, r) {
        ajax.post("bugtracker", {
            act: "unbind",
            id: t,
            hash: r
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    makeOriginal: function(e, t, r) {
        addClass("bt_reports", "bt_reports_reloading"), ajax.post("bugtracker", {
            act: "make_original",
            id: t,
            hash: r
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    checkReportsSelected: function(e, t, r, o) {
        var a = cur.btSelected ? cur.btSelected.count : 0;
        if (a) {
            ge("bt_tab_all") && uiTabs.switchTab(geByClass1("ui_tab", "bt_tab_all"), {
                noAnim: 1
            });
            var n = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_confirm_leave_selected_reports"), getLang("global_continue"), function() {
                n.hide(), BugTracker.diselectAllReports(), nav.go(r)
            }, getLang("global_cancel"));
            return !1
        }
    },
    openBindToBox: function(e) {
        cur.btBindToBox = showBox("bugtracker", {
            act: "bind_box",
            ids: BugTracker.getSelectedReportIds()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.btBindToBox.show()
            },
            params: {
                width: 550
            }
        })
    },
    loadMoreUpdates: function(e) {
        ajax.post("bugtracker", {
            act: "updates",
            load: 1,
            max_time: cur.btMaxTime,
            bookmarks: nav.objLoc.bookmarks ? 1 : null
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r) {
                cur.btMaxTime = r, cur.btMaxTime || hide(e);
                var o = sech(t),
                    a = ge("bt_updates");
                each(o, function(e, t) {
                    ge(t.id) || a.appendChild(t)
                })
            }
        })
    },
    loadMoreReportersIfNeeded: function() {
        var e = !1;
        return function() {
            if (!e && isVisible("load_more_reporters_btn")) {
                e = !0;
                var t = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                    r = scrollGetY(),
                    o = ge("load_more_reporters_btn");
                r + t + 1e3 > o.offsetTop ? BugTracker.loadMoreReporters(o, function() {
                    e = !1
                }) : e = !1
            }
        }
    },
    membersSearchChanged: function(e) {
        function t(t) {
            ajax.post("bugtracker?act=a_members_search", {
                text: t,
                product: cur.btProduct,
                hash: e
            }, {
                onDone: function(e) {
                    val("bt_reporters_search_results_content", ""), BugTracker.appendReporters(e, !1, !1, "bt_reporters_search_results_content") ? show("bt_reporters_search_results") : hide("bt_reporters_search_results")
                }
            })
        }
        var r = 0;
        return function(e) {
            e ? (geByClass("bt_reporter_row").forEach(hide), cur.btMembers.filter(function(t) {
                return t.name.toLowerCase().indexOf(e.toLowerCase()) >= 0
            }).forEach(function(e) {
                show("bt_reporter_row" + e.uid)
            }), hide("load_more_reporters_btn"), hide("bt_reporters_search_results"), clearTimeout(r), r = setTimeout(t.bind(null, e), 1600)) : (geByClass("bt_reporter_row").forEach(show), show("load_more_reporters_btn"), hide("bt_reporters_search_results"))
        }
    },
    loadMoreReporters: function(e, t) {
        ajax.post("bugtracker", {
            act: "reporters",
            load: 1,
            pos: cur.btPos,
            prev_rate: cur.btPrevRate,
            offset: cur.btOffset,
            sort: cur.btOrderBy,
            product: cur.btProduct
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(r, o, a, n) {
                cur.btOffset = o, cur.btPrevRate = n, cur.btPos = a, cur.btOffset || hide(e), Array.prototype.push.apply(cur.btMembers, r), BugTracker.appendReporters(r, !0, !1), t && t()
            },
            onFail: t
        })
    },
    templateSelector: function(e, t) {
        switch (e) {
            case 4:
                return getTemplate("btMemberInviteRowTemplate", t);
            case 3:
                return getTemplate("btMemberInvitedRowTemplate", t);
            case 2:
                return getTemplate("btMemberRequestRowTemplate", t);
            default:
                return getTemplate(t.shown_pos ? "btMemberRowTemplatePos" : "btMemberRowTemplateNoPos", t)
        }
    },
    appendReporters: function(e, t, r, o, a) {
        var n = e.map(BugTracker.templateSelector.bind(null, a)).join(),
            i = 0,
            s = sech(n),
            c = ge(o || "bt_reporters"),
            d = null;
        return each(s, function(e, o) {
            var a = ge(o.id);
            if (a) {
                if (!t) return void(d = a);
                re(a)
            }
            r && d && d.nextSibling ? c.insertBefore(o, d.nextSibling) : c.appendChild(o), d = o, i++
        }), i
    },
    markUpdatesRead: function() {
        setTimeout(function() {
            ajax.post("bugtracker", {
                act: "updates_clear"
            }, {});
            var e = ge("bt_updates"),
                t = function() {
                    var r = geByClass1("bt_report_cmt_new", e);
                    if (removeClass(r, "bt_report_cmt_new"), r) setTimeout(t, 500);
                    else {
                        var o = geByClass1("ui_tab_count", "bt_tab_updates");
                        setTimeout(val.pbind(o, ""), 2e3)
                    }
                };
            t()
        }, 500)
    },
    toggleSetRate: function() {
        var e = ge("bt_report_set_rate_form");
        isVisible(e) ? slideUp(e, 200) : slideDown(e, 200, function() {
            elfocus("bt_report_set_rate_form__rate"), autosizeSetup("bt_report_set_rate_form__note", {})
        })
    },
    "export": function(e, t, r) {
        var o = ge("bt_report_export");
        ajax.post("bugtracker", {
            act: "a_export",
            id: e,
            project_id: t,
            hash: r
        }, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: window.open
        })
    },
    saveRate: function() {
        var e = ge("bt_report_set_rate_form__btn");
        ajax.post("bugtracker", {
            act: "a_save_rate",
            id: cur.btReportId,
            hash: cur.btReportRateHash,
            rate: val("bt_report_set_rate_form__rate"),
            note: val("bt_report_set_rate_form__note")
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    setDropdownData: function(e, t) {
        var r = t || [];
        e && (e.setData(r), e.currenDataItems = r, e.select.content(r))
    },
    toggleBanAdd: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_toggle_ban_add",
            id: t,
            hash: r,
            v: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggle("bt_reporter_ban_add", !o), toggle("bt_reporter_unban_add", o)
            }
        })
    },
    toggleBanComment: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_toggle_ban_comment",
            id: t,
            hash: r,
            v: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggle("bt_reporter_ban_comment", !o), toggle("bt_reporter_unban_comment", o)
            }
        })
    },
    openEditProductBox: function(e, t) {
        cur.editProductBox = showBox("bugtracker", {
            act: "edit_product_box",
            id: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.editProductBox.show()
            },
            params: {
                width: 700
            }
        })
    },
    saveProduct: function() {
        var e = ge("bt_edit_product__title"),
            t = {
                act: "a_save_product",
                id: cur.btProductId,
                hash: cur.btProductHash,
                title: trim(val(e)),
                title_short: trim(val("bt_edit_product__title_short")),
                descr: trim(val("bt_edit_product__descr")),
                gid: val("bt_edit_product__gid"),
                type: cur.editProductTypeDD.val(),
                level: cur.editProductLevelDD.val(),
                nda: isChecked("bt_edit_product__nda") ? 1 : 0,
                platforms: [],
                requirements: trim(val("bt_edit_product__requirements")),
                tags: cur.editProductTagsDD.val(),
                distr_type: radioval("distr_type")
            },
            r = ge("bt_edit_product__btn"),
            o = !1,
            a = ge("bt_edit_product__version_title"),
            n = ge("bt_edit_product__release_notes");
        isVisible("bt_edit_product__version") && (t.version_title = trim(val(a)), t.release_notes = trim(val(n)), "" === t.version_title && (notaBene(a), o = !0)), t.tags.length || (notaBene(cur.editProductTagsDD.container), o = !0), cur.btProductTypesPlatformsRequired[t.type] && (each(geByClass("checkbox", "bt_edit_product_platforms_block"), function(e, r) {
            isVisible(r) && isChecked(r) && t.platforms.push(attr(r, "platform-id"))
        }), t.platforms.length || (notaBene("bt_edit_product_platforms_block"), o = !0)), "" == t.title && (notaBene(e), o = !0), o || ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r),
            onDone: function() {
                cur.editProductBox.hide()
            }
        })
    },
    editVersion: function(e, t, r) {
        cur.btVersionId = t, cur.btProductId = r, cur.editVersionBox = showBox("bugtracker", {
            act: "edit_version",
            id: t,
            product_id: r
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.editVersionBox.show()
            },
            params: {
                width: 570
            }
        })
    },
    saveVersion: function() {
        var e = ge("bt_edit_version__title"),
            t = {
                act: "a_save_version",
                id: cur.btVersionId,
                hash: cur.btVersionHash,
                product_id: cur.btProductId,
                title: trim(val(e)),
                release_notes: trim(val("bt_edit_version__release_notes")),
                visible: isChecked("bt_edit_version__visible") ? 1 : 0
            },
            r = ge("bt_edit_version__btn");
        return "" == t.title ? notaBene(e) : void ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r),
            onDone: function() {
                cur.editVersionBox.hide()
            }
        })
    },
    removeVersion: function(e, t) {
        ajax.post("bugtracker", {
            act: "a_remove_version",
            id: e,
            hash: t
        }, {
            onDone: function(t, r) {
                cur.editVersionBox.hide(), showDoneBox(t), re("bt_prod_version" + e), "" == val("bt_prod_block bt_prod_block_versions") && val("bt_prod_block bt_prod_block_versions", r)
            }
        })
    },
    joinProduct: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_join_product",
            id: t,
            reload: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r) {
                if (r) {
                    var o = se(t);
                    domReplaceEl(ge(o.id), o)
                } else domReplaceEl(e, t)
            }
        })
    },
    leaveProduct: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_leave_product",
            id: t,
            reload: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                var t = se(e);
                domReplaceEl(ge(t.id), t)
            }
        })
    },
    giveLicence: function(e, t, r, o, a) {
        ajax.post("bugtracker", {
            act: "a_give_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                if (a) hide("bt_reporter_buttons" + r), hide("bt_reporter_revoked" + r), show("bt_reporter_accepted" + r), show("bt_reporter_revoke" + r);
                else {
                    var t = se(e);
                    domReplaceEl(ge(t.id), t)
                }
            }
        })
    },
    restoreMember: function(e, t, r, o) {
        toggleClass("bt_reporter_row" + r, "excluding", !0), ajax.post("bugtracker", {
            act: "a_give_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggleClass("bt_reporter_row" + r, "excluded", !1), toggleClass("bt_reporter_row" + r, "excluding", !1)
            },
            onFail: function() {
                toggleClass("bt_reporter_row" + r, "excluding", !1)
            }
        })
    },
    deleteLicence: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_delete_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                var t = se(e);
                domReplaceEl(ge(t.id), t)
            }
        })
    },
    excludeMember: function(e, t, r, o) {
        toggleClass("bt_reporter_row" + r, "excluding", !0), ajax.post("bugtracker", {
            act: "a_revoke_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggleClass("bt_reporter_row" + r, "excluded", !0), toggleClass("bt_reporter_row" + r, "excluding", !1)
            },
            onFail: function() {
                toggleClass("bt_reporter_row" + r, "excluding", !1)
            }
        })
    },
    revokeLicence: function(e, t, r, o, a) {
        ajax.post("bugtracker", {
            act: "a_revoke_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                if (a) hide("bt_reporter_buttons" + r), hide("bt_reporter_revoke" + r), show("bt_reporter_revoked" + r);
                else {
                    var t = se(e);
                    domReplaceEl(ge(t.id), t)
                }
            }
        })
    },
    requestLicence: function(e, t, r, o) {
        hide(e.parentNode), show("bt_reporter_buttons" + r), ajax.post("bugtracker", {
            act: "a_redo_request_licence",
            product_id: t,
            uid: r,
            hash: o
        }, {
            showProgress: lockButton.pbind("bt_reporter_buttons" + r),
            hideProgress: unlockButton.pbind("bt_reporter_buttons" + r),
            onFail: function() {
                show(e.parentNode), hide("bt_reporter_buttons" + r)
            }
        })
    },
    setLicenceAccess: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "a_set_licence_access",
            product_id: t,
            uid: r,
            access: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                var t = se(e);
                domReplaceEl(ge(t.id), t)
            }
        })
    },
    searchLicence: function(e, t, r) {
        var o = uiSearch.getWrapEl(e);
        uiSearch.showProgress(o);
        var a = nav.objLoc;
        "" != t ? a.q = t : delete a.q, nav.go(a)
    },
    searchMemship: function(e, t, r) {
        var o = nav.objLoc;
        t ? o.q = t : o.q && delete o.q, nav.go(o), uiSearch.showProgress(e)
    },
    memshipAcceptSelf: function(e, t) {
        ajax.post("bugtracker", {
            act: "a_memship_accept_self",
            hash: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: slideUp.pbind("bt_memship_invitation_block", 300)
        })
    },
    memshipDecline: function(e, t) {
        ajax.post("bugtracker", {
            act: "a_memship_decline",
            hash: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: slideUp.pbind("bt_memship_invitation_block", 300)
        })
    },
    deleteLicenceRequest: function(e, t, r) {
        var o = ge("bt_product_" + e);
        ajax.post("bugtracker", {
            act: "a_delete_licence_request",
            id: e,
            hash: t,
            reload: r
        }, {
            showProgress: addClass.pbind(o, "bt_product_row_locked"),
            hideProgress: removeClass.pbind(o, "bt_product_row_locked"),
            onDone: function(e) {
                var t = se(e);
                domReplaceEl(ge(t.id), t)
            }
        })
    },
    reportVersionTT: function(e, t) {
        showTooltip(e, {
            text: t,
            dir: "bottom",
            center: 1,
            typeClass: "tt_black",
            appendEl: ge("bt_product_versions")
        })
    },
    filterReporters: function() {
        var e = {
            0: "bugtracker",
            act: "reporters"
        };
        if (cur.btFilterProductDD) {
            var t = cur.btFilterProductDD.val();
            if (t && (e.product = t), cur.btProductsManage[t]) {
                var r = radioval("sort");
                "" != r && (e.sort = r)
            }
        }
        nav.go(e)
    },
    clearCart: function(e) {
        cur.btClearCartCallback && cur.btClearCartCallback(), slideUp("bt_shop_cart_info", 300), ajax.post("bugtracker", {
            act: "a_clear_cart",
            reload: e
        }, {})
    },
    setDelivery: function(e, t) {
        radiobtn(e, t, "delivery"), hasClass(e, "disabled") || (each(geByClass("_descr", "bt_order_form_delivery_descr"), function(e, t) {
            hide(t)
        }), show("bt_order_form_delivery_descr" + t), toggle("bt_order_form_address_block", 2 == t), 2 == t && autosizeSetup(ge("bt_order_form__address"), {}), show("bt_order_form_note_block"), autosizeSetup(ge("bt_order_form__note"), {}), ls.set("bt_order_delivery", t))
    },
    createOrder: function(e, t) {
        var r = {
                act: "a_create_order",
                hash: t,
                delivery: radioval("delivery"),
                phone: trim(val("bt_order_form__phone")),
                note: trim(val("bt_order_form__note"))
            },
            o = !1;
        r.phone || (notaBene("bt_order_form__phone"), o = !0), 2 == r.delivery && (r = extend(r, {
            person: trim(val("bt_order_form__person")),
            address: trim(val("bt_order_form__address"))
        }), r.address.length < 10 && (notaBene("bt_order_form__address"), o = !0), r.person.length < 4 && (notaBene("bt_order_form__person"), o = !0)), o || ajax.post("bugtracker", r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                ls.remove("bt_order_delivery"), ls.remove("bt_order_person"), ls.remove("bt_order_address"), ls.remove("bt_order_note"), nav.go("bugtracker?act=order&id=" + e + "&m=1")
            }
        })
    },
    cancelOrder: function(e, t, r) {
        cur.btCancelBox = showFastBox(getLang("global_warning"), getLang("bugs_t_cancel_order_confirm"), getLang("bugs_t_cancel_order"), function() {
            ajax.post("bugtracker", {
                act: "a_cancel_order",
                id: e,
                hash: t,
                reload: r
            }, {
                progress: cur.btCancelBox.progress
            })
        }, getLang("bugs_t_dont_cancel_order"))
    },
    editOrder: function(e) {
        cur.btEditOrderBox = showBox("bugtracker", {
            act: "edit_order",
            id: e
        }, {})
    },
    saveOrder: function(e, t) {
        var r = {
            act: "a_save_order",
            id: e,
            hash: t,
            status: radioval("status"),
            adm_note: val("bt_order_form__adm_note")
        };
        ajax.post("bugtracker", r, {
            progress: cur.btEditOrderBox.progress
        })
    },
    restoreReport: function(e, t) {
        ajax.post("bugtracker", {
            act: "a_restore_bugreport",
            id: e,
            hash: t
        }, {})
    },
    saveSettings: function(e, t) {
        var r = {
                act: "a_save_settings",
                hash: t,
                login_tf: val("bt_settings__login_tf"),
                login_ha: val("bt_settings__login_ha"),
                platforms: []
            },
            o = !0;
        "" != r.login_tf && -1 == r.login_tf.indexOf("@") && (notaBene("bt_settings__login_tf"), o = !1), "" != r.login_ha && -1 == r.login_ha.indexOf("@") && (notaBene("bt_settings__login_ha"), o = !1), o && (each(geByClass("on", "bt_settings_platforms"), function(e, t) {
            r.platforms.push(attr(t, "platform-id"))
        }), ajax.post("bugtracker", r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                showDoneBox(e), hide("bt_settings_error")
            },
            onFail: function(e) {
                return show("bt_settings_error"), val("bt_settings_error", e), !0
            }
        }))
    },
    updateReportVersion: function(e, t, r, o) {
        slideUp("bt_report_one_new_version", 400), ajax.post("bugtracker", {
            act: "a_update_report_version",
            id: t,
            hash: r,
            actual: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    showMemshipDetails: function(e, t, r, o, a) {
        var n = ge("bt_member_" + t);
        if (n) {
            var i = geByClass1("_details", n);
            if (i) {
                if (!hasClass(e, "_details_unloaded")) return void slideToggle(i, 300);
                show(i), ajax.post("bugtracker", {
                    act: "a_member_details",
                    uid: t,
                    product_id: r,
                    hash: o,
                    by_product: a
                }, {
                    showProgress: addClass.pbind(n, "bt_member_loading"),
                    hideProgress: removeClass.pbind(n, "bt_member_loading"),
                    onDone: function(t) {
                        val(i, t), removeClass(e, "_details_unloaded")
                    }
                })
            }
        }
    },
    membersLoadDetails: function() {
        var e = geByClass("_details_unloaded", "bt_members").slice(0, 50);
        each(e, function(e, t) {
            t.onclick.apply(t)
        })
    },
    loadMoreMembers: function(e, t) {
        var r = {
            act: nav.objLoc.act,
            product: nav.objLoc.product,
            offset: t,
            load: 1
        };
        ajax.post("bugtracker", r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t) {
                re(e);
                var r = ge("bt_members");
                each(sech(t), function(e, t) {
                    t.id && ge(t.id) || r.appendChild(t)
                })
            }
        })
    },
    switchCommentTone: function(e, t, r) {
        var o = (ge("post_field"), cur.options.additional_save_params.wall_message_prefix);
        val("bt_fb_tone_text", e.innerHTML);
        for (var a = ["negative_", "neutral_", "positive_"], n = 0; n < a.length; n++) o = o.replace("#" + a[n] + r, "");
        var i = a[t + 1] + r,
            s = o.indexOf("@" + r) + r.length + 2;
        " " !== o[s] && (i += " "), o = o.substr(0, s) + "#" + i + o.substr(s),
            cur.options.additional_save_params.wall_message_prefix = o
    },
    switchComments: function(e, t) {
        nav.objLoc.tone = t, nav.go(nav.objLoc), showProgress(ge("tone_filter_selector").parentNode), hide(ge("tone_filter_selector"))
    },
    initInvitesSearch: function(e) {
        function t(r, o) {
            if (Object.getPrototypeOf(this) !== t.prototype) throw new TypeError('Invites should be called via "new"');
            var a = e.initialMembersCount,
                n = 0,
                i = !1;
            this.search = function() {
                n = 0, this.loadMoreResults(!0)
            }, this.loadMoreResults = function(t) {
                if (!i) {
                    i = !0;
                    var s = val("bt_invites_search_" + e.randomId);
                    ajax.post("bugtracker?act=a_product_members_search", extend(this.filter, {
                        text: s,
                        product: o,
                        hash: r,
                        relation: e.relation,
                        offset: n || 0
                    }), {
                        onDone: function(r, o) {
                            i = !1, a = o, this.appendReporters(t, s, r), t && 3 == e.relation && setTimeout(this.selectForInviteChanged.bind(this), 0)
                        }.bind(this),
                        onFail: function() {
                            i = !1
                        }
                    })
                }
            }, this.appendReporters = function(t, r, o) {
                if (i = !1, r === val("bt_invites_search_" + e.randomId)) {
                    var a = ge("bugtracker_invites_list_" + e.randomId);
                    t && each(geByClass("bt_reporter_row", a), function(e, t) {
                        var r = o.findIndex(function(e) {
                            return e.uid == attr(t, "data-id")
                        }); - 1 === r && re(t)
                    });
                    var s = BugTracker.appendReporters(o, !1, !0, a, e.relation);
                    0 === s && (i = t), n += s
                }
            }, this.getLastSearchResultsCount = function() {
                return a
            }
        }
        t.prototype = {
            filter: {},
            getAgeToData: function() {},
            getAgeFromData: function() {},
            filterChanged: function() {
                this.filter.city = this.cityFilter.val_full()[0], this.filter.nda = this.ndaFilter && this.ndaFilter.val_full()[0], this.filter.activity = this.activityFilter && this.activityFilter.val_full()[0], this.filter.soc = isChecked("invites_filter_soc_" + e.randomId), isChecked("invites_filter_tf0_" + e.randomId) ? this.filter.tf = 1 : isChecked("invites_filter_tf1_" + e.randomId) ? this.filter.tf = 2 : this.filter.tf = 0, isChecked("invites_filter_ha0_" + e.randomId) ? this.filter.ha = 1 : isChecked("invites_filter_ha1_" + e.randomId) ? this.filter.ha = 2 : this.filter.ha = 0, this.filter.agents = isChecked("invites_filter_agents_" + e.randomId), this.filter.notagents = isChecked("invites_filter_notagents_" + e.randomId), this.filter.ios = isChecked("invites_filter_ios_" + e.randomId), this.filter.droid = isChecked("invites_filter_droid_" + e.randomId), this.updateFilters(), this.search()
            },
            clearFilter: function() {
                this.filter = {}, this.updateFilters(), this.search()
            },
            removeFilter: function(t) {
                switch (this.filter[t] = null, t) {
                    case "city":
                        this.cityFilter.val("0");
                        break;
                    case "nda":
                        this.ndaFilter.val("0");
                        break;
                    case "activity":
                        this.activityFilter.val("0");
                        break;
                    case "soc":
                        checkbox("invites_filter_soc_" + e.randomId, !1);
                        break;
                    case "tf0":
                        checkbox("invites_filter_tf0_" + e.randomId, !1);
                        break;
                    case "ha0":
                        checkbox("invites_filter_ha0_" + e.randomId, !1);
                        break;
                    case "tf1":
                        checkbox("invites_filter_tf1_" + e.randomId, !1);
                        break;
                    case "ha1":
                        checkbox("invites_filter_ha1_" + e.randomId, !1);
                        break;
                    case "agents":
                        checkbox("invites_filter_agents_" + e.randomId, !1);
                        break;
                    case "notagents":
                        checkbox("invites_filter_notagents_" + e.randomId, !1);
                        break;
                    case "ios":
                        checkbox("invites_filter_ios_" + e.randomId, !1);
                        break;
                    case "droid":
                        checkbox("invites_filter_droid_" + e.randomId, !1)
                }
                this.updateFilters(), this.search()
            },
            updateFilters: function() {
                var t = ge("invites_cur_filters_" + e.randomId),
                    r = !1;
                if (this.filter)
                    for (var o in this.filter) {
                        var a = this.filter[o],
                            n = "",
                            i = !1,
                            s = !1,
                            c = ge("invites_filters_token_" + o + "_" + e.randomId);
                        if (a) {
                            switch (o) {
                                case "city":
                                    if (0 == this.cityFilter.val_full()[0]) {
                                        re(c);
                                        continue
                                    }
                                    n = this.cityFilter.val_full()[1];
                                    break;
                                case "nda":
                                    if (0 == this.ndaFilter.val_full()[0]) {
                                        re(c);
                                        continue
                                    }
                                    n = this.ndaFilter.val_full()[1];
                                    break;
                                case "activity":
                                    if (0 == this.activityFilter.val_full()[0]) {
                                        re(c);
                                        continue
                                    }
                                    n = this.activityFilter.val_full()[1];
                                    break;
                                default:
                                    var d = ge("invites_filter_" + o + "_" + e.randomId);
                                    if (!d) continue;
                                    n = ge("invites_filter_" + o + "_" + e.randomId).textContent
                            }
                            r = !0, n = stripHTML(n);
                            var u = '<span class="label">' + n + '</span><span class="del_icon"></span>';
                            if (c) c.innerHTML = u;
                            else {
                                var d = ce("div", {
                                    id: "invites_filters_token_" + o + "_" + e.randomId,
                                    className: "token",
                                    innerHTML: u,
                                    onclick: this.removeFilter.bind(this, o)
                                });
                                i && ge("invites_filters_token_" + i) ? domInsertBefore(d, ge("invites_filters_token_" + i)) : s && ge("invites_filters_token_" + s) ? domInsertAfter(d, ge("invites_filters_token_" + s)) : t.appendChild(d)
                            }
                        } else c && re(c)
                    }
                r ? show(t) : (hide(t), t.innerHTML = "")
            },
            selectForInviteChanged: function() {
                var t = [].map.call(geByClass("bt_reporter_row olist_item_wrap_on"), function(e) {
                    return attr(e, "data-id")
                });
                toggleClass("invite_members_button_" + e.randomId, "button_disabled", 0 === t.length), val("invite_members_button_" + e.randomId, getLang("bugs_invite_X_members", t.length || ""))
            },
            inviteSelectedMembers: function() {
                var t = [].map.call(geByClass("bt_reporter_row olist_item_wrap_on"), function(e) {
                    return attr(e, "data-id")
                });
                each(geByClass("bt_reporter_row olist_item_wrap_on"), function(e, t) {
                    toggleClass(t, "bt_already_invited", !0)
                }), ajax.post("bugtracker?act=a_product_invite_many", {
                    product: e.productId,
                    hash: e.inviteHash,
                    randomId: e.randomId,
                    uids: t.join(",")
                }), toggleClass("invite_members_button_" + e.randomId, "button_disabled", !0), val("invite_members_button_" + e.randomId, getLang("bugs_invite_X_members", ""))
            },
            selectAllForInvite: function() {
                each(geByClass("bt_member_for_invite"), function(e, t) {
                    toggleClass(t, "olist_item_wrap_on", !0)
                }), this.selectForInviteChanged()
            },
            acceptAllFound: function(t) {
                each(geByClass("bt_reporter_request_row"), function(e, t) {
                    hide("bt_reporter_buttons" + attr(t, "data-id")), show("bt_reporter_accepted" + attr(t, "data-id"))
                });
                var r = val("bt_invites_search_" + e.randomId);
                ajax.post("bugtracker?act=a_product_requests_accept_found", extend(this.filter, {
                    text: r,
                    product: e.productId,
                    hash: t
                }))
            },
            revokeAllInvites: function(t) {
                each(geByClass("bt_reporter_invite_row"), function(e, t) {
                    hide("bt_reporter_revoke" + attr(t, "data-id")), show("bt_reporter_revoked" + attr(t, "data-id"))
                });
                var r = val("bt_invites_search_" + e.randomId);
                ajax.post("bugtracker?act=a_product_invites_revoke_found", extend(this.filter, {
                    text: r,
                    product: e.productId,
                    hash: t
                }))
            },
            exportFoundMembers: function() {
                var t = val("bt_invites_search_" + e.randomId);
                nav.go("bugtracker?act=a_product_export_members", null, {
                    params: extend(this.filter, {
                        text: t,
                        product: e.productId,
                        relation: e.relation
                    })
                })
            },
            notifyFound: function(t) {
                var r = {
                        grey: !0,
                        width: "550px",
                        title: getLang("bugs_t_notify_found"),
                        bodyStyle: "padding:20px 25px 15px"
                    },
                    o = new MessageBox(r);
                o.content('<textarea class="text dark bugtracker_members_notify_text" id="bugtracker_members_notify_text" placeholder="' + getLang("bugs_notify_write_message_placeholder").replace('"', "&quot;") + '"></textarea>'), o.addButton(getLang("box_send"), function(r) {
                    var o = val("bt_invites_search_" + e.randomId);
                    ajax.post("bugtracker?act=a_product_members_notify_found", extend(this.filter, {
                        text: o,
                        product: e.productId,
                        relation: e.relation,
                        message: val("bugtracker_members_notify_text"),
                        hash: t
                    }), {
                        showProgress: lockButton.pbind(r),
                        hideProgress: unlockButton.pbind(r),
                        onDone: function() {
                            curBox().hide()
                        }
                    })
                }), o.setControlsText(getLang("bugs_t_notify_recipients_count", this.getLastSearchResultsCount())), o.show(), autosizeSetup("bugtracker_members_notify_text", {})
            }
        };
        var r = new t(e.searchHash, e.productId);
        stManager.add(["ui_controls.js", "ui_controls.css"], function() {
            r.cityFilter = new Dropdown(ge("invites_fltr_city_" + e.randomId), e.cities, {
                big: 1,
                onChange: r.filterChanged.bind(r)
            })
        });
        var o = ge("invites_fltr_nda_" + e.randomId);
        o && (r.ndaFilter = new Dropdown(o, cur.btNdaFilterOptions, {
            big: 1,
            onChange: r.filterChanged.bind(r)
        }));
        var a = ge("invites_fltr_activity_" + e.randomId);
        return a && (r.activityFilter = new Dropdown(a, cur.btActivityFilterOptions, {
            big: 1,
            onChange: r.filterChanged.bind(r)
        })), BugTracker.invitesSearch[e.randomId] = r, r
    },
    invitesSearch: {},
    delayedInvitesSearch: function() {
        var e = {};
        return function(t) {
            e[t] && clearTimeout(e[t]);
            var r = val("bt_invites_search_" + t).toLowerCase();
            each(ge("bugtracker_invites_list_" + t).childNodes, function(e, t) {
                toggle(t, t.innerText.toLowerCase().indexOf(r) + 1)
            }), BugTracker.invitesSearch[t] && (e[t] = setTimeout(BugTracker.invitesSearch[t].search.bind(BugTracker.invitesSearch[t]), 1600))
        }
    }(),
    pairedCheckbox: function(e, t) {
        checkbox(e), isChecked && checkbox(t, !1)
    },
    openMoveToProductBox: function(e, t, r) {
        cur.moveToProductBox = showBox("bugtracker?act=move_bugreport_to_product_box", {
            id: e
        })
    },
    loadProductVersionsDropdown: function(e, t, r) {
        var o = ge("bt_move_to_product__save");
        ajax.post("bugtracker?act=a_get_product_versions", {
            id: e,
            ts: t
        }, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: function(e, t) {
                var o = ce("input", {
                    type: "text"
                });
                val(o, t), console.log(t), val(r, ""), r.appendChild(o), cur.btVersionDD && cur.btVersionDD.destroy && cur.btVersionDD.destroy(), cur.btVersionDD = new Dropdown(o, e, {
                    big: 1,
                    width: 400,
                    autocomplete: !1
                }), show(r), notaBene(cur.btVersionDD.container, "notice")
            }
        })
    },
    moveToProduct: function() {
        var e = ge("bt_move_to_product__save"),
            t = {
                bugreport_id: cur.bugreportId,
                product_id: cur.btProductDD.val(),
                version_id: cur.btVersionDD ? cur.btVersionDD.val() : 0,
                hash: cur.btMoveToProductHash
            };
        return 0 == t.product_id ? notaBene(cur.btProductDD.container) : 0 == t.version_id ? notaBene(cur.btVersionDD.container) : void ajax.post("bugtracker?act=a_move_bugreport_to_product", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                cur.moveToProductBox.hide()
            }
        })
    },
    _eof: 1
};
try {
    stManager.done("bugtracker.js")
} catch (e) {}