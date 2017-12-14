function appCallback(t) {
    var e = t.shift();
    return cur.app && cur.app.funcs ? (cur.app.funcs[e] || setTimeout(function() {
        throw new Error("unsupported app method: " + e)
    }, 0), setTimeout(function(i) {
        return i.app.funcs[e].apply(i.app, t)
    }.pbind(cur), 0), !0) : !0
}

function detectUnityWebPlayer(t, e) {
    var i = function(t, e) {
            var i = 0,
                o = 0,
                s = ce("object", {
                    type: "application/vnd.unity"
                }, {
                    visibility: "hidden"
                });
            bodyNode.appendChild(s),
                function() {
                    if ("undefined" == typeof s.GetPluginVersion) o++ < 10 ? setTimeout(arguments.callee, 10) : (bodyNode.removeChild(s), t(null));
                    else {
                        var n = {};
                        if (e)
                            for (i = 0; i < e.length; ++i) n[e[i]] = s.GetUnityVersion(e[i]);
                        n.plugin = s.GetPluginVersion(), bodyNode.removeChild(s), t(n)
                    }
                }()
        },
        o = function(t) {
            var e, i, o, s, n, a = 0;
            if (t) {
                var r = t.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);
                r && r[1] && (e = r[1], i = r[2] ? r[2] : 0, o = r[3] ? r[3] : 0, s = r[4] ? r[4] : "r", n = r[5] ? r[5] : 0, a |= e / 10 % 10 << 28, a |= e % 10 << 24, a |= i % 10 << 20, a |= o % 10 << 16, a |= {
                    d: 8192,
                    a: 16384,
                    b: 24576,
                    f: 32768,
                    r: 32768
                }[s], a |= n / 100 % 10 << 8, a |= n / 10 % 10 << 4, a |= n % 10)
            }
            return a
        },
        s = !1;
    if (navigator.plugins.refresh(), "undefined" != typeof navigator.plugins && navigator.plugins["Unity Player"] && "undefined" != typeof navigator.mimeTypes && navigator.mimeTypes["application/vnd.unity"] && navigator.mimeTypes["application/vnd.unity"].enabledPlugin) {
        if (s = !0, browser.safari && /Mac OS X 10_6/.test(navigator.appVersion)) return void i(function(e) {
            e && e.plugin || (s = !1), t(s, e)
        }, e);
        if (browser.mac && browser.chrome) return void i(function(e) {
            e && o(e.plugin) <= o("2.6.1f3") && (s = !1), t(s, e)
        }, e);
        if (e) return void getPluginVersion(function(e) {
            t(s, e)
        }, e)
    } else if (browser.msie) {
        var n = !1;
        try {
            null != ActiveXObject.prototype && (n = !0)
        } catch (a) {}
        if (n && (!/win64/i.test(navigator.userAgent) || !/x64/i.test(navigator.userAgent))) try {
            var r = new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1"),
                c = r.GetPluginVersion();
            if (e) {
                for (var l = {}, p = 0; p < e.length; ++p) l[e[p]] = r.GetUnityVersion(e[p]);
                l.plugin = c
            }
            if (s = !0, "2.5.0f5" == c) {
                var d = /Windows NT \d+\.\d+/.exec(navigator.userAgent);
                if (d && d.length > 0) {
                    var u = parseFloat(d[0].split(" ")[2]);
                    u >= 6 && (s = !1)
                }
            }
        } catch (a) {}
    }
    t(s, l)
}! function(t) {
    function e() {
        for (var t = "", e = 0; 5 > e; e++) t += Math.ceil(15 * Math.random()).toString(16);
        return t
    }

    function i(t, e, o, s, n) {
        t[e] ? o.apply(s) : (n = n || 0, 1e3 > n && setTimeout(function() {
            i(t, e, o, s, n + 1)
        }, 0))
    }

    function o(e) {
        setTimeout(function() {
            var o = document.createElement("script");
            o.type = "text/javascript", o.src = e || t.fastXDM.helperUrl, i(document, "body", function() {
                document.getElementsByTagName("HEAD")[0].appendChild(o)
            })
        }, 0)
    }

    function s(t, e) {
        var i;
        switch (typeof t) {
            case "string":
                i = e ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : t.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
                break;
            case "object":
                if ("[object Array]" === Object.prototype.toString.apply(t)) {
                    i = [];
                    for (var o = 0, n = t.length; n > o; o++) i[o] = s(t[o], e)
                } else {
                    i = {};
                    for (var a in t) Object.hasOwnProperty.call(t, a) && (i[a] = s(t[a], e))
                }
                break;
            default:
                i = t
        }
        return i
    }

    function n(t, e) {
        d.loaded ? t.apply(e, [d]) : p.push([e, t])
    }

    function a() {
        d.loaded = !0;
        for (var t = 0, e = p.length; e > t; t++) p[t][1].apply(p[t][0], [d])
    }

    function r(t, e) {
        n(function(i) {
            var o = i.json.parse(t);
            if (o[0]) {
                o[1] || (o[1] = []);
                for (var n = 0, a = o[1].length; a > n; n++)
                    if (o[1][n] && o[1][n]._func) {
                        var r = o[1][n]._func;
                        o[1][n] = function() {
                            var t = Array.prototype.slice.call(arguments);
                            t.unshift("_func" + r), e.callMethod.apply(e, t)
                        }
                    } else e.options.safe && (o[1][n] = s(o[1][n], !0));
                setTimeout(function() {
                    if (!e.methods[o[0]]) throw Error("fastXDM: Method " + o[0] + " is undefined");
                    e.methods[o[0]].apply(e, o[1])
                }, 0)
            }
        })
    }

    function c(t, e) {
        for (var i in e) t[i] && "object" == typeof t[i] ? c(t[i], e[i]) : t[i] = e[i]
    }
    if (!t.fastXDM) {
        var l = {},
            p = [],
            d = {};
        t.fastXDM = {
            _id: 0,
            helperUrl: "https://vk.com/js/api/xdmHelper.js",
            Server: function(i, o, s) {
                this.methods = i || {}, this.filter = o, this.options = s || {}, this.id = t.fastXDM._id++, this.key = e(), this.frameName = "fXD" + this.key, this.server = !0, this.methods["%init%"] = this.methods.__fxdm_i = function() {
                    t.fastXDM.run(this.id), this.methods.onInit && this.methods.onInit()
                }, l[this.key] = [r, this]
            },
            Client: function(e, i) {
                if (this.methods = e || {}, this.options = i || {}, this.id = t.fastXDM._id++, this.client = !0, t.fastXDM.run(this.id), 0 !== window.name.indexOf("fXD")) throw Error("Wrong window.name property.");
                this.key = window.name.substr(3), this.caller = window.parent, l[this.key] = [r, this], t.fastXDM.on("helper", function() {
                    t.fastXDM.onClientStart(this)
                }, this), n(function(t) {
                    t.send(this, t.json.stringify(["%init%"]));
                    var e = this.methods;
                    setTimeout(function() {
                        e.onInit && e.onInit()
                    }, 0)
                }, this)
            },
            onMessage: function(t) {
                if (t.origin != document.origin) {
                    var e = cur.app && cur.app.options && cur.app.options.src ? cur.app.options.src : "";
                    if (!e) return debugLog("Wrong app url"), !1;
                    t.origin != e && t.origin + "/" != e.substring(0, t.origin.length + 1) && debugLog("Warning: message from " + t.origin + " will be disable in future")
                }
                var i = t.data;
                if (!i) return !1;
                if ("string" != typeof i && !(i instanceof String)) return !1;
                var o = i.substr(0, 5);
                if (l[o]) {
                    var s = l[o][1];
                    !s || s.filter && !s.filter(t.origin) || l[o][0](i.substr(6), s)
                }
            },
            setJSON: function(t) {
                d.json = t
            },
            getJSON: function(t) {
                return t ? void n(function(e) {
                    t(e.json)
                }) : d.json
            },
            setEnv: function(t) {
                for (var e in t) d[e] = t[e];
                a()
            },
            _q: {},
            on: function(t, e, i) {
                this._q[t] || (this._q[t] = []), -1 == this._q[t] ? e.apply(i) : this._q[t].push([e, i])
            },
            run: function(t) {
                for (var e = (this._q[t] || []).length, i = 0; e > i; i++) this._q[t][i][0].apply(this._q[t][i][1]);
                this._q[t] = -1
            },
            waitFor: i
        }, t.fastXDM.Server.prototype.start = function(e, i) {
            if (e.contentWindow) this.caller = e.contentWindow, this.frame = e, t.fastXDM.on("helper", function() {
                t.fastXDM.onServerStart(this)
            }, this);
            else {
                var o = this;
                i = i || 0, 50 > i && setTimeout(function() {
                    o.start.apply(o, [e, i + 1])
                }, 100)
            }
        }, t.fastXDM.Server.prototype.destroy = function() {
            delete l[this.key]
        }, t.fastXDM.Server.prototype.append = function(t, e, i) {
            var o = document.createElement("DIV");
            o.innerHTML = '<iframe name="' + this.frameName + '" ' + (i || "") + "></iframe>";
            var s = o.firstChild,
                n = this,
                a = function() {
                    s.frameBorder = "0", e && c(s, e), t.insertBefore(s, t.firstChild), n.start(s)
                };
            return n.options.layer ? a() : setTimeout(function() {
                a()
            }, 0), s
        }, t.fastXDM.Client.prototype.callMethod = t.fastXDM.Server.prototype.callMethod = function() {
            for (var e = Array.prototype.slice.call(arguments), o = e.shift(), a = 0, r = e.length; r > a; a++)
                if ("function" == typeof e[a]) {
                    this.funcsCount = (this.funcsCount || 0) + 1;
                    var c = e[a],
                        l = "_func" + this.funcsCount;
                    this.methods[l] = function() {
                        c.apply(this, arguments), delete this.methods[l]
                    }, e[a] = {
                        _func: this.funcsCount
                    }
                } else this.options.safe && (e[a] = s(e[a], !1));
            i(this, "caller", function() {
                t.fastXDM.on(this.id, function() {
                    n(function(t) {
                        t.send(this, t.json.stringify([o, e]))
                    }, this)
                }, this)
            }, this)
        }, t.JSON && "object" == typeof t.JSON && t.JSON.parse && t.JSON.stringify && '{"a":[1,2,3]}' === t.JSON.stringify({
            a: [1, 2, 3]
        }).replace(/ /g, "") ? d.json = {
            parse: t.JSON.parse,
            stringify: t.JSON.stringify
        } : t.fastXDM._needJSON = !0, t.postMessage ? (d.protocol = "p", d.send = function(t, e) {
            var i = t.frame ? t.frame.contentWindow : t.caller;
            if (i) try {
                i.postMessage(t.key + ":" + e, "*")
            } catch (o) {
                window.postMessage.call(i, t.key + ":" + e, "*")
            }
        }, t.addEventListener ? t.addEventListener("message", t.fastXDM.onMessage, !1) : t.attachEvent("onmessage", t.fastXDM.onMessage), t.fastXDM._needJSON ? (t.fastXDM._onlyJSON = !0, o()) : a()) : o()
    }
}(window), window._iconAdd || (window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "");
var vkApp = function(t, e, i, o) {
    if (i = i || {}, e = e || {}, window.parent && window.parent != window && !e.checking) return !1;
    var s = this;
    if (this.cont = ge(t), this.cont) {
        if (i.hash = i.hash || "", -1 != i.hash.indexOf("#")) {
            var n = i.hash.split("#").pop();
            (n || "").substr(0, 1) == vk.navPrefix ? i.hash = "" : i.hash = n
        }
        if (this.params = i, this.onReady = new Array, 1 == e.type) {
            var a = e.src,
                r = [];
            for (var c in i) "hash" == c ? r.push(c + "=" + encodeURIComponent(i[c])) : r.push(c + "=" + i[c]);
            a += (-1 == a.indexOf("?") ? "?" : "&") + r.join("&")
        }
        e.inlineApp && (s.inlineApp = !0), s.options = extend({
            heightMax: 4500
        }, e), this.funcs = {
            onInit: function() {
                return e.heightSync && s.RPC.callMethod("getHeight", function(t) {
                    s.setHeight(t)
                }), s.inited || (s.inited = !0, o && o(), s.inlineApp || s.onAppReady()), !0
            },
            ApiCall: function(t, e) {
                var i = t.shift();
                s.api(i, t[0], e)
            },
            _getAppInfo: function(t) {
                t([s.params.api_id, window.location.hash])
            },
            api: function(t, e, i) {
                s.api(e, i, function(e) {
                    s.apiCallback(t, e)
                })
            },
            setHeight: function(t) {
                s.setHeight(t)
            },
            scrollWindow: function(t, e) {
                if (!s.inlineApp && !s.options.layer) {
                    var i = Math.max(t, 0);
                    e = intval(e), e && e > 0 ? (animate(htmlNode, {
                        scrollTop: i
                    }, e), animate(bodyNode, {
                        scrollTop: i
                    }, e)) : window.scroll(0, i)
                }
            },
            scrollTop: function(t) {
                var e = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
                cur.appTopOffset || (cur.appTopOffset = getXY(cur.app.cont)[1]);
                var i = 0;
                curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle && (i = 1), cur.app.runCallback("onScrollTop", parseInt(scrollGetY()), parseInt(e), parseInt(cur.appTopOffset), i)
            },
            scrollSubscribe: function(t) {
                var e = function() {
                        var t = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
                        s.runCallback("onScroll", parseInt(scrollGetY()), parseInt(t))
                    },
                    i = function() {
                        addEvent(browser.msie6 ? pageNode : window, "scroll", e)
                    };
                i(), t && e(), cur._back ? (cur._back.show.push(i), cur._back.hide.push(function() {
                    removeEvent(browser.msie6 ? pageNode : window, "scroll", e)
                })) : cur.destroy.push(function() {
                    removeEvent(browser.msie6 ? pageNode : window, "scroll", e)
                })
            },
            showRequestBox: function(t, e, i) {
                showBox("al_apps.php", {
                    act: "show_request_box",
                    aid: cur.aid,
                    message: e,
                    uid: t,
                    request_key: i
                }, {
                    params: {
                        width: 430,
                        dark: 1
                    },
                    onFail: function(t) {
                        return cur.app.runCallback("onRequestFail", t), !0
                    }
                })
            },
            showInstallPushBox: function() {
                showBox("al_apps.php", {
                    act: "show_install_push_box",
                    aid: cur.aid
                }, {
                    params: {
                        width: 430,
                        dark: 1
                    },
                    onFail: function(t) {
                        return cur.app.runCallback("onInstallPushFail", t), !0
                    }
                })
            },
            showProfilePhotoBox: function(t) {
                showBox("al_apps.php", {
                    act: "show_profile_photo_box",
                    hash: t,
                    aid: cur.aid
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            setTitle: function(t) {
                if (!s.inlineApp) {
                    t = t.replace(/[<>]+/gi, "");
                    var e = cur.backLang;
                    e = e ? e : getLang("global_vkontakte"), document.title = e + (t ? " | " + t : "")
                }
            },
            resizeWindow: function(t, e) {
                s.setWidth(t), s.setHeight(e)
            },
            getLocationProtocol: function(t) {
                t(location.protocol)
            },
            setLocation: function(t, e) {
                t = t.toString(), cur.appLoc = t, e && cur.app.runCallback("onLocationChanged", t), nav.setLoc(extend(nav.objLoc, {
                    "#": t
                }))
            },
            setNavigation: function() {},
            checkFlashSupport: function(t) {
                return t = positive(t), t || (t = 9), browser.flash >= t ? void cur.app.runCallback("onCheckFlashSupportSuccess") : (cur.app.showDummy("no_flash"), void cur.app.runCallback("onCheckFlashSupportFail"))
            },
            checkUnitySupport: function() {
                detectUnityWebPlayer(function(t) {
                    t ? cur.app.runCallback("onCheckUnitySupportSuccess") : (cur.app.showDummy("no_unity"), cur.app.runCallback("onCheckUnitySupportFail"))
                })
            },
            showInstallBox: function() {
                if (cur.appUser) Apps.onAppAdded();
                else {
                    if (cur.installBoxShown) return;
                    cur.installBoxShown = !0;
                    var t = showBox("apps", {
                        act: "install_box",
                        aid: e.aid
                    }, {
                        params: {
                            dark: 1
                        }
                    });
                    t.setOptions({
                        onHide: function() {
                            setTimeout(function() {
                                cur.installBoxShown = !1
                            }, 3e3)
                        }
                    })
                }
            },
            showSettingsBox: function(t) {
                if (!cur.settingsBoxShown) {
                    cur.onSettingsEventSended = !1, cur.canSendOnSettingsEventFromHide = !0, cur.onSettingsChange = function(t, e) {
                        cur.onSettingsEventSended || (cur.onSettingsEventSended = !0, "ok" === t ? cur.app.runCallback("onSettingsChanged", e) : cur.app.runCallback("onSettingsCancel"))
                    }, cur.settingsBoxShown = !0;
                    var i = {
                        act: "settings_box",
                        aid: e.aid,
                        mask: t
                    };
                    e.gid && (i.gid = e.gid);
                    var o = showBox("apps", i, {
                        params: {
                            dark: 1,
                            width: 550
                        }
                    });
                    o.setOptions({
                        onHide: function() {
                            cur.canSendOnSettingsEventFromHide && cur.onSettingsChange("cancel"), setTimeout(function() {
                                cur.settingsBoxShown = !1
                            }, 3e3)
                        }
                    })
                }
            },
            showGroupSettingsBox: function(t) {
                if (!cur.settingsBoxShown && (cur.settingsBoxShown = !0, e.gid)) {
                    cur.onSettingsEventSended = !1, cur.canSendOnSettingsEventFromHide = !0, cur.onSettingsChange = function(t, e, i) {
                        cur.onSettingsEventSended || (cur.onSettingsEventSended = !0, "ok" === t ? cur.app.runCallback("onGroupSettingsChanged", e, i) : cur.app.runCallback("onGroupSettingsCancel"))
                    };
                    var i = {
                            act: "group_settings_box",
                            aid: e.aid,
                            mask: t,
                            gid: e.gid
                        },
                        o = showBox("apps", i, {
                            params: {
                                dark: 1,
                                width: 550
                            }
                        });
                    o.setOptions({
                        onHide: function() {
                            cur.canSendOnSettingsEventFromHide && cur.onSettingsChange("cancel"), setTimeout(function() {
                                cur.settingsBoxShown = !1
                            }, 3e3)
                        }
                    })
                }
            },
            showAppWidgetPreviewBox: function(t, i) {
                function o() {
                    delete cur.onAppWidgetPreviewFail, delete cur.onAppWidgetPreviewCancel, delete cur.onAppWidgetPreviewSuccess, setTimeout(function() {
                        delete cur.appWidgetPreviewBox
                    }, 3e3)
                }
                if (!cur.appWidgetPreviewBox && e.gid) {
                    cur.appWidgetPreviewBox = !0, cur.onAppWidgetPreviewFail = function(t) {
                        o(), cur.app.runCallback("onAppWidgetPreviewFail", t)
                    }, cur.onAppWidgetPreviewCancel = function() {
                        o(), cur.app.runCallback("onAppWidgetPreviewCancel")
                    }, cur.onAppWidgetPreviewSuccess = function() {
                        o(), cur.app.runCallback("onAppWidgetPreviewSuccess")
                    };
                    var s = showBox("apps", {
                        act: "app_widget_preview_box",
                        aid: e.aid,
                        gid: e.gid,
                        type: t,
                        code: i
                    }, {
                        params: {
                            width: 600,
                            containerClass: "apps_app_widget_preview_box"
                        },
                        onDone: function() {
                            s.setOptions({
                                onHide: function() {
                                    isFunction(cur.onAppWidgetPreviewCancel) && cur.onAppWidgetPreviewCancel()
                                }
                            })
                        },
                        onFail: function(t) {
                            return ~t.indexOf("413 Request Entity Too Large") && (t = "413 Request Entity Too Large"), isFunction(cur.onAppWidgetPreviewFail) && cur.onAppWidgetPreviewFail(t), !0
                        }
                    })
                }
            },
            showAllowMessagesFromCommunityBox: function() {
                if (!cur.allowMessagesFromCommunityBox) {
                    cur.allowMessagesFromCommunityBox = !0, cur.allowMessagesFromCommunityStatus = "", cur.onAllowMessagesFromCommunity = function(t) {
                        "ok" === t ? cur.app.runCallback("onAllowMessagesFromCommunity") : cur.app.runCallback("onAllowMessagesFromCommunityCancel")
                    };
                    var t = {
                        act: "allow_messages_from_community_box",
                        aid: e.aid
                    };
                    e.gid && (t.gid = e.gid);
                    var i = showBox("apps", t, {
                        params: {
                            dark: 1,
                            width: 550
                        }
                    });
                    i.setOptions({
                        onHide: function() {
                            cur.onAllowMessagesFromCommunity(cur.allowMessagesFromCommunityStatus), setTimeout(function() {
                                cur.allowMessagesFromCommunityBox = !1
                            }, 3e3)
                        }
                    })
                }
            },
            showInviteBox: function() {
                Apps.showInviteBox(e.aid, e.hash)
            },
            showPaymentBox: function(t) {
                showBox("al_apps.php", {
                    act: "show_payment_box",
                    votes: t,
                    aid: e.aid
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            showLeadsPaymentBox: function(t) {
                showBox("al_apps.php", {
                    act: "show_payment_box",
                    aid: e.aid,
                    offers: isArray(t) ? t.join(",") : intval(t) || 1
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            showOrderBox: function(t) {
                if ("object" != typeof t) {
                    var i = Array.prototype.slice.call(arguments);
                    t = {}, each(i, function() {
                        var e = this.split("=");
                        2 == e.length && (t[e[0]] = e[1])
                    })
                }
                var o = {};
                for (var s in t) inArray(s, ["type", "votes", "offer_id", "item", "currency"]) && (o[s] = t[s] + "");
                "offers" == o.type && isArray(o.offer_id) && (o.offer_id = o.offer_id.join(",")), o.act = "show_order_box", o.aid = e.aid, o.hash = e.hash, showBox("al_apps.php", o, {
                    params: {
                        dark: 1
                    },
                    onFail: function(t) {
                        return showFastBox({
                            title: getLang("global_error")
                        }, t), !0
                    }
                }), cur.onAppOrderCancel = function() {
                    cur.app.runCallback("onOrderCancel")
                }, cur.onAppOrderSuccess = function(t) {
                    cur.app.runCallback("onOrderSuccess", t)
                }, cur.onAppOrderFail = function(t) {
                    cur.app.runCallback("onOrderFail", t)
                }
            },
            showSubscriptionBox: function(t, i) {
                if ("object" != typeof i) {
                    var o = Array.prototype.slice.call(arguments);
                    i = {}, each(o, function() {
                        var t = this.split("=");
                        2 == t.length && (i[t[0]] = t[1])
                    })
                }
                var s = {
                    act: "show_subscription_box",
                    aid: e.aid,
                    action: t,
                    hash: e.hash
                };
                "create" == s.action ? s.item = i.item : ("resume" == s.action || "cancel" == s.action) && (s.subscription_id = i.subscription_id), showBox("al_apps.php", s, {
                    onFail: function(t) {
                        return showFastBox({
                            title: getLang("global_error")
                        }, t), !0
                    }
                }), cur.onSubscriptionCancel = function() {
                    cur.app.runCallback("onSubscriptionCancel")
                }, cur.onSubscriptionSuccess = function(t) {
                    cur.app.runCallback("onSubscriptionSuccess", t)
                }, cur.onSubscriptionFail = function(t) {
                    cur.app.runCallback("onSubscriptionFail", t)
                }
            },
            showMerchantPaymentBox: function(t) {
                return !1
            },
            showPortlet: function(t) {
                return !1
            },
            addToMenu: function() {
                ajax.post("al_apps.php", {
                    act: "add_left_menu",
                    aid: cur.aid,
                    hash: cur.app.options.hash
                }, {
                    onDone: function(t) {
                        Apps.updateLeftNav(t.left_nav), Apps.addToMenuErrorResolve(t), Apps.updateAddToMenuAction()
                    }
                })
            },
            adsPublish: function() {
                AdsLight.handleEvent.apply(AdsLight, arguments)
            },
            callUser: function(t, e, i) {
                showBox("al_apps.php", {
                    act: "call_user",
                    uid: t,
                    key: e,
                    aid: cur.aid,
                    msg: i
                }, {
                    dark: 1,
                    onFail: function(t) {
                        return cur.app.runCallback("onCallFail", t), !0
                    }
                })
            },
            debug: function() {
                debugLog(1 == arguments.length ? arguments[0] : arguments)
            },
            openExternalApp: function(t, i) {
                if (t) {
                    var o = "",
                        s = [];
                    if (i) {
                        i.aid = e.aid;
                        for (var n in i) {
                            var a = "";
                            void 0 !== i[n] && (a = encodeURIComponent(i[n])), s.push(encodeURIComponent(n) + "=" + a)
                        }
                        o = t + "?" + s.join("&")
                    }
                    if (o) {
                        var r = {
                            act: "open_external_app",
                            url: t,
                            q: s.join("&"),
                            aid: e.aid
                        };
                        ajax.post("al_apps.php", r, {
                            onDone: function(t, e) {
                                e && (showWiki({
                                    w: t
                                }), cur.onExternalAppDone = function(t) {
                                    this.runCallback("onExternalAppDone", t)
                                }.bind(cur.app))
                            }
                        })
                    }
                }
            },
            externalAppDone: function(t) {
                window.WkView && WkView.hide(!1, !0), cur.onExternalAppDone && (cur.onExternalAppDone(t), cur.onExternalAppDone = null)
            }
        }, i.widget ? (s.options.type = 1, s.options.widget = !0) : (renderFlash(ge("flash_api_external_cont"), {
            url: "/swf/api_external.swf",
            id: "flash_api_external",
            width: 1,
            height: 1,
            preventhide: 1,
            version: 9
        }, {
            allowFullScreen: !0,
            allowscriptaccess: "always",
            allownetworking: "all",
            wmode: "opaque"
        }, {
            debug: i.debug ? 1 : 0,
            lc_name: i.lc_name
        }), s.externalFrame = ge("flash_api_external"));
        var l = s.options.wmode || "opaque";
        if (s.options.no_init) return !1;
        var p = 1;
        switch (s.options.type) {
            case 1:
                s.options.layer ? this.RPC = new fastXDM.Server(this.funcs, void 0, {
                    layer: 1
                }) : this.RPC = new fastXDM.Server(this.funcs);
                var d = {
                    src: a,
                    width: "100%",
                    overflow: "hidden",
                    scrolling: "no"
                };
                s.options.widget || (d.height = s.options.height + "px"), this.frame = this.RPC.append(s.cont, d, 'webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"');
                break;
            case 2:
                debugLog("is wrapper");
                var u = {
                    url: e.src,
                    id: "flash_app",
                    width: s.options.width,
                    height: s.options.height,
                    version: 10
                };
                "opaque" == l && (u.preventhide = 1), p = renderFlash(s.cont, u, {
                    allowFullScreen: !0,
                    allowscriptaccess: "never",
                    allowFullScreenInteractive: "true",
                    allownetworking: "all",
                    bgcolor: "#F7F7F7",
                    wmode: l
                }, i), s.frame = ge("flash_app");
                break;
            case 3:
                var u = {
                    url: e.src,
                    id: "flash_app",
                    width: s.options.width,
                    height: s.options.height,
                    version: 9
                };
                "opaque" == l && (u.preventhide = 1), p = renderFlash(s.cont, u, {
                    allowFullScreen: !0,
                    allownetworking: "all",
                    allowscriptaccess: "never",
                    allowFullScreenInteractive: "true",
                    wmode: l
                }, i), s.frame = ge("flash_app")
        }
        p || s.showDummy("no_flash"), i.widget && setTimeout(function() {
            s.inited || show("app_connect_error")
        }, 8e3), cur.destroy.push(function() {
            this.RPC && this.RPC.destroy()
        }.bind(this))
    }
};
vkApp.prototype.boxApp = function(t) {}, vkApp.prototype.onAppReady = function() {
    for (var t in this.onReady) this.onReady[t]()
}, vkApp.prototype.runCallback = function() {
    var t = Array.prototype.slice.call(arguments),
        e = t[0],
        i = "customEvent";
    if (-1 != "onLocationChanged,onMerchantPaymentSuccess,onBalanceChanged,onWindowResized,onSettingsChanged,onGroupSettingsChanged,onAppWidgetPreviewFail,onAppWidgetPreviewCancel,onAppWidgetPreviewSuccess,onCheckFlashSupportSuccess,onCheckFlashSupportFail,onCheckUnitySupportSuccess,onCheckUnitySupportFail".indexOf(e)) {
        i = e;
        var o = t.slice(1)
    } else var o = t.slice();
    switch (this.options.type) {
        case 1:
            if (this.RPC.callMethod("runCallback", t), !this.options.widget && !browser.iphone && !browser.ipad) try {
                this.externalFrame[i](o)
            } catch (s) {}
            break;
        case 2:
            try {
                this.externalFrame[i](o)
            } catch (s) {}
            break;
        case 3:
            try {
                this.externalFrame[i](o)
            } catch (s) {}
    }
}, vkApp.prototype.apiCallback = function(t, e) {
    Array.prototype.slice.call(arguments);
    try {
        this.externalFrame.apiCallback(t, e)
    } catch (i) {}
}, vkApp.prototype.setHeight = function(t) {
    if (t) {
        this.inlineApp && t > this.options.heightMax && (t = this.options.heightMax);
        var e = t + "px";
        this.frame.style.height = e, this.options.boxed || (this.cont.style.height = e), this.options.layer && WkView.onResize(), this.options.onResize && this.options.onResize()
    }
}, vkApp.prototype.setWidth = function(t) {
    if (t && !this.inlineApp && cur.app) {
        getSize(cur.app.cont);
        t = Math.min(Math.max(t, 100), 1e3), this.options.layer ? WkView.onResize() : handlePageView({
            noleftmenu: vk.noleftmenu,
            nobottommenu: vk.nobottommenu,
            notopmenu: vk.notopmenu,
            body_class: vk.body_class,
            staticheader: vk.staticheader,
            no_ads: vk.no_ads,
            ad_preview: vk.ad_preview,
            width: Math.max(t, 625) + 166
        }), this.frame.style.width = this.cont.style.width = t + "px"
    }
}, vkApp.prototype.showProgress = function() {
    addClass(this.cont, "loading"), this.loaderEl = showProgress(this.cont, "", "pr_big app_container_progress", !0)
}, vkApp.prototype.hideProgress = function() {
    removeClass(this.cont, "loading"), this.loaderEl && re(this.loaderEl)
}, vkApp.prototype.showDummy = function(t) {
    if (this.cont && ~["no_flash", "no_unity"].indexOf(t)) {
        var e = {
            act: t
        };
        "no_flash" !== t || browser.iphone || browser.ipad ? "no_unity" !== t || browser.mobile || (e.screen = browser.msie || browser.amigo || browser.mac && browser.safari ? "install" : "browser") : e.screen = "install", ajax.post("al_apps.php", e, {
            onDone: function(t) {
                cur.app && (addClass(cur.app.cont, "dummy"), val(cur.app.cont, t))
            },
            showProgress: this.showProgress.bind(this),
            hideProgress: this.hideProgress.bind(this)
        })
    }
}, vkApp.prototype.balanceUpdated = function(t) {
    this.runCallback("onBalanceChanged", t)
}, vkApp.prototype.checkMethod = function(t, e, i) {
    var o = t.toLowerCase();
    if ("wall.post" == o || "activity.set" == o) {
        var s = e["wall.post" == o ? "message" : "text"];
        s || (s = ""), showBox("apps", {
            act: "wall_post_box",
            aid: this.options.aid,
            post_id: e.post_id,
            owner_id: e.owner_id,
            lat: e.lat,
            "long": e["long"],
            place_id: e.place_id,
            from_group: e.from_group,
            publish_date: e.publish_date,
            signed: e.signed,
            attachments: e.attachments || e.attachment,
            text: s,
            method: o
        }, {
            params: {
                width: "430px",
                dark: 1
            }
        });
        var n = this;
        return cur.apiWallPost = function(o, s) {
            s ? i && i({
                error: s
            }) : n.api(t, extend(e, {
                method_access: o
            }), i)
        }, !1
    }
    return !0
}, vkApp.prototype.checkMethodResult = function(t, e, i, o) {
    switch (t) {
        case "photos.saveProfilePhoto":
            if (!i.error) return cur.profilePhotoBoxCallback = function(t) {
                o(t ? {
                    response: {
                        photo_src: i.response.photo_src
                    }
                } : {
                    error: {
                        error_code: 10007,
                        error_msg: "Operation denied by user"
                    }
                }), window.profilePhotoBoxCallback = !1
            }, cur.app.funcs.showProfilePhotoBox(i.response.photo_hash), !1
    }
    return !0
}, vkApp.prototype.onLocChanged = function(t) {
    t || (t = ""), cur.appLoc != t && (cur.appLoc = t, this.runCallback("onLocationChanged", t))
}, vkApp.prototype.api = function(method, inputParams, callback, captcha) {
    function sName(t, e) {
        return t[0] > e[0] ? 1 : t[0] < e[0] ? -1 : 0
    }
    var self = this;
    if (2 == arguments.length && (callback = params, inputParams = {}), inputParams || (inputParams = {}), captcha || inputParams.method_access || inputParams.method_force || this.checkMethod(method, inputParams, callback)) {
        delete inputParams.callback, delete inputParams.access_token;
        var params = {
            v: "3.0",
            api_id: this.params.api_id,
            method: method,
            format: "json",
            rnd: parseInt(1e4 * Math.random())
        };
        if (inputParams)
            for (var i in inputParams) i = trim(i), /^(rnd|format|api[\s.\[_]id|method|callback|access[\s.\[_]token)(\s*\[|$)/.test(i) || (params[i] = inputParams[i]);
        var lParams = [];
        for (i in params) lParams.push([i, params[i]]);
        lParams.sort(sName);
        var sig = this.params.viewer_id;
        for (i in lParams) sig += lParams[i][0] + "=" + lParams[i][1];
        sig += this.params.secret, params.sid = this.params.sid, stManager.add("md5.js", function() {
            params.sig = MD5(sig);
            var done = function(text) {
                    var response = eval("(" + text + ")");
                    if (response.error && 14 == response.error.error_code) cur.appCaptcha = showCaptchaBox(response.error.captcha_sid, 0, !1, {
                        onSubmit: function(t, e) {
                            inputParams.captcha_sid = t, inputParams.captcha_key = e, self.api(method, inputParams, callback, !0), cur.appCaptcha.setOptions({
                                onHide: function() {}
                            }).hide()
                        },
                        onHide: function() {
                            callback(response)
                        },
                        imgSrc: response.error.captcha_img
                    });
                    else {
                        if (captcha && cur.appCaptcha.setOptions({
                                onHide: function() {}
                            }).hide(), !self.checkMethodResult(method, inputParams, response, callback)) return;
                        callback && callback(response)
                    }
                },
                fail = function() {
                    debugLog("Ajax fail")
                };
            ajax.plainpost(self.params.api_script || "/api.php", params, done, fail)
        })
    }
};
var AppsSlider = function(t) {
    if (this.options = extend({
            inner: null,
            outer: null,
            next: null,
            prev: null,
            infinite: !0,
            slideshowDuration: 4e3,
            animationDuration: 500
        }, t || {}), this.required = null, this.current = null, this.slideNext = null, this.slidePrev = null, this.slideCurrent = null, this.options.outer && this.options.inner && (this.outer = ge(this.options.outer), this.inner = ge(this.options.inner), this.outer && this.inner)) {
        if (this.slideshow = !1, this.animation = {
                stop: function() {}
            }, this.slideshowTimeout = null, this.interacted = !1, this.slides = domChildren(this.inner), this.options.infinite) {
            if (!this.slides.length) return void re(this.outer);
            if (this.slides.length < 3)
                for (var e = null, i = 0; this.slides.length < 4;) e = this.slides[i++].cloneNode(!0), this.slides.push(e), this.inner.appendChild(e)
        }(this.arrowNext = ge(this.options.next)) && addEvent(this.arrowNext, "mousedown", this.next.bind(this)), (this.arrowPrev = ge(this.options.prev)) && addEvent(this.arrowPrev, "mousedown", this.prev.bind(this)), this.inited = !1, this.init()
    }
};
AppsSlider.prototype = {
    init: function() {
        return void 0 !== this.inited ? this.inited ? !0 : 0 !== this.outer.offsetWidth && 0 !== this.slides[0].offsetWidth ? (this.widthOuter = this.outer.offsetWidth, this.widthInner = this.inner.offsetWidth, this.widthSlide = this.widthInner / this.slides.length, this.offsetInner = this.inner.offsetLeft, this.widthSide = (this.widthOuter - this.widthSlide) / 2, this.indexNext = this.slides.length - 1, this.indexPrev = 0, this.indexMargin = (this.slides.length - 1) / 2 | 0, this.indexRequired = this.indexCurrent = this.getIndex(), this.highlight(), this.rearrange(), this.slideshow && !this.slideshowTimeout && this.slideshowStart(), this.inited = !0) : void 0 : void 0
    },
    highlight: function() {
        this.slideHighlighted && (removeClass(this.slideHighlighted, "selected"), this.slideHighlighted = null, this.indexHighlighted = null), this.indexHighlighted !== this.indexCurrent && (this.indexHighlighted = this.indexCurrent, this.slideHighlighted = this.slides[this.getIndex(this.indexCurrent)], addClass(this.slideHighlighted, "selected"))
    },
    handler: function(t) {
        var e = t.target && (t.target === this.outer || this.outer.contains(t.target));
        this.interacted != e && (this.interacted = e, e ? (this.slideshowInterrupted = this.slideshow, this.slideshowStop()) : (this.slideshow = this.slideshowInterrupted, this.slideshow && this.slideshowStart()))
    },
    slideshowStart: function() {
        this.slideshow = !0, this.interacted || (this.slideshowStop(), this.slideshow = !0, this.slideshowTimeout = setTimeout(function() {
            this.slideshowTimeout = null, vk.rtl ? this.indexRequired-- : this.indexRequired++, this.serve()
        }.bind(this), this.options.slideshowDuration))
    },
    slideshowStop: function() {
        this.slideshow = !1, this.slideshowTimeout && (clearTimeout(this.slideshowTimeout), this.slideshowTimeout = null)
    },
    addHandler: function() {
        this.init() && (this.removeHandler(), addEvent(document, "mousemove", this.handler.bind(this)))
    },
    removeHandler: function() {
        removeEvent(document, "mousemove", this.handler.bind(this))
    },
    requireIndex: function(t) {
        this.indexRequired = this.getIndex(t || 0), this.serve()
    },
    next: function() {
        if (this.init()) {
            if (!this.options.infinite && this.indexRequired >= this.slides.length - 1) return;
            this.indexRequired++, this.serve()
        }
    },
    last: function() {
        this.indexRequired = this.slides.length - 1, this.serve()
    },
    prev: function() {
        if (this.init()) {
            if (!this.options.infinite && this.indexRequired < 1) return;
            this.indexRequired--, this.serve()
        }
    },
    getIndex: function(t, e) {
        return void 0 !== t ? (t = t % this.slides.length + (0 > t ? this.slides.length : 0), t === this.slides.length ? 0 : t) : (t = (this.offsetInner - this.widthSide) / -this.widthSlide, e ? t : Math.round(t))
    },
    serve: function() {
        if (this.init()) {
            var t = this.getIndex(this.indexRequired),
                e = this.required != t,
                i = -(this.indexRequired * this.widthSlide - (this.widthOuter - this.widthSlide) / 2);
            this.required = t, e && isFunction(this.options.onRequired) && this.options.onRequired(), this.options.infinite || (this.indexRequired = this.required), this.animation.stop(), this.animation = new Fx.Base({
                style: {}
            }, {
                duration: this.options.animationDuration,
                transition: Fx.Transitions.easeOutCubic,
                onComplete: this.served.bind(this),
                onStep: function(t) {
                    this.offsetInner = t.left, setStyle(this.inner, "left", this.offsetInner);
                    var e = this.indexCurrent;
                    this.indexCurrent = this.getIndex(), e !== this.indexCurrent && (this.indexCurrent === this.indexRequired && this.highlight(), this.rearrange(), isFunction(this.options.onChange) && this.options.onChange())
                }.bind(this)
            }), this.animation.start({
                left: this.offsetInner
            }, {
                left: i
            })
        }
    },
    served: function() {
        var t = this.indexCurrent - this.getIndex(this.indexCurrent);
        t > 30 && (this.indexPrev = 0, this.indexNext = this.slides.length - 1, this.indexCurrent -= t, this.indexRequired -= t, this.offsetInner = -(this.indexRequired * this.widthSlide - (this.widthOuter - this.widthSlide) / 2), this.inner.style.left = this.offsetInner + "px", each(this.slides, function(t, e) {
            e.style.left = 0
        }.bind(this))), this.rearrange(), isFunction(this.options.onSlide) && this.options.onSlide(), this.slideshow && this.slideshowStart()
    },
    rearrange: function() {
        if (this.options.infinite) {
            for (; this.indexCurrent >= this.indexNext - this.indexMargin;) index = this.getIndex(this.indexNext), this.slides[index].style.left = (this.indexNext - index) * this.widthSlide + "px", this.indexNext++, this.indexPrev++;
            for (; this.indexCurrent <= this.indexPrev + this.indexMargin;) index = this.getIndex(this.indexPrev), this.slides[index].style.left = (this.indexPrev - index) * this.widthSlide + "px", this.indexPrev--, this.indexNext--
        }
        this.current = this.getIndex(this.indexCurrent), this.slideNext = this.slides[this.options.infinite ? this.getIndex(this.indexCurrent + 1) : this.indexCurrent + 1] || null, this.slidePrev = this.slides[this.options.infinite ? this.getIndex(this.indexCurrent - 1) : this.indexCurrent - 1] || null, this.slideCurrent = this.slides[this.current]
    },
    update: function() {
        this.inited = !1, this.slides = domChildren(this.inner), this.init()
    }
}, window.Apps || (window.Apps = {
    optionHiddenClass: "apps_hidden",
    optionLoadingClass: "loading",
    address: "apps",
    init: function(obj, appTpl) {
        if (extend(cur, {
                module: "apps",
                preventFastBack: !1,
                aTabs: ge("apps_top_tabs"),
                aSubTabs: geByClass1("_apps_top_subtabs"),
                aSearch: ge("s_search"),
                aSearchWrap: ge("apps_search"),
                aWrap: ge("apps_wrap"),
                aSummary: ge("apps_summary"),
                aSummaryCounter: ge("apps_summary_counter"),
                lShowMoreButton: ge("apps_list_show_more"),
                lPreload: ge("apps_list_preload"),
                lContent: ge("apps_list_content"),
                fWrap: ge("apps_feed"),
                fShowMoreButton: ge("apps_feed_show_more"),
                rNotCounter: ge("apps_recent_notifications_counter"),
                rNotWrap: ge("apps_recent_notifications_wrap"),
                rNotNoContent: ge("apps_recent_notifications_no_content"),
                rNotBlackList: ge("apps_recent_notifications_black_list"),
                rNotShowMoreButton: ge("apps_recent_notifications_show_more"),
                rAppsWrap: ge("apps_recent_apps_wrap"),
                rAppsShowMoreButton: ge("apps_recent_more"),
                rAppsNoContent: ge("apps_recent_apps_no_content"),
                onSilentLoad: {},
                apps: {},
                deletedApps: {},
                appTpl: appTpl || function() {
                    return ""
                }
            }), extend(cur, obj), cur.defaultCount = cur.shownApps, "notifications" === nav.objLoc.act && (delete nav.objLoc.act, nav.objLoc.tab = "notifications", nav.setLoc(nav.objLoc)), this.setHistoryBackRules(), this.searchLoadFromAddressBar(), cur.aSearch && (uiSearch["list" === cur.section ? "setFixed" : "setStatic"](cur.aSearch), uiSearch.startEvents(cur.aSearch)), setTimeout(function() {
                this.scrollCheckBinded = this.scrollCheck.bind(this), this.sliderInit(), this.feedInit(), this.notificationsInit(), cur.scrollToHeader && (setTimeout(this.scrollToHeader.bind(this), 100), delete cur.scrollToHeader), cur.scrollToTop && (scrollToTop(), delete cur.scrollToTop), this.startEvents(), cur.destroy.push(function(t) {
                    setTimeout(function() {
                        var e;
                        t.fScrollbar && cur.fScrollbar != t.fScrollbar && (e = !1, globalHistory.forEach(function(i) {
                            i.cur != t && i.cur.fScrollbar == t.fScrollbar && (e = !0)
                        }), e || t.fScrollbar.destroy()), t.rNotScrollbar && cur.rNotScrollbar != t.rNotScrollbar && (e = !1, globalHistory.forEach(function(i) {
                            i.cur != t && i.cur.rNotScrollbar == t.rNotScrollbar && (e = !0)
                        }), e || t.rNotScrollbar.destroy())
                    }, 0)
                }.pbind(cur)), cur.destroy.push(this.stopEvents.bind(this)), cur.aSearch && uiSearch.scrollResize(cur.aSearch)
            }.bind(this), 0), cur.silent_mode) {
            cur.silent = !0, cur.preload && (cur.leavePreloadedHeader || delete cur.preload.header, cur.leavePreloadedBefore || delete cur.preload.before);
            var query = {
                    act: "load_apps_silent",
                    gid: cur.gid,
                    oid: cur.oid,
                    header: cur.leavePreloadedHeader ? 0 : 1,
                    before: cur.leavePreloadedBefore ? 0 : 1,
                    section: cur.section,
                    preload: 1,
                    preloaded: []
                },
                prop = null;
            for (prop in cur.preload || {}) query.preloaded.push(prop);
            ajax.post(this.address, query, {
                cache: 1,
                local: 1,
                onDone: this.withFastBackCheck(function(data, opts, preload, preload_before, preload_header) {
                    return opts && (opts = eval("(" + opts + ")"), extend(opts.lang, cur.lang || {}), extend(cur, opts)), cur.preload = extend(cur.preload || {}, preload), cur.preload.before = preload_before, cur.preload.header = preload_header,
                        (data = eval("(" + data + ")")) ? (void 0 === cur.searchOffset && (cur.searchOffset = 0), cur.curList = "all", cur.appsList = data[cur.curList] ? data : {
                            all: []
                        }, cur.sectionCount = this.isSection("catalog", "list") && !cur.searchStr ? 0 : cur.appsList[cur.curList].length, void this.indexAll(function() {
                            if (cur.silent = !1, cur.onSilentLoad)
                                for (var t in cur.onSilentLoad) isFunction(cur.onSilentLoad[t]) && cur.onSilentLoad[t]()
                        })) : cur.silent = !1
                }.bind(this))
            })
        }
    },
    withFastBackCheck: function(t) {
        cur.preventFastBack = !0;
        var e = cur;
        return function() {
            cur === e && (cur.preventFastBack = !1, t.apply(this, Array.prototype.slice.call(arguments)))
        }
    },
    startEvents: function() {
        addEvent(window, "scroll", this.scrollCheckBinded), addEvent(window, "resize", this.scrollCheckBinded), this.initUpdates(), this.scrollCheck(), this.sliderStart()
    },
    stopEvents: function() {
        removeEvent(window, "scroll", this.scrollCheckBinded), removeEvent(window, "resize", this.scrollCheckBinded), this.stopUpdates(), this.sliderStop()
    },
    isSection: function() {
        for (var t = arguments.length; t--;)
            if (arguments[t] === cur.section) return !0;
        return !1
    },
    isDelayedOnSilentLoad: function t(e, i) {
        return cur.silent ? (t.count = t.count || 0, t.count++, cur.onSilentLoad[e || "key_" + t.count] = i, !0) : void 0
    },
    handlePageCount: function(t) {
        return handlePageCount("ap", t)
    },
    incomingCall: function(t) {
        stManager.add(["notifier.js", "notifier.css", "apps.css", "call.css"], function() {
            var e = se('<div><div class="call_apps_wrap clear_fix">' + t + "</div></div>"),
                i = geByClass1("call_invitation_wrap", e, "div"),
                o = {
                    movable: i,
                    startLeft: parseInt((window.innerWidth - 224) / 2) + "px",
                    startTop: parseInt((window.innerHeight - 404) / 2) + "px",
                    startWidth: 224,
                    startHeight: 404,
                    resize: !1,
                    onBeforeHide: function() {},
                    onDragEnd: function(t, e) {},
                    onResize: function(t, e) {}
                };
            Apps.appCall && Apps.appCall.close(), Apps.appCall = new RBox(e, o)
        }), window.Notifier && Notifier.setRecvClbk("apps_call_hide", function() {
            Apps.appCall && (Apps.appCall.close(), Apps.appCall = !1)
        })
    },
    callApprove: function(t) {
        window.Notifier && Notifier.lcSend("apps_call_hide", (new Date).getTime()), Apps.appCall && (Apps.appCall.close(), Apps.appCall = !1), nav.go(t)
    },
    callReject: function() {
        window.Notifier && Notifier.lcSend("apps_call_hide", (new Date).getTime()), Apps.callOnReject()
    },
    callOnReject: function() {
        Apps.appCall && (Apps.appCall.close(), Apps.appCall = !1), ajax.post("/al_apps.php", {
            act: "do_call_reject"
        }, {
            onDone: function() {}
        })
    },
    editBlacklist: function() {
        return showBox(this.address, {
            act: "blacklist_box",
            height: lastWindowHeight
        }, {
            stat: ["privacy.css", "indexer.js"]
        }), !1
    },
    blacklistInit: function(t, e, i) {
        function o() {
            if (a.scrollTop > 0 ? addClass(t.bodyNode.parentNode, "olist_topsh") : removeClass(t.bodyNode.parentNode, "olist_topsh"), a.scrollTop + (a.offsetHeight || a.clientHeight) < r.scrollHeight ? addClass(t.bodyNode.parentNode, "olist_botsh") : removeClass(t.bodyNode.parentNode, "olist_botsh"), c && c.offsetTop && c.onclick) {
                var e = c.offsetTop,
                    i = r.scrollTop,
                    o = r.offsetHeight || r.clientHeight;
                i + o + 100 >= e && c.onclick()
            }
        }

        function s(i) {
            var o = i.originalTarget || i.target;
            if (hasClass(o, "olist_item_wrap") || (o = gpeByClass("olist_item_wrap", o)), o && o != bodyNode) {
                if (hasClass(o, "olist_item_loading")) return cancelEvent(i);
                if (checkEvent(i)) return !0;
                t.changed = !0;
                var s = o.id.match(/-?\d+/)[0],
                    n = l[s],
                    a = !1;
                return each(e, function() {
                    return this[0] == s ? (a = this[4], !1) : void 0
                }), ajax.post("/al_apps.php", {
                    act: "a_blacklist_delete",
                    cancel: n ? 1 : 0,
                    owner_id: s,
                    hash: a
                }, {
                    onDone: function() {
                        toggleClass(o, "olist_item_wrap_on", !n), l[s] = !n
                    },
                    showProgress: function() {
                        addClass(o, "olist_item_loading")
                    },
                    hideProgress: function() {
                        removeClass(o, "olist_item_loading")
                    }
                }), r.scrollTop < 50 && setTimeout(function() {
                    elfocus(d), val(d).length && d.select()
                }, 100), cancelEvent(i)
            }
        }

        function n(o, s) {
            s = s || 0;
            var a, d, u = s ? 60 : 120;
            o && (o = clean(o).replace(/\u2013|\u2014/g, "-")), a = o ? p.search(o) : e, d = i.tpl;
            var h = a.length;
            a = a.slice(s, s + u);
            var f = [];
            if (o) {
                var g = escapeRE(o),
                    v = parseLatin(o);
                null != v && (g = g + "|" + escapeRE(v));
                var _ = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + g + "))(?![^<>]*>)(?![^&;]+;)", "gi")
            }
            var w = function(t, e, i, o) {
                var s = (i[t[0]], t[1]);
                if (e) {
                    s = -1 == e.indexOf(" ") ? s.split(" ") : [s];
                    var n = "";
                    for (var a in s) n += (a > 0 ? " " : "") + s[a].replace(o, "$2<em>$3</em>");
                    s = n
                }
                return {
                    id: t[0],
                    name: s,
                    photo: t[2],
                    link: t[3] || (t[0] > 0 ? "id" + t[0] : "app" + (-t[0] + 1e9))
                }
            };
            each(a, function() {
                f.push(rs(d, w(this, o, l, _)))
            }), s || f.length || f.push('<div class="no_rows">' + (o ? getLang("global_search_not_found").replace("{search}", clean(o)) : i.lang.apps_blacklist_empty) + "</div>"), re(c), f = f.join(" "), s ? r.appendChild(cf(f)) : val(r, f), h > s + u && (r.appendChild(c), c.onclick = function(t) {
                return n(o, s + u), cancelEvent(t)
            }), t && t.scroll && t.scroll.update(!1, !0)
        }
        i = i || {};
        var a = geByClass1("apps_blacklist_wrap", t.bodyNode),
            r = geByClass1("apps_blacklist", t.bodyNode),
            c = geByClass1("olist_more", t.bodyNode, "a"),
            l = {},
            p = new vkIndexer(e, function(t) {
                return t[1]
            });
        t.setOptions({
            width: 560,
            bodyStyle: "padding: 0px"
        }), t.removeButtons().addButton(getLang("global_close"), function() {
            t.hide(200)
        }, "yes"), r.parentNode.style.height = i.boxHeight + "px";
        var d = ge("apps_blacklist_filter");
        i.nofocus || setTimeout(elfocus.pbind(d), 100);
        var u = data(d, "opts");
        data(d, "opts", extend(u, {
            onChange: n
        })), c && (isVisible(c) ? c.onclick = function(t) {
            return n("", 60), cancelEvent(t)
        } : (re(c), show(c))), addEvent(r, "click", s), addEvent(a, "scroll", o), setTimeout(o, 10)
    },
    initDescription: function(t) {
        var e = geByClass1("apps_i_description_content");
        val(e, t);
        var i = parseInt(getStyle(e, "line-height")),
            o = Math.ceil(getSize(e)[1] / i);
        o > 7 && (setStyle(e, "height", 5 * i), val(e, t), removeClass(geByClass1("apps_i_description_show_more"), this.optionHiddenClass))
    },
    showFullDescription: function() {
        addClass(geByClass1("apps_i_description_show_more"), this.optionHiddenClass), setStyle(geByClass1("apps_i_description_content"), "height", "")
    },
    appSsSliderNext: function() {
        cur.appSsSlider && cur.appSsSlider.next()
    },
    adjustRunBoxSize: function(t) {
        if (t) {
            var e = getSize(t),
                i = {
                    marginTop: -e[1] / 2
                };
            i[vk.rtl ? "marginRight" : "marginLeft"] = -e[0] / 2, setStyle(t, i)
        }
    },
    initAppSsSlider: function() {
        var t = ge("apps_i_slider_next"),
            e = ge("apps_i_slider_prev"),
            i = ge("apps_i_slider_outer"),
            o = ge("apps_i_slider_thumbs"),
            s = o ? domPN(o) : null,
            n = o ? o.children : [],
            a = null,
            r = null,
            c = function() {
                if (o) {
                    var t = s.offsetWidth,
                        e = o.scrollWidth;
                    if (t >= e || !e || !t) return;
                    var i = n[a],
                        c = (o.offsetLeft, i.offsetLeft),
                        l = i.offsetWidth,
                        p = -c + (t - l) / 2;
                    p = Math.max(-e + t, Math.min(0, p)), r && r.stop(), r = animate(o, {
                        left: p
                    }, {
                        duration: cur.appSsSlider.options.animationDuration,
                        transition: Fx.Transitions.easeOutCubic
                    })
                }
            },
            l = function(t) {
                o && t !== a && (null !== a && removeClass(n[a], "selected"), a = t, addClass(n[a], "selected"), c())
            };
        if (onRequired = function() {
                l(null !== cur.appSsSlider.required ? cur.appSsSlider.required : cur.appSsSlider.current)
            }, onChange = function() {
                cur.appSsSlider.slideNext ? addClass(t, "apps_i_slider_available") : removeClass(t, "apps_i_slider_available"), cur.appSsSlider.slidePrev ? addClass(e, "apps_i_slider_available") : removeClass(e, "apps_i_slider_available"), hasClass(cur.appSsSlider.slideCurrent, "apps_promo_video_slide") ? addClass(i, "apps_i_slider_video") : removeClass(i, "apps_i_slider_video"), cur.appSsSlider.slideNext ? removeClass(i, "apps_i_slider_run") : addClass(i, "apps_i_slider_run")
            }, cur.appSsSlider = new AppsSlider({
                inner: ge("apps_i_slider_inner"),
                outer: i,
                next: t,
                prev: e,
                onChange: onChange,
                onRequired: onRequired,
                infinite: !1
            }), onChange(), onRequired(), this.adjustRunBoxSize(ge("apps_i_run_box")), each(n, function(t, e) {
                var i = new Image;
                i.onload = c, i.src = geByTag1("img", e).src, addEvent(e, "click", function() {
                    cur.appSsSlider && cur.appSsSlider.requireIndex(t)
                })
            }), cur.promoVideo) {
            var p = ge("apps_promo_video_thumb");
            p && showInlineVideo(cur.promoVideo, "", {
                autoplay: 1,
                module: "app_promo",
                addParams: {
                    from_autoplay: 1
                }
            }, null, p)
        }
    },
    showWinInstructions: function(t, e, i) {
        setTimeout(function() {
            new MessageBox({
                width: 800,
                title: cur.winInstrTitle,
                hideButtons: !0,
                containerClass: "apps_win_instr_wrap"
            }).content(rs(trim(cur.winInstrTpl), {
                download_link: e,
                help_link: i
            })).show()
        }.bind(this), 500)
    },
    sendInstallRequest: function(t, e, i, o, s, n) {
        var a = !!geByClass1("apps_install_header");
        if (t && !isButtonLocked(t) && !hasClass(t, "button_disabled")) {
            lockButton(t);
            var r = getSize(t);
            e ? ajax.post(this.address, {
                act: "send_install_request",
                aid: i,
                ref: o,
                cid: s,
                hash: n
            }, {
                hideProgress: function() {
                    var e = getLang("apps_install_push_sent_msg");
                    unlockButton(t), addClass(t, "button_disabled"), setStyle(t, "width", r[0]), val(t, e);
                    var i = ge("apps_i_run_box");
                    addClass(i, "sent"), val(i, e), this.adjustRunBoxSize(i)
                }.bind(this)
            }) : (cur.ref = o, ajax.post(this.address, {
                act: "send_install_request_box",
                aid: i
            }, {
                onDone: function(e, s, n) {
                    if (unlockButton(t), s) {
                        cur.lang || (cur.lang = {}), extend(cur.lang, e);
                        var r = new MessageBox({
                            title: getLang("apps_get_push_w_install_link")
                        });
                        r.removeButtons(), r.content(s), r.addButton(getLang("apps_install_sms_send"), function(e) {
                            if (t = ge("apps_i_request_btn") || t, e && t && !isButtonLocked(e)) {
                                var s = getSize(t);
                                lockButton(e), ajax.post(this.address, {
                                    act: "send_install_request",
                                    ref: o,
                                    aid: i,
                                    cid: -3,
                                    hash: n
                                }, {
                                    onFail: function(t) {
                                        if (t) {
                                            var i = ge("app_sms_tt_error");
                                            val(i, t), show(i), unlockButton(e)
                                        }
                                    },
                                    onDone: function() {
                                        this.ttDestroyAll(), r.hide();
                                        var i = getLang("apps_install_push_sent_msg");
                                        unlockButton(e), addClass(t, "button_disabled"), a || setStyle(t, "width", s[0]), val(t, i);
                                        var o = ge("apps_i_run_box");
                                        addClass(o, "sent"), val(o, i), this.adjustRunBoxSize(o)
                                    }.bind(this)
                                })
                            }
                        }.bind(this), "yes"), r.addButton(getLang("global_cancel"), r.hide, "no"), r.show()
                    } else showBox("activation.php", {
                        act: "change_phone_box",
                        hash: n
                    })
                }.bind(this)
            }))
        }
    },
    deletingApp: !1,
    showInviteBox: function(t, e) {
        t || (t = cur.app.options.aid, e = cur.app.options.hash), showTabbedBox("al_friends.php", {
            act: "select_friends_box",
            Checked: "",
            invite: 1,
            aid: t,
            from: "apps"
        }, {
            stat: ["privacy.js", "ui_controls.js", "ui_controls.css"],
            cache: 1,
            params: {
                dark: 1
            }
        }), cur.onFlistSave = function(i, o) {
            ajax.post("apps", {
                act: "invite_friends",
                aid: t,
                friends: i.join(","),
                hash: e
            }, {
                onDone: function(t, e) {
                    setTimeout(showFastBox({
                        title: t
                    }, e).hide, 2e3)
                },
                onFail: function(t) {
                    return setTimeout(showFastBox({
                        title: getLang("global_error")
                    }, t).hide, 2e3), !0
                }
            })
        }
    },
    showAppFriends: function(t, e, i) {
        var o = showBox(Apps.address, {
            act: "show_app_friends_box",
            aid: t
        }, {
            cache: 1,
            dark: 1,
            params: {
                width: "400px",
                bodyStyle: "padding: 0px"
            },
            onDone: function() {
                new uiScroll("apps_friendslist")
            }
        }, e);
        return o.setControlsText('<a href="" onclick="Apps.showInviteBox(' + t + ", '" + i + "'); return false;\">" + getLang("apps_invite_friends") + "</a>"), o
    },
    recountAddVotes: function(t) {
        var e = t.value.replace(/[^0-9]/g, "");
        val("add_votes", langNumeric(e, votes_flex)), e > 0 && ge("app_pay_withdraw") && (ge("app_pay_withdraw").value = 0, this.recountWithdrawVotes(ge("app_pay_withdraw")))
    },
    recountWithdrawVotes: function(t) {
        var e = t.value.replace(/[^0-9]/g, "");
        val("withdraw_votes", langNumeric(e, votes_flex)), e > 0 && (ge("app_pay_add").value = 0, this.recountAddVotes(ge("app_pay_add")))
    },
    initAppView: function(t, e) {
        e.layer || cur.nav.push(function(t, e, i, o) {
            return void 0 !== t[0] || t.join || o.pass ? void 0 : t["#"] ? (cur.app.onLocChanged(t["#"]), o.back ? 3 != vk.al && nav.setLoc(i) : nav.setLoc(i), !1) : (nav.setLoc(i), !1)
        });
        var i = function(t) {
            "block" == t.type ? cur.app.runCallback("onWindowBlur") : cur.app.runCallback("onWindowFocus")
        };
        cur.app.onReady.push(function() {
            cur.app.onLocChanged(t.hash), addEvent(document, "block unblock", i, !0), cur.destroy.push(function() {
                removeEvent(document, "block unblock", i)
            })
        }), e.icon && (setFavIcon(e.icon), cur.destroy.push(function() {
            setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico")
        }))
    },
    loadSettings: function(t) {
        ajax.post(this.address, {
            act: "show_settings",
            aid: cur.aid
        }, extend({
            cache: 1
        }, t))
    },
    showSettings: function() {
        this.ttHideAll(), cur.settShown ? (scrollToTop(200), cur.settShown = !1, delete ajaxCache["/apps#act=show_settings&aid=" + cur.aid]) : showBox(this.address, {
            act: "show_settings",
            aid: cur.aid
        }, {
            params: {
                dark: 1
            }
        })
    },
    saveSettings: function(t, e, i, o) {
        if (!cur.savingSettings) {
            i || (o && o.btn && lockButton(o.btn), show("apps_settings_progress"));
            var s = curBox(),
                n = ge("app_pay_add"),
                a = ge("app_pay_withdraw"),
                r = {
                    act: "save_settings",
                    aid: t,
                    hash: e,
                    from: "appview",
                    app_settings_1: isChecked("app_settings_1"),
                    app_settings_256: isChecked("app_settings_256"),
                    add: n ? n.value : 0,
                    withdraw: a ? a.value : 0,
                    only_checkboxes: i ? 1 : 0,
                    cur_aid: cur.aid
                };
            isVisible("app_settings_2097152") && (r.app_settings_2097152 = isChecked("app_settings_2097152")), ajax.post("apps", r, extend({
                onDone: function(t) {
                    o && o.btn && unlockButton(o.btn), t.left_nav && this.updateLeftNav(t.left_nav), !i && cur.app && cur.app.runCallback("onSettingsChanged", t.settings), cur.settingsOnLoad = !1, void 0 !== t.coins && cur.app && cur.app.balanceUpdated(t.coins), void 0 !== t.balance && updateMoney(t.balance), s && !i && s.hide(), Apps.addToMenuErrorResolve(t, function(t) {
                        i && checkbox("app_settings_256", 256 & t.settings)
                    }), this.updateAddToMenuAction()
                }.bind(this),
                onFail: function(t) {
                    t && val("apps_settings_error", t), show("apps_settings_error"), hide("apps_settings_progress"), scrollToTop(200)
                },
                showProgress: function() {
                    cur.savingSettings = !0, s && s.showProgress()
                },
                hideProgress: function() {
                    cur.savingSettings = !1, s && s.hideProgress()
                }
            }, o || {}))
        }
    },
    updateAddToMenuAction: function() {
        var t = ge("app_add_to_menu_action");
        if (t && cur.aid && cur.app && cur.app.options) {
            var e = ge("l_app" + cur.aid);
            actionsMenuItemLocked(t) && unlockActionsMenuItem(t), t.setAttribute("onclick", "return Apps.addToMenu(" + cur.aid + ", '" + cur.app.options.hash + "', " + intval(!e) + ", this);"), val(t, e ? getLang("apps_remove_from_left_menu") : getLang("apps_add_to_left_menu"))
        }
    },
    addToMenu: function(t, e, i, o) {
        actionsMenuItemLocked(o) || ajax.post("al_apps.php", {
            act: "a_left_menu",
            aid: t,
            hash: e,
            show: i
        }, {
            onDone: function(t) {
                this.updateLeftNav(t.left_nav), this.updateAddToMenuAction(), Apps.addToMenuErrorResolve(t)
            }.bind(this),
            showProgress: lockActionsMenuItem.pbind(o),
            hideProgress: unlockActionsMenuItem.pbind(o)
        })
    },
    addToMenuErrorResolve: function(t, e) {
        t.left_nav_error ? window.menuSettings && cur.app ? (cur.settingsBoxSetLeftMenuAppCallback = function(i) {
            delete cur.settingsBoxSetLeftMenuAppCallback, !i || 256 & t.settings || (t.settings += 256), isFunction(e) && e(t)
        }, showTabbedBox("al_settings.php", {
            act: "menu_box",
            type: 2,
            aid: cur.aid
        })) : (showFastBox({
            title: getLang("global_error")
        }, t.left_nav_error), isFunction(e) && e(t)) : isFunction(e) && e(t)
    },
    showAppSettings: function(t, e) {
        this.ttHideAll(), e ? showBox(this.address, {
            act: "settings_box_info",
            aid: t
        }, {
            params: {
                dark: 1
            }
        }) : showBox(this.address, {
            act: "settings_box",
            aid: t,
            mask: 0,
            main: 1
        }, {
            params: {
                dark: 1
            }
        })
    },
    updateOnline: function() {
        ajax.post(Apps.address, {
            act: "update_online",
            aid: cur.aid,
            hash: cur.app.options.hash
        }, {
            ads: 1
        })
    },
    updateOffline: function(t) {
        ajax.post(Apps.address, {
            act: "update_offline",
            aid: (t || cur).aid,
            hash: (t || cur).app.options.hash
        })
    },
    deleteApp: function(t, e, i, o) {
        if (!this.deletingApp) {
            this.deletingApp = !0;
            var s = function(i, o, s, n) {
                ajax.post(this.address, {
                    act: "quit",
                    id: t,
                    hash: e || cur.app.options.hash,
                    from: "app"
                }, {
                    onDone: this.withFastBackCheck(function(t) {
                        this.deletingApp = !1, window.appsListChanged = !0, this.notificationsSetCounters(t.count_all), t.left_nav && this.updateLeftNav(t.left_nav), cur._back = !1, i.apply(null, [].slice.call(arguments))
                    }.bind(this)),
                    onFail: this.withFastBackCheck(function() {
                        this.deletingApp = !1, o.apply(null, [].slice.call(arguments))
                    }.bind(this)),
                    showProgress: s,
                    hideProgress: n
                })
            }.bind(this);
            switch (o) {
                case "appactions":
                    s(function() {
                        nav.go("/apps", !1)
                    }, function(t) {
                        t && showFastBox({
                            title: getLang("global_error")
                        }, t), unlockActionsMenuItem(i)
                    }, lockActionsMenuItem.pbind(i));
                    break;
                default:
                    var n = curBox();
                    s(function() {
                        nav.go("/apps", !1)
                    }, function(t) {
                        if (t) {
                            var e = ge("apps_settings_error");
                            val(e, t), show(e), scrollToTop()
                        }
                        n && n.hideProgress()
                    }, function() {
                        n && n.showProgress()
                    })
            }
        }
    },
    reportApp: function(t, e) {
        showBox("al_reports.php", {
            act: "report_app_box",
            app_id: t,
            place_id: e
        }, {
            params: {
                dark: 1
            },
            stat: ["ui_controls.js", "ui_controls.css"]
        })
    },
    cancelInstall: function() {
        nav.go("/apps", !1)
    },
    approveInstall: function(t, e, i) {
        i && actionsMenuItemLocked(i) || (i && lockActionsMenuItem(i), window.appsListChanged = 1, nav.go(extend(nav.objLoc, {
            join: 1,
            hash: t,
            sett: e,
            notify: isChecked("apps_notifications_checkbox") && isVisible("apps_notifications_checkbox") ? 1 : void 0
        }), !1, {
            pass: !0
        }))
    },
    installApp: function(t, e, i) {
        ajax.post(Apps.address, {
            act: "do_install",
            aid: t,
            hash: e
        }, {
            onDone: function(t) {
                t == cur && (Apps.onAppAdded(), i && i())
            }.pbind(cur)
        })
    },
    onAppAdded: function() {
        window.appsListChanged = !0, cur.preload && delete cur.preload.before, cur.app && (cur.app.runCallback("onApplicationAdded"), cur.appUser = !0, hide("apps_install_btn"), show("apps_show_settings"))
    },
    rateOver: function(t) {
        var e = !!geByClass1("apps_install_header");
        cur.rated || hasClass(t, "not_installed") || addClass(t, "over");
        var i = "",
            o = [],
            s = 0,
            n = [cur.installPage ? -70 : -66, 0, -36],
            a = "left",
            r = 15,
            c = 0,
            l = cur.appUser ? cur.userRate ? getLang("apps_you_voted") : getLang("apps_you_not_voted") : getLang("apps_rating_title"),
            p = rs(cur.rateStatsLabelTpl, {
                label: l
            });
        for (var d in cur.rateStats || {}) s += intval(cur.rateStats[d]);
        val("app_rate_label", l);
        for (var u = 1; 5 >= u; u++) {
            i += '<span class="app_rate stats fl_r"></span>';
            var h = intval(cur.rateStats[u]),
                f = s ? intval(100 * h / s) : 0,
                g = langNumeric(h, "%s", !0),
                v = cur.userRate != 10 * u && cur.userRate ? "" : "my";
            o.push(rs(cur.rateStatsRowTpl, {
                id: "apps_rate_row" + u,
                stars: i,
                count: g,
                percent: f,
                classname: v
            }));
            var _ = ge("apps_rate_row" + u);
            _ && (setStyle(geByClass1("app_rate_bg", _), {
                width: f + "%"
            }), val(geByClass1("app_rate_percent", _), f + "%"), val(geByClass1("app_rate_cnt", _), g), geByClass1("app_rate_stars", _).className = "app_rate_stars fl_l " + v)
        }
        p += o.reverse().join(""), e && (a = "top", n = [210, 0, 10], r = 0, c = 15), showTooltip(t, {
            text: p,
            slideX: r,
            slide: c,
            className: "app_rate_tt",
            shift: n,
            forcetodown: !0,
            dir: a,
            hasover: 1
        })
    },
    rateOut: function(t) {
        Apps.showRate(), removeClass(t, "over")
    },
    rateApp: function(t) {
        if (cur.rated) return !1;
        var e = ge("apps_ratings");
        cur.appRate = cur.userRate = t, Apps.rateOut(e), cur.rated = !0, ajax.post("/al_apps.php", {
            act: "rate_app",
            aid: cur.aid,
            rate: t,
            hash: cur.rate_hash
        }, {
            onDone: function(t) {
                cur.rateStats = t, Apps.rateOver(e)
            }
        })
    },
    showRate: function(t) {
        if (cur.rated) return !1;
        var e = intval(cur.appRate || 0),
            i = geByClass("app_rate", ge("apps_ratings")),
            o = Math.floor((e + 2) / 10),
            s = Math.floor((e + 2) / 5) - o;
        for (var n in i) {
            var a = "app_rate fl_l " + (o > n ? "full" : s > n ? "half" : "empty");
            i[n].className = a
        }
        if (t) {
            var r = Math.floor(t / 10);
            for (var n in i) {
                if (n >= r) break;
                i[n].className += " over"
            }
        }
    },
    recentTabsUpdate: function(needApps, needNotifications) {
        if (cur.rAppsWrap && cur.rNotWrap) {
            if (needApps = window.appsListChanged || needApps, needNotifications = window.notificationsListChanged || needNotifications, delete window.appsListChanged, delete window.notificationsListChanged, !needApps && !needNotifications) return;
            ajax.post(this.address, {
                act: "update_recent",
                notifications: needNotifications,
                apps: needApps,
                hash: cur.recentUpdateHash
            }, {
                onDone: this.withFastBackCheck(function(apps, notifications) {
                    if (apps && (each(geByClass("apps_recent_row", cur.rAppsWrap), function(t, e) {
                            re(e)
                        }), apps[0] ? (show(cur.rAppsShowMoreButton), hide(cur.rAppsNoContent), domInsertBefore(cf(apps[0]), cur.rAppsShowMoreButton)) : (hide(cur.rAppsShowMoreButton), show(cur.rAppsNoContent)), cur.recentOffset = apps[1], apps[2])) {
                        apps[2] = eval("(" + apps[2] + ")");
                        for (var i in apps[2]) cur.apps[apps[2][i][0]] = apps[2][i]
                    }
                    if (notifications) {
                        each(geByClass("apps_notification_row", cur.rNotWrap), function(t, e) {
                            re(e)
                        });
                        var tab = ge("apps-recent-notifications-tab");
                        notifications[0] ? ((notifications[2] ? hide : show)(cur.rNotShowMoreButton), show(tab), hide(cur.rNotNoContent), domInsertBefore(cf(notifications[0]), cur.rNotShowMoreButton)) : (hide(cur.rNotShowMoreButton), show(cur.rNotNoContent), "notifications" != nav.objLoc.tab && hide(tab)), cur.notificationsOffset = notifications[1], cur.notificationsNewest = notifications[4], this.notificationsSetCounters(notifications[3]), this.notificationsInit()
                    }
                    this.ttDestroyAll()
                }.bind(this)),
                showProgress: function() {
                    needApps && addClass(cur.rAppsWrap, this.optionLoadingClass), needNotifications && addClass(domPN(cur.rNotWrap), this.optionLoadingClass)
                },
                hideProgress: this.withFastBackCheck(function() {
                    needApps && removeClass(cur.rAppsWrap, this.optionLoadingClass), needNotifications && removeClass(domPN(cur.rNotWrap), this.optionLoadingClass)
                }.bind(this))
            })
        }
    },
    optionNotificationsReadTimeout: 1e3,
    notificationsReadTimeout: null,
    notificationsRemovedCount: 0,
    notificationTabSelect: function() {
        nav.objLoc.tab = "notifications", nav.setLoc(nav.objLoc), removeClass(cur.rNotBlackList, this.optionHiddenClass), cur.rNotScrollbar && cur.rNotScrollbar.update(), this.notificationsReadContent()
    },
    notificationsInit: function() {
        cur.rNotWrap && cur.notificationsOffset && !cur.rNotScrollbar ? (this.notificationsRemovedCount = 0, cur.rNotScrollbar = new uiScroll(cur.rNotWrap, {
            autoresize: !1,
            global: !0,
            onmore: this.notificationsLoadContent.bind(this),
            onscroll: this.notificationsReadContent.bind(this)
        }), this.notificationsReadContent()) : cur.rNotWrap && cur.rNotScrollbar && (cur.rNotScrollbar.update(), this.notificationsReadContent())
    },
    notificationsMarkReaded: function(t) {
        t.removeAttribute("data-read"), removeClass(t, "apps_notification_row_new")
    },
    notificationsReadContent: function() {
        "notifications" === nav.objLoc.tab && (this.notificationsReadTimeout && clearTimeout(this.notificationsReadTimeout), this.notificationsReadTimeout = setTimeout(function() {
            var t = [],
                e = [];
            each(cur.rNotWrap.querySelectorAll('div[data-read="1"]'), function(i, o) {
                o.offsetTop + o.offsetHeight / 2 <= cur.rNotScrollbar.data.scrollTop + cur.rNotScrollbar.data.viewportHeight && (t.push(o.getAttribute("data-id")), e.push(o))
            }), t.length && ajax.post(this.address, {
                act: "a_mark",
                newest: cur.notificationsNewest,
                notif_ids: t.join(","),
                hash: cur.notificationsHash
            }, {
                onDone: this.withFastBackCheck(function(t) {
                    this.notificationsSetCounters(t), each(e, function(t, e) {
                        this.notificationsMarkReaded(e)
                    }.bind(this))
                }.bind(this))
            })
        }.bind(this), this.optionNotificationsReadTimeout))
    },
    notificationsLoadContent: function() {
        isVisible(cur.rNotShowMoreButton) && !isButtonLocked(cur.rNotShowMoreButton) && (lockButton(cur.rNotShowMoreButton), ajax.post(this.address, {
            act: "more_notifications",
            offset: cur.notificationsOffset,
            hash: cur.notificationsHash
        }, {
            onDone: this.withFastBackCheck(function(t, e, i) {
                unlockButton(cur.rNotShowMoreButton), cur.notificationsOffset = e, t && cur.rNotShowMoreButton && cur.rNotShowMoreButton.parentNode.insertBefore(cf(t), cur.rNotShowMoreButton), i && hide(cur.rNotShowMoreButton), cur.rNotScrollbar.update()
            }),
            onFail: this.withFastBackCheck(function() {
                hide(cur.rNotShowMoreButton)
            })
        }))
    },
    notificationsRemoveAll: function(t, e, i, o, s) {
        if (!linkLocked(t) && !checkEvent(s)) {
            var n = showFastBox({
                title: e
            }, i, getLang("global_delete"), function(e) {
                ajax.post(this.address, {
                    act: "remove_all_notifications_and_requests",
                    newest: cur.notificationsNewest,
                    hash: o
                }, {
                    onDone: this.withFastBackCheck(function() {
                        each(geByClass("apps_notification_row", cur.rNotWrap), function(t, e) {
                            re(e)
                        }), hide(cur.rNotShowMoreButton), show(cur.rNotNoContent), this.notificationsSetCounters(0), cur.rNotScrollbar && cur.rNotScrollbar.update()
                    }.bind(this)),
                    showProgress: function() {
                        lockButton(e), lockLink(t)
                    },
                    hideProgress: this.withFastBackCheck(function() {
                        unlockButton(e), unlockLink(t), n.hide()
                    })
                })
            }.bind(this), getLang("global_cancel"));
            return !1
        }
    },
    notificationsSetCounters: function(t) {
        if (void 0 !== t && (cur.notificationsNew = t, this.handlePageCount(t), cur.rNotCounter)) {
            var e = 1e3 > t ? t + "" : ".." + (t + "").substr(-3);
            t && removeClass(cur.rNotCounter, this.optionHiddenClass), t ? removeClass(cur.rNotCounter, "ui_tab_count_hidden") : addClass(cur.rNotCounter, "ui_tab_count_hidden"), animateCount(cur.rNotCounter, e, {
                str: e,
                onDone: t ? void 0 : addClass.pbind(cur.rNotCounter, this.optionHiddenClass)
            })
        }
    },
    rejectRequest: function(t, e, i, o) {
        if (!buttonLocked(t)) {
            var s = ge("apps_notification_" + e);
            this.notificationsMarkReaded(s), data(s, "html", s.innerHTML), setStyle(s, {
                minHeight: getSize(s)[1]
            }), ajax.post(this.address, {
                act: "reject_" + o,
                newest: cur.notificationsNewest,
                rid: e,
                hash: i
            }, {
                onDone: this.withFastBackCheck(function(t, e, i) {
                    e = cf(trim(e)), this.notificationsRemovedCount++ > 1 && domFC(e).appendChild(cf(cur.notificationsRemoveAllTpl || "")), val(t, ""), t.appendChild(e), addClass(t, "apps_notification_service"), this.notificationsSetCounters(i), cur.rNotScrollbar.update()
                }.bind(this, s)),
                showProgress: lockButton.pbind(t),
                hideProgress: this.withFastBackCheck(unlockButton.pbind(t))
            }), cur.rNotScrollbar.update(), cur.preload && delete cur.preload.before
        }
    },
    requestsRestore: function(t, e, i) {
        if (!linkLocked(t)) {
            var o = ge("apps_notification_" + e);
            ajax.post(this.address, {
                act: "request_restore",
                newest: cur.notificationsNewest,
                rid: e,
                hash: i
            }, {
                onDone: this.withFastBackCheck(function(t, e) {
                    this.notificationsRemovedCount--, val(t, data(t, "html")), removeClass(t, "apps_notification_service"), setStyle(t, {
                        minHeight: ""
                    }), this.notificationsSetCounters(e), cur.rNotScrollbar.update()
                }.bind(this, o)),
                showProgress: lockLink.pbind(t),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(t))
            }), cur.rNotScrollbar.update(), cur.preload && delete cur.preload.before
        }
    },
    deleteNotification: function(t, e, i, o) {
        if (!buttonLocked(t)) {
            var s = ge("apps_notification_" + e);
            setStyle(s, {
                minHeight: getSize(s)[1]
            }), ajax.post(this.address, {
                act: "delete_notification",
                newest: cur.notificationsNewest,
                nid: e,
                aid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(t, e, i) {
                    e = cf(trim(e)), this.notificationsRemovedCount++ > 1 && domFC(e).appendChild(cf(cur.notificationsRemoveAllTpl || "")), val(t, ""), t.appendChild(e), addClass(t, "apps_notification_service"), this.notificationsSetCounters(i)
                }.bind(this, s)),
                showProgress: lockButton.pbind(t),
                hideProgress: this.withFastBackCheck(unlockButton.pbind(t))
            })
        }
    },
    denyNotifications: function(t, e, i, o) {
        if (!linkLocked(t)) {
            var s = ge("apps_notification_" + e);
            setStyle(s, {
                minHeight: getSize(s)[1]
            }), ajax.post(this.address, {
                act: "deny_notifications",
                aid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(t, e) {
                    addClass(t, "apps_notification_service"), e && val(t, e)
                }.pbind(s)),
                showProgress: lockLink.pbind(t),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(t))
            })
        }
    },
    requestsBanUser: function(t, e, i, o) {
        if (!linkLocked(t)) {
            var s = ge("apps_notification_" + e);
            setStyle(s, {
                minHeight: getSize(s)[1]
            }), ajax.post(this.address, {
                act: "request_ban_user",
                mid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(t, e) {
                    addClass(t, "apps_notification_service"), e && val(t, e)
                }.pbind(s)),
                showProgress: lockLink.pbind(t),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(t))
            })
        }
    },
    removingApp: !1,
    restoringApp: !1,
    appsTabSelect: function(t) {
        delete nav.objLoc.tab, nav.setLoc(nav.objLoc), addClass(cur.rNotBlackList, this.optionHiddenClass)
    },
    updateLeftNav: function(t) {
        t && val(geByTag1("ol", ge("side_bar")), t)
    },
    restoreApp: function(t, e, i) {
        if (this.restoringApp) return !1;
        var o = ge("app" + t);
        return cur.deletedApps[t] && "al_apps" == cur.deletedApps[t].from && val(geByClass1("app_deleted_layer", o, "div"), cur.progressTpl), ajax.post(this.address, {
            act: "join",
            gid: cur.gid,
            gidhash: i,
            id: t,
            hash: e,
            restore: 1,
            from: "al_apps",
            section: cur.section
        }, {
            onDone: this.withFastBackCheck(function(e) {
                cur.deletedApps[t] && (val(o, cur.deletedApps[t].html), e.left_nav && this.updateLeftNav(e.left_nav), delete cur.deletedApps[t]), cur.apps[t] && (delete cur.apps[t].deleted, cur.appsIndex.add(cur.apps[t])), removeClass(o, "deleted")
            }.bind(this)),
            showProgress: function() {
                this.restoringApp = !0, addClass(o, this.optionLoadingClass)
            }.bind(this),
            hideProgress: this.withFastBackCheck(function() {
                this.restoringApp = !1, removeClass(o, this.optionLoadingClass)
            }.bind(this))
        }), !1
    },
    removeApp: function(t, e, i, o, s) {
        if (o && cancelEvent(o), this.removingApp) return !1;
        if (this.isDelayedOnSilentLoad("removeApp" + t, this.removeApp.bind(this, t, e, i))) return !1;
        this.ttDestroyAll();
        var n = i ? ge("recent" + t) : ge("app" + t),
            a = n && cur.lContent && cur.lContent.contains(n) && this.isSection("settings") ? "settings" : i ? "recent" : "al_apps",
            r = function() {
                if ("al_apps" == a) {
                    var i = n && geByClass1("app_deleted_layer", n, "div");
                    val(i, cur.progressTpl)
                } else if ("recent" == a) var o = cur.rAppsWrap && geByClass1("apps_recent_row_hidden", cur.rAppsWrap);
                ajax.post(this.address, {
                    act: "quit",
                    gid: cur.gid,
                    id: t,
                    hash: e,
                    offset: cur.recentOffset,
                    from: a
                }, {
                    onDone: this.withFastBackCheck(function(e) {
                        "apps" == cur.module && (delete cur.preload, "notifications" != nav.objLoc.tab && cur.rNotWrap && this.isSection("catalog", "list") ? this.recentTabsUpdate(!1, !0) : (window.notificationsListChanged = !0, e.count_all && this.notificationsSetCounters(e.count_all)), window.appsListChanged = !0, cur.apps[t] && (cur.appsIndex.remove(cur.apps[t]), cur.apps[t].deleted = !0), e.left_nav && this.updateLeftNav(e.left_nav), "settings" == a ? (cur.deletedApps[t] = {
                            from: a,
                            html: n.innerHTML
                        }, n && n.appendChild(cf(e.html))) : "recent" == a ? (o && removeClass(o, "apps_recent_row_hidden"), hide(n), e.html && domInsertBefore(cf(e.html), cur.rAppsShowMoreButton), geByClass1("apps_recent_row", cur.rAppsWrap) ? cur.recentOffset += e.offset : (hide(cur.rAppsShowMoreButton), show(cur.rAppsNoContent), cur.recentOffset = 0)) : (cur.deletedApps[t] = {
                            from: a,
                            html: n.innerHTML
                        }, e.html && val(i, e.html)), addClass(n, "deleted"))
                    }.bind(this)),
                    showProgress: function() {
                        addClass(n, this.optionLoadingClass), this.removingApp = !0
                    }.bind(this),
                    hideProgress: this.withFastBackCheck(function() {
                        removeClass(n, this.optionLoadingClass), this.removingApp = !1
                    }.bind(this))
                })
            }.bind(this);
        if ("recent" == a) var c = showFastBox({
            title: getLang("apps_quit_app_box_title")
        }, getLang(s ? "apps_game_quit_confirm" : "apps_quit_confirm"), getLang("apps_remove"), function() {
            r(), c.hide()
        }, getLang("global_cancel"));
        else if (cur.adminApps && cur.adminApps[t]) var c = showFastBox({
            title: getLang("apps_deletingapp")
        }, getLang("apps_admin_quit"), getLang("global_delete"), function() {
            r(), c.hide()
        }, getLang("global_cancel"));
        else r()
    },
    runApp: function(t, e, i, o, s, n) {
        if (!vk.id) return showDoneBox(cur.pleaseSignInLang), !1;
        lockButton(t);
        var a = clone(nav.objLoc);
        delete a.w, nav.setLoc(a), window.appsListChanged = 1;
        var r = "/" + e + "?join=1&hash=" + i + "&sett=" + o;
        if (cur.fromInstallBox && (r += "&from_install=" + (1 == cur.fromInstallBox ? 1 : 2)), s)
            if (isObject(s))
                for (var c in s) "w" != c && (r += "&" + c + "=" + s[c]);
            else "" != s && (r += "&ref=" + s);
        n && (r += "&mid=" + n), nav.objLoc["#"] && (r += "#" + nav.objLoc["#"]), nav.go(r)
    },
    updatesInterval: null,
    stopUpdates: function() {
        this.updatesInterval && clearInterval(this.updatesInterval)
    },
    initUpdates: function(t) {
        t && t.key && (cur.updatesKey = t.key);
        var e = function() {
            if (window.Notifier && cur.updatesKey) {
                Notifier.addKey(cur.updatesKey, function(t, e) {
                    if (cur.updatesKey) {
                        if (e.events)
                            for (var i in e.events) this.parseEvent(e.events[i]);
                        e.ts && (cur.updatesKey.ts = e.ts)
                    }
                }.bind(this))
            }
        }.bind(this);
        e(), this.updatesInterval = setInterval(e, 1e4), cur.destroy.push(this.stopUpdates.bind(this))
    },
    parseEvent: function(t) {
        function e() {
            cur.fScrollbar && cur.fScrollbar.update(), o ? c.removeEventListener("oTransitionEnd", e) : removeEvent(c, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", e)
        }
        var t = t.split("<!>"),
            i = t[0];
        if (cur.updatesVersion && i == cur.updatesVersion) {
            var o = browser.opera && intval(browser.version) <= 12,
                s = t[3],
                n = new Date,
                a = n.getHours(),
                r = n.getMinutes();
            10 > a && (a = "0" + a), 10 > r && (r = "0" + r), s = s.replace("{date}", a + ":" + r);
            var c = domFC(cf(s));
            if (cur.fWrap) {
                var l = cur.fWrap.__uiScroll__ ? cur.fWrap.__uiScroll__.content : cur.fWrap;
                addClass(c, "apps_feed_row_just_added"), l.insertBefore(c, domFC(l)), o ? c.addEventListener("oTransitionEnd", e) : addEvent(c, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", e), removeClassDelayed(c, "apps_feed_row_just_added"), this.ttHideAll()
            }
        }
    },
    feedInit: function() {
        cur.fWrap && cur.feedOffset && !cur.fScrollbar && (cur.fScrollbar = new uiScroll(cur.fWrap, {
            autoresize: !1,
            global: !0,
            onmore: this.feedLoadContent.bind(this)
        }))
    },
    feedLoadContent: function() {
        !isButtonLocked(cur.fShowMoreButton) && isVisible(cur.fShowMoreButton) && ajax.post(this.address, {
            act: "more_feed",
            offset: cur.feedOffset,
            hash: cur.feedHash
        }, {
            onDone: this.withFastBackCheck(function(t, e, i) {
                cur.feedOffset = e, t && cur.fShowMoreButton && cur.fShowMoreButton.parentNode.insertBefore(cf(t), cur.fShowMoreButton), i && hide(cur.fShowMoreButton), cur.fScrollbar && cur.fScrollbar.update()
            }),
            showProgress: lockButton.pbind(cur.fShowMoreButton),
            hideProgress: this.withFastBackCheck(unlockButton.pbind(cur.fShowMoreButton))
        })
    },
    myAppOver: function(t, e, i) {
        return hasClass(e, "deleted") || !vk.id ? !1 : void showTooltip(e, {
            url: this.address,
            params: {
                act: "show_app_friends_tt",
                aid: t,
                no_size: i ? 1 : 0
            },
            typeClass: "tt_black",
            slide: 15,
            center: 1,
            shift: [0, 8, 8],
            ajaxdt: 200,
            showdt: 300,
            hidedt: 200,
            dir: "auto"
        })
    },
    ttScore: function(t, e, i) {
        var o = void 0;
        return cur.ttScoreShown && window.tooltips && (tooltips.hideAll(), o = 0), showTooltip(t, {
            center: 1,
            black: 1,
            shift: [0, 8, 8],
            showsp: o,
            text: '<div class="apps_score_tt_cont"><b>'.concat(e, "</b>", i ? '<div class="apps_score_tt">' + i + "</div>" : "", "</div>")
        })
    },
    ttCommon: function(t, e, i) {
        return i = extend({
                parent: void 0,
                center: void 0,
                event: 0,
                appendEl: void 0,
                shift: void 0
            }, i), 0 === i.event && (i.event = window.event), i.event && cancelEvent(i.event), i.appendEl && (i.appendEl = ge(i.appendEl)),
            i.center ? showTooltip(t, {
                center: i.center,
                shift: i.shift || [0, 8, 8],
                black: 1,
                appendEl: i.appendEl,
                text: e
            }) : showTitle(t, e, i.shift, i)
    },
    ttHideAll: function() {
        window.tooltips && tooltips.hideAll()
    },
    ttDestroyAll: function() {
        window.tooltips && tooltips.destroyAll()
    },
    scrollToHeader: function() {
        var t = ge("apps_header_block"),
            e = scrollNode.scrollTop,
            i = getSize("page_header_cont")[1];
        if (t) {
            var o = Math.max(0, getXY(t)[1] - parseInt(getStyle(t, "marginTop"), 10));
            e + (vk.staticheader ? Math.max(0, i - e) : i) > o && scrollToY(o, 200)
        }
    },
    scrollToSearch: function() {
        var t = scrollNode.scrollTop,
            e = getSize("page_header_cont")[1];
        if (cur.aSearchWrap) {
            var i = getXY(domPN(cur.aSearchWrap))[1];
            t + (vk.staticheader ? Math.max(0, e - t) : e) > i && scrollToY(i, 200)
        }
    },
    scrollCheck: function() {
        this.isDelayedOnSilentLoad("scrollCheck", this.scrollCheck.bind(this)) || !browser.mobile && !cur.isAppsLoading && !cur.disableAutoMore && isVisible(cur.lShowMoreButton) && (window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight) + scrollGetY() + 400 >= cur.lShowMoreButton.offsetTop && this.searchLoadContent()
    },
    searchFocusedClass: "apps_search_focused",
    backupListContent: function(t) {
        if (cur.backupList || t) {
            if (cur.backupList && !cur.backupList.contentCopied && t) {
                for (cur.backupList.content = document.createDocumentFragment(); cur.lContent.firstChild;) cur.backupList.content.appendChild(cur.lContent.firstChild);
                for (cur.backupList.preload = document.createDocumentFragment(); cur.lPreload.firstChild;) cur.backupList.content.appendChild(cur.lPreload.firstChild);
                cur.backupList.contentCopied = !0
            }
        } else cur.backupList = {
            cur: {
                loadMore: cur.loadMore,
                shownApps: cur.shownApps,
                sectionCount: cur.sectionCount,
                searchOffset: cur.searchOffset
            },
            content: null,
            preload: null,
            contentCopied: !1
        }
    },
    restoreListContent: function() {
        return cur.backupList ? (this.searchProgress(!1), val(cur.lContent, ""), val(cur.lPreload, ""), extend(cur, cur.backupList.cur), cur.lContent.appendChild(cur.backupList.content), cur.lPreload.appendChild(cur.backupList.preload), delete cur.backupList, !0) : (delete cur.backupList, !1)
    },
    indexAll: function(t) {
        cur.appsIndex = new vkIndexer(cur.appsList.all, function(t) {
            try {
                return cur.apps[parseInt(t[0])] = t, t[3]
            } catch (e) {
                return ""
            }
        }, t)
    },
    searchUpdate: function(t) {
        if (!this.isDelayedOnSilentLoad("searchUpdate", this.searchUpdate.bind(this, t))) {
            if (t = this.searchValFix(t), t.length < 2 && (t = ""), cur.ignoreEqual || cur.searchStr !== t) {
                this.isSection("list") && t && this.backupListContent(), cur.searchStr = t || "";
                var e = this.isSection("apps", "settings", "manage", "reports", "ads") ? "all" : "search";
                if (t && this.isSection("apps", "settings", "manage", "reports", "ads")) {
                    var i = cur.appsIndex.search(clean(t));
                    cur.curList = e + "_search_" + t, cur.appsList[cur.curList] = i, t += " " + (parseLatin(t) || ""), t = trim(escapeRE(t).split("&").join("&amp;")), cur.selection = {
                        re: new RegExp("(" + t.replace(cur.appsIndex.delimiter, "|") + ")", "gi"),
                        val: "<span>$1</span>"
                    }
                } else cur.curList = e, cur.selection = !1;
                this.ttHideAll(), this.searchProgress(!0), this.scrollToSearch(), hide(cur.lShowMoreButton), this.isSection("catalog", "list") && this.searchWriteToAddressBar(), cur.loadMore = 1, cur.shownApps = cur.searchOffset = 0, this.showRows()
            }
            delete cur.ignoreEqual
        }
    },
    showRows: function() {
        if (!this.isDelayedOnSilentLoad("showRows", this.showRows.bind(this))) {
            if (cur.searchStr) this.isSection("list", "catalog") && this.searchLoadContent();
            else {
                if (this.isSection("list")) return this.restoreListContent() || (extend(cur, {
                    searchOffset: 0,
                    sectionCount: 0,
                    shownApps: 0,
                    loadMore: 0
                }), this.searchCatalog(cur.searchStr, cur.searchOffset)), window[cur.loadMore ? "show" : "hide"](cur.lShowMoreButton), !1;
                if (this.isSection("catalog")) return extend(cur, {
                    searchOffset: 0,
                    sectionCount: 0,
                    shownApps: 0,
                    loadMore: 0
                }), val(cur.lContent, ""), val(cur.lPreload, ""), this.switchLayout("catalog"), this.searchProgress(!1), this.sliderStart(), window[cur.loadMore ? "show" : "hide"](cur.lShowMoreButton), !1
            }
            if (this.isSection("settings", "manage", "apps", "reports", "ads")) {
                if (cur.defaultCount && cur.shownApps < cur.sectionCount) {
                    var t = clean(cur.searchStr),
                        e = this.isSection("manage"),
                        i = "",
                        o = cur.appsList[cur.curList] || [],
                        s = o.length;
                    if (o = this.filter(o.slice(cur.shownApps)).slice(0, cur.defaultCount), o.length && cur.appTpl) {
                        var n = [];
                        each(o, function(t, i) {
                            i = clone(i), cur.selection && (i[3] = i[3].replace(cur.selection.re, cur.selection.val)), n.push(cur.appTpl(i, t == o.length - 1, e))
                        }.bind(this)), i = n.join("")
                    }
                    cur.shownApps ? i && cur.lContent.appendChild(cf(i)) : i ? (val(cur.lContent, i), val(cur.aSummaryCounter, s)) : (val(cur.lContent, cur.aSummary.innerHTML.replace("{query}", "<b>" + t + "</b>")), val(cur.aSummaryCounter, "")), cur.shownApps += cur.defaultCount, cur.shownApps >= cur.sectionCount ? hide(cur.lShowMoreButton) : (show(cur.lShowMoreButton), this.scrollCheck()), this.searchProgress(!1)
                }
                return !1
            }
            return !0
        }
    },
    searchLoadContent: function() {
        if (this.isSection("catalog", "list")) {
            if (cur.searchStr || (cur.searchStr = ""), cur.lPreload.innerHTML) {
                for (var t = document.createDocumentFragment(); cur.lPreload.firstChild;) t.appendChild(cur.lPreload.firstChild);
                cur.lContent.appendChild(t)
            }
            return cur.loadMore ? this.searchCatalog(cur.searchStr, cur.searchOffset) : (cur.loadMore = !0, hide(cur.lShowMoreButton)), !1
        }
        return this.isSection("apps", "manage", "settings", "reports", "ads") ? this.showRows() : !0
    },
    searchCatalog: function(t, e) {
        t = this.searchValFix(t), ajax.post(this.address, {
            act: !t && this.isSection("list") ? cur.list : "search",
            q: t,
            offset: e,
            oid: cur.oid,
            from: cur.section,
            catalog_search: 1,
            id: cur.listId || void 0
        }, {
            cache: t ? 0 : 1,
            onDone: this.withFastBackCheck(function(e, i, o) {
                t == this.searchValFix(cur.searchStr) && (this.isSection("catalog", "list") && (cur.searchStr && this.sliderStop(), this.switchLayout(cur.searchStr ? "list" : cur.section), this.searchWriteToAddressBar()), this.backupListContent(!0), e && val(cur.lContent, e), val(cur.lPreload, i || ""), cur.loadMore = !!i, extend(cur, o), cur.loadMore && show(cur.lShowMoreButton), this.scrollCheck())
            }.bind(this)),
            showProgress: function() {
                cur.isAppsLoading = !0, lockButton(cur.lShowMoreButton)
            }.bind(this),
            hideProgress: this.withFastBackCheck(function() {
                cur.isAppsLoading = !1, this.searchProgress(!1), unlockButton(cur.lShowMoreButton)
            }.bind(this))
        })
    },
    filter: function(t) {
        for (var e = t.length, i = [], o = 0; e > o; o++) {
            var s = t[o];
            cur.apps && cur.apps[s[0]] && !cur.apps[s[0]].deleted && i.push(s)
        }
        return i
    },
    searchLoadFromAddressBar: function() {
        setTimeout(function() {
            cur.searchStr = this.searchValFix(nav.objLoc.q || "")
        }.bind(this), 0)
    },
    searchWriteToAddressBar: function(t) {
        nav.setLoc(extend(nav.objLoc, {
            q: cur.searchStr ? cur.searchStr : null
        }))
    },
    searchValFix: function(t) {
        return t ? (" " == t[t.length - 1] && (t[t.length - 1] = "_"), t) : ""
    },
    searchProgress: function(t) {
        cur.aSearch && uiSearch[t ? "showProgress" : "hideProgress"](cur.aSearch)
    },
    searchFocused: function() {
        cur.aWrap && addClass(cur.aWrap, Apps.searchFocusedClass)
    },
    searchBlured: function() {
        cur.aWrap && removeClass(cur.aWrap, Apps.searchFocusedClass)
    },
    searchReset: function() {
        cur.aSearch && uiSearch.reset(cur.aSearch), cur.searchStr = ""
    },
    switchLayout: function(t) {
        cur.aWrap && (removeClass(cur.aWrap, "apps_catalog_layout"), removeClass(cur.aWrap, "apps_list_layout"), removeClass(cur.aWrap, "apps_manage_layout"), removeClass(cur.aWrap, "apps_settings_layout"), removeClass(cur.aWrap, "apps_apps_layout"), removeClass(cur.aWrap, "apps_page_layout"), addClass(cur.aWrap, "apps_" + t + "_layout"))
    },
    geTabBySection: function(t, e) {
        var i = ge("apps_tab_" + t + (e ? "_" + e : ""));
        return i && (i = geByTag1("a", i)) ? i : !1
    },
    setHistoryBackRules: function() {
        cur._back = {
            show: [function() {
                if (cur._back.swap && each(cur._back.swap, function(t, e) {
                        e.dummy.parentNode.replaceChild(e.content, e.dummy)
                    }), cur.fScrollbar && cur.fScrollbar.scrollTop(cur.fScrollbar.data.scrollTop), cur.rNotScrollbar && cur.rNotScrollbar.scrollTop(cur.rNotScrollbar.data.scrollTop), delete cur._back.swap, setTimeout(function() {
                        var t = nav.objLoc && ge("notifications" == nav.objLoc.tab ? "apps-recent-notifications-tab" : "apps-recent-apps-tab");
                        t && this.switchTabPrepared(t.getElementsByTagName("a")[0]), cur.aSearch && (uiSearch["list" === cur.section ? "setFixed" : "setStatic"](cur.aSearch), uiSearch.startEvents(cur.aSearch), cur.aSearch.value = cur.searchStr || "", uiSearch.scrollResize(cur.aSearch)), this.searchWriteToAddressBar(cur.searchStr)
                    }.bind(this), 0), this.ttHideAll(), this.recentTabsUpdate(), this.startEvents(), cur.aTabs) {
                    var t = this.geTabBySection(this.isSection("list") ? cur.list + (cur.listId || "") : cur.section);
                    t && uiTabs.switchTab(t), uiTabs.hideProgress(cur.aTabs)
                }
                if (cur.aSubTabs) {
                    var t = this.geTabBySection(cur.section, cur.subsection);
                    t && uiTabs.switchTab(t), uiTabs.hideProgress(cur.aSubTabs)
                }
            }.bind(this)],
            hide: [this.stopEvents.bind(this), this.ttHideAll.bind(this)],
            text: cur.backLang
        }
    },
    switchTabPrepared: function(tabAnchor, event) {
        if (event && checkEvent(event)) return !0;
        var tabWrap = document.querySelectorAll('div[data-tab="' + domPN(tabAnchor).id + '"]')[0];
        if (!tabWrap) return !0;
        var tabGroup = tabWrap.getAttribute("data-tab-group"),
            tabLoc = tabAnchor.getAttribute("href"),
            tabCallback = tabWrap.getAttribute("data-tab-callback"),
            tabWraps = document.querySelectorAll('div[data-tab-group="' + tabGroup + '"]');
        return each(tabWraps, function(t, e) {
            e !== tabWrap && addClass(e, this.optionHiddenClass)
        }.bind(this)), uiTabs.switchTab(tabAnchor), removeClass(tabWrap, this.optionHiddenClass), tabCallback && eval("(function(){" + tabCallback + ";})()"), !1
    },
    switchTab: function(section, event, noSearchReset, target) {
        if (event && checkEvent(event)) return !0;
        if ((this.isSection("list") ? cur.list + cur.listId : section) == cur.section) return cur.searchStr && this.searchReset(), !1;
        var noscroll = !1,
            scrollToHeader = !1,
            scrollToTop = !1,
            newSection = ~"/apps/catalog/settings/reports/manage/".indexOf(section) ? section : "list",
            newLayout = "reports" == newSection ? "apps" : newSection;
        "catalog" == cur.section && "list" == newSection || "list" == cur.section && "catalog" == newSection || "list" == cur.section && "list" == newSection ? scrollToHeader = noscroll = !0 : cur.section !== newSection && (scrollToTop = noscroll = !0);
        var preload = cur.preload && cur.preload[section];
        if (!cur.preventFastBack && preload && (null !== preload.header || cur.leavePreloadedHeader || cur.preload.header) && (null !== preload.before || cur.leavePreloadedBefore || cur.preload.before)) {
            this.ttDestroyAll();
            var oldWrapper = ge("wrap3"),
                title = ge("title");
            if (cur._back) {
                window.revertLastInlineVideo && revertLastInlineVideo(), each(cur._back.hide, function(t, e) {
                    e && e()
                }), globalHistoryDestroy(cur._back.loc || nav.strLoc), globalHistory.length > 2 && globalHistoryDestroy(globalHistory[0].loc);
                var oldBefore = ge("apps_before"),
                    oldHeader = ge("apps_header");
                oldWrapper.parentNode.replaceChild(oldWrapper.cloneNode(!0), oldWrapper);
                var hist = {
                    content: oldWrapper,
                    title: title.innerHTML,
                    loc: cur._back.loc || nav.strLoc,
                    cur: cur,
                    radioBtns: radioBtns,
                    ajaxCache: ajaxCache,
                    pid: PageID,
                    scrollTop: scrollGetY(),
                    htitle: document.title.toString(),
                    width: vk.width,
                    width_dec: vk.width_dec,
                    width_dec_footer: vk.width_dec_footer,
                    noleftmenu: vk.noleftmenu,
                    notopmenu: vk.notopmenu,
                    nobottommenu: vk.nobottommenu,
                    hideHeader: title.parentNode && !isVisible(title.parentNode) ? !0 : void 0
                };
                hist.back = _tbLink && _tbLink.loc ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : !1, showBackLink(hist.loc, cur._back.text, 1), globalHistory.push(hist)
            } else _tbLink && (_tbLink.fast = 0), processDestroy(cur);
            PageID = NextPageID, radioBtns = {}, ajaxCache = {}, boxQueue.hideAll(), layerQueue.clear(), layers.fullhide && layers.fullhide(!0);
            var oldCur = cur;
            cur = {
                aWrap: ge("apps_wrap"),
                scrollToHeader: scrollToHeader,
                scrollToTop: scrollToTop,
                destroy: [],
                nav: [],
                preload: oldCur.preload,
                _back: oldCur._back
            };
            var newJs = [],
                tmp = null;
            null !== preload.before ? val("apps_before", preload.before) : oldCur.leavePreloadedBefore ? (oldCur._back && (tmp = {
                dummy: ce("div"),
                content: oldBefore
            }, oldCur._back.swap || (oldCur._back.swap = []), oldCur._back.swap.push(tmp), oldBefore.parentNode.replaceChild(tmp.dummy, oldBefore), tmp = ge("apps_before"), tmp.parentNode.replaceChild(oldBefore, tmp), oldCur.fScrollbar && oldCur.fScrollbar.scrollTop(oldCur.fScrollbar.data.scrollTop), oldCur.rNotScrollbar && oldCur.rNotScrollbar.scrollTop(oldCur.rNotScrollbar.data.scrollTop)), extend(cur, {
                updatesKey: oldCur.updatesKey,
                updatesVersion: oldCur.updatesVersion,
                fScrollbar: oldCur.fScrollbar,
                feedOffset: oldCur.feedOffset,
                feedHash: oldCur.feedHash,
                rNotScrollbar: oldCur.rNotScrollbar,
                notificationsOffset: oldCur.notificationsOffset,
                notificationsNewest: oldCur.notificationsNewest,
                notificationsHash: oldCur.notificationsHash,
                recentOffset: oldCur.recentOffset,
                recentUpdateHash: oldCur.recentUpdateHash
            })) : (val("apps_before", oldCur.preload.before[0]), newJs.push(oldCur.preload.before[1])), null !== preload.header ? val("apps_header", preload.header) : oldCur.leavePreloadedHeader ? oldCur._back && (tmp = {
                dummy: ce("div"),
                content: oldHeader
            }, oldCur._back.swap || (oldCur._back.swap = []), oldCur._back.swap.push(tmp), oldHeader.parentNode.replaceChild(tmp.dummy, oldHeader), tmp = ge("apps_header"), tmp.parentNode.replaceChild(oldHeader, tmp)) : (val("apps_header", oldCur.preload.header[0]), newJs.push(oldCur.preload.header[1])), val("apps_after", preload.after || ""), val("apps_content", preload.content || ""), val("apps_list_content", preload.list_content || ""), val("apps_list_preload", preload.list_preload || ""), this.switchLayout(newLayout), each(newJs, function(i, js) {
                js && eval("(function(){" + js + ";})()")
            }), preload.js && eval("(function(){" + preload.js + ";})()"), __adsUpdate("force"), nav.objLoc = {
                0: this.address,
                act: "catalog" === section ? void 0 : section,
                tab: "catalog" === newSection || "list" === newSection ? nav.objLoc.tab : void 0,
                mid: nav.objLoc.mid,
                gid: nav.objLoc.gid,
                add: nav.objLoc.add
            }, nav.setLoc(nav.objLoc), this.searchReset();
            var tab = this.geTabBySection(section);
            return tab && setTimeout(uiTabs.switchTab.pbind(tab), 0), window[cur.loadMore ? "show" : "hide"](cur.lShowMoreButton), !1
        }
        target && (hasClass(target, "app_cat_link") ? lockLink(target) : addClass(target, "apps_header_progress"));
        var tab = this.geTabBySection(section);
        return tab && (uiTabs.switchTab(tab), uiTabs.showProgress(tab)), nav.go({
            0: this.address,
            act: "catalog" === section ? void 0 : section,
            tab: "catalog" === newSection || "list" === newSection ? nav.objLoc.tab : void 0,
            mid: nav.objLoc.mid,
            gid: nav.objLoc.gid,
            add: nav.objLoc.add
        }, !1, {
            onDone: function(t) {
                target && (hasClass(target, "app_cat_link") ? unlockLink(target) : removeClass(target, "apps_header_progress")), extend(cur, {
                    scrollToHeader: scrollToHeader,
                    scrollToTop: scrollToTop
                })
            }.pbind(cur),
            noscroll: noscroll
        })
    },
    sliderInit: function() {
        "catalog" != cur.section || cur.featuredSlider || (cur.featuredSlider = new AppsSlider({
            inner: "apps_featured_slides",
            outer: "apps_featured_slider",
            next: "apps_featured_next",
            prev: "apps_featured_prev",
            onSlide: function(t) {
                window.AdsLight && AdsLight.applyAds()
            }
        }))
    },
    sliderStart: function() {
        cur.featuredSlider && (cur.featuredSlider.slideshowStart(), cur.featuredSlider.addHandler())
    },
    sliderStop: function() {
        cur.featuredSlider && (cur.featuredSlider.removeHandler(), cur.featuredSlider.slideshowStop())
    },
    collectionsLoadContent: function(t) {
        return isVisible(t) && !buttonLocked(t) ? cur.collectionsOffset && cur.collectionsHasMore ? void ajax.post("al_apps.php", {
            act: "a_collections_more",
            offset: cur.collectionsOffset,
            seed: cur.collectionsSeed
        }, {
            onDone: function(e, i, o) {
                geByClass1("_apps_collections").appendChild(cf(e)), (cur.collectionsHasMore = o) || hide(t), cur.collectionsOffset = i
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        }) : hide(t) : void 0
    },
    addToMineGroups: function(t, e, i, o) {
        var s = {
            act: "add_to_mine_group_box",
            aid: t,
            hash: e,
            height: lastWindowHeight,
            from_gid: o
        };
        i && (s.source = i), showBox("apps", s, {
            params: {
                dark: 1,
                width: 450,
                bodyStyle: "padding: 22px 0 0"
            }
        })
    },
    makeAppSlider: function(t) {
        return new AppsSlider(t)
    }
});
try {
    stManager.done("apps.js")
} catch (e) {}