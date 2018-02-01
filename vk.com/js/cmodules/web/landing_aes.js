! function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var a = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(2)
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(4),
        l = i(r),
        d = 1e8,
        c = function(e) {
            function t() {
                return a(this, t), s(this, e.apply(this, arguments))
            }
            return o(t, e), t.prototype._initSlider = function() {
                this._setPosition(d / 2)
            }, t.prototype._getSize = function() {
                return d
            }, t.prototype._getSlideData = function(e) {
                return this.slides[e % this.slides.length]
            }, t
        }(l["default"]);
    t["default"] = c
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var a = n(5),
        s = i(a),
        o = n(7),
        r = i(o),
        l = n(3),
        d = i(l);
    window.LandingAds = {
        init: function(e, t) {
            switch (cur.lang = extend(cur.lang || {}, t.langs), window.saveScrollTopOnBack = !0, cur.adsNoOffice = t.no_office ? !0 : !1, LandingAds.initMainSlider(e, t.mainSliderData), e) {
                case "intro":
                    LandingAds.initIntro(t);
                    break;
                case "company_page":
                    LandingAds.initCompanyPage(t);
                    break;
                case "targeting":
                    LandingAds.initTargeting(t);
                    break;
                case "special_projects":
                    LandingAds.initSpecialProjects(t);
                    break;
                case "community_ads":
                    LandingAds.initCommunityAds(t);
                    break;
                case "adv_agency":
                    LandingAds.initAdvAgency(t)
            }
            cur.destroy.push(LandingAds.destroy), LandingAds.initYA(), t.blockAnchor && LandingAds.scrollToBLock(t.blockAnchor)
        },
        scrollToBLock: function(e) {
            var t = ge(e);
            t && (LandingAds.toggleScrollRestoration(!1), window.preventLocationScroll = !0, scrollToY(getXY(t)[1], 0))
        },
        toggleScrollRestoration: function(e) {
            window.history && "scrollRestoration" in history && (history.scrollRestoration = e ? "auto" : "manual")
        },
        initYA: function() {
            window.aesYAInited || (window.aesYAInited = !0, function(e, t, n) {
                (t[n] = t[n] || []).push(function() {
                    try {
                        t.yaCounter44101674 = new Ya.Metrika({
                            id: 44101674,
                            clickmap: !0,
                            trackLinks: !0,
                            accurateTrackBounce: !0,
                            webvisor: !0
                        })
                    } catch (e) {}
                });
                var i = e.getElementsByTagName("script")[0],
                    a = e.createElement("script"),
                    s = function() {
                        i.parentNode.insertBefore(a, i)
                    };
                a.type = "text/javascript", a.async = !0, a.src = "https://mc.yandex.ru/metrika/watch.js", "[object Opera]" == t.opera ? e.addEventListener("DOMContentLoaded", s, !1) : s()
            }(document, window, "yandex_metrika_callbacks"), utilsNode.appendChild(ce("img", {
                src: "https://mc.yandex.ru/watch/44101674"
            })))
        },
        destroy: function() {
            cur.mainSlider && cur.mainSlider.stop(), addEvent(window, "scroll", LandingAds._onCompanyPageOnScroll), clearTimeout(cur.widgetsChangeTimer), clearTimeout(cur.searchPeopleExampleTimer), cur.livesScroll && cur.livesScroll.destroy(), LandingAds._loopedGroupsList = [], LandingAds.toggleScrollRestoration(!0)
        },
        initIntro: function(e) {},
        initCompanyPage: function(e) {
            LandingAds.initFeedScrolling(), LandingAds.selectWidget(LandingAds._WIDGET_TYPES[0]), LandingAds.initExamplesSlider(e.examplesSliderData), cur.searchPeopleExamples = e.searchPeopleExamples;
            for (var t = "", n = 0; n < cur.searchPeopleExamples.length; n++) t += '<div class="landing_ads_company_page_search_icon" id="landing_ads_search_people_example_icon_' + n + '" style="background-image: url(' + cur.searchPeopleExamples[n].picture + ')"></div>';
            val(geByClass1("landing_ads_company_page_search_icons"), t), LandingAds.selectSearchPeopleExample(0)
        },
        initTargeting: function(e) {},
        initSpecialProjects: function(e) {
            cur.gamesIntegrationSlider = new d["default"]("ads_games_integration_slider", {
                slides: e.gamesIntegrationSlides
            }), LandingAds.openLive(geByClass1("mv_playlist_item", "landing_ads_lives"), 1), cur.livesScroll = new uiScroll(geByClass1("landing_ads_lives_rows"), {
                global: !0,
                theme: "videoview"
            })
        },
        initCommunityAds: function(e) {
            this._initLoopedGroups(e.loopedGroups)
        },
        communityAdsExchange: function(e) {
            cur.adsNoOffice && (cancelEvent(e), Ads.showIntroBox("exchange"))
        },
        initAdvAgency: function(e) {
            cur.countryDD = new CountrySelect(ge("adv_agency_form_country"), e.countries, {
                maxItemsShown: function(e) {
                    return e > 6 ? 500 : 350
                },
                dark: 1,
                width: 290,
                placeholder: cur.lang.landing_ads_select_country,
                selectedItem: void 0,
                autocomplete: 1
            }), autosizeSetup("adv_agency_form_message", {}), window.radioBtns.adv_agency_already_advertise = {
                els: geByClass("radiobtn", ge("adv_agency_already_advertise")),
                val: 0
            };
            var t = 3;
            this._makeDynamicField("#adv_agency_offices", ".js-adv-agency-offices-add", function(e, t, n) {
                n && t.focus()
            }, t);
            var n = 3;
            this._makeDynamicField("#adv_agency_clients_wrap", ".js-adv-agency-clients-add", function(e, t, n) {
                n && domQuery1("input", t).focus()
            }, n);
            for (var i = domQuery("#adv_agency_already_advertise > .radiobtn"), a = 0; a < i.length; a++) {
                var s = i[a];
                s.addEventListener("click", function(e) {
                    var t = radioval("adv_agency_already_advertise"),
                        n = ge("adv_agency_offices_field");
                    1 === t ? removeClass(n, "hidden") : addClass(n, "hidden")
                })
            }
            domQuery1('#adv_agency_business_direction_wrap > div[data-id="other"]').addEventListener("click", function(e) {
                var t = ge("adv_agency_business_direction_other");
                hasClass(e.target, "on") ? removeClass(t, "hidden") : addClass(t, "hidden")
            })
        },
        initMainSlider: function(e, t) {
            cur.mainSlider = new s["default"]("ads_main_slider", {
                slides: t
            }), "intro" !== e && cur.mainSlider.setDisabled(!0)
        },
        initExamplesSlider: function(e) {
            cur.examplesSlider = new r["default"]("ads_examples_slider", {
                slides: e
            })
        },
        switchTab: function(e, t) {
            if (checkEvent(t)) return !0;
            var n = gpeByClass("ui_tabs", e);
            if (geByClass1("ui_tab_sel", n) == e) return !1;
            var i = 0;
            return hasClass(e.parentNode, "ui_tab_plain") || (uiTabs.switchTab(e), uiTabs.showProgress(n), i = 1), cancelEvent(t), nav.go(e, t, {
                noscroll: i
            })
        },
        showCreateGroupBox: function(e) {
            return cancelEvent(e), !showBox("/al_groups.php", {
                act: "create_box"
            })
        },
        initFeedScrolling: function() {
            var e = geByClass1("landing_ads_company_page_posts");
            cur.scrollingWrap = e, cur.scrollingContainer = geByClass1("landing_ads_company_page_post_container", e), cur.scrollingContainerHeight = getSize(cur.scrollingContainer)[1], cur.scrollingLastTop = 0, addEvent(window, "scroll", this._onCompanyPageOnScroll)
        },
        _makeDynamicField: function(e, t) {
            function n() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    o = s.cloneNode(!0),
                    r = domQuery(e + " > *").length + 1;
                domQuery1(e).appendChild(o), i && i(r, o, n), a && r >= a && domQuery1(t).classList.add("hidden")
            }
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                s = domQuery1(e + " > *:first-child");
            s.parentNode.removeChild(s), n(), domQuery1(t).addEventListener("click", function(e) {
                e.preventDefault(), n(!0)
            })
        },
        _onCompanyPageOnScroll: function() {
            var e = scrollGetY(),
                t = window.innerHeight,
                n = (bodyNode.offsetHeight, getXY(cur.scrollingWrap)[1] - t),
                i = getSize(cur.scrollingWrap)[1],
                a = Math.max(0, Math.min((e - n) * Math.max(.85, i / t), cur.scrollingContainerHeight - 516));
            cur.scrollingLastTop != a && (cur.scrollingLastTop = a, setStyle(cur.scrollingContainer, "transform", "translateY(" + -a + "px)"))
        },
        _WIDGET_TYPES: ["messages", "followers", "comments"],
        selectWidget: function(e) {
            for (var t = geByClass1("landing_ads_company_page_widgets"), n = 0; n < LandingAds._WIDGET_TYPES.length; n++) removeClass(t, LandingAds._WIDGET_TYPES[n]);
            addClass(t, e), slideUp(geByClass1(cur.selectedWidget + "_caption", t), 200), slideDown(geByClass1(e + "_caption", t), 200), cur.selectedWidget = e, clearTimeout(cur.widgetsChangeTimer), cur.widgetsChangeTimer = setTimeout(function() {
                var e = LandingAds._WIDGET_TYPES.indexOf(cur.selectedWidget) + 1;
                e > LandingAds._WIDGET_TYPES.length - 1 && (e = 0), LandingAds.selectWidget(LandingAds._WIDGET_TYPES[e])
            }, 7e3)
        },
        selectSearchPeopleExample: function(e) {
            removeClass("landing_ads_search_people_example_icon_" + cur.searchPeopleExampleIndex, "selected"), addClass("landing_ads_search_people_example_icon_" + e, "selected"), val(geByClass1("landing_ads_company_page_search_icon_caption"), cur.searchPeopleExamples[e].caption), cur.searchPeopleExampleIndex = e, clearTimeout(cur.searchPeopleExampleTimer), cur.searchPeopleExampleTimer = setTimeout(function() {
                LandingAds.selectSearchPeopleExampleNext()
            }, 7e3)
        },
        selectSearchPeopleExampleNext: function() {
            var e = cur.searchPeopleExampleIndex + 1;
            e > cur.searchPeopleExamples.length - 1 && (e = 0), LandingAds.selectSearchPeopleExample(e)
        },
        targetingChangePostType: function(e, t) {
            var n = ge("ads_targeting_ads_example_tab1");
            removeClass(geByClass1("selected", n), "selected"), addClass(e, "selected"), setStyle(geByClass1("landing_ads_targeting_ads_example_post_iphone_feed"), "transform", "translateY(-" + 236 * t + "px)"), setStyle(geByClass1("landing_ads_targeting_ads_example_post_browser_feed"), "transform", "translateY(-" + 273 * t + "px)")
        },
        targetingChangeGroupType: function(e, t, n) {
            n || (n = 2);
            var i = ge("ads_targeting_ads_example_tab" + n);
            removeClass(geByClass1("selected", i), "selected"), addClass(e, "selected");
            var a = geByClass1("landing_ads_targeting_ads_example_group_wrap", i);
            removeClass(geByClass1("shown", a), "shown"), addClass(geByClass1("group" + t, a), "shown")
        },
        switchTargetingExamplesTab: function(e, t, n) {
            if (cancelEvent(t), geByClass1("ui_tab_sel", gpeByClass("ui_tabs", e)) == e) return !1;
            uiTabs.switchTab(e);
            var i = geByClass1("landing_ads_targeting_ads_examples");
            removeClass(geByClass1("selected_tab", i), "selected_tab"), addClass("ads_targeting_ads_example_tab" + n, "selected_tab")
        },
        clickQuestion: function(e) {
            hasClass(e, "shown") ? LandingAds.hideAnswer(e) : LandingAds.showAnswer(e)
        },
        hideAnswer: function(e) {
            e && (removeClass(e, "shown"), slideUp(geByClass1("landing_ads_question_answer", e), 150))
        },
        showAnswer: function(e) {
            addClass(e, "shown"), slideDown(geByClass1("landing_ads_question_answer", e), 150)
        },
        _initLoopedGroups: function(e) {
            this._loopedGroupsList = e;
            for (var t = 0; t < e.length; t++) this._appendLoopedGroup(t);
            for (var n = 0; 4 > n; n++) this._appendLoopedGroup(n);
            var i = ge("looped_groups_marquee");
            setStyle(i, {
                height: i.scrollHeight - 440,
                "animation-duration": 2 * e.length + "s"
            })
        },
        _appendLoopedGroup: function(e) {
            var t = this._loopedGroupsList[e],
                n = '\n<div class="landing_ads_looped_group clear_fix">\n  <div class="landing_ads_looped_group_icon fl_l" style="background-image: url(' + t.icon + ')"></div>\n  <div class="landing_ads_looped_group_info">\n    <div class="landing_ads_looped_group_title">' + t.title + '</div>\n    <div class="landing_ads_looped_group_caption">' + t.caption + "</div>\n  </div>\n</div>";
            ge("looped_groups_marquee").appendChild(se(n))
        },
        specialProjectsMailForm: function() {
            showBox("/ads.php", {
                act: "special_project_send_request_box"
            })
        },
        specialProjectsMailFormSend: function(e) {
            lockButton(e), cur.badPriceTooltip && cur.badPriceTooltip.hide(), LandingAds.sendStatEvent("special_project_send");
            var t = String(val("special_project_request_budget")).match(/(\d+)/g);
            t = t ? t.join("") : 0, hide(geByClass1("landing_ads_special_project_request_error")), ajax.post("/ads.php", {
                act: "special_project_send_request",
                type: radioval("project_type"),
                budget: t,
                agency: val("special_project_request_agency"),
                brand: val("special_project_request_brand"),
                contact: val("special_project_request_contact"),
                email: val("special_project_request_email"),
                Brief: val("special_project_request_brief"),
                hash: cur.specialProjectRequestHash
            }, {
                onDone: function(t, n) {
                    unlockButton(e), "bad_price" == t ? (cur.badPriceTooltip = new ElementTooltip("special_project_request_budget_wrap", {
                        autoShow: !1,
                        content: '<div class="feature_intro_tt_hide" onclick="cur.badPriceTooltip.hide();"></div><div class="landing_ads_special_projects_bad_price_tt_text">' + n + "</div>",
                        cls: "feature_intro_tt",
                        forceSide: "right",
                        width: 280,
                        offset: [-40, 0, 0],
                        onHide: function() {
                            cur.badPriceTooltip && cur.badPriceTooltip.destroy()
                        }
                    }), cur.badPriceTooltip.show()) : "required_inputs" == t ? show(geByClass1("landing_ads_special_project_request_error")) : curBox().hide()
                },
                onFail: function() {
                    unlockButton(e)
                }
            })
        },
        openLive: function(e, t) {
            var n = attr(e, "data-link");
            t || (n += "&autoplay=1"), removeClass(geByClass1("mv_playlist_item_active", "landing_ads_lives"), "mv_playlist_item_active"), addClass(e, "mv_playlist_item_active"), attr(geByClass1("landing_ads_live_player"), "src", n)
        },
        sendAdvAgencyForm: function(e, t) {
            function n(e) {
                return -1 !== e.indexOf(".") && -1 === e.indexOf(" ")
            }

            function i(e) {
                return -1 !== e.indexOf("@") && -1 === e.indexOf(" ")
            }
            var a = parseInt(cur.countryDD.val()),
                s = trim(val("adv_agency_form_city")),
                o = trim(val("adv_agency_form_site")),
                r = trim(val("adv_agency_form_company")),
                l = trim(val("adv_agency_form_inn")),
                d = trim(val("adv_agency_form_budget")),
                c = trim(val("adv_agency_form_contact")),
                _ = trim(val("adv_agency_form_email")),
                u = trim(val("adv_agency_form_message"));
            if (!a) return cur.countryDD.focus(), void notaBene(cur.countryDD.container);
            if (!s) return void notaBene("adv_agency_form_city");
            if (!o || !n(o)) return void notaBene("adv_agency_form_site");
            if (!r) return void notaBene("adv_agency_form_company");
            if (l && !/^\d+$/.test(l)) return void notaBene("adv_agency_form_inn");
            for (var p = [], g = geByClass("on", "adv_agency_business_direction_wrap"), f = 0; f < g.length; f++) {
                var h = g[f];
                p.push(h.getAttribute("data-id"))
            }
            var v = ""; - 1 !== p.indexOf("other") && (v = trim(val("adv_agency_business_direction_other")));
            for (var y = [], m = domQuery("#adv_agency_offices > input"), b = 0; b < m.length; b++) {
                var w = m[b];
                if (null === y) return;
                var S = val(w);
                if (S && !n(S)) return notaBene(w), void(y = null);
                S && y.push(S)
            }
            if (null !== y) {
                for (var C = [], x = domQuery("#adv_agency_clients_wrap > div"), T = 0; T < x.length; T++) {
                    var B = x[T];
                    if (null === C) return;
                    var P = val(domQuery1('input[data-id="name"]', B)),
                        E = val(domQuery1('input[data-id="site"]', B));
                    E && !n(E) && (C = null, notaBene(domQuery1('input[data-id="site"]', B))), (P || E) && C.push({
                        name: P,
                        site: E
                    })
                }
                if (null !== C)
                    if (0 !== C.length) {
                        for (var L = [], A = geByClass("on", "adv_agency_products_wrap"), j = 0; j < A.length; j++) L.push(attr(A[j], "data-id"));
                        if (!d || !/^[0-9][0-9,.]+$/.test(d)) return notaBene("adv_agency_form_budget");
                        if (!c) return notaBene("adv_agency_form_contact");
                        if (!_ || !i(_)) return notaBene("adv_agency_form_email");
                        var O = {
                                act: "adv_agency_send_request",
                                country: a,
                                city: s,
                                site: o,
                                company: r,
                                inn: l,
                                budget: d,
                                contact: c,
                                email: _,
                                Message: u,
                                products: L.join(","),
                                business_directions: p.join(","),
                                business_direction_other: v,
                                offices: JSON.stringify(y),
                                clients: JSON.stringify(C),
                                hash: t
                            },
                            k = ge("adv_agency_form_sent");
                        hide(k), LandingAds.sendStatEvent("adv_agency_form_send"), lockButton(e), ajax.post("ads.php", O, {
                            onDone: function() {
                                unlockButton(e), val("adv_agency_form_city", ""), val("adv_agency_form_site", ""), val("adv_agency_form_company", ""), val("adv_agency_form_inn", ""), val("adv_agency_form_budget", ""), val("adv_agency_form_contact", ""), val("adv_agency_form_email", ""), val("adv_agency_form_message", ""), val("adv_agency_business_direction_other", ""), cur.countryDD.selectItem(0);
                                for (var t = geByClass("on", "adv_agency_products_wrap"), n = 0; n < t.length; n++) removeClass(t[n], "on");
                                for (var i = geByClass("on", "adv_agency_business_direction_wrap"), a = 0; a < i.length; a++) removeClass(i[a], "on");
                                addClass(ge("adv_agency_business_direction_other"), "hidden"), radiobtn(domQuery1('#adv_agency_already_advertise > .radiobtn[data-value="0"]'), 0, "adv_agency_already_advertise");
                                for (var s = domQuery("#adv_agency_offices > input"), o = 0; o < s.length; o++) {
                                    var r = s[o];
                                    0 === o ? val(r, "") : r.parentNode.removeChild(r)
                                }
                                removeClass(geByClass1("js-adv-agency-offices-add"), "hidden"), addClass(ge("adv_agency_offices_field"), "hidden");
                                for (var l = domQuery("#adv_agency_clients_wrap > div"), d = 0; d < l.length; d++) {
                                    var c = l[d];
                                    if (0 === d)
                                        for (var _ = geByTag("input", c), u = 0; u < _.length; u++) {
                                            var p = _[u];
                                            val(p, "")
                                        } else c.parentNode.removeChild(c)
                                }
                                removeClass(geByClass1("js-adv-agency-clients-add"), "hidden"), show(k), scrollToY(getXY(k)[1] - 200)
                            },
                            onFail: function() {
                                unlockButton(e)
                            }
                        })
                    } else
                        for (var D = domQuery("#adv_agency_clients_wrap > div:first-child input"), I = 0; I < D.length; I++) notaBene(D[I])
            }
        },
        sendStatEvent: function(e) {
            var t = "button-click-" + e;
            VK.Retargeting.Event(t), window.yaCounter44101674.reachGoal(t)
        },
        showBecomePartnerBox: function(e) {
            return e.preventDefault(), showBox("/ads.php", {
                act: "become_partner_box"
            })
        }
    };
    try {
        stManager.done("landing_aes.js")
    } catch (c) {}
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1),
        l = i(r),
        d = 400,
        c = function(e) {
            function t(n, i) {
                return a(this, t), i.wrapClass = "landing_ads_games_integration_slider", s(this, e.call(this, n, i))
            }
            return o(t, e), t.prototype._getSlideCont = function(e, t) {
                var n = this,
                    i = ce("div", {
                        className: "landing_ads_games_integration_slide"
                    }, {
                        "background-image": "url(" + t.src + ")"
                    });
                return addEvent(i, "click", function() {
                    n._changeSlide(e)
                }), i
            }, t.prototype._getSlidesLimit = function() {
                return 5
            }, t.prototype._updateSlide = function(e, t) {
                var n = "translateX(" + 100 * t + "%)",
                    i = {
                        transform: n,
                        transition: "transform " + d + "ms ease-in-out"
                    };
                "next" == this.lastDirection && -1 == t || "prev" == this.lastDirection && 1 == t ? i.zIndex = 3 : 0 == t ? i.zIndex = 2 : i.zIndex = 1, setStyle(e, i);
                var a = geByClass1("landing_ads_games_integration_slide", e);
                0 == t ? setStyle(a, {
                    transform: "scale(1.26)",
                    "transition-delay": Math.round(d / 4) + "ms"
                }) : setStyle(a, {
                    transform: "scale(1)",
                    "transition-delay": "0ms"
                }), 3 == i.zIndex && (clearTimeout(this.resetZIndexTimer), this.resetZIndexTimer = setTimeout(function() {
                    setStyle(e, "z-index", 1)
                }, d / 2))
            }, t
        }(l["default"]);
    t["default"] = c
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = t.DEFAULT_ANIMATION_DURATION = 400,
        a = function() {
            function e(t, i) {
                n(this, e), this.opts = i, this.wrap = ge(t), this.slides = i.slides, this._initWrap(), this._renderNavArrow(), this._initSlider(), this._updateSlidesPosition(), this._onInited()
            }
            return e.prototype._onInited = function() {}, e.prototype._onChangeSlide = function(e) {}, e.prototype._initWrap = function() {
                var e = '\n<div class="landings_base_slider_wrap ' + this.opts.wrapClass + '">\n  <div class="landings_base_slider_slides_container"></div>\n</div>\n';
                val(this.wrap, e), this.container = geByClass1("landings_base_slider_slides_container", this.wrap), this.slidesWrap = geByClass1("landings_base_slider_wrap", this.wrap)
            }, e.prototype._initSlider = function() {
                this._setPosition(0)
            }, e.prototype._renderSlides = function() {
                for (var e = this._getOneSideSlidesLimit(), t = this._getPosition(), n = t - e; t + e >= n; n++)
                    if (!this._getSlideWrap(n)) {
                        var i = this._getSlideData(n);
                        if (i) {
                            var a = this._getSlideCont(n, i);
                            if (a) {
                                var s = ce("div", {
                                    className: "landings_base_slider_slide_wrap _landings_slide_" + n
                                }, {
                                    transition: this._getTransition()
                                });
                                "string" == typeof a ? s.innerHTML = a : s.appendChild(a), attr(s, "data-position", n), this.container.appendChild(s)
                            }
                        }
                    }
            }, e.prototype._getTransition = function() {
                return "transition: opacity " + this._getAnimationDuration() + "ms ease-in-out"
            }, e.prototype._getSlidesFromDOM = function() {
                return geByClass("landings_base_slider_slide_wrap", this.container)
            }, e.prototype._destroySlides = function() {
                for (var e = this._getSlidesFromDOM(), t = this._getPosition(), n = this._getOneSideSlidesLimit(), i = t - n, a = t + n, s = 0; s < e.length; s++) {
                    var o = e[s],
                        r = parseInt(attr(o, "data-position"));
                    (i > r || r > a) && this._destroySlide(o)
                }
            }, e.prototype._destroySlide = function(e) {
                removeEvent(e, "click"), re(e)
            }, e.prototype._getSlideData = function(e) {
                return this.slides[e]
            }, e.prototype._getSlideCont = function(e, t) {
                return '<img class="landings_base_slider_slide" src="' + t.imageSrc + '" />'
            }, e.prototype._getSize = function() {
                return this.slides.length
            }, e.prototype._getPosition = function() {
                return this.position
            }, e.prototype._setPosition = function(e) {
                this.lastDirection = e > this.position ? "next" : "prev", this.position = e, this._onChangeSlide(this._getSlideData(e))
            }, e.prototype._getSlidesLimit = function() {
                return 3
            }, e.prototype._getOneSideSlidesLimit = function() {
                return (this._getSlidesLimit() - 1) / 2
            }, e.prototype._getSlideWrap = function(e) {
                return geByClass1("_landings_slide_" + e, this.container)
            }, e.prototype._updateSlidesPosition = function() {
                var e = this;
                this.lock = !0, this._renderSlides();
                for (var t = this._getSlidesFromDOM(), n = this._getOneSideSlidesLimit(), i = this._getPosition(), a = 0; a < t.length; a++) {
                    var s = t[a],
                        o = parseInt(attr(s, "data-position")),
                        r = Math.min(n, Math.max(o - i, -n));
                    this._updateSlide(s, r)
                }
                setTimeout(function() {
                    e._destroySlides(), e.lock = !1
                }, this._getAnimationDuration())
            }, e.prototype._getAnimationDuration = function() {
                return i
            }, e.prototype._updateSlide = function(e, t) {
                setStyle(e, "transform", "translateX(" + 100 * t + "%)")
            }, e.prototype._renderNavArrow = function() {
                var e = ce("div", {
                    className: "landings_slider_base_arrow left"
                });
                addEvent(e, "click", this.prevSlide.bind(this)), this.slidesWrap.appendChild(e);
                var t = ce("div", {
                    className: "landings_slider_base_arrow right"
                });
                addEvent(t, "click", this.nextSlide.bind(this)), this.slidesWrap.appendChild(t)
            }, e.prototype._isLocked = function() {
                return this.lock || this.disabled
            }, e.prototype.nextSlide = function() {
                return this._isLocked() ? !1 : void this._changeSlide(Math.min(this._getPosition() + 1, this._getSize() - 1))
            }, e.prototype.prevSlide = function() {
                return this._isLocked() ? !1 : void this._changeSlide(Math.max(this._getPosition() - 1, 0))
            }, e.prototype._changeSlide = function(e) {
                e != this._getPosition() && (this._setPosition(e), this._updateSlidesPosition())
            }, e.prototype.setDisabled = function(e) {
                this.disabled = e, e ? addClass(this.wrap, "landings_base_slider_disabled") : removeClass(this.wrap, "landings_base_slider_disabled")
            }, e
        }();
    t["default"] = a
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(6),
        l = i(r),
        d = function(e) {
            function t() {
                a(this, t);
                for (var n = arguments.length, i = Array(n), o = 0; n > o; o++) i[o] = arguments[o];
                var r = s(this, e.call.apply(e, [this].concat(i)));
                return r.coversWrap = geByClass1("landing_main_slider_covers_wrap"), r
            }
            return o(t, e), t.prototype._onChangeSlide = function() {
                for (var t, n = arguments.length, i = Array(n), a = 0; n > a; a++) i[a] = arguments[a];
                (t = e.prototype._onChangeSlide).call.apply(t, [this].concat(i)), removeClass(geByClass1("selected", this.coversWrap), "selected");
                var s = this._getPosition() % this.slides.length;
                addClass("landing_ads_cover_" + s, "selected")
            }, t.prototype._makeButtons = function(e) {
                for (var t = "", n = 0; n < e.length; n++) {
                    var i = e[n];
                    t += '<a href="' + i.href + '" class="landings_main_slider_button ' + i.style + '" onclick="' + (i.onClick ? i.onClick : "") + '">' + i.text + "</a>"
                }
                return '<div class="landings_main_slider_buttons">' + t + "</div>"
            }, t.prototype._getSlideCont = function(e, t) {
                var n = this._makeButtons(t.buttons ? t.buttons : ""),
                    i = t.href ? '<a href="' + t.href + '" class="landings_main_slider_slide_title">' + t.title + "</a>" : '<div class="landings_main_slider_slide_title">' + t.title + "</div>";
                return '\n<div class="landings_main_slider_slide_cont_wrap">\n  <div class="landings_main_slider_slide_cont">\n    ' + i + '\n    <div class="landings_main_slider_slide_caption">' + t.caption + "</div>\n    " + n + "\n  </div>\n</div>\n"
            }, t.prototype._getAnimationDuration = function() {
                return 700
            }, t
        }(l["default"]);
    t["default"] = d
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1),
        l = i(r),
        d = function(e) {
            function t() {
                return a(this, t), s(this, e.apply(this, arguments))
            }
            return o(t, e), t.prototype._onInited = function() {
                e.prototype._onChangeSlide.apply(this, arguments), this.delay = intval(this.opts.delay) || 1e4, this.start()
            }, t.prototype._onChangeSlide = function() {
                e.prototype._onChangeSlide.apply(this, arguments), this.stop(), this.start()
            }, t.prototype.start = function() {
                var e = this;
                this.rotationTimer = setTimeout(function() {
                    e.nextSlide()
                }, this.delay)
            }, t.prototype.stop = function() {
                clearTimeout(this.rotationTimer)
            }, t
        }(l["default"]);
    t["default"] = d
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1),
        l = i(r),
        d = function(e) {
            function t(n, i) {
                return a(this, t), i.wrapClass = "landing_ads_examples_slider", s(this, e.call(this, n, i))
            }
            return o(t, e), t.prototype._getSlideCont = function(e, t) {
                return '\n<a class="landing_ads_examples_row" href="' + t.link + '">\n  <div class="landing_ads_examples_row_icon ' + t.slug + '"></div>\n  <div class="landing_ads_examples_row_title">' + t.title + '</div>\n  <div class="landing_ads_examples_row_subtitle">' + (t.subtitle ? t.subtitle : "") + '</div>\n  <div class="landing_ads_examples_row_caption">' + t.caption + "</div>\n</a>"
            }, t.prototype._initSlider = function() {
                e.prototype._initSlider.call(this);
                var t = this._getPosition();
                this._setPosition(t + 1)
            }, t.prototype._getSlidesLimit = function() {
                return 5
            }, t
        }(l["default"]);
    t["default"] = d
}]);