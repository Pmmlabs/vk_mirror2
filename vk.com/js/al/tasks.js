Tasks = {
    address: "tasks",
    switchTab: function(e, t) {
        return t.button || t.ctrlKey || browser.mac && t.metaKey ? !0 : (show("tasks_loading"), hasClass(e.parentNode, "task_tab") ? (each(geByClass("task_tab_active", ge("tasks_tabs")), function(e, t) {
            removeClass(t, "task_tab_active"), addClass(t, "task_tab")
        }), removeClass(e.parentNode, "task_tab"), addClass(e.parentNode, "task_tab_active")) : hasClass(e.firstChild, "tasks_section_filter") && (each(geByClass("tasks_section_filter", ge("tasks_section_filters")), function(e, t) {
            removeClass(t, "selected")
        }), addClass(e.firstChild, "selected")), nav.go(e, t))
    },
    scrollCheck: function() {
        if (!(browser.mobile || cur.disableAutoMore || cur.loadingFeed)) {
            var e = ge("show_more_link");
            if (e) {
                var t = document.documentElement,
                    s = window.innerHeight || t.clientHeight || bodyNode.clientHeight,
                    o = window.pageYOffset || pageNode.scrollTop || t.scrollTop;
                o + s + 400 > e.offsetTop && Tasks.showMore()
            }
        }
    },
    getPage: function(offset) {
        show("pages_loading_top"), show("pages_loading_bottom");
        var _n = nav.objLoc,
            act = "viewbug" == cur.act ? "get_comments" : cur.act;
        return ajax.post(this.address, {
            act: act,
            offset: offset,
            q: cur.q,
            bid: cur.bug_id ? cur.bug_id : _n.bid,
            section: _n.section,
            type: _n.type,
            sent: _n.sent,
            opened: _n.opened,
            priority: _n.priority,
            id: _n.id,
            load: 1
        }, {
            cache: 1,
            onDone: function(content, filters, script) {
                inArray(cur.act, ["notifications", "my", "bugs", "features", "news", "support"]) ? Tasks.setFiltersHtml(filters) : script = filters, "viewbug" == cur.act ? val("task_comments", content) : val("tasks_content", content), window.tooltips && tooltips.hideAll(), script && eval(script), offset || "viewbug" == cur.act ? nav.setLoc(extend(nav.objLoc, {
                    offset: offset
                })) : (delete nav.objLoc.offset, nav.setLoc(nav.objLoc))
            },
            onFail: function() {
                hide("pages_loading_top"), hide("pages_loading_bottom")
            }
        }), !1
    },
    search: function() {
        var e = val("search");
        e ? newLoc = {
            0: nav.objLoc[0],
            act: "comments" == cur.act ? cur.act : "bugs",
            q: e
        } : newLoc = {
            0: nav.objLoc[0],
            act: cur.act
        }, ("bugs" == cur.act || "features" == cur.act || "support" == cur.act || "bugs" == cur.act) && each(["section", "id", "opened", "priority"], function(e, t) {
            nav.objLoc[t] && (newLoc[t] = nav.objLoc[t])
        }), nav.go(newLoc)
    },
    saveRedmineKey: function() {
        var e = ge("redmine_key").value;
        ajax.post(Tasks.address, {
            act: "save_redmine_key",
            key: e
        }, {
            onDone: function(e) {
                var t = se('<div class="' + (e ? "ok_msg" : "error") + '" style="text-align:center">' + (e ? getLang("global_done") : getLang("global_error")) + "</div>"),
                    s = domNS(ge("redmine_key"));
                s ? domPN(ge("redmine_key")).insertBefore(t, s) : domPN(ge("redmine_key")).appendChild(t), setTimeout(function() {
                    slideUp(t)
                }, 2e3)
            }
        })
    },
    addTask: function() {
        return !showBox(this.address, {
            act: "edit"
        }, {
            params: {
                width: 540,
                dark: 1
            }
        })
    },
    editTask: function(e) {
        return !showBox(this.address, {
            act: "edit",
            bid: e
        }, {
            params: {
                width: 540,
                dark: 1
            }
        })
    },
    saveTask: function(bid, hash) {
        var title = val("title"),
            desc = val("desc");
        if (!title) return void notaBene("title");
        if (!desc) return void notaBene("desc");
        if (!cur.sectionEditFilter.val()) return notaBene(cur.sectionEditFilter.selector), void notaBene(cur.sectionEditFilter.input);
        var privacy = Privacy.getValue("privacy"),
            pr_data = privacy.split("_"),
            pr_type = intval(pr_data[0]),
            new_privacy = 0;
        if (pr_type) {
            var pr_cats = pr_data[1].split(",");
            for (var i in pr_cats) new_privacy += 1 << intval(pr_cats[i]) - 1
        } else
            for (var i in cur.privacy.privacy_lists) new_privacy += 1 << intval(i) - 1;
        var limit_type = intval(cur.deadlineEditFilter.val()),
            task_type = radioBtns.new_task_type.val,
            query = {
                act: "save",
                bid: bid,
                type: task_type,
                title: title,
                desc: desc,
                browser: isVisible("browser") ? ge("browser").value : "",
                priority: cur.priorityEditFilter.val(),
                privacy: new_privacy,
                developer: cur.developerEditFilter.val(),
                author_id: cur.editAuthorId,
                limit_type: limit_type,
                sections: cur.sectionEditFilter.val(),
                hash: hash
            }; - 1 == limit_type && (query.limit_date = ge("custom_date").value), bid || (query.send_sms = intval(cur.sendSMSFilter.checked()));
        var b = curBox();
        bid ? ajax.post(Tasks.address, query, {
            showProgress: b.showProgress,
            hideProgress: b.hideProgress,
            onDone: function(e, t, s, o, a) {
                ge("task_summary").innerHTML = e, ge("task_content").innerHTML = s, ge("task_actions").innerHTML = t, ge("task_images").innerHTML = a, ge("task_comments").innerHTML = o, curBox().hide()
            }
        }) : ajax.post(Tasks.address, query, {
            showProgress: b.showProgress,
            hideProgress: b.hideProgress,
            onDone: function(text, script) {
                curBox().content(text), script && eval(script)
            }
        })
    },
    deleteTask: function(e, t) {
        var s = showFastBox({
            title: getLang("tasks_deleting"),
            width: 440,
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 20px;",
            onHide: function() {
                cur.deleted && nav.go(Tasks.address)
            }
        }, getLang("tasks_delete_confirm"), getLang("tasks_delete"), function() {
            ajax.post(Tasks.address, {
                act: "delete",
                bid: e,
                hash: t
            }, {
                onDone: function(e) {
                    cur.deleted = !0, s.content(e), s.removeButtons(), s.addButton(global_close, s.hide, "yes"), setTimeout(function() {
                        s.hide()
                    }, 3e3)
                }
            })
        }, getLang("global_cancel"))
    },
    editPriority: function(e, t) {
        showFastBox({
            title: getLang("tasks_increase_priority"),
            width: 430,
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("tasks_sure_increase_priority"), getLang("tasks_increase"), function(s) {
            ajax.post(Tasks.address, {
                act: "edit_priority",
                bid: e,
                hash: t
            }, {
                showProgress: lockButton.pbind(s),
                hideProgress: unlockButton.pbind(s),
                onDone: function(e, t) {
                    val("task_summary", e), val("task_actions", t), curBox().hide()
                }
            })
        }, global_cancel)
    },
    preview: function(e, t) {
        var s = ge("preview");
        val(s, ""), isVisible(s) ? hide(s) : (lockButton(e), ajax.post(this.address, {
            act: "preview",
            hash: t,
            text: val("desc")
        }, {
            onDone: function(t) {
                unlockButton(e), val(s, t), show(s)
            }
        }))
    },
    addComment: function(e) {
        var t = val("task_reply_field");
        t && ajax.post(this.address, {
            act: "add_comment",
            bid: cur.bug_id,
            from: cur.act,
            text: t,
            reply_to: cur.replyTo,
            hash: e
        }, {
            onDone: function(e) {
                val("task_comments", e), val("task_reply_field", ""), delete cur.replyTo, ge("task_reply_field").blur(), autosizeSetup(ge("task_reply_field"), {
                    minHeight: 70,
                    maxHeight: 500
                }), val("answer_to", ""), hide("tasks_loading")
            },
            showProgress: show.pbind("tasks_loading"),
            hideProgress: hide.pbind("tasks_loading")
        })
    },
    replyViewComment: function(e, t) {
        return ge("answer_to").innerHTML = '<a onclick="return Tasks.cancelReplyComment();">' + t + "</a>", cur.replyTo = e, !1
    },
    cancelReplyComment: function() {
        return delete cur.replyTo, ge("answer_to").innerHTML = "", !1
    },
    editComment: function(e, t) {
        cur.editing && this.cancelEditComment(cur.editing), cur.comments || (cur.comments = {});
        var s = geByClass1("tasks_comm_text", ge("comment" + e));
        cur.comments[e] = s.innerHTML;
        ge("comment" + e);
        return ajax.post(Tasks.address, {
            act: "get_comment",
            cid: e,
            hash: t
        }, {
            onDone: function(o) {
                s.innerHTML = '<textarea class="tasks_edit_comment" id="comment' + e + 'edit" onkeydown="Tasks.saveComment(event, ' + e + ", '" + t + "')\">" + o + '</textarea>       <div style="margin: 5px 0 0 -2px; height: 23px">         <div class="fl_l button_blue">          <button id="save_but' + e + '" onclick="Tasks.doSaveComment(' + e + ", '" + t + "')\">" + getLang("global_save") + '</button>         </div>         <div class="fl_l button_gray" style="margin-left: 6px;">          <button id="cancel_but' + e + '" onclick="Tasks.cancelEditComment(' + e + ')">' + getLang("global_cancel") + '</button>         </div>         <div id="editCommentProgress' + e + '" style="margin: 5px 0px 0px 10px; vertical-align: 0px; float: left; display: none"><img src="/images/upload.gif"/></div>       </div>', ge("comment" + e + "edit").focus(), hide(geByClass1("date", ge("comment" + e))), autosizeSetup(ge("comment" + e + "edit"), {
                    minHeight: 30
                }), cur.editing = e
            }
        }), !1
    },
    saveComment: function(e, t, s) {
        return e && 27 == e.keyCode ? void Tasks.cancelEditComment(cur.editing) : void(e && e.ctrlKey && (10 == e.keyCode || 13 == e.keyCode) && this.doSaveComment(t, s))
    },
    cancelEditComment: function(e) {
        geByClass1("tasks_comm_text", ge("comment" + e)).innerHTML = cur.comments[e], show(geByClass1("date", ge("comment" + e))), delete cur.editing, delete cur.comments[e]
    },
    doSaveComment: function(e, t) {
        var s = ge("comment" + e + "edit").value;
        return s ? void ajax.post(Tasks.address, {
            act: "edit_comment",
            bid: cur.bug_id,
            cid: e,
            comment: s,
            hash: t
        }, {
            onDone: function(t) {
                var s = geByClass1("tasks_comm_text", "comment" + e);
                s.innerHTML = t, show(geByClass1("date", "comment" + e)), delete cur.editing, delete cur.comments[e]
            },
            showProgress: lockButton.pbind("save_but" + e),
            hideProgress: unlockButton.pbind("save_but" + e)
        }) : void ge("comment" + e + "edit").focus()
    },
    deleteComment: function(e, t, s) {
        return show("tasks_loading"), ajax.post(Tasks.address, {
            act: "delete_comment",
            bid: e,
            cid: t,
            from: cur.act,
            hash: s
        }, {
            onDone: function(s) {
                var o = "viewbug" == cur.act ? ge("comment" + t).firstChild : ge("comment" + e + "_" + t).firstChild;
                o && (cur.deletedComments || (cur.deletedComments = []), cur.deletedComments[t] = o.innerHTML, o.innerHTML = s), hide("tasks_loading")
            }
        }), !1
    },
    restoreComment: function(e, t, s) {
        return show("tasks_loading"), ajax.post(Tasks.address, {
            act: "restore_comment",
            bid: e,
            cid: t,
            hash: s
        }, {
            onDone: function(s) {
                var o = "viewbug" == cur.act ? ge("comment" + t).firstChild : ge("comment" + e + "_" + t).firstChild;
                o && (o.innerHTML = cur.deletedComments[t]), hide("tasks_loading")
            }
        }), !1
    },
    viewComments: function(e, t, s) {
        return cur.bugComments || (cur.bugComments = {}), cur.bugComments[e] != t ? (ge("tph_text" + e) ? (show("tph_prg" + e), hide("tph_text" + e)) : (ge("com_links" + e).innerHTML = "", show("load_comm" + e)), ajax.post(Tasks.address, {
            act: "load_comments",
            bid: e,
            fresh: t,
            from: cur.act,
            hash: s
        }, {
            onDone: function(t, s) {
                var o = ge("comments" + e);
                if (!o) {
                    var a = ce("div", {
                        id: "comments" + e,
                        className: "tasks_comments_row"
                    });
                    ge("bug" + e).parentNode.insertBefore(a, ge("bug" + e).nextSibling), o = ge("comments" + e)
                }
                o.innerHTML = t, ge("com_links" + e).innerHTML = s;
                var n = ge("reply_field" + e);
                placeholderSetup(n), autosizeSetup(n, {
                    minHeight: 30
                }), n.show = !0, setTimeout(Tasks.hideReplyBox.pbind(e), 0), hide("load_comm" + e), hide("com_links" + e), show("com_hide" + e), isVisible(o) || slideToggle(o, 200)
            }
        })) : (cont = ge("comments" + e), slideToggle(cont, 200, function() {
            hide("com_links" + e), show("com_hide" + e)
        })), cur.bugComments[e] = t, !1
    },
    hideComments: function(e) {
        return cont = ge("comments" + e), isVisible(cont) && slideToggle(cont, 200, function() {
            hide("com_hide" + e), show("com_links" + e)
        }), !1
    },
    replyComment: function(e) {
        if ("comments" == cur.act || "feed" == cur.act) {
            var t = ge("reply_comments" + e),
                s = ge("reply_field" + e);
            slideToggle(t, 200, function() {
                isVisible(t) && s.focus()
            })
        }
    },
    addReplyComment: function(e, t, s) {
        var o = ge("reply_field" + e).value;
        return o ? void(cur.commentSent || (cur.commentSent = !0, lockButton(ge("send" + e)), ajax.post(Tasks.address, {
            act: "add_comment",
            bid: e,
            text: o,
            reply_to: t,
            from: cur.act,
            hash: s
        }, {
            onDone: function(t, s) {
                delete cur.commentSent, unlockButton(ge("send" + e)), "feed" == cur.act || "comments" == cur.act ? (ge("comment" + e).innerHTML += t, addClass(ge("comment" + e), "answered"), re("reply" + e), hide(geByClass1("tasks_comm_actions", ge("comment" + e)))) : (ge("comments_cont" + e).innerHTML += t, ge("com_links" + e).innerHTML = s, ge("reply_field" + e).value = "", ge("reply_field" + e).blur(), Tasks.hideReplyBox(e))
            }
        }))) : !1
    },
    showReplyBox: function(e) {
        e = e || "";
        var t = ge("reply_field" + e);
        return cur.focused && cur.focused != e && Tasks.hideReplyBox(cur.focused), t.show || (e && show("post_submit" + e), t.autosize && t.autosize.update(), t.show = !0, cur.focused = e), !1
    },
    hideReplyBox: function(e) {
        if (!browser.opera || !browser.mobile) {
            e = e || "";
            var t = ge("reply_field" + e);
            return t && t.show && (e && hide("post_submit" + e), ge("reply_to_name") && (ge("reply_to_name").innerHTML = ""), setStyle(t, {
                height: 14
            }), t.show = !1, delete cur.focused), !0
        }
    },
    setupReply: function() {
        each(geByClass("tasks_reply_msg"), function(e, t) {
            placeholderSetup(t), autosizeSetup(t, {
                minHeight: 30
            })
        })
    },
    _animDelX: function(e, t, s) {
        if (e) {
            if (void 0 !== s) e.active = s;
            else if (e.active) return;
            animate(e, {
                opacity: t
            }, 200)
        }
    },
    unbindTT: function(e, t) {
        showTooltip(e, {
            text: t,
            showdt: 200,
            dir: "bottom",
            typeClass: "tt_black",
            center: 1
        })
    },
    rowActive: function(e, t) {
        this._animDelX(e, 1, 1), t && showTooltip(e, {
            text: t,
            showdt: 200
        })
    },
    rowInactive: function(e) {
        this._animDelX(e, .5, 0)
    },
    checkFilter: function(e) {
        var t = ge("filter_" + e),
            s = cur.typeMask,
            o = cur.feedTypes[e];
        s & 1 << o ? (s &= ~(1 << o), removeClass(t, "checked")) : (s |= 1 << o, addClass(t, "checked")), cur.typeMask = s, setCookie("remixtasks_feed_filter", s, 100), Tasks.filterFeed()
    },
    setFilter: function(e) {
        var t = ge("right_column"),
            s = ge("filter_" + e),
            o = !0,
            a = cur.typeMask,
            n = cur.feedTypes[e];
        each(geByClass("checked", t, "div"), function() {
            return this != s ? o = !1 : void 0
        }), o ? each([].slice.apply(geByClass("tasks_feed_filter", t, "div")), function() {
            hasClass(this, "checked") || (addClass(this, "checked"), a |= 1 << cur.feedTypes[this.id.substr(7)])
        }) : (each([].slice.apply(geByClass("checked", t, "div")), function() {
            removeClass(this, "checked"), a &= ~(1 << cur.feedTypes[this.id.substr(7)])
        }), addClass(ge("filter_" + e), "checked"), a |= 1 << n), cur.typeMask = a, setCookie("remixtasks_feed_filter", a, 100), Tasks.filterFeed()
    },
    filterFeed: function() {
        ge("feed_wrap").style.opacity = .5, ajax.post(Tasks.address, {
            act: "feed",
            load: 1,
            id: cur.id
        }, {
            onDone: function(e, t) {
                t && extend(cur, t), ge("tasks_content").innerHTML = e, window.tooltips && tooltips.hideAll(), Tasks.setupReply(), cur.id ? nav.setLoc(extend(nav.objLoc, {
                    id: cur.id
                })) : (delete nav.objLoc.id, nav.setLoc(nav.objLoc))
            }
        })
    },
    showMore: function() {
        return hide("show_more"), show("show_more_progress"), cur.loadingFeed = !0, ajax.post(Tasks.address, {
            act: "feed",
            from: cur.from,
            offset: cur.offset,
            id: cur.id,
            more: 1
        }, {
            onDone: function(e, t, s) {
                delete cur.loadingFeed, show("show_more"), hide("show_more_progress"), ge("feed").innerHTML += e, ge("show_more_box").innerHTML = t, s && extend(cur, s), Tasks.setupReply()
            },
            onFail: function() {
                delete cur.loadingFeed, show("show_more"), hide("show_more_progress")
            }
        }), !1
    },
    showPhoto: function(e) {
        var t = vkImage();
        t.src = e, cur.tasksPhotoBox && cur.tasksPhotoBox.hide();
        var s = function() {
            cur.tasksPhotoBox = showFastBox({
                bodyStyle: "line-height: 0px;",
                width: Math.min(t.width, 1024) + 30,
                dark: 1,
                onShow: addEvent.pbind(document, "keydown", Tasks.goToPhotoHandler),
                onHide: removeEvent.pbind(document, "keydown", Tasks.goToPhotoHandler)
            }, '<img class="tasks_preview_img" id="tasks_preview_img" src="' + e + '" />'), hide("tasks_loading"), removeEvent(t, "load")
        };
        return t.width ? s() : (show("tasks_loading"), addEvent(t, "load", s)), !1
    },
    goToPhotoHandler: function(e) {
        e.keyCode == KEY.LEFT ? Tasks.goToPhoto(-1) : e.keyCode == KEY.RIGHT && Tasks.goToPhoto(1)
    },
    goToPhoto: function(e) {
        var t = ge("tasks_preview_img"),
            s = t.src,
            o = geByClass("_tasks_image", "task_images_wrap"),
            a = [],
            n = 0;
        each(o, function(e, t) {
            var o = attr(t, "photo-big");
            a.push(o), o == s && (n = e)
        }), a.length < 2 || (n += 1, 0 > n ? n = a.length - 1 : n > a.length - 1 && (n = 0), Tasks.showPhoto(a[n]))
    },
    subscribe: function(e, t, s) {
        show("tasks_loading");
        var o; - 1 != e.toString().indexOf("_") && (o = e, e = e.split("_"), e = parseInt(e[0])), ajax.post(Tasks.address, {
            act: "subscribe",
            from: cur.act,
            subscribe: t,
            bid: e,
            full_id: o,
            hash: s
        }, {
            onDone: function(s) {
                switch (cur.act) {
                    case "viewbug":
                        ge("task_actions").innerHTML = s;
                        break;
                    case "settings":
                        ge("subscribe" + e).innerHTML = s;
                        break;
                    case "feed":
                        cont = ge("comment" + o).firstChild, t ? cont.innerHTML = cur.unsubscribed[o] : (window.tooltips && tooltips.hide(ge("update_hide" + o)), cur.unsubscribed || (cur.unsubscribed = new Array), cur.unsubscribed[o] = cont.innerHTML, cont.innerHTML = s), removeClass(cont, "over"), setStyle(ge("update_hide" + o), {
                            opacity: .5
                        })
                }
                hide("tasks_loading")
            }
        })
    },
    filterChanged: function(e, t) {
        switch (cur.act) {
            case "feed":
                "id" == e && (cur.id = intval(t), cur.id ? hide("feed_filters_block") : show("feed_filters_block"), Tasks.filterFeed());
                break;
            case "settings":
                "section" == e && Tasks.filterSettings(cur.offset, t);
            case "my":
            case "bugs":
            case "features":
            case "news":
            case "support":
                Tasks.filterBugs(e, t)
        }
        return !1
    },
    filterSettings: function(offset, value) {
        show("tasks_loading"), ajax.post(Tasks.address, {
            act: cur.act,
            load: 1,
            section: value
        }, {
            onDone: function(text, script) {
                hide("tasks_loading"), val("tasks_content", text), window.tooltips && tooltips.hideAll(), script && eval(script), Tasks.setupReply(), value ? nav.setLoc(extend(nav.objLoc, {
                    section: value
                })) : (delete nav.objLoc.section, nav.setLoc(nav.objLoc))
            }
        })
    },
    subscribeSections: function(e, t) {
        ajax.post(Tasks.address, {
            act: "subscribe_sections",
            sections: t,
            hash: e
        })
    },
    filterBugs: function(filter, value) {
        show("tasks_loading"), nav.objLoc[filter] = value;
        var _n = nav.objLoc;
        delete nav.objLoc.offset, ajax.post(this.address, {
            act: cur.act,
            q: _n.q,
            section: _n.section,
            type: _n.type,
            sent: _n.sent,
            opened: _n.opened,
            priority: _n.priority,
            id: _n.id,
            load: 1
        }, {
            onDone: function(content, filters, script) {
                hide("tasks_loading"), val("tasks_content", content), window.tooltips && tooltips.hideAll(), script && eval(script), nav.setLoc(nav.objLoc), Tasks.setFiltersHtml(filters)
            }
        })
    },
    setFiltersHtml: function(e) {
        var t = ge("tasks_section_filters");
        t.parentNode.replaceChild(se(e), t)
    },
    selectDev: function(e, t) {
        return window.tooltips && tooltips.hide(e.parentNode), cur.idSelect.val(t, !0), !1
    },
    addScreenshotLink: function(e, t) {
        var s = ge("task_reply_field"),
            o = s.scrollTop,
            a = 0,
            n = s.selectionStart || "0" == s.selectionStart ? "ff" : document.selection ? "ie" : !1,
            i = " [[screen" + e + "]]\n";
        if ("ie" == n) {
            s.focus();
            var r = document.selection.createRange();
            r.moveStart("character", -s.value.length), a = r.text.length
        } else "ff" == n && (a = s.selectionStart);
        if (a += i.length, "ie" == n) {
            s.focus();
            var r = document.selection.createRange();
            r.moveStart("character", -s.value.length), r.moveStart("character", a), r.moveEnd("character", 0), r.select()
        } else "ff" == n && (s.selectionStart = a, s.selectionEnd = a, s.focus());
        var c = s.value.substring(0, a - i.length),
            d = s.value.substring(a - i.length, s.value.length);
        s.value = c + i + d, s.scrollTop = o, cancelEvent(t)
    },
    addScreenshot: function() {
        showBox(this.address, {
            act: "add_screenshot"
        }, {
            params: {
                width: "430px",
                bodyStyle: "padding: 0px; position: relative;",
                dark: 1
            }
        })
    },
    uploadScreenshot: function(e) {
        hide("screenshot_error"), ge("tasks_add_screen").submit(), e.disabled = !0, curBox().showProgress()
    },
    removeScreenshot: function(e, t, s) {
        var o = ge("image" + e);
        animate(o, {
            width: 0,
            opacity: 0
        }, 100, function() {
            re(o);
            var e = geByClass("tasks_image_row", ge("task_images_wrap"));
            0 == e.length && re("task_images_wrap")
        }), ajax.post(Tasks.address, {
            act: "delete_screenshot",
            sc_id: e,
            bid: cur.bug_id,
            hash: t
        }), cancelEvent(s)
    },
    toRedmine: function(e, t) {
        ajax.post(Tasks.address, {
            act: "to_redmine",
            bid: cur.bug_id,
            hash: e
        }, {
            onDone: function() {
                hide("to_redmine")
            }
        })
    },
    changeTaskStatus: function(status, hash) {
        var doChangeStatus = function(e, t, s) {
                show("tasks_loading");
                var o = {
                    act: "change_status",
                    status: e,
                    bid: cur.bug_id,
                    hash: t
                };
                cur.hideAutoanswer && ge("task_closed_autoanswer") && (o.no_autoanswer = cur.hideAutoanswer.val(), o.answer_text = val("task_closed_autoanswer")), ajax.post(Tasks.address, o, {
                    onDone: function(e, t, o) {
                        s && s.hide(), hide("tasks_loading"), e && val("task_summary", e), t && val("task_actions", t), o && val("task_comments", o)
                    }
                })
            },
            sendReq = function(e, t, s) {
                if (!cur.forceStop) {
                    var o = {
                        act: "add_auto_reply",
                        status: status,
                        bid: cur.bug_id,
                        hash: e,
                        start: s || ""
                    };
                    cur.hideAutoanswer && ge("task_closed_autoanswer") && (o.no_autoanswer = cur.hideAutoanswer.val(), o.answer_text = ge("task_closed_autoanswer").value), ge("task_closed_autoanswer_addressing_m") && (o.addressing_m = ge("task_closed_autoanswer_addressing_m").value), ge("task_closed_autoanswer_addressing_f") && (o.addressing_f = ge("task_closed_autoanswer_addressing_f").value);
                    var a = [],
                        n = cur.ticketsAutoMedia && cur.ticketsAutoMedia.chosenMedias;
                    if (n)
                        for (var i in n) {
                            var r = n[i],
                                c = r[0],
                                d = r[1];
                            ("photo" == c || "doc" == c) && a.push(c + "," + d)
                        }
                    a.length && (o.attachs = a), ajax.post(Tasks.address, o, {
                        onDone: function(s, o, a) {
                            return animate(ge("task_status_progress"), {
                                width: o
                            }, 200), s ? (t.showProgress(), void doChangeStatus(status, e, t)) : void setTimeout(sendReq.pbind(e, t, a), 100)
                        },
                        onFail: function() {
                            t.hideProgress(), t.hide()
                        }
                    })
                }
            };
        if (cur.forceStop = !1, 1 == status && cur.binded_tickets && cur.binded_tickets.length) {
            var box = showFastBox({
                title: getLang("tasks_close_task"),
                width: 430,
                bodyStyle: "line-height: 160%;",
                dark: 1
            }, cur.tasksSureClose, getLang("global_close"), function() {
                box.changed = !0, show("tasks_status_progress_wrap"), hide("tasks_sure_close_wrap"), sendReq(hash, box), box.removeButtons(), box.addButton(getLang("global_close"), function() {
                    cur.forceStop = !0, box.hide()
                })
            }, getLang("global_cancel"), function() {
                cur.forceStop = !0, box.hide()
            });
            autosizeSetup("task_closed_autoanswer", {
                maxWidth: 500
            }), cur.hideAutoanswer = new Checkbox(ge("tasks_ignore_autoanswer"), {
                label: getLang("tasks_ignore_autoanswer"),
                onChange: toggle.pbind(ge("tasks_sure_close"), this.val)
            }), ajax.post(Tasks.address, {
                act: "get_attach_data"
            }, {
                cache: 1,
                onDone: function(script) {
                    script && eval(script)
                }
            })
        } else {
            var box = showFastBox({
                title: getLang("tasks_please_wait"),
                width: 430,
                bodyStyle: "line-height: 160%;",
                dark: 1
            }, '<div id="tasks_status_progress_wrap" class="tasks_upload_progress_wrap" style="margin: 20px auto"><div id="task_status_progress" class="tasks_upload_progress" style="width: 0%;"></div></div>', getLang("global_cancel"), function() {
                cur.forceStop = !0, box.hide()
            });
            sendReq(hash, box)
        }
    },
    addAutoScreen: function() {
        var e = function() {
            showBox("/helpdesk", {
                act: "choose_photo_box",
                scrollbar_width: window.sbWidth()
            }, {
                params: {
                    bodyStyle: "padding: 0px",
                    dark: 1
                },
                cache: 1,
                onFail: function() {
                    return show("tasks_sure_close_error"), hide("tis_add_lnk"), !0
                }
            })
        };
        window.Tickets ? e() : stManager.add(["tickets.js", "tickets.css"], e)
    },
    showNotifyBox: function() {
        var e = showBox("al_friends.php", {
            act: "select_friends_box",
            from: "tasks",
            privacy: cur.view_privacy,
            bid: cur.bug_id,
            author: cur.author_id,
            dev: cur.dev_id
        }, {
            stat: ["privacy.js", "privacy.css", "indexer.js"],
            params: {
                onHide: function() {
                    each(cur.flistScrollbar.destroy, function(e, t) {
                        t()
                    })
                },
                dark: 1
            }
        });
        cur.onFlistSave = function(t, s, o) {
            e.leaveOnSave = !0, ajax.post(Tasks.address, {
                act: "notify_users",
                ids: t.join(","),
                bid: cur.bug_id,
                hash: o
            }, {
                onDone: function(t) {
                    e.hide(), showDoneBox(t)
                },
                progress: e.progress
            })
        }
    },
    notifyUser: function(e, t) {
        ajax.post(Tasks.address, {
            act: "notify_users",
            ids: e,
            bid: cur.bug_id,
            hash: t
        }, {
            onDone: showDoneBox
        })
    },
    moveTask: function() {
        showBox(Tasks.address, {
            act: "move_task"
        }, {
            stat: ["ui_controls.js", "ui_controls.css"],
            params: {
                width: "430px",
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }
        })
    },
    changeDeveloper: function(e, t) {
        show("tasks_loading"), ajax.post(Tasks.address, {
            act: "change_dev",
            bid: cur.bug_id,
            dev: e,
            hash: t
        }, {
            onDone: function(e, t, s) {
                hide("tasks_loading"), e && (ge("task_header").innerHTML = e), t && (ge("task_actions").innerHTML = t), s && (ge("task_comments").innerHTML = s), curBox() && curBox().hide()
            }
        })
    },
    takeTask: function(e) {
        Tasks.changeDeveloper(vk.id, e)
    },
    sendTask: function(e) {
        Tasks.changeDeveloper(cur.task_change_dev.val(), e)
    },
    bindTicket: function() {
        return !showBox(Tasks.address, {
            act: "bind_ticket"
        }, {
            params: {
                width: "430px",
                dark: 1,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }
        })
    },
    unbindTicket: function(ticket_id, hash) {
        var doUnbind = function() {
                var box = cur.unbindBox;
                ajax.post(Tasks.address, {
                    act: "unbind_ticket",
                    ticket_id: ticket_id,
                    bug_id: cur.bug_id,
                    hash: hash
                }, {
                    cache: 1,
                    onDone: function(script) {
                        var el = ge("ticket_row" + ticket_id),
                            par = el.parentNode;
                        slideUp(el, 200, function() {
                            re(el), par.hasChildNodes() || re(par)
                        }), box.hide(), script && eval(script)
                    },
                    showProgress: box.showProgress,
                    hideProgress: box.hideProgress
                })
            },
            enterUnbind = function(e) {
                return e.keyCode == KEY.ENTER && __bq.count() ? (doUnbind(), !1) : void 0
            };
        browser.mobile || addEvent(document, "keydown", enterUnbind), cur.unbindBox = showFastBox({
            title: getLang("tasks_support_delete_title"),
            width: 430,
            dark: 1,
            onHide: function() {
                removeEvent(document, "keydown", enterUnbind)
            }
        }, getLang("tasks_support_delete_text"), getLang("tasks_delete"), doUnbind, getLang("global_cancel"))
    },
    toggleRedesignTask: function(e, t, s) {
        var o = function(e) {
            s.innerHTML = e
        };
        ajax.post(Tasks.address, {
            act: "toggle_redesign_task",
            bid: e,
            hash: t
        }, {
            onDone: o
        })
    },
    _eof: 1
};
try {
    stManager.done("tasks.js")
} catch (e) {}