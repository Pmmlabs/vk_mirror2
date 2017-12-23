var AppsEdit = {
    PANORAMIC_SLIDER_MAX_PHOTOS: 5,
    init: function() {
        cur.module = "apps_edit", cur.nav.push(function(e, t, a) {
            return void 0 === e[0] && e.section ? (this.switchSection(a.section), !1) : void 0
        }.bind(this)), this.initPage()
    },
    initPage: function() {
        window.Dev && Dev.checkBlockHeight()
    },
    switchTab: function(e, t, a) {
        if (!a && checkEvent(t)) return !0;
        if (!a && nav.objLoc.section == e) return !1;
        var s = ge("apps_nav_" + e);
        if (s) {
            var i = geByClass("nav_selected", ge("dev_navigation"));
            for (var n in i) removeClass(i[n], "nav_selected");
            addClass(s, "nav_selected");
            var r = ge("dev_left_nav");
            if (r && i[0]) {
                var o = ge("dev_left_nav_mark");
                setStyle(o, {
                    height: getSize(i[0])[1],
                    top: i[0].offsetTop || 0
                }), addClass(r, "anim"), animate(o, {
                    height: getSize(s)[1],
                    top: s.offsetTop
                }, {
                    duration: 100,
                    onComplete: function() {
                        removeClass(r, "anim")
                    }
                })
            }
        }
        return a ? !1 : (nav.go(s, t), !1)
    },
    animSubTab: function(e) {
        var t = ge("app_edit_subheader"),
            a = t && geByClass1("app_header_sel", t);
        if (t && a) {
            var s = ge("app_edit_nav_mark"),
                i = a && a.offsetLeft || 0,
                n = e.offsetLeft || 0,
                r = n != i ? intval(70 * Math.log(Math.abs(n - i) / 20)) : 0;
            setStyle(s, {
                width: getSize(a)[0],
                left: i
            }), addClass(t, "anim"), removeClass(a, "app_header_sel"), addClass(e, "app_header_sel"), animate(s, {
                width: getSize(e)[0],
                left: n
            }, {
                duration: r,
                transition: Fx.Transitions.easeOutCirc,
                onComplete: function() {
                    removeClass(t, "anim"), setStyle(s, {
                        display: ""
                    })
                }
            })
        }
    },
    switchSubTab: function(e, t) {
        return this.animSubTab(e), nav.go(e, t)
    },
    switchSection: function(section) {
        ajax.post("editapp", {
            section: section,
            id: cur.aid,
            load: 1
        }, {
            onDone: function(content, script) {
                hide("apps_edit_progress"), ge("app_edit_wrap").innerHTML = content, script && eval(script), AppsEdit.hideError(), nav.setLoc(extend(nav.objLoc, {
                    section: section
                })), AppsEdit.initPage(), scrollToTop(0)
            },
            onFail: AppsEdit.showError
        })
    },
    showError: function(e, t) {
        if (!e) return !0;
        if (hide("apps_edit_progress"), t) {
            var a = ge(t);
            show(a)
        } else {
            var a = ge("app_edit_error");
            show(ge("app_edit_error_wrap")), scrollToTop(200)
        }
        return cur.errorShown = !0, a.innerHTML = e, !0
    },
    hideError: function() {
        cur.errorShown && (hide("app_edit_error_wrap"), cur.errorShown = !1)
    },
    showRulesBox: function(e) {
        return !showBox("editapp", {
            act: "show_rules",
            accept: e
        }, {
            cache: 1,
            params: {
                width: "650px",
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            },
            onDone: AppsEdit.hideError,
            onFail: AppsEdit.showError,
            stat: ["wk.css"]
        })
    },
    getParams: function() {
        var e = ge("app_edit_cont"),
            t = new Object,
            a = function(e) {
                return 0 == e.indexOf("app_") ? e.substr(4) : e
            },
            s = geByTag("input", e);
        for (var i in s) {
            var n = s[i];
            n.id && (t[a(n.id)] = val(n))
        }
        var r = geByTag("textarea", e);
        for (var i in r) {
            var n = r[i];
            n.id && n.value && (t[a(n.id)] = val(n))
        }
        var o = geByClass("checkbox", e);
        for (var i in o) {
            var n = o[i];
            n.id && (t[a(n.id)] = isChecked(n) ? 1 : 0)
        }
        for (var i in window.radioBtns) t[a(i)] = window.radioBtns[i].val;
        for (var i in cur.dropDowns) t[a(i)] = cur.dropDowns[i].val();
        return delete t.selectedItems, t
    },
    generateServiceToken: function(e, t) {
        ajax.post("al_apps_edit.php", {
            act: "generate_token",
            id: e,
            hash: t
        }, {
            onDone: function(e) {
                ge("service_token").value = e.service_token, ge("service_token_hash").value = e.service_token_hash
            },
            onFail: function(e) {
                return AppsEdit.showError(e)
            }
        })
    },
    generateSecretKey: function(e, t, a) {
        ajax.post("al_apps_edit.php", {
            act: "generate_secret_key",
            id: e,
            hash: t
        }, {
            onDone: function(e) {
                ge("app_secret2").value = e.secret_key, ge("secret_key_hash").value = e.secret_key_hash, ge("service_token").value = e.service_token, ge("service_token_hash").value = e.service_token_hash
            },
            onFail: function(e) {
                return AppsEdit.showError(e)
            }
        })
    },
    showTooltipForField: function(e, t, a) {
        var s = getSize(t);
        showTooltip(e, {
            text: a,
            dir: "left",
            width: .75 * s[0],
            shift: [1.5 * -s[1], .45 * -s[1]]
        })
    },
    saveOptions: function(e, t) {
        var a = this.getParams("app_edit_cont");
        if (a.act = e || "save_options", a.help = Privacy.getValue("help"), "save_info" != e) {
            a.openapi = Privacy.getValue("openapi"), a.need_install = Privacy.getValue("install"), cur.privacy.push && (a.push = Privacy.getValue("push"));
            var s = Privacy.getValue("require");
            if (s = s.split("_"), s[1]) {
                s = s[1].split(",");
                for (var i in s) {
                    var n = cur.maskByGroupNum[parseInt(s[i]) - 300];
                    a["access_" + n] = 1
                }
            } else;
        }
        t && (a.confirm = 1), lockButton(ge("app_save_btn"));
        var r = function() {
            unlockButton(ge("app_save_btn"))
        };
        ajax.post("editapp", a, {
            onDone: function(t, a, s) {
                if (r(), hide("apps_options_saved"), ge("apps_edit_error_text") && hide("apps_edit_error_text"), "confirm" == t) showFastBox(a, s, getLang("global_continue"), function() {
                    curBox().hide(), AppsEdit.saveOptions(e, !0)
                }, getLang("global_cancel"));
                else if ("error" == t)
                    if ("domain" == s) {
                        var i = ge("apps_addr_table");
                        setStyle(i, "backgroundColor", "#FAEAEA"), setTimeout(animate.pbind(i, {
                            backgroundColor: "#FFFFFF"
                        }, 300), 400), elfocus("app_domain");
                        var n = ge("apps_addr_result");
                        n.innerHTML = a, fadeIn(n, 200), scrollToTop(200)
                    } else if ("base_domain" == s) notaBene(cur.selectDD.control.firstChild), cur.selectDD.focusInput();
                else {
                    var o = ge("app_" + s);
                    elfocus(o), setStyle(o, "backgroundColor", "#FAEAEA"), setTimeout(animate.pbind(o, {
                        backgroundColor: "#FFFFFF"
                    }, 300), 400)
                } else {
                    if (s.domain) {
                        var c = ge("app_domain");
                        c && (c.value = s.domain), hide("apps_addr_result")
                    }
                    s.titleNotice && (ge("app_name_notice").innerHTML = s.titleNotice, show("app_name_notice"), s.titleHide ? (addClass("app_name", "apps_edit_input_readonly"), ge("app_name").readOnly = !0) : (removeClass("app_name", "apps_edit_input_readonly"), ge("app_name").readOnly = !1));
                    var o = ge("apps_options_saved");
                    o.innerHTML = a, show(o), scrollToTop(200)
                }
            },
            onFail: function(e) {
                return r(), hide("apps_options_saved"), AppsEdit.showError(e)
            }
        })
    },
    loadCheckHistory: function(e, t) {
        if (isVisible("apps_check_history")) hide("apps_check_history");
        else {
            if (t) {
                if (actionsMenuItemLocked(t)) return;
                lockActionsMenuItem(t)
            }
            ajax.post("apps_check.php", {
                act: "a_check_history",
                no_version: 1,
                app_id: e
            }, {
                onDone: function(e) {
                    unlockActionsMenuItem(t), val("apps_check_history", e), show("apps_check_history")
                }
            })
        }
    },
    setMultilang: function(e, t, a, s) {
        if (s) {
            if (actionsMenuItemLocked(s)) return;
            lockActionsMenuItem(s)
        }
        ajax.post("apps_check", {
            act: "switch_multilang",
            aid: e,
            enabled: t,
            hash: a
        }, {
            onDone: function() {
                nav.reload()
            }
        })
    },
    resetNameCounter: function(e, t) {
        ajax.post("apps_check", {
            act: "a_reset_counters",
            aid: e,
            hash: t
        }, {
            onDone: function() {
                nav.reload()
            }
        })
    },
    appWidgetAccess: function(e, t, a, s) {
        actionsMenuItemLocked(e) || (lockActionsMenuItem(e), ajax.post("apps_check", {
            act: "a_app_widget_access",
            aid: t,
            val: s,
            hash: a
        }, {
            onDone: function() {
                nav.reload()
            },
            onFail: unlockActionsMenuItem.pbind(e)
        }))
    },
    adminApp: function(e, t, a, s, i, n, r, o, c, p) {
        var d = showFastBox(cur.appEditAdminTitle, '<div id="apps_show_penalty" style="display:none;"><div style="color:#666;padding:5px 0;">' + cur.appEditAdminPenalty + '</div><input type="text" id="apps_penalty" class="text" style="width:440px" value="' + i + '"/></div><div style="color:#666;padding:5px 0;">' + cur.appEditAdminComment + '</div><textarea id="apps_check_comment" class="dark box_textarea"></textarea>' + (r || "") + (o || "") + (c || ""));
        d.setOptions({
            width: 500
        }), i > 0 ? show("apps_show_penalty") : hide("apps_show_penalty"), d.removeButtons(), d.addButton(s, function() {
            if (!cur.adminActStarted) {
                cur.adminActStarted = !0;
                var s = {
                    act: e,
                    id: t,
                    hash: a,
                    penalty: ge("apps_penalty").value,
                    comment: ge("apps_check_comment").value
                };
                r && (s.ban_domain = isChecked("admin_app_bandomain")), o && (s.warn_users = isChecked("admin_app_warnusers")), c && (s[p] = isChecked("admin_custom_field")), ajax.post(n ? "apps_check" : "apps_check.php", s, {
                    onDone: function() {
                        nav.reload()
                    },
                    showProgress: d.showProgress,
                    hideProgress: d.hideProgress
                })
            }
        }, "yes"), d.addButton(getLang("box_cancel"), d.hide, "no")
    },
    adminTogglePlatform: function(e, t, a, s) {
        if (s) {
            if (actionsMenuItemLocked(s)) return;
            lockActionsMenuItem(s)
        }
        var i = {
            act: "a_toggle_platform_enabled",
            app_id: e,
            platform: t,
            hash: a
        };
        ajax.post("apps_check", i, {
            onDone: function(e) {
                unlockActionsMenuItem(s), val(s, e)
            }
        })
    },
    uploadIcon: function() {
        showBox("editapp", {
            act: "upload_icon_box",
            aid: cur.aid
        }, {
            params: {
                width: "430px",
                bodyStyle: "padding: 0px; position: relative;",
                dark: 1
            }
        })
    },
    uploadPhoto: function(e) {
        showBox("editapp", {
            act: "upload_photo_box",
            aid: cur.aid,
            big: e ? 1 : 0,
            edit_lang: cur.editLang
        }, {
            params: {
                width: "438px",
                bodyStyle: "padding: 0px; position: relative;",
                dark: 1
            }
        })
    },
    checkAddress: function(e) {
        cur.addrUnchecked = 0, clearTimeout(cur.addressCheckTO), cur.lastAddress != val("app_domain") && (cur.addressCheckTO = setTimeout(AppsEdit.doCheckAddress, e || 0))
    },
    doCheckAddress: function() {
        var e = ge("apps_addr_result");
        fadeOut(e, 200), cur.lastAddress = val("app_domain"), hide("apps_addr_result"), ajax.post("editapp", {
            act: "a_check_address",
            name: cur.lastAddress,
            aid: cur.aid
        }, {
            onDone: function(t) {
                cur.addrChecked = 1, e.innerHTML = t, fadeIn(e, 200)
            },
            onFail: function(t) {
                return cur.addrChecked = -1, e.innerHTML = t, fadeIn(e, 200), !0
            }
        })
    },
    deleteApp: function() {
        showBox("editapp", {
            act: "delete_app_box",
            aid: cur.aid
        }, {
            params: {
                dark: 1,
                width: "430px",
                bodyStyle: "padding: 20px; line-height: 160%;"
            }
        })
    },
    activateRow: function(e) {
        var t = geByClass("apps_edit_delete_row", e);
        t[0].active || animate(t[0], {
            backgroundColor: "#C4D2E1"
        }, 200)
    },
    deactivateRow: function(e) {
        var t = geByClass("apps_edit_delete_row", e);
        t[0].active || animate(t[0], {
            backgroundColor: "#FFF"
        }, 200)
    },
    activateDelete: function(e) {
        e.active = !0, animate(e, {
            backgroundColor: "#6B8DB1"
        }, 200), showTooltip(e, {
            text: getLang("global_delete"),
            showdt: 500
        })
    },
    deactivateDelete: function(e) {
        e.active = !1, animate(e, {
            backgroundColor: "#C4D2E1"
        }, 200), window.tooltips && tooltips.hide(e)
    },
    addSWF: function() {
        showBox("editapp", {
            act: "add_swf_box",
            aid: cur.aid
        }, {
            params: {
                dark: 1,
                width: "430px",
                bodyStyle: "padding: 0px; position: relative;"
            }
        })
    },
    deleteSWF: function(e, t, a) {
        tooltips.hide(a);
        var s, i = function() {
                s.showProgress(), ajax.post("editapp", {
                    act: "a_delete_swf",
                    aid: cur.aid,
                    swf_id: e,
                    hash: t
                }, {
                    onDone: function(t) {
                        s.hideProgress(), s.content(t), s.removeButtons(), s.addButton(getLang("global_close"), s.hide), setTimeout(s.hide, 2e3), re("apps_edit_swf_" + e);
                        var a = geByClass("apps_edit_swf_row", ge("apps_edit_flash_other_options"));
                        1 == a.length && re(a[0])
                    }
                })
            },
            n = function() {
                s.hide()
            };
        s = showFastBox(getLang("apps_title_file_delete"), getLang("apps_confirm_file_delete"), getLang("global_delete"), i, getLang("global_cancel"), n)
    },
    updateSWF: function() {
        showBox("editapp", {
            act: "update_swf_box",
            aid: cur.aid
        }, {
            params: {
                dark: 1,
                width: "430px",
                bodyStyle: "padding: 0px; position: relative;"
            }
        })
    },
    showHint: function(e, t, a) {
        e = ge(e), text = cur.hint[e.id], clearTimeout(cur.hideHintTimout), t ? showTooltip(e, {
            text: text,
            slide: 15,
            className: "apps_edit_up_tt",
            shift: [0, -1, 0]
        }) : showTooltip(e, {
            text: '<div class="apps_edit_side_tt_pointer"></div>' + text,
            slideX: 15,
            className: "apps_edit_tt",
            shift: a || [-291, 0, -60],
            forcetodown: !0
        })
    },
    hideHint: function(e) {
        e = ge(e), clearTimeout(cur.hideHintTimout), cur.hideHintTimout = setTimeout(function() {
            window.tooltips && e.tt && e.tt.hide()
        }, 500)
    },
    showSecret: function(aid, hash) {
        ajax.post("al_apps_edit.php", {
            act: "a_show_secret",
            aid: aid,
            hash: hash
        }, {
            onDone: function(title, html, js) {
                var box = showFastBox(title, html);
                eval(js)
            },
            loader: 1
        })
    },
    showSecretInPlace: function(e, t) {
        ajax.post("al_apps_edit.php", {
            act: "a_show_secret_in_place",
            aid: e,
            hash: t
        }, {
            onDone: function(e) {
                ge("secret_key_edit").innerHTML = e
            },
            loader: 1
        })
    },
    changeType: function(e, t, a, s) {
        var i = ge("apps_check_change_type_label"),
            n = domPN(i);
        if (s) {
            if (actionsMenuItemLocked(s)) return;
            lockActionsMenuItem(s)
        }
        return ajax.post("apps_check", {
            act: "change_type",
            aid: e,
            hash: t,
            from: "appview",
            new_type: a
        }, {
            onDone: function(e) {
                uiActionsMenu.hide(n), unlockActionsMenuItem(s), val(i, e)
            }
        }), !1
    },
    getUploadErrorText: function(e, t, a) {
        var s, i = {
            apps_full_banner_error: "apps_full_banner_size_1120_error",
            apps_photo_error: "apps_photo_size_error",
            apps_catalog_image_error: "apps_catalog_image_size_278_error",
            apps_screenshot_error: "apps_screenshot_size_error",
            apps_panoramic_banner_error: "apps_full_banner_size_1120_error"
        };
        return 105 == e ? a.apps_banner_size_error : -1 == e ? (s = i[t] || a.apps_banner_size_error, a[s]) : "ERR_UPLOAD_BAD_IMAGE_SIZE" == e && "apps_panoramic_banner_error" == t ? (s = i[t], a[s]) : a.apps_photo_notloaded_unknown
    },
    initUpload: function(cont, opts, lang, resObj) {
        var options = {
            file_name: "photo",
            file_size_limit: 5242880,
            file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
            file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
            lang: lang,
            onUploadStart: function(e, t) {
                "form" == Upload.types[e] && show(box.progress), hide("apps_edit_upload_error")
            },
            onNoFilteredCallback: function() {
                if (lang) {
                    var e = Upload.obj[i],
                        t = domPN(e);
                    hasClass(t, "apps_edit_progress") && removeClass(t, "apps_edit_progress"), AppsEdit.showError(lang.apps_edit_invalid_image_file, opts.errorObj)
                }
            },
            onUploadComplete: function(i, res) {
                var obj;
                try {
                    obj = eval("(" + res + ")")
                } catch (e) {
                    obj = q2ajx(res)
                }
                if (obj.code) return void Upload.onUploadError(i, obj.code);
                if (obj.error) return void Upload.onUploadError(i, obj.error);
                opts.vars.mid && (obj.mid = opts.vars.mid);
                var params = {
                    act: opts.save_act,
                    app_id: cur.aid
                };
                cur.editLang && (params.edit_lang = cur.editLang), "apps_banner_error" == opts.errorObj && hide("apps_banner_update"), ajax.post("editapp", extend(obj, params), {
                    onDone: function(e, t) {
                        opts.success_callback ? cur[opts.success_callback](e, t) : (resObj.src = e, addClass(resObj.parentNode, "apps_edit_img_loaded")), opts.lite || Upload.embed(i), opts.errorObj && hide(opts.errorObj)
                    },
                    onFail: function(e) {
                        return AppsEdit.showError(e, opts.errorObj), opts.lite || Upload.embed(i), !0
                    }
                })
            },
            onUploadProgress: function(e, t, a) {
                if (!ge("form" + e + "_progress")) {
                    var s = Upload.obj[e],
                        i = getSize(s)[1],
                        n = i / 2 + 10,
                        r = s.firstChild;
                    for (addClass(s.parentNode, "apps_edit_progress"); r;) 1 == r.nodeType && (r.id == "uploader" + e && browser.msie ? setStyle(r, {
                        position: "relative",
                        left: "-5000px"
                    }) : setStyle(r, {
                        visibility: "hidden"
                    })), r = r.nextSibling;
                    s.appendChild(ce("div", {
                        innerHTML: '<div class="apps_info_progress_wrap">          <div id="form' + e + '_progress" class="apps_upload_progress" style="width: 0%;"></div>        </div></div>',
                        className: "apps_info_prg_cont"
                    }, {
                        height: n + "px",
                        marginTop: -n + "px"
                    }))
                }
                var o = intval(t / a * 100);
                o = Math.min(o, 100), setStyle(ge("form" + e + "_progress"), {
                    width: o + "%"
                })
            },
            onUploadError: function(e, t) {
                debugLog("error", e, t);
                var a = AppsEdit.getUploadErrorText(t, opts.errorObj, lang),
                    s = void 0 !== e.ind ? e.ind : e,
                    i = Upload.obj[s],
                    n = domPN(i);
                hasClass(n, "apps_edit_progress") && removeClass(n, "apps_edit_progress"), Upload.embed(s), AppsEdit.showError(a, opts.errorObj)
            },
            clear: 1,
            type: "photo",
            buttonClass: "secondary small",
            max_attempts: 3,
            server: opts.server,
            error: opts.default_error,
            error_hash: opts.error_hash,
            dropbox: "apps_icon_dropbox"
        };
        return opts.lite && (options.flash_lite = 1), Upload.init(cont, opts.url, opts.vars, options)
    },
    ssOver: function(e) {
        var t = geByClass1("apps_edit_screen_close", e);
        if (!t) {
            var t = se('<div class="apps_edit_screen_close" onmouseover="showTooltip(this, {black: 1, text: \'' + cur.remove_screenshot + "', shift: [12, 2, 0], forcetoup: 1});\"></div>");
            addEvent(t, "click", AppsEdit.ssClose.pbind(e, t)), cur.destroy.push(function() {
                removeEvent(t, "click")
            }), e.appendChild(t)
        }
        fadeIn(t, 100)
    },
    ssClose: function(e, t, a) {
        var s = e.getAttribute("rel");
        return ajax.post("editapp", {
            act: "a_remove_screenshot",
            hash: cur.photoHash,
            aid: cur.aid,
            pid: s
        }), fadeOut(e, 200, function() {
            re(e), cur.ssCount < cur.ssMax && show("apps_edit_upload_screenshot")
        }), cur.ssCount -= 1, cur.ssCount < cur.ssMax && hide("apps_edit_ss_reason"), t.tt && t.tt.destroy(), cancelEvent(a)
    },
    ssOut: function(e) {
        var t = geByClass1("apps_edit_screen_close", e);
        fadeOut(t, 100)
    },
    ssClick: function(e) {
        var t = e.getAttribute("rel");
        showBox("editapp", {
            act: "show_screen",
            aid: cur.aid,
            pid: t
        }, {
            dark: 1
        })
    },
    removeFullBanner: function(e, t) {
        hide("apps_edit_full_wrap");
        var a = geByTag1("img", geByClass1("selected", ge("apps_edit_full_wrap")));
        a.src = isRetina() ? "/images/dquestion_v.png" : "/images/dquestion_u.png", removeClass(e, "apps_edit_progress"), Upload.embed(t), ajax.post("editapp", {
            act: "a_clear_full_banner",
            hash: cur.photoHash,
            aid: cur.aid,
            format: 1,
            edit_lang: cur.editLang
        })
    },
    certUploadBox: function(e, t) {
        var a = (Privacy.getValue("push") || "").split("_");
        showBox("editapp", {
            act: "select_cert",
            aid: cur.aid,
            push: a[2],
            cert_type: t
        }, {
            params: {
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }
        })
    },
    urlFocus: function(e, t) {
        val(e) || val(e, "http://"), t && showTooltip(e, {
            text: '<div class="apps_edit_side_tt_pointer"></div>' + cur[t],
            className: "apps_edit_tt",
            slideX: 15,
            forcetodown: 1,
            shift: [-291, 0, -60],
            hasover: 1,
            onCreate: function() {
                removeEvent(e, "mouseout")
            }
        })
    },
    urlBlur: function(e) {
        "http://" == val(e) && val(this, ""), e.tt && e.tt.hide()
    },
    addToNew: function(e, t) {
        showBox("editapp", {
            act: "add_to_new_box",
            aid: e,
            hash: t
        }, {
            dark: !0
        })
    },
    enableOrders: function(e, t, a) {
        var s = ge("enable_orders_btn");
        AppsEdit.hideError(), ajax.post("editapp", {
            act: "enable_orders",
            aid: e,
            force: a,
            hash: t
        }, {
            onDone: function(a, s) {
                if (a) ge("apps_new_api_notice").innerHTML = s;
                else var i = showFastBox(getLang("global_action_confirmation"), s, getLang("box_yes"), function() {
                    i.hide(), AppsEdit.enableOrders(e, t, 1)
                }, getLang("global_cancel"))
            },
            onFail: function(e) {
                return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: function() {
                lockButton(s)
            },
            hideProgress: function() {
                unlockButton(s)
            }
        })
    },
    checkSize: function(e, t) {
        var a = val(e);
        a > t ? (notaBene(e), val(e, t)) : a != positive(a) && (notaBene(e), val(e, positive(a) || 607))
    },
    updateSecureUrl: function() {
        if (!cur.iframeSecureChanged) {
            var e = val("app_iframe_url").replace(/^http:/, "https:");
            val("app_m_iframe_secure_url", e)
        }
    },
    onChangeIFrameUrl: function() {
        var e = val("app_iframe_url");
        e && (/^http:\/\//.test(e) ? val("app_iframe_url", e.replace(/^http:/, "https:")) : /^https:\/\//.test(e) || val("app_iframe_url", "https://" + e))
    },
    onChangeMobileSecureUrl: function() {
        var e = val("app_m_iframe_secure_url");
        e && (/^http:\/\//.test(e) ? val("app_m_iframe_secure_url", e.replace(/^http:/, "https:")) : /^https:\/\//.test(e) || val("app_m_iframe_secure_url", "https://" + e))
    },
    addFunc: function() {
        hide("apps_edit_funcs_empty"), hide("apps_edit_funcs_not_found"), show("func_search_panel");
        for (var e, t = ge("apps_edit_funcs"); inArray(e = Math.floor(1e7 * Math.random(), cur.funcIds)););
        cur.funcIds.unshift(e), cur.funcInfos[e] = {
            name: "",
            code: 'return "Hello World";'
        };
        var a = se(rs(cur.funcRowTpl, {
            name: "newFunc",
            code: 'return "Hello World";',
            id: e
        }));
        addClass(geByClass1("apps_edit_cont_row", a), "apps_edit_new_func"), t.insertBefore(a, t.firstChild), cur.funcsVersions[e] = {
            last_v: 1,
            versions: [
                [-1, -1]
            ]
        };
        var s = ge("func_row_" + e);
        addClass(s, "dev_func_loaded"), addClass(s, "dev_no_func_versions");
        geByClass1("apps_edit_editor", a);
        AppsEdit.switchEditFunc(e), geByClass1("apps_edit_cont_name", a).focus(), AppsEdit.updateFuncsSort()
    },
    removeFunc: function(e) {
        var t = ge("func_row_" + e);
        delete cur.funcInfos[e];
        var a = indexOf(cur.funcIds, e);
        cur.funcIds.splice(a, 1);
        var s = geByClass1("apps_edit_editor", t);
        if (s && s.ace && s.ace.destroy(), re(t.parentNode), 0 == cur.funcIds.length) show("apps_edit_funcs_empty"), hide("func_search_panel");
        else {
            var i = !1;
            for (var n in cur.funcIds) {
                var r = cur.funcIds[n],
                    o = ge("func_row_" + r);
                isVisible(o) && (i = !0)
            }
            if (!i) {
                var c = val(ge("func_search")),
                    p = ge("apps_edit_funcs_not_found"),
                    d = getLang("developers_no_funcs_found").split("{query}").join("<b>" + this.cleanStr(c) + "</b>");
                p.innerHTML = d, show(p)
            }
        }
        delete cur.funcsVersion[e], delete cur.funcsVersions[e], delete cur.funcsVersionsDD[e], delete cur.editedFuncs[e]
    },
    removeFuncVersion: function(e, t) {
        for (var a = cur.funcsVersions[e].versions, s = -1, i = 0; i < a.length; i++)
            if (a[i][0] == t) {
                s = a[i + 1][0];
                var n = a.slice(i + 1);
                cur.funcsVersions[e].versions = a.slice(0, i).concat(n);
                break
            }
        AppsEdit.updateVersionsDD(e), AppsEdit.putVersionCode(e, s), cur.funcsVersions[e].disable_add == t && (show("apps_edit_add_version" + e), delete cur.funcsVersions[e].disable_add), cur.funcsVersions[e].last_v == t && cur.funcsVersions[e].last_v--, cur.funcsVersions[e].versions.length <= 1 && addClass("func_row_" + e, "dev_no_func_versions"), delete cur.editedFuncs[e]
    },
    removeFuncBox: function(e) {
        if (!cur.funcSaving) {
            var t = ge("func_row_" + e),
                a = val(geByClass1("apps_edit_cont_name", t));
            a = "execute." + a;
            var s = cur.funcsVersion[e];
            if (s > 0) var i = cur.lang.developers_func_remove_confirm.replace("{v}", s).replace("{name}", clean(a));
            else var i = cur.lang.developers_remove_func_confrim.replace("%s", clean(a));
            var n = showFastBox({
                title: cur.lang.developers_remove_func,
                dark: 1
            }, i, cur.lang.developers_do_remove, function() {
                cur.funcSaving = !0;
                var t = cur.funcInfos[e],
                    a = {
                        act: "save_func",
                        aid: cur.aid,
                        hash: cur.funcsHash,
                        old_name: t.name
                    };
                cur.funcsVersion[e] > 0 && (a.act = "a_remove_func_version", a.v = s, AppsEdit.removeFuncVersion(e, s)), ajax.post("editapp", a, {
                    onDone: function(t, a, i) {
                        s > 0 || AppsEdit.removeFunc(e), cur.funcSaving = !1
                    },
                    onFail: function(e, t) {
                        cur.funcSaving = !1
                    }
                }), n.hide()
            }, getLang("global_cancel"))
        }
    },
    initVersionDropdown: function(e) {
        cur.verDD || (cur.verDD = {}), ge("apps_edit_const_v_" + e).value = cur.lastVersion, cur.verDD[e] = new Dropdown(ge("apps_edit_const_v_" + e), cur.versions, {
            width: 118,
            big: 1,
            selectedItem: cur.lastVersion
        })
    },
    saveFunc: function(e, t, a) {
        if (!cur.funcSaving) {
            cur.funcSaving = !0, e && lockButton(e);
            var s = cur.funcInfos[t],
                i = ge("func_row_" + t),
                n = geByClass1("apps_edit_cont_name", i),
                r = geByClass1("apps_edit_editor", i);
            if (!r || !r.ace) return unlockButton(e), void(cur.funcSaving = !1);
            var o = r.ace.getValue(),
                c = val(n),
                p = {
                    act: "save_func",
                    aid: cur.aid,
                    hash: cur.funcsHash,
                    name: c,
                    code: o,
                    old_name: s.name
                };
            if (cur.funcsVersion[t] > 0) {
                p.act = "a_save_func_version", p.func = s.name, p.v = cur.funcsVersion[t];
                for (var d = cur.funcsVersions[t].versions, u = 0; u < d.length; u++)
                    if (d[u][0] == cur.funcsVersion[t]) {
                        cur.funcsVersions[t].versions[u][1] = o;
                        break
                    }
            } else cur.funcInfos[t].code = o;
            ajax.post("editapp", p, {
                onDone: function(a, d) {
                    if ("name" == a) notaBene(n);
                    else if ("code" == a) {
                        var u = geByClass1("apps_edit_err_info", i);
                        u.innerHTML = d, isVisible(u.parentNode) || slideDown(u.parentNode, 150), r.ace.focus()
                    } else if ("limit" == a) showFastBox({
                        title: cur.lang.box_error,
                        dark: 1
                    }, d);
                    else {
                        p.v && -1 != p.v ? p.v == cur.funcsVersions[t].disable_add && (delete cur.funcsVersions[t].disable_add, show("apps_edit_add_version" + t)) : (s.name = c, s.code = o);
                        var _ = geByClass("apps_edit_err_info_cont", i);
                        for (var l in _) isVisible(_[l]) && slideUp(_[l], 150);
                        var v = geByClass1("apps_edit_cancel_button", i);
                        fadeOut(v, 150, function() {
                            var e = geByClass1("apps_edit_save_info", i);
                            e.innerHTML = a, fadeIn(e, 150), setTimeout(function() {
                                fadeOut(e, 150, function() {
                                    fadeIn(v, 150)
                                })
                            }, 2e3)
                        }), removeClass(i, "apps_edit_new_func"), cur.needSaveSort[t] && (i = i.parentNode, delete cur.needSaveSort[t], AppsEdit.saveFuncsPosition(i, !1, i.previousSibling))
                    }
                    e && unlockButton(e), delete cur.editedFuncs[t], cur.funcSaving = !1, cur.funcsSaveCallbacks[t] && (cur.funcsSaveCallbacks[t](), delete cur.funcsSaveCallbacks[t])
                },
                onFail: function(t, a, s) {
                    e && (unlockButton(e), cur.funcSaving = !1)
                },
                loader: a ? !0 : !1
            })
        }
    },
    cancelFuncChange: function(e) {
        if (!cur.funcSaving) {
            var t = ge("func_row_" + e),
                a = val(geByClass1("apps_edit_cont_name", t)),
                s = geByClass1("apps_edit_editor", t),
                i = "";
            s && s.ace && (i = s.ace.getValue());
            var n = cur.funcInfos[e];
            if (!n.name && n.code == i) return void AppsEdit.removeFunc(e);
            if (a == n.name && n.code == i || cur.funcsVersion[e] > 0) return void AppsEdit.switchEditFunc(e);
            var r = showFastBox({
                title: cur.lang.developers_cancel_func,
                dark: 1
            }, cur.lang.developers_cancel_func_confrim.replace("%s", clean(a)), cur.lang.developers_do_cancel, function() {
                if (n.name) {
                    s && s.ace && (s.ace.setValue(n.code.replace(/\_\!\_/g, "<!>"), 1), s.ace.focus());
                    var a = geByClass1("apps_edit_cont_name", t);
                    a.value = n.name ? n.name : "newFunc"
                } else AppsEdit.removeFunc(e);
                r.hide()
            })
        }
    },
    runFunc: function(e, t) {
        if (!isButtonLocked(t)) {
            var a = ge("func_row_" + e),
                s = geByClass1("apps_edit_editor", a),
                n = "";
            if (s && s.ace && (n = s.ace.getValue()), cur.runContProgress) return !1;
            var r = {
                    act: "a_run_method",
                    method: "execute",
                    param_code: n,
                    hash: cur.runHash
                },
                o = AppsEdit.getExecuteFields(a),
                c = geByClass1("apps_edit_params", a);
            for (i = 0; i < o.length; i++) {
                var p = o[i],
                    d = geByClass1("execute_param_" + p, c),
                    u = geByClass1("execute_field_input", d);
                r["param_" + p] = val(u)
            }
            cur.verDD[e] && (r.param_v = cur.verDD[e].val()), ajax.post("dev", r, {
                onDone: function(e) {
                    var t = parseJSON(e),
                        a = Dev.wrapObject(t, !0);
                    showFastBox({
                        title: cur.lang.developers_run_result,
                        dark: 1,
                        width: 500,
                        bodyStyle: "padding: 16px 16px 16px 2px;"
                    }, '<div id="dev_result" onmousemove="Dev.resultMove(event.target);" onmouseout="Dev.resultMove(false);">' + a + "</div>")
                },
                onFail: function(e) {
                    return e = '<pre style="white-space:normal;word-wrap:break-word;">' + clean(e.replace(/^<pre>|<\/pre>$/g, "")) + "</pre>", setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                },
                showProgress: function() {
                    lockButton(t)
                },
                hideProgress: function() {
                    unlockButton(t)
                },
                stat: ["dev.js", "dev.css"]
            })
        }
    },
    adjustHeight: function(e, t) {
        for (var a = e.renderer.lineHeight <= 1 ? 16 : e.renderer.lineHeight, s = e.getSession().getScreenLength() * a + e.renderer.scrollBar.width, i = domPN(t); !hasClass(i, "apps_edit_cont_row");) i = domPN(i);
        var n = geByClass1("apps_edit_run_wrap", i);
        s = Math.max(122, s, getSize(n)[1] + 26), setStyle(domPN(t), {
            height: s
        }), e.resize()
    },
    initEditor: function(e, t) {
        var a = ace.edit(e);
        e.ace = a, a.on("change", function() {
            AppsEdit.updateExecuteParams(a, e), cur.editedFuncs[t] = 1
        });
        var s = a.getSession();
        s.setMode("ace/mode/javascript"), s.setUseWorker(!1), this.adjustHeight(a, e), s.on("tokenizerUpdate", function() {
            AppsEdit.updateExecuteParams(a, e)
        })
    },
    getExecuteFields: function(e) {
        var t = geByClass1("apps_edit_params", e),
            a = t.childNodes,
            s = [];
        for (i = 0; i < a.length; i++) {
            var n = a[i].className;
            if (n) {
                var r = a[i].className.match(/(?:\\s|^)execute_param_(.+)(?:\\s|$)/);
                r && r[1] && s.push(r[1])
            }
        }
        return s
    },
    updateExecuteParams: function(e, t) {
        for (var a = domPN(t); !hasClass(a, "apps_edit_cont_row");) a = domPN(a);
        var s = AppsEdit.getExecuteFields(a);
        e.session.getLength();
        for (var i = ace.require("ace/token_iterator").TokenIterator, n = new i(e.getSession(), 0, 0), r = [], o = [], c = -100, p = -100, d = -1; token = n.stepForward();)
            if (d++, "identifier" == token.type && "Args" == token.value && (c = d), "punctuation.operator" == token.type && "." == token.value && (p = d), "identifier" == token.type && c == d - 2 && p == d - 1) {
                var u = token.value;
                r.indexOf(u) < 0 && (r.push(u), s.indexOf(u) < 0 && o.push(u))
            }
        var _ = [];
        for (m = 0; m < s.length; m++) {
            var u = s[m];
            r.indexOf(u) < 0 && _.push(u)
        }
        if (1 == o.length && 1 == _.length) {
            var l = _[0],
                v = o[0],
                h = geByClass1("execute_param_" + l, a);
            removeClass(h, "execute_param_" + l), addClass(h, "execute_param_" + v), geByClass1("execute_field_name", h).innerHTML = v
        } else {
            var g = geByClass1("apps_edit_params", a);
            for (m = 0; m < _.length; m++) {
                var l = _[m],
                    f = geByClass1("execute_param_" + l, g);
                g.removeChild(f)
            }
            for (var m = 0; m < o.length; m++) {
                var v = o[m],
                    w = ce("div", {
                        className: "execute_param_" + v,
                        innerHTML: "<div class='execute_field_name'>" + v + "</div><input class='text execute_field_input' type='text'>"
                    });
                g.appendChild(w)
            }
        }
        this.adjustHeight(e, t)
    },
    closeEditFunc: function() {
        if (cur.currentFunc) {
            hide("apps_edit_add_version" + cur.currentFunc);
            var e = ge("func_row_" + cur.currentFunc);
            if (e) {
                removeClass(e, "active");
                var t = geByClass1("apps_edit_cont_name", e);
                setTimeout(function() {
                    t.readOnly = !0
                }, 0);
                var a = geByClass1("apps_edit_content", e);
                slideUp(a, 150, function() {
                    AppsEdit.updateFuncsSort()
                })
            }
        }
    },
    onDestroyFuncs: function(e, t, a, s) {
        if (cur.leaving) return delete cur.leaving, void delete cur.editedFuncs;
        var i = [];
        for (var n in cur.editedFuncs) i.push(cur.funcInfos[n].name);
        if (0 == i.length) return !0;
        cur.dev_prev_sec = nav.objLoc.section, AppsEdit.switchTab("functions", {}, 1);
        var r = cur.lang.developers_func_nosaved_confirm.replace("%s", i.join(", ")),
            o = showFastBox({
                title: getLang("global_warning"),
                dark: 1
            }, r, getLang("global_continue"), function() {
                cur.leaving = !0, o.hide(), cur.onContinueCb && cur.onContinueCb()
            }, getLang("global_cancel"), function() {
                o.hide(), cur.onCancelCb && cur.onCancelCb()
            });
        return cur.onContinueCb = function() {
            nav.go(a), "editapp" == a[0] && AppsEdit.switchTab(a.section, {}, 1)
        }, !1
    },
    initFuncsSort: function() {
        cur.sorter && cur.sorter.destroy(), setTimeout(function() {
            cur.qsorterNoOperaStyle = !0, cur.qsorterRowClass = "apps_edit_sortable_row clear_fix ", cur.qsorterRowUpClass = "apps_edit_sortable_row apps_edit_sortable_row_up", cur.sorter = qsorter.init(ge("apps_edit_funcs"), {
                width: 665,
                height: 62,
                xsize: 1,
                dragEls: geByClass("apps_edit_sortable_row", ge("apps_edit_funcs")),
                canDrag: function(e) {
                    return cur.disableSort || hasClass(geByClass("apps_edit_cont_row", e)[0], "active") || cur.currentFunc ? !1 : !0
                },
                onReorder: AppsEdit.saveFuncsPosition,
                noMoveCursor: 1
            })
        }, 100)
    },
    updateFuncsSort: function() {
        var e = ge("apps_edit_funcs");
        qsorter.update(e, {
            dragEls: geByClass("apps_edit_sortable_row", e)
        })
    },
    switchEditFunc: function(e, t) {
        if (t) {
            var a = t.target;
            for (cancelEvent(t); a;) {
                if (hasClass(a, "apps_edit_ver_dd")) return;
                a = a.parentNode
            }
        }
        if (!cur.funcDDShown || e != cur.funcDDShown) {
            if (AppsEdit.closeEditFunc(), cur.initedFunctions[e] || (AppsEdit.initEditor(geByClass("apps_edit_editor", ge("func_row_" + e))[0], e), AppsEdit.initVersionDropdown(e), cur.initedFunctions[e] = 1, AppsEdit.loadFuncVersions(e), cur.funcsVersionsDD[e] = new Dropdown(ge("funcs_versions_dd" + e), [], {
                    width: 200,
                    big: 1,
                    autocomplete: !0,
                    multiselect: !1,
                    placeholder: cur.lang.developers_search_version,
                    onChange: function(t) {
                        t && AppsEdit.checkSaveFuncs(e, t)
                    },
                    onBlur: function() {
                        setTimeout(function() {
                            cur.funcDDShown = !1
                        }, 500)
                    }
                })), cur.currentFunc == e) return cur.currentFunc = null, void(cur.disableSort || removeClass("apps_edit_funcs", "apps_edit_no_sortable"));
            addClass("apps_edit_funcs", "apps_edit_no_sortable"), cur.funcsVersions[e] && !cur.funcsVersions[e].disable_add && show("apps_edit_add_version" + e), cur.currentFunc = e;
            var s = ge("func_row_" + e);
            addClass(s, "active");
            var i = geByClass1("apps_edit_cont_name", s);
            i.readOnly = !1;
            var n = geByClass1("apps_edit_content", s);
            slideDown(n, 150, function() {
                var t = geByClass1("apps_edit_editor", ge("func_row_" + e));
                t && t.ace && (AppsEdit.adjustHeight(t.ace, t), AppsEdit.updateExecuteParams(t.ace, t))
            })
        }
    },
    checkSaveFuncs: function(e, t) {
        if (cur.editedFuncs[e]) var a = new MessageBox({
            title: getLang("global_warning"),
            dark: 1
        }).content(cur.lang.developers_confirmation_sh_func).addButton(getLang("box_yes"), function() {
            cur.funcsSaveCallbacks[e] = function() {
                delete cur.editedFuncs[e], AppsEdit.putVersionCode(e, t)
            }, AppsEdit.saveFunc(!1, e, 1), a.hide()
        }).addButton(getLang("box_no"), function() {
            AppsEdit.putVersionCode(e, t), a.hide()
        }, "gray").show();
        else AppsEdit.putVersionCode(e, t)
    },
    loadFuncVersions: function(e) {
        if (!cur.funcsVersions[e]) {
            var t = cur.funcInfos[e];
            ajax.post("al_apps_edit.php", {
                act: "a_get_func_versions",
                func: t.name,
                aid: cur.aid
            }, {
                onDone: function(t) {
                    t || (t = {
                        last_v: 1,
                        versions: [
                            [-1, -1]
                        ]
                    }), cur.funcsVersions[e] = {
                        last_v: t.last_v,
                        versions: t.versions
                    }, AppsEdit.updateVersionsDD(e), cur.funcsVersionsDD[e].val(-1);
                    var a = ge("func_row_" + e);
                    addClass(a, "dev_func_loaded"), t.versions.length <= 1 ? addClass(a, "dev_no_func_versions") : show("apps_edit_add_version" + e)
                }
            })
        }
    },
    addFuncVersion: function(e, t) {
        function a(t) {
            s.hide(), hasClass(t, "secondary") ? (delete cur.editedFuncs[e], AppsEdit.addFuncVersion(e, 1)) : (cur.funcsSaveCallbacks[e] = function() {
                delete cur.editedFuncs[e], AppsEdit.addFuncVersion(e, 1)
            }, AppsEdit.saveFunc(!1, e, 1))
        }
        if (!(!t && cur.funcsSaveCallbacks[e] || cur.funcsVersions[e].disable_add))
            if (cur.editedFuncs[e]) var s = new MessageBox({
                title: getLang("global_warning"),
                dark: 1
            }).content(cur.lang.developers_confirmation_sh_func).addButton(getLang("box_yes"), a).addButton(getLang("box_no"), a, "gray").show();
            else {
                cur.funcsVersions[e].last_v++;
                var i = cur.funcsVersions[e].last_v,
                    n = AppsEdit.getFuncVersionCode(e, cur.funcsVersions[e].versions[0][0]);
                cur.funcsVersions[e].versions.unshift([i, n]), AppsEdit.updateVersionsDD(e), AppsEdit.putVersionCode(e, i), removeClass("func_row_" + e, "dev_no_func_versions"), hide("apps_edit_add_version" + e), cur.funcsVersions[e].disable_add = i
            }
    },
    saveFuncsPosition: function() {
        var e = [],
            t = arguments;
        if (hasClass(geByClass1("apps_edit_cont_row", t[0]), "apps_edit_new_func")) {
            var a = parseInt(t[0].id.replace("func_sort", ""));
            return void(cur.needSaveSort[a] = !0)
        }
        t[2] && 1 == t[2].nodeType && hasClass(geByClass1("apps_edit_cont_row", t[2]), "apps_edit_new_func") && (t[2] = t[2].previousSibling);
        for (var s in t) {
            if (t[s] && 1 == t[s].nodeType) var i = geByClass1("apps_edit_cont_name", t[s]).value;
            else i = null;
            e.push(i)
        }
        ajax.post("al_apps_edit.php", {
            act: "a_resort_funcs",
            aid: cur.aid,
            list: e.join(",")
        }, {
            onDone: function() {}
        })
    },
    showVersionsDD: function(e) {
        show("apps_edit_ver_dd" + e), cur.funcsVersionsDD[e].focus(), cur.funcDDShown = e, cur.funcsVersions[e] && !cur.funcsVersions[e].disable_add && show("apps_edit_add_version" + e)
    },
    updateVersionsDD: function(e) {
        for (var t = cur.funcsVersions[e].versions, a = [], s = 0; s < t.length; s++) a.push([t[s][0], cur.lang.developers_version_pref + " " + Math.abs(t[s][0])]);
        cur.funcsVersionsDD[e].select.clear(), cur.funcsVersionsDD[e].setData(a)
    },
    getFuncVersionCode: function(e, t) {
        if (-1 == t) var a = cur.funcInfos[e].code.replace(/\_\!\_/g, "<!>");
        else
            for (var s = cur.funcsVersions[e].versions, i = 0; i < s.length; i++)
                if (s[i][0] == t) {
                    var a = s[i][1];
                    break
                } return a
    },
    putVersionCode: function(e, t) {
        var a = AppsEdit.getFuncVersionCode(e, t); - 1 == t ? ge("func_remove_btn" + e).innerHTML = cur.lang.developers_func_remove : ge("func_remove_btn" + e).innerHTML = cur.lang.developers_remove_func_version,
            cur.funcsVersion[e] = parseInt(t);
        var s = geByClass("apps_edit_editor", ge("func_row_" + e))[0].ace;
        s.setValue(a), delete cur.editedFuncs[e], delete cur.funcsSaveCallbacks[e], cur.funcsVersionsDD[e].val(t)
    },
    switchEditActivity: function(e, t) {
        if (void 0 === t && (t = 150), cur.currentActivity) {
            var a = ge("activity_row_" + cur.currentActivity);
            if (a) {
                removeClass(a, "active");
                var s = geByClass1("apps_edit_content", a);
                slideUp(s, t)
            }
        }
        if (cur.currentActivity == e) return void(cur.currentActivity = null);
        cur.currentActivity = e;
        var i = ge("activity_row_" + e);
        addClass(i, "active");
        var n = geByClass1("apps_edit_content", i);
        slideDown(n, t, function() {
            var t = geByClass1("apps_edit_editor", ge("func_row_" + e));
            t && t.ace && AppsEdit.adjustHeight(t.ace, t)
        })
    },
    switchEditRequest: function(e, t) {
        if (void 0 === t && (t = 150), cur.currentRequest) {
            var a = ge("request_row_" + cur.currentRequest);
            if (a) {
                removeClass(a, "active");
                var s = geByClass1("apps_edit_cont_name", a);
                setTimeout(function() {
                    s.readOnly = !0
                }, 0);
                var i = geByClass1("apps_edit_content", a);
                slideUp(i, t)
            }
        }
        if (cur.currentRequest == e) return void(cur.currentRequest = null);
        cur.currentRequest = e;
        var n = ge("request_row_" + e);
        addClass(n, "active");
        var r = geByClass1("apps_edit_cont_name", n);
        r && (r.readOnly = !1);
        var o = geByClass1("apps_edit_content", n);
        slideDown(o, t, function() {
            var t = geByClass1("apps_edit_editor", ge("func_row_" + e));
            t && t.ace && AppsEdit.adjustHeight(t.ace, t)
        })
    },
    collectRequestData: function(e) {
        var t = ge("request_row_" + e);
        return t ? {
            name: trim(val("request_name_" + e)),
            text_m: trim(val("request_text_m_" + e)),
            text_f: trim(val("request_text_f_" + e)),
            text_mul: trim(val("request_text_mul_" + e)),
            button: trim(val("request_accept_text_" + e)),
            response: !!isChecked("request_response_" + e)
        } : {}
    },
    collectActivityData: function(e) {
        var t = ge("activity_row_" + e);
        return t ? {
            name: trim(val("activity_text_name_" + e)),
            text_m: trim(val("activity_text_m_" + e)),
            text_f: trim(val("activity_text_f_" + e)),
            points: parseInt(trim(val("activity_text_points_" + e)))
        } : {}
    },
    checkActivityFields: function(e) {
        var t = this.collectActivityData(e);
        return t.name ? t.text_m ? t.text_f ? t.points ? (t.response = t.response ? 1 : 0, t) : (notaBene(domPN(ge("activity_text_points_" + e))), elfocus("activity_text_mul_" + e), !1) : (notaBene(domPN(ge("activity_text_f_" + e))), elfocus("activity_text_f_" + e), !1) : (notaBene(domPN(ge("activity_text_m_" + e))), elfocus("activity_text_m_" + e), !1) : (notaBene("activity_name_" + e), t.name && this.showRequestMsg(ge("activity_row_" + e), !0, getLang("apps_wrong_activity_name")), !1)
    },
    checkRequestFields: function(e) {
        var t = this.collectRequestData(e);
        return t.name.match(/^([a-zA-Z0-9_]+)$/) ? t.text_m ? t.text_f ? t.text_mul ? t.button ? (t.response = t.response ? 1 : 0, t) : (notaBene("request_accept_text_" + e), !1) : (notaBene(domPN(ge("request_text_mul_" + e))), elfocus("request_text_mul_" + e), !1) : (notaBene(domPN(ge("request_text_f_" + e))), elfocus("request_text_f_" + e), !1) : (notaBene(domPN(ge("request_text_m_" + e))), elfocus("request_text_m_" + e), !1) : (notaBene("request_name_" + e), t.name && this.showRequestMsg(ge("request_row_" + e), !0, getLang("apps_wrong_request_name")), !1)
    },
    requestNotModified: function(e) {
        var t = cur.requests[e] || this.defaultRequestData(),
            a = this.collectRequestData(e);
        for (var s in a)
            if (t[s] !== a[s]) return !1;
        return !0
    },
    activityNotModified: function(e) {
        if (cur.activityChanged = cur.activityChanged || {}, !cur.activities[e] && !cur.activityChanged[e]) return !0;
        var t = cur.activities[e],
            a = this.collectActivityData(e);
        if (!t) return !1;
        for (var s in a)
            if (t[s] !== a[s]) return !1;
        return !0
    },
    defaultRequestData: function() {
        return {
            name: "newRequest",
            text_m: getLang("apps_sent_request_m"),
            text_f: getLang("apps_sent_request_f"),
            text_mul: getLang("apps_sent_request_mul"),
            button: getLang("apps_request_button_accept"),
            response: !1
        }
    },
    defaultActivityData: function() {
        var e = unclean(cur.activitySamples).split("<#>");
        return e = e[Math.floor(Math.random() * e.length)].split("<!>"), {
            name: e[0],
            text_m: e[1],
            text_f: e[2],
            points: 10
        }
    },
    updateRemainingPoints: function() {
        var e = 0;
        each(geByClass("apps_edit_activity_points"), function() {
            e += parseInt(val(this)) || 0
        });
        var t = Math.max(cur.maxTotalPoints - e, 0),
            a = langNumeric(t, cur.lang.apps_activities_edit_points_remain);
        return each(geByClass("apps_edit_points_remain_text"), function() {
            this.innerHTML = a
        }), cur.activityRemainPoints = t, cur.maxTotalPoints - e
    },
    toggleRequestsBtn: function() {
        toggle("add_requests_btn", geByClass("apps_edit_cont_row", ge("apps_edit_requests")).length < cur.maxRequests)
    },
    toggleActivitiesBtn: function() {
        toggle("add_activities_btn", geByClass("apps_edit_cont_row", ge("apps_edit_activities")).length < cur.maxActivities)
    },
    requestInsertRow: function(e, t) {
        if (e && t) {
            var a = geByClass("apps_edit_cont_row", t),
                s = parseInt(e.id.replace("request_row_", "")),
                i = !1;
            for (var n in a) {
                var r = parseInt(a[n].id.replace("request_row_", ""));
                if (s > r) {
                    i = a[n];
                    break
                }
            }
            i ? t.insertBefore(e, i) : t.appendChild(e)
        }
    },
    activityInsertRow: function(e, t) {
        if (e && t) {
            var a = geByClass("apps_edit_cont_row", t),
                s = parseInt(e.id.replace("activity_row_", "")),
                i = !1;
            for (var n in a) {
                var r = parseInt(a[n].id.replace("activity_row_", ""));
                if (s > r) {
                    i = a[n];
                    break
                }
            }
            i ? t.insertBefore(e, i) : t.appendChild(e)
        }
    },
    onActivityInputsChange: function(e, t) {
        var a = gpeByClass("apps_edit_cont_row", e);
        if (a) {
            var s = a.getAttribute("data-id");
            s > 2e9 && (cur.activityChanged = cur.activityChanged || {}, cur.activityChanged[s] = !0);
            var i = geByClass1("apps_edit_activity_name", a),
                n = geByClass1("apps_edit_activity_points", a),
                r = geByClass1("apps_edit_activity_title_name", a),
                o = geByClass1("apps_edit_activity_title_points", a),
                c = parseInt(val(n)) || 0;
            (c > cur.maxPointsPerActivity || 0 > c) && val(n, Math.max(0, Math.min(cur.maxPointsPerActivity, c))), clearTimeout(cur._activityInputChangeTO), cur._activityInputChangeTO = setTimeout(function() {
                r.innerHTML = clean(trim(i.value) || getLang("apps_activities_unnamed")), o.innerHTML = clean(langNumeric(trim(n.value) || 0, cur.lang.apps_edit_activities_points) || "")
            }, 50)
        }
    },
    addActivity: function() {
        hide("apps_edit_activity_empty"), hide("apps_edit_activity_not_found"), cur.activityId = (cur.activityId || 2e9) + 1;
        var e = ge("apps_edit_activities_new"),
            t = cur.activityId,
            a = this.rowFromActivity(t, this.defaultActivityData());
        AppsEdit.requestInsertRow(a, e), show(e), AppsEdit.toggleRequestsBtn(), AppsEdit.switchEditRequest(t), AppsEdit.updateRemainingPoints(), geByClass1("apps_edit_activity_name", a).select(), re(geByClass1("apps_edit_activity_delete_btn", a))
    },
    addRequest: function() {
        hide("apps_edit_requests_empty"), hide("apps_edit_requests_not_found"), cur.requestId = (cur.requestId || 2e9) + 1;
        var e = ge("apps_edit_requests_new"),
            t = cur.requestId,
            a = this.rowFromRequest(t, this.defaultRequestData());
        AppsEdit.requestInsertRow(a, e), show(e), AppsEdit.toggleRequestsBtn(), AppsEdit.switchEditRequest(t), geByClass1("apps_edit_cont_name", a).focus()
    },
    showRequestMsg: function(e, t, a) {
        var s = geByClass1("apps_edit_cancel_button", e);
        return fadeOut(s, 150, function() {
            var i = geByClass1("apps_edit_save_info", e);
            t && (a = '<span class="save_error">' + a + "</span>"), i.innerHTML = a, fadeIn(i, 150), setTimeout(function() {
                fadeOut(i, 150, fadeIn.pbind(s, 150))
            }, 2e3)
        }), !0
    },
    showRequestUserTT: function(e, t) {
        var a = getLang(t || "apps_edit_request_user_name");
        showTooltip(e, {
            text: '<div class="apps_edit_bottom_tt_pointer"></div>' + a,
            className: "apps_edit_tt user",
            slide: 15,
            shift: [1, 9, 9]
        })
    },
    showActivityUserTT: function(e, t, a) {
        var s = getLang(t || "apps_edit_request_user_name");
        showTooltip(e, {
            text: '<div class="apps_edit_bottom_tt_pointer"></div>' + s,
            className: "apps_edit_tt user",
            slide: 15,
            shift: a || [1, 9, 9]
        })
    },
    showRequestStatusTT: function(e, t) {
        var a = getLang("apps_edit_request_created"),
            s = cur.requests[t];
        if (s) {
            switch (s.status) {
                case 0:
                    a = getLang("apps_edit_request_created");
                    break;
                case 1:
                    a = getLang("apps_edit_request_accepted");
                    break;
                case 2:
                    a = getLang("apps_edit_request_declined")
            }
            window.tooltips && tooltips.hideAll(), showTooltip(e, {
                text: '<div class="apps_edit_bottom_tt_pointer"></div>' + a,
                className: "apps_edit_tt user",
                slide: 15,
                shift: [17, 15, 15]
            })
        }
    },
    showActivityStatusTT: function(e, t) {
        var a = getLang("apps_edit_activity_created"),
            s = cur.activities[t];
        if (s) {
            switch (s.status) {
                case 0:
                    a = getLang("apps_edit_activity_created");
                    break;
                case 1:
                    a = getLang("apps_edit_activity_accepted");
                    break;
                case 2:
                    a = getLang("apps_edit_activity_declined")
            }
            window.tooltips && tooltips.hideAll(), showTooltip(e, {
                text: '<div class="apps_edit_bottom_tt_pointer"></div>' + a,
                className: "apps_edit_tt user apps_edit_tt_left",
                slide: 15,
                forcetoleft: !0,
                shift: [207, 15, 15]
            })
        }
    },
    rowFromRequest: function(e, t) {
        var a = "";
        switch (t.status) {
            case 0:
                a = "review";
                break;
            case 1:
                a = "accepted";
                break;
            case 2:
                a = "declined"
        }
        var s = {
            id: e,
            row_class: a,
            name: t.name,
            text_m: t.text_m,
            text_f: t.text_f,
            text_mul: t.text_mul,
            button: t.button,
            check_class: t.response ? " on" : "",
            disabled_attr: 1 == t.status ? ' disabled="disabled"' : "",
            disabled_class: 1 == t.status ? " disabled" : ""
        };
        return se(rs(cur.requestRowTpl, s))
    },
    rowFromActivity: function(e, t, a) {
        var s = "";
        switch (t.status) {
            case 0:
                s = "review";
                break;
            case 1:
                s = "accepted";
                break;
            case 2:
                s = "declined"
        }
        var i = {
            id: e,
            row_class: s,
            name: t.name,
            text_m: t.text_m,
            text_f: t.text_f,
            points: t.points,
            points_text: langNumeric(t.points, cur.lang.apps_edit_activities_points),
            check_class: t.response ? " on" : "",
            disabled_attr: 1 == t.status ? ' disabled="disabled"' : "",
            disabled_class: 1 == t.status ? " disabled" : "",
            id_hide_style: a ? "" : "display: none",
            points_label_hide_style: a ? "" : "display: none",
            disabled_points_attr: 1 == t.status ? " " : "",
            disabled_points_class: 1 == t.status ? " " : ""
        };
        return se(rs(cur.activityRowTpl, i))
    },
    saveActivity: function(e, t) {
        var a = this.checkActivityFields(t);
        if (a && !cur.activitySaving) {
            cur.activitySaving = !0, e && lockButton(e);
            var s = ge("activity_row_" + t),
                i = extend({
                    act: "save_activity",
                    aid: cur.aid,
                    hash: cur.activityHash,
                    activity_id: t
                }, a);
            ajax.post("editapp", i, {
                onDone: function(e, a, i) {
                    var n = cur.activities[e],
                        r = AppsEdit.activityRowsCnt();
                    cur.activities[e] = a;
                    var o = AppsEdit.rowFromActivity(e, a, !0),
                        c = domPN(s),
                        p = ge("apps_edit_activities_status" + a.status);
                    c.id == p.id && n && n.status == a.status ? c.replaceChild(o, s) : (AppsEdit.removeActivity(t, !0), AppsEdit.activityInsertRow(o, p), show(p)), cur.currentActivity = null, t == e ? AppsEdit.switchEditActivity(e, 0) : 1 == r && AppsEdit.showActivityStatusTT(geByClass1("apps_edit_cont_icon", o), e), AppsEdit.showRequestMsg(o, !1, i), AppsEdit.updateRemainingPoints()
                },
                onFail: AppsEdit.showRequestMsg.pbind(s, !0),
                hideProgress: function() {
                    e && (unlockButton(e), cur.activitySaving = !1)
                }
            })
        }
    },
    toggleActivity: function(e, t) {
        var a = gpeByClass("apps_edit_cont_row", e),
            s = geByClass1("apps_edit_content", a);
        toggle(s)
    },
    saveRequest: function(e, t) {
        var a = this.checkRequestFields(t);
        if (a && !cur.requestSaving) {
            cur.requestSaving = !0, e && lockButton(e);
            var s = ge("request_row_" + t),
                i = extend({
                    act: "save_request",
                    aid: cur.aid,
                    hash: cur.requestHash,
                    request_id: t
                }, a);
            ajax.post("editapp", i, {
                onDone: function(e, a, i) {
                    var n = cur.requests[e],
                        r = AppsEdit.requestRowsCnt();
                    cur.requests[e] = a;
                    var o = AppsEdit.rowFromRequest(e, a),
                        c = domPN(s),
                        p = ge("apps_edit_requests_status" + a.status);
                    c.id == p.id && n && n.status == a.status ? c.replaceChild(o, s) : (AppsEdit.removeRequest(t, !0), AppsEdit.requestInsertRow(o, p), show(p)), cur.currentRequest = null, t == e ? AppsEdit.switchEditRequest(e, 0) : 1 == r && AppsEdit.showRequestStatusTT(geByClass1("apps_edit_cont_icon", o), e), AppsEdit.showRequestMsg(o, !1, i)
                },
                onFail: AppsEdit.showRequestMsg.pbind(s, !0),
                hideProgress: function() {
                    e && (unlockButton(e), cur.requestSaving = !1)
                }
            })
        }
    },
    correctActivityPointsInput: function(e) {
        var t = parseInt(val(e)) || 0;
        val(e, t)
    },
    cancelActivityChange: function(e) {
        if (!cur.activitySaving) {
            var t = ge("activity_row_" + e),
                a = cur.activities[e],
                s = geByClass1("apps_edit_content", t),
                i = geByClass1("apps_edit_activity_title_name", t);
            if (AppsEdit.activityNotModified(e)) return void(a ? toggle(s) : AppsEdit.removeActivity(e));
            var n = showFastBox({
                title: getLang("apps_cancel_activity"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("apps_cancel_activity_confrim"), getLang("developers_do_cancel"), function() {
                a ? ((ge("activity_text_m_" + e) || {}).value = unclean(a.text_m), (ge("activity_text_f_" + e) || {}).value = unclean(a.text_f), (ge("activity_text_name_" + e) || {}).value = unclean(a.name), val("activity_points_" + e, a.points), val(i, trim(a.name) || getLang("apps_activities_unnamed")), toggle(s)) : AppsEdit.removeActivity(e), n.hide()
            })
        }
    },
    cancelRequestChange: function(e) {
        if (!cur.requestSaving) {
            var t = ge("request_row_" + e),
                a = val(geByClass1("apps_edit_cont_name", t));
            if (request = cur.requests[e], AppsEdit.requestNotModified(e)) return void(request ? AppsEdit.switchEditRequest(e) : AppsEdit.removeRequest(e));
            var s = showFastBox({
                title: getLang("apps_cancel_request"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("apps_cancel_request_confrim").replace("%s", clean(a)), getLang("developers_do_cancel"), function() {
                request ? (val("request_name_" + e, request.name), val("request_text_m_" + e, request.text_m), val("request_text_f_" + e, request.text_f), val("request_text_mul_" + e, request.text_mul), val("request_accept_text_" + e, request.button), checkbox("request_response_" + e, request.response)) : AppsEdit.removeRequest(e), s.hide()
            })
        }
    },
    activityRowsCnt: function(e) {
        e || (e = ge("apps_edit_activities"));
        var t = e && geByClass("apps_edit_cont_row", e) || [];
        return t.length
    },
    requestRowsCnt: function(e) {
        e || (e = ge("apps_edit_requests"));
        var t = e && geByClass("apps_edit_cont_row", e) || [];
        return t.length
    },
    removeRequest: function(e, t) {
        var a = ge("request_row_" + e),
            s = domPN(a);
        re(a);
        var i = AppsEdit.requestRowsCnt(ge("apps_edit_requests")),
            n = AppsEdit.requestRowsCnt(s);
        n || hide(s), t || (delete cur.requests[e], AppsEdit.toggleRequestsBtn(), i || show("apps_edit_requests_empty"))
    },
    removeActivity: function(e, t) {
        var a = ge("activity_row_" + e),
            s = domPN(a);
        re(a);
        var i = AppsEdit.activityRowsCnt(ge("apps_edit_requests")),
            n = AppsEdit.activityRowsCnt(s);
        n || hide(s), t || (delete cur.activities[e], AppsEdit.toggleActivitiesBtn(), i || show("apps_edit_activities_empty"))
    },
    removeActivityBox: function(e) {
        if (cur.activitySaving) return !1;
        var t = cur.activities[e];
        if (AppsEdit.activityNotModified(e) && !t) return void AppsEdit.removeActivity(e);
        var a = ge("activity_row_" + e),
            s = val(geByClass1("apps_edit_cont_name", a)),
            i = showFastBox({
                title: getLang("apps_remove_activity"),
                dark: 1
            }, getLang("apps_remove_activity_confirm").replace("%s", clean(s)), getLang("developers_do_remove"), function() {
                t ? (cur.activitySaving = !0, ajax.post("editapp", {
                    act: "delete_activity",
                    aid: cur.aid,
                    hash: cur.activityHash,
                    activity_id: e
                }, {
                    onDone: AppsEdit.removeActivity.pbind(e, !1),
                    onFail: AppsEdit.showRequestMsg.pbind(a, !0),
                    hideProgress: function() {
                        cur.activitySaving = !1
                    }
                })) : AppsEdit.removeActivity(e), i.hide()
            }, getLang("global_cancel"))
    },
    removeRequestBox: function(e) {
        if (cur.requestSaving) return !1;
        var t = cur.requests[e];
        if (AppsEdit.requestNotModified(e) && !t) return void AppsEdit.removeRequest(e);
        var a = ge("request_row_" + e),
            s = val(geByClass1("apps_edit_cont_name", a)),
            i = showFastBox({
                title: getLang("apps_remove_request"),
                dark: 1
            }, getLang("apps_remove_request_confrim").replace("%s", clean(s)), getLang("developers_do_remove"), function() {
                t ? (cur.requestSaving = !0, ajax.post("editapp", {
                    act: "delete_request",
                    aid: cur.aid,
                    hash: cur.requestHash,
                    request_id: e
                }, {
                    onDone: AppsEdit.removeRequest.pbind(e, !1),
                    onFail: AppsEdit.showRequestMsg.pbind(a, !0),
                    hideProgress: function() {
                        cur.requestSaving = !1
                    }
                })) : AppsEdit.removeRequest(e), i.hide()
            }, getLang("global_cancel"))
    },
    updateList: function(e, t) {
        return 27 == e.keyCode ? this.resetList(t) : (clearTimeout(cur.searchTimeout), void setTimeout(function() {
            var e = trim(t.value);
            this.searchList(e)
        }.bind(this), 10))
    },
    cleanStr: function(e) {
        return e.replace(/([<>&#]*)/g, "")
    },
    resetList: function(e) {
        return val(e, ""), AppsEdit.searchList(!1)
    },
    searchList: function(e) {
        e ? (e = e.toLowerCase(), cur.disableSort = !0, addClass("apps_edit_funcs", "apps_edit_no_sortable")) : (delete cur.disableSort, removeClass("apps_edit_funcs", "apps_edit_no_sortable")), toggle("apps_edit_reset_search", !!e);
        var t = ge("apps_edit_funcs_not_found"),
            a = getLang("developers_no_funcs_found"),
            s = ge("apps_edit_funcs"),
            i = geByClass("apps_edit_sortable_row", s),
            n = 0;
        for (var r in i) {
            var o = i[r];
            if (e) {
                var c = val(geByClass1("apps_edit_cont_name", o));
                c = c.toLowerCase(), c.indexOf(e) > -1 ? (show(o), n++) : hide(o)
            } else show(o), n++
        }
        if (e && !n) {
            var p = a.split("{query}").join("<b>" + this.cleanStr(e) + "</b>");
            t.innerHTML = p, show(t)
        } else hide(t)
    },
    uInit: function(e) {
        AppsEdit.uInitScroll(), extend(cur, {
            opts: e,
            searchInp: ge("apps_edit_search_inp"),
            index: {},
            cache: {},
            lang: extend(cur.lang || {}, e.lang)
        });
        for (var t = [], a = ["Top", "Bottom", "Left", "Right"], s = 0; 4 > s; ++s) t.push("padding" + a[s]);
        var i = extend({
            margin: 0
        }, getStyle(cur.searchInp, t));
        placeholderSetup(cur.searchInp, {
            back: !0,
            pad: i,
            phColor: "#929eb0"
        }), elfocus(cur.searchInp), cur.destroy.push(function(e) {
            e == cur && AppsEdit.uDeinitScroll()
        }), AppsEdit.uIndex(cur.opts.data)
    },
    uInitScroll: function() {
        AppsEdit.scrollnode = browser.msie6 ? pageNode : window, AppsEdit.uDeinitScroll(), addEvent(AppsEdit.scrollnode, "scroll", AppsEdit.uScroll), addEvent(window, "resize", AppsEdit.uScroll)
    },
    uDeinitScroll: function() {
        removeEvent(AppsEdit.scrollnode, "scroll", AppsEdit.uScroll), removeEvent(window, "resize", AppsEdit.uScroll)
    },
    uScroll: function() {
        if (!browser.mobile) {
            var e = document.documentElement,
                t = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                a = scrollGetY(),
                s = ge("apps_edit_users_more");
            isVisible(s) && a + t > s.offsetTop && s.onclick()
        }
    },
    uIndex: function(e, t) {
        cur.opts.data = e, cur.cache = {
            all: []
        };
        for (var a = 0, s = e.length; s > a; ++a) cur.cache.all.push(a);
        cur.index = new vkIndexer(cur.cache.all, function(e) {
            return cur.opts.data[e][2]
        }, t ? function() {} : AppsEdit.uSearchUpdate)
    },
    uResetSearch: function() {
        val(cur.searchInp, ""), elfocus(cur.searchInp), AppsEdit.uSearchUpdate()
    },
    uSearch: function() {
        var e = trim(val(cur.searchInp));
        return e.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) ? AppsEdit.uEditAdmin(AppsEdit.uGetAddr(e)) : void 0
    },
    uGetAddr: function(e) {
        var t = e.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/(.+)$/),
            a = t[4].substr(t[4].indexOf("#") + 1).replace(/^[\/\!]*/, "");
        return (t = a.match(/^profile\.php\?id=(\d+)/)) ? a = intval(t[1]) : (-1 !== a.indexOf("?") && (a = a.substr(0, a.indexOf("?"))), (t = a.match(/^id(\d+)/)) && (a = intval(t[1]))), a
    },
    uSearchUpdate: function() {
        if ("apps_edit_search_inp" == (cur.searchInp || {}).id) {
            var e = trim(val(cur.searchInp));
            toggle("apps_edit_reset_search", !!e), AppsEdit.uShowMore(!0)
        }
    },
    uAddUpdate: function(el) {
        var q = trim(val(el));
        if (!q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) || q === cur.lastUserQ) return !1;
        cur.lastUserQ = q;
        var addr = AppsEdit.uGetAddr(q);
        clearTimeout(cur.addAdminTO), cur.addAdminTO = setTimeout(function() {
            ajax.post("/al_apps_edit.php", {
                act: "edit_admin_box",
                id: cur.opts.aid,
                addr: addr
            }, {
                showProgress: function() {
                    el && addClass(domPN(el), "loading")
                },
                hideProgress: function() {
                    el && removeClass(domPN(el), "loading")
                },
                onFail: function(e) {
                    var t = ge("apps_edit_user_info");
                    return t ? (ge("apps_edit_add_user_error").innerHTML = e, show("apps_edit_add_user_error"), hide(t), curBox().setOptions({
                        hideButtons: !0
                    }), !0) : !1
                },
                onDone: function(title, html, js) {
                    var content = ge("apps_edit_user_info");
                    if (!content) return !1;
                    hide("apps_edit_add_user_error"), content.innerHTML = html, show(content);
                    var box = curBox();
                    js && eval(js)
                }
            })
        }.bind(this), 500)
    },
    uUpdateSummary: function() {
        !trim(val(cur.searchInp)) && isVisible("apps_edit_summary") && (cur.opts.all_count > 0 ? val("apps_edit_summary", cur.opts.all_count) : hide("apps_edit_summary"))
    },
    uShowMore: function(e) {
        var t = cur.opts.data,
            a = trim(val(cur.searchInp)),
            s = !1;
        if (t) {
            var i = cur.cache.all;
            if (e) {
                if (AppsEdit.uUpdateSummary(), cur.qShown === a) return;
                cur.qShown = a
            }
            if (a)
                if (a.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
                    var n = AppsEdit.uGetAddr(a);
                    i = [];
                    for (var r = 0, o = t.length; o > r; ++r)(t[r][0] == n || t[r][1] == "/" + n) && i.push(r)
                } else {
                    if (i = cur.cache["_" + a], void 0 === i) {
                        var c = cur.index.search(a),
                            p = {};
                        i = [];
                        for (var r = 0, o = c.length; o > r; ++r) p[c[r]] || (p[c[r]] = !0, i.push(c[r]));
                        i.sort(function(e, t) {
                            return e - t
                        }), cur.cache["_" + a] = i
                    }
                    s = AppsEdit.uGetHighlight(a)
                }
            var d = i.length,
                u = ge("apps_edit_users_rows"),
                _ = ge("apps_edit_users_more");
            if (!d) return hide(_, "apps_edit_summary"), void val(u, AppsEdit.uGenEmpty(getLang("apps_no_admin_found")));
            for (var l = e ? 0 : u.childNodes.length, v = Math.min(d, l + 20), h = [], r = l; v > r; ++r) {
                var g = t[i[r]],
                    f = (g || {})[2];
                g && (s && (f = f.replace(s.re, s.val)), h.push(AppsEdit.uGenRow(g, f)))
            }
            e ? (val(u, h.join("")), show("apps_edit_summary"), a ? val("apps_edit_summary", d) : AppsEdit.uUpdateSummary()) : u.innerHTML += h.join(""), toggle(_, d > v)
        }
    },
    uGetHighlight: function(e) {
        var t = cur.index,
            a = t.delimiter,
            s = t.trimmer;
        return e += " " + (parseLatin(e) || ""), e = escapeRE(e).replace(/&/g, "&amp;"), e = e.replace(s, "").replace(a, "|"), {
            re: new RegExp("(" + e + ")", "gi"),
            val: '<span class="apps_edit_user_highlight">$1</span>'
        }
    },
    uGenEmpty: function(e) {
        return '<div class="apps_edit_users_none">' + e + "</div>"
    },
    uGenRow: function(e, t) {
        var a = e[0],
            s = e[1],
            i = e[3],
            n = (e[4], e[5]),
            r = cur.opts.levels[n] || "",
            o = "",
            c = t || e[2],
            p = cur.qShown;
        return t || !p || p.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/) || (highlight = AppsEdit.uGetHighlight(p), c = c.replace(highlight.re, highlight.val)), cur.opts.main_admin && cur.mainAdminChanging ? 3 != n ? o += '<a class="apps_edit_user_action" onclick="AppsEdit.uChangeMainAdmin(' + a + ')">' + getLang("apps_main_admin_promote") + "</a>" : o = '<a class="apps_edit_user_action" onclick="AppsEdit.uMainAdmin(true)">' + getLang("apps_main_admin_change_cancel") + "</a>" : 0 == n ? o = '<a class="apps_edit_user_action" onclick="AppsEdit.uEditAdmin(' + a + ')">' + getLang("apps_add_admin") + "</a>" : 3 != n ? (o += '<a class="apps_edit_user_action" onclick="AppsEdit.uEditAdmin(' + a + ')">' + getLang("Edit") + "</a>", o += ' | <a class="apps_edit_user_action" onclick="AppsEdit.uRemoveAdmin(' + a + ')">' + getLang("apps_edit_admin_demote") + "</a>") : cur.opts.main_admin && cur.opts.all_count > 1 && (o = '<a class="apps_edit_user_action" onclick="AppsEdit.uMainAdmin()">' + getLang("apps_main_admin_change") + "</a>"), rs(cur.opts.template, {
            oid: a,
            name: c,
            photo: i,
            href: s,
            level: r,
            actions: o
        })
    },
    uShowMessage: function(e) {
        return showDoneBox(e), !0
    },
    uEditAdmin: function(e) {
        showBox("al_apps_edit.php", {
            act: "edit_admin_box",
            id: cur.opts.aid,
            addr: e
        }, {
            onFail: AppsEdit.uShowMessage,
            params: {
                width: 490
            }
        })
    },
    uAddAdmin: function() {
        cur.lastUserQ = "", showBox("al_apps_edit.php", {
            act: "add_admin_box",
            id: cur.opts.aid
        }, {
            onFail: AppsEdit.uShowMessage,
            params: {
                hideButtons: !0,
                width: 490
            }
        })
    },
    uRemoveAdmin: function(e) {
        var t = curBox();
        return t && t.hide(), showBox("al_apps_edit.php", {
            act: "edit_admin_box",
            id: cur.opts.aid,
            addr: e,
            remove: 1
        }, {
            onFail: AppsEdit.uShowMessage,
            params: {
                width: 490
            }
        }), !1
    },
    uSelAdminLevel: function(e, t, a) {
        radiobtn(e, t, a);
        var s = ge("apps_admin_partial_level_desc").innerHTML.replace(/^\s+|[\s:]+$/g, "");
        t ? (hide("apps_edit_admin_rights"), val("apps_admin_partial_level_desc", s)) : (show("apps_edit_admin_rights"), val("apps_admin_partial_level_desc", s + ":"))
    },
    uSaveAdmin: function(e, t) {
        var a = {
            act: "save_admin",
            id: cur.opts.aid,
            mid: e,
            hash: t,
            level: radioval("admins_level"),
            rights: []
        };
        each(geByClass("checkbox", ge("apps_edit_admin_rights")), function(e, t) {
            isChecked(t) && a.rights.push(t.getAttribute("id").replace(/^apps_admin_right_/, ""))
        }), a.rights.length && ajax.post("al_apps_edit.php", a, {
            onDone: function(t, a) {
                if (curBox().hide(), t && AppsEdit.uShowMessage(t), a) {
                    var s, i, n = cur.opts.data,
                        r = !1;
                    if (isArray(n))
                        for (s = 0, i = n.length; i > s; ++s)
                            if (n[s][0] == e) {
                                r = !0, 0 == n[s][5] && ++cur.opts.all_count, cur.opts.data[s] = a;
                                break
                            }
                    r ? (delete cur.qShown, AppsEdit.uSearchUpdate()) : (cur.opts.data.unshift(a), ++cur.opts.all_count, val(cur.searchInp, ""), delete cur.qShown, AppsEdit.uIndex(cur.opts.data)), AppsEdit.uUpdateSummary()
                }
            },
            showProgress: curBox().showProgress,
            hideProgress: curBox().hideProgress
        })
    },
    uDoRemoveAdmin: function(e, t) {
        var a = {
            act: "delete_admin",
            id: cur.opts.aid,
            mid: e,
            hash: t
        };
        ajax.post("al_apps_edit.php", a, {
            onDone: function(t, a) {
                if (curBox().hide(), t && AppsEdit.uShowMessage(t), a) {
                    var s, i, n = cur.opts.data;
                    if (isArray(n))
                        for (s = 0, i = n.length; i > s; ++s)
                            if (n[s][0] == e) {
                                cur.opts.data[s] = a, --cur.opts.all_count, delete cur.qShown, AppsEdit.uSearchUpdate();
                                break
                            }
                }
            },
            showProgress: curBox().showProgress,
            hideProgress: curBox().hideProgress
        })
    },
    uMainAdmin: function(e) {
        if (e) {
            if (!cur.mainAdminChanging) return;
            cur.mainAdminChanging = !1
        } else {
            if (cur.mainAdminChanging) return;
            cur.mainAdminChanging = !0
        }
        delete cur.qShown, AppsEdit.uSearchUpdate()
    },
    uChangeMainAdmin: function(e) {
        return cur.mainAdminChanging ? (showBox("al_apps_edit.php", {
            act: "change_main_admin_box",
            id: cur.opts.aid,
            mid: e
        }, {
            cache: 1,
            onFail: function(e) {
                return AppsEdit.uShowMessage(e), !0
            }
        }), !1) : void 0
    },
    uDoChangeMainAdmin: function(e, t) {
        var a = {
            act: "change_main_admin",
            id: cur.opts.aid,
            mid: e,
            hash: t
        };
        ajax.post("al_apps_edit.php", a, {
            onDone: function(t, a) {
                curBox().hide(), t && AppsEdit.uShowMessage(t), cur.mainAdminChanging = !1, cur.opts.main_admin = a;
                var s, i, n = cur.opts.data;
                if (isArray(n)) {
                    for (s = 0, i = n.length; i > s; ++s) n[s][0] == e ? cur.opts.data[s][5] = 3 : 3 == cur.opts.data[s][5] && (cur.opts.data[s][5] = 2);
                    delete cur.qShown, AppsEdit.uSearchUpdate()
                }
            },
            onFail: function(e) {
                return curBox().hide(), AppsEdit.uShowMessage(e), !0
            },
            showProgress: curBox().showProgress,
            hideProgress: curBox().hideProgress
        })
    },
    initFunctionsClone: function(e) {
        e && (this.funcsCloneChoser = new Dropdown(ge("apps_edit_clone_funcs_app_choser"), e, {
            width: 230,
            big: 1,
            multiselect: !1,
            noResult: ""
        }))
    },
    cloneStoredFuncs: function(e) {
        var t = ge("apps_edit_clone_button"),
            a = this,
            s = showFastBox({
                title: getLang("apps_clone_stored_funcs_confirm_title"),
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("apps_clone_stored_funcs_confirm_text"), getLang("apps_clone_stored_funcs_confirm_button"), function() {
                s.hide(), lockButton(t), ajax.post("al_apps_edit.php", {
                    act: "clone_funcs",
                    from_aid: cur.aid,
                    to_aid: a.funcsCloneChoser.val(),
                    hash: e
                }, {
                    onDone: function() {
                        unlockButton(t)
                    }
                })
            }, "Close", function() {
                s.hide()
            })
    },
    loadStatApiData: function(method, stat_interval) {
        return cur.api_stat_interval == stat_interval && cur.api_stat_filter_method == method ? !1 : void ajax.post("editapp", {
            act: "stats_api_data",
            id: cur.aid,
            method: method,
            stat_interval: stat_interval,
            hash: cur.statsApiHash
        }, {
            cache: 1,
            onDone: function(content, script) {
                if (ge("apps_edit_stats_api").innerHTML = content, cur.api_stat_interval = stat_interval, cur.api_stat_filter_method = method, script && eval(script), "2days" != stat_interval || "" != method) {
                    var newLocVars = {};
                    "" != method && (newLocVars.method = method), "2days" != stat_interval && (newLocVars.stat_interval = stat_interval), nav.setLoc(extend(nav.objLoc, {
                        method: method,
                        stat_interval: stat_interval
                    }))
                }
            },
            onFail: AppsEdit.showError,
            showProgress: function() {
                cur.api_stat_interval = stat_interval, removeClass(ge("api_interval_selector_2days"), "selected"), removeClass(ge("api_interval_selector_week"), "selected"), removeClass(ge("api_interval_selector_month"), "selected"), addClass(ge("api_interval_selector_" + cur.api_stat_interval), "selected"), show(ge("apps_edit_api_prg"))
            },
            hideProgress: function() {
                hide(ge("apps_edit_api_prg"))
            }
        })
    },
    changeStatBlockPeriod: function(e) {
        cur.stat_main_block_period || (cur.stat_main_block_period = "yesterday"), cur.stat_main_block_period != e && (cur.stat_main_block_period = e, "yesterday" == e ? (removeClass(ge("app_stat_main_blocks_selector_month"), "selected"), addClass(ge("app_stat_main_blocks_selector_yesterday"), "selected")) : (removeClass(ge("app_stat_main_blocks_selector_yesterday"), "selected"), addClass(ge("app_stat_main_blocks_selector_month"), "selected")), toggle(ge("app_stat_main_block1_day")), toggle(ge("app_stat_main_block2_day")), toggle(ge("app_stat_main_block3_day")), toggle(ge("app_stat_main_block1_subtitle_day")), toggle(ge("app_stat_main_block1_month")), toggle(ge("app_stat_main_block2_month")), toggle(ge("app_stat_main_block3_month")), toggle(ge("app_stat_main_block1_subtitle_month")))
    },
    chooseVideo: function(e, t) {
        var a = {
                promo: "a_save_promo_video",
                banner: "a_save_banner_video"
            },
            s = {
                promo: "apps_edit_promo_video_thumb",
                banner: "apps_edit_banner_video_thumb"
            },
            i = showBox("al_video.php", {
                act: "a_choose_video_box",
                from: "app_edit",
                app_id: cur.aid
            }, {
                stat: ["page.css", "page.js"],
                cache: 1
            });
        cur.chooseMedia = function(n, r, o) {
            var c = a[t];
            return ajax.post("al_apps.php", {
                act: c,
                aid: cur.aid,
                hash: e,
                video_id: r
            }, {
                onDone: function(e) {
                    if (e) showFastBox({
                        title: getLang("global_error"),
                        dark: 1
                    }, e);
                    else {
                        i.hide();
                        var a = o.editable && o.editable.sizes && o.editable.sizes.l ? o.editable.sizes.l[0] : o.thumb,
                            n = ge(s[t]);
                        domData(n, "video-id", r), setStyle(n, "background-image", "url('" + a + "')"), show(n)
                    }
                },
                onFail: function(e) {
                    return showFastBox({
                        title: getLang("global_error"),
                        dark: 1
                    }, e), !0
                }
            }), !1
        }
    },
    showVideo: function(e, t) {
        var a = domData(e, "video-id");
        if (a) return showVideo(a, "", {
            autoplay: 1,
            queue: 1
        }, t)
    },
    removeSelectedVideo: function(e, t, a) {
        var s = {
                promo: "a_save_promo_video",
                banner: "a_save_banner_video"
            },
            i = {
                promo: "apps_edit_promo_video_thumb",
                banner: "apps_edit_banner_video_thumb"
            },
            n = ge(i[a]),
            r = s[a];
        return hide(n), ajax.post("al_apps.php", {
            act: r,
            aid: cur.aid,
            hash: e
        }, {
            onFail: function(e) {
                return showFastBox({
                    title: getLang("global_error"),
                    dark: 1
                }, e), show(n), !0
            }
        }), cancelEvent(t), !1
    },
    hideWarning: function(e, t, a) {
        ajax.post("editapp", {
            act: "a_hide_warning",
            app_id: cur.aid,
            name: t,
            hash: a
        }, {
            onDone: function() {
                hide(geByClass1("app_edit_warning", "app_edit_warning_wrap"))
            }
        })
    },
    getPanoramicBannerSlidesCnt: function(e) {
        return e = e || ge("apps_featured_slides"), e ? domChildren(e).length : 0
    },
    removePanoramicBannerThumb: function(e, t, a, s, i) {
        cancelEvent(t);
        var n, r, o = {
                act: "a_remove_panoramic_banner",
                aid: a,
                seq: s,
                hash: i
            },
            c = ge("apps_panoramic_banner_error"),
            p = domCA(e, ".apps_featured_thumb"),
            d = ge("apps_featured_slides"),
            u = this.getPanoramicBannerSlidesCnt(d) - 1,
            _ = window.cur && cur.panoramicBannerAppsSlider,
            l = _ && _.indexCurrent || 0;
        return n = domChildIndex(p, d) === u, n = n || l === u, window.tooltips && tooltips.hideAll(), ajax.post("editapp", o, {
            onFail: function(e) {
                return c && e ? (c.textContent = e, show(c), !0) : void 0
            }
        }), re(p), r = this.getPanoramicBannerSlidesCnt(d), r ? (_ && _.update(), n && _ && _.prev()) : this.hidePanoramicBannerWrapper(), this.canAddNewPanoramicBannerPhoto(d) && this.enablePanoramicBannerUploadBtn(), 1 >= r && this.hideSliderArrows(), !1
    },
    addNewPanoramicBannerThumb: function(e) {
        var t, a = ge("apps_featured_slides"),
            s = window.cur && cur.panoramicBannerAppsSlider;
        a && (t = domChildren(a).length, a.insertAdjacentHTML("beforeEnd", e), t ? (s && s.update(), s && s.last()) : (s || (this.initPanoramicBannerAppsSlider(), s = window.cur && cur.panoramicBannerAppsSlider), this.showPanoramicBannerWrapper(), s && s.prev()), this.getPanoramicBannerSlidesCnt(a) > 1 && this.showSliderArrows()), this.canAddNewPanoramicBannerPhoto(a) || this.disablePanoramicBannerUploadBtn()
    },
    canAddNewPanoramicBannerPhoto: function(e) {
        return this.getPanoramicBannerSlidesCnt(e) < this.PANORAMIC_SLIDER_MAX_PHOTOS
    },
    enablePanoramicBannerUploadBtn: function() {
        var e = ge("apps_edit_upload_panoramic_banner");
        e && removeClass(e, "apps_edit_upload_panoramic_banner_disable")
    },
    disablePanoramicBannerUploadBtn: function() {
        var e = ge("apps_edit_upload_panoramic_banner");
        e && addClass(e, "apps_edit_upload_panoramic_banner_disable")
    },
    showPanoramicBannerWrapper: function() {
        var e = ge("apps_edit_panoramic_wrap");
        removeClass(e, "apps_edit_full_wrap_hidden")
    },
    showSliderArrows: function() {
        var e = ge("apps_featured_slider"),
            t = geByClass1("apps_featured_prev", e),
            a = geByClass1("apps_featured_next", e);
        removeClass(t, "apps_featured_prev_hidden"), removeClass(a, "apps_featured_next_hidden")
    },
    hideSliderArrows: function() {
        var e = ge("apps_featured_slider"),
            t = geByClass1("apps_featured_prev", e),
            a = geByClass1("apps_featured_next", e);
        addClass(t, "apps_featured_prev_hidden"), addClass(a, "apps_featured_next_hidden")
    },
    hidePanoramicBannerWrapper: function() {
        var e = ge("apps_edit_panoramic_wrap");
        addClass(e, "apps_edit_full_wrap_hidden")
    },
    initPanoramicBannerAppsSlider: function() {
        if (window.Apps && window.cur && this.getPanoramicBannerSlidesCnt()) {
            var e = ge("apps_featured_slides");
            cur.panoramicBannerAppsSlider = Apps.makeAppSlider({
                inner: "apps_featured_slides",
                outer: "apps_featured_slider",
                next: "apps_featured_next",
                prev: "apps_featured_prev",
                infinite: !1
            }), cur.panoramicBannerAppsSlider.prev(), this.getPanoramicBannerSlidesCnt(e) <= 1 && this.hideSliderArrows()
        }
    },
    initPanoramicBanner: function() {
        this.initPanoramicBannerAppsSlider();
        var e = ge("apps_edit_upload_panoramic_banner");
        addEvent(e, "click", function(e) {
            return hasClass(this, "apps_edit_upload_panoramic_banner_disable") ? (showTitle(this, null, [0, 7, 0, 0], {
                appendEl: document.body
            }), void cancelEvent(e)) : void 0
        })
    },
    _eof: 1
};
try {
    stManager.done("apps_edit.js")
} catch (e) {}