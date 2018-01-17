function appCallback(e) {
    var t = e.shift();
    return cur.app && cur.app.funcs ? (cur.app.funcs[t] || setTimeout(function() {
        throw new Error("unsupported app method: " + t)
    }, 0), setTimeout(function(i) {
        return i.app.funcs[t].apply(i.app, e)
    }.pbind(cur), 0), !0) : !0
}

function detectUnityWebPlayer(e, t) {
    var i = function(e, t) {
            var i = 0,
                o = 0,
                n = ce("object", {
                    type: "application/vnd.unity"
                }, {
                    visibility: "hidden"
                });
            bodyNode.appendChild(n),
                function() {
                    if ("undefined" == typeof n.GetPluginVersion) o++ < 10 ? setTimeout(arguments.callee, 10) : (bodyNode.removeChild(n), e(null));
                    else {
                        var s = {};
                        if (t)
                            for (i = 0; i < t.length; ++i) s[t[i]] = n.GetUnityVersion(t[i]);
                        s.plugin = n.GetPluginVersion(), bodyNode.removeChild(n), e(s)
                    }
                }()
        },
        o = function(e) {
            var t, i, o, n, s, a = 0;
            if (e) {
                var r = e.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);
                r && r[1] && (t = r[1], i = r[2] ? r[2] : 0, o = r[3] ? r[3] : 0, n = r[4] ? r[4] : "r", s = r[5] ? r[5] : 0, a |= t / 10 % 10 << 28, a |= t % 10 << 24, a |= i % 10 << 20, a |= o % 10 << 16, a |= {
                    d: 8192,
                    a: 16384,
                    b: 24576,
                    f: 32768,
                    r: 32768
                }[n], a |= s / 100 % 10 << 8, a |= s / 10 % 10 << 4, a |= s % 10)
            }
            return a
        },
        n = !1;
    if (navigator.plugins.refresh(), "undefined" != typeof navigator.plugins && navigator.plugins["Unity Player"] && "undefined" != typeof navigator.mimeTypes && navigator.mimeTypes["application/vnd.unity"] && navigator.mimeTypes["application/vnd.unity"].enabledPlugin) {
        if (n = !0, browser.safari && /Mac OS X 10_6/.test(navigator.appVersion)) return void i(function(t) {
            t && t.plugin || (n = !1), e(n, t)
        }, t);
        if (browser.mac && browser.chrome) return void i(function(t) {
            t && o(t.plugin) <= o("2.6.1f3") && (n = !1), e(n, t)
        }, t);
        if (t) return void getPluginVersion(function(t) {
            e(n, t)
        }, t)
    } else if (browser.msie) {
        var s = !1;
        try {
            null != ActiveXObject.prototype && (s = !0)
        } catch (a) {}
        if (s && (!/win64/i.test(navigator.userAgent) || !/x64/i.test(navigator.userAgent))) try {
            var r = new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1"),
                c = r.GetPluginVersion();
            if (t) {
                for (var l = {}, p = 0; p < t.length; ++p) l[t[p]] = r.GetUnityVersion(t[p]);
                l.plugin = c
            }
            if (n = !0, "2.5.0f5" == c) {
                var d = /Windows NT \d+\.\d+/.exec(navigator.userAgent);
                if (d && d.length > 0) {
                    var u = parseFloat(d[0].split(" ")[2]);
                    u >= 6 && (n = !1)
                }
            }
        } catch (a) {}
    }
    e(n, l)
}! function(e) {
    function t() {
        for (var e = "", t = 0; 5 > t; t++) e += Math.ceil(15 * Math.random()).toString(16);
        return e
    }

    function i(e, t, o, n, s) {
        e[t] ? o.apply(n) : (s = s || 0, 1e3 > s && setTimeout(function() {
            i(e, t, o, n, s + 1)
        }, 0))
    }

    function o(t) {
        setTimeout(function() {
            var o = document.createElement("script");
            o.type = "text/javascript", o.src = t || e.fastXDM.helperUrl, i(document, "body", function() {
                document.getElementsByTagName("HEAD")[0].appendChild(o)
            })
        }, 0)
    }

    function n(e, t) {
        var i;
        switch (typeof e) {
            case "string":
                i = t ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : e.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
                break;
            case "object":
                if ("[object Array]" === Object.prototype.toString.apply(e)) {
                    i = [];
                    for (var o = 0, s = e.length; s > o; o++) i[o] = n(e[o], t)
                } else {
                    i = {};
                    for (var a in e) Object.hasOwnProperty.call(e, a) && (i[a] = n(e[a], t))
                }
                break;
            default:
                i = e
        }
        return i
    }

    function s(e, t) {
        d.loaded ? e.apply(t, [d]) : p.push([t, e])
    }

    function a() {
        d.loaded = !0;
        for (var e = 0, t = p.length; t > e; e++) p[e][1].apply(p[e][0], [d])
    }

    function r(e, t) {
        s(function(i) {
            var o = i.json.parse(e);
            if (o[0]) {
                o[1] || (o[1] = []);
                for (var s = 0, a = o[1].length; a > s; s++)
                    if (o[1][s] && o[1][s]._func) {
                        var r = o[1][s]._func;
                        o[1][s] = function() {
                            var e = Array.prototype.slice.call(arguments);
                            e.unshift("_func" + r), t.callMethod.apply(t, e)
                        }
                    } else t.options.safe && (o[1][s] = n(o[1][s], !0));
                setTimeout(function() {
                    if (!t.methods[o[0]]) throw Error("fastXDM: Method " + o[0] + " is undefined");
                    t.methods[o[0]].apply(t, o[1])
                }, 0)
            }
        })
    }

    function c(e, t) {
        for (var i in t) e[i] && "object" == typeof e[i] ? c(e[i], t[i]) : e[i] = t[i]
    }
    if (!e.fastXDM) {
        var l = {},
            p = [],
            d = {};
        e.fastXDM = {
            _id: 0,
            helperUrl: "https://vk.com/js/api/xdmHelper.js",
            Server: function(i, o, n) {
                this.methods = i || {}, this.filter = o, this.options = n || {}, this.id = e.fastXDM._id++, this.key = t(), this.frameName = "fXD" + this.key, this.server = !0, this.methods["%init%"] = this.methods.__fxdm_i = function() {
                    e.fastXDM.run(this.id), this.methods.onInit && this.methods.onInit()
                }, l[this.key] = [r, this]
            },
            Client: function(t, i) {
                if (this.methods = t || {}, this.options = i || {}, this.id = e.fastXDM._id++, this.client = !0, e.fastXDM.run(this.id), 0 !== window.name.indexOf("fXD")) throw Error("Wrong window.name property.");
                this.key = window.name.substr(3), this.caller = window.parent, l[this.key] = [r, this], e.fastXDM.on("helper", function() {
                    e.fastXDM.onClientStart(this)
                }, this), s(function(e) {
                    e.send(this, e.json.stringify(["%init%"]));
                    var t = this.methods;
                    setTimeout(function() {
                        t.onInit && t.onInit()
                    }, 0)
                }, this)
            },
            onMessage: function(e) {
                if (e.origin != document.origin) {
                    var t = cur.app && cur.app.options && cur.app.options.src ? cur.app.options.src : "";
                    if (!t) return debugLog("Wrong app url"), !1;
                    e.origin != t && e.origin + "/" != t.substring(0, e.origin.length + 1) && debugLog("Warning: message from " + e.origin + " will be disable in future")
                }
                var i = e.data;
                if (!i) return !1;
                if ("string" != typeof i && !(i instanceof String)) return !1;
                var o = i.substr(0, 5);
                if (l[o]) {
                    var n = l[o][1];
                    !n || n.filter && !n.filter(e.origin) || l[o][0](i.substr(6), n)
                }
            },
            setJSON: function(e) {
                d.json = e
            },
            getJSON: function(e) {
                return e ? void s(function(t) {
                    e(t.json)
                }) : d.json
            },
            setEnv: function(e) {
                for (var t in e) d[t] = e[t];
                a()
            },
            _q: {},
            on: function(e, t, i) {
                this._q[e] || (this._q[e] = []), -1 == this._q[e] ? t.apply(i) : this._q[e].push([t, i])
            },
            run: function(e) {
                for (var t = (this._q[e] || []).length, i = 0; t > i; i++) this._q[e][i][0].apply(this._q[e][i][1]);
                this._q[e] = -1
            },
            waitFor: i
        }, e.fastXDM.Server.prototype.start = function(t, i) {
            if (t.contentWindow) this.caller = t.contentWindow, this.frame = t, e.fastXDM.on("helper", function() {
                e.fastXDM.onServerStart(this)
            }, this);
            else {
                var o = this;
                i = i || 0, 50 > i && setTimeout(function() {
                    o.start.apply(o, [t, i + 1])
                }, 100)
            }
        }, e.fastXDM.Server.prototype.destroy = function() {
            delete l[this.key]
        }, e.fastXDM.Server.prototype.append = function(e, t, i) {
            var o = document.createElement("DIV");
            o.innerHTML = '<iframe name="' + this.frameName + '" ' + (i || "") + "></iframe>";
            var n = o.firstChild,
                s = this,
                a = function() {
                    n.frameBorder = "0", t && c(n, t), e.insertBefore(n, e.firstChild), s.start(n)
                };
            return s.options.layer ? a() : setTimeout(function() {
                a()
            }, 0), n
        }, e.fastXDM.Client.prototype.callMethod = e.fastXDM.Server.prototype.callMethod = function() {
            for (var t = Array.prototype.slice.call(arguments), o = t.shift(), a = 0, r = t.length; r > a; a++)
                if ("function" == typeof t[a]) {
                    this.funcsCount = (this.funcsCount || 0) + 1;
                    var c = t[a],
                        l = "_func" + this.funcsCount;
                    this.methods[l] = function() {
                        c.apply(this, arguments), delete this.methods[l]
                    }, t[a] = {
                        _func: this.funcsCount
                    }
                } else this.options.safe && (t[a] = n(t[a], !1));
            i(this, "caller", function() {
                e.fastXDM.on(this.id, function() {
                    s(function(e) {
                        e.send(this, e.json.stringify([o, t]))
                    }, this)
                }, this)
            }, this)
        }, e.JSON && "object" == typeof e.JSON && e.JSON.parse && e.JSON.stringify && '{"a":[1,2,3]}' === e.JSON.stringify({
            a: [1, 2, 3]
        }).replace(/ /g, "") ? d.json = {
            parse: e.JSON.parse,
            stringify: e.JSON.stringify
        } : e.fastXDM._needJSON = !0, e.postMessage ? (d.protocol = "p", d.send = function(e, t) {
            var i = e.frame ? e.frame.contentWindow : e.caller;
            if (i) try {
                i.postMessage(e.key + ":" + t, "*")
            } catch (o) {
                window.postMessage.call(i, e.key + ":" + t, "*")
            }
        }, e.addEventListener ? e.addEventListener("message", e.fastXDM.onMessage, !1) : e.attachEvent("onmessage", e.fastXDM.onMessage), e.fastXDM._needJSON ? (e.fastXDM._onlyJSON = !0, o()) : a()) : o()
    }
}(window), window._iconAdd || (window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "");
var vkApp = function(e, t, i, o) {
    if (i = i || {}, t = t || {}, window.parent && window.parent != window && !t.checking && !t.openapi) return !1;
    var n = this;
    if (this.cont = ge(e), this.cont) {
        if (i.hash = i.hash || "", -1 != i.hash.indexOf("#")) {
            var s = i.hash.split("#").pop();
            (s || "").substr(0, 1) == vk.navPrefix ? i.hash = "" : i.hash = s
        }
        if (this.params = i, this.onReady = new Array, 1 == t.type) {
            var a = t.src,
                r = [];
            for (var c in i) "hash" == c ? r.push(c + "=" + encodeURIComponent(i[c])) : r.push(c + "=" + i[c]);
            a += (-1 == a.indexOf("?") ? "?" : "&") + r.join("&")
        }
        t.inlineApp && (n.inlineApp = !0), n.options = extend({
            heightMax: 4500
        }, t), this.funcs = {
            onInit: function() {
                return t.heightSync && n.RPC.callMethod("getHeight", function(e) {
                    n.setHeight(e)
                }), n.inited || (n.inited = !0, o && o(), n.inlineApp || n.onAppReady()), !0
            },
            ApiCall: function(e, t) {
                var i = e.shift();
                n.api(i, e[0], t)
            },
            _getAppInfo: function(e) {
                e([n.params.api_id, window.location.hash])
            },
            api: function(e, t, i) {
                n.api(t, i, function(t) {
                    n.apiCallback(e, t)
                })
            },
            setHeight: function(e) {
                n.setHeight(e)
            },
            scrollWindow: function(e, t) {
                if (!n.inlineApp && !n.options.layer) {
                    var i = Math.max(e, 0);
                    t = intval(t), t && t > 0 ? (animate(htmlNode, {
                        scrollTop: i
                    }, t), animate(bodyNode, {
                        scrollTop: i
                    }, t)) : window.scroll(0, i)
                }
            },
            scrollTop: function(e) {
                var t = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
                cur.appTopOffset || (cur.appTopOffset = getXY(cur.app.cont)[1]);
                var i = 0;
                curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle && (i = 1), cur.app.runCallback("onScrollTop", parseInt(scrollGetY()), parseInt(t), parseInt(cur.appTopOffset), i)
            },
            scrollSubscribe: function(e) {
                var t = function() {
                        var e = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
                        n.runCallback("onScroll", parseInt(scrollGetY()), parseInt(e))
                    },
                    i = function() {
                        addEvent(browser.msie6 ? pageNode : window, "scroll", t)
                    };
                i(), e && t(), cur._back ? (cur._back.show.push(i), cur._back.hide.push(function() {
                    removeEvent(browser.msie6 ? pageNode : window, "scroll", t)
                })) : cur.destroy.push(function() {
                    removeEvent(browser.msie6 ? pageNode : window, "scroll", t)
                })
            },
            showRequestBox: function(e, t, i) {
                showBox("al_apps.php", {
                    act: "show_request_box",
                    aid: cur.aid,
                    message: t,
                    uid: e,
                    request_key: i
                }, {
                    params: {
                        width: 430,
                        dark: 1
                    },
                    onFail: function(e) {
                        return cur.app.runCallback("onRequestFail", e), !0
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
                    onFail: function(e) {
                        return cur.app.runCallback("onInstallPushFail", e), !0
                    }
                })
            },
            showProfilePhotoBox: function(e) {
                showBox("al_apps.php", {
                    act: "show_profile_photo_box",
                    hash: e,
                    aid: cur.aid
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            setTitle: function(e) {
                if (!n.inlineApp) {
                    e = e.replace(/[<>]+/gi, "");
                    var t = cur.backLang;
                    t = t ? t : getLang("global_vkontakte"), document.title = t + (e ? " | " + e : "")
                }
            },
            resizeWindow: function(e, t) {
                n.setWidth(e), n.setHeight(t)
            },
            getLocationProtocol: function(e) {
                e(location.protocol)
            },
            setLocation: function(e, t) {
                e = e.toString(), cur.appLoc = e, t && cur.app.runCallback("onLocationChanged", e), nav.setLoc(extend(nav.objLoc, {
                    "#": e
                }))
            },
            setNavigation: function() {},
            checkFlashSupport: function(e) {
                return e = positive(e), e || (e = 9), browser.flash >= e ? void cur.app.runCallback("onCheckFlashSupportSuccess") : (cur.app.showDummy("no_flash"), void cur.app.runCallback("onCheckFlashSupportFail"))
            },
            checkUnitySupport: function() {
                detectUnityWebPlayer(function(e) {
                    e ? cur.app.runCallback("onCheckUnitySupportSuccess") : (cur.app.showDummy("no_unity"), cur.app.runCallback("onCheckUnitySupportFail"))
                })
            },
            showInstallBox: function() {
                if (cur.appUser) Apps.onAppAdded();
                else {
                    if (cur.installBoxShown) return;
                    cur.installBoxShown = !0;
                    var e = showBox("apps", {
                        act: "install_box",
                        aid: t.aid
                    }, {
                        params: {
                            dark: 1
                        }
                    });
                    e.setOptions({
                        onHide: function() {
                            setTimeout(function() {
                                cur.installBoxShown = !1
                            }, 3e3)
                        }
                    })
                }
            },
            showSettingsBox: function(e) {
                if (!cur.settingsBoxShown) {
                    cur.onSettingsEventSended = !1, cur.canSendOnSettingsEventFromHide = !0, cur.onSettingsChange = function(e, t) {
                        cur.onSettingsEventSended || (cur.onSettingsEventSended = !0, "ok" === e ? cur.app.runCallback("onSettingsChanged", t) : cur.app.runCallback("onSettingsCancel"))
                    }, cur.settingsBoxShown = !0;
                    var i = {
                        act: "settings_box",
                        aid: t.aid,
                        mask: e
                    };
                    t.gid && (i.gid = t.gid);
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
            showGroupSettingsBox: function(e) {
                if (!cur.settingsBoxShown && (cur.settingsBoxShown = !0, t.gid)) {
                    cur.onSettingsEventSended = !1, cur.canSendOnSettingsEventFromHide = !0, cur.onSettingsChange = function(e, t, i) {
                        cur.onSettingsEventSended || (cur.onSettingsEventSended = !0, "ok" === e ? cur.app.runCallback("onGroupSettingsChanged", t, i) : cur.app.runCallback("onGroupSettingsCancel"))
                    };
                    var i = {
                            act: "group_settings_box",
                            aid: t.aid,
                            mask: e,
                            gid: t.gid
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
            showAppWidgetPreviewBox: function(e, i) {
                function o() {
                    delete cur.onAppWidgetPreviewFail, delete cur.onAppWidgetPreviewCancel, delete cur.onAppWidgetPreviewSuccess, setTimeout(function() {
                        delete cur.appWidgetPreviewBox
                    }, 3e3)
                }
                if (!cur.appWidgetPreviewBox && t.gid) {
                    cur.appWidgetPreviewBox = !0, cur.onAppWidgetPreviewFail = function(e) {
                        o(), cur.app.runCallback("onAppWidgetPreviewFail", e)
                    }, cur.onAppWidgetPreviewCancel = function() {
                        o(), cur.app.runCallback("onAppWidgetPreviewCancel")
                    }, cur.onAppWidgetPreviewSuccess = function() {
                        o(), cur.app.runCallback("onAppWidgetPreviewSuccess")
                    };
                    var n = showBox("apps", {
                        act: "app_widget_preview_box",
                        aid: t.aid,
                        gid: t.gid,
                        type: e,
                        code: i
                    }, {
                        params: {
                            width: 600,
                            containerClass: "apps_app_widget_preview_box"
                        },
                        onDone: function() {
                            n.setOptions({
                                onHide: function() {
                                    isFunction(cur.onAppWidgetPreviewCancel) && cur.onAppWidgetPreviewCancel()
                                }
                            })
                        },
                        onFail: function(e) {
                            return ~e.indexOf("413 Request Entity Too Large") && (e = "413 Request Entity Too Large"), isFunction(cur.onAppWidgetPreviewFail) && cur.onAppWidgetPreviewFail(e), !0
                        }
                    })
                }
            },
            showAllowMessagesFromCommunityBox: function() {
                if (!cur.allowMessagesFromCommunityBox) {
                    cur.allowMessagesFromCommunityBox = !0, cur.allowMessagesFromCommunityStatus = "", cur.onAllowMessagesFromCommunity = function(e) {
                        "ok" === e ? cur.app.runCallback("onAllowMessagesFromCommunity") : cur.app.runCallback("onAllowMessagesFromCommunityCancel")
                    };
                    var e = {
                        act: "allow_messages_from_community_box",
                        aid: t.aid
                    };
                    t.gid && (e.gid = t.gid);
                    var i = showBox("apps", e, {
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
                Apps.showInviteBox(t.aid, t.hash)
            },
            showPaymentBox: function(e) {
                showBox("al_apps.php", {
                    act: "show_payment_box",
                    votes: e,
                    aid: t.aid
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            showLeadsPaymentBox: function(e) {
                showBox("al_apps.php", {
                    act: "show_payment_box",
                    aid: t.aid,
                    offers: isArray(e) ? e.join(",") : intval(e) || 1
                }, {
                    params: {
                        dark: 1
                    }
                })
            },
            showOrderBox: function(e) {
                if ("object" != typeof e) {
                    var i = Array.prototype.slice.call(arguments);
                    e = {}, each(i, function() {
                        var t = this.split("=");
                        2 == t.length && (e[t[0]] = t[1])
                    })
                }
                var o = {};
                for (var n in e) inArray(n, ["type", "votes", "offer_id", "item", "currency"]) && (o[n] = e[n] + "");
                "offers" == o.type && isArray(o.offer_id) && (o.offer_id = o.offer_id.join(",")), o.act = "show_order_box", o.aid = t.aid, o.hash = t.hash, showBox("al_apps.php", o, {
                    params: {
                        dark: 1
                    },
                    onFail: function(e) {
                        return showFastBox({
                            title: getLang("global_error")
                        }, e), !0
                    }
                }), cur.onAppOrderCancel = function() {
                    cur.app.runCallback("onOrderCancel")
                }, cur.onAppOrderSuccess = function(e) {
                    cur.app.runCallback("onOrderSuccess", e)
                }, cur.onAppOrderFail = function(e) {
                    cur.app.runCallback("onOrderFail", e)
                }
            },
            showSubscriptionBox: function(e, i) {
                if ("object" != typeof i) {
                    var o = Array.prototype.slice.call(arguments);
                    i = {}, each(o, function() {
                        var e = this.split("=");
                        2 == e.length && (i[e[0]] = e[1])
                    })
                }
                var n = {
                    act: "show_subscription_box",
                    aid: t.aid,
                    action: e,
                    hash: t.hash
                };
                "create" == n.action ? n.item = i.item : ("resume" == n.action || "cancel" == n.action) && (n.subscription_id = i.subscription_id), showBox("al_apps.php", n, {
                    onFail: function(e) {
                        return showFastBox({
                            title: getLang("global_error")
                        }, e), !0
                    }
                }), cur.onSubscriptionCancel = function() {
                    cur.app.runCallback("onSubscriptionCancel")
                }, cur.onSubscriptionSuccess = function(e) {
                    cur.app.runCallback("onSubscriptionSuccess", e)
                }, cur.onSubscriptionFail = function(e) {
                    cur.app.runCallback("onSubscriptionFail", e)
                }
            },
            showMerchantPaymentBox: function(e) {
                return !1
            },
            showPortlet: function(e) {
                return !1
            },
            addToMenu: function() {
                ajax.post("al_apps.php", {
                    act: "add_left_menu",
                    aid: cur.aid,
                    hash: cur.app.options.hash
                }, {
                    onDone: function(e) {
                        Apps.updateLeftNav(e.left_nav), Apps.addToMenuErrorResolve(e), Apps.updateAddToMenuAction()
                    }
                })
            },
            adsPublish: function() {
                AdsLight.handleEvent.apply(AdsLight, arguments)
            },
            callUser: function(e, t, i) {
                showBox("al_apps.php", {
                    act: "call_user",
                    uid: e,
                    key: t,
                    aid: cur.aid,
                    msg: i
                }, {
                    dark: 1,
                    onFail: function(e) {
                        return cur.app.runCallback("onCallFail", e), !0
                    }
                })
            },
            debug: function() {
                debugLog(1 == arguments.length ? arguments[0] : arguments)
            },
            openExternalApp: function(e, i) {
                if (e) {
                    var o = "",
                        n = [];
                    if (i) {
                        i.aid = t.aid;
                        for (var s in i) {
                            var a = "";
                            void 0 !== i[s] && (a = encodeURIComponent(i[s])), n.push(encodeURIComponent(s) + "=" + a)
                        }
                        o = e + "?" + n.join("&")
                    }
                    if (o) {
                        var r = {
                            act: "open_external_app",
                            url: e,
                            q: n.join("&"),
                            aid: t.aid
                        };
                        ajax.post("al_apps.php", r, {
                            onDone: function(e, t) {
                                t && (showWiki({
                                    w: e
                                }), cur.onExternalAppDone = function(e) {
                                    this.runCallback("onExternalAppDone", e)
                                }.bind(cur.app))
                            }
                        })
                    }
                }
            },
            externalAppDone: function(e) {
                window.WkView && WkView.hide(!1, !0), cur.onExternalAppDone && (cur.onExternalAppDone(e), cur.onExternalAppDone = null)
            },
            closeExternalApp: function() {
                Apps.closeExternalApp()
            }
        }, i.widget ? (n.options.type = 1, n.options.widget = !0) : (renderFlash(ge("flash_api_external_cont"), {
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
        }), n.externalFrame = ge("flash_api_external"));
        var l = n.options.wmode || "opaque";
        if (n.options.no_init) return !1;
        var p = 1;
        switch (n.options.type) {
            case 1:
                n.options.layer ? this.RPC = new fastXDM.Server(this.funcs, void 0, {
                    layer: 1
                }) : this.RPC = new fastXDM.Server(this.funcs);
                var d = {
                    src: a,
                    width: "100%",
                    overflow: "hidden",
                    scrolling: "no"
                };
                n.options.widget || (d.height = n.options.height + "px"), this.frame = this.RPC.append(n.cont, d, 'webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"');
                break;
            case 2:
                debugLog("is wrapper");
                var u = {
                    url: t.src,
                    id: "flash_app",
                    width: n.options.width,
                    height: n.options.height,
                    version: 10
                };
                "opaque" == l && (u.preventhide = 1), p = renderFlash(n.cont, u, {
                    allowFullScreen: !0,
                    allowscriptaccess: "never",
                    allowFullScreenInteractive: "true",
                    allownetworking: "all",
                    bgcolor: "#F7F7F7",
                    wmode: l
                }, i), n.frame = ge("flash_app");
                break;
            case 3:
                var u = {
                    url: t.src,
                    id: "flash_app",
                    width: n.options.width,
                    height: n.options.height,
                    version: 9
                };
                "opaque" == l && (u.preventhide = 1), p = renderFlash(n.cont, u, {
                    allowFullScreen: !0,
                    allownetworking: "all",
                    allowscriptaccess: "never",
                    allowFullScreenInteractive: "true",
                    wmode: l
                }, i), n.frame = ge("flash_app")
        }
        p || n.showDummy("no_flash"), i.widget && setTimeout(function() {
            n.inited || show("app_connect_error")
        }, 8e3), cur.destroy.push(function() {
            this.RPC && this.RPC.destroy()
        }.bind(this))
    }
};
vkApp.prototype.boxApp = function(e) {}, vkApp.prototype.onAppReady = function() {
    for (var e in this.onReady) this.onReady[e]()
}, vkApp.prototype.runCallback = function() {
    var e = Array.prototype.slice.call(arguments),
        t = e[0],
        i = "customEvent";
    if (-1 != "onLocationChanged,onMerchantPaymentSuccess,onBalanceChanged,onWindowResized,onSettingsChanged,onGroupSettingsChanged,onAppWidgetPreviewFail,onAppWidgetPreviewCancel,onAppWidgetPreviewSuccess,onCheckFlashSupportSuccess,onCheckFlashSupportFail,onCheckUnitySupportSuccess,onCheckUnitySupportFail".indexOf(t)) {
        i = t;
        var o = e.slice(1)
    } else var o = e.slice();
    switch (this.options.type) {
        case 1:
            if (this.RPC.callMethod("runCallback", e), !this.options.widget && !browser.iphone && !browser.ipad) try {
                this.externalFrame[i](o)
            } catch (n) {}
            break;
        case 2:
            try {
                this.externalFrame[i](o)
            } catch (n) {}
            break;
        case 3:
            try {
                this.externalFrame[i](o)
            } catch (n) {}
    }
}, vkApp.prototype.apiCallback = function(e, t) {
    Array.prototype.slice.call(arguments);
    try {
        this.externalFrame.apiCallback(e, t)
    } catch (i) {}
}, vkApp.prototype.setHeight = function(e) {
    if (e) {
        this.inlineApp && e > this.options.heightMax && (e = this.options.heightMax);
        var t = e + "px";
        this.frame.style.height = t, this.options.boxed || (this.cont.style.height = t), this.options.layer && WkView.onResize(), this.options.onResize && this.options.onResize()
    }
}, vkApp.prototype.setWidth = function(e) {
    if (e && !this.inlineApp && cur.app) {
        getSize(cur.app.cont);
        e = Math.min(Math.max(e, 100), 1e3), this.options.layer ? WkView.onResize() : handlePageView({
            noleftmenu: vk.noleftmenu,
            nobottommenu: vk.nobottommenu,
            notopmenu: vk.notopmenu,
            body_class: vk.body_class,
            staticheader: vk.staticheader,
            no_ads: vk.no_ads,
            ad_preview: vk.ad_preview,
            width: Math.max(e, 625) + 166
        }), this.frame.style.width = this.cont.style.width = e + "px"
    }
}, vkApp.prototype.showProgress = function() {
    addClass(this.cont, "loading"), this.loaderEl = showProgress(this.cont, "", "pr_big app_container_progress", !0)
}, vkApp.prototype.hideProgress = function() {
    removeClass(this.cont, "loading"), this.loaderEl && re(this.loaderEl)
}, vkApp.prototype.showDummy = function(e) {
    if (this.cont && ~["no_flash", "no_unity"].indexOf(e)) {
        var t = {
            act: e
        };
        "no_flash" !== e || browser.iphone || browser.ipad ? "no_unity" !== e || browser.mobile || (t.screen = browser.msie || browser.amigo || browser.mac && browser.safari ? "install" : "browser") : t.screen = "install", ajax.post("al_apps.php", t, {
            onDone: function(e) {
                cur.app && (addClass(cur.app.cont, "dummy"), val(cur.app.cont, e))
            },
            showProgress: this.showProgress.bind(this),
            hideProgress: this.hideProgress.bind(this)
        })
    }
}, vkApp.prototype.balanceUpdated = function(e) {
    this.runCallback("onBalanceChanged", e)
}, vkApp.prototype.checkMethod = function(e, t, i) {
    var o = e.toLowerCase();
    if ("wall.post" == o || "activity.set" == o) {
        var n = t["wall.post" == o ? "message" : "text"];
        n || (n = ""), showBox("apps", {
            act: "wall_post_box",
            aid: this.options.aid,
            post_id: t.post_id,
            owner_id: t.owner_id,
            lat: t.lat,
            "long": t["long"],
            place_id: t.place_id,
            from_group: t.from_group,
            publish_date: t.publish_date,
            signed: t.signed,
            attachments: t.attachments || t.attachment,
            text: n,
            method: o
        }, {
            params: {
                width: "430px",
                dark: 1
            }
        });
        var s = this;
        return cur.apiWallPost = function(o, n) {
            n ? i && i({
                error: n
            }) : s.api(e, extend(t, {
                method_access: o
            }), i)
        }, !1
    }
    return !0
}, vkApp.prototype.checkMethodResult = function(e, t, i, o) {
    switch (e) {
        case "photos.saveProfilePhoto":
            if (!i.error) return cur.profilePhotoBoxCallback = function(e) {
                o(e ? {
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
}, vkApp.prototype.initClientExternalApp = function() {
    this.clientRpc = new fastXDM.Client({}, {
        safe: !0
    }), cur.onExternalAppDone = function(e) {
        this.clientRpc.callMethod("externalAppDone", e)
    }.bind(this)
}, vkApp.prototype.onLocChanged = function(e) {
    e || (e = ""), cur.appLoc != e && (cur.appLoc = e, this.runCallback("onLocationChanged", e))
}, vkApp.prototype.api = function(method, inputParams, callback, captcha) {
    function sName(e, t) {
        return e[0] > t[0] ? 1 : e[0] < t[0] ? -1 : 0
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
                        onSubmit: function(e, t) {
                            inputParams.captcha_sid = e, inputParams.captcha_key = t, self.api(method, inputParams, callback, !0), cur.appCaptcha.setOptions({
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
var AppsSlider = function(e) {
    if (this.options = extend({
            inner: null,
            outer: null,
            next: null,
            prev: null,
            infinite: !0,
            slideshowDuration: 4e3,
            animationDuration: 500
        }, e || {}), this.required = null, this.current = null, this.slideNext = null, this.slidePrev = null, this.slideCurrent = null, this.hasVideoSlides = !1, this.videoPlayer = null, this._handlerInst = null, this._arrowNextHandler = null, this._arrowPrevtHandler = null, this.options.outer && this.options.inner && (this.outer = ge(this.options.outer), this.inner = ge(this.options.inner), this.outer && this.inner)) {
        if (this.slideshow = !1, this.animation = {
                stop: function() {}
            }, this.slideshowTimeout = null, this.interacted = !1, this.slides = domChildren(this.inner), this.options.infinite) {
            if (!this.slides.length) return void re(this.outer);
            if (this.slides.length < 3)
                for (var t = null, i = 0; this.slides.length < 4;) t = this.slides[i++].cloneNode(!0), this.slides.push(t), this.inner.appendChild(t)
        }(this.arrowNext = ge(this.options.next)) && (this._arrowNextHandler = this.next.bind(this), addEvent(this.arrowNext, "mousedown", this._arrowNextHandler)), (this.arrowPrev = ge(this.options.prev)) && (this._arrowPrevtHandler = this.prev.bind(this), addEvent(this.arrowPrev, "mousedown", this._arrowPrevtHandler)), this.inited = !1, this.init()
    }
};
AppsSlider.prototype = {
    init: function() {
        return void 0 !== this.inited ? this.inited ? !0 : 0 !== this.outer.offsetWidth && 0 !== this.slides[0].offsetWidth ? (this.widthOuter = this.outer.offsetWidth, this.widthInner = this.inner.offsetWidth, this.widthSlide = this.widthInner / this.slides.length, this.offsetInner = this.inner.offsetLeft, this.widthSide = (this.widthOuter - this.widthSlide) / 2, this.indexNext = this.slides.length - 1, this.indexPrev = 0, this.indexMargin = (this.slides.length - 1) / 2 | 0, this.indexRequired = this.indexCurrent = this.getIndex(), this.highlight(), this.rearrange(), this._initVideoSlides(), this.slideshow && !this.slideshowTimeout && this.slideshowStart(), this.inited = !0) : void 0 : void 0
    },
    highlight: function() {
        this.slideHighlighted && (removeClass(this.slideHighlighted, "selected"), this.slideHighlighted = null, this.indexHighlighted = null), this.indexHighlighted !== this.indexCurrent && (this.indexHighlighted = this.indexCurrent, this.slideHighlighted = this.slides[this.getIndex(this.indexCurrent)], addClass(this.slideHighlighted, "selected"))
    },
    handler: function(e) {
        var t = e.target && (e.target === this.outer || this.outer.contains(e.target));
        this.interacted != t && (this.interacted = t, t ? (this.slideshowInterrupted = this.slideshow, this.slideshowStop()) : (this.slideshow = this.slideshowInterrupted, this.slideshow && this.slideshowStart()))
    },
    slideshowStart: function() {
        this.slideshow = !0, this.interacted || this._videosIsPlay || (this.slideshowStop(), this.slideshow = !0, this.slideshowTimeout = setTimeout(function() {
            this.slideshowTimeout = null, vk.rtl ? this.indexRequired-- : this.indexRequired++, this.serve()
        }.bind(this), this.options.slideshowDuration))
    },
    slideshowStop: function() {
        this.slideshow = !1, this.slideshowTimeout && (clearTimeout(this.slideshowTimeout), this.slideshowTimeout = null)
    },
    addHandler: function() {
        this.init() && (this.removeHandler(), this._handlerInst = this.handler.bind(this), addEvent(document, "mousemove", this._handlerInst))
    },
    removeHandler: function() {
        this._handlerInst && removeEvent(document, "mousemove", this._handlerInst)
    },
    removeAllHandlers: function() {
        this.removeHandler(), this._arrowNextHandler && removeEvent(this.arrowNext, "mousemove", this._arrowNextHandler), this._arrowPrevtHandler && removeEvent(this.arrowPrev, "mousemove", this._arrowPrevtHandler)
    },
    requireIndex: function(e) {
        this.indexRequired = this.getIndex(e || 0), this.serve()
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
    getIndex: function(e, t) {
        return void 0 !== e ? (e = e % this.slides.length + (0 > e ? this.slides.length : 0), e === this.slides.length ? 0 : e) : (e = (this.offsetInner - this.widthSide) / -this.widthSlide, t ? e : Math.round(e))
    },
    serve: function() {
        if (this.init()) {
            var e = this.getIndex(this.indexRequired),
                t = this.required != e,
                i = -(this.indexRequired * this.widthSlide - (this.widthOuter - this.widthSlide) / 2);
            this.required = e, t && isFunction(this.options.onRequired) && this.options.onRequired(), this.options.infinite || (this.indexRequired = this.required), this.animation.stop(), this.animation = new Fx.Base({
                style: {}
            }, {
                duration: this.options.animationDuration,
                transition: Fx.Transitions.easeOutCubic,
                onComplete: this.served.bind(this),
                onStep: function(e) {
                    this.offsetInner = e.left, setStyle(this.inner, "left", this.offsetInner);
                    var t = this.indexCurrent;
                    this.indexCurrent = this.getIndex(), t !== this.indexCurrent && (this.indexCurrent === this.indexRequired && this.highlight(), this.rearrange(), isFunction(this.options.onChange) && this.options.onChange())
                }.bind(this)
            }), this.animation.start({
                left: this.offsetInner
            }, {
                left: i
            })
        }
    },
    served: function() {
        var e = this.indexCurrent - this.getIndex(this.indexCurrent);
        e > 30 && (this.indexPrev = 0, this.indexNext = this.slides.length - 1, this.indexCurrent -= e, this.indexRequired -= e, this.offsetInner = -(this.indexRequired * this.widthSlide - (this.widthOuter - this.widthSlide) / 2), this.inner.style.left = this.offsetInner + "px", each(this.slides, function(e, t) {
            t.style.left = 0
        }.bind(this))), this.hasVideoSlides && this._serveVideoSlide(), this.rearrange(), isFunction(this.options.onSlide) && this.options.onSlide(), this.slideshow && this.slideshowStart()
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
    },
    destroy: function() {
        this.slideshowStop(), this.removeAllHandlers(), this.hasVideoSlides = !1
    },
    getCurrentSlide: function() {
        return this.slides[this.current]
    },
    _initVideoSlides: function() {
        var e = this;
        each(this.slides, function() {
            var t = domData(this, "video");
            return t ? (e.hasVideoSlides = !0, !1) : void 0
        }), e.hasVideoSlides && (this._preloadVideos(), this._serveVideoSlide())
    },
    _isPreloadedVideo: function(e) {
        var t = !1;
        return each(ajaxCache, function(i, o) {
            return 0 == i.indexOf("/al_video.php?act=show_inline") && i.indexOf("&video=" + e) > 0 ? (t = !0, !1) : void 0
        }), t
    },
    _onVideoPreloaded: function(e, t) {
        if (e) {
            var i = t[3].player.params,
                o = i[0];
            VideoPlayer.preload(o)
        }
    },
    _preloadVideos: function() {
        var e = this;
        each(this.slides, function() {
            var t = domData(this, "video");
            if (t) {
                var i = e._getVideoParams(this);
                e._isPreloadedVideo(i.video) || loadInlineVideo(i, e._onVideoPreloaded, !0)
            }
        })
    },
    _onVideoStop: function() {
        this._videosIsPlay = !1, this.interacted = !1, this.slideshowStart()
    },
    _onVideoStart: function() {
        this._videosIsPlay = !0, this.interacted = !0, this.slideshowStop()
    },
    _onVideoLoaded: function(e, t) {
        this.videoPlayer = t, t.on("media.playing", function() {
            this.getCurrentSlide() === e ? this._onVideoStart() : (t.seekTo(0), t.pause())
        }.bind(this)), t.on("media.ended", function() {
            this._onVideoStop(), this.next()
        }.bind(this)), t.on("media.error", function() {
            this._onVideoStop(), this.next()
        }.bind(this)), t.on("media.pause", this._onVideoStop.bind(this)), t.on("_destroy", this._onVideoStop.bind(this))
    },
    _getVideoParams: function(e) {
        return {
            video: domData(e, "video"),
            list: domData(e, "hash"),
            autoplay: 1,
            from_autoplay: 1,
            module: "apps_slider",
            addParams: {
                from_autoplay: 1
            },
            no_progress: 1,
            cache: 1
        }
    },
    _serveVideoSlide: function() {
        var e, t, i, o, n = this.getCurrentSlide(),
            s = domData(n, "video");
        s ? (e = geByTag1("img", n), t = domData(e, "loading"), i = domData(e, "playing"), t || i ? this._canUseVideo() && this.videoPlayer && this.videoPlayer.play() : (o = this._getVideoParams(n), o.onLoaded = this._onVideoLoaded.bind(this, n), this._canUseVideo() && showInlineVideo(o.video, o.list, o, !1, e))) : this._canUseVideo() && this.videoPlayer && this.videoPlayer.pause()
    },
    _canUseVideo: function() {
        var e = window.wkcur && window.wkcur.shown && window.wkLayerWrap && isVisible(wkLayerWrap) || window.Videoview.isLayerShown();
        if (e) return !1;
        var t = ["paused", "ended"],
            i = cur.videoInlinePlayer ? cur.videoInlinePlayer.getState() : "unknown",
            o = ~t.indexOf(i);
        return !cur.videoInlinePlayer || cur.videoInlinePlayer === this.videoPlayer || o && !e
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
                this.scrollCheckBinded = this.scrollCheck.bind(this), this.sliderInit(), this.feedInit(), this.notificationsInit(), cur.scrollToHeader && (setTimeout(this.scrollToHeader.bind(this), 100), delete cur.scrollToHeader), cur.scrollToTop && (scrollToTop(), delete cur.scrollToTop), this.startEvents(), cur.destroy.push(function(e) {
                    setTimeout(function() {
                        var t;
                        e.fScrollbar && cur.fScrollbar != e.fScrollbar && (t = !1, globalHistory.forEach(function(i) {
                            i.cur != e && i.cur.fScrollbar == e.fScrollbar && (t = !0)
                        }), t || e.fScrollbar.destroy()), e.rNotScrollbar && cur.rNotScrollbar != e.rNotScrollbar && (t = !1, globalHistory.forEach(function(i) {
                            i.cur != e && i.cur.rNotScrollbar == e.rNotScrollbar && (t = !0)
                        }), t || e.rNotScrollbar.destroy())
                    }, 0), cur.featuredSlider && (cur.featuredSlider.destroy(), cur.featuredSlider = null)
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
                    return opts && (opts = eval("(" + opts + ")"), extend(opts.lang, cur.lang || {}), extend(cur, opts)), cur.preload = extend(cur.preload || {}, preload), cur.preload.before = preload_before, cur.preload.header = preload_header, (data = eval("(" + data + ")")) ? (void 0 === cur.searchOffset && (cur.searchOffset = 0), cur.curList = "all", cur.appsList = data[cur.curList] ? data : {
                        all: []
                    }, cur.sectionCount = this.isSection("catalog", "list") && !cur.searchStr ? 0 : cur.appsList[cur.curList].length, void this.indexAll(function() {
                        if (cur.silent = !1, cur.onSilentLoad)
                            for (var e in cur.onSilentLoad) isFunction(cur.onSilentLoad[e]) && cur.onSilentLoad[e]()
                    })) : cur.silent = !1
                }.bind(this))
            })
        }
    },
    withFastBackCheck: function(e) {
        cur.preventFastBack = !0;
        var t = cur;
        return function() {
            cur === t && (cur.preventFastBack = !1, e.apply(this, Array.prototype.slice.call(arguments)))
        }
    },
    startEvents: function() {
        addEvent(window, "scroll", this.scrollCheckBinded), addEvent(window, "resize", this.scrollCheckBinded), this.initUpdates(), this.scrollCheck(), this.sliderStart()
    },
    stopEvents: function() {
        removeEvent(window, "scroll", this.scrollCheckBinded), removeEvent(window, "resize", this.scrollCheckBinded), this.stopUpdates(), this.sliderStop()
    },
    isSection: function() {
        for (var e = arguments.length; e--;)
            if (arguments[e] === cur.section) return !0;
        return !1
    },
    isDelayedOnSilentLoad: function e(t, i) {
        return cur.silent ? (e.count = e.count || 0, e.count++, cur.onSilentLoad[t || "key_" + e.count] = i, !0) : void 0
    },
    handlePageCount: function(e) {
        return handlePageCount("ap", e)
    },
    incomingCall: function(e) {
        stManager.add(["notifier.js", "notifier.css", "apps.css", "call.css"], function() {
            var t = se('<div><div class="call_apps_wrap clear_fix">' + e + "</div></div>"),
                i = geByClass1("call_invitation_wrap", t, "div"),
                o = {
                    movable: i,
                    startLeft: parseInt((window.innerWidth - 224) / 2) + "px",
                    startTop: parseInt((window.innerHeight - 404) / 2) + "px",
                    startWidth: 224,
                    startHeight: 404,
                    resize: !1,
                    onBeforeHide: function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                };
            Apps.appCall && Apps.appCall.close(), Apps.appCall = new RBox(t, o)
        }), window.Notifier && Notifier.setRecvClbk("apps_call_hide", function() {
            Apps.appCall && (Apps.appCall.close(), Apps.appCall = !1)
        })
    },
    callApprove: function(e) {
        window.Notifier && Notifier.lcSend("apps_call_hide", (new Date).getTime()), Apps.appCall && (Apps.appCall.close(), Apps.appCall = !1), nav.go(e)
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
    blacklistInit: function(e, t, i) {
        function o() {
            if (a.scrollTop > 0 ? addClass(e.bodyNode.parentNode, "olist_topsh") : removeClass(e.bodyNode.parentNode, "olist_topsh"), a.scrollTop + (a.offsetHeight || a.clientHeight) < r.scrollHeight ? addClass(e.bodyNode.parentNode, "olist_botsh") : removeClass(e.bodyNode.parentNode, "olist_botsh"), c && c.offsetTop && c.onclick) {
                var t = c.offsetTop,
                    i = r.scrollTop,
                    o = r.offsetHeight || r.clientHeight;
                i + o + 100 >= t && c.onclick()
            }
        }

        function n(i) {
            var o = i.originalTarget || i.target;
            if (hasClass(o, "olist_item_wrap") || (o = gpeByClass("olist_item_wrap", o)), o && o != bodyNode) {
                if (hasClass(o, "olist_item_loading")) return cancelEvent(i);
                if (checkEvent(i)) return !0;
                e.changed = !0;
                var n = o.id.match(/-?\d+/)[0],
                    s = l[n],
                    a = !1;
                return each(t, function() {
                    return this[0] == n ? (a = this[4], !1) : void 0
                }), ajax.post("/al_apps.php", {
                    act: "a_blacklist_delete",
                    cancel: s ? 1 : 0,
                    owner_id: n,
                    hash: a
                }, {
                    onDone: function() {
                        toggleClass(o, "olist_item_wrap_on", !s), l[n] = !s
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

        function s(o, n) {
            n = n || 0;
            var a, d, u = n ? 60 : 120;
            o && (o = clean(o).replace(/\u2013|\u2014/g, "-")), a = o ? p.search(o) : t, d = i.tpl;
            var h = a.length;
            a = a.slice(n, n + u);
            var f = [];
            if (o) {
                var g = escapeRE(o),
                    v = parseLatin(o);
                null != v && (g = g + "|" + escapeRE(v));
                var _ = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + g + "))(?![^<>]*>)(?![^&;]+;)", "gi")
            }
            var w = function(e, t, i, o) {
                var n = (i[e[0]], e[1]);
                if (t) {
                    n = -1 == t.indexOf(" ") ? n.split(" ") : [n];
                    var s = "";
                    for (var a in n) s += (a > 0 ? " " : "") + n[a].replace(o, "$2<em>$3</em>");
                    n = s
                }
                return {
                    id: e[0],
                    name: n,
                    photo: e[2],
                    link: e[3] || (e[0] > 0 ? "id" + e[0] : "app" + (-e[0] + 1e9))
                }
            };
            each(a, function() {
                f.push(rs(d, w(this, o, l, _)))
            }), n || f.length || f.push('<div class="no_rows">' + (o ? getLang("global_search_not_found").replace("{search}", clean(o)) : i.lang.apps_blacklist_empty) + "</div>"), re(c), f = f.join(" "), n ? r.appendChild(cf(f)) : val(r, f), h > n + u && (r.appendChild(c), c.onclick = function(e) {
                return s(o, n + u), cancelEvent(e)
            }), e && e.scroll && e.scroll.update(!1, !0)
        }
        i = i || {};
        var a = geByClass1("apps_blacklist_wrap", e.bodyNode),
            r = geByClass1("apps_blacklist", e.bodyNode),
            c = geByClass1("olist_more", e.bodyNode, "a"),
            l = {},
            p = new vkIndexer(t, function(e) {
                return e[1]
            });
        e.setOptions({
            width: 560,
            bodyStyle: "padding: 0px"
        }), e.removeButtons().addButton(getLang("global_close"), function() {
            e.hide(200)
        }, "yes"), r.parentNode.style.height = i.boxHeight + "px";
        var d = ge("apps_blacklist_filter");
        i.nofocus || setTimeout(elfocus.pbind(d), 100);
        var u = data(d, "opts");
        data(d, "opts", extend(u, {
            onChange: s
        })), c && (isVisible(c) ? c.onclick = function(e) {
            return s("", 60), cancelEvent(e)
        } : (re(c), show(c))), addEvent(r, "click", n), addEvent(a, "scroll", o), setTimeout(o, 10)
    },
    initDescription: function(e) {
        var t = geByClass1("apps_i_description_content");
        val(t, e);
        var i = parseInt(getStyle(t, "line-height")),
            o = Math.ceil(getSize(t)[1] / i);
        o > 7 && (setStyle(t, "height", 5 * i), val(t, e), removeClass(geByClass1("apps_i_description_show_more"), this.optionHiddenClass))
    },
    showFullDescription: function() {
        addClass(geByClass1("apps_i_description_show_more"), this.optionHiddenClass), setStyle(geByClass1("apps_i_description_content"), "height", "")
    },
    appSsSliderNext: function() {
        cur.appSsSlider && cur.appSsSlider.next()
    },
    adjustRunBoxSize: function(e) {
        if (e) {
            var t = getSize(e),
                i = {
                    marginTop: -t[1] / 2
                };
            i[vk.rtl ? "marginRight" : "marginLeft"] = -t[0] / 2, setStyle(e, i)
        }
    },
    initAppSsSlider: function() {
        var e = ge("apps_i_slider_next"),
            t = ge("apps_i_slider_prev"),
            i = ge("apps_i_slider_outer"),
            o = ge("apps_i_slider_thumbs"),
            n = o ? domPN(o) : null,
            s = o ? o.children : [],
            a = null,
            r = null,
            c = function() {
                if (o) {
                    var e = n.offsetWidth,
                        t = o.scrollWidth;
                    if (e >= t || !t || !e) return;
                    var i = s[a],
                        c = (o.offsetLeft, i.offsetLeft),
                        l = i.offsetWidth,
                        p = -c + (e - l) / 2;
                    p = Math.max(-t + e, Math.min(0, p)), r && r.stop(), r = animate(o, {
                        left: p
                    }, {
                        duration: cur.appSsSlider.options.animationDuration,
                        transition: Fx.Transitions.easeOutCubic
                    })
                }
            },
            l = function(e) {
                o && e !== a && (null !== a && removeClass(s[a], "selected"), a = e, addClass(s[a], "selected"), c())
            };
        if (onRequired = function() {
                l(null !== cur.appSsSlider.required ? cur.appSsSlider.required : cur.appSsSlider.current)
            }, onChange = function() {
                cur.appSsSlider.slideNext ? addClass(e, "apps_i_slider_available") : removeClass(e, "apps_i_slider_available"), cur.appSsSlider.slidePrev ? addClass(t, "apps_i_slider_available") : removeClass(t, "apps_i_slider_available"), hasClass(cur.appSsSlider.slideCurrent, "apps_promo_video_slide") ? addClass(i, "apps_i_slider_video") : removeClass(i, "apps_i_slider_video"), cur.appSsSlider.slideNext ? removeClass(i, "apps_i_slider_run") : addClass(i, "apps_i_slider_run")
            }, cur.appSsSlider = new AppsSlider({
                inner: ge("apps_i_slider_inner"),
                outer: i,
                next: e,
                prev: t,
                onChange: onChange,
                onRequired: onRequired,
                infinite: !1
            }), onChange(), onRequired(), this.adjustRunBoxSize(ge("apps_i_run_box")), each(s, function(e, t) {
                var i = new Image;
                i.onload = c, i.src = geByTag1("img", t).src, addEvent(t, "click", function() {
                    cur.appSsSlider && cur.appSsSlider.requireIndex(e)
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
    showWinInstructions: function(e, t, i) {
        setTimeout(function() {
            new MessageBox({
                width: 800,
                title: cur.winInstrTitle,
                hideButtons: !0,
                containerClass: "apps_win_instr_wrap"
            }).content(rs(trim(cur.winInstrTpl), {
                download_link: t,
                help_link: i
            })).show()
        }.bind(this), 500)
    },
    sendInstallRequest: function(e, t, i, o, n, s) {
        var a = !!geByClass1("apps_install_header");
        if (e && !isButtonLocked(e) && !hasClass(e, "button_disabled")) {
            lockButton(e);
            var r = getSize(e);
            t ? ajax.post(this.address, {
                act: "send_install_request",
                aid: i,
                ref: o,
                cid: n,
                hash: s
            }, {
                hideProgress: function() {
                    var t = getLang("apps_install_push_sent_msg");
                    unlockButton(e), addClass(e, "button_disabled"), setStyle(e, "width", r[0]), val(e, t);
                    var i = ge("apps_i_run_box");
                    addClass(i, "sent"), val(i, t), this.adjustRunBoxSize(i)
                }.bind(this)
            }) : (cur.ref = o, ajax.post(this.address, {
                act: "send_install_request_box",
                aid: i
            }, {
                onDone: function(t, n, s) {
                    if (unlockButton(e), n) {
                        cur.lang || (cur.lang = {}), extend(cur.lang, t);
                        var r = new MessageBox({
                            title: getLang("apps_get_push_w_install_link")
                        });
                        r.removeButtons(), r.content(n), r.addButton(getLang("apps_install_sms_send"), function(t) {
                            if (e = ge("apps_i_request_btn") || e, t && e && !isButtonLocked(t)) {
                                var n = getSize(e);
                                lockButton(t), ajax.post(this.address, {
                                    act: "send_install_request",
                                    ref: o,
                                    aid: i,
                                    cid: -3,
                                    hash: s
                                }, {
                                    onFail: function(e) {
                                        if (e) {
                                            var i = ge("app_sms_tt_error");
                                            val(i, e), show(i), unlockButton(t)
                                        }
                                    },
                                    onDone: function() {
                                        this.ttDestroyAll(), r.hide();
                                        var i = getLang("apps_install_push_sent_msg");
                                        unlockButton(t), addClass(e, "button_disabled"), a || setStyle(e, "width", n[0]), val(e, i);
                                        var o = ge("apps_i_run_box");
                                        addClass(o, "sent"), val(o, i), this.adjustRunBoxSize(o)
                                    }.bind(this)
                                })
                            }
                        }.bind(this), "yes"), r.addButton(getLang("global_cancel"), r.hide, "no"), r.show()
                    } else showBox("activation.php", {
                        act: "change_phone_box",
                        hash: s
                    })
                }.bind(this)
            }))
        }
    },
    deletingApp: !1,
    showInviteBox: function(e, t) {
        e || (e = cur.app.options.aid, t = cur.app.options.hash), showTabbedBox("al_friends.php", {
            act: "select_friends_box",
            Checked: "",
            invite: 1,
            aid: e,
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
                aid: e,
                friends: i.join(","),
                hash: t
            }, {
                onDone: function(e, t) {
                    setTimeout(showFastBox({
                        title: e
                    }, t).hide, 2e3)
                },
                onFail: function(e) {
                    return setTimeout(showFastBox({
                        title: getLang("global_error")
                    }, e).hide, 2e3), !0
                }
            })
        }
    },
    showAppFriends: function(e, t, i) {
        var o = showBox(Apps.address, {
            act: "show_app_friends_box",
            aid: e
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
        }, t);
        return o.setControlsText('<a href="" onclick="Apps.showInviteBox(' + e + ", '" + i + "'); return false;\">" + getLang("apps_invite_friends") + "</a>"), o
    },
    recountAddVotes: function(e) {
        var t = e.value.replace(/[^0-9]/g, "");
        val("add_votes", langNumeric(t, votes_flex)), t > 0 && ge("app_pay_withdraw") && (ge("app_pay_withdraw").value = 0, this.recountWithdrawVotes(ge("app_pay_withdraw")))
    },
    recountWithdrawVotes: function(e) {
        var t = e.value.replace(/[^0-9]/g, "");
        val("withdraw_votes", langNumeric(t, votes_flex)), t > 0 && (ge("app_pay_add").value = 0, this.recountAddVotes(ge("app_pay_add")))
    },
    initAppView: function(e, t) {
        t.layer || cur.nav.push(function(e, t, i, o) {
            return void 0 !== e[0] || e.join || o.pass ? void 0 : e["#"] ? (cur.app.onLocChanged(e["#"]), o.back ? 3 != vk.al && nav.setLoc(i) : nav.setLoc(i), !1) : (nav.setLoc(i), !1)
        });
        var i = function(e) {
            "block" == e.type ? cur.app.runCallback("onWindowBlur") : cur.app.runCallback("onWindowFocus")
        };
        cur.app.onReady.push(function() {
            cur.app.onLocChanged(e.hash), addEvent(document, "block unblock", i, !0), cur.destroy.push(function() {
                removeEvent(document, "block unblock", i)
            })
        }), t.icon && (setFavIcon(t.icon), cur.destroy.push(function() {
            setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico")
        }))
    },
    loadSettings: function(e) {
        ajax.post(this.address, {
            act: "show_settings",
            aid: cur.aid
        }, extend({
            cache: 1
        }, e))
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
    saveSettings: function(e, t, i, o) {
        if (!cur.savingSettings) {
            i || (o && o.btn && lockButton(o.btn), show("apps_settings_progress"));
            var n = curBox(),
                s = ge("app_pay_add"),
                a = ge("app_pay_withdraw"),
                r = {
                    act: "save_settings",
                    aid: e,
                    hash: t,
                    from: "appview",
                    app_settings_1: isChecked("app_settings_1"),
                    app_settings_256: isChecked("app_settings_256"),
                    add: s ? s.value : 0,
                    withdraw: a ? a.value : 0,
                    only_checkboxes: i ? 1 : 0,
                    cur_aid: cur.aid
                };
            isVisible("app_settings_2097152") && (r.app_settings_2097152 = isChecked("app_settings_2097152")), ajax.post("apps", r, extend({
                onDone: function(e) {
                    o && o.btn && unlockButton(o.btn), e.left_nav && this.updateLeftNav(e.left_nav), !i && cur.app && cur.app.runCallback("onSettingsChanged", e.settings), cur.settingsOnLoad = !1, void 0 !== e.coins && cur.app && cur.app.balanceUpdated(e.coins), void 0 !== e.balance && updateMoney(e.balance), n && !i && n.hide(), Apps.addToMenuErrorResolve(e, function(e) {
                        i && checkbox("app_settings_256", 256 & e.settings)
                    }), this.updateAddToMenuAction()
                }.bind(this),
                onFail: function(e) {
                    e && val("apps_settings_error", e), show("apps_settings_error"), hide("apps_settings_progress"), scrollToTop(200)
                },
                showProgress: function() {
                    cur.savingSettings = !0, n && n.showProgress()
                },
                hideProgress: function() {
                    cur.savingSettings = !1, n && n.hideProgress()
                }
            }, o || {}))
        }
    },
    updateAddToMenuAction: function() {
        var e = ge("app_add_to_menu_action");
        if (e && cur.aid && cur.app && cur.app.options) {
            var t = ge("l_app" + cur.aid);
            actionsMenuItemLocked(e) && unlockActionsMenuItem(e), e.setAttribute("onclick", "return Apps.addToMenu(" + cur.aid + ", '" + cur.app.options.hash + "', " + intval(!t) + ", this);"), val(e, t ? getLang("apps_remove_from_left_menu") : getLang("apps_add_to_left_menu"))
        }
    },
    addToMenu: function(e, t, i, o) {
        actionsMenuItemLocked(o) || ajax.post("al_apps.php", {
            act: "a_left_menu",
            aid: e,
            hash: t,
            show: i
        }, {
            onDone: function(e) {
                this.updateLeftNav(e.left_nav), this.updateAddToMenuAction(), Apps.addToMenuErrorResolve(e)
            }.bind(this),
            showProgress: lockActionsMenuItem.pbind(o),
            hideProgress: unlockActionsMenuItem.pbind(o)
        })
    },
    addToMenuErrorResolve: function(e, t) {
        e.left_nav_error ? window.menuSettings && cur.app ? (cur.settingsBoxSetLeftMenuAppCallback = function(i) {
            delete cur.settingsBoxSetLeftMenuAppCallback, !i || 256 & e.settings || (e.settings += 256), isFunction(t) && t(e)
        }, showTabbedBox("al_settings.php", {
            act: "menu_box",
            type: 2,
            aid: cur.aid
        })) : (showFastBox({
            title: getLang("global_error")
        }, e.left_nav_error), isFunction(t) && t(e)) : isFunction(t) && t(e)
    },
    showAppSettings: function(e, t) {
        this.ttHideAll(), t ? showBox(this.address, {
            act: "settings_box_info",
            aid: e
        }, {
            params: {
                dark: 1
            }
        }) : showBox(this.address, {
            act: "settings_box",
            aid: e,
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
    updateOffline: function(e) {
        ajax.post(Apps.address, {
            act: "update_offline",
            aid: (e || cur).aid,
            hash: (e || cur).app.options.hash
        })
    },
    deleteApp: function(e, t, i, o) {
        if (!this.deletingApp) {
            this.deletingApp = !0;
            var n = function(i, o, n, s) {
                ajax.post(this.address, {
                    act: "quit",
                    id: e,
                    hash: t || cur.app.options.hash,
                    from: "app"
                }, {
                    onDone: this.withFastBackCheck(function(e) {
                        this.deletingApp = !1, window.appsListChanged = !0, this.notificationsSetCounters(e.count_all), e.left_nav && this.updateLeftNav(e.left_nav), cur._back = !1, i.apply(null, [].slice.call(arguments))
                    }.bind(this)),
                    onFail: this.withFastBackCheck(function() {
                        this.deletingApp = !1, o.apply(null, [].slice.call(arguments))
                    }.bind(this)),
                    showProgress: n,
                    hideProgress: s
                })
            }.bind(this);
            switch (o) {
                case "appactions":
                    n(function() {
                        nav.go("/apps", !1)
                    }, function(e) {
                        e && showFastBox({
                            title: getLang("global_error")
                        }, e), unlockActionsMenuItem(i)
                    }, lockActionsMenuItem.pbind(i));
                    break;
                default:
                    var s = curBox();
                    n(function() {
                        nav.go("/apps", !1)
                    }, function(e) {
                        if (e) {
                            var t = ge("apps_settings_error");
                            val(t, e), show(t), scrollToTop()
                        }
                        s && s.hideProgress()
                    }, function() {
                        s && s.showProgress()
                    })
            }
        }
    },
    reportApp: function(e, t) {
        showBox("al_reports.php", {
            act: "report_app_box",
            app_id: e,
            place_id: t
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
    approveInstall: function(e, t, i) {
        i && actionsMenuItemLocked(i) || (i && lockActionsMenuItem(i), window.appsListChanged = 1, nav.go(extend(nav.objLoc, {
            join: 1,
            hash: e,
            sett: t,
            notify: isChecked("apps_notifications_checkbox") && isVisible("apps_notifications_checkbox") ? 1 : void 0
        }), !1, {
            pass: !0
        }))
    },
    installApp: function(e, t, i) {
        ajax.post(Apps.address, {
            act: "do_install",
            aid: e,
            hash: t
        }, {
            onDone: function(e) {
                e == cur && (Apps.onAppAdded(), i && i())
            }.pbind(cur)
        })
    },
    onAppAdded: function() {
        window.appsListChanged = !0, cur.preload && delete cur.preload.before, cur.app && (cur.app.runCallback("onApplicationAdded"), cur.appUser = !0, hide("apps_install_btn"), show("apps_show_settings"))
    },
    rateOver: function(e) {
        var t = !!geByClass1("apps_install_header");
        cur.rated || hasClass(e, "not_installed") || addClass(e, "over");
        var i = "",
            o = [],
            n = 0,
            s = [cur.installPage ? -70 : -66, 0, -36],
            a = "left",
            r = 15,
            c = 0,
            l = cur.appUser ? cur.userRate ? getLang("apps_you_voted") : getLang("apps_you_not_voted") : getLang("apps_rating_title"),
            p = rs(cur.rateStatsLabelTpl, {
                label: l
            });
        for (var d in cur.rateStats || {}) n += intval(cur.rateStats[d]);
        val("app_rate_label", l);
        for (var u = 1; 5 >= u; u++) {
            i += '<span class="app_rate stats fl_r"></span>';
            var h = intval(cur.rateStats[u]),
                f = n ? intval(100 * h / n) : 0,
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
        p += o.reverse().join(""), t && (a = "top", s = [210, 0, 10], r = 0, c = 15), showTooltip(e, {
            text: p,
            slideX: r,
            slide: c,
            className: "app_rate_tt",
            shift: s,
            forcetodown: !0,
            dir: a,
            hasover: 1
        })
    },
    rateOut: function(e) {
        Apps.showRate(), removeClass(e, "over")
    },
    rateApp: function(e) {
        if (cur.rated) return !1;
        var t = ge("apps_ratings");
        cur.appRate = cur.userRate = e, Apps.rateOut(t), cur.rated = !0, ajax.post("/al_apps.php", {
            act: "rate_app",
            aid: cur.aid,
            rate: e,
            hash: cur.rate_hash
        }, {
            onDone: function(e) {
                cur.rateStats = e, Apps.rateOver(t)
            }
        })
    },
    showRate: function(e) {
        if (cur.rated) return !1;
        var t = intval(cur.appRate || 0),
            i = geByClass("app_rate", ge("apps_ratings")),
            o = Math.floor((t + 2) / 10),
            n = Math.floor((t + 2) / 5) - o;
        for (var s in i) {
            var a = "app_rate fl_l " + (o > s ? "full" : n > s ? "half" : "empty");
            i[s].className = a
        }
        if (e) {
            var r = Math.floor(e / 10);
            for (var s in i) {
                if (s >= r) break;
                i[s].className += " over"
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
                    if (apps && (each(geByClass("apps_recent_row", cur.rAppsWrap), function(e, t) {
                            re(t)
                        }), apps[0] ? (show(cur.rAppsShowMoreButton), hide(cur.rAppsNoContent), domInsertBefore(cf(apps[0]), cur.rAppsShowMoreButton)) : (hide(cur.rAppsShowMoreButton), show(cur.rAppsNoContent)), cur.recentOffset = apps[1], apps[2])) {
                        apps[2] = eval("(" + apps[2] + ")");
                        for (var i in apps[2]) cur.apps[apps[2][i][0]] = apps[2][i]
                    }
                    if (notifications) {
                        each(geByClass("apps_notification_row", cur.rNotWrap), function(e, t) {
                            re(t)
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
    notificationsMarkReaded: function(e) {
        e.removeAttribute("data-read"), removeClass(e, "apps_notification_row_new")
    },
    notificationsReadContent: function() {
        "notifications" === nav.objLoc.tab && (this.notificationsReadTimeout && clearTimeout(this.notificationsReadTimeout), this.notificationsReadTimeout = setTimeout(function() {
            var e = [],
                t = [];
            each(cur.rNotWrap.querySelectorAll('div[data-read="1"]'), function(i, o) {
                o.offsetTop + o.offsetHeight / 2 <= cur.rNotScrollbar.data.scrollTop + cur.rNotScrollbar.data.viewportHeight && (e.push(o.getAttribute("data-id")), t.push(o))
            }), e.length && ajax.post(this.address, {
                act: "a_mark",
                newest: cur.notificationsNewest,
                notif_ids: e.join(","),
                hash: cur.notificationsHash
            }, {
                onDone: this.withFastBackCheck(function(e) {
                    this.notificationsSetCounters(e), each(t, function(e, t) {
                        this.notificationsMarkReaded(t)
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
            onDone: this.withFastBackCheck(function(e, t, i) {
                unlockButton(cur.rNotShowMoreButton), cur.notificationsOffset = t, e && cur.rNotShowMoreButton && cur.rNotShowMoreButton.parentNode.insertBefore(cf(e), cur.rNotShowMoreButton), i && hide(cur.rNotShowMoreButton), cur.rNotScrollbar.update()
            }),
            onFail: this.withFastBackCheck(function() {
                hide(cur.rNotShowMoreButton)
            })
        }))
    },
    notificationsRemoveAll: function(e, t, i, o, n) {
        if (!linkLocked(e) && !checkEvent(n)) {
            var s = showFastBox({
                title: t
            }, i, getLang("global_delete"), function(t) {
                ajax.post(this.address, {
                    act: "remove_all_notifications_and_requests",
                    newest: cur.notificationsNewest,
                    hash: o
                }, {
                    onDone: this.withFastBackCheck(function() {
                        each(geByClass("apps_notification_row", cur.rNotWrap), function(e, t) {
                            re(t)
                        }), hide(cur.rNotShowMoreButton), show(cur.rNotNoContent), this.notificationsSetCounters(0), cur.rNotScrollbar && cur.rNotScrollbar.update()
                    }.bind(this)),
                    showProgress: function() {
                        lockButton(t), lockLink(e)
                    },
                    hideProgress: this.withFastBackCheck(function() {
                        unlockButton(t), unlockLink(e), s.hide()
                    })
                })
            }.bind(this), getLang("global_cancel"));
            return !1
        }
    },
    notificationsSetCounters: function(e) {
        if (void 0 !== e && (cur.notificationsNew = e, this.handlePageCount(e), cur.rNotCounter)) {
            var t = 1e3 > e ? e + "" : ".." + (e + "").substr(-3);
            e && removeClass(cur.rNotCounter, this.optionHiddenClass), e ? removeClass(cur.rNotCounter, "ui_tab_count_hidden") : addClass(cur.rNotCounter, "ui_tab_count_hidden"), animateCount(cur.rNotCounter, t, {
                str: t,
                onDone: e ? void 0 : addClass.pbind(cur.rNotCounter, this.optionHiddenClass)
            })
        }
    },
    rejectRequest: function(e, t, i, o) {
        if (!buttonLocked(e)) {
            var n = ge("apps_notification_" + t);
            this.notificationsMarkReaded(n), data(n, "html", n.innerHTML), setStyle(n, {
                minHeight: getSize(n)[1]
            }), ajax.post(this.address, {
                act: "reject_" + o,
                newest: cur.notificationsNewest,
                rid: t,
                hash: i
            }, {
                onDone: this.withFastBackCheck(function(e, t, i) {
                    t = cf(trim(t)), this.notificationsRemovedCount++ > 1 && domFC(t).appendChild(cf(cur.notificationsRemoveAllTpl || "")), val(e, ""), e.appendChild(t), addClass(e, "apps_notification_service"), this.notificationsSetCounters(i), cur.rNotScrollbar.update()
                }.bind(this, n)),
                showProgress: lockButton.pbind(e),
                hideProgress: this.withFastBackCheck(unlockButton.pbind(e))
            }), cur.rNotScrollbar.update(), cur.preload && delete cur.preload.before
        }
    },
    requestsRestore: function(e, t, i) {
        if (!linkLocked(e)) {
            var o = ge("apps_notification_" + t);
            ajax.post(this.address, {
                act: "request_restore",
                newest: cur.notificationsNewest,
                rid: t,
                hash: i
            }, {
                onDone: this.withFastBackCheck(function(e, t) {
                    this.notificationsRemovedCount--, val(e, data(e, "html")), removeClass(e, "apps_notification_service"), setStyle(e, {
                        minHeight: ""
                    }), this.notificationsSetCounters(t), cur.rNotScrollbar.update()
                }.bind(this, o)),
                showProgress: lockLink.pbind(e),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(e))
            }), cur.rNotScrollbar.update(), cur.preload && delete cur.preload.before
        }
    },
    deleteNotification: function(e, t, i, o) {
        if (!buttonLocked(e)) {
            var n = ge("apps_notification_" + t);
            setStyle(n, {
                minHeight: getSize(n)[1]
            }), ajax.post(this.address, {
                act: "delete_notification",
                newest: cur.notificationsNewest,
                nid: t,
                aid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(e, t, i) {
                    t = cf(trim(t)), this.notificationsRemovedCount++ > 1 && domFC(t).appendChild(cf(cur.notificationsRemoveAllTpl || "")), val(e, ""), e.appendChild(t), addClass(e, "apps_notification_service"), this.notificationsSetCounters(i)
                }.bind(this, n)),
                showProgress: lockButton.pbind(e),
                hideProgress: this.withFastBackCheck(unlockButton.pbind(e))
            })
        }
    },
    denyNotifications: function(e, t, i, o) {
        if (!linkLocked(e)) {
            var n = ge("apps_notification_" + t);
            setStyle(n, {
                minHeight: getSize(n)[1]
            }), ajax.post(this.address, {
                act: "deny_notifications",
                aid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(e, t) {
                    addClass(e, "apps_notification_service"), t && val(e, t)
                }.pbind(n)),
                showProgress: lockLink.pbind(e),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(e))
            })
        }
    },
    requestsBanUser: function(e, t, i, o) {
        if (!linkLocked(e)) {
            var n = ge("apps_notification_" + t);
            setStyle(n, {
                minHeight: getSize(n)[1]
            }), ajax.post(this.address, {
                act: "request_ban_user",
                mid: i,
                hash: o
            }, {
                onDone: this.withFastBackCheck(function(e, t) {
                    addClass(e, "apps_notification_service"), t && val(e, t)
                }.pbind(n)),
                showProgress: lockLink.pbind(e),
                hideProgress: this.withFastBackCheck(unlockLink.pbind(e))
            })
        }
    },
    removingApp: !1,
    restoringApp: !1,
    appsTabSelect: function(e) {
        delete nav.objLoc.tab, nav.setLoc(nav.objLoc), addClass(cur.rNotBlackList, this.optionHiddenClass)
    },
    updateLeftNav: function(e) {
        e && val(geByTag1("ol", ge("side_bar")), e)
    },
    restoreApp: function(e, t, i) {
        if (this.restoringApp) return !1;
        var o = ge("app" + e);
        return cur.deletedApps[e] && "al_apps" == cur.deletedApps[e].from && val(geByClass1("app_deleted_layer", o, "div"), cur.progressTpl), ajax.post(this.address, {
            act: "join",
            gid: cur.gid,
            gidhash: i,
            id: e,
            hash: t,
            restore: 1,
            from: "al_apps",
            section: cur.section
        }, {
            onDone: this.withFastBackCheck(function(t) {
                cur.deletedApps[e] && (val(o, cur.deletedApps[e].html), t.left_nav && this.updateLeftNav(t.left_nav), delete cur.deletedApps[e]), cur.apps[e] && (delete cur.apps[e].deleted, cur.appsIndex.add(cur.apps[e])), removeClass(o, "deleted")
            }.bind(this)),
            showProgress: function() {
                this.restoringApp = !0, addClass(o, this.optionLoadingClass)
            }.bind(this),
            hideProgress: this.withFastBackCheck(function() {
                this.restoringApp = !1, removeClass(o, this.optionLoadingClass)
            }.bind(this))
        }), !1
    },
    removeApp: function(e, t, i, o, n) {
        if (o && cancelEvent(o), this.removingApp) return !1;
        if (this.isDelayedOnSilentLoad("removeApp" + e, this.removeApp.bind(this, e, t, i))) return !1;
        this.ttDestroyAll();
        var s = i ? ge("recent" + e) : ge("app" + e),
            a = s && cur.lContent && cur.lContent.contains(s) && this.isSection("settings") ? "settings" : i ? "recent" : "al_apps",
            r = function() {
                if ("al_apps" == a) {
                    var i = s && geByClass1("app_deleted_layer", s, "div");
                    val(i, cur.progressTpl)
                } else if ("recent" == a) var o = cur.rAppsWrap && geByClass1("apps_recent_row_hidden", cur.rAppsWrap);
                ajax.post(this.address, {
                    act: "quit",
                    gid: cur.gid,
                    id: e,
                    hash: t,
                    offset: cur.recentOffset,
                    from: a
                }, {
                    onDone: this.withFastBackCheck(function(t) {
                        "apps" == cur.module && (delete cur.preload, "notifications" != nav.objLoc.tab && cur.rNotWrap && this.isSection("catalog", "list") ? this.recentTabsUpdate(!1, !0) : (window.notificationsListChanged = !0, t.count_all && this.notificationsSetCounters(t.count_all)), window.appsListChanged = !0, cur.apps[e] && (cur.appsIndex.remove(cur.apps[e]), cur.apps[e].deleted = !0), t.left_nav && this.updateLeftNav(t.left_nav), "settings" == a ? (cur.deletedApps[e] = {
                            from: a,
                            html: s.innerHTML
                        }, s && s.appendChild(cf(t.html))) : "recent" == a ? (o && removeClass(o, "apps_recent_row_hidden"), hide(s), t.html && domInsertBefore(cf(t.html), cur.rAppsShowMoreButton), geByClass1("apps_recent_row", cur.rAppsWrap) ? cur.recentOffset += t.offset : (hide(cur.rAppsShowMoreButton), show(cur.rAppsNoContent), cur.recentOffset = 0)) : (cur.deletedApps[e] = {
                            from: a,
                            html: s.innerHTML
                        }, t.html && val(i, t.html)), addClass(s, "deleted"))
                    }.bind(this)),
                    showProgress: function() {
                        addClass(s, this.optionLoadingClass), this.removingApp = !0
                    }.bind(this),
                    hideProgress: this.withFastBackCheck(function() {
                        removeClass(s, this.optionLoadingClass), this.removingApp = !1
                    }.bind(this))
                })
            }.bind(this);
        if ("recent" == a) var c = showFastBox({
            title: getLang("apps_quit_app_box_title")
        }, getLang(n ? "apps_game_quit_confirm" : "apps_quit_confirm"), getLang("apps_remove"), function() {
            r(), c.hide()
        }, getLang("global_cancel"));
        else if (cur.adminApps && cur.adminApps[e]) var c = showFastBox({
            title: getLang("apps_deletingapp")
        }, getLang("apps_admin_quit"), getLang("global_delete"), function() {
            r(), c.hide();
        }, getLang("global_cancel"));
        else r()
    },
    runApp: function(e, t, i, o, n, s) {
        if (!vk.id) return showDoneBox(cur.pleaseSignInLang), !1;
        lockButton(e);
        var a = clone(nav.objLoc);
        delete a.w, nav.setLoc(a), window.appsListChanged = 1;
        var r = "/" + t + "?join=1&hash=" + i + "&sett=" + o;
        if (cur.fromInstallBox && (r += "&from_install=" + (1 == cur.fromInstallBox ? 1 : 2)), n)
            if (isObject(n))
                for (var c in n) "w" != c && (r += "&" + c + "=" + n[c]);
            else "" != n && (r += "&ref=" + n);
        s && (r += "&mid=" + s), nav.objLoc["#"] && (r += "#" + nav.objLoc["#"]), nav.go(r)
    },
    updatesInterval: null,
    stopUpdates: function() {
        this.updatesInterval && clearInterval(this.updatesInterval)
    },
    initUpdates: function(e) {
        e && e.key && (cur.updatesKey = e.key);
        var t = function() {
            if (window.Notifier && cur.updatesKey) {
                Notifier.addKey(cur.updatesKey, function(e, t) {
                    if (cur.updatesKey) {
                        if (t.events)
                            for (var i in t.events) this.parseEvent(t.events[i]);
                        t.ts && (cur.updatesKey.ts = t.ts)
                    }
                }.bind(this))
            }
        }.bind(this);
        t(), this.updatesInterval = setInterval(t, 1e4), cur.destroy.push(this.stopUpdates.bind(this))
    },
    parseEvent: function(e) {
        function t() {
            cur.fScrollbar && cur.fScrollbar.update(), o ? c.removeEventListener("oTransitionEnd", t) : removeEvent(c, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t)
        }
        var e = e.split("<!>"),
            i = e[0];
        if (cur.updatesVersion && i == cur.updatesVersion) {
            var o = browser.opera && intval(browser.version) <= 12,
                n = e[3],
                s = new Date,
                a = s.getHours(),
                r = s.getMinutes();
            10 > a && (a = "0" + a), 10 > r && (r = "0" + r), n = n.replace("{date}", a + ":" + r);
            var c = domFC(cf(n));
            if (cur.fWrap) {
                var l = cur.fWrap.__uiScroll__ ? cur.fWrap.__uiScroll__.content : cur.fWrap;
                addClass(c, "apps_feed_row_just_added"), l.insertBefore(c, domFC(l)), o ? c.addEventListener("oTransitionEnd", t) : addEvent(c, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), removeClassDelayed(c, "apps_feed_row_just_added"), this.ttHideAll()
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
            onDone: this.withFastBackCheck(function(e, t, i) {
                cur.feedOffset = t, e && cur.fShowMoreButton && cur.fShowMoreButton.parentNode.insertBefore(cf(e), cur.fShowMoreButton), i && hide(cur.fShowMoreButton), cur.fScrollbar && cur.fScrollbar.update()
            }),
            showProgress: lockButton.pbind(cur.fShowMoreButton),
            hideProgress: this.withFastBackCheck(unlockButton.pbind(cur.fShowMoreButton))
        })
    },
    myAppOver: function(e, t, i) {
        return hasClass(t, "deleted") || !vk.id ? !1 : void showTooltip(t, {
            url: this.address,
            params: {
                act: "show_app_friends_tt",
                aid: e,
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
    ttScore: function(e, t, i) {
        var o = void 0;
        return cur.ttScoreShown && window.tooltips && (tooltips.hideAll(), o = 0), showTooltip(e, {
            center: 1,
            black: 1,
            shift: [0, 8, 8],
            showsp: o,
            text: '<div class="apps_score_tt_cont"><b>'.concat(t, "</b>", i ? '<div class="apps_score_tt">' + i + "</div>" : "", "</div>")
        })
    },
    ttCommon: function(e, t, i) {
        return i = extend({
            parent: void 0,
            center: void 0,
            event: 0,
            appendEl: void 0,
            shift: void 0
        }, i), 0 === i.event && (i.event = window.event), i.event && cancelEvent(i.event), i.appendEl && (i.appendEl = ge(i.appendEl)), i.center ? showTooltip(e, {
            center: i.center,
            shift: i.shift || [0, 8, 8],
            black: 1,
            appendEl: i.appendEl,
            text: t
        }) : showTitle(e, t, i.shift, i)
    },
    ttHideAll: function() {
        window.tooltips && tooltips.hideAll()
    },
    ttDestroyAll: function() {
        window.tooltips && tooltips.destroyAll()
    },
    scrollToHeader: function() {
        var e = ge("apps_header_block"),
            t = scrollNode.scrollTop,
            i = getSize("page_header_cont")[1];
        if (e) {
            var o = Math.max(0, getXY(e)[1] - parseInt(getStyle(e, "marginTop"), 10));
            t + (vk.staticheader ? Math.max(0, i - t) : i) > o && scrollToY(o, 200)
        }
    },
    scrollToSearch: function() {
        var e = scrollNode.scrollTop,
            t = getSize("page_header_cont")[1];
        if (cur.aSearchWrap) {
            var i = getXY(domPN(cur.aSearchWrap))[1];
            e + (vk.staticheader ? Math.max(0, t - e) : t) > i && scrollToY(i, 200)
        }
    },
    scrollCheck: function() {
        this.isDelayedOnSilentLoad("scrollCheck", this.scrollCheck.bind(this)) || !browser.mobile && !cur.isAppsLoading && !cur.disableAutoMore && isVisible(cur.lShowMoreButton) && (window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight) + scrollGetY() + 400 >= cur.lShowMoreButton.offsetTop && this.searchLoadContent()
    },
    searchFocusedClass: "apps_search_focused",
    backupListContent: function(e) {
        if (cur.backupList || e) {
            if (cur.backupList && !cur.backupList.contentCopied && e) {
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
    indexAll: function(e) {
        cur.appsIndex = new vkIndexer(cur.appsList.all, function(e) {
            try {
                return cur.apps[parseInt(e[0])] = e, e[3]
            } catch (t) {
                return ""
            }
        }, e)
    },
    searchUpdate: function(e) {
        if (!this.isDelayedOnSilentLoad("searchUpdate", this.searchUpdate.bind(this, e))) {
            if (e = this.searchValFix(e), e.length < 2 && (e = ""), cur.ignoreEqual || cur.searchStr !== e) {
                this.isSection("list") && e && this.backupListContent(), cur.searchStr = e || "";
                var t = this.isSection("apps", "settings", "manage", "reports", "ads") ? "all" : "search";
                if (e && this.isSection("apps", "settings", "manage", "reports", "ads")) {
                    var i = cur.appsIndex.search(clean(e));
                    cur.curList = t + "_search_" + e, cur.appsList[cur.curList] = i, e += " " + (parseLatin(e) || ""), e = trim(escapeRE(e).split("&").join("&amp;")), cur.selection = {
                        re: new RegExp("(" + e.replace(cur.appsIndex.delimiter, "|") + ")", "gi"),
                        val: "<span>$1</span>"
                    }
                } else cur.curList = t, cur.selection = !1;
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
                    var e = clean(cur.searchStr),
                        t = this.isSection("manage"),
                        i = "",
                        o = cur.appsList[cur.curList] || [],
                        n = o.length;
                    if (o = this.filter(o.slice(cur.shownApps)).slice(0, cur.defaultCount), o.length && cur.appTpl) {
                        var s = [];
                        each(o, function(e, i) {
                            i = clone(i), cur.selection && (i[3] = i[3].replace(cur.selection.re, cur.selection.val)), s.push(cur.appTpl(i, e == o.length - 1, t))
                        }.bind(this)), i = s.join("")
                    }
                    cur.shownApps ? i && cur.lContent.appendChild(cf(i)) : i ? (val(cur.lContent, i), val(cur.aSummaryCounter, n)) : (val(cur.lContent, cur.aSummary.innerHTML.replace("{query}", "<b>" + e + "</b>")), val(cur.aSummaryCounter, "")), cur.shownApps += cur.defaultCount, cur.shownApps >= cur.sectionCount ? hide(cur.lShowMoreButton) : (show(cur.lShowMoreButton), this.scrollCheck()), this.searchProgress(!1)
                }
                return !1
            }
            return !0
        }
    },
    searchLoadContent: function() {
        if (this.isSection("catalog", "list")) {
            if (cur.searchStr || (cur.searchStr = ""), cur.lPreload.innerHTML) {
                for (var e = document.createDocumentFragment(); cur.lPreload.firstChild;) e.appendChild(cur.lPreload.firstChild);
                cur.lContent.appendChild(e)
            }
            return cur.loadMore ? this.searchCatalog(cur.searchStr, cur.searchOffset) : (cur.loadMore = !0, hide(cur.lShowMoreButton)), !1
        }
        return this.isSection("apps", "manage", "settings", "reports", "ads") ? this.showRows() : !0
    },
    searchCatalog: function(e, t) {
        e = this.searchValFix(e), ajax.post(this.address, {
            act: !e && this.isSection("list") ? cur.list : "search",
            q: e,
            offset: t,
            oid: cur.oid,
            from: cur.section,
            catalog_search: 1,
            id: cur.listId || void 0
        }, {
            cache: e ? 0 : 1,
            onDone: this.withFastBackCheck(function(t, i, o) {
                e == this.searchValFix(cur.searchStr) && (this.isSection("catalog", "list") && (cur.searchStr && this.sliderStop(), this.switchLayout(cur.searchStr ? "list" : cur.section), this.searchWriteToAddressBar()), this.backupListContent(!0), t && val(cur.lContent, t), val(cur.lPreload, i || ""), cur.loadMore = !!i, extend(cur, o), cur.loadMore && show(cur.lShowMoreButton), this.scrollCheck())
            }.bind(this)),
            showProgress: function() {
                cur.isAppsLoading = !0, lockButton(cur.lShowMoreButton)
            }.bind(this),
            hideProgress: this.withFastBackCheck(function() {
                cur.isAppsLoading = !1, this.searchProgress(!1), unlockButton(cur.lShowMoreButton)
            }.bind(this))
        })
    },
    filter: function(e) {
        for (var t = e.length, i = [], o = 0; t > o; o++) {
            var n = e[o];
            cur.apps && cur.apps[n[0]] && !cur.apps[n[0]].deleted && i.push(n)
        }
        return i
    },
    searchLoadFromAddressBar: function() {
        setTimeout(function() {
            cur.searchStr = this.searchValFix(nav.objLoc.q || "")
        }.bind(this), 0)
    },
    searchWriteToAddressBar: function(e) {
        nav.setLoc(extend(nav.objLoc, {
            q: cur.searchStr ? cur.searchStr : null
        }))
    },
    searchValFix: function(e) {
        return e ? (" " == e[e.length - 1] && (e[e.length - 1] = "_"), e) : ""
    },
    searchProgress: function(e) {
        cur.aSearch && uiSearch[e ? "showProgress" : "hideProgress"](cur.aSearch)
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
    switchLayout: function(e) {
        cur.aWrap && (removeClass(cur.aWrap, "apps_catalog_layout"), removeClass(cur.aWrap, "apps_list_layout"), removeClass(cur.aWrap, "apps_manage_layout"), removeClass(cur.aWrap, "apps_settings_layout"), removeClass(cur.aWrap, "apps_apps_layout"), removeClass(cur.aWrap, "apps_page_layout"), addClass(cur.aWrap, "apps_" + e + "_layout"))
    },
    geTabBySection: function(e, t) {
        var i = ge("apps_tab_" + e + (t ? "_" + t : ""));
        return i && (i = geByTag1("a", i)) ? i : !1
    },
    setHistoryBackRules: function() {
        cur._back = {
            show: [function() {
                if (cur._back.swap && each(cur._back.swap, function(e, t) {
                        t.dummy.parentNode.replaceChild(t.content, t.dummy)
                    }), cur.fScrollbar && cur.fScrollbar.scrollTop(cur.fScrollbar.data.scrollTop), cur.rNotScrollbar && cur.rNotScrollbar.scrollTop(cur.rNotScrollbar.data.scrollTop), delete cur._back.swap, setTimeout(function() {
                        var e = nav.objLoc && ge("notifications" == nav.objLoc.tab ? "apps-recent-notifications-tab" : "apps-recent-apps-tab");
                        e && this.switchTabPrepared(e.getElementsByTagName("a")[0]), cur.aSearch && (uiSearch["list" === cur.section ? "setFixed" : "setStatic"](cur.aSearch), uiSearch.startEvents(cur.aSearch), cur.aSearch.value = cur.searchStr || "", uiSearch.scrollResize(cur.aSearch)), this.searchWriteToAddressBar(cur.searchStr)
                    }.bind(this), 0), this.ttHideAll(), this.recentTabsUpdate(), this.startEvents(), cur.aTabs) {
                    var e = this.geTabBySection(this.isSection("list") ? cur.list + (cur.listId || "") : cur.section);
                    e && uiTabs.switchTab(e), uiTabs.hideProgress(cur.aTabs)
                }
                if (cur.aSubTabs) {
                    var e = this.geTabBySection(cur.section, cur.subsection);
                    e && uiTabs.switchTab(e), uiTabs.hideProgress(cur.aSubTabs)
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
        return each(tabWraps, function(e, t) {
            t !== tabWrap && addClass(t, this.optionHiddenClass)
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
                window.revertLastInlineVideo && revertLastInlineVideo(), each(cur._back.hide, function(e, t) {
                    t && t()
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
            onDone: function(e) {
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
            onSlide: function(e) {
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
    collectionsLoadContent: function(e) {
        return isVisible(e) && !buttonLocked(e) ? cur.collectionsOffset && cur.collectionsHasMore ? void ajax.post("al_apps.php", {
            act: "a_collections_more",
            offset: cur.collectionsOffset,
            seed: cur.collectionsSeed
        }, {
            onDone: function(t, i, o) {
                geByClass1("_apps_collections").appendChild(cf(t)), (cur.collectionsHasMore = o) || hide(e), cur.collectionsOffset = i
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }) : hide(e) : void 0
    },
    addToMineGroups: function(e, t, i, o) {
        var n = {
            act: "add_to_mine_group_box",
            aid: e,
            hash: t,
            height: lastWindowHeight,
            from_gid: o
        };
        i && (n.source = i), showBox("apps", n, {
            params: {
                dark: 1,
                width: 450,
                bodyStyle: "padding: 22px 0 0"
            }
        })
    },
    makeAppSlider: function(e) {
        return new AppsSlider(e)
    },
    closeExternalApp: function() {
        cur.app.clientRpc && cur.app.clientRpc.callMethod("closeExternalApp")
    }
});
try {
    stManager.done("apps.js")
} catch (e) {}