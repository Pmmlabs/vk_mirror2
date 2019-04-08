! function(e) {
    var n = {};

    function o(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }
    o.m = e, o.c = n, o.d = function(e, n, t) {
        o.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: t
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, n) {
        if (1 & n && (e = o(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (o.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) o.d(t, r, function(n) {
                return e[n]
            }.bind(null, r));
        return t
    }, o.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(n, "a", n), n
    }, o.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, o.p = "", o(o.s = 102)
}({
    102: function(e, n, o) {
        e.exports = o("ERMh")
    },
    ERMh: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), window.LandingDonorsDay = {
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
            init: function() {
                if (!cur.donorsDayIsMob) {
                    if (cur.donorsDayNeedShowEdit) return WkView.hide(!1, !0), void LandingDonorsDay.showEditBox();
                    wkcur.legacyBrowser = browser.msie || browser.msie_edge, wkcur._hide.push(LandingDonorsDay.onDestroy), wkcur._show.push(LandingDonorsDay.restore)
                }
                this.restore()
            },
            restore: function() {
                cur.donorsDayIsMob || (addClass(geByClass1("landing_wk_wrap", wkcur.wkContent), "landing_wk_wrap_donors_day"), setStyle(wkcur.wkCont, "padding-top", "70px"), setStyle(wkcur.wkContent, "width", "800px"), setStyle(wkcur.wkBox, {
                    borderRadius: "3px"
                }), hide(wkcur.wkLeft), this.renderBloodLines())
            },
            onDestroy: function() {
                clearTimeout(wkcur.timer)
            },
            renderBloodLines: function() {
                var e = this;
                clearTimeout(wkcur.timer);
                for (var n = 0; n < this.BLOOD_LINES.length; n++) {
                    var o = this.BLOOD_LINES[n];
                    this.renderBloodLine(o), wkcur.legacyBrowser && !o.memAvaCircle && 2 !== n && (wkcur.animLine = n, this.animateIcon(!0))
                }
                if (wkcur.legacyBrowser) return wkcur.animLine = -1, void this.animateIcon(!0);
                wkcur.timer = setTimeout(function() {
                    clearTimeout(wkcur.timer), e.startAnimation()
                }, 1e3)
            },
            renderBloodLine: function(e, n) {
                var o = this,
                    t = e.svg,
                    r = parseInt(e.svg.match(/width="(\d+)"/)[1]),
                    a = parseInt(e.svg.match(/height="(\d+)"/)[1]),
                    i = {
                        top: e.top,
                        width: r,
                        height: a
                    };
                if (e.addStyle && (i = extend(i, e.addStyle)), e.hasOwnProperty("right") && (i.right = e.right, e.noOffsetCorrect || (t = t.replace("<svg", '<svg style="right: -2px"'))), e.hasOwnProperty("left") && (i.left = e.left, e.noOffsetCorrect || (t = t.replace("<svg", '<svg style="left: -2px"'))), e.noOffsetCorrect && (t = t.replace("<svg", '<svg style="left: 0"')), n || wkcur.legacyBrowser || (t = t.replace("EE5D4A", "DBE0E8")), n) {
                    var s = this.getAnimationDuration(e.length);
                    e.memAvaCircle && (s *= .8);
                    var d = '<animate\n          attributeType="CSS"\n          attributeName="stroke-dashoffset"\n          dur="' + s + 'ms"\n          from="' + e.length + '"\n          to="0"\n          fill="freeze"\n        />';
                    e.memAvaCircle && (d += '<animateTransform\n            xmlns="http://www.w3.org/2000/svg"\n            attributeName="transform"\n            attributeType="XML"\n            type="rotate"\n            dur="' + 1.5 * s + 'ms"\n            from="90 77 77"\n            to="-180 77 77"\n            fill="freeze"\n          />'), t = (t = (t = t.replace("<path", '<path stroke-dasharray="' + e.length + " " + e.length + '" stroke-dashoffset="' + e.length + '" id="donors_day_anim_path' + wkcur.animLine + '"')).replace("<circle", '<circle stroke-dasharray="' + e.length + " " + e.length + '" stroke-dashoffset="' + e.length + '" id="donors_day_anim_path' + wkcur.animLine + '"')).replace("/></svg>", ">" + d + "</path></svg>"), 3 === wkcur.animLine && (s *= .8), wkcur.timer = setTimeout(function() {
                        o.nextAnimation()
                    }, s)
                }
                var l = ce("div", {
                    className: "landing_donors_day_blood_line" + (e.lastLine ? " landing_donors_day_big_button_blood_line" : ""),
                    innerHTML: t
                }, i);
                e.lastLine ? geByClass1("landing_donors_day_big_button_wrap").appendChild(l) : ge("landing_donors_day_blood_lines").appendChild(l)
            },
            getAnimationDuration: function(e) {
                return 13 * e
            },
            startAnimation: function() {
                wkcur.animLine = -1, this.animateIcon();
                for (var e = LandingDonorsDay.BLOOD_LINES, n = 0, o = 0; o < e.length; o++) n += e[o].length;
                var t = ge("landing_donors_day_blood_packet_dead");
                setStyle(t, {
                    transition: "height " + LandingDonorsDay.getAnimationDuration(n) + "ms linear"
                }), setTimeout(function() {
                    setStyle(t, "height", 174 * .6)
                })
            },
            nextAnimation: function(e) {
                if (!e && -1 !== [1, 4].indexOf(wkcur.animLine)) return this.animateIcon();
                wkcur.animLine++, this.animateLine()
            },
            animateLine: function() {
                var e = this.BLOOD_LINES[wkcur.animLine];
                e && this.renderBloodLine(e, !0)
            },
            animateIcon: function(e) {
                var n = this,
                    o = "landing_donors_day_member_blood_type_active_wrap",
                    t = 48,
                    r = "bottom";
                2 === wkcur.animLine ? (o = "landing_donors_day_member_ava_blood_line_active_wrap", t = 150, r = "top") : 1 === wkcur.animLine ? o = "landing_donors_day_member_blood_group_active_wrap" : -1 === wkcur.animLine && (o = "landing_donors_day_blood_line_start_active_wrap", t = 12);
                var a = geByClass1(o),
                    i = this.getAnimationDuration(1.5 * t),
                    s = {
                        transition: r + " " + i + "ms linear"
                    };
                e && delete s.transition, s[r] = -1 === wkcur.animLine ? 0 : "-2px", 2 === wkcur.animLine && (i *= .93), setStyle(a, s), wkcur.timer = setTimeout(function() {
                    n.nextAnimation(!0)
                }, -1 === wkcur.animLine ? 0 : i)
            },
            showEditBox: function() {
                showBox("landings.php", {
                    act: "donors_day_edit_box"
                })
            },
            editBoxInit: function(e) {
                curBox().setOptions({
                    width: 450,
                    onClean: function() {
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
                }), (new vkImage).src = "/images/landings/donors_day/snippet_bg.png"
            },
            saveData: function(e) {
                if (!isButtonLocked(e)) {
                    var n = {
                        act: "donors_day_edit",
                        save_hash: cur.donorsDayEditHash,
                        group: cur.donorsDayIsMob ? ge("donors_day_edit_group").value : cur.bloodGroupDD.val(),
                        type: cur.donorsDayIsMob ? ge("donors_day_edit_type").value : radioval("donors_day_blood_type"),
                        on_18years: hasClass("donors_day_18years", "on") ? 1 : 0,
                        on_ready_to_give: hasClass("donors_day_ready_to_give", "on") ? 1 : 0,
                        api_view: cur.donorsDayApiViewHash
                    };
                    lockButton(e), LandingDonorsDay.renderSnippet(n.group, n.type, function(o) {
                        if (!o) return unlockButton(e), topError(getLang("global_error_occured"), 3);
                        n.media = o, ajax.post("landings.php", extend(n, o), {
                            onDone: function(e) {
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
            showUserInfo: function(e, n) {
                browser.mobile || (cancelEvent(n), WkView.hide(!0, !0), showWiki({
                    w: "donors_day" + (e || vk.id),
                    from_snippet: 1
                }))
            },
            showMobEdit: function() {
                cur.donorsDayEditScroll = scrollGetY(), hide("donors_day_main_screen"), show("donors_day_edit_screen")
            },
            hideMobEdit: function() {
                hide("donors_day_edit_screen"), show("donors_day_main_screen"), scrollToY(cur.donorsDayEditScroll || 0)
            },
            showMore: function(e) {
                removeClass(geByClass1("donors_day_users_chunk_hidden", e.parentNode), "donors_day_users_chunk_hidden"), geByClass1("donors_day_users_chunk_hidden", e.parentNode) || re(e)
            },
            renderSnippet: function(e, n, o) {
                var t = this,
                    r = new vkImage;
                r.onload = function() {
                    var a = ce("canvas", {
                        width: 2040,
                        height: 912
                    }, {});
                    ge("donors_day_canvas_helper").appendChild(a);
                    var i = a.getContext("2d");
                    i.direction = "ltr", i.drawImage(r, 0, 0, 2040, 912), i.textBaseline = "top", i.imageSmoothingEnabled = !0, i.font = "normal 120px Open Sans", i.textAlign = "left", i.fillStyle = "#fff";
                    var s = unclean(cur.donorsDayUserName);
                    s.length > 27 && (s = cur.donorsDayUserName.substr(0, 27) + "..");
                    var d = i.measureText(s).width;
                    i.fillText(s, 1020 - d / 2, 300), i.font = "normal 80px Open Sans", i.textAlign = "left", i.fillStyle = "rgba(255,255,255,0.8)";
                    var l = unclean(cur.lang.landings_donors_day_snippet_caption_line1.replace("%s", e)),
                        _ = i.measureText(l).width;
                    i.fillText(l, 1020 - _ / 2, 492);
                    var c = 1 == intval(n) ? cur.lang.landings_donors_day_snippet_caption_line2_plus : cur.lang.landings_donors_day_snippet_caption_line2_minus;
                    c = unclean(c);
                    var u = i.measureText(c).width;
                    i.fillText(c, 1020 - u / 2, 600);
                    var g = a.toDataURL("image/png", .99);
                    g = g.substr(g.indexOf("base64,", 0) + 7), t.uploadSnippetPhoto(g, o)
                }, r.src = "/images/landings/donors_day/snippet_bg.png"
            },
            uploadSnippetPhoto: function uploadSnippetPhoto(base64, callback) {
                var XHR = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
                    xhr = new XHR;
                xhr.open("POST", cur.donorsDayUploadServer, !0), xhr.onload = function() {
                    var obj = void 0,
                        res = xhr.responseText;
                    try {
                        obj = eval("(" + res + ")")
                    } catch (e) {
                        obj = q2ajx(res)
                    }
                    callback(obj)
                };
                var form = new FormData;
                form.append("Photo_base64", base64), xhr.send(form)
            },
            share: function(e) {
                isButtonLocked(e) || ajax.post("landings.php", {
                    act: "donors_day_share",
                    hash: cur.donorsDayShareHash,
                    api_view: cur.donorsDayApiViewHash
                }, {
                    onDone: function() {
                        addClass(geByClass1("landing_donors_day_big_button_wrap"), "shared"), show(geByClass1("landing_donors_day_share_result"))
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            },
            click18YearsCheckbox: function(e) {
                var n = ge("donors_day_ready_to_give");
                toggleClass(n, "disabled", !hasClass(e, "on")), toggleClass(n, "on", hasClass(e, "on"))
            }
        };
        try {
            stManager.done("landing_donors_day.js")
        } catch (e) {}
    }
});