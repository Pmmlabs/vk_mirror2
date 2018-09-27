var Index = {
    initNew: function() {
        each(geByClass("big_text", "index_rcolumn"), function(e, t) {
            placeholderInit(t), gpeByClass("ij_form", t, ge("index_rcolumn")) && addEvent(t, "keydown", function(e) {
                (10 == e.keyCode || 13 == e.keyCode) && Index.submitJoinStart()
            })
        }), Index.initRegForm(), setTimeout(elfocus.pbind("index_email"), 0);
        var e = ge("index_login_form"),
            t = ge("index_email"),
            n = ge("index_pass");
        e.onsubmit = function() {
            return window.submitQuickLoginForm ? trim(t.value) ? trim(n.value) ? (submitQuickLoginForm(t.value, n.value, {
                prg: "index_login_button",
                params: {
                    expire_input: val("index_expire_input")
                }
            }), !1) : (notaBene(n), !1) : (notaBene(t), !1) : !0
        }, window.loginByCredential && (t.onclick = loginByCredential, n.onclick = loginByCredential), window.onReLoginDone = function(e) {
            location.href = e
        }, window.onReLoginFailed = function(e) {
            -1 === e && (location.href = location.href.replace(/^http:/, "https:"))
        }
    },
    initRegForm: function() {
        cur.uiBday = new Dropdown(ge("ij_bday"), Index.generateDays(cur.options.byear, cur.options.bmonth), {
            big_text: !0,
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: cur.options.bday
        }), cur.uiBmonth = new Dropdown(ge("ij_bmonth"), cur.options.bmonths, {
            big_text: !0,
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: cur.options.bmonth,
            onChange: function(e) {
                Index.updateDays(cur.uiByear.val(), e)
            }
        }), cur.uiByear = new Dropdown(ge("ij_byear"), cur.options.byears, {
            big_text: !0,
            multiselect: !1,
            zeroPlaceholder: !0,
            selectedItems: cur.options.byear,
            onChange: function(e) {
                Index.updateDays(e, cur.uiBmonth.val())
            }
        }), window.radioBtns.ij_sex = {
            els: [].slice.apply(geByClass("radiobtn", ge("ij_sex_row"))),
            val: 0
        }, cur.destroy.push(function(e) {
            e.uiBday && e.uiBday.destroy(), e.uiBmonth && e.uiBmonth.destroy(), e.uiByear && e.uiByear.destroy()
        }), stManager.add(["tooltips.js", "tooltips.css"])
    },
    submitJoinStart: function() {
        var e = ge("ij_submit");
        if (!buttonLocked(e)) {
            var t = {
                fname: trim(val("ij_first_name")),
                lname: trim(val("ij_last_name")),
                bday: cur.uiBday.val(),
                bmonth: cur.uiBmonth.val(),
                byear: cur.uiByear.val(),
                frm: 1,
                ah: nav.objLoc.ah
            };
            isVisible("ij_sex_row") && (t.sex = intval(radioval("ij_sex"))), window.tooltips && tooltips.hideAll(), val("ij_msg", ""), ajax.post("join.php?act=start", t, {
                onDone: function(e, t) {
                    var n = ge("ij_" + e);
                    "sex_row" == e && show(n), n ? Index.showRegTT(n, t) : showMsg("ij_msg", t, "msg", !0)
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }
    },
    showRegTT: function(e, t) {
        var n, o = "INPUT" === e.tagName,
            i = e;
        !o && (n = geByClass1("selector_table", e)) ? i = n : !o && (n = geByClass1("radiobtn", e)) && (i = n);
        var a = function() {
            showTooltip(i, {
                text: t,
                dir: "right",
                width: 320,
                typeClass: "ij_tt",
                shift: [335, -getSize(i)[1] / 2],
                hasover: 1,
                nohideover: 1,
                onCreate: function() {
                    removeEvent(i, "mouseout"), o && (i.onblur = function() {
                        i.tt && i.tt.hide && i.tt.hide()
                    })
                }
            })
        };
        o ? (e.onfocus = a, notaBene(e)) : (a(), each(geByClass("selector_table", e), function(e, t) {
            notaBene(t)
        }))
    },
    showLoginBox: function(e) {
        return showBox("al_login.php", {
            act: "auth_box",
            ul: e
        }, {
            params: {
                dark: !0,
                hideButtons: !0,
                bodyStyle: "padding: 44px 25px;"
            }
        }), !1
    },
    deleteRecentAccount: function(e, t, n, o) {
        return window.tooltips && tooltips.hideAll(), ajax.post("/al_login.php?act=delete_recent_account", {
            mid: t,
            hash: n
        }, {
            onDone: function() {
                re(gpeByClass("_row", e))
            }
        }), cancelEvent(o)
    },
    getLastDay: function(e, t) {
        return 2 == t ? e % 4 == 0 ? 29 : 28 : t > 0 && (8 > t && t % 2 == 0 || t > 7 && t % 2 == 1) ? 30 : 31
    },
    generateDays: function(e, t) {
        for (var n = [
                [0, getLang("index_sel_bday")]
            ], o = Index.getLastDay(e, t), i = 1; o >= i; ++i) n.push([i, i + ""]);
        return n
    },
    updateDays: function(e, t, n) {
        n || (n = cur.uiBday), n.val() > Index.getLastDay(e, t) && n.clear(), n.setData(Index.generateDays(e, t).slice(intval(cur.options.bday) ? 1 : 0))
    },
    fbCheck: function(e, t) {
        if (cur.fbContinueWithSign) window.fbAsyncInit = function() {
            FB.init({
                appId: e,
                xfbml: !0,
                version: "v2.7"
            });
            var n = "_box" == t,
                o = ge("index_fbcontinuewithsign" + (t || ""));
            setStyle(o, {
                opacity: 0,
                height: 0,
                overflow: "hidden"
            }), show(o), FB.Event.subscribe("xfbml.render", function() {
                animate(o, {
                    height: n ? 78 : 54,
                    opacity: 1
                }, 200)
            })
        }, window.FB && window.FB.init ? window.fbAsyncInit() : ! function(e, t, n) {
            var o, i = e.getElementsByTagName(t)[0];
            e.getElementById(n) || (o = e.createElement(t), o.id = n, o.src = "//connect.facebook.net/" + cur.fbLocale + "/sdk.js", i.parentNode.insertBefore(o, i))
        }(document, "script", "facebook-jssdk");
        else {
            stManager.add(["fbsign.js"], function() {
                Fbsign.init()
            });
            var n = ge("index_fbsign" + (t || ""));
            setStyle(n, {
                opacity: 1
            }), show(n)
        }
    },
    fbJoin: function(e) {
        cur.fbContext = e, setCookie("remixfbstate", cur.fbState, 30);
        var t = location.protocol + "//" + location.host + "/join?act=fb_sign",
            n = "https://graph.facebook.com/v2.9/oauth/authorize?client_id=" + cur.fbApp + "&redirect_uri=" + encodeURIComponent(t) + "&scope=email,user_birthday&display=popup&state=" + cur.fbState,
            o = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
            i = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
            a = "undefined" != typeof window.outerWidth ? window.outerWidth : document.body.clientWidth,
            r = "undefined" != typeof window.outerHeight ? window.outerHeight : document.body.clientHeight - 22,
            s = 640,
            c = 340,
            d = parseInt(o + (a - s) / 2, 10),
            u = parseInt(i + (r - c) / 2.5, 10);
        window.open(n, "fb_sign", "width=" + s + ",height=" + c + ",left=" + d + ",top=" + u);
        return !1
    },
    fbFinish: function(e) {
        e.error ? setTimeout(showFastBox(getLang("global_error"), e.error).hide, 2e3) : e.date && (lockButton(ge("index_fb" + (cur.fbContext || ""))), nav.go("/join?act=fb_start"))
    }
};
try {
    stManager.done("index.js")
} catch (e) {}