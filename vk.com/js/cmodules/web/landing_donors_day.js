! function(e) {
    function o(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            exports: {},
            id: t,
            loaded: !1
        };
        return e[t].call(r.exports, r, r.exports, o), r.loaded = !0, r.exports
    }
    var n = {};
    return o.m = e, o.c = n, o.p = "", o(0)
}({
    0: function(e, o, n) {
        e.exports = n(14)
    },
    14: function(module, exports) {
        "use strict";
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
                for (var o = 0; o < this.BLOOD_LINES.length; o++) {
                    var n = this.BLOOD_LINES[o];
                    this.renderBloodLine(n), wkcur.legacyBrowser && !n.memAvaCircle && 2 !== o && (wkcur.animLine = o, this.animateIcon(!0))
                }
                return wkcur.legacyBrowser ? (wkcur.animLine = -1, void this.animateIcon(!0)) : void(wkcur.timer = setTimeout(function() {
                    clearTimeout(wkcur.timer), e.startAnimation()
                }, 1e3))
            },
            renderBloodLine: function(e, o) {
                var n = this,
                    t = e.svg,
                    r = parseInt(e.svg.match(/width="(\d+)"/)[1]),
                    a = parseInt(e.svg.match(/height="(\d+)"/)[1]),
                    i = {
                        top: e.top,
                        width: r,
                        height: a
                    };
                if (e.addStyle && (i = extend(i, e.addStyle)), e.hasOwnProperty("right") && (i.right = e.right, e.noOffsetCorrect || (t = t.replace("<svg", '<svg style="right: -2px"'))), e.hasOwnProperty("left") && (i.left = e.left, e.noOffsetCorrect || (t = t.replace("<svg", '<svg style="left: -2px"'))), e.noOffsetCorrect && (t = t.replace("<svg", '<svg style="left: 0"')), o || wkcur.legacyBrowser || (t = t.replace("EE5D4A", "DBE0E8")), o) {
                    var s = this.getAnimationDuration(e.length);
                    e.memAvaCircle && (s *= .8);
                    var d = '<animate\n          attributeType="CSS"\n          attributeName="stroke-dashoffset"\n          dur="' + s + 'ms"\n          from="' + e.length + '"\n          to="0"\n          fill="freeze"\n        />';
                    e.memAvaCircle && (d += '<animateTransform\n            xmlns="http://www.w3.org/2000/svg"\n            attributeName="transform"\n            attributeType="XML"\n            type="rotate"\n            dur="' + 1.5 * s + 'ms"\n            from="90 77 77"\n            to="-180 77 77"\n            fill="freeze"\n          />'), t = t.replace("<path", '<path stroke-dasharray="' + e.length + " " + e.length + '" stroke-dashoffset="' + e.length + '" id="donors_day_anim_path' + wkcur.animLine + '"'), t = t.replace("<circle", '<circle stroke-dasharray="' + e.length + " " + e.length + '" stroke-dashoffset="' + e.length + '" id="donors_day_anim_path' + wkcur.animLine + '"'), t = t.replace("/></svg>", ">" + d + "</path></svg>"), 3 === wkcur.animLine && (s *= .8), wkcur.timer = setTimeout(function() {
                        n.nextAnimation()
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
                for (var e = LandingDonorsDay.BLOOD_LINES, o = 0, n = 0; n < e.length; n++) o += e[n].length;
                var t = ge("landing_donors_day_blood_packet_dead");
                setStyle(t, {
                    transition: "height " + LandingDonorsDay.getAnimationDuration(o) + "ms linear"
                }), setTimeout(function() {
                    setStyle(t, "height", 174 * .6)
                })
            },
            nextAnimation: function(e) {
                return e || -1 === [1, 4].indexOf(wkcur.animLine) ? (wkcur.animLine++, void this.animateLine()) : this.animateIcon()
            },
            animateLine: function() {
                var e = this.BLOOD_LINES[wkcur.animLine];
                e && this.renderBloodLine(e, !0)
            },
            animateIcon: function(e) {
                var o = this,
                    n = "landing_donors_day_member_blood_type_active_wrap",
                    t = 48,
                    r = "bottom";
                2 === wkcur.animLine ? (n = "landing_donors_day_member_ava_blood_line_active_wrap", t = 150, r = "top") : 1 === wkcur.animLine ? n = "landing_donors_day_member_blood_group_active_wrap" : -1 === wkcur.animLine && (n = "landing_donors_day_blood_line_start_active_wrap", t = 12);
                var a = geByClass1(n),
                    i = this.getAnimationDuration(1.5 * t),
                    s = {
                        transition: r + " " + i + "ms linear"
                    };
                e && delete s.transition, s[r] = -1 === wkcur.animLine ? 0 : "-2px", 2 === wkcur.animLine && (i *= .93), setStyle(a, s), wkcur.timer = setTimeout(function() {
                    o.nextAnimation(!0)
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
                });
                var o = new vkImage;
                o.src = "/images/landings/donors_day/snippet_bg.png"
            },
            saveData: function(e) {
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
                    lockButton(e), LandingDonorsDay.renderSnippet(o.group, o.type, function(n) {
                        return n ? (o.media = n, void ajax.post("landings.php", extend(o, n), {
                            onDone: function(e) {
                                cur.donorsDayIsMob ? location.reload() : (curBox().hide(), window.wkcur && "donors_day" === wkcur.wkRaw && wkcur.shown && WkView.hide(!1, !0), showWiki({
                                    w: "donors_day"
                                }))
                            },
                            showProgress: lockButton.pbind(e),
                            hideProgress: unlockButton.pbind(e)
                        })) : (unlockButton(e), topError(getLang("global_error_occured"), 3))
                    })
                }
            },
            showUserInfo: function(e, o) {
                browser.mobile || (cancelEvent(o), WkView.hide(!0, !0), showWiki({
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
            renderSnippet: function(e, o, n) {
                var t = this,
                    r = 4,
                    a = 510 * r,
                    i = 228 * r,
                    s = new vkImage;
                s.onload = function() {
                    var d = ce("canvas", {
                        width: a,
                        height: i
                    }, {});
                    ge("donors_day_canvas_helper").appendChild(d);
                    var l = d.getContext("2d");
                    l.direction = "ltr", l.drawImage(s, 0, 0, a, i), l.textBaseline = "top", l.imageSmoothingEnabled = !0, l.font = "normal " + 30 * r + "px Open Sans", l.textAlign = "left", l.fillStyle = "#fff";
                    var c = unclean(cur.donorsDayUserName);
                    c.length > 27 && (c = cur.donorsDayUserName.substr(0, 27) + "..");
                    var g = l.measureText(c).width;
                    l.fillText(c, a / 2 - g / 2, 75 * r), l.font = "normal " + 20 * r + "px Open Sans", l.textAlign = "left", l.fillStyle = "rgba(255,255,255,0.8)";
                    var h = unclean(cur.lang.landings_donors_day_snippet_caption_line1.replace("%s", e)),
                        _ = l.measureText(h).width;
                    l.fillText(h, a / 2 - _ / 2, 123 * r);
                    var u = 1 == intval(o) ? cur.lang.landings_donors_day_snippet_caption_line2_plus : cur.lang.landings_donors_day_snippet_caption_line2_minus;
                    u = unclean(u);
                    var w = l.measureText(u).width;
                    l.fillText(u, a / 2 - w / 2, 150 * r);
                    var p = d.toDataURL("image/png", .99);
                    p = p.substr(p.indexOf("base64,", 0) + 7), t.uploadSnippetPhoto(p, n)
                }, s.src = "/images/landings/donors_day/snippet_bg.png"
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
                var o = ge("donors_day_ready_to_give");
                toggleClass(o, "disabled", !hasClass(e, "on")), toggleClass(o, "on", hasClass(e, "on"))
            }
        };
        try {
            stManager.done("landing_donors_day.js")
        } catch (e) {}
    }
});