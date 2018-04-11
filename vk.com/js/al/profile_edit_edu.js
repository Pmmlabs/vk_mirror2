var ProfileEditorEdu = {
    init: function() {
        cur.globalCounter = 0, cur.unisCount = 0, cur.shoolsCount = 0, cur.addBox = null, cur.addedItems = {
            universities: {},
            faculties: {},
            chairs: {},
            schools: {}
        }, cur.bannedGeodbCountryIds = []
    },
    genOneRow: function(i, t, e, o, n, u) {
        var s = i + "_" + t + e;
        return n || (n = 'class="pedit_dropdown" type="hidden"'), u || (u = ""), '<div class="pedit_row clear_fix" id="row_' + s + '"><div class="pedit_label">' + o + '</div><div class="pedit_labeled"><input id="' + s + '" name="' + s + '" ' + n + "/></div>" + u + "</div>"
    },
    genUniRow: function(i, t, e) {
        var o = t ? "" : '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml("ProfileEditorEdu.deleteUniversity(" + i + ")") + "</div>";
        return ce("div", {
            className: "pedit_edu_big_row",
            id: "uni" + i,
            innerHTML: (t || e ? "" : '<div class="pedit_separator"></div>') + '<div id="uni_content' + i + '">' + this.genOneRow("u", "country", i, getLang("select_country"), "", o + '<img src="/images/upload.gif" class="pedit_progress" id="u_progress' + i + '" />') + this.genOneRow("u", "city", i, getLang("select_city")) + this.genOneRow("u", "university", i, getLang("select_university"), "", '<a href="" class="add_item_link" id="u_add_uni_to_db' + i + "\" onclick=\"return ProfileEditor.addItemBox('uni', " + i + ')">' + getLang("profileEdit_uni_not_in_db") + "</a>") + this.genOneRow("u", "faculty", i, getLang("select_faculty"), "", '<a href="" class="add_item_link" id="u_add_fac_to_db' + i + "\" onclick=\"return ProfileEditor.addItemBox('faculty', " + i + ')">' + getLang("profileEdit_fac_not_in_db") + "</a>") + this.genOneRow("u", "chair", i, getLang("select_chair"), "", '<a href="" class="add_item_link" id="u_add_chair_to_db' + i + "\" onclick=\"return ProfileEditor.addItemBox('chair', " + i + ')">' + getLang("profileEdit_chair_not_in_db") + "</a>") + '<div id="u_details' + i + '" style="display: none">' + this.genOneRow("u", "edu_form", i, getLang("select_eduform")) + this.genOneRow("u", "edu_status", i, getLang("select_edustatus")) + this.genOneRow("u", "graduation", i, getLang("select_graduation")) + '</div></div><div class="deleted" id="uni_deleted' + i + '"><div></div> <a onclick="ProfileEditorEdu.restoreUniversity(' + i + ')">' + getLang("global_dont_delete") + "</a></div>"
        }, {
            display: "none"
        })
    },
    get_by_id: function(i, t) {
        if (i.id == t) return i;
        for (var e = 0; e < i.childNodes.length; ++e) {
            var o = this.get_by_id(i.childNodes[e], t);
            if (o) return o
        }
        return !1
    },
    initUniRow: function(i, t, e) {
        var o = t ? function(i) {
            return ProfileEditorEdu.get_by_id(t, i)
        } : ge;
        return i.uiEducationForm = new EducationFormSelect(o("u_edu_form" + i.id), o("row_u_edu_form" + i.id), {
            country: i.country,
            university: i.university,
            edu_form: i.edu_form,
            dark: 1,
            width: i.width
        }), i.uiEducationStatus = new EducationStatusSelect(o("u_edu_status" + i.id), o("row_u_edu_status" + i.id), {
            country: i.country,
            university: i.university,
            edu_status: i.edu_status,
            dark: 1,
            width: i.width
        }), i.uiGraduation = new Dropdown(o("u_graduation" + i.id), cur.selData.graduations, {
            autocomplete: !0,
            placeholder: getLang("select_year_not_selected"),
            noResult: getLang("select_year_not_found"),
            selectedItems: i.graduation,
            onChange: function(t) {
                intval(t) || i.uiGraduation.clear()
            },
            dark: 1,
            width: i.width
        }), i.uiChair = new ChairSelect(o("u_chair" + i.id), o("row_u_chair" + i.id), {
            progressBar: "u_progress" + i.id,
            faculty: i.faculty,
            chair: i.chair,
            ignoreVoidList: !0,
            onEnableCustomChange: function(t) {
                var e = i.uiCountry ? i.uiCountry.val() : i.country,
                    o = i.uiChair ? i.uiChair.val() : i.chair;
                (i.showAddChair = !t && ProfileEditorEdu.isCountryOpenForNewObjects(e)) && !intval(o) ? show("u_add_chair_to_db" + i.id) : hide("u_add_chair_to_db" + i.id)
            },
            onChange: function(t) {
                intval(t) ? hide("u_add_chair_to_db" + i.id) : i.showAddChair && show("u_add_chair_to_db" + i.id)
            },
            dark: 1,
            width: i.width
        }), i.uiFaculty = new FacultySelect(o("u_faculty" + i.id), o("row_u_faculty" + i.id), {
            progressBar: "u_progress" + i.id,
            university: i.university,
            faculty: i.faculty,
            chairSelect: i.uiChair,
            ignoreVoidList: !0,
            onEnableCustomChange: function(t) {
                var e = i.uiCountry ? i.uiCountry.val() : i.country,
                    o = i.uiFaculty ? i.uiFaculty.val() : i.faculty;
                (i.showAddFaculty = !t && ProfileEditorEdu.isCountryOpenForNewObjects(e)) && !intval(o) ? show("u_add_fac_to_db" + i.id) : hide("u_add_fac_to_db" + i.id)
            },
            onChange: function(t) {
                intval(t) ? hide("u_add_fac_to_db" + i.id) : i.showAddFaculty && show("u_add_fac_to_db" + i.id)
            },
            dark: 1,
            width: i.width
        }), i.uiUniversity = new UniversitySelect(o("u_university" + i.id), o("row_u_university" + i.id), {
            progressBar: "u_progress" + i.id,
            city: i.city,
            university: i.university,
            eduFormSelect: i.uiEducationForm,
            eduStatusSelect: i.uiEducationStatus,
            facultySelect: i.uiFaculty,
            ignoreVoidList: !0,
            onEnableCustomChange: function(t) {
                var e = i.uiCountry ? i.uiCountry.val() : i.country,
                    o = i.uiUniversity ? i.uiUniversity.val() : i.university;
                (i.showAddUni = !t && ProfileEditorEdu.isCountryOpenForNewObjects(e)) && !intval(o) ? show("u_add_uni_to_db" + i.id) : hide("u_add_uni_to_db" + i.id)
            },
            onChange: function(t) {
                intval(t) ? (show("u_details" + i.id), hide("u_add_uni_to_db" + i.id)) : (hide("u_details" + i.id), i.showAddUni && show("u_add_uni_to_db" + i.id)), i.uiEducationForm.clear(), i.uiEducationStatus.clear(), i.uiGraduation.clear(), e && e(t)
            },
            dark: 1,
            width: i.width
        }), i.uiCity = new CitySelect(o("u_city" + i.id), o("row_u_city" + i.id), {
            progressBar: "u_progress" + i.id,
            country: i.country,
            city: i.city_val,
            universitySelect: i.uiUniversity,
            maxItemsShown: function(i) {
                return i > 6 ? 500 : 350
            },
            dark: 1,
            width: i.width
        }), i.uiCountry = new CountrySelect(o("u_country" + i.id), o("row_u_country" + i.id), {
            progressBar: "u_progress" + i.id,
            country: i.country_val,
            eduFormSelect: i.uiEducationForm,
            eduStatusSelect: i.uiEducationStatus,
            citySelect: i.uiCity,
            onChange: function(i) {},
            dark: 1,
            width: i.width
        }), o("uni" + i.id).style.display = "block", i.university && (o("u_details" + i.id).style.display = "block"), i
    },
    genOneSchoolRow: function(i) {
        var t = "s_school" + i;
        return '<div class="pedit_row clear_fix" id="row_' + t + '"><div class="pedit_label">' + getLang("select_school") + '</div><div class="pedit_labeled"><div class="school_row"><input class="pedit_dropdown" type="hidden" id="' + t + '" name="' + t + '" /></div></div><a class="add_item_link" id="s_add_school_to_db' + i + "\" onclick=\"ProfileEditor.addItemBox('school', " + i + ')">' + getLang("profileEdit_school_not_in_db") + "</a></div>"
    },
    genSchoolRow: function(i, t) {
        return ce("div", {
            className: "pedit_edu_big_row",
            id: "school" + i,
            innerHTML: (t ? "" : '<div class="pedit_separator"></div>') + '<div id="school_content' + i + '">' + this.genOneRow("s", "country", i, getLang("select_country"), "", '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml("ProfileEditorEdu.deleteSchool(" + i + ")") + '</div><img src="/images/upload.gif" class="pedit_progress" id="s_progress' + i + '" />') + this.genOneRow("s", "city", i, getLang("select_city")) + this.genOneSchoolRow(i) + '<div id="s_details' + i + '" style="display: none">' + this.genOneRow("s", "start", i, getLang("select_start_year")) + this.genOneRow("s", "finish", i, getLang("select_finish_year")) + this.genOneRow("s", "graduation", i, getLang("select_graduation")) + this.genOneRow("s", "class", i, getLang("select_class")) + this.genOneRow("s", "spec", i + "_custom", getLang("select_spec"), 'type="text" class="dark"') + '</div></div><div class="deleted" id="school_deleted' + i + '"><div></div> <a onclick="ProfileEditorEdu.restoreSchool(' + i + ')">' + getLang("global_dont_delete") + "</a></div>"
        }, {
            display: "none"
        })
    },
    initSchoolRow: function(i, t, e) {
        var o = t ? function(i) {
            return ProfileEditorEdu.get_by_id(t, i)
        } : ge;
        i.uiClass = new ClassSelect(o("s_class" + i.id), o("row_s_class" + i.id), {
            country: i.country,
            school: i.school,
            school_class: i.school_class,
            dark: 1,
            width: i.width
        });
        var n = function(t, e, n) {
            var u = new Dropdown(o(t), e, {
                autocomplete: !0,
                placeholder: getLang("select_graduation_not_selected"),
                noResult: getLang("select_year_not_found"),
                selectedItems: n,
                onChange: function(i) {
                    intval(i) || u.clear()
                },
                dark: 1,
                width: i.width
            });
            return u
        };
        return i.uiStart = n("s_start" + i.id, cur.selData.start_years, i.start), i.uiFinish = n("s_finish" + i.id, cur.selData.finish_years, i.finish), i.uiGraduation = n("s_graduation" + i.id, cur.selData.finish_years, i.graduation), i.spec || (i.spec = ""), o("s_spec" + i.id + "_custom").value = i.spec, i.uiSchool = new SchoolHintSelect(o("s_school" + i.id), o("row_s_school" + i.id), {
            progressBar: "s_progress" + i.id,
            city: i.city,
            school: i.school,
            classSelect: i.uiClass,
            ignoreVoidList: !0,
            onEnableCustomChange: function(t) {
                var e = i.uiCountry ? i.uiCountry.val() : i.country,
                    o = i.uiSchool ? i.uiSchool.val() : i.school;
                (i.showAddSchool = !t && ProfileEditorEdu.isCountryOpenForNewObjects(e)) && !intval(o) ? show("s_add_school_to_db" + i.id) : hide("s_add_school_to_db" + i.id)
            },
            onChange: function(t) {
                intval(t) ? (show("s_details" + i.id), hide("s_add_school_to_db" + i.id)) : (hide("s_details" + i.id), i.showAddSchool && show("s_add_school_to_db" + i.id)), i.uiClass.clear(), i.uiStart.clear(), i.uiFinish.clear(), i.uiGraduation.clear(), ge("s_spec" + i.id + "_custom").value = "", e && e(t)
            },
            dark: 1,
            width: i.width
        }), i.uiCity = new CitySelect(o("s_city" + i.id), o("row_s_city" + i.id), {
            progressBar: "s_progress" + i.id,
            country: i.country,
            city: i.city_val,
            schoolSelect: i.uiSchool,
            maxItemsShown: function(i) {
                return i > 6 ? 500 : 350
            },
            dark: 1,
            width: i.width
        }), i.uiCountry = new CountrySelect(o("s_country" + i.id), o("row_s_country" + i.id), {
            progressBar: "s_progress" + i.id,
            country: i.country_val,
            classSelect: i.uiClass,
            citySelect: i.uiCity,
            onChange: function(i) {},
            dark: 1,
            width: i.width
        }), o("school" + i.id).style.display = "block", i.school && (o("s_details" + i.id).style.display = "block"), i
    },
    genAddRow: function(i, t, e) {
        return e || (e = ""), '<div class="pedit_edu_row" id="row_' + i + '"><div class="label fl_l ta_r">' + t + '</div><div class="labeled fl_l"><input id="' + i + '" name="' + i + '" /></div>' + e + "</div>"
    },
    addUniversity: function() {
        if (cur.unisCount >= 9) return !1;
        var i = {
            id: - ++cur.globalCounter,
            country: cur.primary_uni.country,
            country_val: cur.primary_uni.country_val,
            city: cur.primary_uni.city,
            city_val: cur.primary_uni.city_val
        };
        return ge("unis").appendChild(this.genUniRow(i.id, !1, 0 == cur.unisCount)), i = this.initUniRow(i), cur.unis.push(i), ++cur.unisCount, cur.unisCount >= 9 && hide("add_uni_link"), show("unis"), !1
    },
    addSchool: function() {
        if (cur.schoolsCount >= 7) return !1;
        var i = {
                id: - ++cur.globalCounter,
                country: cur.primary_uni.country,
                country_val: cur.primary_uni.country_val,
                city: cur.primary_uni.city,
                city_val: cur.primary_uni.city_val
            },
            t = ge("schools").appendChild(this.genSchoolRow(i.id, 0 == cur.schoolsCount));
        return cur.schoolsCount || hide(geByClass1("_del_icon", t)), i = this.initSchoolRow(i), cur.schools.length || (cur.schools = new Array), cur.schools.push(i), ++cur.schoolsCount, cur.schoolsCount >= 7 && hide("add_school_link"), !1
    },
    getIndex: function(i, t) {
        for (var e = 0; e < i.length; ++e)
            if (i[e].id == t) return e;
        return !1
    },
    deleteUniversity: function(i) {
        if (--cur.unisCount, show("add_uni_link"), intval(ge("u_university" + i).value) || i > 0) hide("uni_content" + i), ge("uni_deleted" + i).firstChild.innerHTML = getLang("profileEdit_uni_will_be_deleted"), show("uni_deleted" + i);
        else {
            var t = this.getIndex(cur.unis, i);
            cur.unis[t] = cur.unis[cur.unis.length - 1], cur.unis.pop(), ge("uni" + i).parentNode.removeChild(ge("uni" + i)), 0 == cur.unis.length && hide("unis")
        }
        return !1
    },
    restoreUniversity: function(i) {
        return cur.unisCount >= 9 ? !1 : (hide("uni_deleted" + i), show("uni_content" + i), ++cur.unisCount, cur.unisCount >= 9 && hide("add_uni_link"), !1)
    },
    deleteSchool: function(i) {
        if (--cur.schoolsCount, show("add_school_link"), intval(ge("s_school" + i).value) || i > 0) hide("school_content" + i), ge("school_deleted" + i).firstChild.innerHTML = getLang("profileEdit_school_will_be_deleted"), show("school_deleted" + i);
        else {
            var t = this.getIndex(cur.schools, i);
            cur.schools[t] = cur.schools[cur.schools.length - 1], cur.schools.pop(), ge("school" + i).parentNode.removeChild(ge("school" + i)), 0 == cur.schools.length && this.addSchool()
        }
        return !1
    },
    restoreSchool: function(i) {
        return cur.schoolsCount >= 7 ? !1 : (hide("school_deleted" + i), show("school_content" + i), ++cur.schoolsCount, cur.schoolsCount >= 7 && hide("add_school_link"), !1)
    },
    addFields: function() {
        for (var i = arguments[0], t = arguments[1], e = arguments[2], o = arguments[3], n = 4; n < arguments.length; ++n) intval(ge(t + "_" + arguments[n] + o).value) && (i[e + arguments[n]] = ge(t + "_" + arguments[n] + o).value);
        return i
    },
    addTextFields: function() {
        for (var i = arguments[0], t = arguments[1], e = arguments[2], o = arguments[3], n = 4; n < arguments.length; ++n) ge(t + "_" + arguments[n] + o).value.length && (i[e + arguments[n]] = ge(t + "_" + arguments[n] + o).value);
        return i
    },
    addUniParams: function(i, t, e) {
        return i[e + "id"] = t.id, isVisible("uni_content" + t.id) && intval(ge("u_university" + t.id).value) ? (i = this.addFields(i, "u", e, t.id, "country", "city", "university", "faculty", "chair", "edu_form", "edu_status", "graduation"), i = this.addTextFields(i, "u", e + "custom_", t.id + "_custom", "university", "faculty", "chair")) : t.id > 0 && (i[e + "deleted"] = 1), i
    },
    addSchoolParams: function(i, t, e) {
        return i[e + "id"] = t.id, isVisible("school_content" + t.id) && intval(ge("s_school" + t.id).value) ? (i = this.addFields(i, "s", e, t.id, "country", "city", "school", "start", "finish", "graduation", "class"), i = this.addTextFields(i, "s", e + "custom_", t.id + "_custom", "school", "spec")) : t.id > 0 && (i[e + "deleted"] = 1), i
    },
    saveEducation: function(i) {
        var t = !1;
        if (isVisible("uni")) {
            var e = {
                act: "a_save_education_uni"
            };
            e = this.addUniParams(e, cur.primary_uni, "primary_uni");
            for (var o = 0; o < cur.unis.length; ++o) e = this.addUniParams(e, cur.unis[o], "uni" + o);
            t = function(i) {
                for (var t = [], e = ge("unis"), o = 0; o < cur.unis.length; ++o) {
                    var n = i["res" + o];
                    intval(n.id) ? cur.unis[o] = this.updateUni(cur.unis[o], n, e, o) : t.push(o)
                }
                for (var o = 0; o < t.length; ++o) {
                    var u = t[o];
                    ge("uni" + cur.unis[u].id).parentNode.removeChild(ge("uni" + cur.unis[u].id)), cur.unis[u] = cur.unis[cur.unis.length - 1];
                    for (var s = o + 1; s < t.length; ++s) t[s] == cur.unis.length - 1 && (t[s] = u);
                    cur.unis.pop()
                }
                cur.unis.length || hide("unis"), cur.unisCount = cur.unis.length, cur.unisCount >= 9 ? hide("add_uni_link") : show("add_uni_link"), cur.primary_uni = this.updateUni(cur.primary_uni, i["res-1"], ge("primary_uni"), !0)
            }
        } else {
            for (var e = {
                    act: "a_save_education_school"
                }, o = 0; o < cur.schools.length; ++o) e = this.addSchoolParams(e, cur.schools[o], "school" + o);
            t = function(i) {
                for (var t = [], e = 0; e < cur.schools.length; ++e) {
                    var o = i["res" + e];
                    intval(o.id) ? cur.schools[e] = this.updateSchool(cur.schools[e], o, ge("schools"), e) : t.push(e)
                }
                for (var e = 0; e < t.length; ++e) {
                    var n = t[e];
                    ge("school" + cur.schools[n].id).parentNode.removeChild(ge("school" + cur.schools[n].id)), cur.schools[n] = cur.schools[cur.schools.length - 1];
                    for (var u = e + 1; u < t.length; ++u) t[u] == cur.schools.length - 1 && (t[u] = n);
                    cur.schools.pop()
                }
                cur.schoolsCount = cur.schools.length, cur.schoolsCount >= 7 ? hide("add_school_link") : show("add_school_link"), cur.schoolsCount || this.addSchool()
            }
        }
        return e.hash = ge("hash").value, ajax.post("al_profileEdit.php", e, {
            onDone: function(i) {
                t.call(ProfileEditorEdu, i), ProfileEditor.showMsg(getLang("profileEdit_unis_saved"))
            },
            showProgress: lockButton.pbind(i),
            hideProgress: unlockButton.pbind(i)
        }), !1
    },
    updateUni: function(i, t, e, o, n) {
        -1 == i.uiUniversity.val() && t.university.id ? (selectsData.addUniversity(i.uiCity.val(), [t.university.id, t.university.name]), t.faculty.id ? (selectsData.setUniversityInfo(t.university.id, {
            completed_faculties: 0,
            faculties: [
                [t.faculty.id, t.faculty.name]
            ]
        }), t.chair.id ? selectsData.setFacultyInfo(t.faculty.id, {
            completed_chairs: 0,
            chairs: [
                [t.chair.id, t.chair.name]
            ]
        }) : selectsData.setFacultyInfo(t.faculty.id, {
            completed_chairs: 0,
            chairs: []
        })) : selectsData.setUniversityInfo(t.university.id, {
            completed_faculties: 0,
            faculties: []
        })) : -1 == i.uiFaculty.val() && t.faculty.id ? (selectsData.addFaculty(t.university.id, [t.faculty.id, t.faculty.name]), t.chair.id ? selectsData.setFacultyInfo(t.faculty.id, {
            completed_chairs: 0,
            chairs: [
                [t.chair.id, t.chair.name]
            ]
        }) : selectsData.setFacultyInfo(t.faculty.id, {
            completed_chairs: 0,
            chairs: []
        })) : -1 == i.uiChair.val() && t.chair.id && selectsData.addChair(t.faculty.id, [t.chair.id, t.chair.name]), i.country = i.uiCountry.val(), i.country_val = i.uiCountry.val_full(), i.city = i.uiCity.val(), i.city_val = i.uiCity.val_full(), i.university = t.university.id, i.faculty = t.faculty.id, i.chair = t.chair.id, i.edu_form = i.uiEducationForm.val(), i.edu_status = i.uiEducationStatus.val(), i.graduation = i.uiGraduation.val();
        var u = this.genUniRow(t.id, o, 0 == n),
            s = ge("uni" + i.id);
        return i.id = t.id, t = this.initUniRow(i, u), e.replaceChild(u, s), t
    },
    updateSchool: function(i, t, e, o) {
        -1 == i.uiSchool.val() && t.school.id && selectsData.addSchool(i.uiCity.val(), [t.school.id, t.school.name]), i.country = i.uiCountry.val(), i.country_val = i.uiCountry.val_full(), i.city = i.uiCity.val(), i.city_val = i.uiCity.val_full(), i.school = t.school.id, i.start = i.uiStart.val(), i.finish = i.uiFinish.val(), i.graduation = i.uiGraduation.val(), i.school_class = i.uiClass.val(), i.spec = ge("s_spec" + i.id + "_custom").value;
        var n = this.genSchoolRow(t.id, 0 == o),
            u = ge("school" + i.id);
        return i.id = t.id, t = this.initSchoolRow(i, n), e.replaceChild(n, u), t
    },
    uniChanged: function(i) {
        return !isVisible("uni_content" + i.id) || i.country != i.uiCountry.val() || i.city != i.uiCity.val() || i.university != i.uiUniversity.val() || i.faculty != i.uiFaculty.val() || i.chair != i.uiChair.val() || i.edu_form != i.uiEducationForm.val() || i.edu_status != i.uiEducationStatus.val() || i.graduation != i.uiGraduation.val()
    },
    schoolChanged: function(i) {
        return !isVisible("school_content" + i.id) || i.country != i.uiCountry.val() || i.city != i.uiCity.val() || i.school != i.uiSchool.val() || i.start != i.uiStart.val() || i.finish != i.uiFinish.val() || i.graduation != i.uiGraduation.val() || i.school_class != i.uiClass.val() || i.spec != ge("s_spec" + i.id + "_custom").value
    },
    isCountryOpenForNewObjects: function(i) {
        return !cur.geodbBannedCountries[i]
    }
};
try {
    stManager.done("profile_edit_edu.js")
} catch (e) {}