function loadFontFace(e, i) {
    function t(e) {
        var i = [];
        return each(e, function(e, t) {
            i.push(e + ":" + t)
        }), i.join(";")
    }

    function r(e, i, t) {
        return Math.abs(e.width - i.offsetWidth) > t || Math.abs(e.height - i.offsetHeight) > t
    }

    function n() {
        return (new Date).getTime() - l.getTime() > i.timeout
    }

    function o() {
        return {
            sansSerif: {
                width: f.offsetWidth,
                height: f.offsetHeight
            },
            serif: {
                width: p.offsetWidth,
                height: p.offsetHeight
            }
        }
    }

    function s() {
        c || (utilsNode.appendChild(g), c = !0, u = o(), browser.opera && !browser.chrome ? (f.style.fontFamily = '"' + e + '", sans-serif', p.style.fontFamily = '"' + e + '", serif') : (setStyle(f, "font-family", '"' + e + '", sans-serif'), setStyle(p, "font-family", '"' + e + '", serif'))), c && u && (r(u.sansSerif, f, i.tolerance) || r(u.serif, p, i.tolerance)) ? (re(g), i.success()) : n() ? (re(g), i.error()) : !c && "requestAnimationFrame" in window ? window.requestAnimationFrame(s) : window.setTimeout(s, i.delay)
    }

    function a() {
        var e = "AxmTYklsjo190QW" + i.glyphs;
        l = new Date, g = ce("div"), f = ce("div", {
            innerHTML: e
        }), p = ce("div", {
            innerHTML: e
        }), f.setAttribute("style", t(extend({
            "font-family": "sans-serif"
        }, w))), p.setAttribute("style", t(extend({
            "font-family": "serif"
        }, w))), g.appendChild(f), g.appendChild(p), s()
    }

    function d(t) {
        each(document.fonts, function(r) {
            r.family.toLowerCase() === e.toLowerCase() && (m[r.weight] || r.weight) === "" + i.weight && r.style === i.style && r.load().then(function() {
                i.success(), clearTimeout(t)
            })
        })
    }
    var h, l, u, c, g, p, f, m = {
            normal: "400",
            bold: "700"
        },
        _ = {
            tolerance: 2,
            delay: 100,
            glyphs: "",
            success: function() {},
            error: function() {},
            timeout: 5e3,
            weight: "400",
            style: "normal"
        },
        w = {
            display: "block",
            "font-size": "48px",
            "line-height": "normal",
            "font-variant": "normal",
            "white-space": "nowrap",
            position: "absolute",
            visibility: "hidden",
            top: "-9999px",
            left: "-9999px",
            width: "auto",
            height: "auto",
            margin: "0",
            padding: "0"
        };
    for (var v in _) i.hasOwnProperty(v) || (i[v] = _[v]);
    w["font-weight"] = i.weight, w["font-style"] = i.style, !i.glyphs && "fonts" in document ? (i.timeout && (h = setTimeout(function() {
        i.error()
    }, i.timeout)), d(h)) : a()
}
var Print = {
    init: function(e, i) {
        if (cur.domain = this.defaultDomain, cur.qrcode = null, cur.drawingSupported = !!window.HTMLCanvasElement, cur.frames = [], cur.downloading = 0, (window.wkcur ? wkcur._hide : cur.destroy).push(this.destroy), window.wkcur && (wkcur.editor = {
                changed: !1
            }, wkcur.edit = !0, wkcur.lang = {
                pages_close_title: getLang("print_close_title"),
                pages_close_text: getLang("print_close_text")
            }), !hasClass(ge("print_dd"), "disabled")) {
            WideDropdown.deinit("print_dd");
            var t = WideDropdown.init("print_dd", {
                defaultItems: e,
                url: "al_print.php",
                params: {
                    act: "search"
                },
                noResult: getLang("print_group_not_found"),
                introText: getLang("print_group_placeholder"),
                onChange: function(e) {
                    1 == e ? this.groupSelected(this.getSelected(t)) : this.groupRemoved()
                }.bind(this)
            });
            t && null != i && (WideDropdown.select("print_dd", !1, i), cur.domainSelected = !0)
        }
        addClass(ge("print_dd"), "disabled"), ge("print_dd_input").setAttribute("disabled", "disabled");
        var r = (ge("print_table_wrap_rel"), ge("print_disabling_overlay")),
            n = ge("print_loading_overlay"),
            o = ge("print_empty_overlay"),
            s = ge("print_table"),
            a = (ge("print_content"), s.offsetWidth),
            d = s.offsetHeight;
        cur.drawingSupported ? this.preloadFonts(function() {
            debugLog("print.js: fonts successfully preloaded"), cur.fontsPreloaded = !0, removeClass(ge("print_dd"), "disabled"), ge("print_dd_input").removeAttribute("disabled"), cur.domain && this.drawPreviews(), cur.domainSelected && this.hideOverlay(r), addClass(n, "nospinner"), setStyle(n, "opacity", 1), animate(n, {
                opacity: 0
            }, this.anim.hideLoading, function() {
                re(n)
            })
        }.bind(this), function() {
            cur.drawingSupported = !1, this.initFallback(), debugLog("print.js was failed to preload fonts")
        }.bind(this)) : this.initFallback(), cur.vkmeRadioBtn = new Radiobutton(ge("print_domain_vkcom"), {
            width: "90",
            label: "vk.com",
            checked: cur.vk_domain.indexOf(".com") > -1,
            onSelect: function(e) {
                this.domainChanged(e)
            }.bind(this)
        }), cur.vkcomRadioBtn = new Radiobutton(ge("print_domain_vkme"), {
            width: "65",
            label: "vk.me",
            checked: cur.vk_domain.indexOf(".me") > -1,
            onSelect: function(e) {
                this.domainChanged(e)
            }.bind(this)
        }), setStyle(r, "opacity", this.disablingOverlayOpacity), each([n, r, o], function(e, i) {
            setStyle(i, {
                width: a + "px",
                height: d + "px"
            })
        }), addClass(s, "visible")
    },
    initFallback: function() {
        addClass(ge("print_content"), "print_old"), removeClass(ge("print_dd"), "disabled"), ge("print_dd_input").removeAttribute("disabled")
    },
    destroy: function() {
        cur.ignoreProgress = !0, each(cur.frames || [], function(e, i) {
            re(i)
        });
        try {
            cur.urlsRequest && cur.urlsRequest.abort(), cur.progressRequest && cur.progressRequest.abort()
        } catch (e) {}
    },
    groupSelected: function(e) {
        var i = intval(e[0]),
            t = 0 > i,
            r = e[4].substring(1),
            n = ge("print_empty"),
            o = ge("print_empty_abs"),
            s = ge("print_dl_wrap"),
            a = ge("print_disabling_overlay"),
            d = ge("print_empty_overlay");
        if (r.match(/^(club|event|public|id)[\d]+$/)) {
            this._hideVis(n);
            var h = t ? e[4] + "?act=edit" : "/settings",
                l = getLang("print_" + (t ? "group" : "user") + "_no_address").replace("%s", '<a href="' + e[4] + '">' + e[1] + "</a>"),
                u = getLang("print_" + (t ? "group" : "user") + "_change_address").replace("{link}", '<a href="' + h + '" id="print_empty_for_admins_link">').replace("{/link}", "</a>"),
                c = ge("print_empty_text"),
                g = ge("print_empty_for_admins");
            ge("print_empty_for_admins_link");
            c.innerHTML = l, t && inArray(Math.abs(i), cur.admined) || !t && vk.id == i ? (show(g), g.innerHTML = u) : hide(g), this._hideVis(d), show(d);
            var p = (d.offsetHeight, n.offsetHeight);
            return setStyle(o, {
                height: p + "px",
                "margin-top": "-" + Math.round(p / 2) + "px"
            }), this._showVis(n), this._showVis(d), void this.showOverlay(d)
        }
        isVisible(s) || slideDown(s, this.anim.toggle), cur.domain = r, cur.fontsPreloaded ? (this.drawPreviews(), this.hideOverlay(a)) : cur.drawingSupported || this.hideOverlay(a), cur.urls[r] || (cur.urlsRequest = ajax.post("/al_print.php", {
            act: "get_urls",
            id: i,
            typo: cur.typo ? 1 : 0
        }, {
            onDone: function(e) {
                e.urls && (cur.urls[cur.domain] = e.urls), cur.urlsRequest = null
            }
        }))
    },
    groupRemoved: function() {
        var e = ge("print_msg_wrap"),
            i = ge("print_dl_wrap"),
            t = (ge("print_disabling_overlay"), ge("print_empty_overlay"));
        isVisible(e) && slideUp(e, this.anim.info), isVisible(i) && slideUp(i, this.anim.toggle), isVisible(t) && this.hideOverlay(t), this.showOverlay(ge("print_disabling_overlay"), this.disablingOverlayOpacity), cur.urls[cur.domain] && delete cur.urls[cur.domain], cur.domain = this.defaultDomain, cur.fontsPreloaded && this.drawPreviews(), 1 == cur.downloading && (cur.ignoreProgress = !0, this.hideProgress(), cur.frames.length && re(cur.frames.pop()));
        try {
            cur.urlsRequest && cur.urlsRequest.abort(), cur.progressRequest && cur.progressRequest.abort()
        } catch (r) {}
        elfocus("print_dd_input")
    },
    getSelected: function(e) {
        var i = e.selected;
        for (var t in i) return i[t]
    },
    domainChanged: function(e) {
        0 == e ? cur.vk_domain = "vk.com" : cur.vk_domain = "vk.me";
        var i = ge("print_disabling_overlay");
        cur.fontsPreloaded ? (this.drawPreviews(), this.hideOverlay(i)) : cur.drawingSupported || this.hideOverlay(i)
    },
    download: function(e, i) {
        if (!cur.urls[cur.domain]) return !1;
        var t = cur.vk_domain.indexOf(".me") > -1 ? "me" : "com",
            r = cur.urls[cur.domain][t][e][i];
        if (r += "&vk_domain=" + t, !r) return !1;
        var n = ce("iframe", {
            src: r
        });
        return utilsNode.appendChild(n), cur.frames.push(n), !1
    },
    downloadAll: function() {
        var e = cur.vk_domain.indexOf(".me") > -1 ? "me" : "com";
        if (!cur.urls[cur.domain] || !cur.urls[cur.domain][e].zip) return !1;
        var i = cur.urls[cur.domain][e].zip;
        cur.ignoreProgress = !1, cur.downloading = 1, this.showProgress(), this.getProgress();
        var t = ce("iframe", {
            src: i
        });
        return utilsNode.appendChild(t), cur.frames.push(t), !1
    },
    showProgress: function() {
        var e = ge("print_dl_button_wrap"),
            i = ge("print_dl_progress_abs");
        ge("print_dl_done_abs");
        setStyle(i, "visibility", "visible"), animate(i, {
            opacity: 1
        }, this.anim.progress), animate(e, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(e, {
                visibility: "hidden"
            })
        }), window.wkcur && (window.wkcur.editor.changed = !0)
    },
    showProgressDone: function() {
        var e = (ge("print_dl_button_wrap"), ge("print_dl_progress_abs")),
            i = ge("print_dl_done_abs");
        setStyle(i, "visibility", "visible"), animate(i, {
            opacity: 1
        }, this.anim.progress), animate(e, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(e, {
                visibility: "hidden"
            })
        }), window.wkcur && (window.wkcur.editor.changed = !1), clearTimeout(cur.hideProgressTimeout), cur.hideProgressTimeout = setTimeout(function() {
            this.hideProgress()
        }.bind(this), 3e3)
    },
    hideProgress: function() {
        clearTimeout(cur.hideProgressTimeout);
        var e = ge("print_dl_button_wrap"),
            i = ge("print_dl_progress_abs"),
            t = ge("print_dl_done_abs");
        setStyle(e, "visibility", "visible"), animate(e, {
            opacity: 1
        }, this.anim.progress), animate(t, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(t, {
                visibility: "hidden"
            })
        }), floatval(getStyle(i, "opacity")) > 0 && animate(i, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(i, {
                visibility: "hidden"
            })
        }), setStyle(ge("print_dl_progress_fill"), {
            width: "0px"
        }), window.wkcur && (window.wkcur.editor.changed = !1), cur.downloading = 0
    },
    getProgress: function() {
        if (cur.ignoreProgress) return void this.hideProgress();
        var e = cur.vk_domain.indexOf(".me") > -1 ? "me" : "com",
            i = 750,
            t = (new Date).getTime();
        cur.progressRequest = ajax.plainpost(cur.urls[cur.domain][e].zip_progress, {}, function(e) {
            if (cur.ignoreProgress) return void this.hideProgress();
            e = parseJSON(e);
            var r = (new Date).getTime(),
                n = floatval(e.progress);
            return n >= 100 ? (this.setProgress(n), void setTimeout(function() {
                cur.downloading = 2, this.showProgressDone(), this.setProgress(0)
            }.bind(this), 300)) : (this.setProgress(n), void(r - t >= i ? this.getProgress() : setTimeout(function() {
                this.getProgress()
            }.bind(this), i - (r - t))))
        }.bind(this))
    },
    setProgress: function(e) {
        if (!(0 >= e)) {
            var i = ge("print_dl_progress").offsetWidth,
                t = i / 100 * e;
            animate(ge("print_dl_progress_fill"), {
                width: t,
                overflow: "visible"
            }, this.anim.progress)
        }
    },
    showFormatInfo: function(e, i) {
        var t = getLang("print_" + e + "_hint");
        t = t.replace("{tag}", '<span class="print_tt_normal">').replace("{/tag}", "</span>"), showTooltip(i, {
            content: '<div class="tt_text">' + t + "</div>",
            slide: 15,
            black: 1,
            className: "print_tt" + ("epsp" == e ? " print_wrap" : "")
        })
    },
    showFloodError: function() {
        showFastBox({
            title: getLang("global_error"),
            dark: 1
        }, getLang("print_flood_error")), cur.ignoreProgress = !0
    },
    drawPreviews: function() {
        if (cur.drawingSupported) {
            var e = cur.domain;
            if (e) {
                var i = {
                        1: this.measureTextWidths(e, this.fontSize)
                    },
                    t = {
                        1: this.measureFontHeight(this.fontLine.replace("{size}", this.fontSize + "px"))
                    },
                    r = geByClass1("print_preview_horiz"),
                    n = r.clientWidth - intval(getStyle(r, "padding-left")) - intval(getStyle(r, "padding-right"));
                each(this.types, function(r, o) {
                    var s, a, d = "qr" != r,
                        h = ge("print_canvas_" + r),
                        l = ge("print_canvas_holder_" + r),
                        u = 1;
                    if (h && re(h), h = ce("canvas"), this._hideVis(l), hide(h), l.appendChild(h), d && (extend(l.style, {
                            width: "auto",
                            height: o.height + "px",
                            borderRadius: o.radius + "px",
                            paddingLeft: o.paddingLeft + "px",
                            paddingRight: o.paddingRight + "px"
                        }), "logo" == r && extend(ge("print_preview_logo_sq").style, {
                            width: o.height + "px",
                            height: o.height + "px",
                            marginRight: o.logoMargin + "px",
                            backgroundSize: o.height + "px " + o.height + "px",
                            borderRadius: o.radius + "px"
                        })), h.setAttribute("id", "print_canvas_" + r), h.setAttribute("height", o.height), d) {
                        var c = Math.round(i[u].prefix + i[u].domain);
                        h.setAttribute("width", c);
                        var g = c;
                        switch (r) {
                            case "logo":
                                g += o.height + o.logoMargin + o.paddingLeft + o.paddingRight;
                                break;
                            case "simple_blue":
                            case "simple_white":
                                g += o.paddingLeft + o.paddingRight
                        }
                        if (g > n) {
                            u = n / g;
                            var p = o.height * u;
                            h.setAttribute("width", c * u + "px"), h.setAttribute("height", p + "px"), extend(l.style, {
                                height: p + "px",
                                borderRadius: o.radius * u + "px",
                                paddingLeft: o.paddingLeft * u + "px",
                                paddingRight: o.paddingRight * u + "px"
                            }), "logo" == r && extend(ge("print_preview_logo_sq").style, {
                                width: Math.round(p) + "px",
                                height: Math.round(p) + "px",
                                borderRadius: o.radius * u + "px",
                                marginRight: o.logoMargin * u + "px",
                                backgroundSize: Math.round(p) + "px " + Math.round(p) + "px"
                            }), void 0 === t[u] && (t[u] = this.measureFontHeight(this.fontLine.replace("{size}", this.roundFontSize(this.fontSize * u) + "px")), i[u] = this.measureTextWidths(e, this.roundFontSize(this.fontSize * u)));
                            var f = i[u].prefix + i[u].domain;
                            c * u > f && h.setAttribute("width", f + "px")
                        }
                    } else h.setAttribute("width", o.width);
                    var m = t[u];
                    if (s = h.getContext("2d"), a = {
                            width: h.width,
                            height: h.height
                        }, this.fixCanvas(h), "qr" == r) {
                        var _ = this.calcQrFontSize(e, 124, 18),
                            w = this.measureFontHeight("bold " + _ + 'px "Myriad Pro"');
                        s.font = "bold " + _ + 'px "Myriad Pro"', s.fillStyle = o.textColor, s.textBaseline = "alphabetic", s.textAlign = "center", s.fillText(e, a.width / 2, a.height / 2 + w / 4)
                    } else {
                        var v = this.roundFontSize(this.fontSize * u),
                            y = this.fontLine.replace("{size}", v + "px"),
                            b = this.boldFontLine.replace("{size}", v + "px");
                        s.textBaseline = "alphabetic", s.fillStyle = o.textColor, s.font = y, s.fillText(cur.vk_domain + "/", 0, a.height / 2 + m / 4 + o.yoffset * u), s.font = b, s.fillText(e, i[u].prefix, a.height / 2 + m / 4 + o.yoffset * u)
                    }
                    show(l), this._showVis(l), show(h)
                }.bind(this));
                var o = "http://" + cur.vk_domain + "/" + e;
                cur.qrcode ? (cur.qrcode.clear(), cur.qrcode.makeCode(o)) : cur.qrcode = new QRCode(ge("print_qrcode"), {
                    text: o,
                    width: this.qrCodeSize[0],
                    height: this.qrCodeSize[1],
                    colorDark: this.qrCodeColor,
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H,
                    vkLogo: {
                        sizes: {
                            29: {
                                width: 11,
                                height: 8
                            },
                            33: {
                                width: 13,
                                height: 9
                            },
                            37: {
                                width: 13,
                                height: 10
                            },
                            41: {
                                width: 15,
                                height: 11
                            }
                        }
                    }
                })
            }
        }
    },
    calcQrFontSize: function(e, i, t) {
        if (utilsNode)
            for (var r, n = 4.2, o = t - n, s = ce("canvas"), a = s.getContext("2d"), d = o, h = d + n, l = d, u = 0;;) {
                if (h = d + n, a.font = this.fontLine.replace("{size}", h + "px"), r = a.measureText(e).width, i > r && d == o || Math.abs(r - i) <= 2 || u >= 25) return Math.round(100 * h) / 100 - (u >= 25 ? 1 : 0);
                r > i ? d -= l / 2 : d += l / 2, l /= 2, u++
            }
    },
    measureTextWidths: function(e, i) {
        var t = ce("canvas"),
            r = t.getContext("2d"),
            n = {};
        return r.font = this.fontLine.replace("{size}", i + "px"), n.prefix = r.measureText(cur.vk_domain + "/").width, r.font = this.boldFontLine.replace("{size}", i + "px"), n.domain = r.measureText(e).width, n
    },
    measureFontHeight: function(e) {
        var i = document.createElement("canvas"),
            t = i.getContext("2d");
        t.fillRect(0, 0, i.width, i.height), t.textBaseline = "top", t.fillStyle = "white", t.font = e, t.fillText("gM", 0, 0);
        for (var r = t.getImageData(0, 0, i.width, i.height).data, n = -1, o = -1, s = 0; s < i.height; s++)
            for (var a = 0; a < i.width; a++) {
                var d = 4 * (s * i.width + a); {
                    if (0 !== r[d]) {
                        -1 === n && (n = s);
                        break
                    }
                    if (a === i.width - 1 && -1 !== n) {
                        o = s, s = i.height;
                        break
                    }
                }
            }
        return o - n
    },
    preloadFonts: function(e, i) {
        var t = "",
            r = function() {
                loadFontFace("Myriad Pro", {
                    success: n,
                    error: function() {
                        i && i()
                    },
                    timeout: this.preloadFontsTimeout,
                    glyphs: t
                })
            }.bind(this),
            n = function() {
                loadFontFace("Myriad Pro", {
                    success: function() {
                        browser.safari ? setTimeout(e, 150) : e()
                    },
                    error: function() {
                        i && i()
                    },
                    weight: "700",
                    timeout: this.preloadFontsTimeout,
                    glyphs: t
                })
            }.bind(this);
        r()
    },
    fixCanvas: function(e) {
        if (e && !e._retinaFixed && window.devicePixelRatio > 1) {
            var i = e.getContext("2d"),
                t = e.width,
                r = e.height;
            e.setAttribute("width", t * window.devicePixelRatio), e.setAttribute("height", r * window.devicePixelRatio), setStyle(e, {
                width: t + "px",
                height: r + "px"
            }), i.scale(window.devicePixelRatio, window.devicePixelRatio), e._retinaFixed = !0
        }
    },
    roundFontSize: function(e) {
        return Math.round(10 * e) / 10
    },
    showOverlay: function(e, i) {
        void 0 === i && (i = 1), show(e), animate(e, {
            opacity: i
        }, this.anim.toggle)
    },
    hideOverlay: function(e) {
        animate(e, {
            opacity: 0
        }, this.anim.toggle, function() {
            hide(e)
        })
    },
    _showVis: function(e) {
        setStyle(e, "visibility", "visible")
    },
    _hideVis: function(e) {
        setStyle(e, "visibility", "hidden")
    },
    types: {
        qr: {
            height: 32,
            width: 160,
            textColor: "#ffffff"
        },
        logo: {
            height: 40,
            textColor: "#ffffff",
            logoMargin: 4,
            paddingLeft: 10,
            paddingRight: 10,
            radius: 6,
            yoffset: 1
        },
        simple_blue: {
            paddingLeft: 10,
            paddingRight: 10,
            height: 32,
            textColor: "#ffffff",
            radius: 6,
            yoffset: 1
        },
        simple_white: {
            paddingLeft: 10,
            paddingRight: 10,
            height: 30,
            textColor: "#4d75a3",
            radius: 6,
            yoffset: 1
        }
    },
    formats: ["png", "eps", "epsp"],
    defaultDomain: "team",
    anim: {
        toggle: 200,
        info: 150,
        progress: 200,
        hideLoading: 300
    },
    disablingOverlayOpacity: .55,
    preloadFontsTimeout: 15e3,
    fontSize: 21,
    fontLine: '{size} "Myriad Pro"',
    boldFontLine: 'bold {size} "Myriad Pro"',
    prefix: "vk.com/",
    qrCodeColor: "#4b75a3",
    qrCodeSize: [124, 124]
};
try {
    stManager.done("print.js")
} catch (e) {}