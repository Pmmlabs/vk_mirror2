var Privacy = {
    flistBox: function(i, e, r, t, s, l) {
        if (cur.flistTpl = t, 0 === r.length && (r = {}), cur.flistList = cur.flistFriends = e, cur.flistSearchList = [], cur.flistSearchTotal = -1, cur.flistSearchLoadStr = "", cur.flistSelectedList = r && r[0] ? r : [], cur.flistSelected = {}, each(r, function() {
                cur.flistSelected[this[0]] = 1
            }), cur.flistSelectedShowed = 0, cur.flistIndex = new vkIndexer(e, function(i) {
                return i[1] + " " + i[4]
            }), i.removeButtons(), i.addButton(s || getLang("global_save"), function() {
                var e = ge("flist_list_name"),
                    r = !1;
                if (isVisible(e)) {
                    if (r = e.value, !r) return notaBene(e);
                    placeholderSetup(e, {
                        back: !0
                    }), elfocus(e, 0, e.value.length)
                }
                var t = {},
                    s = [];
                return each(cur.flistSelectedList, function() {
                    t[this[0]] = this, s.push(this[0])
                }), cur.flistFriendsPrivacy ? (ajax.post("al_settings.php", {
                    act: "hide_friends",
                    hash: l,
                    ids: s.join(",")
                }, {
                    onDone: function(e, r) {
                        showDoneBox(cur.flistFriendsPrivacyText), i.hide()
                    },
                    showProgress: i.showProgress,
                    hiderogress: i.hideProgress
                }), showDoneBox(cur.flistFriendsPrivacyText, {
                    out: 4e3
                }), void(cur.flistNavReload && setTimeout(function() {
                    nav.reload()
                }, 2e3))) : (cur.onFlistSave && cur.onFlistSave(s, t, l, r), void(i.leaveOnSave || i.hide()))
            }), cur.flistTooltip) {
            var c = ge("flist_sel"),
                a = {
                    className: "flist_info_tt",
                    text: cur.flistTooltip,
                    width: 250,
                    nohide: 1,
                    nohideover: 1
                };
            a = cur.flistTooltipRight ? extend(a, {
                dir: "left",
                slideX: -15,
                shift: [-getSize(c)[0] - 15, -28]
            }) : extend(a, {
                dir: "right",
                slideX: 15,
                shift: [265, -28]
            }), showTooltip(c, a), stManager.add(["tooltips.js"], function() {
                i.setOptions({
                    onHide: tooltips.hide.pbind(c)
                })
            })
        } else i.addButton(getLang("global_cancel"), function() {
            i.hide()
        }, "no");
        var n = ge("flist_all_list");
        getSize(n)[1];
        return cur.flistScrollbar = new Scrollbar("flist_scroll_wrap", {
            nomargin: !0,
            right: vk.rtl ? "auto" : 0,
            left: vk.rtl ? 0 : "auto",
            more: Privacy.flistMore,
            onScroll: function(i) {
                ge("flist_scroll_wrap").scrollTop > 0 ? addClass("flist_cont", "flist_scrolled") : removeClass("flist_cont", "flist_scrolled")
            }
        }), cur.flistAllCont = ge("flist_all_list"), cur.flistSelCont = ge("flist_sel_list"), cur.flistSearchEl = ge("flist_search"), cur.flistSearchContEl = geByClass1("flist_search_cont", "flist_cont"), cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit - 1 && Privacy.flistFull(), cur.flistCountStr && cur.flistSelectedCnt > 0 && (ge("flist_sel_summary").innerHTML = langNumeric(cur.flistSelectedCnt, cur.flistCountStr)), toggleClass("flist_cont", "flist_select_items", cur.flistSelectedCnt > 0), !1
    },
    flistMore: function() {
        return cur.privacy.pagination && !cur.flistSelectedShowed && cur.flistList.length - cur.flistShown < 10 && cur.flistList.length < cur.flistTotalCount ? void(cur.flistSearchStr ? Privacy.flistSearchPagination() : cur.flistMoreLoading || (cur.flistMoreLoading = !0, ajax.post("al_friends.php", extend({}, cur.privacy.chooseBoxOpts || {}, {
            act: "select_friends_box",
            Checked: Object.keys(cur.flistSelected).join(","),
            pagination: 1,
            offset: cur.flistList.length
        }), {
            onDone: function(i) {
                cur.flistMoreLoading = !1, isArray(i) && (i.forEach(function(i) {
                    cur.flistFriends.push(i), cur.flistIndex.add(i)
                }), Privacy.flistMore())
            },
            onFail: function() {
                cur.flistMoreLoading = !1
            }
        }))) : void Privacy.flistDrawItems()
    },
    flistDrawItems: function() {
        for (var i = cur.flistShown + 60; cur.flistShown < i && Privacy.flistShowOne(cur.flistList[cur.flistShown + 1]);) ++cur.flistShown;
        setTimeout(function() {
            cur.flistScrollbar && cur.flistScrollbar.update()
        }, 10)
    },
    flistShowOne: function(i, e) {
        if (!i) return !1;
        if (ge("flist_item_wrap" + i[0])) return show(ge("flist_item_wrap" + i[0])), !0;
        var r = i[1];
        cur.flistSelection && (r = r.replace(cur.flistSelection.re, cur.flistSelection.val));
        var t = ce("div", {
            id: "flist_item_wrap" + i[0],
            className: "flist_item_wrap" + (cur.flistSelected[i[0]] ? " flist_item_checked" : ""),
            innerHTML: rs(cur.flistTpl, {
                id: i[0],
                name: r,
                photo: i[2],
                alt: clean(r)
            })
        });
        return e ? cur.flistAllCont.insertBefore(t, cur.flistAllCont.firstChild) : cur.flistAllCont.appendChild(t), !0
    },
    flistSelect: function(i, e, r) {
        var t = ge("flist_item_wrap" + i),
            s = e.parentNode;
        if ("flist_item_sel" == s.id.slice(0, 14) || hasClass(t, "flist_item_checked")) {
            delete cur.flistSelected[i];
            for (var l = 0; l < cur.flistSelectedList.length; l++)
                if (cur.flistSelectedList[l][0] == i) {
                    cur.flistSelectedList.splice(l, 1);
                    break
                }
            t && removeClass(t, "flist_item_checked");
            var c = ge("flist_item_sel" + i);
            if (c && (re(c), cur.flistSelectedCnt > cur.flistSelInRow && cur.flistSelectedList[cur.flistSelInRow - 1])) {
                var a = cur.flistSelectedList[cur.flistSelInRow - 1];
                ge("flist_item_sel" + a[0]) || cur.flistSelCont.insertBefore(ce("div", {
                    id: "flist_item_sel" + a[0],
                    className: "flist_item_wrap",
                    innerHTML: rs(cur.flistTpl, {
                        id: a[0],
                        name: a[1],
                        photo: a[2],
                        alt: clean(a[1])
                    })
                }), ge("flist_sel_show_all"))
            }
            cur.flistSelectedCnt--, 0 == cur.flistSelectedCnt ? (show("flist_info"), cur.flistSelectedShowed || hide("flist_search_toggler_wrap")) : cur.flistSelectedCnt > cur.flistSelInRow ? (val("flist_sel_show_all", "+" + (cur.flistSelectedCnt - cur.flistSelInRow)), removeClass("flist_sel_show_all", "unshown")) : cur.flistSelectedCnt == cur.flistSelInRow && addClass("flist_sel_show_all", "unshown"), cur.flistLimit && cur.flistSelectedCnt == cur.flistLimit - 1 && removeClass(cur.flistAllCont, "flist_full"), curBox().changed = !0
        } else if (!hasClass(t, "flist_item_checked")) {
            if (cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit) return Privacy.flistFull(r || window.event), !1;
            var n = val(t);
            if (addClass(t, "flist_item_checked"), 0 == cur.flistSelectedCnt && (hide("flist_info"), show("flist_search_toggler_wrap")), cur.flistSelectedCnt++, cur.flistSelCont.insertBefore(ce("div", {
                    id: "flist_item_sel" + i,
                    className: "flist_item_wrap",
                    innerHTML: n
                }), cur.flistSelCont.firstChild), cur.flistSelectedCnt > cur.flistSelInRow) {
                var o = geByClass("flist_item_wrap", cur.flistSelCont);
                re(o[o.length - 1]), val("flist_sel_show_all", "+" + (cur.flistSelectedCnt - cur.flistSelInRow)), removeClass("flist_sel_show_all", "unshown")
            }
            cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit && Privacy.flistFull(r || window.event);
            for (var l = 0; l < cur.flistList.length; l++)
                if (cur.flistList[l] && cur.flistList[l][0] == i) {
                    cur.flistSelectedList.unshift(cur.flistList[l]);
                    break
                }
            cur.flistSelected[i] = 1, cur.flistSearchStr && Privacy.flistSearch(!1)
        }
        return toggleClass("flist_cont", "flist_select_items", cur.flistSelectedCnt > 0), cur.flistCountStr && val("flist_sel_summary", cur.flistSelectedCnt > 0 ? langNumeric(cur.flistSelectedCnt, cur.flistCountStr) : cur.flistNoSelStr), cur.flistScrollbar.update(), !1
    },
    flistFull: function(i) {
        if (i) {
            var e;
            if (hasClass(i.target, "flist_item_thumb") ? e = i.target : (hasClass(i.target, "flist_item") && (e = i.target) || (e = gpeByClass("flist_item", i.target))) && (e = geByClass1("flist_item_thumb", e)), e) {
                window.tooltips && window.tooltips.hideAll();
                showTooltip(e, {
                    text: cur.limitTooltip,
                    className: "flist_max_size_tt",
                    dir: "auto",
                    slide: -15,
                    shift: [15, 10],
                    nohide: 1,
                    nohideover: 1,
                    hasover: 1
                });
                setTimeout(function() {
                    tooltips.hide(e)
                }, 2e3)
            }
        }
        addClass(cur.flistAllCont, "flist_full")
    },
    flistSearch: function(i) {
        return i = trim(i), cur.flistSearchStr = i, cur.privacy.pagination && !cur.flistSelectedShowed && cur.flistIndex.list.length < cur.flistTotalCount && i ? void Privacy.flistSearchPagination() : (cur.flistSearchList = [], cur.flistSearchTotal = -1, cur.flistSearchLoadStr = "", clearTimeout(cur.flistSearchLoadMore), i ? (cur.flistList = (cur.flistSelectedShowed ? cur.flistSelectedIndex : cur.flistIndex).search(i), cur.flistSelection = {
            re: new RegExp("(" + i.replace(cur.flistIndex.delimiter, "|").replace(/[\/\\\(\)\[\]\{\}\*,]/g, "").replace(/^\||\|$/g, "") + ")", "gi"),
            val: '<em class="highlight">$1</em>'
        }, cur.flistScrollbar.scrollTop(0)) : (cur.flistList = cur.flistSelectedShowed ? cur.flistSelectedList : cur.flistFriends, cur.flistSelection = !1, val(cur.flistSearchEl, ""), addClass("ui_search_field_empty", cur.flistSearchContEl)), void(cur.flistList.length && (cur.flistAllCont.innerHTML = "", cur.flistShown = -1, Privacy.flistMore())))
    },
    flistSearchPagination: function() {
        function i() {
            cur.flistSearchLoading = !0, ajax.post("al_friends.php", extend({}, cur.privacy.chooseBoxOpts || {}, {
                act: "select_friends_search",
                q: e,
                offset: cur.flistSearchLoadStr === e ? cur.flistSearchList.length : 0
            }), {
                onDone: function(i, r) {
                    cur.flistSearchLoadStr !== e && (cur.flistSearchLoadStr = e, cur.flistShown = -1, cur.flistSearchList = [], cur.flistAllCont.innerHTML = ""), cur.flistSearchTotal = +r, i.forEach(function(i) {
                        cur.flistSearchList.push(i)
                    }), cur.flistList = cur.flistSearchList, Privacy.flistDrawItems(), cur.flistSearchLoading = !1
                },
                onFail: function() {
                    cur.flistSearchLoading = !1
                }
            })
        }
        if (!(cur.flistSearchLoading || cur.flistSearchLoadStr === cur.flistSearchStr && cur.flistSearchList.length >= cur.flistSearchTotal)) {
            var e = cur.flistSearchStr;
            cur.flistSearchLoadMore && clearTimeout(cur.flistSearchLoadMore), cur.flistSearchLoadStr === e ? i() : cur.flistSearchLoadMore = setTimeout(i, 500)
        }
    },
    flistToggleAllSelected: function() {
        cur.flistSelectedShowed ? (cur.flistSelectedShowed = 0, removeClass("flist_sel_show_all", "flist_sel_showed_all"), removeClass("flist_search_toggler", "on"), 0 === cur.flistSelectedCnt && (hide("flist_search_toggler_wrap"), removeClass("flist_cont", "flist_select_items")), Privacy.flistSearch(!1)) : (cur.flistSelectedShowed = 1, addClass("flist_sel_show_all", "flist_sel_showed_all"), addClass("flist_search_toggler", "on"), cur.flistList = cur.flistSelectedList, cur.flistAllCont.innerHTML = "", cur.flistShown = -1, Privacy.flistMore(), cur.flistSelectedIndex = new vkIndexer(cur.flistSelectedList, function(i) {
            return i[1] + " " + i[4]
        })), cur.flistSelection = !1, val(cur.flistSearchEl, "")
    },
    hideFriends: function(i, e) {
        var r = cur.privacy[i][2];
        return showBox("al_friends.php", {
            act: "select_friends_box",
            from: "friends_privacy",
            Checked: r.join(",")
        }, {
            stat: ["privacy.js", "privacy.css", "indexer.js"],
            params: {
                dark: 1
            }
        }), cur.onFlistSave = function(e, r, t) {
            ajax.post("al_settings.php", {
                act: "hide_friends",
                hash: t,
                ids: e.join(",")
            }, {
                onDone: function(e, r) {
                    ge("privacy_" + i + "_hide").innerHTML = e, cur.privacy[i] = r, cur.onPrivacyChanged && cur.onPrivacyChanged(i)
                }
            })
        }, !1
    },
    customType: 4,
    someType: 5,
    listsType: 6,
    update: function(i) {
        var e = ge("privacy_edit_" + i),
            r = cur.privacy[i],
            t = r[0],
            s = cur.privacy[i + "_types"] || cur.privacy._types,
            l = cur.privacy[i + "_lists"] || cur.privacy._lists || {},
            c = {};
        for (var a in l) {
            var n = parseInt(a);
            c[n] = l[a]
        }
        if (e) {
            e.innerHTML = s[t];
            var o = ge("privacy_header");
            o && (o.innerHTML = s[t]);
            var u = gpeByClass("privacy_edit_wrap", e);
            if (u && u.nextSibling)
                if (t == Privacy.listsType) {
                    var f = [];
                    for (var a in r[2]) {
                        var d = -r[2][a],
                            v = (d - 1) % 8 + 1;
                        c[d] && f.push(100 > d ? '<a href="/friends?section=list' + d + '" class="group' + v + '">' + c[d] + "</a>" : '<span class="group' + v + '">' + c[d] + "</span>")
                    }
                    u.nextSibling.innerHTML = (f.length ? ": " : "") + f.join(", ")
                } else u.nextSibling.innerHTML = "";
            if (u && hasClass(u, "privacy_graphic")) {
                var p = 0 == t && "hidden_friends" !== i || t == Privacy.customType && r[1] && r[2] && "0" == r[2][0] || 1 == t && "appscall" === i;
                (p ? removeClass : addClass)(u, "privacy_locked")
            }
        }
        cur.onPrivacyChanged && cur.onPrivacyChanged(i)
    },
    someSaved: function(i, e, r, t) {
        cur.privacy[i] = [Privacy.someType, 0, e, []];
        for (var s = cur.privacy.lang || {}, l = e.length, c = [], a = 0; l > a && 5 > a; ++a) {
            var n = e[a],
                o = t ? r[a] : r[n],
                u = o[4].replace(/'/g, "");
            c.push('<a href="/' + (u ? u : "id" + n) + '" onclick="return nav.go(this, event)">' + (o[5] || o[1]) + "</a>")
        }
        c = c.join(", "), l > 5 && (c += " " + (s.some ? getLang(s.some, l - 5) : getLang("privacy_N_friends_some", l - 5)));
        var f = ge("privacy_edit_" + i),
            d = gpeByClass("privacy_edit_wrap", f),
            v = cur.privacy[i + "_types"] || cur.privacy._types;
        f.innerHTML = v[Privacy.someType], d.nextSibling.innerHTML = ": " + c, cur.onPrivacyChanged && cur.onPrivacyChanged(i)
    },
    customSaved: function(i, e, r, t) {
        cur.privacy[i] = e;
        var s = cur.privacy.lang || {};
        if (1 == e[1] && !e[3].length || e[0] == Privacy.listsType) Privacy.update(i);
        else if (e[0] == Privacy.someType) Privacy.someSaved(i, e[2], r, !0);
        else {
            var l = ge("privacy_edit_" + i),
                c = gpeByClass("privacy_edit_wrap", l),
                a = cur.privacy[i + "_types"] || cur.privacy._types,
                n = cur.privacy[i + "_lists"] || cur.privacy._lists || {},
                o = a[Privacy.listsType],
                u = "";
            if (1 == e[1]) o = a[e[2][0]];
            else {
                u = [];
                for (var f = r.length, d = !1, v = 0; f > v && 5 > v; ++v) {
                    var p = r[v],
                        h = p[0];
                    if (h > 0) {
                        var _ = p[4].replace(/'/g, "");
                        d = !0, u.push('<a href="/' + (_ ? _ : "id" + h) + '" onclick="return nav.go(this, event)">' + p[6] + "</a>")
                    } else {
                        var y = -h,
                            S = (y - 1) % 8 + 1;
                        u.push('<a href="/friends?section=list' + y + '" class="group' + S + '">' + n[y] + "</a>")
                    }
                }
                d && (o = a[Privacy.someType]), u = ": " + u.join(", "), f > 5 && (u += " " + getLang(s.some || "privacy_N_friends_some", f - 5))
            }
            if (t.length) {
                for (var f = t.length, g = [], v = 0; f > v && 5 > v; ++v) {
                    var p = t[v],
                        h = p[0];
                    if (h > 0) {
                        var _ = p[4].replace(/'/g, "");
                        g.push('<a href="/' + (_ ? _ : "id" + h) + '" onclick="return nav.go(this, event)">' + p[6] + "</a>")
                    } else {
                        var y = -h,
                            S = (y - 1) % 8 + 1;
                        g.push('<a href="/friends?section=list' + y + '" class="group' + S + '">' + n[y] + "</a>")
                    }
                }
                u += ", " + getLang("global_privacy_except") + " " + g.join(", "), f > 5 && (u += " " + getLang("privacy_N_friends_more", f - 5))
            }
            l.innerHTML = o, c.nextSibling.innerHTML = u, hasClass(c, "privacy_graphic") && (e[1] && e[2] && "0" == e[2][0] ? removeClass : addClass)(c, "privacy_locked"), cur.onPrivacyChanged && cur.onPrivacyChanged(i)
        }
    },
    choose: function(i, e, r, t) {
        var s = cur.privSel,
            l = cur.privacy[s],
            c = cur.privacy._noselect || "chat_actions" == s;
        if (cur.privacyNeedConfirm && !t) return void cur.privacyNeedConfirm(s, e, function() {
            Privacy.show(ge("privacy_edit_" + s), i, s), Privacy.choose(i, e, r, !0)
        });
        if (c) return cur.onPrivacyChanged && cur.onPrivacyChanged(s, e, r), Privacy.qhide(), cancelEvent(i);
        if (e == Privacy.customType) {
            var a, n, o = [],
                u = "";
            return l[0] == Privacy.customType ? (a = l[1], n = l[2], o = l[3]) : l[0] == Privacy.someType || l[0] == Privacy.listsType ? (a = 0, n = l[2]) : (a = 1, n = l[2]), cur.onCprivSave = Privacy.customSaved.pbind(s), cur.privacy.custom_box_type && (u = cur.privacy.custom_box_type), showBox("al_friends.php", extend(cur.privacy.chooseBoxOpts || {}, {
                act: "custom_privacy_box",
                type: a,
                plus: n.join(","),
                minus: o.join(","),
                opt: u,
                key: s
            }), {
                stat: ["ui_controls.js", "ui_controls.css"]
            })
        }
        if (e == Privacy.someType) {
            var f = l[0] == Privacy.someType || l[0] == Privacy.complexType && 0 == l[1] ? l[2].join(",") : "";
            return cur.onFlistSave = function(i, e) {
                Privacy.someSaved(s, i, e)
            }, showTabbedBox("al_friends.php", extend({}, cur.privacy.chooseBoxOpts || {}, {
                act: "select_friends_box",
                Checked: f,
                pagination: cur.privacy.pagination ? 1 : ""
            }), {
                stat: ["ui_controls.js"]
            })
        }
        if (e == Privacy.listsType) {
            var d = ge("privacy_l_item" + r);
            if ("l_item_sel" == d.className) {
                d.className = "l_item";
                var v = indexOf(l[2], -r);
                if (-1 != v && l[2].splice(v, 1), !l[2].length && "updates" != s) {
                    var p = cur.privacy[s + "_types"] || cur.privacy._types,
                        h = Object.keys(p);
                    cur.privacy[s] = [intval(h[0]), 1, [0],
                        []
                    ]
                }
            } else d.className = "l_item_sel", l[0] != e && (l = cur.privacy[s] = [e, 0, [],
                []
            ]), l[2].push(-r);
            return Privacy.update(s), cancelEvent(i)
        }
        cur.privacy[s] = [e, 1, [e],
            []
        ], Privacy.update(s), Privacy.qhide()
    },
    select: function(i, e) {
        if (e || i !== cur.privSelIndex) {
            if (cur.privSelIndex !== !1) {
                var r = ge("privacy_item" + cur.privSelIndex);
                r && (r.className = "item"), cur.privSelIndex == Privacy.listsType && cur.privacy[cur.privSel][0] != Privacy.listsType && (Privacy.toup ? hide(r.previousSibling) : hide(r.nextSibling))
            }
            cur.privSelIndex = i;
            var r = ge("privacy_item" + cur.privSelIndex),
                t = cur.privSelIndex == Privacy.someType ? "_plus" : "";
            r.nextSibling && r.nextSibling.id == "privacy_item" + Privacy.listsType && isVisible(r.nextSibling.nextSibling) ? r.className = "last item_sel" + t : i == Privacy.listsType ? Privacy.toup ? show(r.previousSibling) : show(r.nextSibling) : r.className = "item_sel" + t
        }
    },
    unselect: function(i) {
        i == cur.privSelIndex && (ge("privacy_item" + i).className = "item", cur.privSelIndex = !1)
    },
    hide: function(i) {
        if (i > 0) return void(cur.hidePrivacyTimer = setTimeout(Privacy.hide.pbind(0), i));
        clearTimeout(cur.hidePrivacyTimer);
        var e = ge("privacy_header");
        e && (-1 == i ? (hide(cur.privEl), e && e.tt && isFunction(e.tt.hide) && e.tt.hide()) : isVisible && (fadeOut(cur.privEl, 200), e && e.tt && isFunction(e.tt.hide) && e.tt.hide()), cur.privSel = cur.privSelIndex = !1, removeEvent(document, "click", Privacy.qhide))
    },
    show: function(i, e, r, t) {
        var s = cur.privacy[r],
            l = (-1 != r.indexOf("actions"), gpeByClass("privacy_edit_wrap", i));
        if (s && l) {
            if (cur.onPrivacyShow && cur.onPrivacyShow(r), cur.privEl || (cur.privEl = ge("privacy_dropdown")) && (cur.privRows = cur.privEl.firstChild), cur.privEl) {
                if (cur.privEl.parentNode != l) {
                    re(cur.privEl), cur.privEl = l.appendChild(cur.privEl);
                    var c = ge("privacy_header");
                    c && c.tt && isFunction(c.tt.hide) && c.tt.hide()
                }
            } else cur.privEl = l.appendChild(ce("div", {
                id: "privacy_dropdown",
                innerHTML: '<div class="rows"></div>'
            })), cur.privRows = cur.privEl.firstChild, addEvent(cur.privEl, "mouseout", Privacy.hide.pbind(500)), addEvent(cur.privEl, "mouseover", function() {
                clearTimeout(cur.hidePrivacyTimer)
            });
            cur.privEl.className = "privacy_dropdown privacy_dropdown_" + r, setTimeout(addEvent.pbind(document, "click", Privacy.qhide), 1);
            var a = cur.privacy[r + "_types"] || cur.privacy._types,
                n = cur.privacy[r + "_lists"] || cur.privacy._lists || {},
                o = cur.privacy[r + "_hidden"] || cur.privacy._hidden || {},
                u = getStyle(i, "fontSize") || vk.fs;
            setStyle(cur.privRows, {
                fontSize: u
            }), cur.privSelIndex = s[0], o[cur.privSelIndex] && (cur.privSelIndex = 0);
            var f, d, v = [],
                p = !1;
            for (var h in n) {
                p = !0;
                break
            }
            v.push('<div class="header" onclick="Privacy.hide(-1)"><div id="privacy_header" class="header_label">' + i.innerHTML + "</div></div>"), v.push('<div class="body">');
            for (var h in a)
                if (!o[h]) {
                    if (f = h == cur.privSelIndex && h != Privacy.listsType ? "_sel" : "", d = "onmouseover=\"Privacy.select('" + h + "')\" onclick=\"Privacy.choose(event, '" + h + "')\"", h == Privacy.listsType) {
                        if (!p) continue
                    } else d += " onmouseout=\"Privacy.unselect('" + h + "')\"";
                    f && h == Privacy.someType && (f += "_plus"), v.push('<div class="item' + f + '" id="privacy_item' + h + '" ' + d + ">" + a[h] + "</div>")
                }
            if (a[Privacy.listsType] && p) {
                var _ = cur.privSelIndex != Privacy.listsType;
                v.push('<div id="privacy_lists" class="privacy_lists">'), v.push('<div class="l_header" onclick="return cancelEvent(event)"><div class="l_header_label">' + a[Privacy.listsType] + "</div></div>");
                for (var h in n) {
                    var y = parseInt(h),
                        f = _ ? "" : inArray(-y, s[2]) ? "_sel" : "";
                    v.push('<div class="l_item' + f + '" id="privacy_l_item' + y + '" onclick="Privacy.choose(event, ' + Privacy.listsType + ", " + y + ')"><div class="privacy_item_icon"></div>' + n[h] + "</div>")
                }
                v.push("</div>")
            }
            v.push("</div>"), cur.privRows.innerHTML = v.join(""), cur.privSel = r;
            var S = data(cur.privEl, "tween");
            if (S && S.stop(!0), show(cur.privEl), a[Privacy.listsType] && _ && hide("privacy_lists"), Privacy.toup = !1, getClientRectOffsetY(cur.privEl) > 0 && getClientRectOffsetY(cur.privEl, !1, getSize(cur.privEl)[1]) > 0) {
                Privacy.toup = !0;
                var g = cur.privRows;
                g.appendChild(g.firstChild);
                for (var m = g.firstChild, C = m.firstChild, w = !1; C.nextSibling && C.nextSibling != w; C = m.firstChild) w = w ? m.insertBefore(C, w) : m.appendChild(C);
                var P = m.firstChild;
                if ("privacy_lists" == P.id)
                    for (var C = P.firstChild, w = !1; C.nextSibling && C.nextSibling != w; C = P.firstChild) w = w ? P.insertBefore(C, w) : P.appendChild(C)
            }
            Privacy.toup ? addClass(cur.privEl, "pdd_to_up") : removeClass(cur.privEl, "pdd_to_up"), cur.privacy[r + "_ralign"] ? addClass(cur.privEl, "pdd_ralign") : removeClass(cur.privEl, "pdd_ralign");
            var T = cur.privacy[r + "_help"],
                L = cur.privacy[r + "_help_w"];
            if (T) {
                var c = ge("privacy_header"),
                    x = getSize(c);
                showTooltip(c, {
                    text: T,
                    width: L ? L : 300,
                    dir: "left",
                    slideX: 15,
                    shift: [-(x[0] + 10), -x[1] / 2, 0],
                    nohide: !0
                })
            }
            return cancelEvent(e)
        }
    },
    getValue: function(i) {
        if (!cur.privacy || !cur.privacy[i]) return "";
        var e = cur.privacy[i],
            r = [];
        if (e[0] < Privacy.customType) r = [e[0]];
        else if (e[0] == Privacy.someType) r = [4, e[2].join(",")];
        else if (e[0] == Privacy.listsType) {
            var t = [];
            for (var s in e[2]) t.push(-e[2][s]);
            r = [5, t.join(",")]
        } else r = [-1, e[1], e[2].join(","), e[3].join(",")];
        return r.join("_")
    }
};
Privacy.qhide = Privacy.hide.pbind(-1);
try {
    jsDispatcher.triggerOnload("privacy.js")
} catch (e) {}
try {
    stManager.done("privacy.js")
} catch (e) {}