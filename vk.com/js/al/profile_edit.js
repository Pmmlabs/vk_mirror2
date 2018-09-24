var ProfileEditor = {
    controller: "al_profileEdit.php",
    go: function(e, i) {
        return ProfileEditor.checkChanges(1) === !1 ? (cur.onContinueCb = ProfileEditor.go.pbind(e, i), !1) : uiRightMenu.go(e, i)
    },
    showMsg: function(e) {
        showMsg("pedit_result", e, "ok_msg", !0), show("pedit_result"), scrollToTop(200)
    },
    initBeforeUnload: function() {
        cur.nav.push(function(e, i, t, r) {
            return ProfileEditor.checkChanges(1) === !1 ? (cur.onContinueCb = nav.go.pbind(t), !1) : void 0
        }), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = ProfileEditor.checkChanges, cur.destroy.push(function() {
            window.onbeforeunload = cur.prevBefUnload
        })
    },
    initGeneral: function() {
        cur.section = "general";
        var e = cur.options,
            i = ge("pedit_name_tt_place");
        each([ge("pedit_first_name"), ge("pedit_last_name")], function() {
            this && this != window && !this.setTimeout && (this.onfocus = function() {
                showTooltip(i, {
                    text: getLang("profileEdit_name_be_patient"),
                    slideX: 15,
                    className: "pedit_tt",
                    shift: [-12, -15, 0],
                    dir: "left",
                    onCreate: function() {
                        removeEvent(i, "mouseout")
                    }
                })
            }, this.onblur = function() {
                i.tt && i.tt.hide()
            })
        }), each(["home_town", "first_name", "last_name", "middle_name", "maiden_name"], function(i, t) {
            e[t] = replaceEntities(e[t])
        }), toggle("pedit_maiden_row", 1 == e.sex), cur.uiSex = new Dropdown(ge("pedit_sex"), e.sexes, {
            multiselect: !1,
            selectedItems: e.sex,
            onChange: function(i) {
                hide("pedit_status_ptitle", "pedit_status_partner", "pedit_status_detail"), toggle("pedit_maiden_row", 1 == intval(i)), cur.uiPartner.clear(), cur.uiStatus.clear(), intval(i) ? (show("pedit_status_row"), cur.uiStatus.setData(e.statuses[intval(i)])) : hide("pedit_status_row")
            },
            dark: 1
        });
        var t = function(e) {
                e ? cur.uiPartner.selectItem(e) : cur.uiPartner.val(0), cur.onPartnerGot && (cur.onPartnerGot(), cur.onPartnerGot = !1)
            },
            r = function(i) {
                if (!cur.uiSex.val()) return void t(0);
                var r = cur.uiStatus.val();
                if (-1 == i)
                    if (7 == r) {
                        var a = val("pedit_partner_custom");
                        if (a == e.partners[0][1]) return void t(0);
                        ajax.post(ProfileEditor.controller, {
                            act: "a_get_custom_partner",
                            query: a
                        }, {
                            onDone: function(e, i, a) {
                                t(!e || !i && 7 != r ? 0 : e)
                            },
                            onFail: function(e) {
                                return t(0), setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                            },
                            showProgress: show.pbind("pedit_status_progress"),
                            hideProgress: hide.pbind("pedit_status_progress")
                        })
                    } else t(0);
                intval(i) && r > 1 && cur.uiStatus.val() < 6 ? intval(i) == e.partner ? ge("pedit_status_detail_content").innerHTML && show("pedit_status_detail") : hide("pedit_status_detail") : (intval(i) || cur.uiPartner.clear(), hide("pedit_status_detail"))
            };
        e.status < 0 || e.status > 8 ? e.status = 0 : e.status > 1 && 6 != e.status && show("pedit_status_partner"), cur.uiStatus = new Dropdown(ge("pedit_status"), e.statuses[e.sex], {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.status,
            onChange: function(i) {
                i = intval(i), i > 1 && 6 != i ? ProfileEditor.updateFriendsList(function() {
                    show("pedit_status_partner"), e.ptitles[i][cur.uiSex.val()].length ? (ge("pedit_status_ptitle").innerHTML = e.ptitles[i][cur.uiSex.val()] + ":" || "&nbsp;", show("pedit_status_ptitle")) : hide("pedit_status_ptitle"), r(cur.uiPartner.val())
                }) : (hide("pedit_status_partner", "pedit_status_ptitle"), r(cur.uiPartner.val()))
            },
            dark: 1
        }), cur.uiPartner = new Selector(ge("pedit_partner"), e.partners, {
            multiselect: !1,
            autocomplete: !0,
            enableCustom: !0,
            placeholder: e.partners[0][1],
            noResult: "",
            introText: "",
            selectedItems: e.partner,
            onChange: r,
            dark: 1
        });
        var a = cur.uiPartner.input,
            n = ge("pedit_partner_tt_place"),
            o = ge("pedit_partner_tt_place1");
        addEvent(a, "focus blur", function(i) {
            "focus" == i.type ? 7 == cur.uiStatus.val() ? showTooltip(n, {
                text: getLang("profileEdit_partner_hint"),
                slideX: 15,
                className: "pedit_tt",
                shift: [-12, -15, 0],
                dir: "left",
                onCreate: function() {
                    removeEvent(n, "mouseout")
                }
            }) : -1 != indexOf([2, 3, 4, 5, 7, 8], cur.uiStatus.val()) && showTooltip(o, {
                text: e.status_helps[3 - cur.uiSex.val()],
                slideX: 15,
                className: "pedit_tt",
                shift: [-12, -15, 0],
                dir: "left",
                onCreate: function() {
                    removeEvent(o, "mouseout")
                }
            }) : (n.tt && n.tt.hide && n.tt.hide(), o.tt && o.tt.hide && o.tt.hide())
        }), e.sex && (show("pedit_status_row"), e.status > 1 && 6 != e.status && (e.ptitles[e.status][e.sex].length && (ge("pedit_status_ptitle").innerHTML = e.ptitles[e.status][e.sex] + ":" || "&nbsp;", show("pedit_status_ptitle")), show("pedit_status_partner"))), e.partner && ge("pedit_status_detail_content").innerHTML && show("pedit_status_detail"), cur.uiBday = new Dropdown(ge("pedit_bday"), ProfileEditor.generateDays(e.byear, e.bmonth).slice(intval(e.bday) ? 1 : 0), {
            multiselect: !1,
            selectedItems: e.bday,
            dark: 1
        }), cur.uiBmonth = new Dropdown(ge("pedit_bmonth"), e.bmonths.slice(intval(e.bmonth) ? 1 : 0), {
            multiselect: !1,
            selectedItems: e.bmonth,
            onChange: function(e) {
                ProfileEditor.updateDays(cur.uiByear.val(), e)
            },
            dark: 1
        }), cur.uiByear = new Dropdown(ge("pedit_byear"), e.byears.slice(intval(e.byear) ? 1 : 0), {
            multiselect: !1,
            selectedItems: e.byear,
            onChange: function(e) {
                ProfileEditor.updateDays(e, cur.uiBmonth.val())
            },
            dark: 1
        }), cur.uiBdayVisibility = new Dropdown(ge("pedit_bday_visibility"), e.bday_visibilities, {
            multiselect: !1,
            selectedItems: e.bday_visibility,
            dark: 1
        }), ge("pedit_home_town").value = e.home_town, e.langs = e.langs.map(function(e) {
            return e[1] = winToUtf(e[1]), e
        }), cur.uiLangs = new Dropdown(ge("pedit_langs"), e.langs, {
            multiselect: !0,
            autocomplete: !0,
            indexkeys: [1, 2],
            selectedItems: e.lang,
            placeholder: getLang("profileEdit_langs_placeholder"),
            dark: 1
        }), cur.relations = [], cur.relGuid = 0, cur.relIds = {
            grandparent: 0,
            parent: 0,
            sibling: 0,
            child: 0,
            grandchild: 0
        }, cur.relLimits = {
            grandparent: 4,
            parent: 2,
            sibling: 15,
            child: 15,
            grandchild: 15
        }, cur.conts = {
            grandparent: "pedit_grandparents",
            parent: "pedit_parents",
            sibling: "pedit_siblings",
            child: "pedit_children",
            grandchild: "pedit_grandchildren"
        }, cur.placeholders = {
            grandparent: getLang("profileEdit_grandparent_placeholder"),
            parent: getLang("profileEdit_parent_placeholder"),
            sibling: getLang("profileEdit_sibling_placeholder"),
            child: getLang("profileEdit_child_placeholder"),
            grandchild: getLang("profileEdit_grandchild_placeholder")
        }, ProfileEditor.updateFamily(e.family), ProfileEditor.initBeforeUnload(), cur.module = "profileEdit"
    },
    initContacts: function() {
        cur.section = "contacts", selectsData.setCountries(cur.selectData.countries), selectsData.setCities(cur.selectData.country, cur.selectData.cities), cur.selectData.city_val = cur.selectData.city_val || ["", ""], cur.selectData.country_val = cur.selectData.country_val || ["", ""], cur.uiCity = new CitySelect(ge("pedit_city"), ge("pedit_city_row"), {
            progressBar: ge("pedit_country_progress"),
            city: cur.selectData.city_val,
            country: cur.selectData.country,
            maxItemsShown: function(e) {
                return e > 6 ? 500 : 350
            },
            dark: 1
        }), cur.uiCountry = new CountrySelect(ge("pedit_country"), ge("pedit_country_row"), {
            progressBar: ge("pedit_country_progress"),
            country: cur.selectData.country_val,
            citySelect: cur.uiCity,
            dark: 1
        }), ge("pedit_email").value = cur.options.email, ge("pedit_mobile").value = cur.options.mobile, ge("pedit_home").value = cur.options.home, ge("pedit_website").value = cur.options.website, ge("pedit_skype").value = cur.options.skype, each(["home", "mobile", "email"], function() {
            var e = ge("privacy_edit_" + this);
            e.setAttribute("data-title", e.innerHTML), e.onmouseover = showTitle.pbind(e, !1, [15, 6])
        }), cur.onPrivacyShow = function(e) {
            var i = ge("privacy_edit_" + e),
                t = gpeByClass("pedit_privacy_control", i);
            t && t.tt && isFunction(t.tt.hide) && t.tt.hide()
        }, cur.onPrivacyChanged = function(e) {
            var i = ge("privacy_edit_" + e),
                t = cur.privacy[e],
                r = t[0];
            if (i) {
                var a = i.innerHTML;
                i = gpeByClass("pedit_privacy_control", i), r > 0 ? (removeClass(i, "pedit_privacy"), addClass(i, "pedit_privacy_locked")) : (removeClass(i, "pedit_privacy_locked"), addClass(i, "pedit_privacy")), geByTag1("a", i).setAttribute("data-title", a)
            }
        }, ProfileEditor.initBeforeUnload()
    },
    wereChanges: function(e) {
        switch (e) {
            case "general":
                var i = cur.options;
                return val("pedit_sex") != i.sex || val("pedit_status") != i.status || val("pedit_partner") != i.partner || val("pedit_bday") != i.bday || val("pedit_bmonth") != i.bmonth || val("pedit_byear") != i.byear || val("pedit_bday_visibility") != i.bday_visibility || val("pedit_home_town") != i.home_town || val("pedit_first_name") != i.first_name || val("pedit_last_name") != i.last_name || ge("pedit_middle_name") && val("pedit_middle_name") != i.middle_name || val("pedit_maiden_name") != i.maiden_name || val("pedit_langs") != i.lang && (val("pedit_langs") || i.lang);
            case "contacts":
                var i = cur.options;
                return ge("pedit_email").value != i.email || ge("pedit_mobile").value != i.mobile || ge("pedit_home").value != i.home || ge("pedit_website").value != i.website || ge("pedit_skype").value != (i.skype || "") || (parseInt(ge("pedit_country").value) || "") != (cur.selectData.country_val[0] || "") || (parseInt(ge("pedit_city").value) || "") != (cur.selectData.city_val[0] || "");
            case "interests":
                var t = !1;
                return each(["activities", "interests", "music", "movies", "tv", "books", "games", "quotes", "about"], function(e, i) {
                    var r = ge("pedit_interests_" + i);
                    t |= cur.interests_data[i].replace(/\x0d/g, "") != val(r).replace(/\x0d/g, "")
                }), t;
            case "education":
                var r = !1,
                    a = !1;
                if (isVisible("primary_uni"))
                    if (ProfileEditorEdu.uniChanged(cur.primary_uni)) a = !0;
                    else
                        for (var n = 0; n < cur.unis.length; ++n) cur.unis[n].id > 0 && ProfileEditorEdu.uniChanged(cur.unis[n]) ? a = !0 : cur.unis[n].id < 0 && isVisible("uni_content" + cur.unis[n].id) && cur.unis[n].uiUniversity.val() && (a = !0);
                if (isVisible("schools"))
                    for (var n = 0; n < cur.schools.length; ++n) cur.schools[n].id > 0 && ProfileEditorEdu.schoolChanged(cur.schools[n]) ? r = !0 : cur.schools[n].id < 0 && isVisible("school_content" + cur.schools[n].id) && cur.schools[n].uiSchool.val() && (r = !0);
                return a || r;
            case "career":
                for (var o = !1, n = 0; n < cur.works.length; ++n) {
                    var s = (cur.works[n].uiPosition.val_full() || [])[1] || "",
                        l = ge("company" + cur.works[n].id);
                    cur.works[n].id > 0 && ProfileEditorJob.workChanged(cur.works[n]) ? o = !0 : cur.works[n].id < 0 && isVisible("content" + cur.works[n].id) && (l && l.value.length || s.length) && (o = !0)
                }
                return o;
            case "military":
                for (var c = !1, n = 0; n < cur.militaries.length; ++n) cur.militaries[n].id > 0 && ProfileEditorMil.militaryChanged(cur.militaries[n]) ? c = !0 : cur.militaries[n].id < 0 && isVisible("content" + cur.militaries[n].id) && intval(ge("unit" + cur.militaries[n].id).value) && (c = !0);
                return c;
            case "personal":
                var i = cur.options;
                return cur.uiPolitical.val() != i.political || cur.uiReligion.val_full()[1].toLowerCase() != i.religion.toLowerCase() && (cur.uiReligion.val() || "" != i.religion) || val("pedit_life") != i.life_priority || val("pedit_people") != i.people_priority || val("pedit_smoking") != i.smoking || val("pedit_alcohol") != i.alcohol || val("pedit_inspired_by") != i.inspired_by
        }
    },
    checkChanges: function(e) {
        if (!cur.leaving) {
            var i = !1;
            if (ProfileEditor.wereChanges(cur.section)) switch (cur.section) {
                case "contacts":
                    i = getLang("profileEdit_contacts_changed");
                    break;
                case "general":
                    i = getLang("profileEdit_general_changed");
                    break;
                case "interests":
                    i = getLang("profileEdit_interests_changed");
                    break;
                case "education":
                    i = getLang("profileEdit_unis_schools_changed");
                    break;
                case "career":
                    i = getLang("profileEdit_works_changed");
                    break;
                case "military":
                    i = getLang("profileEdit_militaries_changed");
                    break;
                case "personal":
                    i = getLang("profileEdit_personal_changed")
            }
            if (1 === e) {
                if (!i) return !0;
                var t = showFastBox(getLang("global_warning"), i, getLang("global_continue"), function() {
                    cur.leaving = !0, t.hide(), cur.onContinueCb && cur.onContinueCb()
                }, getLang("global_cancel"), function() {
                    t.hide(), cur.onCancelCb && cur.onCancelCb()
                });
                return !1
            }
            return i ? winToUtf(i.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "\n")) : void 0
        }
    },
    getLastDay: function(e, i) {
        return 2 == i ? e % 4 == 0 ? 29 : 28 : i > 0 && (8 > i && i % 2 == 0 || i > 7 && i % 2 == 1) ? 30 : 31
    },
    generateDays: function(e, i) {
        for (var t = [
                [0, getLang("profileEdit_main_sel_bday") + ":"]
            ], r = ProfileEditor.getLastDay(e, i), a = 1; r >= a; ++a) t.push([a, a + ""]);
        return t
    },
    updateDays: function(e, i) {
        cur.uiBday.val() > ProfileEditor.getLastDay(e, i) && cur.uiBday.clear(), cur.uiBday.setData(ProfileEditor.generateDays(e, i).slice(intval(cur.options.bday) ? 1 : 0)), cur.onUpdateDays && cur.onUpdateDays(e, i)
    },
    updateFriendsList: function(e) {
        cur.friendsFull ? (ProfileEditor.doUpdateFriendsList(), e()) : ajax.post(ProfileEditor.controller, {
            act: "a_relations_friends"
        }, {
            onDone: function(i) {
                cur.friendsFull = {
                    1: {},
                    2: {}
                };
                for (var t = 1; 2 >= t; ++t) {
                    var r, a = 3 - t;
                    for (var n in i[t]) {
                        for (var o = [], s = clone(i[t][n]), l = [], c = 1; c < s.length; ++c) r = s[c], o.push(r), l.push(r);
                        for (var c = 1; c < i[a][n].length; ++c) r = i[a][n][c], s.push(r), l.push(r);
                        cur.friendsFull[t][n] = [i[t][n], o, s, l]
                    }
                }
                ProfileEditor.doUpdateFriendsList(), e()
            },
            showProgress: show.pbind("pedit_status_progress"),
            hideProgress: hide.pbind("pedit_status_progress")
        })
    },
    doUpdateFriendsList: function() {
        var e = cur.uiStatus.val(),
            i = cur.uiSex.val();
        if (!(2 > e || 6 == e) && i) {
            var t = cur.friendsFull[i].Nom,
                r = 2 == e || 7 == e || 5 == e ? 2 : 0,
                a = cur.uiPartner.val(),
                n = !1;
            for (var o in t[r])
                if (t[r][o][0] == a) {
                    n = !0;
                    break
                }
            n || (a = 0), t[r][0][1] = getLang(5 == e ? "profileEdit_main_sel_rel_with_m" : r ? "profileEdit_main_sel_relat" : "profileEdit_main_sel_rel_with_" + (1 == i ? "m" : "f")), cur.uiPartner.setData(t[r + 1]), cur.uiPartner.setOptions({
                defaultItems: t[r]
            }), cur.uiPartner.setOptions({
                placeholder: t[r][0][1]
            }), cur.uiPartner.val(a, !0)
        }
    },
    deleteLinkHtml: function(e) {
        return '<a class="pedit_del_icon _del_icon" onclick="this.tt.hide(); ' + e + '; return false;" onmouseover="showTitle(this, \'' + getLang("global_delete") + "');\"> </a>"
    },
    updateFamily: function(e) {
        ge("pedit_grandparents").innerHTML = "", ge("pedit_parents").innerHTML = "", ge("pedit_siblings").innerHTML = "", ge("pedit_children").innerHTML = "", ge("pedit_grandchildren").innerHTML = "", cur.relGuid = 0, cur.relIds = {
            grandparent: 0,
            parent: 0,
            sibling: 0,
            child: 0,
            grandchild: 0
        }, relations = [], e && each(e || [], function(e, i) {
            cur.relGuid;
            sel = i.id > 0 ? i.id : [i.id, i.name, "", i.birth], ProfileEditor.addRelation(i.type, sel)
        })
    },
    addRelation: function(e, i) {
        cur.friends ? ProfileEditor.onFriendsLoaded(e, i) : ProfileEditor.loadFriends(e, i)
    },
    onFriendsLoaded: function(e, i) {
        var t = cur.options,
            r = ce("div", {
                id: "pedit_wrap_" + e + cur.relGuid,
                className: "pedit_wrap_relation clear_fix"
            }),
            a = ("child" == e || "grandchild" == e) && (!i || i[0] < 0),
            n = e + cur.relGuid,
            o = "pedit_" + n,
            s = '<div class="pedit_relation_input"><div class="fl_l"><input class="pedit_dropdown" type="hidden" id="' + o + '" name="' + n + '"/></div><div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml("ProfileEditor.removeRelation('" + e + "', " + cur.relGuid + ")") + "</div>",
            l = 0;
        a && (l = i ? parseInt(i[3]) : 0, s += '<div class="pedit_next_input clear_fix clear"><input class="pedit_date_field" type="hidden" id="' + o + '_date" value="' + l + '"><div class="pedit_bday fl_l"><input type="hidden" id="' + o + '_day"/></div><div class="pedit_bmonth fl_l"><input type="hidden" id="' + o + '_month"/></div><div class="pedit_byear fl_l"><input type="hidden" id="' + o + '_year"/></div></div>'), r.innerHTML = s, ge(cur.conts[e]).appendChild(r), cur.relIds[e] + 1 >= cur.relLimits[e] ? hide("pedit_add_" + e + "_link") : show("pedit_add_" + e + "_link");
        new Selector(ge(o), cur.friends, {
            placeholder: cur.placeholders[e],
            introText: "",
            multiselect: !1,
            enableCustom: !0,
            defaultItems: cur.friends,
            selectedItems: i ? [i] : [],
            onChange: function(e) {
                var i = ge(o + "_date");
                i && toggle(i.parentNode, -1 == e)
            },
            dark: 1
        });
        if (a) {
            var c = new Date(1e3 * l),
                d = [t.byears[0]],
                u = 1910;
            parseInt(t.byear) && (u = Math.max(u, parseInt(t.byear) + 10));
            for (var p = u; p <= (new Date).getFullYear(); p++) d.push([p, p]);
            var _ = function() {
                    var e = 0,
                        i = intval(g.val()),
                        t = intval(m.val()),
                        r = intval(h.val());
                    if (i > ProfileEditor.getLastDay(t, r) && (g.val(1), i = 1), g.setData(ProfileEditor.generateDays(t, r)), t) {
                        var a = new Date(t, Math.max(r - 1, 0), Math.max(i, 1));
                        e = Math.floor(a.getTime() / 1e3)
                    }
                    ge(o + "_date").value = e
                },
                g = new Dropdown(ge(o + "_day"), ProfileEditor.generateDays(c.getFullYear(), c.getMonth() + 1), {
                    selectedItems: l ? c.getDate() : 0,
                    onChange: _,
                    dark: 1
                }),
                h = new Dropdown(ge(o + "_month"), t.bmonths, {
                    selectedItems: l ? c.getMonth() + 1 : 0,
                    onChange: _,
                    dark: 1
                }),
                m = new Dropdown(ge(o + "_year"), d, {
                    selectedItems: l ? c.getFullYear() : 0,
                    onChange: _,
                    dark: 1
                })
        }
        cur.relIds[e]++, cur.relGuid++
    },
    switchUnits: function() {
        var e = cur.options.measure = 1 == cur.options.measure ? 2 : 1,
            i = cur.uiWeight.val(),
            t = cur.uiHeight.val(),
            r = cur.options.weights[e],
            a = cur.options.heights[e],
            n = i,
            o = t;
        o >= 140 && 220 >= o && each(a, function() {
            return this[0] >= 140 && this[0] <= 220 && this[0] >= t ? (o = this[0], !1) : void 0
        }), cur.uiHeight.setData(a), cur.uiHeight.val(o), n >= 40 && 140 >= n && each(r, function() {
            return this[0] >= 40 && this[0] <= 140 && this[0] >= i ? (n = this[0], !1) : void 0
        }), cur.uiWeight.setData(r), cur.uiWeight.val(n), ge("pedit_units_toggler").innerHTML = 1 == e ? getLang("profileEdit_switch_to_meters") : getLang("profileEdit_switch_to_inches"), ge("pedit_height_title").innerHTML = 1 == e ? getLang("profileEdit_height_in") : getLang("profileEdit_height_cm"), ge("pedit_weight_title").innerHTML = 1 == e ? getLang("profileEdit_weight_lbs") : getLang("profileEdit_weight_kg")
    },
    removeRelation: function(e, i) {
        var t = ge("pedit_wrap_" + e + i);
        if (t) {
            t.parentNode.removeChild(t);
            cur.relIds[e] - 1 >= cur.relLimits[e] ? hide("pedit_add_" + e + "_link") : show("pedit_add_" + e + "_link"), cur.relIds[e]--
        }
    },
    loadFriends: function(e, i) {
        return cur.onFrLoaded ? cur.onFrLoaded.push([e, i]) : (cur.onFrLoaded = [
            [e, i]
        ], void ajax.post("friends_ajax.php", {
            act: "custom",
            no_lists: 1
        }, {
            onDone: function(e) {
                if (cur.onFrLoaded) {
                    cur.friends = e;
                    for (var i = 0, t = cur.onFrLoaded.length; t > i; ++i) ProfileEditor.onFriendsLoaded(cur.onFrLoaded[i][0], cur.onFrLoaded[i][1])
                }
            }
        }))
    },
    showLoversBox: function() {
        cur.lovers_box = showBox(ProfileEditor.controller, {
            act: "show_lovers_box"
        }, {
            params: {
                width: 495,
                bodyStyle: "padding: 7px 5px 5px;"
            }
        })
    },
    getLoversPage: function(e) {
        var i = cur.lovers_box;
        ajax.post(ProfileEditor.controller, {
            act: "show_lovers_box",
            offset: e
        }, {
            onDone: function(e, t) {
                e && i.setOptions({
                    title: e
                }), t && (i.bodyNode.innerHTML = t)
            },
            showProgress: i.showProgress,
            hideProgress: i.hideProgress,
            cache: 1
        })
    },
    saveGeneral: function(btn) {
        var fName = trim(val("pedit_first_name")),
            lName = trim(val("pedit_last_name")),
            mName = isVisible("pedit_maiden_row") ? trim(val("pedit_maiden_name")) : "",
            nName = trim(val("pedit_middle_name")),
            flmName, cleanFName, cleanLName, cleanMName, peditData = cur.options;
        if (!fName) return notaBene("pedit_first_name"), !1;
        if (!lName) return notaBene("pedit_last_name"), !1;
        if (flmName = cleanName(fName, lName, mName), peditData.first_name == fName && peditData.last_name == lName ? (cleanFName = fName, cleanLName = lName) : (cleanFName = flmName[0], cleanLName = flmName[1]), cleanFName.toLowerCase() != fName.toLowerCase()) return notaBene("pedit_first_name"), !1;
        if (cleanLName.toLowerCase() != lName.toLowerCase()) return notaBene("pedit_last_name"), !1;
        if (cleanMName = flmName[2], cleanMName.toLowerCase() != mName.toLowerCase() && (cleanMName || mName)) return notaBene("pedit_maiden_name"), !1;
        if (-1 == cur.uiPartner.val()) return cur.onPartnerGot = ProfileEditor.saveGeneral.pbind(btn), void cur.uiPartner.options.onChange();
        if (!intval(cur.uiSex.val())) return void cur.uiSex.showDefaultList();
        var params = {
            act: "a_save_general",
            hash: cur.options.hash,
            first_name: cleanFName,
            last_name: cleanLName,
            maiden_name: cleanMName,
            nickname: nName
        };
        if (each(["sex", "status", "partner", "bday", "bmonth", "byear", "bday_visibility"], function() {
                var e = intval(val("pedit_" + this));
                e && (params["" + this] = e)
            }), params.home_town = val("pedit_home_town"), params.langs = cur.uiLangs.val(), parseInt(cur.options.bday) && !intval(params.bday)) return notaBene(geByClass1("selector", cur.uiBday.container), !1, !0), void notaBene(geByClass1("selector_input", cur.uiBday.container), !1, !0);
        if (parseInt(cur.options.bmonth) && !intval(params.bmonth)) return notaBene(geByClass1("selector", cur.uiBmonth.container), !1, !0), void notaBene(geByClass1("selector_input", cur.uiBmonth.container), !1, !0);
        if (parseInt(cur.options.byear) && !intval(params.byear)) return notaBene(geByClass1("selector", cur.uiByear.container), !1, !0), void notaBene(geByClass1("selector_input", cur.uiByear.container), !1, !0);
        var i = 0;
        return peditData.family !== !1 && (params.familyedit = 1, i = 1, each(geByClass("pedit_relation_input", ge("pedit_grandparents")), function() {
            if (params["grandparents[" + i + "]"] = geByClass("resultField", this)[0].value, params["grandparents_custom[" + i + "]"] = geByClass("customField", this)[0].value, -1 == params["grandparents[" + i + "]"] && params["grandparents_custom[" + i + "]"]) {
                var e = params["grandparents_custom[" + i + "]"],
                    t = e.split(/\s+/);
                params["grandparents_custom[" + i + "]"] = cleanName(t[0] || "", t[1] || "").join(" ")
            }
            i++
        }), i = 1, each(geByClass("pedit_relation_input", ge("pedit_parents")), function() {
            if (params["parents[" + i + "]"] = geByClass("resultField", this)[0].value, params["parents_custom[" + i + "]"] = geByClass("customField", this)[0].value, -1 == params["parents[" + i + "]"] && params["parents_custom[" + i + "]"]) {
                var e = params["parents_custom[" + i + "]"],
                    t = e.split(/\s+/);
                params["parents_custom[" + i + "]"] = cleanName(t[0] || "", t[1] || "").join(" ")
            }
            i++
        }), i = 1, each(geByClass("pedit_relation_input", ge("pedit_siblings")), function() {
            if (params["siblings[" + i + "]"] = geByClass("resultField", this)[0].value, params["siblings_custom[" + i + "]"] = geByClass("customField", this)[0].value, -1 == params["siblings[" + i + "]"] && params["siblings_custom[" + i + "]"]) {
                var e = params["siblings_custom[" + i + "]"],
                    t = e.split(/\s+/);
                params["siblings_custom[" + i + "]"] = cleanName(t[0] || "", t[1] || "").join(" ")
            }
            i++
        }), i = 1, each(geByClass("pedit_relation_input", ge("pedit_children")), function() {
            if (params["children[" + i + "]"] = geByClass("resultField", this)[0].value, params["children_custom[" + i + "]"] = geByClass("customField", this)[0].value, params["children_date[" + i + "]"] = (geByClass("pedit_date_field", this)[0] || {
                    value: 0
                }).value, -1 == params["children[" + i + "]"] && params["children_custom[" + i + "]"]) {
                var e = params["children_custom[" + i + "]"],
                    t = e.split(/\s+/);
                params["children_custom[" + i + "]"] = cleanName(t[0] || "", t[1] || "").join(" ")
            }
            i++
        }), i = 1, each(geByClass("pedit_relation_input", ge("pedit_grandchildren")), function() {
            if (params["grandchildren[" + i + "]"] = geByClass("resultField", this)[0].value, params["grandchildren_custom[" + i + "]"] = geByClass("customField", this)[0].value, params["grandchildren_date[" + i + "]"] = (geByClass("pedit_date_field", this)[0] || {
                    value: 0
                }).value, -1 == params["grandchildren[" + i + "]"] && params["grandchildren_custom[" + i + "]"]) {
                var e = params["grandchildren_custom[" + i + "]"],
                    t = e.split(/\s+/);
                params["grandchildren_custom[" + i + "]"] = cleanName(t[0] || "", t[1] || "").join(" ")
            }
            i++
        })), cur.onProfileEditSave && cur.onProfileEditSave(), ajax.post(ProfileEditor.controller, params, {
            onDone: function(response, introScript) {
                if (response.only_name) return void ProfileEditor.showMsg(response.name_response);
                var peditData = cur.options;
                peditData.sex = cur.uiSex.val(), peditData.status = response.status, peditData.partner = response.partner, peditData.bday = cur.uiBday.val(), peditData.bmonth = cur.uiBmonth.val(), peditData.byear = cur.uiByear.val(), peditData.bday_visibility = cur.uiBdayVisibility.val(), peditData.lang = cur.uiLangs.val(), peditData.home_town = val("pedit_home_town"), peditData.first_name = val("pedit_first_name"), peditData.last_name = val("pedit_last_name"), peditData.middle_name = val("pedit_middle_name"), peditData.maiden_name = val("pedit_maiden_name"), cur.uiStatus.val(response.status, !0), cur.uiPartner.val() != response.partner && cur.uiPartner.val(response.partner, !0), peditData.family !== !1 && (peditData.family = response.family, ProfileEditor.updateFamily(peditData.family), peditData.family === !1 && each(geByClass("pedit_general_family_row"), function() {
                    hide(this)
                })), val("pedit_status_detail_content", response.relation_text), peditData.partner ? val("pedit_status_detail_content") && show("pedit_status_detail") : hide("pedit_status_detail"), hide("pedit_name_request", "status_help_wrap"), ProfileEditor.showMsg(response.name_response || getLang("profileEdit_general_changes_saved")), introScript && setTimeout(function() {
                    eval(introScript)
                }, 3e3)
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        }), !1
    },
    nameRequestCancel: function(e, i, t) {
        var r = ce("div", {
            className: "progress"
        }, {
            display: "block"
        });
        ajax.post(ProfileEditor.controller, {
            act: "a_cancel_name",
            request_id: i,
            hash: t
        }, {
            onDone: function(e) {
                hide("pedit_name_request"), ProfileEditor.showMsg(e)
            },
            onFail: function(e) {
                ProfileEditor.showError(e, "name")
            },
            showProgress: function() {
                e.parentNode.replaceChild(r, e)
            },
            hideProgress: function() {
                r.parentNode.replaceChild(e, r)
            }
        })
    },
    nameChangeCancel: function(e, i) {
        cur.nameChangeCancelText || (cur.nameChangeCancelText = e.innerHTML, e.innerHTML = '<div style="padding-top: 8px;"><img src="/images/upload.gif" /></div>', ajax.post(ProfileEditor.controller, {
            act: "a_change_cancel",
            hash: i
        }, {
            onDone: function() {
                e.innerHTML = cur.nameChangeCancelText, cur.nameChangeCancelText = !1
            }
        }))
    },
    saveContacts: function(e) {
        var i = {
                act: "a_save_contacts",
                hash: cur.saveHash
            },
            t = ["email", "mobile", "home", "website", "skype", "country", "city"];
        for (var r in t) i[t[r]] = ge("pedit_" + t[r]).value;
        t = ["email", "mobile", "home"];
        for (var r in t) i["privacy_" + t[r]] = Privacy.getValue(t[r]);
        ajax.post(ProfileEditor.controller, i, {
            onDone: function(e, i) {
                if (e) {
                    for (var t in e) cur.options[t] = e[t], ge("pedit_" + t).value = e[t] || "";
                    cur.selectData.country_val[0] = parseInt(e.country), cur.selectData.city_val[0] = parseInt(e.city)
                }
                i && ProfileEditor.showMsg(i)
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    showSocial: function() {
        hide("pedit_show_social"), show("pedit_social_options")
    },
    setUpTwitter: function() {
        showBox(ProfileEditor.controller, {
            act: "twitter_settings_box"
        }, {
            dark: 1,
            params: {
                width: 460
            }
        })
    },
    setUpFacebook: function(e, i, t, r) {
        if (t && !cur.disableFbExport) return showBox(ProfileEditor.controller, {
            act: "facebook_settings_box"
        });
        var a = "https://graph.facebook.com/v2.9/oauth/authorize?client_id=" + e + "&redirect_uri=" + i + "&scope=email,user_birthday,publish_actions&display=popup&state=" + r,
            n = "scrollbars=0,resizable=1,menubar=0,location=0,left=" + (Math.floor(screen.width / 2) - 300) + ",top=" + (Math.floor(screen.height / 2) - 240) + ",width=600,height=400,toolbar=0,status=0",
            o = window.open(a, "fb", n);
        try {
            o.focus()
        } catch (s) {}
        window.socialCallback = function(e) {
            ge("export_service_3").innerHTML = '<img src="/images/upload.gif" />', ProfileEditor.fetchServiceName(3)
        }
    },
    setUpRSS: function(e) {
        showBox(ProfileEditor.controller, {
            act: "rss_settings_box",
            hash: e
        }, {
            dark: 1,
            params: {
                width: 460
            }
        })
    },
    fetchServiceName: function(e) {
        cur["nameService" + e] = setInterval(function() {
            ajax.post("/al_profileEdit.php", {
                act: "a_get_service_name",
                service: e
            }, {
                onDone: function(i) {
                    if (i.msg) {
                        clearInterval(cur["nameService" + e]), ge("export_service_" + e).innerHTML = i.msg_sett ? i.msg_sett : i.msg;
                        var t = ge("export_box_service_" + e);
                        t && (t.innerHTML = i.msg, cur.showIntegrationSaveBtns())
                    }
                }
            })
        }, 1e3)
    },
    setUpLiveJournal: function() {
        showBox(ProfileEditor.controller, {
            act: "lj_settings_box"
        })
    },
    setUpInstagram: function(e) {
        var i = "1fdcd1b154d54990892368072ab4d303",
            t = "https://api.instagram.com/oauth/authorize/?client_id=" + i + "&redirect_uri=" + e + "&response_type=code",
            r = "scrollbars=0,resizable=1,menubar=0,location=0,left=" + (Math.floor(screen.width / 2) - 300) + ",top=" + (Math.floor(screen.height / 2) - 240) + ",width=600,height=400,toolbar=0,status=0",
            a = window.open(t, "instagram", r);
        try {
            a.focus()
        } catch (n) {}
        window.socialCallback = function(e) {
            showBox(ProfileEditor.controller, {
                act: "instagram_settings_box"
            }, {
                dark: !0,
                params: {
                    width: 460
                }
            })
        }
    },
    getLiveJournalName: function(e) {
        var i = setInterval(function() {
            ajax.post("/al_profileEdit.php", {
                act: "a_get_livejournal_name"
            }, {
                onDone: function(t) {
                    return t && void 0 != t.error ? (clearInterval(i), t.msg ? (e.hide(), void(ge("export_service_2").innerHTML = t.msg)) : (e && e.hideProgress(), void(1 == t.error ? (ge("pedit_lj_error").innerHTML = "Server error.", show("pedit_lj_error")) : 2 == t.error && (ge("pedit_lj_error").innerHTML = cur.lang.settings_lj_wrong_password, show("pedit_lj_error"))))) : void 0
                }
            })
        }, 1e3)
    },
    clearSocialExport: function(e) {
        var i, t;
        switch (e) {
            case 1:
                i = "settings_status_export", t = "settings_status_confirm";
                break;
            case 2:
                i = "settings_notes_export", t = "settings_livejournal_confirm";
                break;
            case 3:
                i = "settings_status_export", t = "settings_facebook_confirm";
                break;
            case 4:
                i = "settings_status_import_photo", t = "settings_instagram_confirm";
                break;
            case 7:
                i = "profileEdit_import_rss", t = "profileEdit_rss_confirm"
        }
        var t = getLang(t),
            r = showFastBox(getLang(i), t, getLang("global_continue"), function() {
                ajax.post("/al_profileEdit.php", {
                    act: "a_clear_social_export",
                    service: e,
                    hash: cur.saveHash
                }, {
                    onDone: function(i) {
                        if (i && i.msg) {
                            r.hide(), ge("export_service_" + e).innerHTML = i.msg, setTimeout(scrollToTop, 300);
                            var t = curBox();
                            t && t.hide()
                        }
                    }
                }), r.showProgress()
            }, getLang("global_cancel"))
    },
    slideShow: function(e, i) {
        isVisible(e) || slideDown(e, i || 150)
    },
    slideHide: function(e, i) {
        isVisible(e) && slideUp(e, i || 150)
    },
    initInterests: function() {
        cur.interests_data = {}, cur.section = "interests", each(["activities", "interests", "music", "movies", "tv", "books", "games", "quotes", "about"], function(e, i) {
            var t = ge("pedit_interests_" + i);
            cur.interests_data[i] = val(t), autosizeSetup(t, {
                minHeight: 100,
                height: 100
            }), placeholderInit(t)
        }), ProfileEditor.initBeforeUnload()
    },
    saveInterests: function(e) {
        var i = {
            act: "a_save_interests",
            hash: cur.options.hash
        };
        return each(["activities", "interests", "music", "movies", "tv", "books", "games", "quotes", "about"], function(e, t) {
            i[t] = val("pedit_interests_" + t)
        }), ajax.post(ProfileEditor.controller, i, {
            onDone: function(e) {
                each(["activities", "interests", "music", "movies", "tv", "books", "games", "quotes", "about"], function(i, t) {
                    var r = ge("pedit_interests_" + t);
                    val(r, cur.interests_data[t] = winToUtf(e[t])), r.autosize.update()
                }), ProfileEditor.showMsg(getLang("profileEdit_interests_saved"))
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }), !1
    },
    initEducation: function() {
        if (cur.section = "education", cur.nav.push(function(e, i, t) {
                return "edit" != i[0] || e[0] ? !0 : "education" != i.act && "higher_education" != i.act || "education" != t.act && "higher_education" != t.act ? !0 : (uiTabs.hideProgress(geByClass1("ui_tabs", "profile_editor")), ProfileEditor.selectEduTab(e.act), !1)
            }), cur.onCancelCb = function() {
                if ("education" == cur.section) {
                    var e = !1,
                        i = !1;
                    if (isVisible("primary_uni"))
                        if (ProfileEditorEdu.uniChanged(cur.primary_uni)) i = !0;
                        else
                            for (var t = 0; t < cur.unis.length; ++t) cur.unis[t].id > 0 && ProfileEditorEdu.uniChanged(cur.unis[t]) ? i = !0 : cur.unis[t].id < 0 && isVisible("uni_content" + cur.unis[t].id) && cur.unis[t].uiUniversity.val() && (i = !0);
                    if (isVisible("schools"))
                        for (var t = 0; t < cur.schools.length; ++t) cur.schools[t].id > 0 && ProfileEditorEdu.schoolChanged(cur.schools[t]) ? e = !0 : cur.schools[t].id < 0 && isVisible("school_content" + cur.schools[t].id) && cur.schools[t].uiSchool.val() && (e = !0);
                    cur.filter_uni && !i && e ? ProfileEditor.selectEduTab("education") : cur.filter_uni || e || !i || ProfileEditor.selectEduTab("higher_education")
                }
            }, !cur.demo) {
            selectsData.setCountries(cur.selData.countries_list);
            for (var e in cur.selData.countries) selectsData.setCountryInfo(e, cur.selData.countries[e]);
            for (var e in cur.selData.cities) selectsData.setCityInfo(e, cur.selData.cities[e]);
            for (var e in cur.selData.universities) selectsData.setUniversityInfo(e, cur.selData.universities[e]);
            for (var e in cur.selData.faculties) selectsData.setFacultyInfo(e, cur.selData.faculties[e])
        }
        ProfileEditorEdu.init(), ProfileEditor.initBeforeUnload(), this.selectEduTab(cur.filter_uni ? "higher_education" : "education", !0)
    },
    selectEduTab: function(e, i) {
        var t = {
            0: "edit",
            act: e
        };
        if ("education" == e) {
            if (cur.filter_uni = 0, show("school"), hide("uni"), hide("pedit_result"), !isVisible("schools")) {
                if (cur.schoolsCount = cur.schools.length, cur.schoolsCount)
                    for (var r = 0; r < cur.schools.length; ++r) ge("schools").appendChild(ProfileEditorEdu.genSchoolRow(cur.schools[r].id, 0 == r)), cur.schools[r] = ProfileEditorEdu.initSchoolRow(cur.schools[r]);
                else ProfileEditorEdu.addSchool();
                show("schools")
            }
            cur.schoolsCount >= 7 ? hide("add_school_link") : show("add_school_link"), i && "add_item" in nav.objLoc && (t.add_item = nav.objLoc.add_item), nav.setLoc(t)
        } else if ("higher_education" == e) {
            if (cur.filter_uni = 1, show("uni"), hide("school"), hide("pedit_result"), !isVisible("primary_uni") && (ge("primary_uni").appendChild(ProfileEditorEdu.genUniRow(cur.primary_uni.id, !0, !0)), cur.primary_uni = ProfileEditorEdu.initUniRow(cur.primary_uni), show("primary_uni"), cur.unisCount = cur.unis.length, cur.unisCount)) {
                for (var r = 0; r < cur.unis.length; ++r) ge("unis").appendChild(ProfileEditorEdu.genUniRow(cur.unis[r].id, !1, 0 == r)), cur.unis[r] = ProfileEditorEdu.initUniRow(cur.unis[r]);
                show("unis")
            }
            cur.unisCount >= 9 ? hide("add_uni_link") : show("add_uni_link"), i && "add_item" in nav.objLoc && (t.add_item = nav.objLoc.add_item), nav.setLoc(t)
        }
    },
    initCareer: function() {
        cur.section = "career", ProfileEditorJob.init(), ProfileEditor.initBeforeUnload()
    },
    initMilitary: function() {
        cur.section = "military", ProfileEditorMil.init(), ProfileEditor.initBeforeUnload()
    },
    initPersonal: function() {
        var e = cur.options;
        cur.section = "personal", cur.uiLife = new Dropdown(ge("pedit_life"), e.life_priorities, {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.life_priority,
            dark: 1
        }), cur.uiPeople = new Dropdown(ge("pedit_people"), e.people_priorities, {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.people_priority,
            dark: 1
        }), cur.uiSmoking = new Dropdown(ge("pedit_smoking"), e.smoking_types, {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.smoking,
            dark: 1
        }), cur.uiAlcohol = new Dropdown(ge("pedit_alcohol"), e.alcohol_types, {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.alcohol,
            dark: 1
        }), cur.uiPolitical = new Dropdown(ge("pedit_political"), e.political_views, {
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: e.political,
            dark: 1
        }), cur.uiReligion = new Selector(ge("pedit_religion"), "", {
            dropdown: !1,
            multiselect: !1,
            enableCustom: !0,
            introText: "",
            noResult: "",
            placeholder: getLang("profileEdit_main_sel_relig"),
            onChange: function(e) {
                intval(e) || cur.uiReligion.clear()
            },
            dark: 1
        }), cur.uiReligion.setData(e.religions), e.religion_id > 0 ? cur.uiReligion.val(e.religion_id, !0) : e.religion.length && cur.uiReligion.customVal(e.religion), placeholderInit("pedit_inspired_by"), ProfileEditor.initBeforeUnload()
    },
    savePersonal: function(e) {
        var i = {
                act: "a_save_personal",
                hash: cur.options.hash
            },
            t = {
                religion: cur.uiReligion.val(),
                religion_custom: val("pedit_religion_custom"),
                political: cur.uiPolitical.val(),
                life_priority: cur.uiLife.val(),
                people_priority: cur.uiPeople.val(),
                smoking: cur.uiSmoking.val(),
                alcohol: cur.uiAlcohol.val(),
                inspired_by: val("pedit_inspired_by")
            };
        return extend(i, t), ajax.post(ProfileEditor.controller, i, {
            onDone: function(e) {
                cur.options.religion_id = t.religion, cur.options.religion = cur.uiReligion.val_full()[0] < 0 ? t.religion_custom : cur.uiReligion.val_full()[1], delete t.religion_custom, delete t.religion, extend(cur.options, t), each(["inspired_by"], function(i, t) {
                    val("pedit_" + t, cur.options[t] = winToUtf(e[t] || ""))
                }), ProfileEditor.showMsg(getLang("profileEdit_personal_saved"))
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }), !1
    },
    editHome: function(e) {
        showBox("edit", {
            act: "edit_home",
            place_id: cur.editAddrId || e
        })
    },
    addItemBox: function(e, i) {
        var t = {
            act: "show_suggest_geodb_object_box",
            add_item: e || "",
            obj_id: i || ""
        };
        return cur.addItemBox = showBox(ProfileEditor.controller, t, {
            params: {
                width: 560,
                hideButtons: !0,
                cache: 1
            }
        }), !1
    }
};
try {
    stManager.done("profile_edit.js")
} catch (e) {
    debugLog("Exception", e)
}