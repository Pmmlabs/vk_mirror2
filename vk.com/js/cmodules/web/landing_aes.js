! function(e) {
    function a(a) {
        for (var t, r, o = a[0], d = a[1], l = a[2], c = 0, g = []; c < o.length; c++) r = o[c], i[r] && g.push(i[r][0]), i[r] = 0;
        for (t in d) Object.prototype.hasOwnProperty.call(d, t) && (e[t] = d[t]);
        for (_ && _(a); g.length;) g.shift()();
        return s.push.apply(s, l || []), n()
    }

    function n() {
        for (var e, a = 0; a < s.length; a++) {
            for (var n = s[a], t = !0, o = 1; o < n.length; o++) {
                var d = n[o];
                0 !== i[d] && (t = !1)
            }
            t && (s.splice(a--, 1), e = r(r.s = n[0]))
        }
        return e
    }
    var t = {},
        i = {
            "web/landing_aes": 0
        },
        s = [];

    function r(a) {
        if (t[a]) return t[a].exports;
        var n = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    r.m = e, r.c = t, r.d = function(e, a, n) {
        r.o(e, a) || Object.defineProperty(e, a, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, a) {
        if (1 & a && (e = r(e)), 8 & a) return e;
        if (4 & a && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & a && "string" != typeof e)
            for (var t in e) r.d(n, t, function(a) {
                return e[a]
            }.bind(null, t));
        return n
    }, r.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(a, "a", a), a
    }, r.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, r.p = "";
    var o = window.webpackJsonp = window.webpackJsonp || [],
        d = o.push.bind(o);
    o.push = a, o = o.slice();
    for (var l = 0; l < o.length; l++) a(o[l]);
    var _ = d;
    s.push([103, "bundles/common"]), n()
}({
    103: function(e, a, n) {
        e.exports = n("3ddT")
    },
    "3ddT": function(e, a, n) {
        "use strict";
        n.r(a);
        n("pIFo"), n("SRfc");
        var t = 400;
        class i {
            constructor(e, a) {
                this.opts = a, this.wrap = ge(e), this.slides = a.slides, this._initWrap(), this._renderNavArrow(), this._initSlider(), this._updateSlidesPosition(), this._onInited()
            }
            _onInited() {}
            _onChangeSlide(e) {}
            _initWrap() {
                var e = `\n<div class="landings_base_slider_wrap ${this.opts.wrapClass}">\n  <div class="landings_base_slider_slides_container"></div>\n</div>\n`;
                val(this.wrap, e), this.container = geByClass1("landings_base_slider_slides_container", this.wrap), this.slidesWrap = geByClass1("landings_base_slider_wrap", this.wrap)
            }
            _initSlider() {
                this._setPosition(0)
            }
            _renderSlides() {
                for (var e = this._getOneSideSlidesLimit(), a = this._getPosition(), n = a - e; n <= a + e; n++)
                    if (!this._getSlideWrap(n)) {
                        var t = this._getSlideData(n);
                        if (t) {
                            var i = this._getSlideCont(n, t);
                            if (i) {
                                var s = ce("div", {
                                    className: "landings_base_slider_slide_wrap _landings_slide_" + n
                                }, {
                                    transition: this._getTransition()
                                });
                                "string" == typeof i ? s.innerHTML = i : s.appendChild(i), attr(s, "data-position", n), this.container.appendChild(s)
                            }
                        }
                    }
            }
            _getTransition() {
                return "transition: opacity " + this._getAnimationDuration() + "ms ease-in-out"
            }
            _getSlidesFromDOM() {
                return geByClass("landings_base_slider_slide_wrap", this.container)
            }
            _destroySlides() {
                for (var e = this._getSlidesFromDOM(), a = this._getPosition(), n = this._getOneSideSlidesLimit(), t = a - n, i = a + n, s = 0; s < e.length; s++) {
                    var r = e[s],
                        o = parseInt(attr(r, "data-position"));
                    (o < t || o > i) && this._destroySlide(r)
                }
            }
            _destroySlide(e) {
                removeEvent(e, "click"), re(e)
            }
            _getSlideData(e) {
                return this.slides[e]
            }
            _getSlideCont(e, a) {
                return '<img class="landings_base_slider_slide" src="' + a.imageSrc + '" />'
            }
            _getSize() {
                return this.slides.length
            }
            _getPosition() {
                return this.position
            }
            _setPosition(e) {
                this.lastDirection = e > this.position ? "next" : "prev", this.position = e, this._onChangeSlide(this._getSlideData(e))
            }
            _getSlidesLimit() {
                return 3
            }
            _getOneSideSlidesLimit() {
                return (this._getSlidesLimit() - 1) / 2
            }
            _getSlideWrap(e) {
                return geByClass1("_landings_slide_" + e, this.container)
            }
            _updateSlidesPosition() {
                this.lock = !0, this._renderSlides();
                for (var e = this._getSlidesFromDOM(), a = this._getOneSideSlidesLimit(), n = this._getPosition(), t = 0; t < e.length; t++) {
                    var i = e[t],
                        s = parseInt(attr(i, "data-position")),
                        r = Math.min(a, Math.max(s - n, -a));
                    this._updateSlide(i, r)
                }
                setTimeout(() => {
                    this._destroySlides(), this.lock = !1
                }, this._getAnimationDuration())
            }
            _getAnimationDuration() {
                return t
            }
            _updateSlide(e, a) {
                setStyle(e, "transform", "translateX(" + 100 * a + "%)")
            }
            _renderNavArrow() {
                var e = ce("div", {
                    className: "landings_slider_base_arrow left"
                });
                addEvent(e, "click", this.prevSlide.bind(this)), this.slidesWrap.appendChild(e);
                var a = ce("div", {
                    className: "landings_slider_base_arrow right"
                });
                addEvent(a, "click", this.nextSlide.bind(this)), this.slidesWrap.appendChild(a)
            }
            _isLocked() {
                return this.lock || this.disabled
            }
            nextSlide() {
                if (this._isLocked()) return !1;
                this._changeSlide(Math.min(this._getPosition() + 1, this._getSize() - 1))
            }
            prevSlide() {
                if (this._isLocked()) return !1;
                this._changeSlide(Math.max(this._getPosition() - 1, 0))
            }
            _changeSlide(e) {
                e != this._getPosition() && (this._setPosition(e), this._updateSlidesPosition())
            }
            setDisabled(e) {
                this.disabled = e, e ? addClass(this.wrap, "landings_base_slider_disabled") : removeClass(this.wrap, "landings_base_slider_disabled")
            }
        }
        var s = 1e8;
        class r extends i {
            _initSlider() {
                this._setPosition(s / 2)
            }
            _getSize() {
                return s
            }
            _getSlideData(e) {
                return this.slides[e % this.slides.length]
            }
        }
        class o extends r {
            _onInited() {
                super._onChangeSlide.apply(this, arguments), this.delay = intval(this.opts.delay) || 1e4, this.start()
            }
            _onChangeSlide() {
                super._onChangeSlide.apply(this, arguments), this.stop(), this.start()
            }
            start() {
                this.rotationTimer = setTimeout(() => {
                    this.nextSlide()
                }, this.delay)
            }
            stop() {
                clearTimeout(this.rotationTimer)
            }
        }
        n("tUrg");
        var d = 400;
        window.LandingAds = {
            init: (e, a) => {
                switch (cur.lang = extend(cur.lang || {}, a.langs), window.saveScrollTopOnBack = !0, cur.adsNoOffice = !!a.no_office, LandingAds.initMainSlider(e, a.mainSliderData), e) {
                    case "intro":
                        LandingAds.initIntro(a);
                        break;
                    case "company_page":
                        LandingAds.initCompanyPage(a);
                        break;
                    case "targeting":
                        LandingAds.initTargeting(a);
                        break;
                    case "special_projects":
                        LandingAds.initSpecialProjects(a);
                        break;
                    case "community_ads":
                        LandingAds.initCommunityAds(a);
                        break;
                    case "adv_agency":
                        LandingAds.initAdvAgency(a)
                }
                cur.destroy.push(LandingAds.destroy), LandingAds.initYA(), a.blockAnchor && LandingAds.scrollToBLock(a.blockAnchor)
            },
            scrollToBLock(e) {
                var a = ge(e);
                a && (LandingAds.toggleScrollRestoration(!1), window.preventLocationScroll = !0, scrollToY(getXY(a)[1], 0))
            },
            toggleScrollRestoration(e) {
                window.history && "scrollRestoration" in history && (history.scrollRestoration = e ? "auto" : "manual")
            },
            initYA() {
                window.aesYAInited || (window.aesYAInited = !0, function(e, a, n) {
                    (a[n] = a[n] || []).push(function() {
                        try {
                            a.yaCounter44101674 = new Ya.Metrika({
                                id: 44101674,
                                clickmap: !0,
                                trackLinks: !0,
                                accurateTrackBounce: !0,
                                webvisor: !0
                            })
                        } catch (e) {}
                    });
                    var t = e.getElementsByTagName("script")[0],
                        i = e.createElement("script"),
                        s = function() {
                            t.parentNode.insertBefore(i, t)
                        };
                    i.type = "text/javascript", i.async = !0, i.src = "https://mc.yandex.ru/metrika/watch.js", "[object Opera]" == a.opera ? e.addEventListener("DOMContentLoaded", s, !1) : s()
                }(document, window, "yandex_metrika_callbacks"), utilsNode.appendChild(ce("img", {
                    src: "https://mc.yandex.ru/watch/44101674"
                })))
            },
            destroy: function() {
                cur.mainSlider && cur.mainSlider.stop(), addEvent(window, "scroll", LandingAds._onCompanyPageOnScroll), clearTimeout(cur.widgetsChangeTimer), clearTimeout(cur.searchPeopleExampleTimer), cur.livesScroll && cur.livesScroll.destroy(), LandingAds._loopedGroupsList = [], LandingAds.toggleScrollRestoration(!0)
            },
            initIntro: e => {},
            initCompanyPage: e => {
                LandingAds.initFeedScrolling(), LandingAds.selectWidget(LandingAds._WIDGET_TYPES[0]), LandingAds.initExamplesSlider(e.examplesSliderData), cur.searchPeopleExamples = e.searchPeopleExamples;
                for (var a = "", n = 0; n < cur.searchPeopleExamples.length; n++) a += `<div class="landing_ads_company_page_search_icon" id="landing_ads_search_people_example_icon_${n}" style="background-image: url(${cur.searchPeopleExamples[n].picture})"></div>`;
                val(geByClass1("landing_ads_company_page_search_icons"), a), LandingAds.selectSearchPeopleExample(0)
            },
            initTargeting: e => {},
            initSpecialProjects: e => {
                cur.gamesIntegrationSlider = new class extends r {
                    constructor(e, a) {
                        a.wrapClass = "landing_ads_games_integration_slider", super(e, a)
                    }
                    _getSlideCont(e, a) {
                        var n = ce("div", {
                            className: "landing_ads_games_integration_slide"
                        }, {
                            "background-image": `url(${a.src})`
                        });
                        return addEvent(n, "click", () => {
                            this._changeSlide(e)
                        }), n
                    }
                    _getSlidesLimit() {
                        return 5
                    }
                    _updateSlide(e, a) {
                        var n = {
                            transform: "translateX(" + 100 * a + "%)",
                            transition: "transform " + d + "ms ease-in-out"
                        };
                        "next" == this.lastDirection && -1 == a || "prev" == this.lastDirection && 1 == a ? n.zIndex = 3 : n.zIndex = 0 == a ? 2 : 1, setStyle(e, n);
                        var t = geByClass1("landing_ads_games_integration_slide", e);
                        0 == a ? setStyle(t, {
                            transform: "scale(1.26)",
                            "transition-delay": Math.round(d / 4) + "ms"
                        }) : setStyle(t, {
                            transform: "scale(1)",
                            "transition-delay": "0ms"
                        }), 3 == n.zIndex && (clearTimeout(this.resetZIndexTimer), this.resetZIndexTimer = setTimeout(() => {
                            setStyle(e, "z-index", 1)
                        }, d / 2))
                    }
                }("ads_games_integration_slider", {
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
                }, this.numberInput(ge("adv_agency_form_starting_budget")), this.numberInput(ge("adv_agency_form_monthly_budget"));
                this._makeDynamicField("#adv_agency_offices", ".js-adv-agency-offices-add", function(e, a, n) {
                    n && a.focus()
                }, 3);
                this._makeDynamicField("#adv_agency_clients_wrap", ".js-adv-agency-clients-add", function(e, a, n) {
                    n && domQuery1("input", a).focus()
                }, 3);
                for (var a = domQuery("#adv_agency_already_advertise > .radiobtn"), n = 0; n < a.length; n++) {
                    a[n].addEventListener("click", function(e) {
                        var a = radioval("adv_agency_already_advertise"),
                            n = ge("adv_agency_offices_field");
                        1 === a ? removeClass(n, "hidden") : addClass(n, "hidden")
                    })
                }
                domQuery1('#adv_agency_business_direction_wrap > div[data-id="other"]').addEventListener("click", function(e) {
                    var a = ge("adv_agency_business_direction_other");
                    hasClass(e.target, "on") ? removeClass(a, "hidden") : addClass(a, "hidden")
                })
            },
            initMainSlider: (e, a) => {
                cur.mainSlider = new class extends o {
                    constructor() {
                        super(...arguments), this.coversWrap = geByClass1("landing_main_slider_covers_wrap")
                    }
                    _onChangeSlide() {
                        super._onChangeSlide(...arguments), removeClass(geByClass1("selected", this.coversWrap), "selected");
                        var e = this._getPosition() % this.slides.length;
                        addClass("landing_ads_cover_" + e, "selected")
                    }
                    _makeButtons(e) {
                        for (var a = "", n = 0; n < e.length; n++) {
                            var t = e[n];
                            a += `<a href="${t.href}" class="landings_main_slider_button ${t.style}" onclick="${t.onClick?t.onClick:""}">${t.text}</a>`
                        }
                        return `<div class="landings_main_slider_buttons">${a}</div>`
                    }
                    _getSlideCont(e, a) {
                        var n = this._makeButtons(a.buttons ? a.buttons : "");
                        return `\n<div class="landings_main_slider_slide_cont_wrap">\n  <div class="landings_main_slider_slide_cont">\n    ${a.href?`<a href="${a.href}" class="landings_main_slider_slide_title">${a.title}</a>`:`<div class="landings_main_slider_slide_title">${a.title}</div>`}\n    <div class="landings_main_slider_slide_caption">${a.caption}</div>\n    ${n}\n  </div>\n</div>\n`
                    }
                    _getAnimationDuration() {
                        return 700
                    }
                }("ads_main_slider", {
                    slides: a
                }), "intro" !== e && cur.mainSlider.setDisabled(!0)
            },
            initExamplesSlider: e => {
                cur.examplesSlider = new class extends r {
                    constructor(e, a) {
                        a.wrapClass = "landing_ads_examples_slider", super(e, a)
                    }
                    _getSlideCont(e, a) {
                        return `\n<a class="landing_ads_examples_row" href="${a.link}">\n  <div class="landing_ads_examples_row_icon ${a.slug}"></div>\n  <div class="landing_ads_examples_row_title">${a.title}</div>\n  <div class="landing_ads_examples_row_subtitle">${a.subtitle?a.subtitle:""}</div>\n  <div class="landing_ads_examples_row_caption">${a.caption}</div>\n</a>`
                    }
                    _initSlider() {
                        super._initSlider();
                        var e = this._getPosition();
                        this._setPosition(e + 1)
                    }
                    _getSlidesLimit() {
                        return 5
                    }
                }("ads_examples_slider", {
                    slides: e
                })
            },
            switchTab: (e, a) => {
                if (checkEvent(a)) return !0;
                var n = gpeByClass("ui_tabs", e);
                if (geByClass1("ui_tab_sel", n) == e) return !1;
                var t = 0;
                return hasClass(e.parentNode, "ui_tab_plain") || (uiTabs.switchTab(e), uiTabs.showProgress(n), t = 1), cancelEvent(a), nav.go(e, a, {
                    noscroll: t
                })
            },
            showCreateGroupBox: function(e) {
                return cancelEvent(e), !showBox("/al_groups.php", {
                    act: "create_box"
                })
            },
            showCreateGroupBoxNew: function(e) {
                return cancelEvent(e), !showWiki({
                    w: "groups_create"
                })
            },
            initFeedScrolling: function() {
                var e = geByClass1("landing_ads_company_page_posts");
                cur.scrollingWrap = e, cur.scrollingContainer = geByClass1("landing_ads_company_page_post_container", e), cur.scrollingContainerHeight = getSize(cur.scrollingContainer)[1], cur.scrollingLastTop = 0, addEvent(window, "scroll", this._onCompanyPageOnScroll)
            },
            _makeDynamicField(e, a) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    t = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;

                function i() {
                    var i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        r = s.cloneNode(!0),
                        o = domQuery(e + " > *").length + 1;
                    domQuery1(e).appendChild(r), n && n(o, r, i), t && o >= t && domQuery1(a).classList.add("hidden")
                }
                var s = domQuery1(e + " > *:first-child");
                s.parentNode.removeChild(s), i(), domQuery1(a).addEventListener("click", function(e) {
                    e.preventDefault(), i(!0)
                })
            },
            _onCompanyPageOnScroll: function() {
                var e = scrollGetY(),
                    a = window.innerHeight,
                    n = (bodyNode.offsetHeight, getXY(cur.scrollingWrap)[1] - a),
                    t = getSize(cur.scrollingWrap)[1],
                    i = Math.max(0, Math.min((e - n) * Math.max(.85, t / a), cur.scrollingContainerHeight - 516));
                cur.scrollingLastTop != i && (cur.scrollingLastTop = i, setStyle(cur.scrollingContainer, "transform", "translateY(" + -i + "px)"))
            },
            _WIDGET_TYPES: ["messages", "followers", "comments"],
            selectWidget: function(e) {
                for (var a = geByClass1("landing_ads_company_page_widgets"), n = 0; n < LandingAds._WIDGET_TYPES.length; n++) removeClass(a, LandingAds._WIDGET_TYPES[n]);
                addClass(a, e), slideUp(geByClass1(cur.selectedWidget + "_caption", a), 200), slideDown(geByClass1(e + "_caption", a), 200), cur.selectedWidget = e, clearTimeout(cur.widgetsChangeTimer), cur.widgetsChangeTimer = setTimeout(() => {
                    var e = LandingAds._WIDGET_TYPES.indexOf(cur.selectedWidget) + 1;
                    e > LandingAds._WIDGET_TYPES.length - 1 && (e = 0), LandingAds.selectWidget(LandingAds._WIDGET_TYPES[e])
                }, 7e3)
            },
            selectSearchPeopleExample: e => {
                removeClass("landing_ads_search_people_example_icon_" + cur.searchPeopleExampleIndex, "selected"), addClass("landing_ads_search_people_example_icon_" + e, "selected"), val(geByClass1("landing_ads_company_page_search_icon_caption"), cur.searchPeopleExamples[e].caption), cur.searchPeopleExampleIndex = e, clearTimeout(cur.searchPeopleExampleTimer), cur.searchPeopleExampleTimer = setTimeout(() => {
                    LandingAds.selectSearchPeopleExampleNext()
                }, 7e3)
            },
            selectSearchPeopleExampleNext: () => {
                var e = cur.searchPeopleExampleIndex + 1;
                e > cur.searchPeopleExamples.length - 1 && (e = 0), LandingAds.selectSearchPeopleExample(e)
            },
            targetingChangePostType: (e, a) => {
                var n = ge("ads_targeting_ads_example_tab1");
                removeClass(geByClass1("selected", n), "selected"), addClass(e, "selected"), setStyle(geByClass1("landing_ads_targeting_ads_example_post_iphone_feed"), "transform", "translateY(-" + 236 * a + "px)"), setStyle(geByClass1("landing_ads_targeting_ads_example_post_browser_feed"), "transform", "translateY(-" + 273 * a + "px)")
            },
            targetingChangeGroupType: (e, a, n) => {
                n || (n = 2);
                var t = ge("ads_targeting_ads_example_tab" + n);
                removeClass(geByClass1("selected", t), "selected"), addClass(e, "selected");
                var i = geByClass1("landing_ads_targeting_ads_example_group_wrap", t);
                removeClass(geByClass1("shown", i), "shown"), addClass(geByClass1("group" + a, i), "shown")
            },
            switchTargetingExamplesTab: (e, a, n) => {
                if (cancelEvent(a), geByClass1("ui_tab_sel", gpeByClass("ui_tabs", e)) == e) return !1;
                uiTabs.switchTab(e);
                var t = geByClass1("landing_ads_targeting_ads_examples");
                removeClass(geByClass1("selected_tab", t), "selected_tab"), addClass("ads_targeting_ads_example_tab" + n, "selected_tab")
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
                for (var a = 0; a < e.length; a++) this._appendLoopedGroup(a);
                for (var n = 0; n < 4; n++) this._appendLoopedGroup(n);
                var t = ge("looped_groups_marquee");
                setStyle(t, {
                    height: t.scrollHeight - 440,
                    "animation-duration": 2 * e.length + "s"
                })
            },
            _appendLoopedGroup: function(e) {
                var a = this._loopedGroupsList[e],
                    n = `\n<div class="landing_ads_looped_group clear_fix">\n  <div class="landing_ads_looped_group_icon fl_l" style="background-image: url(${a.icon})"></div>\n  <div class="landing_ads_looped_group_info">\n    <div class="landing_ads_looped_group_title">${a.title}</div>\n    <div class="landing_ads_looped_group_caption">${a.caption}</div>\n  </div>\n</div>`;
                ge("looped_groups_marquee").appendChild(se(n))
            },
            specialProjectsMailForm: function() {
                showBox("/ads.php", {
                    act: "special_project_send_request_box"
                })
            },
            specialProjectsMailFormSend: function(e) {
                lockButton(e), cur.badPriceTooltip && cur.badPriceTooltip.hide(), LandingAds.sendStatEvent("special_project_send");
                var a = String(val("special_project_request_budget")).match(/(\d+)/g);
                a = a ? a.join("") : 0, hide(geByClass1("landing_ads_special_project_request_error")), ajax.post("/ads.php", {
                    act: "special_project_send_request",
                    type: radioval("project_type"),
                    budget: a,
                    agency: val("special_project_request_agency"),
                    brand: val("special_project_request_brand"),
                    contact: val("special_project_request_contact"),
                    email: val("special_project_request_email"),
                    Brief: val("special_project_request_brief"),
                    hash: cur.specialProjectRequestHash
                }, {
                    onDone: (a, n) => {
                        unlockButton(e), "bad_price" == a ? (cur.badPriceTooltip = new ElementTooltip("special_project_request_budget_wrap", {
                            autoShow: !1,
                            content: '<div class="feature_intro_tt_hide" onclick="cur.badPriceTooltip.hide();"></div><div class="landing_ads_special_projects_bad_price_tt_text">' + n + "</div>",
                            cls: "feature_intro_tt",
                            forceSide: "right",
                            width: 280,
                            offset: [-40, 0, 0],
                            onHide: function() {
                                cur.badPriceTooltip && cur.badPriceTooltip.destroy()
                            }
                        }), cur.badPriceTooltip.show()) : "required_inputs" == a ? show(geByClass1("landing_ads_special_project_request_error")) : curBox().hide()
                    },
                    onFail: () => {
                        unlockButton(e)
                    }
                })
            },
            openLive: function(e, a) {
                var n = attr(e, "data-link");
                a || (n += "&autoplay=1"), removeClass(geByClass1("mv_playlist_item_active", "landing_ads_lives"), "mv_playlist_item_active"), addClass(e, "mv_playlist_item_active"), attr(geByClass1("landing_ads_live_player"), "src", n)
            },
            sendAdvAgencyForm: function(e, a) {
                var n = parseInt(cur.countryDD.val()),
                    t = trim(val("adv_agency_form_city")),
                    i = trim(val("adv_agency_form_site")),
                    s = trim(val("adv_agency_form_company")),
                    r = trim(val("adv_agency_form_inn")),
                    o = trim(val("adv_agency_form_starting_budget")),
                    d = trim(val("adv_agency_form_monthly_budget")),
                    l = trim(val("adv_agency_form_contact_first_name")),
                    _ = trim(val("adv_agency_form_contact_last_name")),
                    c = trim(val("adv_agency_form_vk_profile")),
                    g = trim(val("adv_agency_form_email")),
                    u = trim(val("adv_agency_form_message"));

                function p(e) {
                    return -1 !== e.indexOf(".") && -1 === e.indexOf(" ")
                }
                if (!n) return cur.countryDD.focus(), void notaBene(cur.countryDD.container);
                if (t)
                    if (i && p(i))
                        if (s)
                            if (r && /^\d+$/.test(r)) {
                                for (var v = [], m = geByClass("on", "adv_agency_business_direction_wrap"), h = 0; h < m.length; h++) {
                                    var y = m[h];
                                    v.push(y.getAttribute("data-id"))
                                }
                                var f = ""; - 1 !== v.indexOf("other") && (f = trim(val("adv_agency_business_direction_other")));
                                for (var S = [], b = domQuery("#adv_agency_offices > input"), w = 0; w < b.length; w++) {
                                    var C = b[w];
                                    if (null === S) return;
                                    var x = val(C);
                                    if (x && !p(x)) return notaBene(C), void(S = null);
                                    x && S.push(x)
                                }
                                if (null !== S) {
                                    for (var B = [], T = domQuery("#adv_agency_clients_wrap > div"), L = 0; L < T.length; L++) {
                                        var P = T[L];
                                        if (null === B) return;
                                        var k = val(domQuery1('input[data-id="name"]', P)),
                                            E = val(domQuery1('input[data-id="site"]', P));
                                        E && !p(E) && (B = null, notaBene(domQuery1('input[data-id="site"]', P))), (k || E) && B.push({
                                            name: k,
                                            site: E
                                        })
                                    }
                                    if (null !== B)
                                        if (0 !== B.length) {
                                            for (var A = [], D = geByClass("on", "adv_agency_products_wrap"), j = 0; j < D.length; j++) A.push(attr(D[j], "data-id"));
                                            if (!o || !/^[1-9][0-9 ]*$/.test(o)) return notaBene("adv_agency_form_starting_budget");
                                            if (!d || !/^[1-9][0-9 ]*$/.test(d)) return notaBene("adv_agency_form_monthly_budget");
                                            if (l)
                                                if (_)
                                                    if (c && /^(https?:\/\/)?vk\.com\/[^\/]+$/.test(c)) {
                                                        if (!g || ! function(e) {
                                                                return -1 !== e.indexOf("@") && -1 === e.indexOf(" ")
                                                            }(g)) return notaBene("adv_agency_form_email");
                                                        var I = {
                                                                act: "adv_agency_send_request",
                                                                country: n,
                                                                city: t,
                                                                site: i,
                                                                company: s,
                                                                inn: r,
                                                                starting_budget: o,
                                                                monthly_budget: d,
                                                                contact: l + " " + _,
                                                                email: g,
                                                                vk_profile: c,
                                                                Message: u,
                                                                products: A.join(","),
                                                                business_directions: v.join(","),
                                                                business_direction_other: f,
                                                                offices: JSON.stringify(S),
                                                                clients: JSON.stringify(B),
                                                                hash: a
                                                            },
                                                            O = ge("adv_agency_form_sent");
                                                        hide(O), LandingAds.sendStatEvent("adv_agency_form_send"), lockButton(e), ajax.post("ads.php", I, {
                                                            onDone: function() {
                                                                unlockButton(e), val("adv_agency_form_city", ""), val("adv_agency_form_site", ""), val("adv_agency_form_company", ""), val("adv_agency_form_inn", ""), val("adv_agency_form_starting_budget", ""), val("adv_agency_form_monthly_budget", ""), val("adv_agency_form_contact_first_name", domData(ge("adv_agency_form_contact_first_name"), "initial")), val("adv_agency_form_contact_last_name", domData(ge("adv_agency_form_contact_last_name"), "initial")), val("adv_agency_form_email", ""), val("adv_agency_form_vk_profile", domData(ge("adv_agency_form_vk_profile"), "initial")), val("adv_agency_form_message", ""), val("adv_agency_business_direction_other", ""), cur.countryDD.selectItem(0);
                                                                for (var a = geByClass("on", "adv_agency_products_wrap"), n = 0; n < a.length; n++) removeClass(a[n], "on");
                                                                for (var t = geByClass("on", "adv_agency_business_direction_wrap"), i = 0; i < t.length; i++) removeClass(t[i], "on");
                                                                addClass(ge("adv_agency_business_direction_other"), "hidden"), radiobtn(domQuery1('#adv_agency_already_advertise > .radiobtn[data-value="0"]'), 0, "adv_agency_already_advertise");
                                                                for (var s = domQuery("#adv_agency_offices > input"), r = 0; r < s.length; r++) {
                                                                    var o = s[r];
                                                                    0 === r ? val(o, "") : o.parentNode.removeChild(o)
                                                                }
                                                                removeClass(geByClass1("js-adv-agency-offices-add"), "hidden"), addClass(ge("adv_agency_offices_field"), "hidden");
                                                                for (var d = domQuery("#adv_agency_clients_wrap > div"), l = 0; l < d.length; l++) {
                                                                    var _ = d[l];
                                                                    if (0 === l)
                                                                        for (var c = geByTag("input", _), g = 0; g < c.length; g++) {
                                                                            var u = c[g];
                                                                            val(u, "")
                                                                        } else _.parentNode.removeChild(_)
                                                                }
                                                                removeClass(geByClass1("js-adv-agency-clients-add"), "hidden"), show(O), scrollToY(getXY(O)[1] - 200)
                                                            },
                                                            onFail: function() {
                                                                unlockButton(e)
                                                            }
                                                        })
                                                    } else notaBene("adv_agency_form_vk_profile");
                                            else notaBene("adv_agency_form_contact_last_name");
                                            else notaBene("adv_agency_form_contact_first_name")
                                        } else
                                            for (var $ = domQuery("#adv_agency_clients_wrap > div:first-child input"), W = 0; W < $.length; W++) notaBene($[W])
                                }
                            } else notaBene("adv_agency_form_inn");
                else notaBene("adv_agency_form_company");
                else notaBene("adv_agency_form_site");
                else notaBene("adv_agency_form_city")
            },
            sendStatEvent: function(e) {
                var a = "button-click-" + e;
                VK.Retargeting.Event(a), window.yaCounter44101674.reachGoal(a)
            },
            showBecomePartnerBox: function(e) {
                return e.preventDefault(), showBox("/ads.php", {
                    act: "become_partner_box"
                })
            },
            numberInput(e) {
                function a() {
                    var a = e.value;
                    e.value = e.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " "), a && !e.value && notaBene(e)
                }
                e.addEventListener("keyup", a), e.addEventListener("change", a), e.addEventListener("input", a)
            }
        };
        try {
            stManager.done("landing_aes.js")
        } catch (e) {}
    }
});