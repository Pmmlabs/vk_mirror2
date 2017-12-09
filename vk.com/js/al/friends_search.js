var FriendsSearch = {
    submit: function() {
        var e = ge("fsearch_email").value,
            t = ge("fsearch_pass").value;
        return /^.{1,40}@.{1,40}\..{1,4}$/.test(e) ? t ? (cur.inviteBox.showProgress(), ge("fsearch_inviter_form").submit(), void hide("fsearch_error")) : notaBene("fsearch_pass") : notaBene("fsearch_email")
    },
    checkResult: function(e, t, o) {
        if (cur.inviteBox) {
            cur.inviteBox.hideProgress();
            try {
                var r = ge("fsearch_inviter").contentWindow.location;
                r.href, r.hash.replace("#", "")
            } catch (i) {
                debugLog(i.message)
            }
            var n = document.createElement("script");
            n.type = "text/javascript", n.src = "http://" + e + ".vk.com/inviter.php?act=get_friends_list&hash=" + hash + "&skey=" + key + "&mid=" + t + "&vk=" + o + "&back=FriendsSearch.getEmailResult&v=" + Math.floor(1e4 * Math.random()), headNode.appendChild(n)
        }
    },
    getEmailResult: function(e) {
        if (!e || e.error) return FriendsSearch.showError(e.error), !1;
        var t = [];
        for (var o in e.list) t.push(o);
        FriendsSearch.getList(1, t, {
            hash: e.hash
        })
    },
    getList: function(e, t, o) {
        t = t.join("|");
        var r = extend({
            act: "save_friends",
            service: e,
            Ids: t
        }, o);
        ajax.post("al_friends.php", r, {
            onDone: function(e, t) {
                if (1 == t) return curBox().hide(), Friends.section("suggestions", function() {
                    Friends.changeSummary(), nav.setLoc(extend(nav.objLoc, {
                        section: "suggestions"
                    }))
                }, {
                    m: 1
                }), !0;
                var o = ge("fsearch_results");
                o.innerHTML = e, show(o), curBox().hideProgress()
            }
        })
    },
    checkTwitter: function() {
        showBox("al_profileEdit.php", {
            act: "twitter_settings_box",
            import_friends: 1
        }, {
            params: {
                width: 560
            }
        })
    },
    confirmImportContacts: function(e, t, o, r) {
        var i, n, s;
        switch (r) {
            case "facebook":
                i = getTemplate("friends_confirm_import_title", {
                    service: "facebook",
                    title: getLang("friends_import_facebook_header")
                }), n = getTemplate("friends_confirm_import_body", {
                    msg: getLang("profileEdit_facebook_import_desc")
                }), s = getLang("profileEdit_auth_in_facebook");
                break;
            case "google":
                i = getTemplate("friends_confirm_import_title", {
                    service: "google",
                    title: getLang("friends_import_google_header")
                }), n = getTemplate("friends_confirm_import_body", {
                    msg: getLang("profileEdit_google_import_desc")
                }), s = getLang("profileEdit_auth_in_google");
                break;
            case "ok":
                i = getTemplate("friends_confirm_import_title", {
                    service: "ok",
                    title: getLang("friends_import_odnoklassniki_header")
                }), n = getTemplate("friends_confirm_import_body", {
                    msg: getLang("profileEdit_ok_import_desc")
                }), s = getLang("profileEdit_auth_in_ok")
        }
        var a = showFastBox({
            title: i,
            width: 560
        }, n, s, function() {
            return a.hide(), FriendsSearch.checkOAuth(e, t, o)
        }, getLang("global_cancel"))
    },
    checkOAuth: function(e, t, o) {
        var r = "https://" + location.host + "/friends?act=import_contacts&type=" + o;
        if (1 == o) var i = "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/contacts.readonly&response_type=code&redirect_uri=" + encodeURIComponent(r) + "&approval_prompt=force&state=" + t + "&client_id=841415684880-q8mkaiptra78d5aqgifo84qli993b1km.apps.googleusercontent.com&hl=" + e;
        else if (3 == o) var i = "https://graph.facebook.com/v2.7/oauth/authorize?client_id=128749580520227&redirect_uri=" + encodeURIComponent(r) + "&display=popup&state=" + t;
        else if (4 == o) var i = "http://www.odnoklassniki.ru/oauth/authorize?client_id=1258261760&scope=VALUABLE+ACCESS&response_type=code&redirect_uri=" + encodeURIComponent(r + "&state=" + t);
        var n = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
            s = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
            a = "undefined" != typeof window.outerWidth ? window.outerWidth : document.body.clientWidth,
            c = "undefined" != typeof window.outerHeight ? window.outerHeight : document.body.clientHeight - 22,
            d = 640,
            h = 450,
            p = parseInt(n + (a - d) / 2, 10),
            u = parseInt(s + (c - h) / 2.5, 10),
            f = "width=" + d + ",height=" + h + ",left=" + p + ",top=" + u,
            l = window.open(i, "google_auth", f);
        cur.importDone || (cur.importDone = {}), cur.importDone[o] = 0;
        var _ = setInterval(function() {
            l.closed ? (clearInterval(_), FriendsSearch.checkImportResult()) : cur.importDone[o] && clearInterval(_)
        }, 500)
    },
    importDone: function(e) {
        cur.importDone[e.type] = 1, e.error && setTimeout(showFastBox(getLang("global_error"), e.error).hide, 2e3)
    },
    checkImportResult: function() {
        showBox("al_friends.php", {
            act: "check_contacts_import",
            from: cur.module
        }, {
            dark: 1,
            showProgress: function() {},
            onFail: function() {
                return !0
            },
            onDone: function(e) {
                e.show()
            },
            preOnDone: !0
        })
    },
    checkImportingLoop: function() {
        var e = curBox();
        cur.importingInt = setInterval(function() {
            showBox("al_friends.php", {
                act: "check_contacts_import",
                provider: "twitter",
                from: cur.module
            }, {
                dark: 1,
                showProgress: function() {},
                onFail: function() {
                    return !0
                },
                onDone: function(t) {
                    e.hide(), clearInterval(cur.importingInt), t.show()
                },
                preOnDone: !0
            })
        }, 500)
    },
    showImportTT: function(e) {
        stManager.add(["intro.css"], function() {
            var t = ge("friends_summary");
            showTooltip(t, {
                content: '    <div id="intr_tt_pointer_left"></div>    <div id="intr_tt" style="width: 192px">      <div id="intr_hide" class="fl_r" onclick="ge(\'friends_summary\').tt.hide();" onmouseover="showTooltip(this, {text: \'' + e.hide + '\', black: 1, shift: [14, 4, 0]})"></div>      <div id="intr_header">' + e.header + '</div>      <div id="intr_text">' + e.text + "</div>    </div>",
                slideX: 15,
                className: "profile_intro_side_tt",
                shift: [-454, 0, 0],
                forcetodown: !0,
                nohide: !0,
                nohideover: !0
            })
        })
    },
    showError: function(e) {
        var t = ge("fsearch_error");
        t.innerHTML = e, show(t), curBox().hideProgress()
    },
    addImported: function(e, t, o, r) {
        debugLog("onimport", arguments);
        var i = curBox();
        if (i) return ajax.post("al_friends.php", {
            act: "add_imported",
            hash: r.hash,
            uids: e.join(",")
        }, {
            onDone: function(e) {
                i.hide();
                var t = ge("friends_import_msg");
                t.className = "friends_import_success", t.innerHTML = e, setStyle(t, {
                    backgroundColor: "#F4EBBD"
                }), animate(t, {
                    backgroundColor: "#F9F6E7"
                }, 2e3)
            },
            onFail: function() {
                i.hide();
                var e = ge("friends_import_msg");
                e.className = "friends_import_fail", e.innerHTML = text, setStyle(e, {
                    backgroundColor: "#FACEBB"
                }), animate(e, {
                    backgroundColor: "#FFEFE8"
                }, 2e3)
            },
            showProgress: i.showProgress,
            hideProgress: i.hideProgress
        }), !1
    },
    addCancelled: function(e) {
        return debugLog("why", arguments), ajax.post("al_friends.php", {
            act: "cancel_imported",
            hash: e.hash
        }, {
            onDone: function() {}
        }), !0
    },
    inviteBox: function() {
        return showBox("invite.php", {
            act: "invite_box"
        }, {
            stat: ["ui_controls.js", "selects.js", "ui_controls.css", "invite.js", "invite.css"],
            params: {
                bodyStyle: "padding: 0px;",
                dark: 1
            }
        }), !1
    },
    __eof: 1
};
try {
    stManager.done("friends_search.js")
} catch (e) {}