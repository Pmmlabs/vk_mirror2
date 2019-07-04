! function(e) {
    function o(o) {
        for (var r, s, i = o[0], d = o[1], l = o[2], h = 0, g = []; h < i.length; h++) s = i[h], t[s] && g.push(t[s][0]), t[s] = 0;
        for (r in d) Object.prototype.hasOwnProperty.call(d, r) && (e[r] = d[r]);
        for (_ && _(o); g.length;) g.shift()();
        return a.push.apply(a, l || []), n()
    }

    function n() {
        for (var e, o = 0; o < a.length; o++) {
            for (var n = a[o], r = !0, i = 1; i < n.length; i++) {
                var d = n[i];
                0 !== t[d] && (r = !1)
            }
            r && (a.splice(o--, 1), e = s(s.s = n[0]))
        }
        return e
    }
    var r = {},
        t = {
            "web/landing_donors_day": 0
        },
        a = [];

    function s(o) {
        if (r[o]) return r[o].exports;
        var n = r[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, s), n.l = !0, n.exports
    }
    s.m = e, s.c = r, s.d = function(e, o, n) {
        s.o(e, o) || Object.defineProperty(e, o, {
            enumerable: !0,
            get: n
        })
    }, s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, s.t = function(e, o) {
        if (1 & o && (e = s(e)), 8 & o) return e;
        if (4 & o && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (s.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)
            for (var r in e) s.d(n, r, function(o) {
                return e[o]
            }.bind(null, r));
        return n
    }, s.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return s.d(o, "a", o), o
    }, s.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, s.p = "";
    var i = window.webpackJsonp = window.webpackJsonp || [],
        d = i.push.bind(i);
    i.push = o, i = i.slice();
    for (var l = 0; l < i.length; l++) o(i[l]);
    var _ = d;
    a.push([100, "bundles/common"]), n()
}({
    100: function(e, o, n) {
        e.exports = n("ERMh")
    },
    ERMh: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pIFo"),
            core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("SRfc");
        window.LandingDonorsDay = {
            BLOOD_LINES: [{
                svg: '<svg width="185" height="75" viewBox="0 0 185 75" xmlns="http://www.w3.org/2000/svg"><path d="M617,0 L617,45 L617,45 C617,53.2842712 623.715729,60 632,60 L785,60 L785,60 C793.284271,60 800,66.7157288 800,75 L800,75" transform="translate(-616)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 245.13072204589844,
                top: 103,
                right: 0
            }, {
                svg: '<svg width="288" height="51" viewBox="0 0 288 51" xmlns="http://www.w3.org/2000/svg"><path d="M286,51 C286,42.5909742 279.284272,35.8752454 271,36 L14.0000004,36 C6.21215942,35.8752454 4.39999894e-07,29.6630864 4.39999894e-07,22 L4.39999894e-07,0.5" transform="rotate(180 143.5 25.5)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 324.0846252441406,
                top: 431,
                left: 0
            }, {
                svg: '<svg width="116" height="50" viewBox="0 0 116 50" xmlns="http://www.w3.org/2000/svg"><path d="M285,111 L285,131 L285,131 C285,139.284271 291.715729,146 300,146 L356,146 C369.666667,155.333333 384.333333,160 400,160" transform="translate(-284 -111)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 146.46217346191406,
                top: 529,
                left: 284,
                noOffsetCorrect: !0
            }, {
                svg: '<svg height="154" width="154"><circle cx="77" cy="77" r="74" stroke="#EE5D4A" stroke-width="2" fill="transparent" /></svg>',
                length: 2 * Math.PI * 74,
                left: 323,
                top: 427,
                noOffsetCorrect: !0,
                memAvaCircle: !0,
                addStyle: {}
            }, {
                svg: '<svg width="74" height="37" viewBox="0 0 74 37" xmlns="http://www.w3.org/2000/svg"><path d="M358.5,146 L300.998276,146 L300.998276,146 C292.714005,146 285.998276,139.284271 285.998276,131 L285.998276,110" transform="rotate(180 179.5 73.5)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 102.06700134277344,
                top: 444,
                right: 281,
                noOffsetCorrect: !0
            }, {
                svg: '<svg width="288" height="50" viewBox="0 0 288 50" xmlns="http://www.w3.org/2000/svg"><path d="M286.03348,62 L286.03348,40.8752454 L286.03348,40.8752454 C286.03348,32.5909742 279.317752,25.8752454 271.03348,25.8752454 L14.9087259,25.8752454 L14.9087259,25.8752454 C7.24563942,25.8752454 1.03348044,19.6630864 1.03348044,12 L1.03348044,12" transform="rotate(180 144 31)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 322.6130676269531,
                top: 529,
                right: 0
            }, {
                svg: '<svg width="401" height="29" viewBox="0 0 401 29" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L0,11 L0,11 C1.082166e-15,20 7,27 16,27 L399,27" transform="matrix(-1 0 0 1 400 0)" stroke="#EE5D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>',
                length: 419.6598815917969,
                top: 26,
                right: 0,
                lastLine: !0
            }],
            init() {
                if (!cur.donorsDayIsMob) {
                    if (cur.donorsDayNeedShowEdit) return WkView.hide(!1, !0), void LandingDonorsDay.showEditBox();
                    wkcur.legacyBrowser = browser.msie || browser.msie_edge, wkcur._hide.push(LandingDonorsDay.onDestroy), wkcur._show.push(LandingDonorsDay.restore)
                }
                this.restore()
            },
            restore() {
                cur.donorsDayIsMob || (addClass(geByClass1("landing_wk_wrap", wkcur.wkContent), "landing_wk_wrap_donors_day"), setStyle(wkcur.wkCont, "padding-top", "70px"), setStyle(wkcur.wkContent, "width", "800px"), setStyle(wkcur.wkBox, {
                    borderRadius: "3px"
                }), hide(wkcur.wkLeft), this.renderBloodLines())
            },
            onDestroy() {
                clearTimeout(wkcur.timer)
            },
            renderBloodLines() {
                clearTimeout(wkcur.timer);
                for (var e = 0; e < this.BLOOD_LINES.length; e++) {
                    var o = this.BLOOD_LINES[e];
                    this.renderBloodLine(o), wkcur.legacyBrowser && !o.memAvaCircle && 2 !== e && (wkcur.animLine = e, this.animateIcon(!0))
                }
                if (wkcur.legacyBrowser) return wkcur.animLine = -1, void this.animateIcon(!0);
                wkcur.timer = setTimeout(() => {
                    clearTimeout(wkcur.timer), this.startAnimation()
                }, 1e3)
            },
            renderBloodLine(e, o) {
                var n = e.svg,
                    r = parseInt(e.svg.match(/width="(\d+)"/)[1]),
                    t = parseInt(e.svg.match(/height="(\d+)"/)[1]),
                    a = {
                        top: e.top,
                        width: r,
                        height: t
                    };
                if (e.addStyle && (a = extend(a, e.addStyle)), e.hasOwnProperty("right") && (a.right = e.right, e.noOffsetCorrect || (n = n.replace("<svg", '<svg style="right: -2px"'))), e.hasOwnProperty("left") && (a.left = e.left, e.noOffsetCorrect || (n = n.replace("<svg", '<svg style="left: -2px"'))), e.noOffsetCorrect && (n = n.replace("<svg", '<svg style="left: 0"')), o || wkcur.legacyBrowser || (n = n.replace("EE5D4A", "DBE0E8")), o) {
                    var s = this.getAnimationDuration(e.length);
                    e.memAvaCircle && (s *= .8);
                    var i = `<animate\n          attributeType="CSS"\n          attributeName="stroke-dashoffset"\n          dur="${s}ms"\n          from="${e.length}"\n          to="0"\n          fill="freeze"\n        />`;
                    e.memAvaCircle && (i += `<animateTransform\n            xmlns="http://www.w3.org/2000/svg"\n            attributeName="transform"\n            attributeType="XML"\n            type="rotate"\n            dur="${1.5*s}ms"\n            from="90 77 77"\n            to="-180 77 77"\n            fill="freeze"\n          />`), n = (n = (n = n.replace("<path", `<path stroke-dasharray="${e.length} ${e.length}" stroke-dashoffset="${e.length}" id="donors_day_anim_path${wkcur.animLine}"`)).replace("<circle", `<circle stroke-dasharray="${e.length} ${e.length}" stroke-dashoffset="${e.length}" id="donors_day_anim_path${wkcur.animLine}"`)).replace("/></svg>", `>${i}</path></svg>`), 3 === wkcur.animLine && (s *= .8), wkcur.timer = setTimeout(() => {
                        this.nextAnimation()
                    }, s)
                }
                var d = ce("div", {
                    className: "landing_donors_day_blood_line" + (e.lastLine ? " landing_donors_day_big_button_blood_line" : ""),
                    innerHTML: n
                }, a);
                e.lastLine ? geByClass1("landing_donors_day_big_button_wrap").appendChild(d) : ge("landing_donors_day_blood_lines").appendChild(d)
            },
            getAnimationDuration: e => 13 * e,
            startAnimation() {
                wkcur.animLine = -1, this.animateIcon();
                for (var e = LandingDonorsDay.BLOOD_LINES, o = 0, n = 0; n < e.length; n++) o += e[n].length;
                var r = ge("landing_donors_day_blood_packet_dead");
                setStyle(r, {
                    transition: "height " + LandingDonorsDay.getAnimationDuration(o) + "ms linear"
                }), setTimeout(() => {
                    setStyle(r, "height", 174 * .6)
                })
            },
            nextAnimation(e) {
                if (!e && -1 !== [1, 4].indexOf(wkcur.animLine)) return this.animateIcon();
                wkcur.animLine++, this.animateLine()
            },
            animateLine() {
                var e = this.BLOOD_LINES[wkcur.animLine];
                e && this.renderBloodLine(e, !0)
            },
            animateIcon(e) {
                var o = "landing_donors_day_member_blood_type_active_wrap",
                    n = 48,
                    r = "bottom";
                2 === wkcur.animLine ? (o = "landing_donors_day_member_ava_blood_line_active_wrap", n = 150, r = "top") : 1 === wkcur.animLine ? o = "landing_donors_day_member_blood_group_active_wrap" : -1 === wkcur.animLine && (o = "landing_donors_day_blood_line_start_active_wrap", n = 12);
                var t = geByClass1(o),
                    a = this.getAnimationDuration(1.5 * n),
                    s = {
                        transition: r + " " + a + "ms linear"
                    };
                e && delete s.transition, s[r] = -1 === wkcur.animLine ? 0 : "-2px", 2 === wkcur.animLine && (a *= .93), setStyle(t, s), wkcur.timer = setTimeout(() => {
                    this.nextAnimation(!0)
                }, -1 === wkcur.animLine ? 0 : a)
            },
            showEditBox() {
                showBox("landings.php", {
                    act: "donors_day_edit_box"
                })
            },
            editBoxInit(e) {
                curBox().setOptions({
                    width: 450,
                    onClean() {
                        cur.bloodGroupDD && cur.bloodGroupDD.destroy()
                    }
                }).removeButtons().addButton(getLang("global_save"), LandingDonorsDay.saveData).addButton(getLang("global_close"), !1, "no"), cur.bloodGroupDD = new Dropdown(ge("donors_day_edit_blood_group"), e.blood_groups, {
                    width: 200,
                    big: 1,
                    selectedItem: e.blood_group
                }), window.radioBtns = extend(window.radioBtns || {}, {
                    donors_day_blood_type: {
                        val: e.blood_type,
                        els: geByClass("radiobtn", "donors_day_blood_type_options")
                    }
                }), vkImage().src = "/images/landings/donors_day/snippet_bg.png"
            },
            saveData(e) {
                if (!isButtonLocked(e)) {
                    var o = {
                        act: "donors_day_edit",
                        save_hash: cur.donorsDayEditHash,
                        group: cur.donorsDayIsMob ? ge("donors_day_edit_group").value : cur.bloodGroupDD.val(),
                        type: cur.donorsDayIsMob ? ge("donors_day_edit_type").value : radioval("donors_day_blood_type"),
                        on_18years: hasClass("donors_day_18years", "on") ? 1 : 0,
                        on_ready_to_give: hasClass("donors_day_ready_to_give", "on") ? 1 : 0,
                        api_view: cur.donorsDayApiViewHash
                    };
                    lockButton(e), LandingDonorsDay.renderSnippet(o.group, o.type, n => {
                        if (!n) return unlockButton(e), topError(getLang("global_error_occured"), 3);
                        o.media = n, ajax.post("landings.php", extend(o, n), {
                            onDone(e) {
                                cur.donorsDayIsMob ? location.reload() : (curBox().hide(), window.wkcur && "donors_day" === wkcur.wkRaw && wkcur.shown && WkView.hide(!1, !0), showWiki({
                                    w: "donors_day"
                                }))
                            },
                            showProgress: lockButton.pbind(e),
                            hideProgress: unlockButton.pbind(e)
                        })
                    })
                }
            },
            showUserInfo(e, o) {
                browser.mobile || (cancelEvent(o), WkView.hide(!0, !0), showWiki({
                    w: "donors_day" + (e || vk.id),
                    from_snippet: 1
                }))
            },
            showMobEdit() {
                cur.donorsDayEditScroll = scrollGetY(), hide("donors_day_main_screen"), show("donors_day_edit_screen")
            },
            hideMobEdit() {
                hide("donors_day_edit_screen"), show("donors_day_main_screen"), scrollToY(cur.donorsDayEditScroll || 0)
            },
            showMore(e) {
                removeClass(geByClass1("donors_day_users_chunk_hidden", e.parentNode), "donors_day_users_chunk_hidden"), geByClass1("donors_day_users_chunk_hidden", e.parentNode) || re(e)
            },
            renderSnippet(e, o, n) {
                var r = vkImage();
                r.onload = (() => {
                    var t = ce("canvas", {
                        width: 2040,
                        height: 912
                    }, {});
                    ge("donors_day_canvas_helper").appendChild(t);
                    var a = t.getContext("2d");
                    a.direction = "ltr", a.drawImage(r, 0, 0, 2040, 912), a.textBaseline = "top", a.imageSmoothingEnabled = !0, a.font = "normal 120px Open Sans", a.textAlign = "left", a.fillStyle = "#fff";
                    var s = unclean(cur.donorsDayUserName);
                    s.length > 27 && (s = cur.donorsDayUserName.substr(0, 27) + "..");
                    var i = a.measureText(s).width;
                    a.fillText(s, 1020 - i / 2, 300), a.font = "normal 80px Open Sans", a.textAlign = "left", a.fillStyle = "rgba(255,255,255,0.8)";
                    var d = unclean(cur.lang.landings_donors_day_snippet_caption_line1.replace("%s", e)),
                        l = a.measureText(d).width;
                    a.fillText(d, 1020 - l / 2, 492);
                    var _ = 1 == intval(o) ? cur.lang.landings_donors_day_snippet_caption_line2_plus : cur.lang.landings_donors_day_snippet_caption_line2_minus;
                    _ = unclean(_);
                    var h = a.measureText(_).width;
                    a.fillText(_, 1020 - h / 2, 600);
                    var g = t.toDataURL("image/png", .99);
                    g = g.substr(g.indexOf("base64,", 0) + 7), this.uploadSnippetPhoto(g, n)
                }), r.src = "/images/landings/donors_day/snippet_bg.png"
            },
            uploadSnippetPhoto(base64, callback) {
                var XHR = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
                    xhr = new XHR;
                xhr.open("POST", cur.donorsDayUploadServer, !0), xhr.onload = (() => {
                    var obj, res = xhr.responseText;
                    try {
                        obj = eval("(" + res + ")")
                    } catch (e) {
                        obj = q2ajx(res)
                    }
                    callback(obj)
                });
                var form = new FormData;
                form.append("Photo_base64", base64), xhr.send(form)
            },
            share(e) {
                isButtonLocked(e) || ajax.post("landings.php", {
                    act: "donors_day_share",
                    hash: cur.donorsDayShareHash,
                    api_view: cur.donorsDayApiViewHash
                }, {
                    onDone() {
                        addClass(geByClass1("landing_donors_day_big_button_wrap"), "shared"), show(geByClass1("landing_donors_day_share_result"))
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            },
            click18YearsCheckbox(e) {
                var o = ge("donors_day_ready_to_give");
                toggleClass(o, "disabled", !hasClass(e, "on")), toggleClass(o, "on", hasClass(e, "on"))
            }
        };
        try {
            stManager.done("landing_donors_day.js")
        } catch (e) {}
    }
});