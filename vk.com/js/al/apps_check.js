var AppsCheck = {
    init: function() {
        extend(cur, {
            aTabs: ge("apps_tabs"),
            aSubTabs: ge("apps_subtabs")
        }), uiTabs.hideProgress(cur.aTabs), uiTabs.hideProgress(cur.aSubTabs), "reports" != cur.section && val("tab_counter_" + cur.section, cur.totalCount && cur.totalCount < 100 ? cur.totalCount : ""), cur.nav.push(function(e, o, t) {
            return void 0 === e[0] && e.act ? (this.switchSection(t.act), !1) : void 0
        }.bind(this)), "comments" == cur.section && (each(geByTag("textarea", ge("apps_check_content")), function() {
            placeholderSetup(this, {
                back: !0
            })
        }), removeEvent(document, "click", this.hideEditPostReply), addEvent(document, "click", this.hideEditPostReply))
    },
    switchNavTab: function(e, o, t) {
        if (e != cur.section) {
            var n = ge("nav_tab_" + e);
            if (n) {
                var a = geByClass("app_tab_selected", ge("apps_nav_tabs"));
                for (var c in a) a[c].className = "app_tab";
                n.className = "app_tab_selected"
            }
            return show("apps_check_progress"), nav.change({
                act: e
            }), !1
        }
    },
    switchSection: function(act) {
        ajax.post("apps_check", {
            act: act,
            load: 1
        }, {
            onDone: function(content, script, summary, title, nav_tabs) {
                if (hide("apps_check_progress"), ge("apps_check_content").innerHTML = content, script) try {
                    eval(script)
                } catch (e) {
                    console.error(e.stack), console.log(script)
                }
                summary && (ge("apps_summary").innerHTML = summary), title && setDocumentTitle(replaceEntities(stripHTML(title))), nav_tabs ? (ge("apps_nav_tabs").innerHTML = nav_tabs, show("apps_nav_tabs")) : (ge("apps_nav_tabs").innerHTML = "", hide("apps_nav_tabs")), AppsCheck.hideError(), "requests" != act ? extend(nav.objLoc, {
                    act: act
                }) : delete nav.objLoc.act, delete nav.objLoc.mid, delete nav.objLoc.offset, nav.setLoc(nav.objLoc);
                var box = curBox();
                box && box.hide()
            },
            onFail: AppsCheck.showError
        })
    },
    showError: function(e) {
        hide("apps_check_progress");
        var o = ge("apps_check_error");
        return show("apps_check_error_wrap"), cur.errorShown = !0, o.innerHTML = e, scrollToTop(200), !0
    },
    hideError: function() {
        cur.errorShown && (hide("apps_check_error_wrap"), cur.errorShown = !1)
    },
    changeSummary: function() {
        var e = ge("apps_summary");
        if ("blocked" == cur.section || "requests" == cur.section || "comments" == cur.section || "reports" == cur.section) {
            var o = cur.totalCount ? langNumeric(cur.totalCount, cur.summaryLang.n_requests, !0) : cur.summaryLang.no_requests;
            if (cur.editAnswers && (o += cur.editAnswers), "reports" == cur.section) {
                var t = cur.all_reports ? cur.summaryLang.unverified_apps : cur.summaryLang.all_apps;
                o += '<span class="divider">|</span><span class="app_check_actions"><a href="#" onclick="AppsCheck.switchReports(); return false;">' + t + "</a></span>"
            }
            e.innerHTML = o, ge("tab_counter_" + cur.section) && (ge("tab_counter_" + cur.section).innerHTML = cur.tabCount ? "+" + cur.tabCount : "", toggleClass(ge("tab_" + cur.section), "count", !!cur.tabCount))
        }
    },
    changeAutoAnswer: function(e) {
        var o = unclean(cur.autoanswers[e]);
        if ("comments" == cur.section) {
            if (cur.editing) {
                var t = ge("reply_field" + cur.editing);
                t.value = o, t.focus()
            }
        } else ge("decline_comment").value = o
    },
    actsOver: function(e) {
        if (vk.id) {
            var o = ge("actions" + e);
            o && (o.timeout ? (clearTimeout(o.timeout), removeAttr(o, "timeout")) : fadeIn(o, 200))
        }
    },
    actsOut: function(e) {
        if (vk.id) {
            var o = ge("actions" + e);
            o && (o.timeout = setTimeout(function() {
                removeAttr(o, "timeout"), fadeOut(o, 200)
            }, 1))
        }
    },
    declineRequest: function(e, o) {
        return o = o || "", !showBox("apps_check", {
            act: "decline_box",
            aid: e,
            from: cur.section,
            platform: o
        }, {
            cache: 1,
            params: {
                width: "500px"
            }
        })
    },
    doDeclineRequest: function(e, o, t) {
        cur.deletingRequest || (cur.deletingRequest = !0, o.showProgress(), t = t || "", ajax.post("apps_check", {
            act: "reports" == cur.section ? "disable" : "a_decline_request",
            aid: e,
            rule: cur.selectedRules,
            platform: t,
            comment: ge("decline_comment").value,
            hash: cur.hashes.decline_hash,
            do_return: isChecked("return_check")
        }, {
            onDone: function(t, n) {
                delete cur.deletingRequest, o && o.hide(), n && setTimeout(showFastBox({
                    title: t
                }, n, getLang("global_close")).hide, 2e3), slideUp(ge("app" + e), 200, function() {
                    if (re("app" + e), cur.totalCount--, cur.tabCount--, AppsCheck.changeSummary(), !cur.totalCount) {
                        var o = cur.summaryLang.no_requests_msg;
                        ge("apps_check_content").innerHTML = '<div class="no_rows" id="no_apps">' + o + "</div>"
                    }
                })
            },
            onFail: function() {
                delete cur.deletingRequest, o && o.hide()
            }
        }))
    },
    approveRequest: function(e, o) {
        return o = o || "", !showBox("apps_check", {
            act: "approve_box",
            aid: e,
            platform: o
        }, {
            cache: 1
        })
    },
    changeType: function(e, o, t) {
        o.innerHTML = '<img src="/images/upload.gif" />';
        var n = {
            act: "change_type",
            aid: e,
            hash: cur.hashes.approve_hash
        };
        t && (n.new_type = t), ajax.post("apps_check", n, {
            onDone: function(e) {
                o.innerHTML = e
            }
        })
    },
    doApproveRequest: function(e, o, t) {
        cur.approvingRequest || (cur.approvingRequest = !0, o.showProgress(), t = t || "", ajax.post("apps_check", {
            act: "a_approve_request",
            aid: e,
            hash: cur.hashes.approve_hash,
            platform: t
        }, {
            onDone: function() {
                delete cur.approvingRequest, o && o.hide(), slideUp(ge("app" + e), 200, function() {
                    if (re("app" + e), cur.totalCount--, cur.tabCount--, AppsCheck.changeSummary(), !cur.totalCount) {
                        var o = cur.summaryLang.no_requests_msg;
                        ge("apps_check_content").innerHTML = '<div class="no_rows" id="no_apps">' + o + "</div>"
                    }
                })
            },
            onFail: function() {
                delete cur.approvingRequest, o && o.hide()
            }
        }))
    },
    showReplies: function(e, o, t, n) {
        buttonLocked(n) || (lockButton(n), ajax.post("apps_check", {
            act: "a_get_comments",
            id: e,
            count: o,
            comments_only: t,
            from: cur.section,
            hash: cur.hashes.comments_hash
        }, {
            cache: 1,
            onDone: function(o) {
                val("app_comments" + e, o)
            },
            onFail: unlockButton.pbind(n)
        }))
    },
    hideRow: function(e) {
        slideUp(ge("app" + e), 200, function() {
            if (re("app" + e), cur.totalCount--, cur.tabCount--, AppsCheck.changeSummary(), !cur.totalCount) {
                var o = cur.summaryLang.no_requests_msg;
                ge("apps_check_content").innerHTML = '<div class="no_rows" id="no_apps">' + o + "</div>"
            }
        }), ajax.post("apps_check", {
            act: "a_hide_comment",
            id: e,
            hash: cur.hashes.hide_row_hash
        })
    },
    showEditReply: function(e) {
        var o = ge("reply_field" + e);
        return cur.editing === e ? void elfocus(o) : (autosizeSetup(o, {
            minHeight: 32
        }), this.hideEditPostReply(), show("replies_wrap" + e, "comm_answers" + e), hide("reply_link" + e), ge("reply_button" + e).onclick = this.sendReply.pbind(e), cur.editing = e, void elfocus(o))
    },
    hideEditPostReply: function(e) {
        if (cur.editing !== !1 && !isVisible(boxLayerBG) && !isVisible(layerBG)) {
            var o = e && e.target ? e.target : {},
                t = o.id;
            if (cur.editing && (!e || !hasClass(o, "reply_link") && t != "reply_field" + cur.editing && "reply_to_link" != o.className)) {
                var n = cur.editing;
                cur.editing = !1;
                var a = ge("reply_field" + n),
                    c = trim(val(a));
                if (browser.opera_mobile || browser.safari_mobile || c) return;
                hide("comm_answers" + n);
                var s = ge("reply_link" + n);
                s && (show(s), hide("replies_wrap" + n)), a.blur(), a.active || setStyle(a, {
                    height: 14
                }), a.phonblur && a.phonblur()
            }
        }
    },
    checkTextLen: function(e, o, t) {
        var n = trim(e.value).replace(/\n\n\n+/g, "\n\n");
        if (e.lastLen !== n.length || t) {
            var a = e.lastLen = n.length,
                c = cur.options.max_post_len,
                s = a - n.replace(/\n/g, "").length;
            o = ge(o), a > c - 100 || s > 4 ? (show(o), a > c ? o.innerHTML = getLang("global_recommended_exceeded", a - c) : s > 4 ? o.innerHTML = getLang("global_recommended_lines", s - 4) : o.innerHTML = getLang("text_N_symbols_remain", c - a)) : hide(o)
        }
    },
    sendReply: function(e) {
        ajax.post("apps_check", {
            act: "a_post_comment",
            id: e,
            msg: ge("reply_field" + e).getValue(),
            hash: cur.hashes.post_comment_hash
        }, {
            onDone: function(o) {
                var t = ge("reply_field" + e);
                t.value = "", t.blur(), t.phonblur(), AppsCheck.hideEditPostReply(), hide("reply_warn" + e), ge("app_comments" + e).innerHTML += o
            },
            showProgress: function() {
                lockButton(ge("reply_button" + e))
            },
            hideProgress: function() {
                unlockButton(ge("reply_button" + e))
            }
        })
    },
    getCommentsPage: function(e) {
        return ajax.post("apps_check", {
            act: cur.section,
            mid: cur.mid,
            offset: e,
            load: 1
        }, {
            cache: 1,
            onDone: function(o, t, n) {
                o && (ge("apps_check_content").innerHTML = o, n && (ge("apps_summary").innerHTML = n), nav.setLoc(extend(nav.objLoc, {
                    offset: e
                })))
            },
            showProgress: function() {
                show("apps_check_progress"), show("page_bottom_progress")
            },
            hideProgress: function() {
                hide("apps_check_progress"), hide("page_bottom_progress")
            }
        }), !1
    },
    startCheck: function(e, o, t, n) {
        cur.shownApp && this.finishCheck(cur.shownApp), n && buttonLocked(n) || (lockButton(n), cur.shownApp = e, ajax.post("apps_check", {
            act: "start_check",
            uid: cur.viewer_id,
            app_id: e,
            hash: cur.hashes.check_hash
        }, {
            onDone: function(a) {
                if (unlockButton(n), a.length) showFastBox({
                    onHide: AppsCheck.finishCheck.bind(AppsCheck, e)
                }, a, getLang("global_cancel"));
                else {
                    var c, s = window,
                        r = document.documentElement;
                    if (s.pageNode) {
                        var i = Math.max(intval(s.innerHeight), intval(r.clientHeight)) - 200;
                        c = Math.min(t, i)
                    } else c = t;
                    showFastBox({
                        width: o + sbWidth() + 1,
                        bodyStyle: "padding: 0px;",
                        onHide: AppsCheck.finishCheck.bind(AppsCheck, e)
                    }, '<iframe src="app' + e + '?check=1" style="vertical-align: top;width: 100%; height: ' + c + 'px; border: none; overflow-x: hidden" frameborder="0" />', getLang("global_cancel"))
                }
            }
        }))
    },
    startCheckStandalone: function(e, o, t) {
        cur.shownApp && this.finishCheck(cur.shownApp), cur.shownApp = e, showBox("apps_check", {
            act: "start_check",
            app_id: e,
            platform: o,
            uid: cur.viewer_id,
            hash: cur.hashes.check_hash
        }, {
            params: {
                width: "400px",
                bodyStyle: "padding: 20px; line-height: 160%;",
                dark: 1,
                onHide: function() {
                    AppsCheck.finishCheck(e)
                }
            }
        })
    },
    finishCheck: function(e) {
        ajax.post("apps_check", {
            act: "finish_check",
            uid: cur.viewer_id,
            hash: cur.hashes.check_hash
        }, {
            onDone: function(o) {
                cur.shownApp == e && delete cur.shownApp
            }
        })
    },
    toBlackList: function(e, o) {
        cur.addingToBlacklist || (cur.addingToBlacklist = !0, ajax.post("apps_check", {
            act: "to_blacklist",
            id: e,
            hash: cur.hashes.blacklist_hash
        }, {
            onDone: function(e) {
                delete cur.addingToBlacklist, e && (ge("actions" + o).innerHTML = e)
            }
        }))
    },
    uncomplainApp: function(e) {
        cur.box = showFastBox("", cur.summaryLang.uncomplain_text, cur.summaryLang.uncomplain_ok, function() {
            AppsCheck.doUncomplainApp(e)
        }, getLang("global_cancel"))
    },
    doUncomplainApp: function(e) {
        var o = curBox();
        o.showProgress(), ajax.post("apps_check", {
            act: "uncomplain",
            id: e,
            hash: cur.hashes.uncomplain_hash
        }, {
            onDone: function(t, n) {
                o.hide(), setTimeout(showFastBox({
                    title: t
                }, n, getLang("global_close")).hide, 2e3), slideUp(ge("app" + e), 200, function() {
                    if (re("app" + e), cur.totalCount--, cur.tabCount--, AppsCheck.changeSummary(), !cur.totalCount) {
                        var o = cur.summaryLang.no_requests_msg;
                        ge("apps_check_content").innerHTML = '<div class="no_rows" id="no_apps">' + o + "</div>"
                    }
                })
            }
        })
    },
    editAutoanswers: function() {
        return !showBox("apps_check", {
            act: "edit_autoanswers_box",
            from: cur.section
        }, {})
    },
    removeAutoanswer: function(e) {
        cur.removingAutoAnswer || (cur.removingAutoAnswer = !0, ajax.post("apps_check", {
            act: "a_delete_autoanswer",
            id: e,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function(o) {
                delete cur.removingAutoAnswer, cur.deletedAutoanswers || (cur.deletedAutoanswers = []), cur.deletedAutoanswers[e] = ge("autoanswer_row" + e).innerHTML, o && (ge("autoanswer_row" + e).innerHTML = o)
            },
            onFail: function() {
                delete cur.removingAutoAnswer
            },
            showProgress: function() {
                curBox().showProgress()
            },
            hideProgress: function() {
                curBox().hideProgress()
            }
        }))
    },
    restoreAutoanswer: function(e) {
        cur.restoringAutoAnswer || (cur.restoringAutoAnswer = !0, ajax.post("apps_check", {
            act: "a_restore_autoanswer",
            id: e,
            hash: cur.hashes.autoanswers_hash
        }, {
            onDone: function() {
                delete cur.restoringAutoAnswer, cur.deletedAutoanswers && cur.deletedAutoanswers[e] && (ge("autoanswer_row" + e).innerHTML = cur.deletedAutoanswers[e], delete cur.deletedAutoanswers[e])
            },
            onFail: function() {
                delete cur.restoringAutoAnswer
            },
            showProgress: function() {
                curBox().showProgress()
            },
            hideProgress: function() {
                curBox().hideProgress()
            }
        }))
    },
    editAutoanswer: function(e) {
        if (!cur.editingAutoAnswer) {
            cur.editingAutoAnswer = !0;
            var o = ge("answer_content" + e).value;
            ajax.post("apps_check", {
                act: "a_edit_autoanswer",
                from: cur.section,
                id: e,
                text: o,
                hash: cur.hashes.autoanswers_hash
            }, {
                onDone: function(t) {
                    delete cur.editingAutoAnswer, slideUp("edit_autoanswer" + e, 200, function() {
                        cur.autoanswers[e] = o, t && (curBox().bodyNode.innerHTML = t, placeholderSetup("add_answer_text", {
                            back: !0
                        }), placeholderSetup("add_answer_label", {
                            back: !0
                        }))
                    })
                },
                onFail: function() {
                    delete cur.editingAutoAnswer
                },
                showProgress: function() {
                    curBox().showProgress()
                },
                hideProgress: function() {
                    curBox().hideProgress()
                }
            })
        }
    },
    addAutoanswer: function(e) {
        if (!cur.addingAutoAnswer) {
            var o = ge("add_answer_label").value,
                t = ge("add_answer_text").value;
            if (!o || !t) {
                var n = o ? ge("add_answer_text") : ge("add_answer_label");
                return notaBene(n), void n.focus()
            }
            cur.addingAutoAnswer = !0, ajax.post("apps_check", {
                act: "a_add_autoanswer",
                from: cur.section,
                name: o,
                text: t,
                hash: cur.hashes.autoanswers_hash
            }, {
                onDone: function(e, o) {
                    delete cur.addingAutoAnswer, slideUp("edit_autoanswer0", 200, function() {
                        cur.autoanswers[o] = t, e && (curBox().bodyNode.innerHTML = e, placeholderSetup("add_answer_text", {
                            back: !0
                        }), placeholderSetup("add_answer_label", {
                            back: !0
                        }))
                    })
                },
                onFail: function() {
                    delete cur.addingAutoAnswer
                },
                showProgress: function() {
                    curBox().showProgress()
                },
                hideProgress: function() {
                    curBox().hideProgress()
                }
            })
        }
    },
    cancelAutoanswer: function(e) {
        slideUp("edit_autoanswer" + e, 200, function() {
            cur.autoanswers[e] ? ge("answer_content" + e) && (ge("answer_content" + e).value = unclean(cur.autoanswers[e])) : ge("answer_content" + e) && (ge("answer_content" + e).value = "")
        })
    },
    switchReports: function() {
        show("apps_check_progress"), ajax.post("apps_check", {
            act: "reports",
            all: 1 - cur.all_reports,
            load: 1
        }, {
            onDone: function(content, script, summary, title) {
                hide("apps_check_progress"), ge("apps_check_content").innerHTML = content, script && eval(script), summary && (ge("apps_summary").innerHTML = summary), title && setDocumentTitle(replaceEntities(stripHTML(title))), AppsCheck.hideError()
            },
            onFail: AppsCheck.showError
        })
    },
    collectionPhotoDeinitUpload: function() {
        cur.collectionPhotoUploadOptions && each(cur.collectionPhotoUploadOptions, function(e, o) {
            o.upload && Upload.deinit(o.upload), delete o.upload, delete o.cont
        })
    },
    collectionPhotoUploadError: function(e, o) {
        o.match(/^ERR_[A-Z0-9_]+(\:|$)/) || (o = 'ERR_CLIENT_BAD_ERROR: error "' + clean(o.toString()) + '"');
        var t = o.match(/^(ERR_[A-Z0-9_]+)(\:\s*|$)([\S\s]*)\s*$/),
            n = t[1],
            a = null,
            c = ge("apps_collection_error");
        switch (n) {
            case "ERR_UPLOAD_FILE_NOT_SUPPORTED":
                a = getLang("apps_check_collection_photo_not_supported");
                break;
            case "ERR_UPLOAD_FILE_NOT_UPLOADED":
            case "ERR_UPLOAD_BAD_IMAGE_SIZE":
                a = getLang("apps_check_collection_photo_bad_size");
                break;
            case "ERR_STORAGE_ENGINE_NOT_CONNECTED":
            case "ERR_STORAGE_ENGINE_SAVE_FAILED":
                a = getLang("apps_check_collection_photo_failed");
                break;
            default:
                a = getLang("global_unknown_error")
        }
        val(c, a), isVisible(c) || slideDown(c, 150)
    },
    collectionPhotoUploadInit: function() {
        if (curBox() && cur.collectionPhotoUploadOptions) {
            var e = curBox();
            e.setOptions({
                onClean: AppsCheck.collectionPhotoDeinitUpload
            }), each(cur.collectionPhotoUploadOptions, function(o, t) {
                t.upload || (t.lang = o, t.cont = geByClass1("_apps_check_collection_photo_upload_" + o), t.img = geByClass1("_apps_check_collection_photo_" + o), t.cont && (debugLog("Init upload " + t.lang), t.upload = Upload.init(t.cont, t.options.url, {}, {
                    file_name: "photo",
                    file_size_limit: 5242880,
                    file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                    file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                    lang: t.options.lang,
                    clear: 1,
                    type: "photo",
                    noFlash: 1,
                    max_attempts: 3,
                    signed: 1,
                    static_url: t.options.static_url,
                    check_url: t.options.check_url,
                    base_url: t.options.base_url,
                    buttonClass: "secondary apps_check_collection_photo_upload_btn",
                    onUploadStart: function(o, n) {
                        e.changed = !0, lockButton(geByTag1("button", t.cont))
                    },
                    onUploadComplete: function(e, o) {
                        var n = parseJSON(o) || {};
                        if (n.error) AppsCheck.collectionPhotoUploadError(t, n.error);
                        else if (n.photo && n.photo.sizes) {
                            t.res = o;
                            var a = n.photo.sizes[isRetina() ? 1 : 0];
                            t.img.src = t.options.static_url + "v" + a[1] + "/" + a[2] + "/" + a[3] + ".jpg", isVisible("apps_collection_error") && slideUp("apps_collection_error", 150)
                        } else {
                            var c = o === !1 ? "[FALSE]" : null === o ? "[NULL]" : void 0 === o ? "[UNDEFINED]" : "&laquo;" + clean(o.toString().substr(0, 1024)) + "&raquo;";
                            AppsCheck.collectionPhotoUploadError(t, "ERR_CLIENT_BAD_RESPONSE: bad upload collection photo response, recv " + c)
                        }
                        unlockButton(geByTag1("button", t.cont))
                    }
                })))
            })
        }
    },
    addCollection: function() {
        return !showBox("/apps_check", {
            act: "edit_collection_box",
            type: cur.type
        }, {
            params: {
                width: 570
            }
        })
    },
    editCollection: function(e) {
        return !showBox("/apps_check", {
            act: "edit_collection_box",
            collection_id: e
        }, {
            params: {
                width: 570
            }
        })
    },
    saveCollection: function(e, o, t) {
        var n = curBox();
        if (n && !buttonLocked(t)) {
            if (!val("apps_check_collection_title")) return void notaBene("apps_check_collection_title");
            var a = {};
            each(cur.collectionPhotoUploadOptions || {}, function(e, o) {
                o.res && (a["photo_" + e] = o.res)
            }), ajax.post("/apps_check", extend({
                act: "a_save_collection",
                collection_id: e,
                hash: o,
                title: val("apps_check_collection_title"),
                type: cur.type,
                photos: a,
                language: cur.languageDD.val(),
                sex: radioval("sex"),
                min_age: cur.minAgeDD.val(),
                max_age: cur.maxAgeDD.val()
            }, a), {
                onDone: function(e, o) {
                    AppsCheck.updateCollections(e, o), n.hide()
                },
                onFail: function(e) {
                    return val("apps_collection_error", e), isVisible("apps_collection_error") || slideDown("apps_collection_error", 150), !0
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }
    },
    updateCollections: function(html, script) {
        var list = ge("apps_collection_rows");
        list && list.sorter && list.sorter.destroy(), html && (ge("apps_check_content").innerHTML = html), script && eval(script), AppsCheck.toggleCollections(ge("apps_toggle_collections"), !!cur.onlyEnabled)
    },
    toggleCollections: function(e, o) {
        cur.onlyEnabled = o;
        var t = ge("apps_collection_rows");
        t && t.sorter && t.sorter.destroy(), window.tooltips && tooltips.hideAll(), (o ? addClass : removeClass)(t, "no_disabled");
        var n = 0,
            a = geByClass("apps_collection_row_wrap", t);
        for (var c in a) setStyle(a[c], {
            zIndex: null,
            left: null,
            top: null,
            width: null,
            cursor: null
        }), o && hasClass(a[c], "disabled") ? a[c].setAttribute("skipsort", 1) : (a[c].removeAttribute("skipsort"), n++);
        return val(e, o ? getLang("apps_all_collections") : getLang("apps_only_enabled_collections")), toggle("no_apps", !n), !1
    },
    deleteCollection: function(e, o) {
        return !showFastBox({
            title: getLang("apps_delete_collection_title"),
            dark: 1,
            bodyStyle: "padding: 20px; linne-height: 140%;"
        }, getLang("apps_delete_collection_confirm"), getLang("global_delete"), function(t) {
            ajax.post("/apps_check", {
                act: "a_delete_collection",
                collection_id: e,
                hash: o,
                type: cur.type
            }, {
                onDone: function(e, o) {
                    AppsCheck.updateCollections(e, o), curBox().hide()
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }, getLang("global_cancel"))
    },
    enableCollection: function(e, o, t) {
        ajax.post("/apps_check", {
            act: "a_enable_collection",
            collection_id: e,
            enable: o,
            hash: t,
            type: cur.type
        }, {
            onDone: AppsCheck.updateCollections
        })
    },
    addCollectionApp: function() {
        var e = val(cur.aSearch);
        return e ? void showBox("apps_check", {
            act: "add_collection_app_box",
            lnk: e,
            id: intval(cur.listId)
        }, {
            onFail: function(e) {
                return showDoneBox(e), notaBene(cur.aSearch), !0
            }
        }) : notaBene(cur.aSearch)
    },
    removeCollectionApp: function(e, o, t, n) {
        n && cancelEvent(n), ajax.post("apps_check", {
            act: "a_remove_from_collection",
            id: e,
            edit: 1,
            aid: o,
            hash: t
        }, {
            onDone: function(e) {
                var o = ge("apps_list_content");
                o.sorter && o.sorter.destroy(), o.innerHTML = e, cur.sorter && geByClass("apps_cat_row", ge("apps_search_content")).length && (cur.sorter = qsorter.init("apps_search_content", {
                    onReorder: cur.reorderApps,
                    xsize: 5,
                    width: 154,
                    height: 226
                }))
            },
            onFail: function(e) {
                return showDoneBox(e), !0
            }
        })
    },
    addFeatured: function() {
        var e = val(cur.input);
        return e ? void showBox("apps_check", {
            act: "add_featured_box",
            lnk: e
        }, {
            onFail: function() {
                return notaBene(cur.input), !0
            }
        }) : notaBene(cur.input)
    },
    actFeatured: function(e, o, t, n, a, c) {
        var s = o.innerHTML;
        o.innerHTML = '<img src="/images/upload.gif" />', ajax.post("apps_check", {
            act: "a_" + e + "_featured",
            aid: t,
            hash: n
        }, {
            onDone: function(e) {
                2 == c ? uiTabs.goTab(domFC(ge("subtab_featured"))) : c ? nav.reload() : (a || o).innerHTML = e
            },
            onFail: function(e) {
                return o.innerHTML = s, setTimeout(showFastBox(getLang("global_error"), e).hide, __debugMode ? 3e4 : 3e3), !0
            }
        })
    },
    showStat: function(aid, type, obj) {
        var hideStat = obj.getAttribute("stat");
        hideStat ? (obj.innerHTML = hideStat, hide("apps_check_" + aid + "_graph"), obj.setAttribute("stat", "")) : (obj.setAttribute("stat", obj.innerHTML), obj.innerHTML = '<img src="/images/upload.gif"/>', ajax.post("apps_check", {
            act: "a_featured_stat",
            aid: aid
        }, {
            onDone: function(html, js, hideText) {
                ge("apps_check_" + aid + "_graph").innerHTML = html, eval(js), obj.innerHTML = hideText, show("apps_check_" + aid + "_graph")
            }
        }))
    },
    showAdsStat: function(e) {
        var o = {};
        o.app_id = e;
        var t = {
            params: {}
        };
        t.cache = 1, showBox("/apps_check?act=ads_stat", o, t)
    },
    _eof: 1
};
try {
    stManager.done("apps_check.js")
} catch (e) {}